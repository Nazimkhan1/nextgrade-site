/**
 * World time + currency to rupee (plan R3, 26 Nov 2026 — families with someone in the Gulf / abroad):
 * /time/<place>/ live clocks (Intl time zones, DST handled), /currency/<code>-to-inr/ with daily rates.
 * Rates: ExchangeRate-API open access (https://www.exchangerate-api.com, attribution on page), fetched once per build
 * (the daily release) and cached in src/fx-cache.json so a failed fetch never breaks the build.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export const PLACES = [
  ['dubai', 'Asia/Dubai', '🇦🇪', { hi: 'दुबई (UAE)', en: 'Dubai (UAE)', hinglish: 'Dubai (UAE)', bn: 'দুবাই (UAE)' }],
  ['abu-dhabi', 'Asia/Dubai', '🇦🇪', { hi: 'अबू धाबी', en: 'Abu Dhabi', hinglish: 'Abu Dhabi', bn: 'আবু ধাবি' }],
  ['saudi-arabia', 'Asia/Riyadh', '🇸🇦', { hi: 'सऊदी अरब (रियाद, जेद्दा, मक्का)', en: 'Saudi Arabia (Riyadh, Jeddah, Makkah)', hinglish: 'Saudi Arabia (Riyadh, Jeddah, Makkah)', bn: 'সৌদি আরব (রিয়াদ, জেদ্দা, মক্কা)' }],
  ['qatar', 'Asia/Qatar', '🇶🇦', { hi: 'क़तर (दोहा)', en: 'Qatar (Doha)', hinglish: 'Qatar (Doha)', bn: 'কাতার (দোহা)' }],
  ['kuwait', 'Asia/Kuwait', '🇰🇼', { hi: 'कुवैत', en: 'Kuwait', hinglish: 'Kuwait', bn: 'কুয়েত' }],
  ['oman', 'Asia/Muscat', '🇴🇲', { hi: 'ओमान (मस्कट)', en: 'Oman (Muscat)', hinglish: 'Oman (Muscat)', bn: 'ওমান (মাস্কাট)' }],
  ['bahrain', 'Asia/Bahrain', '🇧🇭', { hi: 'बहरीन', en: 'Bahrain', hinglish: 'Bahrain', bn: 'বাহরাইন' }],
  ['london', 'Europe/London', '🇬🇧', { hi: 'लंदन (UK)', en: 'London (UK)', hinglish: 'London (UK)', bn: 'লন্ডন (UK)' }],
  ['new-york', 'America/New_York', '🇺🇸', { hi: 'न्यूयॉर्क (अमेरिका)', en: 'New York (USA)', hinglish: 'New York (USA)', bn: 'নিউ ইয়র্ক (USA)' }],
  ['california', 'America/Los_Angeles', '🇺🇸', { hi: 'कैलिफ़ोर्निया (अमेरिका)', en: 'California (USA)', hinglish: 'California (USA)', bn: 'ক্যালিফোর্নিয়া (USA)' }],
  ['toronto', 'America/Toronto', '🇨🇦', { hi: 'टोरंटो (कनाडा)', en: 'Toronto (Canada)', hinglish: 'Toronto (Canada)', bn: 'টরন্টো (কানাডা)' }],
  ['sydney', 'Australia/Sydney', '🇦🇺', { hi: 'सिडनी (ऑस्ट्रेलिया)', en: 'Sydney (Australia)', hinglish: 'Sydney (Australia)', bn: 'সিডনি (অস্ট্রেলিয়া)' }],
  ['singapore', 'Asia/Singapore', '🇸🇬', { hi: 'सिंगापुर', en: 'Singapore', hinglish: 'Singapore', bn: 'সিঙ্গাপুর' }],
  ['malaysia', 'Asia/Kuala_Lumpur', '🇲🇾', { hi: 'मलेशिया (कुआलालंपुर)', en: 'Malaysia (Kuala Lumpur)', hinglish: 'Malaysia (Kuala Lumpur)', bn: 'মালয়েশিয়া (কুয়ালালামপুর)' }],
  ['nepal', 'Asia/Kathmandu', '🇳🇵', { hi: 'नेपाल (काठमांडू)', en: 'Nepal (Kathmandu)', hinglish: 'Nepal (Kathmandu)', bn: 'নেপাল (কাঠমান্ডু)' }],
  ['bangladesh', 'Asia/Dhaka', '🇧🇩', { hi: 'बांग्लादेश (ढाका)', en: 'Bangladesh (Dhaka)', hinglish: 'Bangladesh (Dhaka)', bn: 'বাংলাদেশ (ঢাকা)' }],
  ['japan', 'Asia/Tokyo', '🇯🇵', { hi: 'जापान (टोक्यो)', en: 'Japan (Tokyo)', hinglish: 'Japan (Tokyo)', bn: 'জাপান (টোকিও)' }],
];
export const CURRENCIES = [
  ['USD', '🇺🇸', { hi: 'अमेरिकी डॉलर', en: 'US Dollar', hinglish: 'Dollar', bn: 'মার্কিন ডলার' }],
  ['AED', '🇦🇪', { hi: 'UAE दिरहम', en: 'UAE Dirham', hinglish: 'Dirham', bn: 'দিরহাম' }],
  ['SAR', '🇸🇦', { hi: 'सऊदी रियाल', en: 'Saudi Riyal', hinglish: 'Saudi Riyal', bn: 'সৌদি রিয়াল' }],
  ['QAR', '🇶🇦', { hi: 'क़तर रियाल', en: 'Qatari Riyal', hinglish: 'Qatar Riyal', bn: 'কাতারি রিয়াল' }],
  ['KWD', '🇰🇼', { hi: 'कुवैती दीनार', en: 'Kuwaiti Dinar', hinglish: 'Kuwaiti Dinar', bn: 'কুয়েতি দিনার' }],
  ['OMR', '🇴🇲', { hi: 'ओमानी रियाल', en: 'Omani Rial', hinglish: 'Omani Rial', bn: 'ওমানি রিয়াল' }],
  ['BHD', '🇧🇭', { hi: 'बहरीनी दीनार', en: 'Bahraini Dinar', hinglish: 'Bahraini Dinar', bn: 'বাহরাইনি দিনার' }],
  ['GBP', '🇬🇧', { hi: 'ब्रिटिश पाउंड', en: 'British Pound', hinglish: 'Pound', bn: 'ব্রিটিশ পাউন্ড' }],
  ['EUR', '🇪🇺', { hi: 'यूरो', en: 'Euro', hinglish: 'Euro', bn: 'ইউরো' }],
  ['CAD', '🇨🇦', { hi: 'कनाडाई डॉलर', en: 'Canadian Dollar', hinglish: 'Canadian Dollar', bn: 'কানাডিয়ান ডলার' }],
  ['AUD', '🇦🇺', { hi: 'ऑस्ट्रेलियाई डॉलर', en: 'Australian Dollar', hinglish: 'Australian Dollar', bn: 'অস্ট্রেলিয়ান ডলার' }],
  ['SGD', '🇸🇬', { hi: 'सिंगापुर डॉलर', en: 'Singapore Dollar', hinglish: 'Singapore Dollar', bn: 'সিঙ্গাপুর ডলার' }],
  ['MYR', '🇲🇾', { hi: 'मलेशियाई रिंगित', en: 'Malaysian Ringgit', hinglish: 'Ringgit', bn: 'মালয়েশিয়ান রিঙ্গিত' }],
  ['NPR', '🇳🇵', { hi: 'नेपाली रुपया', en: 'Nepalese Rupee', hinglish: 'Nepali Rupaya', bn: 'নেপালি রুপি' }],
  ['BDT', '🇧🇩', { hi: 'बांग्लादेशी टका', en: 'Bangladeshi Taka', hinglish: 'Taka', bn: 'টাকা' }],
  ['JPY', '🇯🇵', { hi: 'जापानी येन', en: 'Japanese Yen', hinglish: 'Yen', bn: 'জাপানি ইয়েন' }],
];

/** Rates: rupees per 1 unit. Fetch (8 s timeout) → cache; on failure use the cache. */
export async function loadRates() {
  const cacheFile = 'src/fx-cache.json';
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 8000);
    const r = await fetch('https://open.er-api.com/v6/latest/INR', { signal: ctl.signal }); clearTimeout(t);
    const d = await r.json();
    if (d.result !== 'success') throw new Error('bad');
    const rates = Object.fromEntries(CURRENCIES.map(([c]) => [c, 1 / d.rates[c]]));
    const out = { date: new Date(d.time_last_update_unix * 1000).toISOString().slice(0, 10), rates };
    writeFileSync(cacheFile, JSON.stringify(out, null, 1));
    return out;
  } catch {
    if (existsSync(cacheFile)) return JSON.parse(readFileSync(cacheFile, 'utf8'));
    return null;
  }
}

