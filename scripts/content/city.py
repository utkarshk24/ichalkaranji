"""Transport, governance, education, health, civic services, emergency."""
from _lib import *

AWAITED = L("Awaited", "प्रतीक्षेत", "प्रतीक्षित")
DASH = L("—", "—", "—")
ECI = "https://results.eci.gov.in/ResultAcGenNov2024/RoundwiseS13279.htm"
PRS = "https://prsindia.org/mlatrack/rahul-prakash-awade"
LOKMAT = "https://www.lokmat.com/topics/ichalkaranji-municipal-corporation-election"
AIR = "https://newsonair.gov.in/mr/pune-pimpri-chinchwad-election/"
AAJTAK = "https://www.aajtak.in/elections/lok-sabha-election-2024/maharashtra/hatkanangle-constituency-result-13548"
INDIAVOTES = "https://indiavotes.com/vidhan-sabha/maharashtra/1980/ichalkaranji/"
HTK = "https://en.wikipedia.org/wiki/Hatkanangale_railway_station"
KLH = "https://en.wikipedia.org/wiki/Kolhapur_Airport"
CAREERS = "https://www.careers360.com/colleges/dkte-societys-textile-and-engineering-institute-ichalkaranji/courses?degree=1"
DKTE_META = "https://meta.wikimedia.org/wiki/Marathi_Wikipedia_Workshop_at_DKTE_Society%27s_Textile_%26_Engineering_Institute"
SIT = "https://www.careers360.com/colleges/dkte-societys-textile-and-engineering-institute-ichalkaranji/compare"

