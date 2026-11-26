/**
 * Desi naap-tol (26 Nov 2026, high-traffic plan R12 + user: "1 bhar, 1 asarfi yeh sab v"): old Indian units of weight
 * and length → grams / metres, with a converter and one page per common question ("1 tola kitne gram").
 * Values: tola = 180 grains = 11.6638 g (the standard used in India since 1956 law; jewellers still use it);
 * masha = tola/12, ratti = masha/8; seer = 80 tola, maund = 40 seer. Haath, kos, balisht vary by region — marked approx.
 */
const TOLA = 11.6638038;
// [key, grams or metres, kind 'w'|'l', approx?, { hi, en, hinglish, bn } name]
export const UNITS = [
  ['tola', TOLA, 'w', false, { hi: 'तोला', en: 'Tola', hinglish: 'Tola', bn: 'তোলা' }],
  ['bhori', TOLA, 'w', false, { hi: 'भरी (भोरी)', en: 'Bhori (Bhari)', hinglish: 'Bhari / Bhori', bn: 'ভরি' }],
  ['masha', TOLA / 12, 'w', false, { hi: 'माशा', en: 'Masha', hinglish: 'Masha', bn: 'মাশা' }],
  ['ratti', TOLA / 96, 'w', false, { hi: 'रत्ती', en: 'Ratti', hinglish: 'Ratti', bn: 'রতি' }],
  ['chhatank', (TOLA * 80) / 16, 'w', false, { hi: 'छटाँक', en: 'Chhatank', hinglish: 'Chhatank', bn: 'ছটাক' }],
  ['pav', (TOLA * 80) / 4, 'w', false, { hi: 'पाव (पुराना)', en: 'Pav (old)', hinglish: 'Pav (purana)', bn: 'পোয়া' }],
  ['seer', TOLA * 80, 'w', false, { hi: 'सेर', en: 'Seer', hinglish: 'Ser', bn: 'সের' }],
  ['maund', TOLA * 80 * 40, 'w', false, { hi: 'मन', en: 'Maund (Man)', hinglish: 'Man', bn: 'মণ' }],
  ['asharfi', TOLA, 'w', true, { hi: 'अशर्फ़ी (लगभग)', en: 'Asharfi (approx.)', hinglish: 'Asharfi (lagbhag)', bn: 'আশরফি (প্রায়)' }],
  ['gram', 1, 'w', false, { hi: 'ग्राम', en: 'Gram', hinglish: 'Gram', bn: 'গ্রাম' }],
  ['kg', 1000, 'w', false, { hi: 'किलो', en: 'Kilogram', hinglish: 'Kilo', bn: 'কেজি' }],
  ['gaj', 0.9144, 'l', false, { hi: 'गज़', en: 'Gaj (yard)', hinglish: 'Gaj', bn: 'গজ' }],
  ['haath', 0.4572, 'l', true, { hi: 'हाथ (लगभग)', en: 'Haath (approx.)', hinglish: 'Haath (lagbhag)', bn: 'হাত (প্রায়)' }],
  ['balisht', 0.2286, 'l', true, { hi: 'बालिश्त/बित्ता (लगभग)', en: 'Balisht / span (approx.)', hinglish: 'Balisht / bitta (lagbhag)', bn: 'বিঘত (প্রায়)' }],
  ['kos', 3200, 'l', true, { hi: 'कोस (लगभग)', en: 'Kos (approx.)', hinglish: 'Kos (lagbhag)', bn: 'ক্রোশ (প্রায়)' }],
  ['feet', 0.3048, 'l', false, { hi: 'फ़ुट', en: 'Feet', hinglish: 'Feet', bn: 'ফুট' }],
  ['inch', 0.0254, 'l', false, { hi: 'इंच', en: 'Inch', hinglish: 'Inch', bn: 'ইঞ্চি' }],
  ['metre', 1, 'l', false, { hi: 'मीटर', en: 'Metre', hinglish: 'Meter', bn: 'মিটার' }],
  ['km', 1000, 'l', false, { hi: 'किलोमीटर', en: 'Kilometre', hinglish: 'Kilometer', bn: 'কিলোমিটার' }],
];
const U = Object.fromEntries(UNITS.map((u) => [u[0], u]));
// question pages: [from, amount, to]
export const QUESTIONS = [['tola', 1, 'gram'], ['bhori', 1, 'gram'], ['asharfi', 1, 'gram'], ['masha', 1, 'gram'], ['ratti', 1, 'gram'], ['tola', 1, 'masha'], ['masha', 1, 'ratti'], ['gram', 10, 'tola'], ['gram', 1, 'ratti'], ['kg', 1, 'tola'], ['chhatank', 1, 'gram'], ['pav', 1, 'gram'], ['seer', 1, 'kg'], ['maund', 1, 'kg'], ['gaj', 1, 'feet'], ['gaj', 1, 'metre'], ['haath', 1, 'feet'], ['haath', 1, 'inch'], ['balisht', 1, 'inch'], ['kos', 1, 'km']];
const slugQ = ([f, a, t]) => `${a}-${f}-in-${t}`;
const conv = (a, f, t) => (a * U[f][1]) / U[t][1];
const round = (x) => (x >= 100 ? Math.round(x * 10) / 10 : x >= 1 ? Math.round(x * 1000) / 1000 : Math.round(x * 10000) / 10000);

