/**
 * 26 January manch sanchalan / anchoring script maker (28 Nov 2026, plan §Z1): /manch-sanchalan/26-january/ (hi + en).
 * Teachers fill in school, chief guest, principal, anchors and the list of programme items; the page writes the full
 * script in Hindi or English (copy / print / WhatsApp). All wording is our own; nothing typed leaves the browser.
 * Script parts use {key} placeholders; items get rotating introduction lines (INTRO) so a long programme does not
 * repeat the same sentence.
 */
const F = {
  school: { hi: 'विद्यालय का नाम', en: 'School name' }, guest: { hi: 'मुख्य अतिथि का नाम और पद', en: 'Chief guest (name, post)' },
  principal: { hi: 'प्रधानाचार्य का नाम', en: 'Principal’s name' }, a1: { hi: 'एंकर 1 का नाम', en: 'Anchor 1 name' }, a2: { hi: 'एंकर 2 का नाम (न हो तो ख़ाली)', en: 'Anchor 2 name (leave empty if none)' },
  items: { hi: 'कार्यक्रम (हर लाइन में एक) — जैसे: कक्षा 5 — देशभक्ति समूह गान', en: 'Programme items (one per line) — e.g. Class 5 — patriotic group song' },
};
const SAMPLE = { hi: 'कक्षा 3 — देशभक्ति कविता\nकक्षा 5 — देशभक्ति समूह गान\nकक्षा 7 — भाषण: हमारा संविधान\nकक्षा 8 — नाटक: स्वतंत्रता सेनानी\nकक्षा 10 — समूह नृत्य', en: 'Class 3 — patriotic poem\nClass 5 — group song\nClass 7 — speech: Our Constitution\nClass 8 — play: freedom fighters\nClass 10 — group dance' };

