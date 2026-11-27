/**
 * Board exam pack (27 Nov 2026, traffic research #4): CBSE 2027 countdown, Class 10 and Class 12 date sheets (main
 * subjects) with "days left" and the gap before each paper, and a study timetable planner that runs in the browser.
 * Dates: CBSE date sheet released 6 Nov 2026, as reported by Careerindia / Careers360 / AIR (checked 27 Nov 2026).
 * Where reports disagree (Class 12 Mathematics) the page says so and points to cbse.gov.in. hi + en.
 * Pages: /board-exam/ (hub + countdown + planner), /board-exam/cbse-class-10-date-sheet-2027/, /board-exam/cbse-class-12-date-sheet-2027/
 */
export const CHECKED = '27 Nov 2026';
// [date, hi, en, flag]
const C10 = [
  ['2027-02-17', 'गणित (स्टैंडर्ड / बेसिक)', 'Mathematics (Standard / Basic)'],
  ['2027-02-19', 'होम साइंस', 'Home Science'],
  ['2027-02-20', 'उर्दू कोर्स-B, एलिमेंट्स ऑफ़ बिज़नेस', 'Urdu Course-B, Elements of Business'],
  ['2027-02-22', 'विज्ञान (Science)', 'Science'],
  ['2027-02-24', 'कंप्यूटर एप्लिकेशन, IT, आर्टिफ़िशियल इंटेलिजेंस', 'Computer Applications, IT, Artificial Intelligence'],
  ['2027-02-26', 'अंग्रेज़ी (कम्युनिकेटिव / लैंग्वेज एंड लिटरेचर)', 'English (Communicative / Language and Literature)'],
  ['2027-03-01', 'संस्कृत, अरबी', 'Sanskrit, Arabic'],
  ['2027-03-03', 'हिंदी कोर्स-A / कोर्स-B', 'Hindi Course-A / Course-B'],
  ['2027-03-04', 'उर्दू कोर्स-A, पंजाबी, बांग्ला, तमिल, मराठी, गुजराती, तेलुगु (तेलंगाना)', 'Urdu Course-A, Punjabi, Bengali, Tamil, Marathi, Gujarati, Telugu (Telangana)'],
  ['2027-03-06', 'फ़्रेंच', 'French'],
  ['2027-03-08', 'सामाजिक विज्ञान (Social Science)', 'Social Science'],
  ['2027-03-09', 'जर्मन, NCC, स्पैनिश, जापानी, बुक कीपिंग वग़ैरह (आख़िरी दिन)', 'German, NCC, Spanish, Japanese, Book Keeping and others (last day)'],
];
const C12 = [
  ['2027-02-16', 'भौतिक विज्ञान (Physics)', 'Physics'],
  ['2027-02-18', 'शारीरिक शिक्षा (Physical Education)', 'Physical Education'],
  ['2027-02-23', 'अकाउंटेंसी', 'Accountancy'],
  ['2027-02-25', 'भूगोल (Geography)', 'Geography'],
  ['2027-02-27', 'रसायन विज्ञान (Chemistry)', 'Chemistry'],
  ['2027-03-02', 'मनोविज्ञान (Psychology)', 'Psychology'],
  ['2027-03-03', 'क्षेत्रीय/विदेशी भाषाएँ (बांग्ला, पंजाबी, तमिल, फ़्रेंच…)', 'Regional/foreign languages (Bengali, Punjabi, Tamil, French…)'],
  ['2027-03-05', 'अंग्रेज़ी कोर / इलेक्टिव', 'English Core / Elective'],
  ['2027-03-09', 'गणित / एप्लाइड मैथ्स', 'Mathematics / Applied Mathematics', true],
  ['2027-03-11', 'होम साइंस', 'Home Science'],
  ['2027-03-13', 'हिंदी कोर / इलेक्टिव', 'Hindi Core / Elective'],
  ['2027-03-16', 'अर्थशास्त्र (Economics)', 'Economics'],
  ['2027-03-19', 'राजनीति विज्ञान (Political Science)', 'Political Science'],
  ['2027-03-20', 'आर्टिफ़िशियल इंटेलिजेंस', 'Artificial Intelligence'],
  ['2027-03-25', 'जीव विज्ञान (Biology)', 'Biology'],
  ['2027-03-27', 'इतिहास (History)', 'History'],
  ['2027-03-30', 'समाजशास्त्र (Sociology)', 'Sociology'],
  ['2027-03-31', 'कंप्यूटर साइंस / इन्फ़ॉर्मेटिक्स प्रैक्टिसेज़ / IT', 'Computer Science / Informatics Practices / IT'],
  ['2027-04-01', 'बिज़नेस स्टडीज़', 'Business Studies'],
  ['2027-04-06', 'संस्कृत कोर', 'Sanskrit Core'],
  ['2027-04-08', 'लीगल स्टडीज़', 'Legal Studies'],
];
const LOC = { hi: 'hi-IN', en: 'en-IN' };
const dl = (code, ymd) => new Intl.DateTimeFormat(LOC[code], { day: 'numeric', month: 'long', weekday: 'long', timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
const gap = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5) - 1;

const TX = {
  hi: {
    nav: 'बोर्ड परीक्षा 2027', hubT: 'CBSE बोर्ड परीक्षा 2027 कितने दिन बाक़ी — काउंटडाउन, डेट शीट और पढ़ाई का टाइम टेबल | NextGrade',
    hubD: 'CBSE बोर्ड परीक्षा 2027 (16 फ़रवरी से) में कितने दिन बाक़ी — लाइव काउंटडाउन, कक्षा 10 और 12 की डेट शीट हिंदी में, हर पेपर से पहले की छुट्टी और मुफ़्त स्टडी टाइम टेबल मेकर।',
    hubH: '📚 CBSE बोर्ड परीक्षा 2027 — कितने दिन बाक़ी', hubL: 'कक्षा 10 और 12 की परीक्षाएँ 16 फ़रवरी 2027 से शुरू। नीचे लाइव काउंटडाउन, डेट शीट और अपना पढ़ाई का टाइम टेबल बनाने का टूल है।',
    left: 'दिन बाक़ी', firstPaper: 'पहले पेपर तक', c10: 'कक्षा 10', c12: 'कक्षा 12', ds10: 'कक्षा 10 डेट शीट 2027 →', ds12: 'कक्षा 12 डेट शीट 2027 →',
    facts: ['थ्योरी पेपर सुबह 10:30 बजे शुरू होते हैं; ज़्यादातर 3 घंटे के (10:30–1:30), कुछ स्किल विषय 2 घंटे के।', 'कक्षा 10: 16 फ़रवरी से 9 मार्च 2027; कक्षा 12: 16 फ़रवरी से 9 अप्रैल 2027।', 'प्रैक्टिकल: आम स्कूलों में 1 जनवरी से 13 फ़रवरी 2027; विंटर-बाउंड स्कूलों में 9 नवंबर से 19 दिसंबर 2026।', 'होली 22 मार्च 2027 को है; उस दिन कक्षा 12 के कुछ छोटे विषयों के पेपर हैं — बदलाव हो तो CBSE की सूचना देखें।'],
    factsH: 'ज़रूरी बातें', planH: '🗓️ अपना पढ़ाई का टाइम टेबल बनाएँ', planL: 'कक्षा चुनें, अपने विषय टिक करें और रोज़ पढ़ाई के घंटे डालें — आज से हर पेपर तक दिन-वार प्लान बन जाएगा (दो पेपरों के बीच के दिन उसी पेपर के लिए)।',
    hours: 'रोज़ पढ़ाई (घंटे)', make: 'टाइम टेबल बनाएँ', print: '🖨️ प्रिंट करें', planCols: ['तारीख़', 'क्या पढ़ें'], rev: 'रिवीज़न', exam: 'परीक्षा', rest: 'हल्का रिवीज़न + आराम', prevPaper: 'पिछले पेपर के बाद',
    tipsH: 'बोर्ड परीक्षा की तैयारी के टिप्स', tips: ['पिछले 5 साल के पेपर और CBSE के सैंपल पेपर ज़रूर हल करें — सवालों का पैटर्न समझ आता है।', 'हर विषय के लिए एक पन्ने के "क्विक नोट्स" बनाएँ — आख़िरी दिन यही पढ़ें।', 'रोज़ 7–8 घंटे की नींद लें; परीक्षा से पहली रात देर तक न जागें।', 'पेपर में पहले 15 मिनट पढ़ने में लगाएँ; जो सवाल अच्छे से आते हों, पहले वही करें।', 'एडमिट कार्ड, पेन, पेंसिल, ज्योमेट्री बॉक्स, पारदर्शी पानी की बोतल रात को ही रख लें।'],
    dsT: (k) => `CBSE कक्षा ${k} डेट शीट 2027 हिंदी में — किस दिन कौन-सा पेपर, कितने दिन बाक़ी | NextGrade`,
    dsD: (k, f, l) => `CBSE कक्षा ${k} बोर्ड परीक्षा 2027 की डेट शीट: ${f} से ${l} तक। हर पेपर की तारीख़, दिन, पेपर से पहले कितनी छुट्टी और लाइव काउंटडाउन।`,
    dsH: (k) => `CBSE कक्षा ${k} डेट शीट 2027`, cols: ['तारीख़', 'विषय', 'पहले छुट्टी', 'बाक़ी'], days: 'दिन',
    ans: (k, f, l, n) => `CBSE कक्षा ${k} की बोर्ड परीक्षाएँ ${f} से ${l} तक होंगी — मुख्य विषयों के ${n} पेपर। सभी पेपर सुबह 10:30 बजे शुरू।`,
    mathFlag: 'ख़बरों में इस पेपर की तारीख़ अलग-अलग छपी है — cbse.gov.in की ऑफ़िशियल PDF से पक्का करें।',
    src: `स्रोत: CBSE की 6 नवंबर 2026 को जारी डेट शीट (ख़बरों के अनुसार), जाँचा गया ${CHECKED}। यहाँ मुख्य विषय हैं; सभी विषयों और किसी भी बदलाव के लिए cbse.gov.in देखें।`,
  },
  en: {
    nav: 'Board exams 2027', hubT: 'CBSE Board Exam 2027 Countdown — Days Left, Date Sheet and Study Timetable | NextGrade',
    hubD: 'How many days are left for the CBSE board exams 2027 (from 16 February) — live countdown, Class 10 and 12 date sheets, the gap before each paper and a free study timetable maker.',
    hubH: '📚 CBSE Board Exams 2027 — days left', hubL: 'Class 10 and 12 exams start on 16 February 2027. Below: a live countdown, the date sheets and a tool to make your own study timetable.',
    left: 'days left', firstPaper: 'to the first paper', c10: 'Class 10', c12: 'Class 12', ds10: 'Class 10 date sheet 2027 →', ds12: 'Class 12 date sheet 2027 →',
    facts: ['Theory papers start at 10:30 am; most are 3 hours (10:30–1:30), some skill subjects 2 hours.', 'Class 10: 16 February to 9 March 2027; Class 12: 16 February to 9 April 2027.', 'Practicals: 1 January to 13 February 2027 in most schools; 9 November to 19 December 2026 in winter-bound schools.', 'Holi falls on 22 March 2027, when some smaller Class 12 papers are scheduled — watch for any CBSE notice.'],
    factsH: 'Key facts', planH: '🗓️ Make your study timetable', planL: 'Pick your class, tick your subjects and enter your daily study hours — you get a day-by-day plan from today to each paper (the days between two papers go to the next paper).',
    hours: 'Study hours a day', make: 'Make timetable', print: '🖨️ Print', planCols: ['Date', 'What to study'], rev: 'Revise', exam: 'Exam', rest: 'Light revision + rest', prevPaper: 'after the previous paper',
    tipsH: 'Board exam preparation tips', tips: ['Solve the last 5 years’ papers and CBSE sample papers — you learn the pattern of questions.', 'Make one-page quick notes for each subject — read only these on the last day.', 'Sleep 7–8 hours; don’t stay up late the night before a paper.', 'Use the first 15 minutes to read the paper; answer the questions you know best first.', 'Pack your admit card, pens, pencils, geometry box and a transparent water bottle the night before.'],
    dsT: (k) => `CBSE Class ${k} Date Sheet 2027 — Paper-wise Dates and Days Left | NextGrade`,
    dsD: (k, f, l) => `CBSE Class ${k} board exam 2027 date sheet: ${f} to ${l}. Every paper’s date and day, the study gap before each paper and a live countdown.`,
    dsH: (k) => `CBSE Class ${k} Date Sheet 2027`, cols: ['Date', 'Subject', 'Gap before', 'Left'], days: 'days',
    ans: (k, f, l, n) => `CBSE Class ${k} board exams run from ${f} to ${l} — ${n} papers in the main subjects. Every paper starts at 10:30 am.`,
    mathFlag: 'News reports print different dates for this paper — confirm with the official PDF on cbse.gov.in.',
    src: `Source: CBSE date sheet released on 6 November 2026 (as reported), checked ${CHECKED}. Main subjects only; see cbse.gov.in for every subject and any change.`,
  },
};
const PLAN_JS = (X, C10j, C12j) => `<script>(function(){var D={10:${C10j},12:${C12j}},C={10:[0,3,5,7,10],12:[0,4,7,8]},X=${JSON.stringify({ rev: X.rev, exam: X.exam, rest: X.rest })};
var f=document.getElementById('pl'),box=document.getElementById('pl-subj'),out=document.getElementById('pl-out');
function subj(){var k=f.cls.value;box.innerHTML=D[k].map(function(r,i){return '<label style="display:block"><input type="checkbox"'+(C[k].indexOf(i)>=0?' checked':'')+' value="'+i+'"> '+r[1]+' — '+r[0]+'</label>';}).join('');}
f.cls.addEventListener('change',subj);subj();
function fmt(d){return new Date(d+'T00:00:00Z').toLocaleDateString(document.documentElement.lang==='hi'?'hi-IN':'en-IN',{day:'numeric',month:'short',weekday:'short',timeZone:'UTC'});}
f.addEventListener('submit',function(e){e.preventDefault();var k=f.cls.value,h=+f.hrs.value||6,sel=[].slice.call(box.querySelectorAll('input:checked')).map(function(c){return D[k][+c.value];});
var t=new Date(Date.now()+19800000).toISOString().slice(0,10),rows=[],start=t;
var nx=function(d){return new Date(Date.parse(d)+864e5).toISOString().slice(0,10);};if(sel.length){var cut=new Date(Date.parse(sel[0][0])-4*864e5).toISOString().slice(0,10),q=0;while(start<cut){var a=sel[q%sel.length],b=sel[(q+1)%sel.length];rows.push('<tr><td>'+fmt(start)+'</td><td>'+X.rev+': '+a[1]+(sel.length>1?' + '+b[1]:'')+' ('+(sel.length>1?Math.round(h/2*10)/10+' h + '+Math.round(h/2*10)/10+' h':h+' h')+')</td></tr>');q+=2;start=nx(start);}}
sel.forEach(function(p){var d=start;while(d<p[0]){var last=new Date(Date.parse(p[0])-864e5).toISOString().slice(0,10)===d;rows.push('<tr><td>'+fmt(d)+'</td><td>'+(last?X.rest+' — '+p[1]:X.rev+': '+p[1]+' ('+h+' h)')+'</td></tr>');d=new Date(Date.parse(d)+864e5).toISOString().slice(0,10);}
rows.push('<tr style="font-weight:700;background:rgba(47,158,68,.15)"><td>'+fmt(p[0])+'</td><td>📝 '+X.exam+': '+p[1]+' — 10:30 AM</td></tr>');start=new Date(Date.parse(p[0])+864e5).toISOString().slice(0,10);});
out.innerHTML='<div class="table-wrap"><table class="rz-t"><tr><th>${X.planCols[0]}</th><th>${X.planCols[1]}</th></tr>'+rows.join('')+'</table></div><p><button class="btn btn-ghost" type="button" onclick="print()">${X.print}</button></p>';out.hidden=false;});})();</script>`;
const CD_JS = `<script>(function(){document.querySelectorAll('[data-cd]').forEach(function(el){var t=Date.parse(el.getAttribute('data-cd')+'T10:30:00+05:30'),n=Math.ceil((t-Date.now())/864e5);el.textContent=n>0?n:0;});})();</script>`;

export function buildBoardExam(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code; if (!TX[code]) return;
  const X = TX[code], hub = '/board-exam/', langs = LANGS.filter((l) => TX[l.code]), k = code === 'hi' ? 1 : 2;
  const css = '<style>.cd{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:12px 0}.cd div{padding:16px;border-radius:16px;background:linear-gradient(135deg,rgba(51,154,240,.16),rgba(245,159,0,.12));text-align:center}.cd b{display:block;font-size:2.6rem;line-height:1.1}.tx-ans{font-size:1.12rem;padding:14px 16px;border-radius:14px;background:rgba(47,158,68,.12);margin:12px 0}.rz-t{width:100%;border-collapse:collapse}.rz-t td,.rz-t th{padding:7px 8px;border-bottom:1px solid var(--line);font-size:15px;text-align:left}.pl-f{display:grid;gap:.7rem;margin:1rem 0}.pl-f select,.pl-f input[type=number]{padding:.55rem;font-size:1rem;border:1px solid var(--line);border-radius:10px}@media print{header,footer,.no-print,.ad{display:none!important}}</style>';
  const crumbs = (items) => `<p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${items.map(([t, h]) => (h ? `<a href="${P(L, h)}">${esc(t)}</a>` : esc(t))).join(' › ')}</p>`;
  const j = (rows) => JSON.stringify(rows.map((r) => [r[0], r[k]]));
  const ds = (cls) => `${hub}cbse-class-${cls}-date-sheet-2027/`;
  write(L, hub, page(L, {
    path: hub, title: X.hubT, description: X.hubD, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap narrow article">${crumbs([[X.nav]])}<h1>${esc(X.hubH)}</h1><p class="lead">${esc(X.hubL)}</p>
<div class="cd no-print"><div><span>${esc(X.c10)}</span><b data-cd="${C10[0][0]}">—</b>${esc(X.left)} ${esc(X.firstPaper)}</div><div><span>${esc(X.c12)}</span><b data-cd="${C12[0][0]}">—</b>${esc(X.left)} ${esc(X.firstPaper)}</div></div>${CD_JS}
<p class="chips no-print"><a class="tag" href="${P(L, ds(10))}">${esc(X.ds10)}</a> <a class="tag" href="${P(L, ds(12))}">${esc(X.ds12)}</a> <a class="tag" href="${P(L, `${hub}up-board-2027/`)}">${code === 'hi' ? 'UP बोर्ड टाइम टेबल 2027 →' : 'UP Board time table 2027 →'}</a></p>
<h2>${esc(X.factsH)}</h2><ul>${X.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul><div class="ad" aria-hidden="true"></div>
<h2>${esc(X.planH)}</h2><p>${esc(X.planL)}</p>
<form id="pl" class="pl-f no-print"><label>${esc(X.c10)} / ${esc(X.c12)} <select name="cls"><option value="10">${esc(X.c10)}</option><option value="12">${esc(X.c12)}</option></select></label><div id="pl-subj"></div><label>${esc(X.hours)} <input type="number" name="hrs" value="6" min="1" max="14"></label><button class="btn btn-primary" type="submit">${esc(X.make)}</button></form><div id="pl-out" hidden></div>${PLAN_JS(X, j(C10), j(C12))}
<h2>${esc(X.tipsH)}</h2><ul>${X.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul><p class="note">${esc(X.src)}</p></div>`,
  }));
  for (const [cls, rows] of [[10, C10], [12, C12]]) {
    const path = ds(cls), first = dl(code, rows[0][0]), last = dl(code, rows[rows.length - 1][0]);
    const body = rows.map((r, i) => `<tr><td>${esc(dl(code, r[0]))}</td><td><b>${esc(r[k])}</b>${r[3] ? `<br><small style="color:var(--muted)">⚠️ ${esc(X.mathFlag)}</small>` : ''}</td><td>${i ? `${gap(rows[i - 1][0], r[0])} ${esc(X.days)}` : '—'}</td><td><span data-cd="${r[0]}">—</span></td></tr>`).join('');
    write(L, path, page(L, {
      path, title: X.dsT(cls), description: X.dsD(cls, first, last), langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [X.dsH(cls), path]])],
      body: `${css}<div class="wrap narrow article">${crumbs([[X.nav, hub], [X.dsH(cls)]])}<h1>📅 ${esc(X.dsH(cls))}</h1>
<p class="tx-ans">${esc(X.ans(cls, first, last, rows.length))}</p>
<div class="table-wrap"><table class="rz-t"><tr>${X.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${body}</table></div>${CD_JS}
<p class="note">${esc(X.src)}</p><div class="ad" aria-hidden="true"></div>
<h2>${esc(X.factsH)}</h2><ul>${X.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<p><a class="btn btn-primary" href="${P(L, hub)}#pl">${esc(X.planH)} →</a> <a class="btn btn-ghost" href="${P(L, ds(cls === 10 ? 12 : 10))}">${esc(cls === 10 ? X.ds12 : X.ds10)}</a></p>
<h2>${esc(X.tipsH)}</h2><ul>${X.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`,
    }));
  }
}
