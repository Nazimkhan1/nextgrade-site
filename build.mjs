/**
 * Builds the nextgrade.in site into docs/ (served by GitHub Pages).
 * No npm packages: `node build.mjs`.
 *
 * Languages: Hindi at the root (/), English at /en/, Hinglish at /hinglish/,
 * Bengali at /bn/. A language is built only when its content file exists
 * (src/i18n/<code>.mjs; Hindi content is src/festivals.mjs + src/wishes.mjs).
 * Interface text for all languages is in src/i18n/ui.mjs.
 * Static files in src/assets and src/static are copied as they are.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { festivals as allFestivals } from './src/festivals.mjs';
import { apps } from './src/apps.mjs';
import { hisabVideo, APP_URL, VIDEO } from './src/hisab-video.mjs';
import { wishes } from './src/wishes.mjs';
import { SHAADI_TEMPLATES, SHAADI_COLORS, SHAADI_UI } from './src/shaadi-card.mjs';
import { games as allGames } from './src/games.mjs';
import { stories as allStories } from './src/stories.mjs';
import { tools as allTools } from './src/tools.mjs';
import { storyExtras, SOURCE_INFO, COLLECTIONS, collectionOf, srcKey } from './src/story-info.mjs';
import { NAAM_OCCASIONS, NAAM_UI } from './src/naam-image.mjs';
import { PAHELI, PAHELI_UI } from './src/paheliyan.mjs';
import { KIDS_SETS, KIDS_UI, KIDS_NATIVE } from './src/kids.mjs';
import { KIDS_SEO, KIDS_SEO_CHILD, KIDS_LIST_H } from './src/kids-seo.mjs';
import { speeches as allSpeeches, SPEECH_UI } from './src/speeches.mjs';
import { essays as allEssays, NIBANDH_UI } from './src/nibandh.mjs';
import { calculators as allCalculators, CALC_UI } from './src/calculators.mjs';
import { babyNames, BABY_UI } from './src/naam.mjs';
import { FULLFORMS, FF_UI, ffSlug } from './src/fullforms.mjs';
import { whyFaq } from './src/festival-why.mjs';
import { rules as allRules, KHEL_UI } from './src/khel.mjs';
import { LIST_YEAR, DATES, nextFestivalDate, festivalsInYear, fmt, weekday, DATE_TEXT } from './src/festival-dates.mjs';
import { buildWeather, WT } from './src/weather.mjs';
import { icon } from './src/icons.mjs';
import { buildTravel, TT } from './src/travel.mjs';
import { buildNuskhe, NUSKHE_UI } from './src/nuskhe-build.mjs';
import { buildRegionalWishes, RLANGS } from './src/regional-wishes-build.mjs';
import { buildSurya } from './src/surya.mjs';
import { buildCreatorGuide } from './src/creator-guide.mjs';
import { buildTithi } from './src/tithi-pages.mjs';
import { buildSarkari, SARKARI_NAV } from './src/sarkari-guide.mjs';
import { buildPranayam, PRANAYAM_NAV } from './src/pranayam.mjs';
import { buildAaj, AAJ_NAV } from './src/aaj.mjs';
import { GROUPS as BDAY, UI as BDAY_UI } from './src/birthday-pairs.mjs';
import { buildNumberWords, browserScript as nwScript, NW_NAV } from './src/numwords.mjs';
import { CAL_YEAR, MONTH_SLUGS as SLUG_M, NATIONAL, HOLIDAY_SLUGS, WDS, CT, hijriStarts } from './src/calendar.mjs';
import { releases, isLive, todayIST } from './src/releases.mjs';
// Scheduled pages (src/releases.mjs) stay out of the build until their day
const games = allGames.filter((g) => isLive(`game:${g.slug}`));
const stories = allStories.filter((st) => isLive(`story:${st.slug}`));
const heldGames = allGames.filter((g) => !isLive(`game:${g.slug}`)).map((g) => g.slug);
const heldStories = allStories.filter((st) => !isLive(`story:${st.slug}`)).map((st) => st.slug);
// Festival guides can be scheduled too ('festival:<slug>'); held ones get no page, card, list row or sitemap URL
const festivals = allFestivals.filter((f) => isLive(`festival:${f.slug}`));
const heldFestivals = allFestivals.filter((f) => !isLive(`festival:${f.slug}`)).map((f) => f.slug);
// Free tools (/tools/<slug>/): the section, its menu link and its Privacy Policy paragraph appear only once a tool is live
const tools = allTools.filter((tl) => isLive(`tool:${tl.slug}`));
const NAAM_LIVE = isLive('page:naam-wali-image');
const SHAADI_LIVE = isLive('page:shaadi-card');
const PAHELI_LIVE = isLive('page:paheliyan');
const SPEECHES = allSpeeches.filter((sp) => isLive(`speech:${sp.slug}`));
const ESSAYS = allEssays.filter((e) => isLive(`nibandh:${e.slug}`));
const KHEL = allRules.filter((r) => isLive(`game:${r.slug}`)); // rules page goes live with its game
const CALCS = allCalculators.filter((c) => isLive(`calc:${c.slug}`));
const BABY_LIVE = isLive('page:naam');
const FF_LIVE = isLive('page:full-form');
const heldTools = allTools.filter((tl) => !isLive(`tool:${tl.slug}`)).map((tl) => tl.slug);
import * as islamic from './src/islamic.mjs';
import { ui } from './src/i18n/ui.mjs';

const SITE = 'https://nextgrade.in';
const NAME = 'NextGrade';
const ADSENSE = 'ca-pub-4135041725422483';
// Cloudflare Web Analytics (cookieless, no personal data). Paste the site token from
// Cloudflare dashboard → Analytics & Logs → Web Analytics → nextgrade.in → "Manage site" JS snippet.
// Empty = off. When set, the beacon is added to every HTML page in docs/ (site pages, games, wishes).
const CF_BEACON = process.env.CF_BEACON || '3c79c0e96af3466f826210eb91f124a0';
// Google Analytics 4 (property "NextGrade site"): counts unique users. Set GA_ID='' to turn it off.
const GA_ID = process.env.GA_ID ?? 'G-NJ43J91EBJ';
const CONTACT = 'contact@nextgrade.in';
const OUT = 'docs';
const TODAY = new Date().toISOString().slice(0, 10);
// Cache-busting: every build gets a new ?v= on CSS/JS, so browsers never mix new HTML with an old stylesheet.
const V = Date.now().toString(36);

const ALL_LANGS = [
  { code: 'hi', prefix: '', html: 'hi', hreflang: 'hi', game: 'hi' },
  { code: 'en', prefix: '/en', html: 'en', hreflang: 'en', game: 'en' },
  { code: 'hinglish', prefix: '/hinglish', html: 'hi-Latn', hreflang: 'hi-Latn', game: 'hinglish' },
  { code: 'bn', prefix: '/bn', html: 'bn', hreflang: 'bn', game: 'bn' },
];

const content = { hi: {} };
await Promise.all(
  ALL_LANGS.filter((l) => l.code !== 'hi' && existsSync(`src/i18n/${l.code}.mjs`)).map((l) =>
    import(`./src/i18n/${l.code}.mjs`).then((m) => {
      content[l.code] = m;
    }),
  ),
);
const LANGS = ALL_LANGS.filter((l) => content[l.code]);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'assets'), { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const firstSentence = (s) => (String(s).match(/^.*?[।.!?](\s|$)/) || [s])[0].trim();


// Home: "New and trending" links (user 24 Nov: new pages should be linked from the home page for Google)
const HOME_NEW = [
  ['/number-in-words/', '🔢', { hi: 'नंबर शब्दों में (चेक)', en: 'Number to words (cheque)', hinglish: 'Number in words', bn: 'সংখ্যা কথায়' }, true],
  ['/aaj/', '☀️', { hi: 'आज का दिन + शुभ प्रभात इमेज', en: 'Today + Good Morning image', hinglish: 'Aaj ka din + Good Morning image', bn: 'আজকের দিন + শুভ সকাল ছবি' }, true],
  ['/pranayam/', '🧘', { hi: 'प्राणायाम — साथ-साथ करें', en: 'Pranayama — breathe along', hinglish: 'Pranayam — saath karo', bn: 'প্রাণায়াম — সঙ্গে করুন' }, true],
  ['/sarkari-guide/', '🏛️', { hi: 'सरकारी गाइड: आधार, PAN, आयुष्मान', en: 'Govt guides: Aadhaar, PAN, Ayushman', hinglish: 'Sarkari guide: Aadhaar, PAN, Ayushman', bn: 'সরকারি গাইড: আধার, PAN, আয়ুষ্মান' }, true],
  ['/ekadashi/', '🙏', { hi: 'एकादशी कब है', en: 'Ekadashi dates', hinglish: 'Ekadashi kab hai', bn: 'একাদশী কবে' }, true],
  ['/purnima/', '🌕', { hi: 'पूर्णिमा कब है', en: 'Purnima dates', hinglish: 'Purnima kab hai', bn: 'পূর্ণিমা কবে' }, true],
  ['/creator-guide/', '🎬', { hi: 'YouTube से कमाई कैसे करें', en: 'How to earn from YouTube', hinglish: 'YouTube se kamai kaise karein', bn: 'YouTube থেকে আয় কীভাবে' }, true],
  ['/surya-namaskar/', '☀️', { hi: 'सूर्य नमस्कार — साथ-साथ करें', en: 'Surya Namaskar — follow along', hinglish: 'Surya Namaskar — saath karo', bn: 'সূর্য নমস্কার — সঙ্গে করুন' }, true],
  ['/nuskhe/sardi/', '❄️', { hi: 'सर्दी के घरेलू नुस्खे', en: 'Winter home remedies', hinglish: 'Sardi ke gharelu nuskhe', bn: 'শীতের ঘরোয়া টোটকা' }, true],
  ['/ghoomne-ki-jagah/december/', '🧳', { hi: 'दिसंबर में घूमने की जगहें', en: 'Places to visit in December', hinglish: 'December mein ghumne ki jagah', bn: 'ডিসেম্বরে বেড়ানোর জায়গা' }, true],
  ['/tools/photo-frame/', '🖼️', { hi: 'नए साल का फ़ोटो फ़्रेम', en: 'New Year photo frame', hinglish: 'New Year photo frame', bn: 'নববর্ষের ফটো ফ্রেম' }, false],
  ['/mausam/', '🌦️', { hi: 'आज का मौसम', en: 'Weather today', hinglish: 'Aaj ka mausam', bn: 'আজকের আবহাওয়া' }, true],
  ['/calendar/2027/', '📅', { hi: 'कैलेंडर 2027', en: 'Calendar 2027', hinglish: 'Calendar 2027', bn: 'ক্যালেন্ডার ২০২৭' }, true],
  ['/tools/marriage-biodata/', '💍', { hi: 'शादी का बायोडाटा', en: 'Marriage Biodata Maker', hinglish: 'Marriage Biodata', bn: 'বিয়ের বায়োডাটা' }, false],
  ['/shaadi-card/', '💌', { hi: 'शादी का कार्ड', en: 'Wedding Card Maker', hinglish: 'Shaadi Card', bn: 'বিয়ের কার্ড' }, true],
  ['/calculator/8th-pay-commission/', '🏛️', { hi: '8वाँ वेतन आयोग कैलकुलेटर', en: '8th Pay Commission Calculator', hinglish: '8th Pay Commission Calculator', bn: 'অষ্টম বেতন কমিশন' }, true],
  ['/speech/republic-day/', '🇮🇳', { hi: '26 जनवरी भाषण', en: 'Republic Day Speech', hinglish: '26 January Speech', bn: 'প্রজাতন্ত্র দিবসের বক্তৃতা' }, true],
  ['/speech/christmas/', '🎄', { hi: 'क्रिसमस पर भाषण', en: 'Christmas Speech', hinglish: 'Christmas par Bhashan', bn: 'বড়দিনের বক্তৃতা' }, true],
  ['/nibandh/christmas/', '📝', { hi: 'क्रिसमस पर निबंध', en: 'Essay on Christmas', hinglish: 'Christmas par Nibandh', bn: 'বড়দিন রচনা' }, true],
  ['/tools/krutidev/', '🔤', { hi: 'Krutidev ↔ Unicode', en: 'Krutidev ↔ Unicode', hinglish: 'Krutidev ↔ Unicode', bn: 'Krutidev ↔ Unicode' }, false],
];
// Home quick tiles (design refresh 25 Nov 2026): the most used things, app-launcher style
const HOME_TILES = [
  ['/mausam/', 'cloud-sun', 'b', { hi: 'मौसम', en: 'Weather', hinglish: 'Mausam', bn: 'আবহাওয়া' }, true],
  ['/tools/image-compress/', 'image-down', 'o', { hi: 'फ़ोटो KB कम', en: 'Photo to KB', hinglish: 'Photo KB kam', bn: 'ছবি KB কম' }, false],
  ['/tools/pdf-compress/', 'file-down', 'r', { hi: 'PDF छोटा', en: 'PDF compress', hinglish: 'PDF chhota', bn: 'PDF ছোট' }, false],
  ['/tools/passport-photo/', 'contact', 'p', { hi: 'पासपोर्ट फ़ोटो', en: 'Passport photo', hinglish: 'Passport photo', bn: 'পাসপোর্ট ছবি' }, false],
  ['/tools/marriage-biodata/', 'gem', 'r', { hi: 'बायोडाटा', en: 'Biodata', hinglish: 'Biodata', bn: 'বায়োডাটা' }, false],
  ['/calculator/', 'calculator', 'g', { hi: 'कैलकुलेटर', en: 'Calculators', hinglish: 'Calculator', bn: 'ক্যালকুলেটর' }, true],
  ['/kahani/', 'book-open', 'o', { hi: 'कहानियाँ', en: 'Stories', hinglish: 'Kahaniyan', bn: 'গল্প' }, true],
  ['/kids/', 'baby', 'b', { hi: 'बच्चों की पढ़ाई', en: 'Kids learning', hinglish: 'Bachchon ki padhai', bn: 'ছোটদের পড়া' }, true],
  ['/wish-card/', 'gift', 'r', { hi: 'बधाई कार्ड', en: 'Wish card', hinglish: 'Wish card', bn: 'শুভেচ্ছা কার্ড' }, true],
  ['/games/', 'gamepad-2', 'p', { hi: 'गेम्स', en: 'Games', hinglish: 'Games', bn: 'গেম' }, true],
  ['/nibandh/', 'pen-line', 'g', { hi: 'निबंध', en: 'Essays', hinglish: 'Nibandh', bn: 'রচনা' }, true],
  ['/festivals/', 'flame', 'o', { hi: 'त्योहार', en: 'Festivals', hinglish: 'Tyohaar', bn: 'উৎসব' }, true],
];
const HERO = {
  hi: { h: 'रोज़ के काम की हर चीज़ — एक जगह, फ़्री', q: 'क्या ढूँढ रहे हैं? जैसे: फ़ोटो 20KB, पटना मौसम, निबंध…', none: 'कुछ नहीं मिला — दूसरा शब्द लिखकर देखें।' },
  en: { h: 'Everyday tools for India — free, in one place', q: 'What do you need? e.g. photo 20KB, Delhi weather, essay…', none: 'Nothing found — try another word.' },
  hinglish: { h: 'Roz ke kaam ki har cheez — ek jagah, free', q: 'Kya dhoondh rahe ho? jaise: photo 20KB, Patna mausam, nibandh…', none: 'Kuch nahi mila — doosra shabd likh kar dekho.' },
  bn: { h: 'রোজকার কাজের সব কিছু — এক জায়গায়, ফ্রি', q: 'কী খুঁজছেন? যেমন: ছবি 20KB, কলকাতা আবহাওয়া, রচনা…', none: 'কিছু পাওয়া গেল না — অন্য শব্দ লিখে দেখুন।' },
};
const HOME_BADGES = { hi: ['✓ 100% फ़्री', '✓ बिना login', '✓ हिंदी · English · বাংলা', '✓ फ़ोन पर'], en: ['✓ 100% free', '✓ No login', '✓ Hindi · English · Bangla', '✓ Made for phones'], hinglish: ['✓ 100% free', '✓ Bina login', '✓ Hindi · English · Bangla', '✓ Phone par'], bn: ['✓ ১০০% ফ্রি', '✓ লগইন ছাড়া', '✓ বাংলা · हिंदी · English', '✓ ফোনে'] };
const FOOT_COLS = [
  [{ hi: 'टूल्स', en: 'Tools', hinglish: 'Tools', bn: 'টুলস' }, [['/tools/image-compress/', { hi: 'फ़ोटो KB कम करें', en: 'Compress photo to KB', hinglish: 'Photo KB kam karo', bn: 'ছবি KB কম' }, false], ['/tools/pdf-compress/', { hi: 'PDF छोटा करें', en: 'Compress PDF', hinglish: 'PDF chhota karo', bn: 'PDF ছোট করুন' }, false], ['/tools/passport-photo/', { hi: 'पासपोर्ट फ़ोटो', en: 'Passport photo', hinglish: 'Passport photo', bn: 'পাসপোর্ট ছবি' }, false], ['/calculator/', { hi: 'कैलकुलेटर', en: 'Calculators', hinglish: 'Calculators', bn: 'ক্যালকুলেটর' }], ['/mausam/', { hi: 'आज का मौसम', en: 'Weather today', hinglish: 'Aaj ka mausam', bn: 'আজকের আবহাওয়া' }], ['/ghoomne-ki-jagah/', { hi: 'घूमने की जगहें', en: 'Places to visit', hinglish: 'Ghoomne ki jagah', bn: 'বেড়ানোর জায়গা' }], ['/creator-guide/', { hi: 'क्रिएटर गाइड', en: 'Creator guide', hinglish: 'Creator guide', bn: 'ক্রিয়েটর গাইড' }], ['/sarkari-guide/', { hi: 'सरकारी गाइड', en: 'Government guides', hinglish: 'Sarkari guide', bn: 'সরকারি গাইড' }], ['/tools/', { hi: 'सभी टूल्स →', en: 'All tools →', hinglish: 'Sabhi tools →', bn: 'সব টুলস →' }]]],
  [{ hi: 'पढ़ाई', en: 'Learning', hinglish: 'Padhai', bn: 'পড়াশোনা' }, [['/nibandh/', { hi: 'निबंध', en: 'Essays', hinglish: 'Nibandh', bn: 'রচনা' }], ['/speech/', { hi: 'भाषण', en: 'Speeches', hinglish: 'Bhashan', bn: 'বক্তৃতা' }], ['/kahani/', { hi: 'कहानियाँ', en: 'Stories', hinglish: 'Kahaniyan', bn: 'গল্প' }], ['/kids/', { hi: 'बच्चों की पढ़ाई', en: 'Kids learning', hinglish: 'Bachchon ki padhai', bn: 'ছোটদের পড়া' }], ['/nuskhe/', { hi: 'घरेलू नुस्खे', en: 'Home remedies', hinglish: 'Gharelu nuskhe', bn: 'ঘরোয়া টোটকা' }], ['/surya-namaskar/', { hi: 'सूर्य नमस्कार', en: 'Surya Namaskar', hinglish: 'Surya Namaskar', bn: 'সূর্য নমস্কার' }], ['/pranayam/', { hi: 'प्राणायाम', en: 'Pranayama', hinglish: 'Pranayam', bn: 'প্রাণায়াম' }]]],
  [{ hi: 'त्योहार', en: 'Festivals', hinglish: 'Tyohaar', bn: 'উৎসব' }, [['/festivals/', { hi: 'सभी त्योहार', en: 'All festivals', hinglish: 'Sabhi tyohaar', bn: 'সব উৎসব' }], ['/calendar/2027/', { hi: 'कैलेंडर 2027', en: 'Calendar 2027', hinglish: 'Calendar 2027', bn: 'ক্যালেন্ডার ২০২৭' }], ['/wishes/', { hi: 'शुभकामनाएँ', en: 'Wishes', hinglish: 'Wishes', bn: 'শুভেচ্ছা' }], ['/wish-card/', { hi: 'बधाई कार्ड', en: 'Wish card', hinglish: 'Wish card', bn: 'শুভেচ্ছা কার্ড' }], ['/aaj/', { hi: 'आज का दिन', en: 'Today', hinglish: 'Aaj ka din', bn: 'আজকের দিন' }], ['/ekadashi/', { hi: 'एकादशी कब है', en: 'Ekadashi dates', hinglish: 'Ekadashi kab hai', bn: 'একাদশী কবে' }], ['/purnima/', { hi: 'पूर्णिमा / अमावस्या', en: 'Purnima / Amavasya', hinglish: 'Purnima / Amavasya', bn: 'পূর্ণিমা / অমাবস্যা' }]]],
  [{ hi: 'खेल और ऐप', en: 'Games and apps', hinglish: 'Games aur apps', bn: 'গেম আর অ্যাপ' }, [['/games/', { hi: 'ऑनलाइन गेम्स', en: 'Online games', hinglish: 'Online games', bn: 'অনলাইন গেম' }], ['https://desi-games.nextgrade.in/', { hi: 'देसी गेम्स ऐप', en: 'Desi Games app', hinglish: 'Desi Games app', bn: 'দেশি গেমস অ্যাপ' }, false], ['/apps/', { hi: 'ऐप्स', en: 'Apps', hinglish: 'Apps', bn: 'অ্যাপ' }]]],
];
const HOME_NEW_H = { hi: '🆕 नया और ट्रेंडिंग', en: '🆕 New and trending', hinglish: '🆕 Naya aur trending', bn: '🆕 নতুন আর ট্রেন্ডিং' };
// Utility platform (user 24 Nov: "multi-purpose Indian utility platform — SEO accordingly"): tool categories,
// used by the /tools/ directory, the home page and the "more tools" block on every tool page.
const TOOL_CATS = [
  { id: 'pdf', emoji: '📄', name: { hi: 'PDF और डॉक्यूमेंट', en: 'PDF and documents', hinglish: 'PDF aur documents', bn: 'PDF আর ডকুমেন্ট' }, slugs: ['pdf-compress', 'pdf-merge', 'jpg-to-pdf', 'doc-scanner', 'form-helper'] },
  { id: 'photo', emoji: '🖼️', name: { hi: 'फ़ोटो टूल्स', en: 'Photo tools', hinglish: 'Photo tools', bn: 'ছবির টুলস' }, slugs: ['passport-photo', 'photo-frame', 'image-compress', 'image-resize', 'image-crop', 'bg-remover', 'signature-maker', 'sticker-maker', 'hair-tryon'] },
  { id: 'hindi', emoji: '⌨️', name: { hi: 'हिंदी और टाइपिंग', en: 'Hindi and typing', hinglish: 'Hindi aur typing', bn: 'হিন্দি আর টাইপিং' }, slugs: ['krutidev', 'typing-test'] },
  { id: 'more', emoji: '🧩', name: { hi: 'और काम के टूल्स', en: 'More handy tools', hinglish: 'Aur kaam ke tools', bn: 'আরও কাজের টুলস' }, slugs: ['marriage-biodata', 'qr-maker', 'land-converter'] },
];
const toolsIn = (cat) => { const known = TOOL_CATS.flatMap((c) => c.slugs); return tools.filter((t) => cat.slugs.includes(t.slug) || (cat.id === 'more' && !known.includes(t.slug))); };
const MAKERS = [
  ['/shaadi-card/', '💌', { hi: 'शादी का कार्ड', en: 'Wedding card maker', hinglish: 'Shaadi card maker', bn: 'বিয়ের কার্ড' }],
  ['/naam-wali-image/', '🖼️', { hi: 'नाम वाली इमेज', en: 'Name on image', hinglish: 'Naam wali image', bn: 'নামের ছবি' }],
  ['/wish-card/', '💐', { hi: 'शुभकामना कार्ड', en: 'Wish card maker', hinglish: 'Wish card maker', bn: 'শুভেচ্ছা কার্ড' }],
  ['/calendar/2027/', '📅', { hi: 'कैलेंडर 2027', en: 'Calendar 2027', hinglish: 'Calendar 2027', bn: 'ক্যালেন্ডার ২০২৭' }],
  ['/mausam/', '🌦️', { hi: 'आज का मौसम (600+ शहर)', en: 'Weather today (600+ cities)', hinglish: 'Aaj ka mausam (600+ sheher)', bn: 'আজকের আবহাওয়া (৬০০+ শহর)' }],
];
const STUDY = [
  ['/nibandh/', '📝', { hi: 'निबंध', en: 'Essays', hinglish: 'Nibandh', bn: 'রচনা' }],
  ['/speech/', '🎤', { hi: 'भाषण', en: 'Speeches', hinglish: 'Bhashan', bn: 'বক্তৃতা' }],
  ['/kids/', '🧒', { hi: 'बच्चों की पढ़ाई (आवाज़ के साथ)', en: 'Kids learning with audio', hinglish: 'Bachchon ki padhai', bn: 'ছোটদের পড়া' }],
  ['/kahani/', '📚', { hi: 'कहानियाँ', en: 'Stories', hinglish: 'Kahaniyan', bn: 'গল্প' }],
];
const UT = {
  hi: { calcH: '🧮 कैलकुलेटर', makerH: '💌 कार्ड, इमेज और कैलेंडर', studyH: '🎓 पढ़ाई', homeH: '🧰 मुफ़्त टूल्स — सब फ़ोन में, बिना login', all: 'सारे टूल्स देखें →', relH: '🧰 और फ़्री टूल्स', allTools: 'सारे टूल्स' },
  en: { calcH: '🧮 Calculators', makerH: '💌 Cards, images and calendar', studyH: '🎓 Study', homeH: '🧰 Free tools — all on your phone, no login', all: 'See all tools →', relH: '🧰 More free tools', allTools: 'All tools' },
  hinglish: { calcH: '🧮 Calculators', makerH: '💌 Card, image aur calendar', studyH: '🎓 Padhai', homeH: '🧰 Free tools — sab phone mein, bina login', all: 'Saare tools dekho →', relH: '🧰 Aur free tools', allTools: 'Saare tools' },
  bn: { calcH: '🧮 ক্যালকুলেটর', makerH: '💌 কার্ড, ছবি আর ক্যালেন্ডার', studyH: '🎓 পড়াশোনা', homeH: '🧰 ফ্রি টুলস — সব ফোনে, লগইন ছাড়া', all: 'সব টুলস দেখো →', relH: '🧰 আরও ফ্রি টুলস', allTools: 'সব টুলস' },
};

// ---- Localised views of the content
const lf = (f, L) => {
  if (L.code === 'hi') return { name: f.nameHi, alt: f.nameEn, intro: f.introHi, when: f.whenHi, where: f.whereHi, sections: f.sections, wishes: f.wishesHi, wishes2: f.wishesEn, faq: f.faq, summary: f.enSummary };
  const t = content[L.code].festivals[f.slug];
  return {
    name: t.name,
    alt: L.code === 'bn' ? f.nameEn : f.nameHi,
    intro: t.intro,
    when: t.when,
    where: t.where,
    sections: t.sections,
    wishes: L.code === 'en' ? [...f.wishesEn, ...(t.moreWishes || [])] : t.wishes,
    wishes2: L.code === 'en' ? f.wishesHi : f.wishesEn,
    faq: t.faq,
    summary: [],
  };
};

const lw = (w, L) => {
  if (L.code === 'hi') return { name: w.nameHi, alt: w.nameEn, greet: w.greetHi, intro: w.introHi, about: w.aboutHi, summary: [w.aboutEn], wishes: w.wishesHi, wishes2: w.wishesEn, faq: w.faq };
  const t = content[L.code].wishes[w.slug];
  return {
    name: t.name,
    alt: L.code === 'bn' ? w.nameEn : w.nameHi,
    greet: t.greet,
    intro: t.intro,
    about: t.about,
    summary: [],
    wishes: L.code === 'en' ? [...w.wishesEn, ...(t.moreWishes || [])] : t.wishes,
    wishes2: L.code === 'en' ? w.wishesHi : w.wishesEn,
    faq: t.faq,
  };
};

const lgame = (g, L) => (L.code === 'hi' ? { name: g.name, desc: g.desc } : { ...g, ...content[L.code].games[g.slug] });
const lapp = (a, L) => {
  if (L.code === 'hi') return a;
  const t = (content[L.code].apps || {})[a.slug] || {};
  return { ...a, desc: t.desc || a.descEn, tag: t.tag || a.tag };
};

// ---- Page shell
const P = (L, path) => `${L.prefix}${path}`;
// Main menu, grouped (user, 21 Nov 2026: "header ko menu hierarchy wala banao", the flat list was too long).
// Each group is a <details> dropdown (works without JavaScript); a link only shows when its section is live.
const MENU_T = {
  hi: { stories: 'कहानियाँ', study: 'पढ़ाई', fest: 'त्योहार', games: 'Games', tools: 'Tools', allStories: 'सभी कहानियाँ', panchatantra: 'पंचतंत्र', 'akbar-birbal': 'अकबर-बीरबल', 'tenali-raman': 'तेनाली राम', jataka: 'जातक कथाएँ', aesop: 'ईसप की कहानियाँ', 'lok-katha': 'लोक कथाएँ', nibandh: 'निबंध', speech: 'भाषण', paheli: 'पहेलियाँ', ff: 'Full Forms', naam: 'बच्चों के नाम', festivals: 'सभी त्योहार', dates: (y) => `त्योहार ${y} कब है`, wishes: 'Wishes', card: 'Wish Card', shaadiCard: 'शादी कार्ड', naamImg: 'नाम वाली इमेज', islamic: 'इस्लामी कैलेंडर', allGames: 'सभी गेम्स', khel: 'देसी खेलों के नियम', kids: 'सीखो-खेलो', kidsAll: 'सभी विषय', allTools: 'सभी टूल्स', calc: 'Calculators', apps: 'Apps', menu: 'मेनू' },
  en: { stories: 'Stories', study: 'Study', fest: 'Festivals', games: 'Games', tools: 'Tools', allStories: 'All stories', panchatantra: 'Panchatantra', 'akbar-birbal': 'Akbar-Birbal', 'tenali-raman': 'Tenali Raman', jataka: 'Jataka Tales', aesop: "Aesop's Fables", 'lok-katha': 'Folk Tales', nibandh: 'Essays', speech: 'Speeches', paheli: 'Riddles', ff: 'Full Forms', naam: 'Baby Names', festivals: 'All festivals', dates: (y) => `Festival dates ${y}`, wishes: 'Wishes', card: 'Wish Card', shaadiCard: 'Shaadi Card', naamImg: 'Name on image', islamic: 'Islamic calendar', allGames: 'All games', khel: 'Rules of desi games', kids: 'Learn & Play', kidsAll: 'All topics', allTools: 'All tools', calc: 'Calculators', apps: 'Apps', menu: 'Menu' },
  hinglish: { stories: 'Kahaniyan', study: 'Padhai', fest: 'Tyohaar', games: 'Games', tools: 'Tools', allStories: 'Sabhi kahaniyan', panchatantra: 'Panchatantra', 'akbar-birbal': 'Akbar-Birbal', 'tenali-raman': 'Tenali Raman', jataka: 'Jataka Kathayein', aesop: 'Aesop ki Kahaniyan', 'lok-katha': 'Lok Kathayein', nibandh: 'Nibandh', speech: 'Bhashan', paheli: 'Paheliyan', ff: 'Full Forms', naam: 'Baby Names', festivals: 'Sabhi tyohaar', dates: (y) => `Tyohaar ${y} kab hai`, wishes: 'Wishes', card: 'Wish Card', shaadiCard: 'Shaadi Card', naamImg: 'Naam wali image', islamic: 'Islamic calendar', allGames: 'Sabhi games', khel: 'Desi khelon ke niyam', kids: 'Seekho-Khelo', kidsAll: 'Sabhi topics', allTools: 'Sabhi tools', calc: 'Calculators', apps: 'Apps', menu: 'Menu' },
  bn: { stories: 'গল্প', study: 'পড়াশোনা', fest: 'উৎসব', games: 'গেম', tools: 'টুলস', allStories: 'সব গল্প', panchatantra: 'পঞ্চতন্ত্র', 'akbar-birbal': 'আকবর-বীরবল', 'tenali-raman': 'তেনালি রামন', jataka: 'জাতকের গল্প', aesop: 'ঈশপের গল্প', 'lok-katha': 'লোককথা', nibandh: 'রচনা', speech: 'বক্তৃতা', paheli: 'ধাঁধা', ff: 'ফুল ফর্ম', naam: 'শিশুর নাম', festivals: 'সব উৎসব', dates: (y) => `উৎসবের তারিখ ${y}`, wishes: 'শুভেচ্ছা', card: 'উইশ কার্ড', shaadiCard: 'বিয়ের কার্ড', naamImg: 'নামের ছবি', islamic: 'ইসলামি ক্যালেন্ডার', allGames: 'সব গেম', khel: 'দেশি খেলার নিয়ম', kids: 'শেখো-খেলো', kidsAll: 'সব বিষয়', allTools: 'সব টুলস', calc: 'ক্যালকুলেটর', apps: 'অ্যাপ', menu: 'মেনু' },
};
const menuFor = (L) => {
  const M = MENU_T[L.code];
  const groups = [
    [M.stories, [['/kahani/', M.allStories], ...['panchatantra', 'akbar-birbal', 'tenali-raman', 'jataka', 'aesop', 'lok-katha'].map((s) => [`/kahani/${s}/`, M[s]])]],
    [M.study, [...(ESSAYS.length ? [['/nibandh/', M.nibandh]] : []), ...(SPEECHES.length ? [['/speech/', M.speech]] : []), ...(PAHELI_LIVE ? [['/paheliyan/', M.paheli]] : []), ...(FF_LIVE ? [['/full-form/', M.ff]] : []), ...(BABY_LIVE ? [['/naam/', M.naam]] : [])]],
    [M.fest, [['/festivals/', M.festivals], [`/festivals/${LIST_YEAR}/`, M.dates(LIST_YEAR)], [`/calendar/${CAL_YEAR}/`, CT[L.code].nav], ['/wishes/', M.wishes], ['/wish-card/', M.card], ...(SHAADI_LIVE ? [['/shaadi-card/', M.shaadiCard]] : []), ...(NAAM_LIVE ? [['/naam-wali-image/', M.naamImg]] : []), ['/islamic-calendar/', M.islamic]]],
    [M.games, [['/games/', M.allGames], ...(KHEL.length ? [['/khel/', M.khel]] : [])]],
    [M.kids, [['/kids/', M.kidsAll], ...KIDS_SETS.slice(0, 8).map((s) => [`/kids/${s.slug}/`, s.name[L.code] || s.name.en])]],
    [M.tools, [...(tools.length ? [['/tools/', M.allTools]] : []), ...(CALCS.length ? [['/calculator/', M.calc]] : []), ['/mausam/', WT[L.code].nav], ['/sarkari-guide/', SARKARI_NAV[L.code]], ['/number-in-words/', NW_NAV[L.code]], ['/ghoomne-ki-jagah/', TT[L.code].nav], ['/nuskhe/', NUSKHE_UI[L.code].menu], ['/surya-namaskar/', { hi: 'सूर्य नमस्कार', en: 'Surya Namaskar', hinglish: 'Surya Namaskar', bn: 'সূর্য নমস্কার' }[L.code]], ['/pranayam/', PRANAYAM_NAV[L.code]], ['/apps/', M.apps]]],
  ];
  return groups.filter(([, items]) => items.length);
};
// Voice used by the browser to read stories aloud.
const SPEECH = { hi: 'hi-IN', en: 'en-IN', hinglish: 'en-IN', bn: 'bn-IN' };

function page(L, { path, title, description, body, jsonLd = [], scripts = [], langs = LANGS, extraFonts = '' }) {
  const T = ui[L.code];
  const url = `${SITE}${P(L, path)}`;
  const inSec = (href) => href !== '/' && path.startsWith(href);
  const nav = `<a href="${P(L, '/')}"${path === '/' ? ' aria-current="page"' : ''}>${esc(T.nav.home)}</a>` + menuFor(L).map(([label, items]) => {
    const cur = items.some(([h]) => inSec(h));
    return `<details class="nav-group"><summary${cur ? ' aria-current="page"' : ''}>${esc(label)}</summary><ul>${items.map(([h, t]) => `<li><a href="${P(L, h)}"${h === path ? ' aria-current="page"' : ''}>${esc(t)}</a></li>`).join('')}</ul></details>`;
  }).join('');
  // Language dropdown (details/summary: works without JavaScript; site.js closes it on outside click).
  const switcher = langs.length > 1
    ? `<details class="lang-menu"><summary aria-label="${T.langLabel}">🌐 <span>${ui[L.code].langName}</span></summary><ul>${langs.map((l) => `<li><a href="${P(l, path)}" hreflang="${l.hreflang}" lang="${l.html}"${l.code === L.code ? ' aria-current="true"' : ''}>${ui[l.code].langName}${l.code === L.code ? ' ✓' : ''}</a></li>`).join('')}</ul></details>`
    : '';
  const alternates = langs.length > 1 ? [...langs.map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${SITE}${P(l, path)}">`), `<link rel="alternate" hreflang="x-default" href="${SITE}${path}">`].join('\n') : '';
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const fonts = `family=Inter:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700${L.code === 'bn' ? '&family=Noto+Sans+Bengali:wght@400;600;700' : ''}${extraFonts}&display=swap`;
  return `<!doctype html>
<html lang="${L.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${alternates}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://nextgrade.in/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://nextgrade.in/og-image.jpg">
<meta name="theme-color" content="#e8590c">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fonts}" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css?v=${V}">
<meta name="google-adsense-account" content="${ADSENSE}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}" crossorigin="anonymous"></script>
${ld}
</head>
<body>
<header class="site-head"><div class="wrap">
<a class="logo" href="${P(L, '/')}" aria-label="${NAME}"><img class="logo-mark" src="/favicon.svg" alt="" width="34" height="34"><span>Next<b>Grade</b></span></a>
<div class="head-right"><nav class="nav" id="main-nav" aria-label="Main">${nav}</nav>${switcher}<button class="menu-btn" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="${esc(MENU_T[L.code].menu)}">☰</button></div>
</div></header>
<main>
${body}
</main>
<footer class="site-foot"><div class="wrap">
<div class="foot-cols">
<div class="foot-brand"><a class="logo" href="${P(L, '/')}"><img class="logo-mark" src="/favicon.svg" alt="" width="30" height="30"><span>Next<b>Grade</b></span></a><p>${esc(T.footer)}</p></div>
${FOOT_COLS.map(([h, items]) => `<nav aria-label="${esc(h[L.code])}"><h4>${esc(h[L.code])}</h4>${items.map(([href, n, perLang]) => `<a href="${perLang === false ? href : P(L, href)}">${esc(n[L.code])}</a>`).join('')}</nav>`).join('')}
</div>
<div class="foot-bottom"><span>© ${new Date().getFullYear()} ${NAME} · nextgrade.in</span><nav aria-label="Footer"><a href="${P(L, '/about/')}">${esc(T.about.title)}</a><a href="${P(L, '/contact/')}">${esc(T.contact.title)}</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a><a href="/sitemap.xml">Sitemap</a></nav></div>
</div></footer>
<script src="/assets/site.js?v=${V}" defer></script>
${scripts.map((s) => `<script src="${s}?v=${V}" defer></script>`).join('\n')}
</body>
</html>
`;
}

const urls = [];
const write = (L, path, html) => {
  const full = L ? P(L, path) : path;
  const file = join(OUT, full.endsWith('/') ? `${full}index.html` : full);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (full.endsWith('/')) urls.push(full);
  if (L && full.endsWith('/')) { const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1]; if (t) (SEARCH[L.code] ||= []).push([t.replace(/\s*\|\s*NextGrade\s*$/, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"'), full]); }
};
const SEARCH = {};

const breadcrumbLd = (L, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${P(L, path)}` })),
});

const articleLd = (L, headline, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  inLanguage: L.html,
  datePublished: TODAY,
  dateModified: TODAY,
  author: { '@type': 'Organization', name: NAME },
  publisher: { '@type': 'Organization', name: NAME, logo: { '@type': 'ImageObject', url: `${SITE}/icons/icon-512.png` } },
  mainEntityOfPage: `${SITE}${P(L, path)}`,
});

const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })) });

// ---- Building blocks
const festivalCard = (L) => (f) => {
  const x = lf(f, L);
  return `<a class="card" href="${P(L, `/festivals/${f.slug}/`)}">
<span class="emoji" aria-hidden="true">${f.emoji}</span>
<h3>${esc(x.name)} · ${esc(x.alt)}</h3>
<p>${esc(x.when)}</p>
</a>`;
};

const wishCard = (L) => (w) => {
  const x = lw(w, L);
  return `<a class="card" href="${P(L, `/wishes/${w.slug}/`)}">
<span class="emoji" aria-hidden="true">${w.emoji}</span>
<h3>${esc(x.name)} · ${esc(x.alt)}</h3>
<p>${esc(firstSentence(x.intro))}</p>
</a>`;
};

const appCard = (L) => (a) => {
  const x = lapp(a, L);
  return `<a class="card" href="${a.url.startsWith('/') ? P(L, a.url) : a.url}">
<span class="emoji" aria-hidden="true">${a.emoji}</span>
<span class="tag">${esc(x.tag)}</span>
<h3>${esc(a.name)}</h3>
<p>${esc(x.desc)}</p>
</a>`;
};

const storyCard = (L) => (st) => {
  const x = st[L.code];
  return `<a class="card" href="${P(L, `/kahani/${st.slug}/`)}">
<span class="emoji" aria-hidden="true">${st.emoji}</span>
<span class="tag">${esc(st.source[L.code])} · ${esc(ui[L.code].stories.minutes(st.minutes))}</span>
<h3>${esc(x.title)}</h3>
<p>${esc(firstSentence(x.paras[0]))}</p>
</a>`;
};

// Animated name wishes (standalone pages in src/static/celebrate/<slug>/). [title, card text, button text]
const ALL_CELEBRATE = [
  { slug: 'makar-sankranti', emoji: '🪁', festival: 'makar-sankranti',
    hi: ['मकर संक्रांति — पतंगों वाला एनिमेटेड विश', 'नीले आसमान में उड़ती पतंगें, छतें और तिल-गुड़ — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🪁 नाम के साथ एनिमेटेड संक्रांति बधाई भेजो'],
    en: ['Makar Sankranti — animated kite wish', 'Kites in a blue sky, rooftops and til-gud — send a greeting with their name, read aloud, on WhatsApp.', '🪁 Send an animated Sankranti wish with a name'],
    hinglish: ['Makar Sankranti — patangon wala animated wish', 'Neele aasmaan mein udti patangein, chhatein aur til-gud — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🪁 Naam ke saath animated Sankranti badhaai bhejo'],
    bn: ['পৌষ সংক্রান্তি — ঘুড়ির অ্যানিমেটেড উইশ', 'নীল আকাশে উড়ন্ত ঘুড়ি, ছাদ আর পিঠে-পুলি — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🪁 নাম দিয়ে অ্যানিমেটেড সংক্রান্তির উইশ পাঠাও'] },
  { slug: 'lohri', emoji: '🔥', festival: 'lohri',
    hi: ['लोहड़ी — अलाव वाला एनिमेटेड विश', 'जलता अलाव, उड़ती चिंगारियाँ, भांगड़ा और रेवड़ी — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🔥 नाम के साथ एनिमेटेड लोहड़ी बधाई भेजो'],
    en: ['Happy Lohri — animated bonfire wish', 'A blazing bonfire, flying sparks, bhangra and rewri — send a greeting with their name, read aloud, on WhatsApp.', '🔥 Send an animated Lohri wish with a name'],
    hinglish: ['Lohri — alaav wala animated wish', 'Jalta alaav, udti chingaariyan, bhangra aur rewri — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🔥 Naam ke saath animated Lohri badhaai bhejo'],
    bn: ['লোহরি — আগুনের অ্যানিমেটেড উইশ', 'জ্বলন্ত আগুন, উড়ন্ত স্ফুলিঙ্গ, ভাংড়া আর রেউড়ি — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🔥 নাম দিয়ে অ্যানিমেটেড লোহরির উইশ পাঠাও'] },
  { slug: 'republic-day', emoji: '🇮🇳', festival: 'republic-day',
    hi: ['गणतंत्र दिवस — लहराते तिरंगे वाला एनिमेटेड विश', 'इंडिया गेट के ऊपर लहराता तिरंगा, फूलों की बारिश और तिरंगा फ़्लाईपास्ट — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🇮🇳 नाम के साथ एनिमेटेड गणतंत्र दिवस बधाई भेजो'],
    en: ['Happy Republic Day — animated tricolour wish', 'The tricolour unfurling over India Gate, falling petals and a tricolour flypast — send a greeting with their name, read aloud, on WhatsApp.', '🇮🇳 Send an animated Republic Day wish with a name'],
    hinglish: ['Republic Day — lehrate tirange wala animated wish', 'India Gate ke upar lehrata tiranga, phoolon ki baarish aur tiranga flypast — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🇮🇳 Naam ke saath animated Republic Day badhaai bhejo'],
    bn: ['প্রজাতন্ত্র দিবস — তেরঙার অ্যানিমেটেড উইশ', 'ইন্ডিয়া গেটের ওপর উড়ন্ত তেরঙা, ফুলের বৃষ্টি আর তেরঙা ফ্লাইপাস্ট — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🇮🇳 নাম দিয়ে অ্যানিমেটেড প্রজাতন্ত্র দিবসের উইশ পাঠাও'] },
  { slug: 'vasant-panchami', emoji: '🌼', festival: 'vasant-panchami',
    hi: ['वसंत पंचमी — सरसों के खेतों वाला एनिमेटेड विश', 'पीले सरसों के खेत, बसंती आसमान में पतंगें और गिरती पंखुड़ियाँ — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🌼 नाम के साथ एनिमेटेड वसंत पंचमी बधाई भेजो'],
    en: ['Vasant Panchami — animated mustard-field wish', 'Yellow mustard fields, kites in a spring sky and falling petals — send a greeting with their name, read aloud, on WhatsApp.', '🌼 Send an animated Vasant Panchami wish with a name'],
    hinglish: ['Vasant Panchami — sarson ke khet wala animated wish', 'Peele sarson ke khet, basanti aasmaan mein patangein aur girti pankhudiyan — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🌼 Naam ke saath animated Vasant Panchami badhaai bhejo'],
    bn: ['সরস্বতী পুজো — সরষে খেতের অ্যানিমেটেড উইশ', 'হলুদ সরষে খেত, বসন্তের আকাশে ঘুড়ি আর ঝরে পড়া পাপড়ি — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🌼 নাম দিয়ে অ্যানিমেটেড সরস্বতী পুজোর উইশ পাঠাও'] },
  { slug: 'maha-shivratri', emoji: '🔱', festival: 'maha-shivratri',
    hi: ['महाशिवरात्रि — शिवलिंग वाला एनिमेटेड विश', 'चाँद और कैलाश के नीचे रोशन शिवलिंग, अभिषेक, बेलपत्र और दीये — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🔱 नाम के साथ एनिमेटेड महाशिवरात्रि बधाई भेजो'],
    en: ['Maha Shivratri — animated Shivling wish', 'A glowing Shivling under the moon and Kailash, abhishek, bel leaves and diyas — send a greeting with their name, read aloud, on WhatsApp.', '🔱 Send an animated Maha Shivratri wish with a name'],
    hinglish: ['Maha Shivratri — Shivling wala animated wish', 'Chaand aur Kailash ke neeche roshan Shivling, abhishek, bel patra aur diye — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🔱 Naam ke saath animated Maha Shivratri badhaai bhejo'],
    bn: ['মহাশিবরাত্রি — শিবলিঙ্গের অ্যানিমেটেড উইশ', 'চাঁদ আর কৈলাসের নিচে আলোকিত শিবলিঙ্গ, অভিষেক, বেলপাতা আর প্রদীপ — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🔱 নাম দিয়ে অ্যানিমেটেড মহাশিবরাত্রির শুভেচ্ছা পাঠাও'] },
  { slug: 'eid-mubarak', emoji: '🌙', festival: 'eid-ul-fitr',
    hi: ['ईद मुबारक — चाँद वाला एनिमेटेड विश', 'ईद का चाँद, रोशन मस्जिद, झूलते फ़ानूस और चमकते तारे — अपनों के नाम की मुबारकबाद आवाज़ के साथ WhatsApp पर भेजो।', '🌙 नाम के साथ एनिमेटेड ईद मुबारक भेजो'],
    en: ['Eid Mubarak — animated moon wish', 'The Eid crescent, a glowing masjid, swinging lanterns and sparkling stars — send a greeting with their name, read aloud, on WhatsApp.', '🌙 Send an animated Eid Mubarak with a name'],
    hinglish: ['Eid Mubarak — chaand wala animated wish', 'Eid ka chaand, roshan masjid, jhoolte fanoos aur chamakte taare — apnon ke naam ki mubarakbaad awaaz ke saath WhatsApp pe bhejo.', '🌙 Naam ke saath animated Eid Mubarak bhejo'],
    bn: ['ঈদ মোবারক — চাঁদের অ্যানিমেটেড উইশ', 'ঈদের চাঁদ, আলোকিত মসজিদ, দোলানো লণ্ঠন আর ঝিকমিক তারা — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🌙 নাম দিয়ে অ্যানিমেটেড ঈদ মোবারক পাঠাও'] },
  { slug: 'holi', emoji: '🎨', festival: 'holi',
    hi: ['होली — उड़ते गुलाल वाला एनिमेटेड विश', 'गुलाल के बादल, पिचकारी की धार और रंग-बिरंगे गुब्बारे — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🎨 नाम के साथ एनिमेटेड होली बधाई भेजो'],
    en: ['Happy Holi — animated gulal wish', 'Clouds of gulal, pichkari streams and colourful balloons — send a greeting with their name, read aloud, on WhatsApp.', '🎨 Send an animated Holi wish with a name'],
    hinglish: ['Holi — udte gulal wala animated wish', 'Gulal ke baadal, pichkari ki dhaar aur rang-birange gubbare — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🎨 Naam ke saath animated Holi badhaai bhejo'],
    bn: ['দোল / হোলি — আবিরের অ্যানিমেটেড উইশ', 'আবিরের মেঘ, পিচকারির ধারা আর রঙিন বেলুন — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🎨 নাম দিয়ে অ্যানিমেটেড দোলের শুভেচ্ছা পাঠাও'] },
  { slug: 'birthday', emoji: '🎂', wish: 'birthday',
    hi: ['जन्मदिन मुबारक — मोमबत्तियों वाला एनिमेटेड विश', 'गुब्बारे, झंडियाँ और मोमबत्तियों वाला केक जो फूँक से बुझता है — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🎂 नाम के साथ एनिमेटेड जन्मदिन विश भेजो'],
    en: ['Happy Birthday — animated wish with candles', 'Balloons, bunting and a cake whose candles blow out — send a greeting with their name, read aloud, on WhatsApp.', '🎂 Send an animated birthday wish with a name'],
    hinglish: ['Happy Birthday — mombattiyon wala animated wish', 'Gubbare, jhandiyan aur mombattiyon wala cake jo phoonk se bujhta hai — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🎂 Naam ke saath animated birthday wish bhejo'],
    bn: ['শুভ জন্মদিন — মোমবাতির অ্যানিমেটেড উইশ', 'বেলুন, পতাকার মালা আর মোমবাতি দেওয়া কেক যা ফুঁয়ে নিভে যায় — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🎂 নাম দিয়ে অ্যানিমেটেড জন্মদিনের উইশ পাঠাও'] },
  { slug: 'chhath-puja', emoji: '🌅', festival: 'chhath-puja',
    hi: ['छठ पूजा की शुभकामनाएँ — नाम वाला एनिमेटेड विश', 'घाट पर सूरज, अर्घ्य देते व्रती, तैरते दीये और कोसी — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🌅 नाम के साथ एनिमेटेड छठ बधाई भेजो'],
    en: ['Happy Chhath Puja — animated wish with name', 'The sun over the ghat, vratis offering arghya, floating diyas and a kosi — send a greeting with their name, read aloud, on WhatsApp.', '🌅 Send an animated Chhath wish with a name'],
    hinglish: ['Chhath Puja ki Shubhkamnayein — naam wala animated wish', 'Ghat pe suraj, arghya dete vrati, tairte diye aur kosi — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🌅 Naam ke saath animated Chhath badhaai bhejo'],
    bn: ['ছট পুজোর শুভেচ্ছা — নামের অ্যানিমেটেড উইশ', 'ঘাটে সূর্য, অর্ঘ্য দিচ্ছেন ব্রতীরা, ভাসমান প্রদীপ আর কোসি — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🌅 নাম দিয়ে অ্যানিমেটেড ছটের শুভেচ্ছা পাঠাও'] },
  { slug: 'christmas', emoji: '🎄', festival: 'christmas',
    hi: ['मेरी क्रिसमस — नाम वाला एनिमेटेड विश', 'गिरती बर्फ़, जगमगाता क्रिसमस ट्री और सांता की स्लेज — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🎄 नाम के साथ एनिमेटेड क्रिसमस विश भेजो'],
    en: ['Merry Christmas — animated wish with name', 'Falling snow, a glowing Christmas tree and Santa\'s sleigh — send a greeting with their name, read aloud, on WhatsApp.', '🎄 Send an animated Christmas wish with a name'],
    hinglish: ['Merry Christmas — naam wala animated wish', 'Girti barf, jagmagata Christmas tree aur Santa ki sleigh — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🎄 Naam ke saath animated Christmas wish bhejo'],
    bn: ['মেরি ক্রিসমাস — নামের অ্যানিমেটেড উইশ', 'ঝরে পড়া বরফ, ঝলমলে ক্রিসমাস ট্রি আর সান্তার স্লেজ — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🎄 নাম দিয়ে অ্যানিমেটেড বড়দিনের শুভেচ্ছা পাঠাও'] },
  { slug: 'new-year', emoji: '🎆', festival: 'new-year',
    hi: ['नया साल मुबारक — आतिशबाज़ी वाला विश', 'शहर के ऊपर आतिशबाज़ी, कंफ़ेटी और नए साल की बधाई — अपनों के नाम के साथ, आवाज़ में, WhatsApp पर भेजो।', '🎆 नाम के साथ एनिमेटेड नए साल की बधाई भेजो'],
    en: ['Happy New Year — fireworks wish with name', 'Fireworks over a city skyline, confetti and a New Year greeting with their name, read aloud — send it on WhatsApp.', '🎆 Send an animated New Year wish with a name'],
    hinglish: ['Happy New Year — fireworks wala wish', 'Shehar ke upar aatishbaazi, confetti aur naye saal ki badhaai — apnon ke naam ke saath, awaaz mein, WhatsApp pe bhejo.', '🎆 Naam ke saath animated New Year wish bhejo'],
    bn: ['হ্যাপি নিউ ইয়ার — আতশবাজির উইশ', 'শহরের আকাশে আতশবাজি, কনফেটি আর নতুন বছরের শুভেচ্ছা — প্রিয়জনের নামে, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🎆 নাম দিয়ে অ্যানিমেটেড নববর্ষের শুভেচ্ছা পাঠাও'] },
  { slug: 'good-morning', emoji: '☀️', wish: 'good-morning',
    hi: ['सुप्रभात — उगते सूरज वाला विश', 'उगता सूरज, उड़ते पंछी और खिलते फूल — अपनों के नाम का सुबह का पैग़ाम, आवाज़ के साथ। रोज़ नया संदेश।', '☀️ नाम के साथ एनिमेटेड सुप्रभात भेजो'],
    en: ['Good Morning — sunrise wish with name', 'The sun rising, birds and blooming flowers — a morning message with their name, read aloud. A fresh one every day.', '☀️ Send an animated Good Morning with a name'],
    hinglish: ['Good Morning — ugte sooraj wala wish', 'Ugta sooraj, udte panchhi aur khilte phool — apnon ke naam ka subah ka paigaam, awaaz ke saath. Roz naya message.', '☀️ Naam ke saath animated Good Morning bhejo'],
    bn: ['সুপ্রভাত — সূর্যোদয়ের উইশ', 'সূর্যোদয়, উড়ন্ত পাখি আর ফুটন্ত ফুল — প্রিয়জনের নামে সকালের বার্তা, পড়ে শোনানো সহ। রোজ নতুন বার্তা।', '☀️ নাম দিয়ে অ্যানিমেটেড সুপ্রভাত পাঠাও'] },
  { slug: 'gurpurab', emoji: '🙏', festival: 'guru-nanak-jayanti',
    hi: ['गुरपुरब की बधाई — नाम वाला एनिमेटेड विश', 'रोशन गुरुद्वारा, पूरा चाँद और दीये — अपनों के नाम की बधाई आवाज़ के साथ WhatsApp पर भेजो।', '🙏 नाम के साथ एनिमेटेड गुरपुरब बधाई भेजो'],
    en: ['Happy Gurpurab — animated wish with name', 'A lit Gurdwara, the full moon and diyas — send a greeting with their name, read aloud, on WhatsApp.', '🙏 Send an animated Gurpurab wish with a name'],
    hinglish: ['Gurpurab ki Badhaai — naam wala animated wish', 'Roshan Gurdwara, poora chaand aur diye — apnon ke naam ki badhaai awaaz ke saath WhatsApp pe bhejo.', '🙏 Naam ke saath animated Gurpurab badhaai bhejo'],
    bn: ['গুরপরবের শুভেচ্ছা — নামের অ্যানিমেটেড উইশ', 'আলোকিত গুরুদ্বার, পূর্ণিমার চাঁদ আর প্রদীপ — প্রিয়জনের নামে শুভেচ্ছা, পড়ে শোনানো সহ WhatsApp-এ পাঠাও।', '🙏 নাম দিয়ে অ্যানিমেটেড গুরপরবের শুভেচ্ছা পাঠাও'] },
  { slug: 'shaadi-mubarak', emoji: '💍',
    hi: ['शादी मुबारक — आतिशबाज़ी वाला विश', 'दोस्त का नाम डालो — आतिशबाज़ी, बैंड-बाजा और फूलों की बारिश के साथ WhatsApp पर भेजो।'],
    en: ['Shaadi Mubarak — animated wish', 'Add your friend\'s name — fireworks, a band-baaja tune and falling flowers. Send it on WhatsApp.'],
    hinglish: ['Shaadi Mubarak — fireworks wala wish', 'Dost ka naam daalo — fireworks, band-baaja aur phoolon ki baarish ke saath WhatsApp pe bhejo.'],
    bn: ['শুভ বিবাহ — আতশবাজির উইশ', 'বন্ধুর নাম দাও — আতশবাজি, বাজনা আর ফুলের বৃষ্টি সহ WhatsApp-এ পাঠাও।'] },
  { slug: 'jumma-mubarak', emoji: '🕌', wish: 'jumma-mubarak',
    hi: ['जुम्मा मुबारक — नाम वाली दुआ', 'रोशन मस्जिद, चाँद-तारे और अपनों के नाम की दुआ — हर जुमे WhatsApp पर भेजो।', '🕌 नाम के साथ एनिमेटेड जुम्मा मुबारक भेजो'],
    en: ['Jumma Mubarak — animated dua', 'A glowing masjid, the moon and stars, and a dua with their name — send it every Friday on WhatsApp.', '🕌 Send an animated Jumma Mubarak with a name'],
    hinglish: ['Jumma Mubarak — naam wali dua', 'Roshan masjid, chaand-taare aur apnon ke naam ki dua — har Jumme WhatsApp pe bhejo.', '🕌 Naam ke saath animated Jumma Mubarak bhejo'],
    bn: ['জুম্মা মুবারক — নামের দোয়া', 'আলোকিত মসজিদ, চাঁদ-তারা আর প্রিয়জনের নামে দোয়া — প্রতি জুম্মায় WhatsApp-এ পাঠাও।', '🕌 নাম দিয়ে অ্যানিমেটেড জুম্মা মুবারক পাঠাও'] },
];
// Animated wishes can be scheduled too ('celebrate:<slug>' in src/releases.mjs)
const CELEBRATE = ALL_CELEBRATE.filter((c) => isLive(`celebrate:${c.slug}`));
const heldCelebrate = ALL_CELEBRATE.filter((c) => !isLive(`celebrate:${c.slug}`)).map((c) => c.slug);
const celebrateHref = (L, c) => `/celebrate/${c.slug}/?lang=${L.code}`;
const celebrateCards = (L) => CELEBRATE.map((c) => `<a class="card" href="${celebrateHref(L, c)}">
<span class="emoji" aria-hidden="true">${c.emoji}</span>
<h3>${esc(c[L.code][0])}</h3>
<p>${esc(c[L.code][1])}</p>
</a>`).join('');
const celebrateButton = (L, key, slug) => {
  const c = CELEBRATE.find((x) => x[key] === slug);
  return c && c[L.code][2] ? `<div class="btns"><a class="btn btn-primary" href="${celebrateHref(L, c)}">${esc(c[L.code][2])}</a></div>` : '';
};

const islamicCard = (L) => `<a class="card" href="${P(L, '/islamic-calendar/')}">
<span class="emoji" aria-hidden="true">📅</span>
<h3>${esc(islamic.text[L.code].h1.replace('🌙 ', ''))}</h3>
<p>${esc(firstSentence(islamic.text[L.code].lead))}</p>
</a>`;

const toolCard = (L) => (tl) => {
  const [name, desc] = tl[L.code] || tl.en;
  return `<a class="card" href="/tools/${tl.slug}/?lang=${L.game}">
<span class="emoji" aria-hidden="true">${tl.emoji}</span>
<h3>${esc(name)}</h3>
<p>${esc(desc)}</p>
</a>`;
};

const gameCard = (L) => (g) => {
  const x = lgame(g, L);
  return `<a class="card" href="/games/${g.slug}/?lang=${L.game}">
<span class="emoji" aria-hidden="true">${g.emoji}</span>
<span class="tag">${esc(ui[L.code].games.tag(g.tag))}</span>
<h3>${esc(x.name)}</h3>
<p>${esc(x.desc)}</p>
</a>`;
};

const wishItems = (L, list) => list.map((w) => `<li><span>${esc(w)}</span><button class="copy" type="button" data-copy="${esc(w)}" data-done="${esc(ui[L.code].copied)}">${esc(ui[L.code].copy)}</button></li>`).join('');

/** "<name> sends you …" banner, filled by site.js from ?from= (as plain text). */
const fromBanner = (L, greet, emoji) => `<p class="from-banner" hidden data-tpl="${esc(ui[L.code].share.banner)}" data-greet="${esc(greet)}" data-emoji="${esc(emoji)}"></p>`;