const S = {
  hi: {
    open: 'सुप्रभात! आदरणीय मुख्य अतिथि {guest} जी, हमारे विद्यालय {school} के प्रधानाचार्य {principal} जी, सम्मानित शिक्षकगण, अभिभावकगण और मेरे प्यारे साथियो — आप सभी का 78वें गणतंत्र दिवस समारोह में हार्दिक स्वागत और अभिनंदन है।\n\n26 जनवरी 1950 को हमारा संविधान लागू हुआ और भारत ने अपने नियम ख़ुद तय करने का अधिकार पाया। आज का दिन उसी गर्व का उत्सव है।',
    flag: 'अब आदरणीय मुख्य अतिथि {guest} जी से निवेदन है कि वे ध्वजारोहण करें। सभी उपस्थित लोग सावधान की मुद्रा में खड़े हो जाएँ।\n\n(ध्वजारोहण)\n\nअब हम सब मिलकर राष्ट्रगान गाएँगे। (राष्ट्रगान — 52 सेकंड)\n\nकृपया अपना स्थान ग्रहण करें।',
    lamp: 'किसी भी शुभ कार्य की शुरुआत ज्ञान के प्रकाश से होती है। मुख्य अतिथि {guest} जी और प्रधानाचार्य {principal} जी से निवेदन है कि वे मंच पर आकर दीप प्रज्वलित करें।',
    welcome: 'अतिथियों के स्वागत के लिए आदरणीय प्रधानाचार्य {principal} जी से अनुरोध है कि वे मंच पर आएँ और स्वागत भाषण दें।',
    progH: 'अब शुरू होता है हमारा सांस्कृतिक कार्यक्रम।',
    after: 'तालियों से इनका उत्साह बढ़ाइए!',
    guestTalk: 'अब वह पल आ गया है जिसका हम सबको इंतज़ार था। आदरणीय मुख्य अतिथि {guest} जी से निवेदन है कि वे हमें अपने आशीर्वचन से लाभान्वित करें।',
    prize: 'अब पुरस्कार वितरण का समय है। मुख्य अतिथि जी से निवेदन है कि वे विजेता विद्यार्थियों को पुरस्कार दें।',
    thanks: 'आज के इस सफल आयोजन के लिए हम मुख्य अतिथि {guest} जी, प्रधानाचार्य {principal} जी, सभी शिक्षकों, अभिभावकों और प्यारे विद्यार्थियों का हृदय से धन्यवाद करते हैं।\n\nआइए, आज हम संकल्प लें कि अपने अधिकारों के साथ अपने कर्तव्य भी निभाएँगे और देश का नाम ऊँचा करेंगे।\n\nअंत में सब मिलकर बोलें — भारत माता की जय! जय हिंद!',
    intro: ['हमारे अगले कलाकार हैं — {item}। आइए, तालियों से इनका स्वागत करें।', 'देशभक्ति के रंग को और गहरा करने आ रहे हैं — {item}।', 'मंच पर आमंत्रित हैं — {item}। ज़ोरदार तालियाँ!', 'अब बारी है — {item} की। देखिए और आनंद लीजिए।', 'हमारे नन्हे सितारे तैयार हैं — {item}।'],
    lamp_on: 'दीप प्रज्वलन', prize_on: 'पुरस्कार वितरण', anchorTag: (n) => `[${n}]`,
  },
  en: {
    open: 'Good morning! Respected chief guest {guest}, our Principal {principal}, honoured teachers, parents and my dear friends — a very warm welcome to the 78th Republic Day celebration of {school}.\n\nOn 26 January 1950 our Constitution came into force and India began to govern itself by its own laws. Today we celebrate that pride.',
    flag: 'I now request our respected chief guest {guest} to hoist the national flag. May everyone please stand to attention.\n\n(Flag hoisting)\n\nLet us all sing the national anthem together. (National anthem — 52 seconds)\n\nPlease be seated.',
    lamp: 'Every good beginning starts with the light of knowledge. I request our chief guest {guest} and our Principal {principal} to come to the stage and light the lamp.',
    welcome: 'To welcome our guests, I request our respected Principal {principal} to come to the stage for the welcome address.',
    progH: 'Now begins our cultural programme.',
    after: 'Let’s cheer them with a big round of applause!',
    guestTalk: 'And now the moment we have all been waiting for. I request our respected chief guest {guest} to address us with a few words of blessing.',
    prize: 'It is now time for the prize distribution. We request our chief guest to give away the prizes to the winners.',
    thanks: 'For making today’s celebration a success, we heartily thank our chief guest {guest}, our Principal {principal}, all the teachers, parents and our dear students.\n\nLet us promise today to carry out our duties along with our rights, and to make our country proud.\n\nLet us all say together — Bharat Mata ki Jai! Jai Hind!',
    intro: ['Our next performers are {item}. Please welcome them with a big hand.', 'To make the colours of patriotism even brighter, here comes {item}.', 'Please welcome on stage {item}. A loud round of applause!', 'Next up is {item}. Watch and enjoy.', 'Our little stars are ready — {item}.'],
    lamp_on: 'Lamp lighting', prize_on: 'Prize distribution', anchorTag: (n) => `[${n}]`,
  },
};

