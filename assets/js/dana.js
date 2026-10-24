/* දානය — a lesson page (dana.html).

   The shared machinery (citations, promises, test, Join pill) is in lesson-kit.js.
   This file holds only what belongs to this lesson: its picture, the five pairs of
   "how a gift is given", and its questions.

   දානය already appears in the කඨින චීවර පූජාව lesson from the giver's side. This page
   is the wider one: what a gift is, the two kinds, when, how, why people give at all,
   and what comes of it. Every passage is pulled from refs.js by key. */
(function (global) {
  'use strict';

  var esc = global.LessonKit.esc, refCard = global.LessonKit.refCard;
  function $(id) { return document.getElementById(id); }

  /* ---------- picture: an alms bowl, and what goes into it ----------
     Hands drawn in flat SVG read as sticks, so the picture shows the bowl and the
     gifts instead: food for ආමිස දානය and a book for ධර්ම දානය. */
  function lotus(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M0,0 q-18,-6 -24,-20 q16,-4 24,8 q8,-12 24,-8 q-6,14 -24,20 z" fill="#f9a8d4" stroke="#be185d" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M0,0 q-8,-16 0,-28 q8,12 0,28 z" fill="#fbcfe8" stroke="#be185d" stroke-width="2.5"/></g>';
  }
  function heroArt() {
    return '<svg viewBox="0 0 320 250" role="img" aria-label="පාත්‍රයක් සහ එයට පුදන කෑම හා පොතක්">' +
      '<circle cx="160" cy="118" r="94" fill="#f8f3ff" opacity=".9"/>' +
      /* what is given, floating above the bowl */
      '<g transform="translate(112,74)">' +
      '<circle cx="0" cy="0" r="17" fill="#fca5a5" stroke="#b91c1c" stroke-width="4"/>' +
      '<path d="M0,-17 q4,-10 13,-12 q-2,9 -9,13" fill="#86efac" stroke="#15803d" stroke-width="3" stroke-linejoin="round"/></g>' +
      '<g transform="translate(208,72)">' +
      '<path d="M-20,-12 q20,-7 20,0 q0,-7 20,0 v26 q-20,-7 -20,0 q0,-7 -20,0 z" fill="#fff7dc" stroke="#b45309" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M0,-12 v26" stroke="#b45309" stroke-width="3"/></g>' +
      /* a folded robe, in the saffron of the කඨින lesson so the two pages rhyme */
      '<g transform="translate(160,44)">' +
      '<rect x="-21" y="-10" width="42" height="20" rx="5" fill="#fb923c" stroke="#c2410c" stroke-width="3.5"/>' +
      '<path d="M-21,-3 h42 M-21,4 h42" stroke="#ffedd5" stroke-width="2.5"/></g>' +
      /* the bowl */
      '<path d="M96,142 h128 q-8,52 -64,52 q-56,0 -64,-52 z" fill="#ede9fe" stroke="#6b21a8" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M88,140 h144" stroke="#6b21a8" stroke-width="8" stroke-linecap="round"/>' +
      /* the stand it rests on */
      '<path d="M138,194 h44 l10,16 h-64 z" fill="#f6d59a" stroke="#b45309" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<path d="M44,214 H276" stroke="#e7c9a4" stroke-width="7" stroke-linecap="round"/>' +
      lotus(52, 208, .8) + lotus(268, 208, .8) +
      '<g stroke="#a78bfa" stroke-width="4" stroke-linecap="round" opacity=".85">' +
      '<path d="M66,104 l-10,-9 M254,104 l10,-9 M160,20 v-8"/></g>' +
      '<g fill="#c4b5fd"><circle cx="40" cy="70" r="6"/><circle cx="286" cy="148" r="5"/><circle cx="32" cy="150" r="5"/></g>' +
      '</svg>';
  }

  /* ---------- how a gift is given: the five pairs ---------- */
  var PAIRS = [
    { bad: 'නොසකස් කොට දන් දෙයි.', good: 'සකස් කොට දන් දෙයි.',
      kid: 'ලස්සනට පිළියෙල කරලා දෙන්න. හෙළලා දමන්නේ නෑ.' },
    { bad: 'අගෞරවයෙන් දන් දෙයි.', good: 'ගෞරවයෙන් දන් දෙයි.',
      kid: 'දෙන කෙනාට ගරු කරමින් දෙන්න.' },
    { bad: 'සියතින් දන් නොදෙයි.', good: 'සියතින් දන් දෙයි.',
      kid: 'පුළුවන් නම් ඔයාගේම අතින් දෙන්න. අනිත් කෙනෙකු ලවා යවන්නේ නෑ.' },
    { bad: 'බැහැර කරන දෙයක් මෙන් දන් දෙයි.', good: 'බැහැර නොකරන දෙයක් මෙන් දන් දෙයි.',
      kid: '“මේක මට එපා වුණ එකක්” කියලා දෙන්නේ නෑ. හොඳ දේම දෙන්න.' },
    { bad: 'එහි විපාක තමාට ලැබෙන්නේ යැයි විශ්වාස නොකොට දන් දෙයි.',
      good: 'එහි විපාක තමාට ලැබෙන්නේ යැයි විශ්වාස කොට දන් දෙයි.',
      kid: '“මේ පින මට ලැබෙනවා” කියලා පැහැදිලි විශ්වාසයකින් දෙන්න.' }
  ];
  function buildPairs() {
    $('howRows').innerHTML = PAIRS.map(function (p) {
      return '<div class="how-row">' +
        '<div class="x"><i aria-hidden="true">✗</i><span>' + esc(p.bad) + '</span></div>' +
        '<div class="v"><i aria-hidden="true">✓</i><span>' + esc(p.good) + '<br><em style="font-style:normal;font-weight:800;color:#15803d;font-size:.86rem">💛 ' + esc(p.kid) + '</em></span></div>' +
        '</div>';
    }).join('');
  }

  /* ---------- questions ---------- */
  var QS = [
    { ask: 'ඉතිවුත්තකයේ දාන සූත්‍රයේ වදාළ දාන දෙක මොනවාද?',
      ok: 'ආමිස දානයත්, ධර්ම දානයත්',
      bad: ['ලොකු දානයත්, පොඩි දානයත්', 'ගිහි දානයත්, පැවිදි දානයත්', 'උදේ දානයත්, දවල් දානයත්'], go: '#dekak' },
    { ask: 'ඒ දාන දෙකෙන් අග්‍ර වන්නේ කුමක්ද?',
      ok: 'ධර්ම දානය', bad: ['ආමිස දානය', 'දෙකම සමානයි', 'ඒ ගැන වදාළේ නෑ'], go: '#dekak' },
    { ask: 'දාන සංවිභාග සූත්‍රයේ වදාළ පරිදි, බෙදා හදා අනුභව කිරීමේ අනුසස් මිනිසුන් බුදුරජාණන් වහන්සේ තරම් දැන සිටියා නම් මොකද වෙන්නේ?',
      ok: 'අන්තිම පිඬෙන් වුණත් බෙදා නොදී අනුභව කරන්නේ නෑ',
      bad: ['වැඩිපුර ආහාර පිසිනවා', 'කිසිවක් අනුභව කරන්නේ නෑ', 'ලොකු දාන පමණක් දෙනවා'], go: '#pidak' },
    { ask: 'අසප්පුරිස දාන සූත්‍රයේ වදාළ, සත්පුරුෂයෙක් දන් දෙන විදිහ කුමක්ද?',
      ok: 'සකස් කොට, ගෞරවයෙන්, සියතින්, බැහැර නොකරන දෙයක් මෙන්, විපාක විශ්වාස කොට',
      bad: ['ඉක්මනින්, හොර රහසේ, අනුන් ලවා', 'එපා වූ දේ, අගෞරවයෙන්', 'බොහෝ දේ, බොහෝ වාරයක්'], go: '#vidiha' },
    { ask: '“සියතින් දන් දෙයි” කියන්නේ මොකක්ද?',
      ok: 'තමන්ගේම අතින් දීමයි',
      bad: ['බොහෝ දේ දීමයි', 'වේගයෙන් දීමයි', 'රහසින් දීමයි'], go: '#vidiha' },
    { ask: 'කාලදාන සූත්‍රයේ වදාළ සුදුසු කාලයේ දන් දීම් පහෙන් එකක් කුමක්ද?',
      ok: 'ගිලන් වූ කෙනෙකුට දන් දීම',
      bad: ['උත්සව දිනයක පමණක් දීම', 'ධනවතුන්ට දීම', 'අවුරුද්දකට වරක් දීම'], go: '#kawada' },
    { ask: 'අළුත් සහල්, අළුත් ඵල ලැබුණු විට කුමක් කළ යුතු බව වදාළාද?',
      ok: 'පළමු කොටස සීලවන්තයන් කෙරෙහි පිහිටුවිය යුතු බව',
      bad: ['සියල්ල තමන් අනුභව කළ යුතු බව', 'විකුණා මුදල් දිය යුතු බව', 'ඊළඟ අවුරුද්දට තබා ගත යුතු බව'], go: '#kawada' },
    { ask: 'කාලදාන සූත්‍රයේ ගාථාවේ, දානයක් දැක අනුමෝදන් වන අයට සහ වතාවත් කරන අයට මොකද වෙන්නේ?',
      ok: 'ඔවුන්ටත් ඒ දක්ෂිණාව අඩු නොවී, පිනෙහි කොටස්කරුවෝ වෙනවා',
      bad: ['ඔවුන්ට කිසිම පිනක් නෑ', 'දායකයාගේ පින අඩු වෙනවා', 'ඒ ගැන වදාළේ නෑ'], go: '#kawada' },
    { ask: 'දානවත්ථු සූත්‍රයේ දානයට මුල්වන කරුණු අටෙන් උතුම්ම කරුණ කුමක්ද?',
      ok: 'සමථ විදර්ශනා භාවනාවට උපකාරය පිණිස, සිතෙහි අලංකාරය උදෙසා දීම',
      bad: ['ගැරහීමට බියෙන් දීම', 'ද්වේෂය නිසා දීම', 'මෝහය නිසා දීම'], go: '#ayi' },
    { ask: 'දානානිසංස සූත්‍රයේ වදාළ, දන් දෙන කෙනාට ලැබෙන අනුසස් පහෙන් එකක් කුමක්ද?',
      ok: 'ශාන්ත සත්පුරුෂයෝ ඔහු ඇසුරු කරති',
      bad: ['ඔහු තනි වෙයි', 'ඔහුගේ ධනය නැති වෙයි', 'ඔහුට රෝග වැළඳෙයි'], go: '#labena' },
    { ask: 'දානානිසංස සූත්‍රයේ වදාළ පරිදි දන් දෙන කෙනා කුමකින් බැහැර නොයයිද?',
      ok: 'ගිහි ධර්මය වන පංච ශීලයෙන්',
      bad: ['තම පවුලෙන්', 'තම රැකියාවෙන්', 'තම ගමෙන්'], go: '#labena' },
    { ask: 'දන් දෙන කෙනා මරණින් මතු උපදින බව වදාළේ කොහේද?',
      ok: 'සුගති සංඛ්‍යාත ස්වර්ග ලෝකයෙහි',
      bad: ['නැවත මිනිස් ලොව පමණයි', 'කොහේවත් නොවේ', 'ඒ ගැන වදාළේ නෑ'], go: '#labena' },
    { ask: 'ධර්ම දානය දෙන කෙනාටත්, අසා සිටින කෙනාටත් මොකද වෙන්නේ කියා ගාථාවේ වදාළාද?',
      ok: 'දෙපක්ෂයම ධර්ම දානය තුළින් පරම පිරිසිදු වෙනවා',
      bad: ['කියන කෙනාට පමණක් පිනක්', 'අසන කෙනාට පමණක් පිනක්', 'දෙන්නාටම පාඩුවක්'], go: '#dekak' },
    { ask: 'පුංචි දරුවෙකුට අද කරන්න පුළුවන් දානයක් කුමක්ද?',
      ok: 'තමන්ට තියෙන දෙයක් — කෑමක්, පැන්සලක් — අනිත් කෙනෙකුට බෙදා දීම',
      bad: ['ලොකු වෙනකම් ඉන්න එක', 'මුදල් තිබෙන අය වෙනුවෙන් බලා සිටීම', 'කිසිවක් නොදී තියාගැනීම'], go: '#mata' }
  ];

  var VOWS = [
    'මට තියෙන දෙයක් අනිත් අයට බෙදලා දෙනවා.',
    'අන්තිම කෑම ටිකෙන් වුණත් කෙනෙකුට දෙන්න පුළුවන් නම් දෙනවා.',
    'දෙන කොට ලස්සනට සකස් කරලා, මගේම අතින් දෙනවා.',
    'එපා වුණ දේ නෙවෙයි, හොඳ දේම දෙනවා.',
    'ගිලන් වූ කෙනෙකුට, දුර ගමනක් යන කෙනෙකුට උදව් කරනවා.',
    'අනිත් අය දෙනවා දැක්කම “සාදු!” කියලා අනුමෝදන් වෙනවා.',
    'මම දන්න දහම් දෙයක් තව කෙනෙකුට කියලා දෙනවා.'
  ];

  global.LessonKit({
    lesson: 'dana', item: 'danaya', heroArt: heroArt,
    vows: VOWS, questions: QS, backTo: '#vidiha'
  });
  buildPairs();
})(window);
