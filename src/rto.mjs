/**
 * RTO / vehicle number codes (plan R1, 26 Nov 2026): /rto/ (search), /rto/<state>/ (4 languages) and /rto/<code>/
 * (Hindi + English only, to avoid thin duplicates). Data: src/rto-data.mjs (Wikipedia list, CC BY-SA — credited on page).
 */
import { RTO } from './rto-data.mjs';
import { CITIES } from './weather-cities.mjs';
import { stateName } from './weather.mjs';

const slug = (c) => c.toLowerCase();
const byState = {};
RTO.forEach((r) => (byState[r[1]] ||= []).push(r));
const STATES = Object.keys(byState).sort((a, b) => byState[a][0][2].localeCompare(byState[b][0][2]));
const cityFor = (r) => { const t = `${r[3]} ${r[4]}`.toLowerCase(); return CITIES.find((c) => c.state === r[2] && c.pop > 50000 && new RegExp(`\\b${c.en.toLowerCase()}\\b`).test(t)); };

const TX = {
  hi: { nav: 'RTO कोड', hubTitle: 'RTO कोड लिस्ट — गाड़ी का नंबर किस ज़िले/शहर का है? (सभी राज्य) | NextGrade', hubDesc: 'गाड़ी नंबर का RTO कोड डालें और जानें वह किस शहर/ज़िले का है — UP, बिहार, दिल्ली, महाराष्ट्र, बंगाल समेत सभी राज्यों की 1,300 RTO कोड की लिस्ट।', hubH1: '🚗 RTO कोड — गाड़ी का नंबर कहाँ का है?', hubLead: 'नंबर प्लेट के पहले दो अक्षर राज्य बताते हैं और उसके बाद के अंक RTO (ज़िला परिवहन कार्यालय)। नीचे कोड लिखें — जैसे UP 32 या BR 01।', search: 'RTO कोड लिखें (जैसे UP 32)', notFound: 'यह कोड हमारी सूची में नहीं मिला।', statesH: 'राज्य चुनें', stTitle: (s, sc) => `${s} RTO कोड लिस्ट (${sc}) — सभी ज़िलों के गाड़ी नंबर कोड | NextGrade`, stDesc: (s, sc, n) => `${s} के सभी ${n} RTO कोड (${sc}-01 से): कौन-सा नंबर किस शहर/ज़िले का है, RTO ऑफ़िस और क्षेत्र।`, stH1: (s, sc) => `🚗 ${s} RTO कोड लिस्ट (${sc})`, cols: ['कोड', 'RTO ऑफ़िस', 'क्षेत्र / ज़िला'], title: (c, o, s) => `${c} RTO कोड किस ज़िले का है? — ${o}, ${s} | NextGrade`, desc: (c, o, s) => `${c} नंबर वाली गाड़ी ${o} (${s}) RTO में रजिस्टर्ड होती है। RTO ऑफ़िस, क्षेत्र, आसपास के कोड और नंबर प्लेट कैसे पढ़ें।`, h1: (c) => `🚗 ${c} किस ज़िले का नंबर है?`, ans: (c, o, s) => `${c} = ${o} RTO, ${s}`, officeL: 'RTO ऑफ़िस', areaL: 'क्षेत्र', noteL: 'ख़ास बात', stateL: 'राज्य', plateH: 'नंबर प्लेट कैसे पढ़ें', plate: (c) => [`पहले 2 अक्षर — राज्य (जैसे ${c.slice(0, 2)})`, `फिर 2 अंक — RTO कोड (जैसे ${c.slice(3)})`, 'फिर 1–2 अक्षर — सीरीज़ (जैसे AB)', 'आख़िर में 4 अंक — गाड़ी का नंबर (0001–9999)', 'BH सीरीज़ (जैसे 22 BH 1234 AA) किसी एक राज्य की नहीं — नौकरी में राज्य बदलने वालों के लिए'], nearH: 'इसी राज्य के और कोड', weatherL: (n) => `🌦️ ${n} का मौसम`, src: 'स्रोत: Wikipedia की RTO सूची (CC BY-SA) — कोड बदल सकते हैं; आधिकारिक जानकारी parivahan.gov.in या राज्य परिवहन विभाग पर देखें।', vahan: 'किसी गाड़ी की पूरी जानकारी (मालिक का नाम छोड़कर) parivahan.gov.in के "Know Your Vehicle Details" पर देखी जा सकती है।' },
  hinglish: { nav: 'RTO code', hubTitle: 'RTO Code List — Gaadi ka Number Kis Zile/Sheher ka Hai? (Sabhi Rajya) | NextGrade', hubDesc: 'Gaadi number ka RTO code daalein aur jaanein woh kis sheher/zile ka hai — UP, Bihar, Delhi, Maharashtra, Bengal samet sabhi rajyon ke 1,300 RTO code.', hubH1: '🚗 RTO code — gaadi ka number kahan ka hai?', hubLead: 'Number plate ke pehle do akshar rajya batate hain aur uske baad ke ank RTO (zila parivahan karyalay). Neeche code likhein — jaise UP 32 ya BR 01.', search: 'RTO code likhein (jaise UP 32)', notFound: 'Yeh code hamari list mein nahi mila.', statesH: 'Rajya chunein', stTitle: (s, sc) => `${s} RTO Code List (${sc}) — Sabhi Zilon ke Gaadi Number Code | NextGrade`, stDesc: (s, sc, n) => `${s} ke sabhi ${n} RTO code (${sc}-01 se): kaun sa number kis sheher/zile ka hai, RTO office aur kshetra.`, stH1: (s, sc) => `🚗 ${s} RTO code list (${sc})`, cols: ['Code', 'RTO office', 'Kshetra / zila'], title: () => '', desc: () => '', h1: () => '', ans: () => '', officeL: '', areaL: '', noteL: '', stateL: '', plateH: '', plate: () => [], nearH: '', weatherL: () => '', src: 'Source: Wikipedia ki RTO list (CC BY-SA) — code badal sakte hain; official jaankari parivahan.gov.in ya rajya parivahan vibhaag par dekhein.', vahan: '' },
  en: { nav: 'RTO codes', hubTitle: 'RTO Code List — Which City or District Is This Vehicle Number From? (All States) | NextGrade', hubDesc: 'Type the RTO code of a vehicle number and see which city or district it belongs to — all 1,300 RTO codes of UP, Bihar, Delhi, Maharashtra, West Bengal and every state.', hubH1: '🚗 RTO codes — where is this vehicle number from?', hubLead: 'The first two letters of a number plate are the state, the next two digits the RTO (district transport office). Type a code below — e.g. UP 32 or BR 01.', search: 'Type an RTO code (e.g. UP 32)', notFound: 'This code is not in our list.', statesH: 'Pick a state', stTitle: (s, sc) => `${s} RTO Code List (${sc}) — Vehicle Registration Codes of All Districts | NextGrade`, stDesc: (s, sc, n) => `All ${n} RTO codes of ${s} (${sc}-01 onwards): which number belongs to which city/district, RTO office and area.`, stH1: (s, sc) => `🚗 ${s} RTO code list (${sc})`, cols: ['Code', 'RTO office', 'Area / district'], title: (c, o, s) => `${c} RTO Code — Which District? ${o}, ${s} | NextGrade`, desc: (c, o, s) => `Vehicles with ${c} numbers are registered at the ${o} RTO (${s}). RTO office, area, nearby codes and how to read a number plate.`, h1: (c) => `🚗 Which district is ${c}?`, ans: (c, o, s) => `${c} = ${o} RTO, ${s}`, officeL: 'RTO office', areaL: 'Area', noteL: 'Note', stateL: 'State', plateH: 'How to read a number plate', plate: (c) => [`First 2 letters — the state (e.g. ${c.slice(0, 2)})`, `Next 2 digits — the RTO code (e.g. ${c.slice(3)})`, 'Then 1–2 letters — the series (e.g. AB)', 'Last 4 digits — the vehicle number (0001–9999)', 'BH series (e.g. 22 BH 1234 AA) belongs to no single state — for people whose jobs move them between states'], nearH: 'More codes in this state', weatherL: (n) => `🌦️ ${n} weather`, src: 'Source: Wikipedia’s RTO list (CC BY-SA) — codes can change; see parivahan.gov.in or the state transport department for official information.', vahan: 'Basic details of any vehicle (except the owner’s name) can be checked under "Know Your Vehicle Details" on parivahan.gov.in.' },
  bn: { nav: 'RTO কোড', hubTitle: 'RTO কোড তালিকা — গাড়ির নম্বর কোন জেলা/শহরের? (সব রাজ্য) | NextGrade', hubDesc: 'গাড়ির নম্বরের RTO কোড লিখুন আর জানুন সেটা কোন শহর/জেলার — পশ্চিমবঙ্গ, বিহার, দিল্লি, মহারাষ্ট্রসহ সব রাজ্যের ১,৩০০ RTO কোড।', hubH1: '🚗 RTO কোড — গাড়ির নম্বর কোথাকার?', hubLead: 'নম্বর প্লেটের প্রথম দুই অক্ষর রাজ্য, পরের দুই অঙ্ক RTO (জেলা পরিবহণ অফিস)। নিচে কোড লিখুন — যেমন WB 02 বা BR 01।', search: 'RTO কোড লিখুন (যেমন WB 02)', notFound: 'এই কোড আমাদের তালিকায় নেই।', statesH: 'রাজ্য বাছুন', stTitle: (s, sc) => `${s} RTO কোড তালিকা (${sc}) — সব জেলার গাড়ির নম্বর কোড | NextGrade`, stDesc: (s, sc, n) => `${s}-এর সব ${n}টি RTO কোড (${sc}-01 থেকে): কোন নম্বর কোন শহর/জেলার, RTO অফিস আর এলাকা।`, stH1: (s, sc) => `🚗 ${s} RTO কোড তালিকা (${sc})`, cols: ['কোড', 'RTO অফিস', 'এলাকা / জেলা'], title: () => '', desc: () => '', h1: () => '', ans: () => '', officeL: '', areaL: '', noteL: '', stateL: '', plateH: '', plate: () => [], nearH: '', weatherL: () => '', src: 'উৎস: Wikipedia-র RTO তালিকা (CC BY-SA) — কোড বদলাতে পারে; অফিসিয়াল তথ্য parivahan.gov.in বা রাজ্য পরিবহণ দপ্তরে দেখুন।', vahan: '' },
};
export const RTO_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, v.nav]));

