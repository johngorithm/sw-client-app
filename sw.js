
const version = `v8`;


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(version)
        .then((cache) => {
            return cache.addAll([
                './css/offline.css',
                './offline.html',
                './assets/offline.jpg',
            ]);
        })
    )
    console.log('Installed service worker of version at', new Date().toLocaleTimeString());
})


self.addEventListener('activate', (event) => {
    console.log('Activated serviceWorker at', new Date().toLocaleTimeString());

    event.waitUntil(
        caches.keys()
        .then((keys) => {
            return Promise.all(
                keys.filter((key) => {
                    return key !== version;
                }).map((key) => {
                    caches.delete(key);
                })
            )
        })
    )
})

self.addEventListener('fetch', (event) => {
    // console.log(`Fetching ${event.request.url}`);

    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            }

            if (!navigator.onLine) {
                return caches.match(new Request('./offline.html'));
            }

            return fetchAndUpdate(event.request);
        })
    )
})


const fetchAndUpdate = (request) => {
    fetch(request)
    .then((response) => {
        if (response) {
            return caches.open(version)
            .then((cache) => {
                return cache.put(request, response.clone())
                        .then(() => {
                            return response;
                        });
            })
        } else {
            // todo: handle gracefully
        }
    })
}