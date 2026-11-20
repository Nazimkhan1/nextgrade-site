// Offline support: the app page, its sub-pages, icons and the PDF library are cached on install. Photos the user
// picks are read from the device and never fetched from a server, so nothing personal goes through here.
const CACHE = 'ng-jpg-to-pdf-v1';
const SHELL = ['./', './index.html', './photo-to-pdf/', './pdf-under-100kb/', './pdf-under-200kb/', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './lib/jspdf.umd.min.js'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('./index.html'))),
  );
});
