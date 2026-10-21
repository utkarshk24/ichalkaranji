"""FAQ, gallery, directory, privacy, terms, accessibility."""
from _lib import *

IMC = "https://ichalkaranjimnp.in"

# ------------------------------------------------------------------ FAQ
page("faq",
  L("Short answers to common questions about Ichalkaranji and this portal, each pointing to the page with the full, sourced detail.",
    "इचलकरंजी व या पोर्टलविषयीच्या नेहमीच्या प्रश्नांची थोडक्यात उत्तरे; सविस्तर व संदर्भासह माहिती संबंधित पानावर.",
    "इचलकरंजी और इस पोर्टल से जुड़े आम सवालों के संक्षिप्त उत्तर; पूरी, स्रोत सहित जानकारी संबंधित पृष्ठ पर।"),
  [
    {"type": "faq", "id": "city", "title": L("About the city", "शहराविषयी", "शहर के बारे में"), "items": [
      {"q": L("Why is Ichalkaranji called the Manchester of Maharashtra?", "इचलकरंजीला महाराष्ट्राचे मँचेस्टर का म्हणतात?", "इचलकरंजी को महाराष्ट्र का मैनचेस्टर क्यों कहते हैं?"),
       "a": L("Because of its powerloom industry. The first powerloom was installed in 1904; by 1954 the town had 1,521 looms, and trade bodies now put the count at over 1.5 lakh. See the Textile page.", "यंत्रमाग उद्योगामुळे. पहिला यंत्रमाग 1904 मध्ये बसवला गेला; 1954 पर्यंत 1,521 माग होते आणि आज व्यापार संस्थांनुसार ही संख्या 1.5 लाखांहून अधिक आहे. वस्त्रोद्योग पान पाहा.", "पावरलूम उद्योग के कारण। पहला पावरलूम 1904 में लगा; 1954 तक 1,521 करघे थे और आज व्यापार संगठनों के अनुसार संख्या 1.5 लाख से अधिक है। वस्त्र उद्योग पृष्ठ देखें।")},
      {"q": L("What is the population of Ichalkaranji?", "इचलकरंजीची लोकसंख्या किती?", "इचलकरंजी की जनसंख्या कितनी है?"),
       "a": L("2,87,570 in the city and 3,25,709 in the urban agglomeration at the 2011 Census. Later figures are estimates, not counts.", "2011 च्या जनगणनेनुसार शहर 2,87,570 व नागरी समूह 3,25,709. नंतरचे आकडे अंदाज आहेत, गणना नव्हे.", "2011 की जनगणना में शहर 2,87,570 और नगरीय समूह 3,25,709। बाद के आँकड़े अनुमान हैं, गणना नहीं।")},
      {"q": L("Is Ichalkaranji a municipal corporation?", "इचलकरंजी महानगरपालिका आहे का?", "क्या इचलकरंजी महानगरपालिका है?"),
       "a": L("Yes. It was upgraded from a municipal council by a state resolution of 5 May 2022, and its first corporation election was held in January 2026.", "होय. 5 मे 2022 च्या शासन निर्णयाने नगरपरिषदेची महानगरपालिका झाली; पहिली निवडणूक जानेवारी 2026 मध्ये झाली.", "हाँ। 5 मई 2022 के शासन निर्णय से नगर परिषद को महानगरपालिका बनाया गया; पहला चुनाव जनवरी 2026 में हुआ।")},
      {"q": L("Which district and taluka is it in?", "हे कोणत्या जिल्ह्यात व तालुक्यात आहे?", "यह किस ज़िले और तालुका में है?"),
       "a": L("Hatkanangale taluka of Kolhapur district, Maharashtra.", "महाराष्ट्रातील कोल्हापूर जिल्ह्याचा हातकणंगले तालुका.", "महाराष्ट्र के कोल्हापुर ज़िले का हातकणंगले तालुका।")},
    ]},
    {"type": "faq", "id": "visit", "title": L("Visiting", "भेट देताना", "यात्रा"), "items": [
      {"q": L("What is the nearest railway station?", "सर्वांत जवळचे रेल्वे स्थानक कोणते?", "निकटतम रेलवे स्टेशन कौन-सा है?"),
       "a": L("Hatkanangale (HTK), about 7–8 km away. Kolhapur has the nearest mainline station.", "सुमारे 7–8 किमीवरील हातकणंगले (HTK). मुख्य मार्गावरील सर्वांत जवळचे स्थानक कोल्हापूर.", "लगभग 7–8 किमी दूर हातकणंगले (HTK)। मुख्य लाइन का निकटतम स्टेशन कोल्हापुर है।")},
      {"q": L("What is the nearest airport?", "सर्वांत जवळचा विमानतळ कोणता?", "निकटतम हवाई अड्डा कौन-सा है?"),
       "a": L("Kolhapur Airport (KLH), about 30 km away. Belagavi and Pune are the larger alternatives.", "सुमारे 30 किमीवरील कोल्हापूर विमानतळ (KLH). बेळगावी व पुणे हे मोठे पर्याय.", "लगभग 30 किमी दूर कोल्हापुर हवाई अड्डा (KLH)। बेलगावी और पुणे बड़े विकल्प हैं।")},
      {"q": L("When is the best time to visit?", "भेटीसाठी उत्तम काळ कोणता?", "घूमने का सबसे अच्छा समय कब है?"),
       "a": L("December to February, when the weather is mild and dry.", "डिसेंबर ते फेब्रुवारी, जेव्हा हवा सौम्य व कोरडी असते.", "दिसंबर से फरवरी, जब मौसम हल्का और सूखा रहता है।")},
      {"q": L("Is Ichalkaranji near the sea?", "इचलकरंजी समुद्राजवळ आहे का?", "क्या इचलकरंजी समुद्र के पास है?"),
       "a": L("No. It is inland on the Deccan Plateau; the coast lies across the Western Ghats.", "नाही. हे दख्खनच्या पठारावर अंतर्गत भागात आहे; किनारा पश्चिम घाटापलीकडे.", "नहीं। यह दक्कन पठार पर भीतरी भाग में है; तट पश्चिमी घाट के पार है।")},
    ]},
    {"type": "faq", "id": "portal", "title": L("About this portal", "या पोर्टलविषयी", "इस पोर्टल के बारे में"), "items": [
      {"q": L("Is this the official website of the corporation?", "हे महापालिकेचे अधिकृत संकेतस्थळ आहे का?", "क्या यह महानगरपालिका की आधिकारिक वेबसाइट है?"),
       "a": L("No. This is an independent information portal. For official services, use the Ichalkaranji Municipal Corporation's own website, linked on the Civic services page.", "नाही. हे स्वतंत्र माहिती पोर्टल आहे. अधिकृत सेवांसाठी इचलकरंजी महानगरपालिकेचे स्वतःचे संकेतस्थळ वापरा; दुवा नागरी सेवा पानावर.", "नहीं। यह एक स्वतंत्र सूचना पोर्टल है। आधिकारिक सेवाओं के लिए इचलकरंजी महानगरपालिका की अपनी वेबसाइट देखें, जिसका लिंक नागरिक सेवाएँ पृष्ठ पर है।")},
      {"q": L("Can I pay property tax or bills here?", "येथे मालमत्ता कर किंवा देयके भरता येतात का?", "क्या मैं यहाँ संपत्ति कर या बिल भर सकता हूँ?"),
       "a": L("No. This portal never takes payments. It links to the official portals where you can pay.", "नाही. हे पोर्टल कधीही पैसे स्वीकारत नाही. पैसे भरता येतील अशा अधिकृत पोर्टलचे दुवे येथे आहेत.", "नहीं। यह पोर्टल कभी भुगतान नहीं लेता। यहाँ उन आधिकारिक पोर्टलों के लिंक हैं जहाँ आप भुगतान कर सकते हैं।")},
      {"q": L("Where do the numbers come from?", "आकडे कुठून येतात?", "आँकड़े कहाँ से आते हैं?"),
       "a": L("Every figure shows its source, year and status: official, secondary, estimate or awaited. Tap the source badge on any card, or see the Sources page.", "प्रत्येक आकड्यासोबत स्रोत, वर्ष व स्थिती (अधिकृत, दुय्यम, अंदाज किंवा प्रतीक्षेत) दिली आहे. कोणत्याही कार्डवरील स्रोत चिन्हावर टॅप करा किंवा स्रोत पान पाहा.", "हर आँकड़े के साथ स्रोत, वर्ष और स्थिति (आधिकारिक, द्वितीयक, अनुमान या प्रतीक्षित) दी गई है। किसी भी कार्ड पर स्रोत बैज टैप करें या स्रोत पृष्ठ देखें।")},
      {"q": L("Why do some figures say “Data awaited”?", "काही आकड्यांवर “माहिती प्रतीक्षेत” का लिहिले आहे?", "कुछ आँकड़ों पर “डेटा प्रतीक्षित” क्यों लिखा है?"),
       "a": L("Because no reliable source was found yet. The portal leaves a gap rather than guess.", "कारण अद्याप विश्वसनीय स्रोत मिळालेला नाही. अंदाज करण्याऐवजी पोर्टल जागा रिकामी ठेवते.", "क्योंकि अभी तक कोई विश्वसनीय स्रोत नहीं मिला। अनुमान लगाने के बजाय पोर्टल जगह खाली छोड़ता है।")},
      {"q": L("How do I report a mistake?", "चूक कशी कळवावी?", "गलती की सूचना कैसे दें?"),
       "a": L("Use the Contact page and include the page address and, if you can, a source for the correct figure.", "संपर्क पान वापरा; पानाचा पत्ता आणि शक्य असल्यास योग्य आकड्याचा स्रोत द्या.", "संपर्क पृष्ठ का उपयोग करें; पृष्ठ का पता और हो सके तो सही आँकड़े का स्रोत दें।")},
    ]},
  ])

