/* /solar-calculator/ and /inverter-calculator/: rooftop solar size, PM Surya Ghar subsidy, savings; inverter VA + batteries. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var f = function (x, d) { return new Intl.NumberFormat('en-IN', { maximumFractionDigits: d || 0 }).format(x); };
  var c = $('sl-cfg');
  if (c) {
    var C = JSON.parse(c.textContent), U = C.ui;
    var sub = function (kw, cat) { var r = C.sub[cat]; return Math.min(kw, 2) * r[0] + Math.max(0, Math.min(kw - 2, 1)) * r[1]; };
    var run = function () {
      var units = parseFloat($('sl-units').value) || 0, cat = $('sl-cat').value, tariff = parseFloat($('sl-tariff').value) || 0, rate = parseFloat($('sl-cost').value) || 0;
      if (units <= 0) { $('sl-out').innerHTML = ''; return; }
      var kw = Math.min(100, Math.max(1, Math.ceil((units / C.gen) * 2) / 2));
      var gen = kw * C.gen, cost = kw * rate, s = sub(kw, cat), net = Math.max(0, cost - s);
      var save = Math.min(gen, units) * tariff, pay = save > 0 ? net / (save * 12) : 0;
      var rows = [[U.roof, '~' + f(kw * C.area) + ' sq ft'], [U.gen, '~' + f(gen) + ' ' + U.units], [U.cost, '₹' + f(cost)], [U.sub, '₹' + f(s)], [U.net, '₹' + f(net)], [U.save, '~₹' + f(save) + ' / ' + U.mo], [U.pay, pay ? '~' + f(pay, 1) + ' ' + U.yrs : '—']];
      $('sl-out').innerHTML = '<p class="sl-ans">' + U.kw + ': ' + f(kw, 1) + ' kW</p><table class="sl-t">' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td><b>' + r[1] + '</b></td></tr>'; }).join('') + '</table>';
    };
    ['sl-units', 'sl-cat', 'sl-tariff', 'sl-cost'].forEach(function (id) { $(id).addEventListener('input', run); $(id).addEventListener('change', run); });
    run();
  }
  var ic = $('iv-cfg');
  if (ic) {
    var I = JSON.parse(ic.textContent), V = I.ui, qs = [].slice.call(document.querySelectorAll('.iv-q'));
    var irun = function () {
      var w = qs.reduce(function (a, q) { return a + (parseFloat(q.value) || 0) * parseFloat(q.dataset.w); }, 0), h = parseFloat($('iv-h').value) || 0;
      if (w <= 0) { $('iv-out').innerHTML = ''; return; }
      var need = w / 0.8, va = I.sizes.filter(function (x) { return x >= need; })[0] || Math.ceil(need / 1000) * 1000;
      var v = va <= 1100 ? 12 : va <= 2500 ? 24 : 48, series = v / 12;
      var ah = (w * h) / (v * 0.8), strings = Math.max(1, Math.ceil(ah / 150)), n = series * strings;
      $('iv-out').innerHTML = '<p class="sl-ans">' + V.va + ': ' + f(va) + ' VA</p><table class="sl-t"><tr><td>' + V.load + '</td><td><b>' + f(w) + ' W</b></td></tr><tr><td>' + V.volt + '</td><td><b>' + v + 'V</b></td></tr><tr><td>' + V.bat + '</td><td><b>' + V.batN.replace('{n}', n) + '</b> (~' + f(ah) + ' Ah @ ' + v + 'V)</td></tr></table>';
    };
    qs.concat([$('iv-h')]).forEach(function (q) { q.addEventListener('input', irun); });
    irun();
  }
})();
