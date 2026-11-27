// Prerender the public home route into dist/public/index.html after the static build.
// The markup is the same tree the client hydrates (main.tsx uses hydrateRoot when the
// root element already has children). Other route copies keep the empty root and stay
// client-rendered. Run after prepare-static-artifact so route copies are not affected.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

execFileSync('pnpm', ['exec', 'vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', '../dist-ssr', '--logLevel', 'warn', '--emptyOutDir'], { stdio: 'inherit', env: process.env });

const { render, renderRoute } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url));
const basePath = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '');
const markup = render(`${basePath}/`);

const file = new URL('../dist/public/index.html', import.meta.url);
const page = fs.readFileSync(file, 'utf8');
const marker = '<div id="root"></div>';
if (!page.includes(marker)) {
  throw new Error('prerender-home: root marker not found in dist/public/index.html');
}
if (!markup.includes('Concevoir avec méthode.')) {
  throw new Error('prerender-home: rendered markup does not contain the expected home heading');
}
let out = page.replace(marker, `<div id="root">${markup}</div>`);
// The home markup is now prerendered, so JavaScript is no longer on the visual
// critical path: demote module scripts and preloads below CSS/fonts. Browsers
// that do not support fetchpriority ignore the hint and keep current behavior.
out = out.replace(/<link rel="modulepreload" /g, '<link rel="modulepreload" fetchpriority="low" ');
out = out.replace(/<script type="module" crossorigin src=/g, '<script type="module" fetchpriority="low" crossorigin src=');
fs.writeFileSync(file, out);
console.log(`prerender-home: injected ${markup.length} bytes of prerendered home markup, demoted module fetch priority`);

// Internal routes: prerendered with React's Suspense-aware prerender so the first
// paint no longer waits for the lazy route chunk. Each route is checked for its h1
// and for the absence of the loading fallback; a failing route keeps the empty root
// (client-rendered, as before) instead of failing the build.
const routes = ['/fr/formation', '/fr/campus', '/fr/explorer', '/fr/outils'];
for (const route of routes) {
  try {
    const html = await renderRoute(`${basePath}${route}`);
    if (!/<h1[ >]/.test(html) || html.includes('Chargement de Clinical Navigator')) throw new Error('no h1 or loading fallback in output');
    const target = new URL(`../dist/public${route}/index.html`, import.meta.url);
    const tpl = fs.readFileSync(target, 'utf8');
    const rootEmpty = '<div id="root"></div>';
    // route copies are made from the original index.html, so the root is still empty
    if (!tpl.includes(rootEmpty)) throw new Error('route copy root marker missing');
    let page2 = tpl.replace(rootEmpty, `<div id="root">${html}</div>`);
    page2 = page2.replace(/<link rel="modulepreload" /g, '<link rel="modulepreload" fetchpriority="low" ');
    page2 = page2.replace(/<script type="module" crossorigin src=/g, '<script type="module" fetchpriority="low" crossorigin src=');
    fs.writeFileSync(target, page2);
    console.log(`prerender-route: ${route} ${html.length} bytes`);
  } catch (e) {
    console.warn(`prerender-route: ${route} skipped (${e.message})`);
  }
}
