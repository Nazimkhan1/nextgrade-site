/**
 * Ramzan 2027 Sehri & Iftar time tables per city (27 Nov 2026, traffic research #1).
 * Times are calculated, not copied: Sehri ends at Subah Sadiq = Fajr with the sun 18° below the horizon
 * (University of Islamic Sciences, Karachi — the convention most Indian time tables use); Iftar = sunset
 * (upper limb, refraction 0.833°). Same NOAA solar formulas as src/sun.mjs (±1–2 min; more in the hills).
 * Ramzan 1448 is expected to start in India on about 9 Feb 2027 (moon sighting can move it a day), Eid ~10–11 Mar.
 * Pages: /ramzan/ (hub) + /ramzan/<city>/ for the 200 biggest cities; hi + en, bn for Bengal/NE + big cities.
 * Every page tells readers to follow their local masjid. Go live by early–mid Dec so Google has time before Feb.
 */
import { CITIES } from './weather-cities.mjs';
import { BIG } from './weather-extra.mjs';
import { cityName, stateName } from './weather.mjs';

const RAD = Math.PI / 180;
export function sunAt(lat, lon, ymd, alt) {
  const d = new Date(`${ymd}T12:00:00Z`), doy = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5), g = (2 * Math.PI / 365) * (doy - 1);
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const cosH = (Math.sin(alt * RAD) - Math.sin(lat * RAD) * Math.sin(decl)) / (Math.cos(lat * RAD) * Math.cos(decl));
  if (cosH > 1 || cosH < -1) return null;
  const ha = Math.acos(cosH) / RAD;
  return [Math.round(720 - 4 * (lon + ha) - eqt + 330), Math.round(720 - 4 * (lon - ha) - eqt + 330)];
}
const hm = (m) => { const h = Math.floor(m / 60), mm = m % 60; return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
const START = '2027-02-09', DAYS = 30; // expected first roza in India
const addD = (ymd, n) => new Date(Date.parse(`${ymd}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
export const RZ_CITIES = [...CITIES].sort((a, b) => b.pop - a.pop).slice(0, 200);
const BN_ST = new Set(['West Bengal', 'Assam', 'Tripura', 'Jharkhand', 'Meghalaya', 'Bihar']);
export const rzLangs = (c) => ['hi', 'en', ...(BN_ST.has(c.state) || BIG.includes(c.slug) ? ['bn'] : [])];
const km = (a, b) => { const x = (b.lon - a.lon) * RAD * Math.cos(((a.lat + b.lat) / 2) * RAD), y = (b.lat - a.lat) * RAD; return 6371 * Math.hypot(x, y); };
export function table(c) {
  return Array.from({ length: DAYS }, (_, i) => { const d = addD(START, i), f = sunAt(c.lat, c.lon, d, -18), s = sunAt(c.lat, c.lon, d, -0.833); return { n: i + 1, d, sehri: f && f[0], iftar: s && s[1] }; });
}
const LOC = { hi: 'hi-IN', en: 'en-IN', bn: 'bn-IN' };
const dLabel = (code, ymd) => new Intl.DateTimeFormat(LOC[code], { day: 'numeric', month: 'short', weekday: 'short', timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
const D = (code, s) => (code === 'bn' ? String(s).replace(/\d/g, (x) => '০১২৩৪৫৬৭৮৯'[x]) : String(s));

const bG = (n) => (/[া-ৌ]$/.test(n) ? `${n}র` : `${n}-এর`), bL = (n) => (/া$/.test(n) ? `${n}য়` : /[ি-ৌ]$/.test(n) ? `${n}তে` : `${n}-এ`);
const TX = {
  hi: {
    nav: 'रमज़ान 2027', hubT: 'रमज़ान 2027 सेहरी-इफ़्तार टाइम टेबल — भारत के 200 शहर | NextGrade', hubD: 'रमज़ान 2027 (लगभग 9 फ़रवरी से) का सेहरी और इफ़्तार टाइम टेबल — दिल्ली, मुंबई, कोलकाता, हैदराबाद, लखनऊ समेत 200 शहरों के लिए, पूरे 30 रोज़ों का।',
    hubH: '🌙 रमज़ान 2027 सेहरी-इफ़्तार टाइम टेबल', hubL: 'अपना शहर चुनें — पूरे महीने का सेहरी (सुबह-ए-सादिक़) और इफ़्तार (सूर्यास्त) का समय देखें।', search: 'शहर का नाम लिखें…', byState: 'राज्य के हिसाब से शहर',
    t: (n) => `${n} सेहरी इफ़्तार टाइम टेबल 2027 — रमज़ान कैलेंडर (30 रोज़े) | NextGrade`,
    d: (n, s, i) => `${n} में रमज़ान 2027 का सेहरी और इफ़्तार समय: पहले रोज़े (9 फ़रवरी) पर सेहरी ${s} तक, इफ़्तार ${i}। पूरे 30 रोज़ों की टाइम टेबल, दुआ और ज़रूरी बातें।`,
    h1: (n) => `${n} सेहरी-इफ़्तार टाइम टेबल — रमज़ान 2027`,
    ans: (n, s, i, se, ie) => `${n} में रमज़ान 2027 के पहले रोज़े (लगभग 9 फ़रवरी) पर सेहरी का आख़िरी वक़्त ${s} और इफ़्तार ${i} है। आख़िरी रोज़े तक सेहरी ${se} और इफ़्तार ${ie} हो जाएगा।`,
    today: 'आज', cols: ['रोज़ा', 'तारीख़', 'सेहरी ख़त्म', 'इफ़्तार'],
    noteT: 'सेहरी = सुबह-ए-सादिक़ (फ़ज्र, सूरज क्षितिज से 18° नीचे); इफ़्तार = सूर्यास्त। एहतियात के लिए सेहरी 3–5 मिनट पहले ख़त्म करें। समय हिसाब से निकाले गए हैं (±1–2 मिनट) — अपनी मस्जिद या स्थानीय कमेटी के एलान को ही मानें। रमज़ान की शुरुआत चाँद दिखने पर एक दिन आगे-पीछे हो सकती है।',
    longH: (n) => `${n} में रोज़ा कितने घंटे का होगा`, long: (n, a, b) => `पहले रोज़े पर लगभग ${a} और आख़िरी रोज़े पर लगभग ${b} — फ़रवरी से मार्च में दिन लंबे होते जाते हैं, इसलिए सेहरी जल्दी और इफ़्तार देर से होता जाता है।`,
    cmpH: 'पास के शहरों से फ़र्क़', cmp: (n, o, m) => m === 0 ? `${o} और ${n} में इफ़्तार लगभग एक ही समय होता है।` : `${o} में इफ़्तार ${n} से लगभग ${Math.abs(m)} मिनट ${m > 0 ? 'बाद' : 'पहले'} होता है।`,
    duaH: 'सेहरी और इफ़्तार की दुआ', duaS: 'रोज़े की नीयत (सेहरी): व बि-सौमि ग़दिन नवैतु मिन शहरि रमज़ान — "मैंने कल के रमज़ान के रोज़े की नीयत की।"', duaI: 'इफ़्तार की दुआ: अल्लाहुम्मा इन्नी लका सुम्तु व बिका आमन्तु व अलैका तवक्कल्तु व अला रिज़्क़िका अफ़्तर्तु — "ऐ अल्लाह, मैंने तेरे लिए रोज़ा रखा, तुझ पर ईमान लाया, तुझ पर भरोसा किया और तेरे दिए रिज़्क़ से इफ़्तार किया।"',
    tipsH: 'रोज़े में सेहत के लिए', tips: ['सेहरी न छोड़ें — दलिया, अंडा, दही, केला जैसी देर तक पेट भरने वाली चीज़ें खाएँ।', 'इफ़्तार खजूर और पानी से शुरू करें, फिर धीरे-धीरे खाएँ; बहुत तला-भुना कम रखें।', 'इफ़्तार से सेहरी के बीच 8–10 गिलास पानी पिएँ। डायबिटीज़, BP या गर्भावस्था में रोज़े से पहले डॉक्टर से सलाह लें।'],
    eidH: 'ईद-उल-फ़ित्र 2027', eid: 'रमज़ान के 29 या 30 रोज़ों के बाद चाँद दिखने पर ईद-उल-फ़ित्र होगी — भारत में लगभग 10 या 11 मार्च 2027।', eidLink: 'ईद मुबारक की शुभकामनाएँ →', cal: 'आज की इस्लामी तारीख़ →', near: 'दूसरे शहर',
  },
  en: {
    nav: 'Ramzan 2027', hubT: 'Ramzan 2027 Sehri & Iftar Time Table — 200 Indian Cities | NextGrade', hubD: 'Ramadan 2027 (from about 9 February) Sehri and Iftar time table for 200 Indian cities — Delhi, Mumbai, Kolkata, Hyderabad, Lucknow and more — for all 30 fasts.',
    hubH: '🌙 Ramzan 2027 Sehri & Iftar Time Table', hubL: 'Pick your city to see the Sehri (Subah Sadiq) and Iftar (sunset) times for the whole month.', search: 'Type a city name…', byState: 'Cities by state',
    t: (n) => `${n} Sehri Iftar Time Table 2027 — Ramadan Calendar (30 Rozas) | NextGrade`,
    d: (n, s, i) => `Ramadan 2027 Sehri and Iftar times for ${n}: on the first roza (9 Feb) Sehri ends at ${s}, Iftar at ${i}. Full 30-day time table, duas and tips.`,
    h1: (n) => `${n} Sehri & Iftar Time Table — Ramzan 2027`,
    ans: (n, s, i, se, ie) => `In ${n}, on the first roza of Ramzan 2027 (about 9 February), Sehri ends at ${s} and Iftar is at ${i}. By the last roza, Sehri ends at ${se} and Iftar is at ${ie}.`,
    today: 'Today', cols: ['Roza', 'Date', 'Sehri ends', 'Iftar'],
    noteT: 'Sehri = Subah Sadiq (Fajr, sun 18° below the horizon); Iftar = sunset. As a precaution, finish Sehri 3–5 minutes earlier. Times are calculated (±1–2 min) — always follow your local masjid or committee. The start of Ramzan can shift by a day with the moon sighting.',
    longH: (n) => `How long is the fast in ${n}`, long: (n, a, b) => `About ${a} on the first roza and ${b} on the last — days get longer from February to March, so Sehri gets earlier and Iftar later.`,
    cmpH: 'Difference from nearby cities', cmp: (n, o, m) => m === 0 ? `Iftar in ${o} is at about the same time as in ${n}.` : `Iftar in ${o} is about ${Math.abs(m)} minutes ${m > 0 ? 'later' : 'earlier'} than in ${n}.`,
    duaH: 'Sehri and Iftar dua', duaS: 'Intention for the fast (Sehri): Wa bi-sawmi ghadin nawaitu min shahri Ramadan — “I intend to keep tomorrow’s fast of Ramadan.”', duaI: 'Iftar dua: Allahumma inni laka sumtu wa bika aamantu wa alaika tawakkaltu wa ala rizqika aftartu — “O Allah, I fasted for You, believed in You, put my trust in You and break my fast with Your provision.”',
    tipsH: 'Staying healthy while fasting', tips: ['Don’t skip Sehri — eat slow foods like oats, eggs, curd and bananas.', 'Open the fast with dates and water, then eat slowly; keep fried food low.', 'Drink 8–10 glasses of water between Iftar and Sehri. With diabetes, BP or pregnancy, ask your doctor before fasting.'],
    eidH: 'Eid ul-Fitr 2027', eid: 'After 29 or 30 fasts, Eid ul-Fitr comes with the moon sighting — in India around 10 or 11 March 2027.', eidLink: 'Eid Mubarak wishes →', cal: 'Today’s Islamic date →', near: 'Other cities',
  },
  bn: {
    nav: 'রমজান ২০২৭', hubT: 'রমজান ২০২৭ সেহরি ও ইফতারের সময়সূচি — ভারতের ২০০ শহর | NextGrade', hubD: 'রমজান ২০২৭ (প্রায় ৯ ফেব্রুয়ারি থেকে) সেহরি আর ইফতারের সময়সূচি — কলকাতা, দিল্লি, মুম্বই, গুয়াহাটি সহ ২০০ শহরের, পুরো ৩০ রোজার।',
    hubH: '🌙 রমজান ২০২৭ সেহরি ও ইফতারের সময়সূচি', hubL: 'আপনার শহর বেছে নিন — পুরো মাসের সেহরি (সুবহে সাদিক) আর ইফতার (সূর্যাস্ত) দেখুন।', search: 'শহরের নাম লিখুন…', byState: 'রাজ্য অনুযায়ী শহর',
    t: (n) => `${n} সেহরি ইফতারের সময়সূচি ২০২৭ — রমজান ক্যালেন্ডার (৩০ রোজা) | NextGrade`,
    d: (n, s, i) => `${bL(n)} রমজান ২০২৭-এর সেহরি আর ইফতারের সময়: প্রথম রোজায় (৯ ফেব্রুয়ারি) সেহরি ${s} পর্যন্ত, ইফতার ${i}। পুরো ৩০ দিনের সময়সূচি, দোয়া আর জরুরি কথা।`,
    h1: (n) => `${n} সেহরি ও ইফতারের সময়সূচি — রমজান ২০২৭`,
    ans: (n, s, i, se, ie) => `${bL(n)} রমজান ২০২৭-এর প্রথম রোজায় (প্রায় ৯ ফেব্রুয়ারি) সেহরির শেষ সময় ${s}, ইফতার ${i}। শেষ রোজায় সেহরি ${se}, ইফতার ${ie}।`,
    today: 'আজ', cols: ['রোজা', 'তারিখ', 'সেহরি শেষ', 'ইফতার'],
    noteT: 'সেহরি = সুবহে সাদিক (ফজর, সূর্য দিগন্তের ১৮° নিচে); ইফতার = সূর্যাস্ত। সাবধানতার জন্য ৩–৫ মিনিট আগে সেহরি শেষ করুন। সময় হিসাব করে বের করা (±১–২ মিনিট) — স্থানীয় মসজিদ বা কমিটির ঘোষণাই মানুন। চাঁদ দেখার ওপর রমজান এক দিন আগে-পরে হতে পারে।',
    longH: (n) => `${bL(n)} রোজা কত ঘণ্টার`, long: (n, a, b) => `প্রথম রোজায় প্রায় ${a}, শেষ রোজায় প্রায় ${b} — ফেব্রুয়ারি থেকে মার্চে দিন বড় হয়, তাই সেহরি আগে আর ইফতার পরে হতে থাকে।`,
    cmpH: 'কাছের শহরের সঙ্গে তফাত', cmp: (n, o, m) => m === 0 ? `${bL(o)} আর ${bL(n)} ইফতার প্রায় একই সময়ে।` : `${bL(o)} ইফতার ${bG(n)} চেয়ে প্রায় ${D('bn', Math.abs(m))} মিনিট ${m > 0 ? 'পরে' : 'আগে'}।`,
    duaH: 'সেহরি আর ইফতারের দোয়া', duaS: 'রোজার নিয়ত (সেহরি): ওয়া বিসাওমি গাদিন নাওয়াইতু মিন শাহরি রমাদান — "আমি আগামীকাল রমজানের রোজার নিয়ত করলাম।"', duaI: 'ইফতারের দোয়া: আল্লাহুম্মা ইন্নি লাকা সুমতু ওয়া বিকা আমানতু ওয়া আলাইকা তাওয়াক্কালতু ওয়া আলা রিজকিকা আফতারতু — "হে আল্লাহ, তোমার জন্য রোজা রেখেছি, তোমার ওপর ঈমান এনেছি, তোমার ওপর ভরসা করেছি আর তোমার দেওয়া রিজিকে ইফতার করছি।"',
    tipsH: 'রোজায় সুস্থ থাকতে', tips: ['সেহরি বাদ দেবেন না — ওটস, ডিম, দই, কলার মতো অনেকক্ষণ পেট ভরা রাখে এমন খাবার খান।', 'খেজুর আর জল দিয়ে ইফতার শুরু করুন, তারপর ধীরে খান; ভাজাভুজি কম।', 'ইফতার থেকে সেহরির মধ্যে ৮–১০ গ্লাস জল খান। ডায়াবেটিস, প্রেশার বা গর্ভাবস্থায় রোজার আগে ডাক্তারের পরামর্শ নিন।'],
    eidH: 'ঈদ-উল-ফিতর ২০২৭', eid: '২৯ বা ৩০ রোজার পর চাঁদ দেখা গেলে ঈদ-উল-ফিতর — ভারতে প্রায় ১০ বা ১১ মার্চ ২০২৭।', eidLink: 'ঈদ মোবারকের শুভেচ্ছা →', cal: 'আজকের ইসলামি তারিখ →', near: 'অন্য শহর',
  },
};
const dur = (code, m) => { const h = Math.floor(m / 60), mm = m % 60; return code === 'hi' ? `${h} घंटे ${mm} मिनट` : code === 'bn' ? `${D('bn', h)} ঘণ্টা ${D('bn', mm)} মিনিট` : `${h} h ${mm} min`; };

export function buildRamzan(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code; if (!TX[code]) return;
  const X = TX[code], hub = '/ramzan/', nm = (c) => cityName(code, c);
  const css = '<style>.tx-ans{font-size:1.12rem;padding:14px 16px;border-radius:14px;background:rgba(47,158,68,.12);margin:12px 0}.rz-t{width:100%;border-collapse:collapse}.rz-t td,.rz-t th{padding:7px 8px;border-bottom:1px solid var(--line);font-size:15px;text-align:left}.rz-t tr.today{background:rgba(245,159,0,.18);font-weight:700}.rz-s input{width:100%;padding:.7rem;font-size:1.05rem;border:1px solid var(--line);border-radius:12px}</style>';
  const today = `<script>(function(){var t=new Date(Date.now()+19800000).toISOString().slice(0,10),r=document.querySelector('tr[data-d="'+t+'"]');if(r){r.className='today';var l=document.getElementById('rz-lab');if(l)l.textContent=${JSON.stringify(X.today)}+': '+r.children[2].textContent+' / '+r.children[3].textContent;}})();</script>`;
  const cities = RZ_CITIES.filter((c) => rzLangs(c).includes(code));
  const altFor = (c) => LANGS.filter((l) => rzLangs(c).includes(l.code));
  // hub (hi, en, bn)
  const states = [...new Set(cities.map((c) => c.state))].sort((a, b) => stateName(code, a).localeCompare(stateName(code, b), LOC[code]));
  write(L, hub, page(L, {
    path: hub, title: X.hubT, description: X.hubD, langs: LANGS.filter((l) => TX[l.code]),
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p><h1>${esc(X.hubH)}</h1><p class="lead">${esc(X.hubL)}</p>
<div class="rz-s"><input id="rz-q" type="search" list="rz-dl" placeholder="${esc(X.search)}" aria-label="${esc(X.search)}"></div><datalist id="rz-dl">${cities.map((c) => `<option value="${esc(nm(c))}">`).join('')}</datalist>
<script>(function(){var m=${JSON.stringify(Object.fromEntries(cities.map((c) => [nm(c), P(L, `${hub}${c.slug}/`)])))},q=document.getElementById('rz-q');q.addEventListener('change',function(){if(m[q.value])location.href=m[q.value];});})();</script>
<p class="chips">${cities.filter((c) => BIG.includes(c.slug)).map((c) => `<a class="tag" href="${P(L, `${hub}${c.slug}/`)}">${esc(nm(c))}</a>`).join(' ')}</p><p class="chips"><a class="tag" href="${P(L, '/dua/roza-ki-dua/')}">🤲 ${esc({ hi: 'रोज़े की नीयत और इफ़्तार की दुआ', en: 'Roza niyat and iftar dua', bn: 'রোজার নিয়ত ও ইফতারের দোয়া' }[code])}</a> <a class="tag" href="${P(L, '/dua/')}">📖 ${esc({ hi: 'सभी दुआएँ', en: 'All duas', bn: 'সব দোয়া' }[code])}</a></p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.byState)}</h2>${states.map((s) => `<h3>${esc(stateName(code, s))}</h3><p class="chips">${cities.filter((c) => c.state === s).map((c) => `<a class="tag" href="${P(L, `${hub}${c.slug}/`)}">${esc(nm(c))}</a>`).join(' ')}</p>`).join('')}
<p class="note">${esc(X.noteT)}</p><h2>${esc(X.eidH)}</h2><p>${esc(X.eid)}</p></div>`,
  }));
  for (const c of cities) {
    const n = nm(c), path = `${hub}${c.slug}/`, tb = table(c), f = tb[0], l = tb[tb.length - 1];
    const near = RZ_CITIES.filter((x) => x !== c && rzLangs(x).includes(code)).map((x) => [km(c, x), x]).sort((a, b) => a[0] - b[0]).slice(0, 5).map(([, x]) => x);
    const cmp = near.slice(0, 3).map((o) => X.cmp(n, nm(o), table(o)[0].iftar - f.iftar));
    const rows = tb.map((r) => `<tr data-d="${r.d}"><td>${D(code, r.n)}</td><td>${esc(dLabel(code, r.d))}</td><td>${r.sehri ? hm(r.sehri) : '—'}</td><td>${r.iftar ? hm(r.iftar) : '—'}</td></tr>`).join('');
    write(L, path, page(L, {
      path, title: X.t(n), description: X.d(n, hm(f.sehri), hm(f.iftar)), langs: altFor(c),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [n, path]])],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(n)}</p>
