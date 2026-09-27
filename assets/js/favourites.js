/* Favourites — a small reusable module for this site and for future lessons.

   It knows nothing about poems. Any lesson can save any item.

   HOW TO USE IN A NEW LESSON
   1. Include this file:            <script src="assets/js/favourites.js"></script>
   2. Describe the item:            var item = { type: 'jataka', id: '12', title: '…', url: '#/jataka/12', icon: '📖', group: 'ජාතක කථා' };
   3. Put a heart button in HTML:   html += Favourites.button(item);
   4. Turn on clicks once:          Favourites.bind(document.body);
   5. Optional, for a picture:      Favourites.registerType('jataka', { thumb: function (item) { return '<img …>'; } });
   6. Optional, to react:           Favourites.onChange(function (list, changed, isOn) { … });

   An item needs `type`, `id`, `title` and `url`. `icon`, `group` and `sub` are optional.
   Everything is kept in this browser only, under one key shared by all lessons. */
(function (global) {
  'use strict';
  var KEY = 'daham.favourites.v1';
  var listeners = [], types = {}, cache = null;

  function load() {
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { cache = []; }
    if (!Array.isArray(cache)) cache = [];
    cache = cache.filter(function (x) { return x && x.type && x.id !== undefined && x.title && x.url; });
    return cache;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) { /* private mode: keep in memory */ } }
  function keyOf(item) { return typeof item === 'string' ? item : item.type + ':' + item.id; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function find(k) { var l = load(); for (var i = 0; i < l.length; i++) if (keyOf(l[i]) === k) return i; return -1; }
  function emit(item, isOn) { listeners.forEach(function (f) { try { f(list(), item, isOn); } catch (e) { /* ignore */ } }); }

  function has(item) { return find(keyOf(item)) !== -1; }
  function add(item) {
    if (has(item)) return false;
    load().unshift({ type: String(item.type), id: String(item.id), title: String(item.title), url: String(item.url), icon: item.icon || '', group: item.group || '', sub: item.sub || '', at: Date.now() });
    save(); emit(item, true); return true;
  }
  function remove(item) {
    var i = find(keyOf(item)); if (i === -1) return false;
    var gone = load().splice(i, 1)[0]; save(); emit(gone, false); return true;
  }
  function toggle(item) { if (has(item)) { remove(item); return false; } add(item); return true; }
  function list(type) { return load().filter(function (x) { return !type || x.type === type; }).slice(); }
  function count(type) { return list(type).length; }
  function clear(type) { cache = load().filter(function (x) { return type && x.type !== type; }); save(); emit(null, false); }
  function onChange(fn) { listeners.push(fn); }
  function registerType(type, def) { types[type] = def || {}; }
  function thumb(item) { var t = types[item.type]; return t && t.thumb ? t.thumb(item) : '<span class="fav-icon" aria-hidden="true">' + esc(item.icon || '❤️') + '</span>'; }

  /* the heart button, as an HTML string */
  function button(item, opts) {
    opts = opts || {};
    var on = has(item);
    return '<button type="button" class="fav-btn' + (on ? ' on' : '') + (opts.small ? ' small' : '') + (opts.label ? ' with-label' : '') + '" data-fav="' + esc(JSON.stringify({ type: item.type, id: item.id, title: item.title, url: item.url, icon: item.icon || '', group: item.group || '', sub: item.sub || '' })) + '"' +
      ' aria-pressed="' + on + '" aria-label="' + esc((on ? 'ප්‍රියතම වලින් ඉවත් කරන්න: ' : 'ප්‍රියතම වලට එක් කරන්න: ') + item.title) + '" title="' + (on ? 'ප්‍රියතම වලින් ඉවත් කරන්න' : 'ප්‍රියතම වලට එක් කරන්න') + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.300 2 4.500 5.700 4.500c2.100 0 3.500 1.100 4.300 2.300.8-1.200 2.200-2.300 4.300-2.300 3.700 0 5.400 3.800 3.700 7.200C19.500 16.400 12 21 12 21z"/></svg>' +
      (opts.label ? '<span class="fav-label">' + (on ? 'ප්‍රියතමයි' : 'ප්‍රියතම කරන්න') + '</span>' : '') + '</button>';
  }
  /* repaint every heart for one item, anywhere on the page */
  function paint(root, item) {
    var k = keyOf(item), on = has(item);
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-fav]'), function (b) {
      var d; try { d = JSON.parse(b.getAttribute('data-fav')); } catch (e) { return; }
      if (keyOf(d) !== k) return;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
      b.setAttribute('title', on ? 'ප්‍රියතම වලින් ඉවත් කරන්න' : 'ප්‍රියතම වලට එක් කරන්න');
      b.setAttribute('aria-label', (on ? 'ප්‍රියතම වලින් ඉවත් කරන්න: ' : 'ප්‍රියතම වලට එක් කරන්න: ') + d.title);
      var l = b.querySelector('.fav-label'); if (l) l.textContent = on ? 'ප්‍රියතමයි' : 'ප්‍රියතම කරන්න';
      if (on) { b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); }
    });
  }
  /* one click handler for a whole page */
  function bind(root) {
    root = root || document;
    if (root.__favBound) return; root.__favBound = true;
    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-fav]') : null;
      if (!b) return;
      e.preventDefault(); e.stopPropagation();
      var d; try { d = JSON.parse(b.getAttribute('data-fav')); } catch (err) { return; }
      toggle(d); paint(document, d);
    });
  }
  /* other tabs of the same site stay in step */
  global.addEventListener('storage', function (e) { if (e.key === KEY) { cache = null; emit(null, false); } });

  global.Favourites = { add: add, remove: remove, toggle: toggle, has: has, list: list, count: count, clear: clear, onChange: onChange, registerType: registerType, thumb: thumb, button: button, bind: bind, paint: paint, keyOf: keyOf };
})(window);
