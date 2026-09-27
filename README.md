# සිරිත් මල්දම — පින්තූර කවි පොත

An illustrated learning site for children, based on the 62 poems of
"සිරිත් මල්දම (1 කොටස)" by M. L. Silva Guru Muhandiram.

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
| `assets/js/data.js` | The 62 poems, meanings, child-friendly titles, quiz |
| `assets/js/art.js` | Drawing library for characters, props, backgrounds |
| `assets/js/scenes.js` | One picture per poem |
| `assets/js/app.js` | Pages, progress, read aloud, quiz |
| `assets/img/logo.jpg` | School logo, cropped from the intro video |
| `sirith_maldama_visual_storybook.html` | The original single-file version |
