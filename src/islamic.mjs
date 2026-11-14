/**
 * Islamic (Hijri) calendar page: /islamic-calendar/.
 * Today's Hijri date is worked out in the browser (Intl, Umm al-Qura calendar);
 * everything else here is static text. Dates depend on moon sighting — always
 * say "approximately". Keep the tone neutral about practices that differ
 * between communities.
 */
const months = [
  { n: 1, ar: 'مُحَرَّم', hi: 'मुहर्रम', en: 'Muharram', hinglish: 'Muharram', bn: 'মহররম',
    meaning: { hi: '"मना किया गया" — इस महीने में लड़ाई की मनाही थी', en: '"Forbidden" — fighting was not allowed in this month', hinglish: '"Mana kiya gaya" — is mahine mein ladaai ki manaahi thi', bn: '"নিষিদ্ধ" — এই মাসে যুদ্ধ নিষেধ ছিল' },
    days: { hi: '1 तारीख़: इस्लामी नया साल · 10 तारीख़: आशूरा (याद और इबादत का दिन)', en: '1st: Islamic New Year · 10th: Ashura (a day of remembrance and worship)', hinglish: '1 tareekh: Islami naya saal · 10 tareekh: Ashura (yaad aur ibaadat ka din)', bn: '১ তারিখ: ইসলামি নববর্ষ · ১০ তারিখ: আশুরা (স্মরণ আর ইবাদতের দিন)' } },
  { n: 2, ar: 'صَفَر', hi: 'सफ़र', en: 'Safar', hinglish: 'Safar', bn: 'সফর',
    meaning: { hi: '"ख़ाली" — लोग सफ़र या जंग पर जाते थे तो घर ख़ाली हो जाते थे', en: '"Empty" — homes emptied as people went travelling or to war', hinglish: '"Khaali" — log safar ya jung pe jaate the to ghar khaali ho jaate the', bn: '"শূন্য" — মানুষ যাত্রা বা যুদ্ধে যেত বলে ঘর ফাঁকা থাকত' },
    days: { hi: 'कोई ख़ास तारीख़ नहीं — और इस महीने में कोई अपशगुन नहीं ("ला सफ़र")', en: 'No special date — and no bad omen in this month ("La Safar")', hinglish: 'Koi khaas tareekh nahi — aur is mahine mein koi apshagun nahi ("La Safar")', bn: 'বিশেষ কোনো তারিখ নেই — আর এই মাসে কোনো অশুভ নেই ("লা সফর")' } },
  { n: 3, ar: 'رَبِيع الأَوَّل', hi: 'रबी-उल-अव्वल', en: 'Rabi al-Awwal', hinglish: 'Rabi-ul-Awwal', bn: 'রবিউল আউয়াল',
    meaning: { hi: '"पहली बहार" (पहला वसंत)', en: '"First spring"', hinglish: '"Pehli bahaar" (pehla vasant)', bn: '"প্রথম বসন্ত"' },
    days: { hi: '12 तारीख़: बहुत से मुसलमान ईद-ए-मिलादुन्नबी मनाते हैं; कई इलाक़ों में इसे "बारह वफ़ात" भी कहते हैं', en: '12th: many Muslims observe Eid-e-Milad-un-Nabi; in some areas it is called "Barah Wafat"', hinglish: '12 tareekh: bahut se Musalmaan Eid-e-Milad-un-Nabi manate hain; kai ilaakon mein ise "Barah Wafat" bhi kehte hain', bn: '১২ তারিখ: অনেক মুসলমান ঈদে মিলাদুন্নবী পালন করেন; কোথাও একে "বারো ওফাত"ও বলে' } },
  { n: 4, ar: 'رَبِيع الآخِر', hi: 'रबी-उल-आख़िर (रबी-उस-सानी)', en: 'Rabi al-Akhir', hinglish: 'Rabi-ul-Akhir (Rabi-us-Sani)', bn: 'রবিউস সানি',
    meaning: { hi: '"दूसरी बहार"', en: '"Second spring"', hinglish: '"Doosri bahaar"', bn: '"দ্বিতীয় বসন্ত"' },
    days: { hi: 'कुछ इलाक़ों में 11 तारीख़ को "ग्यारहवीं शरीफ़" मनाई जाती है', en: 'In some areas the 11th is observed as "Gyarahvi Sharif"', hinglish: 'Kuch ilaakon mein 11 tareekh ko "Gyarahvi Sharif" manayi jaati hai', bn: 'কোথাও কোথাও ১১ তারিখ "ফাতেহা-ই-ইয়াজদাহম" বা "গেয়ারভি শরিফ" পালিত হয়' } },
  { n: 5, ar: 'جُمَادَى الأُولَى', hi: 'जमादी-उल-अव्वल', en: 'Jumada al-Ula', hinglish: 'Jamadi-ul-Awwal', bn: 'জমাদিউল আউয়াল',
    meaning: { hi: '"पहला सूखा/जमा हुआ महीना"', en: '"First dry / frozen month"', hinglish: '"Pehla sookha/jama hua mahina"', bn: '"প্রথম শুকনো/জমাট মাস"' },
    days: { hi: 'कोई ख़ास तारीख़ नहीं', en: 'No special date', hinglish: 'Koi khaas tareekh nahi', bn: 'বিশেষ কোনো তারিখ নেই' } },
  { n: 6, ar: 'جُمَادَى الآخِرَة', hi: 'जमादी-उल-आख़िर (जमादी-उस-सानी)', en: 'Jumada al-Akhirah', hinglish: 'Jamadi-ul-Akhir (Jamadi-us-Sani)', bn: 'জমাদিউস সানি',
    meaning: { hi: '"दूसरा सूखा/जमा हुआ महीना"', en: '"Second dry / frozen month"', hinglish: '"Doosra sookha/jama hua mahina"', bn: '"দ্বিতীয় শুকনো/জমাট মাস"' },
    days: { hi: 'कोई ख़ास तारीख़ नहीं', en: 'No special date', hinglish: 'Koi khaas tareekh nahi', bn: 'বিশেষ কোনো তারিখ নেই' } },
  { n: 7, ar: 'رَجَب', hi: 'रजब', en: 'Rajab', hinglish: 'Rajab', bn: 'রজব',
    meaning: { hi: '"इज़्ज़त/सम्मान" — चार हुरमत वाले (पवित्र) महीनों में से एक', en: '"Respect / honour" — one of the four sacred months', hinglish: '"Izzat/sammaan" — chaar hurmat wale (pavitra) mahinon mein se ek', bn: '"সম্মান" — চারটি পবিত্র মাসের একটি' },
    days: { hi: '27 तारीख़ की रात: बहुत से मुसलमान शब-ए-मेराज मनाते हैं', en: 'Night of the 27th: many Muslims observe Shab-e-Miraj', hinglish: '27 tareekh ki raat: bahut se Musalmaan Shab-e-Miraj manate hain', bn: '২৭ তারিখের রাত: অনেক মুসলমান শবে মেরাজ পালন করেন' } },
  { n: 8, ar: 'شَعْبَان', hi: 'शाबान', en: "Sha'ban", hinglish: 'Shaban', bn: 'শাবান',
    meaning: { hi: '"फैल जाना" — कबीले पानी की तलाश में फैल जाते थे', en: '"Spreading out" — tribes spread out in search of water', hinglish: '"Phail jaana" — kabeele paani ki talaash mein phail jaate the', bn: '"ছড়িয়ে পড়া" — গোত্রগুলো জলের খোঁজে ছড়িয়ে পড়ত' },
    days: { hi: '15 तारीख़ की रात: बहुत से मुसलमान शब-ए-बरात पर इबादत और माफ़ी की दुआ करते हैं', en: 'Night of the 15th: many Muslims spend Shab-e-Barat in prayer, asking forgiveness', hinglish: '15 tareekh ki raat: bahut se Musalmaan Shab-e-Barat pe ibaadat aur maafi ki dua karte hain', bn: '১৫ তারিখের রাত: অনেক মুসলমান শবে বরাতে ইবাদত করেন আর ক্ষমা চান' } },
  { n: 9, ar: 'رَمَضَان', hi: 'रमज़ान', en: 'Ramadan', hinglish: 'Ramzan', bn: 'রমজান',
    meaning: { hi: '"रमद" यानी तेज़ गर्मी से', en: 'From "ramad", scorching heat', hinglish: '"Ramad" yaani tez garmi se', bn: '"রমদ" অর্থাৎ প্রচণ্ড গরম থেকে' },
    days: { hi: 'पूरे महीने रोज़े · आख़िरी दस रातों में शब-ए-क़द्र की तलाश', en: 'Fasting all month · Laylat al-Qadr is sought in the last ten nights', hinglish: 'Poore mahine roze · aakhri das raaton mein Shab-e-Qadr ki talaash', bn: 'সারা মাস রোজা · শেষ দশ রাতে শবে কদরের খোঁজ' } },
  { n: 10, ar: 'شَوَّال', hi: 'शव्वाल', en: 'Shawwal', hinglish: 'Shawwal', bn: 'শাওয়াল',
    meaning: { hi: '"उठाना" — ऊँटों के प्रजनन के मौसम से जुड़ा नाम', en: '"Raising up" — linked with the camels\' breeding season', hinglish: '"Uthaana" — oonton ke prajanan ke mausam se juda naam', bn: '"তুলে ধরা" — উটের প্রজনন ঋতুর সঙ্গে যুক্ত নাম' },
    days: { hi: '1 तारीख़: ईद-उल-फ़ित्र (इसीलिए इसे "ईद का महीना" भी कहते हैं)', en: '1st: Eid ul-Fitr (which is why it is also called "the month of Eid")', hinglish: '1 tareekh: Eid ul-Fitr (isiliye ise "Eid ka mahina" bhi kehte hain)', bn: '১ তারিখ: ঈদ-উল-ফিতর (তাই একে "ঈদের মাস"ও বলে)' } },
  { n: 11, ar: 'ذُو القَعْدَة', hi: 'ज़िल-क़ादा', en: "Dhu al-Qa'dah", hinglish: 'Zil-Qad', bn: 'জিলকদ',
    meaning: { hi: '"बैठने का महीना" — जंग और सफ़र से आराम; हुरमत वाला महीना', en: '"Month of sitting" — rest from war and travel; a sacred month', hinglish: '"Baithne ka mahina" — jung aur safar se aaraam; hurmat wala mahina', bn: '"বসে থাকার মাস" — যুদ্ধ আর যাত্রা থেকে বিরতি; পবিত্র মাস' },
    days: { hi: 'दो ईदों के बीच — कुछ जगह इसे "ख़ाली का महीना" कहते हैं', en: 'Between the two Eids — some call it "the empty month"', hinglish: 'Do Eidon ke beech — kuch jagah ise "Khaali ka mahina" kehte hain', bn: 'দুই ঈদের মাঝে — কেউ কেউ একে "খালি মাস" বলে' } },
  { n: 12, ar: 'ذُو الحِجَّة', hi: 'ज़िल-हिज्जा', en: 'Dhu al-Hijjah', hinglish: 'Zil-Hijja', bn: 'জিলহজ',
    meaning: { hi: '"हज का महीना" — हुरमत वाला महीना', en: '"Month of Hajj" — a sacred month', hinglish: '"Hajj ka mahina" — hurmat wala mahina', bn: '"হজের মাস" — পবিত্র মাস' },
    days: { hi: '8-13 तारीख़: हज · 9 तारीख़: अरफ़ा का दिन · 10 तारीख़: ईद-उल-अज़हा (बक़रीद)', en: '8th-13th: Hajj · 9th: Day of Arafah · 10th: Eid ul-Adha (Bakrid)', hinglish: '8-13 tareekh: Hajj · 9 tareekh: Arafah ka din · 10 tareekh: Eid ul-Adha (Bakrid)', bn: '৮-১৩ তারিখ: হজ · ৯ তারিখ: আরাফার দিন · ১০ তারিখ: ঈদ-উল-আজহা (বকরি ঈদ)' } },
];

