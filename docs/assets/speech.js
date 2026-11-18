// Speech pages: "Listen" reads one speech block aloud with the browser's own voice (NGVoice); "Print" prints the page.
(() => {
  const root = document.querySelector('[data-speech-lang]');
  if (!root) return;
  const lang = root.dataset.speechLang, L = { listen: root.dataset.listen, stop: root.dataset.stop, noVoice: root.dataset.noVoice };
  let ctl = null, active = null;
  const reset = () => { if (active) active.textContent = L.listen; active = null; };
  document.querySelectorAll('.sp-listen').forEach((btn) => btn.addEventListener('click', () => {
    if (ctl) { ctl.stop(); ctl = null; const was = active; reset(); if (was === btn) return; }
    if (!window.NGVoice || !NGVoice.ok) { btn.textContent = L.noVoice; return; }
    const box = document.getElementById(btn.dataset.target);
    const parts = [...box.querySelectorAll('p, li')].map((p) => p.textContent.trim()).filter(Boolean)
      .flatMap((t) => t.split(/(?<=[।.!?])\s+/)).filter(Boolean);
    active = btn; btn.textContent = L.stop;
    ctl = NGVoice.play(parts, { lang, rate: 0.85, gap: 300, onState: (s) => { if (s === 'idle') { ctl = null; reset(); } }, onFail: () => { ctl = null; const b = active; reset(); if (b) b.textContent = L.noVoice; } });
  }));
  document.querySelectorAll('.sp-print').forEach((b) => b.addEventListener('click', () => window.print()));
  window.addEventListener('pagehide', () => { if (ctl) ctl.stop(); });
})();
