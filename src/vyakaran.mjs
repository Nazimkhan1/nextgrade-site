/**
 * Hindi vyakaran for school (28 Nov 2026, handoff "Next: … vilom/paryayvachi/muhavare"; user: "banao khud ka content").
 * Pages (hi + en): /vilom-shabd/ (antonyms), /paryayvachi-shabd/ (synonyms), /muhavare/ (idioms with meaning and an
 * example sentence). Word lists are common language (not anyone's text); every meaning, example sentence, intro and FAQ
 * is our own writing. Each page has a 10-question practice quiz (in the browser, new questions every time).
 * Data is "a|b|c|d" lines to keep the file short.
 */
const VILOM = `अंधकार|प्रकाश|darkness|light
अनुकूल|प्रतिकूल|favourable|unfavourable
अपना|पराया|one's own|someone else's
अमीर|गरीब|rich|poor
अमृत|विष|nectar|poison
अच्छा|बुरा|good|bad
अनाथ|सनाथ|orphan|one with a guardian
अर्थ|अनर्थ|meaning, sense|harm, nonsense
आकाश|पाताल|sky|underworld
आगे|पीछे|ahead|behind
आज़ादी|ग़ुलामी|freedom|slavery
आदर|अनादर|respect|disrespect
आदि|अंत|beginning|end
आय|व्यय|income|expenditure
आयात|निर्यात|import|export
आरंभ|समाप्ति|start|finish
आशा|निराशा|hope|despair
आस्तिक|नास्तिक|believer|non-believer
इच्छा|अनिच्छा|wish|unwillingness
इधर|उधर|here|there
उचित|अनुचित|proper|improper
उत्तर|दक्षिण|north|south
उत्थान|पतन|rise|fall
उदय|अस्त|rising (of the sun)|setting
उदार|अनुदार|generous|narrow-minded
उन्नति|अवनति|progress|decline
उपकार|अपकार|favour, help|harm
उपस्थित|अनुपस्थित|present|absent
ऊँच|नीच|high|low
ऊपर|नीचे|up|down
एक|अनेक|one|many
कठिन|सरल|difficult|easy
कड़वा|मीठा|bitter|sweet
कम|अधिक|less|more
कायर|वीर|coward|brave
कृतज्ञ|कृतघ्न|grateful|ungrateful
कोमल|कठोर|soft|hard
क्रोध|क्षमा|anger|forgiveness
खरीद|बिक्री|purchase|sale
खुशी|ग़म|happiness|sorrow
गर्मी|सर्दी|summer, heat|winter, cold
गीला|सूखा|wet|dry
गुण|दोष|virtue|fault
गुप्त|प्रकट|hidden|revealed
गुरु|शिष्य|teacher|disciple
ग्रामीण|शहरी|rural|urban
चढ़ाव|उतार|ascent|descent
चतुर|मूर्ख|clever|foolish
जड़|चेतन|lifeless|conscious
जन्म|मृत्यु|birth|death
जय|पराजय|victory|defeat
जल्दी|देर|early, quick|late
जीवन|मरण|life|death
झूठ|सच|lie|truth
ठंडा|गरम|cold|hot
ठोस|तरल|solid|liquid
थोक|फुटकर|wholesale|retail
दयालु|निर्दयी|kind|cruel
दाता|याचक|giver|beggar
दिन|रात|day|night
दुख|सुख|sorrow|happiness
दुर्लभ|सुलभ|rare|easily available
दूर|पास|far|near
देव|दानव|god|demon
धनी|निर्धन|wealthy|poor
धर्म|अधर्म|righteousness|unrighteousness
धूप|छाँव|sunshine|shade
नकद|उधार|cash|credit
नया|पुराना|new|old
निंदा|प्रशंसा|criticism|praise
निर्माण|विनाश|construction|destruction
निश्चित|अनिश्चित|certain|uncertain
न्याय|अन्याय|justice|injustice
पक्ष|विपक्ष|for, ruling side|against, opposition
पढ़ा-लिखा|अनपढ़|educated|illiterate
पवित्र|अपवित्र|pure|impure
पाप|पुण्य|sin|virtue
पूर्ण|अपूर्ण|complete|incomplete
पूर्व|पश्चिम|east|west
प्रत्यक्ष|परोक्ष|direct|indirect
प्रश्न|उत्तर|question|answer
प्राचीन|नवीन|ancient|modern
प्रेम|घृणा|love|hatred
बंधन|मुक्ति|bondage|freedom
बड़ा|छोटा|big|small
बलवान|निर्बल|strong|weak
बाहर|भीतर|outside|inside
बुद्धिमान|मूर्ख|wise|foolish
भूत|भविष्य|past|future
मान|अपमान|honour|insult
मालिक|नौकर|master|servant
मित्र|शत्रु|friend|enemy
मोटा|पतला|fat, thick|thin
मौखिक|लिखित|oral|written
यश|अपयश|fame|disgrace
योग्य|अयोग्य|able|unfit
रक्षक|भक्षक|protector|destroyer
राजा|रंक|king|pauper
रोगी|निरोगी|sick|healthy
लघु|दीर्घ|short|long
लाभ|हानि|profit|loss
वरदान|अभिशाप|boon|curse
विजय|पराजय|win|defeat
विरोध|समर्थन|opposition|support
विश्वास|अविश्वास|trust|distrust
शिक्षित|अशिक्षित|educated|uneducated
शीत|उष्ण|cold|hot
शुद्ध|अशुद्ध|pure, correct|impure, wrong
शुभ|अशुभ|auspicious|inauspicious
श्वेत|श्याम|white|black
शांति|अशांति|peace|unrest
संक्षेप|विस्तार|brief|detailed
सक्रिय|निष्क्रिय|active|inactive
सजीव|निर्जीव|living|non-living
सज्जन|दुर्जन|good person|wicked person
सत्य|असत्य|truth|untruth
सदाचार|दुराचार|good conduct|misconduct
सफल|असफल|successful|unsuccessful
सम्मान|अपमान|honour|dishonour
सरस|नीरस|interesting, juicy|dull
साकार|निराकार|with form|formless
सामान्य|विशेष|ordinary|special
सुगंध|दुर्गंध|fragrance|stink
सुबह|शाम|morning|evening
सुमति|कुमति|good sense|bad sense
सुर|असुर|god|demon
सृष्टि|प्रलय|creation|destruction of the world
सौभाग्य|दुर्भाग्य|good luck|bad luck
स्थिर|अस्थिर|steady|unsteady
स्त्री|पुरुष|woman|man
स्वतंत्र|परतंत्र|independent|dependent
स्वदेश|विदेश|homeland|foreign land
स्वर्ग|नरक|heaven|hell
स्वस्थ|अस्वस्थ|healthy|unwell
स्वार्थ|परमार्थ|selfishness|selfless good
हँसना|रोना|to laugh|to cry
हर्ष|विषाद|joy|grief
हल्का|भारी|light|heavy
हार|जीत|defeat|victory
हित|अहित|benefit|harm`;

