# nextgrade.in: tasks and status

Content site for Google AdSense approval, and the home of all the small apps on `*.nextgrade.in`.
Plans this follows: `MY-PLANS/IDEAS.md` and `MY-PLANS/festival-wishes/TASK.md` (the user's notes).

- Live: **https://nextgrade.in** (GitHub Pages, HTTPS on; `www` and `http` redirect here)
- Repo: `Nazimkhan1/nextgrade-site` (public), local `~/www/nextgrade-site`
- Build: `node build.mjs` → `docs/` → commit + push (no npm, no CI)
- AdSense publisher: `ca-pub-4135041725422483` (`ads.txt` live at https://nextgrade.in/ads.txt)
- DNS: Cloudflare (the user makes DNS changes). `@` and `www` CNAME → `nazimkhan1.github.io`, **DNS only**

---

## Status, 13 Nov 2026 (night): resume here

**Done**
- [x] AWS (personal account 582599081766) shut down to stop the bill. ERP data backed up in the private repo `Nazimkhan1/school-erp-backup`. All bills paid, ₹0 due. One small bill for 1–13 Nov usage comes on 1 Dec.
- [x] Cloudflare: root + `www` → GitHub Pages. Deleted `dev`, `metabase` (pointed at a released AWS IP), `uat`, the ACM validation record and `email` (Mailgun tracking).
- [x] Site live with 21 pages:
  - Home
  - Festivals list + 12 guides in Hindi + English: Christmas, New Year, Lohri, Makar Sankranti, Republic Day, Vasant Panchami, Maha Shivratri, Holi, Eid ul-Fitr, Ram Navami, Raksha Bandhan, Diwali
  - Wish Card Maker (canvas, download/share, nothing uploaded)
  - Apps (Hisab Kitab), About, Contact, Privacy Policy (with AdSense cookie text), Terms, Disclaimer, 404
  - `sitemap.xml`, `robots.txt`, `ads.txt`, `CNAME`

**User to do (in this order)**
1. [x] Email Routing (14 Nov): `contact@nextgrade.in` → the user's Gmail, Active. Mailgun MX + SPF removed; Cloudflare MX route1-3 + SPF `include:_spf.mx.cloudflare.net`.
2. [x] Google Search Console (14 Nov): Domain property `nextgrade.in` verified (TXT `google-site-verification=…` in Cloudflare — never delete it). Sitemap submitted: Success, 27 pages.
3. [x] AdSense (14 Nov): site `nextgrade.in` verified with the code snippet, **review requested** ("Getting ready"). Payments info already done. Wait 2–4 weeks; keep the site up, never remove the AdSense code / ads.txt. Auto ads stay off until approval.
4. [ ] Never click your own ads, and don't ask anyone else to.

---

## Decided 14 Nov 2026
- **Folders, not subdomains:** new games, wishes, kahaniyan etc. go into this repo as `nextgrade.in/<folder>/` (e.g. `/games/christmas/`). Subdomains only for apps that keep user data in the browser or use Google login (Hisab Kitab), so ad scripts on nextgrade.in never share storage with that data.
- [x] Christmas game moved to **https://nextgrade.in/games/christmas/** (source `src/static/games/christmas/`: own index.html, sw.js scope `/games/christmas/`, manifest, icons; bump `CACHE` in its sw.js after edits). New `/games/` page + "Games" nav + home section, list in `src/games.mjs`. `christmas.nextgrade.in` (repo `Nazimkhan1/christmas`) is now only a redirect keeping `?from=&score=&lang=`; its sw.js clears old caches. Best scores saved under the old address don't carry over (fine).
- How to add a game now: put it in `src/static/games/<slug>/`, add an entry to `src/games.mjs`, `node build.mjs`, push. No DNS, no new repo.

## Done 14 Nov 2026
- [x] Christmas game live code: repo `Nazimkhan1/christmas` (`~/www/christmas-game`), Pages + CNAME `christmas.nextgrade.in`; user added the Cloudflare CNAME. Listed first on Home/Apps.
- [x] All-year wishes live: `/wishes/` + Good Morning, Birthday, Anniversary, Jumma Mubarak (also in the Wish Card Maker); "Wishes" in the nav; home section "रोज़ की शुभकामनाएँ".
- [x] Name share on every wish and festival page: `?from=<name>` banner + "अपना विश बनाएं" box (WhatsApp / copy link) in `src/assets/site.js`.
- [x] Guru Nanak Jayanti guide added (13 festivals now). Site: 27 pages.
- [x] Christmas game in 4 languages (Hinglish, हिंदी, English, বাংলা) with a language menu; live at https://christmas.nextgrade.in
- [x] **Whole site in 4 languages (14 Nov):** Hindi at `/`, English `/en/`, Hinglish `/hinglish/`, বাংলা `/bn/` (104 pages). Content: Hindi in `src/festivals.mjs` + `src/wishes.mjs`; others in `src/i18n/<lang>.mjs` (same slugs); all interface text in `src/i18n/ui.mjs`. hreflang + x-default on every page, 🌐 language dropdown in the header, per-language card data `assets/cards.<lang>.js`. Bengali pages add Bengal customs (Dol, Kali Puja, Poush Sankranti, Saraswati Puja, Park Street, Tagore's 1905 Rakhi). Policy pages stay one version (English + Hindi summary).
- **Adding a festival/wish now = 4 entries** (Hindi file + en/hinglish/bn). A language whose file lacks the slug will crash the build — add all four together.
- CSS/JS links carry `?v=<build id>` so browsers never mix new HTML with an old stylesheet.

## Older notes (14 Nov morning plan, now done)

### A. Christmas game at `christmas.nextgrade.in` (user asked for this first)
"Santa ke Gift Pakdo 🎁" — catch-the-gifts game, live well before 20 Dec.
- Folder: `~/www/christmas-game` (git init done, **only icons made so far**: `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`). No game code yet.
- Plan, agreed with the user:
  - Single `index.html` (plain HTML/CSS/JS + canvas, like Hisab Kitab) + `manifest.json` + `sw.js` (offline, installable) + `CNAME` = `christmas.nextgrade.in`
  - Santa's sleigh 🛷 at the bottom, moved by finger / mouse / arrow keys; catch 🎁 +10, ⭐ +25, 🍬 +5; avoid 🪨 coal −15; 45-second round, speed rises; snowfall background; mute toggle
  - Start screen: optional name. End screen: score, best score (localStorage on that phone only), "Challenge bhejo" → WhatsApp text "<name> ne <score> points banaye, kya aap hara sakte ho?" + link `?from=<name>&score=<n>`; opening that link shows the challenge on top. Name only in the link (shown with textContent, max 30 chars), nothing stored on a server.
  - Below the game: how to play, a short Christmas note + link to https://nextgrade.in/festivals/christmas/, links to nextgrade.in Privacy/Terms
  - AdSense tag in `<head>` (same publisher); no ad over the game area
- Hosting steps: new public repo `Nazimkhan1/christmas` → Pages from `main` root, custom domain `christmas.nextgrade.in`, Enforce HTTPS. **User adds in Cloudflare:** `christmas` CNAME → `nazimkhan1.github.io`, DNS only. Then add it to `src/apps.mjs` here, rebuild, push.

### B. All-year wishes + name share link (content written, not wired yet)
- `src/wishes.mjs` is written: Good Morning, Birthday, Anniversary, Jumma Mubarak (intro, write-up, 8–10 Hindi + 4–5 English wishes, FAQ each). **`build.mjs` does not use it yet.**
- To do: `/wishes/` index + `/wishes/<slug>/` pages; a "Wishes" nav link; home section "Roz ki shubhkamnayein"; add them to the Wish Card Maker list; sitemap.
- Name share feature for wish **and** festival pages: `?from=Rahul` shows "Rahul ki taraf se aapko <greeting>" at the top (textContent only); an "Apna wish banao" box (your name → new link → WhatsApp share `https://wa.me/?text=...`). Put the JS in `src/assets/site.js`.

### C. Guru Nanak Jayanti guide (Kartik Purnima, coming soon)
- Add to `src/festivals.mjs`: Guru Nanak Dev ji's Prakash Parv / Gurpurab; born 1469 at Rai Bhoi di Talwandi (now Nankana Sahib, Pakistan); Akhand Path (48-hour reading of Guru Granth Sahib), Prabhat Pheri, Nagar Kirtan led by the Panj Pyare, langar. Date: Kartik Purnima only (no fixed date).

---

## [x] Animated "Jumma Mubarak" wish — LIVE 14 Nov at /celebrate/jumma-mubarak/
- Weekly share driver. Masjid silhouette + crescent + lanterns + rising light, names `?to=&from=&m=0-4&lang=`, NO music (user confirmed); optional ambient sound OFF by default (breeze, crickets, bird, chime via WebAudio, 🔈 button, `jm-sound`), custom dua `?d=` (max 200 chars, overrides `m`), dua read aloud with phone voice (speechSynthesis, en-IN/hi-IN/bn-IN) on open + "Dua suno" button, Sunnah list (ghusl, Kahf, durood, Asr-Maghrib dua). Card on Home+Wishes, button on /wishes/jumma-mubarak/ and /islamic-calendar/.

## [x] Animated "Shaadi Mubarak" wish — LIVE 14 Nov at /celebrate/shaadi-mubarak/
- Source `src/static/celebrate/shaadi-mubarak/index.html` (standalone, copied as-is). Card on Home + Wishes (`shaadiCard` in build.mjs), in sitemap.
- What it does: link with `?to=&with=&from=&m=&lang=`; opens on a 💌 envelope "X ki taraf se khaas paigaam" → tap → fireworks, ground crackers, falling flowers, an ORIGINAL dhol + shehnai-like tune made with WebAudio (no film songs — copyright), names + message; "Apna wish banao" form → WhatsApp. 4 languages. Names only in the link.
- Same pattern can later cover: birthday, anniversary, Eid, Diwali animated wishes.

## Next: content to build (from MY-PLANS, in priority order)

### 1. All-year wishes (daily traffic) under `/wishes/`
Each page has: a short write-up, 10+ Hindi/Hinglish wishes + English wishes with copy buttons, a name-based share link (`?from=Rahul`, name only in the link, nothing stored), an **"Apna wish banao"** WhatsApp button (`https://wa.me/?text=...`), and the matching card in the Wish Card Maker.
- [ ] Good Morning
- [ ] Birthday
- [ ] Anniversary
- [ ] Jumma Mubarak (every Friday)
- [ ] Later: Good Night, Congratulations, Get Well Soon

### 2. Season deadlines
- [x] Christmas game live (nextgrade.in/games/christmas/), Christmas guide + card in 4 languages
- [x] New Year game "Aatishbaazi Pop / Fireworks Pop" live (14 Nov) at nextgrade.in/games/new-year/: tap rockets, Perfect at the top, golden rocket, combos, 45 s, live countdown to the next 1 January (shows "Happy New Year" in the first week of January), 4 languages, challenge link, PWA (`src/static/games/new-year/`, bump `CACHE` in its sw.js after edits)

### 3. Kahaniyan under `/kahani/` — [x] first 10 live (14 Nov)
- Done: `src/stories.mjs` (each story has hi/en/hinglish/bn in one entry), `/kahani/` + story pages in 4 languages, "Kahaniyan" in the nav, home section. Story page: 🔊 read aloud (browser speechSynthesis; voices hi-IN / en-IN / bn-IN — Hinglish uses en-IN; message if the phone has no voice), 🌙 night mode (remembered), ⏲️ sleep timer 5/10/15 min → stops voice + black "Good night" screen, prev/next, WhatsApp share. Stories: Pyaasa Kauwa, Kachhua-Khargosh, Bandar-Magarmachh, Sher-Chooha, Akbar-Birbal lakeer, Tenali Raman aur chor, Mulla Nasruddin ke kapde, Laalchi Kutta, Kabootar aur jaal, Sone ka anda.
- Next: 10 more (Jataka, Vikram-Betaal, Sheikh Chilli, dadi-nani, more Akbar-Birbal/Tenali), maybe a "story of the night" card on home
- [ ] 5–10 short moral stories to start, 2–3 minutes each, written in our own words: Panchatantra, Jataka, Akbar-Birbal, Tenali Raman, Mulla Nasruddin, Sheikh Chilli, Vikram-Betaal, dadi-nani ki kahani
- [ ] Each story: "Seekh" (the moral), a WhatsApp share button, an "Agli kahani" link
- [ ] Bedtime stories for kids (searched every night)
- ⚠️ No copying from books or other websites; modern authors' stories are copyrighted

### 4. Islamic pages (see `MY-PLANS/festival-wishes/ISLAMIC-CALENDAR.md`) — [x] calendar + Rajab live (14 Nov)
- Done: `/islamic-calendar/` in 4 languages (`src/islamic.mjs` + `assets/islamic.js`): today's Hijri date in the browser (Intl Umm al-Qura; note that India is often a day behind), meaning of this month, table of 12 months (Arabic + meaning + special days), 8 old facts, upcoming dates table (**update each year**), links to Jumma/Rajab/Eid. Card on Home + Wishes. Rajab Mubarak wish page (`wishes.mjs` + en/hinglish/bn).
- Next: Shab-e-Miraj, Shab-e-Barat wish pages (before ~5 Jan / ~23 Jan), Ramzan series before ~8 Feb, Eidi lifafa + game before Eid (~9-10 Mar).
- [ ] Rajab, Shab-e-Miraj, Shab-e-Barat, Ramzan series, Eid ul-Adha, Islamic New Year, "Aaj ki Islami tareekh"
- Write carefully from authentic sources, in a respectful tone. Dates depend on moon sighting.

### 5. Bachpan ki yaadein (see `MY-PLANS/festival-wishes/BACHPAN-KI-YAADEIN.md`)
- [ ] "Yaad hai?" cards, a 90s quiz, old games and how to play them, then-vs-now prices

### 6. Small games and quizzes (each can be its own subdomain app)
- [ ] Light the diyas, Holi colours, Eidi game, catch the gifts, rakhi design; a score plus a challenge link
- [ ] "Aap kaunsi mithai ho?" quiz with a shareable result card

### Site improvements
- [ ] Hindi / Hinglish language switch where it helps (the plans also mention Urdu for Eid)
- [ ] Open Graph image per page (a better WhatsApp link preview)
- [ ] Add more festivals: Valentine's Day, Navratri, Dussehra, Janmashtami, Ganesh Chaturthi, Chhath, Guru Nanak Jayanti, Eid ul-Adha, Muharram, Onam, Pongal, Baisakhi
- [ ] After AdSense approval: check that Auto ads don't cover the card maker or wish lists

---

## How to add a new app (any idea, like Hisab Kitab)
1. Build the app in its own repo (plain HTML/CSS/JS PWA, like `Nazimkhan1/hisab`), with a `CNAME` file such as `holi.nextgrade.in`.
2. GitHub repo → Settings → Pages → deploy from `main`, custom domain the same as the CNAME, Enforce HTTPS. If the certificate doesn't start, remove the custom domain and add it again.
3. Cloudflare DNS: `holi` CNAME → `nazimkhan1.github.io`, **DNS only**.
4. Add the app to `src/apps.mjs` here, run `node build.mjs`, commit and push. Its card appears on Home and Apps.
5. Add the AdSense tag in its `<head>` (same publisher id). The root domain's approval covers subdomains.

## Content rules (from the plans)
- ❌ No fake prizes / "lucky winner" / spin-and-win, no clickbait, no collecting phone numbers or personal data
- ❌ No copied text, no copyrighted TV/cartoon/song/logo content
- ✅ Respect every faith; use the correct greeting for each festival
- ✅ Lunar-calendar festivals: give the month and tithi, not a fixed date; tell readers to check the local panchang
