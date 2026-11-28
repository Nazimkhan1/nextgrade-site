// Copy buttons on wish lists: copy the wish and say so on the button (labels come from the page language).
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  const text = btn.getAttribute('data-copy');
  const label = btn.dataset.label || btn.textContent;
  btn.dataset.label = label;
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
    .then(() => {
      btn.textContent = btn.dataset.done || 'Copied ✓';
      setTimeout(() => { btn.textContent = label; }, 1500);
    })
    .catch(() => window.prompt('Copy', text));
});

// "<name> sends you …" — the name comes only from the link (?from=) and is shown as plain text.
const cleanName = (s) => String(s || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 30);
(() => {
  const from = cleanName(new URLSearchParams(location.search).get('from'));
  const banner = document.querySelector('.from-banner');
  if (!from || !banner) return;
  const text = (banner.dataset.tpl || '{from}: {greet}').replace('{from}', from).replace('{greet}', banner.dataset.greet);
  banner.textContent = `${banner.dataset.emoji} ${text}`;
  banner.hidden = false;
})();

// "Make your own wish": build a link with your name and share it; nothing is stored anywhere.
document.querySelectorAll('.share-box:not(.video-share)').forEach((box) => {
  const input = box.querySelector('.share-name');
  const link = () => {
    const url = new URL(box.dataset.path, location.origin);
    const name = cleanName(input.value);
    if (name) url.searchParams.set('from', name);
    return { url: url.toString(), name };
  };
  const message = () => {
    const { url, name } = link();
    return `${box.dataset.wish}${name ? `\n— ${name}` : ''}\n\n${name ? box.dataset.withName : box.dataset.withoutName} 👉 ${url}`;
  };
  box.querySelector('.share-wa').addEventListener('click', () => {
    if (!cleanName(input.value)) { input.focus(); input.placeholder = box.dataset.needName; return; }
    window.open(`https://wa.me/?text=${encodeURIComponent(message())}`, '_blank', 'noopener');
  });
  box.querySelector('.share-copy').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const label = btn.dataset.label || btn.textContent;
    btn.dataset.label = label;
    (navigator.clipboard ? navigator.clipboard.writeText(link().url) : Promise.reject())
      .then(() => { btn.textContent = box.dataset.copied; setTimeout(() => { btn.textContent = label; }, 1500); })
      .catch(() => window.prompt(box.dataset.copyPrompt, link().url));
  });
});

// Close the language and menu dropdowns when tapping anywhere else (so only one is open), or on Escape.
const openMenus = () => document.querySelectorAll('details.lang-menu[open], details.nav-group[open]');
document.addEventListener('click', (e) => {
  openMenus().forEach((d) => { if (!d.contains(e.target)) d.removeAttribute('open'); });
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openMenus().forEach((d) => d.removeAttribute('open')); });

