/**
 * /ghoomne-ki-jagah/ — where to travel in India, by month and season (plan item M, 25 Nov 2026).
 * Which places fit a month is worked out from the real climate averages (src/weather-cities.mjs CLIMATE),
 * so the lists change by month and show that month's day/night temperature and rain for each place.
 */
import { CITIES, CLIMATE } from './weather-cities.mjs';
import { PLACES } from './travel-places.mjs';
import { cityName, stateName, monthName } from './weather.mjs';

export const MONTH_SLUGS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const BY = Object.fromEntries(CITIES.map((c) => [c.slug, c]));
export const PLACE = Object.fromEntries(PLACES.map(([slug, types, text, open]) => [slug, { slug, types, text, open, city: BY[slug] }]));
const ALL = PLACES.filter(([s]) => BY[s] && CLIMATE[s]).map(([s]) => PLACE[s]);

const TYPE_ORDER = ['h', 'b', 'r', 'd', 'p', 'w', 'c'];
const TYPES = {
  hi: { h: '⛰️ पहाड़ और हिल स्टेशन', b: '🏖️ समुद्र तट', r: '🏰 किले, महल और धरोहर', d: '🐪 रेगिस्तान', p: '🛕 धार्मिक जगहें', w: '🐅 जंगल सफ़ारी', c: '🏙️ शहर और संस्कृति' },
  en: { h: '⛰️ Hills and hill stations', b: '🏖️ Beaches', r: '🏰 Forts, palaces and heritage', d: '🐪 Desert', p: '🛕 Pilgrimage', w: '🐅 Wildlife safari', c: '🏙️ Cities and culture' },
  hinglish: { h: '⛰️ Pahaad aur hill station', b: '🏖️ Beach', r: '🏰 Kile, mahal aur dharohar', d: '🐪 Registan', p: '🛕 Dharmik jagahein', w: '🐅 Jungle safari', c: '🏙️ Sheher aur sanskriti' },
  bn: { h: '⛰️ পাহাড় আর শৈলশহর', b: '🏖️ সমুদ্রসৈকত', r: '🏰 দুর্গ, প্রাসাদ আর ঐতিহ্য', d: '🐪 মরুভূমি', p: '🛕 তীর্থস্থান', w: '🐅 জঙ্গল সাফারি', c: '🏙️ শহর আর সংস্কৃতি' },
};

// is month m (0–11) a good time for this place? Rules use the place's main type.
export function goodIn(pl, m) {
  const [hi, lo, rain] = CLIMATE[pl.slug][m], t = pl.types[0], monsoon = pl.types.includes('m') && m >= 5 && m <= 8;
  if (t === 'w') return (pl.open || []).includes(m + 1);
  if (monsoon) return true;
  if (t === 'h') return hi >= 10 && hi <= 30 && lo > 0 && rain < 220;
  if (t === 'b') return hi <= 32 && rain < 120;
  return hi >= 14 && hi <= 32 && rain < 150;
}
const snowIn = (pl, m) => pl.types[0] === 'h' && CLIMATE[pl.slug][m][1] <= 0 && CLIMATE[pl.slug][m][0] <= 14;

const SEASONS = [
  ['sardi', [11, 0, 1], (pl) => 'brdpc'.includes(pl.types[0])],
  ['barf', [11, 0, 1], null],
  ['garmi', [3, 4, 5], (pl) => pl.types[0] === 'h'],
  ['monsoon', [6, 7, 8], (pl) => pl.types.includes('m')],
];

