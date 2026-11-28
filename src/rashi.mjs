/**
 * Naam se rashi (28 Nov 2026, plan §T2): /naam-se-rashi/ in hi, en, bn. Tradition-based name-letter chart: each rashi
 * has 9 starting syllables (the 108 nakshatra-pada aksharas used in Hindu naming). Exact rashi needs birth date/time;
 * the page says so and makes no predictions. A tool finds the rashi from a name typed in Hindi or English; each rashi
 * lists example names from our own baby-name list (src/naam.mjs + src/naam-more.mjs).
 */
import { babyNames } from './naam.mjs';
import { NAAM_EXTRA } from './naam-more.mjs';

// [slug, hi, en, bn, symbol, aksharas]
const R = [
  ['mesh', 'मेष', 'Aries (Mesh)', 'মেষ', '♈', 'चू चे चो ला ली लू ले लो अ'],
  ['vrishabh', 'वृषभ', 'Taurus (Vrishabh)', 'বৃষ', '♉', 'ई ऊ ए ओ वा वी वू वे वो'],
  ['mithun', 'मिथुन', 'Gemini (Mithun)', 'মিথুন', '♊', 'का की कू घ ङ छ के को ह'],
  ['kark', 'कर्क', 'Cancer (Kark)', 'কর্কট', '♋', 'ही हू हे हो डा डी डू डे डो'],
  ['simha', 'सिंह', 'Leo (Simha)', 'সিংহ', '♌', 'मा मी मू मे मो टा टी टू टे'],
  ['kanya', 'कन्या', 'Virgo (Kanya)', 'কন্যা', '♍', 'टो पा पी पू ष ण ठ पे पो'],
  ['tula', 'तुला', 'Libra (Tula)', 'তুলা', '♎', 'रा री रू रे रो ता ती तू ते'],
  ['vrishchik', 'वृश्चिक', 'Scorpio (Vrishchik)', 'বৃশ্চিক', '♏', 'तो ना नी नू ने नो या यी यू'],
  ['dhanu', 'धनु', 'Sagittarius (Dhanu)', 'ধনু', '♐', 'ये यो भा भी भू धा फा ढा भे'],
  ['makar', 'मकर', 'Capricorn (Makar)', 'মকর', '♑', 'भो जा जी खी खू खे खो गा गी'],
  ['kumbh', 'कुंभ', 'Aquarius (Kumbh)', 'কুম্ভ', '♒', 'गू गे गो सा सी सू से सो दा'],
  ['meen', 'मीन', 'Pisces (Meen)', 'মীন', '♓', 'दी दू थ झ ञ दे दो चा ची'],
];
// First consonant/vowel → rashi when the exact syllable is not in the chart (short vowels, conjuncts, श, ब …).
const FALLBACK = { 'अ': 'mesh', 'आ': 'mesh', 'ल': 'mesh', 'इ': 'vrishabh', 'ई': 'vrishabh', 'उ': 'vrishabh', 'ऊ': 'vrishabh', 'ए': 'vrishabh', 'ऐ': 'vrishabh', 'ओ': 'vrishabh', 'औ': 'vrishabh', 'व': 'vrishabh', 'ब': 'vrishabh', 'क': 'mithun', 'छ': 'mithun', 'घ': 'mithun', 'ह': 'kark', 'ड': 'kark', 'म': 'simha', 'ट': 'simha', 'प': 'kanya', 'ठ': 'kanya', 'ण': 'kanya', 'ष': 'kanya', 'र': 'tula', 'त': 'tula', 'न': 'vrishchik', 'य': 'vrishchik', 'भ': 'dhanu', 'ध': 'dhanu', 'फ': 'dhanu', 'ढ': 'dhanu', 'ज': 'makar', 'ख': 'makar', 'ग': 'kumbh', 'स': 'kumbh', 'श': 'kumbh', 'द': 'meen', 'थ': 'meen', 'झ': 'meen', 'च': 'meen' };

