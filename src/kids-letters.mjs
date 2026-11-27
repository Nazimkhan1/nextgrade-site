/**
 * Content for the kids sub-pages Google left "crawled, not indexed" (27 Nov 2026: barakhadi 19, matra 10, pahade 10 —
 * each page was the same template with only the letters changed). Own words, per page:
 *  - barakhadi/<letter>: a real word for each of the 11 forms (with meaning), how the letter is spoken (place, breath,
 *    voice — from the standard varnamala classification), letters it is often mixed up with, a fill-the-gap exercise.
 *  - matra/<m>: the writing rule, 10 more words, the common mistake, 3 short sentences to read.
 *  - pahade/<n>: a trick to remember the table, the table from 11 to 20, practice and division questions.
 * kidsChildExtra(key, code, esc) → HTML ('' if nothing for this page).
 */
const FORMS = ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं'];
// word|roman|meaning per form (empty = no common word; for ण, ष, त्र, ज्ञ the form appears inside the word)
const BW = {
  'क': 'कमल|kamal|lotus;काला|kaala|black;किताब|kitaab|book;कील|keel|nail;कुर्सी|kursi|chair;कूलर|kular|air cooler;केला|kela|banana;कैंची|kainchi|scissors;कोयल|koyal|cuckoo;कौआ|kauaa|crow;कंघी|kanghi|comb',
  'ख': 'खरगोश|khargosh|rabbit;खाना|khaana|food;खिलौना|khilauna|toy;खीर|kheer|rice pudding;खुशी|khushi|happiness;खूँटी|khoonti|wall peg;खेत|khet|field;खैरियत|khairiyat|well-being;खोल|khol|cover, shell;खौलना|khaulna|to boil;खंभा|khambha|pillar',
  'ग': 'गमला|gamla|flower pot;गाय|gaay|cow;गिलास|gilaas|glass;गीत|geet|song;गुलाब|gulaab|rose;गूलर|goolar|cluster fig;गेंद|gend|ball;गैस|gais|gas;गोभी|gobhi|cauliflower;गौरैया|gauraiya|sparrow;गंगा|Ganga|the river Ganga',
  'घ': 'घर|ghar|house;घास|ghaas|grass;घिसना|ghisna|to rub;घी|ghee|ghee;घुटना|ghutna|knee;घूमना|ghoomna|to roam;घेरा|ghera|circle;;घोड़ा|ghoda|horse;;घंटी|ghanti|bell',
  'च': 'चम्मच|chammach|spoon;चाय|chaay|tea;चिड़िया|chidiya|little bird;चीनी|cheeni|sugar;चुटकी|chutki|pinch;चूहा|chooha|mouse;चेहरा|chehra|face;चैन|chain|peace;चोटी|choti|braid, peak;चौकी|chauki|low wooden stool;चंदा|chanda|moon',
  'छ': 'छत|chhat|roof;छाता|chhaata|umbrella;छिपकली|chhipkali|lizard;छींक|chheenk|sneeze;छुट्टी|chhutti|holiday;छूना|chhoona|to touch;छेद|chhed|hole;;छोटा|chhota|small;छौंक|chhaunk|tempering (tadka);छंद|chhand|verse metre',
  'ज': 'जहाज़|jahaaz|ship;जामुन|jaamun|black plum;जिराफ़|jiraaf|giraffe;जीभ|jeebh|tongue;जुगनू|jugnu|firefly;जूता|joota|shoe;जेब|jeb|pocket;जैसा|jaisa|like, as;जोकर|jokar|joker;जौ|jau|barley;जंगल|jangal|forest',
  'झ': 'झरना|jharna|waterfall;झाड़ू|jhaadu|broom;झिलमिल|jhilmil|twinkling;झील|jheel|lake;झुमका|jhumka|earring;झूला|jhoola|swing;झेलना|jhelna|to bear;;झोला|jhola|cloth bag;;झंडा|jhanda|flag',
  'ट': 'टमाटर|tamaatar|tomato;टापू|taapoo|island;टिकट|tikat|ticket;टीका|teeka|vaccine, tilak;टुकड़ा|tukda|piece;टूटना|tootna|to break;टेढ़ा|tedha|crooked;;टोपी|topi|cap;;टंकी|tanki|water tank',
  'ठ': 'ठग|thag|cheat;ठाकुर|thaakur|lord, landlord;ठिकाना|thikaana|place to stay;ठीक|theek|fine, right;ठुड्डी|thuddi|chin;ठूँठ|thoonth|tree stump;ठेला|thela|handcart;;ठोकर|thokar|stumble;;ठंड|thand|cold',
  'ड': 'डमरू|damroo|small hand drum;डाकिया|daakiya|postman;डिब्बा|dibba|box;;डुबकी|dubki|dip;डूबना|doobna|to sink;डेरा|dera|camp;;डोरी|dori|string;;डंडा|danda|stick',
  'ढ': 'ढक्कन|dhakkan|lid;ढाल|dhaal|shield;ढिबरी|dhibri|small oil lamp;ढीला|dheela|loose;ढुलाई|dhulaai|carrying charge;ढूँढना|dhoondhna|to search;ढेर|dher|heap;;ढोल|dhol|big drum;;ढंग|dhang|manner, way',
  'ण': 'बाण|baan|arrow;वीणा|veena|veena;मणि|mani|gem;वाणी|vaani|speech;अणु|anu|atom;;गणेश|Ganesh|Lord Ganesha;;;;',
  'त': 'तबला|tabla|tabla;तारा|taara|star;तितली|titli|butterfly;तीर|teer|arrow;तुलसी|tulsi|holy basil;तूफ़ान|toofaan|storm;तेल|tel|oil;तैरना|tairna|to swim;तोता|tota|parrot;तौलिया|tauliya|towel;तंबू|tamboo|tent',
  'थ': 'थकान|thakaan|tiredness;थाली|thaali|plate;थिरकना|thirakna|to dance lightly;;;;;थैला|thaila|bag;थोड़ा|thoda|a little;;',
  'द': 'दरवाज़ा|darwaaza|door;दादी|daadi|grandmother;दिया|diya|clay lamp;दीवार|deewaar|wall;दुकान|dukaan|shop;दूध|doodh|milk;देश|desh|country;दैनिक|dainik|daily;दोस्त|dost|friend;दौड़|daud|race;दंगल|dangal|wrestling match',
  'ध': 'धनुष|dhanush|bow;धागा|dhaaga|thread;;धीरे|dheere|slowly;धुआँ|dhuaan|smoke;धूप|dhoop|sunlight;धेनु|dhenu|cow (Sanskrit);;धोबी|dhobi|washerman;धौंकनी|dhaunkni|bellows;धंधा|dhandha|trade, business',
  'न': 'नल|nal|tap;नाव|naav|boat;निशान|nishaan|mark;नीम|neem|neem tree;नुकीला|nukeela|pointed;नूपुर|noopur|anklet;नेता|neta|leader;नैया|naiya|little boat;नोट|not|banknote;नौका|nauka|boat;',
  'प': 'पतंग|patang|kite;पानी|paani|water;पिता|pita|father;पीला|peela|yellow;पुल|pul|bridge;पूरी|poori|puri bread;पेड़|ped|tree;पैसा|paisa|money;पोशाक|poshaak|dress;पौधा|paudha|plant;पंखा|pankha|fan',
  'फ': 'फल|phal|fruit;फाटक|phaatak|gate;फिरकी|phirki|pinwheel;फीता|pheeta|ribbon, lace;फुलवारी|phulwaari|flower garden;फूल|phool|flower;फेरीवाला|pheriwaala|hawker;फैलना|phailna|to spread;फोन|phon|phone;फौजी|phauji|soldier;फंदा|phanda|loop, trap',
  'ब': 'बकरी|bakri|goat;बादल|baadal|cloud;बिल्ली|billi|cat;बीज|beej|seed;बुलबुल|bulbul|bulbul bird;बूँद|boond|drop;बेर|ber|jujube fruit;बैल|bail|ox;बोतल|botal|bottle;बौछार|bauchhaar|shower of rain;बंदर|bandar|monkey',
  'भ': 'भवन|bhavan|building;भालू|bhaalu|bear;भिंडी|bhindi|okra;भीड़|bheed|crowd;भुट्टा|bhutta|corn cob;भूख|bhookh|hunger;भेड़|bhed|sheep;भैंस|bhains|buffalo;भोजन|bhojan|meal;भौंरा|bhaunra|bumblebee;भंडार|bhandaar|store',
  'म': 'मछली|machhli|fish;माला|maala|garland;मिठाई|mithaai|sweets;मीनार|meenaar|tower;मुकुट|mukut|crown;मूली|mooli|radish;मेला|mela|fair;मैदान|maidaan|playground;मोर|mor|peacock;मौसम|mausam|weather;मंदिर|mandir|temple',
  'य': 'यमुना|Yamuna|the river Yamuna;याद|yaad|memory;;;युवा|yuva|young person;;;;योग|yog|yoga;;यंत्र|yantra|machine',
  'र': 'रथ|rath|chariot;राजा|raaja|king;रिक्शा|riksha|rickshaw;रीछ|reechh|bear;रुमाल|rumaal|handkerchief;रूई|rooi|cotton wool;रेल|rel|train;रैली|raili|rally;रोटी|roti|roti bread;रौनक|raunak|liveliness;रंग|rang|colour',
  'ल': 'लड्डू|laddoo|laddoo sweet;लाल|laal|red;लिफ़ाफ़ा|lifaafa|envelope;लीची|leechi|lychee;लुहार|luhaar|blacksmith;लूडो|ludo|ludo game;लेखक|lekhak|writer;;लोमड़ी|lomdi|fox;लौकी|lauki|bottle gourd;लंगूर|langoor|langur monkey',
  'व': 'वन|van|forest;वायु|vaayu|air;विमान|vimaan|aeroplane;वीणा|veena|veena;;;वेद|ved|the Vedas;वैद्य|vaidya|traditional doctor;वोट|vot|vote;;वंश|vansh|family line',
  'श': 'शहर|shahar|city;शाम|shaam|evening;शिक्षक|shikshak|teacher;शीशा|sheesha|mirror;शुक्रवार|shukravaar|Friday;शून्य|shoonya|zero;शेर|sher|lion;शैतान|shaitaan|naughty one;शोर|shor|noise;शौक|shauk|hobby;शंख|shankh|conch',
  'ष': 'षट्कोण|shatkon|hexagon;भाषा|bhaasha|language;ऋषि|rishi|sage;;;;;;षोडश|shodash|sixteen;;',
  'स': 'सड़क|sadak|road;सारस|saaras|sarus crane;सितारा|sitaara|star;सीढ़ी|seedhi|ladder;सुई|sui|needle;सूरज|sooraj|sun;सेब|seb|apple;सैनिक|sainik|soldier;सोना|sona|gold;सौ|sau|hundred;संतरा|santra|orange',
  'ह': 'हवा|hawa|wind;हाथी|haathi|elephant;हिरन|hiran|deer;हीरा|heera|diamond;हुनर|hunar|skill;;हेमंत|hemant|early-winter season;;होली|Holi|Holi;हौसला|hausla|courage;हंस|hans|swan',
  'क्ष': 'क्षमा|kshama|forgiveness;;क्षितिज|kshitij|horizon;क्षीर|ksheer|milk;क्षुधा|kshudha|hunger;;क्षेत्र|kshetra|area;;;;',
  'त्र': ';यात्रा|yaatra|journey;त्रिभुज|tribhuj|triangle;पुत्री|putri|daughter;शत्रु|shatru|enemy;;त्रेता|treta|Treta age;त्रैमासिक|traimaasik|quarterly;;;',
  'ज्ञ': 'यज्ञ|yagya|fire ritual;ज्ञान|gyaan|knowledge;;;;;;;;;',
};
// place of articulation, breath (alpa/maha prana), voiced?, group
const PH = {};
const set = (letters, place, aspir, voiced, grp) => letters.split(' ').forEach((l, i) => (PH[l] = { place, maha: aspir[i] === 'm', voiced: voiced[i] === 'v', grp, nasal: false }));
set('क ख ग घ', 'k', 'amam', '--vv', 'kavarg'); set('च छ ज झ', 't', 'amam', '--vv', 'chavarg'); set('ट ठ ड ढ ण', 'm', 'amama', '--vvv', 'tavarg'); set('त थ द ध न', 'd', 'amama', '--vvv', 'tavarg2'); set('प फ ब भ म', 'o', 'amama', '--vvv', 'pavarg');
['ण', 'न', 'म'].forEach((l) => (PH[l].nasal = true));
set('य', 't', 'a', 'v', 'antah'); set('र', 'm', 'a', 'v', 'antah'); set('ल', 'd', 'a', 'v', 'antah'); set('व', 'do', 'a', 'v', 'antah');
set('श', 't', 'm', '-', 'ushm'); set('ष', 'm', 'm', '-', 'ushm'); set('स', 'd', 'm', '-', 'ushm'); set('ह', 'k', 'm', 'v', 'ushm');
const JOIN = { 'क्ष': 'क् + ष', 'त्र': 'त् + र', 'ज्ञ': 'ज् + ञ' };
const MIX = { 'घ': ['ध'], 'ध': ['घ'], 'भ': ['म'], 'म': ['भ'], 'ब': ['व'], 'व': ['ब'], 'ख': ['र + व'], 'थ': ['य'], 'य': ['थ'], 'ड': ['ड़'], 'ढ': ['ढ़'], 'श': ['ष', 'स'], 'ष': ['श', 'स'], 'स': ['श', 'ष'], 'ण': ['न'], 'न': ['ण'], 'द': ['ढ'], 'ट': ['ठ'], 'ठ': ['ट'], 'च': ['ज'], 'प': ['ष'], 'ज्ञ': ['ग्य'] };

