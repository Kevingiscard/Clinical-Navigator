import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const exists = (p) => fs.existsSync(path.join(root, p));
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const result = { pass: [], warnings: [], errors: [] };
const runtimePath = path.join(root, 'client/public/diagnostics/runtime-tests.json');
let runtime = {};
if (fs.existsSync(runtimePath)) {
  try { runtime = JSON.parse(fs.readFileSync(runtimePath, 'utf8')); } catch { runtime = {}; }
}
const runtimeStatus = (key) => runtime[key]?.status ?? 'UNKNOWN';
const status = (ok, warn = false) => ok ? 'OK' : warn ? 'WARNING' : 'ERROR';

function gitValue(args) {
  try { return execSync(`git ${args}`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return 'UNKNOWN'; }
}

const featurePaths = {
  problemWizard: 'client/src/pages/ProblemWizard.tsx',
  trialDesignWorkspace: 'client/src/pages/TrialDesignStudio.tsx',
  trialAudit: 'client/src/pages/TrialAuditPage.tsx',
  sampleSize: 'server/studyDesign.ts',
  recruitment: 'client/src/pages/TrialToolsLab.tsx',
  scheduleBuilder: 'client/src/pages/TrialToolsLab.tsx',
  estimand: 'client/src/pages/TrialDesignStudio.tsx',
  randomization: 'client/src/pages/TrialDesignStudio.tsx',
  blinding: 'client/src/pages/TrialDesignStudio.tsx',
  protocolBuilder: 'client/src/pages/TrialDesignStudio.tsx',
  sapBuilder: 'client/src/pages/TrialDesignStudio.tsx',
  crfDesigner: 'server/studyDesign.ts',
  riskEngine: 'client/src/pages/TrialAuditPage.tsx',
  qualityByDesign: 'client/src/pages/TrialDesignStudio.tsx',
  referenceRegistry: 'shared/clinicalContent.ts',
  pwa: 'client/public/manifest.webmanifest',
  offlineMode: 'client/public/offline.html',
};

const features = Object.fromEntries(Object.entries(featurePaths).map(([k, p]) => [k, exists(p)]));
for (const [k, ok] of Object.entries(features)) ok ? result.pass.push(`Feature present: ${k}`) : result.warnings.push(`Feature not detected: ${k}`);

const routesSource = read('client/src/App.tsx');
const expectedRoutes = [
  '/', '/fr/probleme', '/fr/concevoir-un-essai', '/fr/concevoir-un-essai/outils',
  '/fr/auditer-un-essai', '/fr/outils', '/fr/veille', '/fr/systeme', '/fr/diagnostic', '/fr/a-propos', '/fr/auteur'
];
const routes = expectedRoutes.map(route => ({ route, present: routesSource.includes(`path="${route}"`) || (route === '/' && routesSource.includes('path="/"')) }));
for (const r of routes) r.present ? result.pass.push(`Route present: ${r.route}`) : result.errors.push(`Route missing: ${r.route}`);

const refs = read('shared/clinicalContent.ts');
const referenceChecks = {
  ichE8R1: refs.includes('ich-e8-r1'),
  ichE9: refs.includes('ich-e9'),
  ichE9R1: refs.includes('ich-e9-r1'),
  ichE6R3: refs.includes('ich-e6r3'),
  spirit2025: refs.includes('spirit-2025'),
  consort2025: refs.includes('consort-2025'),
  who: refs.includes('who-best-practices'),
  ema: refs.includes('ema-ctis-handbook'),
  fda: refs.includes('fda-adaptive-2019')
};
for (const [k, ok] of Object.entries(referenceChecks)) ok ? result.pass.push(`Reference detected: ${k}`) : result.warnings.push(`Reference not detected: ${k}`);

const pwaFiles = ['client/public/manifest.webmanifest', 'client/public/sw.js', 'client/public/offline.html'];
const pwaOk = pwaFiles.every(exists);
if (pwaOk) result.pass.push('PWA core files present'); else result.warnings.push('PWA core incomplete');

const tests = {
  selfCheck: exists('scripts/self-check.mjs'),
  qualityWorkflow: exists('.github/workflows/quality.yml'),
  maintenanceWorkflow: exists('.github/workflows/maintenance.yml'),
  healthWorkflow: exists('.github/workflows/health-watch.yml'),
  dependencyWorkflow: exists('.github/workflows/auto-merge-dependabot.yml'),
};
for (const [k, ok] of Object.entries(tests)) ok ? result.pass.push(`Maintenance asset present: ${k}`) : result.warnings.push(`Maintenance asset missing: ${k}`);

const pkg = JSON.parse(read('package.json'));
const build = {
  version: pkg.version ?? 'UNKNOWN',
  commitSha: gitValue('rev-parse HEAD'),
  branch: gitValue('rev-parse --abbrev-ref HEAD'),
  buildTime: new Date().toISOString(),
};

const payload = {
  product: { name: 'Clinical Navigator', version: build.version, repository: 'Kevingiscard/Clinical-Navigator', branch: build.branch },
  build,
  status: {
    overall: result.errors.length ? 'ERROR' : ['typescript', 'unit', 'build', 'clinicalConsistency', 'security', 'e2e', 'accessibility'].some((key) => !['PASS', 'OK'].includes(runtimeStatus(key))) || !Object.values(referenceChecks).every(Boolean) ? 'WARNING' : 'OK',
    frontend: status(exists('client/src/App.tsx')),
    pwa: status(pwaOk, true),
    navigation: status(routes.every(r => r.present)),
    trialDesign: status(features.trialDesignWorkspace, true),
    audit: status(features.trialAudit, true),
    calculators: status(features.sampleSize, true),
    references: status(referenceChecks.ichE8R1 && referenceChecks.ichE9R1 && referenceChecks.ichE6R3, true),
    security: runtimeStatus('security'),
  },
  features,
  references: referenceChecks,
  maintenance: {
    githubActions: tests.qualityWorkflow,
    automatedTests: tests.selfCheck,
    dependencyMonitoring: tests.dependencyWorkflow,
    rollbackStrategy: exists('.github/workflows/health-watch.yml'),
    healthChecks: tests.healthWorkflow,
    sourceMonitoring: exists('docs/research-update-2026-08.md'),
  },
  tests: {
    typescript: runtimeStatus('typescript'), unit: runtimeStatus('unit'), integration: runtimeStatus('integration'), e2e: runtimeStatus('e2e'), accessibility: runtimeStatus('accessibility'), security: runtimeStatus('security'), build: runtimeStatus('build')
  },
  releaseGate: {
    typescript: runtimeStatus('typescript'), unit: runtimeStatus('unit'), integration: runtimeStatus('integration'), e2e: runtimeStatus('e2e'), accessibility: runtimeStatus('accessibility'), security: runtimeStatus('security'), build: runtimeStatus('build'),
    pwa: pwaOk ? 'PASS' : 'ERROR', routes: routes.every(r => r.present) ? 'PASS' : 'ERROR', clinicalConsistency: runtimeStatus('clinicalConsistency'), references: Object.values(referenceChecks).every(Boolean) ? 'PASS' : 'WARNING'
  },
  releaseReady: ['typescript', 'unit', 'build', 'clinicalConsistency', 'security', 'references', 'e2e', 'accessibility'].every((key) => {
    const value = key === 'references' ? (Object.values(referenceChecks).every(Boolean) ? 'PASS' : 'WARNING') : runtimeStatus(key);
    return value === 'PASS' || value === 'OK';
  }) && pwaOk && routes.every(r => r.present) && result.errors.length === 0,
  routes,
  warnings: result.warnings,
  errors: result.errors,
  generatedAt: build.buildTime,
};

fs.mkdirSync(path.join(root, 'client/public/diagnostics'), { recursive: true });
const report = JSON.stringify(payload, null, 2) + '\n';
fs.writeFileSync(path.join(root, 'client/public/diagnostics/latest.json'), report);
fs.writeFileSync(path.join(root, 'client/public/clinical-navigator-diagnostics.json'), report);
fs.writeFileSync(path.join(root, 'client/public/diagnostics/version.txt'), `Clinical Navigator\nVersion: ${build.version}\nBuild: ${build.commitSha}\nBranch: ${build.branch}\nCommit: ${build.commitSha}\nGenerated: ${build.buildTime}\n`);
fs.writeFileSync(path.join(root, 'client/public/diagnostics/manifest.json'), JSON.stringify({
  product: 'Clinical Navigator', version: build.version, build: build.commitSha, generatedAt: build.buildTime,
  diagnostics: '/Clinical-Navigator/diagnostics/latest.json', page: '/Clinical-Navigator/fr/diagnostic'
}, null, 2) + '\n');

console.log(`Clinical Navigator diagnostics: ${payload.status.overall}`);
console.log(`PASS=${result.pass.length} WARNING=${result.warnings.length} ERROR=${result.errors.length}`);
if (result.errors.length) process.exit(1);