# ------------------------------------------------------------------ TRANSPORT
page("transport",
  L("Ichalkaranji has no airport, metro or railway station of its own. The nearest station is Hatkanangale, about 7–8 km away, and the nearest airport is Kolhapur.",
    "इचलकरंजीत स्वतःचा विमानतळ, मेट्रो किंवा रेल्वे स्थानक नाही. सर्वांत जवळचे स्थानक सुमारे 7–8 किमीवरील हातकणंगले आणि सर्वांत जवळचा विमानतळ कोल्हापूर.",
    "इचलकरंजी का अपना हवाई अड्डा, मेट्रो या रेलवे स्टेशन नहीं है। निकटतम स्टेशन लगभग 7–8 किमी दूर हातकणंगले है और निकटतम हवाई अड्डा कोल्हापुर।"),
  [
    {"type": "table", "id": "modes", "title": L("Getting here and around", "येथे कसे यावे व फिरावे", "यहाँ कैसे पहुँचें और घूमें"),
     "columns": [L("Mode", "साधन", "साधन"), L("Details", "तपशील", "विवरण"), L("Source", "स्रोत", "स्रोत")],
     "rows": [
       [L("Rail", "रेल्वे", "रेल"), L("Hatkanangale (HTK), Central Railway: 2 platforms, single diesel line, about 7–8 km from the city", "हातकणंगले (HTK), मध्य रेल्वे: 2 फलाट, एकेरी डिझेल मार्ग, शहरापासून सुमारे 7–8 किमी", "हातकणंगले (HTK), मध्य रेलवे: 2 प्लेटफ़ॉर्म, एकल डीज़ल लाइन, शहर से लगभग 7–8 किमी"), L("Wikipedia; Cleartrip", "विकिपीडिया; क्लिअरट्रिप", "विकिपीडिया; क्लियरट्रिप")],
       [L("Mainline rail", "मुख्य रेल्वे मार्ग", "मुख्य रेल मार्ग"), L("Kolhapur (CSMT) and Miraj Junction: road distances awaited", "कोल्हापूर (CSMT) व मिरज जंक्शन: रस्ता अंतरे प्रतीक्षेत", "कोल्हापुर (CSMT) और मिरज जंक्शन: सड़क दूरी प्रतीक्षित"), DASH],
       [L("Air", "विमान", "हवाई"), L("Kolhapur Airport (KLH), Chhatrapati Rajaram Maharaj Airport, at Ujalaiwadi on the Hupari–Kolhapur road; about 30 km; being rebuilt", "कोल्हापूर विमानतळ (KLH), छत्रपती राजाराम महाराज विमानतळ, हुपरी–कोल्हापूर रस्त्यावर उजळाईवाडी; सुमारे 30 किमी; पुनर्बांधणी सुरू", "कोल्हापुर हवाई अड्डा (KLH), छत्रपति राजाराम महाराज हवाई अड्डा, हुपरी–कोल्हापुर रोड पर उजलाईवाड़ी; लगभग 30 किमी; पुनर्निर्माण जारी"), L("Wikipedia", "विकिपीडिया", "विकिपीडिया")],
       [L("Other airports", "इतर विमानतळ", "अन्य हवाई अड्डे"), L("Belagavi (IXG) about 119 km by road; Pune (PNQ) about 237 km; Goa Mopa (GOX), distance awaited", "बेळगावी (IXG) रस्त्याने सुमारे 119 किमी; पुणे (PNQ) सुमारे 237 किमी; गोवा मोपा (GOX), अंतर प्रतीक्षेत", "बेलगावी (IXG) सड़क से लगभग 119 किमी; पुणे (PNQ) लगभग 237 किमी; गोवा मोपा (GOX), दूरी प्रतीक्षित"), L("Cleartrip", "क्लिअरट्रिप", "क्लियरट्रिप")],
       [L("Bus", "बस", "बस"), L("About 40 minutes to Kolhapur; MSRTC services to Kolhapur and Pune", "कोल्हापूरला सुमारे 40 मिनिटे; कोल्हापूर व पुण्यासाठी एसटी (MSRTC) सेवा", "कोल्हापुर तक लगभग 40 मिनट; कोल्हापुर और पुणे के लिए MSRTC सेवाएँ"), L("Cleartrip", "क्लिअरट्रिप", "क्लियरट्रिप")],
       [L("Highways", "महामार्ग", "राजमार्ग"), L("State highway numbers and distance to NH-48 awaited", "राज्य महामार्ग क्रमांक व NH-48 पर्यंतचे अंतर प्रतीक्षेत", "राज्य राजमार्ग संख्या और NH-48 तक दूरी प्रतीक्षित"), DASH],
       [L("Metro", "मेट्रो", "मेट्रो"), L("None, and no proposal found", "नाही; कोणताही प्रस्ताव आढळला नाही", "नहीं; कोई प्रस्ताव नहीं मिला"), DASH],
       [L("City roads", "शहरातील रस्ते", "शहर की सड़कें"), L("421.78 km of roads within city limits", "शहर हद्दीत 421.78 किमी रस्ते", "शहर सीमा में 421.78 किमी सड़कें"), L("Wikipedia", "विकिपीडिया", "विकिपीडिया")],
     ],
     "cite": {"source": "Wikipedia: Hatkanangale railway station; Wikipedia: Kolhapur Airport; Cleartrip", "sourceUrl": HTK}},
    {"type": "map", "id": "map", "title": L("Stations and airport", "स्थानके व विमानतळ", "स्टेशन और हवाई अड्डा"), "categories": ["transport", "landmark"]},
    {"type": "callout", "id": "schedules", "tone": "info", "body": L("Flight routes and bus and train timetables change often, so this portal does not copy them. Check the airline, MSRTC or Indian Railways before you travel.", "विमान मार्ग, बस व रेल्वे वेळापत्रके वारंवार बदलतात, म्हणून हे पोर्टल ती देत नाही. प्रवासापूर्वी विमान कंपनी, एसटी महामंडळ किंवा भारतीय रेल्वेकडे तपासा.", "उड़ान मार्ग और बस व ट्रेन समय-सारिणी अक्सर बदलती हैं, इसलिए यह पोर्टल उन्हें नहीं दोहराता। यात्रा से पहले एयरलाइन, MSRTC या भारतीय रेल से जाँच लें।")},
    {"type": "links", "id": "official", "title": L("Timetables and bookings", "वेळापत्रके व आरक्षण", "समय-सारिणी और बुकिंग"), "items": [
      {"title": L("MSRTC (state transport buses)", "एसटी महामंडळ (MSRTC)", "MSRTC (राज्य परिवहन बसें)"), "href": "https://msrtc.maharashtra.gov.in", "body": L("Routes, timetables and reservations.", "मार्ग, वेळापत्रके व आरक्षण.", "मार्ग, समय-सारिणी और आरक्षण।")},
      {"title": L("Indian Railways enquiry", "भारतीय रेल्वे चौकशी", "भारतीय रेल पूछताछ"), "href": "https://enquiry.indianrail.gov.in", "body": L("Train running status and schedules.", "गाड्यांची स्थिती व वेळापत्रके.", "ट्रेन की स्थिति और समय-सारिणी।")},
      {"title": L("IRCTC (train tickets)", "IRCTC (रेल्वे तिकीट)", "IRCTC (रेल टिकट)"), "href": "https://www.irctc.co.in", "body": L("Official ticket booking.", "अधिकृत तिकीट आरक्षण.", "आधिकारिक टिकट बुकिंग।")},
      {"title": L("Airports Authority of India", "भारतीय विमानतळ प्राधिकरण", "भारतीय विमानपत्तन प्राधिकरण"), "href": "https://www.aai.aero", "body": L("Kolhapur Airport information.", "कोल्हापूर विमानतळ माहिती.", "कोल्हापुर हवाई अड्डा जानकारी।")},
    ]},
  ])

