/**
 * Tiranga (national flag) rules page (28 Nov 2026, plan §Z1): /tiranga-niyam/ in hi, en, bn. Our own summary of the
 * Flag Code of India, 2002 (amended 30 Dec 2021: machine-made and polyester flags allowed; 20 Jul 2022: flag may fly day
 * and night when hoisted in the open or on a house) and the Prevention of Insults to National Honour Act, 1971.
 */
const C = {
  hi: {
    t: 'तिरंगा फहराने के नियम — घर, स्कूल, गाड़ी पर झंडा लगाने के नियम (ध्वज संहिता 2002) | NextGrade', d: 'राष्ट्रीय ध्वज तिरंगा फहराने के नियम आसान भाषा में: ध्वज संहिता 2002 और 2022 के बदलाव, घर पर रात में झंडा, सही तरीक़ा, क्या न करें, फटा झंडा कैसे हटाएँ, स्कूल में ध्वजारोहण — FAQ के साथ।',
    h1: '🇮🇳 तिरंगा फहराने के नियम (घर, स्कूल और कार्यक्रम)', lead: 'भारत की ध्वज संहिता 2002 के ज़रूरी नियम आसान भाषा में — 26 जनवरी, 15 अगस्त या "हर घर तिरंगा" पर झंडा लगाने से पहले पढ़ लें।',
    sec: [
      ['तिरंगे की बनावट', ['लंबाई और चौड़ाई का अनुपात 3:2 होता है।', 'ऊपर केसरिया, बीच में सफ़ेद, नीचे हरा — तीनों पट्टियाँ बराबर चौड़ाई की।', 'सफ़ेद पट्टी के बीच नेवी ब्लू (गहरा नीला) अशोक चक्र, जिसमें 24 तीलियाँ होती हैं।', '2021 के बदलाव के बाद हाथ से बुने खादी के अलावा मशीन से बना, सूती, ऊनी, रेशमी और पॉलिएस्टर का झंडा भी इस्तेमाल हो सकता है।']],
      ['घर पर झंडा', ['आम नागरिक हर दिन, किसी भी अवसर पर सम्मान के साथ तिरंगा फहरा सकते हैं।', 'जुलाई 2022 के बदलाव के बाद घर या खुले में लगा झंडा दिन और रात दोनों में फहराया जा सकता है।', 'झंडा हमेशा सबसे ऊँची और सम्मान की जगह पर हो; केसरिया पट्टी ऊपर रहे।', 'फटा, मैला या उल्टा झंडा न लगाएँ।']],
      ['स्कूल और कार्यक्रम में', ['ध्वजारोहण के समय सब सावधान की मुद्रा में खड़े हों और झंडे की ओर मुँह करें।', 'झंडा तेज़ी से ऊपर चढ़ाया जाता है और धीरे-धीरे सम्मान से उतारा जाता है।', 'ध्वजारोहण के बाद राष्ट्रगान गाया जाता है।', 'मंच पर झंडा वक्ता के दाहिनी ओर रखा जाता है; दीवार पर लंबवत लगाएँ तो केसरिया पट्टी देखने वाले के बाईं ओर रहे।']],
      ['क्या न करें', ['झंडे को ज़मीन या पानी को न छूने दें।', 'झंडे पर कुछ लिखें या छापें नहीं; उसे सजावट के कपड़े, मेज़पोश, रूमाल, तकिए या कमर के नीचे पहने जाने वाले कपड़े की तरह इस्तेमाल न करें।', 'किसी चीज़ को लपेटने या ढकने के लिए झंडे का इस्तेमाल न करें (राजकीय/सैन्य अंतिम संस्कार इसका अपवाद है)।', 'झंडा आधा झुकाना सिर्फ़ सरकार के आदेश पर होता है, अपने मन से नहीं।']],
      ['फटा या पुराना झंडा', ['फटा या ख़राब झंडा अकेले में, सम्मान के साथ नष्ट करें — जैसे आदर से जलाकर या कोई और सम्मानजनक तरीक़ा।', 'कागज़ के झंडे कार्यक्रम के बाद ज़मीन पर न फेंकें; इकट्ठा करके सम्मान से निपटाएँ।']],
    ],
    law: 'राष्ट्रीय ध्वज, संविधान या राष्ट्रगान का सार्वजनिक रूप से अपमान "राष्ट्रीय सम्मान अपमान निवारण अधिनियम, 1971" के तहत अपराध है, जिसमें तीन साल तक की जेल या जुर्माना या दोनों हो सकते हैं।',
    faq: [['क्या रात में घर पर तिरंगा लगा रह सकता है?', 'हाँ। जुलाई 2022 के बदलाव के बाद खुले में या घर पर लगा झंडा दिन-रात फहराया जा सकता है।'], ['क्या पॉलिएस्टर का झंडा लगा सकते हैं?', 'हाँ। दिसंबर 2021 से मशीन से बने और पॉलिएस्टर के झंडे की भी अनुमति है।'], ['तिरंगे का अनुपात क्या है?', 'लंबाई और चौड़ाई का अनुपात 3:2।'], ['अशोक चक्र में कितनी तीलियाँ होती हैं?', '24 तीलियाँ; रंग नेवी ब्लू।'], ['पुराना झंडा कैसे हटाएँ?', 'अकेले में, सम्मान के साथ — जैसे आदर से जलाकर; कूड़े में न फेंकें।']],
    src: 'आधार: भारत की ध्वज संहिता, 2002 (गृह मंत्रालय) और उसके 2021 व 2022 के संशोधन। नियम बदल सकते हैं — सरकारी कार्यक्रम के लिए गृह मंत्रालय के निर्देश देखें।',
    rel: ['राष्ट्रगान अर्थ सहित', '26 जनवरी भाषण', 'मंच संचालन स्क्रिप्ट'],
  },
  en: {
    t: 'Indian Flag Rules — Hoisting the Tiranga at Home, School, on Vehicles (Flag Code 2002) | NextGrade', d: 'Rules for hoisting India’s national flag in simple words: Flag Code 2002 and the 2021–22 changes, flying the flag at night at home, the right way, what not to do, disposing of a damaged flag, school flag hoisting — with FAQ.',
    h1: '🇮🇳 Rules for hoisting the Tiranga (home, school, events)', lead: 'The key rules of the Flag Code of India, 2002 in simple words — read before you put up the flag on 26 January, 15 August or for “Har Ghar Tiranga”.',
    sec: [
      ['How the flag is made', ['Length to height ratio is 3:2.', 'Saffron on top, white in the middle, green at the bottom — three equal bands.', 'In the centre of the white band is the navy-blue Ashoka Chakra with 24 spokes.', 'Since the 2021 change, besides hand-spun khadi, machine-made flags of cotton, wool, silk and polyester are allowed.']],
      ['At home', ['Every citizen may fly the flag with respect on any day and any occasion.', 'Since July 2022, a flag hoisted in the open or on a house may fly day and night.', 'The flag should be in the highest place of honour, saffron band on top.', 'Never fly a torn, dirty or upside-down flag.']],
      ['At school and events', ['During hoisting, everyone stands to attention facing the flag.', 'The flag is hoisted briskly and lowered slowly and respectfully.', 'The national anthem is sung after the flag is hoisted.', 'On a stage the flag is placed on the speaker’s right; when hung vertically on a wall, the saffron band is on the viewer’s left.']],
      ['What not to do', ['Do not let the flag touch the ground or water.', 'Do not write or print anything on it; do not use it as decoration cloth, a tablecloth, handkerchief, cushion or as clothing below the waist.', 'Do not use it to wrap or cover anything (state and military funerals are the exception).', 'The flag is flown at half-mast only on government orders, never on your own.']],
      ['A damaged or old flag', ['Destroy a damaged flag in private and with dignity — for example by burning it respectfully or another dignified way.', 'Do not leave paper flags on the ground after an event; collect them and dispose of them respectfully.']],
    ],
    law: 'Insulting the national flag, the Constitution or the national anthem in public is an offence under the Prevention of Insults to National Honour Act, 1971, punishable with up to three years in prison, a fine, or both.',
    faq: [['Can the flag stay up at home at night?', 'Yes. Since July 2022 a flag hoisted in the open or on a house may fly day and night.'], ['Is a polyester flag allowed?', 'Yes. Since December 2021, machine-made and polyester flags are allowed.'], ['What is the ratio of the Indian flag?', 'Length to height 3:2.'], ['How many spokes does the Ashoka Chakra have?', '24 spokes, in navy blue.'], ['How do I dispose of an old flag?', 'In private and with dignity — for example by burning it respectfully; never in the bin.']],
    src: 'Based on: Flag Code of India, 2002 (Ministry of Home Affairs) with its 2021 and 2022 amendments. Rules can change — for official events follow MHA instructions.',
    rel: ['Jana Gana Mana with meaning', 'Republic Day speech', 'Anchoring script'],
  },
  bn: {
    t: 'জাতীয় পতাকা তোলার নিয়ম — বাড়ি, স্কুল, অনুষ্ঠানে তেরঙা (পতাকা বিধি ২০০২) | NextGrade', d: 'ভারতের জাতীয় পতাকা তোলার নিয়ম সহজ ভাষায়: পতাকা বিধি ২০০২ ও ২০২১–২২-এর বদল, রাতে বাড়িতে পতাকা, সঠিক পদ্ধতি, কী করবেন না, ছেঁড়া পতাকা কীভাবে সরাবেন, স্কুলে পতাকা উত্তোলন — প্রশ্নোত্তরসহ।',
    h1: '🇮🇳 তেরঙা তোলার নিয়ম (বাড়ি, স্কুল, অনুষ্ঠান)', lead: 'ভারতের পতাকা বিধি ২০০২-এর জরুরি নিয়ম সহজ ভাষায় — ২৬ জানুয়ারি, ১৫ আগস্ট বা "হর ঘর তিরঙ্গা"-য় পতাকা লাগানোর আগে পড়ে নিন।',
    sec: [
      ['পতাকার গঠন', ['দৈর্ঘ্য আর প্রস্থের অনুপাত ৩:২।', 'ওপরে গেরুয়া, মাঝে সাদা, নিচে সবুজ — তিনটি সমান চওড়া ফালি।', 'সাদা ফালির মাঝে নেভি ব্লু অশোকচক্র, ২৪টি দণ্ড।', '২০২১-এর বদলের পর হাতে বোনা খাদি ছাড়াও যন্ত্রে তৈরি সুতি, পশম, রেশম আর পলিয়েস্টারের পতাকাও চলে।']],
      ['বাড়িতে পতাকা', ['প্রত্যেক নাগরিক যেকোনো দিন, যেকোনো উপলক্ষে সম্মানের সঙ্গে পতাকা তুলতে পারেন।', 'জুলাই ২০২২-এর বদলের পর খোলা জায়গায় বা বাড়িতে তোলা পতাকা দিনরাত উড়তে পারে।', 'পতাকা থাকবে সবচেয়ে উঁচু, সম্মানের জায়গায়; গেরুয়া ফালি ওপরে।', 'ছেঁড়া, ময়লা বা উল্টো পতাকা লাগাবেন না।']],
      ['স্কুল ও অনুষ্ঠানে', ['পতাকা তোলার সময় সবাই পতাকার দিকে মুখ করে সোজা হয়ে দাঁড়ান।', 'পতাকা দ্রুত তোলা হয়, আর ধীরে, সম্মানের সঙ্গে নামানো হয়।', 'পতাকা তোলার পর জাতীয় সংগীত গাওয়া হয়।', 'মঞ্চে পতাকা বক্তার ডান দিকে থাকে; দেওয়ালে খাড়া করে লাগালে গেরুয়া ফালি দর্শকের বাঁ দিকে থাকে।']],
      ['কী করবেন না', ['পতাকা যেন মাটি বা জল ছোঁয় না।', 'পতাকায় কিছু লিখবেন বা ছাপবেন না; সাজানোর কাপড়, টেবিলক্লথ, রুমাল, বালিশ বা কোমরের নিচের পোশাক হিসেবে ব্যবহার করবেন না।', 'কিছু মোড়ানো বা ঢাকার জন্য পতাকা ব্যবহার করবেন না (রাষ্ট্রীয়/সামরিক শেষকৃত্য ব্যতিক্রম)।', 'অর্ধনমিত পতাকা শুধু সরকারি নির্দেশে, নিজের ইচ্ছায় নয়।']],
      ['ছেঁড়া বা পুরনো পতাকা', ['ছেঁড়া পতাকা একান্তে, সম্মানের সঙ্গে নষ্ট করুন — যেমন সম্মানের সঙ্গে পুড়িয়ে বা অন্য মর্যাদাপূর্ণ উপায়ে।', 'অনুষ্ঠানের পর কাগজের পতাকা মাটিতে ফেলে রাখবেন না; জড়ো করে সম্মানের সঙ্গে সরান।']],
    ],
    law: 'জনসমক্ষে জাতীয় পতাকা, সংবিধান বা জাতীয় সংগীতের অবমাননা "জাতীয় সম্মান অবমাননা প্রতিরোধ আইন, ১৯৭১" অনুযায়ী অপরাধ; তিন বছর পর্যন্ত জেল, জরিমানা বা দুটোই হতে পারে।',
    faq: [['রাতে বাড়িতে পতাকা থাকতে পারে?', 'হ্যাঁ। জুলাই ২০২২ থেকে খোলা জায়গায় বা বাড়িতে তোলা পতাকা দিনরাত উড়তে পারে।'], ['পলিয়েস্টারের পতাকা চলে?', 'হ্যাঁ। ডিসেম্বর ২০২১ থেকে যন্ত্রে তৈরি ও পলিয়েস্টারের পতাকাও চলে।'], ['পতাকার অনুপাত কত?', 'দৈর্ঘ্য আর প্রস্থ ৩:২।'], ['অশোকচক্রে কয়টি দণ্ড?', '২৪টি, নেভি ব্লু রঙের।'], ['পুরনো পতাকা কীভাবে সরাব?', 'একান্তে, সম্মানের সঙ্গে — যেমন সম্মানের সঙ্গে পুড়িয়ে; ডাস্টবিনে নয়।']],
    src: 'ভিত্তি: ভারতের পতাকা বিধি, ২০০২ (স্বরাষ্ট্র মন্ত্রক) ও তার ২০২১ ও ২০২২-এর সংশোধন। নিয়ম বদলাতে পারে — সরকারি অনুষ্ঠানে স্বরাষ্ট্র মন্ত্রকের নির্দেশ মানুন।',
    rel: ['জনগণমন অর্থসহ', '২৬ জানুয়ারির ভাষণ', 'অনুষ্ঠান সঞ্চালনা'],
  },
};

