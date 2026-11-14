/**
 * Builds the nextgrade.in site into docs/ (served by GitHub Pages).
 * No npm packages: `node build.mjs`. Content lives in src/*.mjs; static files
 * in src/assets and src/static are copied as they are.
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { festivals } from './src/festivals.mjs';
import { apps } from './src/apps.mjs';
import { wishes } from './src/wishes.mjs';

const SITE = 'https://nextgrade.in';
const NAME = 'NextGrade';
const ADSENSE = 'ca-pub-4135041725422483';
const CONTACT = 'contact@nextgrade.in';
const OUT = 'docs';
const TODAY = new Date().toISOString().slice(0, 10);

rmSync(OUT, { recursive: true, force: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NAV = [
  ['/', 'Home'],
  ['/wishes/', 'Wishes'],
  ['/festivals/', 'Festivals'],
  ['/wish-card/', 'Wish Card'],
  ['/apps/', 'Apps'],
  ['/about/', 'About'],
];

function page({ path, title, description, body, jsonLd = [], scripts = [] }) {
  const url = `${SITE}${path}`;
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === path || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<meta name="google-adsense-account" content="${ADSENSE}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}" crossorigin="anonymous"></script>
${ld}
</head>
<body>
<header class="site-head"><div class="wrap">
<a class="logo" href="/"><span class="logo-mark">N</span>${NAME}</a>
<nav class="nav" aria-label="Main">${nav}</nav>
</div></header>
<main>
${body}
</main>
<footer class="site-foot"><div class="wrap">
<div>© ${new Date().getFullYear()} ${NAME} · nextgrade.in<br>त्योहारों की जानकारी, शुभकामनाएँ और छोटे काम के ऐप्स।</div>
<nav aria-label="Footer">
<a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a><a href="/sitemap.xml">Sitemap</a>
</nav>
</div></footer>
<script src="/assets/site.js" defer></script>
${scripts.map((s) => `<script src="${s}" defer></script>`).join('\n')}
</body>
</html>
`;
}

const write = (path, html) => {
  const file = join(OUT, path.endsWith('/') ? `${path}index.html` : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${path}` })),
});

const festivalCard = (f) => `<a class="card" href="/festivals/${f.slug}/">
<span class="emoji" aria-hidden="true">${f.emoji}</span>
<h3>${esc(f.nameHi)} · ${esc(f.nameEn)}</h3>
<p>${esc(f.whenHi)}</p>
</a>`;

const appCard = (a) => `<a class="card" href="${a.url}">
<span class="emoji" aria-hidden="true">${a.emoji}</span>
<span class="tag">${esc(a.tag)}</span>
<h3>${esc(a.name)}</h3>
<p>${esc(a.desc)}</p>
</a>`;

const wishCard = (w) => `<a class="card" href="/wishes/${w.slug}/">
<span class="emoji" aria-hidden="true">${w.emoji}</span>
<h3>${esc(w.nameHi)} · ${esc(w.nameEn)}</h3>
<p>${esc(w.introHi.split('।')[0])}।</p>
</a>`;

const wishItems = (list) => list.map((w) => `<li><span>${esc(w)}</span><button class="copy" type="button" data-copy="${esc(w)}">Copy</button></li>`).join('');

/** "<name> ki taraf se aapko …" banner, filled by site.js from ?from= (as plain text). */
const fromBanner = (greet, emoji) => `<p class="from-banner" hidden data-greet="${esc(greet)}" data-emoji="${esc(emoji)}"></p>`;

/** "Apna wish banao": your name → a link with ?from=<name> → WhatsApp. Nothing is stored. */
const shareBox = (path, title, wish) => `<div class="share-box" data-path="${esc(path)}" data-wish="${esc(wish)}">
<h2>✨ अपना विश बनाएं</h2>
<p>अपना नाम लिखें — हम आपके नाम वाला लिंक बना देंगे। जिसे भेजेंगे, उसे पेज पर सबसे ऊपर दिखेगा: "<b>आपका नाम</b> की तरफ़ से आपको ${esc(title)}"। नाम सिर्फ़ लिंक में रहता है, कहीं सेव नहीं होता।</p>
<div class="share-row"><input class="share-name" maxlength="30" placeholder="आपका नाम, जैसे: Rahul" aria-label="आपका नाम"><button class="btn btn-wa share-wa" type="button">📲 WhatsApp पर भेजें</button><button class="btn btn-ghost share-copy" type="button">🔗 लिंक कॉपी</button></div>
</div>`;

