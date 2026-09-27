# සිරිත් මල්දම — Mahamevnawa Dhamma School UK

An illustrated site that teaches children good conduct from the poems of "සිරිත් මල්දම".
Live at https://janaka2.github.io/sirith-maldama/

## Rule that overrides everything else

Teaching on this site must never go outside three sources:
https://www.tripitaka.online/ , https://mahamevnawa.lk/ and https://mahamegha.lk/

**Before you write, edit, translate, explain or review any teaching content, invoke the
`mahamevnawa-dhamma` skill.** This applies to every such task, however small, and whether
or not the request mentions sources. Teaching content means anything a child, parent or
teacher will read or see about the Dhamma or good conduct.

- Never quote the Buddha's word from memory. Copy it from tripitaka.online.
- Never invent a sutta name, verse number or link.
- If no passage truly matches, show no citation.
- Run `python3 .claude/skills/mahamevnawa-dhamma/scripts/verify_citations.py` before
  finishing. A failure blocks the work.
- New teaching text needs review by a Mahamevnawa monk or Dhamma school teacher. Say so.

## Language

The site is in **Sinhala**. One exception, decided by the owner on 2026-09-27:

- The **Join button** in the header and the **progress page** (`#/N/mama`, built by `pageMe()` in
  `assets/js/app.js`) are in **English only**. This covers the join form, the continue form,
  the parents' consent text, the "what is stored" list, the signed-in profile view, and every
  message, toast and confirmation shown from that page.
- Everything else stays in Sinhala: poems, meanings, titles, promises, teacher notes, quiz,
  favourites, navigation, and the teachers' page (including its privacy section).

Do not translate the rest of the site into English, and do not put Sinhala back on the
progress page, unless the owner asks.

## Layout

| Path | Purpose |
| --- | --- |
| `assets/js/data.js`, `data2.js`, `data3.js` | Poems, meanings, titles, quiz for parts 1 to 3 |
| `assets/js/refs.js` | Verified citations and the poem-to-passage map |
| `assets/js/favourites.js` | Reusable favourites module. New lessons call `Favourites.button(item)` |
| `assets/js/tracker.js`, `tracker-config.js` | Reusable progress tracking. New lessons call `Tracker.record({...})`. Off until `endpoint` is set |
| `tools/google-sheet/` | Apps Script for the teacher's sheet and SETUP.md |
| `assets/js/art.js`, `scenes*.js` | Drawing library and one picture per poem |
| `assets/js/app.js` | Pages, progress, quiz |

No build step. Test with `python3 -m http.server 8765`.

## Children's data

Progress tracking collects a child's first name and place. Never add fields for surname,
date of birth, address, email or photo. Never log names to the console or to any other service.
