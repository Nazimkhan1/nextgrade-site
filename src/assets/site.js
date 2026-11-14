// Copy buttons on wish lists: copy the wish and say so on the button.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  const text = btn.getAttribute('data-copy');
  const done = (label) => {
    btn.textContent = label;
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  };
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
    .then(() => done('Copied ✓'))
    .catch(() => {
      window.prompt('Copy this wish', text);
    });
});

// "<name> ki taraf se aapko …" — the name comes only from the link (?from=) and is shown as plain text.
const cleanName = (s) => String(s || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 30);
(() => {
  const from = cleanName(new URLSearchParams(location.search).get('from'));
  const banner = document.querySelector('.from-banner');
  if (!from || !banner) return;
  banner.textContent = `${banner.dataset.emoji} ${from} की तरफ़ से आपको ${banner.dataset.greet}!`;
  banner.hidden = false;
})();

// "Apna wish banao": build a link with your name and share it; nothing is stored anywhere.
document.querySelectorAll('.share-box').forEach((box) => {
  const input = box.querySelector('.share-name');
  const link = () => {
    const url = new URL(box.dataset.path, location.origin);
    const name = cleanName(input.value);
    if (name) url.searchParams.set('from', name);
    return { url: url.toString(), name };
  };
  const message = () => {
    const { url, name } = link();
    return `${box.dataset.wish}${name ? `\n— ${name}` : ''}\n\n${name ? 'अपने नाम से भेजें' : 'आप भी भेजें'} 👉 ${url}`;
  };
  box.querySelector('.share-wa').addEventListener('click', () => {
    if (!cleanName(input.value)) { input.focus(); input.placeholder = 'पहले अपना नाम लिखें'; return; }
    window.open(`https://wa.me/?text=${encodeURIComponent(message())}`, '_blank', 'noopener');
  });
  box.querySelector('.share-copy').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    (navigator.clipboard ? navigator.clipboard.writeText(link().url) : Promise.reject())
      .then(() => { btn.textContent = '✅ कॉपी हो गया'; setTimeout(() => { btn.textContent = '🔗 लिंक कॉपी'; }, 1500); })
      .catch(() => window.prompt('यह लिंक कॉपी करें', link().url));
  });
});
