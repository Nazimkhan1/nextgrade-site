/**
 * More kids sets (user, 24 Nov 2026: "1 to 11 points kar lo" — ginti, pahade, barakhadi, matra, days/months,
 * colours, vegetables, birds, body parts, shapes/vehicles/flowers, Urdu haroof), all with recorded voice clips.
 *
 * Set shapes (see build.mjs, kids section):
 *  - multilingual: items {emoji, en, hi, bn, emojiBn?, big?, bigBn?}; each language page speaks its own language.
 *    big/bigBn = fixed big text (e.g. "2 × 3 = 6"), the spoken sentence then shows under it.
 *  - fixedLang: items {letter, emoji, word, speak?}; one language on every page.
 *  - children: a set made of several sub-pages (/kids/<slug>/<child>/), e.g. one page per table.
 *  - noCorner: hide the small first-letter badge on the cards.
 */

// ---------- numbers ----------
const HI = 'एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चौवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे सौ'.split(' ');
const BN = 'এক দুই তিন চার পাঁচ ছয় সাত আট নয় দশ এগারো বারো তেরো চোদ্দ পনেরো ষোলো সতেরো আঠারো উনিশ কুড়ি একুশ বাইশ তেইশ চব্বিশ পঁচিশ ছাব্বিশ সাতাশ আঠাশ ঊনত্রিশ ত্রিশ একত্রিশ বত্রিশ তেত্রিশ চৌত্রিশ পঁয়ত্রিশ ছত্রিশ সাঁইত্রিশ আটত্রিশ ঊনচল্লিশ চল্লিশ একচল্লিশ বিয়াল্লিশ তেতাল্লিশ চুয়াল্লিশ পঁয়তাল্লিশ ছেচল্লিশ সাতচল্লিশ আটচল্লিশ ঊনপঞ্চাশ পঞ্চাশ একান্ন বাহান্ন তিপ্পান্ন চুয়ান্ন পঞ্চান্ন ছাপ্পান্ন সাতান্ন আটান্ন ঊনষাট ষাট একষট্টি বাষট্টি তেষট্টি চৌষট্টি পঁয়ষট্টি ছেষট্টি সাতষট্টি আটষট্টি ঊনসত্তর সত্তর একাত্তর বাহাত্তর তিয়াত্তর চুয়াত্তর পঁচাত্তর ছিয়াত্তর সাতাত্তর আটাত্তর ঊনআশি আশি একাশি বিরাশি তিরাশি চুরাশি পঁচাশি ছিয়াশি সাতাশি অষ্টাশি ঊননব্বই নব্বই একানব্বই বিরানব্বই তিরানব্বই চুরানব্বই পঁচানব্বই ছিয়ানব্বই সাতানব্বই আটানব্বই নিরানব্বই একশো'.split(' ');
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const enNum = (n) => (n === 100 ? 'One Hundred' : n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : ''));
const hiNum = (n) => (n <= 100 ? HI[n - 1] : n === 200 ? 'दो सौ' : 'एक सौ ' + HI[n - 101]);
const bnNum = (n) => (n <= 100 ? BN[n - 1] : n === 200 ? 'দুশো' : 'একশো ' + BN[n - 101]);
const bnDigits = (x) => String(x).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
if (HI.length !== 100 || BN.length !== 100) throw new Error('kids-more: number lists must have 100 words');

const GINTI = {
  slug: 'ginti', emoji: '🔢', noCorner: true,
  name: { hi: 'गिनती 1 से 100', en: 'Numbers 1 to 100', hinglish: 'Ginti 1 se 100', bn: 'সংখ্যা ১ থেকে ১০০ (গণনা)' },
  items: Array.from({ length: 100 }, (_, i) => ({ emoji: String(i + 1), emojiBn: bnDigits(i + 1), en: enNum(i + 1), hi: HI[i], bn: BN[i] })),
};

