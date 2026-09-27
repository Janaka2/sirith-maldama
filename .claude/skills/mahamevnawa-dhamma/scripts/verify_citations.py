#!/usr/bin/env python3
"""Check every citation on the site against the live approved sources.

Fails (exit 1) if any quotation is not found word for word, any link is broken,
or any link in the citation data points outside the approved sites.
Use --offline to check only structure and approved domains.
"""
import html, json, os, re, sys, time, urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..'))
REFS = os.path.join(ROOT, 'assets', 'js', 'refs.js')
APPROVED = ('tripitaka.online', 'mahamevnawa.lk', 'mahamegha.lk')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36'}


def norm(s):
    s = html.unescape(re.sub(r'<[^>]+>', '', s)).replace('‌', '').replace('‍', '').replace('\xa0', ' ')
    return re.sub(r'\s+', ' ', s).strip()


def get(url):
    time.sleep(0.6)
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.status, r.read().decode('utf-8', 'ignore')


def approved(url):
    host = re.sub(r'^https?://(www\.)?', '', url).split('/')[0]
    return host in APPROVED


def main():
    offline = '--offline' in sys.argv
    raw = open(REFS, encoding='utf-8').read()
    data = json.loads(raw[raw.index('window.SM_REFS = ') + len('window.SM_REFS = '):].rstrip().rstrip(';'))
    lib, errors, checked = data['lib'], [], 0

    for part, poems in data['map'].items():
        for n, keys in poems.items():
            for k in keys:
                if k not in lib:
                    errors.append('part %s poem %s uses unknown passage %s' % (part, n, k))
    for part, poems in data['amap'].items():
        for n, keys in poems.items():
            for k in keys:
                if k not in data['articles']:
                    errors.append('part %s poem %s uses unknown article %s' % (part, n, k))
    for url in [v['url'] for v in lib.values()] + [a['url'] for a in data['articles'].values()] + [s['url'] for s in data['sources']]:
        if not approved(url):
            errors.append('link outside approved sources: ' + url)

    if not offline:
        pages = {}
        for k, v in sorted(lib.items()):
            pid = v['id']
            if v['url'] != 'https://www.tripitaka.online/sutta/%s' % pid:
                errors.append('%s: link does not match page id' % k)
            if pid not in pages:
                try:
                    status, body = get('https://www.tripitaka.online/api/sutta/%s' % pid)
                    d = json.loads(body)
                    text = []
                    for e in d['content']['data']:
                        c = e.get('content')
                        if isinstance(c, list):
                            c = ' '.join(str(x.get('content', '')) if isinstance(x, dict) else str(x) for x in c)
                        text.append(norm(str(c or '')))
                    pages[pid] = ' '.join(text)
                except Exception as ex:
                    errors.append('%s: cannot load page %s (%s)' % (k, pid, ex))
                    pages[pid] = None
            page = pages[pid]
            if page is None:
                continue
            for field in ('pali', 'si'):
                q = norm(v.get(field) or '')
                if not q:
                    continue
                checked += 1
                if q not in page:
                    errors.append('%s: %s text is NOT on the page word for word' % (k, field))
        for k, a in sorted(data['articles'].items()):
            try:
                status, body = get(a['url'])
                checked += 1
                title = norm(re.findall(r'<title[^>]*>(.*?)</title>', body, re.S)[0])
                want = norm(a['title']).rstrip('.')
                if status != 200:
                    errors.append('article %s returned %s' % (k, status))
                elif want[:18] not in title:
                    errors.append('article %s title differs: "%s"' % (k, title))
            except Exception as ex:
                errors.append('article %s cannot be opened (%s)' % (k, ex))

    cited = sum(len(p) for p in data['map'].values())
    print('passages in library : %d' % len(lib))
    print('poems with Buddha-word: %d' % cited)
    print('article links        : %d' % len(data['articles']))
    print('checks run           : %d%s' % (checked, ' (offline, quotations not re-checked)' if offline else ''))
    if errors:
        print('\nFAILED')
        for e in errors:
            print('  - ' + e)
        sys.exit(1)
    print('\nOK: every quotation and link matches the approved sources.')


if __name__ == '__main__':
    main()