const PARYAY = `अग्नि|आग, अनल, पावक, वह्नि, कृशानु|fire
अतिथि|मेहमान, पाहुना, आगंतुक, अभ्यागत|guest
अमृत|सुधा, पीयूष, अमिय, सोमरस|nectar
अहंकार|घमंड, अभिमान, दर्प, गर्व, मद|pride, ego
आकाश|आसमान, गगन, नभ, अंबर, व्योम|sky
आँख|नेत्र, नयन, लोचन, चक्षु, दृग|eye
आनंद|हर्ष, खुशी, प्रसन्नता, उल्लास, मोद|joy
आम|रसाल, आम्र, सहकार|mango
इंद्र|सुरेश, देवराज, सुरपति, पुरंदर, शचीपति|Indra (king of gods)
कमल|पंकज, जलज, सरोज, नीरज, अंबुज|lotus
किरण|रश्मि, अंशु, मरीचि, कर|ray of light
कृष्ण|कन्हैया, मोहन, गोपाल, श्याम, मुरलीधर|Krishna
कोयल|कोकिला, पिक, वसंतदूत|cuckoo (koel)
गंगा|भागीरथी, सुरसरि, जाह्नवी, मंदाकिनी, देवनदी|the Ganga
गणेश|गजानन, विनायक, लंबोदर, एकदंत, गणपति|Ganesh
गाय|गौ, धेनु, सुरभि, गैया|cow
घर|गृह, सदन, भवन, निकेतन, आलय|house
घोड़ा|अश्व, तुरंग, हय, घोटक, बाजि|horse
चंद्रमा|चाँद, शशि, सोम, राकेश, सुधाकर, इंदु|moon
जंगल|वन, कानन, अरण्य, विपिन|forest
जल|पानी, नीर, वारि, अंबु, तोय, सलिल|water
तलवार|खड्ग, असि, कृपाण, करवाल|sword
तालाब|सरोवर, सर, तड़ाग, जलाशय, पुष्कर|pond, lake
दिन|दिवस, वासर, वार|day
दूध|दुग्ध, पय, क्षीर, गोरस|milk
देवता|सुर, देव, अमर, विबुध|god
धरती|पृथ्वी, भूमि, धरा, वसुधा, वसुंधरा, मही|earth
नदी|सरिता, तटिनी, तरंगिणी, आपगा, निम्नगा|river
पत्थर|पाषाण, प्रस्तर, उपल, शिला|stone
पर्वत|पहाड़, गिरि, अचल, शैल, भूधर, नग|mountain
पवन|हवा, वायु, समीर, अनिल, मारुत|wind, air
पिता|जनक, तात, बाप, पितृ|father
पुत्र|बेटा, सुत, तनय, आत्मज, नंदन|son
पुत्री|बेटी, सुता, तनया, आत्मजा, दुहिता|daughter
पेड़|वृक्ष, तरु, विटप, पादप, द्रुम|tree
फूल|पुष्प, सुमन, कुसुम, प्रसून|flower
बंदर|वानर, कपि, मर्कट, शाखामृग|monkey
बादल|मेघ, घन, जलद, जलधर, नीरद, वारिद|cloud
बिजली|विद्युत, दामिनी, चपला, तड़ित, सौदामिनी|lightning
ब्रह्मा|विधाता, चतुरानन, पितामह, स्वयंभू, प्रजापति|Brahma
भौंरा|भ्रमर, मधुप, अलि, षट्पद, मधुकर|bumblebee
मनुष्य|मानव, नर, मनुज, आदमी, जन|human being
माता|माँ, जननी, अंबा, मैया, मातृ|mother
मित्र|दोस्त, सखा, सहचर, साथी, सुहृद|friend
मुख|मुँह, आनन, वदन|face, mouth
मोर|मयूर, केकी, शिखी|peacock
राजा|नृप, भूप, भूपति, नरेश, महीप|king
राम|रघुपति, रघुनंदन, सीतापति, दाशरथि, अवधेश|Ram
रात|रात्रि, निशा, रजनी, यामिनी, विभावरी|night
लक्ष्मी|कमला, रमा, श्री, पद्मा, इंदिरा|Lakshmi
विष्णु|नारायण, जनार्दन, केशव, चतुर्भुज, लक्ष्मीपति|Vishnu
शरीर|देह, तन, काया, वपु, गात|body
शिव|शंकर, महादेव, भोलेनाथ, त्रिलोचन, नीलकंठ|Shiva
शेर|सिंह, केसरी, मृगराज, वनराज, केहरि|lion
संसार|जगत, विश्व, दुनिया, लोक, भव|world
समुद्र|सागर, जलधि, रत्नाकर, सिंधु, पयोधि, उदधि|sea, ocean
सरस्वती|शारदा, वीणापाणि, भारती, वागीश्वरी, हंसवाहिनी|Saraswati
सूर्य|सूरज, रवि, दिनकर, भानु, दिवाकर, भास्कर|sun
सोना|स्वर्ण, कनक, कंचन, हेम, हाटक|gold
स्त्री|नारी, महिला, वनिता, ललना|woman
हाथ|कर, हस्त, पाणि|hand
हाथी|गज, हस्ती, कुंजर, करी, द्विप|elephant
हिमालय|हिमगिरि, हिमाद्रि, नगराज, गिरिराज|the Himalayas`;

