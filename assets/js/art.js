/* සිරිත් මල්දම — drawing library.
   Every function returns an SVG string. Characters are anchored at their feet. */
(function (global) {
  'use strict';

  var uid = 0;
  function nid(p) { uid += 1; return p + '_' + uid; }
  function r1(n) { return Math.round(n * 10) / 10; }

  var C = {
    skin: '#e8a877', skinD: '#c9834f', hair: '#2a1a12', grey: '#b8bcc4',
    red: '#ef4444', green: '#22c55e', blue: '#3b82f6', gold: '#f59e0b',
    ink: '#3b2a1e', white: '#ffffff', leaf: '#4caf50', leafD: '#2e7d32',
    wood: '#b9773f', woodD: '#8a5426'
  };

  /* ---------- tiny helpers ---------- */
  function g(inner, tf, extra) {
    return '<g' + (tf ? ' transform="' + tf + '"' : '') + (extra ? ' ' + extra : '') + '>' + inner + '</g>';
  }
  function at(x, y, s, inner, flip) {
    s = s || 1;
    return g(inner, 'translate(' + r1(x) + ' ' + r1(y) + ') scale(' + (flip ? -s : s) + ' ' + s + ')');
  }
  function emoji(x, y, size, ch, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" dominant-baseline="central" class="emo"' + (extra || '') + '>' + ch + '</text>';
  }
  function label(x, y, size, txt, fill, weight) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" dominant-baseline="central" class="si" font-weight="' + (weight || 800) + '" fill="' + (fill || C.ink) + '">' + txt + '</text>';
  }

  /* ---------- people ---------- */
  var ARM = {
    down:    { e: [4, 16],   h: [5, 31] },
    wave:    { e: [15, 0],   h: [21, -24] },
    up:      { e: [9, -14],  h: [13, -34] },
    out:     { e: [14, 6],   h: [29, 2] },
    give:    { e: [12, 14],  h: [28, 10] },
    hip:     { e: [15, 12],  h: [4, 23] },
    point:   { e: [14, -2],  h: [30, -8] },
    low:     { e: [10, 16],  h: [22, 26] }
  };

  function person(o) {
    var p = {
      x: 100, y: 230, s: 1, adult: false, skin: C.skin, hair: 'neat', hairColor: C.hair,
      top: '#ffffff', topLine: '#cbd5e1', bottom: '#2563eb', wear: 'shorts',
      face: 'happy', pose: 'stand', armL: 'down', armR: 'down', flip: false, rot: 0,
      garland: false, halo: false, dirty: false, patch: false, collar: false, tie: false,
      glasses: false, sash: null, holdR: '', holdL: '', shoes: '#3b2a1e', blush: true
    };
    for (var k in o) { if (Object.prototype.hasOwnProperty.call(o, k)) p[k] = o[k]; }

    var K = p.adult
      ? { hip: -60, sh: -104, neck: -109, hy: -126, hr: 16, tw: 17, arm: 1.18, lw: 9 }
      : { hip: -38, sh: -69, neck: -73, hy: -92, hr: 20, tw: 15, arm: 1, lw: 8 };

    var drop = 0;
    if (p.pose === 'sitFloor') drop = -K.hip - 9;
    else if (p.pose === 'kneel') drop = -K.hip - 17;
    else if (p.pose === 'sit') drop = -K.hip - (p.adult ? 40 : 27);
    var hip = K.hip + drop, sh = K.sh + drop, neck = K.neck + drop, hy = K.hy + drop;

    var out = '';

    /* halo behind everything */
    if (p.halo) {
      out += '<circle cx="0" cy="' + (hy + 30) + '" r="' + (K.hr + 34) + '" fill="#fde68a" opacity=".4" class="glow"/>';
    }

    /* legs */
    var legs = '';
    var skinLeg = 'stroke="' + p.skin + '" stroke-width="' + K.lw + '" stroke-linecap="round" fill="none"';
    var long = (p.wear === 'sarong' || p.wear === 'saree' || p.wear === 'robe' || p.wear === 'trousers');
    var legCol = p.wear === 'trousers' ? 'stroke="' + p.bottom + '" stroke-width="' + (K.lw + 3) + '" stroke-linecap="round" fill="none"' : skinLeg;
    function shoe(x, y, dir) {
      if (p.shoes === 'none') return '<ellipse cx="' + (x + 3 * dir) + '" cy="' + (y - 1) + '" rx="7" ry="4" fill="' + p.skin + '"/>';
      return '<ellipse cx="' + (x + 3 * dir) + '" cy="' + (y - 2) + '" rx="8" ry="4.5" fill="' + p.shoes + '"/>';
    }
    if (p.pose === 'stand' || p.pose === 'bow') {
      legs += '<path d="M -7 ' + hip + ' L -7 -4" ' + legCol + '/><path d="M 7 ' + hip + ' L 7 -4" ' + legCol + '/>' + shoe(-7, 0, 1) + shoe(7, 0, 1);
    } else if (p.pose === 'walk') {
      legs += '<path d="M -5 ' + hip + ' L -13 -4" ' + legCol + '/><path d="M 5 ' + hip + ' L 13 -4" ' + legCol + '/>' + shoe(-13, 0, 1) + shoe(13, 0, 1);
    } else if (p.pose === 'run') {
      legs += '<path d="M -4 ' + hip + ' Q -12 ' + (hip + 18) + ' -26 ' + (hip + 22) + '" ' + legCol + '/><path d="M 5 ' + hip + ' L 18 -5" ' + legCol + '/>' + shoe(-28, hip + 24, -1) + shoe(18, -1, 1);
    } else if (p.pose === 'sit') {
      var kx = p.adult ? 26 : 22;
      legs += '<path d="M -4 ' + hip + ' L ' + (kx - 4) + ' ' + hip + ' L ' + (kx - 4) + ' -4" ' + legCol + ' stroke-linejoin="round"/>' +
              '<path d="M 4 ' + (hip + 2) + ' L ' + (kx + 2) + ' ' + (hip + 2) + ' L ' + (kx + 2) + ' -4" ' + legCol + ' stroke-linejoin="round"/>' + shoe(kx - 4, 0, 1) + shoe(kx + 2, 0, 1);
    } else if (p.pose === 'sitFloor') {
      legs += '<path d="M -8 ' + (hip + 2) + ' Q -30 ' + (hip + 4) + ' -6 -3" ' + legCol + '/><path d="M 8 ' + (hip + 2) + ' Q 30 ' + (hip + 4) + ' 6 -3" ' + legCol + '/>';
    } else if (p.pose === 'kneel') {
      legs += '<path d="M -5 ' + hip + ' L 2 -5 L -26 -4" ' + legCol + ' stroke-linejoin="round"/>' + shoe(-28, 0, -1);
    }

    /* lower clothes */
    var lower = '';
    var tw = K.tw;
    if (p.wear === 'shorts') {
      if (p.pose === 'sit') lower += '<path d="M -' + tw + ' ' + (hip - 6) + ' L ' + (tw - 2) + ' ' + (hip - 6) + ' L 18 ' + (hip - 5) + ' L 18 ' + (hip + 8) + ' L -' + tw + ' ' + (hip + 8) + ' Z" fill="' + p.bottom + '"/>';
      else if (p.pose === 'sitFloor') lower += '<path d="M -' + (tw + 6) + ' ' + (hip + 9) + ' Q 0 ' + (hip - 12) + ' ' + (tw + 6) + ' ' + (hip + 9) + ' Z" fill="' + p.bottom + '"/>';
      else lower += '<path d="M -' + tw + ' ' + (hip - 6) + ' L ' + tw + ' ' + (hip - 6) + ' L ' + (tw + 1) + ' ' + (hip + 13) + ' L 1 ' + (hip + 13) + ' L 0 ' + (hip + 4) + ' L -1 ' + (hip + 13) + ' L -' + (tw + 1) + ' ' + (hip + 13) + ' Z" fill="' + p.bottom + '"/>';
    } else if (p.wear === 'skirt') {
      if (p.pose === 'sitFloor' || p.pose === 'kneel') lower += '<path d="M -' + (tw + 12) + ' -2 Q 0 ' + (hip - 16) + ' ' + (tw + 12) + ' -2 Z" fill="' + p.bottom + '"/>';
      else if (p.pose === 'sit') lower += '<path d="M -' + tw + ' ' + (hip - 6) + ' L ' + tw + ' ' + (hip - 6) + ' L 24 ' + (hip - 3) + ' L 24 ' + (hip + 12) + ' L -' + (tw + 2) + ' ' + (hip + 12) + ' Z" fill="' + p.bottom + '"/>';
      else lower += '<path d="M -' + tw + ' ' + (hip - 6) + ' L ' + tw + ' ' + (hip - 6) + ' L ' + (tw + 8) + ' ' + (hip + 20) + ' L -' + (tw + 8) + ' ' + (hip + 20) + ' Z" fill="' + p.bottom + '"/>';
    } else if (long && p.wear !== 'trousers') {
      if (p.pose === 'sit') lower += '<path d="M -' + tw + ' ' + (hip - 8) + ' L ' + tw + ' ' + (hip - 8) + ' L 32 ' + (hip - 4) + ' L 34 -3 L 10 -3 L 8 ' + (hip + 12) + ' L -' + (tw + 1) + ' ' + (hip + 12) + ' Z" fill="' + p.bottom + '"/>';
      else if (p.pose === 'sitFloor' || p.pose === 'kneel') lower += '<path d="M -' + (tw + 16) + ' -1 Q 0 ' + (hip - 22) + ' ' + (tw + 16) + ' -1 Z" fill="' + p.bottom + '"/>';
      else lower += '<path d="M -' + tw + ' ' + (hip - 8) + ' L ' + tw + ' ' + (hip - 8) + ' L ' + (tw + 5) + ' -5 L -' + (tw + 5) + ' -5 Z" fill="' + p.bottom + '"/>';
    }

    /* torso */
    var torso = '<path d="M -' + tw + ' ' + (sh + 4) + ' Q -' + tw + ' ' + (sh - 3) + ' -' + (tw - 7) + ' ' + (sh - 3) +
      ' L ' + (tw - 7) + ' ' + (sh - 3) + ' Q ' + tw + ' ' + (sh - 3) + ' ' + tw + ' ' + (sh + 4) +
      ' L ' + (tw + 1) + ' ' + (hip - 2) + ' Q 0 ' + (hip + 3) + ' -' + (tw + 1) + ' ' + (hip - 2) + ' Z" fill="' + p.top + '" stroke="' + p.topLine + '" stroke-width="1.2"/>';
    if (p.collar) {
      torso += '<path d="M -8 ' + (sh - 3) + ' L 0 ' + (sh + 7) + ' L -10 ' + (sh + 8) + ' Z" fill="' + p.top + '" stroke="' + p.topLine + '" stroke-width="1.1"/>' +
               '<path d="M 8 ' + (sh - 3) + ' L 0 ' + (sh + 7) + ' L 10 ' + (sh + 8) + ' Z" fill="' + p.top + '" stroke="' + p.topLine + '" stroke-width="1.1"/>' +
               '<rect x="5" y="' + (sh + 13) + '" width="8" height="8" rx="1.5" fill="none" stroke="' + p.topLine + '" stroke-width="1.1"/>';
    }
    if (p.tie) torso += '<path d="M -2 ' + (sh + 6) + ' L 2 ' + (sh + 6) + ' L 3 ' + (sh + 24) + ' L 0 ' + (sh + 28) + ' L -3 ' + (sh + 24) + ' Z" fill="' + p.tie + '"/>';
    if (p.sash) torso += '<path d="M -' + tw + ' ' + (hip - 6) + ' L ' + (tw - 8) + ' ' + (sh - 3) + ' L ' + tw + ' ' + (sh + 2) + ' L -' + (tw - 8) + ' ' + (hip - 2) + ' Z" fill="' + p.sash + '"/>';
    if (p.wear === 'robe') torso += '<path d="M -' + tw + ' ' + (sh + 3) + ' L ' + (tw - 2) + ' ' + (hip - 8) + ' L ' + (tw + 1) + ' ' + (hip - 2) + ' L -' + (tw + 1) + ' ' + (hip - 2) + ' Z" fill="' + p.bottom + '" opacity=".55"/>';
    if (p.dirty) {
      torso += '<ellipse cx="-5" cy="' + (sh + 14) + '" rx="5" ry="3.5" fill="#7c5a3a" opacity=".75"/><ellipse cx="7" cy="' + (sh + 24) + '" rx="4" ry="5" fill="#6b4a2e" opacity=".7"/><circle cx="-8" cy="' + (sh + 27) + '" r="2.5" fill="#7c5a3a" opacity=".7"/>';
    }
    if (p.patch) {
      torso += '<rect x="-10" y="' + (sh + 12) + '" width="9" height="9" fill="#d97706" stroke="#7c2d12" stroke-width="1" stroke-dasharray="2 1.5"/><rect x="3" y="' + (sh + 22) + '" width="8" height="7" fill="#65a30d" stroke="#365314" stroke-width="1" stroke-dasharray="2 1.5"/>';
    }
    if (p.glowHeart) {
      torso += '<circle cx="0" cy="' + (sh + 17) + '" r="13" fill="#fb7185" opacity=".35" class="glow"/>' + heart(0, sh + 17, 0.75, '#ef4444');
    }

    /* arms */
    function arm(side, spec, hold) {
      var sx = side * (tw - 1), sy = sh + 3, e, h;
      if (spec === 'worship') { e = [side * (tw + 9), sy + 16]; h = [side * 3, sy + 9]; }
      else if (spec === 'mouth') { e = [side * (tw + 9), sy + 12]; h = [side * 6, hy + K.hr - 6]; }
      else if (spec === 'eyes') { e = [side * (tw + 10), sy + 2]; h = [side * 8, hy + 1]; }
      else if (spec === 'head') { e = [side * (tw + 12), sy - 14]; h = [side * 9, hy - K.hr + 5]; }
      else if (spec === 'cross') { e = [side * (tw + 7), sy + 18]; h = [-side * 8, sy + 17]; }
      else if (spec === 'back') { e = [side * (tw + 5), sy + 14]; h = [side * 2, sy + 27]; }
      else if (typeof spec === 'object') { e = spec.e; h = spec.h; }
      else {
        var a = ARM[spec] || ARM.down;
        e = [sx + side * a.e[0] * K.arm, sy + a.e[1] * K.arm];
        h = [sx + side * a.h[0] * K.arm, sy + a.h[1] * K.arm];
      }
      var mx = (sx + e[0]) / 2, my = (sy + e[1]) / 2;
      var s = '<path d="M ' + sx + ' ' + sy + ' Q ' + r1(e[0]) + ' ' + r1(e[1]) + ' ' + r1(h[0]) + ' ' + r1(h[1]) + '" stroke="' + p.skin + '" stroke-width="' + (K.lw - 0.5) + '" stroke-linecap="round" fill="none"/>';
      if (p.wear !== 'robe') s += '<path d="M ' + sx + ' ' + sy + ' L ' + r1(mx + (e[0] - sx) * 0.12) + ' ' + r1(my + (e[1] - sy) * 0.12) + '" stroke="' + p.top + '" stroke-width="' + (K.lw + 3) + '" stroke-linecap="round"/>';
      s += '<circle cx="' + r1(h[0]) + '" cy="' + r1(h[1]) + '" r="' + (K.lw / 2 + 0.6) + '" fill="' + p.skin + '"/>';
      if (hold) s += g(hold, 'translate(' + r1(h[0]) + ' ' + r1(h[1]) + ')');
      return s;
    }
    var back = (p.armL === 'back' || p.armR === 'back');
    var arms = arm(-1, p.armL, p.holdL) + arm(1, p.armR, p.holdR);

    /* head */
    var hr = K.hr;
    var head = '<rect x="-4.5" y="' + (neck - 4) + '" width="9" height="10" rx="3" fill="' + (p.skin === C.skin ? C.skinD : p.skin) + '"/>';
    head += '<circle cx="-' + (hr - 1) + '" cy="' + (hy + 2) + '" r="4" fill="' + p.skin + '"/><circle cx="' + (hr - 1) + '" cy="' + (hy + 2) + '" r="4" fill="' + p.skin + '"/>';
    head += '<circle cx="0" cy="' + hy + '" r="' + hr + '" fill="' + p.skin + '"/>';

    /* hair */
    var hc = p.hairColor, hair = '';
    function cap(extra) {
      return '<path d="M -' + (hr + 1) + ' ' + (hy + 1) + ' A ' + (hr + 1) + ' ' + (hr + 1) + ' 0 0 1 ' + (hr + 1) + ' ' + (hy + 1) +
        ' Q ' + (hr - 3) + ' ' + (hy - hr * 0.55) + ' ' + (hr * 0.2) + ' ' + (hy - hr * 0.62) + ' Q -' + (hr * 0.6) + ' ' + (hy - hr * 0.5) + ' -' + (hr + 1) + ' ' + (hy + 1) + ' Z" fill="' + hc + '"/>' + (extra || '');
    }
    if (p.hair === 'messy') {
      hair = cap('<path d="M -' + (hr - 2) + ' ' + (hy - hr + 6) + ' l -7 -9 l 9 3 l 1 -10 l 7 8 l 6 -9 l 3 10 l 9 -5 l -3 11 Z" fill="' + hc + '"/>' +
        '<path d="M -' + (hr + 1) + ' ' + (hy - 2) + ' l -6 -5 l 7 -2 Z M ' + (hr + 1) + ' ' + (hy - 2) + ' l 6 -6 l -8 -1 Z" fill="' + hc + '"/>');
    } else if (p.hair === 'neat') {
      hair = cap('<path d="M -' + (hr * 0.35) + ' ' + (hy - hr + 3) + ' Q ' + (hr * 0.3) + ' ' + (hy - hr + 1) + ' ' + (hr * 0.7) + ' ' + (hy - hr + 7) + '" stroke="#a16207" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>');
    } else if (p.hair === 'girl') {
      hair = '<path d="M -' + (hr + 2) + ' ' + (hy + 4) + ' q -9 10 -5 26 q 8 -2 9 -12 Z M ' + (hr + 2) + ' ' + (hy + 4) + ' q 9 10 5 26 q -8 -2 -9 -12 Z" fill="' + hc + '"/>' +
        cap() + '<circle cx="-' + (hr + 3) + '" cy="' + (hy + 8) + '" r="3.6" fill="#ef4444"/><circle cx="' + (hr + 3) + '" cy="' + (hy + 8) + '" r="3.6" fill="#ef4444"/>';
    } else if (p.hair === 'bun') {
      hair = '<circle cx="-' + (hr * 0.75) + '" cy="' + (hy - hr * 0.75) + '" r="' + (hr * 0.5) + '" fill="' + hc + '"/>' + cap();
    } else if (p.hair === 'bald') {
      hair = '<path d="M -' + (hr - 3) + ' ' + (hy - hr * 0.62) + ' Q 0 ' + (hy - hr - 1.5) + ' ' + (hr - 3) + ' ' + (hy - hr * 0.62) + '" stroke="' + C.skinD + '" stroke-width="1" fill="none" opacity=".35"/>';
    }

    /* face */
    var f = '', ey = hy + 2, ex = hr * 0.38, my = hy + hr * 0.5;
    var eyeDot = '<circle cx="-' + ex + '" cy="' + ey + '" r="2.4" fill="' + C.ink + '"/><circle cx="' + ex + '" cy="' + ey + '" r="2.4" fill="' + C.ink + '"/>' +
      '<circle cx="-' + (ex - 0.8) + '" cy="' + (ey - 0.9) + '" r=".8" fill="#fff"/><circle cx="' + (ex + 0.8) + '" cy="' + (ey - 0.9) + '" r=".8" fill="#fff"/>';
    var eyeArcUp = '<path d="M -' + (ex + 3) + ' ' + (ey + 1) + ' q 3 -4 6 0 M ' + (ex - 3) + ' ' + (ey + 1) + ' q 3 -4 6 0" stroke="' + C.ink + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    var eyeArcDn = '<path d="M -' + (ex + 3) + ' ' + ey + ' q 3 3.5 6 0 M ' + (ex - 3) + ' ' + ey + ' q 3 3.5 6 0" stroke="' + C.ink + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    var smile = '<path d="M -6 ' + (my - 1) + ' Q 0 ' + (my + 6) + ' 6 ' + (my - 1) + '" stroke="' + C.ink + '" stroke-width="1.9" fill="none" stroke-linecap="round"/>';
    var bigSmile = '<path d="M -7 ' + (my - 2) + ' Q 0 ' + (my + 9) + ' 7 ' + (my - 2) + ' Z" fill="#7f1d1d"/><path d="M -5 ' + (my - 1.5) + ' L 5 ' + (my - 1.5) + ' L 4 ' + (my + 1) + ' L -4 ' + (my + 1) + ' Z" fill="#fff"/>';
    var frown = '<path d="M -6 ' + (my + 4) + ' Q 0 ' + (my - 3) + ' 6 ' + (my + 4) + '" stroke="' + C.ink + '" stroke-width="1.9" fill="none" stroke-linecap="round"/>';
    var browSad = '<path d="M -' + (ex + 4) + ' ' + (ey - 5) + ' l 7 -3 M ' + (ex + 4) + ' ' + (ey - 5) + ' l -7 -3" stroke="' + C.ink + '" stroke-width="1.7" stroke-linecap="round"/>';
    var browMad = '<path d="M -' + (ex + 4) + ' ' + (ey - 8) + ' l 8 4 M ' + (ex + 4) + ' ' + (ey - 8) + ' l -8 4" stroke="' + C.ink + '" stroke-width="2.2" stroke-linecap="round"/>';
    var blush = p.blush ? '<ellipse cx="-' + (hr * 0.62) + '" cy="' + (hy + hr * 0.38) + '" rx="3.6" ry="2.4" fill="#fb7185" opacity=".45"/><ellipse cx="' + (hr * 0.62) + '" cy="' + (hy + hr * 0.38) + '" rx="3.6" ry="2.4" fill="#fb7185" opacity=".45"/>' : '';
    switch (p.face) {
      case 'joy': f = eyeArcUp + bigSmile + blush; break;
      case 'calm': f = eyeArcDn + smile + blush; break;
      case 'sad': f = eyeDot + browSad + frown; break;
      case 'angry': f = eyeDot + browMad + frown + '<path d="M ' + (hr - 4) + ' ' + (hy - hr + 4) + ' l 5 -5 m 0 5 l -5 -5" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round"/>'; break;
      case 'shout': f = eyeDot + browMad + '<ellipse cx="0" cy="' + (my + 2) + '" rx="5.5" ry="6" fill="#7f1d1d"/>'; break;
      case 'cry': f = eyeArcDn + browSad + '<ellipse cx="0" cy="' + (my + 2) + '" rx="4.5" ry="5" fill="#7f1d1d"/>' +
        '<path d="M -' + ex + ' ' + (ey + 3) + ' q -3 6 0 9 q 3 -3 0 -9 Z M ' + ex + ' ' + (ey + 3) + ' q -3 6 0 9 q 3 -3 0 -9 Z" fill="#38bdf8"/>'; break;
      case 'sleep': f = eyeArcDn + '<circle cx="0" cy="' + (my + 1) + '" r="2.4" fill="#7f1d1d"/>'; break;
      case 'wow': f = eyeDot + '<ellipse cx="0" cy="' + (my + 2) + '" rx="3.6" ry="4.6" fill="#7f1d1d"/>' + blush; break;
      case 'sly': f = eyeDot + '<path d="M -' + (ex + 4) + ' ' + (ey - 6) + ' l 7 2 M ' + (ex + 4) + ' ' + (ey - 8) + ' l -7 1" stroke="' + C.ink + '" stroke-width="1.8" stroke-linecap="round"/>' +
        '<path d="M -5 ' + (my + 1) + ' Q 2 ' + (my + 4) + ' 7 ' + (my - 3) + '" stroke="' + C.ink + '" stroke-width="1.9" fill="none" stroke-linecap="round"/>'; break;
      case 'greedy': f = eyeDot + '<path d="M -6 ' + (my - 1) + ' Q 0 ' + (my + 7) + ' 6 ' + (my - 1) + ' Z" fill="#7f1d1d"/><path d="M 3 ' + (my + 3) + ' q 3 7 0 10 q -3 -3 0 -10 Z" fill="#7dd3fc"/>'; break;
      case 'tired': f = eyeArcDn + browSad + '<path d="M -4 ' + (my + 2) + ' h 8" stroke="' + C.ink + '" stroke-width="1.9" stroke-linecap="round"/>' +
        '<path d="M ' + (hr - 5) + ' ' + (hy - 8) + ' q -3 6 0 9 q 3 -3 0 -9 Z M -' + (hr - 3) + ' ' + (hy - 2) + ' q -3 6 0 9 q 3 -3 0 -9 Z" fill="#7dd3fc"/>'; break;
      default: f = eyeDot + smile + blush;
    }
    if (p.snot) f += '<path d="M -3 ' + (my - 5) + ' q -2 7 0 10 q 3 -3 1 -10 Z" fill="#a3e635" stroke="#65a30d" stroke-width=".6"/>';
    if (p.dirty) f += '<ellipse cx="' + (hr * 0.5) + '" cy="' + (hy + hr * 0.45) + '" rx="4" ry="2.6" fill="#6b4a2e" opacity=".6"/><ellipse cx="-' + (hr * 0.55) + '" cy="' + (hy - hr * 0.2) + '" rx="3" ry="2" fill="#6b4a2e" opacity=".5"/>';
    if (p.glasses) f += '<circle cx="-' + ex + '" cy="' + ey + '" r="5" fill="#fff" fill-opacity=".25" stroke="' + C.ink + '" stroke-width="1.3"/><circle cx="' + ex + '" cy="' + ey + '" r="5" fill="#fff" fill-opacity=".25" stroke="' + C.ink + '" stroke-width="1.3"/><path d="M -' + (ex - 5) + ' ' + ey + ' h ' + (2 * ex - 10) + '" stroke="' + C.ink + '" stroke-width="1.3"/>';
    if (p.beard) f += '<path d="M -' + (hr - 3) + ' ' + (hy + 6) + ' Q 0 ' + (hy + hr + 9) + ' ' + (hr - 3) + ' ' + (hy + 6) + ' Q 0 ' + (hy + hr - 3) + ' -' + (hr - 3) + ' ' + (hy + 6) + ' Z" fill="' + hc + '" opacity=".9"/>';

    /* garland */
    var gar = '';
    if (p.garland) {
      var cols = ['#f472b6', '#fbbf24', '#fb7185', '#ffffff', '#f97316', '#fbbf24', '#f472b6'];
      for (var i = 0; i < 7; i++) {
        var t = i / 6, gx = -tw + 2 + t * (2 * tw - 4), gy = sh + 2 + Math.sin(t * Math.PI) * 22;
        gar += '<circle cx="' + r1(gx) + '" cy="' + r1(gy) + '" r="3.6" fill="' + cols[i] + '" stroke="#be185d" stroke-width=".6"/><circle cx="' + r1(gx) + '" cy="' + r1(gy) + '" r="1.2" fill="#facc15"/>';
      }
    }

    var bodyRot = p.pose === 'bow' ? 'rotate(24 0 ' + hip + ')' : (p.pose === 'run' ? 'rotate(10 0 ' + hip + ')' : '');
    var upper = g((back ? arms : '') + torso + gar + (back ? '' : arms) + head + hair + f, bodyRot);
    out += legs + lower + upper;

    var tf = 'translate(' + r1(p.x) + ' ' + r1(p.y) + ')' + (p.rot ? ' rotate(' + p.rot + ')' : '') + ' scale(' + (p.flip ? -p.s : p.s) + ' ' + p.s + ')';
    return '<g transform="' + tf + '">' + out + '</g>';
  }
  /* Taraka — the hero. His look matures with the poem number. */
  function taraka(v, o) {
    var lvl = v <= 10 ? 1 : v <= 23 ? 2 : v <= 32 ? 3 : v <= 45 ? 4 : 5;
    var base = { face: 'happy' };
    if (lvl === 1) { base.hair = 'messy'; base.top = '#fdba74'; base.topLine = '#fb923c'; base.bottom = '#7c5a3a'; base.shoes = 'none'; }
    else if (lvl === 2) { base.hair = 'neat'; base.top = '#7dd3fc'; base.topLine = '#38bdf8'; base.bottom = '#1e40af'; }
    else { base.hair = 'neat'; base.top = '#ffffff'; base.topLine = '#cbd5e1'; base.bottom = '#1d4ed8'; base.collar = true; }
    if (lvl >= 5) base.garland = true;
    if (v >= 61) base.halo = true;
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  /* A naughty child for the "don't" pictures */
  function rascal(o) {
    var base = { hair: 'messy', top: '#a8a29e', topLine: '#78716c', bottom: '#57534e', face: 'sly', shoes: 'none', blush: false };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function girl(o) {
    var base = { hair: 'girl', top: '#ffffff', topLine: '#cbd5e1', bottom: '#db2777', wear: 'skirt' };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function friend(o) {
    var base = { hair: 'neat', top: '#86efac', topLine: '#4ade80', bottom: '#166534', skin: '#d99a6c' };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function mother(o) {
    var base = { adult: true, hair: 'bun', top: '#f472b6', topLine: '#db2777', bottom: '#be185d', wear: 'saree', sash: '#fbcfe8' };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function father(o) {
    var base = { adult: true, hair: 'neat', top: '#fef3c7', topLine: '#fcd34d', bottom: '#0f766e', wear: 'sarong' };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function teacher(o) {
    var base = { adult: true, hair: 'bun', top: '#fde68a', topLine: '#f59e0b', bottom: '#b45309', wear: 'saree', sash: '#fef3c7', glasses: true };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function grandpa(o) {
    var base = { adult: true, hair: 'neat', hairColor: '#d1d5db', top: '#ffffff', topLine: '#cbd5e1', bottom: '#7c3aed', wear: 'sarong', beard: true, s: 0.95 };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function grandma(o) {
    var base = { adult: true, hair: 'bun', hairColor: '#d1d5db', top: '#ffffff', topLine: '#cbd5e1', bottom: '#0891b2', wear: 'saree', sash: '#cffafe', glasses: true, s: 0.92 };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }
  function monk(o) {
    var base = { adult: true, hair: 'bald', top: '#f59e0b', topLine: '#d97706', bottom: '#ea580c', wear: 'robe', shoes: 'none' };
    for (var k in (o || {})) base[k] = o[k];
    return person(base);
  }

  /* ---------- animals ---------- */
  function dog(x, y, s, o) {
    o = o || {};
    var col = o.color || '#c98b4a', sad = o.sad;
    var b = '<ellipse cx="0" cy="-16" rx="22" ry="12" fill="' + col + '"/>' +
      '<path d="M -14 -8 v 8 M -5 -6 v 6 M 8 -6 v 6 M 16 -8 v 8" stroke="' + col + '" stroke-width="6" stroke-linecap="round"/>' +
      (sad ? '<path d="M -21 -18 q -8 8 -6 16" stroke="' + col + '" stroke-width="5" stroke-linecap="round" fill="none"/>'
           : '<path d="M -21 -20 q -10 -8 -6 -18" stroke="' + col + '" stroke-width="5" stroke-linecap="round" fill="none" class="wag"/>') +
      '<circle cx="24" cy="-28" r="12" fill="' + col + '"/>' +
      '<path d="M 15 -36 q -7 4 -4 16 q 6 -2 7 -12 Z M 31 -37 q 8 3 6 15 q -6 -1 -8 -10 Z" fill="#7a4a1e"/>' +
      '<ellipse cx="29" cy="-23" rx="7" ry="5.5" fill="#f3d9b5"/><circle cx="31" cy="-25" r="2.2" fill="#2a1a12"/>' +
      '<circle cx="21" cy="-31" r="1.8" fill="#2a1a12"/><circle cx="29" cy="-32" r="1.8" fill="#2a1a12"/>' +
      (sad ? '<path d="M 25 -19 q 4 -3 8 0" stroke="#2a1a12" stroke-width="1.3" fill="none"/><path d="M 20 -28 q -2 5 0 7 q 2 -2 0 -7 Z" fill="#38bdf8"/>'
           : '<path d="M 26 -21 q 4 4 8 0" stroke="#2a1a12" stroke-width="1.3" fill="none"/><path d="M 29 -19 q 1 6 4 4 q 1 -3 -1 -5 Z" fill="#fb7185"/>');
    return at(x, y, s, b, o.flip);
  }
  function cat(x, y, s, o) {
    o = o || {};
    var col = o.color || '#f4a340';
    var b = '<path d="M -14 -2 q -14 -6 -10 -22" stroke="' + col + '" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<ellipse cx="0" cy="-12" rx="14" ry="13" fill="' + col + '"/>' +
      '<circle cx="4" cy="-32" r="11" fill="' + col + '"/><path d="M -5 -38 l -2 -10 l 8 5 Z M 12 -39 l 4 -9 l 3 10 Z" fill="' + col + '"/>' +
      '<path d="M -1 -33 q 2 -3 4 0 M 6 -33 q 2 -3 4 0" stroke="#2a1a12" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M 3 -29 l 3 0 l -1.5 2 Z" fill="#fb7185"/><path d="M -8 -28 h -7 M -8 -26 l -6 3 M 16 -28 h 7 M 16 -26 l 6 3" stroke="#7a4a1e" stroke-width=".8"/>' +
      '<ellipse cx="-5" cy="-2" rx="5" ry="3" fill="#fff4e0"/><ellipse cx="7" cy="-2" rx="5" ry="3" fill="#fff4e0"/>';
    return at(x, y, s, b, o.flip);
  }
  function bird(x, y, s, o) {
    o = o || {};
    var col = o.color || '#38bdf8';
    var b = '<ellipse cx="0" cy="-8" rx="10" ry="8" fill="' + col + '"/><circle cx="8" cy="-15" r="6" fill="' + col + '"/>' +
      '<path d="M 13 -15 l 7 2 l -7 3 Z" fill="#f59e0b"/><circle cx="9.5" cy="-16.5" r="1.3" fill="#1e293b"/>' +
      '<path d="M -4 -9 q -10 -2 -14 6 q 10 2 16 -2 Z" fill="#0284c7"/><path d="M -2 0 v 4 M 3 0 v 4" stroke="#f59e0b" stroke-width="1.4"/>';
    return at(x, y, s, b, o.flip);
  }
  function flyBird(x, y, s, col) {
    return at(x, y, s, '<path d="M -12 0 q 6 -9 12 0 q 6 -9 12 0" stroke="' + (col || '#475569') + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>');
  }
  function butterfly(x, y, s, col) {
    col = col || '#f472b6';
    return at(x, y, s, '<g class="flutter"><ellipse cx="-6" cy="-4" rx="6" ry="8" fill="' + col + '" transform="rotate(-25)"/><ellipse cx="6" cy="-4" rx="6" ry="8" fill="' + col + '" transform="rotate(25)"/><ellipse cx="0" cy="0" rx="1.6" ry="7" fill="#3b2a1e"/></g>');
  }
  function cow(x, y, s, o) {
    o = o || {};
    var b = '<ellipse cx="0" cy="-26" rx="30" ry="16" fill="#fff"/><path d="M -12 -36 q 8 8 2 18 q -12 0 -14 -12 Z M 10 -20 q 8 -4 12 4 q -8 6 -14 0 Z" fill="#57534e"/>' +
      '<path d="M -20 -14 v 14 M -8 -12 v 12 M 12 -12 v 12 M 22 -14 v 14" stroke="#fff" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M -20 -2 v 2 M -8 -2 v 2 M 12 -2 v 2 M 22 -2 v 2" stroke="#3b2a1e" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M -29 -30 q -8 8 -5 22" stroke="#fff" stroke-width="3" fill="none"/>' +
      '<ellipse cx="34" cy="-36" rx="12" ry="11" fill="#fff"/><ellipse cx="38" cy="-30" rx="8" ry="6" fill="#fda4af"/>' +
      '<circle cx="30" cy="-39" r="1.8" fill="#1e293b"/><circle cx="39" cy="-40" r="1.8" fill="#1e293b"/><path d="M 24 -46 l -5 -7 M 42 -47 l 4 -7" stroke="#d6d3d1" stroke-width="3" stroke-linecap="round"/>';
    return at(x, y, s, b, o.flip);
  }

  /* ---------- nature & buildings ---------- */
  function sun(x, y, r, o) {
    o = o || {};
    var rays = '';
    for (var i = 0; i < 12; i++) rays += '<rect x="-2" y="' + (-r - 15) + '" width="4" height="10" rx="2" fill="#fbbf24" transform="rotate(' + (i * 30) + ')"/>';
    var face = o.face === false ? '' : '<circle cx="' + (-r * 0.3) + '" cy="' + (-r * 0.1) + '" r="' + (r * 0.09) + '" fill="#92400e"/><circle cx="' + (r * 0.3) + '" cy="' + (-r * 0.1) + '" r="' + (r * 0.09) + '" fill="#92400e"/><path d="M ' + (-r * 0.3) + ' ' + (r * 0.25) + ' Q 0 ' + (r * 0.6) + ' ' + (r * 0.3) + ' ' + (r * 0.25) + '" stroke="#92400e" stroke-width="' + Math.max(1.2, r * 0.07) + '" fill="none" stroke-linecap="round"/>';
    return g('<g class="spin-slow">' + rays + '</g><circle r="' + r + '" fill="#fde047"/><circle r="' + (r * 0.82) + '" fill="#facc15"/>' + face, 'translate(' + x + ' ' + y + ')');
  }
  function moon(x, y, r) {
    return g('<circle r="' + r + '" fill="#fef9c3"/><circle cx="' + (r * 0.4) + '" cy="' + (-r * 0.25) + '" r="' + (r * 0.85) + '" fill="#1e2a5a"/>', 'translate(' + x + ' ' + y + ')');
  }
  function fullMoon(x, y, r) {
    return g('<circle r="' + (r * 1.5) + '" fill="#fef9c3" opacity=".25"/><circle r="' + r + '" fill="#fef9c3"/><circle cx="' + (-r * 0.3) + '" cy="' + (-r * 0.2) + '" r="' + (r * 0.18) + '" fill="#fde68a"/><circle cx="' + (r * 0.3) + '" cy="' + (r * 0.3) + '" r="' + (r * 0.13) + '" fill="#fde68a"/>', 'translate(' + x + ' ' + y + ')');
  }
  function stars(list, col) {
    var s = '';
    list.forEach(function (p, i) { s += '<path class="twinkle" style="animation-delay:' + (i * 0.37) + 's" transform="translate(' + p[0] + ' ' + p[1] + ') scale(' + (p[2] || 1) + ')" d="M 0 -5 L 1.4 -1.4 L 5 0 L 1.4 1.4 L 0 5 L -1.4 1.4 L -5 0 L -1.4 -1.4 Z" fill="' + (col || '#fef08a') + '"/>'; });
    return s;
  }
  function cloud(x, y, s, col) {
    return at(x, y, s, '<g class="drift"><ellipse cx="0" cy="0" rx="26" ry="11" fill="' + (col || '#fff') + '"/><circle cx="-10" cy="-8" r="11" fill="' + (col || '#fff') + '"/><circle cx="6" cy="-11" r="14" fill="' + (col || '#fff') + '"/><circle cx="19" cy="-4" r="9" fill="' + (col || '#fff') + '"/></g>');
  }
  function rain(x, y, n) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<path d="M ' + (x + i * 9 - n * 4.5) + ' ' + (y + (i % 2) * 7) + ' l -3 9" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" class="fall" style="animation-delay:' + (i * 0.15) + 's"/>';
    return s;
  }
  function tree(x, y, s, o) {
    o = o || {};
    var fruit = '';
    if (o.fruit) [[-16, -78], [10, -90], [22, -66], [-4, -62], [-24, -58]].forEach(function (f) { fruit += '<circle cx="' + f[0] + '" cy="' + f[1] + '" r="5" fill="' + (o.fruit === true ? '#f97316' : o.fruit) + '"/>'; });
    return at(x, y, s, '<path d="M -6 0 Q -3 -30 -5 -52 L 6 -52 Q 4 -30 8 0 Z" fill="' + C.woodD + '"/>' +
      '<circle cx="-18" cy="-62" r="22" fill="' + C.leafD + '"/><circle cx="18" cy="-64" r="24" fill="' + C.leafD + '"/><circle cx="0" cy="-84" r="26" fill="' + C.leaf + '"/><circle cx="-4" cy="-62" r="20" fill="' + C.leaf + '"/>' + fruit);
  }
  function palm(x, y, s) {
    var l = '';
    [-70, -35, 0, 35, 70].forEach(function (a) { l += '<path d="M 0 -96 q 22 -16 44 2 q -24 -4 -44 -2 Z" fill="' + C.leafD + '" transform="rotate(' + (a - 20) + ' 0 -96)"/>'; });
    return at(x, y, s, '<path d="M -4 0 Q 6 -50 0 -96 L 6 -96 Q 14 -50 5 0 Z" fill="#a0744a"/>' + l + '<circle cx="2" cy="-92" r="4.5" fill="#7c5a3a"/><circle cx="-4" cy="-90" r="4" fill="#7c5a3a"/>');
  }
  function bush(x, y, s) {
    return at(x, y, s, '<circle cx="-12" cy="-8" r="11" fill="' + C.leafD + '"/><circle cx="10" cy="-9" r="12" fill="' + C.leafD + '"/><circle cx="0" cy="-14" r="13" fill="' + C.leaf + '"/>');
  }
  function flower(x, y, s, col) {
    col = col || '#f472b6';
    var p = '';
    for (var i = 0; i < 5; i++) p += '<ellipse cx="0" cy="-6" rx="3.6" ry="6" fill="' + col + '" transform="rotate(' + (i * 72) + ')"/>';
    return at(x, y, s, '<path d="M 0 0 v -14" stroke="' + C.leafD + '" stroke-width="2"/><path d="M 0 -6 q 6 -4 9 0 q -5 3 -9 0 Z" fill="' + C.leaf + '"/>' + g(p + '<circle r="3" fill="#fde047"/>', 'translate(0 -18)'));
  }
  function lotus(x, y, s, col) {
    col = col || '#f9a8d4';
    return at(x, y, s, '<ellipse cx="0" cy="2" rx="22" ry="5" fill="#16a34a"/>' +
      '<path d="M 0 0 q -22 -6 -22 -20 q 14 2 22 20 Z M 0 0 q 22 -6 22 -20 q -14 2 -22 20 Z" fill="' + col + '"/>' +
      '<path d="M 0 0 q -14 -12 -10 -28 q 10 8 10 28 Z M 0 0 q 14 -12 10 -28 q -10 8 -10 28 Z" fill="#fbcfe8"/>' +
      '<path d="M 0 0 q -7 -16 0 -32 q 7 16 0 32 Z" fill="#fdf2f8" stroke="' + col + '" stroke-width=".8"/><circle cx="0" cy="-6" r="2.5" fill="#fde047"/>');
  }
  function sapling(x, y, s, bent) {
    return at(x, y, s, (bent
      ? '<path d="M 0 0 q 2 -20 22 -34" stroke="#65a30d" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M 22 -34 q 12 -8 14 2 q -8 4 -14 -2 Z M 14 -26 q -2 -12 8 -14 q 2 8 -8 14 Z" fill="' + C.leaf + '"/>'
      : '<path d="M 0 0 v -44" stroke="#65a30d" stroke-width="4" stroke-linecap="round"/><path d="M 0 -44 q 12 -10 16 0 q -8 6 -16 0 Z M 0 -44 q -12 -10 -16 0 q 8 6 16 0 Z M 0 -30 q 12 -8 15 1 q -8 5 -15 -1 Z M 0 -22 q -12 -8 -15 1 q 8 5 15 -1 Z" fill="' + C.leaf + '"/><path d="M 0 -58 q 6 6 0 14 q -6 -8 0 -14 Z" fill="#84cc16"/>') +
      '<ellipse cx="0" cy="1" rx="16" ry="4" fill="#7c5a3a"/>');
  }
  function house(x, y, s, o) {
    o = o || {};
    var wall = o.wall || '#fff7ed', roof = o.roof || '#c2410c';
    return at(x, y, s, '<rect x="-46" y="-60" width="92" height="60" fill="' + wall + '" stroke="#e7d3b7" stroke-width="1.5"/>' +
      '<path d="M -58 -58 L 0 -100 L 58 -58 Z" fill="' + roof + '"/><path d="M -58 -58 L 0 -100 L 58 -58" stroke="#7c2d12" stroke-width="2" fill="none"/>' +
      '<rect x="-12" y="-38" width="24" height="38" rx="2" fill="' + (o.door || '#92400e') + '"/><circle cx="7" cy="-18" r="1.8" fill="#fde047"/>' +
      '<rect x="-38" y="-46" width="18" height="18" rx="2" fill="#bae6fd" stroke="#92400e" stroke-width="2"/><rect x="20" y="-46" width="18" height="18" rx="2" fill="#bae6fd" stroke="#92400e" stroke-width="2"/>');
  }
  function school(x, y, s) {
    return at(x, y, s, '<rect x="-80" y="-64" width="160" height="64" fill="#fef3c7" stroke="#e7d3b7" stroke-width="1.5"/><path d="M -90 -62 L 0 -96 L 90 -62 Z" fill="#b91c1c"/>' +
      '<rect x="-14" y="-40" width="28" height="40" rx="2" fill="#92400e"/>' +
      '<rect x="-66" y="-48" width="22" height="20" fill="#bae6fd" stroke="#92400e" stroke-width="2"/><rect x="-40" y="-48" width="22" height="20" fill="#bae6fd" stroke="#92400e" stroke-width="2"/><rect x="18" y="-48" width="22" height="20" fill="#bae6fd" stroke="#92400e" stroke-width="2"/><rect x="44" y="-48" width="22" height="20" fill="#bae6fd" stroke="#92400e" stroke-width="2"/>' +
      '<rect x="-30" y="-82" width="60" height="14" rx="3" fill="#fff"/>' + label(0, -75, 9, 'පාසල', '#b91c1c') +
      '<path d="M 0 -96 v -22" stroke="#57534e" stroke-width="2"/><path d="M 0 -118 l 18 5 l -18 6 Z" fill="#f59e0b"/>');
  }
  function stupa(x, y, s) {
    return at(x, y, s, '<rect x="-48" y="-10" width="96" height="10" rx="2" fill="#f1f5f9"/><rect x="-40" y="-18" width="80" height="9" rx="2" fill="#fff"/>' +
      '<path d="M -34 -18 Q -36 -66 0 -68 Q 36 -66 34 -18 Z" fill="#fff" stroke="#e2e8f0" stroke-width="1.5"/>' +
      '<rect x="-10" y="-80" width="20" height="13" fill="#fff" stroke="#e2e8f0" stroke-width="1.2"/><path d="M -7 -80 L 0 -112 L 7 -80 Z" fill="#fbbf24"/><circle cx="0" cy="-114" r="3.5" fill="#f59e0b"/>' +
      '<path d="M -34 -34 Q 0 -26 34 -34" stroke="#fbbf24" stroke-width="2.5" fill="none"/>');
  }
  function boTree(x, y, s) {
    var l = '';
    [[-30, -80, 22], [26, -84, 24], [0, -106, 26], [-6, -74, 20], [38, -60, 16], [-42, -58, 15]].forEach(function (c) { l += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + (c[2] > 21 ? '#15803d' : '#16a34a') + '"/>'; });
    return at(x, y, s, '<path d="M -9 0 Q -4 -36 -12 -66 L 12 -66 Q 5 -36 11 0 Z" fill="#8a5a2b"/>' + l + '<rect x="-26" y="-8" width="52" height="9" rx="2" fill="#fde68a" stroke="#f59e0b" stroke-width="1"/>');
  }
  function hut(x, y, s, sign, col) {
    return at(x, y, s, '<rect x="-40" y="-50" width="80" height="50" fill="' + (col || '#d6d3d1') + '"/><path d="M -48 -50 L -36 -70 L 36 -70 L 48 -50 Z" fill="#78716c"/>' +
      '<rect x="-30" y="-38" width="60" height="22" fill="#44403c"/>' + (sign ? emoji(0, -27, 18, sign) : '') + '<rect x="-40" y="-16" width="80" height="4" fill="#a8a29e"/>');
  }

  /* ---------- furniture & things ---------- */
  function chair(x, y, s, o) {
    o = o || {};
    var col = o.color || C.wood, h = o.h || 27;
    return at(x, y, s, '<rect x="-16" y="' + (-h - 3) + '" width="30" height="5" rx="2" fill="' + col + '"/><rect x="-16" y="' + (-h - 38) + '" width="5" height="40" rx="2" fill="' + C.woodD + '"/><rect x="-16" y="' + (-h - 38) + '" width="5" height="' + (h + 38) + '" rx="2" fill="' + C.woodD + '"/><rect x="9" y="' + (-h) + '" width="5" height="' + h + '" rx="2" fill="' + C.woodD + '"/><rect x="-16" y="' + (-h - 34) + '" width="8" height="18" rx="3" fill="' + col + '"/>', o.flip);
  }
  function stool(x, y, s) {
    return at(x, y, s, '<rect x="-14" y="-14" width="28" height="5" rx="2" fill="' + C.wood + '"/><rect x="-12" y="-10" width="4" height="10" fill="' + C.woodD + '"/><rect x="8" y="-10" width="4" height="10" fill="' + C.woodD + '"/>');
  }
  function mat(x, y, w, col) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + w + '" ry="' + (w * 0.2) + '" fill="' + (col || '#d9a35c') + '"/><ellipse cx="' + x + '" cy="' + y + '" rx="' + (w * 0.8) + '" ry="' + (w * 0.14) + '" fill="none" stroke="#a16207" stroke-width="1.5" stroke-dasharray="4 3"/>';
  }
  function desk(x, y, s) {
    return at(x, y, s, '<rect x="-30" y="-36" width="60" height="6" rx="2" fill="' + C.wood + '"/><rect x="-26" y="-30" width="5" height="30" fill="' + C.woodD + '"/><rect x="21" y="-30" width="5" height="30" fill="' + C.woodD + '"/><rect x="-26" y="-26" width="52" height="8" fill="#d6a06a"/>');
  }
  function table(x, y, s, w) {
    w = w || 60;
    return at(x, y, s, '<rect x="' + (-w) + '" y="-44" width="' + (2 * w) + '" height="7" rx="3" fill="' + C.wood + '"/><rect x="' + (-w + 6) + '" y="-37" width="6" height="37" fill="' + C.woodD + '"/><rect x="' + (w - 12) + '" y="-37" width="6" height="37" fill="' + C.woodD + '"/>');
  }
  function bed(x, y, s, o) {
    o = o || {};
    return at(x, y, s, '<rect x="-60" y="-22" width="120" height="14" rx="4" fill="' + C.wood + '"/><rect x="-62" y="-44" width="8" height="44" rx="3" fill="' + C.woodD + '"/><rect x="54" y="-30" width="8" height="30" rx="3" fill="' + C.woodD + '"/>' +
      '<rect x="-54" y="-30" width="108" height="12" rx="5" fill="#fff"/><ellipse cx="-40" cy="-32" rx="14" ry="6" fill="#e0f2fe" stroke="#bae6fd" stroke-width="1"/>' + (o.inner || '') +
      (o.blanket === false ? '' : '<path d="M -22 -34 Q 10 -46 54 -34 L 54 -20 L -22 -20 Z" fill="' + (o.blanketColor || '#60a5fa') + '"/><path d="M -22 -34 Q 10 -46 54 -34" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="4 4"/>'));
  }
  function blackboard(x, y, w, h, inner) {
    return '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="4" fill="#14532d" stroke="' + C.wood + '" stroke-width="5"/>' + (inner || '') +
      '<rect x="' + (x - w / 2 + 6) + '" y="' + (y + h / 2 + 1) + '" width="' + (w - 12) + '" height="3" fill="' + C.woodD + '"/>';
  }
  function windowFrame(x, y, w, h, inner) {
    return '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="3" fill="#bae6fd" stroke="' + C.woodD + '" stroke-width="4"/>' + (inner || '') +
      '<path d="M ' + x + ' ' + (y - h / 2) + ' v ' + h + ' M ' + (x - w / 2) + ' ' + y + ' h ' + w + '" stroke="' + C.woodD + '" stroke-width="2.5"/>';
  }
  function doorway(x, y, s, o) {
    o = o || {};
    var open = o.open;
    return at(x, y, s, '<rect x="-24" y="-92" width="48" height="92" fill="' + (open ? '#fde68a' : '#7c2d12') + '" stroke="' + C.woodD + '" stroke-width="5"/>' +
      (open ? '<path d="M -24 -92 L -44 -84 L -44 6 L -24 0 Z" fill="#92400e"/>' : '<rect x="-16" y="-84" width="32" height="34" rx="2" fill="#92400e"/><rect x="-16" y="-42" width="32" height="34" rx="2" fill="#92400e"/><circle cx="16" cy="-44" r="2.6" fill="#fde047"/>'));
  }
  function book(x, y, s, col, rot) {
    return g('<rect x="-10" y="-13" width="20" height="26" rx="2" fill="' + (col || '#ef4444') + '"/><rect x="-10" y="-13" width="4" height="26" fill="#0003"/><rect x="-3" y="-7" width="10" height="3" rx="1" fill="#fff" opacity=".9"/>', 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function openBook(x, y, s, o) {
    o = o || {};
    var scr = o.scribble ? '<path d="M -18 -8 q 4 -8 8 0 t 8 0 M -17 2 l 12 -6 M 5 -9 q 6 10 12 -2 M 6 3 l 10 -4 l -8 -3" stroke="#1e293b" stroke-width="1.6" fill="none"/>' + '<circle cx="11" cy="-1" r="3" fill="none" stroke="#dc2626" stroke-width="1.4"/>'
      : '<path d="M -18 -8 h 13 M -18 -4 h 13 M -18 0 h 13 M 5 -8 h 13 M 5 -4 h 13 M 5 0 h 13" stroke="#94a3b8" stroke-width="1.2"/>';
    return at(x, y, s, (o.glow ? '<ellipse cx="0" cy="-6" rx="34" ry="20" fill="#fde68a" opacity=".6" class="glow"/>' : '') +
      '<path d="M -24 -14 Q -12 -19 0 -13 Q 12 -19 24 -14 L 24 8 Q 12 3 0 9 Q -12 3 -24 8 Z" fill="' + (o.cover || '#b45309') + '"/>' +
      '<path d="M -22 -15 Q -11 -19 0 -14 L 0 7 Q -11 2 -22 6 Z" fill="#fffdf5"/><path d="M 22 -15 Q 11 -19 0 -14 L 0 7 Q 11 2 22 6 Z" fill="#fffdf5"/>' + scr);
  }
  function slate(x, y, s, txt) {
    return at(x, y, s, '<rect x="-16" y="-13" width="32" height="26" rx="3" fill="#1f2937" stroke="' + C.wood + '" stroke-width="3.5"/>' + label(0, 0, 13, txt || 'අ', '#fff'));
  }
  function pencil(x, y, s, rot, col) {
    return g('<rect x="-2.5" y="-16" width="5" height="26" fill="' + (col || '#facc15') + '"/><path d="M -2.5 10 L 0 17 L 2.5 10 Z" fill="#fcd9a8"/><path d="M -1 14 L 0 17 L 1 14 Z" fill="#1e293b"/><rect x="-2.5" y="-20" width="5" height="4" rx="1" fill="#fb7185"/>', 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function bag(x, y, s, col) {
    return at(x, y, s, '<path d="M -10 -34 q 10 -14 20 0" stroke="#1e3a8a" stroke-width="4" fill="none"/><rect x="-18" y="-36" width="36" height="36" rx="8" fill="' + (col || '#2563eb') + '"/><rect x="-12" y="-18" width="24" height="14" rx="4" fill="#1d4ed8"/><rect x="-3" y="-13" width="6" height="4" rx="1" fill="#fde047"/>');
  }
  function ball(x, y, r, col) {
    return g('<g class="bounce"><circle r="' + r + '" fill="' + (col || '#ef4444') + '"/><path d="M -' + r + ' 0 Q 0 -' + (r * 0.6) + ' ' + r + ' 0 M -' + r + ' 0 Q 0 ' + (r * 0.6) + ' ' + r + ' 0" stroke="#fff" stroke-width="1.6" fill="none"/></g>', 'translate(' + x + ' ' + y + ')');
  }
  function umbrella(x, y, s, o) {
    o = o || {};
    var col = o.color || '#7c3aed';
    return g('<path d="M 0 0 v -46" stroke="#44403c" stroke-width="2.6"/><path d="M 0 0 q 0 7 -6 6" stroke="#44403c" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      (o.closed ? '<path d="M -5 -14 L 0 -52 L 5 -14 Z" fill="' + col + '"/>' : '<path d="M -34 -42 Q 0 -80 34 -42 Q 26 -48 17 -42 Q 8 -48 0 -42 Q -8 -48 -17 -42 Q -26 -48 -34 -42 Z" fill="' + col + '"/>'), 'translate(' + x + ' ' + y + ') rotate(' + (o.rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function purse(x, y, s) {
    return at(x, y, s, '<rect x="-13" y="-16" width="26" height="16" rx="4" fill="#92400e"/><path d="M -13 -12 h 26" stroke="#78350f" stroke-width="2"/><circle cx="0" cy="-10" r="3" fill="#fde047"/><rect x="-7" y="-20" width="12" height="5" fill="#86efac" stroke="#16a34a" stroke-width=".8"/>');
  }
  function plate(x, y, s, o) {
    o = o || {};
    return at(x, y, s, '<ellipse cx="0" cy="0" rx="18" ry="5" fill="#e2e8f0"/><ellipse cx="0" cy="-1" rx="15" ry="3.6" fill="#fff"/>' +
      (o.empty ? '' : '<path d="M -12 -2 Q -10 -14 0 -14 Q 10 -14 12 -2 Z" fill="#fffdf0" stroke="#e7e5e4" stroke-width=".8"/><circle cx="-5" cy="-5" r="3.2" fill="#f97316"/><circle cx="5" cy="-6" r="3" fill="#22c55e"/>'));
  }
  function cup(x, y, s, col, o) {
    o = o || {};
    return at(x, y, s, '<path d="M -7 -16 L 7 -16 L 5.5 0 L -5.5 0 Z" fill="' + (col || '#bae6fd') + '" stroke="#7dd3fc" stroke-width="1"/>' + (o.steam ? '<path d="M -2 -20 q -3 -4 0 -8 M 3 -20 q -3 -4 0 -8" stroke="#cbd5e1" stroke-width="1.5" fill="none" stroke-linecap="round" class="steam"/>' : '') + (o.ice ? '<rect x="-4" y="-13" width="4" height="4" fill="#fff" opacity=".9"/><rect x="1" y="-10" width="4" height="4" fill="#fff" opacity=".9"/>' : ''));
  }
  function pot(x, y, s, col) {
    return at(x, y, s, '<path d="M -10 -30 h 20 l -3 5 q 17 10 5 25 h -24 q -12 -15 5 -25 Z" fill="' + (col || '#c2410c') + '"/><ellipse cx="0" cy="-30" rx="10" ry="3" fill="#7c2d12"/><ellipse cx="0" cy="-30" rx="7" ry="1.8" fill="#38bdf8"/>');
  }
  function basin(x, y, s) {
    return at(x, y, s, '<path d="M -22 -14 h 44 l -6 14 h -32 Z" fill="#94a3b8"/><ellipse cx="0" cy="-14" rx="22" ry="5" fill="#cbd5e1"/><ellipse cx="0" cy="-14" rx="18" ry="3.5" fill="#38bdf8"/>');
  }
  function tap(x, y, s) {
    return at(x, y, s, '<rect x="-4" y="-50" width="8" height="50" fill="#94a3b8"/><path d="M -2 -48 h 22 v 10 h -7 v -3 h -15 Z" fill="#64748b"/><rect x="-7" y="-56" width="14" height="6" rx="2" fill="#ef4444"/>' +
      '<path d="M 16 -36 q -2 14 0 30" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none" class="flow"/>');
  }
  function broom(x, y, s, rot) {
    return g('<path d="M 0 -60 L 0 0" stroke="' + C.woodD + '" stroke-width="3.5" stroke-linecap="round"/><path d="M -3 0 L -12 22 L 12 22 L 3 0 Z" fill="#eab308"/><path d="M -6 8 v 14 M 0 6 v 16 M 6 8 v 14" stroke="#a16207" stroke-width="1.2"/><rect x="-5" y="-3" width="10" height="5" fill="#b91c1c"/>', 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function comb(x, y, s, rot) {
    return g('<rect x="-14" y="-5" width="28" height="5" rx="2" fill="#0ea5e9"/><path d="M -12 0 v 7 M -8 0 v 7 M -4 0 v 7 M 0 0 v 7 M 4 0 v 7 M 8 0 v 7 M 12 0 v 7" stroke="#0ea5e9" stroke-width="1.8"/>', 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function toothbrush(x, y, s, rot) {
    return g('<rect x="-22" y="-2.5" width="36" height="5" rx="2.5" fill="#22c55e"/><rect x="10" y="-9" width="13" height="7" rx="1.5" fill="#fff" stroke="#cbd5e1" stroke-width=".8"/><path d="M 12 -9 v 7 M 15 -9 v 7 M 18 -9 v 7 M 21 -9 v 7" stroke="#bae6fd" stroke-width="1"/><ellipse cx="16" cy="-11" rx="5" ry="2.4" fill="#38bdf8"/>', 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function teeth(x, y, s, clean) {
    var col = clean ? '#ffffff' : '#fde047', t = '';
    for (var i = 0; i < 5; i++) t += '<rect x="' + (-25 + i * 10) + '" y="-8" width="9.4" height="12" rx="2.5" fill="' + col + '" stroke="#d6d3d1" stroke-width=".7"/>' + (clean ? '' : '<circle cx="' + (-21 + i * 10) + '" cy="' + (-2 + (i % 2) * 3) + '" r="1.8" fill="#854d0e"/>');
    return at(x, y, s, '<path d="M -32 -14 Q 0 -24 32 -14 Q 34 14 0 20 Q -34 14 -32 -14 Z" fill="#9f1239"/><path d="M -28 -10 Q 0 -18 28 -10 L 27 -6 L -27 -6 Z" fill="#fda4af"/>' + t + (clean ? stars([[-30, -22, 1.2], [30, -20, 1.4], [0, -28, 1]], '#38bdf8') : ''));
  }
  function hand(x, y, s, longNails, dirty) {
    var f = '';
    [[-14, -22, -14], [-5, -30, -4], [5, -30, 4], [14, -22, 14]].forEach(function (p) {
      f += '<g transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')"><rect x="-4" y="-16" width="8" height="24" rx="4" fill="' + C.skin + '"/>' +
        (longNails ? '<path d="M -3.2 -14 Q 0 -30 3.2 -14 Z" fill="#fef9c3" stroke="#854d0e" stroke-width=".8"/><path d="M -2 -20 Q 0 -26 2 -20 Z" fill="#57534e"/>' : '<path d="M -3 -12 Q 0 -17 3 -12 L 3 -9 L -3 -9 Z" fill="#fff5f5" stroke="#fda4af" stroke-width=".6"/>') + '</g>';
    });
    return at(x, y, s, '<rect x="-18" y="-26" width="36" height="30" rx="12" fill="' + C.skin + '"/><rect x="-27" y="-18" width="12" height="9" rx="4.5" fill="' + C.skin + '" transform="rotate(-30 -22 -14)"/>' + f +
      (dirty ? '<circle cx="-4" cy="-10" r="4" fill="#6b4a2e" opacity=".55"/><circle cx="8" cy="-16" r="3" fill="#6b4a2e" opacity=".5"/>' : ''));
  }
  function hanky(x, y, s) {
    return at(x, y, s, '<path d="M -9 -8 L 9 -9 L 10 8 L 0 5 L -10 9 Z" fill="#fff" stroke="#93c5fd" stroke-width="1.4"/><path d="M -5 -4 l 10 0" stroke="#93c5fd" stroke-width="1"/>');
  }
  function bin(x, y, s) {
    return at(x, y, s, '<path d="M -13 -30 h 26 l -3 30 h -20 Z" fill="#16a34a"/><rect x="-16" y="-35" width="32" height="6" rx="2" fill="#15803d"/><path d="M -5 -24 v 18 M 5 -24 v 18" stroke="#14532d" stroke-width="1.5"/>');
  }
  function fire(x, y, s) {
    return at(x, y, s, '<path d="M -16 0 l 32 -5 M -16 -5 l 32 5" stroke="' + C.woodD + '" stroke-width="5" stroke-linecap="round"/><g class="flame"><path d="M 0 -42 q 16 14 10 30 q -2 8 -10 8 q -10 0 -11 -10 q -1 -8 5 -13 q 0 -8 6 -15 Z" fill="#f97316"/><path d="M 0 -24 q 7 7 4 14 q -1 4 -4 4 q -5 0 -5 -5 q 0 -6 5 -13 Z" fill="#fde047"/></g>');
  }
  function lamp(x, y, s) {
    return at(x, y, s, '<circle cx="0" cy="-14" r="20" fill="#fde68a" opacity=".5" class="glow"/><path d="M -12 -4 q 12 8 24 0 l -4 4 h -16 Z" fill="#b45309"/><ellipse cx="0" cy="-4" rx="12" ry="3" fill="#d97706"/><path d="M 0 -20 q 5 6 0 14 q -5 -8 0 -14 Z" fill="#f97316" class="flame"/>');
  }
  function clock(x, y, r, hr, mn) {
    var ha = ((hr % 12) + mn / 60) * 30, ma = mn * 6;
    return g('<circle r="' + r + '" fill="#fff" stroke="#f59e0b" stroke-width="' + (r * 0.16) + '"/>' +
      '<path d="M 0 0 v -' + (r * 0.5) + '" stroke="#1e293b" stroke-width="' + (r * 0.13) + '" stroke-linecap="round" transform="rotate(' + ha + ')"/>' +
      '<path d="M 0 0 v -' + (r * 0.72) + '" stroke="#ef4444" stroke-width="' + (r * 0.09) + '" stroke-linecap="round" transform="rotate(' + ma + ')"/><circle r="' + (r * 0.1) + '" fill="#1e293b"/>', 'translate(' + x + ' ' + y + ')');
  }
  function betel(x, y, s) {
    var l = '';
    [-28, -10, 8, 26].forEach(function (a, i) { l += '<path d="M 0 0 Q -12 -14 0 -34 Q 12 -14 0 0 Z" fill="' + (i % 2 ? '#16a34a' : '#22c55e') + '" stroke="#15803d" stroke-width=".8" transform="rotate(' + a + ')"/><path d="M 0 0 v -28" stroke="#15803d" stroke-width=".7" transform="rotate(' + a + ')"/>'; });
    return at(x, y, s, l + '<rect x="-4" y="-2" width="8" height="8" rx="2" fill="#fde047"/>');
  }
  function gift(x, y, s, col) {
    col = col || '#f43f5e';
    return at(x, y, s, '<rect x="-13" y="-20" width="26" height="20" rx="2" fill="' + col + '"/><rect x="-15" y="-26" width="30" height="8" rx="2" fill="' + col + '" stroke="#0002" stroke-width="1"/><rect x="-3" y="-26" width="6" height="26" fill="#fde047"/><path d="M 0 -26 q -10 -12 -12 -3 q 4 5 12 3 q 10 -12 12 -3 q -4 5 -12 3 Z" fill="#fde047"/>');
  }
  function car(x, y, s, col, flip) {
    return at(x, y, s, '<rect x="-38" y="-24" width="76" height="18" rx="7" fill="' + (col || '#ef4444') + '"/><path d="M -22 -24 L -14 -40 L 16 -40 L 26 -24 Z" fill="' + (col || '#ef4444') + '"/><path d="M -16 -25 L -11 -36 L 0 -36 L 0 -25 Z M 4 -25 L 4 -36 L 14 -36 L 20 -25 Z" fill="#bae6fd"/>' +
      '<circle cx="-21" cy="-5" r="8" fill="#1e293b"/><circle cx="21" cy="-5" r="8" fill="#1e293b"/><circle cx="-21" cy="-5" r="3" fill="#cbd5e1"/><circle cx="21" cy="-5" r="3" fill="#cbd5e1"/><circle cx="36" cy="-17" r="3" fill="#fef08a"/>', flip);
  }
  function stone(x, y, r) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + (r * 0.8) + '" fill="#78716c"/>'; }
  function water(x, y, w, h, deep) {
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (deep ? '#1d4ed8' : '#38bdf8') + '"/>';
    for (var i = 0; i < 3; i++) s += '<path class="wave" d="M ' + x + ' ' + (y + 8 + i * (h / 3.2)) + ' q 10 -6 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none"/>';
    return s;
  }
  function steps(x, y, n, w, h, cols) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<rect x="' + (x + i * w) + '" y="' + (y - (i + 1) * h) + '" width="' + (w * (n - i)) + '" height="' + h + '" fill="' + cols[i % cols.length] + '"/>';
    return s;
  }

  /* ---------- symbols ---------- */
  function heart(x, y, s, col) {
    return at(x, y, s, '<path d="M 0 8 C -16 -4 -9 -16 0 -7 C 9 -16 16 -4 0 8 Z" fill="' + (col || '#ef4444') + '"/>');
  }
  function hearts(list, col) {
    var s = '';
    list.forEach(function (p, i) { s += '<g class="floaty" style="animation-delay:' + (i * 0.4) + 's">' + heart(p[0], p[1], p[2] || 1, col || '#fb7185') + '</g>'; });
    return s;
  }
  function sparkle(list, col) { return stars(list, col || '#fbbf24'); }
  function badge(x, y, r, ok) {
    return g('<g class="pop"><circle r="' + r + '" fill="#fff"/><circle r="' + (r - 3) + '" fill="' + (ok ? '#16a34a' : '#dc2626') + '"/>' +
      (ok ? '<path d="M -' + (r * 0.4) + ' 0 l ' + (r * 0.28) + ' ' + (r * 0.3) + ' l ' + (r * 0.5) + ' -' + (r * 0.55) + '" stroke="#fff" stroke-width="' + (r * 0.24) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
          : '<path d="M -' + (r * 0.34) + ' -' + (r * 0.34) + ' l ' + (r * 0.68) + ' ' + (r * 0.68) + ' M ' + (r * 0.34) + ' -' + (r * 0.34) + ' l -' + (r * 0.68) + ' ' + (r * 0.68) + '" stroke="#fff" stroke-width="' + (r * 0.24) + '" stroke-linecap="round"/>') + '</g>',
      'translate(' + x + ' ' + y + ')');
  }
  function ban(x, y, r, inner) {
    return g('<circle r="' + r + '" fill="#fff" stroke="#dc2626" stroke-width="' + (r * 0.17) + '"/>' + (inner || '') + '<path d="M -' + (r * 0.68) + ' -' + (r * 0.68) + ' L ' + (r * 0.68) + ' ' + (r * 0.68) + '" stroke="#dc2626" stroke-width="' + (r * 0.17) + '" stroke-linecap="round"/>', 'translate(' + x + ' ' + y + ')');
  }
  function bubble(x, y, w, h, inner, o) {
    o = o || {};
    var fill = o.fill || '#fff', st = o.stroke || '#cbd5e1', tx = o.tail === 'right' ? w * 0.22 : -w * 0.22;
    return g('<path d="M ' + (tx - 6) + ' ' + (h / 2 - 2) + ' L ' + (tx + (o.tail === 'right' ? 8 : -8)) + ' ' + (h / 2 + 13) + ' L ' + (tx + 7) + ' ' + (h / 2 - 2) + ' Z" fill="' + fill + '" stroke="' + st + '" stroke-width="2"/>' +
      '<rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="' + Math.min(14, h / 2) + '" fill="' + fill + '" stroke="' + st + '" stroke-width="2"/>' +
      '<rect x="' + (tx - 5) + '" y="' + (h / 2 - 4) + '" width="11" height="4" fill="' + fill + '"/>' + (inner || ''), 'translate(' + x + ' ' + y + ')');
  }
  function think(x, y, w, h, inner, o) {
    o = o || {};
    var fill = o.fill || '#fff', dir = o.tail === 'right' ? 1 : -1;
    return g('<circle cx="' + (dir * w * 0.3) + '" cy="' + (h / 2 + 8) + '" r="5" fill="' + fill + '" stroke="#cbd5e1" stroke-width="1.5"/><circle cx="' + (dir * w * 0.42) + '" cy="' + (h / 2 + 19) + '" r="3" fill="' + fill + '" stroke="#cbd5e1" stroke-width="1.5"/>' +
      '<ellipse cx="0" cy="0" rx="' + (w / 2) + '" ry="' + (h / 2) + '" fill="' + fill + '" stroke="#cbd5e1" stroke-width="2"/>' + (inner || ''), 'translate(' + x + ' ' + y + ')');
  }
  function rays(x, y, r, col, n) {
    var s = ''; n = n || 14;
    for (var i = 0; i < n; i++) s += '<path d="M 0 0 L -' + (r * 0.11) + ' -' + r + ' L ' + (r * 0.11) + ' -' + r + ' Z" fill="' + (col || '#fde68a') + '" opacity=".55" transform="rotate(' + (i * 360 / n) + ')"/>';
    return g('<g class="spin-slow">' + s + '</g>', 'translate(' + x + ' ' + y + ')');
  }
  function garlandArc(x1, x2, y, sag, n) {
    var s = '<path d="M ' + x1 + ' ' + y + ' Q ' + ((x1 + x2) / 2) + ' ' + (y + sag * 2) + ' ' + x2 + ' ' + y + '" stroke="#16a34a" stroke-width="2" fill="none"/>';
    var cols = ['#f472b6', '#fbbf24', '#fb7185', '#ffffff', '#f97316', '#c084fc'];
    for (var i = 0; i <= n; i++) {
      var t = i / n, px = x1 + (x2 - x1) * t, py = y + 4 * sag * t * (1 - t) * 0.5 * 2 * 0.5 * 2;
      py = y + 2 * sag * 2 * t * (1 - t);
      var pet = '';
      for (var k = 0; k < 5; k++) pet += '<circle cx="0" cy="-4.5" r="3.6" fill="' + cols[i % cols.length] + '" transform="rotate(' + (k * 72) + ')"/>';
      s += g(pet + '<circle r="2.4" fill="#fde047"/>', 'translate(' + r1(px) + ' ' + r1(py) + ')');
    }
    return s;
  }
  function confetti(w, h, n) {
    var s = '', cols = ['#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#fb923c'];
    for (var i = 0; i < n; i++) {
      var x = (i * 73 + 17) % w, y = (i * 41 + 9) % (h * 0.7);
      s += '<rect x="' + x + '" y="' + y + '" width="5" height="8" rx="1.5" fill="' + cols[i % cols.length] + '" transform="rotate(' + (i * 37) + ' ' + x + ' ' + y + ')" class="twinkle" style="animation-delay:' + (i * 0.13) + 's"/>';
    }
    return s;
  }
  function zzz(x, y, s) {
    return at(x, y, s, '<g class="floaty">' + label(0, 0, 13, 'z', '#6366f1') + label(10, -12, 16, 'z', '#6366f1') + label(23, -27, 20, 'Z', '#6366f1') + '</g>');
  }
  function sweat(x, y) {
    return '<path d="M ' + x + ' ' + y + ' q -4 8 0 12 q 4 -4 0 -12 Z" fill="#7dd3fc" class="fall"/>';
  }
  function anger(x, y, s) {
    return at(x, y, s, '<path d="M -8 -3 h 5 v -5 M 8 -3 h -5 v -5 M -8 3 h 5 v 5 M 8 3 h -5 v 5" stroke="#dc2626" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');
  }
  function scribble(x, y, s, col) {
    return at(x, y, s, '<path d="M -24 0 q 6 -16 12 0 t 12 0 t 12 0 M -20 12 l 14 -8 l 4 10 l 14 -12 M -12 -18 q 10 -10 20 0 q -10 12 -20 0" stroke="' + (col || '#1e293b') + '" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="16" cy="-14" r="5" fill="none" stroke="' + (col || '#1e293b') + '" stroke-width="2"/>');
  }

  /* ---------- backgrounds ---------- */
  function bg(type, w, h, o) {
    o = o || {};
    var G = h * 0.8, s = '';
    function grass(top) { return '<rect x="0" y="' + top + '" width="' + w + '" height="' + (h - top) + '" fill="#86d36b"/><path d="M 0 ' + top + ' Q ' + (w / 2) + ' ' + (top - 10) + ' ' + w + ' ' + top + ' L ' + w + ' ' + (top + 12) + ' L 0 ' + (top + 12) + ' Z" fill="#9be07f"/>'; }
    function hills(y) { return '<path d="M 0 ' + y + ' Q ' + (w * 0.22) + ' ' + (y - 46) + ' ' + (w * 0.5) + ' ' + (y - 8) + ' Q ' + (w * 0.78) + ' ' + (y - 52) + ' ' + w + ' ' + (y - 12) + ' L ' + w + ' ' + (y + 20) + ' L 0 ' + (y + 20) + ' Z" fill="#b7e4a0"/>'; }
    switch (type) {
      case 'garden':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gSky)"/>' + hills(G - 20) + grass(G - 22); break;
      case 'yard':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gSky)"/>' + hills(G - 22) + '<rect x="0" y="' + (G - 24) + '" width="' + w + '" height="' + (h - G + 24) + '" fill="#f0d9a8"/><rect x="0" y="' + (G - 24) + '" width="' + w + '" height="7" fill="#e6c98e"/>'; break;
      case 'road':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gSky)"/>' + hills(G - 40) + '<rect x="0" y="' + (G - 46) + '" width="' + w + '" height="22" fill="#9be07f"/>' +
          '<rect x="0" y="' + (G - 26) + '" width="' + w + '" height="' + (h - G + 26) + '" fill="#8b8f98"/><rect x="0" y="' + (G - 26) + '" width="' + w + '" height="5" fill="#d6d3d1"/>';
        for (var i = 0; i < w / 40; i++) s += '<rect x="' + (i * 40 + 8) + '" y="' + (G + 22) + '" width="22" height="4" rx="2" fill="#fff" opacity=".85"/>';
        break;
      case 'path':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gSky)"/>' + hills(G - 26) + grass(G - 28) +
          '<path d="M 0 ' + (G - 6) + ' Q ' + (w / 2) + ' ' + (G - 16) + ' ' + w + ' ' + (G - 6) + ' L ' + w + ' ' + (G + 30) + ' Q ' + (w / 2) + ' ' + (G + 20) + ' 0 ' + (G + 30) + ' Z" fill="#e9cf9c"/>'; break;
      case 'room':
        s = '<rect width="' + w + '" height="' + h + '" fill="' + (o.wall || '#fff1d6') + '"/><rect x="0" y="' + (G - 30) + '" width="' + w + '" height="6" fill="#e9c98f"/>' +
          '<rect x="0" y="' + (G - 24) + '" width="' + w + '" height="' + (h - G + 24) + '" fill="' + (o.floor || '#d9a066') + '"/>';
        for (var j = 1; j < 5; j++) s += '<path d="M 0 ' + (G - 24 + j * 17) + ' h ' + w + '" stroke="#c48a4f" stroke-width="1" opacity=".6"/>';
        break;
      case 'class':
        s = '<rect width="' + w + '" height="' + h + '" fill="#e6f4ea"/><rect x="0" y="' + (G - 30) + '" width="' + w + '" height="6" fill="#b7d9c0"/>' +
          '<rect x="0" y="' + (G - 24) + '" width="' + w + '" height="' + (h - G + 24) + '" fill="#d8b58a"/>'; break;
      case 'temple':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gDawn)"/>' + hills(G - 26) + '<rect x="0" y="' + (G - 24) + '" width="' + w + '" height="' + (h - G + 24) + '" fill="#f5e2b8"/><rect x="0" y="' + (G - 24) + '" width="' + w + '" height="6" fill="#ead29a"/>'; break;
      case 'dawn':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gDawn)"/>' + hills(G - 22) + grass(G - 22); break;
      case 'night':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gNight)"/><rect x="0" y="' + (G - 22) + '" width="' + w + '" height="' + (h - G + 22) + '" fill="#2f4a3a"/>'; break;
      case 'nightroom':
        s = '<rect width="' + w + '" height="' + h + '" fill="#34406b"/><rect x="0" y="' + (G - 24) + '" width="' + w + '" height="' + (h - G + 24) + '" fill="#6b4a2e"/>'; break;
      case 'river':
        s = '<rect width="' + w + '" height="' + h + '" fill="url(#gSky)"/>' + hills(G - 60) + '<rect x="0" y="' + (G - 62) + '" width="' + w + '" height="20" fill="#9be07f"/>' + water(0, G - 44, w, 70, o.deep) +
          '<path d="M 0 ' + (G + 22) + ' Q ' + (w / 2) + ' ' + (G + 10) + ' ' + w + ' ' + (G + 22) + ' L ' + w + ' ' + h + ' L 0 ' + h + ' Z" fill="#e9cf9c"/>'; break;
      case 'gloom':
        s = '<rect width="' + w + '" height="' + h + '" fill="#cfd4dc"/><rect x="0" y="' + (G - 22) + '" width="' + w + '" height="' + (h - G + 22) + '" fill="#9aa08f"/>'; break;
      default:
        s = '<rect width="' + w + '" height="' + h + '" fill="' + (o.fill || '#fff7e6') + '"/>';
    }
    return s;
  }

  /* ---------- layouts ---------- */
  var W = 400, H = 300;
  function wrap(inner, title) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (title || '') + '" class="scene-svg">' + inner + '</svg>';
  }
  function clipBox(x, y, w, h, rx, inner) {
    var id = nid('c');
    return '<clipPath id="' + id + '"><rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + rx + '"/></clipPath>' +
      '<g transform="translate(' + x + ' ' + y + ')"><g clip-path="url(#' + id + ')">' + inner + '</g></g>';
  }
  function single(bgType, inner, o) {
    return clipBox(0, 0, W, H, 18, bg(bgType, W, H, o) + inner);
  }
  function panel(x, y, w, h, ok, bgType, inner, o) {
    o = o || {};
    var col = ok === true ? '#16a34a' : ok === false ? '#dc2626' : '#f59e0b';
    var body = bg(bgType, w, h, o) + inner + (ok === false ? '<rect width="' + w + '" height="' + h + '" fill="#7f1d1d" opacity=".07"/>' : '');
    var s = clipBox(x, y, w, h, 14, (ok === false ? '<g class="muted">' + body + '</g>' : body));
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="none" stroke="' + col + '" stroke-width="4"' + (ok === false ? ' stroke-dasharray="9 6"' : '') + '/>';
    if (ok === true || ok === false) s += badge(x + 22, y + 22, Math.min(17, h * 0.11), ok);
    if (o.num) s += g('<circle r="13" fill="#f59e0b" stroke="#fff" stroke-width="3"/>' + label(0, 0.5, 14, o.num, '#fff', 900), 'translate(' + (x + 20) + ' ' + (y + 20) + ')');
    return s;
  }
  /* two tall panels: left = don't, right = do */
  function split(bad, good) {
    return '<rect width="' + W + '" height="' + H + '" rx="18" fill="#fffaf0"/>' +
      panel(4, 4, 192, 292, false, bad[0], bad[1], bad[2]) + panel(204, 4, 192, 292, true, good[0], good[1], good[2]) +
      g('<circle r="15" fill="#fff" stroke="#f59e0b" stroke-width="3"/><path d="M -6 0 h 11 M 1 -5 l 5 5 l -5 5" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>', 'translate(200 150)');
  }
  /* 2 x 2 grid. each cell: [ok|num, bgType, inner, opts] */
  function grid(cells) {
    var s = '<rect width="' + W + '" height="' + H + '" rx="18" fill="#fffaf0"/>';
    var pos = [[4, 4], [203, 4], [4, 152], [203, 152]];
    cells.forEach(function (c, i) {
      var o = c[3] || {}, ok = c[0];
      if (typeof ok === 'number') { o.num = ok; ok = null; }
      s += panel(pos[i][0], pos[i][1], 193, 144, ok, c[1], c[2], o);
    });
    return s;
  }


  /* ---------- extras for part 2 ---------- */
  function snake(x, y, s, o) {
    o = o || {};
    var col = o.color || '#4d7c0f';
    return at(x, y, s, '<path d="M -26 -4 q 12 -14 26 -2 q 12 10 22 -2" stroke="' + col + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="-2" cy="-4" rx="26" ry="8" fill="' + col + '"/><ellipse cx="-2" cy="-7" rx="18" ry="5" fill="#65a30d"/>' +
      '<path d="M 4 -8 Q 0 -30 8 -44" stroke="' + col + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="9" cy="-48" rx="15" ry="13" fill="' + col + '"/><ellipse cx="9" cy="-47" rx="9" ry="9" fill="#a3e635"/>' +
      '<ellipse cx="10" cy="-56" rx="7" ry="6" fill="' + col + '"/><circle cx="7" cy="-57" r="1.5" fill="#fef08a"/><circle cx="13" cy="-57" r="1.5" fill="#fef08a"/>' +
      '<path d="M 10 -51 v 6 l -3 4 m 3 -4 l 3 4" stroke="#dc2626" stroke-width="1.4" fill="none" stroke-linecap="round"/>', o.flip);
  }
  function baby(x, y, s, o) {
    o = o || {};
    var f = o.cry ? '<path d="M -5 -1 q 2 2 4 0 M 2 -1 q 2 2 4 0" stroke="#3b2a1e" stroke-width="1.3" fill="none"/><ellipse cx="0.5" cy="5" rx="3" ry="3.4" fill="#7f1d1d"/><path d="M -6 1 q -2 4 0 6 q 2 -2 0 -6 Z" fill="#38bdf8"/>'
      : '<path d="M -5 -1 q 2 -2.4 4 0 M 2 -1 q 2 -2.4 4 0" stroke="#3b2a1e" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M -3 4 q 3.5 3 7 0" stroke="#3b2a1e" stroke-width="1.3" fill="none" stroke-linecap="round"/>';
    return g('<ellipse cx="14" cy="4" rx="21" ry="11" fill="' + (o.color || '#fde68a') + '" stroke="#f59e0b" stroke-width="1"/><path d="M 0 8 q 14 -12 30 -2" stroke="#f59e0b" stroke-width="1" fill="none"/>' +
      '<circle cx="-4" cy="0" r="10" fill="' + C.skin + '"/><path d="M -13 -3 q 8 -11 18 -2 q -8 -3 -18 2 Z" fill="' + C.hair + '"/>' +
      '<g transform="translate(-4 0)">' + f + '<ellipse cx="-6" cy="3.5" rx="2.2" ry="1.5" fill="#fb7185" opacity=".5"/><ellipse cx="7" cy="3.5" rx="2.2" ry="1.5" fill="#fb7185" opacity=".5"/></g>',
      'translate(' + x + ' ' + y + ') rotate(' + (o.rot || 0) + ') scale(' + (o.flip ? -(s || 1) : (s || 1)) + ' ' + (s || 1) + ')');
  }
  function lantern(x, y, s, col) {
    col = col || '#f43f5e';
    return at(x, y, s, '<path d="M 0 -34 v -14" stroke="#78716c" stroke-width="1.5"/><g class="floaty"><circle cx="0" cy="-16" r="24" fill="#fde68a" opacity=".35" class="glow"/>' +
      '<path d="M 0 -34 L 16 -16 L 0 2 L -16 -16 Z" fill="' + col + '" stroke="#fff" stroke-width="1.5"/><path d="M 0 -34 L 0 2 M -16 -16 L 16 -16" stroke="#fff" stroke-width="1.2"/>' +
      '<path d="M -8 -25 L 8 -25 L 8 -7 L -8 -7 Z" fill="#fde047" opacity=".9"/>' +
      '<path d="M -10 -4 v 16 M -3 2 v 18 M 3 2 v 18 M 10 -4 v 16" stroke="' + col + '" stroke-width="2.4" stroke-linecap="round"/></g>');
  }
  function fence(x, y, w, o) {
    o = o || {};
    var s = '', n = Math.floor(w / 14);
    for (var i = 0; i <= n; i++) {
      if (o.broken && (i === Math.floor(n / 2) || i === Math.floor(n / 2) + 1)) { s += '<rect x="' + (x + i * 14 - 3) + '" y="' + (y - 8) + '" width="6" height="26" rx="2" fill="#a16207" transform="rotate(' + (i % 2 ? 62 : -58) + ' ' + (x + i * 14) + ' ' + y + ')"/>'; continue; }
      s += '<path d="M ' + (x + i * 14 - 3) + ' ' + y + ' v -24 l 3 -5 l 3 5 v 24 Z" fill="#d6a06a" stroke="#a16207" stroke-width=".8"/>';
    }
    return (o.broken ? '' : '<rect x="' + x + '" y="' + (y - 19) + '" width="' + w + '" height="4" fill="#b9773f"/><rect x="' + x + '" y="' + (y - 9) + '" width="' + w + '" height="4" fill="#b9773f"/>') + s;
  }
  function anthill(x, y, s, closed) {
    return at(x, y, s, '<path d="M -26 0 Q -20 -30 -8 -34 Q -4 -52 4 -36 Q 16 -34 26 0 Z" fill="#a16207"/><path d="M -14 0 Q -10 -18 -2 -22" stroke="#854d0e" stroke-width="2" fill="none"/>' +
      (closed ? '<ellipse cx="4" cy="-14" rx="8" ry="6" fill="#78716c"/><ellipse cx="-10" cy="-6" rx="6" ry="4" fill="#78716c"/>' : '<ellipse cx="4" cy="-14" rx="7" ry="5" fill="#1c1917"/><ellipse cx="-10" cy="-6" rx="5" ry="3.5" fill="#1c1917"/>'));
  }
  function boat(x, y, s) {
    return at(x, y, s, '<path d="M -40 -12 h 80 l -12 14 h -56 Z" fill="#92400e"/><path d="M 0 -12 v -46" stroke="#57534e" stroke-width="3"/><path d="M 2 -56 L 30 -18 L 2 -18 Z" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>');
  }
  function hoe(x, y, s, rot) {
    return g('<path d="M 0 0 L 0 -58" stroke="' + C.woodD + '" stroke-width="4" stroke-linecap="round"/><path d="M -2 -58 h 20 v 10 q -10 -4 -20 -2 Z" fill="#64748b"/>', 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (s || 1) + ')');
  }
  function rubbish(x, y, s) {
    return at(x, y, s, '<path d="M -24 0 Q -18 -22 0 -24 Q 20 -22 24 0 Z" fill="#78716c"/><rect x="-12" y="-20" width="9" height="12" rx="2" fill="#ef4444" transform="rotate(-20 -8 -14)"/><circle cx="8" cy="-12" r="5" fill="#facc15"/><path d="M -2 -6 l 10 2 l -3 5 Z" fill="#60a5fa"/>' + stink0(-6, -26) );
  }
  function stink0(x, y) {
    return '<path d="M ' + x + ' ' + y + ' q -5 -7 0 -14 q 5 -7 0 -14 M ' + (x + 12) + ' ' + (y + 2) + ' q -5 -7 0 -14 q 5 -7 0 -14" stroke="#84cc16" stroke-width="2.2" fill="none" stroke-linecap="round" class="steam"/>';
  }
  function frame(x, y, w, h, inner, o) {
    o = o || {};
    return '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="4" fill="' + (o.fill || '#fffdf5') + '" stroke="' + (o.stroke || '#b45309') + '" stroke-width="5"/>' + (inner || '');
  }
  /* two tall neutral panels (no tick / cross) with an emoji tag */
  function pair(a, b) {
    function tag(x, em) { return g('<circle r="17" fill="#fff" stroke="#f59e0b" stroke-width="3"/>' + (/^[0-9]+$/.test(em) ? label(0, 1, 15, em, '#b45309', 900) : emoji(0, 1, 18, em)), 'translate(' + x + ' 26)'); }
    return '<rect width="' + W + '" height="' + H + '" rx="18" fill="#fffaf0"/>' +
      panel(4, 4, 192, 292, null, a[0], a[1], a[2]) + panel(204, 4, 192, 292, null, b[0], b[1], b[2]) + tag(30, (a[2] || {}).tag || '①') + tag(230, (b[2] || {}).tag || '②');
  }

  global.Art = {
    C: C, W: W, H: H, g: g, at: at, emoji: emoji, label: label, person: person, taraka: taraka, rascal: rascal, girl: girl, friend: friend,
    mother: mother, father: father, teacher: teacher, grandpa: grandpa, grandma: grandma, monk: monk,
    dog: dog, cat: cat, bird: bird, flyBird: flyBird, butterfly: butterfly, cow: cow,
    sun: sun, moon: moon, fullMoon: fullMoon, stars: stars, cloud: cloud, rain: rain, tree: tree, palm: palm, bush: bush, flower: flower, lotus: lotus, sapling: sapling,
    house: house, school: school, stupa: stupa, boTree: boTree, hut: hut,
    chair: chair, stool: stool, mat: mat, desk: desk, table: table, bed: bed, blackboard: blackboard, windowFrame: windowFrame, doorway: doorway,
    book: book, openBook: openBook, slate: slate, pencil: pencil, bag: bag, ball: ball, umbrella: umbrella, purse: purse, plate: plate, cup: cup, pot: pot, basin: basin, tap: tap,
    broom: broom, comb: comb, toothbrush: toothbrush, teeth: teeth, hand: hand, hanky: hanky, bin: bin, fire: fire, lamp: lamp, clock: clock, betel: betel, gift: gift, car: car, stone: stone, water: water, steps: steps,
    heart: heart, hearts: hearts, sparkle: sparkle, badge: badge, ban: ban, bubble: bubble, think: think, rays: rays, garlandArc: garlandArc, confetti: confetti, zzz: zzz, sweat: sweat, anger: anger, scribble: scribble,
    bg: bg, wrap: wrap, single: single, split: split, grid: grid, panel: panel, pair: pair,
    snake: snake, baby: baby, lantern: lantern, fence: fence, anthill: anthill, boat: boat, hoe: hoe, rubbish: rubbish, frame: frame
  };
})(window);
