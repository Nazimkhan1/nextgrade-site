// Offline support: the page, the size pages, icons and the two libraries (pdf.js, jsPDF) are cached on install.
// The PDF the user picks is read from the device and never fetched from a server, so nothing personal goes through here.
const CACHE = 'ng-pdf-compress-v1';
const SHELL = ['./', './index.html', './100kb/', './200kb/', './500kb/', './1mb/', './manifest.json', './icons/icon-192.png', './icons/icon-512.png',
  './lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/jspdf.umd.min.js'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (/\/lib\//.test(url.pathname)) {
    // cache first: library files never change for a given CACHE version
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; })));
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))),
  );
});
