/**
 * Small apps under nextgrade.in. Each gets a card on /apps/ and the home page.
 * Add a new subdomain app here: { slug, name, url, emoji, tag, desc }.
 */
const apps = [
  {
    slug: 'hisab',
    name: 'Hisab Kitab',
    url: 'https://hisab.nextgrade.in/',
    emoji: '📒',
    tag: 'Free app',
    desc: 'रोज़ का खर्च, आमदनी और उधार-लेन-देन लिखें। डेटा आपके फ़ोन या आपकी अपनी Google Drive में रहता है। Install होता है, ऑफ़लाइन चलता है।',
    descEn: 'Daily expenses, income and lend/borrow records. Data stays on your phone or your own Google Drive. Installs and works offline.',
  },
  {
    slug: 'wish-card',
    name: 'Wish Card Maker',
    url: '/wish-card/',
    emoji: '💌',
    tag: 'Free tool',
    desc: 'त्योहार चुनें, नाम लिखें, सुंदर शुभकामना कार्ड बनाएं और WhatsApp पर भेजें या डाउनलोड करें।',
    descEn: 'Pick a festival, add names, make a greeting card and share it on WhatsApp or download it.',
  },
  {
    slug: 'desi-games',
    name: 'Desi Games — देसी गेम्स',
    url: 'https://desi-games.nextgrade.in/',
    emoji: '🎲',
    tag: 'Free app',
    desc: 'बचपन के 22 देसी खेल एक ऐप में — लूडो, कैरम, साँप-सीढ़ी, अंताक्षरी, कबड्डी, गिल्ली-डंडा, लट्टू, अष्टा-चम्मा… दोस्तों के साथ एक फ़ोन पर या कंप्यूटर से। बिना login, ऑफ़लाइन भी।',
    descEn: '22 desi childhood games in one app — Ludo, Carrom, Snakes & Ladders, Antakshari, Kabaddi, Gilli-Danda, Lattu, Ashta-Chamma… play with friends on one phone or against the computer. No login, works offline.',
  },
];

export { apps };
