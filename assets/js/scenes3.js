/* සිරිත් මල්දම (3 කොටස) — one picture for every poem. */
(function (global) {
  'use strict';
  var A = global.Art, H = global.Scenes.h;
  var E = A.emoji, L = A.label, R = A.rascal;
  var single = A.single, split = A.split, grid = A.grid, pair = A.pair;
  var say = H.say, sayE = H.sayE, dust = H.dust, splash = H.splash, flies = H.flies, stink = H.stink, wallBg = H.wallBg, coin = H.coin;
  function look(v) { return Math.max(33, v); }
  function T(v, o) { return A.taraka(look(v), o); }
  /* Tara — Taraka's sister shares the hero role in part 3 */
  function G(v, o) { var b = { garland: v >= 46, halo: v >= 61 }; for (var k in (o || {})) b[k] = o[k]; return A.girl(b); }
  var SY = 258, PY = 256, PS = 0.92, CY = 131, CS = 0.6;
  function aunty(o) { var b = { top: '#c4b5fd', topLine: '#8b5cf6', bottom: '#6d28d9', sash: '#ede9fe' }; for (var k in o) b[k] = o[k]; return A.mother(b); }
  function uncle(o) { var b = { top: '#bfdbfe', topLine: '#60a5fa', bottom: '#1e3a8a' }; for (var k in o) b[k] = o[k]; return A.father(b); }
  function king(o) { var b = { top: '#fde047', topLine: '#ca8a04', bottom: '#7e22ce', sash: '#dc2626', beard: true }; for (var k in o) b[k] = o[k]; return A.father(b); }
  function poorKid(o) { var b = { hair: 'messy', top: '#d6d3d1', topLine: '#a8a29e', bottom: '#78716c', patch: true, shoes: 'none', face: 'joy' }; for (var k in o) b[k] = o[k]; return A.person(b); }
  function farmer(o) { var b = { adult: true, hair: 'neat', top: '#fde68a', topLine: '#ca8a04', bottom: '#854d0e', wear: 'sarong', shoes: 'none' }; for (var k in o) b[k] = o[k]; return A.person(b); }
  function arrow(x, y, len, col) { return '<path d="M ' + x + ' ' + y + ' h ' + len + ' m -8 -7 l 8 7 l -8 7" stroke="' + (col || '#f59e0b') + '" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function haha(x, y, o) { return say(x, y, 'හා! හා! හා!', { w: 96, size: 12, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b', tail: (o || {}).tail }); }
  function bad(x, y, txt, o) { o = o || {}; return say(x, y, txt, { w: o.w, size: o.size || 12, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b', tail: o.tail }); }
  function good(x, y, txt, o) { o = o || {}; return say(x, y, txt, { w: o.w, size: o.size || 12, fill: '#dcfce7', stroke: '#86efac', color: '#166534', tail: o.tail }); }

  function rice(x, y, s, full) {
    var grains = '';
    if (full) {
      for (var i = 0; i < 7; i++) grains += '<ellipse cx="' + (14 + i * 5) + '" cy="' + (-78 + i * i * 1.3) + '" rx="4.4" ry="7" fill="#facc15" stroke="#ca8a04" stroke-width=".8" transform="rotate(' + (40 + i * 12) + ' ' + (14 + i * 5) + ' ' + (-78 + i * i * 1.3) + ')"/>';
      return A.at(x, y, s, '<path d="M 0 0 Q -2 -60 10 -82 Q 30 -92 46 -40" stroke="#65a30d" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M 0 -30 q -18 -14 -24 -34 M 0 -20 q 16 -8 22 -26" stroke="#65a30d" stroke-width="3" fill="none" stroke-linecap="round"/>' + grains);
    }
    for (var j = 0; j < 4; j++) grains += '<ellipse cx="' + (j % 2 ? 4 : -4) + '" cy="' + (-98 + j * 9) + '" rx="3" ry="6" fill="#d9f99d" stroke="#84cc16" stroke-width=".8"/>';
    return A.at(x, y, s, '<path d="M 0 0 V -104" stroke="#65a30d" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M 0 -30 q -18 -14 -24 -34 M 0 -20 q 16 -8 22 -26" stroke="#65a30d" stroke-width="3" fill="none" stroke-linecap="round"/>' + grains);
  }
  function ship(x, y, s, loaded) {
    var cargo = '';
    if (loaded) [[-30, '#f97316'], [-8, '#22c55e'], [14, '#3b82f6'], [-19, '#eab308', 1], [3, '#ef4444', 1]].forEach(function (c) { cargo += '<rect x="' + c[0] + '" y="' + (c[2] ? -50 : -32) + '" width="20" height="17" rx="2" fill="' + c[1] + '" stroke="#0003" stroke-width="1"/>'; });
    return A.at(x, y, s, cargo + '<path d="M -56 -16 h 112 l -16 30 h -80 Z" fill="#7c2d12"/><path d="M -56 -16 h 112 l -4 8 h -104 Z" fill="#b45309"/><rect x="38" y="-44" width="5" height="30" fill="#57534e"/><path d="M 43 -44 l 16 6 l -16 6 Z" fill="#ef4444"/>');
  }
  function gem(x, y, s, col) {
    col = col || '#38bdf8';
    return A.at(x, y, s, '<circle r="26" fill="#fff" opacity=".5" class="glow"/><path d="M -16 -6 L -8 -16 H 8 L 16 -6 L 0 16 Z" fill="' + col + '" stroke="#0369a1" stroke-width="1.5"/><path d="M -16 -6 H 16 M -8 -16 L -4 -6 L 0 16 L 4 -6 L 8 -16" stroke="#e0f2fe" stroke-width="1.2" fill="none"/>');
  }
  function mountain(x, y, w, h, col) {
    return '<path d="M ' + (x - w / 2) + ' ' + y + ' L ' + (x - w * 0.1) + ' ' + (y - h) + ' L ' + (x + w * 0.08) + ' ' + (y - h * 0.8) + ' L ' + (x + w * 0.2) + ' ' + (y - h * 0.95) + ' L ' + (x + w / 2) + ' ' + y + ' Z" fill="' + (col || '#78716c') + '"/>';
  }
  function fish(x, y, s, o) {
    o = o || {};
    return A.at(x, y, s, '<ellipse cx="0" cy="0" rx="14" ry="8" fill="' + (o.color || '#fb923c') + '"/><path d="M -12 0 l -12 -8 v 16 Z" fill="' + (o.color || '#fb923c') + '"/><circle cx="7" cy="-2" r="1.8" fill="#1e293b"/>' +
      (o.sad ? '<path d="M 8 4 q 3 -3 6 0" stroke="#1e293b" stroke-width="1" fill="none"/>' : '<path d="M 8 3 q 3 3 6 0" stroke="#1e293b" stroke-width="1" fill="none"/>'), o.flip);
  }
  function bottle(x, y, s, col) {
    return A.at(x, y, s, '<rect x="-5" y="-46" width="10" height="14" rx="2" fill="' + (col || '#15803d') + '"/><path d="M -5 -32 Q -13 -26 -13 -16 V 0 H 13 V -16 Q 13 -26 5 -32 Z" fill="' + (col || '#15803d') + '"/><rect x="-10" y="-20" width="20" height="13" fill="#fef3c7"/>' + E(0, -13, 10, '☠️'));
  }
  function thorn(x, y, s) {
    return A.at(x, y, s, '<path d="M -18 0 q 18 -10 36 0" stroke="#713f12" stroke-width="3" fill="none"/><path d="M -12 -3 l -3 -10 M -2 -5 l 0 -11 M 8 -4 l 4 -10 M 14 -2 l 7 -7 M -16 -1 l -8 -6" stroke="#713f12" stroke-width="2" stroke-linecap="round"/>');
  }
  function mirror(x, y, w, h) {
    return '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="' + (w / 2.4) + '" fill="#e0f2fe" stroke="#8a5426" stroke-width="5"/><path d="M ' + (x - w * 0.25) + ' ' + (y - h * 0.3) + ' l ' + (w * 0.2) + ' -' + (h * 0.1) + '" stroke="#fff" stroke-width="3" stroke-linecap="round"/>';
  }
  function loo(x, y, s) {
    return A.at(x, y, s, '<rect x="-30" y="-78" width="60" height="78" fill="#d6a06a" stroke="#8a5426" stroke-width="2"/><path d="M -38 -78 L 0 -102 L 38 -78 Z" fill="#7c2d12"/><rect x="-16" y="-62" width="32" height="62" rx="2" fill="#92400e"/><circle cx="10" cy="-30" r="2.4" fill="#fde047"/>' + E(0, -46, 16, '🚻'));
  }
  function tool(x, y, em, size) { return E(x, y, size || 18, em); }
  /* a "why it harms" board used for the four poems on smoking, tobacco, betel and drink */
  function harm(v, centre, items, hero) {
    var s = '<rect width="400" height="300" fill="#fff7ed"/><rect y="236" width="400" height="64" fill="#fde7c3"/>' + A.ban(200, 112, 58, centre);
    var pos = [[62, 60], [338, 60], [62, 178], [338, 178]];
    items.forEach(function (it, i) {
      s += '<rect x="' + (pos[i][0] - 52) + '" y="' + (pos[i][1] - 42) + '" width="104" height="84" rx="16" fill="#fff" stroke="#fca5a5" stroke-width="3" stroke-dasharray="7 5"/>' +
        E(pos[i][0], pos[i][1] - 10, 32, it[0]) + L(pos[i][0], pos[i][1] + 26, 11.5, it[1], '#7f1d1d', 900);
      s += '<path d="M ' + (200 + (pos[i][0] < 200 ? -62 : 62)) + ' ' + (112 + (pos[i][1] < 100 ? -22 : 30)) + ' L ' + (pos[i][0] + (pos[i][0] < 200 ? 56 : -56)) + ' ' + pos[i][1] + '" stroke="#f87171" stroke-width="3" stroke-dasharray="4 5" stroke-linecap="round"/>';
    });
    s += hero({ x: 200, y: 292, s: 0.82, face: 'calm', armL: { e: [-30, -70], h: [-44, -90] }, armR: { e: [30, -70], h: [44, -90] } }) + bad(286, 262, 'මට එපා!', { w: 84, tail: 'left' });
    return single('plain', s);
  }

  var S = {};

  S[1] = function () {
    return single('temple',
      A.rays(200, 160, 230, '#fff1b8') + A.stupa(60, 226, 0.85) + A.boTree(346, 228, 0.8) + A.garlandArc(24, 376, 22, 20, 13) +
      A.book(176, 110, 1.5, '#f59e0b', -14) + L(176, 110, 16, '1', '#fff', 900) + A.book(200, 102, 1.5, '#16a34a') + L(202, 102, 16, '2', '#fff', 900) + A.book(226, 110, 1.6, '#2563eb', 14) + L(228, 110, 17, '3', '#fff', 900) +
      A.sparkle([[150, 80, 1.4], [256, 78, 1.4], [200, 60, 1.2]]) +
      G(1, { x: 260, y: 268, s: 1.06, face: 'joy', armL: 'up', armR: 'wave' }) + T(1, { x: 140, y: 268, s: 1.1, face: 'joy', armL: 'wave', armR: 'up' }) +
      A.flower(30, 276, 1.1) + A.flower(372, 278, 1.1, '#fbbf24') + A.lotus(200, 284, 0.7));
  };

  S[2] = function () {
    return split(
      ['room', R({ x: 84, y: 266, s: 0.9, pose: 'sitFloor', face: 'sly', armL: 'head', armR: 'head' }) + A.zzz(30, 170, 0.7) +
        A.think(110, 90, 130, 64, E(-36, 0, 26, '😠') + E(0, 0, 24, '🪨') + E(36, 0, 24, '💢'), { fill: '#e5e7eb', tail: 'left' }) + A.clock(160, 190, 16, 3, 0)],
      ['garden', A.sun(160, 40, 16) + A.sapling(150, 270, 1.2) + T(2, { x: 80, y: PY, s: PS, face: 'joy', armR: { e: [30, -52], h: [46, -46] }, holdR: E(8, 4, 24, '🚿') }) +
        A.think(70, 80, 110, 50, E(-28, 0, 22, '📖') + E(0, 0, 22, '🌱') + E(28, 0, 22, '🎨'), { tail: 'right' }) + A.sparkle([[30, 170, 1.2]])]
    );
  };

  S[3] = function () {
    return grid([
      [true, 'room', A.chair(54, 134, 0.8, { h: 18 }) + T(3, { x: 58, y: 134, s: CS, pose: 'sit', face: 'joy', armR: 'low', holdR: A.pencil(2, -6, 0.7, 20) }) + A.desk(100, 134, 0.75) + A.openBook(100, 102, 0.6) + L(140, 30, 11, 'කළ යුතු දේ', '#166534', 900)],
      [false, 'plain', wallBg(193, 144, '#f5f0e6', '#c9b58d') + A.scribble(130, 70, 1) + R({ x: 66, y: CY, s: CS, face: 'sly', armR: 'up' }) + L(130, 124, 11, 'නොකළ යුතු දේ', '#7f1d1d', 900)],
      [true, 'class', A.teacher({ x: 140, y: CY, s: 0.56, face: 'joy', armL: 'point' }) + G(3, { x: 64, y: CY, s: CS, face: 'joy', armL: 'worship', armR: 'worship' }) + L(100, 30, 11, 'අණ පිළිපැදීම', '#166534', 900)],
      [null, 'garden', A.rays(140, 70, 80, '#fde68a') + A.steps(60, 132, 4, 30, 18, ['#fca5a5', '#fde047', '#86efac', '#7dd3fc']) + E(164, 44, 26, '🏆') + T(3, { x: 120, y: 96, s: 0.42, pose: 'walk', face: 'joy', armR: 'up' }) + L(50, 30, 11, 'දියුණුව', '#92400e', 900), { num: '★' }]
    ]);
  };

  S[4] = function () {
    var field = '';
    for (var i = 0; i < 9; i++) field += rice(24 + i * 46, 300, 0.5, i % 2 === 0);
    return single('garden',
      A.sun(60, 50, 22) + A.cloud(230, 50, 0.8) + '<rect y="236" width="400" height="64" fill="#a3d977"/>' +
      rice(70, 276, 1.5, false) + L(70, 100, 12, 'හිස් කරල', '#57534e', 900) + A.badge(104, 120, 12, false) +
      rice(150, 276, 1.5, true) + L(190, 124, 12, 'පිරුණු කරල', '#166534', 900) + A.badge(230, 140, 12, true) +
      A.teacher({ x: 346, y: SY + 6, s: 0.92, face: 'joy', armL: { e: [-30, -84], h: [-48, -96] } }) +
      T(4, { x: 274, y: SY + 8, s: 1, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[318, 120, 1]]) + field);
  };

  S[5] = function () {
    return single('plain',
      '<rect width="400" height="300" fill="url(#gSky)"/>' + A.sun(340, 50, 22) + A.cloud(100, 50, 0.9) + A.cloud(230, 80, 0.6) +
      ship(110, 176, 1, false) + ship(290, 202, 1, true) + A.water(0, 186, 400, 114) +
      '<rect x="60" y="230" width="100" height="30" rx="10" fill="#fff" opacity=".9"/>' + L(110, 245, 12, 'බඩු නැත · උඩින්', '#57534e', 900) +
      '<rect x="234" y="250" width="112" height="30" rx="10" fill="#fff" opacity=".9"/>' + L(290, 265, 12, 'බඩු පිරී · පහතින්', '#166534', 900) +
      A.badge(340, 140, 14, true) + A.flyBird(60, 100, 0.9) + A.flyBird(180, 70, 0.7));
  };

  S[6] = function () {
    return single('gloom',
      A.rubbish(90, 270, 2.2) + flies(40, 150) + flies(150, 130) + gem(96, 200, 1.5, '#38bdf8') + A.sparkle([[60, 170, 1.4], [132, 176, 1.4], [96, 150, 1.2]]) +
      arrow(176, 210, 40) + '<circle cx="300" cy="180" r="90" fill="#fde68a" opacity=".5" class="glow"/>' +
      A.grandma({ x: 350, y: 268, s: 0.84, face: 'joy' }) + poorKid({ x: 280, y: 270, s: 1.08, halo: true, armR: 'give', holdR: A.cup(6, 0, 1.2), face: 'joy' }) +
      A.hearts([[320, 110, 1.1]]) + good(280, 60, 'හොඳ සිරිත', { w: 100 }));
  };

  S[7] = function () {
    return split(
      ['gloom', R({ x: 84, y: PY, s: PS, face: 'shout', top: '#a855f7', topLine: '#7e22ce', sash: '#facc15', armR: 'point', armL: 'hip' }) + E(84, 138, 28, '👑') + E(40, 210, 18, '💍') + E(130, 220, 18, '💎') +
        A.dog(150, 266, 0.7, { sad: true, color: '#a8a29e' }) + A.bubble(120, 80, 90, 36, E(-20, 1, 18, '🤬') + E(16, 1, 18, '💢'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['garden', A.sun(160, 40, 16) + G(7, { x: 84, y: PY, s: PS, face: 'joy', armL: 'worship', armR: 'worship', halo: true }) + A.dog(150, 266, 0.7) +
        A.hearts([[130, 150, 1], [40, 170, 0.8]]) + good(100, 80, 'ආයුබෝවන්!', { w: 104 })]
    );
  };

  S[8] = function () {
    return single('night',
      A.stars([[40, 40, 1.2], [110, 70, 1], [200, 40, 1], [60, 120, 0.9]]) + A.fullMoon(300, 80, 40) +
      A.tree(40, 250, 1.1) + A.tree(110, 262, 0.9) + A.bush(80, 280, 1.4) + E(84, 254, 30, '👑') + '<path d="M 60 236 l 50 30 M 110 236 l -50 30" stroke="#e5e7eb" stroke-width="1" opacity=".7"/>' + L(84, 292, 11, 'කුල මානය කැලේට', '#e5e7eb', 900) +
      '<circle cx="280" cy="200" r="80" fill="#fef9c3" opacity=".22" class="glow"/>' +
      T(8, { x: 240, y: 274, s: 1.04, face: 'joy', halo: true, armL: 'worship', armR: 'worship' }) + G(8, { x: 320, y: 274, s: 1, face: 'joy', halo: true, armL: 'worship', armR: 'worship' }) +
      good(280, 140, 'හොඳ සිරිත සඳ මෙන්', { w: 150 }));
  };

  S[9] = function () {
    return split(
      ['yard', A.house(60, 210, 0.9, { roof: '#7e22ce' }) + A.house(150, 200, 0.6, { roof: '#7e22ce' }) + king({ x: 96, y: PY + 6, s: 0.8, face: 'sad', armR: 'low', holdR: A.openBook(6, 8, 0.7) }) + E(96, 118, 24, '👑') +
        A.think(150, 110, 60, 40, L(0, 0, 22, '?', '#991b1b', 900), { fill: '#e5e7eb', tail: 'left' }) + E(30, 270, 18, '💰') + E(166, 272, 18, '💰')],
      ['class', A.blackboard(96, 66, 120, 56, L(96, 66, 16, 'ක ඛ ග ඝ', '#fff')) + A.chair(60, PY, 1.1, { h: 18 }) + T(9, { x: 64, y: PY, s: 0.88, pose: 'sit', face: 'joy', armR: 'low' }) +
        A.desk(118, PY, 1.1) + A.openBook(118, 210, 0.85, { glow: true }) + E(160, 130, 26, '🎓') + A.sparkle([[30, 140, 1.2]])]
    );
  };

  S[10] = function () {
    return single('garden',
      A.sun(60, 50, 22) + A.cloud(230, 50, 0.8) + A.house(350, 230, 0.7, { roof: '#7e22ce' }) + A.rays(140, 170, 130, '#fde68a') +
      A.person({ x: 140, y: SY + 6, s: 1, adult: true, hair: 'neat', top: '#e7e5e4', topLine: '#a8a29e', bottom: '#78716c', wear: 'sarong', patch: true, shoes: 'none', face: 'joy', glasses: true, armL: 'low', holdL: A.openBook(-6, 6, 0.9, { glow: true }) }) +
      king({ x: 262, y: SY + 6, s: 1, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + E(250, 96, 26, '👑') +
      A.garlandArc(176, 226, 150, 10, 5) + A.hearts([[200, 100, 1.1]]) + good(110, 60, 'උගත්කම', { w: 90 }));
  };

  S[11] = function () {
    return pair(
      ['class', A.blackboard(96, 70, 120, 56, L(96, 70, 15, 'ඉගෙන ගනිමු', '#fde047')) + A.chair(54, PY, 1.1, { h: 18 }) + T(11, { x: 58, y: PY, s: 0.88, pose: 'sit', face: 'joy', armR: 'low' }) +
        A.desk(112, PY, 1.1) + A.openBook(112, 210, 0.85) + A.book(160, 266, 1, '#ef4444', 90) + A.book(160, 256, 1, '#22c55e', 90) + A.book(160, 246, 1, '#3b82f6', 90), { tag: '20' }],
      ['garden', A.rays(96, 170, 140, '#fde68a') + uncle({ x: 96, y: PY, s: 0.96, face: 'joy', halo: true, tie: '#dc2626', wear: 'trousers', armR: 'wave' }) + E(96, 96, 26, '🎓') +
        G(11, { x: 30, y: 270, s: 0.6, face: 'joy', armR: 'up' }) + A.friend({ x: 166, y: 270, s: 0.6, face: 'joy', armL: 'up' }) + A.sparkle([[30, 120, 1.2], [164, 120, 1.2]]), { tag: '30' }]
    );
  };

  S[12] = function () {
    return single('path',
      A.rays(340, 100, 140, '#fff1b8') + A.sun(340, 60, 24) + A.cloud(90, 60, 1.1) + A.grandpa({ x: 90, y: 74, s: 0.42, face: 'joy' }) + good(150, 30, 'ඇත්තයි!', { w: 76, tail: 'left' }) +
      '<path d="M 120 290 Q 220 240 330 120" stroke="#fbbf24" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/><path d="M 120 290 Q 220 240 330 120" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="8 10" stroke-linecap="round"/>' +
      A.teacher({ x: 90, y: SY + 8, s: 0.98, face: 'joy', armR: { e: [34, -96], h: [58, -112] } }) +
      A.bubble(190, 130, 110, 40, E(-34, 1, 18, '📜') + L(14, 0, 12, 'ගුරු වදන', '#7c2d12', 900), { fill: '#fef9c3', stroke: '#fde047' }) +
      G(12, { x: 216, y: 250, s: 0.76, pose: 'walk', face: 'joy' }) + T(12, { x: 268, y: 214, s: 0.66, pose: 'walk', face: 'joy', armR: 'up' }) + E(340, 120, 26, '🏆'));
  };

  S[13] = function () {
    return single('room',
      A.windowFrame(200, 70, 76, 60, A.sun(200, 70, 12, { face: false })) +
      A.teacher({ x: 60, y: SY, s: 0.98, face: 'joy', halo: true, armR: { e: [30, -84], h: [48, -96] } }) +
      A.mother({ x: 300, y: SY, s: 0.98, face: 'joy', halo: true, armL: { e: [-30, -84], h: [-48, -96] } }) + A.father({ x: 360, y: SY, s: 0.98, face: 'joy', halo: true }) +
      A.mat(180, 276, 70) + G(13, { x: 150, y: 274, s: 0.94, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship', flip: true }) +
      T(13, { x: 214, y: 274, s: 0.98, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[110, 130, 1.1], [254, 130, 1.1], [184, 150, 0.9]]) + A.lotus(184, 290, 0.5));
  };

  S[14] = function () {
    return pair(
      ['room', A.mother({ x: 50, y: PY, s: 0.72, face: 'joy', armR: 'up' }) + A.father({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'up' }) +
        T(14, { x: 100, y: PY, s: 0.8, face: 'joy', armL: 'up', armR: 'up', holdR: E(0, -14, 24, '🏆') }) + A.hearts([[60, 110, 1], [140, 110, 1]]), { tag: '👪' }],
      ['room', A.chair(130, PY, 1.3, { h: 28, flip: true }) + A.grandma({ x: 132, y: PY, s: 0.78, pose: 'sit', flip: true, face: 'joy' }) +
        G(14, { x: 54, y: PY, s: 0.86, face: 'joy', armR: 'give', holdR: A.cup(6, 0, 1.1, '#fff', { steam: true }) }) + A.hearts([[96, 130, 1], [160, 110, 0.8]]), { tag: '💗' }]
    );
  };

  S[15] = function () {
    return split(
      ['room', A.rubbish(150, 266, 0.7) + E(40, 270, 18, '🧦') + E(110, 274, 18, '📄') + A.mother({ x: 150, y: 240, s: 0.64, face: 'tired', armL: 'point' }) +
        R({ x: 60, y: 264, s: 0.86, pose: 'sitFloor', face: 'happy', armR: 'low', holdR: E(8, 4, 22, '🎮') }) + A.think(70, 110, 110, 40, L(0, 0, 11, 'කිව්වොත් විතරයි', '#57534e'), { fill: '#e5e7eb', tail: 'left' })],
      ['room', A.mother({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'wave' }) + T(15, { x: 70, y: PY, s: 0.88, face: 'joy', armR: 'low', holdR: A.broom(2, -12, 0.9, 12) }) + E(60, 130, 20, '👀') +
        A.sparkle([[30, 250, 1.2], [116, 260, 1.2], [110, 200, 1]]) + A.hearts([[116, 130, 1]])]
    );
  };

  S[16] = function () {
    return grid([
      [1, 'room', '<rect x="60" y="50" width="110" height="6" fill="#8a5426"/><rect x="60" y="96" width="110" height="6" fill="#8a5426"/>' + A.book(76, 36, 0.9, '#ef4444') + A.book(96, 36, 0.9, '#22c55e') + A.book(116, 36, 0.9, '#3b82f6') + A.book(136, 36, 0.9, '#f59e0b') + E(90, 82, 18, '🧸') + E(130, 82, 18, '⚽') + L(40, 124, 11, 'පිළිවෙළ', '#92400e', 900)],
      [2, 'room', G(16, { x: 80, y: CY, s: CS, face: 'joy', armR: 'give', holdR: '<rect x="-6" y="-6" width="16" height="12" rx="3" fill="#7dd3fc"/>' }) + A.table(140, 132, 0.7, 40) + A.sparkle([[140, 80, 1.3], [120, 60, 1], [164, 66, 1]]) + L(140, 30, 11, 'පිරිසිදුකම', '#92400e', 900)],
      [3, 'plain', wallBg(193, 144, '#fffdf5', '#fde7c3') + '<rect x="40" y="40" width="110" height="70" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="2"/><path d="M 54 60 h 82 M 54 76 h 82 M 54 92 h 82" stroke="#2563eb" stroke-width="2.5"/>' + '<rect x="50" y="98" width="100" height="10" fill="#fde047" stroke="#ca8a04" transform="rotate(-4 100 103)"/>' + A.pencil(158, 66, 0.9, 20) + L(100, 126, 11, 'ඇද නැතිව', '#92400e', 900)],
      [4, 'garden', T(16, { x: 96, y: CY, s: CS + 0.06, face: 'joy', armL: 'up', armR: 'up' }) + E(40, 60, 20, '🎵') + E(150, 60, 20, '😊') + L(96, 24, 11, 'සතුටින්', '#92400e', 900)]
    ]);
  };

  S[17] = function () {
    return split(
      ['room', A.bin(130, 266, 1.6) + E(130, 196, 22, '🧸') + E(108, 170, 20, '👕') + E(152, 166, 20, '📚') + R({ x: 54, y: PY, s: 0.86, face: 'sly', armR: 'up' }) +
        '<path d="M 80 160 q 20 -30 40 10" stroke="#57534e" stroke-width="2" fill="none" stroke-dasharray="4 4"/>'],
      ['room', G(17, { x: 56, y: PY, s: 0.88, face: 'joy', armR: 'give', holdR: E(10, -2, 24, '🧸') }) + poorKid({ x: 140, y: PY, s: 0.82, face: 'joy', armL: 'out' }) +
        E(100, 270, 20, '📚') + E(170, 270, 18, '👕') + A.hearts([[98, 130, 1.1], [160, 120, 0.8]])]
    );
  };

  S[18] = function () {
    return split(
      ['gloom', '<path d="M 0 110 L 192 250 L 192 292 L 0 292 Z" fill="#9aa08f"/>' + '<circle cx="30" cy="118" r="9" fill="#fff" stroke="#cbd5e1"/>' + L(30, 94, 10, 'සුළු වරද', '#57534e', 900) +
        '<circle cx="88" cy="150" r="20" fill="#fff" stroke="#cbd5e1"/>' + '<circle cx="146" cy="176" r="38" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>' + L(146, 176, 12, 'මහ වරද', '#991b1b', 900) +
        '<path d="M 44 112 l 18 10 M 110 140 l 14 8" stroke="#64748b" stroke-width="2" stroke-dasharray="3 4"/>' + R({ x: 170, y: 286, s: 0.56, face: 'wow', armL: 'up', armR: 'up' })],
      ['garden', A.sun(160, 40, 16) + A.fence(0, 264, 192) + '<rect x="80" y="238" width="22" height="30" fill="#86d36b"/>' +
        T(18, { x: 60, y: PY + 6, s: 0.86, pose: 'kneel', face: 'joy', armR: 'give', holdR: E(8, 0, 20, '🔨') }) + '<path d="M 88 264 v -24 l 3 -5 l 3 5 v 24 Z" fill="#fde68a" stroke="#a16207"/>' +
        good(110, 110, 'දැන් ම හදමු', { w: 110 }) + A.sparkle([[130, 220, 1.2]])]
    );
  };

  S[19] = function () {
    function card(x, y, em, txt, ok) {
      return '<rect x="' + (x - 40) + '" y="' + (y - 34) + '" width="80" height="68" rx="12" fill="#fff" stroke="' + (ok ? '#86efac' : '#fca5a5') + '" stroke-width="3"/>' + E(x, y - 8, 26, em) + L(x, y + 22, 10, txt, '#3b2a1e', 900) + A.badge(x + 32, y - 28, 12, ok);
    }
    return split(
      ['gloom', card(52, 70, '🤲', 'උදව් කිරීම', false) + card(140, 70, '🥭', 'හොරකම', true) + R({ x: 96, y: PY, s: 0.9, face: 'wow', rot: 0, armL: 'up', armR: 'up' }) + L(96, 130, 22, '?!', '#991b1b', 900) + E(40, 200, 22, '🙃')],
      ['garden', card(52, 70, '🤲', 'උදව් කිරීම', true) + card(140, 70, '🥭', 'හොරකම', false) + G(19, { x: 96, y: PY, s: 0.9, face: 'joy', armL: 'up', armR: 'up' }) + A.sparkle([[30, 170, 1.2], [164, 170, 1.2]])]
    );
  };

  S[20] = function () {
    return split(
      ['room', A.windowFrame(140, 90, 70, 70, '<path d="M 120 70 l 18 22 l -10 6 l 20 20 M 138 92 l 16 -10" stroke="#1e293b" stroke-width="2" fill="none"/>') + A.ball(150, 264, 9) +
        A.father({ x: 40, y: PY, s: 0.7, face: 'sad' }) + R({ x: 100, y: PY, s: 0.84, face: 'sly', armL: 'back', armR: 'back' }) + bad(100, 140, 'මම නෙවෙයි', { w: 96 }) +
        A.badge(150, 190, 13, false) + A.badge(176, 190, 13, false) + L(163, 214, 11, 'වරද 2', '#991b1b', 900)],
      ['room', A.windowFrame(140, 90, 70, 70, '<path d="M 120 70 l 18 22 l -10 6 l 20 20 M 138 92 l 16 -10" stroke="#1e293b" stroke-width="2" fill="none"/>') + A.ball(150, 264, 9) +
        A.father({ x: 40, y: PY, s: 0.7, face: 'joy', armR: { e: [30, -86], h: [50, -100] } }) + T(20, { x: 106, y: PY, s: 0.84, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) +
        good(110, 146, 'මගේ වරද', { w: 90 }) + A.hearts([[70, 110, 1]])]
    );
  };

  S[21] = function () {
    return split(
      ['gloom', A.cloud(140, 60, 1, '#6b7280') + '<ellipse cx="150" cy="270" rx="40" ry="12" fill="#1c1917"/>' + E(150, 230, 20, '⚠️') + aunty({ x: 36, y: PY, s: 0.66, face: 'sad', armR: 'out' }) +
        R({ x: 100, y: PY, s: 0.84, pose: 'walk', face: 'sly', armL: { e: [-26, -84], h: [-18, -92] }, armR: { e: [26, -84], h: [18, -92] } }) + bad(60, 90, 'අහන්නේ නෑ', { w: 96 })],
      ['path', A.sun(150, 50, 22) + aunty({ x: 36, y: PY, s: 0.66, face: 'joy', armR: 'out' }) + G(21, { x: 104, y: PY, s: 0.84, face: 'joy', armL: 'worship', armR: 'worship' }) + E(70, 130, 22, '👂') +
        arrow(130, 220, 30, '#16a34a') + A.flower(170, 270, 1) + A.hearts([[70, 170, 0.9]])]
    );
  };

  S[22] = function () {
    function hut(x, y, crooked) {
      return '<g transform="translate(' + x + ' ' + y + ')' + (crooked ? ' rotate(14)' : '') + '"><rect x="-22" y="-34" width="44" height="34" fill="#d6a06a" stroke="#8a5426" stroke-width="2"/><path d="M -28 -34 L 0 -58 L 28 -34 Z" fill="#b91c1c"/><circle cx="0" cy="-18" r="7" fill="#3b2a1e"/></g>';
    }
    return split(
      ['yard', hut(130, 250, true) + E(160, 190, 18, '💥') + '<rect x="90" y="252" width="8" height="30" fill="#8a5426" transform="rotate(30 94 266)"/>' + R({ x: 54, y: PY, s: 0.86, face: 'sad', armR: 'point' }) +
        bad(80, 110, 'දැන් හරිද?', { w: 96 }) + A.clock(160, 60, 16, 6, 0)],
      ['yard', A.sun(160, 40, 16) + '<rect x="100" y="180" width="70" height="56" rx="4" fill="#fff" stroke="#93c5fd" stroke-width="2"/>' + hut(135, 232, false).replace('translate(135 232)', 'translate(135 230) scale(.7)') +
        A.father({ x: 150, y: PY + 10, s: 0.6, face: 'joy', armL: 'point' }) + T(22, { x: 50, y: PY, s: 0.86, face: 'happy', armR: 'point' }) + good(70, 110, 'කොහොමද හදන්නේ?', { w: 130, size: 11 })]
    );
  };

  S[23] = function () {
    return single('garden',
      A.rays(300, 80, 110, '#fde68a') + A.sun(60, 50, 22) + A.cloud(180, 50, 0.8) + mountain(280, 290, 300, 210, '#a8a29e') + mountain(300, 290, 200, 150, '#78716c') +
      '<path d="M 300 80 v -34" stroke="#57534e" stroke-width="3"/><path d="M 300 46 l 26 8 l -26 9 Z" fill="#ef4444"/>' +
      '<path d="M 150 280 Q 220 220 262 150 Q 280 110 298 84" stroke="#fde047" stroke-width="3" fill="none" stroke-dasharray="7 7" stroke-linecap="round"/>' +
      T(23, { x: 234, y: 196, s: 0.8, pose: 'walk', face: 'joy', armR: { e: [26, -80], h: [10, -110] }, armL: 'low', rot: -8 }) + A.sweat(262, 100) +
      A.bubble(100, 130, 150, 50, L(0, -9, 12, 'තමාගේ අත', '#7c2d12', 900) + L(0, 9, 12, 'තමාගේ හිසට', '#7c2d12', 900), { fill: '#fef9c3', stroke: '#fde047', tail: 'right' }) + E(60, 250, 26, '💪') + A.flower(30, 286, 1));
  };

  S[24] = function () {
    return split(
      ['gloom', mountain(70, 270, 150, 170, '#57534e') + L(70, 210, 11, 'මගේ වැරදි', '#fff', 900) + '<circle cx="166" cy="250" r="4" fill="#ca8a04"/>' + L(160, 274, 9, 'අනුන්ගේ', '#57534e', 900) +
        R({ x: 112, y: 284, s: 0.74, face: 'sly', armR: 'give', holdR: E(14, -4, 26, '🔍') }) + bad(130, 150, 'බලන්න!', { w: 76 })],
      ['room', mirror(140, 150, 70, 120) + E(140, 150, 40, '🧒') + T(24, { x: 60, y: PY, s: 0.9, face: 'calm', armR: 'point' }) + A.think(70, 90, 120, 44, L(0, 0, 11, 'මගේ වරද මොකක්ද?', '#3b2a1e', 900), { tail: 'left' }) + A.sparkle([[170, 80, 1.2]])]
    );
  };

  S[25] = function () {
    return split(
      ['gloom', R({ x: 80, y: PY, s: 0.9, face: 'angry', armR: 'point', armL: 'hip' }) + E(30, 120, 20, '😠') + E(60, 80, 20, '🤥') + E(110, 70, 20, '😡') + E(40, 170, 18, '🦥') +
        A.friend({ x: 154, y: PY, s: 0.76, face: 'sad', armL: 'out' }) + bad(140, 130, 'යන්න!', { w: 70, tail: 'left' })],
      ['garden', A.sun(160, 40, 16) + G(25, { x: 70, y: PY, s: 0.9, face: 'joy', armR: 'out' }) + A.friend({ x: 146, y: PY, s: 0.8, face: 'joy', armL: 'out' }) +
        E(30, 120, 20, '😊') + E(70, 84, 20, '📖') + E(116, 90, 20, '🌸') + A.hearts([[108, 160, 1]])]
    );
  };

  S[26] = function () {
    return split(
      ['yard', A.friend({ x: 140, y: PY, s: 0.84, face: 'joy', armL: 'up', holdL: E(0, -14, 26, '🏆') }) + R({ x: 54, y: PY, s: 0.88, face: 'angry', armL: 'cross', armR: 'cross' }) +
        E(54, 130, 22, '😒') + A.think(60, 80, 90, 40, L(0, 0, 11, 'මට ඕනෑ!', '#991b1b', 900), { fill: '#e5e7eb', tail: 'left' }) + stink(30, 230)],
      ['yard', A.sun(40, 40, 16) + A.friend({ x: 140, y: PY, s: 0.84, face: 'joy', armL: 'up', holdL: E(0, -14, 26, '🏆') }) + T(26, { x: 56, y: PY, s: 0.9, face: 'joy', armL: 'up', armR: 'up', halo: true }) +
        E(30, 170, 22, '👏') + good(80, 80, 'සුබ පැතුම්!', { w: 100 }) + A.hearts([[100, 140, 1]])]
    );
  };

  S[27] = function () {
    return split(
      ['gloom', aunty({ x: 144, y: PY, s: 0.72, face: 'sad', armL: 'out' }) + R({ x: 60, y: PY, s: 0.88, pose: 'walk', face: 'sly', armL: 'low', holdL: A.gift(-6, 12, 1, '#94a3b8') }) +
        A.think(60, 90, 90, 38, L(0, 0, 11, 'ස්තුති නෑ', '#991b1b', 900), { fill: '#e5e7eb', tail: 'left' })],
      ['garden', A.rays(64, 170, 110, '#fde68a') + aunty({ x: 144, y: PY, s: 0.72, face: 'joy', armL: 'out' }) + G(27, { x: 64, y: PY, s: 0.9, face: 'joy', halo: true, armL: 'worship', armR: 'worship' }) +
        A.gift(104, 268, 0.9, '#f43f5e') + good(70, 90, 'ස්තුතියි!', { w: 90 }) + A.hearts([[108, 150, 1]])]
    );
  };

  S[28] = function () {
    return grid([
      [1, 'plain', wallBg(193, 144, '#e0f2fe', '#bae6fd') + A.tap(140, 128, 0.9) + A.basin(154, 136, 0.85) + T(28, { x: 76, y: CY, s: CS + 0.06, face: 'calm', armL: 'eyes', armR: 'eyes' }) + splash(76, 70, 0.5)],
      [2, 'room', mirror(150, 66, 44, 70) + G(28, { x: 80, y: CY, s: CS + 0.06, face: 'joy', armR: 'head', holdR: A.comb(2, -4, 0.7, -20) }) + A.pot(30, 130, 0.5, '#ca8a04') + L(30, 100, 9, 'තෙල්', '#7c2d12', 900)],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + R({ x: 96, y: CY + 6, s: CS + 0.1, face: 'sad', dirty: true, patch: true }) + flies(40, 60) + stink(150, 110)],
      [true, 'garden', A.sun(160, 34, 14) + T(28, { x: 70, y: CY, s: CS + 0.04, face: 'joy', armR: 'wave' }) + G(28, { x: 130, y: CY, s: CS, face: 'joy', armL: 'wave' }) + A.sparkle([[40, 60, 1.2], [100, 40, 1], [160, 80, 1.1]])]
    ]);
  };

  S[29] = function () {
    return grid([
      [false, 'plain', wallBg(193, 144, '#fde9c8', '#c9b58d') + A.doorway(96, 130, 0.95, { open: true }) + R({ x: 76, y: 130, s: 0.52, pose: 'sitFloor', face: 'joy' }) + R({ x: 120, y: 130, s: 0.5, pose: 'sitFloor', face: 'joy', top: '#d6d3d1' }) + A.bubble(150, 40, 60, 28, L(0, 0, 10, 'බ්ලා…', '#991b1b'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      [false, 'yard', A.house(50, 118, 0.6) + R({ x: 120, y: CY, s: CS, face: 'wow', armL: 'up', armR: 'up' }) + E(120, 40, 20, '👕') + E(164, 70, 16, '👀') + E(30, 40, 16, '👀')],
      [true, 'yard', A.sun(160, 34, 14) + A.house(44, 118, 0.6) + G(29, { x: 124, y: CY, s: CS + 0.04, face: 'joy', armR: 'head', holdR: A.comb(2, -4, 0.7, -20) })],
      [true, 'nightroom', A.moon(160, 30, 10) + '<path d="M 10 60 L 96 24 L 182 60" stroke="#8a5426" stroke-width="6" fill="none"/>' + A.bed(90, 132, 0.95, { inner: A.person({ x: 12, y: -31, s: 0.6, rot: -90, face: 'sleep', hair: 'neat', pose: 'none' }) }) + A.zzz(60, 80, 0.7)]
    ]);
  };

  S[30] = function () {
    return grid([
      [false, 'road', R({ x: 96, y: 128, s: CS, pose: 'walk', face: 'wow', armL: 'low', armR: 'low' }) + '<path d="M 80 96 q 16 10 32 0 l 4 18 h -40 Z" fill="#57534e"/>' + E(150, 60, 16, '👀') + L(116, 26, 10, 'පාරේ අඳිනවා', '#7f1d1d', 900)],
      [false, 'path', R({ x: 96, y: CY, s: CS, pose: 'walk', face: 'joy', wear: 'sarong', bottom: '#a855f7' }) + '<path d="M 60 116 q -8 -6 0 -12 M 50 120 q -12 -8 0 -18 M 132 116 q 8 -6 0 -12 M 142 120 q 12 -8 0 -18" stroke="#a855f7" stroke-width="2" fill="none"/>' + L(96, 28, 10, 'සර සර හඬ', '#7f1d1d', 900)],
      [false, 'room', mirror(140, 74, 50, 90) + E(140, 74, 28, '😍') + R({ x: 70, y: CY, s: CS, face: 'joy', armR: 'head', top: '#f0abfc', topLine: '#c026d3' }) + A.sparkle([[170, 40, 1]])],
      [false, 'road', R({ x: 96, y: 128, s: CS, pose: 'walk', face: 'sly', armL: 'hip', armR: 'head', top: '#f0abfc', topLine: '#c026d3' }) + E(96, 48, 18, '😎') + E(40, 60, 16, '💅') + E(150, 60, 16, '✨')]
    ]);
  };

  S[31] = function () {
    return grid([
      [false, 'yard', A.cow(70, 128, 0.7, {}) + A.cow(140, 124, 0.6, {}) + dust(30, 120, 0.5) + E(170, 40, 18, '🏁') + L(96, 24, 10, 'ගොන් රේස්', '#7f1d1d', 900)],
      [false, 'yard', E(60, 100, 34, '🐓') + '<g transform="translate(140 100) scale(-1 1)">' + E(0, 0, 34, '🐓') + '</g>' + A.anger(100, 70, 1) + L(96, 24, 10, 'කුකුළු පොර', '#7f1d1d', 900)],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + E(60, 70, 34, '🎰') + E(120, 76, 30, '🎟️') + E(160, 60, 22, '💸') + L(96, 124, 10, 'ලොතරැයි සූදු', '#7f1d1d', 900)],
      [false, 'yard', R({ x: 60, y: CY, s: CS, face: 'sly', armR: 'out' }) + A.friend({ x: 140, y: CY, s: 0.56, face: 'cry', armL: 'eyes', armR: 'eyes' }) + A.ball(100, 120, 8) + L(100, 24, 10, 'වංචා සෙල්ලම්', '#7f1d1d', 900)]
    ]);
  };

  S[32] = function () {
    return grid([
      [false, 'path', thorn(70, 122, 1.2) + thorn(130, 128, 1) + R({ x: 40, y: 110, s: 0.4, face: 'sly' }) + G(32, { x: 160, y: 128, s: 0.46, face: 'cry', pose: 'stand' }) + E(150, 84, 14, '💢')],
      [false, 'yard', A.fence(0, 120, 80) + A.fence(116, 120, 80) + '<path d="M 86 120 l 4 -26 l 4 26 M 98 120 l 4 -26 l 4 26" fill="#57534e" stroke="#1c1917" stroke-width="1"/>' + E(100, 60, 18, '⚠️') + L(100, 134, 10, 'උල්', '#7f1d1d', 900)],
      [false, 'garden', '<circle cx="110" cy="118" r="16" fill="none" stroke="#713f12" stroke-width="3"/><path d="M 126 118 q 30 -10 40 -50" stroke="#713f12" stroke-width="2" fill="none"/>' + A.bird(60, 120, 0.9, { color: '#fbbf24' }) + E(60, 84, 16, '😨') + L(130, 30, 10, 'මදු', '#7f1d1d', 900)],
      [true, 'path', T(32, { x: 70, y: CY, s: CS, pose: 'kneel', face: 'joy', armR: 'give' }) + thorn(112, 120, 0.8) + A.bin(160, 132, 0.7) + A.dog(130, 96, 0.4) + A.hearts([[100, 50, 0.9]])]
    ]);
  };

  S[33] = function () {
    return grid([
      [false, 'river', R({ x: 50, y: 74, s: 0.46, face: 'sly', armR: 'out' }) + '<path d="M 70 46 L 120 20 M 120 20 v 66" stroke="#57534e" stroke-width="1.6" fill="none"/><path d="M 120 86 q 0 6 -5 5" stroke="#57534e" stroke-width="1.6" fill="none"/>' + A.water(0, 72, 193, 72) + fish(124, 100, 1, { sad: true }) + E(140, 84, 12, '😢')],
      [false, 'plain', '<rect width="193" height="144" fill="#86d36b"/><ellipse cx="96" cy="96" rx="76" ry="32" fill="#92400e"/><ellipse cx="96" cy="92" rx="66" ry="24" fill="#a16207"/>' + R({ x: 96, y: 104, s: 0.5, face: 'joy', armL: 'up', armR: 'up' }) + splash(96, 96, 0.8) + fish(150, 100, 0.7, { sad: true, color: '#94a3b8' }) + L(96, 22, 10, 'බොර කරනවා', '#7f1d1d', 900)],
      [false, 'garden', A.anthill(120, 132, 1.2) + R({ x: 56, y: CY, s: CS, face: 'sly', armR: 'give', holdR: A.hoe(6, 10, 0.5, 40) }) + E(150, 60, 16, '🐜') + E(166, 84, 14, '🐜')],
      [true, 'river', A.water(0, 72, 193, 72) + fish(60, 100, 1) + fish(130, 110, 0.9, { flip: true, color: '#f472b6' }) + T(33, { x: 150, y: 70, s: 0.44, face: 'joy', armL: 'out' }) + A.hearts([[96, 60, 0.9]])]
    ]);
  };

  S[34] = function () {
    return grid([
      [true, 'temple', A.monk({ x: 140, y: CY, s: 0.56, face: 'calm', armL: 'out' }) + G(34, { x: 66, y: CY, s: CS, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + E(104, 50, 18, '👂')],
      [true, 'path', A.teacher({ x: 140, y: CY, s: 0.56, face: 'joy' }) + T(34, { x: 70, y: CY, s: CS, face: 'joy', armL: 'worship', armR: 'worship' }) + A.hearts([[104, 50, 0.8]])],
      [true, 'road', A.grandpa({ x: 140, y: 128, s: 0.56, face: 'joy', armL: 'wave' }) + G(34, { x: 70, y: 128, s: CS, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' })],
      [true, 'yard', R({ x: 140, y: CY, s: 0.56, face: 'shout', armL: 'point' }) + bad(130, 30, 'බොල!', { w: 66, tail: 'right' }) + T(34, { x: 60, y: CY, s: CS, face: 'calm', armL: 'worship', armR: 'worship' }) + E(60, 40, 18, '😌')]
    ]);
  };

  S[35] = function () {
    return split(
      ['yard', R({ x: 60, y: PY, s: 0.88, face: 'joy', armL: 'hip', armR: 'up', top: '#a855f7', topLine: '#7e22ce' }) +
        A.bubble(90, 80, 130, 56, E(-40, 0, 22, '👑') + E(-10, 0, 22, '🏰') + L(30, 0, 11, 'මගේ පරපුර', '#991b1b', 900), { fill: '#fee2e2', stroke: '#fca5a5' }) +
        A.friend({ x: 140, y: PY, s: 0.76, face: 'sad' }) + A.zzz(150, 170, 0.6) + E(176, 200, 16, '🙄')],
      ['yard', A.sun(40, 40, 16) + G(35, { x: 56, y: PY, s: 0.88, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.grandpa({ x: 144, y: PY, s: 0.76, face: 'joy', armL: 'worship', armR: 'worship' }) +
        '<path d="M 80 130 q 20 -16 44 0 m -8 -8 l 8 8 l -10 3" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M 124 150 q -20 16 -44 0 m 8 8 l -8 -8 l 10 -3" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>' + L(102, 106, 11, 'ගෞරවය', '#166534', 900)]
    );
  };

  S[36] = function () {
    return grid([
      [false, 'room', R({ x: 96, y: 130, s: CS + 0.04, pose: 'sitFloor', face: 'tired', armR: 'low', holdR: E(8, 4, 20, '🎮') }) + A.clock(40, 40, 14, 8, 0) + A.clock(150, 40, 14, 8, 0) + L(96, 30, 10, 'දවසම එකම දේ', '#7f1d1d', 900)],
      [true, 'plain', wallBg(193, 144, '#ecfdf5', '#d1fae5') + E(40, 60, 26, '📖') + E(96, 60, 26, '⚽') + E(152, 60, 26, '🧹') + E(68, 108, 26, '🎨') + E(124, 108, 26, '🌱')],
      [true, 'room', T(36, { x: 60, y: CY, s: CS, face: 'happy', armR: 'mouth' }) + A.think(126, 50, 104, 66, '<rect x="-30" y="-24" width="60" height="48" rx="4" fill="#fffdf5" stroke="#cbd5e1"/><path d="M -22 -12 h 6 M -22 0 h 6 M -22 12 h 6" stroke="#16a34a" stroke-width="3"/><path d="M -10 -12 h 34 M -10 0 h 34 M -10 12 h 34" stroke="#94a3b8" stroke-width="2"/>', { tail: 'left' })],
      [false, 'yard', '<ellipse cx="110" cy="70" rx="46" ry="36" fill="#78716c"/>' + L(110, 52, 11, 'බර වැඩියි', '#fff', 900) + R({ x: 100, y: CY, s: CS, face: 'tired', armL: 'up', armR: 'up' }) + A.sweat(50, 70) + A.sweat(160, 90)]
    ]);
  };

  S[37] = function () {
    return grid([
      [true, 'path', R({ x: 150, y: CY, s: 0.54, face: 'sly', armL: 'wave' }) + E(150, 40, 16, '🚬') + G(37, { x: 60, y: CY, s: CS, pose: 'walk', face: 'calm', flip: true }) + '<path d="M 100 100 h -24 m 8 -7 l -8 7 l 8 7" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'],
      [true, 'path', A.friend({ x: 140, y: CY, s: 0.58, face: 'joy', armL: 'wave' }) + T(37, { x: 66, y: CY, s: CS, face: 'joy', armR: 'wave' }) + A.hearts([[104, 50, 0.9]])],
      [true, 'temple', A.monk({ x: 140, y: CY, s: 0.56, face: 'calm', armL: 'out' }) + G(37, { x: 66, y: CY, s: CS, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + E(104, 50, 18, '📜')],
      [false, 'room', uncle({ x: 40, y: CY, s: 0.54, face: 'sad' }) + aunty({ x: 160, y: CY, s: 0.52, face: 'sad' }) + R({ x: 100, y: 116, s: 0.56, pose: 'run', face: 'shout', armL: 'up', armR: 'up' }) + bad(100, 26, 'මම කියන්නම්!', { w: 110, size: 11 })]
    ]);
  };

  S[38] = function () {
    function sc(inner, txt) { return A.chair(150, 132, 0.9, { h: 26, flip: true }) + A.monk({ x: 152, y: 132, s: 0.54, pose: 'sit', flip: true, face: 'sad' }) + inner + L(104, 22, 10, txt, '#7f1d1d', 900); }
    return grid([
      [false, 'temple', sc(R({ x: 60, y: CY, s: CS, face: 'shout' }) + '<path d="M 76 84 q 16 6 22 40" stroke="#7dd3fc" stroke-width="3" fill="none" stroke-dasharray="3 5"/><ellipse cx="100" cy="130" rx="10" ry="3" fill="#a3e635"/>', 'කෙළ ගසනවා')],
      [false, 'temple', sc(R({ x: 40, y: 132, s: CS, pose: 'sit', face: 'sly', armL: 'head', armR: 'head' }) + '<path d="M 60 116 h 40" stroke="#e8a877" stroke-width="6" stroke-linecap="round"/>', 'පා දිගු කරනවා')],
      [false, 'temple', sc(R({ x: 60, y: CY, s: CS, face: 'shout', armL: 'up', armR: 'up' }) + E(60, 50, 16, '🥱'), 'ඈනුම් අරිනවා')],
      [false, 'temple', sc(R({ x: 60, y: CY, s: CS, face: 'sly', armR: 'head' }) + '<path d="M 76 62 l 6 -6 M 80 68 l 8 -4" stroke="#57534e" stroke-width="1.6"/>', 'හිස කසනවා')]
    ]);
  };

  S[39] = function () {
    return split(
      ['yard', R({ x: 30, y: PY, s: 0.7, face: 'sly', armR: 'mouth' }) + R({ x: 96, y: PY, s: 0.72, face: 'wow', top: '#d6d3d1', armR: 'mouth' }) + A.friend({ x: 162, y: PY, s: 0.7, face: 'wow', top: '#e7e5e4', topLine: '#a8a29e', bottom: '#78716c' }) +
        A.bubble(40, 130, 56, 30, E(0, 1, 16, '🐜'), { fill: '#fee2e2', stroke: '#fca5a5' }) + A.bubble(104, 100, 60, 34, E(0, 1, 20, '🐕'), { fill: '#fee2e2', stroke: '#fca5a5' }) + A.bubble(150, 60, 70, 40, E(0, 1, 26, '🐘'), { fill: '#fee2e2', stroke: '#fca5a5', tail: 'right' })],
      ['yard', A.sun(160, 40, 16) + T(39, { x: 80, y: PY, s: PS, face: 'happy', armR: 'up', holdR: E(2, -12, 26, '🔍') }) + A.bubble(130, 110, 80, 40, E(-16, 1, 20, '🐜') + A.badge(18, 0, 12, true)) + good(70, 60, 'සොයා බලමු', { w: 104 })]
    );
  };

  S[40] = function () {
    return grid([
      [false, 'gloom', A.house(60, 124, 0.7, { wall: '#a8a29e', roof: '#57534e' }) + '<path d="M 40 80 l 14 20 l -8 6 l 12 14" stroke="#1c1917" stroke-width="2" fill="none"/>' + '<g transform="rotate(24 150 130)">' + A.tree(150, 130, 0.7) + '</g>' + E(110, 40, 18, '⚠️') + L(110, 134, 10, 'දිරූ ගෙවල් ගස්', '#7f1d1d', 900)],
      [false, 'gloom', '<ellipse cx="96" cy="112" rx="40" ry="14" fill="#1c1917"/><path d="M 56 112 v -22 q 40 -18 80 0 v 22" fill="#78716c" stroke="#57534e" stroke-width="2"/><ellipse cx="96" cy="90" rx="40" ry="12" fill="#1c1917"/>' + E(150, 50, 18, '⚠️') + R({ x: 30, y: CY, s: 0.5, face: 'wow' }) + L(96, 28, 10, 'පාළු ළිං', '#7f1d1d', 900)],
      [false, 'road', A.sun(150, 40, 20) + R({ x: 80, y: 128, s: CS, pose: 'walk', face: 'tired' }) + A.sweat(110, 70) + L(84, 24, 10, 'තනිව මද්දහනේ', '#7f1d1d', 900)],
      [true, 'path', A.mother({ x: 120, y: CY, s: CS, face: 'joy', armL: { e: [-24, -66], h: [-34, -56] } }) + G(40, { x: 70, y: CY, s: CS, pose: 'walk', face: 'joy', armR: { e: [22, -56], h: [30, -60] } }) + A.hearts([[96, 40, 0.9]])]
    ]);
  };

  S[41] = function () {
    return split(
      ['road', A.bush(60, 224, 2) + A.ban(60, 150, 26, E(0, 1, 24, '🚶')) + L(60, 96, 11, 'මඟ අයිනේ', '#7f1d1d', 900) + E(140, 260, 20, '😳') + E(160, 200, 16, '👀') + flies(100, 200)],
      ['yard', A.sun(160, 40, 16) + loo(60, 250, 1.1) + A.tap(130, 262, 0.9) + A.basin(144, 270, 0.85) + T(41, { x: 150, y: 224, s: 0.5, face: 'joy', armL: 'low' }) + E(110, 190, 20, '🧼') + A.sparkle([[170, 150, 1.2]])]
    );
  };

  S[42] = function () {
    return grid([
      [true, 'room', G(42, { x: 60, y: CY, s: CS, face: 'joy', armR: 'give', holdR: A.plate(8, 0, 0.8) }) + A.grandpa({ x: 140, y: CY, s: 0.56, face: 'joy', armL: 'out' }) + A.hearts([[100, 40, 0.9]])],
      [true, 'room', A.table(96, 134, 0.8, 70) + '<ellipse cx="96" cy="96" rx="40" ry="6" fill="#fde68a" stroke="#ca8a04"/>' + A.plate(96, 94, 1.4) + A.cup(150, 98, 1) + A.sparkle([[50, 60, 1.2], [140, 50, 1]]) + L(96, 28, 10, 'නිසි බඳුනක', '#166534', 900)],
      [false, 'room', A.table(120, 134, 0.8, 50) + A.plate(120, 98, 1) + R({ x: 50, y: CY, s: CS, face: 'shout' }) + '<path d="M 66 84 q 16 6 22 34" stroke="#7dd3fc" stroke-width="3" fill="none" stroke-dasharray="3 5"/>' + E(160, 50, 16, '🤢')],
      [false, 'room', A.table(120, 134, 0.8, 50) + A.plate(120, 98, 1) + R({ x: 50, y: CY, s: CS, face: 'shout', armL: 'up', armR: 'up' }) + A.anger(86, 50, 0.9) + E(160, 50, 16, '📢')]
    ]);
  };

  S[43] = function () { return harm(43, E(0, 2, 56, '🚬'), [['💔', 'හදවත විස වෙයි'], ['😷', 'කට ගඳ'], ['🧠', 'නුවණ අඩු වෙයි'], ['⏳', 'ආයුෂ කෙටි වෙයි']], function (o) { return T(43, o); }); };
  S[44] = function () { return harm(44, E(0, 2, 50, '🍂') + L(0, 40, 11, 'දුම්කොළ', '#7f1d1d', 900), [['🦷', 'දත් මුල් කුණු වෙයි'], ['😷', 'කට ගඳ'], ['👅', 'රස නොදැනෙයි'], ['😵', 'සිහිය මඳ වෙයි']], function (o) { return G(44, o); }); };
  S[45] = function () { return harm(45, A.betel(0, 26, 1.4), [['🦷', 'දත් කැත වෙයි'], ['🗣️', 'හඬ අමිහිරි වෙයි'], ['👕', 'ඇඳුම් කැත වෙයි'], ['⏰', 'කාලය නැති වෙයි']], function (o) { return T(45, o); }); };
  S[46] = function () { return harm(46, bottle(0, 28, 1.4), [['🩸', 'ලේ කෝප වෙයි'], ['😵‍💫', 'සිහි විකල් වෙයි'], ['👁️', 'ඇස් ලෙඩ'], ['💸', 'දුප්පත් වෙයි']], function (o) { return G(46, o); }); };

  S[47] = function () {
    return split(
      ['river', R({ x: 96, y: 222, s: 0.84, face: 'joy', armL: { e: [-30, -66], h: [-52, -70] }, armR: { e: [30, -66], h: [52, -70] } }) + '<path d="M 44 150 h 104 m -8 -6 l 8 6 l -8 6 M 44 150 l 8 -6 m -8 6 l 8 6" stroke="#dc2626" stroke-width="2.5" fill="none"/>' +
        bad(96, 80, 'මෙච්චර ලොකුයි!', { w: 120 }) + fish(150, 250, 0.6, { color: '#94a3b8' }) + L(150, 272, 9, 'ඇත්ත', '#fff', 900)],
      ['river', A.sun(40, 40, 16) + G(47, { x: 96, y: 222, s: 0.84, face: 'joy', armR: 'give', holdR: fish(10, -2, 0.6) }) + good(100, 90, 'මෙච්චරයි', { w: 90 }) + A.badge(160, 150, 13, true) + E(40, 130, 22, '💎')]
    );
  };

  S[48] = function () {
    return split(
      ['gloom', R({ x: 60, y: PY, s: 0.88, face: 'greedy', armR: 'give', holdR: E(10, -2, 26, '🍖') }) + A.cow(140, 250, 0.6, {}) + E(150, 196, 18, '😢') + A.bird(150, 150, 0.8, { color: '#94a3b8', flip: true }) + E(40, 120, 18, '💔')],
      ['garden', A.sun(160, 40, 16) + A.tree(30, 236, 0.9, { fruit: '#ef4444' }) + T(48, { x: 84, y: PY, s: 0.88, face: 'joy', armR: 'give', holdR: E(10, 4, 28, '🧺') }) + E(120, 200, 18, '🍌') + E(140, 224, 18, '🥭') + E(116, 236, 16, '🍎') +
        A.cow(150, 276, 0.5, {}) + A.bird(160, 150, 0.8, { color: '#fbbf24', flip: true }) + A.hearts([[130, 120, 1]])]
    );
  };

  S[49] = function () {
    return split(
      ['night', A.moon(160, 40, 12) + farmer({ x: 50, y: PY, s: 0.72, face: 'sleep' }) + A.zzz(70, 140, 0.7) + E(110, 262, 30, '🌾') +
        R({ x: 150, y: PY, s: 0.8, pose: 'walk', face: 'sly', armL: 'low', flip: false }) + E(120, 226, 22, '👀') + '<path d="M 140 230 q -14 10 -24 26" stroke="#dc2626" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/>'],
      ['garden', A.sun(160, 40, 18) + farmer({ x: 50, y: PY, s: 0.74, face: 'joy', armR: 'give', holdR: A.hoe(4, 0, 0.6, 10) }) + A.sweat(80, 130) + E(30, 270, 22, '🌾') +
        G(49, { x: 130, y: PY, s: 0.86, face: 'joy', armL: 'give', holdL: A.cup(-6, 0, 1.1) }) + good(110, 100, 'මහන්සියි නේද?', { w: 116, size: 11 }) + A.hearts([[90, 160, 0.9]])]
    );
  };

  S[50] = function () {
    return split(
      ['gloom', A.ban(96, 130, 64, bottle(0, 34, 1.7)) + R({ x: 40, y: 280, s: 0.56, face: 'tired' }) + E(160, 250, 22, '😵')],
      ['garden', A.sun(160, 40, 16) + A.pot(140, 266, 1.4) + T(50, { x: 70, y: PY, s: 0.9, face: 'joy', armR: 'mouth', holdR: A.cup(4, 4, 1.3) }) + E(140, 190, 24, '💧') + good(80, 90, 'පිරිසිදු වතුර', { w: 110 }) + A.sparkle([[30, 170, 1.2]])]
    );
  };

  S[51] = function () {
    return split(
      ['gloom', A.table(96, 250, 1, 70) + E(70, 196, 26, '🎲') + E(116, 196, 26, '🃏') + R({ x: 40, y: 280, s: 0.6, face: 'cry', armL: 'eyes', armR: 'eyes' }) + uncle({ x: 150, y: 280, s: 0.56, face: 'sly', top: '#a8a29e', topLine: '#78716c', bottom: '#44403c' }) +
        E(150, 150, 22, '💸') + A.house(96, 120, 0.5, { wall: '#d6d3d1', roof: '#78716c' }) + A.ban(96, 100, 22, '')],
      ['room', E(140, 236, 50, '🐷') + coin(140, 196, 9) + '<path d="M 140 206 v 10" stroke="#ca8a04" stroke-width="2" stroke-dasharray="3 3"/>' + G(51, { x: 60, y: PY, s: 0.9, face: 'joy', armR: 'give', holdR: coin(8, 0, 8) }) +
        good(80, 100, 'ඉතිරි කරමු', { w: 100 }) + A.sparkle([[170, 180, 1.2]])]
    );
  };

  S[52] = function () {
    return split(
      ['temple', A.stupa(150, 232, 0.6) + A.person({ x: 76, y: PY, s: PS, hair: 'messy', top: '#fff', topLine: '#cbd5e1', bottom: '#db2777', wear: 'skirt', face: 'sad' }) +
        '<path d="M 50 150 q -14 30 -6 60 M 58 156 q -8 30 0 56 M 102 150 q 14 30 6 60 M 94 156 q 8 30 0 56" stroke="#2a1a12" stroke-width="5" fill="none" stroke-linecap="round"/>' + E(140, 140, 18, '😮')],
      ['temple', A.sun(40, 40, 16) + A.stupa(150, 232, 0.6) + G(52, { x: 76, y: PY, s: PS, face: 'joy', armL: 'worship', armR: 'worship' }) + A.lotus(76, 196, 0.5) + A.sparkle([[30, 150, 1.2], [120, 130, 1.1]])]
    );
  };

  S[53] = function () {
    return split(
      ['yard', A.teacher({ x: 140, y: PY, s: 0.74, face: 'sad' }) + R({ x: 60, y: PY, s: 0.88, face: 'sly', armR: 'give', holdR: E(14, -6, 28, '🔍') }) + '<circle cx="134" cy="200" r="4" fill="#1c1917"/>' +
        bad(70, 90, 'අන්න හිලක්!', { w: 104 }) + E(30, 150, 18, '😒')],
      ['yard', A.sun(40, 40, 16) + A.teacher({ x: 140, y: PY, s: 0.74, face: 'joy', halo: true }) + T(53, { x: 60, y: PY, s: 0.9, face: 'joy', armL: 'up', armR: 'up' }) + E(60, 130, 22, '👏') + good(80, 80, 'හරි හොඳයි!', { w: 100 }) + A.hearts([[104, 150, 1]])]
    );
  };

  S[54] = function () {
    return split(
      ['temple', A.monk({ x: 140, y: PY, s: 0.76, face: 'sad' }) + R({ x: 56, y: PY, s: 0.88, face: 'shout', armR: 'point', armL: 'hip' }) + A.bubble(70, 86, 100, 40, E(-24, 1, 18, '🤬') + E(4, 1, 18, '👎') + E(30, 1, 18, '💢'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['temple', A.sun(40, 40, 16) + A.monk({ x: 140, y: PY, s: 0.76, face: 'joy', halo: true, armL: 'out' }) + G(54, { x: 60, y: PY, s: 0.88, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(100, 270, 0.4) + A.hearts([[100, 140, 1]])]
    );
  };

  S[55] = function () {
    return split(
      ['yard', A.friend({ x: 30, y: PY, s: 0.7, face: 'joy' }) + R({ x: 96, y: PY, s: 0.84, face: 'joy', armL: 'out', armR: 'mouth' }) + E(96, 150, 24, '🎭') +
        good(40, 110, 'ඔයා හොඳයි', { w: 96, size: 11 }) + aunty({ x: 164, y: PY, s: 0.62, face: 'wow' }) + bad(150, 60, 'එයා නරකයි', { w: 100, size: 11, tail: 'right' })],
      ['yard', A.sun(160, 40, 16) + T(55, { x: 60, y: PY, s: 0.88, face: 'happy', armR: 'up', holdR: E(2, -12, 24, '🔍') }) + A.think(70, 90, 110, 44, E(-24, 0, 20, '🎭') + L(16, 0, 11, 'පරිස්සම්', '#3b2a1e', 900), { tail: 'left' }) +
        G(55, { x: 140, y: PY, s: 0.8, face: 'joy', armL: 'wave' }) + A.hearts([[104, 170, 0.9]])]
    );
  };

  S[56] = function () {
    return split(
      ['room', A.table(110, PY, 1, 56) + A.plate(110, 212, 1.3) + aunty({ x: 160, y: PY, s: 0.7, face: 'sad' }) + R({ x: 46, y: PY, s: 0.84, face: 'sad', armR: 'point' }) + bad(70, 100, 'ලුණු මදි! රස නෑ!', { w: 124, size: 11 })],
      ['room', A.table(110, PY, 1, 56) + A.plate(110, 212, 1.3) + aunty({ x: 160, y: PY, s: 0.7, face: 'joy' }) + G(56, { x: 46, y: PY, s: 0.84, face: 'joy', armL: 'worship', armR: 'worship' }) + good(70, 100, 'රසයි! ස්තුතියි!', { w: 116, size: 11 }) + A.hearts([[130, 130, 1]])]
    );
  };

  S[57] = function () {
    return split(
      ['yard', A.steps(60, 270, 4, 30, 30, ['#d6d3d1', '#a8a29e', '#d6d3d1', '#a8a29e']) + R({ x: 164, y: 150, s: 0.56, face: 'sly', armL: 'hip', armR: 'hip', top: '#a855f7', topLine: '#7e22ce' }) + E(164, 80, 20, '👑') +
        A.teacher({ x: 30, y: 270, s: 0.6, face: 'sad', armR: 'up' }) + E(100, 120, 18, '🙄')],
      ['yard', A.sun(160, 40, 16) + A.teacher({ x: 140, y: PY, s: 0.74, face: 'joy', halo: true }) + T(57, { x: 60, y: PY, s: 0.9, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) +
        A.think(70, 90, 120, 50, E(-30, 0, 24, '👀') + A.heart(8, 0, 1) + L(36, 0, 10, 'ඇස් දෙක', '#3b2a1e', 900), { tail: 'left' }) + A.hearts([[104, 160, 0.9]])]
    );
  };

  S[58] = function () {
    function gap() { return '<rect x="0" y="234" width="70" height="58" fill="#a16207"/><rect x="130" y="234" width="62" height="58" fill="#a16207"/><rect x="70" y="250" width="60" height="42" fill="#1c1917"/>'; }
    return split(
      ['gloom', gap() + A.friend({ x: 24, y: 236, s: 0.6, face: 'sad', armR: 'out' }) + bad(50, 120, 'යන්න එපා!', { w: 96, size: 11 }) + R({ x: 86, y: 240, s: 0.7, pose: 'run', face: 'joy', rot: 16 }) + E(100, 270, 16, '💥') +
        R({ x: 166, y: 236, s: 0.5, face: 'joy', top: '#44403c' }) + haha(140, 170, { tail: 'right' })],
      ['path', A.sun(160, 40, 16) + A.friend({ x: 40, y: PY, s: 0.76, face: 'joy', armR: 'out' }) + good(60, 110, 'පරිස්සමෙන්!', { w: 100, size: 11 }) + G(58, { x: 120, y: PY, s: 0.84, face: 'joy', armL: 'worship', armR: 'worship' }) + E(96, 160, 20, '👂') + A.hearts([[150, 140, 0.9]])]
    );
  };

  S[59] = function () {
    return single('room',
      A.rays(200, 130, 220, '#fff1b8') + A.lamp(200, 276, 1) +
      A.mother({ x: 120, y: 250, s: 0.98, face: 'joy', halo: true }) + A.father({ x: 190, y: 250, s: 0.98, face: 'joy', halo: true }) + A.teacher({ x: 270, y: 250, s: 0.98, face: 'joy', halo: true }) +
      T(59, { x: 50, y: 278, s: 0.9, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + G(59, { x: 346, y: 278, s: 0.88, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship', flip: true }) +
      good(200, 40, 'දුටු දෙවියෝ', { w: 110 }) + A.hearts([[80, 150, 1], [320, 150, 1]]) + A.lotus(130, 286, 0.5) + A.lotus(270, 286, 0.5));
  };

  S[60] = function () {
    return single('temple',
      A.sun(60, 46, 20) + A.boTree(360, 232, 0.7) +
      A.mother({ x: 40, y: 236, s: 0.74, face: 'joy' }) + A.father({ x: 92, y: 236, s: 0.74, face: 'joy' }) + A.teacher({ x: 146, y: 236, s: 0.74, face: 'joy' }) + A.grandpa({ x: 200, y: 236, s: 0.76, face: 'joy' }) + A.grandma({ x: 250, y: 236, s: 0.76, face: 'joy' }) + A.monk({ x: 306, y: 236, s: 0.74, face: 'calm' }) +
      A.chair(60, 292, 0.9, { h: 18 }) + A.chair(330, 292, 0.9, { h: 18, flip: true }) +
      T(60, { x: 130, y: 292, s: 0.78, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + G(60, { x: 200, y: 292, s: 0.74, face: 'calm', armL: 'worship', armR: 'worship' }) + A.friend({ x: 266, y: 292, s: 0.74, face: 'calm', armL: 'worship', armR: 'worship' }) +
      A.hearts([[120, 100, 1], [260, 100, 1]]) + '<path d="M 96 270 v -18 m -6 7 l 6 -7 l 6 7 M 300 270 v -18 m -6 7 l 6 -7 l 6 7" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');
  };

  S[61] = function () {
    return single('garden',
      A.rays(340, 80, 130, '#fff1b8') + A.sun(340, 60, 26) + A.cloud(120, 50, 0.8) +
      A.steps(150, 286, 4, 56, 34, ['#fca5a5', '#fde047', '#86efac', '#7dd3fc']) + L(178, 269, 11, 'ඇසීම', '#3b2a1e', 900) + L(234, 235, 11, 'පිළිපැදීම', '#3b2a1e', 900) + L(290, 201, 11, 'හොඳ හැසිරීම', '#3b2a1e', 900) + L(352, 167, 11, 'සැපත', '#3b2a1e', 900) +
      A.teacher({ x: 70, y: 280, s: 0.92, face: 'joy', armR: 'point' }) + A.bubble(110, 130, 110, 40, E(-34, 1, 18, '📜') + L(14, 0, 12, 'ගුරු වදන', '#7c2d12', 900), { fill: '#fef9c3', stroke: '#fde047' }) +
      G(61, { x: 236, y: 218, s: 0.66, pose: 'walk', face: 'joy' }) + T(61, { x: 346, y: 150, s: 0.7, face: 'joy', armL: 'up', armR: 'up' }) + E(346, 40, 24, '🏆'));
  };

  S[62] = function () {
    return single('temple',
      A.rays(200, 160, 260, '#fff1b8', 18) + A.stupa(50, 230, 0.6) + A.boTree(360, 234, 0.6) +
      A.garlandArc(16, 384, 14, 16, 14) + A.garlandArc(40, 360, 40, 16, 12) + A.garlandArc(70, 330, 66, 14, 10) + A.confetti(400, 300, 30) +
      '<g class="floaty">' + E(110, 120, 26, '🕊️') + '</g><g class="floaty">' + E(290, 120, 26, '🕊️') + '</g>' +
      A.person({ x: 40, y: 276, s: 0.66, face: 'joy', hair: 'neat', top: '#fde68a', topLine: '#f59e0b', bottom: '#b45309', armL: 'up', armR: 'up' }) + A.girl({ x: 362, y: 276, s: 0.66, face: 'joy', bottom: '#7c3aed', armL: 'up', armR: 'up' }) +
      A.friend({ x: 100, y: 272, s: 0.86, face: 'joy', armR: { e: [28, -52], h: [44, -50] }, armL: 'up' }) + R({ x: 300, y: 272, s: 0.86, face: 'joy', armL: { e: [-28, -52], h: [-44, -50] }, armR: 'up', top: '#fdba74', topLine: '#fb923c', bottom: '#7c5a3a', blush: true }) +
      A.lotus(200, 292, 1) + G(62, { x: 244, y: 272, s: 1.06, face: 'joy', armL: { e: [-26, -56], h: [-40, -60] }, armR: 'up' }) + T(62, { x: 156, y: 272, s: 1.12, face: 'joy', armR: { e: [26, -56], h: [40, -60] }, armL: 'up' }) +
      E(156, 126, 24, '👑') + E(244, 132, 22, '👑') + A.heart(200, 180, 1.4, '#fb7185') + good(200, 96, 'සමාව · මෛත්‍රිය', { w: 130 }));
  };

  global.Scenes.register(3, S, look);
})(window);
