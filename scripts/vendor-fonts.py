"""Self-host Google Fonts: find every fonts.googleapis.com/css2?… link in src/ and build.mjs (plus docs/), download the
CSS (woff2, all unicode-range subsets) and the font files into src/static/fonts/, and write src/static/fonts/map.json
(query -> local css). build.mjs then swaps the Google link for /fonts/css/<id>.css on every page (no request to Google).
Run again after adding a new font somewhere:  python3 scripts/vendor-fonts.py   (needs internet; the build does not)
Fonts are SIL Open Font License (see src/static/fonts/OFL.txt)."""
import hashlib, html, json, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'static', 'fonts')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
FAM = r"[A-Za-z0-9+]+(?::wght@[0-9;]+)?"

def queries():
    qs = set()
    for base in ('src', 'docs', 'build.mjs'):
        p0 = os.path.join(ROOT, base)
        files = [p0] if os.path.isfile(p0) else [os.path.join(d, f) for d, _, fs in os.walk(p0) for f in fs if f.endswith(('.html', '.mjs', '.css', '.js'))]
        for p in files:
            s = open(p, encoding='utf8', errors='ignore').read()
            for m in re.finditer(r'https://fonts\.googleapis\.com/css2\?([^"\'`\s]+)', s):
                q = html.unescape(m.group(1))
                if '${' not in q: qs.add(q)
    # build.mjs builds its query from a template: add the real combinations used per language
    base = 'family=Inter:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700'
    for extra in ('', '&family=Noto+Sans+Bengali:wght@400;600;700'):
        for ef in ('', '&family=Baloo+2:wght@800&family=Baloo+Da+2:wght@800', '&family=Noto+Naskh+Arabic:wght@500;700'):
            qs.add(base + extra + ef + '&display=swap')
    return sorted(qs)

def get(url, binary=False):
    r = subprocess.run(['curl', '-sfL', '-A', UA, url], capture_output=True, check=True)
    return r.stdout if binary else r.stdout.decode('utf8')

def main():
    os.makedirs(os.path.join(OUT, 'files'), exist_ok=True); os.makedirs(os.path.join(OUT, 'css'), exist_ok=True)
    mp = {}
    for q in queries():
        cid = hashlib.sha1(q.encode()).hexdigest()[:12]
        css = get('https://fonts.googleapis.com/css2?' + q)
        def local(m):
            u = m.group(1); name = hashlib.sha1(u.encode()).hexdigest()[:16] + '.woff2'
            fp = os.path.join(OUT, 'files', name)
            if not os.path.exists(fp): open(fp, 'wb').write(get(u, True))
            return 'url(/fonts/files/%s)' % name
        css = re.sub(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', local, css)
        assert 'gstatic' not in css
        open(os.path.join(OUT, 'css', cid + '.css'), 'w').write('/* self-hosted, SIL OFL fonts — see /fonts/OFL.txt */\n' + css)
        mp[q] = '/fonts/css/%s.css' % cid
        print(cid, q[:100])
    json.dump(mp, open(os.path.join(OUT, 'map.json'), 'w'), indent=1, sort_keys=True)
    print(len(mp), 'stylesheets,', len(os.listdir(os.path.join(OUT, 'files'))), 'font files')

if __name__ == '__main__':
    main()