# ------------------------------------------------------------------ GOVERNANCE
page("governance",
  L("Ichalkaranji became a municipal corporation in 2022 and held its first corporation election in January 2026. Office-bearers below are listed with the source and date of each record.",
    "इचलकरंजी 2022 मध्ये महानगरपालिका झाली आणि जानेवारी 2026 मध्ये पहिली निवडणूक झाली. खालील पदाधिकाऱ्यांची नोंद स्रोत व दिनांकासह दिली आहे.",
    "इचलकरंजी 2022 में महानगरपालिका बनी और जनवरी 2026 में इसका पहला चुनाव हुआ। नीचे पदाधिकारियों को स्रोत और तारीख के साथ सूचीबद्ध किया गया है।"),
  [
    {"type": "facts", "id": "offices", "title": L("Who represents the city", "शहराचे प्रतिनिधी", "शहर के प्रतिनिधि"), "rows": [
      fact(L("Municipal corporation", "महानगरपालिका", "महानगरपालिका"), L("Formed by state government resolution of 5 May 2022; the municipal council dated from 1904; run by an appointed administrator until 2026", "5 मे 2022 च्या शासन निर्णयाने स्थापना; नगरपरिषद 1904 पासून; 2026 पर्यंत नियुक्त प्रशासकाद्वारे कारभार", "5 मई 2022 के शासन निर्णय से गठित; नगर परिषद 1904 से; 2026 तक नियुक्त प्रशासक द्वारा संचालन"), "official", "Wikipedia: Ichalkaranji Municipal Corporation", WIKI_IMC),
      fact(L("Mayor", "महापौर", "महापौर"), L("Uday Dhatunde (BJP), first mayor, elected unopposed, February 2026", "उदय धातुंडे (भाजप), पहिले महापौर, बिनविरोध, फेब्रुवारी 2026", "उदय धातुंडे (भाजपा), पहले महापौर, निर्विरोध, फरवरी 2026"), "secondary", "Lokmat", LOKMAT),
      fact(L("Deputy mayor", "उपमहापौर", "उपमहापौर"), L("Anil Dalya, elected unopposed, February 2026", "अनिल डाल्या, बिनविरोध, फेब्रुवारी 2026", "अनिल डाल्या, निर्विरोध, फरवरी 2026"), "secondary", "Lokmat", LOKMAT),
      fact(L("Municipal commissioner", "महापालिका आयुक्त", "नगर आयुक्त"), L("Pallavi Patil, as named in a June 2025 state filing; current holder to be confirmed", "पल्लवी पाटील, जून 2025 च्या शासकीय कागदपत्रानुसार; सध्याच्या पदाधिकाऱ्याची खात्री बाकी", "पल्लवी पाटिल, जून 2025 के राज्य दस्तावेज़ अनुसार; वर्तमान पदधारक की पुष्टि बाकी"), "secondary", "NGT: Chief Secretary quarterly report", NGT_QR),
      fact(L("MLA, Ichalkaranji (Assembly seat 279)", "आमदार, इचलकरंजी (विधानसभा 279)", "विधायक, इचलकरंजी (विधानसभा 279)"), L("Rahul Prakash Awade (BJP), elected November 2024", "राहुल प्रकाश आवाडे (भाजप), नोव्हेंबर 2024", "राहुल प्रकाश आवाडे (भाजपा), नवंबर 2024 में निर्वाचित"), "official", "Election Commission of India", ECI),
      fact(L("MP, Hatkanangle (Lok Sabha)", "खासदार, हातकणंगले (लोकसभा)", "सांसद, हातकणंगले (लोकसभा)"), L("Dhairyasheel Mane (Shiv Sena), re-elected June 2024", "धैर्यशील माने (शिवसेना), जून 2024 मध्ये पुन्हा निवड", "धैर्यशील माने (शिवसेना), जून 2024 में पुनः निर्वाचित"), "official", "Aaj Tak (ECI results)", AAJTAK),
    ]},
    {"type": "table", "id": "results", "title": L("Recent election results", "अलीकडील निवडणूक निकाल", "हाल के चुनाव परिणाम"),
     "columns": [L("Election", "निवडणूक", "चुनाव"), L("Result", "निकाल", "परिणाम"), L("Date", "दिनांक", "तारीख")],
     "rows": [
       [L("Corporation, 65 seats", "महानगरपालिका, 65 जागा", "महानगरपालिका, 65 सीटें"), L("Mahayuti alliance 47; Congress-backed Shiv–Shahu Aghadi 17", "महायुती 47; काँग्रेस-समर्थित शिव–शाहू आघाडी 17", "महायुति 47; कांग्रेस समर्थित शिव–शाहू आघाड़ी 17"), L("15–16 Jan 2026", "15–16 जानेवारी 2026", "15–16 जनवरी 2026")],
       [L("Corporation, counting-day leads", "महानगरपालिका, मतमोजणीतील आघाडी", "महानगरपालिका, मतगणना के रुझान"), L("BJP 43, Shiv–Shahu Vikas Aghadi 17, Shiv Sena 3, Shiv Sena (UBT) 1, NCP 1 (leads, not final)", "भाजप 43, शिव–शाहू विकास आघाडी 17, शिवसेना 3, शिवसेना (उबाठा) 1, राष्ट्रवादी 1 (आघाडी, अंतिम नव्हे)", "भाजपा 43, शिव–शाहू विकास आघाड़ी 17, शिवसेना 3, शिवसेना (उबाठा) 1, राकांपा 1 (रुझान, अंतिम नहीं)"), L("16 Jan 2026", "16 जानेवारी 2026", "16 जनवरी 2026")],
       [L("Assembly, Ichalkaranji", "विधानसभा, इचलकरंजी", "विधानसभा, इचलकरंजी"), L("Rahul Prakash Awade (BJP) 1,31,919 votes (60.27%); margin 56,811 over Madan Karande (NCP-SP)", "राहुल प्रकाश आवाडे (भाजप) 1,31,919 मते (60.27%); मदन कारंडे (राष्ट्रवादी-शप) यांच्यावर 56,811 मताधिक्य", "राहुल प्रकाश आवाडे (भाजपा) 1,31,919 मत (60.27%); मदन कारंडे (राकांपा-शप) पर 56,811 का अंतर"), L("Nov 2024", "नोव्हेंबर 2024", "नवंबर 2024")],
       [L("Lok Sabha, Hatkanangle", "लोकसभा, हातकणंगले", "लोकसभा, हातकणंगले"), L("Dhairyasheel Mane (Shiv Sena) 5,20,190 votes; margin 13,426 over Satyajeet Patil (UBT); Raju Shetti third", "धैर्यशील माने (शिवसेना) 5,20,190 मते; सत्यजीत पाटील (उबाठा) यांच्यावर 13,426 मताधिक्य; राजू शेट्टी तिसरे", "धैर्यशील माने (शिवसेना) 5,20,190 मत; सत्यजीत पाटिल (उबाठा) पर 13,426 का अंतर; राजू शेट्टी तीसरे"), L("Jun 2024", "जून 2024", "जून 2024")],
     ],
     "cite": {"source": "UNI; AIR News; ECI; Aaj Tak", "sourceUrl": UNI}},
    {"type": "list", "id": "history", "title": L("Assembly seat: winning party by year", "विधानसभा: वर्षनिहाय विजयी पक्ष", "विधानसभा: वर्षवार विजयी दल"),
     "items": [L("1978 — CPI(M)", "1978 — माकप", "1978 — माकपा"), L("1980 — INC(U)", "1980 — काँग्रेस (यू)", "1980 — कांग्रेस (यू)"), L("1985 — INC", "1985 — काँग्रेस", "1985 — कांग्रेस"), L("1990 — CPI(M)", "1990 — माकप", "1990 — माकपा"), L("1995–2004 — INC", "1995–2004 — काँग्रेस", "1995–2004 — कांग्रेस"), L("2009, 2014 — BJP", "2009, 2014 — भाजप", "2009, 2014 — भाजपा"), L("2019 — Independent (Prakash Awade)", "2019 — अपक्ष (प्रकाश आवाडे)", "2019 — निर्दलीय (प्रकाश आवाडे)"), L("2024 — BJP", "2024 — भाजप", "2024 — भाजपा")],
     "lead": L("Source: IndiaVotes and Wikipedia.", "स्रोत: इंडियाव्होट्स व विकिपीडिया.", "स्रोत: इंडियावोट्स और विकिपीडिया।")},
    {"type": "prose", "id": "issues", "title": L("Issues on the civic agenda", "नागरी प्रश्न", "नागरिक मुद्दे"), "paragraphs": [
      L("Recurring local issues include a permanent drinking-water source, pollution of the Panchganga river and the competitiveness of the textile sector. This portal reports what officials and documents say; it does not take political positions.",
        "कायमस्वरूपी पिण्याच्या पाण्याचा स्रोत, पंचगंगेचे प्रदूषण आणि वस्त्रोद्योगाची स्पर्धात्मकता हे सतत चर्चेतील स्थानिक प्रश्न आहेत. हे पोर्टल अधिकारी व कागदपत्रे काय सांगतात ते मांडते; कोणतीही राजकीय भूमिका घेत नाही.",
        "स्थायी पेयजल स्रोत, पंचगंगा नदी का प्रदूषण और वस्त्र उद्योग की प्रतिस्पर्धा बार-बार उठने वाले स्थानीय मुद्दे हैं। यह पोर्टल बताता है कि अधिकारी और दस्तावेज़ क्या कहते हैं; यह कोई राजनीतिक पक्ष नहीं लेता।"),
    ]},
    {"type": "awaited", "id": "awaited", "title": L("Being added", "जोडले जात आहे", "जोड़ा जा रहा है"),
     "items": [L("Ward map and list of corporators", "प्रभाग नकाशा व नगरसेवकांची यादी", "वार्ड नक्शा और पार्षदों की सूची"), L("Standing committee members", "स्थायी समिती सदस्य", "स्थायी समिति सदस्य"), L("Department heads", "विभागप्रमुख", "विभाग प्रमुख"), L("Corporation budgets 2023–27", "महापालिका अर्थसंकल्प 2023–27", "महानगरपालिका बजट 2023–27")]},
    {"type": "callout", "id": "recheck", "tone": "warning", "body": L("Political data reflects records up to February 2026. Check the corporation's website for the current office-bearers.", "राजकीय माहिती फेब्रुवारी 2026 पर्यंतच्या नोंदींवर आधारित आहे. सध्याच्या पदाधिकाऱ्यांसाठी महापालिकेचे संकेतस्थळ पाहा.", "राजनीतिक जानकारी फरवरी 2026 तक के अभिलेखों पर आधारित है। वर्तमान पदाधिकारियों के लिए महानगरपालिका की वेबसाइट देखें।")},
  ])

