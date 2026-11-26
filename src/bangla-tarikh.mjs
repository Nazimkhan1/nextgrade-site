/**
 * Aaj ki Bangla tarikh (plan R5, 26 Nov 2026).
 * West Bengal (panjika): a month starts on the day after the sidereal solar ingress (sankranti) in IST — the Bengal rule
 * ("before midnight → next day, after midnight → the day after", counted from sunrise) always lands on the civil day after
 * the ingress. Sun longitude from tithi.mjs (Meeus); Lahiri ayanamsa calibrated to Drik Panchang's 2026 ingress times
 * (Makara 14 Jan 15:13, Mesha 14 Apr 09:39). Checked: Pohela Boishakh 2023–2026 = 15, 14, 15, 15 April; 26 Nov 2026 = 10 Agrahayan 1433.
 * Bangladesh (revised 2019): 1 Boishakh = 14 April; Boishakh–Ashwin 31 days, Kartik–Magh 30, Falgun 29 (30 in a leap year), Chaitra 30.
 */
import { sunLon, jd } from './tithi.mjs';

export const CHECKED = '26 Nov 2026';
const norm = (x) => ((x % 360) + 360) % 360;
const ayan = (J) => { const y = (J - 2451545) / 365.25; return 23.8706 + (y * 50.2788 + y * y * 0.000111) / 3600; };
const sid = (ms) => { const J = jd(ms); return norm(sunLon(J) - ayan(J)); };
const ymd = (ms) => new Date(ms).toISOString().slice(0, 10);
const istDate = (ms) => ymd(ms + 5.5 * 3600e3);
const addDays = (s, n) => ymd(Date.parse(s + 'T00:00:00Z') + n * 864e5);

/** Sankrantis between two dates: [{ rashi (0 = Mesha), ms }]. */
export function sankrantis(fromMs, toMs) {
  const out = []; let t = fromMs;
  while (t < toMs) {
    const k = Math.floor(sid(t) / 30), target = ((k + 1) % 12) * 30; let a = t, b = t + 40 * 864e5;
    const f = (x) => norm(sid(x) - target + 180) - 180;
    for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (f(m) < 0) a = m; else b = m; }
    out.push({ rashi: (k + 1) % 12, ms: b }); t = b + 864e5;
  }
  return out;
}
/** West Bengal month starts: [{ y (Bangabda), m (0 = Boishakh), start: 'YYYY-MM-DD', ms (ingress) }] */
export function wbMonths(gFrom, gTo) {
  return sankrantis(Date.UTC(gFrom, 0, 1) - 35 * 864e5, Date.UTC(gTo + 1, 0, 1)).map((s) => {
    const start = addDays(istDate(s.ms), 1), gy = +start.slice(0, 4);
    return { y: s.rashi <= 8 ? gy - 593 : gy - 594, m: s.rashi, start, ms: s.ms };
  });
}
export const BD_LEN = (m, gyOfFalgun) => (m < 6 ? 31 : m === 10 ? ((gyOfFalgun % 4 === 0 && gyOfFalgun % 100 !== 0) || gyOfFalgun % 400 === 0 ? 30 : 29) : 30);
/** Bangladesh date for 'YYYY-MM-DD' → { y, m, d } */
export function bdDate(s) {
  const g = +s.slice(0, 4); let y0 = s >= `${g}-04-14` ? g : g - 1;
  let day = (Date.parse(s + 'T00:00:00Z') - Date.UTC(y0, 3, 14)) / 864e5, m = 0;
  while (day >= BD_LEN(m, y0 + 1)) { day -= BD_LEN(m, y0 + 1); m += 1; }
  return { y: y0 - 593, m, d: day + 1 };
}
export function wbDate(s, table) {
  let cur = null; for (const r of table) { if (r.start <= s) cur = r; else break; }
  if (!cur) return null;
  return { y: cur.y, m: cur.m, d: (Date.parse(s + 'T00:00:00Z') - Date.parse(cur.start + 'T00:00:00Z')) / 864e5 + 1 };
}

