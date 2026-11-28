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

// First visit: a language chooser (user 28 Nov 2026). The choice is kept in localStorage 'ng-lang' (hreflang code);
// picking another language opens this same page in that language (its <link rel="alternate" hreflang>). Picking in
// the header's language menu counts as a choice too. Not shown to crawlers or when storage is blocked.
(() => {
  const KEY = 'ng-lang';
  const get = () => { try { return localStorage.getItem(KEY); } catch (e) { return 'blocked'; } };
  const set = (v) => { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } };
  document.querySelectorAll('.lang-menu a[hreflang]').forEach((a) => a.addEventListener('click', () => set(a.getAttribute('hreflang'))));
  if (get() !== null || /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent) || navigator.webdriver) return;
  const alt = {};
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => { alt[l.getAttribute('hreflang')] = l.href; });
  const here = document.documentElement.lang || 'hi';
  const opts = [['en', 'English', 'Read in English'], ['hi', 'हिंदी', 'हिंदी में पढ़ें'], ['hi-Latn', 'Hinglish', 'Roman Hindi mein padho'], ['bn', 'বাংলা', 'বাংলায় পড়ুন']];
  const box = document.createElement('div');
  box.className = 'lang-modal';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-labelledby', 'lm-h');
  box.innerHTML = `<div class="lm-card"><button type="button" class="lm-x" aria-label="Close">✕</button><p class="lm-icon" aria-hidden="true">🌐</p><h2 id="lm-h">Choose your language</h2><p class="lm-sub">भाषा चुनें · Bhasha chuno · ভাষা বেছে নিন</p><div class="lm-opts">${opts.map(([c, n, s]) => `<button type="button" data-l="${c}"${c === here ? ' class="on"' : ''}><b>${n}</b><small>${s}</small></button>`).join('')}</div><p class="lm-note">You can change it any time from 🌐 at the top.</p></div>`;
  const close = (lang) => {
    set(lang);
    box.remove();
    document.documentElement.classList.remove('lm-open');
    if (lang !== here && alt[lang]) location.href = alt[lang] + location.search + location.hash;
  };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-l]');
    if (b) close(b.dataset.l);
    else if (e.target.closest('.lm-x') || e.target === box) close(here);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.isConnected) close(here); });
  document.body.appendChild(box);
  document.documentElement.classList.add('lm-open');
  box.querySelector('.lm-card').setAttribute('tabindex', '-1');
  box.querySelector('.lm-card').focus({ preventScroll: true });
})();
