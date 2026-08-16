import fs from 'node:fs';

const file = 'client/public/diagnostics/runtime-tests.json';
const diagnostics = 'client/public/diagnostics/latest.json';
const runtime = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
const report = fs.existsSync(diagnostics) ? JSON.parse(fs.readFileSync(diagnostics, 'utf8')) : {};
const required = ['typescript', 'unit', 'build', 'clinicalConsistency', 'security', 'references', 'e2e', 'accessibility', 'pwa', 'routes'];
const failures = [];
for (const key of required) {
  const value = report.releaseGate?.[key] ?? runtime[key]?.status ?? 'UNKNOWN';
  if (value !== 'PASS' && value !== 'OK') failures.push(`${key}=${value}`);
}
if (report.errors?.length) failures.push(`diagnostic errors=${report.errors.length}`);
const ready = failures.length === 0;
console.log(`RELEASE_READY=${ready}`);
if (failures.length) {
  console.log('BLOCKED_BY:');
  for (const failure of failures) console.log(`- ${failure}`);
  process.exit(1);
}
