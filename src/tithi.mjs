/**
 * Tithi calculator (plan item N4, 25 Nov 2026): Sun and Moon longitude (Meeus, "Astronomical Algorithms" ch. 25 and
 * ch. 47 — moon with the main periodic terms), tithi = (moon − sun) / 12°. Gives the start and end time (IST) of
 * Purnima (15), Amavasya (30) and the two Ekadashis (11, 26) for a year. Accuracy: a few minutes.
 */
const R = Math.PI / 180, norm = (x) => ((x % 360) + 360) % 360;
const jd = (ms) => ms / 864e5 + 2440587.5;
function sunLon(J) {
  const T = (J - 2451545) / 36525, L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T, M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * R) + (0.019993 - 0.000101 * T) * Math.sin(2 * M * R) + 0.000289 * Math.sin(3 * M * R);
  const om = 125.04 - 1934.136 * T;
  return norm(L0 + C - 0.00569 - 0.00478 * Math.sin(om * R));
}
// Moon longitude: main terms of Meeus table 47.A (Σl, in 1e-6 degrees)
const ML = [[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],[3,0,-1,0,-892],[2,1,1,0,-810],[4,-1,-2,0,759],[0,2,-1,0,-713],[2,2,-1,0,-700],[2,1,-2,0,691],[2,-1,0,-2,596],[4,0,1,0,549],[0,0,4,0,537],[4,-1,0,0,520],[1,0,-2,0,-487],[2,1,0,-2,-399],[0,0,2,-2,-381],[1,1,1,0,351],[3,0,-2,0,-340],[4,0,-3,0,330],[2,-1,2,0,327],[0,2,1,0,-323],[1,1,-1,0,299],[2,0,3,0,294]];
function moonLon(J) {
  const T = (J - 2451545) / 36525;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T, D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  const M = 357.5291092 + 35999.0502909 * T, Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T, F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T, A1 = 119.75 + 131.849 * T, A2 = 53.09 + 479264.29 * T;
  let s = 0;
  for (const [d, m, mp, f, c] of ML) { const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1; s += c * e * Math.sin((d * D + m * M + mp * Mp + f * F) * R); }
  s += 3958 * Math.sin(A1 * R) + 1962 * Math.sin((Lp - F) * R) + 318 * Math.sin(A2 * R);
  const om = 125.04452 - 1934.136261 * T, nut = -17.2 / 3600 * Math.sin(om * R);
  return norm(Lp + s / 1e6 + nut);
}
export const elong = (ms) => { const J = jd(ms); return norm(moonLon(J) - sunLon(J)); };
// time (ms) when elongation reaches target degrees, searching forward from ms
function when(target, from) {
  let t = from, step = 6 * 3600e3, prev = norm(elong(t) - target + 180) - 180;
  for (let i = 0; i < 4 * 40; i++) { const t2 = t + step, cur = norm(elong(t2) - target + 180) - 180; if (prev < 0 && cur >= 0) { let a = t, b = t2; for (let k = 0; k < 40; k++) { const m = (a + b) / 2; if (norm(elong(m) - target + 180) - 180 < 0) a = m; else b = m; } return (a + b) / 2; } t = t2; prev = cur; }
  return null;
}
/** All tithis n (1–30) of a year: [{ n, start, end }] in ms (UTC); tithi n spans elongation (n−1)·12° … n·12°. */
export function tithis(year, ns) {
  const out = []; let t = Date.UTC(year, 0, 1) - 20 * 864e5; const stop = Date.UTC(year + 1, 0, 15);
  while (t < stop) {
    const e = elong(t), cur = Math.floor(e / 12) + 1, nextStart = when((cur % 30) * 12, t);
    if (ns.includes(cur)) { const start = when(((cur - 1) % 30) * 12, t - 2 * 864e5); out.push({ n: cur, start, end: nextStart }); }
    t = nextStart + 60e3;
  }
  return out.filter((x) => new Date(x.end + 5.5 * 3600e3).getUTCFullYear() === year || new Date(x.start + 5.5 * 3600e3).getUTCFullYear() === year);
}

