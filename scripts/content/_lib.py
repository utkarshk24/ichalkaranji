"""Helpers for writing trilingual page content into data/pages/*.json.

Every human-readable string is L(en, mr, hi). Run any content script with:
    python3 scripts/content/<file>.py
then `npm run check:messages` to verify every string exists in all three languages.
"""
import json
import os

UPDATED = "2026-10-21"
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "data", "pages")


def L(en, mr, hi):
    return {"en": en, "mr": mr, "hi": hi}


def page(route, summary, blocks, updated=UPDATED):
    os.makedirs(OUT, exist_ok=True)
    data = {"route": route, "summary": summary, "updated": updated, "blocks": blocks}
    with open(os.path.join(OUT, f"{route}.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"wrote data/pages/{route}.json ({len(blocks)} blocks)")


def fact(label, value, status, source, url=""):
    row = {"label": label, "value": value, "status": status, "source": source}
    if url:
        row["sourceUrl"] = url
    return row


# Frequently cited sources
WIKI = "https://en.wikipedia.org/wiki/Ichalkaranji"
WIKI_IMC = "https://en.wikipedia.org/wiki/Ichalkaranji_Municipal_Corporation"
UNI = "https://www.uniindia.com/news/states/west/page-5/"
MPCB19 = "https://mpcb.gov.in/sites/default/files/river-polluted/action-plan-priority/Action_plans_priority_V_PANCHGANGA_2019_03072019.pdf"
MPCB25 = "https://mpcb.gov.in/sites/default/files/Establishment%20of%20MPCB/Seniority%20list/2014/Panchaganga%20River%206.0_%20Action%20Plan%202025.pdf"
NGT_AFF = "https://www.greentribunal.gov.in/sites/default/files/news_updates/Affidavit%20in%20Reply%20by%20MPCB%20in%20EA%20No.23-2023%20(page%20nos.191-225).pdf"
NGT_QR = "https://www.greentribunal.gov.in/sites/default/files/news_updates/Quarterly%20Report%20by%20Chief%20Secretary%20in%20EA%20No.23-2023%20(page%20nos.510-535).pdf"
DRISHTI = "https://www.drishtiias.com/state-pcs-current-affairs/panchaganga-river/print_manually"
CLEARTRIP = "https://www.cleartrip.com/tourism/routes/dd/ichalkaranji-to-pune-route.html"
CLEARTRIP_BLR = "https://www.cleartrip.com/tourism/routes/dd/ichalkaranji-to-bangalore-route.html"
