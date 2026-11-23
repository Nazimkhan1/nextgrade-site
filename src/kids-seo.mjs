/**
 * SEO text for the kids pages (user, 24 Nov 2026: "seo kar dena sahi se").
 * Per set and language: [title, meta description]. Titles carry the words people actually search
 * ("hindi ginti 1 to 100", "17 ka pahada", "table of 17", "barakhadi"), in the page language plus the common Roman form.
 * Sub-pages (one per table / letter / matra) use the functions in KIDS_SEO_CHILD.
 */
const KIDS_SEO = {
  ginti: {
    hi: ['हिंदी गिनती 1 से 100 तक (Hindi Ginti 1 to 100) — आवाज़ के साथ', '1 से 100 तक हिंदी गिनती शब्दों में — एक, दो, तीन से सौ तक। हर संख्या पर टैप करें और सही उच्चारण सुनें। बच्चों के लिए फ्री, अंग्रेज़ी नाम के साथ।'],
    en: ['Numbers 1 to 100 in Words — Hindi and English Counting with Audio', 'Learn numbers 1 to 100 in words with sound: One to One Hundred, with the Hindi name (एक, दो, तीन…) under each number. Free for kids, tap to hear.'],
    hinglish: ['Hindi Ginti 1 se 100 tak — Ek se Sau tak, Awaaz ke saath', 'Hindi ginti 1 se 100 tak shabdon mein: ek, do, teen se sau tak. Har number par tap karo aur sahi uchcharan suno. Bachchon ke liye free.'],
    bn: ['বাংলা সংখ্যা ১ থেকে ১০০ কথায় (Bangla Number 1 to 100) — শব্দ সহ', '১ থেকে ১০০ পর্যন্ত বাংলা সংখ্যা কথায়: এক, দুই, তিন থেকে একশো। প্রতিটি সংখ্যায় ট্যাপ করে উচ্চারণ শুনুন। বাচ্চাদের জন্য ফ্রি।'],
  },
  pahade: {
    hi: ['पहाड़े 2 से 20 तक (Tables 2 to 20) — बोलकर याद करें', '2 से 20 तक के पहाड़े — “दो दूनी चार” वाले पुराने तरीके से, आवाज़ के साथ। हर पहाड़े का अलग पेज, स्लाइड शो से बोलकर याद करें।'],
    en: ['Multiplication Tables 2 to 20 with Audio — Learn Tables for Kids', 'Times tables from 2 to 20, each on its own page with sound ("2 times 3 is 6"). Tap a row to hear it, or play the slideshow to learn the whole table.'],
    hinglish: ['Pahade 2 se 20 tak — Do Dooni Chaar, Awaaz ke saath', 'Pahade 2 se 20 tak, purane tareeke se: do ekam do, do dooni chaar. Har pahade ka alag page, tap karke suno aur yaad karo.'],
    bn: ['নামতা ২ থেকে ২০ (Bangla Namta) — শব্দ সহ মুখস্থ করুন', '২ থেকে ২০ পর্যন্ত নামতা — “দুই এক্কে দুই, দুই দুগুণে চার” — শব্দ সহ। প্রতিটি নামতার আলাদা পাতা, ট্যাপ করে শুনুন।'],
  },
  abc: {
    hi: ['ABC — A से Apple, अंग्रेज़ी वर्णमाला आवाज़ के साथ', 'A for Apple से Z for Zebra तक — अंग्रेज़ी वर्णमाला तस्वीर और आवाज़ के साथ। हर अक्षर पर टैप करें और सुनें। छोटे बच्चों के लिए फ्री।'],
    en: ['ABC Alphabet for Kids — A for Apple to Z for Zebra with Sound', 'Learn the English alphabet with pictures and sound: A for Apple, B for Ball … Z for Zebra. Tap a letter to hear it. Free for preschool kids.'],
    hinglish: ['ABC — A for Apple, English Alphabet Awaaz ke saath', 'A for Apple se Z for Zebra tak — English alphabet picture aur awaaz ke saath. Har letter par tap karo aur suno.'],
    bn: ['ABC — A for Apple, ইংরেজি বর্ণমালা ছবি ও শব্দ সহ', 'A for Apple থেকে Z for Zebra — ইংরেজি বর্ণমালা ছবি ও শব্দ সহ। প্রতিটি অক্ষরে ট্যাপ করে শুনুন।'],
  },
  'hindi-varnamala': {
    hi: ['हिंदी वर्णमाला — क से कबूतर, अ से अनार (स्वर और व्यंजन) आवाज़ के साथ', 'पूरी हिंदी वर्णमाला: 12 स्वर (अ से अः) और 36 व्यंजन (क से ज्ञ) — अ से अनार, क से कबूतर — तस्वीर और आवाज़ के साथ।'],
    en: ['Hindi Alphabet (Varnamala) — Swar and Vyanjan with Pictures and Sound', 'The full Hindi alphabet: vowels (अ to अं) and consonants (क to ज्ञ), each with a word and picture — अ से अनार, क से कबूतर — spoken aloud.'],
    hinglish: ['Hindi Varnamala — Ka se Kabootar, A se Anaar (Awaaz ke saath)', 'Poori Hindi varnamala: swar aur vyanjan, har akshar ke saath shabd aur tasveer — a se anaar, ka se kabootar. Tap karo aur suno.'],
    bn: ['হিন্দি বর্ণমালা (ক-খ-গ) — ছবি ও শব্দ সহ', 'হিন্দি বর্ণমালার সব স্বর ও ব্যঞ্জন — अ से अनार, क से कबूतर — ছবি ও শব্দ সহ।'],
  },
  barakhadi: {
    hi: ['हिंदी बारहखड़ी (क का कि की) — सभी व्यंजन, आवाज़ के साथ', 'क से ज्ञ तक हर व्यंजन की बारहखड़ी — क का कि की कु कू के कै को कौ कं कः — अलग-अलग पेज पर, आवाज़ के साथ।'],
    en: ['Hindi Barakhadi (Ka Kaa Ki Kee) — All Consonants with Audio', 'Hindi barakhadi for every consonant from क to ज्ञ: ka, kaa, ki, kee, ku, koo, ke, kai, ko, kau, kam, kah — each on its own page with sound.'],
    hinglish: ['Hindi Barakhadi — Ka Kaa Ki Kee, Awaaz ke saath', 'Har vyanjan ki barakhadi: ka kaa ki kee ku koo ke kai ko kau kam kah — alag page par, tap karke suno.'],
    bn: ['হিন্দি বারাখড়ি (ক কা কি কী) — শব্দ সহ', 'ক থেকে জ্ঞ পর্যন্ত প্রতিটি হিন্দি ব্যঞ্জনের বারাখড়ি, আলাদা পাতায়, শব্দ সহ।'],
  },
  matra: {
    hi: ['मात्रा वाले शब्द — आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ की मात्रा (चित्र सहित)', 'हिंदी मात्रा वाले शब्द चित्र और आवाज़ के साथ: आ की मात्रा (नाक, कान), इ की मात्रा (किताब), ई की मात्रा (मछली) और बाकी सभी मात्राएँ।'],
    en: ['Hindi Matra Words with Pictures — Aa, I, Ee, U, Oo, E, Ai, O, Au', 'Hindi words for every matra with pictures and sound: aa (नाक), i (किताब), ee (मछली), u (गुलाब), oo (फूल) and more. One page per matra.'],
    hinglish: ['Matra wale Shabd — Aa, I, Ee, U, Oo ki Matra (Picture ke saath)', 'Hindi matra wale shabd tasveer aur awaaz ke saath: aa ki matra (naak, kaan), i ki matra (kitaab), ee ki matra (machhli) aur baaki sab.'],
    bn: ['হিন্দি মাত্রার শব্দ — ছবি ও শব্দ সহ', 'প্রতিটি হিন্দি মাত্রার শব্দ ছবি ও শব্দ সহ — আ, ই, ঈ, উ, ঊ, এ, ঐ, ও, ঔ।'],
  },
  'bangla-bornomala': {
    hi: ['बांग्ला वर्णमाला (অ আ ক খ) — चित्र और आवाज़ के साथ', 'पूरी बांग्ला वर्णमाला: 11 स्वरवर्ण और 39 व्यंजनवर्ण — অ-তে অজগর, ক-তে কলা — तस्वीर और बांग्ला आवाज़ के साथ।'],
    en: ['Bengali Alphabet (Bangla Bornomala) with Pictures and Sound', 'The full Bengali alphabet: 11 vowels (স্বরবর্ণ) and 39 consonants (ব্যঞ্জনবর্ণ) — অ-তে অজগর, ক-তে কলা — with pictures and Bengali audio.'],
    hinglish: ['Bangla Bornomala — O-te Ojogor, Ko-te Kola (Awaaz ke saath)', 'Poori Bangla varnamala: swarbarna aur byanjanbarna, har akshar ke saath shabd, tasveer aur Bangla awaaz.'],
    bn: ['বাংলা বর্ণমালা — অ-তে অজগর, ক-তে কলা (স্বরবর্ণ ও ব্যঞ্জনবর্ণ)', 'সম্পূর্ণ বাংলা বর্ণমালা: ১১টি স্বরবর্ণ ও ৩৯টি ব্যঞ্জনবর্ণ — অ-তে অজগর, ক-তে কলা — ছবি ও শব্দ সহ। বাচ্চাদের জন্য ফ্রি।'],
  },
  'urdu-haroof': {
    hi: ['उर्दू हुरूफ़ — अलिफ़ बे पे (Urdu Alphabet) आवाज़ के साथ', 'उर्दू के सभी हुरूफ़-ए-तहज्जी — अलिफ़, बे, पे से बड़ी ये तक — हर हर्फ़ के साथ शब्द, तस्वीर और आवाज़। अलिफ़ से उल्लू, बे से बिल्ली।'],
    en: ['Urdu Alphabet (Alif Be Pe) for Kids with Pictures and Sound', 'All Urdu letters from Alif to Bari Ye, each with a word, picture and its name spoken aloud — Alif se Ullu, Be se Billi.'],
    hinglish: ['Urdu Haroof — Alif Be Pe, Awaaz ke saath', 'Urdu ke saare haroof — alif, be, pe se badi ye tak — har harf ke saath shabd, tasveer aur awaaz. Alif se ullu, be se billi.'],
    bn: ['উর্দু বর্ণমালা — আলিফ বে পে (Urdu Alphabet) শব্দ সহ', 'উর্দুর সব অক্ষর — আলিফ, বে, পে — প্রতিটির সঙ্গে শব্দ, ছবি ও উচ্চারণ।'],
  },
  fruits: {
    hi: ['फलों के नाम हिंदी और अंग्रेज़ी में (Fruits Name) — चित्र सहित', 'फलों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — सेब (Apple), केला (Banana), आम (Mango) और 16 फल।'],
    en: ['Fruits Names in English and Hindi with Pictures and Sound', 'Learn fruit names with pictures and audio — Apple (सेब), Banana (केला), Mango (आम) and more. Tap to hear each name.'],
    hinglish: ['Fruits Name Hindi aur English mein — Picture ke saath', 'Phalon ke naam Hindi aur English mein, tasveer aur awaaz ke saath — seb (apple), kela (banana), aam (mango).'],
    bn: ['ফলের নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'ফলের নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — আপেল, কলা, আম আর আরও।'],
  },
  animals: {
    hi: ['जानवरों के नाम हिंदी और अंग्रेज़ी में (Animals Name) — चित्र सहित', 'जानवरों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — कुत्ता (Dog), बिल्ली (Cat), शेर (Lion), हाथी (Elephant)।'],
    en: ['Animals Names in English and Hindi with Pictures and Sound', 'Learn animal names with pictures and audio — Dog (कुत्ता), Cat (बिल्ली), Lion (शेर), Elephant (हाथी) and more.'],
    hinglish: ['Animals Name Hindi aur English mein — Picture ke saath', 'Janwaron ke naam Hindi aur English mein, tasveer aur awaaz ke saath — kutta, billi, sher, haathi.'],
    bn: ['পশুদের নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'পশুদের নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — কুকুর, বিড়াল, সিংহ, হাতি।'],
  },
  vegetables: {
    hi: ['सब्ज़ियों के नाम हिंदी और अंग्रेज़ी में (Vegetables Name) — चित्र सहित', 'सब्ज़ियों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — आलू (Potato), टमाटर (Tomato), प्याज़ (Onion), गाजर (Carrot)।'],
    en: ['Vegetables Names in English and Hindi with Pictures and Sound', 'Learn vegetable names with pictures and audio — Potato (आलू), Tomato (टमाटर), Onion (प्याज़), Carrot (गाजर) and more.'],
    hinglish: ['Vegetables Name Hindi aur English mein — Sabziyon ke Naam', 'Sabziyon ke naam Hindi aur English mein, tasveer aur awaaz ke saath — aloo, tamatar, pyaaz, gaajar.'],
    bn: ['সবজির নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'সবজির নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — আলু, টমেটো, পেঁয়াজ, গাজর।'],
  },
  birds: {
    hi: ['पक्षियों के नाम हिंदी और अंग्रेज़ी में (Birds Name) — चित्र सहित', 'पक्षियों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — तोता (Parrot), मोर (Peacock), कबूतर (Pigeon), कौआ (Crow)।'],
    en: ['Birds Names in English and Hindi with Pictures and Sound', 'Learn bird names with pictures and audio — Parrot (तोता), Peacock (मोर), Pigeon (कबूतर), Crow (कौआ) and more.'],
    hinglish: ['Birds Name Hindi aur English mein — Pakshiyon ke Naam', 'Pakshiyon ke naam Hindi aur English mein, tasveer aur awaaz ke saath — tota, mor, kabootar, kauwa.'],
    bn: ['পাখির নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'পাখির নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — টিয়া, ময়ূর, পায়রা, কাক।'],
  },
  flowers: {
    hi: ['फूलों के नाम हिंदी और अंग्रेज़ी में (Flowers Name) — चित्र सहित', 'फूलों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — गुलाब (Rose), कमल (Lotus), सूरजमुखी (Sunflower), गेंदा (Marigold)।'],
    en: ['Flowers Names in English and Hindi with Pictures and Sound', 'Learn flower names with pictures and audio — Rose (गुलाब), Lotus (कमल), Sunflower (सूरजमुखी), Marigold (गेंदा).'],
    hinglish: ['Flowers Name Hindi aur English mein — Phoolon ke Naam', 'Phoolon ke naam Hindi aur English mein, tasveer aur awaaz ke saath — gulaab, kamal, surajmukhi, genda.'],
    bn: ['ফুলের নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'ফুলের নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — গোলাপ, পদ্ম, সূর্যমুখী, গাঁদা।'],
  },
  colours: {
    hi: ['रंगों के नाम हिंदी और अंग्रेज़ी में (Colours Name) — आवाज़ के साथ', 'रंगों के नाम हिंदी और English में — लाल (Red), नीला (Blue), हरा (Green), पीला (Yellow) और 14 रंग, आवाज़ के साथ।'],
    en: ['Colours Names in English and Hindi with Sound — Colors for Kids', 'Learn colour names with sound — Red (लाल), Blue (नीला), Green (हरा), Yellow (पीला) and 14 colours in all.'],
    hinglish: ['Colours Name Hindi aur English mein — Rangon ke Naam', 'Rangon ke naam Hindi aur English mein, awaaz ke saath — laal, neela, hara, peela aur 14 rang.'],
    bn: ['রঙের নাম বাংলা ও ইংরেজিতে — শব্দ সহ', 'রঙের নাম বাংলা ও ইংরেজিতে শব্দ সহ — লাল, নীল, সবুজ, হলুদ আর ১৪টি রং।'],
  },
  shapes: {
    hi: ['आकृतियों के नाम हिंदी और अंग्रेज़ी में (Shapes Name) — आवाज़ के साथ', 'आकृतियों के नाम हिंदी और English में — वृत्त (Circle), वर्ग (Square), त्रिभुज (Triangle), आयत (Rectangle), आवाज़ के साथ।'],
    en: ['Shapes Names in English and Hindi with Sound — Shapes for Kids', 'Learn shape names with sound — Circle (वृत्त), Square (वर्ग), Triangle (त्रिभुज), Rectangle (आयत) and more.'],
    hinglish: ['Shapes Name Hindi aur English mein — Aakritiyon ke Naam', 'Shapes ke naam Hindi aur English mein, awaaz ke saath — vritt, varg, tribhuj, aayat.'],
    bn: ['আকৃতির নাম বাংলা ও ইংরেজিতে — শব্দ সহ', 'আকৃতির নাম বাংলা ও ইংরেজিতে শব্দ সহ — বৃত্ত, বর্গক্ষেত্র, ত্রিভুজ, আয়তক্ষেত্র।'],
  },
  'body-parts': {
    hi: ['शरीर के अंगों के नाम हिंदी और अंग्रेज़ी में (Body Parts Name)', 'शरीर के अंगों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — आँख (Eye), कान (Ear), नाक (Nose), हाथ (Hand)।'],
    en: ['Body Parts Names in English and Hindi with Pictures and Sound', 'Learn body part names with pictures and audio — Eye (आँख), Ear (कान), Nose (नाक), Hand (हाथ) and more.'],
    hinglish: ['Body Parts Name Hindi aur English mein — Sharir ke Ang', 'Sharir ke angon ke naam Hindi aur English mein, tasveer aur awaaz ke saath — aankh, kaan, naak, haath.'],
    bn: ['শরীরের অঙ্গের নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'শরীরের অঙ্গের নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — চোখ, কান, নাক, হাত।'],
  },
  vehicles: {
    hi: ['वाहनों के नाम हिंदी और अंग्रेज़ी में (Vehicles Name) — चित्र सहित', 'वाहनों के नाम हिंदी और English में तस्वीर और आवाज़ के साथ — कार (Car), बस (Bus), रेलगाड़ी (Train), हवाई जहाज़ (Aeroplane)।'],
    en: ['Vehicles Names in English and Hindi with Pictures and Sound', 'Learn vehicle names with pictures and audio — Car, Bus, Train, Aeroplane, Auto Rickshaw and more, with Hindi names.'],
    hinglish: ['Vehicles Name Hindi aur English mein — Gaadiyon ke Naam', 'Gaadiyon ke naam Hindi aur English mein, tasveer aur awaaz ke saath — car, bus, railgaadi, hawai jahaz.'],
    bn: ['যানবাহনের নাম বাংলা ও ইংরেজিতে — ছবি ও শব্দ সহ', 'যানবাহনের নাম বাংলা ও ইংরেজিতে ছবি ও শব্দ সহ — গাড়ি, বাস, ট্রেন, উড়োজাহাজ।'],
  },
  'week-days': {
    hi: ['हफ़्ते के 7 दिनों के नाम हिंदी और अंग्रेज़ी में (Days Name)', 'सप्ताह के सात दिनों के नाम हिंदी और English में आवाज़ के साथ — सोमवार (Monday), मंगलवार (Tuesday) से रविवार (Sunday) तक।'],
    en: ['Days of the Week in English and Hindi with Sound', 'The 7 days of the week with sound — Monday (सोमवार), Tuesday (मंगलवार) to Sunday (रविवार).'],
    hinglish: ['Hafte ke 7 Dinon ke Naam Hindi aur English mein', 'Saat dinon ke naam Hindi aur English mein, awaaz ke saath — somvaar (Monday), mangalvaar (Tuesday) se ravivaar (Sunday) tak.'],
    bn: ['সপ্তাহের সাত দিনের নাম বাংলা ও ইংরেজিতে', 'সপ্তাহের সাত দিনের নাম বাংলা ও ইংরেজিতে শব্দ সহ — সোমবার (Monday) থেকে রবিবার (Sunday)।'],
  },
  months: {
    hi: ['12 महीनों के नाम हिंदी और अंग्रेज़ी में (Months Name)', 'साल के बारह महीनों के नाम हिंदी और English में आवाज़ के साथ — जनवरी (January) से दिसंबर (December) तक।'],
    en: ['Months of the Year in English and Hindi with Sound', 'The 12 months of the year with sound — January (जनवरी) to December (दिसंबर), with Hindi names.'],
    hinglish: ['12 Mahino ke Naam Hindi aur English mein', 'Saal ke 12 mahino ke naam Hindi aur English mein, awaaz ke saath — January se December tak.'],
    bn: ['বারো মাসের নাম বাংলা ও ইংরেজিতে', 'ইংরেজি বারো মাসের নাম বাংলা ও ইংরেজিতে শব্দ সহ — জানুয়ারি থেকে ডিসেম্বর।'],
  },
  'hindi-mahine': {
    hi: ['हिंदी महीनों के नाम — चैत्र से फाल्गुन (हिंदू पंचांग के 12 महीने)', 'हिंदू पंचांग के बारह महीनों के नाम — चैत्र, वैशाख, ज्येष्ठ से फाल्गुन तक — और अंग्रेज़ी महीनों में कब आते हैं, आवाज़ के साथ।'],
    en: ['Hindi Months Names — Chaitra to Phalgun (Hindu Calendar Months)', 'The 12 months of the Hindu calendar — Chaitra, Vaishakh, Jyeshtha to Phalgun — with the English months they fall in, spoken aloud.'],
    hinglish: ['Hindi Mahino ke Naam — Chaitra se Phalgun tak', 'Hindu panchang ke 12 mahino ke naam — chaitra, vaishakh, jyeshtha se phalgun tak — aur English mahino mein kab aate hain.'],
    bn: ['হিন্দি মাসের নাম — চৈত্র থেকে ফাল্গুন', 'হিন্দু পঞ্জিকার বারো মাসের নাম — চৈত্র থেকে ফাল্গুন — ইংরেজি মাসের সঙ্গে, শব্দ সহ।'],
  },
};

// Sub-pages: one table / one letter / one matra. Return [title, description].
const KIDS_SEO_CHILD = {
  pahade: (c, L) => {
    const n = c.slug;
    return {
      hi: [`${n} का पहाड़ा (Table of ${n}) — आवाज़ के साथ`, `${n} का पहाड़ा हिंदी में — ${c.items[0].hi}, ${c.items[1].hi} … ${c.items[9].hi}। हर लाइन पर टैप करें और सुनें। ${n} ka table, बच्चों के लिए।`],
      en: [`Table of ${n} — ${n} Times Table with Audio (${n} ka Pahada)`, `Multiplication table of ${n} from ${n} × 1 to ${n} × 10, with sound: ${c.items[0].en}, ${c.items[1].en} … ${c.items[9].en}.`],
      hinglish: [`${n} ka Pahada (Table of ${n}) — Awaaz ke saath`, `${n} ka pahada ${n} × 1 se ${n} × 10 tak, purane tareeke se bolkar. Har line par tap karo aur suno.`],
      bn: [`${c.emojiBn}-এর নামতা (Table of ${n}) — শব্দ সহ`, `${c.emojiBn}-এর নামতা — ${c.items[0].bn}, ${c.items[1].bn} … ${c.items[9].bn}। প্রতিটি লাইনে ট্যাপ করে শুনুন।`],
    }[L];
  },
  barakhadi: (c, L) => {
    const row = c.items.map((i) => i.letter).join(' ');
    const tr = c.slug.split('-')[0];
    return {
      hi: [`${c.emoji} की बारहखड़ी — ${c.items.slice(0, 4).map((i) => i.letter).join(' ')} (आवाज़ के साथ)`, `${c.emoji} की पूरी बारहखड़ी: ${row}। हर अक्षर पर टैप करें और सही उच्चारण सुनें।`],
      en: [`Hindi Barakhadi of ${c.emoji} (${tr}) — ${c.items.slice(0, 4).map((i) => i.letter).join(' ')} with Sound`, `The full Hindi barakhadi of ${c.emoji}: ${row}. Tap each letter to hear it.`],
      hinglish: [`${c.emoji} ki Barakhadi (${tr}) — Awaaz ke saath`, `${c.emoji} ki poori barakhadi: ${row}. Har akshar par tap karo aur suno.`],
      bn: [`${c.emoji}-এর হিন্দি বারাখড়ি — শব্দ সহ`, `${c.emoji}-এর সম্পূর্ণ হিন্দি বারাখড়ি: ${row}।`],
    }[L];
  },
  matra: (c, L) => {
    const words = c.items.map((i) => i.letter).join(', ');
    const nm = c.name[L] || c.name.en;
    return {
      hi: [`${nm} — चित्र और आवाज़ के साथ`, `${nm}: ${words}। हर शब्द पर टैप करें और सुनें।`],
      en: [`Hindi ${nm} with Pictures and Sound`, `Hindi ${nm}: ${words}. Tap a word to hear it.`],
      hinglish: [`${nm} — Picture aur Awaaz ke saath`, `${nm}: ${words}. Har shabd par tap karo aur suno.`],
      bn: [`${nm} — ছবি ও শব্দ সহ`, `${nm}: ${words}।`],
    }[L];
  },
};

// Headings for the always-visible text list on each page (crawlable, printable).
const KIDS_LIST_H = { hi: 'पूरी सूची', en: 'Full list', hinglish: 'Poori list', bn: 'সম্পূর্ণ তালিকা' };

export { KIDS_SEO, KIDS_SEO_CHILD, KIDS_LIST_H };
