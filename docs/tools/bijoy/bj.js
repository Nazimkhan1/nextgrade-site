/*
 * Bijoy (SutonnyMJ) <-> Unicode Bangla converter for nextgrade.in/tools/bijoy/. Works in the browser; nothing is uploaded.
 *
 * Bijoy -> Unicode: the code between the "bijoy2unicode" markers is bijoy2unicode 1.0.2 (npm, dist/index.cjs) by
 * Md. Jehad (Jehadur Rahman Emran), https://github.com/JehadurRE/Bijoy2Unicode, used unchanged under the MIT License:
 *
 * MIT License
 *
 * Copyright (c) 2026 Md. Jehad (Jehadur Rahman Emran)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This is an original implementation in TypeScript with significant additions
 * and corrections, including (but not limited to):
 *   - Trailing reph reorder (handles `Kg©KZ©vi` → কর্মকর্তার end-of-syllable case)
 *   - `Í` (U+00CD) Sutonny MJ alternate mapping for ন্ত / স্ত / ক্ত conjuncts
 *   - Multi-character sequence handling (`iæ → রু`, `Mø → গ্ল`, etc.)
 *   - `ÿ → ক্ষ` alternate Sutonny MJ encoding
 *   - Precomposed nukta letters (ড়/ঢ়/য়) preserved per Word/Office convention
 *   - Font-aware detection across run / paragraph / style / docDefaults
 *
 * Inspired by prior open-source Bijoy converters, notably:
 *   - Mad-FOX/bijoy2unicode (Python)
 *   - bnwebtools / nishiafia/bijoytounicodeconverter (PHP/JS)
 *
 * Unicode -> Bijoy (below the markers) is NextGrade's own code, written on top of the same glyph table.
 */