const offMin = (tz, ms) => { const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(new Date(ms)); const g = (k) => +p.find((x) => x.type === k).value; return (Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute')) - Math.floor(ms / 60000) * 60000) / 60000; };

// 1.5 → "1 घंटा 30 मिनट" etc.
const DUR = { hi: ['घंटे', 'मिनट'], hinglish: ['ghante', 'minute'], en: ['hours', 'minutes'], bn: ['ঘণ্টা', 'মিনিট'] };
const dur = (code, h) => { const t = Math.round(Math.abs(h) * 60), H = Math.floor(t / 60), M = t % 60, U = DUR[code]; return [H ? `${H} ${U[0]}` : '', M ? `${M} ${U[1]}` : ''].filter(Boolean).join(' '); };
const TX = {
  hi: {
    tNav: 'दुनिया का समय', cNav: 'विदेशी मुद्रा → रुपया',
    tHubTitle: 'दुबई, सऊदी, क़तर, अमेरिका में अभी कितना बजा है? — दुनिया का समय, भारत से अंतर | NextGrade', tHubDesc: 'दुबई, सऊदी अरब, क़तर, कुवैत, ओमान, लंदन, अमेरिका, कनाडा में अभी का समय — लाइव घड़ी, भारत से कितने घंटे आगे/पीछे और भारत के समय से तालिका।', tHubH1: '🕐 दुनिया का समय — अभी वहाँ कितना बजा है?',
    tTitle: (n) => `${n} में अभी कितना बजा है? — ${n} का समय और भारत से अंतर | NextGrade`, tDesc: (n, d) => `${n} का अभी का समय (लाइव घड़ी)। ${d}। भारत के हर घंटे पर वहाँ कितना बजता है — तालिका।`, tH1: (n) => `🕐 ${n} में अभी कितना बजा है?`,
    diff: (n, h) => (h === 0 ? `${n} और भारत का समय एक ही है` : h > 0 ? `भारत ${n} से ${dur('hi', h)} आगे है` : `भारत ${n} से ${dur('hi', h)} पीछे है`), dst: 'यहाँ गर्मियों में घड़ी 1 घंटा आगे होती है (Daylight Saving) — इसलिए अंतर साल में बदलता है; ऊपर की घड़ी हमेशा सही समय दिखाती है।', india: 'भारत', tableH: (n) => `भारत में … बजे तो ${n} में`, callH: '📞 घर फ़ोन करने का अच्छा समय', call: (n) => `${n} में शाम 6–9 बजे — भारत में तब भी रात ज़्यादा देर नहीं होती। ऊपर की तालिका से अपना समय मिलाएँ।`, nowIndia: 'भारत में अभी',
    cHubTitle: 'आज का रेट: दिरहम, रियाल, दीनार, डॉलर, पाउंड — रुपये में कितना? | NextGrade', cHubDesc: '1 दिरहम, 1 सऊदी रियाल, 1 कुवैती दीनार, 1 डॉलर, 1 पाउंड आज कितने रुपये का है — 16 मुद्राओं का रेट, कन्वर्टर और तालिका। रोज़ अपडेट।', cHubH1: '💱 विदेशी मुद्रा → भारतीय रुपया (आज का रेट)',
    cTitle: (n, c, v) => `1 ${n} (${c}) कितने रुपये? आज का रेट ₹${v} | ${c} to INR | NextGrade`, cDesc: (n, c, v, d) => `आज (${d}) 1 ${n} = ₹${v}। 1 से 1 लाख ${c} तक रुपये में तालिका, कन्वर्टर, और भेजते समय किन बातों का ध्यान रखें।`, cH1: (n, c) => `💱 1 ${n} (${c}) = कितने रुपये?`, ans: (n, c, v) => `1 ${c} = ₹${v}`, rateNote: (d) => `रेट ${d} का है (ExchangeRate-API से, रोज़ सुबह अपडेट)। बैंक, मनी एक्सचेंज और ऐप का रेट इससे थोड़ा कम-ज़्यादा होता है और फ़ीस अलग लगती है।`, amtL: 'रक़म', tableH: (c) => `${c} से रुपये — तालिका`, revH: (c) => `रुपये से ${c}`, sendH: '💡 घर पैसे भेजते समय', send: ['बैंक/ऐप का "exchange rate" और "fee" दोनों देखें — कुल कितने रुपये पहुँचेंगे, वही असली रेट है।', 'बड़ी रक़म हो तो 2–3 जगह रेट मिलाएँ।', 'सिर्फ़ लाइसेंस वाले बैंक/एक्सचेंज/ऐप से भेजें; हवाला ग़ैरक़ानूनी है।'], others: 'दूसरी मुद्राएँ', timeL: '🕐 वहाँ का समय', curL: '💱 वहाँ की मुद्रा', attr: 'Rates By Exchange Rate API',
  },
  hinglish: {
    tNav: 'Duniya ka time', cNav: 'Videshi currency → Rupaya',
    tHubTitle: 'Dubai, Saudi, Qatar, America mein Abhi Kitna Baja Hai? — World Time, India se Antar | NextGrade', tHubDesc: 'Dubai, Saudi Arabia, Qatar, Kuwait, Oman, London, America, Canada mein abhi ka time — live ghadi, India se kitne ghante aage/peechhe aur table.', tHubH1: '🕐 Duniya ka time — abhi wahan kitna baja hai?',
    tTitle: (n) => `${n} mein Abhi Kitna Baja Hai? — ${n} Time aur India se Antar | NextGrade`, tDesc: (n, d) => `${n} ka abhi ka time (live ghadi). ${d}. India ke har ghante par wahan kitna bajta hai — table.`, tH1: (n) => `🕐 ${n} mein abhi kitna baja hai?`,
    diff: (n, h) => (h === 0 ? `${n} aur India ka time ek hi hai` : h > 0 ? `India ${n} se ${dur('hinglish', h)} aage hai` : `India ${n} se ${dur('hinglish', h)} peechhe hai`), dst: 'Yahan garmiyon mein ghadi 1 ghanta aage hoti hai (Daylight Saving) — isliye antar saal mein badalta hai; upar ki ghadi hamesha sahi time dikhati hai.', india: 'India', tableH: (n) => `India mein … baje to ${n} mein`, callH: '📞 Ghar phone karne ka achha time', call: (n) => `${n} mein shaam 6–9 baje — India mein tab bhi raat zyada der nahi hoti. Upar ki table se apna time milaayein.`, nowIndia: 'India mein abhi',
    cHubTitle: 'Aaj ka Rate: Dirham, Riyal, Dinar, Dollar, Pound — Rupaye mein Kitna? | NextGrade', cHubDesc: '1 dirham, 1 Saudi riyal, 1 Kuwaiti dinar, 1 dollar, 1 pound aaj kitne rupaye ka hai — 16 currencies ka rate, converter aur table. Roz update.', cHubH1: '💱 Videshi currency → Indian Rupaya (aaj ka rate)',
    cTitle: (n, c, v) => `1 ${n} (${c}) Kitne Rupaye? Aaj ka Rate ₹${v} | ${c} to INR | NextGrade`, cDesc: (n, c, v, d) => `Aaj (${d}) 1 ${n} = ₹${v}. 1 se 1 lakh ${c} tak rupaye mein table, converter, aur bhejte samay kin baaton ka dhyaan rakhein.`, cH1: (n, c) => `💱 1 ${n} (${c}) = kitne rupaye?`, ans: (n, c, v) => `1 ${c} = ₹${v}`, rateNote: (d) => `Rate ${d} ka hai (ExchangeRate-API se, roz subah update). Bank, money exchange aur app ka rate isse thoda kam-zyada hota hai aur fees alag lagti hai.`, amtL: 'Rakam', tableH: (c) => `${c} se rupaye — table`, revH: (c) => `Rupaye se ${c}`, sendH: '💡 Ghar paise bhejte samay', send: ['Bank/app ka "exchange rate" aur "fee" dono dekhein — kul kitne rupaye pahunchenge, wahi asli rate hai.', 'Badi rakam ho to 2–3 jagah rate milaayein.', 'Sirf licence wale bank/exchange/app se bhejein; hawala gairkaanooni hai.'], others: 'Doosri currencies', timeL: '🕐 Wahan ka time', curL: '💱 Wahan ki currency', attr: 'Rates By Exchange Rate API',
  },
  en: {
    tNav: 'World time', cNav: 'Currency to rupee',
    tHubTitle: 'What Time Is It Now in Dubai, Saudi, Qatar, USA? — World Time and Difference from India | NextGrade', tHubDesc: 'Current time in Dubai, Saudi Arabia, Qatar, Kuwait, Oman, London, the USA and Canada — live clocks, hours ahead/behind India and a conversion table.', tHubH1: '🕐 World time — what time is it there now?',
    tTitle: (n) => `Time in ${n} Now — Current Time and Difference from India | NextGrade`, tDesc: (n, d) => `Current local time in ${n} (live clock). ${d}. What time it is there for every hour in India — table.`, tH1: (n) => `🕐 What time is it in ${n} now?`,
    diff: (n, h) => (h === 0 ? `${n} has the same time as India` : h > 0 ? `India is ${dur('en', h)} ahead of ${n}` : `India is ${dur('en', h)} behind ${n}`), dst: 'Clocks here go forward 1 hour in summer (daylight saving), so the difference changes during the year; the clock above always shows the right time.', india: 'India', tableH: (n) => `When it is … in India, in ${n} it is`, callH: '📞 Good time to call home', call: (n) => `6–9 pm in ${n} — usually not too late in India. Match your time with the table above.`, nowIndia: 'India now',
    cHubTitle: 'Today’s Rate: Dirham, Riyal, Dinar, Dollar, Pound in Indian Rupees | NextGrade', cHubDesc: 'How many rupees is 1 dirham, 1 Saudi riyal, 1 Kuwaiti dinar, 1 dollar or 1 pound today — rates for 16 currencies, converter and tables. Updated daily.', cHubH1: '💱 Foreign currency → Indian rupee (today’s rate)',
    cTitle: (n, c, v) => `1 ${c} to INR Today — 1 ${n} = ₹${v} | NextGrade`, cDesc: (n, c, v, d) => `Today (${d}) 1 ${n} = ₹${v}. Table from 1 to 1 lakh ${c} in rupees, converter, and what to check when sending money home.`, cH1: (n, c) => `💱 1 ${n} (${c}) in Indian rupees`, ans: (n, c, v) => `1 ${c} = ₹${v}`, rateNote: (d) => `Rate as of ${d} (from ExchangeRate-API, updated every morning). Banks, exchange houses and apps give slightly different rates and charge fees.`, amtL: 'Amount', tableH: (c) => `${c} to rupees — table`, revH: (c) => `Rupees to ${c}`, sendH: '💡 When sending money home', send: ['Compare the exchange rate AND the fee — the rupees that actually arrive are the real rate.', 'For big amounts, check 2–3 providers.', 'Use only licensed banks, exchange houses or apps; hawala is illegal.'], others: 'Other currencies', timeL: '🕐 Time there', curL: '💱 Currency there', attr: 'Rates By Exchange Rate API',
  },
  bn: {
    tNav: 'বিশ্বের সময়', cNav: 'বিদেশি মুদ্রা → টাকা',
    tHubTitle: 'দুবাই, সৌদি, কাতার, আমেরিকায় এখন কটা বাজে? — বিশ্বের সময়, ভারতের সঙ্গে তফাত | NextGrade', tHubDesc: 'দুবাই, সৌদি আরব, কাতার, কুয়েত, ওমান, লন্ডন, আমেরিকা, কানাডার এখনকার সময় — লাইভ ঘড়ি, ভারতের থেকে কত ঘণ্টা আগে/পিছে আর তালিকা।', tHubH1: '🕐 বিশ্বের সময় — সেখানে এখন কটা বাজে?',
    tTitle: (n) => `${n}-এ এখন কটা বাজে? — ${n}-এর সময় আর ভারতের সঙ্গে তফাত | NextGrade`, tDesc: (n, d) => `${n}-এর এখনকার সময় (লাইভ ঘড়ি)। ${d}। ভারতের প্রতি ঘণ্টায় সেখানে কটা বাজে — তালিকা।`, tH1: (n) => `🕐 ${n}-এ এখন কটা বাজে?`,
    diff: (n, h) => (h === 0 ? `${n} আর ভারতের সময় একই` : h > 0 ? `ভারত ${n} থেকে ${dur('bn', h)} এগিয়ে` : `ভারত ${n} থেকে ${dur('bn', h)} পিছিয়ে`), dst: 'এখানে গরমে ঘড়ি ১ ঘণ্টা এগিয়ে দেওয়া হয় (ডেলাইট সেভিং) — তাই তফাত বছরে বদলায়; ওপরের ঘড়ি সবসময় সঠিক সময় দেখায়।', india: 'ভারত', tableH: (n) => `ভারতে যখন … তখন ${n}-এ`, callH: '📞 বাড়িতে ফোন করার ভালো সময়', call: (n) => `${n}-এ সন্ধে ৬–৯টা — ভারতে তখনও খুব বেশি রাত হয় না। ওপরের তালিকা মিলিয়ে নিন।`, nowIndia: 'ভারতে এখন',
    cHubTitle: 'আজকের রেট: দিরহাম, রিয়াল, দিনার, ডলার, পাউন্ড — টাকায় কত? | NextGrade', cHubDesc: '১ দিরহাম, ১ সৌদি রিয়াল, ১ কুয়েতি দিনার, ১ ডলার, ১ পাউন্ড আজ কত টাকা — ১৬টি মুদ্রার রেট, কনভার্টার আর তালিকা। রোজ আপডেট।', cHubH1: '💱 বিদেশি মুদ্রা → ভারতীয় টাকা (আজকের রেট)',
    cTitle: (n, c, v) => `১ ${n} (${c}) কত টাকা? আজকের রেট ₹${v} | ${c} to INR | NextGrade`, cDesc: (n, c, v, d) => `আজ (${d}) ১ ${n} = ₹${v}। ১ থেকে ১ লাখ ${c} টাকায় তালিকা, কনভার্টার আর টাকা পাঠানোর সময় কী দেখবেন।`, cH1: (n, c) => `💱 ১ ${n} (${c}) = কত টাকা?`, ans: (n, c, v) => `1 ${c} = ₹${v}`, rateNote: (d) => `রেট ${d}-এর (ExchangeRate-API থেকে, রোজ সকালে আপডেট)। ব্যাংক, এক্সচেঞ্জ আর অ্যাপের রেট একটু আলাদা হয় আর ফি লাগে।`, amtL: 'পরিমাণ', tableH: (c) => `${c} থেকে টাকা — তালিকা`, revH: (c) => `টাকা থেকে ${c}`, sendH: '💡 বাড়িতে টাকা পাঠানোর সময়', send: ['ব্যাংক/অ্যাপের রেট আর ফি দুটোই দেখুন — শেষে কত টাকা পৌঁছবে, সেটাই আসল রেট।', 'বড় অঙ্ক হলে ২–৩ জায়গায় রেট মেলান।', 'শুধু লাইসেন্সপ্রাপ্ত ব্যাংক/এক্সচেঞ্জ/অ্যাপ; হাওয়ালা বেআইনি।'], others: 'অন্য মুদ্রা', timeL: '🕐 সেখানকার সময়', curL: '💱 সেখানকার মুদ্রা', attr: 'Rates By Exchange Rate API',
  },
};
export const WORLD_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, [v.tNav, v.cNav]]));
const PLACE_CUR = { dubai: 'AED', 'abu-dhabi': 'AED', 'saudi-arabia': 'SAR', qatar: 'QAR', kuwait: 'KWD', oman: 'OMR', bahrain: 'BHD', london: 'GBP', 'new-york': 'USD', california: 'USD', toronto: 'CAD', sydney: 'AUD', singapore: 'SGD', malaysia: 'MYR', nepal: 'NPR', bangladesh: 'BDT', japan: 'JPY' };

