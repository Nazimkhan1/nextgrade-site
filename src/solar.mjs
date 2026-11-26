/**
 * Solar + inverter calculator (plan R4, 26 Nov 2026).
 * Subsidy = central financial assistance (CFA) under PM Surya Ghar: Muft Bijli Yojana, residential rooftop:
 * ₹30,000/kW for the first 2 kW + ₹18,000 for the 3rd kW (max ₹78,000); special-category states/UTs
 * (North-East, Uttarakhand, Himachal, J&K, Ladakh, Andaman & Nicobar, Lakshadweep) ₹33,000 + ₹19,800 (max ₹85,800).
 * Source: pmsuryaghar.gov.in / MNRE, as reported by state discoms (checked 26 Nov 2026). Shown with a "check the portal" note.
 * Generation, cost and inverter sizing are common Indian thumb rules, always shown as an estimate.
 */
export const CHECKED = '26 Nov 2026';
export const SUB = { general: [30000, 18000], special: [33000, 19800] }; // ₹ per kW for kW 1–2, ₹ for the 3rd kW
export const GEN = 120; // units (kWh) per kW per month, India average (about 4 per day; 3.5–5 by region and season)
export const COST = [55000, 70000]; // ₹ per kW, on-grid rooftop, installed (Nov 2026 market estimate)
export const AREA = 100; // sq ft of shadow-free roof per kW
export const TARIFF = 7; // ₹ per unit default
export const KWS = [1, 2, 3, 5, 10];
export const VA_SIZES = [600, 800, 1000, 1100, 1500, 2000, 2500, 3500, 5000, 7500, 10000];
// [key, watts] — typical running watts
export const APPL = [['bulb', 9], ['tube', 20], ['fan', 75], ['bldc', 30], ['tv', 80], ['fridge', 200], ['router', 10], ['laptop', 60], ['charger', 10], ['cooler', 200], ['pump', 375], ['wm', 500]];

export const subsidy = (kw, cat = 'general') => { const [a, b] = SUB[cat]; return Math.min(kw, 2) * a + Math.max(0, Math.min(kw - 2, 1)) * b; };