/** "Make your own wish": your name → a link with ?from=<name> → WhatsApp. Nothing is stored. */
const shareBox = (L, path, title, wish) => {
  const S = ui[L.code].share;
  return `<div class="share-box" data-path="${esc(P(L, path))}" data-wish="${esc(wish)}" data-with-name="${esc(S.withName)}" data-without-name="${esc(S.withoutName)}" data-need-name="${esc(S.needName)}" data-copied="${esc(S.copied)}" data-copy-prompt="${esc(S.copyPrompt)}">
<h2>${esc(S.h)}</h2>
<p>${S.p(esc(title))}</p>
<div class="share-row"><input class="share-name" maxlength="30" placeholder="${esc(S.ph)}" aria-label="${esc(S.ph)}"><button class="btn btn-wa share-wa" type="button">${esc(S.wa)}</button><button class="btn btn-ghost share-copy" type="button">${esc(S.copy)}</button></div>
</div>`;
};

const paragraphs = (list) => list.map((p) => `<p>${esc(p)}</p>`).join('\n');
const faqBlock = (faq) => `<div class="faq">${faq.map((q) => `<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('')}</div>`;

/** Festivals from the current month on, wrapping round the year. */
const upcoming = () => {
  const m = new Date().getMonth() + 1;
  return [...festivals].sort((a, b) => ((a.month - m + 12) % 12) - ((b.month - m + 12) % 12));
};

// ---- Every page, once per language
LANGS.forEach((L) => {
  const T = ui[L.code];

  // Home
  write(
    L,
    '/',
    page(L, {
      path: '/',
      title: T.home.title,
      description: T.home.desc,
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, alternateName: 'NextGrade — Free Indian Utility Platform', url: `${SITE}${P(L, '/')}`, inLanguage: L.html, description: T.home.desc }, { '@context': 'https://schema.org', '@type': 'Organization', name: NAME, url: `${SITE}/`, logo: `${SITE}/icons/icon-512.png`, email: CONTACT, areaServed: 'IN', description: T.home.desc, knowsLanguage: ['hi', 'en', 'bn'] }],
      body: `<div class="wrap">
