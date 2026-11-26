/**
 * Birthday wishes as Hindi + English pairs, by relation (26 Nov 2026: Search Console showed "birthday wishes in hindi
 * english" at position ~9 with 360+ impressions a day; the page had only 15 wishes). Our own text.
 * GROUPS[i] = [key, { hi, en, hinglish, bn } heading, [[hindi, english], ...]]
 */
export const GROUPS = [
  ['heart', { hi: '❤️ दिल को छू लेने वाली शुभकामनाएँ', en: '❤️ Heart-touching wishes', hinglish: '❤️ Dil ko chhoo lene wali wishes', bn: '❤️ মন ছুঁয়ে যাওয়া শুভেচ্ছা' }, [
    ['जन्मदिन की बहुत-बहुत शुभकामनाएँ! आप हमेशा ख़ुश रहें, मुस्कुराते रहें।', 'Many happy returns of the day! May you always stay happy and keep smiling.'],
    ['भगवान आपको लंबी उम्र, अच्छी सेहत और ढेर सारी ख़ुशियाँ दे।', 'May God bless you with a long life, good health and lots of happiness.'],
    ['आपकी हर सुबह नई उम्मीद लाए और हर शाम सुकून दे। हैप्पी बर्थडे!', 'May every morning bring you new hope and every evening bring you peace. Happy birthday!'],
    ['आप जैसे लोग कम मिलते हैं — आपका दिन उतना ही ख़ास हो जितने आप हैं।', 'People like you are rare — may your day be as special as you are.'],
    ['जो सपने आपने देखे हैं, वे सब इस साल पूरे हों।', 'May all the dreams you have dreamed come true this year.'],
    ['आपकी मुस्कान कभी कम न हो, और आपकी ख़ुशियाँ कभी ख़त्म न हों।', 'May your smile never fade and your happiness never end.'],
    ['ज़िंदगी का यह नया साल आपके लिए सबसे अच्छा साल बने।', 'May this new year of your life be your best one yet.'],
    ['दुआ है कि आपकी ज़िंदगी फूलों जैसी महकती रहे।', 'I pray your life stays as fragrant as flowers.'],
  ]],
  ['maa', { hi: '👩 माँ के लिए', en: '👩 For Mother', hinglish: '👩 Maa ke liye', bn: '👩 মায়ের জন্য' }, [
    ['माँ, आप मेरी पहली दोस्त और सबसे बड़ी ताक़त हैं। जन्मदिन मुबारक!', 'Maa, you are my first friend and my greatest strength. Happy birthday!'],
    ['आपके प्यार के बिना मेरा कोई दिन पूरा नहीं होता। हैप्पी बर्थडे माँ!', 'No day of mine is complete without your love. Happy birthday, Maa!'],
    ['भगवान आपको हमेशा स्वस्थ और ख़ुश रखे, मेरी प्यारी माँ।', 'May God keep you healthy and happy always, my dear mother.'],
    ['आपकी गोद दुनिया की सबसे सुरक्षित जगह है। जन्मदिन की शुभकामनाएँ, माँ।', 'Your lap is the safest place in the world. Happy birthday, Maa.'],
  ]],
  ['papa', { hi: '👨 पापा के लिए', en: '👨 For Father', hinglish: '👨 Papa ke liye', bn: '👨 বাবার জন্য' }, [
    ['पापा, आपने हर मुश्किल में मेरा हाथ थामा। जन्मदिन मुबारक हो!', 'Papa, you held my hand through every difficulty. Happy birthday!'],
    ['आप मेरे हीरो थे, हैं और हमेशा रहेंगे। हैप्पी बर्थडे पापा!', 'You were, are and always will be my hero. Happy birthday, Papa!'],
    ['आपकी मेहनत ही हमारी हर ख़ुशी की वजह है। आपको लंबी उम्र मिले।', 'Your hard work is the reason for all our happiness. Wishing you a long life.'],
    ['आपकी सीख ही मेरी सबसे बड़ी पूँजी है। जन्मदिन की शुभकामनाएँ, पापा।', 'Your lessons are my greatest wealth. Happy birthday, Papa.'],
  ]],
  ['bhai', { hi: '👦 भाई के लिए', en: '👦 For Brother', hinglish: '👦 Bhai ke liye', bn: '👦 ভাইয়ের জন্য' }, [
    ['भाई, तू झगड़ता भी है और सबसे पहले साथ भी देता है। हैप्पी बर्थडे!', 'Brother, you fight with me and you are also the first to stand by me. Happy birthday!'],
    ['मेरे पार्टनर इन क्राइम को जन्मदिन की ढेर सारी शुभकामनाएँ!', 'Lots of birthday wishes to my partner in crime!'],
    ['भगवान तुझे हर कामयाबी दे, मेरे प्यारे भाई।', 'May God give you every success, my dear brother.'],
    ['तेरे जैसा भाई क़िस्मत वालों को मिलता है। जन्मदिन मुबारक!', 'Only the lucky get a brother like you. Happy birthday!'],
  ]],
  ['behen', { hi: '👧 बहन के लिए', en: '👧 For Sister', hinglish: '👧 Behen ke liye', bn: '👧 বোনের জন্য' }, [
    ['दीदी/बहना, तुम घर की रौनक़ हो। जन्मदिन की बहुत-बहुत बधाई!', 'Sister, you are the light of our home. Many happy returns!'],
    ['मेरी सबसे अच्छी दोस्त — मेरी बहन — को हैप्पी बर्थडे!', 'Happy birthday to my best friend — my sister!'],
    ['तुम्हारी हँसी यूँ ही गूँजती रहे, तुम्हारे सारे सपने पूरे हों।', 'May your laughter keep ringing and all your dreams come true.'],
    ['भगवान तुम्हें हर बुरी नज़र से बचाए, मेरी प्यारी बहन।', 'May God protect you from every evil eye, my dear sister.'],
  ]],
  ['dost', { hi: '🤝 दोस्त के लिए', en: '🤝 For a Friend', hinglish: '🤝 Dost ke liye', bn: '🤝 বন্ধুর জন্য' }, [
    ['यार, तेरे बिना हर पार्टी अधूरी है। जन्मदिन मुबारक!', 'Buddy, every party is incomplete without you. Happy birthday!'],
    ['दोस्त वही जो हर हाल में साथ दे — और तू वही है। हैप्पी बर्थडे!', 'A friend is one who stands by you in every situation — and that is you. Happy birthday!'],
    ['हमारी दोस्ती यूँ ही सालों-साल चलती रहे। जन्मदिन की शुभकामनाएँ!', 'May our friendship go on for years and years. Happy birthday!'],
    ['आज केक तेरा, पर खाएँगे सब मिलकर! हैप्पी बर्थडे दोस्त।', 'The cake is yours today, but we will all eat it together! Happy birthday, friend.'],
    ['तू जहाँ भी रहे, ख़ुश रहे — यही दुआ है। जन्मदिन मुबारक हो!', 'Wherever you are, stay happy — that is my prayer. Happy birthday!'],
  ]],
  ['patni', { hi: '💑 पति/पत्नी के लिए', en: '💑 For Husband / Wife', hinglish: '💑 Pati/Patni ke liye', bn: '💑 স্বামী/স্ত্রীর জন্য' }, [
    ['तुम्हारे साथ हर दिन त्योहार जैसा लगता है। जन्मदिन मुबारक, मेरी जान!', 'Every day with you feels like a festival. Happy birthday, my love!'],
    ['मेरी ज़िंदगी को इतना सुंदर बनाने के लिए शुक्रिया। हैप्पी बर्थडे!', 'Thank you for making my life so beautiful. Happy birthday!'],
    ['हर जन्म में तुम्हारा ही साथ मिले — जन्मदिन की ढेर सारी शुभकामनाएँ।', 'May I have you by my side in every life — lots of birthday wishes.'],
    ['तुम हो तो घर, घर लगता है। हैप्पी बर्थडे, हमसफ़र।', 'With you, our house feels like home. Happy birthday, my partner.'],
  ]],
  ['bachche', { hi: '🧒 बच्चों के लिए', en: '🧒 For Kids', hinglish: '🧒 Bachchon ke liye', bn: '🧒 ছোটদের জন্য' }, [
    ['हमारे नन्हे राजकुमार/राजकुमारी को जन्मदिन की बहुत सारी बधाई!', 'Lots of birthday wishes to our little prince/princess!'],
    ['ख़ूब पढ़ो, ख़ूब खेलो और ऐसे ही मुस्कुराते रहो। हैप्पी बर्थडे बेटा!', 'Study well, play a lot and keep smiling like this. Happy birthday, dear!'],
    ['तुम्हारी किलकारी से ही घर में रौनक़ है। जन्मदिन मुबारक, लाडले!', 'Your giggles fill our home with joy. Happy birthday, little one!'],
  ]],
  ['short', { hi: '✨ छोटी शुभकामनाएँ (स्टेटस के लिए)', en: '✨ Short wishes (for status)', hinglish: '✨ Chhoti wishes (status ke liye)', bn: '✨ ছোট শুভেচ্ছা (স্ট্যাটাসের জন্য)' }, [
    ['जन्मदिन मुबारक! 🎂', 'Happy birthday! 🎂'],
    ['ख़ुश रहो, आबाद रहो! 🎉', 'Stay happy, stay blessed! 🎉'],
    ['आपका दिन शानदार हो! 🎈', 'Have a wonderful day! 🎈'],
    ['नया साल, नई ख़ुशियाँ! 🥳', 'A new year, new joys! 🥳'],
    ['सालगिरह मुबारक हो! 🎁', 'Many happy returns of the day! 🎁'],
  ]],
];
export const UI = {
  hi: { h: '🎂 जन्मदिन की शुभकामनाएँ हिंदी और English में (50+)', p: 'हर शुभकामना हिंदी और English दोनों में — जिसको जो भाषा पसंद हो, वही कॉपी करें। रिश्ते के हिसाब से चुनें:', both: 'दोनों कॉपी करें' },
  en: { h: '🎂 Happy birthday wishes in Hindi and English (50+)', p: 'Every wish in both Hindi and English — copy whichever language the person likes. Pick by relation:', both: 'Copy both' },
  hinglish: { h: '🎂 Birthday wishes Hindi aur English mein (50+)', p: 'Har wish Hindi aur English dono mein — jisko jo bhasha pasand ho, wahi copy karein. Rishte ke hisaab se chunein:', both: 'Dono copy karein' },
  bn: { h: '🎂 জন্মদিনের শুভেচ্ছা হিন্দি আর English-এ (৫০+)', p: 'প্রতিটি শুভেচ্ছা হিন্দি আর English দুটোতেই — যার যে ভাষা পছন্দ, সেটাই কপি করুন। সম্পর্ক অনুযায়ী বাছুন:', both: 'দুটোই কপি করুন' },
};