export function buildTiranga(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, U = C[code]; if (!U) return;
  const langs = LANGS.filter((l) => C[l.code]), path = '/tiranga-niyam/';
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: U.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const relPaths = ['/rashtragan/jana-gana-mana/', '/speech/republic-day/', '/manch-sanchalan/26-january/'];
  const rel = U.rel.map((n, i) => (code === 'bn' && i === 2) ? '' : `<a class="tag" href="${P(code === 'bn' && i === 2 ? LANGS[0] : L, relPaths[i])}">${esc(n)}</a>`).join(' ');
  write(L, path, page(L, {
    path, title: U.t, description: U.d, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.h1.replace(/^\S+\s/, ''), path]]), faqLd],
    body: `<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.h1.replace(/^\S+\s/, ''))}</p><h1>${esc(U.h1)}</h1><p class="lead">${esc(U.lead)}</p>
${U.sec.map(([h, list], i) => `<h2>${esc(h)}</h2><ul>${list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>${i === 1 ? '<div class="ad" aria-hidden="true"></div>' : ''}`).join('\n')}
<p class="note">⚖️ ${esc(U.law)}</p>
<h2>FAQ</h2>${U.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<p class="note"><small>${esc(U.src)}</small></p><p class="chips">${rel}</p></div>`,
  }));
}
