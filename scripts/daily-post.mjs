/**
 * Daily social post (user, 24 Nov 2026: "aap auto post karo").
 * Picks one thing for today and posts it to the NextGrade Facebook Page:
 *   1. a festival today or tomorrow (India time) → wish + link (animated name wish if there is one)
 *   2. otherwise a page released today (src/releases.mjs) → "naya" post
 *   3. otherwise one evergreen page from a rotating list
 * Also prints the same text for WhatsApp (copy-paste; WhatsApp has no posting API) into the
 * GitHub Actions job summary.
 *
 *   node scripts/daily-post.mjs --dry           show today's post, post nothing
 *   node scripts/daily-post.mjs --date 2026-11-24 --dry
 * Posting needs FB_PAGE_ID and FB_PAGE_TOKEN (GitHub secrets). Without them it only prints.
 */
import { existsSync, appendFileSync } from 'node:fs';
import { DATES } from '../src/festival-dates.mjs';
import { festivals } from '../src/festivals.mjs';
import { releases } from '../src/releases.mjs';
import { games } from '../src/games.mjs';
import { tools } from '../src/tools.mjs';

const SITE = 'https://nextgrade.in';
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const di = args.indexOf('--date');
const todayIST = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const today = di >= 0 ? args[di + 1] : todayIST();
const addDays = (ymd, n) => new Date(Date.parse(`${ymd}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const tomorrow = addDays(today, 1);

// festival → animated "wish with name" page (src/static/celebrate/<slug>/), when the slugs differ
const CELEBRATE = { 'guru-nanak-jayanti': 'gurpurab', 'eid-ul-fitr': 'eid-mubarak', 'new-year': 'new-year' };
const celebrateFor = (slug) => { const c = CELEBRATE[slug] || slug; return existsSync(`src/static/celebrate/${c}/index.html`) ? `${SITE}/celebrate/${c}/` : ''; };
const tags = (...t) => t.map((x) => `#${x.replace(/[^A-Za-z0-9]/g, '')}`).join(' ');

// evergreen pages, one per day in turn
const EVERGREEN = [
  ['🔢 बच्चों के लिए हिंदी गिनती 1 से 100 — आवाज़ के साथ! फ़ोन पर बच्चा सुनकर सीखेगा।', '/kids/ginti/', ['Kids', 'HindiGinti']],
  ['💍 शादी का बायोडाटा 2 मिनट में बनाइए — फ़ोटो के साथ, हिंदी/English/বাংলা में, फ़्री। कुछ भी अपलोड नहीं होता।', '/tools/marriage-biodata/', ['MarriageBiodata', 'Shaadi']],
  ['💌 शादी का कार्ड फ़्री में बनाइए — 12 डिज़ाइन, अपना नाम-तारीख़ डालें और WhatsApp पर भेजें।', '/shaadi-card/', ['ShaadiCard', 'WeddingCard']],
  ['🏛️ 8वें वेतन आयोग में आपकी नई बेसिक पे कितनी हो सकती है? फ़िटमेंट फ़ैक्टर चुनकर देखें।', '/calculator/8th-pay-commission/', ['8thPayCommission', 'Salary']],
  ['📅 कैलेंडर 2027 — हर महीने के त्योहार और छुट्टियाँ, प्रिंट भी कर सकते हैं।', '/calendar/2027/', ['Calendar2027']],
  ['✖️ पहाड़े 2 से 20 तक — "दो दूनी चार" आवाज़ के साथ। बच्चों के लिए।', '/kids/pahade/', ['Pahade', 'Kids']],
  ['🔤 पुराना Krutidev टेक्स्ट Unicode हिंदी में बदलें (और उल्टा भी) — फ़्री, तुरंत।', '/tools/krutidev/', ['Krutidev', 'HindiTyping']],
  ['📚 बच्चों की नैतिक कहानियाँ — सोने से पहले सुनाने के लिए।', '/kahani/', ['Kahani', 'MoralStories']],
  ['🎲 बचपन के 22 देसी खेल एक ऐप में — लूडो, कैरम, कबड्डी, अंताक्षरी, लट्टू… दोस्तों के साथ खेलें!', 'https://desi-games.nextgrade.in/', ['DesiGames']],
  ['📝 स्कूल के लिए निबंध — 10 लाइनें, छोटा और लंबा निबंध, हिंदी में।', '/nibandh/', ['Nibandh', 'Essay']],
  ['🗜️ फ़ोटो का साइज़ 20KB / 50KB करें — सरकारी फ़ॉर्म के लिए, फ़ोन पर ही।', '/tools/image-compress/', ['FormPhoto', 'ImageCompress']],
  ['🧮 उम्र कैलकुलेटर — जन्म तारीख़ से सही उम्र साल, महीने, दिन में।', '/calculator/age/', ['AgeCalculator']],
];

function pick() {
  // 1. festival today, else tomorrow
  for (const [when, day] of [['today', today], ['tomorrow', tomorrow]]) {
    const slug = Object.keys(DATES).find((k) => DATES[k].some((x) => x.d === day));
    const f = slug && festivals.find((z) => z.slug === slug);
    if (!f) continue;
    const cel = celebrateFor(slug), page = `${SITE}/festivals/${slug}/`;
    const head = when === 'today' ? `${f.emoji} आज ${f.nameHi} है! ${f.nameHi} की हार्दिक शुभकामनाएँ 🙏` : `${f.emoji} कल ${f.nameHi} है! अपनों को बधाई भेजने की तैयारी कर लीजिए।`;
    const text = `${head}\n\n${f.wishesHi[0]}\n\n${cel ? `अपनों को उनके नाम के साथ एनिमेटेड बधाई भेजें 👇\n${cel}\n\n` : ''}${f.nameHi} की कहानी, महत्व और शुभकामनाएँ:\n${page}\n\n${tags(f.nameEn.replace(/\s/g, ''), 'Wishes', 'NextGrade')}`;
    return { kind: `festival-${when}`, text, link: cel || page };
  }
  // 2. something released today
  const fresh = Object.entries(releases).filter(([, d]) => d === today).map(([k]) => k);
  for (const k of fresh) {
    const [type, slug] = k.split(':');
    if (type === 'game') { const g = games.find((x) => x.slug === slug); if (g) { const link = `${SITE}/games/${slug}/`; return { kind: 'new-game', text: `🎮 नया गेम आया है: ${g.name || g.nameEn}!\nफ़ोन पर फ़्री खेलें, कोई ऐप डाउनलोड नहीं 👇\n${link}\n\n${tags('Games', 'NextGrade')}`, link }; } }
    if (type === 'tool') { const t = tools.find((x) => x.slug === slug); if (t) { const link = `${SITE}/tools/${slug}/`; return { kind: 'new-tool', text: `🆕 नया फ़्री टूल: ${t.hi[0]}\n${t.hi[1]}\n👇\n${link}\n\n${tags('FreeTools', 'NextGrade')}`, link }; } }
  }
  // 3. evergreen, rotating by day number
  const n = Math.floor(Date.parse(`${today}T00:00:00Z`) / 864e5) % EVERGREEN.length;
  const [line, path, t] = EVERGREEN[n], link = path.startsWith('http') ? path : `${SITE}${path}`;
  return { kind: 'evergreen', text: `${line}\n👇\n${link}\n\n${tags(...t, 'NextGrade')}`, link };
}

async function postFacebook(p) {
  const id = process.env.FB_PAGE_ID, token = process.env.FB_PAGE_TOKEN;
  if (!id || !token) { console.log('FB_PAGE_ID / FB_PAGE_TOKEN not set — not posting.'); return; }
  const body = new URLSearchParams({ message: p.text, link: p.link, access_token: token });
  const res = await fetch(`https://graph.facebook.com/v21.0/${id}/feed`, { method: 'POST', body });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) { console.error('Facebook post failed:', res.status, JSON.stringify(out.error || out)); process.exitCode = 1; return; }
  console.log('Facebook post id:', out.id);
}

const p = pick();
console.log(`[${today}] ${p.kind}\n---\n${p.text}\n---`);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Today's post (${today}, ${p.kind}) — copy for WhatsApp\n\n\`\`\`\n${p.text}\n\`\`\`\n`);
if (!dry) await postFacebook(p);
