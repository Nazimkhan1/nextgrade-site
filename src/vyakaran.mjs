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

const LOKOKTI = `अधजल गगरी छलकत जाय|कम जानने वाला ज़्यादा दिखावा करता है|मोहन ने दो दिन गिटार सीखा और सबको गुरु बनकर सिखाने लगा — अधजल गगरी छलकत जाय।|an empty vessel makes the most noise
अंधों में काना राजा|मूर्खों के बीच थोड़ा जानने वाला भी बड़ा माना जाता है|गाँव में किसी को फ़ोन चलाना नहीं आता, तो थोड़ा जानने वाला राजू अंधों में काना राजा बन गया।|in the land of the blind the one-eyed man is king
अकेला चना भाड़ नहीं फोड़ सकता|अकेला आदमी बड़ा काम नहीं कर सकता|गली की सफ़ाई सबको मिलकर करनी होगी, अकेला चना भाड़ नहीं फोड़ सकता।|one person alone cannot achieve much
अब पछताए होत क्या जब चिड़िया चुग गई खेत|समय निकल जाने पर पछताने से कोई लाभ नहीं|साल भर पढ़ा नहीं, अब रोने से क्या — अब पछताए होत क्या जब चिड़िया चुग गई खेत।|no use crying over spilt milk
आ बैल मुझे मार|जान-बूझकर मुसीबत मोल लेना|सोते कुत्ते को छेड़ना तो आ बैल मुझे मार वाली बात है।|to invite trouble
आगे कुआँ पीछे खाई|दोनों तरफ़ मुसीबत|नौकरी छोड़ूँ तो पैसे नहीं, न छोड़ूँ तो सेहत नहीं — आगे कुआँ पीछे खाई।|between the devil and the deep sea
आम के आम गुठलियों के दाम|एक चीज़ से दोहरा लाभ|पुरानी किताबें बेचीं तो पैसे भी मिले और कमरा भी खाली हुआ — आम के आम गुठलियों के दाम।|to kill two birds with one stone
उल्टा चोर कोतवाल को डाँटे|दोषी ही उल्टा दूसरे पर दोष लगाए|ग़लती ख़ुद की और डाँट रहा है दुकानदार को — उल्टा चोर कोतवाल को डाँटे।|the guilty one accusing the innocent
ऊँची दुकान फीका पकवान|नाम बड़ा पर गुण कम|इतना बड़ा होटल, पर खाना बेस्वाद — ऊँची दुकान फीका पकवान।|great show, little substance
एक अनार सौ बीमार|चीज़ एक और चाहने वाले बहुत|एक नौकरी के लिए हज़ार अर्ज़ियाँ — एक अनार सौ बीमार।|too many seekers for one thing
एक पंथ दो काज|एक काम से दो काम बन जाना|बाज़ार गया तो बिजली का बिल भी भर आया — एक पंथ दो काज।|two jobs done in one trip
ओखली में सिर दिया तो मूसल से क्या डरना|कठिन काम शुरू किया तो मुश्किलों से क्या डरना|पहाड़ चढ़ने निकले हो तो थकान से क्या घबराना — ओखली में सिर दिया तो मूसल से क्या डरना।|once committed, don't fear the hardships
कभी नाव गाड़ी पर कभी गाड़ी नाव पर|समय बदलता रहता है, सबको एक-दूसरे की ज़रूरत पड़ती है|आज तुम मदद करो, कल मैं करूँगा — कभी नाव गाड़ी पर कभी गाड़ी नाव पर।|everyone needs everyone at some time
का बरखा जब कृषि सुखाने|मौका निकल जाने पर मदद बेकार|परीक्षा के बाद किताब लाकर दी तो क्या — का बरखा जब कृषि सुखाने।|help that comes too late is useless
कोयले की दलाली में हाथ काले|बुरे काम में साथ देने से बदनामी मिलती है|चोरों के साथ घूमोगे तो बदनाम होगे ही — कोयले की दलाली में हाथ काले।|bad company brings a bad name
खोदा पहाड़ निकली चुहिया|बहुत मेहनत पर फल बहुत थोड़ा|पूरा दिन लाइन में लगे और मिला एक फ़ॉर्म — खोदा पहाड़ निकली चुहिया।|much ado about nothing
घर का भेदी लंका ढाए|घर का आदमी भेद खोले तो बड़ा नुकसान होता है|दुकान का राज़ कर्मचारी ने ही बता दिया — घर का भेदी लंका ढाए।|an insider's betrayal does the most harm
घर की मुर्गी दाल बराबर|घर की चीज़ या आदमी की कद्र नहीं होती|माँ के हाथ का खाना रोज़ मिलता है, इसलिए घर की मुर्गी दाल बराबर लगता है।|familiarity breeds contempt
चोर की दाढ़ी में तिनका|दोषी ख़ुद ही डरा-डरा रहता है|पैसों की बात छिड़ते ही वह घबरा गया — चोर की दाढ़ी में तिनका।|a guilty conscience gives itself away
जल में रहकर मगर से बैर|जिसके साथ रहना है उससे दुश्मनी ठीक नहीं|अपने ही अफ़सर से रोज़ लड़ना जल में रहकर मगर से बैर है।|don't fight the one you depend on
जहाँ चाह वहाँ राह|इच्छा पक्की हो तो रास्ता मिल ही जाता है|गरीबी में भी उसने पढ़ाई पूरी की — जहाँ चाह वहाँ राह।|where there's a will there's a way
जितनी चादर उतने पैर पसारो|आमदनी के हिसाब से ख़र्च करो|उधार लेकर महँगा फ़ोन मत लो, जितनी चादर उतने पैर पसारो।|cut your coat according to your cloth
जिसकी लाठी उसकी भैंस|ताकतवर की ही चलती है|कमज़ोर की कोई नहीं सुनता — जिसकी लाठी उसकी भैंस।|might is right
जैसी करनी वैसी भरनी|जैसा काम वैसा फल|सबको धोखा दिया, आज ख़ुद धोखा खाया — जैसी करनी वैसी भरनी।|as you sow, so shall you reap
थोथा चना बाजे घना|गुणहीन आदमी ज़्यादा शोर करता है|जो कुछ नहीं जानता वही सबसे ज़्यादा बोलता है — थोथा चना बाजे घना।|empty vessels make the most noise
दीवार के भी कान होते हैं|गुप्त बात सावधानी से करनी चाहिए|धीरे बोलो, दीवार के भी कान होते हैं।|walls have ears
दूध का दूध पानी का पानी|सच्चा और सही न्याय|पंचायत ने दोनों की सुनकर दूध का दूध पानी का पानी कर दिया।|fair and exact justice
दूर के ढोल सुहावने|दूर की चीज़ें अच्छी लगती हैं|शहर की ज़िंदगी गाँव से अच्छी लगती थी, पर दूर के ढोल सुहावने होते हैं।|the grass is always greener on the other side
नाच न जाने आँगन टेढ़ा|काम न आने पर बहाने बनाना|गेंद नहीं पकड़ पाया तो धूप को दोष दे रहा है — नाच न जाने आँगन टेढ़ा।|a bad workman blames his tools
नौ नकद न तेरह उधार|नकद का थोड़ा, उधार के ज़्यादा से अच्छा|आज के सौ रुपये अगले साल के दो सौ से अच्छे — नौ नकद न तेरह उधार।|a bird in the hand is worth two in the bush
न रहेगा बाँस न बजेगी बाँसुरी|झगड़े की जड़ ही ख़त्म कर देना|बच्चे टीवी के लिए लड़ते थे, पापा ने टीवी बंद कर दिया — न रहेगा बाँस न बजेगी बाँसुरी।|remove the root of the problem
बंदर क्या जाने अदरक का स्वाद|मूर्ख अच्छी चीज़ की कद्र नहीं जानता|उसे पुरानी किताबों का मोल क्या पता — बंदर क्या जाने अदरक का स्वाद।|pearls before swine
बूँद-बूँद से घड़ा भरता है|थोड़ा-थोड़ा जोड़ने से बहुत हो जाता है|रोज़ दस रुपये बचाए तो साल में बड़ी रकम बनी — बूँद-बूँद से घड़ा भरता है।|little drops make an ocean
बोए पेड़ बबूल का तो आम कहाँ से होय|बुरे काम का अच्छा फल नहीं मिलता|साल भर खेलते रहे और अच्छे नंबर चाहिए — बोए पेड़ बबूल का तो आम कहाँ से होय।|bad deeds don't bring good results
भैंस के आगे बीन बजाए भैंस खड़ी पगुराय|नासमझ को समझाना बेकार|उसे कितना भी समझाओ, भैंस के आगे बीन बजाने जैसा है।|casting pearls before swine
मान न मान मैं तेरा मेहमान|ज़बरदस्ती गले पड़ना|बिना बुलाए शादी में आ गया — मान न मान मैं तेरा मेहमान।|an uninvited guest forcing himself in
मुँह में राम बगल में छुरी|ऊपर से मीठा, अंदर से कपटी|उसकी मीठी बातों पर मत जाओ, मुँह में राम बगल में छुरी है।|a wolf in sheep's clothing
सावन के अंधे को हरा ही हरा सूझता है|जो एक ही हालत में रहा, उसे सब वैसा ही दिखता है|अमीर को लगता है सब आराम में हैं — सावन के अंधे को हरा ही हरा सूझता है।|seeing everything through one's own situation
साँप भी मर जाए और लाठी भी न टूटे|काम भी बन जाए और नुकसान भी न हो|ऐसा रास्ता निकालो कि साँप भी मर जाए और लाठी भी न टूटे।|to solve a problem without any loss
सौ सुनार की एक लोहार की|कमज़ोर की सौ चोटों पर ताकतवर की एक भारी|सब बहस करते रहे, दादाजी की एक बात ने फ़ैसला कर दिया — सौ सुनार की एक लोहार की।|one strong blow outweighs many weak ones
हाथ कंगन को आरसी क्या|जो सामने है उसे सबूत की ज़रूरत नहीं|तुम्हें यक़ीन नहीं तो ख़ुद चलकर देख लो — हाथ कंगन को आरसी क्या।|what is evident needs no proof
होनहार बिरवान के होत चीकने पात|होनहार के गुण बचपन में ही दिख जाते हैं|पाँच साल की उम्र में ही वह शतरंज जीतने लगा — होनहार बिरवान के होत चीकने पात।|the child is father of the man
घर में नहीं दाने अम्मा चली भुनाने|पास कुछ न होने पर भी दिखावा करना|तनख़्वाह मिली नहीं और पार्टी की तैयारी — घर में नहीं दाने अम्मा चली भुनाने।|showing off without the means`;

