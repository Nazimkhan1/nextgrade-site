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
  const text = () => [document.querySelector('h1'), ...document.querySelectorAll('#storyText p'), document.querySelector('.seekh')].map((el) => el.textContent.trim()).join('. \n');
  const pickVoice = () => {
    const voices = synth ? synth.getVoices() : [];
    const want = D.speech.toLowerCase();
    const base = want.split('-')[0];
    return voices.find((v) => v.lang.toLowerCase() === want) || voices.find((v) => v.lang.toLowerCase().startsWith(base)) || null;
  };
  let state = 'idle'; // idle | speaking | paused
  const show = () => {
    listen.textContent = state === 'speaking' ? D.pause : state === 'paused' ? D.resume : D.listen;
    stop.hidden = state === 'idle';
  };
  const speak = () => {
    const voice = pickVoice();
    if (!synth || (!voice && !D.speech.startsWith('en'))) { status.textContent = D.noVoice; return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text());
    u.lang = voice ? voice.lang : D.speech;
    if (voice) u.voice = voice;
    u.rate = 0.88;
    u.pitch = 1.05;
    u.onend = () => { state = 'idle'; show(); };
    u.onerror = () => { state = 'idle'; show(); };
    synth.speak(u);
    state = 'speaking';
    status.textContent = '';
    show();
  };
  listen.addEventListener('click', () => {
    if (state === 'speaking') { synth.pause(); state = 'paused'; }
    else if (state === 'paused') { synth.resume(); state = 'speaking'; }
    else { speak(); return; }
    show();
  });
  stop.addEventListener('click', () => { if (synth) synth.cancel(); state = 'idle'; show(); });
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {};
  window.addEventListener('pagehide', () => { if (synth) synth.cancel(); });

  // ---- sleep timer: stop the voice and darken the screen
  let timer = null;
  const sleep = () => {
    if (synth) synth.cancel();
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
