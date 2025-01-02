const CACHE_NAME = "amazon-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/bootstrap.min.css",
  "/styles/main.css",
  "/scripts/bootstrap.bundle.min.js",
  "/scripts/main.js",
  "/assets/images/amazon-logo.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-512x512.png",
];

// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
