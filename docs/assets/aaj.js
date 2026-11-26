/* /aaj/: pick today's entry (the page carries 10 days), refresh the boxes, and draw a Good-Morning image on canvas
   (date, tithi, festival, thought, optional name) to download or share on WhatsApp. Nothing leaves the phone. */
(function () {
  var el = document.getElementById('aj-cfg'); if (!el) return;
  var C = JSON.parse(el.textContent), U = C.ui, today = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  var D = C.days.filter(function (d) { return d.ymd === today; })[0] || C.days[0];
  var $ = function (id) { return document.getElementById(id); };
  if (D !== C.days[0]) { // cached page from an earlier day
    $('aj-tithi').textContent = D.tithi; $('aj-fest').textContent = D.fest.join(', ') || $('aj-fest').textContent; $('aj-next').textContent = D.next; $('aj-sun').textContent = D.sun; $('aj-v').textContent = D.vichar;
    $('aj-h1').textContent = $('aj-h1').textContent.replace(/—.*$/, '— ' + D.date);
  }
  var THEMES = [
    ['#ff9a3c', '#ffd56b', '#7a2e00'], ['#f97316', '#fb7185', '#ffffff'], ['#0ea5e9', '#a7f3d0', '#063047'], ['#7c3aed', '#f0abfc', '#ffffff'], ['#16a34a', '#fef08a', '#053b1a'], ['#1e3a8a', '#f59e0b', '#ffffff'],
  ];
  var th = new Date(today + 'T00:00:00Z').getUTCDay() % THEMES.length, cv = $('aj-cv'), g = cv.getContext('2d');
  var FONT = '"Noto Sans Devanagari","Noto Sans Bengali","Inter",system-ui,sans-serif';
  function wrap(text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', lines = [];
    words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (g.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line);
    lines.slice(0, maxLines).forEach(function (l, i) { g.fillText(l, x, y + i * lh); });
    return lines.length;
  }
  function draw() {
    var T = THEMES[th], W = 1080, H = 1350, ink = T[2];
    var bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, T[0]); bg.addColorStop(1, T[1]); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    // rising sun + rays
    g.save(); g.translate(W / 2, 560); for (var i = 0; i < 24; i++) { g.rotate(Math.PI / 12); g.fillStyle = 'rgba(255,255,255,0.10)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(-40, -700); g.lineTo(40, -700); g.fill(); } g.restore();
    var sg = g.createRadialGradient(W / 2, 560, 20, W / 2, 560, 200); sg.addColorStop(0, '#fff7cc'); sg.addColorStop(1, 'rgba(255,214,102,0)'); g.fillStyle = sg; g.beginPath(); g.arc(W / 2, 560, 200, 0, 7); g.fill();
    g.fillStyle = '#ffd166'; g.beginPath(); g.arc(W / 2, 560, 95, 0, 7); g.fill();
    // hills
    g.fillStyle = 'rgba(0,0,0,0.12)'; g.beginPath(); g.moveTo(0, 700); g.quadraticCurveTo(300, 560, 560, 690); g.quadraticCurveTo(820, 600, 1080, 680); g.lineTo(1080, 760); g.lineTo(0, 760); g.fill();
    g.textAlign = 'center'; g.fillStyle = ink;
    g.font = '800 120px ' + FONT; g.fillText(U.greet, W / 2, 200);
    g.font = '700 46px ' + FONT; g.fillText(D.date, W / 2, 285);
    // card
    g.fillStyle = 'rgba(255,255,255,0.88)'; roundRect(70, 780, W - 140, 440, 40); g.fill();
    g.fillStyle = '#3b2a1a'; g.font = '700 40px ' + FONT; g.fillText('🪔 ' + D.tithi, W / 2, 855);
    if (D.fest.length) { g.fillStyle = '#c2410c'; g.font = '800 44px ' + FONT; g.fillText(D.fest.join(' · '), W / 2, 920); }
    g.fillStyle = '#2b2118'; g.font = '700 56px ' + FONT; wrap('“' + D.vichar + '”', W / 2, D.fest.length ? 1010 : 980, W - 220, 78, 3);
    var nm = ($('aj-name').value || '').trim().slice(0, 30);
    if (nm) { g.fillStyle = ink; g.font = '800 52px ' + FONT; g.fillText('— ' + nm, W / 2, 1290); }
    g.fillStyle = 'rgba(0,0,0,0.45)'; g.font = '600 30px ' + FONT; g.textAlign = 'right'; g.fillText('nextgrade.in/aaj', W - 40, H - 24); g.textAlign = 'center';
  }
  function roundRect(x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  var box = $('aj-th');
  THEMES.forEach(function (t, i) { var b = document.createElement('button'); b.type = 'button'; b.title = U.theme + ' ' + (i + 1); b.style.background = 'linear-gradient(135deg,' + t[0] + ',' + t[1] + ')'; if (i === th) b.className = 'on'; b.onclick = function () { th = i; [].forEach.call(box.children, function (c, k) { c.className = k === i ? 'on' : ''; }); draw(); }; box.appendChild(b); });
  $('aj-name').addEventListener('input', draw);
  function blob(cb) { cv.toBlob(cb, 'image/jpeg', 0.9); }
  $('aj-dl').onclick = function () { blob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'good-morning-' + D.ymd + '.jpg'; a.click(); }); };
  $('aj-share').onclick = function () {
    var text = U.greet + ' 🌅 ' + D.date + '\n' + D.vichar + '\n\n' + location.origin + location.pathname;
    blob(function (b) {
      var f = new File([b], 'good-morning-' + D.ymd + '.jpg', { type: 'image/jpeg' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], text: text }).catch(function () {});
      else window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    });
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(draw);
  draw();
})();
