self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("cortex-os-v1").then((cache) => cache.addAll(["/dashboard", "/manifest.json"])));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
