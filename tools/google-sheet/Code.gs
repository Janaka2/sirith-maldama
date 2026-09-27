/**
 * Daham Pasala progress tracker — Google Apps Script.
 * Attach this to a Google Sheet. Setup steps are in SETUP.md.
 *
 * The site sends three kinds of message:
 *   join    a child registers with a name, a place and the class code
 *   resume  a child continues on another device with name + secret code
 *   event   the child learned a lesson, finished a quiz, and so on
 */

// ====== SETTINGS: change these ======
var CLASS_CODE = 'CHANGE-ME';      // give this word to your pupils; the site asks for it when they join
var POINTS_PER_LESSON = 10;        // points for each lesson marked as learned
var POINTS_PER_QUIZ_STAR = 5;      // points for each quiz star
var BONUS_SECTION_COMPLETE = 50;   // extra points when every lesson of a section is learned
// ====================================

var CHILD_HEAD = ['Child ID', 'Name', 'Class', 'Place', 'Secret code', 'Joined', 'Last active', 'Lessons learned', 'Quiz stars',
  'Last lesson', 'Progress summary', 'Points earned', 'Teacher bonus points', 'Total points', 'Saved progress (do not edit)'];
var LOG_HEAD = ['Time', 'Child ID', 'Name', 'Class', 'Place', 'Lesson set', 'Event', 'Section', 'Lesson', 'Value'];
var COL = { id: 1, name: 2, cls: 3, place: 4, code: 5, joined: 6, active: 7, learned: 8, stars: 9, last: 10, summary: 11, earned: 12, bonus: 13, total: 14, state: 15 };

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
  var learned = 0, stars = 0, bonus = 0, parts = [];
  Object.keys(state.lessons).sort().forEach(function (set) {
    var L = state.lessons[set];
    Object.keys(L.learned || {}).sort().forEach(function (sec) {
      var n = (L.learned[sec] || []).length, size = (L.size || {})[sec] || 0;
      learned += n;
      if (size && n >= size) bonus += BONUS_SECTION_COMPLETE;
      parts.push(set + ' ' + sec + ': ' + n + (size ? '/' + size : ''));
    });
    Object.keys(L.stars || {}).forEach(function (sec) { stars += Number(L.stars[sec]) || 0; });
  });
  return { learned: learned, stars: stars, earned: learned * POINTS_PER_LESSON + stars * POINTS_PER_QUIZ_STAR + bonus, summary: parts.join(' | ') };
}

function writeChild_(sh, row, state, lastText) {
  var sc = score_(state);
  var bonus = Number(sh.getRange(row, COL.bonus, 1, 1).getValues()[0][0]) || 0;
  sh.getRange(row, COL.active, 1, 4).setValues([[new Date(), sc.learned, sc.stars, lastText || sh.getRange(row, COL.last, 1, 1).getValues()[0][0]]]);
  sh.getRange(row, COL.summary, 1, 2).setValues([[sc.summary, sc.earned]]);
  sh.getRange(row, COL.total, 1, 2).setValues([[sc.earned + bonus, JSON.stringify(state)]]);
  return { earned: sc.earned, bonus: bonus, total: sc.earned + bonus, learned: sc.learned, stars: sc.stars };
}

function join_(req) {
  if (CLASS_CODE === 'CHANGE-ME') return { ok: false, error: 'not-set-up' };
  if (!same_(req.classCode, CLASS_CODE)) return { ok: false, error: 'bad-class-code' };
  var name = clean_(req.name, 40), place = clean_(req.place, 60), cls = clean_(req.cls, 40);
  if (name.length < 2) return { ok: false, error: 'name-needed' };
  if (!cls) return { ok: false, error: 'class-needed' };
  if (!place) return { ok: false, error: 'place-needed' };
  var sh = sheet_('Children', CHILD_HEAD);
  var id = 'C' + (sh.getLastRow() + 1000), code = code_(), now = new Date();
  sh.appendRow([id, name, cls, place, code, now, now, 0, 0, '', '', 0, 0, 0, JSON.stringify(emptyState_())]);
  sheet_('Log', LOG_HEAD).appendRow([now, id, name, cls, place, '', 'joined', '', '', '']);
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
  events.forEach(function (ev) {
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
    } else if (kind === 'open') {
      L.last = { part: sec, item: item };
    } else { return; }
    if (kind !== 'open') log.appendRow([ev.t ? new Date(Number(ev.t)) : new Date(), v[COL.id - 1], v[COL.name - 1], v[COL.cls - 1], v[COL.place - 1], set, kind, sec, item, ev.value === undefined ? '' : ev.value]);
  });
  var p = writeChild_(sh, hit.row, state, last);
  return { ok: true, points: p, progress: state };
}
