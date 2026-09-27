/* සිරිත් මල්දම — one picture for every poem.
   split(bad, good)  : left panel shows what NOT to do, right panel shows the good way.
   grid([...])       : four small pictures (steps 1-4, or a list of do / don't).
   single(bg, art)   : one big picture. */
(function (global) {
  'use strict';
  var A = global.Art;
  var T = A.taraka, R = A.rascal, E = A.emoji, L = A.label;
  var single = A.single, split = A.split, grid = A.grid;

  /* feet line + sizes */
  var SY = 258, PY = 256, PS = 0.92, CY = 131, CS = 0.6;

  function say(x, y, txt, o) {
    o = o || {};
    var w = o.w || Math.max(50, txt.length * 8.5 + 22);
    return A.bubble(x, y, w, o.h || 30, L(0, 0, o.size || 13, txt, o.color || '#3b2a1e'), o);
  }
  function sayE(x, y, em, o) {
    o = o || {};
    return A.bubble(x, y, o.w || 58, o.h || 34, E(0, 1, o.size || 19, em), o);
  }
  function dust(x, y, s) {
    return A.at(x, y, s || 1, '<g opacity=".8"><circle cx="-14" cy="0" r="12" fill="#d6d3d1"/><circle cx="6" cy="-8" r="15" fill="#e7e5e4"/><circle cx="20" cy="4" r="11" fill="#d6d3d1"/></g>' + A.anger(-6, -22, 1) + A.anger(18, -16, 0.8) + A.stars([[-22, -14, 1.2], [28, -2, 1]], '#f59e0b'));
  }
  function splash(x, y, s) {
    return A.at(x, y, s || 1, '<path d="M -20 0 q -6 -18 -14 -22 M -8 -2 q -2 -22 -6 -30 M 8 -2 q 2 -22 6 -30 M 20 0 q 6 -18 14 -22" stroke="#bae6fd" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="-26" cy="-26" r="3" fill="#bae6fd"/><circle cx="26" cy="-26" r="3" fill="#bae6fd"/><circle cx="0" cy="-36" r="3.5" fill="#bae6fd"/>');
  }
  function flies(x, y) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="flutter"><ellipse cx="-3" cy="-3" rx="4" ry="2.4" fill="#e5e7eb" stroke="#9ca3af" stroke-width=".6" transform="rotate(-30)"/><ellipse cx="3" cy="-3" rx="4" ry="2.4" fill="#e5e7eb" stroke="#9ca3af" stroke-width=".6" transform="rotate(30)"/><ellipse cx="0" cy="0" rx="2.4" ry="3.6" fill="#1f2937"/></g></g>' + '<path d="M ' + (x - 14) + ' ' + (y + 12) + ' q 4 -6 8 0 t 8 0" stroke="#78716c" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>';
  }
  function stink(x, y) {
    return '<path d="M ' + x + ' ' + y + ' q -6 -8 0 -16 q 6 -8 0 -16 M ' + (x + 12) + ' ' + (y + 2) + ' q -6 -8 0 -16 q 6 -8 0 -16" stroke="#84cc16" stroke-width="2.4" fill="none" stroke-linecap="round" class="steam"/>';
  }
  function wallBg(w, h, col, floor) {
    return '<rect width="' + w + '" height="' + h + '" fill="' + (col || '#fdf6e3') + '"/><rect x="0" y="' + (h * 0.8) + '" width="' + w + '" height="' + (h * 0.2) + '" fill="' + (floor || '#d6c3a1') + '"/>';
  }
  function coin(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>' + L(x, y + 0.5, r * 1.1, 'රු', '#92400e'); }

  var S = {};

  /* 1 — the garland of good habits */
  S[1] = function () {
    return single('temple',
      A.rays(200, 160, 230, '#fff1b8') + A.stupa(70, 226, 0.95) + A.boTree(338, 228, 0.9) +
      A.garlandArc(24, 376, 22, 20, 13) + A.cloud(120, 78, 0.7) + A.cloud(292, 92, 0.6) +
      A.flower(30, 270, 1.1, '#f472b6') + A.flower(372, 272, 1.1, '#fbbf24') + A.flower(128, 284, 0.9, '#fb7185') + A.flower(280, 286, 0.9, '#c084fc') +
      T(1, { x: 200, y: 266, s: 1.12, armL: 'worship', armR: 'worship', face: 'joy' }) +
      A.openBook(200, 206, 1.45, { glow: true }) + A.sparkle([[150, 170, 1.6], [252, 160, 1.4], [226, 120, 1.2], [168, 124, 1]]));
  };

  /* 2 — a good heart */
  S[2] = function () {
    return split(
      ['gloom', A.cloud(96, 58, 1.25, '#6b7280') + A.rain(96, 78, 9) + E(96, 50, 20, '⚡') +
        A.think(122, 118, 62, 40, E(0, 0, 20, '😠'), { fill: '#e5e7eb' }) +
        R({ x: 84, y: PY, s: PS, face: 'angry', armL: 'hip', armR: 'hip' }) + A.anger(52, 142, 1)],
      ['garden', A.sun(150, 50, 22) + A.cloud(44, 62, 0.6) + A.flower(30, 268, 1) + A.flower(164, 270, 1, '#fbbf24') +
        A.hearts([[40, 150, 1], [156, 130, 1.2], [148, 190, 0.8]]) +
        T(2, { x: 96, y: PY, s: PS + 0.06, face: 'joy', armL: 'up', armR: 'up', glowHeart: true })]
    );
  };

  /* 3 — do good, life has meaning */
  S[3] = function () {
    return single('path',
      A.sun(340, 52, 24) + A.cloud(90, 60, 0.8) + A.tree(44, 232, 1.05) + A.house(338, 226, 0.7) + A.flower(120, 284, 1) + A.flower(286, 288, 1, '#fbbf24') +
      A.grandma({ x: 238, y: SY, s: 0.95, face: 'joy', armL: { e: [-30, -84], h: [-40, -70] }, holdR: '<path d="M 0 0 v 56" stroke="#8a5426" stroke-width="4" stroke-linecap="round"/>' }) +
      T(3, { x: 152, y: SY, s: 1.02, face: 'joy', armR: { e: [30, -62], h: [44, -66] }, armL: 'low', holdL: E(-4, 16, 30, '🧺') }) +
      A.hearts([[196, 118, 1.3], [270, 86, 1], [120, 110, 0.9]]) + A.sapling(72, 282, 0.8));
  };

  /* 4 — bad deeds bring sorrow, good deeds bring joy */
  S[4] = function () {
    return split(
      ['gloom', A.cloud(100, 56, 1.2, '#6b7280') + A.rain(100, 78, 8) + A.tree(150, 238, 0.95) + A.bird(150, 150, 1, { flip: true, color: '#94a3b8' }) +
        '<path d="M 92 150 q 20 -18 40 -8" stroke="#57534e" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>' + A.stone(128, 144, 5) +
        R({ x: 62, y: PY, s: PS, face: 'sly', armR: 'up', armL: 'hip' })],
      ['temple', A.sun(44, 50, 20) + A.stupa(132, 234, 0.8) + A.sparkle([[150, 110, 1.4], [30, 130, 1], [170, 170, 1]]) +
        T(4, { x: 66, y: PY, s: PS, face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(66, 190, 0.62) + A.lamp(168, 262, 0.8)]
    );
  };

  /* 5 — love all animals */
  S[5] = function () {
    return single('garden',
      A.sun(346, 50, 24) + A.cloud(96, 54, 0.8) + A.tree(52, 232, 1.1, { fruit: '#ef4444' }) + A.cow(320, 232, 0.75, { flip: true }) + A.bush(382, 250, 1) +
      A.cat(116, 266, 0.95) + T(5, { x: 190, y: SY, s: 1.08, face: 'joy', armR: 'low', armL: 'out' }) +
      A.bird(164, 183, 0.75, { flip: true, color: '#fff' }) + A.dog(262, 268, 1) + A.bird(130, 170, 0.8, { color: '#fbbf24' }) +
      A.butterfly(300, 130, 1) + A.butterfly(78, 120, 0.8, '#a78bfa') +
      A.hearts([[236, 176, 1.2], [126, 210, 0.9], [300, 196, 0.9], [210, 96, 1]]));
  };

  /* 6 — never hurt animals */
  S[6] = function () {
    return split(
      ['gloom', A.tree(168, 236, 0.8) + R({ x: 60, y: PY, s: PS, face: 'angry', armR: 'up', armL: 'hip' }) + A.stone(88, 140, 6) +
        '<path d="M 96 146 q 20 30 34 64" stroke="#57534e" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>' + A.dog(140, 262, 0.85, { sad: true, color: '#a8a29e' }) + E(150, 196, 18, '💔')],
      ['garden', A.sun(154, 46, 20) + T(6, { x: 58, y: PY, s: PS, pose: 'kneel', face: 'joy', armR: 'give', armL: 'down' }) +
        A.dog(138, 262, 0.9) + A.plate(104, 266, 0.8) + A.hearts([[108, 170, 1.1], [160, 190, 0.9], [60, 140, 0.8]])]
    );
  };

  /* 7 — do not steal */
  S[7] = function () {
    return split(
      ['room', A.windowFrame(140, 80, 56, 50) + A.table(130, PY, 0.95, 46) + A.purse(132, 214, 1.2) +
        R({ x: 58, y: PY, s: PS, face: 'sly', armR: { e: [34, -62], h: [56, -52] }, armL: 'hip' }) + E(40, 120, 18, '👀')],
      ['room', A.windowFrame(140, 80, 56, 50) + A.table(136, PY, 0.95, 46) + A.purse(138, 214, 1.2) + A.sparkle([[166, 190, 1.2], [112, 186, 1]]) +
        T(7, { x: 56, y: PY, s: PS, face: 'calm', armL: 'back', armR: 'back', pose: 'walk' }) + say(74, 112, 'මගේ නෙවෙයි', { w: 104, size: 12 })]
    );
  };

  /* 8 — give back what is lost */
  S[8] = function () {
    return single('path',
      A.sun(60, 50, 22) + A.cloud(300, 60, 0.8) + A.house(330, 226, 0.75, { roof: '#0f766e' }) + A.tree(40, 232, 0.95) + A.flower(120, 288, 1) +
      A.father({ x: 252, y: SY, s: 0.98, face: 'joy', armL: { e: [-30, -78], h: [-44, -70] }, armR: 'down', top: '#bfdbfe', topLine: '#60a5fa' }) +
      T(8, { x: 150, y: SY, s: 1.04, face: 'joy', armR: { e: [30, -60], h: [46, -64] }, holdR: A.purse(4, 2, 1), armL: 'down' }) +
      say(150, 100, 'මේ ඔබේද?', { w: 96 }) + say(268, 78, 'ස්තුතියි!', { w: 84, tail: 'right', fill: '#dcfce7', stroke: '#86efac' }) +
      A.hearts([[206, 150, 1.1]]) + A.sparkle([[196, 186, 1.4], [220, 210, 1]]));
  };

  /* 9 — guard your words */
  S[9] = function () {
    return split(
      ['gloom', R({ x: 56, y: PY, s: 0.88, face: 'shout', armR: 'point', armL: 'hip' }) +
        A.girl({ x: 142, y: PY, s: 0.84, face: 'cry', armL: 'eyes', armR: 'eyes' }) +
        A.bubble(84, 96, 118, 44, E(-34, 1, 20, '🤬') + E(0, 1, 20, '🐍') + E(34, 1, 20, '💢'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['garden', A.sun(160, 44, 18) + T(9, { x: 56, y: PY, s: 0.9, face: 'joy', armR: 'out', armL: 'down' }) +
        A.girl({ x: 142, y: PY, s: 0.84, face: 'joy', armL: 'wave' }) +
        A.bubble(84, 100, 118, 44, E(-34, 1, 20, '🌸') + E(0, 1, 20, '💛') + E(34, 1, 20, '😊'), { fill: '#fef9c3', stroke: '#fde047' })]
    );
  };

  /* 10 — truth is a treasure */
  S[10] = function () {
    return split(
      ['gloom', stink(140, 200) + stink(30, 190) + R({ x: 96, y: PY, s: PS, face: 'sly', armL: 'back', armR: 'back' }) +
        A.bubble(96, 92, 110, 50, L(-20, 0, 17, 'බොරු', '#991b1b') + E(34, 0, 22, '🐍'), { fill: '#e5e7eb', stroke: '#9ca3af' }) + flies(40, 150) + flies(160, 140)],
      ['garden', A.rays(96, 170, 150, '#fff3b0') + T(10, { x: 96, y: PY, s: PS, face: 'joy', armL: 'hip', armR: 'hip' }) + E(96, 136, 24, '👑') +
        A.bubble(96, 76, 110, 46, L(-20, 0, 17, 'ඇත්ත', '#166534') + E(36, 0, 22, '💎'), { fill: '#fef9c3', stroke: '#fde047' }) + A.sparkle([[30, 120, 1.4], [164, 130, 1.4], [150, 210, 1]])]
    );
  };

  /* 11 — do not block the road */
  S[11] = function () {
    return split(
      ['road', A.house(150, 190, 0.5) + A.grandpa({ x: 96, y: 232, s: 0.66, face: 'sad' }) + E(96, 124, 18, '❗') +
        R({ x: 36, y: 268, s: 0.72, face: 'sly', armR: 'out', armL: 'hip' }) +
        A.friend({ x: 96, y: 268, s: 0.72, face: 'joy', armL: 'out', armR: 'out', top: '#d6d3d1', topLine: '#a8a29e', bottom: '#57534e' }) +
        R({ x: 156, y: 268, s: 0.72, face: 'sly', armL: 'out', armR: 'hip' })],
      ['road', A.house(40, 190, 0.5) + A.grandpa({ x: 150, y: 270, s: 0.7, face: 'joy', pose: 'walk', armR: 'wave' }) +
        T(11, { x: 34, y: 236, s: 0.62, pose: 'walk' }) + A.girl({ x: 78, y: 236, s: 0.6, pose: 'walk' }) + A.friend({ x: 120, y: 236, s: 0.62, pose: 'walk' }) +
        '<path d="M 20 250 h 120" stroke="#fde047" stroke-width="3" stroke-dasharray="7 5"/>']
    );
  };

  /* 12 — do not stare when others eat */
  S[12] = function () {
    return split(
      ['room', A.table(122, PY, 0.9, 50) + A.plate(106, 216, 0.9) + A.plate(146, 216, 0.9) +
        A.mother({ x: 150, y: PY, s: 0.72, face: 'sad' }) + A.windowFrame(44, 120, 66, 74, '') +
        R({ x: 44, y: 204, s: 0.62, face: 'greedy', armL: 'down', armR: 'down' })],
      ['path', A.sun(40, 46, 18) + A.house(140, 224, 0.62) + T(12, { x: 66, y: PY, s: PS, pose: 'walk', face: 'joy', armL: 'wave' }) +
        '<path d="M 94 214 h 22 m -7 -6 l 7 6 l -7 6" stroke="#f59e0b" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' + E(140, 130, 20, '🏠')]
    );
  };

  /* 13 — be careful and humble in a crowd */
  S[13] = function () {
    return split(
      ['road', A.mother({ x: 142, y: 262, s: 0.74, face: 'sad', armL: 'eyes', top: '#c4b5fd', topLine: '#8b5cf6', bottom: '#6d28d9', sash: '#ede9fe' }) +
        R({ x: 58, y: 264, s: 0.86, face: 'shout', armR: { e: [30, -72], h: [36, -92] }, holdR: A.umbrella(0, 0, 0.95, { rot: 38, color: '#44403c' }), armL: 'hip' }) +
        E(118, 120, 18, '💥') + A.bubble(50, 84, 70, 32, E(0, 1, 17, '📢'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['road', A.mother({ x: 144, y: 262, s: 0.74, face: 'joy', armL: 'wave', top: '#c4b5fd', topLine: '#8b5cf6', bottom: '#6d28d9', sash: '#ede9fe' }) +
        T(13, { x: 60, y: 264, s: 0.88, face: 'happy', armR: { e: [26, -66], h: [24, -84] }, holdR: A.umbrella(0, 0, 0.9, { color: '#7c3aed' }) }) + A.hearts([[108, 150, 0.9]])]
    );
  };

  /* 14 — road safety */
  S[14] = function () {
    return split(
      ['road', A.tree(30, 206, 0.6) + A.car(60, 284, 0.95, '#ef4444') + E(118, 196, 22, '❗') +
        R({ x: 146, y: 276, s: 0.78, pose: 'run', face: 'joy', armL: 'up', armR: 'out' })],
      ['road', A.tree(164, 206, 0.6) + A.car(70, 286, 0.95, '#3b82f6') +
        '<rect x="0" y="196" width="192" height="14" fill="#fde68a"/>' +
        T(14, { x: 140, y: 212, s: 0.74, pose: 'walk', face: 'calm' }) + A.girl({ x: 96, y: 212, s: 0.7, pose: 'walk' }) + E(40, 120, 26, '🚸')]
    );
  };

  /* 15 — knock before you enter */
  S[15] = function () {
    return split(
      ['room', A.doorway(44, PY, 1, { open: true }) + A.mother({ x: 150, y: PY, s: 0.74, face: 'wow', armL: 'up', armR: 'up' }) +
        R({ x: 84, y: PY, s: 0.84, pose: 'run', face: 'joy' }) + E(120, 110, 20, '❗')],
      ['plain', wallBg(192, 292, '#fde9c8', '#c9b58d') + A.doorway(124, PY, 1.05) + A.flower(176, 262, 1) +
        T(15, { x: 56, y: PY, s: PS, face: 'happy', armR: { e: [34, -70], h: [44, -84] } }) + say(70, 96, 'ටොක් ටොක්!', { w: 100 }) +
        '<path d="M 96 160 q 6 -5 0 -10 M 102 164 q 10 -9 0 -18" stroke="#f59e0b" stroke-width="2.4" fill="none" stroke-linecap="round"/>']
    );
  };

  /* 16 — stay away from bad places */
  S[16] = function () {
    return split(
      ['night', A.moon(160, 40, 14) + A.hut(58, 236, 0.85, '🎲', '#a8a29e') + A.hut(140, 236, 0.85, '🍺', '#a8a29e') + dust(96, 262, 0.9) +
        A.ban(96, 120, 30, E(0, 1, 26, '🚶'))],
      ['path', A.sun(40, 44, 18) + A.school(128, 222, 0.62) + T(16, { x: 70, y: PY, s: PS, pose: 'walk', face: 'joy', armR: 'down', holdR: A.book(4, 8, 1, '#22c55e') }) +
        A.ball(150, 262, 9) + A.sparkle([[30, 150, 1.2], [168, 150, 1]])]
    );
  };

  /* 17 — do not waste the night on silly shows */
  S[17] = function () {
    return split(
      ['night', A.moon(160, 38, 14) + A.stars([[30, 40, 1], [90, 28, 1.2], [60, 70, 0.8]]) +
        '<rect x="20" y="150" width="152" height="70" fill="#7c2d12"/><path d="M 20 150 q 76 40 152 0 v -14 h -152 Z" fill="#b91c1c"/>' + E(66, 196, 30, '🎭') + E(126, 196, 30, '👹') +
        R({ x: 96, y: 282, s: 0.7, face: 'tired' }) + A.ban(164, 120, 20, E(0, 1, 18, '🌙'))],
      ['nightroom', A.windowFrame(150, 78, 54, 54, '') + A.moon(150, 78, 12) + A.lamp(30, 250, 0.8) +
        A.bed(98, PY, 1.15, { inner: A.person({ x: 12, y: -31, s: 0.62, rot: -90, face: 'sleep', hair: 'neat', pose: 'none' }) }) + A.zzz(70, 170, 1) + A.clock(40, 78, 20, 8, 30)]
    );
  };

  /* 18 — rest first, then drink */
  S[18] = function () {
    return split(
      ['garden', A.sun(150, 52, 28) + A.sweat(60, 130) + A.sweat(132, 140) +
        R({ x: 96, y: PY, s: PS, face: 'tired', armR: 'mouth', holdR: A.cup(4, 4, 1.3, '#bae6fd', { ice: true }), armL: 'down' }) + E(150, 200, 24, '🧊')],
      ['garden', A.sun(36, 44, 18) + A.tree(150, 240, 1.2) + '<ellipse cx="120" cy="262" rx="64" ry="9" fill="#2e7d32" opacity=".3"/>' +
        T(18, { x: 84, y: 262, s: 0.9, pose: 'sitFloor', face: 'calm', armL: 'down', armR: 'down' }) + A.cup(40, 270, 1.2, '#fde68a') + A.clock(44, 120, 17, 3, 10) + A.zzz(118, 150, 0.7)]
    );
  };

  /* 19 — never scribble on walls */
  S[19] = function () {
    return split(
      ['plain', wallBg(192, 292, '#f5f0e6', '#c9b58d') + A.scribble(126, 120, 1.4) + A.scribble(60, 60, 0.9, '#57534e') + E(150, 190, 26, '😜') +
        R({ x: 70, y: PY, s: PS, face: 'sly', armR: { e: [30, -84], h: [44, -100] }, holdR: '<rect x="-3" y="-10" width="6" height="14" rx="2" fill="#1c1917"/>', armL: 'hip' })],
      ['plain', wallBg(192, 292, '#fffaf0', '#c9b58d') + A.sparkle([[40, 60, 1.5], [150, 50, 1.3], [110, 110, 1.1], [30, 150, 1]]) + A.windowFrame(140, 110, 56, 60) +
        T(19, { x: 80, y: 264, s: 0.9, pose: 'sitFloor', face: 'joy', armR: 'low', holdR: A.pencil(2, -8, 0.8, 20), armL: 'low' }) +
        '<rect x="104" y="246" width="50" height="34" rx="3" fill="#fff" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(-6 128 262)"/>' + E(130, 262, 20, '🌻')]
    );
  };

  /* 20 — the teacher's word is true */
  S[20] = function () {
    return single('class',
      A.blackboard(200, 92, 190, 96, L(200, 78, 26, 'අ  ආ  ඇ', '#fff') + L(200, 112, 15, 'ගුරු බස සැබෑය', '#fde047')) +
      A.teacher({ x: 84, y: SY, s: 0.98, face: 'joy', armR: { e: [34, -92], h: [58, -112] }, holdR: '<path d="M 0 0 l 22 -16" stroke="#8a5426" stroke-width="3" stroke-linecap="round"/>' }) +
      A.chair(206, 270, 1.05, { h: 18 }) + T(20, { x: 210, y: 270, s: 0.92, pose: 'sit', face: 'happy', armL: 'low', armR: 'low' }) + A.desk(252, 270, 0.95) + A.openBook(252, 232, 0.7) +
      A.chair(308, 270, 1.05, { h: 18 }) + A.girl({ x: 312, y: 270, s: 0.9, pose: 'sit', face: 'joy', armR: 'up' }) + A.desk(354, 270, 0.95) + A.openBook(354, 232, 0.7) +
      A.hearts([[150, 170, 0.9]]) + A.sparkle([[330, 40, 1.4], [60, 40, 1.2]]));
  };

  /* 21 — teachers are never happy to punish */
  S[21] = function () {
    return split(
      ['class', A.blackboard(96, 70, 120, 60, '') + A.teacher({ x: 142, y: PY, s: 0.74, face: 'sad', armL: 'eyes' }) + E(142, 118, 18, '💔') +
        R({ x: 54, y: PY, s: 0.86, face: 'sly', armR: 'up' }) + '<g class="floaty">' + E(98, 128, 22, '✈️') + '</g>'],
      ['class', A.blackboard(96, 70, 120, 60, L(96, 70, 17, '1 + 1 = 2', '#fff')) + A.teacher({ x: 142, y: PY, s: 0.74, face: 'joy', armL: 'wave' }) + A.hearts([[116, 126, 1]]) +
        T(21, { x: 54, y: PY, s: 0.88, face: 'joy', armL: 'worship', armR: 'worship' }) + A.openBook(54, 204, 0.85) + E(96, 176, 18, '⭐')]
    );
  };

  /* 22 — correction helps us grow straight */
  S[22] = function () {
    return single('garden',
      A.sun(344, 52, 24) + A.cloud(110, 56, 0.8) +
      A.sapling(74, 270, 1.5, true) + A.badge(74, 176, 15, false) +
      '<path d="M 120 236 h 40 m -10 -8 l 10 8 l -10 8" stroke="#f59e0b" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M 330 270 v -92" stroke="#8a5426" stroke-width="5" stroke-linecap="round"/>' + A.sapling(316, 270, 1.8) +
      '<path d="M 312 226 q 10 6 20 0 M 312 200 q 10 6 20 0" stroke="#ef4444" stroke-width="3" fill="none" stroke-linecap="round"/>' + A.badge(370, 176, 15, true) +
      A.teacher({ x: 236, y: SY, s: 0.95, face: 'joy', armR: { e: [34, -80], h: [56, -72] }, armL: 'down' }) +
      T(22, { x: 176, y: SY + 4, s: 0.9, face: 'happy', armL: 'down', armR: 'down' }) + A.hearts([[206, 110, 1.1]]) + E(176, 130, 20, '🌱'));
  };

  /* 23 — say sorry and listen */
  S[23] = function () {
    return single('class',
      A.blackboard(290, 84, 150, 80, L(290, 84, 16, 'හොඳ ළමයෙක් වෙමු', '#fde047')) + A.windowFrame(70, 86, 70, 70, A.sun(70, 86, 14, { face: false })) +
      A.teacher({ x: 262, y: SY, s: 1, face: 'joy', armL: { e: [-34, -80], h: [-54, -92] } }) +
      T(23, { x: 150, y: SY, s: 1.05, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) +
      say(120, 118, 'සමාවෙන්න', { w: 100, fill: '#fef9c3', stroke: '#fde047' }) + A.hearts([[214, 130, 1.1], [330, 150, 0.9]]) + A.sparkle([[206, 176, 1.3]]));
  };

  /* 24 — wake up before the sun */
  S[24] = function () {
    return single('dawn',
      A.sun(310, 196, 40) + '<path d="M 0 218 Q 200 196 400 218 L 400 300 L 0 300 Z" fill="#86d36b"/>' +
      A.house(70, 232, 0.9) + A.flyBird(150, 70, 1) + A.flyBird(196, 96, 0.8) + A.flyBird(250, 60, 0.9) + A.cloud(110, 110, 0.7, '#ffe4e6') +
      E(352, 252, 38, '🐓') + say(340, 206, 'කුකුළුකූ!', { w: 86, tail: 'right', size: 12 }) +
      T(24, { x: 196, y: SY + 4, s: 1.12, face: 'joy', armL: 'up', armR: 'up' }) + A.clock(118, 170, 22, 5, 30) + A.sparkle([[150, 140, 1.3], [250, 150, 1.3]]));
  };

  /* 25 — morning routine in four steps */
  S[25] = function () {
    return grid([
      [1, 'yard', A.house(150, 110, 0.5) + T(25, { x: 80, y: CY, s: CS + 0.06, armR: { e: [26, -50], h: [28, -36] }, armL: { e: [-6, -40], h: [22, -52] } }) + A.broom(112, 102, 0.62, -20) + E(150, 126, 13, '🍂')],
      [2, 'plain', wallBg(193, 144, '#e0f2fe', '#bae6fd') + A.tap(136, 126, 0.9) + A.basin(150, 134, 0.9) +
        T(25, { x: 76, y: CY, s: CS + 0.06, face: 'calm', armL: 'eyes', armR: 'eyes' }) + splash(76, 70, 0.5)],
      [3, 'room', '<rect x="126" y="28" width="46" height="62" rx="8" fill="#e0f2fe" stroke="#8a5426" stroke-width="4"/>' +
        T(25, { x: 80, y: CY, s: CS + 0.06, face: 'joy', armR: 'head', holdR: A.comb(2, -4, 0.7, -20) }) + A.sparkle([[48, 50, 1], [112, 40, 0.9]])],
      [4, 'room', A.mat(96, 130, 60) + T(25, { x: 96, y: 128, s: CS + 0.08, pose: 'sitFloor', face: 'joy', armL: 'worship', armR: 'worship' }) + A.openBook(96, 111, 0.62, { glow: true }) + L(150, 44, 20, 'අ ආ', '#b45309')]
    ]);
  };

  /* 26 — get ready for school */
  S[26] = function () {
    return grid([
      [1, 'plain', wallBg(193, 144, '#e0f2fe', '#bae6fd') + A.tap(140, 128, 0.9) + A.basin(154, 136, 0.85) +
        T(26, { x: 78, y: CY, s: CS + 0.06, face: 'joy', armR: { e: [30, -52], h: [50, -40] }, armL: 'down' }) + splash(146, 100, 0.4)],
      [false, 'plain', wallBg(193, 144, '#fee2e2', '#fecaca') + E(60, 78, 34, '🍭') + E(112, 84, 34, '🍬') + E(154, 72, 30, '🥤') + A.ban(168, 116, 16, '')],
      [true, 'room', A.table(96, 134, 0.8, 70) + A.plate(64, 96, 1.1) + E(112, 86, 24, '🍌') + E(142, 88, 22, '🥛') + A.sparkle([[30, 50, 1.2], [170, 44, 1]])],
      [4, 'path', A.school(140, 108, 0.42) + T(26, { x: 70, y: CY, s: CS + 0.08, pose: 'walk', face: 'joy', armR: 'wave' }) + A.bag(36, 130, 0.62)]
    ]);
  };

  /* 27 — clean clothes */
  S[27] = function () {
    return split(
      ['gloom', R({ x: 96, y: PY, s: PS + 0.06, face: 'sad', dirty: true }) + flies(44, 150) + flies(150, 130) + stink(150, 220) + stink(30, 230)],
      ['garden', A.sun(154, 46, 18) + '<path d="M 0 96 Q 96 112 192 96" stroke="#78716c" stroke-width="2" fill="none"/>' +
        '<rect x="20" y="102" width="30" height="34" rx="4" fill="#fff" stroke="#cbd5e1"/><rect x="62" y="106" width="28" height="26" rx="4" fill="#3b82f6"/><rect x="132" y="104" width="30" height="34" rx="4" fill="#fff" stroke="#cbd5e1"/>' +
        T(27, { x: 96, y: PY, s: PS + 0.06, face: 'joy', armL: 'hip', armR: 'hip', hair: 'neat', top: '#ffffff', topLine: '#cbd5e1', bottom: '#1d4ed8', collar: true, shoes: '#3b2a1e' }) +
        A.sparkle([[44, 180, 1.4], [150, 170, 1.4], [136, 220, 1], [52, 230, 1]])]
    );
  };

  /* 28 — nails and teeth */
  S[28] = function () {
    return grid([
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.hand(104, 116, 1.5, true, true) + flies(40, 50)],
      [true, 'plain', wallBg(193, 144, '#ecfdf5', '#d1fae5') + A.hand(96, 116, 1.5, false, false) + E(158, 60, 26, '✂️') + A.sparkle([[36, 40, 1.3], [150, 110, 1.1]])],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.teeth(104, 76, 1.7, false) + stink(30, 60)],
      [true, 'plain', wallBg(193, 144, '#ecfdf5', '#d1fae5') + A.teeth(90, 74, 1.6, true) + A.toothbrush(132, 118, 1.2, -18)]
    ]);
  };

  /* 29 — keep your nose and mouth clean */
  S[29] = function () {
    return split(
      ['gloom', R({ x: 72, y: PY, s: PS, face: 'sad', snot: true, dirty: true, armR: 'mouth' }) +
        A.girl({ x: 152, y: PY, s: 0.72, face: 'sad', armL: 'eyes' }) + E(120, 120, 20, '🤢')],
      ['garden', A.sun(154, 46, 18) + T(29, { x: 72, y: PY, s: PS, face: 'calm', armR: 'mouth', holdR: A.hanky(0, 2, 1.5) }) +
        A.girl({ x: 152, y: PY, s: 0.72, face: 'joy', armL: 'wave' }) + A.sparkle([[30, 150, 1.3], [116, 130, 1.1]])]
    );
  };

  /* 30 — tidy hair, tidy look */
  S[30] = function () {
    return split(
      ['gloom', '<path d="M 96 256 v -150 M 40 150 h 112" stroke="#8a5426" stroke-width="6" stroke-linecap="round"/>' +
        R({ x: 96, y: PY, s: PS + 0.04, face: 'sad', armL: 'out', armR: 'out', dirty: true, patch: true }) +
        A.bird(30, 142, 0.8, { color: '#1f2937' }) + A.bird(164, 142, 0.8, { color: '#1f2937', flip: true }) + E(96, 60, 22, '🌾')],
      ['room', '<rect x="122" y="60" width="54" height="84" rx="10" fill="#e0f2fe" stroke="#8a5426" stroke-width="5"/>' +
        T(30, { x: 78, y: PY, s: PS + 0.04, face: 'joy', armR: 'head', holdR: A.comb(2, -5, 1, -20), armL: 'hip', hair: 'neat' }) +
        A.sparkle([[40, 120, 1.4], [120, 170, 1.2], [150, 40, 1]])]
    );
  };

  /* 31 — worship, then learn */
  S[31] = function () {
    return grid([
      [1, 'temple', A.stupa(140, 122, 0.62) + T(31, { x: 66, y: CY, s: CS + 0.04, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(104, 132, 0.4)],
      [2, 'room', A.mother({ x: 122, y: CY, s: CS, face: 'joy' }) + A.father({ x: 160, y: CY, s: CS, face: 'joy' }) +
        T(31, { x: 60, y: CY, s: CS + 0.04, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[96, 60, 0.8]])],
      [3, 'class', A.blackboard(60, 50, 80, 44, L(60, 50, 14, 'අ ආ', '#fff')) + A.teacher({ x: 150, y: CY, s: CS, face: 'joy' }) +
        T(31, { x: 84, y: CY, s: CS + 0.04, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' })],
      [4, 'class', A.chair(70, 134, 0.7, { h: 18 }) + T(31, { x: 72, y: 134, s: CS + 0.06, pose: 'sit', face: 'joy', armR: 'low' }) + A.desk(104, 134, 0.7) + A.openBook(104, 104, 0.6, { glow: true }) + E(158, 50, 22, '⭐')]
    ]);
  };

  /* 32 — walk calmly to school */
  S[32] = function () {
    return split(
      ['path', A.school(150, 206, 0.42) + R({ x: 60, y: PY, s: 0.84, face: 'angry', armR: 'point' }) +
        R({ x: 134, y: PY, s: 0.84, face: 'shout', armL: 'point', top: '#d6d3d1', flip: true }) + dust(98, 236, 0.9) + A.bag(30, 270, 0.6, '#78716c')],
      ['path', A.sun(40, 44, 18) + A.school(146, 206, 0.46) + T(32, { x: 60, y: PY, s: 0.86, pose: 'walk', face: 'calm' }) + A.bag(28, 236, 0.5) +
        A.girl({ x: 124, y: PY, s: 0.8, pose: 'walk', face: 'joy' }) + A.butterfly(96, 130, 0.8) + A.flower(170, 272, 0.9)]
    );
  };

  /* 33 — sit in your place and study quietly */
  S[33] = function () {
    return single('class',
      A.blackboard(200, 84, 200, 88, L(200, 70, 20, 'ක  ග  ත  න', '#fff') + L(200, 104, 14, 'නිහඬව ඉගෙන ගනිමු', '#fde047')) +
      A.chair(96, 272, 1.15, { h: 18 }) + T(33, { x: 100, y: 272, s: 1, pose: 'sit', face: 'calm', armR: 'low', armL: 'low' }) + A.desk(148, 272, 1.1) + A.openBook(148, 228, 0.85, { glow: true }) +
      A.chair(250, 272, 1.15, { h: 18 }) + A.girl({ x: 254, y: 272, s: 0.98, pose: 'sit', face: 'calm', armR: 'low' }) + A.desk(302, 272, 1.1) + A.openBook(302, 228, 0.85) +
      A.book(362, 262, 1, '#22c55e', 90) + A.book(362, 254, 1, '#3b82f6', 90) + sayE(60, 130, '🤫', { w: 50 }) + A.sparkle([[196, 186, 1.2], [350, 180, 1.2]]));
  };

  /* 34 — no running about in school */
  S[34] = function () {
    return split(
      ['class', A.blackboard(96, 66, 120, 56, '') + A.teacher({ x: 40, y: PY, s: 0.7, face: 'sad' }) + A.desk(150, PY, 0.8) +
        R({ x: 112, y: PY, s: 0.84, pose: 'run', face: 'joy', armL: 'up', armR: 'up' }) + dust(60, 262, 0.5) + E(150, 130, 18, '💨')],
      ['class', A.blackboard(96, 66, 120, 56, L(96, 66, 16, '2 + 3 = 5', '#fff')) + A.teacher({ x: 40, y: PY, s: 0.7, face: 'joy', armR: { e: [30, -94], h: [44, -114] } }) +
        A.chair(104, PY, 0.95, { h: 18 }) + T(34, { x: 108, y: PY, s: 0.84, pose: 'sit', face: 'joy', armR: 'up' }) + A.desk(150, PY, 0.85) + A.openBook(150, 222, 0.6)]
    );
  };

  /* 35 — ask before you borrow */
  S[35] = function () {
    return split(
      ['class', A.girl({ x: 142, y: PY, s: 0.82, face: 'cry', armL: 'out' }) +
        R({ x: 56, y: PY, s: 0.86, face: 'sly', armR: { e: [30, -64], h: [50, -66] }, holdR: A.book(6, 0, 1.1, '#ef4444', 10) }) + A.anger(100, 130, 1) +
        '<path d="M 110 186 h -18 m 6 -6 l -6 6 l 6 6" stroke="#dc2626" stroke-width="3" fill="none" stroke-linecap="round"/>'],
      ['class', A.girl({ x: 142, y: PY, s: 0.82, face: 'joy', armL: { e: [-28, -62], h: [-44, -64] }, holdL: A.book(-6, 0, 1.1, '#ef4444', -10) }) +
        T(35, { x: 54, y: PY, s: 0.86, face: 'happy', armL: 'worship', armR: 'worship' }) +
        A.bubble(70, 100, 116, 40, E(-32, 1, 18, '🙏') + L(14, 0, 12, 'පොත දෙනවද?', '#3b2a1e'), { fill: '#fef9c3', stroke: '#fde047' }) + A.hearts([[100, 160, 0.9]])]
    );
  };

  /* 36 — look after your things */
  S[36] = function () {
    function tick(x, y) { return A.badge(x, y, 9, true); }
    return single('room',
      A.windowFrame(330, 80, 80, 70, A.sun(330, 80, 14, { face: false })) +
      '<rect x="20" y="60" width="200" height="8" fill="#8a5426"/><rect x="20" y="130" width="200" height="8" fill="#8a5426"/>' +
      A.slate(56, 106, 1.3, 'අ') + tick(84, 84) + A.book(112, 104, 1.5, '#ef4444') + A.book(134, 104, 1.5, '#22c55e') + tick(152, 80) +
      A.pencil(178, 108, 1.3, 0, '#facc15') + A.pencil(194, 108, 1.3, 0, '#60a5fa') + tick(210, 84) +
      A.bag(300, 268, 1.5) + T(36, { x: 210, y: SY + 4, s: 1.06, face: 'joy', armR: { e: [34, -50], h: [56, -44] }, armL: 'hip' }) +
      A.sparkle([[340, 190, 1.4], [264, 196, 1.2], [30, 40, 1]]));
  };

  /* 37 — keep your books clean */
  S[37] = function () {
    return split(
      ['class', A.openBook(96, 100, 3, { scribble: true }) + R({ x: 96, y: 270, s: 0.8, face: 'sly', armR: 'up', holdR: A.pencil(0, -8, 0.9, 160, '#1c1917') })],
      ['class', A.openBook(96, 100, 3, { glow: true, cover: '#1d4ed8' }) + A.sparkle([[26, 60, 1.5], [166, 56, 1.5], [96, 40, 1.2]]) +
        T(37, { x: 96, y: 270, s: 0.82, face: 'joy', armL: 'up', armR: 'up' })]
    );
  };

  /* 38 — keep the school clean */
  S[38] = function () {
    return split(
      ['yard', A.school(110, 204, 0.5) + R({ x: 70, y: PY, s: PS, face: 'shout', armL: 'hip', armR: 'hip' }) +
        '<path d="M 90 172 q 20 10 34 60" stroke="#7dd3fc" stroke-width="3" fill="none" stroke-dasharray="3 5" stroke-linecap="round"/><ellipse cx="128" cy="262" rx="14" ry="5" fill="#a3e635" opacity=".8"/>' + E(150, 230, 18, '🤢') + flies(150, 180)],
      ['yard', A.sun(40, 44, 18) + A.school(110, 204, 0.5) + A.bin(150, 262, 1.1) + A.flower(30, 270, 1) + A.flower(176, 274, 0.9, '#fbbf24') +
        T(38, { x: 84, y: PY, s: PS, face: 'joy', armR: { e: [32, -60], h: [50, -70] }, holdR: E(2, -4, 14, '🧻') }) + A.sparkle([[120, 150, 1.2], [30, 160, 1]])]
    );
  };

  /* 39 — learning is the greatest wealth */
  S[39] = function () {
    return single('nightroom',
      A.windowFrame(330, 82, 76, 70, '<rect x="292" y="47" width="76" height="70" fill="#1e2a5a"/>' + A.moon(330, 80, 13) + A.stars([[306, 62, 0.8], [352, 100, 0.8]])) +
      '<ellipse cx="200" cy="230" rx="170" ry="70" fill="#fde68a" opacity=".22"/>' + A.mat(190, 270, 110, '#b98b52') + A.lamp(292, 266, 1.3) +
      A.person({ x: 170, y: 266, s: 1.12, pose: 'sitFloor', face: 'joy', hair: 'messy', top: '#d6d3d1', topLine: '#a8a29e', bottom: '#78716c', patch: true, shoes: 'none', armL: 'worship', armR: 'worship' }) +
      A.openBook(170, 238, 1.05, { glow: true }) +
      A.think(84, 78, 120, 78, E(-24, -2, 34, '🎓') + E(24, 2, 30, '🏆'), { tail: 'right' }) + A.sparkle([[230, 150, 1.4], [120, 170, 1.1], [250, 210, 1]]));
  };

  /* 40 — never trick your parents */
  S[40] = function () {
    return split(
      ['room', A.mother({ x: 140, y: PY, s: 0.74, face: 'happy', armL: { e: [-28, -82], h: [-42, -76] }, holdL: coin(-4, 0, 8) }) +
        R({ x: 56, y: PY, s: 0.86, face: 'sly', armR: 'out', armL: 'back', holdL: E(-10, 10, 20, '🍭') }) +
        A.bubble(64, 96, 110, 40, E(-34, 1, 17, '📕') + L(12, 0, 12, 'සල්ලි ඕනෑ', '#991b1b'), { fill: '#e5e7eb', stroke: '#9ca3af' }) + E(30, 150, 16, '🤥')],
      ['room', A.mother({ x: 140, y: PY, s: 0.74, face: 'joy', armL: { e: [-28, -86], h: [-44, -96] } }) + A.hearts([[100, 120, 1]]) +
        T(40, { x: 58, y: PY, s: 0.88, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) +
        A.bubble(62, 130, 96, 36, E(-26, 1, 17, '🙏') + L(14, 0, 12, 'අම්මේ…', '#3b2a1e'), { fill: '#fef9c3', stroke: '#fde047' })]
    );
  };

  /* 41 — care for your parents */
  S[41] = function () {
    return single('room',
      A.windowFrame(70, 80, 80, 70, A.sun(70, 80, 14, { face: false })) + '<rect x="270" y="50" width="70" height="50" rx="4" fill="#fff" stroke="#8a5426" stroke-width="4"/>' + E(305, 76, 26, '👨‍👩‍👦') +
      A.chair(280, 270, 1.4, { h: 28, flip: true }) + A.mother({ x: 282, y: 270, s: 1, pose: 'sit', face: 'joy', flip: true, armR: { e: [30, -60], h: [46, -64] } }) +
      A.chair(364, 270, 1.4, { h: 28, flip: true }) + A.father({ x: 366, y: 270, s: 1, pose: 'sit', face: 'joy', flip: true }) +
      T(41, { x: 150, y: SY + 6, s: 1.08, face: 'joy', armR: { e: [32, -58], h: [52, -60] }, holdR: A.cup(4, 0, 1.3, '#fff', { steam: true }), armL: 'down' }) +
      A.hearts([[214, 150, 1.2], [250, 110, 1], [330, 130, 0.9]]));
  };

  /* 42 — never sit higher than your elders */
  S[42] = function () {
    return split(
      ['room', A.chair(60, PY, 1.5, { h: 34 }) + R({ x: 64, y: PY - 18, s: 0.86, pose: 'sit', face: 'sly', armL: 'hip', armR: 'hip' }) +
        A.mat(144, 262, 40) + A.father({ x: 144, y: 262, s: 0.74, pose: 'sitFloor', face: 'sad' }) +
        '<path d="M 20 120 h 150" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 5"/><path d="M 170 120 v 60 m -6 -8 l 6 8 l 6 -8" stroke="#dc2626" stroke-width="2.5" fill="none"/>'],
      ['room', A.chair(128, PY, 1.4, { h: 28 }) + A.father({ x: 132, y: PY, s: 0.8, pose: 'sit', face: 'joy' }) +
        A.mat(50, 264, 40) + T(42, { x: 50, y: 264, s: 0.84, pose: 'sitFloor', face: 'joy', armL: 'worship', armR: 'worship' }) + A.hearts([[92, 130, 1]])]
    );
  };

  /* 43 — never hit your brothers and sisters */
  S[43] = function () {
    return split(
      ['room', R({ x: 62, y: PY, s: 0.9, face: 'angry', armR: 'up', armL: 'hip' }) + A.anger(100, 140, 1.2) +
        A.girl({ x: 140, y: PY, s: 0.66, face: 'cry', armL: 'eyes', armR: 'eyes' }) + E(140, 270, 18, '🧸')],
      ['room', T(43, { x: 66, y: PY, s: 0.9, face: 'joy', armR: { e: [34, -56], h: [56, -50] }, holdR: E(8, 0, 24, '🧸') }) +
        A.girl({ x: 140, y: PY, s: 0.66, face: 'joy', armL: 'out', armR: 'up' }) + A.hearts([[104, 130, 1.2], [156, 140, 0.8], [40, 130, 0.8]])]
    );
  };

  /* 44 — be glad with what you get */
  S[44] = function () {
    return split(
      ['room', A.girl({ x: 142, y: PY, s: 0.8, face: 'joy', armL: 'low', holdL: A.gift(-6, 10, 1, '#f43f5e') }) +
        R({ x: 54, y: PY, s: 0.88, face: 'angry', armL: 'cross', armR: 'cross' }) + A.gift(26, 274, 0.8, '#94a3b8') +
        A.think(70, 96, 84, 46, E(-16, 0, 20, '😒') + E(18, 0, 20, '🎁'), { fill: '#e5e7eb' })],
      ['room', A.girl({ x: 142, y: PY, s: 0.8, face: 'joy', armL: 'low', holdL: A.gift(-6, 10, 1, '#f43f5e') }) +
        T(44, { x: 56, y: PY, s: 0.9, face: 'joy', armR: 'low', holdR: A.gift(6, 10, 1, '#3b82f6') }) + A.hearts([[98, 130, 1.1]]) + A.sparkle([[30, 150, 1.2], [168, 150, 1.2]])]
    );
  };

  /* 45 — respect your elders */
  S[45] = function () {
    return single('room',
      A.windowFrame(64, 80, 80, 70, A.sun(64, 80, 14, { face: false })) + A.lamp(360, 266, 1.2) +
      A.grandpa({ x: 250, y: SY, s: 0.98, face: 'joy', armL: { e: [-32, -86], h: [-52, -98] } }) +
      A.grandma({ x: 322, y: SY, s: 0.95, face: 'joy', armL: 'worship', armR: 'worship' }) +
      A.mat(140, 270, 56) + T(45, { x: 140, y: 268, s: 1.12, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) +
      A.lotus(196, 276, 0.6) + A.sparkle([[196, 150, 1.5], [170, 110, 1.1], [222, 116, 1.2], [110, 130, 1]]) + A.hearts([[286, 70, 1]]));
  };

  /* 46 — listen to good advice */
  S[46] = function () {
    return single('temple',
      A.boTree(330, 232, 1) + A.stupa(70, 226, 0.7) + A.sun(200, 50, 20) +
      A.chair(304, 266, 1.4, { h: 28, flip: true }) + A.monk({ x: 306, y: 266, s: 0.98, pose: 'sit', face: 'calm', flip: true, armR: { e: [30, -64], h: [48, -76] } }) +
      A.bubble(230, 110, 96, 40, E(-26, 1, 19, '☸️') + E(2, 1, 19, '🌸') + E(30, 1, 19, '💛'), { tail: 'right', fill: '#fef9c3', stroke: '#fde047' }) +
      A.mat(130, 276, 120) +
      A.girl({ x: 60, y: 274, s: 0.86, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) +
      T(46, { x: 130, y: 276, s: 0.92, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) +
      A.friend({ x: 200, y: 274, s: 0.86, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(250, 284, 0.5));
  };

  /* 47 — water safety */
  S[47] = function () {
    return split(
      ['river', R({ x: 100, y: 214, s: 0.8, pose: 'run', face: 'joy', armL: 'up', armR: 'up', rot: 18 }) + A.water(0, 226, 192, 40, true) + splash(100, 228, 1) +
        '<rect x="14" y="120" width="56" height="34" rx="5" fill="#fef08a" stroke="#dc2626" stroke-width="3"/>' + L(42, 131, 10, 'ගැඹුරුයි', '#991b1b') + E(42, 145, 11, '⚠️') + '<rect x="39" y="154" width="6" height="56" fill="#8a5426"/>'],
      ['river', A.sun(40, 44, 18) + A.father({ x: 130, y: 262, s: 0.76, face: 'joy', armL: 'out', top: '#bfdbfe', topLine: '#60a5fa' }) +
        T(47, { x: 70, y: 264, s: 0.84, face: 'joy', armL: 'up', armR: 'out' }) + '<rect x="0" y="216" width="192" height="52" fill="#38bdf8" opacity=".75"/>' +
        '<path d="M 0 218 q 12 -6 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>' + A.hearts([[100, 130, 0.9]])]
    );
  };

  /* 48 — stay safe, stay active */
  S[48] = function () {
    return grid([
      [false, 'garden', A.tree(110, 140, 1.15, { fruit: '#f97316' }) + R({ x: 126, y: 86, s: 0.5, face: 'wow', armL: 'up', armR: 'up' }) + E(60, 110, 20, '🤕') + E(160, 40, 16, '❗')],
      [false, 'plain', wallBg(193, 144, '#fee2e2', '#d6c3a1') + A.fire(120, 128, 1.2) + R({ x: 62, y: CY, s: CS, face: 'joy', armR: 'out' }) + E(160, 50, 18, '🔥')],
      [false, 'room', A.windowFrame(150, 46, 50, 44, A.sun(150, 46, 12, { face: false })) +
        A.bed(86, 134, 0.95, { inner: A.person({ x: 12, y: -31, s: 0.62, rot: -90, face: 'sleep', hair: 'messy', pose: 'none', top: '#a8a29e' }), blanketColor: '#a8a29e' }) + A.zzz(56, 70, 0.8)],
      [false, 'room', R({ x: 70, y: 134, s: CS + 0.04, pose: 'sitFloor', face: 'tired', armL: 'down', armR: 'down' }) + A.broom(140, 86, 0.6, 12) + A.book(160, 120, 0.9, '#3b82f6') + A.think(126, 40, 70, 34, L(0, 0, 12, 'පස්සේ…', '#57534e'))]
    ]);
  };

  /* 49 — say no to bad habits */
  S[49] = function () {
    return grid([
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.ban(104, 74, 46, E(0, 2, 44, '🚬'))],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.ban(104, 74, 46, E(0, 2, 40, '🍂')) + L(104, 132, 11, 'දුම්කොළ', '#7f1d1d')],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.ban(104, 74, 46, A.betel(0, 22, 1.1)) + L(104, 132, 11, 'බුලත් විට', '#7f1d1d')],
      [true, 'garden', A.sun(160, 34, 14) + T(49, { x: 84, y: CY, s: CS + 0.08, face: 'joy', armL: 'up', armR: 'up' }) + E(30, 110, 22, '🍎') + E(150, 110, 22, '🥛') + E(150, 72, 20, '💪') + A.sparkle([[36, 60, 1.1]])]
    ]);
  };

  /* 50 — table manners: four don'ts */
  S[50] = function () {
    return grid([
      [false, 'room', A.table(116, 134, 0.8, 60) + '<path d="M 96 98 q 4 -36 22 -36 q 18 0 22 36 Z" fill="#fffdf0" stroke="#e7e5e4"/>' + A.plate(118, 100, 1.4, { empty: true }) + R({ x: 46, y: CY, s: CS, face: 'greedy', armR: 'out' })],
      [false, 'room', A.table(130, 134, 0.8, 50) + A.plate(130, 98, 1, { empty: true }) + R({ x: 56, y: CY, s: CS, face: 'shout', armR: 'up', armL: 'up' }) + say(130, 46, 'තව! තව!', { w: 80, size: 12, fill: '#fee2e2', stroke: '#fca5a5', tail: 'left' })],
      [false, 'room', R({ x: 56, y: CY, s: CS, face: 'angry', armR: 'up' }) + A.anger(86, 50, 0.8) +
        '<g transform="rotate(30 140 70)">' + A.plate(140, 74, 1) + '</g><circle cx="120" cy="104" r="3" fill="#fffdf0" stroke="#d6d3d1"/><circle cx="156" cy="110" r="3" fill="#f97316"/><circle cx="138" cy="120" r="3" fill="#22c55e"/>'],
      [false, 'yard', A.house(60, 116, 0.55) + R({ x: 136, y: CY, s: CS, face: 'happy', armR: 'mouth', armL: 'low', holdL: A.plate(-4, 4, 0.8) }) + E(170, 60, 16, '👀')]
    ]);
  };

  /* 51 — eat happily and politely */
  S[51] = function () {
    return split(
      ['room', A.table(110, PY, 1, 60) + A.plate(126, 212, 1.2) + A.plate(86, 212, 0.9) +
        R({ x: 50, y: PY, s: 0.84, face: 'cry', armR: { e: [34, -60], h: [68, -48] } }) + E(150, 150, 20, '😖') +
        '<path d="M 70 150 q 8 -4 0 -10 M 78 154 q 12 -8 0 -20" stroke="#dc2626" stroke-width="2.4" fill="none" stroke-linecap="round"/>'],
      ['room', A.chair(40, PY, 1.1, { h: 18 }) + T(51, { x: 44, y: PY, s: 0.86, pose: 'sit', face: 'joy', armR: 'low' }) +
        A.table(116, PY, 1, 50) + A.plate(96, 212, 1.1) + A.plate(140, 212, 1.1) + A.cup(118, 212, 1) +
        A.mother({ x: 160, y: PY, s: 0.7, face: 'joy' }) + A.hearts([[100, 130, 1]])]
    );
  };

  /* 52 — buy honestly, share gladly */
  S[52] = function () {
    return grid([
      [false, 'yard', A.hut(134, 130, 0.9, '🥞', '#fde68a') + R({ x: 50, y: CY, s: CS, face: 'sly', armR: 'out' }) + say(92, 30, 'ණයට දෙන්න', { w: 96, size: 11, fill: '#fee2e2', stroke: '#fca5a5' })],
      [false, 'road', R({ x: 96, y: 128, s: CS, pose: 'walk', face: 'happy', armR: 'mouth', holdR: E(2, 0, 16, '🥞') }) + A.car(40, 142, 0.5, '#3b82f6') + E(150, 60, 16, '❗')],
      [false, 'room', R({ x: 120, y: CY, s: CS, pose: 'sitFloor', face: 'greedy', armR: 'mouth', armL: 'cross' }) + E(150, 116, 22, '🍰') + A.girl({ x: 40, y: CY, s: 0.5, face: 'sad' })],
      [true, 'garden', T(52, { x: 96, y: CY, s: CS, face: 'joy', armL: 'out', armR: 'out', holdL: E(-8, 0, 16, '🍰'), holdR: E(8, 0, 16, '🍰') }) +
        A.girl({ x: 40, y: CY, s: 0.54, face: 'joy', armR: 'out' }) + A.friend({ x: 154, y: CY, s: 0.56, face: 'joy', armL: 'out' }) + A.hearts([[66, 40, 0.8], [130, 36, 0.8]])]
    ]);
  };

  /* 53 — keep water clean, serve it politely */
  S[53] = function () {
    return grid([
      [false, 'river', A.water(0, 72, 193, 60) + E(60, 98, 22, '🗑️') + E(110, 104, 18, '🥫') + E(150, 92, 18, '🍌') + R({ x: 166, y: 70, s: 0.42, face: 'sly', armL: 'out' })],
      [false, 'room', R({ x: 56, y: CY, s: CS, face: 'sly', armR: 'out', holdR: A.basin(10, 6, 0.6) }) +
        '<path d="M 110 96 q 20 -10 34 24 M 108 102 q 14 0 22 26" stroke="#38bdf8" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="146" cy="132" rx="26" ry="6" fill="#7dd3fc" opacity=".8"/>'],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.cup(104, 116, 4.2, '#e0f2fe') +
        '<rect x="96" y="20" width="13" height="56" rx="6.5" fill="#e8a877"/><rect x="112" y="26" width="13" height="50" rx="6.5" fill="#e8a877"/><rect x="66" y="76" width="70" height="44" fill="#38bdf8" opacity=".35"/>'],
      [true, 'room', '<rect x="100" y="84" width="60" height="5" rx="2" fill="#8a5426"/>' + A.cup(130, 84, 1.5, '#e0f2fe') +
        T(53, { x: 60, y: CY, s: CS + 0.04, face: 'joy', armR: { e: [30, -56], h: [50, -52] }, armL: { e: [-6, -40], h: [44, -50] } }) + A.grandpa({ x: 168, y: CY, s: 0.5, face: 'joy' }) + A.sparkle([[130, 40, 1]])]
    ]);
  };

  /* 54 — speak sweet words */
  S[54] = function () {
    return split(
      ['gloom', R({ x: 96, y: PY, s: PS, face: 'shout', armR: 'point', armL: 'hip' }) +
        say(60, 60, 'යකෝ!', { w: 76, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b' }) + say(136, 104, 'බොල!', { w: 70, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b', tail: 'right' }) +
        A.anger(40, 140, 1) + A.anger(156, 170, 0.9)],
      ['garden', A.sun(160, 40, 16) + T(54, { x: 96, y: PY, s: PS, face: 'joy', armL: 'out', armR: 'out' }) +
        say(62, 62, 'ස්තුතියි!', { w: 92, fill: '#fef9c3', stroke: '#fde047', color: '#166534' }) + say(130, 108, 'කරුණාකර', { w: 96, fill: '#fef9c3', stroke: '#fde047', color: '#166534', tail: 'right' }) +
        A.flower(24, 270, 1) + A.flower(170, 272, 1, '#fbbf24') + E(30, 150, 18, '🌸') + E(164, 190, 18, '🌼')]
    );
  };

  /* 55 — do today's work today */
  S[55] = function () {
    return split(
      ['room', A.clock(150, 56, 22, 9, 45) + R({ x: 70, y: 264, s: 0.86, pose: 'sitFloor', face: 'joy', armR: 'low', holdR: E(8, 4, 22, '🎮') }) +
        A.think(74, 110, 88, 40, L(0, 0, 14, 'හෙට…', '#57534e'), { fill: '#e5e7eb' }) +
        A.book(148, 264, 1.2, '#ef4444', 90) + A.book(148, 252, 1.2, '#3b82f6', 90) + A.book(148, 240, 1.2, '#22c55e', 90) + A.book(148, 228, 1.2, '#f59e0b', 90) + flies(150, 200)],
      ['room', A.clock(40, 56, 22, 4, 0) + A.chair(54, PY, 1.1, { h: 18 }) + T(55, { x: 58, y: PY, s: 0.88, pose: 'sit', face: 'joy', armR: 'low', holdR: A.pencil(2, -6, 0.8, 20) }) +
        A.desk(112, PY, 1.1) + A.openBook(112, 210, 0.85, { glow: true }) +
        say(130, 110, 'අද ම!', { w: 78, fill: '#dcfce7', stroke: '#86efac', color: '#166534', tail: 'right' }) + A.badge(164, 176, 13, true)]
    );
  };

  /* 56 — play fair */
  S[56] = function () {
    return split(
      ['yard', R({ x: 54, y: PY, s: 0.86, face: 'angry', armR: 'out' }) + R({ x: 140, y: PY, s: 0.86, face: 'shout', armL: 'out', top: '#d6d3d1', bottom: '#78716c' }) +
        A.ball(98, 196, 12, '#94a3b8') + dust(98, 250, 0.7) + A.anger(98, 140, 1.2)],
      ['yard', A.sun(40, 44, 18) + T(56, { x: 50, y: PY, s: 0.86, face: 'joy', armR: 'up' }) + A.friend({ x: 144, y: PY, s: 0.84, face: 'joy', armL: 'up', armR: 'up' }) +
        A.ball(98, 150, 12) + '<path d="M 70 170 q 28 -40 56 -6" stroke="#f59e0b" stroke-width="2" fill="none" stroke-dasharray="4 5"/>' + A.hearts([[98, 110, 0.9]])]
    );
  };

  /* 57 — work together as one */
  S[57] = function () {
    return single('garden',
      A.sun(350, 50, 24) + A.cloud(90, 56, 0.8) + A.house(64, 230, 0.8) + A.tree(372, 236, 0.9) +
      A.friend({ x: 120, y: SY + 4, s: 0.98, face: 'joy', armR: { e: [30, -54], h: [44, -40] }, holdR: A.broom(0, -16, 0.8, 16) }) +
      T(57, { x: 196, y: SY + 6, s: 1.02, face: 'joy', armL: 'low', armR: 'low', holdR: '<path d="M -8 4 q 10 -16 20 0" stroke="#64748b" stroke-width="2" fill="none"/><path d="M -9 4 h 22 l -3 20 h -16 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>' }) +
      A.girl({ x: 270, y: SY + 4, s: 0.94, face: 'joy', armL: 'low', holdL: E(-8, 0, 22, '🌱') }) +
      A.person({ x: 330, y: SY + 6, s: 0.72, face: 'joy', hair: 'neat', top: '#fde68a', topLine: '#f59e0b', bottom: '#b45309', armL: 'up', armR: 'up' }) +
      A.sapling(300, 284, 0.8) + A.flower(30, 284, 1) + A.hearts([[160, 110, 1.1], [236, 100, 1.1], [300, 140, 0.9]]) +
      A.bubble(200, 40, 130, 34, L(0, 0, 14, 'එකමුතුකම!', '#166534'), { fill: '#dcfce7', stroke: '#86efac' }));
  };

  /* 58 — no fights, no false oaths */
  S[58] = function () {
    return split(
      ['yard', R({ x: 54, y: PY, s: 0.86, face: 'angry', armR: { e: [30, -70], h: [40, -86] }, armL: { e: [-26, -66], h: [-20, -84] } }) +
        R({ x: 140, y: PY, s: 0.84, face: 'angry', top: '#d6d3d1', bottom: '#78716c', armL: { e: [-30, -70], h: [-40, -86] }, armR: { e: [26, -66], h: [20, -84] } }) +
        E(98, 130, 26, '💢') + E(98, 60, 22, '🥊')],
      ['yard', A.sun(154, 44, 18) + T(58, { x: 58, y: PY, s: 0.88, face: 'joy', armR: { e: [28, -52], h: [42, -50] } }) +
        A.friend({ x: 140, y: PY, s: 0.86, face: 'joy', armL: { e: [-28, -52], h: [-42, -50] } }) + E(98, 206, 22, '🤝') + A.hearts([[98, 130, 1.2]]) + E(98, 76, 22, '🕊️')]
    );
  };

  /* 59 — a good daily routine */
  S[59] = function () {
    return grid([
      [false, 'plain', '<rect width="193" height="144" fill="url(#gDawn)"/><rect y="112" width="193" height="32" fill="#6b4a2e"/>' + A.sun(160, 100, 18, { face: false }) +
        A.bed(84, 132, 0.95, { inner: A.person({ x: 12, y: -31, s: 0.62, rot: -90, face: 'sleep', hair: 'messy', pose: 'none', top: '#a8a29e' }), blanketColor: '#a8a29e' }) + A.zzz(50, 66, 0.8) + A.clock(150, 40, 16, 6, 0) + L(108, 40, 10, 'හවස', '#7c2d12')],
      [true, 'dawn', A.sun(150, 96, 22) + '<path d="M 0 108 Q 96 96 193 108 L 193 144 L 0 144 Z" fill="#86d36b"/>' + T(59, { x: 70, y: CY, s: CS + 0.06, face: 'joy', armL: 'up', armR: 'up' }) + E(124, 124, 20, '🐓')],
      [true, 'temple', A.stupa(140, 122, 0.6) + T(59, { x: 66, y: CY, s: CS + 0.04, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.lamp(104, 130, 0.6)],
      [true, 'room', A.chair(60, 134, 0.7, { h: 18 }) + T(59, { x: 62, y: 134, s: CS + 0.04, pose: 'sit', face: 'joy', armR: 'low' }) + A.desk(96, 134, 0.7) + A.openBook(96, 104, 0.6, { glow: true }) + A.broom(160, 86, 0.6, 8)]
    ]);
  };

  /* 60 — the betel offering to parents */
  S[60] = function () {
    return single('room',
      A.rays(280, 150, 200, '#fff1b8') + A.windowFrame(60, 76, 76, 66, A.sun(60, 76, 13, { face: false })) + A.lamp(30, 270, 1.1) +
      A.chair(262, 270, 1.4, { h: 28, flip: true }) + A.mother({ x: 264, y: 270, s: 1, pose: 'sit', face: 'joy', flip: true, armR: { e: [30, -64], h: [46, -72] } }) +
      A.chair(350, 270, 1.4, { h: 28, flip: true }) + A.father({ x: 352, y: 270, s: 1, pose: 'sit', face: 'joy', flip: true }) +
      A.mat(130, 274, 60) + T(60, { x: 130, y: 272, s: 1.12, pose: 'kneel', face: 'calm', armL: { e: [-6, -60], h: [26, -72] }, armR: { e: [30, -58], h: [36, -72] } }) +
      A.betel(168, 184, 1.1) + A.hearts([[214, 120, 1.2], [310, 100, 1]]) + A.sparkle([[196, 150, 1.5], [150, 120, 1.1], [230, 180, 1]]));
  };

  /* 61 — humility is the stairway to greatness */
  S[61] = function () {
    var st = A.steps(110, 278, 5, 56, 30, ['#fca5a5', '#fdba74', '#fde047', '#86efac', '#7dd3fc']);
    var lab = '';
    ['කීකරු', 'නිහතමානී', 'ඉගෙනීම', 'ගෞරවය', 'උසස් බව'].forEach(function (t, i) { lab += L(138 + i * 56, 263 - i * 30, 11.5, t, '#3b2a1e', 900); });
    return single('garden',
      A.rays(362, 96, 120, '#fff1b8') + A.sun(60, 50, 22) + A.cloud(200, 50, 0.8) + st + lab +
      E(362, 96, 40, '🏆') + A.sparkle([[330, 60, 1.4], [390, 70, 1.2], [350, 40, 1]]) +
      T(61, { x: 250, y: 188, s: 0.82, pose: 'walk', face: 'joy', armR: 'up', armL: 'down' }) +
      A.person({ x: 60, y: 274, s: 0.62, hair: 'messy', top: '#fdba74', topLine: '#fb923c', bottom: '#7c5a3a', shoes: 'none', face: 'happy', armR: 'wave' }) +
      '<path d="M 86 220 q 40 -60 120 -70" stroke="#f59e0b" stroke-width="3" fill="none" stroke-dasharray="6 6" stroke-linecap="round"/>');
  };

  /* 62 — may all children be victorious! */
  S[62] = function () {
    return single('temple',
      A.rays(200, 150, 260, '#fff1b8', 18) + A.fullMoon(340, 60, 24) + A.stupa(60, 228, 0.7) + A.boTree(356, 232, 0.7) +
      A.garlandArc(16, 384, 18, 22, 14) + A.confetti(400, 300, 34) +
      A.girl({ x: 96, y: 266, s: 0.9, face: 'joy', armL: 'up', armR: 'up' }) + A.friend({ x: 304, y: 266, s: 0.92, face: 'joy', armL: 'up', armR: 'up' }) +
      A.person({ x: 40, y: 270, s: 0.7, face: 'joy', hair: 'neat', top: '#fde68a', topLine: '#f59e0b', bottom: '#b45309', armL: 'up', armR: 'up' }) +
      A.girl({ x: 362, y: 270, s: 0.7, face: 'joy', bottom: '#7c3aed', armL: 'up', armR: 'up' }) +
      A.lotus(150, 284, 0.8) + A.lotus(250, 284, 0.8) + A.lotus(200, 290, 1) +
      T(62, { x: 200, y: 268, s: 1.22, face: 'joy', armL: 'up', armR: 'up' }) + E(200, 108, 30, '👑') +
      A.hearts([[140, 140, 1.1], [262, 136, 1.1]]));
  };

  var PARTS = { 1: S };
  var HERO = { 1: function (v) { return v; } };
  function register(part, map, look) { PARTS[part] = map; HERO[part] = look || HERO[1]; }
  function render(part, n, title) {
    var fn = (PARTS[part] || {})[n];
    var inner = fn ? fn() : single('garden', T(HERO[part] ? HERO[part](n) : n, { x: 200, y: 258, s: 1.1 }));
    return A.wrap(inner, title || ('කවිය ' + n));
  }

  /* Taraka portrait for level cards and the hero */
  function portrait(part, n, o) {
    o = o || {};
    var v = (HERO[part] || HERO[1])(n);
    var inner = '<circle cx="100" cy="100" r="96" fill="' + (o.bg || '#fef3c7') + '"/>' + (v >= 46 ? A.rays(100, 96, 96, '#fde68a') : '') +
      T(v, { x: 100, y: 182, s: 1.45, face: o.face || (v <= 10 ? 'happy' : 'joy'), armL: o.armL || (v >= 46 ? 'worship' : 'down'), armR: o.armR || (v >= 46 ? 'worship' : 'wave') }) +
      (n >= 62 ? A.lotus(100, 192, 0.9) + E(100, 22, 22, '👑') : '');
    var id = 'pc_' + part + '_' + n + '_' + Math.floor(Math.random() * 1e6);
    return '<svg viewBox="0 0 200 200" class="portrait" role="img" aria-label="තාරක"><clipPath id="' + id + '"><circle cx="100" cy="100" r="96"/></clipPath><g clip-path="url(#' + id + ')">' + inner + '</g><circle cx="100" cy="100" r="96" fill="none" stroke="#f59e0b" stroke-width="5"/></svg>';
  }

  global.Scenes = { render: render, portrait: portrait, register: register,
    h: { say: say, sayE: sayE, dust: dust, splash: splash, flies: flies, stink: stink, wallBg: wallBg, coin: coin } };
})(window);
