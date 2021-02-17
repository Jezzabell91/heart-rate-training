if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(registration => console.log(`ServiceWorker registration successful with scope: ${registration.scope}`))
      .catch(err => console.log(`ServiceWorker registration failed: ${err}`))
    })
  }