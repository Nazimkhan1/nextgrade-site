/**
 * /aaj/ — "Aaj ka din" (plan item P2, 26 Nov 2026): today's date, tithi, festival, sunrise/sunset, a suvichar, and a
 * Good-Morning image made in the browser (src/assets/aaj.js) to share on WhatsApp status. Rebuilt every morning by the
 * daily release; the page also carries the next 10 days so a cached copy still shows the right day.
 */
import { panchangAt, sunriseDelhi, tithiName, MONTHS } from './tithi.mjs';
import { sunTimes, hhmm } from './sun.mjs';
import { DATES } from './festival-dates.mjs';

// Our own short sayings: [hi, hinglish, en, bn]
export const SUVICHAR = [
  ['हर सुबह एक नया मौक़ा है — कल की थकान छोड़िए, आज का काम पकड़िए।', 'Har subah ek naya mauka hai — kal ki thakaan chhodiye, aaj ka kaam pakadiye.', 'Every morning is a new chance — leave yesterday’s tiredness, pick up today’s work.', 'প্রতিটি সকাল একটা নতুন সুযোগ — কালকের ক্লান্তি ছাড়ুন, আজকের কাজ ধরুন।'],
  ['छोटे-छोटे क़दम भी रोज़ चलें, तो लंबा रास्ता कट जाता है।', 'Chhote-chhote kadam bhi roz chalein, to lamba raasta kat jaata hai.', 'Small steps taken every day cover a long road.', 'রোজ ছোট ছোট পা ফেললেও লম্বা পথ পেরোনো যায়।'],
  ['मुस्कान मुफ़्त है, पर उसकी क़ीमत बहुत बड़ी है।', 'Muskaan muft hai, par uski keemat bahut badi hai.', 'A smile costs nothing, yet it is worth a great deal.', 'হাসি বিনামূল্যে, কিন্তু তার দাম অনেক।'],
  ['जो समय पर उठता है, उसका दिन भी समय पर चलता है।', 'Jo samay par uthta hai, uska din bhi samay par chalta hai.', 'Rise on time, and your day runs on time too.', 'যে সময়ে ওঠে, তার দিনও সময়ে চলে।'],
  ['माँ-बाप की दुआ सबसे बड़ा सहारा है।', 'Maa-baap ki dua sabse bada sahaara hai.', 'Parents’ blessings are the greatest support.', 'বাবা-মায়ের আশীর্বাদই সবচেয়ে বড় ভরসা।'],
  ['ग़लती मानना कमज़ोरी नहीं, सीखने की शुरुआत है।', 'Galti maanna kamzori nahi, seekhne ki shuruaat hai.', 'Admitting a mistake is not weakness — it is where learning begins.', 'ভুল মানা দুর্বলতা নয়, শেখার শুরু।'],
  ['मेहनत की रोटी में सबसे ज़्यादा स्वाद होता है।', 'Mehnat ki roti mein sabse zyada swaad hota hai.', 'Bread earned by hard work tastes the best.', 'পরিশ্রমের রুটির স্বাদ সবচেয়ে বেশি।'],
  ['दूसरों से तुलना छोड़िए, कल के अपने आप से बेहतर बनिए।', 'Doosron se tulna chhodiye, kal ke apne aap se behtar baniye.', 'Stop comparing with others — be better than you were yesterday.', 'অন্যের সঙ্গে তুলনা ছাড়ুন, কালকের নিজের চেয়ে ভালো হোন।'],
  ['शांत मन से लिया फ़ैसला अक्सर सही निकलता है।', 'Shaant mann se liya faisla aksar sahi nikalta hai.', 'A decision made with a calm mind usually turns out right.', 'শান্ত মনে নেওয়া সিদ্ধান্ত প্রায়ই ঠিক হয়।'],
  ['अच्छी सेहत सबसे बड़ा ख़ज़ाना है — आज थोड़ा चलिए, थोड़ा हँसिए।', 'Achhi sehat sabse bada khazaana hai — aaj thoda chaliye, thoda hansiye.', 'Good health is the greatest treasure — walk a little and laugh a little today.', 'ভালো স্বাস্থ্যই সবচেয়ে বড় সম্পদ — আজ একটু হাঁটুন, একটু হাসুন।'],
  ['किसी की मदद करके देखिए, दिन अपने आप अच्छा हो जाएगा।', 'Kisi ki madad karke dekhiye, din apne aap achha ho jaayega.', 'Help someone today and watch your own day get better.', 'কাউকে সাহায্য করে দেখুন, দিনটা নিজেই ভালো হয়ে যাবে।'],
  ['जो सीखना नहीं छोड़ता, वह कभी पीछे नहीं रहता।', 'Jo seekhna nahi chhodta, woh kabhi peechhe nahi rehta.', 'Whoever keeps learning never falls behind.', 'যে শেখা ছাড়ে না, সে কখনও পিছিয়ে পড়ে না।'],
  ['धैर्य कड़वा है, पर उसका फल मीठा है।', 'Dhairya kadwa hai, par uska phal meetha hai.', 'Patience is bitter, but its fruit is sweet.', 'ধৈর্য তেতো, কিন্তু তার ফল মিষ্টি।'],
  ['बोलने से पहले सोचिए — शब्द वापस नहीं आते।', 'Bolne se pehle sochiye — shabd waapas nahi aate.', 'Think before you speak — words do not come back.', 'বলার আগে ভাবুন — কথা ফেরত আসে না।'],
  ['आज जो बोएँगे, कल वही काटेंगे।', 'Aaj jo boyenge, kal wahi kaatenge.', 'What we sow today, we reap tomorrow.', 'আজ যা বুনবেন, কাল তাই কাটবেন।'],
  ['परिवार के साथ बिताया समय कभी बेकार नहीं जाता।', 'Parivaar ke saath bitaaya samay kabhi bekaar nahi jaata.', 'Time spent with family is never wasted.', 'পরিবারের সঙ্গে কাটানো সময় কখনও বৃথা যায় না।'],
  ['डर के आगे ही जीत है — पहला क़दम उठाइए।', 'Darr ke aage hi jeet hai — pehla kadam uthaiye.', 'Victory lies just past fear — take the first step.', 'ভয়ের ওপারেই জয় — প্রথম পা বাড়ান।'],
  ['सादा जीवन, ऊँचे विचार — यही असली अमीरी है।', 'Saada jeevan, oonche vichaar — yahi asli ameeri hai.', 'Simple living, high thinking — that is real wealth.', 'সাধারণ জীবন, উঁচু ভাবনা — এটাই আসল ঐশ্বর্য।'],
  ['हर दिन कुछ अच्छा ज़रूर होता है — बस नज़र चाहिए।', 'Har din kuch achha zaroor hota hai — bas nazar chahiye.', 'Something good happens every day — you only need to notice it.', 'প্রতিদিনই কিছু ভালো হয় — শুধু চোখ রাখতে হয়।'],
  ['ईमानदारी की राह लंबी लग सकती है, पर पहुँचाती सही जगह है।', 'Imaandaari ki raah lambi lag sakti hai, par pahunchaati sahi jagah hai.', 'The honest road may feel long, but it leads to the right place.', 'সততার পথ লম্বা মনে হতে পারে, কিন্তু ঠিক জায়গায় পৌঁছে দেয়।'],
  ['किताब सबसे अच्छी दोस्त है — रोज़ कुछ पन्ने पढ़िए।', 'Kitaab sabse achhi dost hai — roz kuch panne padhiye.', 'A book is the best friend — read a few pages every day.', 'বই সবচেয়ে ভালো বন্ধু — রোজ কয়েক পাতা পড়ুন।'],
  ['ग़ुस्से में कहा एक शब्द, प्यार की सौ बातें भुला देता है।', 'Gusse mein kaha ek shabd, pyaar ki sau baatein bhula deta hai.', 'One word said in anger can wipe out a hundred loving ones.', 'রাগে বলা একটা কথা, ভালোবাসার একশো কথা ভুলিয়ে দেয়।'],
  ['पानी पीते रहिए, धूप लीजिए, और समय पर सोइए।', 'Paani peete rahiye, dhoop lijiye, aur samay par soiye.', 'Keep drinking water, get some sun, and sleep on time.', 'জল খান, রোদ নিন, আর সময়ে ঘুমোন।'],
  ['सपने वे नहीं जो सोते में आएँ, सपने वे हैं जो सोने न दें।', 'Sapne woh nahi jo sote mein aayein, sapne woh hain jo sone na dein.', 'Dreams are not what you see in sleep — they are what keep you awake.', 'স্বপ্ন সেটা নয় যা ঘুমে আসে, স্বপ্ন সেটাই যা ঘুমোতে দেয় না।'],
  ['धन्यवाद कहने की आदत रिश्तों को मज़बूत बनाती है।', 'Dhanyavaad kehne ki aadat rishton ko mazboot banaati hai.', 'The habit of saying thank you makes relationships stronger.', 'ধন্যবাদ বলার অভ্যাস সম্পর্ককে মজবুত করে।'],
  ['जो बीत गया उस पर नहीं, जो आने वाला है उस पर ध्यान दीजिए।', 'Jo beet gaya us par nahi, jo aane wala hai us par dhyaan dijiye.', 'Focus not on what has passed but on what is coming.', 'যা চলে গেছে তা নয়, যা আসছে তাতে মন দিন।'],
  ['बड़ों का आदर और छोटों से प्यार — यही संस्कार है।', 'Badon ka aadar aur chhoton se pyaar — yahi sanskaar hai.', 'Respect for elders and love for the young — that is good upbringing.', 'বড়দের সম্মান আর ছোটদের ভালোবাসা — এটাই সংস্কার।'],
  ['काम से भागिए मत, काम को आसान बनाने का तरीक़ा ढूँढिए।', 'Kaam se bhaagiye mat, kaam ko aasaan banaane ka tarika dhoondhiye.', 'Do not run from work — find a way to make it easier.', 'কাজ থেকে পালাবেন না, কাজ সহজ করার উপায় খুঁজুন।'],
  ['आज का दिन दोबारा नहीं आएगा — इसे अच्छे से जिएँ।', 'Aaj ka din dobaara nahi aayega — ise achhe se jiyein.', 'Today will not come again — live it well.', 'আজকের দিন আর ফিরবে না — ভালো করে বাঁচুন।'],
  ['उम्मीद का दीया जलाए रखिए, अँधेरा ज़्यादा देर नहीं टिकता।', 'Ummeed ka diya jalaaye rakhiye, andhera zyada der nahi tikta.', 'Keep the lamp of hope burning — darkness does not last long.', 'আশার প্রদীপ জ্বালিয়ে রাখুন, অন্ধকার বেশিক্ষণ থাকে না।'],
];
const SI = { hi: 0, hinglish: 1, en: 2, bn: 3 };
const LOC = { hi: 'hi-IN', bn: 'bn-IN', en: 'en-IN', hinglish: 'en-IN' };

