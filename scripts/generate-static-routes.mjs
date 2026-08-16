#!/usr/bin/env node
import { readFileSync } from "node:fs";

const appTsx = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const pathRe = /path="([^"]+)"/g;
const routes = new Set();

let match;
while ((match = pathRe.exec(appTsx))) {
  const route = match[1];
  if (route === "/404" || route.includes(":" ) || route === "/") continue;
  routes.add(route);
}

for (const route of [...routes].sort()) {
  console.log(route.replace(/^\//, ""));
}
