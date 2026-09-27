/**
 * Daham Pasala progress tracker — Google Apps Script.
 * Attach this to a Google Sheet. Setup steps are in SETUP.md.
 *
 * The site sends three kinds of message:
 *   join    a child registers with a name, a place and the class code
 *   resume  a child continues on another device with name + secret code
 *   event   the child learned a lesson, finished a quiz, and so on
 */

// ====== SETTINGS: change these IN THE GOOGLE EDITOR, after pasting. ======
// Do not type your real class code into the copy kept in the project folder: that folder is public.
var CLASS_CODE = 'CHANGE-ME';      // give this word to your pupils; the site asks for it when they join
var POINTS_PER_LESSON = 10;        // points for each lesson marked as learned
var POINTS_PER_QUIZ_STAR = 5;      // points for each quiz star
var BONUS_SECTION_COMPLETE = 50;   // extra points when every lesson of a section is learned
var BONUS_TEST_WON = 50;           // extra points for winning a test (no wrong answers)
// Test points themselves are set on the site: +10 for a right answer, -5 for a wrong one. The best attempt counts.
var VERSION = 3;
// ====================================

var CHILD_HEAD = ['Child ID', 'Name', 'Class', 'Place', 'Secret code', 'Joined', 'Last active', 'Lessons learned', 'Quiz stars',
  'Last lesson', 'Progress summary', 'Points earned', 'Teacher bonus points', 'Total points', 'Saved progress (do not edit)',
  'Parent or guardian', 'Consent given on', 'Tests won', 'Test attempts', 'Wrong answers in tests', 'Test results'];
var LOG_HEAD = ['Time', 'Child ID', 'Name', 'Class', 'Place', 'Lesson set', 'Event', 'Section', 'Lesson', 'Value'];
var COL = { id: 1, name: 2, cls: 3, place: 4, code: 5, joined: 6, active: 7, learned: 8, stars: 9, last: 10, summary: 11, earned: 12, bonus: 13, total: 14, state: 15, parent: 16, consent: 17, won: 18, tries: 19, wrong: 20, tests: 21 };

function doGet() { return out_({ ok: true, service: 'daham-pasala-tracker' }); }

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (req.action === 'join') return out_(join_(req));
    if (req.action === 'resume') return out_(resume_(req));
    if (req.action === 'event') return out_(event_(req));
    return out_({ ok: false, error: 'unknown-action' });
  } catch (err) {
    return out_({ ok: false, error: 'server', detail: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) { /* ignore */ }
  }
}

function out_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

function sheet_(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); }
  if (sh.getLastRow() === 0) { sh.appendRow(head); sh.setFrozenRows(1); }
  else if (sh.getLastRow() === 1) { sh.getRange(1, 1, 1, head.length).setValues([head]); }   // only a heading row: keep it up to date
  else if (String(sh.getRange(1, 1, 1, head.length).getValues()[0].join('|')) !== head.join('|')) {
    var old = sh.getRange(1, 1, 1, head.length).getValues()[0], grown = true;
    for (var i = 0; i < head.length; i++) if (String(old[i]) !== '' && String(old[i]) !== head[i]) grown = false;
    if (grown) { sh.getRange(1, 1, 1, head.length).setValues([head]); return sh; }   // new columns were added at the end
    throw new Error('The "' + name + '" tab has an older layout. Rename that tab (for example to "' + name + ' old") and try again.');
  }
  return sh;
}
function clean_(s, max) { return String(s === undefined || s === null ? '' : s).replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max); }
function same_(a, b) { return clean_(a, 80).toLowerCase() === clean_(b, 80).toLowerCase(); }
function code_() {
  var abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', s = '';
  for (var i = 0; i < 6; i++) s += abc.charAt(Math.floor(Math.random() * abc.length));
  return s;
}
function emptyState_() { return { lessons: {} }; }
function parse_(s) { try { var o = JSON.parse(s); return o && o.lessons ? o : emptyState_(); } catch (e) { return emptyState_(); } }

function findRow_(sh, test) {
  var rows = sh.getDataRange().getValues();
  for (var r = 1; r < rows.length; r++) if (test(rows[r])) return { row: r + 1, values: rows[r] };
  return null;
}

