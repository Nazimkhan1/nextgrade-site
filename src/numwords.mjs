/**
 * Number in words (26 Nov 2026, high-traffic plan): Indian (lakh/crore) and international English, Hindi and Bengali,
 * cheque wording. The converter source is shared: evaluated here for the static pages and written to
 * /assets/numwords.js for the live converter, so both always agree.
 */
import { HI_WORDS, BN_WORDS } from './kids-more.mjs';

export const NW_SOURCE = `(function(HI, BN){
  var O = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var T = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function en99(n) { return n < 20 ? O[n] : T[Math.floor(n / 10)] + (n % 10 ? '-' + O[n % 10] : ''); }
  function en999(n) { var h = Math.floor(n / 100), r = n % 100; return (h ? O[h] + ' Hundred' + (r ? ' ' : '') : '') + (r ? en99(r) : ''); }
  function enIndian(n) {
    if (n === 0) return 'Zero';
    var parts = [], cr = Math.floor(n / 1e7); n %= 1e7;
    if (cr) parts.push((cr > 999 ? enIndian(cr) : en999(cr)) + ' Crore');
    var l = Math.floor(n / 1e5); n %= 1e5; if (l) parts.push(en99(l) + ' Lakh');
    var t = Math.floor(n / 1e3); n %= 1e3; if (t) parts.push(en99(t) + ' Thousand');
    if (n) parts.push(en999(n));
    return parts.join(' ');
  }
  function enIntl(n) {
    if (n === 0) return 'Zero';
    var S = ['', ' Thousand', ' Million', ' Billion', ' Trillion'], parts = [], i = 0;
    while (n > 0) { var c = n % 1000; if (c) parts.unshift(en999(c) + S[i]); n = Math.floor(n / 1000); i++; }
    return parts.join(' ');
  }
  function hi99(n) { return HI[n - 1]; }
  function hi999(n) { var h = Math.floor(n / 100), r = n % 100; return (h ? hi99(h) + ' सौ' + (r ? ' ' : '') : '') + (r ? hi99(r) : ''); }
  function hiNum(n) {
    if (n === 0) return 'शून्य';
    var p = [], cr = Math.floor(n / 1e7); n %= 1e7;
    if (cr) p.push((cr > 999 ? hiNum(cr) : hi999(cr)) + ' करोड़');
    var l = Math.floor(n / 1e5); n %= 1e5; if (l) p.push(hi99(l) + ' लाख');
    var t = Math.floor(n / 1e3); n %= 1e3; if (t) p.push(hi99(t) + ' हज़ार');
    if (n) p.push(hi999(n));
    return p.join(' ');
  }
  var BH = ['', 'একশো', 'দুশো', 'তিনশো', 'চারশো', 'পাঁচশো', 'ছয়শো', 'সাতশো', 'আটশো', 'নয়শো'];
  function bn99(n) { return BN[n - 1]; }
  function bn999(n) { var h = Math.floor(n / 100), r = n % 100; return (h ? BH[h] + (r ? ' ' : '') : '') + (r ? bn99(r) : ''); }
  function bnNum(n) {
    if (n === 0) return 'শূন্য';
    var p = [], cr = Math.floor(n / 1e7); n %= 1e7;
    if (cr) p.push((cr > 999 ? bnNum(cr) : bn999(cr)) + ' কোটি');
    var l = Math.floor(n / 1e5); n %= 1e5; if (l) p.push(bn99(l) + ' লক্ষ');
    var t = Math.floor(n / 1e3); n %= 1e3; if (t) p.push(bn99(t) + ' হাজার');
    if (n) p.push(bn999(n));
    return p.join(' ');
  }
  function indianFmt(n) { var s = String(n), last = s.slice(-3), rest = s.slice(0, -3); return rest ? rest.replace(/\\B(?=(\\d{2})+(?!\\d))/g, ',') + ',' + last : last; }
  function intlFmt(n) { return String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ','); }
  function roman(n) { if (n < 1 || n > 3999) return ''; var v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], s = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'], r = ''; v.forEach(function (x, i) { while (n >= x) { r += s[i]; n -= x; } }); return r; }
  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return intlFmt(n) + (s[(v - 20) % 10] || s[v] || s[0]); }
  function isPrime(n) { if (n < 2) return false; for (var i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
  function bnDigits(x) { return String(x).replace(/\\d/g, function (d) { return '০১২৩৪৫৬৭৮৯'[d]; }); }
  function cheque(rupees, paise) { return 'Rupees ' + enIndian(rupees) + (paise ? ' and ' + en99(paise) + ' Paise' : '') + ' Only'; }
  return { enIndian: enIndian, enIntl: enIntl, hiNum: hiNum, bnNum: bnNum, indianFmt: indianFmt, intlFmt: intlFmt, roman: roman, ordinal: ordinal, isPrime: isPrime, bnDigits: bnDigits, cheque: cheque };
})`;
// eslint-disable-next-line no-new-func
export const NW = new Function(`return ${NW_SOURCE}`)()(HI_WORDS, BN_WORDS);
export const browserScript = () => `window.NW = ${NW_SOURCE}(${JSON.stringify(HI_WORDS)}, ${JSON.stringify(BN_WORDS)});\n`;