const TX = {
  hi: {
    nav: 'सोलर कैलकुलेटर', invNav: 'इन्वर्टर कैलकुलेटर',
    title: 'सोलर पैनल कैलकुलेटर — कितने kW का सोलर चाहिए, सब्सिडी कितनी मिलेगी (PM सूर्य घर 2026) | NextGrade',
    desc: 'महीने की बिजली यूनिट डालें — कितने kW का सोलर, छत पर कितनी जगह, कुल ख़र्च, PM सूर्य घर सब्सिडी (₹78,000 तक), हर महीने बचत और कितने साल में पैसा वसूल।',
    h1: '☀️ सोलर कैलकुलेटर — कितने kW का सोलर चाहिए?',
    lead: 'बिजली बिल पर लिखी महीने की यूनिट डालिए — हम बताएँगे कितने किलोवाट का सोलर सही रहेगा, सरकारी सब्सिडी के बाद कितना ख़र्च आएगा और कितनी बचत होगी।',
    f: { units: 'महीने की यूनिट (kWh)', cat: 'राज्य', tariff: 'बिजली रेट (₹/यूनिट)', cost: 'लगवाने का रेट (₹/kW)', general: 'सामान्य राज्य', special: 'विशेष राज्य (पूर्वोत्तर, उत्तराखंड, हिमाचल, J&K…)' },
    ui: { kw: 'सही साइज़', roof: 'छत पर जगह', gen: 'हर महीने बिजली बनेगी', cost: 'कुल ख़र्च (अंदाज़ा)', sub: 'सरकारी सब्सिडी', net: 'सब्सिडी के बाद', save: 'हर महीने बचत', pay: 'पैसा वसूल', yrs: 'साल', units: 'यूनिट', mo: 'महीना' },
    rulesH: 'कैसे गिना जाता है',
    rules: [
      'सब्सिडी (PM सूर्य घर: मुफ़्त बिजली योजना, घर की छत): पहले 2 kW पर ₹30,000 प्रति kW, तीसरे kW पर ₹18,000 — यानी 1 kW = ₹30,000, 2 kW = ₹60,000, 3 kW या ज़्यादा = ₹78,000 (इससे ज़्यादा नहीं)।',
      'विशेष राज्य (पूर्वोत्तर, उत्तराखंड, हिमाचल, जम्मू-कश्मीर, लद्दाख, अंडमान-निकोबार, लक्षद्वीप): ₹33,000 प्रति kW (2 kW तक) + तीसरे kW पर ₹19,800 = अधिकतम ₹85,800।',
      'भारत में 1 kW सोलर औसतन रोज़ लगभग 4 यूनिट, यानी महीने में ~120 यूनिट बनाता है (धूप और मौसम के हिसाब से 3.5–5 यूनिट रोज़)।',
      '1 kW के लिए लगभग 100 वर्ग फुट छाँव-रहित छत चाहिए।',
      'लगवाने का ख़र्च (ऑन-ग्रिड, नेट मीटर के साथ) आमतौर पर ₹55,000–70,000 प्रति kW (नवंबर 2026 का अंदाज़ा) — कंपनी और पैनल के हिसाब से बदलता है।',
      'पोर्टल के हिसाब से: महीने में 0–150 यूनिट → 1–2 kW, 150–300 यूनिट → 2–3 kW, 300 से ज़्यादा → 3 kW से ऊपर।',
    ],
    howH: 'सब्सिडी के लिए आवेदन कैसे करें',
    how: ['pmsuryaghar.gov.in पर अपना राज्य, बिजली कंपनी और कंज़्यूमर नंबर डालकर रजिस्टर करें।', 'पोर्टल पर रजिस्टर्ड वेंडर चुनें और छत पर सोलर लगवाएँ।', 'बिजली कंपनी नेट मीटर लगाती है और जाँच करती है।', 'कमीशनिंग के बाद बैंक खाते की जानकारी डालें — सब्सिडी सीधे खाते में आती है।'],
    warn: 'यह सिर्फ़ अंदाज़ा है। सब्सिडी के नियम और राशि बदल सकती है — आवेदन से पहले pmsuryaghar.gov.in ज़रूर देखें। कुछ राज्य ऊपर से अलग सब्सिडी भी देते हैं। सिर्फ़ सरकारी पोर्टल पर आवेदन करें, किसी को OTP या पैसे "सब्सिडी दिलाने" के नाम पर न दें।',
    checked: 'आख़िरी बार जाँचा', src: 'स्रोत', notGov: 'NextGrade सरकारी वेबसाइट नहीं है।',
    kwH: 'कितने kW का सोलर?',
    kwTitle: (k) => `${k} kW सोलर सिस्टम — क़ीमत, सब्सिडी, कितनी यूनिट बनेगी, कितनी जगह (2026) | NextGrade`,
    kwDesc: (k, s, lo, hi) => `${k} kW सोलर: PM सूर्य घर सब्सिडी ₹${s}, लगवाने का ख़र्च लगभग ₹${lo}–₹${hi}, महीने में ~${k * GEN} यूनिट, छत पर ${k * AREA} वर्ग फुट। पूरा हिसाब और कैलकुलेटर।`,
    kwH1: (k) => `☀️ ${k} kW सोलर सिस्टम: ख़र्च, सब्सिडी और बचत`,
    kwAns: (k, s, nlo, nhi) => `${k} kW सोलर: सब्सिडी ₹${s}, सब्सिडी के बाद लगभग ₹${nlo} – ₹${nhi}`,
    tbl: ['चीज़', 'कितना'],
    rows: { gen: 'बिजली (महीना)', roof: 'छत पर जगह', cost: 'कुल ख़र्च', subG: 'सब्सिडी (सामान्य राज्य)', subS: 'सब्सिडी (विशेष राज्य)', save: 'बचत (₹7/यूनिट, महीना)', fits: 'किसके लिए सही' },
    fits: (k) => (k <= 1 ? 'महीने में ~100–150 यूनिट वाला छोटा घर' : k <= 2 ? 'महीने में ~150–250 यूनिट (पंखे, फ्रिज, टीवी)' : k <= 3 ? 'महीने में ~250–360 यूनिट (कूलर/एक AC)' : k <= 5 ? 'महीने में ~400–600 यूनिट (2 AC वाला घर)' : 'बड़ा घर या दुकान, ~1,000+ यूनिट'),
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: [
      ['PM सूर्य घर योजना में कितनी सब्सिडी मिलती है?', '1 kW पर ₹30,000, 2 kW पर ₹60,000 और 3 kW या उससे बड़े सिस्टम पर ₹78,000 (विशेष राज्यों में ₹85,800 तक)।'],
      ['300 यूनिट के लिए कितने kW का सोलर चाहिए?', 'लगभग 3 kW — यह महीने में ~360 यूनिट बनाता है।'],
      ['1 kW सोलर कितनी बिजली बनाता है?', 'औसतन रोज़ 4 यूनिट, महीने में लगभग 120 यूनिट।'],
      ['क्या सोलर के साथ बैटरी ज़रूरी है?', 'नहीं। सब्सिडी वाला सिस्टम ऑन-ग्रिड होता है — बची बिजली नेट मीटर से ग्रिड में जाती है। बिजली जाने पर बैकअप चाहिए तो अलग से इन्वर्टर-बैटरी या हाइब्रिड सिस्टम लें।'],
      ['सब्सिडी कहाँ मिलती है?', 'सिर्फ़ सरकारी पोर्टल pmsuryaghar.gov.in पर आवेदन करें; पैसा सीधे बैंक खाते में आता है।'],
    ],
    inv: {
      title: 'इन्वर्टर कैलकुलेटर — कितने VA का इन्वर्टर और कितनी बैटरी चाहिए? | NextGrade',
      desc: 'घर में कितने पंखे, बल्ब, टीवी, फ्रिज चलाने हैं, डालें — कितने VA का इन्वर्टर, कितने Ah की कितनी बैटरी और कितने घंटे बैकअप मिलेगा।',
      h1: '🔋 इन्वर्टर कैलकुलेटर — कितने VA का इन्वर्टर चाहिए?',
      lead: 'बिजली जाने पर जो चीज़ें चलानी हैं, उनकी गिनती डालिए। हम बताएँगे कितना लोड है, कितने VA का इन्वर्टर और कितनी बैटरी लगेगी।',
      hours: 'कितने घंटे बैकअप', load: 'कुल लोड', va: 'इन्वर्टर साइज़', volt: 'सिस्टम वोल्टेज', bat: 'बैटरी', batN: (n) => `${n} × 150Ah (12V) बैटरी`, qty: 'गिनती', warn: 'यह सिर्फ़ अंदाज़ा है — असली बैकअप बैटरी की हालत, ब्रांड और तापमान पर निर्भर करता है। ख़रीदने से पहले इलेक्ट्रीशियन से पूछें।',
      a: { bulb: 'LED बल्ब', tube: 'LED ट्यूबलाइट', fan: 'छत का पंखा', bldc: 'BLDC पंखा', tv: 'LED टीवी', fridge: 'फ्रिज', router: 'वाई-फ़ाई राउटर', laptop: 'लैपटॉप', charger: 'मोबाइल चार्जर', cooler: 'कूलर', pump: 'पानी की मोटर (0.5 HP)', wm: 'वॉशिंग मशीन' },
      rules: ['इन्वर्टर VA = कुल वॉट ÷ 0.8 (पावर फ़ैक्टर), फिर उससे बड़ा मिलने वाला साइज़।', 'बैटरी (Ah) = वॉट × घंटे ÷ (वोल्टेज × 0.8)। 12V 150Ah बैटरी में लगभग 1,800 Wh होते हैं।', '1100 VA तक आमतौर पर 12V (1 बैटरी), 2500 VA तक 24V (2 बैटरी), उससे बड़ा 48V।', 'फ्रिज और मोटर शुरू होते समय 2–3 गुना करंट खींचते हैं — इसलिए थोड़ा बड़ा इन्वर्टर लें। AC और गीज़र आम इन्वर्टर पर न चलाएँ।'],
      faq: [['800 VA इन्वर्टर पर क्या-क्या चलेगा?', 'लगभग 640 वॉट तक: 4 पंखे, 6 बल्ब, एक टीवी और राउटर आराम से।'], ['150Ah बैटरी कितने घंटे चलेगी?', '300 वॉट लोड पर लगभग 4–5 घंटे; 500 वॉट पर लगभग 3 घंटे।'], ['क्या सोलर पैनल इन्वर्टर से जोड़ सकते हैं?', 'हाँ, सोलर (हाइब्रिड/PCU) इन्वर्टर से। सब्सिडी वाले ऑन-ग्रिड सिस्टम में बैटरी नहीं होती।']],
    },
  },
  hinglish: {
    nav: 'Solar calculator', invNav: 'Inverter calculator',
    title: 'Solar Panel Calculator — Kitne kW ka Solar Chahiye, Subsidy Kitni Milegi (PM Surya Ghar 2026) | NextGrade',
    desc: 'Mahine ki bijli unit daalein — kitne kW ka solar, chhat par kitni jagah, kul kharcha, PM Surya Ghar subsidy (₹78,000 tak), har mahine bachat aur kitne saal mein paisa vasool.',
    h1: '☀️ Solar calculator — kitne kW ka solar chahiye?',
    lead: 'Bijli bill par likhi mahine ki unit daaliye — hum batayenge kitne kilowatt ka solar sahi rahega, sarkari subsidy ke baad kitna kharcha aayega aur kitni bachat hogi.',
    f: { units: 'Mahine ki unit (kWh)', cat: 'Rajya', tariff: 'Bijli rate (₹/unit)', cost: 'Lagwane ka rate (₹/kW)', general: 'Saamanya rajya', special: 'Vishesh rajya (North-East, Uttarakhand, Himachal, J&K…)' },
    ui: { kw: 'Sahi size', roof: 'Chhat par jagah', gen: 'Har mahine bijli banegi', cost: 'Kul kharcha (andaaza)', sub: 'Sarkari subsidy', net: 'Subsidy ke baad', save: 'Har mahine bachat', pay: 'Paisa vasool', yrs: 'saal', units: 'unit', mo: 'mahina' },
    rulesH: 'Kaise gina jaata hai',
    rules: [
      'Subsidy (PM Surya Ghar: Muft Bijli Yojana, ghar ki chhat): pehle 2 kW par ₹30,000 per kW, teesre kW par ₹18,000 — yaani 1 kW = ₹30,000, 2 kW = ₹60,000, 3 kW ya zyada = ₹78,000 (isse zyada nahi).',
      'Vishesh rajya (North-East, Uttarakhand, Himachal, Jammu-Kashmir, Ladakh, Andaman-Nicobar, Lakshadweep): ₹33,000 per kW (2 kW tak) + teesre kW par ₹19,800 = maximum ₹85,800.',
      'Bharat mein 1 kW solar ausatan roz lagbhag 4 unit, yaani mahine mein ~120 unit banata hai (dhoop aur mausam ke hisaab se 3.5–5 unit roz).',
      '1 kW ke liye lagbhag 100 sq ft chhaanv-rahit chhat chahiye.',
      'Lagwane ka kharcha (on-grid, net meter ke saath) aam taur par ₹55,000–70,000 per kW (November 2026 ka andaaza) — company aur panel ke hisaab se badalta hai.',
      'Portal ke hisaab se: mahine mein 0–150 unit → 1–2 kW, 150–300 unit → 2–3 kW, 300 se zyada → 3 kW se upar.',
    ],
    howH: 'Subsidy ke liye apply kaise karein',
    how: ['pmsuryaghar.gov.in par apna rajya, bijli company aur consumer number daal kar register karein.', 'Portal par registered vendor chunein aur chhat par solar lagwayein.', 'Bijli company net meter lagati hai aur jaanch karti hai.', 'Commissioning ke baad bank account ki details daalein — subsidy seedhe khaate mein aati hai.'],
    warn: 'Yeh sirf andaaza hai. Subsidy ke niyam aur raashi badal sakti hai — apply karne se pehle pmsuryaghar.gov.in zaroor dekhein. Kuch rajya upar se alag subsidy bhi dete hain. Sirf sarkari portal par apply karein, kisi ko OTP ya paise "subsidy dilane" ke naam par na dein.',
    checked: 'Aakhri baar jaancha', src: 'Source', notGov: 'NextGrade sarkari website nahi hai.',
    kwH: 'Kitne kW ka solar?',
    kwTitle: (k) => `${k} kW Solar System — Price, Subsidy, Kitni Unit Banegi, Kitni Jagah (2026) | NextGrade`,
    kwDesc: (k, s, lo, hi) => `${k} kW solar: PM Surya Ghar subsidy ₹${s}, lagwane ka kharcha lagbhag ₹${lo}–₹${hi}, mahine mein ~${k * GEN} unit, chhat par ${k * AREA} sq ft. Poora hisaab aur calculator.`,
    kwH1: (k) => `☀️ ${k} kW solar system: kharcha, subsidy aur bachat`,
    kwAns: (k, s, nlo, nhi) => `${k} kW solar: subsidy ₹${s}, subsidy ke baad lagbhag ₹${nlo} – ₹${nhi}`,
    tbl: ['Cheez', 'Kitna'],
    rows: { gen: 'Bijli (mahina)', roof: 'Chhat par jagah', cost: 'Kul kharcha', subG: 'Subsidy (saamanya rajya)', subS: 'Subsidy (vishesh rajya)', save: 'Bachat (₹7/unit, mahina)', fits: 'Kiske liye sahi' },
    fits: (k) => (k <= 1 ? 'Mahine mein ~100–150 unit wala chhota ghar' : k <= 2 ? 'Mahine mein ~150–250 unit (pankhe, fridge, TV)' : k <= 3 ? 'Mahine mein ~250–360 unit (cooler/ek AC)' : k <= 5 ? 'Mahine mein ~400–600 unit (2 AC wala ghar)' : 'Bada ghar ya dukaan, ~1,000+ unit'),
    faqH: 'Aksar poochhe jaane wale sawaal',
    faq: [
      ['PM Surya Ghar Yojana mein kitni subsidy milti hai?', '1 kW par ₹30,000, 2 kW par ₹60,000 aur 3 kW ya usse bade system par ₹78,000 (vishesh rajyon mein ₹85,800 tak).'],
      ['300 unit ke liye kitne kW ka solar chahiye?', 'Lagbhag 3 kW — yeh mahine mein ~360 unit banata hai.'],
      ['1 kW solar kitni bijli banata hai?', 'Ausatan roz 4 unit, mahine mein lagbhag 120 unit.'],
      ['Kya solar ke saath battery zaroori hai?', 'Nahi. Subsidy wala system on-grid hota hai — bachi bijli net meter se grid mein jaati hai. Bijli jaane par backup chahiye to alag se inverter-battery ya hybrid system lein.'],
      ['Subsidy kahan milti hai?', 'Sirf sarkari portal pmsuryaghar.gov.in par apply karein; paisa seedhe bank khaate mein aata hai.'],
    ],
    inv: {
      title: 'Inverter Calculator — Kitne VA ka Inverter aur Kitni Battery Chahiye? | NextGrade',
      desc: 'Ghar mein kitne pankhe, bulb, TV, fridge chalane hain, daalein — kitne VA ka inverter, kitne Ah ki kitni battery aur kitne ghante backup milega.',
      h1: '🔋 Inverter calculator — kitne VA ka inverter chahiye?',
      lead: 'Bijli jaane par jo cheezein chalani hain, unki ginti daaliye. Hum batayenge kitna load hai, kitne VA ka inverter aur kitni battery lagegi.',
      hours: 'Kitne ghante backup', load: 'Kul load', va: 'Inverter size', volt: 'System voltage', bat: 'Battery', batN: (n) => `${n} × 150Ah (12V) battery`, qty: 'Ginti', warn: 'Yeh sirf andaaza hai — asli backup battery ki haalat, brand aur taapmaan par nirbhar karta hai. Khareedne se pehle electrician se poochhein.',
      a: { bulb: 'LED bulb', tube: 'LED tubelight', fan: 'Chhat ka pankha', bldc: 'BLDC pankha', tv: 'LED TV', fridge: 'Fridge', router: 'Wi-Fi router', laptop: 'Laptop', charger: 'Mobile charger', cooler: 'Cooler', pump: 'Paani ki motor (0.5 HP)', wm: 'Washing machine' },
      rules: ['Inverter VA = kul watt ÷ 0.8 (power factor), phir usse bada milne wala size.', 'Battery (Ah) = watt × ghante ÷ (voltage × 0.8). 12V 150Ah battery mein lagbhag 1,800 Wh hote hain.', '1100 VA tak aam taur par 12V (1 battery), 2500 VA tak 24V (2 battery), usse bada 48V.', 'Fridge aur motor shuru hote samay 2–3 guna current kheenchte hain — isliye thoda bada inverter lein. AC aur geyser aam inverter par na chalayein.'],
      faq: [['800 VA inverter par kya-kya chalega?', 'Lagbhag 640 watt tak: 4 pankhe, 6 bulb, ek TV aur router aaraam se.'], ['150Ah battery kitne ghante chalegi?', '300 watt load par lagbhag 4–5 ghante; 500 watt par lagbhag 3 ghante.'], ['Kya solar panel inverter se jod sakte hain?', 'Haan, solar (hybrid/PCU) inverter se. Subsidy wale on-grid system mein battery nahi hoti.']],
    },
  },
  en: {
    nav: 'Solar calculator', invNav: 'Inverter calculator',
    title: 'Solar Panel Calculator India — What kW Do I Need, How Much Subsidy (PM Surya Ghar 2026) | NextGrade',
    desc: 'Enter your monthly electricity units — get the right solar size in kW, roof area, total cost, PM Surya Ghar subsidy (up to ₹78,000), monthly savings and payback years.',
    h1: '☀️ Solar calculator — how many kW of solar do you need?',
    lead: 'Enter the monthly units from your electricity bill. We estimate the right rooftop solar size, your cost after the government subsidy and how much you save.',
    f: { units: 'Monthly units (kWh)', cat: 'State', tariff: 'Power rate (₹/unit)', cost: 'Installation rate (₹/kW)', general: 'General states', special: 'Special category (North-East, Uttarakhand, Himachal, J&K…)' },
    ui: { kw: 'Right size', roof: 'Roof area', gen: 'Power generated per month', cost: 'Total cost (estimate)', sub: 'Government subsidy', net: 'After subsidy', save: 'Savings per month', pay: 'Payback', yrs: 'years', units: 'units', mo: 'month' },
    rulesH: 'How it is calculated',
    rules: [
      'Subsidy (PM Surya Ghar: Muft Bijli Yojana, residential rooftop): ₹30,000 per kW for the first 2 kW and ₹18,000 for the 3rd kW — so 1 kW = ₹30,000, 2 kW = ₹60,000, 3 kW or more = ₹78,000 (capped).',
      'Special category states/UTs (North-East, Uttarakhand, Himachal Pradesh, Jammu & Kashmir, Ladakh, Andaman & Nicobar, Lakshadweep): ₹33,000 per kW up to 2 kW + ₹19,800 for the 3rd kW = up to ₹85,800.',
      '1 kW of solar in India makes about 4 units a day on average, ~120 units a month (3.5–5 a day depending on sunshine and season).',
      'Each kW needs roughly 100 sq ft of shadow-free roof.',
      'Installed cost (on-grid, with net meter) is typically ₹55,000–70,000 per kW (November 2026 estimate) — varies by vendor and panel.',
      'Portal guidance: 0–150 units a month → 1–2 kW, 150–300 → 2–3 kW, above 300 → more than 3 kW.',
    ],
    howH: 'How to apply for the subsidy',
    how: ['Register on pmsuryaghar.gov.in with your state, electricity company and consumer number.', 'Choose a registered vendor on the portal and get the rooftop system installed.', 'Your discom installs the net meter and inspects the system.', 'After commissioning, submit your bank details — the subsidy is paid directly to your account.'],
    warn: 'This is only an estimate. Subsidy rules and amounts can change — always check pmsuryaghar.gov.in before applying. Some states add their own subsidy on top. Apply only on the government portal and never share an OTP or pay anyone who promises to "get you the subsidy".',
    checked: 'Last checked', src: 'Source', notGov: 'NextGrade is not a government website.',
    kwH: 'How many kW of solar?',
    kwTitle: (k) => `${k} kW Solar System Price, Subsidy, Units per Month and Roof Area (2026) | NextGrade`,
    kwDesc: (k, s, lo, hi) => `${k} kW solar: PM Surya Ghar subsidy ₹${s}, installed cost about ₹${lo}–₹${hi}, ~${k * GEN} units a month, ${k * AREA} sq ft of roof. Full breakdown and calculator.`,
    kwH1: (k) => `☀️ ${k} kW solar system: cost, subsidy and savings`,
    kwAns: (k, s, nlo, nhi) => `${k} kW solar: subsidy ₹${s}, about ₹${nlo} – ₹${nhi} after subsidy`,
    tbl: ['Item', 'Value'],
    rows: { gen: 'Power (per month)', roof: 'Roof area', cost: 'Total cost', subG: 'Subsidy (general states)', subS: 'Subsidy (special category)', save: 'Savings (₹7/unit, per month)', fits: 'Good for' },
    fits: (k) => (k <= 1 ? 'A small home using ~100–150 units a month' : k <= 2 ? '~150–250 units a month (fans, fridge, TV)' : k <= 3 ? '~250–360 units a month (cooler or one AC)' : k <= 5 ? '~400–600 units a month (home with 2 ACs)' : 'Large home or shop, ~1,000+ units'),
    faqH: 'Frequently asked questions',
    faq: [
      ['How much subsidy does PM Surya Ghar give?', '₹30,000 for 1 kW, ₹60,000 for 2 kW and ₹78,000 for 3 kW or larger (up to ₹85,800 in special category states).'],
      ['How many kW of solar for 300 units a month?', 'About 3 kW — it makes roughly 360 units a month.'],
      ['How much power does 1 kW of solar produce?', 'About 4 units a day on average, roughly 120 units a month.'],
      ['Do I need a battery with rooftop solar?', 'No. The subsidised system is on-grid — extra power goes to the grid through the net meter. For backup during power cuts you need a separate inverter-battery or a hybrid system.'],
      ['Where do I apply for the subsidy?', 'Only on the official portal pmsuryaghar.gov.in; the money is paid directly to your bank account.'],
    ],
    inv: {
      title: 'Inverter Calculator — What VA Inverter and How Many Batteries Do I Need? | NextGrade',
      desc: 'Enter how many fans, bulbs, TV and fridge you want to run — get the load, the inverter size in VA, how many 150Ah batteries and the backup time.',
      h1: '🔋 Inverter calculator — what size inverter do you need?',
      lead: 'Enter what you want to run during a power cut. We calculate the load, the inverter VA and the batteries you need.',
      hours: 'Backup hours', load: 'Total load', va: 'Inverter size', volt: 'System voltage', bat: 'Batteries', batN: (n) => `${n} × 150Ah (12V) battery`, qty: 'Qty', warn: 'This is only an estimate — real backup depends on battery health, brand and temperature. Ask an electrician before buying.',
      a: { bulb: 'LED bulb', tube: 'LED tube light', fan: 'Ceiling fan', bldc: 'BLDC fan', tv: 'LED TV', fridge: 'Fridge', router: 'Wi-Fi router', laptop: 'Laptop', charger: 'Phone charger', cooler: 'Air cooler', pump: 'Water pump (0.5 HP)', wm: 'Washing machine' },
      rules: ['Inverter VA = total watts ÷ 0.8 (power factor), then the next available size.', 'Battery (Ah) = watts × hours ÷ (voltage × 0.8). A 12V 150Ah battery stores about 1,800 Wh.', 'Up to 1100 VA usually runs on 12V (1 battery), up to 2500 VA on 24V (2 batteries), larger on 48V.', 'Fridges and pumps draw 2–3× current when starting — pick a slightly bigger inverter. Do not run ACs or geysers on a normal home inverter.'],
      faq: [['What can an 800 VA inverter run?', 'About 640 watts: 4 fans, 6 bulbs, a TV and the router comfortably.'], ['How long does a 150Ah battery last?', 'About 4–5 hours at 300 watts; about 3 hours at 500 watts.'], ['Can I connect solar panels to my inverter?', 'Yes, with a solar (hybrid/PCU) inverter. The subsidised on-grid system has no battery.']],
    },
  },
  bn: {
    nav: 'সোলার ক্যালকুলেটর', invNav: 'ইনভার্টার ক্যালকুলেটর',
    title: 'সোলার প্যানেল ক্যালকুলেটর — কত kW সোলার লাগবে, কত ভর্তুকি (PM সূর্য ঘর 2026) | NextGrade',
    desc: 'মাসে কত ইউনিট বিদ্যুৎ লাগে লিখুন — কত kW সোলার, ছাদে কত জায়গা, মোট খরচ, PM সূর্য ঘর ভর্তুকি (₹78,000 পর্যন্ত), মাসে কত সাশ্রয় আর কত বছরে টাকা উঠবে।',
    h1: '☀️ সোলার ক্যালকুলেটর — কত kW সোলার লাগবে?',
    lead: 'বিদ্যুৎ বিলে লেখা মাসের ইউনিট দিন — আমরা জানাব কত কিলোওয়াট সোলার ঠিক, সরকারি ভর্তুকির পর কত খরচ আর কত সাশ্রয় হবে।',
    f: { units: 'মাসের ইউনিট (kWh)', cat: 'রাজ্য', tariff: 'বিদ্যুতের রেট (₹/ইউনিট)', cost: 'লাগানোর রেট (₹/kW)', general: 'সাধারণ রাজ্য', special: 'বিশেষ রাজ্য (উত্তর-পূর্ব, উত্তরাখণ্ড, হিমাচল, J&K…)' },
    ui: { kw: 'সঠিক মাপ', roof: 'ছাদে জায়গা', gen: 'মাসে বিদ্যুৎ তৈরি', cost: 'মোট খরচ (আন্দাজ)', sub: 'সরকারি ভর্তুকি', net: 'ভর্তুকির পর', save: 'মাসে সাশ্রয়', pay: 'টাকা উঠবে', yrs: 'বছরে', units: 'ইউনিট', mo: 'মাস' },
    rulesH: 'কীভাবে হিসাব হয়',
    rules: [
      'ভর্তুকি (PM সূর্য ঘর: মুফত বিজলি যোজনা, বাড়ির ছাদ): প্রথম 2 kW-এ প্রতি kW ₹30,000, তৃতীয় kW-এ ₹18,000 — অর্থাৎ 1 kW = ₹30,000, 2 kW = ₹60,000, 3 kW বা বেশি = ₹78,000 (এর বেশি নয়)।',
      'বিশেষ রাজ্য (উত্তর-পূর্ব, উত্তরাখণ্ড, হিমাচল, জম্মু-কাশ্মীর, লাদাখ, আন্দামান-নিকোবর, লাক্ষাদ্বীপ): 2 kW পর্যন্ত প্রতি kW ₹33,000 + তৃতীয় kW-এ ₹19,800 = সর্বোচ্চ ₹85,800।',
      'ভারতে 1 kW সোলার গড়ে দিনে প্রায় 4 ইউনিট, মাসে ~120 ইউনিট বিদ্যুৎ তৈরি করে (রোদ আর ঋতু অনুযায়ী দিনে 3.5–5)।',
      'প্রতি kW-এর জন্য প্রায় 100 বর্গফুট ছায়াহীন ছাদ লাগে।',
      'লাগানোর খরচ (অন-গ্রিড, নেট মিটার সহ) সাধারণত প্রতি kW ₹55,000–70,000 (নভেম্বর 2026-এর আন্দাজ) — কোম্পানি আর প্যানেল অনুযায়ী বদলায়।',
      'পোর্টালের হিসাবে: মাসে 0–150 ইউনিট → 1–2 kW, 150–300 → 2–3 kW, 300-এর বেশি → 3 kW-এর বেশি।',
    ],
    howH: 'ভর্তুকির জন্য কীভাবে আবেদন করবেন',
    how: ['pmsuryaghar.gov.in-এ আপনার রাজ্য, বিদ্যুৎ সংস্থা আর কনজিউমার নম্বর দিয়ে রেজিস্টার করুন।', 'পোর্টালের রেজিস্টার্ড ভেন্ডর বেছে ছাদে সোলার লাগান।', 'বিদ্যুৎ সংস্থা নেট মিটার বসায় আর পরীক্ষা করে।', 'কমিশনিংয়ের পর ব্যাঙ্ক অ্যাকাউন্টের তথ্য দিন — ভর্তুকি সরাসরি অ্যাকাউন্টে আসে।'],
    warn: 'এটা শুধু আন্দাজ। ভর্তুকির নিয়ম আর টাকা বদলাতে পারে — আবেদনের আগে pmsuryaghar.gov.in অবশ্যই দেখুন। কিছু রাজ্য আলাদা ভর্তুকিও দেয়। শুধু সরকারি পোর্টালে আবেদন করুন; "ভর্তুকি পাইয়ে দেব" বলে কেউ OTP বা টাকা চাইলে দেবেন না।',
    checked: 'শেষ যাচাই', src: 'সূত্র', notGov: 'NextGrade সরকারি ওয়েবসাইট নয়।',
    kwH: 'কত kW সোলার?',
    kwTitle: (k) => `${k} kW সোলার সিস্টেম — দাম, ভর্তুকি, মাসে কত ইউনিট, কত জায়গা (2026) | NextGrade`,
    kwDesc: (k, s, lo, hi) => `${k} kW সোলার: PM সূর্য ঘর ভর্তুকি ₹${s}, খরচ প্রায় ₹${lo}–₹${hi}, মাসে ~${k * GEN} ইউনিট, ছাদে ${k * AREA} বর্গফুট। পুরো হিসাব আর ক্যালকুলেটর।`,
    kwH1: (k) => `☀️ ${k} kW সোলার সিস্টেম: খরচ, ভর্তুকি আর সাশ্রয়`,
    kwAns: (k, s, nlo, nhi) => `${k} kW সোলার: ভর্তুকি ₹${s}, ভর্তুকির পর প্রায় ₹${nlo} – ₹${nhi}`,
    tbl: ['বিষয়', 'কত'],
    rows: { gen: 'বিদ্যুৎ (মাসে)', roof: 'ছাদে জায়গা', cost: 'মোট খরচ', subG: 'ভর্তুকি (সাধারণ রাজ্য)', subS: 'ভর্তুকি (বিশেষ রাজ্য)', save: 'সাশ্রয় (₹7/ইউনিট, মাসে)', fits: 'কার জন্য ঠিক' },
    fits: (k) => (k <= 1 ? 'মাসে ~100–150 ইউনিটের ছোট বাড়ি' : k <= 2 ? 'মাসে ~150–250 ইউনিট (পাখা, ফ্রিজ, টিভি)' : k <= 3 ? 'মাসে ~250–360 ইউনিট (কুলার/একটা AC)' : k <= 5 ? 'মাসে ~400–600 ইউনিট (2টো AC-র বাড়ি)' : 'বড় বাড়ি বা দোকান, ~1,000+ ইউনিট'),
    faqH: 'সাধারণ প্রশ্ন',
    faq: [
      ['PM সূর্য ঘর যোজনায় কত ভর্তুকি পাওয়া যায়?', '1 kW-এ ₹30,000, 2 kW-এ ₹60,000 আর 3 kW বা তার বেশিতে ₹78,000 (বিশেষ রাজ্যে ₹85,800 পর্যন্ত)।'],
      ['মাসে 300 ইউনিটের জন্য কত kW সোলার লাগবে?', 'প্রায় 3 kW — মাসে ~360 ইউনিট তৈরি করে।'],
      ['1 kW সোলার কত বিদ্যুৎ তৈরি করে?', 'গড়ে দিনে 4 ইউনিট, মাসে প্রায় 120 ইউনিট।'],
      ['সোলারের সঙ্গে কি ব্যাটারি লাগে?', 'না। ভর্তুকির সিস্টেম অন-গ্রিড — বাড়তি বিদ্যুৎ নেট মিটার দিয়ে গ্রিডে যায়। লোডশেডিংয়ে ব্যাকআপ চাইলে আলাদা ইনভার্টার-ব্যাটারি বা হাইব্রিড সিস্টেম নিন।'],
      ['ভর্তুকি কোথায় পাওয়া যায়?', 'শুধু সরকারি পোর্টাল pmsuryaghar.gov.in-এ আবেদন করুন; টাকা সরাসরি ব্যাঙ্ক অ্যাকাউন্টে আসে।'],
    ],
    inv: {
      title: 'ইনভার্টার ক্যালকুলেটর — কত VA ইনভার্টার আর কটা ব্যাটারি লাগবে? | NextGrade',
      desc: 'বাড়িতে কটা পাখা, বাল্ব, টিভি, ফ্রিজ চালাবেন লিখুন — মোট লোড, কত VA ইনভার্টার, কটা 150Ah ব্যাটারি আর কত ঘণ্টা ব্যাকআপ।',
      h1: '🔋 ইনভার্টার ক্যালকুলেটর — কত VA ইনভার্টার লাগবে?',
      lead: 'লোডশেডিংয়ের সময় যা চালাবেন তার সংখ্যা দিন। আমরা হিসাব করব লোড, কত VA ইনভার্টার আর কটা ব্যাটারি লাগবে।',
      hours: 'কত ঘণ্টা ব্যাকআপ', load: 'মোট লোড', va: 'ইনভার্টারের মাপ', volt: 'সিস্টেম ভোল্টেজ', bat: 'ব্যাটারি', batN: (n) => `${n} × 150Ah (12V) ব্যাটারি`, qty: 'সংখ্যা', warn: 'এটা শুধু আন্দাজ — আসল ব্যাকআপ ব্যাটারির অবস্থা, ব্র্যান্ড আর তাপমাত্রার উপর নির্ভর করে। কেনার আগে ইলেকট্রিশিয়ানকে জিজ্ঞেস করুন।',
      a: { bulb: 'LED বাল্ব', tube: 'LED টিউবলাইট', fan: 'সিলিং ফ্যান', bldc: 'BLDC ফ্যান', tv: 'LED টিভি', fridge: 'ফ্রিজ', router: 'ওয়াই-ফাই রাউটার', laptop: 'ল্যাপটপ', charger: 'মোবাইল চার্জার', cooler: 'কুলার', pump: 'জলের পাম্প (0.5 HP)', wm: 'ওয়াশিং মেশিন' },
      rules: ['ইনভার্টার VA = মোট ওয়াট ÷ 0.8 (পাওয়ার ফ্যাক্টর), তারপর তার চেয়ে বড় পাওয়া যায় এমন মাপ।', 'ব্যাটারি (Ah) = ওয়াট × ঘণ্টা ÷ (ভোল্টেজ × 0.8)। 12V 150Ah ব্যাটারিতে প্রায় 1,800 Wh থাকে।', '1100 VA পর্যন্ত সাধারণত 12V (1টা ব্যাটারি), 2500 VA পর্যন্ত 24V (2টো), তার বেশি 48V।', 'ফ্রিজ আর পাম্প চালু হওয়ার সময় 2–3 গুণ কারেন্ট টানে — তাই একটু বড় ইনভার্টার নিন। সাধারণ ইনভার্টারে AC বা গিজার চালাবেন না।'],
      faq: [['800 VA ইনভার্টারে কী কী চলবে?', 'প্রায় 640 ওয়াট পর্যন্ত: 4টে পাখা, 6টা বাল্ব, একটা টিভি আর রাউটার স্বচ্ছন্দে।'], ['150Ah ব্যাটারি কত ঘণ্টা চলবে?', '300 ওয়াট লোডে প্রায় 4–5 ঘণ্টা; 500 ওয়াটে প্রায় 3 ঘণ্টা।'], ['সোলার প্যানেল কি ইনভার্টারে লাগানো যায়?', 'হ্যাঁ, সোলার (হাইব্রিড/PCU) ইনভার্টারে। ভর্তুকির অন-গ্রিড সিস্টেমে ব্যাটারি থাকে না।']],
    },
  },
};
export const SOLAR_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, v.nav]));
export const INV_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, v.invNav]));