<div class="hero-box"><section class="hero">
<ul class="hero-badges">${HOME_BADGES[L.code].map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
<h1>${esc(HERO[L.code].h)}</h1>
<p>${esc(T.home.h1)}</p>
<form class="site-search" role="search" action="${P(L, '/')}" onsubmit="return false"><span class="ss-ico">${icon('search', 20)}</span><input type="search" id="ss-q" placeholder="${esc(HERO[L.code].q)}" aria-label="${esc(HERO[L.code].q)}" autocomplete="off" data-index="/assets/search-${L.code}.json?v=${V}" data-none="${esc(HERO[L.code].none)}"><ul id="ss-r" class="ss-r" hidden></ul></form>
<nav class="tiles" aria-label="Quick links">${HOME_TILES.map(([h, ic, c, n, perLang]) => `<a class="tile" href="${perLang ? P(L, h) : `${h}?lang=${L.game}`}"><i class="c-${c}">${icon(ic, 26)}</i>${esc(n[L.code])}</a>`).join('')}</nav>
</section></div>
<section><h2>${esc(UT[L.code].homeH)}</h2><div class="pills">${TOOL_CATS.filter((c) => toolsIn(c).length).map((c) => `<a href="${P(L, `/tools/#${c.id}`)}">${c.emoji} ${esc(c.name[L.code])}</a>`).join('')}${CALCS.length ? `<a href="${P(L, '/calculator/')}">${esc(UT[L.code].calcH)}</a>` : ''}</div><p><a class="see-all" href="${P(L, '/tools/')}">${esc(UT[L.code].all)}</a></p></section>
<section><h2>${esc(HOME_NEW_H[L.code])}</h2><div class="pills">${HOME_NEW.filter(([h]) => h !== '/shaadi-card/' || SHAADI_LIVE).map(([h, e, n, perLang]) => `<a href="${perLang ? P(L, h) : `${h}?lang=${L.game}`}">${e} ${esc(n[L.code])}</a>`).join('')}</div></section>
<section><h2>${esc(T.stories.h1)}</h2><div class="grid">${stories.slice(0, 3).map(storyCard(L)).join('')}</div><p><a class="see-all" href="${P(L, '/kahani/')}">${esc(T.stories.all)} →</a></p></section>
<section><h2>${esc(T.home.secWishes)}</h2><div class="grid">${celebrateCards(L)}${wishes.map(wishCard(L)).join('')}${islamicCard(L)}</div></section>
<section><h2>${esc(T.home.secUpcoming)}</h2><div class="grid">${upcoming().slice(0, 6).map(festivalCard(L)).join('')}</div></section>
<section><h2>${esc(T.home.secGames)}</h2><div class="grid">${games.map(gameCard(L)).join('')}</div></section>
<section><h2>${esc(T.home.secApps)}</h2><div class="grid">${apps.map(appCard(L)).join('')}</div></section>
<section class="narrow"><h2>${esc(T.home.aboutH)}</h2><p>${esc(T.home.aboutP)}</p></section>
</div>`,
    }),
  );

  // Festivals index
  write(
    L,
    '/festivals/',
    page(L, {
      path: '/festivals/',
      title: T.festivals.title,
      description: T.festivals.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.festivals, '/festivals/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.festivals)}</p>
<h1>${esc(T.festivals.h1)}</h1>
<p class="lead">${esc(T.festivals.lead)}</p>
<p><a class="btn btn-ghost" href="${P(L, `/festivals/${LIST_YEAR}/`)}">${esc(DATE_TEXT[L.code].listLink(LIST_YEAR))}</a></p>
<div class="grid">${upcoming().map(festivalCard(L)).join('')}</div>
<p class="note" style="margin-top:20px">${esc(T.festivals.note)}</p>
</div>`,
    }),
  );

  // Festival dates for one year (/festivals/2027/)
  {
    const DT = DATE_TEXT[L.code], path = `/festivals/${LIST_YEAR}/`;
    const rows = festivalsInYear(LIST_YEAR).filter((e) => festivals.some((z) => z.slug === e.slug)).map((e) => { const f = festivals.find((z) => z.slug === e.slug); const x = lf(f, L); return { e, f, x }; });
    const notes = [...new Set(rows.filter((r) => r.e.note).map((r) => `${r.x.name}: ${DT.notes[r.e.note]}`))];
    write(
      L,
      path,
      page(L, {
        path,
        title: DT.listTitle(LIST_YEAR),
        description: DT.listDesc(LIST_YEAR),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.festivals, '/festivals/'], [String(LIST_YEAR), path]]), { '@context': 'https://schema.org', '@type': 'ItemList', name: DT.listH1(LIST_YEAR).replace('📅 ', ''), itemListElement: rows.map((r, k) => ({ '@type': 'ListItem', position: k + 1, name: `${r.x.name} — ${fmt(L.code, r.e.d)}`, url: `${SITE}${P(L, `/festivals/${r.f.slug}/`)}` })) }],
        body: `<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/festivals/')}">${esc(T.nav.festivals)}</a> › ${LIST_YEAR}</p>
<h1>${esc(DT.listH1(LIST_YEAR))}</h1>
<p class="lead">${esc(DT.listLead(LIST_YEAR))}</p>
<div class="tblwrap"><table class="dates"><tr><th>${esc(DT.th[0])}</th><th>${esc(DT.th[1])}</th><th>${esc(DT.th[2])}</th></tr>
${rows.map((r) => `<tr><td>${r.f.emoji} <a href="${P(L, `/festivals/${r.f.slug}/`)}">${esc(r.x.name)}</a></td><td>${esc(fmt(L.code, r.e.d))}${r.e.approx ? ` (${esc(DT.approx)})` : ''}</td><td>${esc(weekday(L.code, r.e.d))}</td></tr>`).join('\n')}
</table></div>
${notes.length ? `<ul class="note">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
<p class="note">${esc(DT.local)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(T.festival.moreH)}</h2>
<div class="grid">${upcoming().slice(0, 6).map(festivalCard(L)).join('')}</div>
</div>`,
      }),
    );
  }

  // Calendar pages (/calendar/2027/ and /calendar/2027/<month>/)
  {
    const C = CT[L.code], Y = CAL_YEAR, MN = (i) => fmt(L.code, `${Y}-${String(i + 1).padStart(2, '0')}-01`).replace(/^1 /, '').replace(` ${Y}`, '');
    const hijri = hijriStarts(Y), hname = (n) => (islamic.months.find((x) => x.n === n) || {})[L.code] || '';
    // every marked day of the year: { d, emoji, name, href, holiday, approx, hijri }
    const marks = [];
    Object.entries(DATES).forEach(([slug, list]) => list.filter((x) => x.d.startsWith(`${Y}-`)).forEach((x) => {
      const f = allFestivals.find((z) => z.slug === slug); if (!f) return;
      const live = festivals.some((z) => z.slug === slug);
      marks.push({ d: x.d, emoji: f.emoji, name: lf(f, L).name, href: live ? P(L, `/festivals/${slug}/`) : '', holiday: HOLIDAY_SLUGS.includes(slug), approx: !!x.approx });
    }));
    NATIONAL.forEach((n) => marks.push({ d: `${Y}${n.d}`, emoji: n.emoji, name: n[L.code], href: '', holiday: true }));
    hijri.forEach((h) => marks.push({ d: h.ymd, emoji: '🌙', name: C.hijriStart(hname(h.n)), href: P(L, '/islamic-calendar/'), hijri: true }));
    marks.sort((a, b) => a.d.localeCompare(b.d));
    const days = (m) => new Date(Date.UTC(+Y, m + 1, 0)).getUTCDate();
    const first = (m) => new Date(Date.UTC(+Y, m, 1)).getUTCDay();
    const ymd = (m, d) => `${Y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const grid = (m, big) => {
      let h = `<table class="cal${big ? ' big' : ''}"><tr>${WDS[L.code].map((w, k) => `<th${k === 0 ? ' class="sun"' : ''}>${esc(w)}</th>`).join('')}</tr><tr>`;
      for (let k = 0; k < first(m); k++) h += '<td></td>';
      for (let d = 1; d <= days(m); d++) {
        const col = (first(m) + d - 1) % 7, ms = marks.filter((x) => x.d === ymd(m, d)), hol = ms.some((x) => x.holiday);
        if (col === 0 && d > 1) h += '</tr><tr>';
        h += `<td class="${[col === 0 ? 'sun' : '', hol ? 'hol' : '', ms.length ? 'mk' : ''].filter(Boolean).join(' ')}"><b>${d}</b>${big ? ms.map((x) => `<span>${x.emoji} ${esc(x.name.replace(/ \((approx\.|लगभग|lagbhag|আনুমানিক)\)$/, ''))}</span>`).join('') : ''}</td>`;
      }
      return h + '</tr></table>';
    };
    const css = `<style>.cal{width:100%;border-collapse:collapse;table-layout:fixed;margin:8px 0}.cal th{font-size:.75rem;padding:4px 0;opacity:.75}.cal td{text-align:center;padding:4px 0;font-size:.85rem;border-radius:8px}.cal .sun{color:#d6336c}.cal td.hol{background:rgba(214,51,108,.12);color:#d6336c;font-weight:700}.cal td.mk:not(.hol){background:rgba(245,159,0,.16)}.cal.big td{vertical-align:top;height:64px;border:1px solid rgba(128,128,128,.2);text-align:start;padding:4px}.cal.big b{display:block;font-size:1rem}.cal.big span{display:block;font-size:.62rem;line-height:1.2;margin-top:2px;font-weight:600;overflow-wrap:anywhere}.calgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}.calgrid a.mon{display:block;padding:10px;border:1px solid rgba(128,128,128,.25);border-radius:14px;text-decoration:none;color:inherit}.calgrid h3{margin:0 0 4px;font-size:1.05rem}.calnav{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:12px 0}@media print{header,footer,nav,.ad,.calnav,.btns,.share,.no-print{display:none!important}.cal.big td{height:80px}}</style>`;
    const fest = (m) => marks.filter((x) => x.d.slice(5, 7) === String(m + 1).padStart(2, '0'));
    const li = (x) => `<li>${x.emoji} <b>${esc(fmt(L.code, x.d))}</b> (${esc(weekday(L.code, x.d))}) — ${x.href ? `<a href="${x.href}">${esc(x.name)}</a>` : esc(x.name)}${x.approx ? ` (${esc(C.approx)})` : ''}${x.holiday ? ` · <span class="hol">${esc(C.holiday)}</span>` : ''}</li>`;
    const ypath = `/calendar/${Y}/`;
    write(L, ypath, page(L, {
      path: ypath, title: C.yearTitle(Y), description: C.yearDesc(Y),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.festivals, '/festivals/'], [C.nav, ypath]])],
      body: `${css}<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/festivals/')}">${esc(T.nav.festivals)}</a> › ${esc(C.nav)}</p>
<h1>${esc(C.yearH1(Y))}</h1>
<p class="lead">${esc(C.yearLead(Y))}</p>
<div class="btns"><button class="btn btn-ghost" onclick="print()">${esc(C.print)}</button> <a class="btn btn-ghost" href="${P(L, `/festivals/${Y}/`)}">${esc(C.list(Y))}</a></div>
<div class="calgrid">${SLUG_M.map((s, m) => `<a class="mon" href="${P(L, `${ypath}${s}/`)}"><h3>${esc(MN(m))}</h3>${grid(m, false)}</a>`).join('')}</div>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(C.festH.replace(/इस महीने के |this month|Is mahine ke |এই মাসের /, ''))} ${Y}</h2>
<ul>${marks.filter((x) => !x.hijri).map(li).join('')}</ul>
<p class="note">${esc(C.panchang)} ${esc(C.hijriNote)}</p>
</div>`,
    }));
    SLUG_M.forEach((s, m) => {
      const path = `${ypath}${s}/`, name = MN(m), fs = fest(m), sun = [...Array(days(m))].filter((_, d) => (first(m) + d) % 7 === 0).length, sat = [...Array(days(m))].filter((_, d) => (first(m) + d) % 7 === 6).length;
      const hol = fs.filter((x) => x.holiday).map((x) => `${x.name} (${fmt(L.code, x.d)})`).join(', ');
      const faq = C.faq(name, Y, days(m), sun, hol);
      const prev = m > 0 ? `${ypath}${SLUG_M[m - 1]}/` : '', next = m < 11 ? `${ypath}${SLUG_M[m + 1]}/` : '';
      write(L, path, page(L, {
        path, title: C.monthTitle(name, Y), description: C.monthDesc(name, Y, fs.filter((x) => !x.hijri).map((x) => x.name).slice(0, 4).join(', ')),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [C.nav, ypath], [name, path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
        body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, ypath)}">${esc(C.nav)}</a> › ${esc(name)}</p>
<h1>${esc(C.monthH1(name, Y))}</h1>
<p class="lead">${esc(C.facts(name, Y, days(m), sun, sat))} ${esc(C.startsOn(name, weekday(L.code, ymd(m, 1))))}</p>
<div class="btns"><button class="btn btn-ghost" onclick="print()">${esc(C.print)}</button></div>
${grid(m, true)}
<div class="calnav">${prev ? `<a href="${P(L, prev)}">${esc(C.prev)}</a>` : '<span></span>'}<a href="${P(L, ypath)}">${esc(C.all(Y))}</a>${next ? `<a href="${P(L, next)}">${esc(C.next)}</a>` : '<span></span>'}</div>
<h2>${esc(C.festH)}</h2>
${fs.filter((x) => !x.hijri).length ? `<ul>${fs.filter((x) => !x.hijri).map(li).join('')}</ul>` : `<p>${esc(C.none)}</p>`}
${fs.some((x) => x.hijri) ? `<h2>${esc(C.hijriH)}</h2><ul>${fs.filter((x) => x.hijri).map(li).join('')}</ul><p class="note">${esc(C.hijriNote)}</p>` : ''}
<p class="note">${esc(C.panchang)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(C.faqH)}</h2>
${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n')}
</div>`,
      }));
    });
  }

  // Weather pages (/mausam/ + one page per city)
  buildWeather(L, { page, write, P, esc, T, breadcrumbLd });
  buildTravel(L, { page, write, P, esc, T, breadcrumbLd });
  buildNuskhe(L, { page, write, P, esc, T, breadcrumbLd, articleLd });
  buildSurya(L, { page, write, P, esc, T, breadcrumbLd, articleLd });
  buildCreatorGuide(L, { page, write, P, esc, T, breadcrumbLd });
  buildTithi(L, { page, write, P, esc, T, breadcrumbLd });
  buildSarkari(L, { page, write, P, esc, T, breadcrumbLd });
  buildPranayam(L, { page, write, P, esc, T, breadcrumbLd });
  buildNumberWords(L, { page, write, P, esc, T, breadcrumbLd });
  buildAaj(L, { page, write, P, esc, T, breadcrumbLd, festName: (slug, LL) => { const f = allFestivals.find((z) => z.slug === slug); return f ? lf(f, LL).name : null; } });
  if (L.code === 'en') buildRegionalWishes(L, { page, write, esc, T, breadcrumbLd });

  // Festival pages
  festivals.forEach((f, i) => {
    const path = `/festivals/${f.slug}/`;
    const x = lf(f, L);
    const F = T.festival;
    const next = [1, 2, 3].map((k) => festivals[(i + k) % festivals.length]);
    const DT = DATE_TEXT[L.code];
    const nd = nextFestivalDate(f.slug, L.code, x.name, todayIST());
    const why = whyFaq(f.slug, L.code);
    const faq = [...(nd ? [{ q: nd.q, a: nd.a }] : []), ...(why ? [why] : []), ...x.faq];
    write(
      L,
      path,
      page(L, {
        path,
        title: nd ? DT.titleY(x.name, nd.year) : F.title(x.name, x.alt),
        description: nd ? `${nd.a} ${F.desc(x.name, x.when)}` : F.desc(x.name, x.when),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.festivals, '/festivals/'], [x.name, path]]), articleLd(L, `${x.name} (${x.alt})`, path), faqLd(faq)],
        body: `<article class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/festivals/')}">${esc(T.nav.festivals)}</a> › ${esc(x.name)}</p>
${fromBanner(L, F.greet(x.name), f.emoji)}
<h1>${f.emoji} ${esc(x.name)} <span style="color:var(--muted);font-weight:600">· ${esc(x.alt)}</span></h1>
${nd ? `<div class="when-box"><p class="when-q">📅 ${esc(nd.q)}</p><p class="when-a"><b>${esc(nd.date)}</b>, ${esc(nd.weekday)}${nd.approx ? ` (${esc(DT.approx)})` : ''} · <span class="when-left">${esc(nd.left)}</span></p><p class="when-note">${esc(nd.a)} <a href="${P(L, `/festivals/${LIST_YEAR}/`)}">${esc(DT.listLink(LIST_YEAR))}</a></p></div>` : ''}
<p class="lead">${esc(x.intro)}</p>
${celebrateButton(L, 'festival', f.slug)}
${SPEECHES.some((sp) => sp.festival === f.slug) ? `<div class="btns"><a class="btn btn-ghost" href="${P(L, `/speech/${SPEECHES.find((sp) => sp.festival === f.slug).slug}/`)}">🎤 ${esc(SPEECHES.find((sp) => sp.festival === f.slug)[L.code].h1.replace(/^\S+\s/, ''))}</a></div>` : ''}
${NAAM_LIVE && NAAM_OCCASIONS.some((o) => o.slug === f.slug) ? `<div class="btns"><a class="btn btn-ghost" href="${P(L, `/naam-wali-image/${f.slug}/`)}">🖼️ ${esc(NAAM_OCCASIONS.find((o) => o.slug === f.slug)[L.code][0])}</a></div>` : ''}
<div class="facts">
<div class="fact"><b>${esc(F.when)}</b>${esc(x.when)}</div>
<div class="fact"><b>${esc(F.where)}</b>${esc(x.where)}</div>
</div>
${x.sections.map((s) => `<h2>${esc(s.h)}</h2>\n${paragraphs(s.p)}`).join('\n')}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(F.wishesH(x.name))}</h2>
<ul class="wish-list">${wishItems(L, x.wishes)}</ul>
<h2>${esc(F.wishes2H(x.name))}</h2>
<ul class="wish-list">${wishItems(L, x.wishes2)}</ul>
${shareBox(L, path, F.shareTitle(x.name), x.wishes[0])}
<div class="cta"><p>${esc(F.cta(x.name))}</p><a class="btn btn-primary" href="${P(L, `/wish-card/?f=${f.slug}`)}">${esc(T.home.btnCard)}</a></div>
${x.summary.length && F.summaryH ? `<h2>${esc(F.summaryH)}</h2>\n${paragraphs(x.summary)}` : ''}
<h2>${esc(F.faqH)}</h2>
${faqBlock(faq)}
<h2>${esc(F.moreH)}</h2>
<div class="grid">${next.map(festivalCard(L)).join('')}</div>
</article>`,
      }),
    );
  });

  // Wishes index
  write(
    L,
    '/wishes/',
    page(L, {
      path: '/wishes/',
      title: T.wishIndex.title,
      description: T.wishIndex.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.wishes, '/wishes/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.wishes)}</p>
<h1>${esc(T.wishIndex.h1)}</h1>
<p class="lead">${esc(T.wishIndex.lead)}</p>
<div class="grid">${celebrateCards(L)}${wishes.map(wishCard(L)).join('')}${islamicCard(L)}</div>
<h2>🌐 ${esc({ hi: 'दूसरी भारतीय भाषाओं में शुभकामनाएँ', en: 'Wishes in other Indian languages', hinglish: 'Doosri Indian bhashaon mein wishes', bn: 'অন্য ভারতীয় ভাষায় শুভেচ্ছা' }[L.code])}</h2>
<p class="chips">${RLANGS.map((o) => `<a class="tag" href="/wishes/${o.slug}/" lang="${o.html}">${esc(o.name)} · ${o.en}</a>`).join(' ')}</p>
<h2>${esc(T.wishIndex.festH)}</h2>
<p>${T.wishIndex.festP(P(L, '/festivals/'))}</p>
</div>`,
    }),
  );

  // Birthday: 50+ Hindi–English pairs by relation (Search Console 26 Nov: "birthday wishes in hindi english", pos ~9)
  const bdayPairs = (LL) => { const B = BDAY_UI[LL.code]; return `<h2>${esc(B.h)}</h2><p>${esc(B.p)}</p><p class="chips">${BDAY.map(([k, h]) => `<a class="tag" href="#bd-${k}">${esc(h[LL.code])}</a>`).join(' ')}</p>${BDAY.map(([k, h, list]) => `<h3 id="bd-${k}">${esc(h[LL.code])}</h3><ul class="wish-list">${list.map(([a, b]) => `<li><span>${esc(a)}<br><i style="color:var(--muted)">${esc(b)}</i></span><button class="copy" type="button" data-copy="${esc(`${a}\n${b}`)}" data-done="${esc(ui[LL.code].copied)}">${esc(B.both)}</button></li>`).join('')}</ul>`).join('')}`; };
  const BDAY_TITLE = { hi: 'जन्मदिन की शुभकामनाएँ हिंदी और English में — 50+ दिल छू लेने वाले बर्थडे विश | NextGrade', en: 'Happy Birthday Wishes in Hindi and English — 50+ Heart Touching Messages | NextGrade', hinglish: 'Birthday Wishes in Hindi English — 50+ Heart Touching Janamdin ki Shubhkamnayein | NextGrade', bn: 'জন্মদিনের শুভেচ্ছা — হিন্দি, English আর বাংলায় ৫০+ বার্তা | NextGrade' };
  const BDAY_DESC = { hi: 'माँ, पापा, भाई, बहन, दोस्त, पति/पत्नी और बच्चों के लिए जन्मदिन की 50+ शुभकामनाएँ — हर एक हिंदी और English दोनों में। कॉपी करें या नाम के साथ WhatsApp पर भेजें।', en: '50+ birthday wishes in Hindi and English for mother, father, brother, sister, friend, husband/wife and kids — every wish in both languages. Copy, or send on WhatsApp with your name.', hinglish: 'Maa, papa, bhai, behen, dost, pati/patni aur bachchon ke liye 50+ birthday wishes — har ek Hindi aur English dono mein. Copy karein ya naam ke saath WhatsApp par bhejein.', bn: 'মা, বাবা, ভাই, বোন, বন্ধু, স্বামী/স্ত্রী আর ছোটদের জন্য ৫০+ জন্মদিনের শুভেচ্ছা — হিন্দি আর English দুটোতে, সঙ্গে বাংলা। কপি করুন বা নামসহ WhatsApp-এ পাঠান।' };
  // Wish pages
  wishes.forEach((w) => {
    const path = `/wishes/${w.slug}/`;
    const x = lw(w, L);
    const W = T.wish;
    const more = wishes.filter((o) => o.slug !== w.slug);
    write(
      L,
      path,
      page(L, {
        path,
        title: w.slug === 'birthday' ? BDAY_TITLE[L.code] : W.title(x.name, x.alt),
        description: w.slug === 'birthday' ? BDAY_DESC[L.code] : W.desc(x.name),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.wishes, '/wishes/'], [x.name, path]]), articleLd(L, `${x.name} (${x.alt})`, path), faqLd(x.faq)],
        body: `<article class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/wishes/')}">${esc(T.nav.wishes)}</a> › ${esc(x.name)}</p>
${fromBanner(L, x.greet, w.emoji)}
<h1>${w.emoji} ${esc(x.name)} <span style="color:var(--muted);font-weight:600">· ${esc(x.alt)}</span></h1>
<p class="lead">${esc(x.intro)}</p>
${celebrateButton(L, 'wish', w.slug)}
<h2>${esc(W.wishesH(x.name))}</h2>
<ul class="wish-list">${wishItems(L, x.wishes)}</ul>
<div class="ad" aria-hidden="true"></div>
${w.slug === 'birthday' ? bdayPairs(L) : ''}
<h2>${esc(W.wishes2H(x.name))}</h2>
<ul class="wish-list">${wishItems(L, x.wishes2)}</ul>
${shareBox(L, path, x.greet, x.wishes[0])}
<div class="cta"><p>${esc(W.cta(x.name))}</p><a class="btn btn-primary" href="${P(L, `/wish-card/?f=${w.slug}`)}">${esc(T.home.btnCard)}</a></div>
<h2>${esc(W.aboutH(x.name))}</h2>
${paragraphs(x.about)}
${x.summary.length && W.summaryH ? `<h2>${esc(W.summaryH)}</h2>\n${paragraphs(x.summary)}` : ''}
<h2>${esc(W.faqH)}</h2>
${faqBlock(x.faq)}
<h2>${esc(W.moreH)}</h2>
<div class="grid">${more.map(wishCard(L)).join('')}</div>
</article>`,
      }),
    );
  });

  // Islamic calendar: today's Hijri date (worked out in the browser) + the 12 months, facts and upcoming dates
  const I = islamic.text[L.code];
  const monthData = islamic.months.map((m) => ({ name: m[L.code], meaning: m.meaning[L.code] }));
  write(
    L,
    '/islamic-calendar/',
    page(L, {
      path: '/islamic-calendar/',
      title: I.title,
      description: I.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [I.h1.replace('🌙 ', ''), '/islamic-calendar/']]), articleLd(L, I.h1.replace('🌙 ', ''), '/islamic-calendar/')],
      scripts: ['/assets/islamic.js'],
      body: `<article class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(I.h1.replace('🌙 ', ''))}</p>
<h1>${esc(I.h1)}</h1>
<p class="lead">${esc(I.lead)}</p>
<div class="hijri-today" id="hijriToday" data-months="${esc(JSON.stringify(monthData))}" data-ah="${esc(I.ah)}" data-locale="${L.html === 'hi-Latn' ? 'en-IN' : L.html}">
<span class="hijri-label">${esc(I.todayLabel)}</span>
<strong class="hijri-date" id="hijriDate">—</strong>
<span class="hijri-greg" id="gregDate"></span>
<p class="hijri-meaning"><b>${esc(I.thisMonth)}:</b> <span id="hijriMeaning"></span></p>
</div>
<p class="note">${esc(I.approx)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(I.monthsH)}</h2>
<div class="table-wrap"><table class="months">
<thead><tr>${I.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
<tbody>${islamic.months.map((m) => `<tr><td>${m.n}</td><td><b>${esc(m[L.code])}</b></td><td lang="ar" dir="rtl">${m.ar}</td><td>${esc(m.meaning[L.code])}</td><td>${esc(m.days[L.code])}</td></tr>`).join('')}</tbody>
</table></div>
<h2>${esc(I.factsH)}</h2>
<ol class="facts-list">${islamic.facts[L.code].map((f) => `<li>${esc(f)}</li>`).join('')}</ol>
<h2>${esc(I.upcomingH)}</h2>
<div class="table-wrap"><table class="months"><tbody>${islamic.upcoming.map((u) => `<tr><td>${esc(u[L.code])}</td><td><b>${esc(u.date[L.code])}</b></td></tr>`).join('')}</tbody></table></div>
<p class="note">${esc(I.upcomingNote)}</p>
<h2>${esc(I.linksH)}</h2>
<div class="btns"><a class="btn btn-primary" href="/celebrate/jumma-mubarak/?lang=${L.code}">🕌 ${esc(I.jumma)}</a><a class="btn btn-ghost" href="${P(L, '/wishes/rajab-mubarak/')}">🌙 ${esc(I.rajab)}</a><a class="btn btn-ghost" href="${P(L, '/festivals/eid-ul-fitr/')}">${esc(I.eid)}</a></div>
</article>`,
    }),
  );

  // Stories index + story pages
  const S = T.stories;
  write(
    L,
    '/kahani/',
    page(L, {
      path: '/kahani/',
      title: S.title,
      description: S.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.stories, '/kahani/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.stories)}</p>
<h1>${esc(S.h1)}</h1>
<p class="lead">${esc(S.lead)}</p>
<div class="cta"><p><b>${esc(S.momH)}</b><br>${esc(S.momP)}</p></div>
${PAHELI_LIVE ? `<p><a class="btn btn-ghost" href="${P(L, '/paheliyan/')}">${esc(PAHELI_UI[L.code].h1)}</a></p>` : ''}
<p class="chips">${COLLECTIONS.filter((c) => stories.filter((st) => c.keys.includes(srcKey(st.source.en))).length >= 2).map((c) => `<a class="btn btn-ghost" href="${P(L, `/kahani/${c.slug}/`)}">${c.emoji} ${esc(c[L.code][0])}</a>`).join(' ')}</p>
<div class="grid">${stories.map(storyCard(L)).join('')}</div>
</div>`,
    }),
  );
  COLLECTIONS.forEach((c) => {
    const list = stories.filter((st) => c.keys.includes(srcKey(st.source.en)));
    if (list.length < 2) return;
    const [name, title, desc] = c[L.code], path = `/kahani/${c.slug}/`;
    const about = c.keys.map((k) => SOURCE_INFO[k] && SOURCE_INFO[k][L.code]).filter(Boolean);
    write(L, path, page(L, {
      path, title, description: desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.stories, '/kahani/'], [name, path]]), { '@context': 'https://schema.org', '@type': 'ItemList', name, itemListElement: list.map((st, k) => ({ '@type': 'ListItem', position: k + 1, name: st[L.code].title, url: `${SITE}${P(L, `/kahani/${st.slug}/`)}` })) }],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/kahani/')}">${esc(T.nav.stories)}</a> › ${esc(name)}</p>
<h1>${c.emoji} ${esc(name)}</h1>
<p class="lead">${esc(desc)}</p>
${paragraphs(about)}
<div class="grid">${list.map(storyCard(L)).join('')}</div>
<h2>${esc(S.seekh)}</h2>
<ul>${list.map((st) => `<li><a href="${P(L, `/kahani/${st.slug}/`)}">${esc(st[L.code].title)}</a> — ${esc(st[L.code].seekh)}</li>`).join('')}</ul>
<div class="ad" aria-hidden="true"></div>
<p class="chips">${COLLECTIONS.filter((o) => o.slug !== c.slug && stories.filter((st) => o.keys.includes(srcKey(st.source.en))).length >= 2).map((o) => `<a class="btn btn-ghost" href="${P(L, `/kahani/${o.slug}/`)}">${o.emoji} ${esc(o[L.code][0])}</a>`).join(' ')}</p>
</div>`,
    }));
  });
  stories.forEach((st, i) => {
    const path = `/kahani/${st.slug}/`;
    const x = st[L.code];
    const prev = stories[(i - 1 + stories.length) % stories.length];
    const next = stories[(i + 1) % stories.length];
    const more = [1, 2, 3].map((k) => stories[(i + k) % stories.length]);
    const ex = storyExtras(st, L.code);
    write(
      L,
      path,
      page(L, {
        path,
        title: `${x.title} — ${S.h1.replace('🌙 ', '')} | NextGrade`,
        description: `${firstSentence(x.paras[0])} ${x.seekh}`,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.stories, '/kahani/'], [x.title, path]]), { ...articleLd(L, x.title, path), '@type': 'Article', genre: st.source.en, timeRequired: `PT${st.minutes}M` }, faqLd(ex.faq)],
        scripts: ['/assets/voice.js', '/assets/story.js'],
        body: `<article class="wrap narrow article story-page" data-speech="${SPEECH[L.code]}" data-pause="${esc(S.pause)}" data-resume="${esc(S.resume)}" data-listen="${esc(S.listen)}" data-night="${esc(S.night)}" data-day="${esc(S.day)}" data-no-voice="${esc(S.noVoice)}" data-goodnight="${esc(S.goodnight)}" data-goodnight-sub="${esc(S.goodnightSub)}">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/kahani/')}">${esc(T.nav.stories)}</a> › ${esc(x.title)}</p>
<p class="tag">${esc(st.source[L.code])} · ${esc(S.minutes(st.minutes))}</p>
<h1>${st.emoji} ${esc(x.title)}</h1>
<div class="story-tools">
<button class="btn btn-primary" type="button" id="listen">${esc(S.listen)}</button>
<button class="btn btn-ghost" type="button" id="stopSpeak" hidden>${esc(S.stop)}</button>
<button class="btn btn-ghost" type="button" id="nightToggle">${esc(S.night)}</button>
<label class="timer"><span>⏲️ ${esc(S.timer)}</span><select id="sleepTimer"><option value="0">${esc(S.timerOff)}</option>${[5, 10, 15].map((m) => `<option value="${m}">${esc(S.timerMin(m))}</option>`).join('')}</select></label>
</div>
<p class="note" id="storyStatus" role="status"></p>
<div class="story-text" id="storyText">
${paragraphs(x.paras)}
</div>
<div class="seekh"><b>${esc(S.seekh)}</b><p>${esc(x.seekh)}</p></div>
<div class="story-nav"><a class="btn btn-ghost" href="${P(L, `/kahani/${prev.slug}/`)}">${esc(S.prev)}</a><a class="btn btn-primary" href="${P(L, `/kahani/${next.slug}/`)}">${esc(S.next)}</a></div>
<p><a class="btn btn-wa" href="https://wa.me/?text=${encodeURIComponent(S.shareText(x.title, `${SITE}${P(L, path)}`))}" target="_blank" rel="noopener">${esc(S.share)}</a></p>
${ex.about ? `<h2>${esc(ex.aboutH)}</h2>
<p>${esc(ex.about)}${(() => { const c = collectionOf(st); return c && stories.filter((z) => c.keys.includes(srcKey(z.source.en))).length >= 2 ? ` <a href="${P(L, `/kahani/${c.slug}/`)}">${c.emoji} ${esc(c[L.code][0])} →</a>` : ''; })()}</p>
` : ''}<h2>${esc(ex.faqH)}</h2>
${faqBlock(ex.faq)}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(S.moreH)}</h2>
<div class="grid">${more.map(storyCard(L)).join('')}</div>
</article>`,
      }),
    );
  });

  // Wish card maker (+ its data file for this language)
  const C = T.card;
  writeFileSync(
    join(OUT, 'assets', `cards.${L.code}.js`),
    `window.NG_FESTIVALS = ${JSON.stringify([
      ...wishes.map((w) => ({ w, x: lw(w, L) })),
      ...festivals.map((f) => ({ w: f, x: lf(f, L) })),
    ].map(({ w, x }) => ({ slug: w.slug, emoji: w.emoji, name: x.name, alt: x.alt, colors: w.colors, wishes: [...x.wishes, ...x.wishes2] })))};\nwindow.NG_CARD_UI = ${JSON.stringify({ dear: C.dear, downloaded: C.downloaded, cantShare: C.cantShare })};\n`,
  );
  write(
    L,
    '/wish-card/',
    page(L, {
      path: '/wish-card/',
      title: C.title,
      description: C.desc,
      jsonLd: [
        breadcrumbLd(L, [[T.nav.home, '/'], ['Wish Card Maker', '/wish-card/']]),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Wish Card Maker', url: `${SITE}${P(L, '/wish-card/')}`, applicationCategory: 'LifestyleApplication', operatingSystem: 'Any', inLanguage: L.html, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
      ],
      scripts: [`/assets/cards.${L.code}.js`, '/assets/card.js'],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › Wish Card Maker</p>
<h1>💌 Wish Card Maker</h1>
<p class="lead">${esc(C.lead)}</p>
${NAAM_LIVE ? `<p><a class="btn btn-ghost" href="${P(L, '/naam-wali-image/')}">${esc(NAAM_UI[L.code].hubH1)}</a></p>` : ''}
<div class="maker">
<form id="maker" onsubmit="return false">
<div class="field"><label for="festival">${esc(C.occasion)}</label><select id="festival"></select></div>
<div class="field"><label for="to">${esc(C.to)}</label><input id="to" maxlength="40" placeholder="${esc(C.toPh)}"></div>
<div class="field"><label for="from">${esc(C.from)}</label><input id="from" maxlength="40" placeholder="${esc(C.fromPh)}"></div>
<div class="field"><label for="wish">${esc(C.message)}</label><select id="wish"></select></div>
<div class="field"><label for="custom">${esc(C.custom)}</label><textarea id="custom" rows="3" maxlength="220" placeholder="${esc(C.customPh)}"></textarea></div>
<div class="btns"><button class="btn btn-primary" type="button" id="share">${esc(C.share)}</button><button class="btn btn-ghost" type="button" id="download">${esc(C.download)}</button></div>
<p class="note" id="status" role="status"></p>
</form>
<div class="preview"><canvas id="card" width="1080" height="1350" aria-label="${esc(C.preview)}"></canvas></div>
</div>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(C.howH)}</h2>
<ol>${C.how.map((li) => `<li>${li}</li>`).join('')}</ol>
</div>`,
    }),
  );

  // Kids learning: a hub plus one flashcard page per set (picture + name + sound). Live-by-default.
  {
    const KU = KIDS_UI[L.code];
    const kidsName = KU.hubH1.replace(/^\S+\s/, '');
    write(L, '/kids/', page(L, {
      path: '/kids/', title: KU.hubTitle, description: KU.hubDesc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [kidsName, '/kids/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(kidsName)}</p>
<h1>${esc(KU.hubH1)}</h1>
<p class="lead">${esc(KU.hubLead)}</p>
<div class="grid">${KIDS_SETS.map((s) => `<a class="card" href="${P(L, `/kids/${s.slug}/`)}"><span class="emoji" aria-hidden="true">${s.emoji}</span><h3>${esc(s.name[L.code] || s.name.en)}</h3></a>`).join('')}</div>
</div>`,
    }));
    // One flashcard page. key = file/audio key (set slug, or "<set>-<child>" for sub-pages); parent = [name, path] for sub-pages.
    const kidsPage = (s, key, path, nm, h1Emoji, parent, siblings, seo) => {
      // each page plays a recorded female voice in its own language: hi→Hindi (Lekha), bn→Bengali (Piya), en→English (Samantha); hinglish→Hindi
      const SPK = ({ hi: { say: 'hi', sub: 'en', lang: 'hi-IN', al: 'hi' }, hinglish: { say: 'hi', sub: 'en', lang: 'hi-IN', al: 'hi' }, bn: { say: 'bn', sub: 'en', lang: 'bn-IN', al: 'bn' }, en: { say: 'en', sub: 'hi', lang: 'en-US', al: 'en' } })[L.code];
      const kslug = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const FLANG = { en: 'en-US', hi: 'hi-IN', bn: 'bn-IN', ur: 'hi-IN' }; // Urdu letter names are spoken with the Hindi voice
      const isBn = L.code === 'bn';
      const items = s.fixedLang
        ? s.items.map((it, i) => ({ emoji: it.emoji, big: it.letter, sub: it.word || '', say: it.speak || it.letter, en: it.word || it.letter, lang: FLANG[s.fixedLang], audio: `/assets/kids-audio/${s.fixedLang}/${key}-${i}.mp3` }))
        : s.items.map((it) => ({
          emoji: (isBn && it.emojiBn) || it.emoji,
          big: it.big ? (isBn && it.bigBn) || it.big : it[SPK.say], // fixed big text (e.g. "2 × 3 = 6"): the spoken words go under it
          sub: it.big ? it[SPK.say] : it[SPK.sub] || '',
          say: it[SPK.say], en: it.en, lang: SPK.lang,
          corner: s.noCorner ? '' : (it[SPK.say] || '').charAt(0).toUpperCase(),
          audio: `/assets/kids-audio/${SPK.al}/${key}-${kslug(it.en)}.mp3`,
        }));
      const data = { items, ui: { tap: KU.tap, play: KU.play, stop: KU.stop, next: KU.next, prev: KU.prev, grid: KU.grid, note: KU.note } };
      writeFileSync(join(OUT, 'assets', `kids.${key}.${L.code}.js`), `window.KIDS = ${JSON.stringify(data)};\n`);
      const [seoTitle, seoDesc] = seo || [`${nm} — ${L.code === 'hi' ? 'तस्वीर और आवाज़ के साथ' : L.code === 'bn' ? 'ছবি ও শব্দ সহ' : 'with Pictures and Sound'}`, `${nm} — ${KU.pageLead}`];
      // the same cards as plain text, so search engines and AI assistants can read them (the grid itself is drawn by JavaScript)
      const listRows = items.map((it) => `<tr><td class="kl-e" aria-hidden="true">${it.emoji}</td><td class="kl-b">${esc(it.big)}</td><td>${esc(it.sub || '')}</td></tr>`).join('');
      write(L, path, page(L, {
        path,
        title: `${seoTitle} | NextGrade`,
        description: seoDesc,
        jsonLd: [
          breadcrumbLd(L, [[T.nav.home, '/'], [kidsName, '/kids/'], ...(parent ? [parent] : []), [nm, path]]),
          { '@context': 'https://schema.org', '@type': 'LearningResource', name: seoTitle, description: seoDesc, url: `${SITE}${P(L, path)}`, inLanguage: L.html, learningResourceType: 'Flashcards with audio', educationalLevel: 'Pre-school and primary school', isAccessibleForFree: true, audience: { '@type': 'EducationalAudience', educationalRole: 'student' }, publisher: { '@type': 'Organization', name: 'NextGrade', url: SITE } },
        ],
        scripts: [`/assets/kids.${key}.${L.code}.js`, '/assets/kids.js'],
        body: `<style>
.kids-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px;margin:16px 0}
.kids-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:24px 10px 16px;border:2px solid #e6e3da;border-radius:20px;background:#fff;cursor:pointer;transition:transform .12s,box-shadow .12s;color:#1b1b1b}
.kids-letter{position:absolute;top:8px;left:9px;font-weight:800;font-size:1.15rem;line-height:1;color:#c97d2a;background:#fff4e2;border:1.5px solid #ecc98f;border-radius:9px;min-width:28px;height:28px;display:flex;align-items:center;justify-content:center;padding:0 5px}
.kids-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.14);transform:translateY(-2px)}
.kids-card.pop{transform:scale(1.1)}
.kids-emoji{font-size:5.2rem;line-height:1}
.kids-en{font-weight:800;font-size:1.5rem;color:#141414}
.kids-native{font-size:1.05rem;color:#6a6a6a;font-weight:600}
.kids-spk{font-size:1rem;color:#c99a3a}
.kids-text{padding:20px 8px 14px}.kids-text .kids-en{font-size:1.4rem;overflow-wrap:anywhere;text-align:center}.kids-text .kids-native{text-align:center}
.kids-sibs{line-height:2}
.kids-img{width:1em;height:1em;display:inline-block;vertical-align:middle}
.kids-list{border-collapse:collapse;width:100%;margin:8px 0 18px}.kids-list td{border-bottom:1px solid #e6e3da;padding:6px 8px}.kids-list .kl-e{font-size:1.5rem;width:2.2em;text-align:center}.kids-list .kl-b{font-weight:700}
@media(max-width:420px){.kids-grid{grid-template-columns:repeat(2,1fr)}.kids-emoji{font-size:5.6rem}}
.kids-controls{margin:10px 0}
.kids-show{position:fixed;inset:0;z-index:60;background:rgba(12,12,22,.95);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}
.kids-close{position:absolute;top:14px;right:18px;font-size:1.7rem;background:none;border:none;color:#fff;cursor:pointer;line-height:1}
.kids-bigcard{display:flex;flex-direction:column;align-items:center;gap:10px;color:#fff;text-align:center}
.kids-emoji-big{font-size:46vmin;line-height:1}
.kids-en-big{font-size:3.4rem;font-weight:800}
.kids-native-big{font-size:1.7rem;opacity:.85}
.kids-navbtns{display:flex;gap:18px}
.kids-ctl{font-size:1.8rem;width:66px;height:66px;border-radius:50%;border:2px solid rgba(255,255,255,.4);background:rgba(255,255,255,.14);color:#fff;cursor:pointer}
.kids-ctl:active{background:rgba(255,255,255,.3)}
</style>
<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/kids/')}">${esc(kidsName)}</a> › ${parent ? `<a href="${P(L, parent[1])}">${esc(parent[0])}</a> › ` : ''}${esc(nm)}</p>
<h1>${h1Emoji} ${esc(nm)}</h1>
<p class="lead">${esc(seoDesc)}</p>
<p>${esc(KU.pageLead)}</p>
<div class="kids-controls"><button class="btn btn-primary" type="button" id="kids-play">${esc(KU.play)}</button></div>
<div id="kids-grid" class="kids-grid" role="list" aria-label="${esc(nm)}"></div>
<div id="kids-show" class="kids-show" hidden>
<button id="kids-close" class="kids-close" aria-label="close">✕</button>
<div id="kids-card" class="kids-bigcard"></div>
<div class="kids-navbtns"><button id="kids-prev" class="kids-ctl" aria-label="${esc(KU.prev)}">‹</button><button id="kids-replay" class="kids-ctl" aria-label="${esc(KU.tap)}">🔊</button><button id="kids-next" class="kids-ctl" aria-label="${esc(KU.next)}">›</button></div>
</div>
<p class="calc-note" id="kids-note">${esc(KU.note)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(KIDS_LIST_H[L.code])}: ${esc(nm)}</h2>
<table class="kids-list"><tbody>${listRows}</tbody></table>
<h2>${esc(KU.howH)}</h2>
<ol>${KU.how.map((li) => `<li>${esc(li)}</li>`).join('')}</ol>
${siblings ? `<h2>${esc(parent[0])}</h2>
<p class="kids-sibs">${siblings.map(([n, href]) => (href === path ? `<strong>${esc(n)}</strong>` : `<a href="${P(L, href)}">${esc(n)}</a>`)).join(' · ')}</p>` : ''}
</div>`,
      }));
    };
    KIDS_SETS.forEach((s) => {
      const nm = s.name[L.code] || s.name.en;
      const seo = KIDS_SEO[s.slug] && KIDS_SEO[s.slug][L.code];
      if (!s.children) { kidsPage(s, s.slug, `/kids/${s.slug}/`, nm, s.emoji, null, null, seo); return; }
      // a set made of sub-pages (one per table / letter / matra): an index page, then each sub-page
      const kids = s.children.map((c) => [c.name[L.code] || c.name.en, `/kids/${s.slug}/${c.slug}/`, c]);
      write(L, `/kids/${s.slug}/`, page(L, {
        path: `/kids/${s.slug}/`, title: `${seo ? seo[0] : nm} | NextGrade`, description: seo ? seo[1] : `${nm} — ${KU.pageLead}`,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [kidsName, '/kids/'], [nm, `/kids/${s.slug}/`]])],
        body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/kids/')}">${esc(kidsName)}</a> › ${esc(nm)}</p>
<h1>${s.emoji} ${esc(nm)}</h1>
<p class="lead">${esc(seo ? seo[1] : KU.pageLead)}</p>
<div class="grid">${kids.map(([n, href, c]) => `<a class="card" href="${P(L, href)}"><span class="emoji" aria-hidden="true">${(L.code === 'bn' && c.emojiBn) || c.emoji}</span><h3>${esc(n)}</h3></a>`).join('')}</div>
</div>`,
      }));
      const sibs = kids.map(([n, href]) => [n, href]);
      kids.forEach(([n, href, c]) => kidsPage({ ...s, ...c, children: undefined }, `${s.slug}-${c.slug}`, href, n, s.emoji, [nm, `/kids/${s.slug}/`], sibs, KIDS_SEO_CHILD[s.slug] && KIDS_SEO_CHILD[s.slug](c, L.code)));
    });
  }

  // Shaadi Card Maker (wedding invitation card) — scheduled as 'page:shaadi-card'
  if (SHAADI_LIVE) {
    const SC = SHAADI_UI[L.code];
    writeFileSync(
      join(OUT, 'assets', `shaadi.${L.code}.js`),
      `window.SHAADI = ${JSON.stringify({
        tpl: SHAADI_TEMPLATES.map((t) => ({ id: t.id, name: t.name[L.code] || t.name.en, style: t.style, motif: t.motif, palette: t.palette })),
        colors: SHAADI_COLORS.map((c) => ({ id: c.id, name: c.name[L.code] || c.name.en, palette: c.palette })),
        ui: { h1: SC.h1, weds: SC.weds, and: SC.and, ph: SC.ph, downloaded: SC.downloaded, cantShare: SC.cantShare, shareText: SC.shareText },
        url: `${SITE}${P(L, '/shaadi-card/')}`,
      })};\n`,
    );
    write(
      L,
      '/shaadi-card/',
      page(L, {
        path: '/shaadi-card/',
        title: SC.title,
        description: SC.desc,
        jsonLd: [
          breadcrumbLd(L, [[T.nav.home, '/'], [SC.h1.replace(/^\S+\s/, ''), '/shaadi-card/']]),
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Shaadi Card Maker', url: `${SITE}${P(L, '/shaadi-card/')}`, applicationCategory: 'LifestyleApplication', operatingSystem: 'Any', inLanguage: L.html, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
          { '@context': 'https://schema.org', '@type': 'HowTo', name: SC.howH, step: SC.how.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })) },
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: SC.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
        ],
        scripts: [`/assets/shaadi.${L.code}.js`, '/assets/shaadi-card.js'],
        body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(SC.h1.replace(/^\S+\s/, ''))}</p>
<h1>${esc(SC.h1)}</h1>
<p class="lead">${esc(SC.lead)}</p>
<style>
.tpl-gallery{display:flex;gap:12px;overflow-x:auto;padding:8px 2px 14px;margin:0 0 6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.tpl-thumb{flex:0 0 auto;background:none;border:3px solid transparent;border-radius:12px;padding:0;cursor:pointer;scroll-snap-align:start;display:flex;flex-direction:column;align-items:center;gap:5px;transition:border-color .15s}
.tpl-thumb canvas{width:108px;height:150px;border-radius:9px;box-shadow:0 2px 10px rgba(0,0,0,.18);display:block;background:#fff}
.tpl-thumb span{font-size:.72rem;max-width:112px;line-height:1.12;opacity:.82;text-align:center}
.tpl-thumb.on{border-color:var(--brand,#c9a227)}
.tpl-thumb.on span{font-weight:700;opacity:1}
.pick-h{font-weight:700;margin:10px 0 2px}
</style>
<p class="pick-h">${esc(SC.tplH)} 👇</p>
<div id="gallery" class="tpl-gallery" role="list" aria-label="${esc(SC.tplH)}"></div>
<div class="maker">
<form id="maker" onsubmit="return false">
<div class="field"><label for="heading">${esc(SC.f.heading)}</label><input id="heading" maxlength="30" placeholder="${esc(SC.ph.heading)}"></div>
<div class="row2"><div class="field"><label for="groom">${esc(SC.f.groom)}</label><input id="groom" maxlength="30" placeholder="${esc(SC.ph.groom)}"></div><div class="field"><label for="bride">${esc(SC.f.bride)}</label><input id="bride" maxlength="30" placeholder="${esc(SC.ph.bride)}"></div></div>
<div class="row2"><div class="field"><label for="day">${esc(SC.f.day)}</label><input id="day" maxlength="20" placeholder="${esc(SC.ph.day)}"></div><div class="field"><label for="date">${esc(SC.f.date)}</label><input id="date" maxlength="30" placeholder="${esc(SC.ph.date)}"></div></div>
<div class="row2"><div class="field"><label for="time">${esc(SC.f.time)}</label><input id="time" maxlength="24" placeholder="${esc(SC.ph.time)}"></div><div class="field"><label for="family">${esc(SC.f.family)}</label><input id="family" maxlength="40" placeholder="${esc(SC.ph.family)}"></div></div>
<div class="field"><label for="venue">${esc(SC.f.venue)}</label><input id="venue" maxlength="80" placeholder="${esc(SC.ph.venue)}"></div>
<div class="field"><label for="note">${esc(SC.f.note)}</label><input id="note" maxlength="90" placeholder="${esc(SC.ph.note)}"></div>
<div class="field"><label for="color">${esc(SC.colorH)}</label><select id="color"><option value="template">${esc(SC.tplH)}</option>${SHAADI_COLORS.map((c) => `<option value="${c.id}">${esc(c.name[L.code] || c.name.en)}</option>`).join('')}<option value="custom">${esc(SC.customColor)}</option></select></div>
<div class="field" id="custom-colors" style="display:none;flex-direction:row;gap:16px;align-items:center"><label for="c1">🎨</label><input type="color" id="c1" value="#7a1420"><input type="color" id="c2" value="#b8860b"></div>
<div class="btns"><button class="btn btn-primary" type="button" id="download">${esc(SC.download)}</button><button class="btn btn-ghost" type="button" id="share">${esc(SC.share)}</button><button class="btn btn-ghost" type="button" id="print">${esc(SC.print)}</button></div>
<p class="note" id="status" role="status"></p>
</form>
<div class="preview"><canvas id="card" width="1080" height="1500" aria-label="${esc(SC.preview)}"></canvas></div>
</div>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(SC.howH)}</h2>
<ol>${SC.how.map((li) => `<li>${esc(li)}</li>`).join('')}</ol>
<h2>${esc(SC.introH)}</h2>
${SC.intro.map((p) => `<p>${esc(p)}</p>`).join('')}
<h2>FAQ</h2>
${SC.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
</div>`,
      }),
    );
  }

  // "Naam wali image": a hub plus one page per occasion (scheduled as 'page:naam-wali-image')
  if (NAAM_LIVE) {
    const N = NAAM_UI[L.code];
    const occLink = (o) => `<a class="card" href="${P(L, `/naam-wali-image/${o.slug}/`)}"><span class="emoji" aria-hidden="true">${o.emoji}</span><h3>${esc(o[L.code][1])}</h3><p>${esc(o[L.code][3])}</p></a>`;
    write(L, '/naam-wali-image/', page(L, {
      path: '/naam-wali-image/', title: N.hubTitle, description: N.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [N.hubH1.replace('🖼️ ', ''), '/naam-wali-image/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(N.hubH1.replace('🖼️ ', ''))}</p>
<h1>${esc(N.hubH1)}</h1>
<p class="lead">${esc(N.hubLead)}</p>
<div class="grid">${NAAM_OCCASIONS.map(occLink).join('')}</div>
<h2>${esc(N.howH)}</h2>
<ol>${N.how.map((li) => `<li>${li}</li>`).join('')}</ol>
</div>`,
    }));
    NAAM_OCCASIONS.forEach((o) => {
      const [h1, label, heading, intro] = o[L.code], path = `/naam-wali-image/${o.slug}/`;
      const faq = N.faq(label).map(([q, a]) => ({ q, a }));
      const data = { slug: o.slug, heading, designs: o.designs, msgs: o.msgs[L.code], shareText: `${heading} 🎉 ${SITE}${P(L, path)}`, ui: { downloaded: N.downloaded, cantShare: N.cantShare } };
      write(L, path, page(L, {
        path, title: N.title(h1), description: intro, extraFonts: '&family=Baloo+2:wght@800&family=Baloo+Da+2:wght@800',
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [N.hubH1.replace('🖼️ ', ''), '/naam-wali-image/'], [label, path]]), { '@context': 'https://schema.org', '@type': 'WebApplication', name: h1, url: `${SITE}${P(L, path)}`, applicationCategory: 'LifestyleApplication', operatingSystem: 'Any', inLanguage: L.html, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }, faqLd(faq)],
        scripts: ['/assets/naam-image.js'],
        body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/naam-wali-image/')}">${esc(N.hubH1.replace('🖼️ ', ''))}</a> › ${esc(label)}</p>
<h1>${o.emoji} ${esc(h1)}</h1>
<p class="lead">${esc(intro)}</p>
<div class="maker">
<form onsubmit="return false">
<div class="field"><label for="niTo">${esc(N.to)}</label><input id="niTo" maxlength="30" placeholder="${esc(N.toPh)}"></div>
<div class="field"><label for="niMsg">${esc(N.msg)}</label><select id="niMsg"></select></div>
<div class="field"><label for="niCustom">${esc(N.custom)}</label><textarea id="niCustom" rows="2" maxlength="160"></textarea></div>
<div class="field"><label for="niFrom">${esc(N.from)}</label><input id="niFrom" maxlength="30" placeholder="${esc(N.fromPh)}"></div>
<div class="field"><label>${esc(N.design)}</label><div class="ni-thumbs" id="niDesigns"></div></div>
<div class="field"><label for="niSize">${esc(N.size)}</label><select id="niSize"><option value="square">${esc(N.square)}</option><option value="tall">${esc(N.status)}</option></select></div>
<div class="btns"><button class="btn btn-primary" type="button" id="niShare">${esc(N.share)}</button><button class="btn btn-ghost" type="button" id="niDownload">${esc(N.download)}</button></div>
<p class="note" id="niStatus" role="status"></p>
</form>
<div class="preview"><canvas id="niCanvas" width="1080" height="1080" aria-label="${esc(heading)}"></canvas></div>
</div>
<script>window.NI_DATA = ${JSON.stringify(data).replace(/</g, '\\u003c')}; window.NI_DATA.ui.from2 = (f) => '— ' + f;</script>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(N.howH)}</h2>
<ol>${N.how.map((li) => `<li>${li}</li>`).join('')}</ol>
<h2>${esc(N.faqH)}</h2>
${faqBlock(faq)}
<h2>${esc(N.more)}</h2>
<div class="grid">${NAAM_OCCASIONS.filter((x) => x.slug !== o.slug).map(occLink).join('')}</div>
</div>`,
      }));
    });
  }

  // School speeches and essays (/speech/<slug>/), each scheduled as 'speech:<slug>'
  if (SPEECHES.length) {
    const U = SPEECH_UI[L.code];
    const card = (sp) => `<a class="card" href="${P(L, `/speech/${sp.slug}/`)}"><span class="emoji" aria-hidden="true">${sp.emoji}</span><h3>${esc(sp[L.code].h1.replace(/^\S+\s/, ''))}</h3><p>${esc(sp[L.code].lead)}</p></a>`;
    write(L, '/speech/', page(L, {
      path: '/speech/', title: U.hubTitle, description: U.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/speech/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.hub)}</p>
<h1>🎤 ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<div class="grid">${SPEECHES.map(card).join('')}</div>
</div>`,
    }));
    SPEECHES.forEach((sp) => {
      const x = sp[L.code], path = `/speech/${sp.slug}/`, faq = x.faq.map(([q, a]) => ({ q, a }));
      const block = (id, h, inner) => `<section class="sp-block" id="${id}"><h2>${esc(h)}</h2>${inner}<p class="sp-tools no-print"><button class="btn btn-ghost sp-listen" type="button" data-target="${id}">${esc(U.listen)}</button></p></section>`;
      write(L, path, page(L, {
        path, title: x.title, description: x.desc,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/speech/'], [x.h1.replace(/^\S+\s/, ''), path]]), articleLd(L, x.h1.replace(/^\S+\s/, ''), path), faqLd(faq)],
        scripts: ['/assets/voice.js', '/assets/speech.js'],
        body: `<article class="wrap narrow article" data-speech-lang="${({ hi: 'hi-IN', en: 'en-IN', hinglish: 'en-IN', bn: 'bn-IN' })[L.code]}" data-listen="${esc(U.listen)}" data-stop="${esc(U.stop)}" data-no-voice="${esc(U.noVoice)}">
<p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/speech/')}">${esc(U.hub)}</a> › ${esc(x.h1.replace(/^\S+\s/, ''))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
<p class="no-print"><button class="btn btn-ghost sp-print" type="button">${esc(U.print)}</button>${sp.festival ? ` <a class="btn btn-ghost" href="${P(L, `/festivals/${sp.festival}/`)}">${esc(U.festLink)}</a>` : ''}</p>
${block('sp-open', x.openH, paragraphs(x.open))}
${x.blocks.map((b, k) => block(`sp-${k}`, b.h, paragraphs(b.p))).join('\n')}
<div class="ad no-print" aria-hidden="true"></div>
${block('sp-lines', x.linesH, `<ol>${x.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>`)}
${block('sp-slogans', x.slogansH, `<ul>${x.slogans.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`)}
<h2>${esc(x.tipsH)}</h2>
<ul>${x.tips.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
<h2>${esc(x.faqH)}</h2>
${faqBlock(faq)}
</article>`,
      }));
    });
  }

  // Essays (/nibandh/<slug>/), each scheduled as 'nibandh:<slug>' on its own line
  if (ESSAYS.length) {
    const U = NIBANDH_UI[L.code], SU = SPEECH_UI[L.code];
    const name = (e) => e[L.code].h1.replace(/^\S+\s/, '');
    const card = (e) => `<a class="card" href="${P(L, `/nibandh/${e.slug}/`)}"><span class="emoji" aria-hidden="true">${e.emoji}</span><h3>${esc(name(e))}</h3><p>${esc(e[L.code].lead)}</p></a>`;
    write(L, '/nibandh/', page(L, {
      path: '/nibandh/', title: U.hubTitle, description: U.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/nibandh/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.hub)}</p>
<h1>✍️ ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<div class="grid">${ESSAYS.map(card).join('')}</div>
${SPEECHES.length ? `<p><a class="btn btn-ghost" href="${P(L, '/speech/')}">${esc(U.speeches)}</a></p>` : ''}
</div>`,
    }));
    ESSAYS.forEach((e) => {
      const x = e[L.code], path = `/nibandh/${e.slug}/`, faq = x.faq.map(([q, a]) => ({ q, a }));
      const block = (id, h, inner) => `<section class="sp-block" id="${id}"><h2>${esc(h)}</h2>${inner}<p class="sp-tools no-print"><button class="btn btn-ghost sp-listen" type="button" data-target="${id}">${esc(SU.listen)}</button></p></section>`;
      const others = ESSAYS.filter((o) => o.slug !== e.slug);
      write(L, path, page(L, {
        path, title: x.title, description: x.desc,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/nibandh/'], [name(e), path]]), articleLd(L, name(e), path), faqLd(faq)],
        scripts: ['/assets/voice.js', '/assets/speech.js'],
        body: `<article class="wrap narrow article" data-speech-lang="${({ hi: 'hi-IN', en: 'en-IN', hinglish: 'en-IN', bn: 'bn-IN' })[L.code]}" data-listen="${esc(SU.listen)}" data-stop="${esc(SU.stop)}" data-no-voice="${esc(SU.noVoice)}">
<p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/nibandh/')}">${esc(U.hub)}</a> › ${esc(name(e))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
<p class="no-print"><button class="btn btn-ghost sp-print" type="button">${esc(SU.print)}</button></p>
${block('nb-lines', U.linesH, `<ol>${x.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>`)}
${block('nb-short', x.shortH, paragraphs(x.short))}
<div class="ad no-print" aria-hidden="true"></div>
<section class="sp-block" id="nb-long"><h2>${esc(x.longH)}</h2>
${x.long.map((s) => `<h3>${esc(s.h)}</h3>\n${paragraphs(s.p)}`).join('\n')}
<p class="sp-tools no-print"><button class="btn btn-ghost sp-listen" type="button" data-target="nb-long">${esc(SU.listen)}</button></p></section>
<h2>${esc(U.faqH)}</h2>
${faqBlock(faq)}
${others.length ? `<h2 class="no-print">${esc(U.more)}</h2>\n<div class="grid no-print">${others.map(card).join('')}</div>` : ''}
</article>`,
      }));
    });
  }

  // Rules of desi games (/khel/<slug>/), live together with the game; HowTo JSON-LD for the steps
  if (KHEL.length) {
    const U = KHEL_UI[L.code];
    const name = (r) => r[L.code].h1.replace(/^\S+\s/, '');
    const card = (r) => `<a class="card" href="${P(L, `/khel/${r.slug}/`)}"><span class="emoji" aria-hidden="true">${r.emoji}</span><h3>${esc(name(r))}</h3><p>${esc(r[L.code].lead)}</p></a>`;
    const list = (a) => `<ul>${a.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`;
    write(L, '/khel/', page(L, {
      path: '/khel/', title: U.hubTitle, description: U.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.games, '/games/'], [U.hub, '/khel/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/games/')}">${esc(T.nav.games)}</a> › ${esc(U.hub)}</p>
<h1>📜 ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<div class="grid">${KHEL.map(card).join('')}</div>
</div>`,
    }));
    KHEL.forEach((r) => {
      const x = r[L.code], path = `/khel/${r.slug}/`, faq = x.faq.map(([q, a]) => ({ q, a }));
      const play = `<p><a class="btn btn-primary" href="/games/${r.slug}/?lang=${L.game}">${esc(U.play)}</a></p>`;
      const howTo = { '@context': 'https://schema.org', '@type': 'HowTo', name: name(r), description: x.desc, inLanguage: L.html, supply: x.need.map((n) => ({ '@type': 'HowToSupply', name: n })), step: x.steps.map((t, k) => ({ '@type': 'HowToStep', position: k + 1, text: t })) };
      const others = KHEL.filter((o) => o.slug !== r.slug);
      write(L, path, page(L, {
        path, title: x.title, description: x.desc,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.games, '/games/'], [U.hub, '/khel/'], [name(r), path]]), howTo, faqLd(faq)],
        body: `<article class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/khel/')}">${esc(U.hub)}</a> › ${esc(name(r))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
${play}
<h2>${esc(x.needH)}</h2>
${list(x.need)}
<h2>${esc(x.stepsH)}</h2>
<ol>${x.steps.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(x.winH)}</h2>
${paragraphs(x.win)}
<h2>${esc(x.namesH)}</h2>
${paragraphs(x.names)}
<h2>${esc(x.tipsH)}</h2>
${list(x.tips)}
${play}
<h2>${esc(U.faqH)}</h2>
${faqBlock(faq)}
${others.length ? `<h2>${esc(U.more)}</h2>\n<div class="grid">${others.map(card).join('')}</div>` : ''}
</article>`,
      }));
    });
  }

  // Calculators (/calculator/<slug>/), each scheduled as 'calc:<slug>'. The maths runs in the browser (assets/calc.js).
  if (CALCS.length) {
    const U = CALC_UI[L.code];
    const name = (c) => c[L.code].h1.replace(/^\S+\s/, '');
    const card = (c) => `<a class="card" href="${P(L, `/calculator/${c.slug}/`)}"><span class="emoji" aria-hidden="true">${c.emoji}</span><h3>${esc(name(c))}</h3><p>${esc(c[L.code].lead)}</p></a>`;
    const field = (c, f) => {
      const x = c[L.code], lab = esc((x.label && x.label[f.name]) || f.name);
      if (f.kind === 'date') return `<label class="calc-field"><span>${lab}</span><input type="date" name="${f.name}"></label>`;
      if (f.kind === 'select') return `<label class="calc-field"><span>${lab}</span><select name="${f.name}">${f.options.map((o) => `<option value="${o}">${esc((x.opt && x.opt[o]) || o)}</option>`).join('')}</select></label>`;
      return `<label class="calc-field"><span>${lab}</span><input type="number" inputmode="decimal" step="${f.step || 'any'}" name="${f.name}"></label>`;
    };
    const calcStyle = `<style>.calc-form{display:grid;gap:.9rem;margin:1.1rem 0}.calc-field{display:grid;gap:.3rem}.calc-field span{font-weight:600}.calc-field input::placeholder{color:var(--muted)}.calc-field input,.calc-field select{padding:.6rem .7rem;font-size:1.05rem;border:1px solid var(--line);border-radius:.5rem;background:var(--surface);color:var(--text);width:100%}.calc-result{margin-top:1rem;padding:1rem 1.1rem;border:1px solid var(--line);border-radius:.6rem;background:var(--surface);color:var(--text)}.calc-row{display:flex;justify-content:space-between;gap:1rem;padding:.4rem 0;border-bottom:1px dashed var(--line)}.calc-row:last-child{border-bottom:0}.calc-strong{font-size:1.15rem}.calc-strong b{color:var(--brand)}.calc-note{margin:.6rem 0 0;font-size:.9rem;opacity:.8}.calc-err{color:#c0392b;margin:0}</style>`;
    write(L, '/calculator/', page(L, {
      path: '/calculator/', title: U.hubTitle, description: U.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/calculator/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.hub)}</p>
<h1>🧮 ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<div class="grid">${CALCS.map(card).join('')}</div>
</div>`,
    }));
    CALCS.forEach((c) => {
      const x = c[L.code], path = `/calculator/${c.slug}/`, faq = x.faq.map(([q, a]) => ({ q, a }));
      const others = CALCS.filter((o) => o.slug !== c.slug);
      write(L, path, page(L, {
        path, title: x.title, description: x.desc,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/calculator/'], [name(c), path]]), { '@context': 'https://schema.org', '@type': 'WebApplication', name: name(c), url: `${SITE}${P(L, path)}`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', inLanguage: L.html, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, publisher: { '@type': 'Organization', name: NAME, url: `${SITE}/` } }, faqLd(faq)],
        scripts: ['/assets/calc.js'],
        body: `<article class="wrap narrow article">
${calcStyle}
<p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/calculator/')}">${esc(U.hub)}</a> › ${esc(name(c))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
<form class="calc-form" data-calc="${c.type}" data-strings="${esc(JSON.stringify(x.strings))}">
${c.fields.map((f) => field(c, f)).join('\n')}
<button class="btn btn-primary" type="submit">${esc(x.btn)}</button>
<div class="calc-result" hidden></div>
</form>
<h2>${esc(x.introH)}</h2>
${paragraphs(x.intro)}
<div class="ad no-print" aria-hidden="true"></div>
<h2>${esc(x.formulaH)}</h2>
${paragraphs(x.formula)}
<h2>${esc(x.exampleH)}</h2>
${paragraphs(x.example)}
<h2>${esc(U.faqH)}</h2>
${faqBlock(faq)}
${others.length ? `<h2 class="no-print">${esc(U.more)}</h2>\n<div class="grid no-print">${others.map(card).join('')}</div>` : ''}
</article>`,
      }));
    });
  }

  // Baby names (/naam/, /naam/boy|girl/, /naam/boy|girl/<letter>/), scheduled 'page:naam'
  if (BABY_LIVE) {
    const U = BABY_UI[L.code];
    const mean = (x) => (L.code === 'hi' ? x.mHi : x.mEn);
    const boys = babyNames.filter((x) => x.g === 'b');
    const girls = babyNames.filter((x) => x.g === 'g');
    const lettersOf = (list) => [...new Set(list.map((x) => x.r[0].toUpperCase()))].sort();
    const byName = (a, b) => a.r.localeCompare(b.r);
    const row = (x) => `<li class="naam-row"><span class="naam-n"><b>${esc(x.n)}</b> <span class="naam-r">${esc(x.r)}</span></span><span class="naam-m">${esc(mean(x))}</span></li>`;
    const slugOf = (g) => (g === 'b' ? 'boy' : 'girl');
    const titleOf = (g) => (g === 'b' ? U.boy : U.girl);
    const leadOf = (g) => (g === 'b' ? U.boyLead : U.girlLead);
    const letterNav = (g, active) => `<nav class="naam-letters" aria-label="${esc(U.byLetter)}">${lettersOf(g === 'b' ? boys : girls).map((l) => `<a class="naam-letter${l === active ? ' is-active' : ''}" href="${P(L, `/naam/${slugOf(g)}/${l.toLowerCase()}/`)}">${l}</a>`).join('')}</nav>`;
    const naamStyle = `<style>.naam-letters{display:flex;flex-wrap:wrap;gap:.4rem;margin:1rem 0}.naam-letter{display:inline-flex;align-items:center;justify-content:center;min-width:2.3rem;height:2.3rem;padding:0 .4rem;border:1px solid var(--line);border-radius:.5rem;background:var(--surface);color:var(--text);font-weight:700;text-decoration:none}.naam-letter.is-active,.naam-letter:hover{background:var(--brand);color:#fff;border-color:var(--brand)}.naam-list{list-style:none;padding:0;margin:1rem 0;display:grid;gap:0}.naam-row{display:flex;justify-content:space-between;gap:1rem;align-items:baseline;padding:.6rem .2rem;border-bottom:1px dashed var(--line)}.naam-n b{font-size:1.15rem}.naam-r{color:var(--muted);font-weight:600;margin-left:.35rem}.naam-m{color:var(--muted);text-align:right;flex-shrink:0;max-width:55%}</style>`;
    // hub
    const hubFaq = U.faq.map(([q, a]) => ({ q, a }));
    write(L, '/naam/', page(L, {
      path: '/naam/', title: U.hubTitle, description: U.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/naam/']]), faqLd(hubFaq)],
      body: `<article class="wrap narrow article">${naamStyle}
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.hub)}</p>
<h1>👶 ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<div class="grid">
<a class="card" href="${P(L, '/naam/boy/')}"><span class="emoji" aria-hidden="true">👦</span><h3>${esc(U.boy)}</h3><p>${esc(U.boyLead)}</p></a>
<a class="card" href="${P(L, '/naam/girl/')}"><span class="emoji" aria-hidden="true">👧</span><h3>${esc(U.girl)}</h3><p>${esc(U.girlLead)}</p></a>
</div>
<h2>${esc(U.popular)}</h2>
<ul class="naam-list">${[...boys.slice(0, 6), ...girls.slice(0, 6)].map(row).join('')}</ul>
<div class="ad no-print" aria-hidden="true"></div>
<h2>${esc(U.faqH)}</h2>
${faqBlock(hubFaq)}
</article>`,
    }));
    // gender hubs + per-letter pages
    ['b', 'g'].forEach((g) => {
      const list = g === 'b' ? boys : girls;
      const hubPath = `/naam/${slugOf(g)}/`;
      write(L, hubPath, page(L, {
        path: hubPath, title: `${titleOf(g)} — ${U.hub} | ${NAME}`, description: leadOf(g),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/naam/'], [titleOf(g), hubPath]])],
        body: `<article class="wrap narrow article">${naamStyle}
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/naam/')}">${esc(U.hub)}</a> › ${esc(titleOf(g))}</p>
<h1>${g === 'b' ? '👦' : '👧'} ${esc(titleOf(g))}</h1>
<p class="lead">${esc(leadOf(g))}</p>
<h2>${esc(U.byLetter)}</h2>
${letterNav(g)}
<ul class="naam-list">${list.slice().sort(byName).map(row).join('')}</ul>
</article>`,
      }));
      lettersOf(list).forEach((l) => {
        const sub = list.filter((x) => x.r[0].toUpperCase() === l).sort(byName);
        const path = `/naam/${slugOf(g)}/${l.toLowerCase()}/`;
        const title = g === 'b' ? U.boyTitleT(l) : U.girlTitleT(l);
        const h1 = g === 'b' ? U.boyH1T(l) : U.girlH1T(l);
        const lead = U.letterLeadT(l, g === 'b' ? U.boyKind : U.girlKind);
        write(L, path, page(L, {
          path, title, description: lead,
          jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/naam/'], [titleOf(g), hubPath], [l, path]]), articleLd(L, h1, path)],
          body: `<article class="wrap narrow article">${naamStyle}
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/naam/')}">${esc(U.hub)}</a> › <a href="${P(L, hubPath)}">${esc(titleOf(g))}</a> › ${esc(l)}</p>
<h1>${esc(h1)}</h1>
<p class="lead">${esc(lead)} · ${esc(U.countT(sub.length))}</p>
<ul class="naam-list">${sub.map(row).join('')}</ul>
<div class="ad no-print" aria-hidden="true"></div>
<h2 class="no-print">${esc(U.otherLetters)}</h2>
${letterNav(g, l)}
<p class="no-print"><a href="${P(L, hubPath)}">← ${esc(titleOf(g))}</a> · <a href="${P(L, '/naam/')}">${esc(U.backHub)}</a></p>
</article>`,
        }));
      });
    });
  }

  // Full forms (/full-form/, /full-form/letter/<l>/, /full-form/<slug>/), scheduled 'page:full-form'
  if (FF_LIVE) {
    const U = FF_UI[L.code];
    const note = (x) => (L.code === 'hi' ? x.dHi : x.dEn);
    const lettersFF = [...new Set(FULLFORMS.map((x) => x.a[0].toUpperCase()))].sort();
    const byAbbr = (a, b) => a.a.localeCompare(b.a);
    const ffRow = (x) => `<li class="ff-row"><a class="ff-a" href="${P(L, `/full-form/${ffSlug(x)}/`)}"><b>${esc(x.a)}</b></a><span class="ff-f">${esc(x.f)}</span></li>`;
    const ffLetterNav = (active) => `<nav class="naam-letters" aria-label="${esc(U.byLetter)}">${lettersFF.map((l) => `<a class="naam-letter${l === active ? ' is-active' : ''}" href="${P(L, `/full-form/letter/${l.toLowerCase()}/`)}">${l}</a>`).join('')}</nav>`;
    const ffStyle = `<style>.naam-letters{display:flex;flex-wrap:wrap;gap:.4rem;margin:1rem 0}.naam-letter{display:inline-flex;align-items:center;justify-content:center;min-width:2.3rem;height:2.3rem;padding:0 .4rem;border:1px solid var(--line);border-radius:.5rem;background:var(--surface);color:var(--text);font-weight:700;text-decoration:none}.naam-letter.is-active,.naam-letter:hover{background:var(--brand);color:#fff;border-color:var(--brand)}.ff-list{list-style:none;padding:0;margin:1rem 0;display:grid;gap:0}.ff-row{display:flex;justify-content:space-between;gap:1rem;align-items:baseline;padding:.6rem .2rem;border-bottom:1px dashed var(--line)}.ff-a b{font-size:1.1rem}.ff-f{color:var(--muted);text-align:right}.ff-def{margin:1rem 0;padding:1rem 1.1rem;border:1px solid var(--line);border-radius:.6rem;background:var(--surface)}.ff-def b{color:var(--brand)}</style>`;
    // hub
    write(L, '/full-form/', page(L, {
      path: '/full-form/', title: U.hubTitle, description: U.hubLead,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/full-form/']])],
      body: `<article class="wrap narrow article">${ffStyle}
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.hub)}</p>
<h1>🔤 ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<h2>${esc(U.byLetter)}</h2>
${ffLetterNav()}
<h2>${esc(U.popular)}</h2>
<ul class="ff-list">${FULLFORMS.slice(0, 16).map(ffRow).join('')}</ul>
<div class="ad no-print" aria-hidden="true"></div>
</article>`,
    }));
    // per-letter pages
    lettersFF.forEach((l) => {
      const sub = FULLFORMS.filter((x) => x.a[0].toUpperCase() === l).sort(byAbbr);
      const path = `/full-form/letter/${l.toLowerCase()}/`;
      write(L, path, page(L, {
        path, title: U.letterTitleT(l), description: U.letterLeadT(l),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/full-form/'], [l, path]]), articleLd(L, U.letterH1T(l), path)],
        body: `<article class="wrap narrow article">${ffStyle}
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/full-form/')}">${esc(U.hub)}</a> › ${esc(l)}</p>
<h1>${esc(U.letterH1T(l))}</h1>
<p class="lead">${esc(U.letterLeadT(l))} · ${esc(U.countT(sub.length))}</p>
<ul class="ff-list">${sub.map(ffRow).join('')}</ul>
<div class="ad no-print" aria-hidden="true"></div>
<h2 class="no-print">${esc(U.otherLetters)}</h2>
${ffLetterNav(l)}
</article>`,
      }));
    });
    // per-term pages
    FULLFORMS.forEach((x) => {
      const path = `/full-form/${ffSlug(x)}/`;
      const l = x.a[0].toUpperCase();
      const related = FULLFORMS.filter((o) => o.a[0].toUpperCase() === l && o.a !== x.a).slice(0, 8);
      const faq = U.faqT(x.a, x.f).map(([q, a]) => ({ q, a }));
      write(L, path, page(L, {
        path, title: U.termTitleT(x.a), description: U.termLeadT(x.a, x.f) + ' ' + note(x),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/full-form/'], [`${x.a}`, path]]), articleLd(L, U.termH1T(x.a), path), faqLd(faq)],
        body: `<article class="wrap narrow article">${ffStyle}
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/full-form/')}">${esc(U.hub)}</a> › <a href="${P(L, `/full-form/letter/${l.toLowerCase()}/`)}">${esc(l)}</a> › ${esc(x.a)}</p>
<h1>${esc(U.termH1T(x.a))}</h1>
<p class="lead">${esc(U.termLeadT(x.a, x.f))}</p>
<div class="ff-def"><b>${esc(x.a)}</b> ${esc(U.stands)} <b>${esc(x.f)}</b>.<br>${esc(note(x))}</div>
<div class="ad no-print" aria-hidden="true"></div>
<h2>${esc(U.faqH)}</h2>
${faqBlock(faq)}
${related.length ? `<h2 class="no-print">${esc(U.relH)}</h2>\n<ul class="ff-list no-print">${related.map(ffRow).join('')}</ul>` : ''}
<p class="no-print"><a href="${P(L, `/full-form/letter/${l.toLowerCase()}/`)}">← ${esc(l)}</a> · <a href="${P(L, '/full-form/')}">${esc(U.backHub)}</a></p>
</article>`,
      }));
    });
  }

  // Paheliyan (riddles with answers), scheduled as 'page:paheliyan'; "riddle of the day" changes with the daily build
  if (PAHELI_LIVE) {
    const Q = PAHELI_UI[L.code], list = PAHELI[L.code];
    const dayNo = Math.floor(Date.parse(`${todayIST()}T00:00:00Z`) / 864e5), td = list[dayNo % list.length];
    const item = ([q, a]) => `<details class="paheli"><summary>${esc(q)}</summary><p><b>${esc(Q.ans)}:</b> ${esc(a)}</p></details>`;
    write(L, '/paheliyan/', page(L, {
      path: '/paheliyan/', title: Q.title, description: Q.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [Q.h1.replace('🧩 ', ''), '/paheliyan/']])],
      body: `<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(Q.h1.replace('🧩 ', ''))}</p>
<h1>${esc(Q.h1)}</h1>
<p class="lead">${esc(Q.lead)}</p>
<div class="when-box"><p class="when-q">${esc(Q.today)}</p><p>${esc(td[0])}</p><details><summary>${esc(Q.tap)}</summary><p><b>${esc(Q.ans)}:</b> ${esc(td[1])}</p></details></div>
${['easy', 'fun', 'brain'].map((c) => `<h2>${esc(Q.cats[c])}</h2>\n${list.filter((x) => x[2] === c).map(item).join('\n')}`).join('\n')}
<div class="ad" aria-hidden="true"></div>
<p><a class="btn btn-ghost" href="${P(L, '/kahani/')}">📖 ${esc(Q.more)}</a></p>
</div>`,
    }));
  }

  // Games index (each game itself is a static page in src/static/games/<slug>/)
  write(
    L,
    '/games/',
    page(L, {
      path: '/games/',
      title: T.games.title,
      description: T.games.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.games, '/games/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.games)}</p>
<h1>${esc(T.games.h1)}</h1>
<p class="lead">${esc(T.games.lead)}</p>
<div class="grid">${games.map(gameCard(L)).join('')}</div>
${KHEL.length ? `<p><a class="btn btn-ghost" href="${P(L, '/khel/')}">${esc(KHEL_UI[L.code].rulesBtn)}</a></p>` : ''}
<h2>${esc(T.games.soonH)}</h2>
<p>${esc(T.games.soonP)}</p>
${T.games.more || ''}
</div>`,
    }),
  );

  // Free tools index (each tool is a static app in src/static/tools/<slug>/)
  if (tools.length) {
    write(
      L,
      '/tools/',
      page(L, {
        path: '/tools/',
        title: T.tools.title,
        description: T.tools.desc,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.tools, '/tools/']]), { '@context': 'https://schema.org', '@type': 'ItemList', name: T.tools.h1.replace(/^\S+\s/, ''), itemListElement: [...tools.map((t) => [(t[L.code] || t.en)[0], `${SITE}/tools/${t.slug}/`]), ...CALCS.map((c) => [c[L.code].h1.replace(/^\S+\s/, ''), `${SITE}${P(L, `/calculator/${c.slug}/`)}`])].map(([name, url], k) => ({ '@type': 'ListItem', position: k + 1, name, url })) }],
        body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.tools)}</p>
<h1>${esc(T.tools.h1)}</h1>
<p class="lead">${esc(T.tools.lead)}</p>
${TOOL_CATS.filter((c) => toolsIn(c).length).map((c) => `<h2 id="${c.id}">${c.emoji} ${esc(c.name[L.code])}</h2><div class="grid">${toolsIn(c).map(toolCard(L)).join('')}</div>`).join('\n')}
${CALCS.length ? `<h2 id="calculators">${esc(UT[L.code].calcH)}</h2><div class="btns">${CALCS.map((c) => `<a class="btn btn-ghost" href="${P(L, `/calculator/${c.slug}/`)}">${c.emoji} ${esc(c[L.code].h1.replace(/^\S+\s/, ''))}</a>`).join('')}</div>` : ''}
<h2 id="makers">${esc(UT[L.code].makerH)}</h2><div class="btns">${MAKERS.filter(([h]) => (h !== '/shaadi-card/' || SHAADI_LIVE) && (h !== '/naam-wali-image/' || NAAM_LIVE)).map(([h, e, n]) => `<a class="btn btn-ghost" href="${P(L, h)}">${e} ${esc(n[L.code])}</a>`).join('')}</div>
<h2 id="study">${esc(UT[L.code].studyH)}</h2><div class="btns">${STUDY.map(([h, e, n]) => `<a class="btn btn-ghost" href="${P(L, h)}">${e} ${esc(n[L.code])}</a>`).join('')}</div>
${T.tools.more}
</div>`,
      }),
    );
  }

  // Apps
  write(
    L,
    '/apps/',
    page(L, {
      path: '/apps/',
      title: T.apps.title,
      description: T.apps.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.apps, '/apps/']])],
      body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.apps)}</p>
