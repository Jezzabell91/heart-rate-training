// name of our cache
const staticHRT = 'heart-rate-training-site-v1'

// cache the assets
const assets = [
    "/",
    "/index.html",
    "/index.css",
    "/heartbeat.js",
    "/timer.js",
    "/images/icons/heart_370.png"
]

// self is the service worker itself 
// 

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticHRT)
        .then(cache => {
            console.log('Opened staticHRT cache')
            cache.addAll(assets)
        })
    )
})

// Fetch assets 
// event.respondWith prevents the browser's default fetch handling and allows you to provide a promise for a response
// caches.match() checks if a given Request or url string is a key for a stored Response 
// fetchEvent.request is our array of assets
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })