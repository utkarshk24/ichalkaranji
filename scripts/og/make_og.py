"""Render the per-locale social cards public/og/{en,mr,hi}.png (1200×630).

Text comes from messages/<locale>.json (site.name, site.fullName's subtitle, seo.siteName), so the cards
stay in step with translations. Requires Playwright for Python and a Chromium build:

    pip install playwright && python3 -m playwright install chromium   # or set CHROMIUM_PATH
    python3 scripts/og/make_og.py
"""
import asyncio
import json
import os
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / "node_modules" / "@fontsource-variable"
OUT = ROOT / "public" / "og"
LOCALES = ["en", "mr", "hi"]
LANGS = "English · मराठी · हिंदी"

TEMPLATE = """<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>
@font-face {{ font-family: Inter; src: url("{inter}") format("woff2"); font-weight: 100 900; }}
@font-face {{ font-family: Deva; src: url("{deva}") format("woff2"); font-weight: 100 900; }}
* {{ margin: 0; box-sizing: border-box; }}
body {{ width: 1200px; height: 630px; background: #1e3a8a; color: #fff; font-family: Inter, Deva, sans-serif; position: relative; overflow: hidden; }}
.wrap {{ position: absolute; inset: 0; padding: 72px 80px; display: flex; flex-direction: column; justify-content: center; }}
.brand {{ display: flex; align-items: center; gap: 16px; font-size: 26px; font-weight: 600; color: #dbe4ff; }}
.brand img {{ width: 56px; height: 56px; border-radius: 12px; box-shadow: 0 0 0 2px rgba(255,255,255,.25); }}
h1 {{ margin-top: 40px; font-size: {title_size}px; line-height: 1.1; font-weight: 800; letter-spacing: {tracking}; }}
.sub {{ margin-top: 18px; font-size: 44px; font-weight: 600; color: #fbd38d; line-height: 1.3; }}
.meta {{ margin-top: 36px; font-size: 28px; color: #dbe4ff; }}
.band {{ position: absolute; left: 0; right: 0; bottom: 0; height: 24px;
  background: conic-gradient(#d97706 25%, transparent 0 50%, #d97706 0 75%, transparent 0) 0 0 / 24px 24px; }}
.band::before {{ content: ""; position: absolute; inset: -24px 0 auto 0; height: 24px; opacity: .35;
  background: conic-gradient(#d97706 25%, transparent 0 50%, #d97706 0 75%, transparent 0) 12px 0 / 24px 24px; }}
</style></head><body>
<div class="wrap">
  <div class="brand"><img src="{logo}" alt="">{site_name}</div>
  <h1>{title}</h1>
  <p class="sub">{subtitle}</p>
  <p class="meta">{independent} · {langs}</p>
</div>
<div class="band"></div>
</body></html>"""

INDEPENDENT = {"en": "Independent city portal", "mr": "स्वतंत्र शहर पोर्टल", "hi": "स्वतंत्र शहर पोर्टल"}


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    launch = {"executable_path": os.environ["CHROMIUM_PATH"]} if os.environ.get("CHROMIUM_PATH") else {}
    async with async_playwright() as p:
        browser = await p.chromium.launch(**launch)
        page = await browser.new_page(viewport={"width": 1200, "height": 630})
        for locale in LOCALES:
            m = json.loads((ROOT / "messages" / f"{locale}.json").read_text(encoding="utf-8"))
            subtitle = m["site"]["fullName"].split("—", 1)[1].strip()
            html = TEMPLATE.format(
                lang=locale,
                inter=(FONTS / "inter" / "files" / "inter-latin-wght-normal.woff2").as_uri(),
                deva=(FONTS / "noto-sans-devanagari" / "files" / "noto-sans-devanagari-devanagari-wght-normal.woff2").as_uri(),
                logo=(ROOT / "public" / "icon.svg").as_uri(),
                site_name=m["seo"]["siteName"],
                title=m["site"]["name"],
                subtitle=subtitle,
                independent=INDEPENDENT[locale],
                langs=LANGS,
                title_size=112,
                # Devanagari conjuncts break with negative tracking.
                tracking="-0.02em" if locale == "en" else "normal",
            )
            tmp = OUT / f".{locale}.html"
            tmp.write_text(html, encoding="utf-8")
            await page.goto(tmp.as_uri())
            await page.evaluate("document.fonts.ready")
            await page.screenshot(path=str(OUT / f"{locale}.png"))
            tmp.unlink()
            print(f"wrote public/og/{locale}.png")
        await browser.close()


asyncio.run(main())
