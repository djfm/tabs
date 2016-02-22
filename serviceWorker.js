const CACHE_NAME = 'tabs';

const urlsToCache = [
    '/',
    '/bundle.css',
    '/bundle.js'
];

self.addEventListener('install', event =>
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    )
);

self.addEventListener('fetch', event =>
    event.respondWith(
        caches
            .match(event.request)
            .then(response => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request);
                }
            })
    )
);
