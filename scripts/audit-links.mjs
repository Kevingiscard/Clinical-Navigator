import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const sourceRoot = join(root, "client", "src");
const appPath = join(sourceRoot, "App.tsx");
const diagnosticsDir = join(root, "client", "public", "diagnostics");
mkdirSync(diagnosticsDir, { recursive: true });
const files = [];
function walk(directory) { for (const name of readdirSync(directory)) { const full = join(directory, name); if (name === "ui" && directory.endsWith("components")) continue; const stat = readFileSync; try { if (requireDirectory(full)) walk(full); else if (/\.(tsx|jsx|ts|js)$/.test(name)) files.push(full); } catch {} } }
function requireDirectory(path) { try { return readdirSync(path, { withFileTypes: true }).some(entry => entry.isDirectory()) && !/\.(tsx|jsx|ts|js)$/.test(path); } catch { return false; } }
// Deterministic recursive walk without importing a directory API in ESM.
function collect(directory) { for (const entry of readdirSync(directory, { withFileTypes: true })) { const full = join(directory, entry.name); if (entry.isDirectory()) collect(full); else if (/\.(tsx|jsx|ts|js)$/.test(entry.name)) files.push(full); } }
files.length = 0; collect(sourceRoot);
const app = readFileSync(appPath, "utf8");
const routes = new Set([...app.matchAll(/path="([^"]+)"/g)].map(match => match[1]));
const findings = [];
const externalLinks = [];
const internalLinks = [];
const anchorLinks = [];
const ids = new Set();
for (const file of files) {
  const text = readFileSync(file, "utf8"); const relativeFile = relative(root, file);
  for (const match of text.matchAll(/\bid=["']([^"']+)["']/g)) ids.add(match[1]);
  for (const match of text.matchAll(/href\s*=\s*["']([^"']*)["']/g)) {
    const href = match[1];
    if (!href) findings.push({ type: "EMPTY_HREF", file: relativeFile, value: href });
    else if (href === "#") findings.push({ type: "FAKE_HREF", file: relativeFile, value: href });
    else if (href.startsWith("#")) anchorLinks.push({ file: relativeFile, href });
    else if (/^https?:\/\//.test(href)) externalLinks.push({ file: relativeFile, href });
    else if (href.startsWith("/")) internalLinks.push({ file: relativeFile, href });
  }
  for (const match of text.matchAll(/\b(?:to|href)\s*=\s*\{["']([^"']+)["']\}/g)) { const href = match[1]; if (href.startsWith("/")) internalLinks.push({ file: relativeFile, href }); }
  for (const match of text.matchAll(/<button\b([^>]*)>/g)) { if (!/onClick\s*=|type=["']submit["']|formAction\s*=|aria-haspopup=|aria-expanded=/.test(match[1])) findings.push({ type: "BUTTON_WITHOUT_ACTION", file: relativeFile, value: match[0].slice(0, 160) }); }
  for (const match of text.matchAll(/onClick\s*=\s*\{\s*\(?(?:[^)]*)\)?\s*=>\s*\{\s*\}\s*\}/g)) findings.push({ type: "EMPTY_CLICK_HANDLER", file: relativeFile, value: match[0] });
}
for (const link of anchorLinks) if (!ids.has(link.href.slice(1))) findings.push({ type: "MISSING_ANCHOR", ...link });
function routeExists(href) { const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/"; if (/\.(json|xml|txt|png|jpg|jpeg|svg|ico|pdf|webmanifest)$/.test(path)) return true; if (path.startsWith("/Clinical-Navigator/")) return true; return [...routes].some(route => route === path || route.includes(":") && path.startsWith(route.split(":")[0])); }
for (const link of internalLinks) if (!routeExists(link.href) && !link.href.startsWith("/api/")) findings.push({ type: "MISSING_INTERNAL_ROUTE", ...link });
for (const link of externalLinks) if (!/^https?:\/\/[^\s]+$/.test(link.href)) findings.push({ type: "INVALID_EXTERNAL_URL", ...link });
const result = { generatedAt: new Date().toISOString(), status: findings.some(item => ["FAKE_HREF", "EMPTY_HREF", "MISSING_INTERNAL_ROUTE", "INVALID_EXTERNAL_URL"].includes(item.type)) ? "NEEDS_REVIEW" : "PASS", routes: [...routes].sort(), findings, internalLinks, externalLinks, anchorLinks };
writeFileSync(join(diagnosticsDir, "link-audit.json"), JSON.stringify(result, null, 2) + "\n");
const lines = [`# Link and interaction audit`, ``, `Status: **${result.status}**`, ``, `Generated: ${result.generatedAt}`, ``, `| Type | File | Value |`, `|---|---|---|`];
for (const finding of findings) lines.push(`| ${finding.type} | ${finding.file} | ${String(finding.value ?? finding.href ?? "").replaceAll("|", "\\|")} |`);
if (!findings.length) lines.push("| — | — | No findings |", "", "All statically detectable links and actions passed.");
writeFileSync(join(diagnosticsDir, "link-audit.md"), lines.join("\n") + "\n");
const interactionLines = [`# Interaction audit`, ``, `Status: **${result.status}**`, ``, `| Check | Result |`, `|---|---|`, `| Static false links | ${findings.filter(item => item.type === "FAKE_HREF" || item.type === "EMPTY_HREF").length ? "NEEDS_REVIEW" : "PASS"} |`, `| Internal destinations | ${findings.some(item => item.type === "MISSING_INTERNAL_ROUTE") ? "NEEDS_REVIEW" : "PASS"} |`, `| External URL shape | ${findings.some(item => item.type === "INVALID_EXTERNAL_URL") ? "NEEDS_REVIEW" : "PASS"} |`, `| Button/action scan | ${findings.some(item => item.type === "BUTTON_WITHOUT_ACTION" || item.type === "EMPTY_CLICK_HANDLER") ? "NEEDS_REVIEW" : "PASS"} |`, ``, `Static findings: ${findings.length}`];
writeFileSync(join(diagnosticsDir, "interaction-audit.md"), interactionLines.join("\n") + "\n");
console.log(`Link audit: ${result.status}; ${findings.length} findings; ${internalLinks.length} internal links; ${externalLinks.length} external links.`);
if (findings.some(item => ["FAKE_HREF", "EMPTY_HREF", "MISSING_INTERNAL_ROUTE"].includes(item.type))) process.exitCode = 1;
