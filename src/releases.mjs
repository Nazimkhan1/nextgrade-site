/**
 * Release schedule: pages listed here are left out of the build (no page, no card, no sitemap entry,
 * links pointing to them removed) until their date in India time. Anything not listed is live.
 * A GitHub Action (.github/workflows/daily-release.yml) rebuilds and pushes every day at 06:00 IST,
 * so each page goes live on its own. User's rule (15 Nov 2026): no bulk; since 16 Nov: 2 new pages a week (Tue + Fri) —
 * keeps the site growing steadily while the AdSense review runs.
 * Keys: 'game:<slug>', 'story:<slug>' or 'celebrate:<slug>' (animated wish). To delay a page, move its date; to publish now, delete its line.
 */
const releases = {
  'game:meenar': '2026-11-16', // already live
  // User (16 Nov): 2 pages a week, Tuesday and Friday. Festival pages first, nearest festival first; then evergreen, game and story in turn.
  'game:langar-seva': '2026-11-17', // Gurpurab, 24 Nov 2026
  'game:saal-ka-safar': '2026-11-20', // New Year, 31 Dec
  'game:parade-ki-taal': '2026-11-24', // Republic Day, 26 Jan
  'celebrate:republic-day': '2026-11-27', // Republic Day animated wish
  'game:chaand-dhundo': '2026-12-01', // Ramzan, ~8 Feb
  'game:basant-sargam': '2026-12-04', // Vasant Panchami, ~11 Feb 2027
  'game:rang-barsao': '2026-12-08', // Holi, ~22 Mar 2027
  'story:neela-siyaar': '2026-12-11',
  'game:matke': '2026-12-15',
  'story:bagula-aur-kekda': '2026-12-18',
  'game:pul': '2026-12-22',
  'story:billiyan-aur-bandar': '2026-12-25',
  'game:diye': '2026-12-29',
  'story:hawa-aur-suraj': '2027-01-01',
  'game:gotiyan': '2027-01-05',
  'story:shehar-gaon-chooha': '2027-01-08',
  'game:jaadui-varg': '2027-01-12',
  'story:sher-ki-khaal-gadha': '2027-01-15',
  'game:khiskao': '2027-01-19',
  'story:birbal-andhon-ki-ginti': '2027-01-22',
  'game:chidiya-udd': '2027-01-26',
  'story:tenali-kuen-ka-khazana': '2027-01-29',
  'game:saanp-seedhi': '2027-02-02',
  'story:mulla-ki-degchi': '2027-02-05',
  'game:kanche': '2027-02-09',
  'story:chidiya-kauwa-ghar': '2027-02-12',
  'game:raja-mantri-chor-sipahi': '2027-02-16',
};

// today's date in India (the release day changes at midnight IST)
const todayIST = () => process.env.RELEASE_TODAY || new Date(Date.now() + 5.5 * 3600000).toISOString().slice(0, 10); // RELEASE_TODAY=YYYY-MM-DD to preview a day
const isLive = (key, today = todayIST()) => !releases[key] || releases[key] <= today;

export { releases, todayIST, isLive };
