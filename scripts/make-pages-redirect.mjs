// GitHub Pages ne sert plus le site : il renvoie chaque adresse vers l'hébergement principal (EdgeOne).
// Retour arrière : dans .github/workflows/deploy.yml, supprimer l'étape "redirect-only" et remettre path: dist/public.
import fs from "node:fs";
import path from "node:path";

const TARGET = "https://clinical-navigator.edgeone.dev";
const BASE = "/Clinical-Navigator";
const out = path.resolve("dist/redirect");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const page = (canonical) => `<!doctype html><html lang="fr"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Clinical Navigator a changé d'adresse</title>
<link rel="canonical" href="${canonical}" />
<meta http-equiv="refresh" content="0; url=${canonical}" />
<script>
(function () {
  var p = location.pathname.indexOf("${BASE}") === 0 ? location.pathname.slice(${BASE.length}) : location.pathname;
  if (!p) p = "/";
  location.replace("${TARGET}" + p + location.search + location.hash);
})();
</script></head><body>
<p>Clinical Navigator a changé d'adresse : <a href="${canonical}">${canonical}</a></p>
</body></html>
`;

fs.writeFileSync(path.join(out, "index.html"), page(`${TARGET}/`));
fs.writeFileSync(path.join(out, "404.html"), page(`${TARGET}/`));
fs.writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nAllow: /\n");
// Ancien service worker : se retire, vide ses caches et recharge la page vers la redirection.
fs.writeFileSync(path.join(out, "sw.js"), `self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    for (var i = 0; i < keys.length; i++) await caches.delete(keys[i]);
    await self.registration.unregister();
    var clients = await self.clients.matchAll({ type: "window" });
    clients.forEach(function (c) { c.navigate(c.url); });
  })());
});
`);
console.log("Redirect artifact written to", out);
