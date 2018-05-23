var cache_name = 'gih-cache';


var cached_urls = [
    '/stylesheets/index.css',
    '/stylesheets/insert.css',
    '/stylesheets/map.css',
    '/stylesheets/style.css',
    '/css/main.css',
    '/css/util.css',


    '/javascripts/index.js',
    '/javascripts/login.js',
    '/javascripts/signup.js',
    '/js/main.js',


    '/index',
    '/signup',
    '/login',
    '/errorPage'

];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cache_name)
            .then(function(cache) {
                return cache.addAll(cached_urls);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('Network request for ', event.request.url);
            return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                    return caches.match('errorPage');
                }
                return caches.open(cached_urls).then(function(cache) {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });
        }).catch(function(error) {
            console.log('Error, ', error);
            return caches.match('errorPage');
        })
    );
});