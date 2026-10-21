# Translation glossary

Use these renderings everywhere — UI strings in `messages/`, page content in `scripts/content/`, and data in
`data/`. `npm run check:messages` enforces the spellings marked **checked**. Proper names of institutions,
publications and sources stay as published (source titles are shown in English and marked `lang="en"`).

## Data and status

| English | मराठी | हिंदी |
| --- | --- | --- |
| Official | अधिकृत | आधिकारिक |
| Secondary | दुय्यम स्रोत | द्वितीयक स्रोत |
| Estimate | अंदाज | अनुमान |
| Projection | प्रक्षेपित | प्रक्षेपित |
| Data awaited | माहिती प्रतीक्षेत | आँकड़े प्रतीक्षित |
| Source | स्रोत | स्रोत |
| Data (figures) | आकडेवारी / आकडा | आँकड़े / आँकड़ा |
| Indicator | निर्देशक | संकेतक |
| Census | जनगणना | जनगणना |
| Urban agglomeration | नागरी समूह | नगरीय समूह |
| Sex ratio | लिंग गुणोत्तर | लिंगानुपात |
| Download as PDF | PDF म्हणून डाउनलोड करा | PDF के रूप में डाउनलोड करें |

## Civic terms

| English | मराठी | हिंदी |
| --- | --- | --- |
| Municipal Corporation | महानगरपालिका (short: महापालिका) | महानगरपालिका |
| Municipal council | नगरपरिषद | नगर परिषद |
| District | जिल्हा | जिला (**checked**: not ज़िला) |
| Taluka | तालुका | तालुका |
| Ward | प्रभाग | वार्ड |
| Corporator | नगरसेवक | पार्षद |
| Mayor / Deputy mayor | महापौर / उपमहापौर | महापौर / उपमहापौर |
| Commissioner | आयुक्त | आयुक्त |
| MLA / MP | आमदार / खासदार | विधायक / सांसद |
| Government resolution | शासन निर्णय | शासन निर्णय |
| Website | संकेतस्थळ | वेबसाइट |
| Helpline | हेल्पलाइन | हेल्पलाइन |

## Textile terms

| English | मराठी | हिंदी |
| --- | --- | --- |
| Powerloom | यंत्रमाग | पावरलूम |
| Handloom | हातमाग | हथकरघा |
| Textile industry | वस्त्रोद्योग | वस्त्र उद्योग |
| Spinning mill | सूतगिरणी | कताई मिल |
| Cluster | समूह (क्लस्टर) | क्लस्टर |
| Cooperative | सहकारी | सहकारी |

## Place names

| English | मराठी | हिंदी |
| --- | --- | --- |
| Ichalkaranji | इचलकरंजी | इचलकरंजी |
| Kolhapur | कोल्हापूर | कोल्हापुर |
| Hatkanangale | हातकणंगले | हातकणंगले |
| Panchganga | पंचगंगा | पंचगंगा |
| Narsobawadi | नृसिंहवाडी (नरसोबावाडी) | नरसोबावाड़ी |
| Rajwada | राजवाडा | राजवाड़ा |
| Ghorpade | घोरपडे | घोरपड़े |

## Writing rules

- Western digits with Indian grouping in every language: 2,87,570 (**checked**: no Devanagari digits).
- Plural messages write `{count}`, never ICU `#`, which would print Devanagari digits in Marathi (**checked**).
- Hindi ends sentences with “।”; Marathi uses “.”.
- No letter-spacing on Devanagari text (the stylesheet neutralises `tracking-*` in `mr` and `hi`).
- Keep the register plain and neutral; describe what sources say, never take political positions.