const BN_DIG = (x) => String(x).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
const M = {
  bn: ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'],
  hi: ['बैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'अग्रहायण', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'],
  en: ['Boishakh', 'Joishtho', 'Asharh', 'Shrabon', 'Bhadro', 'Ashwin', 'Kartik', 'Agrahayan', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
};
M.hinglish = M.en;
const RITU = { bn: ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'], hi: ['ग्रीष्म', 'वर्षा', 'शरद', 'हेमंत', 'शीत', 'वसंत'], en: ['Summer (Grishmo)', 'Monsoon (Borsha)', 'Autumn (Shorot)', 'Late autumn (Hemonto)', 'Winter (Sheet)', 'Spring (Bosonto)'] };
RITU.hinglish = ['Grishmo (garmi)', 'Borsha (baarish)', 'Shorot', 'Hemonto', 'Sheet (sardi)', 'Bosonto (basant)'];
const WD = { bn: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'], hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'], en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] };
WD.hinglish = ['Raviwar', 'Somwar', 'Mangalwar', 'Budhwar', 'Guruwar', 'Shukrawar', 'Shaniwar'];

const TX = {
  bn: {
    nav: 'আজকের বাংলা তারিখ', title: (d) => `আজ বাংলা তারিখ কত? ${d} — বাংলা ক্যালেন্ডার ১৪৩৩ | NextGrade`,
    desc: 'আজকের বাংলা তারিখ — পশ্চিমবঙ্গের পঞ্জিকা আর বাংলাদেশের ক্যালেন্ডার দুটোই। যেকোনো ইংরেজি তারিখকে বাংলা তারিখে বদলান, ১৪৩৩ ও ১৪৩৪ সনের প্রতিটা মাস কবে শুরু।',
    h1: '📅 আজ বাংলা তারিখ কত?', wb: 'পশ্চিমবঙ্গ (পঞ্জিকা)', bd: 'বাংলাদেশ', today: 'আজ', conv: 'তারিখ বদলান', pick: 'ইংরেজি তারিখ', yearH: (y) => `বাংলা ক্যালেন্ডার ${BN_DIG(y)} — মাস কবে শুরু`, yearT: (y) => `বাংলা ক্যালেন্ডার ${BN_DIG(y)} সন — প্রতিটা মাসের শুরুর তারিখ (পশ্চিমবঙ্গ ও বাংলাদেশ) | NextGrade`, yearD: (y) => `${BN_DIG(y)} বঙ্গাব্দের বৈশাখ থেকে চৈত্র — পশ্চিমবঙ্গের পঞ্জিকা আর বাংলাদেশের ক্যালেন্ডারে প্রতিটা মাস কোন ইংরেজি তারিখে শুরু, কত দিনের।`,
    th: ['মাস', 'ঋতু', 'পশ্চিমবঙ্গে ১ তারিখ', 'দিন', 'বাংলাদেশে ১ তারিখ', 'দিন'], sankH: 'সংক্রান্তি (সূর্য রাশি বদলায়, IST)',
    rulesH: 'দুই বাংলায় তারিখ আলাদা কেন?',
    rules: ['পশ্চিমবঙ্গে পঞ্জিকা মেনে সূর্য যখন এক রাশি থেকে পরের রাশিতে যায় (সংক্রান্তি), তার পরের দিন নতুন মাস শুরু হয়। তাই মাস ২৯ থেকে ৩২ দিনের হয়, আর পয়লা বৈশাখ ১৪ বা ১৫ এপ্রিল পড়ে।', 'বাংলাদেশে ২০১৯ (১৪২৬) থেকে সংশোধিত ক্যালেন্ডার চলে: পয়লা বৈশাখ সবসময় ১৪ এপ্রিল; বৈশাখ থেকে আশ্বিন ৩১ দিন, কার্তিক থেকে মাঘ আর চৈত্র ৩০ দিন, ফাল্গুন ২৯ দিন (লিপ ইয়ারে ৩০)।', 'তাই একই দিনে দুই বাংলায় তারিখ ১–২ দিন আলাদা হতে পারে। বঙ্গাব্দ = ইংরেজি সাল − ৫৯৩ (পয়লা বৈশাখের পর), তার আগে − ৫৯৪।', 'আমাদের হিসাব জ্যোতির্বিজ্ঞানের সূত্রে (লাহিড়ী অয়নাংশ) — কোনো কোনো পঞ্জিকার (যেমন গুপ্তপ্রেস) সঙ্গে কখনও এক দিনের তফাত হতে পারে।'],
    faqH: 'প্রশ্ন-উত্তর',
    faq: [['আজ বাংলা কত সাল?', 'এখন ১৪৩৩ বঙ্গাব্দ চলছে; ১৪৩৪ শুরু হবে পয়লা বৈশাখে — পশ্চিমবঙ্গে ১৫ এপ্রিল ২০২৭, বাংলাদেশে ১৪ এপ্রিল ২০২৭।'], ['পয়লা বৈশাখ ২০২৭ কবে?', 'পশ্চিমবঙ্গে বৃহস্পতিবার ১৫ এপ্রিল ২০২৭ (মেষ সংক্রান্তি ১৪ এপ্রিল); বাংলাদেশে বুধবার ১৪ এপ্রিল ২০২৭।'], ['বাংলা মাস কটা আর কী কী?', '১২টা: বৈশাখ, জ্যৈষ্ঠ, আষাঢ়, শ্রাবণ, ভাদ্র, আশ্বিন, কার্তিক, অগ্রহায়ণ, পৌষ, মাঘ, ফাল্গুন, চৈত্র। দুই মাসে এক ঋতু — মোট ছয় ঋতু।'], ['বাংলা তারিখ কখন বদলায়?', 'ঐতিহ্য মেনে সূর্যোদয়ে; এই পেজ সুবিধার জন্য রাত ১২টায় (IST) বদলায়।']],
    src: 'হিসাব', chk: 'শেষ যাচাই',
  },
  en: {
    nav: 'Bangla date today', title: (d) => `Bangla Date Today: ${d} — Bengali Calendar 1433 | NextGrade`,
    desc: "Today's Bengali (Bangla) date in both the West Bengal panjika and the Bangladesh calendar. Convert any English date to a Bangla date, and see when every month of 1433 and 1434 starts.",
    h1: '📅 Bangla date today', wb: 'West Bengal (panjika)', bd: 'Bangladesh', today: 'Today', conv: 'Convert a date', pick: 'English date', yearH: (y) => `Bengali calendar ${y} — when each month starts`, yearT: (y) => `Bengali Calendar ${y} (Bangabda) — Month Start Dates in West Bengal and Bangladesh | NextGrade`, yearD: (y) => `Boishakh to Chaitra ${y}: the English date on which each Bengali month starts and its length, in the West Bengal panjika and the Bangladesh calendar.`,
    th: ['Month', 'Season', '1st in West Bengal', 'Days', '1st in Bangladesh', 'Days'], sankH: 'Sankranti (Sun changes sign, IST)',
    rulesH: 'Why do the two Bengals have different dates?',
    rules: ['In West Bengal the panjika starts a new month on the day after the Sun moves into the next sign (sankranti). So months are 29 to 32 days long and Pohela Boishakh falls on 14 or 15 April.', 'Bangladesh has used a revised fixed calendar since 2019 (1426): Pohela Boishakh is always 14 April; Boishakh to Ashwin have 31 days, Kartik to Magh and Chaitra 30, Falgun 29 (30 in a leap year).', 'So the same day can have a Bangla date 1–2 days apart in the two countries. Bangabda = English year − 593 (after Pohela Boishakh), − 594 before it.', 'We calculate with astronomical formulas (Lahiri ayanamsa); some printed panjikas (for example Gupta Press) can differ by one day now and then.'],
    faqH: 'Frequently asked questions',
    faq: [['Which Bengali year is it now?', 'Bangabda 1433 is running; 1434 starts on Pohela Boishakh — 15 April 2027 in West Bengal, 14 April 2027 in Bangladesh.'], ['When is Pohela Boishakh 2027?', 'Thursday 15 April 2027 in West Bengal (Mesha sankranti on 14 April); Wednesday 14 April 2027 in Bangladesh.'], ['What are the 12 Bengali months?', 'Boishakh, Joishtho, Asharh, Shrabon, Bhadro, Ashwin, Kartik, Agrahayan, Poush, Magh, Falgun, Chaitra — two months make each of the six seasons.'], ['When does the Bangla date change?', 'Traditionally at sunrise; this page changes it at midnight IST for convenience.']],
    src: 'Method', chk: 'Last checked',
  },
  hinglish: {
    nav: 'Aaj ki Bangla tarikh', title: (d) => `Aaj Bangla Tarikh Kya Hai? ${d} — Bangla Calendar 1433 | NextGrade`,
    desc: 'Aaj ki Bangla tarikh — West Bengal panjika aur Bangladesh calendar dono. Koi bhi English date ko Bangla tarikh mein badlo, aur 1433 va 1434 ka har mahina kab shuru hota hai.',
    h1: '📅 Aaj Bangla tarikh kya hai?', wb: 'West Bengal (panjika)', bd: 'Bangladesh', today: 'Aaj', conv: 'Tarikh badlo', pick: 'English date', yearH: (y) => `Bangla calendar ${y} — mahina kab shuru`, yearT: (y) => `Bangla Calendar ${y} — Har Mahine ki Shuru Tarikh (West Bengal aur Bangladesh) | NextGrade`, yearD: (y) => `Boishakh se Chaitra ${y}: har Bangla mahina kis English date ko shuru hota hai aur kitne din ka, West Bengal panjika aur Bangladesh calendar mein.`,
    th: ['Mahina', 'Ritu', 'West Bengal mein 1 tarikh', 'Din', 'Bangladesh mein 1 tarikh', 'Din'], sankH: 'Sankranti (suraj raashi badalta hai, IST)',
    rulesH: 'Dono Bengal mein tarikh alag kyon?',
    rules: ['West Bengal mein panjika ke hisaab se suraj jab agli raashi mein jaata hai (sankranti), uske agle din naya mahina shuru hota hai. Isliye mahina 29 se 32 din ka hota hai aur Pohela Boishakh 14 ya 15 April ko padta hai.', 'Bangladesh mein 2019 (1426) se fixed calendar hai: Pohela Boishakh hamesha 14 April; Boishakh se Ashwin 31 din, Kartik se Magh aur Chaitra 30 din, Falgun 29 din (leap year mein 30).', 'Isliye ek hi din dono jagah Bangla tarikh 1–2 din alag ho sakti hai. Bangabda = English saal − 593 (Pohela Boishakh ke baad), usse pehle − 594.', 'Hamara hisaab astronomy ke formula se hai (Lahiri ayanamsa); kuch chhapi panjika (jaise Gupta Press) se kabhi-kabhi ek din ka farq ho sakta hai.'],
    faqH: 'Sawal-jawab',
    faq: [['Abhi Bangla kaun sa saal hai?', 'Abhi 1433 Bangabda chal raha hai; 1434 Pohela Boishakh ko shuru hoga — West Bengal mein 15 April 2027, Bangladesh mein 14 April 2027.'], ['Pohela Boishakh 2027 kab hai?', 'West Bengal mein guruwar 15 April 2027 (Mesh sankranti 14 April); Bangladesh mein budhwar 14 April 2027.'], ['Bangla mahine kaun-kaun se hain?', 'Boishakh, Joishtho, Asharh, Shrabon, Bhadro, Ashwin, Kartik, Agrahayan, Poush, Magh, Falgun, Chaitra — do mahine milkar ek ritu, kul chhe ritu.'], ['Bangla tarikh kab badalti hai?', 'Parampara mein suryoday par; yeh page suvidha ke liye raat 12 baje (IST) badalta hai.']],
    src: 'Hisaab', chk: 'Aakhri baar jaancha',
  },
  hi: {
    nav: 'आज की बांग्ला तारीख़', title: (d) => `आज बांग्ला तारीख़ क्या है? ${d} — बांग्ला कैलेंडर 1433 | NextGrade`,
    desc: 'आज की बांग्ला तारीख़ — पश्चिम बंगाल पंजिका और बांग्लादेश कैलेंडर दोनों। कोई भी अंग्रेज़ी तारीख़ बांग्ला तारीख़ में बदलें, और 1433 व 1434 का हर महीना कब शुरू होता है।',
    h1: '📅 आज बांग्ला तारीख़ क्या है?', wb: 'पश्चिम बंगाल (पंजिका)', bd: 'बांग्लादेश', today: 'आज', conv: 'तारीख़ बदलें', pick: 'अंग्रेज़ी तारीख़', yearH: (y) => `बांग्ला कैलेंडर ${y} — महीना कब शुरू`, yearT: (y) => `बांग्ला कैलेंडर ${y} — हर महीने की शुरुआती तारीख़ (पश्चिम बंगाल और बांग्लादेश) | NextGrade`, yearD: (y) => `बैशाख से चैत्र ${y}: हर बांग्ला महीना किस अंग्रेज़ी तारीख़ को शुरू होता है और कितने दिन का, पश्चिम बंगाल पंजिका और बांग्लादेश कैलेंडर में।`,
    th: ['महीना', 'ऋतु', 'पश्चिम बंगाल में 1 तारीख़', 'दिन', 'बांग्लादेश में 1 तारीख़', 'दिन'], sankH: 'संक्रांति (सूरज राशि बदलता है, IST)',
    rulesH: 'दोनों बंगाल में तारीख़ अलग क्यों?',
    rules: ['पश्चिम बंगाल में पंजिका के हिसाब से सूरज जब अगली राशि में जाता है (संक्रांति), उसके अगले दिन नया महीना शुरू होता है। इसलिए महीना 29 से 32 दिन का होता है और पोइला बैशाख 14 या 15 अप्रैल को पड़ता है।', 'बांग्लादेश में 2019 (1426) से तय कैलेंडर है: पोइला बैशाख हमेशा 14 अप्रैल; बैशाख से आश्विन 31 दिन, कार्तिक से माघ और चैत्र 30 दिन, फाल्गुन 29 दिन (लीप ईयर में 30)।', 'इसलिए एक ही दिन दोनों जगह बांग्ला तारीख़ 1–2 दिन अलग हो सकती है। बंगाब्द = अंग्रेज़ी साल − 593 (पोइला बैशाख के बाद), उससे पहले − 594।', 'हमारा हिसाब खगोल विज्ञान के फ़ॉर्मूले से है (लाहिड़ी अयनांश); कुछ छपी पंजिका (जैसे गुप्त प्रेस) से कभी-कभी एक दिन का फ़र्क़ हो सकता है।'],
    faqH: 'सवाल-जवाब',
    faq: [['अभी बांग्ला कौन सा साल है?', 'अभी 1433 बंगाब्द चल रहा है; 1434 पोइला बैशाख को शुरू होगा — पश्चिम बंगाल में 15 अप्रैल 2027, बांग्लादेश में 14 अप्रैल 2027।'], ['पोइला बैशाख 2027 कब है?', 'पश्चिम बंगाल में गुरुवार 15 अप्रैल 2027 (मेष संक्रांति 14 अप्रैल); बांग्लादेश में बुधवार 14 अप्रैल 2027।'], ['बांग्ला महीने कौन-कौन से हैं?', 'बैशाख, ज्येष्ठ, आषाढ़, श्रावण, भाद्र, आश्विन, कार्तिक, अग्रहायण, पौष, माघ, फाल्गुन, चैत्र — दो महीने मिलकर एक ऋतु, कुल छह ऋतु।'], ['बांग्ला तारीख़ कब बदलती है?', 'परंपरा में सूर्योदय पर; यह पेज सुविधा के लिए रात 12 बजे (IST) बदलता है।']],
    src: 'हिसाब', chk: 'आख़िरी बार जाँचा',
  },
};
export const BT_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, v.nav]));

