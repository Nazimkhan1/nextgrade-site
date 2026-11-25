/**
 * /surya-namaskar/ — virtual Surya Namaskar (user idea, 25 Nov 2026): follow an animated figure through the 12 poses
 * with mantra, breath cue, optional Hindi voice, rounds and a daily streak (src/assets/surya.js).
 * Health content (YMYL): general practice only, no cure claims; "who should avoid" + disclaimer on the page.
 */
// breath: 'in' | 'out' | 'hold'. fig = pose key for the drawing in surya.js
export const POSES = [
  { fig: 'pranam', sa: 'प्रणामासन', ro: 'Pranamasana', mantra: 'ॐ मित्राय नमः', mr: 'Om Mitraya Namah', breath: 'out',
    hi: ['प्रणाम मुद्रा', 'सीधे खड़े हों, पैर साथ। दोनों हथेलियाँ छाती के सामने जोड़ें।'], en: ['Prayer pose', 'Stand straight, feet together. Join your palms in front of your chest.'], hinglish: ['Pranam mudra', 'Seedhe khade hon, pair saath. Dono hatheliyan chhaati ke saamne jodein.'], bn: ['প্রণাম মুদ্রা', 'সোজা হয়ে দাঁড়ান, পা একসঙ্গে। দুই হাত বুকের সামনে জোড় করুন।'] },
  { fig: 'up', sa: 'हस्तउत्तानासन', ro: 'Hasta Uttanasana', mantra: 'ॐ रवये नमः', mr: 'Om Ravaye Namah', breath: 'in',
    hi: ['हाथ ऊपर उठाएँ', 'साँस लेते हुए दोनों हाथ ऊपर ले जाएँ और हल्का-सा पीछे झुकें।'], en: ['Raised arms', 'Breathing in, lift both arms up and lean back a little.'], hinglish: ['Haath upar uthaayein', 'Saans lete hue dono haath upar le jaayein aur halka sa peechhe jhukein.'], bn: ['হাত ওপরে তুলুন', 'শ্বাস নিতে নিতে দুই হাত ওপরে তুলুন আর একটু পেছনে হেলুন।'] },
  { fig: 'fold', sa: 'हस्तपादासन', ro: 'Hastapadasana', mantra: 'ॐ सूर्याय नमः', mr: 'Om Suryaya Namah', breath: 'out',
    hi: ['आगे झुकें', 'साँस छोड़ते हुए कमर से आगे झुकें, हथेलियाँ पैरों के पास ज़मीन पर। ज़रूरत हो तो घुटने थोड़े मोड़ लें।'], en: ['Standing forward bend', 'Breathing out, bend forward from the hips and place your palms beside your feet. Bend the knees a little if you need to.'], hinglish: ['Aage jhukein', 'Saans chhodte hue kamar se aage jhukein, hatheliyan pairon ke paas zameen par. Zaroorat ho to ghutne thode mod lein.'], bn: ['সামনে ঝুঁকুন', 'শ্বাস ছাড়তে ছাড়তে কোমর থেকে সামনে ঝুঁকুন, হাতের তালু পায়ের পাশে মাটিতে। দরকার হলে হাঁটু একটু ভাঁজ করুন।'] },
  { fig: 'lunge', sa: 'अश्व संचालनासन', ro: 'Ashwa Sanchalanasana', mantra: 'ॐ भानवे नमः', mr: 'Om Bhanave Namah', breath: 'in',
    hi: ['दायाँ पैर पीछे', 'साँस लेते हुए दायाँ पैर पीछे ले जाएँ, घुटना ज़मीन पर। बायाँ घुटना हाथों के बीच, नज़र ऊपर।'], en: ['Equestrian pose', 'Breathing in, take the right leg back with the knee on the floor. Left knee between the hands, look up.'], hinglish: ['Daayaan pair peechhe', 'Saans lete hue daayaan pair peechhe le jaayein, ghutna zameen par. Baayaan ghutna haathon ke beech, nazar upar.'], bn: ['ডান পা পেছনে', 'শ্বাস নিতে নিতে ডান পা পেছনে নিন, হাঁটু মাটিতে। বাঁ হাঁটু দুই হাতের মাঝে, চোখ ওপরে।'] },
  { fig: 'plank', sa: 'दंडासन', ro: 'Dandasana', mantra: 'ॐ खगाय नमः', mr: 'Om Khagaya Namah', breath: 'hold',
    hi: ['दंड जैसा सीधा', 'बायाँ पैर भी पीछे ले जाएँ। सिर से एड़ी तक शरीर एक सीधी रेखा में।'], en: ['Plank (stick pose)', 'Take the left leg back too. Your body is one straight line from head to heels.'], hinglish: ['Dand jaisa seedha', 'Baayaan pair bhi peechhe le jaayein. Sir se edi tak shareer ek seedhi rekha mein.'], bn: ['লাঠির মতো সোজা', 'বাঁ পা-ও পেছনে নিন। মাথা থেকে গোড়ালি পর্যন্ত শরীর একটা সোজা রেখায়।'] },
  { fig: 'ashtanga', sa: 'अष्टांग नमस्कार', ro: 'Ashtanga Namaskara', mantra: 'ॐ पूष्णे नमः', mr: 'Om Pushne Namah', breath: 'out',
    hi: ['आठ अंगों से नमस्कार', 'साँस छोड़ते हुए घुटने, छाती और ठुड्डी ज़मीन पर रखें; कूल्हे थोड़े ऊपर रहें।'], en: ['Salute with eight points', 'Breathing out, lower knees, chest and chin to the floor; keep the hips slightly up.'], hinglish: ['Aath angon se namaskar', 'Saans chhodte hue ghutne, chhaati aur thuddi zameen par rakhein; koolhe thode upar rahein.'], bn: ['আট অঙ্গে প্রণাম', 'শ্বাস ছাড়তে ছাড়তে হাঁটু, বুক আর থুতনি মাটিতে রাখুন; কোমর একটু ওপরে থাকবে।'] },
  { fig: 'cobra', sa: 'भुजंगासन', ro: 'Bhujangasana', mantra: 'ॐ हिरण्यगर्भाय नमः', mr: 'Om Hiranyagarbhaya Namah', breath: 'in',
    hi: ['भुजंग (साँप) मुद्रा', 'साँस लेते हुए छाती आगे-ऊपर उठाएँ, कोहनियाँ हल्की मुड़ी हुई, कंधे कानों से दूर।'], en: ['Cobra pose', 'Breathing in, slide the chest forward and up, elbows slightly bent, shoulders away from the ears.'], hinglish: ['Bhujang (saanp) mudra', 'Saans lete hue chhaati aage-upar uthaayein, kohniyan halki mudi hui, kandhe kaanon se door.'], bn: ['ভুজঙ্গ (সাপ) মুদ্রা', 'শ্বাস নিতে নিতে বুক সামনে-ওপরে তুলুন, কনুই একটু ভাঁজ, কাঁধ কান থেকে দূরে।'] },
  { fig: 'mountain', sa: 'पर्वतासन', ro: 'Parvatasana', mantra: 'ॐ मरीचये नमः', mr: 'Om Marichaye Namah', breath: 'out',
    hi: ['पर्वत मुद्रा', 'साँस छोड़ते हुए कूल्हे ऊपर उठाएँ — शरीर उल्टे "V" जैसा। एड़ियाँ ज़मीन की ओर।'], en: ['Mountain pose', 'Breathing out, lift the hips — your body forms an upside-down "V". Heels towards the floor.'], hinglish: ['Parvat mudra', 'Saans chhodte hue koolhe upar uthaayein — shareer ulte "V" jaisa. Ediyan zameen ki or.'], bn: ['পর্বত মুদ্রা', 'শ্বাস ছাড়তে ছাড়তে কোমর ওপরে তুলুন — শরীর উল্টো "V"-এর মতো। গোড়ালি মাটির দিকে।'] },
  { fig: 'lunge2', sa: 'अश्व संचालनासन', ro: 'Ashwa Sanchalanasana', mantra: 'ॐ आदित्याय नमः', mr: 'Om Adityaya Namah', breath: 'in',
    hi: ['दायाँ पैर आगे', 'साँस लेते हुए दायाँ पैर हाथों के बीच आगे लाएँ, बायाँ घुटना ज़मीन पर, नज़र ऊपर।'], en: ['Equestrian pose (other side)', 'Breathing in, bring the right foot forward between the hands, left knee down, look up.'], hinglish: ['Daayaan pair aage', 'Saans lete hue daayaan pair haathon ke beech aage laayein, baayaan ghutna zameen par, nazar upar.'], bn: ['ডান পা সামনে', 'শ্বাস নিতে নিতে ডান পা দুই হাতের মাঝে সামনে আনুন, বাঁ হাঁটু মাটিতে, চোখ ওপরে।'] },
  { fig: 'fold', sa: 'हस्तपादासन', ro: 'Hastapadasana', mantra: 'ॐ सवित्रे नमः', mr: 'Om Savitre Namah', breath: 'out',
    hi: ['फिर आगे झुकें', 'साँस छोड़ते हुए बायाँ पैर भी आगे लाएँ और आगे झुकें।'], en: ['Forward bend again', 'Breathing out, bring the left foot forward too and bend forward.'], hinglish: ['Phir aage jhukein', 'Saans chhodte hue baayaan pair bhi aage laayein aur aage jhukein.'], bn: ['আবার সামনে ঝুঁকুন', 'শ্বাস ছাড়তে ছাড়তে বাঁ পা-ও সামনে আনুন আর সামনে ঝুঁকুন।'] },
  { fig: 'up', sa: 'हस्तउत्तानासन', ro: 'Hasta Uttanasana', mantra: 'ॐ अर्काय नमः', mr: 'Om Arkaya Namah', breath: 'in',
    hi: ['फिर हाथ ऊपर', 'साँस लेते हुए धीरे-धीरे उठें, हाथ ऊपर और हल्का पीछे।'], en: ['Raised arms again', 'Breathing in, rise slowly, arms up and a little back.'], hinglish: ['Phir haath upar', 'Saans lete hue dheere-dheere uthein, haath upar aur halka peechhe.'], bn: ['আবার হাত ওপরে', 'শ্বাস নিতে নিতে ধীরে উঠুন, হাত ওপরে আর একটু পেছনে।'] },
  { fig: 'pranam', sa: 'प्रणामासन', ro: 'Pranamasana', mantra: 'ॐ भास्कराय नमः', mr: 'Om Bhaskaraya Namah', breath: 'out',
    hi: ['फिर प्रणाम', 'साँस छोड़ते हुए हाथ छाती के सामने जोड़ें। एक चक्र पूरा।'], en: ['Prayer pose again', 'Breathing out, bring the palms together at the chest. One round done.'], hinglish: ['Phir pranam', 'Saans chhodte hue haath chhaati ke saamne jodein. Ek chakra poora.'], bn: ['আবার প্রণাম', 'শ্বাস ছাড়তে ছাড়তে হাত বুকের সামনে জোড় করুন। এক চক্র শেষ।'] },
];

