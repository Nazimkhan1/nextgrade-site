/* Virtual Surya Namaskar (/surya-namaskar/): an SVG figure moves through the 12 poses (joints are interpolated),
   with mantra, breath cue, optional voice (speechSynthesis), rounds, a daily streak (localStorage) and WhatsApp share. */
(function () {
  var root = document.getElementById('sn'), cfgEl = document.getElementById('sn-cfg');
  if (!root || !cfgEl) return;
  var C = JSON.parse(cfgEl.textContent), U = C.ui, POSES = C.poses;
  // joints: C head centre, S shoulder, E elbow, H hand, P hip, K1/A1 near leg, K2/A2 far leg (viewBox 300×230, ground y≈205)
  var F = {
    pranam: { C: [150, 40], S: [150, 63], E: [170, 96], H: [162, 80], P: [150, 125], K1: [150, 165], A1: [150, 205], K2: [150, 165], A2: [150, 205] },
    up: { C: [150, 42], S: [152, 64], E: [146, 34], H: [140, 6], P: [150, 125], K1: [151, 165], A1: [151, 205], K2: [151, 165], A2: [151, 205] },
    fold: { C: [166, 184], S: [168, 160], E: [170, 182], H: [171, 204], P: [150, 118], K1: [150, 162], A1: [150, 205], K2: [150, 162], A2: [150, 205] },
    lunge: { C: [182, 86], S: [170, 108], E: [178, 155], H: [185, 204], P: [140, 160], K1: [185, 158], A1: [188, 205], K2: [95, 200], A2: [55, 205] },
    plank: { C: [226, 139], S: [205, 148], E: [205, 176], H: [205, 204], P: [130, 175], K1: [92, 188], A1: [55, 200], K2: [92, 188], A2: [55, 200] },
    ashtanga: { C: [213, 194], S: [190, 196], E: [178, 179], H: [195, 204], P: [130, 182], K1: [92, 200], A1: [55, 202], K2: [92, 200], A2: [55, 202] },
    cobra: { C: [201, 128], S: [185, 150], E: [182, 180], H: [188, 204], P: [130, 200], K1: [92, 204], A1: [55, 204], K2: [92, 204], A2: [55, 204] },
    mountain: { C: [189, 177], S: [175, 160], E: [192, 182], H: [210, 204], P: [125, 105], K1: [100, 155], A1: [75, 204], K2: [100, 155], A2: [75, 204] },
    lunge2: { C: [182, 86], S: [170, 108], E: [178, 155], H: [185, 204], P: [140, 160], K1: [95, 200], A1: [55, 205], K2: [185, 158], A2: [188, 205] },
  };
  var SPEED = { slow: 6500, normal: 4500, fast: 2800 };
  var css = '.sn{background:linear-gradient(180deg,#fff4e6,#ffe8cc 60%,#fff);border:1px solid var(--line);border-radius:22px;padding:14px;box-shadow:var(--shadow);margin:14px 0;color:#2b2118}.sn:fullscreen{display:flex;flex-direction:column;justify-content:center;border-radius:0}.sn svg{width:100%;height:auto;display:block;max-height:52vh}.sn-top{display:flex;justify-content:space-between;align-items:center;gap:8px;font-weight:700;font-size:14px}.sn-name{text-align:center;margin:6px 0 0;font-size:22px;font-weight:800;line-height:1.3}.sn-sa{text-align:center;font-size:14px;color:#6f6257}.sn-mantra{text-align:center;font-size:20px;font-weight:700;color:#c2410c;margin:4px 0}.sn-how{text-align:center;font-size:15px;margin:4px auto 8px;max-width:520px;min-height:3em}.sn-breath{display:flex;align-items:center;justify-content:center;gap:10px;font-weight:800;font-size:18px;margin:4px 0}.sn-dot{width:22px;height:22px;border-radius:50%;background:#f59f00;transition:transform 1.8s ease}.sn-dot.in{transform:scale(1.8)}.sn-dot.out{transform:scale(.6)}.sn-bar{height:6px;border-radius:6px;background:rgba(0,0,0,.08);overflow:hidden;margin:6px 0}.sn-bar i{display:block;height:100%;width:0;background:#e8590c}.sn-ctl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:8px}.sn-ctl .btn{padding:10px 16px}.sn-opt{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;font-size:14px;margin-top:8px;align-items:center}.sn-opt select{font:inherit;padding:6px 8px;border-radius:10px;border:1px solid #e0cdb8;background:#fff}.sn-done{text-align:center;padding:10px}.sn-done b{display:block;font-size:22px}.sn-steps li{margin:0 0 10px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var NS = 'http://www.w3.org/2000/svg';
  root.innerHTML = '<div class="sn-top"><span id="sn-round"></span><span id="sn-streak"></span></div>' +
    '<svg viewBox="0 0 300 230" aria-hidden="true"><defs><radialGradient id="sng"><stop offset="0" stop-color="#ffd43b"/><stop offset="1" stop-color="#ff922b" stop-opacity="0"/></radialGradient></defs>' +
    '<circle cx="262" cy="34" r="46" fill="url(#sng)"/><circle cx="262" cy="34" r="20" fill="#ffa94d"/>' +
    '<rect x="0" y="205" width="300" height="25" fill="#e9c46a" opacity=".35"/><rect x="40" y="203" width="200" height="5" rx="2" fill="#c2410c" opacity=".35"/>' +
    '<g id="sn-fig" fill="none" stroke-linecap="round" stroke-linejoin="round"></g></svg>' +
    '<div class="sn-name" id="sn-name"></div><div class="sn-sa" id="sn-sa"></div><div class="sn-mantra" id="sn-mantra"></div>' +
    '<div class="sn-breath"><span class="sn-dot" id="sn-dot"></span><span id="sn-btxt"></span></div><div class="sn-how" id="sn-how"></div>' +
    '<div class="sn-bar"><i id="sn-prog"></i></div>' +
    '<div class="sn-ctl"><button class="btn btn-ghost" id="sn-prev" type="button">' + U.prev + '</button><button class="btn btn-primary" id="sn-play" type="button">' + U.start + '</button><button class="btn btn-ghost" id="sn-next" type="button">' + U.next + '</button></div>' +
    '<div class="sn-opt"><label>' + U.rounds + ' <select id="sn-rounds">' + [1, 2, 3, 5, 6, 8, 10, 12, 18, 24].map(function (n) { return '<option' + (n === 6 ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
    '<label>' + U.speed + ' <select id="sn-speed"><option value="slow">' + U.slow + '</option><option value="normal" selected>' + U.normal + '</option><option value="fast">' + U.fast + '</option></select></label>' +
    '<label><input type="checkbox" id="sn-voice"> ' + U.voice + '</label><button class="btn btn-ghost" id="sn-full" type="button">' + U.full + '</button></div>' +
    '<div class="sn-done" id="sn-done" hidden></div>';
  var $ = function (id) { return document.getElementById(id); };
  var fig = $('sn-fig');
  function line(a, b, w, c) { var l = document.createElementNS(NS, 'line'); l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]); l.setAttribute('stroke', c); l.setAttribute('stroke-width', w); return l; }
  function draw(J) {
    fig.innerHTML = '';
    var far = '#f0a060', body = '#c2410c', skin = '#e8590c';
    fig.appendChild(line(J.P, J.K2, 13, far)); fig.appendChild(line(J.K2, J.A2, 12, far));
    fig.appendChild(line(J.P, J.S, 18, body));
    fig.appendChild(line(J.P, J.K1, 13, skin)); fig.appendChild(line(J.K1, J.A1, 12, skin));
    fig.appendChild(line(J.S, J.E, 10, skin)); fig.appendChild(line(J.E, J.H, 9, skin));
    var h = document.createElementNS(NS, 'circle'); h.setAttribute('cx', J.C[0]); h.setAttribute('cy', J.C[1]); h.setAttribute('r', 13); h.setAttribute('fill', '#c2410c'); fig.appendChild(h);
  }
  var cur = JSON.parse(JSON.stringify(F.pranam)), anim = 0;
  function moveTo(key) {
    var from = JSON.parse(JSON.stringify(cur)), to = F[key], t0 = performance.now(), D = 800;
    cancelAnimationFrame(anim);
    (function step(now) {
      var k = Math.min(1, (now - t0) / D), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      Object.keys(to).forEach(function (j) { cur[j] = [from[j][0] + (to[j][0] - from[j][0]) * e, from[j][1] + (to[j][1] - from[j][1]) * e]; });
      draw(cur); if (k < 1) anim = requestAnimationFrame(step);
    })(t0);
  }
  draw(cur);

  var idx = -1, round = 1, playing = false, timer = 0, t0 = 0, left = 0, done = 0, wake = null;
  var rounds = function () { return +$('sn-rounds').value; }, dur = function () { return SPEED[$('sn-speed').value]; };
  var VOICE = { hi: 'hi-IN', hinglish: 'hi-IN', en: 'en-IN', bn: 'bn-IN' }[C.lang];
  function say(t) { if (!$('sn-voice').checked || !window.speechSynthesis) return; speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = VOICE; u.rate = .9; speechSynthesis.speak(u); }
  function show(i) {
    var p = POSES[i]; idx = i;
    moveTo(p.fig);
    $('sn-name').textContent = (i + 1) + '. ' + p.name; $('sn-sa').textContent = p.sa + ' · ' + p.ro;
    $('sn-mantra').textContent = p.mantra; $('sn-how').textContent = p.how;
    $('sn-btxt').textContent = U[p.breath]; $('sn-dot').className = 'sn-dot ' + (p.breath === 'hold' ? '' : p.breath);
    $('sn-round').textContent = U.round + ' ' + round + ' / ' + rounds();
    say((C.lang === 'en' ? p.mr : p.mantra) + '. ' + U[p.breath]);
  }
  function tick() {
    if (!playing) return;
    var now = performance.now(), d = dur(), k = Math.min(1, (now - t0) / d);
    $('sn-prog').style.width = (((idx + k) / 12) * 100) + '%';
    if (k >= 1) { advance(); return; }
    timer = requestAnimationFrame(tick);
  }
  function advance() {
    if (idx >= 11) {
      done++;
      if (round >= rounds()) { finish(); return; }
      // one round done: stop here and wait — the next round starts only when the user taps
      playing = false; cancelAnimationFrame(timer); $('sn-prog').style.width = '100%';
      if (wake) { wake.release(); wake = null; }
      $('sn-play').textContent = U.start;
      $('sn-done').innerHTML = '<b>' + C.roundDone.replace('{n}', round) + '</b><div class="sn-ctl"><button class="btn btn-primary" type="button" id="sn-nextround">' + U.nextRound + '</button></div>';
      $('sn-done').hidden = false; say(C.roundDone.replace('{n}', round).replace(/\s*\S+$/, ''));
      $('sn-nextround').onclick = function () { $('sn-done').hidden = true; round++; playing = true; $('sn-play').textContent = U.pause; show(0); t0 = performance.now(); timer = requestAnimationFrame(tick); };
      return;
    }
    show(idx + 1);
    t0 = performance.now(); timer = requestAnimationFrame(tick);
  }
  function play() {
    if (playing) { playing = false; left = performance.now() - t0; cancelAnimationFrame(timer); $('sn-play').textContent = U.resume; if (wake) { wake.release(); wake = null; } return; }
    playing = true; $('sn-play').textContent = U.pause; $('sn-done').hidden = true;
    if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }).catch(function () {});
    if (idx < 0) { round = 1; done = 0; show(0); t0 = performance.now(); } else if (idx >= 11 && round < rounds()) { round++; show(0); t0 = performance.now(); } else t0 = performance.now() - (left || 0);
    timer = requestAnimationFrame(tick);
  }
  // streak (localStorage)
  var KEY = 'sn-v1', today = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || { days: {}, total: 0 }; } catch (e) { return { days: {}, total: 0 }; } }
  function streak(s) { var n = 0, d = new Date(today + 'T00:00:00Z'); if (!s.days[today]) d.setUTCDate(d.getUTCDate() - 1); while (s.days[d.toISOString().slice(0, 10)]) { n++; d.setUTCDate(d.getUTCDate() - 1); } return n; }
  function paintStreak() { var s = load(), n = streak(s); $('sn-streak').textContent = n ? C.streak.replace('{n}', n) : ''; }
  function finish() {
    playing = false; cancelAnimationFrame(timer); $('sn-play').textContent = U.start; idx = -1; $('sn-prog').style.width = '100%';
    if (wake) { wake.release(); wake = null; }
    var s = load(); s.days[today] = (s.days[today] || 0) + done; s.total = (s.total || 0) + done; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    var n = s.days[today], msg = C.shareText.replace('{n}', n) + ' ' + location.origin + location.pathname;
    $('sn-done').innerHTML = '<b>' + U.done + '</b>' + C.streak.replace('{n}', streak(s)) + ' · ' + C.total.replace('{n}', s.total) + '<div class="sn-ctl"><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(msg) + '">' + U.share + '</a></div>';
    $('sn-done').hidden = false; paintStreak(); say(U.done.replace(/^\S+\s/, ''));
    moveTo('pranam');
  }
  $('sn-play').addEventListener('click', play);
  $('sn-next').addEventListener('click', function () { if (idx < 0) { show(0); return; } if (idx >= 11) show(0); else show(idx + 1); t0 = performance.now(); left = 0; });
  $('sn-prev').addEventListener('click', function () { show(Math.max(0, idx - 1)); t0 = performance.now(); left = 0; });
  $('sn-full').addEventListener('click', function () { if (document.fullscreenElement) document.exitFullscreen(); else if (root.requestFullscreen) root.requestFullscreen(); });
  $('sn-voice').checked = localStorage.getItem('sn-voice') === '1';
  $('sn-voice').addEventListener('change', function () { localStorage.setItem('sn-voice', this.checked ? '1' : '0'); });
  $('sn-name').textContent = U.ready; $('sn-round').textContent = U.round + ' 1 / ' + rounds();
  $('sn-rounds').addEventListener('change', function () { if (idx < 0) $('sn-round').textContent = U.round + ' 1 / ' + rounds(); });
  paintStreak();
})();
