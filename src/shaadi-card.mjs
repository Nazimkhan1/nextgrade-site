/**
 * Shaadi Card Maker — a free wedding-invitation (शुभ विवाह) card maker at /shaadi-card/.
 * The card is drawn on a <canvas> in the browser (src/assets/shaadi-card.js); nothing is uploaded.
 * Many templates + user-pickable colour combinations. Scheduled as 'page:shaadi-card' in releases.mjs.
 *
 * Template palette order: [accent/ink, heading, line/border, bgTop, bgBottom]
 */
// style = drawing engine (garland/royal/floral/mandala/arch/botanical/lights/minimal). palette: [ink, gold, line, bgTop, bgBottom]
const SHAADI_TEMPLATES = [
  { id: 'royal-red',    name: { hi: 'रॉयल लाल · गेंदा', en: 'Royal Red · Marigold' }, style: 'garland',   motif: 'ganesh',  palette: ['#7a1420', '#b8860b', '#b8860b', '#fff6ea', '#ffe6c9'] },
  { id: 'marigold',     name: { hi: 'केसरिया गेंदा', en: 'Saffron Marigold' },        style: 'garland',   motif: 'kalash',  palette: ['#8a2a12', '#e08a1e', '#cf7a16', '#fff3e0', '#ffe0b8'] },
  { id: 'maroon-royal', name: { hi: 'मैरून रॉयल', en: 'Maroon Royal' },               style: 'royal',     motif: 'om',      palette: ['#5a1020', '#c9a227', '#c9a227', '#fbeede', '#f3d9b8'] },
  { id: 'rose-floral',  name: { hi: 'रोज़ फ्लोरल', en: 'Rose Floral' },               style: 'floral',    motif: 'floral',  palette: ['#8f2d4e', '#c0795a', '#cf8f6f', '#fff2f4', '#ffe0e7'] },
  { id: 'royal-blue',   name: { hi: 'रॉयल ब्लू मंडल', en: 'Royal Blue Mandala' },     style: 'mandala',   motif: 'rings',   palette: ['#17315c', '#c9a227', '#c9a227', '#eef3fb', '#dbe7f7'] },
  { id: 'green-gold',   name: { hi: 'ग्रीन आर्च', en: 'Green Arch' },                 style: 'arch',      motif: 'diya',    palette: ['#124734', '#c9a227', '#c9a227', '#eef7f1', '#d6ecdf'] },
  { id: 'peach-botan',  name: { hi: 'पीच बॉटैनिकल', en: 'Peach Botanical' },          style: 'botanical', motif: 'floral',  palette: ['#8a4b2f', '#c58a4e', '#caa06a', '#fff6ee', '#ffe6d2'] },
  { id: 'purple-mand',  name: { hi: 'पर्पल मंडल · मोर', en: 'Purple Mandala · Peacock' }, style: 'mandala', motif: 'peacock', palette: ['#4a2060', '#caa227', '#caa227', '#f6effc', '#e7d6f5'] },
  { id: 'teal-lights',  name: { hi: 'टील तोरण', en: 'Teal Toran' },                   style: 'lights',    motif: 'rings',   palette: ['#0f5c5c', '#c9a227', '#c9a227', '#eafafa', '#cdeeee'] },
  { id: 'classic',      name: { hi: 'क्लासिक मिनिमल', en: 'Classic Minimal' },        style: 'minimal',   motif: 'rings',   palette: ['#20201c', '#c9a227', '#c9a227', '#faf8f1', '#eee7d4'] },
  { id: 'pink-garland', name: { hi: 'पिंक गेंदा', en: 'Pink Garland' },               style: 'garland',   motif: 'floral',  palette: ['#9a2d63', '#d79a3a', '#d79a3a', '#fff2f8', '#ffdcec'] },
  { id: 'navy-royal',   name: { hi: 'नेवी रॉयल · गणेश', en: 'Navy Royal · Ganesh' },  style: 'royal',     motif: 'ganesh',  palette: ['#16233f', '#c9a227', '#c9a227', '#eef1f8', '#d8e0f1'] },
];