/* points and summary from the saved progress */
function score_(state) {
  var learned = 0, stars = 0, bonus = 0, parts = [], won = 0, tries = 0, wrong = 0, testPts = 0, tests = [];
  Object.keys(state.lessons).sort().forEach(function (set) {
    var L = state.lessons[set];
    Object.keys(L.learned || {}).sort().forEach(function (sec) {
      var n = (L.learned[sec] || []).length, size = (L.size || {})[sec] || 0;
      learned += n;
      if (size && n >= size) bonus += BONUS_SECTION_COMPLETE;
      parts.push(set + ' ' + sec + ': ' + n + (size ? '/' + size : ''));
    });
    Object.keys(L.stars || {}).forEach(function (sec) { stars += Number(L.stars[sec]) || 0; });
    Object.keys(L.tests || {}).sort().forEach(function (sec) {
      Object.keys(L.tests[sec]).sort().forEach(function (id) {
        var t = L.tests[sec][id];
        tries += Number(t.attempts) || 0; wrong += Number(t.wrong) || 0;
        if (t.best !== undefined && t.best !== null) testPts += Math.max(0, Number(t.best) || 0);
        if (Number(t.wins) > 0) { won++; testPts += BONUS_TEST_WON; }
        tests.push(set + ' ' + sec + ' test ' + id + ': ' + (Number(t.wins) > 0 ? 'WON' : 'not yet') + ', best ' + (t.best === undefined || t.best === null ? '-' : t.best) + ', tries ' + (t.attempts || 0));
      });
    });
  });
  return { learned: learned, stars: stars, earned: learned * POINTS_PER_LESSON + stars * POINTS_PER_QUIZ_STAR + bonus + testPts, summary: parts.join(' | '),
    won: won, tries: tries, wrong: wrong, tests: tests.join(' | ') };
}

function writeChild_(sh, row, state, lastText) {
  var sc = score_(state);
  var bonus = Number(sh.getRange(row, COL.bonus, 1, 1).getValues()[0][0]) || 0;
  sh.getRange(row, COL.active, 1, 4).setValues([[new Date(), sc.learned, sc.stars, lastText || sh.getRange(row, COL.last, 1, 1).getValues()[0][0]]]);
  sh.getRange(row, COL.summary, 1, 2).setValues([[sc.summary, sc.earned]]);
  sh.getRange(row, COL.total, 1, 2).setValues([[sc.earned + bonus, JSON.stringify(state)]]);
  sh.getRange(row, COL.won, 1, 4).setValues([[sc.won, sc.tries, sc.wrong, sc.tests]]);
  return { earned: sc.earned, bonus: bonus, total: sc.earned + bonus, learned: sc.learned, stars: sc.stars };
}

function join_(req) {
  if (CLASS_CODE === 'CHANGE-ME') return { ok: false, error: 'not-set-up' };
  if (!same_(req.classCode, CLASS_CODE)) return { ok: false, error: 'bad-class-code' };
  var name = clean_(req.name, 40), place = clean_(req.place, 60), cls = clean_(req.cls, 40);
  if (name.length < 2) return { ok: false, error: 'name-needed' };
  if (!cls) return { ok: false, error: 'class-needed' };
  if (!place) return { ok: false, error: 'place-needed' };
  var parent = clean_(req.guardian, 60);
  if (req.consent !== true || parent.length < 2) return { ok: false, error: 'consent-needed' };
  var sh = sheet_('Children', CHILD_HEAD);
  var reqId = clean_(req.rid, 40);
  if (reqId) {   // the same request sent twice (a slow reply) must not make two children
    var again = findRow_(sh, function (v) { return String(v[COL.state - 1]).indexOf('"rid":"' + reqId + '"') !== -1; });
    if (again) {
      var av = again.values;
      return { ok: true, childId: av[COL.id - 1], code: av[COL.code - 1], profile: { name: av[COL.name - 1], cls: av[COL.cls - 1], place: av[COL.place - 1] }, progress: parse_(av[COL.state - 1]), points: { earned: av[COL.earned - 1], bonus: av[COL.bonus - 1], total: av[COL.total - 1] } };
    }
  }
  var first = emptyState_(); if (reqId) first.rid = reqId;
  var id = 'C' + (sh.getLastRow() + 1000), code = code_(), now = new Date();
  sh.appendRow([id, name, cls, place, code, now, now, 0, 0, '', '', 0, 0, 0, JSON.stringify(first), parent, now, 0, 0, 0, '']);
  sheet_('Log', LOG_HEAD).appendRow([now, id, name, cls, place, '', 'joined', '', '', 'consent: ' + parent]);
  return { ok: true, childId: id, code: code, profile: { name: name, cls: cls, place: place, joined: now.getTime() }, progress: emptyState_(), points: { earned: 0, bonus: 0, total: 0 } };
}