// Phone menu (☰): opens the main nav as a panel; closes on outside tap or Escape.
(() => {
  const btn = document.querySelector('.menu-btn');
  if (!btn) return;
  const set = (open) => { document.body.classList.toggle('menu-open', open); btn.setAttribute('aria-expanded', String(open)); btn.textContent = open ? '✕' : '☰'; };
  btn.addEventListener('click', (e) => { e.stopPropagation(); set(!document.body.classList.contains('menu-open')); });
  document.addEventListener('click', (e) => { if (document.body.classList.contains('menu-open') && !e.target.closest('.nav')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
})();

// Dark/light toggle (☀️/🌙): flips from what is showing now (saved choice, else the device setting) and remembers it.
(() => {
  const btn = document.querySelector('.site-head .theme-btn');
  if (!btn) return;
  const root = document.documentElement;
  btn.addEventListener('click', () => {
    const t = root.getAttribute('data-theme');
    const dark = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('ng-theme', next); } catch (e) { /* private mode: works for this page only */ }
  });
})();

// Home search: loads /assets/search-<lang>.json on first focus, matches every word (accents/case ignored).
(() => {
  const q = document.getElementById('ss-q'), box = document.getElementById('ss-r');
  if (!q || !box) return;
  let rows = null, sel = -1;
  const norm = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  const load = () => rows || fetch(q.dataset.index).then((r) => r.json()).then((d) => { rows = d.map(([t, u]) => [t, u, norm(`${t} ${u.replace(/[-/]/g, ' ')}`)]); return rows; });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const show = async () => {
    const v = norm(q.value).trim();
    if (!v) { box.hidden = true; return; }
    const all = await load(), words = v.split(/\s+/);
    const hits = all.filter((r) => words.every((w) => r[2].includes(w)))
      .sort((a, b) => (norm(a[0]).startsWith(words[0]) ? 0 : 1) - (norm(b[0]).startsWith(words[0]) ? 0 : 1) || a[0].length - b[0].length).slice(0, 12);
    sel = -1;
    box.innerHTML = hits.length ? hits.map(([t, u]) => `<li><a href="${esc(u)}">${esc(t)}<small>nextgrade.in${esc(u)}</small></a></li>`).join('') : `<li class="none">${esc(q.dataset.none)}</li>`;
    box.hidden = false;
  };
  q.addEventListener('focus', load, { once: true });
  q.addEventListener('input', show);
  q.addEventListener('keydown', (e) => {
    const links = [...box.querySelectorAll('a')];
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, Math.min(links.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1))); links.forEach((a, i) => a.classList.toggle('on', i === sel)); }
    if (e.key === 'Enter' && links.length) { e.preventDefault(); location.href = (links[sel] || links[0]).href; }
    if (e.key === 'Escape') box.hidden = true;
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.site-search')) box.hidden = true; });
})();

// Bottom cards (user 28 Nov 2026: "pura page nhi, pwa jaisa", like hisab.nextgrade.in's install sheet).
// 1) First visit: a small language card slides up from the bottom after a few seconds or the first scroll —
//    no overlay, the page stays usable. Choice (or ✕) is kept in localStorage 'ng-lang'; the header 🌐 menu still works.
// 2) Later visits, on daily-use pages: an "install NextGrade" card (Android/desktop: the browser's install prompt;
//    iPhone: Share → Add to Home Screen steps). "Later" hides it for 14 days. Never both cards at once.
(() => {
  const ls = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return 'blocked'; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const LANG_KEY = 'ng-lang';
  document.querySelectorAll('.lang-menu a[hreflang]').forEach((a) => a.addEventListener('click', () => ls.set(LANG_KEY, a.getAttribute('hreflang'))));
  // Not during our own prerender (headless Chrome), so the card never ends up inside saved HTML.
  if (navigator.webdriver || /HeadlessChrome|Lighthouse/i.test(navigator.userAgent)) return;
  const here = document.documentElement.lang || 'hi';
  const L = { hi: 'hi', en: 'en', 'hi-Latn': 'hinglish', bn: 'bn' }[here] || 'hi';
  const T = {
    hi: { lang: 'अपनी भाषा चुनें', langSub: 'यही पेज आपकी भाषा में खुलेगा — बाद में 🌐 से बदल सकते हैं', close: 'बंद करें', inst: 'NextGrade को फ़ोन में जोड़ें', instSub: 'ऐप की तरह एक टैप में खुलेगा — आज का दिन, नमाज़ टाइम, मौसम, कैलकुलेटर', go: 'इंस्टॉल करें', later: 'बाद में', ok: 'ठीक है', ios: ['नीचे <b>Share</b> (⬆️) बटन दबाएँ', '<b>Add to Home Screen</b> चुनें', 'ऊपर <b>Add</b> दबाएँ'] },
    en: { lang: 'Choose your language', langSub: 'This page opens in your language — change it any time from 🌐', close: 'Close', inst: 'Add NextGrade to your phone', instSub: 'Opens in one tap like an app — today, prayer times, weather, calculators', go: 'Install', later: 'Later', ok: 'OK', ios: ['Tap the <b>Share</b> (⬆️) button below', 'Choose <b>Add to Home Screen</b>', 'Tap <b>Add</b> at the top'] },
    hinglish: { lang: 'Apni bhasha chuno', langSub: 'Yahi page aapki bhasha mein khulega — baad mein 🌐 se badal sakte ho', close: 'Band karo', inst: 'NextGrade ko phone mein jodo', instSub: 'App ki tarah ek tap mein khulega — aaj ka din, namaz time, mausam, calculator', go: 'Install karo', later: 'Baad mein', ok: 'Theek hai', ios: ['Neeche <b>Share</b> (⬆️) button dabao', '<b>Add to Home Screen</b> chuno', 'Upar <b>Add</b> dabao'] },
    bn: { lang: 'তোমার ভাষা বেছে নাও', langSub: 'এই পেজটাই তোমার ভাষায় খুলবে — পরে 🌐 থেকে বদলাতে পারো', close: 'বন্ধ করো', inst: 'NextGrade ফোনে যোগ করো', instSub: 'অ্যাপের মতো এক ট্যাপে খুলবে — আজকের দিন, নামাজের সময়, আবহাওয়া, ক্যালকুলেটর', go: 'ইনস্টল করো', later: 'পরে', ok: 'ঠিক আছে', ios: ['নিচে <b>Share</b> (⬆️) বোতাম চাপো', '<b>Add to Home Screen</b> বেছে নাও', 'ওপরে <b>Add</b> চাপো'] },
  }[L];
  let open = null;
  const sheet = (id, html) => {
    const box = document.createElement('div');
    box.className = 'ng-sheet';
    box.id = id;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-labelledby', `${id}-h`);
    box.innerHTML = `<div class="in">${html}</div>`;
    document.body.appendChild(box);
    open = box;
    return box;
  };
  const shut = (box) => { if (box && box.isConnected) box.remove(); if (open === box) open = null; };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) open.querySelector('.ng-x, [data-later]')?.click(); });

  // 1) language card
  const langPending = ls.get(LANG_KEY) === null;
  if (langPending) {
    const alt = {};
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => { alt[l.getAttribute('hreflang')] = l.href; });
    const opts = [['hi', 'हिंदी'], ['en', 'English'], ['bn', 'বাংলা'], ['hi-Latn', 'Hinglish']].filter(([c]) => c === here || alt[c]);
    let shown = false;
    const show = () => {
      if (shown || open) return;
      shown = true;
      removeEventListener('scroll', onScroll);
      const box = sheet('ng-lang', `<span class="ico" aria-hidden="true">🌐</span><b id="ng-lang-h">${T.lang}</b><p>${T.langSub}</p><button type="button" class="ng-x" aria-label="${T.close}">✕</button><div class="acts langs">${opts.map(([c, n]) => `<button type="button" data-l="${c}"${c === here ? ' class="on"' : ''}>${n}</button>`).join('')}</div>`);
      box.addEventListener('click', (e) => {
        const b = e.target.closest('[data-l]');
        if (b) {
          ls.set(LANG_KEY, b.dataset.l);
          shut(box);
          if (b.dataset.l !== here && alt[b.dataset.l]) location.href = alt[b.dataset.l] + location.search + location.hash;
        } else if (e.target.closest('.ng-x')) { ls.set(LANG_KEY, here); shut(box); }
      });
    };
    const onScroll = () => { if (scrollY > 120) show(); };
    addEventListener('scroll', onScroll, { passive: true });
    setTimeout(show, 4000);
    if (opts.length < 2) ls.set(LANG_KEY, here);
  }

  // 2) install card (later visits, daily-use pages)
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (standalone) { ls.set('ng-installed', '1'); return; }
  try {
    if (!sessionStorage.getItem('ng-seen')) { sessionStorage.setItem('ng-seen', '1'); ls.set('ng-visits', String((+ls.get('ng-visits') || 0) + 1)); }
  } catch (e) { /* storage blocked */ }
  const daily = /^\/(?:(?:en|bn|hinglish)\/)?(?:aaj|namaz-time|mausam|calculator|kitne-din-baaki|income-tax|ramzan|currency|sunrise-sunset|calendar|islamic-calendar|loan-emi|sip)(?:\/|$)/.test(location.pathname) || location.pathname === '/' || /^\/(en|bn|hinglish)\/$/.test(location.pathname);
  const later = +ls.get('ng-install-later') || 0;
  const canAsk = daily && !langPending && ls.get('ng-installed') !== '1' && (+ls.get('ng-visits') || 0) >= 2 && Date.now() - later > 14 * 864e5;
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS/.test(navigator.userAgent);
  let evt = null;
  const showInstall = () => {
    if (!canAsk || open || (!evt && !ios)) return;
    const box = sheet('ng-inst', `<img src="/icons/icon-192.png" alt="" width="56" height="56"><b id="ng-inst-h">${T.inst}</b><p>${T.instSub}</p>${evt ? '' : `<ol>${T.ios.map((x) => `<li>${x}</li>`).join('')}</ol>`}<div class="acts"><button type="button" data-later>${evt ? T.later : T.ok}</button>${evt ? `<button type="button" class="go" data-go>${T.go}</button>` : ''}</div>`);
    box.addEventListener('click', async (e) => {
      if (e.target.closest('[data-later]')) { ls.set('ng-install-later', String(Date.now())); shut(box); }
      if (e.target.closest('[data-go]') && evt) {
        evt.prompt();
        const r = await evt.userChoice.catch(() => ({}));
        if (r.outcome === 'accepted') ls.set('ng-installed', '1'); else ls.set('ng-install-later', String(Date.now()));
        evt = null;
        shut(box);
      }
    });
  };
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); evt = e; setTimeout(showInstall, 6000); });
  addEventListener('appinstalled', () => { ls.set('ng-installed', '1'); if (open && open.id === 'ng-inst') shut(open); if (window.gtag) gtag('event', 'pwa_install'); });
  if (ios) setTimeout(showInstall, 6000);
})();

// Offline support + installable app: one service worker for the main site (games and tools keep their own).
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {}));
}
