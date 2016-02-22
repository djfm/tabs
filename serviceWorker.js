/* global self, caches, fetch, URL */

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

self.addEventListener('fetch', event => {

    const pathname = new URL(event.request.url).pathname;

    return event.respondWith(
        fetch(event.request)
            .then(response => {
                if (/^\/[^/]+$/.exec(pathname)) {
                    // Cache all resources that are at the root of the public directory
                    // before returning the response.
                    return caches
                        .open(CACHE_NAME)
                        .then(cache => cache.put(event.request, response.clone()))
                        .then(() => response)
                    ;
                } else {
                    // Things not at the root are special, leave them alone.
                    return response;
                }
            })
            .catch(() => {
                if (/^\/songs\//.exec(pathname)) {
                    // If we failed on a resource that is actually the root (SPA ftw)
                    // then return the content for the root.
                    return caches.match("/");
                } else {
                    return caches.match(event.request);
                }
            })
    );
});
