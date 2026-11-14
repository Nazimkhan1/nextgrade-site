/**
 * Small browser games at nextgrade.in/games/<slug>/. Each game is a standalone
 * page in src/static/games/<slug>/ (its own index.html, sw.js, manifest.json).
 * This list feeds the /games/ page, the home page and the sitemap.
 */
const games = [
  {
    slug: 'chhath',
    emoji: '🌅',
    name: 'छठ घाट',
    nameEn: 'Chhath Ghat',
    tag: 'Chhath Puja',
    desc: 'भोर में नदी में डुबकी लगाओ, उगते सूरज को सही पल पर अर्घ्य दो, फिर सूप में ठेकुआ-केला-गन्ना पकड़कर व्रत खोलो। तीन चरण, घंटी और पानी की आवाज़, WhatsApp पर चैलेंज।',
  },
  {
    slug: 'morning-exercise',
    emoji: '💪',
    name: 'सुबह का 2 मिनट चैलेंज',
    nameEn: 'Morning 2-Minute Challenge',
    tag: 'Daily',
    desc: 'कार्टून कोच के साथ 8 आसान कसरतें — टाइमर, रोज़ की 🔥 स्ट्रीक, बैज और दोस्तों को WhatsApp पर चैलेंज। सिर्फ़ 2 मिनट (हर कसरत 15 सेकंड), बिना कैमरा, बिना लॉगिन।',
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
