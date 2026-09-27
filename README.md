# සිරිත් මල්දම — පින්තූර කවි පොත

An illustrated learning site for children, based on all three parts of
"සිරිත් මල්දම" by M. L. Silva Guru Muhandiram. Each part has 62 poems.

Part 2 and part 3 verses come from Wikisource. Their meanings, English lines and
child-friendly titles were written for this site and need review by a Sinhala teacher.

## Dhamma sources

Teaching on this site stays inside three sources: https://www.tripitaka.online/ ,
https://mahamevnawa.lk/ and https://mahamegha.lk/ . Quotations are copied word for word
from tripitaka.online. Check them at any time with:

```bash
python3 .claude/skills/mahamevnawa-dhamma/scripts/verify_citations.py
```

## Favourites

`assets/js/favourites.js` is a self-contained module. It is not tied to the poems, so any
future lesson can use it. Usage is described at the top of that file. In short:

```js
var item = { type: 'jataka', id: '12', title: '…', url: '#/jataka/12', group: 'ජාතක කථා' };
html += Favourites.button(item);   // a heart button
Favourites.bind(document.body);    // once per page
```

Favourites are kept in the browser, under one key shared by all lessons.

## Progress tracking

Children can join with a first name, a place and a class code. Their progress goes to the
teacher's Google Sheet, with points, and they can continue on another device with a secret
code. It is switched off until `endpoint` is set in `assets/js/tracker-config.js`.
Setup steps: `tools/google-sheet/SETUP.md`.

`assets/js/tracker.js` is reusable. A future lesson only calls:

```js
Tracker.record({ lesson: 'jataka', kind: 'learned', part: '1', item: '12', size: 30 });
```

## Run locally

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

## Publish on GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository, open Settings, then Pages.
3. Choose "Deploy from a branch", branch `main`, folder `/ (root)`.

The site is plain HTML, CSS and JavaScript. There is no build step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell |
| `assets/css/style.css` | Styles and animations |
| `assets/js/data.js` | Part 1 poems, meanings, child-friendly titles, quiz |
| `assets/js/data2.js`, `data3.js` | Part 2 and 3 poems, meanings, child-friendly titles, quiz |
| `assets/js/favourites.js` | Reusable favourites module |
| `assets/js/tracker.js`, `tracker-config.js` | Reusable progress tracking and its settings |
| `tools/google-sheet/` | Script for the teacher's Google Sheet, with setup steps |
| `assets/js/refs.js` | Verified citations and the poem-to-passage map |
| `.claude/skills/mahamevnawa-dhamma/` | Claude Code skill that guards sources and style |
| `assets/js/art.js` | Drawing library for characters, props, backgrounds |
| `assets/js/scenes.js` | Part 1 pictures, one per poem |
| `assets/js/scenes2.js`, `scenes3.js` | Part 2 and 3 pictures, one per poem |
| `assets/js/app.js` | Pages, progress, read aloud, quiz |
| `assets/img/logo.jpg` | School logo, cropped from the intro video |
| `sirith_maldama_visual_storybook.html` | The original single-file version |