<h1>${esc(T.apps.h1)}</h1>
<p class="lead">${esc(T.apps.lead)}</p>
<div class="grid">${apps.map(appCard(L)).join('')}</div>
<p class="btns"><a class="btn btn-primary" href="${P(L, '/apps/hisab-kitab/')}">▶️ ${esc(hisabVideo[L.code].h1)}</a></p>
<h2>${esc(T.apps.installH)}</h2>
<p>${T.apps.installP}</p>
${T.apps.more || ''}
</div>`,
    }),
  );

  // Hisab Kitab video page: watch, open the app, share the video file or the links
  {
    const H = hisabVideo[L.code];
    const path = '/apps/hisab-kitab/';
    const pageUrl = `${SITE}${P(L, path)}`;
    const videoLd = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: H.h1,
      description: H.desc,
      thumbnailUrl: `${SITE}${VIDEO.poster}`,
      contentUrl: `${SITE}${VIDEO.src}`,
      uploadDate: VIDEO.uploaded,
      duration: VIDEO.duration,
      inLanguage: 'hi',
    };
    write(
      L,
      path,
      page(L, {
        path,
        title: H.title,
        description: H.desc,
        scripts: ['/assets/video-share.js'],
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.apps, '/apps/'], ['Hisab Kitab', path]]), videoLd, faqLd(H.faq)],
        body: `<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/apps/')}">${esc(T.nav.apps)}</a> › Hisab Kitab</p>
