/* සඟගුණ — a lesson page (sagaguna.html).

   The shared machinery (citations, promises, test, Join pill) is in lesson-kit.js.
   This file holds only this lesson's two pictures, the nine qualities, the four pairs
   of persons, and its questions.

   About the nine: the words are the Buddha's, from the Dhajagga formula quoted on the
   page. The last five are explained in plain Sinhala inside the Itivuttaka Aggappasāda
   sutta itself, which is also quoted on the page — so those carry `sutta: true`. The
   first four are explained only in the Mahamevnawa articles, and each links to the one
   it came from. */
(function (global) {
  'use strict';

  var esc = global.LessonKit.esc;
  function $(id) { return document.getElementById(id); }

  /* ---------- picture: an alms bowl standing in a field of young plants ---------- */
  function heroArt() {
    /* the seedlings stand clear of the robe (x≈58) and the bowl (x≈118–202), or the robe
       ends up with stems either side of it and reads as a bench */
    var crop = '';
    [16, 104, 228, 260, 292].forEach(function (x) {
      crop += '<g transform="translate(' + x + ',196)">' +
        '<path d="M0,0 v-20" stroke="#4d7c0f" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M0,-12 q-10,-3 -12,-13 q11,0 12,13 z" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<path d="M0,-14 q10,-3 12,-13 q-11,0 -12,13 z" fill="#bef264" stroke="#4d7c0f" stroke-width="2.4" stroke-linejoin="round"/></g>';
    });
    return '<svg viewBox="0 0 320 250" role="img" aria-label="පැළෑටි වැවෙන කෙතක් මැද පිඬු සිඟන පාත්‍රයක්">' +
      '<circle cx="160" cy="130" r="104" fill="#f7fee7"/>' +
      /* sun */
      '<circle cx="256" cy="62" r="20" fill="#fef9c3" stroke="#ca8a04" stroke-width="3.5"/>' +
      /* furrows */
      '<path d="M26,212 q134,-16 268,0" fill="none" stroke="#65a30d" stroke-width="4" opacity=".5"/>' +
      '<path d="M26,224 q134,-16 268,0" fill="none" stroke="#65a30d" stroke-width="4" opacity=".35"/>' +
      crop +
      /* the alms bowl on a low stand, standing on the crop row */
      '<g transform="translate(160,146)">' +
      '<path d="M-42,-8 a42,42 0 0 0 84,0 z" fill="#fef3c7" stroke="#4d7c0f" stroke-width="5" stroke-linejoin="round"/>' +
      '<ellipse cx="0" cy="-8" rx="42" ry="9" fill="#ffffff" stroke="#4d7c0f" stroke-width="5"/>' +
      '<rect x="-20" y="34" width="40" height="10" rx="5" fill="#ecfccb" stroke="#4d7c0f" stroke-width="4"/></g>' +
      /* a folded robe beside it */
      '<g transform="translate(58,178)">' +
      '<rect x="-24" y="0" width="48" height="13" rx="4" fill="#fed7aa" stroke="#c2410c" stroke-width="3.5"/>' +
      '<rect x="-20" y="-12" width="40" height="13" rx="4" fill="#fdba74" stroke="#c2410c" stroke-width="3.5"/></g>' +
      '</svg>';
  }

  /* ---------- picture: seed falling on good ground ---------- */
  function fieldArt() {
    return '<svg viewBox="0 0 300 180" role="img" aria-label="හොඳ කුඹුරක වැවෙන අස්වැන්න">' +
      '<rect x="0" y="0" width="300" height="180" rx="18" fill="#f7fee7"/>' +
      '<path d="M0,180 L0,132 Q150,118 300,132 L300,180 z" fill="#65a30d" opacity=".22"/>' +
      '<path d="M0,140 Q150,126 300,140" fill="none" stroke="#4d7c0f" stroke-width="4"/>' +
      '<g>' +
      '<g transform="translate(60,138)"><path d="M0,0 v-40" stroke="#4d7c0f" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M0,-26 q-14,-4 -17,-18 q15,0 17,18 z" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<path d="M0,-30 q14,-4 17,-18 q-15,0 -17,18 z" fill="#bef264" stroke="#4d7c0f" stroke-width="2.6" stroke-linejoin="round"/></g>' +
      '<g transform="translate(130,138)"><path d="M0,0 v-54" stroke="#4d7c0f" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M0,-34 q-16,-5 -19,-21 q17,0 19,21 z" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<path d="M0,-40 q16,-5 19,-21 q-17,0 -19,21 z" fill="#bef264" stroke="#4d7c0f" stroke-width="2.6" stroke-linejoin="round"/></g>' +
      '<g transform="translate(206,138)"><path d="M0,0 v-46" stroke="#4d7c0f" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M0,-30 q-15,-4 -18,-19 q16,0 18,19 z" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<path d="M0,-35 q15,-4 18,-19 q-16,0 -18,19 z" fill="#bef264" stroke="#4d7c0f" stroke-width="2.6" stroke-linejoin="round"/></g></g>' +
      /* seed falling */
      '<g fill="#ca8a04"><ellipse cx="258" cy="48" rx="5" ry="7"/><ellipse cx="272" cy="70" rx="4" ry="6"/><ellipse cx="248" cy="80" rx="4" ry="6"/></g>' +
      '</svg>';
  }

  /* ---------- the nine, in the order the formula gives them ---------- */
  var NINE = [
    { pali: 'සුපටිපන්නෝ', si: 'සුපටිපන්න ය',
      what: '<b>යහපත් ප්‍රතිපදාවට පිළිපන්</b> පිරිසක්.',
      you: 'සීලය, ඉන්ද්‍රිය සංවරය, භාවනාව — ඒ හැම එකකම අරමුණ රාග, ද්වේෂ, මෝහ දුරු කිරීමයි.', art: 'GS_SUPATI' },
    { pali: 'උජුපටිපන්නෝ', si: 'උජුපටිපන්න ය',
      what: '<b>ඍජු</b> ප්‍රතිපදාවට පිළිපන් පිරිසක්.',
      you: 'ආර්ය අෂ්ටාංගික මාර්ගය වංගු නැති, කෙළින් මගක්. උන්වහන්සේලා යන්නේ ඒ කෙළින් මගේ.', art: 'GS_NEKA' },
    { pali: 'ඤායපටිපන්නෝ', si: 'ඤායපටිපන්න ය',
      what: '<b>අවබෝධය පිණිස</b> පිළිපන් පිරිසක්.',
      you: 'ඉගෙන ගන්නේ විභාගයකට නෙවෙයි. ආර්ය සත්‍යය අවබෝධ කරගන්නයි.', art: 'GS_NEKA' },
    { pali: 'සාමීචිපටිපන්නෝ', si: 'සාමීචිපටිපන්න ය',
      what: '<b>සුදුසු විදිහට</b> පිළිපන් පිරිසක්.',
      you: 'අවබෝධයට උදව් වෙන කතා විතරයි කථා කරන්නේ. නිකම් කතාවෙන් කල් මරන්නේ නෑ.', art: 'GS_NEKA' },
    { pali: 'ආහුනෙය්‍යෝ', si: 'ආහුනෙය්‍ය ය',
      what: '<b>දුර සිට ගෙනැවිත්</b> දන් පැන් පුදන්න තරම් ගුණවත් නිසා.',
      you: 'ඈත ඉඳන් හරි ගෙනැත් පුදන්න වටිනවා කියන එක.', sutta: true, art: 'GS_PINKETA' },
    { pali: 'පාහුනෙය්‍යෝ', si: 'පාහුනෙය්‍ය ය',
      what: '<b>ආගන්තුක සත්කාර</b> කරන්න තරම් ගුණවත් නිසා.',
      you: 'හදිසියේ ගෙදරට වැඩියොත්, ලොකුම ආගන්තුකයා වගේ සලකන්න ඕනෙ.', sutta: true, art: 'GS_PINKETA' },
    { pali: 'දක්ඛිණෙය්‍යෝ', si: 'දක්ඛිණෙය්‍ය ය',
      what: '<b>පින් සලකාගෙන</b> දන් පැන් පුදන්න තරම් ගුණවත් නිසා.',
      you: 'පින් පතාගෙන දෙන දානය පිළිගන්න සුදුසුම පිරිස.', sutta: true, art: 'GS_PINKETA' },
    { pali: 'අඤ්ජලිකරණීයෝ', si: 'අංජලිකරණීය ය',
      what: '<b>දෑත් එක් කොට වඳින්න</b> තරම් ගුණවත් නිසා.',
      you: 'ස්වාමීන් වහන්සේ නමක් දැක්කම ආසනයෙන් නැගිටලා දෑත් එක් කොට වඳිනවා.', sutta: true, art: 'GS_PINKETA' },
    { pali: 'අනුත්තරං පුඤ්ඤක්ඛෙත්තං ලෝකස්ස', si: 'ලෝකයාගේ අනුත්තර පින්කෙත ය',
      what: 'ලෝකයාට <b>ඊට වඩා හොඳ පින් කෙතක් නැති</b> නිසා.',
      you: 'හොඳ කුඹුරකට දාන වී ටිකෙන් ලොකු අස්වැන්නක් එනවා වගේ.', sutta: true, art: 'GS_PINKETA' }
  ];

  /* ---------- the four pairs ---------- */
  var PAIRS = [
    { n: 'සෝවාන්', sub: 'සිව් අපායෙන් නිදහස්', a: 'සෝවාන් ඵලය සාක්ෂාත් කිරීමට පිළිපන් කෙනා', b: 'සෝවාන් වූ කෙනා' },
    { n: 'සකදාගාමී', sub: 'නැවත එක් වරක් පමණක් මෙලොවට', a: 'සකදාගාමී ඵලය සාක්ෂාත් කිරීමට පිළිපන් කෙනා', b: 'සකදාගාමී වූ කෙනා' },
    { n: 'අනාගාමී', sub: 'නැවත මෙලොවට නොඑන', a: 'අනාගාමී ඵලය සාක්ෂාත් කිරීමට පිළිපන් කෙනා', b: 'අනාගාමී වූ කෙනා' },
    { n: 'අරහත්', sub: 'සියලු කෙලෙසුන්ගෙන් නිදහස්', a: 'අරහත් ඵලය සාක්ෂාත් කිරීමට පිළිපන් කෙනා', b: 'රහතන් වහන්සේ' }
  ];

  function build() {
    var arts = (global.SM_REFS && global.SM_REFS.articles) || {};
    $('gunaGrid').innerHTML = NINE.map(function (g, i) {
      var a = arts[g.art];
      var link = a ? '<a class="ref-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">මහමෙව්නාවේ පැහැදිලි කිරීම ↗</a>' : '';
      return '<article class="guna"><b>' + (i + 1) + '</b><div>' +
        '<h3>' + esc(g.si) + '<span class="gn-pali" lang="pi">' + esc(g.pali) + '</span></h3>' +
        '<p>' + g.what + '</p>' +
        '<p class="gn-you">' + g.you + '</p>' +
        '<span class="gn-tag ' + (g.sutta ? 'sutta">☸ සූත්‍රයක්' : 'only">📄 ලිපියක්') + '</span> ' + link +
        '</div></article>';
    }).join('');
    $('gunaCount').textContent = NINE.length;
    $('pairs4').innerHTML = PAIRS.map(function (p, i) {
      return '<div class="pair"><h3>' + (i + 1) + '. ' + esc(p.n) + '<span class="gn-pali">' + esc(p.sub) + '</span></h3>' +
        '<ul><li>' + esc(p.a) + '<span>මගට පිළිපන් කෙනා</span></li>' +
        '<li>' + esc(p.b) + '<span>ඵලයට පැමිණි කෙනා</span></li></ul></div>';
    }).join('');
    $('fieldArt').innerHTML = fieldArt();
  }

  var QS = [
    { ask: 'ආර්ය මහා සංඝරත්නයේ ගුණ කීයක් ගැනද අපි කියවන්නේ?',
      ok: 'නවයක්', bad: ['හයක්', 'හතරක්', 'අටක්'], go: '#guna' },
    { ask: 'සංඝයාගේ ගුණ කියවෙන වචන පෙළ පටන් ගන්නේ කොහොමද?',
      ok: 'සුපටිපන්නෝ භගවතෝ සාවකසංඝෝ…',
      bad: ['ඉතිපි සෝ භගවා…', 'ස්වාක්ඛාතෝ භගවතා ධම්මෝ…', 'සංඝං සරණං ගච්ඡාමි…'], go: '#wachana' },
    { ask: 'මුල් ගුණ හතරෙන් කියවෙන්නේ මොකක්ද?',
      ok: 'උන්වහන්සේලා පිළිපදින විදිහ',
      bad: ['උන්වහන්සේලාගේ වයස', 'උන්වහන්සේලාගේ සංඛ්‍යාව', 'උන්වහන්සේලා වැඩ සිටින තැන්'], go: '#guna' },
    { ask: '“උජුපටිපන්න” යන ගුණයෙන් කියවෙන්නේ කුමක්ද?',
      ok: 'ඍජු ප්‍රතිපදාවට පිළිපන් බව',
      bad: ['උස් තැනක වාසය කරන බව', 'ඉක්මනින් ගමන් කරන බව', 'තනිව වාසය කරන බව'], go: '#guna' },
    { ask: '“මාර්ගඵල යුගල වශයෙන් සතරක්, පුද්ගල වශයෙන් අට දෙනෙක්” කියන්නේ ඇයි?',
      ok: 'තැන් හතරක් ඇති නිසා, සහ හැම තැනකම මගට පිළිපන් කෙනා සහ ඵලයට පැමිණි කෙනා වශයෙන් දෙන්නෙක් ඇති නිසා',
      bad: ['භික්ෂූන් අට නමක් පමණක් සිටි නිසා', 'අටක් සිල් ඇති නිසා', 'අට දිශාවක් ඇති නිසා'], go: '#atadena' },
    { ask: 'ඒ යුගල සතර මොනවාද?',
      ok: 'සෝවාන්, සකදාගාමී, අනාගාමී, අරහත්',
      bad: ['දාන, සීල, භාවනා, පින්', 'සතිපට්ඨාන සතර', 'සතර බ්‍රහ්මවිහරණය'], go: '#atadena' },
    { ask: '“ආහුනෙය්‍ය” යන ගුණයෙන් කියවෙන්නේ කුමක්ද?',
      ok: 'දුර සිට දන් පැන් ගෙනවුත් පිදීමට තරම් ගුණවත් බව',
      bad: ['ආහාර පිසීමට සුදුසු බව', 'දුර ගමන් යා යුතු බව', 'දුර සිට පැමිණි බව'], go: '#guna' },
    { ask: '“අංජලිකරණීය” යන ගුණයෙන් කියවෙන්නේ කුමක්ද?',
      ok: 'දෑත් එක් කොට වැඳුම් පිදුම් කිරීමට තරම් ගුණවත් බව',
      bad: ['කතා කිරීමට සුදුසු බව', 'අත දීමට සුදුසු බව', 'ලිපි ලිවීමට සුදුසු බව'], go: '#guna' },
    { ask: '“අනුත්තර පින්කෙත” යනුවෙන් සංඝයා උපමා කරන්නේ කුමකටද?',
      ok: 'අස්වැන්න දෙන හොඳම කුඹුරට',
      bad: ['උස් පර්වතයකට', 'ගලා යන ගඟකට', 'රන් භාණ්ඩයකට'], go: '#pinketa' },
    { ask: 'දක්ඛිණා විභංග සූත්‍රයේ මහා ප්‍රජාපතී ගෝතමියට වදාළේ කුමක්ද?',
      ok: 'සංඝයාට පූජා කරන්න කියා — එවිට උන්වහන්සේටත්, සංඝයාටත් පිදුවා වන බව',
      bad: ['තමාට පමණක් පූජා කරන්න කියා', 'පූජා නොකරන්න කියා', 'දෙවියන්ට පූජා කරන්න කියා'], go: '#pinketa' },
    { ask: 'පහාරාද සූත්‍රයේ, මහා ගංගා මුහුදට පැමිණි විට සිදු වන්නේ කුමක්ද?',
      ok: 'ඒවායේ පැරණි නම් ගොත් අත්හැරෙනවා',
      bad: ['ඒවා වියළී යනවා', 'මුහුද පිරෙනවා', 'ඒවා ආපසු හැරෙනවා'], go: '#hamoma' },
    { ask: 'ඒ උපමාවෙන් සසුන ගැන වදාළේ කුමක්ද?',
      ok: 'කුල හතරේම අය පැවිදි වී පැරණි නම් ගොත් අත්හැර එකම නමකට එන බව',
      bad: ['එක කුලයකට පමණක් පැවිදි විය හැකි බව', 'නම වෙනස් නොවන බව', 'පැවිදි වීම අසීරු බව'], go: '#hamoma' },
    { ask: 'ආනන්ද ස්වාමීන් වහන්සේ “නිවන් මගේ හරි අඩක් කලණ මිතුරන්” කී විට උන්වහන්සේ වදාළේ කුමක්ද?',
      ok: '“එසේ නොපවසව” කියා — ඒක මුළුමනින්ම නිවන් මග බව',
      bad: ['එය හරි බව', 'එය වැදගත් නැති බව', 'එය හතරෙන් එකක් බව'], go: '#mithura' },
    { ask: 'ධම්මපදය 194 ගාථාවේ කියවෙන සැප හතර අතර සංඝයා ගැන ඇත්තේ මොනවාද?',
      ok: 'සංඝයාගේ සමගිය සහ සමගි සංඝයාගේ බණ භාවනාව',
      bad: ['සංඝයාගේ සංඛ්‍යාව සහ වයස', 'විහාරවල ලස්සන', 'දානයේ ප්‍රමාණය'], go: '#mithura' },
    { ask: 'අභිසන්ද සූත්‍රයේ වදාළ පුණ්‍ය ප්‍රවාහ හතර මොනවාද?',
      ok: 'බුදු, දහම්, සඟ කෙරෙහි නොසෙල්වෙන පැහැදීම සහ ආර්යකාන්ත සීලය',
      bad: ['දාන, සීල, භාවනා, පින් අනුමෝදනාව', 'සතර සතිපට්ඨානය', 'සතර බ්‍රහ්මවිහරණය'], go: '#sarana' },
    { ask: 'අනුස්සතිට්ඨාන සූත්‍රයේ සිහි කළ යුතු තැන් සයෙන් මුල් තුන මොනවාද?',
      ok: 'බුද්ධානුස්සතිය, ධම්මානුස්සතිය, සංඝානුස්සතිය',
      bad: ['සීලානුස්සතිය, චාගානුස්සතිය, දේවතානුස්සතිය', 'ආනාපානසතිය, මෛත්‍රිය, කරුණාව', 'දානය, සීලය, භාවනාව'], go: '#sarana' }
  ];

  var VOWS = [
    'දවසකට එක පාරක්වත් “සුපටිපන්නෝ භගවතෝ සාවකසංඝෝ…” කියලා සඟ ගුණ සිහි කරනවා.',
    'ස්වාමීන් වහන්සේ නමක් දැක්කම ආසනයෙන් නැගිටලා දෑත් එක් කොට වඳිනවා.',
    'ගුණ නවය කටපාඩමින් කියවන්න ඉගෙන ගන්නවා.',
    'දානයක් දෙනකොට “සංඝයාට” කියලා දෙන්න මතක් කරනවා.',
    'පන්තියේදී කාටවත් කුල, රට, භාෂාව අනුව වෙනස් විදිහට සලකන්නේ නෑ.',
    'යාළුවෙකුට හොඳ දෙයක් කරන්න උදව් කරලා, මමත් කලණ මිතුරෙක් වෙනවා.',
    'පන්තියේ අය එක්ක සමගියෙන් ඉන්නවා — රණ්ඩු වෙන්නේ නෑ.'
  ];

  global.LessonKit({
    lesson: 'sagaguna', item: 'sagaguna', heroArt: heroArt,
    vows: VOWS, questions: QS, backTo: '#guna'
  });
  build();
})(window);
