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

  // ---- read aloud
  // Chrome's online voices (e.g. "Google हिन्दी") stop silently on long text and break on pause/resume,
  // so the story is read sentence by sentence; pause = stop after remembering where we were.
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
  const voicesFor = () => {
    const voices = synth ? synth.getVoices() : [];
    const want = D.speech.toLowerCase().replace('_', '-');
    const base = want.split('-')[0];
    const match = voices.filter((v) => { const l = v.lang.toLowerCase().replace('_', '-'); return l === want || l.startsWith(`${base}-`) || l === base; });
    // on-device voices first (they handle long text and pause well), then online ones
    return match.sort((x, y) => (y.localService === true) - (x.localService === true) || (y.lang.toLowerCase().replace('_', '-') === want) - (x.lang.toLowerCase().replace('_', '-') === want));
  };
  const waitVoices = () => new Promise((res) => {
    if (!synth || synth.getVoices().length) { res(); return; }
    const done = () => { synth.removeEventListener('voiceschanged', done); res(); };
    synth.addEventListener('voiceschanged', done);
    setTimeout(done, 1500);
  });
  let state = 'idle'; // idle | speaking | paused
  let list = [], idx = 0, vi = 0, run = 0;
  const show = () => {
    listen.textContent = state === 'speaking' ? D.pause : state === 'paused' ? D.resume : D.listen;
    stop.hidden = state === 'idle';
  };
  const say = (myRun) => {
    if (myRun !== run || state !== 'speaking') return;
    if (idx >= list.length) { state = 'idle'; idx = 0; show(); return; }
    const vs = voicesFor();
    const voice = vs[vi] || null;
    const u = new SpeechSynthesisUtterance(list[idx]);
    u.lang = voice ? voice.lang : D.speech;
    if (voice) u.voice = voice;
    u.rate = 0.78;
    u.pitch = 1.05;
    let started = false;
    u.onstart = () => { started = true; };
    u.onend = () => { if (myRun !== run) return; idx += 1; setTimeout(() => say(myRun), 280); }; // short breath between sentences
    u.onerror = (e) => {
      if (myRun !== run || e.error === 'interrupted' || e.error === 'canceled') return;
      // this voice failed: try the next matching voice for the same sentence
      if (vi + 1 < vs.length) { vi += 1; say(myRun); return; }
      if (!started) status.textContent = D.noVoice;
      state = 'idle'; show();
    };
    synth.speak(u);
  };
  const begin = () => {
    run += 1;
    synth.cancel();
    state = 'speaking'; status.textContent = ''; show();
    const myRun = run;
    setTimeout(() => say(myRun), 60); // Chrome drops an utterance queued right after cancel()
  };
  const speak = () => {
    if (!synth) { status.textContent = D.noVoice; return; }
    state = 'speaking'; show();
    waitVoices().then(() => {
      if (!voicesFor().length && !D.speech.startsWith('en')) { state = 'idle'; show(); status.textContent = D.noVoice; return; }
      list = chunks(); idx = 0; vi = 0;
      begin();
    });
  };
  listen.addEventListener('click', () => {
    if (state === 'speaking') { run += 1; synth.cancel(); state = 'paused'; show(); return; }
    if (state === 'paused') { begin(); return; }
    speak();
  });
  stop.addEventListener('click', () => { run += 1; if (synth) synth.cancel(); state = 'idle'; idx = 0; show(); });
  window.addEventListener('pagehide', () => { if (synth) synth.cancel(); });
  // Chrome stops speaking after ~15 s in a background tab; keep it simple and stop when hidden
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'speaking') { run += 1; synth.cancel(); state = 'paused'; show(); } });

  // ---- sleep timer: stop the voice and darken the screen
  let timer = null;
  const sleep = () => {
    run += 1;
    if (synth) synth.cancel();
    state = 'idle'; idx = 0; show();
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