<h1>${esc(H.h1)}</h1>
<p class="lead">${esc(H.lead)}</p>
<figure class="app-video"><video controls playsinline preload="metadata" poster="${VIDEO.poster}" src="${VIDEO.src}" width="540" height="960"></video><figcaption>${esc(H.videoNote)}</figcaption></figure>
<p class="btns"><a class="btn btn-primary" href="${APP_URL}">${esc(H.open)}</a></p>
<div class="share-box video-share" data-src="${VIDEO.src}" data-filename="hisab-kitab.mp4" data-title="Hisab Kitab" data-text="${esc(H.shareText(pageUrl))}" data-preparing="${esc(H.preparing)}" data-ready="${esc(H.ready)}" data-copied="${esc(H.copied)}">
<h2>${esc(H.shareH)}</h2>
<p>${esc(H.shareP)}</p>
<div class="share-row"><button class="btn btn-primary vs-file" type="button">${esc(H.shareVideo)}</button><button class="btn btn-wa vs-wa" type="button">${esc(H.wa)}</button><button class="btn btn-ghost vs-copy" type="button">${esc(H.copy)}</button></div>
</div>
<h2>${esc(H.howH)}</h2>
<ol>${H.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
<h2>${esc(H.whyH)}</h2>
${paragraphs(H.why)}
<h2>${esc(H.faqH)}</h2>
${faqBlock(H.faq)}
</div>`,
      }),
    );
  }

  // About + Contact
  [
    ['/about/', T.about, T.about.html(P(L, '/contact/'))],
    ['/contact/', T.contact, T.contact.html(CONTACT)],
  ].forEach(([path, X, html]) =>
    write(
      L,
      path,
      page(L, {
        path,
        title: `${X.title} | ${NAME}`,
        description: X.desc,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.title, path]])],
        body: `<article class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.title)}</p><h1>${esc(X.title)}</h1>${html}</article>`,
      }),
    ),
  );
});

// ---- Policy pages: one version (English with a Hindi summary), linked from every language
const HI = ALL_LANGS[0];
const policyPage = (path, title, description, html) =>
  write(HI, path, page(HI, { path, title: `${title} | ${NAME}`, description, langs: [HI], jsonLd: [breadcrumbLd(HI, [['Home', '/'], [title, path]])], body: `<article class="wrap narrow article"><p class="crumbs"><a href="/">Home</a> › ${esc(title)}</p><h1>${esc(title)}</h1>${html}</article>` }));

policyPage(
  '/privacy-policy/',
  'Privacy Policy',
  'NextGrade की प्राइवेसी पॉलिसी — कौन सी जानकारी ली जाती है, कुकीज़ और Google AdSense विज्ञापन। NextGrade privacy policy: data, cookies and Google AdSense.',
  `<p class="note">Last updated: ${TODAY}</p>