export const TT = {
  hi: {
    nav: 'घूमने की जगहें',
    hubTitle: (y) => `भारत में घूमने की जगहें ${y} — महीने और मौसम के हिसाब से | NextGrade`,
    hubDesc: 'किस महीने में कहाँ घूमें? भारत की 70+ जगहें — पहाड़, समुद्र तट, किले, धार्मिक स्थल — हर महीने के असली औसत तापमान और बारिश के हिसाब से चुनी गईं।',
    hubH1: '🧳 घूमने की जगहें — महीने और मौसम के हिसाब से',
    hubLead: 'छुट्टी का महीना चुनिए — हम बताएँगे कि उस समय कहाँ का मौसम सबसे अच्छा रहता है। हर जगह के साथ उस महीने का दिन-रात का औसत तापमान और बारिश, और आज का लाइव मौसम।',
    monthsH: 'महीना चुनें', seasonsH: 'मौसम के हिसाब से', allH: 'सभी जगहें', now: 'अभी',
    mTitle: (M, y, n) => `${M} में घूमने की जगहें ${y} — मौसम के हिसाब से ${n} बेहतरीन जगहें | NextGrade`,
    mDesc: (M, n, ex) => `${M} में कहाँ घूमें? मौसम के हिसाब से ${n} जगहें: ${ex} और भी — हर जगह का ${M} का औसत तापमान, बारिश और आज का मौसम।`,
    mH1: (M, y) => `🧳 ${M} ${y} में घूमने की जगहें`,
    mLead: (M, n) => `${M} में इन ${n} जगहों पर मौसम आमतौर पर अच्छा रहता है — न ज़्यादा गर्मी, न ज़्यादा बारिश। तापमान और बारिश पिछले 10 साल के ${M} का औसत है।`,
    day: 'दिन', night: 'रात', rain: 'बारिश', mm: 'मिमी', weather: 'आज का मौसम →',
    snowH: '❄️ बर्फ़ कहाँ मिल सकती है', snowP: 'इन जगहों पर रात का तापमान 0°C से नीचे जाता है, इसलिए बर्फ़बारी की संभावना रहती है (हर साल पक्का नहीं)।',
    tips: (M) => `${M} की यात्रा के लिए सलाह`,
    tipList: (m) => [m >= 10 || m <= 1 ? 'पहाड़ों पर बहुत ठंड होती है — गरम कपड़े, दस्ताने, टोपी साथ रखें; बर्फ़ वाले रास्ते कभी-कभी बंद हो जाते हैं।' : m >= 5 && m <= 8 ? 'बारिश में पहाड़ी रास्तों पर भूस्खलन हो सकता है — निकलने से पहले मौसम और सड़क की ख़बर देखें।' : 'दिन में धूप तेज़ हो सकती है — टोपी, पानी की बोतल और सनस्क्रीन रखें।', 'छुट्टियों और त्योहारों पर भीड़ रहती है — ट्रेन और होटल पहले से बुक करें।', 'जाने से एक दिन पहले उस जगह का "आज का मौसम" ज़रूर देखें।'],
    open: 'पार्क आमतौर पर इन महीनों में खुला रहता है; सफ़ारी की बुकिंग आधिकारिक वेबसाइट से करें।',
    otherM: 'दूसरे महीने',
    sTitle: { sardi: (y) => `सर्दियों में घूमने की जगहें ${y} — दिसंबर-जनवरी में कहाँ जाएँ | NextGrade`, barf: (y) => `बर्फ़ देखने कहाँ जाएँ ${y} — सर्दियों में बर्फ़बारी वाली जगहें | NextGrade`, garmi: (y) => `गर्मियों में घूमने की ठंडी जगहें ${y} — मई-जून के हिल स्टेशन | NextGrade`, monsoon: (y) => `बारिश में घूमने की जगहें ${y} — मानसून में हरियाली और झरने | NextGrade` },
    sH1: { sardi: '☀️ सर्दियों में घूमने की जगहें (दिसंबर–फ़रवरी)', barf: '❄️ बर्फ़ देखने कहाँ जाएँ', garmi: '🌲 गर्मियों में ठंडी जगहें (अप्रैल–जून)', monsoon: '🌧️ मानसून में घूमने की जगहें (जुलाई–सितंबर)' },
    sLead: { sardi: 'उत्तर भारत की ठंड से बचना हो तो ये जगहें सर्दियों में सबसे सुहानी रहती हैं — समुद्र तट, रेगिस्तान, किले और तीर्थ।', barf: 'दिसंबर से फ़रवरी के बीच इन पहाड़ी जगहों पर रात का पारा 0°C से नीचे जाता है — बर्फ़ देखने की सबसे अच्छी संभावना यहीं है।', garmi: 'मई-जून की गर्मी में ये हिल स्टेशन ठंडे रहते हैं — दिन का तापमान आमतौर पर 30°C से कम।', monsoon: 'बारिश में ये जगहें सबसे हरी-भरी होती हैं — झरने, बादल और चाय-कॉफ़ी के बागान। पहाड़ी रास्तों पर सावधानी रखें।' },
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: (M, top) => [[`${M} में घूमने के लिए सबसे अच्छी जगह कौन-सी है?`, `मौसम के हिसाब से ${M} में ${top} जैसी जगहें अच्छी रहती हैं। अपनी पसंद (पहाड़, समुद्र, धार्मिक) के हिसाब से ऊपर की सूची देखें।`], [`क्या ${M} में पहाड़ों पर जाना ठीक है?`, `ऊपर "पहाड़" वाली सूची में वही जगहें हैं जहाँ ${M} में दिन का औसत तापमान आरामदायक रहता है और बारिश ज़्यादा नहीं होती।`], ['यह जानकारी कहाँ से है?', 'तापमान और बारिश NASA POWER के पिछले 10 साल (2015–2024) के आँकड़ों का औसत है; आज का मौसम MET Norway से आता है।']],
    note: 'यात्रा से पहले सड़क, परमिट और मंदिर/पार्क खुलने का समय आधिकारिक वेबसाइट पर देख लें — ये हर साल बदल सकते हैं।',
  },
  hinglish: {
    nav: 'Ghoomne ki jagah',
    hubTitle: (y) => `India mein Ghumne ki Jagah ${y} — Mahine aur Mausam ke Hisaab se | NextGrade`,
    hubDesc: 'Kis mahine mein kahan ghoomein? India ki 70+ jagahein — pahaad, beach, kile, dharmik sthal — har mahine ke asli average temperature aur baarish ke hisaab se.',
    hubH1: '🧳 Ghoomne ki Jagah — mahine aur mausam ke hisaab se',
    hubLead: 'Chhutti ka mahina chuniye — hum batayenge ki us samay kahan ka mausam sabse achha rehta hai. Har jagah ke saath us mahine ka din-raat ka average temperature aur baarish, aur aaj ka live mausam.',
    monthsH: 'Mahina chuniye', seasonsH: 'Mausam ke hisaab se', allH: 'Sabhi jagahein', now: 'Abhi',
    mTitle: (M, y, n) => `${M} Mein Ghumne ki Jagah ${y} — Mausam ke Hisaab se ${n} Best Jagah | NextGrade`,
    mDesc: (M, n, ex) => `${M} mein kahan ghoomein? Mausam ke hisaab se ${n} jagahein: ${ex} aur bhi — har jagah ka ${M} ka average temperature, baarish aur aaj ka mausam.`,
    mH1: (M, y) => `🧳 ${M} ${y} mein Ghumne ki Jagah`,
    mLead: (M, n) => `${M} mein in ${n} jagahon par mausam aamtaur par achha rehta hai — na zyada garmi, na zyada baarish. Temperature aur baarish pichhle 10 saal ke ${M} ka average hai.`,
    day: 'Din', night: 'Raat', rain: 'Baarish', mm: 'mm', weather: 'Aaj ka mausam →',
    snowH: '❄️ Barf kahan mil sakti hai', snowP: 'In jagahon par raat ka temperature 0°C se neeche jaata hai, isliye barfbaari ke chance rehte hain (har saal pakka nahi).',
    tips: (M) => `${M} ki yatra ke liye salaah`,
    tipList: (m) => [m >= 10 || m <= 1 ? 'Pahaadon par bahut thand hoti hai — garam kapde, dastaane, topi saath rakhein; barf wale raaste kabhi-kabhi band ho jaate hain.' : m >= 5 && m <= 8 ? 'Baarish mein pahaadi raaston par landslide ho sakta hai — nikalne se pehle mausam aur sadak ki khabar dekhein.' : 'Din mein dhoop tez ho sakti hai — topi, paani ki bottle aur sunscreen rakhein.', 'Chhuttiyon aur tyohaaron par bheed rehti hai — train aur hotel pehle se book karein.', 'Jaane se ek din pehle us jagah ka "aaj ka mausam" zaroor dekhein.'],
    open: 'Park aamtaur par in mahinon mein khula rehta hai; safari ki booking official website se karein.',
    otherM: 'Doosre mahine',
    sTitle: { sardi: (y) => `Sardiyon mein Ghumne ki Jagah ${y} — December-January mein kahan jaayein | NextGrade`, barf: (y) => `Barf Dekhne Kahan Jaayein ${y} — Snowfall wali Jagah | NextGrade`, garmi: (y) => `Garmiyon mein Ghumne ki Thandi Jagah ${y} — May-June ke Hill Station | NextGrade`, monsoon: (y) => `Baarish mein Ghumne ki Jagah ${y} — Monsoon mein Hariyali aur Jharne | NextGrade` },
    sH1: { sardi: '☀️ Sardiyon mein ghoomne ki jagah (December–February)', barf: '❄️ Barf dekhne kahan jaayein', garmi: '🌲 Garmiyon mein thandi jagah (April–June)', monsoon: '🌧️ Monsoon mein ghoomne ki jagah (July–September)' },
    sLead: { sardi: 'North India ki thand se bachna ho to yeh jagahein sardiyon mein sabse suhaani rehti hain — beach, registan, kile aur teerth.', barf: 'December se February ke beech in pahaadi jagahon par raat ka paara 0°C se neeche jaata hai — barf dekhne ka sabse achha chance yahin hai.', garmi: 'May-June ki garmi mein yeh hill station thande rehte hain — din ka temperature aamtaur par 30°C se kam.', monsoon: 'Baarish mein yeh jagahein sabse hari-bhari hoti hain — jharne, baadal aur chai-coffee ke bagaan. Pahaadi raaston par saavdhaani rakhein.' },
    faqH: 'Aksar poochhe jaane wale sawaal',
    faq: (M, top) => [[`${M} mein ghoomne ke liye sabse achhi jagah kaun si hai?`, `Mausam ke hisaab se ${M} mein ${top} jaisi jagahein achhi rehti hain. Apni pasand (pahaad, beach, dharmik) ke hisaab se upar ki list dekhein.`], [`Kya ${M} mein pahaadon par jaana theek hai?`, `Upar "Pahaad" wali list mein wahi jagahein hain jahan ${M} mein din ka average temperature aaraamdaayak rehta hai aur baarish zyada nahi hoti.`], ['Yeh jaankari kahan se hai?', 'Temperature aur baarish NASA POWER ke pichhle 10 saal (2015–2024) ke data ka average hai; aaj ka mausam MET Norway se aata hai.']],
    note: 'Yatra se pehle sadak, permit aur mandir/park khulne ka samay official website par dekh lein — yeh har saal badal sakte hain.',
  },
  en: {
    nav: 'Places to visit',
    hubTitle: (y) => `Places to Visit in India ${y} — By Month and Season | NextGrade`,
    hubDesc: 'Where to go in which month? 70+ places in India — hills, beaches, forts, pilgrimages — picked by each month’s real average temperature and rainfall.',
    hubH1: '🧳 Places to visit — by month and season',
    hubLead: 'Pick the month of your holiday and we show where the weather is best at that time — with each place’s average day and night temperature and rain for that month, and today’s live weather.',
    monthsH: 'Pick a month', seasonsH: 'By season', allH: 'All places', now: 'Now',
    mTitle: (M, y, n) => `Best Places to Visit in ${M} ${y} in India — ${n} Places by Weather | NextGrade`,
    mDesc: (M, n, ex) => `Where to travel in ${M}? ${n} places in India with good weather: ${ex} and more — with each place’s ${M} average temperature, rain and today’s weather.`,
    mH1: (M, y) => `🧳 Best places to visit in ${M} ${y}`,
    mLead: (M, n) => `The weather is usually pleasant at these ${n} places in ${M} — not too hot, not too wet. Temperatures and rain are ${M} averages over the last 10 years.`,
    day: 'Day', night: 'Night', rain: 'Rain', mm: 'mm', weather: 'Weather today →',
    snowH: '❄️ Where you may see snow', snowP: 'Nights here drop below 0°C, so snowfall is possible (not guaranteed every year).',
    tips: (M) => `Tips for travelling in ${M}`,
    tipList: (m) => [m >= 10 || m <= 1 ? 'It is very cold in the hills — carry warm clothes, gloves and a cap; snowy roads sometimes close.' : m >= 5 && m <= 8 ? 'Landslides can happen on hill roads in the rains — check the weather and road news before you set out.' : 'The daytime sun can be strong — carry a cap, a water bottle and sunscreen.', 'Holidays and festivals are crowded — book trains and hotels early.', 'Check the place’s “weather today” a day before you leave.'],
    open: 'The park is usually open in these months; book safaris on the official website.',
    otherM: 'Other months',
    sTitle: { sardi: (y) => `Best Places to Visit in Winter in India ${y} — December to February | NextGrade`, barf: (y) => `Where to See Snow in India ${y} — Snowfall Places in Winter | NextGrade`, garmi: (y) => `Cool Places to Visit in Summer in India ${y} — Hill Stations for May and June | NextGrade`, monsoon: (y) => `Best Monsoon Destinations in India ${y} — Green Hills and Waterfalls | NextGrade` },
    sH1: { sardi: '☀️ Places to visit in winter (December–February)', barf: '❄️ Where to see snow', garmi: '🌲 Cool places in summer (April–June)', monsoon: '🌧️ Monsoon destinations (July–September)' },
    sLead: { sardi: 'To escape the North Indian cold, these places are at their best in winter — beaches, desert, forts and pilgrimages.', barf: 'Between December and February nights drop below 0°C at these hill places — your best chance to see snow.', garmi: 'These hill stations stay cool in the May–June heat — daytime temperatures usually under 30°C.', monsoon: 'These places are at their greenest in the rains — waterfalls, clouds and tea and coffee estates. Take care on hill roads.' },
    faqH: 'Frequently asked questions',
    faq: (M, top) => [[`What is the best place to visit in ${M}?`, `By weather, places like ${top} are good in ${M}. Use the lists above to pick by what you like — hills, beaches or pilgrimage.`], [`Is it a good idea to go to the hills in ${M}?`, `The “Hills” list above only has places where ${M} days are comfortable on average and rain is not heavy.`], ['Where does this information come from?', 'Temperatures and rain are averages of NASA POWER data for 2015–2024; today’s weather comes from MET Norway.']],
    note: 'Before you travel, check roads, permits and temple/park opening times on official websites — they can change every year.',
  },
  bn: {
    nav: 'বেড়ানোর জায়গা',
    hubTitle: (y) => `ভারতে বেড়ানোর জায়গা ${y} — মাস আর ঋতু অনুযায়ী | NextGrade`,
    hubDesc: 'কোন মাসে কোথায় বেড়াবেন? ভারতের ৭০+ জায়গা — পাহাড়, সমুদ্র, দুর্গ, তীর্থ — প্রতি মাসের আসল গড় তাপমাত্রা আর বৃষ্টির হিসেবে বাছাই।',
    hubH1: '🧳 বেড়ানোর জায়গা — মাস আর ঋতু অনুযায়ী',
    hubLead: 'ছুটির মাস বেছে নিন — আমরা দেখাব তখন কোথায় আবহাওয়া সবচেয়ে ভালো থাকে। প্রতিটি জায়গার সঙ্গে সেই মাসের দিন-রাতের গড় তাপমাত্রা, বৃষ্টি আর আজকের লাইভ আবহাওয়া।',
    monthsH: 'মাস বেছে নিন', seasonsH: 'ঋতু অনুযায়ী', allH: 'সব জায়গা', now: 'এখন',
    mTitle: (M, y, n) => `${M} মাসে বেড়ানোর জায়গা ${y} — আবহাওয়া অনুযায়ী ${n}টি সেরা জায়গা | NextGrade`,
    mDesc: (M, n, ex) => `${M} মাসে কোথায় বেড়াবেন? আবহাওয়া অনুযায়ী ${n}টি জায়গা: ${ex} আরও — প্রতিটির ${M} মাসের গড় তাপমাত্রা, বৃষ্টি আর আজকের আবহাওয়া।`,
    mH1: (M, y) => `🧳 ${M} ${y}-এ বেড়ানোর জায়গা`,
    mLead: (M, n) => `${M} মাসে এই ${n}টি জায়গায় আবহাওয়া সাধারণত ভালো থাকে — বেশি গরমও নয়, বেশি বৃষ্টিও নয়। তাপমাত্রা আর বৃষ্টি গত ১০ বছরের ${M} মাসের গড়।`,
    day: 'দিন', night: 'রাত', rain: 'বৃষ্টি', mm: 'মিমি', weather: 'আজকের আবহাওয়া →',
    snowH: '❄️ কোথায় বরফ দেখা যেতে পারে', snowP: 'এই জায়গাগুলোয় রাতের তাপমাত্রা ০°C-এর নিচে নামে, তাই তুষারপাতের সম্ভাবনা থাকে (প্রতি বছর নিশ্চিত নয়)।',
    tips: (M) => `${M} মাসে ভ্রমণের পরামর্শ`,
    tipList: (m) => [m >= 10 || m <= 1 ? 'পাহাড়ে খুব ঠান্ডা — গরম জামা, দস্তানা, টুপি সঙ্গে রাখুন; বরফে রাস্তা মাঝে মাঝে বন্ধ হয়।' : m >= 5 && m <= 8 ? 'বর্ষায় পাহাড়ি রাস্তায় ধস নামতে পারে — বেরোনোর আগে আবহাওয়া আর রাস্তার খবর দেখে নিন।' : 'দিনে রোদ কড়া হতে পারে — টুপি, জলের বোতল আর সানস্ক্রিন রাখুন।', 'ছুটি আর উৎসবে ভিড় থাকে — ট্রেন আর হোটেল আগে থেকে বুক করুন।', 'যাওয়ার আগের দিন জায়গাটার "আজকের আবহাওয়া" দেখে নিন।'],
    open: 'পার্ক সাধারণত এই মাসগুলোয় খোলা থাকে; সাফারির বুকিং অফিসিয়াল ওয়েবসাইট থেকে করুন।',
    otherM: 'অন্য মাস',
    sTitle: { sardi: (y) => `শীতে বেড়ানোর জায়গা ${y} — ডিসেম্বর-জানুয়ারিতে কোথায় যাবেন | NextGrade`, barf: (y) => `বরফ দেখতে কোথায় যাবেন ${y} — শীতে তুষারপাতের জায়গা | NextGrade`, garmi: (y) => `গরমে বেড়ানোর ঠান্ডা জায়গা ${y} — মে-জুনের শৈলশহর | NextGrade`, monsoon: (y) => `বর্ষায় বেড়ানোর জায়গা ${y} — সবুজ পাহাড় আর ঝরনা | NextGrade` },
    sH1: { sardi: '☀️ শীতে বেড়ানোর জায়গা (ডিসেম্বর–ফেব্রুয়ারি)', barf: '❄️ বরফ দেখতে কোথায় যাবেন', garmi: '🌲 গরমে ঠান্ডা জায়গা (এপ্রিল–জুন)', monsoon: '🌧️ বর্ষায় বেড়ানোর জায়গা (জুলাই–সেপ্টেম্বর)' },
    sLead: { sardi: 'উত্তর ভারতের ঠান্ডা এড়াতে চাইলে শীতে এই জায়গাগুলো সবচেয়ে মনোরম — সমুদ্র, মরুভূমি, দুর্গ আর তীর্থ।', barf: 'ডিসেম্বর থেকে ফেব্রুয়ারি এই পাহাড়ি জায়গাগুলোয় রাতের পারদ ০°C-এর নিচে নামে — বরফ দেখার সবচেয়ে ভালো সুযোগ এখানেই।', garmi: 'মে-জুনের গরমে এই শৈলশহরগুলো ঠান্ডা থাকে — দিনের তাপমাত্রা সাধারণত ৩০°C-এর কম।', monsoon: 'বর্ষায় এই জায়গাগুলো সবচেয়ে সবুজ — ঝরনা, মেঘ আর চা-কফির বাগান। পাহাড়ি রাস্তায় সাবধান থাকুন।' },
    faqH: 'প্রায়ই জিজ্ঞেস করা প্রশ্ন',
    faq: (M, top) => [[`${M} মাসে বেড়ানোর সেরা জায়গা কোনটা?`, `আবহাওয়া অনুযায়ী ${M} মাসে ${top}-এর মতো জায়গা ভালো। পছন্দমতো (পাহাড়, সমুদ্র, তীর্থ) ওপরের তালিকা দেখুন।`], [`${M} মাসে পাহাড়ে যাওয়া কি ঠিক?`, `ওপরের "পাহাড়" তালিকায় শুধু সেই জায়গাগুলোই আছে যেখানে ${M} মাসে দিনের গড় তাপমাত্রা আরামদায়ক আর বৃষ্টি বেশি নয়।`], ['এই তথ্য কোথা থেকে?', 'তাপমাত্রা আর বৃষ্টি NASA POWER-এর ২০১৫–২০২৪ সালের তথ্যের গড়; আজকের আবহাওয়া MET Norway থেকে।']],
    note: 'যাত্রার আগে রাস্তা, পারমিট আর মন্দির/পার্ক খোলার সময় অফিসিয়াল ওয়েবসাইটে দেখে নিন — প্রতি বছর বদলাতে পারে।',
  },
};

