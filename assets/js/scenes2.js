/* සිරිත් මල්දම (2 කොටස) — one picture for every poem. */
(function (global) {
  'use strict';
  var A = global.Art, H = global.Scenes.h;
  var E = A.emoji, L = A.label, R = A.rascal;
  var single = A.single, split = A.split, grid = A.grid, pair = A.pair;
  var say = H.say, sayE = H.sayE, dust = H.dust, splash = H.splash, flies = H.flies, stink = H.stink, wallBg = H.wallBg;
  function look(v) { return Math.max(33, v); }
  function T(v, o) { return A.taraka(look(v), o); }
  var SY = 258, PY = 256, PS = 0.92, CY = 131, CS = 0.6;
  var PURPLE = { top: '#c4b5fd', topLine: '#8b5cf6', bottom: '#6d28d9', sash: '#ede9fe' };
  function mum(o) { return A.mother(o); }
  function aunty(o) { var b = { top: PURPLE.top, topLine: PURPLE.topLine, bottom: PURPLE.bottom, sash: PURPLE.sash }; for (var k in o) b[k] = o[k]; return A.mother(b); }
  function uncle(o) { var b = { top: '#bfdbfe', topLine: '#60a5fa', bottom: '#1e3a8a' }; for (var k in o) b[k] = o[k]; return A.father(b); }
  function arrow(x, y, len, col) { return '<path d="M ' + x + ' ' + y + ' h ' + len + ' m -8 -7 l 8 7 l -8 7" stroke="' + (col || '#f59e0b') + '" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function notes(x, y) { return '<g class="floaty">' + E(x, y, 20, '🎵') + E(x + 26, y - 16, 18, '🎶') + '</g>'; }
  function haha(x, y, o) { return say(x, y, 'හා! හා! හා!', { w: 96, size: 12, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b', tail: (o || {}).tail }); }

  var S = {};

  S[1] = function () {
    return single('temple',
      A.rays(200, 160, 230, '#fff1b8') + A.stupa(64, 226, 0.9) + A.boTree(344, 228, 0.85) + A.garlandArc(24, 376, 22, 20, 13) +
      A.lantern(110, 110, 0.9, '#f43f5e') + A.lantern(292, 116, 0.9, '#8b5cf6') + A.flower(30, 274, 1.1) + A.flower(372, 276, 1.1, '#fbbf24') +
      A.girl({ x: 252, y: 266, s: 1.04, face: 'joy', armL: 'worship', armR: 'worship' }) + A.openBook(252, 212, 1.1, { glow: true, cover: '#be185d' }) +
      T(1, { x: 150, y: 266, s: 1.1, face: 'joy', armL: 'worship', armR: 'worship' }) + A.openBook(150, 208, 1.2, { glow: true }) +
      A.sparkle([[200, 150, 1.6], [96, 170, 1.2], [306, 170, 1.2]]));
  };

  S[2] = function () {
    return split(
      ['gloom', A.rubbish(150, 262, 1.1) + stink(40, 150) + R({ x: 60, y: PY, s: 0.86, face: 'sly', armR: 'out' }) +
        R({ x: 128, y: PY, s: 0.84, face: 'sly', top: '#d6d3d1', armL: 'out', dirty: true }) + flies(96, 120) + flies(160, 170)],
      ['garden', A.sun(40, 44, 18) + A.tree(160, 240, 0.9, { fruit: '#f472b6' }) + T(2, { x: 60, y: PY, s: 0.88, face: 'joy', armR: 'out' }) +
        A.friend({ x: 130, y: PY, s: 0.86, face: 'joy', armL: 'out' }) + A.flower(20, 272, 1) + A.flower(96, 276, 1.1, '#fbbf24') + A.flower(176, 274, 1, '#c084fc') +
        A.sparkle([[96, 120, 1.3], [30, 150, 1]]) + A.hearts([[96, 160, 0.9]])]
    );
  };

  S[3] = function () {
    return split(
      ['gloom', A.snake(140, 262, 1.2, { flip: true }) + R({ x: 60, y: PY, s: 0.86, face: 'sly', armR: 'wave' }) +
        A.think(96, 70, 120, 56, E(-30, 0, 24, '🎲') + E(2, 0, 24, '🚬') + E(34, 0, 24, '👊'), { fill: '#e5e7eb' }) + E(150, 170, 20, '⚠️')],
      ['path', A.sun(154, 44, 18) + T(3, { x: 60, y: PY, s: 0.88, face: 'calm', pose: 'walk', armL: { e: [-30, -70], h: [-42, -88] } }) + arrow(92, 214, 26) +
        A.girl({ x: 134, y: PY, s: 0.8, face: 'joy', armL: 'wave' }) + A.friend({ x: 172, y: PY, s: 0.76, face: 'joy' }) + A.hearts([[110, 140, 0.9]])]
    );
  };

  S[4] = function () {
    return split(
      ['room', A.doorway(150, PY, 0.95, { open: true }) + aunty({ x: 150, y: PY, s: 0.68, face: 'sad' }) +
        R({ x: 60, y: 264, s: 0.86, pose: 'sitFloor', face: 'happy', armR: 'low', holdR: E(8, 4, 22, '🎮') }) + E(100, 150, 20, '💤')],
      ['room', A.chair(44, PY, 1.3, { h: 28 }) + aunty({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'worship', armR: 'worship' }) +
        T(4, { x: 84, y: PY, s: 0.88, face: 'joy', armL: 'worship', armR: 'worship' }) + say(80, 96, 'ආයුබෝවන්!', { w: 104, fill: '#fef9c3', stroke: '#fde047' }) + A.hearts([[120, 150, 0.9]])]
    );
  };

  S[5] = function () {
    return split(
      ['gloom', R({ x: 96, y: PY, s: PS, face: 'shout', armL: 'up', armR: 'point' }) +
        A.bubble(56, 50, 96, 34, E(-26, 1, 17, '🤬') + E(0, 1, 17, '💢') + E(26, 1, 17, '🗯️'), { fill: '#fee2e2', stroke: '#fca5a5' }) +
        A.bubble(140, 96, 86, 32, L(0, 0, 11, 'බ්ලා බ්ලා බ්ලා', '#991b1b'), { fill: '#fee2e2', stroke: '#fca5a5', tail: 'right' }) +
        A.bubble(44, 126, 70, 30, L(0, 0, 11, 'බ්ලා බ්ලා', '#991b1b'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['garden', A.sun(160, 40, 16) + T(5, { x: 96, y: PY, s: PS, face: 'joy', armR: 'out', armL: 'down' }) +
        A.bubble(96, 86, 110, 44, E(-30, 1, 20, '🌸') + L(14, 0, 13, 'හොඳ වචන', '#166534'), { fill: '#fef9c3', stroke: '#fde047' }) + A.flower(24, 270, 1) + A.flower(170, 272, 1, '#fbbf24')]
    );
  };

  S[6] = function () {
    return grid([
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + R({ x: 96, y: 150, s: 0.95, face: 'sad', armR: 'mouth', armL: 'down' }) + L(150, 40, 11, 'නිය හපනවා', '#7f1d1d')],
      [false, 'room', A.chair(70, CY, 0.8, { h: 18 }) + R({ x: 72, y: CY, s: CS, pose: 'sit', face: 'shout' }) +
        '<path d="M 96 88 q 20 6 30 36" stroke="#7dd3fc" stroke-width="3" fill="none" stroke-dasharray="3 5" stroke-linecap="round"/><ellipse cx="130" cy="130" rx="12" ry="4" fill="#a3e635" opacity=".8"/>' + E(160, 60, 18, '🤢')],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + R({ x: 96, y: 150, s: 0.95, face: 'sly', armR: 'head', holdR: E(8, -8, 20, '✂️') }) + L(40, 40, 11, 'කෙස් කපනවා', '#7f1d1d')],
      [true, 'garden', A.sun(160, 34, 14) + T(6, { x: 96, y: CY, s: CS + 0.1, face: 'joy', armL: 'hip', armR: 'wave' }) + A.sparkle([[40, 60, 1.2], [150, 90, 1.1], [56, 110, 1]])]
    ]);
  };

  S[7] = function () {
    return split(
      ['temple', A.chair(150, PY, 1.3, { h: 28, flip: true }) + A.monk({ x: 152, y: PY, s: 0.76, pose: 'sit', flip: true, face: 'sad' }) +
        R({ x: 56, y: PY, s: 0.86, face: 'joy', armL: 'up', armR: 'hip' }) + haha(70, 100)],
      ['temple', A.chair(150, PY, 1.3, { h: 28, flip: true }) + A.monk({ x: 152, y: PY, s: 0.76, pose: 'sit', flip: true, face: 'joy', armR: { e: [30, -64], h: [46, -76] } }) +
        A.mat(60, 264, 40) + T(7, { x: 60, y: 264, s: 0.86, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + sayE(70, 130, '🙏', { w: 50 }) + A.lotus(108, 272, 0.4)]
    );
  };

  S[8] = function () {
    return split(
      ['path', uncle({ x: 36, y: PY, s: 0.7, face: 'sad', armR: 'out' }) + aunty({ x: 156, y: PY, s: 0.68, face: 'sad', armL: 'out' }) +
        '<path d="M 62 150 h 22 M 108 150 h 22" stroke="#9ca3af" stroke-width="4" stroke-dasharray="5 5" stroke-linecap="round"/>' + E(96, 120, 22, '💥') +
        R({ x: 96, y: 268, s: 0.8, pose: 'run', face: 'joy' })],
      ['path', A.sun(160, 40, 16) + uncle({ x: 50, y: 250, s: 0.7, face: 'joy', armR: 'out' }) + aunty({ x: 124, y: 250, s: 0.68, face: 'joy', armL: 'out' }) +
        A.bubble(88, 110, 70, 30, E(-14, 1, 15, '💬') + E(14, 1, 15, '😊')) +
        '<path d="M 20 280 q 80 22 150 -6" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="7 6" stroke-linecap="round"/>' +
        T(8, { x: 170, y: 282, s: 0.62, pose: 'walk', face: 'calm' })]
    );
  };

  S[9] = function () {
    return split(
      ['road', A.house(60, 208, 0.8) + A.bubble(56, 110, 84, 44, A.baby(-8, 0, 1.1, { cry: true }), { fill: '#fee2e2', stroke: '#fca5a5' }) +
        R({ x: 140, y: 270, s: 0.84, pose: 'walk', face: 'shout', armR: 'up' }) + notes(150, 120) + E(110, 180, 18, '📢')],
      ['road', A.house(60, 208, 0.8) + A.zzz(60, 140, 0.8) + T(9, { x: 140, y: 270, s: 0.86, pose: 'walk', face: 'calm', armR: 'mouth' }) + sayE(150, 140, '🤫', { w: 50, tail: 'right' })]
    );
  };

  S[10] = function () {
    return split(
      ['road', A.house(64, 212, 0.95) + R({ x: 38, y: 190, s: 0.4, face: 'joy' }) + E(64, 110, 18, '👀') +
        A.grandpa({ x: 150, y: 270, s: 0.72, face: 'sad', pose: 'walk' }) + haha(84, 60)],
      ['yard', A.sun(160, 40, 16) + A.doorway(50, PY, 1, { open: true }) + T(10, { x: 64, y: PY, s: 0.84, face: 'joy', armR: 'wave' }) +
        A.grandpa({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'wave' }) + say(100, 90, 'එන්න සීයේ!', { w: 100, fill: '#fef9c3', stroke: '#fde047' })]
    );
  };

  S[11] = function () {
    return split(
      ['room', uncle({ x: 40, y: PY, s: 0.68, face: 'sad' }) + aunty({ x: 156, y: PY, s: 0.66, face: 'sad' }) +
        sayE(40, 90, '❓', { w: 46 }) + R({ x: 100, y: PY, s: 0.8, face: 'shout', armL: 'up', armR: 'up' }) +
        say(110, 130, 'මම! මම!', { w: 80, size: 12, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b' })],
      ['class', A.teacher({ x: 46, y: PY, s: 0.72, face: 'joy', armR: 'out' }) + sayE(56, 80, '❓', { w: 46 }) +
        T(11, { x: 136, y: PY, s: 0.86, face: 'happy', armR: 'up' }) + A.think(140, 120, 60, 36, E(0, 0, 20, '💡'), { tail: 'left' }) + A.badge(170, 190, 12, true)]
    );
  };

  S[12] = function () {
    return split(
      ['room', A.father({ x: 146, y: PY, s: 0.76, face: 'sad', armL: 'out' }) + A.chair(54, PY, 1.2, { h: 20 }) +
        R({ x: 58, y: PY, s: 0.86, pose: 'sit', face: 'sly', armL: 'hip', armR: { e: [30, -40], h: [44, -30] } }) + sayE(150, 90, '❓', { w: 46, tail: 'right' })],
      ['room', A.father({ x: 146, y: PY, s: 0.76, face: 'joy', armL: 'out' }) + A.chair(34, PY, 1.2, { h: 20 }) +
        T(12, { x: 84, y: PY, s: 0.88, face: 'joy', armL: 'worship', armR: 'worship' }) +
        '<path d="M 56 200 v -26 m -7 8 l 7 -8 l 7 8" stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' + A.hearts([[116, 120, 0.9]])]
    );
  };

  S[13] = function () {
    function potBits(x, y) { return '<path d="M ' + x + ' ' + y + ' l 12 -14 l 8 12 Z M ' + (x + 22) + ' ' + y + ' l 6 -18 l 12 16 Z M ' + (x - 16) + ' ' + y + ' l 6 -10 l 8 10 Z" fill="#c2410c" stroke="#7c2d12" stroke-width="1"/>'; }
    return split(
      ['room', potBits(130, 270) + A.cat(160, 262, 0.7) + mum({ x: 150, y: 240, s: 0.62, face: 'sad' }) +
        R({ x: 60, y: PY, s: 0.86, face: 'sly', armR: 'point', armL: 'back' }) + say(70, 100, 'පූසා!', { w: 70, fill: '#e5e7eb', stroke: '#9ca3af', color: '#991b1b' })],
      ['room', potBits(30, 272) + mum({ x: 142, y: PY, s: 0.76, face: 'joy', armL: { e: [-30, -84], h: [-46, -96] } }) +
        T(13, { x: 66, y: PY, s: 0.86, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + say(60, 110, 'මගේ වරද', { w: 92, fill: '#fef9c3', stroke: '#fde047' }) + A.hearts([[110, 150, 1]])]
    );
  };

  S[14] = function () {
    return single('room',
      A.rays(280, 140, 210, '#fff1b8') + A.windowFrame(60, 80, 76, 66, A.sun(60, 80, 13, { face: false })) + A.lamp(200, 272, 1) +
      mum({ x: 250, y: SY, s: 1.02, face: 'joy', halo: true, armL: 'worship', armR: 'worship' }) + A.father({ x: 330, y: SY, s: 1.02, face: 'joy', halo: true, armL: { e: [-34, -86], h: [-52, -96] } }) +
      A.mat(110, 274, 90) + A.girl({ x: 66, y: 272, s: 0.92, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) +
      T(14, { x: 146, y: 272, s: 1, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(200, 250, 0.5) + A.hearts([[200, 110, 1.2], [290, 60, 1]]));
  };

  S[15] = function () {
    return single('path',
      A.rays(340, 110, 150, '#fff1b8') + A.sun(340, 60, 24) + A.school(300, 214, 0.6) + A.tree(44, 232, 1) + A.cloud(140, 56, 0.8) +
      '<path d="M 140 286 Q 220 250 290 218" stroke="#f59e0b" stroke-width="4" fill="none" stroke-dasharray="8 7" stroke-linecap="round"/>' +
      A.father({ x: 196, y: SY + 4, s: 1, face: 'joy', armR: { e: [36, -96], h: [60, -110] }, armL: { e: [-30, -76], h: [-44, -66] } }) +
      T(15, { x: 124, y: SY + 6, s: 1, face: 'joy', armR: { e: [26, -58], h: [36, -62] }, armL: 'down' }) + A.hearts([[160, 130, 1.1]]) + A.sparkle([[260, 180, 1.4], [230, 150, 1]]));
  };

  S[16] = function () {
    return pair(
      ['gloom', '<rect x="20" y="120" width="40" height="110" fill="#94a3b8"/><rect x="66" y="90" width="46" height="140" fill="#64748b"/><rect x="120" y="140" width="50" height="90" fill="#94a3b8"/>' +
        '<g fill="#fde68a"><rect x="28" y="130" width="8" height="8"/><rect x="44" y="150" width="8" height="8"/><rect x="76" y="104" width="8" height="8"/><rect x="92" y="130" width="8" height="8"/><rect x="132" y="154" width="8" height="8"/><rect x="150" y="176" width="8" height="8"/></g>' +
        E(150, 60, 24, '✈️') + A.father({ x: 96, y: 270, s: 0.84, face: 'sad', armR: 'low', holdR: E(6, 12, 24, '🧳') }) +
        A.think(120, 110, 84, 50, E(-16, 0, 22, '🧒') + A.heart(20, 0, 0.9), { tail: 'left' }), { tag: '🌍' }],
      ['room', A.frame(140, 80, 56, 64, E(140, 80, 30, '👨')) + T(16, { x: 84, y: 266, s: 0.92, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) +
        A.think(70, 110, 84, 50, E(-16, 0, 22, '👨') + A.heart(20, 0, 0.9), { tail: 'right' }) + A.lamp(160, 268, 0.8) + E(150, 200, 22, '✉️'), { tag: '🏠' }]
    );
  };

  S[17] = function () {
    return single('yard',
      A.sun(60, 50, 22) + A.house(320, 226, 0.95) + A.tree(60, 234, 0.9) +
      '<path d="M 84 214 h 120" stroke="#78716c" stroke-width="2"/><rect x="100" y="216" width="26" height="30" rx="4" fill="#fff" stroke="#cbd5e1"/><rect x="134" y="216" width="24" height="24" rx="4" fill="#3b82f6"/><rect x="166" y="216" width="24" height="30" rx="4" fill="#f472b6"/>' +
      mum({ x: 226, y: SY + 4, s: 1, face: 'tired', armR: 'head', holdR: A.pot(0, 4, 1) , armL: 'low', holdL: A.broom(-2, -10, 0.8, -14) }) +
      A.sweat(252, 120) + A.girl({ x: 130, y: 280, s: 0.62, face: 'joy', armL: 'up', armR: 'up' }) + A.ball(168, 276, 8) +
      T(17, { x: 306, y: 280, s: 0.74, face: 'joy', armL: { e: [-28, -56], h: [-44, -62] } }) + A.hearts([[270, 150, 1.1], [190, 120, 0.9]]));
  };

  S[18] = function () {
    var moons = '';
    for (var i = 0; i < 10; i++) moons += '<circle cx="' + (44 + i * 34) + '" cy="40" r="11" fill="' + (i < 9 ? '#fde68a' : '#f59e0b') + '" stroke="#f59e0b" stroke-width="1.5"/>' + L(44 + i * 34, 40.5, 10, i + 1, '#7c2d12', 900);
    return single('room',
      moons + A.windowFrame(70, 120, 70, 60, A.sun(70, 120, 12, { face: false })) +
      A.chair(190, 270, 1.5, { h: 28 }) + mum({ x: 194, y: 270, s: 1.08, pose: 'sit', face: 'calm', armL: { e: [-24, -60], h: [2, -50] }, armR: { e: [26, -58], h: [10, -46] } }) +
      '<ellipse cx="204" cy="200" rx="22" ry="24" fill="#f472b6"/><ellipse cx="204" cy="200" rx="22" ry="24" fill="none" stroke="#db2777" stroke-width="1.2"/>' + A.heart(206, 200, 0.9, '#fff') +
      A.think(310, 130, 110, 76, A.baby(-14, 0, 1.4), { tail: 'left', fill: '#fff7fb' }) + A.hearts([[250, 90, 1.1], [140, 130, 0.9]]) + A.lotus(340, 274, 0.6));
  };

  S[19] = function () {
    return single('nightroom',
      A.windowFrame(330, 82, 76, 70, '<rect x="292" y="47" width="76" height="70" fill="#1e2a5a"/>' + A.moon(330, 80, 13) + A.stars([[306, 62, 0.8], [352, 100, 0.8]])) +
      '<ellipse cx="190" cy="230" rx="170" ry="70" fill="#fde68a" opacity=".2"/>' + A.lamp(70, 268, 1.2) + A.clock(70, 90, 22, 2, 0) +
      A.chair(196, 272, 1.5, { h: 28 }) + mum({ x: 200, y: 272, s: 1.1, pose: 'sit', face: 'tired', armL: { e: [-26, -60], h: [-4, -46] }, armR: { e: [28, -58], h: [16, -44] } }) +
      A.baby(198, 204, 1.25, { rot: -14 }) + E(250, 210, 24, '🍼') + A.hearts([[250, 120, 1.1], [150, 130, 0.9]]));
  };

  S[20] = function () {
    return single('garden',
      A.sun(344, 52, 24) + A.cloud(100, 56, 0.8) + A.tree(50, 232, 1, { fruit: '#f472b6' }) + A.flower(330, 280, 1.2) + A.flower(370, 270, 1, '#fbbf24') + A.flower(110, 284, 1, '#c084fc') +
      A.mat(200, 276, 100) + mum({ x: 190, y: 274, s: 1.1, pose: 'sitFloor', face: 'calm', armL: { e: [-26, -50], h: [-2, -40] }, armR: { e: [30, -48], h: [22, -38] } }) +
      A.baby(196, 232, 1.35, { rot: -10 }) + E(168, 196, 22, '😘') + A.pot(290, 278, 0.7, '#ca8a04') + L(290, 240, 11, 'තෙල්', '#7c2d12') +
      say(260, 140, 'මගේ රත්තරන්!', { w: 124, tail: 'left', fill: '#fff7fb', stroke: '#f9a8d4' }) + A.hearts([[130, 160, 1.1], [240, 96, 0.9]]));
  };

  S[21] = function () {
    return grid([
      [1, 'room', mum({ x: 130, y: CY, s: CS, face: 'joy', armL: { e: [-24, -56], h: [-40, -50] }, holdL: E(-6, 0, 14, '🥄') }) + A.girl({ x: 66, y: CY, s: 0.5, pose: 'sitFloor', face: 'wow' }) + A.plate(100, 128, 0.7)],
      [2, 'plain', wallBg(193, 144, '#e0f2fe', '#bae6fd') + A.basin(80, 130, 1.5) + A.person({ x: 80, y: 124, s: 0.5, pose: 'none', face: 'joy', hair: 'neat', top: '#e8a877', topLine: '#e8a877', armL: 'up', armR: 'up' }) + splash(80, 100, 0.5) +
        mum({ x: 150, y: CY, s: CS, face: 'joy', armL: { e: [-24, -60], h: [-40, -70] } })],
      [3, 'nightroom', A.moon(160, 30, 10) + A.bed(86, 130, 0.9, { inner: A.person({ x: 12, y: -31, s: 0.6, rot: -90, face: 'sleep', hair: 'neat', pose: 'none' }) }) + A.zzz(60, 70, 0.7) +
        mum({ x: 164, y: CY, s: 0.56, face: 'calm' }) + E(130, 50, 16, '🎵')],
      [4, 'room', mum({ x: 110, y: CY, s: CS + 0.04, face: 'joy', armL: { e: [-26, -66], h: [-8, -58] }, armR: { e: [26, -66], h: [8, -56] } }) + A.baby(108, 78, 0.8) + A.hearts([[60, 50, 0.9], [150, 44, 0.8]])]
    ]);
  };

  S[22] = function () {
    return single('night',
      A.stars([[40, 40, 1.2], [110, 70, 1], [290, 50, 1.2], [360, 90, 1], [200, 30, 1.3], [330, 150, 0.9], [60, 130, 0.9]]) + '<circle cx="205" cy="180" r="150" fill="#fde68a" opacity=".16"/><circle cx="205" cy="180" r="100" fill="#fde68a" opacity=".18" class="glow"/>' +
      A.cloud(80, 70, 1.1) + A.cloud(320, 80, 1.1) +
      A.bubble(200, 60, 120, 40, E(-36, 1, 20, '📜') + L(14, 0, 14, '… … ∞', '#7c2d12')) +
      mum({ x: 170, y: 250, s: 1, face: 'joy', halo: true }) + A.father({ x: 240, y: 250, s: 1, face: 'joy', halo: true }) +
      T(22, { x: 90, y: 274, s: 0.9, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.girl({ x: 320, y: 274, s: 0.86, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship', flip: true }) +
      A.lotus(205, 276, 0.7) + A.hearts([[130, 150, 1], [280, 150, 1]]));
  };

  S[23] = function () {
    return single('room',
      A.windowFrame(60, 80, 76, 66, A.sun(60, 80, 13, { face: false })) + A.lamp(30, 270, 1) +
      A.chair(250, 270, 1.4, { h: 28, flip: true }) + A.grandma({ x: 252, y: 270, s: 1.02, pose: 'sit', flip: true, face: 'joy', patch: true, armR: { e: [30, -64], h: [46, -72] } }) +
      A.chair(340, 270, 1.4, { h: 28, flip: true }) + A.grandpa({ x: 342, y: 270, s: 1.04, pose: 'sit', flip: true, face: 'joy', patch: true }) +
      '<path d="M 300 270 v -60" stroke="#8a5426" stroke-width="4" stroke-linecap="round"/>' +
      A.mat(130, 274, 60) + T(23, { x: 130, y: 272, s: 1.1, pose: 'kneel', face: 'calm', armL: { e: [-6, -60], h: [26, -70] }, armR: { e: [30, -58], h: [36, -70] } }) +
      A.plate(166, 196, 1.2) + A.hearts([[206, 130, 1.2], [300, 100, 1]]) + A.sparkle([[196, 160, 1.4]]));
  };

  S[24] = function () {
    return split(
      ['room', mum({ x: 146, y: PY, s: 0.74, face: 'sad', armL: 'out', holdL: A.pot(-10, 14, 0.7) }) +
        R({ x: 60, y: 264, s: 0.86, pose: 'sitFloor', face: 'happy', armR: 'low', holdR: E(8, 4, 22, '🎮') }) + A.think(64, 120, 80, 38, L(0, 0, 13, 'පස්සේ…', '#57534e'), { fill: '#e5e7eb', tail: 'left' })],
      ['yard', A.sun(40, 44, 16) + A.house(150, 214, 0.6) + mum({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'wave' }) +
        T(24, { x: 70, y: PY, s: 0.88, pose: 'walk', face: 'joy', armR: 'low', holdR: A.pot(6, 22, 0.8), armL: 'down' }) + say(70, 96, 'හරි අම්මේ!', { w: 100, fill: '#dcfce7', stroke: '#86efac', color: '#166534' }) + A.hearts([[116, 150, 0.9]])]
    );
  };

  S[25] = function () {
    return split(
      ['room', A.doorway(158, PY, 0.95, { open: true }) + A.father({ x: 150, y: PY, s: 0.7, face: 'sad' }) +
        A.chair(50, PY, 1.5, { h: 34 }) + R({ x: 54, y: PY - 18, s: 0.84, pose: 'sit', face: 'sly', armL: 'hip', armR: 'hip' })],
      ['room', A.doorway(158, PY, 0.95, { open: true }) + A.father({ x: 146, y: PY, s: 0.72, face: 'joy', armL: { e: [-30, -84], h: [-46, -94] } }) +
        A.chair(30, PY, 1.2, { h: 20 }) + T(25, { x: 80, y: PY, s: 0.86, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[116, 130, 1]])]
    );
  };

  S[26] = function () {
    return split(
      ['room', mum({ x: 146, y: PY, s: 0.74, face: 'sad', armL: 'point' }) + R({ x: 58, y: PY, s: 0.88, face: 'angry', armL: 'cross', armR: 'cross' }) + A.anger(96, 130, 1.1) + E(40, 120, 18, '😤')],
      ['room', mum({ x: 140, y: PY, s: 0.76, face: 'joy', armL: { e: [-30, -90], h: [-52, -104] } }) +
        T(26, { x: 66, y: PY, s: 0.88, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[100, 110, 1.1], [160, 100, 0.8]]) + E(30, 140, 20, '🌱')]
    );
  };

  S[27] = function () {
    return single('nightroom',
      A.stars([[40, 40, 1], [360, 50, 1.1]]) + '<ellipse cx="200" cy="160" rx="150" ry="120" fill="#fde68a" opacity=".16"/>' +
      A.frame(200, 96, 130, 96, E(172, 98, 40, '👩') + E(228, 98, 40, '👨'), { stroke: '#d4a017' }) + A.garlandArc(140, 260, 46, 12, 8) +
      A.lamp(200, 196, 1) + '<rect x="150" y="196" width="100" height="8" fill="#8a5426"/>' + A.lotus(160, 196, 0.35) + A.lotus(240, 196, 0.35) +
      A.chair(330, 270, 1.4, { h: 28, flip: true }) + A.chair(70, 270, 1.4, { h: 28 }) +
      T(27, { x: 200, y: 276, s: 0.98, pose: 'kneel', face: 'sad', armL: 'worship', armR: 'worship' }) + A.hearts([[130, 150, 0.9], [270, 150, 0.9]]));
  };

  S[28] = function () {
    return pair(
      ['dawn', A.sun(150, 60, 22) + mum({ x: 112, y: 250, s: 0.7, face: 'joy' }) + A.father({ x: 158, y: 250, s: 0.7, face: 'joy' }) +
        T(28, { x: 52, y: 268, s: 0.8, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[96, 130, 0.9]]) + A.flyBird(60, 100, 0.8), { tag: '🌅' }],
      ['nightroom', A.moon(150, 56, 14) + A.stars([[60, 60, 1], [110, 90, 0.8]]) + A.lamp(30, 266, 0.8) + mum({ x: 112, y: 250, s: 0.7, face: 'joy' }) + A.father({ x: 158, y: 250, s: 0.7, face: 'joy' }) +
        T(28, { x: 52, y: 268, s: 0.8, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[96, 130, 0.9]]), { tag: '🌙' }]
    );
  };

  S[29] = function () {
    return single('night',
      A.stars([[40, 40, 1.2], [110, 70, 1], [60, 120, 0.9]]) +
      '<path d="M 130 300 Q 220 220 400 180 L 400 300 Z" fill="#fde68a" opacity=".5"/><circle cx="340" cy="120" r="120" fill="#fde68a" opacity=".3"/>' +
      A.school(330, 200, 0.6) + E(330, 100, 30, '🎓') + A.sparkle([[280, 130, 1.4], [380, 140, 1.2], [300, 80, 1]]) +
      A.teacher({ x: 190, y: 262, s: 1, face: 'joy', armR: { e: [34, -96], h: [50, -116] }, holdR: A.lamp(0, -2, 1), armL: { e: [-30, -76], h: [-44, -66] } }) +
      T(29, { x: 118, y: 270, s: 0.96, pose: 'walk', face: 'joy', armR: { e: [26, -58], h: [34, -60] } }) + A.girl({ x: 56, y: 274, s: 0.86, pose: 'walk', face: 'joy' }));
  };

  S[30] = function () {
    return single('class',
      A.blackboard(280, 84, 170, 84, E(240, 76, 26, '🌍') + E(320, 76, 26, '☸️') + L(280, 110, 13, 'මෙලොව · පරලොව', '#fde047')) + A.windowFrame(70, 86, 70, 70, A.sun(70, 86, 14, { face: false })) +
      A.chair(296, 266, 1.4, { h: 28, flip: true }) + A.teacher({ x: 298, y: 266, s: 1, pose: 'sit', flip: true, face: 'joy', armR: { e: [30, -64], h: [48, -78] } }) +
      A.mat(120, 276, 110) + A.girl({ x: 60, y: 274, s: 0.86, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) +
      T(30, { x: 130, y: 276, s: 0.92, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) +
      A.friend({ x: 200, y: 274, s: 0.86, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[230, 150, 1]]));
  };

  S[31] = function () {
    return split(
      ['class', A.teacher({ x: 150, y: PY, s: 0.72, face: 'sad' }) + A.chair(50, PY, 1.2, { h: 20 }) +
        R({ x: 54, y: PY, s: 0.86, pose: 'sit', face: 'sly', armL: 'head', armR: 'head' }) + A.zzz(90, 130, 0.7)],
      ['class', A.teacher({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'wave' }) + A.chair(96, PY, 1.3, { h: 28 }) + arrow(96, 196, 0, '#16a34a') +
        T(31, { x: 46, y: PY, s: 0.86, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + say(70, 100, 'වාඩි වෙන්න', { w: 100, fill: '#fef9c3', stroke: '#fde047' })]
    );
  };

  S[32] = function () {
    return split(
      ['class', A.teacher({ x: 146, y: PY, s: 0.74, face: 'sad', armL: 'eyes' }) + R({ x: 56, y: PY, s: 0.88, face: 'shout', armR: 'point', armL: 'hip' }) +
        say(60, 90, 'එකට එක!', { w: 90, size: 12, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b' }) + E(146, 120, 18, '💔')],
      ['class', A.teacher({ x: 146, y: PY, s: 0.74, face: 'joy', armL: 'wave' }) + T(32, { x: 58, y: PY, s: 0.9, face: 'joy', armL: 'worship', armR: 'worship' }) +
        say(60, 96, 'හොඳයි ගුරුතුමනි', { w: 124, size: 12, fill: '#dcfce7', stroke: '#86efac', color: '#166534' }) + A.hearts([[110, 140, 1]])]
    );
  };

  S[33] = function () {
    return split(
      ['yard', A.teacher({ x: 40, y: PY, s: 0.7, face: 'sad', armR: 'point' }) + sayE(50, 96, '🌱💧', { w: 66 }) + A.sapling(150, 268, 0.9, true) +
        R({ x: 112, y: PY, s: 0.84, face: 'joy', armR: 'up' }) + A.ball(150, 150, 10)],
      ['yard', A.sun(160, 40, 16) + A.teacher({ x: 40, y: PY, s: 0.7, face: 'joy', armR: 'point' }) + sayE(50, 96, '🌱💧', { w: 66 }) + A.sapling(152, 268, 1.2) +
        T(33, { x: 106, y: PY, s: 0.84, face: 'joy', armR: { e: [30, -52], h: [44, -46] }, holdR: E(8, 4, 22, '🚿') }) + A.badge(170, 190, 12, true)]
    );
  };

  S[34] = function () {
    return split(
      ['class', A.blackboard(96, 66, 120, 56, '') + A.teacher({ x: 146, y: PY, s: 0.74, face: 'sad' }) + R({ x: 58, y: PY, s: 0.9, face: 'angry', armL: 'hip', armR: 'hip' }) +
        '<path d="M 78 158 l 40 -8 M 78 166 l 40 -2" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4 4" stroke-linecap="round"/>' + A.anger(40, 140, 1) + E(96, 120, 18, '⚡')],
      ['class', A.blackboard(96, 66, 120, 56, L(96, 66, 14, 'හොඳට හැදෙමු', '#fde047')) + A.teacher({ x: 146, y: PY, s: 0.74, face: 'joy', armL: { e: [-30, -86], h: [-50, -100] } }) +
        T(34, { x: 62, y: PY, s: 0.9, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[104, 130, 1]])]
    );
  };

  S[35] = function () {
    function proud(em, txt) {
      return wallBg(193, 144, '#f3f4f6', '#e5e7eb') + A.teacher({ x: 156, y: CY, s: 0.54, face: 'sad' }) +
        R({ x: 76, y: CY, s: CS, face: 'sly', armL: 'hip', armR: 'hip', top: '#a8a29e' }) + E(76, 40, 24, em) + L(120, 22, 10, txt, '#7f1d1d');
    }
    return grid([
      [false, 'plain', proud('💪', 'තරුණ මානය')],
      [false, 'plain', proud('🏰', 'කුල මානය')],
      [false, 'plain', proud('💰', 'ධන මානය')],
      [true, 'class', A.teacher({ x: 140, y: CY, s: 0.58, face: 'joy', armL: 'wave' }) + T(35, { x: 66, y: CY, s: CS + 0.04, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[104, 50, 0.9]])]
    ]);
  };

  S[36] = function () {
    return split(
      ['room', A.father({ x: 146, y: PY, s: 0.74, face: 'sad' }) + R({ x: 58, y: PY, s: 0.88, face: 'cry', armR: 'point', armL: 'eyes' }) +
        A.bubble(70, 96, 110, 40, E(-34, 1, 18, '👩‍🏫') + E(-6, 1, 18, '😡') + L(28, 0, 11, 'ගැහුවා!', '#991b1b'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['room', A.father({ x: 146, y: PY, s: 0.74, face: 'joy', armL: { e: [-30, -86], h: [-50, -100] } }) + T(36, { x: 62, y: PY, s: 0.9, face: 'calm', armL: 'worship', armR: 'worship' }) +
        say(64, 100, 'වරද මගේ', { w: 92, fill: '#fef9c3', stroke: '#fde047' }) + A.hearts([[110, 140, 1]])]
    );
  };

  S[37] = function () {
    return split(
      ['class', '<rect x="20" y="212" width="152" height="8" rx="3" fill="#b9773f"/><rect x="28" y="220" width="6" height="36" fill="#8a5426"/><rect x="158" y="220" width="6" height="36" fill="#8a5426"/>' +
        A.teacher({ x: 130, y: PY, s: 0.72, pose: 'sit', face: 'sad', flip: true }) + R({ x: 56, y: PY, s: 0.84, pose: 'sit', face: 'shout', armL: 'up' }) + E(96, 110, 20, '📢') +
        '<path d="M 20 150 h 152" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 5"/>' + L(96, 138, 10, 'එක උසට', '#991b1b')],
      ['class', A.chair(136, PY, 1.4, { h: 28, flip: true }) + A.teacher({ x: 138, y: PY, s: 0.78, pose: 'sit', flip: true, face: 'joy', armR: { e: [30, -64], h: [46, -76] } }) +
        A.mat(54, 264, 40) + T(37, { x: 54, y: 264, s: 0.86, pose: 'sitFloor', face: 'joy', armL: 'worship', armR: 'worship' }) + A.hearts([[96, 130, 1]])]
    );
  };

  S[38] = function () {
    function door(x, em, txt, col) {
      return '<rect x="' + (x - 34) + '" y="76" width="68" height="116" rx="34" fill="' + col + '" stroke="#8a5426" stroke-width="5"/><rect x="' + (x - 34) + '" y="110" width="68" height="82" fill="' + col + '" stroke="#8a5426" stroke-width="5"/>' +
        '<rect x="' + (x - 31) + '" y="108" width="62" height="8" fill="' + col + '"/>' + E(x, 118, 30, em) + E(x, 164, 20, '🔒') + L(x, 210, 14, txt, '#3b2a1e', 900);
    }
    return single('plain',
      '<rect width="400" height="300" fill="#fff7e6"/><rect y="226" width="400" height="74" fill="#ead29a"/>' +
      door(90, '🧍', 'කය', '#bfdbfe') + door(200, '💬', 'වචනය', '#bbf7d0') + door(310, '💗', 'සිත', '#fbcfe8') +
      A.teacher({ x: 352, y: 286, s: 0.62, face: 'joy' }) + T(38, { x: 44, y: 288, s: 0.7, face: 'joy', armR: 'up', holdR: E(2, -10, 20, '🗝️') }) +
      A.sparkle([[146, 60, 1.4], [256, 60, 1.4], [200, 40, 1.1]]));
  };

  S[39] = function () {
    return grid([
      [true, 'temple', A.monk({ x: 140, y: CY, s: 0.56, face: 'calm', armL: 'out' }) + T(39, { x: 66, y: CY, s: CS, pose: 'kneel', face: 'calm', armL: 'worship', armR: 'worship' }) + E(104, 50, 18, '👂')],
      [true, 'path', A.grandpa({ x: 140, y: CY, s: 0.56, face: 'joy' }) + T(39, { x: 72, y: CY, s: CS, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' })],
      [true, 'garden', T(39, { x: 60, y: CY, s: CS, face: 'joy', armR: 'out' }) + A.friend({ x: 110, y: CY, s: 0.58, face: 'joy', armL: 'out', armR: 'out' }) + A.girl({ x: 158, y: CY, s: 0.56, face: 'joy', armL: 'out' }) + A.hearts([[84, 40, 0.8], [134, 40, 0.8]])],
      [true, 'class', A.teacher({ x: 140, y: CY, s: 0.56, face: 'joy' }) + T(39, { x: 70, y: CY, s: CS, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' }) + A.hearts([[104, 50, 0.8]])]
    ]);
  };

  S[40] = function () {
    return split(
      ['road', A.house(40, 200, 0.6) + mum({ x: 40, y: 236, s: 0.6, face: 'cry', armR: 'out' }) + A.car(150, 288, 0.8, '#ef4444', true) + E(110, 180, 20, '❗') +
        R({ x: 110, y: 274, s: 0.8, pose: 'run', face: 'shout', armL: 'up', armR: 'up' })],
      ['room', mum({ x: 146, y: PY, s: 0.74, face: 'joy', armL: 'low', holdL: A.broom(-4, -10, 0.7, -10) }) +
        T(40, { x: 60, y: PY, s: 0.88, face: 'joy', armR: 'low', holdR: E(8, 8, 24, '🧺'), armL: 'down' }) + A.openBook(30, 270, 0.7) + A.hearts([[104, 130, 1]]) + E(170, 60, 20, '📈')]
    );
  };

  S[41] = function () {
    return split(
      ['path', A.grandpa({ x: 146, y: PY, s: 0.76, face: 'sad', armL: 'eyes', holdR: '<path d="M 0 0 v 50" stroke="#8a5426" stroke-width="4" stroke-linecap="round"/>' }) +
        R({ x: 52, y: PY, s: 0.86, face: 'joy', armR: 'up', armL: 'point' }) + A.stone(84, 140, 6) + '<path d="M 92 142 q 20 -10 34 14" stroke="#57534e" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>' + haha(60, 80)],
      ['path', A.sun(40, 44, 16) + A.grandpa({ x: 140, y: PY, s: 0.76, face: 'joy', armL: { e: [-30, -78], h: [-44, -66] }, holdR: '<path d="M 0 0 v 50" stroke="#8a5426" stroke-width="4" stroke-linecap="round"/>' }) +
        T(41, { x: 72, y: PY, s: 0.88, face: 'joy', armR: { e: [26, -58], h: [36, -60] } }) + A.hearts([[104, 120, 1.1], [160, 90, 0.8]])]
    );
  };

  S[42] = function () {
    return split(
      ['yard', A.fence(0, 250, 192) + aunty({ x: 146, y: PY + 10, s: 0.7, face: 'wow' }) + R({ x: 58, y: PY + 10, s: 0.86, face: 'sly', armR: 'mouth' }) +
        A.bubble(86, 86, 120, 46, E(-34, 0, 22, '👩') + E(-4, 0, 22, '👨') + E(32, 0, 22, '👎'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      ['yard', A.sun(160, 40, 16) + A.house(130, 230, 0.9) + T(42, { x: 56, y: PY + 8, s: 0.86, face: 'calm', pose: 'walk', armR: 'mouth' }) +
        sayE(60, 110, '🤐', { w: 50 }) + arrow(84, 224, 18, '#16a34a') + A.hearts([[130, 110, 1]])]
    );
  };

  S[43] = function () {
    return grid([
      [false, 'room', R({ x: 60, y: CY, s: CS, face: 'shout', armR: 'point' }) + aunty({ x: 150, y: CY, s: 0.54, face: 'sad' }) + A.bubble(96, 36, 80, 30, E(-16, 1, 15, '🗯️') + E(14, 1, 15, '🙈'), { fill: '#fee2e2', stroke: '#fca5a5' })],
      [true, 'room', mum({ x: 140, y: CY, s: 0.56, face: 'joy', armL: 'point' }) + T(43, { x: 70, y: CY, s: CS, pose: 'bow', face: 'calm', armL: 'worship', armR: 'worship' })],
      [false, 'night', A.moon(30, 60, 10) + A.house(140, 122, 0.6) + mum({ x: 96, y: 126, s: 0.42, face: 'sad' }) + R({ x: 40, y: CY, s: 0.5, face: 'joy', armR: 'up' }) + A.clock(168, 30, 13, 10, 0)],
      [false, 'path', A.house(40, 110, 0.5) + R({ x: 130, y: CY, s: CS, pose: 'walk', face: 'angry', armR: 'up', holdR: '<path d="M 0 0 l 14 -16" stroke="#8a5426" stroke-width="3"/>' + E(18, -22, 16, '🎒') }) + A.anger(100, 50, 0.8)]
    ]);
  };

  S[44] = function () {
    return grid([
      [false, 'yard', A.hut(130, 130, 0.9, '🍬', '#fde68a') + R({ x: 50, y: CY, s: CS, face: 'greedy', armL: 'hip', armR: 'hip' }) + A.clock(168, 60, 12, 5, 0)],
      [false, 'plain', wallBg(193, 144, '#fde9c8', '#c9b58d') + A.doorway(110, 132, 0.95, { open: true }) + R({ x: 110, y: 132, s: CS, pose: 'sitFloor', face: 'happy', armR: 'mouth' }) + A.plate(140, 130, 0.7)],
      [false, 'river', A.boat(130, 100, 0.8) + R({ x: 50, y: 130, s: CS, pose: 'sitFloor', face: 'sly' }) + A.zzz(80, 50, 0.6)],
      [false, 'night', A.moon(160, 34, 10) + A.tree(150, 130, 0.7) + A.person({ x: 110, y: 126, s: 0.6, rot: -90, face: 'sleep', hair: 'messy', top: '#a8a29e', topLine: '#78716c', bottom: '#57534e', shoes: 'none' }) + A.zzz(50, 70, 0.7) + E(160, 110, 16, '🦟')]
    ]);
  };

  S[45] = function () {
    return grid([
      [false, 'room', uncle({ x: 120, y: CY, s: 0.54, face: 'sly', armR: 'mouth' }) + aunty({ x: 160, y: CY, s: 0.52, face: 'wow' }) + A.doorway(40, 132, 0.9) + R({ x: 66, y: CY, s: 0.54, face: 'sly', armR: 'head' }) + E(90, 40, 18, '👂')],
      [false, 'room', mum({ x: 140, y: CY, s: 0.56, face: 'sad', armL: 'point' }) + R({ x: 64, y: CY, s: CS, face: 'angry', armL: 'cross', armR: 'cross' }) + A.anger(100, 50, 0.8)],
      [false, 'room', mum({ x: 140, y: CY, s: 0.56, face: 'sad', armL: 'eyes' }) + R({ x: 64, y: CY, s: CS, face: 'shout', armL: 'up', armR: 'up' }) + E(104, 40, 18, '📢')],
      [true, 'room', mum({ x: 140, y: CY, s: 0.56, face: 'joy', armL: 'out' }) + T(45, { x: 64, y: CY, s: CS, face: 'calm', armL: 'worship', armR: 'worship' }) + E(104, 44, 18, '👂') + A.hearts([[104, 76, 0.8]])]
    ]);
  };

  S[46] = function () {
    return grid([
      [false, 'road', R({ x: 60, y: 128, s: CS, face: 'sly', armL: 'hip', armR: 'hip' }) + R({ x: 110, y: 128, s: 0.56, face: 'joy', top: '#d6d3d1', armL: 'hip' }) + A.clock(160, 30, 13, 4, 30) + A.zzz(130, 60, 0.5)],
      [true, 'path', A.school(140, 106, 0.4) + T(46, { x: 66, y: CY, s: CS + 0.04, pose: 'walk', face: 'calm' }) + A.bag(34, 132, 0.5)],
      [false, 'night', A.moon(160, 30, 10) + A.tree(30, 130, 0.7) + E(150, 80, 24, '👻') + E(40, 50, 18, '🦇') + R({ x: 96, y: CY, s: CS, face: 'cry', armL: 'eyes', armR: 'eyes' })],
      [false, 'river', R({ x: 96, y: 96, s: 0.56, face: 'wow', armL: 'up', armR: 'up' }) + A.water(0, 96, 193, 40, true) + splash(96, 100, 0.7) + E(160, 40, 18, '⚠️')]
    ]);
  };

  S[47] = function () {
    return grid([
      [false, 'room', A.table(110, 134, 0.8, 56) + A.plate(116, 98, 1) + A.chair(54, 134, 0.8, { h: 18 }) + R({ x: 58, y: 134, s: CS, pose: 'sit', face: 'sleep' }) + A.zzz(80, 50, 0.7)],
      [true, 'room', A.chair(54, 134, 0.8, { h: 18 }) + T(47, { x: 58, y: 134, s: CS, pose: 'sit', face: 'joy', armR: 'low' }) + A.desk(100, 134, 0.75) + A.openBook(100, 102, 0.6, { glow: true }) + A.lamp(160, 130, 0.6)],
      [false, 'room', A.table(116, 134, 0.8, 50) + A.plate(116, 98, 1) + R({ x: 50, y: CY, s: CS, face: 'sad' }) + A.think(70, 34, 84, 38, E(-18, 0, 18, '🤢') + E(18, 0, 18, '🐛'), { fill: '#e5e7eb', tail: 'left' })],
      [true, 'nightroom', A.moon(160, 30, 10) + A.bed(90, 132, 0.95, { inner: A.person({ x: 12, y: -31, s: 0.6, rot: -90, face: 'sleep', hair: 'neat', pose: 'none' }) }) + A.think(110, 50, 96, 44, E(-24, 0, 18, '🌸') + E(0, 0, 18, '💗') + E(24, 0, 18, '☸️'), { tail: 'left' })]
    ]);
  };

  S[48] = function () {
    return grid([
      [true, 'room', A.bed(90, 132, 0.95, { inner: A.person({ x: 12, y: -31, s: 0.6, rot: -90, face: 'calm', hair: 'neat', pose: 'none' }) }) + E(40, 70, 22, '🌡️') + E(160, 60, 24, '💊') + mum({ x: 166, y: 132, s: 0.46, face: 'joy' })],
      [false, 'room', R({ x: 60, y: CY, s: CS, face: 'happy', armR: 'give', holdR: E(8, 0, 20, '🍎') }) + '<path d="M 100 84 l 8 -6" stroke="#fff" stroke-width="5"/>' + A.girl({ x: 140, y: CY, s: 0.56, face: 'sad', armL: 'eyes' }) + L(110, 30, 10, 'කෑ ඉතිරිය', '#7f1d1d')],
      [true, 'room', A.bed(116, 132, 0.85, { inner: A.person({ x: 12, y: -31, s: 0.6, rot: -90, face: 'happy', hair: 'girl', pose: 'none' }), blanketColor: '#f9a8d4' }) +
        T(48, { x: 40, y: CY, s: CS, face: 'joy', armR: 'give', holdR: E(6, -2, 18, '🍊') }) + A.hearts([[90, 40, 0.8]])],
      [true, 'room', A.chair(140, 132, 0.9, { h: 26, flip: true }) + A.grandpa({ x: 142, y: 132, s: 0.56, pose: 'sit', flip: true, face: 'joy' }) + E(168, 50, 18, '🤒') +
        T(48, { x: 60, y: CY, s: CS, face: 'joy', armR: 'wave' }) + sayE(70, 40, '😊🌸', { w: 66 })]
    ]);
  };

  S[49] = function () {
    return split(
      ['temple', A.stupa(150, 232, 0.7) + R({ x: 70, y: PY, s: PS, face: 'sly', top: '#f87171', topLine: '#dc2626' }) +
        '<rect x="50" y="198" width="40" height="14" fill="#e8a877"/><circle cx="70" cy="206" r="2" fill="#c9834f"/>' +
        '<path d="M 46 166 Q 70 132 94 166 L 94 174 L 46 174 Z" fill="#1f2937"/><path d="M 88 172 h 22 v 5 h -22 Z" fill="#1f2937"/>' + A.ban(150, 130, 18, E(0, 1, 16, '🧢'))],
      ['temple', A.sun(40, 44, 16) + A.stupa(150, 232, 0.7) + T(49, { x: 70, y: PY, s: PS, face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(70, 196, 0.5) + A.sparkle([[30, 150, 1.2], [116, 140, 1.1]])]
    );
  };

  S[50] = function () {
    return grid([
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + R({ x: 60, y: CY, s: CS, face: 'greedy', top: '#f0abfc', topLine: '#c026d3', armR: 'give' }) + E(110, 70, 22, '💸') + E(150, 60, 30, '👗') + E(150, 110, 26, '👟')],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + R({ x: 96, y: CY, s: CS + 0.06, face: 'tired', top: '#f87171', topLine: '#dc2626', sash: '#facc15', tie: '#22c55e' }) + E(96, 28, 22, '🎩') + E(60, 90, 18, '🧣') + E(136, 90, 18, '🧥') + A.sweat(130, 50)],
      [true, 'plain', wallBg(193, 144, '#ecfdf5', '#d1fae5') + A.person({ x: 56, y: CY, s: CS, hair: 'neat', top: '#fdba74', topLine: '#fb923c', bottom: '#7c5a3a', shoes: 'none', face: 'joy' }) + E(56, 30, 16, '🏠') +
        '<path d="M 96 30 v 100" stroke="#86efac" stroke-width="2" stroke-dasharray="5 5"/>' + T(50, { x: 140, y: CY, s: CS, face: 'joy' }) + E(140, 30, 16, '🚌')],
      [true, 'garden', T(50, { x: 66, y: CY, s: CS, face: 'joy', armR: 'wave' }) + A.girl({ x: 130, y: CY, s: 0.56, face: 'joy', armL: 'wave' }) + A.sparkle([[100, 40, 1.1]])]
    ]);
  };

  S[51] = function () {
    return split(
      ['gloom', A.house(70, 214, 0.8, { wall: '#d6d3d1', roof: '#78716c' }) + A.fence(0, 268, 192, { broken: true }) + A.rubbish(40, 250, 0.9) + A.rubbish(160, 244, 0.8) +
        A.cow(136, 290, 0.6) + flies(60, 200) + flies(150, 190)],
      ['garden', A.sun(160, 40, 16) + A.house(70, 214, 0.8) + A.flower(140, 250, 1) + A.flower(164, 254, 1, '#fbbf24') + A.bush(20, 250, 0.9) + A.fence(0, 284, 192) +
        T(51, { x: 130, y: 250, s: 0.6, face: 'joy', armR: 'low', holdR: A.broom(2, -12, 0.7, 10) }) + A.sparkle([[30, 150, 1.2], [110, 130, 1]])]
    );
  };

  S[52] = function () {
    return grid([
      [false, 'room', A.broom(96, 120, 0.9, 80) + aunty({ x: 160, y: CY, s: 0.5, face: 'wow' }) + E(60, 60, 18, '❗') + L(96, 30, 10, 'ඉලපත මැද', '#7f1d1d')],
      [false, 'plain', wallBg(193, 144, '#fde9c8', '#c9b58d') + A.doorway(96, 128, 0.95, { open: true }) + '<rect x="60" y="124" width="72" height="8" fill="#8a5426"/>' + R({ x: 96, y: 126, s: 0.56, pose: 'sitFloor', face: 'happy', armR: 'mouth' }) + A.plate(140, 134, 0.7)],
      [true, 'nightroom', A.moon(160, 30, 10) + A.pot(150, 130, 1) + A.cup(120, 130, 1) + A.bed(64, 132, 0.7, { inner: A.person({ x: 12, y: -31, s: 0.6, rot: -90, face: 'sleep', hair: 'neat', pose: 'none' }) }) + E(150, 70, 18, '💧')],
      [true, 'nightroom', '<circle cx="110" cy="90" r="60" fill="#fde68a" opacity=".25"/>' + T(52, { x: 80, y: CY, s: CS, pose: 'walk', face: 'calm', armR: 'give', holdR: A.lamp(6, 0, 0.6) })]
    ]);
  };

  S[53] = function () {
    return grid([
      [false, 'room', A.rubbish(40, 130, 0.9) + A.rubbish(160, 128, 0.7) + flies(100, 70) + E(100, 110, 18, '🐀')],
      [false, 'plain', wallBg(193, 144, '#fde9c8', '#c9b58d') + A.doorway(96, 130, 0.95, { open: true }) + A.hoe(80, 132, 0.8, 70) + A.broom(130, 124, 0.6, -80) + R({ x: 150, y: CY, s: 0.5, pose: 'run', face: 'wow' }) + E(150, 40, 16, '💥')],
      [false, 'yard', A.house(60, 124, 0.7) + '<rect x="106" y="84" width="70" height="42" fill="#a8a29e" stroke="#57534e" stroke-width="2"/><path d="M 116 84 v 42 M 128 84 v 42 M 140 84 v 42 M 152 84 v 42 M 164 84 v 42" stroke="#57534e" stroke-width="2"/>' + E(126, 110, 20, '🐖') + E(158, 110, 18, '🐓') + stink(140, 80)],
      [true, 'garden', A.house(40, 116, 0.5) + A.anthill(140, 130, 1, true) + A.father({ x: 96, y: CY, s: 0.54, face: 'joy', armR: 'low', holdR: A.hoe(4, 0, 0.5, 20) }) + A.badge(168, 60, 11, true)]
    ]);
  };

  S[54] = function () {
    return grid([
      [false, 'room', '<rect x="30" y="112" width="44" height="18" rx="6" fill="#a8a29e" transform="rotate(-8 50 120)"/><rect x="100" y="106" width="50" height="22" rx="6" fill="#78716c" transform="rotate(10 124 118)"/>' + flies(90, 70) + stink(150, 96) + aunty({ x: 168, y: 126, s: 0.44, face: 'sad' })],
      [false, 'room', A.table(116, 134, 0.8, 56) + A.plate(116, 98, 1.2, { empty: true }) + R({ x: 50, y: CY, s: CS, face: 'happy', armR: { e: [30, -50], h: [56, -52] }, holdR: '<rect x="-8" y="-6" width="18" height="12" rx="3" fill="#78716c"/><circle cx="2" cy="0" r="3" fill="#57534e"/>' })],
      [false, 'plain', wallBg(193, 144, '#f3f4f6', '#e5e7eb') + R({ x: 96, y: CY + 8, s: CS + 0.12, face: 'sad', patch: true }) + '<path d="M 82 80 l 8 10 l -6 4 M 108 96 l -8 8" stroke="#1c1917" stroke-width="2" fill="none"/>'],
      [false, 'road', R({ x: 96, y: 128, s: CS, pose: 'walk', face: 'joy', top: '#f0abfc', topLine: '#c026d3', bottom: '#facc15', tie: '#22c55e' }) + E(96, 50, 22, '🤡') + E(150, 60, 18, '😆') + E(40, 70, 18, '😆')]
    ]);
  };

  S[55] = function () {
    return split(
      ['yard', '<path d="M 60 120 h 80 M 70 120 v 130 M 130 120 v 130" stroke="#8a5426" stroke-width="5"/><path d="M 88 120 v 90 M 112 120 v 90" stroke="#57534e" stroke-width="2"/><rect x="82" y="208" width="36" height="7" rx="3" fill="#ef4444"/>' +
        R({ x: 100, y: 250, s: 0.74, pose: 'sit', face: 'joy', armL: 'up', armR: 'up' }) + A.girl({ x: 30, y: 270, s: 0.66, face: 'cry', armL: 'eyes', armR: 'eyes' }) + A.friend({ x: 166, y: 270, s: 0.66, face: 'sad' }) + A.anger(150, 190, 0.9)],
      ['yard', A.sun(160, 40, 16) + '<path d="M 60 120 h 80 M 70 120 v 130 M 130 120 v 130" stroke="#8a5426" stroke-width="5"/><path d="M 88 120 v 90 M 112 120 v 90" stroke="#57534e" stroke-width="2"/><rect x="82" y="208" width="36" height="7" rx="3" fill="#ef4444"/>' +
        A.girl({ x: 100, y: 250, s: 0.7, pose: 'sit', face: 'joy', armL: 'up', armR: 'up' }) + T(55, { x: 34, y: 270, s: 0.74, face: 'joy', armR: 'out' }) + A.friend({ x: 164, y: 270, s: 0.68, face: 'joy', armL: 'wave' }) + A.hearts([[100, 100, 1]])]
    );
  };

  S[56] = function () {
    return split(
      ['yard', A.doorway(40, PY, 0.95, { open: true }) + R({ x: 60, y: PY, s: 0.84, face: 'sly', armR: 'point' }) + haha(80, 90) +
        A.grandma({ x: 136, y: PY, s: 0.72, face: 'sad', patch: true }) + A.person({ x: 172, y: PY, s: 0.6, hair: 'messy', top: '#d6d3d1', topLine: '#a8a29e', bottom: '#78716c', patch: true, shoes: 'none', face: 'sad' })],
      ['room', A.chair(150, PY, 1.3, { h: 28, flip: true }) + A.grandma({ x: 152, y: PY, s: 0.74, pose: 'sit', flip: true, face: 'joy', patch: true }) +
        T(56, { x: 66, y: PY, s: 0.88, face: 'joy', armR: 'give', holdR: A.plate(8, 0, 1) }) + A.cup(110, 262, 1, '#fff', { steam: true }) + A.hearts([[110, 130, 1.1], [160, 100, 0.8]])]
    );
  };

  S[57] = function () {
    return grid([
      [true, 'road', A.grandpa({ x: 120, y: 128, s: 0.56, face: 'joy', glasses: true, armL: { e: [-26, -70], h: [-36, -60] }, holdR: '<path d="M 0 0 l 8 40" stroke="#fff" stroke-width="3"/><path d="M 6 30 l 2 10" stroke="#dc2626" stroke-width="3"/>' }) + T(57, { x: 70, y: 128, s: CS, pose: 'walk', face: 'joy', armR: { e: [24, -58], h: [32, -60] } }) + E(160, 50, 18, '🚸')],
      [true, 'yard', uncle({ x: 130, y: CY, s: 0.56, face: 'joy', armL: 'out', holdR: A.hoe(4, 0, 0.5, 10) }) + A.sweat(150, 40) + T(57, { x: 64, y: CY, s: CS, face: 'joy', armR: 'give', holdR: A.cup(6, 0, 0.9) })],
      [true, 'path', A.person({ x: 134, y: CY, s: 0.84 * 0.62, adult: true, hair: 'messy', top: '#d6d3d1', topLine: '#a8a29e', bottom: '#78716c', wear: 'sarong', patch: true, shoes: 'none', face: 'joy', armL: 'out' }) + E(164, 110, 18, '🎒') +
        T(57, { x: 64, y: CY, s: CS, face: 'joy', armR: 'give', holdR: A.plate(6, 0, 0.7) }) + A.hearts([[100, 46, 0.8]])],
      [true, 'gloom', A.cloud(150, 40, 0.7, '#6b7280') + E(150, 60, 16, '⚡') + A.girl({ x: 110, y: CY, s: 0.5, face: 'cry', armL: 'eyes', armR: 'eyes' }) +
        T(57, { x: 70, y: CY, s: CS, face: 'calm', armR: { e: [30, -60], h: [48, -50] } }) + say(70, 34, 'බය වෙන්න එපා', { w: 110, size: 11, fill: '#fef9c3', stroke: '#fde047' })]
    ]);
  };

  S[58] = function () {
    return split(
      ['class', A.teacher({ x: 150, y: PY, s: 0.7, face: 'sad' }) + R({ x: 46, y: PY, s: 0.8, face: 'joy', armR: 'point' }) + R({ x: 100, y: PY, s: 0.78, face: 'sly', top: '#d6d3d1', armL: 'mouth' }) +
        haha(60, 96) + E(100, 140, 18, '😜') + E(130, 110, 16, '👉')],
      ['class', A.blackboard(60, 66, 90, 50, L(60, 66, 13, 'පාඩම', '#fde047')) + A.teacher({ x: 150, y: PY, s: 0.72, face: 'joy', armL: 'out' }) +
        A.mat(70, 264, 60) + T(58, { x: 50, y: 264, s: 0.8, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) + A.girl({ x: 104, y: 264, s: 0.74, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) + E(84, 140, 18, '👂')]
    );
  };

  S[59] = function () {
    function sign(x, ok, em, txt, col) {
      return '<rect x="' + (x - 50) + '" y="36" width="100" height="84" rx="14" fill="#fff" stroke="' + col + '" stroke-width="4"/>' + E(x, 68, 30, em) + L(x, 102, 12, txt, '#3b2a1e', 900) + (ok === null ? '' : A.badge(x + 40, 40, 12, ok));
    }
    return single('temple',
      A.stupa(60, 234, 0.6) + A.boTree(350, 236, 0.7) +
      sign(90, false, '🌧️', 'පව් නොකරමු', '#fca5a5') + sign(200, true, '🌞', 'පින් කරමු', '#86efac') + sign(310, true, '💗', 'සිත පිරිසිදු කරමු', '#f9a8d4') +
      A.mat(200, 278, 150) + A.girl({ x: 110, y: 276, s: 0.86, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) +
      T(59, { x: 200, y: 278, s: 0.94, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) +
      A.friend({ x: 290, y: 276, s: 0.86, pose: 'sitFloor', face: 'calm', armL: 'worship', armR: 'worship' }) + A.lotus(200, 190, 0.6) + A.hearts([[150, 170, 0.9], [250, 170, 0.9]]));
  };

  S[60] = function () {
    return split(
      ['garden', A.tree(150, 240, 1, { fruit: '#f97316' }) + R({ x: 100, y: PY, s: 0.8, face: 'sly', armR: 'point', top: '#d6d3d1' }) +
        say(80, 90, 'ගෙඩි හොරකම් කරමු', { w: 140, size: 11, fill: '#fee2e2', stroke: '#fca5a5', color: '#991b1b' }) +
        R({ x: 40, y: PY, s: 0.8, face: 'joy', armL: 'up', armR: 'up' }) + E(40, 150, 18, '🐑')],
      ['garden', A.sun(160, 40, 16) + T(60, { x: 96, y: PY, s: PS, face: 'happy', armR: 'up', holdR: E(2, -12, 26, '🔍'), armL: 'hip' }) +
        A.think(96, 80, 130, 56, A.badge(-36, 0, 14, false) + L(0, 0, 14, 'ද?', '#3b2a1e', 900) + A.badge(36, 0, 14, true), { tail: 'left' }) + A.sparkle([[30, 170, 1.2], [164, 180, 1.1]])]
    );
  };

  S[61] = function () {
    return split(
      ['class', A.desk(60, PY, 1) + A.desk(134, PY, 1) + A.girl({ x: 140, y: PY - 2, s: 0.7, face: 'sad', armL: 'low' }) + '<rect x="122" y="214" width="24" height="6" fill="#fff" stroke="#cbd5e1"/>' +
        R({ x: 60, y: PY - 2, s: 0.74, face: 'sly', armR: 'low' }) + '<path d="M 76 176 q 24 10 50 36" stroke="#dc2626" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/>' + E(60, 110, 18, '👀') + A.ban(150, 90, 22, E(0, 1, 22, '🏆'))],
      ['class', A.rays(96, 110, 110, '#fff3b0') + E(96, 96, 40, '🏆') + T(61, { x: 96, y: PY, s: PS, face: 'joy', armL: 'up', armR: 'up' }) +
        A.openBook(40, 266, 0.8) + A.pencil(160, 256, 1.1, 20) + A.sparkle([[30, 120, 1.3], [160, 130, 1.3]])]
    );
  };

  S[62] = function () {
    return single('night',
      A.stars([[40, 60, 1.2], [110, 40, 1], [300, 40, 1.2], [200, 50, 1], [250, 90, 0.9], [150, 96, 0.9]]) + A.fullMoon(340, 70, 28) + '<circle cx="200" cy="200" r="170" fill="#fde68a" opacity=".14"/><circle cx="200" cy="200" r="110" fill="#fde68a" opacity=".16" class="glow"/>' +
      '<path d="M 0 40 Q 200 80 400 40" stroke="#fde68a" stroke-width="1.5" fill="none"/>' +
      A.lantern(50, 110, 1, '#f43f5e') + A.lantern(126, 124, 1, '#f59e0b') + A.lantern(200, 128, 1.1, '#22c55e') + A.lantern(274, 124, 1, '#3b82f6') + A.lantern(350, 118, 0.9, '#a855f7') +
      A.stupa(60, 236, 0.6) + A.confetti(400, 300, 26) +
      A.person({ x: 40, y: 274, s: 0.68, face: 'joy', hair: 'neat', top: '#fde68a', topLine: '#f59e0b', bottom: '#b45309', armL: 'up', armR: 'up' }) +
      A.friend({ x: 316, y: 270, s: 0.9, face: 'joy', armL: 'up', armR: 'up' }) + A.girl({ x: 368, y: 274, s: 0.68, face: 'joy', bottom: '#7c3aed', armL: 'up', armR: 'up' }) +
      A.lotus(200, 292, 1) + A.girl({ x: 250, y: 270, s: 1.08, face: 'joy', armL: 'up', armR: 'up', garland: true, halo: true }) +
      T(62, { x: 150, y: 270, s: 1.14, face: 'joy', armL: 'up', armR: 'up' }) + E(150, 120, 26, '👑') + E(250, 126, 24, '👑') + A.hearts([[200, 170, 1.2]]));
  };

  global.Scenes.register(2, S, look);
})(window);