# ------------------------------------------------------------------ GALLERY
page("gallery",
  L("The gallery will show only photographs with a clear licence and credit. None have been cleared yet, so it is empty for now.",
    "दालनात केवळ स्पष्ट परवाना व श्रेय असलेली छायाचित्रे दाखवली जातील. अद्याप एकही मंजूर नाही, त्यामुळे सध्या दालन रिकामे आहे.",
    "दीर्घा में केवल स्पष्ट लाइसेंस और श्रेय वाली तस्वीरें दिखाई जाएँगी। अभी तक कोई स्वीकृत नहीं है, इसलिए दीर्घा फ़िलहाल खाली है।"),
  [
    {"type": "callout", "id": "empty", "tone": "info", "body": L("Rather than use stock or AI-generated images that could be mistaken for the real city, this portal waits for licensed photographs.", "खऱ्या शहराचे वाटू शकतील अशी स्टॉक किंवा एआय-निर्मित चित्रे वापरण्याऐवजी हे पोर्टल परवानाधारक छायाचित्रांची वाट पाहते.", "असली शहर समझी जा सकने वाली स्टॉक या एआई-निर्मित तस्वीरों के बजाय यह पोर्टल लाइसेंसशुदा तस्वीरों की प्रतीक्षा करता है।")},
    {"type": "list", "id": "rules", "title": L("What a photo needs", "छायाचित्रासाठी अटी", "तस्वीर के लिए शर्तें"),
     "items": [L("Taken in or around Ichalkaranji, with the place and date", "इचलकरंजी किंवा परिसरात काढलेले; ठिकाण व दिनांकासह", "इचलकरंजी या आसपास ली गई; स्थान और तारीख सहित"), L("An open licence such as CC BY or CC BY-SA, or written permission", "CC BY किंवा CC BY-SA सारखा मुक्त परवाना, किंवा लेखी परवानगी", "CC BY या CC BY-SA जैसा खुला लाइसेंस, या लिखित अनुमति"), L("The photographer's name for the credit line", "श्रेयासाठी छायाचित्रकाराचे नाव", "श्रेय के लिए फ़ोटोग्राफ़र का नाम"), L("No identifiable people without their consent", "संमतीशिवाय ओळखता येणाऱ्या व्यक्ती नाहीत", "सहमति के बिना पहचाने जा सकने वाले लोग नहीं"), L("Short alt text describing the image", "चित्राचे वर्णन करणारा छोटा पर्यायी मजकूर", "तस्वीर का वर्णन करने वाला छोटा वैकल्पिक पाठ")]},
    {"type": "awaited", "id": "albums", "title": L("Planned albums", "नियोजित संग्रह", "नियोजित एल्बम"),
     "items": [L("Looms and textile work", "माग व वस्त्रकाम", "करघे और वस्त्र कार्य"), L("Panchganga river and ghats", "पंचगंगा नदी व घाट", "पंचगंगा नदी और घाट"), L("Heritage buildings", "वारसा इमारती", "विरासत इमारतें"), L("Festivals", "सण", "त्योहार"), L("Old photographs and archives", "जुनी छायाचित्रे व अभिलेख", "पुरानी तस्वीरें और अभिलेख")]},
    {"type": "links", "id": "commons", "title": L("Open image libraries", "मुक्त चित्रसंग्रह", "खुले चित्र संग्रह"), "items": [
      {"title": L("Wikimedia Commons: search Ichalkaranji", "विकिमीडिया कॉमन्स: इचलकरंजी शोधा", "विकिमीडिया कॉमन्स: इचलकरंजी खोजें"), "href": "https://commons.wikimedia.org/w/index.php?search=Ichalkaranji", "body": L("Freely licensed photos; check each file's licence.", "मुक्त परवान्याची छायाचित्रे; प्रत्येक फाइलचा परवाना तपासा.", "मुक्त लाइसेंस की तस्वीरें; हर फ़ाइल का लाइसेंस जाँचें।")},
      {"title": L("The Story of Ichalkaranji (1929), Internet Archive", "द स्टोरी ऑफ इचलकरंजी (1929), इंटरनेट अर्काइव्ह", "द स्टोरी ऑफ़ इचलकरंजी (1929), इंटरनेट आर्काइव"), "href": "https://archive.org/details/StoryOfIchalkaranji", "body": L("H. G. Franks' history, with period illustrations.", "एच. जी. फ्रँक्स यांचा इतिहासग्रंथ, तत्कालीन चित्रांसह.", "एच. जी. फ़्रैंक्स का इतिहास, तत्कालीन चित्रों सहित।")},
    ]},
  ])

