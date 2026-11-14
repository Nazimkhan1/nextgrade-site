// Today's Hijri date, worked out in the browser with the Umm al-Qura calendar (falls back to the civil Islamic calendar).
(() => {
  const box = document.getElementById('hijriToday');
  if (!box) return;
  const months = JSON.parse(box.dataset.months);
  const now = new Date();
  const fmt = (cal) => new Intl.DateTimeFormat(`en-u-ca-${cal}-nu-latn`, { day: 'numeric', month: 'numeric', year: 'numeric' });
  let parts;
  try { parts = fmt('islamic-umalqura').formatToParts(now); } catch (e) { try { parts = fmt('islamic').formatToParts(now); } catch (e2) { return; } }
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  const m = months[Number(p.month) - 1];
  if (!m) return;
  document.getElementById('hijriDate').textContent = `${Number(p.day)} ${m.name} ${String(p.year).replace(/\D/g, '')} ${box.dataset.ah}`;
  document.getElementById('hijriMeaning').textContent = m.meaning;
  try {
    document.getElementById('gregDate').textContent = now.toLocaleDateString(box.dataset.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) { /* old browser */ }
})();
