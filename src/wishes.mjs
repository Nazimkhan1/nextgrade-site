/**
 * All-year wishes: occasions people send every day or every week.
 * Each entry becomes /wishes/<slug>/ and a choice in the Wish Card Maker.
 * `greetHi` / `greetEn` finish the sentence "<name> ki taraf se aapko …".
 */
const wishes = [
  {
    slug: 'good-morning',
    emoji: '🌅',
    nameHi: 'गुड मॉर्निंग',
    nameEn: 'Good Morning',
    greetHi: 'गुड मॉर्निंग',
    greetEn: 'Good Morning',
    colors: ['#f59f00', '#e8590c'],
    introHi:
      'सुबह का एक छोटा-सा संदेश किसी का पूरा दिन अच्छा बना सकता है। यहाँ गुड मॉर्निंग के छोटे, सादे और दिल से लिखे संदेश हैं — परिवार, दोस्तों और ऑफ़िस ग्रुप के लिए।',
    aboutHi: [
      'भारत में सुबह-सुबह "गुड मॉर्निंग" भेजना अब रोज़ की आदत बन गई है। माता-पिता बच्चों को, दोस्त दोस्तों को और रिश्तेदार परिवार के ग्रुप में दिन की शुरुआत एक मीठे संदेश से करते हैं। इससे दूर रहकर भी अपनापन बना रहता है।',
      'अच्छा गुड मॉर्निंग संदेश छोटा होता है, उसमें कोई अच्छी बात या दुआ होती है, और वह पढ़ने वाले को मुस्कुराने की वजह देता है। लंबे फ़ॉरवर्ड या अनजान दावों वाले मैसेज भेजने से बचें — अपना छोटा-सा संदेश ज़्यादा असर करता है।',
      'एक छोटा सुझाव: रोज़ एक ही संदेश भेजने के बजाय कभी-कभी सामने वाले का नाम लेकर लिखें, या उनके किसी काम/परीक्षा/सफ़र के लिए शुभकामना दें। नीचे दिए "अपना विश बनाएं" बटन से आप अपने नाम के साथ लिंक भी भेज सकते हैं।',
    ],
    aboutEn:
      'A short good-morning message can set the tone for someone\'s whole day. Keep it short, add a kind thought or a prayer, and use the person\'s name now and then. Below are simple Hindi and English good-morning wishes you can copy, or share with your own name using the "Make your wish" button.',
    wishesHi: [
      'सुप्रभात! आज का दिन आपके लिए नई उम्मीदें और ढेर सारी खुशियाँ लेकर आए।',
      'गुड मॉर्निंग! चाय की पहली चुस्की जैसी ताज़गी आपके पूरे दिन में बनी रहे।',
      'हर सुबह एक नया मौका है — आज कुछ अच्छा कीजिए, कुछ अच्छा सोचिए। सुप्रभात!',
      'सूरज की पहली किरण आपके घर में सुख और शांति लाए। गुड मॉर्निंग!',
      'मुस्कुराकर दिन की शुरुआत कीजिए, बाकी सब अपने आप अच्छा हो जाएगा। सुप्रभात!',
      'कल जो हुआ उसे जाने दीजिए, आज का दिन आपका है। गुड मॉर्निंग!',
      'आपकी सेहत अच्छी रहे, काम में मन लगे और शाम तक मन खुश रहे। सुप्रभात!',
      'गुड मॉर्निंग! भगवान आपके हर अच्छे काम में साथ दें।',
      'छोटी-छोटी खुशियाँ ही बड़ी ज़िंदगी बनाती हैं — आज उन्हें गिनना मत भूलिए। सुप्रभात!',
      'एक प्याली चाय, एक मीठी मुस्कान और आप — शुभ प्रभात!',
    ],
    wishesEn: [
      'Good morning! May today bring you calm, good news and a reason to smile.',
      'Rise and shine — a fresh day, a fresh start. Have a wonderful morning!',
      'Sending you a cup of positivity with your morning tea. Good morning!',
      'Good morning! Take it one step at a time today; you have got this.',
      'May your day be as bright as this morning sun. Good morning!',
    ],
    faq: [
      { q: 'गुड मॉर्निंग किस समय भेजना चाहिए?', a: 'आम तौर पर सुबह 6 से 10 बजे के बीच। ऑफ़िस या बड़े ग्रुप में बहुत जल्दी (सुबह 5 बजे से पहले) संदेश भेजने से बचें, ताकि किसी की नींद न टूटे।' },
      { q: 'सुप्रभात और शुभ प्रभात में क्या फ़र्क है?', a: 'दोनों का मतलब "अच्छी सुबह" है। सुप्रभात ज़्यादा प्रचलित है, शुभ प्रभात थोड़ा औपचारिक लगता है।' },
    ],
  },
  {
    slug: 'birthday',
    emoji: '🎂',
    nameHi: 'जन्मदिन',
    nameEn: 'Birthday',
    greetHi: 'जन्मदिन की ढेर सारी शुभकामनाएँ',
    greetEn: 'Happy Birthday',
    colors: ['#d6336c', '#7048e8'],
    introHi:
      'किसी का जन्मदिन याद रखना और उन्हें दिल से शुभकामना देना — यही सबसे अच्छा तोहफ़ा है। यहाँ माँ-पापा, भाई-बहन, दोस्त, पति-पत्नी और सहकर्मियों के लिए जन्मदिन के संदेश हैं।',
    aboutHi: [
      'जन्मदिन हर इंसान के लिए साल का सबसे खास दिन होता है। इस दिन मिला एक छोटा-सा संदेश भी याद रह जाता है, खासकर अगर उसमें उनका नाम हो और कोई ऐसी बात हो जो सिर्फ आप दोनों जानते हों।',
      'संदेश लिखते समय रिश्ते का ध्यान रखें — माता-पिता के लिए आदर और दुआ, दोस्तों के लिए थोड़ी मस्ती, सहकर्मियों के लिए सादा और विनम्र। रात 12 बजे भेजा गया पहला संदेश हमेशा खास लगता है!',
      'नीचे दिए संदेश कॉपी करें, या "अपना विश बनाएं" से अपने नाम का लिंक बनाकर भेजें। Wish Card Maker से जन्मदिन का कार्ड भी बना सकते हैं।',
    ],
    aboutEn:
      'A birthday message means the most when it has the person\'s name and something personal in it. Match the tone to the relationship: respect and blessings for parents, fun for friends, simple and warm for colleagues. Copy a wish below or share one with your name.',
    wishesHi: [
      'जन्मदिन मुबारक हो! आपकी ज़िंदगी में हर दिन खुशियों से भरा रहे।',
      'भगवान आपको लंबी उम्र, अच्छी सेहत और ढेर सारी कामयाबी दें। हैप्पी बर्थडे!',
      'केक मीठा हो, दोस्त प्यारे हों और आने वाला साल आपका सबसे अच्छा साल हो। जन्मदिन की बधाई!',
      'माँ, आप हमारी दुनिया हैं। आपको जन्मदिन की बहुत-बहुत शुभकामनाएँ!',
      'पापा, आपकी हर सीख हमारे साथ है। जन्मदिन मुबारक, आप हमेशा स्वस्थ रहें!',
      'भाई, लड़ाई भी तुमसे और प्यार भी तुमसे — हैप्पी बर्थडे!',
      'बहना, तुम्हारी हँसी घर की रौनक है। जन्मदिन की ढेर सारी शुभकामनाएँ!',
      'दोस्त, एक साल और बड़े हो गए, पर दिल अभी भी बच्चों जैसा रखना। हैप्पी बर्थडे!',
      'आपके सारे सपने पूरे हों और हर मुश्किल आसान हो जाए। जन्मदिन मुबारक!',
      'आज का दिन सिर्फ आपके नाम — खूब मुस्कुराइए! हैप्पी बर्थडे।',
    ],
    wishesEn: [
      'Happy Birthday! Wishing you a year full of health, laughter and good news.',
      'May all your wishes come true today and every day after. Happy Birthday!',
      'Cheers to you and to another amazing year ahead. Happy Birthday!',
      'Happy Birthday to someone who makes every day better. Have a great one!',
      'Wishing you cake, calm and everything you hope for this year. Happy Birthday!',
    ],
    faq: [
      { q: 'जन्मदिन की शुभकामना कब भेजें?', a: 'करीबी लोगों को रात 12 बजे या सुबह जल्दी, बाकी लोगों को दिन में किसी भी समय। देर हो जाए तो भी "Belated Happy Birthday" भेजना अच्छा लगता है।' },
      { q: 'हिंदी में Happy Birthday कैसे लिखें?', a: '"जन्मदिन मुबारक हो" या "जन्मदिन की हार्दिक शुभकामनाएँ" — दोनों सही और प्रचलित हैं।' },
    ],
  },
  {
    slug: 'anniversary',
    emoji: '💞',
    nameHi: 'शादी की सालगिरह',
    nameEn: 'Anniversary',
    greetHi: 'शादी की सालगिरह की हार्दिक शुभकामनाएँ',
    greetEn: 'Happy Anniversary',
    colors: ['#c2255c', '#f08c00'],
    introHi:
      'शादी की सालगिरह साथ बिताए सालों का जश्न है। यहाँ जीवनसाथी, माता-पिता, भाई-भाभी और दोस्तों के लिए सालगिरह की शुभकामनाएँ हैं।',
    aboutHi: [
      'सालगिरह पर सबसे अच्छा संदेश वह होता है जिसमें साथ बिताए पलों की याद हो और आने वाले सालों के लिए दुआ। जीवनसाथी के लिए दिल की बात लिखें, और माता-पिता या रिश्तेदारों के लिए आदर और आशीर्वाद वाले शब्द चुनें।',
      'माता-पिता की 25वीं (सिल्वर जुबली) या 50वीं (गोल्डन जुबली) सालगिरह पर परिवार अक्सर छोटा-सा कार्यक्रम रखता है — ऐसे मौके पर पुरानी तस्वीरों के साथ कार्ड बनाना बहुत पसंद किया जाता है।',
    ],
    aboutEn:
      'An anniversary wish works best when it remembers the years together and blesses the years ahead. Write from the heart for your partner, and choose words of respect and blessing for parents and relatives, especially on a 25th or 50th anniversary.',
    wishesHi: [
      'शादी की सालगिरह मुबारक हो! आपकी जोड़ी हमेशा यूँ ही सलामत रहे।',
      'साथ बिताया हर साल आपके प्यार को और गहरा करे। हैप्पी एनिवर्सरी!',
      'मम्मी-पापा, आपका साथ हमारे लिए सबसे बड़ी सीख है। सालगिरह की ढेर सारी बधाई!',
      'भगवान आपकी जोड़ी को हर खुशी और लंबी उम्र दें। शादी की सालगिरह की शुभकामनाएँ!',
      'तुम्हारे साथ हर दिन त्योहार जैसा है। हैप्पी एनिवर्सरी, मेरे हमसफ़र!',
      'प्यार, भरोसा और साथ — यही आपकी जोड़ी की पहचान है। सालगिरह मुबारक!',
      'भैया-भाभी, आपकी जोड़ी पर सबकी नज़र न लगे! हैप्पी एनिवर्सरी।',
      'एक-दूसरे का हाथ यूँ ही थामे रहिए। शादी की सालगिरह की हार्दिक बधाई!',
    ],
    wishesEn: [
      'Happy Anniversary! May your love grow stronger with every passing year.',
      'To a couple who makes love look easy — Happy Anniversary!',
      'Wishing you both a lifetime of laughter, trust and togetherness. Happy Anniversary!',
      'Happy Anniversary, Mom and Dad. Thank you for showing us what love means.',
    ],
    faq: [
      { q: '25वीं और 50वीं सालगिरह को क्या कहते हैं?', a: '25वीं सालगिरह को सिल्वर जुबली (रजत जयंती) और 50वीं को गोल्डन जुबली (स्वर्ण जयंती) कहते हैं।' },
      { q: 'सालगिरह और वर्षगाँठ में क्या फ़र्क है?', a: 'दोनों का मतलब एक ही है — किसी खास दिन का हर साल लौटकर आना। आम बोलचाल में शादी के लिए "सालगिरह" ज़्यादा कहा जाता है।' },
    ],
  },
  {
    slug: 'jumma-mubarak',
    emoji: '🕌',
    nameHi: 'जुम्मा मुबारक',
    nameEn: 'Jumma Mubarak',
    greetHi: 'जुम्मा मुबारक',
    greetEn: 'Jumma Mubarak',
    colors: ['#087f5b', '#1864ab'],
    introHi:
      'जुम्मा (शुक्रवार) इस्लाम में हफ़्ते का सबसे मुबारक दिन माना जाता है। इस दिन दोपहर में मस्जिदों में जुमे की नमाज़ होती है और लोग एक-दूसरे को "जुम्मा मुबारक" कहकर दुआएँ देते हैं।',
    aboutHi: [
      'शुक्रवार को दोपहर की नमाज़ (ज़ुहर) की जगह जमात के साथ जुमे की नमाज़ अदा की जाती है, जिससे पहले इमाम ख़ुतबा (प्रवचन) देते हैं। क़ुरआन की सूरह अल-जुमुआ में इस नमाज़ का ज़िक्र है।',
      'इस दिन ग़ुस्ल करना, साफ़ कपड़े पहनना, ख़ुशबू लगाना, जल्दी मस्जिद जाना, दुरूद शरीफ़ पढ़ना और सूरह अल-कहफ़ की तिलावत करना अच्छा माना जाता है। बहुत से लोग इस दिन ख़ैरात (दान) भी करते हैं।',
      '"जुम्मा मुबारक" कहना एक प्यारी परंपरा है जिससे भाईचारा बढ़ता है। संदेश भेजते समय अदब और सादगी का ध्यान रखें।',
    ],
    aboutEn:
      'Friday (Jumu\'ah) is the most blessed day of the week in Islam. The Friday congregational prayer at midday, preceded by a sermon (khutbah), takes the place of the Zuhr prayer. Taking a bath, wearing clean clothes, reciting Surah Al-Kahf, sending durood and giving charity are recommended. "Jumma Mubarak" is a warm greeting shared among friends and family.',
    wishesHi: [
      'जुम्मा मुबारक! अल्लाह आपकी हर दुआ क़ुबूल करे और घर में बरकत दे।',
      'इस मुबारक दिन अल्लाह आपको सेहत, सुकून और हिदायत अता करे। जुम्मा मुबारक!',
      'जुमे की इस पाक घड़ी में हमें भी अपनी दुआओं में याद रखिएगा। जुम्मा मुबारक!',
      'अल्लाह आपके गुनाह माफ़ करे और नेक रास्ते पर चलाए। आमीन। जुम्मा मुबारक!',
      'जुमे का दिन रहमतों का दिन है — आपके घर पर रहमतें बरसती रहें। जुम्मा मुबारक!',
      'नमाज़ की पाबंदी, दिल में सुकून और लबों पर शुक्र — जुम्मा मुबारक!',
      'अल्लाह आपकी परेशानियाँ दूर करे और आसानियाँ अता करे। जुम्मा मुबारक!',
      'इस जुमे आपकी हर नेक ख़्वाहिश पूरी हो। जुम्मा मुबारक!',
    ],
    wishesEn: [
      'Jumma Mubarak! May Allah accept your prayers and fill your home with barakah.',
      'May this blessed Friday bring you peace, health and guidance. Jumma Mubarak!',
      'Remember us in your duas today. Jumma Mubarak!',
      'May Allah make things easy for you and your family. Jumma Mubarak!',
    ],
    faq: [
      { q: 'जुमे की नमाज़ कब होती है?', a: 'शुक्रवार को दोपहर में, ज़ुहर के वक़्त। हर मस्जिद का सही वक़्त अलग हो सकता है, इसलिए अपनी नज़दीकी मस्जिद से पता करें।' },
      { q: 'जुमे के दिन सूरह अल-कहफ़ क्यों पढ़ते हैं?', a: 'हदीसों में जुमे के दिन सूरह अल-कहफ़ पढ़ने की फ़ज़ीलत बताई गई है, इसलिए बहुत से लोग इस दिन इसकी तिलावत करते हैं।' },
    ],
  },
];

export { wishes };