# ------------------------------------------------------------------ DIRECTORY
page("directory",
  L("Where to find contact details for public offices. Phone numbers are listed only after they are verified; until then each entry points to the office's official source.",
    "सार्वजनिक कार्यालयांचे संपर्क तपशील कुठे मिळतील. फोन क्रमांक पडताळणीनंतरच दिले जातात; तोपर्यंत प्रत्येक नोंद कार्यालयाच्या अधिकृत स्रोताकडे नेते.",
    "सार्वजनिक कार्यालयों के संपर्क विवरण कहाँ मिलेंगे। फ़ोन नंबर सत्यापन के बाद ही दिए जाते हैं; तब तक हर प्रविष्टि कार्यालय के आधिकारिक स्रोत की ओर ले जाती है।"),
  [
    {"type": "table", "id": "offices", "title": L("Public offices", "सार्वजनिक कार्यालये", "सार्वजनिक कार्यालय"),
     "columns": [L("Office", "कार्यालय", "कार्यालय"), L("For", "कशासाठी", "किसके लिए"), L("Contact details", "संपर्क तपशील", "संपर्क विवरण")],
     "rows": [
       [L("Ichalkaranji Municipal Corporation", "इचलकरंजी महानगरपालिका", "इचलकरंजी महानगरपालिका"), L("Taxes, water, certificates, sanitation, roads", "कर, पाणी, दाखले, स्वच्छता, रस्ते", "कर, पानी, प्रमाणपत्र, स्वच्छता, सड़कें"), L("Corporation website (ichalkaranjimnp.in)", "महापालिका संकेतस्थळ (ichalkaranjimnp.in)", "महानगरपालिका वेबसाइट (ichalkaranjimnp.in)")],
       [L("Kolhapur District Collectorate", "कोल्हापूर जिल्हाधिकारी कार्यालय", "कोल्हापुर ज़िलाधिकारी कार्यालय"), L("Revenue, elections, disaster management", "महसूल, निवडणुका, आपत्ती व्यवस्थापन", "राजस्व, चुनाव, आपदा प्रबंधन"), L("District website (kolhapur.gov.in)", "जिल्हा संकेतस्थळ (kolhapur.gov.in)", "ज़िला वेबसाइट (kolhapur.gov.in)")],
       [L("Hatkanangale Tahsil office", "हातकणंगले तहसील कार्यालय", "हातकणंगले तहसील कार्यालय"), L("Land records, certificates", "जमीन नोंदी, दाखले", "भूमि अभिलेख, प्रमाणपत्र"), L("Listed on the district website", "जिल्हा संकेतस्थळावर नोंद", "ज़िला वेबसाइट पर सूचीबद्ध")],
       [L("Police", "पोलीस", "पुलिस"), L("Law and order, complaints", "कायदा व सुव्यवस्था, तक्रारी", "क़ानून व्यवस्था, शिकायतें"), L("112 in an emergency; station numbers on the district website", "आपत्कालीन स्थितीत 112; ठाण्यांचे क्रमांक जिल्हा संकेतस्थळावर", "आपात स्थिति में 112; थानों के नंबर ज़िला वेबसाइट पर")],
       [L("MSEDCL (Mahavitaran)", "महावितरण", "महावितरण"), L("Electricity supply and bills", "वीजपुरवठा व देयके", "बिजली आपूर्ति और बिल"), L("mahadiscom.in; 24×7 toll-free number listed there", "mahadiscom.in; 24×7 टोल-फ्री क्रमांक तेथे", "mahadiscom.in; 24×7 टोल-फ्री नंबर वहाँ")],
       [L("India Post", "भारतीय टपाल", "भारतीय डाक"), L("Post offices and PIN codes", "टपाल कार्यालये व पिन कोड", "डाकघर और पिन कोड"), L("indiapost.gov.in post office search", "indiapost.gov.in टपाल कार्यालय शोध", "indiapost.gov.in डाकघर खोज")],
     ]},
    {"type": "links", "id": "links", "title": L("Official websites", "अधिकृत संकेतस्थळे", "आधिकारिक वेबसाइटें"), "items": [
      {"title": L("Ichalkaranji Municipal Corporation", "इचलकरंजी महानगरपालिका", "इचलकरंजी महानगरपालिका"), "href": IMC},
      {"title": L("Kolhapur district administration", "कोल्हापूर जिल्हा प्रशासन", "कोल्हापुर ज़िला प्रशासन"), "href": "https://kolhapur.gov.in"},
      {"title": L("MSEDCL (Mahavitaran)", "महावितरण", "महावितरण"), "href": "https://www.mahadiscom.in"},
      {"title": L("India Post: find a post office", "भारतीय टपाल: टपाल कार्यालय शोधा", "भारतीय डाक: डाकघर खोजें"), "href": "https://www.indiapost.gov.in"},
    ]},
    {"type": "awaited", "id": "awaited", "title": L("Being verified", "पडताळणी सुरू", "सत्यापन जारी"),
     "items": [L("Ward office addresses", "प्रभाग कार्यालयांचे पत्ते", "वार्ड कार्यालयों के पते"), L("Police station addresses", "पोलीस ठाण्यांचे पत्ते", "पुलिस थानों के पते"), L("Banks and ATMs", "बँका व एटीएम", "बैंक और एटीएम"), L("Textile associations", "वस्त्रोद्योग संघटना", "वस्त्र उद्योग संघ")]},
  ])

