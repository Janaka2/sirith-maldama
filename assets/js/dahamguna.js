/* ධම්ම ගුණ — a lesson page (dahamguna.html).

   The shared machinery (citations, promises, test, Join pill) is in lesson-kit.js.
   This file holds only this lesson's two pictures, the six qualities and its questions.

   About the six: the words are the Buddha's, from the Dhajagga formula quoted on the
   page. Of the six, only සන්දිට්ඨික has a sutta of its own that unpacks it (the Moḷiya
   Sīvaka sutta), and ස්වාක්ඛාත is unfolded by the ādi/majjhe/pariyosāna kalyāṇa line.
   `sutta: true` marks exactly those two. The other four carry a Mahamevnawa article
   link instead, and the page says so in plain words. */
(function (global) {
  'use strict';

  var esc = global.LessonKit.esc;
  function $(id) { return document.getElementById(id); }

  /* ---------- picture: an open book with a lamp, light rising from it ---------- */
  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="එළිය විහිදෙන විවෘත පොතක් සහ පහනක්">' +
      '<circle cx="160" cy="132" r="104" fill="#eff6ff"/>' +
      /* rays */
      '<g stroke="#93c5fd" stroke-width="4" stroke-linecap="round" opacity=".75">' +
      '<path d="M160,74 v-22 M118,86 l-13,-18 M202,86 l13,-18 M92,120 l-21,-7 M228,120 l21,-7"/></g>' +
      /* the open book */
      '<path d="M160,196 q-44,-22 -78,-14 v-70 q34,-8 78,14 z" fill="#ffffff" stroke="#1d4ed8" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M160,196 q44,-22 78,-14 v-70 q-34,-8 -78,14 z" fill="#ffffff" stroke="#1d4ed8" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M160,126 v70" stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"/>' +
      '<g stroke="#bfdbfe" stroke-width="4" stroke-linecap="round">' +
      '<path d="M98,130 h44 M98,146 h44 M98,162 h38 M178,130 h44 M178,146 h44 M184,162 h38"/></g>' +
      /* a lamp on the page, standing for the Dhamma one can see for oneself */
      '<g transform="translate(160,104)">' +
      '<path d="M-16,8 q16,10 32,0 q-4,10 -16,10 q-12,0 -16,-10 z" fill="#fcd34d" stroke="#b45309" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="M0,6 q-9,-9 0,-22 q9,13 0,22 z" fill="#fb923c" stroke="#c2410c" stroke-width="3" stroke-linejoin="round"/></g>' +
      '</svg>';
  }

  /* ---------- picture: the sea, shallow at the shore and deep further out ---------- */
  function seaArt() {
    /* The water surface stays level; it is the BED that drops away to the right. Drawing
       it the other way round reads as a hill, which is the opposite of the sutta. */
    return '<svg viewBox="0 0 300 180" role="img" aria-label="වෙරළේ සිට හෙමින් ගැඹුරු වන මහා සමුද්‍රය">' +
      '<rect x="0" y="0" width="300" height="180" rx="18" fill="#eff6ff"/>' +
      /* the water, between a level surface and the sloping bed */
      '<path d="M0,52 L300,52 L300,172 Q214,168 134,148 Q62,124 0,88 z" fill="#1d4ed8" opacity=".16"/>' +
      '<path d="M0,96 L300,96 L300,172 Q214,168 134,148 Q62,124 0,88 z" fill="#1d4ed8" opacity=".14"/>' +
      /* the sea bed, shallow at the left */
      '<path d="M0,88 Q62,124 134,148 Q214,168 300,172 L300,180 L0,180 z" fill="#fde68a" stroke="#ca8a04" stroke-width="3.5" stroke-linejoin="round"/>' +
      /* the surface itself */
      '<path d="M0,52 H300" stroke="#1d4ed8" stroke-width="4" stroke-linecap="round"/>' +
      '<g stroke="#1d4ed8" stroke-width="3" stroke-linecap="round" fill="none" opacity=".45">' +
      '<path d="M88,68 q11,-7 22,0 t22,0"/><path d="M178,76 q11,-7 22,0 t22,0"/></g>' +
      /* how deep it is, left and right */
      '<g stroke="#1e3a8a" stroke-width="2.6" stroke-linecap="round" opacity=".8">' +
      '<path d="M40,58 v46 M34,98 l6,8 6,-8"/><path d="M250,58 v108 M244,160 l6,8 6,-8"/></g>' +
      '<g font-size="15" fill="#1e3a8a" font-weight="700">' +
      '<text x="52" y="86">වෙරළ</text><text x="166" y="130">ගැඹුර</text></g>' +
      /* one gem on the sea bed: the Dhamma is full of jewels */
      '<g transform="translate(206,158)"><path d="M0,-9 l9,6 -9,11 -9,-11 z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.6" stroke-linejoin="round"/></g>' +
      '</svg>';
  }

  /* ---------- the six, in the order the formula gives them ---------- */
  var SIX = [
    { pali: 'ස්වාක්ඛාතෝ', si: 'ස්වාක්ඛාත ය',
      what: 'භාග්‍යවතුන් වහන්සේ විසින් <b>මනාකොට වදාරන ලද</b> දහමක්.',
      you: 'ආරම්භය කල්‍යාණයි, මැද කල්‍යාණයි, අවසානය කල්‍යාණයි. අර්ථ සහිතයි, පැහැදිලියි.',
      sutta: true, art: 'GS_DHAMMA' },
    { pali: 'සන්දිට්ඨිකෝ', si: 'සන්දිට්ඨික ය',
      what: 'මේ ජීවිතයේදීම, <b>තමන්ටම ප්‍රත්‍යක්ෂව බලාගන්න</b> පුළුවන් දහමක්.',
      you: 'ඔයාගේ හිතේ තරහක් තියෙනවද නැද්ද කියලා ඔයාටම දැනගන්න පුළුවන්නේ? ඒකමයි.',
      sutta: true, art: 'GS_AKALIKA' },
    { pali: 'අකාලිකෝ', si: 'අකාලික ය',
      what: '<b>කාලයට බැඳිලා නැති</b> දහමක්. ප්‍රතිඵලය ලැබෙන්න කාලයක් ගත වෙන්නේ නෑ.',
      you: 'අවුරුදු දෙදහස් පන්සියයකට කලින් කිව්වත්, අදත් ඒක හරි. හෙටත් හරි.', art: 'GS_AKALIKA' },
    { pali: 'ඒහිපස්සිකෝ', si: 'ඒහිපස්සික ය',
      what: '“<b>එන්න, බලන්න</b>” කියලා ආරාධනා කරන්න පුළුවන් දහමක්.',
      you: 'හංගන්න දෙයක් නෑ. ඕන කෙනෙකුට ඇවිත් පරීක්ෂා කරලා බලන්න කියන්න පුළුවන්.', art: 'GS_EHI' },
    { pali: 'ඕපනයිකෝ', si: 'ඕපනයික ය',
      what: '<b>තමන් තුළට පමුණුවා ගත යුතු</b> දහමක් — ඇසුවා විතරක් මදි, කරන්නත් ඕනෙ.',
      you: 'පිහිනන හැටි පොතක කියවලා විතරක් පිහිනන්න බෑනේ. වතුරට බහින්නත් ඕනෙ.', art: 'GS_EHI' },
    { pali: 'පච්චත්තං වේදිතබ්බෝ විඤ්ඤූහි', si: 'බුද්ධිමතුන් විසින් වෙන් වෙන් වශයෙන් අවබෝධ කළ යුත්තේ ය',
      what: 'නුවණැති කෙනා <b>තමන්ටම</b> අවබෝධ කරගන්න ඕනෙ දහමක්.',
      you: 'ශ්‍රද්ධාව, සීලය, සමාධිය, ප්‍රඥාව — මේවා කාටවත් තෑගි දෙන්න බෑ. හැම කෙනෙක්ම තමන්ටම හදාගන්න ඕනෙ.', art: 'GS_EHI' }
  ];

  function buildSix() {
    var arts = (global.SM_REFS && global.SM_REFS.articles) || {};
    $('gunaGrid').innerHTML = SIX.map(function (g, i) {
      var a = arts[g.art];
      var link = a ? '<a class="ref-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">මහමෙව්නාවේ පැහැදිලි කිරීම ↗</a>' : '';
      return '<article class="guna"><b>' + (i + 1) + '</b><div>' +
        '<h3>' + esc(g.si) + '<span class="gn-pali" lang="pi">' + esc(g.pali) + '</span></h3>' +
        '<p>' + g.what + '</p>' +
        '<p class="gn-you">' + g.you + '</p>' +
        '<span class="gn-tag ' + (g.sutta ? 'sutta">☸ සූත්‍රයක්' : 'only">📄 ලිපියක්') + '</span> ' + link +
        '</div></article>';
    }).join('');
    var el = $('gunaCount'); if (el) el.textContent = SIX.length;
  }

  var QS = [
    { ask: 'බුදුරජාණන් වහන්සේ වදාළ දහමේ ගුණ කීයක් ගැනද අපි කියවන්නේ?',
      ok: 'හයක්', bad: ['තුනක්', 'නවයක්', 'එකොළහක්'], go: '#guna' },
    { ask: 'දහමේ ගුණ කියවෙන වචන පෙළ පටන් ගන්නේ කොහොමද?',
      ok: 'ස්වාක්ඛාතෝ භගවතා ධම්මෝ…',
      bad: ['ඉතිපි සෝ භගවා…', 'සුපටිපන්නෝ භගවතෝ සාවකසංඝෝ…', 'නමෝ තස්ස භගවතෝ…'], go: '#wachana' },
    { ask: '“ස්වාක්ඛාත” යන ගුණයෙන් කියවෙන්නේ කුමක්ද?',
      ok: 'භාග්‍යවතුන් වහන්සේ විසින් දහම මනාකොට වදාරන ලද බව',
      bad: ['දහම ලියා ඇති බව', 'දහම පැරණි බව', 'දහම දිගු බව'], go: '#svakkhata' },
    { ask: 'සාමඤ්ඤඵල සූත්‍රයේ වදාළ පරිදි, දහමේ කොටස් තුනම කෙබඳුද?',
      ok: 'ආරම්භය කල්‍යාණයි, මැද කල්‍යාණයි, අවසානය කල්‍යාණයි',
      bad: ['ආරම්භය අමාරුයි, අග පහසුයි', 'මැද විතරක් වැදගත්', 'අවසානය විතරක් වැදගත්'], go: '#svakkhata' },
    { ask: 'මෝලිය සීවකට උත්තර දෙද්දී උන්වහන්සේ ඇසුවේ කුමක්ද?',
      ok: 'තමා තුළ ලෝභය ඇත්ද නැත්ද කියා ඔහු දන්නවාද කියා',
      bad: ['ඔහුගේ වයස කීයද කියා', 'ඔහු කොහේ සිට ආවාද කියා', 'ඔහු කොතරම් කලක් භාවනා කළාද කියා'], go: '#sandi' },
    { ask: '“සන්දිට්ඨික” යන ගුණයෙන් කියවෙන්නේ කුමක්ද?',
      ok: 'දහමේ ඵලය මේ ජීවිතයේදීම තමන්ටම බලාගත හැකි බව',
      bad: ['ඵලය මරණින් පසු ලැබෙන බව', 'ඵලය ගුරුවරයෙකුට පමණක් පෙනෙන බව', 'ඵලයක් නැති බව'], go: '#sandi' },
    { ask: '“ඒහිපස්සික” යන ගුණයෙන් කියවෙන්නේ කුමක්ද?',
      ok: '“එන්න, බලන්න” කියා ආරාධනා කළ හැකි බව',
      bad: ['රහසින් තබාගත යුතු බව', 'පැරණි භාෂාවෙන් ඇති බව', 'පහසුවෙන් කියවිය හැකි බව'], go: '#guna' },
    { ask: 'පහාරාද සූත්‍රයේ, දහම උපමා කළේ කුමකටද?',
      ok: 'මහා සමුද්‍රයට', bad: ['මහා වනයකට', 'පර්වතයකට', 'අහසට'], go: '#muhuda' },
    { ask: 'මහා සමුද්‍රය වෙරළේ සිට හෙමින් ගැඹුරු වන බවෙන් දහම ගැන වදාළේ කුමක්ද?',
      ok: 'දහමෙහි අනුපිළිවෙළින් හික්මීමක් ඇති බව; පටන් ගත් තැනින්ම අරහත්වය නොලැබෙන බව',
      bad: ['දහම ඉගෙනීම අසීරු බව', 'දහම ඉක්මනින් අවසන් වන බව', 'දහම ගැඹුරු නොවන බව'], go: '#muhuda' },
    { ask: 'මහා සමුද්‍රයේ රස එකක් වන්නා සේ, දහමේ රසය කුමක්ද?',
      ok: 'විමුක්ති රසය', bad: ['ලුණු රසය', 'මිහිරි රසය', 'රස කිහිපයක්'], go: '#muhuda' },
    { ask: 'අග්ගප්පසාද සූත්‍රයේ වදාළ පරිදි, හටගත්තා වූත් හට නොගත්තා වූත් සියලු දේ අතර අග්‍ර වන්නේ කුමක්ද?',
      ok: 'නිර්වාණය', bad: ['ආර්ය අෂ්ටාංගික මාර්ගය', 'මහා සමුද්‍රය', 'මනුෂ්‍ය ජීවිතය'], go: '#agra' },
    { ask: 'හේතු ප්‍රත්‍යයන්ගෙන් හටගත් දේ අතර අග්‍ර වන්නේ කුමක්ද?',
      ok: 'ආර්ය අෂ්ටාංගික මාර්ගය', bad: ['නිර්වාණය', 'දානය', 'සීලය'], go: '#agra' },
    { ask: 'ධම්මපදය 188 ගාථාවේ, බියෙන් තැති ගත් මිනිසුන් සරණ යන්නේ කුමක්ටද?',
      ok: 'පර්වත, වනාන්තර, දේවාල සහ ගස් කොළන්',
      bad: ['බුදු, දහම්, සඟ', 'රජවරුන්', 'ධනය'], go: '#sarana' },
    { ask: 'ධම්මපදය 190 ගාථාවේ, බුදු දහම් සඟ සරණ ගිය කෙනා අවබෝධ කරන්නේ කුමක්ද?',
      ok: 'චතුරාර්ය සත්‍යය', bad: ['සියලු භාෂා', 'පෙර ජීවිත', 'අනාගතය'], go: '#sarana' },
    { ask: 'ධම්මපදය 192 ගාථාවේ වදාළ පරිදි, සියලු දුකින් නිදහස් වෙන්නේ කුමකට පැමිණීමෙන්ද?',
      ok: 'තිසරණයට', bad: ['පර්වතයකට', 'දේවාලයකට', 'වනාන්තරයකට'], go: '#sarana' }
  ];

  var VOWS = [
    'දවසකට එක පාරක්වත් “ස්වාක්ඛාතෝ භගවතා ධම්මෝ…” කියලා දහම් ගුණ සිහි කරනවා.',
    'ගුණ හය කටපාඩමින් කියවන්න ඉගෙන ගන්නවා.',
    'දහම් පාසල් පාඩමක් ඇහුවාම, ඒක අහලා නවතින්නේ නැතුව එකක්වත් කරනවා.',
    'හිතේ තරහක් ආවම “දැන් මගේ හිතේ තරහක් තියෙනවා” කියලා දැනගන්නවා.',
    'මට තේරෙන්නේ නැති දෙයක් ගැන ගුරුතුමාගෙන් අහනවා.',
    'ඉගෙන ගත්ත දහමක් යාළුවෙකුටත් කියලා දෙනවා.',
    'පොඩි පියවරකින් පටන් ගන්නවා — ඔක්කොම එකපාර බැරි නිසා අත් නොහරිනවා.'
  ];

  global.LessonKit({
    lesson: 'dahamguna', item: 'dahamguna', heroArt: heroArt,
    vows: VOWS, questions: QS, backTo: '#guna'
  });
  buildSix();
  $('seaArt').innerHTML = seaArt();
})(window);