const PLACE = {
  hi: { k: 'गले (कंठ) से', t: 'तालु से — जीभ मुँह की छत के बीच में लगती है', m: 'मूर्धा से — जीभ ऊपर की ओर मुड़कर मुँह की छत को छूती है', d: 'दाँतों से — जीभ ऊपर के दाँतों के पीछे लगती है', o: 'होठों से — दोनों होंठ मिलते हैं', do: 'दाँत और होंठ से — नीचे का होंठ ऊपर के दाँतों को छूता है' },
  en: { k: 'from the throat', t: 'from the palate — the tongue touches the middle of the roof of the mouth', m: 'with the tongue curled back to touch the roof of the mouth (retroflex)', d: 'with the tongue behind the upper teeth (dental)', o: 'with both lips', do: 'with the lower lip touching the upper teeth' },
  hinglish: { k: 'gale (kanth) se', t: 'taalu se — jeebh munh ki chhat ke beech mein lagti hai', m: 'moordha se — jeebh upar mud kar munh ki chhat ko chhooti hai', d: 'daanton se — jeebh upar ke daanton ke peechhe lagti hai', o: 'hothon se — dono honth milte hain', do: 'daant aur honth se — neeche ka honth upar ke daanton ko chhoota hai' },
  bn: { k: 'গলা (কণ্ঠ) থেকে', t: 'তালু থেকে — জিভ মুখের ছাদের মাঝখানে লাগে', m: 'মূর্ধা থেকে — জিভ উল্টে মুখের ছাদ ছোঁয়', d: 'দাঁত থেকে — জিভ ওপরের দাঁতের পেছনে লাগে', o: 'ঠোঁট থেকে — দুই ঠোঁট মেলে', do: 'দাঁত আর ঠোঁট থেকে — নিচের ঠোঁট ওপরের দাঁত ছোঁয়' },
};
const GRP = {
  hi: { kavarg: 'कवर्ग (क ख ग घ ङ)', chavarg: 'चवर्ग (च छ ज झ ञ)', tavarg: 'टवर्ग (ट ठ ड ढ ण)', tavarg2: 'तवर्ग (त थ द ध न)', pavarg: 'पवर्ग (प फ ब भ म)', antah: 'अंतःस्थ (य र ल व)', ushm: 'ऊष्म (श ष स ह)' },
  en: { kavarg: 'the ka-group (क ख ग घ ङ)', chavarg: 'the cha-group (च छ ज झ ञ)', tavarg: 'the retroflex ṭa-group (ट ठ ड ढ ण)', tavarg2: 'the dental ta-group (त थ द ध न)', pavarg: 'the pa-group (प फ ब भ म)', antah: 'the semivowels (य र ल व)', ushm: 'the sibilants (श ष स ह)' },
  hinglish: { kavarg: 'kavarg (क ख ग घ ङ)', chavarg: 'chavarg (च छ ज झ ञ)', tavarg: 'tavarg (ट ठ ड ढ ण)', tavarg2: 'tavarg (त थ द ध न)', pavarg: 'pavarg (प फ ब भ म)', antahsth: '', antah: 'antahsth (य र ल व)', ushm: 'ushm (श ष स ह)' },
  bn: { kavarg: 'ক-বর্গ (क ख ग घ ङ)', chavarg: 'চ-বর্গ (च छ ज झ ञ)', tavarg: 'ট-বর্গ (ट ठ ड ढ ण)', tavarg2: 'ত-বর্গ (त थ द ध न)', pavarg: 'প-বর্গ (प फ ब भ म)', antah: 'অন্তঃস্থ (य र ल व)', ushm: 'উষ্ম (श ष स ह)' },
};
const BT = {
  hi: { wordsH: (c) => `${c} की बारहखड़ी के शब्द`, wordsP: 'हर रूप से एक आसान शब्द — बच्चे को शब्द बोलकर सुनाएँ और पूछें कि पहला अक्षर कौन-सा है।', inside: '(यह रूप शब्द के बीच में आता है)', form: 'रूप', word: 'शब्द', mean: 'मतलब',
    sayH: (c) => `${c} कैसे बोलें`, place: (c, p, g) => `${c} ${p} बोला जाता है। यह ${g} का अक्षर है।`, breath: (m, v) => `${m ? 'यह महाप्राण है — बोलते समय मुँह से ज़्यादा हवा निकलती है (हथेली मुँह के आगे रखकर महसूस करें)।' : 'यह अल्पप्राण है — बोलते समय मुँह से कम हवा निकलती है।'} ${v ? 'बोलते समय गले में हल्का कंपन होता है (घोष)।' : 'गले में कंपन नहीं होता (अघोष)।'}`, nasal: 'यह नाक से भी बोला जाता है (अनुनासिक)।', join: (c, j) => `${c} एक संयुक्त अक्षर है: ${j}। इसलिए इसकी बारहखड़ी में आधा अक्षर पहले आता है।`,
    mixH: 'इनसे गड़बड़ न करें', mix: (c, xs) => `बच्चे अक्सर ${c} को ${xs} समझ लेते हैं — दोनों को साथ लिखकर फ़र्क़ दिखाएँ।`, noStart: (c) => `ध्यान दें: हिंदी में ${c} से लगभग कोई शब्द शुरू नहीं होता; यह शब्द के बीच या आख़िर में आता है।`,
    gapH: 'खाली जगह भरो', gapP: 'कागज़ पर लिखकर बच्चे से छूटे हुए अक्षर भरवाएँ (जवाब नीचे है):', ans: 'जवाब' },
  en: { wordsH: (c) => `Words for every form of ${c}`, wordsP: 'One easy word for each form — say the word aloud and ask your child which letter it starts with.', inside: '(this form comes inside the word)', form: 'Form', word: 'Word', mean: 'Meaning',
    sayH: (c) => `How to say ${c}`, place: (c, p, g) => `${c} is said ${p}. It belongs to ${g}.`, breath: (m, v) => `${m ? 'It is aspirated — a strong puff of air comes out (hold your palm in front of your mouth to feel it).' : 'It is unaspirated — very little air comes out.'} ${v ? 'The throat vibrates a little (voiced).' : 'The throat does not vibrate (voiceless).'}`, nasal: 'It is also said through the nose (nasal).', join: (c, j) => `${c} is a joined letter: ${j}. That is why its barakhadi starts with a half letter.`,
    mixH: 'Letters children mix up', mix: (c, xs) => `Children often confuse ${c} with ${xs} — write them side by side and show the difference.`, noStart: (c) => `Note: almost no Hindi word starts with ${c}; it comes in the middle or at the end of a word.`,
    gapH: 'Fill in the gaps', gapP: 'Write these on paper and let your child fill the missing forms (answer below):', ans: 'Answer' },
  hinglish: { wordsH: (c) => `${c} ki barakhadi ke shabd`, wordsP: 'Har roop se ek aasaan shabd — bachche ko shabd bol kar sunao aur poochho ki pehla akshar kaun-sa hai.', inside: '(yeh roop shabd ke beech mein aata hai)', form: 'Roop', word: 'Shabd', mean: 'Matlab',
    sayH: (c) => `${c} kaise bolein`, place: (c, p, g) => `${c} ${p} bola jaata hai. Yeh ${g} ka akshar hai.`, breath: (m, v) => `${m ? 'Yeh mahapran hai — bolte waqt munh se zyada hawa nikalti hai (hatheli munh ke aage rakh kar mehsoos karo).' : 'Yeh alpapran hai — bolte waqt munh se kam hawa nikalti hai.'} ${v ? 'Bolte waqt gale mein halka kampan hota hai (ghosh).' : 'Gale mein kampan nahi hota (aghosh).'}`, nasal: 'Yeh naak se bhi bola jaata hai (anunasik).', join: (c, j) => `${c} ek sanyukt akshar hai: ${j}. Isliye iski barakhadi mein aadha akshar pehle aata hai.`,
    mixH: 'Inse gadbad na karein', mix: (c, xs) => `Bachche aksar ${c} ko ${xs} samajh lete hain — dono ko saath likh kar farq dikhao.`, noStart: (c) => `Dhyan dein: Hindi mein ${c} se lagbhag koi shabd shuru nahi hota; yeh shabd ke beech ya aakhir mein aata hai.`,
    gapH: 'Khaali jagah bharo', gapP: 'Kaagaz par likh kar bachche se chhoote hue akshar bharwao (jawab neeche hai):', ans: 'Jawab' },
  bn: { wordsH: (c) => `${c}-এর বারাখড়ির শব্দ`, wordsP: 'প্রতিটি রূপ থেকে একটা সহজ শব্দ — বাচ্চাকে শব্দটা বলে শোনান আর জিজ্ঞেস করুন প্রথম অক্ষর কোনটা।', inside: '(এই রূপ শব্দের মাঝে আসে)', form: 'রূপ', word: 'শব্দ', mean: 'মানে',
    sayH: (c) => `${c} কীভাবে বলবেন`, place: (c, p, g) => `${c} ${p} উচ্চারিত হয়। এটা ${g}-এর অক্ষর।`, breath: (m, v) => `${m ? 'এটা মহাপ্রাণ — বলার সময় মুখ থেকে বেশি হাওয়া বেরোয় (মুখের সামনে হাতের তালু রেখে টের পান)।' : 'এটা অল্পপ্রাণ — বলার সময় কম হাওয়া বেরোয়।'} ${v ? 'গলায় হালকা কাঁপুনি হয় (ঘোষ)।' : 'গলায় কাঁপুনি হয় না (অঘোষ)।'}`, nasal: 'এটা নাক দিয়েও উচ্চারিত হয় (অনুনাসিক)।', join: (c, j) => `${c} একটা যুক্তাক্ষর: ${j}। তাই এর বারাখড়িতে আধা অক্ষর আগে আসে।`,
    mixH: 'যেগুলোর সঙ্গে গুলিয়ে যায়', mix: (c, xs) => `বাচ্চারা প্রায়ই ${c}-কে ${xs} ভেবে ফেলে — পাশাপাশি লিখে তফাত দেখান।`, noStart: (c) => `খেয়াল করুন: হিন্দিতে ${c} দিয়ে প্রায় কোনো শব্দ শুরু হয় না; এটা শব্দের মাঝে বা শেষে আসে।`,
    gapH: 'শূন্যস্থান পূরণ করো', gapP: 'কাগজে লিখে বাচ্চাকে বাদ পড়া রূপগুলো ভরতে দিন (উত্তর নিচে):', ans: 'উত্তর' },
};
function barakhadi(c, code, esc) {
  const X = BT[code], words = (BW[c] || '').split(';');
  const hasMean = code !== 'hi';
  const rows = FORMS.map((m, i) => { const w = words[i]; if (!w) return ''; const [hw, ro, me] = w.split('|'); const syl = c + m; const inside = !hw.startsWith(syl);
    return `<tr><td style="font-size:1.4rem;font-weight:700">${esc(syl)}</td><td><b>${esc(hw)}</b>${code !== 'hi' ? ` <i>(${esc(ro)})</i>` : ''}${inside ? ` <small style="color:var(--muted)">${esc(X.inside)}</small>` : ''}</td>${hasMean ? `<td>${esc(me)}</td>` : ''}</tr>`; }).join('');
  const out = [];
  if (rows) out.push(`<h2>${esc(X.wordsH(c))}</h2><p>${esc(X.wordsP)}</p><div class="table-wrap"><table><tr><th>${esc(X.form)}</th><th>${esc(X.word)}</th>${hasMean ? `<th>${esc(X.mean)}</th>` : ''}</tr>${rows}</table></div>`);
  const ph = PH[c], say = [];
  if (JOIN[c]) say.push(X.join(c, JOIN[c]));
  else if (ph) { say.push(X.place(c, PLACE[code][ph.place], GRP[code][ph.grp])); say.push(X.breath(ph.maha, ph.voiced)); if (ph.nasal) say.push(X.nasal); }
  if (['ण', 'ष'].includes(c)) say.push(X.noStart(c));
  if (say.length) out.push(`<h2>${esc(X.sayH(c))}</h2><p>${esc(say.join(' '))}</p>`);
  if (MIX[c]) out.push(`<h3>${esc(X.mixH)}</h3><p>${esc(X.mix(c, MIX[c].join(', ')))}</p>`);
  // gap exercise: hide 3 forms, picked by the letter's position so each page differs
  const k = Object.keys(BW).indexOf(c), hide = [2 + (k % 3), 5 + (k % 2), 8 + (k % 3)];
  const all = FORMS.map((m) => c + m);
  out.push(`<h3>${esc(X.gapH)}</h3><p>${esc(X.gapP)}</p><p style="font-size:1.4rem;letter-spacing:.1em">${esc(all.map((s, i) => (hide.includes(i) ? '___' : s)).join('  '))}</p><details><summary>${esc(X.ans)}</summary><p style="font-size:1.3rem">${esc(hide.map((i) => all[i]).join(', '))}</p></details>`);
  return out.join('\n');
}