# ------------------------------------------------------------------ PRIVACY
page("privacy",
  L("This portal collects no accounts, payments or forms. Here is exactly what is stored and what third parties see when you use it.",
    "हे पोर्टल खाती, पैसे किंवा अर्ज घेत नाही. वापरताना नेमके काय साठवले जाते आणि बाह्य सेवांना काय दिसते ते येथे.",
    "यह पोर्टल कोई खाता, भुगतान या फ़ॉर्म नहीं लेता। उपयोग करते समय ठीक क्या संग्रहीत होता है और बाहरी सेवाओं को क्या दिखता है, यहाँ बताया गया है।"),
  [
    {"type": "table", "id": "stored", "title": L("What is stored on your device", "तुमच्या उपकरणावर काय साठवले जाते", "आपके उपकरण पर क्या संग्रहीत होता है"),
     "columns": [L("Item", "घटक", "मद"), L("Purpose", "उद्देश", "उद्देश्य"), L("Kept for", "कालावधी", "अवधि")],
     "rows": [
       [L("ICH_LOCALE cookie", "ICH_LOCALE कुकी", "ICH_LOCALE कुकी"), L("Remembers your language", "तुमची भाषा लक्षात ठेवते", "आपकी भाषा याद रखती है"), L("Up to one year", "एक वर्षापर्यंत", "एक वर्ष तक")],
       [L("Theme setting (browser storage)", "थीम निवड (ब्राउझर साठवण)", "थीम सेटिंग (ब्राउज़र भंडारण)"), L("Remembers light or dark mode", "प्रकाश किंवा गडद मोड लक्षात ठेवते", "लाइट या डार्क मोड याद रखती है"), L("Until you clear it", "तुम्ही हटवेपर्यंत", "जब तक आप न हटाएँ")],
     ]},
    {"type": "prose", "id": "third", "title": L("Third-party services", "बाह्य सेवा", "बाहरी सेवाएँ"), "paragraphs": [
      L("Weather and air-quality figures are loaded by your browser from Open-Meteo, and map tiles from OpenStreetMap. These services receive your IP address and the request, as any website does. No other trackers, analytics or advertising scripts are used.",
        "हवामान व हवा गुणवत्तेचे आकडे तुमचा ब्राउझर ओपन-मेटिओवरून आणि नकाशाचे भाग ओपनस्ट्रीटमॅपवरून आणतो. कोणत्याही संकेतस्थळाप्रमाणे या सेवांना तुमचा आयपी पत्ता व विनंती मिळते. इतर कोणतेही ट्रॅकर, विश्लेषण किंवा जाहिरात स्क्रिप्ट वापरले जात नाहीत.",
        "मौसम और वायु गुणवत्ता के आँकड़े आपका ब्राउज़र ओपन-मीटियो से और नक्शे के टाइल ओपनस्ट्रीटमैप से लाता है। किसी भी वेबसाइट की तरह इन सेवाओं को आपका आईपी पता और अनुरोध मिलता है। कोई अन्य ट्रैकर, एनालिटिक्स या विज्ञापन स्क्रिप्ट उपयोग नहीं होती।"),
      L("The web host may keep standard server logs (IP address, time, page requested) for security. If you write to the portal team from the Contact page, your message is sent from your own email app and is used only to reply.",
        "सुरक्षेसाठी वेब होस्ट नेहमीच्या सर्व्हर नोंदी (आयपी पत्ता, वेळ, मागवलेले पान) ठेवू शकतो. संपर्क पानावरून तुम्ही पोर्टल चमूला लिहिल्यास संदेश तुमच्या स्वतःच्या ईमेल ॲपमधून जातो आणि केवळ उत्तर देण्यासाठी वापरला जातो.",
        "सुरक्षा के लिए वेब होस्ट सामान्य सर्वर लॉग (आईपी पता, समय, माँगा गया पृष्ठ) रख सकता है। संपर्क पृष्ठ से पोर्टल टीम को लिखने पर संदेश आपके अपने ईमेल ऐप से जाता है और केवल उत्तर देने के लिए उपयोग होता है।"),
    ]},
    {"type": "list", "id": "never", "title": L("What this portal never asks for", "हे पोर्टल कधीही काय मागत नाही", "यह पोर्टल कभी क्या नहीं माँगता"),
     "items": [L("Payments or bank details", "पैसे किंवा बँक तपशील", "भुगतान या बैंक विवरण"), L("Passwords or one-time codes", "पासवर्ड किंवा एकवेळ कोड", "पासवर्ड या वन-टाइम कोड"), L("Aadhaar, PAN or other ID numbers", "आधार, पॅन किंवा इतर ओळख क्रमांक", "आधार, पैन या अन्य पहचान संख्या")]},
  ])