const ANEKARTHI = `अंक|संख्या, गोद, नाटक का भाग, निशान|number, lap, act of a play, mark
अंबर|आकाश, कपड़ा|sky, cloth
अर्थ|मतलब, धन, कारण|meaning, wealth, purpose
आम|एक फल, साधारण|mango, ordinary
उत्तर|जवाब, एक दिशा|answer, north
कर|हाथ, टैक्स, किरण, सूँड|hand, tax, ray, trunk
कल|बीता हुआ दिन, आने वाला दिन, मशीन, चैन|yesterday, tomorrow, machine, peace
काम|कार्य, इच्छा|work, desire
काल|समय, मृत्यु, अकाल|time, death, famine
कुल|वंश, सब मिलाकर|family line, total
गुण|विशेषता, हुनर, धागा|quality, skill, thread
घन|बादल, हथौड़ा, ठोस आकार|cloud, sledgehammer, cube
जलज|कमल, मोती, शंख, मछली|lotus, pearl, conch, fish
तात|पिता, भाई, प्यारा|father, brother, dear one
तीर|बाण, किनारा|arrow, river bank
दल|समूह, पत्ता, सेना|group, leaf, army
द्विज|ब्राह्मण, पक्षी, दाँत|brahmin, bird, tooth
धन|पैसा, जोड़ का चिह्न|wealth, plus sign
पक्ष|तरफ़, पंख, पखवाड़ा|side, wing, fortnight
पत्र|चिट्ठी, पत्ता, अख़बार|letter, leaf, newspaper
पद|पैर, ओहदा, कविता का चरण|foot, post, verse
पानी|जल, इज़्ज़त, चमक|water, honour, shine
पृष्ठ|पन्ना, पीठ|page, back
फल|खाने का फल, परिणाम, लाभ|fruit, result, gain
बाल|केश, बच्चा|hair, child
भाग|हिस्सा, भाग्य|part, fate
मान|इज़्ज़त, माप, घमंड|honour, measure, pride
मित्र|दोस्त, सूर्य|friend, sun
रस|स्वाद, सार, जूस|taste, essence, juice
लाल|एक रंग, बेटा, रत्न|red, son, gem
वर|दूल्हा, वरदान, श्रेष्ठ|bridegroom, boon, best
वर्ण|रंग, अक्षर, जाति|colour, letter, caste
सारंग|मोर, हिरण, बादल, साँप, हाथी|peacock, deer, cloud, snake, elephant
सोना|स्वर्ण, नींद लेना|gold, to sleep
हरि|विष्णु, बंदर, सिंह, घोड़ा|Vishnu, monkey, lion, horse
हल|खेत जोतने का औज़ार, समाधान|plough, solution
हार|माला, पराजय|garland, defeat`;