const NOTE = {
  tola: { hi: 'तोला सोने-चाँदी की पुरानी और आज भी चलने वाली इकाई है। 1 तोला = 180 ग्रेन = 11.6638 ग्राम। कई सुनार आसानी के लिए 10 ग्राम को भी "1 तोला" कह देते हैं — बिल हमेशा ग्राम में लें।', en: 'The tola is the old Indian unit for gold and silver that jewellers still use. 1 tola = 180 grains = 11.6638 g. Some jewellers loosely call 10 g "one tola" — always ask for the bill in grams.', hinglish: 'Tola sone-chaandi ki purani aur aaj bhi chalne wali unit hai. 1 tola = 180 grain = 11.6638 gram. Kai sunaar aasaani ke liye 10 gram ko bhi "1 tola" keh dete hain — bill hamesha gram mein lein.', bn: 'তোলা সোনা-রুপোর পুরনো একক, আজও স্যাকরারা ব্যবহার করেন। ১ তোলা = ১৮০ গ্রেন = ১১.৬৬৩৮ গ্রাম। কেউ কেউ ১০ গ্রামকেও "১ তোলা" বলেন — বিল সবসময় গ্রামে নিন।' },
  bhori: { hi: 'बंगाल, असम और ओडिशा में सोना "भरी/भोरी" में बिकता है। 1 भरी = 1 तोला = 11.66 ग्राम। आजकल कई दुकानें "भरी" के नाम पर 10 ग्राम भी तौलती हैं — ग्राम में पूछकर ख़रीदें।', en: 'In Bengal, Assam and Odisha gold is sold in "bhori". 1 bhori = 1 tola = 11.66 g. Some shops now use "bhori" for 10 g — ask the weight in grams.', hinglish: 'Bengal, Assam aur Odisha mein sona "bhari/bhori" mein bikta hai. 1 bhori = 1 tola = 11.66 gram. Aajkal kai dukaanein "bhori" ke naam par 10 gram bhi taulti hain — gram mein poochh kar khareedein.', bn: 'পশ্চিমবঙ্গ, আসাম আর ওড়িশায় সোনা "ভরি"-তে বিক্রি হয়। ১ ভরি = ১ তোলা = ১১.৬৬ গ্রাম। এখন অনেক দোকান "ভরি" বলতে ১০ গ্রামও বোঝায় — গ্রামে জেনে কিনুন।' },
  asharfi: { hi: 'अशर्फ़ी सोने का पुराना सिक्का था; उसका वज़न एक तय नाप नहीं — अलग-अलग समय और राज्यों में अलग रहा। आम बोलचाल में अशर्फ़ी को लगभग 1 तोला (करीब 11–11.7 ग्राम) माना जाता है। आज जो "अशर्फ़ी" सिक्के बिकते हैं, उनका वज़न दुकान के हिसाब से अलग होता है — हमेशा ग्राम और कैरेट पूछें।', en: 'The asharfi was an old gold coin; its weight was never fixed — it varied by period and kingdom. In everyday talk an asharfi is taken as roughly 1 tola (about 11–11.7 g). Today’s "asharfi" coins vary by seller — always ask the grams and carat.', hinglish: 'Asharfi sone ka purana sikka tha; uska wazan ek tay naap nahi — alag-alag samay aur rajyon mein alag raha. Aam bolchaal mein asharfi ko lagbhag 1 tola (kareeb 11–11.7 gram) maana jaata hai. Aaj jo "asharfi" sikke bikte hain, unka wazan dukaan ke hisaab se alag hota hai — hamesha gram aur carat poochhein.', bn: 'আশরফি ছিল সোনার পুরনো মুদ্রা; তার ওজন কখনও নির্দিষ্ট ছিল না — সময় আর রাজ্য অনুযায়ী আলাদা। চলতি কথায় আশরফি প্রায় ১ তোলা (মোটামুটি ১১–১১.৭ গ্রাম) ধরা হয়। আজকের "আশরফি" কয়েনের ওজন দোকান অনুযায়ী আলাদা — গ্রাম আর ক্যারেট জেনে নিন।' },
  pav: { hi: 'पुराने हिसाब से 1 पाव = ¼ सेर ≈ 233 ग्राम; आज बाज़ार में "पाव" आम तौर पर 250 ग्राम (¼ किलो) होता है।', en: 'In the old system 1 pav = ¼ seer ≈ 233 g; in today’s markets a "pav" usually means 250 g (¼ kg).', hinglish: 'Purane hisaab se 1 pav = ¼ ser ≈ 233 gram; aaj bazaar mein "pav" aamtaur par 250 gram (¼ kilo) hota hai.', bn: 'পুরনো হিসেবে ১ পোয়া = ¼ সের ≈ ২৩৩ গ্রাম; আজকের বাজারে "পোয়া" সাধারণত ২৫০ গ্রাম (¼ কেজি)।' },
  haath: { hi: 'हाथ (कोहनी से उँगली के सिरे तक) आम तौर पर 18 इंच (1.5 फ़ुट) माना जाता है; असल में हर इलाक़े और हर आदमी के हिसाब से थोड़ा अलग होता है।', en: 'A haath (elbow to fingertip) is usually taken as 18 inches (1.5 ft); in practice it varies by region and person.', hinglish: 'Haath (kohni se ungli ke sire tak) aamtaur par 18 inch (1.5 feet) maana jaata hai; asal mein har ilaake aur har aadmi ke hisaab se thoda alag hota hai.', bn: 'হাত (কনুই থেকে আঙুলের ডগা) সাধারণত ১৮ ইঞ্চি (১.৫ ফুট) ধরা হয়; আসলে জায়গা আর মানুষ অনুযায়ী একটু আলাদা।' },
  kos: { hi: 'कोस दूरी की पुरानी इकाई है — अलग-अलग इलाक़ों में 2 से 3.2 किलोमीटर तक माना गया। यहाँ आम हिसाब 1 कोस ≈ 3.2 किमी लिया है।', en: 'The kos is an old unit of distance — taken as anywhere from 2 to 3.2 km in different regions. We use the common value 1 kos ≈ 3.2 km.', hinglish: 'Kos doori ki purani unit hai — alag-alag ilaakon mein 2 se 3.2 km tak maana gaya. Yahan aam hisaab 1 kos ≈ 3.2 km liya hai.', bn: 'ক্রোশ দূরত্বের পুরনো একক — জায়গা অনুযায়ী ২ থেকে ৩.২ কিমি ধরা হত। এখানে সাধারণ হিসাব ১ ক্রোশ ≈ ৩.২ কিমি।' },
};
const TX = {
  hi: { nav: 'देसी नाप-तोल', hubTitle: 'देसी नाप-तोल कन्वर्टर — तोला, भरी, रत्ती, माशा, सेर, मन, गज़, हाथ को ग्राम/मीटर में बदलें | NextGrade', hubDesc: '1 तोला कितने ग्राम, 1 भरी कितने ग्राम, रत्ती-माशा, सेर-मन, गज़-हाथ, कोस — पुराने भारतीय नाप-तोल को ग्राम, किलो, फ़ुट, मीटर में बदलें। तालिका और कन्वर्टर के साथ।', hubH1: '⚖️ देसी नाप-तोल — तोला, भरी, रत्ती, गज़, हाथ', hubLead: 'दादी-नानी के ज़माने के नाप-तोल आज भी सुनार, दर्ज़ी और गाँव में चलते हैं। यहाँ इन्हें आज के ग्राम, किलो, फ़ुट और मीटर में बदलिए।', amt: 'मात्रा', from: 'से', to: 'में', weightH: 'वज़न (सोना-चाँदी, अनाज)', lengthH: 'लंबाई और दूरी', qH: 'आम सवाल', title: (a, f, t, v) => `${a} ${f} कितने ${t} होते हैं? = ${v} ${t} | NextGrade`, desc: (a, f, t, v) => `${a} ${f} = ${v} ${t}। ${f} से ${t} की पूरी तालिका, कन्वर्टर और ज़रूरी बातें।`, h1: (a, f, t) => `${a} ${f} कितने ${t}?`, ans: (a, f, t, v) => `${a} ${f} = ${v} ${t}`, tableH: (f, t) => `${f} से ${t} — तालिका`, approx: 'लगभग', landP: 'ज़मीन (बीघा, कट्ठा, डिसमिल, एकड़) के लिए हमारा ज़मीन कन्वर्टर देखें →', note: 'ये मानक/आम तौर पर माने जाने वाले मान हैं; सोना ख़रीदते-बेचते समय वज़न हमेशा ग्राम में और बिल के साथ लें।' },
  hinglish: { nav: 'Desi naap-tol', hubTitle: 'Desi Naap-Tol Converter — Tola, Bhari, Ratti, Masha, Ser, Man, Gaj, Haath ko Gram/Meter mein | NextGrade', hubDesc: '1 tola kitne gram, 1 bhari kitne gram, ratti-masha, ser-man, gaj-haath, kos — purane Indian naap-tol ko gram, kilo, feet, meter mein badlein. Table aur converter ke saath.', hubH1: '⚖️ Desi naap-tol — tola, bhari, ratti, gaj, haath', hubLead: 'Daadi-naani ke zamaane ke naap-tol aaj bhi sunaar, darzi aur gaon mein chalte hain. Yahan inhe aaj ke gram, kilo, feet aur meter mein badliye.', amt: 'Matra', from: 'Se', to: 'Mein', weightH: 'Wazan (sona-chaandi, anaaj)', lengthH: 'Lambaai aur doori', qH: 'Aam sawaal', title: (a, f, t, v) => `${a} ${f} Kitne ${t} Hote Hain? = ${v} ${t} | NextGrade`, desc: (a, f, t, v) => `${a} ${f} = ${v} ${t}. ${f} se ${t} ki poori table, converter aur zaroori baatein.`, h1: (a, f, t) => `${a} ${f} kitne ${t}?`, ans: (a, f, t, v) => `${a} ${f} = ${v} ${t}`, tableH: (f, t) => `${f} se ${t} — table`, approx: 'lagbhag', landP: 'Zameen (bigha, kattha, decimal, acre) ke liye hamara land converter dekhein →', note: 'Yeh maanak/aamtaur par maane jaane wale maan hain; sona khareedte-bechte samay wazan hamesha gram mein aur bill ke saath lein.' },
  en: { nav: 'Desi units', hubTitle: 'Indian Traditional Units Converter — Tola, Bhori, Ratti, Masha, Seer, Maund, Gaj, Haath to Grams/Metres | NextGrade', hubDesc: 'How many grams in 1 tola or 1 bhori, ratti and masha, seer and maund, gaj and haath, kos — convert old Indian units of weight and length to grams, kg, feet and metres.', hubH1: '⚖️ Indian traditional units — tola, bhori, ratti, gaj, haath', hubLead: 'The old units from our grandparents’ time are still used by jewellers, tailors and in villages. Convert them to today’s grams, kilograms, feet and metres here.', amt: 'Amount', from: 'From', to: 'To', weightH: 'Weight (gold, silver, grain)', lengthH: 'Length and distance', qH: 'Common questions', title: (a, f, t, v) => `${a} ${f} in ${t} — ${a} ${f} = ${v} ${t} | NextGrade`, desc: (a, f, t, v) => `${a} ${f} = ${v} ${t}. Full ${f} to ${t} table, converter and what to keep in mind.`, h1: (a, f, t) => `How many ${t} in ${a} ${f}?`, ans: (a, f, t, v) => `${a} ${f} = ${v} ${t}`, tableH: (f, t) => `${f} to ${t} table`, approx: 'approx.', landP: 'For land (bigha, katha, decimal, acre) see our land converter →', note: 'These are the standard / commonly used values; when buying or selling gold, always get the weight in grams on a bill.' },
  bn: { nav: 'দেশি মাপ-ওজন', hubTitle: 'দেশি মাপ-ওজন কনভার্টার — তোলা, ভরি, রতি, মাশা, সের, মণ, গজ, হাত থেকে গ্রাম/মিটার | NextGrade', hubDesc: '১ ভরি কত গ্রাম, ১ তোলা কত গ্রাম, রতি-মাশা, সের-মণ, গজ-হাত, ক্রোশ — পুরনো ভারতীয় মাপ-ওজন গ্রাম, কেজি, ফুট, মিটারে।', hubH1: '⚖️ দেশি মাপ-ওজন — তোলা, ভরি, রতি, গজ, হাত', hubLead: 'দাদু-দিদিমার আমলের মাপ-ওজন আজও স্যাকরা, দর্জি আর গ্রামে চলে। এখানে সেগুলো আজকের গ্রাম, কেজি, ফুট আর মিটারে বদলান।', amt: 'পরিমাণ', from: 'থেকে', to: 'তে', weightH: 'ওজন (সোনা-রুপো, শস্য)', lengthH: 'দৈর্ঘ্য আর দূরত্ব', qH: 'সাধারণ প্রশ্ন', title: (a, f, t, v) => `${a} ${f} কত ${t}? = ${v} ${t} | NextGrade`, desc: (a, f, t, v) => `${a} ${f} = ${v} ${t}। ${f} থেকে ${t}-এর পুরো তালিকা, কনভার্টার আর জরুরি কথা।`, h1: (a, f, t) => `${a} ${f} কত ${t}?`, ans: (a, f, t, v) => `${a} ${f} = ${v} ${t}`, tableH: (f, t) => `${f} থেকে ${t} — তালিকা`, approx: 'প্রায়', landP: 'জমির (বিঘা, কাঠা, ডেসিমাল, একর) জন্য আমাদের জমি কনভার্টার দেখুন →', note: 'এগুলো প্রচলিত/মানক মান; সোনা কেনাবেচায় ওজন সবসময় গ্রামে আর বিলসহ নিন।' },
};
export const DN_NAV = Object.fromEntries(Object.entries(TX).map(([k, v]) => [k, v.nav]));