const nowIST = () => new Date(Date.now() + 5.5 * 3600e3);
const yearFor = (m) => { const d = nowIST(); return m >= d.getUTCMonth() ? d.getUTCFullYear() : d.getUTCFullYear() + 1; };

export function buildTravel(L, { page, write, P, esc, T, breadcrumbLd }) {
  const X = TT[L.code], code = L.code, hub = '/ghoomne-ki-jagah/';
  const name = (pl) => cityName(code, pl.city), M = (m) => monthName(code, m);
  const css = `<style>.tv-list{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}.tv{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px 16px;box-shadow:var(--shadow)}.tv h3{margin:0 0 2px;font-size:18px}.tv .st{font-size:13px;color:var(--muted)}.tv p{margin:6px 0;font-size:15px;line-height:1.55}.tv .wx{display:flex;flex-wrap:wrap;gap:6px;font-size:13px;font-weight:700;margin:6px 0}.tv .wx span{background:var(--soft);border-radius:999px;padding:2px 10px}.tv a.go{font-size:14px;font-weight:700;text-decoration:none}.tv-months{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}.tv-months a{display:block;padding:12px;border-radius:14px;border:1px solid var(--line);background:var(--surface);text-decoration:none;color:var(--text);font-weight:700;text-align:center}.tv-months a.cur{border-color:var(--brand);color:var(--brand)}.tv-months small{display:block;color:var(--muted);font-weight:400;font-size:12px}</style>`;
  const card = (pl, m) => {
    const cl = m == null ? null : CLIMATE[pl.slug][m];
    return `<div class="tv"><h3><a href="${P(L, `/mausam/${pl.slug}/`)}">${esc(name(pl))}</a></h3><div class="st">${esc(stateName(code, pl.city.state))}</div><p>${esc(pl.text[code])}</p>${cl ? `<div class="wx"><span>☀️ ${esc(X.day)} ${Math.round(cl[0])}°C</span><span>🌙 ${esc(X.night)} ${Math.round(cl[1])}°C</span><span>🌧️ ${esc(X.rain)} ${cl[2]} ${esc(X.mm)}</span></div>` : ''}${pl.types[0] === 'w' ? `<p class="note">${esc(X.open)} (${(pl.open || []).map((k) => M(k - 1)).join(', ')})</p>` : ''}<a class="go" href="${P(L, `/mausam/${pl.slug}/`)}">${esc(X.weather)}</a></div>`;
  };
  const groups = (list, m) => TYPE_ORDER.map((t) => [t, list.filter((pl) => pl.types[0] === t)]).filter(([, xs]) => xs.length)
    .map(([t, xs]) => `<h2>${esc(TYPES[code][t])}</h2><div class="tv-list">${xs.map((pl) => card(pl, m)).join('')}</div>`).join('\n');
  const monthGrid = (cur) => `<div class="tv-months">${MONTH_SLUGS.map((s, m) => `<a href="${P(L, `${hub}${s}/`)}"${m === cur ? ' class="cur"' : ''}>${esc(M(m))}<small>${ALL.filter((pl) => goodIn(pl, m)).length} ✓</small></a>`).join('')}</div>`;
  const seasonLinks = `<p class="chips">${SEASONS.map(([s]) => `<a class="tag" href="${P(L, `${hub}${s}/`)}">${esc(X.sH1[s])}</a>`).join(' ')}</p>`;
  const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  const itemList = (list, path) => ({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: list.slice(0, 30).map((pl, i) => ({ '@type': 'ListItem', position: i + 1, name: name(pl), url: `https://nextgrade.in${P(L, `/mausam/${pl.slug}/`)}` })), url: `https://nextgrade.in${P(L, path)}` });
  const curM = nowIST().getUTCMonth();

  // hub
  write(L, hub, page(L, {
    path: hub, title: X.hubTitle(yearFor(curM)), description: X.hubDesc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.hubH1)}</h1>
<p class="lead">${esc(X.hubLead)}</p>
<h2>${esc(X.monthsH)}</h2>
${monthGrid(curM)}
<h2>${esc(X.seasonsH)}</h2>
${seasonLinks}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.allH)}</h2>
${groups(ALL, null)}
<p class="note">${esc(X.note)}</p>
</div>`,
  }));

  // month pages
  MONTH_SLUGS.forEach((s, m) => {
    const path = `${hub}${s}/`, y = yearFor(m), list = ALL.filter((pl) => goodIn(pl, m)), snow = ALL.filter((pl) => snowIn(pl, m));
    const top = list.slice(0, 4).map(name), faq = X.faq(M(m), top.join(', '));
    write(L, path, page(L, {
      path, title: X.mTitle(M(m), y, list.length), description: X.mDesc(M(m), list.length, top.join(', ')),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [M(m), path]]), itemList(list, path), faqLd(faq)],
      body: `${css}<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(M(m))}</p>