const MUHAVARE = `अंगूठा दिखाना|साफ़ मना कर देना|काम निकलते ही दोस्त ने मदद के समय अंगूठा दिखा दिया।|to flatly refuse
अंधे की लाठी|एकमात्र सहारा|बूढ़े दादाजी के लिए उनका पोता अंधे की लाठी है।|someone's only support
अक्ल पर पत्थर पड़ना|बुद्धि काम न करना|परीक्षा से पहले रात भर फ़ोन देखा, न जाने अक्ल पर पत्थर क्यों पड़ गए थे।|to lose one's good sense
अपना उल्लू सीधा करना|अपना मतलब निकालना|कुछ लोग मीठी बातें करके बस अपना उल्लू सीधा करते हैं।|to serve one's own interest
अपने पैरों पर खड़ा होना|आत्मनिर्भर होना|नौकरी मिलते ही रीना अपने पैरों पर खड़ी हो गई।|to become self-reliant
आँख का तारा|बहुत प्यारा|छोटा मुन्ना पूरे घर की आँख का तारा है।|the apple of one's eye
आँखें खुलना|सच्चाई समझ में आना|नुकसान होने के बाद ही उसकी आँखें खुलीं।|to have one's eyes opened
आँखें चुराना|शर्म से सामने न आना|उधार न लौटा पाने के कारण वह मुझसे आँखें चुराता है।|to avoid someone's eyes
आँखों में धूल झोंकना|धोखा देना|चोर चौकीदार की आँखों में धूल झोंककर भाग गया।|to deceive, throw dust in the eyes
आग बबूला होना|बहुत गुस्सा होना|टूटा गिलास देखकर मालिक आग बबूला हो गए।|to flare up in anger
आग में घी डालना|झगड़ा और बढ़ाना|दोनों पहले से लड़ रहे थे, उसकी बात ने आग में घी डाल दिया।|to add fuel to the fire
आटे-दाल का भाव मालूम होना|असली कठिनाई का पता चलना|हॉस्टल में अकेले रहकर उसे आटे-दाल का भाव मालूम हो गया।|to learn how hard life really is
आसमान सिर पर उठाना|बहुत शोर करना|छुट्टी की घंटी बजते ही बच्चों ने आसमान सिर पर उठा लिया।|to raise the roof
आस्तीन का साँप|धोखा देने वाला अपना आदमी|जिसे अपना समझा, वही आस्तीन का साँप निकला।|a snake in the grass
ईद का चाँद होना|बहुत दिनों बाद दिखना|शहर जाने के बाद तुम तो ईद का चाँद हो गए हो।|to be seen very rarely
ईंट से ईंट बजाना|पूरी तरह नष्ट कर देना|सैनिकों ने दुश्मन के ठिकानों की ईंट से ईंट बजा दी।|to raze to the ground
उँगली उठाना|दोष लगाना|ईमानदार आदमी पर कोई उँगली नहीं उठा सकता।|to point a finger at
उल्टी गंगा बहाना|रीति के उल्टा काम करना|छोटा भाई बड़े को सिखाए, यह तो उल्टी गंगा बहाना है।|to go against the natural order
ऊँट के मुँह में जीरा|ज़रूरत से बहुत कम|पहलवान के लिए दो रोटियाँ ऊँट के मुँह में जीरा हैं।|a drop in the ocean
एक और एक ग्यारह होना|मिलकर ताकत बढ़ना|दोनों भाई साथ आए तो एक और एक ग्यारह हो गए।|unity is strength
कमर कसना|पूरी तैयारी करना|बोर्ड परीक्षा के लिए राहुल ने कमर कस ली है।|to gird up one's loins
कलई खुलना|असलियत सामने आना|जाँच हुई तो नकली दवा बेचने वाले की कलई खुल गई।|to be exposed
कलेजा मुँह को आना|बहुत घबरा जाना|बच्चा भीड़ में खो गया तो माँ का कलेजा मुँह को आ गया।|to have one's heart in one's mouth
कान पर जूँ न रेंगना|कहने का कोई असर न होना|बार-बार समझाया, पर उसके कान पर जूँ तक न रेंगी।|to turn a deaf ear
कान भरना|चुगली करना|किसी ने मैनेजर के कान भर दिए कि मैं काम नहीं करता।|to poison someone's mind
कोल्हू का बैल|दिन-रात लगातार मेहनत करने वाला|पैसे के लिए वह कोल्हू का बैल बना रहता है।|a drudge
ख़याली पुलाव पकाना|बिना मेहनत के बड़े सपने देखना|पढ़ाई छोड़कर बस ख़याली पुलाव पकाने से कुछ नहीं मिलेगा।|to build castles in the air
खून-पसीना एक करना|बहुत मेहनत करना|किसान खून-पसीना एक करके फ़सल उगाता है।|to toil hard
गड़े मुर्दे उखाड़ना|पुरानी बातें फिर छेड़ना|ख़ुशी के मौके पर गड़े मुर्दे मत उखाड़ो।|to rake up the past
गागर में सागर भरना|थोड़े शब्दों में बहुत कहना|कबीर के दोहे गागर में सागर भरते हैं।|to say a lot in a few words
गिरगिट की तरह रंग बदलना|बार-बार अपनी बात बदलना|ऐसे नेता गिरगिट की तरह रंग बदलते हैं।|to keep changing sides
गूलर का फूल होना|बहुत कम दिखना, दुर्लभ होना|आजकल सच्चे दोस्त गूलर का फूल हो गए हैं।|to be very rare
घाट-घाट का पानी पीना|बहुत अनुभव होना|दादाजी ने घाट-घाट का पानी पिया है, उनसे सलाह लो।|to be widely experienced
घी के दीये जलाना|बहुत ख़ुशी मनाना|बेटे के लौटने पर गाँव में घी के दीये जलाए गए।|to celebrate joyfully
घोड़े बेचकर सोना|बेफ़िक्र होकर गहरी नींद सोना|परीक्षा ख़त्म होते ही वह घोड़े बेचकर सोया।|to sleep like a log
चाँदी काटना|ख़ूब कमाई करना|त्योहार के मौसम में मिठाई वाले चाँदी काटते हैं।|to make a lot of money
चार चाँद लगाना|शोभा बढ़ाना|आपके आने से हमारे कार्यक्रम में चार चाँद लग गए।|to add glory
चिकना घड़ा होना|किसी बात का असर न होना|उसे कितना भी डाँटो, वह तो चिकना घड़ा है।|to be thick-skinned
चुल्लू भर पानी में डूब मरना|बहुत शर्मिंदा होना|ऐसी हरकत करके तुम्हें चुल्लू भर पानी में डूब मरना चाहिए।|to be utterly ashamed
छक्के छुड़ाना|बुरी तरह हरा देना|हमारी टीम ने मैच में विरोधियों के छक्के छुड़ा दिए।|to rout completely
छाती पर मूँग दलना|पास रहकर तंग करना|पड़ोसी रोज़ झगड़ा करके छाती पर मूँग दलता है।|to harass someone right under their nose
जान पर खेलना|जान का ख़तरा उठाना|फ़ायरमैन ने जान पर खेलकर बच्चे को बचाया।|to risk one's life
जले पर नमक छिड़कना|दुखी को और दुख देना|हारे हुए खिलाड़ी का मज़ाक उड़ाना जले पर नमक छिड़कना है।|to rub salt in the wound
टस से मस न होना|अपनी बात पर अड़े रहना|सबने कहा, पर दादी अपनी ज़िद से टस से मस न हुईं।|to not budge an inch
टेढ़ी खीर होना|बहुत कठिन काम|एक दिन में पूरी किताब याद करना टेढ़ी खीर है।|a hard nut to crack
डींग हाँकना|बढ़-चढ़कर बातें करना|वह अपनी बहादुरी की डींग हाँकता रहता है।|to boast
ढिंढोरा पीटना|सबको बताते फिरना|छोटी-सी जीत का इतना ढिंढोरा मत पीटो।|to trumpet something
तिल का ताड़ बनाना|छोटी बात को बहुत बड़ा बना देना|ज़रा-सी बात थी, तुमने तिल का ताड़ बना दिया।|to make a mountain of a molehill
थाली का बैंगन|मौका देखकर पक्ष बदलने वाला|उस पर भरोसा मत करो, वह थाली का बैंगन है।|a turncoat
दाँतों तले उँगली दबाना|बहुत हैरान होना|छोटी बच्ची का गाना सुनकर सबने दाँतों तले उँगली दबा ली।|to be astonished
दाल में काला होना|कुछ गड़बड़ होने का शक|वह मुझसे बात छिपा रहा है, ज़रूर दाल में कुछ काला है।|something fishy
दिन दूनी रात चौगुनी उन्नति करना|बहुत तेज़ी से तरक्की करना|मेहनत से उसकी दुकान दिन दूनी रात चौगुनी उन्नति कर रही है।|to prosper rapidly
दो नावों पर पैर रखना|एक साथ दो उल्टे काम करना|पढ़ाई और फ़ालतू घूमना साथ नहीं चलेगा, दो नावों पर पैर मत रखो।|to sit on the fence, ride two horses
नमक-मिर्च लगाना|बात को बढ़ा-चढ़ाकर कहना|उसने घटना को नमक-मिर्च लगाकर सुनाया।|to exaggerate
नाक कटना|इज़्ज़त जाना|बेटे की हरकत से पूरे परिवार की नाक कट गई।|to lose face
नाक में दम करना|बहुत परेशान करना|मच्छरों ने रात भर नाक में दम कर दिया।|to harass endlessly
नौ दो ग्यारह होना|भाग जाना|पुलिस को देखते ही चोर नौ दो ग्यारह हो गए।|to run away
पत्थर की लकीर|पक्की, न बदलने वाली बात|दादाजी की कही बात पत्थर की लकीर होती है।|set in stone
पानी-पानी होना|बहुत शर्मिंदा होना|झूठ पकड़ा गया तो वह पानी-पानी हो गया।|to be deeply embarrassed
पेट में चूहे दौड़ना|बहुत भूख लगना|स्कूल से लौटते ही पेट में चूहे दौड़ने लगते हैं।|to be very hungry
पैरों तले ज़मीन खिसकना|अचानक बुरी ख़बर से होश उड़ जाना|नतीजा सुनकर उसके पैरों तले ज़मीन खिसक गई।|to be shocked
फूला न समाना|बहुत ख़ुश होना|पहला इनाम पाकर वह फूला न समाया।|to be overjoyed
बाल-बाल बचना|मुश्किल से बचना|तेज़ गाड़ी से वह बाल-बाल बचा।|to have a narrow escape
बात का बतंगड़ बनाना|छोटी बात को बढ़ा देना|छोटी-सी ग़लती पर बात का बतंगड़ मत बनाओ।|to blow things out of proportion
भीगी बिल्ली बनना|डरकर चुप हो जाना|प्रिंसिपल को देखते ही शरारती बच्चे भीगी बिल्ली बन गए।|to become meek
मुँह की खाना|बुरी तरह हारना|घमंडी पहलवान को अखाड़े में मुँह की खानी पड़ी।|to suffer a humiliating defeat
मुँह में पानी आना|कुछ खाने का मन होना|गरम जलेबी देखकर मुँह में पानी आ गया।|to make one's mouth water
रंग में भंग डालना|मज़े में रुकावट डालना|बारिश ने पिकनिक के रंग में भंग डाल दिया।|to spoil the fun
रफ़ूचक्कर होना|चुपके से भाग जाना|काम का नाम सुनते ही वह रफ़ूचक्कर हो गया।|to vanish, slip away
लाल-पीला होना|गुस्सा होना|देर से आने पर पिताजी लाल-पीले हो गए।|to fly into a rage
लोहे के चने चबाना|बहुत कठिन काम करना|यह परीक्षा पास करना लोहे के चने चबाने जैसा है।|to do something very tough
सिर आँखों पर रखना|आदर से मानना|बड़ों की सलाह हम सिर आँखों पर रखते हैं।|to accept with respect
सिर पर पैर रखकर भागना|बहुत तेज़ भागना|कुत्ते को देखकर बिल्ली सिर पर पैर रखकर भागी।|to run for one's life
हक्का-बक्का रह जाना|हैरान रह जाना|अचानक मेहमानों को देखकर सब हक्के-बक्के रह गए।|to be dumbfounded
हथेली पर सरसों उगाना|असंभव काम तुरंत करना चाहना|एक हफ़्ते में अंग्रेज़ी सीखना हथेली पर सरसों उगाना है।|to expect the impossible at once
हवा से बातें करना|बहुत तेज़ दौड़ना|नई ट्रेन हवा से बातें करती है।|to go very fast
हाथ धोकर पीछे पड़ना|पूरी ताकत से किसी के पीछे लग जाना|मोहल्ले के बच्चे पतंग के लिए हाथ धोकर पीछे पड़ गए।|to go all out after something
हाथ पर हाथ धरे बैठना|कुछ न करना|हाथ पर हाथ धरे बैठने से नौकरी नहीं मिलेगी।|to sit idle
हाथ-पाँव फूलना|घबरा जाना|मंच पर जाते ही उसके हाथ-पाँव फूल गए।|to panic`;

