# nextgrade.in: tasks and status

Content site for Google AdSense approval, and the home of all the small apps on `*.nextgrade.in`.
Plans this follows: `MY-PLANS/IDEAS.md` and `MY-PLANS/festival-wishes/TASK.md` (the user's notes).

- Live: **https://nextgrade.in** (GitHub Pages, HTTPS on; `www` and `http` redirect here)
- Repo: `Nazimkhan1/nextgrade-site` (public), local `~/www/nextgrade-site`
- Build: `node build.mjs` → `docs/` → commit + push (no npm). Daily 06:00 IST GitHub Action republishes so scheduled pages go live (see RULE below)
- AdSense publisher: `ca-pub-4135041725422483` (`ads.txt` live at https://nextgrade.in/ads.txt)
- DNS: Cloudflare (the user makes DNS changes). `@` and `www` CNAME → `nazimkhan1.github.io`, **DNS only**

---

## ⚠️ RULE (user, 15 Nov 2026): ONE new page per day — never publish in bulk
- New pages (games, stories, wishes, anything) go into **`src/releases.mjs`** with a date; the build leaves them out (no page, no card, no sitemap, links to them removed) until that date in IST.
- **`.github/workflows/daily-release.yml`** rebuilds + pushes every day at **06:00 IST** (also "Run workflow" by hand), and asks Pages to rebuild. So pages go live on their own; nobody has to do anything daily.
- Preview any day locally: `RELEASE_TODAY=2026-11-20 node build.mjs` (then run plain `node build.mjs` again before committing).
- Live on 15 Nov: Nadi Paar ("naav wala", user kept it), Aaj ka Shabd, Bharat Quiz, Hisab Kitab video page (not on the user's removal list). Removed from live on 15 Nov and scheduled one per day:

| Date | Page |
|---|---|
| 16 Nov | game: Brahma ki Meenar |
| 17 Nov | story: Neela Siyaar |
| 18 Nov | game: Do Matke |
| 19 Nov | story: Bagula aur Kekda |
| 20 Nov | game: Raat ka Pul |
| 21 Nov | story: Do Billiyan aur Bandar |
| 22 Nov | game: Diye Jalao |
| 23 Nov | story: Hawa aur Suraj |
| 24 Nov | game: Gotiyan |
| 25 Nov | story: Shehar ka Chooha, Gaanv ka Chooha |
| 26 Nov | game: Jaadui Varg |
| 27 Nov | story: Sher ki Khaal mein Gadha |
| 28 Nov | game: Khiskao Tasveer |
| 29 Nov | story: Birbal — Andhon ki Ginti |
| 30 Nov | story: Tenali Raman aur Kuen ka Khazaana |
| 1 Dec | story: Mulla Nasruddin ki Degchi |
| 2 Dec | story: Chidiya ka Ghar, Kauwe ka Ghar |

- Anything new written after this: add it to the END of the schedule (next free day), don't push it live directly.


## 15 Nov 2026: 10 more stories (40 total)
- [x] `src/stories-more3.mjs` (pushed onto `stories` in stories.mjs): Neela Siyaar, Bagula aur Kekda (Panchatantra; crab only grips, no killing), Do Billiyan aur Bandar (folk), Hawa aur Suraj, Shehar ka Chooha–Gaanv ka Chooha (Aesop), Sher ki Khaal mein Gadha (Jataka), Birbal: Andhon ki Ginti, Tenali Raman aur Kuen ka Khazaana, Mulla Nasruddin ki Degchi, Chidiya ka Ghar–Kauwe ka Ghar (dadi-nani; kind ending). All 4 languages, 5 paras + seekh each. Checked: 40 pages load (10 × 4 languages), /kahani/ lists 40. Site now 309 pages.

## 15 Nov 2026: Games series (user: "banao ek ek kar ke")
Plan, in order: 1) **Aaj ka Shabd** ✅  2) **Bharat Quiz** ✅  3) **Nadi Paar** ✅  4) Chai Tapri Rush. Other ideas given to the user: Paheli Bujho, Ganit Dhamaka, Auto-Rickshaw Dash, Gol Gappa Challenge, Rangoli memory, Akshar Pakdo (kids), memory cards, Gully Cricket Super Over (no real teams/logos), board-exam quiz.
- [x] **7 puzzle games (15 Nov, user: "isi type ka games", build all then push once)** — all 4 languages, levels unlock in order, 💡 hint = real solver, ↶ undo, stars, WhatsApp share, sound + mute, offline:
  - `/games/meenar/` **Brahma ki Meenar** (Tower of Hanoi, 3–7 discs; hint = optimal recursive rule from any position). Standalone page (not on the kit).
  - `/games/matke/` **Do Matke** (water jugs: 3+5→4, 4+9→6, 8/5/3→4+4; BFS hint; min 6/8/7).
  - `/games/pul/` **Raat ka Pul** (bridge & torch: 1-2-5-10 in 17, 1-2-5-8 in 15, 1-3-6-8-12 in 29; Dijkstra hint; going over the limit = fail; stars by hints used).
  - `/games/diye/` **Diye Jalao** (lights out 3×3/4×4/5×5, start = all lit + k random taps; hint = GF(2) Gaussian elimination, minimum-tap answer over the free variables).
  - `/games/gotiyan/` **Gotiyan** (peg solitaire / Brainvita; easy+medium generated backwards from a centre peg, L3 = full 32-peg English board; DFS hint with dead-state memo, time-limited; 1697 engraving fact).
  - `/games/jaadui-varg/` **Jaadui Varg** (magic square 3×3 sum 15, then Khajuraho Parshvanath 4×4 sum 34 with 8 / 4 given; backtracking hint, spots a wrong number).
  - `/games/khiskao/` **Khiskao Tasveer** (sliding puzzle 3×3 / 4×4 / 4×4 hard; our own SVG sunset-palace picture; A* / weighted A* hint; target = solver length).
  - Shared **`/games/kit/puzzle.js` + `puzzle.css`** for the six kit games (language, sound, levels/unlocks, win panel, share). Kit pages: the game code is inline in each `index.html` (edit there). If you change the kit, bump `?v=` in the pages and the CACHE in their sw.js.
  - Tested 15 Nov: every level of every game solved by pressing only "Hint" (Meenar 7/15/31/63/127, Matke 6/8/7, Pul 17/15/29 min, Diye 3/5/7, Gotiyan → last peg in centre ×3, Jaadui Varg ×3, Khiskao 22/34/56), all 10 games × 4 languages load with no errors/empty text.
