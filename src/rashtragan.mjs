/**
 * National anthem and national song with meaning (28 Nov 2026, plan §Z1): /rashtragan/ hub + /rashtragan/jana-gana-mana/
 * and /rashtragan/vande-mataram/ in hi, en, bn. Both texts are public domain (Tagore d. 1941, Bankim Chandra d. 1894).
 * Jana Gana Mana = the first stanza adopted as the anthem; Vande Mataram = the first two stanzas adopted as the national
 * song (24 Jan 1950). Meanings, facts, rules and FAQ are our own words.
 * Line: [Devanagari, Bengali, Roman, meaning hi, meaning en, meaning bn]
 */
const SONGS = [
  {
    slug: 'jana-gana-mana', emoji: '🇮🇳',
    name: { hi: 'जन गण मन — राष्ट्रगान, अर्थ सहित', en: 'Jana Gana Mana — National Anthem with meaning', bn: 'জনগণমন — জাতীয় সংগীত, অর্থসহ' },
    nav: { hi: 'जन गण मन (राष्ट्रगान)', en: 'Jana Gana Mana (anthem)', bn: 'জনগণমন (জাতীয় সংগীত)' },
    t: { hi: 'जन गण मन लिरिक्स अर्थ सहित — राष्ट्रगान के नियम, 52 सेकंड | NextGrade', en: 'Jana Gana Mana Lyrics with Meaning — National Anthem Rules, 52 Seconds | NextGrade', bn: 'জনগণমন লিরিক্স অর্থসহ — জাতীয় সংগীতের নিয়ম, ৫২ সেকেন্ড | NextGrade' },
    d: { hi: 'भारत का राष्ट्रगान जन गण मन — पूरा पाठ हिंदी, बांग्ला और रोमन में, हर पंक्ति का अर्थ, किसने लिखा, कब अपनाया, गाने का समय (52 और 20 सेकंड) और सम्मान के नियम।', en: 'India’s national anthem Jana Gana Mana — full text in Roman, Hindi and Bengali script, line-by-line meaning, who wrote it, when it was adopted, playing time (52 and 20 seconds) and the rules of respect.', bn: 'ভারতের জাতীয় সংগীত জনগণমন — পুরো পাঠ বাংলা, হিন্দি ও রোমান হরফে, প্রতিটি লাইনের অর্থ, কে লিখেছেন, কবে গৃহীত, গাওয়ার সময় (৫২ ও ২০ সেকেন্ড) আর সম্মানের নিয়ম।' },
    lines: [
      ['जन-गण-मन अधिनायक जय हे, भारत-भाग्य-विधाता!', 'জনগণমন-অধিনায়ক জয় হে ভারতভাগ্যবিধাতা!', 'Jana-gana-mana adhinayaka jaya he, Bharata-bhagya-vidhata!', 'हे सब लोगों के मन के अधिनायक, भारत के भाग्य को रचने वाले — तुम्हारी जय हो।', 'Victory to you, ruler of the minds of all people, maker of India’s destiny!', 'জয় হোক তোমার, সব মানুষের মনের অধিনায়ক, ভারতের ভাগ্যবিধাতা!'],
      ['पंजाब-सिंधु-गुजरात-मराठा, द्राविड़-उत्कल-बंग,', 'পঞ্জাব সিন্ধু গুজরাট মরাঠা দ্রাবিড় উৎকল বঙ্গ', 'Punjaba-Sindhu-Gujarata-Maratha, Dravida-Utkala-Banga,', 'पंजाब, सिंध, गुजरात, मराठा प्रदेश, द्रविड़ (दक्षिण भारत), उत्कल (ओडिशा) और बंगाल —', 'Punjab, Sindh, Gujarat, the Maratha country, the Dravida south, Utkal (Odisha) and Bengal —', 'পাঞ্জাব, সিন্ধু, গুজরাট, মারাঠা দেশ, দ্রাবিড় (দক্ষিণ ভারত), উৎকল (ওড়িশা) আর বঙ্গ —'],
      ['विंध्य-हिमाचल-यमुना-गंगा, उच्छल-जलधि-तरंग,', 'বিন্ধ্য হিমাচল যমুনা গঙ্গা উচ্ছলজলধিতরঙ্গ', 'Vindhya-Himachala-Yamuna-Ganga, uchchhala-jaladhi-taranga,', 'विंध्य और हिमालय पर्वत, यमुना और गंगा नदियाँ, और उछलती सागर की लहरें —', 'the Vindhya and Himalaya mountains, the Yamuna and the Ganga, and the leaping waves of the sea —', 'বিন্ধ্য আর হিমালয় পর্বত, যমুনা আর গঙ্গা, আর উচ্ছল সাগরের ঢেউ —'],
      ['तव शुभ नामे जागे, तव शुभ आशिष मागे, गाहे तव जय-गाथा।', 'তব শুভ নামে জাগে, তব শুভ আশিস মাগে, গাহে তব জয়গাথা।', 'Tava shubha name jage, tava shubha ashisha mage, gahe tava jaya-gatha.', 'सब तुम्हारा शुभ नाम लेकर जागते हैं, तुम्हारा शुभ आशीर्वाद माँगते हैं और तुम्हारी जय-गाथा गाते हैं।', 'all wake up to your auspicious name, ask for your blessing and sing the song of your victory.', 'সবাই তোমার শুভ নামে জাগে, তোমার শুভ আশিস চায়, তোমার জয়গাথা গায়।'],
      ['जन-गण-मंगलदायक जय हे, भारत-भाग्य-विधाता!', 'জনগণমঙ্গলদায়ক জয় হে ভারতভাগ্যবিধাতা!', 'Jana-gana-mangala-dayaka jaya he, Bharata-bhagya-vidhata!', 'हे सब लोगों का मंगल करने वाले, भारत के भाग्य-विधाता — तुम्हारी जय हो।', 'Victory to you, giver of good to all the people, maker of India’s destiny!', 'জয় হোক তোমার, সব মানুষের মঙ্গলদাতা, ভারতের ভাগ্যবিধাতা!'],
      ['जय हे, जय हे, जय हे, जय जय जय जय हे।', 'জয় হে, জয় হে, জয় হে, জয় জয় জয় জয় হে॥', 'Jaya he, jaya he, jaya he, jaya jaya jaya, jaya he.', 'जय हो, जय हो, जय हो — सदा जय हो।', 'Victory, victory, victory to you — victory for ever!', 'জয় হোক, জয় হোক, জয় হোক — চিরকাল জয় হোক!'],
    ],
    facts: {
      hi: ['<b>रचयिता:</b> रवीन्द्रनाथ टैगोर। मूल गीत बांग्ला (संस्कृत-प्रधान साधु भाषा) में है और इसके पाँच पद हैं; राष्ट्रगान केवल पहला पद है।', '<b>पहली बार गाया गया:</b> 27 दिसंबर 1911, कलकत्ता में भारतीय राष्ट्रीय कांग्रेस के अधिवेशन में।', '<b>राष्ट्रगान के रूप में अपनाया गया:</b> 24 जनवरी 1950, संविधान सभा द्वारा।', '<b>समय:</b> पूरा राष्ट्रगान लगभग <b>52 सेकंड</b> में गाया जाता है। कुछ अवसरों पर छोटा रूप — पहली और आख़िरी पंक्ति — लगभग <b>20 सेकंड</b> में।'],
      en: ['<b>Written by:</b> Rabindranath Tagore. The original song is in Bengali (Sanskritised literary Bengali) and has five stanzas; the anthem is only the first stanza.', '<b>First sung:</b> 27 December 1911, at the Calcutta session of the Indian National Congress.', '<b>Adopted as the national anthem:</b> 24 January 1950, by the Constituent Assembly.', '<b>Playing time:</b> the full anthem takes about <b>52 seconds</b>. On some occasions a short version — the first and last lines — is played in about <b>20 seconds</b>.'],
      bn: ['<b>রচয়িতা:</b> রবীন্দ্রনাথ ঠাকুর। মূল গানটি বাংলায় (তৎসম-প্রধান সাধু ভাষায়), পাঁচটি স্তবক; জাতীয় সংগীত শুধু প্রথম স্তবক।', '<b>প্রথম গাওয়া হয়:</b> ২৭ ডিসেম্বর ১৯১১, কলকাতায় ভারতীয় জাতীয় কংগ্রেসের অধিবেশনে।', '<b>জাতীয় সংগীত হিসেবে গৃহীত:</b> ২৪ জানুয়ারি ১৯৫০, সংবিধান সভায়।', '<b>সময়:</b> পুরো জাতীয় সংগীত প্রায় <b>৫২ সেকেন্ডে</b> গাওয়া হয়। কিছু অনুষ্ঠানে ছোট রূপ — প্রথম আর শেষ লাইন — প্রায় <b>২০ সেকেন্ডে</b>।'],
    },
    rules: {
      hi: ['राष्ट्रगान बजे या गाया जाए तो सावधान की मुद्रा में खड़े हों; बीच में बात, हँसी-मज़ाक़ या फ़ोन न करें।', 'शब्द और धुन वही रखें जो तय हैं; अपने मन से बदलाव या अधूरा गाना ठीक नहीं।', 'जानबूझकर राष्ट्रगान गाने से रोकना या गाते समय बाधा डालना राष्ट्रीय सम्मान अपमान निवारण अधिनियम, 1971 के तहत अपराध है।', 'स्कूल में आम तौर पर दिन की शुरुआत सामूहिक राष्ट्रगान से होती है; 15 अगस्त और 26 जनवरी को झंडा फहराने के बाद पूरा राष्ट्रगान गाया जाता है।'],
      en: ['When the anthem is played or sung, stand to attention; do not talk, joke or use your phone during it.', 'Keep the fixed words and tune; changing it or singing only part of it on your own is not right.', 'Intentionally preventing the singing of the anthem or disturbing an assembly singing it is an offence under the Prevention of Insults to National Honour Act, 1971.', 'Schools usually begin the day with the anthem sung together; on 15 August and 26 January the full anthem follows the flag hoisting.'],
      bn: ['জাতীয় সংগীত বাজলে বা গাওয়া হলে সোজা হয়ে দাঁড়ান; তখন কথা, হাসি-ঠাট্টা বা ফোন নয়।', 'নির্ধারিত কথা আর সুর রাখুন; নিজের মতো বদলানো বা আধখানা গাওয়া ঠিক নয়।', 'ইচ্ছে করে জাতীয় সংগীত গাইতে বাধা দেওয়া বা গাওয়ার সময় ব্যাঘাত ঘটানো জাতীয় সম্মান অবমাননা প্রতিরোধ আইন, ১৯৭১ অনুযায়ী অপরাধ।', 'স্কুলে সাধারণত দিনের শুরু হয় সবাই মিলে জাতীয় সংগীত গেয়ে; ১৫ আগস্ট আর ২৬ জানুয়ারি পতাকা তোলার পর পুরো জাতীয় সংগীত গাওয়া হয়।'],
    },
    faq: {
      hi: [['जन गण मन किसने लिखा?', 'रवीन्द्रनाथ टैगोर ने, बांग्ला भाषा में। संगीत भी उन्हीं का है।'], ['राष्ट्रगान कितने सेकंड का है?', 'पूरा राष्ट्रगान लगभग 52 सेकंड का; छोटा रूप (पहली और आख़िरी पंक्ति) लगभग 20 सेकंड का।'], ['जन गण मन को राष्ट्रगान कब बनाया गया?', '24 जनवरी 1950 को संविधान सभा ने इसे राष्ट्रगान के रूप में अपनाया।'], ['राष्ट्रगान और राष्ट्रगीत में क्या अंतर है?', 'राष्ट्रगान "जन गण मन" है (टैगोर); राष्ट्रगीत "वन्दे मातरम्" है (बंकिमचंद्र)। दोनों को बराबर सम्मान दिया जाता है।'], ['"सिंधु" शब्द क्यों है जबकि सिंध पाकिस्तान में है?', 'गीत 1911 का है, तब सिंध अविभाजित भारत का हिस्सा था। आज "सिंधु" को सिंधु नदी और उससे जुड़ी संस्कृति के रूप में भी समझा जाता है।']],
      en: [['Who wrote Jana Gana Mana?', 'Rabindranath Tagore, in Bengali. He also composed the tune.'], ['How long is the national anthem?', 'The full anthem is about 52 seconds; the short version (first and last lines) about 20 seconds.'], ['When was Jana Gana Mana adopted as the anthem?', 'On 24 January 1950 by the Constituent Assembly.'], ['What is the difference between the national anthem and the national song?', 'The anthem is “Jana Gana Mana” (Tagore); the national song is “Vande Mataram” (Bankim Chandra). Both get equal respect.'], ['Why does it say “Sindhu” when Sindh is in Pakistan?', 'The song dates from 1911, when Sindh was part of undivided India. Today “Sindhu” is also read as the Indus river and the culture around it.']],
      bn: [['জনগণমন কে লিখেছেন?', 'রবীন্দ্রনাথ ঠাকুর, বাংলায়। সুরও তাঁরই।'], ['জাতীয় সংগীত কত সেকেন্ডের?', 'পুরোটা প্রায় ৫২ সেকেন্ড; ছোট রূপ (প্রথম আর শেষ লাইন) প্রায় ২০ সেকেন্ড।'], ['জনগণমন কবে জাতীয় সংগীত হয়?', '২৪ জানুয়ারি ১৯৫০, সংবিধান সভায় গৃহীত হয়।'], ['জাতীয় সংগীত আর জাতীয় গানের পার্থক্য কী?', 'জাতীয় সংগীত "জনগণমন" (রবীন্দ্রনাথ); জাতীয় গান "বন্দে মাতরম্" (বঙ্কিমচন্দ্র)। দুটিকেই সমান সম্মান দেওয়া হয়।'], ['সিন্ধু তো এখন পাকিস্তানে, তবু "সিন্ধু" কেন?', 'গানটি ১৯১১ সালের, তখন সিন্ধু অবিভক্ত ভারতের অংশ ছিল। আজ "সিন্ধু"-কে সিন্ধু নদী আর তার সংস্কৃতি হিসেবেও পড়া হয়।']],
    },
  },
  {
    slug: 'vande-mataram', emoji: '🙏',
    name: { hi: 'वन्दे मातरम् — राष्ट्रगीत, अर्थ सहित', en: 'Vande Mataram — National Song with meaning', bn: 'বন্দে মাতরম্ — জাতীয় গান, অর্থসহ' },
    nav: { hi: 'वन्दे मातरम् (राष्ट्रगीत)', en: 'Vande Mataram (national song)', bn: 'বন্দে মাতরম্ (জাতীয় গান)' },
    t: { hi: 'वन्दे मातरम् लिरिक्स अर्थ सहित — राष्ट्रगीत, बंकिमचंद्र, इतिहास | NextGrade', en: 'Vande Mataram Lyrics with Meaning — National Song, Bankim Chandra, History | NextGrade', bn: 'বন্দে মাতরম্ লিরিক্স অর্থসহ — জাতীয় গান, বঙ্কিমচন্দ্র, ইতিহাস | NextGrade' },
    d: { hi: 'भारत का राष्ट्रगीत वन्दे मातरम् — राष्ट्रगीत के रूप में अपनाए गए दोनों पद हिंदी, बांग्ला और रोमन में, हर पंक्ति का अर्थ, बंकिमचंद्र और आनंदमठ, कब अपनाया गया, FAQ।', en: 'India’s national song Vande Mataram — the two adopted stanzas in Roman, Hindi and Bengali script, line-by-line meaning, Bankim Chandra and Anandamath, when it was adopted, FAQ.', bn: 'ভারতের জাতীয় গান বন্দে মাতরম্ — গৃহীত দুটি স্তবক বাংলা, হিন্দি ও রোমান হরফে, প্রতিটি লাইনের অর্থ, বঙ্কিমচন্দ্র ও আনন্দমঠ, কবে গৃহীত, প্রশ্নোত্তর।' },
    lines: [
      ['वन्दे मातरम्।', 'বন্দে মাতরম্।', 'Vande Mataram.', 'हे माँ (मातृभूमि), मैं तुम्हें प्रणाम करता हूँ।', 'Mother (motherland), I bow to you.', 'মা (মাতৃভূমি), তোমায় বন্দনা করি।'],
      ['सुजलां सुफलां मलयजशीतलाम्,', 'সুজলাং সুফলাং মলয়জশীতলাম্,', 'Sujalam suphalam malayaja-shitalam,', 'अच्छे जल वाली, अच्छे फलों वाली, मलय पर्वत की हवा से शीतल,', 'rich in water, rich in fruit, cooled by the breeze from the Malaya hills,', 'সুন্দর জলে ভরা, ফলে ভরা, মলয় পর্বতের হাওয়ায় শীতল,'],
      ['शस्यश्यामलां मातरम्। वन्दे मातरम्।', 'শস্যশ্যামলাং মাতরম্। বন্দে মাতরম্।', 'shasya-shyamalam Mataram. Vande Mataram.', 'फ़सलों से हरी-भरी माँ — तुम्हें प्रणाम।', 'green with harvests, Mother — I bow to you.', 'শস্যে শ্যামল মা — তোমায় বন্দনা করি।'],
      ['शुभ्रज्योत्स्नापुलकितयामिनीम्,', 'শুভ্রজ্যোৎস্নাপুলকিতযামিনীম্,', 'Shubhra-jyotsna-pulakita-yaminim,', 'जिसकी रातें उजली चाँदनी से पुलकित हैं,', 'whose nights thrill in white moonlight,', 'যার রাত শুভ্র জ্যোৎস্নায় পুলকিত,'],
      ['फुल्लकुसुमितद्रुमदलशोभिनीम्,', 'ফুল্লকুসুমিতদ্রুমদলশোভিনীম্,', 'phulla-kusumita-drumadala-shobhinim,', 'जो खिले फूलों से लदे पेड़ों से सजी है,', 'adorned with trees in full bloom,', 'ফুটন্ত ফুলে ভরা গাছে যে শোভিত,'],
      ['सुहासिनीं सुमधुरभाषिणीम्,', 'সুহাসিনীং সুমধুরভাষিণীম্,', 'suhasinim sumadhura-bhashinim,', 'मधुर मुस्कान और मीठी वाणी वाली,', 'sweetly smiling, sweetly speaking,', 'সুন্দর হাসি আর মধুর ভাষার,'],
      ['सुखदां वरदां मातरम्। वन्दे मातरम्।', 'সুখদাং বরদাং মাতরম্॥ বন্দে মাতরম্।', 'sukhadam varadam Mataram. Vande Mataram.', 'सुख देने वाली, वरदान देने वाली माँ — तुम्हें प्रणाम।', 'giver of joy, giver of blessings, Mother — I bow to you.', 'সুখদাত্রী, বরদাত্রী মা — তোমায় বন্দনা করি।'],
    ],
    facts: {
      hi: ['<b>रचयिता:</b> बंकिमचंद्र चट्टोपाध्याय। गीत संस्कृत और बांग्ला के मेल में है और उनके उपन्यास <i>आनंदमठ</i> (1882) में छपा।', '<b>राष्ट्रगीत:</b> 24 जनवरी 1950 को संविधान सभा ने घोषणा की कि वन्दे मातरम् को जन गण मन के बराबर सम्मान मिलेगा। राष्ट्रगीत के रूप में पहले दो पद ही गाए जाते हैं।', '<b>स्वतंत्रता आंदोलन:</b> 1905 के बंग-भंग विरोध से यह आज़ादी की लड़ाई का नारा बन गया; रवीन्द्रनाथ टैगोर ने 1896 के कांग्रेस अधिवेशन में इसे गाया था।', '2025 में वन्दे मातरम् के 150 वर्ष पूरे होने पर देश भर में कार्यक्रम हुए।'],
      en: ['<b>Written by:</b> Bankim Chandra Chattopadhyay, in a mix of Sanskrit and Bengali; it appeared in his novel <i>Anandamath</i> (1882).', '<b>National song:</b> on 24 January 1950 the Constituent Assembly declared that Vande Mataram would be honoured equally with Jana Gana Mana. Only the first two stanzas are sung as the national song.', '<b>Freedom movement:</b> from the 1905 protests against the Partition of Bengal it became the slogan of the freedom struggle; Rabindranath Tagore sang it at the 1896 Congress session.', 'In 2025, programmes across the country marked 150 years of Vande Mataram.'],
      bn: ['<b>রচয়িতা:</b> বঙ্কিমচন্দ্র চট্টোপাধ্যায়; সংস্কৃত আর বাংলা মিশিয়ে লেখা, প্রকাশিত তাঁর উপন্যাস <i>আনন্দমঠ</i>-এ (১৮৮২)।', '<b>জাতীয় গান:</b> ২৪ জানুয়ারি ১৯৫০ সংবিধান সভা ঘোষণা করে যে বন্দে মাতরম্ জনগণমনের সমান সম্মান পাবে। জাতীয় গান হিসেবে প্রথম দুটি স্তবকই গাওয়া হয়।', '<b>স্বাধীনতা আন্দোলন:</b> ১৯০৫ সালের বঙ্গভঙ্গ-বিরোধী আন্দোলন থেকে এটি স্বাধীনতা সংগ্রামের স্লোগান হয়ে ওঠে; ১৮৯৬ সালের কংগ্রেস অধিবেশনে রবীন্দ্রনাথ ঠাকুর এটি গেয়েছিলেন।', '২০২৫ সালে বন্দে মাতরমের ১৫০ বছর পূর্তিতে সারা দেশে অনুষ্ঠান হয়েছে।'],
    },
    rules: {
      hi: ['राष्ट्रगीत बजे तो सम्मान से खड़े हों और शांत रहें।', 'स्कूलों में सुबह की प्रार्थना या कार्यक्रम के अंत में वन्दे मातरम् गाया जाता है; संसद का सत्र भी वन्दे मातरम् पर ख़त्म होता है।', 'राष्ट्रगान की तरह इसके लिए अलग दंड-क़ानून नहीं है, पर इसे बराबर सम्मान देना हर नागरिक से अपेक्षित है।'],
      en: ['When the national song is played, stand respectfully and stay silent.', 'Schools sing Vande Mataram in the morning assembly or at the end of a programme; sessions of Parliament also end with it.', 'Unlike the anthem it has no separate penal law, but every citizen is expected to give it equal respect.'],
      bn: ['জাতীয় গান বাজলে সম্মানের সঙ্গে দাঁড়ান, চুপ থাকুন।', 'স্কুলে সকালের প্রার্থনায় বা অনুষ্ঠানের শেষে বন্দে মাতরম্ গাওয়া হয়; সংসদের অধিবেশনও এই গানে শেষ হয়।', 'জাতীয় সংগীতের মতো এর আলাদা দণ্ড-আইন নেই, তবে প্রত্যেক নাগরিক একে সমান সম্মান দেবেন — এটাই প্রত্যাশা।'],
    },
    faq: {
      hi: [['वन्दे मातरम् किसने लिखा?', 'बंकिमचंद्र चट्टोपाध्याय ने; यह उनके उपन्यास आनंदमठ (1882) में है।'], ['वन्दे मातरम् का अर्थ क्या है?', '"माँ, मैं तुम्हें प्रणाम करता हूँ" — यहाँ माँ का अर्थ मातृभूमि भारत है।'], ['राष्ट्रगीत में कितने पद गाए जाते हैं?', 'पहले दो पद, जो इस पेज पर अर्थ के साथ दिए हैं।'], ['वन्दे मातरम् और जन गण मन में कौन बड़ा है?', 'दोनों बराबर सम्मान के हैं; जन गण मन राष्ट्रगान है और वन्दे मातरम् राष्ट्रगीत।']],
      en: [['Who wrote Vande Mataram?', 'Bankim Chandra Chattopadhyay; it is in his novel Anandamath (1882).'], ['What does Vande Mataram mean?', '“Mother, I bow to you” — the mother is the motherland, India.'], ['How many stanzas are sung as the national song?', 'The first two, given on this page with meaning.'], ['Is Vande Mataram above or below Jana Gana Mana?', 'They are honoured equally; Jana Gana Mana is the anthem and Vande Mataram the national song.']],
      bn: [['বন্দে মাতরম্ কে লিখেছেন?', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়; গানটি তাঁর উপন্যাস আনন্দমঠে (১৮৮২)।'], ['বন্দে মাতরম্ মানে কী?', '"মা, তোমায় বন্দনা করি" — এখানে মা মানে মাতৃভূমি ভারত।'], ['জাতীয় গান হিসেবে কয়টি স্তবক গাওয়া হয়?', 'প্রথম দুটি, যা এই পাতায় অর্থসহ দেওয়া আছে।'], ['বন্দে মাতরম্ আর জনগণমনের মধ্যে কোনটি বড়?', 'দুটির সম্মান সমান; জনগণমন জাতীয় সংগীত, বন্দে মাতরম্ জাতীয় গান।']],
    },
  },
];

const UI = {
  hi: { hub: 'राष्ट्रगान और राष्ट्रगीत', hubT: 'राष्ट्रगान जन गण मन और राष्ट्रगीत वन्दे मातरम् — लिरिक्स, अर्थ, नियम | NextGrade', hubD: 'भारत का राष्ट्रगान जन गण मन और राष्ट्रगीत वन्दे मातरम् — पूरा पाठ, हर पंक्ति का अर्थ, इतिहास, गाने के नियम। 26 जनवरी और 15 अगस्त के लिए।', hubH1: '🇮🇳 राष्ट्रगान और राष्ट्रगीत — अर्थ सहित', hubLead: 'जन गण मन और वन्दे मातरम् का पूरा पाठ, हर पंक्ति का सरल अर्थ, किसने लिखा, कब अपनाया और गाते समय किन बातों का ध्यान रखें।', hubAbout: 'भारत का राष्ट्रगान "जन गण मन" और राष्ट्रगीत "वन्दे मातरम्" — दोनों बंगाल की धरती से निकले और दोनों आज़ादी की लड़ाई में देश की आवाज़ बने। संविधान सभा ने 24 जनवरी 1950 को एक को राष्ट्रगान और दूसरे को बराबर सम्मान वाला राष्ट्रगीत घोषित किया। 26 जनवरी, 15 अगस्त और स्कूल की प्रार्थना में बच्चे इन्हें रोज़ गाते हैं — अर्थ समझकर गाने से हर शब्द का भाव साफ़ हो जाता है।', textH: 'पूरा पाठ', meanH: 'पंक्ति-दर-पंक्ति अर्थ', factsH: 'जानने योग्य बातें', rulesH: 'सम्मान के नियम', faqH: 'अक्सर पूछे जाने वाले सवाल', more: 'और पढ़ें', rd: '26 जनवरी भाषण', id: '15 अगस्त' },
  en: { hub: 'National Anthem & National Song', hubT: 'National Anthem Jana Gana Mana & National Song Vande Mataram — Lyrics, Meaning, Rules | NextGrade', hubD: 'India’s national anthem Jana Gana Mana and national song Vande Mataram — full text, line-by-line meaning, history and rules. For 26 January and 15 August.', hubH1: '🇮🇳 National Anthem & National Song — with meaning', hubLead: 'The full text of Jana Gana Mana and Vande Mataram, the simple meaning of every line, who wrote them, when they were adopted and how to show respect.', hubAbout: 'India’s national anthem “Jana Gana Mana” and national song “Vande Mataram” both came from Bengal, and both became the voice of the country in the freedom struggle. On 24 January 1950 the Constituent Assembly made one the anthem and declared the other an equally honoured national song. Children sing them on 26 January, 15 August and in school assemblies — knowing the meaning makes every word count.', textH: 'Full text', meanH: 'Line-by-line meaning', factsH: 'Key facts', rulesH: 'Rules of respect', faqH: 'Frequently asked questions', more: 'Read more', rd: '26 January speech', id: '15 August' },
  bn: { hub: 'জাতীয় সংগীত ও জাতীয় গান', hubT: 'জাতীয় সংগীত জনগণমন ও জাতীয় গান বন্দে মাতরম্ — লিরিক্স, অর্থ, নিয়ম | NextGrade', hubD: 'ভারতের জাতীয় সংগীত জনগণমন আর জাতীয় গান বন্দে মাতরম্ — পুরো পাঠ, প্রতিটি লাইনের অর্থ, ইতিহাস, নিয়ম। ২৬ জানুয়ারি ও ১৫ আগস্টের জন্য।', hubH1: '🇮🇳 জাতীয় সংগীত ও জাতীয় গান — অর্থসহ', hubLead: 'জনগণমন আর বন্দে মাতরমের পুরো পাঠ, প্রতিটি লাইনের সহজ অর্থ, কে লিখেছেন, কবে গৃহীত আর গাওয়ার সময় কী মানতে হয়।', hubAbout: 'ভারতের জাতীয় সংগীত "জনগণমন" আর জাতীয় গান "বন্দে মাতরম্" — দুটিই বাংলার মাটি থেকে উঠে এসেছে, দুটিই স্বাধীনতা সংগ্রামে দেশের কণ্ঠস্বর হয়েছিল। ২৪ জানুয়ারি ১৯৫০ সংবিধান সভা একটিকে জাতীয় সংগীত আর অন্যটিকে সমান সম্মানের জাতীয় গান ঘোষণা করে। ২৬ জানুয়ারি, ১৫ আগস্ট আর স্কুলের প্রার্থনায় ছোটরা এগুলো গায় — অর্থ জানলে প্রতিটি শব্দের ভাব স্পষ্ট হয়।', textH: 'পুরো পাঠ', meanH: 'লাইন ধরে অর্থ', factsH: 'জানার কথা', rulesH: 'সম্মানের নিয়ম', faqH: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন', more: 'আরও পড়ুন', rd: '২৬ জানুয়ারির ভাষণ', id: '১৫ আগস্ট' },
};
const SCRIPT = { hi: 0, bn: 1, en: 2 };
const MEAN = { hi: 3, en: 4, bn: 5 };
const CSS = '<style>.rg-text{white-space:pre-line;font-size:1.2rem;line-height:1.9;font-weight:600;border:1px solid var(--line);border-radius:14px;padding:16px 18px;background:var(--surface)}.rg-alt{white-space:pre-line;color:var(--muted);font-size:.98rem;line-height:1.8;margin:8px 0 0}.rg-mean{list-style:none;padding:0;display:grid;gap:10px}.rg-mean li{border-left:3px solid var(--brand);padding:4px 0 4px 12px}.rg-mean b{display:block}.mt-list{list-style:none;padding:0;display:grid;gap:10px}.mt-list a{display:block;padding:14px;border:1px solid var(--line);border-radius:12px;text-decoration:none}</style>';

export function buildRashtragan(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, U = UI[code]; if (!U) return;
  const langs = LANGS.filter((l) => UI[l.code]), hub = '/rashtragan/';
  const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  const crumbs = (x) => `<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${x}</p>`;
  const links = `<p class="chips"><a class="tag" href="${P(L, '/speech/republic-day/')}">🎤 ${esc(U.rd)}</a> <a class="tag" href="${P(L, '/festivals/republic-day/')}">🇮🇳 26 January</a></p>`;
  const hubFaq = SONGS.flatMap((s) => s.faq[code].slice(0, 2));
  write(L, hub, page(L, {
    path: hub, title: U.hubT, description: U.hubD, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, hub]]), faqLd(hubFaq)],
    body: `${CSS}<div class="wrap narrow article">${crumbs(esc(U.hub))}<h1>${esc(U.hubH1)}</h1><p class="lead">${esc(U.hubLead)}</p>
<ul class="mt-list">${SONGS.map((s) => `<li><a href="${P(L, `${hub}${s.slug}/`)}"><b>${s.emoji} ${esc(s.name[code])}</b></a></li>`).join('')}</ul>
<p>${esc(U.hubAbout)}</p>
<h2>${esc(U.faqH)}</h2>${hubFaq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}${links}</div>`,
  }));
  SONGS.forEach((s) => {
    const path = `${hub}${s.slug}/`;
    const main = s.lines.map((l) => l[SCRIPT[code]]).join('\n');
    // a second script under the main text: Roman for hi/bn readers, Devanagari for en readers
    const alt = s.lines.map((l) => l[code === 'en' ? 0 : 2]).join('\n');
    const other = SONGS.filter((o) => o !== s).map((o) => `<a class="tag" href="${P(L, `${hub}${o.slug}/`)}">${o.emoji} ${esc(o.nav[code])}</a>`).join(' ');
    write(L, path, page(L, {
      path, title: s.t[code], description: s.d[code], langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, hub], [s.nav[code], path]]), faqLd(s.faq[code])],
      body: `${CSS}<div class="wrap narrow article">${crumbs(`<a href="${P(L, hub)}">${esc(U.hub)}</a> › ${esc(s.nav[code])}`)}<h1>${s.emoji} ${esc(s.name[code])}</h1><p class="lead">${esc(s.d[code])}</p>
<h2>${esc(U.textH)}</h2><div class="rg-text" lang="${code === 'en' ? 'en' : code}">${esc(code === 'en' ? s.lines.map((l) => l[2]).join('\n') : main)}</div><p class="rg-alt">${esc(alt)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(U.meanH)}</h2><ul class="rg-mean">${s.lines.map((l) => `<li><b>${esc(l[SCRIPT[code]])}</b>${esc(l[MEAN[code]])}</li>`).join('')}</ul>
<h2>${esc(U.factsH)}</h2><ul>${s.facts[code].map((f) => `<li>${f}</li>`).join('')}</ul>
<h2>${esc(U.rulesH)}</h2><ul>${s.rules[code].map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<h2>${esc(U.faqH)}</h2>${s.faq[code].map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<h2>${esc(U.more)}</h2><p class="chips">${other}</p>${links}</div>`,
    }));
  });
}
export const RASHTRAGAN_LIST = SONGS.map((s) => ({ slug: s.slug, en: s.nav.en }));