<p>This Privacy Policy explains how NextGrade ("we", "us") at nextgrade.in handles information when you use this website in any language (Hindi, English, Hinglish or Bengali), including the games under nextgrade.in/games/. Our apps on nextgrade.in subdomains (for example hisab.nextgrade.in) have their own privacy pages that apply in addition to this one.</p>
<h2>Information we collect</h2>
<p>We do not ask you to create an account on this website and we do not collect your name, email or phone number unless you choose to email us. We have no server or database that stores your information. The Wish Card Maker works entirely in your browser: the names and message you type are not sent to us or stored by us. A name you add to a share link (for example ?from=Rahul) stays only in that link. Games save your best score and chosen language only on your own device.</p>
<p>Like most websites, our hosting provider (GitHub Pages) and content delivery network (Cloudflare) may record standard technical information such as IP address, browser type and the pages requested, for security and to keep the service running.</p>
<h2>Cookies and advertising</h2>
<p>We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</p>
<p>You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" rel="nofollow">Google Ads Settings</a>. You can also opt out of some third-party vendors' use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" rel="nofollow">www.aboutads.info</a>. Learn more about <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow">how Google uses information from sites that use its services</a>.</p>
<p>Where required by law (for example for visitors in the EEA, UK or Switzerland), Google will show a consent message before using cookies for ads.</p>
<h2>Visitor statistics</h2>
<p>To understand which pages are useful, we use Cloudflare Web Analytics. It does not use cookies or local storage, does not track you across websites and does not collect personal information — it only counts page views, the country, the type of device and browser, and page load speed, in aggregate. See <a href="https://www.cloudflare.com/web-analytics/" rel="nofollow">Cloudflare Web Analytics</a>.</p>
<p>We also use <strong>Google Analytics</strong> to count how many different people visit (for example: number of users, city or country, phone or computer, and which pages they read). Google Analytics uses cookies for this. It does not receive the names or messages you type into wish links, cards or games. You can block it with your browser's privacy settings, an ad blocker or the <a href="https://tools.google.com/dlpage/gaoptout" rel="nofollow">Google Analytics opt-out add-on</a>; the site works the same. Learn more about <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow">how Google uses this data</a>.</p>
${tools.length ? '<h2>Photo and document tools</h2>\n<p>The tools under nextgrade.in/tools/ (for example the image and PDF compressors, JPG to PDF, PDF merge, image resizer, signature maker, sticker maker, QR code maker, typing test and passport photo maker) run entirely inside your browser. The photos, documents and text you choose or type are processed on your device and are never uploaded to us or to any server; the result is saved only to your device. Some tools download their library or model files from nextgrade.in once and may keep them for offline use.</p>\n' : ''}<h2>Children</h2>
<p>This website is meant for a general audience and is not directed at children under 13. We do not knowingly collect personal information from children.</p>
<h2>Links to other sites</h2>
<p>Our pages may link to other websites. We are not responsible for their content or privacy practices.</p>
<h2>Changes</h2>
<p>We may update this policy from time to time; the date at the top shows the latest version.</p>
<h2>Contact</h2>
<p>Questions about this policy: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
<h2>हिंदी में सार</h2>
<p>हम इस वेबसाइट पर आपसे कोई अकाउंट या निजी जानकारी नहीं माँगते और कोई सर्वर/डेटाबेस आपकी जानकारी नहीं रखता। Wish Card Maker में लिखे नाम और संदेश आपके ब्राउज़र में ही रहते हैं। साइट पर Google AdSense के विज्ञापन दिखते हैं, जो कुकीज़ का इस्तेमाल करते हैं; आप <a href="https://www.google.com/settings/ads" rel="nofollow">Google Ads Settings</a> में जाकर पर्सनलाइज़्ड विज्ञापन बंद कर सकते हैं।</p>`,
);

policyPage(
  '/terms/',
  'Terms of Use',
  'NextGrade वेबसाइट, गेम्स और ऐप्स के इस्तेमाल की शर्तें। Terms of use for the NextGrade website, games and apps.',
  `<p class="note">Last updated: ${TODAY}</p>
