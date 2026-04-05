const CACHE_NAME = 'toh-academy-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/img/carousel-1.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  if (!event.data) return;

  let notificationData = {
    title: 'TOH Academy',
    body: 'New notification',
    icon: '/img/favicon.png',
    badge: '/img/favicon.png',
    tag: 'toh-notification',
    requireInteraction: true
  };

  try {
    notificationData = { ...notificationData, ...event.data.json() };
  } catch (e) {
    notificationData.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