# ------------------------------------------------------------------ EDUCATION
page("education",
  L("Ichalkaranji's best-known institution is the DKTE Society's Textile & Engineering Institute, founded by local cooperatives. School and college counts are being compiled from official lists.",
    "डीकेटीई सोसायटीचे टेक्स्टाईल अँड इंजिनिअरिंग इन्स्टिट्यूट ही इचलकरंजीतील सर्वांत प्रसिद्ध संस्था; तिची स्थापना स्थानिक सहकारी संस्थांनी केली. शाळा व महाविद्यालयांची संख्या अधिकृत यादीतून संकलित होत आहे.",
    "इचलकरंजी का सबसे प्रसिद्ध संस्थान डीकेटीई सोसाइटी का टेक्सटाइल एंड इंजीनियरिंग इंस्टीट्यूट है, जिसे स्थानीय सहकारी संस्थाओं ने स्थापित किया। स्कूल और कॉलेजों की संख्या आधिकारिक सूचियों से संकलित की जा रही है।"),
  [
    {"type": "cards", "id": "institutions", "title": L("Higher education", "उच्च शिक्षण", "उच्च शिक्षा"), "items": [
      {"title": L("DKTE Society's Textile & Engineering Institute", "डीकेटीई सोसायटीचे टेक्स्टाईल अँड इंजिनिअरिंग इन्स्टिट्यूट", "डीकेटीई सोसाइटी का टेक्सटाइल एंड इंजीनियरिंग इंस्टीट्यूट"),
       "body": L("Society formed in 1981 by local cooperatives and named after Dattajirao Kadam; the institute opened in 1982 with a textile diploma. Now autonomous, offering diploma, B.Tech, M.Tech, MBA and PhD programmes. Campus at Rajwada.",
                 "1981 मध्ये स्थानिक सहकारी संस्थांनी स्थापन केलेली, दत्ताजीराव कदम यांच्या नावाची संस्था; 1982 मध्ये वस्त्र पदविकेने सुरुवात. आता स्वायत्त; पदविका, बी.टेक, एम.टेक, एमबीए व पीएच.डी. अभ्यासक्रम. परिसर राजवाडा येथे.",
                 "1981 में स्थानीय सहकारी संस्थाओं द्वारा गठित, दत्ताजीराव कदम के नाम पर सोसाइटी; संस्थान 1982 में वस्त्र डिप्लोमा से शुरू हुआ। अब स्वायत्त; डिप्लोमा, बी.टेक, एम.टेक, एमबीए और पीएचडी कार्यक्रम। परिसर राजवाड़ा में।"),
       "source": "Careers360; Wikimedia Meta", "sourceUrl": CAREERS},
      {"title": L("DKTE schools and colleges", "डीकेटीईच्या शाळा व महाविद्यालये", "डीकेटीई के स्कूल और कॉलेज"),
       "body": L("The society also runs schools, a junior college, commerce and management colleges and a CBSE school.", "संस्था शाळा, कनिष्ठ महाविद्यालय, वाणिज्य व व्यवस्थापन महाविद्यालये आणि सीबीएसई शाळाही चालवते.", "सोसाइटी स्कूल, जूनियर कॉलेज, वाणिज्य और प्रबंधन कॉलेज तथा एक सीबीएसई स्कूल भी चलाती है।"),
       "source": "Wikimedia Meta", "sourceUrl": DKTE_META},
      {"title": L("Sharad Institute of Technology, Yadrav", "शरद इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, यड्राव", "शरद इंस्टीट्यूट ऑफ टेक्नोलॉजी, यड्राव"),
       "body": L("Engineering college in neighbouring Yadrav.", "शेजारील यड्राव येथील अभियांत्रिकी महाविद्यालय.", "पड़ोसी यड्राव में इंजीनियरिंग कॉलेज।"),
       "source": "Careers360", "sourceUrl": SIT},
    ]},
    {"type": "list", "id": "schools", "title": L("Schools noted in sources", "स्रोतांत नोंदलेल्या शाळा", "स्रोतों में दर्ज स्कूल"),
     "items": [L("Shahapur High School", "शहापूर हायस्कूल", "शहापुर हाई स्कूल"), L("Vinayak High School", "विनायक हायस्कूल", "विनायक हाई स्कूल"), L("Municipal primary schools", "महापालिकेच्या प्राथमिक शाळा", "महानगरपालिका प्राथमिक विद्यालय")],
     "lead": L("Source: Wikipedia. This is not a complete list.", "स्रोत: विकिपीडिया. ही संपूर्ण यादी नाही.", "स्रोत: विकिपीडिया। यह पूरी सूची नहीं है।")},
    {"type": "indicators", "id": "literacy", "title": L("Literacy", "साक्षरता", "साक्षरता"), "ids": [{"id": "literacy_rate"}]},
    {"type": "awaited", "id": "awaited", "title": L("Being compiled", "संकलन सुरू", "संकलन जारी"),
     "lead": L("From UDISE+ and Shivaji University affiliation lists.", "UDISE+ व शिवाजी विद्यापीठ संलग्नता यादीतून.", "UDISE+ और शिवाजी विश्वविद्यालय संबद्धता सूचियों से।"),
     "items": [L("Schools by medium (Marathi, English, Urdu, Kannada)", "माध्यमनिहाय शाळा (मराठी, इंग्रजी, उर्दू, कन्नड)", "माध्यमवार स्कूल (मराठी, अंग्रेज़ी, उर्दू, कन्नड़)"), L("Arts, science and commerce colleges", "कला, विज्ञान व वाणिज्य महाविद्यालये", "कला, विज्ञान और वाणिज्य कॉलेज"), L("Law college", "विधी महाविद्यालय", "विधि महाविद्यालय"), L("ITIs and polytechnics", "आयटीआय व तंत्रनिकेतने", "आईटीआई और पॉलिटेक्निक"), L("Public libraries", "सार्वजनिक ग्रंथालये", "सार्वजनिक पुस्तकालय")]},
    {"type": "links", "id": "official", "title": L("Official education portals", "अधिकृत शिक्षण पोर्टल", "आधिकारिक शिक्षा पोर्टल"), "items": [
      {"title": L("UDISE+ school directory", "UDISE+ शाळा निर्देशिका", "UDISE+ स्कूल निर्देशिका"), "href": "https://udiseplus.gov.in", "body": L("National school data.", "राष्ट्रीय शाळा माहिती.", "राष्ट्रीय स्कूल आँकड़े।")},
      {"title": L("Shivaji University, Kolhapur", "शिवाजी विद्यापीठ, कोल्हापूर", "शिवाजी विश्वविद्यालय, कोल्हापुर"), "href": "https://www.unishivaji.ac.in", "body": L("Affiliating university for the district.", "जिल्ह्याचे संलग्नता विद्यापीठ.", "ज़िले का संबद्धता विश्वविद्यालय।")},
    ]},
  ])

