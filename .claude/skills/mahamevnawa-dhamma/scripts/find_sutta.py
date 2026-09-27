#!/usr/bin/env python3
"""Search tripitaka.online.

  find_sutta.py name  <sinhala text>        list pages whose name contains the text
  find_sutta.py grep  <page id> <text>      show Pali blocks containing the text, with translation
"""
import html, json, os, re, sys, time, urllib.request

BASE = 'https://www.tripitaka.online'
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.cache')
UA = {'User-Agent': 'Mozilla/5.0 (Mahamevnawa Dhamma School UK study site)'}
ZWJ = '‍'


def fetch(path, name):
    os.makedirs(CACHE, exist_ok=True)
    f = os.path.join(CACHE, name)
    if not os.path.exists(f):
        time.sleep(0.6)
        with urllib.request.urlopen(urllib.request.Request(BASE + path, headers=UA), timeout=60) as r:
            open(f, 'wb').write(r.read())
    return json.load(open(f, encoding='utf-8'))


def blocks(page_id):
    d = fetch('/api/sutta/%s' % page_id, 'sutta_%s.json' % page_id)
    out = []
    for e in d['content']['data']:
        c = e.get('content')
        if isinstance(c, list):
            c = ' '.join(str(x.get('content', '')) if isinstance(x, dict) else str(x) for x in c)
        c = html.unescape(re.sub(r'<[^>]+>', '', str(c or ''))).replace('‌', '').replace('\xa0', ' ')
        out.append((e.get('class') or '', '\n'.join(l.strip() for l in c.split('\n') if l.strip())))
    return d['label'].strip(), out


def walk(node, path, acc):
    if isinstance(node, list):
        for n in node:
            walk(n, path, acc)
    elif isinstance(node, dict):
        p = path + [str(node.get('label', ''))]
        acc.append((node.get('data'), p))
        walk(node.get('children') or [], p, acc)


def main():
    if len(sys.argv) >= 3 and sys.argv[1] == 'name':
        acc = []
        walk(fetch('/api/tree', 'tree.json')['data'], [], acc)
        key = sys.argv[2].replace(ZWJ, '')
        for pid, p in acc:
            if pid and key in p[-1].replace(ZWJ, ''):
                print('%s  %s/sutta/%s\n      %s' % (pid, BASE, pid, ' > '.join(p)))
    elif len(sys.argv) >= 4 and sys.argv[1] == 'grep':
        label, o = blocks(sys.argv[2])
        key = sys.argv[3].replace(ZWJ, '')
        print(label, '\n')
        for i, (cls, text) in enumerate(o):
            if 'pali' in cls and key in text.replace(ZWJ, ''):
                print('--- block %d  PALI\n%s' % (i, text))
                if i + 1 < len(o) and 'sinhala' in o[i + 1][0]:
                    print('--- block %d  SINHALA\n%s\n' % (i + 1, o[i + 1][1]))
    else:
        print(__doc__)
        sys.exit(2)


if __name__ == '__main__':
    main()
