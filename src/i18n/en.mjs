/**
 * English content. Festival/wish keys match the slugs in src/festivals.mjs and
 * src/wishes.mjs. The English wish lists there (wishesEn) are reused and the
 * Hindi lists are shown as the second list on English pages.
 */
const festivals = {
  christmas: {
    name: 'Christmas',
    when: '25 December every year',
    where: 'All over the world; in India especially Goa, Kerala, the North-East and the big cities',
    intro: 'Christmas celebrates the birth of Jesus Christ. Today it is not only a festival of the Christian community but of everyone who believes in love, sharing and the hope of a new year.',
    sections: [
      { h: 'Why Christmas is celebrated', p: ['According to Christian belief, Jesus was born in a simple stable in Bethlehem. His message was to love one another, help those in need and learn to forgive. Christmas is the day to remember that message.', 'The date of 25 December began to be observed in Rome in the fourth century and was gradually adopted around the world.'] },
      { h: 'How it is celebrated', p: ['The night of 24 December is Christmas Eve. Churches hold midnight mass and people sing carols.', 'Homes put up a Christmas tree decorated with stars, bells, fairy lights and small gifts. Children love the story of Santa Claus bringing presents.', 'In India people bake plum cake and cookies, Goa and Kerala make special dishes, and neighbours send each other sweets and cake.'] },
      { h: 'Do something kind this Christmas', p: ['Spend some time at an orphanage or old-age home, give warm clothes to people who need them, or take a piece of cake to a neighbour who lives alone. That is what Christmas is really about.'] },
    ],
    faq: [
      { q: 'What date is Christmas?', a: 'Christmas is celebrated on 25 December every year. The evening of 24 December is called Christmas Eve.' },
      { q: 'Why do people decorate a Christmas tree?', a: 'An evergreen tree stays green even in winter, so it is seen as a sign of life and hope. A decorated tree brings joy and colour to the home.' },
      { q: 'Where in India is Christmas celebrated the most?', a: 'In Goa, Kerala, Mizoram, Nagaland, Meghalaya and in cities such as Mumbai, Kolkata and Bengaluru.' },
    ],
  },
  'new-year': {
    name: 'New Year',
    when: '1 January (celebrations begin on the night of 31 December)',
    where: 'All over the world',
    intro: 'New Year is celebrated on 1 January, the first day of the Gregorian calendar. It is a day to thank the year gone by and make fresh plans for the year ahead.',
    sections: [
      { h: 'Celebrating the New Year', p: ['On the night of 31 December people gather with family and friends and welcome the new year with a countdown at midnight. Fireworks, music and "Happy New Year" messages mark the night.', 'Many people in India start the year by visiting a temple, gurdwara, mosque or church on the first day.'] },
      { h: 'New Year resolutions', p: ['The new year is a good time to set yourself small goals — a daily walk, saving a little every month, learning a new language or skill. Keep resolutions small and clear, and they are easier to keep.', 'Keeping track of your spending is a good resolution too — you can use our free app Hisab Kitab for it.'] },
      { h: 'India\'s other new years', p: ['India also celebrates many regional new years — Chaitra Shukla Pratipada (the Hindu Nav Samvatsar), Gudi Padwa, Ugadi, Baisakhi, Pohela Boishakh, Puthandu and Vishu. Most of them fall in March or April.'] },
    ],
    faq: [
      { q: 'Why is New Year celebrated on 1 January?', a: 'Most of the world uses the Gregorian calendar, whose first day is 1 January, so the international new year is celebrated on this day.' },
      { q: 'When is the Hindu new year?', a: 'The Hindu Nav Samvatsar begins on Pratipada of the bright half of Chaitra, which usually falls in March or April.' },
    ],
  },
  lohri: {
    name: 'Lohri',
    when: 'Usually 13 January (the evening before Makar Sankranti)',
    where: 'Punjab, Haryana, Himachal Pradesh, Jammu and Delhi',
    intro: 'Lohri marks the end of winter and the joy of a new harvest. On this night people gather around a bonfire, sing songs, dance bhangra and giddha, and offer sesame, jaggery, rewri, peanuts and popcorn to the fire.',
    sections: [
      { h: 'The meaning of Lohri', p: ['Around Lohri the longest winter nights come to an end and the days begin to grow longer. For farmers it is a time to celebrate the rabi crop, especially sugarcane.', 'A family\'s first Lohri after a wedding or the birth of a baby is celebrated with great joy.'] },
      { h: 'The story of Dulla Bhatti', p: ['Lohri songs always include "Sundar mundriye ho, tera kaun vichara, Dulla Bhatti wala". According to folklore, Dulla Bhatti was a brave Punjabi of the Mughal era who rescued poor girls and arranged their weddings, which is why he is remembered on Lohri.'] },
      { h: 'What people eat on Lohri', p: ['Sesame and jaggery rewri, gajak, peanuts, popcorn, and for dinner sarson ka saag with makki ki roti.'] },
    ],
    faq: [
      { q: 'When is Lohri celebrated?', a: 'Lohri is celebrated on the night before Makar Sankranti, usually 13 January.' },
      { q: 'What is offered to the Lohri fire?', a: 'Sesame, jaggery, rewri, peanuts and popcorn are offered to the fire and then shared as prasad.' },
    ],
  },
  'makar-sankranti': {
    name: 'Makar Sankranti',
    when: 'Usually 14 January (15 January in some years)',
    where: 'All over India — under different names',
    intro: 'Makar Sankranti is the day the sun moves from Sagittarius (Dhanu) into Capricorn (Makar). It is one of the few Hindu festivals set by the sun, which is why its date stays almost the same every year.',
    sections: [
      { h: 'Uttarayan and its meaning', p: ['From this day the sun\'s northward journey (Uttarayan) is said to begin and the days slowly grow longer. It is considered an auspicious time — people bathe in the Ganga or other holy rivers and donate sesame, jaggery, khichdi and blankets.'] },
      { h: 'One festival, many names', p: ['In Gujarat it is called Uttarayan and the whole sky fills with kites. In Tamil Nadu the same season is Pongal, in Assam Magh Bihu (Bhogali Bihu), in Uttar Pradesh and Bihar Khichdi, and in Maharashtra people share tilgul saying "Tilgul ghya, god god bola" — take sesame and jaggery, and speak sweetly.'] },
      { h: 'Why sesame and jaggery', p: ['In winter, sesame and jaggery give the body warmth and strength. Sharing til-gud is also a sign of keeping relationships sweet.', 'When flying kites, avoid Chinese manja — it is deadly for birds and passers-by, and is banned in many states.'] },
    ],
    faq: [
      { q: 'Why does the date of Makar Sankranti stay almost the same?', a: 'Because it is set by the sun entering Capricorn, not by the moon. So it usually falls on 14 January and sometimes on 15 January.' },
      { q: 'What do people donate on Sankranti?', a: 'Sesame, jaggery, khichdi (rice and dal), blankets and warm clothes.' },
    ],
  },
  'republic-day': {
    name: 'Republic Day',
    when: '26 January every year',
    where: 'All of India — a national festival',
    intro: 'On 26 January 1950 the Constitution of India came into force and India became a sovereign, democratic republic. Republic Day remembers that historic day.',
    sections: [
      { h: 'The story of the Constitution', p: ['After almost three years of work, the Constituent Assembly adopted the Constitution on 26 November 1949 (now observed as Constitution Day). Dr B. R. Ambedkar chaired its drafting committee.', 'The date 26 January was chosen because on 26 January 1930 the Congress had resolved to seek "Purna Swaraj" (complete independence).'] },
      { h: 'How it is celebrated', p: ['A grand parade takes place on Kartavya Path in New Delhi, with contingents of the armed forces, tableaux from the states and cultural performances. The President hoists the national flag on this day.', 'Schools and offices hoist the flag, sing the national anthem and hold patriotic programmes.'] },
      { h: 'Respecting the tricolour', p: ['When hoisting the flag, keep saffron at the top, never let the flag touch the ground and never use a torn flag. After the programme, don\'t throw paper flags on the road — keep them respectfully.'] },
    ],
    faq: [
      { q: 'What is the difference between Republic Day and Independence Day?', a: 'Independence Day (15 August) marks freedom from British rule in 1947. Republic Day (26 January) marks the Constitution coming into force in 1950.' },
      { q: 'Who hoists the flag on 26 January?', a: 'The President hoists the flag on Republic Day; on Independence Day the Prime Minister hoists it at the Red Fort.' },
    ],
  },
  'vasant-panchami': {
    name: 'Vasant Panchami',
    when: 'Panchami of the bright half of Magh (usually late January or February)',
    where: 'Especially in North and East India; in Bengal as Saraswati Puja',
    intro: 'Vasant Panchami welcomes spring and is the day of worship of Goddess Saraswati, the goddess of knowledge. People wear yellow and cook yellow dishes on this day.',
    sections: [
      { h: 'Worship of Goddess Saraswati', p: ['Goddess Saraswati is the goddess of learning, music and the arts. On this day students place their books, pens and musical instruments before her and pray. In Bengal, Bihar and Odisha, schools and colleges celebrate Saraswati Puja with great enthusiasm.', 'Many families hold a child\'s "vidyarambh" — writing the first letters — on this day.'] },
      { h: 'Why yellow', p: ['In spring the mustard fields turn yellow with flowers. Yellow is seen as the colour of energy, light and knowledge, so people wear yellow and make saffron rice, boondi or yellow rice.'] },
      { h: 'Kites and spring festivities', p: ['In Punjab and nearby regions kites are flown on Vasant Panchami too. Many places hold music and poetry events.'] },
    ],
    faq: [
      { q: 'On which tithi is Vasant Panchami?', a: 'On Panchami of the bright half of Magh. The calendar date changes every year, usually late January or February.' },
      { q: 'Why do people wear yellow on this day?', a: 'Yellow stands for spring, mustard flowers and knowledge, and is considered dear to Goddess Saraswati.' },
    ],
  },
  'maha-shivratri': {
    name: 'Maha Shivratri',
    when: 'Chaturdashi of the dark half of Phalgun (usually February or March)',
    where: 'All over India and Nepal',
    intro: 'Maha Shivratri is the greatest night of worship of Lord Shiva. It is believed that Shiva and Parvati were married on this night. Devotees fast and stay awake through the night in prayer.',
    sections: [
      { h: 'How the puja is done', p: ['The Shiva linga is bathed with water, milk, curd, honey and Ganga water. Bel leaves, dhatura, aak flowers and bhang are offered, and devotees chant "Om Namah Shivaya".', 'Puja is done in four parts (prahar) through the night, and many temples hold bhajans and kirtan all night.'] },
      { h: 'Fasting', p: ['Some people keep a fast without water, while others eat fruit, milk and fasting foods such as sabudana and kuttu. Elderly people, the sick and pregnant women should fast only as their health allows.'] },
      { h: 'Famous places', p: ['Kashi Vishwanath (Varanasi), Mahakaleshwar in Ujjain, Somnath, Pashupatinath in Nepal and the twelve jyotirlingas draw huge crowds on this day.'] },
    ],
    faq: [
      { q: 'What is the difference between Maha Shivratri and the monthly Shivratri?', a: 'A monthly Shivratri falls on Chaturdashi of the dark half of every month. The one in Phalgun is the greatest, so it is called Maha Shivratri.' },
      { q: 'What is offered to the Shiva linga?', a: 'Water, milk, bel leaves, dhatura, aak flowers, sandalwood and bhasma. Tulsi is usually not offered to the Shiva linga.' },
    ],
  },
  holi: {
    name: 'Holi',
    when: 'Holika Dahan on Phalgun Purnima, the festival of colours the next day (usually March)',
    where: 'All over India and Nepal; Holi in Braj (Mathura, Vrindavan, Barsana) is the most famous',
    intro: 'Holi is the festival of colours, fun and togetherness. It celebrates the victory of good over evil and the arrival of spring. People forget old quarrels, put colour on each other and hug.',
    sections: [
      { h: 'Holika Dahan and the story of Prahlad', p: ['King Hiranyakashipu wanted everyone to worship him, but his son Prahlad was a devotee of Lord Vishnu. The king\'s sister Holika had a boon that fire could not burn her. She sat in a fire with Prahlad in her lap, but by God\'s grace Prahlad was saved and Holika burned.', 'In memory of this, Holika Dahan is held the night before Holi — a pile of wood and cow-dung cakes is lit and people walk around it.'] },
      { h: 'The festival of colours', p: ['The next day (Dhulandi) people play with colours, gulal and water from the morning. In Braj, Holi goes on for many days — Lathmar Holi in Barsana, the flower Holi of Vrindavan and the Holi of Mathura are famous worldwide.'] },
      { h: 'Food', p: ['Gujiya, dahi bhalle, malpua, papdi, namakpare and thandai are the taste of Holi.'] },
      { h: 'A safe Holi', p: ['Use natural or herbal colours, keep colour away from eyes and mouth, never put colour on animals and waste less water. Respect anyone who does not want to be coloured.'] },
    ],
    faq: [
      { q: 'When is Holika Dahan?', a: 'On the night of Phalgun Purnima, a day before the festival of colours. The exact muhurat is seen in the panchang.' },
      { q: 'Where is Lathmar Holi played?', a: 'In Barsana and Nandgaon in Uttar Pradesh, where women playfully hit men with sticks and the men protect themselves with shields.' },
      { q: 'How do I get Holi colour off my skin?', a: 'Before playing, put coconut or mustard oil on your face and hair. Afterwards wash with mild soap or besan and curd — don\'t scrub hard.' },
    ],
  },
  'eid-ul-fitr': {
    name: 'Eid ul-Fitr',
    when: '1 Shawwal — after Ramadan, when the new moon is sighted (the calendar date moves about 10-11 days earlier each year)',
    where: 'Muslim communities all over the world; everywhere in India',
    intro: 'Eid ul-Fitr is the festival of joy that comes after a month of fasting in Ramadan. It is also called "Meethi Eid" (sweet Eid) because every home makes sewaiyan and sweets.',
    sections: [
      { h: 'Ramadan and Eid', p: ['In Ramadan, the ninth month of the Islamic (Hijri) calendar, Muslims fast from dawn to sunset, pray more and help those in need. When Ramadan ends and the Shawwal moon is sighted, Eid is celebrated the next day.', 'The Hijri calendar follows the moon, so the calendar date of Eid moves about 10-11 days earlier every year.'] },
      { h: 'The day of Eid', p: ['In the morning people bathe, wear new clothes, eat something sweet and offer the Eid prayer at the Eidgah or mosque. Before the prayer it is necessary to give "fitra" (Zakat al-Fitr) so that poorer families can celebrate Eid too.', 'After the prayer people hug and say "Eid Mubarak". Elders give children "Eidi", and friends and relatives visit each other.'] },
      { h: 'Food', p: ['Sheer khurma, kimami sewaiyan, milk sewaiyan, biryani and kebabs are the pride of the Eid feast.'] },
    ],
    faq: [
      { q: 'What is the difference between Eid ul-Fitr and Eid ul-Adha?', a: 'Eid ul-Fitr is celebrated after Ramadan (the sweet Eid). Eid ul-Adha (Bakrid) comes about two months later, in Dhul Hijjah, at the time of Hajj.' },
      { q: 'What is fitra?', a: 'A charity given to the poor on behalf of every Muslim who can afford it, before the Eid prayer, so that they can celebrate Eid too.' },
    ],
  },
  'ram-navami': {
    name: 'Ram Navami',
    when: 'Navami of the bright half of Chaitra (usually March or April)',
    where: 'All over India; the biggest celebration is in Ayodhya',
    intro: 'Ram Navami celebrates the birth of Lord Rama. It is believed that Shri Ram was born in Ayodhya to King Dasharath and Queen Kaushalya at midday on Chaitra Shukla Navami. Chaitra Navratri also ends on this day.',
    sections: [
      { h: 'Maryada Purushottam', p: ['Shri Ram is called "Maryada Purushottam" — the ideal man who honoured every relationship and duty with complete integrity. Accepting fourteen years of exile to keep his father\'s word is the greatest example of his character.'] },
      { h: 'How it is celebrated', p: ['Temples hold the aarti of Ram\'s birth at midday, along with recitation of the Ramcharitmanas and bhajans. Processions are taken out in many places. Devotees fast and share panjiri, panchamrit and fruit as prasad.', 'Those who keep Chaitra Navratri end their fast on this day with kanya pujan.'] },
    ],
    faq: [
      { q: 'On which tithi is Ram Navami?', a: 'On Navami of the bright half of Chaitra, which usually falls in March or April.' },
      { q: 'At what time is the Ram Navami puja done?', a: 'Shri Ram is believed to have been born at midday, so the main puja and aarti are held at midday.' },
    ],
  },
  'raksha-bandhan': {
    name: 'Raksha Bandhan',
    when: 'Shravan Purnima (usually August)',
    where: 'All over India and Nepal',
    intro: 'Raksha Bandhan is the festival of love and trust between brothers and sisters. The sister ties a rakhi on her brother\'s wrist and prays for his long life; the brother promises to always stand by her.',
    sections: [
      { h: 'The rakhi tradition', p: ['In the morning the sister decorates a puja thali with roli, akshat (rice), a diya, sweets and the rakhi. She puts a tilak on her brother\'s forehead, does aarti, ties the rakhi and feeds him a sweet. The brother gives her a gift.', 'The panchang is checked for "Bhadra kaal" before tying the rakhi, because tying it during that time is not considered auspicious.'] },
      { h: 'Stories', p: ['In the Mahabharata, Krishna cut his finger at the time of Shishupal\'s death, and Draupadi tied a strip of her sari on it. Krishna kept that bond by protecting her honour later.', 'Today Raksha Bandhan is not limited to siblings — people tie rakhis to cousins, friends, soldiers and even trees.'] },
    ],
    faq: [
      { q: 'When is Raksha Bandhan?', a: 'On the full moon of Shravan, which usually falls in August.' },
      { q: 'Why is rakhi not tied during Bhadra kaal?', a: 'Bhadra kaal is considered inauspicious for good work in the panchang, so the rakhi is tied after it ends.' },
    ],
  },
  'chhath-puja': {
    name: 'Chhath Puja',
    when: 'Kartik Shukla Chaturthi to Saptami, six days after Diwali (13–16 November in 2026)',
    where: 'Biggest in Bihar, Jharkhand, eastern Uttar Pradesh and the Terai of Nepal; also in Delhi, Mumbai, Kolkata and abroad',
    intro: 'Chhath Puja is a four-day festival of worship of Surya Dev (the Sun) and Chhathi Maiya. Devotees (vratis) keep a waterless fast of about 36 hours and, standing in a river or pond, offer arghya first to the setting and then to the rising sun. It is seen as a festival of nature, cleanliness and discipline — no idol and no priest are needed.',
    sections: [
      { h: 'The four days', p: ['Day 1 — Nahay-Khay: devotees bathe in a river or pond, clean the house and eat one simple sattvik meal — pumpkin, rice and chana dal.', 'Day 2 — Kharna: after fasting all day, a prasad of jaggery kheer (rasiya) and roti is made in the evening. After eating it, the waterless fast of about 36 hours begins.', 'Day 3 — Sandhya Arghya: in the evening the family carries bamboo soops and daura baskets filled with thekua, fruits and sugarcane to the ghat. Standing in the water, the vratis offer arghya to the setting sun.', 'Day 4 — Usha Arghya: before dawn everyone returns to the ghat and arghya is offered to the rising sun. Then the fast is broken with prasad — this is called parana.'] },
      { h: 'Thekua, soop and kosi', p: ['Thekua is the special prasad of Chhath — made of wheat flour, jaggery and ghee, pressed on a wooden mould and fried. Bananas, coconuts, sugarcane, water chestnuts, citrus and seasonal fruits are placed with it in the soop.', 'In many homes a kosi is set up on the night of Sandhya Arghya — sugarcane stalks tied into a canopy with clay lamps and prasad beneath it. Traditional Chhath songs such as "Kelwa ke paat par ugelan Suraj Mal" and "Kaanch hi baans ke bahangiya" are sung through the night.'] },
      { h: 'Why Chhath is special', p: ['In Chhath even the setting sun is worshipped — a reminder to respect every stage of life. Whole neighbourhoods clean the ghats together, and rich and poor stand at the same ghat making the same offering.', 'The fast is very demanding, so elderly people, those who are unwell and pregnant women should fast only with the advice of a doctor and the family elders. Keep children away from deep water at the ghat.'] },
    ],
    faq: [
      { q: 'When is Chhath Puja in 2026?', a: 'Nahay-Khay on 13 November, Kharna on 14 November, Sandhya Arghya on Sunday 15 November and Usha Arghya on Monday 16 November. Check arghya times for your city in a local panchang, as they follow sunset and sunrise.' },
      { q: 'What is Kharna?', a: 'The second day of Chhath, when the vratis fast all day and eat a prasad of jaggery kheer and roti in the evening. The waterless fast begins after this.' },
      { q: 'How is thekua made?', a: 'Wheat flour, jaggery syrup, ghee and a little fennel or coconut are kneaded into a stiff dough, pressed on a mould and fried slowly in ghee or oil until golden.' },
    ],
  },
  'guru-nanak-jayanti': {
    name: 'Guru Nanak Jayanti',
    when: 'Kartik Purnima (usually November); also called Gurpurab or Prakash Parv',
    where: 'Sikh communities in India and all over the world; the biggest celebration is in Punjab',
    intro: 'Guru Nanak Jayanti celebrates the birth (prakash) of Guru Nanak Dev Ji, the founder of Sikhism and the first Sikh Guru. It is also called Gurpurab or Prakash Parv and is the biggest festival of the Sikh community.',
    sections: [
      { h: 'Guru Nanak Dev Ji', p: ['Guru Nanak Dev Ji was born in 1469 at Rai Bhoi di Talwandi, known today as Nankana Sahib in Pakistan. In Sikh tradition his Prakash Parv is celebrated on Kartik Purnima.', 'He gave the message of "Ik Onkar" — God is one. His teachings rest on three principles: Naam Japna (remembering God), Kirat Karni (earning an honest living) and Vand Chhakna (sharing your earnings with those in need). He opposed caste and inequality and treated everyone as equal.'] },
      { h: 'How Gurpurab is celebrated', p: ['Two days before the festival an Akhand Path begins in gurdwaras — an unbroken reading of the Guru Granth Sahib for about 48 hours.', 'A day before, a Nagar Kirtan procession is led by the Panj Pyare. The Guru Granth Sahib is carried in a palki, the sangat sings shabad kirtan and gatka (Sikh martial art) is performed.', 'In the days before the festival, Prabhat Pheris go out early in the morning. On the day, gurdwaras hold kirtan, katha and ardas, and in the langar people of every faith and caste sit together to eat.'] },
      { h: 'Langar and seva', p: ['The tradition of langar (community kitchen) was started by Guru Nanak Dev Ji. Everyone sits in rows on the floor and eats the same food — rich or poor, of any faith. On Gurpurab many people do seva in the gurdwara — helping in the kitchen, washing dishes or looking after shoes.'] },
    ],
    faq: [
      { q: 'When is Guru Nanak Jayanti celebrated?', a: 'On the full moon of Kartik, which usually falls in November. The calendar date changes every year.' },
      { q: 'What is an Akhand Path?', a: 'An unbroken reading of the Guru Granth Sahib from start to finish in about 48 hours, which begins two days before Gurpurab.' },
      { q: 'How do people greet each other on Gurpurab?', a: '"Gurpurab diyan lakh lakh vadhaiyan" or "Happy Gurpurab" — both are common.' },
    ],
  },
  diwali: {
    name: 'Diwali',
    when: 'Kartik Amavasya (usually October or November); five days from Dhanteras to Bhai Dooj',
    where: 'All over India and among Indians around the world',
    intro: 'Diwali (Deepavali) is the festival of lights — the victory of light over darkness and good over evil. Every home lights diyas, and Goddess Lakshmi and Lord Ganesha are worshipped.',
    sections: [
      { h: 'Why Diwali is celebrated', p: ['It is believed that after defeating Ravana and spending fourteen years in exile, Shri Ram, Mata Sita and Lakshman returned to Ayodhya on this day. The people of Ayodhya welcomed them by lighting diyas.', 'For Jains it is the day of Lord Mahavira\'s nirvana, and Sikhs celebrate Bandi Chhor Divas at the same time.'] },
      { h: 'Five days of festivities', p: ['Dhanteras (a day to buy utensils, gold and silver), Naraka Chaturdashi or Chhoti Diwali, the main Diwali (Lakshmi-Ganesh puja), Govardhan Puja and Bhai Dooj together make up the festival of lights.'] },
      { h: 'Preparations and food', p: ['Before Diwali homes are cleaned and decorated and rangoli is made. Laddoos, kaju katli, shakkarpare, chakli and gujiya are prepared and sweets are shared with relatives.', 'Burst fewer firecrackers and follow your city\'s rules — the air stays cleaner and animals are not frightened.'] },
    ],
    faq: [
      { q: 'What are the five days of Diwali?', a: 'Dhanteras, Naraka Chaturdashi (Chhoti Diwali), Diwali (Lakshmi Puja), Govardhan Puja and Bhai Dooj.' },
      { q: 'Who is worshipped on Diwali?', a: 'Mainly Goddess Lakshmi (goddess of wealth and prosperity) and Lord Ganesha (god of auspicious beginnings).' },
    ],
  },
  "guru-gobind-singh-jayanti": {
    "name": "Guru Gobind Singh Jayanti",
    "when": "Paush Shukla Saptami — usually late December or January (check the exact date with your gurdwara)",
    "where": "Gurdwaras across India and the world; especially Patna Sahib, Anandpur Sahib and Hazur Sahib (Nanded)",
    "intro": "Guru Gobind Singh Ji was the tenth Sikh Guru. His birthday is celebrated as Prakash Purab or Gurpurab with kirtan, Akhand Path, Nagar Kirtan and langar, and the sangat remembers his teachings of courage, equality and seva.",
    "sections": [
      {
        "h": "The life of Guru Gobind Singh Ji",
        "p": [
          "He was born in 1666 at Patna Sahib, Bihar. His father, Guru Tegh Bahadur Ji, was the ninth Guru. After his father's martyrdom in 1675 he became Guru at just nine years of age.",
          "He was both a warrior and a poet, and knew Punjabi, Braj, Persian and Sanskrit. All four of his sons, the Sahibzade, were martyred; the younger Sahibzade are remembered on 26 December as \"Veer Baal Diwas\"."
        ]
      },
      {
        "h": "Founding the Khalsa",
        "p": [
          "On Baisakhi 1699 at Anandpur Sahib, the Guru founded the Khalsa. He gave amrit to the first five Sikhs, the Panj Pyare, and then took amrit from them himself — showing that the Guru and the Sikh are equal.",
          "The five Ks of the Khalsa are kesh (uncut hair), kanga (comb), kara (steel bangle), kachera (undergarment) and kirpan. Every Sikh man took the name \"Singh\" and every woman \"Kaur\"."
        ]
      },
      {
        "h": "Guru Granth Sahib — the eternal Guru",
        "p": [
          "In 1708 at Hazur Sahib (Nanded, Maharashtra), the Guru declared that there would be no human Guru after him; the Guru Granth Sahib is the Guru forever. That is why it is honoured as the Guru in every gurdwara."
        ]
      }
    ],
    "faq": [
      {
        "q": "When is Guru Gobind Singh Jayanti celebrated?",
        "a": "On Paush Shukla Saptami, which usually falls in late December or January. The date changes every year, so check with your gurdwara or calendar."
      },
      {
        "q": "Who were the Panj Pyare?",
        "a": "The first five Sikhs to take amrit in 1699: Bhai Daya Singh, Bhai Dharam Singh, Bhai Himmat Singh, Bhai Mohkam Singh and Bhai Sahib Singh."
      }
    ]
  },
  "pongal": {
    "name": "Pongal",
    "when": "Usually four days from 14 or 15 January — the start of the Tamil month of Thai",
    "where": "Tamil Nadu, Puducherry and Tamil families around the world",
    "intro": "Pongal is the harvest festival of Tamil Nadu, a thank-you to the Sun, the earth, the rain and the animals that help in the fields. In North India the same season brings Makar Sankranti and Lohri.",
    "sections": [
      {
        "h": "What \"Pongal\" means",
        "p": [
          "In Tamil, \"pongal\" means to boil over. New rice, milk and jaggery are cooked in a new clay pot, and when the milk bubbles over everyone shouts \"Pongalo Pongal!\" — may prosperity overflow in the home.",
          "Besides sweet sakkarai pongal, savoury ven pongal is also made. Beautiful kolam designs are drawn with rice flour at the doorstep, and sugarcane is a must."
        ]
      },
      {
        "h": "The four days of Pongal",
        "p": [
          "Bhogi: clearing out old, unused things and starting fresh.",
          "Thai Pongal: the main day, when pongal is offered to the Sun.",
          "Mattu Pongal: the cows and bullocks that help on the farm are bathed, decorated and honoured.",
          "Kaanum Pongal: visiting relatives, going out together and taking the blessings of elders."
        ]
      }
    ],
    "faq": [
      {
        "q": "What does Pongal mean?",
        "a": "In Tamil, \"pongal\" means boiling over. Rice, milk and jaggery boiling over in a new pot is a sign of plenty coming into the home."
      },
      {
        "q": "What is Mattu Pongal?",
        "a": "The third day of Pongal, when cows and bullocks that help with farming are bathed, their horns painted and garlanded, and they are honoured."
      }
    ]
  },
  "baisakhi": {
    "name": "Baisakhi (Vaisakhi)",
    "when": "Usually 13 April (14 April in some years)",
    "where": "Punjab, Haryana and across North India; the same day is New Year in several parts of the country",
    "intro": "Baisakhi celebrates the ripening of the rabi harvest, especially wheat. Punjab dances bhangra and giddha to the dhol, fairs are held, and for Sikhs the day is very special as the founding day of the Khalsa.",
    "sections": [
      {
        "h": "The joy of the harvest",
        "p": [
          "By Baisakhi the golden wheat is ready to be cut. Farmers thank God for the fruit of their hard work, wear new clothes, and fairs are held in village after village."
        ]
      },
      {
        "h": "Founding of the Khalsa (1699)",
        "p": [
          "On Baisakhi 1699, Guru Gobind Singh Ji founded the Khalsa at Anandpur Sahib and gave amrit to the Panj Pyare. So gurdwaras hold kirtan, ardas, Nagar Kirtan and langar on this day."
        ]
      },
      {
        "h": "One day, many names",
        "p": [
          "Around the same time Bengal celebrates Poila Boishakh (Bengali New Year), Assam Bohag (Rongali) Bihu, Tamil Nadu Puthandu (Tamil New Year) and Kerala Vishu.",
          "On Baisakhi day, 13 April 1919, British troops fired on unarmed people at Jallianwala Bagh in Amritsar. Those martyrs are remembered on this day too."
        ]
      }
    ],
    "faq": [
      {
        "q": "When is Baisakhi celebrated?",
        "a": "Usually on 13 April, and on 14 April in some years. It follows the solar calendar, so the date stays almost the same."
      },
      {
        "q": "How is Baisakhi connected to the Khalsa?",
        "a": "On Baisakhi 1699, Guru Gobind Singh Ji founded the Khalsa at Anandpur Sahib, so for Sikhs it is also Khalsa Sajna Diwas."
      }
    ]
  },
  "eid-ul-adha": {
    "name": "Eid ul-Adha (Bakrid)",
    "when": "10 Dhul Hijjah, the 12th month of the Islamic (Hijri) calendar — about 10–11 days earlier every year, fixed by the moon sighting",
    "where": "All over India and the world",
    "intro": "Eid ul-Adha, also called Bakrid, is the Eid of sacrifice and trust in Allah. It remembers the sacrifice of Prophet Ibrahim (peace be upon him), who was ready to give up what he loved most at Allah's command. It falls during the days of Hajj.",
    "sections": [
      {
        "h": "The story of the sacrifice",
        "p": [
          "According to Islamic tradition, Prophet Ibrahim (AS) saw in a dream that he was sacrificing his son, Prophet Ismail (AS), for Allah. Father and son were both ready to obey. Then Allah sent a ram in Ismail's place.",
          "The story teaches complete trust in Allah and the readiness to give up even what we love in His way."
        ]
      },
      {
        "h": "How Eid is celebrated",
        "p": [
          "In the morning people bathe, wear new or clean clothes and offer the Eid ul-Adha prayer at the Eidgah or mosque, then embrace each other saying \"Eid Mubarak\".",
          "Those for whom it is required perform qurbani (animal sacrifice). The meat is shared in three parts — one for the family, one for relatives and friends, and one for people in need.",
          "Keeping things clean, following local laws and respecting the feelings of neighbours while doing qurbani is also part of the spirit of Eid."
        ]
      },
      {
        "h": "Hajj and Dhul Hijjah",
        "p": [
          "Dhul Hijjah is the last month of the Islamic year. Hajj takes place in Makkah between the 8th and 12th of the month, and the 9th is the Day of Arafah. Eid ul-Adha comes in these days of Hajj."
        ]
      }
    ],
    "faq": [
      {
        "q": "When is Bakrid celebrated?",
        "a": "On 10 Dhul Hijjah in the Islamic calendar, about two months and ten days after Eid ul-Fitr. The exact date is fixed by the moon-sighting announcement."
      },
      {
        "q": "What is the difference between Eid ul-Fitr and Eid ul-Adha?",
        "a": "Eid ul-Fitr comes after the fasts of Ramzan (the \"sweet Eid\"). Eid ul-Adha is the Eid of sacrifice during the days of Hajj."
      }
    ]
  },
  "janmashtami": {
    "name": "Janmashtami",
    "when": "Bhadrapada Krishna Ashtami — usually August or September (the Smarta and Vaishnava dates sometimes differ by a day; check your panchang)",
    "where": "All over India; especially Mathura, Vrindavan, Dwarka and ISKCON temples",
    "intro": "Janmashtami celebrates the birth of Lord Krishna. He is said to have been born at midnight in Kansa's prison in Mathura, so on this day people fast and celebrate Kanha's birth at 12 midnight.",
    "sections": [
      {
        "h": "The story of Krishna's birth",
        "p": [
          "Kansa, king of Mathura, feared the eighth son of his sister Devaki, so he locked Devaki and Vasudeva in prison. On the night Krishna, the eighth son, was born, the guards fell asleep, the locks opened, and Vasudeva carried the baby across the flooded Yamuna to Nanda and Yashoda's home in Gokul.",
          "Krishna's childhood in Gokul and Vrindavan — stealing butter, dancing the raas with the gopis, lifting Govardhan hill — lives on in songs and tableaux."
        ]
      },
      {
        "h": "How it is celebrated",
        "p": [
          "People fast all day, decorate jhankis in temples and homes, dress Laddu Gopal in new clothes and rock him in a swing. At midnight the birth aarti is sung with conches and bells, and panjiri, makhan-mishri and panchamrit are shared as prasad.",
          "In Maharashtra the next day is \"Dahi Handi\" — a pot hung high up is broken by forming a human pyramid, in memory of Krishna stealing butter."
        ]
      }
    ],
    "moreWishes": [
      "Radhe Radhe! May Lord Krishna give you the wisdom of the Gita and the courage of Govardhan."
    ],
    "faq": [
      {
        "q": "When is Janmashtami celebrated?",
        "a": "On Krishna Ashtami of Bhadrapada, usually in August or September. Sometimes it is celebrated over two days, so check your panchang."
      },
      {
        "q": "What is Dahi Handi?",
        "a": "On the day after Janmashtami, a pot of curd and butter hung high up is broken by forming a human pyramid, recalling Krishna stealing butter."
      }
    ]
  },
  "onam": {
    "name": "Onam",
    "when": "In the Malayalam month of Chingam, on Thiruvonam — usually August or September; ten days from Atham",
    "where": "Kerala and Malayali families around the world",
    "intro": "Onam is Kerala's biggest festival — a harvest celebration and the welcome of King Mahabali. For ten days flower rangolis (pookalam) are made in front of homes, and on Thiruvonam families share the Onasadya feast on banana leaves.",
    "sections": [
      {
        "h": "The story of King Mahabali",
        "p": [
          "According to legend, Mahabali (Maveli) was a very kind king in whose kingdom everyone was equal and happy. Lord Vishnu's Vamana avatar asked him for three steps of land and sent him to the netherworld, but granted him a wish to visit his people once a year. Onam welcomes his return."
        ]
      },
      {
        "h": "Pookalam, Onasadya and Vallam Kali",
        "p": [
          "From Atham the flower pookalam in front of the house grows bigger every day. On Thiruvonam the Onasadya is served on a banana leaf — more than twenty dishes, including rice, sambar, avial, olan, pappadam, banana chips and several kinds of payasam.",
          "Snake-boat races (Vallam Kali), the tiger dance Pulikali and the women's circle dance Kaikottikali are the signs of Onam."
        ]
      }
    ],
    "faq": [
      {
        "q": "When is Onam celebrated?",
        "a": "On Thiruvonam in the Malayalam month of Chingam, usually in August or September. The celebrations start on Atham and last ten days."
      },
      {
        "q": "What is Onasadya?",
        "a": "The vegetarian Thiruvonam feast served on a banana leaf — more than twenty dishes including rice, sambar, avial, olan, pappadam, chips and payasam."
      }
    ]
  },
  "ganesh-chaturthi": {
    "name": "Ganesh Chaturthi",
    "when": "Bhadrapada Shukla Chaturthi — usually late August or September; immersion ten days later on Anant Chaturdashi",
    "where": "All over India; celebrated in a big way in Maharashtra, Goa, Karnataka, Telangana and Andhra Pradesh",
    "intro": "Ganesh Chaturthi celebrates the birth of Lord Ganesha, remover of obstacles and god of wisdom. Idols are installed in homes and pandals, modak is offered, and after one and a half, three, five, seven or ten days the idol is immersed to the chant of \"Ganpati Bappa Morya, pudhchya varshi lavkar ya\" (come back soon next year).",
    "sections": [
      {
        "h": "The public Ganeshotsav",
        "p": [
          "Ganesh puja at home is centuries old, but in 1893 Lokmanya Bal Gangadhar Tilak made it a public festival in Pune so that people could come together for the freedom movement. Today lakhs of people visit pandals such as Mumbai's Lalbaugcha Raja."
        ]
      },
      {
        "h": "Modak and the puja",
        "p": [
          "Ganpati's favourite offering is modak — rice-flour dumplings filled with coconut and jaggery and steamed. Durva grass, red flowers and laddoos are also offered.",
          "It is believed one should not look at the moon on the night of Ganesh Chaturthi, which is why it is also called \"Kalank Chaturthi\"."
        ]
      },
      {
        "h": "Eco-friendly Ganpati",
        "p": [
          "Idols of plaster of Paris and chemical paint pollute rivers and the sea. A clay (shadu) idol, natural colours and immersion at home in a bucket or an artificial pond — that is true devotion and respect for nature."
        ]
      }
    ],
    "faq": [
      {
        "q": "When is Ganesh Chaturthi celebrated?",
        "a": "On Shukla Chaturthi of Bhadrapada, usually in late August or September. Check your panchang for the exact date and muhurat."
      },
      {
        "q": "When is the Ganpati immersion?",
        "a": "Depending on family tradition, after one and a half, three, five or seven days; public pandals usually immerse on the tenth day, Anant Chaturdashi."
      }
    ]
  },
  "navratri": {
    "name": "Navratri",
    "when": "Sharad Navratri runs from Ashwin Shukla Pratipada to Navami — usually late September or October (Chaitra Navratri comes in March–April)",
    "where": "All over India; garba and dandiya in Gujarat, Durga Puja in Bengal",
    "intro": "Navratri means \"nine nights\" — a festival of worshipping the nine forms of Goddess Durga. People fast, install the kalash (ghatasthapana), and on the tenth day Vijayadashami (Dussehra) is celebrated.",
    "sections": [
      {
        "h": "The nine forms of Maa Durga",
        "p": [
          "Over the nine days these forms are worshipped in order: Shailputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri and Siddhidatri.",
          "On Ashtami or Navami, kanya pujan is done — young girls are honoured as forms of the Goddess and served halwa, puri and chana."
        ]
      },
      {
        "h": "Garba, dandiya and Durga Puja",
        "p": [
          "In Gujarat, every night people dance garba in circles around the Goddess's lamp (garbo) and play dandiya raas with colourful sticks.",
          "In Bengal, Assam and Odisha, Durga Puja is celebrated from Shashthi to Dashami — huge pandals, the beat of the dhak, the dhunuchi dance, and immersion on Dashami."
        ]
      }
    ],
    "faq": [
      {
        "q": "How many times a year does Navratri come?",
        "a": "Mainly twice: Chaitra Navratri (March–April) and Sharad Navratri (September–October). Dussehra follows Sharad Navratri. There are also less-known Gupt Navratris."
      },
      {
        "q": "When is kanya pujan done?",
        "a": "Usually on Ashtami or Navami, according to family tradition. Young girls are honoured as the Goddess and given food and gifts."
      }
    ]
  },
  "dussehra": {
    "name": "Dussehra (Vijayadashami)",
    "when": "Ashwin Shukla Dashami — the day after Sharad Navratri, usually in October; Diwali comes about 20 days later",
    "where": "All over India; Delhi's Ramlilas, Mysuru Dasara, Kullu Dussehra and Bengal's Bijoya Dashami are famous",
    "intro": "Dussehra or Vijayadashami is the festival of the victory of good over evil. On this day Lord Rama defeated Ravana, and Goddess Durga slew Mahishasura. In the evening, effigies of Ravana, Kumbhakarna and Meghnad are burned.",
    "sections": [
      {
        "h": "Ramlila and Ravan Dahan",
        "p": [
          "During Navratri, towns stage the Ramlila, the story of Rama from his birth to the victory over Lanka. On Dussehra evening the effigies are burned in open grounds with fireworks.",
          "If you go to watch, keep children away from the fire and stay careful in the crowd."
        ]
      },
      {
        "h": "One festival, many colours",
        "p": [
          "Mysuru (Karnataka) celebrates a ten-day Dasara that ends with the royal \"Jamboo Savari\" procession. In Kullu, Himachal Pradesh, Dussehra begins on this day and lasts a week, with deities from across the valley arriving on chariots.",
          "In Bengal it is Bijoya Dashami — married women play sindoor khela, Maa Durga is immersed, and people embrace saying \"Shubho Bijoya\". South India celebrates Ayudha Puja, and in Maharashtra apta leaves are exchanged as \"gold\"."
        ]
      }
    ],
    "faq": [
      {
        "q": "When is Dussehra celebrated?",
        "a": "On Ashwin Shukla Dashami, the day after Sharad Navratri, usually in October. Check your panchang for the exact date."
      },
      {
        "q": "How many days are there between Dussehra and Diwali?",
        "a": "About 20 days. Diwali is believed to celebrate Lord Rama's return to Ayodhya after the victory over Lanka."
      }
    ]
  },
};