# ------------------------------------------------------------------ HEALTH
page("health",
  L("Hospital and clinic details for Ichalkaranji could not yet be verified, so this page lists only emergency numbers and official health portals for now.",
    "इचलकरंजीतील रुग्णालये व दवाखान्यांची माहिती अद्याप पडताळता आली नाही; त्यामुळे सध्या या पानावर केवळ आपत्कालीन क्रमांक व अधिकृत आरोग्य पोर्टल दिले आहेत.",
    "इचलकरंजी के अस्पतालों और क्लीनिकों की जानकारी अभी सत्यापित नहीं हो सकी, इसलिए फ़िलहाल इस पृष्ठ पर केवल आपातकालीन नंबर और आधिकारिक स्वास्थ्य पोर्टल हैं।"),
  [
    {"type": "emergency", "id": "numbers", "title": L("In an emergency", "आपत्कालीन स्थितीत", "आपात स्थिति में"), "lead": L("Call 108 for an ambulance or 112 for any emergency. Calls are free.", "रुग्णवाहिकेसाठी 108 किंवा कोणत्याही आपत्कालीन स्थितीसाठी 112 वर कॉल करा. कॉल मोफत आहेत.", "एम्बुलेंस के लिए 108 या किसी भी आपात स्थिति के लिए 112 पर कॉल करें। कॉल निःशुल्क हैं।")},
    {"type": "awaited", "id": "facilities", "title": L("Facilities being verified", "पडताळणीतील सुविधा", "सत्यापनाधीन सुविधाएँ"),
     "lead": L("From the corporation and the Kolhapur district health office.", "महापालिका व कोल्हापूर जिल्हा आरोग्य कार्यालयाकडून.", "महानगरपालिका और कोल्हापुर ज़िला स्वास्थ्य कार्यालय से।"),
     "items": [L("Indira Gandhi Memorial (IGM) hospital: ownership, departments and beds", "इंदिरा गांधी स्मृती (IGM) रुग्णालय: मालकी, विभाग व खाटा", "इंदिरा गांधी स्मृति (IGM) अस्पताल: स्वामित्व, विभाग और बिस्तर"), L("Municipal hospitals and urban health posts", "महापालिका रुग्णालये व नागरी आरोग्य केंद्रे", "नगर निगम अस्पताल और शहरी स्वास्थ्य केंद्र"), L("Private hospitals and blood banks", "खासगी रुग्णालये व रक्तपेढ्या", "निजी अस्पताल और ब्लड बैंक"), L("24-hour pharmacies", "24 तास औषधालये", "24 घंटे दवा दुकानें"), L("Vaccination centres", "लसीकरण केंद्रे", "टीकाकरण केंद्र")]},
    {"type": "links", "id": "official", "title": L("Official health services", "अधिकृत आरोग्य सेवा", "आधिकारिक स्वास्थ्य सेवाएँ"), "items": [
      {"title": L("Public Health Department, Maharashtra", "सार्वजनिक आरोग्य विभाग, महाराष्ट्र", "सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र"), "href": "https://arogya.maharashtra.gov.in", "body": L("State health schemes and facilities.", "राज्य आरोग्य योजना व सुविधा.", "राज्य स्वास्थ्य योजनाएँ और सुविधाएँ।")},
      {"title": L("Ayushman Bharat (PM-JAY)", "आयुष्मान भारत (PM-JAY)", "आयुष्मान भारत (PM-JAY)"), "href": "https://pmjay.gov.in", "body": L("Check eligibility and empanelled hospitals.", "पात्रता व संलग्न रुग्णालये तपासा.", "पात्रता और सूचीबद्ध अस्पताल देखें।")},
      {"title": L("CoWIN / U-WIN vaccination", "CoWIN / U-WIN लसीकरण", "CoWIN / U-WIN टीकाकरण"), "href": "https://uwin.mohfw.gov.in", "body": L("Vaccination records and centres.", "लसीकरण नोंदी व केंद्रे.", "टीकाकरण रिकॉर्ड और केंद्र।")},
    ]},
    {"type": "callout", "id": "note", "tone": "info", "body": L("This portal does not give medical advice. For health concerns, speak to a qualified doctor.", "हे पोर्टल वैद्यकीय सल्ला देत नाही. आरोग्याच्या प्रश्नांसाठी पात्र डॉक्टरांचा सल्ला घ्या.", "यह पोर्टल चिकित्सा सलाह नहीं देता। स्वास्थ्य संबंधी चिंता के लिए योग्य डॉक्टर से बात करें।")},
  ])

