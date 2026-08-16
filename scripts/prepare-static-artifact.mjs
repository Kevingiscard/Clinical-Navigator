import { copyFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
const root = resolve(new URL("..", import.meta.url).pathname);
const output = join(root, "dist", "public");
const index = join(output, "index.html");
if (!existsSync(index)) throw new Error("Static build is missing dist/public/index.html");
copyFileSync(index, join(output, "404.html"));
const appTsx = readFileSync(join(root, "client", "src", "App.tsx"), "utf8");
const routes = new Set();
for (const match of appTsx.matchAll(/path="([^"]+)"/g)) { const route = match[1]; if (route !== "/" && route !== "/404" && !route.includes(":")) routes.add(route); }
for (const route of [...routes].sort()) { const directory = join(output, route.replace(/^\//, "")); mkdirSync(directory, { recursive: true }); copyFileSync(index, join(directory, "index.html")); }
console.log(`Prepared static artifact: 404.html + ${routes.size} route copies.`);