export const ST = {
  hi: {
    nav: 'सूर्य नमस्कार', title: 'सूर्य नमस्कार — साथ-साथ करें: 12 आसन, मंत्र और साँस (वीडियो जैसा गाइड) | NextGrade',
    desc: 'घर पर रोज़ सूर्य नमस्कार करें: एनिमेशन के साथ 12 आसन, हर आसन का मंत्र, कब साँस लें-छोड़ें, हिंदी आवाज़, राउंड गिनती और रोज़ का स्ट्रीक। शुरुआत करने वालों के लिए सलाह और सावधानियाँ।',
    h1: '☀️ सूर्य नमस्कार — मेरे साथ करें', lead: 'फ़ोन सामने रखें, "शुरू करें" दबाएँ और स्क्रीन पर दिख रहे आसन के साथ-साथ करें। हर आसन के साथ मंत्र और साँस का इशारा मिलेगा। सुबह खाली पेट, उगते सूरज की ओर मुँह करके करना सबसे अच्छा माना जाता है।',
    ui: { start: '▶ शुरू करें', pause: '⏸ रोकें', resume: '▶ आगे करें', next: 'अगला ⏭', prev: '⏮ पिछला', rounds: 'राउंड', speed: 'रफ़्तार', slow: 'धीमी', normal: 'सामान्य', fast: 'तेज़', voice: '🔊 आवाज़', round: 'राउंड', of: 'में से', in: 'साँस लें', out: 'साँस छोड़ें', hold: 'साँस रोकें', ready: 'तैयार? सीधे खड़े हो जाएँ।', done: '🎉 शाबाश! आज का सूर्य नमस्कार पूरा।', streak: (n) => `🔥 लगातार ${n} दिन`, total: (n) => `कुल ${n} सूर्य नमस्कार`, share: '📲 WhatsApp पर बताएँ', shareText: (n) => `☀️ मैंने आज ${n} सूर्य नमस्कार किए! आप भी मेरे साथ करें — मुफ़्त, फ़ोन पर:`, full: '⛶ बड़ी स्क्रीन', morning: '🌅 सुबह वाला मोड — फ़ुल स्क्रीन', nextRound: '▶ अगला राउंड शुरू करें', roundDone: 'राउंड {n} पूरा ✅', exit: '✕ बंद करें', sound: '🔊 आवाज़', mute: '🔇 चुप', dawn: 'सुबह हो रही है… आराम से बैठें, गहरी साँस लें।', sun: '🌅 आज सूर्योदय कब है?' },
    stepsH: '12 आसन — एक-एक करके', mantraL: 'मंत्र', breathL: 'साँस',
    beginH: 'शुरुआत कैसे करें', begin: ['पहले हफ़्ते रोज़ 3–5 राउंड धीमी रफ़्तार में करें, फिर धीरे-धीरे 12 तक बढ़ाएँ।', 'सुबह खाली पेट करें; खाने के बाद कम से कम 3 घंटे रुकें।', 'चटाई या दरी बिछाएँ, ढीले कपड़े पहनें।', 'जहाँ खिंचाव ज़्यादा लगे, वहाँ ज़बरदस्ती न करें — घुटने मोड़ सकते हैं।', 'आख़िर में 1–2 मिनट शवासन में लेटकर आराम करें।'],
    whoH: '⚠️ किसे सावधान रहना चाहिए', who: ['गर्भावस्था में, या हाल में ऑपरेशन हुआ हो तो डॉक्टर से पूछे बिना न करें।', 'हाई ब्लड प्रेशर, दिल की बीमारी, हर्निया, कमर या गर्दन के दर्द (स्लिप डिस्क) में पहले डॉक्टर या योग शिक्षक से सलाह लें।', 'चक्कर आए, सीने में दर्द हो या साँस बहुत फूले तो तुरंत रुकें।', 'बच्चे बड़ों की देखरेख में करें।'],
    aboutH: 'सूर्य नमस्कार क्या है?', about: 'सूर्य नमस्कार 12 आसनों का एक क्रम है जिसे साँस के साथ जोड़कर किया जाता है। एक बार दाएँ पैर से और एक बार बाएँ पैर से करने पर एक पूरा चक्र बनता है। भारत में लोग इसे सुबह छत या आँगन में उगते सूरज के सामने करते हैं। नियमित अभ्यास से शरीर में लचीलापन आता है और दिन की शुरुआत ताज़गी से होती है।',
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: [['रोज़ कितने सूर्य नमस्कार करने चाहिए?', 'शुरुआत में 3–5 राउंड काफ़ी हैं। आदत होने पर 12 राउंड तक कर सकते हैं। अपनी क्षमता के हिसाब से बढ़ाएँ।'], ['सूर्य नमस्कार कब करना चाहिए?', 'सुबह खाली पेट, सूर्योदय के समय सबसे अच्छा माना जाता है। शाम को भी कर सकते हैं, बस खाने के 3 घंटे बाद।'], ['एक सूर्य नमस्कार में कितना समय लगता है?', 'धीमी रफ़्तार में लगभग 1–1.5 मिनट। इस पेज पर रफ़्तार आप ख़ुद चुन सकते हैं।'], ['क्या मंत्र बोलना ज़रूरी है?', 'नहीं। मंत्र मन लगाने में मदद करते हैं; बिना मंत्र के भी कर सकते हैं।']],
    disclaimer: 'यह जानकारी आम अभ्यास के लिए है, इलाज नहीं। कोई बीमारी हो या दवा चल रही हो तो पहले डॉक्टर से सलाह लें।',
  },
  hinglish: {
    nav: 'Surya Namaskar', title: 'Surya Namaskar — Saath-saath Karo: 12 Aasan, Mantra aur Saans (Video jaisa Guide) | NextGrade',
    desc: 'Ghar par roz Surya Namaskar karo: animation ke saath 12 aasan, har aasan ka mantra, kab saans lein-chhodein, Hindi awaaz, round ginti aur roz ka streak. Beginners ke liye salaah aur saavdhaaniyan.',
    h1: '☀️ Surya Namaskar — mere saath karo', lead: 'Phone saamne rakho, "Shuru karo" dabao aur screen par dikh rahe aasan ke saath-saath karo. Har aasan ke saath mantra aur saans ka ishaara milega. Subah khaali pet, ugte sooraj ki or munh karke karna sabse achha maana jaata hai.',
    ui: { start: '▶ Shuru karo', pause: '⏸ Roko', resume: '▶ Aage karo', next: 'Agla ⏭', prev: '⏮ Pichhla', rounds: 'Round', speed: 'Speed', slow: 'Dheemi', normal: 'Normal', fast: 'Tez', voice: '🔊 Awaaz', round: 'Round', of: 'mein se', in: 'Saans lo', out: 'Saans chhodo', hold: 'Saans roko', ready: 'Taiyaar? Seedhe khade ho jao.', done: '🎉 Shabaash! Aaj ka Surya Namaskar poora.', streak: (n) => `🔥 Lagaataar ${n} din`, total: (n) => `Kul ${n} Surya Namaskar`, share: '📲 WhatsApp par batao', shareText: (n) => `☀️ Maine aaj ${n} Surya Namaskar kiye! Aap bhi mere saath karo — free, phone par:`, full: '⛶ Badi screen', morning: '🌅 Subah wala mode — full screen', nextRound: '▶ Agla round shuru karo', roundDone: 'Round {n} poora ✅', exit: '✕ Band karo', sound: '🔊 Awaaz', mute: '🔇 Chup', dawn: 'Subah ho rahi hai… aaraam se baitho, gehri saans lo.', sun: '🌅 Aaj sunrise kab hai?' },
    stepsH: '12 aasan — ek-ek karke', mantraL: 'Mantra', breathL: 'Saans',
    beginH: 'Shuruaat kaise karein', begin: ['Pehle hafte roz 3–5 round dheemi speed mein karein, phir dheere-dheere 12 tak badhaayein.', 'Subah khaali pet karein; khaane ke baad kam se kam 3 ghante rukein.', 'Chatai ya dari bichhaayein, dheele kapde pehnein.', 'Jahan khinchaav zyada lage, wahan zabardasti na karein — ghutne mod sakte hain.', 'Aakhir mein 1–2 minute shavasan mein letkar aaraam karein.'],
    whoH: '⚠️ Kise saavdhaan rehna chahiye', who: ['Pregnancy mein, ya haal mein operation hua ho to doctor se poochhe bina na karein.', 'High BP, dil ki bimaari, hernia, kamar ya gardan ke dard (slip disc) mein pehle doctor ya yoga teacher se salaah lein.', 'Chakkar aaye, seene mein dard ho ya saans bahut phoole to turant rukein.', 'Bachche badon ki dekh-rekh mein karein.'],
    aboutH: 'Surya Namaskar kya hai?', about: 'Surya Namaskar 12 aasanon ka ek kram hai jise saans ke saath jodkar kiya jaata hai. Ek baar daayein pair se aur ek baar baayein pair se karne par ek poora chakra banta hai. India mein log ise subah chhat ya aangan mein ugte sooraj ke saamne karte hain. Niyamit abhyaas se shareer mein lachilaapan aata hai aur din ki shuruaat taazgi se hoti hai.',
    faqH: 'Aksar poochhe jaane wale sawaal',
    faq: [['Roz kitne Surya Namaskar karne chahiye?', 'Shuruaat mein 3–5 round kaafi hain. Aadat hone par 12 round tak kar sakte hain. Apni kshamta ke hisaab se badhaayein.'], ['Surya Namaskar kab karna chahiye?', 'Subah khaali pet, sunrise ke samay sabse achha maana jaata hai. Shaam ko bhi kar sakte hain, bas khaane ke 3 ghante baad.'], ['Ek Surya Namaskar mein kitna samay lagta hai?', 'Dheemi speed mein lagbhag 1–1.5 minute. Is page par speed aap khud chun sakte hain.'], ['Kya mantra bolna zaroori hai?', 'Nahi. Mantra mann lagaane mein madad karte hain; bina mantra ke bhi kar sakte hain.']],
    disclaimer: 'Yeh jaankari aam abhyaas ke liye hai, ilaaj nahi. Koi bimaari ho ya dawa chal rahi ho to pehle doctor se salaah lein.',
  },
  en: {
    nav: 'Surya Namaskar', title: 'Surya Namaskar (Sun Salutation) — Follow Along: 12 Poses, Mantras and Breathing | NextGrade',
    desc: 'Do Surya Namaskar at home every day: 12 animated poses, the mantra for each pose, when to breathe in and out, a Hindi voice guide, round counter and a daily streak. Tips for beginners and precautions.',
    h1: '☀️ Surya Namaskar — follow along with me', lead: 'Keep your phone in front of you, press "Start" and follow the pose on the screen. Each pose shows its mantra and when to breathe in or out. It is traditionally done in the morning on an empty stomach, facing the rising sun.',
    ui: { start: '▶ Start', pause: '⏸ Pause', resume: '▶ Resume', next: 'Next ⏭', prev: '⏮ Back', rounds: 'Rounds', speed: 'Speed', slow: 'Slow', normal: 'Normal', fast: 'Fast', voice: '🔊 Voice', round: 'Round', of: 'of', in: 'Breathe in', out: 'Breathe out', hold: 'Hold', ready: 'Ready? Stand straight.', done: '🎉 Well done! Today’s Surya Namaskar is complete.', streak: (n) => `🔥 ${n}-day streak`, total: (n) => `${n} Surya Namaskars in all`, share: '📲 Tell friends on WhatsApp', shareText: (n) => `☀️ I did ${n} Surya Namaskars today! Do them with me — free, on your phone:`, full: '⛶ Full screen', morning: '🌅 Sunrise mode — full screen', nextRound: '▶ Start the next round', roundDone: 'Round {n} done ✅', exit: '✕ Close', sound: '🔊 Sound', mute: '🔇 Mute', dawn: 'The sun is rising… settle down and take a deep breath.', sun: '🌅 When is sunrise today?' },
    stepsH: 'The 12 poses, one by one', mantraL: 'Mantra', breathL: 'Breath',
    beginH: 'How to start', begin: ['In the first week do 3–5 rounds a day at slow speed, then slowly build up to 12.', 'Do it on an empty stomach in the morning; wait at least 3 hours after a meal.', 'Use a mat or a durrie and wear loose clothes.', 'Never force a stretch — you may bend your knees.', 'At the end, rest for 1–2 minutes lying down (shavasana).'],
    whoH: '⚠️ Who should be careful', who: ['In pregnancy, or after a recent operation, do not do it without asking your doctor.', 'With high blood pressure, heart disease, hernia, or back or neck problems (slip disc), ask a doctor or yoga teacher first.', 'Stop at once if you feel dizzy, have chest pain or get very breathless.', 'Children should practise with an adult around.'],
    aboutH: 'What is Surya Namaskar?', about: 'Surya Namaskar (Sun Salutation) is a sequence of 12 poses linked with the breath. Doing it once leading with the right leg and once with the left makes one full round. In India people do it in the morning on the roof or in the courtyard, facing the rising sun. Regular practice builds flexibility and gives the day a fresh start.',
    faqH: 'Frequently asked questions',
    faq: [['How many Surya Namaskars should I do a day?', '3–5 rounds are enough to begin with. Once used to it you can do up to 12. Increase at your own pace.'], ['When should Surya Namaskar be done?', 'In the morning on an empty stomach, around sunrise, is considered best. Evenings are fine too, 3 hours after a meal.'], ['How long does one Surya Namaskar take?', 'About 1–1.5 minutes at a slow pace. You can choose the speed on this page.'], ['Do I have to chant the mantras?', 'No. Mantras help you focus; you can also do it without them.']],
    disclaimer: 'This is general practice information, not treatment. If you have an illness or take medicines, ask your doctor first.',
  },
  bn: {
    nav: 'সূর্য নমস্কার', title: 'সূর্য নমস্কার — সঙ্গে সঙ্গে করুন: ১২টি আসন, মন্ত্র আর শ্বাস | NextGrade',
    desc: 'ঘরে রোজ সূর্য নমস্কার করুন: অ্যানিমেশনে ১২টি আসন, প্রতিটির মন্ত্র, কখন শ্বাস নেবেন-ছাড়বেন, হিন্দি কণ্ঠ, রাউন্ড গোনা আর রোজের স্ট্রিক। নতুনদের পরামর্শ আর সতর্কতা।',
    h1: '☀️ সূর্য নমস্কার — আমার সঙ্গে করুন', lead: 'ফোন সামনে রাখুন, "শুরু করুন" টিপুন আর স্ক্রিনের আসনের সঙ্গে সঙ্গে করুন। প্রতিটি আসনে মন্ত্র আর শ্বাসের ইঙ্গিত পাবেন। সকালে খালি পেটে, উদীয়মান সূর্যের দিকে মুখ করে করা সবচেয়ে ভালো বলে ধরা হয়।',
    ui: { start: '▶ শুরু করুন', pause: '⏸ থামুন', resume: '▶ আবার চালান', next: 'পরের ⏭', prev: '⏮ আগের', rounds: 'রাউন্ড', speed: 'গতি', slow: 'ধীর', normal: 'সাধারণ', fast: 'দ্রুত', voice: '🔊 কণ্ঠ', round: 'রাউন্ড', of: 'এর মধ্যে', in: 'শ্বাস নিন', out: 'শ্বাস ছাড়ুন', hold: 'শ্বাস ধরে রাখুন', ready: 'তৈরি? সোজা হয়ে দাঁড়ান।', done: '🎉 দারুণ! আজকের সূর্য নমস্কার শেষ।', streak: (n) => `🔥 টানা ${n} দিন`, total: (n) => `মোট ${n}টি সূর্য নমস্কার`, share: '📲 WhatsApp-এ জানান', shareText: (n) => `☀️ আজ আমি ${n}টি সূর্য নমস্কার করেছি! আপনিও আমার সঙ্গে করুন — ফ্রি, ফোনে:`, full: '⛶ বড় স্ক্রিন', morning: '🌅 ভোরের মোড — ফুল স্ক্রিন', nextRound: '▶ পরের রাউন্ড শুরু করুন', roundDone: 'রাউন্ড {n} শেষ ✅', exit: '✕ বন্ধ করুন', sound: '🔊 শব্দ', mute: '🔇 চুপ', dawn: 'ভোর হচ্ছে… আরাম করে বসুন, গভীর শ্বাস নিন।', sun: '🌅 আজ সূর্যোদয় কখন?' },
    stepsH: '১২টি আসন — একে একে', mantraL: 'মন্ত্র', breathL: 'শ্বাস',
    beginH: 'কীভাবে শুরু করবেন', begin: ['প্রথম সপ্তাহে রোজ ৩–৫ রাউন্ড ধীরে করুন, তারপর আস্তে আস্তে ১২ পর্যন্ত বাড়ান।', 'সকালে খালি পেটে করুন; খাওয়ার পর অন্তত ৩ ঘণ্টা অপেক্ষা করুন।', 'মাদুর বা শতরঞ্চি পাতুন, ঢিলে জামা পরুন।', 'যেখানে টান বেশি লাগে সেখানে জোর করবেন না — হাঁটু ভাঁজ করতে পারেন।', 'শেষে ১–২ মিনিট শবাসনে শুয়ে বিশ্রাম নিন।'],
    whoH: '⚠️ কাদের সাবধান থাকা উচিত', who: ['গর্ভাবস্থায় বা সম্প্রতি অস্ত্রোপচার হলে ডাক্তারকে না জিজ্ঞেস করে করবেন না।', 'উচ্চ রক্তচাপ, হৃদরোগ, হার্নিয়া, কোমর বা ঘাড়ের সমস্যায় (স্লিপ ডিস্ক) আগে ডাক্তার বা যোগ শিক্ষকের পরামর্শ নিন।', 'মাথা ঘুরলে, বুকে ব্যথা হলে বা খুব হাঁপ ধরলে সঙ্গে সঙ্গে থামুন।', 'বাচ্চারা বড়দের সামনে করবে।'],
    aboutH: 'সূর্য নমস্কার কী?', about: 'সূর্য নমস্কার ১২টি আসনের একটি ক্রম, যা শ্বাসের সঙ্গে মিলিয়ে করা হয়। একবার ডান পা দিয়ে আর একবার বাঁ পা দিয়ে করলে এক পূর্ণ চক্র হয়। ভারতে মানুষ সকালে ছাদে বা উঠোনে উদীয়মান সূর্যের সামনে এটি করেন। নিয়মিত অভ্যাসে শরীর নমনীয় হয় আর দিনের শুরু হয় সতেজভাবে।',
    faqH: 'প্রায়ই জিজ্ঞেস করা প্রশ্ন',
    faq: [['রোজ কতগুলো সূর্য নমস্কার করা উচিত?', 'শুরুতে ৩–৫ রাউন্ড যথেষ্ট। অভ্যাস হলে ১২ রাউন্ড পর্যন্ত করতে পারেন। নিজের ক্ষমতা অনুযায়ী বাড়ান।'], ['সূর্য নমস্কার কখন করা উচিত?', 'সকালে খালি পেটে, সূর্যোদয়ের সময় সবচেয়ে ভালো ধরা হয়। সন্ধ্যায়ও করা যায়, খাওয়ার ৩ ঘণ্টা পরে।'], ['একটি সূর্য নমস্কারে কত সময় লাগে?', 'ধীর গতিতে প্রায় ১–১.৫ মিনিট। এই পেজে গতি নিজেই বেছে নিতে পারেন।'], ['মন্ত্র বলা কি জরুরি?', 'না। মন্ত্র মন বসাতে সাহায্য করে; মন্ত্র ছাড়াও করা যায়।']],
    disclaimer: 'এই তথ্য সাধারণ অভ্যাসের জন্য, চিকিৎসা নয়। কোনো অসুখ থাকলে বা ওষুধ চললে আগে ডাক্তারের পরামর্শ নিন।',
  },
};