# ------------------------------------------------------------------ CIVIC SERVICES
page("civic-services",
  L("Pay taxes, apply for certificates and file complaints on the official government portals linked below. This independent portal never takes payments or personal details.",
    "कर भरणे, दाखल्यांसाठी अर्ज आणि तक्रारी खाली दिलेल्या अधिकृत शासकीय पोर्टलवर करा. हे स्वतंत्र पोर्टल कधीही पैसे किंवा वैयक्तिक माहिती घेत नाही.",
    "कर भुगतान, प्रमाणपत्र आवेदन और शिकायतें नीचे दिए आधिकारिक सरकारी पोर्टलों पर करें। यह स्वतंत्र पोर्टल कभी भुगतान या व्यक्तिगत जानकारी नहीं लेता।"),
  [
    {"type": "callout", "id": "independent", "tone": "warning", "body": L("Pay only on official government websites. Check the address bar before entering any details; this portal will never ask for payments, passwords or ID numbers.", "पैसे केवल अधिकृत शासकीय संकेतस्थळांवरच भरा. कोणतीही माहिती भरण्यापूर्वी पत्ता तपासा; हे पोर्टल कधीही पैसे, पासवर्ड किंवा ओळख क्रमांक मागणार नाही.", "भुगतान केवल आधिकारिक सरकारी वेबसाइटों पर करें। कोई जानकारी भरने से पहले पता जाँचें; यह पोर्टल कभी भुगतान, पासवर्ड या पहचान संख्या नहीं माँगेगा।")},
    {"type": "quicklinks", "id": "portals", "title": L("Official portals", "अधिकृत पोर्टल", "आधिकारिक पोर्टल")},
    {"type": "table", "id": "where", "title": L("Where to go for common tasks", "नेहमीच्या कामांसाठी कुठे जावे", "आम कामों के लिए कहाँ जाएँ"),
     "columns": [L("Task", "काम", "काम"), L("Where", "कुठे", "कहाँ")],
     "rows": [
       [L("Property tax, water bills, trade licence, birth and death certificates", "मालमत्ता कर, पाणीपट्टी, व्यापार परवाना, जन्म-मृत्यू दाखले", "संपत्ति कर, पानी बिल, व्यापार लाइसेंस, जन्म-मृत्यु प्रमाणपत्र"), L("Ichalkaranji Municipal Corporation website or ward office", "इचलकरंजी महानगरपालिका संकेतस्थळ किंवा प्रभाग कार्यालय", "इचलकरंजी महानगरपालिका वेबसाइट या वार्ड कार्यालय")],
       [L("Income, caste, domicile and other state certificates", "उत्पन्न, जात, अधिवास व इतर शासकीय दाखले", "आय, जाति, अधिवास और अन्य राज्य प्रमाणपत्र"), L("Aaple Sarkar portal or a Seva Kendra", "आपले सरकार पोर्टल किंवा सेवा केंद्र", "आपले सरकार पोर्टल या सेवा केंद्र")],
       [L("Electricity bills and new connections", "वीज देयके व नवीन जोडणी", "बिजली बिल और नया कनेक्शन"), L("MSEDCL (Mahavitaran)", "महावितरण (MSEDCL)", "महावितरण (MSEDCL)")],
       [L("Complaints about state departments", "राज्य विभागांविषयी तक्रारी", "राज्य विभागों से जुड़ी शिकायतें"), L("Maharashtra grievance portal", "महाराष्ट्र तक्रार निवारण पोर्टल", "महाराष्ट्र शिकायत पोर्टल")],
       [L("Right to Information requests", "माहिती अधिकार अर्ज", "सूचना का अधिकार आवेदन"), L("RTI Online, Maharashtra", "माहिती अधिकार ऑनलाइन, महाराष्ट्र", "आरटीआई ऑनलाइन, महाराष्ट्र")],
       [L("Government tenders", "शासकीय निविदा", "सरकारी निविदाएँ"), L("Maharashtra e-Tendering", "महाराष्ट्र ई-निविदा", "महाराष्ट्र ई-निविदा")],
       [L("MSME (Udyam) registration for loom owners and units", "यंत्रमागधारक व उद्योगांसाठी उद्यम नोंदणी", "करघा मालिकों और इकाइयों के लिए उद्यम पंजीकरण"), L("Udyam Registration portal", "उद्यम नोंदणी पोर्टल", "उद्यम पंजीकरण पोर्टल")],
     ]},
    {"type": "facts", "id": "utilities", "title": L("Utilities", "उपयुक्त सेवा", "उपयोगी सेवाएँ"), "rows": [
      fact(L("Electricity", "वीज", "बिजली"), L("Maharashtra State Electricity Distribution Co. (MSEDCL)", "महाराष्ट्र राज्य वीज वितरण कंपनी (महावितरण)", "महाराष्ट्र राज्य विद्युत वितरण कंपनी (महावितरण)"), "official", "MSEDCL", "https://www.mahadiscom.in"),
      fact(L("Water supply", "पाणीपुरवठा", "जलापूर्ति"), L("Corporation schemes drawing on the Krishna (45 MLD) and Panchganga (18 MLD)", "कृष्णा (45 दशलक्ष लिटर/दिवस) व पंचगंगा (18 दशलक्ष लिटर/दिवस) नदीवरील महापालिका योजना", "कृष्णा (45 एमएलडी) और पंचगंगा (18 एमएलडी) पर महानगरपालिका योजनाएँ"), "official", "MPCB affidavit to NGT, 2023", NGT_AFF),
      fact(L("Sewage treatment", "सांडपाणी प्रक्रिया", "सीवेज उपचार"), L("20 MLD treatment capacity listed", "20 दशलक्ष लिटर/दिवस प्रक्रिया क्षमता नोंदलेली", "20 एमएलडी उपचार क्षमता दर्ज"), "official", "MPCB action plan 2025", MPCB25),
      fact(L("Waste collection schedule", "कचरा संकलन वेळापत्रक", "कचरा संग्रह समय-सारिणी"), AWAITED, "awaited", "Ichalkaranji Municipal Corporation"),
    ]},
  ])

