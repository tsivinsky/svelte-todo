self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./style.css",
        "./bundle.min.js",
        "./images/android-chrome-192x192.png",
        "./images/android-chrome-512x512.png",
        "./images/apple-touch-icon.png",
        "./images/favicon.ico",
        "./images/svelte.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request)
          .then((response) => {
            return caches.open("v1").then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch(() => {
            return caches.match("./images/svelte.png");
          })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  var cacheKeeplist = ["v2"];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
