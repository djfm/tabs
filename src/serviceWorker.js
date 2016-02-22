/* global navigator */

export default function registerServiceWorker () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/serviceWorker.js')
            .catch(err => {
                console.log("ServiceWorker registration failed: ", err);
            })
        ;
    }
}
