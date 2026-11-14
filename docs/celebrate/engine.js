/*
 * Shared engine for the animated name wishes under /celebrate/<slug>/.
 * A page sets window.CELEBRATE = { base, key, top, gateEmoji, partner, voice, T: {lang: {...}}, scene: {resize, draw} }
 * and loads this file. The engine draws the page, the envelope, the message, the "make your own" form,
 * WhatsApp sharing and reading the message aloud with the phone's own voice.
 * Names and messages live only in the link; nothing is stored on a server.
 */
(() => {
  const C = window.CELEBRATE;
  const LANGS = ['hinglish', 'hi', 'en', 'bn'];
  const PREFIX = { hi: '', en: '/en', hinglish: '/hinglish', bn: '/bn' };
  const VOICE = Object.assign({ hinglish: 'en-IN', hi: 'hi-IN', en: 'en-IN', bn: 'bn-IN' }, C.voice || {});
  const U = {
    hinglish: { tap: '👆 Tap karke kholo', replay: '🔁 Phir se dekho', listen: '🗣️ Suno', stop: '⏹ Roko', makeOwn: '✨ Apna bhejo', msgLabel: 'Message chuno', customLabel: '✍️ Ya apne shabdon mein likho (optional — ye awaaz mein bhi padha jayega)', partnerLabel: 'Saath mein kiska naam (optional)', sendWa: '📲 WhatsApp pe bhejo', preview: '👀 Pehle dekho', copyLink: '🔗 Link copy', copied: '✅ Link copy ho gaya', needName: 'Pehle naam likho', privacy: 'Naam aur message sirf link mein rehte hain, kahin save nahi hote.' },
    hi: { tap: '👆 टैप करके खोलो', replay: '🔁 फिर से देखो', listen: '🗣️ सुनो', stop: '⏹ रोको', makeOwn: '✨ अपना भेजो', msgLabel: 'संदेश चुनो', customLabel: '✍️ या अपने शब्दों में लिखो (वैकल्पिक — यह आवाज़ में भी पढ़ा जाएगा)', partnerLabel: 'साथ में किसका नाम (वैकल्पिक)', sendWa: '📲 WhatsApp पर भेजो', preview: '👀 पहले देखो', copyLink: '🔗 लिंक कॉपी', copied: '✅ लिंक कॉपी हो गया', needName: 'पहले नाम लिखो', privacy: 'नाम और संदेश सिर्फ़ लिंक में रहते हैं, कहीं सेव नहीं होते।' },
    en: { tap: '👆 Tap to open', replay: '🔁 Watch again', listen: '🗣️ Listen', stop: '⏹ Stop', makeOwn: '✨ Send your own', msgLabel: 'Pick a message', customLabel: '✍️ Or write your own words (optional — they will be read aloud too)', partnerLabel: 'Name with them (optional)', sendWa: '📲 Send on WhatsApp', preview: '👀 Preview', copyLink: '🔗 Copy link', copied: '✅ Link copied', needName: 'Type a name first', privacy: 'Names and messages stay only in the link — nothing is saved.' },
    bn: { tap: '👆 ট্যাপ করে খোলো', replay: '🔁 আবার দেখো', listen: '🗣️ শোনো', stop: '⏹ থামাও', makeOwn: '✨ নিজেরটা পাঠাও', msgLabel: 'বার্তা বাছো', customLabel: '✍️ অথবা নিজের ভাষায় লেখো (ঐচ্ছিক — এটাও পড়ে শোনানো হবে)', partnerLabel: 'সঙ্গে কার নাম (ঐচ্ছিক)', sendWa: '📲 WhatsApp-এ পাঠাও', preview: '👀 আগে দেখো', copyLink: '🔗 লিংক কপি', copied: '✅ লিংক কপি হয়েছে', needName: 'আগে নাম লেখো', privacy: 'নাম আর বার্তা শুধু লিংকেই থাকে, কোথাও সেভ হয় না।' },
  };

  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clean = (s, n = 30) => String(s || '').replace(/[\u0000-\u001f]/g, ' ').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
  const params = new URLSearchParams(location.search);
  const deviceLang = () => {
    const l = (navigator.language || '').toLowerCase();
    if (l.startsWith('bn')) return 'bn';
    if (l.startsWith('hi')) return 'hi';
    return l.endsWith('-in') ? 'hinglish' : 'en';
  };
  const K = (k) => `${C.key}-${k}`;
  const urlLang = params.get('lang');
  let lang = LANGS.includes(urlLang) ? urlLang : LANGS.includes(store.get(K('lang'))) ? store.get(K('lang')) : deviceLang();
  const t = (k) => (C.T[lang][k] !== undefined ? C.T[lang][k] : U[lang][k]);
  const maxM = C.T.en.msgs.length - 1;
  let wish = { to: clean(params.get('to')), partner: clean(params.get('with')), from: clean(params.get('from')), d: clean(params.get('d'), 200), m: params.has('m') ? Math.max(0, Math.min(maxM, parseInt(params.get('m'), 10) || 0)) : C.dailyDefault ? Math.floor(Date.now() / 864e5) % (maxM + 1) : 0 };

  // ---- page
  const top = C.top ? `<div class="top-line" lang="${C.top.lang}"${C.top.dir ? ` dir="${C.top.dir}"` : ''}>${esc(C.top.text)}</div>` : '';
  document.getElementById('app').innerHTML = `
<header>
  <a class="brand" id="home" href="https://nextgrade.in/">${C.gateEmoji} NextGrade<small id="brandSub"></small></a>
  <select class="langsel" id="lang" aria-label="Language / भाषा / ভাষা"><option value="hinglish">Hinglish</option><option value="hi">हिंदी</option><option value="en">English</option><option value="bn">বাংলা</option></select>
</header>
<div class="show">
  <canvas id="sky" aria-hidden="true"></canvas>
  <div class="message hidden" id="message" aria-live="polite">
    ${top}
    <h1 id="title"></h1>
    <div class="names" id="names"></div>
    <div class="text" id="text"></div>
    <div class="from" id="from"></div>
  </div>
  <div class="gate" id="gate" role="button" tabindex="0">
    <div class="env">${C.gateEmoji}</div>
    <p id="gateTitle"></p>
    <small id="gateTap"></small>
  </div>
</div>
<div class="controls">
  <button class="btn btn-main" type="button" id="listen"></button>
  <button class="btn btn-ghost" type="button" id="replay"></button>
  <a class="btn btn-ghost" href="#make" id="makeOwn"></a>
</div>
<div class="ad" aria-hidden="true"></div>
<div class="maker" id="make">
  <h2 id="makeH"></h2>
  <p class="note" id="makeP"></p>
  <div class="field"><label for="toName" id="toLabel"></label><input id="toName" maxlength="30"></div>
  ${C.partner ? '<div class="field"><label for="partnerName" id="partnerLabel"></label><input id="partnerName" maxlength="30"></div>' : ''}
  <div class="field"><label for="fromName" id="fromLabel"></label><input id="fromName" maxlength="30"></div>
  <div class="field"><label for="msg" id="msgLabel"></label><select id="msg"></select></div>
  <div class="field"><label for="customMsg" id="customLabel"></label><textarea id="customMsg" maxlength="200" rows="3"></textarea></div>
  <div class="row">
    <button class="btn btn-wa" type="button" id="sendWa"></button>
    <button class="btn btn-ghost" type="button" id="preview"></button>
    <button class="btn btn-ghost" type="button" id="copyLink"></button>
  </div>
  <p class="note" id="makeStatus" role="status"></p>
  <p class="note" id="privacy"></p>
</div>
<section>
  <h2 id="aboutH"></h2>
  <div id="about"></div>
  <ul id="list"></ul>
  <p class="note" id="aboutNote"></p>
  <p id="links"></p>
</section>
<footer>
  © ${new Date().getFullYear()} NextGrade · <a href="https://nextgrade.in/">nextgrade.in</a><br>
  <a href="https://nextgrade.in/about/">About</a><a href="https://nextgrade.in/contact/">Contact</a><a href="https://nextgrade.in/privacy-policy/">Privacy Policy</a><a href="https://nextgrade.in/terms/">Terms</a>
</footer>`;
  const $ = (id) => document.getElementById(id);

  // ---- reading aloud
  // speech goes through NGVoice (/assets/voice.js): every matching voice is tried until one is actually heard
  const canSpeak = !!(window.NGVoice && NGVoice.ok);
  let speaking = false, vctl = null;
  const setListenBtn = () => { const b = $('listen'); if (!canSpeak) { b.classList.add('hidden'); return; } b.textContent = speaking ? t('stop') : t('listen'); };
  const sayParts = () => [$('title').textContent, $('names').textContent, $('text').textContent, wish.from ? $('from').textContent.replace(/^—\s*/, '') : ''].filter(Boolean);
  const stopSpeak = () => { if (vctl) vctl.stop(); speaking = false; setListenBtn(); };
  const speak = () => {
    if (!canSpeak) return;
    if (vctl) vctl.stop();
    vctl = NGVoice.play(sayParts(), { lang: VOICE[lang], rate: 0.8, gap: 200, onState: (st) => { speaking = st === 'speaking'; setListenBtn(); }, onFail: () => { speaking = false; setListenBtn(); } });
  };

  // ---- text
  const shownTo = () => (wish.partner ? `${wish.to || t('defaultTo')} & ${wish.partner}` : wish.to || t('defaultTo'));
  const render = () => {
    $('title').textContent = t('title');
    $('names').textContent = t('hello')(shownTo());
    $('text').textContent = wish.d || t('msgs')[wish.m];
    $('from').textContent = wish.from ? t('from')(wish.from) : '';
  };
  const applyLang = () => {
    document.documentElement.lang = lang === 'hinglish' ? 'en-IN' : lang;
    $('lang').value = lang;
    $('brandSub').textContent = t('title');
    $('gateTitle').textContent = t('gate')(wish.from);
    $('gateTap').textContent = t('tap');
    ['replay', 'makeOwn', 'makeH', 'makeP', 'toLabel', 'fromLabel', 'msgLabel', 'customLabel', 'sendWa', 'preview', 'copyLink', 'privacy', 'aboutH', 'aboutNote'].forEach((id) => { if ($(id)) $(id).textContent = t(id) || ''; });
    if (C.partner) $('partnerLabel').textContent = t('partnerLabel');
    $('toName').placeholder = t('toPh'); $('fromName').placeholder = t('fromPh'); $('customMsg').placeholder = t('customPh') || '';
    const about = $('about'); about.innerHTML = '';
    t('about').forEach((para) => { const p = document.createElement('p'); p.textContent = para; about.appendChild(p); });
    const ul = $('list'); ul.innerHTML = '';
    (t('list') || []).forEach((s) => { const li = document.createElement('li'); li.textContent = s; ul.appendChild(li); });
    const links = $('links'); links.innerHTML = '';
    (t('links') || []).forEach(([label, path], i) => {
      if (i) links.appendChild(document.createTextNode(' · '));
      const a = document.createElement('a'); a.href = `https://nextgrade.in${PREFIX[lang]}${path}`; a.textContent = label; links.appendChild(a);
    });
    const sel = $('msg'); const keep = sel.value;
    sel.innerHTML = '';
    t('msgs').forEach((m, i) => sel.add(new Option(m.length > 60 ? `${m.slice(0, 60)}…` : m, String(i))));
    sel.value = keep || '0';
    $('home').href = `https://nextgrade.in${PREFIX[lang]}/`;
    render(); setListenBtn();
  };
  $('lang').addEventListener('change', (e) => { lang = LANGS.includes(e.target.value) ? e.target.value : 'en'; store.set(K('lang'), lang); stopSpeak(); applyLang(); });
  $('fromName').value = store.get(K('from')) || '';

  // ---- scene
  const canvas = $('sky'); const ctx = canvas.getContext('2d');
  const S = { W: 0, H: 0, playing: false, startAt: 0, light: 0 };
  let last = 0;
  const resize = () => {
    const DPR = Math.min(window.devicePixelRatio || 1, 2); const r = canvas.getBoundingClientRect();
    S.W = r.width; S.H = r.height; canvas.width = Math.round(S.W * DPR); canvas.height = Math.round(S.H * DPR); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (C.scene.resize) C.scene.resize(S);
  };
  const frame = (now) => {
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    S.light = S.playing ? Math.min(1, (now - S.startAt) / 2500) : 0.25;
    C.scene.draw(ctx, S, now, dt);
    requestAnimationFrame(frame);
  };

  const play = () => {
    $('gate').classList.add('hidden');
    $('message').classList.add('hidden'); void $('message').offsetWidth; $('message').classList.remove('hidden');
    S.playing = true; S.startAt = performance.now();
    if (C.scene.start) C.scene.start(S);
    if (navigator.vibrate) navigator.vibrate(40);
  };
  $('gate').addEventListener('click', play);
  $('gate').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') play(); });
  $('replay').addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); play(); });
  $('listen').addEventListener('click', () => { if (speaking) { stopSpeak(); return; } if (!$('gate').classList.contains('hidden')) play(); speak(); });
  window.addEventListener('pagehide', stopSpeak);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopSpeak(); });

  // ---- make your own
  const form = () => ({ to: clean($('toName').value), partner: C.partner ? clean($('partnerName').value) : '', from: clean($('fromName').value), d: clean($('customMsg').value, 200), m: Number($('msg').value) || 0 });
  const linkFor = () => {
    const f = form(); const u = new URL(C.base);
    if (f.to) u.searchParams.set('to', f.to);
    if (f.partner) u.searchParams.set('with', f.partner);
    if (f.from) u.searchParams.set('from', f.from);
    if (f.d) u.searchParams.set('d', f.d); else u.searchParams.set('m', String(f.m));
    u.searchParams.set('lang', lang);
    return { url: u.toString(), to: f.partner ? `${f.to} & ${f.partner}` : f.to, from: f.from };
  };
  const need = () => { if (clean($('toName').value)) return true; $('makeStatus').textContent = t('needName'); $('toName').focus(); return false; };
  $('sendWa').addEventListener('click', () => { if (!need()) return; store.set(K('from'), clean($('fromName').value)); const l = linkFor(); window.open(`https://wa.me/?text=${encodeURIComponent(t('share')(l.to, l.from, l.url))}`, '_blank', 'noopener'); });
  $('copyLink').addEventListener('click', () => { if (!need()) return; const l = linkFor(); (navigator.clipboard ? navigator.clipboard.writeText(l.url) : Promise.reject()).then(() => { $('makeStatus').textContent = t('copied'); }).catch(() => window.prompt(t('copyLink'), l.url)); });
  $('preview').addEventListener('click', () => { if (!need()) return; wish = form(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); play(); });

  applyLang();
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
})();
