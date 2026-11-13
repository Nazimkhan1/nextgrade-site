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
1. [ ] Cloudflare → Email → **Email Routing**: `contact@nextgrade.in` → your Gmail. Say yes when it asks to replace the Mailgun MX records; the ERP is gone.
2. [ ] **Google Search Console**: add property **Domain** `nextgrade.in`, add its TXT record in Cloudflare, Verify. Then **Sitemaps** → `sitemap.xml`.
3. [ ] **AdSense**: Sites → `nextgrade.in` → verify with ads.txt → **Request review**. Best done after the next 10–15 pages are live (see below).
4. [ ] Never click your own ads, and don't ask anyone else to.

---

## Next: content to build (from MY-PLANS, in priority order)

### 1. All-year wishes (daily traffic) under `/wishes/`
Each page has: a short write-up, 10+ Hindi/Hinglish wishes + English wishes with copy buttons, a name-based share link (`?from=Rahul`, name only in the link, nothing stored), an **"Apna wish banao"** WhatsApp button (`https://wa.me/?text=...`), and the matching card in the Wish Card Maker.
- [ ] Good Morning
- [ ] Birthday
- [ ] Anniversary
- [ ] Jumma Mubarak (every Friday)
- [ ] Later: Good Night, Congratulations, Get Well Soon

### 2. Season deadlines
- [ ] Christmas wish page + card polish: live by **20 Dec 2026**
- [ ] New Year 2027 wish page (+ countdown / fireworks tap game): live by **25 Dec 2026**

### 3. Kahaniyan under `/kahani/`
- [ ] 5–10 short moral stories to start, 2–3 minutes each, written in our own words: Panchatantra, Jataka, Akbar-Birbal, Tenali Raman, Mulla Nasruddin, Sheikh Chilli, Vikram-Betaal, dadi-nani ki kahani
- [ ] Each story: "Seekh" (the moral), a WhatsApp share button, an "Agli kahani" link
- [ ] Bedtime stories for kids (searched every night)
- ⚠️ No copying from books or other websites; modern authors' stories are copyrighted

### 4. Islamic pages (see `MY-PLANS/festival-wishes/ISLAMIC-CALENDAR.md`)
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
