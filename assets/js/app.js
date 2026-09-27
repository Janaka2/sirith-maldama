/* සිරිත් මල්දම — app: routing, progress, read aloud, quiz */
(function () {
  'use strict';
  var D = window.SM_DATA, CATS = D.cats, PARTS = D.parts;
  var app = document.getElementById('app');
  var PART = 1, V, LEVELS, TOTAL, learned, lastRead, bestStars;
  var STATE = {};

  /* ---------- storage (safe) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('sirith.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('sirith.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  function key(k, p) { return (p || PART) === 1 ? k : k + (p || PART); }
  Object.keys(PARTS).forEach(function (p) {
    p = +p;
    var st = { learned: {}, last: store.get(key('last', p), 1) || 1, stars: store.get(key('stars', p), 0) || 0 };
    (store.get(key('learned', p), []) || []).forEach(function (n) { if (n >= 1 && n <= PARTS[p].verses.length) st.learned[n] = true; });
    STATE[p] = st;
  });
  function setPart(p) {
    p = PARTS[p] ? +p : 1;
    PART = p; V = PARTS[p].verses; LEVELS = PARTS[p].levels; TOTAL = V.length;
    learned = STATE[p].learned; lastRead = STATE[p].last; bestStars = STATE[p].stars;
    store.set('part', p);
  }
  function countOf(p) { return Object.keys(STATE[p].learned).length; }
  var soundOn = store.get('sound', true) !== false;
  setPart(store.get('part', 1));

  function learnedCount() { return Object.keys(learned).length; }
  function saveLearned() { store.set(key('learned'), Object.keys(learned).map(Number)); }
  function setLast(n) { lastRead = STATE[PART].last = n; store.set(key('last'), n); store.set('lastpos', { part: PART, n: n }); }
  function lastPos() { var l = store.get('lastpos', null); return l && PARTS[l.part] && l.n >= 1 && l.n <= PARTS[l.part].verses.length ? l : { part: PART, n: lastRead }; }
  function setStars(n) { bestStars = STATE[PART].stars = n; store.set(key('stars'), n); }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function levelOf(n) { for (var i = 0; i < LEVELS.length; i++) if (n >= LEVELS[i].from && n <= LEVELS[i].to) return LEVELS[i]; return LEVELS[0]; }
  function levelDone(L) { var c = 0; for (var n = L.from; n <= L.to; n++) if (learned[n]) c++; return c; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }

  /* ---------- sound ---------- */
  var actx = null;
  function tone(freqs, dur, type, gain) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      var t0 = actx.currentTime;
      freqs.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = type || 'sine'; o.frequency.value = f;
        var s = t0 + i * dur * 0.55;
        g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(gain || 0.12, s + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, s + dur);
        o.connect(g); g.connect(actx.destination); o.start(s); o.stop(s + dur + 0.05);
      });
    } catch (e) { /* no audio */ }
  }
  var sfx = {
    page: function () { tone([520], 0.12, 'triangle', 0.06); },
    good: function () { tone([523, 659, 784, 1047], 0.22, 'sine', 0.12); },
    bad: function () { tone([220, 196], 0.22, 'triangle', 0.08); },
    win: function () { tone([523, 659, 784, 1047, 1319, 1568], 0.26, 'sine', 0.12); }
  };
  function paintSound() {
    var b = document.getElementById('soundBtn');
    b.textContent = soundOn ? '🔊' : '🔇';
    b.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
  }
  document.getElementById('soundBtn').addEventListener('click', function () {
    soundOn = !soundOn; store.set('sound', soundOn); paintSound();
    if (soundOn) sfx.page(); else if (window.speechSynthesis) window.speechSynthesis.cancel();
  });

  /* ---------- read aloud ---------- */
  function sinhalaVoice() {
    if (!('speechSynthesis' in window)) return null;
    var vs = window.speechSynthesis.getVoices() || [];
    for (var i = 0; i < vs.length; i++) if (/^si([-_]|$)/i.test(vs[i].lang)) return vs[i];
    return vs.length ? false : null; /* false = voices exist but none Sinhala, null = unknown */
  }
  if ('speechSynthesis' in window) { try { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = function () {}; } catch (e) { /* ignore */ } }
  function readAloud(text, btn) {
    if (!('speechSynthesis' in window)) { toast('මේ උපාංගයට හඬ නඟා කියවිය නොහැක. අපි එකට කියවමු!'); return; }
    var synth = window.speechSynthesis;
    if (synth.speaking) { synth.cancel(); if (btn) btn.classList.remove('on'); return; }
    var v = sinhalaVoice();
    if (v === false) { toast('මේ උපාංගයේ සිංහල හඬක් නැත. ගුරුතුමා සමඟ හඬ නඟා කියවමු!'); return; }
    var u = new SpeechSynthesisUtterance(text.replace(/\n/g, ' . '));
    u.lang = 'si-LK'; u.rate = 0.8; u.pitch = 1.05; if (v) u.voice = v;
    u.onend = u.onerror = function () { if (btn) btn.classList.remove('on'); };
    if (btn) btn.classList.add('on');
    synth.speak(u);
  }

  /* ---------- little visuals ---------- */
  function flowerSvg(color, on) {
    var p = '';
    for (var i = 0; i < 6; i++) p += '<ellipse cx="0" cy="-13" rx="8.5" ry="12" transform="rotate(' + (i * 60) + ')" fill="' + (on ? color : '#f1e9da') + '" stroke="' + (on ? 'rgba(0,0,0,.12)' : '#d9ccb4') + '" stroke-width="1"/>';
    return '<svg viewBox="-28 -28 56 56" aria-hidden="true">' + p + '<circle r="11" fill="' + (on ? '#fff7d6' : '#fffaf0') + '" stroke="' + (on ? '#f59e0b' : '#d9ccb4') + '" stroke-width="1.5"/></svg>';
  }
  function confetti() {
    var fx = document.getElementById('fx'), cols = ['#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#fb923c'], h = '';
    for (var i = 0; i < 46; i++) {
      h += '<i style="left:' + (Math.random() * 100) + '%;background:' + cols[i % cols.length] + ';animation-delay:' + (Math.random() * 0.5) + 's;animation-duration:' + (1.6 + Math.random() * 1.4) + 's;transform:rotate(' + (Math.random() * 360) + 'deg)"></i>';
    }
    fx.innerHTML = h;
    clearTimeout(confetti._t); confetti._t = setTimeout(function () { fx.innerHTML = ''; }, 3400);
  }
  function catChip(cat, link) {
    var c = CATS[cat] || ['🌼', '#f59e0b'];
    var inner = '<span aria-hidden="true">' + c[0] + '</span> ' + esc(cat);
    return link ? '<a class="chip" style="--c:' + c[1] + '" href="#/' + PART + '/mala" data-cat="' + esc(cat) + '">' + inner + '</a>'
                : '<span class="chip" style="--c:' + c[1] + '">' + inner + '</span>';
  }
  function paintProgress() { document.getElementById('progressCount').textContent = learnedCount(); document.getElementById('progressTotal').textContent = TOTAL; }

  function partTabs(where) {
    var h = '<div class="parts" role="tablist" aria-label="කොටස තෝරන්න">';
    Object.keys(PARTS).forEach(function (p) {
      p = +p;
      var c = countOf(p), t = PARTS[p].verses.length;
      h += '<a class="part-tab' + (p === PART ? ' on' : '') + '" role="tab" aria-selected="' + (p === PART) + '" href="#/' + p + '/' + (where || '') + '">' +
        '<span class="part-ico" aria-hidden="true">' + (['📙', '📗', '📘'][p - 1] || '📕') + '</span><span><b>' + esc(PARTS[p].name) + '</b><small>🌸 ' + c + ' / ' + t + '</small></span></a>';
    });
    return h + '</div>';
  }

  /* ---------- progress tracking (module: assets/js/tracker.js) ---------- */
  var Trk = window.Tracker, LESSON = 'sirith';
  function track(kind, part, item, value) { if (Trk) Trk.record({ lesson: LESSON, kind: kind, part: part, item: item, value: value, size: PARTS[part] ? PARTS[part].verses.length : undefined }); }
  function savePart(p) {
    store.set(key('learned', p), Object.keys(STATE[p].learned).map(Number));
    store.set(key('last', p), STATE[p].last); store.set(key('stars', p), STATE[p].stars);
  }
  function applyServer(progress) {
    var L = (progress && progress.lessons && progress.lessons[LESSON]) || { learned: {}, stars: {}, last: null };
    Object.keys(PARTS).forEach(function (p) {
      p = +p; var st = { learned: {}, last: 1, stars: Math.min(3, Number((L.stars || {})[p]) || 0) };
      ((L.learned || {})[p] || []).forEach(function (n) { n = +n; if (n >= 1 && n <= PARTS[p].verses.length) st.learned[n] = true; });
      STATE[p] = st;
    });
    var lp = L.last && PARTS[L.last.part] ? +L.last.part : PART;
    if (L.last && PARTS[L.last.part]) STATE[lp].last = Math.min(PARTS[lp].verses.length, Math.max(1, +L.last.item || 1));
    Object.keys(PARTS).forEach(function (p) { savePart(+p); });
    store.set('lastpos', { part: lp, n: STATE[lp].last });
    setPart(lp);
  }
  function uploadLocal() {
    Object.keys(PARTS).forEach(function (p) {
      p = +p;
      Object.keys(STATE[p].learned).forEach(function (n) { track('learned', p, +n); });
      if (STATE[p].stars) track('quiz', p, '', STATE[p].stars);
    });
  }
  function clearLocal() {
    Object.keys(PARTS).forEach(function (p) { STATE[+p] = { learned: {}, last: 1, stars: 0 }; savePart(+p); });
    store.set('lastpos', null);
    setPart(PART);
  }
  function paintMe() {
    var pill = document.getElementById('mePill'); if (!pill) return;
    var on = Trk && Trk.isOn(), pr = on ? Trk.profile() : null;
    pill.hidden = !on;
    pill.setAttribute('href', '#/' + PART + '/mama');
    pill.classList.toggle('in', !!pr);
    document.getElementById('meName').textContent = pr ? pr.name : 'එක් වන්න';
  }
  var ERR = { 'bad-class-code': 'පන්ති කේතය වැරදියි. ගුරුතුමාගෙන් අසන්න.', 'name-needed': 'ඔබේ නම ලියන්න.', 'place-needed': 'ඔබ සහභාගී වන තැන තෝරන්න.', 'class-needed': 'ඔබේ පන්තිය තෝරන්න.', 'not-found': 'නම හෝ රහස් කේතය වැරදියි. නැවත බලන්න.', 'network': 'අන්තර්ජාලය නැත. පසුව නැවත උත්සාහ කරන්න.', 'not-set-up': 'ගුරුතුමා තවම පන්ති කේතයක් සකසා නැත.', 'off': 'ප්‍රගති සටහන තවම සක්‍රිය කර නැත.' };
  function meMsg(text, ok) { var m = document.getElementById('meMsg'); if (m) { m.textContent = text; m.className = 'me-msg ' + (ok ? 'ok' : 'bad'); } }
  function pageMe() {
    var head = '<section class="block first"><div class="block-head"><h1>🙋 මගේ ප්‍රගතිය</h1><p>ඔබ ඉගෙන ගන්නා දේ ගුරුතුමාට පෙනේ. ඔබට ලකුණු ලැබේ.</p></div>';
    if (!Trk || !Trk.isOn()) return head + '<div class="fav-empty"><span aria-hidden="true">📋</span><b>ප්‍රගති සටහන තවම සක්‍රිය කර නැත</b><p>ගුරුතුමා මෙය සක්‍රිය කළ පසු ඔබට එක් විය හැක. එතෙක් ඔබේ ප්‍රගතිය මෙම උපාංගයේ සුරැකේ.</p></div></section>';
    var pr = Trk.profile();
    if (pr) {
      var rows = '', all = 0;
      Object.keys(PARTS).forEach(function (p) { p = +p; var c = countOf(p), t = PARTS[p].verses.length; all += c;
        rows += '<a class="me-row" href="#/' + p + '/"><b>' + esc(PARTS[p].name) + '</b><div class="meter-bar"><i style="width:' + Math.round(c / t * 100) + '%"></i></div><span>🌸 ' + c + ' / ' + t + '</span><span>' + starRow(STATE[p].stars) + '</span></a>'; });
      var pts = pr.points ? pr.points.total : 0, wait = Trk.pending();
      return head + '<div class="me-card"><div class="me-top"><div class="me-pic">' + window.Scenes.portrait(PART, Math.max(1, countOf(PART)), { bg: '#fff1c9' }) + '</div>' +
        '<div><h2>' + esc(pr.name) + '</h2><p class="me-place">' + (pr.cls ? '🎒 ' + esc(pr.cls) + ' · ' : '') + '📍 ' + esc(pr.place) + '</p>' +
        '<div class="me-points"><span>⭐</span><b id="mePoints">' + pts + '</b><small>ලකුණු</small></div></div></div>' +
        '<div class="me-code"><small>ඔබේ රහස් කේතය. මෙය ලියා තබා ගන්න.</small><b>' + esc(pr.code) + '</b><small>වෙනත් උපාංගයකින් දිගටම කිරීමට නම සහ මෙම කේතය අවශ්‍යයි.</small></div>' +
        '<div class="me-rows">' + rows + '</div>' +
        '<p class="me-sync" id="meSync">' + (wait ? '⏳ යැවීමට ඇති සටහන් ' + wait + ' යි' : '✅ සියල්ල ගුරුතුමාට යවා ඇත') + '</p>' +
        '<div class="hero-cta"><a class="btn big" href="#/' + lastPos().part + '/kavi/' + lastPos().n + '">▶ නැවතුණු තැනින් පටන් ගනිමු · ' + esc(PARTS[lastPos().part].name) + ' · කවිය ' + lastPos().n + '</a><button class="btn ghost" id="meSyncBtn" type="button">🔄 දැන් යවන්න</button><button class="btn ghost danger" id="meLeave" type="button">🚪 පිටවන්න</button></div>' +
        '<p class="me-msg" id="meMsg" role="status"></p></div></section>';
    }
    var opts = Trk.places().map(function (x) { return '<option value="' + esc(x) + '">'; }).join('');
    var copts = Trk.classes().map(function (x) { return '<option value="' + esc(x) + '">'; }).join('');
    return head + '<div class="me-forms">' +
      '<form class="card me-form" id="joinForm" autocomplete="off"><h2>🌱 අලුතින් එක් වෙමු</h2>' +
        '<label>ඔබේ නම <small>(මුල් නම පමණක්)</small><input name="name" required minlength="2" maxlength="40" placeholder="උදා: නිමල්"></label>' +
        '<label>ඔබේ පන්තිය<input name="cls" required maxlength="40" list="classList" placeholder="තෝරන්න හෝ ලියන්න"><datalist id="classList">' + copts + '</datalist></label>' +
        '<label>ඔබ සහභාගී වන රට<input name="place" required maxlength="60" list="placeList" placeholder="තෝරන්න හෝ ලියන්න"><datalist id="placeList">' + opts + '</datalist></label>' +
        '<label>පන්ති කේතය <small>(ගුරුතුමා දෙන)</small><input name="classCode" required maxlength="40" autocapitalize="characters"></label>' +
        '<button class="btn big" type="submit">එක් වෙමු</button>' +
        '<p class="me-note">🔒 ඔබේ නම සහ ප්‍රගතිය පෙනෙන්නේ ගුරුතුමාට පමණි. එක් වීමට පෙර අම්මාගෙන් හෝ තාත්තාගෙන් අවසර ගන්න.</p></form>' +
      '<form class="card me-form" id="resumeForm" autocomplete="off"><h2>▶ දිගටම කරමු</h2><p class="me-note">කලින් එක් වී තිබේ නම්, නම සහ රහස් කේතය ලියන්න.</p>' +
        '<label>ඔබේ නම<input name="name" required minlength="2" maxlength="40"></label>' +
        '<label>රහස් කේතය<input name="code" required maxlength="12" autocapitalize="characters" placeholder="උදා: K7M2QX"></label>' +
        '<button class="btn big" type="submit">දිගටම කරමු</button></form>' +
      '</div><p class="me-msg" id="meMsg" role="status"></p></section>';
  }
  if (Trk) Trk.onChange(function (why, data) {
    if (why === 'progress') applyServer(data.progress);
    if (why === 'synced' || why === 'joined' || why === 'left' || why === 'queued' || why === 'offline') {
      paintMe();
      var sy = document.getElementById('meSync'), pt = document.getElementById('mePoints'), pr = Trk.profile();
      if (sy) sy.textContent = Trk.pending() ? (why === 'offline' ? '📴 අන්තර්ජාලය නැත. සටහන් ' + Trk.pending() + ' ක් පසුව යැවේ' : '⏳ යැවීමට ඇති සටහන් ' + Trk.pending() + ' යි') : '✅ සියල්ල ගුරුතුමාට යවා ඇත';
      if (pt && pr && pr.points) pt.textContent = pr.points.total;
    }
    if (why === 'lost') toast('ඔබේ සටහන සොයා ගත නොහැක. ගුරුතුමාට කියන්න.');
  });
  app.addEventListener('submit', function (e) {
    var f = e.target; if (f.id !== 'joinForm' && f.id !== 'resumeForm') return;
    e.preventDefault();
    var btn = f.querySelector('button[type=submit]'); btn.disabled = true; meMsg('⏳ මොහොතක් ඉන්න…', true);
    var done = function (res, joined) {
      btn.disabled = false;
      if (!res.ok) { meMsg(ERR[res.error] || 'යම් වරදක් විය. නැවත උත්සාහ කරන්න.', false); sfx.bad(); return; }
      if (joined) uploadLocal();
      sfx.win(); confetti(); paintProgress(); paintMe(); route();
      toast(joined ? '🎉 සාදරයෙන් පිළිගනිමු, ' + res.profile.name + '!' : '👋 නැවත සාදරයෙන් පිළිගනිමු, ' + res.profile.name + '!');
    };
    if (f.id === 'joinForm') Trk.join(f.elements.name.value, f.elements.cls.value, f.elements.place.value, f.elements.classCode.value).then(function (r) { done(r, true); });
    else Trk.resume(f.elements.name.value, f.elements.code.value).then(function (r) { done(r, false); });
  });

  /* ---------- favourites (module: assets/js/favourites.js) ---------- */
  var Fav = window.Favourites;
  function favItem(part, n) {
    var v = PARTS[part].verses[n - 1];
    return { type: 'sirith', id: part + '-' + n, title: v.title, url: '#/' + part + '/kavi/' + n, icon: v.icon, group: 'සිරිත් මල්දම · ' + PARTS[part].name, sub: 'කවිය ' + n };
  }
  Fav.registerType('sirith', { thumb: function (item) { var x = String(item.id).split('-'); return window.Scenes.render(+x[0], +x[1], item.title); } });
  function paintFavCount() { var c = Fav.count(), el = document.getElementById('favCount'); if (el) { el.textContent = c; el.parentNode.classList.toggle('has', c > 0); } }
  Fav.onChange(function (list, item, isOn) {
    paintFavCount();
    if (item) { if (isOn) { sfx.good(); toast('❤️ ප්‍රියතම වලට එක් කළා'); } else toast('ප්‍රියතම වලින් ඉවත් කළා'); }
    if (app.className === 'page-fav') { app.innerHTML = pageFav(); }
    else if (app.className === 'page-mala' && galleryCat === '__fav') { document.getElementById('tiles').innerHTML = galleryCards(); hydrateThumbs(); }
  });
  function pageFav() {
    var items = Fav.list();
    var head = '<section class="block first"><div class="block-head"><h1>❤️ මගේ ප්‍රියතම</h1><p>ඔබ කැමති පාඩම් මෙතැන එකතු වේ. හදවත ඔබා එක් කරන්න, නැවත ඔබා ඉවත් කරන්න.</p></div>';
    if (!items.length) return head + '<div class="fav-empty"><span aria-hidden="true">🤍</span><b>තවම ප්‍රියතම කිසිවක් නැත</b><p>කවියක් බලන විට හදවත ඔබන්න.</p><a class="btn" href="#/' + PART + '/mala">📖 කවි බලමු</a></div></section>';
    var groups = {}, order = [];
    items.forEach(function (it) { var g = it.group || 'වෙනත්'; if (!groups[g]) { groups[g] = []; order.push(g); } groups[g].push(it); });
    order.sort();
    var h = head + '<p class="fav-total">ප්‍රියතම <b>' + items.length + '</b></p>';
    order.forEach(function (g) {
      h += '<h2 class="sec">' + esc(g) + ' <small>(' + groups[g].length + ')</small></h2><div class="tiles">';
      groups[g].forEach(function (it) {
        h += '<div class="tile-wrap"><a class="tile" href="' + esc(it.url) + '"><div class="thumb">' + Fav.thumb(it) + '</div>' +
          '<div class="tile-body"><span class="tile-num">' + esc(it.sub || '') + '</span><b>' + esc(it.title) + '</b></div></a>' + Fav.button(it, { small: true }) + '</div>';
      });
      h += '</div>';
    });
    return h + '</section>';
  }

  /* ---------- pages ---------- */
  function garland() {
    var h = '';
    LEVELS.forEach(function (L) {
      var done = levelDone(L), all = L.to - L.from + 1, fl = '';
      for (var n = L.from; n <= L.to; n++) {
        var v = V[n - 1];
        fl += '<a class="bloom' + (learned[n] ? ' on' : '') + '" href="#/' + PART + '/kavi/' + n + '" title="' + esc(n + '. ' + v.title) + '" aria-label="' + esc('කවිය ' + n + ': ' + v.title + (learned[n] ? ' (ඉගෙන ගත්තා)' : '')) + '">' +
          flowerSvg(L.color, !!learned[n]) + '<b>' + n + '</b></a>';
      }
      h += '<section class="lvl" style="--c:' + L.color + '">' +
        '<header class="lvl-head"><span class="lvl-ico" aria-hidden="true">' + L.icon + '</span>' +
        '<div><h3>' + L.n + ' වන පියවර · ' + esc(L.name) + '</h3><p>' + esc(L.about) + '</p></div>' +
        '<span class="lvl-count">' + done + ' / ' + all + '</span></header>' +
        '<div class="vine">' + fl + '</div></section>';
    });
    return h;
  }

  function partCats() {
    var seen = {};
    V.forEach(function (v) { seen[v.cat] = true; });
    return Object.keys(CATS).filter(function (k) { return seen[k]; });
  }

  function pageHome() {
    var c = learnedCount();
    var next = 1;
    for (var n = 1; n <= TOTAL; n++) { if (!learned[n]) { next = n; break; } if (n === TOTAL) next = TOTAL; }
    var started = c > 0 || lastRead > 1;
    var go = started ? (learned[lastRead] ? next : lastRead) : 1;
    var cats = partCats().map(function (k) { return catChip(k, true); }).join('');
    return partTabs('') + '<section class="hero">' +
      '<div class="hero-text">' +
        '<div class="school"><img src="assets/img/logo.jpg" alt="" width="56" height="56"><span><b>Mahamevnawa Dhamma School UK</b><small>මහමෙව්නාව දහම් පාසල</small></span></div>' +
        '<p class="eyebrow">ළමයින් සඳහා · ' + esc(PARTS[PART].name) + ' · කවි ' + TOTAL + '</p>' +
        '<h1>සිරිත් මල්දම</h1>' +
        '<p class="lead">පින්තූර බලමු. කවිය කියමු. හොඳ පුරුද්දක් ඉගෙන ගනිමු. <br>එක කවියකට එක මලක් — මල් ' + TOTAL + ' න් ඔබේ <b>මල්දම</b> ගොතමු!</p>' +
        '<div class="hero-cta">' +
          '<a class="btn big" href="#/' + PART + '/kavi/' + go + '">' + (started ? '▶ දිගටම කියවමු · කවිය ' + go : '▶ පටන් ගනිමු') + '</a>' +
          '<a class="btn ghost" href="#/' + PART + '/mala">📖 කවි සියල්ල</a>' +
        '</div>' +
        '<div class="meter" role="img" aria-label="' + c + ' / ' + TOTAL + '"><div class="meter-bar"><i style="width:' + Math.max(2, Math.round(c / TOTAL * 100)) + '%"></i></div><span>🌸 මල් <b>' + c + '</b> / ' + TOTAL + '</span></div>' +
      '</div>' +
      '<a class="hero-art" href="#/' + PART + '/kavi/' + go + '" aria-label="කවිය ' + go + '">' + window.Scenes.render(PART, c >= TOTAL ? 62 : 1, 'සිරිත් මල්දම') + '</a>' +
    '</section>' +

    '<section class="how" aria-label="ඉගෙන ගන්නා හැටි">' +
      '<div class="how-card"><span>👀</span><b>1. බලමු</b><p>පින්තූරය බලා සිදු වන දේ කියමු.</p></div>' +
      '<div class="how-card"><span>🗣️</span><b>2. කියමු</b><p>කවිය හඬ නඟා කියමු.</p></div>' +
      '<div class="how-card"><span>💡</span><b>3. තේරුම් ගනිමු</b><p>කවියේ තේරුම දැන ගනිමු.</p></div>' +
      '<div class="how-card"><span>🌸</span><b>4. කරමු</b><p>පොරොන්දු වී මලක් ලබා ගනිමු.</p></div>' +
    '</section>' +

    '<section class="block"><div class="block-head"><h2>🌸 මගේ මල්දම · ' + esc(PARTS[PART].name) + '</h2><p>මලක් ඔබා කවිය බලන්න. ඉගෙන ගත් කවිවල මල් පිපෙයි.</p></div>' + garland() + '</section>' +
    '<section class="block"><div class="block-head"><h2>🎨 මාතෘකා අනුව</h2><p>කැමති මාතෘකාවක් තෝරන්න.</p></div><div class="chips">' + cats + '</div></section>';
  }

  function versesHtml(v) {
    return v.verse.split('\n').map(function (l, i) { return '<span class="line" style="animation-delay:' + (i * 0.12) + 's">' + esc(l) + '</span>'; }).join('');
  }

  function legend(svg) {
    var h = '';
    if (svg.indexOf('stroke-dasharray="9 6"') !== -1) h += '<span class="lg no">✕ මෙහෙම එපා</span>';
    if (svg.indexOf('stroke="#16a34a" stroke-width="4"') !== -1) h += '<span class="lg yes">✓ මෙහෙම හොඳයි</span>';
    if (svg.indexOf('stroke="#f59e0b" stroke-width="4"') !== -1) h += '<span class="lg step">① ② ③ ④ පියවරෙන් පියවර</span>';
    return h ? '<figcaption>' + h + '</figcaption>' : '';
  }

  /* ---------- Dhamma citations (verbatim from tripitaka.online) ---------- */
  var REFS = window.SM_REFS || { lib: {}, map: {}, articles: {}, amap: {}, sources: [] };
  function refsFor(part, n) { return ((REFS.map[part] || {})[n] || []).map(function (k) { return REFS.lib[k]; }).filter(Boolean); }
  function refHtml(r) {
    var pali = r.pali ? '<p class="pali" lang="pi">' + r.pali.split('\n').map(esc).join('<br>') + '</p>' : '';
    var si = (r.pre ? '… ' : '') + r.si.split('\n').map(esc).join('<br>') + (r.more ? ' …' : '');
    return '<div class="ref"><div class="ref-head"><b>' + esc(r.ref) + '</b><span>' + esc(r.coll) + '</span></div>' + pali +
      '<blockquote class="ref-si' + (r.verse ? ' verse-si' : '') + '" lang="si">' + si + '</blockquote>' +
      '<a class="ref-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">tripitaka.online හි සම්පූර්ණයෙන් කියවන්න ↗</a></div>';
  }
  function teacherSource(n) {
    var rs = refsFor(PART, n);
    if (!rs.length) return '<p class="src-note"><b>මූලාශ්‍රය:</b> මෙය යහපත් සිරිතකි. මෙයට ගැළපෙන බුදු වදනක් තහවුරු කර ගත නොහැකි වූ බැවින් කිසිවක් දක්වා නැත.</p>';
    var seen = {}, names = [];
    rs.forEach(function (r) { if (!seen[r.ref]) { seen[r.ref] = 1; names.push(r.ref); } });
    return '<p class="src-note"><b>බුදු වදන:</b> ' + esc(names.join(', ')) + '. ඉහත දැක්වෙන බුදු වදන දරුවන්ට කියවා දී, කවිය සමඟ සසඳා පෙන්වන්න.</p>';
  }
  function dhammaCard(n) {
    var rs = refsFor(PART, n), as = ((REFS.amap[PART] || {})[n] || []).map(function (k) { return REFS.articles[k]; }).filter(Boolean);
    if (!rs.length && !as.length) return '';
    var h = '<section class="card dhamma-card"><div class="card-tag">☸ බුදුරජාණන් වහන්සේ වදාළ දහම</div>';
    if (rs.length) {
      h += refHtml(rs[0]);
      if (rs.length > 1) h += '<details class="ref-more"><summary>තවත් බුදු වදන් ' + (rs.length - 1) + ' ක්</summary>' + rs.slice(1).map(refHtml).join('') + '</details>';
      h += '<p class="ref-by">සිංහල පරිවර්තනය: අතිපූජ්‍ය කිරිබත්ගොඩ ඤාණානන්ද ස්වාමීන් වහන්සේ</p>';
    }
    as.forEach(function (a) { h += '<a class="ref-article" href="' + esc(a.url) + '" target="_blank" rel="noopener"><span aria-hidden="true">📖</span><span><small>පුංචි අපේ දහම් පාසල · මහාමේඝ</small><b>' + esc(a.title) + ' ↗</b></span></a>'; });
    return h + '</section>';
  }

  function pagePoem(n) {
    var v = V[n - 1], L = levelOf(n), on = !!learned[n];
    var pic = window.Scenes.render(PART, n, v.title);
    var dots = '';
    for (var i = L.from; i <= L.to; i++) dots += '<a href="#/' + PART + '/kavi/' + i + '" class="dot' + (i === n ? ' now' : '') + (learned[i] ? ' on' : '') + '" aria-label="කවිය ' + i + '"></a>';
    return '<article class="poem" style="--c:' + L.color + '">' +
      '<div class="poem-top">' +
        '<div class="crumbs"><a class="chip" style="--c:#b45309" href="#/' + PART + '/">' + (['📙', '📗', '📘'][PART - 1] || '📕') + ' ' + esc(PARTS[PART].name) + '</a><span class="chip solid" style="--c:' + L.color + '">' + L.icon + ' ' + L.n + ' වන පියවර · ' + esc(L.name) + '</span>' + catChip(v.cat, true) + '</div>' +
        '<button class="btn ghost small" id="presentBtn" type="button">🖥️ ලොකු තිරය</button>' +
      '</div>' +
      '<header class="poem-head"><span class="num" aria-label="කවිය ' + n + '">' + pad(n) + '</span><div><h1>' + esc(v.title) + '</h1><p class="sub">' + esc(v.titleEn) + '</p></div>' + Fav.button(favItem(PART, n), { label: true }) + '</header>' +
      '<div class="poem-grid">' +
        '<figure class="scene-card">' + pic + legend(pic) + '</figure>' +
        '<div class="poem-side">' +
          '<section class="card verse-card"><div class="card-tag">📜 කවිය</div><p class="verse" lang="si">' + versesHtml(v) + '</p>' +
            '<button class="btn listen" id="listenBtn" type="button"><span aria-hidden="true">🔊</span> අහමු</button></section>' +
          '<section class="card meaning-card"><div class="card-tag">💡 තේරුම</div><p class="dear">පින්වත් දුවේ පුතේ,</p><p>' + esc(v.moral) + '</p></section>' +
          dhammaCard(n) +
          '<section class="card promise-card' + (on ? ' on' : '') + '" id="promiseCard"><div class="card-tag">🤝 මගේ පොරොන්දුව</div><p class="promise">“' + esc(v.promise) + '”</p>' +
            '<button class="btn learn" id="learnBtn" type="button" aria-pressed="' + on + '">' + (on ? '🌸 ඉගෙන ගත්තා!' : '🌱 මම ඉගෙන ගත්තා') + '</button></section>' +
          '<details class="more"><summary>🌍 English</summary><p lang="en">' + esc(v.en) + '</p></details>' +
          '<details class="more"><summary>👩‍🏫 ගුරුවරුන්ට / දෙමාපියන්ට</summary><p><b>ගුණය:</b> ' + esc(v.value) + '</p><p><b>ඉගැන්වීමට:</b> ' + esc(v.note) + '</p>' + teacherSource(n) +
            '<p class="ask"><b>අසන්න:</b> රතු පින්තූරයේ වැරැද්ද කුමක්ද? කොළ පින්තූරයේ හොඳ දේ කුමක්ද? ඔබ අද එය කරන්නේ කෙසේද?</p></details>' +
        '</div>' +
      '</div>' +
      '<nav class="pager" aria-label="කවි අතර">' +
        (n > 1 ? '<a class="btn nav-btn" href="#/' + PART + '/kavi/' + (n - 1) + '" rel="prev">◀ <span>පෙර</span></a>' : '<span class="btn nav-btn off">◀ <span>පෙර</span></span>') +
        '<div class="dots">' + dots + '</div>' +
        (n < TOTAL ? '<a class="btn nav-btn next" href="#/' + PART + '/kavi/' + (n + 1) + '" rel="next"><span>ඊළඟ</span> ▶</a>' : '<a class="btn nav-btn next" href="#/' + PART + '/quiz"><span>ප්‍රශ්න</span> ⭐</a>') +
      '</nav>' +
    '</article>';
  }

  var galleryCat = '', galleryQ = '';
  function galleryCards() {
    var q = galleryQ.trim().toLowerCase(), h = '', count = 0;
    V.forEach(function (v) {
      if (galleryCat === '__fav') { if (!Fav.has(favItem(PART, v.id))) return; }
      else if (galleryCat && v.cat !== galleryCat) return;
      if (q && (v.title + ' ' + v.verse + ' ' + v.cat + ' ' + v.titleEn + ' ' + v.moral + ' ' + v.id).toLowerCase().indexOf(q) === -1) return;
      count++;
      var c = CATS[v.cat];
      h += '<div class="tile-wrap"><a class="tile' + (learned[v.id] ? ' on' : '') + '" href="#/' + PART + '/kavi/' + v.id + '" style="--c:' + c[1] + '">' +
        '<div class="thumb" data-scene="' + v.id + '"></div>' +
        '<div class="tile-body"><span class="tile-num">' + pad(v.id) + '</span><b>' + esc(v.title) + '</b><small>' + c[0] + ' ' + esc(v.cat) + '</small></div>' +
        (refsFor(PART, v.id).length ? '<span class="tile-ref" title="බුදු වදනක් සමඟ" aria-label="බුදු වදනක් සමඟ">☸</span>' : '') +
        (learned[v.id] ? '<span class="tile-done" aria-label="ඉගෙන ගත්තා">🌸</span>' : '') + '</a>' + Fav.button(favItem(PART, v.id), { small: true }) + '</div>';
    });
    if (!count && galleryCat === '__fav') return '<p class="empty">🤍 මෙම කොටසේ ප්‍රියතම කිසිවක් තවම නැත. කවියක හදවත ඔබන්න.</p>';
    return count ? h : '<p class="empty">🔍 කිසිවක් හමු නොවීය. වෙනත් වචනයක් උත්සාහ කරන්න.</p>';
  }
  function pageGallery() {
    var chips = '<button class="chip' + (galleryCat ? '' : ' active') + '" data-filter="" style="--c:#f59e0b" type="button">🌈 සියල්ල</button>';
    chips += '<button class="chip' + (galleryCat === '__fav' ? ' active' : '') + '" data-filter="__fav" style="--c:#e11d48" type="button">❤️ මගේ ප්‍රියතම</button>';
    partCats().forEach(function (k) {
      chips += '<button class="chip' + (galleryCat === k ? ' active' : '') + '" data-filter="' + esc(k) + '" style="--c:' + CATS[k][1] + '" type="button">' + CATS[k][0] + ' ' + esc(k) + '</button>';
    });
    return partTabs('mala') + '<section class="block first"><div class="block-head"><h1>📖 ' + esc(PARTS[PART].name) + ' · කවි ' + TOTAL + '</h1><p>පින්තූරයක් ඔබා කවිය බලන්න.</p></div>' +
      '<label class="search"><span aria-hidden="true">🔍</span><input id="searchBox" type="search" placeholder="සොයන්න… (උදා: සතුන්, පාසල, 14)" value="' + esc(galleryQ) + '" aria-label="කවි සොයන්න"></label>' +
      '<div class="chips scroll" id="filterChips">' + chips + '</div>' +
      '<div class="tiles" id="tiles">' + galleryCards() + '</div></section>';
  }
  var thumbObs = null;
  function hydrateThumbs() {
    var els = app.querySelectorAll('.thumb[data-scene]');
    function fill(el) { if (el.dataset.done) return; el.dataset.done = '1'; el.innerHTML = window.Scenes.render(PART, +el.dataset.scene); }
    if (thumbObs) thumbObs.disconnect();
    if (!('IntersectionObserver' in window)) { Array.prototype.forEach.call(els, fill); return; }
    thumbObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fill(e.target); thumbObs.unobserve(e.target); } }); }, { rootMargin: '300px' });
    Array.prototype.forEach.call(els, function (el) { thumbObs.observe(el); });
  }

  function pageTaraka() {
    var c = learnedCount(), look = Math.max(1, c), L = levelOf(look);
    var cards = '';
    LEVELS.forEach(function (lv) {
      var done = levelDone(lv), all = lv.to - lv.from + 1, open = c >= lv.from - 1 || done > 0;
      cards += '<a class="grow-card' + (done === all ? ' done' : '') + (lv.n === L.n ? ' now' : '') + '" style="--c:' + lv.color + '" href="#/' + PART + '/kavi/' + lv.from + '">' +
        '<div class="grow-pic' + (open ? '' : ' locked') + '">' + window.Scenes.portrait(PART, lv.to, { bg: '#fff7e6' }) + '</div>' +
        '<b>' + lv.icon + ' ' + esc(lv.stage) + '</b><span>' + esc(lv.name) + '</span><small>කවි ' + lv.from + '–' + lv.to + '</small>' +
        '<div class="meter-bar"><i style="width:' + Math.round(done / all * 100) + '%"></i></div><em>' + done + ' / ' + all + '</em></a>';
    });
    var badges = '';
    V.forEach(function (v) {
      var on = !!learned[v.id];
      badges += '<a class="badge' + (on ? ' on' : '') + '" href="#/' + PART + '/kavi/' + v.id + '" style="--c:' + levelOf(v.id).color + '"><span aria-hidden="true">' + (on ? v.icon : '🔒') + '</span><b>' + pad(v.id) + '</b><small>' + esc(v.title) + '</small></a>';
    });
    var msg = c === 0 ? 'පළමු කවිය ඉගෙන ගෙන තාරක සමඟ ගමන පටන් ගනිමු!' :
      c >= TOTAL ? 'සුබ පැතුම්! ඔබ කවි ' + TOTAL + ' ම ඉගෙන ගත්තා. ඔබේ මල්දම සම්පූර්ණයි! 👑' :
      'ඔබ කවි ' + c + ' ක් ඉගෙන ගෙන ඇත. තව ' + (TOTAL - c) + ' යි!';
    return partTabs('taraka') + '<section class="block first"><div class="block-head"><h1>🧒 තාරකගේ ගමන · ' + esc(PARTS[PART].name) + '</h1><p>ඔබ හොඳ සිරිත් ඉගෙන ගන්නා විට තාරකත් හොඳ දරුවෙක් වෙයි.</p></div>' +
      '<div class="me"><div class="me-pic">' + window.Scenes.portrait(PART, look, { bg: '#fff1c9' }) + '</div>' +
        '<div class="me-text"><span class="chip solid" style="--c:' + L.color + '">' + L.icon + ' ' + esc(L.stage) + ' · ' + esc(L.name) + '</span><h2>' + esc(msg) + '</h2>' +
        '<div class="meter"><div class="meter-bar"><i style="width:' + Math.max(2, Math.round(c / TOTAL * 100)) + '%"></i></div><span>🌸 <b>' + c + '</b> / ' + TOTAL + '</span></div>' +
        '<p class="stars-line">ප්‍රශ්න තරු: ' + starRow(bestStars) + '</p></div></div>' +
      '<h2 class="sec">🌱 බීජයේ සිට මල්දම දක්වා</h2><div class="grow">' + cards + '</div>' +
      '<h2 class="sec">🏅 මගේ ගුණ පදක්කම්</h2><div class="badges">' + badges + '</div></section>';
  }
  function starRow(n) { var s = ''; for (var i = 1; i <= 3; i++) s += '<span class="star' + (i <= n ? ' on' : '') + '">★</span>'; return s; }

  /* ---------- quiz ---------- */
  var quiz = null;
  function newQuiz() {
    var pics = shuffle(V).slice(0, 5).map(function (v) {
      var wrong = shuffle(V.filter(function (x) { return x.id !== v.id && x.title !== v.title; })).slice(0, 2).map(function (x) { return x.title; });
      var opts = shuffle([v.title].concat(wrong));
      return { kind: 'pic', v: v.id, q: 'මේ පින්තූරය කියන්නේ කුමක්ද?', options: opts, correct: opts.indexOf(v.title) };
    });
    var txt = shuffle(PARTS[PART].quiz).slice(0, 3).map(function (q) {
      var order = shuffle(q.options.map(function (_, i) { return i; }));
      return { kind: 'txt', v: q.v, q: q.q, options: order.map(function (i) { return q.options[i]; }), correct: order.indexOf(q.correct) };
    });
    quiz = { items: shuffle(pics.concat(txt)), i: 0, score: 0, answered: false };
  }
  function pageQuiz() {
    if (!quiz) {
      return partTabs('quiz') + '<section class="block first quiz-intro"><div class="quiz-art">' + window.Scenes.portrait(PART, 40, { bg: '#fff1c9', armR: 'wave', armL: 'hip' }) + '</div>' +
        '<h1>⭐ ප්‍රශ්න ක්‍රීඩාව · ' + esc(PARTS[PART].name) + '</h1><p>ප්‍රශ්න 8 යි. පින්තූරය බලා නිවැරදි පිළිතුර තෝරන්න.</p>' +
        '<p class="stars-line big">' + starRow(bestStars) + '</p>' +
        '<button class="btn big" id="quizStart" type="button">▶ පටන් ගනිමු</button></section>';
    }
    if (quiz.i >= quiz.items.length) {
      var s = quiz.score, n = quiz.items.length, stars = s >= n ? 3 : s >= n - 2 ? 2 : s >= Math.ceil(n / 2) ? 1 : 0;
      var m = stars === 3 ? 'විශිෂ්ටයි! ඔබ සිරිත් මල්දම හොඳින් දන්නවා!' : stars === 2 ? 'ඉතා හොඳයි! තව ටිකක් කියවමු.' : stars === 1 ? 'හොඳයි! නැවත උත්සාහ කරමු.' : 'කමක් නැහැ! කවි නැවත බලා උත්සාහ කරමු.';
      return '<section class="block first quiz-intro"><div class="quiz-art">' + window.Scenes.portrait(PART, stars >= 2 ? 62 : 30, { bg: '#fff1c9' }) + '</div>' +
        '<h1>' + s + ' / ' + n + '</h1><p class="stars-line big">' + starRow(stars) + '</p><p>' + m + '</p>' +
        '<div class="hero-cta center"><button class="btn big" id="quizStart" type="button">🔁 නැවත</button><a class="btn ghost" href="#/' + PART + '/mala">📖 කවි බලමු</a></div></section>';
    }
    var it = quiz.items[quiz.i], opts = '';
    it.options.forEach(function (o, i) { opts += '<button class="opt" type="button" data-i="' + i + '"><span class="opt-k">' + ['අ', 'ආ', 'ඇ', 'ඈ'][i] + '</span><span>' + esc(o) + '</span></button>'; });
    return '<section class="block first quiz"><div class="quiz-bar"><span>ප්‍රශ්නය ' + (quiz.i + 1) + ' / ' + quiz.items.length + '</span><div class="meter-bar"><i style="width:' + Math.round(quiz.i / quiz.items.length * 100) + '%"></i></div><span>⭐ ' + quiz.score + '</span></div>' +
      '<div class="quiz-grid">' + (it.kind === 'pic' ? '<figure class="scene-card">' + window.Scenes.render(PART, it.v) + '</figure>' : '<figure class="scene-card q-txt"><span aria-hidden="true">🤔</span></figure>') +
      '<div><h2 class="quiz-q">' + esc(it.q) + '</h2><div class="opts" id="opts">' + opts + '</div>' +
      '<div class="quiz-after" id="quizAfter" hidden><p id="quizMsg"></p><a class="btn ghost small" href="#/' + PART + '/kavi/' + it.v + '">📖 කවිය ' + it.v + ' බලන්න</a> <button class="btn" id="quizNext" type="button">ඊළඟ ▶</button></div></div></div></section>';
  }

  function pageGuru() {
    var cited = 0, total = 0;
    Object.keys(PARTS).forEach(function (p) { total += PARTS[p].verses.length; cited += Object.keys(REFS.map[p] || {}).length; });
    var src = REFS.sources.map(function (x) { return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener"><b>' + esc(x.name) + ' ↗</b></a><span>' + esc(x.about) + '</span></li>'; }).join('');
    var sources = '<section class="block"><div class="block-head"><h2>☸ දහම් මූලාශ්‍ර</h2><p>මෙම පිටුවේ දහම් කරුණු ගනු ලබන්නේ පහත මූලාශ්‍ර තුනෙන් පමණි.</p></div>' +
      '<div class="guide"><div class="card"><ul class="src-list">' + src + '</ul></div>' +
      '<div class="card"><h3>බුදු වදන් දක්වා ඇති ආකාරය</h3><p>කවි ' + total + ' න් ' + cited + ' කට ගැළපෙන බුදු වදනක් දක්වා ඇත. සෑම පාළි පාඨයක් ම සහ සිංහල පරිවර්තනයක් ම tripitaka.online වෙතින් අකුරක් නෑර උපුටා ගෙන, සබැඳියක් සමඟ දක්වා ඇත.</p></div>' +
      '<div class="card"><h3>බුදු වදනක් නැති කවි</h3><p>සමහර කවිවල ඇත්තේ පැරණි ගෘහ සිරිත්, පිරිසිදුකම සහ ආරක්ෂාව වැනි දේ ය. ඒවාට ගැළපෙන සූත්‍රයක් තහවුරු කර ගත නොහැකි වූ විට බුදු වදනක් ලෙස කිසිවක් දක්වා නැත.</p></div></div></section>';
    return '<section class="block first prose"><div class="block-head"><h1>👩‍🏫 ගුරුවරුන්ට සහ දෙමාපියන්ට</h1><p>මෙම පිටුව පන්තියේදී සහ ගෙදරදී භාවිත කරන හැටි.</p></div>' +
      '<div class="guide">' +
      '<div class="card"><h3>1. පින්තූරයෙන් පටන් ගන්න</h3><p>කවිය කියවීමට පෙර පින්තූරය පෙන්වන්න. <b class="no-t">රතු</b> රාමුවේ ඇත්තේ නොකළ යුතු දෙයයි. <b class="yes-t">කොළ</b> රාමුවේ ඇත්තේ හොඳ පුරුද්දයි. “මෙහි සිදු වන්නේ කුමක්ද?” යැයි දරුවන්ගෙන් අසන්න.</p></div>' +
      '<div class="card"><h3>2. කවිය එකට කියන්න</h3><p>කවිය පේළියෙන් පේළිය හඬ නඟා කියවන්න. දරුවන් ඔබ පසුපස කියවීමට සලස්වන්න. “ලොකු තිරය” බොත්තම පන්ති කාමරයේ තිරයට සුදුසුය.</p></div>' +
      '<div class="card"><h3>3. තේරුම කතා කරන්න</h3><p>තේරුම සරල වචනවලින් පැහැදිලි කරන්න. දරුවාගේ ජීවිතයෙන් උදාහරණයක් අසන්න.</p></div>' +
      '<div class="card"><h3>4. පොරොන්දුව</h3><p>“මගේ පොරොන්දුව” දරුවා විසින් කියවා “මම ඉගෙන ගත්තා” බොත්තම ඔබන්න. මලක් පිපෙයි. එක් කොටසක මල් 62 න් මල්දම සම්පූර්ණ වෙයි. කොටස් තුනක් ඇත.</p></div>' +
      '<div class="card"><h3>5. ප්‍රශ්න ක්‍රීඩාව</h3><p>සතියකට වරක් ප්‍රශ්න ක්‍රීඩාව කරන්න. පින්තූරය බලා පුරුද්ද හඳුනා ගැනීම මතකය ශක්තිමත් කරයි.</p></div>' +
      '<div class="card"><h3>සටහන</h3><p>ප්‍රගතිය සුරැකෙන්නේ මෙම උපාංගයේ බ්‍රවුසරයේ පමණි. කවි ඇම්. ඇල්. සිල්වා ගුරු මුහන්දිරම් මැතිඳුන්ගේ “සිරිත් මල්දම” කෘතියෙනි. 2 සහ 3 කොටස්වල කවි විකිමූලාශ්‍රයෙනි; ඒවායේ තේරුම් සහ ඉංග්‍රීසි පරිවර්තන මෙම පිටුව සඳහා ලියන ලදී.</p>' +
      '<button class="btn ghost small danger" id="resetBtn" type="button">🗑️ ' + esc(PARTS[PART].name) + ' ප්‍රගතිය මකන්න</button></div>' +
      '</div></section>' + sources;
  }

  /* ---------- router ---------- */
  function route() {
    var h = (location.hash || '#/').replace(/^#\/?/, ''), parts = h.split('/');
    if (/^\d+$/.test(parts[0])) { var np = PARTS[parts[0]] ? +parts[0] : 1; if (np !== PART) { galleryCat = ''; galleryQ = ''; quiz = null; } setPart(np); parts.shift(); }
    else if (parts[0]) { if (PART !== 1) { galleryCat = ''; galleryQ = ''; quiz = null; } setPart(1); }
    var name = parts[0] || 'home';
    if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
    var html, nav = name;
    if (name === 'kavi') {
      var n = Math.min(TOTAL, Math.max(1, parseInt(parts[1], 10) || 1));
      html = pagePoem(n); nav = 'mala'; if (lastRead !== n) track('open', PART, n); setLast(n); app.dataset.poem = n;
      document.title = n + '. ' + V[n - 1].title + ' — සිරිත් මල්දම ' + PARTS[PART].name;
    } else {
      delete app.dataset.poem;
      document.body.classList.remove('present');
      if (name === 'mala') { html = pageGallery(); document.title = 'කවි 62 — සිරිත් මල්දම'; }
      else if (name === 'taraka') { html = pageTaraka(); document.title = 'තාරකගේ ගමන — සිරිත් මල්දම'; }
      else if (name === 'quiz') { html = pageQuiz(); document.title = 'ප්‍රශ්න — සිරිත් මල්දම'; }
      else if (name === 'guru') { html = pageGuru(); document.title = 'ගුරුවරුන්ට — සිරිත් මල්දම'; }
      else if (name === 'fav') { html = pageFav(); nav = 'fav'; document.title = 'මගේ ප්‍රියතම — සිරිත් මල්දම'; }
      else if (name === 'mama') { html = pageMe(); nav = 'mama'; document.title = 'මගේ ප්‍රගතිය — සිරිත් මල්දම'; }
      else { nav = 'home'; html = pageHome(); document.title = 'සිරිත් මල්දම — පින්තූර කවි පොත'; }
    }
    app.innerHTML = html;
    app.className = 'page-' + name;
    var paths = { home: '', mala: 'mala', taraka: 'taraka', quiz: 'quiz', guru: 'guru' };
    Array.prototype.forEach.call(document.querySelectorAll('.nav a'), function (a) { a.setAttribute('href', '#/' + PART + '/' + paths[a.dataset.nav]); });
    document.getElementById('progressPill').setAttribute('href', '#/' + PART + '/taraka');
    document.querySelector('.brand').setAttribute('href', '#/' + PART + '/');
    document.getElementById('partBadge').textContent = PART;
    var fp = document.getElementById('favPill'); fp.setAttribute('href', '#/' + PART + '/fav'); fp.classList.toggle('active', nav === 'fav');
    paintFavCount(); paintMe();
    var mp = document.getElementById('mePill'); if (mp) mp.classList.toggle('active', nav === 'mama');
    Array.prototype.forEach.call(document.querySelectorAll('.nav a'), function (a) { a.classList.toggle('active', a.dataset.nav === nav); if (a.dataset.nav === nav) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (name === 'mala') hydrateThumbs();
    paintProgress();
    window.scrollTo(0, 0);
  }

  /* ---------- events ---------- */
  app.addEventListener('click', function (e) {
    var t = e.target.closest('button, a');
    if (!t) return;
    if (t.dataset.cat !== undefined) { galleryCat = t.dataset.cat; galleryQ = ''; if (/\/mala$/.test(location.hash)) { e.preventDefault(); route(); } return; }
    if (t.id === 'listenBtn') { readAloud(V[+app.dataset.poem - 1].verse, t); return; }
    if (t.id === 'presentBtn') {
      var onNow = document.body.classList.toggle('present');
      t.textContent = onNow ? '✕ වසන්න' : '🖥️ ලොකු තිරය';
      try { if (onNow && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {}); else if (!onNow && document.fullscreenElement) document.exitFullscreen(); } catch (err) { /* ignore */ }
      return;
    }
    if (t.id === 'learnBtn') {
      var n = +app.dataset.poem, was = !!learned[n];
      if (was) delete learned[n]; else learned[n] = true;
      saveLearned(); paintProgress(); track(was ? 'unlearned' : 'learned', PART, n);
      t.setAttribute('aria-pressed', String(!was));
      t.textContent = was ? '🌱 මම ඉගෙන ගත්තා' : '🌸 ඉගෙන ගත්තා!';
      document.getElementById('promiseCard').classList.toggle('on', !was);
      var d = app.querySelector('.dot.now'); if (d) d.classList.toggle('on', !was);
      if (!was) {
        confetti();
        var c = learnedCount(), L = levelOf(n);
        if (c >= TOTAL) { sfx.win(); toast('👑 සුබ පැතුම්! ඔබේ මල්දම සම්පූර්ණයි!'); }
        else if (levelDone(L) === L.to - L.from + 1) { sfx.win(); toast(L.icon + ' ' + L.n + ' වන පියවර සම්පූර්ණයි! ශාබාෂ්!'); }
        else { sfx.good(); toast('🌸 මලක් පිපුණා! දැන් මල් ' + c + ' යි.'); }
      }
      return;
    }
    if (t.dataset.filter !== undefined) {
      galleryCat = t.dataset.filter;
      Array.prototype.forEach.call(app.querySelectorAll('#filterChips .chip'), function (c) { c.classList.toggle('active', c === t); });
      document.getElementById('tiles').innerHTML = galleryCards(); hydrateThumbs(); sfx.page(); return;
    }
    if (t.id === 'quizStart') { newQuiz(); sfx.page(); route(); return; }
    if (t.id === 'quizNext') { quiz.i++; quiz.answered = false; if (quiz.i >= quiz.items.length) { var s = quiz.score, m = quiz.items.length, st = s >= m ? 3 : s >= m - 2 ? 2 : s >= Math.ceil(m / 2) ? 1 : 0; if (st > bestStars) setStars(st); track('quiz', PART, '', st); if (st >= 2) { confetti(); sfx.win(); } } route(); return; }
    if (t.classList.contains('opt') && quiz && !quiz.answered) {
      quiz.answered = true;
      var it = quiz.items[quiz.i], pick = +t.dataset.i, ok = pick === it.correct;
      Array.prototype.forEach.call(app.querySelectorAll('.opt'), function (b, i) { b.disabled = true; if (i === it.correct) b.classList.add('right'); else if (i === pick) b.classList.add('wrong'); });
      if (ok) { quiz.score++; sfx.good(); } else sfx.bad();
      document.getElementById('quizMsg').textContent = ok ? '✅ නිවැරදියි! ශාබාෂ්!' : '💛 නිවැරදි පිළිතුර කොළ පාටින් පෙන්වා ඇත.';
      document.getElementById('quizAfter').hidden = false;
      document.getElementById('quizNext').focus();
      return;
    }
    if (t.id === 'meSyncBtn') { meMsg('⏳ යවමින්…', true); Trk.flush().then(function () { meMsg(Trk.pending() ? 'යැවීමට නොහැකි විය. පසුව නැවත උත්සාහ කරන්න.' : 'සියල්ල යවා ඇත.', !Trk.pending()); }); return; }
    if (t.id === 'meLeave') {
      var go = function () { if (window.confirm('පිටවන්නද? ඔබේ රහස් කේතය ලියා ගත්තාද? මෙම උපාංගයේ ප්‍රගතිය මැකේ. ගුරුතුමාගේ සටහන එලෙසම පවතී.')) { Trk.leave(); clearLocal(); paintProgress(); route(); toast('පිටවුණා. නැවත හමුවෙමු!'); } };
      Trk.flush().then(function () { if (Trk.pending() && !window.confirm('තවම නොයැවූ සටහන් ' + Trk.pending() + ' ක් ඇත. පිටවුවහොත් ඒවා නැති වේ. කෙසේ වුවත් පිටවන්නද?')) return; go(); });
      return;
    }
    if (t.id === 'resetBtn') {
      if (window.confirm(PARTS[PART].name + ': ඉගෙන ගත් සියලු මල් මකා දමන්නද?')) { STATE[PART].learned = learned = {}; saveLearned(); setStars(0); setLast(1); paintProgress(); toast(PARTS[PART].name + ' ප්‍රගතිය මකා දමන ලදී.'); }
      return;
    }
  });
  app.addEventListener('input', function (e) {
    if (e.target.id === 'searchBox') { galleryQ = e.target.value; document.getElementById('tiles').innerHTML = galleryCards(); hydrateThumbs(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!app.dataset.poem || e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''))) return;
    var n = +app.dataset.poem;
    if (e.key === 'ArrowRight' && n < TOTAL) location.hash = '#/' + PART + '/kavi/' + (n + 1);
    else if (e.key === 'ArrowLeft' && n > 1) location.hash = '#/' + PART + '/kavi/' + (n - 1);
    else if (e.key === 'Escape' && document.body.classList.contains('present')) { document.body.classList.remove('present'); var b = document.getElementById('presentBtn'); if (b) b.textContent = '🖥️ ලොකු තිරය'; }
  });
  /* swipe between poems */
  var sx = 0, sy = 0;
  app.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; sy = e.changedTouches[0].clientY; }, { passive: true });
  app.addEventListener('touchend', function (e) {
    if (!app.dataset.poem) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy, n = +app.dataset.poem;
    if (Math.abs(dx) < 70 || Math.abs(dy) > 50) return;
    if (dx < 0 && n < TOTAL) location.hash = '#/' + PART + '/kavi/' + (n + 1);
    else if (dx > 0 && n > 1) location.hash = '#/' + PART + '/kavi/' + (n - 1);
  }, { passive: true });
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && document.body.classList.contains('present')) { document.body.classList.remove('present'); var b = document.getElementById('presentBtn'); if (b) b.textContent = '🖥️ ලොකු තිරය'; }
  });

  window.addEventListener('hashchange', function () { if (!/\/quiz$/.test(location.hash)) quiz = null; sfx.page(); route(); });
  Fav.bind(document.body);
  paintSound();
  route();
})();
