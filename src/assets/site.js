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
