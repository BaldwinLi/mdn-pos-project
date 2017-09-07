var CACHE_NAME = "sw_pos_cache";
var cache_request;
// var urlsToCache = [
//   'sw_cache/orderFormRecords.json'
// ];
//这里的self代表ServiceWorkerGlobalScope  
self.addEventListener('install', function (event) {
  //这里的waitUtil会在安装成功之前执行一些预装的操作，但是只建议做一些轻量级和非常重要资源的缓存，减少安装失败的概率。安装成功  
  //后ServiceWorker状态会从installing变为installed   
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opendhe : ', cache);
      return cache.add('src/sw_cache/orderFormRecords.json');
    })
  );
});

self.addEventListener('fetch', function (event) {
  // if (event.request.url.indexOf('src/dummay.json') > -1 && event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response
          var fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function (response) {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have 2 stream.
              var responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function (cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
    );
  // }
});

self.addEventListener('message', function (event) {
  // event.respondWith(
  caches.open(CACHE_NAME).then(function (cache) {
    console.log('Opendhe : ', cache);
    return cache.match('src/sw_cache/orderFormRecords.json')
      .then(function (response) {
        if (response.status == 200) {
          cache.put('src/sw_cache/orderFormRecords.json', response.clone()).then(function () {
            event.ports[0].postMessage({ 'ressult': 'success' });
          });
          // var reader = response.body.getReader();
          // reader.read().then(function(data){
          //   cache.put('src/sw_cache/orderFormRecords.json', response.clone()).then(function(){
          //     event.ports[0].postMessage({'ressult': 'success'});
          //   });
          // });
        }
      });
  })
  // );
});

self.addEventListener('activate', event => {
  console.log('activated')
  event.waitUntil(
    // 删除旧文件
    caches.open(CACHE_NAME).then(cacheNames => {
      if (cacheNames.length > 0)
        return Promise.all(cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        }));
    })
  );
})