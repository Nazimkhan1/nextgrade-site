/**
 * Navratri 2027 guide (29 Nov 2026; MY-PLANS handoff "Navratri 2027 + Ram Navami guides check").
 * One page /navratri/ in hi/en/bn: both Navratris of 2027 day by day (date → which form of Durga), what each form means,
 * ghatasthapana, vrat food, kanya pujan, Ram Navami / Dussehra / Durga Puja days, live "today" highlight, FAQ.
 * Dates: Drik Panchang (New Delhi) 2027 lists Chaitra Navratri day 1 = Wed 7 Apr, day 9 = Thu 15 Apr (Ram Navami);
 * Sharad Navratri day 1 = Thu 30 Sep, day 10 = Sat 9 Oct (Vijayadashami) — same as src/festival-dates.mjs.
 * All text is our own writing.
 */
const CHAITRA = '2027-04-07', SHARAD = '2027-09-30';
const addDays = (iso, n) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

// [hi name, en name, bn name, hi text, en text, bn text]
const DEVI = [
  ['माँ शैलपुत्री', 'Maa Shailputri', 'মা শৈলপুত্রী', 'पर्वतराज हिमालय की पुत्री — पार्वती का पहला रूप। वे नंदी बैल पर सवार हैं, दाएँ हाथ में त्रिशूल और बाएँ में कमल। पहले दिन घटस्थापना के साथ इन्हीं की पूजा होती है; ये स्थिरता और नई शुरुआत की प्रतीक हैं।', 'Daughter of the mountain king Himavan — the first form of Parvati. She rides the bull Nandi, with a trident in her right hand and a lotus in her left. She is worshipped on day one along with the kalash; she stands for steadiness and new beginnings.', 'পর্বতরাজ হিমালয়ের কন্যা — পার্বতীর প্রথম রূপ। নন্দী ষাঁড়ে আসীন, ডান হাতে ত্রিশূল, বাঁ হাতে পদ্ম। প্রথম দিন ঘটস্থাপনের সঙ্গে তাঁর পূজা হয়; তিনি স্থিরতা ও নতুন শুরুর প্রতীক।'],
  ['माँ ब्रह्मचारिणी', 'Maa Brahmacharini', 'মা ব্রহ্মচারিণী', 'तपस्या का रूप — शिव को पाने के लिए पार्वती ने वर्षों कठोर तप किया। एक हाथ में जप की माला, दूसरे में कमंडल, और नंगे पाँव। ये धैर्य, संयम और लगन सिखाती हैं — पढ़ाई करने वालों के लिए ख़ास प्रेरणा।', 'The form of penance — Parvati performed years of hard tapas to win Shiva. A japa mala in one hand, a water pot (kamandal) in the other, barefoot. She teaches patience, self-control and dedication — a special inspiration for students.', 'তপস্যার রূপ — শিবকে পেতে পার্বতী বছরের পর বছর কঠোর তপস্যা করেছিলেন। এক হাতে জপমালা, অন্য হাতে কমণ্ডলু, খালি পায়ে। তিনি ধৈর্য, সংযম আর একাগ্রতা শেখান।'],
  ['माँ चंद्रघंटा', 'Maa Chandraghanta', 'মা চন্দ্রঘণ্টা', 'माथे पर घंटे के आकार का अर्धचंद्र — इसी से नाम चंद्रघंटा। दस भुजाएँ, शेर की सवारी, युद्ध के लिए तैयार पर चेहरे पर शांति। मान्यता है कि इनके घंटे की ध्वनि से डर और नकारात्मकता दूर होती है।', 'A bell-shaped half-moon on her forehead gives her the name. Ten arms, riding a lion, ready for battle yet calm in face. The sound of her bell is believed to drive away fear and negativity.', 'কপালে ঘণ্টার মতো অর্ধচন্দ্র — তাই নাম চন্দ্রঘণ্টা। দশ হাত, সিংহবাহিনী, যুদ্ধের জন্য প্রস্তুত অথচ মুখে শান্তি। বিশ্বাস, তাঁর ঘণ্টাধ্বনি ভয় আর নেতিবাচকতা দূর করে।'],
  ['माँ कूष्मांडा', 'Maa Kushmanda', 'মা কুষ্মাণ্ডা', 'कथा है कि जब कुछ नहीं था, तब देवी ने अपनी मंद मुस्कान से ब्रह्मांड रचा — "कु" (थोड़ा), "ऊष्मा" (गर्मी) और "अंड" (ब्रह्मांड)। आठ भुजाएँ होने से इन्हें अष्टभुजा भी कहते हैं; सवारी शेर है।', 'The story says that when nothing existed, the Goddess created the universe with a gentle smile — “ku” (a little), “ushma” (warmth), “anda” (the cosmic egg). With eight arms she is also called Ashtabhuja; she rides a lion.', 'কথিত আছে, যখন কিছুই ছিল না, দেবী তাঁর মৃদু হাসিতে ব্রহ্মাণ্ড সৃষ্টি করেন — "কু" (একটু), "ঊষ্মা" (উষ্ণতা), "অণ্ড" (ব্রহ্মাণ্ড)। আট হাত, তাই অষ্টভুজা; বাহন সিংহ।'],
  ['माँ स्कंदमाता', 'Maa Skandamata', 'মা স্কন্দমাতা', 'भगवान स्कंद (कार्तिकेय) की माता। गोद में बाल स्कंद, कमल के आसन पर विराजमान, इसलिए पद्मासना भी कहलाती हैं। यह माँ के ममता भरे रूप की पूजा का दिन है।', 'Mother of Lord Skanda (Kartikeya). She holds the child Skanda in her lap and sits on a lotus, so she is also called Padmasana. This is the day to honour the loving, motherly form of the Goddess.', 'ভগবান স্কন্দ (কার্তিকেয়)-এর মা। কোলে শিশু স্কন্দ, পদ্মের আসনে বসে, তাই পদ্মাসনাও বলা হয়। এই দিন মায়ের মমতাময়ী রূপের পূজা।'],
  ['माँ कात्यायनी', 'Maa Katyayani', 'মা কাত্যায়নী', 'ऋषि कात्यायन के आश्रम में प्रकट होने से नाम कात्यायनी। इन्हीं रूप में देवी ने महिषासुर का वध किया। भागवत की कथा में ब्रज की गोपियों ने अच्छे वर के लिए कात्यायनी व्रत रखा था, इसलिए अविवाहित लड़कियाँ भी इनकी पूजा करती हैं।', 'Named after the sage Katyayana, in whose hermitage she appeared. In this form the Goddess slew Mahishasura. In the Bhagavata story the gopis of Braj kept the Katyayani vrat for a good husband, so unmarried girls also worship her.', 'ঋষি কাত্যায়নের আশ্রমে আবির্ভূত, তাই নাম কাত্যায়নী। এই রূপেই দেবী মহিষাসুর বধ করেন। ভাগবতের কাহিনিতে ব্রজের গোপীরা ভালো বরের জন্য কাত্যায়নী ব্রত রেখেছিলেন।'],
  ['माँ कालरात्रि', 'Maa Kalaratri', 'মা কালরাত্রি', 'देवी का सबसे उग्र रूप — काला रंग, बिखरे बाल, गधे की सवारी। ये अंधकार, डर और बुराई का नाश करती हैं। रूप भयानक है पर फल हमेशा शुभ देती हैं, इसलिए इन्हें शुभंकरी भी कहते हैं।', 'The fiercest form — dark in colour, hair loose, riding a donkey. She destroys darkness, fear and evil. Her look is terrifying but she always gives good results, so she is also called Shubhankari.', 'দেবীর সবচেয়ে উগ্র রূপ — কালো বর্ণ, এলোচুল, গাধা বাহন। তিনি অন্ধকার, ভয় আর অশুভের বিনাশ করেন। রূপ ভয়ংকর হলেও ফল সবসময় শুভ, তাই তাঁকে শুভংকরীও বলে।'],
  ['माँ महागौरी', 'Maa Mahagauri', 'মা মহাগৌরী', 'अत्यंत गौर (उजला) रूप, सफ़ेद वस्त्र, सफ़ेद बैल की सवारी। कथा है कि लंबी तपस्या के बाद शिव ने गंगाजल से उनका रूप फिर उजला कर दिया। अष्टमी (दुर्गाष्टमी) को इनकी पूजा और बहुत से घरों में कन्या पूजन होता है।', 'A radiant, very fair form, dressed in white and riding a white bull. The story says that after her long penance Shiva washed her with Ganga water and her brightness returned. She is worshipped on Ashtami (Durga Ashtami), when many homes hold kanya pujan.', 'অত্যন্ত গৌর (উজ্জ্বল) রূপ, সাদা বস্ত্র, সাদা ষাঁড় বাহন। কথিত, দীর্ঘ তপস্যার পর শিব গঙ্গাজলে স্নান করিয়ে তাঁর উজ্জ্বলতা ফিরিয়ে দেন। অষ্টমীতে তাঁর পূজা, অনেক ঘরে কুমারী পূজা।'],
  ['माँ सिद्धिदात्री', 'Maa Siddhidatri', 'মা সিদ্ধিদাত্রী', 'सभी सिद्धियाँ (सफलता और ज्ञान) देने वाली। कमल पर विराजमान, चार भुजाएँ। मान्यता है कि शिव का अर्धनारीश्वर रूप इन्हीं की कृपा से बना। नवमी को इनकी पूजा, हवन और कन्या पूजन के साथ नवरात्रि पूरी होती है।', 'The giver of all siddhis — success and wisdom. Seated on a lotus, with four arms. Shiva’s Ardhanarishvara form is said to come from her grace. Navratri is completed on Navami with her worship, a havan and kanya pujan.', 'সব সিদ্ধি (সাফল্য ও জ্ঞান) দানকারী। পদ্মে আসীন, চার হাত। বিশ্বাস, শিবের অর্ধনারীশ্বর রূপ তাঁরই কৃপায়। নবমীতে তাঁর পূজা, হোম আর কুমারী পূজা দিয়ে নবরাত্রি পূর্ণ হয়।'],
];