const facts = {
  hi: [
    'चाँद पर चलने वाला साल लगभग 354-355 दिन का होता है — सौर साल से करीब 11 दिन छोटा। इसीलिए रमज़ान और ईद हर साल करीब 11 दिन पहले आते हैं, और लगभग 33 साल में रमज़ान हर मौसम से गुज़र जाता है।',
    'हिजरी कैलेंडर दूसरे ख़लीफ़ा हज़रत उमर (रज़ि.) के ज़माने में, लगभग 638 ईस्वी में तय हुआ। साल 1 वह साल है जब पैग़ंबर ﷺ मक्का से मदीना हिजरत कर गए (622 ईस्वी)।',
    'महीनों के नाम मौसमों पर हैं (बहार, सूखा, गर्मी), क्योंकि पहले बीच-बीच में एक महीना जोड़कर साल को मौसम से मिलाया जाता था (नसी)। इस्लाम ने यह तरीका ख़त्म किया (सूरह तौबा 9:36-37), इसलिए अब महीने हर मौसम में घूमते हैं।',
    'चार हुरमत वाले (पवित्र) महीने हैं: मुहर्रम, रजब, ज़िल-क़ादा और ज़िल-हिज्जा।',
    'रजब को पुराने ज़माने में "अल-असम्म" यानी "बहरा" कहा जाता था, क्योंकि इसमें हथियारों की आवाज़ नहीं सुनाई देती थी।',
    'इस्लामी तारीख़ मग़रिब (सूरज डूबने) से बदलती है। इसलिए शब-ए-बरात या शब-ए-क़द्र की "रात" तारीख़ से पहले वाली शाम से शुरू होती है।',
    'जुमे का पुराना अरबी नाम "यौम अल-अरूबा" था। "जुमा" शब्द "जमा होने" से बना है।',
    'कुछ लोग सफ़र को मनहूस मानते हैं, पर हदीस में पैग़ंबर ﷺ ने फ़रमाया "ला सफ़र" — यानी सफ़र में कोई नहूसत नहीं।',
  ],
  en: [
    'A lunar year has about 354-355 days, roughly 11 days shorter than the solar year. That is why Ramadan and Eid come about 11 days earlier every year, and in about 33 years Ramadan passes through every season.',
    'The Hijri calendar was set in the time of the second Caliph, Hazrat Umar (RA), around 638 CE. Year 1 is the year of the Hijrah (622 CE), when the Prophet ﷺ moved from Makkah to Madinah.',
    'The month names follow seasons (spring, dry, heat) because months were once kept in step with the seasons by adding an extra month now and then (nasi\'). Islam ended this (Surah At-Tawbah 9:36-37), so the months now move through all the seasons.',
    'There are four sacred months: Muharram, Rajab, Dhu al-Qa\'dah and Dhu al-Hijjah.',
    'In old times Rajab was called "al-Asamm", "the deaf", because no clash of weapons was heard in it.',
    'An Islamic date begins at Maghrib (sunset). So the "night" of Shab-e-Barat or Laylat al-Qadr starts on the evening before the date.',
    'Friday\'s old Arabic name was "Yawm al-\'Arubah". The word "Jumu\'ah" comes from "gathering".',
    'Some people think Safar is unlucky, but in a hadith the Prophet ﷺ said "La Safar" — there is no bad omen in Safar.',
  ],
  hinglish: [
    'Chaand pe chalne wala saal lagbhag 354-355 din ka hota hai — solar saal se kareeb 11 din chhota. Isiliye Ramzan aur Eid har saal kareeb 11 din pehle aate hain, aur lagbhag 33 saal mein Ramzan har mausam se guzar jaata hai.',
    'Hijri calendar doosre Khalifa Hazrat Umar (RA) ke zamaane mein, lagbhag 638 CE mein tay hua. Saal 1 woh saal hai jab Paigambar ﷺ Makkah se Madinah hijrat kar gaye (622 CE).',
    'Mahinon ke naam mausamon pe hain (bahaar, sookha, garmi), kyunki pehle beech-beech mein ek mahina jod kar saal ko mausam se milaaya jaata tha (nasi). Islam ne ye tareeka khatm kiya (Surah Tauba 9:36-37), isliye ab mahine har mausam mein ghoomte hain.',
    'Chaar hurmat wale (pavitra) mahine hain: Muharram, Rajab, Zil-Qad aur Zil-Hijja.',
    'Rajab ko purane zamaane mein "al-Asamm" yaani "behra" kaha jaata tha, kyunki isme hathiyaaron ki awaaz nahi sunaayi deti thi.',
    'Islami tareekh Maghrib (sooraj doobne) se badalti hai. Isliye Shab-e-Barat ya Shab-e-Qadr ki "raat" tareekh se pehle wali shaam se shuru hoti hai.',
    'Jumme ka purana Arabic naam "Yawm al-Arubah" tha. "Jumma" shabd "jama hone" se bana hai.',
    'Kuch log Safar ko manhoos maante hain, par hadees mein Paigambar ﷺ ne farmaaya "La Safar" — yaani Safar mein koi nahoosat nahi.',
  ],
  bn: [
    'চান্দ্র বছর প্রায় ৩৫৪-৩৫৫ দিনের — সৌর বছরের চেয়ে প্রায় ১১ দিন ছোট। তাই রমজান আর ঈদ প্রতি বছর প্রায় ১১ দিন এগিয়ে আসে, আর প্রায় ৩৩ বছরে রমজান সব ঋতু ঘুরে আসে।',
    'হিজরি ক্যালেন্ডার ঠিক হয়েছিল দ্বিতীয় খলিফা হজরত উমর (রা.)-এর সময়ে, প্রায় ৬৩৮ খ্রিস্টাব্দে। ১ সাল হল সেই বছর যখন নবীজি ﷺ মক্কা থেকে মদিনায় হিজরত করেন (৬২২ খ্রিস্টাব্দ)।',
    'মাসের নামগুলো ঋতু অনুযায়ী (বসন্ত, শুষ্ক, গরম), কারণ আগে মাঝে মাঝে একটা মাস যোগ করে বছরকে ঋতুর সঙ্গে মেলানো হত (নাসি)। ইসলাম এই রীতি বন্ধ করে (সূরা তওবা ৯:৩৬-৩৭), তাই এখন মাসগুলো সব ঋতুতে ঘোরে।',
    'চারটি পবিত্র (হারাম) মাস: মহররম, রজব, জিলকদ আর জিলহজ।',
    'পুরনো দিনে রজবকে বলা হত "আল-আসাম্ম" অর্থাৎ "বধির", কারণ এই মাসে অস্ত্রের ঝনঝনানি শোনা যেত না।',
    'ইসলামি তারিখ বদলায় মাগরিব (সূর্যাস্ত) থেকে। তাই শবে বরাত বা শবে কদরের "রাত" তারিখের আগের সন্ধ্যা থেকে শুরু হয়।',
    'জুম্মার পুরনো আরবি নাম ছিল "ইয়াওমুল আরুবা"। "জুমুআ" শব্দটি এসেছে "জমায়েত" থেকে।',
    'কেউ কেউ সফর মাসকে অশুভ মনে করেন, কিন্তু হাদিসে নবীজি ﷺ বলেছেন "লা সফর" — অর্থাৎ সফরে কোনো অশুভ নেই।',
  ],
};