# ------------------------------------------------------------------ EMERGENCY
page("emergency",
  L("For any emergency in India, call 112. National helplines below work from any phone, free of charge.",
    "भारतात कोणत्याही आपत्कालीन स्थितीसाठी 112 वर कॉल करा. खालील राष्ट्रीय हेल्पलाइन कोणत्याही फोनवरून मोफत वापरता येतात.",
    "भारत में किसी भी आपात स्थिति के लिए 112 पर कॉल करें। नीचे दी गई राष्ट्रीय हेल्पलाइन किसी भी फ़ोन से निःशुल्क काम करती हैं।"),
  [
    {"type": "emergency", "id": "numbers", "title": L("Emergency numbers", "आपत्कालीन क्रमांक", "आपातकालीन नंबर"), "lead": L("Tap a number to call.", "कॉल करण्यासाठी क्रमांकावर टॅप करा.", "कॉल करने के लिए नंबर पर टैप करें।")},
    {"type": "table", "id": "more", "title": L("More helplines", "इतर हेल्पलाइन", "अन्य हेल्पलाइन"),
     "columns": [L("Service", "सेवा", "सेवा"), L("Number", "क्रमांक", "नंबर")],
     "rows": [
       [L("Women's helpline (police)", "महिला हेल्पलाइन (पोलीस)", "महिला हेल्पलाइन (पुलिस)"), L("1091", "1091", "1091")],
       [L("Disaster management (district control room)", "आपत्ती व्यवस्थापन (जिल्हा नियंत्रण कक्ष)", "आपदा प्रबंधन (ज़िला नियंत्रण कक्ष)"), L("1077", "1077", "1077")],
       [L("Senior citizens' helpline", "ज्येष्ठ नागरिक हेल्पलाइन", "वरिष्ठ नागरिक हेल्पलाइन"), L("14567", "14567", "14567")],
       [L("Cyber crime", "सायबर गुन्हे", "साइबर अपराध"), L("1930", "1930", "1930")],
       [L("Medical advice (Government of Maharashtra)", "वैद्यकीय सल्ला (महाराष्ट्र शासन)", "चिकित्सा सलाह (महाराष्ट्र सरकार)"), L("104", "104", "104")],
       [L("Railway accidents", "रेल्वे अपघात", "रेल दुर्घटना"), L("1072", "1072", "1072")],
     ],
     "cite": {"source": "Washim district administration (Govt. of Maharashtra) helpline list; india.gov.in helpline directory", "sourceUrl": "https://washim.gov.in/?p=30101"}},
    {"type": "awaited", "id": "local", "title": L("Local numbers being verified", "पडताळणीतील स्थानिक क्रमांक", "सत्यापनाधीन स्थानीय नंबर"),
     "lead": L("Until verified, use 112 or the corporation's official website.", "पडताळणी होईपर्यंत 112 किंवा महापालिकेचे अधिकृत संकेतस्थळ वापरा.", "सत्यापन तक 112 या महानगरपालिका की आधिकारिक वेबसाइट का उपयोग करें।"),
     "items": [L("Police stations in the city", "शहरातील पोलीस ठाणी", "शहर के पुलिस थाने"), L("Corporation fire station", "महापालिका अग्निशमन केंद्र", "महानगरपालिका अग्निशमन केंद्र"), L("Flood control room", "पूर नियंत्रण कक्ष", "बाढ़ नियंत्रण कक्ष"), L("Hospitals with 24-hour casualty", "24 तास अपघात विभाग असलेली रुग्णालये", "24 घंटे आपातकालीन विभाग वाले अस्पताल")]},
    {"type": "callout", "id": "flood", "tone": "warning", "body": L("During monsoon floods on the Panchganga, follow instructions from the district administration and avoid river ghats and low-lying roads.", "पंचगंगेच्या पावसाळी पुराच्या वेळी जिल्हा प्रशासनाच्या सूचनांचे पालन करा आणि नदीघाट व सखल रस्ते टाळा.", "पंचगंगा में मानसूनी बाढ़ के दौरान ज़िला प्रशासन के निर्देशों का पालन करें और नदी घाटों व निचली सड़कों से बचें।")},
  ])
