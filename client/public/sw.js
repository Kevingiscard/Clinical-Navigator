const VERSION = "clinical-navigator-v2";
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;
const FALLBACK = new URL("offline.html", self.registration.scope).href;

self.addEventListener("install", event => {
  event.waitUntil(caches.open(SHELL).then(cache => cache.addAll([FALLBACK, self.registration.scope])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => ![SHELL, RUNTIME].includes(key)).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(RUNTIME);
    await cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const network = fetch(request).then(async response => {
    if (response.ok) (await caches.open(RUNTIME)).put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const request = event.request;
  const url = new URL(request.url);
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => { caches.open(RUNTIME).then(cache => cache.put(request, response.clone())); return response; }).catch(() => caches.match(request).then(cached => cached || caches.match(FALLBACK))));
    return;
  }
  if (url.pathname.includes("/api/")) return;
  if (request.destination === "image" || request.destination === "font") {
    event.respondWith(cacheFirst(request).catch(() => caches.match(FALLBACK)));
    return;
  }
  event.respondWith(staleWhileRevalidate(request).catch(() => caches.match(FALLBACK)));
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
