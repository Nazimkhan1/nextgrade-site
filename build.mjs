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
import { games as allGames } from './src/games.mjs';
import { stories as allStories } from './src/stories.mjs';
import { tools as allTools } from './src/tools.mjs';
import { storyExtras, SOURCE_INFO, COLLECTIONS, collectionOf, srcKey } from './src/story-info.mjs';
import { NAAM_OCCASIONS, NAAM_UI } from './src/naam-image.mjs';
import { PAHELI, PAHELI_UI } from './src/paheliyan.mjs';
import { speeches as allSpeeches, SPEECH_UI } from './src/speeches.mjs';
import { essays as allEssays, NIBANDH_UI } from './src/nibandh.mjs';
import { calculators as allCalculators, CALC_UI } from './src/calculators.mjs';
import { whyFaq } from './src/festival-why.mjs';
import { rules as allRules, KHEL_UI } from './src/khel.mjs';
import { LIST_YEAR, nextFestivalDate, festivalsInYear, fmt, weekday, DATE_TEXT } from './src/festival-dates.mjs';
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
const PAHELI_LIVE = isLive('page:paheliyan');
const SPEECHES = allSpeeches.filter((sp) => isLive(`speech:${sp.slug}`));
const ESSAYS = allEssays.filter((e) => isLive(`nibandh:${e.slug}`));
const KHEL = allRules.filter((r) => isLive(`game:${r.slug}`)); // rules page goes live with its game
const CALCS = allCalculators.filter((c) => isLive(`calc:${c.slug}`));
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
// Calculator menu link (user, 20 Nov 2026: calculators live now, with the menu link)
const CALC_IN_NAV = true;
const NAV = ['/', '/kahani/', '/wishes/', '/festivals/', '/games/', ...(CALC_IN_NAV && CALCS.length ? ['/calculator/'] : []), ...(tools.length ? ['/tools/'] : []), '/wish-card/', '/apps/', '/about/'];
const NAV_KEYS = ['home', 'stories', 'wishes', 'festivals', 'games', ...(CALC_IN_NAV && CALCS.length ? ['calc'] : []), ...(tools.length ? ['tools'] : []), 'card', 'apps', 'about'];
// Voice used by the browser to read stories aloud.
const SPEECH = { hi: 'hi-IN', en: 'en-IN', hinglish: 'en-IN', bn: 'bn-IN' };

