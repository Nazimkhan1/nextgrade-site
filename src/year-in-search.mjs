/**
 * K2 (HIGH-TRAFFIC-PLAN): "2026 mein Bharat ne Google par kya search kiya" — /year-in-search/2026/
 *
 * Skeleton built 24 Nov 2026. Google publishes "Year in Search" for India in early December.
 * RELEASE DAY CHECKLIST (same day Google publishes):
 *   1. Open the official India list (OFFICIAL_URL below; check the link still works, fix it if Google moved it).
 *   2. Fill `items` in each category: the query exactly as Google lists it (q) + OUR OWN one-line note
 *      in 4 languages (why it was searched). Take the topic, never Google's text. Leave a category's
 *      items empty if Google has no such list this year — it is then left out of the page.
 *   3. Set CHECKED to that date, set 'page:year-in-search-2026' in src/releases.mjs to that date, build, check, push.
 *   4. Web Story (J1) + FB post + IndexNow (the daily Action pings new pages by itself).
 * Rules: no copied text; names of people only as Google lists them, nothing personal or negative about them.
 */
export const YIS_YEAR = 2026;
export const OFFICIAL_URL = 'https://trends.google.com/trends/yis/2026/IN/'; // verify on release day
export const CHECKED = null; // 'YYYY-MM-DD' once filled

// Each item: { q: 'query as Google lists it', note: { hi, en, hinglish, bn } }
export const YIS_CATS = [
  { key: 'overall', emoji: '🔥', items: [] },
  { key: 'people', emoji: '👤', items: [] },
  { key: 'sports', emoji: '🏏', items: [] },
  { key: 'movies', emoji: '🎬', items: [] },
  { key: 'meaning', emoji: '📖', items: [], link: null }, // later: link each word to its "meaning in Hindi" page (I2)
  { key: 'howto', emoji: '🛠️', items: [] },
  { key: 'recipes', emoji: '🍲', items: [] },
  { key: 'nearme', emoji: '📍', items: [] },
  { key: 'news', emoji: '📰', items: [] },
];

