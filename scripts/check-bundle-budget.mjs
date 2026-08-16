#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";

const directory = new URL("../dist/public/assets/", import.meta.url);
const files = readdirSync(directory).filter(file => /^index-[^/]+\.js$/.test(file));
if (!files.length) throw new Error("No Vite entry chunk found");
const file = files.sort((a, b) => statSync(new URL(b, directory)).size - statSync(new URL(a, directory)).size)[0];
const size = gzipSync(readFileSync(new URL(file, directory))).byteLength;
const limit = 250 * 1024;
console.log(`Initial JavaScript: ${file} · ${(size / 1024).toFixed(1)} KiB gzip · budget ${(limit / 1024).toFixed(0)} KiB`);
if (size > limit) {
  throw new Error(`Initial JavaScript budget exceeded by ${((size - limit) / 1024).toFixed(1)} KiB`);
}
const oversized = readdirSync(directory).filter(name => name.endsWith(".js")).filter(name => statSync(new URL(name, directory)).size > 1024 * 1024);
if (oversized.length) console.warn(`Warning: large lazy chunks remain: ${oversized.join(", ")}`);
