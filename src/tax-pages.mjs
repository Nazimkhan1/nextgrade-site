/**
 * "Tax on ₹X lakh salary" pages (27 Nov 2026): /income-tax/ + /income-tax/<x>-lakh-salary/ in Hindi and English.
 * People search exactly this ("15 lakh salary par kitna tax", "tax on 20 lakh salary new regime"). Every page is
 * worked out from the same FY 2026-27 rules as the calculator (src/calc-money.mjs, src/assets/calc.js), so the
 * numbers differ page to page: slab-by-slab table, old vs new, the deductions at which the old regime wins,
 * monthly in-hand. Estimate only, not tax advice.
 */
import { TAX_CHECKED } from './calc-money.mjs';

const NEW = [[4e5, 0], [8e5, .05], [12e5, .10], [16e5, .15], [20e5, .20], [24e5, .25], [Infinity, .30]];
const OLD = [[2.5e5, 0], [5e5, .05], [10e5, .20], [Infinity, .30]];
const slabTax = (t, s) => { let tax = 0, prev = 0; for (const [lim, r] of s) { if (t > prev) tax += (Math.min(t, lim) - prev) * r; prev = lim; } return tax; };
const surcharge = (t, base, isNew, s) => {
  const steps = isNew ? [[2e7, .25], [1e7, .15], [5e6, .10]] : [[5e7, .37], [2e7, .25], [1e7, .15], [5e6, .10]];
  for (let i = 0; i < steps.length; i++) if (t > steps[i][0]) { const th = steps[i][0], cap = slabTax(th, s) * (1 + (steps[i + 1] ? steps[i + 1][1] : 0)) + (t - th); return Math.max(0, Math.min(base * steps[i][1], cap - base)); }
  return 0;
};
export const regime = (t, isNew) => {
  t = Math.max(0, t); const s = isNew ? NEW : OLD, slab = slabTax(t, s);
  let reb = 0; if (isNew) { if (t <= 12e5) reb = Math.min(slab, 60000); else if (slab > t - 12e5) reb = slab - (t - 12e5); } else if (t <= 5e5) reb = Math.min(slab, 12500);
  const base = slab - reb, sur = surcharge(t, base, isNew, s), cess = (base + sur) * 0.04;
  return { taxable: t, slab, reb, sur, cess, total: Math.round(base + sur + cess) };
};
// salaries in rupees: 5–30 lakh every lakh, 12.75 lakh, then bigger steps
export const SALARIES = [...Array.from({ length: 26 }, (_, i) => (i + 5) * 1e5), 12.75e5, 35e5, 40e5, 45e5, 50e5, 60e5, 75e5, 100e5].sort((a, b) => a - b);
const slugOf = (v) => `${String(v / 1e5).replace('.', '-')}-lakh-salary`;
const lakh = (v) => `${+(v / 1e5).toFixed(2)}`;
const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

function work(v) {
  const n = regime(v - 75000, true), o0 = regime(v - 50000, false), o1 = regime(v - 50000 - 175000, false);
  // deductions (beyond the ₹50,000 standard deduction) at which the old regime becomes cheaper than the new
  let be = null; if (n.total > 0) { let lo = 0, hi = 15e5; if (regime(v - 50000 - hi, false).total < n.total) { for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (regime(v - 50000 - m, false).total < n.total) hi = m; else lo = m; } be = Math.ceil(hi / 1000) * 1000; } }
  const rows = []; let prev = 0; for (const [lim, r] of NEW) { const t = n.taxable; if (t > prev) rows.push([prev, Math.min(t, lim), r, (Math.min(t, lim) - prev) * r]); prev = lim; }
  const inHand = (v - n.total - 21600 - 2400) / 12;
  return { n, o0, o1, be, rows, inHand };
}

