/*
 * Small "share this game" row near the top of every game (before playing): WhatsApp + Facebook.
 * Needs <div id="topShare"></div> in the page. Uses the game's own <h1> and canonical link; follows
 * the game's language menu (#lang). No score here — the big challenge buttons after winning stay as they are.
 */
(() => {
  const box = document.getElementById('topShare');
  if (!box) return;
  const T = {
    hinglish: { lead: 'Doston ko bhejo:', msg: (t, u) => `🎮 ${t} — yeh game khelo! 👉 ${u}` },
    hi: { lead: 'दोस्तों को भेजो:', msg: (t, u) => `🎮 ${t} — यह गेम खेलो! 👉 ${u}` },
    en: { lead: 'Share with friends:', msg: (t, u) => `🎮 ${t} — play this game! 👉 ${u}` },
    bn: { lead: 'বন্ধুদের পাঠাও:', msg: (t, u) => `🎮 ${t} — এই গেমটা খেলো! 👉 ${u}` },
  };
  const css = document.createElement('style');
  css.textContent = '.topshare{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;margin:2px 0 12px;font-size:14px}'
    + '.topshare .ts-lead{opacity:.8}'
    + '.topshare button{font:inherit;font-weight:700;font-size:14px;border:0;border-radius:999px;padding:6px 14px;cursor:pointer;line-height:1.2}'
    + '.topshare .ts-wa{background:#25d366;color:#073b1d}.topshare .ts-fb{background:#1877f2;color:#fff}';
  document.head.append(css);
  box.className = 'topshare';

  const lang = () => { const s = document.getElementById('lang'); const v = s && s.value; return T[v] ? v : 'hinglish'; };
  const url = () => { const c = document.querySelector('link[rel=canonical]'); return (c && c.href) || (location.origin + location.pathname); };
  const title = () => { const h = document.querySelector('h1'); return ((h && h.textContent) || document.title).trim(); };

  const lead = document.createElement('span'); lead.className = 'ts-lead';
  const wa = document.createElement('button'); wa.type = 'button'; wa.className = 'ts-wa'; wa.textContent = 'WhatsApp';
  const fb = document.createElement('button'); fb.type = 'button'; fb.className = 'ts-fb'; fb.textContent = 'Facebook';
  wa.addEventListener('click', () => { window.open(`https://wa.me/?text=${encodeURIComponent(T[lang()].msg(title(), url()))}`, '_blank', 'noopener'); });
  fb.addEventListener('click', () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`, '_blank', 'noopener,width=620,height=560'); });
  box.replaceChildren(lead, wa, fb);

  const label = () => { lead.textContent = T[lang()].lead; };
  label();
  const sel = document.getElementById('lang');
  if (sel) sel.addEventListener('change', () => setTimeout(label, 0));
})();
