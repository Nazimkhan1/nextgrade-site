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
})();
