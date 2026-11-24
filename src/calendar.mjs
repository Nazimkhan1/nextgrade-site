/**
 * Calendar pages: /calendar/<year>/ (12 small months) and /calendar/<year>/<month>/ (one big month).
 * Festival dates come from src/festival-dates.mjs (checked against several panchangs). National holidays are
 * fixed dates. Hijri month starts are worked out with Intl's Umm al-Qura calendar and are always marked
 * "approximately": in India a month may start a day later, after the moon is seen.
 * Hindu (lunar) months are left out on purpose: their start depends on the tithi, and a wrong day on a calendar
 * is worse than none.
 */
const CAL_YEAR = '2027';
const SLUG = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// fixed national days that are not festival pages
const NATIONAL = [
  { d: '-08-15', emoji: '🇮🇳', hi: 'स्वतंत्रता दिवस', en: 'Independence Day', hinglish: 'Swatantrata Diwas', bn: 'স্বাধীনতা দিবস' },
  { d: '-10-02', emoji: '🕊️', hi: 'गांधी जयंती', en: 'Gandhi Jayanti', hinglish: 'Gandhi Jayanti', bn: 'গান্ধী জয়ন্তী' },
];
// festivals that are gazetted national holidays in India (central government list) — marked as holidays
const HOLIDAY_SLUGS = ['republic-day', 'holi', 'eid-ul-fitr', 'eid-ul-adha', 'janmashtami', 'dussehra', 'diwali', 'guru-nanak-jayanti', 'christmas', 'ram-navami'];

