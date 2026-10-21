# Editing guide

Almost everything an editor changes is data, not code. Every change follows the same loop:

1. Edit the data file or content script.
2. Run `npm run check` (type check + translation/data rules). Fix anything it reports.
3. Preview with `npm run dev` and open the page in English, मराठी and हिंदी.
4. Commit with a message that says what changed and why, e.g. `Update 2026 ward count (source: IMC notice)`.

## Ground rules

- **No source, no number.** Every figure, date, name or phone number needs a source you can link to. If you can't
  find one, leave the value as awaited (`null`); the site shows "Data awaited" rather than a guess.
- **All three languages, every time.** Every visible text field is `{ "en": …, "mr": …, "hi": … }`.
  `npm run check` fails if one is missing.
- **Western digits with Indian grouping** in all languages: `2,87,570`, never `२,८७,५७०`.
- **Use the glossary** (`docs/glossary.md`) for recurring terms, so a word is translated the same way everywhere.
- **Stay neutral.** Report what officials and documents say; don't take political positions.
- **The portal is independent.** Never add a government emblem or a payment or login form, and never collect ID numbers.

## Common tasks

### Update a statistic

Open `data/indicators/demographics.json`, `civic.json` or `textile.json` and add a point to the indicator's `series`:

```json
{
  "year": 2026,
  "value": 66,
  "status": "official",
  "source": "Ichalkaranji Municipal Corporation ward notification",
  "sourceUrl": "https://…",
  "method": null,
  "retrieved": "2026-11-02"
}
```

- `status` is one of `official`, `secondary`, `estimate`, `projection` or `awaited` (see the Sources page for what each means).
- `method` is `null` for a plain count. For derived or estimated values, use a trilingual
  `{ "en", "mr", "hi" }` explaining how the figure was produced or why it's awaited.
- `retrieved` is the date you checked the source.

The home cards, dashboard, charts, CSV export and Sources page all update automatically.

### Add a news item

Add an object to `data/news.json` with `id`, `date` (YYYY-MM-DD), `category` (`civic`, `election`, `water` or
`environment`), trilingual `title` and `summary`, `source` and `sourceUrl`. Write a factual one- or two-sentence
summary in your own words and link to the published report. The home page shows the newest three.

### Update a project

Edit `scripts/content/projects.py` and run `python3 scripts/content/projects.py`. Status is one of `proposed`,
`ongoing`, `delayed`, `completed` or `awaited`. Fill in `cost` only when a source states it, and set `asOf` to the
month the status refers to (`"2026-06"`).

### Edit a content page

The pages about, demographics, geography, climate, culture, festivals, transport, governance, education, health,
civic services, emergency, directory, gallery, FAQ, privacy, terms and accessibility are built from blocks in
`scripts/content/discover.py`, `city.py` and `info.py`. Edit the block, run the script
(e.g. `python3 scripts/content/city.py`), which rewrites `data/pages/<route>.json`, then run `npm run check`.

Block types are listed in `src/types/content.ts`. The most useful are:

| Block | Use it for |
| --- | --- |
| `facts` | Label/value rows, each with status and source |
| `table` | Comparisons; add `cite` for the source |
| `cards` | A few items with a short description and optional source |
| `awaited` | What is still being verified; better than leaving a gap unexplained |
| `faq` | Questions and answers (also emitted as FAQPage structured data) |
| `callout` | A short info or warning note |

### Add or pin a place on the map

Add it to `data/places.json`. Give `lat`/`lng` **only** from a cited source (Wikipedia's infobox, an official
document); otherwise leave them `null` and the place is listed but not pinned. Set `approximate: true` when the
source rounds the position.

### Add a photograph

Use only photos with an open licence (CC BY or CC BY-SA) or written permission, with no identifiable people
unless they have agreed. For the home hero, set `data/media.json`:

```json
{ "hero": { "src": "https://upload.wikimedia.org/…", "alt": { "en": "…", "mr": "…", "hi": "…" },
  "credit": "Photographer name", "license": "CC BY-SA 4.0", "sourceUrl": "https://commons.wikimedia.org/…" } }
```

### Change interface text

All interface text is in `messages/en.json`, `mr.json` and `hi.json` under the same keys. Change all three.
Plurals use `{count}` (never `#`, which would print Devanagari digits in Marathi).

### Refresh the social cards

After changing the site name or tagline, regenerate the share images:

```bash
pip install playwright && python3 -m playwright install chromium
python3 scripts/og/make_og.py
```

### Update office-bearers after an election or transfer

Edit the governance block in `scripts/content/city.py` (Who represents the city), with the date and source of each
appointment, and the `news.json` entry if relevant. Also update `scripts/content/info.py` if the FAQ mentions it.

## Translation review

Marathi and Hindi are marked "pending native-speaker review" in `messages/*.json` → `_meta`. When a reviewer signs
off a language, change its `reviewStatus` to `reviewed <date> by <name>`. They should check the interface strings
(`messages/`) and page content (`scripts/content/`) against `docs/glossary.md`.
