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
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { festivals } from './src/festivals.mjs';
import { apps } from './src/apps.mjs';
import { wishes } from './src/wishes.mjs';
import { games } from './src/games.mjs';
import { stories } from './src/stories.mjs';
import * as islamic from './src/islamic.mjs';
import { ui } from './src/i18n/ui.mjs';

const SITE = 'https://nextgrade.in';
const NAME = 'NextGrade';
const ADSENSE = 'ca-pub-4135041725422483';
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
const NAV = ['/', '/kahani/', '/wishes/', '/festivals/', '/games/', '/wish-card/', '/apps/', '/about/'];
const NAV_KEYS = ['home', 'stories', 'wishes', 'festivals', 'games', 'card', 'apps', 'about'];
// Voice used by the browser to read stories aloud.
const SPEECH = { hi: 'hi-IN', en: 'en-IN', hinglish: 'en-IN', bn: 'bn-IN' };

function page(L, { path, title, description, body, jsonLd = [], scripts = [], langs = LANGS }) {
  const T = ui[L.code];
  const url = `${SITE}${P(L, path)}`;
  const nav = NAV.map((href, i) => `<a href="${P(L, href)}"${href === path || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : ''}>${T.nav[NAV_KEYS[i]]}</a>`).join('');
  // Language dropdown (details/summary: works without JavaScript; site.js closes it on outside click).
  const switcher = langs.length > 1
    ? `<details class="lang-menu"><summary aria-label="${T.langLabel}">🌐 <span>${ui[L.code].langName}</span></summary><ul>${langs.map((l) => `<li><a href="${P(l, path)}" hreflang="${l.hreflang}" lang="${l.html}"${l.code === L.code ? ' aria-current="true"' : ''}>${ui[l.code].langName}${l.code === L.code ? ' ✓' : ''}</a></li>`).join('')}</ul></details>`
    : '';
  const alternates = langs.length > 1 ? [...langs.map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${SITE}${P(l, path)}">`), `<link rel="alternate" hreflang="x-default" href="${SITE}${path}">`].join('\n') : '';
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const fonts = `family=Inter:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700${L.code === 'bn' ? '&family=Noto+Sans+Bengali:wght@400;600;700' : ''}&display=swap`;
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
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#d9480f">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
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
<a class="logo" href="${P(L, '/')}"><span class="logo-mark">N</span>${NAME}</a>
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
  publisher: { '@type': 'Organization', name: NAME },
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
const CELEBRATE = [
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
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: `${SITE}${P(L, '/')}`, inLanguage: L.html }],
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
<div class="grid">${upcoming().map(festivalCard(L)).join('')}</div>
<p class="note" style="margin-top:20px">${esc(T.festivals.note)}</p>
</div>`,
    }),
  );

  // Festival pages
  festivals.forEach((f, i) => {
    const path = `/festivals/${f.slug}/`;
    const x = lf(f, L);
    const F = T.festival;
    const next = [1, 2, 3].map((k) => festivals[(i + k) % festivals.length]);
    write(
      L,
      path,
      page(L, {
        path,
        title: F.title(x.name, x.alt),
        description: F.desc(x.name, x.when),
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.festivals, '/festivals/'], [x.name, path]]), articleLd(L, `${x.name} (${x.alt})`, path), faqLd(x.faq)],
        body: `<article class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, '/festivals/')}">${esc(T.nav.festivals)}</a> › ${esc(x.name)}</p>
${fromBanner(L, F.greet(x.name), f.emoji)}
<h1>${f.emoji} ${esc(x.name)} <span style="color:var(--muted);font-weight:600">· ${esc(x.alt)}</span></h1>
<p class="lead">${esc(x.intro)}</p>
${celebrateButton(L, 'festival', f.slug)}
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
${faqBlock(x.faq)}
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
<div class="grid">${stories.map(storyCard(L)).join('')}</div>
</div>`,
    }),
  );
  stories.forEach((st, i) => {
    const path = `/kahani/${st.slug}/`;
    const x = st[L.code];
    const prev = stories[(i - 1 + stories.length) % stories.length];
    const next = stories[(i + 1) % stories.length];
    const more = [1, 2, 3].map((k) => stories[(i + k) % stories.length]);
    write(
      L,
      path,
      page(L, {
        path,
        title: `${x.title} — ${S.h1.replace('🌙 ', '')} | NextGrade`,
        description: `${firstSentence(x.paras[0])} ${x.seekh}`,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.stories, '/kahani/'], [x.title, path]]), { ...articleLd(L, x.title, path), '@type': 'Article', genre: st.source.en, timeRequired: `PT${st.minutes}M` }],
        scripts: ['/assets/story.js'],
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
<h2>${esc(T.games.soonH)}</h2>
<p>${esc(T.games.soonP)}</p>
</div>`,
    }),
  );

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
<h2>${esc(T.apps.installH)}</h2>
<p>${T.apps.installP}</p>
</div>`,
    }),
  );

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
<h2>Children</h2>
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
const gameUrls = games.map((g) => `/games/${g.slug}/`);
const allUrls = [...urls, ...gameUrls, ...CELEBRATE.map((c) => `/celebrate/${c.slug}/`)];
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}\n</urlset>\n`,
);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(OUT, 'ads.txt'), `google.com, ${ADSENSE.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(join(OUT, 'CNAME'), 'nextgrade.in\n');
writeFileSync(join(OUT, '.nojekyll'), '');

cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
cpSync('src/static', OUT, { recursive: true });

console.log(`Built ${allUrls.length} pages in ${LANGS.map((l) => l.code).join(', ')} into ${OUT}/`);