const wishes = {
  'good-morning': {
    name: 'Good Morning',
    greet: 'a very Good Morning',
    intro: 'A short morning message can make someone\'s whole day better. Here are simple, heartfelt good-morning wishes for family, friends and office groups.',
    about: [
      'Sending a "good morning" has become a daily habit in India. Parents send it to children, friends to friends, and relatives start the day in the family group with a sweet message. It keeps people close even when they live far apart.',
      'A good morning message works best when it is short, carries a kind thought or a prayer, and gives the reader a reason to smile. Avoid long forwards and unverified claims — your own short message means more.',
      'A small tip: instead of the same message every day, use the person\'s name now and then, or wish them luck for their work, exam or journey. With the "Make your own wish" button below you can send a link with your name.',
    ],
    faq: [
      { q: 'When should I send a good morning message?', a: 'Usually between 6 and 10 am. In office or large groups, avoid sending very early (before 5 am) so nobody\'s sleep is disturbed.' },
      { q: 'How do you say good morning in Hindi?', a: '"Suprabhat" (सुप्रभात) is the most common. "Shubh prabhat" (शुभ प्रभात) sounds a little more formal.' },
    ],
  },
  birthday: {
    name: 'Birthday',
    greet: 'a very Happy Birthday',
    intro: 'Remembering someone\'s birthday and wishing them from the heart is the best gift. Here are birthday messages for mom and dad, brother and sister, friends, your partner and colleagues.',
    about: [
      'A birthday is the most special day of the year for everyone. Even a small message on this day is remembered, especially when it has their name and something only the two of you know.',
      'Match the message to the relationship — respect and blessings for parents, a little fun for friends, simple and polite for colleagues. The first message at midnight always feels special!',
      'Copy a message below, or use "Make your own wish" to send a link with your name. You can also make a birthday card in the Wish Card Maker.',
    ],
    faq: [
      { q: 'When should I send birthday wishes?', a: 'To close ones at midnight or early morning, to others any time during the day. If you are late, a "Belated Happy Birthday" is still nice to receive.' },
      { q: 'How do you say Happy Birthday in Hindi?', a: '"Janmdin mubarak ho" or "Janmdin ki hardik shubhkamnayein" — both are correct and common.' },
    ],
  },
  anniversary: {
    name: 'Wedding Anniversary',
    greet: 'a very Happy Anniversary',
    intro: 'A wedding anniversary celebrates the years spent together. Here are anniversary wishes for your partner, your parents, your brother and sister-in-law, and friends.',
    about: [
      'The best anniversary message remembers the moments spent together and blesses the years ahead. Write from the heart for your partner, and choose words of respect and blessing for parents and relatives.',
      'Families often hold a small celebration for parents\' 25th (silver jubilee) or 50th (golden jubilee) anniversary — a card with old photographs is always loved on such days.',
    ],
    faq: [
      { q: 'What are the 25th and 50th anniversaries called?', a: 'The 25th anniversary is the silver jubilee and the 50th is the golden jubilee.' },
      { q: 'How do you say Happy Anniversary in Hindi?', a: '"Shaadi ki saalgirah mubarak ho" or "Shaadi ki saalgirah ki hardik shubhkamnayein".' },
    ],
  },
  'rajab-mubarak': {
    name: 'Rajab Mubarak',
    greet: 'a blessed Rajab',
    intro: 'Rajab is the seventh month of the Islamic calendar and one of the four sacred months. When the Rajab moon is sighted, many people wish each other "Rajab Mubarak", because Sha\'ban and then Ramadan come after it.',
    about: [
      'The Quran (Surah At-Tawbah 9:36) says there are twelve months with Allah, four of them sacred — Muharram, Rajab, Dhu al-Qa\'dah and Dhu al-Hijjah. In these months believers are especially taught to avoid wrongdoing and quarrels and to do more good.',
      'Many Muslims observe the 27th night of Rajab as Shab-e-Miraj — the night linked with the Isra and Mi\'raj journey of the Prophet ﷺ. Practices differ between regions and schools of thought, so respect each other\'s views.',
      'In Rajab many people recite the dua "Allahumma barik lana fi Rajab wa Sha\'ban wa ballighna Ramadan" — O Allah, bless us in Rajab and Sha\'ban and let us reach Ramadan. Scholars say the chain of this narration is weak, but it is still widely recited as a dua.',
    ],
    faq: [
      { q: 'Which month is Rajab?', a: 'Rajab is the seventh month of the Islamic (Hijri) calendar, after Jumada al-Akhirah and before Sha\'ban.' },
      { q: 'Which are the four sacred months?', a: 'Muharram, Rajab, Dhu al-Qa\'dah and Dhu al-Hijjah.' },
      { q: 'When will Rajab begin?', a: 'When the moon is sighted. In 2026 it is expected around 10-11 December — check the exact date with your mosque.' },
    ],
  },
  'jumma-mubarak': {
    name: 'Jumma Mubarak',
    greet: 'Jumma Mubarak',
    intro: 'Jumma (Friday) is considered the most blessed day of the week in Islam. Mosques hold the Friday prayer at midday, and people wish each other "Jumma Mubarak" with prayers.',
    about: [
      'On Friday the midday prayer (Zuhr) is replaced by the Friday congregational prayer, before which the imam gives a sermon (khutbah). Surah Al-Jumu\'ah of the Quran mentions this prayer.',
      'On this day it is recommended to take a bath (ghusl), wear clean clothes and perfume, go to the mosque early, send durood and recite Surah Al-Kahf. Many people also give charity (khairat).',
      'Saying "Jumma Mubarak" is a warm tradition that builds brotherhood. Keep your message respectful and simple.',
    ],
    faq: [
      { q: 'When is the Friday prayer?', a: 'On Friday at midday, at the time of Zuhr. The exact time differs from mosque to mosque, so check with your nearest mosque.' },
      { q: 'Why is Surah Al-Kahf read on Friday?', a: 'Hadith mention the virtue of reading Surah Al-Kahf on Friday, so many people recite it on this day.' },
    ],
  },
};

