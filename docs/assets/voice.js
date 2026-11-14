/**
 * NGVoice — reliable read-aloud with the browser's own voices (nothing is sent anywhere).
 * Some Chrome builds list a Hindi voice that then stays silent, ends at once, or never starts.
 * So every sentence is spoken with a watchdog: if a voice fails, the next matching voice is tried
 * (on-device first, then online, then "no voice, just the language"), and the one that works is remembered.
 *
 *   const c = NGVoice.play(['sentence 1', 'sentence 2'], { lang: 'hi-IN', rate: 0.8, gap: 280,
 *     onState: (s) => {}, onVoice: (name) => {}, onFail: (report) => {} });
 *   c.pause(); c.resume(); c.stop();
 */
(() => {
  const synth = window.speechSynthesis;
  const ok = !!synth && 'SpeechSynthesisUtterance' in window;
  const norm = (l) => String(l || '').toLowerCase().replace('_', '-');
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const ready = () => new Promise((res) => {
    if (!ok || synth.getVoices().length) { res(); return; }
    let done = false;
    const fin = () => { if (done) return; done = true; synth.removeEventListener('voiceschanged', fin); res(); };
    synth.addEventListener('voiceschanged', fin);
    setTimeout(fin, 1500);
  });
  // candidate voices for a language: the remembered good one, then on-device, then online, then null (lang only)
  const candidates = (lang) => {
    const want = norm(lang), base = want.split('-')[0];
    const good = store.get(`ng-voice-${base}`);
    const bad = (store.get(`ng-voice-bad-${base}`) || '').split('|').filter(Boolean);
    const all = (ok ? synth.getVoices() : []).filter((v) => { const l = norm(v.lang); return l === want || l === base || l.startsWith(`${base}-`); });
    const score = (v) => (v.name === good ? 100 : 0) + (v.localService ? 10 : 0) + (norm(v.lang) === want ? 5 : 0) - (bad.includes(v.name) ? 50 : 0);
    return [...all.sort((a, b) => score(b) - score(a)), null];
  };
  const markBad = (lang, name) => {
    if (!name) return;
    const base = norm(lang).split('-')[0];
    const bad = new Set((store.get(`ng-voice-bad-${base}`) || '').split('|').filter(Boolean));
    bad.add(name); store.set(`ng-voice-bad-${base}`, [...bad].slice(-6).join('|'));
  };
  const markGood = (lang, name) => {
    const base = norm(lang).split('-')[0];
    if (name) store.set(`ng-voice-${base}`, name);
    const bad = (store.get(`ng-voice-bad-${base}`) || '').split('|').filter((n) => n && n !== name);
    store.set(`ng-voice-bad-${base}`, bad.join('|'));
  };

  // speak one piece of text with one voice; resolves 'ok' | 'silent' | 'timeout' | 'error:<code>' | 'stopped'
  const once = (text, voice, lang, rate, pitch, token, heard) => new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : lang;
    if (voice) u.voice = voice;
    u.rate = rate; u.pitch = pitch;
    let started = false, t0 = 0, settled = false;
    const done = (r) => { if (settled) return; settled = true; clearTimeout(watch); resolve(r); };
    const watch = setTimeout(() => { if (!started && token.alive) { synth.cancel(); done('timeout'); } }, 2600);
    u.onstart = () => { started = true; t0 = performance.now(); setTimeout(() => { if (!settled && token.alive) heard(); }, 900); };
    u.onend = () => {
      if (!token.alive) { done('stopped'); return; }
      const took = started ? performance.now() - t0 : 0;
      // a real voice needs time to say the words; ending at once means nothing was heard
      done(!started || took < Math.min(600, text.length * 12) ? 'silent' : 'ok');
    };
    u.onerror = (e) => done(e.error === 'interrupted' || e.error === 'canceled' ? 'stopped' : `error:${e.error || 'unknown'}`);
    synth.speak(u);
  });

  const play = (pieces, opt) => {
    const o = Object.assign({ lang: 'hi-IN', rate: 0.85, pitch: 1.05, gap: 250, onState: () => {}, onVoice: () => {}, onFail: () => {} }, opt);
    const list = pieces.map((s) => String(s).replace(/[\p{Extended_Pictographic}\u{FE0F}‍]/gu, '').trim()).filter(Boolean);
    let idx = 0, token = { alive: false }, state = 'idle', vi = 0, cands = [], report = [], announced = '';
    const set = (s) => { state = s; o.onState(s); };
    const run = () => {
      const my = token = { alive: true };
      set('speaking');
      const next = () => {
        if (!my.alive) return;
        if (idx >= list.length) { set('idle'); idx = 0; return; }
        const v = cands[vi];
        const heard = () => { const n = v ? v.name : o.lang; if (announced === n) return; announced = n; markGood(o.lang, v && v.name); o.onVoice(n); report = []; };
        once(list[idx], v, o.lang, o.rate, o.pitch, my, heard).then((r) => {
          if (!my.alive || r === 'stopped') return;
          if (r === 'ok') { heard(); idx += 1; setTimeout(next, o.gap); return; }
          report.push(`${v ? v.name : o.lang}: ${r}`);
          markBad(o.lang, v && v.name);
          vi += 1;
          if (vi < cands.length) { synth.cancel(); setTimeout(next, 120); return; }
          set('idle'); o.onFail(report.join(' · '));
        });
      };
      // Chrome can get stuck "paused" or drop an utterance queued right after cancel()
      synth.cancel(); if (synth.paused) synth.resume();
      setTimeout(next, 80);
    };
    const ctl = {
      get state() { return state; },
      get index() { return idx; },
      start() {
        if (!ok) { o.onFail('no speechSynthesis'); return ctl; }
        ready().then(() => { cands = candidates(o.lang); vi = 0; report = []; run(); });
        return ctl;
      },
      pause() { token.alive = false; synth.cancel(); set('paused'); },
      resume() { run(); },
      stop() { token.alive = false; if (ok) synth.cancel(); idx = 0; set('idle'); },
    };
    return ctl.start();
  };

  window.NGVoice = { ok, play, ready, candidates, stopAll: () => { if (ok) synth.cancel(); } };
  if (ok) synth.getVoices();
})();