const X = {
  hi: { nav: 'आज का दिन', title: (d) => `आज की तिथि और आज का दिन — ${d} | पंचांग, त्योहार, सुविचार, Good Morning Image | NextGrade`, desc: (d, t) => `आज ${d}: ${t}। आज का त्योहार, सूर्योदय-सूर्यास्त, आज का सुविचार और नाम के साथ शुभ प्रभात इमेज — WhatsApp स्टेटस के लिए।`, h1: (d) => `☀️ आज का दिन — ${d}`, tithiL: 'तिथि', monthL: 'माह', sunL: 'सूर्योदय / सूर्यास्त (नई दिल्ली)', festL: 'आज', nextFestL: 'आने वाला त्योहार', noFest: 'आज कोई बड़ा त्योहार नहीं', vicharH: '💬 आज का सुविचार', imgH: '🌅 शुभ प्रभात इमेज बनाइए', nameL: 'अपना नाम (चाहें तो)', greet: 'शुभ प्रभात', make: 'इमेज बनाएँ', share: '📲 WhatsApp / शेयर', dl: '⬇ डाउनलोड', theme: 'डिज़ाइन', weekH: 'अगले 7 दिन', cols: ['तारीख़', 'तिथि', 'त्योहार'], note: 'तिथि नई दिल्ली के सूर्योदय के समय की है (खगोलीय गणना)। अपने शहर का समय/तिथि स्थानीय पंचांग से मिलाएँ।', more: 'ये भी देखें', shukla: 'शुक्ल', krishna: 'कृष्ण', paksha: 'पक्ष' },
  hinglish: { nav: 'Aaj ka din', title: (d) => `Aaj ki Tithi aur Aaj ka Din — ${d} | Panchang, Tyohaar, Suvichar, Good Morning Image | NextGrade`, desc: (d, t) => `Aaj ${d}: ${t}. Aaj ka tyohaar, sunrise-sunset, aaj ka suvichar aur naam ke saath Good Morning image — WhatsApp status ke liye.`, h1: (d) => `☀️ Aaj ka din — ${d}`, tithiL: 'Tithi', monthL: 'Maah', sunL: 'Sunrise / sunset (New Delhi)', festL: 'Aaj', nextFestL: 'Aane wala tyohaar', noFest: 'Aaj koi bada tyohaar nahi', vicharH: '💬 Aaj ka suvichar', imgH: '🌅 Good Morning image banaiye', nameL: 'Apna naam (chahein to)', greet: 'Good Morning', make: 'Image banayein', share: '📲 WhatsApp / Share', dl: '⬇ Download', theme: 'Design', weekH: 'Agle 7 din', cols: ['Tareekh', 'Tithi', 'Tyohaar'], note: 'Tithi New Delhi ke sunrise ke samay ki hai (khagoliya ganana). Apne sheher ka samay/tithi sthaniya panchang se milaayein.', more: 'Yeh bhi dekhein', shukla: 'Shukla', krishna: 'Krishna', paksha: 'paksha' },
  en: { nav: 'Today', title: (d) => `Today’s Tithi and Day — ${d} | Panchang, Festival, Thought of the Day, Good Morning Image | NextGrade`, desc: (d, t) => `Today, ${d}: ${t}. Today’s festival, sunrise and sunset, thought of the day and a Good Morning image with your name — for WhatsApp status.`, h1: (d) => `☀️ Today — ${d}`, tithiL: 'Tithi', monthL: 'Month', sunL: 'Sunrise / sunset (New Delhi)', festL: 'Today', nextFestL: 'Coming up', noFest: 'No major festival today', vicharH: '💬 Thought of the day', imgH: '🌅 Make a Good Morning image', nameL: 'Your name (optional)', greet: 'Good Morning', make: 'Make image', share: '📲 WhatsApp / Share', dl: '⬇ Download', theme: 'Design', weekH: 'Next 7 days', cols: ['Date', 'Tithi', 'Festival'], note: 'The tithi is the one at sunrise in New Delhi (astronomical calculation). Check your local panchang for your city.', more: 'See also', shukla: 'Shukla', krishna: 'Krishna', paksha: 'paksha' },
  bn: { nav: 'আজকের দিন', title: (d) => `আজকের তিথি আর আজকের দিন — ${d} | পঞ্জিকা, উৎসব, সুবিচার, শুভ সকাল ছবি | NextGrade`, desc: (d, t) => `আজ ${d}: ${t}। আজকের উৎসব, সূর্যোদয়-সূর্যাস্ত, আজকের সুবিচার আর নামসহ শুভ সকাল ছবি — WhatsApp স্ট্যাটাসের জন্য।`, h1: (d) => `☀️ আজকের দিন — ${d}`, tithiL: 'তিথি', monthL: 'মাস', sunL: 'সূর্যোদয় / সূর্যাস্ত (নয়াদিল্লি)', festL: 'আজ', nextFestL: 'আসছে', noFest: 'আজ বড় কোনো উৎসব নেই', vicharH: '💬 আজকের সুবিচার', imgH: '🌅 শুভ সকাল ছবি বানান', nameL: 'নিজের নাম (চাইলে)', greet: 'শুভ সকাল', make: 'ছবি বানান', share: '📲 WhatsApp / শেয়ার', dl: '⬇ ডাউনলোড', theme: 'ডিজাইন', weekH: 'পরের ৭ দিন', cols: ['তারিখ', 'তিথি', 'উৎসব'], note: 'তিথি নয়াদিল্লির সূর্যোদয়ের সময়ের (জ্যোতির্বৈজ্ঞানিক হিসাব)। নিজের শহরের জন্য স্থানীয় পঞ্জিকা মিলিয়ে নিন।', more: 'আরও দেখুন', shukla: 'শুক্ল', krishna: 'কৃষ্ণ', paksha: 'পক্ষ' },
};
export const AAJ_NAV = Object.fromEntries(Object.entries(X).map(([k, v]) => [k, v.nav]));

