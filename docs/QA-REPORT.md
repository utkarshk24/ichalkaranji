# Quality report — Phase 7

Checked on 21 October 2026 against a production build (`npm run build && npm start`).

## Summary

| Area | Result |
| --- | --- |
| Accessibility (axe-core 4, WCAG 2.0/2.1/2.2 A + AA + best practices) | **0 violations** on all 29 routes × 4 configurations (EN light desktop, EN dark desktop, मराठी dark mobile, हिंदी light mobile) — 116 page checks |
| Lighthouse accessibility | **100** on every page tested |
| Lighthouse SEO | **100** with the real site URL set (92 locally only because canonical links point at the placeholder domain) |
| Lighthouse best practices | **100**, or 96 where the test sandbox blocked Open-Meteo/OpenStreetMap requests (console network errors) |
| Lighthouse performance, desktop | **100** (home EN, home मराठी, हिंदी map) |
| Lighthouse performance, mobile (simulated slow 4G) | **80–88** across home ×3, data, history, map, tourism, FAQ; CLS ≤ 0.006 |
| Structured data | 291 JSON-LD blocks valid: Organization, WebSite, BreadcrumbList, City, TouristAttraction, FAQPage (one per page) |
| Sitemap / robots / hreflang | 87 URLs, each with en-IN, mr-IN, hi-IN and x-default alternates; robots.txt points to the sitemap |
| Internal links | 96 unique internal links, all 200; no dangling `#anchors`; exactly one `<h1>` per page |
| Source links | 72 external links checked (below) — content verified for every data citation that could be fetched |
| Translations | 544 keys in parity across en/mr/hi; all data text trilingual; glossary rules enforced in CI |

Mobile performance numbers vary ±10 between runs on the shared test machine; treat them as indicative.

## Accessibility fixes made in this phase

- Emergency bar is now a labelled landmark; its duplicate marquee copy is `inert` (it was focusable while `aria-hidden`).
- Tap-to-call links and the header logo/search button: accessible names now match their visible text.
- Wide tables and the dashboard table are keyboard-scrollable (`tabindex="0"`, labelled group).
- Heading outline fixed on /data, /projects and /news (hidden `h2` above card lists).
- Gold text token darkened to `#a1480a`: 6.1:1 on white, 5.4:1 on the gold tint (was 4.46:1).
- Duplicate landmark names removed (tourism map vs. map list).
- "Learn more" links include the card title for screen readers.

Manual keyboard checks: skip link is the first stop and moves focus to `<main>`; `/` and Ctrl/⌘K open search,
Escape closes it and returns focus; every interactive element tabbed through shows a visible focus ring.

## Performance changes

- Recharts now loads only when a chart nears the viewport (and before printing); total blocking time on the
  home page fell from about 400 ms to 140–260 ms in repeated runs.