function page(L, { path, title, description, body, jsonLd = [], scripts = [], langs = LANGS, extraFonts = '' }) {
  const T = ui[L.code];
  const url = `${SITE}${P(L, path)}`;
  const nav = NAV.map((href, i) => `<a href="${P(L, href)}"${href === path || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : ''}>${T.nav[NAV_KEYS[i]]}</a>`).join('');
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
<div class="head-right"><nav class="nav" aria-label="Main">${nav}</nav>${switcher}</div>
</div></header>
<main>
${body}
</main>
<footer class="site-foot"><div class="wrap">
<div>© ${new Date().getFullYear()} ${NAME} · nextgrade.in<br>${esc(T.footer)}</div>
<nav aria-label="Footer">
<a href="${P(L, '/about/')}">${esc(T.about.title)}</a><a href="${P(L, '/contact/')}">${esc(T.contact.title)}</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a><a href="/sitemap.xml">Sitemap</a>
</nav>
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
};

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
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: `${SITE}${P(L, '/')}`, inLanguage: L.html }, { '@context': 'https://schema.org', '@type': 'Organization', name: NAME, url: `${SITE}/`, logo: `${SITE}/icons/icon-512.png`, email: CONTACT, areaServed: 'IN' }],
      body: `<div class="wrap">
<section class="hero">
<h1>${esc(T.home.h1)}</h1>
<p>${esc(T.home.lead)}</p>
<div class="btns"><a class="btn btn-primary" href="${P(L, '/wish-card/')}">${esc(T.home.btnCard)}</a><a class="btn btn-ghost" href="${P(L, '/festivals/')}">${esc(T.home.btnFestivals)}</a></div>
</section>
<section><h2>${esc(T.stories.h1)}</h2><div class="grid">${stories.slice(0, 3).map(storyCard(L)).join('')}</div><p><a href="${P(L, '/kahani/')}">${esc(T.stories.all)} →</a></p></section>
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
<h2>${esc(T.wishIndex.festH)}</h2>
<p>${T.wishIndex.festP(P(L, '/festivals/'))}</p>
</div>`,
    }),
  );

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
        title: W.title(x.name, x.alt),
        description: W.desc(x.name),
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
    const calcStyle = `<style>.calc-form{display:grid;gap:.9rem;margin:1.1rem 0}.calc-field{display:grid;gap:.3rem}.calc-field span{font-weight:600}.calc-field input,.calc-field select{padding:.6rem .7rem;font-size:1.05rem;border:1px solid var(--line,#ccd);border-radius:.5rem;background:var(--card,#fff);color:inherit;width:100%}.calc-result{margin-top:1rem;padding:1rem 1.1rem;border:1px solid var(--line,#ccd);border-radius:.6rem;background:var(--card,#fff)}.calc-row{display:flex;justify-content:space-between;gap:1rem;padding:.4rem 0;border-bottom:1px dashed var(--line,#eee)}.calc-row:last-child{border-bottom:0}.calc-strong{font-size:1.15rem}.calc-strong b{color:var(--accent,#c0392b)}.calc-note{margin:.6rem 0 0;font-size:.9rem;opacity:.8}.calc-err{color:#c0392b;margin:0}</style>`;
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
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, '/calculator/'], [name(c), path]]), articleLd(L, name(c), path), faqLd(faq)],
        scripts: ['/assets/calc.js'],
        body: `<article class="wrap narrow article">
${calcStyle}
<p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/calculator/')}">${esc(U.hub)}</a> › ${esc(name(c))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
<form class="calc-form" data-calc="${c.type}" data-strings="${esc(JSON.stringify(x.strings))}">
${c.fields.map((f) => field(c, f)).join('\n')}
<button class="btn" type="submit">${esc(x.btn)}</button>
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
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.tools, '/tools/']])],
        body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(T.nav.tools)}</p>
<h1>${esc(T.tools.h1)}</h1>
<p class="lead">${esc(T.tools.lead)}</p>
<div class="grid">${tools.map(toolCard(L)).join('')}</div>
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
${tools.length ? '<h2>Photo and document tools</h2>\n<p>The tools under nextgrade.in/tools/ (for example the exam form photo and signature resizer, image compressor, passport photo maker and document scanner) run entirely inside your browser. The photos and documents you choose are processed on your device and are never uploaded to us or to any server; the result is saved only to your device. Some tools download their library or model files from nextgrade.in once and may keep them for offline use.</p>\n' : ''}<h2>Children</h2>
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
  return CONTENT_DATE;
};
const gameUrls = games.map((g) => `/games/${g.slug}/`);
const allUrls = [...urls, ...gameUrls, ...CELEBRATE.map((c) => `/celebrate/${c.slug}/`), ...tools.flatMap((tl) => [`/tools/${tl.slug}/`, ...(tl.pages || []).map((pg) => `/tools/${tl.slug}/${pg}/`)])];
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${lastmodFor(u)}</lastmod></url>`).join('\n')}\n</urlset>\n`,
);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
// llms.txt: a plain map of the site for AI assistants (only live pages; rebuilt daily with the releases)
{
  const en = (p) => `${SITE}/en${p}`;
  const line = (title, url, note) => `- [${title}](${url})${note ? `: ${note}` : ''}`;
  const sec = (h, rows) => (rows.length ? `\n## ${h}\n\n${rows.join('\n')}\n` : '');
  const txt = `# NextGrade

> Free Indian festival wishes, festival dates, children's stories, desi games and small tools, in Hindi, English, Hinglish and Bengali. No sign-up, works on any phone. Every page exists in 4 languages: Hindi at ${SITE}/, English at ${SITE}/en/, Hinglish at ${SITE}/hinglish/, Bengali at ${SITE}/bn/.

All text is written by NextGrade or is public domain (old folk tales retold in our own words).
${sec('Festival dates and guides', [line(`Indian festival dates ${LIST_YEAR}`, en(`/festivals/${LIST_YEAR}/`), `every major festival with date and weekday`), ...festivals.map((f) => line(`${f.nameEn}: date, meaning, how it is celebrated, wishes`, en(`/festivals/${f.slug}/`)))])}${sec('Wishes and greeting cards', [line('Festival wish card maker', en('/wish-card/'), 'make a card with your name and share on WhatsApp'), line('Wishes for every day', en('/wishes/')), ...(NAAM_LIVE ? [line('Name on image (naam wali image)', en('/naam-wali-image/'), 'write your name on a festival image')] : []), line('Islamic (Hijri) calendar', en('/islamic-calendar/'), "today's Islamic date and Ramadan / Eid dates")])}${sec("Children's stories (kahani)", [line('All stories', en('/kahani/')), ...stories.map((st) => line(st.en.title, en(`/kahani/${st.slug}/`)))])}${sec('School speeches', SPEECHES.length ? [line('All speeches', en('/speech/')), ...SPEECHES.map((sp) => line(sp.en.h1.replace(/^\S+\s/, ''), en(`/speech/${sp.slug}/`)))] : [])}${sec('Essays for students (10 lines, short and long)', ESSAYS.length ? [line('All essays', en('/nibandh/')), ...ESSAYS.map((e) => line(e.en.h1.replace(/^\S+\s/, ''), en(`/nibandh/${e.slug}/`)))] : [])}${sec('Riddles', PAHELI_LIVE ? [line('Riddles with answers (paheliyan)', en('/paheliyan/'), 'Hindi, English and Bengali riddles')] : [])}${sec('Free online calculators (run in the browser)', CALCS.length ? [line('All calculators', en('/calculator/')), ...CALCS.map((c) => line(c.en.h1.replace(/^\S+\s/, ''), en(`/calculator/${c.slug}/`), c.en.lead))] : [])}${sec('Free online games (desi and puzzle, play in the browser)', [line('All games', en('/games/')), ...games.map((g) => line(g.nameEn, `${SITE}/games/${g.slug}/?lang=en`))])}${sec('Rules of Indian desi games (how to play in real life)', KHEL.length ? [line('All rules', en('/khel/')), ...KHEL.map((r) => line(r.en.h1.replace(/^\S+\s/, ''), en(`/khel/${r.slug}/`)))] : [])}${sec('Tools', tools.map((tl) => line(tl.en[0], `${SITE}/tools/${tl.slug}/`, tl.en[1])))}
## About

- [About NextGrade](${en('/about/')})
- [Contact](${en('/contact/')})
- [Sitemap](${SITE}/sitemap.xml)
`;
  writeFileSync(join(OUT, 'llms.txt'), txt);
}
writeFileSync(join(OUT, 'ads.txt'), `google.com, ${ADSENSE.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(join(OUT, 'CNAME'), 'nextgrade.in\n');
writeFileSync(join(OUT, '.nojekyll'), '');

cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
cpSync('src/static', OUT, { recursive: true });
// games that are not released yet: remove their copied folders
heldGames.forEach((slug) => rmSync(join(OUT, 'games', slug), { recursive: true, force: true }));
heldCelebrate.forEach((slug) => rmSync(join(OUT, 'celebrate', slug), { recursive: true, force: true }));
heldTools.forEach((slug) => rmSync(join(OUT, 'tools', slug), { recursive: true, force: true }));
if (!tools.length) rmSync(join(OUT, 'tools'), { recursive: true, force: true });

// Cloudflare Web Analytics beacon on every page (only when a token is set)
if (CF_BEACON) {
  const tag = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${CF_BEACON}"}'></script><!-- End Cloudflare Web Analytics -->`;
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = join(dir, d.name);
    if (d.isDirectory()) { walk(f); return; }
    if (!d.name.endsWith('.html')) return;
    const html = readFileSync(f, 'utf8');
    if (!html.includes('cloudflareinsights.com') && html.includes('</head>')) writeFileSync(f, html.replace('</head>', `${tag}\n</head>`));
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
    if (!html.includes(`gtag/js?id=${GA_ID}`) && /<head[^>]*>/.test(html)) writeFileSync(f, html.replace(/<head[^>]*>/, (h) => `${h}\n${tag}`));
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
await (await import('./scripts/prerender.mjs')).default();