const games = {
  'morning-exercise': { name: 'Morning 2-Minute Challenge', desc: '8 easy moves with a cartoon coach — a timer, a daily 🔥 streak, badges and WhatsApp challenges for friends. Just 2 minutes (15 seconds a move), no camera, no login.' },
  'meenar': { name: 'Brahma ki Meenar — Tower of Hanoi', desc: 'Move the tower of golden discs to another peg — one at a time, never a big one on a small one. 3 to 7 discs, hints, stars for fewest moves.' },
  'matke': { name: 'Do Matke — Water Jug Puzzle', desc: 'Measure exactly 4 litres with a 3- and a 5-litre pot — fill, empty, pour. Then 6 litres with 4 and 9, and split 8 into 4 + 4.' },
  'pul': { name: 'Raat ka Pul — Bridge & Torch', desc: 'A dark night, a weak bridge and one torch — get 4 people across in 17 minutes. Two at a time, at the slower pace. Three levels.' },
  'diye': { name: 'Diye Jalao — Light the Lamps', desc: 'Tap a diya — it and its neighbours flip. Light every lamp on 3×3, 4×4 and 5×5 boards. Hints and stars.' },
  'gotiyan': { name: 'Gotiyan — Peg Solitaire', desc: 'The old Brainvita puzzle: jump marbles over each other and leave just one — up to the full 32-marble board. Undo and hints.' },
  'jaadui-varg': { name: 'Jaadui Varg — Magic Square', desc: 'Fill the square so every row, column and diagonal adds up the same — from 3×3 to the 1,000-year-old Khajuraho 4×4 square.' },
  'khiskao': { name: 'Khiskao Tasveer — Sliding Puzzle', desc: 'Slide the pieces into the empty space and rebuild a sunset palace picture — 3×3 and 4×4. Hints and stars.' },
  'nadi-paar': { name: 'Nadi Paar — River Crossing Puzzle', desc: 'The classic brain puzzle as a game: take the farmer, tiger, goat and grass across without anything getting eaten — then Dad and two kids, and 3 guards with 3 thieves. Hints, stars for fewest moves, WhatsApp challenge.' },
  quiz: { name: 'Bharat Quiz — Daily India GK', desc: '10 questions a day, 10 seconds each: states and capitals, national symbols, history, geography, science, sports and culture. A fact after every answer, topic practice, and a WhatsApp score challenge.' },
  shabd: { name: 'Aaj ka Shabd — Word of the Day', desc: 'A new 5-letter word every day: guess it in 6 tries. Hindi words in Roman letters (with meaning) or English words. Colours show which letters are right; share your result on WhatsApp and keep your streak.' },
  patang: { name: 'Kite Fight', desc: 'Steer your kite, cut other kites’ strings — “Wo kaata!” — protect your own, catch til-gud laddoos and keep away from birds. 60 seconds, combos and a WhatsApp challenge.' },
  zumba: { name: 'Home Zumba', desc: 'A home dance workout for women — 8 fun moves to music, a cartoon coach who gets fitter with every move, a voice coach, a daily 🔥 streak and challenges for friends.' },
  chhath: { name: 'Chhath Ghat', desc: 'Take the holy dip at dawn, offer arghya to the rising sun at the right moment, then catch thekua, bananas and sugarcane in your soop to break the fast. Three stages, temple bells and splashes, WhatsApp challenge.' },
  'new-year': { name: 'Fireworks Pop', desc: 'Tap the rockets rising into the sky and burst them — at the very top for a Perfect, quickly for combos. With a live countdown to the new year.' },
  christmas: { name: 'Catch Santa\'s Gifts', desc: 'Steer Santa\'s sleigh, catch the falling gifts, dodge the coal and challenge friends on WhatsApp. In Hindi, Hinglish, English and Bengali.' },
  'saal-ka-safar': { name: 'Journey of the Year 2026 → 2027', desc: 'Run through 2026 touching the year\'s memories, count down 10…1 and enter 2027 with fireworks, dhol and dancing.' },
  'chidiya-udd': { name: 'Chidiya Udd (Birdie, Fly!)', desc: 'The childhood game: tap only if it really flies! Parrot, fly… buffalo, fly? 48 things, 3 lives, faster every round, with a voice caller.' },
  'saanp-seedhi': { name: 'Saanp-Seedhi (Snakes & Ladders)', desc: 'The childhood board game: play the computer or 2–4 friends on one phone. Every ladder a good habit, every snake a bad one.' },
  'parade-ki-taal': { name: 'Parade ki Taal (Parade Beat)', desc: 'Tap on the drum beat so the Republic Day parade marches in step: Army, BSF camels, NCC band, then the tricolour flypast.' },
  'chaand-dhundo': { name: 'Chaand Dhundo (Find the Crescent)', desc: 'Use the telescope to find the thin new crescent in the evening sky before it sets — Venus, planes and kites will try to fool you! 10 evenings.' },
  'basant-sargam': { name: 'Basant ki Sargam', desc: 'The petals of a spring flower play Sa Re Ga Ma Pa Dha Ni like Maa Saraswati\'s veena — repeat the tune, one note longer every round. Vasant Panchami game with a practice mode.' },
  'rang-barsao': { name: 'Rang Barsao (Holi)', desc: 'Throw dry gulal at friends peeping out of a Braj lane — favourite colour scores double. No colour on anyone who says no, and never on animals! 60 seconds.' },
  'kanche': { name: 'Kanche (Marbles)', desc: 'The childhood marbles game: pull back and flick to knock marbles out of the circle or roll into the gucchi. 6 levels with stars — no bets, just aim.' },
  'raja-mantri-chor-sipahi': { name: 'Raja Mantri Chor Sipahi', desc: 'The old chit game on one phone: 4 friends pass it round to see their chits, or play the computer. Mantri ji, who is the Chor? 5 or 10 rounds.' },
  'langar-seva': { name: 'Langar Seva', desc: 'Do seva in the langar this Gurpurab: serve prashada, dal, kheer and water to the sangat in pangat. 60 seconds, no music, with Guru Nanak Dev Ji\'s teachings.' },
};

const apps = {
  hisab: { desc: 'Note daily expenses, income and lend/borrow. Your data stays on your phone or in your own Google Drive. Installs and works offline.' },
  'wish-card': { desc: 'Pick a festival, add names, make a beautiful greeting card and send it on WhatsApp or download it.', tag: 'Free tool' },
};

export { festivals, wishes, games, apps };