- [x] **`/games/nadi-paar/` Nadi Paar** (river-crossing puzzle, user asked) — L1 kisan + sher/bakri/ghaas (boat: kisan + 1, only kisan rows; min 7), L2 Papa + 2 kids (boat: Papa alone or ≤2 kids; min 5), L3 3 sipahi + 3 chor (boat 2; thieves may not outnumber guards on a bank; min 11). Tap to board/unboard, "Paar karo", 💡 Hint = BFS solver (shortest path from the current state), stars by moves vs min, levels unlock in order (`np-*` keys), WhatsApp share. Tested: hint-only play reaches 7/5/11. To add a level: `LEVELS` entry with items, min, fits(), rows(), wrong() + rules text in 4 languages. CACHE `ng-nadi-paar-v1`.
- [x] **`/games/quiz/` Bharat Quiz** — daily 10 questions (same set for everyone, seeded by IST day, #1 = 15 Nov 2026), **10 s per question** (user asked), score = 10 + whole seconds left (max 200); fact after every answer; practice by topic (7 categories); daily played once (`bq-daily`), best score; challenge link `?from=&score=` (names redacted in GA). Questions in `questions.js` (60, all 4 languages, right answer listed first, settled facts only) — add more to keep daily sets fresh. CACHE `ng-quiz-v1` (caches questions.js too).
- [x] **`/games/shabd/` Aaj ka Shabd** — daily 5-letter word, 6 tries; modes "Hindi shabd" (97 Hindi words in Roman letters, each with Devanagari + English meaning shown after the game) and "English words" (119). Same word for everyone, changes at midnight IST; #1 = 15 Nov 2026 (`EPOCH`); order = seeded shuffle, list repeats after its length (~3 months) → **add words before Feb 2027**. Practice mode (random). Colours 🟩 ok / 🟧 near / ⬛ no, share grid via WhatsApp/native share (word never shown). Stats + streak per mode in localStorage (`sh-*`), today's board restored on reload. Sound on with 🔇. CACHE `ng-shabd-v1`. Any 5 letters accepted (no dictionary check, on purpose: Roman Hindi spellings vary).

## 15 Nov 2026: Google Analytics + where things are
- [x] **Google Analytics** (GA4 account "NextGrade", property "NextGrade site", **G-NJ43J91EBJ**): `GA_ID` in build.mjs, tag injected right after `<head>` on every built page (260). Privacy policy "Visitor statistics" mentions it (cookies, opt-out). Prerender blocks GA hosts.
- ✅ (redaction ON + verified 15 Nov: names show as "(redacted)") **Names in share links:** wish/game links carry names (`?from=`, `?to=`, `?with=`, `?d=`, `?m=`, `?score=`). This GA tag ignores `page_location` overrides (tested), so the fix is in GA: Admin → Data streams → NextGrade site → **Redact data** → URL query parameters = `from, to, with, d, m, score`. **Don't push the GA tag live until that is on** (check: a local load of `/celebrate/birthday/?to=X&from=Y` must send `dl` without the names).
- Cloudflare Web Analytics stays too (visits/pages, no users). Read it via API: wrangler OAuth token, account "Nazim" (not "Darkroom"), GraphQL `rumPageloadEventsAdaptiveGroups`. 14 Nov: 110 views / 40 visits; 15 Nov: ~610 views mostly a US desktop crawler, ~60 India mobile, ~20 from Facebook.
- Hisab Kitab (repo `~/www/hisab`, own TASK.md): GA **G-0T71BBL3QT** live since 15 Nov (hk-v22); delete-confirm row fix (hk-v21).
- Promo media (outside this repo): `~/www/videos/` — Hisab Kitab videos, 6 wish Reels (`wishes/reels/`, scripts capture.js/compose.js), post texts `POSTS.md`.
- Next ideas (not started): Facebook + native "📲 Share" buttons on wish/festival pages; Anniversary / Good Night / Congratulations wishes; Good Morning reel per weekday.

## 15 Nov 2026: Hisab Kitab video page
- [x] `/apps/hisab-kitab/` (4 languages; text in `src/hisab-video.mjs`, page in build.mjs after Apps): 80 s demo video `src/static/media/hisab-kitab.mp4` (+ poster), "App kholiye", share box (`assets/video-share.js`): "Video share" sends the mp4 file via the phone share sheet with the app link as text (falls back to text share / WhatsApp), WhatsApp text, copy. Steps, why, FAQ (FAQPage + VideoObject JSON-LD). Button on /apps/.
- Video source + scripts: `~/www/videos/hisab-kitab/` (capture.js / compose.js; Hindi voice-over via macOS "Lekha"). To change the video: rebuild there, copy over `src/static/media/hisab-kitab.mp4`.

## 15 Nov 2026: prerender for AdSense
- [x] Game + animated-wish pages (`/celebrate/*`, `/games/*`, 16 pages) filled all their text with JS, so their HTML had only 11–35 words (thin content risk for AdSense). New `scripts/prerender.mjs` runs at the end of `node build.mjs`: opens each page in headless Chrome (`?lang=hi`, throwaway profile, ad + Cloudflare beacon hosts blocked) and writes the text JS puts into empty, visible elements (by `id` or `data-i18n`) back into `docs/`. Now 163–404 words in the HTML. Checked: text seen by visitors in en/hi/bn is identical before/after (no doubling); the page's JS still fills its own language.
- Needs Google Chrome on the build machine (or `CHROME_PATH`); without it the build only warns and skips.
- New game/wish pages: nothing to do, they are picked up automatically if their text goes into empty elements.
- Stories (260–300 words, have `seekh`) left as they are.

## Status, 14 Nov 2026 (evening): RESUME HERE
Site: **~162 pages**, all in 4 languages. Everything below is live (pushed to main → GitHub Pages).

**Done today (14 Nov)**
- [x] `/kahani/` — 10 bedtime stories × 4 languages, read-aloud, night mode, sleep timer.
- [x] `/islamic-calendar/` — today's Hijri date (browser, Umm al-Qura), 12 months, facts, upcoming dates (update yearly). Rajab Mubarak wish page.
- [x] Animated name wishes under `/celebrate/<slug>/`:
  - `shaadi-mubarak` — fireworks, crackers, flowers, own dhol+shehnai tune (OFF until "🥁 Band-baaja suno"). Standalone page.
  - `jumma-mubarak` — masjid, moon, lanterns; custom dua `?d=`; dua read aloud only on "🗣️ Dua suno"; NO music/ambient. Standalone page.
  - `gurpurab` (24 Nov 2026) — Gurdwara, full moon, Nishan Sahib, diyas. On the engine.
  - `good-morning` — sunrise, birds, clouds, sunflowers, weekday greeting, daily-changing message. On the engine.
  - Shared engine `celebrate/engine.js` + `engine.css` (see "Animated wishes engine" below). Register pages in the `CELEBRATE` list in build.mjs.
- [x] Game `/games/morning-exercise/` — **Subah ka 2-Minute Challenge**: 8 moves × **15 s each** (user asked), 2 s rest, Easy/Normal, cartoon coach, streak + badges, optional voice coach, share box under the game (WhatsApp / copy link / native share) + share & copy on the finish screen.
- Rules from the user today: **sound only in games** (games: sound/voice ON by default with a mute/toggle); **everywhere else sound is opt-in via a button** (wishes, stories, Shaadi baaja) — nothing auto-plays; Jumma: no music; animated pages must look attractive.

- [x] `/celebrate/christmas/` (14 Nov, later) — snowfall, Christmas tree whose lights switch on one by one, glowing star, gifts, snowy houses with roof lights, Santa's sleigh + 2 reindeer crossing the moon every ~7 s. On the engine; card on Home+Wishes, button on the Christmas festival page (4 languages); links to the Christmas game.

- [x] `/celebrate/new-year/` (14 Nov) — city skyline whose windows light up, 5 kinds of fireworks (peony, ring, willow, crackle, two-colour), opening finale + confetti, year auto (Jul–Dec → next year). On the engine; card, button on the New Year festival page, links to the Fireworks Pop game.


**AdSense readiness pass (14 Nov, later)**
- [x] New logo/favicon (N + up-arrow + sparkle): `src/static/favicon.svg`, `favicon.ico`, `icons/` (192/512/maskable/apple-touch), manifest icons, `og-image.jpg` 1200×630 + `summary_large_image` on every page incl. /celebrate/. Header logo = `<img class="logo-mark">` + Next<b>Grade</b>.
- [x] About page (4 langs) now ~400 words: what's on the site, how we write (own words, cross-checked, respectful), ads disclosure, corrections. Contact ~170 words: what to write about, India-based, email only. Games + Apps index got `more` sections (how to play, kid-safe, offline; why apps, data on device). Organization JSON-LD with logo on home; publisher logo on articles.
- Audit: 0 broken internal links; every page has the AdSense tag; ads.txt/robots/sitemap OK; JS pages (games, /celebrate/) render ~270–460 words.
- User side while review runs: don't change the AdSense code/ads.txt; in Search Console → Sitemaps, resubmit `sitemap.xml` (now ~165 URLs) and use URL Inspection → "Request indexing" on home, /festivals/, /kahani/, /wishes/; share a few pages so there is some real traffic. If rejected for "low value content": add 10 more stories + longer festival pages, then re-apply.

- [x] 10 more stories (14 Nov) in `src/stories-more.mjs` (pushed onto `stories` in stories.mjs): Lomdi aur Angoor, Lomdi aur Kauwa, Sheikh Chilli ka Sapna, Shehar mein Kitne Kauwe (Akbar-Birbal), Tenali Raman ki Billi, Bhediya Aaya, Topiwala aur Bandar, Cheenti aur Kabootar, Chatur Khargosh aur Sher (Panchatantra), Bandaron ka Raja aur Pul (Jataka). Third batch in `src/stories-more2.mjs`: Vikram-Betaal (Sabse komal rani), Sher banane wale (Panchatantra), Chidiya ka daana (dadi-nani), Chidiya aur haathi, Birbal ki khichdi, Tenali ka ghoda, Baatooni kachhua, Baap-beta-gadha, Kisaan ka khazaana, Sone ka hiran (Jataka). Now 30 stories × 4 languages; site 244 pages. Read-aloud: sentence-by-sentence, on-device voice first, rate 0.78.

- [x] **Chhath Puja (14 Nov, festival 13–16 Nov 2026)** — guide `/festivals/chhath-puja/` (festivals.mjs + en/hinglish/bn; 4 days, thekua/soop/kosi, FAQ with 2026 dates), animated wish `/celebrate/chhath-puja/` (sunrise before noon = Usha Arghya, sunset after = Sandhya Arghya; vratis raise soops, floating diyas, kosi), game `/games/chhath/` "Chhath Ghat" (5 dips on a timing bar → arghya when the sun is fully up → catch thekua/fruit in the soop 20 s; bells + splashes, sound on with mute; CACHE ng-chhath-v1). Update dates yearly.
- [x] **Home Zumba `/games/zumba/` (14 Nov, user asked)** — women's home dance workout on the morning-exercise pattern: 8 moves (step touch, salsa, merengue march, punch up, knee lift, side shuffle, hip circles, cool down), Normal 30 s / Easy 20 s each + 3 s water break; our own WebAudio dance loop at 124 BPM (dembow beat, bass, chords, melody) — music on by default with 🔊 mute; voice coach on by default; cartoon lady (sports top, leggings, ponytail, bindi) whose `fit` goes 0 → 1 with move progress (fuller → trim), Fit-o-meter, before/after picture on the finish screen with a note that it's only motivation; streak in localStorage `zb-days`; CACHE ng-zumba-v1. Wording stays positive ("fit ho rahi ho"), never 'moti'.

- [x] **Read-aloud fix everywhere (14 Nov):** user's Chrome stayed silent in Hindi (Hinglish/en-IN fine). New shared `src/assets/voice.js` (`NGVoice.play(pieces, {lang, rate, onState, onVoice, onFail})`): sentence by sentence, watchdog per sentence (no start in 2.6 s / ends at once = silent → next voice), order = remembered good voice → on-device → online → lang-only; remembers good/bad voice in localStorage `ng-voice-<lang>` / `ng-voice-bad-<lang>`. Used by stories (status line shows `🔊 <voice>` or the failure report), all engine wishes (engine v5 + voice.js), Jumma, morning-exercise (sw v5) and zumba (sw v2).

- [x] **Birthday animated wish `/celebrate/birthday/` (14 Nov)** — bunting, floating balloons, two-tier cake whose 5 candles blow out ~4 s after opening (smoke) then a confetti burst and new balloons rise; 5 messages × 4 languages; card on Home/Wishes, button on /wishes/birthday/, links to the birthday card maker. No sound except the Listen button.

- [x] **Lohri + Makar Sankranti (14 Nov, for 13–15 Jan)** — `/celebrate/lohri/` (night bonfire with layered flames, sparks, bhangra dancers, rewri/popcorn tossed in; Punjabi top line), `/celebrate/makar-sankranti/` (deep-blue sky, kites below the text, clouds, birds, rooftops; Marathi "tilgul ghya" top line; Bengali = Poush Sankranti/pithe-puli); game `/games/patang/` "Patang Udao / Kite Fight" (steer kite, cut others' strings +20, golden +50, combos ×3, 3 kites, enemies harmless while climbing and can only cut the top part of your string, laddoos +5, birds −10, 60 s, manjha safety box; CACHE ng-patang-v1). Cards + festival buttons + sitemap.

**PLANS (user, 14 Nov: "abhi time hai, plans mein rakho" — don't start these unless asked; start each ~2–3 weeks before its date):**
| Start by | Item | Ready before |
|---|---|---|
| ~15 Dec | 🌙 Shab-e-Miraj page + animated wish | ~5 Jan 2027 (moon-dependent, confirm) |
| ~1 Jan | 🌙 Shab-e-Barat page + animated wish | ~23 Jan 2027 |
| ~5 Jan | 🇮🇳 Republic Day animated wish + quiz/game | 26 Jan |
| ~20 Jan | 🌙 Ramzan series (Sehri/Iftar wishes, daily duas), Eidi lifafa + Eidi game, Eid animated wish | Ramzan ~8 Feb, Eid ~9–10 Mar 2027 |
| ~10 Feb | 🎨 Holi animated wish + colours game | Holi (check 2027 date) |
| anytime | 🧒 Bachpan "Yaad hai?" cards, 90s quiz, old games; more stories (Vikram-Betaal, dadi-nani, Jataka) | — |
| anytime | Anniversary / Good Night / Congratulations animated wishes; move Shaadi & Jumma onto the engine | — |
| ✅ done 14 Nov | Cloudflare Web Analytics LIVE: token in `CF_BEACON` (build.mjs), beacon injected into every HTML page at build; Cloudflare site set to "Enable with JS Snippet installation" (proxy is off, so automatic injection can't work). Dashboard: Cloudflare → Observability → Analytics → Web analytics → nextgrade.in | — |
- Waiting on user: confirm Hindi read-aloud works after Chrome relaunch; resubmit sitemap in Search Console; AdSense review result (2–4 weeks from 14 Nov).

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

## Animated wishes engine (14 Nov)
- `src/static/celebrate/engine.js` + `engine.css`: a page sets `window.CELEBRATE = {base, key, top, gateEmoji, partner, T:{lang:{title, gate(f), hello(to), from(f), defaultTo, msgs[], makeH, makeP, toLabel, fromLabel, toPh, fromPh, customPh, share(to,f,url), aboutH, about[], list[], aboutNote, links[[label,path]], listen?}}, scene:{resize(S), draw(ctx,S,now,dt), start?}}` and loads the engine. Engine does envelope, message, read-aloud, custom text `?d=`, maker, WhatsApp, 4 languages. Bump `?v=` on engine links after engine edits.
- Register each page in `CELEBRATE` list in build.mjs (cards on Home+Wishes, button on linked festival/wish page, sitemap).
- [x] Gurpurab `/celebrate/gurpurab/` (24 Nov 2026) on the engine.
- [x] Good Morning `/celebrate/good-morning/` (sunrise, birds, clouds, sunflowers; weekday greeting; `dailyDefault` = message changes daily).
- [x] Morning exercise game `/games/morning-exercise/` (14 Nov): 8 moves with our own stick-figure coach (IK pose engine, MOVES table), Easy 3 min / Normal 5 min, rest 5 s, ring timer, cheers/halfway toasts, optional voice coach (off by default), wake lock, streak + 7-day row in localStorage `me-days`, badges 1/3/7/14/21/30, WhatsApp challenge `?from=- Pipeline (date order): morning exercise/motivation game (user asked 14 Nov) → s=`, health disclaimer, PWA (CACHE ng-morning-v1).
- [x] Christmas `/celebrate/christmas/` (14 Nov) on the engine.
- [x] New Year `/celebrate/new-year/` (14 Nov) on the engine.
- Pipeline: see the PLANS table in the 14 Nov status at the top.

## [x] Animated "Jumma Mubarak" wish — LIVE 14 Nov at /celebrate/jumma-mubarak/
- Weekly share driver. Masjid silhouette + crescent + lanterns + rising light, names `?to=&from=&m=0-4&lang=`, NO music (user confirmed); NO ambient sound either (user removed it 14 Nov) — only the dua read aloud, custom dua `?d=` (max 200 chars, overrides `m`), dua read aloud with phone voice (speechSynthesis, en-IN/hi-IN/bn-IN) on open + "Dua suno" button, Sunnah list (ghusl, Kahf, durood, Asr-Maghrib dua). Card on Home+Wishes, button on /wishes/jumma-mubarak/ and /islamic-calendar/.

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

## Sound rule (user, 14 Nov)
- Sound is ALWAYS optional on wish pages: nothing plays by itself. Voice reading only on the "🗣️ Suno" button; Shaadi band-baaja only on "🥁 Band-baaja suno" (off by default). Jumma: no music/ambient at all.
