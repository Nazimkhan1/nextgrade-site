/**
 * Calendar dates for the festival pages ("Holi 2027 kab hai?") and the /festivals/2027/ list.
 * Lunar festivals move every year — add the next year's dates before the last one here passes.
 * Checked 18 Nov 2026 against several panchang sites (freepanchang, samvat, nakshtratak, vedicdisha,
 * drikpanchang, mypanchang). Where they differ, the note says so. Eid depends on the moon.
 */
const LIST_YEAR = '2027'; // the year shown on /festivals/<year>/

const DATES = {
  christmas: [{ d: '2026-12-25' }, { d: '2027-12-25' }],
  'new-year': [{ d: '2027-01-01' }, { d: '2028-01-01' }],
  lohri: [{ d: '2027-01-14' }],
  'makar-sankranti': [{ d: '2027-01-15', note: 'msk' }],
  'republic-day': [{ d: '2027-01-26' }],
  'vasant-panchami': [{ d: '2027-02-11' }],
  'maha-shivratri': [{ d: '2027-03-06' }],
  'eid-ul-fitr': [{ d: '2027-03-10', approx: true, note: 'moon' }],
  holi: [{ d: '2027-03-22', note: 'holi' }],
  'ram-navami': [{ d: '2027-04-15' }],
  'raksha-bandhan': [{ d: '2027-08-17' }],
  diwali: [{ d: '2027-10-29' }],
  'guru-nanak-jayanti': [{ d: '2026-11-24' }, { d: '2027-11-14' }],
  'chhath-puja': [{ d: '2027-11-04', note: 'chhath' }],
};