const MON = {
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  bn: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
};
const WD = {
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  bn: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
};
const bnNum = (s) => String(s).replace(/\d/g, (c) => '০১২৩৪৫৬৭৮৯'[c]);
const fmt = (code, iso) => { const d = new Date(`${iso}T12:00:00Z`); const s = `${d.getUTCDate()} ${MON[code][d.getUTCMonth()]}`; return code === 'bn' ? bnNum(s) : s; };
const wd = (code, iso) => WD[code][new Date(`${iso}T12:00:00Z`).getUTCDay()];

const UI = {
  hi: {
    nav: 'नवरात्रि 2027', title: 'नवरात्रि 2027 — चैत्र और शारदीय नवरात्रि की तारीख़ें, किस दिन कौन सी देवी | NextGrade',
    desc: 'चैत्र नवरात्रि 7–15 अप्रैल 2027 (राम नवमी 15 अप्रैल) और शारदीय नवरात्रि 30 सितंबर–8 अक्टूबर 2027 (दशहरा 9 अक्टूबर): हर दिन की तारीख़, माँ दुर्गा का कौन सा रूप, घटस्थापना, व्रत का खाना और कन्या पूजन।',
    h1: '🪔 नवरात्रि 2027 — किस दिन कौन सी देवी',
    lead: '2027 में दो बड़ी नवरात्रि हैं: चैत्र नवरात्रि 7 अप्रैल से 15 अप्रैल (राम नवमी) तक, और शारदीय नवरात्रि 30 सितंबर से 8 अक्टूबर तक, फिर 9 अक्टूबर को दशहरा। नीचे दोनों की दिन-वार सूची है — आज नवरात्रि का दिन हो तो वह पंक्ति अपने-आप हाइलाइट हो जाएगी।',
    chaitraH: 'चैत्र नवरात्रि 2027 (7–15 अप्रैल)', sharadH: 'शारदीय नवरात्रि 2027 (30 सितंबर–9 अक्टूबर)',
    th: ['दिन', 'तारीख़', 'देवी का रूप'], day: (n) => `${n}`, today: 'आज',
    extra: { 9: { c: 'राम नवमी', s: 'महानवमी' }, 8: { c: 'अष्टमी', s: 'दुर्गाष्टमी' } }, dussehra: 'विजयादशमी (दशहरा)',
    note: 'तारीख़ें द्रिक पंचांग (नई दिल्ली) के 2027 कैलेंडर के अनुसार हैं। तिथि घटने-बढ़ने से कुछ जगहों पर अष्टमी/नवमी एक दिन आगे-पीछे हो सकती है — व्रत और पूजा के समय के लिए अपने स्थानीय पंचांग या पंडित जी से पुष्टि कर लें।',
    formsH: 'माँ दुर्गा के नौ रूप — किसका क्या अर्थ है',
    steps: [['घटस्थापना कैसे करें — आसान तरीका', ['पहले दिन सुबह स्नान करके पूजा की जगह साफ़ करें और लाल कपड़ा बिछाएँ।', 'मिट्टी के पात्र में साफ़ मिट्टी डालकर जौ बोएँ — नौ दिन में ये "जवारे" बनकर उगते हैं।', 'ताँबे या मिट्टी के कलश में जल, सुपारी, सिक्का और अक्षत डालें; मुँह पर आम के पत्ते रखकर ऊपर लाल चुनरी लिपटा नारियल रखें।', 'कलश को जौ वाले पात्र पर या पास में स्थापित करें, माँ की तस्वीर रखें और दीया जलाएँ। जो लोग अखंड ज्योत रखते हैं, वे नौ दिन तक उसे बुझने नहीं देते।', 'हर दिन उस दिन की देवी का ध्यान करें, दुर्गा आरती गाएँ और सामर्थ्य हो तो दुर्गा सप्तशती या दुर्गा चालीसा का पाठ करें।']],
      ['व्रत में क्या खाएँ, क्या नहीं', ['खा सकते हैं: फल, दूध-दही, पनीर, साबूदाना, कुट्टू और सिंघाड़े का आटा, समा (सामक) के चावल, आलू, शकरकंद, मखाना, मूँगफली और सेंधा नमक।', 'नहीं खाते: गेहूँ-चावल-दालें, साधारण नमक, प्याज़-लहसुन, मांस-अंडा और शराब। कई परिवार हल्दी और कुछ मसाले भी नहीं डालते — अपने घर की परंपरा मानें।', 'पानी ख़ूब पिएँ, एक साथ बहुत तला खाने से बचें। डायबिटीज़, गर्भावस्था या दवा लेने वाले लोग डॉक्टर की सलाह से ही व्रत रखें — फलाहार या एक समय भोजन भी पूरा व्रत माना जाता है।']],
      ['कन्या पूजन', ['अष्टमी या नवमी को (परिवार की परंपरा अनुसार) 2 से 10 साल की नौ कन्याओं और एक छोटे बालक (लांगुर/भैरव रूप) को घर बुलाया जाता है।', 'उनके पैर धोकर, तिलक लगाकर हलवा-पूरी-चने का भोग खिलाया जाता है और विदा करते समय दक्षिणा या छोटा उपहार दिया जाता है।', 'इसका संदेश सीधा है: हर बच्ची देवी का रूप है — उसका सम्मान, पढ़ाई और सुरक्षा ही असली पूजा है।']]],
    aboutH: 'चैत्र और शारदीय नवरात्रि में क्या फ़र्क है?',
    about: ['साल में चार नवरात्रि आती हैं, पर दो मुख्य हैं। चैत्र नवरात्रि वसंत में, हिंदू नव वर्ष के साथ शुरू होती है — इसी दिन महाराष्ट्र में गुड़ी पड़वा और दक्षिण में उगादी मनाया जाता है — और नवमी को भगवान राम का जन्मदिन, राम नवमी, होता है। शारदीय नवरात्रि शरद ऋतु में आती है; इसके बाद दसवें दिन विजयादशमी यानी दशहरा मनाया जाता है और लगभग बीस दिन बाद दीवाली।', 'दोनों में पूजा के नौ रूप वही हैं, पर रंग-ढंग अलग है। शारदीय नवरात्रि में गुजरात का गरबा-डांडिया, बंगाल की दुर्गा पूजा और उत्तर भारत की रामलीला होती है। चैत्र नवरात्रि अपेक्षाकृत शांत होती है — घरों में कलश, व्रत और रामायण पाठ।', 'नवरात्रि का भाव है अपने भीतर की बुराइयों पर जीत: नौ दिन संयम, सादा खाना, प्रार्थना और दूसरों की मदद। व्रत न भी रखें तो इन दिनों किसी ज़रूरतमंद की मदद करना, बेटियों का सम्मान करना और घर में मिलकर आरती करना भी उतना ही सुंदर तरीका है।'],
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: [['चैत्र नवरात्रि 2027 कब से है?', 'बुधवार 7 अप्रैल 2027 से गुरुवार 15 अप्रैल 2027 तक; 15 अप्रैल को राम नवमी है।'], ['शारदीय नवरात्रि 2027 कब से है?', 'गुरुवार 30 सितंबर 2027 को घटस्थापना; महानवमी 8 अक्टूबर और दशहरा शनिवार 9 अक्टूबर 2027।'], ['नवरात्रि के पहले दिन किस देवी की पूजा होती है?', 'माँ शैलपुत्री की, घटस्थापना के साथ।'], ['दुर्गाष्टमी 2027 कब है?', 'चैत्र में 14 अप्रैल और शारदीय में 7 अक्टूबर 2027 (स्थानीय पंचांग से पुष्टि करें)।'], ['क्या व्रत में चाय-कॉफ़ी पी सकते हैं?', 'ज़्यादातर परिवार दूध वाली चाय की अनुमति देते हैं; यह घर की परंपरा पर निर्भर है।'], ['कन्या पूजन अष्टमी को करें या नवमी को?', 'दोनों सही हैं — जो आपके परिवार में होता आया है, वही करें।']],
    links: [['/aarti/durga-ji-ki-aarti/', '🪔 दुर्गा जी की आरती'], ['/mantra/', '📿 मंत्र अर्थ सहित'], ['/festivals/navratri/', '🎉 नवरात्रि की शुभकामनाएँ'], ['/festivals/ram-navami/', '🏹 राम नवमी'], ['/festivals/dussehra/', '🏹 दशहरा'], ['/kitne-din-baaki/', '⏳ कितने दिन बाक़ी']],
  },
  en: {
    nav: 'Navratri 2027', title: 'Navratri 2027 Dates — Chaitra & Sharad Navratri, Which Goddess on Which Day | NextGrade',
    desc: 'Chaitra Navratri 7–15 April 2027 (Ram Navami 15 April) and Sharad Navratri 30 September–8 October 2027 (Dussehra 9 October): date of every day, which form of Durga, ghatasthapana, fasting food and kanya pujan.',
    h1: '🪔 Navratri 2027 — which goddess on which day',
    lead: 'There are two main Navratris in 2027: Chaitra Navratri from 7 to 15 April (Ram Navami), and Sharad Navratri from 30 September to 8 October, followed by Dussehra on 9 October. Below is a day-by-day list for both — if today is a Navratri day, its row is highlighted automatically.',
    chaitraH: 'Chaitra Navratri 2027 (7–15 April)', sharadH: 'Sharad Navratri 2027 (30 September–9 October)',
    th: ['Day', 'Date', 'Form of the Goddess'], day: (n) => `${n}`, today: 'Today',
    extra: { 9: { c: 'Ram Navami', s: 'Maha Navami' }, 8: { c: 'Ashtami', s: 'Durga Ashtami' } }, dussehra: 'Vijayadashami (Dussehra)',
    note: 'Dates follow the Drik Panchang (New Delhi) 2027 calendar. Because tithis can shorten or lengthen, Ashtami/Navami may shift by a day in some places — confirm fasting and puja timings with your local panchang or priest.',
    formsH: 'The nine forms of Durga — what each one means',
    steps: [['How to do ghatasthapana — the simple way', ['On day one, bathe, clean the puja corner and spread a red cloth.', 'Fill a clay pot with clean soil and sow barley — over nine days it sprouts into “jaware”.', 'Fill a copper or clay kalash with water, a betel nut, a coin and rice; place mango leaves on its mouth and a coconut wrapped in a red chunri on top.', 'Set the kalash on or beside the barley pot, place a picture of the Goddess and light a lamp. Families who keep an akhand jyot keep it burning for all nine days.', 'Each day, meditate on that day’s form, sing the Durga aarti and, if you can, read the Durga Saptashati or Durga Chalisa.']],
      ['What to eat and avoid while fasting', ['Allowed: fruit, milk and curd, paneer, sabudana, kuttu (buckwheat) and singhara (water chestnut) flour, sama (barnyard millet) rice, potato, sweet potato, makhana, peanuts and sendha (rock) salt.', 'Avoided: wheat, rice and lentils, ordinary salt, onion and garlic, meat, eggs and alcohol. Many families also skip turmeric and some spices — follow your home tradition.', 'Drink plenty of water and avoid too much fried food at once. People with diabetes, pregnant women and anyone on medication should fast only on a doctor’s advice — eating only fruit, or one meal a day, also counts as a full fast.']],
      ['Kanya pujan', ['On Ashtami or Navami (as per family custom), nine girls aged 2 to 10 and one small boy (as Langur/Bhairav) are invited home.', 'Their feet are washed, a tilak is applied, and they are served halwa, puri and chana, then given dakshina or a small gift as they leave.', 'The message is simple: every girl is a form of the Goddess — respecting her, educating her and keeping her safe is the real worship.']]],
    aboutH: 'Chaitra vs Sharad Navratri — what is the difference?',
    about: ['There are four Navratris in a year, but two are the main ones. Chaitra Navratri comes in spring and begins with the Hindu new year — the same day is Gudi Padwa in Maharashtra and Ugadi in the south — and its ninth day is Ram Navami, the birthday of Lord Rama. Sharad Navratri comes in autumn; the tenth day after it is Vijayadashami (Dussehra), and Diwali follows about twenty days later.', 'The nine forms worshipped are the same in both, but the mood differs. Sharad Navratri brings Gujarat’s garba and dandiya, Bengal’s Durga Puja and the Ramlila of north India. Chaitra Navratri is quieter — the kalash, fasting and Ramayana readings at home.', 'The spirit of Navratri is victory over the evil within: nine days of restraint, simple food, prayer and helping others. Even if you do not fast, helping someone in need, honouring daughters and singing the aarti together at home are just as beautiful ways to keep it.'],
    faqH: 'Frequently asked questions',
    faq: [['When does Chaitra Navratri 2027 start?', 'Wednesday 7 April 2027, ending Thursday 15 April 2027, which is Ram Navami.'], ['When is Sharad Navratri 2027?', 'Ghatasthapana on Thursday 30 September 2027; Maha Navami on 8 October and Dussehra on Saturday 9 October 2027.'], ['Which goddess is worshipped on the first day?', 'Maa Shailputri, along with ghatasthapana.'], ['When is Durga Ashtami 2027?', '14 April in Chaitra Navratri and 7 October in Sharad Navratri 2027 (confirm with your local panchang).'], ['Can I drink tea during the fast?', 'Most families allow tea with milk; it depends on your home tradition.'], ['Should kanya pujan be on Ashtami or Navami?', 'Both are correct — follow your family’s custom.']],
    links: [['/aarti/durga-ji-ki-aarti/', '🪔 Durga aarti'], ['/mantra/', '📿 Mantras with meaning'], ['/festivals/navratri/', '🎉 Navratri wishes'], ['/festivals/ram-navami/', '🏹 Ram Navami'], ['/festivals/dussehra/', '🏹 Dussehra'], ['/kitne-din-baaki/', '⏳ Days left']],
  },
  bn: {
    nav: 'নবরাত্রি ২০২৭', title: 'নবরাত্রি ২০২৭ — চৈত্র ও শারদীয় নবরাত্রি, দুর্গাপূজার দিন, কোন দিন কোন দেবী | NextGrade',
    desc: 'চৈত্র নবরাত্রি ৭–১৫ এপ্রিল ২০২৭ (রামনবমী ১৫ এপ্রিল) আর শারদীয় নবরাত্রি ৩০ সেপ্টেম্বর–৮ অক্টোবর ২০২৭ (দশমী ৯ অক্টোবর): প্রতিদিনের তারিখ, দেবীর কোন রূপ, দুর্গাপূজার ষষ্ঠী-দশমী, ঘটস্থাপন আর কুমারী পূজা।',
    h1: '🪔 নবরাত্রি ২০২৭ — কোন দিন কোন দেবী',
    lead: '২০২৭-এ দুটি প্রধান নবরাত্রি: চৈত্র নবরাত্রি ৭ থেকে ১৫ এপ্রিল (রামনবমী), আর শারদীয় নবরাত্রি ৩০ সেপ্টেম্বর থেকে ৮ অক্টোবর, তারপর ৯ অক্টোবর বিজয়া দশমী। নিচে দুটিরই দিন-ভিত্তিক তালিকা — আজ নবরাত্রির দিন হলে সেই সারি নিজে থেকেই হাইলাইট হবে।',
    chaitraH: 'চৈত্র নবরাত্রি ২০২৭ (৭–১৫ এপ্রিল)', sharadH: 'শারদীয় নবরাত্রি ও দুর্গাপূজা ২০২৭ (৩০ সেপ্টেম্বর–৯ অক্টোবর)',
    th: ['দিন', 'তারিখ', 'দেবীর রূপ'], day: (n) => bnNum(n), today: 'আজ',
    extra: { 9: { c: 'রামনবমী', s: 'মহানবমী' }, 8: { c: 'অষ্টমী', s: 'মহাষ্টমী' }, 7: { s: 'মহাসপ্তমী' }, 6: { s: 'মহাষষ্ঠী (দুর্গাপূজা শুরু)' } }, dussehra: 'বিজয়া দশমী',
    note: 'তারিখগুলি দৃক পঞ্চাঙ্গ (নয়াদিল্লি) ২০২৭ অনুযায়ী। তিথির হ্রাস-বৃদ্ধিতে কোথাও অষ্টমী/নবমী একদিন এদিক-ওদিক হতে পারে; বাংলায় পূজার নির্ঘণ্ট বিশুদ্ধ সিদ্ধান্ত বা গুপ্তপ্রেস পঞ্জিকা অনুযায়ী হয় — পুজোর সময় স্থানীয় পঞ্জিকা দেখে নিন।',
    formsH: 'দেবী দুর্গার নয় রূপ — কোনটির কী অর্থ',
    steps: [['ঘটস্থাপন — সহজ নিয়ম', ['প্রথম দিন স্নান করে পূজার জায়গা পরিষ্কার করুন, লাল কাপড় পাতুন।', 'মাটির পাত্রে পরিষ্কার মাটি দিয়ে যব বুনুন — নয় দিনে অঙ্কুর হয়।', 'তামা বা মাটির ঘটে জল, সুপারি, মুদ্রা আর আতপ চাল দিন; মুখে আমপাতা, তার ওপর লাল কাপড়ে জড়ানো নারকেল রাখুন।', 'ঘট স্থাপন করে দেবীর ছবি রাখুন, প্রদীপ জ্বালান। প্রতিদিন সেই দিনের দেবীর ধ্যান করুন, আরতি করুন, সম্ভব হলে চণ্ডীপাঠ।']],
      ['উপবাসে কী খাবেন', ['খাওয়া যায়: ফল, দুধ-দই, ছানা, সাবু, কুট্টু ও সিঙ্গাড়ার আটা, আলু, মাখানা, বাদাম আর সৈন্ধব লবণ।', 'বাদ: চাল-গম-ডাল, সাধারণ নুন, পেঁয়াজ-রসুন, আমিষ। বাংলায় দুর্গাপূজায় অনেক পরিবার অষ্টমীতে নিরামিষ ও উপোস করে অঞ্জলি দেন — নিজের পরিবারের প্রথা মানুন।', 'ডায়াবেটিস, গর্ভাবস্থা বা ওষুধ চললে ডাক্তারের পরামর্শ নিয়েই উপবাস করুন।']],
      ['কুমারী পূজা', ['অষ্টমী বা নবমীতে ছোট মেয়েদের দেবীরূপে পূজা করা হয় — বেলুড় মঠের কুমারী পূজা বিখ্যাত। উত্তর ভারতে একে কন্যা পূজন বলে: নয়টি মেয়েকে ঘরে ডেকে পা ধুইয়ে, তিলক দিয়ে হালুয়া-পুরি-ছোলা খাওয়ানো হয়।', 'বার্তা সহজ: প্রতিটি মেয়ে দেবীর রূপ — তার সম্মান, পড়াশোনা আর নিরাপত্তাই আসল পূজা।']]],
    aboutH: 'চৈত্র নবরাত্রি, শারদীয় নবরাত্রি আর দুর্গাপূজা',
    about: ['বছরে চারটি নবরাত্রি, তবে প্রধান দুটি। চৈত্র নবরাত্রি বসন্তে, এর নবম দিনে রামনবমী — ভগবান রামের জন্মদিন; বাংলায় এই সময় বাসন্তী পূজাও হয়। শারদীয় নবরাত্রি শরতে, আর দশম দিনে বিজয়া দশমী।', 'বাংলা, অসম, ওড়িশা আর ত্রিপুরায় শারদীয় নবরাত্রির শেষ পাঁচ দিন দুর্গাপূজা — ষষ্ঠীতে বোধন, সপ্তমীতে নবপত্রিকা স্নান, অষ্টমীতে অঞ্জলি ও সন্ধিপূজা, নবমীতে হোম, আর দশমীতে সিঁদুর খেলা ও বিসর্জন। ২০২৭-এ মহাষষ্ঠী ৫ অক্টোবর আর বিজয়া দশমী ৯ অক্টোবর (তালিকায় চিহ্নিত)। মহালয়া, অর্থাৎ পিতৃপক্ষের শেষ দিন, সাধারণত নবরাত্রি শুরুর আগের দিন পড়ে।', 'নবরাত্রির মূল ভাব নিজের ভেতরের অশুভকে জয় করা: নয় দিন সংযম, সাদা খাবার, প্রার্থনা আর অন্যকে সাহায্য। উপবাস না করলেও কারও পাশে দাঁড়ানো, মেয়েদের সম্মান করা আর পরিবারের সঙ্গে আরতি করাও সমান সুন্দর উপায়।'],
    faqH: 'প্রায়ই জিজ্ঞেস করা প্রশ্ন',
    faq: [['চৈত্র নবরাত্রি ২০২৭ কবে শুরু?', 'বুধবার ৭ এপ্রিল ২০২৭, শেষ বৃহস্পতিবার ১৫ এপ্রিল — সেদিন রামনবমী।'], ['দুর্গাপূজা ২০২৭ কবে?', 'মহাষষ্ঠী মঙ্গলবার ৫ অক্টোবর, মহাষ্টমী ৭ অক্টোবর, মহানবমী ৮ অক্টোবর, বিজয়া দশমী শনিবার ৯ অক্টোবর ২০২৭ (স্থানীয় পঞ্জিকায় মিলিয়ে নিন)।'], ['নবরাত্রির প্রথম দিনে কোন দেবীর পূজা?', 'মা শৈলপুত্রীর, ঘটস্থাপনের সঙ্গে।'], ['মহালয়া ২০২৭ কবে?', 'মহালয়া পিতৃপক্ষের অমাবস্যা, সাধারণত নবরাত্রি শুরুর আগের দিন — ২০২৭-এ বুধবার ২৯ সেপ্টেম্বর হওয়ার কথা; পঞ্জিকায় মিলিয়ে নিন।'], ['কুমারী পূজা কবে হয়?', 'সাধারণত মহাষ্টমীতে; কোনো কোনো পরিবারে নবমীতে।']],
    links: [['/aarti/durga-ji-ki-aarti/', '🪔 দুর্গার আরতি'], ['/mantra/', '📿 মন্ত্র অর্থসহ'], ['/festivals/navratri/', '🎉 নবরাত্রির শুভেচ্ছা'], ['/festivals/ram-navami/', '🏹 রামনবমী'], ['/kitne-din-baaki/', '⏳ কত দিন বাকি']],
  },
};
const DI = { hi: 0, en: 1, bn: 2 };
const CSS = '<style>.nv-t{width:100%;border-collapse:collapse;margin:8px 0 6px}.nv-t th,.nv-t td{padding:9px 8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}.nv-t th{font-size:.9rem;color:var(--muted)}.nv-t td:first-child{font-weight:800;width:2.2em}.nv-t small{display:block;color:var(--muted)}.nv-t tr.nv-x td{font-weight:700}.nv-t tr.nv-today td{background:rgba(245,159,0,.18)}.nv-badge{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:999px;background:#e8590c;color:#fff;font-size:.75rem}.nv-note{font-size:.92rem;color:var(--muted)}.nv-f{border:1px solid var(--line);border-radius:14px;padding:4px 14px;margin:10px 0}.nv-f h3{margin:.6rem 0 .2rem}</style>';

