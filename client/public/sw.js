const CACHE = "clinical-navigator-v1";
const FALLBACK = "/offline.html";
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([FALLBACK, "/"]))));
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(response => response || caches.match(FALLBACK))));
});
