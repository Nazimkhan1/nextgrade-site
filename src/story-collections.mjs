/**
 * Story collection pages (/kahani/<slug>/): one page per source (Panchatantra, Aesop, Akbar-Birbal …).
 * Each page has its own intro (written here, different from the "About" note under every story),
 * the source note from story-info.mjs, the list of that source's LIVE stories, and a small FAQ.
 * `sources` are story `source.en` values (straight apostrophes; curly ones are matched too).
 * Release: each collection is scheduled in src/releases.mjs ('collection:<slug>'), its own line.
 * Slugs must never match a story slug (both live under /kahani/).
 */
const collections = [
  {
    slug: 'panchatantra',
    emoji: '🦊',
    sources: ['Panchatantra'],
    hi: {
      name: 'पंचतंत्र की कहानियाँ',
      lead: 'चतुर खरगोश, बातूनी कछुआ, समझदार बंदर — पंचतंत्र की हर कहानी में जानवर हैं, पर सीख इंसानों के लिए है। दोस्ती कैसे निभाएँ, किस पर भरोसा करें और मुसीबत में दिमाग़ कैसे चलाएँ, यह सब इन छोटी कहानियों में मिलता है। यहाँ सारी पंचतंत्र कहानियाँ एक जगह हैं, आसान हिंदी में।',
    },
    en: {
      name: 'Panchatantra stories',
      lead: 'A clever hare, a talkative tortoise, a quick-witted monkey — every Panchatantra story is about animals, but the lessons are for people. How to keep a friendship, whom to trust and how to think your way out of trouble: it is all in these short tales. Here are all our Panchatantra stories in one place, in simple English.',
    },
    hinglish: {
      name: 'Panchatantra ki kahaniyan',
      lead: 'Chatur khargosh, baatooni kachhua, samajhdaar bandar — Panchatantra ki har kahani mein jaanwar hain, par seekh insaanon ke liye hai. Dosti kaise nibhaayein, kis par bharosa karein aur musibat mein dimaag kaise chalaayein, yeh sab in chhoti kahaniyon mein milta hai. Yahan saari Panchatantra kahaniyan ek jagah hain, aasaan bhasha mein.',
    },
    bn: {
      name: 'পঞ্চতন্ত্রের গল্প',
      lead: 'চতুর খরগোশ, বাচাল কচ্ছপ, বুদ্ধিমান বানর — পঞ্চতন্ত্রের প্রতিটি গল্পে পশুপাখি, কিন্তু শিক্ষা মানুষের জন্য। বন্ধুত্ব কীভাবে রাখতে হয়, কাকে বিশ্বাস করতে হয় আর বিপদে কীভাবে মাথা খাটাতে হয় — সব আছে এই ছোট গল্পগুলোতে। এখানে আমাদের সব পঞ্চতন্ত্রের গল্প এক জায়গায়, সহজ বাংলায়।',
    },
  },
  {
    slug: 'aesop',
    emoji: '🐢',
    sources: ["Aesop's fable"],
    hi: {
      name: 'ईसप की कहानियाँ',
      lead: 'खरगोश और कछुए की दौड़ से लेकर लोमड़ी और अंगूर तक — ईसप की कहानियाँ इतनी छोटी हैं कि दो मिनट में ख़त्म हो जाती हैं, पर उनकी सीख सालों याद रहती है। छोटे बच्चों के लिए सोने से पहले की पहली कहानियों के रूप में ये सबसे अच्छी हैं। यहाँ ईसप की सारी कहानियाँ हिंदी में हैं।',
    },
    en: {
      name: "Aesop's fables",
      lead: 'From the hare and the tortoise to the fox and the grapes — Aesop\'s fables are so short that they end in two minutes, yet their lessons stay for years. They make the best first bedtime stories for young children. Here are all our Aesop\'s fables, retold in simple words.',
    },
    hinglish: {
      name: 'Aesop ki kahaniyan',
      lead: 'Khargosh aur kachhue ki daud se lekar lomdi aur angoor tak — Aesop ki kahaniyan itni chhoti hain ki do minute mein khatam ho jaati hain, par unki seekh saalon yaad rehti hai. Chhote bachchon ke liye sone se pehle ki pehli kahaniyon ke roop mein yeh sabse achhi hain. Yahan Aesop ki saari kahaniyan aasaan bhasha mein hain.',
    },
    bn: {
      name: 'ঈশপের গল্প',
      lead: 'খরগোশ আর কচ্ছপের দৌড় থেকে শেয়াল আর আঙুর পর্যন্ত — ঈশপের গল্প এত ছোট যে দুই মিনিটে শেষ হয়ে যায়, কিন্তু তার শিক্ষা বহু বছর মনে থাকে। ছোট শিশুদের ঘুমের আগের প্রথম গল্প হিসেবে এগুলো সবচেয়ে ভালো। এখানে ঈশপের সব গল্প সহজ বাংলায়।',
    },
  },
  {
    slug: 'lok-kathayein',
    emoji: '🏡',
    sources: ['Folk tale', "Grandma's tale"],
    hi: {
      name: 'लोककथाएँ और दादी-नानी की कहानियाँ',
      lead: 'प्यासा कौआ, टोपीवाला और बंदर — ये वो कहानियाँ हैं जो हमने किताबों से नहीं, दादी-नानी की गोद में सुनीं। इनका कोई एक लेखक नहीं, हर घर में ये थोड़ी अलग सुनाई जाती हैं। यहाँ ऐसी सारी लोककथाएँ एक जगह हैं, ताकि आप भी अपने बच्चों को वही कहानियाँ सुना सकें।',
    },
    en: {
      name: "Folk tales and grandma's stories",
      lead: 'The thirsty crow, the cap seller and the monkeys — these are the stories we did not learn from books but heard on a grandmother\'s lap. They have no single author, and every home tells them a little differently. Here they all are in one place, so you can tell your children the same stories.',
    },
    hinglish: {
      name: 'Lok-kathaayein aur Dadi-Naani ki kahaniyan',
      lead: 'Pyaasa kauwa, topiwala aur bandar — yeh woh kahaniyan hain jo humne kitaabon se nahi, Dadi-Naani ki god mein suni. Inka koi ek lekhak nahi, har ghar mein yeh thodi alag sunaayi jaati hain. Yahan aisi saari lok-kathaayein ek jagah hain, taaki aap bhi apne bachchon ko wahi kahaniyan suna sakein.',
    },
    bn: {
      name: 'লোককথা আর ঠাকুমার গল্প',
      lead: 'তৃষ্ণার্ত কাক, টুপিওয়ালা আর বানর — এগুলো সেই গল্প যা আমরা বই থেকে নয়, ঠাকুমা-দিদিমার কোলে বসে শুনেছি। এদের কোনো একজন লেখক নেই, প্রতিটি বাড়িতে একটু আলাদা করে বলা হয়। এখানে এমন সব লোককথা এক জায়গায়, যাতে আপনিও আপনার শিশুকে সেই গল্পগুলোই শোনাতে পারেন।',
    },
  },
  {
    slug: 'akbar-birbal',
    emoji: '👑',
    sources: ['Akbar and Birbal'],
    hi: {
      name: 'अकबर-बीरबल की कहानियाँ',
      lead: 'बादशाह अकबर कोई टेढ़ा सवाल पूछते हैं, दरबार चुप हो जाता है, और बीरबल मुस्कुराकर ऐसा जवाब देते हैं कि सब हँस पड़ते हैं। अकबर-बीरबल की कहानियाँ बच्चों को सिखाती हैं कि हर मुश्किल का हल ताक़त से नहीं, सूझ-बूझ से निकलता है। यहाँ बीरबल की चतुराई वाली सारी कहानियाँ हैं।',
    },
    en: {
      name: 'Akbar and Birbal stories',
      lead: 'Emperor Akbar asks a tricky question, the whole court falls silent, and Birbal smiles and gives an answer that makes everyone laugh. The Akbar-Birbal stories teach children that problems are solved by quick thinking, not by force. Here are all our stories of Birbal\'s wit.',
    },
    hinglish: {
      name: 'Akbar-Birbal ki kahaniyan',
      lead: 'Baadshah Akbar koi tedha sawaal poochhte hain, darbaar chup ho jaata hai, aur Birbal muskuraakar aisa jawaab dete hain ki sab hans padte hain. Akbar-Birbal ki kahaniyan bachchon ko sikhaati hain ki har mushkil ka hal taakat se nahi, soojh-boojh se nikalta hai. Yahan Birbal ki chaturaai wali saari kahaniyan hain.',
    },
    bn: {
      name: 'আকবর-বীরবলের গল্প',
      lead: 'সম্রাট আকবর একটা কঠিন প্রশ্ন করেন, পুরো সভা চুপ, আর বীরবল হেসে এমন উত্তর দেন যে সবাই হেসে ফেলে। আকবর-বীরবলের গল্প শিশুদের শেখায় যে সমস্যার সমাধান হয় বুদ্ধি দিয়ে, জোর দিয়ে নয়। এখানে বীরবলের বুদ্ধির সব গল্প।',
    },
  },
  {
    slug: 'tenali-raman',
    emoji: '🎭',
    sources: ['Tenali Raman'],
    hi: {
      name: 'तेनाली रामन की कहानियाँ',
      lead: 'चोर हों, अड़ियल घोड़ा हो या ख़ुद राजा कृष्णदेवराय — तेनाली रामन सबको अपनी हाज़िरजवाबी से हरा देते हैं, और वह भी हँसते-हँसाते। इन कहानियों में मज़ा भी है और यह सीख भी कि समझदारी से बड़ी कोई चीज़ नहीं। यहाँ तेनाली रामन की सारी कहानियाँ हिंदी में हैं।',
    },
    en: {
      name: 'Tenali Raman stories',
      lead: 'Thieves, a wild horse, even King Krishnadevaraya himself — Tenali Raman beats them all with his quick wit, and makes everyone laugh while he does it. These stories are great fun and teach that nothing beats good sense. Here are all our Tenali Raman stories.',
    },
    hinglish: {
      name: 'Tenali Raman ki kahaniyan',
      lead: 'Chor hon, adiyal ghoda ho ya khud Raja Krishnadevaraya — Tenali Raman sabko apni haazirjawaabi se hara dete hain, aur woh bhi hanste-hansaate. In kahaniyon mein mazaa bhi hai aur yeh seekh bhi ki samajhdaari se badi koi cheez nahi. Yahan Tenali Raman ki saari kahaniyan hain.',
    },
    bn: {
      name: 'তেনালি রামনের গল্প',
      lead: 'চোর হোক, জেদি ঘোড়া হোক বা স্বয়ং রাজা কৃষ্ণদেবরায় — তেনালি রামন সবাইকে উপস্থিত বুদ্ধিতে হারিয়ে দেন, তাও হাসতে হাসাতে। এই গল্পে মজাও আছে, আর এই শিক্ষাও যে বুদ্ধির চেয়ে বড় কিছু নেই। এখানে তেনালি রামনের সব গল্প।',
    },
  },
  {
    slug: 'jataka',
    emoji: '🦌',
    sources: ['Jataka tale'],
    hi: {
      name: 'जातक कथाएँ',
      lead: 'कभी हिरन, कभी बंदर, कभी दयालु राजा — जातक कथाओं में बोधिसत्व अलग-अलग रूपों में आकर दया, सच और त्याग का रास्ता दिखाते हैं। ये कहानियाँ शांत और कोमल हैं, इसलिए रात को सोने से पहले सुनाने के लिए बहुत अच्छी हैं। यहाँ सारी जातक कथाएँ आसान हिंदी में हैं।',
    },
    en: {
      name: 'Jataka tales',
      lead: 'Sometimes a deer, sometimes a monkey, sometimes a kind king — in the Jataka tales the Bodhisattva comes in many forms and shows the way of kindness, truth and sacrifice. These are calm, gentle stories, which makes them lovely for bedtime. Here are all our Jataka tales in simple English.',
    },
    hinglish: {
      name: 'Jataka kathaayein',
      lead: 'Kabhi hiran, kabhi bandar, kabhi dayaalu raja — Jataka kathaon mein Bodhisattva alag-alag roop mein aakar daya, sach aur tyaag ka raasta dikhaate hain. Yeh kahaniyan shaant aur komal hain, isliye raat ko sone se pehle sunaane ke liye bahut achhi hain. Yahan saari Jataka kathaayein aasaan bhasha mein hain.',
    },
    bn: {
      name: 'জাতকের গল্প',
      lead: 'কখনো হরিণ, কখনো বানর, কখনো দয়ালু রাজা — জাতকের গল্পে বোধিসত্ত্ব নানা রূপে এসে দয়া, সত্য আর ত্যাগের পথ দেখান। গল্পগুলো শান্ত আর কোমল, তাই ঘুমের আগে শোনানোর জন্য খুব সুন্দর। এখানে সব জাতকের গল্প সহজ বাংলায়।',
    },
  },
];