const TX = {
  hi: {
    nav: 'सैलरी पर टैक्स', hubTitle: 'कितनी सैलरी पर कितना इनकम टैक्स? 5 लाख से 1 करोड़ तक (FY 2026-27) | NextGrade', hubDesc: 'हर सैलरी पर इनकम टैक्स का पूरा हिसाब — 5, 10, 12, 15, 20, 25, 30 लाख… नई और पुरानी व्यवस्था की तुलना, महीने की इन-हैंड सैलरी (FY 2026-27)।',
    hubH1: '💰 कितनी सैलरी पर कितना टैक्स? (FY 2026-27)', hubLead: 'अपनी सालाना सैलरी चुनें — नई और पुरानी टैक्स व्यवस्था में टैक्स, स्लैब का हिसाब और हाथ में आने वाली सैलरी देखें।', calc: '🧾 अपनी आय और छूट डालकर हिसाब करें →',
    title: (l) => `₹${l} लाख सैलरी पर कितना टैक्स लगेगा? नई vs पुरानी व्यवस्था (FY 2026-27) | NextGrade`,
    desc: (l, n, o) => `₹${l} लाख सालाना सैलरी पर FY 2026-27 में नई व्यवस्था में कुल टैक्स ${n}, पुरानी में ${o} (सिर्फ़ स्टैंडर्ड डिडक्शन)। स्लैब-वार हिसाब, इन-हैंड सैलरी और कौन-सी व्यवस्था बेहतर।`,
    h1: (l) => `₹${l} लाख सैलरी पर कितना इनकम टैक्स? (FY 2026-27)`,
    answer: (l, n, m) => n === '₹0' ? `₹${l} लाख की सालाना सैलरी पर नई टैक्स व्यवस्था में कोई इनकम टैक्स नहीं लगेगा — ₹75,000 स्टैंडर्ड डिडक्शन के बाद टैक्स लगने वाली आय ₹12 लाख से कम/बराबर है, इसलिए पूरा टैक्स रिबेट में माफ़।` : `₹${l} लाख की सालाना सैलरी पर नई टैक्स व्यवस्था में कुल टैक्स लगभग ${n} बनेगा — यानी हर महीने लगभग ${m}।`,
    cmpH: 'नई और पुरानी व्यवस्था की तुलना', cols: ['', 'नई व्यवस्था', 'पुरानी (सिर्फ़ ₹50,000 डिडक्शन)', 'पुरानी (+ 80C ₹1.5 लाख, 80D ₹25,000)'], rTaxable: 'टैक्स लगने वाली आय', rTax: 'कुल टैक्स (सेस सहित)', rMonth: 'हर महीने',
    slabH: 'नई व्यवस्था में स्लैब-वार हिसाब', slabCols: ['आय का हिस्सा', 'दर', 'टैक्स'], slabTotal: 'स्लैब टैक्स', reb: 'रिबेट / मार्जिनल रिलीफ़', sur: 'सरचार्ज', cess: 'सेस 4%', total: 'कुल',
    be: (b) => b ? `अगर आपकी छूटें (80C, 80D, HRA, होम लोन ब्याज वग़ैरह) कुल मिलाकर लगभग ${b} से ज़्यादा हैं, तो पुरानी व्यवस्था सस्ती पड़ेगी; इससे कम हैं तो नई व्यवस्था।` : 'इस सैलरी पर नई व्यवस्था ही बेहतर है — पुरानी व्यवस्था में आम छूटों के साथ भी टैक्स कम नहीं होता।',
    beH: 'कौन-सी व्यवस्था चुनें',
    inH: 'हाथ में कितनी सैलरी आएगी', inP: (m) => `अगर यह आपकी ग्रॉस सैलरी है और PF ₹1,800 महीना व प्रोफ़ेशनल टैक्स ₹200 महीना कटता है, तो नई व्यवस्था में हाथ में लगभग ${m} महीना आएगा। आपका CTC अलग हो तो इन-हैंड सैलरी कैलकुलेटर से देखें।`, inLink: '💼 इन-हैंड सैलरी कैलकुलेटर →',
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: (l, w) => [[`₹${l} लाख सैलरी पर नई व्यवस्था में कितना टैक्स है?`, `FY 2026-27 में लगभग ${inr(w.n.total)} (सेस सहित), यानी ${inr(w.n.total / 12)} महीना। ₹75,000 स्टैंडर्ड डिडक्शन के बाद टैक्स लगने वाली आय ${inr(w.n.taxable)} होती है।`], [`₹${l} लाख सैलरी पर पुरानी व्यवस्था में कितना टैक्स है?`, `सिर्फ़ ₹50,000 स्टैंडर्ड डिडक्शन के साथ ${inr(w.o0.total)}; 80C में ₹1.5 लाख और 80D में ₹25,000 की छूट हो तो ${inr(w.o1.total)}।`], ['क्या यह आँकड़ा पक्का है?', `यह FY 2026-27 के नियमों पर अनुमान है (जाँचे गए: ${TAX_CHECKED}), टैक्स सलाह नहीं। कैपिटल गेन जैसी दूसरी आय, ब्याज वग़ैरह जोड़ने पर टैक्स बदल सकता है।`]],
    near: 'दूसरी सैलरी', note: `अनुमान, टैक्स सलाह नहीं — नियम जाँचे गए: ${TAX_CHECKED}।`,
  },
  en: {
    nav: 'Tax on salary', hubTitle: 'Income Tax on Salary: ₹5 Lakh to ₹1 Crore (FY 2026-27) | NextGrade', hubDesc: 'Income tax on every salary from ₹5 lakh to ₹1 crore for FY 2026-27 — new vs old regime, slab-by-slab working and monthly in-hand salary.',
    hubH1: '💰 How much tax on my salary? (FY 2026-27)', hubLead: 'Pick your yearly salary to see the tax under the new and old regimes, the slab-wise working and your take-home pay.', calc: '🧾 Enter your own income and deductions →',
    title: (l) => `Income Tax on ₹${l} Lakh Salary — New vs Old Regime (FY 2026-27) | NextGrade`,
    desc: (l, n, o) => `Tax on a ₹${l} lakh salary in FY 2026-27: ${n} under the new regime, ${o} under the old regime (standard deduction only). Slab-wise working, in-hand salary and which regime is better.`,
    h1: (l) => `Income tax on a ₹${l} lakh salary (FY 2026-27)`,
    answer: (l, n, m) => n === '₹0' ? `On a yearly salary of ₹${l} lakh you pay no income tax under the new regime — after the ₹75,000 standard deduction, taxable income is up to ₹12 lakh, so the whole tax is rebated.` : `On a yearly salary of ₹${l} lakh, total tax under the new regime is about ${n} — roughly ${m} a month.`,
    cmpH: 'New vs old regime', cols: ['', 'New regime', 'Old (₹50,000 deduction only)', 'Old (+ 80C ₹1.5 lakh, 80D ₹25,000)'], rTaxable: 'Taxable income', rTax: 'Total tax (with cess)', rMonth: 'Per month',
    slabH: 'Slab-wise working (new regime)', slabCols: ['Slice of income', 'Rate', 'Tax'], slabTotal: 'Slab tax', reb: 'Rebate / marginal relief', sur: 'Surcharge', cess: 'Cess 4%', total: 'Total',
    be: (b) => b ? `If your deductions (80C, 80D, HRA, home-loan interest and so on) add up to more than about ${b}, the old regime is cheaper; below that, choose the new regime.` : 'At this salary the new regime is the better choice — the old regime does not come out lower even with the usual deductions.',
    beH: 'Which regime should you choose',
    inH: 'Your take-home pay', inP: (m) => `If this is your gross salary, with PF of ₹1,800 and professional tax of ₹200 a month, you take home about ${m} a month under the new regime. If you only know your CTC, use the in-hand salary calculator.`, inLink: '💼 In-hand salary calculator →',
    faqH: 'Frequently asked questions',
    faq: (l, w) => [[`How much tax on a ₹${l} lakh salary in the new regime?`, `About ${inr(w.n.total)} for FY 2026-27 including cess, or ${inr(w.n.total / 12)} a month. After the ₹75,000 standard deduction, taxable income is ${inr(w.n.taxable)}.`], [`How much tax on a ₹${l} lakh salary in the old regime?`, `${inr(w.o0.total)} with only the ₹50,000 standard deduction; ${inr(w.o1.total)} if you also claim ₹1.5 lakh under 80C and ₹25,000 under 80D.`], ['Are these figures exact?', `They are estimates under FY 2026-27 rules (checked ${TAX_CHECKED}), not tax advice. Other income such as interest or capital gains changes the tax.`]],
    near: 'Other salaries', note: `Estimate, not tax advice — rules checked ${TAX_CHECKED}.`,
  },
};

