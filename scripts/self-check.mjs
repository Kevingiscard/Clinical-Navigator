import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'client/src/pages/Home.tsx',
  'client/src/pages/TrialDesignPage.tsx',
  'client/src/pages/TrialAuditPage.tsx',
  'client/src/pages/MaintenancePage.tsx',
  'shared/clinicalContent.ts',
  'server/studyDesign.ts',
  '.github/workflows/deploy.yml',
  '.github/workflows/maintenance.yml',
];
const problems = [];
for (const file of required) if (!fs.existsSync(path.join(root, file))) problems.push(`Missing: ${file}`);
const home = fs.readFileSync(path.join(root, 'client/src/pages/Home.tsx'), 'utf8');
const bannedClaims = ['99.9%', 'ISO certifié', '50k+', '500+', 'serveurs certifiés HDS'];
for (const claim of bannedClaims) if (home.includes(claim)) problems.push(`Unsupported public claim remains on home page: ${claim}`);
const content = fs.readFileSync(path.join(root, 'shared/clinicalContent.ts'), 'utf8');
for (const ref of ['ich-e6r3-principles', 'ich-e6r3-consolidated', 'ich-e6r3-annex2', 'ich-e9-r1', 'spirit-2025', 'consort-2025']) if (!content.includes(ref)) problems.push(`Reference missing: ${ref}`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('Clinical Navigator self-check: OK');