<p>By using nextgrade.in in any language, including its games, you agree to these terms.</p>
<h2>Use of content</h2>
<p>You may read and share our pages and the wishes on them for personal, non-commercial use. Please link back to the page instead of copying whole articles. Greeting cards you make with the Wish Card Maker are yours to share.</p>
<h2>Accuracy</h2>
<p>We try to keep festival information accurate, but traditions vary by region and family, and dates of festivals that follow the lunar calendar change every year. Please check the exact date and muhurat in your local panchang. See our <a href="/disclaimer/">Disclaimer</a>.</p>
<h2>Our apps and games</h2>
<p>Our apps and games are provided free and "as is", without warranty. Keep your own backups of anything important you store in them.</p>
<h2>Acceptable use</h2>
<p>Do not use our tools to create cards or messages that are abusive, hateful, misleading or illegal.</p>
<h2>Changes and contact</h2>
<p>We may change these terms at any time. Questions: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>`,
);

policyPage(
  '/disclaimer/',
  'Disclaimer',
  'NextGrade पर दी गई त्योहारों और धार्मिक परंपराओं की जानकारी के बारे में डिस्क्लेमर। Disclaimer about festival and religious information on NextGrade.',
  `<p>NextGrade पर दी गई त्योहारों, परंपराओं और पूजा से जुड़ी जानकारी सामान्य जानकारी के लिए है। अलग-अलग क्षेत्रों, समुदायों और परिवारों में परंपराएँ अलग हो सकती हैं।</p>
