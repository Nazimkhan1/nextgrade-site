/* Weather pages (/mausam/): live forecast from MET Norway (api.met.no, CC BY 4.0), cached 30 min in localStorage.
   City page: #wx[data-mode=city][data-lat][data-lon]. Hub: search + "near me" (nearest city from #wx-cities). */
(function () {
  var box = document.getElementById('wx');
  if (!box) return;
  var lang = box.dataset.lang || 'hi';
  var TX = {
    hi: { now: 'अभी', feels: 'महसूस', hum: 'नमी', wind: 'हवा', today: 'आज', tonight: 'आज रात', tom: 'कल', hours: 'अगले 24 घंटे', days: '10 दिन का मौसम', day: 'दिन', hi: 'अधिकतम', lo: 'न्यूनतम', rain: 'बारिश', load: 'मौसम लोड हो रहा है…', err: 'अभी मौसम नहीं मिल पाया। थोड़ी देर बाद फिर देखें।', upd: 'अपडेट', kmh: 'किमी/घं', mm: 'मिमी',
      umb: 'आज बारिश हो सकती है — छाता साथ रखें ☂️', noUmb: 'आज बारिश की संभावना कम है — छाते की ज़रूरत नहीं', tomRain: 'कल बारिश हो सकती है — कल के लिए छाता तैयार रखें ☂️', cold: 'सुबह-शाम ठंड रहेगी — गरम कपड़े पहनें 🧥', vcold: 'कड़ाके की ठंड — बच्चों और बुज़ुर्गों का ख़ास ध्यान रखें 🧣', hot: 'तेज़ गर्मी — पानी पीते रहें, दोपहर की धूप से बचें 🥤', fog: 'कोहरा हो सकता है — गाड़ी धीरे चलाएँ 🌫️', storm: 'आँधी-तूफ़ान/बिजली की संभावना — खुले में न रहें ⛈️', wind2: 'तेज़ हवा चलेगी 💨',
      sym: { clearsky: 'साफ़ आसमान', fair: 'ज़्यादातर साफ़', partlycloudy: 'हल्के बादल', cloudy: 'बादल', fog: 'कोहरा', lightrain: 'हल्की बारिश', rain: 'बारिश', heavyrain: 'तेज़ बारिश', thunder: 'गरज के साथ बारिश', snow: 'बर्फ़बारी', sleet: 'ओले/बर्फ़ के साथ बारिश' } },
    hinglish: { now: 'Abhi', feels: 'Mehsoos', hum: 'Nami', wind: 'Hawa', today: 'Aaj', tonight: 'Aaj raat', tom: 'Kal', hours: 'Agle 24 ghante', days: '10 din ka mausam', day: 'Din', hi: 'Max', lo: 'Min', rain: 'Baarish', load: 'Mausam load ho raha hai…', err: 'Abhi mausam nahi mil paaya. Thodi der baad phir dekhein.', upd: 'Update', kmh: 'km/h', mm: 'mm',
      umb: 'Aaj baarish ho sakti hai — chhata saath rakhein ☂️', noUmb: 'Aaj baarish ke chance kam hain — chhate ki zaroorat nahi', tomRain: 'Kal baarish ho sakti hai — chhata taiyaar rakhein ☂️', cold: 'Subah-shaam thand rahegi — garam kapde pehnein 🧥', vcold: 'Kadaake ki thand — bachchon aur buzurgon ka khaas dhyaan rakhein 🧣', hot: 'Tez garmi — paani peete rahein, dopahar ki dhoop se bachein 🥤', fog: 'Kohra ho sakta hai — gaadi dheere chalaayein 🌫️', storm: 'Aandhi-toofan/bijli ke chance — khule mein na rahein ⛈️', wind2: 'Tez hawa chalegi 💨',
      sym: { clearsky: 'Saaf aasmaan', fair: 'Zyaadatar saaf', partlycloudy: 'Halke baadal', cloudy: 'Baadal', fog: 'Kohra', lightrain: 'Halki baarish', rain: 'Baarish', heavyrain: 'Tez baarish', thunder: 'Garaj ke saath baarish', snow: 'Barfbaari', sleet: 'Barf ke saath baarish' } },
    en: { now: 'Now', feels: 'Feels like', hum: 'Humidity', wind: 'Wind', today: 'Today', tonight: 'Tonight', tom: 'Tomorrow', hours: 'Next 24 hours', days: '10-day forecast', day: 'Day', hi: 'High', lo: 'Low', rain: 'Rain', load: 'Loading the weather…', err: 'Could not load the weather right now. Please try again in a while.', upd: 'Updated', kmh: 'km/h', mm: 'mm',
      umb: 'Rain is likely today — take an umbrella ☂️', noUmb: 'Little chance of rain today — no umbrella needed', tomRain: 'Rain is likely tomorrow — keep an umbrella ready ☂️', cold: 'Cold mornings and evenings — wear warm clothes 🧥', vcold: 'Very cold — take extra care of children and elders 🧣', hot: 'Very hot — keep drinking water and avoid the afternoon sun 🥤', fog: 'Fog is possible — drive slowly 🌫️', storm: 'Thunderstorms and lightning are possible — stay indoors ⛈️', wind2: 'Strong winds expected 💨',
      sym: { clearsky: 'Clear sky', fair: 'Mostly clear', partlycloudy: 'Partly cloudy', cloudy: 'Cloudy', fog: 'Fog', lightrain: 'Light rain', rain: 'Rain', heavyrain: 'Heavy rain', thunder: 'Thunderstorm', snow: 'Snow', sleet: 'Sleet' } },
    bn: { now: 'এখন', feels: 'অনুভূত', hum: 'আর্দ্রতা', wind: 'হাওয়া', today: 'আজ', tonight: 'আজ রাতে', tom: 'কাল', hours: 'পরের ২৪ ঘণ্টা', days: '১০ দিনের পূর্বাভাস', day: 'দিন', hi: 'সর্বোচ্চ', lo: 'সর্বনিম্ন', rain: 'বৃষ্টি', load: 'আবহাওয়া লোড হচ্ছে…', err: 'এখন আবহাওয়া পাওয়া গেল না। একটু পরে আবার দেখুন।', upd: 'আপডেট', kmh: 'কিমি/ঘ', mm: 'মিমি',
      umb: 'আজ বৃষ্টি হতে পারে — ছাতা সঙ্গে রাখুন ☂️', noUmb: 'আজ বৃষ্টির সম্ভাবনা কম — ছাতা লাগবে না', tomRain: 'কাল বৃষ্টি হতে পারে — ছাতা তৈরি রাখুন ☂️', cold: 'সকাল-সন্ধ্যা ঠান্ডা থাকবে — গরম জামা পরুন 🧥', vcold: 'কনকনে ঠান্ডা — বাচ্চা আর বয়স্কদের বিশেষ খেয়াল রাখুন 🧣', hot: 'প্রচণ্ড গরম — জল খেতে থাকুন, দুপুরের রোদ এড়িয়ে চলুন 🥤', fog: 'কুয়াশা হতে পারে — গাড়ি আস্তে চালান 🌫️', storm: 'ঝড়-বজ্রপাতের সম্ভাবনা — খোলা জায়গায় থাকবেন না ⛈️', wind2: 'জোরে হাওয়া বইবে 💨',
      sym: { clearsky: 'পরিষ্কার আকাশ', fair: 'মোটামুটি পরিষ্কার', partlycloudy: 'হালকা মেঘ', cloudy: 'মেঘলা', fog: 'কুয়াশা', lightrain: 'হালকা বৃষ্টি', rain: 'বৃষ্টি', heavyrain: 'ভারী বৃষ্টি', thunder: 'বজ্রসহ বৃষ্টি', snow: 'তুষারপাত', sleet: 'শিলাবৃষ্টি' } },
  }[lang];
  var LOC = { hi: 'hi-IN', bn: 'bn-IN', en: 'en-IN', hinglish: 'en-IN' }[lang];
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // MET Norway symbol_code → [kind, emoji]
  function sym(code) {
    if (!code) return ['cloudy', '☁️'];
    var night = /_night/.test(code), b = code.replace(/_(day|night|polartwilight)$/, '');
    if (/thunder/.test(b)) return ['thunder', '⛈️'];
    if (/sleet/.test(b)) return ['sleet', '🌨️'];
    if (/snow/.test(b)) return ['snow', '❄️'];
    if (/heavyrain/.test(b)) return ['heavyrain', '🌧️'];
    if (/lightrain/.test(b)) return ['lightrain', '🌦️'];
    if (/rain/.test(b)) return ['rain', '🌧️'];
    if (b === 'fog') return ['fog', '🌫️'];
    if (b === 'cloudy') return ['cloudy', '☁️'];
    if (b === 'partlycloudy') return ['partlycloudy', night ? '☁️' : '⛅'];
    if (b === 'fair') return ['fair', night ? '🌙' : '🌤️'];
    return ['clearsky', night ? '🌙' : '☀️'];
  }
  var IST = 5.5 * 3600e3;
  var dayKey = function (t) { return new Date(Date.parse(t) + IST).toISOString().slice(0, 10); };
  var hourOf = function (t) { return new Date(Date.parse(t) + IST).getUTCHours(); };
  var fmtDay = function (k) { return new Intl.DateTimeFormat(LOC, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(k + 'T00:00:00Z')); };
  var fmtHour = function (t) { return new Intl.DateTimeFormat(LOC, { hour: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(t)); };
  var r = Math.round;

  function load(lat, lon) {
    var key = 'wx:' + lat + ',' + lon;
    try { var c = JSON.parse(localStorage.getItem(key) || 'null'); if (c && Date.now() - c.at < 30 * 60e3) return Promise.resolve(c.d); } catch (e) {}
    return fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon)
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function (d) { try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), d: d })); } catch (e) {} return d; });
  }

  function render(d) {
    var ts = d.properties.timeseries, now = ts[0], det = now.data.instant.details;
    var next = now.data.next_1_hours || now.data.next_6_hours || {};
    var s = sym(next.summary && next.summary.symbol_code);
    var feels = det.air_temperature;
    if (det.air_temperature >= 27 && det.relative_humidity >= 40) { var T = det.air_temperature, R = det.relative_humidity; feels = -8.78469 + 1.61139 * T + 2.33855 * R - 0.14612 * T * R - 0.01231 * T * T - 0.01642 * R * R + 0.00221 * T * T * R + 0.00073 * T * R * R - 0.0000036 * T * T * R * R; }
    else if (det.air_temperature <= 10 && det.wind_speed > 1.3) { var v = Math.pow(det.wind_speed * 3.6, 0.16); feels = 13.12 + 0.6215 * det.air_temperature - 11.37 * v + 0.3965 * det.air_temperature * v; }
    // group into IST days
    var days = {}, order = [];
    ts.forEach(function (x) {
      var k = dayKey(x.time), t = x.data.instant.details.air_temperature;
      if (!days[k]) { days[k] = { hi: -99, lo: 99, rain: 0, syms: [], wind: 0 }; order.push(k); }
      var D = days[k]; D.hi = Math.max(D.hi, t); D.lo = Math.min(D.lo, t); D.wind = Math.max(D.wind, x.data.instant.details.wind_speed || 0);
      var n1 = x.data.next_1_hours, n6 = x.data.next_6_hours;
      if (n1) { D.rain += n1.details.precipitation_amount || 0; D.hasHourly = true; if (n1.summary) D.syms.push(n1.summary.symbol_code); }
      else if (n6 && !D.hasHourly && hourOf(x.time) % 6 === 5) { D.rain += n6.details.precipitation_amount || 0; if (n6.summary) D.syms.push(n6.summary.symbol_code); }
      if (n6 && n6.summary && hourOf(x.time) >= 9 && hourOf(x.time) <= 11) D.mid = n6.summary.symbol_code;
    });
    var pickSym = function (D) {
      var kinds = D.syms.map(function (c) { return sym(c)[0]; });
      var pr = ['thunder', 'heavyrain', 'rain', 'lightrain', 'snow', 'sleet', 'fog'];
      for (var i = 0; i < pr.length; i++) if (kinds.indexOf(pr[i]) >= 0 && (pr[i] !== 'fog' || kinds.filter(function (k) { return k === 'fog'; }).length >= 2)) return sym(D.syms[kinds.indexOf(pr[i])]);
      return sym(D.mid || D.syms[Math.floor(D.syms.length / 2)]);
    };
    var daySym = function (D) { var y = pickSym(D); return [y[0], y[1] === '🌙' ? '☀️' : y[1]];
    };
    var today = days[order[0]], tom = days[order[1]];
    // the rest of today: from now on (fine for "will it rain today")
    var tips = [];
    var todayKinds = today.syms.map(function (c) { return sym(c)[0]; });
    if (todayKinds.indexOf('thunder') >= 0) tips.push(TX.storm);
    tips.push(today.rain >= 0.5 ? TX.umb : TX.noUmb);
    if (tom && tom.rain >= 1 && today.rain < 0.5) tips.push(TX.tomRain);
    if (today.lo <= 6) tips.push(TX.vcold); else if (today.lo <= 13) tips.push(TX.cold);
    if (today.hi >= 38) tips.push(TX.hot);
    if (todayKinds.indexOf('fog') >= 0 || (tom && tom.syms.slice(0, 10).some(function (c) { return sym(c)[0] === 'fog'; }))) tips.push(TX.fog);
    if (today.wind >= 10) tips.push(TX.wind2);

    var hours = ts.slice(0, 24).map(function (x) {
      var n = x.data.next_1_hours; var y = sym(n && n.summary && n.summary.symbol_code); var p = n ? n.details.precipitation_amount : 0;
      return '<div><span>' + esc(fmtHour(x.time)) + '</span><b>' + y[1] + '</b>' + r(x.data.instant.details.air_temperature) + '°' + (p > 0 ? '<br><small>' + p + ' ' + TX.mm + '</small>' : '') + '</div>';
    }).join('');
    var rows = order.slice(0, 10).map(function (k, i) {
      var D = days[k], y = i === 0 ? pickSym(D) : daySym(D);
      return '<tr><td>' + (i === 0 ? TX.today : i === 1 ? TX.tom : esc(fmtDay(k))) + '</td><td title="' + esc(TX.sym[y[0]]) + '">' + y[1] + ' <small>' + esc(TX.sym[y[0]]) + '</small></td><td><b>' + r(D.hi) + '°</b> / ' + r(D.lo) + '°</td><td>' + (D.rain >= 0.1 ? (Math.round(D.rain * 10) / 10) + ' ' + TX.mm : '—') + '</td></tr>';
    }).join('');
    var upd = new Intl.DateTimeFormat(LOC, { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date(d.properties.meta.updated_at));
    var ty = pickSym(today), tt = tom && daySym(tom), late = new Date(Date.now() + IST).getUTCHours() >= 17;
    box.innerHTML =
      '<div class="wx-now"><div class="wx-ico">' + s[1] + '</div><div><div class="wx-big">' + r(det.air_temperature) + '°C</div><div><b>' + esc(TX.sym[s[0]]) + '</b></div></div>' +
      '<div class="wx-sub">' + TX.feels + ': <b>' + r(feels) + '°C</b><br>' + TX.hum + ': <b>' + r(det.relative_humidity) + '%</b><br>' + TX.wind + ': <b>' + r(det.wind_speed * 3.6) + ' ' + TX.kmh + '</b></div></div>' +
      '<ul class="wx-tips">' + tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '<div class="facts"><div class="fact"><b>' + (late ? TX.tonight : TX.today) + '</b> ' + ty[1] + ' ' + r(today.hi) + '° / ' + r(today.lo) + '° · ' + TX.rain + ' ' + (Math.round(today.rain * 10) / 10) + ' ' + TX.mm + '</div>' +
      (tom ? '<div class="fact" id="kal"><b>' + TX.tom + '</b> ' + tt[1] + ' ' + esc(TX.sym[tt[0]]) + ' · ' + r(tom.hi) + '° / ' + r(tom.lo) + '° · ' + TX.rain + ' ' + (Math.round(tom.rain * 10) / 10) + ' ' + TX.mm + '</div>' : '') + '</div>' +
      '<h2>' + TX.hours + '</h2><div class="wx-hours">' + hours + '</div>' +
      '<h2>' + TX.days + '</h2><div class="table-wrap"><table class="wx-days"><tr><th>' + TX.day + '</th><th></th><th>' + TX.hi + ' / ' + TX.lo + '</th><th>' + TX.rain + '</th></tr>' + rows + '</table></div>' +
      '<p class="wx-src">' + TX.upd + ': ' + esc(upd) + ' · MET Norway</p>';
  }

  // highlight this month in the climate table
  var m = new Date(Date.now() + IST).getUTCMonth(), row = document.querySelector('.wx-clim tr[data-m="' + m + '"]');
  if (row) row.classList.add('cur');

  if (box.dataset.mode === 'city') {
    box.innerHTML = '<p class="note">' + TX.load + '</p>';
    load(box.dataset.lat, box.dataset.lon).then(render).catch(function () { box.innerHTML = '<p class="note">' + TX.err + '</p>'; });
    return;
  }

  // hub: search + near me
  var cities = JSON.parse(document.getElementById('wx-cities').textContent), base = box.dataset.base, msg = document.getElementById('wx-msg'), M = JSON.parse(box.dataset.msg);
  var q = document.getElementById('wx-q');
  var norm = function (s) { return String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').trim(); };
  var go = function () {
    var v = norm(q.value); if (!v) return;
    var hit = cities.find(function (c) { return norm(c[1]) === v || norm(c[2]) === v; }) || cities.find(function (c) { return norm(c[1]).indexOf(v) === 0 || norm(c[2]).indexOf(v) === 0; });
    if (hit) location.href = base + hit[0] + '/';
  };
  q.addEventListener('change', go);
  q.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  document.getElementById('wx-near').addEventListener('click', function () {
    msg.hidden = false; msg.textContent = M.wait;
    if (!navigator.geolocation) { msg.textContent = M.err; return; }
    navigator.geolocation.getCurrentPosition(function (p) {
      var la = p.coords.latitude, lo = p.coords.longitude, best = null, bd = 1e9;
      cities.forEach(function (c) { var d = Math.pow(c[3] - la, 2) + Math.pow((c[4] - lo) * Math.cos(la * Math.PI / 180), 2); if (d < bd) { bd = d; best = c; } });
      if (best) location.href = base + best[0] + '/'; else msg.textContent = M.err;
    }, function () { msg.textContent = M.err; }, { timeout: 10000, maximumAge: 600000 });
  });
})();
