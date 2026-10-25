/* කාසාවකණ්ඨා — a lesson page (kasavakantha.html).

   The shared machinery (citations, promises, test, Join pill) is in lesson-kit.js.
   This file holds only this lesson's two pictures, the ladder of results from the
   Dakkhiṇāvibhaṅga, the four ways a gift becomes pure, and its questions.

   Both the ladder and the four cases are the sutta's own lists, in the sutta's own
   order; the passage they come from is quoted beside each of them on the page, so a
   reader can check the summary against the words. Nothing here adds a step the sutta
   does not name. */
(function (global) {
  'use strict';

  var esc = global.LessonKit.esc;
  function $(id) { return document.getElementById(id); }

  /* ---------- picture: the robe as the arahants' banner ---------- */
  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="කසාවත් පැහැති කොඩියක්, පිපුණු නෙළුමක් මත">' +
      '<circle cx="160" cy="128" r="106" fill="#fff7ed"/>' +
      /* sun */
      '<circle cx="272" cy="44" r="19" fill="#fef3c7" stroke="#d97706" stroke-width="3.5"/>' +
      /* ground */
      '<path d="M28,214 q132,-14 264,0" fill="none" stroke="#c2410c" stroke-width="4" opacity=".4"/>' +
      /* pole */
      '<path d="M98,212 V46" stroke="#78350f" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="98" cy="40" r="8" fill="#fde68a" stroke="#b45309" stroke-width="3.5"/>' +
      /* the banner, with a swallow tail */
      '<path d="M101,58 H240 l-22,32 l22,32 H101 Z" fill="#fb923c" stroke="#9a3412" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M130,64 V116 M162,62 V118 M194,60 V120" stroke="#ea580c" stroke-width="3" opacity=".65" stroke-linecap="round"/>' +
      /* a lotus at the foot of the pole */
      '<g transform="translate(98,206)">' +
      '<path d="M0,0 q-26,-6 -34,-22 q24,-4 34,22 z" fill="#fecdd3" stroke="#9f1239" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M0,0 q26,-6 34,-22 q-24,-4 -34,22 z" fill="#fecdd3" stroke="#9f1239" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M0,2 q-13,-14 0,-32 q13,18 0,32 z" fill="#fff1f2" stroke="#9f1239" stroke-width="3" stroke-linejoin="round"/>' +
      '</g></svg>';
  }

  /* ---------- picture: the elephant king before the robe ----------
     The robe is drawn first so the trunk passes in front of it, and the trunk reaches
     toward the cloth: with the robe behind him the picture says he is walking away from
     it, which is the opposite of the story. No tusks — they are the part of this story
     the children's page does not tell. */
  function eleArt() {
    return '<svg viewBox="0 0 300 180" role="img" aria-label="ඇතෙක් එල්ලා ඇති සිවුරක් දෙසට හොඬවැල දිගු කරගෙන">' +
      '<rect x="0" y="0" width="300" height="180" rx="18" fill="#fff7ed"/>' +
      '<path d="M0,154 q150,-16 300,0 V180 H0 Z" fill="#fed7aa" opacity=".55"/>' +
      '<path d="M0,154 q150,-16 300,0" fill="none" stroke="#c2410c" stroke-width="3.5" opacity=".5"/>' +
      /* the branch, and the robe hanging from it */
      '<path d="M216,42 h82" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M242,32 h40 v90 q-10,10 -20,0 q-10,10 -20,0 Z" fill="#fb923c" stroke="#9a3412" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M255,50 V112 M269,50 V112" stroke="#ea580c" stroke-width="2.6" opacity=".6" stroke-linecap="round"/>' +
      /* the elephant, drawn after the robe so the trunk reads as being in front of it */
      '<g fill="#cbd5e1" stroke="#64748b" stroke-width="4" stroke-linejoin="round">' +
      '<rect x="76" y="118" width="22" height="38" rx="9"/><rect x="104" y="120" width="22" height="36" rx="9"/>' +
      '<rect x="136" y="118" width="22" height="38" rx="9"/><rect x="162" y="120" width="22" height="36" rx="9"/>' +
      '<ellipse cx="124" cy="94" rx="54" ry="33"/>' +
      '<circle cx="186" cy="84" r="28"/>' +
      '<ellipse cx="170" cy="76" rx="15" ry="20" fill="#e2e8f0"/>' +
      '<path d="M196,86 C216,94 230,104 238,116 C240,121 237,127 231,125 C218,119 200,110 188,102 Z"/>' +
      '</g>' +
      '<path d="M76,80 q-14,10 -8,26" fill="none" stroke="#64748b" stroke-width="4.5" stroke-linecap="round"/>' +
      '<circle cx="196" cy="74" r="3.6" fill="#334155"/>' +
      '</svg>';
  }

  /* ---------- the fourteen gifts, in the sutta's order ---------- */
  var LADDER = [
    { who: 'තිරිසන්ගත සතෙකුට', much: 'සියගුණයක්' },
    { who: 'පෘථග්ජන <b>දුස්සීල</b> කෙනෙකුට', much: 'දහස්ගුණයක්' },
    { who: 'පෘථග්ජන <b>සීලවන්ත</b> කෙනෙකුට', much: 'ලක්ෂගුණයක්' },
    { who: 'බුදුසසුනෙන් බැහැර, කාමයන්හි වීතරාගී කෙනෙකුට', much: 'කෝටි ලක්ෂ ගුණයක්' },
    { who: '<b>සෝවාන් ඵලය සාක්ෂාත් කිරීමට පිළිපන්</b> කෙනෙකුට', much: 'ගණන් කළ නොහැකි, ප්‍රමාණ රහිත', top: true },
    { who: 'සෝතාපන්න සිට <b>සම්මා සම්බුදුරජාණන් වහන්සේ</b> දක්වා', much: '“කවර කතාද?”', top: true }
  ];

  /* ---------- the four ways a gift becomes pure ---------- */
  var PURE = [
    { k: 'yes', h: '1. දායකයාගෙන් පිරිසිදුයි',
      a: 'දායකයා — සිල්වත්, යහපත් ගුණධර්ම ඇති', b: 'ප්‍රතිග්‍රාහකයෝ — දුස්සීලයි',
      p: 'දානය පිරිසිදු වන්නේ <b>දායකයාගෙන්</b>. <b>මේක තමයි අපේ ප්‍රශ්නයට උත්තරය.</b>' },
    { k: '', h: '2. ප්‍රතිග්‍රාහකයාගෙන් පිරිසිදුයි',
      a: 'දායකයා — දුස්සීලයි', b: 'ප්‍රතිග්‍රාහකයෝ — සීලවන්තයි',
      p: 'දානය පිරිසිදු වන්නේ <b>ප්‍රතිග්‍රාහකයාගෙන්</b>.' },
    { k: 'no', h: '3. දෙපැත්තෙන්ම පිරිසිදු නෑ',
      a: 'දායකයා — දුස්සීලයි', b: 'ප්‍රතිග්‍රාහකයෝ — දුස්සීලයි',
      p: 'දායකයාගෙන්වත් ප්‍රතිග්‍රාහකයාගෙන්වත් පිරිසිදු වෙන්නේ නෑ.' },
    { k: 'yes', h: '4. දෙපැත්තෙන්ම පිරිසිදුයි',
      a: 'දායකයා — සිල්වත්', b: 'ප්‍රතිග්‍රාහකයෝ — සිල්වත්',
      p: 'දෙපැත්තෙන්ම පිරිසිදු වෙනවා. <b>මේක තමයි උතුම්ම එක.</b>' }
  ];

  function build() {
    $('ladder').innerHTML = LADDER.map(function (r) {
      return '<li' + (r.top ? ' class="top"' : '') + '><span>' + r.who + '</span><b>' + r.much + '</b></li>';
    }).join('');
    $('pure4').innerHTML = PURE.map(function (c) {
      return '<div class="pure' + (c.k ? ' ' + c.k : '') + '"><h3>' + esc(c.h) + '</h3>' +
        '<ul><li>' + esc(c.a) + '</li><li>' + esc(c.b) + '</li></ul><p>' + c.p + '</p></div>';
    }).join('');
    $('eleArt').innerHTML = eleArt();
  }

  var QS = [
    { ask: '“කාසාවකණ්ඨා” යන පාලි වචනයේ තේරුම මොකක්ද?',
      ok: 'බෙල්ලේ කසාවතක් පමණක් දරා සිටින අය',
      bad: ['කසාවත මසන අය', 'කසාවත පූජා කරන අය', 'කසාවත සේදූ අය'], go: '#wachana' },
    { ask: 'අනාගතයේ කාසාවකණ්ඨා පහළ වන බව වදාළේ කවුරුන් ඉදිරියේද?',
      ok: 'ආනන්ද ස්වාමීන් වහන්සේ ඉදිරියේ, දක්ඛිණා විභංග සූත්‍රයේදී',
      bad: ['සැරියුත් ස්වාමීන් වහන්සේ ඉදිරියේ', 'රජතුමා ඉදිරියේ', 'මහා ප්‍රජාපතී ගෝතමිය ඉදිරියේ'], go: '#wachana' },
    { ask: 'එවැනි කාලයක පවා සංඝයා උදෙසා දෙන දානය ගැන වදාළේ කුමක්ද?',
      ok: 'ඒ දානයට අසංඛෙය්‍ය වූ අප්‍රමාණ වූ අනුසස් තියෙන බව',
      bad: ['ඒ දානයෙන් පිනක් නැති බව', 'ඒ දානය දිය යුතු නැති බව', 'ඒ දානය අඩු පිනක් දෙන බව'], go: '#wachana' },
    { ask: '“අනාගතයේ භික්ෂූන් කොහොමද?” කියලා ඵුස්ස රහතන් වහන්සේගෙන් ඇහුවේ කවුද?',
      ok: 'පණ්ඩරගොත්ත නම් තාපසයා',
      bad: ['ආනන්ද ස්වාමීන් වහන්සේ', 'අනේපිඬු සිටුතුමා', 'පසේනදී රජතුමා'], go: '#anagatha' },
    { ask: 'ඵුස්ස රහතන් වහන්සේගේ ගාථා 956 න් කියවෙන්නේ කුමක්ද?',
      ok: 'ගුණවත් භික්ෂූන් වහන්සේලාත් ඉන්නවා, ඒත් උන්වහන්සේලා දුර්වල වෙලා යනවා',
      bad: ['ගුණවත් භික්ෂූන් කිසිවෙක් නැති වෙනවා', 'සියලු දෙනාම ගුණවත් වෙනවා', 'භික්ෂූන් සංඛ්‍යාව අඩු වෙනවා'], go: '#anagatha' },
    { ask: 'ඒ ගාථා කියවලා අපි කළ යුතු නැති දේ මොකක්ද?',
      ok: 'අද ඉන්න ස්වාමීන් වහන්සේ නමක් ගැන ඒවා පාවිච්චි කරලා කතා කිරීම',
      bad: ['ඒවා කියවීම', 'ඒවා මතක තබා ගැනීම', 'ගුරුතුමාගෙන් විමසීම'], go: '#anagatha' },
    { ask: 'ඵුස්ස රහතන් වහන්සේ ගාථා 978 – 979 න් අපට කියන්නේ කුමක්ද?',
      ok: 'ඒ කාලය එන්න කලින් මෘදු, නිහතමානී, මෛත්‍රී සිත් ඇතිව, සිල්වත්ව ජීවත් වෙන්න කියා',
      bad: ['භයවෙලා ඉන්න කියා', 'පැවිදි වෙන්න කියා', 'කිසිවකුට දන් නොදෙන්න කියා'], go: '#anagatha' },
    { ask: 'ධම්මපදය 9 සහ 10 ගාථාවලින් වෙන් කරලා දෙන්නේ මොනවාද?',
      ok: 'සිවුර සහ සිවුර දරන කෙනා — සිවුරට සුදුසු වන්නේ කවුද යන්න',
      bad: ['සිවුරේ පාට දෙකක්', 'ගිහි ජීවිතය සහ පැවිදි ජීවිතය', 'දානය සහ සීලය'], go: '#deka' },
    { ask: 'කසාවතට තියෙන අනික් නම මොකක්ද?',
      ok: 'අරහත් ධජය',
      bad: ['බෝධි ධජය', 'ධම්ම චක්‍රය', 'සංඝ මුද්‍රාව'], go: '#deka' },
    { ask: 'ඡද්දන්ත ඇත් රජා කවුද?',
      ok: 'අපේ මහා බෝසතාණන් වහන්සේ',
      bad: ['ආනන්ද ස්වාමීන් වහන්සේ', 'දේවදත්ත', 'පසේ බුදුරජාණන් වහන්සේ'], go: '#atha' },
    { ask: 'වැදි නායකයා සිවුරක් පොරෝගත්තේ ඇයි?',
      ok: 'ඇත් රජා සිවුරට වඳින නිසා, ළං වෙන්න පුළුවන් කියලා',
      bad: ['සීතලට', 'පැවිදි වෙන්න', 'වැස්සට'], go: '#atha' },
    { ask: 'වැද්දා හිංසා කරද්දී ඇත් රජා කළේ කුමක්ද?',
      ok: 'තරහ නොගෙන, පහන් සිතින් සිවුරට ගෞරව කළා',
      bad: ['වැද්දාට පහර දුන්නා', 'පැන ගියා', 'අනික් ඇතුන් කැඳෙව්වා'], go: '#atha' },
    { ask: 'දක්ඛිණා විභංග සූත්‍රයට අනුව, පෘථග්ජන දුස්සීල කෙනෙකුට දුන් දානයෙන් කැමති විය යුත්තේ කුමක්ද?',
      ok: 'දහස්ගුණයක දානානිසංසයක්',
      bad: ['කිසිම අනුසසක් නැති බවක්', 'සියගුණයක්', 'ලක්ෂගුණයක්'], go: '#pina' },
    { ask: 'දානය පිරිසිදු වන ආකාර කීයක් වදාළාද?',
      ok: 'හතරක්', bad: ['දෙකක්', 'තුනක්', 'හතක්'], go: '#pirisidu' },
    { ask: 'දායකයා සිල්වත් වෙලා, ප්‍රතිග්‍රාහකයා දුස්සීල නම්, දානය පිරිසිදු වන්නේ කොහොමද?',
      ok: 'දායකයාගේ පැත්තෙන්',
      bad: ['කිසිම පැත්තකින් නෑ', 'ප්‍රතිග්‍රාහකයාගේ පැත්තෙන්', 'දෙපැත්තෙන්ම'], go: '#pirisidu' },
    { ask: 'ධම්මපදය 252, 253 ගාථාවලින් අපට කියන්නේ කුමක්ද?',
      ok: 'අනුන්ගේ වැරදි හොය හොයා ඉන්න එපා, තමන්ගේ වැරදි බලන්න කියා',
      bad: ['අනුන්ගේ වැරදි හොඳට හොයන්න කියා', 'කිසිවක් නොකියා ඉන්න කියා', 'වැරදි කරන අයට දඬුවම් දෙන්න කියා'], go: '#mama' }
  ];

  var VOWS = [
    'කසාවතක් දැක්කම, ඒක අරහත් ධජය බව සිහි කරලා ගෞරවයෙන් වඳිනවා.',
    'දානයක් දෙනකොට “සංඝයාට” කියලා දෙන්න මතක් කරනවා.',
    'කාගේ හරි වැරැද්දක් ගැන අහුණොත්, ඒක අනිත් අයට කියාගෙන යන්නේ නෑ.',
    'මගේ වැරදි මොනවාද කියලා දවසට එක පාරක් හිතලා බලනවා.',
    'ගුණවත් ස්වාමීන් වහන්සේලාගේ බණ අහන්න, ඇසුරු කරන්න උත්සාහ කරනවා.',
    'තරහ ආවොත්, ඡද්දන්ත ඇත් රජා සිහි කරලා ඉවසනවා.',
    'මගේ පැත්ත පිරිසිදුව තියාගන්නවා — සිල්වත්ව, පහන් සිතින්.'
  ];

  global.LessonKit({
    lesson: 'kasavakantha', item: 'kasavakantha', heroArt: heroArt,
    vows: VOWS, questions: QS, backTo: '#wachana'
  });
  build();
})(window);