// User-pickable colour combinations (same slots as palette). "custom" lets them pick their own two colours.
const SHAADI_COLORS = [
  { id: 'redgold',  name: { hi: 'लाल–सुनहरा', en: 'Red & Gold' },     palette: ['#7a1420', '#b8860b', '#b8860b', '#fff4e6', '#ffe3c2'] },
  { id: 'maroon',   name: { hi: 'मैरून–क्रीम', en: 'Maroon & Cream' }, palette: ['#5a1020', '#d4a017', '#d4a017', '#fbeede', '#f3d9b8'] },
  { id: 'rose',     name: { hi: 'रोज़–गोल्ड', en: 'Rose Gold' },       palette: ['#9a3b5a', '#c08457', '#d19a7a', '#fff1f2', '#ffe0e6'] },
  { id: 'blue',     name: { hi: 'नीला–सुनहरा', en: 'Blue & Gold' },    palette: ['#17315c', '#c9a227', '#c9a227', '#eef3fb', '#dbe7f7'] },
  { id: 'green',    name: { hi: 'हरा–सुनहरा', en: 'Green & Gold' },    palette: ['#124734', '#c9a227', '#c9a227', '#eef7f1', '#d6ecdf'] },
  { id: 'purple',   name: { hi: 'पर्पल–गोल्ड', en: 'Purple & Gold' },  palette: ['#4a2060', '#caa227', '#caa227', '#f6effc', '#e7d6f5'] },
  { id: 'teal',     name: { hi: 'टील–गोल्ड', en: 'Teal & Gold' },      palette: ['#0f5c5c', '#c9a227', '#c9a227', '#eafafa', '#cfeeee'] },
  { id: 'black',    name: { hi: 'ब्लैक–गोल्ड', en: 'Black & Gold' },    palette: ['#1b1b1b', '#c9a227', '#c9a227', '#f6f4ef', '#e9e4d6'] },
];

