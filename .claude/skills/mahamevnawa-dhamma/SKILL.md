---
name: mahamevnawa-dhamma
description: MUST be used for ANY work on Dhamma teaching content in this project, before writing a single word. Use it whenever you write, edit, translate, explain, summarise, illustrate or review anything a child, parent or teacher will read or see - poem meanings, titles, promises, teacher notes, quiz questions, picture ideas, new lessons, new pages, README text about the teaching, or answers to questions about Buddhism, the Buddha, suttas, precepts, merit, parents, teachers or Sri Lankan Buddhist custom. Use it even when the user does not mention sources, citations or Mahamevnawa, and even for a one-line wording change. It keeps all teaching inside three approved sources (tripitaka.online, mahamevnawa.lk, mahamegha.lk), follows the teaching style of Most Venerable Kiribathgoda Gnanananda Thero, and forbids any citation that has not been checked against the live source. Triggers include - Dhamma, Buddha, බුදු, දහම, සූත්‍ර, sutta, gatha, ගාථා, Dhammapada, ධම්මපදය, Tripitaka, ත්‍රිපිටකය, pirith, sil, සිල්, පින්, merit, moral, meaning, තේරුම, lesson, poem, කවිය, teaching, citation, reference, source, Mahamevnawa, මහමෙව්නාව, Daham Pasala, දහම් පාසල.
---

# Mahamevnawa Dhamma teaching guard

This site belongs to Mahamevnawa Dhamma School UK. The school follows the teaching of
Most Venerable Kiribathgoda Gnanananda Thero. Teaching on this site must never go outside
the approved sources. This skill is a guard, not a suggestion.

## The three approved sources

| Source | Use it for |
| --- | --- |
| https://www.tripitaka.online/ | The Sutta Pitaka in Pali with the Sinhala translation by the Most Venerable Thero. The only source for quoted Buddha-word. |
| https://mahamevnawa.lk/ | The monastery's own articles, Dhammapada stories, Jataka stories, Mahavamsa, and the teaching approach. |
| https://mahamegha.lk/ | Mahamegha magazine, including the children's series "පුංචි අපේ දහම් පාසල". |

Nothing else may be cited or used as a basis for Dhamma content. That includes Wikipedia,
Access to Insight, SuttaCentral, other monasteries, other translations, and your own memory.

The poems of "සිරිත් මල්දම" by M. L. Silva Guru Muhandiram are the school's chosen text.
Poem verses are reproduced as given. Everything written around them follows this skill.

## Hard rules

1. **Never quote from memory.** Every Pali line and every Sinhala translation is copied
   character for character from tripitaka.online. Do not retype, modernise, shorten
   inside a sentence, or "fix" it.
2. **Never invent a reference.** No sutta name, verse number or URL appears unless you
   fetched that page in this session and saw the passage.
3. **No match means no citation.** If a poem is about household custom, hygiene or safety
   and no approved passage truly matches, show no Buddha-word. Do not stretch a verse to
   fit. Say plainly that it is a custom.
4. **Do not bend a teaching.** If a verse is about practising the Dhamma, do not present
   it as advice about homework. Match the actual meaning.
5. **Run the checker before finishing.** See "Verify" below. A failing check blocks the work.
6. **Flag uncertainty.** If a poem line is unclear, say so in the teacher note and leave
   it out of the picture. Never guess in a child's text.
7. **Tell the user** when something they asked for cannot be supported from the three
   sources, and offer the nearest thing that can.

## Workflow

Do these in order, every time.

1. **Read** `reference/style.md` and `reference/sources.md` in this skill folder.
2. **Look in the existing library first.** `assets/js/refs.js` holds passages already
   verified. Reuse one if it truly matches.
3. **Search the source** if you need a new passage:
   ```bash
   python3 .claude/skills/mahamevnawa-dhamma/scripts/find_sutta.py name "මංගල"
   python3 .claude/skills/mahamevnawa-dhamma/scripts/find_sutta.py grep 11722 "මාතාපිතූ"
   ```
4. **Copy, do not type.** Take the Pali and Sinhala from the script output.
5. **Write** the child-facing text in the style in `reference/style.md`.
6. **Verify**:
   ```bash
   python3 .claude/skills/mahamevnawa-dhamma/scripts/verify_citations.py
   ```
   It re-downloads every cited page, confirms each quotation is present word for word,
   confirms every article link works, and fails on any link outside the approved sites.
7. **Report** to the user what was cited, what was left without a citation and why, and
   anything that still needs a monk's or teacher's review.

## Review duty

You are not a Dhamma teacher. Anything new that explains the Dhamma to children must be
marked for review by a Mahamevnawa monk or a Dhamma school teacher. Say this in your
final message every time you add or change teaching text.

## Respectful language

See `reference/style.md`. In short: බුදුරජාණන් වහන්සේ or භාග්‍යවතුන් වහන්සේ, never a bare
name. ස්වාමීන් වහන්සේ for monks. "වදාළා" for what the Buddha taught. Address children as
"පින්වත් දුවේ පුතේ" or "පින්වත් දරුවනේ".