const PAGE = {
  hi: { t: '26 जनवरी मंच संचालन स्क्रिप्ट (हिंदी) — नाम भरें, पूरी एंकरिंग स्क्रिप्ट तैयार | NextGrade', d: 'गणतंत्र दिवस 2027 के स्कूल कार्यक्रम के लिए मंच संचालन (एंकरिंग) स्क्रिप्ट: विद्यालय, मुख्य अतिथि, प्रधानाचार्य और कार्यक्रमों की सूची भरें — स्वागत से धन्यवाद तक पूरी स्क्रिप्ट हिंदी या अंग्रेज़ी में, कॉपी और प्रिंट।', h1: '🎙️ 26 जनवरी मंच संचालन (एंकरिंग) स्क्रिप्ट', lead: 'नीचे विद्यालय, मुख्य अतिथि, प्रधानाचार्य, एंकर और कार्यक्रमों की सूची भरें — ध्वजारोहण, राष्ट्रगान, स्वागत, हर प्रस्तुति की घोषणा और धन्यवाद ज्ञापन वाली पूरी स्क्रिप्ट तैयार हो जाएगी।',
    form: 'जानकारी भरें', lang: 'स्क्रिप्ट की भाषा', out: 'आपकी स्क्रिप्ट', copy: '📋 कॉपी करें', print: '🖨️ प्रिंट', wa: '📤 WhatsApp', copied: 'कॉपी हो गया!', blank: '______', privacy: '🔒 आपकी भरी जानकारी इसी पेज में रहती है — कहीं भेजी या सेव नहीं होती।',
    aboutH: 'मंच संचालन कैसे करें', about: ['मंच संचालक (एंकर) पूरे कार्यक्रम की कड़ी होता है — वह मेहमानों का स्वागत करता है, हर प्रस्तुति को सम्मान से बुलाता है और कार्यक्रम को समय पर आगे बढ़ाता है। 26 जनवरी के कार्यक्रम का आम क्रम है: स्वागत, ध्वजारोहण और राष्ट्रगान, दीप प्रज्वलन, स्वागत भाषण, सांस्कृतिक कार्यक्रम, मुख्य अतिथि का संबोधन, पुरस्कार वितरण और धन्यवाद ज्ञापन।', 'यह स्क्रिप्ट उसी क्रम में बनती है। दो एंकर हों तो हिस्से अपने-आप बारी-बारी बँट जाते हैं, जिससे दोनों को बराबर मौक़ा मिलता है। हर प्रस्तुति के लिए अलग-अलग परिचय पंक्तियाँ आती हैं, ताकि लंबी सूची में एक ही वाक्य बार-बार न दोहराया जाए।', 'स्क्रिप्ट को कार्यक्रम से एक दिन पहले कम से कम दो बार ज़ोर से पढ़कर अभ्यास करें। नाम और पद (जैसे "ज़िलाधिकारी", "प्रधानाचार्या") सही उच्चारण के साथ लिखें — मंच पर गलत नाम सबसे ज़्यादा खटकता है।'],
    tipsH: 'एंकरिंग के टिप्स', tips: ['माइक से हाथ भर की दूरी रखें और धीरे, साफ़ बोलें।', 'हर प्रस्तुति के बाद ताली के लिए एक पल रुकें, फिर अगली घोषणा करें।', 'प्रस्तुति करने वाले बच्चों को पहले से मंच के पास बैठाएँ, ताकि बीच में ख़ाली समय न जाए।', 'राष्ट्रगान के समय कोई घोषणा न करें; पहले ही सबको खड़े होने को कहें।', 'स्क्रिप्ट का प्रिंट बड़े अक्षरों में निकालें और पन्नों पर नंबर डालें।'],
    faqH: 'अक्सर पूछे जाने वाले सवाल', faq: [['मंच संचालन की शुरुआत कैसे करें?', 'सबसे पहले मुख्य अतिथि, प्रधानाचार्य, शिक्षकों, अभिभावकों और विद्यार्थियों को संबोधित करके स्वागत करें, फिर दिन का महत्व एक-दो पंक्तियों में बताएँ।'], ['26 जनवरी कार्यक्रम का क्रम क्या होता है?', 'स्वागत → ध्वजारोहण और राष्ट्रगान → दीप प्रज्वलन → स्वागत भाषण → सांस्कृतिक कार्यक्रम → मुख्य अतिथि का संबोधन → पुरस्कार वितरण → धन्यवाद ज्ञापन और जय हिंद।'], ['दो एंकर हों तो क्या करें?', 'दूसरे एंकर का नाम भरें — स्क्रिप्ट के हिस्से अपने-आप बारी-बारी दोनों के नाम से बँट जाएँगे।'], ['क्या मैं स्क्रिप्ट बदल सकता हूँ?', 'हाँ, कॉपी करके अपने हिसाब से शब्द बदलें; कार्यक्रमों की सूची में जितनी लाइनें लिखेंगे, उतनी घोषणाएँ बनेंगी।']] },
  en: { t: 'Republic Day Anchoring Script 2027 — Fill In Names, Full Script Ready | NextGrade', d: 'Anchoring script for the 26 January school programme: enter the school, chief guest, principal and programme items — get the full script from welcome to vote of thanks in English or Hindi, ready to copy and print.', h1: '🎙️ Republic Day (26 January) anchoring script', lead: 'Enter the school, chief guest, principal, anchors and the list of items below — a complete script with flag hoisting, national anthem, welcome, an introduction for every item and the vote of thanks is written for you.',
    form: 'Fill in the details', lang: 'Script language', out: 'Your script', copy: '📋 Copy', print: '🖨️ Print', wa: '📤 WhatsApp', copied: 'Copied!', blank: '______', privacy: '🔒 What you type stays in this page — nothing is sent or saved.',
    aboutH: 'How to anchor a school programme', about: ['The anchor holds the whole programme together — welcoming the guests, calling every performance with respect and keeping the event on time. A typical 26 January order is: welcome, flag hoisting and national anthem, lamp lighting, welcome address, cultural programme, chief guest’s address, prize distribution and vote of thanks.', 'This script follows that order. With two anchors, the parts are shared turn by turn so both get an equal chance. Each performance gets a different introduction line, so a long list does not repeat the same sentence.', 'Read the script aloud at least twice the day before. Write names and titles (such as “District Magistrate”) exactly as they should be said — a wrong name on stage is what people notice most.'],
    tipsH: 'Anchoring tips', tips: ['Hold the mic about a hand’s width away and speak slowly and clearly.', 'Pause for applause after each item before the next announcement.', 'Seat the next performers near the stage in advance so there is no dead time.', 'Make no announcement during the national anthem; ask everyone to stand before it starts.', 'Print the script in large type and number the pages.'],
    faqH: 'Frequently asked questions', faq: [['How do I start the anchoring?', 'Address the chief guest, principal, teachers, parents and students, welcome them, then say in a line or two why the day matters.'], ['What is the order of a 26 January programme?', 'Welcome → flag hoisting and anthem → lamp lighting → welcome address → cultural programme → chief guest’s address → prizes → vote of thanks and Jai Hind.'], ['What if there are two anchors?', 'Enter the second anchor’s name — the parts are shared between both names automatically.'], ['Can I change the script?', 'Yes — copy it and edit the words; every line you write in the programme list becomes one announcement.']] },
};

