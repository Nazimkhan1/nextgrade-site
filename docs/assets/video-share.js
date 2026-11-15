// Video page (/apps/hisab-kitab/): share the video file through the phone's share sheet
// (with the app link as text), or the links on WhatsApp / clipboard. Nothing is uploaded.
(() => {
  const box = document.querySelector('.video-share');
  if (!box) return;
  const D = box.dataset;
  const btn = box.querySelector('.vs-file');
  const text = D.text;
  const label = btn.textContent;
  let file = null;

  const fallback = () => (navigator.share
    ? navigator.share({ title: D.title, text }).catch(() => null)
    : Promise.resolve(window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')));
  const canShareFile = (f) => !!(navigator.canShare && navigator.canShare({ files: [f] }));
  const shareFile = (f) => navigator.share({ files: [f], title: D.title, text })
    .then(() => { btn.textContent = label; })
    // the download can outlast the tap's permission to share; the next tap shares at once
    .catch((e) => { btn.textContent = e && e.name === 'AbortError' ? label : D.ready; });

  btn.addEventListener('click', () => {
    if (file) { canShareFile(file) ? shareFile(file) : fallback(); return; }
    if (!navigator.canShare) { fallback(); return; }
    btn.textContent = D.preparing;
    btn.disabled = true;
    fetch(D.src)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
      .then((blob) => { file = new File([blob], D.filename, { type: 'video/mp4' }); })
      .then(() => { btn.disabled = false; return canShareFile(file) ? shareFile(file) : fallback(); })
      .catch(() => { btn.disabled = false; btn.textContent = label; return fallback(); });
  });

  box.querySelector('.vs-wa').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
  box.querySelector('.vs-copy').addEventListener('click', (e) => {
    const b = e.currentTarget;
    const old = b.dataset.label || b.textContent;
    b.dataset.label = old;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
      .then(() => { b.textContent = D.copied; setTimeout(() => { b.textContent = old; }, 1500); })
      .catch(() => window.prompt('Copy', text));
  });
})();
