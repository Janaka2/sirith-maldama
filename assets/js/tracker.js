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
  /* Some kinds of event need a newer script in the sheet. Until it is updated they are held, never dropped. */
  var NEEDS = { test: 3 }, H_KEY = 'daham.tracker.held', lastProbe = 0;
  var P_KEY = 'daham.tracker.profile', Q_KEY = 'daham.tracker.queue', listeners = [], busy = false, timer = null;

  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  function del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  function endpoint() { var t = ''; try { t = localStorage.getItem('daham.tracker.endpoint') || ''; } catch (e) { /* ignore */ } return t || CFG.endpoint || ''; }
  function isOn() { return /^https?:\/\//.test(endpoint()); }
  function profile() { return get(P_KEY, null); }
  function emit(why, data) { listeners.forEach(function (f) { try { f(why, data); } catch (e) { /* ignore */ } }); }
  function onChange(f) { listeners.push(f); }

  function rid() { return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10); }
  /* Google sometimes answers late or with the wrong page. Only a reply that fits the question counts. */
  function valid(action, res) {
    if (!res || typeof res !== 'object') return false;
    if (res.ok === false) return typeof res.error === 'string';
    if (action === 'event') return res.ok === true && !!res.points;
    return res.ok === true && !!res.childId && !!res.code && !!res.profile;
  }
  function sendOnce(body) {
    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var t = setTimeout(function () { if (ctl) ctl.abort(); }, 45000);
    /* text/plain keeps the request "simple", which Google Apps Script needs */
    return fetch(endpoint(), { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), redirect: 'follow', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (res) { clearTimeout(t); if (!valid(body.action, res)) throw new Error('bad reply'); return res; }, function (e) { clearTimeout(t); throw e; });
  }
  function send(body, tries) {
    tries = tries || 1;
    return sendOnce(body).catch(function (e) {
      if (tries <= 1) throw e;
      emit('retry', { action: body.action, left: tries - 1 });
      return new Promise(function (ok) { setTimeout(ok, 1500); }).then(function () { return send(body, tries - 1); });
    });
  }
  var backoff = [5000, 20000, 60000, 180000], failCount = 0, retryTimer = null;
  function retryLater() { clearTimeout(retryTimer); retryTimer = setTimeout(flush, backoff[Math.min(failCount, backoff.length - 1)]); failCount++; }
  function keep(res, extra) {
    var p = { childId: res.childId, code: res.code, name: res.profile.name, cls: res.profile.cls || '', place: res.profile.place, points: res.points || null, synced: Date.now() };
    for (var k in (extra || {})) p[k] = extra[k];
    set(P_KEY, p); return p;
  }

  function join(name, cls, place, classCode, consent) {
    consent = consent || {};
    if (!isOn()) return Promise.resolve({ ok: false, error: 'off' });
    /* the same child pressing "join" again after a lost reply reuses the same request id */
    var who = [name, cls, place].join('|').toLowerCase(), held = get('daham.tracker.joining', null);
    if (!held || held.who !== who || Date.now() - held.at > 3600000) { held = { who: who, rid: rid(), at: Date.now() }; set('daham.tracker.joining', held); }
    return send({ action: 'join', rid: held.rid, name: name, cls: cls, place: place, classCode: classCode, consent: consent.agreed === true, guardian: consent.guardian || '' }, 3).then(function (res) {
      if (res.ok) { del('daham.tracker.joining'); keep(res); emit('joined', res); }
      return res;
    }).catch(function () { return { ok: false, error: 'network' }; });
  }
  function resume(name, code) {
    if (!isOn()) return Promise.resolve({ ok: false, error: 'off' });
    return send({ action: 'resume', name: name, code: code }, 3).then(function (res) {
      if (res.ok) { set(Q_KEY, []); set(H_KEY, []); keep(res); emit('progress', res); emit('joined', res); }
      return res;
    }).catch(function () { return { ok: false, error: 'network' }; });
  }
  function record(ev) {
    if (!isOn() || !profile()) return false;
    var q = get(Q_KEY, []);
    q.push({ id: rid(), t: Date.now(), lesson: String(ev.lesson || 'lesson'), kind: String(ev.kind), part: String(ev.part === undefined ? '' : ev.part), item: String(ev.item === undefined ? '' : ev.item), value: ev.value, size: ev.size });
    if (q.length > 800) q = q.slice(-800);
    set(Q_KEY, q); emit('queued', q.length);
    clearTimeout(timer); timer = setTimeout(flush, 900);
    return true;
  }
  function flush() {
    var p = profile(), q = get(Q_KEY, []), held = get(H_KEY, []);
    if (!isOn() || !p || busy) return Promise.resolve(false);
    if (!q.length && !(held.length && Date.now() - lastProbe > 300000)) return Promise.resolve(false);
    busy = true; lastProbe = Date.now();
    var batch = q.slice(0, 200);
    return send({ action: 'event', childId: p.childId, code: p.code, events: batch }).then(function (res) {
      busy = false;
      if (res.ok) {
        failCount = 0; clearTimeout(retryTimer);
        var ver = Number(res.version) || 1, keep2 = get(H_KEY, []), rest = get(Q_KEY, []).slice(batch.length);
        batch.forEach(function (ev) { if ((NEEDS[ev.kind] || 1) > ver) keep2.push(ev); });
        if (keep2.length && keep2.every(function (ev) { return (NEEDS[ev.kind] || 1) <= ver; })) { rest = keep2.concat(rest); keep2 = []; }
        set(H_KEY, keep2.slice(-400)); set(Q_KEY, rest);
        var np = profile(); if (np) { np.points = res.points; np.synced = Date.now(); set(P_KEY, np); }
        emit('synced', res);
        if (get(Q_KEY, []).length) return flush();
        return true;
      }
      if (res.error === 'not-found') { emit('lost', res); } else retryLater();
      return false;
    }).catch(function () { busy = false; emit('offline', null); retryLater(); return false; });
  }
  function pending() { return get(Q_KEY, []).length + get(H_KEY, []).length; }
  function held() { return get(H_KEY, []).length; }
  function leave() { del(P_KEY); del(Q_KEY); del(H_KEY); emit('left', null); }

  global.addEventListener('online', function () { flush(); });
  global.addEventListener('pagehide', function () { flush(); });
  setTimeout(flush, 1500);

  global.Tracker = { isOn: isOn, profile: profile, join: join, resume: resume, record: record, flush: flush, pending: pending, held: held, leave: leave, onChange: onChange, places: function () { return (CFG.places || []).slice(); }, classes: function () { return (CFG.classes || []).slice(); } };
})(window);