// Numbers that get their own page: 1–100 (school / "45 in hindi") + amounts people write on cheques and forms
export const NUMBERS = [...Array(100)].map((_, i) => i + 1).concat([
  101, 108, 111, 150, 200, 250, 251, 300, 365, 400, 500, 501, 600, 700, 750, 800, 900, 999, 1000, 1001, 1100, 1200, 1500, 2000, 2100, 2500, 3000, 3500, 4000, 4500, 5000, 5100, 5500, 6000, 7000, 7500, 8000, 9000, 10000, 11000, 12000, 12500, 15000, 18000, 20000, 21000, 25000, 30000, 35000, 40000, 45000, 50000, 51000, 60000, 70000, 75000, 80000, 90000,
  100000, 125000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000, 1500000, 2000000, 2500000, 5000000, 7500000, 10000000, 25000000, 50000000, 100000000, 1000000000,
]);

const TX = {
  hi: { nav: 'नंबर शब्दों में', hubTitle: 'नंबर को शब्दों में लिखें — Number to Words (हिंदी, English, লাখ-करोड़), चेक पर लिखने का तरीक़ा | NextGrade', hubDesc: 'कोई भी नंबर डालें और पाएँ शब्दों में — हिंदी, English (लाख-करोड़ और मिलियन) और বাংলা में; चेक पर रक़म कैसे लिखें। 1 से 100 और 1 लाख, 10 लाख, 1 करोड़ जैसी रक़मों के पेज।', hubH1: '🔢 नंबर को शब्दों में लिखें', hubLead: 'नंबर लिखिए — तुरंत हिंदी, English (भारतीय लाख-करोड़ और अंतरराष्ट्रीय मिलियन) और বাংলা में शब्द, चेक पर लिखने का तरीक़ा भी।', input: 'नंबर लिखें (जैसे 125000 या 2550.50)', smallH: '1 से 100 तक', bigH: 'रक़म (चेक/फ़ॉर्म के लिए)', title: (f, w, e) => `${f} शब्दों में — ${w} (${e}) | NextGrade`, desc: (f, w, e) => `${f} को शब्दों में: हिंदी में "${w}", English में "${e}"। चेक पर कैसे लिखें, अंतरराष्ट्रीय तरीक़ा, বাংলা में और रोमन अंक भी।`, h1: (f) => `${f} शब्दों में`, L: { indian: 'English (भारतीय — लाख/करोड़)', intl: 'English (अंतरराष्ट्रीय — मिलियन)', hi: 'हिंदी में', bn: 'বাংলায় (बांग्ला)', digits: 'अंकों में', bnd: 'বাংলা অঙ্কে', roman: 'रोमन अंक', ord: 'क्रमसूचक (English)', type: 'सम/विषम', prime: 'अभाज्य (prime)?' }, even: 'सम (even)', odd: 'विषम (odd)', yes: 'हाँ', no: 'नहीं', chequeH: '🧾 चेक पर कैसे लिखें', chequeP: 'शब्दों वाली लाइन में (ऊपर से शुरू करके, बीच में जगह छोड़े बिना):', chequeA: 'रक़म वाले ख़ाने में:', near: 'आसपास के नंबर', convH: 'कोई और नंबर बदलें', faq: (f, w, e) => [[`${f} को हिंदी में कैसे लिखते हैं?`, `${f} को हिंदी में "${w}" लिखते हैं।`], [`${f} in words in English?`, `भारतीय तरीक़े से "${e}"।`], [`चेक पर ${f} कैसे लिखें?`, `शब्दों में "Rupees ${e} Only" और अंकों में "₹${f}/-" लिखें।`]], faqH: 'अक्सर पूछे जाने वाले सवाल' },
  hinglish: { nav: 'Number in words', hubTitle: 'Number to Words — Hindi aur English mein (Lakh-Crore), Cheque par Kaise Likhein | NextGrade', hubDesc: 'Koi bhi number daalein aur paayein shabdon mein — Hindi, English (lakh-crore aur million) aur Bangla mein; cheque par rakam kaise likhein.', hubH1: '🔢 Number in Words — Hindi aur English', hubLead: 'Number likhiye — turant Hindi, English (Indian lakh-crore aur international million) aur Bangla mein shabd, cheque par likhne ka tarika bhi.', input: 'Number likhein (jaise 125000 ya 2550.50)', smallH: '1 se 100 tak', bigH: 'Rakam (cheque/form ke liye)', title: (f, w, e) => `${f} in Words in Hindi and English — ${w}, ${e} | NextGrade`, desc: (f, w, e) => `${f} in words: Hindi mein "${w}", English mein "${e}". Cheque par kaise likhein, international tarika, Bangla aur Roman number bhi.`, h1: (f) => `${f} in Words (Hindi + English)`, L: { indian: 'English (Indian — lakh/crore)', intl: 'English (International — million)', hi: 'Hindi mein', bn: 'Bangla mein', digits: 'Digits', bnd: 'Bangla digits', roman: 'Roman number', ord: 'Ordinal (English)', type: 'Even/Odd', prime: 'Prime?' }, even: 'Even (sam)', odd: 'Odd (visham)', yes: 'Haan', no: 'Nahi', chequeH: '🧾 Cheque par kaise likhein', chequeP: 'Shabdon wali line mein (shuru se, beech mein jagah chhode bina):', chequeA: 'Amount wale khaane mein:', near: 'Aaspaas ke number', convH: 'Koi aur number badlein', faq: (f, w, e) => [[`${f} ko Hindi mein kaise likhte hain?`, `${f} ko Hindi mein "${w}" likhte hain.`], [`${f} in words in English?`, `Indian tarike se "${e}".`], [`Cheque par ${f} kaise likhein?`, `Shabdon mein "Rupees ${e} Only" aur digits mein "₹${f}/-" likhein.`]], faqH: 'Aksar poochhe jaane wale sawaal' },
  en: { nav: 'Number in words', hubTitle: 'Number to Words Converter — Indian (Lakh, Crore) and International, Hindi, Bengali, Cheque Writing | NextGrade', hubDesc: 'Type any number and get it in words — English in the Indian lakh/crore system and the international million system, Hindi and Bengali — plus how to write it on a cheque.', hubH1: '🔢 Number to words converter', hubLead: 'Type a number — instantly see it in words in English (Indian lakh/crore and international million), Hindi and Bengali, and how to write it on a cheque.', input: 'Type a number (e.g. 125000 or 2550.50)', smallH: '1 to 100', bigH: 'Amounts (for cheques and forms)', title: (f, w, e, intl) => `${f} in Words — ${e}${intl !== e ? ` (${intl})` : ''} | in Hindi: ${w} | NextGrade`, desc: (f, w, e, intl) => `${f} in words: "${e}" in the Indian system${intl !== e ? `, "${intl}" in the international system` : ''}; in Hindi "${w}". How to write it on a cheque, Bengali, Roman numeral and more.`, h1: (f) => `${f} in words`, L: { indian: 'English (Indian — lakh/crore)', intl: 'English (International — million)', hi: 'In Hindi', bn: 'In Bengali', digits: 'In digits', bnd: 'Bengali digits', roman: 'Roman numeral', ord: 'Ordinal', type: 'Even/Odd', prime: 'Prime?' }, even: 'Even', odd: 'Odd', yes: 'Yes', no: 'No', chequeH: '🧾 How to write it on a cheque', chequeP: 'On the words line (start at the left, leave no gaps):', chequeA: 'In the amount box:', near: 'Nearby numbers', convH: 'Convert another number', faq: (f, w, e) => [[`How do you write ${f} in words?`, `"${e}" in the Indian system.`], [`How do you write ${f} in Hindi?`, `"${w}".`], [`How do I write ${f} on a cheque?`, `Write "Rupees ${e} Only" in words and "₹${f}/-" in the amount box.`]], faqH: 'Frequently asked questions' },
  bn: { nav: 'সংখ্যা কথায়', hubTitle: 'সংখ্যা কথায় লিখুন — বাংলা, হিন্দি, English (লক্ষ-কোটি), চেকে লেখার নিয়ম | NextGrade', hubDesc: 'যেকোনো সংখ্যা দিন আর কথায় পান — বাংলা, হিন্দি আর English (লক্ষ-কোটি ও মিলিয়ন); চেকে টাকার অঙ্ক কীভাবে লিখবেন।', hubH1: '🔢 সংখ্যা কথায় লিখুন', hubLead: 'সংখ্যা লিখুন — সঙ্গে সঙ্গে বাংলা, হিন্দি আর English (ভারতীয় লক্ষ-কোটি ও আন্তর্জাতিক মিলিয়ন) কথায়, চেকে লেখার নিয়মও।', input: 'সংখ্যা লিখুন (যেমন 125000 বা 2550.50)', smallH: '১ থেকে ১০০', bigH: 'টাকার অঙ্ক (চেক/ফর্মের জন্য)', title: (f, w, e, _i, b, bd) => `${bd} কথায় — ${b} | ${f} in Words: ${e} | NextGrade`, desc: (f, w, e, _i, b) => `${f} কথায়: বাংলায় "${b}", English-এ "${e}", হিন্দিতে "${w}"। চেকে কীভাবে লিখবেন, রোমান সংখ্যা আর আরও।`, h1: (f, bd) => `${bd} কথায়`, L: { indian: 'English (ভারতীয় — লক্ষ/কোটি)', intl: 'English (আন্তর্জাতিক — মিলিয়ন)', hi: 'হিন্দিতে', bn: 'বাংলায়', digits: 'অঙ্কে', bnd: 'বাংলা অঙ্কে', roman: 'রোমান সংখ্যা', ord: 'ক্রমবাচক (English)', type: 'জোড়/বিজোড়', prime: 'মৌলিক?' }, even: 'জোড়', odd: 'বিজোড়', yes: 'হ্যাঁ', no: 'না', chequeH: '🧾 চেকে কীভাবে লিখবেন', chequeP: 'কথার লাইনে (শুরু থেকে, ফাঁক না রেখে):', chequeA: 'অঙ্কের ঘরে:', near: 'কাছাকাছি সংখ্যা', convH: 'আরেকটা সংখ্যা বদলান', faq: (f, w, e, b) => [[`${f} বাংলায় কীভাবে লেখে?`, `"${b}"।`], [`${f} in words in English?`, `ভারতীয় নিয়মে "${e}"।`], [`চেকে ${f} কীভাবে লিখবেন?`, `কথায় "Rupees ${e} Only" আর অঙ্কে "₹${f}/-"।`]], faqH: 'প্রায়ই জিজ্ঞেস করা প্রশ্ন' },
};
export const NW_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, v.nav]));

