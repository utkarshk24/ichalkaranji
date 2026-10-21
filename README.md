# Ichalkaranji — The Manchester of Maharashtra

Independent, trilingual (English / मराठी / हिंदी) city information portal for Ichalkaranji, Kolhapur district.
Not affiliated with Ichalkaranji Municipal Corporation; citizen services link out to official portals.

**Status:** Phase 5 of 7 — all 28 section routes and the home page are live in all three languages (94 static pages).
Phase 6 completes translation review and localized metadata; Phase 7 is the quality pass (accessibility, Lighthouse,
schema validation, link audit, deploy and editor guides).

## Quick start

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL before deploying
npm install
npm run dev                  # http://localhost:3000 → redirects to /en
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build (94 static pages) and server |
| `npm run typecheck` | TypeScript check |
| `npm run check:messages` | Fails if `mr.json` / `hi.json` miss a key or placeholder, if any data/ text lacks mr or hi, or if Devanagari digits appear |
| `python3 scripts/content/<file>.py` | Regenerates `data/pages/*.json` or `data/projects.json` from the trilingual content scripts |

Requires Node 20.9+. Deploys to Vercel or any Node host as-is.

## Stack

Next.js 16 (App Router, TypeScript, static generation) · Tailwind CSS 4 · next-intl 4 · next-themes ·
Lucide icons · Inter + Noto Sans Devanagari (self-hosted via Fontsource) · Leaflet, Recharts and
Framer Motion.

## Structure

```
messages/                 en.json, mr.json, hi.json — every UI string and page title
data/indicators/          sourced statistics (value, year, status, source, method) — see src/types/indicator.ts
data/facts.json           sourced non-numeric facts (language, civic status, PIN)
data/news.json            dated news/notices with source links (home shows the newest 3)
data/featured.json        "Discover" cards; data/quick-links.json official service links
data/media.json           hero photo slot — set { src, alt, credit, license, sourceUrl } for a licensed image
data/places.json          map/tourism places; lat/lng only from a cited source (null = listed, never pinned)
data/timeline.json        history timeline events with era, status (official/secondary/unverified/disputed), source
data/itineraries.json     suggested tourism itineraries (stops reference place ids)
data/projects.json        civic projects tracker (status, cost only when sourced, source, as-of date)
data/pages/<route>.json   trilingual content blocks for the 18 content-driven routes (see src/types/content.ts)
scripts/content/          Python sources for data/pages and data/projects (one L(en, mr, hi) per string)
public/                   icon.svg, og-default.png
scripts/check-messages.mjs
src/
  proxy.ts                locale detection and /{en,mr,hi} redirects (Next 16 "proxy", formerly middleware)
  i18n/                   routing (locales, cookie), request config, locale-aware Link/router
  lib/
    site.ts               routes, mega-menu groups, emergency numbers, official links, site config
    seo.ts                buildMetadata (canonical + hreflang + OG/Twitter), JSON-LD helpers
    data.ts, format.ts    indicator loader, YoY helper, Indian-grouped number/date formatting
  components/
    layout/               Header (mega menu), LanguageSwitcher, ThemeToggle, SearchDialog (Ctrl/⌘K, "/"),
                          EmergencyTicker, Footer, MobileTabBar, MobileMenu, Breadcrumbs, PageHeader, BackToTop
    brand/LogoMark.tsx    the portal's own woven mark (not the municipal emblem)
  app/
    [locale]/layout.tsx   <html lang>, providers, site chrome, site JSON-LD
    [locale]/page.tsx     home: hero + live IST clock/weather/AQI, glance cards, services, map preview,
                          7-day forecast, data snapshot charts, news, helplines, featured, invest teaser
    [locale]/<route>/     dedicated pages: history, map, economy, textile, tourism, data, projects, news, contact, sources
    [locale]/[section]/   renders the 18 content routes from data/pages/<route>.json via ContentBlocks
    sitemap.ts, robots.ts, manifest.ts, icon.svg
```

## Editing pages

Most pages are data, not code. Routes in `contentRoutes` (src/lib/site.ts) render `data/pages/<route>.json`, a list of
typed blocks — `prose`, `facts` (each row carries status and source), `list`, `cards`, `indicators`, `chart`,
`awaited`, `links`, `callout`, `table`, `faq` (emits FAQPage JSON-LD), `weather`, `map`, `quicklinks`, `emergency`.
Edit the Python script in `scripts/content/`, run it, then `npm run check:messages`.

Routes in `dedicatedRoutes` have their own folder under `src/app/[locale]/`. To give a content route a bespoke layout,
create the folder and move the route from `contentRoutes` to `dedicatedRoutes`. Every page header has
"Download as PDF" (the print stylesheet strips site chrome and keeps sources).

## Interactive pages

- `/data` — every indicator with latest and previous figures, change (flagged when it compares an estimate with a
  count), topic/status/text filters, cards or table view, a trend chart for indicators with two or more years, and
  CSV export of exactly what is shown (UTF-8 with BOM so Devanagari opens correctly in spreadsheets).
- `/projects` — status chips with counts and a category filter over `data/projects.json`.
- `/news` — topic filter over `data/news.json`; cards are server-rendered.
- `/contact` — no backend. With `NEXT_PUBLIC_CONTACT_EMAIL` set to the portal team's inbox, the form opens the
  visitor's mail app with the message filled in; unset, the form is disabled and points to the official portals.
- `/sources` — built automatically from every citation in `data/` (indicators, facts, news, places, timeline,
  projects, page blocks), with the pages that use each source, plus status definitions and the disclaimer.

## Content rules

- Every number lives in `data/indicators/*.json` with source, year, status and retrieval date. `value: null` renders
  "Data awaited"; never invent or interpolate values.
- Marathi and Hindi use Western digits with Indian grouping (3,50,000). Do not apply letter-spacing to Devanagari
  (the stylesheet neutralises `tracking-*` utilities in `mr` and `hi`).
- Translations are marked `pending native-speaker review` in each file's `_meta` until reviewed.

## Live data on the home page

Weather, the 7-day forecast and air quality come from [Open-Meteo](https://open-meteo.com) in the visitor's browser
(no API key; one shared request per page). AQI is Open-Meteo's modelled **US AQI** (CAMS), labelled as such — it is not
the CPCB national index. If the API is unreachable, the hero shows the clock and a short "unavailable" note.
The map preview loads Leaflet and OpenStreetMap tiles only when it scrolls into view.

## Map

`/map` and the tourism map use `LayeredMap` (src/components/map): category layers, a name filter, "show all", and a
list view that mirrors the visible markers (the accessible equivalent of the map). Marker colours are slots 1–4 of the
validated reference categorical palette, fixed per category. `/geo/places.geojson` serves every pinned place
(CC BY-SA 4.0, as coordinates come from Wikipedia). To add a place, add it to `data/places.json` with its source;
distances shown are straight-line from the city centre, never road distances.