export function buildTaxPages(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  if (L.code !== 'hi' && L.code !== 'en') return;
  const X = TX[L.code], hub = '/income-tax/', langs = LANGS.filter((l) => l.code === 'hi' || l.code === 'en');
  const css = '<style>.tx-ans{font-size:1.15rem;padding:14px 16px;border-radius:14px;background:rgba(47,158,68,.12);margin:12px 0}.tx-t{width:100%;border-collapse:collapse}.tx-t td,.tx-t th{padding:8px;border-bottom:1px solid var(--line);text-align:right;font-size:15px}.tx-t td:first-child,.tx-t th:first-child{text-align:left}</style>';
  const link = (v) => `<a class="tag" href="${P(L, `${hub}${slugOf(v)}/`)}">₹${lakh(v)} ${L.code === 'hi' ? 'लाख' : 'lakh'}</a>`;
  write(L, hub, page(L, {
    path: hub, title: X.hubTitle, description: X.hubDesc, langs,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p><h1>${esc(X.hubH1)}</h1><p class="lead">${esc(X.hubLead)}</p><p><a class="btn btn-primary" href="${P(L, '/calculator/income-tax/')}">${esc(X.calc)}</a></p>
<div class="table-wrap"><table class="tx-t"><tr><th>${esc(X.cols[0] || '₹')}</th><th>${esc(X.cols[1])}</th><th>${esc(X.cols[2])}</th></tr>${SALARIES.map((v) => { const w = work(v); return `<tr><td><a href="${P(L, `${hub}${slugOf(v)}/`)}">₹${lakh(v)} ${L.code === 'hi' ? 'लाख' : 'lakh'}</a></td><td>${inr(w.n.total)}</td><td>${inr(w.o0.total)}</td></tr>`; }).join('')}</table></div><p class="note">${esc(X.note)}</p></div>`,
  }));
  SALARIES.forEach((v, i) => {
    const w = work(v), l = lakh(v), path = `${hub}${slugOf(v)}/`, faq = X.faq(l, w);
    const near = SALARIES.slice(Math.max(0, i - 3), i + 4).filter((x) => x !== v);
    const slabRows = w.rows.map(([a, b, r, t]) => `<tr><td>${inr(a)} – ${inr(b)}</td><td>${Math.round(r * 100)}%</td><td>${inr(t)}</td></tr>`).join('');
    write(L, path, page(L, {
      path, title: X.title(l), description: X.desc(l, inr(w.n.total), inr(w.o0.total)), langs,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [`₹${l}`, path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ₹${l}</p>
<h1>${esc(X.h1(l))}</h1>
<p class="tx-ans">${esc(X.answer(l, inr(w.n.total), inr(w.n.total / 12)))}</p>
<h2>${esc(X.cmpH)}</h2><div class="table-wrap"><table class="tx-t"><tr>${X.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>
<tr><td>${esc(X.rTaxable)}</td><td>${inr(w.n.taxable)}</td><td>${inr(w.o0.taxable)}</td><td>${inr(w.o1.taxable)}</td></tr>
<tr><td><b>${esc(X.rTax)}</b></td><td><b>${inr(w.n.total)}</b></td><td><b>${inr(w.o0.total)}</b></td><td><b>${inr(w.o1.total)}</b></td></tr>
<tr><td>${esc(X.rMonth)}</td><td>${inr(w.n.total / 12)}</td><td>${inr(w.o0.total / 12)}</td><td>${inr(w.o1.total / 12)}</td></tr></table></div>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.slabH)}</h2><div class="table-wrap"><table class="tx-t"><tr>${X.slabCols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${slabRows}
<tr><td colspan="2">${esc(X.slabTotal)}</td><td>${inr(w.n.slab)}</td></tr>${w.n.reb ? `<tr><td colspan="2">${esc(X.reb)}</td><td>− ${inr(w.n.reb)}</td></tr>` : ''}${w.n.sur ? `<tr><td colspan="2">${esc(X.sur)}</td><td>${inr(w.n.sur)}</td></tr>` : ''}<tr><td colspan="2">${esc(X.cess)}</td><td>${inr(w.n.cess)}</td></tr><tr><td colspan="2"><b>${esc(X.total)}</b></td><td><b>${inr(w.n.total)}</b></td></tr></table></div>
<h2>${esc(X.beH)}</h2><p>${esc(X.be(w.be ? inr(w.be) : null))}</p>
<h2>${esc(X.inH)}</h2><p>${esc(X.inP(inr(w.inHand)))} <a href="${P(L, '/calculator/salary/')}">${esc(X.inLink)}</a></p>
<p><a class="btn btn-primary" href="${P(L, '/calculator/income-tax/')}">${esc(X.calc)}</a></p>
<h2>${esc(X.faqH)}</h2>${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<h2>${esc(X.near)}</h2><p class="chips">${near.map(link).join(' ')} <a class="tag" href="${P(L, hub)}">${esc(X.nav)} →</a></p>
<p class="note">${esc(X.note)}</p></div>`,
    }));
  });
}
