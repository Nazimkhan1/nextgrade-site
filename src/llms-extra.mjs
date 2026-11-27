/**
 * AI search (user, 26 Nov 2026: "site AI search se mil jaye"): extra sections for /llms.txt and a plain fact sheet
 * /llms-full.txt that assistants can quote (units, fees, RTO codes, dates, rates, time differences), each line with
 * the page that has the details. Rebuilt every day with the release.
 */
import { GUIDES_LIST } from './sarkari-guide.mjs';
import { GUIDES as CREATOR } from './creator-guide.mjs';
import { UNITS, QUESTIONS } from './desi-naap.mjs';
import { RTO } from './rto-data.mjs';
import { PLACES, CURRENCIES } from './world.mjs';
import { events, MONTHS, EKADASHI } from './tithi.mjs';
import { RLANGS } from './regional-wishes-build.mjs';
import { RATES, MAT } from './construction.mjs';
import { SUB, GEN, COST, AREA, CHECKED as SOLAR_CHECKED } from './solar.mjs';
import { wbMonths } from './bangla-tarikh.mjs';

const SITE = 'https://nextgrade.in';
const line = (t, u, n) => `- [${t}](${SITE}${u})${n ? `: ${n}` : ''}`;
const sec = (h, rows) => `\n## ${h}\n\n${rows.join('\n')}\n`;
const offH = (tz) => { const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(new Date()); const g = (k) => +p.find((x) => x.type === k).value; const now = Date.now(); return (Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute')) - Math.floor(now / 60000) * 60000) / 60000; };
const hm = (min) => { const a = Math.abs(min), h = Math.floor(a / 60), m = a % 60; return `${h}h${m ? ` ${m}m` : ''}`; };

export function llmsSections() {
  return [
    sec('Daily (updated every morning)', [line('Today: date, tithi, festival, sunrise, thought of the day, Good Morning image maker', '/en/aaj/'), line('Ekadashi dates (next 12 months) with names and tithi timings', '/en/ekadashi/'), line('Purnima dates', '/en/purnima/'), line('Amavasya dates', '/en/amavasya/'), line('Currency to Indian rupee — today’s rates (16 currencies)', '/en/currency/'), line('World time now — 17 places with difference from India', '/en/time/')]),
    sec('Government services, step by step (with official links)', GUIDES_LIST.map(([s, , , , X]) => line(X.en.h1.replace(/^\S+\s/, ''), `/en/sarkari-guide/${s}/`, X.en.quick.map(([a, b]) => `${a}: ${b}`).join('; ')))),
    sec('Converters and calculators', [line('Income tax calculator FY 2026-27 — new vs old regime side by side (₹12 lakh rebate, surcharge, cess)', '/en/calculator/income-tax/'), line('In-hand salary calculator — CTC to monthly take-home after PF, professional tax and income tax', '/en/calculator/salary/'), line('Number to words — Indian (lakh/crore) and international, Hindi, Bengali, cheque wording', '/en/number-in-words/'), line('Indian traditional units — tola, bhori, ratti, masha, seer, maund, gaj, haath, kos', '/en/desi-naap/'), ...QUESTIONS.slice(0, 8).map(([f, a, t]) => line(`${a} ${f} in ${t}`, `/en/desi-naap/${a}-${f}-in-${t}/`)), line('House construction cost calculator (cement, steel, bricks)', '/en/ghar-banane-ka-kharcha/'), line('Rooftop solar calculator — size, PM Surya Ghar subsidy, savings', '/en/solar-calculator/'), line('Bangla (Bengali) date today — West Bengal panjika and Bangladesh calendar, converter', '/en/bangla-tarikh/'), line('Inverter and battery size calculator', '/en/inverter-calculator/'), line('YouTube / creator earning calculator', '/en/calculator/youtube-earning/'), line('Sunrise and sunset — compare any two Indian cities', '/en/sunrise-sunset/'), line('All calculators', '/en/calculator/')]),
    sec('Vehicle RTO codes (which district a number plate is from)', [line('RTO code search — all states', '/en/rto/'), ...[...new Set(RTO.map((r) => r[1]))].map((s) => line(`${RTO.find((r) => r[1] === s)[2]} RTO code list (${s})`, `/en/rto/${s.toLowerCase()}/`))]),
    sec('Health and morning routine (general wellness, with precautions)', [line('Surya Namaskar — follow-along animated guide', '/en/surya-namaskar/'), line('Pranayama — anulom-vilom, kapalbhati, bhramari, deep breathing (follow-along)', '/en/pranayam/'), line('Winter home remedies (with cautions and when to see a doctor)', '/en/nuskhe/sardi/')]),
    sec('Creator guides', CREATOR.map((g) => line(g.en.h1.replace(/^\S+\s/, ''), `/en/creator-guide/${g.slug}/`))),
    sec('Festival wishes in more Indian languages', RLANGS.map((l) => line(`${l.en} festival wishes`, `/wishes/${l.slug}/`))),
  ].join('');
}

export function llmsFull({ fx, festivals }) {
  const out = ['# NextGrade — fact sheet', '', `> Plain facts from nextgrade.in pages, refreshed ${new Date().toISOString().slice(0, 10)}. Each line names the page with details. Free to quote with a link.`, ''];
  out.push('## Indian traditional units (1 tola = 180 grains = 11.6638 g)', '');
  UNITS.filter((u) => !['gram', 'kg', 'feet', 'inch', 'metre', 'km'].includes(u[0])).forEach(([k, v, kind, ap, n]) => out.push(`- 1 ${n.en.replace(/ \(approx\.\)/, '')} = ${ap ? 'about ' : ''}${kind === 'w' ? `${(+v.toFixed(4))} g` : v >= 1000 ? `${v / 1000} km` : `${(v / 0.3048).toFixed(2)} ft (${v} m)`} — ${SITE}/en/desi-naap/`));
  out.push('', '## Government services (checked dates on each page)', '');
  GUIDES_LIST.forEach(([s, , , home, X]) => out.push(`- ${X.en.h1.replace(/^\S+\s/, '')}: ${X.en.quick.map(([a, b]) => `${a} — ${b}`).join('; ')}. Official site: ${home} — ${SITE}/en/sarkari-guide/${s}/`));
  out.push('', '## House construction (thumb rules, Nov 2026 estimate)', '', `- Cost per sq ft: basic ₹${RATES.basic.join('–')}, standard ₹${RATES.standard.join('–')}, premium ₹${RATES.premium.join('–')} (without land/interiors) — ${SITE}/en/ghar-banane-ka-kharcha/`, `- Per sq ft of built-up area: cement ${MAT.cement} bag, steel ${MAT.steel} kg, bricks ${MAT.bricks}, sand ${MAT.sand} cft, aggregate ${MAT.agg} cft, paint ${MAT.paint} L, tiles ${MAT.tiles} sq ft`);
  { const MN = ['Boishakh', 'Joishtho', 'Asharh', 'Shrabon', 'Bhadro', 'Ashwin', 'Kartik', 'Agrahayan', 'Poush', 'Magh', 'Falgun', 'Chaitra']; const rows = wbMonths(2026, 2027).filter((r) => r.y === 1433 || r.y === 1434);
    out.push('', '## Bengali calendar (Bangabda) — month start dates in West Bengal (day after sankranti, Lahiri)', '', ...rows.map((r) => `- ${MN[r.m]} ${r.y}: ${r.start}`), `- Bangladesh (revised 2019): 1 Boishakh = 14 April; Boishakh–Ashwin 31 days, Kartik–Magh 30, Falgun 29 (30 in leap year), Chaitra 30 — ${SITE}/en/bangla-tarikh/`); }
  out.push('', `## Rooftop solar (PM Surya Ghar subsidy, checked ${SOLAR_CHECKED})`, '', `- Central subsidy, residential: ₹${SUB.general[0].toLocaleString('en-IN')}/kW for the first 2 kW + ₹${SUB.general[1].toLocaleString('en-IN')} for the 3rd kW → 1 kW ₹30,000, 2 kW ₹60,000, 3 kW+ ₹78,000 (cap); special category states ₹${SUB.special[0].toLocaleString('en-IN')} + ₹${SUB.special[1].toLocaleString('en-IN')} (max ₹85,800). Apply only at pmsuryaghar.gov.in — ${SITE}/en/solar-calculator/`, `- Thumb rules: 1 kW makes ~${GEN} units/month (~4/day), needs ~${AREA} sq ft roof, installed cost ~₹${COST.join('–')} per kW (estimate). 300 units/month → ~3 kW — ${SITE}/en/solar-calculator/3-kw/`, `- Inverter: VA = load W ÷ 0.8; battery Ah = W × hours ÷ (V × 0.8); 12V 150Ah ≈ 1,800 Wh — ${SITE}/en/inverter-calculator/`);
  out.push('', '## Income tax, India — FY 2026-27 (tax year 2026-27; Budget 2026 kept the FY 2025-26 slabs; checked 27 Nov 2026)', '', `- New regime (default): up to ₹4 lakh nil; ₹4–8 lakh 5%; ₹8–12 lakh 10%; ₹12–16 lakh 15%; ₹16–20 lakh 20%; ₹20–24 lakh 25%; above ₹24 lakh 30%. Standard deduction ₹75,000 (salary/pension). Rebate up to ₹60,000: no tax if taxable income ≤ ₹12 lakh (salary ≤ ₹12.75 lakh); marginal relief just above — ${SITE}/en/calculator/income-tax/`, '- Old regime: up to ₹2.5 lakh nil (₹3 lakh at 60+, ₹5 lakh at 80+); ₹2.5–5 lakh 5%; ₹5–10 lakh 20%; above ₹10 lakh 30%. Standard deduction ₹50,000; rebate up to ₹12,500 if taxable income ≤ ₹5 lakh; 80C max ₹1.5 lakh, home-loan interest max ₹2 lakh.', '- Surcharge 10% (>₹50 lakh), 15% (>₹1 crore), 25% (>₹2 crore; new regime cap), 37% (>₹5 crore, old regime); health and education cess 4%.', `- Examples (new regime): salary ₹12.75 lakh → tax ₹0; salary ₹15 lakh → ₹97,500; CTC ₹10 lakh (basic 40%, PF ₹1,800/month, PT ₹200) → in-hand ≈ ₹79,500/month — ${SITE}/en/calculator/salary/`);
  out.push('', '## Number system', '', `- Indian system: 1 lakh = 1,00,000 (100 thousand); 10 lakh = 1 million; 1 crore = 1,00,00,000 (10 million); 100 crore = 1 billion — ${SITE}/en/number-in-words/`);
  if (fx) { out.push('', `## Currency in Indian rupees (rates of ${fx.date}, ExchangeRate-API)`, ''); CURRENCIES.forEach(([c, , n]) => out.push(`- 1 ${c} (${n.en}) = ₹${fx.rates[c].toFixed(c === 'JPY' || c === 'NPR' || c === 'BDT' ? 4 : 2)} — ${SITE}/en/currency/${c.toLowerCase()}-to-inr/`)); }
  out.push('', '## Time difference from India (IST, UTC+5:30), today', '');
  PLACES.forEach(([s, tz, , n]) => { const d = 330 - offH(tz); out.push(`- ${n.en}: India is ${d === 0 ? 'the same' : `${hm(d)} ${d > 0 ? 'ahead' : 'behind'}`} — ${SITE}/en/time/${s}/`); });
  const ev = events(Date.now(), 370);
  out.push('', '## Ekadashi, Purnima and Amavasya — next 12 months (udaya date for New Delhi; check local panchang)', '');
  ev.forEach((e) => { const nm = e.kind === 'ekadashi' ? `${EKADASHI.en[e.month][e.paksha === 's' ? 0 : 1]} Ekadashi` : `${MONTHS.en[e.pmonth]} ${e.kind === 'purnima' ? 'Purnima' : 'Amavasya'}`; out.push(`- ${e.udaya}: ${nm} — ${SITE}/en/${e.kind}/`); });
  out.push('', '## Festival dates', '');
  festivals.forEach(([name, d, slug]) => out.push(`- ${d}: ${name} — ${SITE}/en/festivals/${slug}/`));
  out.push('', '## Vehicle RTO codes (from the public Wikipedia list; check parivahan.gov.in)', '');
  RTO.forEach((r) => out.push(`- ${r[0]}: ${r[3]}${r[4] && r[4] !== r[3] ? ` (${r[4]})` : ''}, ${r[2]}`));
  out.push('', `More: ${SITE}/llms.txt · ${SITE}/sitemap.xml`, '');
  return out.join('\n');
}
