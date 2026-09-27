/* Tracker — sends a child's progress to the teacher's Google Sheet, and brings it back.
   Reusable: it knows nothing about poems. A lesson only calls Tracker.record(...).

   HOW TO USE IN A NEW LESSON
   1. Include  assets/js/tracker-config.js  and then this file.
   2. When a child finishes something:
        Tracker.record({ lesson: 'jataka', kind: 'learned', part: '1', item: '12', size: 30 });
        Tracker.record({ lesson: 'jataka', kind: 'quiz', part: '1', value: 3 });
      kind is 'learned', 'unlearned', 'quiz' or 'open'. `size` is how many items the part has.
   3. To restore progress after a child continues:
        Tracker.onChange(function (why, data) { if (why === 'progress') use(data.progress.lessons.jataka); });

   Nothing is sent unless tracking is switched on AND the child has joined.
   Events wait in a queue in the browser and are sent again if the network fails. */
(function (global) {
  'use strict';
  var CFG = global.TRACKER_CONFIG || {};
  var P_KEY = 'daham.tracker.profile', Q_KEY = 'daham.tracker.queue', listeners = [], busy = false, timer = null;

  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  function del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  function endpoint() { var t = ''; try { t = localStorage.getItem('daham.tracker.endpoint') || ''; } catch (e) { /* ignore */ } return t || CFG.endpoint || ''; }
  function isOn() { return /^https?:\/\//.test(endpoint()); }
  function profile() { return get(P_KEY, null); }
  function emit(why, data) { listeners.forEach(function (f) { try { f(why, data); } catch (e) { /* ignore */ } }); }
  function onChange(f) { listeners.push(f); }

  function send(body) {
    /* text/plain keeps the request "simple", which Google Apps Script needs */
    return fetch(endpoint(), { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); });
  }
  function keep(res, extra) {
    var p = { childId: res.childId, code: res.code, name: res.profile.name, cls: res.profile.cls || '', place: res.profile.place, points: res.points || null, synced: Date.now() };
    for (var k in (extra || {})) p[k] = extra[k];
    set(P_KEY, p); return p;
  }

  function join(name, cls, place, classCode) {
    if (!isOn()) return Promise.resolve({ ok: false, error: 'off' });
    return send({ action: 'join', name: name, cls: cls, place: place, classCode: classCode }).then(function (res) {
      if (res.ok) { keep(res); emit('joined', res); }
      return res;
    }).catch(function () { return { ok: false, error: 'network' }; });
  }
  function resume(name, code) {
    if (!isOn()) return Promise.resolve({ ok: false, error: 'off' });
    return send({ action: 'resume', name: name, code: code }).then(function (res) {
      if (res.ok) { set(Q_KEY, []); keep(res); emit('progress', res); emit('joined', res); }
      return res;
    }).catch(function () { return { ok: false, error: 'network' }; });
  }
  function record(ev) {
    if (!isOn() || !profile()) return false;
    var q = get(Q_KEY, []);
    q.push({ t: Date.now(), lesson: String(ev.lesson || 'lesson'), kind: String(ev.kind), part: String(ev.part === undefined ? '' : ev.part), item: String(ev.item === undefined ? '' : ev.item), value: ev.value, size: ev.size });
    if (q.length > 800) q = q.slice(-800);
    set(Q_KEY, q); emit('queued', q.length);
    clearTimeout(timer); timer = setTimeout(flush, 900);
    return true;
  }
  function flush() {
    var p = profile(), q = get(Q_KEY, []);
    if (!isOn() || !p || !q.length || busy) return Promise.resolve(false);
    busy = true;
    var batch = q.slice(0, 200);
    return send({ action: 'event', childId: p.childId, code: p.code, events: batch }).then(function (res) {
      busy = false;
      if (res.ok) {
        var now = get(Q_KEY, []); set(Q_KEY, now.slice(batch.length));
        var np = profile(); if (np) { np.points = res.points; np.synced = Date.now(); set(P_KEY, np); }
        emit('synced', res);
        if (get(Q_KEY, []).length) return flush();
        return true;
      }
      if (res.error === 'not-found') { emit('lost', res); }
      return false;
    }).catch(function () { busy = false; emit('offline', null); return false; });
  }
  function pending() { return get(Q_KEY, []).length; }
  function leave() { del(P_KEY); del(Q_KEY); emit('left', null); }

  global.addEventListener('online', function () { flush(); });
  global.addEventListener('pagehide', function () { flush(); });
  setTimeout(flush, 1500);

  global.Tracker = { isOn: isOn, profile: profile, join: join, resume: resume, record: record, flush: flush, pending: pending, leave: leave, onChange: onChange, places: function () { return (CFG.places || []).slice(); }, classes: function () { return (CFG.classes || []).slice(); } };
})(window);
