/**
 * Hinglish (Hindi in Roman letters) content. Keys match the slugs in
 * src/festivals.mjs and src/wishes.mjs. The second wish list on each page is
 * the English list from those files.
 */
const festivals = {
  christmas: {
    name: 'Christmas',
    when: 'Har saal 25 December',
    where: 'Poori duniya mein; Bharat mein Goa, Kerala, North-East aur bade shehron mein khaas dhoom',
    intro: 'Christmas Yeshu (Jesus Christ) ke janm ki khushi mein manaya jaane wala tyohar hai. Aaj ye sirf Isai samudaay ka nahi, balki har us insaan ka tyohar ban gaya hai jo pyaar, baantne aur naye saal ki umeed mein vishwas rakhta hai.',
    sections: [
      { h: 'Christmas kyun manate hain', p: ['Isai manyata ke anusaar Yeshu ka janm Bethlehem mein ek saadharan gaushala mein hua tha. Unka sandesh tha — ek-doosre se pyaar karo, zaroorat-mand ki madad karo aur maaf karna seekho. Christmas isi sandesh ko yaad karne ka din hai.', '25 December ki tareekh chauthi sadi se Rome mein manayi jaane lagi aur dheere-dheere poori duniya mein yahi tareekh apna li gayi.'] },
      { h: 'Kaise manate hain', p: ['24 December ki raat "Christmas Eve" hoti hai. Churchon mein aadhi raat ki prarthana (midnight mass) hoti hai aur carols gaaye jaate hain.', 'Gharon mein Christmas tree sajaya jaata hai — us par taare, ghantiyan, rang-birangi lights aur chhote tohfe latkaye jaate hain. Bachchon ke liye Santa Claus tohfe laate hain, ye kahani har bachche ki pasandeeda hai.', 'Bharat mein plum cake, cookies aur Goa-Kerala mein khaas pakwan bante hain. Log ek-doosre ke ghar mithai aur cake bhejte hain.'] },
      { h: 'Is Christmas kuch achha karo', p: ['Kisi anaathaalay ya vriddhashram mein thoda samay bitao, purane garam kapde zaroorat-mandon ko do, ya kisi akele padosi ko cake de aao. Christmas ka asli matlab yahi hai.'] },
    ],
    wishes: [
      'Christmas ka ye paavan din aapke ghar mein khushiyon ki roshni aur dil mein sukoon le kar aaye. Merry Christmas!',
      'Santa aapki har chhoti-badi khwaahish poori kare aur aane wala saal pyaar se bhara rahe. Merry Christmas!',
      'Cake ki mithaas, carols ki dhun aur apno ka saath — yahi hai Christmas. Aapko aur aapke parivaar ko dher saari shubhkamnayein.',
      'Yeshu ke prem aur karuna ka sandesh hamesha aapke saath rahe. Christmas ki haardik badhaai!',
      'Christmas tree ki roshni jaisi chamak aapki zindagi mein hamesha bani rahe. Merry Christmas!',
    ],
    faq: [
      { q: 'Christmas kis tareekh ko aata hai?', a: 'Christmas har saal 25 December ko manaya jaata hai. 24 December ki shaam "Christmas Eve" kehlaati hai.' },
      { q: 'Christmas tree kyun sajate hain?', a: 'Sadabahar ped sardiyon mein bhi hara rehta hai, isliye ise jeevan aur umeed ka prateek maana jaata hai. Saja hua ped ghar mein khushi aur raunak laata hai.' },
      { q: 'Bharat mein Christmas kahan sabse zyada manaya jaata hai?', a: 'Goa, Kerala, Mizoram, Nagaland, Meghalaya aur Mumbai, Kolkata, Bengaluru jaise shehron mein.' },
    ],
  },
  'new-year': {
    name: 'New Year',
    when: 'Har saal 1 January (31 December ki raat se jashn)',
    where: 'Poori duniya',
    intro: 'Naya saal Gregorian calendar ke pehle din, 1 January ko manaya jaata hai. Ye beete saal ko thank you kehne aur aane wale saal ke liye naye iraade banane ka din hai.',
    sections: [
      { h: 'Naye saal ka jashn', p: ['31 December ki raat log parivaar aur doston ke saath ikattha hote hain aur theek aadhi raat ko countdown ke saath naye saal ka swagat karte hain. Aatishbaazi, music aur "Happy New Year" ke messages is raat ki pehchaan hain.', 'Bharat mein kai log saal ke pehle din mandir, gurudwara, masjid ya church jaa kar naye saal ki shuruaat karte hain.'] },
      { h: 'Naye saal ke sankalp (Resolutions)', p: ['Naya saal apne liye chhote-chhote goals tay karne ka achha mauka hai — roz tehelna, har mahine kuch paise bachana, koi nayi bhasha ya hunar seekhna. Sankalp chhote aur saaf rakho, to nibhaana aasaan hota hai.', 'Kharche pe nazar rakhna bhi ek achha sankalp hai — iske liye hamara free app Hisab Kitab use kar sakte ho.'] },
      { h: 'Bharat ke doosre nav varsh', p: ['Bharat mein kai kshetriya nav varsh bhi manaye jaate hain — jaise Chaitra Shukla Pratipada (Hindu Nav Samvatsar), Gudi Padwa, Ugadi, Baisakhi, Pohela Boishakh, Puthandu aur Vishu. Ye zyadatar March-April mein aate hain.'] },
    ],
    wishes: [
      'Naya saal aapke liye nayi umeedein, nayi kaamyaabi aur dher saari khushiyan le kar aaye. Happy New Year!',
      'Beete saal ki yaadein meethi rahein aur aane wala saal usse bhi behtar ho. Naya saal mubarak!',
      'Har din ek naya mauka hai, aur ye saal aise 365 mauke le kar aaya hai. Happy New Year!',
      'Aapke ghar mein sehat, sukoon aur samriddhi bani rahe. Naye saal ki bahut-bahut badhaai!',
      'Purane gile-shikwe bhool kar naye saal mein nayi shuruaat karein. Happy New Year!',
    ],
    faq: [
      { q: 'Naya saal 1 January ko hi kyun manate hain?', a: 'Aaj duniya bhar mein Gregorian calendar chalta hai, jiska pehla din 1 January hai. Isliye international naya saal isi din manaya jaata hai.' },
      { q: 'Hindu nav varsh kab hota hai?', a: 'Hindu Nav Samvatsar Chaitra maas ke shukla paksh ki pratipada ko shuru hota hai, jo aam taur pe March ya April mein padti hai.' },
    ],
  },
  lohri: {
    name: 'Lohri',
    when: 'Aam taur pe 13 January (Makar Sankranti se ek din pehle)',
    where: 'Punjab, Haryana, Himachal Pradesh, Jammu aur Delhi',
    intro: 'Lohri sardiyon ki vidaai aur nayi fasal ki khushi ka tyohar hai. Is raat log aag (alaav) ke chaaron taraf ikattha ho kar geet gaate hain, bhangra-giddha karte hain aur til, gud, rewri, moongphali aur popcorn aag mein arpit karte hain.',
    sections: [
      { h: 'Lohri ka mahatva', p: ['Lohri ke aas-paas sabse lambi sard raatein khatm hone lagti hain aur din bade hone lagte hain. Kisaanon ke liye ye rabi ki fasal (khaas kar ganne) ki khushi ka samay hai.', 'Jis ghar mein nayi shaadi hui ho ya bachche ka janm hua ho, wahan pehli Lohri bahut dhoom-dhaam se manayi jaati hai.'] },
      { h: 'Dulla Bhatti ki kahani', p: ['Lohri ke geeton mein "Sundar mundriye ho, tera kaun vichara, Dulla Bhatti wala" zaroor gaaya jaata hai. Lok-katha ke anusaar Dulla Bhatti Mughal kaal ka ek bahadur Punjabi tha, jisne gareeb ladkiyon ko bachaya aur unki shaadi karwayi. Isliye use Lohri pe yaad kiya jaata hai.'] },
      { h: 'Lohri pe kya khaate hain', p: ['Til aur gud ki rewri, gajak, moongphali, bhune makke ke daane (popcorn), aur khaane mein sarson ka saag aur makki di roti.'] },
    ],
    wishes: [
      'Lohri ki aag mein saare dukh jal jaayein aur zindagi mein gud jaisi mithaas aaye. Lohri diyan lakh-lakh vadhaiyan!',
      'Rewri, gajak, moongphali aur apno ka saath — aapko aur aapke parivaar ko Happy Lohri!',
      'Nayi fasal ki tarah aapki khushiyan bhi lehlahaati rahein. Lohri ki haardik shubhkamnayein!',
      'Alaav ki garmaahat aapke rishton mein bhi bani rahe. Happy Lohri!',
    ],
    faq: [
      { q: 'Lohri kab manayi jaati hai?', a: 'Lohri Makar Sankranti se ek raat pehle manayi jaati hai, jo aam taur pe 13 January hoti hai.' },
      { q: 'Lohri mein aag mein kya daalte hain?', a: 'Til, gud, rewri, moongphali aur popcorn agni ko arpit kiye jaate hain aur phir prasad ke roop mein baante jaate hain.' },
    ],
  },
  'makar-sankranti': {
    name: 'Makar Sankranti',
    when: 'Aam taur pe 14 January (kuch saalon mein 15 January)',
    where: 'Poore Bharat mein — alag-alag naamon se',
    intro: 'Makar Sankranti woh din hai jab Surya Dhanu rashi se Makar rashi mein pravesh karta hai. Ye un gine-chune Hindu tyoharon mein se hai jo Surya ki chaal se tay hote hain, isliye iski tareekh lagbhag har saal ek jaisi rehti hai.',
    sections: [
      { h: 'Uttarayan aur iska mahatva', p: ['Is din se Surya ki uttar disha ki yatra (Uttarayan) shuru maani jaati hai aur din dheere-dheere bade hone lagte hain. Ise shubh samay maana jaata hai — log Ganga ya pavitra nadiyon mein snaan karte hain aur til, gud, khichdi, kambal waghera ka daan karte hain.'] },
      { h: 'Ek tyohar, kai naam', p: ['Gujarat mein ise Uttarayan kehte hain aur poora aasmaan patangon se bhar jaata hai. Tamil Nadu mein yahi samay Pongal ka hai, Assam mein Magh Bihu (Bhogali Bihu), UP aur Bihar mein Khichdi, aur Maharashtra mein log tilgul baantte hue kehte hain — "Tilgul ghya, god god bola" (til-gud lo aur meetha-meetha bolo).'] },
      { h: 'Til-gud kyun', p: ['Sardiyon mein til aur gud shareer ko garmi aur taakat dete hain. Til-gud baantna rishton mein mithaas banaye rakhne ka prateek bhi hai.', 'Patang udaate samay Chinese manjhe se bacho — ye pakshiyon aur raahgeeron ke liye jaanleva hota hai, aur kai rajyon mein is pe rok hai.'] },
    ],
    wishes: [
      'Til-gud ki mithaas aur patang ki oonchai jaisi aapki kaamyaabi ho. Makar Sankranti ki haardik shubhkamnayein!',
      'Surya Dev aapke jeevan ko roshni aur oorja se bhar dein. Happy Makar Sankranti!',
      'Tilgul ghya, god god bola! Aapko aur aapke parivaar ko Sankranti ki badhaai.',
      'Aasmaan mein udti patang ki tarah aapke sapne bhi oonche udein. Happy Uttarayan!',
    ],
    faq: [
      { q: 'Makar Sankranti ki tareekh lagbhag ek jaisi kyun rehti hai?', a: 'Kyunki ye chandrama se nahi, Surya ke Makar rashi mein pravesh se tay hoti hai. Isliye ye zyadatar 14 January ko aur kabhi-kabhi 15 January ko padti hai.' },
      { q: 'Sankranti pe kya daan karte hain?', a: 'Til, gud, khichdi (chawal-daal), kambal aur garam kapde daan karne ki parampara hai.' },
    ],
  },
  'republic-day': {
    name: 'Republic Day',
    when: 'Har saal 26 January',
    where: 'Poora Bharat — rashtriya parv',
    intro: '26 January 1950 ko Bharat ka Samvidhan lagoo hua aur Bharat ek samprabhu, loktantrik ganrajya bana. Gantantra Diwas isi aitihasik din ki yaad mein manaya jaata hai.',
    sections: [
      { h: 'Samvidhan ki kahani', p: ['Samvidhan Sabha ne lagbhag teen saal ki mehnat ke baad 26 November 1949 ko Samvidhan apnaya (is din ko ab Samvidhan Diwas kehte hain). Drafting committee ke adhyaksh Dr. Bhimrao Ambedkar the.', '26 January ki tareekh isliye chuni gayi kyunki 26 January 1930 ko Congress ne "Poorna Swaraj" ka sankalp liya tha.'] },
      { h: 'Kaise manate hain', p: ['Nayi Dilli mein Kartavya Path pe bhavya parade hoti hai, jisme sena ki tukdiyan, rajyon ki jhaankiyan aur saanskritik karyakram dikhaye jaate hain. Is din Rashtrapati tiranga fehraate hain.', 'Schools aur offices mein jhanda fehraya jaata hai, rashtragaan gaaya jaata hai aur deshbhakti ke karyakram hote hain.'] },
      { h: 'Tirange ka samman', p: ['Jhanda fehraate samay kesariya rang upar rahe, jhanda zameen ko na chhuye aur kata-phata na ho. Karyakram ke baad kaagaz ke jhande sadak pe na phenkein, unhe samman se sambhaal kar rakhein.'] },
    ],
    wishes: [
      'Aaiye, apne Samvidhan aur tirange pe garv karein. Gantantra Diwas ki haardik shubhkamnayein! Jai Hind!',
      'Azaadi hamein viraasat mein mili, Samvidhan ne use disha di. Republic Day ki badhaai!',
      'Desh ke liye jeene ka sankalp lein — imaandaari, ekta aur bhaichaare ke saath. Happy Republic Day!',
      'Teen rangon mein basi hai hamari pehchaan. Gantantra Diwas mubarak! Jai Hind, Jai Bharat.',
    ],
    faq: [
      { q: 'Republic Day aur Independence Day mein kya farq hai?', a: 'Independence Day (15 August) 1947 mein angrezi shaasan se azaadi ka din hai. Republic Day (26 January) 1950 mein Samvidhan lagoo hone ka din hai.' },
      { q: '26 January ko jhanda kaun fehraata hai?', a: 'Gantantra Diwas pe Rashtrapati tiranga fehraate hain; Swatantrata Diwas pe Pradhan Mantri Laal Qile se jhanda fehraate hain.' },
    ],
  },
  'vasant-panchami': {
    name: 'Vasant Panchami',
    when: 'Magh maas ke shukla paksh ki Panchami (aam taur pe January ke aakhir ya February mein)',
    where: 'Uttar aur Poorvi Bharat mein khaas; Bengal mein Saraswati Puja ke roop mein',
    intro: 'Vasant Panchami vasant ritu ke aagman aur gyaan ki devi Maa Saraswati ki puja ka din hai. Is din peela rang pehenne aur peele pakwan banane ki parampara hai.',
    sections: [
      { h: 'Maa Saraswati ki puja', p: ['Maa Saraswati vidya, sangeet aur kala ki devi hain. Is din vidyarthi apni kitaabein, kalam aur vaadya yantra Maa ke saamne rakh kar puja karte hain. Bengal, Bihar aur Odisha mein school-college mein Saraswati Puja bade utsaah se hoti hai.', 'Kai parivaron mein chhote bachchon ka "vidyarambh" (pehli baar akshar likhwaana) isi din karwaya jaata hai.'] },
      { h: 'Peela rang kyun', p: ['Vasant mein sarson ke khet peele phoolon se bhar jaate hain. Peela rang oorja, ujaale aur gyaan ka prateek maana jaata hai, isliye log peele kapde pehente hain aur kesariya bhaat, boondi ya peele chawal banate hain.'] },
      { h: 'Patang aur vasant utsav', p: ['Punjab aur aas-paas ke ilaakon mein Vasant Panchami pe bhi patangbaazi hoti hai. Kai jagah sangeet aur kavita ke karyakram rakhe jaate hain.'] },
    ],
    wishes: [
      'Maa Saraswati aapko gyaan, buddhi aur safalta ka aashirwaad dein. Vasant Panchami ki haardik shubhkamnayein!',
      'Peele phoolon ki tarah aapki zindagi bhi khilkhilaati rahe. Happy Vasant Panchami!',
      'Vidya ki devi aapki har pariksha aasaan karein. Saraswati Puja ki shubhkamnayein!',
      'Vasant ki taazgi aur Maa Saraswati ka aashirwaad sada aapke saath rahe.',
    ],
    faq: [
      { q: 'Vasant Panchami kis tithi ko hoti hai?', a: 'Magh maas ke shukla paksh ki Panchami tithi ko. English calendar mein ye har saal badalti hai, aam taur pe January ke aakhir ya February mein.' },
      { q: 'Is din peela rang kyun pehente hain?', a: 'Peela rang vasant, sarson ke phool aur gyaan ka prateek hai, aur Maa Saraswati ko priya maana jaata hai.' },
    ],
  },
  'maha-shivratri': {
    name: 'Maha Shivratri',
    when: 'Phalgun maas ke krishna paksh ki Chaturdashi (aam taur pe February ya March)',
    where: 'Poore Bharat aur Nepal mein',
    intro: 'Maha Shivratri Bhagwan Shiv ki aaradhana ki sabse badi raat hai. Maanyata hai ki isi raat Shiv aur Parvati ka vivah hua tha. Bhakt is din upvaas rakhte hain aur raat bhar jaag kar Shiv ka dhyaan karte hain.',
    sections: [
      { h: 'Puja kaise karte hain', p: ['Shivling pe jal, doodh, dahi, shahad aur Gangajal se abhishek kiya jaata hai. Belpatra, dhatura, aak ke phool aur bhaang arpit kiye jaate hain. "Om Namah Shivaya" mantra ka jaap kiya jaata hai.', 'Raat ko chaar prahar ki puja hoti hai aur kai mandiron mein poori raat bhajan-kirtan chalta hai.'] },
      { h: 'Upvaas', p: ['Kai log nirjala vrat rakhte hain, to kai phal, doodh aur sabudana-kuttu jaise vrat ke khaane lete hain. Buzurg, beemar ya garbhvati mahilayein apni sehat ke hisaab se hi vrat rakhein.'] },
      { h: 'Prasiddh sthaan', p: ['Kashi Vishwanath (Varanasi), Ujjain ke Mahakaleshwar, Somnath, Nepal ke Pashupatinath aur desh ke baarah jyotirlingon pe is din bhaari bheed hoti hai.'] },
    ],
    wishes: [
      'Bholenath ki kripa se aapke saare kasht door hon. Maha Shivratri ki haardik shubhkamnayein! Har Har Mahadev!',
      'Om Namah Shivaya — Shiv aapko shakti, shaanti aur sadbuddhi dein. Happy Maha Shivratri!',
      'Mahadev ka aashirwaad aapke parivaar pe sada bana rahe. Bam Bam Bhole!',
      'Shiv-Parvati ka prem aapke ghar mein bhi base. Maha Shivratri ki badhaai!',
    ],
    faq: [
      { q: 'Maha Shivratri aur masik Shivratri mein kya farq hai?', a: 'Har mahine krishna paksh ki Chaturdashi ko masik Shivratri hoti hai. Phalgun maas wali Shivratri sabse badi maani jaati hai, isliye use Maha Shivratri kehte hain.' },
      { q: 'Shivling pe kya chadhate hain?', a: 'Jal, doodh, belpatra, dhatura, aak ke phool, chandan aur bhasm. Tulsi aam taur pe Shivling pe nahi chadhayi jaati.' },
    ],
  },
  holi: {
    name: 'Holi',
    when: 'Phalgun Purnima pe Holika Dahan, agle din rangon wali Holi (aam taur pe March)',
    where: 'Poore Bharat aur Nepal mein; Braj (Mathura-Vrindavan-Barsana) ki Holi sabse mashhoor',
    intro: 'Holi rangon, masti aur bhaichaare ka tyohar hai. Ye burai pe achhai ki jeet aur vasant ke swagat ka parv hai. Is din log purane gile-shikwe bhool kar ek-doosre ko rang lagaate aur gale milte hain.',
    sections: [
      { h: 'Holika Dahan aur Prahlad ki katha', p: ['Raja Hiranyakashipu chahta tha ki sab uski puja karein, lekin uska beta Prahlad Bhagwan Vishnu ka bhakt tha. Raja ki behen Holika ko aag mein na jalne ka vardaan tha. Woh Prahlad ko god mein le kar aag mein baithi, par Bhagwan ki kripa se Prahlad bach gaye aur Holika jal gayi.', 'Isi yaad mein Holi se ek raat pehle Holika Dahan kiya jaata hai — lakdi aur uplon ka dher jala kar uski parikrama ki jaati hai.'] },
      { h: 'Rangon wali Holi', p: ['Agle din (Dhulandi) subah se rang, gulaal aur paani se Holi kheli jaati hai. Braj mein Holi kai dinon tak chalti hai — Barsana ki Lathmar Holi, Vrindavan ki phoolon wali Holi aur Mathura ki Holi duniya bhar mein mashhoor hain.'] },
      { h: 'Pakwan', p: ['Gujiya, dahi-bhalle, malpua, papdi, namakpare aur thandai Holi ki pehchaan hain.'] },
      { h: 'Surakshit Holi', p: ['Natural ya herbal rang use karo, aankhon aur munh mein rang jaane se bacho, jaanwaron pe rang mat daalo aur paani ki barbaadi kam karo. Jo rang nahi lagwana chahta, uski marzi ka samman karo.'] },
    ],
    wishes: [
      'Rangon ki tarah aapki zindagi bhi khushiyon se rangeen rahe. Holi ki haardik shubhkamnayein!',
      'Gujiya ki mithaas, gulaal ki khushboo aur apno ka pyaar — Happy Holi!',
      'Holika ki aag mein saari buraiyan jal jaayein aur rishton mein naye rang bhar jaayein. Holi mubarak!',
      'Bura na mano Holi hai! Aapko aur aapke parivaar ko rangon ke tyohar ki badhaai.',
      'Is Holi purane gile-shikwe bhool kar gale milo. Happy Holi!',
    ],
    faq: [
      { q: 'Holika Dahan kab hota hai?', a: 'Phalgun Purnima ki raat, rangon wali Holi se ek din pehle. Sahi muhurat panchang ke anusaar dekha jaata hai.' },
      { q: 'Lathmar Holi kahan hoti hai?', a: 'Uttar Pradesh ke Barsana aur Nandgaon mein, jahan mahilayein hansi-mazaak mein purushon pe laathiyan barsaati hain aur purush dhaal se bachte hain.' },
      { q: 'Skin se Holi ka rang kaise chhudaayein?', a: 'Khelne se pehle chehre aur baalon pe nariyal ya sarson ka tel laga lo. Baad mein halke saabun aur besan-dahi se dho, zor se mat ragdo.' },
    ],
  },
  'eid-ul-fitr': {
    name: 'Eid ul-Fitr',
    when: 'Shawwal mahine ki pehli tareekh — Ramzan ke baad chaand dikhne pe (English tareekh har saal lagbhag 10-11 din pehle aati hai)',
    where: 'Poori duniya ke Muslim samudaay mein; Bharat mein har jagah',
    intro: 'Eid ul-Fitr Ramzan ke ek mahine ke rozon ke baad aane wali khushi ki Eid hai. Ise "Meethi Eid" bhi kehte hain, kyunki is din har ghar mein sewaiyan aur mithaiyan banti hain.',
    sections: [
      { h: 'Ramzan aur Eid', p: ['Islami (Hijri) calendar ke nauvein mahine Ramzan mein Musalmaan subah se shaam tak roza rakhte hain, zyada ibaadat karte hain aur zaroorat-mandon ki madad karte hain. Ramzan khatm hone pe Shawwal ka chaand dikhte hi agle din Eid manayi jaati hai.', 'Hijri calendar chaand pe chalta hai, isliye Eid ki English tareekh har saal lagbhag 10-11 din pehle khisak jaati hai.'] },
      { h: 'Eid ka din', p: ['Subah log naha-dho kar naye kapde pehente hain, kuch meetha khaate hain aur Eidgah ya masjid mein Eid ki namaz padhte hain. Namaz se pehle "fitra" (Zakat-ul-Fitr) dena zaroori hai, taaki gareeb parivaar bhi Eid mana sakein.', 'Namaz ke baad log gale mil kar "Eid Mubarak" kehte hain. Bade bachchon ko "Eidi" dete hain aur doston-rishtedaaron ke ghar aana-jaana hota hai.'] },
      { h: 'Pakwan', p: ['Sheer khurma, kimami sewaiyan, doodh wali sewaiyan, biryani aur kebab Eid ki daawat ki shaan hain.'] },
    ],
    wishes: [
      'Allah aapki har dua qubool kare aur aapke ghar mein barkat bani rahe. Eid Mubarak!',
      'Sewaiyon ki mithaas aapke rishton mein bhi ghul jaaye. Aapko aur aapke parivaar ko Eid ul-Fitr Mubarak!',
      'Chaand ki roshni aapki zindagi ko khushiyon se roshan kare. Eid Mubarak!',
      'Rozon ki barkat aur Eid ki khushiyan aapke saath hamesha rahein. Eid ki dili mubarakbaad!',
    ],
    faq: [
      { q: 'Eid ul-Fitr aur Eid ul-Adha mein kya farq hai?', a: 'Eid ul-Fitr Ramzan ke baad manayi jaati hai (Meethi Eid). Eid ul-Adha (Bakrid) lagbhag do mahine baad, Zilhijja mahine mein Hajj ke samay manayi jaati hai.' },
      { q: 'Fitra kya hai?', a: 'Eid ki namaz se pehle har saksham Musalmaan ki taraf se gareebon ko diya jaane wala daan, taaki woh bhi Eid mana sakein.' },
    ],
  },
  'ram-navami': {
    name: 'Ram Navami',
    when: 'Chaitra maas ke shukla paksh ki Navami (aam taur pe March ya April)',
    where: 'Poore Bharat mein; Ayodhya mein sabse bada utsav',
    intro: 'Ram Navami Bhagwan Shri Ram ke janm ka utsav hai. Maanyata ke anusaar Shri Ram ka janm Ayodhya mein Raja Dashrath aur Mata Kaushalya ke ghar Chaitra Shukla Navami ko dopahar ke samay hua tha. Isi din Chaitra Navratri ka samaapan bhi hota hai.',
    sections: [
      { h: 'Maryada Purushottam', p: ['Shri Ram ko "Maryada Purushottam" kaha jaata hai — yaani aisa aadarsh insaan jisne har rishte aur kartavya ko poori imaandaari se nibhaya. Pita ke vachan ke liye 14 saal ka vanvaas sweekar karna unke charitra ki sabse badi misaal hai.'] },
      { h: 'Kaise manate hain', p: ['Mandiron mein dopahar ke samay Ram-janm ki aarti hoti hai, Ramcharitmanas ka paath aur bhajan-kirtan hote hain. Kai jagah shobha yatrayein nikalti hain. Bhakt upvaas rakhte hain aur panjiri, panchamrit aur phal ka prasad baantte hain.', 'Jo log Chaitra Navratri rakhte hain, woh is din kanya pujan karke vrat kholte hain.'] },
    ],
    wishes: [
      'Prabhu Shri Ram aapke jeevan mein sukh, shaanti aur maryada ka aashirwaad dein. Ram Navami ki haardik shubhkamnayein! Jai Shri Ram!',
      'Raghukul reet sada chali aayi, praan jaayi par vachan na jaayi. Ram Navami ki badhaai!',
      'Shri Ram ki kripa se aapke saare kaam safal hon. Jai Siyaram!',
      'Ram ka naam, Ram ka kaam — aapke ghar mein sada bana rahe mangal. Happy Ram Navami!',
    ],
    faq: [
      { q: 'Ram Navami kis tithi ko hoti hai?', a: 'Chaitra maas ke shukla paksh ki Navami tithi ko, jo aam taur pe March ya April mein padti hai.' },
      { q: 'Ram Navami pe puja kis samay hoti hai?', a: 'Maanyata hai ki Shri Ram ka janm madhyaahn (dopahar) mein hua tha, isliye mukhya puja aur aarti dopahar ke samay hoti hai.' },
    ],
  },
  'raksha-bandhan': {
    name: 'Raksha Bandhan',
    when: 'Shravan maas ki Purnima (aam taur pe August)',
    where: 'Poore Bharat aur Nepal mein',
    intro: 'Raksha Bandhan bhai-behen ke pyaar aur bharose ka tyohar hai. Behen bhai ki kalaai pe rakhi baandhti hai aur uski lambi umar ki dua karti hai; bhai hamesha saath nibhaane ka vaada karta hai.',
    sections: [
      { h: 'Rakhi ki parampara', p: ['Subah behen puja ki thaali sajaati hai — roli, akshat (chawal), diya, mithai aur rakhi. Bhai ke maathe pe tilak laga kar, aarti karke rakhi baandhi jaati hai aur mithai khilaayi jaati hai. Bhai behen ko tohfa deta hai.', 'Rakhi baandhte samay panchang mein "Bhadra kaal" dekha jaata hai, kyunki us samay rakhi baandhna shubh nahi maana jaata.'] },
      { h: 'Kahaniyan', p: ['Mahabharat ki katha mein Shishupal vadh ke samay Shri Krishna ki ungli kat gayi thi, tab Draupadi ne apni saadi ka tukda baandha. Shri Krishna ne cheerharan ke samay unki laaj bacha kar ye vachan nibhaya.', 'Aaj Raksha Bandhan sirf sage bhai-behen tak seemit nahi hai — log cousins, doston, sainikon aur pedon ko bhi rakhi baandhte hain.'] },
    ],
    wishes: [
      'Rakhi ka ye dhaaga hamare rishte ko aur mazboot kare. Raksha Bandhan ki haardik shubhkamnayein!',
      'Bachpan ki ladaiyan aur dher saara pyaar — mere pyaare bhai/behen ko Happy Raksha Bandhan!',
      'Door ho ya paas, tumhara saath hamesha mere saath hai. Rakhi mubarak!',
      'Bhai-behen ka ye pyaar sada bana rahe. Raksha Bandhan ki badhaai!',
    ],
    faq: [
      { q: 'Raksha Bandhan kis din hota hai?', a: 'Shravan maas ki Purnima ko, jo aam taur pe August mein padti hai.' },
      { q: 'Bhadra kaal mein rakhi kyun nahi baandhte?', a: 'Panchang mein Bhadra kaal ko shubh kaamon ke liye ashubh maana jaata hai, isliye rakhi Bhadra khatm hone ke baad baandhi jaati hai.' },
    ],
  },
  'chhath-puja': {
    name: 'Chhath Puja',
    when: 'Kartik Shukla Chaturthi se Saptami tak, Diwali ke chhah din baad (2026 mein 13–16 November)',
    where: 'Bihar, Jharkhand, poorvi UP aur Nepal ke Terai mein sabse bada; Delhi, Mumbai, Kolkata aur videsh mein bhi',
    intro: 'Chhath Puja Surya Dev aur Chhathi Maiya ki upasana ka chaar din ka mahaparv hai. Isme vrati lagbhag 36 ghante ka nirjala vrat rakh ke nadi ya taalaab mein khade ho kar doobte aur phir ugte suraj ko arghya dete hain. Ye prakriti, saaf-safaai aur anushaasan ka tyohar maana jaata hai — isme na koi murti zaroori hai, na purohit.',
    sections: [
      { h: 'Chaar din ki puja', p: ['Pehla din — Nahay-Khay: vrati nadi ya taalaab mein snaan karte hain aur ghar saaf karke saattvik khaana — kaddu-bhaat aur chane ki daal — ek baar khaate hain.', 'Doosra din — Kharna: din bhar upvaas ke baad shaam ko gud ki kheer (rasiya) aur roti ka prasad banta hai. Prasad khaane ke baad se lagbhag 36 ghante ka nirjala vrat shuru hota hai.', 'Teesra din — Sandhya Arghya: shaam ko parivaar thekua, phal aur ganne se saje baans ke soop aur daura le ke ghat pe jaata hai. Vrati paani mein khade ho kar doobte suraj ko arghya dete hain.', 'Chautha din — Usha Arghya: bhor se pehle phir ghat pe pahunch ke ugte suraj ko arghya diya jaata hai. Iske baad prasad kha ke vrat khola jaata hai, jise parana kehte hain.'] },
      { h: 'Thekua, soop aur kosi', p: ['Thekua Chhath ka sabse khaas prasad hai — gehun ke aate, gud aur ghee se bana, saanche pe daba ke tala hua. Iske saath kela, nariyal, ganna, singhaada, daabh nimbu aur mausami phal soop mein rakhe jaate hain.', 'Kai gharon mein Sandhya Arghya ki raat aangan ya ghat pe kosi bhari jaati hai — ganne ke gatthar se chhatra jaisa bana ke uske neeche mitti ke diye aur prasad rakhe jaate hain. "Kelwa ke paat par ugelan Suraj Mal" aur "Kaanch hi baans ke bahangiya" jaise paaramparik Chhath geet poori raat gaaye jaate hain.'] },
      { h: 'Chhath kyun khaas hai', p: ['Chhath mein doobte suraj ki bhi puja hoti hai — ye sikhaata hai ki dhalte waqt ka bhi samman karo. Ghaaton ki safaai poora mohalla mil ke karta hai, aur ameer-gareeb sab ek hi ghat pe ek jaisa arghya dete hain.', 'Vrat bahut kathin hota hai, isliye buzurgon, beemaaron aur garbhwati mahilaon ko doctor aur ghar ke badon ki salaah se hi vrat rakhna chahiye. Ghat pe bachchon ko gehre paani se door rakhein.'] },
    ],
    wishes: [
      'Chhathi Maiya aapke ghar-aangan ko sukh, samriddhi aur khushiyon se bhar dein. Chhath Puja ki haardik shubhkamnayein!',
      'Ugte suraj ki laali aapke jeevan mein nayi roshni laaye. Chhath mahaparv ki dher saari badhaai!',
      'Thekua ki mithaas, ganne ka ras aur ghat ki raunak — Chhath Puja ki shubhkamnayein! Jai Chhathi Maiya.',
      'Surya Dev aapko achhi sehat aur lambi umar dein. Aapka vrat safal ho — Chhath Puja mubarak!',
    ],
    faq: [
      { q: 'Chhath Puja 2026 mein kab hai?', a: 'Nahay-Khay 13 November, Kharna 14 November, Sandhya Arghya 15 November (Raviwar) aur Usha Arghya 16 November (Somwar) ko hai. Arghya ka samay apne shehar ke sooryast-sooryoday ke hisaab se local panchang se dekhein.' },
      { q: 'Kharna kya hota hai?', a: 'Chhath ka doosra din, jab vrati din bhar upvaas ke baad shaam ko gud ki kheer aur roti ka prasad khaate hain. Iske baad se nirjala vrat shuru hota hai.' },
      { q: 'Thekua kaise banta hai?', a: 'Gehun ka aata, gud ka ghol, ghee aur thodi saunf/nariyal mila ke sakht aata goondhte hain, saanche pe daba ke aakaar dete hain aur dheemi aanch pe ghee ya tel mein sunehra hone tak talte hain.' },
    ],
  },
  'guru-nanak-jayanti': {
    name: 'Guru Nanak Jayanti',
    when: 'Kartik Purnima (aam taur pe November); ise Gurpurab ya Prakash Parv bhi kehte hain',
    where: 'Poore Bharat aur duniya bhar ke Sikh samudaay mein; Punjab mein sabse bada utsav',
    intro: 'Guru Nanak Jayanti Sikh dharm ke sansthaapak aur pehle Guru, Guru Nanak Dev Ji ke prakash (janm) ka parv hai. Ise Gurpurab ya Prakash Parv bhi kaha jaata hai aur ye Sikh samudaay ka sabse bada tyohar maana jaata hai.',
    sections: [
      { h: 'Guru Nanak Dev Ji', p: ['Guru Nanak Dev Ji ka janm 1469 mein Rai Bhoi di Talwandi mein hua tha, jo aaj Pakistan mein Nankana Sahib ke naam se jaana jaata hai. Sikh parampara mein unka Prakash Parv Kartik Purnima ko manaya jaata hai.', 'Unhone "Ik Onkar" — yaani Ishwar ek hai — ka sandesh diya. Unki shikshaon ke teen mool siddhant maane jaate hain: Naam Japna (Ishwar ka smaran), Kirat Karni (imaandaari se mehnat ki kamaai) aur Vand Chhakna (apni kamaai zaroorat-mandon ke saath baantna). Unhone jaati-bhed aur oonch-neech ka virodh kiya aur sabko baraabar maana.'] },
      { h: 'Gurpurab kaise manate hain', p: ['Parv se do din pehle gurudwaron mein Akhand Path shuru hota hai — Guru Granth Sahib ka lagbhag 48 ghante tak bina ruke poora paath.', 'Ek din pehle Nagar Kirtan nikalta hai, jiski aguvaai Panj Pyare karte hain. Palki mein Guru Granth Sahib ko le jaaya jaata hai, sangat shabad-kirtan gaati hai aur gatka (Sikh martial art) ka pradarshan hota hai.', 'Tyohar se pehle ke dinon mein subah-subah Prabhat Pheriyan nikalti hain. Parv ke din gurudwaron mein kirtan, katha aur ardaas hoti hai, aur langar mein har dharm aur jaati ke log ek saath baith kar bhojan karte hain.'] },
      { h: 'Langar aur seva', p: ['Langar (saamudaayik rasoi) ki parampara Guru Nanak Dev Ji ne shuru ki thi. Yahan har koi zameen pe pangat mein baith kar ek jaisa bhojan karta hai — ameer-gareeb, kisi bhi dharm ka. Gurpurab pe bahut se log gurudware mein seva karte hain — rasoi mein madad, bartan dhona ya joote sambhaalna.'] },
    ],
    wishes: [
      'Guru Nanak Dev Ji ki kripa aap aur aapke parivaar pe sada bani rahe. Gurpurab diyan lakh-lakh vadhaiyan!',
      'Ik Onkar — Guru Ji ka sandesh aapke jeevan mein sachchai, seva aur prem bhare. Prakash Parv ki shubhkamnayein!',
      'Naam japo, kirat karo, vand chhako — Guru Nanak Jayanti ki haardik badhaai!',
      'Waheguru aapko chardi kala mein rakhein. Guru Nanak Dev Ji ke Prakash Parv ki dher saari shubhkamnayein!',
    ],
    faq: [
      { q: 'Guru Nanak Jayanti kab manayi jaati hai?', a: 'Kartik maas ki Purnima ko, jo aam taur pe November mein padti hai. English tareekh har saal badalti hai.' },
      { q: 'Akhand Path kya hai?', a: 'Guru Granth Sahib ka shuru se ant tak lagbhag 48 ghante mein bina ruke kiya jaane wala paath, jo Gurpurab se do din pehle shuru hota hai.' },
      { q: 'Gurpurab pe kya keh kar badhaai dete hain?', a: '"Gurpurab diyan lakh-lakh vadhaiyan" ya "Happy Gurpurab" — dono aam taur pe kahe jaate hain.' },
    ],
  },
  diwali: {
    name: 'Diwali',
    when: 'Kartik maas ki Amavasya (aam taur pe October ya November); Dhanteras se Bhai Dooj tak paanch din',
    where: 'Poore Bharat aur duniya bhar ke Bharatiyon mein',
    intro: 'Diwali (Deepawali) roshni ka tyohar hai — andhere pe ujaale aur burai pe achhai ki jeet ka parv. Is din ghar-ghar diye jalaaye jaate hain aur Maa Lakshmi aur Bhagwan Ganesh ki puja hoti hai.',
    sections: [
      { h: 'Diwali kyun manate hain', p: ['Maanyata hai ki Ravan pe vijay aur 14 saal ke vanvaas ke baad Shri Ram, Mata Sita aur Lakshman isi din Ayodhya laute the. Ayodhyavaasiyon ne diye jala kar unka swagat kiya tha.', 'Jain dharm mein ye Bhagwan Mahavir ke nirvaan ka din hai, aur Sikh dharm mein isi samay Bandi Chhor Diwas manaya jaata hai.'] },
      { h: 'Paanch din ka utsav', p: ['Dhanteras (bartan, sona-chaandi khareedne ka din), Narak Chaturdashi ya Chhoti Diwali, mukhya Diwali (Lakshmi-Ganesh puja), Govardhan Puja aur Bhai Dooj — ye paanch din mil kar Deepotsav banate hain.'] },
      { h: 'Taiyaari aur pakwan', p: ['Diwali se pehle ghar ki safaai aur sajaavat hoti hai, rangoli banayi jaati hai. Laddoo, kaju katli, shakkarpare, chakli aur gujiya jaise pakwan bante hain aur rishtedaaron mein mithai baanti jaati hai.', 'Patakhe kam chalao aur apne shehar ke niyam maano — hawa saaf rahegi aur jaanwar bhi darenge nahi.'] },
    ],
    wishes: [
      'Diyon ki roshni aapke ghar ke har kone ko khushiyon se bhar de. Diwali ki haardik shubhkamnayein!',
      'Maa Lakshmi ki kripa aur Ganesh Ji ka aashirwaad sada aap pe bana rahe. Shubh Deepawali!',
      'Mithai ki mithaas, rangoli ke rang aur apno ka saath — Happy Diwali!',
      'Is Diwali ek diya unke liye bhi jalao jinke ghar andhera hai. Aapko Deepawali ki badhaai!',
      'Andhere pe ujaale ki jeet ka ye parv aapki zindagi mein nayi roshni laaye. Shubh Diwali!',
    ],
    faq: [
      { q: 'Diwali ke paanch din kaun-kaun se hain?', a: 'Dhanteras, Narak Chaturdashi (Chhoti Diwali), Diwali (Lakshmi Puja), Govardhan Puja aur Bhai Dooj.' },
      { q: 'Diwali pe kiski puja hoti hai?', a: 'Mukhya roop se Maa Lakshmi (dhan aur samriddhi ki devi) aur Bhagwan Ganesh (shubh shuruaat ke devta) ki.' },
    ],
  },
};