/** Festivals from the current month on, wrapping round the year. */
const upcoming = () => {
  const m = new Date().getMonth() + 1;
  return [...festivals].sort((a, b) => ((a.month - m + 12) % 12) - ((b.month - m + 12) % 12));
};

// ---- Home
write(
  '/',
  page({
    path: '/',
    title: `${NAME} — त्योहार, शुभकामनाएँ और काम के ऐप्स | Festivals, Wishes & Free Apps`,
    description: 'भारत के त्योहारों की पूरी जानकारी — कहानी, महत्व, पूजा और पकवान — साथ में हिंदी-अंग्रेज़ी शुभकामनाएँ, मुफ़्त Wish Card Maker और Hisab Kitab जैसे काम के ऐप्स।',
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: SITE, inLanguage: ['hi', 'en'] }],
    body: `<div class="wrap">
<section class="hero">
<h1>त्योहारों की बातें, शुभकामनाएँ और काम के छोटे ऐप्स</h1>
<p>हर त्योहार की कहानी, महत्व और मनाने का तरीका — आसान हिंदी में, साथ में अंग्रेज़ी सार। अपनों को भेजने के लिए तैयार शुभकामनाएँ और एक क्लिक में बनने वाला शुभकामना कार्ड।</p>
<div class="btns"><a class="btn btn-primary" href="/wish-card/">💌 Wish Card बनाएं</a><a class="btn btn-ghost" href="/festivals/">सभी त्योहार देखें</a></div>
</section>
<section>
<h2>रोज़ की शुभकामनाएँ</h2>
<div class="grid">${wishes.map(wishCard).join('')}</div>
</section>
<section>
<h2>आने वाले त्योहार</h2>
<div class="grid">${upcoming().slice(0, 6).map(festivalCard).join('')}</div>
</section>
<section>
<h2>मुफ़्त ऐप्स और टूल्स</h2>
<div class="grid">${apps.map(appCard).join('')}</div>
</section>
<section class="narrow">
<h2>NextGrade क्या है?</h2>
<p>NextGrade एक छोटी, स्वतंत्र वेबसाइट है जहाँ हम भारत के त्योहारों के बारे में भरोसेमंद, सरल जानकारी और रोज़मर्रा के काम आने वाले छोटे-छोटे मुफ़्त ऐप्स बनाते हैं। हमारी कोशिश है कि हर पेज पढ़ने में आसान हो, मोबाइल पर जल्दी खुले और सच में काम आए।</p>
<p class="note">In English: NextGrade explains Indian festivals — their story, meaning and traditions — with ready-to-share wishes in Hindi and English, a free greeting-card maker and small, free web apps.</p>
</section>
</div>`,
  }),
);

// ---- Festivals index
write(
  '/festivals/',
  page({
    path: '/festivals/',
    title: `भारत के त्योहार — कहानी, महत्व और शुभकामनाएँ | ${NAME}`,
    description: 'क्रिसमस, नया साल, लोहड़ी, मकर संक्रांति, गणतंत्र दिवस, वसंत पंचमी, महाशिवरात्रि, होली, ईद, राम नवमी, रक्षा बंधन और दिवाली — हर त्योहार की पूरी जानकारी और शुभकामनाएँ।',
    jsonLd: [breadcrumbLd([['Home', '/'], ['Festivals', '/festivals/']])],
    body: `<div class="wrap article">
<p class="crumbs"><a href="/">Home</a> › Festivals</p>
<h1>भारत के त्योहार</h1>
<p class="lead">हर त्योहार का अपना पेज — क्यों मनाते हैं, कैसे मनाते हैं, क्या पकवान बनते हैं, और अपनों को भेजने के लिए हिंदी-अंग्रेज़ी शुभकामनाएँ। सूची आने वाले त्योहारों के क्रम में है।</p>
<div class="grid">${upcoming().map(festivalCard).join('')}</div>
<p class="note" style="margin-top:20px">जिन त्योहारों की तारीख चंद्र कैलेंडर (तिथि) से तय होती है, उनकी सटीक तारीख हर साल बदलती है — पूजा का मुहूर्त अपने स्थानीय पंचांग से ज़रूर देखें।</p>
</div>`,
  }),
);

