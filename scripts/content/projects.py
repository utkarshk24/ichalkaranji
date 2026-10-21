"""data/projects.json — the civic projects tracker. Costs and progress only where a source gives them."""
import json
import os
from _lib import L, NGT_AFF, NGT_QR, MPCB25, UPDATED

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "data", "projects.json")
NAV_JUN = "https://navbharatlive.com/maharashtra/mumbai/cm-fadnavis-on-ichalkaranji-water-supply-project-government-decide-soon-1806963.html"
NAV_FEB = "https://navbharatlive.com/maharashtra/kolhapur/ichalkaranji-water-tank-project-delay-bjp-allegations-1545264.html"
LS_MITRA = "https://eparlib.sansad.in/bitstream/123456789/1040983/1/8050.pdf"
TEX = "https://news.textileexcellence.com/iitexpo-ichalkaranji-2018-to-promote-textile-requirements"
KLH = "https://en.wikipedia.org/wiki/Kolhapur_Airport"


def project(id, category, status, title, detail, source, url, as_of, cost=None):
    return {"id": id, "category": category, "status": status, "title": title, "detail": detail,
            "cost": cost, "source": source, "sourceUrl": url, "asOf": as_of, "retrieved": UPDATED}


projects = [
  project("permanent-water", "water", "proposed",
    L("Permanent drinking-water scheme", "कायमस्वरूपी पिण्याच्या पाण्याची योजना", "स्थायी पेयजल योजना"),
    L("The Chief Minister chaired a high-level meeting on long-term water from the Krishna, storage and funding; the state said it would decide soon.",
      "कृष्णेतील दीर्घकालीन पाणी, साठवण व निधी यावर मुख्यमंत्र्यांच्या अध्यक्षतेखाली उच्चस्तरीय बैठक; राज्य लवकरच निर्णय घेणार.",
      "कृष्णा से दीर्घकालिक पानी, भंडारण और वित्त पर मुख्यमंत्री की अध्यक्षता में उच्चस्तरीय बैठक; राज्य जल्द निर्णय लेगा।"),
    "Navbharat Live", NAV_JUN, "2026-06"),
  project("water-tanks", "water", "delayed",
    L("Six water tanks and pumping", "सहा पाण्याच्या टाक्या व उपसा यंत्रणा", "छह पानी की टंकियाँ और पंपिंग"),
    L("Funded under the Maharashtra Suvarna Jayanti Nagarotthan Mahaabhiyan; the delay was criticised in February 2026.",
      "महाराष्ट्र सुवर्ण जयंती नगरोत्थान महाअभियानांतर्गत निधी; फेब्रुवारी 2026 मध्ये विलंबावर टीका.",
      "महाराष्ट्र सुवर्ण जयंती नगरोत्थान महाअभियान के तहत वित्तपोषित; फरवरी 2026 में देरी की आलोचना हुई।"),
    "Navbharat Live", NAV_FEB, "2026-02",
    cost=L("₹31 crore", "₹31 कोटी", "₹31 करोड़")),
  project("krishna-scheme", "water", "completed",
    L("Krishna river water supply scheme", "कृष्णा नदी पाणीपुरवठा योजना", "कृष्णा नदी जलापूर्ति योजना"),
    L("Existing scheme supplying 45 MLD.", "45 दशलक्ष लिटर/दिवस पुरवठा करणारी विद्यमान योजना.", "45 एमएलडी आपूर्ति करने वाली मौजूदा योजना।"),
    "MPCB affidavit to the NGT", NGT_AFF, "2023"),
  project("panchganga-scheme", "water", "completed",
    L("Panchganga river water supply scheme", "पंचगंगा नदी पाणीपुरवठा योजना", "पंचगंगा नदी जलापूर्ति योजना"),
    L("Existing scheme supplying 18 MLD.", "18 दशलक्ष लिटर/दिवस पुरवठा करणारी विद्यमान योजना.", "18 एमएलडी आपूर्ति करने वाली मौजूदा योजना।"),
    "MPCB affidavit to the NGT", NGT_AFF, "2023"),
  project("sewage", "sewerage", "ongoing",
    L("Sewage treatment for the Panchganga", "पंचगंगेसाठी सांडपाणी प्रक्रिया", "पंचगंगा के लिए सीवेज उपचार"),
    L("An existing 20 MLD plant at Sangli Naka, with an 18 MLD plant proposed at Takawade; the state reviewed sewage in Panchganga towns on 16 June 2025 under National Green Tribunal proceedings.",
      "सांगली नाका येथे 20 दशलक्ष लिटर/दिवस क्षमतेचे विद्यमान केंद्र आणि टाकवडे येथे 18 दशलक्ष लिटर/दिवस क्षमतेचे प्रस्तावित केंद्र; राष्ट्रीय हरित लवादातील प्रकरणात 16 जून 2025 रोजी राज्याने पंचगंगा परिसरातील शहरांच्या सांडपाण्याचा आढावा घेतला.",
      "सांगली नाका पर 20 एमएलडी का मौजूदा संयंत्र और टाकवडे में 18 एमएलडी का प्रस्तावित संयंत्र; राष्ट्रीय हरित अधिकरण की कार्यवाही में 16 जून 2025 को राज्य ने पंचगंगा क्षेत्र के शहरों के सीवेज की समीक्षा की।"),
    "MPCB action plan 2025; NGT quarterly report", MPCB25, "2025-06"),
  project("pm-mitra", "industry", "proposed",
    L("PM MITRA textile park", "पीएम मित्र वस्त्रोद्योग पार्क", "पीएम मित्र टेक्सटाइल पार्क"),
    L("Requested by the local MP in the Lok Sabha in 2022. No selection for Ichalkaranji was found.",
      "स्थानिक खासदारांनी 2022 मध्ये लोकसभेत मागणी केली. इचलकरंजीची निवड झाल्याचे आढळले नाही.",
      "स्थानीय सांसद ने 2022 में लोकसभा में माँग की। इचलकरंजी के चयन का कोई प्रमाण नहीं मिला।"),
    "Lok Sabha record", LS_MITRA, "2022"),
  project("processing-cluster", "industry", "awaited",
    L("Mega textile processing cluster", "मेगा वस्त्र प्रक्रिया समूह", "मेगा वस्त्र प्रसंस्करण क्लस्टर"),
    L("Described as “coming up” in 2018; current status not found.", "2018 मध्ये “उभारणी सुरू” असे वर्णन; सध्याची स्थिती आढळली नाही.", "2018 में “बन रहा है” बताया गया; वर्तमान स्थिति नहीं मिली।"),
    "Textile Excellence", TEX, "2018"),
  project("airport", "connectivity", "ongoing",
    L("Kolhapur Airport rebuild", "कोल्हापूर विमानतळ पुनर्बांधणी", "कोल्हापुर हवाई अड्डा पुनर्निर्माण"),
    L("Capacity expansion of the airport that serves Ichalkaranji.", "इचलकरंजीला सेवा देणाऱ्या विमानतळाची क्षमता वाढ.", "इचलकरंजी को सेवा देने वाले हवाई अड्डे का क्षमता विस्तार।"),
    "Wikipedia: Kolhapur Airport", KLH, ""),
  project("roads", "urban", "awaited",
    L("Ring road and road concretisation", "वर्तुळाकार रस्ता व रस्ते काँक्रिटीकरण", "रिंग रोड और सड़क कंक्रीटीकरण"),
    L("No sourced record found yet; to be filled from corporation tenders and budgets.", "अद्याप स्रोतासह नोंद आढळली नाही; महापालिका निविदा व अर्थसंकल्पातून भरली जाईल.", "अभी कोई स्रोत सहित रिकॉर्ड नहीं मिला; महानगरपालिका निविदाओं और बजट से भरा जाएगा।"),
    "—", "", ""),
]

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(projects, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"wrote data/projects.json ({len(projects)} projects)")
