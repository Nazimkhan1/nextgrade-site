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

const SITE = 'https://nextgrade.in';
const line = (t, u, n) => `- [${t}](${SITE}${u})${n ? `: ${n}` : ''}`;
const sec = (h, rows) => `\n## ${h}\n\n${rows.join('\n')}\n`;
const offH = (tz) => { const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(new Date()); const g = (k) => +p.find((x) => x.type === k).value; const now = Date.now(); return (Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute')) - Math.floor(now / 60000) * 60000) / 60000; };
const hm = (min) => { const a = Math.abs(min), h = Math.floor(a / 60), m = a % 60; return `${h}h${m ? ` ${m}m` : ''}`; };

export function llmsSections() {
  return [
    sec('Daily (updated every morning)', [line('Today: date, tithi, festival, sunrise, thought of the day, Good Morning image maker', '/en/aaj/'), line('Ekadashi dates (next 12 months) with names and tithi timings', '/en/ekadashi/'), line('Purnima dates', '/en/purnima/'), line('Amavasya dates', '/en/amavasya/'), line('Currency to Indian rupee — today’s rates (16 currencies)', '/en/currency/'), line('World time now — 17 places with difference from India', '/en/time/')]),
    sec('Government services, step by step (with official links)', GUIDES_LIST.map(([s, , , , X]) => line(X.en.h1.replace(/^\S+\s/, ''), `/en/sarkari-guide/${s}/`, X.en.quick.map(([a, b]) => `${a}: ${b}`).join('; ')))),
    sec('Converters and calculators', [line('Number to words — Indian (lakh/crore) and international, Hindi, Bengali, cheque wording', '/en/number-in-words/'), line('Indian traditional units — tola, bhori, ratti, masha, seer, maund, gaj, haath, kos', '/en/desi-naap/'), ...QUESTIONS.slice(0, 8).map(([f, a, t]) => line(`${a} ${f} in ${t}`, `/en/desi-naap/${a}-${f}-in-${t}/`)), line('House construction cost calculator (cement, steel, bricks)', '/en/ghar-banane-ka-kharcha/'), line('YouTube / creator earning calculator', '/en/calculator/youtube-earning/'), line('Sunrise and sunset — compare any two Indian cities', '/en/sunrise-sunset/'), line('All calculators', '/en/calculator/')]),
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
