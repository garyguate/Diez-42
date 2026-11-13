"""Check public release identity, local destinations and multilingual posters."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote, parse_qs
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    """Collect public HTML elements without third-party dependencies."""
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.nodes = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag, dict(attrs)))


def check():
    """Fail on release drift, missing assets, broken anchors or poster variants."""
    version = '.'.join(json.loads((ROOT / 'package.json').read_text())['version'].split('.')[:2])
    assert (ROOT / 'VERSION').read_text().strip() == version, 'VERSION/package identity drift'
    cache = {}

    def page(target):
        if target not in cache:
            cache[target] = Page(target.read_text())
        return cache[target]

    for name in ('index.html', 'privacy.html', 'terms.html', 'data-deletion.html', 'horario.html', 'ayuda.html', 'donar.html', 'voluntariado.html', 'aviso-legal.html', 'cookies.html'):
        target = ROOT / name
        markup = target.read_text()
        nodes = page(target).nodes
        assert set(re.findall(r'\bv(\d+\.\d+)\b', markup)) == {version}, f'{name}: visible version drift'
        ids = [attrs['id'] for _, attrs in nodes if 'id' in attrs]
        assert len(ids) == len(set(ids)), f'{name}: duplicate IDs'
        assert sum(tag == 'h1' for tag, _ in nodes) == 1, f'{name}: h1 contract'
        assert not any(attrs.get('name') == 'robots' and 'noindex' in attrs.get('content', '') for _, attrs in nodes), f'{name}: public page noindex'
        for tag, attrs in nodes:
            if tag == 'img':
                assert 'alt' in attrs, f'{name}: image alt missing'
            for key in ('href', 'src'):
                if key not in attrs:
                    continue
                url = urlsplit(attrs[key])
                if url.scheme or url.netloc:
                    continue
                destination = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else target.parent / unquote(url.path)
                if not url.path:
                    destination = target
                if destination.is_dir():
                    destination /= 'index.html'
                assert destination.is_file(), f'{name}: missing local destination {attrs[key]}'
                if url.fragment and destination.suffix == '.html':
                    assert any(item.get('id') == unquote(url.fragment) for _, item in page(destination).nodes), f'{name}: missing anchor {attrs[key]}'
                if tag in ('script', 'link') and 'v' in parse_qs(url.query):
                    assert parse_qs(url.query)['v'] == [version], f'{name}: stale asset identity'
    home = page(ROOT / 'index.html').nodes
    assert {a['data-language-option'] for _, a in home if 'data-language-option' in a} == {'en', 'es', 'pt-BR', 'de', 'ar', 'uk'}
    assert not any('data-theme-option' in a or 'data-transparency-range' in a or 'data-blur-range' in a for _, a in home)
    assert sum('data-settings-toggle' in a for _, a in home) == 1
    assert len([a for tag,a in home if 'data-cookie-choice' in a]) == 2
    posters = [a for tag, a in home if tag == 'img' and 'data-src-es' in a]
    assert len(posters) == 11, 'expected all 11 program posters'
    for image in posters:
        for language in ('en', 'es', 'pt-br', 'de'):
            assert (ROOT / image['data-src-' + language]).is_file(), f'missing {language} poster'
    sitemap = ET.parse(ROOT / 'sitemap.xml')
    locations = {item.text for item in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
    assert locations == {'https://diez42.org/' + name for name in ('', 'privacy.html', 'terms.html', 'data-deletion.html', 'horario.html', 'ayuda.html', 'donar.html', 'voluntariado.html', 'aviso-legal.html', 'cookies.html')}
    assert 'Sitemap: https://diez42.org/sitemap.xml' in (ROOT / 'robots.txt').read_text()
    print(f'Release QA passed: v{version}, public links/assets, settings, 44 posters, crawler files.')


if __name__ == '__main__':
    check()
