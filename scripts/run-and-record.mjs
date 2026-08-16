import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const [, , name, command] = process.argv;
if (!name || !command) {
  console.error('Usage: node scripts/run-and-record.mjs <name> <command>');
  process.exit(2);
}

const root = process.cwd();
const dir = `${root}/client/public/diagnostics`;
const file = `${dir}/runtime-tests.json`;
fs.mkdirSync(dir, { recursive: true });
let report = {};
if (fs.existsSync(file)) {
  try { report = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { report = {}; }
}
const started = Date.now();
const result = spawnSync(command, { cwd: root, shell: true, stdio: 'inherit', env: process.env });
const status = result.status === 0 ? 'PASS' : 'ERROR';
report[name] = {
  status,
  timestamp: new Date().toISOString(),
  command,
  durationMs: Date.now() - started,
  ...(status === 'ERROR' ? { error: `Command exited with code ${result.status ?? 'unknown'}` } : {}),
};
fs.writeFileSync(file, JSON.stringify(report, null, 2) + '\n');
process.exit(result.status ?? 1);
