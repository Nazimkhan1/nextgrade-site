/**
 * Hindi + English wish pairs by group, for wish and festival pages (26 Nov 2026: Bing AI cited /en/wishes/birthday/
 * 8 times and Google showed it at position ~9 — so the same format for other wish pages). Our own text.
 * PAIRS[slug] = [[key, {hi,en,hinglish,bn} heading, [[hindi, english], ...]], ...]
 */
import { GROUPS as BIRTHDAY } from './birthday-pairs.mjs';
import { PAIRS2 } from './wish-pairs2.mjs';

const H = (hi, en, hinglish, bn) => ({ hi, en, hinglish, bn });
export const PAIRS = {
  birthday: BIRTHDAY,
  christmas: [
    ['family', H('👨‍👩‍👧 परिवार के लिए', '👨‍👩‍👧 For family', '👨‍👩‍👧 Parivaar ke liye', '👨‍👩‍👧 পরিবারের জন্য'), [
      ['मेरी क्रिसमस! हमारा घर हमेशा प्यार, हँसी और रोशनी से भरा रहे।', 'Merry Christmas! May our home always be full of love, laughter and light.'],
      ['इस क्रिसमस पर सबसे बड़ा तोहफ़ा आप सबका साथ है।', 'This Christmas, the greatest gift is having all of you together.'],
      ['सांता आपके लिए ढेर सारी ख़ुशियाँ और अच्छी सेहत लेकर आए।', 'May Santa bring you lots of happiness and good health.'],
      ['केक, कैरल और अपनों का साथ — क्रिसमस की ढेरों शुभकामनाएँ!', 'Cake, carols and loved ones — warm Christmas wishes!'],
      ['ईश्वर हमारे परिवार पर अपना आशीर्वाद बनाए रखे। मेरी क्रिसमस!', 'May God keep blessing our family. Merry Christmas!'],
    ]],
    ['friends', H('🤝 दोस्तों के लिए', '🤝 For friends', '🤝 Doston ke liye', '🤝 বন্ধুদের জন্য'), [
      ['मेरी क्रिसमस दोस्त! तेरी ज़िंदगी में क्रिसमस ट्री जितनी रोशनी हो।', 'Merry Christmas, buddy! May your life shine as bright as a Christmas tree.'],
      ['तू मेरी लिस्ट का सबसे अच्छा तोहफ़ा है — हैप्पी क्रिसमस!', 'You are the best gift on my list — happy Christmas!'],
      ['इस साल की सारी परेशानियाँ बर्फ़ की तरह पिघल जाएँ। मेरी क्रिसमस!', 'May all of this year’s worries melt like snow. Merry Christmas!'],
      ['पार्टी, केक और मस्ती — मेरी क्रिसमस, यार!', 'Party, cake and fun — Merry Christmas, friend!'],
      ['दूर हैं पर दिल से पास — क्रिसमस की शुभकामनाएँ!', 'Far away but close at heart — Christmas wishes!'],
    ]],
    ['office', H('💼 ऑफ़िस/सहकर्मियों के लिए', '💼 For colleagues and clients', '💼 Office/colleagues ke liye', '💼 অফিস/সহকর্মীদের জন্য'), [
      ['आपको और आपके परिवार को क्रिसमस और नए साल की हार्दिक शुभकामनाएँ।', 'Warm Christmas and New Year wishes to you and your family.'],
      ['इस साल साथ काम करके अच्छा लगा — मेरी क्रिसमस!', 'It was a pleasure working with you this year — Merry Christmas!'],
      ['आपका त्योहार शांति और सफलता से भरा हो।', 'May your holidays be filled with peace and success.'],
      ['टीम की ओर से आपको मेरी क्रिसमस और हैप्पी हॉलिडेज़!', 'Merry Christmas and happy holidays from the whole team!'],
    ]],
    ['love', H('❤️ पति/पत्नी, प्यार के लिए', '❤️ For your partner', '❤️ Pati/patni, pyaar ke liye', '❤️ ভালোবাসার মানুষের জন্য'), [
      ['तुम्हारे साथ हर दिन क्रिसमस है। मेरी क्रिसमस, मेरी जान!', 'Every day with you is Christmas. Merry Christmas, my love!'],
      ['मेरी विश लिस्ट में बस तुम हो — और तुम मिल गए।', 'You are the only thing on my wish list — and I have you.'],
      ['सर्दी की यह रात तुम्हारे साथ और भी गर्म है। हैप्पी क्रिसमस!', 'This winter night is warmer with you. Happy Christmas!'],
    ]],
    ['blessing', H('🙏 आशीर्वाद और प्रार्थना', '🙏 Blessings and prayers', '🙏 Aashirvaad aur prarthana', '🙏 আশীর্বাদ আর প্রার্থনা'), [
      ['प्रभु यीशु का प्रेम और शांति आपके दिल में बसे। मेरी क्रिसमस!', 'May the love and peace of Jesus fill your heart. Merry Christmas!'],
      ['यह क्रिसमस आपकी ज़िंदगी में नई उम्मीद और रोशनी लाए।', 'May this Christmas bring new hope and light into your life.'],
      ['जैसे तारे ने रास्ता दिखाया, वैसे ही आपको भी सही राह मिले।', 'As the star showed the way, may you too find the right path.'],
      ['दया, क्षमा और प्यार — क्रिसमस का यही संदेश है। शुभ क्रिसमस!', 'Kindness, forgiveness and love — that is the Christmas message. Merry Christmas!'],
    ]],
    ['short', H('✨ छोटी शुभकामनाएँ (स्टेटस)', '✨ Short wishes (status)', '✨ Chhoti wishes (status)', '✨ ছোট শুভেচ্ছা (স্ট্যাটাস)'), [
      ['मेरी क्रिसमस! 🎄', 'Merry Christmas! 🎄'], ['हो हो हो! 🎅', 'Ho ho ho! 🎅'], ['ख़ुशियों भरा क्रिसमस! ⭐', 'Have a joyful Christmas! ⭐'], ['शांति, प्यार और केक! 🍰', 'Peace, love and cake! 🍰'], ['मेरी क्रिसमस और हैप्पी न्यू ईयर! 🎁', 'Merry Christmas and a Happy New Year! 🎁'],
    ]],
  ],
  'new-year': [
    ['family', H('👨‍👩‍👧 परिवार के लिए', '👨‍👩‍👧 For family', '👨‍👩‍👧 Parivaar ke liye', '👨‍👩‍👧 পরিবারের জন্য'), [
      ['नया साल 2027 आपके लिए सेहत, सुकून और ख़ुशियाँ लेकर आए।', 'May 2027 bring you health, peace and happiness.'],
      ['पिछले साल के लिए शुक्रिया, नए साल के लिए ढेर सारा प्यार। हैप्पी न्यू ईयर!', 'Thank you for last year, lots of love for the new one. Happy New Year!'],
      ['हमारा परिवार यूँ ही साथ रहे — नए साल की हार्दिक शुभकामनाएँ।', 'May our family always stay together — heartfelt New Year wishes.'],
      ['माँ-पापा, आपका आशीर्वाद ही हमारा सबसे बड़ा सहारा है। नया साल मुबारक!', 'Maa-Papa, your blessings are our greatest strength. Happy New Year!'],
      ['नए साल में हर दिन त्योहार जैसा हो।', 'May every day of the new year feel like a festival.'],
    ]],
    ['friends', H('🤝 दोस्तों के लिए', '🤝 For friends', '🤝 Doston ke liye', '🤝 বন্ধুদের জন্য'), [
      ['नया साल, पुराने दोस्त — यही असली ख़ज़ाना है। हैप्पी न्यू ईयर!', 'New year, old friends — that is the real treasure. Happy New Year!'],
      ['2027 में तेरे सारे सपने पूरे हों, दोस्त!', 'May all your dreams come true in 2027, buddy!'],
      ['पिछले साल की मस्ती से डबल मस्ती इस साल — हैप्पी न्यू ईयर!', 'Double the fun of last year this year — Happy New Year!'],
      ['नए साल का पहला मैसेज तुझे — क्योंकि तू ख़ास है।', 'My first message of the new year is for you — because you are special.'],
      ['दोस्ती का यह साल भी शानदार हो। नया साल मुबारक!', 'May this year of our friendship be amazing too. Happy New Year!'],
    ]],
    ['motivation', H('🚀 प्रेरणा वाली', '🚀 Motivational', '🚀 Prerna wali', '🚀 অনুপ্রেরণার'), [
      ['नया साल, नई शुरुआत — पिछली ग़लतियों से सीखें, आगे बढ़ें।', 'New year, new start — learn from past mistakes and move ahead.'],
      ['365 नए पन्ने — अपनी कहानी अच्छे से लिखिए। हैप्पी न्यू ईयर!', '365 new pages — write your story well. Happy New Year!'],
      ['छोटे-छोटे अच्छे बदलाव, बड़े नतीजे — 2027 आपका साल हो।', 'Small good changes, big results — make 2027 your year.'],
      ['जो बीत गया उसे छोड़िए, जो आने वाला है उसे जीतिए।', 'Let go of what has passed, win what is coming.'],
    ]],
    ['office', H('💼 ऑफ़िस/क्लाइंट के लिए', '💼 For colleagues and clients', '💼 Office/client ke liye', '💼 অফিস/ক্লায়েন্টের জন্য'), [
      ['आपको और आपके परिवार को नए साल 2027 की हार्दिक शुभकामनाएँ।', 'Warm wishes for 2027 to you and your family.'],
      ['पिछले साल के साथ के लिए धन्यवाद — नया साल आपके लिए सफलता लाए।', 'Thank you for your support last year — may the new year bring you success.'],
      ['नए साल में हमारी साझेदारी और मज़बूत हो।', 'May our partnership grow stronger in the new year.'],
    ]],
    ['love', H('❤️ प्यार के लिए', '❤️ For your partner', '❤️ Pyaar ke liye', '❤️ ভালোবাসার মানুষের জন্য'), [
      ['नया साल नया है, पर मेरा प्यार वही — हैप्पी न्यू ईयर, मेरी जान!', 'The year is new, my love is the same — Happy New Year, my love!'],
      ['2027 के हर दिन तुम्हारे साथ जीना चाहता/चाहती हूँ।', 'I want to live every day of 2027 with you.'],
      ['आधी रात का पहला ख़याल — तुम। नया साल मुबारक!', 'My first thought at midnight — you. Happy New Year!'],
    ]],
    ['short', H('✨ छोटी शुभकामनाएँ (स्टेटस)', '✨ Short wishes (status)', '✨ Chhoti wishes (status)', '✨ ছোট শুভেচ্ছা (স্ট্যাটাস)'), [
      ['हैप्पी न्यू ईयर 2027! 🎆', 'Happy New Year 2027! 🎆'], ['नया साल मुबारक! 🥳', 'Happy New Year! 🥳'], ['नई उम्मीदें, नया साल! ✨', 'New hopes, new year! ✨'], ['2027 — आओ, स्वागत है! 🎉', '2027 — welcome! 🎉'], ['ख़ुश रहें, स्वस्थ रहें! 🙏', 'Stay happy, stay healthy! 🙏'],
    ]],
  ],
  anniversary: [
    ['couple', H('💑 पति/पत्नी के लिए', '💑 For your husband/wife', '💑 Pati/patni ke liye', '💑 স্বামী/স্ত্রীর জন্য'), [
      ['हमारी शादी की सालगिरह मुबारक! तुम्हारे साथ हर साल पहले से अच्छा है।', 'Happy anniversary! Every year with you is better than the last.'],
      ['सात फेरों का साथ, सातों जन्म का वादा — हैप्पी एनिवर्सरी।', 'Seven rounds together, a promise for seven lifetimes — happy anniversary.'],
      ['तुम मेरी सबसे अच्छी दोस्त और सबसे प्यारी हमसफ़र हो।', 'You are my best friend and my dearest life partner.'],
      ['हर झगड़े के बाद भी हम साथ हैं — यही हमारा प्यार है।', 'Even after every fight, we are together — that is our love.'],
      ['ज़िंदगी का हर पड़ाव तुम्हारे साथ ख़ूबसूरत है। सालगिरह मुबारक!', 'Every stage of life is beautiful with you. Happy anniversary!'],
    ]],
    ['parents', H('👨‍👩‍👧 माँ-पापा के लिए', '👨‍👩‍👧 For parents', '👨‍👩‍👧 Maa-papa ke liye', '👨‍👩‍👧 বাবা-মায়ের জন্য'), [
      ['माँ-पापा, आपकी जोड़ी हमेशा सलामत रहे। शादी की सालगिरह मुबारक!', 'Maa-Papa, may your pair stay blessed forever. Happy anniversary!'],
      ['आपसे ही हमने सीखा कि प्यार और साथ क्या होता है।', 'From you we learned what love and togetherness mean.'],
      ['भगवान आपको लंबी उम्र और ढेर सारी ख़ुशियाँ दे। हैप्पी एनिवर्सरी!', 'May God give you a long life and lots of happiness. Happy anniversary!'],
      ['आपकी जोड़ी हमारे घर की नींव है।', 'Your partnership is the foundation of our home.'],
    ]],
    ['friends', H('🤝 दोस्त/रिश्तेदारों के लिए', '🤝 For friends and relatives', '🤝 Dost/rishtedaaron ke liye', '🤝 বন্ধু/আত্মীয়দের জন্য'), [
      ['आप दोनों की जोड़ी सदा बनी रहे। शादी की सालगिरह की बधाई!', 'May you two always stay together. Congratulations on your anniversary!'],
      ['प्यार और भरोसे का एक और साल मुबारक हो।', 'Congratulations on another year of love and trust.'],
      ['आप दोनों हमेशा ऐसे ही मुस्कुराते रहें।', 'May you both keep smiling like this always.'],
      ['भगवान आपके रिश्ते को और मज़बूत करे। हैप्पी एनिवर्सरी!', 'May God make your bond even stronger. Happy anniversary!'],
    ]],
    ['short', H('✨ छोटी शुभकामनाएँ (स्टेटस)', '✨ Short wishes (status)', '✨ Chhoti wishes (status)', '✨ ছোট শুভেচ্ছা (স্ট্যাটাস)'), [
      ['सालगिरह मुबारक! 💐', 'Happy anniversary! 💐'], ['जोड़ी सलामत रहे! ❤️', 'Stay together forever! ❤️'], ['प्यार का एक और साल! 🥂', 'Cheers to another year of love! 🥂'], ['हमेशा साथ! 💑', 'Together forever! 💑'],
    ]],
  ],
  'good-morning': [
    ['positive', H('☀️ पॉज़िटिव सुबह', '☀️ Positive mornings', '☀️ Positive subah', '☀️ ইতিবাচক সকাল'), [
      ['सुप्रभात! आज का दिन नई उम्मीद और नई ऊर्जा लेकर आए।', 'Good morning! May today bring new hope and new energy.'],
      ['उठिए, मुस्कुराइए — आज कुछ अच्छा ज़रूर होगा।', 'Wake up and smile — something good will happen today.'],
      ['हर सुबह भगवान का दिया एक नया मौक़ा है। गुड मॉर्निंग!', 'Every morning is a new chance from God. Good morning!'],
      ['चाय की पहली चुस्की और आपकी याद — सुप्रभात!', 'The first sip of tea and a thought of you — good morning!'],
      ['सूरज की तरह चमकिए, फूलों की तरह मुस्कुराइए। गुड मॉर्निंग!', 'Shine like the sun, smile like the flowers. Good morning!'],
      ['आज का दिन आपकी मेहनत का फल लेकर आए।', 'May today bring the reward of your hard work.'],
    ]],
    ['family', H('👨‍👩‍👧 परिवार/दोस्तों के लिए', '👨‍👩‍👧 For family and friends', '👨‍👩‍👧 Parivaar/doston ke liye', '👨‍👩‍👧 পরিবার/বন্ধুদের জন্য'), [
      ['माँ-पापा को प्रणाम — आपकी दुआ से हर सुबह अच्छी है। सुप्रभात!', 'Pranam Maa-Papa — every morning is good with your blessings. Good morning!'],
      ['दोस्त, आज का दिन तेरे लिए शानदार हो। गुड मॉर्निंग!', 'Have a great day, friend. Good morning!'],
      ['सुबह-सुबह आपको याद किया — ख़ुश रहिए, स्वस्थ रहिए।', 'Thought of you first thing in the morning — stay happy and healthy.'],
      ['आपकी मुस्कान से ही हमारी सुबह होती है। गुड मॉर्निंग!', 'Our morning begins with your smile. Good morning!'],
    ]],
    ['spiritual', H('🙏 भक्ति वाली सुबह', '🙏 Devotional mornings', '🙏 Bhakti wali subah', '🙏 ভক্তির সকাল'), [
      ['ईश्वर आपका दिन मंगलमय करे। सुप्रभात! 🙏', 'May God make your day auspicious. Good morning! 🙏'],
      ['सुबह की प्रार्थना में आपके लिए भी दुआ माँगी है।', 'In my morning prayer I prayed for you too.'],
      ['जय श्री राम, शुभ प्रभात! आपका दिन शुभ हो।', 'Jai Shri Ram, good morning! Have a blessed day.'],
      ['प्रभु की कृपा से आज का हर काम सफल हो।', 'By God’s grace may all of today’s work succeed.'],
    ]],
    ['short', H('✨ छोटी (स्टेटस)', '✨ Short (status)', '✨ Chhoti (status)', '✨ ছোট (স্ট্যাটাস)'), [
      ['सुप्रभात! ☀️', 'Good morning! ☀️'], ['आपका दिन शुभ हो! 🌼', 'Have a blessed day! 🌼'], ['चाय पी ली? ☕ गुड मॉर्निंग!', 'Had your tea? ☕ Good morning!'], ['मुस्कुराइए, नई सुबह है! 😊', 'Smile, it’s a new morning! 😊'],
    ]],
  ],
  'good-night': [
    ['peace', H('🌙 सुकून भरी रात', '🌙 Peaceful nights', '🌙 Sukoon bhari raat', '🌙 শান্তির রাত'), [
      ['शुभ रात्रि! आज की थकान भूलिए और मीठे सपनों में खो जाइए।', 'Good night! Forget today’s tiredness and drift into sweet dreams.'],
      ['चाँद-तारे आपको अच्छी नींद दें। गुड नाइट!', 'May the moon and stars give you sound sleep. Good night!'],
      ['कल फिर नई सुबह होगी — अभी आराम कीजिए। शुभ रात्रि।', 'Tomorrow will bring a new morning — rest now. Good night.'],
      ['आज जो अच्छा हुआ उसके लिए शुक्रिया कहिए और सो जाइए।', 'Be thankful for the good things today and go to sleep.'],
      ['सपने सुनहरे हों, नींद गहरी हो। गुड नाइट!', 'May your dreams be golden and your sleep deep. Good night!'],
    ]],
    ['family', H('👨‍👩‍👧 अपनों के लिए', '👨‍👩‍👧 For loved ones', '👨‍👩‍👧 Apno ke liye', '👨‍👩‍👧 প্রিয়জনদের জন্য'), [
      ['माँ, आराम से सोइए — कल बात करेंगे। शुभ रात्रि।', 'Maa, sleep well — we will talk tomorrow. Good night.'],
      ['दोस्त, ज़्यादा मत सोच, आराम से सो जा। गुड नाइट!', 'Buddy, don’t overthink, sleep well. Good night!'],
      ['दिन भर की मेहनत के बाद अब आराम का समय — शुभ रात्रि।', 'After a whole day’s work, it is time to rest — good night.'],
      ['तुम्हें मीठे सपने आएँ, मेरी जान। गुड नाइट!', 'Sweet dreams, my love. Good night!'],
    ]],
    ['short', H('✨ छोटी (स्टेटस)', '✨ Short (status)', '✨ Chhoti (status)', '✨ ছোট (স্ট্যাটাস)'), [
      ['शुभ रात्रि! 🌙', 'Good night! 🌙'], ['मीठे सपने! ✨', 'Sweet dreams! ✨'], ['सो जाओ, कल फिर मिलेंगे! 😴', 'Sleep now, see you tomorrow! 😴'], ['अच्छी नींद आए! 🌌', 'Sleep well! 🌌'],
    ]],
  ],
};
Object.assign(PAIRS, PAIRS2);
const COUNT = (slug) => PAIRS[slug].reduce((n, g) => n + g[2].length, 0);
export const PAIR_UI = {
  hi: (name, n) => [`${name} — हिंदी और English में (${n}+)`, 'हर शुभकामना हिंदी और English दोनों में — जो भाषा पसंद हो वही कॉपी करें:', 'दोनों कॉपी करें'],
  en: (name, n) => [`${name} in Hindi and English (${n}+)`, 'Every wish in both Hindi and English — copy the language you like:', 'Copy both'],
  hinglish: (name, n) => [`${name} Hindi aur English mein (${n}+)`, 'Har wish Hindi aur English dono mein — jo bhasha pasand ho wahi copy karein:', 'Dono copy karein'],
  bn: (name, n) => [`${name} — হিন্দি আর English-এ (${n}+)`, 'প্রতিটি শুভেচ্ছা হিন্দি আর English-এ — যে ভাষা পছন্দ, সেটাই কপি করুন:', 'দুটোই কপি করুন'],
};
export const pairCount = COUNT;
// new titles for wish pages (birthday title stays in build.mjs)
export const WISH_TITLES = {
  anniversary: { hi: 'शादी की सालगिरह की शुभकामनाएँ हिंदी और English में — पति, पत्नी, माँ-पापा के लिए 25+ | NextGrade', en: 'Happy Anniversary Wishes in Hindi and English — 25+ for Husband, Wife and Parents | NextGrade', hinglish: 'Anniversary Wishes in Hindi English — 25+ Pati, Patni, Maa-Papa ke liye | NextGrade', bn: 'বিবাহবার্ষিকীর শুভেচ্ছা — হিন্দি, English আর বাংলায় ২৫+ | NextGrade' },
  'good-morning': { hi: 'गुड मॉर्निंग / सुप्रभात शुभकामनाएँ हिंदी और English में — 25+ पॉज़िटिव और भक्ति संदेश | NextGrade', en: 'Good Morning Wishes in Hindi and English — 25+ Positive and Devotional Messages | NextGrade', hinglish: 'Good Morning Wishes in Hindi English — 25+ Positive aur Bhakti Messages | NextGrade', bn: 'শুভ সকালের শুভেচ্ছা — হিন্দি, English আর বাংলায় ২৫+ | NextGrade' },
  'good-night': { hi: 'गुड नाइट / शुभ रात्रि शुभकामनाएँ हिंदी और English में — 20+ प्यारे संदेश | NextGrade', en: 'Good Night Wishes in Hindi and English — 20+ Sweet Messages | NextGrade', hinglish: 'Good Night Wishes in Hindi English — 20+ Pyaare Messages | NextGrade', bn: 'শুভ রাত্রির শুভেচ্ছা — হিন্দি, English আর বাংলায় ২০+ | NextGrade' },
};
