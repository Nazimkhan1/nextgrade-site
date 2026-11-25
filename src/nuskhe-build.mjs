/** Pages for src/nuskhe.mjs: /nuskhe/ (hub) and /nuskhe/<season>/. Health content: see the rules at the top of nuskhe.mjs. */
import { SEASONS, NUSKHE_UI } from './nuskhe.mjs';

export { NUSKHE_UI };
const HUB = {
  hi: { title: 'नानी-दादी के घरेलू नुस्खे — हर मौसम के आसान उपाय | NextGrade', desc: 'सर्दी, गर्मी और बारिश के आसान घरेलू नुस्खे — खाँसी-ज़ुकाम, गला, त्वचा, एड़ियाँ। हर नुस्खे के साथ सावधानी और डॉक्टर को कब दिखाएँ।', lead: 'हर मौसम के साथ घर में कुछ पुराने, आज़माए हुए उपाय याद आते हैं। यहाँ वही नुस्खे हैं — आसान, रसोई की चीज़ों से, और हर एक के साथ सावधानी।', soon: 'गर्मी और बारिश के नुस्खे जल्द आ रहे हैं।' },
  en: { title: 'Nani-Dadi Home Remedies — Simple Indian Remedies for Every Season | NextGrade', desc: 'Simple Indian home remedies for winter, summer and the monsoon — cough and cold, throat, skin, heels — each with a caution and when to see a doctor.', lead: 'Every season brings back a few old, tried remedies at home. Here they are — simple, from the kitchen, each with a caution.', soon: 'Summer and monsoon remedies are coming soon.' },
  hinglish: { title: 'Nani-Dadi ke Gharelu Nuskhe — Har Mausam ke Aasaan Upaay | NextGrade', desc: 'Sardi, garmi aur baarish ke aasaan gharelu nuskhe — khaansi-zukaam, gala, skin, edhiyan. Har nuskhe ke saath saavdhaani aur doctor ko kab dikhayein.', lead: 'Har mausam ke saath ghar mein kuch purane, aazmaaye hue upaay yaad aate hain. Yahan wahi nuskhe hain — aasaan, rasoi ki cheezon se, aur har ek ke saath saavdhaani.', soon: 'Garmi aur baarish ke nuskhe jald aa rahe hain.' },
  bn: { title: 'দিদিমা-ঠাকুমার ঘরোয়া টোটকা — প্রতি ঋতুর সহজ উপায় | NextGrade', desc: 'শীত, গরম আর বর্ষার সহজ ঘরোয়া টোটকা — সর্দি-কাশি, গলা, ত্বক, গোড়ালি — প্রতিটির সঙ্গে সতর্কতা আর কখন ডাক্তার দেখাবেন।', lead: 'প্রতি ঋতুতে ঘরে কিছু পুরনো, পরীক্ষিত উপায় মনে পড়ে। সেগুলোই এখানে — সহজ, রান্নাঘরের জিনিস দিয়ে, আর প্রতিটির সঙ্গে সতর্কতা।', soon: 'গরম আর বর্ষার টোটকা শিগগির আসছে।' },
};

export function buildNuskhe(L, { page, write, P, esc, T, breadcrumbLd, articleLd }) {
  const code = L.code, U = NUSKHE_UI[code], H = HUB[code], hub = '/nuskhe/';
  const css = '<style>.nk{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px 16px;margin:12px 0;box-shadow:var(--shadow)}.nk h3{margin:0 0 6px}.nk p{margin:4px 0;font-size:16px}.nk .av{color:#c92a2a}.nk-warn{border-left:4px solid #e8590c;background:var(--soft);padding:12px 16px;border-radius:12px}</style>';
  write(L, hub, page(L, {
    path: hub, title: H.title, description: H.desc,
    jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, hub]])],
    body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › ${esc(U.hub)}</p>
<h1>🌿 ${esc(U.hub)}</h1>
<p class="lead">${esc(H.lead)}</p>
<div class="grid">${SEASONS.map((s) => `<a class="card" href="${P(L, `${hub}${s.slug}/`)}"><span class="emoji" aria-hidden="true">${s.emoji}</span><h3>${esc(s[code].h1.replace(/^\S+\s/, ''))}</h3><p>${esc(s[code].desc)}</p></a>`).join('')}</div>
<p class="note">${esc(H.soon)}</p>
</div>`,
  }));
  for (const s of SEASONS) {
    const x = s[code], path = `${hub}${s.slug}/`;
    write(L, path, page(L, {
      path, title: x.title, description: x.desc,
      jsonLd: [breadcrumbLd(L, [[T.nav.home, '/'], [U.hub, hub], [x.h1.replace(/^\S+\s/, ''), path]]), articleLd(L, x.h1.replace(/^\S+\s/, ''), path), { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: x.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
      body: `${css}<div class="wrap narrow article">
<p class="crumbs"><a href="${P(L, '/')}">${esc(T.nav.home)}</a> › <a href="${P(L, hub)}">${esc(U.hub)}</a> › ${esc(x.h1.replace(/^\S+\s/, ''))}</p>
<h1>${esc(x.h1)}</h1>
<p class="lead">${esc(x.lead)}</p>
<p class="nk-warn">⚠️ ${esc(x.disclaimer)}</p>
${x.items.map((it, i) => `<div class="nk"><h3>${i + 1}. ${esc(it.h)}</h3><p><b>${esc(x.need)}:</b> ${esc(it.need)}</p><p><b>${esc(x.how)}:</b> ${esc(it.how)}</p><p class="av"><b>⚠️ ${esc(x.avoid)}:</b> ${esc(it.avoid)}</p></div>${i === 3 || i === 8 ? '<div class="ad" aria-hidden="true"></div>' : ''}`).join('\n')}
<h2>${esc(x.homeH)}</h2><ul>${x.home.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(x.doctorH)}</h2><ul>${x.doctor.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>${esc(T.festival.faqH)}</h2>
${x.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n')}
<p class="note">${esc(x.disclaimer)}</p>
<p><a href="${P(L, '/mausam/')}">🌦️ ${esc({ hi: 'आज का मौसम देखें', en: 'Check today’s weather', hinglish: 'Aaj ka mausam dekhein', bn: 'আজকের আবহাওয়া দেখুন' }[code])} →</a></p>
</div>`,
    }));
  }
}
