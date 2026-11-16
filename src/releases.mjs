/**
 * Release schedule: pages listed here are left out of the build (no page, no card, no sitemap entry,
 * links pointing to them removed) until their date in India time. Anything not listed is live.
 * A GitHub Action (.github/workflows/daily-release.yml) rebuilds and pushes every day at 06:00 IST,
 * so each page goes live on its own. User's rule (15 Nov 2026): one new page per day, not in bulk —
 * keeps the site growing steadily while the AdSense review runs.
 * Keys: 'game:<slug>' or 'story:<slug>'. To delay a page, move its date; to publish now, delete its line.
 */
const releases = {
  'game:meenar': '2026-11-16',
  'story:neela-siyaar': '2026-11-17',
  'game:matke': '2026-11-18',
  'story:bagula-aur-kekda': '2026-11-19',
  'game:pul': '2026-11-20',
  'story:billiyan-aur-bandar': '2026-11-21',
  'game:diye': '2026-11-22',
  'story:hawa-aur-suraj': '2026-11-23',
  'game:gotiyan': '2026-11-24',
  'story:shehar-gaon-chooha': '2026-11-25',
  'game:jaadui-varg': '2026-11-26',
  'story:sher-ki-khaal-gadha': '2026-11-27',
  'game:khiskao': '2026-11-28',
  'story:birbal-andhon-ki-ginti': '2026-11-29',
  'story:tenali-kuen-ka-khazana': '2026-11-30',
  'story:mulla-ki-degchi': '2026-12-01',
  'story:chidiya-kauwa-ghar': '2026-12-02',
  // Festival games first, nearest festival first (user, 16 Nov); evergreen games after them.
  'game:saal-ka-safar': '2026-12-03', // New Year, 31 Dec
  'game:parade-ki-taal': '2026-12-04', // Republic Day, 26 Jan
  'game:chaand-dhundo': '2026-12-05', // Ramzan, ~8 Feb
  'game:chidiya-udd': '2026-12-06',
  'game:saanp-seedhi': '2026-12-07',
};

// today's date in India (the release day changes at midnight IST)
const todayIST = () => process.env.RELEASE_TODAY || new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 10); // RELEASE_TODAY=YYYY-MM-DD to preview a day
const isLive = (key, today = todayIST()) => !releases[key] || releases[key] <= today;

export { releases, todayIST, isLive };
