/**
 * IndexNow: tell Bing (and so ChatGPT search / Copilot) and other IndexNow engines about new or changed pages
 * right away, instead of waiting for a crawl. User, 24 Nov 2026: "ai se v search karne par aana chahiye".
 *
 *   node scripts/indexnow.mjs --since <git-rev>   pages added or with a new <lastmod> since that commit (used by the daily release)
 *   node scripts/indexnow.mjs --all               every page in the sitemap
 *   add --dry to only print the list
 *
 * The key is public by design: build.mjs writes docs/<key>.txt containing it, which proves we own the site.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const INDEXNOW_KEY = 'cd1e4bf9a4c6afe2efb8f80621993dfe';
const HOST = 'nextgrade.in';

const parseOne = (xml) => new Map([...xml.matchAll(/<loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => [m[1], m[2] || '']));
// sitemap.xml may be an index of per-section sitemaps (since 26 Nov 2026): read them through `read(name)`
const parse = (xml, read) => {
  if (!xml.includes('<sitemapindex')) return parseOne(xml);
  const all = new Map();
  for (const m of xml.matchAll(/<loc>https?:\/\/[^/]+\/(sitemap-[^<]+\.xml)<\/loc>/g)) { try { for (const [u, d] of parseOne(read(m[1]))) all.set(u, d); } catch { /* missing part */ } }
  return all;
};

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const now = parse(readFileSync('docs/sitemap.xml', 'utf8'), (n) => readFileSync(`docs/${n}`, 'utf8'));
  let urls;
  if (args.includes('--all')) urls = [...now.keys()];
  else {
    const i = args.indexOf('--since');
    if (i < 0) { console.error('usage: --since <git-rev> | --all [--dry]'); process.exit(2); }
    let before = new Map();
    try { const show = (f) => execFileSync('git', ['show', `${args[i + 1]}:docs/${f}`], { encoding: 'utf8', maxBuffer: 64 << 20 }); before = parse(show('sitemap.xml'), show); } catch { /* no old sitemap: everything is new */ }
    urls = [...now].filter(([u, d]) => before.get(u) !== d).map(([u]) => u);
  }
  console.log(`IndexNow: ${urls.length} URL(s)`);
  if (!urls.length || dry) { urls.slice(0, 20).forEach((u) => console.log('  ' + u)); return; }
  for (let k = 0; k < urls.length; k += 10000) {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList: urls.slice(k, k + 10000) }),
    });
    console.log(`  sent ${Math.min(10000, urls.length - k)} → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? 'OK' : await res.text()}`);
  }
}
// run only when called as a script — build.mjs imports this file just for INDEXNOW_KEY
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((e) => { console.error('IndexNow failed (not fatal):', e.message); });
