/**
 * Weather pages, round 2 (user, 27 Nov 2026: "poora fix"). Google left 549 weather pages "crawled, not indexed" —
 * same template × 4 languages. So:
 *  1. Which language copies Google should index: hi + en for every city; bn only for cities where Bengali readers
 *     look (Bengal and the north-east, big cities, travel places); hinglish weather pages stay for users but noindex.
 *  2. Blocks that differ from city to city, all worked out from the city's own data: where it is (distance and
 *     direction to the state capital and the nearest big city), how its weather compares with that city, what to
 *     wear in which months, and travel places nearby.
 */
import { CITIES, CLIMATE } from './weather-cities.mjs';
import { PLACES } from './travel-places.mjs';

const BN_STATES = new Set(['West Bengal', 'Assam', 'Tripura', 'Jharkhand', 'Sikkim', 'Meghalaya', 'Andaman and Nicobar']);
const TRAVEL = new Map(PLACES.map(([s, , text]) => [s, text]));
export const BIG = ['delhi', 'mumbai', 'kolkata', 'bengaluru', 'chennai', 'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'lucknow', 'patna', 'kanpur', 'varanasi', 'prayagraj', 'bhopal', 'indore', 'nagpur', 'ranchi', 'guwahati', 'bhubaneswar', 'chandigarh', 'dehradun', 'surat', 'siliguri'];
/** Language codes whose copy of this city page should be indexed. */
export const indexLangs = (c) => ['hi', 'en', ...(BN_STATES.has(c.state) || BIG.includes(c.slug) || TRAVEL.has(c.slug) ? ['bn'] : [])];

const CAP = { 'Andhra Pradesh': 'amaravati', 'Arunachal Pradesh': 'itanagar', Assam: 'guwahati', Bihar: 'patna', Chhattisgarh: 'raipur', 'Dadra and Nagar Haveli and Daman and Diu': 'daman', Goa: 'panaji', Gujarat: 'gandhinagar', Haryana: 'chandigarh', 'Himachal Pradesh': 'shimla', 'Jammu and Kashmir': 'srinagar', Jharkhand: 'ranchi', Karnataka: 'bengaluru', Kerala: 'thiruvananthapuram', Ladakh: 'leh', 'Madhya Pradesh': 'bhopal', Maharashtra: 'mumbai', Manipur: 'imphal', Meghalaya: 'shillong', Mizoram: 'aizawl', Nagaland: 'kohima', Odisha: 'bhubaneswar', Punjab: 'chandigarh', Rajasthan: 'jaipur', Sikkim: 'gangtok', 'Tamil Nadu': 'chennai', Telangana: 'hyderabad', Tripura: 'agartala', 'Uttar Pradesh': 'lucknow', Uttarakhand: 'dehradun', 'West Bengal': 'kolkata' };
const bySlug = new Map(CITIES.map((c) => [c.slug, c]));
const km = (a, b) => { const p = Math.PI / 180, x = (b.lon - a.lon) * p * Math.cos(((a.lat + b.lat) / 2) * p), y = (b.lat - a.lat) * p; return 6371 * Math.hypot(x, y); };
// direction of b as seen from a, 8 points
const dirIdx = (a, b) => { const p = Math.PI / 180, x = (b.lon - a.lon) * Math.cos(((a.lat + b.lat) / 2) * p), y = b.lat - a.lat; return Math.round(((Math.atan2(x, y) / p + 360) % 360) / 45) % 8; };
const DIRS = {
  hi: ['उत्तर', 'उत्तर-पूर्व', 'पूर्व', 'दक्षिण-पूर्व', 'दक्षिण', 'दक्षिण-पश्चिम', 'पश्चिम', 'उत्तर-पश्चिम'],
  en: ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'],
  hinglish: ['uttar', 'uttar-poorv', 'poorv', 'dakshin-poorv', 'dakshin', 'dakshin-paschim', 'paschim', 'uttar-paschim'],
  bn: ['উত্তর', 'উত্তর-পূর্ব', 'পূর্ব', 'দক্ষিণ-পূর্ব', 'দক্ষিণ', 'দক্ষিণ-পশ্চিম', 'পশ্চিম', 'উত্তর-পশ্চিম'],
};
const bnGen = (n) => (/[া-ৌ]$/.test(n) ? `${n}র` : `${n}-এর`);
const bnLoc = (n) => (/া$/.test(n) ? `${n}য়` : /[ি-ৌ]$/.test(n) ? `${n}তে` : `${n}-এ`);
const nf = (code, v) => Math.round(v).toLocaleString(code === 'bn' ? 'bn-IN' : 'en-IN');
const r10 = (v) => (v >= 100 ? Math.round(v / 10) * 10 : Math.max(5, Math.round(v / 5) * 5));

const T = {
  hi: {
    whereH: (n) => `📍 ${n} कहाँ है`,
    cap: (n, cap, d, dir) => `${n} राज्य की राजधानी ${cap} से लगभग ${d} किमी ${dir} में है।`,
    big: (n, b, d, dir) => `सबसे पास का बड़ा शहर ${b} है — लगभग ${d} किमी, ${dir} दिशा में।`,
    near: (xs) => `आसपास के शहर: ${xs}।`, isCap: (n, st) => `${n} ${st} की राजधानी है।`, kmU: 'किमी',
    cmpH: (n, r) => `🌡️ ${n} और ${r} के मौसम में फ़र्क़`,
    hot: (m, n, r, d, a, b) => d === 0 ? `${m} में दोनों शहरों का दिन का तापमान लगभग बराबर रहता है (${a}°C)।` : `${m} में ${n} का दिन ${r} से लगभग ${Math.abs(d)}°C ${d > 0 ? 'ज़्यादा गर्म' : 'कम गर्म'} रहता है (${a}°C बनाम ${b}°C)।`,
    cold: (m, n, r, d, a, b) => d === 0 ? `${m} की रातें दोनों जगह लगभग एक जैसी ठंडी होती हैं (${a}°C)।` : `${m} की रातें ${n} में ${Math.abs(d)}°C ${d < 0 ? 'ज़्यादा ठंडी' : 'कम ठंडी'} होती हैं (${a}°C बनाम ${b}°C)।`,
    rain: (n, r, a, b, A, B) => Math.abs(A - B) < 0.1 * Math.max(A, B) ? `साल भर की बारिश दोनों जगह लगभग बराबर है (क़रीब ${a} मिमी)।` : `${n} में साल भर में ${A > B ? 'ज़्यादा' : 'कम'} बारिश होती है — क़रीब ${a} मिमी, जबकि ${r} में ${b} मिमी।`,
    wearH: (n) => `👕 ${n} में किस महीने क्या पहनें`,
    wear: { veryhot: 'बहुत गर्मी: सूती ढीले कपड़े, टोपी/गमछा, पानी साथ रखें; दोपहर 12–4 बजे धूप से बचें।', hot: 'गर्मी: हल्के सूती कपड़े, धूप का चश्मा, पानी की बोतल।', rain: 'बारिश: छाता या रेनकोट, जल्दी सूखने वाले कपड़े, फिसलन से बचने वाले जूते।', pleasant: 'सुहाना मौसम: हल्के कपड़े काफ़ी हैं; शाम के लिए एक पतली शर्ट/दुपट्टा।', cool: 'हल्की ठंड: सुबह-शाम स्वेटर या हल्की जैकेट।', cold: 'ठंड: गर्म जैकेट, टोपी, मोज़े; बुज़ुर्ग और बच्चे ख़ास ध्यान रखें।' },
    tripH: (n) => `🧳 ${n} के पास घूमने की जगहें`, trip: (p, d) => `${p} (${d} किमी)`,
  },
  en: {
    whereH: (n) => `📍 Where is ${n}`,
    cap: (n, cap, d, dir) => `${n} is about ${d} km ${dir} of ${cap}, the state capital.`,
    big: (n, b, d, dir) => `The nearest big city is ${b}, about ${d} km to the ${dir}.`,
    near: (xs) => `Nearby towns: ${xs}.`, isCap: (n, st) => `${n} is the capital of ${st}.`, kmU: 'km',
    cmpH: (n, r) => `🌡️ ${n} vs ${r}: how the weather differs`,
    hot: (m, n, r, d, a, b) => d === 0 ? `In ${m} daytime temperatures in both cities are about the same (${a}°C).` : `In ${m}, days in ${n} are about ${Math.abs(d)}°C ${d > 0 ? 'hotter' : 'cooler'} than in ${r} (${a}°C vs ${b}°C).`,
    cold: (m, n, r, d, a, b) => d === 0 ? `${m} nights are about equally cold in both (${a}°C).` : `${m} nights in ${n} are ${Math.abs(d)}°C ${d < 0 ? 'colder' : 'milder'} (${a}°C vs ${b}°C).`,
    rain: (n, r, a, b, A, B) => Math.abs(A - B) < 0.1 * Math.max(A, B) ? `Both get about the same rain in a year (around ${a} mm).` : `${n} gets ${A > B ? 'more' : 'less'} rain in a year — about ${a} mm, against ${b} mm in ${r}.`,
    wearH: (n) => `👕 What to wear in ${n}, month by month`,
    wear: { veryhot: 'Very hot: loose cotton, a cap or scarf, carry water; avoid the sun from 12 to 4 pm.', hot: 'Hot: light cotton clothes, sunglasses, a water bottle.', rain: 'Rainy: umbrella or raincoat, quick-dry clothes, shoes with grip.', pleasant: 'Pleasant: light clothes are enough; a thin layer for the evening.', cool: 'Cool: a sweater or light jacket for mornings and evenings.', cold: 'Cold: a warm jacket, cap and socks; take extra care of elders and children.' },
    tripH: (n) => `🧳 Places to visit near ${n}`, trip: (p, d) => `${p} (${d} km)`,
  },
  hinglish: {
    whereH: (n) => `📍 ${n} kahan hai`,
    cap: (n, cap, d, dir) => `${n} rajya ki rajdhani ${cap} se lagbhag ${d} km ${dir} mein hai.`,
    big: (n, b, d, dir) => `Sabse paas ka bada sheher ${b} hai — lagbhag ${d} km, ${dir} disha mein.`,
    near: (xs) => `Aaspaas ke sheher: ${xs}.`, isCap: (n, st) => `${n} ${st} ki rajdhani hai.`, kmU: 'km',
    cmpH: (n, r) => `🌡️ ${n} aur ${r} ke mausam mein farq`,
    hot: (m, n, r, d, a, b) => d === 0 ? `${m} mein dono shehron ka din ka taapmaan lagbhag barabar rehta hai (${a}°C).` : `${m} mein ${n} ka din ${r} se lagbhag ${Math.abs(d)}°C ${d > 0 ? 'zyada garam' : 'kam garam'} rehta hai (${a}°C vs ${b}°C).`,
    cold: (m, n, r, d, a, b) => d === 0 ? `${m} ki raatein dono jagah lagbhag ek jaisi thandi hoti hain (${a}°C).` : `${m} ki raatein ${n} mein ${Math.abs(d)}°C ${d < 0 ? 'zyada thandi' : 'kam thandi'} hoti hain (${a}°C vs ${b}°C).`,
    rain: (n, r, a, b, A, B) => Math.abs(A - B) < 0.1 * Math.max(A, B) ? `Saal bhar ki baarish dono jagah lagbhag barabar hai (kareeb ${a} mm).` : `${n} mein saal bhar mein ${A > B ? 'zyada' : 'kam'} baarish hoti hai — kareeb ${a} mm, jabki ${r} mein ${b} mm.`,
    wearH: (n) => `👕 ${n} mein kis mahine kya pehnein`,
    wear: { veryhot: 'Bahut garmi: sooti dheele kapde, topi/gamchha, paani saath rakhein; dopahar 12–4 dhoop se bachein.', hot: 'Garmi: halke sooti kapde, dhoop ka chashma, paani ki bottle.', rain: 'Baarish: chhata ya raincoat, jaldi sookhne wale kapde, grip wale joote.', pleasant: 'Suhana mausam: halke kapde kaafi hain; shaam ke liye ek patli layer.', cool: 'Halki thand: subah-shaam sweater ya halki jacket.', cold: 'Thand: garam jacket, topi, moze; buzurg aur bachchon ka khaas dhyan rakhein.' },
    tripH: (n) => `🧳 ${n} ke paas ghoomne ki jagah`, trip: (p, d) => `${p} (${d} km)`,
  },
  bn: {
    whereH: (n) => `📍 ${n} কোথায়`,
    cap: (n, cap, d, dir) => `${n} রাজ্যের রাজধানী ${cap} থেকে প্রায় ${d} কিমি ${dir} দিকে।`,
    big: (n, b, d, dir) => `সবচেয়ে কাছের বড় শহর ${b} — প্রায় ${d} কিমি, ${dir} দিকে।`,
    near: (xs) => `কাছের শহর: ${xs}।`, isCap: (n, st) => `${n} ${bnGen(st)} রাজধানী।`, kmU: 'কিমি',
    cmpH: (n, r) => `🌡️ ${n} আর ${bnGen(r)} আবহাওয়ার তফাত`,
    hot: (m, n, r, d, a, b) => d === 0 ? `${m} মাসে দুই শহরেই দিনের তাপমাত্রা প্রায় সমান (${a}°C)।` : `${m} মাসে ${bnLoc(n)} দিন ${bnGen(r)} চেয়ে প্রায় ${Math.abs(d)}°C ${d > 0 ? 'বেশি গরম' : 'কম গরম'} (${a}°C বনাম ${b}°C)।`,
    cold: (m, n, r, d, a, b) => d === 0 ? `${m} মাসের রাত দুই জায়গাতেই প্রায় সমান ঠান্ডা (${a}°C)।` : `${m} মাসের রাত ${bnLoc(n)} ${Math.abs(d)}°C ${d < 0 ? 'বেশি ঠান্ডা' : 'কম ঠান্ডা'} (${a}°C বনাম ${b}°C)।`,
    rain: (n, r, a, b, A, B) => Math.abs(A - B) < 0.1 * Math.max(A, B) ? `সারা বছরের বৃষ্টি দুই জায়গাতেই প্রায় সমান (প্রায় ${a} মিমি)।` : `${bnLoc(n)} বছরে ${A > B ? 'বেশি' : 'কম'} বৃষ্টি হয় — প্রায় ${a} মিমি, ${bnLoc(r)} ${b} মিমি।`,
    wearH: (n) => `👕 ${bnLoc(n)} কোন মাসে কী পরবেন`,
    wear: { veryhot: 'প্রচণ্ড গরম: ঢিলে সুতির জামা, টুপি/গামছা, জল সঙ্গে রাখুন; দুপুর ১২–৪টে রোদ এড়িয়ে চলুন।', hot: 'গরম: হালকা সুতির জামা, রোদচশমা, জলের বোতল।', rain: 'বর্ষা: ছাতা বা রেনকোট, তাড়াতাড়ি শুকোয় এমন জামা, পিছল-রোধী জুতো।', pleasant: 'মনোরম: হালকা জামাই যথেষ্ট; সন্ধের জন্য একটা পাতলা স্তর।', cool: 'হালকা ঠান্ডা: সকাল-সন্ধে সোয়েটার বা হালকা জ্যাকেট।', cold: 'ঠান্ডা: গরম জ্যাকেট, টুপি, মোজা; বয়স্ক আর শিশুদের বিশেষ যত্ন নিন।' },
    tripH: (n) => `🧳 ${bnGen(n)} কাছে বেড়ানোর জায়গা`, trip: (p, d) => `${p} (${d} কিমি)`,
  },
};
const ORDER = ['veryhot', 'hot', 'rain', 'pleasant', 'cool', 'cold'];
const kind = ([hi, lo, rain]) => (rain >= 150 ? 'rain' : hi >= 38 ? 'veryhot' : hi >= 33 ? 'hot' : lo < 8 ? 'cold' : lo < 14 ? 'cool' : 'pleasant');

/** The city-specific blocks for one weather page. h = { code, name(c), monthName(code,m), stateName(code,s), link(c, text), esc } */
export function cityExtra(c, h) {
  const { code, esc } = h, X = T[code], n = h.name(c), en = esc(n), cl = CLIMATE[c.slug];
  const dist = (o) => nf(code, r10(km(c, o)));
  const out = [];
  // 1. where
  const capC = bySlug.get(CAP[c.state]);
  const bigC = BIG.map((s) => bySlug.get(s)).filter((b) => b && b !== c && b !== capC).sort((a, b) => km(c, a) - km(c, b))[0];
  const near = CITIES.filter((x) => x !== c && x !== capC && x !== bigC).map((x) => [km(c, x), x]).filter(([d]) => d >= 5).sort((a, b) => a[0] - b[0]).slice(0, 4);
  const where = [];
  if (capC === c) where.push(X.isCap(en, esc(h.stateName(code, c.state))));
  else if (capC) where.push(X.cap(en, h.link(capC, h.name(capC)), dist(capC), DIRS[code][dirIdx(capC, c)]));
  if (bigC && !BIG.includes(c.slug) && km(c, bigC) < 600) where.push(X.big(en, h.link(bigC, h.name(bigC)), dist(bigC), DIRS[code][dirIdx(c, bigC)]));
  if (near.length) where.push(X.near(near.map(([d, x]) => `${h.link(x, h.name(x))} (${nf(code, r10(d))} ${X.kmU})`).join(', ')));
  out.push(`<h2>${esc(X.whereH(n))}</h2><p>${where.join(' ')}</p>`);
  if (!cl) return out.join('\n');
  // 2. compare with the nearest big city (Delhi/Mumbai for the big cities themselves)
  const ref = BIG.includes(c.slug) ? bySlug.get(c.slug === 'delhi' ? 'mumbai' : 'delhi') : BIG.map((s) => bySlug.get(s)).filter((b) => b && CLIMATE[b.slug]).sort((a, b) => km(c, a) - km(c, b))[0];
  const rc = ref && CLIMATE[ref.slug];
  if (rc) {
    const hot = cl.reduce((b, r, i) => (r[0] > cl[b][0] ? i : b), 0), cold = cl.reduce((b, r, i) => (r[1] < cl[b][1] ? i : b), 0);
    const a1 = Math.round(cl[hot][0]), b1 = Math.round(rc[hot][0]), a2 = Math.round(cl[cold][1]), b2 = Math.round(rc[cold][1]);
    const ra = cl.reduce((s, r) => s + r[2], 0), rb = rc.reduce((s, r) => s + r[2], 0);
    const rn = esc(h.name(ref)), m = (i) => esc(h.monthName(code, i));
    out.push(`<h2>${esc(X.cmpH(n, h.name(ref)))}</h2><ul><li>${X.hot(m(hot), esc(n), rn, a1 - b1, a1, b1)}</li><li>${X.cold(m(cold), esc(n), rn, a2 - b2, a2, b2)}</li><li>${X.rain(esc(n), rn, nf(code, Math.round(ra / 10) * 10), nf(code, Math.round(rb / 10) * 10), ra, rb)}</li></ul>`);
  }
  // 3. what to wear
  const groups = {};
  cl.forEach((r, i) => (groups[kind(r)] ||= []).push(i));
  out.push(`<h2>${esc(X.wearH(n))}</h2><ul class="wx-tips">${ORDER.filter((k) => groups[k]).map((k) => `<li>${groups[k].map((i) => esc(h.monthName(code, i))).join(', ')} — <span style="font-weight:400">${esc(X.wear[k])}</span></li>`).join('')}</ul>`);
  // 4. travel places nearby
  const trips = CITIES.filter((x) => x !== c && TRAVEL.has(x.slug)).map((x) => [km(c, x), x]).filter(([d]) => d <= 300).sort((a, b) => a[0] - b[0]).slice(0, 3);
  if (trips.length) out.push(`<h2>${esc(X.tripH(n))}</h2><ul>${trips.map(([d, x]) => `<li><b>${h.link(x, h.name(x))}</b> (${nf(code, r10(d))} ${X.kmU}) — ${esc(TRAVEL.get(x.slug)[code])}</li>`).join('')}</ul>`);
  return out.join('\n');
}
