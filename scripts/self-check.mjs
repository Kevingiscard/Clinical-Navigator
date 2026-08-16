import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'client/src/pages/Home.tsx',
  'client/src/pages/TrialDesignPage.tsx',
  'client/src/pages/TrialAuditPage.tsx',
  'client/src/pages/MaintenancePage.tsx',
  'client/src/pages/TrialToolsLab.tsx',
  'client/src/pages/AuthorPage.tsx',
  'client/public/404.html',
  'client/public/.nojekyll',
  'shared/clinicalContent.ts',
  'server/studyDesign.ts',
  '.github/workflows/deploy.yml',
  '.github/workflows/maintenance.yml',
];
const problems = [];
for (const file of required) if (!fs.existsSync(path.join(root, file))) problems.push(`Missing: ${file}`);
const home = fs.readFileSync(path.join(root, 'client/src/pages/Home.tsx'), 'utf8');
const bannedClaims = ['99.9%', 'ISO certifié', '50k+', '500+', 'serveurs certifiés HDS', 'clinical-navigator.manus.space'];
for (const claim of bannedClaims) if (home.includes(claim)) problems.push(`Unsupported public claim remains on home page: ${claim}`);
const content = fs.readFileSync(path.join(root, 'shared/clinicalContent.ts'), 'utf8');
for (const ref of ['ich-e6r3-principles', 'ich-e6r3-consolidated', 'ich-e6r3-annex2', 'ich-e9-r1', 'spirit-2025', 'consort-2025', 'ema-ctis-handbook', 'who-best-practices', 'eu-ctr-536-2014', 'who-trial-registration', 'fda-adaptive-2019', 'fda-e20-adaptive-draft', 'tidier']) if (!content.includes(ref)) problems.push(`Reference missing: ${ref}`);
const shell = fs.readFileSync(path.join(root, 'client/src/components/ClinicalShell.tsx'), 'utf8');
if (!shell.includes('Créé et développé par Kevin HOUNSINOU')) problems.push('Author attribution missing from site footer');
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('Clinical Navigator self-check: OK');