export function buildDesiNaap(L, { page, write, P, esc, T, breadcrumbLd }) {
  const code = L.code, X = TX[code], hub = '/desi-naap/';
  const nm = (k) => U[k][4][code].replace(/ \((लगभग|approx\.|lagbhag|প্রায়)\)$/, '');
  const fmtN = (x) => new Intl.NumberFormat(code === 'bn' ? 'bn-IN' : 'en-IN', { maximumFractionDigits: 4 }).format(x);
  const css = '<style>.dn-ans{font-size:26px;font-weight:800;padding:16px 18px;border-radius:16px;background:linear-gradient(135deg,#fff9db,#fff4e6);border:1px solid var(--line);margin:12px 0}.dn-t{width:100%;border-collapse:collapse}.dn-t td,.dn-t th{padding:8px 10px;border-bottom:1px solid var(--line);text-align:left}.dn-c{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:10px 0}.dn-c input,.dn-c select{padding:10px;border-radius:10px;border:1px solid var(--line);font:inherit;background:var(--surface);color:var(--text)}.dn-c input{width:120px}#dn-out{font-size:22px;font-weight:800;margin:8px 0}</style>';
  const units = UNITS.map(([k, v, kind, ap, n]) => [k, v, kind, n[code]]);
  const widget = (f = 'tola', t = 'gram') => `<div class="dn-c"><input id="dn-a" type="number" step="any" value="1" aria-label="${esc(X.amt)}"><select id="dn-f" aria-label="${esc(X.from)}">${units.map(([k, , , n]) => `<option value="${k}"${k === f ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select> → <select id="dn-t" aria-label="${esc(X.to)}">${units.map(([k, , , n]) => `<option value="${k}"${k === t ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select></div><div id="dn-out"></div><script type="application/json" id="dn-cfg">${JSON.stringify({ units: units.map(([k, v, kind]) => [k, v, kind]), names: Object.fromEntries(units.map(([k, , , n]) => [k, n])), loc: code === 'bn' ? 'bn-IN' : 'en-IN' })}</script>`;
  const qLinks = QUESTIONS.map((q) => `<a class="tag" href="${P(L, `${hub}${slugQ(q)}/`)}">${esc(`${q[1]} ${nm(q[0])} → ${nm(q[2])}`)}</a>`).join(' ');
  const rows = (kind) => `<table class="dn-t">${UNITS.filter((u) => u[2] === kind && !['gram', 'kg', 'feet', 'inch', 'metre', 'km'].includes(u[0])).map(([k, v, , ap]) => `<tr><td><b>1 ${esc(nm(k))}</b></td><td>${ap ? esc(X.approx) + ' ' : ''}${kind === 'w' ? `${fmtN(round(v))} g` : v >= 1000 ? `${fmtN(v / 1000)} km` : `${fmtN(round(v / 0.3048))} ft (${fmtN(round(v))} m)`}</td></tr>`).join('')}</table>`;
  write(L, hub, page(L, {
    path: hub, title: X.hubTitle, description: X.hubDesc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub]])],
    body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(X.nav)}</p>
<h1>${esc(X.hubH1)}</h1><p class="lead">${esc(X.hubLead)}</p>${widget()}
<h2>${esc(X.weightH)}</h2>${rows('w')}<h2>${esc(X.lengthH)}</h2>${rows('l')}
<p><a href="/tools/land-converter/?lang=${L.game}">${esc(X.landP)}</a></p>
<div class="ad" aria-hidden="true"></div><h2>${esc(X.qH)}</h2><p class="chips">${qLinks}</p><p class="note">${esc(X.note)}</p></div>`,
    scripts: ['/assets/desi-naap.js'],
  }));
  for (const q of QUESTIONS) {
    const [f, a, t] = q, path = `${hub}${slugQ(q)}/`, v = fmtN(round(conv(a, f, t))), F = nm(f), Tn = nm(t), ap = U[f][3] || U[t][3];
    const mult = [0.25, 0.5, 1, 2, 3, 5, 10, 20, 50, 100];
    const faq = [[X.h1(a, F, Tn), `${ap ? X.approx + ' ' : ''}${X.ans(a, F, Tn, v)}.`], ...(NOTE[f] ? [[`${F}?`, NOTE[f][code]]] : [])];
    write(L, path, page(L, {
      path, title: X.title(a, F, Tn, (ap ? '~' : '') + v), description: X.desc(a, F, Tn, (ap ? '~' : '') + v),
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [X.nav, hub], [X.h1(a, F, Tn), path]]), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([qq, aa]) => ({ '@type': 'Question', name: qq, acceptedAnswer: { '@type': 'Answer', text: aa } })) }],
      body: `${css}<div class="wrap narrow article"><p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(X.nav)}</a> › ${esc(`${a} ${F}`)}</p>
<h1>⚖️ ${esc(X.h1(a, F, Tn))}</h1>
<p class="dn-ans">${ap ? `<small>${esc(X.approx)}</small> ` : ''}${esc(X.ans(a, F, Tn, v))}</p>
${NOTE[f] ? `<p>${esc(NOTE[f][code])}</p>` : NOTE[t] ? `<p>${esc(NOTE[t][code])}</p>` : ''}
<h2>${esc(X.tableH(F, Tn))}</h2><table class="dn-t">${mult.map((m) => `<tr><td>${fmtN(m)} ${esc(F)}</td><td><b>${fmtN(round(conv(m, f, t)))} ${esc(Tn)}</b></td></tr>`).join('')}</table>
<div class="ad" aria-hidden="true"></div>
${widget(f, t)}
<h2>${esc(X.qH)}</h2><p class="chips">${qLinks}</p>
<p class="note">${esc(X.note)}</p></div>`,
      scripts: ['/assets/desi-naap.js'],
    }));
  }
}