export function buildWorld(L, { page, write, P, esc, T, breadcrumbLd, fx }) {
  const code = L.code, X = TX[code], LOC = { hi: 'hi-IN', bn: 'bn-IN', en: 'en-IN', hinglish: 'en-IN' }[code];
  const css = '<style>.wt-clock{color:#1f2937;text-align:center;padding:18px;border-radius:18px;background:linear-gradient(135deg,#e7f5ff,#f3f0ff);border:1px solid var(--line);margin:12px 0}.wt-clock b{display:block;font-size:46px;font-weight:800;letter-spacing:1px}.wt-clock span{font-size:16px}.wt-t{width:100%;border-collapse:collapse}.wt-t td,.wt-t th{padding:7px 10px;border-bottom:1px solid var(--line);text-align:left}.cx-ans{color:#2b2118;font-size:28px;font-weight:800;padding:16px 18px;border-radius:16px;background:linear-gradient(135deg,#ebfbee,#fff9db);border:1px solid var(--line);margin:12px 0}.cx-c{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.cx-c input{width:150px;padding:10px;border-radius:10px;border:1px solid var(--line);font:inherit;font-size:18px;background:var(--surface);color:var(--text)}#cx-out,#cx-out2{font-size:20px;font-weight:800}</style>';
  const now = Date.now(), inOff = 330;
  const tLink = (s) => P(L, `/time/${s}/`), cLink = (c) => P(L, `/currency/${c.toLowerCase()}-to-inr/`);
  const clockJs = (tz) => `<script>(function(){function f(z,el,o){document.getElementById(el).textContent=new Intl.DateTimeFormat('${LOC}',Object.assign({timeZone:z},o)).format(new Date())}function t(){f('${tz}','wt-time',{hour:'numeric',minute:'2-digit',second:'2-digit'});f('${tz}','wt-date',{weekday:'long',day:'numeric',month:'long'});var e=document.getElementById('wt-in');if(e)e.textContent=new Intl.DateTimeFormat('${LOC}',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'}).format(new Date())}t();setInterval(t,1000)})();</script>`;
  // time hub
  const tHub = '/time/';
  write(L, tHub, page(L, {
    path: tHub, title: X.tHubTitle, description: X.tHubDesc, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.tNav, tHub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.tNav)}</p><h1>${esc(X.tHubH1)}</h1>
<table class="wt-t">${PLACES.map(([s, tz, fl, n]) => `<tr><td>${fl} <a href="${tLink(s)}">${esc(n[code])}</a></td><td><b data-tz="${tz}"></b></td><td><small>${esc(X.diff(n[code].split(' (')[0], (inOff - offMin(tz, now)) / 60))}</small></td></tr>`).join('')}</table>
<script>(function(){function t(){document.querySelectorAll('[data-tz]').forEach(function(e){e.textContent=new Intl.DateTimeFormat('${LOC}',{timeZone:e.dataset.tz,hour:'numeric',minute:'2-digit',weekday:'short'}).format(new Date())})}t();setInterval(t,20000)})();</script>
<div class="ad" aria-hidden="true"></div><p><a class="btn btn-ghost" href="${P(L, '/currency/')}">${esc(X.cNav)} →</a></p></div>`,
  }));
  for (const [s, tz, fl, n] of PLACES) {
    const N = n[code], short = N.split(' (')[0], path = `/time/${s}/`, h = (inOff - offMin(tz, now)) / 60;
    const jan = offMin(tz, Date.UTC(2027, 0, 15)), jul = offMin(tz, Date.UTC(2027, 6, 15)), dst = jan !== jul;
    const rows = [6, 8, 9, 12, 15, 18, 20, 21, 22, 23].map((hr) => { const ms = Date.UTC(2026, 0, 1, hr, 0) - inOff * 60000 + 0; const there = new Date(ms + offMin(tz, now) * 60000); const f = (d) => new Intl.DateTimeFormat(LOC, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(d); return `<tr><td>${f(new Date(Date.UTC(2026, 0, 1, hr, 0)))}</td><td><b>${f(there)}</b></td></tr>`; }).join('');
    const cur = PLACE_CUR[s];
    write(L, path, page(L, {
      path, title: X.tTitle(short), description: X.tDesc(short, X.diff(short, h)),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.tNav, tHub], [short, path]])],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, tHub)}">${esc(X.tNav)}</a> › ${esc(short)}</p>
<h1>${esc(X.tH1(N))}</h1>
<div class="wt-clock">${fl} <span>${esc(N)}</span><b id="wt-time">—</b><span id="wt-date"></span><br><small>${esc(X.nowIndia)}: <span id="wt-in"></span></small></div>
<p class="lead"><b>${esc(X.diff(short, h))}</b>${dst ? `<br><small>${esc(X.dst)}</small>` : ''}</p>
<h2>${esc(X.tableH(short))}</h2><table class="wt-t"><tr><th>🇮🇳 ${esc(X.india)}</th><th>${fl} ${esc(short)}</th></tr>${rows}</table>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.callH)}</h2><p>${esc(X.call(short))}</p>
<p class="chips">${cur ? `<a class="tag" href="${cLink(cur)}">${esc(X.curL)}: ${cur}</a>` : ''} ${PLACES.filter((x) => x[0] !== s).slice(0, 8).map(([s2, , f2, n2]) => `<a class="tag" href="${tLink(s2)}">${f2} ${esc(n2[code].split(' (')[0])}</a>`).join(' ')}</p></div>${clockJs(tz)}`,
    }));
  }
  if (!fx) return;
  const cHub = '/currency/', fmtR = (x) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: x < 1 ? 4 : 2, minimumFractionDigits: x < 1 ? 2 : 2 }).format(x);
  const dateTxt = new Intl.DateTimeFormat(LOC, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${fx.date}T00:00:00Z`));
  write(L, cHub, page(L, {
    path: cHub, title: X.cHubTitle, description: X.cHubDesc, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.cNav, cHub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.cNav)}</p><h1>${esc(X.cHubH1)}</h1>
<table class="wt-t">${CURRENCIES.map(([c, fl, n]) => `<tr><td>${fl} <a href="${cLink(c)}">${esc(n[code])} (${c})</a></td><td><b>₹${fmtR(fx.rates[c])}</b></td></tr>`).join('')}</table>
<p class="note">${esc(X.rateNote(dateTxt))} <a href="https://www.exchangerate-api.com" rel="noopener">${X.attr}</a></p><div class="ad" aria-hidden="true"></div><p><a class="btn btn-ghost" href="${P(L, tHub)}">${esc(X.tNav)} →</a></p></div>`,
  }));
  for (const [c, fl, n] of CURRENCIES) {
    const N = n[code], r = fx.rates[c], v = fmtR(r), path = `${cHub}${c.toLowerCase()}-to-inr/`;
    const amts = c === 'JPY' || c === 'NPR' || c === 'BDT' ? [1, 10, 100, 500, 1000, 5000, 10000, 50000, 100000] : [1, 5, 10, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 100000];
    const rev = [100, 500, 1000, 5000, 10000, 50000, 100000];
    const place = Object.entries(PLACE_CUR).find(([, x]) => x === c);
    write(L, path, page(L, {
      path, title: X.cTitle(N, c, v), description: X.cDesc(N, c, v, dateTxt),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.cNav, cHub], [`${c} → INR`, path]])],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, cHub)}">${esc(X.cNav)}</a> › ${c}</p>
