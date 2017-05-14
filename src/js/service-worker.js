var cacheAssetKey = '0.0.0',
  cacheApikey = '1.0.0';

// app shell
var filesToCache = [
  '/',
  '/index.html',
  '/dist/css/main.css',
  '/src/js/main.js',
  '/asset/berserker/avatar.jpg',
  '/asset/berserker/skills.jpg',
  '/asset/embermage/avatar.jpg',
  '/asset/embermage/skills.jpg',
  '/asset/engineer/avatar.jpg',
  '/asset/engineer/skills.jpg',
  '/asset/outlander/avatar.jpg',
  '/asset/outlander/skills.jpg',
  '/asset/skill.json',
];

// load app shell
self.addEventListener('install', function(e) {
  console.log('ServiceWorker - install');

  e.waitUntil(caches.open(cacheAssetKey).then(function(cache) {
    console.log('ServiceWorker - caching app shell');
    return cache.addAll(filesToCache);
  }));
});

// remove old cache
self.addEventListener('activate', function(e) {
  console.log('ServiceWorker - activate');

  e.waitUntil(caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      if (key !== cacheAssetKey && key !== cacheApikey) {
        console.log('ServiceWorker - removing old cache', key);
        return caches.delete(key);
      }}));
    })
  );

  // Fixes a corner case
  // https://github.com/googlecodelabs/your-first-pwapp/blob/master/final/service-worker.js#L69
  // https://davidwalsh.name/service-worker-claim
  // http://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim
  return self.clients.claim();
});

// set on fetch
self.addEventListener('fetch', function(e) {
  console.log('Service Worker - fetch', e.request.url);

  // TODO: complete it
  var apiRoot = 'https://';
  if (e.request.url.indexOf(dataUrl) > -1) {
    // "Cache then network" strategy
    // https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
    e.respondWith(caches.open(cacheApikey).then(function(cache) {
      return fetch(e.request).then(function(res){
        cache.put(e.request.url, res.clone());
        return res;
      });
    }));

  } else {
    // app shell

    // "Cache, falling back to the network" offline strategy:
    // https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
