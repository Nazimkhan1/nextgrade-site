/**
 * Creator Guide (plan item L, user idea 24 Nov 2026): /creator-guide/ + one page per platform.
 * Every step: what to do, the official link, and which fields to fill. Ends with "steps can change" (user's wish).
 * Only official links (youtube.com, google.com, instagram.com, facebook.com, blogger.com). No income promises.
 */
const L_ = (u) => u; // marks an official link

export const GUIDES = [
  {
    slug: 'youtube', emoji: '▶️',
    links: [L_('https://accounts.google.com/signup'), L_('https://www.youtube.com/'), L_('https://studio.youtube.com/'), L_('https://studio.youtube.com/'), L_('https://support.google.com/youtube/answer/72851'), L_('https://adsense.google.com/')],
    hi: {
      title: 'YouTube चैनल कैसे बनाएँ और पैसे कैसे कमाएँ — स्टेप बाय स्टेप (2026) | NextGrade',
      desc: 'YouTube चैनल बनाने से लेकर पहली कमाई तक हर स्टेप हिंदी में: Google खाता, चैनल का नाम और @handle, पहला वीडियो अपलोड करते समय क्या भरें, YouTube Partner Program की शर्तें और गलतियाँ जिनसे चैनल बंद हो सकता है।',
      h1: '▶️ YouTube चैनल बनाकर कमाई कैसे शुरू करें',
      lead: 'नीचे हर स्टेप के साथ सही (आधिकारिक) लिंक है और बताया है कि वहाँ कौन-सा खाना क्या भरना है। फ़ोन से भी हो जाता है।',
      steps: [
        ['Google खाता बनाएँ (अगर नहीं है)', 'YouTube चलाने के लिए Google (Gmail) खाता चाहिए। चैनल के लिए अलग Gmail बनाना अच्छा रहता है।', ['नाम', 'जन्म तिथि और लिंग', 'नया Gmail पता', 'मज़बूत पासवर्ड', 'फ़ोन नंबर (खाता सुरक्षित रखने के लिए)']],
        ['YouTube चैनल बनाएँ', 'youtube.com पर लॉग-इन करें → ऊपर दाएँ अपनी फ़ोटो → "चैनल बनाएँ / Create a channel"।', ['चैनल का नाम — छोटा, याद रहने वाला', '@handle — जैसे @apnarasoi (बाद में बदल सकते हैं)', 'प्रोफ़ाइल फ़ोटो — चेहरा या लोगो']],
        ['चैनल को सजाएँ (YouTube Studio → Customisation)', 'studio.youtube.com खोलें → बाईं ओर "Customisation"।', ['बैनर इमेज (2560×1440 px)', 'Description — चैनल किस बारे में है, कब नए वीडियो आते हैं', 'Links — Instagram/वेबसाइट', 'Contact info — बिज़नेस ईमेल']],
        ['पहला वीडियो अपलोड करें', 'Studio में ऊपर "Create → Upload videos" → वीडियो चुनें।', ['Title — लोग क्या खोजेंगे, वही शब्द (100 अक्षर तक)', 'Description — 2–3 लाइन में वीडियो का सार', 'Thumbnail — साफ़ चेहरा/बड़े अक्षर (फ़ोन नंबर वेरिफ़ाई करने पर)', 'Audience — "क्या यह बच्चों के लिए बना है?" सही चुनना ज़रूरी है', 'Visibility — Public / Unlisted / Schedule']],
        ['YouTube Partner Program (कमाई) में आवेदन', 'Studio → "Earn"। शर्तें पूरी होते ही Apply का बटन आता है; AdSense खाता जोड़ना होता है और चैनल की जाँच होती है।', ['शर्तें (सब्सक्राइबर, वॉच-टाइम या Shorts व्यूज़) — आधिकारिक पेज पर ताज़ा देखें', 'AdSense खाता — नाम और पता बिल्कुल बैंक/पहचान पत्र जैसा', 'टैक्स जानकारी (Studio → AdSense में)']],
        ['पेमेंट', 'कमाई AdSense में जमा होती है। तय न्यूनतम रक़म होने पर बैंक खाते में आती है; पहले पते पर PIN वेरिफ़िकेशन होता है।', ['बैंक खाते का नाम, नंबर, IFSC', 'PIN (डाक से आता है) डालकर पता वेरिफ़ाई करें']],
      ],
      moneyH: 'कमाई के और रास्ते', money: ['चैनल मेंबरशिप, Super Chat, Super Thanks (YPP के बाद)', 'ब्रांड के साथ स्पॉन्सर्ड वीडियो — वीडियो में "Paid promotion" का निशान लगाएँ', 'अपनी वेबसाइट/ब्लॉग — वहाँ भी AdSense'],
      dontH: '⚠️ ये ग़लतियाँ कभी न करें', dont: ['दूसरों के वीडियो, गाने या फ़िल्म के हिस्से बिना अनुमति न लगाएँ — कॉपीराइट स्ट्राइक से चैनल बंद हो सकता है', 'व्यूज़/सब्सक्राइबर ख़रीदें नहीं, "sub4sub" न करें', 'अपने ही विज्ञापनों पर क्लिक न करें, न करवाएँ', 'भ्रामक थंबनेल या ख़तरनाक स्टंट वाले वीडियो न डालें'],
      tool: 'अपनी अंदाज़न कमाई देखें: YouTube कमाई कैलकुलेटर →',
    },
    en: {
      title: 'How to Start a YouTube Channel and Earn Money — Step by Step (2026) | NextGrade',
      desc: 'Every step from creating a YouTube channel to the first payment: Google account, channel name and @handle, what to fill when uploading your first video, YouTube Partner Program and the mistakes that can get a channel removed.',
      h1: '▶️ How to start a YouTube channel and begin earning',
      lead: 'Each step below has the official link and tells you which field to fill with what. It all works from a phone too.',
      steps: [
        ['Create a Google account (if you have none)', 'You need a Google (Gmail) account for YouTube. A separate Gmail for the channel is a good idea.', ['Name', 'Date of birth and gender', 'New Gmail address', 'Strong password', 'Phone number (to keep the account safe)']],
        ['Create the YouTube channel', 'Sign in on youtube.com → your photo at the top right → "Create a channel".', ['Channel name — short and easy to remember', '@handle — e.g. @apnarasoi (can be changed later)', 'Profile picture — your face or a logo']],
        ['Set up the channel (YouTube Studio → Customisation)', 'Open studio.youtube.com → "Customisation" on the left.', ['Banner image (2560×1440 px)', 'Description — what the channel is about and when new videos come', 'Links — Instagram/website', 'Contact info — business email']],
        ['Upload your first video', 'In Studio: "Create → Upload videos" at the top → pick the video.', ['Title — the words people will search for (up to 100 characters)', 'Description — 2–3 lines summing up the video', 'Thumbnail — a clear face/big letters (after phone verification)', 'Audience — "Is this video made for kids?" must be answered correctly', 'Visibility — Public / Unlisted / Schedule']],
        ['Apply to the YouTube Partner Program (earning)', 'Studio → "Earn". When you meet the conditions an Apply button appears; you link an AdSense account and the channel is reviewed.', ['Conditions (subscribers, watch time or Shorts views) — check the official page for the current ones', 'AdSense account — name and address exactly as on your bank/ID', 'Tax information (Studio → AdSense)']],
        ['Getting paid', 'Earnings collect in AdSense and are paid to your bank once you reach the minimum; your address is first verified with a PIN sent by post.', ['Bank account name, number, IFSC', 'Enter the PIN (arrives by post) to verify your address']],
      ],
      moneyH: 'Other ways to earn', money: ['Channel memberships, Super Chat, Super Thanks (after YPP)', 'Sponsored videos with brands — tick "Paid promotion" on the video', 'Your own website/blog — AdSense there too'],
      dontH: '⚠️ Never make these mistakes', dont: ['Do not use other people’s videos, songs or film clips without permission — copyright strikes can remove the channel', 'Do not buy views/subscribers or do "sub4sub"', 'Never click your own ads or ask others to', 'No misleading thumbnails or dangerous stunts'],
      tool: 'Estimate your income: YouTube earning calculator →',
    },
    hinglish: {
      title: 'YouTube Channel Kaise Banayein aur Paise Kaise Kamayein — Step by Step (2026) | NextGrade',
      desc: 'YouTube channel banane se lekar pehli kamai tak har step: Google account, channel ka naam aur @handle, pehla video upload karte samay kya bharein, YouTube Partner Program ki sharten aur galtiyan jinse channel band ho sakta hai.',
      h1: '▶️ YouTube channel bana kar kamai kaise shuru karein',
      lead: 'Neeche har step ke saath sahi (official) link hai aur bataya hai ki wahan kaun sa khaana kya bharna hai. Phone se bhi ho jaata hai.',
      steps: [
        ['Google account banayein (agar nahi hai)', 'YouTube chalane ke liye Google (Gmail) account chahiye. Channel ke liye alag Gmail banana achha rehta hai.', ['Naam', 'Janm tithi aur ling', 'Naya Gmail pata', 'Mazboot password', 'Phone number (account surakshit rakhne ke liye)']],
        ['YouTube channel banayein', 'youtube.com par login karein → upar daayein apni photo → "Create a channel".', ['Channel ka naam — chhota, yaad rehne wala', '@handle — jaise @apnarasoi (baad mein badal sakte hain)', 'Profile photo — chehra ya logo']],
        ['Channel ko sajaayein (YouTube Studio → Customisation)', 'studio.youtube.com kholein → baayein "Customisation".', ['Banner image (2560×1440 px)', 'Description — channel kis baare mein hai, kab naye video aate hain', 'Links — Instagram/website', 'Contact info — business email']],
        ['Pehla video upload karein', 'Studio mein upar "Create → Upload videos" → video chunein.', ['Title — log kya search karenge, wahi shabd (100 akshar tak)', 'Description — 2–3 line mein video ka saar', 'Thumbnail — saaf chehra/bade akshar (phone verify karne par)', 'Audience — "Kya yeh bachchon ke liye bana hai?" sahi chunna zaroori hai', 'Visibility — Public / Unlisted / Schedule']],
        ['YouTube Partner Program (kamai) mein apply', 'Studio → "Earn". Sharten poori hote hi Apply ka button aata hai; AdSense account jodna hota hai aur channel ki jaanch hoti hai.', ['Sharten (subscribers, watch-time ya Shorts views) — official page par taaza dekhein', 'AdSense account — naam aur pata bilkul bank/ID jaisa', 'Tax jaankari (Studio → AdSense mein)']],
        ['Payment', 'Kamai AdSense mein jama hoti hai. Tay nyuntam rakam hone par bank account mein aati hai; pehle pate par PIN verification hota hai.', ['Bank account ka naam, number, IFSC', 'PIN (daak se aata hai) daal kar pata verify karein']],
      ],
      moneyH: 'Kamai ke aur raaste', money: ['Channel membership, Super Chat, Super Thanks (YPP ke baad)', 'Brand ke saath sponsored video — video mein "Paid promotion" ka nishaan lagayein', 'Apni website/blog — wahan bhi AdSense'],
      dontH: '⚠️ Yeh galtiyan kabhi na karein', dont: ['Doosron ke video, gaane ya film ke hisse bina anumati na lagayein — copyright strike se channel band ho sakta hai', 'Views/subscribers khareedein nahi, "sub4sub" na karein', 'Apne hi ads par click na karein, na karwayein', 'Bhramak thumbnail ya khatarnak stunt wale video na daalein'],
      tool: 'Apni andaazan kamai dekhein: YouTube kamai calculator →',
    },
    bn: {
      title: 'YouTube চ্যানেল কীভাবে খুলবেন আর আয় শুরু করবেন — ধাপে ধাপে (2026) | NextGrade',
      desc: 'YouTube চ্যানেল খোলা থেকে প্রথম আয় পর্যন্ত প্রতিটি ধাপ: Google অ্যাকাউন্ট, চ্যানেলের নাম আর @handle, প্রথম ভিডিও আপলোডে কী লিখবেন, YouTube Partner Program আর যেসব ভুলে চ্যানেল বন্ধ হতে পারে।',
      h1: '▶️ YouTube চ্যানেল খুলে আয় কীভাবে শুরু করবেন',
      lead: 'নিচে প্রতিটি ধাপের সঙ্গে সঠিক (অফিসিয়াল) লিংক আর কোন ঘরে কী লিখতে হবে তা দেওয়া আছে। ফোন থেকেও করা যায়।',
      steps: [
        ['Google অ্যাকাউন্ট খুলুন (না থাকলে)', 'YouTube-এর জন্য Google (Gmail) অ্যাকাউন্ট লাগে। চ্যানেলের জন্য আলাদা Gmail ভালো।', ['নাম', 'জন্মতারিখ আর লিঙ্গ', 'নতুন Gmail ঠিকানা', 'শক্ত পাসওয়ার্ড', 'ফোন নম্বর (অ্যাকাউন্ট সুরক্ষার জন্য)']],
        ['YouTube চ্যানেল খুলুন', 'youtube.com-এ লগইন → ওপরে ডানদিকে নিজের ছবি → "Create a channel"।', ['চ্যানেলের নাম — ছোট, মনে রাখার মতো', '@handle — যেমন @apnarasoi (পরে বদলানো যায়)', 'প্রোফাইল ছবি — মুখ বা লোগো']],
        ['চ্যানেল সাজান (YouTube Studio → Customisation)', 'studio.youtube.com খুলুন → বাঁদিকে "Customisation"।', ['ব্যানার ছবি (2560×1440 px)', 'Description — চ্যানেল কী নিয়ে, কবে নতুন ভিডিও আসে', 'Links — Instagram/ওয়েবসাইট', 'Contact info — বিজনেস ইমেল']],
        ['প্রথম ভিডিও আপলোড করুন', 'Studio-তে ওপরে "Create → Upload videos" → ভিডিও বাছুন।', ['Title — লোকে যা খুঁজবে সেই শব্দ (১০০ অক্ষর পর্যন্ত)', 'Description — ২–৩ লাইনে ভিডিওর সারকথা', 'Thumbnail — পরিষ্কার মুখ/বড় অক্ষর (ফোন ভেরিফাই করলে)', 'Audience — "এটা কি ছোটদের জন্য তৈরি?" ঠিকঠাক বাছা জরুরি', 'Visibility — Public / Unlisted / Schedule']],
        ['YouTube Partner Program (আয়)-এ আবেদন', 'Studio → "Earn"। শর্ত পূরণ হলে Apply বোতাম আসে; AdSense অ্যাকাউন্ট যুক্ত করতে হয় আর চ্যানেল যাচাই হয়।', ['শর্ত (সাবস্ক্রাইবার, ওয়াচ টাইম বা Shorts ভিউ) — অফিসিয়াল পেজে সর্বশেষটা দেখুন', 'AdSense অ্যাকাউন্ট — নাম-ঠিকানা ব্যাংক/পরিচয়পত্রের মতোই', 'ট্যাক্স তথ্য (Studio → AdSense)']],
        ['পেমেন্ট', 'আয় AdSense-এ জমে; ন্যূনতম অঙ্ক হলে ব্যাংকে আসে। আগে ডাকে আসা PIN দিয়ে ঠিকানা যাচাই হয়।', ['ব্যাংক অ্যাকাউন্টের নাম, নম্বর, IFSC', 'ডাকে আসা PIN দিয়ে ঠিকানা যাচাই']],
      ],
      moneyH: 'আয়ের আরও উপায়', money: ['চ্যানেল মেম্বারশিপ, Super Chat, Super Thanks (YPP-এর পরে)', 'ব্র্যান্ডের স্পনসর করা ভিডিও — ভিডিওতে "Paid promotion" চিহ্ন দিন', 'নিজের ওয়েবসাইট/ব্লগ — সেখানেও AdSense'],
      dontH: '⚠️ এই ভুলগুলো কখনও করবেন না', dont: ['অন্যের ভিডিও, গান বা সিনেমার অংশ অনুমতি ছাড়া দেবেন না — কপিরাইট স্ট্রাইকে চ্যানেল বন্ধ হতে পারে', 'ভিউ/সাবস্ক্রাইবার কিনবেন না, "sub4sub" করবেন না', 'নিজের বিজ্ঞাপনে নিজে ক্লিক করবেন না, অন্যকে দিয়েও না', 'বিভ্রান্তিকর থাম্বনেল বা বিপজ্জনক স্টান্ট নয়'],
      tool: 'নিজের আন্দাজি আয় দেখুন: YouTube আয় ক্যালকুলেটর →',
    },
  },
  {
    slug: 'instagram', emoji: '📸',
    links: [L_('https://www.instagram.com/accounts/emailsignup/'), L_('https://help.instagram.com/'), L_('https://creators.instagram.com/'), L_('https://creators.instagram.com/'), L_('https://help.instagram.com/')],
    hi: {
      title: 'Instagram से पैसे कैसे कमाएँ — क्रिएटर अकाउंट, Reels और कमाई के तरीक़े (स्टेप बाय स्टेप) | NextGrade',
      desc: 'Instagram पर क्रिएटर बनने के स्टेप हिंदी में: अकाउंट बनाना, प्रोफ़ेशनल (Creator) अकाउंट में बदलना, बायो में क्या लिखें, Reels कैसे डालें, और ब्रांड डील व दूसरे कमाई के तरीक़े।',
      h1: '📸 Instagram पर क्रिएटर बनकर कमाई कैसे करें',
      lead: 'Instagram पर कमाई ज़्यादातर ब्रांड डील और Instagram के अपने फ़ीचर (जहाँ उपलब्ध हों) से होती है। हर स्टेप के साथ आधिकारिक लिंक है।',
      steps: [
        ['Instagram अकाउंट बनाएँ', 'ऐप या वेबसाइट से साइन-अप करें।', ['मोबाइल नंबर या ईमेल', 'पूरा नाम', 'Username — जैसे apna.rasoi (छोटा, आसान)', 'पासवर्ड', 'जन्म तिथि']],
        ['प्रोफ़ेशनल (Creator) अकाउंट में बदलें', 'Profile → ☰ Settings → "Account type and tools" → "Switch to professional account" → Creator।', ['Category — जैसे "Digital creator", "Education"', 'Contact options — ईमेल दिखाना है या नहीं']],
        ['प्रोफ़ाइल पूरी करें', 'Profile → "Edit profile"।', ['प्रोफ़ाइल फ़ोटो', 'Bio — आप क्या दिखाते हैं + कब नई पोस्ट (150 अक्षर)', 'Links — YouTube/वेबसाइट']],
        ['Reels डालें', '+ बटन → Reel → वीडियो चुनें/रिकॉर्ड करें।', ['Caption — पहली लाइन में बात, फिर 3–5 सही hashtag', 'Cover — साफ़ फ़ोटो/टेक्स्ट', 'Audio — Instagram की लाइब्रेरी से (कॉपीराइट से बचने के लिए)', 'Location / topics']],
        ['कमाई: Professional dashboard देखें', 'Profile → "Professional dashboard" → "Monetisation status"/कमाई के टूल — कौन-से फ़ीचर आपके देश और अकाउंट पर मिलते हैं, वहीं दिखता है।', ['ब्रांड के साथ पेड पार्टनरशिप — "Paid partnership" लेबल लगाएँ', 'पेमेंट की जानकारी — बैंक/पैन, जहाँ माँगा जाए']],
      ],
      moneyH: 'कमाई के आम रास्ते', money: ['ब्रांड डील (सबसे आम) — एक तय रेट-कार्ड बनाएँ', 'अपने प्रोडक्ट/सर्विस बेचना', 'YouTube/ब्लॉग पर ट्रैफ़िक भेजना, वहाँ विज्ञापन से कमाई'],
      dontH: '⚠️ ये ग़लतियाँ न करें', dont: ['फ़ॉलोअर/लाइक न ख़रीदें — पहुँच (reach) घटती है और ब्रांड पहचान लेते हैं', 'दूसरों के Reels/गाने उठाकर न डालें', 'पेड प्रमोशन छुपाएँ नहीं — लेबल लगाना ज़रूरी है'],
      tool: '',
    },
    en: {
      title: 'How to Earn from Instagram — Creator Account, Reels and Ways to Make Money (Step by Step) | NextGrade',
      desc: 'Steps to become an Instagram creator: create the account, switch to a professional (Creator) account, what to write in the bio, how to post Reels, and brand deals and other ways to earn.',
      h1: '📸 How to earn on Instagram as a creator',
      lead: 'Most Instagram income comes from brand deals and Instagram’s own features (where available). Each step has the official link.',
      steps: [
        ['Create an Instagram account', 'Sign up in the app or on the website.', ['Mobile number or email', 'Full name', 'Username — e.g. apna.rasoi (short, easy)', 'Password', 'Date of birth']],
        ['Switch to a professional (Creator) account', 'Profile → ☰ Settings → "Account type and tools" → "Switch to professional account" → Creator.', ['Category — e.g. "Digital creator", "Education"', 'Contact options — show email or not']],
        ['Complete your profile', 'Profile → "Edit profile".', ['Profile photo', 'Bio — what you post + when (150 characters)', 'Links — YouTube/website']],
        ['Post Reels', '+ button → Reel → pick or record a video.', ['Caption — the point in line one, then 3–5 relevant hashtags', 'Cover — a clear photo/text', 'Audio — from Instagram’s library (to avoid copyright issues)', 'Location / topics']],
        ['Earning: check the Professional dashboard', 'Profile → "Professional dashboard" → monetisation status/earning tools — it shows which features your country and account can use.', ['Paid partnerships with brands — use the "Paid partnership" label', 'Payment details — bank/PAN where asked']],
      ],
      moneyH: 'Common ways to earn', money: ['Brand deals (most common) — make a simple rate card', 'Selling your own products/services', 'Sending followers to YouTube/a blog that earns from ads'],
      dontH: '⚠️ Avoid these mistakes', dont: ['Do not buy followers/likes — reach drops and brands notice', 'Do not repost other people’s Reels/songs', 'Never hide paid promotions — the label is required'],
      tool: '',
    },
    hinglish: {
      title: 'Instagram se Paise Kaise Kamayein — Creator Account, Reels aur Kamai ke Tareeke (Step by Step) | NextGrade',
      desc: 'Instagram par creator banne ke steps: account banana, professional (Creator) account mein badalna, bio mein kya likhein, Reels kaise daalein, aur brand deal va doosre kamai ke tareeke.',
      h1: '📸 Instagram par creator ban kar kamai kaise karein',
      lead: 'Instagram par kamai zyaadatar brand deal aur Instagram ke apne features (jahan available hon) se hoti hai. Har step ke saath official link hai.',
      steps: [
        ['Instagram account banayein', 'App ya website se sign-up karein.', ['Mobile number ya email', 'Poora naam', 'Username — jaise apna.rasoi (chhota, aasaan)', 'Password', 'Janm tithi']],
        ['Professional (Creator) account mein badlein', 'Profile → ☰ Settings → "Account type and tools" → "Switch to professional account" → Creator.', ['Category — jaise "Digital creator", "Education"', 'Contact options — email dikhana hai ya nahi']],
        ['Profile poori karein', 'Profile → "Edit profile".', ['Profile photo', 'Bio — aap kya dikhate hain + kab nayi post (150 akshar)', 'Links — YouTube/website']],
        ['Reels daalein', '+ button → Reel → video chunein/record karein.', ['Caption — pehli line mein baat, phir 3–5 sahi hashtag', 'Cover — saaf photo/text', 'Audio — Instagram ki library se (copyright se bachne ke liye)', 'Location / topics']],
        ['Kamai: Professional dashboard dekhein', 'Profile → "Professional dashboard" → monetisation status/kamai ke tools — kaun se feature aapke desh aur account par milte hain, wahin dikhta hai.', ['Brand ke saath paid partnership — "Paid partnership" label lagayein', 'Payment ki jaankari — bank/PAN, jahan maanga jaaye']],
      ],
      moneyH: 'Kamai ke aam raaste', money: ['Brand deal (sabse aam) — ek rate-card banayein', 'Apne product/service bechna', 'YouTube/blog par traffic bhejna, wahan ads se kamai'],
      dontH: '⚠️ Yeh galtiyan na karein', dont: ['Followers/likes na khareedein — reach ghatti hai aur brand pehchaan lete hain', 'Doosron ke Reels/gaane utha kar na daalein', 'Paid promotion chhupayein nahi — label lagana zaroori hai'],
      tool: '',
    },
    bn: {
      title: 'Instagram থেকে আয় কীভাবে — ক্রিয়েটর অ্যাকাউন্ট, Reels আর আয়ের উপায় (ধাপে ধাপে) | NextGrade',
      desc: 'Instagram-এ ক্রিয়েটর হওয়ার ধাপ: অ্যাকাউন্ট খোলা, প্রফেশনাল (Creator) অ্যাকাউন্টে বদলানো, বায়োতে কী লিখবেন, Reels কীভাবে দেবেন, আর ব্র্যান্ড ডিল ও অন্য আয়ের পথ।',
      h1: '📸 Instagram-এ ক্রিয়েটর হয়ে কীভাবে আয় করবেন',
      lead: 'Instagram-এ আয় মূলত ব্র্যান্ড ডিল আর Instagram-এর নিজস্ব ফিচার (যেখানে পাওয়া যায়) থেকে। প্রতিটি ধাপের সঙ্গে অফিসিয়াল লিংক আছে।',
      steps: [
        ['Instagram অ্যাকাউন্ট খুলুন', 'অ্যাপ বা ওয়েবসাইট থেকে সাইন-আপ করুন।', ['মোবাইল নম্বর বা ইমেল', 'পুরো নাম', 'Username — যেমন apna.rasoi (ছোট, সহজ)', 'পাসওয়ার্ড', 'জন্মতারিখ']],
        ['প্রফেশনাল (Creator) অ্যাকাউন্টে বদলান', 'Profile → ☰ Settings → "Account type and tools" → "Switch to professional account" → Creator।', ['Category — যেমন "Digital creator", "Education"', 'Contact options — ইমেল দেখাবেন কি না']],
        ['প্রোফাইল সম্পূর্ণ করুন', 'Profile → "Edit profile"।', ['প্রোফাইল ছবি', 'Bio — কী দেখান + কবে নতুন পোস্ট (১৫০ অক্ষর)', 'Links — YouTube/ওয়েবসাইট']],
        ['Reels দিন', '+ বোতাম → Reel → ভিডিও বাছুন/রেকর্ড করুন।', ['Caption — প্রথম লাইনে মূল কথা, তারপর ৩–৫টা ঠিক hashtag', 'Cover — পরিষ্কার ছবি/লেখা', 'Audio — Instagram-এর লাইব্রেরি থেকে (কপিরাইট এড়াতে)', 'Location / topics']],
        ['আয়: Professional dashboard দেখুন', 'Profile → "Professional dashboard" → monetisation status/আয়ের টুল — আপনার দেশ আর অ্যাকাউন্টে কোন ফিচার পাওয়া যায়, সেখানেই দেখায়।', ['ব্র্যান্ডের সঙ্গে পেইড পার্টনারশিপ — "Paid partnership" লেবেল দিন', 'পেমেন্টের তথ্য — ব্যাংক/PAN, যেখানে চাওয়া হয়']],
      ],
      moneyH: 'আয়ের সাধারণ পথ', money: ['ব্র্যান্ড ডিল (সবচেয়ে চেনা) — একটা রেট-কার্ড বানান', 'নিজের প্রোডাক্ট/সার্ভিস বিক্রি', 'YouTube/ব্লগে ফলোয়ার পাঠানো, সেখানে বিজ্ঞাপনে আয়'],
      dontH: '⚠️ এই ভুলগুলো করবেন না', dont: ['ফলোয়ার/লাইক কিনবেন না — রিচ কমে আর ব্র্যান্ড টের পায়', 'অন্যের Reels/গান তুলে দেবেন না', 'পেইড প্রোমোশন লুকোবেন না — লেবেল দেওয়া বাধ্যতামূলক'],
      tool: '',
    },
  },
  {
    slug: 'facebook', emoji: '📘',
    links: [L_('https://www.facebook.com/pages/create'), L_('https://www.facebook.com/'), L_('https://www.facebook.com/'), L_('https://www.facebook.com/professional_dashboard'), L_('https://www.facebook.com/creators')],
    hi: {
      title: 'Facebook से पैसे कैसे कमाएँ — पेज बनाना, वीडियो/Reels और मोनेटाइज़ेशन (स्टेप बाय स्टेप) | NextGrade',
      desc: 'Facebook पर क्रिएटर बनने के स्टेप हिंदी में: पेज या प्रोफ़ेशनल मोड, पेज में क्या भरें, वीडियो और Reels, Professional dashboard में कमाई के टूल और ग़लतियाँ जिनसे मोनेटाइज़ेशन बंद हो जाता है।',
      h1: '📘 Facebook पर वीडियो से कमाई कैसे शुरू करें',
      lead: 'Facebook पर कमाई के टूल (विज्ञापन, स्टार्स, सब्सक्रिप्शन) पेज या प्रोफ़ेशनल मोड वाली प्रोफ़ाइल को, शर्तें पूरी होने पर मिलते हैं। हर स्टेप के साथ आधिकारिक लिंक है।',
      steps: [
        ['Facebook पेज बनाएँ (या प्रोफ़ाइल में प्रोफ़ेशनल मोड चालू करें)', 'facebook.com/pages/create खोलें।', ['Page name — चैनल जैसा नाम', 'Category — जैसे "Video creator", "Education"', 'Bio — एक लाइन में आप क्या बनाते हैं']],
        ['पेज पूरा करें', 'प्रोफ़ाइल और कवर फ़ोटो, संपर्क जानकारी और यूज़रनेम जोड़ें।', ['Profile picture और Cover photo', 'Username — facebook.com/आपकानाम', 'Contact — ईमेल/वेबसाइट']],
        ['वीडियो और Reels डालें', 'पेज से "Reel" या "Video" चुनें।', ['Title/Caption — पहली लाइन में साफ़ बात', 'Thumbnail', 'अपना बनाया वीडियो — दूसरों का दोबारा अपलोड नहीं']],
        ['कमाई: Professional dashboard', 'Professional dashboard → "Monetisation" — कौन-सा टूल मिलेगा और उसकी शर्तें क्या हैं, वहीं दिखता है।', ['शर्तें (फ़ॉलोअर, देखने के मिनट) — वहीं ताज़ा देखें', 'पेमेंट खाता — बैंक की जानकारी, टैक्स जानकारी']],
        ['नियम पढ़ें', 'Meta के क्रिएटर और मोनेटाइज़ेशन नियम — कौन-सा कंटेंट कमाई के लायक नहीं।', ['ओरिजिनल कंटेंट', 'भ्रामक शीर्षक या "लाइक/शेयर करो" वाली ज़बरदस्ती नहीं']],
      ],
      moneyH: 'कमाई के रास्ते', money: ['वीडियो पर विज्ञापन (जहाँ उपलब्ध)', 'Stars — दर्शक सीधे सपोर्ट करते हैं', 'ब्रांड डील — "Paid partnership" लेबल के साथ'],
      dontH: '⚠️ ये ग़लतियाँ न करें', dont: ['दूसरों के वीडियो दोबारा अपलोड (reupload) न करें', 'लाइक/फ़ॉलोअर न ख़रीदें', 'क्लिकबेट और भ्रामक थंबनेल से बचें'],
      tool: 'अंदाज़न कमाई देखें: कमाई कैलकुलेटर में "Facebook वीडियो" चुनें →',
    },
    en: {
      title: 'How to Earn from Facebook — Create a Page, Post Videos/Reels and Monetise (Step by Step) | NextGrade',
      desc: 'Steps to become a Facebook creator: a Page or professional mode, what to fill on the Page, videos and Reels, earning tools in the Professional dashboard, and mistakes that stop monetisation.',
      h1: '📘 How to start earning from videos on Facebook',
      lead: 'Facebook’s earning tools (ads, Stars, subscriptions) are offered to Pages or profiles in professional mode once they meet the conditions. Each step has the official link.',
      steps: [
        ['Create a Facebook Page (or turn on professional mode on your profile)', 'Open facebook.com/pages/create.', ['Page name — like a channel name', 'Category — e.g. "Video creator", "Education"', 'Bio — one line on what you make']],
        ['Complete the Page', 'Add profile and cover photos, contact details and a username.', ['Profile picture and cover photo', 'Username — facebook.com/yourname', 'Contact — email/website']],
        ['Post videos and Reels', 'From the Page choose "Reel" or "Video".', ['Title/caption — the point in line one', 'Thumbnail', 'Your own video — no re-uploads of others’ content']],
        ['Earning: Professional dashboard', 'Professional dashboard → "Monetisation" shows which tools you can get and their conditions.', ['Conditions (followers, minutes viewed) — check the current ones there', 'Payout account — bank details, tax information']],
        ['Read the rules', 'Meta’s creator and monetisation policies — which content cannot earn.', ['Original content', 'No misleading titles or “like/share” baiting']],
      ],
      moneyH: 'Ways to earn', money: ['Ads on videos (where available)', 'Stars — viewers support you directly', 'Brand deals — with the "Paid partnership" label'],
      dontH: '⚠️ Avoid these mistakes', dont: ['Do not re-upload other people’s videos', 'Do not buy likes/followers', 'Avoid clickbait and misleading thumbnails'],
      tool: 'Estimate earnings: pick "Facebook video" in the earning calculator →',
    },
    hinglish: {
      title: 'Facebook se Paise Kaise Kamayein — Page Banana, Video/Reels aur Monetization (Step by Step) | NextGrade',
      desc: 'Facebook par creator banne ke steps: page ya professional mode, page mein kya bharein, video aur Reels, Professional dashboard mein kamai ke tools aur galtiyan jinse monetization band ho jaata hai.',
      h1: '📘 Facebook par video se kamai kaise shuru karein',
      lead: 'Facebook par kamai ke tools (ads, Stars, subscription) page ya professional mode wali profile ko, sharten poori hone par milte hain. Har step ke saath official link hai.',
      steps: [
        ['Facebook page banayein (ya profile mein professional mode on karein)', 'facebook.com/pages/create kholein.', ['Page name — channel jaisa naam', 'Category — jaise "Video creator", "Education"', 'Bio — ek line mein aap kya banate hain']],
        ['Page poora karein', 'Profile aur cover photo, contact jaankari aur username jodein.', ['Profile picture aur Cover photo', 'Username — facebook.com/aapkanaam', 'Contact — email/website']],
        ['Video aur Reels daalein', 'Page se "Reel" ya "Video" chunein.', ['Title/Caption — pehli line mein saaf baat', 'Thumbnail', 'Apna banaya video — doosron ka dobara upload nahi']],
        ['Kamai: Professional dashboard', 'Professional dashboard → "Monetisation" — kaun sa tool milega aur uski sharten kya hain, wahin dikhta hai.', ['Sharten (followers, dekhne ke minute) — wahin taaza dekhein', 'Payment account — bank ki jaankari, tax jaankari']],
        ['Niyam padhein', 'Meta ke creator aur monetization niyam — kaun sa content kamai ke laayak nahi.', ['Original content', 'Bhramak title ya "like/share karo" wali zabardasti nahi']],
      ],
      moneyH: 'Kamai ke raaste', money: ['Video par ads (jahan available)', 'Stars — viewers seedha support karte hain', 'Brand deal — "Paid partnership" label ke saath'],
      dontH: '⚠️ Yeh galtiyan na karein', dont: ['Doosron ke video dobara upload (reupload) na karein', 'Likes/followers na khareedein', 'Clickbait aur bhramak thumbnail se bachein'],
      tool: 'Andaazan kamai dekhein: kamai calculator mein "Facebook video" chunein →',
    },
    bn: {
      title: 'Facebook থেকে আয় কীভাবে — পেজ খোলা, ভিডিও/Reels আর মনিটাইজেশন (ধাপে ধাপে) | NextGrade',
      desc: 'Facebook-এ ক্রিয়েটর হওয়ার ধাপ: পেজ বা প্রফেশনাল মোড, পেজে কী লিখবেন, ভিডিও আর Reels, Professional dashboard-এ আয়ের টুল আর যেসব ভুলে মনিটাইজেশন বন্ধ হয়।',
      h1: '📘 Facebook-এ ভিডিও থেকে আয় কীভাবে শুরু করবেন',
      lead: 'Facebook-এর আয়ের টুল (বিজ্ঞাপন, Stars, সাবস্ক্রিপশন) শর্ত পূরণ হলে পেজ বা প্রফেশনাল মোডের প্রোফাইল পায়। প্রতিটি ধাপের সঙ্গে অফিসিয়াল লিংক আছে।',
      steps: [
        ['Facebook পেজ খুলুন (বা প্রোফাইলে প্রফেশনাল মোড চালু করুন)', 'facebook.com/pages/create খুলুন।', ['Page name — চ্যানেলের মতো নাম', 'Category — যেমন "Video creator", "Education"', 'Bio — এক লাইনে কী বানান']],
        ['পেজ সম্পূর্ণ করুন', 'প্রোফাইল আর কভার ছবি, যোগাযোগের তথ্য আর ইউজারনেম দিন।', ['Profile picture আর Cover photo', 'Username — facebook.com/আপনারনাম', 'Contact — ইমেল/ওয়েবসাইট']],
        ['ভিডিও আর Reels দিন', 'পেজ থেকে "Reel" বা "Video" বাছুন।', ['Title/Caption — প্রথম লাইনে পরিষ্কার কথা', 'Thumbnail', 'নিজের বানানো ভিডিও — অন্যেরটা আবার আপলোড নয়']],
        ['আয়: Professional dashboard', 'Professional dashboard → "Monetisation" — কোন টুল পাবেন আর শর্ত কী, সেখানেই দেখায়।', ['শর্ত (ফলোয়ার, দেখার মিনিট) — সেখানে সর্বশেষটা দেখুন', 'পেমেন্ট অ্যাকাউন্ট — ব্যাংকের তথ্য, ট্যাক্সের তথ্য']],
        ['নিয়ম পড়ুন', 'Meta-র ক্রিয়েটর আর মনিটাইজেশন নীতি — কোন কনটেন্ট আয়ের যোগ্য নয়।', ['নিজস্ব কনটেন্ট', 'বিভ্রান্তিকর শিরোনাম বা "লাইক/শেয়ার করো" চাপ নয়']],
      ],
      moneyH: 'আয়ের পথ', money: ['ভিডিওতে বিজ্ঞাপন (যেখানে পাওয়া যায়)', 'Stars — দর্শক সরাসরি সমর্থন করেন', 'ব্র্যান্ড ডিল — "Paid partnership" লেবেলসহ'],
      dontH: '⚠️ এই ভুলগুলো করবেন না', dont: ['অন্যের ভিডিও আবার আপলোড করবেন না', 'লাইক/ফলোয়ার কিনবেন না', 'ক্লিকবেট আর বিভ্রান্তিকর থাম্বনেল এড়িয়ে চলুন'],
      tool: 'আন্দাজি আয়: আয় ক্যালকুলেটরে "Facebook ভিডিও" বাছুন →',
    },
  },
  {
    slug: 'blog', emoji: '✍️',
    links: [L_('https://www.blogger.com/'), L_('https://www.blogger.com/'), L_('https://search.google.com/search-console'), L_('https://adsense.google.com/'), L_('https://support.google.com/adsense/answer/48182')],
    hi: {
      title: 'ब्लॉग बनाकर पैसे कैसे कमाएँ — फ़्री ब्लॉग, Google में लाना और AdSense (स्टेप बाय स्टेप) | NextGrade',
      desc: 'फ़्री ब्लॉग बनाने से AdSense की कमाई तक हर स्टेप हिंदी में: Blogger पर ब्लॉग, ज़रूरी पेज (About, Contact, Privacy), Google Search Console, और AdSense के लिए आवेदन।',
      h1: '✍️ ब्लॉग बनाकर कमाई कैसे शुरू करें',
      lead: 'जो लिखना आता है — रेसिपी, पढ़ाई, खेती, टेक — उसी पर ब्लॉग बनाएँ। हर स्टेप के साथ आधिकारिक लिंक है।',
      steps: [
        ['Blogger पर फ़्री ब्लॉग बनाएँ', 'Google खाते से blogger.com पर लॉग-इन → "Create your blog"।', ['Title — ब्लॉग का नाम', 'Address — yourname.blogspot.com (बाद में अपना डोमेन जोड़ सकते हैं)', 'Display name']],
        ['ज़रूरी पेज और पहली पोस्ट', 'Pages में About, Contact, Privacy Policy बनाएँ; फिर कम से कम 15–20 अच्छी, अपनी लिखी पोस्ट।', ['पोस्ट का Title — लोग क्या खोजते हैं', 'Labels — विषय', 'Search description — 1–2 लाइन', 'फ़ोटो — अपनी या फ़्री-लाइसेंस वाली']],
        ['Google Search Console में जोड़ें', 'search.google.com/search-console → "Add property" → ब्लॉग का पता।', ['URL prefix — पूरा पता', 'Sitemap — sitemap.xml जमा करें']],
        ['AdSense के लिए आवेदन', 'adsense.google.com → Sign up → साइट जोड़ें और दिया हुआ कोड लगाएँ। जाँच में कुछ दिन से कुछ हफ़्ते लगते हैं।', ['Site URL', 'देश और पेमेंट का पता', 'AdSense code — Blogger में Earnings से जुड़ जाता है']],
        ['नियम पढ़ें', 'AdSense की नीतियाँ — किस तरह का कंटेंट मना है।', ['कॉपी किया कंटेंट नहीं', 'अपने विज्ञापन पर क्लिक नहीं']],
      ],
      moneyH: 'कमाई कैसे बढ़ती है', money: ['रोज़ या हफ़्ते में तय दिन नई पोस्ट', 'लोगों के सवालों का सीधा, सही जवाब', 'तेज़ खुलने वाला, फ़ोन पर साफ़ दिखने वाला ब्लॉग'],
      dontH: '⚠️ ये ग़लतियाँ न करें', dont: ['दूसरी साइट से कॉपी-पेस्ट', 'बिना अनुमति फ़ोटो', 'अपने विज्ञापन पर क्लिक, या क्लिक के लिए कहना'],
      tool: 'ब्लॉग की अंदाज़न कमाई: कमाई कैलकुलेटर में "ब्लॉग / वेबसाइट" चुनें →',
    },
    en: {
      title: 'How to Start a Blog and Earn Money — Free Blog, Getting on Google and AdSense (Step by Step) | NextGrade',
      desc: 'Every step from a free blog to AdSense income: a Blogger blog, the must-have pages (About, Contact, Privacy), Google Search Console and applying for AdSense.',
      h1: '✍️ How to start a blog and begin earning',
      lead: 'Blog about what you know — recipes, studies, farming, tech. Each step has the official link.',
      steps: [
        ['Create a free blog on Blogger', 'Sign in to blogger.com with Google → "Create your blog".', ['Title — the blog’s name', 'Address — yourname.blogspot.com (you can add your own domain later)', 'Display name']],
        ['Must-have pages and first posts', 'Under Pages create About, Contact and Privacy Policy; then at least 15–20 good posts you wrote yourself.', ['Post title — what people search for', 'Labels — topics', 'Search description — 1–2 lines', 'Photos — your own or free-licence']],
        ['Add the blog to Google Search Console', 'search.google.com/search-console → "Add property" → your blog address.', ['URL prefix — the full address', 'Sitemap — submit sitemap.xml']],
        ['Apply for AdSense', 'adsense.google.com → Sign up → add your site and place the code. Review takes from a few days to a few weeks.', ['Site URL', 'Country and payment address', 'AdSense code — Blogger links it under Earnings']],
        ['Read the rules', 'AdSense policies — which content is not allowed.', ['No copied content', 'Never click your own ads']],
      ],
      moneyH: 'What grows the income', money: ['New posts on fixed days', 'Direct, correct answers to people’s questions', 'A fast blog that looks clean on phones'],
      dontH: '⚠️ Avoid these mistakes', dont: ['Copy-pasting from other sites', 'Photos without permission', 'Clicking your own ads or asking for clicks'],
      tool: 'Blog earning estimate: pick "Blog / website" in the earning calculator →',
    },
    hinglish: {
      title: 'Blog Bana kar Paise Kaise Kamayein — Free Blog, Google mein Laana aur AdSense (Step by Step) | NextGrade',
      desc: 'Free blog banane se AdSense ki kamai tak har step: Blogger par blog, zaroori page (About, Contact, Privacy), Google Search Console, aur AdSense ke liye apply.',
      h1: '✍️ Blog bana kar kamai kaise shuru karein',
      lead: 'Jo likhna aata hai — recipe, padhai, kheti, tech — usi par blog banayein. Har step ke saath official link hai.',
      steps: [
        ['Blogger par free blog banayein', 'Google account se blogger.com par login → "Create your blog".', ['Title — blog ka naam', 'Address — yourname.blogspot.com (baad mein apna domain jod sakte hain)', 'Display name']],
        ['Zaroori page aur pehli post', 'Pages mein About, Contact, Privacy Policy banayein; phir kam se kam 15–20 achhi, apni likhi post.', ['Post ka Title — log kya search karte hain', 'Labels — vishay', 'Search description — 1–2 line', 'Photo — apni ya free-licence wali']],
        ['Google Search Console mein jodein', 'search.google.com/search-console → "Add property" → blog ka pata.', ['URL prefix — poora pata', 'Sitemap — sitemap.xml jama karein']],
        ['AdSense ke liye apply', 'adsense.google.com → Sign up → site jodein aur diya hua code lagayein. Jaanch mein kuch din se kuch hafte lagte hain.', ['Site URL', 'Desh aur payment ka pata', 'AdSense code — Blogger mein Earnings se jud jaata hai']],
        ['Niyam padhein', 'AdSense ki policies — kis tarah ka content mana hai.', ['Copy kiya content nahi', 'Apne ad par click nahi']],
      ],
      moneyH: 'Kamai kaise badhti hai', money: ['Roz ya hafte mein tay din nayi post', 'Logon ke sawaalon ka seedha, sahi jawaab', 'Tez khulne wala, phone par saaf dikhne wala blog'],
      dontH: '⚠️ Yeh galtiyan na karein', dont: ['Doosri site se copy-paste', 'Bina anumati photo', 'Apne ad par click, ya click ke liye kehna'],
      tool: 'Blog ki andaazan kamai: kamai calculator mein "Blog / website" chunein →',
    },
    bn: {
      title: 'ব্লগ খুলে আয় কীভাবে — ফ্রি ব্লগ, Google-এ আনা আর AdSense (ধাপে ধাপে) | NextGrade',
      desc: 'ফ্রি ব্লগ থেকে AdSense আয় পর্যন্ত প্রতিটি ধাপ: Blogger-এ ব্লগ, জরুরি পেজ (About, Contact, Privacy), Google Search Console আর AdSense-এ আবেদন।',
      h1: '✍️ ব্লগ খুলে আয় কীভাবে শুরু করবেন',
      lead: 'যা জানেন তা নিয়েই ব্লগ লিখুন — রান্না, পড়াশোনা, চাষ, টেক। প্রতিটি ধাপের সঙ্গে অফিসিয়াল লিংক আছে।',
      steps: [
        ['Blogger-এ ফ্রি ব্লগ খুলুন', 'Google অ্যাকাউন্ট দিয়ে blogger.com-এ লগইন → "Create your blog"।', ['Title — ব্লগের নাম', 'Address — yourname.blogspot.com (পরে নিজের ডোমেন জোড়া যায়)', 'Display name']],
        ['জরুরি পেজ আর প্রথম পোস্ট', 'Pages-এ About, Contact, Privacy Policy বানান; তারপর অন্তত ১৫–২০টা ভালো, নিজের লেখা পোস্ট।', ['পোস্টের Title — লোকে যা খোঁজে', 'Labels — বিষয়', 'Search description — ১–২ লাইন', 'ছবি — নিজের বা ফ্রি-লাইসেন্সের']],
        ['Google Search Console-এ যোগ করুন', 'search.google.com/search-console → "Add property" → ব্লগের ঠিকানা।', ['URL prefix — পুরো ঠিকানা', 'Sitemap — sitemap.xml জমা দিন']],
        ['AdSense-এ আবেদন', 'adsense.google.com → Sign up → সাইট যোগ করে দেওয়া কোড বসান। যাচাইয়ে কয়েক দিন থেকে কয়েক সপ্তাহ লাগে।', ['Site URL', 'দেশ আর পেমেন্টের ঠিকানা', 'AdSense কোড — Blogger-এ Earnings থেকে যুক্ত হয়']],
        ['নিয়ম পড়ুন', 'AdSense নীতি — কোন কনটেন্ট নিষেধ।', ['কপি করা কনটেন্ট নয়', 'নিজের বিজ্ঞাপনে ক্লিক নয়']],
      ],
      moneyH: 'আয় কীভাবে বাড়ে', money: ['নির্দিষ্ট দিনে নিয়মিত নতুন পোস্ট', 'মানুষের প্রশ্নের সোজা, সঠিক উত্তর', 'দ্রুত খোলে, ফোনে পরিষ্কার দেখায় এমন ব্লগ'],
      dontH: '⚠️ এই ভুলগুলো করবেন না', dont: ['অন্য সাইট থেকে কপি-পেস্ট', 'অনুমতি ছাড়া ছবি', 'নিজের বিজ্ঞাপনে ক্লিক, বা ক্লিক করতে বলা'],
      tool: 'ব্লগের আন্দাজি আয়: আয় ক্যালকুলেটরে "ব্লগ / ওয়েবসাইট" বাছুন →',
    },
  },
];

