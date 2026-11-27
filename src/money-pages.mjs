/**
 * Amount pages (27 Nov 2026, traffic research #3): people search exact amounts — "20 lakh home loan EMI",
 * "5000 SIP for 10 years" — and big calculator sites have one page per tool, not per amount. Each page here is
 * worked out for its own amount (tables of EMI by rate × tenure, total interest, income needed; SIP value by
 * return × years, years to ₹1 crore). Hindi + English. Estimates, not financial advice.
 *   /loan-emi/  + /loan-emi/<x>-lakh-home-loan/ and /loan-emi/<x>-lakh-personal-loan/
 *   /sip/       + /sip/<amount>-per-month/
 */
const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const emi = (p, ratePa, years) => { const r = ratePa / 1200, n = years * 12; return r ? (p * r * (1 + r) ** n) / ((1 + r) ** n - 1) : p / n; };
const sipFv = (m, ratePa, years) => { const r = ratePa / 1200, n = years * 12; return m * (((1 + r) ** n - 1) / r) * (1 + r); };

const HOME = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 75, 100].map((l) => l * 1e5);
const PERS = [1, 2, 3, 5, 7, 10].map((l) => l * 1e5);
const SIPS = [500, 1000, 2000, 3000, 5000, 7000, 10000, 15000, 20000, 25000, 50000];
const HR = [8, 8.5, 9, 9.5, 10], HT = [10, 15, 20, 25, 30];
const PR = [11, 13, 15, 18], PT = [1, 2, 3, 4, 5];
const SR = [8, 10, 12, 15], SY = [5, 10, 15, 20, 25, 30];
const lk = (v) => `${+(v / 1e5).toFixed(2)}`;
const amt = (v) => v.toLocaleString('en-IN');

