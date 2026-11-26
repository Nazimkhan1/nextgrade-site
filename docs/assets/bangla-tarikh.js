/* /bangla-tarikh/: convert an English date to the Bangla date (West Bengal panjika table from the build + Bangladesh rules). */
(function () {
  var c = document.getElementById('bt-cfg'); if (!c) return;
  var C = JSON.parse(c.textContent), $ = function (id) { return document.getElementById(id); };
  var num = function (x) { return C.bn ? String(x).replace(/\d/g, function (d) { return '০১২৩৪৫৬৭৮৯'[d]; }) : String(x); };
  var D = function (s) { return Date.parse(s + 'T00:00:00Z'); };
  var leap = function (y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; };
  var bdLen = function (m, gy) { return m < 6 ? 31 : m === 10 ? (leap(gy) ? 30 : 29) : 30; };
  function wb(s) { var cur = null; for (var i = 0; i < C.wb.length; i++) { if (C.wb[i][0] <= s) cur = C.wb[i]; else break; } return cur ? { y: cur[1], m: cur[2], d: (D(s) - D(cur[0])) / 864e5 + 1 } : null; }
  function bd(s) { var g = +s.slice(0, 4), y0 = s >= g + '-04-14' ? g : g - 1, day = (D(s) - Date.UTC(y0, 3, 14)) / 864e5, m = 0; while (day >= bdLen(m, y0 + 1)) { day -= bdLen(m, y0 + 1); m++; } return { y: y0 - 593, m: m, d: day + 1 }; }
  var f = function (o) { return o ? num(o.d) + ' ' + C.mn[o.m] + ' ' + num(o.y) : '—'; };
  function run() {
    var s = $('bt-d').value; if (!/^\d{4}-\d\d-\d\d$/.test(s)) { $('bt-out').innerHTML = ''; return; }
    var wd = C.wd[new Date(D(s)).getUTCDay()];
    $('bt-out').innerHTML = '<p class="bt-ans">' + C.L.wb + ': ' + f(wb(s)) + '<small>' + wd + '</small></p><p class="bt-ans">' + C.L.bd + ': ' + f(bd(s)) + '</p>';
  }
  $('bt-d').addEventListener('input', run); $('bt-d').addEventListener('change', run);
  // keep "today" correct even if the page was built the day before (IST)
  var t = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  if ($('bt-d').value !== t) { $('bt-d').value = t; var a = document.querySelectorAll('.bt-ans'); if (a.length >= 2 && wb(t)) { a[0].firstChild.nodeValue = C.L.wb + ': ' + f(wb(t)); a[1].firstChild.nodeValue = C.L.bd + ': ' + f(bd(t)); } }
  run();
})();
