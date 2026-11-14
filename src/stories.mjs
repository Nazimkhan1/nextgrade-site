/**
 * Bedtime stories (/kahani/). Old folk tales that belong to everyone
 * (Panchatantra, Jataka, Aesop, Akbar-Birbal, Tenali Raman, Mulla Nasruddin),
 * retold in our own words. Each story has all four languages; keep them in step.
 */
import { moreStories } from './stories-more.mjs';

const stories = [
  {
    slug: 'pyasa-kauwa',
    emoji: '🐦',
    minutes: 2,
    source: { hi: 'लोककथा', en: 'Folk tale', hinglish: 'Lok-katha', bn: 'লোককথা' },
    hi: {
      title: 'प्यासा कौआ',
      paras: [
        'गर्मी की एक दोपहर थी। सूरज आग बरसा रहा था और खेत-खलिहान सब सूख चुके थे। एक कौआ दूर-दूर तक उड़ता रहा, पर उसे कहीं पानी नहीं मिला। उसका गला सूख रहा था और पंख थकने लगे थे।',
        'तभी उसकी नज़र एक घर के आँगन में रखे मटके पर पड़ी। वह खुश होकर नीचे उतरा और मटके में झाँका। पानी था, पर बहुत नीचे — इतना नीचे कि उसकी चोंच वहाँ तक पहुँच ही नहीं पाई।',
        'कौए ने मटका गिराने की कोशिश की, पर मटका भारी था। वह उदास होकर बैठ गया। फिर उसने आसपास देखा — आँगन में छोटे-छोटे कंकड़ पड़े थे। उसके मन में एक उपाय आया।',
        'कौआ एक कंकड़ चोंच में उठाकर मटके में डालता, फिर दूसरा, फिर तीसरा। हर कंकड़ के साथ पानी थोड़ा-थोड़ा ऊपर आने लगा। वह थका था, पर रुका नहीं।',
        'आख़िरकार पानी इतना ऊपर आ गया कि कौआ आराम से पी सका। उसने जी भरकर पानी पिया, "काँव-काँव" करके धन्यवाद कहा और खुशी-खुशी उड़ गया।',
      ],
      seekh: 'मुश्किल में घबराने के बजाय सोच-समझकर उपाय ढूँढो। धीरे-धीरे की गई कोशिश भी बड़ा काम कर देती है।',
    },
    en: {
      title: 'The Thirsty Crow',
      paras: [
        'It was a hot summer afternoon. The sun was blazing and every field and pond had dried up. A crow flew far and wide, but it could not find water anywhere. Its throat was dry and its wings were getting tired.',
        'Then it saw a clay pot in the courtyard of a house. Happily it flew down and looked inside. There was water — but very low, so low that its beak could not reach it.',
        'The crow tried to tip the pot over, but the pot was too heavy. It sat down, feeling sad. Then it looked around. Small pebbles lay all over the courtyard, and an idea came to it.',
        'The crow picked up a pebble in its beak and dropped it into the pot, then another, then another. With every pebble the water rose a little. It was tired, but it did not stop.',
        'At last the water came up high enough for the crow to drink easily. It drank as much as it wanted, said "caw-caw" to say thank you, and flew away happily.',
      ],
      seekh: 'Instead of panicking in trouble, think and find a way. Small, steady efforts can do big things.',
    },
    hinglish: {
      title: 'Pyaasa Kauwa',
      paras: [
        'Garmi ki ek dopahar thi. Suraj aag barsa raha tha aur khet-khalihaan sab sookh chuke the. Ek kauwa door-door tak udta raha, par use kahin paani nahi mila. Uska gala sookh raha tha aur pankh thakne lage the.',
        'Tabhi uski nazar ek ghar ke aangan mein rakhe matke pe padi. Woh khush ho kar neeche utra aur matke mein jhaanka. Paani tha, par bahut neeche — itna neeche ki uski chonch wahan tak pahunch hi nahi paayi.',
        'Kauwe ne matka giraane ki koshish ki, par matka bhaari tha. Woh udaas ho kar baith gaya. Phir usne aas-paas dekha — aangan mein chhote-chhote kankad pade the. Uske mann mein ek upaay aaya.',
        'Kauwa ek kankad chonch mein utha kar matke mein daalta, phir doosra, phir teesra. Har kankad ke saath paani thoda-thoda upar aane laga. Woh thaka tha, par ruka nahi.',
        'Aakhirkaar paani itna upar aa gaya ki kauwa aaraam se pee saka. Usne jee bhar ke paani piya, "kaanv-kaanv" karke thank you kaha aur khushi-khushi ud gaya.',
      ],
      seekh: 'Mushkil mein ghabraane ke bajaye soch-samajh kar upaay dhoondho. Dheere-dheere ki gayi koshish bhi bada kaam kar deti hai.',
    },
    bn: {
      title: 'তৃষ্ণার্ত কাক',
      paras: [
        'গরমের এক দুপুর। সূর্য যেন আগুন ঢালছে, মাঠঘাট সব শুকিয়ে কাঠ। একটা কাক অনেক দূর পর্যন্ত উড়ে বেড়াল, কিন্তু কোথাও জল পেল না। তার গলা শুকিয়ে আসছিল, ডানাও ক্লান্ত হয়ে পড়ছিল।',
        'হঠাৎ তার চোখে পড়ল একটা বাড়ির উঠোনে রাখা মাটির কলসি। খুশি হয়ে সে নিচে নেমে কলসির ভেতরে উঁকি দিল। জল আছে, কিন্তু অনেক নিচে — এত নিচে যে তার ঠোঁট সেখানে পৌঁছায় না।',
        'কাক কলসিটা উল্টে ফেলার চেষ্টা করল, কিন্তু কলসি খুব ভারী। মন খারাপ করে সে বসে পড়ল। তারপর চারপাশে তাকিয়ে দেখল — উঠোনে ছোট ছোট নুড়ি পাথর ছড়িয়ে আছে। তার মাথায় একটা বুদ্ধি এল।',
        'কাক ঠোঁটে একটা নুড়ি তুলে কলসিতে ফেলল, তারপর আরেকটা, তারপর আরও একটা। প্রতিটি নুড়ির সঙ্গে জল একটু একটু করে ওপরে উঠতে লাগল। সে ক্লান্ত ছিল, কিন্তু থামল না।',
        'শেষে জল এত ওপরে উঠে এল যে কাক আরাম করে খেতে পারল। সে প্রাণ ভরে জল খেল, "কা-কা" করে ধন্যবাদ জানাল আর খুশি মনে উড়ে গেল।',
      ],
      seekh: 'বিপদে ঘাবড়ে না গিয়ে ভেবেচিন্তে উপায় খোঁজো। একটু একটু করে চেষ্টা করলেও বড় কাজ হয়ে যায়।',
    },
  },
  {
    slug: 'kachhua-aur-khargosh',
    emoji: '🐢',
    minutes: 3,
    source: { hi: 'ईसप की कहानी', en: 'Aesop\'s fable', hinglish: 'Aesop ki kahani', bn: 'ঈশপের গল্প' },
    hi: {
      title: 'कछुआ और खरगोश',
      paras: [
        'एक जंगल में एक खरगोश रहता था। उसे अपनी तेज़ दौड़ पर बड़ा घमंड था। वह रोज़ धीरे-धीरे चलने वाले कछुए का मज़ाक उड़ाता — "अरे, तुम तो शाम तक भी नदी तक नहीं पहुँच पाओगे!"',
        'एक दिन कछुए ने शांति से कहा, "चलो, दौड़ लगाते हैं। देखते हैं पहले पहाड़ी वाले पेड़ तक कौन पहुँचता है।" खरगोश ज़ोर से हँसा, पर मान गया। जंगल के सारे जानवर दौड़ देखने इकट्ठा हो गए।',
        'दौड़ शुरू हुई। खरगोश पलक झपकते ही बहुत आगे निकल गया। पीछे मुड़कर देखा तो कछुआ दूर-दूर तक नज़र नहीं आ रहा था। उसने सोचा, "थोड़ा आराम कर लेता हूँ, कछुआ तो घंटों बाद आएगा।" और वह एक पेड़ की छाँव में सो गया।',
        'कछुआ धीरे-धीरे, पर बिना रुके चलता रहा। वह सोते हुए खरगोश के पास से निकला और आगे बढ़ता गया — एक कदम, फिर एक और कदम।',
        'जब खरगोश की नींद खुली, शाम हो चुकी थी। वह पूरी ताकत से दौड़ा, पर पहाड़ी पर पहुँचकर देखा — कछुआ पहले ही पेड़ के पास खड़ा मुस्कुरा रहा था और सारे जानवर तालियाँ बजा रहे थे।',
      ],
      seekh: 'घमंड हमें हरा देता है। धीरे-धीरे पर लगातार मेहनत करने वाला ही जीतता है।',
    },
    en: {
      title: 'The Tortoise and the Hare',
      paras: [
        'A hare lived in a forest. He was very proud of how fast he could run, and every day he made fun of the slow tortoise — "You won\'t reach the river even by evening!"',
        'One day the tortoise calmly said, "Let\'s have a race. Let\'s see who reaches the tree on the hill first." The hare laughed loudly but agreed. All the animals of the forest gathered to watch.',
        'The race began. In the blink of an eye the hare was far ahead. When he looked back, the tortoise was nowhere to be seen. "I\'ll take a little rest," he thought. "The tortoise will take hours." And he fell asleep in the shade of a tree.',
        'The tortoise walked slowly, but he never stopped. He passed the sleeping hare and kept going — one step, then one more step.',
        'When the hare woke up, it was already evening. He ran as fast as he could, but when he reached the hill, the tortoise was already standing by the tree, smiling, while all the animals clapped.',
      ],
      seekh: 'Pride makes us lose. The one who keeps going slowly but steadily wins.',
    },
    hinglish: {
      title: 'Kachhua aur Khargosh',
      paras: [
        'Ek jungle mein ek khargosh rehta tha. Use apni tez daud pe bada ghamand tha. Woh roz dheere-dheere chalne wale kachhue ka mazaak udaata — "Arre, tum to shaam tak bhi nadi tak nahi pahunch paaoge!"',
        'Ek din kachhue ne shaanti se kaha, "Chalo, daud lagaate hain. Dekhte hain pehle pahaadi wale ped tak kaun pahunchta hai." Khargosh zor se hansa, par maan gaya. Jungle ke saare jaanwar daud dekhne ikattha ho gaye.',
        'Daud shuru hui. Khargosh palak jhapakte hi bahut aage nikal gaya. Peeche mud ke dekha to kachhua door-door tak nazar nahi aa raha tha. Usne socha, "Thoda aaraam kar leta hoon, kachhua to ghanton baad aayega." Aur woh ek ped ki chhaanv mein so gaya.',
        'Kachhua dheere-dheere, par bina ruke chalta raha. Woh sote hue khargosh ke paas se nikla aur aage badhta gaya — ek kadam, phir ek aur kadam.',
        'Jab khargosh ki neend khuli, shaam ho chuki thi. Woh poori taakat se dauda, par pahaadi pe pahunch ke dekha — kachhua pehle hi ped ke paas khada muskura raha tha aur saare jaanwar taaliyan baja rahe the.',
      ],
      seekh: 'Ghamand hamein hara deta hai. Dheere-dheere par lagaataar mehnat karne wala hi jeet-ta hai.',
    },
    bn: {
      title: 'কচ্ছপ আর খরগোশ',
      paras: [
        'এক বনে থাকত এক খরগোশ। নিজের জোরে দৌড়ানো নিয়ে তার খুব অহংকার। রোজ সে ধীরে চলা কচ্ছপকে নিয়ে ঠাট্টা করত — "তুমি তো সন্ধে পর্যন্তও নদী পৌঁছতে পারবে না!"',
        'একদিন কচ্ছপ শান্ত গলায় বলল, "চলো, দৌড় প্রতিযোগিতা হোক। দেখি পাহাড়ের গাছটার কাছে আগে কে পৌঁছায়।" খরগোশ হো-হো করে হাসল, কিন্তু রাজি হল। বনের সব পশুপাখি দৌড় দেখতে জড়ো হল।',
        'দৌড় শুরু হল। চোখের পলকে খরগোশ অনেক এগিয়ে গেল। পেছন ফিরে দেখল, কচ্ছপের দেখাই নেই। ভাবল, "একটু জিরিয়ে নিই, কচ্ছপ তো ঘণ্টাখানেক পরে আসবে।" এই ভেবে সে একটা গাছের ছায়ায় ঘুমিয়ে পড়ল।',
        'কচ্ছপ ধীরে ধীরে, কিন্তু না থেমে চলতে থাকল। ঘুমন্ত খরগোশের পাশ দিয়ে এগিয়ে গেল — এক পা, তারপর আরও এক পা।',
        'খরগোশের যখন ঘুম ভাঙল, তখন সন্ধে হয়ে গেছে। সে প্রাণপণে দৌড়ল, কিন্তু পাহাড়ে পৌঁছে দেখল — কচ্ছপ আগেই গাছের পাশে দাঁড়িয়ে হাসছে আর সবাই হাততালি দিচ্ছে।',
      ],
      seekh: 'অহংকার আমাদের হারিয়ে দেয়। ধীরে হলেও যে থেমে না থেকে চেষ্টা করে, জয় তারই।',
    },
  },
  {
    slug: 'bandar-aur-magarmachh',
    emoji: '🐒',
    minutes: 3,
    source: { hi: 'पंचतंत्र', en: 'Panchatantra', hinglish: 'Panchatantra', bn: 'পঞ্চতন্ত্র' },
    hi: {
      title: 'बंदर और मगरमच्छ',
      paras: [
        'नदी किनारे एक जामुन का पेड़ था, जिस पर एक बंदर रहता था। उसी नदी में एक मगरमच्छ रहता था। बंदर रोज़ मीठे जामुन तोड़कर मगरमच्छ को खिलाता, और दोनों पक्के दोस्त बन गए।',
        'मगरमच्छ कुछ जामुन अपनी पत्नी के लिए भी ले जाता। पत्नी ने सोचा, "जो रोज़ इतने मीठे जामुन खाता है, उसका दिल कितना मीठा होगा!" उसने मगरमच्छ से ज़िद की कि वह बंदर का दिल लाए।',
        'मगरमच्छ ने बंदर से कहा, "मेरी पत्नी तुम्हें खाने पर बुला रही है। मेरी पीठ पर बैठ जाओ।" बंदर खुशी-खुशी बैठ गया। बीच नदी में पहुँचकर मगरमच्छ ने सच बता दिया — "माफ़ करना दोस्त, पत्नी को तुम्हारा दिल चाहिए।"',
        'बंदर डरा, पर उसने अपना दिमाग ठंडा रखा। बोला, "अरे दोस्त, पहले क्यों नहीं बताया? मैं तो अपना दिल पेड़ पर ही रख आया हूँ! चलो वापस, लेकर आता हूँ।" भोला मगरमच्छ उसे वापस किनारे ले गया।',
        'किनारे पहुँचते ही बंदर कूदकर पेड़ पर चढ़ गया और बोला, "दिल भी कोई निकालकर रखता है? जो दोस्त को धोखा दे, वह दोस्त नहीं। अब मुझसे दूर रहना!" मगरमच्छ शर्मिंदा होकर चुपचाप लौट गया।',
      ],
      seekh: 'मुसीबत में घबराने के बजाय बुद्धि से काम लो। और दोस्ती में कभी धोखा मत दो।',
    },
    en: {
      title: 'The Monkey and the Crocodile',
      paras: [
        'A jamun tree stood by a river, and a monkey lived in it. A crocodile lived in the same river. Every day the monkey picked sweet jamuns for the crocodile, and the two became close friends.',
        'The crocodile took some jamuns home for his wife too. She thought, "Someone who eats such sweet fruit every day must have a very sweet heart!" She insisted that the crocodile bring her the monkey\'s heart.',
        'The crocodile said to the monkey, "My wife has invited you for a meal. Sit on my back." The monkey happily climbed on. In the middle of the river the crocodile told the truth — "Sorry, friend. My wife wants your heart."',
        'The monkey was scared, but he kept a cool head. "Oh friend, why didn\'t you tell me earlier? I left my heart up in the tree! Let\'s go back and I\'ll fetch it." The simple crocodile swam back to the bank.',
        'As soon as they reached the bank, the monkey leapt up the tree and said, "Does anyone take their heart out and leave it somewhere? A friend who cheats is no friend. Stay away from me now!" The crocodile went back quietly, ashamed.',
      ],
      seekh: 'In trouble, use your wits instead of panicking. And never cheat a friend.',
    },
    hinglish: {
      title: 'Bandar aur Magarmachh',
      paras: [
        'Nadi kinaare ek jamun ka ped tha, jis pe ek bandar rehta tha. Usi nadi mein ek magarmachh rehta tha. Bandar roz meethe jamun tod kar magarmachh ko khilaata, aur dono pakke dost ban gaye.',
        'Magarmachh kuch jamun apni patni ke liye bhi le jaata. Patni ne socha, "Jo roz itne meethe jamun khaata hai, uska dil kitna meetha hoga!" Usne magarmachh se zid ki ki woh bandar ka dil laaye.',
        'Magarmachh ne bandar se kaha, "Meri patni tumhe khaane pe bula rahi hai. Meri peeth pe baith jao." Bandar khushi-khushi baith gaya. Beech nadi mein pahunch kar magarmachh ne sach bata diya — "Maaf karna dost, patni ko tumhara dil chahiye."',
        'Bandar dara, par usne apna dimaag thanda rakha. Bola, "Arre dost, pehle kyun nahi bataya? Main to apna dil ped pe hi rakh aaya hoon! Chalo waapas, le kar aata hoon." Bhola magarmachh use waapas kinaare le gaya.',
        'Kinaare pahunchte hi bandar kood kar ped pe chadh gaya aur bola, "Dil bhi koi nikaal ke rakhta hai? Jo dost ko dhokha de, woh dost nahi. Ab mujhse door rehna!" Magarmachh sharminda ho kar chupchaap laut gaya.',
      ],
      seekh: 'Museebat mein ghabraane ke bajaye buddhi se kaam lo. Aur dosti mein kabhi dhokha mat do.',
    },
    bn: {
      title: 'বানর আর কুমির',
      paras: [
        'নদীর ধারে ছিল একটা জামগাছ, তাতে থাকত এক বানর। সেই নদীতে থাকত এক কুমির। বানর রোজ মিষ্টি জাম পেড়ে কুমিরকে খাওয়াত, আর দুজনে হয়ে উঠল খুব ভালো বন্ধু।',
        'কুমির কিছু জাম তার বউয়ের জন্যও নিয়ে যেত। বউ ভাবল, "যে রোজ এত মিষ্টি জাম খায়, তার হৃৎপিণ্ড না জানি কত মিষ্টি!" সে কুমিরকে বায়না ধরল, বানরের হৃৎপিণ্ড এনে দিতে হবে।',
        'কুমির বানরকে বলল, "আমার বউ তোমাকে খেতে ডেকেছে। আমার পিঠে উঠে বসো।" বানর খুশি মনে উঠে বসল। মাঝনদীতে গিয়ে কুমির সত্যি কথা বলে ফেলল — "মাফ করো বন্ধু, বউ তোমার হৃৎপিণ্ড চায়।"',
        'বানর ভয় পেল, কিন্তু মাথা ঠান্ডা রাখল। বলল, "আরে বন্ধু, আগে বলোনি কেন? আমি তো হৃৎপিণ্ড গাছেই রেখে এসেছি! চলো ফিরি, নিয়ে আসি।" সরল কুমির তাকে আবার পাড়ে নিয়ে গেল।',
        'পাড়ে পৌঁছতেই বানর লাফ দিয়ে গাছে উঠে বলল, "হৃৎপিণ্ড কি কেউ খুলে রেখে আসে? যে বন্ধুকে ঠকায়, সে বন্ধু নয়। আর আমার কাছে এসো না!" কুমির লজ্জা পেয়ে চুপচাপ ফিরে গেল।',
      ],
      seekh: 'বিপদে ঘাবড়ে না গিয়ে বুদ্ধি খাটাও। আর বন্ধুত্বে কখনো ঠকিও না।',
    },
  },
  {
    slug: 'sher-aur-chooha',
    emoji: '🦁',
    minutes: 2,
    source: { hi: 'ईसप की कहानी', en: 'Aesop\'s fable', hinglish: 'Aesop ki kahani', bn: 'ঈশপের গল্প' },
    hi: {
      title: 'शेर और चूहा',
      paras: [
        'एक घने जंगल में एक शेर पेड़ के नीचे सो रहा था। एक छोटा-सा चूहा खेलते-खेलते उसके ऊपर चढ़ गया और इधर-उधर दौड़ने लगा। शेर की नींद टूट गई और उसने गुस्से में चूहे को अपने पंजे में पकड़ लिया।',
        'चूहा काँपते हुए बोला, "महाराज, मुझे माफ़ कर दीजिए। मैं बहुत छोटा हूँ, मुझे खाकर आपका पेट भी नहीं भरेगा। आज छोड़ देंगे तो एक दिन मैं भी आपकी मदद करूँगा।"',
        'शेर ज़ोर से हँसा — "तुम? मेरी मदद?" पर उसे चूहे पर दया आ गई और उसने उसे छोड़ दिया।',
        'कुछ दिन बाद शेर एक शिकारी के जाल में फँस गया। वह जितना छटपटाता, जाल उतना ही कसता जाता। उसकी दहाड़ पूरे जंगल में गूँज उठी।',
        'चूहे ने दहाड़ पहचान ली और दौड़ा-दौड़ा आया। उसने अपने नन्हे पैने दाँतों से जाल की रस्सियाँ एक-एक करके कुतर दीं। शेर आज़ाद हो गया। उसने चूहे से कहा, "आज समझ आया, कोई भी छोटा नहीं होता।" उस दिन से दोनों पक्के दोस्त बन गए।',
      ],
      seekh: 'किसी को छोटा मत समझो। दया और भलाई का बदला एक दिन ज़रूर मिलता है।',
    },
    en: {
      title: 'The Lion and the Mouse',
      paras: [
        'In a thick forest, a lion was sleeping under a tree. A little mouse, playing about, climbed onto him and ran here and there. The lion woke up and angrily caught the mouse in his paw.',
        'Trembling, the mouse said, "Your Majesty, please forgive me. I am so small that eating me won\'t even fill your stomach. If you let me go today, one day I will help you too."',
        'The lion roared with laughter — "You? Help me?" But he felt sorry for the mouse and let him go.',
        'A few days later the lion was caught in a hunter\'s net. The more he struggled, the tighter the net became. His roar echoed through the whole forest.',
        'The mouse recognised the roar and came running. With his tiny sharp teeth he gnawed through the ropes of the net one by one. The lion was free. He said to the mouse, "Today I understand — nobody is too small." From that day the two were the best of friends.',
      ],
      seekh: 'Never think of anyone as small. Kindness always comes back to you one day.',
    },
    hinglish: {
      title: 'Sher aur Chooha',
      paras: [
        'Ek ghane jungle mein ek sher ped ke neeche so raha tha. Ek chhota sa chooha khelte-khelte uske upar chadh gaya aur idhar-udhar daudne laga. Sher ki neend toot gayi aur usne gusse mein choohe ko apne panje mein pakad liya.',
        'Chooha kaanpte hue bola, "Maharaj, mujhe maaf kar dijiye. Main bahut chhota hoon, mujhe kha kar aapka pet bhi nahi bharega. Aaj chhod denge to ek din main bhi aapki madad karunga."',
        'Sher zor se hansa — "Tum? Meri madad?" Par use choohe pe daya aa gayi aur usne use chhod diya.',
        'Kuch din baad sher ek shikaari ke jaal mein phans gaya. Woh jitna chhatpataata, jaal utna hi kasta jaata. Uski dahaad poore jungle mein goonj uthi.',
        'Choohe ne dahaad pehchaan li aur dauda-dauda aaya. Usne apne nanhe paine daanton se jaal ki rassiyan ek-ek karke kutar deen. Sher azaad ho gaya. Usne choohe se kaha, "Aaj samajh aaya, koi bhi chhota nahi hota." Us din se dono pakke dost ban gaye.',
      ],
      seekh: 'Kisi ko chhota mat samjho. Daya aur bhalaai ka badla ek din zaroor milta hai.',
    },
    bn: {
      title: 'সিংহ আর ইঁদুর',
      paras: [
        'এক গভীর বনে একটা সিংহ গাছের নিচে ঘুমোচ্ছিল। একটা ছোট্ট ইঁদুর খেলতে খেলতে তার গায়ে উঠে এদিক-ওদিক ছুটতে লাগল। সিংহের ঘুম ভেঙে গেল, রেগে গিয়ে সে ইঁদুরটাকে থাবায় চেপে ধরল।',
        'ইঁদুর কাঁপতে কাঁপতে বলল, "মহারাজ, আমাকে ক্ষমা করুন। আমি এত ছোট, আমাকে খেলে আপনার পেটও ভরবে না। আজ ছেড়ে দিলে একদিন আমিও আপনার উপকার করব।"',
        'সিংহ হো-হো করে হেসে উঠল — "তুমি? আমার উপকার?" তবু ইঁদুরের ওপর তার দয়া হল, সে তাকে ছেড়ে দিল।',
        'কয়েক দিন পরে সিংহ এক শিকারির জালে আটকে গেল। যত ছটফট করে, জাল তত শক্ত হয়ে চেপে বসে। তার গর্জনে সারা বন কেঁপে উঠল।',
        'ইঁদুর গর্জন চিনতে পেরে ছুটে এল। নিজের ছোট্ট ধারালো দাঁত দিয়ে জালের দড়িগুলো একটা একটা করে কেটে দিল। সিংহ মুক্ত হল। সে ইঁদুরকে বলল, "আজ বুঝলাম, কেউই ছোট নয়।" সেদিন থেকে দুজনে হল পাকা বন্ধু।',
      ],
      seekh: 'কাউকে ছোট ভেবো না। দয়া আর উপকারের ফল একদিন ঠিকই ফিরে আসে।',
    },
  },
  {
    slug: 'akbar-birbal-lakeer',
    emoji: '📏',
    minutes: 2,
    source: { hi: 'अकबर-बीरबल', en: 'Akbar and Birbal', hinglish: 'Akbar-Birbal', bn: 'আকবর-বীরবল' },
    hi: {
      title: 'अकबर-बीरबल: छोटी लकीर',
      paras: [
        'एक दिन बादशाह अकबर के दरबार में सब बैठे थे। अकबर ने चॉक उठाई और फ़र्श पर एक लंबी लकीर खींच दी। फिर मुस्कुराकर बोले, "कोई इस लकीर को छोटा करके दिखाए — पर शर्त यह है कि इसे छूना या मिटाना नहीं है।"',
        'दरबारी सोच में पड़ गए। एक ने कहा, "बिना छुए कैसे छोटा होगा?" दूसरे ने सिर खुजाया। किसी के पास कोई जवाब नहीं था।',
        'तभी बीरबल आगे आए। उन्होंने चॉक ली और अकबर की लकीर के ठीक बगल में उससे भी लंबी एक लकीर खींच दी।',
        'अब सबने देखा — बादशाह की लकीर, नई लकीर के सामने छोटी लग रही थी! बीरबल ने उसे छुआ भी नहीं था।',
        'अकबर बहुत खुश हुए और बोले, "बीरबल, तुमने दिखा दिया कि किसी को छोटा करने के लिए उसे मिटाना ज़रूरी नहीं — बस खुद को बड़ा बनाओ।"',
      ],
      seekh: 'दूसरों को नीचा दिखाने के बजाय खुद को बेहतर बनाओ।',
    },
    en: {
      title: 'Akbar and Birbal: The Shorter Line',
      paras: [
        'One day everyone was seated in Emperor Akbar\'s court. Akbar picked up a piece of chalk and drew a long line on the floor. Then he smiled and said, "Who can make this line shorter? But you may not touch it or rub any of it out."',
        'The courtiers were puzzled. One said, "How can it get shorter without touching it?" Another scratched his head. Nobody had an answer.',
        'Then Birbal stepped forward. He took the chalk and drew another line right next to the emperor\'s — a longer one.',
        'Now everyone could see it: next to the new line, the emperor\'s line looked shorter! And Birbal had not even touched it.',
        'Akbar was delighted. "Birbal," he said, "you have shown that you don\'t need to rub someone out to make them smaller — just make yourself bigger."',
      ],
      seekh: 'Instead of pulling others down, make yourself better.',
    },
    hinglish: {
      title: 'Akbar-Birbal: Chhoti Lakeer',
      paras: [
        'Ek din Baadshah Akbar ke darbaar mein sab baithe the. Akbar ne chalk uthaayi aur farsh pe ek lambi lakeer kheench di. Phir muskura ke bole, "Koi is lakeer ko chhota karke dikhaaye — par shart ye hai ki ise chhoona ya mitaana nahi hai."',
        'Darbaari soch mein pad gaye. Ek ne kaha, "Bina chhuye kaise chhoti hogi?" Doosre ne sir khujaaya. Kisi ke paas koi jawaab nahi tha.',
        'Tabhi Birbal aage aaye. Unhone chalk li aur Akbar ki lakeer ke theek bagal mein usse bhi lambi ek lakeer kheench di.',
        'Ab sabne dekha — Baadshah ki lakeer, nayi lakeer ke saamne chhoti lag rahi thi! Birbal ne use chhua bhi nahi tha.',
        'Akbar bahut khush hue aur bole, "Birbal, tumne dikha diya ki kisi ko chhota karne ke liye use mitaana zaroori nahi — bas khud ko bada banao."',
      ],
      seekh: 'Doosron ko neecha dikhaane ke bajaye khud ko behtar banao.',
    },
    bn: {
      title: 'আকবর-বীরবল: ছোট দাগ',
      paras: [
        'একদিন বাদশাহ আকবরের দরবারে সবাই বসে আছে। আকবর চক তুলে মেঝেতে একটা লম্বা দাগ টানলেন। তারপর হেসে বললেন, "কে এই দাগটাকে ছোট করে দেখাতে পারবে? তবে শর্ত হল, দাগটা ছোঁয়া বা মোছা চলবে না।"',
        'দরবারিরা ভাবনায় পড়ে গেল। একজন বলল, "না ছুঁয়ে ছোট হবে কীভাবে?" আরেকজন মাথা চুলকাল। কারও কাছে উত্তর নেই।',
        'তখন বীরবল এগিয়ে এলেন। চক নিয়ে বাদশাহের দাগের ঠিক পাশে তার চেয়েও লম্বা একটা দাগ টেনে দিলেন।',
        'এবার সবাই দেখল — নতুন দাগের পাশে বাদশাহের দাগটা ছোট দেখাচ্ছে! অথচ বীরবল সেটা ছুঁয়েও দেখেননি।',
        'আকবর খুব খুশি হয়ে বললেন, "বীরবল, তুমি দেখিয়ে দিলে, কাউকে ছোট করতে তাকে মুছে ফেলার দরকার নেই — শুধু নিজেকে বড় করো।"',
      ],
      seekh: 'অন্যকে ছোট না করে নিজেকে আরও ভালো করে তোলো।',
    },
  },
  {
    slug: 'tenali-raman-aur-chor',
    emoji: '🪣',
    minutes: 3,
    source: { hi: 'तेनाली रामन', en: 'Tenali Raman', hinglish: 'Tenali Raman', bn: 'তেনালি রামন' },
    hi: {
      title: 'तेनाली रामन और चोर',
      paras: [
        'विजयनगर में उस साल बारिश कम हुई थी और कुएँ का पानी बहुत नीचे चला गया था। तेनाली रामन के बगीचे के पौधे मुरझा रहे थे। पानी खींचते-खींचते तेनाली थक जाते थे।',
        'उन्हीं दिनों शहर में चोरियाँ हो रही थीं। एक रात तेनाली ने देखा कि कुछ चोर उनके घर के पीछे झाड़ियों में छिपे हैं। तेनाली समझ गए और उनके मन में एक मज़ेदार तरकीब आई।',
        'उन्होंने अपनी पत्नी से ज़ोर-ज़ोर से कहा, ताकि चोर सुन लें — "ज़माना ख़राब है। चलो, सारे गहने और सोने के सिक्के एक संदूक में बंद करके कुएँ में डाल देते हैं। वहाँ कोई नहीं ढूँढेगा।" फिर उन्होंने एक भारी संदूक में पत्थर भरे और "धम्म" से कुएँ में गिरा दिया।',
        'चोर बहुत खुश हुए। आधी रात को वे कुएँ से बाल्टी भर-भरकर पानी निकालने लगे, ताकि संदूक तक पहुँच सकें। पानी सीधे नाली से बहकर बगीचे के पौधों तक जाने लगा। पूरी रात वे पानी खींचते रहे।',
        'सुबह होते-होते चोर थककर चूर हो गए — और संदूक में निकले सिर्फ़ पत्थर! तभी तेनाली खिड़की से बोले, "धन्यवाद भाइयों! मेरे बगीचे को ऐसी सिंचाई पहले कभी नहीं मिली।" चोर शर्मिंदा होकर भाग गए, और फिर कभी उस गली में नहीं आए।',
      ],
      seekh: 'होशियारी से बड़ी-बड़ी मुश्किलें आसान हो जाती हैं। और ग़लत रास्ते की मेहनत कभी काम नहीं आती।',
    },
    en: {
      title: 'Tenali Raman and the Thieves',
      paras: [
        'That year there was little rain in Vijayanagara, and the water in the well had gone very low. The plants in Tenali Raman\'s garden were wilting, and Tenali grew tired pulling up water.',
        'In those days there were many thefts in the city. One night Tenali noticed some thieves hiding in the bushes behind his house. He understood at once, and a funny plan came to his mind.',
        'He said loudly to his wife, so that the thieves could hear: "These are bad times. Let\'s lock all our jewellery and gold coins in a chest and drop it into the well. Nobody will look there." Then he filled a heavy chest with stones and dropped it into the well with a loud splash.',
        'The thieves were thrilled. At midnight they began drawing water out of the well bucket after bucket, to reach the chest. The water flowed down the channel straight to the plants in the garden. All night long they kept pulling up water.',
        'By morning the thieves were exhausted — and the chest held nothing but stones! Then Tenali called from the window, "Thank you, brothers! My garden has never been watered so well." The thieves ran away, ashamed, and never came down that street again.',
      ],
      seekh: 'Cleverness makes big problems easy. And hard work on the wrong path never pays.',
    },
    hinglish: {
      title: 'Tenali Raman aur Chor',
      paras: [
        'Vijayanagar mein us saal baarish kam hui thi aur kuein ka paani bahut neeche chala gaya tha. Tenali Raman ke bageeche ke paudhe murjha rahe the. Paani kheenchte-kheenchte Tenali thak jaate the.',
        'Unhi dinon shehar mein choriyan ho rahi thin. Ek raat Tenali ne dekha ki kuch chor unke ghar ke peeche jhaadiyon mein chhipe hain. Tenali samajh gaye aur unke mann mein ek mazedaar tarkeeb aayi.',
        'Unhone apni patni se zor-zor se kaha, taaki chor sun lein — "Zamaana kharaab hai. Chalo, saare gehne aur sone ke sikke ek sandook mein band karke kuein mein daal dete hain. Wahan koi nahi dhoondhega." Phir unhone ek bhaari sandook mein patthar bhare aur "dhamm" se kuein mein gira diya.',
        'Chor bahut khush hue. Aadhi raat ko woh kuein se baalti bhar-bhar ke paani nikaalne lage, taaki sandook tak pahunch sakein. Paani seedha naali se beh kar bageeche ke paudhon tak jaane laga. Poori raat woh paani kheenchte rahe.',
        'Subah hote-hote chor thak kar choor ho gaye — aur sandook mein nikle sirf patthar! Tabhi Tenali khidki se bole, "Thank you bhaiyon! Mere bageeche ko aisi sinchaai pehle kabhi nahi mili." Chor sharminda ho kar bhaag gaye, aur phir kabhi us gali mein nahi aaye.',
      ],
      seekh: 'Hoshiyaari se badi-badi mushkilein aasaan ho jaati hain. Aur galat raaste ki mehnat kabhi kaam nahi aati.',
    },
    bn: {
      title: 'তেনালি রামন আর চোর',
      paras: [
        'সে বছর বিজয়নগরে বৃষ্টি কম হয়েছিল, কুয়োর জল অনেক নিচে নেমে গিয়েছিল। তেনালি রামনের বাগানের গাছগুলো শুকিয়ে যাচ্ছিল। জল তুলতে তুলতে তেনালি ক্লান্ত হয়ে পড়তেন।',
        'সেই সময় শহরে খুব চুরি হচ্ছিল। এক রাতে তেনালি দেখলেন, কয়েকজন চোর তাঁর বাড়ির পেছনের ঝোপে লুকিয়ে আছে। তেনালি সব বুঝে গেলেন, আর তাঁর মাথায় এল এক মজার ফন্দি।',
        'চোরেরা যাতে শুনতে পায়, তাই তিনি স্ত্রীকে জোরে জোরে বললেন, "দিনকাল ভালো নয়। চলো, সব গয়না আর সোনার মোহর একটা সিন্দুকে ভরে কুয়োয় ফেলে দিই। ওখানে কেউ খুঁজবে না।" তারপর একটা ভারী সিন্দুকে পাথর ভরে "ঝপাং" করে কুয়োয় ফেলে দিলেন।',
        'চোরেরা তো মহাখুশি। মাঝরাতে তারা সিন্দুকের নাগাল পেতে বালতি বালতি জল তুলতে লাগল। সেই জল নালা বেয়ে সোজা বাগানের গাছে গিয়ে পড়তে লাগল। সারা রাত ধরে তারা জল তুলেই চলল।',
        'ভোর হতে হতে চোরেরা ক্লান্ত হয়ে নেতিয়ে পড়ল — আর সিন্দুক থেকে বেরোল শুধু পাথর! তখন তেনালি জানলা থেকে বললেন, "ধন্যবাদ ভাইয়েরা! আমার বাগানে এত ভালো জল আগে কখনো পড়েনি।" চোরেরা লজ্জায় পালিয়ে গেল, আর কোনোদিন সে রাস্তায় আসেনি।',
      ],
      seekh: 'বুদ্ধি খাটালে বড় বড় সমস্যাও সহজ হয়ে যায়। আর ভুল পথের পরিশ্রম কখনো কাজে আসে না।',
    },
  },
  {
    slug: 'mulla-nasruddin-ke-kapde',
    emoji: '🧥',
    minutes: 2,
    source: { hi: 'मुल्ला नसरुद्दीन', en: 'Mulla Nasruddin', hinglish: 'Mulla Nasruddin', bn: 'মোল্লা নাসিরুদ্দিন' },
    hi: {
      title: 'मुल्ला नसरुद्दीन: खाओ मेरे कपड़ो!',
      paras: [
        'एक दिन मुल्ला नसरुद्दीन को एक अमीर आदमी की दावत में बुलाया गया। मुल्ला खेत से सीधे चले आए — पुराने, धूल भरे कपड़ों में।',
        'दरवाज़े पर किसी ने उनका स्वागत नहीं किया। उन्हें एक कोने में बिठा दिया गया और कोई उनसे बात तक नहीं कर रहा था। खाना परोसा गया तो सबसे आख़िर में उनकी बारी आई।',
        'मुल्ला चुपचाप उठे, घर गए और अपना सबसे शानदार लबादा, चमकदार पगड़ी और नए जूते पहनकर लौटे। इस बार मेज़बान ख़ुद दौड़ता हुआ आया और उन्हें सबसे अच्छी जगह पर बिठाया।',
        'जैसे ही गरमागरम पकवान आए, मुल्ला ने शोरबे का कटोरा उठाया और अपनी आस्तीन में उड़ेलने लगे। फिर पुलाव लेकर लबादे की जेब में डालने लगे और बोले, "खाओ, मेरे कपड़ो, खाओ!"',
        'सब हैरान रह गए। मेज़बान ने पूछा, "मुल्ला जी, यह क्या कर रहे हैं?" मुल्ला मुस्कुराए, "जब मैं पुराने कपड़ों में आया, तो किसी ने पूछा तक नहीं। अब इन कपड़ों की इतनी इज़्ज़त है, तो दावत भी इन्हीं की होनी चाहिए!" मेज़बान को अपनी ग़लती समझ आ गई।',
      ],
      seekh: 'इंसान की इज़्ज़त उसके कपड़ों से नहीं, उसके व्यवहार और गुणों से करो।',
    },
    en: {
      title: 'Mulla Nasruddin: Eat, My Coat!',
      paras: [
        'One day Mulla Nasruddin was invited to a rich man\'s feast. He came straight from the fields — in old, dusty clothes.',
        'Nobody welcomed him at the door. He was seated in a corner and nobody even spoke to him. When the food was served, he was the very last to get any.',
        'Quietly the Mulla got up, went home and came back in his finest robe, a shining turban and new shoes. This time the host himself rushed to greet him and seated him in the best place.',
        'As soon as the hot dishes arrived, the Mulla picked up the bowl of soup and began pouring it into his sleeve. Then he started stuffing pulao into the pocket of his robe, saying, "Eat, my coat, eat!"',
        'Everyone was amazed. The host asked, "Mulla ji, what are you doing?" The Mulla smiled. "When I came in old clothes, nobody even asked about me. Now these clothes get so much respect, so the feast should be theirs!" The host understood his mistake.',
      ],
      seekh: 'Respect people for how they behave and who they are, not for the clothes they wear.',
    },
    hinglish: {
      title: 'Mulla Nasruddin: Khao Mere Kapdo!',
      paras: [
        'Ek din Mulla Nasruddin ko ek ameer aadmi ki daawat mein bulaaya gaya. Mulla khet se seedhe chale aaye — purane, dhool bhare kapdon mein.',
        'Darwaaze pe kisi ne unka swagat nahi kiya. Unhe ek kone mein bitha diya gaya aur koi unse baat tak nahi kar raha tha. Khaana parosa gaya to sabse aakhir mein unki baari aayi.',
        'Mulla chupchaap uthe, ghar gaye aur apna sabse shaandaar labaada, chamakdaar pagdi aur naye joote pehen kar laute. Is baar mezbaan khud daudta hua aaya aur unhe sabse achhi jagah pe bithaaya.',
        'Jaise hi garmaagaram pakwan aaye, Mulla ne shorbe ka katora uthaaya aur apni aasteen mein udelne lage. Phir pulao le kar labaade ki jeb mein daalne lage aur bole, "Khao, mere kapdo, khao!"',
        'Sab hairaan reh gaye. Mezbaan ne poochha, "Mulla ji, ye kya kar rahe hain?" Mulla muskuraaye, "Jab main purane kapdon mein aaya, to kisi ne poochha tak nahi. Ab in kapdon ki itni izzat hai, to daawat bhi inhi ki honi chahiye!" Mezbaan ko apni galti samajh aa gayi.',
      ],
      seekh: 'Insaan ki izzat uske kapdon se nahi, uske vyavhaar aur gunon se karo.',
    },
    bn: {
      title: 'মোল্লা নাসিরুদ্দিন: খাও, আমার জামা!',
      paras: [
        'একদিন মোল্লা নাসিরুদ্দিনকে এক ধনী লোকের ভোজে নিমন্ত্রণ করা হল। মোল্লা মাঠ থেকে সোজা চলে এলেন — পুরনো, ধুলোমাখা জামাকাপড়ে।',
        'দরজায় কেউ তাঁকে অভ্যর্থনা জানাল না। তাঁকে এক কোণে বসিয়ে দেওয়া হল, কেউ তাঁর সঙ্গে কথাও বলছিল না। খাবার পরিবেশনের সময় সবার শেষে তাঁর পালা এল।',
        'মোল্লা চুপচাপ উঠে বাড়ি গেলেন, আর নিজের সবচেয়ে জমকালো আলখাল্লা, ঝকঝকে পাগড়ি আর নতুন জুতো পরে ফিরে এলেন। এবার গৃহকর্তা নিজেই ছুটে এসে তাঁকে সবচেয়ে ভালো জায়গায় বসালেন।',
        'গরম গরম খাবার আসতেই মোল্লা ঝোলের বাটি তুলে নিজের জামার হাতায় ঢালতে লাগলেন। তারপর পোলাও নিয়ে আলখাল্লার পকেটে ভরতে ভরতে বললেন, "খাও, আমার জামা, খাও!"',
        'সবাই অবাক। গৃহকর্তা জিজ্ঞেস করলেন, "মোল্লাজি, এ কী করছেন?" মোল্লা হেসে বললেন, "যখন পুরনো জামায় এলাম, কেউ খোঁজও নিল না। এখন এই জামার এত সম্মান, তাই ভোজটাও এরই প্রাপ্য!" গৃহকর্তা নিজের ভুল বুঝতে পারলেন।',
      ],
      seekh: 'মানুষকে তার জামাকাপড় দেখে নয়, তার আচরণ আর গুণ দেখে সম্মান করো।',
    },
  },
  {
    slug: 'lalchi-kutta',
    emoji: '🐕',
    minutes: 2,
    source: { hi: 'लोककथा', en: 'Folk tale', hinglish: 'Lok-katha', bn: 'লোককথা' },
    hi: {
      title: 'लालची कुत्ता',
      paras: [
        'एक गाँव में एक कुत्ता रहता था। एक दिन उसे कसाई की दुकान के पास एक बड़ी-सी हड्डी मिल गई। वह बहुत खुश हुआ और हड्डी मुँह में दबाकर आराम से खाने के लिए किसी शांत जगह की ओर चल पड़ा।',
        'रास्ते में एक छोटी-सी नदी थी, जिस पर लकड़ी का पुल बना था। पुल पार करते हुए कुत्ते ने नीचे पानी में देखा। उसे वहाँ एक और कुत्ता दिखा — मुँह में उससे भी बड़ी हड्डी लिए हुए!',
        'कुत्ते के मन में लालच आ गया। उसने सोचा, "अगर मैं इसे डराकर इसकी हड्डी भी छीन लूँ, तो मेरे पास दो हड्डियाँ हो जाएँगी।"',
        'उसने ज़ोर से भौंकने के लिए जैसे ही मुँह खोला — "भौं!" — उसकी अपनी हड्डी छपाक से नदी में गिर गई और बह गई।',
        'तब कुत्ते को समझ आया कि पानी में कोई दूसरा कुत्ता था ही नहीं — वह तो उसकी अपनी परछाईं थी। लालच के चक्कर में उसने अपनी हड्डी भी गँवा दी और भूखा ही घर लौटा।',
      ],
      seekh: 'लालच बुरी बला है। जो हमारे पास है, उसमें खुश रहना सीखो।',
    },
    en: {
      title: 'The Greedy Dog',
      paras: [
        'A dog lived in a village. One day he found a big bone near the butcher\'s shop. He was very happy, and with the bone in his mouth he set off for a quiet place to eat it in peace.',
        'On the way there was a small river with a wooden bridge over it. While crossing the bridge, the dog looked down into the water. There he saw another dog — with an even bigger bone in its mouth!',
        'Greed filled the dog\'s heart. He thought, "If I scare him and snatch his bone too, I will have two bones."',
        'As soon as he opened his mouth to bark loudly — "Woof!" — his own bone fell into the river with a splash and floated away.',
        'Then the dog understood that there was no other dog in the water at all — it was only his own reflection. Because of his greed he lost his own bone too, and went home hungry.',
      ],
      seekh: 'Greed is a bad habit. Learn to be happy with what you have.',
    },
    hinglish: {
      title: 'Laalchi Kutta',
      paras: [
        'Ek gaon mein ek kutta rehta tha. Ek din use kasaai ki dukaan ke paas ek badi si haddi mil gayi. Woh bahut khush hua aur haddi munh mein daba kar aaraam se khaane ke liye kisi shaant jagah ki taraf chal pada.',
        'Raaste mein ek chhoti si nadi thi, jis pe lakdi ka pul bana tha. Pul paar karte hue kutte ne neeche paani mein dekha. Use wahan ek aur kutta dikha — munh mein usse bhi badi haddi liye hue!',
        'Kutte ke mann mein laalach aa gaya. Usne socha, "Agar main ise dara ke iski haddi bhi chheen loon, to mere paas do haddiyan ho jaayengi."',
        'Usne zor se bhaunkne ke liye jaise hi munh khola — "Bhaun!" — uski apni haddi chhapaak se nadi mein gir gayi aur beh gayi.',
        'Tab kutte ko samajh aaya ki paani mein koi doosra kutta tha hi nahi — woh to uski apni parchhaai thi. Laalach ke chakkar mein usne apni haddi bhi ganwa di aur bhookha hi ghar lauta.',
      ],
      seekh: 'Laalach buri bala hai. Jo hamare paas hai, usme khush rehna seekho.',
    },
    bn: {
      title: 'লোভী কুকুর',
      paras: [
        'এক গ্রামে থাকত একটা কুকুর। একদিন কসাইয়ের দোকানের কাছে সে একটা বড় হাড় পেল। খুব খুশি হয়ে হাড়টা মুখে নিয়ে সে নিরিবিলিতে বসে খাওয়ার জন্য চলল।',
        'পথে একটা ছোট নদী, তার ওপর কাঠের সাঁকো। সাঁকো পেরোতে গিয়ে কুকুরটা নিচে জলের দিকে তাকাল। সেখানে দেখল আরেকটা কুকুর — মুখে তার চেয়েও বড় একটা হাড়!',
        'কুকুরের মনে লোভ জাগল। ভাবল, "ওকে ভয় দেখিয়ে ওর হাড়টাও কেড়ে নিলে আমার দুটো হাড় হয়ে যাবে।"',
        'জোরে ঘেউ করার জন্য যেই সে মুখ খুলল — "ঘেউ!" — তার নিজের হাড়টা ঝপাং করে নদীতে পড়ে ভেসে গেল।',
        'তখন কুকুরটা বুঝল, জলে আর কোনো কুকুর ছিলই না — ওটা ছিল তারই প্রতিবিম্ব। লোভে পড়ে নিজের হাড়টাও হারাল, আর খিদে নিয়েই বাড়ি ফিরল।',
      ],
      seekh: 'লোভে পাপ, পাপে মৃত্যু — লোভ ভালো নয়। যা আছে, তাতেই খুশি থাকতে শেখো।',
    },
  },
  {
    slug: 'kabootar-aur-jaal',
    emoji: '🕊️',
    minutes: 3,
    source: { hi: 'पंचतंत्र', en: 'Panchatantra', hinglish: 'Panchatantra', bn: 'পঞ্চতন্ত্র' },
    hi: {
      title: 'कबूतर और शिकारी का जाल',
      paras: [
        'एक जंगल में कबूतरों का एक बड़ा झुंड रहता था। उनका राजा बहुत समझदार था। एक दिन दाना ढूँढते हुए झुंड ने ज़मीन पर बिखरे चावल देखे। सब भूखे थे, इसलिए बिना सोचे नीचे उतर आए।',
        'जैसे ही उन्होंने दाना चुगना शुरू किया, ऊपर से एक जाल गिरा और सारे कबूतर उसमें फँस गए। दूर झाड़ी में छिपा शिकारी खुश होकर उनकी ओर आने लगा। कबूतर डरकर इधर-उधर फड़फड़ाने लगे।',
        'तब कबूतरों के राजा ने कहा, "घबराओ मत! अगर हम अलग-अलग उड़ेंगे तो जाल में और उलझेंगे। सब एक साथ, एक ही दिशा में ज़ोर लगाओ — मेरी गिनती पर: एक, दो, तीन!"',
        'सारे कबूतर एक साथ उड़े — और पूरा जाल उनके साथ हवा में उठ गया! शिकारी नीचे देखता रह गया। कबूतर उड़ते-उड़ते दूर एक पहाड़ी पर पहुँचे, जहाँ राजा का दोस्त, एक चूहा, रहता था।',
        'चूहे ने अपने दाँतों से जाल काटना शुरू किया। राजा बोला, "पहले मेरे साथियों को छुड़ाओ, मुझे सबसे आख़िर में।" चूहे ने एक-एक करके सबको आज़ाद किया। सबने मिलकर चूहे को धन्यवाद दिया और खुशी-खुशी घर लौटे।',
      ],
      seekh: 'एकता में बड़ी ताकत है। और अच्छा मुखिया पहले अपने साथियों की फ़िक्र करता है।',
    },
    en: {
      title: 'The Pigeons and the Hunter\'s Net',
      paras: [
        'A big flock of pigeons lived in a forest. Their king was very wise. One day, while looking for food, the flock saw rice grains scattered on the ground. Everyone was hungry, so they flew down without thinking.',
        'As soon as they began pecking, a net dropped from above and all the pigeons were trapped. The hunter hiding in a far-off bush started walking towards them happily. The frightened pigeons flapped about in every direction.',
        'Then the king of the pigeons said, "Don\'t panic! If we fly in different directions, we\'ll only get more tangled. Let\'s all push together, the same way — on my count: one, two, three!"',
        'All the pigeons flew up together — and the whole net rose into the air with them! The hunter could only stare. The pigeons flew far away to a hill where the king\'s friend, a mouse, lived.',
        'The mouse began cutting the net with his teeth. The king said, "Free my companions first, and me last of all." The mouse freed them one by one. Together they thanked the mouse and flew home happily.',
      ],
      seekh: 'There is great strength in unity. And a good leader thinks of his companions first.',
    },
    hinglish: {
      title: 'Kabootar aur Shikaari ka Jaal',
      paras: [
        'Ek jungle mein kabootaron ka ek bada jhund rehta tha. Unka raja bahut samajhdaar tha. Ek din daana dhoondhte hue jhund ne zameen pe bikhre chawal dekhe. Sab bhookhe the, isliye bina soche neeche utar aaye.',
        'Jaise hi unhone daana chugna shuru kiya, upar se ek jaal gira aur saare kabootar usme phans gaye. Door jhaadi mein chhipa shikaari khush ho kar unki taraf aane laga. Kabootar dar kar idhar-udhar phadphadaane lage.',
        'Tab kabootaron ke raja ne kaha, "Ghabraao mat! Agar hum alag-alag udenge to jaal mein aur uljhenge. Sab ek saath, ek hi disha mein zor lagao — meri ginti pe: ek, do, teen!"',
        'Saare kabootar ek saath ude — aur poora jaal unke saath hawa mein uth gaya! Shikaari neeche dekhta reh gaya. Kabootar udte-udte door ek pahaadi pe pahunche, jahan raja ka dost, ek chooha, rehta tha.',
        'Choohe ne apne daanton se jaal kaatna shuru kiya. Raja bola, "Pehle mere saathiyon ko chhudaao, mujhe sabse aakhir mein." Choohe ne ek-ek karke sabko azaad kiya. Sabne mil kar choohe ko thank you kaha aur khushi-khushi ghar laute.',
      ],
      seekh: 'Ekta mein badi taakat hai. Aur achha mukhiya pehle apne saathiyon ki fikr karta hai.',
    },
    bn: {
      title: 'পায়রা আর শিকারির জাল',
      paras: [
        'এক বনে থাকত পায়রাদের এক বড় দল। তাদের রাজা ছিল খুব বুদ্ধিমান। একদিন খাবার খুঁজতে খুঁজতে দলটা দেখল মাটিতে চাল ছড়িয়ে আছে। সবার খিদে পেয়েছিল, তাই না ভেবেই নেমে পড়ল।',
        'যেই তারা দানা খুঁটতে শুরু করল, ওপর থেকে একটা জাল পড়ল আর সব পায়রা আটকে গেল। দূরের ঝোপে লুকিয়ে থাকা শিকারি খুশি হয়ে এগিয়ে আসতে লাগল। ভয়ে পায়রারা এদিক-ওদিক ডানা ঝাপটাতে লাগল।',
        'তখন পায়রাদের রাজা বলল, "ঘাবড়ে যেও না! আলাদা আলাদা দিকে উড়লে জালে আরও জড়িয়ে যাব। সবাই একসঙ্গে, একই দিকে জোর লাগাও — আমার গোনায়: এক, দুই, তিন!"',
        'সব পায়রা একসঙ্গে উড়ল — আর গোটা জালটাই তাদের সঙ্গে আকাশে উঠে গেল! শিকারি নিচে হাঁ করে তাকিয়ে রইল। পায়রারা উড়তে উড়তে দূরের এক পাহাড়ে পৌঁছল, যেখানে থাকত রাজার বন্ধু, এক ইঁদুর।',
        'ইঁদুর দাঁত দিয়ে জাল কাটতে শুরু করল। রাজা বলল, "আগে আমার সঙ্গীদের ছাড়াও, আমাকে সবার শেষে।" ইঁদুর একে একে সবাইকে মুক্ত করল। সবাই মিলে ইঁদুরকে ধন্যবাদ দিয়ে খুশি মনে বাড়ি ফিরল।',
      ],
      seekh: 'একতাই বল। আর ভালো নেতা আগে নিজের সঙ্গীদের কথা ভাবে।',
    },
  },
  {
    slug: 'sone-ka-anda',
    emoji: '🥚',
    minutes: 2,
    source: { hi: 'ईसप की कहानी', en: 'Aesop\'s fable', hinglish: 'Aesop ki kahani', bn: 'ঈশপের গল্প' },
    hi: {
      title: 'सोने का अंडा देने वाली मुर्गी',
      paras: [
        'एक गाँव में एक किसान और उसकी पत्नी रहते थे। उनके पास एक मुर्गी थी। एक सुबह किसान ने देखा कि मुर्गी ने एक चमचमाता सोने का अंडा दिया है! दोनों की खुशी का ठिकाना न रहा।',
        'उस दिन से मुर्गी रोज़ एक सोने का अंडा देने लगी। किसान अंडे बेचकर धीरे-धीरे अमीर होने लगा। उसका घर पक्का बन गया और परिवार आराम से रहने लगा।',
        'पर कुछ समय बाद किसान के मन में लालच आ गया। उसने पत्नी से कहा, "रोज़ एक-एक अंडे का इंतज़ार कौन करे? मुर्गी के पेट में ज़रूर ढेर सारे सोने के अंडे भरे होंगे। क्यों न सारे एक साथ निकाल लें!"',
        'पत्नी ने समझाया, पर किसान नहीं माना। उसने मुर्गी को मार डाला और उसका पेट चीर दिया — पर अंदर कोई सोना नहीं था, बिल्कुल आम मुर्गी जैसा पेट था।',
        'किसान सिर पकड़कर बैठ गया। एक-साथ सब पाने के लालच में उसने वह मुर्गी ही खो दी, जो उसे रोज़ सोना देती थी।',
      ],
      seekh: 'सब्र का फल मीठा होता है। एक साथ सब कुछ पाने का लालच, जो है उसे भी छीन लेता है।',
    },
    en: {
      title: 'The Hen That Laid Golden Eggs',
      paras: [
        'A farmer and his wife lived in a village, and they had a hen. One morning the farmer found that the hen had laid a shining golden egg! The two of them were overjoyed.',
        'From that day the hen laid one golden egg every day. The farmer sold the eggs and slowly became rich. They built a proper house and the family lived in comfort.',
        'But after a while, greed crept into the farmer\'s heart. He said to his wife, "Why wait for one egg a day? The hen\'s stomach must be full of golden eggs. Why not take them all out at once!"',
        'His wife tried to stop him, but the farmer would not listen. He killed the hen and cut it open — but there was no gold inside. It was just like any ordinary hen.',
        'The farmer sat down holding his head. In his greed to get everything at once, he had lost the very hen that gave him gold every day.',
      ],
      seekh: 'Patience brings sweet rewards. Greed for everything at once takes away even what you have.',
    },
    hinglish: {
      title: 'Sone ka Anda Dene Wali Murgi',
      paras: [
        'Ek gaon mein ek kisaan aur uski patni rehte the. Unke paas ek murgi thi. Ek subah kisaan ne dekha ki murgi ne ek chamchamaata sone ka anda diya hai! Dono ki khushi ka thikaana na raha.',
        'Us din se murgi roz ek sone ka anda dene lagi. Kisaan ande bech kar dheere-dheere ameer hone laga. Uska ghar pakka ban gaya aur parivaar aaraam se rehne laga.',
        'Par kuch samay baad kisaan ke mann mein laalach aa gaya. Usne patni se kaha, "Roz ek-ek ande ka intezaar kaun kare? Murgi ke pet mein zaroor dher saare sone ke ande bhare honge. Kyun na saare ek saath nikaal lein!"',
        'Patni ne samjhaaya, par kisaan nahi maana. Usne murgi ko maar daala aur uska pet cheer diya — par andar koi sona nahi tha, bilkul aam murgi jaisa pet tha.',
        'Kisaan sir pakad ke baith gaya. Ek saath sab paane ke laalach mein usne woh murgi hi kho di, jo use roz sona deti thi.',
      ],
      seekh: 'Sabr ka phal meetha hota hai. Ek saath sab kuch paane ka laalach, jo hai use bhi chheen leta hai.',
    },
    bn: {
      title: 'সোনার ডিম পাড়া মুরগি',
      paras: [
        'এক গ্রামে থাকত এক চাষি আর তার বউ। তাদের ছিল একটা মুরগি। এক সকালে চাষি দেখল, মুরগিটা একটা ঝকঝকে সোনার ডিম পেড়েছে! দুজনের আনন্দ আর ধরে না।',
        'সেদিন থেকে মুরগিটা রোজ একটা করে সোনার ডিম পাড়তে লাগল। চাষি ডিম বেচে ধীরে ধীরে বড়লোক হয়ে উঠল। পাকা বাড়ি হল, সংসার সুখে চলতে লাগল।',
        'কিন্তু কিছুদিন পরে চাষির মনে লোভ ঢুকল। বউকে বলল, "রোজ একটা একটা ডিমের জন্য কে বসে থাকে? মুরগির পেটে নিশ্চয়ই অনেক সোনার ডিম ভরা আছে। সব একসঙ্গে বের করে নিই না কেন!"',
        'বউ বোঝাল, কিন্তু চাষি শুনল না। সে মুরগিটাকে মেরে পেট চিরে ফেলল — কিন্তু ভেতরে কোনো সোনা নেই, একদম সাধারণ মুরগির মতোই।',
        'চাষি মাথায় হাত দিয়ে বসে পড়ল। একসঙ্গে সব পাওয়ার লোভে সে সেই মুরগিটাকেই হারাল, যে তাকে রোজ সোনা দিত।',
      ],
      seekh: 'ধৈর্যের ফল মিষ্টি। একসঙ্গে সব পাওয়ার লোভ, যা আছে তা-ও কেড়ে নেয়।',
    },
  },
];

stories.push(...moreStories);

export { stories };