const TX = {
  hi: {
    emiNav: 'लोन EMI', sipNav: 'SIP', lakh: 'लाख', yr: 'साल', mo: 'महीना',
    emiHubT: 'लोन EMI टेबल — 1 लाख से 1 करोड़ तक, हर ब्याज दर और अवधि के लिए | NextGrade', emiHubD: 'होम लोन और पर्सनल लोन की EMI हर रक़म के लिए — 5, 10, 20, 30, 50 लाख… ब्याज दर और अवधि के हिसाब से EMI, कुल ब्याज और ज़रूरी आय।', emiHubH: '🏦 कितने लोन पर कितनी EMI?', emiHubL: 'लोन की रक़म चुनें — अलग-अलग ब्याज दर और अवधि पर हर महीने की EMI, कुल ब्याज और लोन के लिए ज़रूरी आय देखें।',
    homeT: (l) => `₹${l} लाख होम लोन की EMI कितनी होगी? 10, 15, 20, 30 साल — ब्याज दर के हिसाब से टेबल | NextGrade`,
    homeD: (l, e) => `₹${l} लाख के होम लोन पर 20 साल, 8.5% ब्याज पर EMI लगभग ${e} महीना। 8% से 10% ब्याज और 10–30 साल की EMI टेबल, कुल ब्याज और कितनी सैलरी चाहिए।`,
    homeH: (l) => `₹${l} लाख होम लोन की EMI`, persT: (l) => `₹${l} लाख पर्सनल लोन की EMI — 1 से 5 साल, 11% से 18% ब्याज | NextGrade`, persD: (l, e) => `₹${l} लाख के पर्सनल लोन पर 3 साल, 13% ब्याज पर EMI लगभग ${e} महीना। हर ब्याज दर और अवधि की EMI टेबल और कुल ब्याज।`, persH: (l) => `₹${l} लाख पर्सनल लोन की EMI`,
    ans: (l, e, r, t, ti) => `₹${l} लाख के लोन पर ${r}% सालाना ब्याज और ${t} साल की अवधि में EMI लगभग ${e} महीना होगी। पूरे लोन में कुल ब्याज ${ti} बनेगा।`,
    tblH: 'ब्याज दर और अवधि के हिसाब से EMI (₹ महीना)', rate: 'ब्याज दर', totH: 'कुल ब्याज कितना देना होगा', totP: (r) => `${r}% ब्याज पर अलग-अलग अवधि में कुल ब्याज और कुल भुगतान:`, tenure: 'अवधि', interest: 'कुल ब्याज', paid: 'कुल भुगतान',
    incH: 'कितनी सैलरी पर यह लोन मिलेगा', incP: (e, inc) => `बैंक आम तौर पर चाहते हैं कि सारी EMI मिलाकर आपकी महीने की कमाई के लगभग 50% से ज़्यादा न हों। इस हिसाब से ${e} की EMI के लिए कम से कम लगभग ${inc} महीने की नेट आय चाहिए (दूसरी EMI न हों तो)।`,
    tipsH: 'EMI कम करने के तरीक़े', tips: ['ब्याज दर में 0.5% का फ़र्क़ भी लंबे लोन में लाखों रुपये बदल देता है — 2–3 बैंकों के ऑफ़र मिलाएँ और अच्छा CIBIL स्कोर (750+) रखें।', 'साल में एक बार कुछ प्रीपेमेंट करें — होम लोन (फ़्लोटिंग रेट) पर ज़्यादातर बैंक प्रीपेमेंट चार्ज नहीं लेते।', 'लंबी अवधि से EMI घटती है पर कुल ब्याज बहुत बढ़ता है — जितनी EMI आराम से दे सकें, उतनी छोटी अवधि चुनें।'],
    calc: '🧮 अपनी रक़म, दर और अवधि डालकर EMI निकालें →', near: 'दूसरी रक़म', note: 'अनुमान: असली EMI बैंक की दर, प्रोसेसिंग फ़ीस और बीमा पर निर्भर करती है।',
    sipHubT: 'SIP से कितना पैसा बनेगा? ₹500 से ₹50,000 महीना — 5 से 30 साल की टेबल | NextGrade', sipHubD: 'हर महीने ₹500, ₹1,000, ₹5,000, ₹10,000… की SIP से 5, 10, 15, 20, 30 साल में कितना पैसा बन सकता है — 8% से 15% रिटर्न की टेबल।', sipHubH: '📈 कितनी SIP से कितना पैसा?', sipHubL: 'हर महीने की SIP रक़म चुनें — अलग-अलग रिटर्न और सालों में कितना पैसा बन सकता है, देखें।',
    sipT: (a) => `₹${a} महीने की SIP से कितना पैसा बनेगा? 5, 10, 15, 20, 30 साल की टेबल | NextGrade`, sipD: (a, v) => `हर महीने ₹${a} की SIP से 12% सालाना रिटर्न पर 20 साल में लगभग ${v} बन सकता है। 8–15% रिटर्न और 5–30 साल की पूरी टेबल, निवेश और फ़ायदा।`, sipH: (a) => `₹${a} महीने की SIP से कितना पैसा बनेगा`,
    sipAns: (a, v, inv) => `हर महीने ₹${a} की SIP 20 साल तक करें और औसत 12% सालाना रिटर्न मिले, तो लगभग ${v} बन सकता है — जबकि आपका कुल निवेश सिर्फ़ ${inv} होगा।`,
    sipTbl: 'रिटर्न और सालों के हिसाब से कुल रक़म', ret: 'सालाना रिटर्न', invH: 'आपका निवेश बनाम फ़ायदा (12% रिटर्न)', inv: 'कुल निवेश', gain: 'फ़ायदा', value: 'कुल रक़म',
    crH: '₹1 करोड़ कब बनेगा?', cr: (y) => y ? `12% सालाना रिटर्न पर इस SIP से ₹1 करोड़ लगभग ${y} साल में बन सकता है।` : '12% रिटर्न पर इस SIP से 40 साल में भी ₹1 करोड़ नहीं बनता — रक़म बढ़ाएँ या स्टेप-अप SIP करें।',
    sipTips: ['म्यूचुअल फ़ंड में रिटर्न पक्का नहीं होता — 12% सिर्फ़ उदाहरण है; इक्विटी फ़ंड में लंबे समय में ऐसा रिटर्न कई बार मिला है, पर नुक़सान भी हो सकता है।', 'हर साल SIP 10% बढ़ाएँ (स्टेप-अप) — इससे आख़िरी रक़म काफ़ी बढ़ जाती है।', 'बाज़ार गिरने पर SIP बंद न करें — सस्ते में ज़्यादा यूनिट मिलती हैं।'],
    sipCalc: '🧮 SIP कैलकुलेटर में अपनी रक़म डालें →', sipNote: 'अनुमान, निवेश सलाह नहीं। म्यूचुअल फ़ंड निवेश बाज़ार जोखिम के अधीन है।',
  },
  en: {
    emiNav: 'Loan EMI', sipNav: 'SIP', lakh: 'lakh', yr: 'years', mo: 'month',
    emiHubT: 'Loan EMI Tables — ₹1 Lakh to ₹1 Crore, Every Rate and Tenure | NextGrade', emiHubD: 'Home loan and personal loan EMI for every amount — 5, 10, 20, 30, 50 lakh… EMI by interest rate and tenure, total interest and the income you need.', emiHubH: '🏦 What is the EMI on my loan?', emiHubL: 'Pick a loan amount to see the monthly EMI at different rates and tenures, the total interest and the income needed.',
    homeT: (l) => `EMI on ₹${l} Lakh Home Loan — 10, 15, 20, 30 Years, Rate-wise Table | NextGrade`,
    homeD: (l, e) => `EMI on a ₹${l} lakh home loan for 20 years at 8.5% is about ${e} a month. EMI table for 8–10% and 10–30 years, total interest and the salary you need.`,
    homeH: (l) => `EMI on a ₹${l} lakh home loan`, persT: (l) => `EMI on ₹${l} Lakh Personal Loan — 1 to 5 Years, 11% to 18% | NextGrade`, persD: (l, e) => `EMI on a ₹${l} lakh personal loan for 3 years at 13% is about ${e} a month. EMI table for every rate and tenure, with total interest.`, persH: (l) => `EMI on a ₹${l} lakh personal loan`,
    ans: (l, e, r, t, ti) => `On a ₹${l} lakh loan at ${r}% a year for ${t} years, the EMI is about ${e} a month. Total interest over the loan comes to ${ti}.`,
    tblH: 'EMI by interest rate and tenure (₹ per month)', rate: 'Rate', totH: 'Total interest you pay', totP: (r) => `Total interest and total paid at ${r}% for each tenure:`, tenure: 'Tenure', interest: 'Total interest', paid: 'Total paid',
    incH: 'Salary needed for this loan', incP: (e, inc) => `Banks usually want all your EMIs together to stay under about 50% of your monthly income. So an EMI of ${e} needs a net monthly income of at least about ${inc} (with no other EMIs).`,
    tipsH: 'Ways to lower your EMI', tips: ['Even 0.5% lower interest changes the total by lakhs on a long loan — compare 2–3 banks and keep a good CIBIL score (750+).', 'Prepay something once a year — most banks charge no prepayment fee on floating-rate home loans.', 'A longer tenure lowers the EMI but raises the total interest a lot — choose the shortest tenure whose EMI you can comfortably pay.'],
    calc: '🧮 Enter your own amount, rate and tenure →', near: 'Other amounts', note: 'Estimate: the real EMI depends on the bank’s rate, processing fee and insurance.',
    sipHubT: 'How Much Will My SIP Grow? ₹500 to ₹50,000 a Month — 5 to 30 Years | NextGrade', sipHubD: 'What a monthly SIP of ₹500, ₹1,000, ₹5,000, ₹10,000… can grow to in 5, 10, 15, 20 and 30 years — tables at 8% to 15% returns.', sipHubH: '📈 How much will my SIP grow?', sipHubL: 'Pick your monthly SIP to see what it can grow to at different returns and over different years.',
    sipT: (a) => `₹${a} SIP per Month — How Much in 5, 10, 15, 20, 30 Years? | NextGrade`, sipD: (a, v) => `A monthly SIP of ₹${a} at 12% a year can grow to about ${v} in 20 years. Full table for 8–15% returns and 5–30 years, with amount invested and gains.`, sipH: (a) => `₹${a} SIP per month: how much will it grow?`,
    sipAns: (a, v, inv) => `A SIP of ₹${a} a month for 20 years, at an average 12% a year, can grow to about ${v} — while you invest only ${inv} in total.`,
    sipTbl: 'Final value by return and years', ret: 'Return a year', invH: 'Invested vs gain (12% return)', inv: 'Invested', gain: 'Gain', value: 'Value',
    crH: 'When will it reach ₹1 crore?', cr: (y) => y ? `At 12% a year, this SIP can reach ₹1 crore in about ${y} years.` : 'At 12%, this SIP does not reach ₹1 crore even in 40 years — raise the amount or use a step-up SIP.',
    sipTips: ['Mutual fund returns are not guaranteed — 12% is only an example; equity funds have often given that over long periods, but they can also lose money.', 'Raise your SIP by 10% every year (step-up) — it makes a big difference to the final amount.', 'Don’t stop your SIP when markets fall — you buy more units cheaply.'],
    sipCalc: '🧮 Try your own amount in the SIP calculator →', sipNote: 'Estimate, not investment advice. Mutual fund investments are subject to market risk.',
  },
};