export const YIS_UI = {
  hi: {
    nav: 'साल 2026 में क्या सर्च हुआ',
    title: (y) => `${y} में भारत ने Google पर क्या सर्च किया — पूरी लिस्ट हिंदी में | NextGrade`,
    h1: (y) => `🔍 ${y} में भारत ने Google पर क्या सर्च किया`,
    lead: (y) => `साल ${y} में भारत के लोगों ने Google पर सबसे ज़्यादा किन चीज़ों के बारे में जानना चाहा — खेल, फ़िल्में, लोग, शब्दों के मतलब, "कैसे करें" वाले सवाल और रेसिपी। हर लिस्ट के साथ हमने अपने शब्दों में छोटा-सा कारण लिखा है कि वह चीज़ इतनी क्यों खोजी गई।`,
    cats: { overall: 'सबसे ज़्यादा ट्रेंड हुए सर्च', people: 'लोग', sports: 'खेल और टूर्नामेंट', movies: 'फ़िल्में और वेब सीरीज़', meaning: 'मतलब क्या है? (Meaning)', howto: 'कैसे करें? (How to)', recipes: 'रेसिपी', nearme: 'मेरे पास (Near me)', news: 'ख़बरें और घटनाएँ' },
    aboutH: 'यह लिस्ट कहाँ से आती है?',
    about: [
      'हर साल दिसंबर की शुरुआत में Google "Year in Search" नाम से हर देश की एक लिस्ट जारी करता है। भारत की लिस्ट में अलग-अलग हिस्से होते हैं: पूरे साल के ट्रेंडिंग सर्च, खेल, फ़िल्में, लोग, "meaning" वाले सवाल, "how to" वाले सवाल, रेसिपी और "near me" सर्च।',
      'एक बात ध्यान रखने वाली है: यह लिस्ट "सबसे ज़्यादा सर्च हुई" चीज़ों की नहीं, बल्कि उन चीज़ों की होती है जिनकी खोज पिछले साल के मुकाबले सबसे तेज़ी से बढ़ी। इसलिए "WhatsApp" या "YouTube" जैसे शब्द, जो रोज़ करोड़ों बार खोजे जाते हैं, इसमें नहीं आते। इसमें वे चीज़ें आती हैं जो उस साल अचानक चर्चा में आईं — कोई बड़ा मैच, कोई नई फ़िल्म, कोई नया सरकारी नियम या कोई नया शब्द।',
    ],
    readH: 'इस लिस्ट को कैसे पढ़ें',
    read: [
      'खेल वाली लिस्ट में अक्सर क्रिकेट सबसे ऊपर रहता है, क्योंकि बड़े टूर्नामेंट के दिनों में पूरा देश स्कोर देखता है। फ़िल्मों की लिस्ट बताती है कि सिनेमाघर और OTT पर लोगों ने क्या पसंद किया। "Meaning" वाली लिस्ट सबसे दिलचस्प होती है: जब ख़बरों में कोई नया या मुश्किल शब्द आता है, तो लोग उसका मतलब ढूँढते हैं — यह साल की बड़ी ख़बरों का आईना होती है।',
      '"How to" वाली लिस्ट से पता चलता है कि लोगों को रोज़ के कामों में कहाँ मदद चाहिए थी — जैसे कोई सरकारी कार्ड बनवाना, कोई फ़ॉर्म भरना या फ़ोन में कोई सेटिंग। "Near me" वाली लिस्ट दिखाती है कि लोग अपने आस-पास क्या ढूँढ रहे थे। रेसिपी वाली लिस्ट से पता चलता है कि किस पकवान का साल भर चलन रहा।',
    ],
    oursH: 'NextGrade पर इससे जुड़ा क्या है',
    ours: 'अगर आप भी किसी फ़ॉर्म के लिए फ़ोटो छोटा करना, PDF बनाना या हिंदी में टाइप करना चाहते हैं, तो हमारे मुफ़्त टूल्स फ़ोन में ही चलते हैं — कोई लॉगिन नहीं। त्योहारों की तारीख़ें, शुभकामनाएँ और बच्चों के लिए पढ़ाई वाले पन्ने भी यहीं हैं।',
    sourceH: 'स्रोत',
    source: (y) => `सर्च की लिस्ट Google की "Year in Search ${y}" (भारत) से ली गई है। हर चीज़ के आगे लिखा कारण हमारा अपना है।`,
    official: 'Google की आधिकारिक लिस्ट देखें',
    checked: (d) => `आख़िरी बार जाँचा: ${d}`,
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: (y) => [
      [`${y} में भारत में Google पर सबसे ज़्यादा क्या सर्च हुआ?`, `ऊपर "सबसे ज़्यादा ट्रेंड हुए सर्च" वाली लिस्ट देखें। ये वे चीज़ें हैं जिनकी खोज ${y} में पिछले साल से सबसे ज़्यादा बढ़ी।`],
      ['Google Year in Search कब आता है?', 'आम तौर पर दिसंबर के पहले या दूसरे हफ़्ते में। हम लिस्ट उसी दिन यहाँ हिंदी में डाल देते हैं।'],
      ['"ट्रेंडिंग" और "सबसे ज़्यादा सर्च" में क्या फ़र्क है?', 'सबसे ज़्यादा सर्च में हमेशा वही रोज़ की चीज़ें रहती हैं (जैसे WhatsApp, मौसम)। ट्रेंडिंग में वे चीज़ें आती हैं जिनकी खोज उस साल अचानक बहुत बढ़ी।'],
      ['क्या यह लिस्ट हर राज्य के लिए अलग है?', 'Google की लिस्ट पूरे भारत की होती है। राज्य के हिसाब से रुझान Google Trends पर अलग से देखे जा सकते हैं।'],
    ],
  },
  en: {
    nav: 'What India searched in 2026',
    title: (y) => `What India Searched on Google in ${y} — Year in Search list explained | NextGrade`,
    h1: (y) => `🔍 What India searched on Google in ${y}`,
    lead: (y) => `The things people in India wanted to know most about in ${y} — sport, films, people, word meanings, "how to" questions and recipes. Next to every entry we explain, in our own words, why it was searched so much.`,
    cats: { overall: 'Top trending searches', people: 'People', sports: 'Sports and tournaments', movies: 'Films and web series', meaning: 'Meanings ("What is…")', howto: 'How to…', recipes: 'Recipes', nearme: 'Near me', news: 'News and events' },
    aboutH: 'Where does this list come from?',
    about: [
      'Every year in early December Google publishes "Year in Search", one list per country. The India list has several parts: overall trending searches, sport, films, people, "meaning" questions, "how to" questions, recipes and "near me" searches.',
      'One thing to keep in mind: the list is not of the things searched most, but of the things whose searches grew fastest compared with the year before. So words like "WhatsApp" or "YouTube", searched crores of times every day, never appear. What appears is what suddenly came into the news that year — a big match, a new film, a new government rule or a new word.',
    ],
    readH: 'How to read the list',
    read: [
      'Cricket is often at the top of the sport list, because during big tournaments the whole country checks the score. The film list shows what people liked in cinemas and on OTT. The "meaning" list is the most interesting: when a new or difficult word appears in the news, people look up its meaning, so this list mirrors the big news of the year.',
      'The "how to" list shows where people needed help with everyday work — getting a government card made, filling in a form, or a setting on the phone. The "near me" list shows what people were looking for around them, and the recipe list shows which dish was in fashion all year.',
    ],
    oursH: 'What on NextGrade is related',
    ours: 'If you also need to shrink a photo for a form, make a PDF or type in Hindi, our free tools run on your phone with no login. Festival dates, wishes and study pages for children are here too.',
    sourceH: 'Source',
    source: (y) => `The search lists are from Google's "Year in Search ${y}" (India). The note next to each entry is our own.`,
    official: "See Google's official list",
    checked: (d) => `Last checked: ${d}`,
    faqH: 'Frequently asked questions',
    faq: (y) => [
      [`What did India search most on Google in ${y}?`, `See the "Top trending searches" list above: these are the searches that grew most in ${y} compared with the year before.`],
      ['When does Google Year in Search come out?', 'Usually in the first or second week of December. We add the list here on the same day.'],
      ['What is the difference between "trending" and "most searched"?', 'The most-searched list is always the same everyday things (WhatsApp, weather). Trending shows what suddenly grew a lot that year.'],
      ['Is there a separate list for every state?', "Google's list is for all of India. Trends by state can be seen separately on Google Trends."],
    ],
  },
  hinglish: {
    nav: '2026 mein kya search hua',
    title: (y) => `${y} mein India ne Google par kya search kiya — poori list | NextGrade`,
    h1: (y) => `🔍 ${y} mein India ne Google par kya search kiya`,
    lead: (y) => `Saal ${y} mein India ke logon ne Google par sabse zyada kis baare mein jaanna chaha — khel, filmein, log, shabdon ke matlab, "kaise karein" wale sawaal aur recipes. Har entry ke saath humne apne shabdon mein chhota sa kaaran likha hai ki woh itna kyon search hua.`,
    cats: { overall: 'Sabse zyada trend hue search', people: 'Log', sports: 'Khel aur tournament', movies: 'Filmein aur web series', meaning: 'Matlab kya hai? (Meaning)', howto: 'Kaise karein? (How to)', recipes: 'Recipes', nearme: 'Mere paas (Near me)', news: 'Khabrein aur ghatnayein' },
    aboutH: 'Yeh list kahan se aati hai?',
    about: [
      'Har saal December ki shuruaat mein Google "Year in Search" naam se har desh ki ek list nikaalta hai. India ki list mein alag-alag hisse hote hain: poore saal ke trending search, khel, filmein, log, "meaning" wale sawaal, "how to" wale sawaal, recipes aur "near me" search.',
      'Ek baat dhyaan rakhne wali hai: yeh list "sabse zyada search hui" cheezon ki nahi, balki un cheezon ki hoti hai jinki khoj pichhle saal ke muqable sabse tezi se badhi. Isliye "WhatsApp" ya "YouTube" jaise shabd, jo roz karodon baar search hote hain, ismein nahi aate. Ismein woh cheezein aati hain jo us saal achanak charcha mein aayin — koi bada match, koi nayi film, koi naya sarkari niyam ya koi naya shabd.',
    ],
    readH: 'Is list ko kaise padhein',
    read: [
      'Khel wali list mein aksar cricket sabse upar rehta hai, kyonki bade tournament ke dinon mein poora desh score dekhta hai. Filmon ki list batati hai ki cinema aur OTT par logon ne kya pasand kiya. "Meaning" wali list sabse dilchasp hoti hai: jab khabron mein koi naya ya mushkil shabd aata hai, to log uska matlab dhoondhte hain — yeh saal ki badi khabron ka aaina hoti hai.',
      '"How to" wali list se pata chalta hai ki logon ko roz ke kaamon mein kahan madad chahiye thi — jaise koi sarkari card banwana, koi form bharna ya phone mein koi setting. "Near me" wali list dikhati hai ki log apne aas-paas kya dhoondh rahe the, aur recipe wali list se pata chalta hai ki kaun sa pakwan saal bhar chala.',
    ],
    oursH: 'NextGrade par isse juda kya hai',
    ours: 'Agar aapko bhi kisi form ke liye photo chhota karna hai, PDF banana hai ya Hindi mein type karna hai, to hamare free tools phone mein hi chalte hain — koi login nahi. Tyohaaron ki tareekhein, wishes aur bachchon ke padhai wale page bhi yahin hain.',
    sourceH: 'Source',
    source: (y) => `Search ki list Google ki "Year in Search ${y}" (India) se li gayi hai. Har entry ke aage likha kaaran hamara apna hai.`,
    official: 'Google ki official list dekhein',
    checked: (d) => `Aakhri baar check kiya: ${d}`,
    faqH: 'Aksar poochhe jaane wale sawaal',
    faq: (y) => [
      [`${y} mein India mein Google par sabse zyada kya search hua?`, `Upar "Sabse zyada trend hue search" wali list dekhein. Yeh woh cheezein hain jinki khoj ${y} mein pichhle saal se sabse zyada badhi.`],
      ['Google Year in Search kab aata hai?', 'Aam taur par December ke pehle ya doosre hafte mein. Hum list usi din yahan daal dete hain.'],
      ['"Trending" aur "sabse zyada search" mein kya farq hai?', 'Sabse zyada search mein hamesha wahi roz ki cheezein rehti hain (WhatsApp, mausam). Trending mein woh aata hai jiski khoj us saal achanak bahut badhi.'],
      ['Kya har state ki list alag hai?', 'Google ki list poore India ki hoti hai. State ke hisaab se trend Google Trends par alag se dekh sakte hain.'],
    ],
  },
  bn: {
    nav: '২০২৬-এ কী সার্চ হল',
    title: (y) => `${y} সালে ভারত Google-এ কী সার্চ করল — পুরো তালিকা বাংলায় | NextGrade`,
    h1: (y) => `🔍 ${y} সালে ভারত Google-এ কী সার্চ করল`,
    lead: (y) => `${y} সালে ভারতের মানুষ Google-এ সবচেয়ে বেশি কী জানতে চেয়েছেন — খেলা, সিনেমা, মানুষ, শব্দের মানে, "কীভাবে করব" প্রশ্ন আর রান্নার রেসিপি। প্রতিটির পাশে আমরা নিজের ভাষায় ছোট্ট করে লিখেছি, কেন সেটা এত খোঁজা হয়েছে।`,
    cats: { overall: 'সবচেয়ে বেশি ট্রেন্ড করা সার্চ', people: 'মানুষ', sports: 'খেলা ও টুর্নামেন্ট', movies: 'সিনেমা ও ওয়েব সিরিজ', meaning: 'মানে কী? (Meaning)', howto: 'কীভাবে করব? (How to)', recipes: 'রেসিপি', nearme: 'কাছাকাছি (Near me)', news: 'খবর ও ঘটনা' },
    aboutH: 'এই তালিকা কোথা থেকে আসে?',
    about: [
      'প্রতি বছর ডিসেম্বরের শুরুতে Google "Year in Search" নামে প্রতিটি দেশের একটি তালিকা প্রকাশ করে। ভারতের তালিকায় কয়েকটি ভাগ থাকে: সারা বছরের ট্রেন্ডিং সার্চ, খেলা, সিনেমা, মানুষ, "meaning" প্রশ্ন, "how to" প্রশ্ন, রেসিপি আর "near me" সার্চ।',
      'একটা কথা মনে রাখার মতো: এই তালিকা "সবচেয়ে বেশি সার্চ হওয়া" জিনিসের নয়, বরং যেগুলোর খোঁজ আগের বছরের তুলনায় সবচেয়ে দ্রুত বেড়েছে তাদের। তাই "WhatsApp" বা "YouTube"-এর মতো শব্দ, যা রোজ কোটি কোটি বার খোঁজা হয়, এতে আসে না। আসে সেই জিনিস যা সেই বছর হঠাৎ আলোচনায় এসেছে — বড় কোনো ম্যাচ, নতুন সিনেমা, নতুন সরকারি নিয়ম বা নতুন কোনো শব্দ।',
    ],
    readH: 'তালিকাটা কীভাবে পড়বেন',
    read: [
      'খেলার তালিকায় প্রায়ই ক্রিকেট সবার ওপরে থাকে, কারণ বড় টুর্নামেন্টের সময় গোটা দেশ স্কোর দেখে। সিনেমার তালিকা বলে দেয় সিনেমা হলে আর OTT-তে মানুষ কী পছন্দ করেছেন। "Meaning" তালিকাটা সবচেয়ে মজার: খবরে নতুন বা কঠিন শব্দ এলে মানুষ তার মানে খোঁজেন — তাই এটা বছরের বড় খবরের আয়না।',
      '"How to" তালিকা দেখায় রোজকার কাজে মানুষের কোথায় সাহায্য লেগেছে — কোনো সরকারি কার্ড বানানো, ফর্ম পূরণ বা ফোনের কোনো সেটিং। "Near me" তালিকা দেখায় মানুষ আশেপাশে কী খুঁজছিলেন, আর রেসিপির তালিকা বলে কোন রান্না সারা বছর চলেছে।',
    ],
    oursH: 'NextGrade-এ এর সঙ্গে কী যুক্ত',
    ours: 'আপনারও যদি কোনো ফর্মের জন্য ছবি ছোট করতে, PDF বানাতে বা হিন্দিতে টাইপ করতে হয়, আমাদের বিনামূল্যের টুলগুলো ফোনেই চলে — কোনো লগইন নেই। উৎসবের তারিখ, শুভেচ্ছা আর ছোটদের পড়াশোনার পাতাও এখানেই।',
    sourceH: 'উৎস',
    source: (y) => `সার্চের তালিকা Google-এর "Year in Search ${y}" (ভারত) থেকে নেওয়া। প্রতিটির পাশে লেখা কারণ আমাদের নিজের।`,
    official: 'Google-এর অফিসিয়াল তালিকা দেখুন',
    checked: (d) => `শেষ যাচাই: ${d}`,
    faqH: 'প্রায়ই জিজ্ঞাসিত প্রশ্ন',
    faq: (y) => [
      [`${y} সালে ভারতে Google-এ সবচেয়ে বেশি কী সার্চ হয়েছে?`, `ওপরে "সবচেয়ে বেশি ট্রেন্ড করা সার্চ" তালিকা দেখুন। এগুলোর খোঁজ ${y}-এ আগের বছরের তুলনায় সবচেয়ে বেশি বেড়েছে।`],
      ['Google Year in Search কবে আসে?', 'সাধারণত ডিসেম্বরের প্রথম বা দ্বিতীয় সপ্তাহে। আমরা সেদিনই তালিকাটা এখানে দিয়ে দিই।'],
      ['"ট্রেন্ডিং" আর "সবচেয়ে বেশি সার্চ"-এর পার্থক্য কী?', 'সবচেয়ে বেশি সার্চে সবসময় রোজকার একই জিনিস থাকে (WhatsApp, আবহাওয়া)। ট্রেন্ডিংয়ে আসে যার খোঁজ সেই বছর হঠাৎ অনেক বেড়েছে।'],
      ['প্রতিটি রাজ্যের কি আলাদা তালিকা আছে?', 'Google-এর তালিকা গোটা ভারতের। রাজ্য অনুযায়ী ট্রেন্ড Google Trends-এ আলাদা করে দেখা যায়।'],
    ],
  },
};
