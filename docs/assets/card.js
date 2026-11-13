// Wish Card Maker: draws the card on a <canvas> in the browser; nothing is uploaded.
(() => {
  const list = window.NG_FESTIVALS || [];
  const $ = (id) => document.getElementById(id);
  const canvas = $('card');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const pick = $('festival');
  const wish = $('wish');
  const status = $('status');

  list.forEach((f) => pick.add(new Option(`${f.emoji} ${f.nameHi} · ${f.nameEn}`, f.slug)));
  const wanted = new URLSearchParams(location.search).get('f');
  if (wanted && list.some((f) => f.slug === wanted)) pick.value = wanted;

  const current = () => list.find((f) => f.slug === pick.value) || list[0];

  const fillWishes = () => {
    wish.innerHTML = '';
    current().wishes.forEach((w, i) => wish.add(new Option(w.length > 70 ? `${w.slice(0, 70)}…` : w, String(i))));
  };

  // Break text into lines that fit `max` pixels.
  const lines = (text, max) =>
    text.split(/\s+/).reduce((out, word) => {
      const last = out[out.length - 1];
      const test = last ? `${last} ${word}` : word;
      if (last !== undefined && ctx.measureText(test).width > max) out.push(word);
      else out[out.length ? out.length - 1 : 0] = test;
      return out;
    }, []);

  const draw = () => {
    const f = current();
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, f.colors[0]);
    g.addColorStop(1, f.colors[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // soft circles for texture
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#fff';
    [[160, 180, 220], [940, 300, 160], [880, 1180, 260], [120, 1150, 140]].forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // inner frame
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, W - 100, H - 100);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '160px serif';
    ctx.fillText(f.emoji, W / 2, 290);

    ctx.font = '700 84px "Noto Sans Devanagari", Inter, sans-serif';
    ctx.fillText(f.nameHi, W / 2, 420);
    ctx.font = '600 44px Inter, sans-serif';
    ctx.fillText(f.nameEn, W / 2, 485);

    const to = $('to').value.trim();
    let y = 600;
    if (to) {
      ctx.font = '600 50px "Noto Sans Devanagari", Inter, sans-serif';
      ctx.fillText(`प्रिय ${to},`, W / 2, y);
      y += 90;
    }

    const message = $('custom').value.trim() || (f.wishes[Number(wish.value)] || f.wishes[0]);
    ctx.font = '500 50px "Noto Sans Devanagari", Inter, sans-serif';
    lines(message, W - 220).slice(0, 8).forEach((line) => {
      ctx.fillText(line, W / 2, y);
      y += 72;
    });

    const from = $('from').value.trim();
    if (from) {
      ctx.font = '700 52px "Noto Sans Devanagari", Inter, sans-serif';
      ctx.fillText(`— ${from}`, W / 2, Math.max(y + 60, 1130));
    }

    ctx.font = '500 30px Inter, sans-serif';
    ctx.globalAlpha = 0.85;
    ctx.fillText('nextgrade.in/wish-card', W / 2, H - 90);
    ctx.globalAlpha = 1;
  };

  const fileName = () => `${current().slug}-wish-nextgrade.png`;
  const toBlob = () => new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

  $('download').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = fileName();
    a.click();
    status.textContent = 'कार्ड डाउनलोड हो गया।';
  });

  $('share').addEventListener('click', () => {
    toBlob().then((blob) => {
      const file = new File([blob], fileName(), { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({ files: [file], title: current().nameEn, text: 'nextgrade.in/wish-card' }).catch(() => undefined);
      }
      status.textContent = 'इस ब्राउज़र में सीधा शेयर नहीं होता — Download करके भेजें।';
      return undefined;
    });
  });

  pick.addEventListener('change', () => {
    fillWishes();
    draw();
  });
  ['to', 'from', 'custom'].forEach((id) => $(id).addEventListener('input', draw));
  wish.addEventListener('change', draw);

  fillWishes();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
  draw();
})();
