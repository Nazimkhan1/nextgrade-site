// Shared plumbing for the puzzle games: language, sound, levels with unlocks, win panel, share, messages.
// A game page calls PuzzleKit({...}) once and gets back helpers. Nothing leaves the device (localStorage only).
(() => {
  const COMMON = {
    hinglish: { undo: '↶ Wapas', hint: '💡 Hint', reset: '↺ Phir se', next: 'Agla level →', allDone: 'Phir se khelo ↺', shareWa: 'WhatsApp par challenge bhejo', shareFb: 'Facebook par share karo', shareOther: 'Share', readMore: 'Aur bhi:', moreGames: 'Aur games', privacyTitle: 'Privacy', privacyText: 'Koi login nahi. Aapke level aur best score sirf isi phone mein save hote hain.', moves: (m) => `Chaal: ${m}`, best: (b) => `Best: ${b}`, level: (n) => `Level ${n}`, noHint: '💡 Yahan se raasta nahi — "Phir se" dabao.', thinking: '💡 Soch raha hoon…' },
    hi: { undo: '↶ वापस', hint: '💡 हिंट', reset: '↺ फिर से', next: 'अगला लेवल →', allDone: 'फिर से खेलो ↺', shareWa: 'WhatsApp पर चैलेंज भेजो', shareFb: 'Facebook पर शेयर करो', shareOther: 'शेयर', readMore: 'और भी:', moreGames: 'और गेम', privacyTitle: 'प्राइवेसी', privacyText: 'कोई लॉगिन नहीं। आपके लेवल और बेस्ट स्कोर सिर्फ़ इसी फ़ोन में सेव होते हैं।', moves: (m) => `चाल: ${m}`, best: (b) => `बेस्ट: ${b}`, level: (n) => `लेवल ${n}`, noHint: '💡 यहाँ से रास्ता नहीं — "फिर से" दबाओ।', thinking: '💡 सोच रहा हूँ…' },
    en: { undo: '↶ Undo', hint: '💡 Hint', reset: '↺ Restart', next: 'Next level →', allDone: 'Play again ↺', shareWa: 'Challenge on WhatsApp', shareFb: 'Share on Facebook', shareOther: 'Share', readMore: 'More:', moreGames: 'More games', privacyTitle: 'Privacy', privacyText: 'No login. Your levels and best scores are saved only on this phone.', moves: (m) => `Moves: ${m}`, best: (b) => `Best: ${b}`, level: (n) => `Level ${n}`, noHint: '💡 No way forward from here — press "Restart".', thinking: '💡 Thinking…' },
    bn: { undo: '↶ ফেরাও', hint: '💡 হিন্ট', reset: '↺ আবার', next: 'পরের লেভেল →', allDone: 'আবার খেলো ↺', shareWa: 'WhatsApp-এ চ্যালেঞ্জ পাঠাও', shareFb: 'Facebook-এ শেয়ার করো', shareOther: 'শেয়ার', readMore: 'আরও:', moreGames: 'আরও গেম', privacyTitle: 'প্রাইভেসি', privacyText: 'কোনো লগইন নেই। তোমার লেভেল আর সেরা স্কোর শুধু এই ফোনেই সেভ থাকে।', moves: (m) => `চাল: ${m}`, best: (b) => `সেরা: ${b}`, level: (n) => `লেভেল ${n}`, noHint: '💡 এখান থেকে পথ নেই — "আবার" টেপো।', thinking: '💡 ভাবছি…' },
  };
  const PREFIX = { hi: '', en: '/en', hinglish: '/hinglish', bn: '/bn' };
  const LANGS = ['hinglish', 'hi', 'en', 'bn'];

  window.PuzzleKit = (cfg) => {
    const $ = (id) => document.getElementById(id);
    const store = { get: (k) => { try { return localStorage.getItem(`${cfg.key}-${k}`); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(`${cfg.key}-${k}`, v); } catch (e) { /* private mode */ } } };
    const params = new URLSearchParams(location.search);
    const deviceLang = () => { const l = (navigator.language || '').toLowerCase(); if (l.startsWith('bn')) return 'bn'; if (l.startsWith('hi')) return 'hi'; return l.endsWith('-in') ? 'hinglish' : 'en'; };
    const kit = {
      $, store,
      lang: LANGS.includes(params.get('lang')) ? params.get('lang') : LANGS.includes(store.get('lang')) ? store.get('lang') : deviceLang(),
      lv: 0,
    };
    const t = (k) => (cfg.T[kit.lang][k] !== undefined ? cfg.T[kit.lang][k] : COMMON[kit.lang][k]);
    kit.t = t;
    const unlocked = () => Math.max(1, parseInt(store.get('unlocked'), 10) || 1);
    kit.lv = Math.min(cfg.levels - 1, Math.max(0, parseInt(store.get('level'), 10) || 0));
    if (kit.lv + 1 > unlocked()) kit.lv = 0;

    // ---- sound (on by default in games, mute button)
    let muted = store.get('muted') === '1', audio = null;
    const setMute = () => { $('mute').textContent = muted ? '🔇' : '🔊'; };
    $('mute').addEventListener('click', () => { muted = !muted; store.set('muted', muted ? '1' : '0'); setMute(); });
    const ac = () => { try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); return audio; } catch (e) { return null; } };
    const tone = (f, d, type, v, delay) => {
      if (muted) return; const a = ac(); if (!a) return;
      const t0 = a.currentTime + (delay || 0), o = a.createOscillator(), g = a.createGain();
      o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(v || 0.08, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(g); g.connect(a.destination); o.start(t0); o.stop(t0 + d + 0.02);
    };
    kit.tone = tone;
    kit.sfx = {
      tap: () => tone(680, 0.06, 'triangle', 0.05),
      move: () => tone(440, 0.09, 'sine', 0.07),
      no: () => tone(180, 0.15, 'square', 0.04),
      fail: () => [330, 262, 196].forEach((f, i) => tone(f, 0.25, 'sawtooth', 0.05, i * 0.15)),
      win: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.2, 'triangle', 0.07, i * 0.11)),
    };

    // ---- messages
    kit.say = (text, cls) => { $('msg').textContent = text || ''; $('msg').className = `msg ${cls || ''}`; };
    kit.shake = () => { const b = $('board'); b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); };
    kit.status = (moves, best) => { $('moves').textContent = moves === null ? '' : t('moves')(moves); $('target').textContent = best || ''; };

    // ---- levels
    const levelLabel = (i) => (cfg.levelLabel ? cfg.levelLabel(i, kit.lang) : t('level')(i + 1));
    kit.levelTabs = () => {
      $('levels').innerHTML = Array.from({ length: cfg.levels }, (_, i) => `<button type="button" data-l="${i}" aria-pressed="${i === kit.lv}"${i + 1 > unlocked() ? ' disabled' : ''}>${i + 1 > unlocked() ? '🔒 ' : ''}${levelLabel(i)}</button>`).join('');
    };
    const goLevel = (i) => { kit.lv = i; store.set('level', String(i)); kit.levelTabs(); $('win').hidden = true; cfg.onLevel(i); };
    $('levels').addEventListener('click', (e) => { const b = e.target.closest('[data-l]'); if (b && !b.disabled) goLevel(Number(b.dataset.l)); });
    $('nextLevel').addEventListener('click', () => { goLevel(kit.lv + 1 < cfg.levels ? kit.lv + 1 : 0); $('board').scrollIntoView({ behavior: 'smooth', block: 'center' }); });

    // ---- win panel + share
    let shareLine = '';
    kit.win = ({ stars, line, share, bestKey, score, lowerIsBetter = true }) => {
      kit.sfx.win();
      if (bestKey) { const b = parseFloat(store.get(`best-${bestKey}`)); if (Number.isNaN(b) || (lowerIsBetter ? score < b : score > b)) store.set(`best-${bestKey}`, String(score)); }
      if (kit.lv + 2 > unlocked()) store.set('unlocked', String(Math.min(cfg.levels, kit.lv + 2)));
      $('winTitle').textContent = t('winTitle');
      $('winStars').textContent = '⭐'.repeat(Math.max(1, Math.min(3, stars)));
      $('winLine').textContent = line;
      $('nextLevel').textContent = kit.lv + 1 < cfg.levels ? t('next') : t('allDone');
      shareLine = share;
      $('win').hidden = false; kit.levelTabs();
      $('win').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    kit.best = (bestKey) => { const b = store.get(`best-${bestKey}`); return b === null ? null : Number(b); };
    kit.hideWin = () => { $('win').hidden = true; };
    const shareText = () => `${shareLine}${cfg.site}?lang=${kit.lang}`;
    $('shareWa').addEventListener('click', () => { window.open(`https://wa.me/?text=${encodeURIComponent(shareText())}`, '_blank', 'noopener'); });
    $('shareFb').addEventListener('click', () => { const c = document.querySelector('link[rel=canonical]'); const u = (c && c.href) || (location.origin + location.pathname); window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(u), '_blank', 'noopener,width=620,height=560'); });
    $('shareOther').addEventListener('click', () => { const text = shareText(); if (navigator.share) { navigator.share({ title: t('title'), text }).catch(() => {}); return; } (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(() => window.prompt('Copy', text)); });

    // ---- language
    const applyLang = () => {
      document.documentElement.lang = kit.lang === 'hinglish' ? 'en-IN' : kit.lang;
      document.title = `${t('title')} ${cfg.emoji} — ${cfg.titleTail} | NextGrade`;
      $('lang').value = kit.lang;
      document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
      document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
      $('howList').innerHTML = t('how').map((li) => `<li>${li}</li>`).join('');
      ['undo', 'hint', 'reset'].forEach((id) => { if ($(id)) $(id).textContent = t(id); });
      const p = PREFIX[kit.lang];
      $('home').href = `https://nextgrade.in${p}/`;
      $('moreGames').href = `https://nextgrade.in${p}/games/`;
      document.querySelectorAll('[data-game]').forEach((a) => { a.href = `https://nextgrade.in/games/${a.dataset.game}/?lang=${kit.lang}`; });
      kit.levelTabs();
      if (cfg.onLang) cfg.onLang();
    };
    kit.applyLang = applyLang;
    $('lang').addEventListener('change', (e) => { kit.lang = LANGS.includes(e.target.value) ? e.target.value : 'en'; store.set('lang', kit.lang); applyLang(); });
    $('year').textContent = new Date().getFullYear();
    setMute();
    // load the level first (games draw from level state), then apply the language and draw
    kit.start = () => { cfg.onLevel(kit.lv); applyLang(); };
    if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
    return kit;
  };
})();
