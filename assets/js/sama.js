/* සමචරියාව — a lesson page (sama.html).

   සමචරියාව is not a word a child meets anywhere else, so the page does two jobs:
   it gives the Buddha's own definition (Sāleyyaka sutta: three by body, four by
   speech, three by mind) and it shows the other places the Sutta Pitaka uses the
   word, because tripitaka.online renders it differently in different suttas —
   "යහපතේ හැසිරීම" in the Sāleyyaka, "සම මෙත් පැතිරීම" in the Pabbatūpama. The
   teachers' page lists every occurrence found.

   Buddha-word is pulled from assets/js/refs.js by key and never typed here, so
   verify_citations.py governs every word of it. As on the other lesson pages the
   test is NOT gamified. */
(function (global) {
  'use strict';

  var REFS = global.SM_REFS, Trk = global.Tracker, LESSON = 'sama', ITEM = 'samachariyawa';
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
     "සම" means even and "විසම" uneven, so the picture is simply two roads. */
  function road(even) {
    var line = even
      ? '<path d="M14,70 H246" stroke="#0d9488" stroke-width="9" stroke-linecap="round"/>'
      : '<path d="M14,78 L50,58 L84,86 L120,54 L156,84 L192,60 L226,82 L246,66" fill="none" stroke="#b91c1c" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>';
    var feet = even
      ? '<g fill="#115e59"><ellipse cx="54" cy="56" rx="7" ry="10"/><ellipse cx="94" cy="56" rx="7" ry="10"/><ellipse cx="134" cy="56" rx="7" ry="10"/><ellipse cx="174" cy="56" rx="7" ry="10"/><ellipse cx="214" cy="56" rx="7" ry="10"/></g>'
      : '<g fill="#991b1b"><ellipse cx="50" cy="44" rx="7" ry="10" transform="rotate(-18 50 44)"/><ellipse cx="120" cy="40" rx="7" ry="10" transform="rotate(14 120 40)"/><ellipse cx="192" cy="46" rx="7" ry="10" transform="rotate(-10 192 46)"/></g>';
    return '<svg viewBox="0 0 260 100" role="img" aria-label="' + (even ? 'සමතලා මඟක්' : 'විෂම, ඇදයෙන් යන මඟක්') + '">' +
      '<rect x="0" y="0" width="260" height="100" rx="14" fill="' + (even ? '#f0fdfa' : '#fef2f2') + '"/>' +
      line + feet + '</svg>';
  }

  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="සමතලා මඟක්, කය වචනය මනස යන දොරටු තුන සහ සෑයක්">' +
      '<circle cx="160" cy="132" r="92" fill="#effcfa" opacity=".9"/>' +
      /* the three doors, well clear of the stupa below them */
      '<g>' +
      '<circle cx="70" cy="56" r="24" fill="#fff" stroke="#0d9488" stroke-width="4"/><text x="70" y="66" text-anchor="middle" font-size="24">🙌</text>' +
      '<circle cx="160" cy="56" r="24" fill="#fff" stroke="#0d9488" stroke-width="4"/><text x="160" y="66" text-anchor="middle" font-size="24">🗣️</text>' +
      '<circle cx="250" cy="56" r="24" fill="#fff" stroke="#0d9488" stroke-width="4"/><text x="250" y="66" text-anchor="middle" font-size="24">💭</text>' +
      '</g>' +
      /* horizon, then the road running back to it */
      '<path d="M34,158 H286" stroke="#99f6e4" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M56,226 L140,159 H180 L264,226 Z" fill="#ccfbf1" stroke="#0d9488" stroke-width="5" stroke-linejoin="round"/>' +
      '<g stroke="#5eead4" stroke-width="5" stroke-linecap="round"><path d="M160,218 v-13 M160,199 v-10 M160,183 v-8 M160,171 v-5"/></g>' +
      /* the stupa standing at the far end of it */
      '<g transform="translate(160,152) scale(.4)">' +
      '<rect x="-36" y="8" width="72" height="9" rx="3" fill="#fffaf0" stroke="#0f766e" stroke-width="5"/>' +
      '<rect x="-29" y="-1" width="58" height="9" rx="3" fill="#fffaf0" stroke="#0f766e" stroke-width="5"/>' +
      '<path d="M-25,-1 a25,25 0 0 1 50,0 z" fill="#fffaf0" stroke="#0f766e" stroke-width="5" stroke-linejoin="round"/>' +
      '<rect x="-8" y="-35" width="16" height="10" rx="2" fill="#fffaf0" stroke="#0f766e" stroke-width="4.5"/>' +
      '<path d="M0,-35 v-13" stroke="#0f766e" stroke-width="4.5" stroke-linecap="round"/>' +
      '<circle cx="0" cy="-51" r="4" fill="#5eead4" stroke="#0f766e" stroke-width="2.5"/></g>' +
      '<g fill="#5eead4"><circle cx="28" cy="108" r="6"/><circle cx="296" cy="150" r="5"/><circle cx="24" cy="168" r="5"/></g>' +
      '</svg>';
  }

  /* ---------- the three doors and the ten ways ---------- */
  var DOORS = [
    { key: 'kaya', emo: '🙌', name: 'කය', sub: 'කරන දේ · 3 ක්',
      why: 'කය කියන්නේ අපි අපේ අත් පා වලින් කරන දේවල්වලට. සමචරියාවේ පළමු කොටස තියෙන්නේ මෙතන.',
      items: [
        { emo: '🕊️', name: 'සතුන්ට හිංසා නොකරනවා',
          kid: 'කෙනෙක් සතුන් මරන එක සම්පූර්ණයෙන්ම අත්හරිනවා. දඬු මුගුරු, අවි ආයුධ බිම තියනවා. සතුන් මරන්න ලැජ්ජයි. සියලු සතුන්ට දයාවෙන් ඉන්නවා.',
          you: 'පාසලේ, ගෙදර, මිදුලේ — කුඩා සතෙක් වුණත් නොමරා ඉන්න. කුහුඹුවෙක් වුණත්.',
          ref: 'SAM_K1' },
        { emo: '🙅', name: 'සොරකම් නොකරනවා',
          kid: 'අනුන්ට අයිති දෙයක් — ගමේ වුණත්, කැලේ වුණත් — හිමියා නොදී තියෙද්දී සොර සිතින් ගන්නේ නෑ.',
          you: 'කෙනෙකුගේ පැන්සලක්, පොතක්, කෑමක් — ඉල්ලලා, දුන්නම විතරක් ගන්න.',
          ref: 'SAM_K2' },
        { emo: '👪', name: 'අනුන්ගේ පවුල් දිවිය නොකෙලසනවා',
          kid: 'තව කෙනෙකුගේ පවුල් දිවිය කැඩෙන, කෙලෙසෙන වැඩක් කරන්නේ නෑ.',
          you: 'මේක ලොකු වුණාම වැදගත් වෙන සිකපදයක්. දැනට මතක තියාගන්න — <b>හැම පවුලකටම ගරු කරන්න</b> ඕනෙ කියලා.',
          ref: 'SAM_K3' }
      ] },

    { key: 'vachana', emo: '🗣️', name: 'වචනය', sub: 'කියන දේ · 4 ක්',
      why: 'වචනයෙන් වැරදෙන ක්‍රම හතරක් තියෙනවා. ඒ හතරම අත්හැරියොත් එය සමචරියාවයි.',
      items: [
        { emo: '💧', name: 'බොරු නොකියනවා',
          kid: 'දන්න දේ දන්නවා කියනවා. නොදන්න දේ දන්නේ නෑ කියනවා. දකින දේ දකිනවා කියනවා. තමන් නිසාවත්, අනුන් නිසාවත්, යම් ලාභයක් නිසාවත් දැන දැන බොරුවක් කියන්නේ නෑ.',
          you: 'මේක ගැන වෙනම පාඩමක් අපිට තියෙනවා — <a class="ref-link" href="satya.html">💧 සත්‍යවාදී වෙමු</a>.',
          ref: 'SAM_V1' },
        { emo: '🤝', name: 'කේළාම් නොකියනවා',
          kid: 'මෙතනින් අහගෙන ගිහින් එතන කියලා, දෙන්නෙක් බිඳවන්නේ නෑ. ඒ වෙනුවට <b>බිඳුණු අය සමගි කරනවා</b>. සමගියෙන්ම සතුටු වෙනවා.',
          you: 'යාළුවෝ දෙන්නෙක් අතර තරහක් තියෙනවා නම්, තව තරහ වැඩි කරන එකක් නොකියා, ඒගොල්ලෝ ආයෙත් යාළු කරන්න උදව් වෙන්න.',
          ref: 'SAM_V2' },
        { emo: '🌸', name: 'රළු වචන නොකියනවා',
          kid: 'පරුෂ — රළු, කර්කශ, අනිත් අයට රිදෙන වචන අත්හරිනවා. ඒ වෙනුවට <b>කනට මිහිරි, ආදරය වඩන, හදවතට දැනෙන</b> වචන කියනවා.',
          you: 'තරහ ආවත්, කට ඇරලා රිදෙන වචනයක් කියන්න කලින් පොඩ්ඩක් නවතින්න.',
          ref: 'SAM_V3' },
        { emo: '🎯', name: 'හිස් වචන නොකියනවා',
          kid: 'හිස් — නිකම් කාලය නාස්ති වෙන කතා අත්හරිනවා. සුදුසු වෙලාවට කතා කරනවා. සිදු වූ දේම කියනවා. අර්ථවත් දේම කියනවා.',
          you: 'කතා කරන්න කලින් හිතන්න — “මේකෙන් කාට හරි වැඩක් තියෙනවද?”',
          ref: 'SAM_V4' }
      ] },

    { key: 'manasa', emo: '💭', name: 'මනස', sub: 'හිතන දේ · 3 ක්',
      why: 'කවුරුවත් නොදකින තැන — අපේ හිත ඇතුළේ. සමචරියාව පටන් ගන්නේත්, කැඩෙන්නේත් මෙතනින්.',
      items: [
        { emo: '🙂', name: 'අනුන්ගේ දේට ලෝභ නොකරනවා',
          kid: 'අනුන් සතු දේවල් දිහා ලෝභ සිතින් බලන්නේ නෑ. “අනේ අර දේ මට ලැබුණා නම්” කියලා හිතන්නේ නෑ.',
          you: 'යාළුවෙකුට අලුත් දෙයක් ලැබුණාම, ඊර්ෂ්‍යා නොවී “හොඳයි නේද!” කියලා සතුටු වෙන්න.',
          ref: 'SAM_M1' },
        { emo: '💚', name: 'තරහ නැති සිතින් ඉන්නවා',
          kid: 'කාටවත් “මෙවුන් වැනසිලා යන්න ඕනේ” කියලා හිතන්නේ නෑ. ඒ වෙනුවට <b>“මේ සත්වයෝ වෛර නැත්තෝ වෙත්වා! සුවසේ ජීවත් වෙත්වා!”</b> කියලා හිතනවා.',
          you: 'මේක තමයි <b>මෛත්‍රිය</b>. උදේ නැගිටලා එක පාරක් මේක හිතන්න.',
          ref: 'SAM_M2' },
        { emo: '💡', name: 'සම්මා දිට්ඨියෙන් ඉන්නවා',
          kid: 'දන් දීමේ විපාක තියෙනවා. හොඳ නරක කර්මවල විපාක තියෙනවා. මෙලොවක් පරලොවක් තියෙනවා. අම්මා කියලා, තාත්තා කියලා විශේෂ අය ඉන්නවා — මේ විදිහට <b>ඇත්ත දැකීම</b>.',
          you: 'මේක පාඩමේ දහවෙනි එක වුණාට, ඇත්තටම <b>මුල</b> මේකයි. මේක හරි ගියොත් අනිත් නවයත් හරි යනවා.',
          ref: 'SAM_M3' }
      ] }
  ];

  var door = 0, pick = 0;
  function paintTen() {
    var d = DOORS[door], it = d.items[pick];
    $('tenWhy').textContent = d.why;
    $('tenList').innerHTML = d.items.map(function (x, i) {
      var num = DOORS.slice(0, door).reduce(function (s, g) { return s + g.items.length; }, 0) + i + 1;
      return '<li><button class="ten-btn' + (i === pick ? ' on' : '') + '" type="button" data-i="' + i + '">' +
        '<span class="ten-num" aria-hidden="true">' + num + '</span>' +
        '<span class="ten-emo" aria-hidden="true">' + x.emo + '</span>' +
        '<span>' + esc(x.name) + '</span></button></li>';
    }).join('');
    $('tenSay').innerHTML = '<h3>' + it.emo + ' ' + esc(it.name) + '</h3><p>' + it.kid + '</p>' +
      '<p class="sat-you">💛 ' + it.you + '</p>';
    $('tenRef').innerHTML = refCard(it.ref);
    Array.prototype.forEach.call($('doorTabs').children, function (b, i) {
      b.classList.toggle('on', i === door);
      b.setAttribute('aria-selected', i === door ? 'true' : 'false');
    });
  }
  function buildTen() {
    $('doorTabs').innerHTML = DOORS.map(function (d, i) {
      return '<button class="door-tab" type="button" role="tab" data-d="' + i + '" aria-selected="false">' +
        '<span aria-hidden="true">' + d.emo + '</span><b>' + esc(d.name) + '</b><small>' + esc(d.sub) + '</small></button>';
    }).join('');
    $('doorTabs').addEventListener('click', function (e) {
      var b = e.target.closest('.door-tab'); if (!b) return;
      door = +b.dataset.d; pick = 0; paintTen();
    });
    $('tenList').addEventListener('click', function (e) {
      var b = e.target.closest('.ten-btn'); if (!b) return;
      pick = +b.dataset.i; paintTen();
    });
    var n = DOORS.reduce(function (s, d) { return s + d.items.length; }, 0);
    var el = $('tenCount'); if (el) el.textContent = n;
    paintTen();
  }

  /* ---------- my promise ---------- */
  var VOWS = [
    'කුඩා සතෙක් වුණත් නොමරා ඉන්නවා.',
    'අනුන්ගේ දෙයක් ඉල්ලලා, දුන්නම විතරක් ගන්නවා.',
    'දැන දැන බොරුවක් කියන්නේ නෑ.',
    'දෙන්නෙක් බිඳවන කතාවක් කියන්නේ නෑ — සමගි කරනවා.',
    'තරහ ආවත් රිදෙන වචනයක් කියන්න කලින් නවතිනවා.',
    'යාළුවෙකුට හොඳක් වුණාම ඊර්ෂ්‍යා නොවී සතුටු වෙනවා.',
    'උදේ නැගිටලා “සියලු සත්වයෝ සුවපත් වෙත්වා!” කියලා හිතනවා.'
  ];
  var V_KEY = 'daham.sama.vows';
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
    { ask: '“සමචරියාව” කියන වචනයේ තේරුම සාලෙය්‍යක සූත්‍රයේ සිංහලට පෙරළා තියෙන්නේ කොහොමද?',
      ok: 'යහපතේ හැසිරීම',
      bad: ['වේගයෙන් ඇවිදීම', 'එක තැන සිටීම', 'බොහෝ දේ ඉගෙනීම'], go: '#mokakda' },
    { ask: 'සාලෙය්‍යක සූත්‍රයේ වදාළ පරිදි, සමචරියාව සිදු වන්නේ ක්‍රම කීයකින්ද?',
      ok: 'දහයකින් — කයින් තුනක්, වචනයෙන් හතරක්, මනසින් තුනක්',
      bad: ['පහකින් — කයින් දෙකක්, වචනයෙන් තුනක්', 'තුනකින් — කය, වචනය, මනස බැගින් එකක්', 'අටකින් — කයින් හතරක්, මනසින් හතරක්'], go: '#dasa' },
    { ask: 'කය මුල් කරගෙන සිදු වන සමචරියාව ක්‍රම කීයක්ද?',
      ok: 'තුනක්', bad: ['හතරක්', 'පහක්', 'දෙකක්'], go: '#dasa' },
    { ask: 'වචනය මුල් කරගෙන සිදු වන සමචරියාව ක්‍රම කීයක්ද?',
      ok: 'හතරක්', bad: ['තුනක්', 'දෙකක්', 'හයක්'], go: '#dasa' },
    { ask: 'සතුන් මැරීමෙන් වැළකෙන කෙනා ගැන සූත්‍රයේ වදාළේ කුමක්ද?',
      ok: 'දඬු මුගුරු අවි ආයුධ අත්හැර, සියලු සතුන්ට දයාවෙන් වාසය කරන බව',
      bad: ['ලොකු සතුන් පමණක් නොමරන බව', 'සතුන් මැරීම අනුමත කරන බව', 'ඒ ගැන සිතන්නේ නැති බව'], go: '#dasa' },
    { ask: 'කේළාම් නොකියන කෙනා කරන හොඳ දේ සූත්‍රයේ වදාළේ කුමක්ද?',
      ok: 'බිඳුණු අය සමගි කරනවා, සමගියටම කැමති වෙනවා',
      bad: ['කිසිවක් කතා නොකර සිටිනවා', 'දෙපැත්තටම එකඟ වෙනවා', 'පිරිස් දෙකක් හදනවා'], go: '#dasa' },
    { ask: 'රළු වචන අත්හැරි කෙනා කතා කරන්නේ කෙබඳු වචනද?',
      ok: 'කනට මිහිරි, සෙනෙහස වඩන, හදයංගම වචන',
      bad: ['හයියෙන් කියන වචන', 'වේගයෙන් කියන වචන', 'දිගට කියන වචන'], go: '#dasa' },
    { ask: 'මනස මුල් කරගෙන වදාළ දෙවෙනි සමචරියාව තුළ එන ප්‍රාර්ථනාව කුමක්ද?',
      ok: '“මේ සත්වයෝ වෛර නැත්තෝ වෙත්වා! සුවසේ ජීවත් වෙත්වා!”',
      bad: ['“මට බොහෝ ධනය ලැබේවා!”', '“මගේ හතුරන් පැරදේවා!”', '“මට දිගු ආයුෂ ලැබේවා!”'], go: '#dasa' },
    { ask: 'සම්මා දිට්ඨියෙන් යුතු කෙනා පිළිගන්නා දෙයක් සූත්‍රයේ වදාළේ කුමක්ද?',
      ok: 'දන් දීමෙහි විපාක තියෙනවා; හොඳ නරක කර්මවල විපාක තියෙනවා',
      bad: ['කිසිම දෙයක විපාක නැත', 'මෙලොවක් විතරයි තියෙන්නේ', 'අම්මා තාත්තා විශේෂ අය නොවේ'], go: '#dasa' },
    { ask: 'ඉතිවුත්තකයේ “මා පුඤ්ඤභායි” සූත්‍රයේ, සැප කැමති කෙනා හික්මිය යුතු පුණ්‍ය ක්‍රියා තුන මොනවාද?',
      ok: 'දානය, සමචරියාව සහ මෛත්‍රී සිත වැඩීම',
      bad: ['දානය, සීලය සහ නින්ද', 'ඉගෙනීම, ක්‍රීඩාව සහ ගායනය', 'ධනය, කීර්තිය සහ බලය'], go: '#thuna' },
    { ask: 'ධනඤ්ජානි සූත්‍රයේ, “මව්පියන් නිසා අධර්මචාරී වීම” සහ “මව්පියන් නිසා ධර්මචාරී වීම” අතරෙන් ශ්‍රේෂ්ඨ කුමක්ද?',
      ok: 'ධර්මචාරී, සමචාරී වීමයි',
      bad: ['අධර්මචාරී, විෂමචාරී වීමයි', 'දෙකම සමානයි', 'ඒ ගැන වදාළේ නෑ'], go: '#yaluwa' },
    { ask: 'ධනඤ්ජානි සූත්‍රයේ සාරිපුත්තයන් වහන්සේ පෙන්වා දුන් විසඳුම කුමක්ද?',
      ok: 'මව්පියන් පෝෂණය කරමින්ම, පව් නොකර, පින් රැස් කළ හැකි දැහැමි රැකීරක්ෂා තියෙනවා',
      bad: ['මව්පියන් අත්හැරිය යුතුයි', 'පව් කරන්නට සිදු වෙනවා', 'ගෙදරින් පිටව යා යුතුයි'], go: '#yaluwa' },
    { ask: 'පබ්බතූපම සූත්‍රයේ කෝසල රජතුමා උපමා කළ, හැම දිශාවකින්ම පෙරළා එන මහා පර්වත කුමකටද?',
      ok: 'ජරාවට සහ මරණයට',
      bad: ['වැස්සට සහ සුළඟට', 'සතුරු සේනාවන්ට', 'දුප්පත්කමට'], go: '#kandu' },
    { ask: 'එබඳු මහා භයක් එන විට කළ යුතු දේ ලෙස රජතුමා කීවේ කුමක්ද?',
      ok: 'ධර්මයෙහි හැසිරීම, සම මෙත් පැතිරීම, කුසල් කිරීම සහ පින් කිරීම මිස අන් කිසිවක් නැති බව',
      bad: ['ධනයෙන් සතුරන් පොළඹවා ගැනීම', 'මහා සේනාවක් එක්රැස් කිරීම', 'ප්‍රබල මන්ත්‍ර කියවීම'], go: '#kandu' },
    { ask: 'පුග්ගල සූත්‍රයේ ගාථාවේ, දිළිඳු වුණත් සමචරියාවෙන් හික්මෙන කෙනා කරන දේ කුමක්ද?',
      ok: 'ශ්‍රමණ බමුණන් දැක ආසනයෙන් නැගිට වඳිනවා; දෙන දේ නොවළක්වනවා',
      bad: ['බොහෝ ධනය රැස් කරනවා', 'කිසිවක් නොදී ඉන්නවා', 'ගෙදරින් පිටව යනවා'], go: '#hikmena' },
    { ask: 'ධම්මපදයේ 388 වන ගාථාවේ, “ශ්‍රමණයා” කියා කියන්නේ කුමක් නිසාද?',
      ok: 'ධර්මයේ හැසිරිලා, යහපතේ යෙදෙන නිසා',
      bad: ['කසාවත් පොරවන නිසා', 'ගෙදරින් පිටව ගිය නිසා', 'බොහෝ දේ උගත් නිසා'], go: '#mokakda' }
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
      : 'කමක් නෑ පින්වත් දරුවා. ආයෙත් එක පාරක් ක්‍රම දහය බලලා එමු. එතකොට හැම දෙයක්ම තේරෙයි.';
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
      '<a class="btn ghost" href="#dasa">🌿 ආයෙත් බලමු</a></div>';
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
      var q = test.qs[test.i], p = +b.dataset.i, ok = q.opts[p].ok;
      Array.prototype.forEach.call(document.querySelectorAll('#testOpts .exam-opt'), function (x, i) {
        x.disabled = true;
        if (q.opts[i].ok) x.classList.add('right'); else if (i === p) x.classList.add('wrong');
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
  $('roadBad').innerHTML = road(false);
  $('roadGood').innerHTML = road(true);
  buildTen();
  buildVows();
  paintTest();
  bindTest();
  paintMe();
  if (Trk) { Trk.onChange(paintMe); Trk.record({ lesson: LESSON, kind: 'open', part: '1', item: ITEM }); }
})(window);