// ---- Festival pages
festivals.forEach((f, i) => {
  const path = `/festivals/${f.slug}/`;
  const next = [festivals[(i + 1) % festivals.length], festivals[(i + 2) % festivals.length], festivals[(i + 3) % festivals.length]];
  write(
    path,
    page({
      path,
      title: `${f.nameHi} (${f.nameEn}) — महत्व, कैसे मनाएँ और शुभकामनाएँ | ${NAME}`,
      description: `${f.nameHi} क्यों और कैसे मनाया जाता है, इसकी कहानी, परंपराएँ और ${f.nameHi} की हिंदी-अंग्रेज़ी शुभकामनाएँ। ${f.whenHi}।`,
      jsonLd: [
        breadcrumbLd([['Home', '/'], ['Festivals', '/festivals/'], [f.nameEn, path]]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${f.nameHi} (${f.nameEn})`,
          inLanguage: 'hi',
          datePublished: TODAY,
          dateModified: TODAY,
          author: { '@type': 'Organization', name: NAME },
          publisher: { '@type': 'Organization', name: NAME },
          mainEntityOfPage: `${SITE}${path}`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: f.faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
        },
      ],
      body: `<article class="wrap narrow article">
<p class="crumbs"><a href="/">Home</a> › <a href="/festivals/">Festivals</a> › ${esc(f.nameEn)}</p>
${fromBanner(`${f.nameHi} की ढेर सारी शुभकामनाएँ`, f.emoji)}
<h1>${f.emoji} ${esc(f.nameHi)} <span style="color:var(--muted);font-weight:600">· ${esc(f.nameEn)}</span></h1>
<p class="lead">${esc(f.introHi)}</p>
<div class="facts">
<div class="fact"><b>कब</b>${esc(f.whenHi)}</div>
<div class="fact"><b>कहाँ</b>${esc(f.whereHi)}</div>
</div>
${f.sections.map((s) => `<h2>${esc(s.h)}</h2>\n${s.p.map((p) => `<p>${esc(p)}</p>`).join('\n')}`).join('\n')}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(f.nameHi)} की शुभकामनाएँ (हिंदी)</h2>
<ul class="wish-list">${wishItems(f.wishesHi)}</ul>
<h2>${esc(f.nameEn)} wishes in English</h2>
<ul class="wish-list">${wishItems(f.wishesEn)}</ul>
${shareBox(path, `${f.nameHi} की शुभकामनाएँ`, f.wishesHi[0])}
<div class="cta"><p>अपने नाम के साथ ${esc(f.nameHi)} का सुंदर कार्ड बनाएं और WhatsApp पर भेजें।</p><a class="btn btn-primary" href="/wish-card/?f=${f.slug}">💌 कार्ड बनाएं</a></div>
<h2>In English</h2>
${f.enSummary.map((p) => `<p>${esc(p)}</p>`).join('\n')}
<h2>अक्सर पूछे जाने वाले सवाल</h2>
<div class="faq">${f.faq.map((q) => `<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('')}</div>
<h2>और त्योहार</h2>
<div class="grid">${next.map(festivalCard).join('')}</div>
</article>`,
    }),
  );
});

// ---- Wishes index
write(
  '/wishes/',
  page({
    path: '/wishes/',
    title: `रोज़ की शुभकामनाएँ — Good Morning, Birthday, Anniversary, Jumma Mubarak | ${NAME}`,
    description: 'गुड मॉर्निंग, जन्मदिन, शादी की सालगिरह और जुम्मा मुबारक की हिंदी-अंग्रेज़ी शुभकामनाएँ — कॉपी करें या अपने नाम के लिंक के साथ WhatsApp पर भेजें।',
    jsonLd: [breadcrumbLd([['Home', '/'], ['Wishes', '/wishes/']])],
    body: `<div class="wrap article">
<p class="crumbs"><a href="/">Home</a> › Wishes</p>
<h1>रोज़ की शुभकामनाएँ</h1>
<p class="lead">वो मौके जो हर दिन या हर हफ़्ते आते हैं — सुबह की शुभकामना, जन्मदिन, सालगिरह और जुमा। हर पेज पर तैयार संदेश हैं, और आप अपने नाम वाला लिंक बनाकर भेज सकते हैं।</p>
<div class="grid">${wishes.map(wishCard).join('')}</div>
<h2>त्योहारों की शुभकामनाएँ</h2>
<p>हर त्योहार के पेज पर उसकी कहानी के साथ शुभकामनाएँ भी हैं — <a href="/festivals/">सभी त्योहार देखें</a>।</p>
</div>`,
  }),
);

// ---- Wish pages
wishes.forEach((w) => {
  const path = `/wishes/${w.slug}/`;
  const more = wishes.filter((x) => x.slug !== w.slug);
  write(
    path,
    page({
      path,
      title: `${w.nameHi} शुभकामनाएँ (${w.nameEn} Wishes) — हिंदी और English | ${NAME}`,
      description: `${w.nameHi} के लिए सादे और दिल से लिखे हिंदी-अंग्रेज़ी संदेश। कॉपी करें या अपने नाम का लिंक बनाकर WhatsApp पर भेजें।`,
      jsonLd: [
        breadcrumbLd([['Home', '/'], ['Wishes', '/wishes/'], [w.nameEn, path]]),
        { '@context': 'https://schema.org', '@type': 'Article', headline: `${w.nameHi} (${w.nameEn}) Wishes`, inLanguage: 'hi', datePublished: TODAY, dateModified: TODAY, author: { '@type': 'Organization', name: NAME }, publisher: { '@type': 'Organization', name: NAME }, mainEntityOfPage: `${SITE}${path}` },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: w.faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })) },
      ],
      body: `<article class="wrap narrow article">
<p class="crumbs"><a href="/">Home</a> › <a href="/wishes/">Wishes</a> › ${esc(w.nameEn)}</p>
${fromBanner(w.greetHi, w.emoji)}
<h1>${w.emoji} ${esc(w.nameHi)} <span style="color:var(--muted);font-weight:600">· ${esc(w.nameEn)}</span></h1>
<p class="lead">${esc(w.introHi)}</p>
<h2>${esc(w.nameHi)} के संदेश (हिंदी)</h2>
<ul class="wish-list">${wishItems(w.wishesHi)}</ul>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(w.nameEn)} wishes in English</h2>
<ul class="wish-list">${wishItems(w.wishesEn)}</ul>
${shareBox(path, w.greetHi, w.wishesHi[0])}
<div class="cta"><p>${esc(w.nameHi)} का सुंदर कार्ड बनाकर गैलरी में सेव करें या भेजें।</p><a class="btn btn-primary" href="/wish-card/?f=${w.slug}">💌 कार्ड बनाएं</a></div>
<h2>${esc(w.nameHi)} के बारे में</h2>
${w.aboutHi.map((p) => `<p>${esc(p)}</p>`).join('\n')}
<h2>In English</h2>
<p>${esc(w.aboutEn)}</p>
<h2>अक्सर पूछे जाने वाले सवाल</h2>
<div class="faq">${w.faq.map((q) => `<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('')}</div>
<h2>और शुभकामनाएँ</h2>
<div class="grid">${more.map(wishCard).join('')}</div>
</article>`,
    }),
  );

});

// ---- Wish card maker
write(
  '/wish-card/',
  page({
    path: '/wish-card/',
    title: `Wish Card Maker — नाम के साथ त्योहार का शुभकामना कार्ड बनाएं | ${NAME}`,
    description: 'मुफ़्त Wish Card Maker: त्योहार चुनें, अपना और पाने वाले का नाम लिखें, संदेश चुनें और सुंदर कार्ड डाउनलोड करें या WhatsApp पर शेयर करें। कोई साइन-अप नहीं।',
    jsonLd: [
      breadcrumbLd([['Home', '/'], ['Wish Card Maker', '/wish-card/']]),
      { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Wish Card Maker', url: `${SITE}/wish-card/`, applicationCategory: 'LifestyleApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } },
    ],
    scripts: ['/assets/festivals.js', '/assets/card.js'],
    body: `<div class="wrap article">
<p class="crumbs"><a href="/">Home</a> › Wish Card Maker</p>
<h1>💌 Wish Card Maker</h1>
<p class="lead">त्योहार चुनें, नाम लिखें और कुछ ही सेकंड में अपना शुभकामना कार्ड बनाएं। कार्ड आपके फ़ोन/कंप्यूटर पर ही बनता है — आपका नाम या संदेश कहीं सेव या भेजा नहीं जाता।</p>
<div class="maker">
<form id="maker" onsubmit="return false">
<div class="field"><label for="festival">मौका / त्योहार</label><select id="festival"></select></div>
<div class="field"><label for="to">किसके लिए (नाम)</label><input id="to" maxlength="40" placeholder="जैसे: मम्मी-पापा, Rahul"></div>
<div class="field"><label for="from">आपका नाम</label><input id="from" maxlength="40" placeholder="जैसे: Nazim"></div>
<div class="field"><label for="wish">संदेश</label><select id="wish"></select></div>
<div class="field"><label for="custom">या अपना संदेश लिखें</label><textarea id="custom" rows="3" maxlength="220" placeholder="खाली छोड़ें तो ऊपर वाला संदेश लगेगा"></textarea></div>
<div class="btns"><button class="btn btn-primary" type="button" id="share">📤 Share</button><button class="btn btn-ghost" type="button" id="download">⬇️ Download</button></div>
<p class="note" id="status" role="status"></p>
</form>
<div class="preview"><canvas id="card" width="1080" height="1350" aria-label="शुभकामना कार्ड का प्रीव्यू"></canvas></div>
</div>
<div class="ad" aria-hidden="true"></div>
<h2>कैसे इस्तेमाल करें</h2>
<ol>
<li>ऊपर से त्योहार चुनें — कार्ड का रंग और संदेश उसी के हिसाब से बदल जाएंगे।</li>
<li>पाने वाले का और अपना नाम लिखें (चाहें तो खाली भी छोड़ सकते हैं)।</li>
<li>तैयार संदेशों में से चुनें या अपना संदेश लिखें।</li>
<li><b>Share</b> दबाकर सीधे WhatsApp/Instagram पर भेजें, या <b>Download</b> करके गैलरी में सेव करें।</li>
</ol>
<p class="note">Make a festival greeting card with your own names and message, then share it or save it as an image. Everything happens in your browser.</p>
</div>`,
  }),
);

// Festival data for the card maker (names, colours, wishes only).
mkdirSync(join(OUT, 'assets'), { recursive: true });
writeFileSync(
  join(OUT, 'assets', 'festivals.js'),
  `window.NG_FESTIVALS = ${JSON.stringify([...wishes, ...festivals].map((f) => ({ slug: f.slug, emoji: f.emoji, nameHi: f.nameHi, nameEn: f.nameEn, colors: f.colors, wishes: [...f.wishesHi, ...f.wishesEn] })))};\n`,
);

// ---- Apps
write(
  '/apps/',
  page({
    path: '/apps/',
    title: `मुफ़्त ऐप्स और टूल्स | ${NAME}`,
    description: 'NextGrade के मुफ़्त वेब ऐप्स — Hisab Kitab (खर्च और उधार का हिसाब) और Wish Card Maker। फ़ोन पर इंस्टॉल होते हैं, बिना साइन-अप के चलते हैं।',
    jsonLd: [breadcrumbLd([['Home', '/'], ['Apps', '/apps/']])],
    body: `<div class="wrap article">
<p class="crumbs"><a href="/">Home</a> › Apps</p>
<h1>मुफ़्त ऐप्स और टूल्स</h1>
<p class="lead">छोटे, हल्के और मुफ़्त वेब ऐप्स जो मोबाइल पर ऐप की तरह इंस्टॉल हो जाते हैं। ज़्यादातर ऐप आपका डेटा आपके ही फ़ोन पर रखते हैं।</p>
<div class="grid">${apps.map(appCard).join('')}</div>
<h2>Install कैसे करें</h2>
<p>Android पर Chrome में ऐप खोलें और मेनू (⋮) से <b>Install app / Add to Home screen</b> चुनें। iPhone पर Safari में Share बटन दबाकर <b>Add to Home Screen</b> चुनें।</p>
<p class="note">More small apps and festival tools are on the way. Each lives on its own nextgrade.in address and is listed here.</p>
</div>`,
  }),
);

// ---- Static info pages
const infoPage = (path, title, description, html) =>
  write(path, page({ path, title: `${title} | ${NAME}`, description, jsonLd: [breadcrumbLd([['Home', '/'], [title, path]])], body: `<article class="wrap narrow article"><p class="crumbs"><a href="/">Home</a> › ${esc(title)}</p><h1>${esc(title)}</h1>${html}</article>` }));

infoPage(
  '/about/',
  'About NextGrade',
  'NextGrade के बारे में — हम कौन हैं, यह साइट क्यों बनाई और हमारी जानकारी कहाँ से आती है।',
  `<p class="lead">NextGrade (nextgrade.in) भारत में बनी एक छोटी, स्वतंत्र वेबसाइट है।</p>
<h2>हम क्या करते हैं</h2>
<p>हम दो तरह की चीज़ें बनाते हैं: <b>त्योहारों की सरल और भरोसेमंद जानकारी</b> — कहानी, महत्व, परंपराएँ, पकवान और शुभकामनाएँ — और <b>छोटे मुफ़्त वेब ऐप्स</b>, जैसे खर्च और उधार का हिसाब रखने वाला Hisab Kitab और Wish Card Maker।</p>
<h2>हमारी जानकारी</h2>
<p>त्योहारों के पेज आम तौर पर मानी जाने वाली परंपराओं, धार्मिक ग्रंथों की लोकप्रिय कथाओं और सरकारी/सार्वजनिक स्रोतों पर आधारित हैं। जिन त्योहारों की तारीख तिथि से तय होती है, उनके लिए हम महीना और तिथि लिखते हैं, क्योंकि अंग्रेज़ी तारीख हर साल बदलती है। कोई गलती दिखे तो <a href="/contact/">हमें बताएं</a> — हम जल्द सुधारेंगे।</p>
<h2>हमारे ऐप्स और आपका डेटा</h2>
<p>हमारे ऐप्स जहाँ तक संभव हो आपका डेटा आपके ही डिवाइस पर रखते हैं। Wish Card Maker आपका नाम या संदेश कहीं नहीं भेजता — कार्ड आपके ब्राउज़र में ही बनता है।</p>
<h2>About (English)</h2>
<p>NextGrade is a small independent website from India. We write clear guides to Indian festivals with ready-to-share wishes, and build small free web apps such as Hisab Kitab (an expense and lend/borrow tracker) and the Wish Card Maker. Found a mistake? Please <a href="/contact/">tell us</a>.</p>`,
);

infoPage(
  '/contact/',
  'Contact',
  'NextGrade से संपर्क करें — सुझाव, गलती की सूचना या ऐप से जुड़ा सवाल।',
  `<p class="lead">सुझाव, किसी पेज में गलती, या किसी ऐप से जुड़ा सवाल — हमें ईमेल करें।</p>
<p style="font-size:20px"><b>Email:</b> <a href="mailto:${CONTACT}">${CONTACT}</a></p>
<p>हम आम तौर पर 2-3 कार्यदिवसों में जवाब देते हैं। कृपया ईमेल में पासवर्ड, OTP या बैंक की जानकारी कभी न भेजें।</p>
<h2>Contact (English)</h2>
<p>For suggestions, corrections or questions about our apps, write to <a href="mailto:${CONTACT}">${CONTACT}</a>. We usually reply within 2-3 working days.</p>`,
);

infoPage(
  '/privacy-policy/',
  'Privacy Policy',
  'NextGrade की प्राइवेसी पॉलिसी — कौन सी जानकारी ली जाती है, कुकीज़ और Google AdSense विज्ञापन।',
  `<p class="note">Last updated: ${TODAY}</p>
<p>This Privacy Policy explains how NextGrade ("we", "us") at nextgrade.in handles information when you use this website. Our apps on nextgrade.in subdomains (for example hisab.nextgrade.in) have their own privacy pages that apply in addition to this one.</p>
<h2>Information we collect</h2>
<p>We do not ask you to create an account on this website and we do not collect your name, email or phone number unless you choose to email us. The Wish Card Maker works entirely in your browser: the names and message you type are not sent to us or stored by us.</p>
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
<p>हम इस वेबसाइट पर आपसे कोई अकाउंट या निजी जानकारी नहीं माँगते। Wish Card Maker में लिखे नाम और संदेश आपके ब्राउज़र में ही रहते हैं। साइट पर Google AdSense के विज्ञापन दिखते हैं, जो कुकीज़ का इस्तेमाल करते हैं; आप <a href="https://www.google.com/settings/ads" rel="nofollow">Google Ads Settings</a> में जाकर पर्सनलाइज़्ड विज्ञापन बंद कर सकते हैं।</p>`,
);

infoPage(
  '/terms/',
  'Terms of Use',
  'NextGrade वेबसाइट और ऐप्स के इस्तेमाल की शर्तें।',
  `<p class="note">Last updated: ${TODAY}</p>
<p>By using nextgrade.in you agree to these terms.</p>
<h2>Use of content</h2>
<p>You may read and share our pages and the wishes on them for personal, non-commercial use. Please link back to the page instead of copying whole articles. Greeting cards you make with the Wish Card Maker are yours to share.</p>
<h2>Accuracy</h2>
<p>We try to keep festival information accurate, but traditions vary by region and family, and dates of festivals that follow the lunar calendar change every year. Please check the exact date and muhurat in your local panchang. See our <a href="/disclaimer/">Disclaimer</a>.</p>
<h2>Our apps</h2>
<p>Our apps are provided free and "as is", without warranty. Keep your own backups of anything important you store in them.</p>
<h2>Acceptable use</h2>
<p>Do not use our tools to create cards or messages that are abusive, hateful, misleading or illegal.</p>
<h2>Changes and contact</h2>
<p>We may change these terms at any time. Questions: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>`,
);

infoPage(
  '/disclaimer/',
  'Disclaimer',
  'NextGrade पर दी गई त्योहारों और धार्मिक परंपराओं की जानकारी के बारे में डिस्क्लेमर।',
  `<p>NextGrade पर दी गई त्योहारों, परंपराओं और पूजा से जुड़ी जानकारी सामान्य जानकारी के लिए है। अलग-अलग क्षेत्रों, समुदायों और परिवारों में परंपराएँ अलग हो सकती हैं।</p>
<p>चंद्र कैलेंडर से तय होने वाले त्योहारों की तारीख और शुभ मुहूर्त हर साल बदलते हैं — सटीक समय के लिए अपने स्थानीय पंचांग, पुजारी या धार्मिक संस्था से पुष्टि करें। व्रत रखने से पहले, खासकर बीमारी या गर्भावस्था में, डॉक्टर की सलाह लें।</p>
<p>The information on NextGrade is for general purposes only. Traditions differ by region and community, and lunar-calendar festival dates change every year — confirm exact dates and timings locally. Health-related notes (such as fasting) are not medical advice.</p>
<p>This site shows ads from Google AdSense. We are not responsible for the content of third-party ads or linked websites.</p>`,
);

// ---- 404
write(
  '/404.html',
  page({
    path: '/404.html',
    title: `पेज नहीं मिला | ${NAME}`,
    description: 'यह पेज मौजूद नहीं है।',
    body: `<div class="wrap article"><h1>पेज नहीं मिला</h1><p class="lead">यह पेज मौजूद नहीं है या हटा दिया गया है।</p><div class="btns"><a class="btn btn-primary" href="/">Home</a><a class="btn btn-ghost" href="/festivals/">Festivals</a></div></div>`,
  }),
);

// ---- Machine files
const urls = ['/', '/wishes/', ...wishes.map((w) => `/wishes/${w.slug}/`), '/festivals/', ...festivals.map((f) => `/festivals/${f.slug}/`), '/wish-card/', '/apps/', '/about/', '/contact/', '/privacy-policy/', '/terms/', '/disclaimer/'];
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}\n</urlset>\n`,
);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(OUT, 'ads.txt'), `google.com, ${ADSENSE.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(join(OUT, 'CNAME'), 'nextgrade.in\n');
writeFileSync(join(OUT, '.nojekyll'), '');

cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
cpSync('src/static', OUT, { recursive: true });

console.log(`Built ${urls.length} pages into ${OUT}/`);

