// Shaadi Card Maker: pick a design from the gallery, edit your details, download. All drawn on-device.
(() => {
  const S = window.SHAADI || {};
  const TPL = S.tpl || [];
  const COLORS = S.colors || [];
  const UI = S.ui || {};
  const PH = UI.ph || {};
  const $ = (id) => document.getElementById(id);
  const big = $('card');
  if (!big) return;
  const bctx = big.getContext('2d');
  const FONT = '"Baloo 2","Noto Sans Devanagari","Noto Sans Bengali",Georgia,serif';
  const LEAF = '#4a7c43';
  const status = $('status');

  let tpl = TPL[0] || { style: 'garland', motif: 'rings', palette: ['#7a1420', '#b8860b', '#b8860b', '#fff6ea', '#ffe6c9'] };
  let palette = tpl.palette.slice();

  // ---- colour helpers ----
  const h2r = (h) => { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
  const mix = (hex, t, a) => { const c = h2r(hex); const m = (x, y) => Math.round(x + (y - x) * a); return '#' + [m(c[0], t[0]), m(c[1], t[1]), m(c[2], t[2])].map((v) => v.toString(16).padStart(2, '0')).join(''); };
  const light = (h, a) => mix(h, [255, 255, 255], a);
  const dark = (h, a) => mix(h, [0, 0, 0], a);

  const val = (id, ph) => { const e = $(id); const v = e && e.value.trim(); return v || (ph || ''); };
  const liveData = () => ({
    heading: val('heading', PH.heading) || (UI.and || 'Shubh Vivah'),
    groom: val('groom', PH.groom), bride: val('bride', PH.bride),
    day: val('day', PH.day), date: val('date', PH.date), time: val('time', PH.time),
    venue: val('venue', PH.venue), family: val('family', PH.family), note: val('note', PH.note),
  });
  const SAMPLE = { heading: UI.and || 'Shubh Vivah', groom: PH.groom || 'Rahul', bride: PH.bride || 'Priya', day: PH.day || '', date: PH.date || '', time: '', venue: '', family: '', note: '' };

  // ---- primitives (all in a 1080×1500 space) ----
  function goldGrad(ctx, x0, y0, x1, y1, c) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, light(c, 0.6)); g.addColorStop(0.35, c); g.addColorStop(0.6, dark(c, 0.18)); g.addColorStop(0.82, c); g.addColorStop(1, light(c, 0.45));
    return g;
  }
  function flower(ctx, cx, cy, r, petal, center, n) {
    n = n || 8;
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.fillStyle = petal; ctx.beginPath(); ctx.ellipse(0, -r * 0.7, r * 0.33, r * 0.6, 0, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = center; ctx.beginPath(); ctx.arc(cx, cy, r * 0.32, 0, 7); ctx.fill();
  }
  function marigold(ctx, cx, cy, r, c) {
    [[r, light(c, 0.18), 16], [r * 0.72, c, 14], [r * 0.46, dark(c, 0.12), 12]].forEach(([rr, col, n]) => {
      ctx.fillStyle = col; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr * 0.6, cy + Math.sin(a) * rr * 0.6, rr * 0.42, 0, 7); ctx.fill(); }
    });
    ctx.fillStyle = dark(c, 0.28); ctx.beginPath(); ctx.arc(cx, cy, r * 0.22, 0, 7); ctx.fill();
  }
  function leaf(ctx, cx, cy, len, ang, c) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.3, -len * 0.24, len, 0); ctx.quadraticCurveTo(len * 0.3, len * 0.24, 0, 0); ctx.fill(); ctx.restore(); }
  function paisley(ctx, cx, cy, r, rot, c) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(r * 1.3, -r * 0.4, r * 0.6, r * 1.3, 0, r); ctx.bezierCurveTo(-r * 0.5, r * 0.6, -r * 0.3, r * 0.1, 0, 0); ctx.fill(); ctx.restore(); }

  function garland(ctx, y, c) {
    const n = 12;
    for (let i = 0; i <= n; i++) {
      const x = 80 + (920 / n) * i, yy = y + Math.sin((i / n) * Math.PI) * 24;
      if (i < n) { const x2 = 80 + (920 / n) * (i + 1), y2 = y + Math.sin(((i + 1) / n) * Math.PI) * 24; ctx.strokeStyle = dark(LEAF, 0.1); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, yy); ctx.quadraticCurveTo((x + x2) / 2, (yy + y2) / 2 + 12, x2, y2); ctx.stroke(); }
      marigold(ctx, x, yy, 19, c);
      if (i % 2) {
        ctx.strokeStyle = dark(LEAF, 0.1); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, yy + 12); ctx.lineTo(x, yy + 50); ctx.stroke();
        leaf(ctx, x, yy + 36, 15, 2.0, LEAF); leaf(ctx, x, yy + 36, 15, 1.1, light(LEAF, 0.12));
        marigold(ctx, x, yy + 62, 10, light(c, 0.12));
      }
    }
  }
  function toran(ctx, y, c) { // hanging leaf+bead torana
    const n = 16;
    ctx.strokeStyle = dark(c, 0.1); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, y); ctx.quadraticCurveTo(540, y + 40, 1020, y); ctx.stroke();
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = 60 + 960 * t, yb = y + Math.sin(t * Math.PI) * 40;
      const len = 34 + Math.sin(t * Math.PI) * 26;
      ctx.fillStyle = i % 2 ? LEAF : light(LEAF, 0.14); ctx.save(); ctx.translate(x, yb); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(10, len * 0.6, 0, len); ctx.quadraticCurveTo(-10, len * 0.6, 0, 0); ctx.fill(); ctx.restore();
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, yb + len + 7, 5, 0, 7); ctx.fill();
    }
  }
  function mandala(ctx, cx, cy, R, c, alpha) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = c; ctx.fillStyle = c;
    [R, R * 0.74, R * 0.5].forEach((rr, ri) => {
      const n = 24 - ri * 4;
      for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; const x = cx + Math.cos(a) * rr, yy = cy + Math.sin(a) * rr; ctx.save(); ctx.translate(x, yy); ctx.rotate(a + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, 0, rr * 0.06, rr * 0.14, 0, 0, 7); ctx.stroke(); ctx.restore(); }
      ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke();
    });
    ctx.restore();
  }
  function bouquet(ctx, x, y, s, P) {
    const gold = P[1];
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [[-20, 10, 1.1], [30, 20, 2.3], [10, 50, 0.3]].forEach(([lx, ly, a]) => leaf(ctx, lx, ly, 46, a, LEAF));
    flower(ctx, 0, 0, 26, light(gold, 0.2), dark(gold, 0.15), 8);
    flower(ctx, 36, 30, 18, P[0], light(gold, 0.3), 6);
    flower(ctx, -24, 34, 15, light(gold, 0.1), dark(gold, 0.1), 7);
    ctx.restore();
  }
  function vine(ctx, x, c) { // leafy vertical vine
    ctx.strokeStyle = LEAF; ctx.lineWidth = 3; ctx.beginPath();
    for (let y = 140; y <= 1360; y += 6) { const xx = x + Math.sin(y / 70) * 22; (y === 140) ? ctx.moveTo(xx, y) : ctx.lineTo(xx, y); } ctx.stroke();
    for (let y = 180; y <= 1340; y += 80) { const xx = x + Math.sin(y / 70) * 22; const side = Math.cos(y / 70) > 0 ? 1 : -1; leaf(ctx, xx, y, 34, side > 0 ? -0.5 : 3.6, LEAF); if (y % 160 < 80) flower(ctx, xx + side * 6, y, 13, light(c, 0.1), dark(c, 0.1), 6); }
  }

  function frame(ctx, P, kind) {
    const gold = P[1], m = 44;
    ctx.strokeStyle = goldGrad(ctx, m, m, 1080 - m, 1500 - m, gold);
    if (kind === 'minimal') { ctx.lineWidth = 2.5; rr(ctx, m, m, 1080 - 2 * m, 1500 - 2 * m, 0); ctx.stroke(); ctx.lineWidth = 1; rr(ctx, m + 10, m + 10, 1080 - 2 * m - 20, 1500 - 2 * m - 20, 0); ctx.stroke(); return; }
    ctx.lineWidth = kind === 'royal' ? 9 : 6; rr(ctx, m, m, 1080 - 2 * m, 1500 - 2 * m, 0); ctx.stroke();
    ctx.lineWidth = 2; rr(ctx, m + 16, m + 16, 1080 - 2 * m - 32, 1500 - 2 * m - 32, 0); ctx.stroke();
    const cs = [[m + 16, m + 16, 0], [1080 - m - 16, m + 16, Math.PI / 2], [1080 - m - 16, 1500 - m - 16, Math.PI], [m + 16, 1500 - m - 16, -Math.PI / 2]];
    ctx.fillStyle = gold;
    cs.forEach(([x, y, a]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(70, 0); ctx.quadraticCurveTo(10, 10, 0, 70); ctx.closePath(); ctx.globalAlpha = 0.22; ctx.fill(); ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(0, 0, 9, 0, 7); ctx.fill(); ctx.restore(); });
    if (kind === 'royal') { cs.forEach(([x, y, a]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI / 4); paisley(ctx, 18, 18, 16, 0, gold); ctx.restore(); }); }
  }
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  const MOTIF = { ganesh: '🕉️', om: 'ॐ', rings: '💍', diya: '🪔', floral: '🌸', peacock: '🦚', kalash: '🏺' };
  function medallion(ctx, cy, P, glyph) {
    const gold = P[1], cx = 540, r = 56;
    ctx.fillStyle = light(P[3], 0.4); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
    ctx.strokeStyle = goldGrad(ctx, cx - r, cy - r, cx + r, cy + r, gold); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r - 9, 0, 7); ctx.stroke();
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; ctx.fillStyle = gold; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * (r + 8), cy + Math.sin(a) * (r + 8), 2.4, 0, 7); ctx.fill(); }
    ctx.font = '54px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(glyph, cx, cy + 2);
  }

  // ---- text block ----
  function setFont(ctx, px, w) { ctx.font = (w || '700') + ' ' + px + 'px ' + FONT; }
  function fit(ctx, t, px, max, w) { let s = px; setFont(ctx, s, w); while (ctx.measureText(t).width > max && s > 14) { s -= 2; setFont(ctx, s, w); } return s; }
  function goldText(ctx, t, cx, y, px, w, gold, max) { const s = fit(ctx, t, px, max, w); setFont(ctx, s, w); const hw = Math.min(ctx.measureText(t).width, max) / 2; ctx.fillStyle = goldGrad(ctx, cx - hw, y, cx + hw, y, gold); ctx.fillText(t, cx, y); }
  function inkText(ctx, t, cx, y, px, w, ink, max) { const s = fit(ctx, t, px, max, w); setFont(ctx, s, w); ctx.fillStyle = ink; ctx.fillText(t, cx, y); }
  function wrap(ctx, t, max) { const words = String(t).split(/\s+/), out = []; let ln = ''; words.forEach((wd) => { const tt = ln ? ln + ' ' + wd : wd; if (ln && ctx.measureText(tt).width > max) { out.push(ln); ln = wd; } else ln = tt; }); if (ln) out.push(ln); return out; }
  function divider(ctx, y, P) {
    const gold = P[1]; ctx.strokeStyle = gold; ctx.fillStyle = gold; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(340, y); ctx.lineTo(500, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(580, y); ctx.lineTo(740, y); ctx.stroke();
    flower(ctx, 540, y, 16, light(gold, 0.2), dark(gold, 0.15), 6);
    paisley(ctx, 320, y, 10, -Math.PI / 2, gold); paisley(ctx, 760, y, 10, Math.PI / 2, gold);
  }

  function textBlock(ctx, d, P) {
    const ink = P[0], gold = P[1];
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (d.heading) goldText(ctx, d.heading, 540, 400, 80, '800', gold, 760);
    divider(ctx, 470, P);
    if (d.groom) inkText(ctx, d.groom, 540, 600, 70, '700', ink, 800);
    ctx.fillStyle = gold; setFont(ctx, 40, '600'); ctx.fillText(UI.weds || 'weds', 540, 688);
    if (d.bride) inkText(ctx, d.bride, 540, 776, 70, '700', ink, 800);
    divider(ctx, 864, P);
    ctx.fillStyle = ink;
    const dd = [d.day, d.date].filter(Boolean).join(', ');
    if (dd) { setFont(ctx, 44, '700'); ctx.fillText(dd, 540, 960); }
    if (d.time) { setFont(ctx, 38, '600'); ctx.fillText(d.time, 540, 1016); }
    if (d.venue) { setFont(ctx, 34, '500'); wrap(ctx, d.venue, 760).slice(0, 2).forEach((l, i) => ctx.fillText(l, 540, 1092 + i * 44)); }
    if (d.family) { ctx.fillStyle = gold; setFont(ctx, 34, '600'); ctx.fillText(d.family, 540, 1272); }
    if (d.note) { ctx.fillStyle = ink; setFont(ctx, 27, '500'); wrap(ctx, d.note, 780).slice(0, 2).forEach((l, i) => ctx.fillText(l, 540, 1338 + i * 34)); }
  }

  // ---- compose per style ----
  function decorate(ctx, style, P) {
    const gold = P[1];
    if (style === 'mandala') mandala(ctx, 540, 150, 300, gold, 0.14);
    frame(ctx, P, style === 'royal' ? 'royal' : style === 'minimal' ? 'minimal' : 'std');
    if (style === 'garland') { garland(ctx, 150, gold); bouquet(ctx, 120, 1360, 0.9, P); ctx.save(); ctx.translate(1080, 0); ctx.scale(-1, 1); bouquet(ctx, 120, 1360, 0.9, P); ctx.restore(); }
    else if (style === 'floral') { bouquet(ctx, 150, 150, 1.1, P); ctx.save(); ctx.translate(1080, 0); ctx.scale(-1, 1); bouquet(ctx, 150, 150, 1.1, P); ctx.restore(); bouquet(ctx, 150, 1350, 1.0, P); ctx.save(); ctx.translate(1080, 0); ctx.scale(-1, 1); bouquet(ctx, 150, 1350, 1.0, P); ctx.restore(); }
    else if (style === 'botanical') { vine(ctx, 90, gold); vine(ctx, 990, gold); }
    else if (style === 'lights') { toran(ctx, 130, gold); }
    else if (style === 'arch') { ctx.strokeStyle = goldGrad(ctx, 200, 120, 880, 300, gold); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(200, 320); ctx.quadraticCurveTo(540, 90, 880, 320); ctx.stroke(); for (let i = 0; i <= 8; i++) { const t = i / 8, x = 200 + 680 * t, y = 320 - Math.sin(t * Math.PI) * 220; flower(ctx, x, y, 15, light(gold, 0.15), dark(gold, 0.1), 6); } }
    else if (style === 'royal') { for (let i = 0; i < 2; i++) { paisley(ctx, 420 + i * 240, 150, 26, i ? Math.PI : 0, gold); } }
  }

  function render(ctx, t, P, d) { ctx.fillStyle = light(P[3], 0); const g = ctx.createLinearGradient(0, 0, 0, 1500); g.addColorStop(0, P[3]); g.addColorStop(1, P[4]); ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1500); decorate(ctx, t.style, P); const cy = t.style === 'garland' || t.style === 'lights' || t.style === 'arch' ? 270 : 230; medallion(ctx, cy, P, MOTIF[t.motif] || '💍'); if (t.motif === 'ganesh' || t.motif === 'om') { ctx.fillStyle = P[1]; setFont(ctx, 26, '600'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('॥ श्री गणेशाय नमः ॥', 540, cy + 86); } textBlock(ctx, d, P); }

  function drawBig() { bctx.setTransform(1, 0, 0, 1, 0, 0); bctx.clearRect(0, 0, 1080, 1500); render(bctx, tpl, palette, liveData()); }

  // ---- gallery ----
  function buildGallery() {
    const g = $('gallery'); if (!g) return; g.innerHTML = '';
    TPL.forEach((t) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'tpl-thumb'; b.dataset.id = t.id; if (t.id === tpl.id) b.classList.add('on');
      const cv = document.createElement('canvas'); cv.width = 216; cv.height = 300; const c = cv.getContext('2d'); c.setTransform(216 / 1080, 0, 0, 300 / 1500, 0, 0); render(c, t, t.palette, SAMPLE);
      const nm = document.createElement('span'); nm.textContent = t.name;
      b.appendChild(cv); b.appendChild(nm);
      b.addEventListener('click', () => { tpl = t; applyColor(); g.querySelectorAll('.tpl-thumb').forEach((x) => x.classList.toggle('on', x.dataset.id === t.id)); });
      g.appendChild(b);
    });
  }

  // ---- colour ----
  function applyColor() {
    const sel = $('color'); const id = sel ? sel.value : 'template';
    if (id === 'template') palette = tpl.palette.slice();
    else if (id === 'custom') { const c1 = $('c1').value, c2 = $('c2').value; palette = [c1, c2, c2, light(c2, 0.9), light(c1, 0.82)]; }
    else { const combo = COLORS.find((c) => c.id === id); palette = combo ? combo.palette.slice() : tpl.palette.slice(); }
    const cu = $('custom-colors'); if (cu) cu.style.display = id === 'custom' ? 'flex' : 'none';
    drawBig();
  }

  function fileName() { return 'shaadi-card-nextgrade.png'; }
  if ($('download')) $('download').addEventListener('click', () => { const a = document.createElement('a'); a.href = big.toDataURL('image/png'); a.download = fileName(); a.click(); if (status) status.textContent = UI.downloaded || ''; });
  if ($('print')) $('print').addEventListener('click', () => { const u = big.toDataURL('image/png'); const w = window.open(''); if (!w) return; w.document.write('<img src="' + u + '" style="max-width:100%" onload="print()">'); w.document.close(); });
  if ($('share')) $('share').addEventListener('click', () => { big.toBlob((blob) => { const f = new File([blob], fileName(), { type: 'image/png' }); if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: UI.h1 || 'Shaadi Card', text: (UI.shareText || '') + ' ' + (S.url || 'nextgrade.in/shaadi-card') }).catch(() => undefined); else if (status) status.textContent = UI.cantShare || ''; }, 'image/png'); });

  if ($('color')) $('color').addEventListener('change', applyColor);
  ['c1', 'c2'].forEach((id) => { if ($(id)) $(id).addEventListener('input', () => { if ($('color').value === 'custom') applyColor(); }); });
  ['heading', 'groom', 'bride', 'date', 'day', 'time', 'venue', 'family', 'note'].forEach((id) => { if ($(id)) $(id).addEventListener('input', drawBig); });

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { buildGallery(); drawBig(); });
  buildGallery(); drawBig();
})();