export function buildSolar(L, { page, write, P, esc, T, breadcrumbLd }) {
  const code = L.code, X = TX[code], I = X.inv, hub = '/solar-calculator/', ihub = '/inverter-calculator/';
  const fN = (x) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(x);
  const css = '<style>.sl-f{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin:12px 0}.sl-f label{display:grid;gap:4px;font-weight:700;font-size:14px}.sl-f input,.sl-f select{padding:10px;border-radius:10px;border:1px solid var(--line);font:inherit;background:var(--surface);color:var(--text)}.sl-ans{color:#2b2118;font-size:22px;font-weight:800;padding:14px 16px;border-radius:16px;background:linear-gradient(135deg,#fff8db,#e7f5ff);border:1px solid var(--line)}.sl-t{width:100%;border-collapse:collapse}.sl-t td,.sl-t th{padding:8px 10px;border-bottom:1px solid var(--line);text-align:left}.sl-w{color:#5c3b00;background:#fff4e6;border:1px solid #ffd8a8;border-radius:12px;padding:10px 12px}.sl-q{width:70px}</style>';
  const note = `<p class="sl-w">⚠️ ${esc(X.warn)}</p><p><small>${esc(X.checked)}: ${CHECKED} · ${esc(X.src)}: <a href="https://pmsuryaghar.gov.in/" rel="noopener" target="_blank">pmsuryaghar.gov.in</a> (MNRE) · ${esc(X.notGov)}</small></p>`;
  const cfg = { ui: X.ui, sub: SUB, gen: GEN, area: AREA };
  const form = (units = 300) => `<script type="application/json" id="sl-cfg">${JSON.stringify(cfg)}</script><div class="sl-f"><label>${esc(X.f.units)}<input id="sl-units" type="number" value="${units}" min="1"></label><label>${esc(X.f.cat)}<select id="sl-cat"><option value="general">${esc(X.f.general)}</option><option value="special">${esc(X.f.special)}</option></select></label><label>${esc(X.f.tariff)}<input id="sl-tariff" type="number" value="${TARIFF}" min="1" step="0.5"></label><label>${esc(X.f.cost)}<input id="sl-cost" type="number" value="${Math.round((COST[0] + COST[1]) / 2)}" min="10000" step="1000"></label></div><div id="sl-out" aria-live="polite"></div>`;
  const kwLinks = KWS.map((k) => `<a class="tag" href="${P(L, `${hub}${k}-kw/`)}">${k} kW</a>`).join(' ');
  const crossLink = (to, label) => `<p>👉 <a href="${P(L, to)}">${esc(label)}</a></p>`;
  const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  const ul = (arr, tag = 'ul') => `<${tag}>${arr.map((t) => `<li>${esc(t)}</li>`).join('')}</${tag}>`;
  const rules = `<h2>${esc(X.rulesH)}</h2>${ul(X.rules)}<h2>${esc(X.howH)}</h2>${ul(X.how, 'ol')}${note}`;
  const faqHtml = (faq) => `<h2>${esc(X.faqH)}</h2>${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}`;

  // Solar hub
  write(L, hub, page(L, {
    path: hub, title: X.title, description: X.desc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]]), faqLd(X.faq)],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p><h1>${esc(X.h1)}</h1><p class="lead">${esc(X.lead)}</p>${form()}