function resume_(req) {
  var sh = sheet_('Children', CHILD_HEAD);
  var hit = findRow_(sh, function (v) { return same_(v[COL.name - 1], req.name) && same_(v[COL.code - 1], req.code); });
  if (!hit) return { ok: false, error: 'not-found' };
  var v = hit.values, state = parse_(v[COL.state - 1]);
  var p = writeChild_(sh, hit.row, state, '');
  sheet_('Log', LOG_HEAD).appendRow([new Date(), v[COL.id - 1], v[COL.name - 1], v[COL.cls - 1], v[COL.place - 1], '', 'continued', '', '', '']);
  return { ok: true, childId: v[COL.id - 1], code: v[COL.code - 1], profile: { name: v[COL.name - 1], cls: v[COL.cls - 1], place: v[COL.place - 1] }, progress: state, points: p };
}

function event_(req) {
  var sh = sheet_('Children', CHILD_HEAD);
  var hit = findRow_(sh, function (v) { return String(v[COL.id - 1]) === String(req.childId) && same_(v[COL.code - 1], req.code); });
  if (!hit) return { ok: false, error: 'not-found' };
  var v = hit.values, state = parse_(v[COL.state - 1]), log = sheet_('Log', LOG_HEAD), last = '';
  var events = (req.events || []).slice(0, 400);
  state.seen = state.seen || [];
  events.forEach(function (ev) {
    var eid = clean_(ev.id, 40);
    if (eid) { if (state.seen.indexOf(eid) !== -1) return; state.seen.push(eid); }   // already counted
    var set = clean_(ev.lesson, 30) || 'lesson', sec = clean_(ev.part, 20), item = clean_(ev.item, 20), kind = clean_(ev.kind, 20);
    var L = state.lessons[set] = state.lessons[set] || { learned: {}, stars: {}, size: {}, last: null };
    L.learned = L.learned || {}; L.stars = L.stars || {}; L.size = L.size || {};
    if (kind === 'learned' || kind === 'unlearned') {
      var arr = L.learned[sec] = L.learned[sec] || [], i = arr.indexOf(item);
      if (kind === 'learned' && i === -1) arr.push(item);
      if (kind === 'unlearned' && i !== -1) arr.splice(i, 1);
      if (Number(ev.size) > 0) L.size[sec] = Number(ev.size);
      if (kind === 'learned') { L.last = { part: sec, item: item }; last = set + ' ' + sec + ' · ' + item; }
    } else if (kind === 'quiz') {
      L.stars[sec] = Math.max(Number(L.stars[sec]) || 0, Math.min(3, Number(ev.value) || 0));
    } else if (kind === 'test') {
      var res = {}; try { res = JSON.parse(String(ev.value)); } catch (x) { res = {}; }
      L.tests = L.tests || {}; L.tests[sec] = L.tests[sec] || {};
      var t = L.tests[sec][item] = L.tests[sec][item] || { attempts: 0, wins: 0, wrong: 0 };
      t.attempts = (Number(t.attempts) || 0) + 1;
      t.wrong = (Number(t.wrong) || 0) + (Number(res.wrong) || 0);
      if (!res.left) t.best = t.best === undefined || t.best === null ? Number(res.score) || 0 : Math.max(Number(t.best), Number(res.score) || 0);
      if (res.win === true && Number(res.wrong) === 0 && !res.left) t.wins = (Number(t.wins) || 0) + 1;
      ev.value = res.left ? 'left before the end' : ((res.win ? 'WON' : 'not won') + ' · score ' + res.score + ' · right ' + res.right + ' · wrong ' + res.wrong + ' of ' + res.total);
      last = set + ' ' + sec + ' · test ' + item;
    } else if (kind === 'open') {
      L.last = { part: sec, item: item };
    } else { return; }
    if (kind !== 'open') log.appendRow([ev.t ? new Date(Number(ev.t)) : new Date(), v[COL.id - 1], v[COL.name - 1], v[COL.cls - 1], v[COL.place - 1], set, kind, sec, item, ev.value === undefined ? '' : ev.value]);
  });
  if (state.seen.length > 600) state.seen = state.seen.slice(-600);
  var p = writeChild_(sh, hit.row, state, last);
  return { ok: true, version: VERSION, points: p, progress: state };
}