<h1>${esc(X.mH1(M(m), y))}</h1>
<p class="lead">${esc(X.mLead(M(m), list.length))}</p>
${groups(list, m)}
${snow.length ? `<h2>${esc(X.snowH)}</h2><p>${esc(X.snowP)}</p><div class="tv-list">${snow.map((pl) => card(pl, m)).join('')}</div>` : ''}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.tips(M(m)))}</h2><ul>${X.tipList(m).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<p class="note">${esc(X.note)}</p>
<h2>${esc(X.otherM)}</h2>
${monthGrid(m)}
${seasonLinks}
<h2>${esc(X.faqH)}</h2>
${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n')}
</div>`,
    }));
  });

  // season pages
  for (const [s, months, pick] of SEASONS) {
    const path = `${hub}${s}/`, y = yearFor(months[0]), mid = months[1];
    const list = s === 'barf' ? ALL.filter((pl) => months.some((m) => snowIn(pl, m))) : ALL.filter((pl) => pick(pl) && months.filter((m) => goodIn(pl, m)).length >= 2);
    write(L, path, page(L, {
      path, title: X.sTitle[s](y), description: X.sLead[s],
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [X.sH1[s].replace(/^\S+\s/, ''), path]]), itemList(list, path)],
      body: `${css}<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(X.sH1[s].replace(/^\S+\s/, ''))}</p>
<h1>${esc(X.sH1[s])}</h1>
<p class="lead">${esc(X.sLead[s])}</p>
<div class="tv-list">${list.map((pl) => card(pl, mid)).join('')}</div>
<p class="note">${esc(X.note)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.monthsH)}</h2>
${monthGrid(curM)}
${seasonLinks}
</div>`,
    }));
  }
}