export function buildNavratri(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, U = UI[code]; if (!U) return;
  const di = DI[code], path = '/navratri/';
  const row = (start, i, kind) => {
    const iso = addDays(start, i), n = i + 1, x = U.extra[n]?.[kind];
    return `<tr data-d="${iso}"${x ? ' class="nv-x"' : ''}><td>${esc(U.day(n))}</td><td>${esc(fmt(code, iso))}<small>${esc(wd(code, iso))}</small></td><td>${esc(DEVI[i][di])}${x ? `<small>${esc(x)}</small>` : ''}</td></tr>`;
  };
  const table = (start, kind) => `<table class="nv-t"><thead><tr>${U.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${DEVI.map((_, i) => row(start, i, kind)).join('')}${kind === 's' ? `<tr data-d="${addDays(start, 9)}" class="nv-x"><td>${esc(U.day(10))}</td><td>${esc(fmt(code, addDays(start, 9)))}<small>${esc(wd(code, addDays(start, 9)))}</small></td><td>${esc(U.dussehra)}</td></tr>` : ''}</tbody></table>`;
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: U.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const events = [[CHAITRA, U.chaitraH], [SHARAD, U.sharadH]].map(([s, n]) => ({ '@context': 'https://schema.org', '@type': 'Event', name: n, startDate: s, endDate: addDays(s, s === SHARAD ? 9 : 8), eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled', location: { '@type': 'Place', name: 'India', address: { '@type': 'PostalAddress', addressCountry: 'IN' } }, description: U.desc }));
  write(L, path, page(L, {
    path, title: U.title, description: U.desc, langs: LANGS.filter((l) => UI[l.code]),
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.nav, path]]), faqLd, ...events],
    body: `${CSS}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.nav)}</p>
<h1>${esc(U.h1)}</h1><p class="lead">${esc(U.lead)}</p>
<h2>${esc(U.chaitraH)}</h2>${table(CHAITRA, 'c')}
<h2>${esc(U.sharadH)}</h2>${table(SHARAD, 's')}
<p class="nv-note">${esc(U.note)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(U.formsH)}</h2>${DEVI.map((d, i) => `<div class="nv-f"><h3>${esc(U.day(i + 1))}. ${esc(d[di])}</h3><p>${esc(d[3 + di])}</p></div>`).join('')}
${U.steps.map(([h, items]) => `<h2>${esc(h)}</h2><ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`).join('\n')}
<h2>${esc(U.aboutH)}</h2>${U.about.map((p) => `<p>${esc(p)}</p>`).join('')}
<h2>${esc(U.faqH)}</h2>${U.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<p class="chips">${U.links.map(([h, t]) => `<a class="tag" href="${P(L, h)}">${esc(t)}</a>`).join(' ')}</p></div>
<script>(function(){var t=new Date(Date.now()+19800000).toISOString().slice(0,10);document.querySelectorAll('.nv-t tr[data-d="'+t+'"]').forEach(function(r){r.classList.add('nv-today');var c=r.cells[1];var b=document.createElement('span');b.className='nv-badge';b.textContent=${JSON.stringify(U.today)};c.insertBefore(b,c.firstChild.nextSibling);});})();</script>`,
  }));
}
export const NAVRATRI_NAV = Object.fromEntries(Object.entries(UI).map(([k, v]) => [k, v.nav]));
export const NAVRATRI_FEST_LINK = { navratri: true, 'ram-navami': true, dussehra: true };
export const OG_CARDS = [{ file: 'navratri', path: '/navratri/', emoji: '🪔', deco: '🔱🌺🙏', title: 'नवरात्रि 2027' }];