// ---- matra ----
const MT = {
  aa: { sign: 'ा', rule: { hi: 'आ की मात्रा (ा) अक्षर के ठीक बाद, दाईं ओर एक खड़ी लकीर की तरह लगती है: क + ा = का।', en: 'The aa matra (ा) is a standing line written right after the letter: क + ा = का.', hinglish: 'Aa ki matra (ा) akshar ke theek baad, daayin taraf ek khadi lakeer ki tarah lagti hai: क + ा = का.', bn: 'আ-কার (ा) অক্ষরের ঠিক পরে ডান দিকে একটা খাড়া দাগের মতো বসে: क + ा = का।' },
    words: 'आम|aam चाचा|chacha दादा|dada मामा|mama बाजा|baaja आकाश|aakaash पतंगबाज़|patangbaaz काजल|kaajal सागर|saagar तालाब|taalaab', mistake: { hi: '"मामा" को "ममा" लिखना — दोनों म पर आ की मात्रा है।', en: 'Writing "ममा" for "मामा" — both म have the aa matra.', hinglish: '"मामा" ko "ममा" likhna — dono म par aa ki matra hai.', bn: '"मामा"-কে "ममा" লেখা — দুটো म-তেই আ-কার আছে।' }, sents: 'राजा का बाजा।|मामा आया।|नाना का आम।' },
  i: { sign: 'ि', rule: { hi: 'छोटी इ की मात्रा (ि) अक्षर से पहले, बाईं ओर लिखी जाती है, पर बोली अक्षर के बाद जाती है: ि + क = कि।', en: 'The short i matra (ि) is written BEFORE the letter (on the left) but said after it: ि + क = कि.', hinglish: 'Chhoti i ki matra (ि) akshar se pehle, baayin taraf likhi jaati hai, par boli akshar ke baad jaati hai: ि + क = कि.', bn: 'ছোট ই-কার (ि) অক্ষরের আগে, বাঁ দিকে লেখা হয়, কিন্তু উচ্চারণ হয় অক্ষরের পরে: ि + क = कि।' },
    words: 'दिन|din किला|kila तिल|til मिर्च|mirch सिक्का|sikka खिड़की|khidki हिरन|hiran जिराफ़|jiraaf निबंध|nibandh चिट्ठी|chitthi', mistake: { hi: 'मात्रा को अक्षर के बाद लिखना (कि की जगह "क ि") — छोटी इ हमेशा पहले आती है।', en: 'Writing the matra after the letter — the short i always comes first on paper.', hinglish: 'Matra ko akshar ke baad likhna — chhoti i hamesha pehle aati hai.', bn: 'মাত্রা অক্ষরের পরে লেখা — ছোট ই সবসময় আগে বসে।' }, sents: 'किसान का खेत।|बिल्ली दिन में सोती है।|मिठाई मीठी है।' },
  ee: { sign: 'ी', rule: { hi: 'बड़ी ई की मात्रा (ी) अक्षर के बाद, दाईं ओर लगती है और लंबी बोली जाती है: क + ी = की।', en: 'The long ee matra (ी) comes after the letter, on the right, and is said long: क + ी = की.', hinglish: 'Badi ee ki matra (ी) akshar ke baad, daayin taraf lagti hai aur lambi boli jaati hai: क + ी = की.', bn: 'বড় ঈ-কার (ी) অক্ষরের পরে, ডান দিকে বসে আর লম্বা উচ্চারণ হয়: क + ी = की।' },
    words: 'नदी|nadi दीदी|didi पानी|paani रानी|raani चीता|cheeta सीटी|seeti मीनार|meenaar ककड़ी|kakdi टोपी|topi गाड़ी|gaadi', mistake: { hi: 'छोटी इ और बड़ी ई में गड़बड़ — "दीदी" में दोनों बार बड़ी ई है, "दिन" में छोटी इ।', en: 'Mixing short i and long ee — "दीदी" has the long ee twice, "दिन" the short i.', hinglish: 'Chhoti i aur badi ee mein gadbad — "दीदी" mein dono baar badi ee hai, "दिन" mein chhoti i.', bn: 'ছোট ই আর বড় ঈ গুলিয়ে ফেলা — "दीदी"-তে দুবারই বড় ঈ, "दिन"-এ ছোট ই।' }, sents: 'दीदी की टोपी नीली है।|नदी में पानी है।|रानी की गाड़ी।' },
  u: { sign: 'ु', rule: { hi: 'छोटे उ की मात्रा (ु) अक्षर के नीचे लगती है: क + ु = कु। र के साथ यह बगल में लगती है: रु।', en: 'The short u matra (ु) goes under the letter: क + ु = कु. With र it sits at the side: रु.', hinglish: 'Chhote u ki matra (ु) akshar ke neeche lagti hai: क + ु = कु. र ke saath yeh bagal mein lagti hai: रु.', bn: 'ছোট উ-কার (ु) অক্ষরের নিচে বসে: क + ु = कु। र-এর সঙ্গে পাশে বসে: रु।' },
    words: 'गुड़|gud पुल|pul मुकुट|mukut कुर्ता|kurta बुलबुल|bulbul तुलसी|tulsi सुबह|subah दुकान|dukaan चुटकी|chutki रुपया|rupaya', mistake: { hi: '"रु" को "र" के नीचे लिखना — र के साथ उ की मात्रा बगल में (रु) लगती है।', en: 'Writing the u matra under र — with र it goes at the side (रु).', hinglish: '"रु" ko र ke neeche likhna — र ke saath u ki matra bagal mein (रु) lagti hai.', bn: 'র-এর নিচে উ-কার লেখা — र-এর সঙ্গে পাশে বসে (रु)।' }, sents: 'मुकुल पुल पर है।|गुलाब सुंदर है।|सुबह दुकान खुली।' },
  oo: { sign: 'ू', rule: { hi: 'बड़े ऊ की मात्रा (ू) भी अक्षर के नीचे लगती है, पर लंबी बोली जाती है: क + ू = कू। र के साथ: रू।', en: 'The long oo matra (ू) also goes under the letter but is said long: क + ू = कू. With र: रू.', hinglish: 'Bade oo ki matra (ू) bhi akshar ke neeche lagti hai, par lambi boli jaati hai: क + ू = कू. र ke saath: रू.', bn: 'বড় ঊ-কার (ू)-ও অক্ষরের নিচে বসে, কিন্তু লম্বা উচ্চারণ: क + ू = कू। र-এর সঙ্গে: रू।' },
    words: 'झूला|jhoola दूध|doodh सूरज|sooraj जूता|joota मूली|mooli कबूतर|kabootar खरबूजा|kharbooja धूप|dhoop भूख|bhookh पूजा|pooja', mistake: { hi: 'छोटे उ और बड़े ऊ की मात्रा उलटी लगाना — "दूध" में बड़ा ऊ, "दुकान" में छोटा उ।', en: 'Swapping the short u and long oo signs — "दूध" has the long oo, "दुकान" the short u.', hinglish: 'Chhote u aur bade oo ki matra ulti lagana — "दूध" mein bada oo, "दुकान" mein chhota u.', bn: 'ছোট উ আর বড় ঊ উল্টে ফেলা — "दूध"-এ বড় ঊ, "दुकान"-এ ছোট উ।' }, sents: 'झूला झूलो।|सूरज की धूप।|भालू को भूख लगी।' },
  e: { sign: 'े', rule: { hi: 'ए की मात्रा (े) अक्षर के ऊपर एक तिरछी लकीर होती है: क + े = के।', en: 'The e matra (े) is one slanting stroke on top of the letter: क + े = के.', hinglish: 'E ki matra (े) akshar ke upar ek tirchhi lakeer hoti hai: क + े = के.', bn: 'এ-কার (े) অক্ষরের মাথায় একটা বাঁকা দাগ: क + े = के।' },
    words: 'मेज़|mez खेल|khel बेटा|beta देश|desh रेत|ret पेन|pen सेना|sena टेलीफ़ोन|telifon तेल|tel भेड़|bhed', mistake: { hi: 'ए (े) और ऐ (ै) में गड़बड़ — ए में ऊपर एक लकीर, ऐ में दो।', en: 'Mixing e (े) and ai (ै) — e has one stroke on top, ai has two.', hinglish: 'E (े) aur ai (ै) mein gadbad — e mein upar ek lakeer, ai mein do.', bn: 'এ (े) আর ঐ (ै) গুলিয়ে ফেলা — এ-তে মাথায় একটা দাগ, ঐ-তে দুটো।' }, sents: 'बेटा खेल रहा है।|मेज़ पर पेन है।|रेल तेज़ चली।' },
  ai: { sign: 'ै', rule: { hi: 'ऐ की मात्रा (ै) अक्षर के ऊपर दो तिरछी लकीरें होती हैं: क + ै = कै।', en: 'The ai matra (ै) is two slanting strokes on top of the letter: क + ै = कै.', hinglish: 'Ai ki matra (ै) akshar ke upar do tirchhi lakeerein hoti hain: क + ै = कै.', bn: 'ঐ-কার (ै) অক্ষরের মাথায় দুটো বাঁকা দাগ: क + ै = कै।' },
    words: 'मैदान|maidaan भैया|bhaiya थैली|thaili सैनिक|sainik कैमरा|kaimara तैराक|tairaak गैस|gais नैना|naina जैसा|jaisa बैग|baig', mistake: { hi: '"है" की जगह "हे" लिखना — "है" में ऐ की मात्रा (दो लकीरें) है।', en: 'Writing "हे" instead of "है" — "है" (is) has the ai matra (two strokes).', hinglish: '"है" ki jagah "हे" likhna — "है" mein ai ki matra (do lakeerein) hai.', bn: '"है"-এর জায়গায় "हे" লেখা — "है"-তে ঐ-কার (দুটো দাগ)।' }, sents: 'भैया मैदान में है।|बैल खेत में है।|पैसा थैली में है।' },
  o: { sign: 'ो', rule: { hi: 'ओ की मात्रा (ो) में आ की खड़ी लकीर के ऊपर एक तिरछी लकीर होती है: क + ो = को।', en: 'The o matra (ो) is the aa line with one slanting stroke on top: क + ो = को.', hinglish: 'O ki matra (ो) mein aa ki khadi lakeer ke upar ek tirchhi lakeer hoti hai: क + ो = को.', bn: 'ও-কার (ो)-এ আ-কারের খাড়া দাগের মাথায় একটা বাঁকা দাগ: क + ो = को।' },
    words: 'मोती|moti सोना|sona गोल|gol चोटी|choti लोटा|lota बोतल|botal कोयल|koyal पोखर|pokhar धोती|dhoti रोटी|roti', mistake: { hi: 'ओ (ो) और औ (ौ) में गड़बड़ — ओ में ऊपर एक लकीर, औ में दो।', en: 'Mixing o (ो) and au (ौ) — o has one stroke on top, au has two.', hinglish: 'O (ो) aur au (ौ) mein gadbad — o mein upar ek lakeer, au mein do.', bn: 'ও (ो) আর ঔ (ौ) গুলিয়ে ফেলা — ও-তে মাথায় একটা দাগ, ঔ-তে দুটো।' }, sents: 'मोर नाचो।|रोटी गोल है।|कोयल बोली।' },
  au: { sign: 'ौ', rule: { hi: 'औ की मात्रा (ौ) में आ की खड़ी लकीर के ऊपर दो तिरछी लकीरें होती हैं: क + ौ = कौ।', en: 'The au matra (ौ) is the aa line with two slanting strokes on top: क + ौ = कौ.', hinglish: 'Au ki matra (ौ) mein aa ki khadi lakeer ke upar do tirchhi lakeerein hoti hain: क + ौ = कौ.', bn: 'ঔ-কার (ौ)-এ আ-কারের খাড়া দাগের মাথায় দুটো বাঁকা দাগ: क + ौ = कौ।' },
    words: 'पौधा|paudha चौकी|chauki दौड़|daud तौलिया|tauliya सौ|sau नौ|nau मौसी|mausi कौन|kaun औरत|aurat हौसला|hausla', mistake: { hi: '"नौ" (9) और "नो" — गिनती में हमेशा "नौ" लिखें।', en: '"नौ" (nine) written as "नो" — the number is always नौ with the au matra.', hinglish: '"नौ" (9) ko "नो" likhna — ginti mein hamesha "नौ" likhein.', bn: '"नौ" (৯) কে "नो" লেখা — সংখ্যাটা সবসময় नौ।' }, sents: 'मौसी आई।|सौ पौधे लगाओ।|कौआ बोला।' },
  anusvar: { sign: 'ं', rule: { hi: 'अनुस्वार (ं) अक्षर के ऊपर एक बिंदी है; यह नाक से बोली जाने वाली "न/म" जैसी आवाज़ देता है: क + ं = कं।', en: 'The anusvar (ं) is a dot on top of the letter; it adds a nasal "n/m" sound: क + ं = कं.', hinglish: 'Anusvar (ं) akshar ke upar ek bindi hai; yeh naak se boli jaane wali "n/m" jaisi awaaz deta hai: क + ं = कं.', bn: 'অনুস্বার (ं) অক্ষরের মাথায় একটা বিন্দু; নাক দিয়ে "ন/ম"-এর মতো আওয়াজ দেয়: क + ं = कं।' },
    words: 'अंगूर|angoor पंखा|pankha बंदर|bandar गंगा|ganga संतरा|santra डंडा|danda मंदिर|mandir पतंग|patang अंडा|anda रंग|rang', mistake: { hi: 'अनुस्वार (ं, सिर्फ़ बिंदी) और चंद्रबिंदु (ँ, चाँद + बिंदी) में गड़बड़ — "चाँद" में चंद्रबिंदु है, "पंखा" में अनुस्वार।', en: 'Mixing the anusvar (ं, a dot) with the chandrabindu (ँ, moon + dot) — "चाँद" has the chandrabindu, "पंखा" the anusvar.', hinglish: 'Anusvar (ं, sirf bindi) aur chandrabindu (ँ, chaand + bindi) mein gadbad — "चाँद" mein chandrabindu, "पंखा" mein anusvar.', bn: 'অনুস্বার (ং-এর মতো বিন্দু) আর চন্দ্রবিন্দু (ँ) গুলিয়ে ফেলা — "चाँद"-এ চন্দ্রবিন্দু, "पंखा"-তে অনুস্বার।' }, sents: 'बंदर अंगूर खाता है।|पंखा चला।|मंदिर में घंटा है।' },
};
const MTU = {
  hi: ['लिखने का नियम', 'और शब्द', 'आम ग़लती', 'पढ़कर देखो'], en: ['The writing rule', 'More words', 'A common mistake', 'Read these'],
  hinglish: ['Likhne ka niyam', 'Aur shabd', 'Aam galti', 'Padh kar dekho'], bn: ['লেখার নিয়ম', 'আরও শব্দ', 'সাধারণ ভুল', 'পড়ে দেখো'],
};
function matra(slug, code, esc) {
  const M = MT[slug]; if (!M) return '';
  const U = MTU[code], w = M.words.split(' ').map((x) => x.split('|'));
  return `<h2>${esc(U[0])} (${esc(M.sign)})</h2><p>${esc(M.rule[code])}</p>
<h3>${esc(U[1])}</h3><p class="chips">${w.map(([h, r]) => `<span class="tag">${esc(h)}${code !== 'hi' ? ` <i>(${esc(r)})</i>` : ''}</span>`).join(' ')}</p>
<h3>${esc(U[2])}</h3><p>${esc(M.mistake[code])}</p>
<h3>${esc(U[3])}</h3><ul>${M.sents.split('|').map((s) => `<li style="font-size:1.2rem">${esc(s)}</li>`).join('')}</ul>`;
}

