/**
 * Weather pages (plan item I1, user 24 Nov 2026: "karo"): /mausam/ + /mausam/<city>/ for ~600 Indian cities.
 * - Live forecast in the browser from MET Norway (api.met.no, CC BY 4.0, commercial use allowed) — src/assets/weather.js
 * - Static, crawlable part: month-wise climate (NASA POWER daily data 2015–2024, averaged), a short write-up made from
 *   those numbers, best months to visit, nearby cities, FAQ.
 * City list: GeoNames (CC BY 4.0) + Wikidata names (CC0). Data files: src/weather-cities.mjs (made by a one-off script).
 */
import { CITIES, CLIMATE } from './weather-cities.mjs';
import { PLACES } from './travel-places.mjs';
const TRAVEL = Object.fromEntries(PLACES.map(([s, , text]) => [s, text]));
const TRAVEL_T = { hi: ['घूमने के लिए', 'किस महीने कहाँ घूमें →'], en: ['For travellers', 'Where to go in which month →'], hinglish: ['Ghoomne ke liye', 'Kis mahine kahan ghoomein →'], bn: ['বেড়াতে গেলে', 'কোন মাসে কোথায় যাবেন →'] };

export { CITIES };

const STATES = {
  'Andaman and Nicobar': ['अंडमान और निकोबार', 'আন্দামান ও নিকোবর'], 'Andhra Pradesh': ['आंध्र प्रदेश', 'অন্ধ্রপ্রদেশ'], 'Arunachal Pradesh': ['अरुणाचल प्रदेश', 'অরুণাচলপ্রদেশ'],
  Assam: ['असम', 'আসাম'], Bihar: ['बिहार', 'বিহার'], Chandigarh: ['चंडीगढ़', 'চণ্ডীগড়'], Chhattisgarh: ['छत्तीसगढ़', 'ছত্তিশগড়'],
  'Dadra and Nagar Haveli and Daman and Diu': ['दादरा-नगर हवेली और दमन-दीव', 'দাদরা ও নগর হাভেলি এবং দমন ও দিউ'], Delhi: ['दिल्ली', 'দিল্লি'], Goa: ['गोवा', 'গোয়া'],
  Gujarat: ['गुजरात', 'গুজরাত'], Haryana: ['हरियाणा', 'হরিয়ানা'], 'Himachal Pradesh': ['हिमाचल प्रदेश', 'হিমাচলপ্রদেশ'], 'Jammu and Kashmir': ['जम्मू और कश्मीर', 'জম্মু ও কাশ্মীর'],
  Jharkhand: ['झारखंड', 'ঝাড়খণ্ড'], Karnataka: ['कर्नाटक', 'কর্ণাটক'], Kerala: ['केरल', 'কেরল'], Ladakh: ['लद्दाख', 'লাদাখ'], 'Madhya Pradesh': ['मध्य प्रदेश', 'মধ্যপ্রদেশ'],
  Maharashtra: ['महाराष्ट्र', 'মহারাষ্ট্র'], Manipur: ['मणिपुर', 'মণিপুর'], Meghalaya: ['मेघालय', 'মেঘালয়'], Mizoram: ['मिज़ोरम', 'মিজোরাম'], Nagaland: ['नागालैंड', 'নাগাল্যান্ড'],
  Odisha: ['ओडिशा', 'ওড়িশা'], Puducherry: ['पुदुचेरी', 'পুদুচেরি'], Punjab: ['पंजाब', 'পাঞ্জাব'], Rajasthan: ['राजस्थान', 'রাজস্থান'], Sikkim: ['सिक्किम', 'সিকিম'],
  'Tamil Nadu': ['तमिलनाडु', 'তামিলনাড়ু'], Telangana: ['तेलंगाना', 'তেলেঙ্গানা'], Tripura: ['त्रिपुरा', 'ত্রিপুরা'], 'Uttar Pradesh': ['उत्तर प्रदेश', 'উত্তরপ্রদেশ'],
  Uttarakhand: ['उत्तराखंड', 'উত্তরাখণ্ড'], 'West Bengal': ['पश्चिम बंगाल', 'পশ্চিমবঙ্গ'],
};
export const stateName = (code, s) => (code === 'hi' ? STATES[s]?.[0] : code === 'bn' ? STATES[s]?.[1] : null) || s;
export const cityName = (code, c) => (code === 'hi' ? c.hi : code === 'bn' ? c.bn || c.en : c.en);

