/**
 * Namaz (prayer) times per city (27 Nov 2026, traffic research #2). Calculated, not copied:
 *   Fajr = sun 18° below the horizon, Isha = 18° (University of Islamic Sciences, Karachi — common in India);
 *   Sunrise/Maghrib = upper limb with 0.833° refraction; Zuhr = solar noon + 2 min; Asr = shadow length
 *   1× (Shafi, Maliki, Hanbali) or 2× (Hanafi — most Indian masjids) the object plus its noon shadow.
 * The page shows the next 30 days from the build date (the daily release rebuilds it) and a small script
 * recalculates "today" in the browser, so the top box is right even between builds. Qibla bearing per city.
 * Same 200 cities and languages as /ramzan/ (hi, en; bn for Bengal/NE/Bihar/Jharkhand + big cities).
 */
import { RZ_CITIES, rzLangs } from './ramzan.mjs';
import { BIG } from './weather-extra.mjs';
import { cityName, stateName } from './weather.mjs';

const RAD = Math.PI / 180;
// one function used both here (build) and in the page (browser): returns minutes after midnight IST
const CALC = `function nzT(lat,lon,ymd){var R=Math.PI/180,d=new Date(ymd+'T12:00:00Z'),doy=Math.floor((d-Date.UTC(d.getUTCFullYear(),0,0))/864e5),g=2*Math.PI/365*(doy-1);
var eqt=229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g));
var de=0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g);
var noon=720-4*lon-eqt+330;function ha(alt){var c=(Math.sin(alt*R)-Math.sin(lat*R)*Math.sin(de))/(Math.cos(lat*R)*Math.cos(de));return c>1||c<-1?null:Math.acos(c)/R*4;}
function asr(f){var a=Math.atan(1/(f+Math.tan(Math.abs(lat*R-de))))/R;var h=ha(a);return h==null?null:noon+h;}
var r=function(x){return x==null?null:Math.round(x);};var f=ha(-18),s=ha(-0.833),i=ha(-18);
return {fajr:r(f==null?null:noon-f),sunrise:r(noon-s),zuhr:r(noon+2),asrS:r(asr(1)),asrH:r(asr(2)),maghrib:r(noon+s),isha:r(i==null?null:noon+i)};}`;
// eslint-disable-next-line no-new-func
const nzT = new Function(`${CALC}; return nzT;`)();
const hm = (m) => { if (m == null) return '—'; const h = Math.floor(m / 60), mm = m % 60; return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
const todayIST = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const addD = (ymd, n) => new Date(Date.parse(`${ymd}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const qibla = (lat, lon) => { const k = [21.4225 * RAD, 39.8262 * RAD], p = lat * RAD, dl = k[1] - lon * RAD; return (Math.atan2(Math.sin(dl), Math.cos(p) * Math.tan(k[0]) - Math.sin(p) * Math.cos(dl)) / RAD + 360) % 360; };
const kmTo = (lat, lon) => { const p1 = lat * RAD, p2 = 21.4225 * RAD, dp = p2 - p1, dl = (39.8262 - lon) * RAD, a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); };
const LOC = { hi: 'hi-IN', en: 'en-IN', bn: 'bn-IN' };
const dLabel = (code, ymd) => new Intl.DateTimeFormat(LOC[code], { day: 'numeric', month: 'short', weekday: 'short', timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
const bG = (n) => (/[া-ৌ]$/.test(n) ? `${n}র` : `${n}-এর`), bL = (n) => (/া$/.test(n) ? `${n}য়` : /[ি-ৌ]$/.test(n) ? `${n}তে` : `${n}-এ`);

const TX = {
  hi: {
    nav: 'नमाज़ का समय', names: ['फ़ज्र', 'सूर्योदय', 'ज़ुहर', 'अस्र (हनफ़ी)', 'मग़रिब', 'इशा'], asrS: 'अस्र (शाफ़ई)',
    hubT: 'आज का नमाज़ का समय — भारत के 200 शहर (फ़ज्र, ज़ुहर, अस्र, मग़रिब, इशा) | NextGrade', hubD: 'भारत के 200 शहरों में आज का नमाज़ का समय — फ़ज्र, सूर्योदय, ज़ुहर, अस्र (हनफ़ी/शाफ़ई), मग़रिब और इशा, पूरे महीने की टेबल और क़िबला की दिशा।',
    hubH: '🕌 आज का नमाज़ का समय', hubL: 'अपना शहर चुनें — आज और अगले 30 दिनों का नमाज़ का समय और क़िबला की दिशा देखें।', search: 'शहर का नाम लिखें…', byState: 'राज्य के हिसाब से शहर',
    t: (n) => `${n} में आज का नमाज़ का समय — फ़ज्र, ज़ुहर, अस्र, मग़रिब, इशा | NextGrade`,
    d: (n, f, m) => `${n} में आज का नमाज़ का समय: फ़ज्र ${f}, मग़रिब ${m}। ज़ुहर, अस्र (हनफ़ी और शाफ़ई), इशा, पूरे महीने की टेबल और ${n} से क़िबला की दिशा।`,
    h1: (n) => `${n} में नमाज़ का समय`, todayH: 'आज', monthH: 'अगले 30 दिन', date: 'तारीख़',
    note: 'समय हिसाब से निकाले गए हैं (फ़ज्र और इशा 18°, कराची तरीक़ा — भारत में आम), ±1–2 मिनट। हनफ़ी अस्र ज़्यादातर भारतीय मस्जिदों में माना जाता है। जमाअत का समय अपनी मस्जिद से ही देखें।',
    qH: (n) => `${n} से क़िबला की दिशा`, q: (n, b, k) => `${n} से क़िबला (काबा, मक्का) लगभग ${b}° की दिशा में है — यानी उत्तर से घड़ी की सुई की दिशा में ${b}°, लगभग पश्चिम की ओर। मक्का यहाँ से लगभग ${k} किमी दूर है। फ़ोन के कंपास से दिशा मिलाते समय उसे लोहे या चुंबक से दूर रखें।`,
    jH: 'जुमा की नमाज़', j: (z) => `जुमा की नमाज़ ज़ुहर के वक़्त होती है — आज ज़ुहर ${z} से शुरू। ख़ुतबा और जमाअत का समय हर मस्जिद में अलग होता है।`,
    hH: 'हनफ़ी और शाफ़ई अस्र में फ़र्क़ क्यों', h: 'शाफ़ई (और मालिकी, हंबली) तरीक़े में अस्र तब शुरू होती है जब किसी चीज़ की छाया उसकी लंबाई के बराबर (दोपहर की छाया जोड़कर) हो जाए; हनफ़ी तरीक़े में जब छाया लंबाई की दोगुनी हो। इसलिए हनफ़ी अस्र लगभग 45–60 मिनट बाद होती है।',
    rz: '🌙 रमज़ान 2027 सेहरी-इफ़्तार टाइम टेबल →', near: 'दूसरे शहर',
  },
  en: {
    nav: 'Namaz time', names: ['Fajr', 'Sunrise', 'Zuhr', 'Asr (Hanafi)', 'Maghrib', 'Isha'], asrS: 'Asr (Shafi)',
    hubT: 'Namaz Time Today — 200 Indian Cities (Fajr, Zuhr, Asr, Maghrib, Isha) | NextGrade', hubD: 'Today’s prayer times for 200 Indian cities — Fajr, sunrise, Zuhr, Asr (Hanafi/Shafi), Maghrib and Isha, with a 30-day table and the Qibla direction.',
    hubH: '🕌 Namaz time today', hubL: 'Pick your city to see today’s and the next 30 days’ prayer times and the Qibla direction.', search: 'Type a city name…', byState: 'Cities by state',
    t: (n) => `Namaz Time in ${n} Today — Fajr, Zuhr, Asr, Maghrib, Isha | NextGrade`,
    d: (n, f, m) => `Prayer times in ${n} today: Fajr ${f}, Maghrib ${m}. Zuhr, Asr (Hanafi and Shafi), Isha, a 30-day table and the Qibla direction from ${n}.`,
    h1: (n) => `Namaz time in ${n}`, todayH: 'Today', monthH: 'Next 30 days', date: 'Date',
    note: 'Times are calculated (Fajr and Isha at 18°, Karachi method — common in India), ±1–2 min. Most Indian masjids follow the Hanafi Asr. Check your masjid for jamaat times.',
    qH: (n) => `Qibla direction from ${n}`, q: (n, b, k) => `From ${n} the Qibla (the Kaaba, Makkah) is at about ${b}° — that is ${b}° clockwise from north, roughly towards the west. Makkah is about ${k} km away. Keep your phone compass away from iron or magnets when you check.`,
    jH: 'Jumma prayer', j: (z) => `Jumma is prayed at Zuhr time — today Zuhr begins at ${z}. Khutba and jamaat times differ from masjid to masjid.`,
    hH: 'Why Hanafi and Shafi Asr differ', h: 'In the Shafi (and Maliki, Hanbali) view, Asr begins when an object’s shadow equals its length (plus its noon shadow); in the Hanafi view, when it is twice the length. So Hanafi Asr is about 45–60 minutes later.',
    rz: '🌙 Ramzan 2027 Sehri & Iftar time table →', near: 'Other cities',
  },
  bn: {
    nav: 'নামাজের সময়', names: ['ফজর', 'সূর্যোদয়', 'জোহর', 'আসর (হানাফি)', 'মাগরিব', 'এশা'], asrS: 'আসর (শাফেয়ি)',
    hubT: 'আজকের নামাজের সময় — ভারতের ২০০ শহর (ফজর, জোহর, আসর, মাগরিব, এশা) | NextGrade', hubD: 'ভারতের ২০০ শহরে আজকের নামাজের সময় — ফজর, সূর্যোদয়, জোহর, আসর (হানাফি/শাফেয়ি), মাগরিব আর এশা, ৩০ দিনের সময়সূচি আর কিবলার দিক।',
    hubH: '🕌 আজকের নামাজের সময়', hubL: 'আপনার শহর বেছে নিন — আজ আর পরের ৩০ দিনের নামাজের সময় আর কিবলার দিক দেখুন।', search: 'শহরের নাম লিখুন…', byState: 'রাজ্য অনুযায়ী শহর',
    t: (n) => `${bL(n)} আজকের নামাজের সময় — ফজর, জোহর, আসর, মাগরিব, এশা | NextGrade`,
    d: (n, f, m) => `${bL(n)} আজকের নামাজের সময়: ফজর ${f}, মাগরিব ${m}। জোহর, আসর (হানাফি আর শাফেয়ি), এশা, ৩০ দিনের সময়সূচি আর ${n} থেকে কিবলার দিক।`,
    h1: (n) => `${bL(n)} নামাজের সময়`, todayH: 'আজ', monthH: 'পরের ৩০ দিন', date: 'তারিখ',
    note: 'সময় হিসাব করে বের করা (ফজর আর এশা ১৮°, করাচি পদ্ধতি — ভারতে প্রচলিত), ±১–২ মিনিট। ভারতের বেশিরভাগ মসজিদে হানাফি আসর মানা হয়। জামাতের সময় নিজের মসজিদে জেনে নিন।',
    qH: (n) => `${n} থেকে কিবলার দিক`, q: (n, b, k) => `${n} থেকে কিবলা (কাবা, মক্কা) প্রায় ${b}° দিকে — অর্থাৎ উত্তর থেকে ঘড়ির কাঁটার দিকে ${b}°, মোটামুটি পশ্চিমে। মক্কা এখান থেকে প্রায় ${k} কিমি। ফোনের কম্পাস দেখার সময় লোহা বা চুম্বক থেকে দূরে রাখুন।`,
    jH: 'জুমার নামাজ', j: (z) => `জুমার নামাজ জোহরের সময়ে — আজ জোহর শুরু ${z}। খুতবা আর জামাতের সময় মসজিদভেদে আলাদা।`,
    hH: 'হানাফি আর শাফেয়ি আসরে তফাত কেন', h: 'শাফেয়ি (আর মালেকি, হাম্বলি) মতে কোনো জিনিসের ছায়া তার দৈর্ঘ্যের সমান (দুপুরের ছায়া যোগ করে) হলে আসর শুরু; হানাফি মতে ছায়া দ্বিগুণ হলে। তাই হানাফি আসর প্রায় ৪৫–৬০ মিনিট পরে।',
    rz: '🌙 রমজান ২০২৭ সেহরি-ইফতারের সময়সূচি →', near: 'অন্য শহর',
  },
};
const KEYS = ['fajr', 'sunrise', 'zuhr', 'asrH', 'maghrib', 'isha'];

export function buildNamaz(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code; if (!TX[code]) return;
  const X = TX[code], hub = '/namaz-time/', nm = (c) => cityName(code, c), today = todayIST();
  const D = (s) => (code === 'bn' ? String(s).replace(/\d/g, (x) => '০১২৩৪৫৬৭৮৯'[x]) : String(s));
  const css = '<style>.nz-now{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin:12px 0}.nz-now div{padding:12px;border-radius:14px;background:rgba(51,154,240,.12);text-align:center}.nz-now b{display:block;font-size:1.25rem}.nz-now .next{background:rgba(47,158,68,.2);outline:2px solid #2f9e44}.rz-t{width:100%;border-collapse:collapse}.rz-t td,.rz-t th{padding:6px 6px;border-bottom:1px solid var(--line);font-size:14px;text-align:left}.rz-t tr.today{background:rgba(245,159,0,.18);font-weight:700}.rz-s input{width:100%;padding:.7rem;font-size:1.05rem;border:1px solid var(--line);border-radius:12px}</style>';
  const cities = RZ_CITIES.filter((c) => rzLangs(c).includes(code));
  const states = [...new Set(cities.map((c) => c.state))].sort((a, b) => stateName(code, a).localeCompare(stateName(code, b), LOC[code]));
  write(L, hub, page(L, {
    path: hub, title: X.hubT, description: X.hubD, langs: LANGS.filter((l) => TX[l.code]), jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p><h1>${esc(X.hubH)}</h1><p class="lead">${esc(X.hubL)}</p>
<div class="rz-s"><input id="nz-q" type="search" list="nz-dl" placeholder="${esc(X.search)}" aria-label="${esc(X.search)}"></div><datalist id="nz-dl">${cities.map((c) => `<option value="${esc(nm(c))}">`).join('')}</datalist>
<script>(function(){var m=${JSON.stringify(Object.fromEntries(cities.map((c) => [nm(c), P(L, `${hub}${c.slug}/`)])))},q=document.getElementById('nz-q');q.addEventListener('change',function(){if(m[q.value])location.href=m[q.value];});})();</script>
<p class="chips">${cities.filter((c) => BIG.includes(c.slug)).map((c) => `<a class="tag" href="${P(L, `${hub}${c.slug}/`)}">${esc(nm(c))}</a>`).join(' ')}</p><p class="chips"><a class="tag" href="${P(L, '/dua/')}">🤲 ${esc({ hi: 'दुआएँ — आयतुल कुर्सी, सफ़र, सोने की दुआ', en: 'Duas — Ayatul Kursi, travel, sleeping', bn: 'দোয়া — আয়াতুল কুরসি, সফর, ঘুমের দোয়া' }[code])}</a></p><div class="ad" aria-hidden="true"></div>
<h2>${esc(X.byState)}</h2>${states.map((s) => `<h3>${esc(stateName(code, s))}</h3><p class="chips">${cities.filter((c) => c.state === s).map((c) => `<a class="tag" href="${P(L, `${hub}${c.slug}/`)}">${esc(nm(c))}</a>`).join(' ')}</p>`).join('')}
<p class="note">${esc(X.note)}</p><p><a href="${P(L, '/ramzan/')}">${esc(X.rz)}</a></p></div>`,
  }));
  for (const c of cities) {
    const n = nm(c), path = `${hub}${c.slug}/`, t0 = nzT(c.lat, c.lon, today);
    const days = Array.from({ length: 30 }, (_, i) => { const d = addD(today, i); return [d, nzT(c.lat, c.lon, d)]; });
    const q = Math.round(qibla(c.lat, c.lon)), k = Math.round(kmTo(c.lat, c.lon) / 10) * 10;
    const near = cities.filter((x) => x !== c).map((x) => [Math.hypot(x.lat - c.lat, (x.lon - c.lon) * Math.cos(c.lat * RAD)), x]).sort((a, b) => a[0] - b[0]).slice(0, 6).map(([, x]) => x);
    const now = `<div class="nz-now" id="nz-now">${KEYS.map((key, i) => `<div data-k="${key}"><span>${esc(X.names[i])}</span><b>${hm(t0[key])}</b></div>`).join('')}<div data-k="asrS"><span>${esc(X.asrS)}</span><b>${hm(t0.asrS)}</b></div></div>`;
    const live = `<script>(function(){${CALC}var t=new Date(Date.now()+19800000),y=t.toISOString().slice(0,10),r=nzT(${c.lat},${c.lon},y),m=t.getUTCHours()*60+t.getUTCMinutes(),nx=null;
function f(x){if(x==null)return'—';var h=Math.floor(x/60),mm=x%60;return((h+11)%12+1)+':'+(mm<10?'0':'')+mm+(h>=12?' PM':' AM');}
document.querySelectorAll('#nz-now div').forEach(function(d){var k=d.getAttribute('data-k');d.querySelector('b').textContent=f(r[k]);if(nx==null&&k!=='sunrise'&&k!=='asrS'&&r[k]>m){nx=d;}});if(nx)nx.className='next';
var row=document.querySelector('tr[data-d="'+y+'"]');if(row)row.className='today';})();</script>`;
    write(L, path, page(L, {
      path, title: X.t(n), description: X.d(n, hm(t0.fajr), hm(t0.maghrib)), langs: LANGS.filter((l) => rzLangs(c).includes(l.code)),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [n, path]])],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(n)}</p>
