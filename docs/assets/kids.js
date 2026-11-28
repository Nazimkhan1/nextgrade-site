// Kids learning flashcards: tap a card to hear its name in a gentle female voice (Web Speech API), plus a slideshow. On-device.
(function () {
  var K = window.KIDS || {};
  var items = K.items || [];
  var UI = K.ui || {};
  var $ = function (id) { return document.getElementById(id); };
  var grid = $('kids-grid');
  if (!grid || !items.length) return;

  // --- choose a gentle FEMALE voice for a language; falls back to English if that language has no voice ---
  var FEMALE = /female|woman|swara|kalpana|lekha|aria|jenny|zira|samantha|karen|moira|tessa|serena|catherine|heera|tanishaa|google/i;
  var MALE = /\b(male|man|daniel|alex|fred|rishi|prabhat|hemant|madhur|oliver|bashkar|ravi|arjun)\b/i;
  function allVoices() { try { return (window.speechSynthesis && window.speechSynthesis.getVoices()) || []; } catch (e) { return []; } }
  function voiceFor(lang) {
    var base = (lang || 'en').split('-')[0].toLowerCase();
    var cand = allVoices().filter(function (v) { return v.lang.toLowerCase().indexOf(base) === 0; });
    if (!cand.length) return null;
    return cand.filter(function (v) { return FEMALE.test(v.name) && !MALE.test(v.name); })[0] ||
      cand.filter(function (v) { return !MALE.test(v.name); })[0] || cand[0];
  }
  if (window.speechSynthesis) { allVoices(); window.speechSynthesis.onvoiceschanged = allVoices; }

  // Play the recorded clip first (a real female voice — Hindi/Bengali/English — that works in every browser);
  // fall back to the browser's own speech only if the clip can't play.
  var curAudio = null;
  function speakItem(it) {
    if (it.audio) {
      try {
        if (curAudio) { try { curAudio.pause(); } catch (e) {} }
        var a = new Audio(it.audio);
        curAudio = a;
        a.onerror = function () { tts(it); };
        var p = a.play();
        if (p && p.catch) p.catch(function () { tts(it); });
        return;
      } catch (e) { /* fall through to tts */ }
    }
    tts(it);
  }
  // Browser speech fallback — speaks in the item's language with a female voice, or English if that language has no voice.
  function tts(it) {
    try {
      var sy = window.speechSynthesis; if (!sy) return;
      sy.cancel();
      var v = voiceFor(it.lang), text = it.say, lang = it.lang;
      if (!v) { v = voiceFor('en-US'); text = it.en || it.say; lang = 'en-US'; }
      var u = new SpeechSynthesisUtterance(text);
      if (v) u.voice = v;
      u.lang = (v && v.lang) || lang || 'en-US';
      u.rate = 0.72; u.pitch = 1.1;
      sy.speak(u);
    } catch (e) { /* no speech support */ }
  }

  // --- grid ---
  items.forEach(function (it) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'kids-card' + (it.emoji ? '' : ' kids-text'); b.setAttribute('aria-label', it.big);
    b.innerHTML = (it.corner ? '<span class="kids-letter" aria-hidden="true">' + it.corner + '</span>' : '') +
      (it.emoji ? '<span class="kids-emoji" aria-hidden="true">' + it.emoji + '</span>' : '') +
      '<span class="kids-en">' + it.big + '</span>' +
      (it.sub ? '<span class="kids-native">' + it.sub + '</span>' : '') +
      '<span class="kids-spk" aria-hidden="true">🔊</span>';
    b.addEventListener('click', function () { speakItem(it); b.classList.add('pop'); setTimeout(function () { b.classList.remove('pop'); }, 260); });
    grid.appendChild(b);
  });

  // --- slideshow ---
  var show = $('kids-show'), card = $('kids-card'), idx = 0, timer = null, playing = false;
  function render(i) {
    var it = items[i];
    card.innerHTML = (it.emoji ? '<span class="kids-emoji-big" aria-hidden="true">' + it.emoji + '</span>' : '') +
      '<span class="kids-en-big">' + it.big + '</span>' +
      (it.sub ? '<span class="kids-native-big">' + it.sub + '</span>' : '');
  }
  function say(i) { speakItem(items[i]); }
  function stopAuto() { if (timer) { clearTimeout(timer); timer = null; } }
  function go(i) { idx = (i + items.length) % items.length; render(idx); say(idx); }
  function auto() {
    stopAuto();
    timer = setTimeout(function () { if (playing) { idx = (idx + 1) % items.length; render(idx); say(idx); auto(); } }, 2800);
  }
  function openShow() { if (show) { show.hidden = false; playing = true; idx = 0; render(0); say(0); auto(); } }
  function closeShow() { playing = false; stopAuto(); try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} if (show) show.hidden = true; }

  if ($('kids-play')) $('kids-play').addEventListener('click', openShow);
  if ($('kids-close')) $('kids-close').addEventListener('click', closeShow);
  if ($('kids-next')) $('kids-next').addEventListener('click', function () { playing = false; stopAuto(); go(idx + 1); });
  if ($('kids-prev')) $('kids-prev').addEventListener('click', function () { playing = false; stopAuto(); go(idx - 1); });
  if ($('kids-replay')) $('kids-replay').addEventListener('click', function () { say(idx); });
  document.addEventListener('keydown', function (e) {
    if (!show || show.hidden) return;
    if (e.key === 'ArrowRight') { playing = false; stopAuto(); go(idx + 1); }
    else if (e.key === 'ArrowLeft') { playing = false; stopAuto(); go(idx - 1); }
    else if (e.key === 'Escape') closeShow();
  });

  // --- two small games on every set (28 Nov 2026, plan §AA2): "listen and pick" and "find the pairs" ---
  (function games() {
    var htmlLang = (document.documentElement.lang || 'hi').toLowerCase();
    var G = ({
      hi: { g1: '🎧 सुनो और चुनो', g2: '🃏 जोड़ी मिलाओ', ask: 'सुनो और सही वाला छुओ', again: '🔊 फिर से सुनो', good: ['शाबाश! 🎉', 'बहुत बढ़िया! ⭐', 'वाह! सही! 👏'], bad: 'फिर कोशिश करो 🙂', done: function (a, b) { return 'खेल पूरा! ' + a + '/' + b + ' सही'; }, replay: '🔁 फिर खेलो', moves: function (n) { return 'चालें: ' + n; }, pairsDone: function (n) { return 'सारी जोड़ियाँ मिल गईं! ' + n + ' चालों में 🎉'; }, pairsAsk: 'दो कार्ड खोलो — एक जैसे जोड़े मिलाओ', close: 'बंद करो' },
      en: { g1: '🎧 Listen & pick', g2: '🃏 Find the pairs', ask: 'Listen and tap the right one', again: '🔊 Hear again', good: ['Well done! 🎉', 'Great! ⭐', 'Yes! Correct! 👏'], bad: 'Try again 🙂', done: function (a, b) { return 'Finished! ' + a + '/' + b + ' right'; }, replay: '🔁 Play again', moves: function (n) { return 'Moves: ' + n; }, pairsDone: function (n) { return 'All pairs found in ' + n + ' moves! 🎉'; }, pairsAsk: 'Open two cards — match the pairs', close: 'Close' },
      'hi-latn': { g1: '🎧 Suno aur chuno', g2: '🃏 Jodi milao', ask: 'Suno aur sahi wala chhuo', again: '🔊 Phir se suno', good: ['Shabaash! 🎉', 'Bahut badhiya! ⭐', 'Waah! Sahi! 👏'], bad: 'Phir koshish karo 🙂', done: function (a, b) { return 'Khel poora! ' + a + '/' + b + ' sahi'; }, replay: '🔁 Phir khelo', moves: function (n) { return 'Chaalein: ' + n; }, pairsDone: function (n) { return 'Saari jodiyan mil gayin! ' + n + ' chaalon mein 🎉'; }, pairsAsk: 'Do card kholo — ek jaise jode milao', close: 'Band karo' },
      bn: { g1: '🎧 শোনো আর বাছো', g2: '🃏 জোড়া মেলাও', ask: 'শোনো আর ঠিকটা ছোঁও', again: '🔊 আবার শোনো', good: ['সাবাশ! 🎉', 'খুব ভালো! ⭐', 'বাহ! ঠিক! 👏'], bad: 'আবার চেষ্টা করো 🙂', done: function (a, b) { return 'খেলা শেষ! ' + a + '/' + b + ' ঠিক'; }, replay: '🔁 আবার খেলো', moves: function (n) { return 'চাল: ' + n; }, pairsDone: function (n) { return 'সব জোড়া মিলে গেছে! ' + n + ' চালে 🎉'; }, pairsAsk: 'দুটো কার্ড খোলো — একরকম জোড়া মেলাও', close: 'বন্ধ করো' },
    })[htmlLang] || null;
    var ctl = document.querySelector('.kids-controls');
    if (!G || !ctl || items.length < 4) return;

    var css = document.createElement('style');
    css.textContent = '.kg-btn{margin-left:8px}' +
      '.kg{position:fixed;inset:0;z-index:61;background:#fff8ec;display:flex;flex-direction:column;align-items:center;padding:14px 12px calc(14px + env(safe-area-inset-bottom));overflow:auto;color:#1b1b1b}' +
      '.kg[hidden]{display:none}.kg-top{width:100%;max-width:560px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:800}' +
      '.kg-x{font-size:1.5rem;background:none;border:0;cursor:pointer;color:#555}.kg-stars{color:#e8a200;font-size:1.1rem;letter-spacing:1px}' +
      '.kg-ask{font-size:1.25rem;font-weight:800;margin:10px 0 4px;text-align:center}.kg-msg{min-height:1.8em;font-size:1.3rem;font-weight:800;color:#2b8a3e;text-align:center}.kg-msg.bad{color:#c92a2a}' +
      '.kg-opts{width:100%;max-width:560px;display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:10px 0}' +
      '.kg-opt,.kg-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:3px solid #e6dcc8;border-radius:20px;background:#fff;cursor:pointer;font-weight:800;color:#1b1b1b;min-height:130px;padding:8px;transition:transform .12s}' +
      '.kg-opt .e{font-size:4.2rem;line-height:1}.kg-opt .t{font-size:1.6rem;overflow-wrap:anywhere;text-align:center}' +
      '.kg-opt.ok{border-color:#40c057;background:#ebfbee;transform:scale(1.05)}.kg-opt.no{border-color:#fa5252;animation:kgshake .35s}' +
      '@keyframes kgshake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}' +
      '.kg-again,.kg-replay{border:0;border-radius:14px;padding:12px 18px;font-weight:800;font-size:1.05rem;cursor:pointer;background:#f08c00;color:#fff;margin:6px}' +
      '.kg-cards{width:100%;max-width:560px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0}' +
      '.kg-card{min-height:104px;font-size:1.3rem;text-align:center;overflow-wrap:anywhere}.kg-card .e{font-size:3rem;line-height:1}' +
      '.kg-card.back{background:linear-gradient(135deg,#ffa94d,#f76707);border-color:#f76707;color:transparent}.kg-card.back::after{content:"?";color:#fff;font-size:2.4rem}' +
      '.kg-card.done{border-color:#40c057;background:#ebfbee;cursor:default}' +
      '@media(min-width:560px){.kg-opts{grid-template-columns:repeat(4,1fr)}.kg-cards{grid-template-columns:repeat(4,1fr)}}';
    document.head.appendChild(css);

    var b1 = document.createElement('button'); b1.type = 'button'; b1.className = 'btn kg-btn'; b1.textContent = G.g1;
    var b2 = document.createElement('button'); b2.type = 'button'; b2.className = 'btn kg-btn'; b2.textContent = G.g2;
    ctl.appendChild(b1); ctl.appendChild(b2);
    var box = document.createElement('div'); box.className = 'kg'; box.hidden = true; box.setAttribute('role', 'dialog');
    document.body.appendChild(box);

    function esc(x) { return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function face(it) { return it.emoji ? '<span class="e" aria-hidden="true">' + it.emoji + '</span>' : '<span class="t">' + esc(it.big) + '</span>'; }
    function close() { box.hidden = true; box.innerHTML = ''; document.body.style.overflow = ''; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
    function open(html) { box.innerHTML = html; box.hidden = false; document.body.style.overflow = 'hidden'; box.querySelector('.kg-x').onclick = close; }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });

    // Game 1: hear a word, tap the right picture out of 4; 10 rounds
    function listen() {
      var ROUNDS = Math.min(10, items.length), order = shuffle(items).slice(0, ROUNDS), r = 0, right = 0, firstTry = true;
      function round() {
        if (r >= ROUNDS) { return finish(); }
        var target = order[r]; firstTry = true;
        var opts = shuffle([target].concat(shuffle(items.filter(function (x) { return x !== target; })).slice(0, 3)));
        open('<div class="kg-top"><span>' + esc(G.g1) + ' · ' + (r + 1) + '/' + ROUNDS + '</span><span class="kg-stars">' + '⭐'.repeat(right) + '</span><button class="kg-x" aria-label="' + esc(G.close) + '">✕</button></div>' +
          '<p class="kg-ask">' + esc(G.ask) + '</p><button class="kg-again" type="button">' + esc(G.again) + '</button>' +
          '<div class="kg-opts">' + opts.map(function (o, i) { return '<button type="button" class="kg-opt" data-i="' + i + '">' + face(o) + (o.emoji ? '' : '') + '</button>'; }).join('') + '</div><p class="kg-msg" aria-live="polite"></p>');
        speakItem(target);
        box.querySelector('.kg-again').onclick = function () { speakItem(target); };
        var lock = false;
        box.querySelectorAll('.kg-opt').forEach(function (btn) {
          btn.onclick = function () {
            if (lock) return;
            var o = opts[+btn.dataset.i], msg = box.querySelector('.kg-msg');
            if (o === target) {
              lock = true; btn.classList.add('ok'); if (firstTry) right++;
              msg.className = 'kg-msg'; msg.textContent = G.good[Math.floor(Math.random() * G.good.length)];
              if (navigator.vibrate) navigator.vibrate(40);
              setTimeout(function () { r++; round(); }, 1100);
            } else {
              firstTry = false; btn.classList.remove('no'); void btn.offsetWidth; btn.classList.add('no');
              msg.className = 'kg-msg bad'; msg.textContent = G.bad; speakItem(target);
            }
          };
        });
      }
      function finish() {
        open('<div class="kg-top"><span>' + esc(G.g1) + '</span><span></span><button class="kg-x" aria-label="' + esc(G.close) + '">✕</button></div>' +
          '<p class="kg-ask" style="font-size:3rem;margin-top:40px">' + (right >= ROUNDS * 0.8 ? '🏆' : right >= ROUNDS / 2 ? '🌟' : '🙂') + '</p>' +
          '<p class="kg-ask">' + esc(G.done(right, ROUNDS)) + '</p><p class="kg-stars" style="font-size:1.6rem">' + '⭐'.repeat(right) + '</p>' +
          '<button class="kg-replay" type="button">' + esc(G.replay) + '</button>');
        box.querySelector('.kg-replay').onclick = listen;
      }
      round();
    }

    // Game 2: memory pairs — picture ↔ word (or word ↔ word when a set has no pictures); 6 pairs
    function pairs() {
      var pick = shuffle(items).slice(0, Math.min(6, items.length)), cards = [];
      pick.forEach(function (it, k) {
        var hasPic = !!it.emoji;
        cards.push({ k: k, it: it, html: hasPic ? '<span class="e" aria-hidden="true">' + it.emoji + '</span>' : esc(it.big) });
        cards.push({ k: k, it: it, html: hasPic ? esc(it.big) : esc(it.sub || it.big) });
      });
      cards = shuffle(cards);
      var open1 = null, busy = false, moves = 0, found = 0;
      open('<div class="kg-top"><span>' + esc(G.g2) + '</span><span class="kg-moves">' + esc(G.moves(0)) + '</span><button class="kg-x" aria-label="' + esc(G.close) + '">✕</button></div>' +
        '<p class="kg-ask">' + esc(G.pairsAsk) + '</p><div class="kg-cards">' + cards.map(function (c, i) { return '<button type="button" class="kg-card back" data-i="' + i + '" aria-label="?"></button>'; }).join('') + '</div><p class="kg-msg" aria-live="polite"></p>');
      var els = box.querySelectorAll('.kg-card');
      function show(i) { els[i].classList.remove('back'); els[i].innerHTML = cards[i].html; els[i].setAttribute('aria-label', cards[i].it.big); }
      function hide(i) { els[i].classList.add('back'); els[i].innerHTML = ''; els[i].setAttribute('aria-label', '?'); }
      els.forEach(function (el) {
        el.onclick = function () {
          var i = +el.dataset.i;
          if (busy || el.classList.contains('done') || i === open1 || !el.classList.contains('back')) return;
          show(i);
          if (open1 === null) { open1 = i; speakItem(cards[i].it); return; }
          moves++; box.querySelector('.kg-moves').textContent = G.moves(moves);
          var a = open1; open1 = null;
          if (cards[a].k === cards[i].k) {
            els[a].classList.add('done'); els[i].classList.add('done'); found++; speakItem(cards[i].it);
            if (navigator.vibrate) navigator.vibrate(40);
            if (found === pick.length) {
              var m = box.querySelector('.kg-msg'); m.className = 'kg-msg'; m.textContent = G.pairsDone(moves);
              var rb = document.createElement('button'); rb.className = 'kg-replay'; rb.type = 'button'; rb.textContent = G.replay; rb.onclick = pairs; box.appendChild(rb);
            }
          } else {
            busy = true; setTimeout(function () { hide(a); hide(i); busy = false; }, 900);
          }
        };
      });
    }
    b1.addEventListener('click', listen);
    b2.addEventListener('click', pairs);
  })();
})();