- Stylesheet is inlined into the HTML (`experimental.inlineCss`), removing two render-blocking requests.
- Fonts moved to `next/font/local`: preloaded, with size-matched fallbacks, and limited to the Latin and
  Devanagari subsets actually used (Inter's 85 KB Latin-extended file is no longer downloaded).

Remaining mobile cost is mainly the 121 KB Devanagari variable font and React hydration. Further gains would come
from subsetting the Devanagari font to the glyphs used, which needs a font build step.

## Security headers

Production responses carry `Content-Security-Policy` (self + Open-Meteo + OpenStreetMap tiles + Wikimedia images),
`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and
`Permissions-Policy`. No CSP violations were logged during the browser test run.

## Source link audit

**Verified — page loads and supports the figure or statement cited**

| Source | Finding |
| --- | --- |
| UNI (West listing page) | Reports Mahayuti 47 of 65 seats. ⚠ A paginated listing page, so the story will drift off it; replace with the article URL when found. |
| Lokmat topic page | Uday Dhatunde first mayor, unopposed; Anil Dalya deputy mayor. |
| ECI round-wise page | Shows Rahul Awade leading (trend page). Final 1,31,919 votes / 60.27% / margin 56,811 confirmed via OneIndia. |
| Aaj Tak | Dhairyasheel Mane 5,20,190 votes; runner-up 5,06,764, so margin 13,426. |
| Ichalkaranji Janata Sahakari Bank | Main Road, PIN 416 115; registered 5 November 1962. |
| Arthavijnana (i-scholar) | "The Weaving Industry of Ichalkaranji". |
| Textile Excellence | "over 150,000 powerlooms", "35 spinning mills". |
| Apparel Resources | "about 4,296 million metres of fabric annually". |
| Navbharat Live ×2 | 18 June 2026 water-supply meeting; 1 Feb 2026 ₹31 crore project delay. |
| SwarGanga | Keshav Gundo Ingale, court singer at Ichalkaranji 1931–1950. |
| MPCB action plan 2025 | 20 MLD STP at Sangli Naka (existing), 18 MLD at Takawade (proposed) — added to the projects page. ⚠ Lists 3.91 lakh population in the summary but 2,92,060 in Table 1 — now noted on the 2025 estimate. |
| MPCB 2021 water-quality data | Station 1311 at Ichalkaranji; source renamed from "action plan" to "water-quality data". |
| Lok Sabha records ×2 | 25,000 shuttleless looms, 225 sizing units, 100 processing units; PM MITRA request for Ichalkaranji. |
| ICAR-CRIDA | Kolhapur normal rainfall 1,019.5 mm. |
| Climate-Zone | 105 °F on 17 May 2016; 7.13 in on 24 July 2021. ⚠ Methodology names a different station; both records now marked "unofficial, verify against IMD". |
| Drishti IAS | Panchganga about 80 km, rises at Prayag Sangam. |
| IndiaNetzone | Marathi- and Kannada-speaking population. |
| Wikipedia (12 articles) | Shahapur (1982 merger, Mhasoba fair), Korochi (1–2 km), Mirashi Buwa (1883), Hatkanangale station (HTK, 2 platforms, 7 km), Kolhapur Airport (Ujalaiwadi, KLH, rebuild), IMC (2022 / 1904), Narsobawadi, CSMT, Assembly constituency (members 1978–2024), Balakrishnabuwa (1849–1926), Hatkanangale, Kurundwad. ⚠ Ichalkaranji article's infobox now says 49.84 sq km (summary table 29.84) — noted on the area figure. |
| Cleartrip ×2 | Pune 237 km / 3 h 20 m, Kolhapur 28 km, Hatkanangale 7.9 km; Bengaluru 611 km, Belagavi 119 km. |
| Wikimedia Meta (DKTE) | Society 1981, institute 1982, degree/diploma/postgraduate programmes. |
| Careers360 | Loads; lists DKTE diplomas (degrees shown only as filters). ⚠ The Sharad Institute card cites a DKTE comparison page — weak; replace with the institute's own page. |
| Google Books | Maharashtra State Gazetteers: Kolhapur. |
| IMD city weather, Washim helplines, Incredible India (Rankala) | Load as expected. |

**Official portals — load and are the right site:** ichalkaranjimnp.in, Aaple Sarkar, RTI Online, Udyam,
MSRTC, UDISE+, AAI, India Post, MSEDCL, Shivaji University, maharashtra.gov.in, IMD.

**Could not be fetched by an automated checker** (robots rules or bot blocking — open them in a browser):
kolhapur.gov.in, grievances.maharashtra.gov.in, wss.mahadiscom.in, mahatenders.gov.in, arogya.maharashtra.gov.in,
uwin.mohfw.gov.in, pmjay.gov.in, irctc.co.in, enquiry.indianrail.gov.in, censusindia.gov.in, the two National Green
Tribunal PDFs, PopulationReview, archive.org, Kupi, Wikimedia Commons search.

## Still open (content, not code)

1. Native-speaker review of Marathi and Hindi (marked pending in `messages/*.json`).
2. Census 2011 detailed tables, IMD 1991–2020 normals, corporation budgets, official loom count, hospital list.
3. Current municipal commissioner (last sourced June 2025).
4. A stable URL for the UNI election story; a better source for Sharad Institute of Technology.
5. Licensed photographs for the hero and gallery.
6. The portal team's contact address (`NEXT_PUBLIC_CONTACT_EMAIL`) and the real domain (`NEXT_PUBLIC_SITE_URL`).