<h1>🕌 ${esc(X.h1(n))}</h1><h2>${esc(X.todayH)} — ${esc(dLabel(code, today))}</h2>${now}${live}
<p class="note">${esc(X.note)}</p><div class="ad" aria-hidden="true"></div>
<h2>${esc(X.monthH)}</h2><div class="table-wrap"><table class="rz-t"><tr><th>${esc(X.date)}</th>${KEYS.map((key, i) => `<th>${esc(X.names[i])}</th>`).join('')}</tr>${days.map(([d, r]) => `<tr data-d="${d}"><td>${esc(dLabel(code, d))}</td>${KEYS.map((key) => `<td>${hm(r[key])}</td>`).join('')}</tr>`).join('')}</table></div>
<h2>${esc(X.qH(n))}</h2><p>${esc(X.q(n, D(q), D(k.toLocaleString('en-IN'))))}</p>
<h2>${esc(X.jH)}</h2><p>${esc(X.j(hm(t0.zuhr)))}</p>
<h2>${esc(X.hH)}</h2><p>${esc(X.h)}</p>
<p><a class="btn btn-primary" href="${P(L, `/ramzan/${c.slug}/`)}">${esc(X.rz)}</a></p>
<h2>${esc(X.near)}</h2><p class="chips">${near.map((o) => `<a class="tag" href="${P(L, `${hub}${o.slug}/`)}">${esc(nm(o))}</a>`).join(' ')} <a class="tag" href="${P(L, hub)}">${esc(X.nav)} →</a> <a class="tag" href="${P(L, '/dua/')}">🤲 ${esc({ hi: 'दुआएँ अर्थ सहित', en: 'Duas with meaning', bn: 'দোয়া অর্থসহ' }[code])}</a></p></div>`,
    }));
  }
}
