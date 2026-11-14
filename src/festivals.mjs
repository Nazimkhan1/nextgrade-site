/**
 * Festival guides. Each entry becomes /festivals/<slug>/ and a choice in the
 * Wish Card Maker. Dates: fixed-date festivals give the date; lunar ones give
 * the month and tithi only (the calendar date changes every year).
 * `month` (1-12, approximate) orders the "upcoming" list on the home page.
 */
const festivals = [
  {
    slug: 'christmas',
    emoji: '🎄',
    nameHi: 'क्रिसमस',
    nameEn: 'Christmas',
    month: 12,
    whenHi: 'हर साल 25 दिसंबर',
    whenEn: '25 December every year',
    whereHi: 'पूरी दुनिया में; भारत में गोवा, केरल, पूर्वोत्तर और बड़े शहरों में खास धूम',
    colors: ['#0b6e4f', '#c1121f'],
    introHi:
      'क्रिसमस ईसा मसीह (यीशु) के जन्म की खुशी में मनाया जाने वाला त्योहार है। आज यह सिर्फ ईसाई समुदाय का नहीं, बल्कि हर उस इंसान का त्योहार बन गया है जो प्यार, बाँटने और नए साल की उम्मीद में विश्वास रखता है।',
    sections: [
      {
        h: 'क्रिसमस क्यों मनाते हैं',
        p: [
          'ईसाई मान्यता के अनुसार यीशु का जन्म बेथलहम में एक साधारण गौशाला में हुआ था। उनका संदेश था — एक-दूसरे से प्रेम करो, ज़रूरतमंद की मदद करो और माफ़ करना सीखो। क्रिसमस इसी संदेश को याद करने का दिन है।',
          '25 दिसंबर की तारीख चौथी सदी से रोम में मनाई जाने लगी और धीरे-धीरे पूरी दुनिया में यही तारीख अपनाई गई।',
        ],
      },
      {
        h: 'कैसे मनाते हैं',
        p: [
          '24 दिसंबर की रात "क्रिसमस ईव" होती है। चर्चों में आधी रात की प्रार्थना (मिडनाइट मास) होती है और कैरल (क्रिसमस के गीत) गाए जाते हैं।',
          'घरों में क्रिसमस ट्री सजाया जाता है — उस पर तारे, घंटियाँ, रंगीन बत्तियाँ और छोटे तोहफ़े लटकाए जाते हैं। बच्चों के लिए सांता क्लॉज़ तोहफ़े लाते हैं, यह कहानी हर बच्चे की पसंदीदा है।',
          'भारत में प्लम केक, कुकीज़ और गोवा-केरल में खास पकवान बनते हैं। लोग एक-दूसरे के घर मिठाई और केक भेजते हैं।',
        ],
      },
      {
        h: 'इस क्रिसमस कुछ अच्छा करें',
        p: [
          'किसी अनाथालय या वृद्धाश्रम में थोड़ा समय बिताएँ, पुराने गर्म कपड़े ज़रूरतमंदों को दें, या किसी अकेले पड़ोसी को केक दे आएँ। क्रिसमस का असली मतलब यही है।',
        ],
      },
    ],
    enSummary: [
      'Christmas celebrates the birth of Jesus Christ and his message of love, kindness and forgiveness. It falls on 25 December. Celebrations begin on Christmas Eve with midnight mass and carols, homes put up a Christmas tree, and children wait for Santa Claus. In India, Goa, Kerala and the North-East celebrate in a big way, and plum cake is shared across communities.',
    ],
    wishesHi: [
      'क्रिसमस का यह पावन दिन आपके घर में खुशियों की रोशनी और दिल में सुकून लेकर आए। मेरी क्रिसमस!',
      'सांता आपकी हर छोटी-बड़ी ख्वाहिश पूरी करे और आपका आने वाला साल प्यार से भरा रहे। मेरी क्रिसमस!',
      'केक की मिठास, कैरल की धुन और अपनों का साथ — यही है क्रिसमस। आपको और आपके परिवार को ढेर सारी शुभकामनाएँ।',
      'यीशु का प्रेम और करुणा का संदेश हमेशा आपके साथ रहे। क्रिसमस की हार्दिक बधाई!',
      'क्रिसमस ट्री की रोशनी जैसी चमक आपकी ज़िंदगी में हमेशा बनी रहे। मेरी क्रिसमस!',
    ],
    wishesEn: [
      'Wishing you a Christmas full of warmth, laughter and the people you love. Merry Christmas!',
      'May the joy of this season stay with you all through the new year. Merry Christmas and happy holidays!',
      'Peace in your heart, cake on your plate and family by your side — have a wonderful Christmas!',
      'May Santa bring you everything you wished for, and a little more. Merry Christmas!',
    ],
    faq: [
      { q: 'क्रिसमस किस तारीख को आता है?', a: 'क्रिसमस हर साल 25 दिसंबर को मनाया जाता है। 24 दिसंबर की शाम "क्रिसमस ईव" कहलाती है।' },
      { q: 'क्रिसमस ट्री क्यों सजाते हैं?', a: 'सदाबहार पेड़ सर्दियों में भी हरा रहता है, इसलिए इसे जीवन और उम्मीद का प्रतीक माना जाता है। सजा हुआ पेड़ घर में खुशी और रौनक लाता है।' },
      { q: 'भारत में क्रिसमस कहाँ सबसे ज़्यादा मनाया जाता है?', a: 'गोवा, केरल, मिज़ोरम, नागालैंड, मेघालय और मुंबई, कोलकाता, बेंगलुरु जैसे शहरों में।' },
    ],
  },
  {
    slug: 'new-year',
    emoji: '🎆',
    nameHi: 'नया साल',
    nameEn: 'New Year',
    month: 1,
    whenHi: 'हर साल 1 जनवरी (31 दिसंबर की रात से जश्न)',
    whenEn: '1 January (celebrations start on the night of 31 December)',
    whereHi: 'पूरी दुनिया',
    colors: ['#1d3557', '#e63946'],
    introHi:
      'नया साल ग्रेगोरियन कैलेंडर के पहले दिन, 1 जनवरी को मनाया जाता है। यह बीते साल को धन्यवाद कहने और आने वाले साल के लिए नए इरादे बनाने का दिन है।',
    sections: [
      {
        h: 'नए साल का जश्न',
        p: [
          '31 दिसंबर की रात लोग परिवार और दोस्तों के साथ इकट्ठा होते हैं और ठीक आधी रात को उल्टी गिनती के साथ नए साल का स्वागत करते हैं। आतिशबाज़ी, संगीत और "हैप्पी न्यू ईयर" के संदेश इस रात की पहचान हैं।',
          'भारत में कई लोग साल के पहले दिन मंदिर, गुरुद्वारे, मस्जिद या चर्च जाकर नए साल की शुरुआत करते हैं।',
        ],
      },
      {
        h: 'नए साल के संकल्प (Resolutions)',
        p: [
          'नया साल अपने लिए छोटे-छोटे लक्ष्य तय करने का अच्छा मौका है — रोज़ टहलना, हर महीने कुछ पैसे बचाना, कोई नई भाषा या हुनर सीखना। संकल्प छोटे और साफ़ रखें, तो निभाना आसान होता है।',
          'खर्च पर नज़र रखना भी एक अच्छा संकल्प है — इसके लिए हमारा मुफ़्त ऐप हिसाब किताब इस्तेमाल कर सकते हैं।',
        ],
      },
      {
        h: 'भारत के दूसरे नव वर्ष',
        p: [
          'भारत में कई क्षेत्रीय नव वर्ष भी मनाए जाते हैं — जैसे चैत्र शुक्ल प्रतिपदा (हिंदू नव संवत्सर), गुड़ी पड़वा, उगादी, बैसाखी, पोहेला बोइशाख, पुथांडु और विशु। ये ज़्यादातर मार्च-अप्रैल में आते हैं।',
        ],
      },
    ],
    enSummary: [
      'New Year is celebrated on 1 January, the first day of the Gregorian calendar. People count down to midnight on 31 December with family and friends, fireworks and music. It is also a day to make small, clear resolutions for the year ahead. India also celebrates many regional new years, such as Gudi Padwa, Ugadi, Baisakhi and Puthandu, mostly in March and April.',
    ],
    wishesHi: [
      'नया साल आपके लिए नई उम्मीदें, नई कामयाबी और ढेर सारी खुशियाँ लेकर आए। नव वर्ष की हार्दिक शुभकामनाएँ!',
      'बीते साल की यादें मीठी रहें और आने वाला साल उससे भी बेहतर हो। हैप्पी न्यू ईयर!',
      'हर दिन नया मौका है, और यह साल ऐसे 365 मौके लेकर आया है। आपको नया साल मुबारक!',
      'आपके घर में सेहत, सुकून और समृद्धि बनी रहे। नए साल की बहुत-बहुत बधाई!',
      'पुराने गिले-शिकवे भूलकर नए साल में नई शुरुआत करें। हैप्पी न्यू ईयर!',
    ],
    wishesEn: [
      'Happy New Year! May the year ahead bring good health, new wins and many happy moments.',
      'Here is to new beginnings, kind people and dreams that come true. Happy New Year!',
      'Thank you for being part of my year. Wishing you a wonderful one ahead!',
      'New year, new chances. May every one of them work out for you. Happy New Year!',
    ],
    faq: [
      { q: 'नया साल 1 जनवरी को ही क्यों मनाते हैं?', a: 'आज दुनिया भर में ग्रेगोरियन कैलेंडर चलता है, जिसका पहला दिन 1 जनवरी है। इसलिए अंतरराष्ट्रीय नया साल इसी दिन मनाया जाता है।' },
      { q: 'हिंदू नव वर्ष कब होता है?', a: 'हिंदू नव संवत्सर चैत्र मास के शुक्ल पक्ष की प्रतिपदा को शुरू होता है, जो आमतौर पर मार्च या अप्रैल में पड़ती है।' },
    ],
  },
  {
    slug: 'lohri',
    emoji: '🔥',
    nameHi: 'लोहड़ी',
    nameEn: 'Lohri',
    month: 1,
    whenHi: 'आमतौर पर 13 जनवरी (मकर संक्रांति से एक दिन पहले)',
    whenEn: 'Usually 13 January, the evening before Makar Sankranti',
    whereHi: 'पंजाब, हरियाणा, हिमाचल प्रदेश, जम्मू और दिल्ली',
    colors: ['#e85d04', '#6a040f'],
    introHi:
      'लोहड़ी सर्दियों की विदाई और नई फसल की खुशी का त्योहार है। इस रात लोग आग (अलाव) के चारों ओर इकट्ठा होकर गीत गाते हैं, भांगड़ा-गिद्धा करते हैं और तिल, गुड़, रेवड़ी, मूंगफली और पॉपकॉर्न आग में अर्पित करते हैं।',
    sections: [
      {
        h: 'लोहड़ी का महत्व',
        p: [
          'लोहड़ी के आसपास सबसे लंबी सर्द रातें खत्म होने लगती हैं और दिन बड़े होने लगते हैं। किसानों के लिए यह रबी की फसल (खासकर गन्ने) की खुशी का समय है।',
          'जिस घर में नई शादी हुई हो या बच्चे का जन्म हुआ हो, वहाँ पहली लोहड़ी बहुत धूमधाम से मनाई जाती है।',
        ],
      },
      {
        h: 'दुल्ला भट्टी की कहानी',
        p: [
          'लोहड़ी के गीतों में "सुंदर मुंदरिए हो, तेरा कौन विचारा, दुल्ला भट्टी वाला" ज़रूर गाया जाता है। लोककथा के अनुसार दुल्ला भट्टी मुग़ल काल का एक बहादुर पंजाबी था, जिसने गरीब लड़कियों को बचाया और उनकी शादी करवाई। इसलिए उसे लोहड़ी पर याद किया जाता है।',
        ],
      },
      {
        h: 'लोहड़ी पर क्या खाते हैं',
        p: [
          'तिल और गुड़ की रेवड़ी, गजक, मूंगफली, भुने मक्के के दाने (पॉपकॉर्न), और खाने में सरसों का साग और मक्की की रोटी।',
        ],
      },
    ],
    enSummary: [
      'Lohri is a Punjabi harvest festival celebrated on the night before Makar Sankranti, usually 13 January. Families gather around a bonfire, sing folk songs about Dulla Bhatti, dance bhangra and giddha, and offer sesame, jaggery, rewri, peanuts and popcorn to the fire. A family\'s first Lohri after a wedding or a baby\'s birth is celebrated in a big way.',
    ],
    wishesHi: [
      'लोहड़ी की आग में सारे दुख जल जाएँ और ज़िंदगी में गुड़ जैसी मिठास आए। लोहड़ी दी लख-लख बधाइयाँ!',
      'रेवड़ी, गजक, मूंगफली और अपनों का साथ — आपको और आपके परिवार को हैप्पी लोहड़ी!',
      'नई फसल की तरह आपकी खुशियाँ भी लहलहाती रहें। लोहड़ी की हार्दिक शुभकामनाएँ!',
      'अलाव की गर्माहट आपके रिश्तों में भी बनी रहे। हैप्पी लोहड़ी!',
    ],
    wishesEn: [
      'May the Lohri bonfire burn away every worry and fill your home with warmth. Happy Lohri!',
      'Rewri, gajak, bhangra and family — wishing you a joyful Lohri!',
      'Here is to a rich harvest of happiness this year. Happy Lohri!',
    ],
    faq: [
      { q: 'लोहड़ी कब मनाई जाती है?', a: 'लोहड़ी मकर संक्रांति से एक रात पहले मनाई जाती है, जो आमतौर पर 13 जनवरी होती है।' },
      { q: 'लोहड़ी में आग में क्या डालते हैं?', a: 'तिल, गुड़, रेवड़ी, मूंगफली और पॉपकॉर्न अग्नि को अर्पित किए जाते हैं और फिर प्रसाद के रूप में बाँटे जाते हैं।' },
    ],
  },
  {
    slug: 'makar-sankranti',
    emoji: '🪁',
    nameHi: 'मकर संक्रांति',
    nameEn: 'Makar Sankranti',
    month: 1,
    whenHi: 'आमतौर पर 14 जनवरी (कुछ सालों में 15 जनवरी)',
    whenEn: 'Usually 14 January (15 January in some years)',
    whereHi: 'पूरे भारत में — अलग-अलग नामों से',
    colors: ['#f59f00', '#1971c2'],
    introHi:
      'मकर संक्रांति वह दिन है जब सूर्य धनु राशि से मकर राशि में प्रवेश करता है। यह उन गिने-चुने हिंदू त्योहारों में से है जो सूर्य की गति से तय होते हैं, इसलिए इसकी तारीख लगभग हर साल एक जैसी रहती है।',
    sections: [
      {
        h: 'उत्तरायण और इसका महत्व',
        p: [
          'इस दिन से सूर्य की उत्तर दिशा की यात्रा (उत्तरायण) शुरू मानी जाती है और दिन धीरे-धीरे बड़े होने लगते हैं। इसे शुभ समय माना जाता है — लोग गंगा या पवित्र नदियों में स्नान करते हैं और तिल, गुड़, खिचड़ी, कंबल आदि का दान करते हैं।',
        ],
      },
      {
        h: 'एक त्योहार, कई नाम',
        p: [
          'गुजरात में इसे उत्तरायण कहते हैं और पूरा आसमान पतंगों से भर जाता है। तमिलनाडु में यही समय पोंगल का है, असम में माघ बिहू (भोगाली बिहू), उत्तर प्रदेश और बिहार में खिचड़ी, और महाराष्ट्र में लोग तिलगुल बाँटते हुए कहते हैं — "तिळगुळ घ्या, गोड गोड बोला" (तिल-गुड़ लो और मीठा-मीठा बोलो)।',
        ],
      },
      {
        h: 'तिल-गुड़ क्यों',
        p: [
          'सर्दियों में तिल और गुड़ शरीर को गर्मी और ताकत देते हैं। तिल-गुड़ बाँटना रिश्तों में मिठास बनाए रखने का प्रतीक भी है।',
          'पतंग उड़ाते समय चीनी मांझे से बचें — यह पक्षियों और राहगीरों के लिए जानलेवा होता है, और कई राज्यों में इस पर रोक है।',
        ],
      },
    ],
    enSummary: [
      'Makar Sankranti marks the day the sun enters Capricorn (Makara), usually 14 January. It begins Uttarayan, the sun\'s northward journey, when days start getting longer. People take a holy dip, donate sesame, jaggery and khichdi, and fly kites. The same season is Uttarayan in Gujarat, Pongal in Tamil Nadu, Magh Bihu in Assam and Khichdi in Uttar Pradesh and Bihar.',
    ],
    wishesHi: [
      'तिल-गुड़ की मिठास और पतंग की ऊँचाई जैसी आपकी कामयाबी हो। मकर संक्रांति की हार्दिक शुभकामनाएँ!',
      'सूर्य देव आपके जीवन को रोशनी और ऊर्जा से भर दें। हैप्पी मकर संक्रांति!',
      'तिलगुल घ्या, गोड गोड बोला! आपको और आपके परिवार को संक्रांति की बधाई।',
      'आसमान में उड़ती पतंग की तरह आपके सपने भी ऊँचे उड़ें। हैप्पी उत्तरायण!',
    ],
    wishesEn: [
      'May your dreams fly as high as the kites today. Happy Makar Sankranti!',
      'Sweet like til-gud, bright like the winter sun — wishing you a happy Sankranti!',
      'May the new harvest bring health and plenty to your home. Happy Makar Sankranti!',
    ],
    faq: [
      { q: 'मकर संक्रांति की तारीख लगभग एक जैसी क्यों रहती है?', a: 'क्योंकि यह चंद्रमा से नहीं, सूर्य के मकर राशि में प्रवेश से तय होती है। इसलिए यह ज़्यादातर 14 जनवरी को और कभी-कभी 15 जनवरी को पड़ती है।' },
      { q: 'संक्रांति पर क्या दान करते हैं?', a: 'तिल, गुड़, खिचड़ी (चावल-दाल), कंबल और गर्म कपड़े दान करने की परंपरा है।' },
    ],
  },
  {
    slug: 'republic-day',
    emoji: '🇮🇳',
    nameHi: 'गणतंत्र दिवस',
    nameEn: 'Republic Day',
    month: 1,
    whenHi: 'हर साल 26 जनवरी',
    whenEn: '26 January every year',
    whereHi: 'पूरा भारत — राष्ट्रीय पर्व',
    colors: ['#ff9933', '#138808'],
    introHi:
      '26 जनवरी 1950 को भारत का संविधान लागू हुआ और भारत एक संप्रभु, लोकतांत्रिक गणराज्य बना। गणतंत्र दिवस इसी ऐतिहासिक दिन की याद में मनाया जाता है।',
    sections: [
      {
        h: 'संविधान की कहानी',
        p: [
          'संविधान सभा ने लगभग तीन साल की मेहनत के बाद 26 नवंबर 1949 को संविधान अपनाया (इस दिन को अब संविधान दिवस कहते हैं)। प्रारूप समिति के अध्यक्ष डॉ. भीमराव अंबेडकर थे।',
          '26 जनवरी की तारीख इसलिए चुनी गई क्योंकि 26 जनवरी 1930 को कांग्रेस ने "पूर्ण स्वराज" का संकल्प लिया था।',
        ],
      },
      {
        h: 'कैसे मनाते हैं',
        p: [
          'नई दिल्ली में कर्तव्य पथ पर भव्य परेड होती है, जिसमें सेना की टुकड़ियाँ, राज्यों की झाँकियाँ और सांस्कृतिक कार्यक्रम दिखाए जाते हैं। इस दिन राष्ट्रपति तिरंगा फहराते हैं।',
          'स्कूलों और दफ़्तरों में झंडा फहराया जाता है, राष्ट्रगान गाया जाता है और देशभक्ति के कार्यक्रम होते हैं।',
        ],
      },
      {
        h: 'तिरंगे का सम्मान',
        p: [
          'झंडा फहराते समय केसरिया रंग ऊपर रहे, झंडा ज़मीन को न छुए और कटा-फटा न हो। कार्यक्रम के बाद काग़ज़ के झंडे सड़क पर न फेंकें, उन्हें सम्मान से संभाल कर रखें।',
        ],
      },
    ],
    enSummary: [
      'Republic Day, 26 January, marks the day in 1950 when the Constitution of India came into force and India became a republic. The Constitution was adopted on 26 November 1949; Dr B. R. Ambedkar chaired its drafting committee. The President hoists the flag and a grand parade takes place on Kartavya Path in New Delhi, with tableaux from the states.',
    ],
    wishesHi: [
      'आइए, अपने संविधान और तिरंगे पर गर्व करें। गणतंत्र दिवस की हार्दिक शुभकामनाएँ! जय हिंद!',
      'आज़ादी हमें विरासत में मिली, संविधान ने उसे दिशा दी। गणतंत्र दिवस की बधाई!',
      'देश के लिए जीने का संकल्प लें — ईमानदारी, एकता और भाईचारे के साथ। हैप्पी रिपब्लिक डे!',
      'तीन रंगों में बसी है हमारी पहचान। गणतंत्र दिवस मुबारक! जय हिंद, जय भारत।',
    ],
    wishesEn: [
      'Proud of our Constitution, proud of our tricolour. Happy Republic Day! Jai Hind!',
      'Let us honour the rights we enjoy by doing our duties too. Happy Republic Day!',
      'Unity in diversity is our strength. Wishing you a happy Republic Day!',
    ],
    faq: [
      { q: 'गणतंत्र दिवस और स्वतंत्रता दिवस में क्या फ़र्क है?', a: 'स्वतंत्रता दिवस (15 अगस्त) 1947 में अंग्रेज़ी शासन से आज़ादी का दिन है। गणतंत्र दिवस (26 जनवरी) 1950 में संविधान लागू होने का दिन है।' },
      { q: '26 जनवरी को झंडा कौन फहराता है?', a: 'गणतंत्र दिवस पर देश के राष्ट्रपति तिरंगा फहराते हैं; स्वतंत्रता दिवस पर प्रधानमंत्री लाल किले से झंडा फहराते हैं।' },
    ],
  },
  {
    slug: 'vasant-panchami',
    emoji: '🌼',
    nameHi: 'वसंत पंचमी',
    nameEn: 'Vasant Panchami',
    month: 1,
    whenHi: 'माघ मास के शुक्ल पक्ष की पंचमी (आमतौर पर जनवरी के अंत या फरवरी में)',
    whenEn: 'Magh Shukla Panchami (usually late January or February)',
    whereHi: 'उत्तर और पूर्वी भारत में खास; बंगाल में सरस्वती पूजा के रूप में',
    colors: ['#fab005', '#e8590c'],
    introHi:
      'वसंत पंचमी वसंत ऋतु के आगमन और ज्ञान की देवी माँ सरस्वती की पूजा का दिन है। इस दिन पीला रंग पहनने और पीले पकवान बनाने की परंपरा है।',
    sections: [
      {
        h: 'माँ सरस्वती की पूजा',
        p: [
          'माँ सरस्वती विद्या, संगीत और कला की देवी हैं। इस दिन विद्यार्थी अपनी किताबें, कलम और वाद्य यंत्र माँ के सामने रखकर पूजा करते हैं। बंगाल, बिहार और ओडिशा में स्कूल-कॉलेजों में सरस्वती पूजा बड़े उत्साह से होती है।',
          'कई परिवारों में छोटे बच्चों का "विद्यारंभ" (पहली बार अक्षर लिखवाना) इसी दिन करवाया जाता है।',
        ],
      },
      {
        h: 'पीला रंग क्यों',
        p: [
          'वसंत में सरसों के खेत पीले फूलों से भर जाते हैं। पीला रंग ऊर्जा, उजाले और ज्ञान का प्रतीक माना जाता है, इसलिए लोग पीले कपड़े पहनते हैं और केसरिया भात, बूंदी या पीले चावल बनाते हैं।',
        ],
      },
      {
        h: 'पतंग और वसंत उत्सव',
        p: [
          'पंजाब और आसपास के क्षेत्रों में वसंत पंचमी पर भी पतंगबाज़ी होती है। कई जगह संगीत और कविता के कार्यक्रम रखे जाते हैं।',
        ],
      },
    ],
    enSummary: [
      'Vasant Panchami falls on the fifth day of the bright half of the month of Magh, usually in late January or February. It welcomes spring and is dedicated to Goddess Saraswati, the goddess of learning, music and the arts. Students worship their books and instruments, young children often begin their first lessons on this day, and people wear yellow, the colour of mustard fields in bloom.',
    ],
    wishesHi: [
      'माँ सरस्वती आपको ज्ञान, बुद्धि और सफलता का आशीर्वाद दें। वसंत पंचमी की हार्दिक शुभकामनाएँ!',
      'पीले फूलों की तरह आपकी ज़िंदगी भी खिलखिलाती रहे। हैप्पी वसंत पंचमी!',
      'विद्या की देवी आपकी हर परीक्षा आसान करें। सरस्वती पूजा की शुभकामनाएँ!',
      'वसंत की ताज़गी और माँ सरस्वती का आशीर्वाद सदा आपके साथ रहे।',
    ],
    wishesEn: [
      'May Goddess Saraswati bless you with wisdom and success. Happy Vasant Panchami!',
      'Bright as yellow mustard fields — wishing you a joyful spring. Happy Basant Panchami!',
      'Happy Saraswati Puja! May learning always light your way.',
    ],
    faq: [
      { q: 'वसंत पंचमी किस तिथि को होती है?', a: 'माघ मास के शुक्ल पक्ष की पंचमी तिथि को। अंग्रेज़ी कैलेंडर में यह हर साल बदलती है, आमतौर पर जनवरी के आखिर या फरवरी में।' },
      { q: 'इस दिन पीला रंग क्यों पहनते हैं?', a: 'पीला रंग वसंत, सरसों के फूल और ज्ञान का प्रतीक है, और माँ सरस्वती को प्रिय माना जाता है।' },
    ],
  },
  {
    slug: 'maha-shivratri',
    emoji: '🔱',
    nameHi: 'महाशिवरात्रि',
    nameEn: 'Maha Shivratri',
    month: 2,
    whenHi: 'फाल्गुन मास के कृष्ण पक्ष की चतुर्दशी (आमतौर पर फरवरी या मार्च)',
    whenEn: 'Krishna Chaturdashi of Phalgun (usually February or March)',
    whereHi: 'पूरे भारत और नेपाल में',
    colors: ['#364fc7', '#212529'],
    introHi:
      'महाशिवरात्रि भगवान शिव की आराधना की सबसे बड़ी रात है। मान्यता है कि इसी रात शिव और पार्वती का विवाह हुआ था। भक्त इस दिन उपवास रखते हैं और रात भर जागकर शिव का ध्यान करते हैं।',
    sections: [
      {
        h: 'पूजा कैसे करते हैं',
        p: [
          'शिवलिंग पर जल, दूध, दही, शहद और गंगाजल से अभिषेक किया जाता है। बेलपत्र, धतूरा, आक के फूल और भांग अर्पित किए जाते हैं। "ॐ नमः शिवाय" मंत्र का जाप किया जाता है।',
          'रात को चार प्रहर की पूजा होती है और कई मंदिरों में पूरी रात भजन-कीर्तन चलता है।',
        ],
      },
      {
        h: 'उपवास',
        p: [
          'कई लोग निर्जला व्रत रखते हैं, तो कई फल, दूध और साबूदाना-कुट्टू जैसे व्रत के भोजन लेते हैं। बुज़ुर्ग, बीमार या गर्भवती महिलाएँ अपनी सेहत के हिसाब से ही व्रत रखें।',
        ],
      },
      {
        h: 'प्रसिद्ध स्थान',
        p: [
          'काशी विश्वनाथ (वाराणसी), उज्जैन के महाकालेश्वर, सोमनाथ, नेपाल के पशुपतिनाथ और देश के बारह ज्योतिर्लिंगों पर इस दिन भारी भीड़ होती है।',
        ],
      },
    ],
    enSummary: [
      'Maha Shivratri, "the great night of Shiva", falls on the Krishna Chaturdashi of Phalgun, usually in February or March. Devotees fast, offer water, milk and bel leaves to the Shiva linga, chant "Om Namah Shivaya" and stay awake through the night. It is believed to be the night Shiva and Parvati were married. The jyotirlinga temples and Pashupatinath in Nepal draw huge crowds.',
    ],
    wishesHi: [
      'भोलेनाथ की कृपा से आपके सारे कष्ट दूर हों। महाशिवरात्रि की हार्दिक शुभकामनाएँ! हर हर महादेव!',
      'ॐ नमः शिवाय — शिव आपको शक्ति, शांति और सद्बुद्धि दें। हैप्पी महाशिवरात्रि!',
      'महादेव का आशीर्वाद आपके परिवार पर सदा बना रहे। बम बम भोले!',
      'शिव-पार्वती का प्रेम आपके घर में भी बसे। महाशिवरात्रि की बधाई!',
    ],
    wishesEn: [
      'May Lord Shiva bless you with strength, peace and wisdom. Happy Maha Shivratri! Har Har Mahadev!',
      'Om Namah Shivaya. Wishing you and your family a blessed Shivratri.',
      'May Mahadev remove every obstacle from your path. Happy Maha Shivratri!',
    ],
    faq: [
      { q: 'महाशिवरात्रि और मासिक शिवरात्रि में क्या फ़र्क है?', a: 'हर महीने कृष्ण पक्ष की चतुर्दशी को मासिक शिवरात्रि होती है। फाल्गुन मास वाली शिवरात्रि सबसे बड़ी मानी जाती है, इसलिए उसे महाशिवरात्रि कहते हैं।' },
      { q: 'शिवलिंग पर क्या चढ़ाते हैं?', a: 'जल, दूध, बेलपत्र, धतूरा, आक के फूल, चंदन और भस्म। तुलसी आमतौर पर शिवलिंग पर नहीं चढ़ाई जाती।' },
    ],
  },
  {
    slug: 'holi',
    emoji: '🎨',
    nameHi: 'होली',
    nameEn: 'Holi',
    month: 3,
    whenHi: 'फाल्गुन पूर्णिमा पर होलिका दहन, अगले दिन रंगों वाली होली (आमतौर पर मार्च)',
    whenEn: 'Holika Dahan on Phalgun Purnima, colours the next day (usually March)',
    whereHi: 'पूरे भारत और नेपाल में; ब्रज (मथुरा-वृंदावन-बरसाना) की होली सबसे प्रसिद्ध',
    colors: ['#e64980', '#7048e8'],
    introHi:
      'होली रंगों, मस्ती और भाईचारे का त्योहार है। यह बुराई पर अच्छाई की जीत और वसंत के स्वागत का पर्व है। इस दिन लोग पुराने गिले-शिकवे भूलकर एक-दूसरे को रंग लगाते और गले मिलते हैं।',
    sections: [
      {
        h: 'होलिका दहन और प्रह्लाद की कथा',
        p: [
          'राजा हिरण्यकशिपु चाहता था कि सब उसकी पूजा करें, लेकिन उसका बेटा प्रह्लाद भगवान विष्णु का भक्त था। राजा की बहन होलिका को आग में न जलने का वरदान था। वह प्रह्लाद को गोद में लेकर आग में बैठी, पर भगवान की कृपा से प्रह्लाद बच गए और होलिका जल गई।',
          'इसी याद में होली से एक रात पहले होलिका दहन किया जाता है — लकड़ी और उपलों का ढेर जलाकर उसकी परिक्रमा की जाती है।',
        ],
      },
      {
        h: 'रंगों वाली होली',
        p: [
          'अगले दिन (धुलेंडी) सुबह से रंग, गुलाल और पानी से होली खेली जाती है। ब्रज में होली कई दिनों तक चलती है — बरसाना की लट्ठमार होली, वृंदावन की फूलों वाली होली और मथुरा की होली दुनिया भर में मशहूर हैं।',
        ],
      },
      {
        h: 'पकवान',
        p: [
          'गुजिया, दही-भल्ले, मालपुआ, पापड़ी, नमकपारे और ठंडाई होली की पहचान हैं।',
        ],
      },
      {
        h: 'सुरक्षित होली',
        p: [
          'प्राकृतिक या हर्बल रंग इस्तेमाल करें, आँखों और मुँह में रंग जाने से बचें, जानवरों पर रंग न डालें और पानी की बर्बादी कम करें। जो रंग नहीं लगवाना चाहता, उसकी मर्ज़ी का सम्मान करें।',
        ],
      },
    ],
    enSummary: [
      'Holi, the festival of colours, celebrates the victory of good over evil and the arrival of spring. On the night of Phalgun Purnima, Holika Dahan recalls how Prahlad, a devotee of Vishnu, was saved from the fire while Holika burned. The next day people play with colours and water, share gujiya and thandai, and forgive old quarrels. Holi in Braj — Mathura, Vrindavan and Barsana\'s Lathmar Holi — is the most famous.',
    ],
    wishesHi: [
      'रंगों की तरह आपकी ज़िंदगी भी खुशियों से रंगीन रहे। होली की हार्दिक शुभकामनाएँ!',
      'गुजिया की मिठास, गुलाल की खुशबू और अपनों का प्यार — हैप्पी होली!',
      'होलिका की आग में सारी बुराइयाँ जल जाएँ और रिश्तों में नए रंग भर जाएँ। होली मुबारक!',
      'बुरा न मानो होली है! आपको और आपके परिवार को रंगों के त्योहार की बधाई।',
      'इस होली पुराने गिले-शिकवे भूलकर गले मिलें। हैप्पी होली!',
    ],
    wishesEn: [
      'May your life be as colourful as Holi itself. Happy Holi!',
      'Gujiya, gulal and good friends — wishing you a bright and joyful Holi!',
      'Let the colours wash away every quarrel. Happy Holi to you and your family!',
      'Play safe, play happy, play with love. Happy Holi!',
    ],
    faq: [
      { q: 'होलिका दहन कब होता है?', a: 'फाल्गुन पूर्णिमा की रात, रंगों वाली होली से एक दिन पहले। सही मुहूर्त पंचांग के अनुसार देखा जाता है।' },
      { q: 'लट्ठमार होली कहाँ होती है?', a: 'उत्तर प्रदेश के बरसाना और नंदगाँव में, जहाँ महिलाएँ हँसी-मज़ाक में पुरुषों पर लाठियाँ बरसाती हैं और पुरुष ढाल से बचते हैं।' },
      { q: 'त्वचा से होली का रंग कैसे छुड़ाएँ?', a: 'खेलने से पहले चेहरे और बालों पर नारियल या सरसों का तेल लगा लें। बाद में हल्के साबुन और बेसन-दही से धोएँ, ज़ोर से रगड़ें नहीं।' },
    ],
  },
  {
    slug: 'eid-ul-fitr',
    emoji: '🌙',
    nameHi: 'ईद-उल-फ़ित्र',
    nameEn: 'Eid ul-Fitr',
    month: 3,
    whenHi: 'शव्वाल महीने की पहली तारीख — रमज़ान के बाद चाँद दिखने पर (अंग्रेज़ी तारीख हर साल लगभग 10-11 दिन पहले आती है)',
    whenEn: '1 Shawwal, after Ramadan, on sighting the new moon (moves about 10-11 days earlier each year)',
    whereHi: 'पूरी दुनिया के मुस्लिम समुदाय में; भारत में हर जगह',
    colors: ['#087f5b', '#f08c00'],
    introHi:
      'ईद-उल-फ़ित्र रमज़ान के एक महीने के रोज़ों के बाद आने वाली खुशी की ईद है। इसे "मीठी ईद" भी कहते हैं, क्योंकि इस दिन हर घर में सेवइयाँ और मिठाइयाँ बनती हैं।',
    sections: [
      {
        h: 'रमज़ान और ईद',
        p: [
          'इस्लामी (हिजरी) कैलेंडर के नौवें महीने रमज़ान में मुसलमान सुबह से शाम तक रोज़ा रखते हैं, ज़्यादा इबादत करते हैं और ज़रूरतमंदों की मदद करते हैं। रमज़ान खत्म होने पर शव्वाल का चाँद दिखते ही अगले दिन ईद मनाई जाती है।',
          'हिजरी कैलेंडर चाँद पर चलता है, इसलिए ईद की अंग्रेज़ी तारीख हर साल लगभग 10-11 दिन पहले खिसक जाती है।',
        ],
      },
      {
        h: 'ईद का दिन',
        p: [
          'सुबह लोग नहा-धोकर नए कपड़े पहनते हैं, कुछ मीठा खाते हैं और ईदगाह या मस्जिद में ईद की नमाज़ पढ़ते हैं। नमाज़ से पहले "फ़ित्रा" (ज़कात-उल-फ़ित्र) देना ज़रूरी है, ताकि गरीब परिवार भी ईद मना सकें।',
          'नमाज़ के बाद लोग गले मिलकर "ईद मुबारक" कहते हैं। बड़े बच्चों को "ईदी" देते हैं और दोस्तों-रिश्तेदारों के घर आना-जाना होता है।',
        ],
      },
      {
        h: 'पकवान',
        p: [
          'शीर खुरमा, किमामी सेवइयाँ, दूध वाली सेवइयाँ, बिरयानी और कबाब ईद की दावत की शान हैं।',
        ],
      },
    ],
    enSummary: [
      'Eid ul-Fitr marks the end of Ramadan, the month of fasting, and is celebrated on the first day of Shawwal once the new moon is sighted. Because the Islamic calendar is lunar, the date moves about 10-11 days earlier every year. The day begins with the Eid prayer, preceded by Zakat al-Fitr (fitra) so that poorer families can celebrate too. Families share sheer khurma and sewaiyan, and children receive Eidi.',
    ],
    wishesHi: [
      'अल्लाह आपकी हर दुआ कुबूल करे और आपके घर में बरकत बनी रहे। ईद मुबारक!',
      'सेवइयों की मिठास आपके रिश्तों में भी घुल जाए। आपको और आपके परिवार को ईद-उल-फ़ित्र मुबारक!',
      'चाँद की रोशनी आपकी ज़िंदगी को खुशियों से रोशन करे। ईद मुबारक!',
      'रोज़ों की बरकत और ईद की खुशियाँ आपके साथ हमेशा रहें। ईद की दिली मुबारकबाद!',
    ],
    wishesEn: [
      'Eid Mubarak! May Allah accept your prayers and fill your home with peace and blessings.',
      'Wishing you a sweet Eid full of sewaiyan, smiles and family time. Eid Mubarak!',
      'May the light of the new moon bring joy to your life. Eid ul-Fitr Mubarak!',
    ],
    faq: [
      { q: 'ईद-उल-फ़ित्र और ईद-उल-अज़हा में क्या फ़र्क है?', a: 'ईद-उल-फ़ित्र रमज़ान के बाद मनाई जाती है (मीठी ईद)। ईद-उल-अज़हा (बकरीद) लगभग दो महीने बाद, ज़िलहिज्जा महीने में हज के समय मनाई जाती है।' },
      { q: 'फ़ित्रा क्या है?', a: 'ईद की नमाज़ से पहले हर सक्षम मुसलमान की ओर से गरीबों को दिया जाने वाला दान, ताकि वे भी ईद मना सकें।' },
    ],
  },
  {
    slug: 'ram-navami',
    emoji: '🏹',
    nameHi: 'राम नवमी',
    nameEn: 'Ram Navami',
    month: 4,
    whenHi: 'चैत्र मास के शुक्ल पक्ष की नवमी (आमतौर पर मार्च या अप्रैल)',
    whenEn: 'Chaitra Shukla Navami (usually March or April)',
    whereHi: 'पूरे भारत में; अयोध्या में सबसे बड़ा उत्सव',
    colors: ['#f76707', '#c92a2a'],
    introHi:
      'राम नवमी भगवान श्रीराम के जन्म का उत्सव है। मान्यता के अनुसार श्रीराम का जन्म अयोध्या में राजा दशरथ और माता कौशल्या के घर चैत्र शुक्ल नवमी को दोपहर के समय हुआ था। इसी दिन चैत्र नवरात्रि का समापन भी होता है।',
    sections: [
      {
        h: 'मर्यादा पुरुषोत्तम',
        p: [
          'श्रीराम को "मर्यादा पुरुषोत्तम" कहा जाता है — यानी ऐसा आदर्श इंसान जिसने हर रिश्ते और कर्तव्य को पूरी ईमानदारी से निभाया। पिता के वचन के लिए 14 साल का वनवास स्वीकार करना उनके चरित्र की सबसे बड़ी मिसाल है।',
        ],
      },
      {
        h: 'कैसे मनाते हैं',
        p: [
          'मंदिरों में दोपहर के समय रामजन्म की आरती होती है, रामचरितमानस का पाठ और भजन-कीर्तन होते हैं। कई जगह शोभायात्राएँ निकलती हैं। भक्त उपवास रखते हैं और पंजीरी, पंचामृत और फल का प्रसाद बाँटते हैं।',
          'जो लोग चैत्र नवरात्रि रखते हैं, वे इस दिन कन्या पूजन करके व्रत खोलते हैं।',
        ],
      },
    ],
    enSummary: [
      'Ram Navami celebrates the birth of Lord Rama in Ayodhya on the ninth day of the bright half of Chaitra, usually in March or April. It also ends Chaitra Navratri. Temples hold the janm-aarti at noon, the Ramcharitmanas is recited, processions are taken out and devotees fast. Rama is remembered as Maryada Purushottam, the ideal man who kept every promise and duty.',
    ],
    wishesHi: [
      'प्रभु श्रीराम आपके जीवन में सुख, शांति और मर्यादा का आशीर्वाद दें। राम नवमी की हार्दिक शुभकामनाएँ! जय श्रीराम!',
      'रघुकुल रीत सदा चली आई, प्राण जाई पर बचन न जाई। राम नवमी की बधाई!',
      'श्रीराम की कृपा से आपके सारे काम सफल हों। जय सियाराम!',
      'राम का नाम, राम का काम — आपके घर में सदा बना रहे मंगल। हैप्पी राम नवमी!',
    ],
    wishesEn: [
      'May Lord Rama bless you with courage, truth and peace. Happy Ram Navami! Jai Shri Ram!',
      'Wishing you a blessed Ram Navami filled with devotion and joy.',
      'May the ideals of Lord Rama guide your every step. Happy Ram Navami!',
    ],
    faq: [
      { q: 'राम नवमी किस तिथि को होती है?', a: 'चैत्र मास के शुक्ल पक्ष की नवमी तिथि को, जो आमतौर पर मार्च या अप्रैल में पड़ती है।' },
      { q: 'राम नवमी पर पूजा किस समय होती है?', a: 'मान्यता है कि श्रीराम का जन्म मध्याह्न (दोपहर) में हुआ था, इसलिए मुख्य पूजा और आरती दोपहर के समय होती है।' },
    ],
  },
  {
    slug: 'raksha-bandhan',
    emoji: '🪢',
    nameHi: 'रक्षा बंधन',
    nameEn: 'Raksha Bandhan',
    month: 8,
    whenHi: 'श्रावण मास की पूर्णिमा (आमतौर पर अगस्त)',
    whenEn: 'Shravan Purnima (usually August)',
    whereHi: 'पूरे भारत और नेपाल में',
    colors: ['#d6336c', '#f59f00'],
    introHi:
      'रक्षा बंधन भाई-बहन के प्यार और भरोसे का त्योहार है। बहन भाई की कलाई पर राखी बाँधती है और उसकी लंबी उम्र की दुआ करती है; भाई हमेशा साथ निभाने का वादा करता है।',
    sections: [
      {
        h: 'राखी की परंपरा',
        p: [
          'सुबह बहन पूजा की थाली सजाती है — रोली, अक्षत (चावल), दीया, मिठाई और राखी। भाई के माथे पर तिलक लगाकर, आरती करके राखी बाँधी जाती है और मिठाई खिलाई जाती है। भाई बहन को तोहफ़ा देता है।',
          'राखी बाँधते समय पंचांग में "भद्रा काल" देखा जाता है, क्योंकि उस समय राखी बाँधना शुभ नहीं माना जाता।',
        ],
      },
      {
        h: 'कहानियाँ',
        p: [
          'महाभारत की कथा में शिशुपाल वध के समय श्रीकृष्ण की उंगली कट गई थी, तब द्रौपदी ने अपनी साड़ी का टुकड़ा बाँधा। श्रीकृष्ण ने चीरहरण के समय उनकी लाज बचाकर यह वचन निभाया।',
          'आज रक्षा बंधन सिर्फ सगे भाई-बहन तक सीमित नहीं है — लोग चचेरे भाई-बहनों, दोस्तों, सैनिकों और पेड़ों को भी राखी बाँधते हैं।',
        ],
      },
    ],
    enSummary: [
      'Raksha Bandhan, on Shravan Purnima (usually August), celebrates the bond between brothers and sisters. The sister ties a rakhi on her brother\'s wrist with tilak, aarti and sweets, and the brother promises to stand by her and gives a gift. Rakhi is not tied during Bhadra kaal. A popular story recalls Draupadi tying a strip of her sari on Krishna\'s cut finger and Krishna protecting her in return.',
    ],
    wishesHi: [
      'राखी का यह धागा हमारे रिश्ते को और मज़बूत करे। रक्षा बंधन की हार्दिक शुभकामनाएँ!',
      'बचपन की लड़ाइयाँ और ढेर सारा प्यार — मेरे प्यारे भाई/बहन को हैप्पी रक्षा बंधन!',
      'दूर हो या पास, तुम्हारा साथ हमेशा मेरे साथ है। राखी मुबारक!',
      'भाई-बहन का यह प्यार सदा बना रहे। रक्षा बंधन की बधाई!',
    ],
    wishesEn: [
      'To my partner in crime and my forever protector — Happy Raksha Bandhan!',
      'Near or far, this thread keeps us together. Happy Rakhi!',
      'Thank you for every fight, every secret and every hug. Happy Raksha Bandhan!',
    ],
    faq: [
      { q: 'रक्षा बंधन किस दिन होता है?', a: 'श्रावण मास की पूर्णिमा को, जो आमतौर पर अगस्त में पड़ती है।' },
      { q: 'भद्रा काल में राखी क्यों नहीं बाँधते?', a: 'पंचांग में भद्रा काल को शुभ कामों के लिए अशुभ माना जाता है, इसलिए राखी भद्रा खत्म होने के बाद बाँधी जाती है।' },
    ],
  },
  {
    slug: 'guru-nanak-jayanti',
    emoji: '🙏',
    nameHi: 'गुरु नानक जयंती',
    nameEn: 'Guru Nanak Jayanti',
    month: 11,
    whenHi: 'कार्तिक पूर्णिमा (आमतौर पर नवंबर); इसे गुरपुरब या प्रकाश पर्व भी कहते हैं',
    whenEn: 'Kartik Purnima (usually November); also called Gurpurab or Prakash Parv',
    whereHi: 'पूरे भारत और दुनिया भर के सिख समुदाय में; पंजाब में सबसे बड़ा उत्सव',
    colors: ['#1c7ed6', '#f59f00'],
    introHi:
      'गुरु नानक जयंती सिख धर्म के संस्थापक और पहले गुरु, गुरु नानक देव जी के प्रकाश (जन्म) का पर्व है। इसे गुरपुरब या प्रकाश पर्व भी कहा जाता है और यह सिख समुदाय का सबसे बड़ा त्योहार माना जाता है।',
    sections: [
      {
        h: 'गुरु नानक देव जी',
        p: [
          'गुरु नानक देव जी का जन्म 1469 में राय भोई दी तलवंडी में हुआ था, जो आज पाकिस्तान में ननकाना साहिब के नाम से जाना जाता है। सिख परंपरा में उनका प्रकाश पर्व कार्तिक पूर्णिमा को मनाया जाता है।',
          'उन्होंने "इक ओंकार" — यानी ईश्वर एक है — का संदेश दिया। उनकी शिक्षाओं के तीन मूल सिद्धांत माने जाते हैं: नाम जपना (ईश्वर का स्मरण), किरत करनी (ईमानदारी से मेहनत की कमाई) और वंड छकना (अपनी कमाई ज़रूरतमंदों के साथ बाँटना)। उन्होंने जाति-भेद और ऊँच-नीच का विरोध किया और सबको बराबर माना।',
        ],
      },
      {
        h: 'गुरपुरब कैसे मनाते हैं',
        p: [
          'पर्व से दो दिन पहले गुरुद्वारों में अखंड पाठ शुरू होता है — गुरु ग्रंथ साहिब का लगभग 48 घंटे तक बिना रुके पूरा पाठ।',
          'एक दिन पहले नगर कीर्तन निकलता है, जिसकी अगुवाई पंज प्यारे करते हैं। पालकी में गुरु ग्रंथ साहिब को ले जाया जाता है, संगत शबद-कीर्तन गाती है और गतका (सिख मार्शल आर्ट) का प्रदर्शन होता है।',
          'त्योहार से पहले के दिनों में सुबह-सुबह प्रभात फेरियाँ निकलती हैं। पर्व के दिन गुरुद्वारों में कीर्तन, कथा और अरदास होती है, और लंगर में हर धर्म और जाति के लोग एक साथ बैठकर भोजन करते हैं।',
        ],
      },
      {
        h: 'लंगर और सेवा',
        p: [
          'लंगर (सामुदायिक रसोई) की परंपरा गुरु नानक देव जी ने शुरू की थी। यहाँ हर कोई ज़मीन पर पंगत में बैठकर एक जैसा भोजन करता है — अमीर-गरीब, किसी भी धर्म का। गुरपुरब पर बहुत से लोग गुरुद्वारे में सेवा करते हैं — रसोई में मदद, बर्तन धोना या जूते संभालना।',
        ],
      },
    ],
    enSummary: [
      'Guru Nanak Jayanti, also called Gurpurab or Prakash Parv, celebrates the birth of Guru Nanak Dev Ji, the founder of Sikhism and the first Sikh Guru, born in 1469 at Rai Bhoi di Talwandi (now Nankana Sahib, Pakistan). It is observed on Kartik Purnima. His message: one God (Ik Onkar), remember God (Naam Japna), earn honestly (Kirat Karni) and share with others (Vand Chhakna). Celebrations include the 48-hour Akhand Path, Prabhat Pheris, a Nagar Kirtan led by the Panj Pyare, kirtan in gurdwaras and langar for everyone.',
    ],
    wishesHi: [
      'गुरु नानक देव जी की कृपा आप और आपके परिवार पर सदा बनी रहे। गुरपुरब की लख-लख बधाइयाँ!',
      'इक ओंकार — गुरु जी का संदेश आपके जीवन में सच्चाई, सेवा और प्रेम भरे। प्रकाश पर्व की शुभकामनाएँ!',
      'नाम जपो, किरत करो, वंड छको — गुरु नानक जयंती की हार्दिक बधाई!',
      'वाहेगुरु आपको चढ़दी कला में रखें। गुरु नानक देव जी के प्रकाश पर्व की ढेर सारी शुभकामनाएँ!',
    ],
    wishesEn: [
      'May Guru Nanak Dev Ji bless you with peace, truth and kindness. Happy Gurpurab!',
      'Wishing you and your family a blessed Guru Nanak Jayanti. Waheguru bless you!',
      'Remember God, work honestly, share with others. Happy Prakash Parv!',
    ],
    faq: [
      { q: 'गुरु नानक जयंती कब मनाई जाती है?', a: 'कार्तिक मास की पूर्णिमा को, जो आमतौर पर नवंबर में पड़ती है। अंग्रेज़ी तारीख हर साल बदलती है।' },
      { q: 'अखंड पाठ क्या है?', a: 'गुरु ग्रंथ साहिब का शुरू से अंत तक लगभग 48 घंटे में बिना रुके किया जाने वाला पाठ, जो गुरपुरब से दो दिन पहले शुरू होता है।' },
      { q: 'गुरपुरब पर क्या कहकर बधाई देते हैं?', a: '"गुरपुरब दी लख-लख वधाइयाँ" या "Happy Gurpurab" — दोनों आम तौर पर कहे जाते हैं।' },
    ],
  },
  {
    slug: 'diwali',
    emoji: '🪔',
    nameHi: 'दिवाली',
    nameEn: 'Diwali',
    month: 10,
    whenHi: 'कार्तिक मास की अमावस्या (आमतौर पर अक्टूबर या नवंबर); धनतेरस से भाई दूज तक पाँच दिन',
    whenEn: 'Kartik Amavasya (usually October or November); five days from Dhanteras to Bhai Dooj',
    whereHi: 'पूरे भारत और दुनिया भर के भारतीयों में',
    colors: ['#f08c00', '#862e9c'],
    introHi:
      'दिवाली (दीपावली) रोशनी का त्योहार है — अंधेरे पर उजाले और बुराई पर अच्छाई की जीत का पर्व। इस दिन घर-घर दीये जलाए जाते हैं और माँ लक्ष्मी और भगवान गणेश की पूजा होती है।',
    sections: [
      {
        h: 'दिवाली क्यों मनाते हैं',
        p: [
          'मान्यता है कि रावण पर विजय और 14 साल के वनवास के बाद श्रीराम, माता सीता और लक्ष्मण इसी दिन अयोध्या लौटे थे। अयोध्यावासियों ने दीये जलाकर उनका स्वागत किया था।',
          'जैन धर्म में यह भगवान महावीर के निर्वाण का दिन है, और सिख धर्म में इसी समय बंदी छोड़ दिवस मनाया जाता है।',
        ],
      },
      {
        h: 'पाँच दिन का उत्सव',
        p: [
          'धनतेरस (बर्तन, सोना-चाँदी खरीदने का दिन), नरक चतुर्दशी या छोटी दिवाली, मुख्य दिवाली (लक्ष्मी-गणेश पूजा), गोवर्धन पूजा और भाई दूज — ये पाँच दिन मिलकर दीपोत्सव बनाते हैं।',
        ],
      },
      {
        h: 'तैयारी और पकवान',
        p: [
          'दिवाली से पहले घर की सफ़ाई और सजावट होती है, रंगोली बनाई जाती है। लड्डू, काजू कतली, शक्करपारे, चकली और गुजिया जैसे पकवान बनते हैं और रिश्तेदारों में मिठाई बाँटी जाती है।',
          'पटाखे कम चलाएँ और अपने शहर के नियम मानें — हवा साफ़ रहेगी और जानवर भी डरेंगे नहीं।',
        ],
      },
    ],
    enSummary: [
      'Diwali, the festival of lights, falls on Kartik Amavasya, usually in October or November, as part of five days from Dhanteras to Bhai Dooj. It marks Lord Rama\'s return to Ayodhya after defeating Ravana, and homes are lit with diyas and rangoli for Lakshmi-Ganesh puja. For Jains it marks Lord Mahavira\'s nirvana, and Sikhs celebrate Bandi Chhor Divas at the same time.',
    ],
    wishesHi: [
      'दीयों की रोशनी आपके घर के हर कोने को खुशियों से भर दे। दिवाली की हार्दिक शुभकामनाएँ!',
      'माँ लक्ष्मी की कृपा और गणेश जी का आशीर्वाद सदा आप पर बना रहे। शुभ दीपावली!',
      'मिठाई की मिठास, रंगोली के रंग और अपनों का साथ — हैप्पी दिवाली!',
      'इस दिवाली एक दीया उनके लिए भी जलाएँ जिनके घर अंधेरा है। आपको दीपावली की बधाई!',
      'अंधेरे पर उजाले की जीत का यह पर्व आपकी ज़िंदगी में नई रोशनी लाए। शुभ दिवाली!',
    ],
    wishesEn: [
      'May the light of a thousand diyas fill your home with joy. Happy Diwali!',
      'Wishing you a Diwali full of sweets, smiles and Lakshmi\'s blessings.',
      'Light, love and laughter — have a bright and safe Diwali!',
      'May this festival of lights bring new beginnings to you and your family. Happy Deepavali!',
    ],
    faq: [
      { q: 'दिवाली के पाँच दिन कौन-कौन से हैं?', a: 'धनतेरस, नरक चतुर्दशी (छोटी दिवाली), दिवाली (लक्ष्मी पूजा), गोवर्धन पूजा और भाई दूज।' },
      { q: 'दिवाली पर किसकी पूजा होती है?', a: 'मुख्य रूप से माँ लक्ष्मी (धन और समृद्धि की देवी) और भगवान गणेश (शुभ शुरुआत के देवता) की।' },
    ],
  },
];

export { festivals };
