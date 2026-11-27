// Renders 1200×630 share/Discover images (og:image) with headless Chrome and the site's own fonts.
// Usage: node scripts/og-cards.mjs  → src/static/og/<file>.jpg  (commit the JPGs; the build only copies them; build.mjs OG_BY_PATH maps page → image)
// Spec (MY-PLANS BUILDER-SPECS 27 Nov): 1200×675 (16:9), not text-heavy → one big picture, short title.
// Research round 2 (27 Nov 2026): Discover wants large images (≥1200 px) + max-image-preview:large.
import http from 'node:http';
import { readFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
import { OG_CARDS as CARDS } from '../src/og-cards.mjs';

const ROOT = new URL('..', import.meta.url).pathname, STATIC = join(ROOT, 'src/static'), OUT = join(STATIC, 'og');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html = (c) => `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/fonts/css/6a45250a9a38.css"><style>
@font-face{font-family:NotoEmoji;src:url(/emoji.ttf)}
*{margin:0;box-sizing:border-box}html,body{width:1200px;height:675px;overflow:hidden}
body{background:radial-gradient(circle at 30% 45%,#fff9db 0%,#ffe8cc 40%,#ffc078 100%);font-family:'Baloo 2','Noto Sans Devanagari',Inter,sans-serif;color:#3b1d0a;position:relative}
.e,.d{font-family:NotoEmoji}.e{position:absolute;left:120px;top:110px;font-size:340px;line-height:1;filter:drop-shadow(0 18px 30px rgba(120,50,0,.25))}
.d{position:absolute;right:90px;top:90px;display:flex;flex-direction:column;gap:30px;font-size:120px;line-height:1;opacity:.9}
.t{position:absolute;left:120px;bottom:60px;font-size:64px;font-weight:800;line-height:1.1}
</style><div class="e">${c.emoji}</div><div class="d">${[...(c.deco || '✨🪔🌼')].filter((x) => x.trim() && x !== '\ufe0f').slice(0, 3).map((x) => `<span>${x}</span>`).join('')}</div><div class="t">${esc(c.title)}</div>`;
// Emoji: Noto Color Emoji (SIL OFL, free to use in images) — NOT the system Apple emoji, whose artwork is Apple's.
const EMOJI = join(ROOT, 'scripts/.cache/NotoColorEmoji.ttf'); // gitignored, 25 MB
if (!existsSync(EMOJI)) { mkdirSync(join(ROOT, 'scripts/.cache'), { recursive: true }); execFileSync('curl', ['-sSL', '-o', EMOJI, 'https://github.com/google/fonts/raw/main/ofl/notocoloremoji/NotoColorEmoji-Regular.ttf']); }
const TYPES = { '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/emoji.ttf') { res.writeHead(200, { 'content-type': 'font/ttf' }); return res.end(readFileSync(EMOJI)); }
  const m = u.match(/^\/card\/(\d+)$/);
  if (m) { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(html(CARDS[+m[1]])); }
  const f = join(STATIC, u);
  if (!f.startsWith(STATIC) || !existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f));
});
srv.listen(0, '127.0.0.1', async () => {
  const port = srv.address().port;
  mkdirSync(OUT, { recursive: true });
  for (const [i, c] of CARDS.entries()) { // async: the server above must keep answering Chrome
    const png = join(OUT, `${c.file}.png`), out = join(OUT, `${c.file}.jpg`);
    await run(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,675', '--virtual-time-budget=3000', `--screenshot=${png}`, `http://127.0.0.1:${port}/card/${i}`], { timeout: 30000 });
    await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', out]); // macOS built-in converter
    unlinkSync(png);
    console.log('og', c.file);
  }
  srv.close();
});