const EKSHABD = `जो ईश्वर में विश्वास रखे|आस्तिक|believer in God
जो ईश्वर में विश्वास न रखे|नास्तिक|atheist
जिसका कोई अंत न हो|अनंत|endless
जो कभी न मरे|अमर|immortal
जिसे जीता न जा सके|अजेय|invincible
जो दिखाई न दे|अदृश्य|invisible
जो पढ़ना-लिखना न जानता हो|निरक्षर|illiterate
जिसके माता-पिता न हों|अनाथ|orphan
जो दूसरों के अधीन हो|पराधीन|dependent
जो किसी के अधीन न हो|स्वाधीन|independent
जो किए उपकार को न माने|कृतघ्न|ungrateful
जो किए उपकार को माने|कृतज्ञ|grateful
जो बहुत बोलता हो|वाचाल|talkative
जो कम बोलता हो|मितभाषी|of few words
जो मीठा बोलता हो|मधुरभाषी|sweet-spoken
जो सब कुछ जानता हो|सर्वज्ञ|all-knowing
जो सब जगह मौजूद हो|सर्वव्यापी|omnipresent
जिसकी तुलना न की जा सके|अतुलनीय|incomparable
जिसका वर्णन न किया जा सके|अवर्णनीय|indescribable
जो देखने योग्य हो|दर्शनीय|worth seeing
जो पूजा के योग्य हो|पूजनीय|worthy of worship
जो विश्वास के योग्य हो|विश्वसनीय|trustworthy
जो आँखों के सामने हो|प्रत्यक्ष|visible, direct
जो आँखों के सामने न हो|परोक्ष|indirect, hidden
जो पहले कभी न हुआ हो|अभूतपूर्व|unprecedented
जो पहले जन्मा हो (बड़ा भाई)|अग्रज|elder brother
जो बाद में जन्मा हो (छोटा भाई)|अनुज|younger brother
एक ही माँ से जन्मे|सहोदर|born of the same mother
जो दूसरों की भलाई करे|परोपकारी|benevolent
जो केवल अपना भला सोचे|स्वार्थी|selfish
जो मांस खाता हो|मांसाहारी|non-vegetarian
जो केवल शाकाहार करे|शाकाहारी|vegetarian
जो गाँव में रहता हो|ग्रामीण|villager
जो अपना देश छोड़कर दूसरी जगह बसा हो|प्रवासी|emigrant
जो देश से प्रेम करे|देशभक्त|patriot
जो देश से विश्वासघात करे|देशद्रोही|traitor
जो दान करता हो|दानी|donor, charitable
जिसने ऋण लिया हो|ऋणी|debtor
जो कठिनाई से मिले|दुर्लभ|rare
जो आसानी से मिल जाए|सुलभ|easily available
जो सदा बना रहे|शाश्वत|eternal
जो थोड़ी देर ही रहे|क्षणिक|momentary
जिसकी आयु लंबी हो|दीर्घायु|long-lived
जो सप्ताह में एक बार हो|साप्ताहिक|weekly
जो महीने में एक बार हो|मासिक|monthly
जो साल में एक बार हो|वार्षिक|yearly
जो हर दिन हो|दैनिक|daily
जो बिना वेतन के काम करे|अवैतनिक|unpaid, honorary
जिसके पास कुछ भी न हो|अकिंचन|penniless
जो पानी में रहे|जलचर|aquatic animal
जो आकाश में उड़े|नभचर|creature of the sky
जो ज़मीन पर रहे|थलचर|land animal
जहाँ पहुँचना कठिन हो|दुर्गम|inaccessible
जो कहा न जा सके|अकथनीय|unspeakable
जिसकी कल्पना भी न की जा सके|अकल्पनीय|unimaginable
जो नियम या क़ानून के विरुद्ध हो|अवैध|illegal
जो किसी के बाद उसका अधिकार पाए|उत्तराधिकारी|successor, heir
जो सबको प्रिय हो|लोकप्रिय|popular
जो खाने योग्य हो|खाद्य|edible
जो पीने योग्य हो|पेय|drinkable`;