export const CG = {
  hi: { nav: 'क्रिएटर गाइड', hubTitle: 'वीडियो बनाकर कमाई कैसे शुरू करें — YouTube, Instagram, ब्लॉग: पूरी क्रिएटर गाइड | NextGrade', hubDesc: 'नए क्रिएटर्स के लिए आसान गाइड: YouTube चैनल, Instagram क्रिएटर अकाउंट और ब्लॉग बनाने से लेकर कमाई शुरू होने तक हर स्टेप — आधिकारिक लिंक और क्या भरना है, सब हिंदी में।', hubH1: '🎬 क्रिएटर गाइड — वीडियो/ब्लॉग से कमाई कैसे शुरू करें', hubLead: 'बहुत लोग वीडियो बनाकर कमाना चाहते हैं, पर पता नहीं होता कि कहाँ से शुरू करें, कौन-सा फ़ॉर्म कैसे भरें और कमाई कब शुरू होती है। यहाँ हर प्लेटफ़ॉर्म के लिए स्टेप बाय स्टेप गाइड है।', stepL: 'स्टेप', fillL: 'यहाँ क्या भरें:', open: 'आधिकारिक पेज खोलें ↗', change: '📌 ध्यान दें: ये स्टेप आज के हिसाब से लिखे हैं। YouTube, Instagram और Google अपने पेज और नियम समय-समय पर बदलते रहते हैं — आप जब ये करेंगे तब बटन या नाम थोड़े अलग दिख सकते हैं। ऐसा हो तो ऊपर दिए आधिकारिक लिंक पर ताज़ा जानकारी देखें। हम भी इस गाइड को अपडेट करते रहेंगे।', others: 'दूसरे प्लेटफ़ॉर्म की गाइड', calc: '💰 YouTube कमाई कैलकुलेटर' },
  en: { nav: 'Creator guide', hubTitle: 'How to Start Earning from Videos and Blogs — YouTube, Instagram, Blog: Complete Creator Guide | NextGrade', hubDesc: 'An easy guide for new creators: every step from a YouTube channel, an Instagram creator account and a blog to the first income — with official links and what to fill in.', hubH1: '🎬 Creator guide — how to start earning from videos and blogs', hubLead: 'Many people want to earn by making videos but do not know where to start, how to fill which form or when income begins. Here is a step-by-step guide for each platform.', stepL: 'Step', fillL: 'What to fill in:', open: 'Open the official page ↗', change: '📌 Note: these steps are written as things are today. YouTube, Instagram and Google change their pages and rules from time to time — when you do this, buttons or names may look a little different. If so, check the official link above for the latest. We will keep updating this guide too.', others: 'Guides for other platforms', calc: '💰 YouTube earning calculator' },
  hinglish: { nav: 'Creator guide', hubTitle: 'Video Bana kar Kamai Kaise Shuru Karein — YouTube, Instagram, Blog: Poori Creator Guide | NextGrade', hubDesc: 'Naye creators ke liye aasaan guide: YouTube channel, Instagram creator account aur blog banane se lekar kamai shuru hone tak har step — official link aur kya bharna hai.', hubH1: '🎬 Creator Guide — video/blog se kamai kaise shuru karein', hubLead: 'Bahut log video bana kar kamaana chahte hain, par pata nahi hota ki kahan se shuru karein, kaun sa form kaise bharein aur kamai kab shuru hoti hai. Yahan har platform ke liye step by step guide hai.', stepL: 'Step', fillL: 'Yahan kya bharein:', open: 'Official page kholein ↗', change: '📌 Dhyaan dein: yeh steps aaj ke hisaab se likhe hain. YouTube, Instagram aur Google apne page aur niyam samay-samay par badalte rehte hain — aap jab yeh karenge tab button ya naam thode alag dikh sakte hain. Aisa ho to upar diye official link par taaza jaankari dekhein. Hum bhi is guide ko update karte rahenge.', others: 'Doosre platform ki guide', calc: '💰 YouTube kamai calculator' },
  bn: { nav: 'ক্রিয়েটর গাইড', hubTitle: 'ভিডিও আর ব্লগ থেকে আয় কীভাবে শুরু — YouTube, Instagram, ব্লগ: পুরো ক্রিয়েটর গাইড | NextGrade', hubDesc: 'নতুন ক্রিয়েটরদের সহজ গাইড: YouTube চ্যানেল, Instagram ক্রিয়েটর অ্যাকাউন্ট আর ব্লগ খোলা থেকে প্রথম আয় পর্যন্ত প্রতিটি ধাপ — অফিসিয়াল লিংক আর কী লিখতে হবে।', hubH1: '🎬 ক্রিয়েটর গাইড — ভিডিও/ব্লগ থেকে আয় কীভাবে শুরু করবেন', hubLead: 'অনেকে ভিডিও বানিয়ে আয় করতে চান, কিন্তু কোথা থেকে শুরু, কোন ফর্ম কীভাবে ভরবেন আর আয় কবে শুরু হয় জানেন না। এখানে প্রতিটি প্ল্যাটফর্মের ধাপে ধাপে গাইড।', stepL: 'ধাপ', fillL: 'এখানে কী লিখবেন:', open: 'অফিসিয়াল পেজ খুলুন ↗', change: '📌 খেয়াল রাখুন: এই ধাপগুলো আজকের হিসেবে লেখা। YouTube, Instagram আর Google মাঝে মাঝে তাদের পেজ আর নিয়ম বদলায় — আপনি যখন করবেন তখন বোতাম বা নাম একটু আলাদা দেখাতে পারে। তেমন হলে ওপরের অফিসিয়াল লিংকে সর্বশেষ তথ্য দেখুন। আমরাও এই গাইড আপডেট করতে থাকব।', others: 'অন্য প্ল্যাটফর্মের গাইড', calc: '💰 YouTube আয় ক্যালকুলেটর' },
};

