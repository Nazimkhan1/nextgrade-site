/**
 * Interface text for every language. Content (festival guides, wishes) lives
 * in src/festivals.mjs + src/wishes.mjs (Hindi) and src/i18n/<lang>.mjs.
 * Functions take the names they need, so word order can differ per language.
 */
const ui = {
  hi: {
    langName: 'हिंदी',
    nav: { home: 'Home', stories: 'कहानियाँ', wishes: 'Wishes', festivals: 'Festivals', games: 'Games', card: 'Wish Card', apps: 'Apps', about: 'About', tools: 'Tools', calc: 'Calculators', naam: 'Baby Names', ff: 'Full Forms' },
    tools: { title: "मुफ़्त फ़ोटो और डॉक्यूमेंट टूल्स — फ़ोटो अपलोड नहीं होती | NextGrade", desc: "फ़ोटो और PDF को KB में छोटा करना, JPG से PDF, PDF जोड़ना, फ़ॉर्म फ़ोटो-सिग्नेचर, टाइपिंग टेस्ट, QR कोड और ज़मीन नाप — मुफ़्त, और आपकी फ़ोटो/डॉक्यूमेंट आपके फ़ोन से बाहर नहीं जाते।", h1: "🧰 मुफ़्त टूल्स", lead: "फ़ॉर्म, प्रिंट और रोज़ के काम के छोटे टूल्स। सब आपके फ़ोन के ब्राउज़र में ही चलते हैं — फ़ोटो या डॉक्यूमेंट किसी सर्वर पर अपलोड नहीं होते।", more: "<h2>आपकी फ़ाइलें, आपके पास</h2><p>ये टूल्स पूरी तरह आपके फ़ोन/ब्राउज़र में ही चलते हैं (कुछ टूल अपनी छोटी लाइब्रेरी एक बार डाउनलोड करते हैं)। आपकी फ़ोटो या डॉक्यूमेंट (आधार, मार्कशीट, सर्टिफ़िकेट) किसी सर्वर पर नहीं जाते, कहीं सेव नहीं होते, और हम उन्हें देख भी नहीं सकते। पेज बंद करते ही सब मिट जाता है। एक बार खुलने के बाद ज़्यादातर टूल बिना इंटरनेट के भी चलते हैं।</p><h2>किसके काम के</h2><p>ऑनलाइन फ़ॉर्म भरने वाले छात्र (फ़ोटो का साइज़ और KB), नौकरी या एडमिशन के लिए डॉक्यूमेंट की PDF, दुकान के प्रोडक्ट की साफ़ फ़ोटो, या बस नया लुक आज़माने के लिए। हर टूल मुफ़्त है, बिना लॉगिन और बिना वॉटरमार्क के।</p><p>ध्यान दें: हर फ़ॉर्म/दफ़्तर के अपने नियम होते हैं (साइज़, बैकग्राउंड, KB) — भेजने से पहले उनके नियम ज़रूर पढ़ लें।</p>" },
    stories: {
      title: 'सोने से पहले की छोटी कहानियाँ — बच्चों के लिए नैतिक कहानियाँ | NextGrade',
      desc: 'बच्चों को रात में सुलाने के लिए 2-3 मिनट की छोटी नैतिक कहानियाँ — पंचतंत्र, अकबर-बीरबल, तेनाली रामन, मुल्ला नसरुद्दीन। फ़ोन से पढ़कर सुनवाएँ, नाइट मोड और स्लीप टाइमर के साथ।',
      h1: '🌙 सोने से पहले की कहानियाँ',
      lead: 'बच्चों को रात में सुनाने के लिए 2-3 मिनट की छोटी कहानियाँ, हर कहानी के अंत में एक छोटी सीख। थक गई हों तो "सुनाओ" दबाइए — फ़ोन खुद कहानी पढ़कर सुनाएगा।',
      momH: 'माँ के लिए छोटी मदद',
      momP: '🔊 सुनाओ — फ़ोन खुद कहानी पढ़ता है। 🌙 नाइट मोड — अँधेरी स्क्रीन, बड़े अक्षर, ताकि बच्चे की आँखों पर रोशनी न पड़े। ⏲️ स्लीप टाइमर — 5/10/15 मिनट बाद आवाज़ अपने-आप बंद और स्क्रीन अँधेरी।',
      minutes: (n) => `${n} मिनट`, seekh: '🌟 सीख', listen: '🔊 सुनाओ', pause: '⏸️ रोको', resume: '▶️ आगे सुनाओ', stop: '⏹️ बंद', night: '🌙 नाइट मोड', day: '☀️ दिन मोड',
      timer: 'स्लीप टाइमर', timerOff: 'टाइमर बंद', timerMin: (n) => `${n} मिनट`, next: 'अगली कहानी →', prev: '← पिछली कहानी', all: 'सारी कहानियाँ',
      goodnight: '🌙 शुभ रात्रि', goodnightSub: 'स्क्रीन पर टैप करके वापस आएँ',
      noVoice: 'इस फ़ोन/ब्राउज़र में इस भाषा की आवाज़ नहीं मिली — कोई दूसरी भाषा चुनें या खुद पढ़कर सुनाएँ।',
      share: '📲 WhatsApp पर भेजें', shareText: (t, u) => `आज रात बच्चों को यह कहानी सुनाइए: "${t}" 🌙\n${u}`,
      moreH: 'और कहानियाँ',
    },
    footer: 'त्योहारों की जानकारी, शुभकामनाएँ और छोटे काम के ऐप्स।',
    langLabel: 'भाषा',
    home: {
      title: 'NextGrade — कहानियाँ, निबंध, त्योहार, बच्चों की पढ़ाई, गेम्स और फ़्री टूल्स',
      desc: 'बच्चों की कहानियाँ, निबंध और भाषण, गिनती-पहाड़े-बारहखड़ी आवाज़ के साथ, त्योहार और शुभकामनाएँ, कैलेंडर 2027, देसी गेम्स, और मुफ़्त टूल्स — शादी कार्ड, बायोडाटा, कैलकुलेटर, PDF और फ़ोटो टूल्स। हिंदी, English, Hinglish और বাংলা में।',
      h1: 'कहानियाँ, पढ़ाई, त्योहार, गेम्स और काम के फ़्री टूल्स — एक जगह',
      lead: 'बच्चों के लिए कहानियाँ, निबंध, भाषण और आवाज़ के साथ गिनती-पहाड़े; हर त्योहार की पूरी जानकारी और शुभकामनाएँ; देसी गेम्स; और रोज़ काम आने वाले मुफ़्त टूल्स — सब आपके फ़ोन में, बिना login के।',
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
      more: `<h2>गेम कैसे खेलें</h2><p>किसी भी गेम के कार्ड पर टैप करें — गेम सीधे ब्राउज़र में खुल जाता है, कुछ डाउनलोड नहीं करना पड़ता। हर गेम 45 सेकंड से 5 मिनट का है, इसलिए छोटे ब्रेक में भी खेला जा सकता है। गेम ख़त्म होने पर अपना नाम डालकर "चैलेंज भेजो" दबाएँ; दोस्त को जो लिंक मिलेगा उसमें आपका स्कोर दिखेगा और वह उसे हराने की कोशिश कर सकता है।</p>
<h2>बच्चों और परिवार के लिए</h2><p>हमारे गेम्स में कोई हिंसा, जुआ या इन-ऐप ख़रीदारी नहीं है। आवाज़ हमेशा अपनी मर्ज़ी से चालू होती है। बेस्ट स्कोर सिर्फ़ आपके फ़ोन में सेव होता है — हम कोई अकाउंट, ईमेल या फ़ोन नंबर नहीं माँगते।</p>
<h2>ऑफ़लाइन और इंस्टॉल</h2><p>एक बार खोलने के बाद ज़्यादातर गेम बिना इंटरनेट के भी चलते हैं। चाहें तो ब्राउज़र मेनू से "Add to Home screen" चुनकर इन्हें ऐप की तरह इंस्टॉल कर सकते हैं।</p>`,
      title: 'त्योहारों के मुफ़्त गेम्स — Free Festival Games | NextGrade',
      desc: 'त्योहारों पर बने छोटे, मुफ़्त ब्राउज़र गेम्स — फ़ोन पर खेलें, इंस्टॉल करें और दोस्तों को WhatsApp पर स्कोर का चैलेंज भेजें। कोई साइन-अप नहीं।',
      h1: '🎮 त्योहारों के गेम्स',
      lead: 'हर त्योहार पर एक छोटा, मज़ेदार गेम — फ़ोन पर सीधे खेलें, स्कोर बनाएं और WhatsApp पर दोस्तों को चैलेंज भेजें। गेम आपके फ़ोन में ही चलते हैं; हम कोई अकाउंट या निजी जानकारी नहीं लेते।',
      soonH: 'जल्द आ रहे हैं', soonP: 'दिवाली पर दीये जलाओ, होली के रंग, ईद पर ईदी गेम और राखी डिज़ाइन। 🪔🎨🌙🪢', tag: (t) => `${t} game`,
    },
    apps: {
      more: `<h2>ये ऐप्स क्यों बनाए</h2><p>रोज़ के छोटे काम — जैसे किसे कितने पैसे दिए, महीने में कहाँ कितना ख़र्च हुआ, या किसी को सुंदर शुभकामना कार्ड भेजना — इनके लिए भारी ऐप डाउनलोड करने या अकाउंट बनाने की ज़रूरत नहीं होनी चाहिए। हमारे वेब ऐप्स कुछ ही सेकंड में खुलते हैं, फ़ोन में बहुत कम जगह लेते हैं और सस्ते फ़ोन पर भी आराम से चलते हैं।</p>
<h2>आपका डेटा आपके पास</h2><p>Hisab Kitab आपका पूरा हिसाब आपके ही फ़ोन के ब्राउज़र में रखता है; चाहें तो आप इसका बैकअप फ़ाइल के रूप में ले सकते हैं। Wish Card Maker आपका नाम या संदेश किसी सर्वर पर नहीं भेजता। ध्यान रखें: ब्राउज़र का डेटा मिटाने पर ऐप का डेटा भी मिट सकता है, इसलिए ज़रूरी हिसाब का बैकअप रखें।</p>`,
      title: 'मुफ़्त ऐप्स और टूल्स | NextGrade',
      desc: 'NextGrade के मुफ़्त वेब ऐप्स — Hisab Kitab (खर्च और उधार का हिसाब) और Wish Card Maker। फ़ोन पर इंस्टॉल होते हैं, बिना साइन-अप के चलते हैं।',
      h1: 'मुफ़्त ऐप्स और टूल्स',
      lead: 'छोटे, हल्के और मुफ़्त वेब ऐप्स जो मोबाइल पर ऐप की तरह इंस्टॉल हो जाते हैं। ज़्यादातर ऐप आपका डेटा आपके ही फ़ोन पर रखते हैं।',
      installH: 'Install कैसे करें',
      installP: 'Android पर Chrome में ऐप खोलें और मेनू (⋮) से <b>Install app / Add to Home screen</b> चुनें। iPhone पर Safari में Share बटन दबाकर <b>Add to Home Screen</b> चुनें।',
    },
    about: {
      title: 'हमारे बारे में', desc: 'NextGrade के बारे में — हम कौन हैं, यह साइट क्यों बनाई और हमारी जानकारी कहाँ से आती है।',
      html: (contact) => `<p class="lead">NextGrade (nextgrade.in) भारत में बनी एक छोटी, स्वतंत्र वेबसाइट है।</p>
<h2>हम क्या करते हैं</h2>
<p>हम तीन तरह की चीज़ें बनाते हैं: <b>त्योहारों की सरल और भरोसेमंद जानकारी</b> — कहानी, महत्व, परंपराएँ, पकवान और शुभकामनाएँ; <b>त्योहारों के छोटे गेम्स</b>; और <b>मुफ़्त वेब ऐप्स</b>, जैसे खर्च और उधार का हिसाब रखने वाला Hisab Kitab और Wish Card Maker। साइट हिंदी, English, Hinglish और বাংলা में है।</p>
<h2>हमारी जानकारी</h2>
<p>त्योहारों के पेज आम तौर पर मानी जाने वाली परंपराओं, धार्मिक ग्रंथों की लोकप्रिय कथाओं और सार्वजनिक स्रोतों पर आधारित हैं। जिन त्योहारों की तारीख तिथि से तय होती है, उनके लिए हम महीना और तिथि लिखते हैं, क्योंकि अंग्रेज़ी तारीख हर साल बदलती है। कोई गलती दिखे तो <a href="${contact}">हमें बताएं</a> — हम जल्द सुधारेंगे।</p>
<h2>हमारे ऐप्स और आपका डेटा</h2>
<p>हम कोई सर्वर या डेटाबेस में आपकी जानकारी नहीं रखते। ऐप्स आपका डेटा आपके ही डिवाइस पर रखते हैं, और Wish Card Maker आपका नाम या संदेश कहीं नहीं भेजता — कार्ड आपके ब्राउज़र में ही बनता है।</p>
<h2>यहाँ आपको क्या मिलेगा</h2>
<ul>
<li><a href="${contact.replace('contact/', '')}festivals/">त्योहारों की गाइड</a> — क्रिसमस से दिवाली तक हर बड़े त्योहार की कहानी, महत्व, रीति-रिवाज़, पकवान और अक्सर पूछे जाने वाले सवाल।</li>
<li><a href="${contact.replace('contact/', '')}wishes/">शुभकामनाएँ</a> — गुड मॉर्निंग, जन्मदिन, सालगिरह, जुम्मा मुबारक जैसे रोज़ के मौक़ों के लिए हमारे अपने लिखे संदेश, कॉपी और WhatsApp बटन के साथ।</li>
<li><a href="${contact.replace('contact/', '')}kahani/">कहानियाँ</a> — पंचतंत्र, अकबर-बीरबल, तेनाली राम जैसी पुरानी कहानियाँ, हमारे अपने शब्दों में, आवाज़ में सुनने और नाइट मोड के साथ।</li>
<li><a href="${contact.replace('contact/', '')}islamic-calendar/">इस्लामी कैलेंडर</a>, <a href="${contact.replace('contact/', '')}games/">त्योहारों के गेम्स</a>, नाम वाले एनिमेटेड विश और <a href="${contact.replace('contact/', '')}wish-card/">Wish Card Maker</a>।</li>
</ul>
<h2>हम कैसे लिखते हैं</h2>
<p>हर पेज हम ख़ुद लिखते हैं — किसी दूसरी वेबसाइट या किताब से कॉपी नहीं करते। लिखने से पहले हम कई सार्वजनिक स्रोत, पंचांग और धार्मिक परंपराओं की जानी-मानी बातें मिलाकर देखते हैं। जहाँ अलग-अलग इलाक़ों में अलग मान्यताएँ हैं, वहाँ हम यह साफ़ लिखते हैं। धार्मिक विषयों पर हम सम्मान के साथ और बिना किसी पक्षपात के लिखते हैं, और तारीख़ों के लिए हमेशा स्थानीय पंचांग, गुरुद्वारा, मस्जिद या चर्च से पुष्टि करने की सलाह देते हैं।</p>
<h2>विज्ञापन और ख़र्च</h2>
<p>NextGrade पूरी तरह मुफ़्त है। साइट चलाने का ख़र्च Google AdSense के विज्ञापनों से निकलता है। विज्ञापन कभी गेम या कार्ड के ऊपर नहीं आते, और हम किसी से भी विज्ञापनों पर क्लिक करने को नहीं कहते। ज़्यादा जानकारी के लिए <a href="/privacy-policy/">Privacy Policy</a> देखें।</p>
<h2>सुधार और सुझाव</h2>
<p>हम हर साल त्योहारों की तारीख़ें और जानकारी दोबारा जाँचते हैं। अगर आपको कोई ग़लती, पुरानी जानकारी या कोई नई कहानी/त्योहार का सुझाव देना है, तो <a href="${contact}">संपर्क पेज</a> से हमें लिखें — हर ईमेल पढ़ा जाता है।</p>`,
    },
    contact: {
      title: 'संपर्क करें', desc: 'NextGrade से संपर्क करें — सुझाव, गलती की सूचना या ऐप से जुड़ा सवाल।',
      html: (email) => `<p class="lead">सुझाव, किसी पेज में गलती, या किसी ऐप से जुड़ा सवाल — हमें ईमेल करें।</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>हम आम तौर पर 2-3 कार्यदिवसों में जवाब देते हैं। कृपया ईमेल में पासवर्ड, OTP या बैंक की जानकारी कभी न भेजें।</p>
<h2>किन बातों के लिए लिखें</h2>
<ul>
<li><b>ग़लती की सूचना</b> — किसी त्योहार की तारीख़, कहानी या जानकारी में ग़लती हो तो पेज का लिंक और सही जानकारी भेजें।</li>
<li><b>सुझाव</b> — कोई त्योहार, कहानी, शुभकामना या गेम जो आप यहाँ देखना चाहते हैं।</li>
<li><b>ऐप या गेम में दिक़्क़त</b> — फ़ोन का नाम, ब्राउज़र (Chrome/Safari) और क्या हुआ, यह लिखें।</li>
<li><b>कॉपीराइट या कंटेंट से जुड़ी शिकायत</b> — पेज का लिंक और अपनी बात साफ़-साफ़ लिखें, हम जल्द कार्रवाई करेंगे।</li>
<li><b>साझेदारी या व्यापार से जुड़ी बात</b> — स्कूल, संस्था या ब्रांड के साथ काम के लिए।</li>
</ul>
<h2>हमारे बारे में</h2>
<p>NextGrade भारत से चलाई जाने वाली एक स्वतंत्र वेबसाइट है। हम कोई फ़ोन नंबर या ऑफ़िस पता सार्वजनिक नहीं करते; ईमेल ही हम तक पहुँचने का सबसे पक्का तरीक़ा है। हमारे बारे में और जानने के लिए <a href="../about/">About पेज</a> देखें।</p>`,
    },
  },

  en: {
    langName: 'English',
    nav: { home: 'Home', stories: 'Stories', wishes: 'Wishes', festivals: 'Festivals', games: 'Games', card: 'Wish Card', apps: 'Apps', about: 'About', tools: 'Tools', calc: 'Calculators', naam: 'Baby Names', ff: 'Full Forms' },
    tools: { title: "Free photo & document tools — nothing uploaded | NextGrade", desc: "Compress photos and PDFs to any KB, JPG to PDF, merge PDFs, exam form photo & signature, typing test, QR codes and land units — free, and your photos and documents never leave your phone.", h1: "🧰 Free Tools", lead: "Small tools for forms, printing and everyday jobs. They all run inside your phone's browser — photos and documents are never uploaded to any server.", more: "<h2>Your files stay with you</h2><p>These tools run entirely inside your phone/browser (some download their small library once). Your photos and documents (Aadhaar, marksheets, certificates) are not sent to any server, not saved anywhere, and we cannot see them. Closing the page clears everything. After the first visit most tools work offline too.</p><h2>Who they are for</h2><p>Students filling online forms (photo size and KB), PDFs of documents for jobs or admissions, clean product photos for a shop, or just trying a new look. Every tool is free, with no login and no watermark.</p><p>Note: every form or office has its own rules (size, background, KB) — always read them before you send.</p>" },
    stories: {
      title: 'Short Bedtime Stories for Kids — Moral Stories | NextGrade',
      desc: 'Short 2-3 minute bedtime stories with a moral — Panchatantra, Akbar-Birbal, Tenali Raman, Mulla Nasruddin and more. Let your phone read them aloud, with night mode and a sleep timer.',
      h1: '🌙 Bedtime stories',
      lead: 'Short 2-3 minute stories to tell children at night, each ending with a small lesson. Too tired to read? Tap "Read aloud" and your phone will tell the story.',
      momH: 'A little help for parents',
      momP: '🔊 Read aloud — your phone reads the story. 🌙 Night mode — a dark screen with big letters so the light doesn\'t bother your child. ⏲️ Sleep timer — after 5/10/15 minutes the voice stops and the screen goes dark.',
      minutes: (n) => `${n} min`, seekh: '🌟 Moral', listen: '🔊 Read aloud', pause: '⏸️ Pause', resume: '▶️ Continue', stop: '⏹️ Stop', night: '🌙 Night mode', day: '☀️ Day mode',
      timer: 'Sleep timer', timerOff: 'Timer off', timerMin: (n) => `${n} min`, next: 'Next story →', prev: '← Previous story', all: 'All stories',
      goodnight: '🌙 Good night', goodnightSub: 'Tap the screen to come back',
      noVoice: 'No voice for this language on this phone/browser — pick another language or read it yourself.',
      share: '📲 Send on WhatsApp', shareText: (t, u) => `Tell the kids this story tonight: "${t}" 🌙\n${u}`,
      moreH: 'More stories',
    },
    footer: 'Indian festivals, wishes and small useful apps.',
    langLabel: 'Language',
    home: {
      title: 'NextGrade — Stories, Essays, Festivals, Kids Learning, Games & Free Tools',
      desc: 'Moral stories, essays and speeches for students, Hindi counting and tables with audio, Indian festivals and wishes, Calendar 2027, desi games and free tools — wedding card, biodata, calculators, PDF and photo tools. In Hindi, English, Hinglish and Bangla.',
      h1: 'Stories, learning, festivals, games and free tools — in one place',
      lead: 'Stories, essays and speeches for children, counting and tables with audio; every Indian festival with its story and wishes; desi games; and free everyday tools — all on your phone, no login.',
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
      more: `<h2>How to play</h2><p>Tap any game card — it opens straight in your browser, with nothing to download. Each game lasts between 45 seconds and 5 minutes, so it fits into a short break. When a game ends, add your name and tap "Send challenge"; your friend gets a link that shows your score and can try to beat it.</p>
<h2>For kids and families</h2><p>Our games have no violence, gambling or in-app purchases. Sound only turns on when you choose. Best scores are saved only on your phone — we never ask for an account, email or phone number.</p>
<h2>Offline and install</h2><p>Once opened, most games work without the internet. You can also install them like an app by choosing "Add to Home screen" from your browser menu.</p>`,
      title: 'Free Festival Games | NextGrade',
      desc: 'Small free browser games for Indian festivals — play on your phone, install them and challenge friends on WhatsApp. No sign-up.',
      h1: '🎮 Festival games',
      lead: 'A small, fun game for every festival — play right in your phone\'s browser, set a score and challenge friends on WhatsApp. The games run on your phone; we don\'t ask for an account or any personal details.',
      soonH: 'Coming soon', soonP: 'Light the diyas for Diwali, Holi colours, an Eidi game for Eid and a rakhi designer. 🪔🎨🌙🪢', tag: (t) => `${t} game`,
    },
    apps: {
      more: `<h2>Why we built these apps</h2><p>Small everyday jobs — who you lent money to, where your money went this month, or sending someone a pretty greeting card — shouldn't need a heavy download or a new account. Our web apps open in seconds, take very little space on your phone and run smoothly even on budget phones.</p>
<h2>Your data stays with you</h2><p>Hisab Kitab keeps all your records in your own phone's browser, and you can export a backup file whenever you like. The Wish Card Maker never sends your names or message to a server. Note: clearing your browser data can also clear the app's data, so keep a backup of important records.</p>`,
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
<p>We don't keep your information on any server or database. Our apps keep your data on your own device, and the Wish Card Maker never sends your names or message anywhere — the card is made in your browser.</p>
<h2>What you'll find here</h2>
<ul>
<li><a href="${contact.replace('contact/', '')}festivals/">Festival guides</a> — the story, meaning, customs, food and common questions for every major festival, from Christmas to Diwali.</li>
<li><a href="${contact.replace('contact/', '')}wishes/">Wishes</a> — messages we write ourselves for everyday moments like Good Morning, birthdays, anniversaries and Jumma Mubarak, with copy and WhatsApp buttons.</li>
<li><a href="${contact.replace('contact/', '')}kahani/">Stories</a> — classic tales from the Panchatantra, Akbar-Birbal, Tenali Raman and more, retold in our own words, with read-aloud and night mode.</li>
<li>An <a href="${contact.replace('contact/', '')}islamic-calendar/">Islamic calendar</a>, <a href="${contact.replace('contact/', '')}games/">festival games</a>, animated wishes with a name and the <a href="${contact.replace('contact/', '')}wish-card/">Wish Card Maker</a>.</li>
</ul>
<h2>How we write</h2>
<p>We write every page ourselves — nothing is copied from other websites or books. Before writing, we cross-check several public sources, almanacs (panchang) and well-known religious traditions. Where customs differ between regions, we say so. We write about faith with respect and without taking sides, and for dates we always suggest confirming with your local panchang, gurdwara, mosque or church.</p>
<h2>Ads and costs</h2>
<p>NextGrade is completely free. The cost of running it is covered by ads served by Google AdSense. Ads are never placed over a game or a card, and we never ask anyone to click on ads. See our <a href="/privacy-policy/">Privacy Policy</a> for details.</p>
<h2>Corrections and suggestions</h2>
<p>We re-check festival dates and facts every year. If you find a mistake or something out of date, or want to suggest a story or festival, write to us through the <a href="${contact}">contact page</a> — every email is read.</p>`,
    },
    contact: {
      title: 'Contact us', desc: 'Contact NextGrade — suggestions, corrections or questions about our apps.',
      html: (email) => `<p class="lead">Suggestions, a mistake on a page or a question about one of our apps — email us.</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>We usually reply within 2-3 working days. Please never send passwords, OTPs or bank details by email.</p>
<h2>What to write to us about</h2>
<ul>
<li><b>Corrections</b> — if a festival date, story or fact is wrong, send the page link and the correct information.</li>
<li><b>Suggestions</b> — a festival, story, wish or game you would like to see here.</li>
<li><b>Problems with an app or game</b> — tell us your phone model, browser (Chrome/Safari) and what happened.</li>
<li><b>Copyright or content concerns</b> — send the page link and a clear description, and we will act quickly.</li>
<li><b>Partnerships and business</b> — for schools, organisations or brands that want to work with us.</li>
</ul>
<h2>About us</h2>
<p>NextGrade is an independent website run from India. We don't publish a phone number or office address; email is the most reliable way to reach us. To learn more, see our <a href="../about/">About page</a>.</p>`,
    },
  },

  hinglish: {
    langName: 'Hinglish',
    nav: { home: 'Home', stories: 'Kahaniyan', wishes: 'Wishes', festivals: 'Festivals', games: 'Games', card: 'Wish Card', apps: 'Apps', about: 'About', tools: 'Tools', calc: 'Calculators', naam: 'Baby Names', ff: 'Full Forms' },
    tools: { title: "Free photo aur document tools — kuch upload nahi hota | NextGrade", desc: "Photo aur PDF ko KB mein chhota karna, JPG se PDF, PDF jodna, form photo-signature, typing test, QR code aur zameen naap — free, aur aapki photo/document phone se bahar nahi jaate.", h1: "🧰 Free Tools", lead: "Form, print aur roz ke kaam ke chhote tools. Sab aapke phone ke browser mein hi chalte hain — photo ya document kisi server par upload nahi hote.", more: "<h2>Aapki files, aapke paas</h2><p>Yeh tools poori tarah aapke phone/browser mein hi chalte hain (kuch tools apni chhoti library ek baar download karte hain). Aapki photo ya document (Aadhaar, marksheet, certificate) kisi server par nahi jaate, kahin save nahi hote, aur hum unhe dekh bhi nahi sakte. Page band karte hi sab mit jaata hai. Ek baar khulne ke baad zyadatar tools bina internet ke bhi chalte hain.</p><h2>Kiske kaam ke</h2><p>Online form bharne wale students (photo ka size aur KB), naukri ya admission ke liye documents ki PDF, dukaan ke product ki saaf photo, ya bas naya look try karne ke liye. Har tool free hai, bina login aur bina watermark.</p><p>Dhyan dein: har form/office ke apne niyam hote hain (size, background, KB) — bhejne se pehle unke niyam zaroor padh lein.</p>" },
    stories: {
      title: 'Sone se Pehle ki Chhoti Kahaniyan — Bachchon ki Moral Stories | NextGrade',
      desc: 'Bachchon ko raat mein sulaane ke liye 2-3 minute ki chhoti moral kahaniyan — Panchatantra, Akbar-Birbal, Tenali Raman, Mulla Nasruddin. Phone se padh ke sunwao, night mode aur sleep timer ke saath.',
      h1: '🌙 Sone se pehle ki kahaniyan',
      lead: 'Bachchon ko raat mein sunaane ke liye 2-3 minute ki chhoti kahaniyan, har kahani ke ant mein ek chhoti seekh. Thak gayi ho to "Sunao" dabao — phone khud kahani padh ke sunaayega.',
      momH: 'Maa ke liye chhoti madad',
      momP: '🔊 Sunao — phone khud kahani padhta hai. 🌙 Night mode — andheri screen, bade akshar, taaki bachche ki aankh pe roshni na pade. ⏲️ Sleep timer — 5/10/15 minute baad awaaz apne aap band aur screen andheri.',
      minutes: (n) => `${n} minute`, seekh: '🌟 Seekh', listen: '🔊 Sunao', pause: '⏸️ Roko', resume: '▶️ Aage sunao', stop: '⏹️ Band', night: '🌙 Night mode', day: '☀️ Day mode',
      timer: 'Sleep timer', timerOff: 'Timer band', timerMin: (n) => `${n} minute`, next: 'Agli kahani →', prev: '← Pichhli kahani', all: 'Saari kahaniyan',
      goodnight: '🌙 Shubh raatri', goodnightSub: 'Screen pe tap karke waapas aao',
      noVoice: 'Is phone/browser mein is bhasha ki awaaz nahi mili — koi doosri bhasha chuno ya khud padh ke sunao.',
      share: '📲 WhatsApp pe bhejo', shareText: (t, u) => `Aaj raat bachchon ko ye kahani sunao: "${t}" 🌙\n${u}`,
      moreH: 'Aur kahaniyan',
    },
    footer: 'Tyoharon ki jaankari, wishes aur chhote kaam ke apps.',
    langLabel: 'Bhasha',
    home: {
      title: 'NextGrade — Kahaniyan, Nibandh, Tyohar, Bachchon ki Padhai, Games aur Free Tools',
      desc: 'Bachchon ki kahaniyan, nibandh aur bhashan, ginti-pahade-barakhadi awaaz ke saath, tyohar aur wishes, Calendar 2027, desi games, aur free tools — shaadi card, biodata, calculators, PDF aur photo tools. Hindi, English, Hinglish aur Bangla mein.',
      h1: 'Kahaniyan, padhai, tyohar, games aur kaam ke free tools — ek jagah',
      lead: 'Bachchon ke liye kahaniyan, nibandh, bhashan aur awaaz ke saath ginti-pahade; har tyohar ki poori jaankari aur wishes; desi games; aur roz kaam aane wale free tools — sab aapke phone mein, bina login ke.',
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
      more: `<h2>Game kaise khelein</h2><p>Kisi bhi game ke card pe tap karo — game seedha browser mein khul jaata hai, kuch download nahi karna padta. Har game 45 second se 5 minute ka hai, isliye chhote break mein bhi khela ja sakta hai. Game khatam hone pe apna naam daal ke "Challenge bhejo" dabao; dost ko jo link milega usmein aapka score dikhega aur wo use haraane ki koshish kar sakta hai.</p>
<h2>Bachchon aur parivaar ke liye</h2><p>Hamare games mein koi hinsa, jua ya in-app kharidaari nahi hai. Awaaz hamesha aapki marzi se chalu hoti hai. Best score sirf aapke phone mein save hota hai — hum koi account, email ya phone number nahi maangte.</p>
<h2>Offline aur install</h2><p>Ek baar kholne ke baad zyadatar games bina internet ke bhi chalte hain. Chaho to browser menu se "Add to Home screen" chun ke inhe app ki tarah install kar sakte ho.</p>`,
      title: 'Tyoharon ke Free Games | NextGrade',
      desc: 'Tyoharon pe bane chhote, free browser games — phone pe khelo, install karo aur doston ko WhatsApp pe score ka challenge bhejo. Koi sign-up nahi.',
      h1: '🎮 Tyoharon ke games',
      lead: 'Har tyohar pe ek chhota, mazedaar game — phone pe seedha khelo, score banao aur WhatsApp pe doston ko challenge bhejo. Games aapke phone mein hi chalte hain; hum koi account ya personal jaankari nahi lete.',
      soonH: 'Jaldi aa rahe hain', soonP: 'Diwali pe diye jalao, Holi ke rang, Eid pe Eidi game aur rakhi design. 🪔🎨🌙🪢', tag: (t) => `${t} game`,
    },
    apps: {
      more: `<h2>Ye apps kyun banaye</h2><p>Roz ke chhote kaam — jaise kisko kitne paise diye, mahine mein kahan kitna kharcha hua, ya kisi ko sundar wish card bhejna — inke liye bhaari app download karne ya account banane ki zaroorat nahi honi chahiye. Hamare web apps kuch hi second mein khulte hain, phone mein bahut kam jagah lete hain aur saste phone pe bhi aaraam se chalte hain.</p>
<h2>Aapka data aapke paas</h2><p>Hisab Kitab aapka poora hisaab aapke hi phone ke browser mein rakhta hai; chaho to aap iska backup file ke roop mein le sakte ho. Wish Card Maker aapka naam ya message kisi server pe nahi bhejta. Dhyaan rakho: browser ka data mitaane pe app ka data bhi mit sakta hai, isliye zaroori hisaab ka backup rakho.</p>`,
      title: 'Free Apps aur Tools | NextGrade',
      desc: 'NextGrade ke free web apps — Hisab Kitab (kharche aur udhaar ka hisaab) aur Wish Card Maker. Phone pe install hote hain, bina sign-up ke chalte hain.',
      h1: 'Free apps aur tools',
      lead: 'Chhote, halke aur free web apps jo phone pe app ki tarah install ho jaate hain. Zyadatar apps aapka data aapke hi phone pe rakhte hain.',
      installH: 'Install kaise karein',
      installP: 'Android pe Chrome mein app kholo aur menu (⋮) se <b>Install app / Add to Home screen</b> chuno. iPhone pe Safari mein Share button daba ke <b>Add to Home Screen</b> chuno.',
    },
    about: {
      title: 'NextGrade ke baare mein', desc: 'NextGrade ke baare mein — hum kaun hain, ye site kyun banayi aur hamari jaankari kahan se aati hai.',
      html: (contact) => `<p class="lead">NextGrade (nextgrade.in) Bharat mein bani ek chhoti, independent website hai.</p>
<h2>Hum kya karte hain</h2>
<p>Hum teen tarah ki cheezein banate hain: <b>tyoharon ki simple aur bharosemand jaankari</b> — kahani, mahatva, parampara, pakwan aur wishes; <b>tyoharon ke chhote games</b>; aur <b>free web apps</b>, jaise kharche aur udhaar ka hisaab rakhne wala Hisab Kitab aur Wish Card Maker. Site Hindi, English, Hinglish aur Bangla mein hai.</p>
<h2>Hamari jaankari</h2>
<p>Tyoharon ke pages aam taur pe maani jaane wali paramparaon, dharmik granthon ki mashhoor kathaon aur public sources pe based hain. Jin tyoharon ki tareekh tithi se tay hoti hai, unke liye hum mahina aur tithi likhte hain, kyunki English tareekh har saal badalti hai. Koi galti dikhe to <a href="${contact}">hamein batao</a> — hum jaldi theek karenge.</p>
<h2>Hamare apps aur aapka data</h2>
<p>Hum kisi server ya database mein aapki jaankari nahi rakhte. Apps aapka data aapke hi device pe rakhte hain, aur Wish Card Maker aapka naam ya message kahin nahi bhejta — card aapke browser mein hi banta hai.</p>
<h2>Yahan aapko kya milega</h2>
<ul>
<li><a href="${contact.replace('contact/', '')}festivals/">Tyoharon ki guide</a> — Christmas se Diwali tak har bade tyohar ki kahani, mahatva, reeti-riwaaz, pakwan aur aksar puchhe jaane wale sawaal.</li>
<li><a href="${contact.replace('contact/', '')}wishes/">Wishes</a> — Good Morning, birthday, anniversary, Jumma Mubarak jaise roz ke mauko ke liye hamare apne likhe message, copy aur WhatsApp button ke saath.</li>
<li><a href="${contact.replace('contact/', '')}kahani/">Kahaniyan</a> — Panchatantra, Akbar-Birbal, Tenali Raman jaisi purani kahaniyan, hamare apne shabdon mein, awaaz mein sunne aur night mode ke saath.</li>
<li><a href="${contact.replace('contact/', '')}islamic-calendar/">Islamic calendar</a>, <a href="${contact.replace('contact/', '')}games/">tyoharon ke games</a>, naam wale animated wish aur <a href="${contact.replace('contact/', '')}wish-card/">Wish Card Maker</a>.</li>
</ul>
<h2>Hum kaise likhte hain</h2>
<p>Har page hum khud likhte hain — kisi doosri website ya kitaab se copy nahi karte. Likhne se pehle hum kai public sources, panchang aur dharmik paramparaon ki jaani-maani baatein mila kar dekhte hain. Jahan alag-alag ilaakon mein alag maanyataayein hain, wahan hum ye saaf likhte hain. Dharmik vishayon pe hum izzat ke saath aur bina kisi paksh ke likhte hain, aur tareekhon ke liye hamesha local panchang, Gurdwara, masjid ya church se confirm karne ki salaah dete hain.</p>
<h2>Ads aur kharcha</h2>
<p>NextGrade poori tarah free hai. Site chalane ka kharcha Google AdSense ke ads se nikalta hai. Ads kabhi game ya card ke upar nahi aate, aur hum kisi se bhi ads pe click karne ko nahi kehte. Zyada jaankari ke liye <a href="/privacy-policy/">Privacy Policy</a> dekho.</p>
<h2>Sudhaar aur sujhav</h2>
<p>Hum har saal tyoharon ki tareekhein aur jaankari dobara check karte hain. Agar aapko koi galti, purani jaankari ya kisi nayi kahani/tyohar ka sujhav dena hai, to <a href="${contact}">contact page</a> se hamein likho — har email padha jaata hai.</p>`,
    },
    contact: {
      title: 'Sampark karein', desc: 'NextGrade se sampark karo — sujhav, galti ki soochna ya app se juda sawaal.',
      html: (email) => `<p class="lead">Sujhav, kisi page mein galti, ya kisi app se juda sawaal — hamein email karo.</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>Hum aam taur pe 2-3 working days mein jawaab dete hain. Email mein password, OTP ya bank ki jaankari kabhi mat bhejna.</p>
<h2>Kin baaton ke liye likho</h2>
<ul>
<li><b>Galti ki soochna</b> — kisi tyohar ki tareekh, kahani ya jaankari mein galti ho to page ka link aur sahi jaankari bhejo.</li>
<li><b>Sujhav</b> — koi tyohar, kahani, wish ya game jo aap yahan dekhna chahte ho.</li>
<li><b>App ya game mein dikkat</b> — phone ka naam, browser (Chrome/Safari) aur kya hua, ye likho.</li>
<li><b>Copyright ya content se judi shikayat</b> — page ka link aur apni baat saaf-saaf likho, hum jaldi action lenge.</li>
<li><b>Partnership ya business ki baat</b> — school, sanstha ya brand ke saath kaam ke liye.</li>
</ul>
<h2>Hamare baare mein</h2>
<p>NextGrade Bharat se chalayi jaane wali ek independent website hai. Hum koi phone number ya office address public nahi karte; email hi hum tak pahunchne ka sabse pakka tareeka hai. Hamare baare mein aur jaanne ke liye <a href="../about/">About page</a> dekho.</p>`,
    },
  },

  bn: {
    langName: 'বাংলা',
    nav: { home: 'হোম', stories: 'গল্প', wishes: 'শুভেচ্ছা', festivals: 'উৎসব', games: 'গেম', card: 'উইশ কার্ড', apps: 'অ্যাপ', about: 'আমাদের কথা', tools: 'টুলস', calc: 'ক্যালকুলেটর', naam: 'নাম', ff: 'ফুল ফর্ম' },
    tools: { title: "বিনামূল্যের ছবি ও ডকুমেন্ট টুলস — কিছু আপলোড হয় না | NextGrade", desc: "ছবি আর PDF যেকোনো KB-তে ছোট করা, JPG থেকে PDF, PDF জোড়া, ফর্মের ছবি-সই, টাইপিং টেস্ট, QR কোড আর জমির মাপ — বিনামূল্যে, আর তোমার ছবি/ডকুমেন্ট ফোনের বাইরে যায় না।", h1: "🧰 বিনামূল্যের টুলস", lead: "ফর্ম, প্রিন্ট আর রোজের কাজের ছোট টুলস। সব তোমার ফোনের ব্রাউজারেই চলে — ছবি বা ডকুমেন্ট কোনো সার্ভারে আপলোড হয় না।", more: "<h2>তোমার ফাইল তোমার কাছেই</h2><p>এই টুলস পুরোপুরি তোমার ফোন/ব্রাউজারের ভেতরেই চলে (কিছু টুল নিজের ছোট লাইব্রেরি একবার ডাউনলোড করে)। তোমার ছবি বা ডকুমেন্ট (আধার, মার্কশিট, সার্টিফিকেট) কোনো সার্ভারে যায় না, কোথাও সেভ হয় না, আমরা দেখতেও পাই না। পেজ বন্ধ করলেই সব মুছে যায়। প্রথমবারের পর বেশিরভাগ টুল ইন্টারনেট ছাড়াও চলে।</p><h2>কাদের কাজে লাগবে</h2><p>অনলাইন ফর্ম ভরা ছাত্রছাত্রী (ছবির মাপ আর KB), চাকরি বা ভর্তির জন্য ডকুমেন্টের PDF, দোকানের প্রোডাক্টের পরিষ্কার ছবি, বা নতুন লুক দেখার জন্য। প্রতিটা টুল বিনামূল্যে, লগইন আর ওয়াটারমার্ক ছাড়া।</p><p>খেয়াল রেখো: প্রতিটা ফর্ম/অফিসের নিজের নিয়ম থাকে (মাপ, ব্যাকগ্রাউন্ড, KB) — পাঠানোর আগে অবশ্যই পড়ে নাও।</p>" },
    stories: {
      title: 'ঘুমপাড়ানি ছোট গল্প — ছোটদের নীতিকথার গল্প | NextGrade',
      desc: 'ছোটদের রাতে ঘুম পাড়ানোর জন্য ২-৩ মিনিটের ছোট নীতিকথার গল্প — পঞ্চতন্ত্র, আকবর-বীরবল, তেনালি রামন, মোল্লা নাসিরুদ্দিন। ফোনে পড়ে শোনাও, নাইট মোড আর স্লিপ টাইমার সহ।',
      h1: '🌙 ঘুমপাড়ানি গল্প',
      lead: 'রাতে ছোটদের শোনানোর জন্য ২-৩ মিনিটের ছোট গল্প, প্রতিটির শেষে একটা ছোট্ট শিক্ষা। ক্লান্ত লাগলে "শোনাও" চাপো — ফোন নিজেই গল্প পড়ে শোনাবে।',
      momH: 'মায়েদের জন্য একটু সাহায্য',
      momP: '🔊 শোনাও — ফোন নিজেই গল্প পড়ে। 🌙 নাইট মোড — অন্ধকার স্ক্রিন, বড় অক্ষর, যাতে শিশুর চোখে আলো না লাগে। ⏲️ স্লিপ টাইমার — ৫/১০/১৫ মিনিট পরে আওয়াজ নিজে থেকেই বন্ধ আর স্ক্রিন অন্ধকার।',
      minutes: (n) => `${n} মিনিট`, seekh: '🌟 শিক্ষা', listen: '🔊 শোনাও', pause: '⏸️ থামাও', resume: '▶️ আবার শোনাও', stop: '⏹️ বন্ধ', night: '🌙 নাইট মোড', day: '☀️ দিনের মোড',
      timer: 'স্লিপ টাইমার', timerOff: 'টাইমার বন্ধ', timerMin: (n) => `${n} মিনিট`, next: 'পরের গল্প →', prev: '← আগের গল্প', all: 'সব গল্প',
      goodnight: '🌙 শুভরাত্রি', goodnightSub: 'স্ক্রিনে ট্যাপ করে ফিরে এসো',
      noVoice: 'এই ফোন/ব্রাউজারে এই ভাষার আওয়াজ পাওয়া যায়নি — অন্য ভাষা বেছে নাও বা নিজে পড়ে শোনাও।',
      share: '📲 WhatsApp-এ পাঠাও', shareText: (t, u) => `আজ রাতে ছোটদের এই গল্পটা শোনাও: "${t}" 🌙\n${u}`,
      moreH: 'আরও গল্প',
    },
    footer: 'উৎসবের কথা, শুভেচ্ছা আর ছোট কাজের অ্যাপ।',
    langLabel: 'ভাষা',
    home: {
      title: 'NextGrade — গল্প, রচনা, উৎসব, ছোটদের পড়া, গেম আর ফ্রি টুলস',
      desc: 'ছোটদের গল্প, রচনা আর বক্তৃতা, আওয়াজসহ বর্ণমালা আর নামতা, উৎসব আর শুভেচ্ছা, ক্যালেন্ডার ২০২৭, দেশি গেম আর ফ্রি টুলস — বিয়ের কার্ড, বায়োডাটা, ক্যালকুলেটর, PDF আর ছবির টুল। বাংলা, হিন্দি, English আর Hinglish-এ।',
      h1: 'গল্প, পড়াশোনা, উৎসব, গেম আর কাজের ফ্রি টুলস — এক জায়গায়',
      lead: 'ছোটদের জন্য গল্প, রচনা, বক্তৃতা আর আওয়াজসহ বর্ণমালা-নামতা; প্রতিটি উৎসবের পুরো কথা আর শুভেচ্ছা; দেশি গেম; আর রোজকার কাজের ফ্রি টুলস — সব তোমার ফোনে, লগইন ছাড়াই।',
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
      more: `<h2>কীভাবে খেলবে</h2><p>যেকোনো গেমের কার্ডে ট্যাপ করো — গেম সরাসরি ব্রাউজারে খুলে যায়, কিছু ডাউনলোড করতে হয় না। প্রতিটি গেম ৪৫ সেকেন্ড থেকে ৫ মিনিটের, তাই ছোট বিরতিতেও খেলা যায়। খেলা শেষে নিজের নাম দিয়ে "চ্যালেঞ্জ পাঠাও" চাপো; বন্ধু যে লিংক পাবে তাতে তোমার স্কোর দেখা যাবে আর সে তা হারানোর চেষ্টা করতে পারবে।</p>
<h2>ছোটদের আর পরিবারের জন্য</h2><p>আমাদের গেমে কোনো হিংসা, জুয়া বা ইন-অ্যাপ কেনাকাটা নেই। আওয়াজ সবসময় তোমার ইচ্ছেয় চালু হয়। সেরা স্কোর শুধু তোমার ফোনেই সেভ থাকে — আমরা কোনো অ্যাকাউন্ট, ইমেল বা ফোন নম্বর চাই না।</p>
<h2>অফলাইন আর ইনস্টল</h2><p>একবার খোলার পর বেশিরভাগ গেম ইন্টারনেট ছাড়াও চলে। চাইলে ব্রাউজারের মেনু থেকে "Add to Home screen" বেছে এগুলো অ্যাপের মতো ইনস্টল করতে পারো।</p>`,
      title: 'উৎসবের ফ্রি গেম | NextGrade',
      desc: 'উৎসব নিয়ে তৈরি ছোট, ফ্রি ব্রাউজার গেম — ফোনে খেলো, ইনস্টল করো আর বন্ধুদের WhatsApp-এ স্কোরের চ্যালেঞ্জ পাঠাও। কোনো সাইন-আপ নেই।',
      h1: '🎮 উৎসবের গেম',
      lead: 'প্রতিটি উৎসবে একটা ছোট, মজার গেম — ফোনের ব্রাউজারেই খেলো, স্কোর করো আর WhatsApp-এ বন্ধুদের চ্যালেঞ্জ পাঠাও। গেমগুলো তোমার ফোনেই চলে; আমরা কোনো অ্যাকাউন্ট বা ব্যক্তিগত তথ্য নিই না।',
      soonH: 'শিগগিরই আসছে', soonP: 'দীপাবলির প্রদীপ জ্বালানো, হোলির রং, ঈদের ঈদি গেম আর রাখি ডিজাইন। 🪔🎨🌙🪢', tag: (t) => `${t} গেম`,
    },
    apps: {
      more: `<h2>কেন এই অ্যাপগুলো বানালাম</h2><p>রোজকার ছোট কাজ — কাকে কত টাকা ধার দিলে, এ মাসে কোথায় কত খরচ হল, বা কাউকে সুন্দর শুভেচ্ছা কার্ড পাঠানো — এর জন্য ভারী অ্যাপ ডাউনলোড বা নতুন অ্যাকাউন্ট খোলার দরকার হওয়া উচিত নয়। আমাদের ওয়েব অ্যাপ কয়েক সেকেন্ডে খোলে, ফোনে খুব কম জায়গা নেয় আর কম দামের ফোনেও স্বচ্ছন্দে চলে।</p>
<h2>তোমার ডেটা তোমার কাছেই</h2><p>হিসাব কিতাব তোমার সব হিসাব তোমার নিজের ফোনের ব্রাউজারে রাখে; চাইলে যেকোনো সময় ব্যাকআপ ফাইল নিতে পারো। উইশ কার্ড মেকার তোমার নাম বা বার্তা কোনো সার্ভারে পাঠায় না। মনে রেখো: ব্রাউজারের ডেটা মুছলে অ্যাপের ডেটাও মুছে যেতে পারে, তাই জরুরি হিসাবের ব্যাকআপ রাখো।</p>`,
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
<p>আমরা কোনো সার্ভার বা ডেটাবেসে তোমার তথ্য রাখি না। অ্যাপগুলো তোমার ডেটা তোমার নিজের ডিভাইসেই রাখে, আর উইশ কার্ড মেকার তোমার নাম বা বার্তা কোথাও পাঠায় না — কার্ড তোমার ব্রাউজারেই তৈরি হয়।</p>
<h2>এখানে কী পাবে</h2>
<ul>
<li><a href="${contact.replace('contact/', '')}festivals/">উৎসবের গাইড</a> — বড়দিন থেকে দীপাবলি পর্যন্ত প্রতিটি বড় উৎসবের গল্প, তাৎপর্য, রীতিনীতি, খাবার আর সাধারণ প্রশ্নের উত্তর।</li>
<li><a href="${contact.replace('contact/', '')}wishes/">শুভেচ্ছা</a> — সুপ্রভাত, জন্মদিন, বিবাহবার্ষিকী, জুম্মা মুবারকের মতো রোজকার মুহূর্তের জন্য আমাদের নিজেদের লেখা বার্তা, কপি আর WhatsApp বোতাম সহ।</li>
<li><a href="${contact.replace('contact/', '')}kahani/">গল্প</a> — পঞ্চতন্ত্র, আকবর-বীরবল, তেনালি রামের মতো পুরোনো গল্প, আমাদের নিজের ভাষায়, পড়ে শোনানো আর নাইট মোড সহ।</li>
<li><a href="${contact.replace('contact/', '')}islamic-calendar/">ইসলামি ক্যালেন্ডার</a>, <a href="${contact.replace('contact/', '')}games/">উৎসবের গেম</a>, নামের অ্যানিমেটেড উইশ আর <a href="${contact.replace('contact/', '')}wish-card/">উইশ কার্ড মেকার</a>।</li>
</ul>
<h2>আমরা কীভাবে লিখি</h2>
<p>প্রতিটি পাতা আমরা নিজেরা লিখি — অন্য কোনো ওয়েবসাইট বা বই থেকে কপি করি না। লেখার আগে আমরা একাধিক সর্বজনীন সূত্র, পঞ্জিকা আর ধর্মীয় ঐতিহ্যের সুপরিচিত কথা মিলিয়ে দেখি। যেখানে অঞ্চলভেদে রীতি আলাদা, সেখানে তা স্পষ্ট করে লিখি। ধর্মীয় বিষয়ে আমরা শ্রদ্ধার সঙ্গে ও নিরপেক্ষভাবে লিখি, আর তারিখের জন্য সবসময় স্থানীয় পঞ্জিকা, গুরুদ্বার, মসজিদ বা গির্জা থেকে মিলিয়ে নিতে বলি।</p>
<h2>বিজ্ঞাপন আর খরচ</h2>
<p>NextGrade সম্পূর্ণ বিনামূল্যে। সাইট চালানোর খরচ ওঠে Google AdSense-এর বিজ্ঞাপন থেকে। বিজ্ঞাপন কখনো গেম বা কার্ডের ওপর বসানো হয় না, আর আমরা কাউকে বিজ্ঞাপনে ক্লিক করতে বলি না। বিস্তারিত জানতে <a href="/privacy-policy/">Privacy Policy</a> দেখো।</p>
<h2>সংশোধন আর পরামর্শ</h2>
<p>আমরা প্রতি বছর উৎসবের তারিখ আর তথ্য আবার যাচাই করি। কোনো ভুল, পুরোনো তথ্য, বা নতুন গল্প/উৎসবের পরামর্শ থাকলে <a href="${contact}">যোগাযোগ পাতা</a> থেকে আমাদের লেখো — প্রতিটি ইমেল পড়া হয়।</p>`,
    },
    contact: {
      title: 'যোগাযোগ', desc: 'NextGrade-এর সঙ্গে যোগাযোগ — পরামর্শ, ভুলের খবর বা অ্যাপ নিয়ে প্রশ্ন।',
      html: (email) => `<p class="lead">পরামর্শ, কোনো পাতায় ভুল, বা কোনো অ্যাপ নিয়ে প্রশ্ন — আমাদের ইমেল করো।</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
<p>আমরা সাধারণত ২-৩ কাজের দিনের মধ্যে উত্তর দিই। ইমেলে কখনো পাসওয়ার্ড, OTP বা ব্যাংকের তথ্য পাঠিও না।</p>
<h2>কী নিয়ে লিখবে</h2>
<ul>
<li><b>ভুলের খবর</b> — কোনো উৎসবের তারিখ, গল্প বা তথ্যে ভুল থাকলে পাতার লিংক আর সঠিক তথ্য পাঠাও।</li>
<li><b>পরামর্শ</b> — কোনো উৎসব, গল্প, শুভেচ্ছা বা গেম যা তুমি এখানে দেখতে চাও।</li>
<li><b>অ্যাপ বা গেমে সমস্যা</b> — ফোনের মডেল, ব্রাউজার (Chrome/Safari) আর কী হয়েছে তা লেখো।</li>
<li><b>কপিরাইট বা কনটেন্ট নিয়ে অভিযোগ</b> — পাতার লিংক আর পরিষ্কার বিবরণ পাঠাও, আমরা তাড়াতাড়ি ব্যবস্থা নেব।</li>
<li><b>অংশীদারি বা ব্যবসা</b> — স্কুল, সংস্থা বা ব্র্যান্ডের সঙ্গে কাজের জন্য।</li>
</ul>
<h2>আমাদের সম্পর্কে</h2>
<p>NextGrade ভারত থেকে চালানো একটি স্বাধীন ওয়েবসাইট। আমরা কোনো ফোন নম্বর বা অফিসের ঠিকানা প্রকাশ করি না; ইমেলই আমাদের কাছে পৌঁছনোর সবচেয়ে নির্ভরযোগ্য উপায়। আরও জানতে <a href="../about/">আমাদের কথা</a> পাতা দেখো।</p>`,
    },
  },
};

export { ui };
