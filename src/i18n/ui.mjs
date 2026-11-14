/**
 * Interface text for every language. Content (festival guides, wishes) lives
 * in src/festivals.mjs + src/wishes.mjs (Hindi) and src/i18n/<lang>.mjs.
 * Functions take the names they need, so word order can differ per language.
 */
const ui = {
  hi: {
    langName: 'हिंदी',
    nav: { home: 'Home', wishes: 'Wishes', festivals: 'Festivals', games: 'Games', card: 'Wish Card', apps: 'Apps', about: 'About' },
    footer: 'त्योहारों की जानकारी, शुभकामनाएँ और छोटे काम के ऐप्स।',
    langLabel: 'भाषा',
    home: {
      title: 'NextGrade — त्योहार, शुभकामनाएँ और काम के ऐप्स | Festivals, Wishes & Free Apps',
      desc: 'भारत के त्योहारों की पूरी जानकारी — कहानी, महत्व, पूजा और पकवान — साथ में हिंदी-अंग्रेज़ी शुभकामनाएँ, मुफ़्त Wish Card Maker, गेम्स और Hisab Kitab जैसे काम के ऐप्स।',
      h1: 'त्योहारों की बातें, शुभकामनाएँ और काम के छोटे ऐप्स',
      lead: 'हर त्योहार की कहानी, महत्व और मनाने का तरीका — आसान हिंदी में। अपनों को भेजने के लिए तैयार शुभकामनाएँ, एक क्लिक में बनने वाला शुभकामना कार्ड और त्योहारों के मज़ेदार गेम्स।',
      btnCard: '💌 Wish Card बनाएं', btnFestivals: 'सभी त्योहार देखें',
      secWishes: 'रोज़ की शुभकामनाएँ', secUpcoming: 'आने वाले त्योहार', secGames: 'गेम्स', secApps: 'मुफ़्त ऐप्स और टूल्स',
      aboutH: 'NextGrade क्या है?',
      aboutP: 'NextGrade एक छोटी, स्वतंत्र वेबसाइट है जहाँ हम भारत के त्योहारों के बारे में भरोसेमंद, सरल जानकारी और रोज़मर्रा के काम आने वाले छोटे-छोटे मुफ़्त ऐप्स बनाते हैं। हमारी कोशिश है कि हर पेज पढ़ने में आसान हो, मोबाइल पर जल्दी खुले और सच में काम आए।',
    },
    festivals: {
      title: 'भारत के त्योहार — कहानी, महत्व और शुभकामनाएँ | NextGrade',
      desc: 'क्रिसमस, नया साल, लोहड़ी, मकर संक्रांति, गणतंत्र दिवस, होली, ईद, राम नवमी, रक्षा बंधन, गुरु नानक जयंती और दिवाली — हर त्योहार की पूरी जानकारी और शुभकामनाएँ।',
      h1: 'भारत के त्योहार',
      lead: 'हर त्योहार का अपना पेज — क्यों मनाते हैं, कैसे मनाते हैं, क्या पकवान बनते हैं, और अपनों को भेजने के लिए शुभकामनाएँ। सूची आने वाले त्योहारों के क्रम में है।',
      note: 'जिन त्योहारों की तारीख चंद्र कैलेंडर (तिथि) से तय होती है, उनकी सटीक तारीख हर साल बदलती है — पूजा का मुहूर्त अपने स्थानीय पंचांग से ज़रूर देखें।',
    },
    festival: {
      title: (n, en) => `${n} (${en}) — महत्व, कैसे मनाएँ और शुभकामनाएँ | NextGrade`,
      desc: (n, when) => `${n} क्यों और कैसे मनाया जाता है, इसकी कहानी, परंपराएँ और ${n} की शुभकामनाएँ। ${when}।`,
      when: 'कब', where: 'कहाँ',
      wishesH: (n) => `${n} की शुभकामनाएँ`, wishes2H: (n) => `${n} wishes in English`,
      greet: (n) => `${n} की ढेर सारी शुभकामनाएँ`, shareTitle: (n) => `${n} की शुभकामनाएँ`,
      cta: (n) => `अपने नाम के साथ ${n} का सुंदर कार्ड बनाएं और WhatsApp पर भेजें।`,
      summaryH: 'In English',
      faqH: 'अक्सर पूछे जाने वाले सवाल', moreH: 'और त्योहार',
    },
    wishIndex: {
      title: 'रोज़ की शुभकामनाएँ — Good Morning, Birthday, Anniversary, Jumma Mubarak | NextGrade',
      desc: 'गुड मॉर्निंग, जन्मदिन, शादी की सालगिरह और जुम्मा मुबारक की शुभकामनाएँ — कॉपी करें या अपने नाम के लिंक के साथ WhatsApp पर भेजें।',
      h1: 'रोज़ की शुभकामनाएँ',
      lead: 'वो मौके जो हर दिन या हर हफ़्ते आते हैं — सुबह की शुभकामना, जन्मदिन, सालगिरह और जुमा। हर पेज पर तैयार संदेश हैं, और आप अपने नाम वाला लिंक बनाकर भेज सकते हैं।',
      festH: 'त्योहारों की शुभकामनाएँ',
      festP: (href) => `हर त्योहार के पेज पर उसकी कहानी के साथ शुभकामनाएँ भी हैं — <a href="${href}">सभी त्योहार देखें</a>।`,
    },
    wish: {
      title: (n, en) => `${n} शुभकामनाएँ (${en} Wishes) — हिंदी और English | NextGrade`,
      desc: (n) => `${n} के लिए सादे और दिल से लिखे संदेश। कॉपी करें या अपने नाम का लिंक बनाकर WhatsApp पर भेजें।`,
      wishesH: (n) => `${n} के संदेश`, wishes2H: (n) => `${n} wishes in English`,
      cta: (n) => `${n} का सुंदर कार्ड बनाकर गैलरी में सेव करें या भेजें।`,
      aboutH: (n) => `${n} के बारे में`, summaryH: 'In English', faqH: 'अक्सर पूछे जाने वाले सवाल', moreH: 'और शुभकामनाएँ',
    },
    share: {
      h: '✨ अपना विश बनाएं',
      p: (t) => `अपना नाम लिखें — हम आपके नाम वाला लिंक बना देंगे। जिसे भेजेंगे, उसे पेज पर सबसे ऊपर दिखेगा: "<b>आपका नाम</b> की तरफ़ से आपको ${t}"। नाम सिर्फ़ लिंक में रहता है, कहीं सेव नहीं होता।`,
      ph: 'आपका नाम, जैसे: Rahul', wa: '📲 WhatsApp पर भेजें', copy: '🔗 लिंक कॉपी', copied: '✅ कॉपी हो गया', needName: 'पहले अपना नाम लिखें',
      banner: '{from} की तरफ़ से आपको {greet}!', withName: 'अपने नाम से भेजें', withoutName: 'आप भी भेजें', copyPrompt: 'यह लिंक कॉपी करें',
    },
    copy: 'Copy', copied: 'Copied ✓',
    card: {
      title: 'Wish Card Maker — नाम के साथ शुभकामना कार्ड बनाएं | NextGrade',
      desc: 'मुफ़्त Wish Card Maker: मौका या त्योहार चुनें, नाम लिखें, संदेश चुनें और सुंदर कार्ड डाउनलोड करें या WhatsApp पर शेयर करें। कोई साइन-अप नहीं।',
      lead: 'त्योहार चुनें, नाम लिखें और कुछ ही सेकंड में अपना शुभकामना कार्ड बनाएं। कार्ड आपके फ़ोन/कंप्यूटर पर ही बनता है — आपका नाम या संदेश कहीं सेव या भेजा नहीं जाता।',
      occasion: 'मौका / त्योहार', to: 'किसके लिए (नाम)', toPh: 'जैसे: मम्मी-पापा, Rahul', from: 'आपका नाम', fromPh: 'जैसे: Nazim', message: 'संदेश', custom: 'या अपना संदेश लिखें', customPh: 'खाली छोड़ें तो ऊपर वाला संदेश लगेगा',
      share: '📤 Share', download: '⬇️ Download', preview: 'शुभकामना कार्ड का प्रीव्यू',
      howH: 'कैसे इस्तेमाल करें',
      how: ['ऊपर से मौका या त्योहार चुनें — कार्ड का रंग और संदेश उसी के हिसाब से बदल जाएंगे।', 'पाने वाले का और अपना नाम लिखें (चाहें तो खाली भी छोड़ सकते हैं)।', 'तैयार संदेशों में से चुनें या अपना संदेश लिखें।', '<b>Share</b> दबाकर सीधे WhatsApp/Instagram पर भेजें, या <b>Download</b> करके गैलरी में सेव करें।'],
      dear: 'प्रिय {to},', downloaded: 'कार्ड डाउनलोड हो गया।', cantShare: 'इस ब्राउज़र में सीधा शेयर नहीं होता — Download करके भेजें।',
    },
    games: {
      title: 'त्योहारों के मुफ़्त गेम्स — Free Festival Games | NextGrade',
      desc: 'त्योहारों पर बने छोटे, मुफ़्त ब्राउज़र गेम्स — फ़ोन पर खेलें, इंस्टॉल करें और दोस्तों को WhatsApp पर स्कोर का चैलेंज भेजें। कोई साइन-अप नहीं।',
      h1: '🎮 त्योहारों के गेम्स',
      lead: 'हर त्योहार पर एक छोटा, मज़ेदार गेम — फ़ोन पर सीधे खेलें, स्कोर बनाएं और WhatsApp पर दोस्तों को चैलेंज भेजें। गेम आपके फ़ोन में ही चलते हैं; हम कोई अकाउंट या निजी जानकारी नहीं लेते।',
      soonH: 'जल्द आ रहे हैं', soonP: 'नए साल पर आतिशबाज़ी, दिवाली पर दीये जलाओ, होली के रंग और ईद पर ईदी गेम। 🎆🪔🎨🌙', tag: (t) => `${t} game`,
    },
    apps: {
      title: 'मुफ़्त ऐप्स और टूल्स | NextGrade',
      desc: 'NextGrade के मुफ़्त वेब ऐप्स — Hisab Kitab (खर्च और उधार का हिसाब) और Wish Card Maker। फ़ोन पर इंस्टॉल होते हैं, बिना साइन-अप के चलते हैं।',
      h1: 'मुफ़्त ऐप्स और टूल्स',
      lead: 'छोटे, हल्के और मुफ़्त वेब ऐप्स जो मोबाइल पर ऐप की तरह इंस्टॉल हो जाते हैं। ज़्यादातर ऐप आपका डेटा आपके ही फ़ोन पर रखते हैं।',
      installH: 'Install कैसे करें',
      installP: 'Android पर Chrome में ऐप खोलें और मेनू (⋮) से <b>Install app / Add to Home screen</b> चुनें। iPhone पर Safari में Share बटन दबाकर <b>Add to Home Screen</b> चुनें।',
    },
    about: {
      title: 'About NextGrade', desc: 'NextGrade के बारे में — हम कौन हैं, यह साइट क्यों बनाई और हमारी जानकारी कहाँ से आती है।',
      html: (contact) => `<p class="lead">NextGrade (nextgrade.in) भारत में बनी एक छोटी, स्वतंत्र वेबसाइट है।</p>
<h2>हम क्या करते हैं</h2>
<p>हम तीन तरह की चीज़ें बनाते हैं: <b>त्योहारों की सरल और भरोसेमंद जानकारी</b> — कहानी, महत्व, परंपराएँ, पकवान और शुभकामनाएँ; <b>त्योहारों के छोटे गेम्स</b>; और <b>मुफ़्त वेब ऐप्स</b>, जैसे खर्च और उधार का हिसाब रखने वाला Hisab Kitab और Wish Card Maker। साइट हिंदी, English, Hinglish और বাংলা में है।</p>
<h2>हमारी जानकारी</h2>
<p>त्योहारों के पेज आम तौर पर मानी जाने वाली परंपराओं, धार्मिक ग्रंथों की लोकप्रिय कथाओं और सार्वजनिक स्रोतों पर आधारित हैं। जिन त्योहारों की तारीख तिथि से तय होती है, उनके लिए हम महीना और तिथि लिखते हैं, क्योंकि अंग्रेज़ी तारीख हर साल बदलती है। कोई गलती दिखे तो <a href="${contact}">हमें बताएं</a> — हम जल्द सुधारेंगे।</p>
<h2>हमारे ऐप्स और आपका डेटा</h2>
<p>हम कोई सर्वर या डेटाबेस में आपकी जानकारी नहीं रखते। ऐप्स आपका डेटा आपके ही डिवाइस पर रखते हैं, और Wish Card Maker आपका नाम या संदेश कहीं नहीं भेजता — कार्ड आपके ब्राउज़र में ही बनता है।</p>`,
    },
    contact: {
      title: 'Contact', desc: 'NextGrade से संपर्क करें — सुझाव, गलती की सूचना या ऐप से जुड़ा सवाल।',
      html: (email) => `<p class="lead">सुझाव, किसी पेज में गलती, या किसी ऐप से जुड़ा सवाल — हमें ईमेल करें।</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>हम आम तौर पर 2-3 कार्यदिवसों में जवाब देते हैं। कृपया ईमेल में पासवर्ड, OTP या बैंक की जानकारी कभी न भेजें।</p>`,
    },
  },

  en: {
    langName: 'English',
    nav: { home: 'Home', wishes: 'Wishes', festivals: 'Festivals', games: 'Games', card: 'Wish Card', apps: 'Apps', about: 'About' },
    footer: 'Indian festivals, wishes and small useful apps.',
    langLabel: 'Language',
    home: {
      title: 'NextGrade — Indian Festivals, Wishes, Games & Free Apps',
      desc: 'Clear guides to Indian festivals — their story, meaning, rituals and food — with ready-to-share wishes, a free Wish Card Maker, festival games and small free apps like Hisab Kitab.',
      h1: 'Indian festivals, warm wishes and handy little apps',
      lead: 'The story, meaning and traditions of every festival in simple words, wishes ready to send to your loved ones, a one-click greeting-card maker and fun festival games.',
      btnCard: '💌 Make a Wish Card', btnFestivals: 'See all festivals',
      secWishes: 'Everyday wishes', secUpcoming: 'Upcoming festivals', secGames: 'Games', secApps: 'Free apps and tools',
      aboutH: 'What is NextGrade?',
      aboutP: 'NextGrade is a small independent website from India. We write reliable, simple guides to Indian festivals and build small free apps for everyday life. Every page is meant to be easy to read, quick on a phone and genuinely useful.',
    },
    festivals: {
      title: 'Indian Festivals — Stories, Meaning and Wishes | NextGrade',
      desc: 'Christmas, New Year, Lohri, Makar Sankranti, Republic Day, Holi, Eid, Ram Navami, Raksha Bandhan, Guru Nanak Jayanti, Diwali and more — what each festival means, how it is celebrated and wishes to share.',
      h1: 'Indian festivals',
      lead: 'Every festival has its own page — why it is celebrated, how, the food that is made, and wishes to send to your loved ones. The list starts with the festivals coming up next.',
      note: 'Festivals that follow the lunar calendar (tithi) fall on a different date every year — check the exact muhurat in your local panchang.',
    },
    festival: {
      title: (n, alt) => `${n} (${alt}) — Meaning, How to Celebrate and Wishes | NextGrade`,
      desc: (n, when) => `Why and how ${n} is celebrated — its story, traditions and ${n} wishes in English and Hindi. ${when}.`,
      when: 'When', where: 'Where',
      wishesH: (n) => `${n} wishes`, wishes2H: (n) => `${n} wishes in Hindi`,
      greet: (n) => `warm ${n} wishes`, shareTitle: (n) => `${n} wishes`,
      cta: (n) => `Make a beautiful ${n} card with your name and send it on WhatsApp.`,
      summaryH: '', faqH: 'Frequently asked questions', moreH: 'More festivals',
    },
    wishIndex: {
      title: 'Everyday Wishes — Good Morning, Birthday, Anniversary, Jumma Mubarak | NextGrade',
      desc: 'Good morning, birthday, wedding anniversary and Jumma Mubarak wishes in English and Hindi — copy them or send them on WhatsApp with a link that carries your name.',
      h1: 'Everyday wishes',
      lead: 'For the moments that come every day or every week — a good-morning message, birthdays, anniversaries and Friday. Each page has ready wishes, and you can send a link with your own name.',
      festH: 'Festival wishes',
      festP: (href) => `Every festival page has wishes along with its story — <a href="${href}">see all festivals</a>.`,
    },
    wish: {
      title: (n) => `${n} Wishes in English and Hindi | NextGrade`,
      desc: (n) => `Simple, heartfelt ${n} messages in English and Hindi. Copy one, or send it on WhatsApp with a link that carries your name.`,
      wishesH: (n) => `${n} wishes`, wishes2H: (n) => `${n} wishes in Hindi`,
      cta: (n) => `Make a ${n} card, save it to your gallery or send it.`,
      aboutH: (n) => `About ${n} messages`, summaryH: '', faqH: 'Frequently asked questions', moreH: 'More wishes',
    },
    share: {
      h: '✨ Make your own wish',
      p: (t) => `Type your name and we will make a link with it. Whoever opens it sees at the top: "<b>Your name</b> sends you ${t}". Your name stays only in the link — nothing is saved.`,
      ph: 'Your name, e.g. Rahul', wa: '📲 Send on WhatsApp', copy: '🔗 Copy link', copied: '✅ Copied', needName: 'Type your name first',
      banner: '{from} sends you {greet}!', withName: 'Send yours with your name', withoutName: 'Send your own', copyPrompt: 'Copy this link',
    },
    copy: 'Copy', copied: 'Copied ✓',
    card: {
      title: 'Wish Card Maker — Make a Greeting Card with Your Name | NextGrade',
      desc: 'Free Wish Card Maker: pick an occasion or festival, add names, choose a message and download a beautiful card or share it on WhatsApp. No sign-up.',
      lead: 'Pick an occasion, add names and make your greeting card in seconds. The card is made on your own phone or computer — your names and message are never saved or sent anywhere.',
      occasion: 'Occasion / festival', to: 'For (name)', toPh: 'e.g. Mom & Dad, Rahul', from: 'Your name', fromPh: 'e.g. Nazim', message: 'Message', custom: 'Or write your own message', customPh: 'Leave empty to use the message above',
      share: '📤 Share', download: '⬇️ Download', preview: 'Greeting card preview',
      howH: 'How to use it',
      how: ['Pick an occasion or festival — the card colours and messages change to match.', 'Add the receiver\'s name and yours (you can leave them empty too).', 'Choose a ready message or write your own.', 'Tap <b>Share</b> to send it straight to WhatsApp/Instagram, or <b>Download</b> to save it to your gallery.'],
      dear: 'Dear {to},', downloaded: 'Card downloaded.', cantShare: 'This browser can\'t share directly — download the card and send it.',
    },
    games: {
      title: 'Free Festival Games | NextGrade',
      desc: 'Small free browser games for Indian festivals — play on your phone, install them and challenge friends on WhatsApp. No sign-up.',
      h1: '🎮 Festival games',
      lead: 'A small, fun game for every festival — play right in your phone\'s browser, set a score and challenge friends on WhatsApp. The games run on your phone; we don\'t ask for an account or any personal details.',
      soonH: 'Coming soon', soonP: 'New Year fireworks, light the diyas for Diwali, Holi colours and an Eidi game for Eid. 🎆🪔🎨🌙', tag: (t) => `${t} game`,
    },
    apps: {
      title: 'Free Apps and Tools | NextGrade',
      desc: 'Free web apps from NextGrade — Hisab Kitab (expense and lend/borrow tracker) and the Wish Card Maker. They install on your phone and work without a sign-up.',
      h1: 'Free apps and tools',
      lead: 'Small, light, free web apps that install on your phone like an app. Most of them keep your data on your own phone.',
      installH: 'How to install',
      installP: 'On Android, open the app in Chrome and choose <b>Install app / Add to Home screen</b> from the menu (⋮). On iPhone, open it in Safari, tap Share and choose <b>Add to Home Screen</b>.',
    },
    about: {
      title: 'About NextGrade', desc: 'About NextGrade — who we are, why we made this site and where our information comes from.',
      html: (contact) => `<p class="lead">NextGrade (nextgrade.in) is a small independent website made in India.</p>
<h2>What we do</h2>
<p>We make three kinds of things: <b>simple, reliable guides to Indian festivals</b> — their story, meaning, traditions, food and wishes; <b>small festival games</b>; and <b>free web apps</b> such as Hisab Kitab (an expense and lend/borrow tracker) and the Wish Card Maker. The site is available in Hindi, English, Hinglish and Bengali.</p>
<h2>Where our information comes from</h2>
<p>Festival pages are based on widely followed traditions, well-known stories from religious texts and public sources. For festivals that follow the lunar calendar we give the month and tithi, because the calendar date changes every year. If you spot a mistake, please <a href="${contact}">tell us</a> and we will fix it.</p>
<h2>Our apps and your data</h2>
<p>We don't keep your information on any server or database. Our apps keep your data on your own device, and the Wish Card Maker never sends your names or message anywhere — the card is made in your browser.</p>`,
    },
    contact: {
      title: 'Contact', desc: 'Contact NextGrade — suggestions, corrections or questions about our apps.',
      html: (email) => `<p class="lead">Suggestions, a mistake on a page or a question about one of our apps — email us.</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>We usually reply within 2-3 working days. Please never send passwords, OTPs or bank details by email.</p>`,
    },
  },

  hinglish: {
    langName: 'Hinglish',
    nav: { home: 'Home', wishes: 'Wishes', festivals: 'Festivals', games: 'Games', card: 'Wish Card', apps: 'Apps', about: 'About' },
    footer: 'Tyoharon ki jaankari, wishes aur chhote kaam ke apps.',
    langLabel: 'Bhasha',
    home: {
      title: 'NextGrade — Tyohar, Wishes, Games aur Free Apps | Festivals in Hinglish',
      desc: 'Bharat ke tyoharon ki poori jaankari — kahani, mahatva, puja aur pakwan — saath mein Hinglish aur English wishes, free Wish Card Maker, festival games aur Hisab Kitab jaise kaam ke apps.',
      h1: 'Tyoharon ki baatein, wishes aur kaam ke chhote apps',
      lead: 'Har tyohar ki kahani, mahatva aur manane ka tareeka — aasaan Hinglish mein. Apno ko bhejne ke liye ready wishes, ek click mein banne wala greeting card aur tyoharon ke mazedaar games.',
      btnCard: '💌 Wish Card banao', btnFestivals: 'Saare tyohar dekho',
      secWishes: 'Roz ki wishes', secUpcoming: 'Aane wale tyohar', secGames: 'Games', secApps: 'Free apps aur tools',
      aboutH: 'NextGrade kya hai?',
      aboutP: 'NextGrade ek chhoti, independent website hai jahan hum Bharat ke tyoharon ke baare mein bharosemand, simple jaankari aur roz kaam aane wale chhote free apps banate hain. Koshish yahi hai ki har page padhne mein aasaan ho, phone pe jaldi khule aur sach mein kaam aaye.',
    },
    festivals: {
      title: 'Bharat ke Tyohar — Kahani, Mahatva aur Wishes | NextGrade',
      desc: 'Christmas, New Year, Lohri, Makar Sankranti, Republic Day, Holi, Eid, Ram Navami, Raksha Bandhan, Guru Nanak Jayanti aur Diwali — har tyohar ki poori jaankari aur wishes, Hinglish mein.',
      h1: 'Bharat ke tyohar',
      lead: 'Har tyohar ka apna page — kyun manate hain, kaise manate hain, kya pakwan bante hain, aur apno ko bhejne ke liye wishes. List aane wale tyoharon ke order mein hai.',
      note: 'Jin tyoharon ki tareekh chandra calendar (tithi) se tay hoti hai, unki sahi tareekh har saal badalti hai — puja ka muhurat apne local panchang se zaroor dekhein.',
    },
    festival: {
      title: (n, alt) => `${n} (${alt}) — Mahatva, Kaise Manayein aur Wishes | NextGrade`,
      desc: (n, when) => `${n} kyun aur kaise manaya jaata hai, iski kahani, parampara aur ${n} ki Hinglish aur English wishes. ${when}.`,
      when: 'Kab', where: 'Kahan',
      wishesH: (n) => `${n} ki wishes`, wishes2H: (n) => `${n} wishes in English`,
      greet: (n) => `${n} ki dher saari shubhkamnayein`, shareTitle: (n) => `${n} ki wishes`,
      cta: (n) => `Apne naam ke saath ${n} ka sundar card banao aur WhatsApp pe bhejo.`,
      summaryH: '', faqH: 'Aksar poochhe jaane wale sawaal', moreH: 'Aur tyohar',
    },
    wishIndex: {
      title: 'Roz ki Wishes — Good Morning, Birthday, Anniversary, Jumma Mubarak | NextGrade',
      desc: 'Good Morning, Birthday, Anniversary aur Jumma Mubarak ki wishes Hinglish aur English mein — copy karo ya apne naam ke link ke saath WhatsApp pe bhejo.',
      h1: 'Roz ki wishes',
      lead: 'Woh mauke jo har din ya har hafte aate hain — subah ki wish, birthday, anniversary aur Jumma. Har page pe ready messages hain, aur aap apne naam wala link bana ke bhej sakte ho.',
      festH: 'Tyoharon ki wishes',
      festP: (href) => `Har tyohar ke page pe uski kahani ke saath wishes bhi hain — <a href="${href}">saare tyohar dekho</a>.`,
    },
    wish: {
      title: (n) => `${n} Wishes Hinglish aur English mein | NextGrade`,
      desc: (n) => `${n} ke liye simple aur dil se likhe messages. Copy karo ya apne naam ka link bana ke WhatsApp pe bhejo.`,
      wishesH: (n) => `${n} ke messages`, wishes2H: (n) => `${n} wishes in English`,
      cta: (n) => `${n} ka sundar card bana ke gallery mein save karo ya bhejo.`,
      aboutH: (n) => `${n} ke baare mein`, summaryH: '', faqH: 'Aksar poochhe jaane wale sawaal', moreH: 'Aur wishes',
    },
    share: {
      h: '✨ Apna wish banao',
      p: (t) => `Apna naam likho — hum aapke naam wala link bana denge. Jise bhejoge, use page pe sabse upar dikhega: "<b>Aapka naam</b> ki taraf se aapko ${t}". Naam sirf link mein rehta hai, kahin save nahi hota.`,
      ph: 'Aapka naam, jaise: Rahul', wa: '📲 WhatsApp pe bhejo', copy: '🔗 Link copy', copied: '✅ Copy ho gaya', needName: 'Pehle apna naam likho',
      banner: '{from} ki taraf se aapko {greet}!', withName: 'Apne naam se bhejo', withoutName: 'Aap bhi bhejo', copyPrompt: 'Ye link copy karo',
    },
    copy: 'Copy', copied: 'Copied ✓',
    card: {
      title: 'Wish Card Maker — Naam ke saath Greeting Card banao | NextGrade',
      desc: 'Free Wish Card Maker: mauka ya tyohar chuno, naam likho, message chuno aur sundar card download karo ya WhatsApp pe share karo. Koi sign-up nahi.',
      lead: 'Tyohar chuno, naam likho aur kuch hi second mein apna greeting card banao. Card aapke phone/computer pe hi banta hai — aapka naam ya message kahin save ya bheja nahi jaata.',
      occasion: 'Mauka / tyohar', to: 'Kiske liye (naam)', toPh: 'Jaise: Mummy-Papa, Rahul', from: 'Aapka naam', fromPh: 'Jaise: Nazim', message: 'Message', custom: 'Ya apna message likho', customPh: 'Khaali chhodo to upar wala message lagega',
      share: '📤 Share', download: '⬇️ Download', preview: 'Greeting card ka preview',
      howH: 'Kaise use karein',
      how: ['Upar se mauka ya tyohar chuno — card ka rang aur message usi ke hisaab se badal jaayenge.', 'Paane wale ka aur apna naam likho (chaho to khaali bhi chhod sakte ho).', 'Ready messages mein se chuno ya apna message likho.', '<b>Share</b> daba ke seedha WhatsApp/Instagram pe bhejo, ya <b>Download</b> karke gallery mein save karo.'],
      dear: 'Pyaare {to},', downloaded: 'Card download ho gaya.', cantShare: 'Is browser mein seedha share nahi hota — Download karke bhejo.',
    },
    games: {
      title: 'Tyoharon ke Free Games | NextGrade',
      desc: 'Tyoharon pe bane chhote, free browser games — phone pe khelo, install karo aur doston ko WhatsApp pe score ka challenge bhejo. Koi sign-up nahi.',
      h1: '🎮 Tyoharon ke games',
      lead: 'Har tyohar pe ek chhota, mazedaar game — phone pe seedha khelo, score banao aur WhatsApp pe doston ko challenge bhejo. Games aapke phone mein hi chalte hain; hum koi account ya personal jaankari nahi lete.',
      soonH: 'Jaldi aa rahe hain', soonP: 'New Year pe aatishbaazi, Diwali pe diye jalao, Holi ke rang aur Eid pe Eidi game. 🎆🪔🎨🌙', tag: (t) => `${t} game`,
    },
    apps: {
      title: 'Free Apps aur Tools | NextGrade',
      desc: 'NextGrade ke free web apps — Hisab Kitab (kharche aur udhaar ka hisaab) aur Wish Card Maker. Phone pe install hote hain, bina sign-up ke chalte hain.',
      h1: 'Free apps aur tools',
      lead: 'Chhote, halke aur free web apps jo phone pe app ki tarah install ho jaate hain. Zyadatar apps aapka data aapke hi phone pe rakhte hain.',
      installH: 'Install kaise karein',
      installP: 'Android pe Chrome mein app kholo aur menu (⋮) se <b>Install app / Add to Home screen</b> chuno. iPhone pe Safari mein Share button daba ke <b>Add to Home Screen</b> chuno.',
    },
    about: {
      title: 'About NextGrade', desc: 'NextGrade ke baare mein — hum kaun hain, ye site kyun banayi aur hamari jaankari kahan se aati hai.',
      html: (contact) => `<p class="lead">NextGrade (nextgrade.in) Bharat mein bani ek chhoti, independent website hai.</p>
<h2>Hum kya karte hain</h2>
<p>Hum teen tarah ki cheezein banate hain: <b>tyoharon ki simple aur bharosemand jaankari</b> — kahani, mahatva, parampara, pakwan aur wishes; <b>tyoharon ke chhote games</b>; aur <b>free web apps</b>, jaise kharche aur udhaar ka hisaab rakhne wala Hisab Kitab aur Wish Card Maker. Site Hindi, English, Hinglish aur Bangla mein hai.</p>
<h2>Hamari jaankari</h2>
<p>Tyoharon ke pages aam taur pe maani jaane wali paramparaon, dharmik granthon ki mashhoor kathaon aur public sources pe based hain. Jin tyoharon ki tareekh tithi se tay hoti hai, unke liye hum mahina aur tithi likhte hain, kyunki English tareekh har saal badalti hai. Koi galti dikhe to <a href="${contact}">hamein batao</a> — hum jaldi theek karenge.</p>
<h2>Hamare apps aur aapka data</h2>
<p>Hum kisi server ya database mein aapki jaankari nahi rakhte. Apps aapka data aapke hi device pe rakhte hain, aur Wish Card Maker aapka naam ya message kahin nahi bhejta — card aapke browser mein hi banta hai.</p>`,
    },
    contact: {
      title: 'Contact', desc: 'NextGrade se sampark karo — sujhav, galti ki soochna ya app se juda sawaal.',
      html: (email) => `<p class="lead">Sujhav, kisi page mein galti, ya kisi app se juda sawaal — hamein email karo.</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>Hum aam taur pe 2-3 working days mein jawaab dete hain. Email mein password, OTP ya bank ki jaankari kabhi mat bhejna.</p>`,
    },
  },

  bn: {
    langName: 'বাংলা',
    nav: { home: 'হোম', wishes: 'শুভেচ্ছা', festivals: 'উৎসব', games: 'গেম', card: 'উইশ কার্ড', apps: 'অ্যাপ', about: 'আমাদের কথা' },
    footer: 'উৎসবের কথা, শুভেচ্ছা আর ছোট কাজের অ্যাপ।',
    langLabel: 'ভাষা',
    home: {
      title: 'NextGrade — উৎসব, শুভেচ্ছা, গেম আর ফ্রি অ্যাপ | বাংলায়',
      desc: 'ভারতের উৎসবের পুরো কথা — গল্প, তাৎপর্য, পুজো আর খাবার — সঙ্গে বাংলা ও ইংরেজি শুভেচ্ছা, ফ্রি উইশ কার্ড মেকার, উৎসবের গেম আর হিসাব কিতাবের মতো কাজের অ্যাপ।',
      h1: 'উৎসবের কথা, শুভেচ্ছা আর কাজের ছোট অ্যাপ',
      lead: 'প্রতিটি উৎসবের গল্প, তাৎপর্য আর পালনের রীতি — সহজ বাংলায়। প্রিয়জনদের পাঠানোর জন্য তৈরি শুভেচ্ছা, এক ক্লিকে বানানো শুভেচ্ছা কার্ড আর উৎসবের মজার গেম।',
      btnCard: '💌 উইশ কার্ড বানাও', btnFestivals: 'সব উৎসব দেখো',
      secWishes: 'রোজকার শুভেচ্ছা', secUpcoming: 'আসন্ন উৎসব', secGames: 'গেম', secApps: 'ফ্রি অ্যাপ ও টুল',
      aboutH: 'NextGrade কী?',
      aboutP: 'NextGrade ভারতে তৈরি একটি ছোট, স্বাধীন ওয়েবসাইট। এখানে আমরা ভারতের উৎসব নিয়ে নির্ভরযোগ্য, সহজ লেখা আর রোজকার কাজে লাগে এমন ছোট ফ্রি অ্যাপ বানাই। চেষ্টা একটাই — প্রতিটি পাতা যেন পড়তে সহজ হয়, ফোনে তাড়াতাড়ি খোলে আর সত্যিই কাজে আসে।',
    },
    festivals: {
      title: 'ভারতের উৎসব — গল্প, তাৎপর্য আর শুভেচ্ছা | NextGrade',
      desc: 'বড়দিন, নববর্ষ, লোহরি, মকর সংক্রান্তি, প্রজাতন্ত্র দিবস, হোলি, ঈদ, রামনবমী, রাখিবন্ধন, গুরু নানক জয়ন্তী আর দীপাবলি — প্রতিটি উৎসবের কথা আর শুভেচ্ছা, বাংলায়।',
      h1: 'ভারতের উৎসব',
      lead: 'প্রতিটি উৎসবের নিজের পাতা — কেন পালন করা হয়, কীভাবে পালন করা হয়, কী খাবার তৈরি হয়, আর প্রিয়জনদের পাঠানোর শুভেচ্ছা। তালিকাটি আসন্ন উৎসবের ক্রমে সাজানো।',
      note: 'যে উৎসবগুলোর তারিখ চান্দ্র পঞ্জিকা (তিথি) অনুযায়ী ঠিক হয়, সেগুলোর ইংরেজি তারিখ প্রতি বছর বদলায় — পুজোর সঠিক মুহূর্ত স্থানীয় পঞ্জিকা দেখে নিও।',
    },
    festival: {
      title: (n, alt) => `${n} (${alt}) — তাৎপর্য, পালনের রীতি আর শুভেচ্ছা | NextGrade`,
      desc: (n, when) => `${n} কেন ও কীভাবে পালন করা হয়, এর গল্প, রীতিনীতি আর ${n}-এর বাংলা ও ইংরেজি শুভেচ্ছা। ${when}।`,
      when: 'কবে', where: 'কোথায়',
      wishesH: (n) => `${n}-এর শুভেচ্ছা`, wishes2H: (n) => `${n} wishes in English`,
      greet: (n) => `${n}-এর অনেক শুভেচ্ছা`, shareTitle: (n) => `${n}-এর শুভেচ্ছা`,
      cta: (n) => `নিজের নাম দিয়ে ${n}-এর সুন্দর কার্ড বানাও আর WhatsApp-এ পাঠাও।`,
      summaryH: '', faqH: 'প্রায়ই জিজ্ঞাসিত প্রশ্ন', moreH: 'আরও উৎসব',
    },
    wishIndex: {
      title: 'রোজকার শুভেচ্ছা — সুপ্রভাত, জন্মদিন, বিবাহবার্ষিকী, জুম্মা মুবারক | NextGrade',
      desc: 'সুপ্রভাত, জন্মদিন, বিবাহবার্ষিকী আর জুম্মা মুবারকের শুভেচ্ছা বাংলা ও ইংরেজিতে — কপি করো বা নিজের নামের লিংকসহ WhatsApp-এ পাঠাও।',
      h1: 'রোজকার শুভেচ্ছা',
      lead: 'যে মুহূর্তগুলো প্রতিদিন বা প্রতি সপ্তাহে আসে — সকালের শুভেচ্ছা, জন্মদিন, বিবাহবার্ষিকী আর জুম্মা। প্রতিটি পাতায় তৈরি বার্তা আছে, আর নিজের নামের লিংক বানিয়েও পাঠাতে পারো।',
      festH: 'উৎসবের শুভেচ্ছা',
      festP: (href) => `প্রতিটি উৎসবের পাতায় তার গল্পের সঙ্গে শুভেচ্ছাও আছে — <a href="${href}">সব উৎসব দেখো</a>।`,
    },
    wish: {
      title: (n) => `${n} — বাংলা ও ইংরেজি শুভেচ্ছাবার্তা | NextGrade`,
      desc: (n) => `${n}-এর জন্য সহজ আর মন থেকে লেখা বার্তা। কপি করো বা নিজের নামের লিংক বানিয়ে WhatsApp-এ পাঠাও।`,
      wishesH: (n) => `${n}-এর বার্তা`, wishes2H: (n) => `${n} wishes in English`,
      cta: (n) => `${n}-এর সুন্দর কার্ড বানিয়ে গ্যালারিতে সেভ করো বা পাঠাও।`,
      aboutH: (n) => `${n} নিয়ে কিছু কথা`, summaryH: '', faqH: 'প্রায়ই জিজ্ঞাসিত প্রশ্ন', moreH: 'আরও শুভেচ্ছা',
    },
    share: {
      h: '✨ নিজের উইশ বানাও',
      p: (t) => `নিজের নাম লেখো — আমরা তোমার নামের লিংক বানিয়ে দেব। যাকে পাঠাবে, সে পাতার একদম ওপরে দেখবে: "<b>তোমার নাম</b>-এর পক্ষ থেকে ${t}"। নাম শুধু লিংকেই থাকে, কোথাও সেভ হয় না।`,
      ph: 'তোমার নাম, যেমন: Rahul', wa: '📲 WhatsApp-এ পাঠাও', copy: '🔗 লিংক কপি', copied: '✅ কপি হয়েছে', needName: 'আগে নিজের নাম লেখো',
      banner: '{from}-এর পক্ষ থেকে {greet}!', withName: 'নিজের নামে পাঠাও', withoutName: 'তুমিও পাঠাও', copyPrompt: 'এই লিংকটা কপি করো',
    },
    copy: 'কপি', copied: 'কপি হয়েছে ✓',
    card: {
      title: 'উইশ কার্ড মেকার — নিজের নামে শুভেচ্ছা কার্ড বানাও | NextGrade',
      desc: 'ফ্রি উইশ কার্ড মেকার: উপলক্ষ বা উৎসব বেছে নাও, নাম লেখো, বার্তা বাছো আর সুন্দর কার্ড ডাউনলোড করো বা WhatsApp-এ শেয়ার করো। কোনো সাইন-আপ নেই।',
      lead: 'উৎসব বেছে নাও, নাম লেখো আর কয়েক সেকেন্ডেই নিজের শুভেচ্ছা কার্ড বানাও। কার্ড তোমার ফোন/কম্পিউটারেই তৈরি হয় — তোমার নাম বা বার্তা কোথাও সেভ বা পাঠানো হয় না।',
      occasion: 'উপলক্ষ / উৎসব', to: 'কার জন্য (নাম)', toPh: 'যেমন: মা-বাবা, Rahul', from: 'তোমার নাম', fromPh: 'যেমন: Nazim', message: 'বার্তা', custom: 'অথবা নিজের বার্তা লেখো', customPh: 'খালি রাখলে ওপরের বার্তাটাই বসবে',
      share: '📤 শেয়ার', download: '⬇️ ডাউনলোড', preview: 'শুভেচ্ছা কার্ডের প্রিভিউ',
      howH: 'কীভাবে ব্যবহার করবে',
      how: ['ওপর থেকে উপলক্ষ বা উৎসব বেছে নাও — কার্ডের রং আর বার্তা সেই অনুযায়ী বদলে যাবে।', 'যে পাবে তার নাম আর নিজের নাম লেখো (চাইলে খালিও রাখতে পারো)।', 'তৈরি বার্তা থেকে বাছো বা নিজের বার্তা লেখো।', '<b>শেয়ার</b> চেপে সরাসরি WhatsApp/Instagram-এ পাঠাও, বা <b>ডাউনলোড</b> করে গ্যালারিতে সেভ করো।'],
      dear: 'প্রিয় {to},', downloaded: 'কার্ড ডাউনলোড হয়েছে।', cantShare: 'এই ব্রাউজার থেকে সরাসরি শেয়ার হয় না — ডাউনলোড করে পাঠাও।',
    },
    games: {
      title: 'উৎসবের ফ্রি গেম | NextGrade',
      desc: 'উৎসব নিয়ে তৈরি ছোট, ফ্রি ব্রাউজার গেম — ফোনে খেলো, ইনস্টল করো আর বন্ধুদের WhatsApp-এ স্কোরের চ্যালেঞ্জ পাঠাও। কোনো সাইন-আপ নেই।',
      h1: '🎮 উৎসবের গেম',
      lead: 'প্রতিটি উৎসবে একটা ছোট, মজার গেম — ফোনের ব্রাউজারেই খেলো, স্কোর করো আর WhatsApp-এ বন্ধুদের চ্যালেঞ্জ পাঠাও। গেমগুলো তোমার ফোনেই চলে; আমরা কোনো অ্যাকাউন্ট বা ব্যক্তিগত তথ্য নিই না।',
      soonH: 'শিগগিরই আসছে', soonP: 'নববর্ষের আতশবাজি, দীপাবলির প্রদীপ জ্বালানো, হোলির রং আর ঈদের ঈদি গেম। 🎆🪔🎨🌙', tag: (t) => `${t} গেম`,
    },
    apps: {
      title: 'ফ্রি অ্যাপ ও টুল | NextGrade',
      desc: 'NextGrade-এর ফ্রি ওয়েব অ্যাপ — হিসাব কিতাব (খরচ আর ধার-দেনার হিসাব) আর উইশ কার্ড মেকার। ফোনে ইনস্টল হয়, সাইন-আপ ছাড়াই চলে।',
      h1: 'ফ্রি অ্যাপ ও টুল',
      lead: 'ছোট, হালকা আর ফ্রি ওয়েব অ্যাপ, যেগুলো ফোনে অ্যাপের মতোই ইনস্টল হয়। বেশিরভাগ অ্যাপ তোমার ডেটা তোমার ফোনেই রাখে।',
      installH: 'কীভাবে ইনস্টল করবে',
      installP: 'অ্যান্ড্রয়েডে Chrome-এ অ্যাপটি খোলো আর মেনু (⋮) থেকে <b>Install app / Add to Home screen</b> বেছে নাও। iPhone-এ Safari-তে Share চেপে <b>Add to Home Screen</b> বেছে নাও।',
    },
    about: {
      title: 'আমাদের কথা', desc: 'NextGrade সম্পর্কে — আমরা কারা, কেন এই সাইট বানিয়েছি আর আমাদের তথ্য কোথা থেকে আসে।',
      html: (contact) => `<p class="lead">NextGrade (nextgrade.in) ভারতে তৈরি একটি ছোট, স্বাধীন ওয়েবসাইট।</p>
<h2>আমরা কী করি</h2>
<p>আমরা তিন রকমের জিনিস বানাই: <b>উৎসব নিয়ে সহজ ও নির্ভরযোগ্য লেখা</b> — গল্প, তাৎপর্য, রীতিনীতি, খাবার আর শুভেচ্ছা; <b>উৎসবের ছোট গেম</b>; আর <b>ফ্রি ওয়েব অ্যাপ</b>, যেমন খরচ আর ধার-দেনার হিসাব রাখার হিসাব কিতাব আর উইশ কার্ড মেকার। সাইটটি হিন্দি, ইংরেজি, হিংলিশ আর বাংলায় পাওয়া যায়।</p>
<h2>আমাদের তথ্য</h2>
<p>উৎসবের পাতাগুলো প্রচলিত রীতিনীতি, ধর্মগ্রন্থের জনপ্রিয় কাহিনি আর সর্বজনীন সূত্রের ওপর ভিত্তি করে লেখা। যে উৎসবের তারিখ তিথি অনুযায়ী ঠিক হয়, সেখানে আমরা মাস আর তিথি লিখি, কারণ ইংরেজি তারিখ প্রতি বছর বদলায়। কোনো ভুল চোখে পড়লে <a href="${contact}">আমাদের জানাও</a> — আমরা তাড়াতাড়ি ঠিক করে দেব।</p>
<h2>আমাদের অ্যাপ আর তোমার ডেটা</h2>
<p>আমরা কোনো সার্ভার বা ডেটাবেসে তোমার তথ্য রাখি না। অ্যাপগুলো তোমার ডেটা তোমার নিজের ডিভাইসেই রাখে, আর উইশ কার্ড মেকার তোমার নাম বা বার্তা কোথাও পাঠায় না — কার্ড তোমার ব্রাউজারেই তৈরি হয়।</p>`,
    },
    contact: {
      title: 'যোগাযোগ', desc: 'NextGrade-এর সঙ্গে যোগাযোগ — পরামর্শ, ভুলের খবর বা অ্যাপ নিয়ে প্রশ্ন।',
      html: (email) => `<p class="lead">পরামর্শ, কোনো পাতায় ভুল, বা কোনো অ্যাপ নিয়ে প্রশ্ন — আমাদের ইমেল করো।</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>আমরা সাধারণত ২-৩ কাজের দিনের মধ্যে উত্তর দিই। ইমেলে কখনো পাসওয়ার্ড, OTP বা ব্যাংকের তথ্য পাঠিও না।</p>`,
    },
  },
};

export { ui };
