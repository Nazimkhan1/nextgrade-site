window.NW = (function(HI, BN){
  var O = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var T = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function en99(n) { return n < 20 ? O[n] : T[Math.floor(n / 10)] + (n % 10 ? '-' + O[n % 10] : ''); }
  function en999(n) { var h = Math.floor(n / 100), r = n % 100; return (h ? O[h] + ' Hundred' + (r ? ' ' : '') : '') + (r ? en99(r) : ''); }
  function enIndian(n) {
    if (n === 0) return 'Zero';
    var parts = [], cr = Math.floor(n / 1e7); n %= 1e7;
    if (cr) parts.push((cr > 999 ? enIndian(cr) : en999(cr)) + ' Crore');
    var l = Math.floor(n / 1e5); n %= 1e5; if (l) parts.push(en99(l) + ' Lakh');
    var t = Math.floor(n / 1e3); n %= 1e3; if (t) parts.push(en99(t) + ' Thousand');
    if (n) parts.push(en999(n));
    return parts.join(' ');
  }
  function enIntl(n) {
    if (n === 0) return 'Zero';
    var S = ['', ' Thousand', ' Million', ' Billion', ' Trillion'], parts = [], i = 0;
    while (n > 0) { var c = n % 1000; if (c) parts.unshift(en999(c) + S[i]); n = Math.floor(n / 1000); i++; }
    return parts.join(' ');
  }
  function hi99(n) { return HI[n - 1]; }
  function hi999(n) { var h = Math.floor(n / 100), r = n % 100; return (h ? hi99(h) + ' सौ' + (r ? ' ' : '') : '') + (r ? hi99(r) : ''); }
  function hiNum(n) {
    if (n === 0) return 'शून्य';
    var p = [], cr = Math.floor(n / 1e7); n %= 1e7;
    if (cr) p.push((cr > 999 ? hiNum(cr) : hi999(cr)) + ' करोड़');
    var l = Math.floor(n / 1e5); n %= 1e5; if (l) p.push(hi99(l) + ' लाख');
    var t = Math.floor(n / 1e3); n %= 1e3; if (t) p.push(hi99(t) + ' हज़ार');
    if (n) p.push(hi999(n));
    return p.join(' ');
  }
  var BH = ['', 'একশো', 'দুশো', 'তিনশো', 'চারশো', 'পাঁচশো', 'ছয়শো', 'সাতশো', 'আটশো', 'নয়শো'];
  function bn99(n) { return BN[n - 1]; }
  function bn999(n) { var h = Math.floor(n / 100), r = n % 100; return (h ? BH[h] + (r ? ' ' : '') : '') + (r ? bn99(r) : ''); }
  function bnNum(n) {
    if (n === 0) return 'শূন্য';
    var p = [], cr = Math.floor(n / 1e7); n %= 1e7;
    if (cr) p.push((cr > 999 ? bnNum(cr) : bn999(cr)) + ' কোটি');
    var l = Math.floor(n / 1e5); n %= 1e5; if (l) p.push(bn99(l) + ' লক্ষ');
    var t = Math.floor(n / 1e3); n %= 1e3; if (t) p.push(bn99(t) + ' হাজার');
    if (n) p.push(bn999(n));
    return p.join(' ');
  }
  function indianFmt(n) { var s = String(n), last = s.slice(-3), rest = s.slice(0, -3); return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last : last; }
  function intlFmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function roman(n) { if (n < 1 || n > 3999) return ''; var v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], s = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'], r = ''; v.forEach(function (x, i) { while (n >= x) { r += s[i]; n -= x; } }); return r; }
  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return intlFmt(n) + (s[(v - 20) % 10] || s[v] || s[0]); }
  function isPrime(n) { if (n < 2) return false; for (var i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
  function bnDigits(x) { return String(x).replace(/\d/g, function (d) { return '০১২৩৪৫৬৭৮৯'[d]; }); }
  function cheque(rupees, paise) { return 'Rupees ' + enIndian(rupees) + (paise ? ' and ' + en99(paise) + ' Paise' : '') + ' Only'; }
  return { enIndian: enIndian, enIntl: enIntl, hiNum: hiNum, bnNum: bnNum, indianFmt: indianFmt, intlFmt: intlFmt, roman: roman, ordinal: ordinal, isPrime: isPrime, bnDigits: bnDigits, cheque: cheque };
})(["एक","दो","तीन","चार","पाँच","छह","सात","आठ","नौ","दस","ग्यारह","बारह","तेरह","चौदह","पंद्रह","सोलह","सत्रह","अठारह","उन्नीस","बीस","इक्कीस","बाईस","तेईस","चौबीस","पच्चीस","छब्बीस","सत्ताईस","अट्ठाईस","उनतीस","तीस","इकतीस","बत्तीस","तैंतीस","चौंतीस","पैंतीस","छत्तीस","सैंतीस","अड़तीस","उनतालीस","चालीस","इकतालीस","बयालीस","तैंतालीस","चौवालीस","पैंतालीस","छियालीस","सैंतालीस","अड़तालीस","उनचास","पचास","इक्यावन","बावन","तिरपन","चौवन","पचपन","छप्पन","सत्तावन","अट्ठावन","उनसठ","साठ","इकसठ","बासठ","तिरसठ","चौंसठ","पैंसठ","छियासठ","सड़सठ","अड़सठ","उनहत्तर","सत्तर","इकहत्तर","बहत्तर","तिहत्तर","चौहत्तर","पचहत्तर","छिहत्तर","सतहत्तर","अठहत्तर","उन्यासी","अस्सी","इक्यासी","बयासी","तिरासी","चौरासी","पचासी","छियासी","सत्तासी","अट्ठासी","नवासी","नब्बे","इक्यानवे","बानवे","तिरानवे","चौरानवे","पचानवे","छियानवे","सत्तानवे","अट्ठानवे","निन्यानवे","सौ"], ["এক","দুই","তিন","চার","পাঁচ","ছয়","সাত","আট","নয়","দশ","এগারো","বারো","তেরো","চোদ্দ","পনেরো","ষোলো","সতেরো","আঠারো","উনিশ","কুড়ি","একুশ","বাইশ","তেইশ","চব্বিশ","পঁচিশ","ছাব্বিশ","সাতাশ","আঠাশ","ঊনত্রিশ","ত্রিশ","একত্রিশ","বত্রিশ","তেত্রিশ","চৌত্রিশ","পঁয়ত্রিশ","ছত্রিশ","সাঁইত্রিশ","আটত্রিশ","ঊনচল্লিশ","চল্লিশ","একচল্লিশ","বিয়াল্লিশ","তেতাল্লিশ","চুয়াল্লিশ","পঁয়তাল্লিশ","ছেচল্লিশ","সাতচল্লিশ","আটচল্লিশ","ঊনপঞ্চাশ","পঞ্চাশ","একান্ন","বাহান্ন","তিপ্পান্ন","চুয়ান্ন","পঞ্চান্ন","ছাপ্পান্ন","সাতান্ন","আটান্ন","ঊনষাট","ষাট","একষট্টি","বাষট্টি","তেষট্টি","চৌষট্টি","পঁয়ষট্টি","ছেষট্টি","সাতষট্টি","আটষট্টি","ঊনসত্তর","সত্তর","একাত্তর","বাহাত্তর","তিয়াত্তর","চুয়াত্তর","পঁচাত্তর","ছিয়াত্তর","সাতাত্তর","আটাত্তর","ঊনআশি","আশি","একাশি","বিরাশি","তিরাশি","চুরাশি","পঁচাশি","ছিয়াশি","সাতাশি","অষ্টাশি","ঊননব্বই","নব্বই","একানব্বই","বিরানব্বই","তিরানব্বই","চুরানব্বই","পঁচানব্বই","ছিয়ানব্বই","সাতানব্বই","আটানব্বই","নিরানব্বই","একশো"]);