const CSS = '<style>.ms-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.ms-g label{display:flex;flex-direction:column;font-size:.9rem;font-weight:600;gap:4px}.ms-g input,.ms-g textarea{font:inherit;padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--text)}.ms-g .wide{grid-column:1/-1}.ms-out{white-space:pre-wrap;font-size:1.02rem;line-height:1.75;border:1px solid var(--line);border-radius:14px;padding:16px;background:var(--surface);color:var(--text)}.ms-bar{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:10px 0}.ms-bar label{display:inline-flex;gap:6px;align-items:center}@media print{body *{visibility:hidden}#ms-out,#ms-out *{visibility:visible}#ms-out{position:absolute;left:0;top:0;width:100%;border:0}}</style>';

export function buildManch(L, { page, write, P, esc, T, breadcrumbLd, LANGS }) {
  const code = L.code, U = PAGE[code]; if (!U) return;
  const langs = LANGS.filter((l) => PAGE[l.code]), path = '/manch-sanchalan/26-january/';
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: U.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const inputs = Object.keys(F).map((k) => `<label${k === 'items' ? ' class="wide"' : ''}>${esc(F[k][code])}${k === 'items' ? `<textarea rows="6" data-k="items">${esc(SAMPLE[code])}</textarea>` : `<input type="text" data-k="${k}" autocomplete="off">`}</label>`).join('');
  const js = `<script>(function(){var S=${JSON.stringify(Object.fromEntries(Object.entries(S).map(([k, v]) => [k, { ...v, anchorTag: undefined }]))).replace(/</g, '\\u003c')},BL=${JSON.stringify(U.blank)},CP=${JSON.stringify(U.copied)},ll='${code}',f=document.getElementById('ms-f'),out=document.getElementById('ms-out');
function render(){var v={};[].forEach.call(f.querySelectorAll('[data-k]'),function(el){v[el.dataset.k]=el.value.trim();});var s=S[ll],fill=function(t){return t.replace(/\\{(\\w+)\\}/g,function(m,k){return v[k]||BL;});};
var A=[v.a1,v.a2].filter(Boolean),n=0,who=function(){if(A.length<2)return '';var x='['+A[n%2]+']\\n';n++;return x;};
var parts=[s.open,s.flag];if(document.getElementById('ms-lamp').checked)parts.push(s.lamp);parts.push(s.welcome);
var items=(v.items||'').split('\\n').map(function(x){return x.trim();}).filter(Boolean),prog=s.progH;
items.forEach(function(it,i){prog+='\\n\\n'+(i+1)+'. '+s.intro[i%s.intro.length].replace('{item}',it)+'\\n('+it+')\\n'+s.after;});parts.push(prog);parts.push(s.guestTalk);
if(document.getElementById('ms-prize').checked)parts.push(s.prize);parts.push(s.thanks);
out.textContent=parts.map(function(p){return who()+fill(p);}).join('\\n\\n— — —\\n\\n');}
f.addEventListener('input',render);[].forEach.call(document.querySelectorAll('[data-ll]'),function(b){b.addEventListener('click',function(){ll=b.dataset.ll;[].forEach.call(document.querySelectorAll('[data-ll]'),function(x){x.classList.toggle('btn-primary',x===b);x.classList.toggle('btn-ghost',x!==b);});render();});});
['ms-lamp','ms-prize'].forEach(function(id){document.getElementById(id).addEventListener('change',render);});
document.getElementById('ms-copy').onclick=function(){var t=out.textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){alert(CP);},function(){var r=document.createRange();r.selectNodeContents(out);var g=getSelection();g.removeAllRanges();g.addRange(r);document.execCommand('copy');alert(CP);});};
document.getElementById('ms-wa').onclick=function(){location.href='https://wa.me/?text='+encodeURIComponent(out.textContent);};render();})();</script>`;
  // what crawlers and no-JS readers see: the script with the sample programme and blanks for names
  const s0 = S[code];
  const sample = [s0.open, s0.flag, s0.lamp, s0.welcome, s0.progH + SAMPLE[code].split('\n').map((it, i) => `\n\n${i + 1}. ${s0.intro[i % s0.intro.length].replace('{item}', it)}\n(${it})\n${s0.after}`).join(''), s0.guestTalk, s0.prize, s0.thanks].map((p) => p.replace(/\{(\w+)\}/g, U.blank)).join('\n\n— — —\n\n');
  const links = `<p class="chips"><a class="tag" href="${P(L, '/speech/republic-day/')}">🎤 ${code === 'en' ? 'Republic Day speech' : '26 जनवरी भाषण'}</a> <a class="tag" href="${P(L, '/rashtragan/jana-gana-mana/')}">🇮🇳 ${code === 'en' ? 'Jana Gana Mana with meaning' : 'जन गण मन अर्थ सहित'}</a> <a class="tag" href="${P(L, '/festivals/republic-day/')}">📅 26 January</a> <a class="tag" href="${P(L, '/tiranga-niyam/')}">🏳️ ${code === 'en' ? 'Flag rules' : 'तिरंगे के नियम'}</a></p>`;
  write(L, path, page(L, {
    path, title: U.t, description: U.d, langs, jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.h1.replace(/^\S+\s/, ''), path]]), faqLd],
    body: `${CSS}<div class="wrap narrow article"><p class="crumbs no-print"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.h1.replace(/^\S+\s/, ''))}</p><h1>${esc(U.h1)}</h1><p class="lead">${esc(U.lead)}</p>
<h2 class="no-print">${esc(U.form)}</h2><form id="ms-f" class="ms-g no-print" onsubmit="return false">${inputs}</form>
<div class="ms-bar no-print"><label><input type="checkbox" id="ms-lamp" checked> ${esc(S[code].lamp_on)}</label><label><input type="checkbox" id="ms-prize" checked> ${esc(S[code].prize_on)}</label></div>
<p class="note no-print">${esc(U.privacy)}</p>
<div class="ms-bar no-print"><b>${esc(U.lang)}:</b> <button type="button" class="btn ${code === 'hi' ? 'btn-primary' : 'btn-ghost'}" data-ll="hi">हिंदी</button><button type="button" class="btn ${code === 'en' ? 'btn-primary' : 'btn-ghost'}" data-ll="en">English</button></div>
<h2 class="no-print">${esc(U.out)}</h2><div id="ms-out" class="ms-out">${esc(sample)}</div>
<div class="ms-bar no-print"><button type="button" class="btn btn-primary" id="ms-copy">${esc(U.copy)}</button><button type="button" class="btn btn-ghost" onclick="print()">${esc(U.print)}</button><button type="button" class="btn btn-ghost" id="ms-wa">${esc(U.wa)}</button></div>${js}
<div class="ad no-print" aria-hidden="true"></div>
<h2>${esc(U.aboutH)}</h2>${U.about.map((p) => `<p>${esc(p)}</p>`).join('')}
<h2>${esc(U.tipsH)}</h2><ul>${U.tips.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
<h2>${esc(U.faqH)}</h2>${U.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}${links}</div>`,
  }));
}
