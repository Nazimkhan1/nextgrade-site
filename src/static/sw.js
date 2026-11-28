/* NextGrade main-site service worker (28 Nov 2026).
   Pages: network-first (always fresh when online), last copy or an offline page when not.
   /assets/ + /fonts/ + /icons/: cache-first (file names carry ?v=, so a new build means a new URL).
   Games (/games/…) and tools (/tools/…) register their own workers and are left alone here. */
const VER = 'ng-v1';
const PAGES = `${VER}-pages`;
const STATIC = `${VER}-static`;
const OFFLINE_HTML = `<!doctype html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline — NextGrade</title><style>body{font-family:system-ui,sans-serif;background:#fffaf3;color:#2b2118;margin:0;display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px}main{max-width:420px}h1{font-size:1.4rem}a{color:#d9480f}</style></head><body><main><p style="font-size:3rem;margin:0">📶</p><h1>इंटरनेट नहीं है · You are offline</h1><p>जो पेज आपने पहले खोले थे, वे बिना इंटरनेट भी खुलेंगे। इंटरनेट आते ही पेज अपने-आप ताज़ा हो जाएगा।</p><p>Pages you opened before still work offline. Everything refreshes when you are back online.</p><p><a href="/">होम / Home</a></p></main></body></html>`;

self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(PAGES)); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('ng-') && !k.startsWith(VER)).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

const trim = async (name, max) => {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;                          // ads, analytics, fonts CDN: browser handles
  if (/^\/(games|tools)\//.test(url.pathname)) return;                // they have their own workers
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(url.pathname, copy)).then(() => trim(PAGES, 60)); }
        return res;
      }).catch(async () => (await caches.match(url.pathname)) || new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })),
    );
    return;
  }
  if (/^\/(assets|fonts|icons)\//.test(url.pathname) || url.pathname === '/favicon.svg') {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(STATIC).then((c) => c.put(req, copy)).then(() => trim(STATIC, 80)); }
        return res;
      })),
    );
  }
});
