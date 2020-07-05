console.log('Hello from service-worker.js');
const cacheName = "hanuman-service-worker-app";

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/assets'
        ]
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      }).catch(error => {
        console.log("Error...", error)
        console.log(`Serving ${event.request.url} from service worker cache`);
          return cache.match(event.request).then(function (response) {
            return response;
          });
      })
    })
  );
});