const SHAADI_UI = {
  hi: {
    title: 'शादी का कार्ड बनाएं — फ्री शुभ विवाह Invitation Card Maker (हिंदी) | NextGrade',
    desc: 'फ्री ऑनलाइन शादी कार्ड मेकर: नाम, तारीख़ और जगह डालें, रंग और डिज़ाइन चुनें और सुंदर शुभ विवाह निमंत्रण कार्ड बनाकर डाउनलोड करें या WhatsApp पर भेजें। कई टेम्पलेट, अपनी पसंद के रंग।',
    h1: '💍 शादी का कार्ड बनाएं',
    lead: 'दूल्हा-दुल्हन का नाम, तारीख़ और जगह भरें, अपनी पसंद का डिज़ाइन और रंग चुनें — और एक सुंदर शुभ विवाह निमंत्रण कार्ड तुरंत बनाएं। मुफ़्त, आपके फ़ोन में ही बनता है, डाउनलोड करें या WhatsApp पर भेजें।',
    tplH: 'डिज़ाइन (टेम्पलेट)', colorH: 'रंग', customColor: 'अपना रंग', secondColor: 'दूसरा रंग',
    f: { heading: 'ऊपर लिखें', groom: 'दूल्हे का नाम', bride: 'दुल्हन का नाम', date: 'तारीख़', day: 'दिन', time: 'समय', venue: 'जगह / पता', family: 'परिवार की ओर से', note: 'छोटा संदेश (नीचे)' },
    ph: { heading: 'शुभ विवाह', groom: 'राहुल', bride: 'प्रिया', date: '12 दिसंबर 2026', day: 'रविवार', time: 'शाम 7 बजे', venue: 'ग्रैंड पैलेस, दिल्ली', family: 'शर्मा एवं वर्मा परिवार', note: 'आपकी उपस्थिति हमारा सौभाग्य होगी' },
    weds: 'विवाह', and: '॥ शुभ विवाह ॥',
    download: '⬇️ डाउनलोड', print: '🖨️ प्रिंट', share: '💬 WhatsApp पर भेजें', preview: 'कार्ड प्रीव्यू',
    downloaded: 'कार्ड डाउनलोड हो गया ✓ — WhatsApp/प्रिंट में इस्तेमाल करें।', cantShare: 'इस फ़ोन पर सीधे शेयर नहीं हुआ — “डाउनलोड” करके WhatsApp पर भेजें।',
    howH: 'शादी का कार्ड कैसे बनाएं',
    how: [
      'दूल्हा और दुल्हन का नाम, शादी की तारीख़, दिन, समय और जगह भरें।',
      'नीचे दिए डिज़ाइन (टेम्पलेट) में से एक चुनें और अपनी पसंद का रंग/कॉम्बिनेशन सेट करें।',
      '“डाउनलोड” दबाकर कार्ड सेव करें, फिर WhatsApp पर भेजें या प्रिंट निकालें।',
      'पूरी गिनती और बनावट आपके फ़ोन में ही होती है — कोई जानकारी कहीं नहीं भेजी जाती।',
    ],
    introH: 'शुभ विवाह निमंत्रण कार्ड — घर बैठे, फ्री',
    intro: [
      'शादी के कार्ड के लिए अक्सर दुकानों या वेबसाइटों पर ₹100 से ₹900 तक देने पड़ते हैं। यहाँ आप वही काम बिल्कुल मुफ़्त कर सकते हैं — दूल्हा-दुल्हन का नाम, तारीख़ और जगह भरिए, डिज़ाइन और रंग चुनिए, और एक सुंदर शुभ विवाह निमंत्रण कार्ड बनाकर सीधे WhatsApp पर भेज दीजिए।',
      'यहाँ कई तैयार डिज़ाइन (टेम्पलेट) हैं — रॉयल लाल, मैरून-गोल्ड, रोज़ गोल्ड, रॉयल ब्लू, ग्रीन-गोल्ड और भी। हर डिज़ाइन में आप अपने हिसाब से रंग बदल सकते हैं, और दो रंगों का अपना कॉम्बिनेशन भी चुन सकते हैं। जो कार्ड बनता है वह प्रिंट के लिए भी साफ़ और बड़ा (HD) होता है।',
      'यह टूल पूरी तरह आपके फ़ोन या कंप्यूटर में चलता है — आपका कोई नाम, फ़ोटो या जानकारी कहीं अपलोड या सेव नहीं होती। इंटरनेट धीमा हो तब भी कार्ड बन जाता है।',
    ],
    faq: [
      ['क्या शादी का कार्ड सच में मुफ़्त है?', 'हाँ, बिल्कुल मुफ़्त। कोई छुपा चार्ज नहीं, कोई watermark नहीं। जितने चाहें उतने कार्ड बनाइए।'],
      ['कार्ड कैसे डाउनलोड या WhatsApp पर भेजें?', '“डाउनलोड” दबाने पर कार्ड आपके फ़ोन में PNG इमेज के रूप में सेव हो जाता है। फिर उसे WhatsApp, Instagram या किसी भी जगह शेयर कर सकते हैं। “WhatsApp पर भेजें” बटन सीधे शेयर भी कर देता है (जहाँ फ़ोन सपोर्ट करता है)।'],
      ['क्या मैं रंग और डिज़ाइन बदल सकता हूँ?', 'हाँ। कई टेम्पलेट दिए गए हैं और हर एक में आप रंग/कॉम्बिनेशन बदल सकते हैं — लाल-सुनहरा, मैरून, रॉयल ब्लू, ग्रीन, पर्पल, या अपना रंग।'],
      ['क्या इसे प्रिंट करा सकते हैं?', 'हाँ, कार्ड HD (1080×1500) में बनता है जो प्रिंट के लिए अच्छा है। “प्रिंट” बटन से सीधे प्रिंट भी निकाल सकते हैं।'],
      ['क्या मेरी जानकारी सुरक्षित है?', 'हाँ। पूरा कार्ड आपके ब्राउज़र में बनता है — कोई नाम या जानकारी कहीं नहीं भेजी या सेव की जाती।'],
    ],
    shareText: 'मैंने NextGrade पर फ्री शादी का कार्ड बनाया 💍 तुम भी बनाओ:',
  },
  en: {
    title: 'Shaadi Card Maker — Free Online Wedding Invitation Card Maker | NextGrade',
    desc: 'Free online wedding (shaadi) invitation card maker: add names, date and venue, pick a design and colours, and make a beautiful Shubh Vivah card to download or share on WhatsApp. Many templates, custom colours.',
    h1: '💍 Shaadi Card Maker',
    lead: "Add the groom's and bride's names, the date and the venue, pick a design and colours — and make a beautiful wedding (Shubh Vivah) invitation card in seconds. Free, made right on your phone, download it or share on WhatsApp.",
    tplH: 'Design (template)', colorH: 'Colours', customColor: 'Your colour', secondColor: 'Second colour',
    f: { heading: 'Heading', groom: "Groom's name", bride: "Bride's name", date: 'Date', day: 'Day', time: 'Time', venue: 'Venue / address', family: 'From the family', note: 'Short message (bottom)' },
    ph: { heading: 'Shubh Vivah', groom: 'Rahul', bride: 'Priya', date: '12 December 2026', day: 'Sunday', time: '7:00 PM', venue: 'Grand Palace, Delhi', family: 'Sharma & Verma families', note: 'Your presence will be our honour' },
    weds: 'weds', and: 'Shubh Vivah',
    download: '⬇️ Download', print: '🖨️ Print', share: '💬 Share on WhatsApp', preview: 'Card preview',
    downloaded: 'Card downloaded ✓ — use it on WhatsApp / print.', cantShare: "Couldn't share directly — tap “Download”, then send on WhatsApp.",
    howH: 'How to make a wedding card',
    how: [
      "Fill in the groom's and bride's names, the wedding date, day, time and venue.",
      'Pick one of the designs (templates) below and set your favourite colour / combination.',
      'Tap “Download” to save the card, then send it on WhatsApp or print it.',
      'Everything is drawn on your own device — no name or detail is ever uploaded.',
    ],
    introH: 'Wedding invitation card — free, from home',
    intro: [
      'Wedding invitation cards usually cost ₹100–₹900 at shops or on other sites. Here you can do the same thing completely free — fill in the names, date and venue, choose a design and colours, and make a beautiful Shubh Vivah invitation card to send straight on WhatsApp.',
      'There are many ready designs — Royal Red, Maroon Gold, Rose Gold, Royal Blue, Green Gold and more. In every design you can change the colours, or pick your own two-colour combination. The card is made in HD so it is crisp enough to print too.',
      'The tool runs fully on your phone or computer — no name, photo or detail is uploaded or saved anywhere. It works even on a slow connection.',
    ],
    faq: [
      ['Is the wedding card really free?', 'Yes, completely free. No hidden charge and no watermark. Make as many cards as you like.'],
      ['How do I download or share it on WhatsApp?', 'Tap “Download” and the card is saved to your phone as a PNG image, which you can share on WhatsApp, Instagram or anywhere. The “Share on WhatsApp” button also shares it directly where the phone supports it.'],
      ['Can I change the colours and design?', 'Yes. There are many templates and in each one you can change the colour / combination — red-gold, maroon, royal blue, green, purple, or your own colour.'],
      ['Can I print it?', 'Yes, the card is made in HD (1080×1500), good for printing. The “Print” button prints it directly.'],
      ['Is my information safe?', 'Yes. The whole card is drawn in your browser — no name or detail is sent or saved anywhere.'],
    ],
    shareText: 'I made a free wedding card on NextGrade 💍 Make yours too:',
  },
  hinglish: {
    title: 'Shaadi Card Maker — Free Shubh Vivah Wedding Invitation Card (Hinglish) | NextGrade',
    desc: 'Free online shaadi card maker: naam, date aur venue daalo, design aur colour choose karo, aur sundar Shubh Vivah invitation card banao — download ya WhatsApp pe bhejo. Bahut templates, apni pasand ke colours.',
    h1: '💍 Shaadi Card Maker',
    lead: 'Dulha-dulhan ka naam, date aur jagah bharo, apni pasand ka design aur colour choose karo — aur ek sundar Shubh Vivah invitation card turant banao. Free, phone mein hi banta hai, download karo ya WhatsApp pe bhejo.',
    tplH: 'Design (template)', colorH: 'Colour', customColor: 'Apna colour', secondColor: 'Doosra colour',
    f: { heading: 'Upar likho', groom: 'Dulhe ka naam', bride: 'Dulhan ka naam', date: 'Date', day: 'Din', time: 'Time', venue: 'Jagah / address', family: 'Parivar ki or se', note: 'Chhota message (niche)' },
    ph: { heading: 'Shubh Vivah', groom: 'Rahul', bride: 'Priya', date: '12 December 2026', day: 'Sunday', time: 'Shaam 7 baje', venue: 'Grand Palace, Delhi', family: 'Sharma & Verma parivar', note: 'Aapki upasthiti hamara saubhagya hoga' },
    weds: 'weds', and: 'Shubh Vivah',
    download: '⬇️ Download', print: '🖨️ Print', share: '💬 WhatsApp pe bhejo', preview: 'Card preview',
    downloaded: 'Card download ho gaya ✓ — WhatsApp/print mein use karo.', cantShare: 'Seedha share nahi hua — “Download” karke WhatsApp pe bhejo.',
    howH: 'Shaadi card kaise banayein',
    how: [
      'Dulha aur dulhan ka naam, shaadi ki date, din, time aur jagah bharo.',
      'Niche diye design (template) mein se ek choose karo aur apni pasand ka colour/combination set karo.',
      '“Download” dabake card save karo, phir WhatsApp pe bhejo ya print nikaalo.',
      'Poora card aapke device mein hi banta hai — koi jaankari kahin upload nahi hoti.',
    ],
    introH: 'Shubh Vivah invitation card — ghar baithe, free',
    intro: [
      'Shaadi ke card ke liye aksar ₹100 se ₹900 tak dene padte hain. Yahan aap wahi kaam bilkul free kar sakte ho — naam, date aur jagah bharo, design aur colour choose karo, aur sundar Shubh Vivah card banake seedha WhatsApp pe bhej do.',
      'Yahan bahut ready designs hain — Royal Red, Maroon Gold, Rose Gold, Royal Blue, Green Gold aur bhi. Har design mein colour badal sakte ho, ya do colours ka apna combination bhi choose kar sakte ho. Card HD mein banta hai, print ke liye bhi saaf.',
      'Yeh tool poori tarah aapke phone/computer mein chalta hai — koi naam, photo ya detail kahin upload ya save nahi hoti.',
    ],
    faq: [
      ['Kya shaadi card sach mein free hai?', 'Haan, bilkul free. Koi hidden charge nahi, koi watermark nahi. Jitne chaho utne card banao.'],
      ['Card download ya WhatsApp pe kaise bhejein?', '“Download” dabane par card PNG image ke roop mein phone mein save ho jata hai, jise WhatsApp/Instagram pe share kar sakte ho. “WhatsApp pe bhejo” button seedha share bhi karta hai.'],
      ['Kya colour aur design badal sakte hain?', 'Haan. Bahut templates hain aur har ek mein colour/combination badal sakte ho — red-gold, maroon, royal blue, green, purple, ya apna colour.'],
      ['Kya ise print kara sakte hain?', 'Haan, card HD (1080×1500) mein banta hai jo print ke liye accha hai. “Print” button se seedha print nikaal sakte ho.'],
      ['Kya meri jaankari safe hai?', 'Haan. Poora card browser mein banta hai — koi detail kahin bheji ya save nahi hoti.'],
    ],
    shareText: 'Maine NextGrade pe free shaadi card banaya 💍 Tum bhi banao:',
  },
  bn: {
    title: 'বিয়ের কার্ড মেকার — ফ্রি শুভ বিবাহ Invitation Card Maker | NextGrade',
    desc: 'ফ্রি অনলাইন বিয়ের কার্ড মেকার: নাম, তারিখ ও জায়গা দিন, ডিজাইন ও রঙ বাছুন এবং সুন্দর শুভ বিবাহ নিমন্ত্রণ কার্ড বানিয়ে ডাউনলোড করুন বা WhatsApp-এ পাঠান। অনেক টেমপ্লেট, নিজের পছন্দের রঙ।',
    h1: '💍 বিয়ের কার্ড মেকার',
    lead: 'বর-কনের নাম, তারিখ ও জায়গা লিখুন, পছন্দের ডিজাইন ও রঙ বাছুন — আর সুন্দর শুভ বিবাহ নিমন্ত্রণ কার্ড সঙ্গে সঙ্গে বানান। ফ্রি, ফোনেই তৈরি হয়, ডাউনলোড করুন বা WhatsApp-এ পাঠান।',
    tplH: 'ডিজাইন (টেমপ্লেট)', colorH: 'রঙ', customColor: 'নিজের রঙ', secondColor: 'দ্বিতীয় রঙ',
    f: { heading: 'উপরে লিখুন', groom: 'বরের নাম', bride: 'কনের নাম', date: 'তারিখ', day: 'দিন', time: 'সময়', venue: 'জায়গা / ঠিকানা', family: 'পরিবারের পক্ষ থেকে', note: 'ছোট বার্তা (নিচে)' },
    ph: { heading: 'শুভ বিবাহ', groom: 'রাহুল', bride: 'প্রিয়া', date: '১২ ডিসেম্বর ২০২৬', day: 'রবিবার', time: 'সন্ধ্যা ৭টা', venue: 'গ্র্যান্ড প্যালেস, কলকাতা', family: 'শর্মা ও বর্মা পরিবার', note: 'আপনার উপস্থিতি আমাদের সৌভাগ্য' },
    weds: 'বিবাহ', and: 'শুভ বিবাহ',
    download: '⬇️ ডাউনলোড', print: '🖨️ প্রিন্ট', share: '💬 WhatsApp-এ পাঠান', preview: 'কার্ড প্রিভিউ',
    downloaded: 'কার্ড ডাউনলোড হয়েছে ✓ — WhatsApp/প্রিন্টে ব্যবহার করুন।', cantShare: 'সরাসরি শেয়ার হয়নি — “ডাউনলোড” করে WhatsApp-এ পাঠান।',
    howH: 'বিয়ের কার্ড কীভাবে বানাবেন',
    how: [
      'বর ও কনের নাম, বিয়ের তারিখ, দিন, সময় ও জায়গা লিখুন।',
      'নিচের ডিজাইন (টেমপ্লেট) থেকে একটি বাছুন এবং পছন্দের রঙ/কম্বিনেশন দিন।',
      '“ডাউনলোড” চেপে কার্ড সেভ করুন, তারপর WhatsApp-এ পাঠান বা প্রিন্ট করুন।',
      'পুরো কার্ড আপনার ডিভাইসেই তৈরি হয় — কোনো তথ্য কোথাও আপলোড হয় না।',
    ],
    introH: 'শুভ বিবাহ নিমন্ত্রণ কার্ড — ঘরে বসে, ফ্রি',
    intro: [
      'বিয়ের কার্ডের জন্য অনেক সময় ₹১০০ থেকে ₹৯০০ পর্যন্ত লাগে। এখানে আপনি সেটাই একদম ফ্রি করতে পারেন — নাম, তারিখ ও জায়গা লিখুন, ডিজাইন ও রঙ বাছুন, আর সুন্দর শুভ বিবাহ কার্ড বানিয়ে সরাসরি WhatsApp-এ পাঠান।',
      'এখানে অনেক তৈরি ডিজাইন আছে — Royal Red, Maroon Gold, Rose Gold, Royal Blue, Green Gold আরও। প্রতিটি ডিজাইনে রঙ বদলাতে পারেন, বা দুটি রঙের নিজের কম্বিনেশনও বাছতে পারেন। কার্ড HD-তে তৈরি হয়, প্রিন্টের জন্যও পরিষ্কার।',
      'টুলটি পুরোপুরি আপনার ফোন/কম্পিউটারে চলে — কোনো নাম, ছবি বা তথ্য কোথাও আপলোড বা সেভ হয় না।',
    ],
    faq: [
      ['বিয়ের কার্ড কি সত্যিই ফ্রি?', 'হ্যাঁ, একদম ফ্রি। কোনো লুকানো চার্জ নেই, কোনো watermark নেই। যত খুশি কার্ড বানান।'],
      ['কার্ড ডাউনলোড বা WhatsApp-এ কীভাবে পাঠাব?', '“ডাউনলোড” চাপলে কার্ড PNG ছবি হিসেবে ফোনে সেভ হয়, যা WhatsApp/Instagram-এ শেয়ার করা যায়। “WhatsApp-এ পাঠান” বোতাম সরাসরিও শেয়ার করে।'],
      ['রঙ ও ডিজাইন কি বদলানো যায়?', 'হ্যাঁ। অনেক টেমপ্লেট আছে এবং প্রতিটিতে রঙ/কম্বিনেশন বদলানো যায় — red-gold, maroon, royal blue, green, purple, বা নিজের রঙ।'],
      ['এটি কি প্রিন্ট করা যায়?', 'হ্যাঁ, কার্ড HD (1080×1500)-তে তৈরি হয় যা প্রিন্টের জন্য ভালো। “প্রিন্ট” বোতামে সরাসরি প্রিন্ট করা যায়।'],
      ['আমার তথ্য কি নিরাপদ?', 'হ্যাঁ। পুরো কার্ড ব্রাউজারে তৈরি হয় — কোনো তথ্য কোথাও পাঠানো বা সেভ হয় না।'],
    ],
    shareText: 'আমি NextGrade-এ ফ্রি বিয়ের কার্ড বানিয়েছি 💍 আপনিও বানান:',
  },
};

export { SHAADI_TEMPLATES, SHAADI_COLORS, SHAADI_UI };
