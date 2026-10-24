/* මෛත්‍රී සිත — a lesson page (maitri.html).

   The shared machinery (citations, promises, test, Join pill) is in lesson-kit.js.
   This file holds only this lesson's picture, the eleven benefits, and its questions.

   මෛත්‍රී භාවනාව — how to sit and radiate it — is deliberately NOT on this page.
   Guiding a meditation needs a teacher present, so those passages (මහා රාහුලෝවාද,
   කරජකාය) live on maitri-guru.html. What a child gets here is the wish itself, in the
   Buddha's own words, which they can say anywhere. */
(function (global) {
  'use strict';

  var esc = global.LessonKit.esc;
  function $(id) { return document.getElementById(id); }

  /* ---------- picture: a heart spreading in every direction ---------- */
  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="හැම දිශාවකටම පැතිරෙන මෙත් සිත">' +
      '<circle cx="160" cy="124" r="98" fill="#fff1f4" opacity=".9"/>' +
      /* rings going out */
      '<g fill="none" stroke="#fda4af" stroke-width="3.5" opacity=".85">' +
      '<circle cx="160" cy="124" r="52"/><circle cx="160" cy="124" r="74" stroke-dasharray="7 9"/>' +
      '<circle cx="160" cy="124" r="94" stroke-dasharray="4 11"/></g>' +
      /* the heart at the middle */
      '<path d="M160,158 q-30,-20 -30,-44 q0,-18 16,-18 q11,0 14,12 q3,-12 14,-12 q16,0 16,18 q0,24 -30,44 z" ' +
      'fill="#fb7185" stroke="#be123c" stroke-width="5" stroke-linejoin="round"/>' +
      /* small creatures all round: every being, not just people */
      '<g font-size="22">' +
      '<text x="160" y="40" text-anchor="middle">🕊️</text>' +
      '<text x="56" y="112" text-anchor="middle">🐘</text>' +
      '<text x="264" y="112" text-anchor="middle">🐈</text>' +
      '<text x="70" y="214" text-anchor="middle">🐞</text>' +
      '<text x="250" y="214" text-anchor="middle">🐟</text>' +
      '<text x="160" y="226" text-anchor="middle">🧒</text></g>' +
      '<g fill="#fda4af"><circle cx="30" cy="62" r="6"/><circle cx="294" cy="64" r="5"/><circle cx="26" cy="166" r="5"/></g>' +
      '</svg>';
  }

  /* ---------- the eleven, as the sutta lists them ---------- */
  var ELEVEN = [
    { e: '😴', t: 'සුවසේ නිදයි' },
    { e: '🌅', t: 'සුවසේ අවදි වෙයි' },
    { e: '💭', t: 'පවිටු සිහින නොදකියි' },
    { e: '🧒', t: 'මිනිසුන් හට ප්‍රිය වෙයි' },
    { e: '🐾', t: 'අමනුෂ්‍යයන් හට ප්‍රිය වෙයි' },
    { e: '✨', t: 'දෙවියෝ රකිත්' },
    { e: '🛡️', t: 'ගින්නෙන්, විසෙන්, ආයුධයෙන් අනතුරු නොවෙයි' },
    { e: '🧘', t: 'සිත වහා සමාධිමත් වෙයි' },
    { e: '🌞', t: 'මුහුණෙහි පැහැය පහදවයි' },
    { e: '🕯️', t: 'සිහි මුලා නොවී මරණයට පත්වෙයි' },
    { e: '☁️', t: 'මතු බඹලොව උපදින්නේ වෙයි' }
  ];
  function buildEleven() {
    $('ani11').innerHTML = ELEVEN.map(function (a, i) {
      return '<div class="ani"><b>' + (i + 1) + '</b><span><em aria-hidden="true">' + a.e + '</em>' + esc(a.t) + '</span></div>';
    }).join('');
    var el = $('aniCount'); if (el) el.textContent = ELEVEN.length;
  }

  /* ---------- the moon outshining the stars ---------- */
  function moonArt() {
    return '<svg viewBox="0 0 300 180" role="img" aria-label="තරු එළිය පරදවන සඳ එළිය">' +
      '<rect x="0" y="0" width="300" height="180" rx="18" fill="#1e1b4b"/>' +
      '<g fill="#c7d2fe" opacity=".75">' +
      '<circle cx="40" cy="34" r="3"/><circle cx="92" cy="22" r="2.4"/><circle cx="142" cy="44" r="2.8"/>' +
      '<circle cx="246" cy="30" r="2.6"/><circle cx="276" cy="66" r="2.2"/><circle cx="36" cy="92" r="2.4"/>' +
      '<circle cx="74" cy="140" r="2.6"/><circle cx="262" cy="134" r="2.4"/><circle cx="196" cy="24" r="2.2"/>' +
      '<circle cx="24" cy="146" r="2"/><circle cx="286" cy="104" r="2"/></g>' +
      '<circle cx="186" cy="100" r="46" fill="#fef9c3" opacity=".22"/>' +
      '<circle cx="186" cy="100" r="34" fill="#fef9c3" opacity=".38"/>' +
      '<circle cx="186" cy="100" r="25" fill="#fffbeb"/>' +
      '<g stroke="#fde68a" stroke-width="3" stroke-linecap="round" opacity=".8">' +
      '<path d="M186,60 v-11 M186,140 v11 M146,100 h-11 M226,100 h11 M158,72 l-8,-8 M214,128 l8,8 M158,128 l-8,8 M214,72 l8,-8"/></g>' +
      '</svg>';
  }

  var QS = [
    { ask: 'මෙත්තානිසංස සූත්‍රයේ වදාළ, මෛත්‍රී චිත්ත සමාධිය වැඩීමෙන් ලැබෙන ආනිශංස ගණන කීයද?',
      ok: 'එකොළොසක්', bad: ['තුනක්', 'පහක්', 'විසිඑකක්'], go: '#ekolaha' },
    { ask: 'ඒ ආනිශංස අතර මුල්ම දෙක මොනවාද?',
      ok: 'සුවසේ නිදයි; සුවසේ අවදි වෙයි',
      bad: ['ධනවත් වෙයි; රූපවත් වෙයි', 'බොහෝ දේ උගනියි; දක්ෂ වෙයි', 'දිගු කලක් ජීවත් වෙයි; රෝග නොවෙයි'], go: '#ekolaha' },
    { ask: 'මෛත්‍රී සිත වඩන කෙනාට සිහින ගැන වදාළේ කුමක්ද?',
      ok: 'පවිටු සිහින නොදකින බව',
      bad: ['සිහින නොදකින බව', 'සිහින මතක නොවන බව', 'ඒ ගැන වදාළේ නෑ'], go: '#ekolaha' },
    { ask: 'මෛත්‍රී සිත වඩන කෙනා මියයන විට සිදු වන බව වදාළේ කුමක්ද?',
      ok: 'සිහි මුලා නොවී මරණයට පත්වන බව',
      bad: ['මරණයක් නොවන බව', 'ඉක්මනින් මියයන බව', 'බියෙන් මියයන බව'], go: '#ekolaha' },
    { ask: 'කරණීයමෙත්ත සූත්‍රයේ, අපමණ මෙත් සිත පැතිරවිය යුත්තේ කාගේ උපමාවෙන්ද?',
      ok: 'එකම පුතෙකු ඇති මවක් තම දිවි සම කොට ඔහු සුරකින ආකාරයෙන්',
      bad: ['රජෙකු තම රට රකින ආකාරයෙන්', 'ගොවියෙකු තම කුඹුර රකින ආකාරයෙන්', 'සොල්දාදුවෙකු සටන් කරන ආකාරයෙන්'], go: '#amma' },
    { ask: 'කරණීයමෙත්ත සූත්‍රයේ මෙත් පැතිරවිය යුතු සතුන් කවුරුන්ද?',
      ok: 'පෙනෙන නොපෙනෙන, දුර ළඟ, ලොකු පොඩි — සියලු සතුන්ම',
      bad: ['මිනිසුන් පමණයි', 'තමන් කැමති අය පමණයි', 'ගෙදර අය පමණයි'], go: '#amma' },
    { ask: 'මෙත්තා චේතෝවිමුක්ති සූත්‍රයේ වදාළ පරිදි, සැප විපාක දෙන සියලු පුණ්‍ය ක්‍රියා මෛත්‍රී චිත්ත විමුක්තියෙන් කොපමණ කොටසක් වටිනවාද?',
      ok: 'සොළොස් කලාවෙන් එක් කොටසක් තරම්වත් වටින්නේ නෑ',
      bad: ['දෙගුණයක් වටිනවා', 'සමානයි', 'ඒ ගැන වදාළේ නෑ'], go: '#sandha' },
    { ask: 'ඒ කරුණ උපමා කළේ කුමකින්ද?',
      ok: 'සියලු තරු එළිය සඳ එළියෙන් සොළොස් කලාවක්වත් නොවටිනවා වගේ',
      bad: ['මහ සයුරේ ජලය වගේ', 'පර්වතයක් වගේ', 'මහා වනයක් වගේ'], go: '#sandha' },
    { ask: 'මෛත්‍රී සිත වඩන, කිසිවෙකුට හිංසා නොකරන කෙනාට සිදු වන දෙය ගාථාවේ වදාළේ කුමක්ද?',
      ok: 'ඔහුට කිසිවෙකු කෙරෙහි වෛරයක් නැති බව',
      bad: ['ඔහුට හතුරන් වැඩි වන බව', 'ඔහු තනි වන බව', 'ඔහු දුප්පත් වන බව'], go: '#sandha' },
    { ask: '“මේ සත්වයෝ වෛර නැත්තෝ වෙත්වා! සුවසේ ජීවත් වෙත්වා!” කියලා හිතන එකට කියන්නේ මොකක්ද?',
      ok: 'මෛත්‍රිය', bad: ['කරුණාව', 'මුදිතාව', 'උපේක්ෂාව'], go: '#kiyamu' },
    { ask: 'මෛත්‍රී සිත වඩන්න ඕනෙ වෙන්නේ මොකක්ද?',
      ok: 'මුදල් හෝ වයස නෙවෙයි — සිතක් විතරයි',
      bad: ['බොහෝ මුදල්', 'ලොකු වයසක්', 'විශේෂ තැනක්'], go: '#kiyamu' },
    { ask: 'මෛත්‍රී සිත වඩන කෙනා ගැන දෙවියන් ගැන වදාළේ කුමක්ද?',
      ok: 'දෙවියෝ ඔහු රකින බව',
      bad: ['දෙවියෝ ඔහුට කෝප වන බව', 'දෙවියෝ ඔහු නොදකින බව', 'ඒ ගැන වදාළේ නෑ'], go: '#ekolaha' }
  ];

  var VOWS = [
    'උදේ නැගිටලා “සියලු සත්වයෝ සුවපත් වෙත්වා!” කියලා හිතනවා.',
    'නිදාගන්න කලින් එක පාරක් මෙත් සිත වඩනවා.',
    'මට තරහ යන කෙනෙකුටත් මෙත් කරනවා.',
    'කුඩා සතෙකුට වුණත් හිංසා කරන්නේ නෑ.',
    'මට කැමති නැති කෙනෙක් ගැනවත් නරකක් කියන්නේ නෑ.',
    'යාළුවෙකුට හොඳක් වුණාම ඊර්ෂ්‍යා නොවී සතුටු වෙනවා.',
    'ගෙදර කෙනෙක් ලෙඩ වුණාම “ඉක්මනින් සුව වේවා!” කියලා හිතනවා.'
  ];

  global.LessonKit({
    lesson: 'maitri', item: 'maithri', heroArt: heroArt,
    vows: VOWS, questions: QS, backTo: '#ekolaha'
  });
  buildEleven();
  $('moonArt').innerHTML = moonArt();
})(window);
