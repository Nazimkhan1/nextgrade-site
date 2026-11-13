# nextgrade.in

Festival guides, ready-to-share wishes, a Wish Card Maker and a hub for small apps on nextgrade.in subdomains (for example hisab.nextgrade.in). Hosted on GitHub Pages from `docs/`.

- Content: `src/festivals.mjs` (one entry per festival), `src/apps.mjs` (apps on subdomains)
- Build: `node build.mjs` (no npm packages) → `docs/`, then commit and push
- AdSense publisher: ca-pub-4135041725422483 (`docs/ads.txt`)
- Add a festival: copy an entry in `src/festivals.mjs`, fill every field, build. Lunar-calendar festivals: write the month and tithi, not a fixed date.
- Add an app: add it to `src/apps.mjs`; host the app in its own repo with a `CNAME` like `holi.nextgrade.in`, and a Cloudflare DNS record `holi` CNAME `nazimkhan1.github.io` (DNS only).
