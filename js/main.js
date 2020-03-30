if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'})
    .then(console.log('SW is registered'))
    .catch((error) => {
        console.error('An error occurred while registering service worker');
    });
}