// ---- Hindu (amanta) month of each lunar month: named by the sidereal sign the Sun is in at the new moon that starts it
const AYAN = (ms) => 24.0 + (new Date(ms).getUTCFullYear() + new Date(ms).getUTCMonth() / 12 - 2000) * (50.29 / 3600) + 0.1; // ≈ Lahiri
const sidSun = (ms) => norm(sunLon(jd(ms)) - AYAN(ms));
// sign index 0 = Mesha … 11 = Meena  →  amanta month: Meena→Chaitra(0), Mesha→Vaishakha(1) …
const monthOf = (newMoonMs) => (Math.floor(sidSun(newMoonMs) / 30) + 1) % 12;
export const MONTHS = {
  hi: ['चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्रपद', 'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'],
  en: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik', 'Margashirsha', 'Paush', 'Magh', 'Phalguna'],
  bn: ['চৈত্র', 'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন'],
};
// Ekadashi names by amanta month [shukla, krishna]
export const EKADASHI = {
  hi: [['कामदा', 'वरूथिनी'], ['मोहिनी', 'अपरा'], ['निर्जला', 'योगिनी'], ['देवशयनी', 'कामिका'], ['श्रावण पुत्रदा', 'अजा'], ['परिवर्तिनी', 'इंदिरा'], ['पापांकुशा', 'रमा'], ['देवउठनी (प्रबोधिनी)', 'उत्पन्ना'], ['मोक्षदा', 'सफला'], ['पौष पुत्रदा', 'षटतिला'], ['जया', 'विजया'], ['आमलकी', 'पापमोचनी']],
  en: [['Kamada', 'Varuthini'], ['Mohini', 'Apara'], ['Nirjala', 'Yogini'], ['Devshayani', 'Kamika'], ['Shravana Putrada', 'Aja'], ['Parivartini', 'Indira'], ['Papankusha', 'Rama'], ['Devutthana (Prabodhini)', 'Utpanna'], ['Mokshada', 'Saphala'], ['Pausha Putrada', 'Shattila'], ['Jaya', 'Vijaya'], ['Amalaki', 'Papmochani']],
  bn: [['কামদা', 'বরূথিনী'], ['মোহিনী', 'অপরা'], ['নির্জলা', 'যোগিনী'], ['দেবশয়নী', 'কামিকা'], ['শ্রাবণ পুত্রদা', 'অজা'], ['পরিবর্তিনী', 'ইন্দিরা'], ['পাপাঙ্কুশা', 'রমা'], ['দেবোত্থান (প্রবোধিনী)', 'উৎপন্না'], ['মোক্ষদা', 'সফলা'], ['পৌষ পুত্রদা', 'ষটতিলা'], ['জয়া', 'বিজয়া'], ['আমলকী', 'পাপমোচনী']],
};
/** Events from `from` for `days`: { kind: 'purnima'|'amavasya'|'ekadashi', paksha, month (0–11), adhik, start, end, udaya (YYYY-MM-DD, tithi at sunrise in Delhi) } */
export function events(from, days) {
  const res = [], stop = from + days * 864e5;
  let nm = when(0, from - 32 * 864e5);
  while (nm < stop) {
    const next = when(0, nm + 20 * 864e5);
    const m = monthOf(nm), adhik = monthOf(next) === m; // no sankranti inside → adhik (extra) month
    for (const [n, kind, paksha] of [[11, 'ekadashi', 's'], [15, 'purnima', 's'], [26, 'ekadashi', 'k'], [30, 'amavasya', 'k']]) {
      const start = when((n - 1) * 12, nm + (n === 30 ? 20 : 0) * 864e5), end = when((n % 30) * 12, start + 3600e3);
      if (!start || !end || end < from || start > stop) continue;
      // udaya tithi: the date whose sunrise (≈ 6:00–7:15 IST in Delhi; use the NOAA sunrise) falls inside the tithi
      let udaya = null;
      for (let d = new Date(start + 5.5 * 3600e3); d.getTime() <= end + 5.5 * 3600e3 + 864e5; d = new Date(d.getTime() + 864e5)) {
        const ymd = d.toISOString().slice(0, 10), sr = sunriseDelhi(ymd);
        if (sr >= start && sr < end) { udaya = ymd; break; }
      }
      if (!udaya) udaya = new Date(start + 5.5 * 3600e3).toISOString().slice(0, 10); // kshaya tithi (no sunrise inside): the day it starts
      res.push({ kind, n, paksha, month: m, pmonth: paksha === 'k' ? (m + 1) % 12 : m, adhik, start, end, udaya });
    }
    nm = next;
  }
  return res.sort((a, b) => a.start - b.start);
}
function sunriseDelhi(ymd) {
  const lat = 28.61, lon = 77.21, d = new Date(`${ymd}T12:00:00Z`), doy = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5), g = (2 * Math.PI / 365) * (doy - 1);
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * R) / (Math.cos(lat * R) * Math.cos(decl)) - Math.tan(lat * R) * Math.tan(decl)) / R;
  return Date.parse(`${ymd}T00:00:00Z`) + (720 - 4 * (lon + ha) - eqt) * 60e3; // UTC ms
}

/** Panchang at a moment: tithi number (1–30), paksha ('s'|'k'), purnimanta month index (0 = Chaitra). */
export function panchangAt(ms) {
  const e = elong(ms), n = Math.floor(e / 12) + 1;
  let nm = when(0, ms - 32 * 864e5);
  for (let i = 0; i < 3; i++) { const nx = when(0, nm + 20 * 864e5); if (nx > ms) break; nm = nx; }
  const m = monthOf(nm), adhik = monthOf(when(0, nm + 20 * 864e5)) === m;
  return { n, paksha: n <= 15 ? 's' : 'k', month: m, pmonth: n <= 15 ? m : (m + 1) % 12, adhik };
}
export { sunriseDelhi };
export const TITHI_NAMES = {
  hi: ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा', 'अमावस्या'],
  en: ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Amavasya'],
  bn: ['প্রতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুর্থী', 'পঞ্চমী', 'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী', 'একাদশী', 'দ্বাদশী', 'ত্রয়োদশী', 'চতুর্দশী', 'পূর্ণিমা', 'অমাবস্যা'],
};
export const tithiName = (code, n) => { const T = TITHI_NAMES[code === 'bn' ? 'bn' : code === 'hi' ? 'hi' : 'en']; return n === 15 ? T[14] : n === 30 ? T[15] : T[(n - 1) % 15]; };