// Interface text for the collection pages and the collection links on /kahani/ and story pages.
const COLLECTION_UI = {
  hi: {
    indexH: 'कहानियों के संग्रह', indexLead: 'किसी एक खज़ाने की सारी कहानियाँ एक साथ पढ़ें:',
    titleTail: 'बच्चों के लिए सीख वाली छोटी कहानियाँ',
    listH: (n) => `इस संग्रह की कहानियाँ (${n})`, otherH: 'और संग्रह', all: 'सारी कहानियाँ',
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    qCount: (name) => `यहाँ ${name} कितनी हैं?`, aCount: (n) => `अभी इस पेज पर ${n} कहानियाँ हैं, और समय-समय पर नई जुड़ती रहती हैं। हर कहानी 2-3 मिनट की है और उसके अंत में एक छोटी सीख है।`,
    qAge: (name) => `${name} किस उम्र के बच्चों के लिए हैं?`, aAge: 'ये 3 से 10 साल के बच्चों के लिए लिखी गई हैं। छोटे बच्चों को सुनाएँ, बड़े बच्चे ख़ुद पढ़ सकते हैं।',
    qListen: 'क्या फ़ोन ये कहानियाँ पढ़कर सुना सकता है?', aListen: 'हाँ। किसी भी कहानी पर "सुनाओ" बटन दबाएँ, फ़ोन ख़ुद कहानी पढ़कर सुना देगा। नाइट मोड और स्लीप टाइमर भी है, और यह सब मुफ़्त है।',
  },
  en: {
    indexH: 'Story collections', indexLead: 'Read every story from one treasure chest together:',
    titleTail: 'short moral stories for kids',
    listH: (n) => `Stories in this collection (${n})`, otherH: 'More collections', all: 'All stories',
    faqH: 'Frequently asked questions',
    qCount: (name) => `How many ${name} are there here?`, aCount: (n) => `This page has ${n} stories right now, and new ones are added from time to time. Each story takes 2-3 minutes and ends with a small lesson.`,
    qAge: (name) => `What age are these ${name} for?`, aAge: 'They are written for children aged 3 to 10. Read them aloud to little ones; older children can read them on their own.',
    qListen: 'Can my phone read these stories aloud?', aListen: 'Yes. Tap "Read aloud" on any story and your phone will read it out. There is a night mode and a sleep timer too, and it is all free.',
  },
  hinglish: {
    indexH: 'Kahaniyon ke sangrah', indexLead: 'Kisi ek khazaane ki saari kahaniyan ek saath padho:',
    titleTail: 'bachchon ke liye seekh wali chhoti kahaniyan',
    listH: (n) => `Is sangrah ki kahaniyan (${n})`, otherH: 'Aur sangrah', all: 'Saari kahaniyan',
    faqH: 'Aksar pooche jaane wale sawaal',
    qCount: (name) => `Yahan ${name} kitni hain?`, aCount: (n) => `Abhi is page par ${n} kahaniyan hain, aur samay-samay par nayi judti rehti hain. Har kahani 2-3 minute ki hai aur uske ant mein ek chhoti seekh hai.`,
    qAge: (name) => `${name} kis umar ke bachchon ke liye hain?`, aAge: 'Yeh 3 se 10 saal ke bachchon ke liye likhi gayi hain. Chhote bachchon ko sunaao, bade bachche khud padh sakte hain.',
    qListen: 'Kya phone yeh kahaniyan padh ke suna sakta hai?', aListen: 'Haan. Kisi bhi kahani par "Sunao" button dabao, phone khud kahani padh ke suna dega. Night mode aur sleep timer bhi hai, aur yeh sab free hai.',
  },
  bn: {
    indexH: 'গল্পের সংগ্রহ', indexLead: 'একটি ভাণ্ডারের সব গল্প একসঙ্গে পড়ুন:',
    titleTail: 'শিশুদের জন্য শিক্ষামূলক ছোট গল্প',
    listH: (n) => `এই সংগ্রহের গল্প (${n})`, otherH: 'আরও সংগ্রহ', all: 'সব গল্প',
    faqH: 'সাধারণ প্রশ্ন',
    qCount: (name) => `এখানে কতগুলো ${name} আছে?`, aCount: (n) => `এই পাতায় এখন ${n}টি গল্প আছে, আর মাঝে মাঝে নতুন গল্প যোগ হয়। প্রতিটি গল্প ২-৩ মিনিটের, শেষে একটা ছোট শিক্ষা থাকে।`,
    qAge: (name) => `এই ${name} কোন বয়সের শিশুদের জন্য?`, aAge: '৩ থেকে ১০ বছরের শিশুদের জন্য লেখা। ছোটদের পড়ে শোনান, বড়রা নিজেরাই পড়তে পারে।',
    qListen: 'ফোন কি এই গল্পগুলো পড়ে শোনাতে পারে?', aListen: 'হ্যাঁ। যেকোনো গল্পে "শোনাও" বোতাম চাপলে ফোন নিজেই পড়ে শোনাবে। নাইট মোড আর স্লিপ টাইমারও আছে, সবই বিনামূল্যে।',
  },
};

export { collections, COLLECTION_UI };
