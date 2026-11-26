/* Live converter on /number-in-words/ pages (uses window.NW from /assets/numwords.js). */
(function () {
  var inp = document.getElementById('nw-in'), out = document.getElementById('nw-out');
  if (!inp || !out || !window.NW) return;
  var Lb = JSON.parse(out.getAttribute('data-l')), N = window.NW;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function show() {
    var v = inp.value.replace(/[,\s₹]/g, ''); if (!/^\d{1,13}(\.\d{0,2})?$/.test(v)) { out.innerHTML = ''; return; }
    var parts = v.split('.'), n = parseInt(parts[0], 10), p = parts[1] ? parseInt((parts[1] + '0').slice(0, 2), 10) : 0;
    var e = N.enIndian(n), i = N.enIntl(n), rows = [[Lb.digits, N.indianFmt(n) + (p ? '.' + String(p).padStart(2, '0') : '')], [Lb.indian, e], [Lb.intl, i], [Lb.hi, N.hiNum(n)], [Lb.bn, N.bnNum(n)]];
    if (n <= 3999 && n > 0) rows.push([Lb.roman, N.roman(n)]);
    out.innerHTML = '<table class="nw-t">' + rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td><b>' + esc(r[1]) + '</b></td></tr>'; }).join('') + '</table><p class="nw-chq">' + esc(N.cheque(n, p)) + '</p>';
  }
  inp.addEventListener('input', show);
})();