const wishes = {
  'good-morning': {
    name: 'Good Morning',
    greet: 'Good Morning',
    intro: 'Subah ka ek chhota sa message kisi ka poora din achha bana sakta hai. Yahan Good Morning ke chhote, saade aur dil se likhe messages hain — family, doston aur office group ke liye.',
    about: [
      'Bharat mein subah-subah "Good Morning" bhejna ab roz ki aadat ban gayi hai. Maa-baap bachchon ko, dost doston ko aur rishtedaar family group mein din ki shuruaat ek meethe message se karte hain. Isse door reh kar bhi apnapan bana rehta hai.',
      'Achha Good Morning message chhota hota hai, usme koi achhi baat ya dua hoti hai, aur woh padhne wale ko muskurane ki wajah deta hai. Lambe forwards ya anjaan daavon wale messages bhejne se bacho — apna chhota sa message zyada asar karta hai.',
      'Ek chhota sujhav: roz ek hi message bhejne ke bajaye kabhi-kabhi saamne wale ka naam le kar likho, ya unke kisi kaam/exam/safar ke liye shubhkamna do. Neeche diye "Apna wish banao" button se aap apne naam ke saath link bhi bhej sakte ho.',
    ],
    wishes: [
      'Good Morning! Aaj ka din aapke liye nayi umeedein aur dher saari khushiyan le kar aaye.',
      'Good Morning! Chai ki pehli chuski jaisi taazgi aapke poore din mein bani rahe.',
      'Har subah ek naya mauka hai — aaj kuch achha karo, kuch achha socho. Suprabhat!',
      'Suraj ki pehli kiran aapke ghar mein sukh aur shaanti laaye. Good Morning!',
      'Muskura kar din ki shuruaat karo, baaki sab apne aap achha ho jaayega. Suprabhat!',
      'Kal jo hua use jaane do, aaj ka din aapka hai. Good Morning!',
      'Aapki sehat achhi rahe, kaam mein mann lage aur shaam tak mann khush rahe. Suprabhat!',
      'Ek pyaali chai, ek meethi muskaan aur aap — Good Morning!',
    ],
    faq: [
      { q: 'Good Morning kis samay bhejna chahiye?', a: 'Aam taur pe subah 6 se 10 baje ke beech. Office ya bade group mein bahut jaldi (subah 5 baje se pehle) message bhejne se bacho, taaki kisi ki neend na toote.' },
      { q: 'Suprabhat aur Shubh Prabhat mein kya farq hai?', a: 'Dono ka matlab "achhi subah" hai. Suprabhat zyada chalta hai, Shubh Prabhat thoda formal lagta hai.' },
    ],
  },
  birthday: {
    name: 'Birthday',
    greet: 'Janamdin ki dher saari shubhkamnayein',
    intro: 'Kisi ka birthday yaad rakhna aur unhe dil se wish karna — yahi sabse achha tohfa hai. Yahan Mummy-Papa, bhai-behen, dost, pati-patni aur colleagues ke liye birthday messages hain.',
    about: [
      'Birthday har insaan ke liye saal ka sabse khaas din hota hai. Is din mila ek chhota sa message bhi yaad reh jaata hai, khaas kar agar usme unka naam ho aur koi aisi baat ho jo sirf aap dono jaante ho.',
      'Message likhte samay rishte ka dhyaan rakho — maa-baap ke liye aadar aur dua, doston ke liye thodi masti, colleagues ke liye simple aur vinamra. Raat 12 baje bheja gaya pehla message hamesha khaas lagta hai!',
      'Neeche diye messages copy karo, ya "Apna wish banao" se apne naam ka link bana kar bhejo. Wish Card Maker se birthday ka card bhi bana sakte ho.',
    ],
    wishes: [
      'Janamdin mubarak ho! Aapki zindagi mein har din khushiyon se bhara rahe.',
      'Bhagwan aapko lambi umar, achhi sehat aur dher saari kaamyaabi dein. Happy Birthday!',
      'Cake meetha ho, dost pyaare hon aur aane wala saal aapka sabse achha saal ho. Birthday ki badhaai!',
      'Mummy, aap hamari duniya ho. Aapko janamdin ki bahut-bahut shubhkamnayein!',
      'Papa, aapki har seekh hamare saath hai. Happy Birthday, aap hamesha swasth raho!',
      'Bhai, ladaai bhi tujhse aur pyaar bhi tujhse — Happy Birthday!',
      'Dost, ek saal aur bade ho gaye, par dil abhi bhi bachchon jaisa rakhna. Happy Birthday!',
      'Aaj ka din sirf aapke naam — khoob muskurao! Janamdin mubarak.',
    ],
    faq: [
      { q: 'Birthday wish kab bhejein?', a: 'Kareebi logon ko raat 12 baje ya subah jaldi, baaki logon ko din mein kabhi bhi. Der ho jaaye to bhi "Belated Happy Birthday" bhejna achha lagta hai.' },
      { q: 'Hindi mein Happy Birthday kaise kehte hain?', a: '"Janamdin mubarak ho" ya "Janamdin ki haardik shubhkamnayein" — dono sahi aur chalte hain.' },
    ],
  },
  anniversary: {
    name: 'Shaadi ki Saalgirah',
    greet: 'shaadi ki saalgirah ki haardik shubhkamnayein',
    intro: 'Shaadi ki saalgirah saath bitaye saalon ka jashn hai. Yahan jeevansaathi, Mummy-Papa, bhaiya-bhabhi aur doston ke liye anniversary wishes hain.',
    about: [
      'Saalgirah pe sabse achha message woh hota hai jisme saath bitaye palon ki yaad ho aur aane wale saalon ke liye dua. Jeevansaathi ke liye dil ki baat likho, aur maa-baap ya rishtedaaron ke liye aadar aur aashirwaad wale shabd chuno.',
      'Maa-baap ki 25vin (Silver Jubilee) ya 50vin (Golden Jubilee) saalgirah pe parivaar aksar chhota sa karyakram rakhta hai — aise mauke pe purani photos ke saath card banana bahut pasand kiya jaata hai.',
    ],
    wishes: [
      'Shaadi ki saalgirah mubarak ho! Aapki jodi hamesha yun hi salaamat rahe.',
      'Saath bitaya har saal aapke pyaar ko aur gehra kare. Happy Anniversary!',
      'Mummy-Papa, aapka saath hamare liye sabse badi seekh hai. Saalgirah ki dher saari badhaai!',
      'Bhagwan aapki jodi ko har khushi aur lambi umar dein. Happy Anniversary!',
      'Tumhare saath har din tyohar jaisa hai. Happy Anniversary, mere humsafar!',
      'Bhaiya-Bhabhi, aapki jodi pe kisi ki nazar na lage! Happy Anniversary.',
    ],
    faq: [
      { q: '25vin aur 50vin saalgirah ko kya kehte hain?', a: '25vin saalgirah ko Silver Jubilee (Rajat Jayanti) aur 50vin ko Golden Jubilee (Swarn Jayanti) kehte hain.' },
      { q: 'Saalgirah aur varshgaanth mein kya farq hai?', a: 'Dono ka matlab ek hi hai — kisi khaas din ka har saal laut kar aana. Aam bolchaal mein shaadi ke liye "saalgirah" zyada kaha jaata hai.' },
    ],
  },
  'rajab-mubarak': {
    name: 'Rajab Mubarak',
    greet: 'Rajab ka mubarak mahina',
    intro: 'Rajab Islami calendar ka saatvaan mahina hai aur chaar hurmat wale (pavitra) mahinon mein se ek. Rajab ka chaand dikhte hi bahut se log ek-doosre ko "Rajab Mubarak" keh kar duaayein dete hain, kyunki iske baad Shaban aur phir Ramzan aata hai.',
    about: [
      'Quran (Surah Tauba 9:36) mein bataaya gaya hai ki Allah ke yahan saal mein baarah mahine hain, jinmein se chaar hurmat wale hain — Muharram, Rajab, Zil-Qad aur Zil-Hijja. In mahinon mein khaas taur pe zulm aur jhagde se bachne aur nek kaam badhaane ki taaleem di gayi hai.',
      'Bahut se Musalmaan Rajab ki 27vin raat ko Shab-e-Miraj manate hain — woh raat jisme Paigambar ﷺ ke Isra aur Miraj ke safar ka zikr hai. Alag-alag ilaakon aur maslakon mein ise manane ke tareeke alag hain, isliye har ek ki raay ka ehtaraam karo.',
      'Rajab mein kai log ye dua padhte hain: "Allahumma barik lana fi Rajab wa Shaban wa ballighna Ramadan" — ae Allah, hamare liye Rajab aur Shaban mein barkat de aur hamein Ramzan tak pahuncha. Ulema is riwaayat ki sanad ko kamzor batate hain, phir bhi ye dua ke taur pe aam taur pe padhi jaati hai.',
    ],
    wishes: [
      'Rajab Mubarak! Allah is paak mahine mein aapko aur aapke ghar waalon ko sehat, sukoon aur barkat de.',
      'Rajab ka chaand mubarak ho! Allah hamein Ramzan tak pahunchaaye aur nek amal ki taufeeq de.',
      'Hurmat wale is mahine mein Allah aapki har dua qubool kare. Rajab Mubarak!',
      'Rajab aa gaya, Ramzan kareeb hai — Allah hamare dilon ko neki se bhar de. Aameen. Rajab Mubarak!',
      'Is mubarak mahine mein hamein bhi apni duaon mein yaad rakhiyega. Rajab Mubarak!',
    ],
    faq: [
      { q: 'Rajab kaun sa mahina hai?', a: 'Rajab Islami (Hijri) calendar ka saatvaan mahina hai, jo Jamadi-ul-Akhir ke baad aur Shaban se pehle aata hai.' },
      { q: 'Hurmat wale chaar mahine kaun se hain?', a: 'Muharram, Rajab, Zil-Qad aur Zil-Hijja.' },
      { q: 'Rajab kab shuru hoga?', a: 'Chaand dikhne pe. 2026 mein ye lagbhag 10-11 December ko shuru hone ka andaaza hai — sahi tareekh apni masjid se poochho.' },
    ],
  },
  'jumma-mubarak': {
    name: 'Jumma Mubarak',
    greet: 'Jumma Mubarak',
    intro: 'Jumma (Friday) Islam mein hafte ka sabse mubarak din maana jaata hai. Is din dopahar mein masjidon mein Jumme ki namaz hoti hai aur log ek-doosre ko "Jumma Mubarak" keh kar duaayein dete hain.',
    about: [
      'Friday ko dopahar ki namaz (Zuhr) ki jagah jamaat ke saath Jumme ki namaz ada ki jaati hai, jisse pehle Imam khutba dete hain. Quran ki Surah Al-Jumu\'ah mein is namaz ka zikr hai.',
      'Is din ghusl karna, saaf kapde pehenna, khushboo lagana, jaldi masjid jaana, durood shareef padhna aur Surah Al-Kahf ki tilaawat karna achha maana jaata hai. Bahut se log is din khairaat bhi karte hain.',
      '"Jumma Mubarak" kehna ek pyaari parampara hai jisse bhaichaara badhta hai. Message bhejte samay adab aur saadgi ka dhyaan rakho.',
    ],
    wishes: [
      'Jumma Mubarak! Allah aapki har dua qubool kare aur ghar mein barkat de.',
      'Is mubarak din Allah aapko sehat, sukoon aur hidaayat ata kare. Jumma Mubarak!',
      'Jumme ki is paak ghadi mein hamein bhi apni duaon mein yaad rakhiyega. Jumma Mubarak!',
      'Allah aapke gunaah maaf kare aur nek raaste pe chalaaye. Aameen. Jumma Mubarak!',
      'Allah aapki pareshaniyan door kare aur aasaaniyan ata kare. Jumma Mubarak!',
      'Is Jumme aapki har nek khwaahish poori ho. Jumma Mubarak!',
    ],
    faq: [
      { q: 'Jumme ki namaz kab hoti hai?', a: 'Friday ko dopahar mein, Zuhr ke waqt. Har masjid ka sahi waqt alag ho sakta hai, isliye apni nazdeeki masjid se pata karo.' },
      { q: 'Jumme ke din Surah Al-Kahf kyun padhte hain?', a: 'Hadeeson mein Jumme ke din Surah Al-Kahf padhne ki fazeelat batayi gayi hai, isliye bahut se log is din iski tilaawat karte hain.' },
    ],
  },
};

