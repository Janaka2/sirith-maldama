# Finding and checking passages

## tripitaka.online

The site loads text from two public endpoints.

| Endpoint | Returns |
| --- | --- |
| `https://www.tripitaka.online/api/tree` | The whole index. Each leaf has `label` and `data`. `data` is the page id. |
| `https://www.tripitaka.online/api/sutta/<id>` | One page. `content.data` is a list of blocks with `class` and `content`. |

The reader-facing link is `https://www.tripitaka.online/sutta/<id>`.

Blocks with class `pali-text` hold Pali. The block after it, class `sinhala-text`, holds
the translation. Verses carry the class `gatha`.

Be polite to the server. Fetch a page once, keep it in the cache folder the scripts use,
and leave at least half a second between requests.

Sinhala text contains the zero-width joiner. Keep it when copying. Strip it only when
comparing strings.

## Pages already checked

| Teaching | Reference | Page id |
| --- | --- | --- |
| Mind comes first | ධම්මපදය 1 | 11732 |
| Sorrow and joy in both worlds | ධම්මපදය 15, 16 | 11732 |
| Hatred is never ended by hatred | ධම්මපදය 5 | 11732 |
| Look at your own deeds, not others' | ධම්මපදය 50 | 11735 |
| Many good deeds, like many garlands from a heap of flowers | ධම්මපදය 53 | 11735 |
| The fragrance of the good spreads everywhere | ධම්මපදය 54 | 11735 |
| Be quick to do good, or the mind delights in wrong | ධම්මපදය 116 | 11740 |
| Do not harm others for your own happiness | ධම්මපදය 131 | 11741 |
| Speak harshly to no one | ධම්මපදය 133 | 11741 |
| A liar can do any wrong | ධම්මපදය 176 | 11780 |
| Speak truth, do not be angry, give | ධම්මපදය 224 | 11789 |
| The wise are restrained in body, speech and mind | ධම්මපදය 234 | 11789 |
| One who did wrong and says "I did not" | ධම්මපදය 306 | 11800 |
| No friendship with the foolish | ධම්මපදය 61 | 11736 |
| One who shows your faults is like one who shows treasure | ධම්මපදය 76 | 11737 |
| Keep good friends | ධම්මපදය 78 | 11737 |
| Honouring elders brings four blessings | ධම්මපදය 109 | 11739 |
| Do not think lightly of a small wrong | ධම්මපදය 121 | 11740 |
| All fear harm, so do not kill | ධම්මපදය 129, 130 | 11741 |
| You are your own refuge | ධම්මපදය 160 | 11743 |
| Avoid evil, do good, purify the mind | ධම්මපදය 183 | 11782 |
| Conquer anger with non-anger | ධම්මපදය 223 | 11789 |
| Others' faults are easy to see | ධම්මපදය 252 | 11791 |
| Seeing fault where there is none | ධම්මපදය 318 | 11800 |
| Caring for mother and father is happiness | ධම්මපදය 332 | 11801 |
| Not by birth is one noble | ධම්මපදය 393 | 11804 |
| Blessings: wise company, learning, parents, relatives, no drink, humility and gratitude, patience | මංගල සූත්‍රය, verses 2 and 4 to 9 | 11722 |
| Parents are Brahma and first teachers | සබ්‍රහ්ම සූත්‍රය | 8526 |
| Parents are the first gods of the home | සබ්‍රහ්මක සූත්‍රය | 12464 |
| Parents cannot easily be repaid | අංගුත්තර, දුක නිපාතය, සමචිත්ත වර්ගය 33 | 7368 |
| By deeds, not birth | වසල සූත්‍රය, වාසෙට්ඨ සූත්‍රය | 12603, 12756 |
| Causes of downfall | පරාභව සූත්‍රය | 12601 |
| Sleepiness and laziness, and eating good things alone | පරාභව සූත්‍රය, verses 96 and 102 | 12601 |
| Freedom from envy, humility, asking the wise, freedom from anger | චූළ කම්මවිභංග සූත්‍රය | 811 |
| Right speech: no tale-bearing, kind words, useful words | සාලෙය්‍යක සූත්‍රය | 396 |
| Parents' duties to children, teachers' duties to pupils, four true friends | සිගාල සූත්‍රය | 236 |
| Well-spoken words | සුභාසිත සූත්‍රය, සුභාසිත වාචා සූත්‍රය | 12750, 9942 |
| Duties to parents and teachers, false friends, dangers of drink, gambling, idleness, roaming at night | සිගාල සූත්‍රය | 236 |
| Do not lie, and reflect before acting | අම්බලට්ඨික රාහුලෝවාද සූත්‍රය | 458 |
| Compare others with yourself | වේළුද්වාරෙය්‍ය සූත්‍රය | 6306 |
| May all beings be happy | කරණීයමෙත්ත සූත්‍රය | 12604 |
| The lay follower's precepts | ධම්මික සූත්‍රය | 12699 |

## Checked and rejected

| Passage | Why it was not used |
| --- | --- |
| ධම්මපදය 152 (page 11742) | The translation speaks of learning the Dhamma, not school learning. |
| ධම්මපදය 155 (page 11742) | It is about the holy life in youth, not study. |
| ධම්මපදය 204 (page 11785) | The translation gives contentment a deeper meaning than being glad with a gift. Mangala verse 8 fits better. |
| චූළ කම්මවිභංග, asking the wise, for "ask before starting a task" | The sutta is about asking what is wholesome. Used only where the poem is about hearing one's faults. |
| භද්දේකරත්ත සූත්‍රය, "අජ්ජේව කිච්චමාතප්පං" (page 807) | It urges effort in the Dhamma today. Using it for schoolwork would bend its meaning. |

## Choosing an excerpt

- Prefer the passage that describes the good quality, not the fault.
- Long prose may start or stop only at a sentence boundary. The site marks the cut with "…".
- The කාලාම (කේසමුත්ති) සූත්‍රය was not found by name in the index. Do not cite it until found.

## Topics with no passage found

Smoking, chewing tobacco and chewing betel are not addressed in the pages searched.
Household customs such as where to keep a broom are customs, not Buddha-word.
Show these poems without a citation.

## mahamevnawa.lk and mahamegha.lk

These are ordinary web pages. Fetch the page, read it, and link to the exact article.
Useful starting points:

- https://mahamevnawa.lk/dhammapadaya/ for Dhammapada stories
- https://mahamevnawa.lk/jathaka-stories/ for Jataka stories
- https://mahamegha.lk/category/daham-paasala/ for the children's series

Link only to an article you have opened and read in this session.
