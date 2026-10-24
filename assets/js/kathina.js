/* කඨින චීවර පූජාව — a lesson page (kathina.html).

   Three kinds of material are kept apart on purpose, because they do not carry the
   same weight:

   1. Buddha-word. Pulled from assets/js/refs.js by key and never typed here, so
      verify_citations.py governs every word of it.
   2. Vinaya practice — one kathina a year, one per monastery, saṅghika only. These
      belong to the Vinaya Pitaka, which tripitaka.online does not carry, so the page
      takes them from three mahamegha.lk articles and says on the page that it did.
   3. What a child can do on the day. Custom and common sense; marked as such.

   Like the other lessons the test is NOT gamified. The plain result reaches the
   teacher's sheet under the same class codes if the child has joined. */
(function (global) {
  'use strict';

  var REFS = global.SM_REFS, Trk = global.Tracker, LESSON = 'kathina', ITEM = 'kathina';
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  var toastT = null;
  function toast(msg) {
    var el = $('toast'); if (!el) return;
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  /* ---------- citations ---------- */
  function refHtml(r) {
    var pali = r.pali ? '<p class="pali" lang="pi">' + r.pali.split('\n').map(esc).join('<br>') + '</p>' : '';
    var si = (r.pre ? '… ' : '') + r.si.split('\n').map(esc).join('<br>') + (r.more ? ' …' : '');
    return '<div class="ref"><div class="ref-head"><b>' + esc(r.ref) + '</b><span>' + esc(r.coll) + '</span></div>' + pali +
      '<blockquote class="ref-si' + (r.verse ? ' verse-si' : '') + '" lang="si">' + si + '</blockquote>' +
      '<a class="ref-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">tripitaka.online හි සම්පූර්ණයෙන් කියවන්න ↗</a></div>';
  }
  function refCard(key) {
    var r = REFS && REFS.lib ? REFS.lib[key] : null;
    if (!r) return '';
    return '<section class="card dhamma-card"><div class="card-tag">☸ බුදුරජාණන් වහන්සේ වදාළ දහම</div>' +
      refHtml(r) + '<p class="ref-by">සිංහල පරිවර්තනය: අතිපූජ්‍ය කිරිබත්ගොඩ ඤාණානන්ද ස්වාමීන් වහන්සේ</p></section>';
  }
  function fillRefs() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ref]'), function (el) {
      el.innerHTML = refCard(el.dataset.ref);
    });
  }

  /* ---------- pictures ----------
     Drawn here rather than photographed: the robe, the tray, the monastery and the
     moon. No figure of the Buddha and no monks are drawn. */
  var MOON = '<circle cx="%x" cy="%y" r="%r" fill="#fff8e1" stroke="#f3d58a" stroke-width="3"/>';
  function moon(x, y, r) { return MOON.replace('%x', x).replace('%y', y).replace('%r', r); }
  function robe(x, y, s) {   /* a folded robe on a tray */
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M-46,18 h92 l-10,16 h-72 z" fill="#f6d59a" stroke="#b45309" stroke-width="4" stroke-linejoin="round"/>' +
      '<rect x="-40" y="-14" width="80" height="32" rx="6" fill="#fb923c" stroke="#c2410c" stroke-width="4"/>' +
      '<rect x="-34" y="-32" width="68" height="22" rx="6" fill="#f97316" stroke="#c2410c" stroke-width="4"/>' +
      '<path d="M-34,-21 h68 M-40,2 h80" stroke="#c2410c" stroke-width="2.5" opacity=".65"/>' +
      '</g>';
  }
  function stupa(x, y, s) {   /* two base slabs, dome, harmika, spire — read it bottom up */
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-36" y="8" width="72" height="9" rx="3" fill="#fffaf0" stroke="#b45309" stroke-width="4"/>' +
      '<rect x="-29" y="-1" width="58" height="9" rx="3" fill="#fffaf0" stroke="#b45309" stroke-width="4"/>' +
      '<path d="M-25,-1 a25,25 0 0 1 50,0 z" fill="#fffaf0" stroke="#b45309" stroke-width="4" stroke-linejoin="round"/>' +
      '<rect x="-8" y="-35" width="16" height="10" rx="2" fill="#fffaf0" stroke="#b45309" stroke-width="3.5"/>' +
      '<path d="M0,-35 v-13" stroke="#b45309" stroke-width="3.5" stroke-linecap="round"/>' +
      '<circle cx="0" cy="-51" r="3.5" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>' +
      '</g>';
  }
  function bodhi(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M0,0 q22,-16 30,6 q7,22 -14,34 q-20,-6 -16,-40 z" fill="#86efac" stroke="#15803d" stroke-width="3"/>' +
      '<path d="M14,36 q0,-22 10,-32" fill="none" stroke="#15803d" stroke-width="2.5"/></g>';
  }
  function lotus(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M0,0 q-18,-6 -24,-20 q16,-4 24,8 q8,-12 24,-8 q-6,14 -24,20 z" fill="#f9a8d4" stroke="#be185d" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M0,0 q-8,-16 0,-28 q8,12 0,28 z" fill="#fbcfe8" stroke="#be185d" stroke-width="2.5"/></g>';
  }

  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="පෙරහැරකින් වඩමවාගෙන එන කඨින චීවරය">' +
      moon(252, 52, 30) +
      '<circle cx="152" cy="128" r="98" fill="#fff4ea" opacity=".75"/>' +
      stupa(66, 198, .78) +
      bodhi(246, 92, .85) +
      /* the canopy the robe is carried under */
      '<path d="M152,84 L228,116 H76 Z" fill="#fde68a" stroke="#b45309" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<rect x="84" y="114" width="136" height="11" rx="5" fill="#fbbf24" stroke="#b45309" stroke-width="3.5"/>' +
      '<path d="M152,84 v-14" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="152" cy="66" r="4.5" fill="#fbbf24" stroke="#b45309" stroke-width="2.5"/>' +
      '<g fill="#f9a8d4" stroke="#be185d" stroke-width="2"><circle cx="104" cy="134" r="5"/><circle cx="152" cy="138" r="5"/><circle cx="200" cy="134" r="5"/></g>' +
      robe(166, 176, 1) +
      lotus(246, 208, .8) +
      '<path d="M22,216 H298" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/>' +
      '<g fill="#fbbf24"><circle cx="34" cy="56" r="6"/><circle cx="296" cy="146" r="5"/><circle cx="24" cy="150" r="5"/></g>' +
      '</svg>';
  }

  function artEsala() {   /* the full moon of Esala and the invitation */
    return '<svg viewBox="0 0 300 220" role="img" aria-label="ඇසළ පුන් පොහොය දින වස් ආරාධනාව">' +
      moon(228, 50, 32) +
      '<path d="M54,118 L150,58 L246,118 Z" fill="#f6d59a" stroke="#b45309" stroke-width="5" stroke-linejoin="round"/>' +
      '<rect x="78" y="116" width="144" height="76" rx="8" fill="#fffaf0" stroke="#b45309" stroke-width="5"/>' +
      /* the invitation, a folded letter with a lotus on it */
      '<rect x="116" y="134" width="68" height="44" rx="6" fill="#fff7ed" stroke="#c2410c" stroke-width="4"/>' +
      '<path d="M116,138 L150,160 L184,138" fill="none" stroke="#c2410c" stroke-width="3.5"/>' +
      lotus(150, 134, .62) +
      '<path d="M30,196 H270" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/></svg>';
  }
  function artVas() {   /* the rains, and the monastery where they stay */
    return '<svg viewBox="0 0 300 220" role="img" aria-label="වැසි කාලයේ තුන් මාසය එක් තැනක වාසය">' +
      '<g fill="#cbd5e1" stroke="#94a3b8" stroke-width="3">' +
      '<ellipse cx="96" cy="44" rx="40" ry="22"/><ellipse cx="146" cy="36" rx="30" ry="18"/><ellipse cx="192" cy="46" rx="34" ry="20"/></g>' +
      '<g stroke="#60a5fa" stroke-width="4" stroke-linecap="round">' +
      '<path d="M78,74 l-8,20 M108,72 l-8,22 M140,76 l-8,20 M172,72 l-8,22 M204,76 l-8,20"/></g>' +
      '<path d="M66,130 L150,80 L234,130 Z" fill="#f6d59a" stroke="#b45309" stroke-width="5" stroke-linejoin="round"/>' +
      '<rect x="92" y="128" width="116" height="66" rx="8" fill="#fffaf0" stroke="#b45309" stroke-width="5"/>' +
      '<path d="M138,194 v-36 h24 v36" fill="#fff4ea" stroke="#b45309" stroke-width="4"/>' +
      bodhi(238, 120, .72) +
      '<path d="M30,198 H270" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/></svg>';
  }
  function artPavarana() {   /* "tell me my faults": seats facing one another round a lamp */
    return '<svg viewBox="0 0 300 220" role="img" aria-label="වස් පවාරණය — එකිනෙකාගෙන් වැරදි විමසීම">' +
      moon(246, 46, 28) +
      '<ellipse cx="150" cy="140" rx="104" ry="54" fill="#fff4ea" stroke="#fed7aa" stroke-width="4"/>' +
      '<g fill="#fb923c" stroke="#c2410c" stroke-width="3.5">' +
      '<rect x="52" y="120" width="30" height="22" rx="6"/><rect x="134" y="92" width="30" height="22" rx="6"/>' +
      '<rect x="218" y="120" width="30" height="22" rx="6"/><rect x="134" y="162" width="30" height="22" rx="6"/></g>' +
      /* the lamp in the middle */
      '<path d="M150,146 q-14,-7 -14,-19 q0,-11 14,-24 q14,13 14,24 q0,12 -14,19 z" fill="#fbbf24" stroke="#b45309" stroke-width="3.5"/>' +
      '<circle cx="150" cy="124" r="4.5" fill="#fff8ec"/>' +
      '<g stroke="#c2410c" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8">' +
      '<path d="M88,128 q28,-14 44,-20 M212,128 q-28,-14 -44,-20 M150,158 v-6"/></g></svg>';
  }
  function artCheewara() {   /* the robe month: moon to moon, and cloth being sewn */
    return '<svg viewBox="0 0 300 220" role="img" aria-label="චීවර මාසය — වප් පෝයේ සිට ඉල් පෝය දක්වා">' +
      moon(56, 48, 26) + moon(244, 48, 26) +
      '<path d="M88,48 H212" stroke="#f3d58a" stroke-width="5" stroke-dasharray="8 10" stroke-linecap="round"/>' +
      '<text x="150" y="40" text-anchor="middle" font-size="17" font-weight="800" fill="#9a3412">චීවර මාසය</text>' +
      /* cloth with the field-of-Magadha panels */
      '<rect x="72" y="100" width="156" height="84" rx="10" fill="#fb923c" stroke="#c2410c" stroke-width="5"/>' +
      '<g stroke="#ffedd5" stroke-width="3.5" opacity=".9">' +
      '<path d="M124,100 v84 M176,100 v84 M72,128 h156 M72,156 h156"/></g>' +
      /* needle and thread */
      '<path d="M236,92 q22,20 8,44" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M238,86 l10,10" stroke="#64748b" stroke-width="4" stroke-linecap="round"/></svg>';
  }
  function artKathina() {   /* the offering itself */
    return '<svg viewBox="0 0 300 220" role="img" aria-label="කඨින චීවරය සංඝයාට පූජා කිරීම">' +
      '<circle cx="150" cy="112" r="92" fill="#fff4ea" opacity=".8"/>' +
      '<path d="M150,62 L238,104 H62 Z" fill="#fde68a" stroke="#b45309" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<rect x="70" y="102" width="160" height="11" rx="5" fill="#fbbf24" stroke="#b45309" stroke-width="3.5"/>' +
      '<path d="M150,62 v-14" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="150" cy="44" r="4.5" fill="#fbbf24" stroke="#b45309" stroke-width="2.5"/>' +
      robe(150, 142, 1.15) +
      /* two hands offering from below */
      '<path d="M92,196 q14,-26 36,-18 M208,196 q-14,-26 -36,-18" fill="none" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>' +
      lotus(60, 182, .8) + lotus(240, 182, .8) +
      '<g fill="#fbbf24"><circle cx="46" cy="66" r="6"/><circle cx="254" cy="66" r="6"/></g></svg>';
  }

  /* ---------- the five steps, Esala to Kathina ---------- */
  var STEPS = [
    { tab: '🌕 ඇසළ පෝය', when: 'ඇසළ පුන් පොහොයට පසු දින', art: artEsala,
      head: 'වස් ආරාධනාව',
      text: 'ඇසළ පුන් පොහොය දවසට <b>පසු දින</b> ඉඳලා ස්වාමීන් වහන්සේලා තුන් මාසයක් එක තැනක වැඩ ඉන්න පටන් ගන්නවා. ඒකට කියන්නේ <b>වස් විසීම</b> කියලා.<br>' +
            'ඊට කලින් ගිහි පින්වත්තු පන්සලට ගිහින් <b>වස් ආරාධනා</b> කරනවා — “ස්වාමීන් වහන්ස, මේ තුන් මාසය අපේ පන්සලේ වස් වඩින්න” කියලා. වැසි කාලයට පොරවන්න <b>වැසි සළුවකුත්</b> පූජා කරනවා.',
      refs: [] },

    { tab: '🌧️ වස් තුන් මාසය', when: 'ඇසළ සිට වප් දක්වා', art: artVas,
      head: 'තුන් මාසයක් එක තැනක',
      text: 'අවුරුද්ද පුරාම ස්වාමීන් වහන්සේලා ගමින් ගමට වැඩියේ දහම බෙදා දෙන්නයි. ඒත් වැසි කාලයේ ඒ ගමන අමාරුයි. ඒ නිසා භාග්‍යවතුන් වහන්සේ <b>වැසි කාලයේ එක තැනක වාසය කරන්න</b> අනුදැන වදාළා.<br>' +
            'ඒ තුන් මාසේ ස්වාමීන් වහන්සේලා වෙනදාට වඩා වැඩි වීර්යයකින් භාවනා කරනවා, පිළිවෙත් පුරනවා. ගිහි පින්වත්තු දානෙන්, බෙහෙතෙන්, පිරිකරෙන් උපස්ථාන කරනවා; දහම් අහනවා.',
      refs: [] },

    { tab: '🌕 වප් පෝය', when: 'වප් පුන් පොහොය', art: artPavarana,
      head: 'වස් පවාරණය — “මගේ වැරැද්ද මට කියන්න!”',
      text: 'තුන් මාසේ අවසානයේ ස්වාමීන් වහන්සේලා හැමෝම එකතු වෙනවා. එතකොට එක එක උතුමාණන් අනිත් අය වෙතින් මෙහෙම ඉල්ලා සිටිනවා: “මේ වස් කාලය තුළ මගේ කයින්, වචනයෙන්, සිතින් වැරැද්දක් <b>ඔබ දැක්කා නම්, ඇහුවා නම්, සැකයක් ඇති වුණා නම් — මට කියන්න!</b>”<br>' +
            'ඒකට කියන්නේ <b>පවාරණය</b> කියලා. බලන්නකෝ! තමන්ගේ වැරැද්ද කියන්න කියලා තමන්මයි ආරාධනා කරන්නේ. මේ වගේ ලස්සන ගුණයක් තියෙන්නේ බුදු සසුනේ විතරයි.',
      refs: ['RAHULA_CONFESS'] },

    { tab: '🧵 චීවර මාසය', when: 'වප් පෝයට පසු දින සිට ඉල් පෝය දක්වා', art: artCheewara,
      head: 'පිනෙන් පිරෙන චීවර මාසය',
      text: 'වප් පුර පසළොස්වක පෝයට <b>පසු දින</b> ඉඳලා <b>ඉල් පුර පසළොස්වක පෝය</b> දක්වා කාලයට කියන්නේ <b>චීවර මාසය</b> කියලා.<br>' +
            'ලංකාව පුරාත්, ලෝකය පුරාත් කඨින පින්කම් පවත්වන්නේ මේ එක මාසය ඇතුළතයි. කඨිනය බවට පත් වෙන්නේ <b>තුන් සිවුරෙන් එක් සිවුරකට ප්‍රමාණවත් වස්ත්‍රයක්</b>.',
      refs: [] },

    { tab: '🧡 කඨින පූජාව', when: 'චීවර මාසය තුළ එක් දිනක', art: artKathina,
      head: 'කඨින චීවර පූජාව',
      text: 'සැදැහැවත් පින්වත්තු චීවරය <b>සංඝයාට</b> පූජා කරනවා — කිසිම ස්වාමීන් වහන්සේ නමකට පෞද්ගලිකව නෙවෙයි.<br>' +
            'ඊට පස්සේ <b>සංඝයා වහන්සේලාමයි</b> විනය කර්මයකින් එක් උතුමාණන් නමක් තෝරලා ඒ උතුමාණන්ට චීවරය පූජා කරන්නේ. අනිත් හැම ස්වාමීන් වහන්සේ නමක්ම “<b>සාදු!</b>” කියලා අනුමෝදන් වෙනවා.',
      refs: ['DAK_SANGHE'] }
  ];

  var step = 0;
  function paintStep() {
    var s = STEPS[step];
    $('stepPic').innerHTML = s.art();
    $('stepWhen').textContent = s.when;
    $('stepHead').innerHTML = esc(s.head);
    $('stepText').innerHTML = s.text;
    $('stepRefs').innerHTML = s.refs.map(refCard).join('');
    Array.prototype.forEach.call($('stepTabs').children, function (b, i) {
      b.classList.toggle('on', i === step);
      b.setAttribute('aria-selected', i === step ? 'true' : 'false');
    });
  }
  function buildSteps() {
    $('stepTabs').innerHTML = STEPS.map(function (s, i) {
      return '<button class="bowl-tab" type="button" role="tab" data-s="' + i + '" aria-selected="false">' + esc(s.tab) + '</button>';
    }).join('');
    $('stepTabs').addEventListener('click', function (e) {
      var b = e.target.closest('.bowl-tab'); if (!b) return;
      step = +b.dataset.s; paintStep();
    });
    paintStep();
  }

  /* ---------- the three states of mind of the giver ---------- */
  var CET = [
    { key: 'before', emo: '🌤️', name: 'කලින්', sub: 'පූජාවට කලින්',
      head: 'දානයට කලින් ම සිත සතුටු කරගන්නවා',
      body: '<p>කඨින පින්කමක් ළං වෙනකොට සමහර වෙලාවට හිතට එන්නේ “අපොයි මේ වියදම”, “මට ඒකට වෙලාවක් නෑ” වගේ දේවල්. එහෙම හිතුවොත් <b>පින පටන් ගන්න කලින්ම</b> පොඩ්ඩක් කිලිටි වෙනවා.</p>' +
            '<p>ඒ වෙනුවට, “අනේ හොඳයි! මේ වගේ උතුම් පිනකට සම්බන්ධ වෙන්න ලැබෙනවා” කියලා <b>කලින්ම සතුටු වෙන්න</b>.</p>' },
    { key: 'during', emo: '🤲', name: 'දෙන විට', sub: 'පූජා කරන මොහොතේ',
      head: 'දන් දෙන අවස්ථාවෙහි සිත පහදවා ගන්නවා',
      body: '<p>පූජා කරන මොහොතේ හිත වෙන තැනක තියාගෙන, හරි හදිස්සියෙන්, කරන්න ඕනෙ නිසා කරනවා වගේ කරන්න එපා.</p>' +
            '<p>ඒ මොහොතේ <b>බුදුරජාණන් වහන්සේ ගැන, දහම ගැන, සංඝයා වහන්සේලා ගැන හිත පහදවාගෙන</b>, ගෞරවයෙන්, දෑත් එකතු කරගෙන පූජා කරන්න.</p>' },
    { key: 'after', emo: '🌸', name: 'දුන්නාට පස්සේ', sub: 'පින්කම ඉවර වුණාට පස්සේ',
      head: 'දන් දීමෙන් පසු සතුටු සිත් ඇත්තේ වෙනවා',
      body: '<p>මේක තමයි අමාරුම එක. පින්කම ඉවර වෙලා, “අපරාදේ මං ඒක කළේ”, “මගේ නම කිව්වේ නෑ”, “මට හරියට සැලකුවේ නෑ” කියලා දුක් වුණොත්, <b>දැන් හදා ගන්න බැරි තැන</b> ඒ ලස්සන පින කිලිටි වෙනවා.</p>' +
            '<p>ඒ වෙනුවට “මමත් ඒ උතුම් පිනට සම්බන්ධ වුණා, මමත් අනුමෝදන් වුණා” කියලා <b>ආයෙත් ආයෙත් සතුටු වෙන්න</b>. එහෙම කළොත් පින මහ පොළොව වගේ ස්ථිර වෙනවා.</p>',
      warn: 'මහාමේඝ සඟරාවේ “කඨින පින්කමේ අපර චේතනාව” ලිපියේ, පින්කමකින් පස්සේ හිත අසතුටු කරගැනීම කොයිතරම් පාඩුවක්ද කියලා විස්තර කරනවා. ඒ ලිපිය මේ පිටුවේ මූලාශ්‍ර ලැයිස්තුවේ ඇත.' }
  ];

  var cet = 0;
  function paintCet() {
    var c = CET[cet];
    $('cetHead').innerHTML = esc(c.head) + ' <small>(' + esc(c.sub) + ')</small>';
    $('cetBody').innerHTML = c.body + (c.warn ? '<p class="cet-warn">💡 ' + esc(c.warn) + '</p>' : '');
    Array.prototype.forEach.call($('cet3').children, function (b, i) {
      b.classList.toggle('on', i === cet);
      b.setAttribute('aria-selected', i === cet ? 'true' : 'false');
    });
  }
  function buildCet() {
    $('cet3').innerHTML = CET.map(function (c, i) {
      return '<button class="cet-btn" type="button" role="tab" data-c="' + i + '" aria-selected="false">' +
        '<span class="cet-e" aria-hidden="true">' + c.emo + '</span>' +
        '<span><span class="cet-n">' + esc(c.name) + '</span><span class="cet-s">' + esc(c.sub) + '</span></span></button>';
    }).join('');
    $('cet3').addEventListener('click', function (e) {
      var b = e.target.closest('.cet-btn'); if (!b) return;
      cet = +b.dataset.c; paintCet();
    });
    paintCet();
  }

  /* ---------- my promise ---------- */
  var VOWS = [
    'ලබන කඨින පින්කමට ගිහින්, මට පුළුවන් විදිහට උදව් කරනවා.',
    'පින්කමට කලින්ම “හොඳයි!” කියලා සතුටු හිතක් ඇති කරගන්නවා.',
    'පූජා කරන වෙලාවේ හිත පහදවාගෙන, ගෞරවයෙන් ඉන්නවා.',
    'පින්කම ඉවර වුණාට පස්සෙත් ඒ ගැන සතුටු වෙනවා මිසක් දුක් වෙන්නේ නෑ.',
    'අනුන් කරන පින් දැකලා “සාදු! සාදු!! සාදු!!!” කියලා අනුමෝදන් වෙනවා.',
    'මගේ වැරැද්දක් කවුරුහරි කිව්වොත් තරහ නොවී පිළිගන්නවා.',
    'අම්මට, තාත්තට පන්සලේ පින්කම්වලට උදව් කරන්න යනවා.'
  ];
  var V_KEY = 'daham.kathina.vows';
  function buildVows() {
    var on = store.get(V_KEY, {});
    $('vows').innerHTML = VOWS.map(function (t, i) {
      return '<label class="vow' + (on[i] ? ' on' : '') + '"><input type="checkbox" data-vow="' + i + '"' + (on[i] ? ' checked' : '') + '><span>' + esc(t) + '</span></label>';
    }).join('');
    $('vows').addEventListener('change', function (e) {
      var i = e.target.dataset.vow; if (i === undefined) return;
      var map = store.get(V_KEY, {});
      map[i] = e.target.checked; store.set(V_KEY, map);
      e.target.closest('.vow').classList.toggle('on', e.target.checked);
      if (e.target.checked) toast('🌸 සාදු! පොරොන්දුව සටහන් විය.');
    });
  }

  /* ---------- the test ---------- */
  var QS = [
    { ask: 'කඨින චීවරයක් එක් විහාරස්ථානයකට පූජා කළ හැක්කේ කොපමණ වාරයක්ද?',
      ok: 'අවුරුද්දකට එක් වතාවක් පමණයි',
      bad: ['මාසෙකට එක් වතාවක්', 'අවුරුද්දකට වාර දෙකක්', 'කැමති තරම් වාර ගණනක්'], go: '#visesha' },
    { ask: 'දහස් ගණනක් ස්වාමීන් වහන්සේලා වැඩ සිටින ආරාමයකට පූජා කළ හැකි කඨින චීවර ගණන කීයද?',
      ok: 'එකයි', bad: ['ස්වාමීන් වහන්සේලාගේ ගණනට සමානයි', 'පහයි', 'සීමාවක් නෑ'], go: '#visesha' },
    { ask: 'ස්වාමීන් වහන්සේලා වස් සමාදන් වන්නේ කවර දිනයකද?',
      ok: 'ඇසළ පුන් පොහොය දිනට පසු දින',
      bad: ['වෙසක් පුන් පොහොය දිනට පසු දින', 'වප් පුන් පොහොය දිනට පසු දින', 'ඉල් පුන් පොහොය දිනට පසු දින'], go: '#piliwela' },
    { ask: 'භාග්‍යවතුන් වහන්සේ වැසි කාලයේ එක තැනක වාසය කරන්න අනුදැන වදාළේ ඇයි?',
      ok: 'වැසි කාලයේ ගමින් ගමට චාරිකාවේ වැඩීම අපහසු නිසා',
      bad: ['දහම් දේශනා කිරීම නැවැත්වීමට', 'ගිහි පින්වතුන් දැකීම වැළැක්වීමට', 'අවුරුද්ද පුරාම එක තැනක සිටීමට'], go: '#piliwela' },
    { ask: '“වස් පවාරණය” කියන්නේ කුමකටද?',
      ok: 'තමන්ගේ වැරැද්දක් දුටුවා නම් කියන ලෙස සංඝයාගෙන් ඉල්ලා සිටීම',
      bad: ['වස් කාලය දීර්ඝ කිරීම', 'ගිහියන්ගෙන් දානය ඉල්ලා සිටීම', 'පන්සලෙන් පිටව යාම'], go: '#piliwela' },
    { ask: '“චීවර මාසය” පවතින්නේ කවර කාලයේද?',
      ok: 'වප් පුන් පොහොයට පසු දින සිට ඉල් පුන් පොහොය දක්වා',
      bad: ['ඇසළ පෝයේ සිට වප් පෝය දක්වා', 'වෙසක් පෝයේ සිට පොසොන් පෝය දක්වා', 'අවුරුද්ද පුරාවට'], go: '#piliwela' },
    { ask: 'මහා ප්‍රජාපතී ගෝතමී දේවිය තමන්ගේ අතින්ම වියා ගත් වස්ත්‍ර යුගල පූජා කරන්න ආ විට බුදුරජාණන් වහන්සේ වදාළේ කුමක්ද?',
      ok: '“ගෞතමිය, සංඝයාට පූජා කරන්න” කියා',
      bad: ['“මට පමණක් පූජා කරන්න” කියා', '“ආපසු රැගෙන යන්න” කියා', '“දුගී මගී අයට දෙන්න” කියා'], go: '#gotami' },
    { ask: 'දක්ඛිණා විභංග සූත්‍රයේ වදාළ පරිදි, සංඝයා උදෙසා දෙන දානයට වඩා මහත්ඵල වන පෞද්ගලික දානයක් තිබේද?',
      ok: 'නෑ — එබන්දක් නැති බව වදාළා',
      bad: ['ඔව් — බොහෝ ඒවා තියෙනවා', 'ඔව් — එකක් තියෙනවා', 'ඒ ගැන වදාළේ නෑ'], go: '#gotami' },
    { ask: 'ඡළංගදාන සූත්‍රයේ වදාළ, දායකයාගේ අංග තුන මොනවාද?',
      ok: 'දානයට කලින් සතුටු වීම, දෙන විට සිත පහදවා ගැනීම, දුන් පසු සතුටු වීම',
      bad: ['බොහෝ දේ දීම, ඉක්මනින් දීම, නැවත නැවත දීම', 'සිල් රැකීම, භාවනා කිරීම, දහම් ඇසීම', 'පන්සලට යාම, මල් පිදීම, පහන් දැල්වීම'], go: '#thunsitha' },
    { ask: 'පින්කමක් කර අවසන් වූ පසු “අපරාදේ මම ඒක කළේ” කියා දුක් වුණොත් මොකද වෙන්නේ?',
      ok: 'දායකයාගේ තුන්වෙනි අංගය වන පසු සතුට නැති වී යනවා',
      bad: ['පින දෙගුණ වෙනවා', 'කිසිම වෙනසක් වෙන්නේ නෑ', 'පින නැවත අලුතෙන් පටන් ගන්නවා'], go: '#thunsitha' },
    { ask: 'සීහ සේනාපති සූත්‍රයේ වදාළ, මෙලොවදී ම දැකිය හැකි දාන ඵලයක් කුමක්ද?',
      ok: 'දන් දෙන කෙනා බොහෝ දෙනාට ප්‍රිය මනාප වීම',
      bad: ['දන් දෙන කෙනා ධනවත් නොවීම', 'දන් දෙන කෙනා තනිවීම', 'දන් දෙන කෙනාට රෝග නොවීම'], go: '#labena' },
    { ask: 'සප්පුරිස දාන සූත්‍රයේ වදාළ පරිදි, ශ්‍රද්ධාවෙන් දන් දෙන කෙනාට ලැබෙන්නේ කුමක්ද?',
      ok: 'මහා භෝග සම්පත් සහ අභිරූපවත්, දර්ශනීය බවක්',
      bad: ['දිගු ආයුෂයක් පමණක්', 'බොහෝ දරුවන්', 'රජ පදවියක්'], go: '#labena' },
    { ask: '“මා පුඤ්ඤභායි” සූත්‍රයේ බුදුරජාණන් වහන්සේ වදාළේ “පින” යනු කුමකට කියන නමක් බවද?',
      ok: 'ඉතා යහපත්, සිත්කළු, ප්‍රිය මනාප වූ සැපයට',
      bad: ['දුකට', 'ධනයට', 'දීර්ඝ ආයුෂයට'], go: '#labena' },
    { ask: 'කඨින චීවරය පූජා කර ගන්නා ස්වාමීන් වහන්සේ තෝරන්නේ කවුද?',
      ok: 'සංඝයා වහන්සේලා, විනය කර්මයකින්',
      bad: ['චීවරය පූජා කරන දායක මහත්මයා', 'පන්සලට එන ගිහි පිරිස ඡන්දයකින්', 'ඉබේ තේරෙන පරිදි'], go: '#visesha' },
    { ask: 'කඨින පිනට සම්බන්ධ වෙන්න තවම පුංචි දරුවෙකුට තියෙන හොඳම ක්‍රමය කුමක්ද?',
      ok: 'පුළුවන් විදිහට උදව් කරලා, පහන් සිතින් “සාදු” කියා අනුමෝදන් වීම',
      bad: ['බලාගෙන නිශ්ශබ්දව සිටීම', 'ලොකු වෙනකම් ඉන්න එක', 'මුදල් පමණක් දීම'], go: '#mata' }
  ];

  var test = null;
  function makeTest() {
    test = { i: 0, right: 0, wrong: 0, answered: false, missed: [],
      qs: shuffle(QS).map(function (q) {
        return { ask: q.ask, go: q.go,
          opts: shuffle([{ t: q.ok, ok: true }].concat(q.bad.map(function (t) { return { t: t, ok: false }; }))) };
      }) };
  }

  function paintTest() {
    var el = $('testArea');
    if (!test) {
      el.innerHTML = '<div class="exam-intro"><h1>✍️ දැන් ප්‍රශ්න ' + QS.length + ' යි</h1>' +
        '<p class="exam-sub">හෙමින් කියවන්න. හිතලා උත්තර දෙන්න. වැරදුණත් කමක් නෑ — නැවත කියවලා තේරුම් ගන්න පුළුවන්.</p>' +
        '<ul class="exam-rules"><li><b>' + QS.length + '</b><span>ප්‍රශ්න ' + QS.length + ' ක් ඇත.</span></li>' +
        '<li class="ok"><b>🌸</b><span>ලකුණු නෑ, තරග නෑ. තේරුණාද කියලා බලන්න විතරයි.</span></li>' +
        '<li><b>🔁</b><span>කැමති නම් නැවත නැවත කරන්න පුළුවන්.</span></li></ul>' +
        '<button class="btn big" id="testStart" type="button">▶ පටන් ගනිමු</button></div>';
      return;
    }
    if (test.i >= test.qs.length) { paintEnd(); return; }
    var q = test.qs[test.i];
    el.innerHTML = '<div class="card exam-card">' +
      '<div class="exam-bar"><span class="exam-pts">ප්‍රශ්නය ' + (test.i + 1) + ' / ' + test.qs.length + '</span></div>' +
      '<p class="exam-ask">' + esc(q.ask) + '</p>' +
      '<div class="exam-opts" id="testOpts">' +
        q.opts.map(function (o, i) { return '<button class="exam-opt" type="button" data-i="' + i + '">' + esc(o.t) + '</button>'; }).join('') +
      '</div>' +
      '<div class="exam-after" id="testAfter" hidden><p id="testMsg"></p><button class="btn" id="testNext" type="button">ඊළඟ ප්‍රශ්නය ▶</button></div>' +
    '</div>';
  }

  function paintEnd() {
    var all = test.qs.length, r = test.right;
    var msg = r === all ? 'අනේ සාදු! ඔයා හැම ප්‍රශ්නයකටම හරියට උත්තර දුන්නා. ඔයා මේ පාඩම හොඳට තේරුම් අරගෙන.'
      : r >= all - 2 ? 'හොඳට කරලා තියෙනවා! තව පොඩ්ඩක් කියවලා බැලුවොත් හැම දෙයක්ම පැහැදිලි වෙයි.'
      : 'කමක් නෑ පින්වත් දරුවා. ආයෙත් එක පාරක් පාඩම බලලා එමු. එතකොට හැම දෙයක්ම තේරෙයි.';
    var review = test.missed.length
      ? '<div class="miss"><b>නැවත බලමු:</b>' + test.missed.map(function (g) {
          return '<a class="review-link" href="' + esc(g.go) + '">' + esc(g.label) + '</a>';
        }).join('') + '</div>'
      : '';
    $('testArea').innerHTML = '<div class="exam-end' + (r === all ? ' win' : '') + '">' +
      '<h1>' + (r === all ? '🌸 සාදු! සාදු!! සාදු!!!' : '🪷 හොඳයි!') + '</h1>' +
      '<p class="exam-say">ප්‍රශ්න <b>' + all + '</b> න් <b>' + r + '</b> කට ඔයා හරියට උත්තර දුන්නා.</p>' +
      '<p class="exam-say">' + esc(msg) + '</p>' + review +
      '<button class="btn big" id="testAgain" type="button">🔁 නැවත කරමු</button> ' +
      '<a class="btn ghost" href="#piliwela">🧡 ආයෙත් බලමු</a></div>';
    report(false);
  }

  function report(left) {
    if (!Trk || !Trk.isOn() || !Trk.profile()) return;
    Trk.record({ lesson: LESSON, kind: 'test', part: '1', item: ITEM,
      value: JSON.stringify({ win: test.right === test.qs.length, score: test.right,
        right: test.right, wrong: test.wrong, total: test.qs.length, left: !!left }) });
  }

  function bindTest() {
    $('testArea').addEventListener('click', function (e) {
      var t = e.target;
      if (t.id === 'testStart' || t.id === 'testAgain') { makeTest(); paintTest(); return; }
      if (t.id === 'testNext') { test.i++; test.answered = false; paintTest(); return; }
      var b = t.closest ? t.closest('.exam-opt') : null;
      if (!b || !test || test.answered) return;
      test.answered = true;
      var q = test.qs[test.i], pick = +b.dataset.i, ok = q.opts[pick].ok;
      Array.prototype.forEach.call(document.querySelectorAll('#testOpts .exam-opt'), function (x, i) {
        x.disabled = true;
        if (q.opts[i].ok) x.classList.add('right'); else if (i === pick) x.classList.add('wrong');
      });
      if (ok) test.right++; else { test.wrong++; test.missed.push({ go: q.go, label: q.ask.slice(0, 34) + '…' }); }
      $('testMsg').textContent = ok ? '✅ හරි! ශාබාෂ්.' : '💛 නිවැරදි පිළිතුර කොළ පාටින් පෙන්වා ඇත.';
      $('testAfter').hidden = false;
      if (test.i === test.qs.length - 1) $('testNext').textContent = 'අවසන් ප්‍රතිඵලය බලමු 🌸';
      $('testNext').focus();
    });
    global.addEventListener('pagehide', function () {
      if (test && test.i < test.qs.length && (test.right || test.wrong)) report(true);
    });
  }

  function paintMe() {
    var pill = $('mePill'); if (!pill || !Trk || !Trk.isOn()) return;
    var p = Trk.profile();
    pill.hidden = false;
    pill.classList.toggle('in', !!p);
    $('meName').textContent = p ? p.name : 'Join';
  }

  /* ---------- go ---------- */
  fillRefs();
  $('heroArt').innerHTML = heroArt();
  buildSteps();
  buildCet();
  buildVows();
  paintTest();
  bindTest();
  paintMe();
  if (Trk) { Trk.onChange(paintMe); Trk.record({ lesson: LESSON, kind: 'open', part: '1', item: ITEM }); }
})(window);
