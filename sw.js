// Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_Juan_Castillo_pwa';

// Ficheros a cacher en la app
var urlsToCache = [
    './',
    './css/styles.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

// Evento install
self.addEventListener('install', e => {
    console.log('Inicio install');
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                })
        })
        .catch(err => console.log('No se ha registrado el cachw', err))
    );
});

// Evento activate
self.addEventListener('activate', e => {
    console.log('Inicio activate');
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(

        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) == -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Evento fetch
self.addEventListener('fetch', e => {
    console.log('Inicio fetch');
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res;
            }
            return fetch(e.request);
        })
    );
});