// Bedtime story page: read aloud (browser voice), night mode and a sleep timer. Nothing leaves the phone.
(() => {
  const page = document.querySelector('.story-page');
  if (!page) return;
  const D = page.dataset;
  const $ = (id) => document.getElementById(id);
  const listen = $('listen');
  const stop = $('stopSpeak');
  const status = $('storyStatus');
  const synth = window.speechSynthesis;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };

  // ---- night mode (remembered on this device)
  const setNight = (on) => {
    document.body.classList.toggle('night', on);
    $('nightToggle').textContent = on ? D.day : D.night;
    store.set('ng-night', on ? '1' : '0');
  };
  setNight(store.get('ng-night') === '1');
  $('nightToggle').addEventListener('click', () => setNight(!document.body.classList.contains('night')));

  // ---- read aloud (sentence by sentence through NGVoice, which tries every matching voice until one is heard)
  const chunks = () => {
    const parts = [document.querySelector('h1'), ...document.querySelectorAll('#storyText p'), document.querySelector('.seekh')]
      .filter(Boolean).map((el) => el.textContent.trim()).filter(Boolean);
    const out = [];
    parts.forEach((p) => (p.match(/[^।.!?]+[।.!?]*["'”’]?\s*/g) || [p]).forEach((sent) => {
      const t = sent.trim();
      if (!t) return;
      const last = out[out.length - 1];
      if (last && last.length + t.length < 160) out[out.length - 1] = `${last} ${t}`; else out.push(t);
    }));
    return out;
  };
  let state = 'idle'; // idle | speaking | paused
  let ctl = null;
  const show = () => {
    listen.textContent = state === 'speaking' ? D.pause : state === 'paused' ? D.resume : D.listen;
    stop.hidden = state === 'idle';
  };
  const speak = () => {
    if (!window.NGVoice || !NGVoice.ok) { status.textContent = D.noVoice; return; }
    status.textContent = '';
    ctl = NGVoice.play(chunks(), {
      lang: D.speech, rate: 0.78, gap: 300,
      onState: (s) => { state = s; show(); },
      onVoice: (name) => { status.textContent = `🔊 ${name}`; },
      onFail: (why) => { state = 'idle'; show(); status.textContent = `${D.noVoice} (${why})`; },
    });
  };
  listen.addEventListener('click', () => {
    if (state === 'speaking' && ctl) { ctl.pause(); return; }
    if (state === 'paused' && ctl) { ctl.resume(); return; }
    speak();
  });
  stop.addEventListener('click', () => { if (ctl) ctl.stop(); state = 'idle'; show(); });
  window.addEventListener('pagehide', () => { if (ctl) ctl.stop(); });
  // Chrome stops speaking in a background tab; pause and let the reader resume
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'speaking' && ctl) ctl.pause(); });

  // ---- sleep timer: stop the voice and darken the screen
  let timer = null;
  const sleep = () => {
    if (ctl) ctl.stop();
    state = 'idle'; show();
    const veil = document.createElement('div');
    veil.className = 'sleep-veil';
    veil.innerHTML = '<div><p class="gn"></p><p class="gns"></p></div>';
    veil.querySelector('.gn').textContent = D.goodnight;
    veil.querySelector('.gns').textContent = D.goodnightSub;
    veil.addEventListener('click', () => veil.remove());
    document.body.appendChild(veil);
    $('sleepTimer').value = '0';
  };
  $('sleepTimer').addEventListener('change', (e) => {
    clearTimeout(timer);
    const min = Number(e.target.value);
    if (min > 0) timer = setTimeout(sleep, min * 60 * 1000);
  });
})();