<h1>${esc(X.cH1(N, c))}</h1><p class="cx-ans">${fl} ${esc(X.ans(N, c, v))}</p><p class="note">${esc(X.rateNote(dateTxt))} <a href="https://www.exchangerate-api.com" rel="noopener">${X.attr}</a></p>
<div class="cx-c"><input id="cx-a" type="number" step="any" value="1" aria-label="${esc(X.amtL)}"> ${c} = <span id="cx-out"></span></div>
<div class="cx-c" style="margin-top:8px"><input id="cx-b" type="number" step="any" value="1000" aria-label="₹"> ₹ = <span id="cx-out2"></span></div>
<script>(function(){var r=${r},a=document.getElementById('cx-a'),b=document.getElementById('cx-b'),o=document.getElementById('cx-out'),o2=document.getElementById('cx-out2'),f=function(x,d){return new Intl.NumberFormat('en-IN',{maximumFractionDigits:d}).format(x)};function u(){o.textContent='₹'+f((+a.value||0)*r,2);o2.textContent=f((+b.value||0)/r,4)+' ${c}'}a.oninput=b.oninput=u;u()})();</script>
<h2>${esc(X.tableH(c))}</h2><table class="wt-t">${amts.map((m) => `<tr><td>${new Intl.NumberFormat('en-IN').format(m)} ${c}</td><td><b>₹${fmtR(m * r)}</b></td></tr>`).join('')}</table>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.revH(c))}</h2><table class="wt-t">${rev.map((m) => `<tr><td>₹${new Intl.NumberFormat('en-IN').format(m)}</td><td><b>${fmtR(m / r)} ${c}</b></td></tr>`).join('')}</table>
<h2>${esc(X.sendH)}</h2><ul>${X.send.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(X.others)}</h2><p class="chips">${place ? `<a class="tag" href="${tLink(place[0])}">${esc(X.timeL)}</a> ` : ''}${CURRENCIES.filter((x) => x[0] !== c).map(([c2, f2]) => `<a class="tag" href="${cLink(c2)}">${f2} ${c2}</a>`).join(' ')}</p></div>`,
    }));
  }
}