const MATRA = /[ा-ौ]/;
const firstAkshar = (n) => { const c = n[0]; const m = n[1] && MATRA.test(n[1]) ? n[1] : ''; return c + m; };
const AK = {}; R.forEach(([slug, , , , , a]) => a.split(' ').forEach((x) => { AK[x] = slug; }));
const rashiOf = (n) => AK[firstAkshar(n)] || FALLBACK[n[0]] || null;
const ALL = [...babyNames, ...NAAM_EXTRA];
const EX = Object.fromEntries(R.map(([slug]) => [slug, { b: [], g: [] }]));
ALL.forEach((x) => { const r = rashiOf(x.n); if (r && EX[r][x.g].length < 6) EX[r][x.g].push(x); });
const toBn = (s) => s.replace(/[ऀ-ॿ]/g, (ch) => { const c = ch.charCodeAt(0); return c === 0x0935 ? 'ব' : String.fromCharCode(c + 0x80); });

const U = {
  hi: { t: 'नाम से राशि जानें — नाम के पहले अक्षर से राशि (अक्षर चार्ट) | NextGrade', d: 'अपना या बच्चे का नाम हिंदी या अंग्रेज़ी में लिखें और पहले अक्षर से राशि जानें। 12 राशियों का पूरा नाम-अक्षर चार्ट (चू चे चो ला…), हर राशि के लड़के-लड़कियों के नाम, और FAQ।', h1: '♈ नाम से राशि जानें', lead: 'नाम हिंदी या अंग्रेज़ी में लिखें — नाम के पहले अक्षर से परंपरागत राशि बताई जाएगी। नीचे पूरा अक्षर चार्ट और हर राशि के नाम भी हैं।',
    ph: 'नाम लिखें, जैसे: राहुल या Rahul', btn: 'राशि देखें', res: (a, r) => `पहला अक्षर "${a}" → ${r} राशि`, none: 'इस नाम का अक्षर चार्ट में नहीं मिला — हिंदी में लिखकर देखें।', chartH: '12 राशियों का नाम-अक्षर चार्ट', th: ['राशि', 'नाम के पहले अक्षर', 'लड़कों के नाम', 'लड़कियों के नाम'],
    about: ['भारतीय परंपरा में बच्चे का नाम अक्सर उसके जन्म-नक्षत्र के अक्षर से रखा जाता है। 27 नक्षत्रों के 4-4 चरण होते हैं, और हर चरण का एक अक्षर तय है — कुल 108 अक्षर, जो 12 राशियों में 9-9 बँटते हैं। इसी चार्ट को उल्टा पढ़कर लोग नाम के पहले अक्षर से "नाम राशि" निकालते हैं।', 'ध्यान रखें: नाम राशि और जन्म राशि अलग हो सकती हैं। सही जन्म राशि जन्म की तारीख़, समय और स्थान से चंद्रमा की स्थिति देखकर पंचांग या ज्योतिषी बताते हैं। यह पेज सिर्फ़ परंपरागत नाम-अक्षर चार्ट दिखाता है — कोई भविष्यवाणी या राशिफल नहीं।', 'चार्ट में जो अक्षर सीधे नहीं मिलते (जैसे श, ब, या छोटी मात्रा वाले अक्षर), उनके लिए आम तौर पर माना जाने वाला पास का अक्षर लिया गया है — जैसे "श" को कुंभ और "ब" को वृषभ में। अलग-अलग पंचांगों में कुछ अक्षर अलग राशि में भी लिखे मिलते हैं।'],
    faqH: 'अक्सर पूछे जाने वाले सवाल', faq: [['नाम से राशि कैसे पता करें?', 'नाम का पहला अक्षर देखें और चार्ट में ढूँढें — जैसे "रा" तुला में, "मो" सिंह में, "अ" मेष में।'], ['क्या नाम राशि और जन्म राशि एक ही है?', 'ज़रूरी नहीं। जन्म राशि जन्म के समय चंद्रमा की राशि होती है; नाम राशि सिर्फ़ नाम के पहले अक्षर से निकाली जाती है।'], ['A से नाम की राशि क्या है?', '"अ" से शुरू होने वाले नाम परंपरा में मेष राशि के माने जाते हैं; "आ" के लिए भी आम तौर पर मेष ही लिया जाता है।'], ['S या श से नाम की राशि?', '"सा, सी, सू, से, सो" कुंभ में हैं; "श" भी आम तौर पर कुंभ माना जाता है।'], ['क्या यहाँ राशिफल मिलेगा?', 'नहीं, यह पेज सिर्फ़ नाम-अक्षर चार्ट बताता है।']],
    naam: 'बच्चों के नाम (अर्थ सहित)', name: (r) => r[1] },
  en: { t: 'Find Rashi by Name — Rashi from the First Letter of a Name (Chart) | NextGrade', d: 'Type a name in English or Hindi and find its rashi (moon sign) from the first syllable. Full 12-rashi name-letter chart (Chu Che Cho La…), boy and girl names for every rashi, and FAQ.', h1: '♈ Find rashi by name', lead: 'Type a name in English or Hindi — the traditional rashi of its first syllable is shown. The full letter chart and names for each rashi are below.',
    ph: 'Type a name, e.g. Rahul or राहुल', btn: 'Find rashi', res: (a, r) => `First syllable "${a}" → ${r}`, none: 'This syllable is not in the chart — try typing the name in Hindi.', chartH: 'Name-letter chart of the 12 rashis', th: ['Rashi', 'First syllables', 'Boy names', 'Girl names'],
    about: ['In Indian tradition a child is often named with the syllable of the birth nakshatra. Each of the 27 nakshatras has 4 quarters (padas), and each quarter has a fixed syllable — 108 syllables, 9 for each of the 12 rashis. Reading this chart backwards gives the “name rashi” from the first syllable of a name.', 'Note: the name rashi and the birth rashi can differ. The real birth rashi is the sign of the Moon at the date, time and place of birth, worked out from a panchang or by an astrologer. This page only shows the traditional name-letter chart — no predictions or horoscopes.', 'Syllables not directly in the chart (such as Sha, Ba, or short-vowel forms) are matched to the commonly used nearest letter — for example “Sha” to Kumbh and “Ba” to Vrishabh. Some panchangs place a few letters in a different rashi.'],
    faqH: 'Frequently asked questions', faq: [['How do I find rashi from a name?', 'Take the first syllable of the name and find it in the chart — “Ra” is Tula, “Mo” is Simha, “A” is Mesh.'], ['Is name rashi the same as birth rashi?', 'Not always. Birth rashi is the Moon’s sign at birth; name rashi comes only from the first syllable of the name.'], ['What is the rashi of names starting with A?', 'Names starting with “A” are traditionally taken as Mesh (Aries).'], ['What is the rashi for S or Sh names?', '“Sa, Si, Su, Se, So” are in Kumbh; “Sha” is also usually taken as Kumbh.'], ['Do you give horoscopes?', 'No, this page only gives the name-letter chart.']],
    naam: 'Baby names with meaning', name: (r) => r[2] },
  bn: { t: 'নাম থেকে রাশি — নামের প্রথম অক্ষর দিয়ে রাশি (অক্ষর তালিকা) | NextGrade', d: 'নিজের বা শিশুর নাম বাংলা/হিন্দি বা ইংরেজিতে লিখে প্রথম অক্ষর থেকে রাশি জানুন। ১২ রাশির নাম-অক্ষর তালিকা, প্রতি রাশির ছেলে-মেয়ের নাম আর প্রশ্নোত্তর।', h1: '♈ নাম থেকে রাশি', lead: 'নাম হিন্দি বা ইংরেজিতে লিখুন — নামের প্রথম অক্ষরের প্রথাগত রাশি দেখানো হবে। নিচে পুরো অক্ষর তালিকা আর প্রতি রাশির নাম আছে।',
    ph: 'নাম লিখুন, যেমন: Rahul', btn: 'রাশি দেখুন', res: (a, r) => `প্রথম অক্ষর "${a}" → ${r} রাশি`, none: 'এই অক্ষর তালিকায় পাওয়া গেল না — হিন্দিতে লিখে দেখুন।', chartH: '১২ রাশির নাম-অক্ষর তালিকা', th: ['রাশি', 'নামের প্রথম অক্ষর', 'ছেলেদের নাম', 'মেয়েদের নাম'],
    about: ['ভারতীয় প্রথায় শিশুর নাম প্রায়ই জন্ম-নক্ষত্রের অক্ষর দিয়ে রাখা হয়। ২৭টি নক্ষত্রের প্রতিটির ৪টি পাদ, আর প্রতি পাদের একটি নির্দিষ্ট অক্ষর — মোট ১০৮টি অক্ষর, ১২ রাশিতে ৯টি করে। এই তালিকা উল্টো পড়ে নামের প্রথম অক্ষর থেকে "নাম রাশি" বের করা হয়।', 'মনে রাখবেন: নাম রাশি আর জন্ম রাশি আলাদা হতে পারে। আসল জন্ম রাশি জন্মের তারিখ, সময় আর স্থানে চাঁদের অবস্থান দেখে পঞ্জিকা বা জ্যোতিষী বলেন। এই পাতা শুধু প্রথাগত নাম-অক্ষর তালিকা দেখায় — কোনো ভবিষ্যদ্বাণী বা রাশিফল নয়।', 'যে অক্ষর তালিকায় সরাসরি নেই (যেমন শ, ব বা ছোট স্বরের রূপ), সেগুলো সাধারণভাবে মানা কাছের অক্ষরে ধরা হয়েছে — যেমন "শ" কুম্ভে, "ব" বৃষে। কিছু পঞ্জিকায় কয়েকটি অক্ষর অন্য রাশিতেও লেখা থাকে।'],
    faqH: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন', faq: [['নাম থেকে রাশি কীভাবে জানব?', 'নামের প্রথম অক্ষর দেখে তালিকায় খুঁজুন — যেমন "রা" তুলায়, "মো" সিংহে, "অ" মেষে।'], ['নাম রাশি আর জন্ম রাশি কি এক?', 'সবসময় নয়। জন্ম রাশি জন্মের সময় চাঁদের রাশি; নাম রাশি শুধু নামের প্রথম অক্ষর থেকে।'], ['অ দিয়ে নামের রাশি কী?', '"অ" দিয়ে শুরু নাম প্রথায় মেষ রাশির ধরা হয়।'], ['স বা শ দিয়ে নামের রাশি?', '"সা, সী, সূ, সে, সো" কুম্ভে; "শ"-ও সাধারণত কুম্ভ ধরা হয়।'], ['এখানে রাশিফল পাওয়া যাবে?', 'না, এই পাতা শুধু নাম-অক্ষর তালিকা দেখায়।']],
    naam: 'অর্থসহ শিশুর নাম', name: (r) => r[3] },
};

