/* Shared machinery for a lesson page.

   satya.js, nirmansha.js, bodu.js, kathina.js and sama.js each carry their own copy of
   the citation renderer, the promise list, the test engine and the Join pill — about 250
   identical lines apiece. From dana.js onward that lives here instead. The older pages
   still have their copies; they can be moved over later, one at a time, without this file
   changing.

   A lesson calls LessonKit({...}) with its own data and gets back the helpers it needs
   for whatever interactive part is particular to it.

   Rules this file keeps, so a lesson page cannot break them by accident:
   - Buddha-word is only ever read from window.SM_REFS by key. Nothing is typed here.
   - The right answer never reaches the markup; it lives in the test's own state.
   - The test is not gamified: no points, no streaks, unlimited retries. */
(function (global) {
  'use strict';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  function refHtml(r) {
    var pali = r.pali ? '<p class="pali" lang="pi">' + r.pali.split('\n').map(esc).join('<br>') + '</p>' : '';
    var si = (r.pre ? '… ' : '') + r.si.split('\n').map(esc).join('<br>') + (r.more ? ' …' : '');
    return '<div class="ref"><div class="ref-head"><b>' + esc(r.ref) + '</b><span>' + esc(r.coll) + '</span></div>' + pali +
      '<blockquote class="ref-si' + (r.verse ? ' verse-si' : '') + '" lang="si">' + si + '</blockquote>' +
      '<a class="ref-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">tripitaka.online හි සම්පූර්ණයෙන් කියවන්න ↗</a></div>';
  }
  function refCard(key) {
    var REFS = global.SM_REFS;
    var r = REFS && REFS.lib ? REFS.lib[key] : null;
    if (!r) return '';
    return '<section class="card dhamma-card"><div class="card-tag">☸ බුදුරජාණන් වහන්සේ වදාළ දහම</div>' +
      refHtml(r) + '<p class="ref-by">සිංහල පරිවර්තනය: අතිපූජ්‍ය කිරිබත්ගොඩ ඤාණානන්ද ස්වාමීන් වහන්සේ</p></section>';
  }

  global.LessonKit = function (cfg) {
    var Trk = global.Tracker, LESSON = cfg.lesson, ITEM = cfg.item;
    var toastT = null;

    function toast(msg) {
      var el = $('toast'); if (!el) return;
      el.textContent = msg; el.classList.add('show');
      clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('show'); }, 2600);
    }

    /* ---------- citations ---------- */
    Array.prototype.forEach.call(document.querySelectorAll('[data-ref]'), function (el) {
      el.innerHTML = refCard(el.dataset.ref);
    });

    /* ---------- hero ---------- */
    if (cfg.heroArt && $('heroArt')) $('heroArt').innerHTML = cfg.heroArt();

    /* ---------- my promise ---------- */
    if (cfg.vows && $('vows')) {
      var vkey = 'daham.' + LESSON + '.vows', on = store.get(vkey, {});
      $('vows').innerHTML = cfg.vows.map(function (t, i) {
        return '<label class="vow' + (on[i] ? ' on' : '') + '"><input type="checkbox" data-vow="' + i + '"' +
          (on[i] ? ' checked' : '') + '><span>' + esc(t) + '</span></label>';
      }).join('');
      $('vows').addEventListener('change', function (e) {
        var i = e.target.dataset.vow; if (i === undefined) return;
        var map = store.get(vkey, {});
        map[i] = e.target.checked; store.set(vkey, map);
        e.target.closest('.vow').classList.toggle('on', e.target.checked);
        if (e.target.checked) toast('🌸 සාදු! පොරොන්දුව සටහන් විය.');
      });
    }

    /* ---------- the test ---------- */
    var QS = cfg.questions || [], test = null;

    function makeTest() {
      test = { i: 0, right: 0, wrong: 0, answered: false, missed: [],
        qs: shuffle(QS).map(function (q) {
          return { ask: q.ask, go: q.go,
            opts: shuffle([{ t: q.ok, ok: true }].concat(q.bad.map(function (t) { return { t: t, ok: false }; }))) };
        }) };
    }

    function paintTest() {
      var el = $('testArea'); if (!el) return;
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
        '<a class="btn ghost" href="' + esc(cfg.backTo || '#app') + '">🔎 ආයෙත් බලමු</a></div>';
      report(false);
    }

    function report(left) {
      if (!Trk || !Trk.isOn() || !Trk.profile()) return;
      Trk.record({ lesson: LESSON, kind: 'test', part: '1', item: ITEM,
        value: JSON.stringify({ win: test.right === test.qs.length, score: test.right,
          right: test.right, wrong: test.wrong, total: test.qs.length, left: !!left }) });
    }

    if ($('testArea')) {
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
      paintTest();
    }

    /* ---------- the Join pill ---------- */
    function paintMe() {
      var pill = $('mePill'); if (!pill || !Trk || !Trk.isOn()) return;
      var p = Trk.profile();
      pill.hidden = false;
      pill.classList.toggle('in', !!p);
      $('meName').textContent = p ? p.name : 'Join';
    }
    paintMe();
    if (Trk) { Trk.onChange(paintMe); Trk.record({ lesson: LESSON, kind: 'open', part: '1', item: ITEM }); }

    return { esc: esc, $: $, refCard: refCard, toast: toast, store: store, shuffle: shuffle };
  };

  global.LessonKit.refCard = refCard;
  global.LessonKit.esc = esc;
})(window);