(function (root) {
  'use strict';
  // ---- bijoy2unicode 1.0.2 (MIT) ----
  // src/core.ts
  var buildMap = (raw) => Object.entries(raw).map(([k, v]) => [
    new RegExp(escapeForRegex(k), "g"),
    v
  ]);
  function escapeForRegex(literal) {
    return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  var preConversionMap = buildMap({
    "  ": " ",
    yy: "y",
    vv: "v",
    "\xAD\xAD": "\xAD",
    "y&": "y",
    "\u201E&": "\u201E",
    "\u2021u": "u\u2021",
    wu: "uw",
    " ,": ",",
    " |": "|",
    "\\ ": "",
    " \\": "",
    "\\": "",
    "\n ": "\n",
    " \n": "\n",
    "\n\n\n\n\n": "\n\n",
    "\n\n\n\n": "\n\n",
    "\n\n\n": "\n\n"
  });
  var conversionMap = buildMap({
    // ---- Multi-character sequences first ----
    // These must run before the single-byte mappings below, otherwise the
    // single-byte mapping on the second char of a sequence would consume
    // it (e.g. `iæ` → `রু` must match before `æ` → `ু`).
    // Some entries are inherited from earlier converters; many are original
    // additions for real-world Sutonny MJ documents.
    "i\xE6": "\u09B0\u09C1",
    "i\u201C": "\u09B0\u09C1",
    // ru with smart-quote variant
    "i\u0192": "\u09B0\u09C2",
    // rū
    "M\xF8": "\u0997\u09CD\u09B2",
    "\u201DQ\xA6": "\u099A\u09CD\u099B\u09CD\u09AC",
    "c\xF8": "\u09AA\u09CD\u09B2",
    "e\xF8": "\u09AC\u09CD\u09B2",
    "k\xF8": "\u09B6\u09CD\u09B2",
    "\xA4\xF8": "\u09AE\u09CD\u09B2",
    "\xAF\xF8": "\u09B8\u09CD\u09B2",
    "\xE5\u201C": "\u09AD\u09CD\u09B0\u09C1",
    // 'Í' (U+00CD) is a Sutonny MJ alternate for '—' (em-dash) used in
    // ন্ত / স্ত / ক্ত style conjuncts. Map every prefix-pair first, then the
    // remaining bare 'Í' falls through to the single-byte map below.
    "\xAF\xCD": "\u09B8\u09CD\u09A4",
    // ¯Í -> স্ত
    "\u0161\xCD": "\u09A8\u09CD\u09A4",
    // šÍ -> ন্ত
    "\xAF\xCD\xA1": "\u09B8\u09CD\u09A4\u09CD\u09AC",
    // ¯Í¡ -> স্ত্ব
    "\u0161\xCD\xA1": "\u09A8\u09CD\u09A4\u09CD\u09AC",
    // šÍ¡ -> ন্ত্ব
    "\xCB\xA1": "\u09A4\u09CD\u09A4\u09CD\u09AC",
    // Ë¡ overrides the single-byte Ë mapping
    "\\\\": "\u0965",
    // ---- Vowels (Av must come before A) ----
    Av: "\u0986",
    A: "\u0985",
    B: "\u0987",
    C: "\u0988",
    D: "\u0989",
    E: "\u098A",
    F: "\u098B",
    G: "\u098F",
    H: "\u0990",
    I: "\u0993",
    J: "\u0994",
    // Consonants
    K: "\u0995",
    L: "\u0996",
    M: "\u0997",
    N: "\u0998",
    O: "\u0999",
    P: "\u099A",
    Q: "\u099B",
    R: "\u099C",
    S: "\u099D",
    T: "\u099E",
    U: "\u099F",
    V: "\u09A0",
    W: "\u09A1",
    X: "\u09A2",
    Y: "\u09A3",
    Z: "\u09A4",
    _: "\u09A5",
    "`": "\u09A6",
    a: "\u09A7",
    b: "\u09A8",
    c: "\u09AA",
    d: "\u09AB",
    e: "\u09AC",
    f: "\u09AD",
    g: "\u09AE",
    h: "\u09AF",
    i: "\u09B0",
    j: "\u09B2",
    k: "\u09B6",
    l: "\u09B7",
    m: "\u09B8",
    n: "\u09B9",
    o: "\u09DC",
    // ড় (precomposed)
    p: "\u09DD",
    // ঢ় (precomposed)
    q: "\u09DF",
    // য় (precomposed)
    r: "\u09CE",
    s: "\u0982",
    t: "\u0983",
    u: "\u0981",
    // Numbers
    "0": "\u09E6",
    "1": "\u09E7",
    "2": "\u09E8",
    "3": "\u09E9",
    "4": "\u09EA",
    "5": "\u09EB",
    "6": "\u09EC",
    "7": "\u09ED",
    "8": "\u09EE",
    "9": "\u09EF",
    // Kars
    "\u2022": "\u0999\u09CD",
    v: "\u09BE",
    w: "\u09BF",
    x: "\u09C0",
    y: "\u09C1",
    z: "\u09C1",
    "\u201C": "\u09C1",
    "\u2013": "\u09C1",
    "~": "\u09C2",
    "\u0192": "\u09C2",
    "\u201A": "\u09C2",
    "\u201E\u201E": "\u09C3",
    "\u201E": "\u09C3",
    "\u2026": "\u09C3",
    "\u2020": "\u09C7",
    "\u2021": "\u09C7",
    "\u02C6": "\u09C8",
    "\u2030": "\u09C8",
    "\u0160": "\u09D7",
    "|": "\u0964",
    "&": "\u09CD\u200C",
    // Conjuncts
    "^": "\u09CD\u09AC",
    "\u2018": "\u09CD\u09A4\u09C1",
    "\u2019": "\u09CD\u09A5",
    "\u2039": "\u09CD\u0995",
    "\u0152": "\u09CD\u0995\u09CD\u09B0",
    "\u201D": "\u099A\u09CD",
    "\u2014": "\u09CD\u09A4",
    "\u02DC": "\u09A6\u09CD",
    "\u2122": "\u09A6\u09CD",
    "\u0161": "\u09A8\u09CD",
    "\u203A": "\u09A8\u09CD",
    "\u0153": "\u09CD\u09A8",
    "\u0178": "\u09CD\u09AC",
    "\xA1": "\u09CD\u09AC",
    "\xA2": "\u09CD\u09AD",
    "\xA3": "\u09CD\u09AD\u09CD\u09B0",
    "\xA4": "\u09AE\u09CD",
    "\xA5": "\u09CD\u09AE",
    "\xA6": "\u09CD\u09AC",
    "\xA7": "\u09CD\u09AE",
    "\xA8": "\u09CD\u09AF",
    "\xA9": "\u09B0\u09CD",
    "\xAA": "\u09CD\u09B0",
    "\xAB": "\u09CD\u09B0",
    "\xAC": "\u09CD\u09B2",
    "\xAD": "\u09CD\u09B2",
    "\xAE": "\u09B7\u09CD",
    "\xAF": "\u09B8\u09CD",
    "\xB0": "\u0995\u09CD\u0995",
    "\xB1": "\u0995\u09CD\u099F",
    "\xB2": "\u0995\u09CD\u09B7\u09CD\u09A3",
    "\xB3": "\u0995\u09CD\u09A4",
    "\xB4": "\u0995\u09CD\u09AE",
    "\xB5": "\u0995\u09CD\u09B0",
    "\xB6": "\u0995\u09CD\u09B7",
    "\xB7": "\u0995\u09CD\u09B8",
    "\xB8": "\u0997\u09C1",
    "\xB9": "\u099C\u09CD\u099E",
    "\xBA": "\u0997\u09CD\u09A6",
    "\xBB": "\u0997\u09CD\u09A7",
    "\xBC": "\u0999\u09CD\u0995",
    "\xBD": "\u0999\u09CD\u0997",
    "\xBE": "\u099C\u09CD\u099C",
    "\xBF": "\u09CD\u09A4\u09CD\u09B0",
    "\xC0": "\u099C\u09CD\u099D",
    "\xC1": "\u099C\u09CD\u099E",
    "\xC2": "\u099E\u09CD\u099A",
    "\xC3": "\u099E\u09CD\u099B",
    "\xC4": "\u099E\u09CD\u099C",
    "\xC5": "\u099E\u09CD\u099D",
    "\xC6": "\u099F\u09CD\u099F",
    "\xC7": "\u09A1\u09CD\u09A1",
    "\xC8": "\u09A3\u09CD\u099F",
    "\xC9": "\u09A3\u09CD\u09A0",
    "\xCA": "\u09A3\u09CD\u09A1",
    "\xCB": "\u09A4\u09CD\u09A4",
    "\xCC": "\u09A4\u09CD\u09A5",
    "\xCD": "\u09A4\u09CD\u09AE",
    "\xCE": "\u09A4\u09CD\u09B0",
    "\xCF": "\u09A6\u09CD\u09A6",
    "\xD0": "-",
    "\xD1": "-",
    "\xD2": '"',
    "\xD3": '"',
    "\xD4": "'",
    "\xD5": "'",
    "\xD6": "\u09CD\u09B0",
    "\xD7": "\u09A6\u09CD\u09A7",
    "\xD8": "\u09A6\u09CD\u09AC",
    "\xD9": "\u09A6\u09CD\u09AE",
    "\xDA": "\u09A8\u09CD\u09A0",
    "\xDB": "\u09A8\u09CD\u09A1",
    "\xDC": "\u09A8\u09CD\u09A7",
    "\xDD": "\u09A8\u09CD\u09B8",
    "\xDE": "\u09AA\u09CD\u099F",
    "\xDF": "\u09AA\u09CD\u09A4",
    "\xE0": "\u09AA\u09CD\u09AA",
    "\xE1": "\u09AA\u09CD\u09B8",
    "\xE2": "\u09AC\u09CD\u099C",
    "\xE3": "\u09AC\u09CD\u09A6",
    "\xE4": "\u09AC\u09CD\u09A7",
    "\xE5": "\u09AD\u09CD\u09B0",
    "\xE6": "\u09C1",
    // æ — u-kar variant (matches Sutonny MJ usage and bnwebtools).
    // The rare ম্ন conjunct uses other byte sequences (e.g. gœ).
    "\xE7": "\u09AE\u09CD\u09AB",
    "\xE8": "\u09CD\u09A8",
    "\xE9": "\u09B2\u09CD\u0995",
    "\xEA": "\u09B2\u09CD\u0997",
    "\xEB": "\u09B2\u09CD\u099F",
    "\xEC": "\u09B2\u09CD\u09A1",
    "\xED": "\u09B2\u09CD\u09AA",
    "\xEE": "\u09B2\u09CD\u09AB",
    "\xEF": "\u09B6\u09C1",
    "\xF0": "\u09B6\u09CD\u099A",
    "\xF1": "\u09B6\u09CD\u099B",
    "\xF2": "\u09B7\u09CD\u09A3",
    "\xF3": "\u09B7\u09CD\u099F",
    "\xF4": "\u09B7\u09CD\u09A0",
    "\xF5": "\u09B7\u09CD\u09AB",
    "\xF6": "\u09B8\u09CD\u0996",
    "\xF7": "\u09B8\u09CD\u099F",
    "\xF8": "\u09B8\u09CD\u09A8",
    "\xF9": "\u09B8\u09CD\u09AB",
    "\xFA": "\u09CD\u09AA",
    "\xFB": "\u09B9\u09C1",
    "\xFC": "\u09B9\u09C3",
    "\xFD": "\u09B9\u09CD\u09A8",
    "\xFE": "\u09B9\u09CD\u09AE",
    // ---- Additional real-world Bijoy / Sutonny MJ encodings (alternate `ÿ`,
    // etc.). Single-byte additions only — multi-char sequences are at the top
    // of this map.
    "\xFF": "\u0995\u09CD\u09B7"
    // ÿ alternate code for ক্ষ (kkho)
  });
  var proConversionMap = buildMap({
    "\u09CD\u09CD": "\u09CD"
  });
  var postConversionMap = buildMap({
    "\u09E6\u0983": "\u09E6:",
    "\u09E7\u0983": "\u09E7:",
    "\u09E8\u0983": "\u09E8:",
    "\u09E9\u0983": "\u09E9:",
    "\u09EA\u0983": "\u09EA:",
    "\u09EB\u0983": "\u09EB:",
    "\u09EC\u0983": "\u09EC:",
    "\u09ED\u0983": "\u09ED:",
    "\u09EE\u0983": "\u09EE:",
    "\u09EF\u0983": "\u09EF:",
    " \u0983": ":",
    "\n\u0983": "\n:",
    "]\u0983": "]:",
    "[\u0983": "[:",
    "  ": " ",
    "\u0985\u09BE": "\u0986",
    "\u09CD\u200C\u09CD\u200C": "\u09CD\u200C"
  });
  function applyMap(text, map) {
    let out = text;
    for (const [pattern, replacement] of map) {
      out = out.replace(pattern, replacement);
    }
    return out;
  }
  var HALANT = "\u09CD";
  function isBanglaPreKar(c) {
    return c === "\u09BF" || c === "\u09C8" || c === "\u09C7";
  }
  function isBanglaPostKar(c) {
    return c === "\u09BE" || c === "\u09CB" || c === "\u09CC" || c === "\u09D7" || c === "\u09C1" || c === "\u09C2" || c === "\u09C0" || c === "\u09C3";
  }
  function isBanglaKar(c) {
    return isBanglaPreKar(c) || isBanglaPostKar(c);
  }
  function isBanglaBanjonborno(c) {
    if (!c) return false;
    return "\u0995\u0996\u0997\u0998\u0999\u099A\u099B\u099C\u099D\u099E\u099F\u09A0\u09A1\u09A2\u09A3\u09A4\u09A5\u09A6\u09A7\u09A8\u09AA\u09AB\u09AC\u09AD\u09AE\u09AF\u09B0\u09B2\u09B6\u09B7\u09B8\u09B9".includes(c) || c === "\u09A1\u09BC" || // U+09DC
    c === "\u09A2\u09BC" || // U+09DD
    c === "\u09AF\u09BC" || // U+09DF
    c === "\u09CE" || c === "\u0982" || c === "\u0983" || c === "\u0981";
  }
  function isBanglaNukta(c) {
    return c === "\u0981";
  }
  function isBanglaHalant(c) {
    return c === HALANT;
  }
  function isSpace(c) {
    return c === " " || c === "	" || c === "\n" || c === "\r";
  }
  function charAt(s, i) {
    if (i < 0 || i >= s.length) return "";
    return s.charAt(i);
  }
  function rearrange(input) {
    let str = input;
    let i = 0;
    while (i < str.length) {
      if (i < str.length - 1 && charAt(str, i) === "\u09B0" && isBanglaHalant(charAt(str, i + 1)) && isBanglaHalant(charAt(str, i - 1))) {
        let j = 1;
        while (true) {
          if (i - j < 0) break;
          if (isBanglaBanjonborno(charAt(str, i - j)) && isBanglaHalant(charAt(str, i - j - 1))) {
            j += 2;
          } else if (j === 1 && isBanglaKar(charAt(str, i - j))) {
            j += 1;
          } else {
            break;
          }
        }
        str = str.slice(0, i - j) + charAt(str, i) + charAt(str, i + 1) + str.slice(i - j, i) + str.slice(i + 2);
        i += 1;
        continue;
      }
      i += 1;
    }
    i = 0;
    while (i < str.length - 1) {
      if (charAt(str, i) === "\u09B0" && isBanglaHalant(charAt(str, i + 1)) && i > 0 && // Previous char must be a banjonborno that does NOT itself form a
      // halanted conjunct head (otherwise it's `র + ্ + halant` and the
      // first pass already handled it).
      isBanglaBanjonborno(charAt(str, i - 1)) && !isBanglaHalant(charAt(str, i - 2)) && // The reph must be at end of cluster — meaning the next char after
      // the halant must NOT be the start of a new halanted conjunct.
      // Specifically, block only if (i+2, i+3) is consonant + halant —
      // that pattern means the reph is genuinely in the middle of a
      // multi-consonant cluster and should be left alone.
      !(isBanglaBanjonborno(charAt(str, i + 2)) && isBanglaHalant(charAt(str, i + 3)))) {
        let j = 1;
        while (true) {
          if (i - j - 1 < 0) break;
          if (isBanglaBanjonborno(charAt(str, i - j - 1)) && isBanglaHalant(charAt(str, i - j))) {
            j += 2;
          } else {
            break;
          }
        }
        str = str.slice(0, i - j) + charAt(str, i) + // র
        charAt(str, i + 1) + // halant
        str.slice(i - j, i) + // the cluster
        str.slice(i + 2);
        i += 2;
        continue;
      }
      i += 1;
    }
    str = applyMap(str, proConversionMap);
    i = 0;
    while (i < str.length) {
      if (i < str.length - 1 && charAt(str, i) === "\u09B0" && isBanglaHalant(charAt(str, i + 1)) && !isBanglaHalant(charAt(str, i - 1)) && isBanglaHalant(charAt(str, i + 2))) {
        let j = 1;
        while (true) {
          if (i - j < 0) break;
          if (isBanglaBanjonborno(charAt(str, i - j)) && isBanglaHalant(charAt(str, i - j - 1))) {
            j += 2;
          } else if (j === 1 && isBanglaKar(charAt(str, i - j))) {
            j += 1;
          } else {
            break;
          }
        }
        str = str.slice(0, i - j) + charAt(str, i) + charAt(str, i + 1) + str.slice(i - j, i) + str.slice(i + 2);
        i += 1;
        continue;
      }
      if (i > 0 && charAt(str, i) === HALANT && (isBanglaKar(charAt(str, i - 1)) || isBanglaNukta(charAt(str, i - 1))) && i < str.length - 1) {
        str = str.slice(0, i - 1) + charAt(str, i) + charAt(str, i + 1) + charAt(str, i - 1) + str.slice(i + 2);
      }
      if (i > 0 && i < str.length - 1 && charAt(str, i) === HALANT && charAt(str, i - 1) === "\u09B0" && charAt(str, i - 2) !== HALANT && isBanglaKar(charAt(str, i + 1))) {
        str = str.slice(0, i - 1) + charAt(str, i + 1) + charAt(str, i - 1) + charAt(str, i) + str.slice(i + 2);
      }
      if (i < str.length - 1 && isBanglaPreKar(charAt(str, i)) && !isSpace(charAt(str, i + 1))) {
        let temp = str.slice(0, i);
        let j = 1;
        while (i + j < str.length - 1 && isBanglaBanjonborno(charAt(str, i + j))) {
          if (i + j < str.length && isBanglaHalant(charAt(str, i + j + 1))) {
            j += 2;
          } else {
            break;
          }
        }
        temp += str.slice(i + 1, i + j + 1);
        let l = 0;
        if (charAt(str, i) === "\u09C7" && charAt(str, i + j + 1) === "\u09BE") {
          temp += "\u09CB";
          l = 1;
        } else if (charAt(str, i) === "\u09C7" && charAt(str, i + j + 1) === "\u09D7") {
          temp += "\u09CC";
          l = 1;
        } else {
          temp += charAt(str, i);
        }
        temp += str.slice(i + j + l + 1);
        str = temp;
        i += j;
      }
      if (i < str.length - 1 && isBanglaNukta(charAt(str, i)) && isBanglaPostKar(charAt(str, i + 1))) {
        str = str.slice(0, i) + charAt(str, i + 1) + charAt(str, i) + str.slice(i + 2);
      }
      i += 1;
    }
    return str;
  }
  function convertBijoyToUnicode(src) {
    if (!src) return src;
    let out = applyMap(src, preConversionMap);
    out = applyMap(out, conversionMap);
    out = rearrange(out);
    out = applyMap(out, postConversionMap);
    return out;
  }
  function scanUnmapped(unicodeText) {
    const out = /* @__PURE__ */ new Map();
    if (!unicodeText) return out;
    for (const ch of unicodeText) {
      if (isSuspiciousLeftover(ch)) {
        out.set(ch, (out.get(ch) ?? 0) + 1);
      }
    }
    return out;
  }
  function isSuspiciousLeftover(ch) {
    const code = ch.codePointAt(0);
    if (code >= 2432 && code <= 2559) return false;
    if (code >= 32 && code <= 126) return false;
    if (code === 9 || code === 10 || code === 13) return false;
    if (code === 8204 || code === 8205) return false;
    if (code === 2404 || code === 2405) return false;
    if (code >= 128 && code <= 591) return true;
    if (code >= 8208 && code <= 8250) return true;
    if (code === 338 || code === 339 || code === 352 || code === 353) return true;
    return false;
  }
  function describeCodepoint(ch) {
    const cp = ch.codePointAt(0);
    return "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
  }
  function looksLikeBijoy(text) {
    if (!text) return false;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 128 && code <= 591) return true;
      if (code >= 8208 && code <= 8250) return true;
    }
    return false;
  }
  function hasBengaliUnicode(text) {
    if (!text) return false;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 2432 && code <= 2559) return true;
    }
    return false;
  }
  function shouldConvertAsBijoy(text, fontIsBijoy) {
    if (!text) return false;
    if (fontIsBijoy === true) return true;
    if (fontIsBijoy === false) return false;
    if (hasBengaliUnicode(text)) return false;
    return looksLikeBijoy(text);
  }
  // ---- end bijoy2unicode ----

  // ---------------------------------------------------------------------------------------------
  // Unicode -> Bijoy (SutonnyMJ): NextGrade's own code, built on the glyph table above.
  // Text is cut into syllables: [reph র্] consonant cluster [vowel signs] [ং ঃ ঁ]. Each cluster is written
  // with the longest conjunct glyph, then half forms / below-forms, and finally the Bijoy typing order:
  // pre-kar (ি ে ৈ) first, reph "©" right after the consonants, ো = ে…া and ৌ = ে…ৗ split around the cluster.
  // ---------------------------------------------------------------------------------------------
  var H = '্';
  var CONS = 'কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ\u09DC\u09DD\u09DF';
  var isCons = function (c) { return !!c && CONS.indexOf(c) >= 0; };
  // preferred Bijoy key for each Unicode piece (first wins)
  var REV = {};
  var put = function (u, b) { if (!(u in REV)) REV[u] = b; };
  [['আ', 'Av'], ['অ', 'A'], ['ই', 'B'], ['ঈ', 'C'], ['উ', 'D'], ['ঊ', 'E'], ['ঋ', 'F'], ['এ', 'G'], ['ঐ', 'H'], ['ও', 'I'], ['ঔ', 'J'],
    ['ক', 'K'], ['খ', 'L'], ['গ', 'M'], ['ঘ', 'N'], ['ঙ', 'O'], ['চ', 'P'], ['ছ', 'Q'], ['জ', 'R'], ['ঝ', 'S'], ['ঞ', 'T'], ['ট', 'U'], ['ঠ', 'V'],
    ['ড', 'W'], ['ঢ', 'X'], ['ণ', 'Y'], ['ত', 'Z'], ['থ', '_'], ['দ', '`'], ['ধ', 'a'], ['ন', 'b'], ['প', 'c'], ['ফ', 'd'], ['ব', 'e'], ['ভ', 'f'],
    ['ম', 'g'], ['য', 'h'], ['র', 'i'], ['ল', 'j'], ['শ', 'k'], ['ষ', 'l'], ['স', 'm'], ['হ', 'n'], ['\u09DC', 'o'], ['\u09DD', 'p'], ['\u09DF', 'q'],
    ['ৎ', 'r'], ['ং', 's'], ['ঃ', 't'], ['ঁ', 'u'], ['া', 'v'], ['ি', 'w'], ['ী', 'x'], ['ু', 'y'], ['ূ', '~'], ['ৃ', '…'], ['ে', '‡'], ['ৈ', '‰'], ['ৗ', 'Š'],
    ['।', '|'], ['॥', '||'],
    ['০', '0'], ['১', '1'], ['২', '2'], ['৩', '3'], ['৪', '4'], ['৫', '5'], ['৬', '6'], ['৭', '7'], ['৮', '8'], ['৯', '9'],
    // conjunct glyphs (whole clusters)
    ['ক্ষ্ণ', '²'], ['ক্ক', '°'], ['ক্ট', '±'], ['ক্ত', '³'], ['ক্ম', '´'], ['ক্র', 'µ'], ['ক্ষ', 'ÿ'], ['ক্স', '·'], ['গ্দ', 'º'], ['গ্ধ', '»'],
    ['ঙ্ক', '¼'], ['ঙ্গ', '½'], ['জ্জ', '¾'], ['জ্ঝ', 'À'], ['জ্ঞ', 'Á'], ['ঞ্চ', 'Â'], ['ঞ্ছ', 'Ã'], ['ঞ্জ', 'Ä'], ['ঞ্ঝ', 'Å'], ['ট্ট', 'Æ'],
    ['ড্ড', 'Ç'], ['ণ্ট', 'È'], ['ণ্ঠ', 'É'], ['ণ্ড', 'Ê'], ['ত্ত', 'Ë'], ['ত্থ', 'Ì'], ['ত্ম', 'Í'], ['ত্র', 'Î'], ['দ্দ', 'Ï'], ['দ্ধ', '×'],
    ['দ্ব', 'Ø'], ['দ্ম', 'Ù'], ['ন্ঠ', 'Ú'], ['ন্ড', 'Û'], ['ন্ধ', 'Ü'], ['ন্স', 'Ý'], ['প্ট', 'Þ'], ['প্ত', 'ß'], ['প্প', 'à'], ['প্স', 'á'],
    ['ব্জ', 'â'], ['ব্দ', 'ã'], ['ব্ধ', 'ä'], ['ভ্র', 'å'], ['ম্ফ', 'ç'], ['ল্ক', 'é'], ['ল্গ', 'ê'], ['ল্ট', 'ë'], ['ল্ড', 'ì'], ['ল্প', 'í'],
    ['ল্ফ', 'î'], ['শ্চ', 'ð'], ['শ্ছ', 'ñ'], ['ষ্ণ', 'ò'], ['ষ্ট', 'ó'], ['ষ্ঠ', 'ô'], ['ষ্ফ', 'õ'], ['স্খ', 'ö'], ['স্ট', '÷'], ['স্ন', 'ø'],
    ['স্ফ', 'ù'], ['হ্ন', 'ý'], ['হ্ম', 'þ'], ['স্ত', '¯Í'], ['ন্ত', 'šÍ'],
    // half forms (consonant + hasanta) and below-forms (hasanta + consonant)
    ['ঙ্', '•'], ['চ্', '”'], ['দ্', '˜'], ['ন্', 'š'], ['ম্', '¤'], ['ষ্', '®'], ['স্', '¯'],
    ['্ক্র', 'Œ'], ['্ত্র', '¿'], ['্ভ্র', '£'], ['্তু', '‘'], ['্ব', '^'], ['্থ', '’'], ['্ক', '‹'], ['্ত', '—'], ['্ন', 'œ'], ['্ভ', '¢'],
    ['্ম', '¥'], ['্য', '¨'], ['্র', 'ª'], ['্ল', '¬'], ['্প', 'ú']
  ].forEach(function (p) { put(p[0], p[1]); });
  // consonant + u/uu/ri special glyphs
  var UGLYPH = { 'রু': 'iæ', 'রূ': 'iƒ', 'গু': '¸', 'শু': 'ï', 'হু': 'û', 'হৃ': 'ü' };
  var keysBy = function (pred) { return Object.keys(REV).filter(pred).sort(function (a, b) { return b.length - a.length; }); };
  var FULL = keysBy(function (u) { return u.length >= 3 && isCons(u[0]) && u[u.length - 1] !== H; });
  var BELOW = keysBy(function (u) { return u[0] === H; });

  // one consonant cluster (array of consonants joined by hasanta) -> Bijoy glyphs
  function clusterToBijoy(cs) {
    var out = '', i = 0, fresh = true;
    var str = function (a, b) { return cs.slice(a, b).join(H); };
    while (i < cs.length) {
      var hit = null;
      if (!fresh) { // below-forms for the following consonants
        for (var k = 0; k < BELOW.length && !hit; k++) {
          var parts = BELOW[k].split(H).filter(Boolean);
          if (str(i, i + parts.length) === parts.join(H) && parts.every(function (p) { return p.length === 1; })) hit = [BELOW[k], parts.length];
        }
        if (hit) { out += REV[hit[0]]; i += hit[1]; fresh = false; continue; }
      }
      for (var n = cs.length - i; n >= 2 && !hit; n--) { var s = str(i, i + n); if (FULL.indexOf(s) >= 0) hit = [s, n]; }
      if (hit) { out += REV[hit[0]]; i += hit[1]; fresh = false; continue; }
      var c = cs[i];
      if (i < cs.length - 1) {
        var nextBelow = BELOW.some(function (b) { return b === H + cs[i + 1]; });
        var phala = cs[i + 1] === 'র' || cs[i + 1] === 'য';
        if ((!nextBelow || !phala) && REV[c + H]) { out += REV[c + H]; i += 1; fresh = !nextBelow; continue; } // half form; a following below-form attaches to it
        out += REV[c] || c;
        if (!nextBelow) out += '&'; // explicit hasanta when no glyph exists
        i += 1; if (!nextBelow) { out += REV[cs[i]] || cs[i]; i += 1; }
        fresh = false; continue;
      }
      out += REV[c] || c; i += 1; fresh = false;
    }
    return out;
  }

  function convertUnicodeToBijoy(src) {
    if (!src) return src;
    var s = src.normalize('NFC').replace(/\u09A1\u09BC/g, '\u09DC').replace(/\u09A2\u09BC/g, '\u09DD').replace(/\u09AF\u09BC/g, '\u09DF')
      .replace(/ো/g, 'ো').replace(/ৌ/g, 'ৌ').replace(/‌|‍/g, '');
    var out = '', i = 0;
    while (i < s.length) {
      var ch = s[i];
      var reph = false, start = i;
      if (ch === 'র' && s[i + 1] === H && isCons(s[i + 2])) { reph = true; i += 2; }
      if (!isCons(s[i])) {
        if (reph) { out += '©'; continue; }
        out += REV[ch] !== undefined ? REV[ch] : ch; i += 1; continue;
      }
      var cs = [s[i]]; i += 1;
      while (s[i] === H && isCons(s[i + 1])) { cs.push(s[i + 1]); i += 2; }
      var trailingH = false;
      if (s[i] === H) { trailingH = true; i += 1; }
      var kars = '';
      while (i < s.length && 'ািীুূৃেৈোৌ'.indexOf(s[i]) >= 0) { kars += s[i]; i += 1; }
      var marks = '';
      while (i < s.length && 'ংঃঁ'.indexOf(s[i]) >= 0) { marks += s[i]; i += 1; }
      var pre = '', post = '', body, atStart = start === 0 || !/[ঀ-৿]/.test(s[start - 1]);
      var k1 = kars[0] || '';
      var single = cs.length === 1 && (cs[0] + k1) in UGLYPH;
      if (single) { body = UGLYPH[cs[0] + k1]; kars = kars.slice(1); } else body = clusterToBijoy(cs);
      if (reph) body += '©';
      if (trailingH) body += '&';
      for (var j = 0; j < kars.length; j++) {
        var k = kars[j];
        var E = atStart ? '†' : '‡', AI = atStart ? 'ˆ' : '‰';
        if (k === 'ি') pre += 'w'; else if (k === 'ে') pre += E; else if (k === 'ৈ') pre += AI;
        else if (k === 'ো') { pre += E; post += 'v'; } else if (k === 'ৌ') { pre += E; post += 'Š'; }
        else post += REV[k];
      }
      out += pre + body + post + marks.split('').map(function (m) { return REV[m]; }).join('');
      if (start === i) i += 1;
    }
    return out;
  }

  function unknownGlyphs(unicodeText) { return Array.from(scanUnmapped(unicodeText).keys()); }
  root.BJ = { toUnicode: convertBijoyToUnicode, toBijoy: convertUnicodeToBijoy, unknownGlyphs: unknownGlyphs, looksLikeBijoy: looksLikeBijoy };
})(typeof window !== 'undefined' ? window : globalThis);
