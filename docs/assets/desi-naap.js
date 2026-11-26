/* Desi naap-tol converter (/desi-naap/): amount × from-unit → to-unit (same kind only). */
(function () {
  var c = document.getElementById('dn-cfg'); if (!c) return;
  var C = JSON.parse(c.textContent), U = {}; C.units.forEach(function (u) { U[u[0]] = u; });
  var a = document.getElementById('dn-a'), f = document.getElementById('dn-f'), t = document.getElementById('dn-t'), out = document.getElementById('dn-out');
  function run() {
    var x = parseFloat(a.value), F = U[f.value], T = U[t.value];
    if (isNaN(x)) { out.textContent = ''; return; }
    if (F[2] !== T[2]) { out.textContent = '⚠️ ' + (F[2] === 'w' ? '⚖️ → 📏 ✗' : '📏 → ⚖️ ✗'); return; }
    var v = x * F[1] / T[1];
    out.textContent = new Intl.NumberFormat(C.loc, { maximumFractionDigits: 4 }).format(x) + ' ' + C.names[f.value] + ' = ' + new Intl.NumberFormat(C.loc, { maximumFractionDigits: 4 }).format(v) + ' ' + C.names[t.value];
  }
  [a, f, t].forEach(function (e) { e.addEventListener('input', run); e.addEventListener('change', run); }); run();
})();