export function buildMoneyPages(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  if (L.code !== 'hi' && L.code !== 'en') return;
  const X = TX[L.code], langs = LANGS.filter((l) => l.code === 'hi' || l.code === 'en');
  const css = '<style>.tx-ans{font-size:1.15rem;padding:14px 16px;border-radius:14px;background:rgba(47,158,68,.12);margin:12px 0}.tx-t{width:100%;border-collapse:collapse}.tx-t td,.tx-t th{padding:8px;border-bottom:1px solid var(--line);text-align:right;font-size:15px}.tx-t td:first-child,.tx-t th:first-child{text-align:left}</style>';
  const crumbs = (items) => `<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${items.map(([t, h]) => (h ? `<a href="${P(L, h)}">${esc(t)}</a>` : esc(t))).join(' › ')}</p>`;
  const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  // ---- loans ----
  const eHub = '/loan-emi/', slugH = (v) => `${lk(v).replace('.', '-')}-lakh-home-loan`, slugP = (v) => `${lk(v).replace('.', '-')}-lakh-personal-loan`;
  const tag = (h, t) => `<a class="tag" href="${P(L, h)}">${esc(t)}</a>`;
  write(L, eHub, page(L, {
    path: eHub, title: X.emiHubT, description: X.emiHubD, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.emiNav, eHub]])],
    body: `${css}<div class="wrap narrow article">${crumbs([[X.emiNav]])}<h1>${esc(X.emiHubH)}</h1><p class="lead">${esc(X.emiHubL)}</p>
<h2>🏠 Home loan</h2><p class="chips">${HOME.map((v) => tag(`${eHub}${slugH(v)}/`, `₹${lk(v)} ${X.lakh}`)).join(' ')}</p>
<h2>👤 Personal loan</h2><p class="chips">${PERS.map((v) => tag(`${eHub}${slugP(v)}/`, `₹${lk(v)} ${X.lakh}`)).join(' ')}</p>
<p><a class="btn btn-primary" href="${P(L, '/calculator/emi/')}">${esc(X.calc)}</a></p><p class="note">${esc(X.note)}</p></div>`,
  }));
  const loanPage = (v, home) => {
    const R = home ? HR : PR, Ts = home ? HT : PT, r0 = home ? 8.5 : 13, t0 = home ? 20 : 3, l = lk(v);
    const e0 = emi(v, r0, t0), ti0 = e0 * t0 * 12 - v;
    const path = `${eHub}${home ? slugH(v) : slugP(v)}/`, list = home ? HOME : PERS, i = list.indexOf(v);
    const faq = L.code === 'hi'
      ? [[`₹${l} लाख लोन की ${t0} साल की EMI कितनी है?`, `${r0}% ब्याज पर लगभग ${inr(e0)} महीना; कुल ब्याज ${inr(ti0)}।`], [`₹${l} लाख लोन के लिए कितनी सैलरी चाहिए?`, `${r0}% पर ${t0} साल के लिए EMI ${inr(e0)} है, तो लगभग ${inr(e0 * 2)} महीने की नेट आय चाहिए (EMI आय के 50% तक)।`], ['यह EMI कितनी सही है?', 'यह मानक EMI फ़ॉर्मूले से निकाला अनुमान है। बैंक की असली दर, प्रोसेसिंग फ़ीस और बीमा से थोड़ा फ़र्क़ आ सकता है।']]
      : [[`What is the EMI on a ₹${l} lakh loan for ${t0} years?`, `About ${inr(e0)} a month at ${r0}%; total interest ${inr(ti0)}.`], [`What salary do I need for a ₹${l} lakh loan?`, `At ${r0}% for ${t0} years the EMI is ${inr(e0)}, so a net monthly income of about ${inr(e0 * 2)} (EMI up to 50% of income).`], ['How accurate is this EMI?', 'It is worked out with the standard EMI formula. The bank’s actual rate, processing fee and insurance can change it slightly.']];
    write(L, path, page(L, {
      path, title: home ? X.homeT(l) : X.persT(l), description: home ? X.homeD(l, inr(e0)) : X.persD(l, inr(e0)), langs,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.emiNav, eHub], [`₹${l}`, path]]), faqLd(faq)],
      body: `${css}<div class="wrap narrow article">${crumbs([[X.emiNav, eHub], [`₹${l} ${X.lakh}`]])}<h1>${esc(home ? X.homeH(l) : X.persH(l))}</h1>
<p class="tx-ans">${esc(X.ans(l, inr(e0), r0, t0, inr(ti0)))}</p>
<h2>${esc(X.tblH)}</h2><div class="table-wrap"><table class="tx-t"><tr><th>${esc(X.rate)}</th>${Ts.map((t) => `<th>${t} ${esc(t === 1 && L.code === 'en' ? 'year' : X.yr)}</th>`).join('')}</tr>${R.map((r) => `<tr><td>${r}%</td>${Ts.map((t) => `<td>${r === r0 && t === t0 ? '<b>' : ''}${inr(emi(v, r, t))}${r === r0 && t === t0 ? '</b>' : ''}</td>`).join('')}</tr>`).join('')}</table></div>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.totH)}</h2><p>${esc(X.totP(r0))}</p><div class="table-wrap"><table class="tx-t"><tr><th>${esc(X.tenure)}</th><th>EMI</th><th>${esc(X.interest)}</th><th>${esc(X.paid)}</th></tr>${Ts.map((t) => { const e = emi(v, r0, t); return `<tr><td>${t} ${esc(t === 1 && L.code === 'en' ? 'year' : X.yr)}</td><td>${inr(e)}</td><td>${inr(e * t * 12 - v)}</td><td>${inr(e * t * 12)}</td></tr>`; }).join('')}</table></div>
<h2>${esc(X.incH)}</h2><p>${esc(X.incP(inr(e0), inr(e0 * 2)))}</p>
<h2>${esc(X.tipsH)}</h2><ul>${X.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<p><a class="btn btn-primary" href="${P(L, '/calculator/emi/')}">${esc(X.calc)}</a></p>
${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<h2>${esc(X.near)}</h2><p class="chips">${list.slice(Math.max(0, i - 3), i + 4).filter((x) => x !== v).map((x) => tag(`${eHub}${home ? slugH(x) : slugP(x)}/`, `₹${lk(x)} ${X.lakh}`)).join(' ')} ${tag(eHub, `${X.emiNav} →`)}</p>
<p class="note">${esc(X.note)}</p></div>`,
    }));
  };
  HOME.forEach((v) => loanPage(v, true));
  PERS.forEach((v) => loanPage(v, false));
  // ---- SIP ----
  const sHub = '/sip/', slugS = (a) => `${a}-per-month`;
  write(L, sHub, page(L, {
    path: sHub, title: X.sipHubT, description: X.sipHubD, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.sipNav, sHub]])],
    body: `${css}<div class="wrap narrow article">${crumbs([[X.sipNav]])}<h1>${esc(X.sipHubH)}</h1><p class="lead">${esc(X.sipHubL)}</p>
<div class="table-wrap"><table class="tx-t"><tr><th>SIP / ${esc(X.mo)}</th>${[10, 20, 30].map((y) => `<th>${y} ${esc(X.yr)} (12%)</th>`).join('')}</tr>${SIPS.map((a) => `<tr><td><a href="${P(L, `${sHub}${slugS(a)}/`)}">₹${amt(a)}</a></td>${[10, 20, 30].map((y) => `<td>${inr(sipFv(a, 12, y))}</td>`).join('')}</tr>`).join('')}</table></div>
<p><a class="btn btn-primary" href="${P(L, '/calculator/sip/')}">${esc(X.sipCalc)}</a></p><p class="note">${esc(X.sipNote)}</p></div>`,
  }));
  SIPS.forEach((a, i) => {
    const path = `${sHub}${slugS(a)}/`, v20 = sipFv(a, 12, 20), inv20 = a * 240;
    let yCr = null; for (let y = 1; y <= 40; y++) if (sipFv(a, 12, y) >= 1e7) { yCr = y; break; }
    const faq = L.code === 'hi'
      ? [[`₹${amt(a)} की SIP से 10 साल में कितना पैसा बनेगा?`, `12% सालाना रिटर्न पर लगभग ${inr(sipFv(a, 12, 10))}; कुल निवेश ${inr(a * 120)}।`], [`₹${amt(a)} की SIP से 20 साल में कितना बनेगा?`, `12% पर लगभग ${inr(v20)} (निवेश ${inr(inv20)})। 10% पर ${inr(sipFv(a, 10, 20))}, 15% पर ${inr(sipFv(a, 15, 20))}।`], ['क्या SIP का रिटर्न पक्का है?', 'नहीं। म्यूचुअल फ़ंड बाज़ार के हिसाब से चलते हैं — ये आँकड़े सिर्फ़ उदाहरण के लिए हैं।']]
      : [[`How much will a ₹${amt(a)} SIP give in 10 years?`, `About ${inr(sipFv(a, 12, 10))} at 12% a year; you invest ${inr(a * 120)}.`], [`How much will a ₹${amt(a)} SIP give in 20 years?`, `About ${inr(v20)} at 12% (invested ${inr(inv20)}). At 10%: ${inr(sipFv(a, 10, 20))}; at 15%: ${inr(sipFv(a, 15, 20))}.`], ['Are SIP returns guaranteed?', 'No. Mutual funds move with the market — these figures are only illustrations.']];
    write(L, path, page(L, {
      path, title: X.sipT(amt(a)), description: X.sipD(amt(a), inr(v20)), langs,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.sipNav, sHub], [`₹${amt(a)}`, path]]), faqLd(faq)],
      body: `${css}<div class="wrap narrow article">${crumbs([[X.sipNav, sHub], [`₹${amt(a)}`]])}<h1>${esc(X.sipH(amt(a)))}</h1>
<p class="tx-ans">${esc(X.sipAns(amt(a), inr(v20), inr(inv20)))}</p>
<h2>${esc(X.sipTbl)}</h2><div class="table-wrap"><table class="tx-t"><tr><th>${esc(X.ret)}</th>${SY.map((y) => `<th>${y} ${esc(X.yr)}</th>`).join('')}</tr>${SR.map((r) => `<tr><td>${r}%</td>${SY.map((y) => `<td>${r === 12 && y === 20 ? '<b>' : ''}${inr(sipFv(a, r, y))}${r === 12 && y === 20 ? '</b>' : ''}</td>`).join('')}</tr>`).join('')}</table></div>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.invH)}</h2><div class="table-wrap"><table class="tx-t"><tr><th>${esc(X.tenure || '')}</th><th>${esc(X.inv)}</th><th>${esc(X.gain)}</th><th>${esc(X.value)}</th></tr>${SY.map((y) => { const f = sipFv(a, 12, y), iv = a * 12 * y; return `<tr><td>${y} ${esc(X.yr)}</td><td>${inr(iv)}</td><td>${inr(f - iv)}</td><td>${inr(f)}</td></tr>`; }).join('')}</table></div>
<h2>${esc(X.crH)}</h2><p>${esc(X.cr(yCr))}</p>
<h2>${esc(X.tipsH)}</h2><ul>${X.sipTips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<p><a class="btn btn-primary" href="${P(L, '/calculator/sip/')}">${esc(X.sipCalc)}</a></p>
${faq.map(([q, aa]) => `<h3>${esc(q)}</h3><p>${esc(aa)}</p>`).join('')}
<h2>${esc(X.near)}</h2><p class="chips">${SIPS.slice(Math.max(0, i - 3), i + 4).filter((x) => x !== a).map((x) => tag(`${sHub}${slugS(x)}/`, `₹${amt(x)}`)).join(' ')} ${tag(sHub, 'SIP →')}</p>
<p class="note">${esc(X.sipNote)}</p></div>`,
    }));
  });
}
