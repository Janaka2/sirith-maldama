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
4. Near the top, change `CHANGE-ME` to a class code of your own, for example `LOTUS2026`.
   Pupils type this word once when they join. It keeps strangers out.
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

Change the three numbers at the top of `Code.gs` to suit you.
