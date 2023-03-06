const CACHE_NAME = 'color-mcps-cache-v1';
const urlsToCache = [
  '/',
  '/ColorMCPSPWA/manifest.json',
  '/sw.js',
  'https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js',
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // Return offline message
        return new Response('You are offline. Please check your internet connection and try again.', {
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});
