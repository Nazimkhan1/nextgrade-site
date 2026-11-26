/* /sunrise-sunset/: compare sunrise and sunset between two Indian cities for any date (NOAA formula, IST). */
(function () {
  var c = document.getElementById('sc-cfg'); if (!c) return;
  var C = JSON.parse(c.textContent), U = C.ui, CITY = {}; C.cities.forEach(function (x) { CITY[x[1].toLowerCase()] = x; CITY[x[0]] = x; });
  var rad = Math.PI / 180;
  function sun(lat, lon, ymd) {
    var d = new Date(ymd + 'T12:00:00Z'), doy = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5), g = (2 * Math.PI / 365) * (doy - 1);
    var eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var cosH = Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(dec)) - Math.tan(lat * rad) * Math.tan(dec);
    if (cosH < -1 || cosH > 1) return null; var ha = Math.acos(cosH) / rad;
    return [720 - 4 * (lon + ha) - eqt + 330, 720 - 4 * (lon - ha) - eqt + 330];
  }
  function hm(m) { m = Math.round(m); var h = Math.floor(m / 60), mm = m % 60; return ((h + 11) % 12 + 1) + ':' + (mm < 10 ? '0' : '') + mm + (h >= 12 ? ' PM' : ' AM'); }
  function dur(m) { m = Math.round(Math.abs(m)); var h = Math.floor(m / 60), mm = m % 60; return (h ? h + ' ' + U.h + ' ' : '') + mm + ' ' + U.m; }
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); };
  function pick(v) { v = (v || '').trim().toLowerCase(); return CITY[v] || C.cities.filter(function (x) { return x[1].toLowerCase().indexOf(v) === 0 || x[2].toLowerCase().indexOf(v) === 0; })[0]; }
  function run() {
    var a = pick($('sc-a').value), b = pick($('sc-b').value), ymd = $('sc-d').value || C.today, out = $('sc-out');
    if (!a || !b) { out.innerHTML = ''; return; }
    var sa = sun(a[3], a[4], ymd), sb = sun(b[3], b[4], ymd);
    if (!sa || !sb) { out.innerHTML = ''; return; }
    var dr = sb[0] - sa[0], ds = sb[1] - sa[1];
    var row = function (x, s) { return '<tr><td><b>' + esc(x[1]) + '</b></td><td>🌅 ' + hm(s[0]) + '</td><td>🌇 ' + hm(s[1]) + '</td><td>' + dur(s[1] - s[0]) + '</td></tr>'; };
    var say = Math.abs(dr) < 1 ? U.same.replace('{a}', a[1]).replace('{b}', b[1]) : (dr > 0 ? U.earlier : U.later).replace('{a}', a[1]).replace('{b}', b[1]).replace('{d}', dur(dr));
    var say2 = Math.abs(ds) < 1 ? '' : (ds > 0 ? U.setEarlier : U.setLater).replace('{a}', a[1]).replace('{b}', b[1]).replace('{d}', dur(ds));
    out.innerHTML = '<p class="sc-ans">' + esc(say) + (say2 ? '<br><small>' + esc(say2) + '</small>' : '') + '</p><div class="table-wrap"><table class="sc-t"><tr><th></th><th>' + U.rise + '</th><th>' + U.set + '</th><th>' + U.len + '</th></tr>' + row(a, sa) + row(b, sb) + '</table></div>';
  }
  ['sc-a', 'sc-b', 'sc-d'].forEach(function (id) { $(id).addEventListener('change', run); $(id).addEventListener('input', run); });
  $('sc-swap').onclick = function () { var t = $('sc-a').value; $('sc-a').value = $('sc-b').value; $('sc-b').value = t; run(); };
  run();
})();
