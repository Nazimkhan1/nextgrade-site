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