const games = {
  'morning-exercise': { name: 'Subah ka 2-Minute Challenge', desc: 'Cartoon coach ke saath 8 aasaan kasratein — timer, roz ki 🔥 streak, badges aur dosto ko WhatsApp pe challenge. Sirf 2 minute (har kasrat 15 second), bina camera, bina login.' },
  'meenar': { name: 'Brahma ki Meenar', desc: 'Sone ki thaaliyon ka minaar ek khambe se doosre par le jaao — ek baar mein ek, badi kabhi chhoti ke upar nahi. 3 se 7 thaali, hint aur star.' },
  'matke': { name: 'Do Matke', desc: '3 aur 5 litre ke matkon se theek 4 litre naapo — bharo, khaali karo, udelo. Phir 4 aur 9 se 6 litre, aur 8-5-3 se 4+4 baanto.' },
  'pul': { name: 'Raat ka Pul', desc: 'Andheri raat, kamzor pul aur ek torch — 4 logon ko 17 minute mein paar karao. Pul par ek baar mein 2, dheeme ki raftaar se. Teen level.' },
  'diye': { name: 'Diye Jalao', desc: 'Ek diya chhuo — woh aur uske padosi badal jaate hain. 3×3, 4×4 aur 5×5 board par saare diye jalao. Hint aur star.' },
  'gotiyan': { name: 'Gotiyan', desc: 'Brainvita wali purani paheli: goti ke upar se koodo, aakhir mein sirf ek goti bachao — poore 32 goti wale board tak. Wapas aur hint.' },
  'jaadui-varg': { name: 'Jaadui Varg', desc: 'Khaane bharo taaki har line, column aur tirchhi line ka jod barabar ho — 3×3 se Khajuraho mandir ke 1000 saal purane 4×4 varg tak.' },
  'khiskao': { name: 'Khiskao Tasveer', desc: 'Tukde khaali jagah mein khiskaao aur dhalte suraj wale mahal ki tasveer poori karo — 3×3 aur 4×4. Hint aur star.' },
  'nadi-paar': { name: 'Nadi Paar', desc: 'Purani dimaagi paheli ab game mein: kisan, sher, bakri aur ghaas ko bina kuch khaaye-piye paar karao — phir Papa aur do bachche, aur 3 sipahi-3 chor. Hint, kam chaal par zyada star, WhatsApp challenge.' },
  quiz: { name: 'Bharat Quiz', desc: 'Roz 10 sawaal, har ek ke liye 10 second: rajya-rajdhani, rashtriya prateek, itihas, bhugol, vigyan, khel aur sanskriti. Har jawab ke baad ek rochak tathya, vishay-wise practice aur WhatsApp par score challenge.' },
  shabd: { name: 'Aaj ka Shabd', desc: 'Roz ek naya 5 akshar ka shabd — 6 koshish mein pehchano. Hindi shabd (Roman mein, matlab ke saath) ya English words. Rang batate hain kaunsa akshar sahi hai; result WhatsApp par bhejo aur streak banao.' },
  patang: { name: 'Patang Udao', desc: 'Apni patang ghumao, doosron ki dor kaato — "Wo kaata!" — apni dor bachao, til-gud laddoo pakdo aur pakshiyon se bacho. 60 second, combo aur WhatsApp challenge.' },
  zumba: { name: 'Ghar Baithe Zumba', desc: 'Mahilaon ke liye ghar ka dance workout — music ke saath 8 mazedaar moves, cartoon coach jo har move ke saath fit hoti jaati hai, awaaz mein coach, roz ki 🔥 streak aur saheliyon ko challenge.' },
  chhath: { name: 'Chhath Ghat', desc: 'Bhor mein nadi mein dupki lagao, ugte suraj ko sahi pal pe arghya do, phir soop mein thekua-kela-ganna pakad ke vrat kholo. Teen stage, ghanti aur paani ki awaaz, WhatsApp challenge.' },
  'new-year': { name: 'Aatishbaazi Pop', desc: 'Neeche se uthte rockets tap karke aasmaan mein phodo — sabse upar phodo to Perfect, jaldi-jaldi phodo to combo. Saath mein naye saal ka live countdown.' },
  christmas: { name: 'Santa ke Gift Pakdo', desc: 'Santa ki sleigh chalao, girte gifts pakdo, koyle se bacho aur doston ko WhatsApp pe score ka challenge bhejo. Hindi, Hinglish, English aur Bangla mein.' },
  'saal-ka-safar': { name: 'Saal ka Safar 2026 → 2027', desc: 'Saal bhar ki yaadein chhoo kar daudo, 10…1 countdown ke baad 2027 ke gate se niklo — aatishbaazi aur dhol pe naach-gaane ke saath.' },
  'chidiya-udd': { name: 'Chidiya Udd', desc: 'Bachpan wala khel: tota udd, kabootar udd… bhains udd? 😂 Sirf udne wali cheez pe tap karo. 48 cheezein, 3 jaan, har baar thoda tez.' },
  'saanp-seedhi': { name: 'Saanp-Seedhi', desc: 'Bachpan wala board game: computer se ya ek hi phone pe 2–4 doston ke saath khelo. Har seedhi ek achhi aadat, har saanp ek buri.' },
  'parade-ki-taal': { name: 'Parade ki Taal', desc: 'Dhol ki taal pe tap karo, parade kadam se kadam milake chale: fauj, BSF oont, NCC band aur tiranga flypast.' },
  'chaand-dhundo': { name: 'Chaand Dhundo', desc: 'Doorbeen se shaam ke aasmaan mein patla sa naya chaand dhundo, chhupne se pehle — sitara, jahaz aur patang dhoka denge! 10 shaamein.' },
  'basant-sargam': { name: 'Basant ki Sargam', desc: 'Maa Saraswati ki veena jaisi sargam: phool ki saat pankhudiyan Sa Re Ga Ma Pa Dha Ni bajati hain — dhun suno aur dohrao, har round ek swar lambi. Vasant Panchami game.' },
  'rang-barsao': { name: 'Rang Barsao (Holi)', desc: 'Braj ki gali mein jhaankte doston pe sookha gulal udaao — pasandida rang pe double points. Jo mana kare unpe rang nahi, jaanwaron pe bilkul nahi! 60 second.' },
  'kanche': { name: 'Kanche', desc: 'Bachpan wale kanche: apna kancha peeche kheench kar chhodo, ghere se saare kanche bahar nikaalo ya goli gucchi mein daalo. 6 level, star — koi daav nahi, sirf nishana.' },
  'gilli-danda': { name: 'Gilli-Danda', desc: 'Bachpan wala gilli-danda: pehle tap se gilli uchhalo, doosre se hawa mein zor se maaro. Oonchi shot ya neechi — gaon ke bachche lapakne ko taiyaar hain. Score dandon mein.' },
  'raja-mantri-chor-sipahi': { name: 'Raja Mantri Chor Sipahi', desc: 'Chitthi wala purana khel, ab ek phone par: 4 dost phone ghuma kar apni chitthi dekhein, ya computer ke saath khelo. Mantri ji, chor kaun hai?' },
  'langar-seva': { name: 'Langar Seva', desc: 'Gurpurab par langar ki seva: pangat mein baithi sangat ko prashada, dal, kheer aur jal parosiye. 60 second, bina music, Guru Nanak Dev Ji ki seekhon ke saath.' },
};

const apps = {
  hisab: { desc: 'Roz ka kharcha, aamdani aur udhaar-len-den likho. Data aapke phone ya aapki apni Google Drive mein rehta hai. Install hota hai, offline chalta hai.' },
  'wish-card': { desc: 'Tyohar chuno, naam likho, sundar greeting card banao aur WhatsApp pe bhejo ya download karo.' },
};

export { festivals, wishes, games, apps };
