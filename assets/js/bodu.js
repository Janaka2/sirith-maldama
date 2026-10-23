/* බොදු නිවසක සිරිය දකිමු — අපේකම Level 06, Lesson 02 (bodu.html).

   The customs are the ones in the school's own lesson sheet. What this page adds is the
   Dhamma behind each one, pulled from assets/js/refs.js by key and never typed here, so
   verify_citations.py governs every word of Buddha-word.

   Some customs are household manners with no passage behind them (taking off shoes,
   not speaking with food in the mouth). Those carry `custom: true` and the page says so
   plainly rather than stretching a verse to fit.

   Like the other lessons the test is NOT gamified. The plain result reaches the teacher's
   sheet under the same class codes if the child has joined. */
(function (global) {
  'use strict';

  var REFS = global.SM_REFS, Trk = global.Tracker, LESSON = 'bodu', ITEM = 'nivasa';
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

  /* ---------- hero: a home with a shrine lamp, under a bodhi leaf ---------- */
  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="බුදු මැදුරක් ඇති නිවසක්">' +
      '<circle cx="160" cy="112" r="92" fill="#fff3c4" opacity=".7"/>' +
      /* house */
      '<path d="M70,130 L160,66 L250,130 Z" fill="#f6d59a" stroke="#b45309" stroke-width="5" stroke-linejoin="round"/>' +
      '<rect x="92" y="128" width="136" height="84" rx="8" fill="#fffaf0" stroke="#b45309" stroke-width="5"/>' +
      /* shrine niche with lamp */
      '<rect x="134" y="146" width="52" height="66" rx="6" fill="#fff7dc" stroke="#b45309" stroke-width="4"/>' +
      '<path d="M160,196 q-13,-6 -13,-17 q0,-10 13,-22 q13,12 13,22 q0,11 -13,17 z" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>' +
      '<circle cx="160" cy="176" r="4" fill="#fff8ec"/>' +
      /* flowers either side */
      '<g fill="#f9a8d4" stroke="#be185d" stroke-width="2.5">' +
      '<circle cx="112" cy="176" r="8"/><circle cx="208" cy="176" r="8"/></g>' +
      '<path d="M112,184 v16 M208,184 v16" stroke="#4caf50" stroke-width="4" stroke-linecap="round"/>' +
      /* bodhi leaf */
      '<path d="M258,70 q22,-16 30,6 q7,22 -14,34 q-20,-6 -16,-40 z" fill="#86efac" stroke="#15803d" stroke-width="3"/>' +
      '<path d="M272,106 q0,-22 10,-32" fill="none" stroke="#15803d" stroke-width="2.5"/>' +
      /* ground */
      '<path d="M48,214 H272" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/>' +
      '<g fill="#fbbf24"><circle cx="52" cy="56" r="6"/><circle cx="286" cy="150" r="5"/><circle cx="38" cy="140" r="5"/></g>' +
      '</svg>';
  }

  /* ---------- the six groups of customs ---------- */
  var GROUPS = [
    { key: 'udasana', emo: '🌅', name: 'උදෑසන',
      why: 'දවස පටන් ගන්න විදිහෙන් මුළු දවසටම බලපානවා. බොදු ගෙදරක දවස පටන් ගන්නේ පිරිසිදුකමින් සහ වන්දනාවෙන්.',
      items: [
        { e: '⏰', t: 'අලුයම අවදි වෙනවා.' },
        { e: '🧼', t: 'පිරිසිදුව සිටිනවා.', custom: true },
        { e: '🧹', t: 'ලස්සනට මිදුල අතුගානවා.', custom: true },
        { e: '🪔', t: 'නිවසේ ලස්සන බුදු මැදුරක් තියනවා.' },
        { e: '🙏', t: 'උදෑසන බුද්ධ වන්දනා කරනවා.' }
      ],
      refs: ['PARA96', 'MG2'] },

    { key: 'gurusaru', emo: '🙇', name: 'ගරුසරුව',
      why: 'බොදු ගෙදරක ලොකුම ලස්සන තමයි දෙමාපියන්ට සහ වැඩිහිටියන්ට දක්වන ආදරය සහ ගරුසරුව.',
      items: [
        { e: '👵', t: 'වැඩිහිටි මහලු අය සහ දෙමාපියන් ආදරයෙන් රැකබලා ගන්නවා.' },
        { e: '🙇', t: 'උදේ, හවස, නින්දට යනවිට, බැහැරට යනවිට දෙමාපියන්ට වන්දනා කරනවා.' },
        { e: '💛', t: 'ගරු කළ යුත්තන්ට ගරු කරනවා, නිහතමානී වෙනවා.' }
      ],
      refs: ['MG5', 'D109', 'D332'] },

    { key: 'gedara', emo: '🏠', name: 'ගෙදර හැසිරීම',
      why: 'ගෙදර හැසිරෙන විදිහෙන් තමයි අපේ හැදියාව පේන්නේ. පිටතට යන්න කලින් ගෙදර හොඳ වෙන්න ඕනෙ.',
      items: [
        { e: '🤝', t: 'ගෙදරට එන අයව සුහදශීලීව පිළිගන්නවා.' },
        { e: '🎒', t: 'බර යමක් අතේ තියෙනවා නම් එය අරගෙන පහසු කරනවා.', custom: true },
        { e: '👟', t: 'පාවහන් ගලවා ගෙතුළට ඇතුළු වෙනවා.', custom: true },
        { e: '🤫', t: 'නිශ්ශබ්දව සිටිනවා.', custom: true },
        { e: '🍽️', t: 'කටේ කෑම තියාගෙන කථා කරන්නේ නෑ.', custom: true },
        { e: '🫱', t: 'එකිනෙකාට උදව් පදව් කරනවා.' }
      ],
      refs: ['MG6', 'MG8'] },

    { key: 'therauwan', emo: '☸️', name: 'තෙරුවන් සරණ',
      why: 'බොදු ගෙදරක තෙරුවන් සරණ දවසේ හැම මොහොතකම තියෙනවා — කතාවේ, වැඩේ, හිතේ.',
      items: [
        { e: '☸️', t: 'මුණ ගැසෙන විට, පිටත් වන විට, අලුත් දෙයක් අරඹන විට “තෙරුවන් සරණයි”, “නමෝ බුද්ධාය” කියනවා.', custom: true },
        { e: '📿', t: 'පිරිත් සජ්ඣායනා කරනවා.' },
        { e: '🍚', t: 'බුද්ධ පූජාව සහ පැන් පූජාව පූජා කරනවා.' },
        { e: '🪔', t: 'සවස බුද්ධ වන්දනා කරනවා.' },
        { e: '🧘', t: 'වෙලාව ලැබෙන හැම විටම භාවනා පුරුදු වෙනවා.' }
      ],
      refs: ['MG2', 'MG7'] },

    { key: 'dana', emo: '🤲', name: 'දන් දීම',
      why: 'දෙන එකෙන් හිත සතුටු වෙනවා, ලෝභය අඩු වෙනවා, පිනුත් ලැබෙනවා.',
      items: [
        { e: '🍲', t: 'දුගී මගී යාචකාදීන්ට දන් පැන් පූජා කරනවා.' },
        { e: '🙏', t: 'ස්වාමීන් වහන්සේලා නිවසට වැඩම කරවා දානය පූජා කරනවා.' },
        { e: '🥣', t: 'දන්සැල් පවත්වනවා.' }
      ],
      refs: ['MG6', 'DHK_DANA', 'D332'] },

    { key: 'poya', emo: '📿', name: 'පෝය, පන්සල සහ දහම',
      why: 'දහම ඉගෙන ගන්නත්, පින් කරගන්නත් වෙලාව වෙන් කරගන්නවා. ඒක තමයි බොදු ගෙදරක ලොකුම වත.',
      items: [
        { e: '🎒', t: 'ඉරිදා දහම් පාසලට යනවා.' },
        { e: '👂', t: 'වෙලාව ලැබෙන හැම විටම ධර්මය අසනවා.' },
        { e: '📖', t: 'ස්වාමීන් වහන්සේලා නිවසට වැඩම කරවා ධර්ම දේශනා පවත්වනවා.' },
        { e: '🛕', t: 'පන්සලේ, අසපුවේ පිංකම් වලට යනවා, උදව් කරනවා.' },
        { e: '📿', t: 'සතර පෝයට උපෝසථ සිල් සමාදන් වෙනවා.' },
        { e: '🏮', t: 'වෙසක් පෝයට වෙසක් කූඩු සහ වෙසක් තොරණ හදනවා.', custom: true }
      ],
      refs: ['MG2', 'MG8', 'MG9', 'DHK_POYA', 'DHK_UPOSATHA'] }
  ];

  var grp = 0;
  function paintGroup() {
    var g = GROUPS[grp];
    $('grpHead').innerHTML = g.emo + ' ' + esc(g.name);
    $('grpWhy').textContent = g.why;
    $('grpList').innerHTML = g.items.map(function (it) {
      return '<li' + (it.custom ? ' class="is-custom"' : '') + '><span class="gi-e" aria-hidden="true">' + it.e + '</span>' +
        '<span class="gi-t">' + esc(it.t) + (it.custom ? ' <em>(හොඳ සිරිතක්)</em>' : '') + '</span></li>';
    }).join('');
    $('grpRefs').innerHTML = g.refs.map(refCard).join('');
    Array.prototype.forEach.call($('grpTabs').children, function (b, i) {
      b.classList.toggle('on', i === grp);
      b.setAttribute('aria-selected', i === grp ? 'true' : 'false');
    });
  }
  function buildGroups() {
    $('grpTabs').innerHTML = GROUPS.map(function (g, i) {
      return '<button class="grp-tab" type="button" role="tab" data-g="' + i + '" aria-selected="false">' +
        '<span aria-hidden="true">' + g.emo + '</span><b>' + esc(g.name) + '</b>' +
        '<small>' + g.items.length + '</small></button>';
    }).join('');
    $('grpTabs').addEventListener('click', function (e) {
      var b = e.target.closest('.grp-tab'); if (!b) return;
      grp = +b.dataset.g; paintGroup();
    });
    var n = GROUPS.reduce(function (s, g) { return s + g.items.length; }, 0);
    var el = $('sirithCount'); if (el) el.textContent = n;
    paintGroup();
  }

  /* ---------- my promise ---------- */
  var VOWS = [
    'උදෑසන අවදි වෙලා බුදුරජාණන් වහන්සේට වඳිනවා.',
    'උදේ සහ රෑ අම්මට තාත්තට වඳිනවා.',
    'ගෙදර වැඩට මට පුළුවන් විදිහට උදව් කරනවා.',
    'ගෙදරට එන අයට සුහදව සලකනවා.',
    'කටේ කෑම තියාගෙන කතා කරන්නේ නෑ.',
    'හැම ඉරිදාවකම දහම් පාසල් යනවා.',
    'පෝය දවසට දහම් දෙයක් කරනවා.'
  ];
  var V_KEY = 'daham.bodu.vows';
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
    { ask: 'බොදු නිවසක දවස පටන් ගන්නේ කොහොමද?',
      ok: 'අලුයම අවදි වෙලා, පිරිසිදු වෙලා, බුද්ධ වන්දනා කරලා',
      bad: ['දවල් වෙනකම් නිදාගෙන', 'රූපවාහිනිය බලමින්', 'කෑම කමින්'], go: '#sirith' },
    { ask: 'පරාභව සූත්‍රයේ පිරිහීමේ ලකුණක් ලෙස වදාළේ කුමක්ද?',
      ok: 'නිතර නිදාගෙන, අලසව, වීර්යයක් නැතිව සිටීම',
      bad: ['උදේ ඉක්මනින් නැගිටීම', 'ගෙදර වැඩ කිරීම', 'දහම් පාසල් යාම'], go: '#sirith' },
    { ask: 'මංගල සූත්‍රයේ “පූජා ච පූජනීයානං” කියා වදාළේ කුමක්ද?',
      ok: 'පූජනීය උතුමන් පිදීම උතුම් මංගලයක් බව',
      bad: ['මල් වවන එක මංගලයක් බව', 'ගෙදර අතුගාන එක මංගලයක් බව', 'ඉක්මනින් නැගිටින එක මංගලයක් බව'], go: '#sirith' },
    { ask: 'සිල්වත් උතුමන්ට වඳින, වැඩිහිටියන්ට සලකන කෙනාට ධම්මපදයේ වදාළ ගුණ හතර මොනවාද?',
      ok: 'ආයුෂ, වර්ණය, සැපය සහ බලය',
      bad: ['ධනය, ගෙවල්, ඉඩම් සහ රත්රන්', 'දැනුම, හතුරන්, බලය සහ නමක්', 'කෑම, බීම, ඇඳුම් සහ නින්ද'], go: '#sirith' },
    { ask: 'මංගල සූත්‍රයේ 5 වන ගාථාවෙන් වදාළ පළමු මංගල කාරණය කුමක්ද?',
      ok: 'මව්පියන්ට උපස්ථාන කිරීම',
      bad: ['බොහෝ ධනය රැස් කිරීම', 'දුර ගමන් යාම', 'බොහෝ යාළුවන් ඇති කරගැනීම'], go: '#sirith' },
    { ask: 'ධම්මපදයේ වදාළ පරිදි මේ ලෝකයේ සැපයක් වන්නේ කුමක්ද?',
      ok: 'මවට, පියාට, ශ්‍රමණයන්ට සහ රහතුන්ට සැලකීම',
      bad: ['බොහෝ කෑම ගැනීම', 'බොහෝ නිදාගැනීම', 'බොහෝ සෙල්ලම් කිරීම'], go: '#sirith' },
    { ask: 'මංගල සූත්‍රයේ 6 වන ගාථාවේ සඳහන් වන්නේ මොනවාද?',
      ok: 'දන් දීම, ධර්මානුකූලව ජීවත් වීම, ඤාතීන්ට සැලකීම, නිවැරදි දේ කිරීම',
      bad: ['නින්ද, කෑම, සෙල්ලම සහ ගමන්', 'ධනය, බලය, නම සහ කීර්තිය', 'ඉගෙනීම, ක්‍රීඩාව, සංගීතය සහ චිත්‍ර'], go: '#sirith' },
    { ask: 'ධම්මික සූත්‍රයේ වදාළ පරිදි උපෝසථ සිල් සමාදන් විය යුත්තේ කවර දිනවලද?',
      ok: 'පුන් පොහෝ, අමාවක සහ තුදුස්වක දිනවල',
      bad: ['සෙනසුරාදා සහ ඉරිදා පමණක්', 'අවුරුදු දිනයේ පමණක්', 'කැමති ඕනෑම දිනයක'], go: '#sirith' },
    { ask: 'උපෝසථය යනුවෙන් හැඳින්වෙන්නේ අංග කීයකින් යුතු සිල්ද?',
      ok: 'අංග අටකින්', bad: ['අංග පහකින්', 'අංග තුනකින්', 'අංග දහයකින්'], go: '#sirith' },
    { ask: 'උපෝසථය රැක පසු දින උදෑසන කළ යුතු දේ ලෙස වදාළේ කුමක්ද?',
      ok: 'පහන් සිතින් සඟ පිරිස වෙත ගොස් දන්පැන් පූජා කිරීම',
      bad: ['දවස පුරා නිදාගැනීම', 'ගමන් බිමන් යාම', 'කිසිවක් නොකර සිටීම'], go: '#sirith' },
    { ask: 'මංගල සූත්‍රයේ “කාලේන ධම්මසවණං” යනු කුමක්ද?',
      ok: 'අවශ්‍ය මොහොතේ ධර්ම ශ්‍රවණය කිරීම',
      bad: ['උදෑසන නැගිටීම', 'ගීත ඇසීම', 'දිගු නින්දක් ගැනීම'], go: '#sirith' },
    { ask: 'පාවහන් ගලවා ගෙතුළට ඇතුළු වීම ගැන නිවැරදි කියමන කුමක්ද?',
      ok: 'එය ගරුසරුව පෙන්වන හොඳ සිරිතක්',
      bad: ['එය බුදුරජාණන් වහන්සේ පැනවූ විනය නීතියක්', 'එය සූත්‍රයක දැක්වෙන සිකපදයක්', 'එය කළත් නොකළත් එකමයි'], go: '#sirith' },
    { ask: 'ධම්මික සූත්‍රයේ වදාළ පරිදි, දෙමාපියන්ට දැහැමින් සලකා දැහැමින් ජීවත් වන ගිහියා මරණින් මතු උපදින්නේ කොහේද?',
      ok: '“ස්වයං ප්‍රභා” නම් දෙව් ලොව',
      bad: ['නැවත මිනිස් ලොව පමණක්', 'කිසි තැනක නොවේ', 'සතර අපායේ'], go: '#avasana' }
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
      : 'කමක් නෑ පින්වත් දරුවා. ආයෙත් එක පාරක් සිරිත් බලලා එමු. එතකොට හැම දෙයක්ම තේරෙයි.';
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
      '<a class="btn ghost" href="#sirith">🪷 ආයෙත් බලමු</a></div>';
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
  buildGroups();
  buildVows();
  paintTest();
  bindTest();
  paintMe();
  if (Trk) { Trk.onChange(paintMe); Trk.record({ lesson: LESSON, kind: 'open', part: '1', item: ITEM }); }
})(window);