// ---- pahade ----
const PT = {
  hi: { trickH: (n) => `${n} का पहाड़ा याद करने की ट्रिक`, moreH: (n) => `${n} का पहाड़ा 11 से 20 तक`, prH: 'अभ्यास के सवाल', prP: 'कागज़ पर हल करें, फिर जवाब देखें:', ans: 'जवाब', divH: 'भाग के सवाल (उल्टा पहाड़ा)', div: (a, n, q) => `${a} ÷ ${n} = ${q}` },
  en: { trickH: (n) => `A trick to remember the ${n} times table`, moreH: (n) => `${n} times table from 11 to 20`, prH: 'Practice questions', prP: 'Solve on paper, then check the answers:', ans: 'Answers', divH: 'Division facts (the table backwards)', div: (a, n, q) => `${a} ÷ ${n} = ${q}` },
  hinglish: { trickH: (n) => `${n} ka pahada yaad karne ki trick`, moreH: (n) => `${n} ka pahada 11 se 20 tak`, prH: 'Abhyaas ke sawaal', prP: 'Kaagaz par hal karo, phir jawab dekho:', ans: 'Jawab', divH: 'Bhaag ke sawaal (ulta pahada)', div: (a, n, q) => `${a} ÷ ${n} = ${q}` },
  bn: { trickH: (n) => `${n}-এর নামতা মনে রাখার কৌশল`, moreH: (n) => `${n}-এর নামতা ১১ থেকে ২০`, prH: 'অনুশীলনের প্রশ্ন', prP: 'কাগজে কষে তারপর উত্তর মেলাও:', ans: 'উত্তর', divH: 'ভাগের অঙ্ক (উল্টো নামতা)', div: (a, n, q) => `${a} ÷ ${n} = ${q}` },
};
const TRICK = {
  2: { hi: '2 का पहाड़ा = किसी संख्या को दो बार जोड़ना (7 + 7 = 14)। जवाब हमेशा सम (0, 2, 4, 6, 8 पर ख़त्म) होता है।', en: 'Two times a number is the number added to itself (7 + 7 = 14). The answer is always even — it ends in 0, 2, 4, 6 or 8.', hinglish: '2 ka pahada = kisi sankhya ko do baar jodna (7 + 7 = 14). Jawab hamesha sam (0, 2, 4, 6, 8 par khatam) hota hai.', bn: '২-এর নামতা মানে সংখ্যাকে নিজের সঙ্গে যোগ (৭ + ৭ = ১৪)। উত্তর সবসময় জোড় — শেষে ০, ২, ৪, ৬ বা ৮।' },
  3: { hi: 'जवाब के अंकों का जोड़ हमेशा 3, 6 या 9 आता है (3×7 = 21 → 2+1 = 3)। इससे अपना जवाब जाँच सकते हैं।', en: 'The digits of every answer add up to 3, 6 or 9 (3×7 = 21 → 2+1 = 3) — a quick way to check.', hinglish: 'Jawab ke ankon ka jod hamesha 3, 6 ya 9 aata hai (3×7 = 21 → 2+1 = 3). Isse apna jawab jaanch sakte ho.', bn: 'উত্তরের অঙ্কগুলো যোগ করলে সবসময় ৩, ৬ বা ৯ হয় (৩×৭ = ২১ → ২+১ = ৩) — মিলিয়ে দেখার সহজ উপায়।' },
  4: { hi: '4 का पहाड़ा = 2 के पहाड़े का दोगुना। 4×7 → 2×7 = 14 → 14 का दोगुना 28।', en: 'Four times = double, then double again. 4×7 → 7 doubled is 14 → 14 doubled is 28.', hinglish: '4 ka pahada = 2 ke pahade ka doguna. 4×7 → 2×7 = 14 → 14 ka doguna 28.', bn: '৪-এর নামতা = দুবার দ্বিগুণ। ৪×৭ → ৭-এর দ্বিগুণ ১৪ → ১৪-র দ্বিগুণ ২৮।' },
  5: { hi: 'जवाब हमेशा 0 या 5 पर ख़त्म होता है। सम संख्या × 5 = आधा करके पीछे 0 लगाएँ (8×5 → 4 → 40)।', en: 'Answers always end in 0 or 5. Even number × 5: halve it and add a 0 (8×5 → 4 → 40).', hinglish: 'Jawab hamesha 0 ya 5 par khatam hota hai. Sam sankhya × 5 = aadha karke peechhe 0 lagao (8×5 → 4 → 40).', bn: 'উত্তর সবসময় ০ বা ৫-এ শেষ। জোড় সংখ্যা × ৫ = অর্ধেক করে পেছনে ০ (৮×৫ → ৪ → ৪০)।' },
  6: { hi: 'सम संख्या × 6 का जवाब उसी संख्या पर ख़त्म होता है: 6×4 = 24, 6×6 = 36, 6×8 = 48।', en: 'An even number times 6 ends in that same number: 6×4 = 24, 6×6 = 36, 6×8 = 48.', hinglish: 'Sam sankhya × 6 ka jawab usi sankhya par khatam hota hai: 6×4 = 24, 6×6 = 36, 6×8 = 48.', bn: 'জোড় সংখ্যা × ৬-এর উত্তর সেই সংখ্যাতেই শেষ: ৬×৪ = ২৪, ৬×৬ = ৩৬, ৬×৮ = ৪৮।' },
  7: { hi: '7 का पहाड़ा = 5 का पहाड़ा + 2 का पहाड़ा। 7×8 → 5×8 = 40, 2×8 = 16 → 40 + 16 = 56।', en: '7 times = 5 times + 2 times. 7×8 → 5×8 = 40 and 2×8 = 16 → 56.', hinglish: '7 ka pahada = 5 ka pahada + 2 ka pahada. 7×8 → 5×8 = 40, 2×8 = 16 → 40 + 16 = 56.', bn: '৭-এর নামতা = ৫-এর নামতা + ২-এর নামতা। ৭×৮ → ৫×৮ = ৪০, ২×৮ = ১৬ → ৫৬।' },
  8: { hi: '8 = तीन बार दोगुना: 8×6 → 12 → 24 → 48। इकाई के अंक 8, 6, 4, 2, 0 बार-बार आते हैं।', en: '8 times = double three times: 8×6 → 12 → 24 → 48. The last digits repeat 8, 6, 4, 2, 0.', hinglish: '8 = teen baar doguna: 8×6 → 12 → 24 → 48. Ikai ke ank 8, 6, 4, 2, 0 baar-baar aate hain.', bn: '৮ = তিনবার দ্বিগুণ: ৮×৬ → ১২ → ২৪ → ৪৮। শেষ অঙ্ক ৮, ৬, ৪, ২, ০ ঘুরে ঘুরে আসে।' },
  9: { hi: 'दहाई का अंक 1 बढ़ता है, इकाई का 1 घटता है: 09, 18, 27, 36… और दोनों अंकों का जोड़ हमेशा 9। उँगलियों वाली ट्रिक: 9×4 के लिए चौथी उँगली मोड़ें — बाईं ओर 3, दाईं ओर 6 = 36।', en: 'The tens digit goes up by 1 and the units digit down by 1: 09, 18, 27, 36… and the digits always add up to 9. Finger trick: for 9×4 fold the 4th finger — 3 fingers on the left, 6 on the right = 36.', hinglish: 'Dahai ka ank 1 badhta hai, ikai ka 1 ghatta hai: 09, 18, 27, 36… aur dono ankon ka jod hamesha 9. Ungli wali trick: 9×4 ke liye chauthi ungli modo — baayin taraf 3, daayin taraf 6 = 36.', bn: 'দশকের অঙ্ক ১ বাড়ে, এককের ১ কমে: ০৯, ১৮, ২৭, ৩৬… আর দুই অঙ্কের যোগফল সবসময় ৯। আঙুলের কৌশল: ৯×৪-এর জন্য চতুর্থ আঙুল ভাঁজ করুন — বাঁয়ে ৩, ডানে ৬ = ৩৬।' },
  10: { hi: 'किसी भी संख्या के पीछे 0 लगा दें: 10×7 = 70।', en: 'Just put a 0 after the number: 10×7 = 70.', hinglish: 'Kisi bhi sankhya ke peechhe 0 laga do: 10×7 = 70.', bn: 'সংখ্যার পেছনে একটা ০ বসান: ১০×৭ = ৭০।' },
  11: { hi: '1 से 9 तक अंक को दो बार लिख दें: 11×7 = 77। दो अंकों की संख्या के लिए दोनों अंकों का जोड़ बीच में रखें: 11×13 → 1 (1+3) 3 = 143।', en: 'Up to 9, write the digit twice: 11×7 = 77. For two-digit numbers put the sum of the digits in the middle: 11×13 → 1 (1+3) 3 = 143.', hinglish: '1 se 9 tak ank ko do baar likh do: 11×7 = 77. Do ankon ki sankhya ke liye dono ankon ka jod beech mein rakho: 11×13 → 1 (1+3) 3 = 143.', bn: '১ থেকে ৯ পর্যন্ত অঙ্কটা দুবার লিখুন: ১১×৭ = ৭৭। দুই অঙ্কের সংখ্যায় অঙ্ক দুটোর যোগফল মাঝে বসান: ১১×১৩ → ১ (১+৩) ৩ = ১৪৩।' },
  12: { hi: '12 = 10 + 2। 12×7 → 70 + 14 = 84।', en: '12 = 10 + 2. 12×7 → 70 + 14 = 84.', hinglish: '12 = 10 + 2. 12×7 → 70 + 14 = 84.', bn: '১২ = ১০ + ২। ১২×৭ → ৭০ + ১৪ = ৮৪।' },
  15: { hi: '15 = 10 + 5 (10 का आधा)। 15×6 → 60 + 30 = 90।', en: '15 = 10 + half of 10. 15×6 → 60 + 30 = 90.', hinglish: '15 = 10 + 5 (10 ka aadha). 15×6 → 60 + 30 = 90.', bn: '১৫ = ১০ + ৫ (১০-এর অর্ধেক)। ১৫×৬ → ৬০ + ৩০ = ৯০।' },
  19: { hi: '19 = 20 − 1। 19×7 → 140 − 7 = 133।', en: '19 = 20 − 1. 19×7 → 140 − 7 = 133.', hinglish: '19 = 20 − 1. 19×7 → 140 − 7 = 133.', bn: '১৯ = ২০ − ১। ১৯×৭ → ১৪০ − ৭ = ১৩৩।' },
  20: { hi: '2 का पहाड़ा लिखकर पीछे 0 लगा दें: 20×7 = 140।', en: 'Do the 2 times table and add a 0: 20×7 = 140.', hinglish: '2 ka pahada likh kar peechhe 0 laga do: 20×7 = 140.', bn: '২-এর নামতা করে পেছনে ০ বসান: ২০×৭ = ১৪০।' },
};
const genTrick = (n) => ({
  hi: `${n} = 10 + ${n - 10}। पहले 10 से गुणा करें, फिर ${n - 10} से, और दोनों जोड़ दें: ${n}×7 → 70 + ${(n - 10) * 7} = ${n * 7}।`,
  en: `${n} = 10 + ${n - 10}. Multiply by 10, then by ${n - 10}, and add: ${n}×7 → 70 + ${(n - 10) * 7} = ${n * 7}.`,
  hinglish: `${n} = 10 + ${n - 10}. Pehle 10 se guna karo, phir ${n - 10} se, aur dono jod do: ${n}×7 → 70 + ${(n - 10) * 7} = ${n * 7}.`,
  bn: `${n} = ১০ + ${n - 10}। আগে ১০ দিয়ে গুণ, তারপর ${n - 10} দিয়ে, দুটো যোগ: ${n}×৭ → ৭০ + ${(n - 10) * 7} = ${n * 7}।`,
});
const bnD = (s) => String(s).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
function pahade(n, code, esc) {
  const X = PT[code], D = (v) => (code === 'bn' ? bnD(v) : String(v));
  const tr = (TRICK[n] || (n > 10 ? genTrick(n) : null));
  const out = [];
  if (tr) out.push(`<h2>${esc(X.trickH(D(n)))}</h2><p>${esc(code === 'bn' ? bnD(tr[code]) : tr[code])}</p>`);
  out.push(`<h3>${esc(X.moreH(D(n)))}</h3><p class="chips">${Array.from({ length: 10 }, (_, i) => `<span class="tag">${D(n)} × ${D(i + 11)} = ${D(n * (i + 11))}</span>`).join(' ')}</p>`);
  // practice: 6 questions picked by n so each page differs
  const ord = [3, 7, 4, 9, 6, 8, 2, 5, 10], qs = Array.from({ length: 6 }, (_, i) => ord[(i + n) % 9]);
  out.push(`<h3>${esc(X.prH)}</h3><p>${esc(X.prP)}</p><p style="font-size:1.25rem">${qs.map((k) => `${D(n)} × ${D(k)} = ___`).join(' &nbsp; ')}</p><details><summary>${esc(X.ans)}</summary><p>${qs.map((k) => `${D(n)} × ${D(k)} = ${D(n * k)}`).join(' · ')}</p></details>`);
  out.push(`<h3>${esc(X.divH)}</h3><p>${[2, 5, 7, 10].map((k) => esc(X.div(D(n * k), D(n), D(k)))).join(' · ')}</p>`);
  return out.join('\n');
}

export function kidsChildExtra(key, code, esc) {
  const [set, ...rest] = key.split('-'), slug = rest.join('-');
  if (set === 'barakhadi') { const c = Object.keys(BW).find((x) => ({ 'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na-murdhanya', 'त': 'ta-dantya', 'थ': 'tha-dantya', 'द': 'da-dantya', 'ध': 'dha-dantya', 'न': 'na', 'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma', 'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha-murdhanya', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya' })[x] === slug); return c ? barakhadi(c, code, esc) : ''; }
  if (set === 'matra') return matra(slug, code, esc);
  if (set === 'pahade' && /^\d+$/.test(slug)) return pahade(+slug, code, esc);
  return '';
}
