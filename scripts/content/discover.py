"""About, demographics, geography, climate, culture, festivals."""
from _lib import *

# ------------------------------------------------------------------ ABOUT
page("about",
  L("Ichalkaranji is a textile city of about 2.9 lakh people (Census 2011) on the Panchganga river in Hatkanangale taluka, Kolhapur district, governed since 2022 by a municipal corporation.",
    "इचलकरंजी हे कोल्हापूर जिल्ह्यातील हातकणंगले तालुक्यात, पंचगंगेच्या काठावरील सुमारे 2.9 लाख लोकसंख्येचे (जनगणना 2011) वस्त्रनगर आहे; 2022 पासून येथे महानगरपालिका आहे.",
    "इचलकरंजी कोल्हापुर जिले के हातकणंगले तालुका में पंचगंगा नदी पर बसा लगभग 2.9 लाख आबादी (जनगणना 2011) का वस्त्र नगर है, जहाँ 2022 से महानगरपालिका है।"),
  [
    {"type": "facts", "id": "profile", "title": L("City profile", "शहराची ओळख", "शहर परिचय"), "rows": [
      fact(L("Name", "नाव", "नाम"), L("Ichalkaranji · इचलकरंजी", "इचलकरंजी (Ichalkaranji)", "इचलकरंजी (Ichalkaranji)"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Nicknames", "टोपणनावे", "उपनाम"), L("Manchester of Maharashtra; The Textile Hub", "महाराष्ट्राचे मँचेस्टर; वस्त्रनगरी", "महाराष्ट्र का मैनचेस्टर; वस्त्र नगरी"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Location", "स्थान", "स्थान"), L("Hatkanangale taluka, Kolhapur district, Maharashtra, India", "हातकणंगले तालुका, कोल्हापूर जिल्हा, महाराष्ट्र, भारत", "हातकणंगले तालुका, कोल्हापुर जिला, महाराष्ट्र, भारत"), "official", "Election Commission delimitation (via Wikipedia)", "https://en.wikipedia.org/wiki/Ichalkaranji_Assembly_constituency"),
      fact(L("Coordinates", "निर्देशांक", "निर्देशांक"), L("16°42′N 74°28′E (16.70, 74.47)", "16°42′ उ. 74°28′ पू. (16.70, 74.47)", "16°42′ उ. 74°28′ पू. (16.70, 74.47)"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Elevation", "उंची", "ऊँचाई"), L("About 538 m above sea level", "समुद्रसपाटीपासून सुमारे 538 मी", "समुद्र तल से लगभग 538 मीटर"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Area", "क्षेत्रफळ", "क्षेत्रफल"), L("29.84 sq km (municipal limits before the 2022 upgrade; current limits awaited)", "29.84 चौ. किमी (2022 पूर्वीची हद्द; सध्याची हद्द प्रतीक्षेत)", "29.84 वर्ग किमी (2022 से पहले की सीमा; वर्तमान सीमा प्रतीक्षित)"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("River", "नदी", "नदी"), L("Panchganga, a tributary of the Krishna; the city lies about half a mile north of it", "पंचगंगा, कृष्णेची उपनदी; शहर तिच्या उत्तरेस सुमारे अर्धा मैल", "पंचगंगा, कृष्णा की सहायक नदी; शहर इससे लगभग आधा मील उत्तर में"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Civic body", "नागरी संस्था", "नगरीय निकाय"), L("Ichalkaranji Municipal Corporation, 65 seats (since 2022; council from 1904)", "इचलकरंजी महानगरपालिका, 65 जागा (2022 पासून; नगरपरिषद 1904 पासून)", "इचलकरंजी महानगरपालिका, 65 सीटें (2022 से; नगर परिषद 1904 से)"), "official", "UNI; Wikipedia: Ichalkaranji Municipal Corporation", UNI),
      fact(L("PIN code", "पिन कोड", "पिन कोड"), L("416115 (Main Road / Rajwada); other PIN codes awaited", "416115 (मेन रोड / राजवाडा); इतर पिन कोड प्रतीक्षेत", "416115 (मेन रोड / राजवाड़ा); अन्य पिन कोड प्रतीक्षित"), "secondary", "Ichalkaranji Janata Sahakari Bank", "https://kaijs.bank.in/history"),
    ]},
    {"type": "table", "id": "distances", "title": L("Distances", "अंतरे", "दूरियाँ"),
     "lead": L("Approximate road distances from route planners. Others are awaited rather than estimated.", "मार्ग नियोजकांवरील अंदाजे रस्ता अंतरे. उर्वरित अंतरे अंदाजाने न देता प्रतीक्षेत ठेवली आहेत.", "रूट प्लानर से अनुमानित सड़क दूरी। बाकी दूरियाँ अनुमान के बजाय प्रतीक्षित हैं।"),
     "columns": [L("To", "कुठे", "कहाँ"), L("Distance", "अंतर", "दूरी"), L("Note", "टीप", "टिप्पणी")],
     "rows": [
       [L("Hatkanangale railway station", "हातकणंगले रेल्वे स्थानक", "हातकणंगले रेलवे स्टेशन"), L("6–8 km", "6–8 किमी", "6–8 किमी"), L("Nearest station", "सर्वांत जवळचे स्थानक", "सबसे निकट स्टेशन")],
       [L("Kolhapur", "कोल्हापूर", "कोल्हापुर"), L("About 28 km", "सुमारे 28 किमी", "लगभग 28 किमी"), L("District headquarters", "जिल्हा मुख्यालय", "जिला मुख्यालय")],
       [L("Kolhapur Airport", "कोल्हापूर विमानतळ", "कोल्हापुर हवाई अड्डा"), L("About 30 km", "सुमारे 30 किमी", "लगभग 30 किमी"), L("Nearest airport", "सर्वांत जवळचा विमानतळ", "सबसे निकट हवाई अड्डा")],
       [L("Belagavi", "बेळगावी", "बेलगावी"), L("About 119 km", "सुमारे 119 किमी", "लगभग 119 किमी"), L("—", "—", "—")],
       [L("Pune", "पुणे", "पुणे"), L("About 237 km", "सुमारे 237 किमी", "लगभग 237 किमी"), L("About 3 h 20 min by car", "मोटारीने सुमारे 3 तास 20 मिनिटे", "कार से लगभग 3 घंटे 20 मिनट")],
       [L("Bengaluru", "बंगळुरू", "बेंगलुरु"), L("About 611 km", "सुमारे 611 किमी", "लगभग 611 किमी"), L("—", "—", "—")],
       [L("Sangli, Miraj, Mumbai, Goa", "सांगली, मिरज, मुंबई, गोवा", "सांगली, मिरज, मुंबई, गोवा"), L("Awaited", "प्रतीक्षेत", "प्रतीक्षित"), L("—", "—", "—")],
     ],
     "cite": {"source": "Cleartrip route planner; Wikipedia: Ichalkaranji", "sourceUrl": CLEARTRIP}},
    {"type": "cards", "id": "neighbours", "title": L("Neighbouring settlements", "शेजारील गावे", "पड़ोसी बस्तियाँ"), "items": [
      {"title": L("Korochi", "कोरोची", "कोरोची"), "body": L("Census town 1–2 km from the city border, tied to the powerloom economy.", "शहर हद्दीपासून 1–2 किमीवरील जनगणना शहर; यंत्रमाग अर्थव्यवस्थेशी निगडित.", "शहर सीमा से 1–2 किमी पर जनगणना नगर, पावरलूम अर्थव्यवस्था से जुड़ा।"), "source": "Wikipedia: Korochi", "sourceUrl": "https://en.wikipedia.org/wiki/Korochi"},
      {"title": L("Shahapur", "शहापूर", "शहापुर"), "body": L("Northern neighbourhood, merged into the municipal area in 1982.", "उत्तरेकडील भाग, 1982 मध्ये नगरपरिषद हद्दीत समाविष्ट.", "उत्तरी इलाका, 1982 में नगर परिषद क्षेत्र में शामिल।"), "source": "Wikipedia: Shahapur, Ichalkaranji", "sourceUrl": "https://en.wikipedia.org/wiki/Shahapur,_Ichalkaranji"},
      {"title": L("Kabnur and Yadrav", "कबनूर व यड्राव", "कबनूर और यड्राव"), "body": L("Adjoining gram panchayat areas that function as part of the wider city.", "शहराचा भाग म्हणून कार्य करणारे लगतचे ग्रामपंचायत क्षेत्र.", "सटे हुए ग्राम पंचायत क्षेत्र, जो बड़े शहर का हिस्सा जैसे काम करते हैं।"), "source": "Wikipedia: Ichalkaranji", "sourceUrl": WIKI},
    ]},
  ])

# ------------------------------------------------------------------ DEMOGRAPHICS
page("demographics",
  L("Census 2011 counted 287,570 people in the city and 325,709 in the urban agglomeration. Detailed tables are being pulled from the Census before they are published here.",
    "2011 च्या जनगणनेत शहराची लोकसंख्या 2,87,570 आणि नागरी समूहाची 3,25,709 नोंदली गेली. सविस्तर तक्ते जनगणनेतून घेऊन नंतर येथे प्रसिद्ध केले जातील.",
    "जनगणना 2011 में शहर की आबादी 2,87,570 और नगरीय समूह की 3,25,709 दर्ज हुई। विस्तृत तालिकाएँ जनगणना से लेकर बाद में यहाँ प्रकाशित की जाएँगी।"),
  [
    {"type": "indicators", "id": "headline", "title": L("Headline figures", "मुख्य आकडे", "मुख्य आँकड़े"),
     "ids": [{"id": "population_total", "year": 2011}, {"id": "population_ua"}, {"id": "density"}, {"id": "sex_ratio"}, {"id": "literacy_rate"}, {"id": "area"}]},
    {"type": "chart", "id": "trend", "indicatorId": "population_total", "title": L("Population over time", "कालानुसार लोकसंख्या", "समय के साथ जनसंख्या"), "subtitle": L("City, persons", "शहर, व्यक्ती", "शहर, व्यक्ति"),
     "body": L("The 2025 bar is a planning figure used by the state pollution board, not a census count. The 2001 value is awaited because secondary sources disagree.", "2025 चा स्तंभ राज्य प्रदूषण नियंत्रण मंडळाने वापरलेला नियोजन आकडा आहे, जनगणना नव्हे. 2001 चा आकडा दुय्यम स्रोतांत मतभेद असल्याने प्रतीक्षेत आहे.", "2025 का स्तंभ राज्य प्रदूषण बोर्ड द्वारा प्रयुक्त योजना आँकड़ा है, जनगणना नहीं। 2001 का मान द्वितीयक स्रोतों में मतभेद के कारण प्रतीक्षित है।")},
    {"type": "prose", "id": "community", "title": L("Communities and data limits", "समाज आणि आकडेवारीच्या मर्यादा", "समुदाय और आँकड़ों की सीमाएँ"), "paragraphs": [
      L("The Census publishes counts for Scheduled Castes and Scheduled Tribes, religion and mother tongue, but not city-level counts for individual castes. This portal shows only published aggregates and does not estimate community sizes.",
        "जनगणना अनुसूचित जाती व जमाती, धर्म आणि मातृभाषा यांचे आकडे प्रसिद्ध करते, पण स्वतंत्र जातींचे शहरस्तरीय आकडे देत नाही. हे पोर्टल केवळ प्रसिद्ध झालेले एकत्रित आकडे दाखवते आणि समाजांच्या संख्येचा अंदाज बांधत नाही.",
        "जनगणना अनुसूचित जाति व जनजाति, धर्म और मातृभाषा के आँकड़े प्रकाशित करती है, पर अलग-अलग जातियों के शहर-स्तरीय आँकड़े नहीं। यह पोर्टल केवल प्रकाशित समग्र आँकड़े दिखाता है और समुदायों के आकार का अनुमान नहीं लगाता।"),
      L("Marathi is the main language; Kannada is also heard given the nearby state border, and Hindi is widely used. Tribal and nomadic communities will be described using the official Scheduled Tribe and VJNT/NT classifications for Kolhapur district.",
        "मराठी ही मुख्य भाषा; जवळच्या राज्य सीमेमुळे कन्नडही बोलली जाते आणि हिंदीचा वापर व्यापक आहे. आदिवासी व भटक्या समाजांची माहिती कोल्हापूर जिल्ह्यासाठीच्या अधिकृत अनुसूचित जमाती व वि.जा./भ.ज. वर्गीकरणानुसार दिली जाईल.",
        "मराठी मुख्य भाषा है; पास की राज्य सीमा के कारण कन्नड़ भी बोली जाती है और हिंदी का व्यापक उपयोग है। आदिवासी और घुमंतू समुदायों का विवरण कोल्हापुर जिले के आधिकारिक अनुसूचित जनजाति और वि.जा./घु.ज. वर्गीकरण के अनुसार दिया जाएगा।"),
    ]},
    {"type": "awaited", "id": "awaited", "title": L("Census tables still to be added", "अद्याप जोडायचे जनगणना तक्ते", "अभी जोड़ी जाने वाली जनगणना तालिकाएँ"),
     "lead": L("From the 2011 Primary Census Abstract and C-series tables for Ichalkaranji.", "इचलकरंजीसाठीच्या 2011 प्राथमिक जनगणना सारांश व C-मालिका तक्त्यांतून.", "इचलकरंजी के लिए 2011 प्राथमिक जनगणना सार और C-श्रृंखला तालिकाओं से।"),
     "items": [L("Male and female literacy", "पुरुष व स्त्री साक्षरता", "पुरुष व महिला साक्षरता"), L("Child sex ratio", "बाल लिंग गुणोत्तर", "बाल लिंगानुपात"), L("Households and household size", "कुटुंबे व कुटुंबाचा आकार", "परिवार और परिवार का आकार"), L("SC and ST population", "अनुसूचित जाती व जमाती लोकसंख्या", "अनुसूचित जाति व जनजाति जनसंख्या"), L("Religion", "धर्म", "धर्म"), L("Mother tongue", "मातृभाषा", "मातृभाषा"), L("Age pyramid", "वयोगट रचना", "आयु पिरामिड"), L("Workers by sector", "क्षेत्रनिहाय कामगार", "क्षेत्रवार श्रमिक"), L("Housing, water, sanitation and electricity", "घरे, पाणी, स्वच्छता व वीज", "आवास, पानी, स्वच्छता और बिजली")]},
  ])

# ------------------------------------------------------------------ GEOGRAPHY
page("geography",
  L("Ichalkaranji is inland on the Deccan Plateau, east of the Western Ghats. Its main environmental issue is sewage and textile effluent reaching the Panchganga river.",
    "इचलकरंजी पश्चिम घाटाच्या पूर्वेस, दख्खनच्या पठारावरील अंतर्गत भागात आहे. सांडपाणी व वस्त्रोद्योगाचे दूषित पाणी पंचगंगेत मिसळणे हा येथील मुख्य पर्यावरणीय प्रश्न आहे.",
    "इचलकरंजी पश्चिमी घाट के पूर्व में दक्कन पठार के भीतरी भाग में है। सीवेज और वस्त्र उद्योग का दूषित जल पंचगंगा नदी में पहुँचना यहाँ का मुख्य पर्यावरणीय मुद्दा है।"),
  [
    {"type": "facts", "id": "land", "title": L("Land and river", "भूमी आणि नदी", "भूमि और नदी"), "rows": [
      fact(L("Terrain", "भूरचना", "भू-भाग"), L("Deccan Plateau, on the plateau side of the Western Ghats; no mountains within the city", "दख्खनचे पठार, पश्चिम घाटाच्या पठारी बाजूस; शहरात डोंगर नाहीत", "दक्कन पठार, पश्चिमी घाट की पठारी ओर; शहर में कोई पहाड़ नहीं"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Coast", "किनारा", "तट"), L("None — Ichalkaranji is inland. The nearest coast is in Sindhudurg district, across the Ghats (distance awaited).", "नाही — इचलकरंजी अंतर्गत भागात आहे. सर्वांत जवळचा किनारा घाटापलीकडील सिंधुदुर्ग जिल्ह्यात (अंतर प्रतीक्षेत).", "कोई नहीं — इचलकरंजी भीतरी भाग में है। निकटतम तट घाट के पार सिंधुदुर्ग जिले में है (दूरी प्रतीक्षित)।"), "secondary", "Wikipedia: Ichalkaranji", WIKI),
      fact(L("Panchganga river", "पंचगंगा नदी", "पंचगंगा नदी"), L("Tributary of the Krishna; rises at Prayag Sangam in the Sahyadris and runs about 80 km", "कृष्णेची उपनदी; सह्याद्रीतील प्रयाग संगम येथे उगम, सुमारे 80 किमी लांबी", "कृष्णा की सहायक नदी; सह्याद्रि के प्रयाग संगम से निकलकर लगभग 80 किमी बहती है"), "secondary", "Drishti IAS", DRISHTI),
      fact(L("Polluted stretch", "प्रदूषित पट्टा", "प्रदूषित हिस्सा"), L("Shirol–Kolhapur, 67 km, 21 major drains; Priority V (2019), Priority IV per a 2024 study", "शिरोळ–कोल्हापूर, 67 किमी, 21 प्रमुख नाले; प्राधान्य V (2019), 2024 च्या अभ्यासानुसार प्राधान्य IV", "शिरोल–कोल्हापुर, 67 किमी, 21 प्रमुख नाले; प्राथमिकता V (2019), 2024 के अध्ययन अनुसार प्राथमिकता IV"), "official", "MPCB action plans 2019 and 2025", MPCB25),
      fact(L("Sewage treatment", "सांडपाणी प्रक्रिया", "सीवेज उपचार"), L("STP capacity listed at 20 MLD; a draft MPCB plan reported about 45 million litres a day reaching the river untreated", "प्रक्रिया केंद्र क्षमता 20 दशलक्ष लिटर/दिवस; सुमारे 45 दशलक्ष लिटर सांडपाणी प्रक्रियेशिवाय नदीत जात असल्याचे मंडळाच्या मसुद्यात नमूद", "उपचार संयंत्र क्षमता 20 एमएलडी; बोर्ड के मसौदे के अनुसार लगभग 45 मिलियन लीटर प्रतिदिन बिना उपचार नदी में"), "official", "MPCB action plan 2025", MPCB25),
    ]},
    {"type": "prose", "id": "river", "title": L("The Panchganga under watch", "पंचगंगेवर देखरेख", "पंचगंगा पर निगरानी"), "paragraphs": [
      L("River pollution is the subject of National Green Tribunal proceedings. On 16 June 2025 the state Urban Development department reviewed sewage generation and treatment in Ichalkaranji, Kolhapur and nearby towns. In 2025 the state also set up a panel to investigate the causes of pollution and fish deaths.",
        "नदी प्रदूषणाचे प्रकरण राष्ट्रीय हरित लवादासमोर आहे. 16 जून 2025 रोजी नगरविकास विभागाने इचलकरंजी, कोल्हापूर व परिसरातील शहरांमधील सांडपाणी निर्मिती व प्रक्रियेचा आढावा घेतला. प्रदूषण व माशांच्या मृत्यूची कारणे शोधण्यासाठी 2025 मध्ये राज्याने समितीही नेमली.",
        "नदी प्रदूषण का मामला राष्ट्रीय हरित अधिकरण में है। 16 जून 2025 को नगर विकास विभाग ने इचलकरंजी, कोल्हापुर और आसपास के शहरों में सीवेज उत्पादन व उपचार की समीक्षा की। 2025 में राज्य ने प्रदूषण और मछलियों की मौत के कारणों की जाँच के लिए समिति भी बनाई।"),
    ]},
    {"type": "awaited", "id": "awaited", "title": L("Still being verified", "अद्याप पडताळणी सुरू", "अभी सत्यापन जारी"),
     "items": [L("Soil type", "मातीचा प्रकार", "मिट्टी का प्रकार"), L("Forest and green cover", "वन व हरित आच्छादन", "वन और हरित आवरण"), L("Birds and wildlife records", "पक्षी व वन्यजीव नोंदी", "पक्षी व वन्यजीव अभिलेख"), L("Flood maps for 2019 and 2021", "2019 व 2021 चे पूर नकाशे", "2019 और 2021 के बाढ़ नक्शे"), L("Air-quality monitoring station data", "हवा गुणवत्ता केंद्राची आकडेवारी", "वायु गुणवत्ता केंद्र के आँकड़े"), L("Parks and lakes", "उद्याने व तलाव", "उद्यान और झीलें")]},
  ])

# ------------------------------------------------------------------ CLIMATE
page("climate",
  L("Ichalkaranji has a warm tropical climate with a June–September monsoon. No city weather station publishes normals, so long-term figures here come from the Kolhapur station.",
    "इचलकरंजीचे हवामान उष्ण कटिबंधीय असून जून–सप्टेंबर पावसाळा असतो. शहरासाठी सरासरी हवामान प्रसिद्ध करणारे केंद्र नसल्याने दीर्घकालीन आकडे कोल्हापूर केंद्राचे आहेत.",
    "इचलकरंजी की जलवायु गर्म उष्णकटिबंधीय है और जून–सितंबर में मानसून रहता है। शहर का कोई मौसम केंद्र औसत आँकड़े प्रकाशित नहीं करता, इसलिए दीर्घकालिक आँकड़े कोल्हापुर केंद्र के हैं।"),
  [
    {"type": "weather", "id": "forecast", "title": L("This week", "या आठवड्यात", "इस सप्ताह")},
    {"type": "facts", "id": "normals", "title": L("Climate at a glance (Kolhapur station)", "हवामान एका दृष्टिक्षेपात (कोल्हापूर केंद्र)", "जलवायु एक नज़र में (कोल्हापुर केंद्र)"), "rows": [
      fact(L("Annual rainfall (district normal)", "वार्षिक पाऊस (जिल्हा सरासरी)", "वार्षिक वर्षा (जिला सामान्य)"), L("1,019.5 mm", "1,019.5 मिमी", "1,019.5 मिमी"), "official", "ICAR-CRIDA district contingency plan", "https://www.icar-crida.res.in/CP/Maharastra/MPKVV,%20Rahuri/MH5-%20KOLHAPUR%2031.03.2011.pdf"),
      fact(L("Mean annual temperature", "सरासरी वार्षिक तापमान", "औसत वार्षिक तापमान"), L("24.8 °C (1970–2000 model normals)", "24.8 °से (1970–2000 प्रारूप सरासरी)", "24.8 °से (1970–2000 मॉडल सामान्य)"), "estimate", "WorldClim 2.1 via PopulationReview", "https://www.populationreview.org/climate/india/kolhapur"),
      fact(L("Hottest and coolest months", "सर्वांत उष्ण व थंड महिने", "सबसे गर्म और ठंडे महीने"), L("April and December", "एप्रिल व डिसेंबर", "अप्रैल और दिसंबर"), "estimate", "WorldClim 2.1 via PopulationReview", "https://www.populationreview.org/climate/india/kolhapur"),
      fact(L("Record high", "विक्रमी कमाल", "रिकॉर्ड अधिकतम"), L("About 40.6 °C (May 2016)", "सुमारे 40.6 °से (मे 2016)", "लगभग 40.6 °से (मई 2016)"), "secondary", "Climate-Zone (Kolhapur station records)", "https://www.climate-zone.com/climate/in/kolhapur/records/"),
      fact(L("Wettest day on record", "सर्वाधिक पावसाचा दिवस", "सबसे अधिक वर्षा का दिन"), L("About 181 mm on 24 July 2021", "24 जुलै 2021 रोजी सुमारे 181 मिमी", "24 जुलाई 2021 को लगभग 181 मिमी"), "secondary", "Climate-Zone (Kolhapur station records)", "https://www.climate-zone.com/climate/in/kolhapur/records/"),
    ]},
    {"type": "cards", "id": "seasons", "title": L("Seasons", "ऋतू", "ऋतुएँ"), "items": [
      {"title": L("Summer · March–May", "उन्हाळा · मार्च–मे", "गर्मी · मार्च–मई"), "body": L("Hot days, with April the warmest month.", "उष्ण दिवस; एप्रिल सर्वांत उष्ण.", "गर्म दिन; अप्रैल सबसे गर्म।")},
      {"title": L("Monsoon · June–September", "पावसाळा · जून–सप्टेंबर", "मानसून · जून–सितंबर"), "body": L("Most of the year's rain; the river can flood after heavy spells.", "वर्षातील बहुतेक पाऊस; जोरदार पावसानंतर नदीला पूर येऊ शकतो.", "साल की अधिकांश वर्षा; भारी बारिश के बाद नदी में बाढ़ आ सकती है।")},
      {"title": L("Post-monsoon and winter · October–February", "पावसाळ्यानंतर व हिवाळा · ऑक्टोबर–फेब्रुवारी", "मानसून के बाद व सर्दी · अक्टूबर–फरवरी"), "body": L("Mild and mostly dry; December to February is the most comfortable time to visit.", "सौम्य व बहुतांश कोरडे; डिसेंबर ते फेब्रुवारी भेटीसाठी सर्वांत सुखद.", "हल्का और ज़्यादातर सूखा; दिसंबर से फरवरी घूमने का सबसे अच्छा समय।")},
    ]},
    {"type": "links", "id": "official", "title": L("Official forecasts and warnings", "अधिकृत अंदाज व इशारे", "आधिकारिक पूर्वानुमान और चेतावनियाँ"), "items": [
      {"title": L("IMD: Kolhapur city weather", "भारतीय हवामान विभाग: कोल्हापूर", "भारत मौसम विज्ञान विभाग: कोल्हापुर"), "href": "https://city.imd.gov.in/citywx/city_weather_test_try.php?id=43157", "body": L("Daily observations and 7-day forecast.", "दैनंदिन निरीक्षणे व 7 दिवसांचा अंदाज.", "दैनिक अवलोकन और 7 दिन का पूर्वानुमान।")},
      {"title": L("IMD: national warnings", "भारतीय हवामान विभाग: राष्ट्रीय इशारे", "भारत मौसम विज्ञान विभाग: राष्ट्रीय चेतावनियाँ"), "href": "https://mausam.imd.gov.in", "body": L("Heat, rain and storm alerts.", "उष्णता, पाऊस व वादळाचे इशारे.", "गर्मी, वर्षा और तूफ़ान अलर्ट।")},
    ]},
    {"type": "awaited", "id": "awaited", "title": L("Being added", "जोडले जात आहे", "जोड़ा जा रहा है"),
     "items": [L("Monthly temperature, rainfall and humidity normals (IMD 1991–2020)", "मासिक तापमान, पाऊस व आर्द्रता सरासरी (IMD 1991–2020)", "मासिक तापमान, वर्षा और नमी सामान्य (IMD 1991–2020)"), L("Flood-prone zones", "पूरप्रवण क्षेत्रे", "बाढ़-प्रवण क्षेत्र"), L("Heat action plan", "उष्णता कृती आराखडा", "हीट एक्शन प्लान")]},
  ])

# ------------------------------------------------------------------ CULTURE
page("culture",
  L("Ichalkaranji's best-documented cultural legacy is Hindustani music: the Gwalior gharana reached Maharashtra through Balakrishnabuwa Ichalkaranjikar.",
    "इचलकरंजीचा सर्वाधिक दस्तऐवजीकृत सांस्कृतिक वारसा म्हणजे हिंदुस्थानी संगीत: बाळकृष्णबुवा इचलकरंजीकर यांच्यामुळे ग्वाल्हेर घराणे महाराष्ट्रात आले.",
    "इचलकरंजी की सबसे प्रलेखित सांस्कृतिक विरासत हिंदुस्तानी संगीत है: बालकृष्णबुवा इचलकरंजीकर के ज़रिए ग्वालियर घराना महाराष्ट्र पहुँचा।"),
  [
    {"type": "cards", "id": "music", "title": L("Music heritage", "संगीत वारसा", "संगीत विरासत"), "items": [
      {"title": L("Balakrishnabuwa Ichalkaranjikar (1849–1926)", "बाळकृष्णबुवा इचलकरंजीकर (1849–1926)", "बालकृष्णबुवा इचलकरंजीकर (1849–1926)"), "body": L("Khayal singer who trained in Gwalior under Vasudeorao Joshi and brought the Gwalior gharana to Maharashtra.", "ग्वाल्हेरमध्ये वासुदेवराव जोशी यांच्याकडे शिकलेले ख्याल गायक; ग्वाल्हेर घराणे महाराष्ट्रात आणले.", "ग्वालियर में वासुदेवराव जोशी से सीखे ख़याल गायक, जो ग्वालियर घराना महाराष्ट्र लाए।"), "source": "Wikipedia", "sourceUrl": "https://en.wikipedia.org/wiki/Balakrishnabuwa_Ichalkaranjikar"},
      {"title": L("Mirashi Buwa (b. 1883)", "मिराशीबुवा (जन्म 1883)", "मिराशीबुवा (जन्म 1883)"), "body": L("Born in Ichalkaranji; a disciple of Balakrishnabuwa known for fast taans.", "इचलकरंजीत जन्म; जलद तानांसाठी प्रसिद्ध असलेले बाळकृष्णबुवांचे शिष्य.", "इचलकरंजी में जन्मे; तेज़ तानों के लिए प्रसिद्ध बालकृष्णबुवा के शिष्य।"), "source": "Wikipedia", "sourceUrl": "https://en.wikipedia.org/wiki/Mirashi_Buwa"},
      {"title": L("The state music school (1930)", "संस्थानाची संगीत शाळा (1930)", "राज्य संगीत विद्यालय (1930)"), "body": L("Founded by Narayanrao Ghorpade; Keshavbuwa Ingale was court singer and taught there from 1931 to 1950.", "नारायणराव घोरपडे यांनी स्थापन केली; केशवबुवा इंगळे 1931–1950 दरबार गायक होते व तेथे शिकवत.", "नारायणराव घोरपड़े द्वारा स्थापित; केशवबुवा इंगले 1931–1950 तक दरबारी गायक रहे और वहाँ पढ़ाया।"), "source": "SwarGanga", "sourceUrl": "https://www.swarganga.org/artist_details.php?id=775"},
    ]},
    {"type": "prose", "id": "everyday", "title": L("Language, food and dress", "भाषा, खाद्यपदार्थ आणि पेहराव", "भाषा, खान-पान और पहनावा"), "paragraphs": [
      L("Marathi is the everyday language, with Kannada heard because of the nearby border and Hindi widely understood.",
        "मराठी ही रोजची भाषा; जवळच्या सीमेमुळे कन्नडही ऐकू येते आणि हिंदी सर्वत्र समजली जाते.",
        "रोज़मर्रा की भाषा मराठी है; पास की सीमा के कारण कन्नड़ भी सुनाई देती है और हिंदी व्यापक रूप से समझी जाती है।"),
      L("The table is that of the Kolhapur region: misal, tambda (red) and pandhra (white) rassa, pithla-bhakri and Kolhapuri thalis. Claims about dishes specific to Ichalkaranji, and named eateries, are still being verified.",
        "खाद्यसंस्कृती कोल्हापूर परिसराची: मिसळ, तांबडा व पांढरा रस्सा, पिठलं-भाकरी आणि कोल्हापुरी थाळी. इचलकरंजीच्या खास पदार्थांचे दावे आणि नामांकित उपाहारगृहे अद्याप पडताळली जात आहेत.",
        "खान-पान कोल्हापुर क्षेत्र का है: मिसल, तांबड़ा (लाल) और पांढरा (सफ़ेद) रस्सा, पिठला-भाकरी और कोल्हापुरी थाली। इचलकरंजी के विशेष व्यंजनों और नामी भोजनालयों के दावे अभी सत्यापित किए जा रहे हैं।"),
      L("Traditional dress follows western Maharashtra: the nauvari sari, dhoti and pheta, and Kolhapuri chappals. The town was first known for cotton dhotis and saris before its looms diversified.",
        "पारंपरिक पेहराव पश्चिम महाराष्ट्राचा: नऊवारी साडी, धोतर, फेटा आणि कोल्हापुरी चप्पल. मागांनी विविधता आणण्यापूर्वी गाव सुती धोतर व साड्यांसाठी ओळखले जात असे.",
        "पारंपरिक पहनावा पश्चिमी महाराष्ट्र का है: नौवारी साड़ी, धोती और फेटा, और कोल्हापुरी चप्पल। करघों के विविध होने से पहले कस्बा सूती धोती और साड़ियों के लिए जाना जाता था।"),
    ]},
    {"type": "awaited", "id": "awaited", "title": L("Being documented", "दस्तऐवजीकरण सुरू", "दस्तावेज़ीकरण जारी"),
     "items": [L("Local dialect and phrases", "स्थानिक बोली व वाक्प्रचार", "स्थानीय बोली और मुहावरे"), L("Wrestling (kusti) akhadas", "कुस्ती आखाडे", "कुश्ती अखाड़े"), L("Temples, mosques and churches", "मंदिरे, मशिदी व चर्च", "मंदिर, मस्जिद और चर्च"), L("Cultural organisations", "सांस्कृतिक संस्था", "सांस्कृतिक संस्थाएँ"), L("Notable eateries", "प्रसिद्ध उपाहारगृहे", "प्रसिद्ध भोजनालय")]},
  ])

# ------------------------------------------------------------------ FESTIVALS
page("festivals",
  L("Ichalkaranji celebrates the festivals of western Maharashtra alongside local fairs. A dated event calendar will follow once venues and dates are confirmed each year.",
    "इचलकरंजीत पश्चिम महाराष्ट्रातील सण आणि स्थानिक यात्रा साजऱ्या होतात. दरवर्षीची ठिकाणे व तारखा निश्चित झाल्यावर दिनांकित कार्यक्रम दिनदर्शिका दिली जाईल.",
    "इचलकरंजी में पश्चिमी महाराष्ट्र के त्योहार और स्थानीय मेले मनाए जाते हैं। हर साल के स्थान और तारीखें तय होने पर दिनांकित कार्यक्रम कैलेंडर दिया जाएगा।"),
  [
    {"type": "cards", "id": "local", "title": L("Local fairs", "स्थानिक यात्रा", "स्थानीय मेले"), "items": [
      {"title": L("Shahapur's Mhasoba fair", "शहापूरची म्हसोबा यात्रा", "शहापुर का म्हसोबा मेला"), "body": L("Held on the first Tuesday after Gudi Padwa, the Marathi New Year, for the local deity Mhasoba.", "ग्रामदैवत म्हसोबासाठी गुढीपाडव्यानंतरच्या पहिल्या मंगळवारी भरते.", "स्थानीय देवता म्हसोबा के लिए गुढ़ी पाड़वा के बाद पहले मंगलवार को लगता है।"), "source": "Wikipedia: Shahapur, Ichalkaranji", "sourceUrl": "https://en.wikipedia.org/wiki/Shahapur,_Ichalkaranji"},
    ]},
    {"type": "list", "id": "regional", "title": L("Festivals through the year", "वर्षभरातील सण", "साल भर के त्योहार"),
     "lead": L("Celebrated across the region; city-specific venues and dates are being compiled.", "परिसरभर साजरे होणारे; शहरातील ठिकाणे व तारखा संकलित होत आहेत.", "पूरे क्षेत्र में मनाए जाते हैं; शहर के स्थान और तारीखें संकलित की जा रही हैं।"),
     "items": [L("Gudi Padwa (Marathi New Year)", "गुढीपाडवा (मराठी नववर्ष)", "गुढ़ी पाड़वा (मराठी नववर्ष)"), L("Ganesh Utsav", "गणेशोत्सव", "गणेशोत्सव"), L("Navratri and Dasara", "नवरात्र व दसरा", "नवरात्रि और दशहरा"), L("Diwali", "दिवाळी", "दिवाली"), L("Holi", "होळी", "होली"), L("Mahashivratri", "महाशिवरात्री", "महाशिवरात्रि"), L("Datta Jayanti", "दत्त जयंती", "दत्त जयंती"), L("Mahavir Jayanti", "महावीर जयंती", "महावीर जयंती"), L("Eid", "ईद", "ईद"), L("Christmas", "नाताळ", "क्रिसमस")]},
    {"type": "callout", "id": "safety", "tone": "info", "body": L("For large processions and fairs, follow police traffic advisories and keep the emergency numbers handy: 112 for any emergency.", "मोठ्या मिरवणुका व यात्रांच्या वेळी पोलिसांच्या वाहतूक सूचनांचे पालन करा आणि आपत्कालीन क्रमांक जवळ ठेवा: कोणत्याही आपत्कालीन स्थितीसाठी 112.", "बड़े जुलूसों और मेलों में पुलिस की यातायात सलाह का पालन करें और आपातकालीन नंबर पास रखें: किसी भी आपात स्थिति के लिए 112।")},
    {"type": "awaited", "id": "awaited", "title": L("Coming next", "पुढे येणार", "आगे आने वाला"),
     "items": [L("Dated event calendar", "दिनांकित कार्यक्रम दिनदर्शिका", "दिनांकित कार्यक्रम कैलेंडर"), L("Temple jatras", "मंदिर यात्रा", "मंदिर जत्राएँ"), L("Textile expos", "वस्त्र प्रदर्शने", "वस्त्र प्रदर्शनियाँ"), L("Sports events", "क्रीडा स्पर्धा", "खेल आयोजन"), L("Licensed photo gallery", "परवानाधारक छायाचित्र दालन", "लाइसेंसशुदा फ़ोटो दीर्घा")]},
  ])
