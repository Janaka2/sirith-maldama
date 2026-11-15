/* මහාවංශය — දිනපතා අධ්‍යයන සටහන
 * සියලු දත්ත මෙම බ්‍රවුසරයේ localStorage හි පමණි. කිසිවක් සේවාදායකයකට නොයවයි.
 */
(function () {
  'use strict';
  var MV = window.MV, PARTS = window.MV_PARTS, SRC = window.MV_SRC;
  var KEY = 'mv-study-v1';
  var TOTAL = MV.reduce(function (a, c) { return a + c.p; }, 0);
  var SLOTS = [
    { k: 'm', n: 'උදේ', ico: '🌅', from: 0, to: 12 },
    { k: 'd', n: 'දවල්', ico: '☀️', from: 12, to: 17 },
    { k: 'e', n: 'හවස', ico: '🌙', from: 17, to: 24 }
  ];
  var MONTHS = ['ජන', 'පෙබ', 'මාර්', 'අප්‍රේ', 'මැයි', 'ජුනි', 'ජූලි', 'අගෝ', 'සැප්', 'ඔක්', 'නොවැ', 'දෙසැ'];
  var DAYS = ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'];

  /* ---------- storage ---------- */
  function blank() {
    return { v: 1, created: Date.now(), pos: { ch: 1, para: 0 }, round: 1, len: 5,
      times: { m: '06:30', d: '13:00', e: '20:30' }, days: {}, ch: {}, rounds: [], lastBackup: 0 };
  }
  var S;
  function load() {
    try { var raw = localStorage.getItem(KEY); S = raw ? JSON.parse(raw) : blank(); } catch (e) { S = blank(); }
    var b = blank();
    for (var k in b) if (!(k in S)) S[k] = b[k];
  }
  var storeOk = true;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storeOk = true; }
    catch (e) { storeOk = false; toast('⚠️ මෙම බ්‍රවුසරයේ සුරැකිය නොහැක. උපස්ථය බාගන්න.'); }
  }

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return x; }
  function today() { return ymd(new Date()); }
  function nf(n) { return Number(n).toLocaleString('en-US'); }
  function chap(n) { return MV[n - 1]; }
  function longDate(s) { var d = parse(s); return d.getFullYear() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ' · ' + DAYS[d.getDay()]; }
  function count(day) { var r = S.days[day]; if (!r) return 0; return SLOTS.reduce(function (a, s) { return a + (r[s.k] ? 1 : 0); }, 0); }
  function anyLate(day) { var r = S.days[day]; if (!r) return false; return SLOTS.some(function (s) { return r[s.k] && r[s.k].late; }); }
  var tt;
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 3200); }
  function curSlot() { var h = new Date().getHours(); for (var i = 0; i < SLOTS.length; i++) if (h >= SLOTS[i].from && h < SLOTS[i].to) return SLOTS[i].k; return 'e'; }

  /* ---------- progress ---------- */
  function chDone(n) { var c = S.ch[n]; return c && c.done ? c.done : []; }
  function doneThisRound(n) { return chDone(n).indexOf(S.round) >= 0; }
  function parasThisRound() {
    var t = 0;
    for (var i = 1; i <= 37; i++) if (doneThisRound(i)) t += chap(i).p;
    if (!doneThisRound(S.pos.ch)) t += Math.min(S.pos.para, chap(S.pos.ch).p);
    return t;
  }

  /* ---------- streaks ---------- */
  function streak(min) {
    var d = new Date(), cur = 0;
    if (count(ymd(d)) < min) d = addDays(d, -1); // today still open
    while (count(ymd(d)) >= min) { cur++; d = addDays(d, -1); }
    return cur;
  }
  function best(min) {
    var keys = Object.keys(S.days).filter(function (k) { return count(k) >= min; }).sort();
    var b = 0, run = 0, prev = null;
    keys.forEach(function (k) {
      var d = parse(k);
      run = prev && ymd(addDays(prev, 1)) === k ? run + 1 : 1;
      if (run > b) b = run; prev = d;
    });
    return b;
  }
  function totals() {
    var days = 0, ses = 0, min = 0;
    Object.keys(S.days).forEach(function (k) {
      var c = count(k); if (c) days++; ses += c;
      SLOTS.forEach(function (s) { var r = S.days[k][s.k]; if (r) min += r.min || 0; });
    });
    return { days: days, ses: ses, min: min };
  }
  function paceETA() {
    // pace over the last 14 days, counted from the first day with a reading in that window
    var since = addDays(new Date(), -13), read = 0, first = -1;
    for (var i = 0; i < 14; i++) {
      var k = ymd(addDays(since, i)), r = S.days[k]; if (!r) continue;
      SLOTS.forEach(function (s) { var x = r[s.k]; if (x && x.read) { read += x.read; if (first < 0) first = i; } });
    }
    if (!read || first < 0 || 14 - first < 3) return null; // need at least 3 days to judge the pace
    var perDay = read / (14 - first), left = TOTAL - parasThisRound();
    return { perDay: perDay, days: Math.ceil(left / perDay), date: addDays(new Date(), Math.ceil(left / perDay)) };
  }

  /* ---------- render: stats ---------- */
  function renderStats() {
    var st = streak(1), tot = totals(), done = parasThisRound(), eta = paceETA();
    var html = [
      ['fire', '🔥 ' + st, 'නොකඩවා දින'],
      ['', best(1), 'දිගම නොකඩවා දින'],
      ['', streak(3), 'වාර 3 ම කළ නොකඩවා දින'],
      ['', nf(tot.days), 'කියවූ දින ගණන'],
      ['', nf(tot.ses) + ' <small style="font-size:.9rem">(' + nf(tot.min) + ' මි.)</small>', 'වාර ගණන (විනාඩි)'],
      ['', Math.round(done * 100 / TOTAL) + '%', S.round + ' වන වටය: ඡේද ' + nf(done) + ' / ' + nf(TOTAL)]
    ].map(function (x) { return '<div class="mv-stat ' + x[0] + '"><b>' + x[1] + '</b><span>' + x[2] + '</span></div>'; }).join('');
    if (eta) html += '<div class="mv-stat"><b style="font-size:1.15rem">' + eta.date.getFullYear() + ' ' + MONTHS[eta.date.getMonth()] + ' ' + eta.date.getDate() + '</b><span>මේ වේගයෙන් නිම වන දිනය (දිනකට ඡේද ~' + Math.round(eta.perDay) + ')</span></div>';
    if (S.rounds.length) html += '<div class="mv-stat"><b>🏆 ' + S.rounds.length + '</b><span>සම්පූර්ණයෙන් කියවූ වාර</span></div>';
    $('stats').innerHTML = html;
    $('totP').textContent = nf(TOTAL);
    var w = '';
    var daysUsed = Object.keys(S.days).length;
    if (daysUsed >= 7 && Date.now() - (S.lastBackup || 0) > 30 * 864e5)
      w = '<p class="mv-warn">💾 ඔබේ සටහන් මෙම බ්‍රවුසරයේ පමණි. දින 30 කට වැඩි කාලයක් උපස්ථයක් ගෙන නැත. <a href="#datta" style="text-decoration:underline">උපස්ථය බාගන්න</a>.</p>';
    if (!storeOk) w += '<p class="mv-warn">⚠️ මෙම බ්‍රවුසරය දත්ත සුරකින්නේ නැත (පුද්ගලික කවුළුවක්ද?).</p>';
    $('warn').innerHTML = w;
  }

  /* ---------- render: now ---------- */
  function renderNow() {
    var c = chap(S.pos.ch), pct = Math.round(S.pos.para * 100 / c.p);
    $('now').innerHTML =
      '<div><small>දැන් කියවන්නේ · ' + S.round + ' වන වටය</small>' +
      '<h3>පරිච්ඡේදය ' + c.n + ' — ' + esc(c.t) + '</h3>' +
      '<small>' + (S.pos.para ? 'ඡේද ' + S.pos.para + ' දක්වා කියවා ඇත · ඊළඟට ඡේදය ' + (S.pos.para + 1) : 'මුල සිට අරඹන්න') + ' · මුළු ඡේද ' + c.p + '</small>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div></div>' +
      '<div class="row" style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="' + SRC.url(c.n) + '" target="_blank" rel="noopener">📖 කියවන්න</a>' +
      '<a class="btn ghost" href="#ch' + c.n + '" data-open="' + c.n + '">🧭 මාර්ගෝපදේශය</a></div>';
  }

  /* ---------- render: slots ---------- */
  var timers = {}; // k -> {left, run, id}
  function slotHTML(s) {
    var day = today(), r = (S.days[day] || {})[s.k], now = curSlot() === s.k;
    var h = '<div class="slot ' + (r ? 'done' : now ? 'now' : '') + '" id="slot-' + s.k + '">';
    h += '<h3><span class="ico" aria-hidden="true">' + s.ico + '</span>' + s.n + ' <span class="meta">· ' + esc(S.times[s.k]) + '</span></h3>';
    if (r) {
      var at = new Date(r.at);
      h += '<div class="tick">✓ කියෙව්වා</div><div class="meta">' + pad2(at.getHours()) + ':' + pad2(at.getMinutes()) + ' · විනාඩි ' + (r.min || 0) +
        (r.ch ? ' · පරි. ' + r.ch + ', ඡේද ' + (r.from || 1) + '–' + r.to : '') + '</div>';
      if (r.note) h += '<div class="meta" style="font-weight:600">📝 ' + esc(r.note) + '</div>';
      h += '<div class="row"><button class="btn ghost small" type="button" data-undo="' + s.k + '">↩︎ ඉවත් කරන්න</button></div>';
    } else {
      var t = timers[s.k], left = t ? t.left : S.len * 60;
      var c = chap(S.pos.ch);
      h += '<div class="timer' + (left <= 0 ? ' end' : '') + '" id="tm-' + s.k + '" aria-live="off">' + fmt(left) + '</div>';
      h += '<div class="row"><button class="btn small" type="button" data-run="' + s.k + '">' + (t && t.run ? '⏸ නවත්වන්න' : t && t.left < S.len * 60 ? '▶ දිගටම' : '▶ ආරම්භ කරන්න') + '</button>' +
        '<a class="btn ghost small" href="' + SRC.url(c.n) + '" target="_blank" rel="noopener">📖 කියවන්න</a></div>';
      h += '<label>පරිච්ඡේදය ' + c.n + ' හි කියවූ අවසාන ඡේදය <input type="number" inputmode="numeric" min="' + (S.pos.para + 1) + '" max="' + c.p + '" id="to-' + s.k + '" placeholder="' + Math.min(c.p, S.pos.para + 6) + '"></label>';
      h += '<label>සටහනක් (අවශ්‍ය නම්) <textarea id="nt-' + s.k + '" maxlength="500"></textarea></label>';
      h += '<div class="row"><button class="btn small" type="button" data-save="' + s.k + '">✓ සටහන් කරන්න</button></div>';
    }
    return h + '</div>';
  }
  function fmt(sec) { sec = Math.max(0, Math.round(sec)); return pad2(Math.floor(sec / 60)) + ':' + pad2(sec % 60); }
  function renderSlots() {
    $('todayLabel').textContent = longDate(today()) + ' — අද වාර ' + count(today()) + ' / 3';
    $('slots').innerHTML = SLOTS.map(slotHTML).join('');
  }
  function tick(k) {
    var t = timers[k]; if (!t || !t.run) return;
    t.left = Math.max(0, t.end - Date.now()) / 1000;
    var el = $('tm-' + k); if (el) { el.textContent = fmt(t.left); if (t.left <= 0) el.classList.add('end'); }
    if (t.left <= 0) {
      t.run = false; clearInterval(t.id);
      try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) {}
      chime();
      toast('🙏 විනාඩි ' + S.len + ' නිමයි. කියවූ ඡේදය ලියා සටහන් කරන්න.');
      renderSlots();
      var inp = $('to-' + k); if (inp) inp.focus();
    }
  }
  function chime() {
    try {
      var A = window.AudioContext || window.webkitAudioContext; if (!A) return;
      var ac = new A(), o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine'; o.frequency.value = 528; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 2.2); o.start(); o.stop(ac.currentTime + 2.3);
    } catch (e) {}
  }
  function toggleRun(k) {
    var t = timers[k] || (timers[k] = { left: S.len * 60, run: false, started: Date.now() });
    if (t.left <= 0) t.left = S.len * 60;
    if (t.run) { t.run = false; clearInterval(t.id); t.left = Math.max(0, t.end - Date.now()) / 1000; }
    else { t.run = true; t.end = Date.now() + t.left * 1000; t.id = setInterval(function () { tick(k); }, 500); }
    renderSlots();
  }
  function saveSlot(k) {
    var c = chap(S.pos.ch), inp = $('to-' + k), note = ($('nt-' + k) || {}).value || '';
    var to = parseInt(inp && inp.value, 10);
    if (!to) { toast('කියවූ අවසාන ඡේද අංකය ලියන්න.'); if (inp) inp.focus(); return; }
    if (to <= S.pos.para) { toast('ඡේද ' + S.pos.para + ' දක්වා දැනටමත් කියවා ඇත. ඊට වැඩි අංකයක් ලියන්න.'); return; }
    if (to > c.p) to = c.p;
    var t = timers[k], used = t ? Math.round((S.len * 60 - Math.max(0, t.run ? (t.end - Date.now()) / 1000 : t.left)) / 60) : S.len;
    if (t) { clearInterval(t.id); delete timers[k]; }
    var day = today();
    var rec = { at: Date.now(), min: Math.max(1, used || S.len), ch: c.n, from: S.pos.para + 1, to: to, read: to - S.pos.para,
      prev: { ch: S.pos.ch, para: S.pos.para, round: S.round }, note: note.trim().slice(0, 500) };
    S.days[day] = S.days[day] || {};
    S.days[day][k] = rec;
    var msg = '✓ සටහන් කළා. නොකඩවා දින ' + streak(1) + '.';
    if (to >= c.p) {
      S.ch[c.n] = S.ch[c.n] || { done: [], notes: '' };
      if (S.ch[c.n].done.indexOf(S.round) < 0) S.ch[c.n].done.push(S.round);
      rec.finished = true;
      if (c.n === 37) {
        S.rounds.push({ n: S.round, start: S.roundStart || S.created, end: Date.now() });
        S.round++; S.roundStart = Date.now(); S.pos = { ch: 1, para: 0 };
        msg = '🏆 සාධු! මහාවංශය සම්පූර්ණයෙන් කියවා අවසන්. ' + S.round + ' වන වටය අරඹමු.';
      } else {
        S.pos = { ch: c.n + 1, para: 0 };
        msg = '🌼 පරිච්ඡේදය ' + c.n + ' නිමයි! ඊළඟට: ' + chap(c.n + 1).t;
      }
    } else S.pos = { ch: c.n, para: to };
    save(); renderAll(); toast(msg);
  }
  function undoSlot(k) {
    var day = today(), r = S.days[day] && S.days[day][k]; if (!r) return;
    // restore the reading position only if nothing was recorded after this session
    var after = SLOTS.some(function (s) { var x = S.days[day][s.k]; return x && x !== r && x.at > r.at && x.ch; });
    if (r.prev && !after) {
      if (r.finished) {
        var ch = r.ch, rd = r.prev.round, d = S.ch[ch] && S.ch[ch].done;
        if (d) { var i = d.indexOf(rd); if (i >= 0) d.splice(i, 1); }
        if (r.prev.round !== S.round) { S.rounds.pop(); }
      }
      S.pos = { ch: r.prev.ch, para: r.prev.para }; S.round = r.prev.round;
    }
    delete S.days[day][k];
    if (!Object.keys(S.days[day]).length) delete S.days[day];
    save(); renderAll(); toast('↩︎ ඉවත් කළා.');
  }

  /* ---------- render: calendar ---------- */
  var editing = null;
  function renderCal() {
    var end = new Date(), start = addDays(end, -364);
    start = addDays(start, -((start.getDay() + 6) % 7)); // Monday
    var h = '', d = start, t = today(), lastM = -1;
    while (d <= end || (d.getDay() + 6) % 7 !== 0) {
      if ((d.getDay() + 6) % 7 === 0) {
        var m = d.getMonth();
        h += '<span class="m">' + (m !== lastM && d.getDate() <= 7 ? MONTHS[m] : '') + '</span>';
        if (d.getDate() <= 7) lastM = m;
      }
      var k = ymd(d), c = count(k), fut = d > end;
      h += '<button type="button" class="' + (fut ? 'fut ' : '') + (c ? 'l' + c + ' ' : '') + (k === t ? 'today ' : '') + (anyLate(k) ? 'late' : '') +
        '" data-day="' + k + '" title="' + k + ' · ' + c + '/3" aria-label="' + k + ', වාර ' + c + '"' + (fut ? ' tabindex="-1" disabled' : '') + '></button>';
      d = addDays(d, 1);
      if (d > end && (d.getDay() + 6) % 7 === 0) break;
    }
    $('cal').innerHTML = h;
    var wrap = $('cal').parentNode; wrap.scrollLeft = wrap.scrollWidth;
    renderDay();
  }
  function renderDay() {
    var box = $('dayEdit');
    if (!editing) { box.hidden = true; return; }
    var r = S.days[editing] || {}, isToday = editing === today();
    var h = '<b>' + longDate(editing) + '</b> — වාර ' + count(editing) + ' / 3<div class="row" style="margin-top:8px">';
    SLOTS.forEach(function (s) {
      var x = r[s.k];
      h += '<button type="button" class="chip ' + (x ? 'on' : '') + '" data-mark="' + s.k + '"' + (x && x.ch && isToday ? ' disabled title="අද කොටසෙන් ඉවත් කරන්න"' : '') + '>' + s.ico + ' ' + s.n + (x ? ' ✓' : '') + '</button>';
    });
    h += '<button type="button" class="btn ghost small" data-close>වසන්න</button></div>';
    var lines = SLOTS.map(function (s) { var x = r[s.k]; return x && x.ch ? s.n + ': පරි. ' + x.ch + ', ඡේද ' + x.from + '–' + x.to + (x.note ? ' — ' + esc(x.note) : '') : ''; }).filter(Boolean);
    if (lines.length) h += '<p style="margin-top:8px;font-size:.9rem">' + lines.join('<br>') + '</p>';
    h += '<p style="margin-top:6px;font-size:.82rem;color:var(--ink2)">මෙතැනින් එක් කරන වාරයක් “පසුව සටහන් කළා” ලෙස සලකුණු වේ; එය කියවූ ස්ථානය වෙනස් නොකරයි.</p>';
    box.innerHTML = h; box.hidden = false;
  }
  function markDay(k) {
    var day = editing; if (!day) return;
    S.days[day] = S.days[day] || {};
    var x = S.days[day][k];
    if (x) { if (x.ch && day === today()) return; delete S.days[day][k]; }
    else S.days[day][k] = { at: Date.now(), min: S.len, late: true };
    if (!Object.keys(S.days[day]).length) delete S.days[day];
    save(); renderStats(); renderCal(); renderSlots();
  }

  /* ---------- render: chapters ---------- */
  function chHTML(c) {
    var done = doneThisRound(c.n), cur = S.pos.ch === c.n, times = chDone(c.n).length;
    var pct = done ? 100 : cur ? Math.round(S.pos.para * 100 / c.p) : 0;
    var h = '<details class="ch ' + (done ? 'done ' : '') + (cur ? 'cur' : '') + '" id="ch' + c.n + '">';
    h += '<summary><span class="num">' + c.n + '</span><span class="tt"><b>' + esc(c.t) + '</b><small>ඡේද ' + c.p + ' · විනාඩි 5 වාර ~' + Math.max(1, Math.round(c.p / 6)) + (cur && !done ? ' · දැන් කියවමින්' : '') + '</small>' +
      '<span class="bar ' + (done ? 'ok' : '') + '" style="display:block;height:6px;margin-top:5px"><i style="width:' + pct + '%"></i></span></span>' +
      (times ? '<span class="badge">✓ ' + times + '</span>' : '<span></span>') + '</summary>';
    h += '<div class="ch-body">';
    h += '<div class="ch-acts"><a class="btn small" href="' + SRC.url(c.n) + '" target="_blank" rel="noopener">📖 mahamevnawa.lk හි කියවන්න</a>' +
      (cur ? '' : '<button class="btn ghost small" type="button" data-start="' + c.n + '">📍 මෙතැනින් කියවන්න</button>') + '</div>';
    h += '<div><h4>ප්‍රධාන සිදුවීම් (ඡේද අංක සමඟ)</h4><ul class="ev">' + c.ev.map(function (e) {
      return '<li><span class="pp">¶ ' + (e[0] === e[1] ? e[0] : e[0] + '–' + e[1]) + '</span><span>' + esc(e[2]) + '</span></li>';
    }).join('') + '</ul></div>';
    h += '<div><h4>පුද්ගලයන්</h4><div class="tags">' + c.who.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div></div>';
    h += '<div><h4>ස්ථාන</h4><div class="tags">' + c.where.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div></div>';
    if (c.su.length) h += '<div><h4>පරිච්ඡේදයේ සඳහන් දේශනා</h4><ul class="sut">' + c.su.map(function (s) {
      return '<li>¶ ' + s[1] + ' — ' + (s[2] ? '<a href="' + SRC.tp(s[2]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a> <small>(tripitaka.online)</small>' : esc(s[0]) + ' <small>(සබැඳියක් නැත)</small>') + '</li>';
    }).join('') + '</ul></div>';
    h += '<div class="les"><b>ආවර්ජනය (¶ ' + c.les[0] + '):</b> ' + esc(c.les[1]) + '</div>';
    h += '<div><h4>සාකච්ඡා ප්‍රශ්න</h4><ol class="qs">' + c.q.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol></div>';
    var notes = (S.ch[c.n] && S.ch[c.n].notes) || '';
    h += '<div><h4>මගේ සටහන්</h4><textarea class="mv-notes" data-notes="' + c.n + '" placeholder="මෙම පරිච්ඡේදයෙන් ඉගෙන ගත් දේ, පන්තියට ගත හැකි අදහස්…">' + esc(notes) + '</textarea></div>';
    return h + '</div></details>';
  }
  function renderParts() {
    var open = {};
    Array.prototype.forEach.call(document.querySelectorAll('details.ch[open]'), function (d) { open[d.id] = true; });
    $('parts').innerHTML = PARTS.map(function (p) {
      var list = MV.slice(p.r[0] - 1, p.r[1]), dn = list.filter(function (c) { return doneThisRound(c.n); }).length;
      return '<div class="part" style="--pc:' + p.c + '"><h3>' + esc(p.n) + ' · පරි. ' + p.r[0] + '–' + p.r[1] + ' <small style="font-family:var(--font);color:var(--ink2)">(' + dn + '/' + list.length + ')</small></h3><div class="chs">' +
        list.map(chHTML).join('') + '</div></div>';
    }).join('');
    Object.keys(open).forEach(function (id) { var d = $(id); if (d) d.open = true; });
  }

  /* ---------- data: export / import / ics / reset ---------- */
  function download(name, text, type) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: type }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function exportData() {
    S.lastBackup = Date.now(); save();
    download('mahawansaya-adhyayanaya-' + today() + '.json', JSON.stringify(S, null, 1), 'application/json');
    renderData(); renderStats(); toast('⬇️ උපස්ථය බාගත්තා.');
  }
  var pending = null;
  function importFile(f) {
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var d = JSON.parse(rd.result);
        if (!d || d.v !== 1 || typeof d.days !== 'object' || !d.pos) throw 0;
        pending = d;
        $('impAsk').innerHTML = '<div class="confirm"><b>මෙම උපස්ථය ඇතුළත් කරන්නද?</b><span>එහි දින ' + Object.keys(d.days).length + ' ක සටහන් ඇත. දැනට මෙහි ඇති සටහන් ඒවායින් ප්‍රතිස්ථාපනය වේ.</span>' +
          '<div class="mv-data"><button class="btn small" type="button" data-imp="yes">ඔව්, ඇතුළත් කරන්න</button><button class="btn ghost small" type="button" data-imp="no">එපා</button></div></div>';
      } catch (e) { toast('⚠️ මෙය මෙම පිටුවේ උපස්ථ ගොනුවක් නොවේ.'); }
    };
    rd.readAsText(f);
  }
  function ics() {
    var now = new Date(), stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    var d0 = ymd(addDays(now, 1)).replace(/-/g, '');
    var url = location.href.split('#')[0];
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mahamevnawa Dhamma School UK//Mahawansaya//SI', 'CALSCALE:GREGORIAN'];
    SLOTS.forEach(function (s) {
      var hm = (S.times[s.k] || '06:30').split(':'), st = d0 + 'T' + pad2(+hm[0]) + pad2(+hm[1]) + '00';
      var e = new Date(2000, 0, 1, +hm[0], +hm[1] + S.len), en = d0 + 'T' + pad2(e.getHours()) + pad2(e.getMinutes()) + '00';
      lines.push('BEGIN:VEVENT', 'UID:mahawansaya-' + s.k + '-' + Date.now() + '@sirith-maldama', 'DTSTAMP:' + stamp,
        'DTSTART:' + st, 'DTEND:' + en, 'RRULE:FREQ=DAILY',
        'SUMMARY:' + s.ico + ' මහාවංශය — ' + s.n + ' (විනාඩි ' + S.len + ')', 'DESCRIPTION:' + url, 'URL:' + url,
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:මහාවංශය කියවන වේලාව', 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    download('mahawansaya-mathak-kirim.ics', lines.join('\r\n'), 'text/calendar');
  }
  function renderData() {
    $('lastBk').textContent = S.lastBackup ? 'අවසන් උපස්ථය: ' + ymd(new Date(S.lastBackup)) : 'තවම උපස්ථයක් ගෙන නැත';
    $('tm').value = S.times.m; $('td').value = S.times.d; $('te').value = S.times.e; $('len').value = String(S.len);
  }

  /* ---------- wiring ---------- */
  function renderAll() { renderStats(); renderNow(); renderSlots(); renderCal(); renderParts(); renderData(); }

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-run],[data-save],[data-undo],[data-day],[data-mark],[data-close],[data-start],[data-open],[data-imp],#exp,#ics,#resetAsk,[data-reset]');
    if (!b) return;
    if (b.dataset.run) toggleRun(b.dataset.run);
    else if (b.dataset.save) saveSlot(b.dataset.save);
    else if (b.dataset.undo) undoSlot(b.dataset.undo);
    else if (b.dataset.day) { editing = b.dataset.day; renderDay(); }
    else if (b.dataset.mark) markDay(b.dataset.mark);
    else if (b.hasAttribute('data-close')) { editing = null; renderDay(); }
    else if (b.dataset.start) {
      var n = +b.dataset.start; S.pos = { ch: n, para: doneThisRound(n) ? 0 : (S.pos.ch === n ? S.pos.para : 0) };
      save(); renderAll(); toast('📍 පරිච්ඡේදය ' + n + ' සිට කියවමු.'); location.hash = '#ada';
    } else if (b.dataset.open) { var d = $('ch' + b.dataset.open); if (d) d.open = true; }
    else if (b.dataset.imp) {
      if (b.dataset.imp === 'yes' && pending) { S = pending; var bl = blank(); for (var k in bl) if (!(k in S)) S[k] = bl[k]; save(); renderAll(); toast('⬆️ උපස්ථය ඇතුළත් කළා.'); }
      pending = null; $('impAsk').innerHTML = '';
    } else if (b.id === 'exp') exportData();
    else if (b.id === 'ics') ics();
    else if (b.id === 'resetAsk') {
      $('resetBox').innerHTML = '<div class="confirm"><b>සියලු සටහන් මකන්නද?</b><span>මෙය ආපසු හැරවිය නොහැක. පළමුව උපස්ථයක් බාගන්න.</span><div class="mv-data"><button class="btn small" type="button" data-reset="yes" style="background:#b91c1c;box-shadow:0 4px 0 #7f1d1d">ඔව්, මකන්න</button><button class="btn ghost small" type="button" data-reset="no">එපා</button></div></div>';
    } else if (b.dataset.reset) {
      if (b.dataset.reset === 'yes') { S = blank(); save(); renderAll(); toast('නැවත අරඹමු.'); }
      $('resetBox').innerHTML = '';
    }
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' && ev.target.id && ev.target.id.indexOf('to-') === 0) { ev.preventDefault(); saveSlot(ev.target.id.slice(3)); }
  });
  var noteT;
  document.addEventListener('input', function (ev) {
    var n = ev.target.dataset && ev.target.dataset.notes;
    if (n) {
      S.ch[n] = S.ch[n] || { done: [], notes: '' };
      S.ch[n].notes = ev.target.value.slice(0, 5000);
      clearTimeout(noteT); noteT = setTimeout(save, 400);
    }
  });
  document.addEventListener('change', function (ev) {
    var id = ev.target.id;
    if (id === 'imp' && ev.target.files[0]) { importFile(ev.target.files[0]); ev.target.value = ''; }
    else if (id === 'tm' || id === 'td' || id === 'te') { S.times[id.slice(1)] = ev.target.value || S.times[id.slice(1)]; save(); renderSlots(); }
    else if (id === 'len') { S.len = +ev.target.value || 5; save(); timers = {}; renderSlots(); }
  });
  // a new day may begin while the page is open
  var lastDay = today();
  setInterval(function () { if (today() !== lastDay) { lastDay = today(); renderAll(); } }, 60000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) { Object.keys(timers).forEach(tick); if (today() !== lastDay) { lastDay = today(); renderAll(); } } });

  load();
  if (!S.roundStart) S.roundStart = S.created;
  renderAll();
  if (/^#ch\d+$/.test(location.hash)) { var d = document.querySelector(location.hash); if (d) { d.open = true; d.scrollIntoView(); } }
})();
