/**
 * Extra text under every story page (/kahani/<slug>/): a short note about where the story comes from,
 * and a small FAQ built from the story's own data (title, moral, reading time, source). Keyed by the
 * story's `source.en` (curly or straight apostrophe both work).
 */
const srcKey = (en) => en.replace(/’/g, "'");

const SOURCE_INFO = {
  Panchatantra: {
    hi: 'पंचतंत्र भारत का बहुत पुराना कथा-संग्रह है, जिसे लगभग दो हज़ार साल पुराना माना जाता है और जिसका श्रेय पंडित विष्णु शर्मा को दिया जाता है। कहा जाता है कि उन्होंने राजकुमारों को नीति और समझदारी सिखाने के लिए जानवरों की ये कहानियाँ सुनाईं। इसके पाँच भाग (तंत्र) हैं, इसलिए इसका नाम पंचतंत्र पड़ा। इसकी कहानियाँ दुनिया की कई भाषाओं में पहुँच चुकी हैं।',
    en: 'The Panchatantra is a very old collection of Indian fables, believed to be around two thousand years old and credited to Pandit Vishnu Sharma. He is said to have told these animal stories to teach young princes good sense and wise conduct. It has five parts (tantras), which gives it its name, and its stories have travelled into many languages around the world.',
    hinglish: 'Panchatantra Bharat ka bahut purana katha-sangrah hai, jise lagbhag do hazaar saal purana maana jaata hai aur jiska shrey Pandit Vishnu Sharma ko diya jaata hai. Kaha jaata hai ki unhone rajkumaron ko neeti aur samajhdaari sikhaane ke liye jaanwaron ki yeh kahaniyan sunaayin. Iske paanch bhaag (tantra) hain, isliye iska naam Panchatantra pada. Iski kahaniyan duniya ki kai bhashaon mein pahunch chuki hain.',
    bn: 'পঞ্চতন্ত্র ভারতের খুব পুরনো গল্প-সংগ্রহ, প্রায় দুই হাজার বছরের পুরনো বলে মনে করা হয়, আর এর রচয়িতা হিসেবে পণ্ডিত বিষ্ণু শর্মার নাম বলা হয়। বলা হয়, রাজপুত্রদের নীতি আর বুদ্ধি শেখাতে তিনি এই পশুপাখির গল্পগুলো শুনিয়েছিলেন। এর পাঁচটি ভাগ (তন্ত্র), তাই নাম পঞ্চতন্ত্র। এর গল্প পৃথিবীর বহু ভাষায় ছড়িয়ে পড়েছে।',
  },
  'Jataka tale': {
    hi: 'जातक कथाएँ बौद्ध परंपरा की कहानियाँ हैं, जो भगवान बुद्ध के पिछले जन्मों के बारे में बताती हैं। इनमें बोधिसत्व कभी जानवर, कभी राजा तो कभी आम इंसान के रूप में आते हैं और दया, ईमानदारी और समझदारी का रास्ता दिखाते हैं। ये कहानियाँ हज़ारों साल से सुनाई जा रही हैं।',
    en: 'Jataka tales come from the Buddhist tradition and tell of the earlier lives of the Buddha. In them the Bodhisattva appears as an animal, a king or an ordinary person, and shows the way of kindness, honesty and wisdom. These stories have been told for thousands of years.',
    hinglish: 'Jataka kathaayein Bauddh parampara ki kahaniyan hain, jo Bhagwan Buddh ke pichhle janmon ke baare mein batati hain. Inmein Bodhisattva kabhi jaanwar, kabhi raja to kabhi aam insaan ke roop mein aate hain aur daya, imaandaari aur samajhdaari ka raasta dikhaate hain. Yeh kahaniyan hazaaron saal se sunaayi ja rahi hain.',
    bn: 'জাতক কাহিনি বৌদ্ধ ঐতিহ্যের গল্প, যেখানে ভগবান বুদ্ধের আগের জন্মগুলোর কথা বলা হয়। এতে বোধিসত্ত্ব কখনো পশু, কখনো রাজা, কখনো সাধারণ মানুষ হয়ে আসেন আর দয়া, সততা আর বুদ্ধির পথ দেখান। হাজার হাজার বছর ধরে এই গল্পগুলো বলা হচ্ছে।',
  },
  "Aesop's fable": {
    hi: 'ईसप की कहानियाँ प्राचीन यूनान के कथाकार ईसप के नाम से जानी जाती हैं, जिनके बारे में माना जाता है कि वे लगभग ढाई हज़ार साल पहले हुए। ये छोटी-छोटी कहानियाँ ज़्यादातर जानवरों की होती हैं और हर कहानी के अंत में एक साफ़ सीख होती है। आज ये दुनिया भर के बच्चों को सुनाई जाती हैं।',
    en: 'Aesop\'s fables are named after Aesop, a storyteller of ancient Greece who is believed to have lived about two and a half thousand years ago. These short stories are mostly about animals, and each one ends with a clear lesson. Today they are told to children all over the world.',
    hinglish: 'Aesop ki kahaniyan praacheen Yunaan (Greece) ke kathakaar Aesop ke naam se jaani jaati hain, jinke baare mein maana jaata hai ki woh lagbhag dhaai hazaar saal pehle hue. Yeh chhoti-chhoti kahaniyan zyadatar jaanwaron ki hoti hain aur har kahani ke ant mein ek saaf seekh hoti hai. Aaj yeh duniya bhar ke bachchon ko sunaayi jaati hain.',
    bn: 'ঈশপের গল্প প্রাচীন গ্রিসের গল্পকার ঈশপের নামে পরিচিত, যিনি প্রায় আড়াই হাজার বছর আগে ছিলেন বলে মনে করা হয়। এই ছোট ছোট গল্পগুলো বেশিরভাগই পশুপাখির, আর প্রতিটির শেষে থাকে একটা স্পষ্ট শিক্ষা। আজ সারা পৃথিবীর শিশুরা এই গল্প শোনে।',
  },
  'Akbar and Birbal': {
    hi: 'बीरबल मुग़ल बादशाह अकबर के दरबार में थे और अपनी हाज़िरजवाबी और समझदारी के लिए मशहूर थे। अकबर-बीरबल की कहानियाँ लोककथाओं की तरह पीढ़ी-दर-पीढ़ी चली आ रही हैं — इनमें से कई सच्ची घटनाएँ नहीं, बल्कि बीरबल की चतुराई दिखाने वाली मज़ेदार कहानियाँ हैं।',
    en: 'Birbal was a courtier of the Mughal emperor Akbar and was famous for his quick wit and good sense. The Akbar-Birbal stories have been passed down like folk tales for generations — many are not real events but fun stories that show off Birbal\'s cleverness.',
    hinglish: 'Birbal Mughal baadshah Akbar ke darbaar mein the aur apni haazirjawaabi aur samajhdaari ke liye mashhoor the. Akbar-Birbal ki kahaniyan lok-kathaon ki tarah peedhi-dar-peedhi chali aa rahi hain — inmein se kai sachchi ghatnaayein nahi, balki Birbal ki chaturaai dikhaane wali mazedaar kahaniyan hain.',
    bn: 'বীরবল ছিলেন মোগল সম্রাট আকবরের সভাসদ, তাঁর উপস্থিত বুদ্ধি আর বিচক্ষণতার জন্য বিখ্যাত। আকবর-বীরবলের গল্প লোককথার মতো প্রজন্মের পর প্রজন্ম চলে আসছে — এর অনেকগুলো সত্যি ঘটনা নয়, বীরবলের বুদ্ধি দেখানোর মজার গল্প।',
  },
  'Tenali Raman': {
    hi: 'तेनाली रामन (तेनाली रामकृष्ण) विजयनगर के राजा कृष्णदेवराय के दरबार में कवि थे। वे अपनी चतुराई और मज़ाकिया अंदाज़ के लिए जाने जाते हैं। दक्षिण भारत से निकली उनकी कहानियाँ आज पूरे देश में बच्चों को सुनाई जाती हैं।',
    en: 'Tenali Raman (Tenali Ramakrishna) was a poet in the court of King Krishnadevaraya of Vijayanagara. He is remembered for his cleverness and sense of humour. His stories began in South India and are now told to children all over the country.',
    hinglish: 'Tenali Raman (Tenali Ramakrishna) Vijayanagar ke Raja Krishnadevaraya ke darbaar mein kavi the. Woh apni chaturaai aur mazaakiya andaaz ke liye jaane jaate hain. Dakshin Bharat se nikli unki kahaniyan aaj poore desh mein bachchon ko sunaayi jaati hain.',
    bn: 'তেনালি রামন (তেনালি রামকৃষ্ণ) ছিলেন বিজয়নগরের রাজা কৃষ্ণদেবরায়ের সভাকবি। তিনি তাঁর বুদ্ধি আর রসিকতার জন্য পরিচিত। দক্ষিণ ভারত থেকে আসা তাঁর গল্প আজ সারা দেশের শিশুরা শোনে।',
  },
  'Mulla Nasruddin': {
    hi: 'मुल्ला नसरुद्दीन तुर्की, ईरान और मध्य एशिया की लोककथाओं का मशहूर किरदार है। वह कभी भोला लगता है, कभी बहुत चालाक — उसकी मज़ेदार हरकतों के पीछे अक्सर कोई गहरी बात छुपी होती है।',
    en: 'Mulla Nasruddin is a famous character from the folk tales of Turkey, Iran and Central Asia. Sometimes he seems simple, sometimes very clever — and behind his funny antics there is often a deep lesson.',
    hinglish: 'Mulla Nasruddin Turkey, Iran aur Madhya Asia ki lok-kathaon ka mashhoor kirdaar hai. Woh kabhi bhola lagta hai, kabhi bahut chaalaak — uski mazedaar harkaton ke peechhe aksar koi gehri baat chhupi hoti hai.',
    bn: 'মোল্লা নাসিরুদ্দিন তুরস্ক, ইরান আর মধ্য এশিয়ার লোককথার বিখ্যাত চরিত্র। কখনো তাকে সরল মনে হয়, কখনো খুব চালাক — তার মজার কাণ্ডের পেছনে প্রায়ই লুকিয়ে থাকে গভীর কোনো কথা।',
  },
  'Sheikh Chilli': {
    hi: 'शेख़ चिल्ली उत्तर भारत की लोककथाओं का मज़ेदार किरदार है, जो दिन में सपने देखता है और हवा में महल बनाता है। उसकी कहानियाँ हँसाती भी हैं और सिखाती भी हैं कि सिर्फ़ सपने देखने से नहीं, मेहनत से काम बनता है।',
    en: 'Sheikh Chilli is a funny character from North Indian folk tales who daydreams and builds castles in the air. His stories make you laugh and also teach that work gets done by effort, not by dreaming alone.',
    hinglish: 'Sheikh Chilli Uttar Bharat ki lok-kathaon ka mazedaar kirdaar hai, jo din mein sapne dekhta hai aur hawa mein mahal banata hai. Uski kahaniyan hansaati bhi hain aur sikhaati bhi hain ki sirf sapne dekhne se nahi, mehnat se kaam banta hai.',
    bn: 'শেখ চিল্লি উত্তর ভারতের লোককথার মজার চরিত্র, যে দিনের বেলায় স্বপ্ন দেখে আর আকাশকুসুম কল্পনা করে। তার গল্প হাসায়, আবার শেখায় যে শুধু স্বপ্ন দেখে নয়, পরিশ্রমেই কাজ হয়।',
  },
  'Vikram and Betaal': {
    hi: 'विक्रम-बेताल की कहानियाँ "बेताल पच्चीसी" से हैं — पच्चीस कहानियों का पुराना संग्रह। राजा विक्रम पेड़ पर लटके बेताल को कंधे पर लादकर ले जाते हैं, और बेताल रास्ते में एक कहानी सुनाकर उसके अंत में एक पहेली पूछता है। राजा सही जवाब देते हैं तो बेताल उड़कर वापस पेड़ पर चला जाता है।',
    en: 'The Vikram and Betaal stories come from the "Betaal Pachisi", an old collection of twenty-five tales. King Vikram carries the spirit Betaal on his shoulder, and on the way Betaal tells a story that ends with a riddle. When the king answers correctly, Betaal flies back to his tree.',
    hinglish: 'Vikram-Betaal ki kahaniyan "Betaal Pachisi" se hain — pachchees kahaniyon ka purana sangrah. Raja Vikram ped par latke Betaal ko kandhe par laadkar le jaate hain, aur Betaal raaste mein ek kahani sunaakar uske ant mein ek paheli poochhta hai. Raja sahi jawaab dete hain to Betaal udkar wapas ped par chala jaata hai.',
    bn: 'বিক্রম-বেতালের গল্প এসেছে "বেতাল পঁচিশি" থেকে — পঁচিশটি গল্পের পুরনো সংগ্রহ। রাজা বিক্রম গাছে ঝোলা বেতালকে কাঁধে নিয়ে চলেন, আর পথে বেতাল একটা গল্প বলে শেষে একটা ধাঁধা জিজ্ঞেস করে। রাজা ঠিক উত্তর দিলেই বেতাল উড়ে আবার গাছে ফিরে যায়।',
  },
  'Folk tale': {
    hi: 'लोककथाएँ वे कहानियाँ हैं जो किसी किताब से नहीं, बल्कि गाँव-घरों में सुनाते-सुनाते पीढ़ी-दर-पीढ़ी आगे बढ़ीं। इसलिए एक ही कहानी के अलग-अलग इलाक़ों में अलग-अलग रूप मिलते हैं। हमने इसे अपने शब्दों में बच्चों के लिए फिर से लिखा है।',
    en: 'Folk tales are stories that were not written in a book but passed on by word of mouth, from one generation to the next, in villages and homes. That is why the same story has different versions in different regions. We have retold it in our own words for children.',
    hinglish: 'Lok-kathaayein woh kahaniyan hain jo kisi kitaab se nahi, balki gaon-gharon mein sunaate-sunaate peedhi-dar-peedhi aage badhin. Isliye ek hi kahani ke alag-alag ilaakon mein alag-alag roop milte hain. Humne ise apne shabdon mein bachchon ke liye phir se likha hai.',
    bn: 'লোককথা হলো সেই গল্প, যা কোনো বইয়ে লেখা হয়নি, মুখে মুখে গ্রামে-ঘরে প্রজন্ম থেকে প্রজন্মে চলে এসেছে। তাই একই গল্পের আলাদা অঞ্চলে আলাদা রূপ পাওয়া যায়। আমরা শিশুদের জন্য নিজেদের ভাষায় আবার লিখেছি।',
  },
  "Grandma's tale": {
    hi: 'यह दादी-नानी की कहानी है — ऐसी कहानियाँ जो रात को सोने से पहले घर के बड़े बच्चों को सुनाते आए हैं। इनमें कोई एक लेखक नहीं, बल्कि हर परिवार अपना थोड़ा रंग जोड़ता है। हमने इसे अपने शब्दों में फिर से लिखा है।',
    en: 'This is a grandma\'s tale — the kind of story elders have told children at bedtime for generations. It has no single author; every family adds its own touch. We have retold it in our own words.',
    hinglish: 'Yeh Dadi-Naani ki kahani hai — aisi kahaniyan jo raat ko sone se pehle ghar ke bade bachchon ko sunaate aaye hain. Inmein koi ek lekhak nahi, balki har parivaar apna thoda rang jodta hai. Humne ise apne shabdon mein phir se likha hai.',
    bn: 'এটা ঠাকুমা-দিদিমার গল্প — এমন গল্প যা বাড়ির বড়রা প্রজন্ম ধরে ঘুমের আগে ছোটদের শুনিয়ে আসছেন। এর কোনো একজন লেখক নেই, প্রতিটি পরিবার নিজের একটু রং যোগ করে। আমরা নিজেদের ভাষায় আবার লিখেছি।',
  },
  'Munshi Premchand': {
    hi: 'मुंशी प्रेमचंद (1880–1936) हिंदी और उर्दू के सबसे बड़े कहानीकारों में गिने जाते हैं। उन्होंने गाँव, किसान, ग़रीबी और आम लोगों के दिल की बातें बहुत सरल भाषा में लिखीं — "ईदगाह", "दो बैलों की कथा" और "पंच परमेश्वर" जैसी कहानियाँ आज भी स्कूलों में पढ़ाई जाती हैं। उनकी रचनाएँ अब सबके लिए मुक्त (पब्लिक डोमेन) हैं। यहाँ हमने उनकी कहानी को छोटे बच्चों के लिए अपने शब्दों में छोटा करके सुनाया है; पूरी कहानी उनकी किताबों में ज़रूर पढ़ें।',
    en: 'Munshi Premchand (1880–1936) is counted among the greatest storytellers of Hindi and Urdu. He wrote about villages, farmers, poverty and the hearts of ordinary people in very simple language — stories like "Idgah", "Do Bailon ki Katha" and "Panch Parmeshwar" are still taught in schools. His works are now free for everyone (public domain). Here we have retold his story in our own words, shortened for young children; do read the full story in his books.',
    hinglish: 'Munshi Premchand (1880–1936) Hindi aur Urdu ke sabse bade kahanikaaron mein gine jaate hain. Unhone gaon, kisaan, gareebi aur aam logon ke dil ki baatein bahut saral bhasha mein likhin — "Idgah", "Do Bailon ki Katha" aur "Panch Parmeshwar" jaisi kahaniyan aaj bhi schoolon mein padhaayi jaati hain. Unki rachnaayein ab sabke liye mukt (public domain) hain. Yahan humne unki kahani ko chhote bachchon ke liye apne shabdon mein chhota karke sunaaya hai; poori kahani unki kitaabon mein zaroor padhein.',
    bn: 'মুন্সি প্রেমচাঁদ (১৮৮০–১৯৩৬) হিন্দি আর উর্দুর অন্যতম শ্রেষ্ঠ গল্পকার। তিনি গ্রাম, কৃষক, দারিদ্র্য আর সাধারণ মানুষের মনের কথা খুব সহজ ভাষায় লিখেছেন — "ঈদগাহ", "দো বৈলোঁ কি কথা"-র মতো গল্প আজও স্কুলে পড়ানো হয়। তাঁর লেখা এখন সবার জন্য মুক্ত (পাবলিক ডোমেন)। এখানে আমরা ছোটদের জন্য তাঁর গল্পটি নিজেদের ভাষায় ছোট করে বলেছি; পুরো গল্পটি তাঁর বইয়ে অবশ্যই পড়ো।',
  },
  'Rabindranath Tagore': {
    hi: 'रवींद्रनाथ टैगोर (1861–1941) बांग्ला के महान कवि और कहानीकार थे, और साहित्य का नोबेल पुरस्कार पाने वाले पहले एशियाई थे। हमारा राष्ट्रगान "जन गण मन" भी उन्हीं का लिखा है। "काबुलीवाला" जैसी उनकी कहानियाँ प्यार, अपनेपन और रिश्तों की गहरी बातें कहती हैं। उनकी रचनाएँ अब सबके लिए मुक्त (पब्लिक डोमेन) हैं; यहाँ हमने बच्चों के लिए कहानी को अपने शब्दों में छोटा करके सुनाया है।',
    en: 'Rabindranath Tagore (1861–1941) was a great Bengali poet and storyteller, and the first Asian to win the Nobel Prize in Literature. He also wrote our national anthem, "Jana Gana Mana". Stories like "Kabuliwala" speak of love, belonging and the deep bonds between people. His works are now free for everyone (public domain); here we have retold the story in our own words, shortened for children.',
    hinglish: 'Rabindranath Tagore (1861–1941) Bangla ke mahaan kavi aur kahanikaar the, aur sahitya ka Nobel puraskaar paane wale pehle Asian the. Hamara rashtragaan "Jana Gana Mana" bhi unhi ka likha hai. "Kabuliwala" jaisi unki kahaniyan pyaar, apnepan aur rishton ki gehri baatein kehti hain. Unki rachnaayein ab sabke liye mukt (public domain) hain; yahan humne bachchon ke liye kahani ko apne shabdon mein chhota karke sunaaya hai.',
    bn: 'রবীন্দ্রনাথ ঠাকুর (১৮৬১–১৯৪১) ছিলেন বাংলার মহান কবি ও গল্পকার, আর সাহিত্যে নোবেল পুরস্কার পাওয়া প্রথম এশীয়। আমাদের জাতীয় সংগীত "জনগণমন"-ও তাঁরই লেখা। "কাবুলিওয়ালা"-র মতো গল্পে ভালোবাসা, আপনজন আর সম্পর্কের গভীর কথা আছে। তাঁর লেখা এখন সবার জন্য মুক্ত (পাবলিক ডোমেন); এখানে আমরা ছোটদের জন্য গল্পটি নিজেদের ভাষায় ছোট করে বলেছি।',
  },
  Hitopadesha: {
    hi: 'हितोपदेश संस्कृत का पुराना कथा-संग्रह है, जिसे नारायण पंडित ने लगभग एक हज़ार साल पहले लिखा माना जाता है। इसकी बहुत-सी कहानियाँ पंचतंत्र जैसी हैं — जानवरों के ज़रिए दोस्ती, समझदारी और सही-ग़लत की सीख। "हितोपदेश" का मतलब ही है "भलाई की सीख"।',
    en: 'The Hitopadesha is an old Sanskrit collection of fables, believed to have been written by Narayana Pandit about a thousand years ago. Many of its stories are like those of the Panchatantra — animals teaching friendship, good sense and right from wrong. "Hitopadesha" itself means "good advice".',
    hinglish: 'Hitopadesha Sanskrit ka purana katha-sangrah hai, jise Narayan Pandit ne lagbhag ek hazaar saal pehle likha maana jaata hai. Iski bahut-si kahaniyan Panchatantra jaisi hain — jaanwaron ke zariye dosti, samajhdaari aur sahi-galat ki seekh. "Hitopadesha" ka matlab hi hai "bhalaai ki seekh".',
    bn: 'হিতোপদেশ সংস্কৃতের পুরনো গল্প-সংগ্রহ, প্রায় এক হাজার বছর আগে নারায়ণ পণ্ডিত লিখেছিলেন বলে মনে করা হয়। এর অনেক গল্প পঞ্চতন্ত্রের মতো — পশুপাখির মধ্য দিয়ে বন্ধুত্ব, বুদ্ধি আর ভালো-মন্দের শিক্ষা। "হিতোপদেশ" কথাটার মানেই "ভালোর উপদেশ"।',
  },
};