const CSS = '<style>.rs-box{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.rs-box input{flex:1;min-width:200px;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--text)}.rs-out{font-size:1.2rem;font-weight:700;min-height:1.6em;margin:6px 0 14px}.rs-t td,.rs-t th{vertical-align:top}.rs-t td:first-child{white-space:nowrap;font-weight:700}</style>';

export function buildRashi(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, X = U[code]; if (!X) return;
  const langs = LANGS.filter((l) => U[l.code]), path = '/naam-se-rashi/';
  const ak = (s) => (code === 'bn' ? toBn(s) : s);
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: X.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const rows = R.map((r) => `<tr id="${r[0]}"><td>${r[4]} ${esc(X.name(r))}</td><td>${esc(ak(r[5]).split(' ').join(', '))}</td><td>${esc(EX[r[0]].b.map((x) => x.r).join(', '))}</td><td>${esc(EX[r[0]].g.map((x) => x.r).join(', '))}</td></tr>`).join('');
  const names = Object.fromEntries(R.map((r) => [r[0], `${r[4]} ${X.name(r)}`]));
  // Roman → first Devanagari syllable (rough, enough for the chart: consonant + long vowel sign)
  const js = `<script>(function(){var AK=${JSON.stringify(AK)},FB=${JSON.stringify(FALLBACK)},NM=${JSON.stringify(names)},RES=${JSON.stringify(X.res('@A', '@R'))},NONE=${JSON.stringify(X.none)},BN=${code === 'bn'};
var C=[['chh','छ'],['ch','च'],['kh','ख'],['gh','घ'],['jh','झ'],['th','थ'],['dh','ध'],['ph','फ'],['bh','भ'],['sh','श'],['k','क'],['g','ग'],['j','ज'],['t','त'],['d','द'],['n','न'],['p','प'],['f','फ'],['b','ब'],['m','म'],['y','य'],['r','र'],['l','ल'],['v','व'],['w','व'],['s','स'],['h','ह'],['z','ज'],['q','क'],['x','क']];
var V=[['aa','ा'],['ai','े'],['au','ो'],['ee','ी'],['oo','ू'],['a','ा'],['i','ी'],['u','ू'],['e','े'],['o','ो']],IV={'ा':'अ','ी':'ई','ू':'ऊ','े':'ए','ो':'ओ'};
function rom(s){s=s.toLowerCase().replace(/[^a-z]/g,'');var c='',i=0,k;for(k=0;k<C.length;k++)if(s.indexOf(C[k][0])===0){c=C[k][1];i=C[k][0].length;break;}var v='';for(k=0;k<V.length;k++)if(s.indexOf(V[k][0],i)===i){v=V[k][1];break;}if(!c)return v?IV[v]:'';return c+v;}
function deva(s){var m=s.match(/[\\u0900-\\u097F]+/);if(!m)return '';var w=m[0],a=w[0];if(w[1]&&/[\\u093E-\\u094C]/.test(w[1]))a+=w[1];return a;}
function find(){var s=document.getElementById('rs-in').value.trim(),a=deva(s)||rom(s),r=a&&(AK[a]||FB[a[0]]),o=document.getElementById('rs-out');if(!a||!r){o.textContent=s?NONE:'';return;}var shown=BN?a.replace(/[\\u0900-\\u097F]/g,function(ch){var c=ch.charCodeAt(0);return c===0x0935?'ব':String.fromCharCode(c+0x80);}):a;o.textContent=RES.replace('@A',shown).replace('@R',NM[r]);var row=document.getElementById(r);if(row){[].forEach.call(document.querySelectorAll('.rs-t tr'),function(t){t.style.background='';});row.style.background='var(--soft)';}}
document.getElementById('rs-btn').onclick=find;document.getElementById('rs-in').addEventListener('keydown',function(e){if(e.key==='Enter')find();});})();</script>`;
  write(L, path, page(L, {
    path, title: X.t, description: X.d, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.h1.replace(/^\S+\s/, ''), path]]), faqLd],
    body: `${CSS}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.h1.replace(/^\S+\s/, ''))}</p><h1>${esc(X.h1)}</h1><p class="lead">${esc(X.lead)}</p>
<div class="rs-box"><input id="rs-in" type="text" placeholder="${esc(X.ph)}" autocomplete="off"><button type="button" class="btn btn-primary" id="rs-btn">${esc(X.btn)}</button></div><p class="rs-out" id="rs-out" aria-live="polite"></p>${js}
<h2>${esc(X.chartH)}</h2><div class="tblwrap"><table class="dates rs-t"><tr>${X.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${rows}</table></div>
<div class="ad" aria-hidden="true"></div>
${X.about.map((p) => `<p>${esc(p)}</p>`).join('')}
<h2>${esc(X.faqH)}</h2>${X.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<p class="chips"><a class="tag" href="${P(L, '/naam/')}">👶 ${esc(X.naam)}</a></p></div>`,
  }));
}
