/* Pranayam follow-along (/pranayam/<type>/): a breath ball grows/shrinks with the phase, nostril cue for anulom-vilom,
   a soft hum (bhramari), a tap per stroke (kapalbhati), optional voice, minutes timer, daily streak, WhatsApp share. */
(function () {
  var root = document.getElementById('pr'), cfgEl = document.getElementById('pr-cfg');
  if (!root || !cfgEl) return;
  var C = JSON.parse(cfgEl.textContent), U = C.ui, TYPE = C.type;
  var PAT = {
    anulom: { slow: [['inL', 5], ['outR', 8], ['inR', 5], ['outL', 8]], normal: [['inL', 4], ['outR', 6], ['inR', 4], ['outL', 6]] },
    bhramari: { slow: [['in', 5], ['hum', 10]], normal: [['in', 4], ['hum', 8]] },
    deergh: { slow: [['in', 5], ['hold', 2], ['out', 7]], normal: [['in', 4], ['hold', 2], ['out', 6]] },
    kapal: { slow: [['pump', 30, 1.2], ['rest', 30]], normal: [['pump', 30, 1], ['rest', 25]] },
  }[TYPE];
  var css = '.pr{background:linear-gradient(180deg,#e7f5ff,#f3f0ff);border:1px solid var(--line);border-radius:22px;padding:16px;margin:14px 0;color:#1f2937;text-align:center;box-shadow:var(--shadow)}.pr:fullscreen{display:flex;flex-direction:column;justify-content:center;border-radius:0}.pr-stage{position:relative;height:250px;display:grid;place-items:center}.pr-ball{width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#a5d8ff,#4dabf7 60%,#1c7ed6);box-shadow:0 0 40px rgba(77,171,247,.5);transform:scale(.7)}.pr-ball.pump{transition:transform .25s ease!important}.pr-cnt{position:absolute;font-size:44px;font-weight:800;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.25)}.pr-nose{position:absolute;bottom:4px;left:0;right:0;display:flex;justify-content:center;gap:90px;font-weight:800;font-size:15px}.pr-nose span{opacity:.25;transition:opacity .3s}.pr-nose span.on{opacity:1;color:#1c7ed6}.pr-phase{font-size:24px;font-weight:800;margin:6px 0 2px;min-height:1.4em}.pr-sub{font-size:15px;color:#4b5563;min-height:1.4em}.pr-bar{height:6px;border-radius:6px;background:rgba(0,0,0,.08);overflow:hidden;margin:10px 0}.pr-bar i{display:block;height:100%;width:0;background:#4dabf7}.pr-ctl,.pr-opt{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:8px;align-items:center;font-size:14px}.pr-opt select{font:inherit;padding:6px 8px;border-radius:10px;border:1px solid #cbd5e1;background:#fff}.pr-done b{display:block;font-size:22px;margin-top:8px}.pr-top{display:flex;justify-content:space-between;font-weight:700;font-size:14px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  root.innerHTML = '<div class="pr-top"><span id="pr-left"></span><span id="pr-streak"></span></div><div class="pr-stage"><div class="pr-ball" id="pr-ball"></div><div class="pr-cnt" id="pr-cnt"></div>' +
    (TYPE === 'anulom' ? '<div class="pr-nose"><span id="pr-L">← ' + U.left + '</span><span id="pr-R">' + U.right + ' →</span></div>' : '') + '</div>' +
    '<div class="pr-phase" id="pr-phase">' + U.ready + '</div><div class="pr-sub" id="pr-sub"></div><div class="pr-bar"><i id="pr-prog"></i></div>' +
    '<div class="pr-ctl"><button class="btn btn-primary" type="button" id="pr-play">' + U.start + '</button><button class="btn btn-ghost" type="button" id="pr-full">' + U.full + '</button></div>' +
    '<div class="pr-opt"><label>' + U.minutes + ' <select id="pr-min"><option>1</option><option selected>3</option><option>5</option><option>10</option><option>15</option></select></label>' +
    '<label>' + U.speed + ' <select id="pr-speed"><option value="slow">' + U.slow + '</option><option value="normal" selected>' + U.normal + '</option></select></label>' +
    '<label><input type="checkbox" id="pr-voice"> ' + U.voice + '</label><label><input type="checkbox" id="pr-sound" checked> ' + U.sound + '</label></div><div class="pr-done" id="pr-done" hidden></div>';
  var $ = function (id) { return document.getElementById(id); };
  var ball = $('pr-ball'), ac = null, hum = null, playing = false, endAt = 0, timers = [], tick = 0, wake = null;
  function snd() { if (!$('pr-sound').checked) return null; if (!ac) try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } if (ac.state === 'suspended') ac.resume(); return ac; }
  function bell(f) { var a = snd(); if (!a) return; var o = a.createOscillator(), g = a.createGain(); o.frequency.value = f || 660; g.gain.setValueAtTime(.0001, a.currentTime); g.gain.linearRampToValueAtTime(.18, a.currentTime + .02); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + 1.6); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 1.7); }
  function tap() { var a = snd(); if (!a) return; var o = a.createOscillator(), g = a.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(180, a.currentTime); o.frequency.exponentialRampToValueAtTime(90, a.currentTime + .12); g.gain.setValueAtTime(.35, a.currentTime); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + .15); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + .16); }
  function humOn(sec) { var a = snd(); if (!a) return; var o = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain(); o.frequency.value = 150; o2.frequency.value = 300; o2.type = 'triangle'; g.gain.setValueAtTime(.0001, a.currentTime); g.gain.linearRampToValueAtTime(.08, a.currentTime + .4); g.gain.setValueAtTime(.08, a.currentTime + sec - .6); g.gain.linearRampToValueAtTime(.0001, a.currentTime + sec); o.connect(g); o2.connect(g); g.connect(a.destination); o.start(); o2.start(); o.stop(a.currentTime + sec); o2.stop(a.currentTime + sec); hum = [o, o2]; }
  function say(t) { if (!$('pr-voice').checked || !window.speechSynthesis) return; speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = { hi: 'hi-IN', hinglish: 'hi-IN', en: 'en-IN', bn: 'bn-IN' }[C.lang]; u.rate = .9; speechSynthesis.speak(u); }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clear() { timers.forEach(clearTimeout); timers = []; clearInterval(tick); if (hum) { try { hum.forEach(function (o) { o.stop(); }); } catch (e) {} hum = null; } }
  function nose(side) { if (TYPE !== 'anulom') return; $('pr-L').className = side === 'L' ? 'on' : ''; $('pr-R').className = side === 'R' ? 'on' : ''; }
  function count(sec) { var n = Math.round(sec); $('pr-cnt').textContent = n; clearInterval(tick); tick = setInterval(function () { n--; $('pr-cnt').textContent = n > 0 ? n : ''; if (n <= 0) clearInterval(tick); }, 1000); }
  var pi = 0;
  function phase() {
    if (!playing) return;
    if (Date.now() >= endAt) { finish(); return; }
    var pat = PAT[$('pr-speed').value], p = pat[pi % pat.length], key = p[0], sec = p[1]; pi++;
    $('pr-phase').textContent = U[key]; $('pr-sub').textContent = U[key + 'Sub'] || '';
    ball.className = 'pr-ball'; ball.style.transition = 'transform ' + sec + 's ease-in-out';
    if (key === 'pump') {
      // kapalbhati: `sec` quick strokes, one every p[2] seconds
      var every = p[2] * 1000, k = 0; say(U.pump); nose('');
      (function stroke() { if (!playing) return; k++; ball.className = 'pr-ball pump'; ball.style.transform = 'scale(.55)'; tap(); $('pr-cnt').textContent = k; later(function () { ball.style.transform = 'scale(.8)'; }, every * .35); if (k < sec) later(stroke, every); else later(phase, every); })();
      return;
    }
    ball.style.transform = /^in/.test(key) ? 'scale(1.35)' : key === 'hold' ? ball.style.transform : 'scale(.7)';
    nose(key === 'inL' || key === 'outL' ? 'L' : key === 'inR' || key === 'outR' ? 'R' : '');
    count(sec); if (key === 'hum') humOn(sec); else if (key !== 'hold') bell(/^in/.test(key) ? 660 : 520);
    say(U[key]);
    later(phase, sec * 1000);
  }
  function progress() { if (!playing) return; var tot = +$('pr-min').value * 60000, left = Math.max(0, endAt - Date.now()); $('pr-prog').style.width = ((1 - left / tot) * 100) + '%'; $('pr-left').textContent = Math.floor(left / 60000) + ':' + String(Math.floor(left / 1000) % 60).padStart(2, '0'); later(progress, 500); }
  function play() {
    if (playing) { playing = false; clear(); $('pr-play').textContent = U.start; $('pr-phase').textContent = U.ready; $('pr-cnt').textContent = ''; ball.style.transform = 'scale(.7)'; if (wake) { wake.release(); wake = null; } return; }
    snd(); playing = true; pi = 0; endAt = Date.now() + +$('pr-min').value * 60000; $('pr-done').hidden = true; $('pr-play').textContent = U.stop;
    if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }).catch(function () {});
    progress(); phase();
  }
  var KEY = 'pr-v1', today = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || { days: {}, min: 0 }; } catch (e) { return { days: {}, min: 0 }; } }
  function streak(s) { var n = 0, d = new Date(today + 'T00:00:00Z'); if (!s.days[today]) d.setUTCDate(d.getUTCDate() - 1); while (s.days[d.toISOString().slice(0, 10)]) { n++; d.setUTCDate(d.getUTCDate() - 1); } return n; }
  function paint() { var n = streak(load()); $('pr-streak').textContent = n ? C.streak.replace('{n}', n) : ''; }
  function finish() {
    var m = +$('pr-min').value; playing = false; clear(); if (wake) { wake.release(); wake = null; }
    $('pr-play').textContent = U.start; $('pr-phase').textContent = U.done; $('pr-sub').textContent = ''; $('pr-cnt').textContent = ''; ball.style.transform = 'scale(.7)'; nose(''); $('pr-prog').style.width = '100%'; bell(440); later(function () { bell(440); }, 700);
    var s = load(); s.days[today] = (s.days[today] || 0) + m; s.min = (s.min || 0) + m; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    var msg = C.share.replace('{n}', m) + ' ' + location.origin + location.pathname;
    $('pr-done').innerHTML = '<b>' + C.streak.replace('{n}', streak(s)) + '</b><div class="pr-ctl"><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(msg) + '">' + U.shareBtn + '</a></div>';
    $('pr-done').hidden = false; paint(); say(U.done);
  }
  $('pr-play').addEventListener('click', play);
  $('pr-full').addEventListener('click', function () { if (document.fullscreenElement) document.exitFullscreen(); else if (root.requestFullscreen) root.requestFullscreen(); });
  $('pr-voice').checked = localStorage.getItem('pr-voice') === '1'; $('pr-voice').addEventListener('change', function () { localStorage.setItem('pr-voice', this.checked ? '1' : '0'); });
  paint();
})();
