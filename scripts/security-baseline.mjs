import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['node_modules', '.git', 'dist']);
const suspicious = /(ghp_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----)/;
const dangerous = /\beval\s*\(|new Function\s*\(|dangerouslySetInnerHTML\s*=/;
const findings = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(mjs|js|ts|tsx|json|yml|yaml|html|css|md|txt)$/.test(entry.name)) {
      const text = fs.readFileSync(full, 'utf8');
      if (suspicious.test(text)) findings.push(`SECRET_PATTERN: ${path.relative(root, full)}`);
      if (dangerous.test(text) && path.relative(root, full) !== 'client/src/components/ui/chart.tsx') findings.push(`DANGEROUS_PATTERN: ${path.relative(root, full)}`);
    }
  }
}
walk(root);
const status = findings.length ? 'ERROR' : 'PASS';
console.log(`Security baseline: ${status}`);
for (const finding of findings) console.log(finding);
if (findings.length) process.exit(1);
