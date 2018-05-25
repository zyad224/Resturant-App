/*
The service worker is a js works in the background. it
fetches the pages from the cache if found. if not found,
it fetches the page from the server then adds it to the cache.

It supports offline experience and it enables the usr to play the snake game
when they are offline until the network comes back.
 */

var cache_name = 'cache';

/*
The pages already exists in the cache.
 */
var cached_urls = [
    '/stylesheets/index.css',
    '/stylesheets/insert.css',
    '/stylesheets/map.css',
    '/stylesheets/style.css',
    '/css/main.css',
    '/css/util.css',
    '/css/dark-snake.css',
    '/css/main-snake.css',


    '/javascripts/index.js',
    '/js/main.js',
    '/js/snake.js',
    '/Images/abc.jpg',


    '/index',
    '/errorPage'

];

/*
This method is responsible to intall the service worker in
the first run.
 */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cache_name)
            .then(function(cache) {
                return cache.addAll(cached_urls);
            })
    );
});

/*
This method is responsible to remove old cache.
 */
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

/*
This is the fetch method in the service worker.
First it tries to fetch the page from the cache. if not found
if fetches it from the server then adds it in the cache.
It also support offline expierience. if the user is offline or any error
happened, the user can play a snake game until the problem is solved or the
network connection is back.
 */
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