# ------------------------------------------------------------------ TERMS
page("terms",
  L("This is an independent, non-commercial information portal about Ichalkaranji. It is not run by, or speaking for, any government body.",
    "हे इचलकरंजीविषयीचे स्वतंत्र, अव्यावसायिक माहिती पोर्टल आहे. ते कोणत्याही शासकीय संस्थेद्वारे चालवले जात नाही किंवा तिच्या वतीने बोलत नाही.",
    "यह इचलकरंजी के बारे में एक स्वतंत्र, गैर-व्यावसायिक सूचना पोर्टल है। इसे कोई सरकारी संस्था नहीं चलाती और न ही यह उसकी ओर से बोलता है।"),
  [
    {"type": "prose", "id": "use", "title": L("Using this site", "संकेतस्थळाचा वापर", "साइट का उपयोग"), "paragraphs": [
      L("Information is provided as-is for general reference. Every figure is labelled with its source and status, but sources can be wrong or out of date. For anything with legal, financial or safety consequences, rely on the official body that issues it.",
        "माहिती सर्वसाधारण संदर्भासाठी जशी आहे तशी दिली आहे. प्रत्येक आकड्यावर स्रोत व स्थिती दिली असली तरी स्रोत चुकीचे किंवा जुने असू शकतात. कायदेशीर, आर्थिक किंवा सुरक्षाविषयक परिणाम असलेल्या बाबींसाठी संबंधित अधिकृत संस्थेवर विसंबून राहा.",
        "जानकारी सामान्य संदर्भ के लिए जैसी है वैसी दी गई है। हर आँकड़े पर स्रोत और स्थिति दी गई है, फिर भी स्रोत गलत या पुराने हो सकते हैं। क़ानूनी, वित्तीय या सुरक्षा परिणाम वाले मामलों में जारी करने वाली आधिकारिक संस्था पर ही भरोसा करें।"),
      L("Links to official portals are provided for convenience. Those sites have their own terms, and this portal is not responsible for their content or availability.",
        "अधिकृत पोर्टलचे दुवे सोयीसाठी दिले आहेत. त्या संकेतस्थळांच्या स्वतःच्या अटी आहेत आणि त्यांच्या मजकुरासाठी किंवा उपलब्धतेसाठी हे पोर्टल जबाबदार नाही.",
        "आधिकारिक पोर्टलों के लिंक सुविधा के लिए दिए गए हैं। उन साइटों की अपनी शर्तें हैं और उनकी सामग्री या उपलब्धता के लिए यह पोर्टल ज़िम्मेदार नहीं है।"),
    ]},
    {"type": "table", "id": "licences", "title": L("Content and data licences", "मजकूर व माहितीचे परवाने", "सामग्री और डेटा लाइसेंस"),
     "columns": [L("Material", "साहित्य", "सामग्री"), L("Licence", "परवाना", "लाइसेंस")],
     "rows": [
       [L("This portal's own text and charts", "या पोर्टलचा स्वतःचा मजकूर व आलेख", "इस पोर्टल की अपनी सामग्री और चार्ट"), L("CC BY 4.0 unless noted", "अन्यथा नमूद नसल्यास CC BY 4.0", "अन्यथा उल्लेख न हो तो CC BY 4.0")],
       [L("Map data", "नकाशा माहिती", "नक्शा डेटा"), L("© OpenStreetMap contributors, ODbL", "© ओपनस्ट्रीटमॅप योगदानकर्ते, ODbL", "© ओपनस्ट्रीटमैप योगदानकर्ता, ODbL")],
       [L("Weather and air quality", "हवामान व हवा गुणवत्ता", "मौसम और वायु गुणवत्ता"), L("Open-Meteo, CC BY 4.0", "ओपन-मेटिओ, CC BY 4.0", "ओपन-मीटियो, CC BY 4.0")],
       [L("Text drawn from Wikipedia", "विकिपीडियावरून घेतलेला मजकूर", "विकिपीडिया से ली गई सामग्री"), L("CC BY-SA 4.0, credited on each page", "CC BY-SA 4.0, प्रत्येक पानावर श्रेय", "CC BY-SA 4.0, हर पृष्ठ पर श्रेय")],
       [L("Place coordinates file (/geo/places.geojson)", "स्थळ निर्देशांक फाइल (/geo/places.geojson)", "स्थान निर्देशांक फ़ाइल (/geo/places.geojson)"), L("CC BY-SA 4.0", "CC BY-SA 4.0", "CC BY-SA 4.0")],
       [L("Government data", "शासकीय माहिती", "सरकारी डेटा"), L("As published by the issuing body", "जारी करणाऱ्या संस्थेनुसार", "जारी करने वाली संस्था के अनुसार")],
     ]},
    {"type": "callout", "id": "names", "tone": "info", "body": L("This portal does not use any government emblem, seal or logo. Names of public bodies are used only to identify them.", "हे पोर्टल कोणतेही शासकीय बोधचिन्ह, मुद्रा किंवा लोगो वापरत नाही. सार्वजनिक संस्थांची नावे केवळ ओळखीसाठी वापरली आहेत.", "यह पोर्टल किसी सरकारी प्रतीक, मुहर या लोगो का उपयोग नहीं करता। सार्वजनिक संस्थाओं के नाम केवल पहचान के लिए उपयोग किए गए हैं।")},
  ])

