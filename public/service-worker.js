self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  // update found
  console.log("Service worker update found");
  // invalidate previous cache
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log("Service worker clearing cache");
          return caches.delete(cacheName);
        })
      );
    })
  );
});
