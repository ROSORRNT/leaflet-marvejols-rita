// Nom du cache
const cacheName = 'v1';

// Liste des fichiers à mettre en cache
const cacheAssets = [
    'index.html',
    'app.js',
];

// Installation du Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Récupération des requêtes pour les gérer avec le Service Worker
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