# ------------------------------------------------------------------ ACCESSIBILITY
page("accessibility",
  L("This portal aims to meet WCAG 2.1 level AA in English, Marathi and Hindi. Here is what has been built in, and the known gaps.",
    "इंग्रजी, मराठी व हिंदीत WCAG 2.1 स्तर AA पूर्ण करण्याचे या पोर्टलचे उद्दिष्ट आहे. काय सुविधा आहेत आणि ज्ञात उणिवा कोणत्या, ते येथे.",
    "यह पोर्टल अंग्रेज़ी, मराठी और हिंदी में WCAG 2.1 स्तर AA पूरा करने का लक्ष्य रखता है। यहाँ बताया गया है कि क्या सुविधाएँ हैं और कौन-सी कमियाँ ज्ञात हैं।"),
  [
    {"type": "list", "id": "features", "title": L("Built in", "उपलब्ध सुविधा", "उपलब्ध सुविधाएँ"),
     "items": [
       L("A “Skip to content” link and visible keyboard focus", "“मजकुराकडे जा” दुवा व दिसणारा कीबोर्ड फोकस", "“सामग्री पर जाएँ” लिंक और दिखाई देने वाला कीबोर्ड फ़ोकस"),
       L("Full keyboard use of menus, search (press / or Ctrl+K) and dialogs", "मेनू, शोध (/ किंवा Ctrl+K दाबा) व संवाद पूर्णपणे कीबोर्डने", "मेनू, खोज (/ या Ctrl+K दबाएँ) और संवाद पूरी तरह कीबोर्ड से"),
       L("Every chart has a table view", "प्रत्येक आलेखासाठी तक्ता दृश्य", "हर चार्ट के लिए तालिका दृश्य"),
       L("Data status is shown as text, never colour alone", "माहितीची स्थिती मजकुराने, केवळ रंगाने नव्हे", "डेटा स्थिति पाठ से दिखाई जाती है, केवल रंग से नहीं"),
       L("Light and dark themes with checked contrast", "तपासलेल्या विरोधाभासासह प्रकाश व गडद थीम", "जाँचे गए कंट्रास्ट के साथ लाइट और डार्क थीम"),
       L("Animations stop when your device asks for reduced motion", "उपकरणावर कमी हालचाल निवडल्यास ॲनिमेशन थांबतात", "उपकरण पर कम गति चुनने पर एनिमेशन रुक जाते हैं"),
       L("Correct language tags so screen readers pronounce Marathi and Hindi properly", "स्क्रीन रीडरना मराठी व हिंदी योग्य उच्चारता यावी म्हणून योग्य भाषा चिन्हे", "स्क्रीन रीडर मराठी और हिंदी सही उच्चारित करें, इसके लिए सही भाषा टैग"),
       L("Pages print cleanly or save as PDF, with sources kept", "स्रोतांसह पाने स्वच्छ छापता येतात किंवा PDF म्हणून जतन करता येतात", "स्रोतों सहित पृष्ठ साफ़ प्रिंट होते हैं या PDF में सहेजे जा सकते हैं"),
     ]},
    {"type": "list", "id": "gaps", "title": L("Known limitations", "ज्ञात मर्यादा", "ज्ञात सीमाएँ"),
     "items": [
       L("The interactive map is hard to use with a screen reader; every place on it is also listed as text", "परस्परसंवादी नकाशा स्क्रीन रीडरने वापरणे अवघड; त्यावरील प्रत्येक स्थळ मजकुरातही दिले आहे", "इंटरैक्टिव नक्शा स्क्रीन रीडर से उपयोग करना कठिन है; उस पर हर स्थान पाठ में भी सूचीबद्ध है"),
       L("Linked government documents (often scanned PDFs) may not be accessible", "जोडलेली शासकीय कागदपत्रे (बहुधा स्कॅन PDF) सुलभ नसू शकतात", "लिंक किए गए सरकारी दस्तावेज़ (अक्सर स्कैन PDF) सुलभ न हों, ऐसा हो सकता है"),
       L("Some source titles are available only in English", "काही स्रोतांची शीर्षके केवळ इंग्रजीत", "कुछ स्रोतों के शीर्षक केवल अंग्रेज़ी में हैं"),
     ]},
    {"type": "callout", "id": "feedback", "tone": "info", "body": L("If something on this portal is hard to use, tell the team through the Contact page and say which page and device you were using.", "या पोर्टलवरील काही वापरणे अवघड वाटल्यास संपर्क पानावरून चमूला कळवा आणि कोणते पान व उपकरण वापरत होता ते सांगा.", "अगर इस पोर्टल पर कुछ उपयोग करना कठिन लगे, तो संपर्क पृष्ठ से टीम को बताएँ और कौन-सा पृष्ठ व उपकरण उपयोग कर रहे थे, यह भी बताएँ।")},
  ])
