/* බුදුගුණ — a lesson page (buduguna.html).

   The shared machinery (citations, promises, test, Join pill) is in lesson-kit.js.
   This file holds only this lesson's picture, the nine qualities and its questions.

   About the nine: the words themselves come from the formula the Buddha gave in the
   Dhajagga sutta, which is quoted on the page by key from refs.js. The Sutta Pitaka
   unpacks only some of them one by one — බුද්ධ in the Dōṇa sutta, තථාගත in the
   Lōkāvabōdha sutta, පුරිසදම්මසාරථි in the Kēsī sutta. The short meanings below are
   therefore NOT presented as sutta text: each carries a link to the Mahamevnawa article
   it came from, and `sutta: true` marks only those three that a sutta really does
   explain. Do not quietly promote a meaning to Buddha-word. */
(function (global) {
  'use strict';

  var esc = global.LessonKit.esc;
  function $(id) { return document.getElementById(id); }

  /* ---------- picture: a stupa with nine lotus buds ---------- */
  function heroArt() {
    var buds = '';
    for (var i = 0; i < 9; i++) {
      var a = Math.PI * (1.08 + i * 0.105), x = 160 + Math.cos(a) * 126, y = 168 + Math.sin(a) * 118;
      buds += '<g transform="translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')">' +
        '<path d="M0,5 q-9,-4 -9,-12 q0,-7 9,-11 q9,4 9,11 q0,8 -9,12 z" fill="#fde68a" stroke="#b45309" stroke-width="2.4"/></g>';
    }
    return '<svg viewBox="0 0 320 250" role="img" aria-label="නෙළුම් කැකුළු නවයකින් වට වූ දාගැබක්">' +
      '<circle cx="160" cy="132" r="104" fill="#fffbeb"/>' + buds +
      /* the stupa: two base slabs, dome, harmika, spire */
      '<rect x="112" y="186" width="96" height="14" rx="4" fill="#fef3c7" stroke="#a16207" stroke-width="4"/>' +
      '<rect x="122" y="172" width="76" height="14" rx="4" fill="#fef3c7" stroke="#a16207" stroke-width="4"/>' +
      '<path d="M124,172 a36,36 0 0 1 72,0 z" fill="#fde68a" stroke="#a16207" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<rect x="148" y="112" width="24" height="18" rx="3" fill="#fef3c7" stroke="#a16207" stroke-width="4"/>' +
      '<path d="M160,70 l9,42 h-18 z" fill="#fcd34d" stroke="#a16207" stroke-width="4" stroke-linejoin="round"/>' +
      '<circle cx="160" cy="64" r="6" fill="#fcd34d" stroke="#a16207" stroke-width="3.5"/>' +
      '</svg>';
  }

  /* ---------- the nine, in the order the formula gives them ---------- */
  var NINE = [
    { pali: 'අරහං', si: 'අරහත් වන සේක',
      what: 'සිතේ තිබුණු හැම කෙලෙසක්ම මුළුමනින්ම නැති කරගත් කෙනා. තරහ නෑ, ලෝභ නෑ, මෝහ නෑ.',
      you: 'ගුරුවරයෙක්ගේ උදව්වක් නැතුව, තනියම ඒ මග හොයාගෙනයි උන්වහන්සේ ඒකට ගියේ.', art: 'MM_ARAHAM' },
    { pali: 'සම්මා සම්බුද්ධෝ', si: 'සම්මාසම්බුද්ධ වන සේක',
      what: 'කවුරුවත් උගන්වලා නෙවෙයි — සතර ආර්ය සත්‍යය <b>තනිවම</b>, <b>නිවැරදිවම</b> අවබෝධ කරගත් කෙනා.',
      you: '“සම්මා” කියන්නේ නිවැරදි. “සම්” කියන්නේ තමන්ම. “බුද්ධ” කියන්නේ අවබෝධ කළා.', art: 'MM_SAMMA' },
    { pali: 'විජ්ජාචරණසම්පන්නෝ', si: 'විජ්ජාචරණ සම්පන්න වන සේක',
      what: '<b>විජ්ජා</b> (දැනුම) සහ <b>චරණ</b> (හැසිරීම) යන දෙකෙන්ම පරිපූර්ණ කෙනා.',
      you: 'දන්නවා විතරක් නෙවෙයි — දන්න දේ අනුවම ජීවත් වෙනවා. ඒ දෙක එකට තියෙන එක තමයි ලොකුම දේ.', art: 'GS_VIJJA' },
    { pali: 'සුගතෝ', si: 'සුගත වන සේක',
      what: 'ආර්ය අෂ්ටාංගික මාර්ගය මුළුමනින්ම ගෙවලා, අවසානයට — නිවනට — <b>මනාකොට ගිය</b> කෙනා.',
      you: '“සු” කියන්නේ හොඳින්. “ගත” කියන්නේ ගියා. හොඳින් ගිය කෙනා.', art: 'GS_SUGATHA' },
    { pali: 'ලෝකවිදූ', si: 'ලෝකවිදූ වන සේක',
      what: 'ලෝකයත්, ලෝකය හටගන්න හැටිත්, ලෝකය නැති වෙන හැටිත් <b>මුළුමනින්ම දැනගත්</b> කෙනා.',
      you: 'ඒකම උන්වහන්සේ වදාළා: “දෙවි මිනිසුන් දැක්ක, ඇහුව, දැනගත්ත ඔක්කොම තථාගතයන් වහන්සේ අවබෝධ කළා.”',
      sutta: true, art: 'GS_SUGATHA' },
    { pali: 'අනුත්තරෝ පුරිසදම්මසාරථි', si: 'අනුත්තර පුරිසදම්මසාරථී වන සේක',
      what: 'හික්මවිය යුතු අයව හික්මවීමේදී <b>උන්වහන්සේට වඩා උතුම් කෙනෙක් නෑ</b>.',
      you: 'අශ්ව පුහුණු කරන කේසීට උන්වහන්සේ ඒක පැහැදිලි කරලා දුන්නා. ඒ කතාව පහළින් තියෙනවා.',
      sutta: true, art: 'GS_SATTHA' },
    { pali: 'සත්ථා දේවමනුස්සානං', si: 'සත්ථා දේවමනුස්සානං වන සේක',
      what: '<b>දෙවියන්ටත් මිනිසුන්ටත්</b> ශාස්තෘන් වහන්සේ — ගුරුතුමා.',
      you: 'කතරක් තරණය කරවන ගැල් නායකයෙක් වගේ, සසර දුකෙන් එතෙර වෙන මග පෙන්නනවා.', art: 'GS_SATTHA' },
    { pali: 'බුද්ධෝ', si: 'බුද්ධ වන සේක',
      what: 'තමන් අවබෝධ කරගත් සත්‍යය <b>අනිත් අයටත් අවබෝධ කරවන</b> කෙනා.',
      you: 'උන්වහන්සේම වදාළා: “බ්‍රාහ්මණය, මා ‘බුද්ධ’ යනුවෙන් දරා ගන්න.” ඒ කතාව පහළින් තියෙනවා.',
      sutta: true, art: 'MM_BUDDHA' },
    { pali: 'භගවා', si: 'භගවත් වන සේක',
      what: 'සියලු කෙලෙස් නසලා, ප්‍රඥාවෙනුත් මහා කරුණාවෙනුත් යුතුව <b>ලෝකයට යහපත ගෙනා</b> භාග්‍යවන්ත තැනැත්තා.',
      you: 'ඉහත ගුණ අටම එකතු කළාම එන නම තමයි “භගවා”. ඒ නිසයි අපි “භාග්‍යවතුන් වහන්සේ” කියන්නේ.', art: 'GS_BHAGAVA' }
  ];

  function buildNine() {
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
    var el = $('gunaCount'); if (el) el.textContent = NINE.length;
  }

  var QS = [
    { ask: 'බුදුරජාණන් වහන්සේගේ ප්‍රධාන ගුණ කීයක් ගැනද අපි කියවන්නේ?',
      ok: 'නවයක්', bad: ['තුනක්', 'හයක්', 'දොළහක්'], go: '#guna' },
    { ask: 'ඒ ගුණ නවය එකතු කොට වදාළ වචන පෙළ පටන් ගන්නේ කොහොමද?',
      ok: 'ඉතිපි සෝ භගවා අරහං සම්මාසම්බුද්ධෝ…',
      bad: ['ස්වාක්ඛාතෝ භගවතා ධම්මෝ…', 'සුපටිපන්නෝ භගවතෝ සාවකසංඝෝ…', 'බුද්ධං සරණං ගච්ඡාමි…'], go: '#wachana' },
    { ask: 'ද්‍රෝණ බ්‍රාහ්මණයා “ඔබ කවුද?” කියා ඇසූ විට, උන්වහන්සේ තමන්ව උපමා කළේ කුමකටද?',
      ok: 'ජලයේ හැදී, ජලයෙන් උඩට නැඟී, ජලය නොතැවරෙන නෙළුම් මලකට',
      bad: ['පර්වතයකට', 'මහා සමුද්‍රයකට', 'සූර්යයාට'], go: '#nelum' },
    { ask: 'ඒ උපමාවෙන් උන්වහන්සේ වදාළේ කුමක්ද?',
      ok: 'ලෝකයේ ඉපිද, ලෝකයේ වැඩී, ලෝකයේ පහස නොලබා වාසය කරන බව',
      bad: ['ලෝකයෙන් පලා ගිය බව', 'ලෝකයට පැමිණ නැති බව', 'ලෝකය නිර්මාණය කළ බව'], go: '#nelum' },
    { ask: 'ලෝකාවබෝධ සූත්‍රයේ “තථාගත” යන නාමයට දුන් එක් හේතුවක් කුමක්ද?',
      ok: 'කියන දේටම කටයුතු කරන, කරන දේම කියන නිසා',
      bad: ['බොහෝ රටවල් වැඩම කළ නිසා', 'දීර්ඝ කාලයක් ජීවත් වූ නිසා', 'බොහෝ ශිෂ්‍යයන් සිටි නිසා'], go: '#kiyana' },
    { ask: 'අග්ගප්පසාද සූත්‍රයේ වදාළ පරිදි, සියලු සත්වයන් අතර අග්‍ර වන්නේ කවුද?',
      ok: 'අරහත් සම්මා සම්බුද්ධ වූ තථාගතයන් වහන්සේ',
      bad: ['ශක්‍ර දේවේන්ද්‍රයා', 'මහා බ්‍රහ්මයා', 'සක්විති රජු'], go: '#agra' },
    { ask: 'අග්‍ර වූ තැනකට සිත පහදවා ගත්තොත් ලැබෙන විපාකය කෙබඳුද?',
      ok: 'විපාකයත් අග්‍ර වෙනවා', bad: ['විපාකයක් නෑ', 'විපාකය කුඩායි', 'විපාකය එන්නේ නෑ'], go: '#agra' },
    { ask: 'කේසී කියන්නේ කවුද?',
      ok: 'අශ්වයන් පුහුණු කරන ප්‍රසිද්ධ තැනැත්තෙක්',
      bad: ['රජ කෙනෙක්', 'බ්‍රාහ්මණයෙක්', 'වෙළෙන්දෙක්'], go: '#hikmavana' },
    { ask: 'උන්වහන්සේගේ “මෘදු ක්‍රමය” කියන්නේ මොකක්ද?',
      ok: 'කයෙන්, වචනයෙන්, සිතින් කරන සුචරිතයත් එහි විපාකයත් කියා දීම',
      bad: ['තෑගි දීම', 'නිහඬව සිටීම', 'දඬුවම් දීම'], go: '#hikmavana' },
    { ask: 'ධම්මපදය 182 ගාථාවේ වදාළ පරිදි, ඒ සියල්ලටම වඩා දුර්ලභ දෙය කුමක්ද?',
      ok: 'බුදුරජාණන් වහන්සේලාගේ ඉපදීම',
      bad: ['ධනවත් වීම', 'දීර්ඝායුෂ ලැබීම', 'රජ කෙනෙක් වීම'], go: '#pahala' },
    { ask: 'ධම්මපදය 183 ගාථාවේ, බුදුවරයන් වහන්සේලාගේ අනුශාසනය කොටස් කීයකින් වදාළාද?',
      ok: 'තුනකින් — පව් නොකිරීම, කුසල් රැස් කිරීම, සිත පිරිසිදු කර ගැනීම',
      bad: ['එකකින්', 'පහකින්', 'අටකින්'], go: '#pahala' },
    { ask: 'ධජග්ග සූත්‍රයේ, බිය හටගත් විට මහණුන්ට වදාළේ කුමක් කරන්නද?',
      ok: 'බුදුරජාණන් වහන්සේව සිහි කරන්න',
      bad: ['දුවන්න', 'ශක්‍ර දෙවියාගෙන් උදව් ඉල්ලන්න', 'නිහඬව සිටින්න'], go: '#baya' },
    { ask: 'ශක්‍ර දෙවියාගේ කොඩි මුදුන දෙස බැලීමෙන් බිය පහව යන්නත්, නොයන්නත් පුළුවන් වන්නේ ඇයි?',
      ok: 'ශක්‍ර දේවේන්ද්‍රයා තාම රාගය, ද්වේෂය, මෝහය දුරු කර නැති නිසා',
      bad: ['එයා ඉතා දුර සිටින නිසා', 'කොඩිය කුඩා නිසා', 'එයා නොපෙනෙන නිසා'], go: '#baya' },
    { ask: '“අනුස්සති” කියන වචනයේ තේරුම මොකක්ද?',
      ok: 'සිහි කිරීම', bad: ['නැමදීම', 'ගායනා කිරීම', 'ලිවීම'], go: '#guna' }
  ];

  var VOWS = [
    'දවසකට එක පාරක්වත් “ඉතිපි සෝ භගවා…” කියලා බුදුගුණ සිහි කරනවා.',
    'ගුණ නවය කටපාඩමින් කියවන්න ඉගෙන ගන්නවා.',
    'බය හිතුනොත් බුදුගුණ සිහි කරනවා.',
    'මම කියන දේම කරනවා — නොකරන දෙයක් කියන්නේ නෑ.',
    'කයෙන්, වචනයෙන්, සිතින් කිසි පවක් නොකර ඉන්න උත්සාහ කරනවා.',
    'හම්බවෙන පොඩි හොඳක් හරි කරලා පිනක් රැස් කර ගන්නවා.',
    'බුදුරජාණන් වහන්සේගේ රුවක් දැක්කම දෑත් එක් කොට වඳිනවා.'
  ];

  global.LessonKit({
    lesson: 'buduguna', item: 'buduguna', heroArt: heroArt,
    vows: VOWS, questions: QS, backTo: '#guna'
  });
  buildNine();
})(window);