const WD = {
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  hinglish: ['Ravivaar', 'Somvaar', 'Mangalvaar', 'Budhvaar', 'Guruvaar', 'Shukravaar', 'Shanivaar'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  bn: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
};
const MO = {
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  hinglish: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  bn: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
};

const S = {
  hi: {
    q: (n, y) => `${n} ${y} कब है?`, today: 'आज है! 🎉', tomorrow: 'कल है', left: (k) => `${k} दिन बाकी`, approx: 'अनुमानित',
    a: (n, date, wd) => `${n} ${date}, ${wd} को है।`, aApprox: (n, date, wd) => `${n} ${date}, ${wd} को होने की उम्मीद है।`,
    notes: { moon: 'ईद चाँद दिखने पर होती है, इसलिए तारीख़ एक दिन आगे-पीछे हो सकती है।', msk: 'ज़्यादातर पंचांग 15 जनवरी बताते हैं; कुछ पंचांग और कई राज्यों की छुट्टी सूची में 14 जनवरी है।', holi: 'होलिका दहन एक दिन पहले, 21 मार्च की शाम।', chhath: 'नहाय-खाय 2 नवंबर, खरना 3 नवंबर, संध्या अर्घ्य 4 नवंबर, उषा अर्घ्य 5 नवंबर।' },
    local: 'तिथि वाले त्योहारों में अपने शहर का पंचांग भी देख लें।',
    listTitle: (y) => `${y} के त्योहार — तारीख़ के साथ पूरी सूची | NextGrade`, listH1: (y) => `📅 ${y} के त्योहार और तारीख़ें`,
    listDesc: (y) => `${y} में होली, ईद, रक्षा बंधन, दिवाली, छठ, गुरु नानक जयंती समेत बड़े त्योहार कब हैं — तारीख़, दिन और हर त्योहार की पूरी जानकारी।`,
    listLead: (y) => `${y} के बड़े त्योहारों की तारीख़ें, महीने के हिसाब से। हर त्योहार पर क्लिक करके उसकी कहानी, महत्व और शुभकामनाएँ पढ़ें।`,
    titleY: (n, y) => `${n} ${y} कब है? तारीख़, महत्व और शुभकामनाएँ | NextGrade`,
    th: ['त्योहार', 'तारीख़', 'दिन'], listLink: (y) => `📅 ${y} के सारे त्योहार और तारीख़ें`,
  },
  hinglish: {
    q: (n, y) => `${n} ${y} kab hai?`, today: 'Aaj hai! 🎉', tomorrow: 'Kal hai', left: (k) => `${k} din baaki`, approx: 'anumaanit',
    a: (n, date, wd) => `${n} ${date}, ${wd} ko hai.`, aApprox: (n, date, wd) => `${n} ${date}, ${wd} ko hone ki ummeed hai.`,
    notes: { moon: 'Eid chaand dikhne par hoti hai, isliye tareekh ek din aage-peeche ho sakti hai.', msk: 'Zyadatar panchang 15 January batate hain; kuch panchang aur kai rajyon ki chhutti list mein 14 January hai.', holi: 'Holika Dahan ek din pehle, 21 March ki shaam.', chhath: 'Nahay-Khay 2 Nov, Kharna 3 Nov, Sandhya Arghya 4 Nov, Usha Arghya 5 Nov.' },
    local: 'Tithi wale tyohaaron mein apne shehar ka panchang bhi dekh lein.',
    listTitle: (y) => `${y} ke Tyohar — Tareekh ke saath Poori List | NextGrade`, listH1: (y) => `📅 ${y} ke Tyohar aur Tareekhein`,
    listDesc: (y) => `${y} mein Holi, Eid, Raksha Bandhan, Diwali, Chhath, Guru Nanak Jayanti samet bade tyohar kab hain — tareekh, din aur har tyohar ki poori jaankari.`,
    listLead: (y) => `${y} ke bade tyohaaron ki tareekhein, maheene ke hisaab se. Har tyohar par click karke uski kahani, mahatva aur wishes padhein.`,
    titleY: (n, y) => `${n} ${y} Kab Hai? Date, Mahatva aur Wishes | NextGrade`,
    th: ['Tyohar', 'Tareekh', 'Din'], listLink: (y) => `📅 ${y} ke saare tyohar aur tareekhein`,
  },
  en: {
    q: (n, y) => `When is ${n} ${y}?`, today: 'It is today! 🎉', tomorrow: 'Tomorrow', left: (k) => `${k} days to go`, approx: 'expected',
    a: (n, date, wd) => `${n} is on ${wd}, ${date}.`, aApprox: (n, date, wd) => `${n} is expected on ${wd}, ${date}.`,
    notes: { moon: 'Eid depends on the sighting of the moon, so the date can move by a day.', msk: 'Most panchangs give 15 January; some panchangs and several state holiday lists give 14 January.', holi: 'Holika Dahan is the evening before, 21 March.', chhath: 'Nahay-Khay 2 Nov, Kharna 3 Nov, Sandhya Arghya 4 Nov, Usha Arghya 5 Nov.' },
    local: 'For festivals that follow the tithi, also check your city\'s panchang.',
    listTitle: (y) => `Indian Festivals ${y} — Full List with Dates | NextGrade`, listH1: (y) => `📅 Indian festivals in ${y}, with dates`,
    listDesc: (y) => `When are Holi, Eid, Raksha Bandhan, Diwali, Chhath, Guru Nanak Jayanti and other big festivals in ${y} — date, day and all about each festival.`,
    listLead: (y) => `Dates of the major festivals in ${y}, month by month. Tap a festival to read its story, meaning and wishes.`,
    titleY: (n, y) => `${n} ${y}: Date, Meaning and Wishes | NextGrade`,
    th: ['Festival', 'Date', 'Day'], listLink: (y) => `📅 All ${y} festivals and dates`,
  },
  bn: {
    q: (n, y) => `${n} ${y} কবে?`, today: 'আজই! 🎉', tomorrow: 'আগামীকাল', left: (k) => `আর ${k} দিন`, approx: 'আনুমানিক',
    a: (n, date, wd) => `${n} ${date}, ${wd}।`, aApprox: (n, date, wd) => `${n} ${date}, ${wd} হওয়ার কথা।`,
    notes: { moon: 'ঈদ চাঁদ দেখার ওপর নির্ভর করে, তাই তারিখ এক দিন এদিক-ওদিক হতে পারে।', msk: 'বেশিরভাগ পঞ্জিকা ১৫ জানুয়ারি বলে; কিছু পঞ্জিকা আর কয়েকটি রাজ্যের ছুটির তালিকায় ১৪ জানুয়ারি।', holi: 'হোলিকা দহন আগের দিন, ২১ মার্চ সন্ধ্যায়।', chhath: 'নহায়-খায় ২ নভেম্বর, খরনা ৩ নভেম্বর, সন্ধ্যা অর্ঘ্য ৪ নভেম্বর, ঊষা অর্ঘ্য ৫ নভেম্বর।' },
    local: 'তিথি অনুযায়ী উৎসবের জন্য নিজের শহরের পঞ্জিকাও দেখে নিন।',
    listTitle: (y) => `${y} সালের উৎসব — তারিখসহ পুরো তালিকা | NextGrade`, listH1: (y) => `📅 ${y} সালের উৎসব আর তারিখ`,
    listDesc: (y) => `${y} সালে হোলি, ঈদ, রাখী, দীপাবলি, ছট, গুরু নানক জয়ন্তী সহ বড় উৎসবগুলো কবে — তারিখ, বার আর প্রতিটি উৎসবের পুরো কথা।`,
    listLead: (y) => `${y} সালের বড় উৎসবের তারিখ, মাস অনুযায়ী। প্রতিটি উৎসবে ট্যাপ করে তার গল্প, মাহাত্ম্য আর শুভেচ্ছা পড়ুন।`,
    titleY: (n, y) => `${n} ${y} কবে? তারিখ, মাহাত্ম্য আর শুভেচ্ছা | NextGrade`,
    th: ['উৎসব', 'তারিখ', 'বার'], listLink: (y) => `📅 ${y} সালের সব উৎসব আর তারিখ`,
  },
};

const parse = (ymd) => new Date(`${ymd}T00:00:00Z`);
const fmt = (code, ymd) => { const d = parse(ymd); return code === 'en' ? `${d.getUTCDate()} ${MO.en[d.getUTCMonth()]} ${d.getUTCFullYear()}` : `${d.getUTCDate()} ${MO[code][d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const weekday = (code, ymd) => WD[code][parse(ymd).getUTCDay()];

/** The next date (today or later) for a festival, with ready-made text for one language, or null. */
const nextFestivalDate = (slug, code, name, today) => {
  const e = (DATES[slug] || []).find((x) => x.d >= today);
  if (!e) return null;
  const s = S[code], y = e.d.slice(0, 4), date = fmt(code, e.d), wd = weekday(code, e.d);
  const days = Math.round((parse(e.d) - parse(today)) / 864e5);
  const left = days === 0 ? s.today : days === 1 ? s.tomorrow : s.left(days);
  const a = (e.approx ? s.aApprox : s.a)(name, date, wd) + (e.note ? ` ${s.notes[e.note]}` : '');
  return { year: y, date, weekday: wd, days, left, q: s.q(name, y), a, approx: !!e.approx, ymd: e.d };
};

/** All festival dates in one calendar year, sorted. */
const festivalsInYear = (year) => Object.entries(DATES).flatMap(([slug, list]) => list.filter((x) => x.d.startsWith(`${year}-`)).map((x) => ({ slug, ...x }))).sort((a, b) => a.d.localeCompare(b.d));

export { LIST_YEAR, DATES, nextFestivalDate, festivalsInYear, fmt, weekday, S as DATE_TEXT };
