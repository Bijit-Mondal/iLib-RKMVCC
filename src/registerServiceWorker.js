/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      setInterval(() => {
         registration.update();
       }, 1000 * 60 * 60); // e.g. hourly checks
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated(registration) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      console.log('New content is available; please refresh.')
    },
    offline () {
      alert('You are offline. Turn on your Mobile Data')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
