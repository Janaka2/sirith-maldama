# Progress tracking: setup

This takes about ten minutes. You do it once.

## What you get

A Google Sheet with two tabs.

| Tab | What it shows |
| --- | --- |
| Children | One row per child: name, class, place, date joined, last active, lessons learned, quiz stars, last lesson, points |
| Log | One row for every lesson learned and every quiz finished, with the time |

Points are worked out for you. You can add your own in the "Teacher bonus points" column,
and the total includes them the next time that child does something.

## Steps

1. Go to https://sheets.google.com and create a blank spreadsheet. Name it, for example,
   "Daham Pasala progress".
2. In the menu choose **Extensions**, then **Apps Script**.
3. Delete whatever is in the editor. Open `Code.gs` from this folder, copy all of it, and
   paste it in.
4. Near the top, set the class codes. See "Class codes" below.
5. Click **Save**.
6. Click **Deploy**, then **New deployment**. Click the gear icon and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**. Google asks you to authorise the script. Allow it.
8. Copy the **Web app URL**. It ends in `/exec`.
9. Open `assets/js/tracker-config.js` in the site and paste the link:
   ```js
   endpoint: 'https://script.google.com/macros/s/…/exec',
   ```
   Edit the lists of `classes` and `places` too, so they show your own.
10. Publish the site again.

## Class codes

Near the top of the script you will find this list:

```js
var CLASS_CODES = {
  'Beginner L1': 'CHANGE-ME',
  'Beginner L2': 'CHANGE-ME',
  'Intermediate L1': 'CHANGE-ME',
  'Intermediate L2': 'CHANGE-ME',
  'Advanced': 'CHANGE-ME'
};
```

Replace each `CHANGE-ME` with a word of your own, inside the quotes. For example:

```js
  'Beginner L1': 'LOTUS-41',
  'Beginner L2': 'JASMINE-27',
```

Rules:

- Give every class a **different** code. If two classes share a code, children are saved
  in whichever class comes first in the list.
- The code decides the class. A child who types the Beginner L1 code is saved as
  Beginner L1, whatever class they picked on the form.
- A class left as `CHANGE-ME` stays closed. Nobody can join it.
- Capital letters and spaces do not matter when a child types the code.
- Do not use the class name as the code. Class names are shown publicly on the form.
- To add a class, add a line to the list, and add the same name to `classes` in
  `assets/js/tracker-config.js` on the site.
- To rename a class, change it in both places. Children already saved keep the old name
  in the sheet until you edit their rows.

Below the list is one more setting, `CLASS_CODE`. It is optional. If you set it, that one
code works for every class and the child's own choice of class is saved. Leave it as
`CHANGE-ME` if you want each class to use only its own code.

Set these codes **in the Google editor only**. The copy of `Code.gs` in the project folder
is public and must keep `CHANGE-ME`.

## After changing the script

If you edit `Code.gs` later, choose **Deploy**, **Manage deployments**, the pencil icon,
**Version: New version**, then **Deploy**. The link stays the same.

## Sorting by class

Click the "Class" heading in the Children tab, then **Data**, **Create a filter**. You can
then show one class at a time, or sort by "Total points".

## How children use it

- **First time:** the child opens "මම" on the site, types a first name, picks a class and a
  country, and types the class code. The site shows a six-letter secret code. The child writes it down.
- **Every time after, on the same device:** nothing to do. Progress is sent automatically.
- **On another device:** the child chooses "දිගටම කරමු", types the name and the secret code,
  and carries on from where they stopped.
- **Shared device:** the child presses "පිටවන්න" when finished, so the next child can sign in.

If a child forgets the secret code, look it up in the "Secret code" column.

## Parents' consent

The join form has a part for parents. A parent types their name and ticks a box to agree.
The sheet records the parent's name and the date in the last two columns of the Children
tab. The script refuses any child who joins without it.

A tick box cannot prove that a parent filled it in. To make it stronger, give the class
code to parents only, not to the children.

## Privacy

You are collecting information about children, so please:

- Ask for a **first name or nickname only**. Do not collect surnames, dates of birth,
  addresses or photos.
- Give the class code to parents, so that a parent completes the consent part.
- Share the spreadsheet only with teachers who need it.
- Delete a child's row when they leave the class, or when a parent asks.
- Change the class code if it becomes known outside the class.

## Points

| Action | Points |
| --- | --- |
| Each lesson learned | 10 |
| Each quiz star | 5 |
| Finishing every lesson of a section | 50 extra |
| Test: each right answer | 10 |
| Test: each wrong answer | minus 5 |
| Winning a test, which needs no wrong answers | 50 extra |

Only a child's best attempt at each test counts towards points, so repeating a test does
not pile up points. Change the bonus numbers at the top of `Code.gs` to suit you.

## Tests

Each part has a test for each of its five steps and one final test. A test opens when the
child has marked every poem in it as learned. The Children tab shows, at the far right:

| Column | Meaning |
| --- | --- |
| Tests won | Tests finished with no wrong answer |
| Test attempts | Every attempt, including ones the child left half way |
| Wrong answers in tests | All wrong answers added together |
| Test results | Each test: won or not, best score, number of tries |

A child with many attempts and many wrong answers is guessing. A child with few attempts
and wins has learned the poems.
