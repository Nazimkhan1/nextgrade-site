/** /purnima/, /amavasya/, /ekadashi/ — next 13 months of dates with tithi start/end (IST), worked out in src/tithi.mjs. */
import { events, MONTHS, EKADASHI } from './tithi.mjs';

const T3 = {
  hi: {
    purnima: { nav: 'पूर्णिमा', title: (y) => `पूर्णिमा ${y} कब है — सभी पूर्णिमा की तारीख़, तिथि का समय और व्रत | NextGrade`, desc: (y, n) => `पूर्णिमा ${y} की पूरी सूची: अगली पूर्णिमा ${n}। हर पूर्णिमा का नाम (पौष, माघ, शरद…), तिथि शुरू और ख़त्म होने का समय और व्रत/स्नान की तारीख़।`, h1: (y) => `🌕 पूर्णिमा ${y} — सभी तारीख़ें और समय`, lead: 'हर महीने की पूर्णिमा की तिथि कब शुरू होगी, कब ख़त्म होगी और व्रत किस दिन रखें — एक जगह।' },
    amavasya: { nav: 'अमावस्या', title: (y) => `अमावस्या ${y} कब है — सभी अमावस्या की तारीख़ और तिथि का समय | NextGrade`, desc: (y, n) => `अमावस्या ${y} की पूरी सूची: अगली अमावस्या ${n}। हर अमावस्या का नाम, तिथि शुरू और ख़त्म होने का समय, स्नान-दान और पितृ तर्पण का दिन।`, h1: (y) => `🌑 अमावस्या ${y} — सभी तारीख़ें और समय`, lead: 'हर महीने की अमावस्या की तिथि कब शुरू और ख़त्म होगी, और स्नान-दान किस दिन — एक जगह।' },
    ekadashi: { nav: 'एकादशी', title: (y) => `एकादशी ${y} कब है — सभी एकादशी व्रत की तारीख़, नाम और समय | NextGrade`, desc: (y, n) => `एकादशी ${y} की पूरी सूची: अगली एकादशी ${n}। हर एकादशी का नाम (मोक्षदा, सफला, षटतिला…), तिथि का समय और व्रत की तारीख़।`, h1: (y) => `🙏 एकादशी ${y} — सभी व्रत की तारीख़ें`, lead: 'साल की सभी 24 एकादशियाँ — नाम, तिथि शुरू/ख़त्म होने का समय और व्रत का दिन।' },
    cols: ['नाम', 'व्रत/तारीख़', 'तिथि शुरू', 'तिथि ख़त्म'], next: 'अगली', adhik: 'अधिक', shukla: 'शुक्ल', krishna: 'कृष्ण', pur: 'पूर्णिमा', ama: 'अमावस्या', eka: 'एकादशी',
    howH: 'तारीख़ कैसे तय होती है', how: ['तिथि चंद्रमा और सूर्य की दूरी से बनती है — हर 12° पर एक तिथि। इसलिए तिथि दिन के बीच में भी शुरू या ख़त्म हो सकती है।', 'व्रत की तारीख़ आम तौर पर वह दिन है जिस दिन सूर्योदय के समय वह तिथि चल रही हो (उदया तिथि)। यहाँ नई दिल्ली के सूर्योदय से निकाली गई है।', 'महीनों के नाम उत्तर भारत के पूर्णिमांत पंचांग के अनुसार हैं।'],
    note: 'समय भारतीय मानक समय (IST) में, खगोलीय गणना से (कुछ मिनट का अंतर संभव)। आपके शहर और परंपरा (स्मार्त/वैष्णव) के हिसाब से व्रत की तारीख़ एक दिन अलग हो सकती है — अपने स्थानीय पंचांग या पंडित जी से ज़रूर मिलाएँ।',
    others: 'ये भी देखें', faqH: 'अक्सर पूछे जाने वाले सवाल',
  },
  hinglish: {
    purnima: { nav: 'Purnima', title: (y) => `Purnima ${y} Kab Hai — Sabhi Purnima ki Tareekh, Tithi Time aur Vrat | NextGrade`, desc: (y, n) => `Purnima ${y} ki poori list: agli purnima ${n}. Har purnima ka naam (Paush, Magh, Sharad…), tithi shuru aur khatam hone ka samay aur vrat/snaan ki tareekh.`, h1: (y) => `🌕 Purnima ${y} — sabhi tareekhein aur samay`, lead: 'Har mahine ki purnima ki tithi kab shuru hogi, kab khatam hogi aur vrat kis din rakhein — ek jagah.' },
    amavasya: { nav: 'Amavasya', title: (y) => `Amavasya ${y} Kab Hai — Sabhi Amavasya ki Tareekh aur Tithi Time | NextGrade`, desc: (y, n) => `Amavasya ${y} ki poori list: agli amavasya ${n}. Har amavasya ka naam, tithi shuru aur khatam hone ka samay, snaan-daan aur pitru tarpan ka din.`, h1: (y) => `🌑 Amavasya ${y} — sabhi tareekhein aur samay`, lead: 'Har mahine ki amavasya ki tithi kab shuru aur khatam hogi, aur snaan-daan kis din — ek jagah.' },
    ekadashi: { nav: 'Ekadashi', title: (y) => `Ekadashi ${y} Kab Hai — Sabhi Ekadashi Vrat ki Tareekh, Naam aur Time | NextGrade`, desc: (y, n) => `Ekadashi ${y} ki poori list: agli ekadashi ${n}. Har ekadashi ka naam (Mokshada, Saphala, Shattila…), tithi ka samay aur vrat ki tareekh.`, h1: (y) => `🙏 Ekadashi ${y} — sabhi vrat ki tareekhein`, lead: 'Saal ki sabhi 24 ekadashi — naam, tithi shuru/khatam hone ka samay aur vrat ka din.' },
    cols: ['Naam', 'Vrat/tareekh', 'Tithi shuru', 'Tithi khatam'], next: 'Agli', adhik: 'Adhik', shukla: 'Shukla', krishna: 'Krishna', pur: 'Purnima', ama: 'Amavasya', eka: 'Ekadashi',
    howH: 'Tareekh kaise tay hoti hai', how: ['Tithi chandrama aur suraj ki doori se banti hai — har 12° par ek tithi. Isliye tithi din ke beech mein bhi shuru ya khatam ho sakti hai.', 'Vrat ki tareekh aam taur par woh din hai jis din suryoday ke samay woh tithi chal rahi ho (udaya tithi). Yahan New Delhi ke suryoday se nikaali gayi hai.', 'Mahinon ke naam North India ke purnimant panchang ke anusaar hain.'],
    note: 'Samay IST mein, khagoliya ganana se (kuch minute ka antar sambhav). Aapke sheher aur parampara (Smarta/Vaishnav) ke hisaab se vrat ki tareekh ek din alag ho sakti hai — apne sthaniya panchang ya pandit ji se zaroor milaayein.',
    others: 'Yeh bhi dekhein', faqH: 'Aksar poochhe jaane wale sawaal',
  },
  en: {
    purnima: { nav: 'Purnima', title: (y) => `Purnima ${y} Dates — Full Moon Days, Tithi Timings and Vrat | NextGrade`, desc: (y, n) => `All Purnima dates of ${y}: the next Purnima is ${n}. The name of every Purnima (Paush, Magh, Sharad…), tithi start and end times and the vrat/snan date.`, h1: (y) => `🌕 Purnima ${y} — all dates and timings`, lead: 'When each month’s Purnima tithi begins and ends, and which day to keep the vrat — in one place.' },
    amavasya: { nav: 'Amavasya', title: (y) => `Amavasya ${y} Dates — New Moon Days and Tithi Timings | NextGrade`, desc: (y, n) => `All Amavasya dates of ${y}: the next Amavasya is ${n}. The name of every Amavasya, tithi start and end times, and the day for snan-daan and pitru tarpan.`, h1: (y) => `🌑 Amavasya ${y} — all dates and timings`, lead: 'When each month’s Amavasya tithi begins and ends, and the day for snan-daan — in one place.' },
    ekadashi: { nav: 'Ekadashi', title: (y) => `Ekadashi ${y} Dates — All Ekadashi Vrat Days, Names and Timings | NextGrade`, desc: (y, n) => `All Ekadashi dates of ${y}: the next Ekadashi is ${n}. The name of every Ekadashi (Mokshada, Saphala, Shattila…), tithi timings and the vrat date.`, h1: (y) => `🙏 Ekadashi ${y} — all vrat dates`, lead: 'All 24 Ekadashis of the year — names, tithi start/end times and the vrat day.' },
    cols: ['Name', 'Vrat / date', 'Tithi begins', 'Tithi ends'], next: 'Next', adhik: 'Adhik', shukla: 'Shukla', krishna: 'Krishna', pur: 'Purnima', ama: 'Amavasya', eka: 'Ekadashi',
    howH: 'How the date is decided', how: ['A tithi is set by the angle between the Moon and the Sun — one tithi every 12°. So a tithi can begin or end in the middle of a day.', 'The vrat date is usually the day on which the tithi is running at sunrise (udaya tithi). Here it is worked out for sunrise in New Delhi.', 'Month names follow the North Indian purnimanta calendar.'],
    note: 'Times are in IST, from astronomical calculation (may differ by a few minutes). Depending on your city and tradition (Smarta/Vaishnava) the vrat date can differ by a day — please check your local panchang or priest.',
    others: 'See also', faqH: 'Frequently asked questions',
  },
  bn: {
    purnima: { nav: 'পূর্ণিমা', title: (y) => `পূর্ণিমা ${y} কবে — সব পূর্ণিমার তারিখ, তিথির সময় আর ব্রত | NextGrade`, desc: (y, n) => `${y}-এর সব পূর্ণিমা: পরের পূর্ণিমা ${n}। প্রতিটি পূর্ণিমার নাম, তিথি শুরু ও শেষের সময় আর ব্রত/স্নানের তারিখ।`, h1: (y) => `🌕 পূর্ণিমা ${y} — সব তারিখ আর সময়`, lead: 'প্রতি মাসের পূর্ণিমা তিথি কখন শুরু, কখন শেষ আর ব্রত কোন দিন — এক জায়গায়।' },
    amavasya: { nav: 'অমাবস্যা', title: (y) => `অমাবস্যা ${y} কবে — সব অমাবস্যার তারিখ আর তিথির সময় | NextGrade`, desc: (y, n) => `${y}-এর সব অমাবস্যা: পরের অমাবস্যা ${n}। প্রতিটির নাম, তিথি শুরু ও শেষের সময়, স্নান-দান আর তর্পণের দিন।`, h1: (y) => `🌑 অমাবস্যা ${y} — সব তারিখ আর সময়`, lead: 'প্রতি মাসের অমাবস্যা তিথি কখন শুরু আর শেষ, স্নান-দান কোন দিন — এক জায়গায়।' },
    ekadashi: { nav: 'একাদশী', title: (y) => `একাদশী ${y} কবে — সব একাদশী ব্রতের তারিখ, নাম আর সময় | NextGrade`, desc: (y, n) => `${y}-এর সব একাদশী: পরের একাদশী ${n}। প্রতিটি একাদশীর নাম (মোক্ষদা, সফলা, ষটতিলা…), তিথির সময় আর ব্রতের তারিখ।`, h1: (y) => `🙏 একাদশী ${y} — সব ব্রতের তারিখ`, lead: 'বছরের ২৪টি একাদশী — নাম, তিথি শুরু/শেষের সময় আর ব্রতের দিন।' },
    cols: ['নাম', 'ব্রত/তারিখ', 'তিথি শুরু', 'তিথি শেষ'], next: 'পরের', adhik: 'অধিক', shukla: 'শুক্ল', krishna: 'কৃষ্ণ', pur: 'পূর্ণিমা', ama: 'অমাবস্যা', eka: 'একাদশী',
    howH: 'তারিখ কীভাবে ঠিক হয়', how: ['তিথি ঠিক হয় চাঁদ আর সূর্যের কৌণিক দূরত্বে — প্রতি ১২°-এ একটি তিথি। তাই তিথি দিনের মাঝেও শুরু বা শেষ হতে পারে।', 'ব্রতের তারিখ সাধারণত সেই দিন, যেদিন সূর্যোদয়ের সময় তিথিটি চলছে (উদয় তিথি)। এখানে নয়াদিল্লির সূর্যোদয় ধরে হিসাব।', 'মাসের নাম উত্তর ভারতের পূর্ণিমান্ত পঞ্জিকা অনুযায়ী।'],
    note: 'সময় ভারতীয় সময়ে (IST), জ্যোতির্বিজ্ঞানের হিসেবে (কয়েক মিনিট তফাত সম্ভব)। আপনার শহর আর প্রথা অনুযায়ী ব্রতের তারিখ এক দিন আলাদা হতে পারে — স্থানীয় পঞ্জিকা বা পুরোহিতের সঙ্গে মিলিয়ে নিন।',
    others: 'আরও দেখুন', faqH: 'প্রায়ই জিজ্ঞেস করা প্রশ্ন',
  },
};
const LOC = { hi: 'hi-IN', bn: 'bn-IN', en: 'en-IN', hinglish: 'en-IN' };

