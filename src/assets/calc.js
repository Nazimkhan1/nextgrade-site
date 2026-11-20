/**
 * NextGrade calculators engine. One small script powers every /calculator/<slug>/ page.
 * The page provides a <form data-calc="<type>"> with named inputs and a .calc-result box.
 * Everything runs in the browser; nothing is sent anywhere.
 */
(function () {
  'use strict';
  var form = document.querySelector('form[data-calc]');
  if (!form) return;
  var type = form.getAttribute('data-calc');
  var out = document.querySelector('.calc-result');
  var strings = {};
  try { strings = JSON.parse(form.getAttribute('data-strings') || '{}'); } catch (e) { strings = {}; }

  function num(name) {
    var el = form.elements[name];
    if (!el) return NaN;
    return parseFloat(String(el.value).replace(/,/g, '').trim());
  }
  function val(name) {
    var el = form.elements[name];
    return el ? el.value : '';
  }
  function fmt(n, dp) {
    if (!isFinite(n)) return '—';
    var s = Number(n).toFixed(dp == null ? 2 : dp);
    // strip trailing .00
    if (dp == null && /\.00$/.test(s)) s = s.slice(0, -3);
    var parts = s.split('.');
    // Indian grouping: 10,00,000 (lakh / crore), not 1,000,000
    var neg = parts[0].charAt(0) === '-', ip = neg ? parts[0].slice(1) : parts[0];
    if (ip.length > 3) ip = ip.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + ip.slice(-3);
    parts[0] = (neg ? '-' : '') + ip;
    return parts.join('.');
  }
  function row(label, value, strong) {
    return '<div class="calc-row' + (strong ? ' calc-strong' : '') + '"><span>' + label + '</span><b>' + value + '</b></div>';
  }
  function show(html) { if (out) { out.innerHTML = html; out.hidden = false; } }
  function err(msg) { if (out) { out.innerHTML = '<p class="calc-err">' + msg + '</p>'; out.hidden = false; } }

  var S = function (k, d) { return strings[k] != null ? strings[k] : d; };

  var calc = {
    age: function () {
      var from = val('dob'), to = val('on') || new Date().toISOString().slice(0, 10);
      if (!from) return err(S('needDob', 'Please choose your date of birth.'));
      var a = new Date(from), b = new Date(to);
      if (isNaN(a) || isNaN(b)) return err(S('badDate', 'Please enter valid dates.'));
      if (b < a) return err(S('future', 'The date of birth is after the chosen date.'));
      var y = b.getFullYear() - a.getFullYear();
      var m = b.getMonth() - a.getMonth();
      var d = b.getDate() - a.getDate();
      if (d < 0) { m -= 1; d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); }
      if (m < 0) { y -= 1; m += 12; }
      var totalDays = Math.floor((b - a) / 86400000);
      var months = y * 12 + m;
      // whole days in UTC, so a birthday today gives 0 (not 365)
      var bU = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      var next = Date.UTC(b.getFullYear(), a.getMonth(), a.getDate());
      if (next < bU) next = Date.UTC(b.getFullYear() + 1, a.getMonth(), a.getDate());
      var toBday = Math.round((next - bU) / 86400000);
      show(
        row(S('age', 'Age'), '<b>' + y + '</b> ' + S('years', 'years') + ', ' + m + ' ' + S('months', 'months') + ', ' + d + ' ' + S('days', 'days'), true) +
        row(S('inMonths', 'In months'), fmt(months, 0) + ' ' + S('months', 'months')) +
        row(S('inWeeks', 'In weeks'), fmt(Math.floor(totalDays / 7), 0)) +
        row(S('inDays', 'In days'), fmt(totalDays, 0)) +
        row(S('nextBday', 'Next birthday in'), toBday + ' ' + S('days', 'days'))
      );
    },
    percentage: function () {
      var mode = val('mode') || 'xofy';
      if (mode === 'xofy') { // X% of Y
        var p = num('p'), y = num('y');
        if (isNaN(p) || isNaN(y)) return err(S('fill', 'Please fill the numbers.'));
        show(row(S('result', 'Result'), fmt(p) + '% ' + S('of', 'of') + ' ' + fmt(y) + ' = <b>' + fmt(p * y / 100) + '</b>', true));
      } else if (mode === 'xisy') { // X is what % of Y
        var x = num('x'), yy = num('y2');
        if (isNaN(x) || isNaN(yy) || yy === 0) return err(S('fill', 'Please fill the numbers.'));
        show(row(S('result', 'Result'), fmt(x) + ' ' + S('isPct', 'is') + ' <b>' + fmt(x / yy * 100) + '%</b> ' + S('of', 'of') + ' ' + fmt(yy), true));
      } else { // change from A to B
        var a = num('a'), b = num('b');
        if (isNaN(a) || isNaN(b) || a === 0) return err(S('fill', 'Please fill the numbers.'));
        var ch = (b - a) / a * 100;
        show(row(S('change', 'Change'), (ch >= 0 ? '+' : '') + fmt(ch) + '%', true));
      }
    },
    emi: function () {
      var p = num('p'), r = num('r'), n = num('n'), unit = val('nunit') || 'years';
      if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || n <= 0) return err(S('fill', 'Please fill loan amount, rate and tenure.'));
      var months = unit === 'months' ? n : n * 12;
      var i = r / 12 / 100;
      var emi = i === 0 ? p / months : p * i * Math.pow(1 + i, months) / (Math.pow(1 + i, months) - 1);
      var total = emi * months, interest = total - p;
      show(
        row(S('emi', 'Monthly EMI'), '₹ ' + fmt(emi), true) +
        row(S('principal', 'Principal'), '₹ ' + fmt(p)) +
        row(S('interest', 'Total interest'), '₹ ' + fmt(interest)) +
        row(S('total', 'Total payment'), '₹ ' + fmt(total))
      );
    },
    sip: function () {
      var m = num('m'), r = num('r'), y = num('n');
      if (isNaN(m) || isNaN(r) || isNaN(y) || m <= 0 || y <= 0) return err(S('fill', 'Please fill the amount, rate and years.'));
      var months = Math.round(y * 12), i = r / 12 / 100;
      var fv = i === 0 ? m * months : m * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
      var invested = m * months, gain = fv - invested;
      show(
        row(S('future', 'Future value'), '₹ ' + fmt(fv), true) +
        row(S('invested', 'You invested'), '₹ ' + fmt(invested)) +
        row(S('returns', 'Estimated returns'), '₹ ' + fmt(gain))
      );
    },
    gst: function () {
      var amt = num('amt'), r = num('r'), mode = val('mode') || 'add';
      if (isNaN(amt) || isNaN(r) || amt < 0) return err(S('fill', 'Please fill the amount and GST rate.'));
      if (mode === 'add') {
        var g = amt * r / 100;
        show(row(S('base', 'Base amount'), '₹ ' + fmt(amt)) + row('GST (' + fmt(r) + '%)', '₹ ' + fmt(g)) + row(S('total', 'Total (with GST)'), '₹ ' + fmt(amt + g), true));
      } else {
        var base = amt * 100 / (100 + r), gg = amt - base;
        show(row(S('total', 'Total (with GST)'), '₹ ' + fmt(amt)) + row('GST (' + fmt(r) + '%)', '₹ ' + fmt(gg)) + row(S('base', 'Base amount'), '₹ ' + fmt(base), true));
      }
    },
    discount: function () {
      var mrp = num('mrp'), d = num('d');
      if (isNaN(mrp) || isNaN(d) || mrp < 0) return err(S('fill', 'Please fill the price and discount.'));
      var saved = mrp * d / 100;
      show(row(S('final', 'Final price'), '₹ ' + fmt(mrp - saved), true) + row(S('saved', 'You save'), '₹ ' + fmt(saved)) + row(S('mrp', 'Original price'), '₹ ' + fmt(mrp)));
    },
    datediff: function () {
      var from = val('from'), to = val('to');
      if (!from || !to) return err(S('needDates', 'Please choose both dates.'));
      var a = new Date(from), b = new Date(to);
      if (isNaN(a) || isNaN(b)) return err(S('badDate', 'Please enter valid dates.'));
      if (b < a) { var t = a; a = b; b = t; }
      var days = Math.round((b - a) / 86400000);
      var y = b.getFullYear() - a.getFullYear(), mo = b.getMonth() - a.getMonth(), d = b.getDate() - a.getDate();
      if (d < 0) { mo -= 1; d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); }
      if (mo < 0) { y -= 1; mo += 12; }
      show(
        row(S('total', 'Total difference'), y + ' ' + S('years', 'yr') + ', ' + mo + ' ' + S('months', 'mo') + ', ' + d + ' ' + S('days', 'days'), true) +
        row(S('inDays', 'In days'), fmt(days, 0)) +
        row(S('inWeeks', 'In weeks'), fmt(Math.floor(days / 7), 0) + ' + ' + (days % 7) + ' ' + S('days', 'days'))
      );
    },
    bmi: function () {
      var w = num('w'), h = num('h'), unit = val('hunit') || 'cm';
      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return err(S('fill', 'Please enter weight and height.'));
      var m = unit === 'cm' ? h / 100 : (unit === 'ft' ? h * 0.3048 : h);
      var bmi = w / (m * m);
      var cat = bmi < 18.5 ? S('under', 'Underweight') : bmi < 25 ? S('normal', 'Normal') : bmi < 30 ? S('over', 'Overweight') : S('obese', 'Obese');
      show(
        row('BMI', '<b>' + fmt(bmi, 1) + '</b>', true) +
        row(S('category', 'Category'), cat) +
        '<p class="calc-note">' + S('healthy', 'A BMI of 18.5–24.9 is usually considered healthy for adults.') + '</p>'
      );
    }
  };

  function run() { if (calc[type]) calc[type](); }
  form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
  form.addEventListener('input', function () { if (out && !out.hidden) run(); });
  // Prefill "age on" with today
  var onEl = form.elements['on'];
  if (onEl && !onEl.value) onEl.value = new Date().toISOString().slice(0, 10);
})();