// Bengali case endings: কলকাতা → কলকাতার / কলকাতায়, দিল্লি → দিল্লির / দিল্লিতে, পাটনা → পাটনার, শিলং → শিলং-এর / শিলং-এ
const bnGen = (n) => (/[া-ৌ]$/.test(n) ? `${n}র` : `${n}-এর`);
const bnLoc = (n) => (/া$/.test(n) ? `${n}য়` : /[ি-ৌ]$/.test(n) ? `${n}তে` : `${n}-এ`);
const LOC = { hi: 'hi-IN', bn: 'bn-IN', en: 'en-IN', hinglish: 'en-IN' };
export const monthName = (code, m) => new Intl.DateTimeFormat(LOC[code], { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2027, m, 15));
const list = (code, xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${{ hi: 'और', bn: 'আর', en: 'and', hinglish: 'aur' }[code]} ${xs[xs.length - 1]}`);

export const WT = {
  hi: {
    nav: 'मौसम',
    hubTitle: 'आज का मौसम — भारत के 600+ शहरों का मौसम, कल और 10 दिन का हाल | NextGrade',
    hubDesc: 'अपने शहर का आज का मौसम देखें: अभी का तापमान, बारिश होगी या नहीं, कल का मौसम और 10 दिन का पूर्वानुमान। दिल्ली, पटना, लखनऊ, मुंबई, कोलकाता समेत 600+ शहर, हिंदी में।',
    hubH1: '🌦️ आज का मौसम — अपना शहर चुनें',
    hubLead: 'भारत के 600 से ज़्यादा शहरों का मौसम हिंदी में: अभी कितनी ठंड या गर्मी है, बारिश होगी या नहीं, छाता ले जाएँ या नहीं, और अगले 10 दिन का हाल।',
    search: 'शहर का नाम लिखें…', near: '📍 मेरे शहर का मौसम', nearWait: 'आपकी जगह ढूँढ रहे हैं…', nearErr: 'जगह नहीं मिल पाई — नीचे से अपना शहर चुनें।',
    popular: 'बड़े शहर', byState: 'राज्य के हिसाब से शहर', tourH: 'घूमने की जगहें',
    title: (n, en) => `${n} का मौसम आज — ${en} Weather Today, कल और 10 दिन का मौसम | NextGrade`,
    desc: (n) => `${n} का आज का मौसम: अभी का तापमान, आज-कल बारिश होगी या नहीं, छाता ले जाएँ या नहीं, घंटे-घंटे का और 10 दिन का पूर्वानुमान। साथ में ${n} का महीनेवार औसत तापमान और बारिश।`,
    h1: (n) => `🌦️ ${n} का मौसम आज`,
    lead: (n, st) => `${n} (${st}) का अभी का मौसम, आज और कल का हाल, और अगले 10 दिन का पूर्वानुमान — हर घंटे अपडेट।`,
    climH: (n) => `${n} का महीनेवार मौसम (औसत)`,
    cols: ['महीना', 'दिन में (अधिकतम)', 'रात में (न्यूनतम)', 'बारिश', 'बारिश वाले दिन'], mm: 'मिमी',
    climNote: 'ये पिछले 10 साल (2015–2024) के NASA POWER उपग्रह आँकड़ों का औसत है। किसी एक दिन का तापमान इससे अलग हो सकता है।',
    about: (n, hot, hotT, cold, coldT, wet, total) => `${n} में सबसे ज़्यादा गर्मी ${hot} में पड़ती है — तब दिन का औसत तापमान लगभग ${hotT}°C रहता है। सबसे ठंडा महीना ${cold} है, जब रात में पारा औसतन ${coldT}°C तक गिर जाता है। ज़्यादातर बारिश ${wet} में होती है; पूरे साल में लगभग ${total} मिमी बारिश होती है।`,
    best: (n, ms) => (ms ? `${n} घूमने के लिए सबसे आरामदायक मौसम: ${ms}।` : ''),
    bestH: 'घूमने का अच्छा समय', aboutH: (n) => `${n} का मौसम कैसा रहता है?`,
    nearH: 'आसपास के शहरों का मौसम', allH: 'सभी शहर', faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: (n, hot, cold, wet) => [
      [`${n} में आज बारिश होगी?`, `ऊपर "आज" वाले हिस्से में बारिश (मिमी) और छाते वाली सलाह देखें। यह पूर्वानुमान हर घंटे अपडेट होता है।`],
      [`${n} में सबसे ज़्यादा गर्मी कब पड़ती है?`, `आमतौर पर ${hot} में।`],
      [`${n} में सबसे ज़्यादा ठंड कब पड़ती है?`, `आमतौर पर ${cold} में।`],
      [`${n} में बारिश कब होती है?`, `ज़्यादातर बारिश ${wet} में होती है।`],
    ],
    source: 'पूर्वानुमान: MET Norway (CC BY 4.0) · महीनेवार औसत: NASA POWER · शहरों की जानकारी: GeoNames, Wikidata',
  },
  hinglish: {
    nav: 'Mausam',
    hubTitle: 'Aaj ka Mausam — India ke 600+ shehron ka mausam, kal aur 10 din ka | NextGrade',
    hubDesc: 'Apne sheher ka aaj ka mausam dekhein: abhi ka temperature, baarish hogi ya nahi, kal ka mausam aur 10 din ka forecast. Delhi, Patna, Lucknow, Mumbai, Kolkata samet 600+ sheher.',
    hubH1: '🌦️ Aaj ka Mausam — apna sheher chunein',
    hubLead: 'India ke 600 se zyada shehron ka mausam: abhi kitni thand ya garmi hai, baarish hogi ya nahi, chhata le jaayein ya nahi, aur agle 10 din ka haal.',
    search: 'Sheher ka naam likhein…', near: '📍 Mere sheher ka mausam', nearWait: 'Aapki location dhoondh rahe hain…', nearErr: 'Location nahi mili — neeche se apna sheher chunein.',
    popular: 'Bade sheher', byState: 'State ke hisaab se sheher', tourH: 'Ghoomne ki jagahein',
    title: (n) => `${n} ka Mausam Aaj — ${n} Weather Today, Kal aur 10 Din ka Mausam | NextGrade`,
    desc: (n) => `${n} ka aaj ka mausam: abhi ka temperature, aaj-kal baarish hogi ya nahi, chhata le jaayein ya nahi, hourly aur 10 din ka forecast. Saath mein ${n} ka mahine-war average temperature aur baarish.`,
    h1: (n) => `🌦️ ${n} ka Mausam Aaj`,
    lead: (n, st) => `${n} (${st}) ka abhi ka mausam, aaj aur kal ka haal, aur agle 10 din ka forecast — har ghante update.`,
    climH: (n) => `${n} ka mahine-war mausam (average)`,
    cols: ['Mahina', 'Din mein (max)', 'Raat mein (min)', 'Baarish', 'Baarish wale din'], mm: 'mm',
    climNote: 'Yeh pichhle 10 saal (2015–2024) ke NASA POWER satellite data ka average hai. Kisi ek din ka temperature isse alag ho sakta hai.',
    about: (n, hot, hotT, cold, coldT, wet, total) => `${n} mein sabse zyada garmi ${hot} mein padti hai — tab din ka average temperature lagbhag ${hotT}°C rehta hai. Sabse thanda mahina ${cold} hai, jab raat mein paara average ${coldT}°C tak gir jaata hai. Zyaadatar baarish ${wet} mein hoti hai; poore saal mein lagbhag ${total} mm baarish hoti hai.`,
    best: (n, ms) => (ms ? `${n} ghoomne ke liye sabse aaraamdaayak mausam: ${ms}.` : ''),
    bestH: 'Ghoomne ka achha samay', aboutH: (n) => `${n} ka mausam kaisa rehta hai?`,
    nearH: 'Aaspaas ke shehron ka mausam', allH: 'Sabhi sheher', faqH: 'Aksar poochhe jaane wale sawaal',
    faq: (n, hot, cold, wet) => [
      [`${n} mein aaj baarish hogi?`, `Upar "Aaj" wale hisse mein baarish (mm) aur chhate wali salaah dekhein. Yeh forecast har ghante update hota hai.`],
      [`${n} mein sabse zyada garmi kab padti hai?`, `Aamtaur par ${hot} mein.`],
      [`${n} mein sabse zyada thand kab padti hai?`, `Aamtaur par ${cold} mein.`],
      [`${n} mein baarish kab hoti hai?`, `Zyaadatar baarish ${wet} mein hoti hai.`],
    ],
    source: 'Forecast: MET Norway (CC BY 4.0) · Mahine-war average: NASA POWER · Shehron ki jaankari: GeoNames, Wikidata',
  },
  en: {
    nav: 'Weather',
    hubTitle: 'Weather Today — 600+ Indian Cities, Tomorrow and 10-Day Forecast | NextGrade',
    hubDesc: "Today's weather for your city: current temperature, will it rain, tomorrow's weather and a 10-day forecast. Delhi, Mumbai, Bengaluru, Kolkata, Patna and 600+ Indian cities.",
    hubH1: '🌦️ Weather Today — pick your city',
    hubLead: 'Weather for more than 600 Indian cities: how hot or cold it is right now, will it rain, do you need an umbrella, and the next 10 days.',
    search: 'Type a city name…', near: '📍 Weather where I am', nearWait: 'Finding your location…', nearErr: 'Could not find your location — pick your city below.',
    popular: 'Big cities', byState: 'Cities by state', tourH: 'Travel destinations',
    title: (n) => `${n} Weather Today — Tomorrow, Rain and 10-Day Forecast | NextGrade`,
    desc: (n) => `${n} weather today: current temperature, will it rain today or tomorrow, do you need an umbrella, hourly and 10-day forecast — plus ${n}'s month-by-month average temperature and rainfall.`,
    h1: (n) => `🌦️ ${n} Weather Today`,
    lead: (n, st) => `Current weather in ${n} (${st}), today and tomorrow, and the next 10 days — updated every hour.`,
    climH: (n) => `${n} weather by month (averages)`,
    cols: ['Month', 'Day (high)', 'Night (low)', 'Rain', 'Rainy days'], mm: 'mm',
    climNote: 'Averages of NASA POWER satellite data for the last 10 years (2015–2024). Any single day can differ.',
    about: (n, hot, hotT, cold, coldT, wet, total) => `${n} is hottest in ${hot}, when daytime highs average about ${hotT}°C. The coldest month is ${cold}, with nights averaging ${coldT}°C. Most rain falls in ${wet}; the yearly total is about ${total} mm.`,
    best: (n, ms) => (ms ? `The most comfortable months to visit ${n}: ${ms}.` : ''),
    bestH: 'Best time to visit', aboutH: (n) => `What is the weather like in ${n}?`,
    nearH: 'Weather in nearby cities', allH: 'All cities', faqH: 'Frequently asked questions',
    faq: (n, hot, cold, wet) => [
      [`Will it rain in ${n} today?`, 'See the rain amount (mm) and the umbrella tip in the "Today" box above. The forecast updates every hour.'],
      [`What is the hottest month in ${n}?`, `Usually ${hot}.`],
      [`What is the coldest month in ${n}?`, `Usually ${cold}.`],
      [`When does it rain in ${n}?`, `Most rain falls in ${wet}.`],
    ],
    source: 'Forecast: MET Norway (CC BY 4.0) · Monthly averages: NASA POWER · City data: GeoNames, Wikidata',
  },
  bn: {
    nav: 'আবহাওয়া',
    hubTitle: 'আজকের আবহাওয়া — ভারতের ৬০০+ শহর, কাল আর ১০ দিনের পূর্বাভাস | NextGrade',
    hubDesc: 'আপনার শহরের আজকের আবহাওয়া: এখনকার তাপমাত্রা, বৃষ্টি হবে কি না, কালকের আবহাওয়া আর ১০ দিনের পূর্বাভাস। কলকাতা, শিলিগুড়ি, দিল্লি, মুম্বইসহ ৬০০+ শহর, বাংলায়।',
    hubH1: '🌦️ আজকের আবহাওয়া — আপনার শহর বেছে নিন',
    hubLead: 'ভারতের ৬০০-র বেশি শহরের আবহাওয়া বাংলায়: এখন কতটা ঠান্ডা বা গরম, বৃষ্টি হবে কি না, ছাতা নেবেন কি না, আর পরের ১০ দিন।',
    search: 'শহরের নাম লিখুন…', near: '📍 আমার শহরের আবহাওয়া', nearWait: 'আপনার জায়গা খোঁজা হচ্ছে…', nearErr: 'জায়গা পাওয়া গেল না — নিচ থেকে শহর বেছে নিন।',
    popular: 'বড় শহর', byState: 'রাজ্য অনুযায়ী শহর', tourH: 'বেড়ানোর জায়গা',
    title: (n, en) => `${n} — আজকের আবহাওয়া, ${en} Weather Today, কাল ও ১০ দিনের পূর্বাভাস | NextGrade`,
    desc: (n) => `${n}: আজকের আবহাওয়া, এখনকার তাপমাত্রা, আজ-কাল বৃষ্টি হবে কি না, ছাতা লাগবে কি না, ঘণ্টা ধরে আর ১০ দিনের পূর্বাভাস। সঙ্গে মাস অনুযায়ী গড় তাপমাত্রা আর বৃষ্টি।`,
    h1: (n) => `🌦️ ${n} — আজকের আবহাওয়া`,
    lead: (n, st) => `${n} (${st}): এখনকার আবহাওয়া, আজ আর কাল, আর পরের ১০ দিনের পূর্বাভাস — প্রতি ঘণ্টায় আপডেট।`,
    climH: (n) => `${n}: মাস অনুযায়ী আবহাওয়া (গড়)`,
    cols: ['মাস', 'দিনে (সর্বোচ্চ)', 'রাতে (সর্বনিম্ন)', 'বৃষ্টি', 'বৃষ্টির দিন'], mm: 'মিমি',
    climNote: 'গত ১০ বছরের (২০১৫–২০২৪) NASA POWER উপগ্রহ তথ্যের গড়। কোনো একটা দিনের তাপমাত্রা আলাদা হতে পারে।',
    about: (n, hot, hotT, cold, coldT, wet, total) => `${bnLoc(n)} সবচেয়ে গরম পড়ে ${hot} মাসে — তখন দিনের গড় তাপমাত্রা প্রায় ${hotT}°C। সবচেয়ে ঠান্ডা মাস ${cold}, তখন রাতে পারদ গড়ে ${coldT}°C পর্যন্ত নামে। বেশিরভাগ বৃষ্টি হয় ${wet} মাসে; সারা বছরে প্রায় ${total} মিমি বৃষ্টি হয়।`,
    best: (n, ms) => (ms ? `${n} বেড়ানোর সবচেয়ে আরামের সময়: ${ms}।` : ''),
    bestH: 'বেড়ানোর ভালো সময়', aboutH: (n) => `${bnGen(n)} আবহাওয়া কেমন থাকে?`,
    nearH: 'কাছের শহরের আবহাওয়া', allH: 'সব শহর', faqH: 'প্রায়ই জিজ্ঞেস করা প্রশ্ন',
    faq: (n, hot, cold, wet) => [
      [`${bnLoc(n)} আজ বৃষ্টি হবে?`, 'ওপরের "আজ" অংশে বৃষ্টির পরিমাণ (মিমি) আর ছাতার পরামর্শ দেখুন। পূর্বাভাস প্রতি ঘণ্টায় আপডেট হয়।'],
      [`${bnLoc(n)} সবচেয়ে গরম কখন?`, `সাধারণত ${hot} মাসে।`],
      [`${bnLoc(n)} সবচেয়ে ঠান্ডা কখন?`, `সাধারণত ${cold} মাসে।`],
      [`${bnLoc(n)} বৃষ্টি কখন হয়?`, `বেশিরভাগ বৃষ্টি হয় ${wet} মাসে।`],
    ],
    source: 'পূর্বাভাস: MET Norway (CC BY 4.0) · মাসিক গড়: NASA POWER · শহরের তথ্য: GeoNames, Wikidata',
  },
};

