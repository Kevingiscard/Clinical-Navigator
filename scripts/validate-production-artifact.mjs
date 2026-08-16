import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
const root = resolve(new URL("..", import.meta.url).pathname); const output = join(root, "dist", "public");
for (const file of ["index.html", "404.html", "offline.html", "manifest.webmanifest", "sw.js"]) if (!existsSync(join(output, file)) || statSync(join(output, file)).size === 0) throw new Error(`Missing or empty production artifact: ${file}`);
const manifest = JSON.parse(readFileSync(join(output, "manifest.webmanifest"), "utf8"));
if (!manifest.name || !manifest.start_url || !manifest.scope || !Array.isArray(manifest.icons) || manifest.icons.length < 2) throw new Error("PWA manifest is incomplete");
for (const icon of manifest.icons) if (!existsSync(join(output, icon.src.replace(/^\.\//, "")))) throw new Error(`Manifest icon is missing: ${icon.src}`);
if (!readFileSync(join(output, "sw.js"), "utf8").includes("precacheAndRoute")) throw new Error("Generated service worker has no precache route");
const secretPattern = /(gh[pousr]_[A-Za-z0-9_\-]{20,}|sk-[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|AKIA[0-9A-Z]{16})/;
const backups = []; const secrets = [];
function visit(directory) { for (const name of readdirSync(directory)) { const file = join(directory, name); const rel = relative(output, file); if (name.endsWith(".bak") || name.endsWith("~")) backups.push(rel); if (statSync(file).isDirectory()) visit(file); else if (/\.(?:js|html|json|txt|map)$/.test(name) && secretPattern.test(readFileSync(file, "utf8"))) secrets.push(rel); } }
visit(output); if (backups.length) throw new Error(`Backup files in production artifact: ${backups.join(", ")}`); if (secrets.length) throw new Error(`Potential secret pattern in production artifact: ${secrets.join(", ")}`);
console.log(`Production artifact verified: ${manifest.icons.length} icons, no backup or secret patterns.`);
