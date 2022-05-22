const cacheName = "site-cache-v1";

const assets = [
  "/index.html",
  "/main.js",
  "/manifest.json",
  "/style.css",
  "/images/dog.jpg",
  "/images/icons/icon-144x144.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("Service worker activated");
});

self.addEventListener("fetch", (event) => {
  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async function () {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(event.request);
      // Return it if we found one.
      if (cachedResponse) return cachedResponse;
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })()
  );
});