export function buildSurya(L, { page, write, P, esc, T, breadcrumbLd, articleLd }) {
  const X = ST[L.code], code = L.code, path = '/surya-namaskar/', U = X.ui;
  const cfg = { roundDone: U.roundDone, lang: code, ui: Object.fromEntries(Object.entries(U).filter(([, v]) => typeof v === 'string')), streak: U.streak(9).replace('9', '{n}'), total: U.total(9).replace('9', '{n}'), shareText: U.shareText(9).replace('9', '{n}'), poses: POSES.map((p) => ({ fig: p.fig, name: p[code][0], how: p[code][1], sa: p.sa, ro: p.ro, mantra: p.mantra, mr: p.mr, breath: p.breath })) };
  const howTo = { '@context': 'https://schema.org', '@type': 'HowTo', name: X.h1.replace(/^\S+\s/, ''), description: X.desc, totalTime: 'PT2M', step: POSES.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: `${p[code][0]} (${p.ro})`, text: p[code][1] })) };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: X.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  write(L, path, page(L, {
    path, title: X.title, description: X.desc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, path]]), howTo, faqLd],
    body: `<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.h1)}</h1>
<p class="lead">${esc(X.lead)}</p>
<p class="sn-cta"><button class="btn btn-primary" id="sn-morning" type="button">${esc(U.morning)}</button></p>
<div id="sn" class="sn"><noscript>JavaScript</noscript></div>
<script type="application/json" id="sn-cfg">${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script>
<p><a href="${P(L, '/mausam/')}">${esc(U.sun)}</a></p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.aboutH)}</h2><p>${esc(X.about)}</p>
<h2>${esc(X.stepsH)}</h2>
<ol class="sn-steps">${POSES.map((p) => `<li><b>${esc(p[code][0])}</b> — ${esc(p.sa)} (${esc(p.ro)})<br>${esc(p[code][1])}<br><small>${esc(X.mantraL)}: ${esc(p.mantra)} (${esc(p.mr)}) · ${esc(X.breathL)}: ${esc(U[p.breath])}</small></li>`).join('')}</ol>
<h2>${esc(X.beginH)}</h2><ul>${X.begin.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(X.whoH)}</h2><ul>${X.who.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.faqH)}</h2>
${X.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n')}
<p class="note">${esc(X.disclaimer)}</p>
</div>`,
    scripts: ['/assets/surya.js', '/assets/surya-morning.js'],
  }));
}
