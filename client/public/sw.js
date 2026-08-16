const CACHE = "clinical-navigator-v3-2026-08-16";
const FALLBACK = "/offline.html";
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([FALLBACK, "/"]))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(response => response || caches.match(FALLBACK))));
});