export function buildBanglaTarikh(L, { page, write, P, esc, T, breadcrumbLd, today }) {
  const code = L.code, X = TX[code], hub = '/bangla-tarikh/', mn = M[code], num = code === 'bn' ? BN_DIG : String;
  const table = wbMonths(2024, 2029);
  const fmt = (o) => `${num(o.d)} ${mn[o.m]} ${num(o.y)}`;
  const wb = wbDate(today, table), bd = bdDate(today);
  const wdName = WD[code][new Date(today + 'T00:00:00Z').getUTCDay()];
  const gFmt = (s) => new Date(s + 'T00:00:00Z').toLocaleDateString({ bn: 'bn-IN', hi: 'hi-IN', en: 'en-IN', hinglish: 'en-IN' }[code], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const css = '<style>.bt-ans{color:#2b2118;font-size:20px;font-weight:800;padding:14px 16px;border-radius:16px;background:linear-gradient(135deg,#fff4e6,#e6fcf5);border:1px solid var(--line);margin:8px 0}.bt-ans small{display:block;font-weight:600;font-size:14px;color:#5c4a3a}.bt-t{width:100%;border-collapse:collapse;font-size:15px}.bt-t td,.bt-t th{padding:7px 8px;border-bottom:1px solid var(--line);text-align:left}.bt-f{display:flex;gap:10px;align-items:end;flex-wrap:wrap;margin:10px 0}.bt-f input{padding:10px;border-radius:10px;border:1px solid var(--line);font:inherit;background:var(--surface);color:var(--text)}</style>';
  const cfg = { wb: table.map((r) => [r.start, r.y, r.m]), mn, wd: WD[code], bn: code === 'bn', L: { wb: X.wb, bd: X.bd } };
  const answer = (o, label) => `<p class="bt-ans">${esc(label)}: ${esc(fmt(o))}<small>${esc(RITU[code][Math.floor(o.m / 2)])}</small></p>`;
  const conv = `<h2>🔁 ${esc(X.conv)}</h2><div class="bt-f"><label>${esc(X.pick)}<br><input id="bt-d" type="date" value="${today}" min="2024-04-14" max="2029-12-31"></label></div><div id="bt-out" aria-live="polite"></div><script type="application/json" id="bt-cfg">${JSON.stringify(cfg)}</script>`;
  const rules = `<h2>${esc(X.rulesH)}</h2><ul>${X.rules.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: X.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const faq = `<h2>${esc(X.faqH)}</h2>${X.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}`;
  const YEARS = [1433, 1434];
  const yLinks = YEARS.map((y) => `<a class="tag" href="${P(L, `${hub}${y}/`)}">${esc(X.yearH(y).split(' — ')[0])}</a>`).join(' ');
  const foot = `<p><small>${esc(X.src)}: Lahiri ayanamsa, Meeus · ${esc(X.chk)}: ${CHECKED}</small></p>`;
  write(L, hub, page(L, {
    path: hub, title: X.title(fmt(wb)), description: X.desc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]]), faqLd],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p><h1>${esc(X.h1)}</h1>
<p class="lead" id="bt-today">${esc(X.today)}: ${esc(wdName)}, ${esc(gFmt(today))}</p>${answer(wb, X.wb)}${answer(bd, X.bd)}
<div class="ad" aria-hidden="true"></div>${conv}${rules}<p class="chips">${yLinks}</p>${faq}${foot}</div>`,
    scripts: ['/assets/bangla-tarikh.js'],
  }));
  for (const y of YEARS) {
    const path = `${hub}${y}/`, rows = table.filter((r) => r.y === y);
    const bdStart = (m) => { let s = `${y + 593}-04-14`; for (let k = 0; k < m; k++) s = addDays(s, BD_LEN(k, y + 594)); return s; };
    const body = rows.map((r, i) => {
      const next = table[table.indexOf(r) + 1], days = next ? (Date.parse(next.start) - Date.parse(r.start)) / 864e5 : '';
      return `<tr><td><b>${esc(mn[r.m])}</b></td><td>${esc(RITU[code][Math.floor(r.m / 2)])}</td><td>${esc(gFmt(r.start))}</td><td>${num(days)}</td><td>${esc(gFmt(bdStart(r.m)))}</td><td>${num(BD_LEN(r.m, y + 594))}</td></tr>`;
    }).join('');
    const sank = rows.map((r) => `<li>${esc(mn[r.m])}: ${esc(new Date(r.ms + 5.5 * 3600e3).toISOString().slice(0, 16).replace('T', ' '))}</li>`).join('');
    write(L, path, page(L, {
      path, title: X.yearT(y), description: X.yearD(y),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [String(y), path]])],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${num(y)}</p><h1>📅 ${esc(X.yearH(y))}</h1>
<p class="bt-ans">${esc(X.today)}: ${esc(fmt(wb))}<small>${esc(X.wb)}</small></p>
<div style="overflow-x:auto"><table class="bt-t"><tr>${X.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${body}</table></div>
<div class="ad" aria-hidden="true"></div><h2>${esc(X.sankH)}</h2><ul>${sank}</ul>${rules}<p class="chips">${yLinks}</p>${foot}</div>`,
    }));
  }
}