const rows = (s) => s.trim().split('\n').map((l) => l.split('|'));
const V = rows(VILOM), PY = rows(PARYAY).map(([w, s, e]) => [w, s.split(', '), e]), MU = rows(MUHAVARE);
const LK = rows(LOKOKTI), AN = rows(ANEKARTHI).map(([w, m, e]) => [w, m.split(', '), e]), ES = rows(EKSHABD);

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
  lokokti: {
    path: '/lokoktiyan/', emoji: '📜',
    hi: { nav: 'लोकोक्तियाँ', t: `लोकोक्तियाँ (कहावतें) और उनके अर्थ — ${LK.length} लोकोक्तियाँ, वाक्य प्रयोग सहित | NextGrade`, d: `${LK.length} प्रसिद्ध हिंदी लोकोक्तियाँ (कहावतें), उनका अर्थ और आसान वाक्य प्रयोग। लोकोक्ति और मुहावरे का फ़र्क, अभ्यास क्विज़।`, h1: '📜 लोकोक्तियाँ (कहावतें) और उनके अर्थ', lead: `${LK.length} प्रसिद्ध लोकोक्तियाँ — हर एक का सरल अर्थ और रोज़ की ज़िंदगी से बना वाक्य प्रयोग।`, th: ['लोकोक्ति', 'अर्थ', 'वाक्य प्रयोग'],
      about: ['लोकोक्ति यानी "लोक की उक्ति" — लोगों के बीच चली आ रही ऐसी बात जिसमें किसी अनुभव का निचोड़ हो। इन्हें कहावत भी कहते हैं। "जैसी करनी वैसी भरनी" एक पूरा वाक्य है जो अपने-आप में सीख देता है। पीढ़ियों के अनुभव से बनी ये बातें छोटी होती हैं, पर बड़ी बात कह जाती हैं।', 'लोकोक्ति और मुहावरे में सबसे बड़ा फ़र्क यह है कि लोकोक्ति पूरा वाक्य होती है और अकेले भी अर्थ देती है, जबकि मुहावरा वाक्यांश होता है जो वाक्य में जुड़कर ही अर्थ देता है। लोकोक्ति के शब्द नहीं बदलते और उसे अक्सर वाक्य के अंत में, किसी बात को सिद्ध करने के लिए, जोड़ा जाता है — जैसे हमारे उदाहरणों में।', 'कई लोकोक्तियों में पुरानी बोलियों के शब्द हैं: "अधजल गगरी छलकत जाय" (आधी भरी मटकी छलकती है), "का बरखा जब कृषि सुखाने" (फ़सल सूखने के बाद बारिश का क्या लाभ) — यह तुलसीदास जी की रामचरितमानस से निकली पंक्ति है। अर्थ समझकर याद करें तो ये कभी नहीं भूलतीं।'],
      howH: 'परीक्षा में कैसे लिखें', how: ['पहले अर्थ लिखें, फिर ऐसी स्थिति बताएँ जिसमें लोकोक्ति ठीक बैठे, और आख़िर में लोकोक्ति जोड़ें।', 'लोकोक्ति के शब्द न बदलें — "अधजल गगरी छलकत जाय" को "आधी गगरी छलकती है" न लिखें।', 'मिलती-जुलती लोकोक्तियाँ साथ याद करें: अधजल गगरी / थोथा चना बाजे घना।'],
      faq: [['लोकोक्ति किसे कहते हैं?', 'लोगों में प्रचलित ऐसा पूरा वाक्य जो किसी अनुभव या सीख को थोड़े शब्दों में कहे, जैसे "जैसी करनी वैसी भरनी"।'], ['लोकोक्ति और मुहावरे में क्या अंतर है?', 'लोकोक्ति पूरा वाक्य है और अकेले अर्थ देती है; मुहावरा वाक्यांश है जो वाक्य में जुड़कर अर्थ देता है।'], ['"अधजल गगरी छलकत जाय" का अर्थ?', 'कम जानने वाला ज़्यादा दिखावा करता है।'], ['"नाच न जाने आँगन टेढ़ा" का अर्थ?', 'काम न आने पर बहाने बनाना।']] },
    en: { nav: 'Lokoktiyan', t: `Hindi Lokoktiyan (Proverbs) with English Meaning — ${LK.length} Kahavat | NextGrade`, d: `${LK.length} popular Hindi lokoktiyan (proverbs, kahavat) with meaning in Hindi and English, an example sentence for each and a practice quiz.`, h1: '📜 Hindi Lokoktiyan — proverbs with meaning', lead: `${LK.length} popular Hindi proverbs (lokokti or kahavat), each with its meaning in Hindi and English, the nearest English proverb and an everyday example sentence.`, th: ['Lokokti', 'Meaning', 'Example sentence'],
      about: ['Lokokti means “saying of the people” — a line handed down through generations that packs a lesson from experience. They are also called kahavat. “Jaisi karni waisi bharni” is a full sentence that teaches something on its own: as you sow, so shall you reap.', 'The key difference from a muhavara: a lokokti is a complete sentence and makes sense alone, while a muhavara is a phrase that only works inside a sentence. A lokokti’s words never change, and it is usually added at the end of a sentence to drive a point home — as in our examples.', 'Many proverbs keep old dialect words: “adhjal gagri chhalkat jaay” (a half-filled pot spills), “ka barkha jab krishi sukhaane” (what use is rain once the crop has dried) — a line from Tulsidas’s Ramcharitmanas. Learn the meaning and they stay with you.'],
      howH: 'Writing them in exams', how: ['Write the meaning, describe a situation where it fits, and end with the proverb.', 'Never change a proverb’s words.', 'Learn similar proverbs together: adhjal gagri / thotha chana baaje ghana.'],
      faq: [['What is a lokokti?', 'A popular complete saying that puts a lesson in a few words, e.g. “jaisi karni waisi bharni”.'], ['Lokokti vs muhavara?', 'A lokokti is a full sentence and stands alone; a muhavara is a phrase used inside a sentence.'], ['Meaning of “adhjal gagri chhalkat jaay”?', 'Those who know little show off the most — an empty vessel makes the most noise.'], ['Meaning of “naach na jaane aangan tedha”?', 'Making excuses when you can’t do something — a bad workman blames his tools.']] },
  },
  anekarthi: {
    path: '/anekarthi-shabd/', emoji: '🔀',
    hi: { nav: 'अनेकार्थी शब्द', t: `अनेकार्थी शब्द — ${AN.length} शब्द, हर एक के कई अर्थ (Anekarthi Shabd) | NextGrade`, d: `${AN.length} ज़रूरी अनेकार्थी शब्द — एक शब्द, कई अर्थ: कर, कल, अंबर, वर्ण, सारंग, हरि आदि। स्कूल परीक्षा के लिए सूची और अभ्यास क्विज़।`, h1: '🔀 अनेकार्थी शब्द', lead: `अनेकार्थी शब्द यानी ऐसे शब्द जिनके एक से ज़्यादा अर्थ होते हैं — जैसे "कल" बीता हुआ दिन भी है और आने वाला भी। यहाँ ${AN.length} ज़रूरी अनेकार्थी शब्द हैं।`, th: ['शब्द', 'अर्थ'],
      about: ['"अनेक" यानी कई और "अर्थ" यानी मतलब। जिस शब्द के एक से ज़्यादा अर्थ हों, उसे अनेकार्थी शब्द कहते हैं। हिंदी में संस्कृत से आए बहुत से शब्द ऐसे हैं, इसलिए वाक्य पढ़कर ही पता चलता है कि यहाँ कौन सा अर्थ है।', 'उदाहरण देखिए: "किसान ने हल चलाया" में हल खेत जोतने का औज़ार है, पर "इस सवाल का हल निकालो" में हल का मतलब समाधान है। "माली ने हार बनाया" में हार माला है और "टीम की हार हुई" में पराजय। कविता में कवि जान-बूझकर ऐसे शब्द रखते हैं ताकि एक शब्द से दो अर्थ निकलें — इसे श्लेष अलंकार कहते हैं।', 'अनेकार्थी शब्द पर्यायवाची से अलग हैं। पर्यायवाची में कई शब्द और एक अर्थ होता है (सूर्य — रवि, भानु), अनेकार्थी में एक शब्द और कई अर्थ (कर — हाथ, टैक्स, किरण)। परीक्षा में आम तौर पर हर शब्द के दो अर्थ लिखने होते हैं, और कभी-कभी दोनों अर्थों के अलग वाक्य भी।'],
      howH: 'याद करने के आसान तरीके', how: ['हर शब्द के दो अर्थों के छोटे वाक्य बनाएँ: "माँ की गोद (अंक) में बच्चा है; परीक्षा में अच्छे अंक आए।"', 'सारंग और हरि जैसे बहुत अर्थ वाले शब्दों की अलग सूची बनाकर दीवार पर लगाएँ।', 'नीचे वाला क्विज़ खेलें — हर बार अलग अर्थ पूछा जाता है।'],
      faq: [['अनेकार्थी शब्द किसे कहते हैं?', 'जिस शब्द के एक से ज़्यादा अर्थ हों, जैसे "कर" — हाथ, टैक्स, किरण।'], ['"कल" के कितने अर्थ हैं?', 'बीता हुआ दिन, आने वाला दिन, मशीन और चैन।'], ['"सारंग" के अर्थ क्या हैं?', 'मोर, हिरण, बादल, साँप, हाथी — यह सबसे ज़्यादा अर्थों वाले शब्दों में गिना जाता है।'], ['अनेकार्थी और पर्यायवाची में क्या अंतर है?', 'अनेकार्थी में एक शब्द के कई अर्थ, पर्यायवाची में एक अर्थ के कई शब्द।']] },
    en: { nav: 'Anekarthi Shabd', t: `Anekarthi Shabd — ${AN.length} Hindi Words with Many Meanings (English meanings) | NextGrade`, d: `${AN.length} important anekarthi shabd — Hindi words with more than one meaning (kar, kal, ambar, varn, saarang, hari…) with English meanings and a practice quiz.`, h1: '🔀 Anekarthi Shabd — one word, many meanings', lead: `Anekarthi shabd are Hindi words with more than one meaning — “kal” is both yesterday and tomorrow. Here are ${AN.length} important ones with English meanings.`, th: ['Word', 'Meanings', 'In English'],
      about: ['“Anek” means many and “arth” means meaning: a word with several meanings is an anekarthi shabd. Many Sanskrit-origin Hindi words are like this, so only the sentence tells you which meaning is meant.', 'For example, in “kisaan ne hal chalaaya” hal is a plough, but in “is sawaal ka hal nikaalo” it means a solution. “Maali ne haar banaaya” — a garland; “team ki haar hui” — a defeat. Poets use such words on purpose so that one word carries two meanings; this figure of speech is called shlesh alankaar.', 'Anekarthi words are the reverse of synonyms. Paryayvachi means many words, one meaning (soorya — ravi, bhaanu); anekarthi means one word, many meanings (kar — hand, tax, ray). Exams usually ask for two meanings of each word, sometimes with a sentence for each.'],
      howH: 'Easy ways to learn them', how: ['Make a short sentence for two meanings of each word.', 'Keep a separate list of words with many meanings, like saarang and hari.', 'Play the quiz below — it asks a different meaning each time.'],
      faq: [['What is anekarthi shabd?', 'A word with more than one meaning, e.g. “kar” — hand, tax, ray of light.'], ['How many meanings does “kal” have?', 'Yesterday, tomorrow, machine and peace.'], ['Meanings of “saarang”?', 'Peacock, deer, cloud, snake, elephant.'], ['Anekarthi vs paryayvachi?', 'Anekarthi: one word, many meanings. Paryayvachi: one meaning, many words.']] },
  },
  ekshabd: {
    path: '/anek-shabdon-ke-liye-ek-shabd/', emoji: '🎯',
    hi: { nav: 'अनेक शब्दों के लिए एक शब्द', t: `अनेक शब्दों के लिए एक शब्द — ${ES.length} उदाहरण, अभ्यास के साथ | NextGrade`, d: `${ES.length} ज़रूरी "अनेक शब्दों के लिए एक शब्द" (वाक्यांश के लिए एक शब्द) — आस्तिक, अजेय, सर्वज्ञ, दुर्लभ आदि। नियम, सूची और अभ्यास क्विज़।`, h1: '🎯 अनेक शब्दों के लिए एक शब्द', lead: `लंबी बात को एक शब्द में कहना — जैसे "जो ईश्वर में विश्वास रखे" = आस्तिक। यहाँ ${ES.length} ज़रूरी उदाहरण हैं।`, th: ['वाक्यांश', 'एक शब्द'],
      about: ['भाषा में कसावट लाने के लिए कई शब्दों की जगह एक शब्द रखा जाता है। "जो कभी न मरे" की जगह "अमर", "जिसे जीता न जा सके" की जगह "अजेय"। इसे वाक्यांश के लिए एक शब्द या शब्द-संक्षेप भी कहते हैं। अच्छे निबंध, पत्र और उत्तर में ये शब्द भाषा को छोटा और सुंदर बनाते हैं।', 'इनके पीछे कुछ नियम हैं जिन्हें समझ लें तो नए शब्द ख़ुद बना सकते हैं: "-नीय" यानी योग्य (दर्शनीय = देखने योग्य, पूजनीय, विश्वसनीय); "अ-" यानी नहीं (अजेय, अदृश्य, अमर); "सर्व-" यानी सब (सर्वज्ञ, सर्वव्यापी); "-चर" यानी चलने/रहने वाला (जलचर, नभचर, थलचर); "-इक" समय के साथ (दैनिक, मासिक, वार्षिक)।', 'ध्यान दें कि एक शब्द वाक्यांश का पूरा अर्थ दे। "जो पढ़ना-लिखना न जानता हो" के लिए "निरक्षर" या "अनपढ़" दोनों चलते हैं, पर "अज्ञानी" नहीं, क्योंकि अज्ञानी का मतलब ज्ञान न होना है, पढ़ाई न होना नहीं। कई वाक्यांश जोड़ों में आते हैं (आस्तिक/नास्तिक, कृतज्ञ/कृतघ्न) — इन्हें साथ याद करें।'],
      howH: 'याद करने के आसान तरीके', how: ['ऊपर दिए नियम (-नीय, अ-, सर्व-, -चर, -इक) पहले पक्के करें — आधे शब्द ख़ुद समझ आ जाएँगे।', 'जोड़े साथ याद करें: अग्रज-अनुज, सुलभ-दुर्लभ, पराधीन-स्वाधीन।', 'नीचे वाला क्विज़ रोज़ खेलें।'],
      faq: [['"जो ईश्वर में विश्वास रखे" के लिए एक शब्द?', 'आस्तिक। उल्टा — नास्तिक।'], ['"जिसका कोई अंत न हो" के लिए एक शब्द?', 'अनंत।'], ['"जो सब कुछ जानता हो" के लिए एक शब्द?', 'सर्वज्ञ।'], ['"जो उपकार न माने" के लिए एक शब्द?', 'कृतघ्न। जो उपकार माने — कृतज्ञ।']] },
    en: { nav: 'One Word Substitution (Hindi)', t: `Anek Shabdon Ke Liye Ek Shabd — ${ES.length} Hindi One-Word Substitutions | NextGrade`, d: `${ES.length} Hindi one-word substitutions (anek shabdon ke liye ek shabd) with English meanings — aastik, ajey, sarvagya, durlabh and more — with rules and a practice quiz.`, h1: '🎯 Anek shabdon ke liye ek shabd — Hindi one-word substitution', lead: `Saying a long phrase in one word — “jo Ishwar mein vishwaas rakhe” (one who believes in God) = aastik. Here are ${ES.length} important examples with English meanings.`, th: ['Phrase', 'One word', 'In English'],
      about: ['To make language tight, one word replaces a whole phrase: “jo kabhi na mare” (one who never dies) becomes “amar”, “jise jeeta na ja sake” becomes “ajey” (invincible). Good essays, letters and answers use these to sound short and polished.', 'A few patterns make many of them easy: “-neey” means worthy of (darshaneey = worth seeing, poojaneey, vishwasaneey); “a-” means not (ajey, adrishya, amar); “sarva-” means all (sarvagya, sarvavyaapi); “-char” means one that moves or lives (jalchar, nabhchar, thalchar); “-ik” for time (dainik, maasik, vaarshik).', 'The one word must carry the full meaning. For “one who cannot read or write”, “niraksar” or “anpadh” is right but “agyaani” is not — agyaani means lacking knowledge, not lacking schooling. Many come in pairs (aastik/naastik, kritagya/kritaghn); learn them together.'],
      howH: 'Easy ways to learn them', how: ['Master the patterns (-neey, a-, sarva-, -char, -ik) first.', 'Learn pairs together: agraj–anuj, sulabh–durlabh, paraadheen–swaadheen.', 'Play the quiz below every day.'],
      faq: [['One word for “one who believes in God”?', 'Aastik; the opposite is naastik.'], ['One word for “that which has no end”?', 'Anant.'], ['One word for “one who knows everything”?', 'Sarvagya.'], ['One word for “one who does not acknowledge a favour”?', 'Kritaghn; one who does is kritagya.']] },
  },
};
const UI = {
  hi: { quizH: 'अभ्यास करें — 10 सवाल', quizQ: { vilom: (w) => `"${w}" का विलोम शब्द क्या है?`, paryay: (w) => `"${w}" का पर्यायवाची कौन सा है?`, muhavare: (w) => `"${w}" का अर्थ क्या है?`, lokokti: (w) => `"${w}" का अर्थ क्या है?`, anekarthi: (w) => `"${w}" का एक अर्थ कौन सा है?`, ekshabd: (w) => `"${w}" — इसके लिए एक शब्द?` }, start: 'क्विज़ शुरू करें', again: 'फिर से खेलें', score: 'आपके अंक', right: 'सही!', wrong: 'सही जवाब:', faqH: 'अक्सर पूछे जाने वाले सवाल', listH: 'पूरी सूची', more: 'हिंदी व्याकरण' },
  en: { quizH: 'Practice — 10 questions', quizQ: { vilom: (w) => `What is the vilom (opposite) of “${w}”?`, paryay: (w) => `Which is a paryayvachi (synonym) of “${w}”?`, muhavare: (w) => `What does “${w}” mean?`, lokokti: (w) => `What does “${w}” mean?`, anekarthi: (w) => `Which is one meaning of “${w}”?`, ekshabd: (w) => `One word for: “${w}”?` }, start: 'Start quiz', again: 'Play again', score: 'Your score', right: 'Correct!', wrong: 'Correct answer:', faqH: 'Frequently asked questions', listH: 'Full list', more: 'Hindi grammar' },
};
const CSS = '<style>.vy-t{width:100%;border-collapse:collapse;font-size:1rem}.vy-t th,.vy-t td{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top}.vy-t th{background:var(--soft,#f5f5f5)}.vy-t small{color:var(--muted)}.vy-q{border:1px solid var(--line);border-radius:12px;padding:14px;margin:12px 0}.vy-q button.opt{display:block;width:100%;text-align:left;margin:6px 0}.vy-q .ok{outline:2px solid #2f9e44}.vy-q .no{outline:2px solid #e03131}@media print{header,footer,.no-print,.ad{display:none!important}}</style>';

