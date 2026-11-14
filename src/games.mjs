/**
 * Small browser games at nextgrade.in/games/<slug>/. Each game is a standalone
 * page in src/static/games/<slug>/ (its own index.html, sw.js, manifest.json).
 * This list feeds the /games/ page, the home page and the sitemap.
 */
const games = [
  {
    slug: 'morning-exercise',
    emoji: '💪',
    name: 'सुबह का 5 मिनट चैलेंज',
    nameEn: 'Morning 5-Minute Challenge',
    tag: 'Daily',
    desc: 'कार्टून कोच के साथ 8 आसान कसरतें — टाइमर, रोज़ की 🔥 स्ट्रीक, बैज और दोस्तों को WhatsApp पर चैलेंज। 3 या 5 मिनट, बिना कैमरा, बिना लॉगिन।',
  },
  {
    slug: 'new-year',
    emoji: '🎆',
    name: 'आतिशबाज़ी पॉप',
    nameEn: 'Fireworks Pop',
    tag: 'New Year',
    desc: 'नीचे से उठते रॉकेट टैप करके आसमान में फोड़ो — सबसे ऊपर फोड़ो तो Perfect, जल्दी-जल्दी फोड़ो तो कॉम्बो। साथ में नए साल का लाइव काउंटडाउन।',
  },
  {
    slug: 'christmas',
    emoji: '🎅',
    name: 'Santa ke Gift Pakdo',
    nameEn: 'Catch Santa\'s Gifts',
    tag: 'Christmas',
    desc: 'सांता की स्लेज चलाओ, गिरते तोहफ़े पकड़ो, कोयले से बचो और दोस्तों को WhatsApp पर स्कोर का चैलेंज भेजो। हिंदी, Hinglish, English और বাংলা में।',
  },
];

export { games };