const WDS = {
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hinglish: ['Ravi', 'Som', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani'],
  bn: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'],
};

const CT = {
  hi: {
    nav: 'कैलेंडर 2027',
    yearTitle: (y) => `कैलेंडर ${y} — त्योहार और छुट्टियों के साथ (हिंदी) | NextGrade`,
    yearDesc: (y) => `${y} का पूरा कैलेंडर हिंदी में: हर महीना, बड़े त्योहार, राष्ट्रीय छुट्टियाँ और हिजरी महीनों की शुरुआत। हर महीने का अलग पेज, प्रिंट भी कर सकते हैं।`,
    yearH1: (y) => `📅 कैलेंडर ${y} — त्योहार और छुट्टियों के साथ`,
    yearLead: (y) => `${y} के बारह महीने एक जगह। जिस महीने पर टैप करेंगे, उसका बड़ा कैलेंडर त्योहारों और छुट्टियों के साथ खुलेगा। लाल तारीख़ें रविवार हैं।`,
    monthTitle: (m, y) => `${m} ${y} कैलेंडर — त्योहार और छुट्टियों के साथ | NextGrade`,
    monthDesc: (m, y, list) => `${m} ${y} का कैलेंडर हिंदी में${list ? ` — ${list}` : ''}। तारीख़, दिन, त्योहार, छुट्टियाँ और हिजरी महीना; प्रिंट भी कर सकते हैं।`,
    monthH1: (m, y) => `📅 ${m} ${y} कैलेंडर`,
    facts: (m, y, days, sun, sat) => `${m} ${y} में ${days} दिन हैं — ${sun} रविवार और ${sat} शनिवार।`,
    startsOn: (m, wd) => `${m} की शुरुआत ${wd} से होती है।`,
    festH: 'इस महीने के त्योहार और छुट्टियाँ', none: 'इस महीने कोई बड़ा त्योहार नहीं है।', holiday: 'छुट्टी', approx: 'अनुमानित',
    hijriH: 'हिजरी (इस्लामी) महीना', hijriStart: (name) => `${name} शुरू (लगभग)`, hijriNote: 'हिजरी तारीख़ें चाँद दिखने पर निर्भर हैं; भारत में महीना एक दिन बाद भी शुरू हो सकता है।',
    print: '🖨️ प्रिंट करें', all: (y) => `${y} के सारे महीने`, prev: '‹ पिछला महीना', next: 'अगला महीना ›', list: (y) => `📋 ${y} के त्योहारों की पूरी सूची`,
    panchang: 'तिथि वाले त्योहार अलग शहरों में एक दिन आगे-पीछे हो सकते हैं — अपना स्थानीय पंचांग भी देख लें।',
    faqH: 'अक्सर पूछे जाने वाले सवाल',
    faq: (m, y, days, sun, hol) => [[`${m} ${y} में कितने रविवार हैं?`, `${m} ${y} में ${sun} रविवार हैं, और कुल ${days} दिन।`], [`${m} ${y} में कौन-कौन सी छुट्टियाँ हैं?`, hol || `${m} ${y} में कोई राष्ट्रीय छुट्टी नहीं है; रविवार की छुट्टी रहती है।`]],
  },
  en: {
    nav: 'Calendar 2027',
    yearTitle: (y) => `Calendar ${y} with Indian Festivals and Holidays | NextGrade`,
    yearDesc: (y) => `The full ${y} calendar for India: every month with major festivals, national holidays and the start of Hijri months. A page for each month, easy to print.`,
    yearH1: (y) => `📅 Calendar ${y} — with Indian festivals and holidays`,
    yearLead: (y) => `All twelve months of ${y} in one place. Tap a month for its big calendar with festivals and holidays. Dates in red are Sundays.`,
    monthTitle: (m, y) => `${m} ${y} Calendar with Indian Festivals and Holidays | NextGrade`,
    monthDesc: (m, y, list) => `${m} ${y} calendar for India${list ? ` — ${list}` : ''}. Dates, days, festivals, holidays and the Hijri month; printable.`,
    monthH1: (m, y) => `📅 ${m} ${y} calendar`,
    facts: (m, y, days, sun, sat) => `${m} ${y} has ${days} days — ${sun} Sundays and ${sat} Saturdays.`,
    startsOn: (m, wd) => `${m} begins on a ${wd}.`,
    festH: 'Festivals and holidays this month', none: 'No major festival this month.', holiday: 'Holiday', approx: 'expected',
    hijriH: 'Hijri (Islamic) month', hijriStart: (name) => `${name} begins (approx.)`, hijriNote: 'Hijri dates depend on the moon being seen; in India a month may begin a day later.',
    print: '🖨️ Print', all: (y) => `All months of ${y}`, prev: '‹ Previous month', next: 'Next month ›', list: (y) => `📋 Full list of ${y} festivals`,
    panchang: 'Festivals that follow the tithi can differ by a day between cities — check your local panchang too.',
    faqH: 'Frequently asked questions',
    faq: (m, y, days, sun, hol) => [[`How many Sundays are there in ${m} ${y}?`, `${m} ${y} has ${sun} Sundays and ${days} days in all.`], [`What are the holidays in ${m} ${y}?`, hol || `There is no national holiday in ${m} ${y}; Sundays are off.`]],
  },
  hinglish: {
    nav: 'Calendar 2027',
    yearTitle: (y) => `Calendar ${y} — Tyohar aur Chhuttiyon ke saath | NextGrade`,
    yearDesc: (y) => `${y} ka poora calendar: har mahina, bade tyohar, national chhuttiyan aur Hijri mahinon ki shuruaat. Har mahine ka alag page, print bhi kar sakte ho.`,
    yearH1: (y) => `📅 Calendar ${y} — tyohar aur chhuttiyon ke saath`,
    yearLead: (y) => `${y} ke baarah mahine ek jagah. Jis mahine par tap karoge, uska bada calendar tyohaaron aur chhuttiyon ke saath khulega. Laal tareekhein Ravivaar hain.`,
    monthTitle: (m, y) => `${m} ${y} Calendar — Tyohar aur Chhuttiyon ke saath | NextGrade`,
    monthDesc: (m, y, list) => `${m} ${y} ka calendar${list ? ` — ${list}` : ''}. Tareekh, din, tyohar, chhuttiyan aur Hijri mahina; print bhi kar sakte ho.`,
    monthH1: (m, y) => `📅 ${m} ${y} Calendar`,
    facts: (m, y, days, sun, sat) => `${m} ${y} mein ${days} din hain — ${sun} Ravivaar aur ${sat} Shanivaar.`,
    startsOn: (m, wd) => `${m} ki shuruaat ${wd} se hoti hai.`,
    festH: 'Is mahine ke tyohar aur chhuttiyan', none: 'Is mahine koi bada tyohar nahi hai.', holiday: 'Chhutti', approx: 'anumaanit',
    hijriH: 'Hijri (Islami) mahina', hijriStart: (name) => `${name} shuru (lagbhag)`, hijriNote: 'Hijri tareekhein chaand dikhne par nirbhar hain; Bharat mein mahina ek din baad bhi shuru ho sakta hai.',
    print: '🖨️ Print karo', all: (y) => `${y} ke saare mahine`, prev: '‹ Pichhla mahina', next: 'Agla mahina ›', list: (y) => `📋 ${y} ke tyohaaron ki poori list`,
    panchang: 'Tithi wale tyohar alag shehron mein ek din aage-peeche ho sakte hain — apna local panchang bhi dekh lo.',
    faqH: 'Aksar poochhe jaane wale sawaal',
    faq: (m, y, days, sun, hol) => [[`${m} ${y} mein kitne Ravivaar hain?`, `${m} ${y} mein ${sun} Ravivaar hain, aur kul ${days} din.`], [`${m} ${y} mein kaun-kaun si chhuttiyan hain?`, hol || `${m} ${y} mein koi national chhutti nahi hai; Ravivaar ki chhutti rehti hai.`]],
  },
  bn: {
    nav: 'ক্যালেন্ডার ২০২৭',
    yearTitle: (y) => `ক্যালেন্ডার ${y} — উৎসব আর ছুটি সহ | NextGrade`,
    yearDesc: (y) => `${y} সালের পুরো ক্যালেন্ডার: প্রতিটি মাস, বড় উৎসব, জাতীয় ছুটি আর হিজরি মাসের শুরু। প্রতি মাসের আলাদা পাতা, প্রিন্টও করা যায়।`,
    yearH1: (y) => `📅 ক্যালেন্ডার ${y} — উৎসব আর ছুটি সহ`,
    yearLead: (y) => `${y} সালের বারো মাস এক জায়গায়। যে মাসে ট্যাপ করবে, তার বড় ক্যালেন্ডার উৎসব আর ছুটি সহ খুলবে। লাল তারিখগুলো রবিবার।`,
    monthTitle: (m, y) => `${m} ${y} ক্যালেন্ডার — উৎসব আর ছুটি সহ | NextGrade`,
    monthDesc: (m, y, list) => `${m} ${y} ক্যালেন্ডার${list ? ` — ${list}` : ''}। তারিখ, বার, উৎসব, ছুটি আর হিজরি মাস; প্রিন্টও করা যায়।`,
    monthH1: (m, y) => `📅 ${m} ${y} ক্যালেন্ডার`,
    facts: (m, y, days, sun, sat) => `${m} ${y}-এ ${days} দিন — ${sun}টি রবিবার আর ${sat}টি শনিবার।`,
    startsOn: (m, wd) => `${m} শুরু হচ্ছে ${wd} দিয়ে।`,
    festH: 'এই মাসের উৎসব আর ছুটি', none: 'এই মাসে বড় কোনো উৎসব নেই।', holiday: 'ছুটি', approx: 'আনুমানিক',
    hijriH: 'হিজরি (ইসলামি) মাস', hijriStart: (name) => `${name} শুরু (আনুমানিক)`, hijriNote: 'হিজরি তারিখ চাঁদ দেখার ওপর নির্ভর করে; ভারতে মাস এক দিন পরেও শুরু হতে পারে।',
    print: '🖨️ প্রিন্ট করো', all: (y) => `${y} সালের সব মাস`, prev: '‹ আগের মাস', next: 'পরের মাস ›', list: (y) => `📋 ${y} সালের উৎসবের পুরো তালিকা`,
    panchang: 'তিথি অনুযায়ী উৎসব আলাদা শহরে এক দিন আগে-পরে হতে পারে — স্থানীয় পঞ্জিকাও দেখে নিন।',
    faqH: 'প্রায়ই জিজ্ঞাসিত প্রশ্ন',
    faq: (m, y, days, sun, hol) => [[`${m} ${y}-এ কটা রবিবার?`, `${m} ${y}-এ ${sun}টি রবিবার, মোট ${days} দিন।`], [`${m} ${y}-এ কী কী ছুটি?`, hol || `${m} ${y}-এ কোনো জাতীয় ছুটি নেই; রবিবার ছুটি থাকে।`]],
  },
};

// Hijri month starts in a year, using the Umm al-Qura calendar: [{ ymd, n }] (n = 1..12)
function hijriStarts(year) {
  const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', timeZone: 'UTC' });
  const out = [];
  for (let t = Date.UTC(+year, 0, 1); t < Date.UTC(+year + 1, 0, 1); t += 864e5) {
    const parts = Object.fromEntries(f.formatToParts(new Date(t)).map((p) => [p.type, p.value]));
    if (parts.day === '1') out.push({ ymd: new Date(t).toISOString().slice(0, 10), n: +parts.month });
  }
  return out;
}

export { CAL_YEAR, SLUG as MONTH_SLUGS, NATIONAL, HOLIDAY_SLUGS, WDS, CT, hijriStarts };