export function buildCreatorGuide(L, { page, write, P, esc, T, breadcrumbLd }) {
  const code = L.code, X = CG[code], hub = '/creator-guide/';
  const css = '<style>.cg-step{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px 16px;margin:14px 0;box-shadow:var(--shadow)}.cg-step h2{margin:0 0 6px;font-size:20px}.cg-step .n{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--brand);color:#fff;font-size:15px;margin-right:8px}.cg-step ul{margin:6px 0}.cg-change{background:#fff4e6;border-left:4px solid #e8590c;padding:12px 16px;border-radius:12px;color:#5c3b1a}</style>';
  write(L, hub, page(L, {
    path: hub, title: X.hubTitle, description: X.hubDesc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `<div class="wrap article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.hubH1)}</h1>
<p class="lead">${esc(X.hubLead)}</p>
<div class="grid">${GUIDES.map((g) => `<a class="card" href="${P(L, `${hub}${g.slug}/`)}"><span class="emoji" aria-hidden="true">${g.emoji}</span><h3>${esc(g[code].h1.replace(/^\S+\s/, ''))}</h3><p>${esc(g[code].lead)}</p></a>`).join('')}<a class="card" href="${P(L, '/calculator/youtube-earning/')}"><span class="emoji" aria-hidden="true">💰</span><h3>${esc(X.calc.replace(/^\S+\s/, ''))}</h3></a></div>
<p class="cg-change">${esc(X.change)}</p>
</div>`,
  }));
  for (const g of GUIDES) {
    const x = g[code], path = `${hub}${g.slug}/`;
    const howTo = { '@context': 'https://schema.org', '@type': 'HowTo', name: x.h1.replace(/^\S+\s/, ''), description: x.desc, step: x.steps.map(([h, b], i) => ({ '@type': 'HowToStep', position: i + 1, name: h, text: b, url: g.links[i] })) };
    write(L, path, page(L, {
      path, title: x.title, description: x.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [x.h1.replace(/^\S+\s/, ''), path]]), howTo],
      body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(x.h1.replace(/^\S+\s/, ''))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
${x.steps.map(([h, b, fields], i) => `<section class="cg-step"><h2><span class="n">${i + 1}</span>${esc(h)}</h2><p>${esc(b)}</p><p><b>${esc(X.fillL)}</b></p><ul>${fields.map((f) => `<li>${esc(f)}</li>`).join('')}</ul><p><a href="${g.links[i]}" target="_blank" rel="noopener">${esc(X.open)}</a></p></section>${i === 2 ? '<div class="ad" aria-hidden="true"></div>' : ''}`).join('\n')}
<h2>${esc(x.moneyH)}</h2><ul>${x.money.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(x.dontH)}</h2><ul>${x.dont.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
${x.tool ? `<p><a class="btn btn-primary" href="${P(L, '/calculator/youtube-earning/')}">${esc(x.tool)}</a></p>` : ''}
<p class="cg-change">${esc(X.change)}</p>
<h2>${esc(X.others)}</h2>
<p class="chips">${GUIDES.filter((o) => o !== g).map((o) => `<a class="tag" href="${P(L, `${hub}${o.slug}/`)}">${o.emoji} ${esc(o[code].h1.replace(/^\S+\s/, ''))}</a>`).join(' ')} <a class="tag" href="${P(L, '/calculator/youtube-earning/')}">${esc(X.calc)}</a></p>
</div>`,
    }));
  }
}