export function buildNumberWords(L, { page, write, P, esc, T, breadcrumbLd }) {
  const code = L.code, X = TX[code], hub = '/number-in-words/';
  const css = '<style>.nw-t{width:100%;border-collapse:collapse}.nw-t td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}.nw-t td:first-child{color:var(--muted);font-size:14px;width:38%}.nw-t td b{font-size:17px}.nw-conv{display:flex;gap:8px;flex-wrap:wrap}.nw-conv input{flex:1 1 220px;padding:12px;border-radius:12px;border:2px solid var(--line);font:inherit;font-size:18px;background:var(--surface);color:var(--text)}.nw-out{margin-top:10px}.nw-chq{background:#f8f9fa;border:1px dashed #adb5bd;border-radius:12px;padding:12px 14px;font-family:ui-monospace,monospace;color:#212529}.nw-list a{display:inline-block;margin:3px 6px 3px 0}</style>';
  const conv = `<div class="nw-conv"><input id="nw-in" inputmode="decimal" placeholder="${esc(X.input)}" aria-label="${esc(X.input)}"></div><div id="nw-out" class="nw-out" data-l='${esc(JSON.stringify({ ...X.L, even: X.even, odd: X.odd, yes: X.yes, no: X.no }))}'></div>`;
  const table = (n) => {
    const e = NW.enIndian(n), i = NW.enIntl(n), r = NW.roman(n);
    const rows = [[X.L.digits, `${NW.indianFmt(n)} <small>(${NW.intlFmt(n)})</small>`], [X.L.indian, e], ...(i !== e ? [[X.L.intl, i]] : []), [X.L.hi, NW.hiNum(n)], [X.L.bn, NW.bnNum(n)], [X.L.bnd, NW.bnDigits(NW.indianFmt(n))], ...(r ? [[X.L.roman, r]] : []), [X.L.ord, NW.ordinal(n)], [X.L.type, n % 2 ? X.odd : X.even], ...(n <= 1e7 ? [[X.L.prime, NW.isPrime(n) ? X.yes : X.no]] : [])];
    return `<table class="nw-t">${rows.map(([a, b], k) => `<tr><td>${esc(a)}</td><td>${k === 0 ? `<b>${b}</b>` : `<b>${esc(b)}</b>`}</td></tr>`).join('')}</table>`;
  };
  const link = (n) => `<a class="tag" href="${P(L, `${hub}${n}/`)}">${code === 'bn' ? NW.bnDigits(NW.indianFmt(n)) : NW.indianFmt(n)}</a>`;
  write(L, hub, page(L, {
    path: hub, title: X.hubTitle, description: X.hubDesc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]]), { '@context': 'https://schema.org', '@type': 'WebApplication', name: X.hubH1.replace(/^\S+\s/, ''), url: `https://nextgrade.in${P(L, hub)}`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }],
    body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.hubH1)}</h1><p class="lead">${esc(X.hubLead)}</p>