// Pahade: traditional way of saying them ("दो दूनी चार", "দুই দুগুণে চার")
const HM = ['', 'एकम', 'दूनी', 'तिया', 'चौके', 'पंजे', 'छक्के', 'सत्ते', 'अट्ठे', 'नवे', 'दहाई'];
const BM = ['', 'এক্কে', 'দুগুণে', 'তিরিক্কে', 'চারে', 'পাঁচে', 'ছয়ে', 'সাতে', 'আটে', 'নয়ে', 'দশে'];
const PAHADE = {
  slug: 'pahade', emoji: '✖️', noCorner: true,
  name: { hi: 'पहाड़े 2 से 20', en: 'Tables 2 to 20', hinglish: 'Pahade 2 se 20', bn: 'নামতা ২ থেকে ২০' },
  children: Array.from({ length: 19 }, (_, j) => {
    const n = j + 2;
    return {
      slug: String(n), emoji: String(n), emojiBn: bnDigits(n),
      name: { hi: `${n} का पहाड़ा`, en: `Table of ${n}`, hinglish: `${n} ka Pahada`, bn: `${bnDigits(n)}-এর নামতা` },
      items: Array.from({ length: 10 }, (_, i) => {
        const k = i + 1, p = n * k;
        return {
          emoji: '', big: `${n} × ${k} = ${p}`, bigBn: `${bnDigits(n)} × ${bnDigits(k)} = ${bnDigits(p)}`,
          en: `${n} times ${k} is ${p}`, hi: `${hiNum(n)} ${HM[k]} ${hiNum(p)}`, bn: `${bnNum(n)} ${BM[k]} ${bnNum(p)}`,
        };
      }),
    };
  }),
};

// ---------- Hindi letters ----------
const CONS = [['क', '🕊️'], ['ख', '🐰'], ['ग', '🪴'], ['घ', '🏠'], ['च', '🥄'], ['छ', '☂️'], ['ज', '🚢'], ['झ', '🚩'], ['ट', '🍅'], ['ठ', '🛒'], ['ड', '🥁'], ['ढ', '🪘'], ['ण', '✏️'],
  ['त', '🍉'], ['थ', '🍽️'], ['द', '🚪'], ['ध', '🏹'], ['न', '🚰'], ['प', '🪁'], ['फ', '🌸'], ['ब', '🦆'], ['भ', '🐻'], ['म', '🐟'], ['य', '🔥'], ['र', '🪢'], ['ल', '🏮'], ['व', '🌳'],
  ['श', '🦁'], ['ष', '🔯'], ['स', '🍎'], ['ह', '🐘'], ['क्ष', '⚔️'], ['त्र', '🔱'], ['ज्ञ', '📚']];
