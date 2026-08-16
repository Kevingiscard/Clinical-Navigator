import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'shared/clinicalContent.ts');
const text = fs.readFileSync(sourcePath, 'utf8');
const required = [
  ['ich-e8-r1', 'ICH E8(R1)'],
  ['ich-e9-r1', 'ICH E9(R1)'],
  ['ich-e6r3-principles', 'ICH E6(R3)'],
  ['spirit-2025', 'SPIRIT 2025'],
  ['consort-2025', 'CONSORT 2025'],
  ['who-best-practices', 'WHO'],
  ['ema-ctis', 'EMA'],
  ['fda-adaptive-2019', 'FDA'],
  ['ema-ctis-handbook', 'CTIS Sponsor Handbook'],
];
const errors = [];
const warnings = [];
for (const [id, label] of required) {
  const start = text.indexOf(`id: "${id}"`);
  if (start < 0) { errors.push(`REFERENCE MISSING: ${label} (${id})`); continue; }
  const end = text.indexOf('  },', start);
  const record = text.slice(start, end > start ? end : start + 900);
  for (const field of ['url:', 'publisher:', 'jurisdiction:', 'publishedAt:', 'verifiedAt:', 'status:']) {
    if (!record.includes(field)) errors.push(`REFERENCE FIELD MISSING: ${label} — ${field}`);
  }
  const match = record.match(/url: "([^"]+)"/);
  if (!match || !/^https?:\/\//.test(match[1])) warnings.push(`REFERENCE URL NOT VALIDATED: ${label}`);
}
console.log(`Reference validation: ${errors.length ? 'ERROR' : warnings.length ? 'WARNING' : 'PASS'}`);
for (const item of warnings) console.log(`WARNING: ${item}`);
for (const item of errors) console.error(`ERROR: ${item}`);
if (errors.length) process.exit(1);
