/**
 * Small apps under nextgrade.in. Each gets a card on /apps/ and the home page.
 * Add a new subdomain app here: { slug, name, url, emoji, tag, desc }.
 */
const apps = [
  {
    slug: 'christmas',
    name: 'Santa ke Gift Pakdo',
    url: 'https://christmas.nextgrade.in/',
    emoji: '🎅',
    tag: 'Christmas game',
    desc: 'सांता की स्लेज चलाओ, गिरते तोहफ़े पकड़ो, कोयले से बचो — और दोस्तों को WhatsApp पर स्कोर का चैलेंज भेजो।',
    descEn: 'Catch Santa\'s gifts, dodge the coal and challenge friends on WhatsApp.',
  },
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
];

export { apps };