export function buildRto(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, X = TX[code], hub = '/rto/';
  const css = '<style>.rt-t{width:100%;border-collapse:collapse}.rt-t td,.rt-t th{padding:8px 8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top;font-size:15px}.rt-t td:first-child{font-weight:800;white-space:nowrap}.rt-ans{color:#2b2118;font-size:24px;font-weight:800;padding:16px 18px;border-radius:16px;background:linear-gradient(135deg,#e7f5ff,#fff9db);border:1px solid var(--line);margin:12px 0}.rt-s{display:flex;gap:8px;flex-wrap:wrap}.rt-s input{flex:1 1 220px;padding:12px;border-radius:12px;border:2px solid var(--line);font:inherit;font-size:18px;text-transform:uppercase;background:var(--surface);color:var(--text)}#rt-out{margin-top:10px;font-weight:700}</style>';
  const stName = (r) => stateName(code, r[2]);
  const search = `<div class="rt-s"><input id="rt-q" placeholder="${esc(X.search)}" aria-label="${esc(X.search)}" autocomplete="off"></div><div id="rt-out"></div><script>(function(){var D=${JSON.stringify(Object.fromEntries(RTO.map((r) => [r[0], [r[3], stName(r)]])))},q=document.getElementById('rt-q'),o=document.getElementById('rt-out'),hasCode=${code === 'hi' || code === 'en'};q.addEventListener('input',function(){var v=q.value.toUpperCase().replace(/[^A-Z0-9]/g,''),m=v.match(/^([A-Z]{2})(\\d{1,2})/);if(!m){o.textContent='';return}var k=m[1]+'-'+('0'+m[2]).slice(-2),x=D[k];if(!x){o.textContent=${JSON.stringify(X.notFound)};return}o.innerHTML=(hasCode?'<a href="${P(L, hub)}'+k.toLowerCase()+'/">':'')+k+' → '+x[0].replace(/</g,'')+', '+x[1]+(hasCode?' →</a>':'');});})();</script>`;
  const stLinks = STATES.map((s) => `<a class="tag" href="${P(L, `${hub}${s.toLowerCase()}/`)}">${esc(s)} · ${esc(stateName(code, byState[s][0][2]))}</a>`).join(' ');
  write(L, hub, page(L, {
    path: hub, title: X.hubTitle, description: X.hubDesc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.hubH1)}</h1><p class="lead">${esc(X.hubLead)}</p>${search}
<h2>${esc(X.statesH)}</h2><p class="chips">${stLinks}</p><div class="ad" aria-hidden="true"></div><p class="note">${esc(X.src)}</p></div>`,
  }));
  const codeLinks = code === 'hi' || code === 'en';
  for (const s of STATES) {
    const list = byState[s], sn = stateName(code, list[0][2]), path = `${hub}${s.toLowerCase()}/`;
    write(L, path, page(L, {
      path, title: X.stTitle(sn, s), description: X.stDesc(sn, s, list.length),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [sn, path]])],
      body: `${css}<div class="wrap article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(sn)}</p>
<h1>${esc(X.stH1(sn, s))}</h1>${search}
<div class="table-wrap"><table class="rt-t"><tr>${X.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${list.map((r) => `<tr><td>${codeLinks ? `<a href="${P(L, `${hub}${slug(r[0])}/`)}">${esc(r[0])}</a>` : esc(r[0])}</td><td>${esc(r[3])}</td><td>${esc(r[4])}${r[5] ? `<br><small style="color:var(--muted)">${esc(r[5])}</small>` : ''}</td></tr>`).join('')}</table></div>
<div class="ad" aria-hidden="true"></div><h2>${esc(X.statesH)}</h2><p class="chips">${stLinks}</p><p class="note">${esc(X.src)}</p></div>`,
    }));
  }
  if (!codeLinks) return;
  const langs = LANGS.filter((l) => l.code === 'hi' || l.code === 'en');
  for (const r of RTO) {
    const [c, sc, , office, area, note] = r, sn = stName(r), path = `${hub}${slug(c)}/`, list = byState[sc], k = list.indexOf(r);
    const near = list.slice(Math.max(0, k - 6), k + 7).filter((x) => x !== r), city = cityFor(r);
    const faq = [[X.h1(c).replace(/^\S+\s/, ''), X.ans(c, office, sn)]];
    write(L, path, page(L, {
      path, langs, title: X.title(c, office, sn), description: X.desc(c, office, sn),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [sn, `${hub}${sc.toLowerCase()}/`], [c, path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › <a href="${P(L, `${hub}${sc.toLowerCase()}/`)}">${esc(sn)}</a> › ${esc(c)}</p>
<h1>${esc(X.h1(c))}</h1><p class="rt-ans">${esc(X.ans(c, office, sn))}</p>
<table class="rt-t"><tr><td>${esc(X.officeL)}</td><td>${esc(office)}</td></tr>${area ? `<tr><td>${esc(X.areaL)}</td><td>${esc(area)}</td></tr>` : ''}<tr><td>${esc(X.stateL)}</td><td>${esc(sn)} (${esc(sc)})</td></tr>${note ? `<tr><td>${esc(X.noteL)}</td><td>${esc(note)}</td></tr>` : ''}</table>
${city ? `<p><a class="tag" href="${P(L, `/mausam/${city.slug}/`)}">${esc(X.weatherL(code === 'hi' ? city.hi : city.en))}</a></p>` : ''}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.plateH)}</h2><ul>${X.plate(c).map((t) => `<li>${esc(t)}</li>`).join('')}</ul><p>${esc(X.vahan)}</p>
<h2>${esc(X.nearH)}</h2><p class="chips">${near.map((x) => `<a class="tag" href="${P(L, `${hub}${slug(x[0])}/`)}">${esc(x[0])} · ${esc(x[3].slice(0, 28))}</a>`).join(' ')} <a class="tag" href="${P(L, `${hub}${sc.toLowerCase()}/`)}">${esc(sn)} →</a></p>
<p><a class="btn btn-ghost" href="${P(L, hub)}">🔎 ${esc(X.search)}</a></p>
<p class="note">${esc(X.src)}</p></div>`,
    }));
  }
}
