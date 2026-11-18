/**
 * "Naam wali image" (/naam-wali-image/<occasion>/): a greeting image with the person's name, drawn on a
 * canvas in the browser (src/assets/naam-image.js) — our own designs, nothing uploaded. One page per occasion
 * so each can rank for its own search ("happy new year 2027 image with name", "good morning image with name").
 * Released as a whole with 'page:naam-wali-image' in src/releases.mjs.
 * Per occasion and language: [page h1, short label, image heading, intro], msgs = ready messages.
 */
const NAAM_OCCASIONS = [
  {
    slug: 'new-year', emoji: '🎆', designs: ['ny-fireworks', 'ny-gold', 'ny-confetti'],
    hi: ['नए साल 2027 की नाम वाली इमेज बनाएं', 'नया साल 2027', 'नव वर्ष 2027 की शुभकामनाएँ', 'नए साल 2027 की बधाई इमेज पर अपनों का नाम लिखें और WhatsApp पर भेजें — आतिशबाज़ी, सुनहरा 2027 और रंगीन कंफ़ेटी वाले डिज़ाइन, मुफ़्त।'],
    en: ['Happy New Year 2027 Image with Name', 'New Year 2027', 'Happy New Year 2027', 'Write your loved one\'s name on a Happy New Year 2027 image and send it on WhatsApp — fireworks, golden 2027 and confetti designs, free.'],
    hinglish: ['Happy New Year 2027 Image with Name banao', 'New Year 2027', 'Happy New Year 2027', 'Naye saal 2027 ki badhaai image par apnon ka naam likho aur WhatsApp pe bhejo — aatishbaazi, sunehra 2027 aur rangeen confetti wale design, free.'],
    bn: ['নামসহ হ্যাপি নিউ ইয়ার ২০২৭ ছবি', 'নতুন বছর ২০২৭', 'শুভ নববর্ষ ২০২৭', 'হ্যাপি নিউ ইয়ার ২০২৭-এর ছবিতে প্রিয়জনের নাম লিখে WhatsApp-এ পাঠাও — আতশবাজি, সোনালি ২০২৭ আর রঙিন কনফেটির ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['नया साल आपके लिए ढेर सारी ख़ुशियाँ, अच्छी सेहत और कामयाबी लाए।', 'बीते साल की यादें मीठी रहें, नए साल के सपने पूरे हों।', '2027 में आपकी हर दुआ क़ुबूल हो और हर दिन मुस्कान भरा हो।', 'नए साल में नई उम्मीदें, नई मंज़िलें — ढेर सारी शुभकामनाएँ!'],
      en: ['May the new year bring you lots of happiness, good health and success.', 'Sweet memories of the year gone by, and dreams come true in the year ahead.', 'May every prayer of yours be answered and every day be full of smiles in 2027.', 'New hopes, new goals — warmest wishes for the new year!'],
      hinglish: ['Naya saal aapke liye dher saari khushiyan, achhi sehat aur kaamyaabi laaye.', 'Beete saal ki yaadein meethi rahein, naye saal ke sapne poore hon.', '2027 mein aapki har dua qubool ho aur har din muskaan bhara ho.', 'Naye saal mein nayi ummeedein, nayi manzilein — dher saari shubhkaamnayein!'],
      bn: ['নতুন বছর তোমার জন্য অনেক আনন্দ, সুস্বাস্থ্য আর সাফল্য আনুক।', 'পুরোনো বছরের স্মৃতি মিষ্টি থাকুক, নতুন বছরের স্বপ্ন পূরণ হোক।', '২০২৭-এ তোমার প্রতিটি দিন হাসিতে ভরে থাকুক।', 'নতুন আশা, নতুন লক্ষ্য — নতুন বছরের অনেক শুভেচ্ছা!'],
    },
  },
  {
    slug: 'good-morning', emoji: '🌅', designs: ['gm-sunrise', 'gm-flowers', 'gm-tea'],
    hi: ['गुड मॉर्निंग इमेज नाम के साथ बनाएं', 'गुड मॉर्निंग', 'सुप्रभात', 'हर सुबह अपनों को उनके नाम वाली गुड मॉर्निंग इमेज भेजें — उगता सूरज, फूल और सुबह की चाय वाले डिज़ाइन, मुफ़्त।'],
    en: ['Good Morning Image with Name', 'Good Morning', 'Good Morning', 'Send your loved ones a Good Morning image with their name every day — sunrise, flowers and morning tea designs, free.'],
    hinglish: ['Good Morning Image with Name banao', 'Good Morning', 'Good Morning', 'Har subah apnon ko unke naam wali Good Morning image bhejo — ugta suraj, phool aur subah ki chai wale design, free.'],
    bn: ['নামসহ গুড মর্নিং ছবি', 'গুড মর্নিং', 'সুপ্রভাত', 'প্রতিদিন সকালে প্রিয়জনকে তার নামসহ গুড মর্নিং ছবি পাঠাও — সূর্যোদয়, ফুল আর সকালের চায়ের ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['आपका दिन मुस्कान, सुकून और कामयाबी से भरा रहे।', 'नई सुबह, नई उम्मीद — आज का दिन आपके लिए ख़ास हो।', 'सूरज की पहली किरण आपके घर ख़ुशियाँ लाए।', 'मुस्कुराते रहिए, आपका हर दिन शुभ हो।'],
      en: ['May your day be full of smiles, peace and success.', 'A new morning, a new hope — have a wonderful day.', 'May the first ray of the sun bring joy to your home.', 'Keep smiling — wishing you a beautiful day.'],
      hinglish: ['Aapka din muskaan, sukoon aur kaamyaabi se bhara rahe.', 'Nayi subah, nayi ummeed — aaj ka din aapke liye khaas ho.', 'Suraj ki pehli kiran aapke ghar khushiyan laaye.', 'Muskuraate rahiye, aapka har din shubh ho.'],
      bn: ['তোমার দিন হাসি, শান্তি আর সাফল্যে ভরে থাকুক।', 'নতুন সকাল, নতুন আশা — আজকের দিনটা দারুণ কাটুক।', 'সূর্যের প্রথম আলো তোমার ঘরে আনন্দ আনুক।', 'হাসিখুশি থেকো — তোমার দিন শুভ হোক।'],
    },
  },
  {
    slug: 'good-night', emoji: '🌙', designs: ['gn-moon', 'gn-stars', 'gn-clouds'],
    hi: ['गुड नाइट इमेज नाम के साथ बनाएं', 'गुड नाइट', 'शुभ रात्रि', 'अपनों को उनके नाम वाली गुड नाइट इमेज भेजें — चाँद, तारे और बादलों वाले शांत डिज़ाइन, मुफ़्त।'],
    en: ['Good Night Image with Name', 'Good Night', 'Good Night', 'Send a Good Night image with their name — calm designs with the moon, stars and clouds, free.'],
    hinglish: ['Good Night Image with Name banao', 'Good Night', 'Good Night', 'Apnon ko unke naam wali Good Night image bhejo — chaand, taare aur baadal wale shaant design, free.'],
    bn: ['নামসহ গুড নাইট ছবি', 'গুড নাইট', 'শুভ রাত্রি', 'প্রিয়জনকে তার নামসহ গুড নাইট ছবি পাঠাও — চাঁদ, তারা আর মেঘের শান্ত ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['चैन की नींद और मीठे सपने — शुभ रात्रि।', 'आज की थकान भूल जाइए, कल की नई सुबह आपका इंतज़ार कर रही है।', 'चाँद-तारे आपकी नींद की रखवाली करें।', 'दिन अच्छा बीता हो, रात सुकून भरी हो।'],
      en: ['Sleep well and sweet dreams — good night.', 'Let go of today\'s tiredness; a fresh morning is waiting for you.', 'May the moon and stars watch over your sleep.', 'Hope your day went well — have a peaceful night.'],
      hinglish: ['Chain ki neend aur meethe sapne — good night.', 'Aaj ki thakaan bhool jaiye, kal ki nayi subah aapka intezaar kar rahi hai.', 'Chaand-taare aapki neend ki rakhwaali karein.', 'Din achha beeta ho, raat sukoon bhari ho.'],
      bn: ['শান্তির ঘুম আর মিষ্টি স্বপ্ন — শুভ রাত্রি।', 'আজকের ক্লান্তি ভুলে যাও, কালকের নতুন সকাল তোমার অপেক্ষায়।', 'চাঁদ-তারা তোমার ঘুম পাহারা দিক।', 'দিন ভালো কেটেছে আশা করি, রাত শান্তিতে কাটুক।'],
    },
  },
  {
    slug: 'birthday', emoji: '🎂', designs: ['bd-balloons', 'bd-cake', 'bd-confetti'],
    hi: ['हैप्पी बर्थडे इमेज नाम के साथ बनाएं', 'जन्मदिन', 'जन्मदिन मुबारक', 'जन्मदिन की बधाई इमेज पर नाम लिखें और WhatsApp पर भेजें — गुब्बारे, केक और कंफ़ेटी वाले डिज़ाइन, मुफ़्त।'],
    en: ['Happy Birthday Image with Name', 'Birthday', 'Happy Birthday', 'Write a name on a Happy Birthday image and send it on WhatsApp — balloons, cake and confetti designs, free.'],
    hinglish: ['Happy Birthday Image with Name banao', 'Birthday', 'Happy Birthday', 'Janmdin ki badhaai image par naam likho aur WhatsApp pe bhejo — gubbare, cake aur confetti wale design, free.'],
    bn: ['নামসহ হ্যাপি বার্থডে ছবি', 'জন্মদিন', 'শুভ জন্মদিন', 'জন্মদিনের শুভেচ্ছার ছবিতে নাম লিখে WhatsApp-এ পাঠাও — বেলুন, কেক আর কনফেটির ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['जन्मदिन की ढेर सारी बधाई! आपकी हर ख़्वाहिश पूरी हो।', 'ख़ुश रहो, आबाद रहो — जन्मदिन मुबारक हो!', 'आपका ये साल सबसे शानदार हो।', 'केक मीठा हो और साल उससे भी मीठा!'],
      en: ['Many happy returns of the day! May all your wishes come true.', 'Stay happy, always — happy birthday!', 'May this be your best year yet.', 'Sweet cake, and an even sweeter year ahead!'],
      hinglish: ['Janmdin ki dher saari badhaai! Aapki har khwahish poori ho.', 'Khush raho, aabaad raho — happy birthday!', 'Aapka yeh saal sabse shaandaar ho.', 'Cake meetha ho aur saal usse bhi meetha!'],
      bn: ['জন্মদিনের অনেক শুভেচ্ছা! তোমার সব ইচ্ছে পূরণ হোক।', 'ভালো থেকো, সবসময় — শুভ জন্মদিন!', 'এই বছরটা তোমার সবচেয়ে সেরা হোক।', 'কেক মিষ্টি হোক, আর বছরটা তার চেয়েও মিষ্টি!'],
    },
  },
  {
    slug: 'christmas', emoji: '🎄', designs: ['xm-tree', 'xm-snow', 'xm-star'],
    hi: ['मेरी क्रिसमस इमेज नाम के साथ बनाएं', 'क्रिसमस', 'मेरी क्रिसमस', 'क्रिसमस की बधाई इमेज पर नाम लिखें — सजा हुआ पेड़, बर्फ़ और चमकते तारे वाले डिज़ाइन, मुफ़्त।'],
    en: ['Merry Christmas Image with Name', 'Christmas', 'Merry Christmas', 'Write a name on a Merry Christmas image — decorated tree, snow and shining star designs, free.'],
    hinglish: ['Merry Christmas Image with Name banao', 'Christmas', 'Merry Christmas', 'Christmas ki badhaai image par naam likho — saja hua ped, barf aur chamakte taare wale design, free.'],
    bn: ['নামসহ মেরি ক্রিসমাস ছবি', 'বড়দিন', 'মেরি ক্রিসমাস', 'বড়দিনের শুভেচ্ছার ছবিতে নাম লেখো — সাজানো গাছ, বরফ আর ঝলমলে তারার ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['क्रिसमस आपके घर ख़ुशियाँ, प्यार और रौनक लाए।', 'मेरी क्रिसमस! यह त्योहार आपके जीवन में नई रोशनी लाए।', 'सांता आपकी हर इच्छा पूरी करे।', 'प्यार बाँटिए, ख़ुशियाँ मनाइए — मेरी क्रिसमस!'],
      en: ['May Christmas bring joy, love and cheer to your home.', 'Merry Christmas! May this season light up your life.', 'May Santa bring you everything you wished for.', 'Share love, spread joy — Merry Christmas!'],
      hinglish: ['Christmas aapke ghar khushiyan, pyaar aur raunak laaye.', 'Merry Christmas! Yeh tyohaar aapke jeevan mein nayi roshni laaye.', 'Santa aapki har ichchha poori kare.', 'Pyaar baantiye, khushiyan manaiye — Merry Christmas!'],
      bn: ['বড়দিন তোমার ঘরে আনন্দ, ভালোবাসা আর উৎসব আনুক।', 'মেরি ক্রিসমাস! এই উৎসব তোমার জীবনে নতুন আলো আনুক।', 'সান্তা তোমার সব ইচ্ছে পূরণ করুক।', 'ভালোবাসা ভাগ করো, আনন্দ ছড়াও — মেরি ক্রিসমাস!'],
    },
  },
  {
    slug: 'lohri', emoji: '🔥', designs: ['lo-fire', 'lo-dhol', 'lo-kites'],
    hi: ['हैप्पी लोहड़ी इमेज नाम के साथ बनाएं', 'लोहड़ी', 'लोहड़ी की लख-लख बधाइयाँ', 'लोहड़ी की बधाई इमेज पर नाम लिखें — अलाव, ढोल और पतंगों वाले डिज़ाइन, मुफ़्त।'],
    en: ['Happy Lohri Image with Name', 'Lohri', 'Happy Lohri', 'Write a name on a Happy Lohri image — bonfire, dhol and kite designs, free.'],
    hinglish: ['Happy Lohri Image with Name banao', 'Lohri', 'Lohri di lakh-lakh vadhaiyan', 'Lohri ki badhaai image par naam likho — alaav, dhol aur patangon wale design, free.'],
    bn: ['নামসহ হ্যাপি লোহরি ছবি', 'লোহরি', 'লোহরির শুভেচ্ছা', 'লোহরির শুভেচ্ছার ছবিতে নাম লেখো — আগুন, ঢোল আর ঘুড়ির ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['लोहड़ी की आग में हर दुख जल जाए, घर में ख़ुशियाँ आएँ।', 'रेवड़ी-मूंगफली की मिठास और ढोल की थाप — लोहड़ी मुबारक!', 'नई फ़सल, नई ख़ुशियाँ — लोहड़ी की लख-लख बधाइयाँ।', 'अलाव की गर्माहट आपके रिश्तों में भी रहे।'],
      en: ['May every sorrow burn away in the Lohri fire and joy fill your home.', 'Sweet rewri, peanuts and the beat of the dhol — Happy Lohri!', 'A new harvest and new happiness — warm Lohri wishes.', 'May the warmth of the bonfire stay in your relationships.'],
      hinglish: ['Lohri ki aag mein har dukh jal jaaye, ghar mein khushiyan aayein.', 'Rewri-moongphali ki mithaas aur dhol ki thaap — Lohri mubarak!', 'Nayi fasal, nayi khushiyan — Lohri di lakh-lakh vadhaiyan.', 'Alaav ki garmaahat aapke rishton mein bhi rahe.'],
      bn: ['লোহরির আগুনে সব দুঃখ পুড়ে যাক, ঘরে আনন্দ আসুক।', 'রেউড়ি-বাদামের মিষ্টি আর ঢোলের তাল — শুভ লোহরি!', 'নতুন ফসল, নতুন আনন্দ — লোহরির শুভেচ্ছা।', 'আগুনের উষ্ণতা তোমার সম্পর্কেও থাকুক।'],
    },
  },
  {
    slug: 'makar-sankranti', emoji: '🪁', designs: ['ms-kites', 'ms-sun', 'ms-tilgud'],
    hi: ['मकर संक्रांति इमेज नाम के साथ बनाएं', 'मकर संक्रांति', 'मकर संक्रांति की शुभकामनाएँ', 'मकर संक्रांति की बधाई इमेज पर नाम लिखें — पतंगें, सूरज और तिल-गुड़ वाले डिज़ाइन, मुफ़्त।'],
    en: ['Happy Makar Sankranti Image with Name', 'Makar Sankranti', 'Happy Makar Sankranti', 'Write a name on a Makar Sankranti image — kites, sun and til-gud designs, free.'],
    hinglish: ['Makar Sankranti Image with Name banao', 'Makar Sankranti', 'Makar Sankranti ki shubhkaamnayein', 'Makar Sankranti ki badhaai image par naam likho — patangein, suraj aur til-gud wale design, free.'],
    bn: ['নামসহ মকর সংক্রান্তির ছবি', 'মকর সংক্রান্তি', 'মকর সংক্রান্তির শুভেচ্ছা', 'মকর সংক্রান্তির ছবিতে নাম লেখো — ঘুড়ি, সূর্য আর তিল-গুড়ের ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['तिल-गुड़ की मिठास और पतंगों की उड़ान आपके जीवन में ख़ुशियाँ भरे।', 'सूरज की नई चाल, आपके लिए नई ख़ुशहाली लाए।', 'तिल-गुड़ लो, मीठा-मीठा बोलो — संक्रांति मुबारक!', 'आपकी पतंग हमेशा ऊँची उड़े।'],
      en: ['May the sweetness of til-gud and the flight of kites fill your life with joy.', 'As the sun begins its new journey, may it bring you new prosperity.', 'Have til-gud, speak sweetly — Happy Sankranti!', 'May your kite always fly high.'],
      hinglish: ['Til-gud ki mithaas aur patangon ki udaan aapke jeevan mein khushiyan bhare.', 'Suraj ki nayi chaal aapke liye nayi khushhaali laaye.', 'Til-gud lo, meetha-meetha bolo — Sankranti mubarak!', 'Aapki patang hamesha oonchi ude.'],
      bn: ['তিল-গুড়ের মিষ্টি আর ঘুড়ির উড়ান তোমার জীবন আনন্দে ভরুক।', 'সূর্যের নতুন যাত্রা তোমার জন্য নতুন সমৃদ্ধি আনুক।', 'পিঠে-পুলির মিষ্টি দিনে অনেক শুভেচ্ছা!', 'তোমার ঘুড়ি সবসময় উঁচুতে উড়ুক।'],
    },
  },
  {
    slug: 'republic-day', emoji: '🇮🇳', designs: ['rd-flag', 'rd-gate', 'rd-chakra'],
    hi: ['गणतंत्र दिवस इमेज नाम के साथ बनाएं', 'गणतंत्र दिवस', 'गणतंत्र दिवस की शुभकामनाएँ', '26 जनवरी की बधाई इमेज पर नाम लिखें — लहराता तिरंगा, इंडिया गेट और अशोक चक्र वाले डिज़ाइन, मुफ़्त।'],
    en: ['Happy Republic Day Image with Name', 'Republic Day', 'Happy Republic Day', 'Write a name on a 26 January image — waving tricolour, India Gate and Ashoka Chakra designs, free.'],
    hinglish: ['Republic Day Image with Name banao', 'Republic Day', 'Gantantra Diwas ki shubhkaamnayein', '26 January ki badhaai image par naam likho — lehrata tiranga, India Gate aur Ashok Chakra wale design, free.'],
    bn: ['নামসহ প্রজাতন্ত্র দিবসের ছবি', 'প্রজাতন্ত্র দিবস', 'প্রজাতন্ত্র দিবসের শুভেচ্ছা', '২৬ জানুয়ারির ছবিতে নাম লেখো — উড়ন্ত তেরঙা, ইন্ডিয়া গেট আর অশোক চক্রের ডিজাইন, বিনামূল্যে।'],
    msgs: {
      hi: ['तिरंगा यूँ ही शान से लहराता रहे — जय हिंद!', 'संविधान का सम्मान, देश का अभिमान — गणतंत्र दिवस की बधाई।', 'केसरिया की हिम्मत, सफ़ेद की शांति, हरे की ख़ुशहाली आपके साथ रहे।', 'आइए, मिलकर देश को और आगे ले जाएँ।'],
      en: ['May the tricolour always fly high — Jai Hind!', 'Respect for the Constitution, pride in the nation — Happy Republic Day.', 'May the courage of saffron, the peace of white and the prosperity of green be with you.', 'Let\'s take our country forward, together.'],
      hinglish: ['Tiranga yun hi shaan se lehrata rahe — Jai Hind!', 'Samvidhan ka samman, desh ka abhimaan — Republic Day ki badhaai.', 'Kesariya ki himmat, safed ki shaanti, hare ki khushhaali aapke saath rahe.', 'Aaiye, milkar desh ko aur aage le jaayein.'],
      bn: ['তেরঙা এভাবেই গর্বে উড়ুক — জয় হিন্দ!', 'সংবিধানের সম্মান, দেশের গর্ব — প্রজাতন্ত্র দিবসের শুভেচ্ছা।', 'গেরুয়ার সাহস, সাদার শান্তি, সবুজের সমৃদ্ধি তোমার সঙ্গে থাকুক।', 'চলো, সবাই মিলে দেশকে আরও এগিয়ে নিয়ে যাই।'],
    },
  },
];

