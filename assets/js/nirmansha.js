/* සතුන්ට කරුණාව — the "නිර්මාංශ ප්‍රශ්නය" lesson for children (nirmansha.html).

   The lesson follows the argument of the book by පූජ්‍ය කිරිබත්ගොඩ ඤාණානන්ද ස්වාමීන් වහන්සේ,
   written out for children in the school's own words. Every Buddha-word is pulled from
   assets/js/refs.js by key, never typed here, so verify_citations.py governs all of it.

   Like satya.html this test is NOT gamified: no points, stars or negative marks. The plain
   result reaches the teacher's sheet under the same class codes if the child has joined. */
(function (global) {
  'use strict';

  var REFS = global.SM_REFS, Trk = global.Tracker, LESSON = 'mansa', ITEM = 'nirmansha';
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

  /* ---------- citations, rendered the way the rest of the site renders them ---------- */
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

  /* ---------- hero drawing: a lotus over a still pond, with the creatures we are kind to ---------- */
  function heroArt() {
    return '<svg viewBox="0 0 320 260" role="img" aria-label="නෙළුම් මලක්, කුරුල්ලෙක් සහ මුවෙක්">' +
      '<circle cx="160" cy="112" r="94" fill="#eafaf0" opacity=".85"/>' +
      /* lotus */
      '<g transform="translate(160 96)">' +
      '<ellipse cx="0" cy="0" rx="16" ry="32" fill="#f9a8d4" stroke="#be185d" stroke-width="3"/>' +
      '<ellipse cx="0" cy="0" rx="16" ry="32" fill="#f9a8d4" stroke="#be185d" stroke-width="3" transform="rotate(42)"/>' +
      '<ellipse cx="0" cy="0" rx="16" ry="32" fill="#f9a8d4" stroke="#be185d" stroke-width="3" transform="rotate(-42)"/>' +
      '<ellipse cx="0" cy="0" rx="14" ry="28" fill="#fbcfe8" stroke="#be185d" stroke-width="3" transform="rotate(78)"/>' +
      '<ellipse cx="0" cy="0" rx="14" ry="28" fill="#fbcfe8" stroke="#be185d" stroke-width="3" transform="rotate(-78)"/>' +
      '<circle cx="0" cy="0" r="10" fill="#fde68a" stroke="#b45309" stroke-width="3"/></g>' +
      /* deer */
      '<g transform="translate(74 186)">' +
      '<ellipse cx="0" cy="-16" rx="22" ry="15" fill="#d4a373" stroke="#8a5426" stroke-width="3"/>' +
      '<circle cx="19" cy="-34" r="10" fill="#d4a373" stroke="#8a5426" stroke-width="3"/>' +
      '<path d="M15,-43 l-4,-11 M23,-43 l4,-11" stroke="#8a5426" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<circle cx="22" cy="-35" r="1.8" fill="#3b2a1e"/>' +
      '<path d="M-12,-3 v10 M-2,-3 v10 M8,-3 v10" stroke="#8a5426" stroke-width="3.5" stroke-linecap="round"/>' +
      '<circle cx="-8" cy="-18" r="2.5" fill="#fff8ec"/><circle cx="2" cy="-13" r="2.5" fill="#fff8ec"/></g>' +
      /* bird */
      '<g transform="translate(244 150)">' +
      '<ellipse cx="0" cy="0" rx="16" ry="12" fill="#7dd3fc" stroke="#0369a1" stroke-width="3"/>' +
      '<circle cx="12" cy="-10" r="8" fill="#7dd3fc" stroke="#0369a1" stroke-width="3"/>' +
      '<path d="M19,-10 l8,3 l-8,3 z" fill="#f59e0b"/>' +
      '<circle cx="14" cy="-12" r="1.6" fill="#13293d"/>' +
      '<path d="M-4,-2 q-10,8 -18,6" fill="none" stroke="#0369a1" stroke-width="3" stroke-linecap="round"/></g>' +
      /* water line */
      '<path d="M40,214 q40,-9 80,0 t80,0 t80,0" fill="none" stroke="#7dd3fc" stroke-width="5" stroke-linecap="round"/>' +
      '<g fill="#fbbf24"><circle cx="52" cy="58" r="6"/><circle cx="268" cy="52" r="5"/><circle cx="286" cy="112" r="5"/></g>' +
      '</svg>';
  }

  /* ---------- my promise ---------- */
  var VOWS = [
    'මම කිසි සතෙකුට හිංසා කරන්නේ නෑ.',
    '“ඒ සතාව මරන්න” කියලා මම කාටවත් කියන්නේ නෑ.',
    'කවුරුහරි සතෙක් මරනවා දැක්කම මම සතුටු වෙන්නේ නෑ.',
    'කන දේ ගැන මම කාටවත් ගරහන්නේ, අපහාස කරන්නේ නෑ.',
    'හැම දවසකම “සියලු සත්වයෝ සුවපත් වේවා!” කියලා මෛත්‍රිය පතනවා.'
  ];
  var V_KEY = 'daham.mansa.vows';
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
    { ask: 'බුදුරජාණන් වහන්සේ විනය නීතියක් ලෙස තහනම් කොට වදාළේ කුමක්ද?',
      ok: 'සතුන් මැරීම', bad: ['මස් අනුභව කිරීම', 'එළවළු අනුභව කිරීම', 'දානය පිළිගැනීම'], go: '#sikapadaya' },
    { ask: 'පළමුවෙනි සිකපදයේ ඇතුළත් වන කරුණු තුන මොනවාද?',
      ok: 'තමන් නොමැරීම, අනුන් ලවා නොමැරවීම, අනුන් මරනවා අනුමත නොකිරීම',
      bad: ['උදේ, දවල්, රෑ යන තුන් වේලෙහි නොමැරීම', 'ගොඩබිම, දියේ, අහසේ සතුන් නොමැරීම', 'කයින්, වචනයෙන්, මනසින් නොකෑම'], go: '#sikapadaya' },
    { ask: 'ජීවක සූත්‍රය දේශනා කොට වදාළේ කොහේදීද?',
      ok: 'රජගහ නුවර ජීවකයන්ගේ අඹ උයනේදී',
      bad: ['සැවැත් නුවර ජේතවනාරාමයේදී', 'අම්බලට්ඨිකාවේදී', 'ඉසිපතනාරාමයේදී'], go: '#jivaka' },
    { ask: 'ජීවක මහතා බුදුරජාණන් වහන්සේගෙන් ඇසුවේ කුමක්ද?',
      ok: 'උන්වහන්සේ උදෙසා සතුන් මරනවා කියන කතාව ඇත්තද කියා',
      bad: ['බෙහෙත් හදන්නේ කොහොමද කියා', 'අඹ උයන ලස්සනද කියා', 'භාවනා කරන්නේ කොහොමද කියා'], go: '#jivaka' },
    { ask: 'ඒ චෝදනාව ගැන බුදුරජාණන් වහන්සේ වදාළේ කුමක්ද?',
      ok: 'එය අසත්‍ය වූ, අභූත වූ චෝදනාවක් බව',
      bad: ['එය සම්පූර්ණයෙන්ම ඇත්ත බව', 'එය ගැන කතා කරන්න ඕනෙ නැති බව', 'එය ජීවක විසින්ම විසඳිය යුතු බව'], go: '#jivaka' },
    { ask: 'මස් අකැප වන්නේ කවර කරුණු තුනකින්ද?',
      ok: 'තමන් උදෙසා මැරුවා කියා දුටුවොත්, ඇසුවොත්, හෝ සැක කළොත්',
      bad: ['ලොකු, කුඩා හෝ මධ්‍යම සතෙක් නම්', 'උදේ, දවල් හෝ රෑ පිසුවොත්', 'ගොඩබිම, දියේ හෝ අහසේ සතෙක් නම්'], go: '#jivaka' },
    { ask: 'කෙනෙක් උදෙසා සතෙක් මැරුවොත් පව් රැස්වන්නේ කරුණු කීයකින්ද?',
      ok: 'පහකින්', bad: ['එකකින්', 'තුනකින්', 'දහයකින්'], go: '#pawpaha' },
    { ask: 'ආමගන්ධ සූත්‍රයේ “පිළීගඳ” ලෙස වදාළේ කුමක්ටද?',
      ok: 'ප්‍රාණඝාතය, සොරකම, බොරුව, රැවටීම වැනි අකුසල්',
      bad: ['මස් සහ මාළු අනුභවයට', 'නාන්නේ නැතිව සිටීමට', 'පරණ ඇඳුම් ඇඳීමට'], go: '#pililanda' },
    { ask: '“මේවා ය පිළීගඳ! ______ නම් නොවේ” — හිස්තැන පුරවන්න.',
      ok: 'මස් බොජුන', bad: ['බොරු කීම', 'සොරකම', 'ක්‍රෝධය'], go: '#pililanda' },
    { ask: 'එළවළු පමණක් අනුභව කරන කෙනෙක් ගැන අපි කුමක් කළ යුතුද?',
      ok: 'එය හොඳ දෙයක් බව දැන, කාටවත් නොගරහා සිටීම',
      bad: ['ඔවුන්ට සිනාසීම', 'ඔවුන් වැරදියි කියා කීම', 'ඔවුන් එක්ක රණ්ඩු වීම'], go: '#nigamanaya' },
    { ask: '“ඔයා මස් කනවා නම් බෞද්ධයෙක් නෙවෙයි” කියා කවුරුහරි කිව්වොත් කළ යුත්තේ කුමක්ද?',
      ok: 'තරහ නොවී, බුදුරජාණන් වහන්සේ වදාළ දේ කියා, ලොකු අයගෙන් තවත් අසා ගැනීම',
      bad: ['ආපහු රණ්ඩු කිරීම', 'ඔවුන්ට අපහාස කිරීම', 'කිසිවක් නොඉගෙන සිටීම'], go: '#nigamanaya' }
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
    var msg = r === all ? 'අනේ සාදු! ඔයා හැම ප්‍රශ්නයකටම හරියට උත්තර දුන්නා. ඔයා මේ දහම හොඳට තේරුම් අරගෙන.'
      : r >= all - 2 ? 'හොඳට කරලා තියෙනවා! තව පොඩ්ඩක් කියවලා බැලුවොත් හැම දෙයක්ම පැහැදිලි වෙයි.'
      : 'කමක් නෑ පින්වත් දරුවා. ආයෙත් එක පාරක් පිටුව කියවලා බලමු. එතකොට හැම දෙයක්ම තේරෙයි.';
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
      '<a class="btn ghost" href="#sikapadaya">📜 ආයෙත් කියවමු</a></div>';
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
  buildVows();
  paintTest();
  bindTest();
  paintMe();
  if (Trk) { Trk.onChange(paintMe); Trk.record({ lesson: LESSON, kind: 'open', part: '1', item: ITEM }); }
})(window);