${conv}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.bigH)}</h2><p class="nw-list">${NUMBERS.filter((n) => n > 100).map(link).join(' ')}</p>
<h2>${esc(X.smallH)}</h2><p class="nw-list">${NUMBERS.filter((n) => n <= 100).map(link).join(' ')}</p>
</div>`,
    scripts: ['/assets/numwords.js', '/assets/numwords-ui.js'],
  }));
  NUMBERS.forEach((n, k) => {
    const f = NW.indianFmt(n), w = NW.hiNum(n), e = NW.enIndian(n), intl = NW.enIntl(n), b = NW.bnNum(n), bd = NW.bnDigits(f), path = `${hub}${n}/`;
    const faq = X.faq(f, w, e, b);
    const near = NUMBERS.slice(Math.max(0, k - 5), k + 6).filter((x) => x !== n);
    write(L, path, page(L, {
      path, title: X.title(f, w, e, intl, b, bd), description: X.desc(f, w, e, intl, b),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [f, path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
      body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(code === 'bn' ? bd : f)}</p>
<h1>🔢 ${esc(X.h1(f, bd))}</h1>
<p class="lead"><b>${esc(code === 'bn' ? b : code === 'en' ? e : w)}</b>${code === 'en' ? '' : ` · ${esc(e)}`}</p>
${table(n)}
<h2>${esc(X.chequeH)}</h2><p>${esc(X.chequeP)}</p><p class="nw-chq">${esc(NW.cheque(n, 0))}</p><p>${esc(X.chequeA)}</p><p class="nw-chq">₹${esc(f)}/-</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.convH)}</h2>${conv}
<h2>${esc(X.near)}</h2><p class="nw-list">${near.map(link).join(' ')} <a class="tag" href="${P(L, hub)}">${esc(X.nav)} →</a>${n <= 100 ? ` <a class="tag" href="${P(L, '/kids/ginti/')}">🔢 1–100</a>` : ''}</p>
<h2>${esc(X.faqH)}</h2>${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
</div>`,
      scripts: ['/assets/numwords.js', '/assets/numwords-ui.js'],
    }));
  });
}
