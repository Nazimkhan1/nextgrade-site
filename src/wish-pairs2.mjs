// More Hindi–English wish pairs (27 Nov 2026) for the Jan–Mar 2027 festivals — same format as wish-pairs.mjs. Own text.
const H = (hi, en, hinglish, bn) => ({ hi, en, hinglish, bn });
const FAM = H('👨‍👩‍👧 परिवार के लिए', '👨‍👩‍👧 For family', '👨‍👩‍👧 Parivaar ke liye', '👨‍👩‍👧 পরিবারের জন্য');
const FRI = H('🤝 दोस्तों के लिए', '🤝 For friends', '🤝 Doston ke liye', '🤝 বন্ধুদের জন্য');
const OFF = H('💼 ऑफ़िस/सहकर्मियों के लिए', '💼 For colleagues', '💼 Office ke liye', '💼 অফিসের জন্য');
const SHORT = H('✨ छोटी शुभकामनाएँ (स्टेटस)', '✨ Short wishes (status)', '✨ Chhoti wishes (status)', '✨ ছোট শুভেচ্ছা (স্ট্যাটাস)');
export const PAIRS2 = {
  holi: [
    ['family', FAM, [
      ['होली के रंग आपके घर में ख़ुशियाँ और प्यार भर दें। हैप्पी होली!', 'May the colours of Holi fill your home with joy and love. Happy Holi!'],
      ['गुजिया की मिठास और रंगों की बौछार — होली की हार्दिक शुभकामनाएँ।', 'The sweetness of gujiya and a shower of colours — warm Holi wishes.'],
      ['इस होली हर गिला-शिकवा भूलकर गले मिलें। रंगों का त्योहार मुबारक!', 'This Holi, let us forget every complaint and embrace. Happy festival of colours!'],
      ['होलिका की आग में सारी बुराइयाँ जल जाएँ, घर में सिर्फ़ अच्छाई रहे।', 'May every evil burn in the Holika fire and only goodness stay at home.'],
      ['माँ-पापा, आपके आशीर्वाद से हर रंग और भी चमकता है। हैप्पी होली!', 'Maa-Papa, every colour shines brighter with your blessings. Happy Holi!'],
    ]],
    ['friends', FRI, [
      ['बुरा न मानो होली है! रंग लगाने आ रहा हूँ, तैयार रहना। 😄', 'Don’t mind, it’s Holi! I’m coming with colours — be ready. 😄'],
      ['पिचकारी, गुलाल और तेरी दोस्ती — इससे अच्छी होली क्या होगी!', 'Water guns, gulal and your friendship — what better Holi could there be!'],
      ['दोस्ती का रंग कभी फीका न पड़े। हैप्पी होली, यार!', 'May the colour of our friendship never fade. Happy Holi, buddy!'],
      ['इस बार की होली पिछली बार से भी ज़्यादा रंगीन हो!', 'May this Holi be even more colourful than the last!'],
    ]],
    ['office', OFF, [
      ['आपको और आपके परिवार को होली की रंग-बिरंगी शुभकामनाएँ।', 'Colourful Holi wishes to you and your family.'],
      ['यह होली आपके जीवन में नई ऊर्जा और सफलता के रंग भरे।', 'May this Holi fill your life with new energy and the colours of success.'],
      ['सुरक्षित और ख़ुशहाल होली मनाएँ — हैप्पी होली!', 'Have a safe and happy Holi!'],
    ]],
    ['safe', H('🌿 सुरक्षित होली का संदेश', '🌿 Safe Holi messages', '🌿 Surakshit Holi ka sandesh', '🌿 নিরাপদ হোলির বার্তা'), [
      ['प्राकृतिक रंगों से खेलें, पानी बचाएँ — हैप्पी होली!', 'Play with natural colours and save water — Happy Holi!'],
      ['रंग प्यार से लगाएँ, ज़बरदस्ती नहीं। सबकी होली अच्छी हो!', 'Apply colour with love, not by force. Let everyone enjoy Holi!'],
      ['जानवरों पर रंग न डालें — उनकी भी होली ख़ुशहाल हो।', 'Don’t put colour on animals — let their Holi be happy too.'],
    ]],
    ['short', SHORT, [['हैप्पी होली! 🎨', 'Happy Holi! 🎨'], ['रंगों भरी शुभकामनाएँ! 🌈', 'Colourful wishes! 🌈'], ['बुरा न मानो होली है! 😄', 'Don’t mind, it’s Holi! 😄'], ['गुजिया खाइए, रंग लगाइए! 🥟', 'Eat gujiya, play colours! 🥟']]],
  ],
  'eid-ul-fitr': [
    ['ramzan', H('🌙 रमज़ान मुबारक', '🌙 Ramzan Mubarak', '🌙 Ramzan Mubarak', '🌙 রমজান মোবারক'), [
      ['रमज़ान मुबारक! अल्लाह आपके रोज़े और इबादत क़बूल फ़रमाए।', 'Ramzan Mubarak! May Allah accept your fasts and prayers.'],
      ['यह पाक महीना आपके घर में बरकत और सुकून लाए।', 'May this holy month bring blessings and peace to your home.'],
      ['सेहरी की रौनक़ और इफ़्तार की ख़ुशियाँ मुबारक हों।', 'Wishing you the joy of Sehri and the happiness of Iftar.'],
      ['इस रमज़ान दुआओं में हमें भी याद रखिएगा।', 'Please remember us in your prayers this Ramzan.'],
    ]],
    ['family', FAM, [
      ['ईद मुबारक! आपके घर में हमेशा ख़ुशियाँ और बरकत रहे।', 'Eid Mubarak! May your home always be full of happiness and blessings.'],
      ['सेवइयों की मिठास की तरह आपकी ज़िंदगी भी मीठी रहे। ईद मुबारक!', 'May your life be as sweet as the sewaiyan. Eid Mubarak!'],
      ['अल्लाह आपकी हर दुआ क़बूल करे — ईद-उल-फ़ित्र मुबारक।', 'May Allah answer every prayer of yours — Eid ul-Fitr Mubarak.'],
      ['अम्मी-अब्बू, आपकी दुआओं से ही हमारी ईद है। ईद मुबारक!', 'Ammi-Abbu, our Eid is because of your prayers. Eid Mubarak!'],
    ]],
    ['friends', FRI, [
      ['ईद मुबारक दोस्त! ईदी तैयार रखना, मिलने आ रहा हूँ। 😄', 'Eid Mubarak, friend! Keep my Eidi ready, I’m coming over. 😄'],
      ['गले मिलो, गिले भूलो — ईद मुबारक!', 'Embrace and forget the grudges — Eid Mubarak!'],
      ['चाँद की तरह तेरी दोस्ती हमेशा चमकती रहे। ईद मुबारक!', 'May your friendship always shine like the moon. Eid Mubarak!'],
    ]],
    ['office', OFF, [
      ['आपको और आपके परिवार को ईद-उल-फ़ित्र की हार्दिक मुबारकबाद।', 'Warm Eid ul-Fitr greetings to you and your family.'],
      ['यह ईद आपके लिए शांति, सेहत और कामयाबी लाए।', 'May this Eid bring you peace, health and success.'],
    ]],
    ['short', SHORT, [['ईद मुबारक! 🌙', 'Eid Mubarak! 🌙'], ['चाँद मुबारक! ✨', 'Chaand Mubarak! ✨'], ['सेवइयाँ तैयार हैं! 🍜', 'The sewaiyan are ready! 🍜'], ['ख़ुश रहें, आबाद रहें! 🤲', 'Stay happy and blessed! 🤲']]],
  ],
  'maha-shivratri': [
    ['bhakti', H('🙏 भक्ति भरी शुभकामनाएँ', '🙏 Devotional wishes', '🙏 Bhakti bhari wishes', '🙏 ভক্তিময় শুভেচ্ছা'), [
      ['हर हर महादेव! भोलेनाथ आप पर अपनी कृपा बनाए रखें। महाशिवरात्रि की शुभकामनाएँ।', 'Har Har Mahadev! May Bholenath keep blessing you. Happy Maha Shivratri.'],
      ['ॐ नमः शिवाय — इस शिवरात्रि आपके जीवन के सारे कष्ट दूर हों।', 'Om Namah Shivaya — may every trouble in your life end this Shivratri.'],
      ['शिव की भक्ति में ही शक्ति है। महाशिवरात्रि मंगलमय हो।', 'There is strength in devotion to Shiva. Have a blessed Maha Shivratri.'],
      ['भोले बाबा आपकी हर मनोकामना पूरी करें। जय भोलेनाथ!', 'May Bhole Baba fulfil every wish of yours. Jai Bholenath!'],
    ]],
    ['family', FAM, [
      ['शिव-पार्वती का आशीर्वाद हमारे परिवार पर सदा बना रहे।', 'May the blessings of Shiva and Parvati always stay on our family.'],
      ['बेलपत्र, दूध और सच्चे मन से पूजा — महाशिवरात्रि की शुभकामनाएँ।', 'Bel leaves, milk and a pure heart in worship — Maha Shivratri wishes.'],
      ['इस पावन रात आपके घर में शांति और सुख आए।', 'May this holy night bring peace and happiness to your home.'],
    ]],
    ['short', SHORT, [['हर हर महादेव! 🔱', 'Har Har Mahadev! 🔱'], ['ॐ नमः शिवाय 🙏', 'Om Namah Shivaya 🙏'], ['जय भोलेनाथ! 🌙', 'Jai Bholenath! 🌙'], ['महाशिवरात्रि मंगलमय हो! 🪔', 'Have a blessed Maha Shivratri! 🪔']]],
  ],
  lohri: [
    ['family', FAM, [
      ['लोहड़ी की आग में सारे दुख जल जाएँ और ख़ुशियाँ आएँ। हैप्पी लोहड़ी!', 'May every sorrow burn in the Lohri fire and joy arrive. Happy Lohri!'],
      ['रेवड़ी, मूँगफली, गज्जक और अपनों का साथ — लोहड़ी मुबारक!', 'Rewri, peanuts, gajak and your loved ones — Happy Lohri!'],
      ['नई फ़सल की तरह आपके घर में भी बरकत लहलहाए।', 'Like the new harvest, may prosperity grow in your home.'],
      ['पहली लोहड़ी की ढेरों बधाई — नन्हे मेहमान को ख़ूब प्यार!', 'Many congratulations on the first Lohri — lots of love to the little one!'],
    ]],
    ['friends', FRI, [
      ['ढोल बजेगा, भंगड़ा होगा — लोहड़ी पर आ जाना दोस्त!', 'There’ll be dhol and bhangra — come over for Lohri, friend!'],
      ['आग के चारों ओर नाचते रहो, ख़ुश रहो — हैप्पी लोहड़ी!', 'Keep dancing round the fire and stay happy — Happy Lohri!'],
      ['सर्दी की रात, लोहड़ी की आग और दोस्तों का साथ — मज़ा आ जाए!', 'A winter night, the Lohri fire and friends — what fun!'],
    ]],
    ['short', SHORT, [['हैप्पी लोहड़ी! 🔥', 'Happy Lohri! 🔥'], ['लोहड़ी दियाँ लख-लख वधाइयाँ! 🥁', 'Lohri diyan lakh-lakh vadhaiyan! 🥁'], ['रेवड़ी-मूँगफली तैयार! 🥜', 'Rewri and peanuts ready! 🥜']]],
  ],
  'makar-sankranti': [
    ['family', FAM, [
      ['तिल-गुड़ की मिठास आपके रिश्तों में भी घुल जाए। मकर संक्रांति की शुभकामनाएँ।', 'May the sweetness of til-gud melt into your relationships too. Happy Makar Sankranti.'],
      ['सूरज उत्तरायण हो रहा है — आपके जीवन में भी नई रोशनी आए।', 'The sun turns north — may new light enter your life too.'],
      ['खिचड़ी, तिल के लड्डू और पतंगें — संक्रांति मुबारक!', 'Khichdi, til laddoos and kites — happy Sankranti!'],
      ['नई फ़सल, नई उम्मीदें — मकर संक्रांति मंगलमय हो।', 'A new harvest and new hopes — have a blessed Makar Sankranti.'],
    ]],
    ['friends', FRI, [
      ['पतंग ऊँची उड़ाना, पर पेच मुझसे मत लड़ाना! 😄 हैप्पी संक्रांति।', 'Fly your kite high, but don’t pick a fight with mine! 😄 Happy Sankranti.'],
      ['तेरी कामयाबी भी पतंग की तरह आसमान छुए।', 'May your success touch the sky like a kite.'],
      ['तिल-गुड़ खाओ, मीठा-मीठा बोलो!', 'Eat til-gud and speak sweetly!'],
    ]],
    ['short', SHORT, [['हैप्पी मकर संक्रांति! 🪁', 'Happy Makar Sankranti! 🪁'], ['तिल-गुड़ घ्या, गोड गोड बोला! 🍬', 'Til-gud ghya, god god bola! 🍬'], ['ऊँची उड़ान, ऊँचे सपने! ☀️', 'High kites, high dreams! ☀️']]],
  ],
  'republic-day': [
    ['desh', H('🇮🇳 देशभक्ति की शुभकामनाएँ', '🇮🇳 Patriotic wishes', '🇮🇳 Deshbhakti wishes', '🇮🇳 দেশপ্রেমের শুভেচ্ছা'), [
      ['गणतंत्र दिवस की हार्दिक शुभकामनाएँ! संविधान का सम्मान करें, देश को आगे बढ़ाएँ।', 'Happy Republic Day! Respect the Constitution and take the country forward.'],
      ['तिरंगा हमारी शान है — 26 जनवरी मुबारक!', 'The Tricolour is our pride — Happy 26 January!'],
      ['आज़ादी हमें मिली, संविधान ने उसे दिशा दी। जय हिंद!', 'We won freedom, and the Constitution gave it direction. Jai Hind!'],
      ['आइए, एक अच्छे नागरिक बनने का वादा करें। गणतंत्र दिवस मुबारक।', 'Let us promise to be good citizens. Happy Republic Day.'],
      ['वीर जवानों को सलाम, जिनकी वजह से हम सुरक्षित हैं। जय हिंद!', 'A salute to our brave soldiers who keep us safe. Jai Hind!'],
    ]],
    ['school', H('🏫 स्कूल/बच्चों के लिए', '🏫 For school and children', '🏫 School/bachchon ke liye', '🏫 স্কুল/শিশুদের জন্য'), [
      ['प्यारे बच्चो, पढ़-लिखकर देश का नाम रोशन करो। गणतंत्र दिवस की बधाई!', 'Dear children, study well and make the country proud. Happy Republic Day!'],
      ['संविधान हमें बराबरी और अधिकार देता है — और कर्तव्य भी याद दिलाता है।', 'The Constitution gives us equality and rights — and reminds us of our duties.'],
      ['आज झंडा फहराएँ और राष्ट्रगान पूरे सम्मान से गाएँ।', 'Hoist the flag today and sing the national anthem with full respect.'],
    ]],
    ['short', SHORT, [['जय हिंद! 🇮🇳', 'Jai Hind! 🇮🇳'], ['हैप्पी रिपब्लिक डे! 🇮🇳', 'Happy Republic Day! 🇮🇳'], ['मेरा भारत महान! 🇮🇳', 'Mera Bharat Mahan! 🇮🇳']]],
  ],
  'vasant-panchami': [
    ['bhakti', H('🙏 माँ सरस्वती का आशीर्वाद', '🙏 Saraswati blessings', '🙏 Maa Saraswati ka aashirvaad', '🙏 মা সরস্বতীর আশীর্বাদ'), [
      ['माँ सरस्वती आपको विद्या, बुद्धि और विवेक का वरदान दें। बसंत पंचमी की शुभकामनाएँ।', 'May Maa Saraswati bless you with knowledge, wisdom and good sense. Happy Vasant Panchami.'],
      ['पीले फूल, पीले कपड़े और मन में नई उमंग — बसंत पंचमी मुबारक!', 'Yellow flowers, yellow clothes and new joy in the heart — Happy Vasant Panchami!'],
      ['परीक्षा में सफलता मिले, माँ शारदे की कृपा रहे।', 'May you succeed in your exams, with Maa Sharde’s grace.'],
      ['बसंत की बहार आपके जीवन में भी ख़ुशियों के फूल खिलाए।', 'May spring bring flowers of joy into your life too.'],
    ]],
    ['short', SHORT, [['हैप्पी बसंत पंचमी! 🌼', 'Happy Vasant Panchami! 🌼'], ['जय माँ सरस्वती! 🙏', 'Jai Maa Saraswati! 🙏'], ['सरस्वती पूजा की शुभकामनाएँ! 📚', 'Happy Saraswati Puja! 📚']]],
  ],
};