const rows = (s) => s.trim().split('\n').map((l) => l.split('|'));
const V = rows(VILOM), PY = rows(PARYAY).map(([w, s, e]) => [w, s.split(', '), e]), MU = rows(MUHAVARE);

const TX = {
  vilom: {
    path: '/vilom-shabd/', emoji: '↔️',
    hi: { nav: 'विलोम शब्द', t: `विलोम शब्द (Vilom Shabd) — ${V.length}+ विलोम शब्दों की सूची, अभ्यास के साथ | NextGrade`, d: `${V.length} ज़रूरी विलोम शब्द (उल्टे अर्थ वाले शब्द) — कक्षा 1 से 10 के लिए, आसान सूची, बनाने के नियम और 10 सवालों का अभ्यास क्विज़।`, h1: '↔️ विलोम शब्द', lead: `विलोम शब्द यानी उल्टे अर्थ वाले शब्द — जैसे दिन-रात, सुख-दुख। यहाँ ${V.length} ज़रूरी विलोम शब्द हैं जो स्कूल की परीक्षा में सबसे ज़्यादा पूछे जाते हैं।`, th: ['शब्द', 'विलोम'],
      about: ['विलोम का मतलब है "उल्टा"। जिस शब्द का अर्थ किसी दूसरे शब्द के ठीक उल्टा हो, उसे उसका विलोम शब्द कहते हैं। इन्हें विपरीतार्थक शब्द भी कहा जाता है। विलोम शब्द सीखने से बच्चे का शब्द-भंडार बढ़ता है और वह अपनी बात ज़्यादा साफ़ कह पाता है।', 'हिंदी में कई विलोम शब्द एक छोटा-सा उपसर्ग (शब्द के आगे लगने वाला अंश) जोड़कर बनते हैं: "अ" (सफल-असफल, पूर्ण-अपूर्ण), "अन" (आदर-अनादर, उचित-अनुचित), "नि/निर्" (धन-निर्धन, रोगी-निरोगी), "दुर्/दु" (सज्जन-दुर्जन, सौभाग्य-दुर्भाग्य), "कु" (सुमति-कुमति)। पर बहुत से जोड़े बिल्कुल अलग शब्द होते हैं — जैसे दिन-रात, आय-व्यय, मित्र-शत्रु — इन्हें याद करना पड़ता है।', 'एक ध्यान देने वाली बात: विलोम शब्द हमेशा उसी तरह का शब्द होता है। संज्ञा का विलोम संज्ञा (जय-पराजय), विशेषण का विलोम विशेषण (कठिन-सरल) और क्रिया का विलोम क्रिया (हँसना-रोना) होता है। परीक्षा में "जय" का विलोम "हारना" लिखना ग़लत माना जाएगा, सही है "पराजय"। कुछ शब्दों के एक से ज़्यादा विलोम होते हैं — "उत्तर" का विलोम दिशा के लिए "दक्षिण" और सवाल-जवाब के लिए "प्रश्न"।'],
      howH: 'याद करने के आसान तरीके', how: ['रोज़ 10 जोड़े पढ़ें और फिर नीचे वाला क्विज़ खेलें — 2 हफ़्ते में पूरी सूची याद हो जाएगी।', 'जोड़ों को वाक्य में बोलें: "सुबह स्कूल जाता हूँ, शाम को खेलता हूँ।"', 'उपसर्ग वाले जोड़े (अ, अन, निर्, दुर्) एक साथ याद करें — नियम पकड़ में आ जाता है।'],
      faq: [['विलोम शब्द किसे कहते हैं?', 'जो शब्द किसी दूसरे शब्द का ठीक उल्टा अर्थ बताए, उसे विलोम या विपरीतार्थक शब्द कहते हैं। जैसे: सत्य-असत्य, आदि-अंत।'], ['"आशा" का विलोम क्या है?', '"निराशा"।'], ['"उदय" का विलोम क्या है?', '"अस्त" — जैसे सूर्योदय और सूर्यास्त।'], ['"कृतज्ञ" का विलोम क्या है?', '"कृतघ्न" — यानी जो किसी का उपकार न माने।']] },
    en: { nav: 'Vilom Shabd', t: `Vilom Shabd — ${V.length}+ Hindi Antonyms with English Meaning | NextGrade`, d: `${V.length} important vilom shabd (Hindi antonyms) with English meanings — for classes 1 to 10, with rules to form them and a 10-question practice quiz.`, h1: '↔️ Vilom Shabd — Hindi antonyms', lead: `Vilom shabd are words with opposite meanings, like din–raat (day–night) and sukh–dukh (happiness–sorrow). Here are ${V.length} important pairs with English meanings, the ones school exams ask most.`, th: ['Word', 'Opposite', 'Meaning'],
      about: ['“Vilom” means reverse. A word whose meaning is the exact opposite of another is its vilom shabd; they are also called viprītārthak shabd. Learning them widens a child’s vocabulary and helps express ideas clearly — and they appear in almost every Hindi grammar paper.', 'Many Hindi antonyms are made by adding a small prefix: “a” (safal–asafal, poorn–apoorn), “an” (aadar–anaadar, uchit–anuchit), “nir/ni” (rogi–nirogi), “dur/du” (sajjan–durjan, saubhaagya–durbhaagya) and “ku” (sumati–kumati). Many others are completely different words — din–raat, aay–vyay, mitra–shatru — which simply need to be learned.', 'An antonym is always the same kind of word: a noun pairs with a noun (jay–paraajay), an adjective with an adjective (kathin–saral) and a verb with a verb (hansna–rona). Writing “haarna” as the opposite of “jay” loses marks; the answer is “paraajay”. Some words have more than one opposite — “uttar” is “dakshin” for direction (north–south) but “prashn” for question–answer.'],
      howH: 'Easy ways to learn them', how: ['Read 10 pairs a day and play the quiz below — the whole list sticks in about two weeks.', 'Use each pair in a sentence: “Subah school jaata hoon, shaam ko khelta hoon.”', 'Learn the prefix pairs (a, an, nir, dur) together — the pattern becomes obvious.'],
      faq: [['What is vilom shabd?', 'A word with the exact opposite meaning of another word, e.g. satya–asatya (truth–untruth), aadi–ant (beginning–end).'], ['What is the vilom of “aasha” (hope)?', '“Niraasha” (despair).'], ['What is the vilom of “uday” (rise)?', '“Ast” (setting) — as in sooryoday and sooryaast.'], ['What is the vilom of “kritagya” (grateful)?', '“Kritaghn” — someone who does not acknowledge help.']] },
  },
  paryay: {
    path: '/paryayvachi-shabd/', emoji: '🔁',
    hi: { nav: 'पर्यायवाची शब्द', t: `पर्यायवाची शब्द (Paryayvachi Shabd) — ${PY.length} शब्दों के पर्यायवाची, अभ्यास के साथ | NextGrade`, d: `${PY.length} ज़रूरी शब्दों के पर्यायवाची (समानार्थी शब्द) — सूर्य, जल, कमल, आकाश, पृथ्वी आदि। स्कूल परीक्षा के लिए आसान सूची और अभ्यास क्विज़।`, h1: '🔁 पर्यायवाची शब्द', lead: `पर्यायवाची यानी एक जैसे अर्थ वाले शब्द — जैसे सूर्य के लिए रवि, दिनकर, भानु। यहाँ ${PY.length} ज़रूरी शब्दों के पर्यायवाची हैं।`, th: ['शब्द', 'पर्यायवाची'],
      about: ['पर्यायवाची शब्द वे होते हैं जिनका अर्थ लगभग एक जैसा हो। इन्हें समानार्थी शब्द भी कहते हैं। "पर्याय" का मतलब है "बदले में आने वाला" — यानी एक शब्द की जगह दूसरा रखा जा सके। कविता और अच्छे लेखन में एक ही शब्द बार-बार न आए, इसलिए पर्यायवाची बहुत काम आते हैं।', 'ध्यान रखें कि पर्यायवाची शब्दों का अर्थ एक जैसा होता है, बिल्कुल एक नहीं। "घर", "भवन" और "आलय" तीनों का मतलब रहने की जगह है, पर "भवन" बड़ी इमारत के लिए ज़्यादा आता है और "आलय" अक्सर किसी शब्द के साथ जुड़कर (विद्यालय, देवालय)। इसलिए वाक्य में पर्यायवाची रखते समय देखें कि वह अच्छा लगे।', 'कुछ पर्यायवाची एक से ज़्यादा शब्दों के होते हैं। "कर" हाथ भी है और किरण भी; "नीलकंठ" शिव भी हैं और मोर भी; "सोना" धातु भी है और नींद लेना भी। परीक्षा में ऐसे शब्दों का अर्थ वाक्य देखकर तय करें। हमारी सूची में संस्कृत से आए (तत्सम) शब्द ज़्यादा हैं, क्योंकि स्कूल की किताबें और परीक्षाएँ यही पूछती हैं।'],
      howH: 'याद करने के आसान तरीके', how: ['हर शब्द के पहले 3 पर्यायवाची पक्के कर लें — परीक्षा में आम तौर पर 2–3 ही पूछे जाते हैं।', 'शब्दों की बनावट देखें: जलज, नीरज, पंकज — "ज" यानी "जन्मा", पानी/कीचड़ में जन्मा = कमल।', 'नीचे वाला क्विज़ रोज़ एक बार खेलें।'],
      faq: [['पर्यायवाची शब्द किसे कहते हैं?', 'एक जैसे अर्थ वाले शब्दों को पर्यायवाची या समानार्थी शब्द कहते हैं। जैसे: जल — नीर, वारि, सलिल।'], ['सूर्य के पर्यायवाची क्या हैं?', 'रवि, दिनकर, भानु, दिवाकर, भास्कर, सूरज।'], ['कमल के पर्यायवाची क्या हैं?', 'पंकज, जलज, सरोज, नीरज, अंबुज।'], ['पर्यायवाची और विलोम में क्या फ़र्क है?', 'पर्यायवाची एक जैसे अर्थ वाले शब्द हैं (दिन-दिवस), विलोम उल्टे अर्थ वाले (दिन-रात)।']] },
    en: { nav: 'Paryayvachi Shabd', t: `Paryayvachi Shabd — Hindi Synonyms of ${PY.length} Words with English Meaning | NextGrade`, d: `Paryayvachi shabd (Hindi synonyms) of ${PY.length} important words — sun, water, lotus, sky, earth and more — with English meanings, notes and a practice quiz.`, h1: '🔁 Paryayvachi Shabd — Hindi synonyms', lead: `Paryayvachi shabd are words with the same meaning — for the sun: ravi, dinkar, bhaanu. Here are the synonyms of ${PY.length} words that school exams ask most, with English meanings.`, th: ['Word', 'Synonyms', 'Meaning'],
      about: ['Paryayvachi (or samaanaarthi) shabd are words with nearly the same meaning. “Paryay” means a substitute — one word that can take the place of another. Poets and good writers use them so the same word does not repeat again and again.', 'Synonyms are similar, not identical. “Ghar”, “bhavan” and “aalay” all mean a dwelling, but “bhavan” suits a large building and “aalay” usually joins another word (vidyaalay = school, devaalay = temple). When you swap in a synonym, check that it sounds right in the sentence.', 'Some synonyms belong to more than one word: “kar” is both hand and ray of light; “Neelkanth” is both Shiva and the peacock; “sona” is gold and also “to sleep”. In an exam, decide the meaning from the sentence. Our list leans on Sanskrit-origin (tatsam) words because school books and exams ask for those.'],
      howH: 'Easy ways to learn them', how: ['Fix the first three synonyms of each word — exams usually ask for two or three.', 'Notice how the words are built: jalaj, neeraj, pankaj — “ja” means “born of”; born of water or mud = lotus.', 'Play the quiz below once a day.'],
      faq: [['What is paryayvachi shabd?', 'Words with the same meaning, e.g. jal (water) — neer, vaari, salil.'], ['What are the synonyms of soorya (sun)?', 'Ravi, dinkar, bhaanu, divaakar, bhaaskar, sooraj.'], ['What are the synonyms of kamal (lotus)?', 'Pankaj, jalaj, saroj, neeraj, ambuj.'], ['Difference between paryayvachi and vilom?', 'Paryayvachi have the same meaning (din–divas), vilom have the opposite meaning (din–raat).']] },
  },
  muhavare: {
    path: '/muhavare/', emoji: '💬',
    hi: { nav: 'मुहावरे', t: `मुहावरे और उनके अर्थ — ${MU.length} मुहावरे, वाक्य प्रयोग सहित (Muhavare in Hindi) | NextGrade`, d: `${MU.length} प्रसिद्ध हिंदी मुहावरे, उनका अर्थ और हर एक का आसान वाक्य प्रयोग — कक्षा 5 से 10 के लिए। मुहावरा और लोकोक्ति का फ़र्क, अभ्यास क्विज़।`, h1: '💬 मुहावरे और उनके अर्थ', lead: `${MU.length} प्रसिद्ध हिंदी मुहावरे — हर मुहावरे का अर्थ और उसका आसान वाक्य प्रयोग। सारे वाक्य हमने रोज़ की ज़िंदगी से ख़ुद बनाए हैं।`, th: ['मुहावरा', 'अर्थ', 'वाक्य प्रयोग'],
      about: ['मुहावरा ऐसा शब्द-समूह है जो अपने सीधे अर्थ की जगह कोई ख़ास अर्थ देता है। "नौ दो ग्यारह होना" का गिनती से कोई लेना-देना नहीं — इसका मतलब है भाग जाना। मुहावरे भाषा को चटपटा और असरदार बनाते हैं; एक छोटा-सा मुहावरा पूरी बात कह देता है।', 'मुहावरा हमेशा वाक्य के अंदर इस्तेमाल होता है और उसकी क्रिया वाक्य के हिसाब से बदलती है: "नौ दो ग्यारह होना" → "चोर नौ दो ग्यारह हो गए"। मुहावरे के शब्द बदलने नहीं चाहिए — "दस दो बारह होना" लिखेंगे तो अर्थ खो जाएगा।', 'मुहावरा और लोकोक्ति (कहावत) अलग हैं। लोकोक्ति अपने-आप में पूरा वाक्य होती है और कोई सीख देती है, जैसे "जैसी करनी वैसी भरनी"। मुहावरा अधूरा वाक्यांश है जो वाक्य में जुड़कर अर्थ देता है। परीक्षा में अक्सर "मुहावरे का अर्थ लिखकर वाक्य में प्रयोग कीजिए" आता है — इसलिए यहाँ हर मुहावरे के साथ वाक्य दिया है।'],
      howH: 'परीक्षा में अच्छे नंबर के लिए', how: ['पहले अर्थ लिखें, फिर ऐसा वाक्य बनाएँ जिससे अर्थ साफ़ झलके — "वह आग बबूला हो गया" से अच्छा है "टूटा गिलास देखकर मालिक आग बबूला हो गए"।', 'मुहावरे की क्रिया को काल के हिसाब से बदलें (होना → हो गया, हो गई)।', 'अपने आस-पास की बातों से वाक्य बनाएँ — याद भी जल्दी होता है।'],
      faq: [['मुहावरा किसे कहते हैं?', 'ऐसा शब्द-समूह जो अपने सीधे अर्थ की जगह कोई ख़ास अर्थ दे, जैसे "आँख का तारा" यानी बहुत प्यारा।'], ['मुहावरे और लोकोक्ति में क्या अंतर है?', 'लोकोक्ति पूरा वाक्य है और सीख देती है; मुहावरा वाक्यांश है जो वाक्य में जुड़कर अर्थ देता है।'], ['"नौ दो ग्यारह होना" का अर्थ?', 'भाग जाना। वाक्य: पुलिस को देखते ही चोर नौ दो ग्यारह हो गए।'], ['"दाल में काला होना" का अर्थ?', 'किसी गड़बड़ का शक होना।']] },
    en: { nav: 'Muhavare', t: `Hindi Muhavare with Meaning in English — ${MU.length} Idioms with Sentences | NextGrade`, d: `${MU.length} popular Hindi muhavare (idioms) with Hindi and English meanings and an example sentence for each — for classes 5 to 10, with a practice quiz.`, h1: '💬 Hindi Muhavare — idioms with meaning', lead: `${MU.length} popular Hindi idioms (muhavare), each with its meaning in Hindi and English and a simple example sentence we wrote from everyday life.`, th: ['Muhavara', 'Meaning', 'Example sentence'],
      about: ['A muhavara is a group of words that gives a special meaning instead of its literal one. “Nau do gyaarah hona” has nothing to do with counting — it means to run away. Idioms make language lively; a short muhavara can say what would otherwise take a whole sentence.', 'A muhavara is always used inside a sentence, and its verb changes with the sentence: “nau do gyaarah hona” → “chor nau do gyaarah ho gaye”. Its words must not be changed — “das do baarah hona” loses the meaning.', 'A muhavara is different from a lokokti (proverb). A lokokti is a complete sentence with a lesson, like “jaisi karni waisi bharni” (as you sow, so shall you reap). A muhavara is a phrase that only works inside a sentence. Exams often ask to “write the meaning and use it in a sentence”, so every idiom here comes with one.'],
      howH: 'Scoring well in exams', how: ['Write the meaning first, then a sentence that shows the meaning clearly.', 'Change the idiom’s verb to fit the tense (hona → ho gaya, ho gayi).', 'Build sentences from your own surroundings — they are easier to remember.'],
      faq: [['What is a muhavara?', 'A phrase that gives a special meaning instead of its literal one, e.g. “aankh ka taara” — the apple of one’s eye.'], ['Difference between muhavara and lokokti?', 'A lokokti is a full sentence with a lesson; a muhavara is a phrase that gives meaning only inside a sentence.'], ['Meaning of “nau do gyaarah hona”?', 'To run away.'], ['Meaning of “daal mein kaala hona”?', 'To suspect something is wrong — something fishy.']] },
  },
};
const UI = {
  hi: { quizH: 'अभ्यास करें — 10 सवाल', quizQ: { vilom: (w) => `"${w}" का विलोम शब्द क्या है?`, paryay: (w) => `"${w}" का पर्यायवाची कौन सा है?`, muhavare: (w) => `"${w}" का अर्थ क्या है?` }, start: 'क्विज़ शुरू करें', again: 'फिर से खेलें', score: 'आपके अंक', right: 'सही!', wrong: 'सही जवाब:', faqH: 'अक्सर पूछे जाने वाले सवाल', listH: 'पूरी सूची', more: 'हिंदी व्याकरण' },
  en: { quizH: 'Practice — 10 questions', quizQ: { vilom: (w) => `What is the vilom (opposite) of “${w}”?`, paryay: (w) => `Which is a paryayvachi (synonym) of “${w}”?`, muhavare: (w) => `What does “${w}” mean?` }, start: 'Start quiz', again: 'Play again', score: 'Your score', right: 'Correct!', wrong: 'Correct answer:', faqH: 'Frequently asked questions', listH: 'Full list', more: 'Hindi grammar' },
};
const CSS = '<style>.vy-t{width:100%;border-collapse:collapse;font-size:1rem}.vy-t th,.vy-t td{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top}.vy-t th{background:var(--soft,#f5f5f5)}.vy-t small{color:var(--muted)}.vy-q{border:1px solid var(--line);border-radius:12px;padding:14px;margin:12px 0}.vy-q button.opt{display:block;width:100%;text-align:left;margin:6px 0}.vy-q .ok{outline:2px solid #2f9e44}.vy-q .no{outline:2px solid #e03131}@media print{header,footer,.no-print,.ad{display:none!important}}</style>';

