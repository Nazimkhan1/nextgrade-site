/** Pages for src/regional-wishes.mjs: /wishes/<language>/ and /wishes/<language>/<festival>/ (8 Indian languages).
 * One page per language (no translations of each other): English site chrome, content and <html lang> in the language. */
import { RLANGS, RFEST } from './regional-wishes.mjs';
import { DATES } from './festival-dates.mjs';

export { RLANGS };
const todayIST = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const nextDate = (key) => (DATES[key] || []).map((x) => x.d).filter((d) => d >= todayIST()).sort()[0];

export function buildRegionalWishes(EN, { page, write, esc, T, breadcrumbLd }) {
  const P = (_, p) => p;
  for (const rl of RLANGS) {
    const L = { ...EN, prefix: '', html: rl.html, hreflang: rl.html }, U = rl.ui, hub = `/wishes/${rl.slug}/`, list = RFEST[rl.code];
    const fonts = rl.font ? `&family=${rl.font}:wght@400;700` : '';
    const style = `<style>.rw .wish-list li{flex-wrap:wrap;gap:8px}.rw .wish-list li>span{flex:1 1 100%}.rw main,.rw .wish-list{font-family:${rl.font ? `"${rl.font.replace(/\+/g, ' ')}",` : ''}"Noto Sans Devanagari",system-ui,sans-serif}</style>`;
    const dateTxt = (f) => { const d = f[4] && nextDate(f[4]); return d ? new Intl.DateTimeFormat(`${rl.html}-IN`, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`)) : f[5] ? `${U.usual}: ${f[5]}` : ''; };
    const items = (ws) => `<ul class="wish-list">${ws.map((w) => `<li><span>${esc(w)}</span><button class="copy" type="button" data-copy="${esc(w)}" data-done="Copied ✓">Copy</button> <a class="copy" href="https://wa.me/?text=${encodeURIComponent(`${w}\n\nhttps://nextgrade.in${hub}`)}" target="_blank" rel="noopener">WhatsApp</a></li>`).join('')}</ul>`;
    const others = RLANGS.filter((o) => o !== rl).map((o) => `<a class="tag" href="/wishes/${o.slug}/" lang="${o.html}">${esc(o.name)}</a>`).join(' ');
    write(L, hub, page(L, {
      path: hub, title: `${U.hub} — ${rl.en} Festival Wishes | NextGrade`, description: `${U.hubLead} ${list.map((f) => f[2]).join(', ')}.`, langs: [L], extraFonts: fonts,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [T.nav.wishes, '/wishes/'], [U.hub, hub]])],
      body: `${style}<div class="wrap article rw" lang="${rl.html}">
<p class="crumbs"><a href="/">${esc(T.nav.home)}</a> › <a href="/en/wishes/">${esc(T.nav.wishes)}</a> › ${esc(U.hub)}</p>
<h1>🌸 ${esc(U.hub)}</h1>
<p class="lead">${esc(U.hubLead)}</p>
<div class="grid">${list.map((f) => `<a class="card" href="${hub}${f[0]}/"><span class="emoji" aria-hidden="true">${f[1]}</span><h3>${esc(f[2])}</h3><p>${esc(dateTxt(f))}</p></a>`).join('')}</div>
<h2>🌐 ${esc(U.more)}</h2><p class="chips">${others}</p>
</div>`,
    }));
    for (const f of list) {
      const path = `${hub}${f[0]}/`, when = dateTxt(f);
      write(L, path, page(L, {
        path, title: U.title(f[2]), description: `${f[6]} ${f[7][0]}`.slice(0, 300), langs: [L], extraFonts: fonts,
        jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, hub], [f[2], path]])],
        body: `${style}<div class="wrap narrow article rw" lang="${rl.html}">
<p class="crumbs"><a href="/">${esc(T.nav.home)}</a> › <a href="${hub}">${esc(U.hub)}</a> › ${esc(f[2])}</p>
<h1>${f[1]} ${esc(f[2])} — ${esc(U.wishesH)}</h1>
${when ? `<p class="when-box"><b>${esc(U.when)}:</b> ${esc(when)}</p>` : ''}
<p class="lead">${esc(f[6])}</p>
<h2>${esc(U.wishesH)}</h2>
${items(f[7])}
<p class="note">${esc(U.how)}</p>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(U.more)}</h2>
<p class="chips">${list.filter((o) => o !== f).map((o) => `<a class="tag" href="${hub}${o[0]}/">${o[1]} ${esc(o[2])}</a>`).join(' ')}</p>
<p class="chips">${others}</p>
</div>`,
      }));
    }
  }
}
