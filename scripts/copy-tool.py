"""Copy a tool from the private nextgrade-tools repo into src/static/tools/<slug>/.

Usage:  python3 scripts/copy-tool.py form-helper [passport-photo ...]
Expects ../nextgrade-tools next to this repo (pull it first). Every index.html in the tool (also
sub-pages like form-helper/ssc/) gets the site's canonical link, the AdSense tag, the brand linking to
/tools/ and the footer links. Remember to bump the tool's CACHE in its sw.js when files change.
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(os.path.dirname(ROOT), 'nextgrade-tools')
DST = os.path.join(ROOT, 'src', 'static', 'tools')
ADS = ('<meta name="google-adsense-account" content="ca-pub-4135041725422483">\n'
       '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4135041725422483" crossorigin="anonymous"></script>\n')
FOOT = ('<br><a href="https://nextgrade.in/tools/">More free tools</a> · <a href="https://nextgrade.in/about/">About</a> · '
        '<a href="https://nextgrade.in/contact/">Contact</a> · <a href="https://nextgrade.in/privacy-policy/">Privacy Policy</a> · '
        '<a href="https://nextgrade.in/terms/">Terms</a>')

for slug in sys.argv[1:]:
    d = os.path.join(DST, slug)
    if os.path.exists(d):
        shutil.rmtree(d)
    shutil.copytree(os.path.join(SRC, slug), d, ignore=shutil.ignore_patterns('README.md', '.DS_Store', '__*', '*.py'))
    for dirpath, _, files in os.walk(d):
        if 'index.html' not in files:
            continue
        p = os.path.join(dirpath, 'index.html')
        rel = os.path.relpath(dirpath, DST).replace(os.sep, '/')
        s = open(p, encoding='utf8').read()
        m = re.search(r'<link rel="manifest" href="[^"]*">', s)
        assert m, p
        s = s.replace(m.group(0), '<link rel="canonical" href="https://nextgrade.in/tools/%s/">\n%s%s' % (rel, ADS, m.group(0)), 1)
        s = re.sub(r'<a class="brand" href="\.{1,2}/">', '<a class="brand" href="https://nextgrade.in/tools/">', s, count=1)
        s = s.replace('<span data-t="footer"></span></footer>', '<span data-t="footer"></span>' + FOOT + '</footer>', 1)
        assert 'google-adsense-account' in s and 'tools/%s/"' % rel in s and 'privacy-policy' in s, p
        open(p, 'w', encoding='utf8').write(s)
        print('  ', rel)
