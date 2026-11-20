// Offline support: the maker is one page (plus the UPI and WhatsApp pages), the QR library and icons, cached on install.
// UPI IDs, numbers and passwords typed by the user stay in the page; nothing personal goes through here.
const CACHE = 'ng-qr-maker-v1';
const SHELL = ['./', './index.html', './upi/', './whatsapp/', './lib/qrcode.min.js', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
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
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))),
  );
});
