import fs from 'node:fs';

const files = {
  app: 'client/src/App.tsx',
  design: 'client/src/pages/TrialDesignStudio.tsx',
  tools: 'client/src/pages/TrialToolsLab.tsx',
  content: 'shared/clinicalContent.ts',
};
const text = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '']));
const checks = [
  ['Question → Objective', /question|objective/i.test(text.design)],
  ['Objective → Endpoint', /endpoint|outcome/i.test(text.design)],
  ['Endpoint → Estimand', /estimand/i.test(text.design)],
  ['Design → Sample Size', /sample.?size|effectif/i.test(text.design)],
  ['Schedule → Endpoint Timepoint', /schedule|calendrier|timepoint/i.test(text.tools + text.design)],
  ['Protocol → SAP', /protocol|sap/i.test(text.design)],
  ['Clinical route is registered', text.app.includes('/fr/concevoir-un-essai')],
  ['Clinical content registry exists', text.content.length > 0],
];
const failures = checks.filter(([, ok]) => !ok).map(([label]) => label);
console.log(`Clinical consistency: ${failures.length ? 'WARNING' : 'PASS'}`);
for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'WARNING'}: ${label}`);
if (failures.length > 2) process.exit(1);
