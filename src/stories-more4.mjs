/**
 * Fifth batch of stories (added 17 Nov 2026): Premchand (Idgah, Do Bailon ki Katha), Tagore (Kabuliwala),
 * Hitopadesha and Jataka. Same shape as src/stories.mjs. Premchand (d. 1936) and Tagore (d. 1941) are in the
 * public domain in India; every story here is a short retelling for children in our own words, not their text.
 */
const SRC = {
  premchand: { hi: 'मुंशी प्रेमचंद की कहानी', en: 'Munshi Premchand', hinglish: 'Munshi Premchand ki kahani', bn: 'মুন্সি প্রেমচাঁদের গল্প' },
  tagore: { hi: 'रवींद्रनाथ टैगोर की कहानी', en: 'Rabindranath Tagore', hinglish: 'Rabindranath Tagore ki kahani', bn: 'রবীন্দ্রনাথ ঠাকুরের গল্প' },
  hitopadesha: { hi: 'हितोपदेश', en: 'Hitopadesha', hinglish: 'Hitopadesha', bn: 'হিতোপদেশ' },
  jataka: { hi: 'जातक कथा', en: 'Jataka tale', hinglish: 'Jataka katha', bn: 'জাতকের গল্প' },
};

const moreStories4 = [
  {
    slug: 'idgah',
    emoji: '🌙',
    minutes: 4,
    source: SRC.premchand,
    hi: {
      title: 'ईदगाह — हामिद का चिमटा',
      paras: [
        'रमज़ान के तीस रोज़ों के बाद ईद की सुबह आई। गाँव में बच्चे सबसे ज़्यादा ख़ुश थे, क्योंकि आज ईदगाह के मेले में जाना था। उन्हीं में चार-पाँच साल का हामिद भी था, जो अपनी बूढ़ी दादी अमीना के साथ रहता था। उसके अब्बा-अम्मी नहीं रहे थे, पर दादी ने उसे बताया था कि वे बहुत सारी चीज़ें लेकर लौटेंगे — और हामिद इसी उम्मीद में ख़ुश रहता था।',
        'दादी के पास ज़्यादा पैसे नहीं थे। उसने हामिद को सिर्फ़ तीन पैसे दिए। दोस्तों — महमूद, मोहसिन और नूरे — की जेबें भरी थीं। मेले में किसी ने सिपाही ख़रीदा, किसी ने भिश्ती और किसी ने वकील का खिलौना। फिर सबने रेवड़ी, गुलाब-जामुन और सोहन हलवा खाया। हामिद ललचाया, पर उसने अपने पैसे नहीं खर्चे।',
        'आगे लोहे की दुकान पर हामिद को एक चिमटा दिखा। उसे याद आया कि रोटी सेंकते समय दादी की उँगलियाँ रोज़ तवे से जल जाती हैं। उसने मोल-भाव करके तीन पैसे में चिमटा ख़रीद लिया और कंधे पर बंदूक़ की तरह रखकर चल पड़ा।',
        'दोस्तों ने हँसी उड़ाई — "चिमटा भी कोई खिलौना है?" हामिद ने तुरंत जवाब दिया, "मेरा चिमटा बहादुर है! तुम्हारे मिट्टी के खिलौने गिरते ही टूट जाएँगे, मेरा चिमटा आग में भी नहीं डरेगा।" उसकी बातों से सब दोस्त चुप हो गए, और घर पहुँचते-पहुँचते उनके कई खिलौने सच में टूट भी गए।',
        'घर पहुँचकर हामिद ने चिमटा दादी के हाथ में रख दिया। पहले तो दादी नाराज़ हुई कि बच्चे ने अपने लिए कुछ खाया-पिया नहीं। फिर जब उसने सुना कि यह उसकी जली उँगलियों के लिए है, तो उसकी आँखें भर आईं। वह हामिद को गले लगाकर दुआएँ देने लगी। उस दिन एक छोटे बच्चे ने बड़ों जैसा काम किया था।',
      ],
      seekh: 'सच्ची ख़ुशी अपनों का ख़याल रखने में है। जो दूसरों के दर्द को समझता है, वही सबसे बड़ा है — उम्र चाहे कितनी भी छोटी हो।',
    },
    en: {
      title: 'Idgah — Hamid\'s Tongs',
      paras: [
        'After thirty days of Ramzan fasting, the morning of Eid arrived. The children of the village were the happiest of all, because today they would go to the fair at the Idgah. Among them was Hamid, four or five years old, who lived with his old grandmother, Amina. His parents were no more, but Grandma had told him they would come back with lots of gifts — and Hamid stayed cheerful in that hope.',
        'Grandma did not have much money. She gave Hamid just three paise. His friends — Mahmood, Mohsin and Noore — had pockets full of coins. At the fair one bought a toy soldier, one a water-carrier and one a lawyer. Then they all ate rewri, gulab jamun and sohan halwa. Hamid\'s mouth watered, but he did not spend his money.',
        'Further on, at an ironmonger\'s shop, Hamid saw a pair of tongs. He remembered that every day Grandma burnt her fingers on the hot tawa while making rotis. He bargained, bought the tongs for three paise, and marched off with them on his shoulder like a gun.',
        'His friends laughed — "Tongs are not a toy!" Hamid answered at once, "My tongs are brave! Your clay toys will break the moment they fall; my tongs are not even afraid of fire." His words silenced them, and by the time they reached home, several of their toys really had broken.',
        'At home Hamid put the tongs in Grandma\'s hands. At first she was upset that the child had not eaten anything at the fair. Then she heard that the tongs were for her burnt fingers, and her eyes filled with tears. She hugged Hamid and blessed him again and again. That day a little boy had done what even grown-ups forget to do.',
      ],
      seekh: 'True happiness lies in caring for the people we love. Whoever understands another\'s pain is the biggest of all — however young they are.',
    },
    hinglish: {
      title: 'Idgah — Hamid ka Chimta',
      paras: [
        'Ramzan ke tees rozon ke baad Eid ki subah aayi. Gaanv mein bachche sabse zyada khush the, kyunki aaj Idgah ke mele mein jaana tha. Unhi mein chaar-paanch saal ka Hamid bhi tha, jo apni boodhi dadi Amina ke saath rehta tha. Uske abba-ammi nahi rahe the, par dadi ne bataya tha ki woh bahut saari cheezein le kar lautenge — aur Hamid isi ummeed mein khush rehta tha.',
        'Dadi ke paas zyada paise nahi the. Usne Hamid ko sirf teen paise diye. Doston — Mahmood, Mohsin aur Noore — ki jebein bhari thi. Mele mein kisi ne sipahi khareeda, kisi ne bhishti aur kisi ne vakeel ka khilauna. Phir sabne rewri, gulab jamun aur sohan halwa khaaya. Hamid lalchaya, par usne apne paise nahi kharche.',
        'Aage lohe ki dukaan pe Hamid ko ek chimta dikha. Use yaad aaya ki roti senkte waqt dadi ki ungliyan roz tawe se jal jaati hain. Usne mol-bhaav karke teen paise mein chimta khareed liya aur kandhe pe bandook ki tarah rakh kar chal pada.',
        'Doston ne hansi udaayi — "Chimta bhi koi khilauna hai?" Hamid ne turant jawab diya, "Mera chimta bahadur hai! Tumhare mitti ke khilaune girte hi toot jaayenge, mera chimta aag mein bhi nahi darega." Uski baaton se sab dost chup ho gaye, aur ghar pahunchte-pahunchte unke kai khilaune sach mein toot bhi gaye.',
        'Ghar pahunch kar Hamid ne chimta dadi ke haath mein rakh diya. Pehle to dadi naraaz hui ki bachche ne apne liye kuch khaaya-piya nahi. Phir jab suna ki yeh uski jali ungliyon ke liye hai, to uski aankhein bhar aayi. Woh Hamid ko gale laga kar duaayein dene lagi. Us din ek chhote bachche ne badon jaisa kaam kiya tha.',
      ],
      seekh: 'Sachchi khushi apno ka khayal rakhne mein hai. Jo doosron ka dard samajhta hai, wahi sabse bada hai — umar chahe kitni bhi chhoti ho.',
    },
    bn: {
      title: 'ঈদগাহ — হামিদের চিমটে',
      paras: [
        'রমজানের তিরিশটা রোজার পরে ঈদের সকাল এল। গ্রামের ছোটরাই সবচেয়ে খুশি, কারণ আজ ঈদগাহের মেলায় যাওয়া। তাদের মধ্যে ছিল চার-পাঁচ বছরের হামিদ, যে তার বুড়ি দাদি আমিনার সঙ্গে থাকত। তার বাবা-মা আর নেই, কিন্তু দাদি বলেছিল তাঁরা অনেক জিনিস নিয়ে ফিরবেন — আর হামিদ সেই আশাতেই খুশি থাকত।',
        'দাদির কাছে বেশি টাকা ছিল না। হামিদকে মাত্র তিন পয়সা দিল। বন্ধু মাহমুদ, মোহসিন আর নূরের পকেট ভর্তি। মেলায় কেউ সিপাই কিনল, কেউ ভিস্তিওয়ালা, কেউ উকিলের পুতুল। তারপর সবাই রেউড়ি, গোলাপজাম আর সোহন হালুয়া খেল। হামিদের লোভ হল, কিন্তু সে পয়সা খরচ করল না।',
        'আরও এগিয়ে লোহার দোকানে হামিদ একটা চিমটে দেখল। মনে পড়ল, রুটি সেঁকার সময় রোজ তাওয়ায় দাদির আঙুল পুড়ে যায়। দরদাম করে তিন পয়সায় চিমটেটা কিনে, বন্দুকের মতো কাঁধে নিয়ে সে হাঁটা দিল।',
        'বন্ধুরা হাসল — "চিমটে আবার খেলনা নাকি?" হামিদ সঙ্গে সঙ্গে বলল, "আমার চিমটে সাহসী! তোমাদের মাটির পুতুল পড়লেই ভাঙবে, আমার চিমটে আগুনেও ভয় পায় না।" তার কথায় সবাই চুপ করে গেল, আর বাড়ি ফেরার আগেই সত্যি তাদের কয়েকটা খেলনা ভেঙেও গেল।',
        'বাড়ি ফিরে হামিদ চিমটেটা দাদির হাতে দিল। দাদি প্রথমে রাগ করল — ছেলেটা মেলায় নিজে কিছু খায়নি! তারপর যখন শুনল এটা তার পোড়া আঙুলের জন্য, তার চোখে জল এসে গেল। হামিদকে বুকে জড়িয়ে সে দোয়া করতে লাগল। সেদিন এক ছোট্ট ছেলে বড়দের মতো কাজ করেছিল।',
      ],
      seekh: 'আসল আনন্দ আপনজনের যত্নে। যে অন্যের কষ্ট বোঝে, সে-ই সবচেয়ে বড় — বয়স যত ছোটই হোক।',
    },
  },
  {
    slug: 'do-bailon-ki-katha',
    emoji: '🐂',
    minutes: 4,
    source: SRC.premchand,
    hi: {
      title: 'दो बैलों की कथा — हीरा और मोती',
      paras: [
        'झूरी नाम के एक किसान के पास दो बैल थे — हीरा और मोती। दोनों बचपन से साथ पले थे और एक-दूसरे को बिना बोले समझ लेते थे। हल में जुतते तो कंधे से कंधा मिलाकर चलते, और झूरी उन्हें अपने बच्चों जैसा प्यार करता था।',
        'एक दिन झूरी की पत्नी ने दोनों बैल अपने भाई गया के यहाँ काम के लिए भेज दिए। हीरा-मोती को लगा कि उन्हें बेच दिया गया है। गया के घर उन्हें सूखा भूसा मिलता और डंडे पड़ते। एक रात दोनों रस्सी तुड़ाकर झूरी के घर लौट आए। झूरी उन्हें देखकर बहुत ख़ुश हुआ।',
        'गया उन्हें फिर ले गया और इस बार और कसकर बाँधा। वहाँ एक छोटी लड़की, जिसे उसकी सौतेली माँ सताती थी, चुपके से रात में उन्हें रोटियाँ खिलाती। एक रात उसी ने उनकी रस्सी खोल दी और फुसफुसाई, "भाग जाओ, वरना ये लोग तुम्हें मार डालेंगे।"',
        'रास्ता भटककर वे एक बड़े साँड से भिड़े और दोनों ने मिलकर उसे हरा दिया। फिर भूख के मारे एक खेत में चरते हुए पकड़े गए और काँजीहौस (पशुओं की जेल) में बंद कर दिए गए। वहाँ भेड़-बकरियाँ और गधे भूखे-प्यासे पड़े थे। मोती ने अपने सींगों से दीवार गिरा दी और सब जानवर आज़ाद होकर भाग गए, पर हीरा बँधा रह गया, इसलिए मोती भी उसे छोड़कर नहीं गया।',
        'कुछ दिन बाद उन्हें नीलाम कर दिया गया। ख़रीदार उन्हें ले जा रहा था कि रास्ता जाना-पहचाना लगा — यह तो उनके गाँव का रास्ता था! दोनों दौड़ पड़े और सीधे झूरी के दरवाज़े पर जाकर रुके। झूरी ने उन्हें गले से लगा लिया, और गाँव वालों ने ख़रीदार को लौटा दिया। हीरा और मोती अपने घर लौट आए थे।',
      ],
      seekh: 'सच्चा दोस्त मुश्किल में भी साथ नहीं छोड़ता। और जो दूसरों को आज़ादी दिलाता है, उसकी हिम्मत कभी बेकार नहीं जाती।',
    },
    en: {
      title: 'The Story of Two Bullocks — Heera and Moti',
      paras: [
        'A farmer named Jhuri had two bullocks, Heera and Moti. They had grown up together and understood each other without a word. Yoked to the plough they walked shoulder to shoulder, and Jhuri loved them like his own children.',
        'One day Jhuri\'s wife sent both bullocks to work at her brother Gaya\'s place. Heera and Moti thought they had been sold. At Gaya\'s house they got dry straw and blows of the stick. One night the two broke their ropes and came back to Jhuri\'s home. Jhuri was overjoyed to see them.',
        'Gaya took them away again and tied them even tighter. There, a little girl who was ill-treated by her stepmother secretly fed them rotis at night. One night she untied their ropes and whispered, "Run away, or these people will kill you."',
        'Lost on the way, they faced a huge bull and beat it together. Then, hungry, they were caught grazing in a field and locked in the kanji-house, the pound for stray animals, where sheep, goats and donkeys lay hungry and thirsty. Moti knocked down the wall with his horns and all the animals ran free — but Heera was still tied, so Moti would not leave him.',
        'A few days later they were auctioned. As the buyer led them away, the road began to look familiar — it was the road to their own village! The two ran and stopped right at Jhuri\'s door. Jhuri hugged them, and the villagers sent the buyer back. Heera and Moti were home again.',
      ],
      seekh: 'A true friend never leaves you in trouble. And whoever helps others to be free never wastes their courage.',
    },
    hinglish: {
      title: 'Do Bailon ki Katha — Heera aur Moti',
      paras: [
        'Jhuri naam ke ek kisaan ke paas do bail the — Heera aur Moti. Dono bachpan se saath pale the aur ek-doosre ko bina bole samajh lete the. Hal mein jut-te to kandhe se kandha mila kar chalte, aur Jhuri unhe apne bachchon jaisa pyaar karta tha.',
        'Ek din Jhuri ki patni ne dono bail apne bhai Gaya ke yahan kaam ke liye bhej diye. Heera-Moti ko laga ki unhe bech diya gaya hai. Gaya ke ghar unhe sookha bhoosa milta aur dande padte. Ek raat dono rassi tuda kar Jhuri ke ghar laut aaye. Jhuri unhe dekh kar bahut khush hua.',
        'Gaya unhe phir le gaya aur is baar aur kas kar baandha. Wahan ek chhoti ladki, jise uski sauteli maa sataati thi, chupke se raat mein unhe rotiyan khilaati. Ek raat usi ne unki rassi khol di aur phusphusaayi, "Bhaag jao, warna ye log tumhe maar daalenge."',
        'Raasta bhatak kar woh ek bade saand se bhide aur dono ne milkar use hara diya. Phir bhookh ke maare ek khet mein charte hue pakde gaye aur kanjihouse (pashuon ki jail) mein band kar diye gaye. Wahan bhed-bakriyan aur gadhe bhookhe-pyaase pade the. Moti ne apne seengon se deewar gira di aur sab jaanwar azaad ho kar bhaag gaye, par Heera bandha reh gaya, isliye Moti bhi use chhod kar nahi gaya.',
        'Kuch din baad unhe neelaam kar diya gaya. Khareedaar unhe le ja raha tha ki raasta jaana-pehchaana laga — yeh to unke gaanv ka raasta tha! Dono daud pade aur seedhe Jhuri ke darwaaze pe ja kar ruke. Jhuri ne unhe gale se laga liya, aur gaanv waalon ne khareedaar ko lauta diya. Heera aur Moti apne ghar laut aaye the.',
      ],
      seekh: 'Sachcha dost mushkil mein bhi saath nahi chhodta. Aur jo doosron ko azaadi dilaata hai, uski himmat kabhi bekaar nahi jaati.',
    },
    bn: {
      title: 'দুই বলদের গল্প — হীরা আর মোতি',
      paras: [
        'ঝুরি নামে এক চাষির দুটো বলদ ছিল — হীরা আর মোতি। ছোটবেলা থেকে একসঙ্গে বড় হয়েছে, কথা না বলেই একে অপরকে বুঝত। লাঙলে জুড়লে কাঁধে কাঁধ মিলিয়ে চলত, আর ঝুরি তাদের নিজের ছেলের মতো ভালোবাসত।',
        'একদিন ঝুরির বউ দুটো বলদকে তার ভাই গয়ার বাড়িতে কাজের জন্য পাঠিয়ে দিল। হীরা-মোতি ভাবল, তাদের বিক্রি করে দেওয়া হয়েছে। গয়ার বাড়িতে শুকনো খড় আর লাঠির বাড়ি জুটত। এক রাতে দুজনে দড়ি ছিঁড়ে ঝুরির বাড়ি ফিরে এল। ঝুরি তাদের দেখে খুব খুশি।',
        'গয়া আবার তাদের নিয়ে গেল, এবার আরও শক্ত করে বাঁধল। সেখানে এক ছোট্ট মেয়ে, যাকে তার সৎমা কষ্ট দিত, রাতে লুকিয়ে তাদের রুটি খাওয়াত। এক রাতে সে-ই তাদের দড়ি খুলে দিয়ে ফিসফিস করে বলল, "পালিয়ে যাও, নইলে এরা তোমাদের মেরে ফেলবে।"',
        'পথ হারিয়ে তারা এক বিশাল ষাঁড়ের মুখোমুখি হল, আর দুজনে মিলে তাকে হারিয়ে দিল। তারপর খিদের জ্বালায় এক খেতে চরতে গিয়ে ধরা পড়ল, তাদের খোঁয়াড়ে আটকে রাখা হল। সেখানে ভেড়া-ছাগল আর গাধা না খেয়ে পড়ে ছিল। মোতি শিং দিয়ে দেয়াল ভেঙে দিল, সব পশু পালিয়ে গেল — কিন্তু হীরা তখনও বাঁধা, তাই মোতিও তাকে ফেলে গেল না।',
        'কয়েক দিন পরে তাদের নিলাম হল। ক্রেতা নিয়ে যাচ্ছিল, হঠাৎ রাস্তাটা চেনা লাগল — এ তো নিজেদের গ্রামের রাস্তা! দুজনে ছুটে গিয়ে সোজা ঝুরির দরজায় থামল। ঝুরি তাদের জড়িয়ে ধরল, আর গ্রামের লোকেরা ক্রেতাকে ফিরিয়ে দিল। হীরা আর মোতি ঘরে ফিরে এল।',
      ],
      seekh: 'সত্যিকারের বন্ধু বিপদেও সঙ্গ ছাড়ে না। আর যে অন্যকে মুক্তি দেয়, তার সাহস কখনো বৃথা যায় না।',
    },
  },
  {
    slug: 'kabuliwala',
    emoji: '🥜',
    minutes: 4,
    source: SRC.tagore,
    hi: {
      title: 'काबुलीवाला',
      paras: [
        'कोलकाता में पाँच साल की मिनी रहती थी, जो दिन भर बोलती ही रहती थी। एक दिन खिड़की से उसने ढीले कुर्ते, पगड़ी और कंधे पर झोला लटकाए एक लंबे-चौड़े आदमी को देखा। वह था रहमत — अफ़ग़ानिस्तान से आया काबुलीवाला, जो किशमिश, बादाम और मेवे बेचता था।',
        'पहले तो मिनी डरकर छिप गई, पर जल्दी ही दोनों पक्के दोस्त बन गए। रहमत उसे मेवे देता, और मिनी उसकी बातों पर खिलखिलाती। रहमत उसे देखकर मुस्कुराता, क्योंकि दूर काबुल में उसकी भी एक बेटी थी — लगभग मिनी जितनी — जिसे वह बहुत याद करता था।',
        'एक दिन एक ग्राहक से उधार के पैसों पर झगड़ा हो गया, और ग़ुस्से में रहमत से ऐसी ग़लती हो गई कि उसे कई साल के लिए जेल जाना पड़ा। मिनी धीरे-धीरे बड़ी होती गई और अपने काबुलीवाले दोस्त को भूल गई।',
        'सालों बाद, जिस दिन मिनी की शादी थी, रहमत जेल से छूटकर उसे देखने आ पहुँचा। उसके मन में वही पाँच साल की बच्ची थी। पर दुल्हन बनी मिनी उसे पहचान ही नहीं पाई। रहमत समझ गया कि इतने सालों में उसकी अपनी बेटी भी इतनी ही बड़ी हो गई होगी और उसे भी भूल गई होगी।',
        'उसने अपने कुर्ते से एक मुड़ा-तुड़ा काग़ज़ निकाला, जिस पर उसकी बेटी की नन्ही हथेली की छाप थी — वही उसकी सबसे क़ीमती चीज़ थी। यह देखकर मिनी के पिता का दिल भर आया। उन्होंने शादी के ख़र्च से कुछ पैसे बचाकर रहमत को दिए और कहा, "अब अपने देश जाओ और अपनी बेटी से मिलो।"',
      ],
      seekh: 'पिता का प्यार हर देश, हर भाषा में एक जैसा होता है। दूसरों के दिल का दर्द समझना ही सच्ची इंसानियत है।',
    },
    en: {
      title: 'The Kabuliwala',
      paras: [
        'In Kolkata lived five-year-old Mini, who talked all day long. One day, from the window, she saw a tall, broad man in a loose kurta and turban with a bag over his shoulder. He was Rahmat — a Kabuliwala from Afghanistan, who sold raisins, almonds and dry fruit.',
        'At first Mini hid in fear, but soon the two became the best of friends. Rahmat gave her dry fruit, and Mini giggled at his stories. Rahmat smiled whenever he saw her, because far away in Kabul he too had a daughter about Mini\'s age, whom he missed very much.',
        'One day he quarrelled with a customer over money that was owed, and in anger Rahmat did something so wrong that he was sent to prison for many years. Mini slowly grew up and forgot her Kabuliwala friend.',
        'Years later, on the day of Mini\'s wedding, Rahmat came straight from prison to see her. In his mind she was still the five-year-old girl. But Mini, now a bride, did not recognise him. Rahmat understood that his own daughter must have grown up just as much and forgotten him too.',
        'From his kurta he took out a crumpled piece of paper with the print of his daughter\'s tiny palm on it — his most precious possession. Seeing it, Mini\'s father was deeply moved. He took some money from the wedding budget, gave it to Rahmat and said, "Now go home to your country and see your daughter."',
      ],
      seekh: 'A father\'s love is the same in every country and every language. Understanding the pain in someone else\'s heart is true humanity.',
    },
    hinglish: {
      title: 'Kabuliwala',
      paras: [
        'Kolkata mein paanch saal ki Mini rehti thi, jo din bhar bolti hi rehti thi. Ek din khidki se usne dheele kurte, pagdi aur kandhe pe jhola latkaaye ek lambe-chaude aadmi ko dekha. Woh tha Rahmat — Afghanistan se aaya Kabuliwala, jo kishmish, badaam aur meve bechta tha.',
        'Pehle to Mini dar kar chhip gayi, par jaldi hi dono pakke dost ban gaye. Rahmat use meve deta, aur Mini uski baaton pe khilkhilaati. Rahmat use dekh kar muskurata, kyunki door Kabul mein uski bhi ek beti thi — lagbhag Mini jitni — jise woh bahut yaad karta tha.',
        'Ek din ek graahak se udhaar ke paison pe jhagda ho gaya, aur gusse mein Rahmat se aisi galti ho gayi ki use kai saal ke liye jail jaana pada. Mini dheere-dheere badi hoti gayi aur apne Kabuliwala dost ko bhool gayi.',
        'Saalon baad, jis din Mini ki shaadi thi, Rahmat jail se chhoot kar use dekhne aa pahuncha. Uske mann mein wahi paanch saal ki bachchi thi. Par dulhan bani Mini use pehchaan hi nahi paayi. Rahmat samajh gaya ki itne saalon mein uski apni beti bhi itni hi badi ho gayi hogi aur use bhi bhool gayi hogi.',
        'Usne apne kurte se ek muda-tuda kaagaz nikaala, jis pe uski beti ki nanhi hatheli ki chhaap thi — wahi uski sabse keemti cheez thi. Yeh dekh kar Mini ke pita ka dil bhar aaya. Unhone shaadi ke kharche se kuch paise bacha kar Rahmat ko diye aur kaha, "Ab apne desh jao aur apni beti se milo."',
      ],
      seekh: 'Pita ka pyaar har desh, har bhasha mein ek jaisa hota hai. Doosron ke dil ka dard samajhna hi sachchi insaaniyat hai.',
    },
    bn: {
      title: 'কাবুলিওয়ালা',
      paras: [
        'কলকাতায় থাকত পাঁচ বছরের মিনি, যে সারাদিন কথা বলেই যেত। একদিন জানলা দিয়ে সে ঢিলে কুর্তা, পাগড়ি আর কাঁধে ঝোলা নিয়ে এক লম্বা-চওড়া মানুষকে দেখল। সে রহমত — আফগানিস্তান থেকে আসা কাবুলিওয়ালা, কিশমিশ, বাদাম আর মেওয়া বিক্রি করে।',
        'প্রথমে মিনি ভয়ে লুকিয়ে পড়ল, কিন্তু অল্পদিনেই দুজনে পাকা বন্ধু হয়ে গেল। রহমত তাকে মেওয়া দিত, আর মিনি তার কথায় খিলখিল করে হাসত। মিনিকে দেখলেই রহমত হাসত, কারণ দূর কাবুলে তারও প্রায় মিনির বয়সি এক মেয়ে ছিল, যাকে সে খুব মনে করত।',
        'একদিন এক খদ্দেরের সঙ্গে ধারের টাকা নিয়ে ঝগড়া হল, আর রাগের মাথায় রহমত এমন ভুল করে বসল যে তাকে বহু বছরের জন্য জেলে যেতে হল। মিনি ধীরে ধীরে বড় হল, আর তার কাবুলিওয়ালা বন্ধুকে ভুলে গেল।',
        'বহু বছর পরে, মিনির বিয়ের দিন, রহমত জেল থেকে ছাড়া পেয়ে তাকে দেখতে এল। তার মনে তখনও সেই পাঁচ বছরের মেয়ে। কিন্তু কনে সাজা মিনি তাকে চিনতেই পারল না। রহমত বুঝল, এত বছরে তার নিজের মেয়েও এমনই বড় হয়ে গেছে, তাকেও হয়তো ভুলে গেছে।',
        'কুর্তার ভেতর থেকে সে একটা দোমড়ানো কাগজ বার করল, যাতে তার মেয়ের ছোট্ট হাতের ছাপ — সেটাই তার সবচেয়ে দামি জিনিস। তা দেখে মিনির বাবার মন ভরে উঠল। বিয়ের খরচ থেকে কিছু টাকা বাঁচিয়ে তিনি রহমতকে দিলেন আর বললেন, "এবার দেশে ফিরে যাও, মেয়ের সঙ্গে দেখা করো।"',
      ],
      seekh: 'বাবার ভালোবাসা সব দেশে, সব ভাষায় একই রকম। অন্যের মনের কষ্ট বোঝাই আসল মানবিকতা।',
    },
  },
  {
    slug: 'phir-se-chooha',
    emoji: '🐭',
    minutes: 3,
    source: SRC.hitopadesha,
    hi: {
      title: 'फिर से चूहा',
      paras: [
        'गंगा किनारे एक आश्रम में एक दयालु साधु रहते थे। एक दिन ध्यान करते समय एक कौआ अपनी चोंच से एक नन्हे चूहे को गिरा गया। साधु को उस पर दया आई। अपनी तपस्या की शक्ति से उन्होंने चूहे को एक छोटी चुहिया-सी बच्ची बना दिया और उसे बेटी की तरह पालने लगे।',
        'कुछ दिनों बाद आश्रम में एक बिल्ली आई। बच्ची डरकर रोने लगी। साधु ने सोचा, "बेचारी डरती है," और उसे बिल्ली बना दिया। फिर कुत्ते से डरी तो कुत्ता बना दिया, और कुत्ता बाघ से डरा तो उसे बाघ बना दिया।',
        'अब वह बड़ा बाघ आश्रम में घूमता और सब उससे डरते। पर साधु उसे देखकर कहते, "यह वही चूहा है जिसे मैंने बचाया था।" यह सुनकर बाघ को बहुत बुरा लगता। उसे लगता कि जब तक साधु ज़िंदा हैं, सब उसका असली रूप याद रखेंगे।',
        'घमंड में आकर बाघ ने सोचा, "क्यों न मैं साधु को ही मार दूँ, फिर कोई मेरा सच नहीं जानेगा।" वह चुपके से साधु पर झपटने के लिए आगे बढ़ा।',
        'साधु उसके मन की बात समझ गए। उन्होंने शांति से कहा, "जिसने तुझे सब कुछ दिया, तू उसी को मारने चला? जा, फिर से चूहा बन जा!" पल भर में बड़ा बाघ फिर से नन्हा चूहा बन गया और डरकर जंगल में भाग गया।',
      ],
      seekh: 'जिसने हमारी मदद की, उसका एहसान कभी मत भूलो। घमंड और नाशुक्री हमें वहीं लौटा देते हैं जहाँ से हम चले थे।',
    },
    en: {
      title: 'A Mouse Once More',
      paras: [
        'A kind sage lived in an ashram on the bank of the Ganga. One day, as he sat in meditation, a crow dropped a tiny mouse from its beak. The sage felt pity for it. With the power of his prayers he turned the mouse into a little girl and began to raise her as his daughter.',
        'Some days later a cat came to the ashram. The girl was frightened and cried. "Poor thing, she is scared," thought the sage, and he turned her into a cat. When the cat feared a dog, he made her a dog; and when the dog feared a tiger, he made her a tiger.',
        'Now the big tiger roamed the ashram and everyone was afraid of it. But whenever the sage saw it, he said, "That is the mouse I once saved." The tiger hated hearing this. It felt that as long as the sage lived, everyone would remember what it really was.',
        'Full of pride, the tiger thought, "Why not kill the sage? Then no one will ever know the truth." Quietly, it crept forward to pounce on him.',
        'The sage understood what was in its heart. Calmly he said, "You would kill the one who gave you everything? Then be a mouse once more!" In a moment the huge tiger became a tiny mouse again and ran off into the forest in fright.',
      ],
      seekh: 'Never forget the people who helped us. Pride and ingratitude only send us back to where we started.',
    },
    hinglish: {
      title: 'Phir se Chooha',
      paras: [
        'Ganga kinaare ek ashram mein ek dayalu saadhu rehte the. Ek din dhyaan karte waqt ek kauwa apni chonch se ek nanhe choohe ko gira gaya. Saadhu ko uspe daya aayi. Apni tapasya ki shakti se unhone choohe ko ek chhoti bachchi bana diya aur use beti ki tarah paalne lage.',
        'Kuch dinon baad ashram mein ek billi aayi. Bachchi dar kar rone lagi. Saadhu ne socha, "Bechaari darti hai," aur use billi bana diya. Phir kutte se dari to kutta bana diya, aur kutta baagh se dara to use baagh bana diya.',
        'Ab woh bada baagh ashram mein ghoomta aur sab usse darte. Par saadhu use dekh kar kehte, "Yeh wahi chooha hai jise maine bachaya tha." Yeh sun kar baagh ko bahut bura lagta. Use lagta ki jab tak saadhu zinda hain, sab uska asli roop yaad rakhenge.',
        'Ghamand mein aa kar baagh ne socha, "Kyun na main saadhu ko hi maar doon, phir koi mera sach nahi jaanega." Woh chupke se saadhu pe jhapatne ke liye aage badha.',
        'Saadhu uske mann ki baat samajh gaye. Unhone shaanti se kaha, "Jisne tujhe sab kuch diya, tu usi ko maarne chala? Ja, phir se chooha ban ja!" Pal bhar mein bada baagh phir se nanha chooha ban gaya aur dar kar jungle mein bhaag gaya.',
      ],
      seekh: 'Jisne hamari madad ki, uska ehsaan kabhi mat bhoolo. Ghamand aur naashukri hamein wahin lauta dete hain jahan se hum chale the.',
    },
    bn: {
      title: 'আবার ইঁদুর',
      paras: [
        'গঙ্গার তীরে এক আশ্রমে এক দয়ালু সাধু থাকতেন। একদিন ধ্যানের সময় একটা কাক ঠোঁট থেকে একটা ছোট্ট ইঁদুর ফেলে দিল। সাধুর মায়া হল। তপস্যার শক্তিতে তিনি ইঁদুরটাকে একটা ছোট্ট মেয়ে বানিয়ে দিলেন, আর মেয়ের মতো মানুষ করতে লাগলেন।',
        'কয়েক দিন পরে আশ্রমে এক বিড়াল এল। মেয়েটি ভয়ে কাঁদতে লাগল। সাধু ভাবলেন, "আহা, ভয় পাচ্ছে," আর তাকে বিড়াল বানিয়ে দিলেন। তারপর কুকুরকে ভয় পেলে কুকুর বানালেন, আর কুকুর বাঘকে ভয় পেলে বাঘ বানিয়ে দিলেন।',
        'এখন সেই বিশাল বাঘ আশ্রমে ঘুরে বেড়ায়, সবাই তাকে ভয় পায়। কিন্তু সাধু তাকে দেখলেই বলতেন, "এ তো সেই ইঁদুর, যাকে আমি বাঁচিয়েছিলাম।" শুনে বাঘের খুব রাগ হত। তার মনে হত, সাধু যতদিন বেঁচে আছেন, সবাই তার আসল রূপ মনে রাখবে।',
        'অহংকারে বাঘ ভাবল, "সাধুকেই মেরে ফেলি না কেন, তাহলে কেউ আর আমার সত্যি জানবে না।" সে চুপিচুপি সাধুর ওপর ঝাঁপিয়ে পড়তে এগোল।',
        'সাধু তার মনের কথা বুঝে গেলেন। শান্ত গলায় বললেন, "যে তোকে সব দিল, তুই তাকেই মারতে এলি? যা, আবার ইঁদুর হয়ে যা!" নিমেষে বিশাল বাঘটা আবার ছোট্ট ইঁদুর হয়ে ভয়ে বনের দিকে পালাল।',
      ],
      seekh: 'যে আমাদের সাহায্য করেছে, তার উপকার কখনো ভুলো না। অহংকার আর অকৃতজ্ঞতা আমাদের সেখানেই ফিরিয়ে দেয়, যেখান থেকে শুরু করেছিলাম।',
    },
  },
  {
    slug: 'chaand-par-khargosh',
    emoji: '🐇',
    minutes: 3,
    source: SRC.jataka,
    hi: {
      title: 'चाँद पर खरगोश',
      paras: [
        'एक जंगल में चार दोस्त रहते थे — एक खरगोश, एक बंदर, एक सियार और एक ऊदबिलाव। खरगोश उन सबमें सबसे समझदार था। वह अक्सर कहता, "अगर कोई भूखा हमारे पास आए, तो हमें उसे खाना ज़रूर देना चाहिए।"',
        'एक पूर्णिमा के दिन एक बूढ़ा, थका हुआ यात्री जंगल में आया और बोला, "मैं बहुत भूखा हूँ, कोई मुझे कुछ खाने को दे दो।" ऊदबिलाव नदी से मछलियाँ ले आया, बंदर पेड़ से आम तोड़ लाया, और सियार कहीं से दही और खाना ढूँढ़ लाया।',
        'खरगोश के पास सिर्फ़ घास थी, जो इंसान नहीं खाते। वह उदास हो गया। फिर उसने यात्री से कहा, "बाबा, आग जलाइए। मेरे पास देने को और कुछ नहीं, इसलिए मैं ख़ुद को ही आपको दे दूँगा।"',
        'यात्री ने आग जलाई और खरगोश बिना डरे उसमें कूद पड़ा। पर आश्चर्य! आग ठंडी फूलों जैसी थी, उसका एक बाल भी नहीं जला। तभी वह यात्री असली रूप में आ गया — वह देवताओं के राजा शक्र थे, जो चारों दोस्तों की परीक्षा लेने आए थे।',
        'शक्र बोले, "तुम्हारा त्याग दुनिया हमेशा याद रखेगी।" उन्होंने पहाड़ से रंग लेकर चाँद पर खरगोश का चित्र बना दिया। कहते हैं, इसीलिए आज भी पूरे चाँद पर ध्यान से देखो तो एक खरगोश दिखाई देता है।',
      ],
      seekh: 'देने के लिए बहुत होना ज़रूरी नहीं, बड़ा दिल होना ज़रूरी है। सच्चा दान वही है जो पूरे मन से दिया जाए।',
    },
    en: {
      title: 'The Rabbit in the Moon',
      paras: [
        'Four friends lived in a forest — a rabbit, a monkey, a jackal and an otter. The rabbit was the wisest of them. He often said, "If anyone hungry comes to us, we must always give them food."',
        'On a full-moon day an old, tired traveller came into the forest and said, "I am very hungry. Will someone give me something to eat?" The otter brought fish from the river, the monkey picked mangoes from the tree, and the jackal found some curd and food.',
        'The rabbit had only grass, which people do not eat. He felt sad. Then he said to the traveller, "Grandfather, please light a fire. I have nothing else to give, so I will give you myself."',
        'The traveller lit a fire, and the rabbit jumped in without fear. But how wonderful! The fire felt as cool as flowers, and not a single hair of his burned. Then the traveller showed his true form — he was Sakka, king of the gods, who had come to test the four friends.',
        '"The world will always remember your sacrifice," said Sakka. He took colour from a mountain and drew a rabbit on the moon. That, they say, is why even today you can see a rabbit if you look carefully at the full moon.',
      ],
      seekh: 'You do not need to have a lot to give; you need a big heart. True giving is giving with your whole heart.',
    },
    hinglish: {
      title: 'Chaand par Khargosh',
      paras: [
        'Ek jungle mein chaar dost rehte the — ek khargosh, ek bandar, ek siyaar aur ek oodbilaav. Khargosh un sabmein sabse samajhdaar tha. Woh aksar kehta, "Agar koi bhookha hamare paas aaye, to hamein use khaana zaroor dena chahiye."',
        'Ek poornima ke din ek boodha, thaka hua yaatri jungle mein aaya aur bola, "Main bahut bhookha hoon, koi mujhe kuch khaane ko de do." Oodbilaav nadi se machhliyan le aaya, bandar ped se aam tod laaya, aur siyaar kahin se dahi aur khaana dhoondh laaya.',
        'Khargosh ke paas sirf ghaas thi, jo insaan nahi khaate. Woh udaas ho gaya. Phir usne yaatri se kaha, "Baba, aag jalaiye. Mere paas dene ko aur kuch nahi, isliye main khud ko hi aapko de doonga."',
        'Yaatri ne aag jalaayi aur khargosh bina dare usmein kood pada. Par aashcharya! Aag thande phoolon jaisi thi, uska ek baal bhi nahi jala. Tabhi woh yaatri asli roop mein aa gaya — woh devtaon ke raja Shakra the, jo chaaron doston ki pareeksha lene aaye the.',
        'Shakra bole, "Tumhara tyaag duniya hamesha yaad rakhegi." Unhone pahaad se rang le kar chaand pe khargosh ka chitra bana diya. Kehte hain, isiliye aaj bhi poore chaand ko dhyaan se dekho to ek khargosh dikhaayi deta hai.',
      ],
      seekh: 'Dene ke liye bahut hona zaroori nahi, bada dil hona zaroori hai. Sachcha daan wahi hai jo poore mann se diya jaaye.',
    },
    bn: {
      title: 'চাঁদের খরগোশ',
      paras: [
        'এক বনে চার বন্ধু থাকত — এক খরগোশ, এক বাঁদর, এক শেয়াল আর এক ভোঁদড়। খরগোশই ছিল সবচেয়ে বুদ্ধিমান। সে প্রায়ই বলত, "কেউ খিদে নিয়ে আমাদের কাছে এলে তাকে খাবার দিতেই হবে।"',
        'এক পূর্ণিমার দিনে এক বুড়ো, ক্লান্ত পথিক বনে এসে বলল, "আমার খুব খিদে পেয়েছে, কেউ কিছু খেতে দাও।" ভোঁদড় নদী থেকে মাছ আনল, বাঁদর গাছ থেকে আম পাড়ল, আর শেয়াল কোথা থেকে দই আর খাবার জোগাড় করল।',
        'খরগোশের কাছে শুধু ঘাস, যা মানুষ খায় না। সে মন খারাপ করল। তারপর পথিককে বলল, "দাদু, আগুন জ্বালুন। দেওয়ার মতো আর কিছু নেই, তাই আমি নিজেকেই আপনাকে দেব।"',
        'পথিক আগুন জ্বালল, আর খরগোশ নির্ভয়ে তাতে ঝাঁপ দিল। কিন্তু কী আশ্চর্য! আগুন যেন ফুলের মতো ঠান্ডা, তার একটা লোমও পুড়ল না। তখনই পথিক নিজের আসল রূপ দেখাল — তিনি দেবতাদের রাজা শক্র, চার বন্ধুর পরীক্ষা নিতে এসেছিলেন।',
        'শক্র বললেন, "তোমার ত্যাগ পৃথিবী চিরকাল মনে রাখবে।" পাহাড় থেকে রং নিয়ে তিনি চাঁদের গায়ে খরগোশের ছবি এঁকে দিলেন। বলা হয়, তাই আজও পূর্ণিমার চাঁদে মন দিয়ে তাকালে একটা খরগোশ দেখা যায়।',
      ],
      seekh: 'দেওয়ার জন্য অনেক কিছু থাকা লাগে না, বড় মন থাকা লাগে। আসল দান হল মন থেকে দেওয়া।',
    },
  },
  {
    slug: 'sachcha-dost-kauwa',
    emoji: '🦌',
    minutes: 3,
    source: SRC.hitopadesha,
    hi: {
      title: 'सच्चा दोस्त — हिरन, कौआ और सियार',
      paras: [
        'एक जंगल में एक हिरन और एक कौआ पक्के दोस्त थे। एक दिन एक चालाक सियार ने मोटे-ताज़े हिरन को देखा और सोचा, "इससे दोस्ती कर लूँ, तो किसी दिन इसका शिकार आसानी से कर सकूँगा।" वह मीठी-मीठी बातें करके हिरन का दोस्त बन गया।',
        'कौए ने हिरन को समझाया, "जिसे हम ठीक से जानते नहीं, उस पर इतनी जल्दी भरोसा मत करो।" पर हिरन ने कहा, "सब एक जैसे थोड़े ही होते हैं।"',
        'एक दिन सियार हिरन को एक हरे-भरे खेत में ले गया। उसे पता था कि वहाँ किसान ने जाल बिछाया है। हिरन जाल में फँस गया और उसने सियार से कहा, "दोस्त, अपने दाँतों से जाल काट दो!" सियार बहाना बनाकर बोला, "आज मेरा व्रत है, मैं जाल नहीं छू सकता।" और पास की झाड़ी में छिपकर हिरन के मरने का इंतज़ार करने लगा।',
        'शाम तक हिरन घर नहीं लौटा, तो कौआ उसे ढूँढ़ते हुए खेत में पहुँचा। उसने सब समझ लिया और बोला, "जब किसान आए, तो तुम साँस रोककर ऐसे लेट जाना जैसे मर गए हो। मैं तुम्हारे ऊपर बैठूँगा। जैसे ही मैं काँव करूँ, उठकर भाग जाना।"',
        'किसान आया, हिरन को मरा समझा और जाल खोल दिया। तभी कौए ने "काँव!" किया और हिरन छलाँग लगाकर भाग निकला। किसान ने ग़ुस्से में डंडा फेंका — जो सीधा झाड़ी में छिपे सियार को जा लगा। हिरन ने समझ लिया कि सच्चा दोस्त कौन है।',
      ],
      seekh: 'मीठी बातों से नहीं, मुश्किल में साथ देने से सच्चे दोस्त की पहचान होती है। अनजान पर आँख मूँदकर भरोसा मत करो।',
    },
    en: {
      title: 'A True Friend — the Deer, the Crow and the Jackal',
      paras: [
        'In a forest, a deer and a crow were the best of friends. One day a cunning jackal saw the plump deer and thought, "If I make friends with him, one day I can catch him easily." With sweet talk, he became the deer\'s friend.',
        'The crow warned the deer, "Don\'t trust someone so quickly when you hardly know him." But the deer said, "Not everyone is the same."',
        'One day the jackal led the deer to a lush green field. He knew a farmer had set a trap there. The deer was caught in the net and cried, "Friend, cut the net with your teeth!" The jackal made an excuse: "I am fasting today; I cannot touch the net." Then he hid in a nearby bush and waited for the deer to die.',
        'When the deer had not come home by evening, the crow went looking and reached the field. He understood everything and said, "When the farmer comes, hold your breath and lie still as if you were dead. I will sit on you. The moment I caw, jump up and run."',
        'The farmer came, thought the deer was dead and opened the net. At once the crow cawed, and the deer leapt up and ran. In anger, the farmer threw his stick — and it hit the jackal hiding in the bush. The deer now knew who his true friend was.',
      ],
      seekh: 'A true friend is known not by sweet words but by standing with you in trouble. Don\'t trust a stranger blindly.',
    },
    hinglish: {
      title: 'Sachcha Dost — Hiran, Kauwa aur Siyaar',
      paras: [
        'Ek jungle mein ek hiran aur ek kauwa pakke dost the. Ek din ek chaalaak siyaar ne mote-taaze hiran ko dekha aur socha, "Isse dosti kar loon, to kisi din iska shikaar aasaani se kar sakoonga." Woh meethi-meethi baatein karke hiran ka dost ban gaya.',
        'Kauwe ne hiran ko samjhaaya, "Jise hum theek se jaante nahi, uspe itni jaldi bharosa mat karo." Par hiran ne kaha, "Sab ek jaise thode hi hote hain."',
        'Ek din siyaar hiran ko ek hare-bhare khet mein le gaya. Use pata tha ki wahan kisaan ne jaal bichhaaya hai. Hiran jaal mein phans gaya aur usne siyaar se kaha, "Dost, apne daanton se jaal kaat do!" Siyaar bahaana bana kar bola, "Aaj mera vrat hai, main jaal nahi chhoo sakta." Aur paas ki jhaadi mein chhip kar hiran ke marne ka intezaar karne laga.',
        'Shaam tak hiran ghar nahi lauta, to kauwa use dhoondhte hue khet mein pahuncha. Usne sab samajh liya aur bola, "Jab kisaan aaye, to tum saans rok kar aise let jaana jaise mar gaye ho. Main tumhare upar baithoonga. Jaise hi main kaanv karoon, uth kar bhaag jaana."',
        'Kisaan aaya, hiran ko mara samjha aur jaal khol diya. Tabhi kauwe ne "kaanv!" kiya aur hiran chhalaang laga kar bhaag nikla. Kisaan ne gusse mein danda phenka — jo seedha jhaadi mein chhipe siyaar ko ja laga. Hiran ne samajh liya ki sachcha dost kaun hai.',
      ],
      seekh: 'Meethi baaton se nahi, mushkil mein saath dene se sachche dost ki pehchaan hoti hai. Anjaan pe aankh moond kar bharosa mat karo.',
    },
    bn: {
      title: 'সত্যিকারের বন্ধু — হরিণ, কাক আর শেয়াল',
      paras: [
        'এক বনে এক হরিণ আর এক কাক ছিল পাকা বন্ধু। একদিন এক চালাক শেয়াল নাদুসনুদুস হরিণটাকে দেখে ভাবল, "এর সঙ্গে বন্ধুত্ব করলে একদিন সহজেই শিকার করতে পারব।" মিষ্টি মিষ্টি কথা বলে সে হরিণের বন্ধু হয়ে গেল।',
        'কাক হরিণকে বোঝাল, "যাকে ভালো করে চেনো না, তাকে এত তাড়াতাড়ি বিশ্বাস কোরো না।" কিন্তু হরিণ বলল, "সবাই তো আর এক রকম নয়।"',
        'একদিন শেয়াল হরিণকে এক সবুজ খেতে নিয়ে গেল। সে জানত, সেখানে চাষি জাল পেতে রেখেছে। হরিণ জালে আটকে গিয়ে বলল, "বন্ধু, দাঁত দিয়ে জালটা কেটে দাও!" শেয়াল অজুহাত দিল, "আজ আমার উপোস, জাল ছুঁতে পারব না।" তারপর পাশের ঝোপে লুকিয়ে হরিণের মরার অপেক্ষা করতে লাগল।',
        'সন্ধে পর্যন্ত হরিণ ঘরে না ফেরায় কাক তাকে খুঁজতে খুঁজতে খেতে পৌঁছল। সব বুঝে সে বলল, "চাষি এলে দম বন্ধ করে মরার মতো শুয়ে থাকবে। আমি তোমার ওপর বসব। যেই আমি কা-কা করব, উঠে দৌড় দেবে।"',
        'চাষি এসে হরিণকে মরা ভেবে জাল খুলে দিল। তখনই কাক "কা!" করল, আর হরিণ লাফ দিয়ে পালাল। রেগে গিয়ে চাষি লাঠি ছুঁড়ল — আর সেটা গিয়ে লাগল ঝোপে লুকোনো শেয়ালের গায়ে। হরিণ বুঝল, আসল বন্ধু কে।',
      ],
      seekh: 'মিষ্টি কথায় নয়, বিপদে পাশে থাকায় সত্যিকারের বন্ধু চেনা যায়। অচেনাকে চোখ বুজে বিশ্বাস কোরো না।',
    },
  },
];

export { moreStories4 };
