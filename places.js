/* Countries & cities for search suggestions – "English|اردو" */
const CT=`Pakistan|پاکستان,India|بھارت,Bangladesh|بنگلہ دیش,Afghanistan|افغانستان,Saudi Arabia|سعودی عرب,United Arab Emirates|متحدہ عرب امارات,Oman|عمان,Qatar|قطر,Kuwait|کویت,Bahrain|بحرین,United Kingdom|برطانیہ,United States|امریکہ,Canada|کینیڈا,Australia|آسٹریلیا,New Zealand|نیوزی لینڈ,Malaysia|ملائیشیا,Indonesia|انڈونیشیا,Singapore|سنگاپور,Turkey|ترکی,Iran|ایران,Iraq|عراق,Jordan|اردن,Egypt|مصر,Morocco|مراکش,Algeria|الجزائر,Tunisia|تیونس,Libya|لیبیا,Sudan|سوڈان,South Africa|جنوبی افریقہ,Kenya|کینیا,Nigeria|نائجیریا,Germany|جرمنی,France|فرانس,Italy|اٹلی,Spain|اسپین,Netherlands|ہالینڈ,Belgium|بیلجیم,Ireland|آئرلینڈ,Norway|ناروے,Sweden|سویڈن,Denmark|ڈنمارک,Finland|فن لینڈ,Switzerland|سوئٹزرلینڈ,Austria|آسٹریا,Greece|یونان,Russia|روس,China|چین,Japan|جاپان,South Korea|جنوبی کوریا,Thailand|تھائی لینڈ,Sri Lanka|سری لنکا,Nepal|نیپال,Maldives|مالدیپ,Brazil|برازیل,Mexico|میکسیکو,Argentina|ارجنٹائن,Azerbaijan|آذربائیجان,Uzbekistan|ازبکستان,Kazakhstan|قازقستان,Yemen|یمن,Syria|شام,Lebanon|لبنان,Palestine|فلسطین,Somalia|صومالیہ,Ethiopia|ایتھوپیا,Tanzania|تنزانیہ,Poland|پولینڈ,Portugal|پرتگال,Romania|رومانیہ,Hungary|ہنگری,Czech Republic|چیک جمہوریہ,Bosnia and Herzegovina|بوسنیا و ہرزیگووینا,Albania|البانیہ,Brunei|برونائی,Philippines|فلپائن,Vietnam|ویتنام,Myanmar|میانمار`.split(',').map(s=>s.split('|'));
const CI_RAW={
"Pakistan":`Karachi|کراچی,Lahore|لاہور,Islamabad|اسلام آباد,Rawalpindi|راولپنڈی,Faisalabad|فیصل آباد,Multan|ملتان,Peshawar|پشاور,Quetta|کوئٹہ,Jhelum|جہلم,Gujranwala|گوجرانوالہ,Sialkot|سیالکوٹ,Gujrat|گجرات,Sargodha|سرگودھا,Bahawalpur|بہاولپور,Sukkur|سکھر,Hyderabad|حیدرآباد,Larkana|لاڑکانہ,Abbottabad|ایبٹ آباد,Mardan|مردان,Swat|سوات,Mirpur|میرپور,Muzaffarabad|مظفرآباد,Dina|دینہ,Chakwal|چکوال,Sahiwal|ساہیوال,Okara|اوکاڑہ,Kasur|قصور,Sheikhupura|شیخوپورہ,Rahim Yar Khan|رحیم یار خان,Dera Ghazi Khan|ڈیرہ غازی خان,Dera Ismail Khan|ڈیرہ اسماعیل خان,Kohat|کوہاٹ,Mansehra|مانسہرہ,Attock|اٹک,Mandi Bahauddin|منڈی بہاؤالدین,Jhang|جھنگ,Gojra|گوجرہ,Wah Cantt|واہ کینٹ,Taxila|ٹیکسلا,Nawabshah|نواب شاہ,Mirpurkhas|میرپور خاص,Jacobabad|جیکب آباد,Khuzdar|خضدار,Gwadar|گوادر,Haripur|ہری پور,Nowshera|نوشہرہ,Bannu|بنوں,Chiniot|چنیوٹ,Toba Tek Singh|ٹوبہ ٹیک سنگھ,Vehari|وہاڑی,Khanewal|خانیوال,Lodhran|لودھراں,Muzaffargarh|مظفر گڑھ,Layyah|لیہ,Bhakkar|بھکر,Mianwali|میانوالی,Khushab|خوشاب,Hafizabad|حافظ آباد,Narowal|نارووال,Nankana Sahib|ننکانہ صاحب,Pakpattan|پاکپتن,Burewala|بورے والا,Daska|ڈسکہ,Wazirabad|وزیرآباد,Kamoke|کامونکی,Sadiqabad|صادق آباد,Khairpur|خیرپور,Dadu|دادو,Thatta|ٹھٹھہ,Gilgit|گلگت,Skardu|سکردو,Kotli|کوٹلی,Bagh|باغ,Rawalakot|راولاکوٹ,Bhimber|بھمبر`,
"United Kingdom":`London|لندن,Birmingham|برمنگھم,Manchester|مانچسٹر,Bradford|بریڈفورڈ,Leeds|لیڈز,Glasgow|گلاسگو,Liverpool|لیورپول,Sheffield|شیفیلڈ,Leicester|لیسٹر,Oldham|اولڈہم,Luton|لوٹن,Slough|سلاؤ,Nottingham|ناٹنگھم,Edinburgh|ایڈنبرا,Cardiff|کارڈف,Coventry|کوونٹری,Blackburn|بلیک برن,Peterborough|پیٹربرو`,
"United Arab Emirates":`Dubai|دبئی,Abu Dhabi|ابوظہبی,Sharjah|شارجہ,Ajman|عجمان,Ras Al Khaimah|راس الخیمہ,Fujairah|فجیرہ,Al Ain|العین,Umm Al Quwain|ام القیوین`,
"Saudi Arabia":`Riyadh|ریاض,Jeddah|جدہ,Makkah|مکہ مکرمہ,Madinah|مدینہ منورہ,Dammam|دمام,Khobar|الخبر,Taif|طائف,Tabuk|تبوک,Jubail|جبیل,Yanbu|ینبع,Abha|ابہا`,
"United States":`New York|نیویارک,Houston|ہیوسٹن,Chicago|شکاگو,Los Angeles|لاس اینجلس,Dallas|ڈلاس,Washington D.C.|واشنگٹن ڈی سی,Atlanta|اٹلانٹا,Detroit|ڈیٹرائٹ,Philadelphia|فلاڈیلفیا,San Francisco|سان فرانسسکو,Boston|بوسٹن,Seattle|سیاٹل,Miami|میامی`,
"Canada":`Toronto|ٹورنٹو,Mississauga|مسی ساگا,Brampton|برامپٹن,Vancouver|وینکوور,Calgary|کیلگری,Edmonton|ایڈمنٹن,Ottawa|اوٹاوا,Montreal|مونٹریال,Winnipeg|وینیپیگ,Surrey|سرے`,
"Australia":`Sydney|سڈنی,Melbourne|میلبورن,Brisbane|برسبین,Perth|پرتھ,Adelaide|ایڈیلیڈ,Canberra|کینبرا`,
"Oman":`Muscat|مسقط,Salalah|صلالہ,Sohar|صحار`,
"Qatar":`Doha|دوحہ,Al Rayyan|الریان,Al Wakrah|الوکرہ`,
"Kuwait":`Kuwait City|کویت سٹی,Hawalli|حولی,Salmiya|سالمیہ`,
"Bahrain":`Manama|منامہ,Muharraq|المحرق`,
"India":`Delhi|دہلی,Mumbai|ممبئی,Hyderabad|حیدرآباد,Kolkata|کولکتہ,Lucknow|لکھنؤ,Bareilly|بریلی,Ahmedabad|احمد آباد,Bengaluru|بنگلورو,Chennai|چنئی,Jaipur|جے پور`,
"Bangladesh":`Dhaka|ڈھاکہ,Chittagong|چٹاگانگ,Sylhet|سلہٹ,Khulna|کھلنا`,
"Afghanistan":`Kabul|کابل,Kandahar|قندھار,Jalalabad|جلال آباد,Herat|ہرات`,
"Malaysia":`Kuala Lumpur|کوالالمپور,Penang|پینانگ,Johor Bahru|جوہر بہرو`,
"Turkey":`Istanbul|استنبول,Ankara|انقرہ,Izmir|ازمیر`,
"Egypt":`Cairo|قاہرہ,Alexandria|اسکندریہ`,
"South Africa":`Johannesburg|جوہانسبرگ,Cape Town|کیپ ٹاؤن,Durban|ڈربن`,
"Germany":`Berlin|برلن,Munich|میونخ,Frankfurt|فرینکفرٹ,Hamburg|ہیمبرگ`,
"Italy":`Rome|روم,Milan|میلان,Brescia|بریشیا`,
"Spain":`Madrid|میڈرڈ,Barcelona|بارسلونا`,
"France":`Paris|پیرس`,"Ireland":`Dublin|ڈبلن`,"Netherlands":`Amsterdam|ایمسٹرڈیم`,"Norway":`Oslo|اوسلو,Bergen|برگن`,"Sweden":`Stockholm|اسٹاک ہوم`,"Denmark":`Copenhagen|کوپن ہیگن`,"Greece":`Athens|ایتھنز`,"Japan":`Tokyo|ٹوکیو`,"China":`Beijing|بیجنگ,Guangzhou|گوانگژو`
};
const CI={};for(const k in CI_RAW)CI[k]=CI_RAW[k].split(',').map(s=>s.split('|'));
const PL={};CT.forEach(([e,u])=>PL[e]=u);Object.values(CI).forEach(a=>a.forEach(([e,u])=>PL[e]=u));
