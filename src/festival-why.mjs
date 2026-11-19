/**
 * "Why is X celebrated?" — one plain question and answer per festival, in our own words, for festivals whose
 * FAQ did not have it yet. Added as the second FAQ item (after "when is it") and in the FAQPage JSON-LD,
 * because search engines and AI assistants answer this question most often.
 * Kept in its own file so festival content files stay untouched.
 */
const WHY = {
  lohri: {
    hi: ['लोहड़ी क्यों मनाई जाती है?', 'लोहड़ी कड़ाके की सर्दी के जाने और रबी की फ़सल (ख़ासकर गन्ने) के पकने की ख़ुशी में मनाई जाती है। लोग अलाव जलाकर अग्नि को धन्यवाद देते हैं और लोक-नायक दुल्ला भट्टी के गीत गाते हैं, जिन्होंने गरीब लड़कियों की मदद की थी।'],
    en: ['Why is Lohri celebrated?', 'Lohri celebrates the end of the harshest winter and the ripening of the rabi crop, especially sugarcane. People light a bonfire to thank the fire and sing songs about Dulla Bhatti, a folk hero remembered for helping poor girls.'],
    hinglish: ['Lohri kyun manaayi jaati hai?', 'Lohri kadaake ki sardi ke jaane aur rabi ki fasal (khaas kar ganne) ke pakne ki khushi mein manaayi jaati hai. Log alaav jala kar agni ko dhanyavaad dete hain aur lok-nayak Dulla Bhatti ke geet gaate hain, jinhone gareeb ladkiyon ki madad ki thi.'],
    bn: ['লোহরি কেন পালন করা হয়?', 'কড়া শীত বিদায় নেওয়া আর রবি ফসল, বিশেষ করে আখ পাকার আনন্দে লোহরি পালন করা হয়। সবাই আগুন জ্বেলে অগ্নিকে ধন্যবাদ জানায় আর লোকনায়ক দুল্লা ভাট্টির গান গায়, যিনি গরিব মেয়েদের সাহায্য করেছিলেন।'],
  },
  'republic-day': {
    hi: ['गणतंत्र दिवस क्यों मनाया जाता है?', 'क्योंकि 26 जनवरी 1950 को भारत का संविधान लागू हुआ और भारत एक संप्रभु, लोकतांत्रिक गणराज्य बना। यह तारीख़ इसलिए चुनी गई क्योंकि 26 जनवरी 1930 को पूर्ण स्वराज का संकल्प लिया गया था।'],
    en: ['Why is Republic Day celebrated?', 'Because the Constitution of India came into force on 26 January 1950 and India became a sovereign, democratic republic. The date was chosen because the pledge of Purna Swaraj (complete independence) was taken on 26 January 1930.'],
    hinglish: ['Gantantra Diwas kyun manaya jaata hai?', 'Kyunki 26 January 1950 ko Bharat ka Samvidhan laagu hua aur Bharat ek samprabhu, loktantrik ganrajya bana. Yeh tareekh isliye chuni gayi kyunki 26 January 1930 ko Poorna Swaraj ka sankalp liya gaya tha.'],
    bn: ['প্রজাতন্ত্র দিবস কেন পালন করা হয়?', 'কারণ ১৯৫০ সালের ২৬ জানুয়ারি ভারতের সংবিধান চালু হয় আর ভারত একটি সার্বভৌম, গণতান্ত্রিক প্রজাতন্ত্র হয়। ১৯৩০ সালের ২৬ জানুয়ারি পূর্ণ স্বরাজের শপথ নেওয়া হয়েছিল বলে এই তারিখটি বেছে নেওয়া হয়।'],
  },
  'maha-shivratri': {
    hi: ['महाशिवरात्रि क्यों मनाई जाती है?', 'महाशिवरात्रि भगवान शिव की आराधना की रात है। मान्यता है कि इसी रात शिव और पार्वती का विवाह हुआ था, और यह भी कि शिव ने इसी रात ज्योतिर्लिंग के रूप में दर्शन दिए थे। भक्त व्रत रखते हैं, शिवलिंग पर जल-बेलपत्र चढ़ाते हैं और रात भर जागरण करते हैं।'],
    en: ['Why is Maha Shivratri celebrated?', 'Maha Shivratri is a night of devotion to Lord Shiva. It is believed to be the night Shiva married Parvati, and also the night he appeared as a pillar of light (jyotirlinga). Devotees fast, offer water and bel leaves to the Shivling and stay awake through the night.'],
    hinglish: ['Mahashivratri kyun manaayi jaati hai?', 'Mahashivratri Bhagwan Shiv ki aaradhana ki raat hai. Maanyata hai ki isi raat Shiv aur Parvati ka vivah hua tha, aur yeh bhi ki Shiv ne isi raat jyotirling ke roop mein darshan diye the. Bhakt vrat rakhte hain, Shivling par jal-belpatra chadhaate hain aur raat bhar jaagran karte hain.'],
    bn: ['মহাশিবরাত্রি কেন পালন করা হয়?', 'মহাশিবরাত্রি ভগবান শিবের আরাধনার রাত। বিশ্বাস করা হয়, এই রাতেই শিব আর পার্বতীর বিয়ে হয়েছিল, আর এই রাতেই শিব জ্যোতির্লিঙ্গ রূপে দেখা দিয়েছিলেন। ভক্তরা উপোস করেন, শিবলিঙ্গে জল আর বেলপাতা দেন আর সারা রাত জেগে থাকেন।'],
  },
  holi: {
    hi: ['होली क्यों मनाई जाती है?', 'होली बुराई पर अच्छाई की जीत और बसंत के आने की ख़ुशी का त्योहार है। होलिका दहन की कथा में भक्त प्रह्लाद आग से बच गए और होलिका जल गई। रंग खेलने की परंपरा राधा-कृष्ण की ब्रज की होली से जुड़ी मानी जाती है।'],
    en: ['Why is Holi celebrated?', 'Holi celebrates the victory of good over evil and the arrival of spring. In the story behind Holika Dahan, the devotee Prahlad survived the fire while Holika was burnt. Playing with colours is linked to the playful Holi of Radha and Krishna in Braj.'],
    hinglish: ['Holi kyun manaayi jaati hai?', 'Holi burai par achhai ki jeet aur basant ke aane ki khushi ka tyohar hai. Holika Dahan ki katha mein bhakt Prahlad aag se bach gaye aur Holika jal gayi. Rang khelne ki parampara Radha-Krishna ki Braj ki Holi se judi maani jaati hai.'],
    bn: ['হোলি (দোল) কেন পালন করা হয়?', 'হোলি অশুভের ওপর শুভের জয় আর বসন্তের আগমনের উৎসব। হোলিকা দহনের কাহিনিতে ভক্ত প্রহ্লাদ আগুন থেকে বেঁচে যান আর হোলিকা পুড়ে যায়। রং খেলার রীতি ব্রজে রাধা-কৃষ্ণের দোলখেলার সঙ্গে যুক্ত। বাংলায় এই দিন দোলযাত্রা হিসেবে পালিত হয়।'],
  },
  'eid-ul-fitr': {
    hi: ['ईद-उल-फ़ित्र क्यों मनाई जाती है?', 'ईद-उल-फ़ित्र रमज़ान के पूरे महीने के रोज़े पूरे होने की ख़ुशी और अल्लाह का शुक्र अदा करने का दिन है। यह शव्वाल महीने की पहली तारीख़ को चाँद दिखने पर मनाई जाती है। नमाज़ से पहले ज़रूरतमंदों को फ़ित्रा (दान) दिया जाता है, ताकि सब ईद मना सकें।'],
    en: ['Why is Eid ul-Fitr celebrated?', 'Eid ul-Fitr marks the end of a full month of fasting in Ramadan and is a day to thank Allah. It falls on the first day of the month of Shawwal, after the new moon is seen. Before the Eid prayer, a charity called fitra is given to the needy so that everyone can celebrate.'],
    hinglish: ['Eid-ul-Fitr kyun manaayi jaati hai?', 'Eid-ul-Fitr Ramzan ke poore mahine ke roze poore hone ki khushi aur Allah ka shukr ada karne ka din hai. Yeh Shawwal mahine ki pehli tareekh ko chaand dikhne par manaayi jaati hai. Namaz se pehle zaroorat-mandon ko fitra (daan) diya jaata hai, taaki sab Eid mana sakein.'],
    bn: ['ঈদ-উল-ফিতর কেন পালন করা হয়?', 'রমজানের পুরো মাস রোজা রাখার পর আনন্দ আর আল্লাহর প্রতি কৃতজ্ঞতা জানানোর দিন ঈদ-উল-ফিতর। শাওয়াল মাসের চাঁদ দেখা গেলে প্রথম দিনে ঈদ হয়। ঈদের নামাজের আগে গরিবদের ফিতরা (দান) দেওয়া হয়, যাতে সবাই ঈদ পালন করতে পারে।'],
  },
  'ram-navami': {
    hi: ['राम नवमी क्यों मनाई जाती है?', 'राम नवमी भगवान श्रीराम के जन्म की ख़ुशी में मनाई जाती है। मान्यता है कि उनका जन्म चैत्र महीने के शुक्ल पक्ष की नवमी को अयोध्या में राजा दशरथ और रानी कौशल्या के घर हुआ था। इसी दिन चैत्र नवरात्रि भी पूरी होती है।'],
    en: ['Why is Ram Navami celebrated?', 'Ram Navami celebrates the birth of Lord Rama. He is believed to have been born on the ninth day of the bright half of the month of Chaitra, in Ayodhya, to King Dasharatha and Queen Kaushalya. Chaitra Navratri also ends on this day.'],
    hinglish: ['Ram Navami kyun manaayi jaati hai?', 'Ram Navami Bhagwan Shri Ram ke janm ki khushi mein manaayi jaati hai. Maanyata hai ki unka janm Chaitra mahine ke shukla paksh ki navami ko Ayodhya mein Raja Dashrath aur Rani Kaushalya ke ghar hua tha. Isi din Chaitra Navratri bhi poori hoti hai.'],
    bn: ['রাম নবমী কেন পালন করা হয়?', 'ভগবান শ্রীরামের জন্মের আনন্দে রাম নবমী পালন করা হয়। বিশ্বাস, চৈত্র মাসের শুক্লপক্ষের নবমীতে অযোধ্যায় রাজা দশরথ আর রানি কৌশল্যার ঘরে তাঁর জন্ম হয়েছিল। এই দিনেই বাসন্তী বা চৈত্র নবরাত্রি শেষ হয়।'],
  },
  'guru-nanak-jayanti': {
    hi: ['गुरु नानक जयंती क्यों मनाई जाती है?', 'गुरु नानक जयंती (प्रकाश पर्व) सिखों के पहले गुरु, गुरु नानक देव जी के जन्म की याद में मनाई जाती है। उन्होंने एक ईश्वर, सबकी बराबरी, ईमानदारी की कमाई और मिल-बाँटकर खाने (लंगर) की सीख दी। यह कार्तिक पूर्णिमा को मनाई जाती है।'],
    en: ['Why is Guru Nanak Jayanti celebrated?', 'Guru Nanak Jayanti (Prakash Purab) marks the birth of Guru Nanak Dev Ji, the first Sikh Guru. He taught belief in one God, equality of all people, honest work and sharing food with everyone (langar). It is celebrated on Kartik Purnima.'],
    hinglish: ['Guru Nanak Jayanti kyun manaayi jaati hai?', 'Guru Nanak Jayanti (Prakash Purab) Sikhon ke pehle Guru, Guru Nanak Dev Ji ke janm ki yaad mein manaayi jaati hai. Unhone ek Ishwar, sabki barabari, imaandaari ki kamaai aur mil-baant kar khaane (langar) ki seekh di. Yeh Kartik Purnima ko manaayi jaati hai.'],
    bn: ['গুরু নানক জয়ন্তী কেন পালন করা হয়?', 'শিখদের প্রথম গুরু, গুরু নানক দেবজির জন্মদিন স্মরণে গুরু নানক জয়ন্তী (প্রকাশ পর্ব) পালন করা হয়। তিনি এক ঈশ্বর, সব মানুষের সমান অধিকার, সৎ পরিশ্রম আর সবার সঙ্গে ভাগ করে খাওয়ার (লঙ্গর) শিক্ষা দিয়েছিলেন। কার্তিক পূর্ণিমায় এই দিনটি পালিত হয়।'],
  },
  'chhath-puja': {
    hi: ['छठ पूजा क्यों मनाई जाती है?', 'छठ पूजा सूर्य देव और छठी मैया को धन्यवाद देने का पर्व है — जीवन, ऊर्जा, अच्छी फ़सल और परिवार की सुख-समृद्धि के लिए। व्रती चार दिन नियम से उपवास रखते हैं और नदी या तालाब में खड़े होकर डूबते और उगते सूरज को अर्घ्य देते हैं।'],
    en: ['Why is Chhath Puja celebrated?', 'Chhath Puja is a festival of thanks to the Sun God and Chhathi Maiya — for life, energy, a good harvest and the well-being of the family. Devotees keep a strict four-day fast and, standing in a river or pond, offer arghya to the setting and the rising sun.'],
    hinglish: ['Chhath Puja kyun manaayi jaati hai?', 'Chhath Puja Surya Dev aur Chhathi Maiya ko dhanyavaad dene ka parv hai — jeevan, oorja, achhi fasal aur parivaar ki sukh-samriddhi ke liye. Vrati chaar din niyam se upvaas rakhte hain aur nadi ya taalaab mein khade ho kar doobte aur ugte suraj ko arghya dete hain.'],
    bn: ['ছট পুজো কেন পালন করা হয়?', 'ছট পুজো সূর্যদেব আর ছঠি মাইয়াকে ধন্যবাদ জানানোর উৎসব — জীবন, শক্তি, ভালো ফসল আর পরিবারের মঙ্গলের জন্য। ব্রতীরা চার দিন নিয়ম মেনে উপোস করেন আর নদী বা পুকুরে দাঁড়িয়ে অস্তগামী ও উদীয়মান সূর্যকে অর্ঘ্য দেন।'],
  },
  diwali: {
    hi: ['दिवाली क्यों मनाई जाती है?', 'मान्यता है कि भगवान राम 14 साल के वनवास और रावण पर विजय के बाद इसी दिन अयोध्या लौटे थे और लोगों ने दीये जलाकर उनका स्वागत किया था। इस दिन माँ लक्ष्मी और गणेश जी की पूजा होती है। जैन इसे भगवान महावीर के निर्वाण और सिख बंदी छोड़ दिवस के रूप में मनाते हैं। दिवाली अंधेरे पर उजाले की जीत का प्रतीक है।'],
    en: ['Why is Diwali celebrated?', 'It is believed that Lord Rama returned to Ayodhya on this day after 14 years of exile and his victory over Ravana, and people lit lamps to welcome him. Goddess Lakshmi and Lord Ganesha are worshipped. Jains mark it as the nirvana of Lord Mahavira and Sikhs as Bandi Chhor Divas. Diwali stands for the victory of light over darkness.'],
    hinglish: ['Diwali kyun manaayi jaati hai?', 'Maanyata hai ki Bhagwan Ram 14 saal ke vanvaas aur Ravan par vijay ke baad isi din Ayodhya laute the aur logon ne diye jala kar unka swaagat kiya tha. Is din Maa Lakshmi aur Ganesh ji ki pooja hoti hai. Jain ise Bhagwan Mahavir ke nirvana aur Sikh Bandi Chhor Divas ke roop mein manaate hain. Diwali andhere par ujaale ki jeet ka prateek hai.'],
    bn: ['দীপাবলি কেন পালন করা হয়?', 'বিশ্বাস, ১৪ বছরের বনবাস আর রাবণকে পরাজিত করার পর ভগবান রাম এই দিনে অযোধ্যায় ফিরেছিলেন, আর মানুষ প্রদীপ জ্বেলে তাঁকে স্বাগত জানিয়েছিল। এই দিনে লক্ষ্মী আর গণেশের পুজো হয়; বাংলায় এই রাতে কালীপুজো হয়। জৈনরা দিনটিকে মহাবীরের নির্বাণ আর শিখরা বন্দি ছোড় দিবস হিসেবে পালন করেন। দীপাবলি অন্ধকারের ওপর আলোর জয়ের প্রতীক।'],
  },
  'guru-gobind-singh-jayanti': {
    hi: ['गुरु गोबिंद सिंह जयंती क्यों मनाई जाती है?', 'यह सिखों के दसवें गुरु, गुरु गोबिंद सिंह जी के प्रकाश पर्व (जन्म दिवस) के रूप में मनाई जाती है। उन्होंने 1699 में बैसाखी के दिन ख़ालसा पंथ की स्थापना की और गुरु ग्रंथ साहिब को सिखों का सदा के लिए गुरु घोषित किया। वे साहस, सेवा और अन्याय के ख़िलाफ़ खड़े होने की सीख के लिए याद किए जाते हैं।'],
    en: ['Why is Guru Gobind Singh Jayanti celebrated?', 'It is the Prakash Purab (birth anniversary) of Guru Gobind Singh Ji, the tenth Sikh Guru. He founded the Khalsa on Baisakhi in 1699 and declared the Guru Granth Sahib the eternal Guru of the Sikhs. He is remembered for courage, service and standing up against injustice.'],
    hinglish: ['Guru Gobind Singh Jayanti kyun manaayi jaati hai?', 'Yeh Sikhon ke dasven Guru, Guru Gobind Singh Ji ke Prakash Purab (janm diwas) ke roop mein manaayi jaati hai. Unhone 1699 mein Baisakhi ke din Khalsa Panth ki sthaapna ki aur Guru Granth Sahib ko Sikhon ka sada ke liye Guru ghoshit kiya. Woh saahas, seva aur anyaay ke khilaaf khade hone ki seekh ke liye yaad kiye jaate hain.'],
    bn: ['গুরু গোবিন্দ সিং জয়ন্তী কেন পালন করা হয়?', 'শিখদের দশম গুরু, গুরু গোবিন্দ সিংজির প্রকাশ পর্ব (জন্মদিন) হিসেবে এটি পালিত হয়। ১৬৯৯ সালে বৈশাখীর দিনে তিনি খালসা পন্থ প্রতিষ্ঠা করেন আর গুরু গ্রন্থ সাহিবকে শিখদের চিরকালের গুরু ঘোষণা করেন। সাহস, সেবা আর অন্যায়ের বিরুদ্ধে দাঁড়ানোর শিক্ষার জন্য তাঁকে স্মরণ করা হয়।'],
  },
  pongal: {
    hi: ['पोंगल क्यों मनाया जाता है?', 'पोंगल तमिलनाडु का फ़सल का त्योहार है, जिसमें सूर्य देव, धरती और खेती में मदद करने वाले पशुओं (गाय-बैल) को धन्यवाद दिया जाता है। नए चावल, दूध और गुड़ से "पोंगल" पकाया जाता है; बर्तन से उफनकर बाहर आना घर में ख़ुशहाली का शुभ संकेत माना जाता है। यह चार दिन चलता है।'],
    en: ['Why is Pongal celebrated?', 'Pongal is the harvest festival of Tamil Nadu, a time to thank the Sun God, the earth and the cattle that help with farming. A dish called pongal is cooked from new rice, milk and jaggery; letting it boil over the pot is a sign of plenty in the home. It lasts four days.'],
    hinglish: ['Pongal kyun manaya jaata hai?', 'Pongal Tamil Nadu ka fasal ka tyohar hai, jismein Surya Dev, dharti aur kheti mein madad karne wale pashuon (gaay-bail) ko dhanyavaad diya jaata hai. Naye chaawal, doodh aur gud se "pongal" pakaya jaata hai; bartan se ufan kar bahar aana ghar mein khushhaali ka shubh sanket maana jaata hai. Yeh chaar din chalta hai.'],
    bn: ['পোঙ্গল কেন পালন করা হয়?', 'পোঙ্গল তামিলনাড়ুর ফসলের উৎসব, যেখানে সূর্যদেব, মাটি আর চাষে সাহায্যকারী গরু-বলদকে ধন্যবাদ জানানো হয়। নতুন চাল, দুধ আর গুড় দিয়ে "পোঙ্গল" রান্না হয়; হাঁড়ি উপচে পড়াকে ঘরে সমৃদ্ধির শুভ লক্ষণ মানা হয়। উৎসব চলে চার দিন।'],
  },
  baisakhi: {
    hi: ['बैसाखी क्यों मनाई जाती है?', 'बैसाखी पंजाब और उत्तर भारत में रबी की फ़सल (गेहूँ) की कटाई की ख़ुशी का त्योहार है और सौर नववर्ष की शुरुआत भी। सिखों के लिए यह इसलिए ख़ास है क्योंकि 1699 में इसी दिन गुरु गोबिंद सिंह जी ने आनंदपुर साहिब में ख़ालसा पंथ की स्थापना की थी।'],
    en: ['Why is Baisakhi celebrated?', 'Baisakhi celebrates the harvest of the rabi crop (wheat) in Punjab and north India, and the start of the solar new year. For Sikhs it is special because on this day in 1699 Guru Gobind Singh Ji founded the Khalsa at Anandpur Sahib.'],
    hinglish: ['Baisakhi kyun manaayi jaati hai?', 'Baisakhi Punjab aur uttar Bharat mein rabi ki fasal (gehun) ki katai ki khushi ka tyohar hai aur saur nav-varsh ki shuruaat bhi. Sikhon ke liye yeh isliye khaas hai kyunki 1699 mein isi din Guru Gobind Singh Ji ne Anandpur Sahib mein Khalsa Panth ki sthaapna ki thi.'],
    bn: ['বৈশাখী কেন পালন করা হয়?', 'পাঞ্জাব আর উত্তর ভারতে রবি ফসল (গম) কাটার আনন্দে বৈশাখী পালিত হয়, আর এটি সৌর নববর্ষের শুরুও। শিখদের কাছে দিনটি বিশেষ, কারণ ১৬৯৯ সালে এই দিনেই গুরু গোবিন্দ সিংজি আনন্দপুর সাহিবে খালসা পন্থ প্রতিষ্ঠা করেন। বাংলায় প্রায় একই সময়ে পয়লা বৈশাখ (নববর্ষ) হয়।'],
  },
  'eid-ul-adha': {
    hi: ['ईद-उल-अज़हा (बक़रीद) क्यों मनाई जाती है?', 'यह त्योहार हज़रत इब्राहीम (अ.) की उस क़ुर्बानी की याद में मनाया जाता है, जब वे अल्लाह के हुक्म पर अपनी सबसे प्यारी चीज़ — अपने बेटे — को क़ुर्बान करने को तैयार हो गए थे और अल्लाह ने बेटे की जगह एक मेंढा भेज दिया। यह हज के दिनों में, ज़िल-हिज्जा की 10 तारीख़ को आता है। क़ुर्बानी का गोश्त तीन हिस्सों में बाँटा जाता है — परिवार, रिश्तेदार और ग़रीबों के लिए।'],
    en: ['Why is Eid ul-Adha (Bakrid) celebrated?', 'It remembers the readiness of Prophet Ibrahim to sacrifice what he loved most — his son — on Allah\'s command, after which Allah sent a ram in the son\'s place. It falls on the 10th of Dhul Hijjah, during the days of Hajj. The meat of the sacrifice is shared in three parts: for the family, relatives and the poor.'],
    hinglish: ['Eid-ul-Adha (Bakrid) kyun manaayi jaati hai?', 'Yeh tyohar Hazrat Ibrahim (A.S.) ki us qurbani ki yaad mein manaya jaata hai, jab woh Allah ke hukm par apni sabse pyaari cheez — apne bete — ko qurbaan karne ko taiyaar ho gaye the aur Allah ne bete ki jagah ek mendha bhej diya. Yeh Hajj ke dinon mein, Zil-Hijja ki 10 tareekh ko aata hai. Qurbani ka gosht teen hisson mein baanta jaata hai — parivaar, rishtedaar aur gareebon ke liye.'],
    bn: ['ঈদ-উল-আজহা (বকরি ঈদ) কেন পালন করা হয়?', 'আল্লাহর হুকুমে হজরত ইব্রাহিম (আ.) তাঁর সবচেয়ে প্রিয় জিনিস — নিজের ছেলেকে — কোরবানি দিতে রাজি হয়েছিলেন, আর আল্লাহ ছেলের বদলে একটি দুম্বা পাঠান; সেই ঘটনার স্মরণে এই ঈদ। হজের সময়, জিলহজ মাসের ১০ তারিখে এটি হয়। কোরবানির মাংস তিন ভাগ করা হয় — পরিবার, আত্মীয় আর গরিবদের জন্য।'],
  },
  janmashtami: {
    hi: ['जन्माष्टमी क्यों मनाई जाती है?', 'जन्माष्टमी भगवान श्रीकृष्ण के जन्म की ख़ुशी में मनाई जाती है। मान्यता है कि उनका जन्म भाद्रपद महीने के कृष्ण पक्ष की अष्टमी को आधी रात में मथुरा की जेल में हुआ था, जहाँ कंस ने उनके माता-पिता देवकी और वसुदेव को क़ैद कर रखा था। इसलिए भक्त व्रत रखकर आधी रात को जन्मोत्सव मनाते हैं।'],
    en: ['Why is Janmashtami celebrated?', 'Janmashtami celebrates the birth of Lord Krishna. He is believed to have been born at midnight on the eighth day of the dark half of Bhadrapada, in a prison in Mathura where King Kansa had locked up his parents Devaki and Vasudeva. Devotees fast and celebrate his birth at midnight.'],
    hinglish: ['Janmashtami kyun manaayi jaati hai?', 'Janmashtami Bhagwan Shri Krishna ke janm ki khushi mein manaayi jaati hai. Maanyata hai ki unka janm Bhadrapad mahine ke krishna paksh ki ashtami ko aadhi raat mein Mathura ki jail mein hua tha, jahan Kans ne unke maata-pita Devaki aur Vasudev ko qaid kar rakha tha. Isliye bhakt vrat rakh kar aadhi raat ko janmotsav manaate hain.'],
    bn: ['জন্মাষ্টমী কেন পালন করা হয়?', 'ভগবান শ্রীকৃষ্ণের জন্মের আনন্দে জন্মাষ্টমী পালন করা হয়। বিশ্বাস, ভাদ্র মাসের কৃষ্ণপক্ষের অষ্টমীর মাঝরাতে মথুরার কারাগারে তাঁর জন্ম হয়েছিল, যেখানে কংস তাঁর বাবা-মা বসুদেব আর দেবকীকে বন্দি করে রেখেছিল। তাই ভক্তরা উপোস রেখে মাঝরাতে জন্মোৎসব পালন করেন।'],
  },
  onam: {
    hi: ['ओणम क्यों मनाया जाता है?', 'ओणम केरल का फ़सल का त्योहार है। मान्यता है कि इन दिनों दयालु राजा महाबली हर साल अपनी प्रजा से मिलने लौटते हैं, जिन्हें भगवान विष्णु के वामन अवतार ने पाताल भेज दिया था। उनके स्वागत में घरों के आगे फूलों की रंगोली (पूकलम) बनती है और ओणम साद्या (भोज) होता है।'],
    en: ['Why is Onam celebrated?', 'Onam is the harvest festival of Kerala. It is believed that the kind King Mahabali, who was sent to the netherworld by Vamana (an avatar of Lord Vishnu), returns every year at this time to visit his people. To welcome him, homes make flower rangolis (pookalam) and serve the Onam sadya feast.'],
    hinglish: ['Onam kyun manaya jaata hai?', 'Onam Kerala ka fasal ka tyohar hai. Maanyata hai ki in dinon dayalu Raja Mahabali har saal apni praja se milne laut-te hain, jinhein Bhagwan Vishnu ke Vaman avtaar ne paataal bhej diya tha. Unke swaagat mein gharon ke aage phoolon ki rangoli (pookalam) banti hai aur Onam Sadya (bhoj) hota hai.'],
    bn: ['ওনাম কেন পালন করা হয়?', 'ওনাম কেরালার ফসলের উৎসব। বিশ্বাস, দয়ালু রাজা মহাবলী, যাঁকে বিষ্ণুর বামন অবতার পাতালে পাঠিয়েছিলেন, প্রতি বছর এই সময় প্রজাদের দেখতে ফিরে আসেন। তাঁকে স্বাগত জানাতে বাড়ির সামনে ফুলের আলপনা (পূক্কলম) হয় আর ওনাম সাদ্যা (ভোজ) হয়।'],
  },
  'ganesh-chaturthi': {
    hi: ['गणेश चतुर्थी क्यों मनाई जाती है?', 'गणेश चतुर्थी भगवान गणेश के जन्म की ख़ुशी में मनाई जाती है, जिन्हें विघ्नहर्ता — बाधाएँ दूर करने वाले — और बुद्धि का देवता माना जाता है। घरों और पंडालों में गणपति की मूर्ति बिठाकर 1.5 से 10 दिन तक पूजा होती है और फिर विसर्जन होता है। 1893 में लोकमान्य तिलक ने इसे सार्वजनिक उत्सव का रूप दिया, ताकि लोग एकजुट हों।'],
    en: ['Why is Ganesh Chaturthi celebrated?', 'Ganesh Chaturthi celebrates the birth of Lord Ganesha, worshipped as Vighnaharta — the remover of obstacles — and the god of wisdom. An idol is installed at home or in a pandal and worshipped for one and a half to ten days, then immersed. In 1893 Lokmanya Tilak made it a public festival to bring people together.'],
    hinglish: ['Ganesh Chaturthi kyun manaayi jaati hai?', 'Ganesh Chaturthi Bhagwan Ganesh ke janm ki khushi mein manaayi jaati hai, jinhein Vighnaharta — baadhaayein door karne wale — aur buddhi ka devta maana jaata hai. Gharon aur pandalon mein Ganpati ki moorti bitha kar 1.5 se 10 din tak pooja hoti hai aur phir visarjan hota hai. 1893 mein Lokmanya Tilak ne ise saarvajanik utsav ka roop diya, taaki log ekjut hon.'],
    bn: ['গণেশ চতুর্থী কেন পালন করা হয়?', 'ভগবান গণেশের জন্মের আনন্দে গণেশ চতুর্থী পালিত হয়। তাঁকে বিঘ্নহর্তা — বাধা দূর করার দেবতা — আর বুদ্ধির দেবতা মানা হয়। বাড়িতে বা প্যান্ডেলে মূর্তি বসিয়ে দেড় থেকে দশ দিন পুজো হয়, তারপর বিসর্জন। ১৮৯৩ সালে লোকমান্য তিলক মানুষকে একজোট করতে একে সর্বজনীন উৎসবের রূপ দেন।'],
  },
  navratri: {
    hi: ['नवरात्रि क्यों मनाई जाती है?', 'नवरात्रि माँ दुर्गा के नौ रूपों की नौ रातों तक पूजा का पर्व है। मान्यता है कि देवी दुर्गा ने नौ दिन युद्ध करके महिषासुर राक्षस का वध किया था, इसलिए यह बुराई पर अच्छाई की जीत का उत्सव है। लोग व्रत रखते हैं, गरबा-डांडिया करते हैं और दसवें दिन विजयादशमी (दशहरा) मनाई जाती है।'],
    en: ['Why is Navratri celebrated?', 'Navratri is nine nights of worship of the nine forms of Goddess Durga. It is believed that Durga fought the demon Mahishasura for nine days and defeated him, so the festival celebrates the victory of good over evil. People fast, dance garba and dandiya, and the tenth day is celebrated as Vijayadashami (Dussehra).'],
    hinglish: ['Navratri kyun manaayi jaati hai?', 'Navratri Maa Durga ke nau roopon ki nau raaton tak pooja ka parv hai. Maanyata hai ki Devi Durga ne nau din yuddh karke Mahishasur raakshas ka vadh kiya tha, isliye yeh burai par achhai ki jeet ka utsav hai. Log vrat rakhte hain, garba-dandiya karte hain aur dasven din Vijayadashami (Dussehra) manaayi jaati hai.'],
    bn: ['নবরাত্রি কেন পালন করা হয়?', 'নবরাত্রি দেবী দুর্গার নয়টি রূপের নয় রাত ধরে পুজোর উৎসব। বিশ্বাস, দেবী দুর্গা নয় দিন যুদ্ধ করে মহিষাসুরকে বধ করেছিলেন, তাই এটি অশুভের ওপর শুভের জয়ের উৎসব। বাংলায় এই সময়েই দুর্গাপুজো হয়, আর দশম দিনে বিজয়া দশমী।'],
  },
  dussehra: {
    hi: ['दशहरा क्यों मनाया जाता है?', 'दशहरा (विजयादशमी) बुराई पर अच्छाई की जीत का त्योहार है। मान्यता है कि इसी दिन भगवान राम ने रावण का वध किया था और माँ दुर्गा ने महिषासुर पर विजय पाई थी। इसलिए कई जगह रावण, मेघनाद और कुंभकर्ण के पुतले जलाए जाते हैं और रामलीला का समापन होता है।'],
    en: ['Why is Dussehra celebrated?', 'Dussehra (Vijayadashami) celebrates the victory of good over evil. It is believed that on this day Lord Rama killed Ravana and Goddess Durga defeated Mahishasura. That is why effigies of Ravana, Meghnad and Kumbhakarna are burnt in many places and the Ramlila comes to an end.'],
    hinglish: ['Dussehra kyun manaya jaata hai?', 'Dussehra (Vijayadashami) burai par achhai ki jeet ka tyohar hai. Maanyata hai ki isi din Bhagwan Ram ne Ravan ka vadh kiya tha aur Maa Durga ne Mahishasur par vijay paayi thi. Isliye kai jagah Ravan, Meghnad aur Kumbhkaran ke putle jalaaye jaate hain aur Ramlila ka samaapan hota hai.'],
    bn: ['দশেরা (বিজয়া দশমী) কেন পালন করা হয়?', 'দশেরা বা বিজয়া দশমী অশুভের ওপর শুভের জয়ের উৎসব। বিশ্বাস, এই দিনে ভগবান রাম রাবণকে বধ করেছিলেন আর দেবী দুর্গা মহিষাসুরকে পরাজিত করেছিলেন। তাই অনেক জায়গায় রাবণ, মেঘনাদ আর কুম্ভকর্ণের কুশপুতুল পোড়ানো হয়। বাংলায় এই দিনে প্রতিমা বিসর্জন আর বিজয়ার শুভেচ্ছা বিনিময় হয়।'],
  },
};

/** The why-question for a festival in a language, as { q, a }, or null. */
const whyFaq = (slug, lang) => {
  const w = WHY[slug] && WHY[slug][lang];
  return w ? { q: w[0], a: w[1] } : null;
};

export { WHY, whyFaq };
