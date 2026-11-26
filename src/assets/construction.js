/* /ghar-banane-ka-kharcha/: construction cost + material estimate (thumb rules per sq ft of built-up area). */
(function () {
  var c = document.getElementById('cc-cfg'); if (!c) return;
  var C = JSON.parse(c.textContent), U = C.ui;
  var $ = function (id) { return document.getElementById(id); };
  var f = function (x, d) { return new Intl.NumberFormat('en-IN', { maximumFractionDigits: d || 0 }).format(x); };
  function run() {
    var area = parseFloat($('cc-area').value) || 0, unit = $('cc-unit').value, floors = parseInt($('cc-fl').value, 10) || 1;
    var q = $('cc-q').value, city = $('cc-city').value;
    var sq = (unit === 'gaj' ? area * 9 : unit === 'sqm' ? area * 10.7639 : area) * floors;
    if (sq <= 0) { $('cc-out').innerHTML = ''; return; }
    var r = C.rates[q], k = C.city[city], lo = sq * r[0] * k, hi = sq * r[1] * k, M = C.mat;
    var rows = [[U.cement, f(sq * M.cement) + ' ' + U.bags], [U.steel, f(sq * M.steel) + ' kg'], [U.bricks, f(sq * M.bricks)], [U.sand, f(sq * M.sand) + ' cft'], [U.agg, f(sq * M.agg) + ' cft'], [U.paint, f(sq * M.paint) + ' L'], [U.tiles, f(sq * M.tiles) + ' sq ft']];
    $('cc-out').innerHTML = '<p class="cc-ans">' + U.total + ': ₹' + f(lo) + ' – ₹' + f(hi) + '<br><small>' + f(sq) + ' sq ft ' + U.builtup + ' · ₹' + f(r[0] * k) + '–' + f(r[1] * k) + ' / sq ft</small></p>' +
      '<h3>' + U.matH + '</h3><table class="cc-t">' + rows.map(function (x) { return '<tr><td>' + x[0] + '</td><td><b>' + x[1] + '</b></td></tr>'; }).join('') + '</table>' +
      '<h3>' + U.splitH + '</h3><table class="cc-t">' + C.split.map(function (s) { return '<tr><td>' + s[0] + ' (' + s[1] + '%)</td><td><b>₹' + f(lo * s[1] / 100) + ' – ₹' + f(hi * s[1] / 100) + '</b></td></tr>'; }).join('') + '</table>';
  }
  ['cc-area', 'cc-unit', 'cc-fl', 'cc-q', 'cc-city'].forEach(function (id) { $(id).addEventListener('input', run); $(id).addEventListener('change', run); });
  run();
})();