export function buildTithi(L, { page, write, P, esc, T, breadcrumbLd }) {
  const code = L.code, X = T3[code], mcode = code === 'bn' ? 'bn' : code === 'hi' ? 'hi' : 'en';
  const now = Date.now(), all = events(now - 2 * 864e5, 400).filter((e) => e.end > now - 864e5);
  const dfmt = (ymd) => new Intl.DateTimeFormat(LOC[code], { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
  const tfmt = (ms) => new Intl.DateTimeFormat(LOC[code], { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date(ms));
  const name = (e) => {
    const mon = MONTHS[mcode][e.pmonth] + (e.adhik ? ` (${X.adhik})` : '');
    if (e.kind === 'ekadashi') return `${EKADASHI[mcode][e.month][e.paksha === 's' ? 0 : 1]} ${X.eka} · ${mon} ${e.paksha === 's' ? X.shukla : X.krishna}`;
    return `${mon} ${e.kind === 'purnima' ? X.pur : X.ama}`;
  };
  const css = '<style>.tt{width:100%;border-collapse:collapse}.tt td,.tt th{padding:8px 6px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line);font-size:15px}.tt tr.nx{background:var(--soft);font-weight:700}.tt small{color:var(--muted)}</style>';
  for (const kind of ['purnima', 'amavasya', 'ekadashi']) {
    const K = X[kind], path = `/${kind}/`, list = all.filter((e) => e.kind === kind), nx = list.find((e) => e.end > now) || list[0];
    const cnt = {}; list.forEach((e) => { const yy = e.udaya.slice(0, 4); cnt[yy] = (cnt[yy] || 0) + 1; }); const y = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0] || ''; // the year most dates fall in (searches say "purnima 2027")
    const nextTxt = nx ? `${dfmt(nx.udaya)} (${name(nx)})` : '';
    const faq = [[`${K.nav} ${y} ${{ hi: 'कब है?', hinglish: 'kab hai?', en: 'date?', bn: 'কবে?' }[code]}`, nextTxt], [{ hi: 'तिथि का समय अलग-अलग जगह क्यों दिखता है?', hinglish: 'Tithi ka samay alag-alag jagah kyon dikhta hai?', en: 'Why do tithi timings differ between sources?', bn: 'তিথির সময় বিভিন্ন জায়গায় আলাদা কেন?' }[code], X.note]];
    write(L, path, page(L, {
      path, title: K.title(y), description: K.desc(y, nextTxt),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [K.nav, path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
      body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(K.nav)}</p>
<h1>${esc(K.h1(y))}</h1>
<p class="lead">${esc(K.lead)}</p>
${nx ? `<p class="when-box"><b>${esc(X.next)} ${esc(K.nav)}:</b> ${esc(nextTxt)}<br><small>${esc(X.cols[2])}: ${esc(tfmt(nx.start))} · ${esc(X.cols[3])}: ${esc(tfmt(nx.end))}</small></p>` : ''}
<div class="table-wrap"><table class="tt"><tr>${X.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${list.map((e) => `<tr${e === nx ? ' class="nx"' : ''}><td>${esc(name(e))}</td><td><b>${esc(dfmt(e.udaya))}</b></td><td><small>${esc(tfmt(e.start))}</small></td><td><small>${esc(tfmt(e.end))}</small></td></tr>`).join('')}</table></div>
<p class="note">${esc(X.note)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.howH)}</h2><ul>${X.how.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(X.faqH)}</h2>${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<h2>${esc(X.others)}</h2><p class="chips">${['purnima', 'amavasya', 'ekadashi'].filter((k) => k !== kind).map((k) => `<a class="tag" href="${P(L, `/${k}/`)}">${esc(X[k].nav)}</a>`).join(' ')} <a class="tag" href="${P(L, '/calendar/2027/')}">📅 Calendar 2027</a> <a class="tag" href="${P(L, '/festivals/')}">🪔 ${esc(T.nav.festivals)}</a></p>
</div>`,
    }));
  }
}
