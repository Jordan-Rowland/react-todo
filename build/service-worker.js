const CACHE_VERSION = 2;
const CACHE_STATIC_NAME  = `static-v${CACHE_VERSION}`;
const CACHE_DYNAMIC_NAME  = `dynamic-v${CACHE_VERSION}`;
const STATIC_FILES = [
  './',
  "./index.html",
  "./static/css/main.66e2b5f5.chunk.css",
  "./static/js/2.b32fce1b.chunk.js",
  "./static/js/2.b32fce1b.chunk.js.LICENSE.txt",
  "./static/js/main.1b94c24b.chunk.js",
  "./static/js/runtime-main.b2044548.js",
  './manifest.json'
];


// Cleaning up cache
function trimCache(cacheName, maxItems) {
  caches.open(cacheName)
    .then(cache => {
      cache.keys()
      .then(keys => {
        if (keys.length > maxItems) {
          cache.delete(keys[0])
          .then(trimCache(cacheName, maxItems));
        }
    });
  });
}


// Cache app shell
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
    .then(cache => {
      console.log(`[Service Worker] Pre-caching app shell -> ${CACHE_STATIC_NAME}`);
      cache.addAll(STATIC_FILES);
    })
  );
});


self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker', event);
  // Clear old cached data for updates
  event.waitUntil(
    caches.keys()
    .then(function(key_list) {
      return Promise.all(key_list.map(function(key) {
        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
          console.log(`[Service Worker] Removing old cache -> ${key}`);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


// Network with cache fallback strategy, caching new files whenever network works
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_STATIC_NAME).then(function(cache) {
      return fetch(event.request).then(function(networkResponse) {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      }).catch(function() {
        return caches.match(event.request);
      });
    })
  );
});