const EN_NAME = { 'Folk tale': 'folk tales', 'Jataka tale': 'Jataka tales', "Aesop's fable": "Aesop's fables", "Grandma's tale": "grandma's tales", 'Akbar and Birbal': 'Akbar and Birbal stories', 'Tenali Raman': 'Tenali Raman', 'Mulla Nasruddin': 'Mulla Nasruddin', 'Sheikh Chilli': 'Sheikh Chilli', 'Vikram and Betaal': 'Vikram and Betaal' };
const EN_FROM = { 'Munshi Premchand': 'a story by Munshi Premchand', 'Rabindranath Tagore': 'a story by Rabindranath Tagore', Hitopadesha: 'the Hitopadesha', 'Folk tale': 'Indian folk tradition', 'Jataka tale': 'the Jataka tales', "Aesop's fable": "Aesop's fables", "Grandma's tale": "the grandma's tales told at home", Panchatantra: 'the Panchatantra' };

const STORY_FAQ = {
  hi: {
    aboutH: (src) => `${src} के बारे में`, faqH: 'अक्सर पूछे जाने वाले सवाल',
    qMoral: (t) => `"${t}" कहानी की सीख क्या है?`,
    qFrom: (t) => `"${t}" कहानी कहाँ से है?`, aFrom: (src) => `यह कहानी ${src} से ली गई है और बच्चों के लिए आसान शब्दों में फिर से लिखी गई है।`,
    qTime: (t) => `"${t}" पढ़ने में कितना समय लगता है, और यह किस उम्र के बच्चों के लिए है?`,
    aTime: (m) => `लगभग ${m} मिनट। यह 3 से 10 साल के बच्चों को सोने से पहले सुनाने के लिए अच्छी है। "सुनाओ" बटन दबाएँ तो फ़ोन ख़ुद कहानी पढ़कर सुना देता है, और नाइट मोड व स्लीप टाइमर भी है।`,
  },
  en: {
    aboutH: (src) => `About ${EN_NAME[src] || src}`, faqH: 'Frequently asked questions',
    qMoral: (t) => `What is the moral of "${t}"?`,
    qFrom: (t) => `Where does the story "${t}" come from?`, aFrom: (src) => `It comes from ${EN_FROM[src] || `the ${src} stories`}, retold in simple words for children.`,
    qTime: (t) => `How long does "${t}" take to read, and what age is it for?`,
    aTime: (m) => `About ${m} minutes. It suits children aged 3 to 10 at bedtime. Tap "Read aloud" and the phone reads the story out, with a night mode and a sleep timer too.`,
  },
  hinglish: {
    aboutH: (src) => `${src} ke baare mein`, faqH: 'Aksar pooche jaane wale sawaal',
    qMoral: (t) => `"${t}" kahani ki seekh kya hai?`,
    qFrom: (t) => `"${t}" kahani kahan se hai?`, aFrom: (src) => `Yeh kahani ${src} se li gayi hai aur bachchon ke liye aasaan shabdon mein phir se likhi gayi hai.`,
    qTime: (t) => `"${t}" padhne mein kitna samay lagta hai, aur yeh kis umar ke bachchon ke liye hai?`,
    aTime: (m) => `Lagbhag ${m} minute. Yeh 3 se 10 saal ke bachchon ko sone se pehle sunaane ke liye achhi hai. "Sunao" button dabao to phone khud kahani padh ke suna deta hai, aur night mode aur sleep timer bhi hai.`,
  },
  bn: {
    aboutH: (src) => `${src} সম্পর্কে`, faqH: 'সাধারণ প্রশ্ন',
    qMoral: (t) => `"${t}" গল্পের শিক্ষা কী?`,
    qFrom: (t) => `"${t}" গল্পটি কোথা থেকে?`, aFrom: (src) => `গল্পটি ${src} থেকে নেওয়া, শিশুদের জন্য সহজ ভাষায় আবার লেখা।`,
    qTime: (t) => `"${t}" পড়তে কত সময় লাগে, আর কোন বয়সের জন্য?`,
    aTime: (m) => `প্রায় ${m} মিনিট। ৩ থেকে ১০ বছরের শিশুদের ঘুমের আগে শোনানোর জন্য ভালো। "শোনাও" বোতাম চাপলে ফোন নিজেই গল্প পড়ে শোনায়, নাইট মোড আর স্লিপ টাইমারও আছে।`,
  },
};

/** For one story in one language: { aboutH, about, faqH, faq: [{q, a}] } (about may be '' if the source is unknown). */
const storyExtras = (st, code) => {
  const x = st[code], F = STORY_FAQ[code], src = st.source[code], key = srcKey(st.source.en);
  const info = SOURCE_INFO[key] ? SOURCE_INFO[key][code] : '';
  return {
    aboutH: F.aboutH(code === 'en' ? key : src),
    about: info,
    faqH: F.faqH,
    faq: [
      { q: F.qMoral(x.title), a: x.seekh },
      { q: F.qFrom(x.title), a: F.aFrom(code === 'en' ? key : src) },
      { q: F.qTime(x.title), a: F.aTime(st.minutes) },
    ],
  };
};

export { storyExtras, SOURCE_INFO };