const MATRAS = ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'];
const TR = { 'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na-murdhanya', 'त': 'ta-dantya', 'थ': 'tha-dantya', 'द': 'da-dantya', 'ध': 'dha-dantya', 'न': 'na', 'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma', 'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha-murdhanya', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya' };
const BARAKHADI = {
  slug: 'barakhadi', emoji: '🔠', fixedLang: 'hi',
  name: { hi: 'बारहखड़ी (क का कि की)', en: 'Hindi Barakhadi (Ka Kaa Ki Kee)', hinglish: 'Barakhadi — Ka Kaa Ki Kee', bn: 'হিন্দি বারাখড়ি (ক কা কি কী)' },
  children: CONS.map(([c, e]) => ({
    slug: TR[c], emoji: c,
    name: { hi: `${c} की बारहखड़ी`, en: `Barakhadi of ${c} (${TR[c].split('-')[0]})`, hinglish: `${c} ki Barakhadi`, bn: `${c}-এর বারাখড়ি` },
    items: MATRAS.map((m) => ({ letter: c + m, emoji: e, word: '' })),
  })),
};

const W = (s) => s.split(' ').map((x) => { const [w, e] = x.split(':'); return { letter: w, emoji: e, word: '' }; });
const MATRA = {
  slug: 'matra', emoji: '✍️', fixedLang: 'hi',
  name: { hi: 'मात्रा वाले शब्द', en: 'Hindi Matra Words', hinglish: 'Matra wale Shabd', bn: 'হিন্দি মাত্রার শব্দ' },
  children: [
    { slug: 'aa', emoji: 'ा', name: { hi: 'आ की मात्रा (ा) वाले शब्द', en: 'Aa matra (ा) words', hinglish: 'Aa ki matra (ा) wale shabd', bn: 'আ-কার (ा) শব্দ' }, items: W('नाक:👃 कान:👂 राजा:🤴 गाय:🐄 नाव:⛵ ताला:🔒 माला:📿 बादल:☁️') },
    { slug: 'i', emoji: 'ि', name: { hi: 'इ की मात्रा (ि) वाले शब्द', en: 'I matra (ि) words', hinglish: 'Chhoti i ki matra (ि) wale shabd', bn: 'ই-কার (ि) শব্দ' }, items: W('किताब:📖 दिल:❤️ बिल्ली:🐱 तितली:🦋 मिठाई:🍬 खिड़की:🪟 गिलास:🥛 दिया:🪔') },
    { slug: 'ee', emoji: 'ी', name: { hi: 'ई की मात्रा (ी) वाले शब्द', en: 'Ee matra (ी) words', hinglish: 'Badi ee ki matra (ी) wale shabd', bn: 'ঈ-কার (ी) শব্দ' }, items: W('मछली:🐟 तीर:🏹 खीरा:🥒 घड़ी:⌚ टोपी:🧢 चाबी:🔑 जीप:🚙 पानी:💧') },
    { slug: 'u', emoji: 'ु', name: { hi: 'उ की मात्रा (ु) वाले शब्द', en: 'U matra (ु) words', hinglish: 'Chhote u ki matra (ु) wale shabd', bn: 'উ-কার (ु) শব্দ' }, items: W('सुई:🪡 गुड़िया:🪆 कुत्ता:🐕 गुलाब:🌹 मुर्गा:🐓 कुर्सी:🪑 धुआँ:💨 पुल:🌉') },
    { slug: 'oo', emoji: 'ू', name: { hi: 'ऊ की मात्रा (ू) वाले शब्द', en: 'Oo matra (ू) words', hinglish: 'Bade oo ki matra (ू) wale shabd', bn: 'ঊ-কার (ू) শব্দ' }, items: W('फूल:🌸 चूहा:🐭 भालू:🐻 आलू:🥔 सूरज:☀️ जूता:👟 कबूतर:🕊️ दूध:🥛') },
    { slug: 'e', emoji: 'े', name: { hi: 'ए की मात्रा (े) वाले शब्द', en: 'E matra (े) words', hinglish: 'E ki matra (े) wale shabd', bn: 'এ-কার (े) শব্দ' }, items: W('केला:🍌 सेब:🍎 शेर:🦁 पेड़:🌳 रेल:🚂 पेन:🖊️ खेत:🌾 बेटी:👧') },
    { slug: 'ai', emoji: 'ै', name: { hi: 'ऐ की मात्रा (ै) वाले शब्द', en: 'Ai matra (ै) words', hinglish: 'Ai ki matra (ै) wale shabd', bn: 'ঐ-কার (ै) শব্দ' }, items: W('पैसा:💰 बैल:🐂 थैला:👜 पैर:🦶 कैंची:✂️ बैंगन:🍆 मैदान:🏟️ जैकेट:🧥') },
    { slug: 'o', emoji: 'ो', name: { hi: 'ओ की मात्रा (ो) वाले शब्द', en: 'O matra (ो) words', hinglish: 'O ki matra (ो) wale shabd', bn: 'ও-কার (ो) শব্দ' }, items: W('मोर:🦚 तोता:🦜 घोड़ा:🐴 रोटी:🫓 ढोल:🪘 गोभी:🥦 मोटर:🚗 सोना:🥇') },
    { slug: 'au', emoji: 'ौ', name: { hi: 'औ की मात्रा (ौ) वाले शब्द', en: 'Au matra (ौ) words', hinglish: 'Au ki matra (ौ) wale shabd', bn: 'ঔ-কার (ौ) শব্দ' }, items: W('कौआ:🐦‍⬛ नौका:⛵ मौसम:🌦️ फौजी:💂 दौड़:🏃 सौ:💯 पौधा:🪴 चौकीदार:👮') },
    { slug: 'anusvar', emoji: 'ं', name: { hi: 'अनुस्वार (ं) वाले शब्द', en: 'Anusvar (ं) words', hinglish: 'Anusvar (ं) wale shabd', bn: 'অনুস্বার (ं) শব্দ' }, items: W('पतंग:🪁 बंदर:🐵 शंख:🐚 अंगूर:🍇 गेंद:⚽ संतरा:🍊 कंघी:🪮 चंदा:🌙') },
  ],
};

// ---------- word sets (multilingual) ----------
const M = (rows) => rows.map(([emoji, en, hi, bn]) => ({ emoji, en, hi, bn }));
const DAYS = {
  slug: 'week-days', emoji: '📅',
  name: { hi: 'हफ़्ते के दिनों के नाम', en: 'Days of the Week', hinglish: 'Hafte ke Dinon ke Naam', bn: 'সপ্তাহের সাত দিনের নাম' },
  items: M([['🌙', 'Monday', 'सोमवार', 'সোমবার'], ['🔴', 'Tuesday', 'मंगलवार', 'মঙ্গলবার'], ['🟢', 'Wednesday', 'बुधवार', 'বুধবার'], ['🟡', 'Thursday', 'गुरुवार', 'বৃহস্পতিবার'],
    ['⚪', 'Friday', 'शुक्रवार', 'শুক্রবার'], ['🔵', 'Saturday', 'शनिवार', 'শনিবার'], ['☀️', 'Sunday', 'रविवार', 'রবিবার']]),
};
const MONTHS = {
  slug: 'months', emoji: '🗓️',
  name: { hi: 'महीनों के नाम', en: 'Months of the Year', hinglish: 'Mahino ke Naam', bn: 'বারো মাসের নাম' },
  items: M([['❄️', 'January', 'जनवरी', 'জানুয়ারি'], ['💝', 'February', 'फ़रवरी', 'ফেব্রুয়ারি'], ['🌸', 'March', 'मार्च', 'মার্চ'], ['🌷', 'April', 'अप्रैल', 'এপ্রিল'],
    ['☀️', 'May', 'मई', 'মে'], ['🌞', 'June', 'जून', 'জুন'], ['🌧️', 'July', 'जुलाई', 'জুলাই'], ['☔', 'August', 'अगस्त', 'আগস্ট'],
    ['🍂', 'September', 'सितंबर', 'সেপ্টেম্বর'], ['🪔', 'October', 'अक्टूबर', 'অক্টোবর'], ['🍁', 'November', 'नवंबर', 'নভেম্বর'], ['🎄', 'December', 'दिसंबर', 'ডিসেম্বর']]),
};
const HINDU_MONTHS = {
  slug: 'hindi-mahine', emoji: '🪔', fixedLang: 'hi',
  name: { hi: 'हिंदी महीनों के नाम (चैत्र से फाल्गुन)', en: 'Hindi Months (Chaitra to Phalgun)', hinglish: 'Hindi Mahino ke Naam (Chaitra–Phalgun)', bn: 'হিন্দি মাসের নাম (চৈত্র–ফাল্গুন)' },
  items: [['चैत्र', '🌸', 'मार्च–अप्रैल'], ['वैशाख', '🌾', 'अप्रैल–मई'], ['ज्येष्ठ', '☀️', 'मई–जून'], ['आषाढ़', '🌦️', 'जून–जुलाई'], ['श्रावण', '🌧️', 'जुलाई–अगस्त'], ['भाद्रपद', '☔', 'अगस्त–सितंबर'],
    ['आश्विन', '🌤️', 'सितंबर–अक्टूबर'], ['कार्तिक', '🪔', 'अक्टूबर–नवंबर'], ['मार्गशीर्ष', '🍂', 'नवंबर–दिसंबर'], ['पौष', '❄️', 'दिसंबर–जनवरी'], ['माघ', '🌫️', 'जनवरी–फ़रवरी'], ['फाल्गुन', '🎨', 'फ़रवरी–मार्च']]
    .map(([letter, emoji, word]) => ({ letter, emoji, word, speak: letter })),
};
const COLOURS = {
  slug: 'colours', emoji: '🎨',
  name: { hi: 'रंगों के नाम', en: 'Colours Names', hinglish: 'Rangon ke Naam (Colours)', bn: 'রঙের নাম' },
  items: M([['🔴', 'Red', 'लाल', 'লাল'], ['🔵', 'Blue', 'नीला', 'নীল'], ['🟢', 'Green', 'हरा', 'সবুজ'], ['🟡', 'Yellow', 'पीला', 'হলুদ'], ['🟠', 'Orange', 'नारंगी', 'কমলা'],
    ['🟣', 'Purple', 'बैंगनी', 'বেগুনি'], ['🩷', 'Pink', 'गुलाबी', 'গোলাপি'], ['⚫', 'Black', 'काला', 'কালো'], ['⚪', 'White', 'सफ़ेद', 'সাদা'], ['🟤', 'Brown', 'भूरा', 'বাদামি'],
    ['🩶', 'Grey', 'स्लेटी', 'ধূসর'], ['🩵', 'Sky Blue', 'आसमानी', 'আকাশি'], ['🥇', 'Golden', 'सुनहरा', 'সোনালি'], ['🥈', 'Silver', 'चाँदी जैसा', 'রুপালি']]),
};
const VEGETABLES = {
  slug: 'vegetables', emoji: '🥕',
  name: { hi: 'सब्ज़ियों के नाम', en: 'Vegetables Names', hinglish: 'Sabziyon ke Naam', bn: 'সবজির নাম' },
  items: M([['🥔', 'Potato', 'आलू', 'আলু'], ['🍅', 'Tomato', 'टमाटर', 'টমেটো'], ['🧅', 'Onion', 'प्याज़', 'পেঁয়াজ'], ['🥕', 'Carrot', 'गाजर', 'গাজর'], ['🍆', 'Brinjal', 'बैंगन', 'বেগুন'],
    ['🥦', 'Cauliflower', 'फूलगोभी', 'ফুলকপি'], ['🥬', 'Cabbage', 'पत्तागोभी', 'বাঁধাকপি'], ['🫛', 'Peas', 'मटर', 'মটরশুঁটি'], ['🌽', 'Corn', 'मक्का', 'ভুট্টা'], ['🥒', 'Cucumber', 'खीरा', 'শসা'],
    ['🧄', 'Garlic', 'लहसुन', 'রসুন'], ['🫚', 'Ginger', 'अदरक', 'আদা'], ['🌶️', 'Chilli', 'मिर्च', 'লঙ্কা'], ['🫑', 'Capsicum', 'शिमला मिर्च', 'ক্যাপসিকাম'], ['🍄', 'Mushroom', 'मशरूम', 'মাশরুম'],
    ['🍠', 'Sweet Potato', 'शकरकंद', 'মিষ্টি আলু'], ['🎃', 'Pumpkin', 'कद्दू', 'কুমড়ো']]),
};
const BIRDS = {
  slug: 'birds', emoji: '🦜',
  name: { hi: 'पक्षियों के नाम', en: 'Birds Names', hinglish: 'Pakshiyon ke Naam (Birds)', bn: 'পাখির নাম' },
  items: M([['🦜', 'Parrot', 'तोता', 'টিয়া'], ['🦚', 'Peacock', 'मोर', 'ময়ূর'], ['🕊️', 'Pigeon', 'कबूतर', 'পায়রা'], ['🐦‍⬛', 'Crow', 'कौआ', 'কাক'], ['🐦', 'Sparrow', 'गौरैया', 'চড়ুই'],
    ['🦆', 'Duck', 'बत्तख', 'হাঁস'], ['🐔', 'Hen', 'मुर्गी', 'মুরগি'], ['🐓', 'Rooster', 'मुर्गा', 'মোরগ'], ['🦉', 'Owl', 'उल्लू', 'পেঁচা'], ['🦅', 'Eagle', 'चील', 'ঈগল'],
    ['🦢', 'Swan', 'हंस', 'রাজহাঁস'], ['🐧', 'Penguin', 'पेंगुइन', 'পেঙ্গুইন'], ['🦩', 'Flamingo', 'फ्लेमिंगो', 'ফ্লেমিংগো']]),
};
const BODY = {
  slug: 'body-parts', emoji: '🧒',
  name: { hi: 'शरीर के अंगों के नाम', en: 'Body Parts Names', hinglish: 'Sharir ke Angon ke Naam', bn: 'শরীরের অঙ্গের নাম' },
  items: M([['👁️', 'Eye', 'आँख', 'চোখ'], ['👂', 'Ear', 'कान', 'কান'], ['👃', 'Nose', 'नाक', 'নাক'], ['👄', 'Lips', 'होंठ', 'ঠোঁট'], ['👅', 'Tongue', 'जीभ', 'জিভ'],
    ['🦷', 'Tooth', 'दाँत', 'দাঁত'], ['✋', 'Hand', 'हाथ', 'হাত'], ['👆', 'Finger', 'उँगली', 'আঙুল'], ['🦶', 'Foot', 'पैर', 'পা'], ['💪', 'Arm', 'बाँह', 'বাহু'],
    ['💇', 'Hair', 'बाल', 'চুল'], ['🧠', 'Brain', 'दिमाग', 'মস্তিষ্ক'], ['❤️', 'Heart', 'दिल', 'হৃৎপিণ্ড'], ['🦴', 'Bone', 'हड्डी', 'হাড়'], ['🫁', 'Lungs', 'फेफड़े', 'ফুসফুস']]),
};
const SHAPES = {
  slug: 'shapes', emoji: '🔺',
  name: { hi: 'आकृतियों के नाम (Shapes)', en: 'Shapes Names', hinglish: 'Shapes ke Naam', bn: 'আকৃতির নাম (Shapes)' },
  items: M([['⚪', 'Circle', 'वृत्त', 'বৃত্ত'], ['🟥', 'Square', 'वर्ग', 'বর্গক্ষেত্র'], ['🔺', 'Triangle', 'त्रिभुज', 'ত্রিভুজ'], ['▬', 'Rectangle', 'आयत', 'আয়তক্ষেত্র'],
    ['⭐', 'Star', 'तारा', 'তারা'], ['❤️', 'Heart', 'दिल', 'হৃদয়'], ['🔷', 'Diamond', 'हीरा', 'হীরা'], ['🥚', 'Oval', 'अंडाकार', 'ডিম্বাকার'], ['🌙', 'Crescent', 'अर्धचंद्र', 'অর্ধচন্দ্র']]),
};
const VEHICLES = {
  slug: 'vehicles', emoji: '🚗',
  name: { hi: 'वाहनों के नाम', en: 'Vehicles Names', hinglish: 'Gaadiyon ke Naam (Vehicles)', bn: 'যানবাহনের নাম' },
  items: M([['🚗', 'Car', 'कार', 'গাড়ি'], ['🚌', 'Bus', 'बस', 'বাস'], ['🚆', 'Train', 'रेलगाड़ी', 'ট্রেন'], ['✈️', 'Aeroplane', 'हवाई जहाज़', 'উড়োজাহাজ'], ['🚢', 'Ship', 'पानी का जहाज़', 'জাহাজ'],
    ['🚲', 'Bicycle', 'साइकिल', 'সাইকেল'], ['🏍️', 'Motorcycle', 'मोटरसाइकिल', 'মোটরসাইকেল'], ['🛺', 'Auto Rickshaw', 'ऑटो रिक्शा', 'অটো রিকশা'], ['🚚', 'Truck', 'ट्रक', 'ট্রাক'],
    ['🚜', 'Tractor', 'ट्रैक्टर', 'ট্র্যাক্টর'], ['🚁', 'Helicopter', 'हेलीकॉप्टर', 'হেলিকপ্টার'], ['⛵', 'Boat', 'नाव', 'নৌকা'], ['🚑', 'Ambulance', 'एम्बुलेंस', 'অ্যাম্বুলেন্স'],
    ['🚒', 'Fire Engine', 'दमकल', 'দমকল'], ['🚓', 'Police Car', 'पुलिस की गाड़ी', 'পুলিশের গাড়ি'], ['🚀', 'Rocket', 'रॉकेट', 'রকেট']]),
};
const FLOWERS = {
  slug: 'flowers', emoji: '🌻',
  name: { hi: 'फूलों के नाम', en: 'Flowers Names', hinglish: 'Phoolon ke Naam', bn: 'ফুলের নাম' },
  items: M([['🌹', 'Rose', 'गुलाब', 'গোলাপ'], ['🪷', 'Lotus', 'कमल', 'পদ্ম'], ['🌻', 'Sunflower', 'सूरजमुखी', 'সূর্যমুখী'], ['🌷', 'Tulip', 'ट्यूलिप', 'টিউলিপ'],
    ['🌺', 'Hibiscus', 'गुड़हल', 'জবা'], ['🌼', 'Marigold', 'गेंदा', 'গাঁদা'], ['🌸', 'Cherry Blossom', 'चेरी ब्लॉसम', 'চেরি ফুল']]),
};

// ---------- Urdu haroof (spoken with the Hindi voice: the letter names sound the same) ----------
const UR = [['ا', 'अलिफ़', '🦉', 'اُلّو', 'उल्लू'], ['ب', 'बे', '🐱', 'بلّی', 'बिल्ली'], ['پ', 'पे', '🪁', 'پتنگ', 'पतंग'], ['ت', 'ते', '🦋', 'تتلی', 'तितली'], ['ٹ', 'टे', '🍅', 'ٹماٹر', 'टमाटर'],
  ['ث', 'से', '✏️', '', ''], ['ج', 'जीम', '🚢', 'جہاز', 'जहाज़'], ['چ', 'चे', '🌙', 'چاند', 'चाँद'], ['ح', 'बड़ी हे', '🍮', 'حلوہ', 'हलवा'], ['خ', 'ख़े', '🐰', 'خرگوش', 'ख़रगोश'],
  ['د', 'दाल', '🥛', 'دودھ', 'दूध'], ['ڈ', 'डाल', '📦', 'ڈبّہ', 'डब्बा'], ['ذ', 'ज़ाल', '✏️', '', ''], ['ر', 'रे', '🫓', 'روٹی', 'रोटी'], ['ڑ', 'ड़े', '✏️', '', ''],
  ['ز', 'ज़े', '🦒', 'زرافہ', 'ज़राफ़ा'], ['ژ', 'झे', '✏️', '', ''], ['س', 'सीन', '🍎', 'سیب', 'सेब'], ['ش', 'शीन', '🦁', 'شیر', 'शेर'], ['ص', 'स्वाद', '🧼', 'صابن', 'साबुन'],
  ['ض', 'ज़्वाद', '✏️', '', ''], ['ط', 'तोए', '🦜', 'طوطا', 'तोता'], ['ظ', 'ज़ोए', '✏️', '', ''], ['ع', 'ऐन', '👓', 'عینک', 'ऐनक'], ['غ', 'ग़ैन', '🎈', 'غبارہ', 'ग़ुब्बारा'],
  ['ف', 'फ़े', '📱', 'فون', 'फ़ोन'], ['ق', 'क़ाफ़', '🖊️', 'قلم', 'क़लम'], ['ک', 'काफ़', '📖', 'کتاب', 'किताब'], ['گ', 'गाफ़', '🐄', 'گائے', 'गाय'], ['ل', 'लाम', '🍋', 'لیموں', 'लीमूँ'],
  ['م', 'मीम', '🦚', 'مور', 'मोर'], ['ن', 'नून', '👃', 'ناک', 'नाक'], ['و', 'वाओ', '✏️', '', ''], ['ہ', 'छोटी हे', '🐘', 'ہاتھی', 'हाथी'], ['ھ', 'दो-चश्मी हे', '✏️', '', ''],
  ['ء', 'हमज़ा', '✏️', '', ''], ['ی', 'छोटी ये', '✏️', '', ''], ['ے', 'बड़ी ये', '✏️', '', '']];
const URDU = {
  slug: 'urdu-haroof', emoji: '🌙', fixedLang: 'ur',
  name: { hi: 'उर्दू हुरूफ़ (अलिफ़ बे पे)', en: 'Urdu Alphabet (Alif Be Pe)', hinglish: 'Urdu Haroof — Alif Be Pe', bn: 'উর্দু বর্ণমালা (আলিফ বে পে)' },
  items: UR.map(([letter, nameHi, emoji, word, wordHi]) => ({ letter, emoji, word: word ? `${word} · ${wordHi}` : nameHi, speak: word ? `${nameHi} से ${wordHi}` : nameHi })),
};

// Order on the hub and in the menu (sets from kids.mjs are slotted in by slug)
const KIDS_ORDER = ['ginti', 'pahade', 'abc', 'hindi-varnamala', 'barakhadi', 'matra', 'bangla-bornomala', 'urdu-haroof', 'fruits', 'animals', 'vegetables', 'birds', 'flowers',
  'colours', 'shapes', 'body-parts', 'vehicles', 'week-days', 'months', 'hindi-mahine'];

const KIDS_MORE = [GINTI, PAHADE, BARAKHADI, MATRA, URDU, VEGETABLES, BIRDS, FLOWERS, COLOURS, SHAPES, BODY, VEHICLES, DAYS, MONTHS, HINDU_MONTHS];

export { KIDS_MORE, KIDS_ORDER };