// Approximate dates (Umm al-Qura, India often a day later). Update each year.
const upcoming = [
  { hi: 'रजब शुरू (रजब मुबारक)', en: 'Rajab begins (Rajab Mubarak)', hinglish: 'Rajab shuru (Rajab Mubarak)', bn: 'রজব শুরু (রজব মুবারক)', date: { hi: '~10-11 दिसंबर 2026', en: '~10-11 December 2026', hinglish: '~10-11 December 2026', bn: '~১০-১১ ডিসেম্বর ২০২৬' } },
  { hi: 'शब-ए-मेराज (27 रजब की रात)', en: 'Shab-e-Miraj (night of 27 Rajab)', hinglish: 'Shab-e-Miraj (27 Rajab ki raat)', bn: 'শবে মেরাজ (২৭ রজবের রাত)', date: { hi: '~4-6 जनवरी 2027', en: '~4-6 January 2027', hinglish: '~4-6 January 2027', bn: '~৪-৬ জানুয়ারি ২০২৭' } },
  { hi: 'शब-ए-बरात (15 शाबान की रात)', en: 'Shab-e-Barat (night of 15 Sha\'ban)', hinglish: 'Shab-e-Barat (15 Shaban ki raat)', bn: 'শবে বরাত (১৫ শাবানের রাত)', date: { hi: '~22-24 जनवरी 2027', en: '~22-24 January 2027', hinglish: '~22-24 January 2027', bn: '~২২-২৪ জানুয়ারি ২০২৭' } },
  { hi: 'रमज़ान शुरू', en: 'Ramadan begins', hinglish: 'Ramzan shuru', bn: 'রমজান শুরু', date: { hi: '~8-9 फ़रवरी 2027', en: '~8-9 February 2027', hinglish: '~8-9 February 2027', bn: '~৮-৯ ফেব্রুয়ারি ২০২৭' } },
  { hi: 'ईद-उल-फ़ित्र', en: 'Eid ul-Fitr', hinglish: 'Eid ul-Fitr', bn: 'ঈদ-উল-ফিতর', date: { hi: '~9-10 मार्च 2027', en: '~9-10 March 2027', hinglish: '~9-10 March 2027', bn: '~৯-১০ মার্চ ২০২৭' } },
  { hi: 'ईद-उल-अज़हा (बक़रीद)', en: 'Eid ul-Adha (Bakrid)', hinglish: 'Eid ul-Adha (Bakrid)', bn: 'ঈদ-উল-আজহা', date: { hi: '~16-17 मई 2027', en: '~16-17 May 2027', hinglish: '~16-17 May 2027', bn: '~১৬-১৭ মে ২০২৭' } },
  { hi: 'इस्लामी नया साल 1449', en: 'Islamic New Year 1449', hinglish: 'Islami naya saal 1449', bn: 'ইসলামি নববর্ষ ১৪৪৯', date: { hi: '~6-7 जून 2027', en: '~6-7 June 2027', hinglish: '~6-7 June 2027', bn: '~৬-৭ জুন ২০২৭' } },
  { hi: 'आशूरा (10 मुहर्रम)', en: 'Ashura (10 Muharram)', hinglish: 'Ashura (10 Muharram)', bn: 'আশুরা (১০ মহররম)', date: { hi: '~15-16 जून 2027', en: '~15-16 June 2027', hinglish: '~15-16 June 2027', bn: '~১৫-১৬ জুন ২০২৭' } },
];