const NAAM_UI = {
  hi: {
    hubTitle: 'नाम वाली इमेज बनाएं — नए साल, गुड मॉर्निंग, बर्थडे की फ़्री इमेज | NextGrade', hubH1: '🖼️ नाम वाली इमेज बनाएं', hubLead: 'मौका चुनें, नाम लिखें और कुछ ही सेकंड में सुंदर इमेज बनाकर WhatsApp पर भेजें। इमेज आपके फ़ोन पर ही बनती है — नाम कहीं सेव या भेजा नहीं जाता।',
    title: (h) => `${h} — फ़्री | NextGrade`, to: 'किसका नाम लिखना है', toPh: 'जैसे: मम्मी, Priya', from: 'आपका नाम (नीचे लिखा जाएगा)', fromPh: 'जैसे: Rahul', msg: 'संदेश', custom: 'या अपना संदेश लिखें', design: 'डिज़ाइन', size: 'साइज़', square: 'WhatsApp (चौकोर)', status: 'स्टेटस (लंबी)', share: '📲 WhatsApp पर भेजें', download: '⬇️ डाउनलोड', downloaded: '✅ इमेज डाउनलोड हो गई', cantShare: 'इस ब्राउज़र में सीधा शेयर नहीं होता — डाउनलोड करके भेजें।', from2: (f) => `— ${f}`, more: 'और मौके',
    howH: 'कैसे बनाएं', how: ['ऊपर नाम लिखें — इमेज पर तुरंत दिख जाएगा।', 'तैयार संदेश चुनें या अपना लिखें, और पसंद का डिज़ाइन चुनें।', 'WhatsApp के लिए चौकोर या स्टेटस के लिए लंबी साइज़ चुनें।', '<b>WhatsApp पर भेजें</b> दबाएँ, या डाउनलोड करके कहीं भी भेजें।'],
    faqH: 'अक्सर पूछे जाने वाले सवाल', faq: (lbl) => [[`${lbl} की नाम वाली इमेज कैसे बनाएं?`, 'ऊपर नाम लिखें, संदेश और डिज़ाइन चुनें, फिर "WhatsApp पर भेजें" या "डाउनलोड" दबाएँ। कोई ऐप या साइन-अप नहीं चाहिए।'], ['क्या यह मुफ़्त है? इमेज पर कोई वॉटरमार्क है?', 'हाँ, पूरी तरह मुफ़्त। इमेज के कोने में सिर्फ़ छोटा-सा nextgrade.in लिखा रहता है।'], ['क्या मेरा नाम कहीं सेव होता है?', 'नहीं। इमेज आपके फ़ोन के ब्राउज़र में ही बनती है; नाम और संदेश कहीं भेजे या सेव नहीं होते।']],
  },
  en: {
    hubTitle: 'Image with Name — Free New Year, Good Morning & Birthday Images | NextGrade', hubH1: '🖼️ Make an image with a name', hubLead: 'Pick an occasion, type a name and make a beautiful image in seconds to send on WhatsApp. The image is made on your phone — the name is never saved or sent anywhere.',
    title: (h) => `${h} — Free | NextGrade`, to: 'Name to write', toPh: 'e.g. Maa, Priya', from: 'Your name (written at the bottom)', fromPh: 'e.g. Rahul', msg: 'Message', custom: 'Or write your own message', design: 'Design', size: 'Size', square: 'WhatsApp (square)', status: 'Status (tall)', share: '📲 Send on WhatsApp', download: '⬇️ Download', downloaded: '✅ Image downloaded', cantShare: 'This browser can\'t share directly — download and send it.', from2: (f) => `— ${f}`, more: 'More occasions',
    howH: 'How to make it', how: ['Type the name above — it appears on the image at once.', 'Pick a ready message or write your own, and choose a design.', 'Choose square for WhatsApp or tall for a status.', 'Tap <b>Send on WhatsApp</b>, or download it and send it anywhere.'],
    faqH: 'Frequently asked questions', faq: (lbl) => [[`How do I make a ${lbl} image with a name?`, 'Type the name, pick a message and a design, then tap "Send on WhatsApp" or "Download". No app or sign-up needed.'], ['Is it free? Is there a watermark?', 'Yes, completely free. Only a small nextgrade.in appears in the corner.'], ['Is my name saved anywhere?', 'No. The image is made inside your phone\'s browser; the name and message are never sent or stored.']],
  },
  hinglish: {
    hubTitle: 'Naam Wali Image banao — New Year, Good Morning, Birthday ki Free Image | NextGrade', hubH1: '🖼️ Naam wali image banao', hubLead: 'Mauka chuno, naam likho aur kuch hi second mein sundar image bana kar WhatsApp pe bhejo. Image aapke phone par hi banti hai — naam kahin save ya bheja nahi jaata.',
    title: (h) => `${h} — Free | NextGrade`, to: 'Kiska naam likhna hai', toPh: 'Jaise: Mummy, Priya', from: 'Aapka naam (neeche likha jayega)', fromPh: 'Jaise: Rahul', msg: 'Message', custom: 'Ya apna message likho', design: 'Design', size: 'Size', square: 'WhatsApp (chaukor)', status: 'Status (lambi)', share: '📲 WhatsApp pe bhejo', download: '⬇️ Download', downloaded: '✅ Image download ho gayi', cantShare: 'Is browser mein seedha share nahi hota — download karke bhejo.', from2: (f) => `— ${f}`, more: 'Aur mauke',
    howH: 'Kaise banayein', how: ['Upar naam likho — image par turant dikh jayega.', 'Taiyaar message chuno ya apna likho, aur pasand ka design chuno.', 'WhatsApp ke liye chaukor ya status ke liye lambi size chuno.', '<b>WhatsApp pe bhejo</b> dabao, ya download karke kahin bhi bhejo.'],
    faqH: 'Aksar pooche jaane wale sawaal', faq: (lbl) => [[`${lbl} ki naam wali image kaise banayein?`, 'Upar naam likho, message aur design chuno, phir "WhatsApp pe bhejo" ya "Download" dabao. Koi app ya sign-up nahi chahiye.'], ['Kya yeh free hai? Image par watermark hai?', 'Haan, bilkul free. Image ke kone mein sirf chhota sa nextgrade.in likha rehta hai.'], ['Kya mera naam kahin save hota hai?', 'Nahi. Image aapke phone ke browser mein hi banti hai; naam aur message kahin bheje ya save nahi hote.']],
  },
  bn: {
    hubTitle: 'নামসহ ছবি বানাও — নববর্ষ, গুড মর্নিং, জন্মদিনের ফ্রি ছবি | NextGrade', hubH1: '🖼️ নামসহ ছবি বানাও', hubLead: 'উপলক্ষ বাছো, নাম লেখো আর কয়েক সেকেন্ডে সুন্দর ছবি বানিয়ে WhatsApp-এ পাঠাও। ছবি তোমার ফোনেই তৈরি হয় — নাম কোথাও সেভ বা পাঠানো হয় না।',
    title: (h) => `${h} — বিনামূল্যে | NextGrade`, to: 'কার নাম লিখবে', toPh: 'যেমন: মা, প্রিয়া', from: 'তোমার নাম (নিচে লেখা হবে)', fromPh: 'যেমন: রাহুল', msg: 'বার্তা', custom: 'বা নিজের বার্তা লেখো', design: 'ডিজাইন', size: 'সাইজ', square: 'WhatsApp (বর্গাকার)', status: 'স্ট্যাটাস (লম্বা)', share: '📲 WhatsApp-এ পাঠাও', download: '⬇️ ডাউনলোড', downloaded: '✅ ছবি ডাউনলোড হয়েছে', cantShare: 'এই ব্রাউজারে সরাসরি শেয়ার হয় না — ডাউনলোড করে পাঠাও।', from2: (f) => `— ${f}`, more: 'আরও উপলক্ষ',
    howH: 'কীভাবে বানাবে', how: ['ওপরে নাম লেখো — ছবিতে সঙ্গে সঙ্গে দেখা যাবে।', 'তৈরি বার্তা বাছো বা নিজে লেখো, আর পছন্দের ডিজাইন বাছো।', 'WhatsApp-এর জন্য বর্গাকার বা স্ট্যাটাসের জন্য লম্বা সাইজ বাছো।', '<b>WhatsApp-এ পাঠাও</b> চাপো, বা ডাউনলোড করে যেকোনো জায়গায় পাঠাও।'],
    faqH: 'সাধারণ প্রশ্ন', faq: (lbl) => [[`নামসহ ${lbl}-এর ছবি কীভাবে বানাব?`, 'নাম লেখো, বার্তা আর ডিজাইন বাছো, তারপর "WhatsApp-এ পাঠাও" বা "ডাউনলোড" চাপো। কোনো অ্যাপ বা সাইন-আপ লাগে না।'], ['এটা কি ফ্রি? ছবিতে ওয়াটারমার্ক আছে?', 'হ্যাঁ, পুরো ফ্রি। ছবির কোণে শুধু ছোট্ট করে nextgrade.in লেখা থাকে।'], ['আমার নাম কি কোথাও সেভ হয়?', 'না। ছবি তোমার ফোনের ব্রাউজারেই তৈরি হয়; নাম আর বার্তা কোথাও পাঠানো বা সেভ হয় না।']],
  },
};

export { NAAM_OCCASIONS, NAAM_UI };