const MENU_KEYS = ['vilom', 'paryay', 'muhavare']; // header dropdown stays short; the other pages are linked from every grammar page
export const VYAKARAN_NAV = Object.fromEntries(['hi', 'en'].map((c) => [c, Object.fromEntries(MENU_KEYS.map((k) => [TX[k].path, TX[k][c].nav]))]));
export const VYAKARAN_COUNTS = { vilom: V.length, paryay: PY.length, muhavare: MU.length, lokokti: LK.length, anekarthi: AN.length, ekshabd: ES.length };

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
    } else if (key === 'lokokti') {
      table = `<table class="vy-t"><thead><tr>${Y.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${LK.map(([m, a, s, e], i) => `<tr><td><b>${i + 1}. ${esc(m)}</b></td><td>${esc(a)}${code === 'en' ? `<br><small>${esc(e)}</small>` : ''}</td><td>${esc(s)}</td></tr>`).join('')}</tbody></table>`;
      quiz = LK.map(([m, a, , e]) => [m, code === 'en' ? e : a]);
    } else if (key === 'anekarthi') {
      table = `<table class="vy-t"><thead><tr>${Y.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${AN.map(([w, m, e]) => `<tr><td><b>${esc(w)}</b></td><td>${esc(m.join(', '))}</td>${code === 'en' ? `<td><small>${esc(e)}</small></td>` : ''}</tr>`).join('')}</tbody></table>`;
      quiz = AN.flatMap(([w, m]) => m.map((x) => [w, x]));
    } else if (key === 'ekshabd') {
      table = `<table class="vy-t"><thead><tr>${Y.th.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${ES.map(([ph, w, e]) => `<tr><td>${esc(ph)}</td><td><b>${esc(w)}</b></td>${code === 'en' ? `<td><small>${esc(e)}</small></td>` : ''}</tr>`).join('')}</tbody></table>`;
      quiz = ES.map(([ph, w]) => [ph, w]);
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
