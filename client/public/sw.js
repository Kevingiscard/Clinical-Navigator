const CACHE = "clinical-navigator-v4-2026-08-16";
const scope = self.registration.scope;
const FALLBACK = new URL("offline.html", scope).href;
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([FALLBACK, scope]))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const request = event.request;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(request).then(r => r || caches.match(scope))));
    return;
  }
  event.respondWith(fetch(request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(request, copy));
    return response;
  }).catch(() => caches.match(request).then(r => r || caches.match(FALLBACK))));
});
