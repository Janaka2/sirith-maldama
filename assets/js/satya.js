/* සත්‍යවාදී වෙමු — අම්බලට්ඨික රාහුලෝවාද සූත්‍රය (satya.html).

   Every Buddha-word on this page is pulled from assets/js/refs.js by key, never typed here,
   so .claude/skills/mahamevnawa-dhamma/scripts/verify_citations.py governs all of it.

   The test is deliberately NOT gamified: no points, no stars, no negative marks, no confetti.
   It only shows the child how much was understood, and sends the plain result to the teacher
   if the child has joined (same class codes as සිරිත් මල්දම — see index.html #/mama). */
(function (global) {
  'use strict';

  var REFS = global.SM_REFS, Trk = global.Tracker, LESSON = 'satya', ITEM = 'rahulovada';
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

  /* ---------- citations, rendered exactly the way the main site renders them ---------- */
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

  /* ---------- drawings ---------- */
  var uid = 0;
  function nid(p) { uid += 1; return p + uid; }

  /* The bowl the Buddha showed Venerable Rāhula. `state` 0..3 follows the sutta in order. */
  function bowl(state) {
    var clip = nid('bowlIn');
    var inside = 'M62,96 Q62,190 150,190 Q238,190 238,96 Z';
    var water = '';
    if (state === 0) water = '<rect x="55" y="168" width="190" height="30" fill="#5fb6e8"/><ellipse cx="150" cy="168" rx="46" ry="7" fill="#8ed3f5"/>';
    var body =
      '<defs><clipPath id="' + clip + '"><path d="' + inside + '"/></clipPath></defs>' +
      '<path d="M60,96 Q60,192 150,192 Q240,192 240,96 Z" fill="#d49a63" stroke="#8a5426" stroke-width="5" stroke-linejoin="round"/>' +
      '<g clip-path="url(#' + clip + ')">' + water + '</g>' +
      '<ellipse cx="150" cy="96" rx="90" ry="19" fill="#b9773f" stroke="#8a5426" stroke-width="5"/>' +
      '<ellipse cx="150" cy="96" rx="78" ry="13" fill="' + (state === 0 ? '#3f3326' : '#8a5426') + '"/>' +
      (state === 0 ? '<ellipse cx="150" cy="168" rx="46" ry="7" fill="#8ed3f5"/>' : '') +
      '<path d="M96,120 Q92,150 104,172" fill="none" stroke="#f3cfa6" stroke-width="7" stroke-linecap="round" opacity=".55"/>';

    if (state === 2) {   /* turned upside down */
      return '<svg viewBox="0 0 300 240" role="img" aria-label="මුනින් අතට නවන ලද දිය බඳුන">' +
        '<g transform="rotate(180 150 144)">' + body + '</g>' +
        '<path d="M64,206 H236" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/></svg>';
    }
    var splash = state === 1
      ? '<g fill="#5fb6e8"><path d="M256,112 q16,16 6,34 q-18,-6 -18,-22 q0,-8 12,-12Z"/><circle cx="276" cy="92" r="7"/><circle cx="262" cy="70" r="5"/><circle cx="284" cy="124" r="5"/></g>' +
        '<path d="M232,86 q30,-14 50,-4" fill="none" stroke="#8ed3f5" stroke-width="5" stroke-linecap="round" stroke-dasharray="3 9"/>'
      : '';
    return '<svg viewBox="0 0 300 240" role="img" aria-label="දිය බඳුන">' + body + splash +
      '<path d="M64,206 H236" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/></svg>';
  }

  function mirror() {
    return '<svg viewBox="0 0 220 220" role="img" aria-label="කණ්ණාඩිය">' +
      '<ellipse cx="110" cy="92" rx="66" ry="78" fill="#f6d59a" stroke="#b45309" stroke-width="6"/>' +
      '<ellipse cx="110" cy="92" rx="52" ry="64" fill="#e3f4fb" stroke="#8ec7e0" stroke-width="4"/>' +
      '<path d="M84,52 L70,110" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/>' +
      '<path d="M104,50 L96,80" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M98,170 q12,22 24,0" fill="none" stroke="#b45309" stroke-width="6"/>' +
      '<rect x="100" y="168" width="20" height="40" rx="9" fill="#b9773f" stroke="#8a5426" stroke-width="5"/>' +
      '</svg>';
  }

  function lotusBowl() {
    return '<svg viewBox="0 0 320 260" role="img" aria-label="නෙළුම් මලක් සහ දිය බඳුනක්">' +
      '<circle cx="160" cy="112" r="92" fill="#fff3c4" opacity=".75"/>' +
      '<g transform="translate(160 104)">' +
      '<ellipse cx="0" cy="0" rx="17" ry="34" fill="#f9a8d4" stroke="#be185d" stroke-width="3"/>' +
      '<ellipse cx="0" cy="0" rx="17" ry="34" fill="#f9a8d4" stroke="#be185d" stroke-width="3" transform="rotate(40)"/>' +
      '<ellipse cx="0" cy="0" rx="17" ry="34" fill="#f9a8d4" stroke="#be185d" stroke-width="3" transform="rotate(-40)"/>' +
      '<ellipse cx="0" cy="0" rx="15" ry="30" fill="#fbcfe8" stroke="#be185d" stroke-width="3" transform="rotate(75)"/>' +
      '<ellipse cx="0" cy="0" rx="15" ry="30" fill="#fbcfe8" stroke="#be185d" stroke-width="3" transform="rotate(-75)"/>' +
      '<circle cx="0" cy="0" r="11" fill="#fde68a" stroke="#b45309" stroke-width="3"/></g>' +
      '<path d="M86,166 Q86,232 160,232 Q234,232 234,166 Z" fill="#d49a63" stroke="#8a5426" stroke-width="5"/>' +
      '<ellipse cx="160" cy="166" rx="74" ry="16" fill="#5fb6e8" stroke="#8a5426" stroke-width="5"/>' +
      '<ellipse cx="160" cy="164" rx="60" ry="10" fill="#8ed3f5"/>' +
      '<g fill="#fbbf24"><circle cx="54" cy="58" r="6"/><circle cx="268" cy="48" r="5"/><circle cx="286" cy="150" r="6"/><circle cx="36" cy="140" r="5"/></g>' +
      '</svg>';
  }

  /* ---------- the water bowl, step by step ---------- */
  var STEPS = [
    { tab: '1️⃣ ටිකක් ඉතිරියි', kid: 'බුදුරජාණන් වහන්සේ බඳුනේ <b>වතුර ටිකක් විතරක්</b> ඉතිරි කරලා රාහුල හිමියන්ගෙන් ඇසුවා: “මේක පේනවද?” — දැන දැන බොරු කියන්න ලැජ්ජා නැති කෙනාගේ හොඳ ගුණත් <b>ඔච්චරයි</b>!', ref: 'RAHULA_LIE' },
    { tab: '2️⃣ ඉවතට දැම්මා', kid: 'ඊට පස්සේ ඒ ඉතිරි වතුර ටිකත් <b>ඉවතට දැම්මා</b>. දැන දැන බොරු කියන කෙනාගේ හොඳ ගුණත් එහෙමයි — <b>දාල දැම්මා වගේ</b>.', ref: 'RAHULA_LIE2' },
    { tab: '3️⃣ මුනින් හැරෙව්වා', kid: 'ඊට පස්සේ බඳුන <b>මුනින් අතට</b> හැරෙව්වා. දැන් ඒකට මොකුත්ම දාගන්න බෑ! බොරු කියන කෙනාගේ හිතත් එහෙමයි — හොඳ ගුණ පිරෙන්නේ නෑ.', ref: 'RAHULA_LIE3' },
    { tab: '4️⃣ හිස් බඳුනයි', kid: 'අන්තිමට බඳුන උඩු අතට හැරෙව්වා — ඒත් දැන් ඒක <b>හිස්</b>. කිසිම දෙයක් නෑ. දැන දැන බොරු කියන කෙනාගේ හොඳ ගුණත් එහෙමයි — <b>හිස්</b>.', ref: 'RAHULA_LIE4' }
  ];
  var step = 0;
  function paintBowl() {
    $('bowlPic').innerHTML = bowl(step);
    $('bowlKid').innerHTML = STEPS[step].kid;
    $('bowlRef').innerHTML = refCard(STEPS[step].ref);
    Array.prototype.forEach.call($('bowlSteps').children, function (b, i) {
      b.classList.toggle('on', i === step);
      b.setAttribute('aria-selected', i === step ? 'true' : 'false');
    });
  }
  function buildBowl() {
    $('bowlSteps').innerHTML = STEPS.map(function (s, i) {
      return '<button class="bowl-tab" type="button" role="tab" data-step="' + i + '">' + esc(s.tab) + '</button>';
    }).join('');
    $('bowlSteps').addEventListener('click', function (e) {
      var b = e.target.closest('.bowl-tab'); if (!b) return;
      step = +b.dataset.step; paintBowl();
    });
    $('mirrorPic').innerHTML = mirror();
    $('heroArt').innerHTML = lotusBowl();
    paintBowl();
  }

  /* ---------- the heart of the lesson: body / speech / mind  x  before / during / after ----------
     The sutta gives nine reflections. The "after" step is NOT the same for all three: a deed of body
     or speech is told to a teacher, while a thought is only felt remorse for. Keep that difference. */
  var DOORS = [
    { key: 'BODY', emo: '🙌', name: 'කය', sub: 'කරන දේ' },
    { key: 'SPEECH', emo: '🗣️', name: 'වචනය', sub: 'කියන දේ' },
    { key: 'MIND', emo: '💭', name: 'මනස', sub: 'හිතන දේ' }
  ];
  var TIMES = [
    { key: 'BEFORE', emo: '🔮', name: 'කලින්', sub: 'අනාගතය' },
    { key: 'DURING', emo: '⏳', name: 'කරන අතර', sub: 'වර්තමානය' },
    { key: 'AFTER', emo: '📜', name: 'කළාට පස්සේ', sub: 'අතීතය' }
  ];
  var CELL = {
    BODY_BEFORE: 'මම මේක <b>කරන්නද?</b> මේකෙන් මට විපතක් වෙයිද? අනිත් අයට විපතක් වෙයිද? නරකයි නම් <b>කරන්නේම නෑ</b>.',
    BODY_DURING: 'කරමින් ඉන්නකොටත් බලනවා. නරකයි කියලා තේරුණොත් <b>එතනින්ම නවත්වනවා</b>.',
    BODY_AFTER: 'කරලා ඉවර වුණාමත් බලනවා. වැරදිලා නම් ගුරුතුමාට හෝ අම්මට තාත්තට <b>කියනවා</b>, නැවත නොකරන්න සංවර වෙනවා.',
    SPEECH_BEFORE: 'මම මේක <b>කියන්නද?</b> මේක බොරුවක්ද? කාටහරි රිදෙයිද? නරකයි නම් <b>කියන්නේම නෑ</b>.',
    SPEECH_DURING: 'කතා කරමින් ඉන්නකොටත් බලනවා. වැරදි පාරකට යනවා නම් <b>එතනින්ම නවත්වනවා</b>.',
    SPEECH_AFTER: 'කියලා ඉවර වුණාමත් බලනවා. වැරදි වචනයක් කිව්වා නම් හංගන්නේ නෑ — <b>කියනවා</b>, නැවත නොකියන්න සංවර වෙනවා.',
    MIND_BEFORE: 'මම මේක <b>හිතන්නද?</b> මේක තරහක්ද? ඊර්ෂ්‍යාවක්ද? නරක හිතක් නම් <b>ඒක හදාගන්නේම නෑ</b>.',
    MIND_DURING: 'හිතමින් ඉන්නකොටත් බලනවා. නරක හිතක් නම් <b>එතනින්ම නවත්වනවා</b>.',
    MIND_AFTER: 'හිතලා ඉවර වුණාමත් බලනවා. නරක දෙයක් හිතුවා නම් <b>ලැජ්ජා වෙලා, පිළිකුල් කරලා</b>, නැවත එහෙම නොහිතන්න සංවර වෙනවා.'
  };
  var cell = 'SPEECH_BEFORE';
  function paintGrid() {
    var d = DOORS.filter(function (x) { return cell.indexOf(x.key + '_') === 0; })[0];
    var t = TIMES.filter(function (x) { return cell.indexOf('_' + x.key) > 0; })[0];
    $('g9Head').innerHTML = d.emo + ' ' + esc(d.name) + ' <small>(' + esc(d.sub) + ')</small> &nbsp;×&nbsp; ' + t.emo + ' ' + esc(t.name) + ' <small>(' + esc(t.sub) + ')</small>';
    $('g9Kid').innerHTML = CELL[cell];
    $('g9Ref').innerHTML = refCard('RAHULA_' + cell);
    Array.prototype.forEach.call(document.querySelectorAll('#grid9 .g9-cell'), function (b) {
      b.classList.toggle('on', b.dataset.cell === cell);
      b.setAttribute('aria-pressed', b.dataset.cell === cell ? 'true' : 'false');
    });
  }
  function buildGrid() {
    var h = '<div class="g9-corner" aria-hidden="true"></div>';
    TIMES.forEach(function (t) {
      h += '<div class="g9-head"><span aria-hidden="true">' + t.emo + '</span><b>' + esc(t.name) + '</b><small>' + esc(t.sub) + '</small></div>';
    });
    DOORS.forEach(function (d) {
      h += '<div class="g9-side"><span aria-hidden="true">' + d.emo + '</span><b>' + esc(d.name) + '</b><small>' + esc(d.sub) + '</small></div>';
      TIMES.forEach(function (t) {
        var k = d.key + '_' + t.key;
        h += '<button class="g9-cell" type="button" data-cell="' + k + '" aria-pressed="false">' +
          '<span class="g9-k" aria-hidden="true">' + d.emo + t.emo + '</span>' +
          '<span class="g9-t"><b>' + esc(d.name) + '</b> ' + esc(t.name) + '</span></button>';
      });
    });
    $('grid9').innerHTML = h;
    $('grid9').addEventListener('click', function (e) {
      var b = e.target.closest('.g9-cell'); if (!b) return;
      cell = b.dataset.cell; paintGrid();
    });
    paintGrid();
  }

  /* ---------- my promise ---------- */
  var VOWS = [
    'මම විහිළුවකටවත් බොරු කියන්නේ නෑ.',
    'කතා කරන්න කලින් මම හොඳින් විමසා බලනවා.',
    'බයට හෝ බැණුම් අහන්න වෙයි කියලා බොරුවක් කියන්නේ නෑ.',
    'වැරැද්දක් වුණොත් මම ඒක හංගන්නේ නෑ — ඇත්ත කියනවා.',
    'ඇත්ත කියලා අම්මට, තාත්තට, ගුරුතුමන්ලාට සතුටක් දෙනවා.'
  ];
  var V_KEY = 'daham.satya.vows';
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

  /* ---------- the test ----------
     Questions come from what this page teaches, which comes from the sutta.
     The right answer is never written into the page markup. */
  var QS = [
    { ask: 'බුදුරජාණන් වහන්සේ රාහුල හිමියන්ට මේ දහම පැහැදිලි කළේ කුමක් පෙන්වමින්ද?',
      ok: 'දිය බඳුනක්', bad: ['මල් වට්ටියක්', 'පොතක්', 'පහනක්'], go: '#diyabanduna' },
    { ask: 'බඳුනේ ඉතිරිව තිබුණු වතුර ටිකත් ඉවතට දැමුවාම බුදුරජාණන් වහන්සේ වදාළේ කුමක්ද?',
      ok: 'දැන දැන බොරු කියන කෙනාගේ ගුණත් එලෙසම ඉවතට දමා ඇති බව',
      bad: ['බඳුන හෝදා ගත යුතු බව', 'තවත් වතුර ගෙනෙන්න ඕනෙ බව', 'වතුර ඉතිරි කරගත යුතු බව'], go: '#diyabanduna' },
    { ask: 'බඳුන මුනින් අතට හැරෙව්වාම එයින් කියැවුණේ කුමක්ද?',
      ok: 'බොරු කියන කෙනාගේ ගුණත් මුනින් හැරවූ බඳුනක් වගේ බව',
      bad: ['බඳුන කැඩී ගිය බව', 'වතුර උණු වී ගිය බව', 'බඳුන අලුත් එකක් බව'], go: '#diyabanduna' },
    { ask: '“විහිළුවකටවත් ______ කියන්නේ නෑ” — හිස්තැන පුරවන්න.',
      ok: 'බොරු', bad: ['ඇත්ත', 'ගාථා', 'කතා'], go: '#vihiluwa' },
    { ask: 'දැන දැන බොරු කියන්නට ලැජ්ජාවක් නැති කෙනෙකු ගැන බුදුරජාණන් වහන්සේ වදාළේ කුමක්ද?',
      ok: 'ඔහුට නොකළ හැකි පාපයක් නැති බව',
      bad: ['ඔහුට යාළුවෝ වැඩි බව', 'ඔහු ඉක්මනින් පොහොසත් වන බව', 'ඔහුට මතකය අඩු බව'], go: '#vihiluwa' },
    { ask: '“කණ්ණාඩියක් තියෙන්නේ මොකටද?” කියා ඇසූ විට රාහුල හිමියන් දුන් පිළිතුර කුමක්ද?',
      ok: 'හොඳින් විමසා බැලීම සඳහා',
      bad: ['කාමරය සැරසීම සඳහා', 'ලස්සන වීම සඳහා', 'එළිය වැටීම සඳහා'], go: '#karanna' },
    { ask: 'යමක් කරන්න කලින් විමසා බැලිය යුත්තේ මොනවාද?',
      ok: 'මට විපතක්ද, අනුන්ට විපතක්ද, දෙපැත්තටම විපතක්ද කියා',
      bad: ['ලොකු අය බලනවද කියා', 'ඉක්මන්ද, ප්‍රමාදද කියා', 'ලාබද, වියදම්ද කියා'], go: '#prashnathuna' },
    { ask: 'වචනයෙන් වැරැද්දක් කළා කියා තේරුණොත් කළ යුත්තේ කුමක්ද?',
      ok: 'ගුරුතුමන්ලාට හෝ නැණවත් අයට පවසා, නැවත එසේ නොවන්නට සංවර වීම',
      bad: ['කාටවත් නොකියා ඉඳීම', 'තවත් බොරුවක් කියා වසන් කිරීම', 'අමතක කර දැමීම'], go: '#werradunot' },
    { ask: 'විමසා බැලිය යුතු ක්‍රියා තුන මොනවාද?',
      ok: 'කයින් කරන, වචනයෙන් කරන සහ මනසින් කරන ක්‍රියා',
      bad: ['ඇවිදීම, දිවීම සහ නැටීම', 'කියවීම, ලිවීම සහ ගණන් කිරීම', 'කෑම, බීම සහ නිදීම'], go: '#thunwara' },
    { ask: 'ඒ ක්‍රියා තුන විමසා බැලිය යුත්තේ කවර වාර තුනකදීද?',
      ok: 'කරන්න කලින්, කරන අතරතුර සහ කර අවසන් වූ පසු',
      bad: ['කරන්න කලින් විතරයි', 'කර අවසන් වූ පසු විතරයි', 'අවුරුද්දකට වරක් විතරයි'], go: '#thunwara' },
    { ask: 'මනසින් වැරදි දෙයක් හිතුණා කියා තේරුණොත් සූත්‍රයේ වදාළේ කුමක්ද?',
      ok: 'කම්පාවට හා ලැජ්ජාවට පත්වී, පිළිකුල් කර, නැවත එසේ නොවන්නට සංවර වීම',
      bad: ['ගමේ හැමෝටම කියා දැක්වීම', 'ඒ ගැන කිසිවක් නොසිතා සිටීම', 'තවත් එසේම සිතා බැලීම'], go: '#werradunot' }
  ];

  var test = null;
  function makeTest() {
    test = { i: 0, right: 0, wrong: 0, answered: false, missed: [],
      qs: shuffle(QS).map(function (q) {
        var opts = shuffle([{ t: q.ok, ok: true }].concat(q.bad.map(function (t) { return { t: t, ok: false }; })));
        return { ask: q.ask, go: q.go, opts: opts };
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
      ? '<div class="miss"><b>නැවත බලමු:</b>' + test.missed.map(function (g, i) {
          return '<a class="review-link" href="' + esc(g.go) + '">' + esc(g.label) + '</a>';
        }).join('') + '</div>'
      : '';
    $('testArea').innerHTML = '<div class="exam-end' + (r === all ? ' win' : '') + '">' +
      '<h1>' + (r === all ? '🌸 සාදු! සාදු!! සාදු!!!' : '🪷 හොඳයි!') + '</h1>' +
      '<p class="exam-say">ප්‍රශ්න <b>' + all + '</b> න් <b>' + r + '</b> කට ඔයා හරියට උත්තර දුන්නා.</p>' +
      '<p class="exam-say">' + esc(msg) + '</p>' + review +
      '<button class="btn big" id="testAgain" type="button">🔁 නැවත කරමු</button> ' +
      '<a class="btn ghost" href="#diyabanduna">📜 ආයෙත් කියවමු</a></div>';
    report(false);
  }

  /* send the plain result to the teacher's sheet, if the child has joined */
  function report(left) {
    if (!Trk || !Trk.isOn() || !Trk.profile()) return;
    Trk.record({ lesson: LESSON, kind: 'test', part: '1', item: ITEM,
      value: JSON.stringify({ win: test.right === test.qs.length, score: test.right,
        right: test.right, wrong: test.wrong, total: test.qs.length, left: !!left }) });
  }

  function bindTest() {
    $('testArea').addEventListener('click', function (e) {
      var t = e.target;
      /* the question replaces the card that was just clicked, so the page must not jump */
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
    /* a test left half way is still worth telling the teacher about */
    global.addEventListener('pagehide', function () {
      if (test && test.i < test.qs.length && (test.right || test.wrong)) report(true);
    });
  }

  /* ---------- who is reading ---------- */
  function paintMe() {
    var pill = $('mePill'); if (!pill || !Trk || !Trk.isOn()) return;
    var p = Trk.profile();
    pill.hidden = false;
    pill.classList.toggle('in', !!p);
    $('meName').textContent = p ? p.name : 'Join';
  }

  /* ---------- go ---------- */
  fillRefs();
  buildBowl();
  buildGrid();
  buildVows();
  paintTest();
  bindTest();
  paintMe();
  if (Trk) { Trk.onChange(paintMe); Trk.record({ lesson: LESSON, kind: 'open', part: '1', item: ITEM }); }
})(window);