<h1>🌙 ${esc(X.h1(n))}</h1>
<p class="tx-ans">${esc(X.ans(n, hm(f.sehri), hm(f.iftar), hm(l.sehri), hm(l.iftar)))}</p><p id="rz-lab" class="lead"></p>
<div class="table-wrap"><table class="rz-t"><tr>${X.cols.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${rows}</table></div>${today}
<p class="note">${esc(X.noteT)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.longH(n))}</h2><p>${esc(X.long(n, dur(code, f.iftar - f.sehri), dur(code, l.iftar - l.sehri)))}</p>
<h2>${esc(X.cmpH)}</h2><ul>${cmp.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(X.duaH)}</h2><p>${esc(X.duaS)}</p><p>${esc(X.duaI)}</p>
<h2>${esc(X.tipsH)}</h2><ul>${X.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(X.eidH)}</h2><p>${esc(X.eid)} <a href="${P(L, '/islamic-calendar/')}">${esc(X.cal)}</a></p>
<h2>${esc(X.near)}</h2><p class="chips">${near.map((o) => `<a class="tag" href="${P(L, `${hub}${o.slug}/`)}">${esc(nm(o))}</a>`).join(' ')} <a class="tag" href="${P(L, hub)}">${esc(X.nav)} →</a> <a class="tag" href="${P(L, '/dua/roza-ki-dua/')}">🤲 ${esc({ hi: 'सेहरी-इफ़्तार की दुआ', en: 'Sehri & iftar dua', bn: 'সেহরি-ইফতারের দোয়া' }[code])}</a></p></div>`,
    }));
  }
}
