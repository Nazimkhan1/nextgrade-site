/**
 * Release schedule: pages listed here are left out of the build (no page, no card, no sitemap entry,
 * links pointing to them removed) until their date in India time. Anything not listed is live.
 * A GitHub Action (.github/workflows/daily-release.yml) rebuilds and pushes every day at 06:00 IST,
 * so each page goes live on its own.
 *
 * User's rule (18 Nov 2026): every category has its OWN release line (games, stories, wishes, tools, and
 * any new category later gets its own line too), on varied days — not one shared list, not fixed weekdays —
 * so that something new goes out every few days. Gaps are "random" but come from a fixed seed, so the dates
 * stay the same on every build. Lines are independent: a game and a story can go out on the same day.
 *   - games   : every 1–2 days (user, 19 Nov 2026), most-searched games first, festival games before their day
 *   - stories : every 2–3 days (user, 19 Nov 2026)
 *   - wishes  : fixed dates, well before each festival (these never move)
 *   - tools   : every 3–6 days, starting only after AdSense approval (TOOLS_START). The first live tool also
 *               adds the /tools/ page, the menu link and a Privacy Policy paragraph — hence the wait.
 * Keys: 'game:<slug>', 'story:<slug>', 'celebrate:<slug>' (animated wish), 'festival:<slug>' (festival guide) or 'tool:<slug>' (free tool), 'calc:<slug>' (calculator).
 * To add a page: append its slug to its line. New category: add a LINES entry. Publish now: take it out.
 */
const addDays = (ymd, n) => new Date(Date.parse(`${ymd}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const seeded = (seed) => () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

// Set this to the first day after AdSense approval (YYYY-MM-DD). Until then no tool is live.
const TOOLS_START = null;

// already out (kept so their dates are recorded)
const DONE = { 'game:meenar': '2026-11-16', 'game:langar-seva': '2026-11-17', 'game:saal-ka-safar': '2026-11-20' };

// animated wishes: fixed dates before their festivals
const FIXED = {
  'celebrate:republic-day': '2026-11-27', // 26 Jan
  'celebrate:vasant-panchami': '2027-01-20', // 11 Feb (Saraswati Puja)
  'celebrate:maha-shivratri': '2027-02-05', // ~6 Mar
  'celebrate:eid-mubarak': '2027-02-09', // ~10 Mar
  'celebrate:holi': '2027-02-19', // ~22 Mar

  // single pages / sections (fixed dates)
  'page:naam-wali-image': '2026-12-12', // before Christmas and New Year
  'page:paheliyan': '2026-11-25', // riddles with answers
  // school speeches and essays (about 3–4 weeks before the day)
  'speech:republic-day': '2026-12-28', // 26 Jan
  'speech:netaji-jayanti': '2027-01-02', // 23 Jan (Parakram Diwas)
  'speech:saraswati-puja': '2027-01-15', // Vasant Panchami, 11 Feb 2027
};

const LINES = [
  // User (19 Nov 2026): games were sitting unreleased until Feb, bringing no traffic — release one every 1–2 days,
  // the most-searched games first ("carrom game", "saanp seedhi"…), festival games still well before their day.
  { prefix: 'game', start: '2026-11-21', gap: [1, 2], seed: 7, slugs: [
    'carrom', 'saanp-seedhi', 'kanche', 'bagh-bakri', 'kattam-katti',
    'parade-ki-taal', // Republic Day, 26 Jan
    'raja-mantri-chor-sipahi', 'gilli-danda', 'pitthu', 'aam-todo', 'chidiya-udd',
    'matke', 'pul', 'diye', 'gotiyan', 'jaadui-varg', 'khiskao',
    'chaand-dhundo', // Ramzan, ~8 Feb
    'basant-sargam', // Vasant Panchami, ~11 Feb
    'rang-barsao', // Holi, ~22 Mar
  ] },
  // User (19 Nov 2026): stories faster too — every 2–3 days.
  { prefix: 'story', start: '2026-11-22', gap: [2, 3], seed: 11, slugs: [
    'neela-siyaar', 'bagula-aur-kekda', 'billiyan-aur-bandar', 'hawa-aur-suraj', 'shehar-gaon-chooha',
    'sher-ki-khaal-gadha', 'birbal-andhon-ki-ginti', 'tenali-kuen-ka-khazana', 'mulla-ki-degchi', 'chidiya-kauwa-ghar',
    'kabuliwala', 'phir-se-chooha', 'do-bailon-ki-katha', 'chaand-par-khargosh', 'sachcha-dost-kauwa',
    'idgah', // Premchand; in Ramzan, before Eid (~10 Mar 2027)
  ] },
  // Festival guides (/festivals/<slug>/), user 19 Nov 2026: soon and close together, nearest festival first
  { prefix: 'festival', start: '2026-11-21', gap: [1, 2], seed: 17, slugs: [
    'guru-gobind-singh-jayanti', 'pongal', 'baisakhi', 'eid-ul-adha', 'janmashtami', 'ganesh-chaturthi', 'onam', 'navratri', 'dussehra',
  ] },
  // Essays (/nibandh/<slug>/), own line (user, 19 Nov 2026: content for AI search / school children); winter first while it is searched
  { prefix: 'nibandh', start: '2026-11-22', gap: [2, 4], seed: 23, slugs: [
    'sardi-ka-mausam', 'mera-vidyalaya', 'gaay', 'meri-maa', 'ped', 'jal', 'diwali', 'mera-priya-mitra',
  ] },
  // 10 tools built 21 Nov 2026 — user: "releases ke liye schedule kar do": one every 1–2 days, most-searched first.
  // Not tied to TOOLS_START (these go out before AdSense approval, like the 4 live tools).
  { prefix: 'tool', start: '2026-11-22', gap: [1, 2], seed: 31, slugs: [
    'pdf-compress', 'jpg-to-pdf', 'image-resize', 'pdf-merge', 'typing-test',
    'qr-maker', 'signature-maker', 'land-converter', 'image-crop', 'sticker-maker',
  ] },
  // Live since 20 Nov 2026 (user said yes: on-device tools live now): form-helper, image-compress, passport-photo,
  // doc-scanner — not listed = live. Still waiting (real-phone testing first):
  { prefix: 'tool', start: TOOLS_START, gap: [3, 6], seed: 13, slugs: [
    'bg-remover', 'hair-tryon',
  ] },
];

const build = () => {
  const out = { ...DONE, ...FIXED };
  LINES.forEach((L) => {
    if (!L.start) { L.slugs.forEach((s) => { out[`${L.prefix}:${s}`] = '9999-12-31'; }); return; } // waiting (e.g. tools before approval)
    const rnd = seeded(L.seed);
    let day = L.start;
    L.slugs.forEach((s, i) => {
      if (i) day = addDays(day, L.gap[0] + Math.floor(rnd() * (L.gap[1] - L.gap[0] + 1)));
      out[`${L.prefix}:${s}`] = day;
    });
  });
  return out;
};
const releases = build();

// today's date in India (the release day changes at midnight IST)
const todayIST = () => process.env.RELEASE_TODAY || new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 10); // RELEASE_TODAY=YYYY-MM-DD to preview a day
const isLive = (key, today = todayIST()) => !releases[key] || releases[key] <= today;

export { releases, todayIST, isLive };