<p>चंद्र कैलेंडर से तय होने वाले त्योहारों की तारीख और शुभ मुहूर्त हर साल बदलते हैं — सटीक समय के लिए अपने स्थानीय पंचांग, पुजारी या धार्मिक संस्था से पुष्टि करें। व्रत रखने से पहले, खासकर बीमारी या गर्भावस्था में, डॉक्टर की सलाह लें।</p>
<p>The information on NextGrade, in every language, is for general purposes only. Traditions differ by region and community, and lunar-calendar festival dates change every year — confirm exact dates and timings locally. Health-related notes (such as fasting) are not medical advice.</p>
<p>This site shows ads from Google AdSense. We are not responsible for the content of third-party ads or linked websites.</p>`,
);

// ---- 404 (Hindi + English)
write(
  null,
  '/404.html',
  page(HI, {
    path: '/404.html',
    title: `पेज नहीं मिला · Page not found | ${NAME}`,
    description: 'यह पेज मौजूद नहीं है। This page does not exist.',
    langs: [HI],
    body: `<div class="wrap article"><h1>पेज नहीं मिला · Page not found</h1><p class="lead">यह पेज मौजूद नहीं है या हटा दिया गया है। This page does not exist or has been removed.</p><div class="btns"><a class="btn btn-primary" href="/">Home</a><a class="btn btn-ghost" href="/en/">English</a><a class="btn btn-ghost" href="/festivals/">Festivals</a></div></div>`,
  }),
);

// ---- Machine files
// Sitemap lastmod: honest dates, not "today" for every page (the daily Action rebuilds everything).
// Bump CONTENT_DATE when existing pages get real content changes.
const CONTENT_DATE = '2026-11-15';
const lastRelease = Object.values(releases).filter((d) => d <= todayIST()).sort().pop() || CONTENT_DATE;
const lastmodFor = (url) => {
  const path = url.replace(/^\/(en|hinglish|bn)(?=\/)/, '');
  const m = path.match(/^\/(games|kahani|celebrate|tools|festivals)\/([^/]+)\/$/);
  const rel = m && releases[`${{ games: 'game', kahani: 'story', celebrate: 'celebrate', tools: 'tool', festivals: 'festival' }[m[1]]}:${m[2]}`];
  if (rel) return rel;
  const mk = path.match(/^\/khel\/([^/]+)\/$/);
  if (mk && releases[`game:${mk[1]}`]) return releases[`game:${mk[1]}`];
  const m2 = path.match(/^\/(speech|nibandh)\/([^/]+)\/$/);
  if (m2 && releases[`${m2[1]}:${m2[2]}`]) return releases[`${m2[1]}:${m2[2]}`];
  const pg = { '/paheliyan/': 'page:paheliyan', '/naam-wali-image/': 'page:naam-wali-image' }[path] || (path.startsWith('/naam-wali-image/') && 'page:naam-wali-image');
  if (pg && releases[pg]) return [CONTENT_DATE, releases[pg]].sort().pop();
  if (path === '/khel/') { const ds = allRules.map((r) => releases[`game:${r.slug}`]).filter((d) => d && d <= todayIST()).sort(); if (ds.length) return ds.pop(); }
  if (['/speech/', '/nibandh/'].includes(path)) { const ds = Object.entries(releases).filter(([k, d]) => k.startsWith(path === '/speech/' ? 'speech:' : 'nibandh:') && d <= todayIST()).map(([, d]) => d).sort(); if (ds.length) return ds.pop(); }
  if (['/', '/games/', '/kahani/'].includes(path)) return [CONTENT_DATE, lastRelease].sort().pop();
  // sections added later: the date they first went live (25–26 Nov 2026); daily pages change every day
  if (['/aaj/', '/purnima/', '/amavasya/', '/ekadashi/'].includes(path)) return todayIST();
  const sec = { '/mausam/': '2026-11-25', '/ghoomne-ki-jagah/': '2026-11-25', '/nuskhe/': '2026-11-25', '/surya-namaskar/': '2026-11-25', '/creator-guide/': '2026-11-25', '/calculator/youtube-earning/': '2026-11-25', '/sarkari-guide/': '2026-11-26', '/pranayam/': '2026-11-26', '/tools/photo-frame/': '2026-11-25' };
  for (const [pre, d] of Object.entries(sec)) if (path.startsWith(pre)) return d;
  if (/^\/wishes\/(marathi|gujarati|tamil|telugu|kannada|malayalam|punjabi|odia)\//.test(path)) return '2026-11-25';
  return CONTENT_DATE;
};
const gameUrls = games.map((g) => `/games/${g.slug}/`);
// Site search index per language (home search box): every page title + extras that are not built by write()
LANGS.forEach((L) => {
  const extra = [...tools.map((t) => [(t[L.code] || t.en)[0], `/tools/${t.slug}/`]), ...games.map((g) => [g.name || g.nameEn, `/games/${g.slug}/`])];
  const seen = new Set(), rows = [...extra, ...(SEARCH[L.code] || [])].filter(([, u]) => !seen.has(u) && seen.add(u));
  writeFileSync(join(OUT, 'assets', `search-${L.code}.json`), JSON.stringify(rows));
});
const allUrls = [...urls, ...gameUrls, ...CELEBRATE.map((c) => `/celebrate/${c.slug}/`), ...tools.flatMap((tl) => [`/tools/${tl.slug}/`, ...(tl.pages || []).map((pg) => `/tools/${tl.slug}/${pg}/`)])];
// Sitemap index (sitemap.xml) + one sitemap per section, so Search Console shows indexing per section (plan Q, 26 Nov)
{
  const GROUPS = [['mausam', ['mausam']], ['travel', ['ghoomne-ki-jagah']], ['kids', ['kids']], ['stories', ['kahani']], ['study', ['nibandh', 'speech', 'paheliyan', 'full-form', 'naam']], ['festivals', ['festivals', 'wishes', 'wish-card', 'calendar', 'celebrate', 'naam-wali-image', 'islamic-calendar', 'shaadi-card', 'aaj', 'purnima', 'amavasya', 'ekadashi']], ['tools', ['tools', 'calculator']], ['games', ['games', 'khel', 'apps']], ['guides', ['sarkari-guide', 'creator-guide', 'pranayam', 'surya-namaskar', 'nuskhe']]];
  const groupOf = (u) => { const seg = u.replace(/^\/(en|hinglish|bn)(?=\/)/, '').split('/')[1] || ''; const g = GROUPS.find(([, segs]) => segs.includes(seg)); return g ? g[0] : 'pages'; };
  const by = {};
  allUrls.forEach((u) => (by[groupOf(u)] ||= []).push(u));
  const names = Object.keys(by).sort();
  names.forEach((n) => writeFileSync(join(OUT, `sitemap-${n}.xml`), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${by[n].map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${lastmodFor(u)}</lastmod></url>`).join('\n')}\n</urlset>\n`));
  writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${names.map((n) => `  <sitemap><loc>${SITE}/sitemap-${n}.xml</loc><lastmod>${by[n].map(lastmodFor).sort().pop()}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`);
}
// robots.txt: everyone allowed; the AI search / assistant crawlers are named so it is clear they are welcome (user, 24 Nov 2026: "ai se v search karne par aana chahiye")
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\n${['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'meta-externalagent'].map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}\nSitemap: ${SITE}/sitemap.xml\n`);
// llms.txt: a plain map of the site for AI assistants (only live pages; rebuilt daily with the releases)
{
  const en = (p) => `${SITE}/en${p}`;
  const line = (title, url, note) => `- [${title}](${url})${note ? `: ${note}` : ''}`;
  const sec = (h, rows) => (rows.length ? `\n## ${h}\n\n${rows.join('\n')}\n` : '');
  const txt = `# NextGrade

> Free Indian festival wishes, festival dates, children's stories, kids learning (counting 1-100, tables, Hindi/Bengali/Urdu alphabets) with audio, desi games and small tools, in Hindi, English, Hinglish and Bengali. No sign-up, works on any phone. Every page exists in 4 languages: Hindi at ${SITE}/, English at ${SITE}/en/, Hinglish at ${SITE}/hinglish/, Bengali at ${SITE}/bn/.

All text is written by NextGrade or is public domain (old folk tales retold in our own words).
${sec('Festival dates and guides', [line(`Indian festival dates ${LIST_YEAR}`, en(`/festivals/${LIST_YEAR}/`), `every major festival with date and weekday`), ...festivals.map((f) => line(`${f.nameEn}: date, meaning, how it is celebrated, wishes`, en(`/festivals/${f.slug}/`)))])}${sec('Wishes and greeting cards', [line('Festival wish card maker', en('/wish-card/'), 'make a card with your name and share on WhatsApp'), line('Wishes for every day', en('/wishes/')), ...(NAAM_LIVE ? [line('Name on image (naam wali image)', en('/naam-wali-image/'), 'write your name on a festival image')] : []), line('Islamic (Hijri) calendar', en('/islamic-calendar/'), "today's Islamic date and Ramadan / Eid dates")])}${sec("Children's stories (kahani)", [line('All stories', en('/kahani/')), ...stories.map((st) => line(st.en.title, en(`/kahani/${st.slug}/`)))])}${sec('School speeches', SPEECHES.length ? [line('All speeches', en('/speech/')), ...SPEECHES.map((sp) => line(sp.en.h1.replace(/^\S+\s/, ''), en(`/speech/${sp.slug}/`)))] : [])}${sec('Essays for students (10 lines, short and long)', ESSAYS.length ? [line('All essays', en('/nibandh/')), ...ESSAYS.map((e) => line(e.en.h1.replace(/^\S+\s/, ''), en(`/nibandh/${e.slug}/`)))] : [])}${sec('Kids learning with pictures and audio (Hindi, English, Bengali, Urdu)', [line('All kids topics', en('/kids/'), 'flashcards with a recorded voice; every page in Hindi, English, Hinglish and Bengali'), ...KIDS_SETS.map((ks) => line(KIDS_SEO[ks.slug] ? KIDS_SEO[ks.slug].en[0] : ks.name.en, en(`/kids/${ks.slug}/`), KIDS_SEO[ks.slug] ? KIDS_SEO[ks.slug].en[1] : '')), ...(KIDS_SETS.find((ks) => ks.slug === 'pahade') ? KIDS_SETS.find((ks) => ks.slug === 'pahade').children.map((c) => line(`Table of ${c.slug} (${c.slug} ka pahada)`, en(`/kids/pahade/${c.slug}/`))) : [])])}${sec('Wedding', SHAADI_LIVE ? [line('Shaadi card maker (wedding invitation card)', en('/shaadi-card/'), 'free Shubh Vivah invitation card, made on the phone, download or share on WhatsApp')] : [])}${sec('Riddles', PAHELI_LIVE ? [line('Riddles with answers (paheliyan)', en('/paheliyan/'), 'Hindi, English and Bengali riddles')] : [])}${sec('Free online calculators (run in the browser)', CALCS.length ? [line('All calculators', en('/calculator/')), ...CALCS.map((c) => line(c.en.h1.replace(/^\S+\s/, ''), en(`/calculator/${c.slug}/`), c.en.lead))] : [])}${sec('Free online games (desi and puzzle, play in the browser)', [line('All games', en('/games/')), ...games.map((g) => line(g.nameEn, `${SITE}/games/${g.slug}/?lang=en`))])}${sec('Rules of Indian desi games (how to play in real life)', KHEL.length ? [line('All rules', en('/khel/')), ...KHEL.map((r) => line(r.en.h1.replace(/^\S+\s/, ''), en(`/khel/${r.slug}/`)))] : [])}${sec('Tools', tools.map((tl) => line(tl.en[0], `${SITE}/tools/${tl.slug}/`, tl.en[1])))}${sec('Weather', [line('Weather today for 600+ Indian cities (Hindi, English, Hinglish, Bengali)', en('/mausam/'), 'current temperature, rain and umbrella tip, tomorrow, 10-day forecast, plus month-by-month climate averages for each city')])}${sec('Travel', [line('Places to visit in India by month and season', en('/ghoomne-ki-jagah/'), '70+ places picked by each month’s average temperature and rain; one page per month, plus winter, snow, summer and monsoon lists')])}
## About

- [About NextGrade](${en('/about/')})
- [Contact](${en('/contact/')})
- [Sitemap](${SITE}/sitemap.xml)
`;
  writeFileSync(join(OUT, 'llms.txt'), txt);
}
// IndexNow key file (proves we own the site; scripts/indexnow.mjs pings Bing with new pages)
{ const { INDEXNOW_KEY } = await import('./scripts/indexnow.mjs'); writeFileSync(join(OUT, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY); }
writeFileSync(join(OUT, 'ads.txt'), `google.com, ${ADSENSE.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(join(OUT, 'CNAME'), 'nextgrade.in\n');
writeFileSync(join(OUT, '.nojekyll'), '');

cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
writeFileSync(join(OUT, 'assets', 'numwords.js'), nwScript());
cpSync('src/static', OUT, { recursive: true });
// games that are not released yet: remove their copied folders
heldGames.forEach((slug) => rmSync(join(OUT, 'games', slug), { recursive: true, force: true }));
heldCelebrate.forEach((slug) => rmSync(join(OUT, 'celebrate', slug), { recursive: true, force: true }));
heldTools.forEach((slug) => rmSync(join(OUT, 'tools', slug), { recursive: true, force: true }));
if (!tools.length) rmSync(join(OUT, 'tools'), { recursive: true, force: true });
// Static tool pages: add WebApplication + Breadcrumb schema and a "more free tools" block (same category first)
tools.forEach((t) => {
  const cat = TOOL_CATS.find((c) => toolsIn(c).some((x) => x.slug === t.slug)) || TOOL_CATS[TOOL_CATS.length - 1];
  const rel = [...toolsIn(cat).filter((x) => x.slug !== t.slug), ...tools.filter((x) => !toolsIn(cat).includes(x))].slice(0, 8);
  const block = `<nav class="ng-more-tools" aria-label="More free tools" style="max-width:1000px;margin:28px auto 18px;padding:14px 16px;border-top:1px solid rgba(128,128,128,.25);font:15px/1.5 system-ui,sans-serif"><h2 style="font-size:1.05rem;margin:0 0 10px">${UT.hi.relH} · More free tools</h2><div style="display:flex;flex-wrap:wrap;gap:8px">${rel.map((x) => `<a href="/tools/${x.slug}/" style="padding:7px 12px;border-radius:999px;border:1px solid rgba(128,128,128,.35);text-decoration:none;color:inherit">${x.emoji} ${esc(x.en[0].split(' — ')[0])}</a>`).join('')}<a href="/tools/" style="padding:7px 12px;border-radius:999px;background:#e8590c;color:#fff;text-decoration:none">${UT.hi.allTools} →</a></div></nav>`;
  const ld = `<script type="application/ld+json">${JSON.stringify([{ '@context': 'https://schema.org', '@type': 'WebApplication', name: t.en[0], url: `${SITE}/tools/${t.slug}/`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, publisher: { '@type': 'Organization', name: NAME, url: `${SITE}/` } }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['NextGrade', `${SITE}/`], ['Tools', `${SITE}/tools/`], [t.en[0], `${SITE}/tools/${t.slug}/`]].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) }])}</script>`;
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = join(dir, d.name);
    if (d.isDirectory()) { if (d.name !== 'icons') walk(f); return; }
    if (d.name !== 'index.html') return;
    let html = readFileSync(f, 'utf8');
    if (html.includes('ng-more-tools')) return;
    if (!html.includes('"WebApplication"') && dir === join(OUT, 'tools', t.slug)) html = html.replace('</head>', `${ld}\n</head>`);
    html = html.replace(/<\/body>(?![\s\S]*<\/body>)/, `${block}\n</body>`);
    writeFileSync(f, html);
  });
  if (existsSync(join(OUT, 'tools', t.slug))) walk(join(OUT, 'tools', t.slug));
});

// Same site header + footer on the app-style pages (tools, games, celebrate) — user 25 Nov: "sab me same header".
// The exact header/footer markup of the site pages (one copy per language; JS shows the page's language), with the
// site's header/footer CSS copied and scoped under .ngc so each app keeps its own design. The language menu switches ?lang=.
{
  const scope = (css) => {
    const KEEP = /(site-head|\.logo|\.nav\b|nav-group|head-right|lang-menu|menu-btn|site-foot|foot-|\.wrap\b|menu-open)/;
    const out = [];
    const rule = (sel, body) => {
      if (sel.trim() === ':root') return `.ngc{${body}}`;
      if (!KEEP.test(sel)) return '';
      return `${sel.split(',').map((x) => { x = x.trim(); return x.startsWith('body.menu-open') ? x.replace('body.menu-open', '.ngc.menu-open') : `.ngc ${x}`; }).join(',')}{${body}}`;
    };
    let i = 0;
    while (i < css.length) {
      const o = css.indexOf('{', i); if (o < 0) break;
      const head = css.slice(i, o).replace(/\/\*[\s\S]*?\*\//g, '').trim();
      if (head.startsWith('@media')) {
        let depth = 1, j = o + 1; while (depth && j < css.length) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
        const inner = css.slice(o + 1, j - 1); let k = 0, parts = [];
        while (k < inner.length) { const a = inner.indexOf('{', k); if (a < 0) break; const b = inner.indexOf('}', a); const r = rule(inner.slice(k, a).replace(/\/\*[\s\S]*?\*\//g, ''), inner.slice(a + 1, b)); if (r) parts.push(r); k = b + 1; }
        if (parts.length) out.push(`${head}{${parts.join('')}}`);
        i = j;
      } else { const c = css.indexOf('}', o); const r = rule(head, css.slice(o + 1, c)); if (r) out.push(r); i = c + 1; }
    }
    return out.join('\n');
  };
  const scoped = scope(readFileSync('src/assets/style.css', 'utf8'));
  const css = `<style id="ngc-css">.ngc{font-family:"Inter","Noto Sans Devanagari","Noto Sans Bengali",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:17px;line-height:1.7;color:var(--text);-webkit-text-size-adjust:100%}.ngc *{box-sizing:border-box}.ngc a{color:var(--brand)}.ngc[hidden]{display:none!important}.ngc-top{position:relative;z-index:1000}.ngc{width:100%;align-self:stretch;flex:0 0 auto;text-align:left}.ngc .site-head,.ngc .site-foot{display:block;margin:0;justify-content:initial;align-items:initial}.ngc .site-head{position:relative;background:var(--bg);padding:0}.ngc details{background:none;border:0;padding:0;margin:0;border-radius:0;box-shadow:none}.ngc summary{background:none;border:0;margin:0}.ngc ul,.ngc li{margin:0}.ngc h4{font-family:inherit;line-height:1.3}.ngc nav{background:none;border:0;padding:0}.ngc .site-foot{text-align:left}\n${scoped}</style>`;
  const parts = Object.fromEntries(LANGS.map((L) => {
    const html = page(L, { path: '/__app__/', title: '', description: '', body: '' });
    return [L.code, { head: html.match(/<header class="site-head">[\s\S]*?<\/header>/)[0], foot: html.match(/<footer class="site-foot">[\s\S]*?<\/footer>/)[0] }];
  }));
  const top = LANGS.map((L) => `<div class="ngc ngc-top" data-ngc="${L.code}"${L.code === 'hi' ? '' : ' hidden'}>${parts[L.code].head}</div>`).join('');
  const bottom = LANGS.map((L) => `<div class="ngc ngc-bottom" data-ngc="${L.code}"${L.code === 'hi' ? '' : ' hidden'}>${parts[L.code].foot}</div>`).join('');
  const GAME = Object.fromEntries(LANGS.map((L) => [L.code, L.game]));
  const js = `<script>(function(){var G=${JSON.stringify(GAME)};function cur(){var q=new URLSearchParams(location.search).get('lang'),h=(document.documentElement.lang||'hi').toLowerCase();if(h==='hi-latn'||q==='hinglish')return 'hinglish';if(h.indexOf('bn')===0)return 'bn';if(h.indexOf('en')===0)return 'en';if(h.indexOf('hi')===0)return 'hi';return G[q]?q:'hi';}
function apply(){var L=cur();document.querySelectorAll('[data-ngc]').forEach(function(d){d.hidden=d.getAttribute('data-ngc')!==L;});}
apply();new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});var sec=location.pathname.split('/')[1];document.querySelectorAll('.ngc .nav-group').forEach(function(g){if(g.querySelector('a[href$="/'+sec+'/"]'))g.querySelector('summary').setAttribute('aria-current','page');});
document.querySelectorAll('.ngc .lang-menu a[hreflang]').forEach(function(a){var code={hi:'hi',en:'en','hi-Latn':'hinglish',bn:'bn'}[a.getAttribute('hreflang')];if(!code)return;a.addEventListener('click',function(e){e.preventDefault();var u=new URL(location.href);u.searchParams.set('lang',G[code]||code);location.href=u.toString();});});
document.querySelectorAll('.ngc .menu-btn').forEach(function(b){var box=b.closest('.ngc');b.addEventListener('click',function(e){e.stopPropagation();var o=!box.classList.contains('menu-open');box.classList.toggle('menu-open',o);b.setAttribute('aria-expanded',String(o));b.textContent=o?'✕':'☰';});});
document.addEventListener('click',function(e){document.querySelectorAll('.ngc details[open]').forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open');});document.querySelectorAll('.ngc.menu-open').forEach(function(box){if(!e.target.closest('.nav')){box.classList.remove('menu-open');var b=box.querySelector('.menu-btn');if(b){b.textContent='☰';b.setAttribute('aria-expanded','false');}}});});})();</script>`;
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = join(dir, d.name);
    if (d.isDirectory()) { if (d.name !== 'icons' && d.name !== 'media') walk(f); return; }
    if (d.name !== 'index.html') return;
    let html = readFileSync(f, 'utf8');
    if (html.includes('ngc-top') || html.includes('<header class="site-head">') || !/<body[^>]*>/.test(html)) return; // site pages (e.g. /tools/, /games/) already have it
    const url = f.slice(OUT.length).replace(/index\.html$/, '').replace(/\\/g, '/');
    const fix = (x) => x.replace(/"\/(en|hinglish|bn)\/__app__\/"/g, (_, l) => `"${url}?lang=${GAME[l]}"`).replace(/"\/__app__\/"/g, `"${url}?lang=${GAME.hi}"`); // language links point at this page
    html = html.replace('</head>', `${css}\n</head>`).replace(/<body([^>]*)>/, `<body$1>\n${fix(top)}`).replace(/<\/body>(?![\s\S]*<\/body>)/, `${fix(bottom)}\n${js}\n</body>`);
    writeFileSync(f, html);
  });
  ['tools', 'games', 'celebrate'].forEach((d) => { if (existsSync(join(OUT, d))) walk(join(OUT, d)); });
}

// Old language-prefixed URLs of single-URL apps (e.g. /en/games/patang/ — 404 in Search Console, 25 Nov):
// a tiny redirect page to /games/patang/?lang=en (GitHub Pages has no server redirects), noindex + canonical.
['games', 'celebrate', 'tools'].forEach((dir) => {
  if (!existsSync(join(OUT, dir))) return;
  readdirSync(join(OUT, dir), { withFileTypes: true }).filter((d) => d.isDirectory() && existsSync(join(OUT, dir, d.name, 'index.html'))).forEach((d) => {
    LANGS.filter((L) => L.prefix).forEach((L) => {
      const f = join(OUT, L.prefix.slice(1), dir, d.name, 'index.html');
      if (existsSync(f)) return; // a real page lives there
      const to = `/${dir}/${d.name}/?lang=${L.game}`;
      mkdirSync(dirname(f), { recursive: true });
      writeFileSync(f, `<!doctype html><html lang="${L.html}"><head><meta charset="utf-8"><title>NextGrade</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE}/${dir}/${d.name}/"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)}+location.hash)</script></head><body><a href="${to}">${SITE}${to}</a></body></html>\n`);
    });
  });
});

// Cloudflare Web Analytics beacon on every page (only when a token is set)
if (CF_BEACON) {
  const tag = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${CF_BEACON}"}'></script><!-- End Cloudflare Web Analytics -->`;
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = join(dir, d.name);
    if (d.isDirectory()) { walk(f); return; }
    if (!d.name.endsWith('.html')) return;
    const html = readFileSync(f, 'utf8');
    if (!html.includes('cloudflareinsights.com') && html.includes('</head>') && !html.includes('http-equiv="refresh"')) writeFileSync(f, html.replace('</head>', `${tag}\n</head>`));
  });
  walk(OUT);
}

// Google Analytics tag on every page, right after <head> (only when GA_ID is set).
// Names in share links (?from=, ?to=, ?with=, ?d=, ?m=, ?score=) are dropped by GA's own "Redact data → URL query
// parameters" setting on the NextGrade site web stream (GA ignores page_location overrides for this tag).
if (GA_ID) {
  const tag = `<!-- Google Analytics: counts visitors only --><script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script><script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');</script>`;
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = join(dir, d.name);
    if (d.isDirectory()) { walk(f); return; }
    if (!d.name.endsWith('.html')) return;
    const html = readFileSync(f, 'utf8');
    if (!html.includes(`gtag/js?id=${GA_ID}`) && !html.includes('http-equiv="refresh"') && /<head[^>]*>/.test(html)) writeFileSync(f, html.replace(/<head[^>]*>/, (h) => `${h}\n${tag}`));
  });
  walk(OUT);
}

// Pages that were live once and are now held back: a small "moved" page instead of a 404 —
// sends people to the index and tells search engines not to index it (no sitemap entry either).
const holdStub = (to, title) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | NextGrade</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${SITE}${to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p><a href="${to}">${title} →</a></p></body></html>\n`;
heldGames.forEach((slug) => { mkdirSync(join(OUT, 'games', slug), { recursive: true }); writeFileSync(join(OUT, 'games', slug, 'index.html'), holdStub('/games/', 'Games')); });
heldCelebrate.forEach((slug) => { mkdirSync(join(OUT, 'celebrate', slug), { recursive: true }); writeFileSync(join(OUT, 'celebrate', slug, 'index.html'), holdStub('/', 'NextGrade')); });
LANGS.forEach((L) => heldStories.forEach((slug) => { const dir = join(OUT, `${L.prefix}/kahani/${slug}`.replace(/^\//, '')); mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, 'index.html'), holdStub(`${L.prefix}/kahani/`, ui[L.code].stories.h1)); }));

// Links on live pages that point at not-yet-released pages: drop "· <a data-game=…>" links, send the rest to the index
if (heldGames.length || heldStories.length || heldCelebrate.length || heldTools.length) {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = join(dir, d.name);
    if (d.isDirectory()) { walk(f); return; }
    if (!d.name.endsWith('.html')) return;
    let html = readFileSync(f, 'utf8');
    const before = html;
    heldGames.forEach((slug) => {
      html = html.replace(new RegExp(` · <a data-game="${slug}"[^>]*>[^<]*</a>`, 'g'), '');
      html = html.split(`https://nextgrade.in/games/${slug}/`).join('https://nextgrade.in/games/').split(`"/games/${slug}/`).join('"/games/');
    });
    heldStories.forEach((slug) => { html = html.split(`/kahani/${slug}/`).join('/kahani/'); });
    heldTools.forEach((slug) => { html = html.split(`https://nextgrade.in/tools/${slug}/`).join(tools.length ? 'https://nextgrade.in/tools/' : 'https://nextgrade.in/').split(`"/tools/${slug}/`).join(tools.length ? '"/tools/' : '"/'); });
    heldCelebrate.forEach((slug) => { html = html.split(`https://nextgrade.in/celebrate/${slug}/`).join('https://nextgrade.in/').split(`"/celebrate/${slug}/`).join('"/'); });
    if (html !== before) writeFileSync(f, html);
  });
  walk(OUT);
}
console.log(`Held back until release: ${[...heldGames.map((s) => `game:${s}`), ...heldStories.map((s) => `story:${s}`), ...heldCelebrate.map((s) => `celebrate:${s}`), ...heldTools.map((s) => `tool:${s}`), ...heldFestivals.map((s) => `festival:${s}`)].map((k) => `${k} (${releases[k]})`).join(', ') || 'none'}`);

console.log(`Built ${allUrls.length} pages in ${LANGS.map((l) => l.code).join(', ')} into ${OUT}/`);

// Write the text that JavaScript fills on game / animated-wish pages into their HTML (see scripts/prerender.mjs)
if (!process.env.NO_PRERENDER) await (await import('./scripts/prerender.mjs')).default(); // NO_PRERENDER=1 for a quick local preview

// Self-hosted fonts: swap every Google Fonts link for our own copy in /fonts/ (made by scripts/vendor-fonts.py),
// so pages load nothing from Google Fonts. An unknown font query keeps its Google link and is reported below.
{
  const fontMap = JSON.parse(readFileSync('src/static/fonts/map.json', 'utf8'));
  const missing = new Set(); let swapped = 0;
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    if (!e.name.endsWith('.html')) return;
    let h = readFileSync(p, 'utf8');
    if (!h.includes('fonts.googleapis.com')) return;
    h = h.replace(/<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2\?([^"]+)"[^>]*>/g, (m, q) => {
      const local = fontMap[q.replace(/&amp;/g, '&')];
      if (!local) { missing.add(q); return m; }
      swapped++; return `<link rel="stylesheet" href="${local}">`;
    });
    if (!h.includes('fonts.googleapis.com/css2')) h = h.replace(/<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\n?/g, '');
    writeFileSync(p, h);
  });
  walk(OUT);
  console.log(`Fonts: ${swapped} links now self-hosted${missing.size ? `; NOT in src/static/fonts/map.json (run scripts/vendor-fonts.py): ${[...missing].join(' | ')}` : ''}`);
}
