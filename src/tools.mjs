/**
 * Free tools at nextgrade.in/tools/<slug>/. Each is a self-contained static app in src/static/tools/<slug>/
 * (copied from the private nextgrade-tools repo): it runs entirely in the visitor's browser, and photos or
 * documents are never uploaded. Scheduled like games: 'tool:<slug>' in src/releases.mjs.
 */
const tools = [
  { slug: 'passport-photo', emoji: '🪪',
    hi: ['पासपोर्ट साइज़ फ़ोटो मेकर', 'सफ़ेद या नीला बैकग्राउंड, चेहरा अपने आप बीच में, 3.5×4.5 cm / 2×2 इंच, 4×6 प्रिंट शीट और KB लिमिट वाली डिजिटल फ़ोटो।'],
    en: ['Passport Size Photo Maker', 'White or blue background, face centred automatically, 3.5×4.5 cm / 2×2 inch, a 4×6 print sheet and a digital photo under any KB limit.'],
    hinglish: ['Passport Size Photo Maker', 'Safed ya neela background, chehra apne aap beech mein, 3.5×4.5 cm / 2×2 inch, 4×6 print sheet aur KB limit wali digital photo.'],
    bn: ['পাসপোর্ট সাইজ ছবি', 'সাদা বা নীল ব্যাকগ্রাউন্ড, মুখ নিজে থেকেই মাঝখানে, 3.5×4.5 cm / 2×2 ইঞ্চি, 4×6 প্রিন্ট শিট আর KB সীমার ডিজিটাল ছবি।'] },
  { slug: 'doc-scanner', emoji: '📄',
    hi: ['डॉक्यूमेंट स्कैनर → PDF', 'फ़ोन से डॉक्यूमेंट स्कैन करो: अपने आप क्रॉप, ब्लैक एंड व्हाइट, कई पेज एक PDF में, और 100/200 KB से कम।'],
    en: ['Document Scanner → PDF', 'Scan documents with your phone: auto crop, black & white, many pages in one PDF, and under 100/200 KB.'],
    hinglish: ['Document Scanner → PDF', 'Phone se document scan karo: apne aap crop, black & white, kai pages ek PDF mein, aur 100/200 KB se kam.'],
    bn: ['ডকুমেন্ট স্ক্যানার → PDF', 'ফোনে ডকুমেন্ট স্ক্যান করো: নিজে থেকেই ক্রপ, সাদা-কালো, অনেক পাতা এক PDF-এ, আর 100/200 KB-র কম।'] },
  { slug: 'bg-remover', emoji: '🖼️',
    hi: ['बैकग्राउंड रिमूवर', 'फ़ोटो का बैकग्राउंड हटाओ और सफ़ेद, नीला, रंग, ब्लर या अपनी फ़ोटो लगाओ। HD डाउनलोड, कोई वॉटरमार्क नहीं।'],
    en: ['Background Remover', 'Remove a photo background and put white, blue, a colour, blur or your own photo behind it. HD download, no watermark.'],
    hinglish: ['Background Remover', 'Photo ka background hatao aur safed, neela, rang, blur ya apni photo lagao. HD download, koi watermark nahi.'],
    bn: ['ব্যাকগ্রাউন্ড রিমুভার', 'ছবির ব্যাকগ্রাউন্ড সরাও আর সাদা, নীল, রং, ব্লার বা নিজের ছবি বসাও। HD ডাউনলোড, কোনো ওয়াটারমার্ক নেই।'] },
  { slug: 'hair-tryon', emoji: '💇',
    hi: ['बालों का रंग और दाढ़ी ट्राई करो', 'अपनी फ़ोटो पर बालों के 16 रंग, दाढ़ी और मूँछ के स्टाइल लगाओ, पहले/बाद में देखो।'],
    en: ['Hair Colour & Beard Try-On', 'Try 16 hair colours plus beard and moustache styles on your own photo, with a before/after slider.'],
    hinglish: ['Baal ka Rang & Daadhi Try-On', 'Apni photo par baalon ke 16 rang, daadhi aur moonchh ke style lagao, pehle/baad mein dekho.'],
    bn: ['চুলের রং আর দাড়ি ট্রাই', 'নিজের ছবিতে চুলের ১৬টা রং, দাড়ি আর গোঁফের স্টাইল লাগাও, আগে/পরে দেখো।'] },
  { slug: 'form-helper', emoji: '📝',
    hi: ['फ़ॉर्म के लिए फ़ोटो और सिग्नेचर रीसाइज़र', 'SSC, UPSC, IBPS / SBI, NEET, JEE फ़ॉर्म के लिए फ़ोटो, सिग्नेचर, अँगूठा और डिक्लेरेशन — सही px और KB में। काग़ज़ वाला सिग्नेचर साफ़ भी।'],
    en: ['Exam Form Photo & Signature Resizer', 'Photo, signature, thumb and declaration at the exact px and KB that SSC, UPSC, IBPS / SBI, NEET and JEE forms ask for. Cleans up a signature on paper.'],
    hinglish: ['Form Photo & Signature Resizer', 'SSC, UPSC, IBPS / SBI, NEET, JEE form ke liye photo, signature, angootha aur declaration — sahi px aur KB mein. Kaagaz wala signature saaf bhi.'],
    bn: ['ফর্মের ছবি ও সই রিসাইজার', 'SSC, UPSC, IBPS / SBI, NEET, JEE ফর্মের জন্য ছবি, সই, আঙুলের ছাপ আর ডিক্লারেশন — ঠিক px আর KB-তে। কাগজের সই পরিষ্কারও।'] },
];

export { tools };
