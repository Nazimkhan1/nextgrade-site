// Prerender: the game and animated-wish pages fill their text (about, how to play, links)
// with JavaScript, so the HTML that crawlers fetch is almost empty. After `node build.mjs`
// this opens each of those pages in headless Chrome (Hindi, ?lang=hi) and writes the text
// that JavaScript put into empty, visible elements back into docs/ — the same text a
// visitor sees. On load the page's own script fills those elements again in the visitor's
// language, so nothing changes for people. No npm packages: Chrome's --dump-dom + node http.
//
//   node scripts/prerender.mjs          (build.mjs runs it at the end when Chrome is present)
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { execFile } from 'node:child_process';

const OUT = 'docs';
const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean).find((p) => existsSync(p));
const FOLDERS = ['celebrate', 'games', 'tools'];
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const SKIP_TAGS = new Set(['canvas', 'script', 'style', 'select', 'svg', 'textarea', 'button', 'option']);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.ico': 'image/x-icon', '.jpg': 'image/jpeg' };
const MARK = 'data-prerendered';

// one level (games/<slug>/), plus tool sub-pages (tools/<slug>/<page>/)
const pages = () => FOLDERS.filter((f) => existsSync(join(OUT, f))).flatMap((f) => readdirSync(join(OUT, f), { withFileTypes: true }).filter((d) => d.isDirectory())
  .flatMap((d) => [d.name, ...(f === 'tools' ? readdirSync(join(OUT, f, d.name), { withFileTypes: true }).filter((c) => c.isDirectory()).map((c) => `${d.name}/${c.name}`) : [])])
  .filter((rel) => existsSync(join(OUT, f, rel, 'index.html')))
  .map((rel) => `/${f}/${rel}/`));

const serve = () => new Promise((resolve) => {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = join(OUT, path.endsWith('/') ? path + 'index.html' : path);
    return existsSync(file)
      ? (res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' }), res.end(readFileSync(file)))
      : (res.writeHead(404), res.end());
  });
  server.listen(0, '127.0.0.1', () => resolve(server));
});

// Rendered DOM from headless Chrome, in a throwaway profile so no saved language leaks in.
const dump = (url) => {
  const profile = mkdtempSync(join(tmpdir(), 'ng-prerender-'));
  return new Promise((resolve, reject) => { const child = execFile(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--mute-audio', `--user-data-dir=${profile}`,
    '--lang=hi', '--virtual-time-budget=6000',
    // no ad or analytics requests from the prerender run
    '--host-resolver-rules=MAP pagead2.googlesyndication.com ~NOTFOUND, MAP *.googlesyndication.com ~NOTFOUND, MAP static.cloudflareinsights.com ~NOTFOUND, MAP cloudflareinsights.com ~NOTFOUND, MAP *.doubleclick.net ~NOTFOUND, MAP www.googletagmanager.com ~NOTFOUND, MAP *.google-analytics.com ~NOTFOUND, MAP *.analytics.google.com ~NOTFOUND', '--dump-dom', url,
  ], { maxBuffer: 64 * 1024 * 1024, timeout: 60000 }, (err, stdout) => {
    // Chrome 158+ prints the DOM but does not always exit afterwards; then we kill it ourselves (below) and still use the output
    if (stdout && /<\/html>\s*$/i.test(stdout)) resolve(stdout); else if (err) reject(err); else resolve(stdout);
  });
    let buf = ''; child.stdout.on('data', (d) => { buf += d; if (/<\/html>\s*$/i.test(buf)) setTimeout(() => child.kill(), 200); });
  }).finally(() => rmSync(profile, { recursive: true, force: true }));
};

// Walks the tags of an HTML string; for each element with an id (or data-i18n key) reports its tag, where its
// content starts/ends, and whether it (or a parent) is hidden.
const elements = (html) => {
  const found = new Map();
  const stack = [];
  const re = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?([a-zA-Z][\w-]*)([^>]*)>/g;
  const isHidden = (attrs) => /\shidden(\s|=|$)/.test(attrs) || /\bclass="[^"]*\bhidden\b/.test(attrs) || /display\s*:\s*none/.test(attrs);
  const close = (tag, at) => {
    const i = stack.map((s) => s.tag).lastIndexOf(tag);
    return i < 0 ? null : stack.splice(i).forEach((s) => s.id && !found.has(s.id) && found.set(s.id, { ...s, end: at }));
  };
  const step = (m) => {
    const [whole, , tagRaw, attrs = ''] = m;
    const tag = (tagRaw || '').toLowerCase();
    return !tag ? null
      : whole.startsWith('</') ? close(tag, m.index)
        : VOID.has(tag) || whole.endsWith('/>') ? null
          : stack.push({ tag, id: (attrs.match(/\sid="([^"]+)"/) || [])[1] || ((m2) => m2 && `i18n:${m2[1]}`)(attrs.match(/\sdata-(?:i18n|t)="([^"]+)"/)), start: m.index + whole.length, hidden: isHidden(attrs) || stack.some((s) => s.hidden) });
  };
  [...html.matchAll(re)].forEach(step);
  return found;
};

const words = (s) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

const prerender = (base, path) => {
  const file = join(OUT, path, 'index.html');
  const src = readFileSync(file, 'utf8');
  return src.includes(MARK) ? Promise.resolve({ path, skipped: 'already' }) : dump(`${base}${path}?lang=hi`).then((dom) => {
    const own = elements(src);
    const rendered = elements(dom);
    const fills = [...own.values()]
      .filter((e) => !SKIP_TAGS.has(e.tag) && !e.hidden && src.slice(e.start, e.end).trim() === '')
      .map((e) => ({ e, r: rendered.get(e.id) }))
      .filter(({ r }) => r && !r.hidden)
      .map(({ e, r }) => ({ e, inner: dom.slice(r.start, r.end).trim() }))
      .filter(({ inner }) => words(inner) > 0)
      // innermost wins: drop a fill whose element contains another fill
      .filter(({ e }, _, all) => !all.some((o) => o.e !== e && o.e.start > e.start && o.e.end <= e.end));
    const out = fills
      .sort((a, b) => b.e.start - a.e.start)
      .reduce((html, { e, inner }) => html.slice(0, e.start) + inner + html.slice(e.end), src)
      .replace(/<html\b/, `<html ${MARK}="hi"`);
    writeFileSync(file, out);
    return { path, ids: fills.map((f) => f.e.id), added: fills.reduce((n, f) => n + words(f.inner), 0) };
  });
};

const run = () => (!CHROME
  ? Promise.resolve(console.warn('prerender: Chrome not found (set CHROME_PATH) — skipped'))
  : serve().then((server) => {
    const base = `http://127.0.0.1:${server.address().port}`;
    return pages()
      .reduce((p, path) => p.then((acc) => prerender(base, path)
        .catch((err) => ({ path, error: String(err.message || err).slice(0, 120) }))
        .then((r) => [...acc, r])), Promise.resolve([]))
      .then((results) => results.forEach((r) => console.log('prerender', r.path, r.error ? `ERROR ${r.error}` : r.skipped ? 'skipped' : `+${r.added} words (${r.ids.join(', ')})`)))
      .finally(() => server.close());
  }));

export default run;

if (import.meta.url === `file://${process.argv[1]}`) run().catch((e) => { console.error(e); process.exitCode = 1; });