const km = (a, b) => { const p = Math.PI / 180, x = (b.lon - a.lon) * p * Math.cos(((a.lat + b.lat) / 2) * p), y = (b.lat - a.lat) * p; return 6371 * Math.hypot(x, y); };
const BIG = ['delhi', 'mumbai', 'kolkata', 'bengaluru', 'chennai', 'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'lucknow', 'patna', 'kanpur', 'varanasi', 'prayagraj', 'bhopal', 'indore', 'nagpur', 'ranchi', 'guwahati', 'bhubaneswar', 'chandigarh', 'dehradun', 'surat', 'siliguri'];

/** Build every weather page. ctx = the helpers from build.mjs. */
export function buildWeather(L, { page, write, P, esc, T, breadcrumbLd, V }) {
  const W = WT[L.code], code = L.code;
  const name = (c) => cityName(code, c);
  const byPop = [...CITIES].sort((a, b) => b.pop - a.pop);
  const big = BIG.map((s) => CITIES.find((c) => c.slug === s)).filter(Boolean);
  const css = `<style>.wx-now{display:flex;gap:16px;align-items:center;flex-wrap:wrap;padding:16px;border-radius:18px;background:linear-gradient(135deg,rgba(51,154,240,.16),rgba(245,159,0,.12));margin:12px 0}.wx-big{font-size:3rem;font-weight:800;line-height:1}.wx-ico{font-size:3.2rem}.wx-sub{opacity:.85}.wx-tips{list-style:none;padding:0;margin:10px 0}.wx-tips li{padding:8px 12px;border-radius:12px;background:rgba(128,128,128,.1);margin:6px 0;font-weight:600}.wx-hours{display:flex;gap:8px;overflow-x:auto;padding:6px 0 10px}.wx-hours div{min-width:64px;text-align:center;padding:8px 4px;border:1px solid rgba(128,128,128,.25);border-radius:12px;font-size:.85rem}.wx-hours b{display:block;font-size:1.05rem}.wx-days td,.wx-days th,.wx-clim td,.wx-clim th{padding:6px 8px;text-align:center}.wx-days td:first-child,.wx-clim td:first-child{text-align:start}.wx-days,.wx-clim{width:100%;border-collapse:collapse}.wx-days tr,.wx-clim tr{border-bottom:1px solid rgba(128,128,128,.2)}.wx-clim tr.cur{background:rgba(245,159,0,.16);font-weight:700}.wx-list{columns:2 150px;padding-left:18px}.wx-find{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.wx-find input{flex:1 1 220px;padding:12px;border-radius:12px;border:1px solid rgba(128,128,128,.4);font:inherit;background:transparent;color:inherit}.wx-src{font-size:.8rem;opacity:.75}.wx-state h3{margin:18px 0 4px}</style>`;

  // hub
  const hub = '/mausam/';
  const states = [...new Set(CITIES.map((c) => c.state))].sort((a, b) => stateName(code, a).localeCompare(stateName(code, b), LOC[code]));
  const link = (c) => `<a href="${P(L, `${hub}${c.slug}/`)}">${esc(name(c))}</a>`;
  write(L, hub, page(L, {
    path: hub, title: W.hubTitle, description: W.hubDesc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [W.nav, hub]]), { '@context': 'https://schema.org', '@type': 'ItemList', name: W.hubH1.replace(/^\S+\s/, ''), itemListElement: big.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://nextgrade.in${P(L, `${hub}${c.slug}/`)}`, name: name(c) })) }],
    body: `${css}<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(W.nav)}</p>
<h1>${esc(W.hubH1)}</h1>
<p class="lead">${esc(W.hubLead)}</p>
<div class="wx-find"><input id="wx-q" type="search" placeholder="${esc(W.search)}" aria-label="${esc(W.search)}" list="wx-dl"><button class="btn btn-primary" id="wx-near" type="button">${esc(W.near)}</button></div>
<p id="wx-msg" class="note" hidden></p>
<datalist id="wx-dl">${byPop.map((c) => `<option value="${esc(name(c))}">`).join('')}</datalist>
<script type="application/json" id="wx-cities">${JSON.stringify(CITIES.map((c) => [c.slug, name(c), c.en, c.lat, c.lon]))}</script>
<div id="wx" data-mode="hub" data-lang="${code}" data-base="${P(L, hub)}" data-msg='${esc(JSON.stringify({ wait: W.nearWait, err: W.nearErr }))}'></div>
<h2>${esc(W.popular)}</h2>
<p class="chips">${big.map((c) => `<a class="tag" href="${P(L, `${hub}${c.slug}/`)}">${esc(name(c))}</a>`).join(' ')}</p>
<h2>${esc(W.tourH)}</h2>
<p class="chips">${CITIES.filter((c) => c.tour).map((c) => `<a class="tag" href="${P(L, `${hub}${c.slug}/`)}">${esc(name(c))}</a>`).join(' ')}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(W.byState)}</h2>
${states.map((s) => `<div class="wx-state"><h3>${esc(stateName(code, s))}</h3><ul class="wx-list">${CITIES.filter((c) => c.state === s).sort((a, b) => b.pop - a.pop).map((c) => `<li>${link(c)}</li>`).join('')}</ul></div>`).join('\n')}
<p class="wx-src">${esc(W.source)}</p>
</div>`,
    scripts: ['/assets/weather.js'],
  }));

  // city pages
  for (const c of CITIES) {
    const path = `${hub}${c.slug}/`, n = name(c), st = stateName(code, c.state), cl = CLIMATE[c.slug];
    const near = CITIES.filter((x) => x !== c).map((x) => [km(c, x), x]).sort((a, b) => a[0] - b[0]).slice(0, 8).map(([, x]) => x);
    let climate = '', aboutP = '', faqList = [];
    if (cl) {
      const M = (m) => monthName(code, m);
      const hot = cl.reduce((b, r, i) => (r[0] > cl[b][0] ? i : b), 0), cold = cl.reduce((b, r, i) => (r[1] < cl[b][1] ? i : b), 0);
      const total = cl.reduce((s, r) => s + r[2], 0);
      const wetIdx = cl.map((r, i) => [r[2], i]).sort((a, b) => b[0] - a[0]).slice(0, 3).filter(([v]) => v >= 40).map(([, i]) => i).sort((a, b) => a - b);
      const wet = wetIdx.length ? list(code, wetIdx.map(M)) : M(cl.reduce((b, r, i) => (r[2] > cl[b][2] ? i : b), 0));
      const good = cl.map((r, i) => (r[0] <= 33 && r[0] >= 15 && r[1] >= 5 && r[2] < 120 ? i : -1)).filter((i) => i >= 0);
      aboutP = `<h2>${esc(W.aboutH(n))}</h2><p>${esc(W.about(n, M(hot), Math.round(cl[hot][0]), M(cold), Math.round(cl[cold][1]), wet, Math.round(total / 10) * 10))}</p>${good.length ? `<h3>${esc(W.bestH)}</h3><p>${esc(W.best(n, list(code, good.map(M))))}</p>` : ''}`;
      climate = `<h2>${esc(W.climH(n))}</h2><div class="table-wrap"><table class="wx-clim"><tr>${W.cols.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${cl.map((r, i) => `<tr data-m="${i}"><td>${esc(M(i))}</td><td>${Math.round(r[0])}°C</td><td>${Math.round(r[1])}°C</td><td>${r[2]} ${esc(W.mm)}</td><td>${Math.round(r[3])}</td></tr>`).join('')}</table></div><p class="note">${esc(W.climNote)}</p>`;
      faqList = W.faq(n, M(hot), M(cold), wet);
    }
    write(L, path, page(L, {
      path, title: W.title(n, c.en), description: W.desc(n),
      jsonLd: [
        breadcrumbLd(L, [[T.nav.home, '/'], [W.nav, hub], [n, path]]),
        { '@context': 'https://schema.org', '@type': 'Place', name: n, alternateName: c.en, address: { '@type': 'PostalAddress', addressRegion: c.state, addressCountry: 'IN' }, geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lon } },
        ...(faqList.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqList.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] : []),
      ],
      body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(W.nav)}</a> › ${esc(n)}</p>
<h1>${esc(W.h1(n))}</h1>
<p class="lead">${esc(st === n ? W.lead(n, '').replace(/ ?\(\)/, '') : W.lead(n, st))}</p>
<div id="wx" data-mode="city" data-lang="${code}" data-lat="${c.lat}" data-lon="${c.lon}" data-slug="${c.slug}" data-name="${esc(n)}"></div>
<div class="ad" aria-hidden="true"></div>
${TRAVEL[c.slug] ? `<h2>🧳 ${esc(TRAVEL_T[code][0])}</h2><p>${esc(TRAVEL[c.slug][code])} <a href="${P(L, '/ghoomne-ki-jagah/')}">${esc(TRAVEL_T[code][1])}</a></p>` : ''}
${aboutP}
${climate}
<h2>${esc(W.nearH)}</h2>
<p class="chips">${near.map((x) => `<a class="tag" href="${P(L, `${hub}${x.slug}/`)}">${esc(name(x))}</a>`).join(' ')} <a class="tag" href="${P(L, hub)}">${esc(W.allH)} →</a></p>
${faqList.length ? `<h2>${esc(W.faqH)}</h2>${faqList.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n')}` : ''}
<p class="wx-src">${esc(W.source)}</p>
</div>`,
      scripts: ['/assets/weather.js'],
    }));
  }
}