export function buildAaj(L, { page, write, P, esc, T, breadcrumbLd, festName }) {
  const code = L.code, A = X[code], path = '/aaj/', mcode = code === 'bn' ? 'bn' : code === 'hi' ? 'hi' : 'en';
  const today = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  const addD = (ymd, n) => new Date(Date.parse(`${ymd}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
  const festOn = (ymd) => Object.entries(DATES).filter(([, l]) => l.some((x) => x.d === ymd)).map(([s]) => festName(s, L)).filter(Boolean);
  const nextFest = (ymd) => { let best = null; for (const [s, l] of Object.entries(DATES)) for (const x of l) if (x.d > ymd && (!best || x.d < best[1])) { const n = festName(s, L); if (n) best = [n, x.d]; } return best; };
  const dfmt = (ymd, o = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) => new Intl.DateTimeFormat(LOC[code], { ...o, timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
  const day = (ymd) => {
    const p = panchangAt(sunriseDelhi(ymd)), st = sunTimes(28.61, 77.21, ymd), idx = Math.floor(Date.parse(`${ymd}T00:00:00Z`) / 864e5) % SUVICHAR.length;
    const tithi = `${MONTHS[mcode][p.pmonth]} ${p.paksha === 's' ? A.shukla : A.krishna} ${tithiName(code, p.n)}`;
    const nf = nextFest(ymd);
    return { ymd, date: dfmt(ymd), short: dfmt(ymd, { weekday: 'short', day: 'numeric', month: 'short' }), weekday: dfmt(ymd, { weekday: 'long' }), tithi, fest: festOn(ymd), next: nf ? `${nf[0]} — ${dfmt(nf[1], { day: 'numeric', month: 'long' })}` : '', sun: st ? `${hhmm(st[0])} / ${hhmm(st[1])}` : '', vichar: SUVICHAR[idx][SI[code]] };
  };
  const days = [...Array(10)].map((_, i) => day(addD(today, i))), d0 = days[0];
  const cfg = { lang: code, days, ui: { greet: A.greet, make: A.make, share: A.share, dl: A.dl, nameL: A.nameL, theme: A.theme, festL: A.festL, tithiL: A.tithiL } };
  write(L, path, page(L, {
    path, title: A.title(d0.date), description: A.desc(d0.date, d0.tithi),
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [A.nav, path]])],
    body: `<style>.aj-box{display:grid;gap:8px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));margin:12px 0}.aj-box div{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 14px}.aj-box b{display:block;font-size:13px;color:var(--muted)}.aj-box span{font-size:18px;font-weight:800}.aj-v{font-size:22px;font-weight:700;line-height:1.5;padding:16px 18px;border-radius:16px;background:linear-gradient(135deg,#fff4e6,#fff0f6);border:1px solid var(--line)}.aj-img canvas{width:100%;max-width:420px;border-radius:16px;box-shadow:var(--shadow);display:block;margin:10px auto}.aj-ctl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center}.aj-ctl input{padding:10px 12px;border-radius:10px;border:1px solid var(--line);font:inherit}.aj-th{display:flex;gap:8px;justify-content:center;margin:8px 0}.aj-th button{width:34px;height:34px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px var(--line);cursor:pointer}.aj-th button.on{box-shadow:0 0 0 3px var(--brand)}.aj-wk{width:100%;border-collapse:collapse}.aj-wk td,.aj-wk th{padding:8px 6px;border-bottom:1px solid var(--line);text-align:left;font-size:15px}</style><div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(A.nav)}</p>
<h1 id="aj-h1">${esc(A.h1(d0.date))}</h1>
<div class="aj-box"><div><b>${esc(A.tithiL)}</b><span id="aj-tithi">${esc(d0.tithi)}</span></div><div><b>${esc(A.festL)}</b><span id="aj-fest">${esc(d0.fest.join(', ') || A.noFest)}</span></div><div><b>${esc(A.nextFestL)}</b><span id="aj-next">${esc(d0.next)}</span></div><div><b>${esc(A.sunL)}</b><span id="aj-sun">${esc(d0.sun)}</span></div></div>
<h2>${esc(A.vicharH)}</h2><p class="aj-v" id="aj-v">${esc(d0.vichar)}</p>
<h2>${esc(A.imgH)}</h2>
<div class="aj-img" id="aj-img"><div class="aj-th" id="aj-th"></div><canvas id="aj-cv" width="1080" height="1350"></canvas><div class="aj-ctl"><input id="aj-name" placeholder="${esc(A.nameL)}" maxlength="30"><button class="btn btn-primary" type="button" id="aj-share">${esc(A.share)}</button><button class="btn btn-ghost" type="button" id="aj-dl">${esc(A.dl)}</button></div></div>
<script type="application/json" id="aj-cfg">${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script>
<div class="ad" aria-hidden="true"></div>
<h2>${esc(A.weekH)}</h2><div class="table-wrap"><table class="aj-wk"><tr>${A.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${days.slice(0, 7).map((d) => `<tr><td><b>${esc(d.short)}</b></td><td>${esc(d.tithi)}</td><td>${esc(d.fest.join(', '))}</td></tr>`).join('')}</table></div>
<p class="note">${esc(A.note)}</p>
<h2>${esc(A.more)}</h2><p class="chips"><a class="tag" href="${P(L, '/ekadashi/')}">🙏 Ekadashi</a> <a class="tag" href="${P(L, '/purnima/')}">🌕 Purnima</a> <a class="tag" href="${P(L, '/festivals/')}">🪔 ${esc(T.nav.festivals)}</a> <a class="tag" href="${P(L, '/surya-namaskar/')}">☀️ Surya Namaskar</a> <a class="tag" href="${P(L, '/mausam/')}">🌦️ Mausam</a></p>
</div>`,
    scripts: ['/assets/aaj.js'],
  }));
}
