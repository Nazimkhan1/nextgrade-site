/* Sunrise mode for /surya-namaskar/ (user, 25 Nov 2026): full screen, the night sky turns into morning, the sun rises
   behind the hills, birds fly and chirp (Web Audio, nothing downloaded), a soft drone and a temple bell; then the
   Surya Namaskar player (#sn) is shown on top of the scene. Exit puts the player back where it was. */
(function () {
  var btn = document.getElementById('sn-morning'), sn = document.getElementById('sn'), cfgEl = document.getElementById('sn-cfg');
  if (!btn || !sn || !cfgEl) return;
  var U = JSON.parse(cfgEl.textContent).ui;
  var css = '.smo{position:fixed;inset:0;z-index:9999;background:#0b1026;overflow:hidden}.smo canvas{position:absolute;inset:0;width:100%;height:100%}' +
    '.smo-top{position:absolute;top:12px;right:12px;display:flex;gap:8px;z-index:3}.smo-top button{font:inherit;font-weight:700;padding:8px 14px;border-radius:999px;border:0;background:rgba(255,255,255,.85);cursor:pointer}' +
    '.smo-msg{position:absolute;left:0;right:0;top:38%;text-align:center;color:#fff;font-size:clamp(20px,3vw,34px);font-weight:700;text-shadow:0 2px 12px rgba(0,0,0,.5);transition:opacity 2s;z-index:2;padding:0 20px}' +
    '.smo .sn{position:absolute;z-index:2;left:50%;bottom:2vh;transform:translateX(-50%);width:min(560px,94vw);margin:0;background:rgba(255,250,240,.82);backdrop-filter:blur(6px);opacity:0;transition:opacity 2s}' +
    '.smo .sn.show{opacity:1}.smo .sn svg{max-height:34vh}.smo .sn svg>circle,.smo .sn svg>rect{display:none}' +
    '@media (min-width:1000px){.smo .sn{left:auto;right:3vw;transform:none;bottom:4vh;width:460px}.smo .sn svg{max-height:40vh}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var rang = false, box, cv, g, raf = 0, T0 = 0, home = null, ac = null, master = null, mute = false, birds = [], stars = [], clouds = [], timers = [];
  var DUR = 26000; // night → morning
  var mix = function (a, b, k) { return a.map(function (x, i) { return Math.round(x + (b[i] - x) * k); }); };
  var rgb = function (c) { return 'rgb(' + c.join(',') + ')'; };
  var KEYS = [ // [top, bottom] of the sky
    [[8, 12, 34], [22, 30, 66]], [[30, 34, 78], [232, 126, 92]], [[86, 132, 205], [255, 190, 130]], [[120, 196, 240], [255, 238, 200]],
  ];
  function sky(k) { var p = k * (KEYS.length - 1), i = Math.min(KEYS.length - 2, Math.floor(p)), f = p - i; return [mix(KEYS[i][0], KEYS[i + 1][0], f), mix(KEYS[i][1], KEYS[i + 1][1], f)]; }

  function frame(now) {
    var W = cv.width, H = cv.height, k = Math.min(1, (now - T0) / DUR), hz = H * 0.72;
    var s = sky(k), gr = g.createLinearGradient(0, 0, 0, hz);
    gr.addColorStop(0, rgb(s[0])); gr.addColorStop(1, rgb(s[1])); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // stars fade
    if (k < .5) { g.fillStyle = 'rgba(255,255,255,' + (1 - k * 2) + ')'; stars.forEach(function (x) { g.fillRect(x[0] * W, x[1] * hz, x[2], x[2]); }); }
    // sun
    var R = Math.min(W, H) * .075, sx = W * .38, sy = hz + R * 1.2 - (hz * .62) * Math.min(1, k * 1.15);
    var glow = g.createRadialGradient(sx, sy, R * .3, sx, sy, R * 5); glow.addColorStop(0, 'rgba(255,214,110,' + (.55 + .3 * k) + ')'); glow.addColorStop(1, 'rgba(255,180,90,0)');
    g.fillStyle = glow; g.fillRect(0, 0, W, H);
    g.fillStyle = rgb(mix([255, 120, 60], [255, 236, 170], k)); g.beginPath(); g.arc(sx, sy, R, 0, 7); g.fill();
    // clouds
    clouds.forEach(function (c) { c.x += c.v; if (c.x > 1.2) c.x = -.2; g.fillStyle = 'rgba(255,255,255,' + (.15 + .45 * k) + ')'; var cx = c.x * W, cy = c.y * hz; [0, .6, 1.1].forEach(function (o, j) { g.beginPath(); g.ellipse(cx + o * c.s, cy - (j === 1 ? c.s * .25 : 0), c.s * .7, c.s * .35, 0, 0, 7); g.fill(); }); });
    // hills (three layers)
    [[.70, 34, .0021, [40, 46, 80], [92, 140, 110]], [.76, 26, .0034, [26, 34, 60], [70, 120, 80]], [.84, 18, .005, [14, 20, 40], [52, 96, 60]]].forEach(function (h, li) {
      g.fillStyle = rgb(mix(h[3], h[4], k)); g.beginPath(); g.moveTo(0, H);
      for (var x = 0; x <= W; x += 8) g.lineTo(x, H * h[0] - Math.sin(x * h[2] + li * 2) * h[1] - Math.sin(x * h[2] * 2.7 + li) * h[1] * .5);
      g.lineTo(W, H); g.fill();
    });
    // birds
    if (k > .25) birds.forEach(function (b) {
      b.x += b.v; if (b.x > 1.1) { b.x = -.1; b.y = .15 + Math.random() * .3; }
      var bx = b.x * W, by = b.y * H + Math.sin(now / 900 + b.p) * 6, w = b.s, f = Math.sin(now / 120 + b.p) * w * .5;
      g.strokeStyle = 'rgba(30,30,40,.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(bx - w, by - f); g.quadraticCurveTo(bx - w / 2, by - f / 2 - 2, bx, by); g.quadraticCurveTo(bx + w / 2, by - f / 2 - 2, bx + w, by - f); g.stroke();
    });
    raf = requestAnimationFrame(frame);
  }

  // ---- sound (all synthesised)
  function audio() {
    try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    master = ac.createGain(); master.gain.value = .9; master.connect(ac.destination);
    // soft drone: Sa and Pa with a slow swell
    [261.63, 392, 523.25].forEach(function (f, i) {
      var o = ac.createOscillator(), gn = ac.createGain(), lp = ac.createBiquadFilter();
      o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = f; lp.type = 'lowpass'; lp.frequency.value = 1600;
      gn.gain.setValueAtTime(0, ac.currentTime); gn.gain.linearRampToValueAtTime(i === 0 ? .07 : .045, ac.currentTime + 5);
      o.connect(lp); lp.connect(gn); gn.connect(master); o.start();
    });
    if (ac.state === 'suspended') ac.resume();
    rang = false; bell(ac.currentTime + .3);
    chirpLoop();
  }
  function bell(t) {
    [[523, 1], [1318, .5], [2093, .3], [2794, .15]].forEach(function (p) {
      var o = ac.createOscillator(), gn = ac.createGain(); o.frequency.value = p[0];
      gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(.35 * p[1], t + .01); gn.gain.exponentialRampToValueAtTime(.0001, t + 4.5);
      o.connect(gn); gn.connect(master); o.start(t); o.stop(t + 4.6);
    });
  }
  function chirp(t, base) {
    var n = 2 + Math.floor(Math.random() * 4), pan = ac.createStereoPanner ? ac.createStereoPanner() : null;
    if (pan) { pan.pan.value = Math.random() * 1.6 - .8; pan.connect(master); }
    for (var i = 0; i < n; i++) {
      var o = ac.createOscillator(), gn = ac.createGain(), s = t + i * (.09 + Math.random() * .05);
      o.type = 'triangle'; o.frequency.setValueAtTime(base, s); o.frequency.exponentialRampToValueAtTime(base * (1.4 + Math.random() * .5), s + .05); o.frequency.exponentialRampToValueAtTime(base * .9, s + .08);
      gn.gain.setValueAtTime(0, s); gn.gain.linearRampToValueAtTime(.2, s + .01); gn.gain.exponentialRampToValueAtTime(.0001, s + .09);
      o.connect(gn); gn.connect(pan || master); o.start(s); o.stop(s + .1);
    }
  }
  function chirpLoop() {
    if (!ac) return;
    var k = Math.min(1, (performance.now() - T0) / DUR);
    if (k > .1) chirp(ac.currentTime + .05, 2200 + Math.random() * 2000);
    if (!rang && k > .6) { rang = true; bell(ac.currentTime + .1); }
    timers.push(setTimeout(chirpLoop, (k > .5 ? 350 : 1000) + Math.random() * 1400));
  }

  function size() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
  function open() {
    box = document.createElement('div'); box.className = 'smo';
    box.innerHTML = '<canvas></canvas><div class="smo-top"><button type="button" id="smo-mute">' + U.mute + '</button><button type="button" id="smo-exit">' + U.exit + '</button></div><div class="smo-msg" id="smo-msg">' + U.dawn + '</div>';
    document.body.appendChild(box);
    cv = box.querySelector('canvas'); g = cv.getContext('2d'); size(); addEventListener('resize', size);
    stars = Array.from({ length: 140 }, function () { return [Math.random(), Math.random() * .9, Math.random() < .2 ? 2 : 1]; });
    clouds = Array.from({ length: 5 }, function () { return { x: Math.random(), y: .15 + Math.random() * .35, s: 60 + Math.random() * 90, v: .00015 + Math.random() * .0002 }; });
    birds = Array.from({ length: 7 }, function (_, i) { return { x: -Math.random(), y: .15 + Math.random() * .3, v: .0008 + Math.random() * .0009, s: 7 + Math.random() * 7, p: i * 1.7 }; });
    home = { parent: sn.parentNode, next: sn.nextSibling }; box.appendChild(sn);
    T0 = performance.now(); raf = requestAnimationFrame(frame);
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
    audio();
    timers.push(setTimeout(function () { var m = document.getElementById('smo-msg'); if (m) m.style.opacity = 0; }, 9000));
    timers.push(setTimeout(function () { sn.classList.add('show'); var p = document.getElementById('sn-play'); if (p && p.textContent === U.start) p.click(); }, 12000));
    document.getElementById('smo-exit').onclick = close;
    document.getElementById('smo-mute').onclick = function () { mute = !mute; if (master) master.gain.value = mute ? 0 : .9; this.textContent = mute ? U.sound : U.mute; };
    addEventListener('keydown', esc);
  }
  function esc(e) { if (e.key === 'Escape' && !document.fullscreenElement) close(); }
  function close() {
    cancelAnimationFrame(raf); timers.forEach(clearTimeout); timers = []; removeEventListener('resize', size); removeEventListener('keydown', esc);
    if (ac) { ac.close(); ac = null; }
    sn.classList.remove('show'); home.parent.insertBefore(sn, home.next); box.remove();
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
  }
  document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement && box && box.isConnected) close(); });
  btn.addEventListener('click', open);
})();
