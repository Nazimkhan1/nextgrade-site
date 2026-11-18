// "Naam wali image": draws a greeting image with a name on a <canvas> in the browser. Our own drawings only;
// nothing is uploaded. Page data comes from window.NI_DATA (occasion, heading, messages, UI text).
(() => {
  const D = window.NI_DATA;
  if (!D) return;
  const $ = (id) => document.getElementById(id);
  const cv = $('niCanvas'), ctx = cv.getContext('2d');
  const FONT_HEAD = '"Baloo 2", "Baloo Da 2", "Noto Sans Devanagari", "Noto Sans Bengali", sans-serif';
  const FONT_TEXT = '"Noto Sans Devanagari", "Noto Sans Bengali", Inter, sans-serif';
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  let design = D.designs[0], tall = false;

  // ---------- small helpers
  const rnd = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const grad = (W, H, cols, angle = 1) => { const g = angle ? ctx.createLinearGradient(0, 0, W * 0.3, H) : ctx.createRadialGradient(W / 2, H * 0.4, 10, W / 2, H * 0.4, H); cols.forEach((c, i) => g.addColorStop(i / (cols.length - 1), c)); return g; };
  const circle = (x, y, r, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
  const star = (x, y, r, c) => { ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i < 10; i += 1) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); };
  const COLS = ['#ff6b6b', '#ffd43b', '#69db7c', '#4dabf7', '#da77f2', '#ff922b', '#f783ac'];

  const firework = (x, y, r, c) => { ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 18; i += 1) { const a = (i / 18) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.25, y + Math.sin(a) * r * 0.25); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke(); circle(x + Math.cos(a) * r * 1.08, y + Math.sin(a) * r * 1.08, 5, c); } };
  const confetti = (W, H, n, R) => { for (let i = 0; i < n; i += 1) { ctx.save(); ctx.translate(R() * W, R() * H); ctx.rotate(R() * 6); ctx.fillStyle = COLS[Math.floor(R() * COLS.length)]; ctx.fillRect(-9, -4, 18, 8); ctx.restore(); } };
  const balloon = (x, y, s, c) => { ctx.strokeStyle = 'rgba(80,80,80,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 60 * s); ctx.quadraticCurveTo(x + 15 * s, y + 120 * s, x - 5 * s, y + 180 * s); ctx.stroke(); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x, y, 45 * s, 58 * s, 0, 0, Math.PI * 2); ctx.fill(); circle(x - 15 * s, y - 20 * s, 10 * s, 'rgba(255,255,255,0.45)'); };
  const flower = (x, y, r, c) => { for (let i = 0; i < 6; i += 1) { const a = (i / 6) * Math.PI * 2; ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6, r * 0.5, r * 0.3, a, 0, Math.PI * 2); ctx.fill(); } circle(x, y, r * 0.32, '#ffd43b'); };
  const cloud = (x, y, s, c) => { [[0, 0, 60], [55, -20, 70], [120, 0, 55], [60, 20, 60]].forEach(([dx, dy, r]) => circle(x + dx * s, y + dy * s, r * s, c)); };
  const kite = (x, y, s, c1, c2, rot) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = c1; ctx.beginPath(); ctx.moveTo(0, -70 * s); ctx.lineTo(55 * s, 0); ctx.lineTo(0, 80 * s); ctx.lineTo(-55 * s, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = c2; ctx.beginPath(); ctx.moveTo(0, -70 * s); ctx.lineTo(55 * s, 0); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 80 * s); ctx.bezierCurveTo(20 * s, 140 * s, -30 * s, 180 * s, 10 * s, 240 * s); ctx.stroke(); ctx.restore(); };
  const sun = (x, y, r, c) => { ctx.strokeStyle = c; ctx.lineWidth = 8; for (let i = 0; i < 16; i += 1) { const a = (i / 16) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25); ctx.lineTo(x + Math.cos(a) * r * 1.6, y + Math.sin(a) * r * 1.6); ctx.stroke(); } circle(x, y, r, c); };
  const moon = (x, y, r, bg) => { ctx.shadowColor = 'rgba(255,243,191,0.9)'; ctx.shadowBlur = 40; circle(x, y, r, '#fff3bf'); ctx.shadowBlur = 0; circle(x + r * 0.45, y - r * 0.2, r * 0.88, bg); };
  const flagBand = (W, y, h, wave) => { ['#ff9933', '#ffffff', '#138808'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, y + i * h / 3 + Math.sin(x / 140) * wave); for (let x = W; x >= 0; x -= 20) ctx.lineTo(x, y + (i + 1) * h / 3 + Math.sin(x / 140) * wave); ctx.closePath(); ctx.fill(); }); };
  const chakra = (x, y, r, c) => { ctx.strokeStyle = c; ctx.lineWidth = r * 0.08; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = r * 0.035; ctx.beginPath(); for (let i = 0; i < 24; i += 1) { const a = (i / 24) * Math.PI * 2; ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.stroke(); circle(x, y, r * 0.12, c); };
  const tree = (x, y, s) => { ctx.fillStyle = '#7f5539'; ctx.fillRect(x - 18 * s, y, 36 * s, 50 * s); [[0, 260, 200], [40, 210, 160], [80, 160, 120], [120, 110, 80]].forEach(([dy, w]) => { ctx.fillStyle = '#2b8a3e'; ctx.beginPath(); ctx.moveTo(x - w / 2 * s * 1.4, y - dy * s); ctx.lineTo(x, y - (dy + 150) * s); ctx.lineTo(x + w / 2 * s * 1.4, y - dy * s); ctx.closePath(); ctx.fill(); }); star(x, y - 280 * s, 34 * s, '#ffd43b'); for (let i = 0; i < 9; i += 1) circle(x + Math.sin(i * 2.1) * 80 * s * (1 - i / 12), y - (30 + i * 26) * s, 9 * s, COLS[i % COLS.length]); };
  const fire = (x, y, s) => { ctx.fillStyle = '#6f4518'; for (let i = -2; i <= 2; i += 1) { ctx.save(); ctx.translate(x + i * 25 * s, y); ctx.rotate(i * 0.35); ctx.fillRect(-10 * s, -10 * s, 20 * s, 90 * s); ctx.restore(); } [['#e8590c', 1], ['#ff922b', 0.75], ['#ffd43b', 0.45]].forEach(([c, k]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - 110 * s * k, y); ctx.quadraticCurveTo(x - 60 * s * k, y - 160 * s * k, x, y - 260 * s * k); ctx.quadraticCurveTo(x + 60 * s * k, y - 160 * s * k, x + 110 * s * k, y); ctx.closePath(); ctx.fill(); }); };
  const cake = (x, y, s) => { ctx.fillStyle = '#f783ac'; ctx.fillRect(x - 150 * s, y - 90 * s, 300 * s, 90 * s); ctx.fillStyle = '#fff0f6'; ctx.fillRect(x - 110 * s, y - 170 * s, 220 * s, 80 * s); ctx.fillStyle = '#fff'; for (let i = 0; i < 8; i += 1) circle(x - 140 * s + i * 40 * s, y - 90 * s, 16 * s, '#fff'); for (let i = 0; i < 5; i += 1) { const cx = x - 80 * s + i * 40 * s; ctx.fillStyle = COLS[i]; ctx.fillRect(cx - 6 * s, y - 230 * s, 12 * s, 60 * s); ctx.fillStyle = '#ffd43b'; ctx.beginPath(); ctx.ellipse(cx, y - 245 * s, 8 * s, 15 * s, 0, 0, Math.PI * 2); ctx.fill(); } };
  const cup = (x, y, s) => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x - 90 * s, y - 120 * s); ctx.lineTo(x + 90 * s, y - 120 * s); ctx.quadraticCurveTo(x + 80 * s, y, x, y); ctx.quadraticCurveTo(x - 80 * s, y, x - 90 * s, y - 120 * s); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 16 * s; ctx.beginPath(); ctx.arc(x + 95 * s, y - 75 * s, 30 * s, -1.3, 1.3); ctx.stroke(); ctx.fillStyle = '#a0522d'; ctx.beginPath(); ctx.ellipse(x, y - 118 * s, 84 * s, 14 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 6 * s; [-30, 0, 30].forEach((dx) => { ctx.beginPath(); ctx.moveTo(x + dx * s, y - 150 * s); ctx.bezierCurveTo(x + (dx + 20) * s, y - 190 * s, x + (dx - 20) * s, y - 220 * s, x + dx * s, y - 260 * s); ctx.stroke(); }); };
  const indiaGate = (x, y, s, c) => { ctx.fillStyle = c; ctx.fillRect(x - 120 * s, y - 260 * s, 240 * s, 260 * s); ctx.fillRect(x - 150 * s, y - 290 * s, 300 * s, 34 * s); ctx.fillRect(x - 80 * s, y - 330 * s, 160 * s, 44 * s); ctx.beginPath(); ctx.ellipse(x, y - 330 * s, 55 * s, 22 * s, 0, Math.PI, 0); ctx.fill(); ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.moveTo(x - 50 * s, y); ctx.lineTo(x - 50 * s, y - 150 * s); ctx.arc(x, y - 150 * s, 50 * s, Math.PI, 0); ctx.lineTo(x + 50 * s, y); ctx.closePath(); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; };
  const laddoos = (x, y, s) => { ctx.fillStyle = '#d9a066'; ctx.beginPath(); ctx.ellipse(x, y, 220 * s, 40 * s, 0, 0, Math.PI * 2); ctx.fill(); [[-120, -30], [-40, -40], [40, -40], [120, -30], [-80, -95], [0, -100], [80, -95], [-40, -155], [40, -155]].forEach(([dx, dy]) => { circle(x + dx * s, y + dy * s, 42 * s, '#c68a3a'); for (let i = 0; i < 6; i += 1) circle(x + dx * s + Math.cos(i) * 22 * s, y + dy * s + Math.sin(i * 1.7) * 22 * s, 4 * s, '#fff8e1'); }); };
  const drum = (x, y, s) => { ctx.fillStyle = '#c92a2a'; ctx.beginPath(); ctx.ellipse(x, y, 150 * s, 90 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ffe8cc'; ctx.beginPath(); ctx.ellipse(x - 140 * s, y, 30 * s, 88 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 140 * s, y, 30 * s, 88 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#ffd43b'; ctx.lineWidth = 5 * s; for (let i = -3; i <= 3; i += 1) { ctx.beginPath(); ctx.moveTo(x + i * 38 * s - 20 * s, y - 85 * s); ctx.lineTo(x + i * 38 * s + 20 * s, y + 85 * s); ctx.stroke(); } };

  // ---------- designs: background + decorations (kept to the edges so the text stays clear) + text colours
  const DESIGNS = {
    'ny-fireworks': { bg: ['#0b1d51', '#3b1f6e', '#0b1d51'], ink: '#fff', accent: '#ffd43b', deco: (W, H, R) => { for (let i = 0; i < 40; i += 1) circle(R() * W, R() * H, 2, 'rgba(255,255,255,0.8)'); [[0.18, 0.15, '#ff6b6b'], [0.82, 0.14, '#ffd43b'], [0.12, 0.85, '#69db7c'], [0.86, 0.86, '#4dabf7'], [0.5, 0.06, '#da77f2']].forEach(([x, y, c]) => firework(W * x, H * y, W * 0.09, c)); } },
    'ny-gold': { bg: ['#1a1a1a', '#3d2f12', '#1a1a1a'], ink: '#fff8e1', accent: '#f6c453', deco: (W, H, R) => { ctx.strokeStyle = '#f6c453'; ctx.lineWidth = 6; ctx.strokeRect(40, 40, W - 80, H - 80); ctx.lineWidth = 2; ctx.strokeRect(58, 58, W - 116, H - 116); for (let i = 0; i < 60; i += 1) star(R() * W, R() < 0.5 ? R() * H * 0.18 : H - R() * H * 0.16, 4 + R() * 6, `rgba(246,196,83,${0.4 + R() * 0.6})`); } },
    'ny-confetti': { bg: ['#fff4e6', '#ffe3e3', '#e7f5ff'], ink: '#2b2b52', accent: '#e64980', deco: (W, H, R) => { confetti(W, H * 0.2, 70, R); ctx.save(); ctx.translate(0, H * 0.82); confetti(W, H * 0.18, 70, R); ctx.restore(); } },
    'gm-sunrise': { band: [0.14, 0.64], bg: ['#ffd8a8', '#ffa94d', '#ff8787'], ink: '#4a1d00', accent: '#c92a2a', deco: (W, H) => { sun(W * 0.5, H * 0.9, W * 0.16, '#fff3bf'); ctx.fillStyle = '#e8590c'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H * 0.88); ctx.quadraticCurveTo(W * 0.25, H * 0.8, W * 0.5, H * 0.9); ctx.quadraticCurveTo(W * 0.75, H * 0.8, W, H * 0.86); ctx.lineTo(W, H); ctx.fill(); [[0.15, 0.12], [0.24, 0.16], [0.8, 0.1]].forEach(([x, y]) => { ctx.strokeStyle = '#4a1d00'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(W * x - 14, H * y, 14, Math.PI * 1.1, Math.PI * 1.9); ctx.arc(W * x + 14, H * y, 14, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }); } },
    'gm-flowers': { bg: ['#f3fff4', '#e6fcf5', '#fff9db'], ink: '#1b4332', accent: '#d6336c', deco: (W, H, R) => { for (let i = 0; i < 9; i += 1) { flower(W * (0.06 + i * 0.11), H * 0.06 + R() * 30, 34, COLS[i % COLS.length]); flower(W * (0.06 + i * 0.11), H * 0.94 - R() * 30, 34, COLS[(i + 3) % COLS.length]); } } },
    'gm-tea': { band: [0.14, 0.64], bg: ['#fff3bf', '#ffd8a8', '#ffc078'], ink: '#4a2c00', accent: '#a0522d', deco: (W, H) => { cup(W * 0.5, H * 0.95, W / 1080 * 1.2); sun(W * 0.88, H * 0.1, 50, '#ffe066'); } },
    'gn-moon': { bg: ['#0b1b3a', '#1c2f66', '#0b1b3a'], ink: '#f1f3f5', accent: '#ffe066', deco: (W, H, R) => { for (let i = 0; i < 90; i += 1) circle(R() * W, R() * H, 1.5 + R() * 2, `rgba(255,255,255,${0.4 + R() * 0.6})`); moon(W * 0.8, H * 0.13, W * 0.08, '#132552'); } },
    'gn-stars': { bg: ['#1b1036', '#3b1f6e', '#1b1036'], ink: '#fff', accent: '#b197fc', deco: (W, H, R) => { for (let i = 0; i < 40; i += 1) star(R() * W, R() < 0.5 ? R() * H * 0.22 : H - R() * H * 0.2, 6 + R() * 12, `rgba(255,236,153,${0.5 + R() * 0.5})`); } },
    'gn-clouds': { bg: ['#243b55', '#141e30'], ink: '#fff', accent: '#a5d8ff', deco: (W, H, R) => { moon(W * 0.5, H * 0.1, W * 0.06, '#203450'); cloud(W * 0.02, H * 0.92, 1.4, 'rgba(255,255,255,0.18)'); cloud(W * 0.6, H * 0.95, 1.6, 'rgba(255,255,255,0.14)'); for (let i = 0; i < 50; i += 1) circle(R() * W, R() * H * 0.3, 2, 'rgba(255,255,255,0.7)'); } },
    'bd-balloons': { bg: ['#e7f5ff', '#fff0f6'], ink: '#1d3557', accent: '#e64980', deco: (W, H) => { [[0.1, 0.16, '#ff6b6b'], [0.22, 0.1, '#4dabf7'], [0.84, 0.12, '#ffd43b'], [0.93, 0.2, '#69db7c'], [0.08, 0.78, '#da77f2'], [0.9, 0.78, '#ff922b']].forEach(([x, y, c]) => balloon(W * x, H * y, W / 1080 * 1.1, c)); } },
    'bd-cake': { band: [0.14, 0.64], bg: ['#fff5f5', '#ffdeeb', '#e5dbff'], ink: '#5f3dc4', accent: '#e64980', deco: (W, H, R) => { cake(W * 0.5, H * 0.96, W / 1080 * 1.1); confetti(W, H * 0.14, 40, R); } },
    'bd-confetti': { bg: ['#5f3dc4', '#e64980'], ink: '#fff', accent: '#ffe066', deco: (W, H, R) => { confetti(W, H, 120, R); } },
    'xm-tree': { bg: ['#0b3d2e', '#14532d', '#0b3d2e'], ink: '#fff', accent: '#ffd43b', deco: (W, H, R) => { tree(W * 0.12, H * 0.9, W / 1080 * 0.7); tree(W * 0.88, H * 0.9, W / 1080 * 0.7); for (let i = 0; i < 60; i += 1) circle(R() * W, R() * H, 2 + R() * 3, 'rgba(255,255,255,0.7)'); } },
    'xm-snow': { bg: ['#e7f5ff', '#d0ebff', '#a5d8ff'], ink: '#0b3d91', accent: '#c92a2a', deco: (W, H, R) => { for (let i = 0; i < 120; i += 1) circle(R() * W, R() * H, 3 + R() * 6, 'rgba(255,255,255,0.9)'); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H * 0.9); ctx.quadraticCurveTo(W * 0.5, H * 0.84, W, H * 0.9); ctx.lineTo(W, H); ctx.fill(); } },
    'xm-star': { bg: ['#7a0d0d', '#c92a2a', '#7a0d0d'], ink: '#fff', accent: '#ffe066', deco: (W, H, R) => { star(W * 0.5, H * 0.11, W * 0.07, '#ffe066'); for (let i = 0; i < 40; i += 1) star(R() * W, R() * H, 4 + R() * 6, 'rgba(255,255,255,0.6)'); } },
    'lo-fire': { band: [0.14, 0.64], bg: ['#1a0e05', '#4a1f05', '#1a0e05'], ink: '#fff', accent: '#ffa94d', deco: (W, H, R) => { fire(W * 0.5, H * 0.97, W / 1080 * 1.1); for (let i = 0; i < 60; i += 1) circle(W * (0.3 + R() * 0.4), H * (0.55 + R() * 0.35), 2 + R() * 3, `rgba(255,${150 + Math.floor(R() * 100)},50,${R()})`); } },
    'lo-dhol': { band: [0.14, 0.64], bg: ['#fff3bf', '#ffa94d'], ink: '#4a1d00', accent: '#c92a2a', deco: (W, H) => { drum(W * 0.5, H * 0.9, W / 1080 * 1.1); } },
    'lo-kites': { bg: ['#74c0fc', '#d0ebff'], ink: '#0b3d91', accent: '#e8590c', deco: (W, H) => { kite(W * 0.12, H * 0.14, W / 1080, '#ff6b6b', '#ffd43b', -0.3); kite(W * 0.88, H * 0.12, W / 1080, '#69db7c', '#4dabf7', 0.25); kite(W * 0.86, H * 0.82, W / 1080 * 0.9, '#da77f2', '#ff922b', -0.2); } },
    'ms-kites': { bg: ['#4dabf7', '#a5d8ff', '#e7f5ff'], ink: '#0b3d91', accent: '#e64980', deco: (W, H) => { [[0.1, 0.12, '#ff6b6b', '#ffd43b', -0.4], [0.3, 0.07, '#69db7c', '#fff', 0.2], [0.75, 0.1, '#da77f2', '#ffd43b', -0.1], [0.92, 0.2, '#ff922b', '#4dabf7', 0.3], [0.1, 0.84, '#f783ac', '#fff', 0.2], [0.9, 0.86, '#ffd43b', '#e64980', -0.3]].forEach(([x, y, a, b, r]) => kite(W * x, H * y, W / 1080 * 0.9, a, b, r)); } },
    'ms-sun': { bg: ['#ffe066', '#ffa94d', '#ff6b6b'], ink: '#4a1d00', accent: '#5f3dc4', deco: (W, H) => { sun(W * 0.5, H * 0.12, W * 0.07, '#fff3bf'); kite(W * 0.12, H * 0.84, W / 1080 * 0.8, '#4dabf7', '#fff', 0.2); kite(W * 0.88, H * 0.82, W / 1080 * 0.8, '#69db7c', '#fff', -0.2); } },
    'ms-tilgud': { band: [0.14, 0.64], bg: ['#fff9db', '#ffe8cc'], ink: '#5c3b1e', accent: '#e8590c', deco: (W, H, R) => { laddoos(W * 0.5, H * 0.95, W / 1080); for (let i = 0; i < 6; i += 1) kite(W * (0.08 + i * 0.17), H * 0.08, W / 1080 * 0.5, COLS[i], '#fff', (R() - 0.5) * 0.6); } },
    'rd-flag': { bg: ['#fff'], ink: '#0b3d91', accent: '#e8590c', deco: (W, H) => { flagBand(W, 0, H * 0.16, 14); flagBand(W, H * 0.86, H * 0.16, 14); chakra(W * 0.5, H * 0.19, W * 0.04, '#000080'); } },
    'rd-gate': { bg: ['#ff9933', '#ffffff', '#138808'], ink: '#0b3d91', accent: '#000080', deco: (W, H) => { ctx.globalAlpha = 0.22; indiaGate(W * 0.5, H * 0.98, W / 1080 * 1.2, '#7a4b1f'); ctx.globalAlpha = 1; } },
    'rd-chakra': { bg: ['#0b3d91', '#1864ab'], ink: '#fff', accent: '#ffb366', deco: (W, H) => { ctx.globalAlpha = 0.18; chakra(W * 0.5, H * 0.5, W * 0.42, '#fff'); ctx.globalAlpha = 1; flagBand(W, H * 0.9, H * 0.1, 8); } },
  };

  // ---------- text
  const wrap = (text, max) => text.split(/\s+/).reduce((out, w) => { const last = out[out.length - 1]; const test = last ? `${last} ${w}` : w; if (last !== undefined && ctx.measureText(test).width > max) out.push(w); else out[out.length ? out.length - 1 : 0] = test; return out; }, []);
  const fitFont = (text, weight, family, max, start, min) => { let s = start; ctx.font = `${weight} ${s}px ${family}`; while (s > min && ctx.measureText(text).width > max) { s -= 4; ctx.font = `${weight} ${s}px ${family}`; } return s; };

  const draw = () => {
    const W = 1080, H = tall ? 1920 : 1080;
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const d = DESIGNS[design] || DESIGNS[D.designs[0]];
    ctx.fillStyle = d.bg.length > 1 ? grad(W, H, d.bg) : d.bg[0]; ctx.fillRect(0, 0, W, H);
    d.deco(W, H, rnd(design.length * 97 + 13));
    const to = ($('niTo').value || '').trim(), from = ($('niFrom').value || '').trim();
    const custom = ($('niCustom').value || '').trim();
    const msg = custom || D.msgs[Number($('niMsg').value) || 0] || '';
    // vertical layout in the middle band
    const band = d.band && !tall ? d.band : d.band ? [0.2, 0.7] : null;
    const top = band ? H * band[0] : tall ? H * 0.28 : H * 0.24, bottom = band ? H * band[1] : tall ? H * 0.78 : H * 0.8, maxW = W * 0.78;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const blocks = [];
    const hs = fitFont(D.heading, 800, FONT_HEAD, maxW, tall ? 96 : 84, 40); blocks.push({ text: D.heading, font: `800 ${hs}px ${FONT_HEAD}`, color: d.accent, h: hs * 1.25 });
    if (to) { const ns = fitFont(to, 800, FONT_HEAD, maxW, tall ? 150 : 128, 48); blocks.push({ text: to, font: `800 ${ns}px ${FONT_HEAD}`, color: d.ink, h: ns * 1.2, shadow: true }); }
    const ms = tall ? 50 : 44; ctx.font = `600 ${ms}px ${FONT_TEXT}`; wrap(msg, maxW).slice(0, 5).forEach((l) => blocks.push({ text: l, font: `600 ${ms}px ${FONT_TEXT}`, color: d.ink, h: ms * 1.45 }));
    if (from) blocks.push({ text: D.ui.from2(from), font: `700 ${tall ? 50 : 44}px ${FONT_HEAD}`, color: d.accent, h: (tall ? 50 : 44) * 1.8 });
    const total = blocks.reduce((a, b) => a + b.h, 0);
    let y = top + Math.max(0, (bottom - top - total) / 2);
    blocks.forEach((b) => {
      y += b.h; ctx.font = b.font; ctx.fillStyle = b.color;
      if (b.shadow) { ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4; }
      ctx.fillText(b.text, W / 2, y - b.h * 0.22);
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    });
    // small credit so a shared image can lead people back
    ctx.font = `600 26px ${FONT_TEXT}`; ctx.fillStyle = d.ink; ctx.globalAlpha = 0.55; ctx.textAlign = 'right'; ctx.fillText('nextgrade.in', W - 36, H - 30); ctx.globalAlpha = 1;
  };

  // ---------- controls
  D.msgs.forEach((m, i) => $('niMsg').add(new Option(m.length > 60 ? `${m.slice(0, 60)}…` : m, String(i))));
  const thumbs = $('niDesigns');
  D.designs.forEach((id, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'ni-thumb'; b.textContent = String(i + 1); const dd = DESIGNS[id]; b.style.background = dd.bg.length > 1 ? `linear-gradient(135deg, ${dd.bg.join(', ')})` : dd.bg[0]; b.style.color = dd.ink; b.addEventListener('click', () => { design = id; [...thumbs.children].forEach((c) => c.classList.toggle('on', c === b)); draw(); }); if (!i) b.classList.add('on'); thumbs.appendChild(b); });
  $('niSize').addEventListener('change', (e) => { tall = e.target.value === 'tall'; draw(); });
  ['niTo', 'niFrom', 'niCustom'].forEach((id) => $(id).addEventListener('input', draw));
  $('niMsg').addEventListener('change', draw);
  $('niFrom').value = store.get('ni-from') || '';
  $('niFrom').addEventListener('change', () => store.set('ni-from', $('niFrom').value.trim()));
  const status = (t) => { $('niStatus').textContent = t; };
  const fileName = () => `${D.slug}-${(($('niTo').value || 'image').trim().replace(/[^\p{L}\p{N}]+/gu, '-') || 'image').slice(0, 30)}.jpg`;
  const blob = () => new Promise((r) => cv.toBlob(r, 'image/jpeg', 0.92));
  $('niDownload').addEventListener('click', async () => { const b = await blob(); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = fileName(); document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); status(D.ui.downloaded); });
  $('niShare').addEventListener('click', async () => {
    const b = await blob(); const file = new File([b], fileName(), { type: 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], text: D.shareText }).catch(() => {}); return; }
    status(D.ui.cantShare);
  });
  const first = () => { draw(); };
  if (document.fonts && document.fonts.load) Promise.all([document.fonts.load(`800 60px "Baloo 2"`), document.fonts.load(`600 40px "Noto Sans Devanagari"`), document.fonts.load(`800 60px "Baloo Da 2"`), document.fonts.load(`600 40px "Noto Sans Bengali"`)]).then(first, first); else first();
  draw();
  window.__ni = { draw, set: (o) => { if (o.to !== undefined) $('niTo').value = o.to; if (o.from !== undefined) $('niFrom').value = o.from; if (o.design) design = o.design; if (o.tall !== undefined) tall = o.tall; draw(); }, url: () => cv.toDataURL('image/jpeg', 0.85) };
})();