<div class="ad" aria-hidden="true"></div>${rules}<h2>${esc(X.kwH)}</h2><p class="chips">${kwLinks}</p>${crossLink(ihub, I.h1.replace(/^\S+\s/, ''))}${faqHtml(X.faq)}</div>`,
    scripts: ['/assets/solar.js'],
  }));

  // kW pages
  for (const k of KWS) {
    const path = `${hub}${k}-kw/`, sG = subsidy(k, 'general'), sS = subsidy(k, 'special');
    const lo = k * COST[0], hi = k * COST[1];
    const rows = [[X.rows.gen, `~${fN(k * GEN)} ${X.ui.units} (${fN(k * 105)}–${fN(k * 150)})`], [X.rows.roof, `~${fN(k * AREA)} sq ft`], [X.rows.cost, `₹${fN(lo)} – ₹${fN(hi)}`], [X.rows.subG, `₹${fN(sG)}`], [X.rows.subS, `₹${fN(sS)}`], [X.ui.net, `₹${fN(lo - sG)} – ₹${fN(hi - sG)}`], [X.rows.save, `~₹${fN(k * GEN * TARIFF)}`], [X.rows.fits, X.fits(k)]];
    const kfaq = [[X.kwH1(k).replace(/^\S+\s/, ''), X.kwAns(k, fN(sG), fN(lo - sG), fN(hi - sG))], ...X.faq.slice(0, 3)];
    write(L, path, page(L, {
      path, title: X.kwTitle(k), description: X.kwDesc(k, fN(sG), fN(lo), fN(hi)),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [`${k} kW`, path]]), faqLd(kfaq)],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${k} kW</p>
<h1>${esc(X.kwH1(k))}</h1><p class="sl-ans">${esc(X.kwAns(k, fN(sG), fN(lo - sG), fN(hi - sG)))}</p>
<table class="sl-t"><tr>${X.tbl.map((t) => `<th>${esc(t)}</th>`).join('')}</tr>${rows.map(([a, b]) => `<tr><td>${esc(a)}</td><td><b>${esc(b)}</b></td></tr>`).join('')}</table>
<div class="ad" aria-hidden="true"></div>
<h2>🧮 ${esc(X.h1.replace(/^\S+\s/, ''))}</h2>${form(k * GEN)}
${rules}<h2>${esc(X.kwH)}</h2><p class="chips">${kwLinks}</p>${crossLink(ihub, I.h1.replace(/^\S+\s/, ''))}${faqHtml(X.faq.slice(0, 3))}</div>`,
      scripts: ['/assets/solar.js'],
    }));
  }

  // Inverter hub
  const icfg = { ui: { load: I.load, va: I.va, volt: I.volt, bat: I.bat, batN: I.batN(0).replace(/^0/, '{n}') }, sizes: VA_SIZES };
  const defaults = { bulb: 4, tube: 2, fan: 3, tv: 1, router: 1, charger: 2 };
  const iform = `<script type="application/json" id="iv-cfg">${JSON.stringify(icfg)}</script><table class="sl-t"><tr><th></th><th>W</th><th>${esc(I.qty)}</th></tr>${APPL.map(([key, w]) => `<tr><td>${esc(I.a[key])}</td><td>${w}</td><td><input class="sl-q iv-q" type="number" min="0" value="${defaults[key] || 0}" data-w="${w}" aria-label="${esc(I.a[key])}"></td></tr>`).join('')}</table><div class="sl-f"><label>${esc(I.hours)}<input id="iv-h" type="number" value="3" min="0.5" step="0.5"></label></div><div id="iv-out" aria-live="polite"></div>`;
  write(L, ihub, page(L, {
    path: ihub, title: I.title, description: I.desc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.invNav, ihub]]), faqLd(I.faq)],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.invNav)}</p><h1>${esc(I.h1)}</h1><p class="lead">${esc(I.lead)}</p>${iform}
<div class="ad" aria-hidden="true"></div><h2>${esc(X.rulesH)}</h2>${ul(I.rules)}<p class="sl-w">⚠️ ${esc(I.warn)}</p>${crossLink(hub, X.h1.replace(/^\S+\s/, ''))}${faqHtml(I.faq)}</div>`,
    scripts: ['/assets/solar.js'],
  }));
}
