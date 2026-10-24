/* දහම් පාඩම් — the lesson hub (padam.html).

   The cards themselves are plain HTML so the page is useful with no JavaScript.
   All this adds is the child's own progress, read from localStorage on this device:
   the flowers opened in සිරිත් මල්දම and the promises ticked in each lesson.
   Nothing here is sent anywhere; the Join pill is the one shared piece, and it
   behaves exactly as it does on the lesson pages. */
(function (global) {
  'use strict';

  var Trk = global.Tracker;
  function $(id) { return document.getElementById(id); }
  function read(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }

  /* ---------- flowers opened across the three parts of සිරිත් මල්දම ---------- */
  var PER_PART = 62, PARTS = ['sirith.learned', 'sirith.learned2', 'sirith.learned3'];
  function malaProgress() {
    var n = 0;
    PARTS.forEach(function (k) {
      var a = read(k, []);
      if (Object.prototype.toString.call(a) === '[object Array]') {
        var seen = {};
        a.forEach(function (v) { if (v >= 1 && v <= PER_PART) seen[v] = true; });
        n += Object.keys(seen).length;
      }
    });
    return { done: n, total: PER_PART * PARTS.length };
  }
  function paintMala() {
    var p = malaProgress(), bar = $('malaBar'), lab = $('malaLab');
    if (!bar || !lab) return;
    bar.style.width = Math.round(p.done / p.total * 100) + '%';
    lab.textContent = '🌸 මල් ' + p.done + ' / ' + p.total;
  }

  /* ---------- promises ticked in each lesson ---------- */
  var VOWS = [
    { tag: 'tagSatya', key: 'daham.satya.vows', total: 5 },
    { tag: 'tagMansa', key: 'daham.mansa.vows', total: 5 },
    { tag: 'tagBodu', key: 'daham.bodu.vows', total: 7 },
    { tag: 'tagKathina', key: 'daham.kathina.vows', total: 7 },
    { tag: 'tagSama', key: 'daham.sama.vows', total: 7 }
  ];
  function paintVows() {
    VOWS.forEach(function (v) {
      var el = $(v.tag); if (!el) return;
      var map = read(v.key, null), n = 0;
      if (map && typeof map === 'object') {
        for (var k in map) if (map[k]) n++;
      }
      if (!n) { el.hidden = true; return; }        /* nothing ticked yet: no empty chip */
      el.textContent = '✓ පොරොන්දු ' + Math.min(n, v.total) + ' / ' + v.total;
      el.hidden = false;
    });
  }

  /* ---------- the Join pill, same as every lesson page ---------- */
  function paintMe() {
    var pill = $('mePill'); if (!pill || !Trk || !Trk.isOn()) return;
    var p = Trk.profile();
    pill.hidden = false;
    pill.classList.toggle('in', !!p);
    $('meName').textContent = p ? p.name : 'Join';
  }

  paintMala();
  paintVows();
  paintMe();
  if (Trk) Trk.onChange(paintMe);
})(window);