export const VYAKARAN_NAV = { hi: Object.fromEntries(Object.values(TX).map((x) => [x.path, x.hi.nav])), en: Object.fromEntries(Object.values(TX).map((x) => [x.path, x.en.nav])) };
export const VYAKARAN_COUNTS = { vilom: V.length, paryay: PY.length, muhavare: MU.length };

export function buildVyakaran(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, U = UI[code]; if (!U) return;
  const langs = LANGS.filter((l) => UI[l.code]);
  const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  Object.entries(TX).forEach(([key, X]) => {
    const Y = X[code], path = X.path;
    let table, quiz;
    if (key === 'vilom') {
      table = `<table class="vy-t"><thead><tr>${Y.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${V.map(([a, b, ea, eb]) => `<tr><td><b>${esc(a)}</b></td><td><b>${esc(b)}</b></td>${code === 'en' ? `<td><small>${esc(ea)} ↔ ${esc(eb)}</small></td>` : ''}</tr>`).join('')}</tbody></table>`;
      quiz = V.flatMap(([a, b]) => [[a, b], [b, a]]);
    } else if (key === 'paryay') {
      table = `<table class="vy-t"><thead><tr>${Y.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${PY.map(([w, s, e]) => `<tr><td><b>${esc(w)}</b></td><td>${esc(s.join(', '))}</td>${code === 'en' ? `<td><small>${esc(e)}</small></td>` : ''}</tr>`).join('')}</tbody></table>`;
      quiz = PY.flatMap(([w, s]) => s.map((x) => [w, x]));
    } else {
      table = `<table class="vy-t"><thead><tr>${Y.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${MU.map(([m, a, s, e], i) => `<tr><td><b>${i + 1}. ${esc(m)}</b></td><td>${esc(a)}${code === 'en' ? `<br><small>${esc(e)}</small>` : ''}</td><td>${esc(s)}</td></tr>`).join('')}</tbody></table>`;
      quiz = MU.map(([m, a, , e]) => [m, code === 'en' ? e : a]);
    }
    const qId = `vyq-${key}`;
    const quizHtml = `<div class="vy-q no-print" id="${qId}"><button class="btn btn-primary" type="button">${esc(U.start)}</button></div>
<script>(function(){var D=${JSON.stringify(quiz).replace(/</g, '\\u003c')},box=document.getElementById('${qId}'),Q=${JSON.stringify(U.quizQ[key]('§'))},R=${JSON.stringify(U.right)},W=${JSON.stringify(U.wrong)},S=${JSON.stringify(U.score)},A=${JSON.stringify(U.again)};
function sh(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function run(){var used={},qs=[],n=0,sc=0;sh(D.slice()).forEach(function(p){if(qs.length<10&&!used[p[0]]){used[p[0]]=1;qs.push(p);}});
function ask(){box.innerHTML='';if(n>=qs.length){box.appendChild(el('p','',S+': '+sc+' / '+qs.length));var b=el('button','btn btn-primary',A);b.type='button';b.onclick=run;box.appendChild(b);return;}
var q=qs[n],opts=[q[1]],pool=sh(D.slice());for(var i=0;i<pool.length&&opts.length<4;i++){var o=pool[i][1];if(opts.indexOf(o)<0&&pool[i][0]!==q[0]&&!D.some(function(d){return d[0]===q[0]&&d[1]===o;}))opts.push(o);}
box.appendChild(el('p','',(n+1)+'/'+qs.length));box.appendChild(el('h3','',Q.replace('§',q[0])));var fb=el('p');
sh(opts).forEach(function(o){var b=el('button','btn btn-ghost opt',o);b.type='button';b.onclick=function(){[].forEach.call(box.querySelectorAll('.opt'),function(x){x.disabled=true;if(x.textContent===q[1])x.classList.add('ok');});if(o===q[1]){sc++;fb.textContent=R;}else{b.classList.add('no');fb.textContent=W+' '+q[1];}setTimeout(function(){n++;ask();},1100);};box.appendChild(b);});box.appendChild(fb);}
ask();}
box.querySelector('button').onclick=run;})();</script>`;
    const others = Object.values(TX).filter((o) => o !== X).map((o) => `<a class="tag" href="${P(L, o.path)}">${o.emoji} ${esc(o[code].nav)}</a>`).join(' ');
    write(L, path, page(L, {
      path, title: Y.t, description: Y.d, langs,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [Y.nav, path]]), faqLd(Y.faq)],
      body: `${CSS}<div class="wrap narrow article"><p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(Y.nav)}</p>
<h1>${esc(Y.h1)}</h1><p class="lead">${esc(Y.lead)}</p>
${Y.about.slice(0, 1).map((p) => `<p>${esc(p)}</p>`).join('')}
<h2 class="no-print">${esc(U.quizH)}</h2>${quizHtml}
<div class="ad no-print" aria-hidden="true"></div>
<h2>${esc(U.listH)}</h2>${table}
${Y.about.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}
<h2>${esc(Y.howH)}</h2><ul>${Y.how.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
<h2>${esc(U.faqH)}</h2>${Y.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<h2 class="no-print">${esc(U.more)}</h2><p class="chips no-print">${others}</p></div>`,
    }));
  });
}
