/**
 * UP Board (UPMSP) 2027 time table — /board-exam/up-board-2027/ (hi + en). MY-PLANS BUILDER-SPECS item 2.
 * Source: official notice "TimeTable_2027_Vigyapti.pdf" on upmsp.edu.in (Secretary, Madhyamik Shiksha Parishad UP,
 * Prayagraj, dated 12-10-2026), read on 28 Nov 2026: High School + Intermediate together, 5 Feb → 24 Feb 2027,
 * morning shift 8:30–11:45, afternoon 2:00–5:15. Main subjects listed; the many vocational trade papers are summarised.
 * Row: [date, shift M|A, class 10 hi, class 10 en, class 12 hi, class 12 en] ('' = no paper for that class in that shift)
 */
export const UP_CHECKED = '28 Nov 2026';
const PDF = 'https://upmsp.edu.in/Downloads/TimeTable_2027_Vigyapti.pdf';
const R = [
  ['2027-02-05', 'M', 'हिंदी, प्रारंभिक हिंदी', 'Hindi, Elementary Hindi', '', ''],
  ['2027-02-05', 'A', '', '', 'हिंदी, सामान्य हिंदी', 'Hindi, General Hindi'],
  ['2027-02-08', 'M', 'सामाजिक विज्ञान', 'Social Science', 'व्यावसायिक वर्ग — पहला प्रश्नपत्र', 'Vocational group — paper 1'],
  ['2027-02-08', 'A', '', '', 'अंग्रेज़ी', 'English'],
  ['2027-02-09', 'M', 'NCC', 'NCC', 'कृषि शस्य विज्ञान (कृषि भाग 1 और 2)', 'Agronomy (Agriculture part 1 and 2)'],
  ['2027-02-09', 'A', 'मानव विज्ञान', 'Human Science', 'नागरिक शास्त्र', 'Civics'],
  ['2027-02-10', 'M', 'अंग्रेज़ी', 'English', 'व्यावसायिक वर्ग — दूसरा प्रश्नपत्र', 'Vocational group — paper 2'],
  ['2027-02-10', 'A', 'व्यावसायिक विषय (इलेक्ट्रीशियन, हेल्थकेयर, ऑटोमोबाइल, सोलर, प्लंबर, IT/ITeS, मोबाइल रिपेयर, रिटेल आदि)', 'Vocational subjects (electrician, healthcare, automobile, solar, plumber, IT/ITeS, mobile repair, retail etc.)', 'इतिहास', 'History'],
  ['2027-02-12', 'M', 'गृह विज्ञान', 'Home Science', 'व्यावसायिक वर्ग — तीसरा प्रश्नपत्र', 'Vocational group — paper 3'],
  ['2027-02-12', 'A', '', '', 'जीव विज्ञान, गणित', 'Biology, Mathematics'],
  ['2027-02-13', 'M', 'गणित', 'Mathematics', 'शस्य विज्ञान (व्यावसायिक), कृषि वनस्पति विज्ञान, कृषि अर्थशास्त्र', 'Crop science (vocational), Agricultural Botany, Agricultural Economics'],
  ['2027-02-13', 'A', '', '', 'अर्थशास्त्र', 'Economics'],
  ['2027-02-15', 'M', 'संस्कृत', 'Sanskrit', 'संगीत गायन, संगीत वादन, नृत्यकला', 'Vocal music, Instrumental music, Dance'],
  ['2027-02-15', 'A', '', '', 'रसायन विज्ञान, समाजशास्त्र', 'Chemistry, Sociology'],
  ['2027-02-16', 'M', 'गुजराती, पंजाबी, बांग्ला, मराठी, असमिया, उड़िया, कन्नड़, कश्मीरी, सिंधी, तमिल, तेलुगु, मलयालम, नेपाली', 'Gujarati, Punjabi, Bengali, Marathi, Assamese, Odia, Kannada, Kashmiri, Sindhi, Tamil, Telugu, Malayalam, Nepali', 'कृषि भौतिकी / कृषि जंतु विज्ञान', 'Agricultural Physics / Agricultural Zoology'],
  ['2027-02-16', 'A', '', '', 'भूगोल', 'Geography'],
  ['2027-02-17', 'M', 'विज्ञान', 'Science', 'व्यावसायिक वर्ग — चौथा प्रश्नपत्र', 'Vocational group — paper 4'],
  ['2027-02-17', 'A', 'संगीत वादन', 'Instrumental music', 'भौतिक विज्ञान, सैन्य विज्ञान', 'Physics, Military Science'],
  ['2027-02-18', 'M', 'कंप्यूटर', 'Computer', 'कृषि अभियंत्रण / पशुपालन तथा पशु चिकित्सा विज्ञान', 'Agricultural Engineering / Animal Husbandry and Veterinary Science'],
  ['2027-02-18', 'A', 'सिलाई', 'Sewing', 'चित्रकला आलेखन, चित्रकला प्राविधिक, रंजनकला', 'Drawing, Technical Drawing, Painting'],
  ['2027-02-19', 'M', 'वाणिज्य', 'Commerce', 'व्यावसायिक वर्ग — पाँचवाँ प्रश्नपत्र', 'Vocational group — paper 5'],
  ['2027-02-19', 'A', '', '', 'मानव विज्ञान', 'Human Science'],
  ['2027-02-20', 'M', 'उर्दू', 'Urdu', 'उर्दू, गुजराती, पंजाबी, बांग्ला, मराठी, असमिया, उड़िया, कन्नड़, सिंधी, तमिल, तेलुगु, मलयालम, नेपाली', 'Urdu, Gujarati, Punjabi, Bengali, Marathi, Assamese, Odia, Kannada, Sindhi, Tamil, Telugu, Malayalam, Nepali'],
  ['2027-02-20', 'A', '', '', 'मनोविज्ञान, शिक्षाशास्त्र, तर्कशास्त्र', 'Psychology, Education, Logic'],
  ['2027-02-22', 'M', 'चित्रकला, रंजनकला', 'Drawing, Painting', 'सामान्य आधारिक विषय (व्यावसायिक वर्ग), कृषि गणित / कृषि रसायन', 'General foundation (vocational group), Agricultural Maths / Agricultural Chemistry'],
  ['2027-02-22', 'A', '', '', 'व्यवसाय अध्ययन (वाणिज्य वर्ग), गृह विज्ञान', 'Business Studies (commerce), Home Science'],
  ['2027-02-23', 'M', 'संगीत गायन', 'Vocal music', 'लेखाशास्त्र (वाणिज्य वर्ग), NCC', 'Accountancy (commerce), NCC'],
  ['2027-02-23', 'A', 'पालि, अरबी, फ़ारसी', 'Pali, Arabic, Persian', 'पालि, अरबी, फ़ारसी', 'Pali, Arabic, Persian'],
  ['2027-02-24', 'M', 'कृषि', 'Agriculture', 'कंप्यूटर', 'Computer'],
  ['2027-02-24', 'A', '', '', 'संस्कृत', 'Sanskrit'],
];
const SHIFT = { M: ['सुबह 8:30–11:45', '8:30–11:45 am', '08:30'], A: ['दोपहर 2:00–5:15', '2:00–5:15 pm', '14:00'] };
const LOC = { hi: 'hi-IN', en: 'en-IN' };
const dl = (code, ymd) => new Intl.DateTimeFormat(LOC[code], { day: 'numeric', month: 'long', weekday: 'long', timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
const rowsFor = (cls, code) => R.filter((r) => r[cls === 10 ? 2 : 4]).map((r) => ({ d: r[0], s: r[1], sub: r[(cls === 10 ? 2 : 4) + (code === 'en' ? 1 : 0)] }));

const TX = {
  hi: {
    nav: 'UP बोर्ड 2027', t: 'UP Board Time Table 2027 — हाईस्कूल और इंटर की डेट शीट, कितने दिन बाक़ी | NextGrade',
    d: 'UP बोर्ड (माध्यमिक शिक्षा परिषद) परीक्षा 2027: 5 से 24 फ़रवरी। हाईस्कूल (कक्षा 10) और इंटरमीडिएट (कक्षा 12) का पूरा टाइम टेबल, हर पेपर की शिफ़्ट और समय, लाइव काउंटडाउन।',
    h1: '📝 UP बोर्ड परीक्षा 2027 — टाइम टेबल और काउंटडाउन',
    ans: 'UP बोर्ड की हाईस्कूल और इंटरमीडिएट परीक्षाएँ 5 फ़रवरी 2027 (शुक्रवार) से 24 फ़रवरी 2027 (बुधवार) तक होंगी। रोज़ दो शिफ़्ट हैं — सुबह 8:30 से 11:45 और दोपहर 2:00 से 5:15। पहले दिन हाईस्कूल का हिंदी (सुबह) और इंटर का हिंदी (दोपहर) है।',
    c10: 'हाईस्कूल (कक्षा 10)', c12: 'इंटरमीडिएट (कक्षा 12)', left: 'दिन बाक़ी', first: 'पहले पेपर तक',
    cols: ['तारीख़', 'शिफ़्ट', 'विषय', 'बाक़ी'], days: 'दिन',
    factsH: 'ज़रूरी बातें', facts: ['परिषद ने 12 अक्टूबर 2026 को विज्ञप्ति जारी कर पूरा कार्यक्रम घोषित किया — हाईस्कूल और इंटर दोनों की परीक्षाएँ एक साथ चलेंगी।', 'सुबह की शिफ़्ट 8:30–11:45 और दोपहर की 2:00–5:15 है, यानी हर पेपर 3 घंटे 15 मिनट का स्लॉट। परीक्षा केंद्र पर कम से कम आधा घंटा पहले पहुँचें।', 'हाईस्कूल के लगभग सभी मुख्य पेपर सुबह की शिफ़्ट में हैं; इंटर के मुख्य पेपर (अंग्रेज़ी, भौतिकी, रसायन, जीव विज्ञान, गणित, इतिहास, भूगोल आदि) ज़्यादातर दोपहर में।', 'इंटर में जीव विज्ञान और गणित एक ही दिन, एक ही शिफ़्ट (12 फ़रवरी, दोपहर) में हैं — छात्र इनमें से एक ही लेते हैं।', 'प्रैक्टिकल परीक्षाओं और एडमिट कार्ड की जानकारी अपने स्कूल और upmsp.edu.in से लें; कोई बदलाव हो तो परिषद की सूचना ही मानें।'],
    tipsH: 'आख़िरी हफ़्तों की तैयारी', tips: ['हाईस्कूल वालों के लिए 13 फ़रवरी (गणित) और 17 फ़रवरी (विज्ञान) सबसे बड़े दिन हैं — इनके बीच 3 दिन का अंतर है, उसी हिसाब से रिवीज़न बाँटें।', 'इंटर विज्ञान वर्ग: भौतिकी (17 फ़रवरी) और रसायन (15 फ़रवरी) के बीच सिर्फ़ एक दिन है, इसलिए दोनों के फ़ॉर्मूले पहले से पक्के कर लें।', 'NCERT की किताबें (UP बोर्ड ने अपनाई हैं) और पिछले 5 साल के बोर्ड पेपर सबसे ज़्यादा काम आते हैं।', 'सुबह 8:30 की शिफ़्ट के लिए जनवरी से ही जल्दी उठने की आदत डालें — फ़रवरी की ठंड में सुबह जल्दी निकलना पड़ेगा।', 'एडमिट कार्ड, पेन, पेंसिल, ज्योमेट्री बॉक्स और पानी की बोतल रात को ही बैग में रख लें।'],
    faqH: 'अक्सर पूछे जाने वाले सवाल', faq: [['UP बोर्ड परीक्षा 2027 कब से शुरू है?', '5 फ़रवरी 2027 (शुक्रवार) से, और आख़िरी पेपर 24 फ़रवरी 2027 को है।'], ['UP बोर्ड परीक्षा का समय क्या है?', 'सुबह की शिफ़्ट 8:30 से 11:45 और दोपहर की शिफ़्ट 2:00 से 5:15।'], ['हाईस्कूल का गणित का पेपर कब है?', '13 फ़रवरी 2027 (शनिवार), सुबह 8:30 बजे।'], ['इंटर का भौतिक विज्ञान का पेपर कब है?', '17 फ़रवरी 2027 (बुधवार), दोपहर 2:00 बजे।'], ['ऑफ़िशियल टाइम टेबल कहाँ मिलेगा?', 'upmsp.edu.in पर "TimeTable_2027_Vigyapti" PDF में; नीचे लिंक दिया है।']],
    src: `स्रोत: माध्यमिक शिक्षा परिषद, उत्तर प्रदेश, प्रयागराज की विज्ञप्ति (12-10-2026), ऑफ़िशियल PDF से जाँचा गया ${UP_CHECKED}। यहाँ मुख्य विषय हैं; व्यावसायिक ट्रेड के सभी पेपर PDF में देखें।`, pdf: 'ऑफ़िशियल टाइम टेबल PDF (upmsp.edu.in)', cbse: 'CBSE 2027 डेट शीट और टाइम टेबल मेकर →',
  },
  en: {
    nav: 'UP Board 2027', t: 'UP Board Time Table 2027 — Class 10 & 12 Date Sheet, Shift Timings, Days Left | NextGrade',
    d: 'UP Board (UPMSP) exams 2027 run from 5 to 24 February. Full High School (Class 10) and Intermediate (Class 12) time table with shift and timing for every paper, plus a live countdown.',
    h1: '📝 UP Board Exams 2027 — time table and countdown',
    ans: 'UP Board High School and Intermediate exams run from Friday 5 February 2027 to Wednesday 24 February 2027, in two shifts a day — morning 8:30–11:45 and afternoon 2:00–5:15. The first day has Class 10 Hindi (morning) and Class 12 Hindi (afternoon).',
    c10: 'High School (Class 10)', c12: 'Intermediate (Class 12)', left: 'days left', first: 'to the first paper',
    cols: ['Date', 'Shift', 'Subject', 'Left'], days: 'days',
    factsH: 'Key facts', facts: ['The Board announced the full programme in a notice dated 12 October 2026 — High School and Intermediate exams run together.', 'Morning shift 8:30–11:45, afternoon 2:00–5:15: a 3 hour 15 minute slot per paper. Reach the centre at least half an hour early.', 'Almost all main Class 10 papers are in the morning; most main Class 12 papers (English, Physics, Chemistry, Biology, Maths, History, Geography…) are in the afternoon.', 'Class 12 Biology and Mathematics share the same slot (12 February, afternoon) — students take one of them.', 'Get practical exam dates and admit cards from your school and upmsp.edu.in; if anything changes, the Board’s notice is final.'],
    tipsH: 'The last few weeks', tips: ['Class 10: the big days are 13 Feb (Maths) and 17 Feb (Science), three days apart — plan revision around that gap.', 'Class 12 science: only one day separates Chemistry (15 Feb) and Physics (17 Feb), so lock in the formulas of both early.', 'NCERT books (used by UP Board) and the last five years’ board papers help the most.', 'For the 8:30 am shift, start waking early from January — winter mornings in February are cold.', 'Pack your admit card, pens, pencils, geometry box and water bottle the night before.'],
    faqH: 'Frequently asked questions', faq: [['When do UP Board exams 2027 start?', 'On Friday 5 February 2027; the last paper is on 24 February 2027.'], ['What are the UP Board exam timings?', 'Morning shift 8:30–11:45 and afternoon shift 2:00–5:15.'], ['When is the Class 10 Maths paper?', 'Saturday 13 February 2027, 8:30 am.'], ['When is the Class 12 Physics paper?', 'Wednesday 17 February 2027, 2:00 pm.'], ['Where is the official time table?', 'On upmsp.edu.in as the “TimeTable_2027_Vigyapti” PDF — linked below.']],
    src: `Source: notice of the Madhyamik Shiksha Parishad, Uttar Pradesh, Prayagraj (12-10-2026), checked against the official PDF on ${UP_CHECKED}. Main subjects shown; see the PDF for every vocational trade paper.`, pdf: 'Official time table PDF (upmsp.edu.in)', cbse: 'CBSE 2027 date sheet and timetable maker →',
  },
};
const CD = `<script>(function(){document.querySelectorAll('[data-up]').forEach(function(el){var t=Date.parse(el.getAttribute('data-up')+':00+05:30'),n=Math.ceil((t-Date.now())/864e5);el.textContent=n>0?n:0;});})();</script>`;

export function buildUpBoard(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, X = TX[code]; if (!X) return;
  const path = '/board-exam/up-board-2027/', hub = '/board-exam/', langs = LANGS.filter((l) => TX[l.code]), si = code === 'en' ? 1 : 0;
  const table = (cls) => `<div class="table-wrap"><table class="rz-t"><tr>${X.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${rowsFor(cls, code).map((r) => `<tr><td>${esc(dl(code, r.d))}</td><td>${esc(SHIFT[r.s][si])}</td><td><b>${esc(r.sub)}</b></td><td><span data-up="${r.d}T${SHIFT[r.s][2]}">—</span></td></tr>`).join('')}</table></div>`;
  const first = (cls) => { const r = rowsFor(cls, code)[0]; return `${r.d}T${SHIFT[r.s][2]}`; };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: X.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const css = '<style>.cd{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:12px 0}.cd div{padding:16px;border-radius:16px;background:linear-gradient(135deg,rgba(51,154,240,.16),rgba(245,159,0,.12));text-align:center}.cd b{display:block;font-size:2.6rem;line-height:1.1}.tx-ans{font-size:1.12rem;padding:14px 16px;border-radius:14px;background:rgba(47,158,68,.12)}</style>';
  write(L, path, page(L, {
    path, title: X.t, description: X.d, langs,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [code === 'hi' ? 'बोर्ड परीक्षा 2027' : 'Board exams 2027', hub], [X.nav, path]]), faqLd],
    body: `${css}<div class="wrap narrow article"><p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${code === 'hi' ? 'बोर्ड परीक्षा 2027' : 'Board exams 2027'}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.h1)}</h1><p class="tx-ans">${esc(X.ans)}</p>
<div class="cd no-print"><div><span>${esc(X.c10)}</span><b data-up="${first(10)}">—</b>${esc(X.left)} ${esc(X.first)}</div><div><span>${esc(X.c12)}</span><b data-up="${first(12)}">—</b>${esc(X.left)} ${esc(X.first)}</div></div>
<h2>${esc(X.c10)}</h2>${table(10)}
<div class="ad" aria-hidden="true"></div>
<h2>${esc(X.c12)}</h2>${table(12)}${CD}
<p class="note">${esc(X.src)} <a href="${PDF}" rel="noopener" target="_blank">${esc(X.pdf)}</a></p>
<h2>${esc(X.factsH)}</h2><ul>${X.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<h2>${esc(X.tipsH)}</h2><ul>${X.tips.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<h2>${esc(X.faqH)}</h2>${X.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<p class="no-print"><a class="btn btn-ghost" href="${P(L, hub)}">${esc(X.cbse)}</a></p></div>`,
  }));
}