const text = {
  hi: {
    title: 'आज की इस्लामी तारीख़ और हिजरी महीने — हिजरी कैलेंडर | NextGrade',
    desc: 'आज की हिजरी (इस्लामी) तारीख़, 12 इस्लामी महीनों के नाम और मतलब, उनके ख़ास दिन, कुछ पुरानी दिलचस्प बातें और आने वाली इस्लामी तारीख़ें — रजब, शब-ए-बरात, रमज़ान, ईद।',
    h1: '🌙 आज की इस्लामी तारीख़', lead: 'हिजरी कैलेंडर चाँद पर चलता है। नीचे आज की हिजरी तारीख़, इस महीने का मतलब और सभी 12 महीनों की जानकारी है।',
    todayLabel: 'आज', approx: 'यह तारीख़ उम्म-उल-क़ुरा कैलेंडर से निकाली गई है। चाँद दिखने के हिसाब से भारत में तारीख़ अक्सर एक दिन बाद होती है — सही तारीख़ अपनी मस्जिद या स्थानीय कमेटी से ज़रूर पूछें।',
    thisMonth: 'इस महीने का मतलब', monthsH: '12 इस्लामी महीने और उनके मतलब', cols: ['#', 'महीना', 'अरबी', 'मतलब', 'ख़ास दिन'],
    factsH: 'इस्लामी कैलेंडर की कुछ पुरानी और दिलचस्प बातें', upcomingH: 'आने वाली इस्लामी तारीख़ें (लगभग)', upcomingNote: 'सभी तारीख़ें अंदाज़न हैं और चाँद दिखने पर 1-2 दिन आगे-पीछे हो सकती हैं।',
    linksH: 'शुभकामनाएँ भेजें', jumma: 'जुम्मा मुबारक की शुभकामनाएँ', rajab: 'रजब मुबारक की शुभकामनाएँ', eid: 'ईद-उल-फ़ित्र की जानकारी',
    ah: 'हिजरी',
  },
  en: {
    title: 'Today\'s Islamic Date and the Hijri Months — Hijri Calendar | NextGrade',
    desc: 'Today\'s Hijri (Islamic) date, the names and meanings of the 12 Islamic months, their special days, old facts and upcoming Islamic dates — Rajab, Shab-e-Barat, Ramadan, Eid.',
    h1: '🌙 Today\'s Islamic date', lead: 'The Hijri calendar follows the moon. Below are today\'s Hijri date, what this month\'s name means, and all 12 months.',
    todayLabel: 'Today', approx: 'This date is worked out with the Umm al-Qura calendar. With local moon sighting, the date in India is often one day behind — always check with your mosque or local committee.',
    thisMonth: 'What this month\'s name means', monthsH: 'The 12 Islamic months and their meanings', cols: ['#', 'Month', 'Arabic', 'Meaning', 'Special days'],
    factsH: 'Old and interesting facts about the Islamic calendar', upcomingH: 'Upcoming Islamic dates (approximate)', upcomingNote: 'All dates are approximate and can move by 1-2 days depending on the moon sighting.',
    linksH: 'Send wishes', jumma: 'Jumma Mubarak wishes', rajab: 'Rajab Mubarak wishes', eid: 'About Eid ul-Fitr',
    ah: 'AH',
  },
  hinglish: {
    title: 'Aaj ki Islami Tareekh aur Hijri Mahine — Hijri Calendar | NextGrade',
    desc: 'Aaj ki Hijri (Islami) tareekh, 12 Islami mahinon ke naam aur matlab, unke khaas din, kuch purani dilchasp baatein aur aane wali Islami tareekhein — Rajab, Shab-e-Barat, Ramzan, Eid.',
    h1: '🌙 Aaj ki Islami tareekh', lead: 'Hijri calendar chaand pe chalta hai. Neeche aaj ki Hijri tareekh, is mahine ka matlab aur saare 12 mahinon ki jaankari hai.',
    todayLabel: 'Aaj', approx: 'Ye tareekh Umm-ul-Qura calendar se nikaali gayi hai. Chaand dikhne ke hisaab se Bharat mein tareekh aksar ek din baad hoti hai — sahi tareekh apni masjid ya local committee se zaroor poochhein.',
    thisMonth: 'Is mahine ka matlab', monthsH: '12 Islami mahine aur unke matlab', cols: ['#', 'Mahina', 'Arabic', 'Matlab', 'Khaas din'],
    factsH: 'Islami calendar ki kuch purani aur dilchasp baatein', upcomingH: 'Aane wali Islami tareekhein (lagbhag)', upcomingNote: 'Saari tareekhein andaazan hain aur chaand dikhne pe 1-2 din aage-peeche ho sakti hain.',
    linksH: 'Wishes bhejo', jumma: 'Jumma Mubarak wishes', rajab: 'Rajab Mubarak wishes', eid: 'Eid ul-Fitr ki jaankari',
    ah: 'Hijri',
  },
  bn: {
    title: 'আজকের ইসলামি তারিখ আর হিজরি মাস — হিজরি ক্যালেন্ডার | NextGrade',
    desc: 'আজকের হিজরি (ইসলামি) তারিখ, ১২টি ইসলামি মাসের নাম আর অর্থ, তাদের বিশেষ দিন, পুরনো মজার তথ্য আর আসন্ন ইসলামি তারিখ — রজব, শবে বরাত, রমজান, ঈদ।',
    h1: '🌙 আজকের ইসলামি তারিখ', lead: 'হিজরি ক্যালেন্ডার চাঁদ অনুযায়ী চলে। নিচে আজকের হিজরি তারিখ, এই মাসের নামের অর্থ আর ১২টি মাসের কথা।',
    todayLabel: 'আজ', approx: 'এই তারিখ উম্মুল কুরা ক্যালেন্ডার থেকে বের করা। স্থানীয় চাঁদ দেখার হিসাবে ভারতে তারিখ প্রায়ই এক দিন পিছিয়ে থাকে — সঠিক তারিখ নিজের মসজিদ বা স্থানীয় কমিটি থেকে জেনে নিও।',
    thisMonth: 'এই মাসের নামের অর্থ', monthsH: '১২টি ইসলামি মাস আর তাদের অর্থ', cols: ['#', 'মাস', 'আরবি', 'অর্থ', 'বিশেষ দিন'],
    factsH: 'ইসলামি ক্যালেন্ডারের কিছু পুরনো আর মজার তথ্য', upcomingH: 'আসন্ন ইসলামি তারিখ (আনুমানিক)', upcomingNote: 'সব তারিখ আনুমানিক, চাঁদ দেখার ওপর ১-২ দিন আগে-পরে হতে পারে।',
    linksH: 'শুভেচ্ছা পাঠাও', jumma: 'জুম্মা মুবারকের শুভেচ্ছা', rajab: 'রজব মুবারকের শুভেচ্ছা', eid: 'ঈদ-উল-ফিতরের কথা',
    ah: 'হিজরি',
  },
};

export { months, facts, upcoming, text };
