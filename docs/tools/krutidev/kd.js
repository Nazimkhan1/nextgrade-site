/*
 * Krutidev 010 <-> Unicode Devanagari converter (NextGrade, own table).
 * Krutidev is a legacy "font hack": Latin keys are drawn as Hindi glyphs, and some glyphs are typed in visual
 * order (the short-i matra "f" comes BEFORE its consonant cluster, the reph "Z" comes AFTER the syllable).
 * We convert glyph strings with a longest-match table, then fix those two re-orderings.
 * Works fully in the browser; nothing is uploaded.
 * The table is our own. While testing, a few key positions (brackets ¼ ½, ? \\, / @, = ¾, ; (, + $, रु #, ऽ ·,
 * quotes) and two glyphs (í = द्द, ) = द्ध) were checked against the facts in the MIT-licensed npm package
 * npm-hindi-converter (by Vineet Verma); none of its code is used here.
 */
(function (root) {
  'use strict';

  // [Krutidev glyph(s), Unicode] — longer glyph sequences must win, so the table is sorted by length below.
  const PAIRS = [
    // independent vowels
    ['vkS', 'औ'], ['vks', 'ओ'], ['vk', 'आ'], ['v', 'अ'], ['bZ', 'ई'], ['b', 'इ'], ['m', 'उ'], ['Å', 'ऊ'], ['_', 'ऋ'], [',s', 'ऐ'], [',', 'ए'],
    // conjunct glyphs and two-key consonants
    ['{k', 'क्ष'], ['{', 'क्ष्'], ['=k', 'त्र'], ['=', 'त्र'], ['K', 'ज्ञ'], ['J', 'श्र'],
    ['Ùk', 'त्त'], ['Ù', 'त्त्'], ['Ì', 'द्द'], ['í', 'द्द'], [')', 'द्ध'], ['|', 'द्य'], ['}', 'द्व'], ['Ø', 'क्र'], ['#', 'रु'], ['·', 'ऽ'],
    ['ª', '्र'], ['z', '्र'],
    // full consonants (two-key ones end in the aa-stroke "k")
    ['[k', 'ख'], ['?k', 'घ'], ['.k', 'ण'], ['Fk', 'थ'], ['/k', 'ध'], ['Hk', 'भ'], ["'k", 'श'], ['"k', 'ष'],
    ['d', 'क'], ['x', 'ग'], ['³', 'ङ'], ['p', 'च'], ['N', 'छ'], ['t', 'ज'], ['>', 'झ'], ['¥', 'ञ'],
    ['V', 'ट'], ['B', 'ठ'], ['M', 'ड'], ['<', 'ढ'], ['r', 'त'], ['n', 'द'], ['u', 'न'], ['i', 'प'], ['Q', 'फ'], ['c', 'ब'],
    ['e', 'म'], [';', 'य'], ['j', 'र'], ['y', 'ल'], ['o', 'व'], ['l', 'स'], ['g', 'ह'],
    // half (dead) consonants
    ['D', 'क्'], ['[', 'ख्'], ['X', 'ग्'], ['?', 'घ्'], ['P', 'च्'], ['T', 'ज्'], ['÷', 'झ्'], ['.', 'ण्'], ['R', 'त्'], ['F', 'थ्'],
    ['/', 'ध्'], ['U', 'न्'], ['I', 'प्'], ['¶', 'फ्'], ['C', 'ब्'], ['H', 'भ्'], ['E', 'म्'], ['¸', 'य्'], ['Y', 'ल्'], ['O', 'व्'],
    ["'", 'श्'], ['"', 'ष्'], ['L', 'स्'],
    // matras and signs
    ['ks', 'ो'], ['kS', 'ौ'], ['k', 'ा'], ['h', 'ी'], ['q', 'ु'], ['w', 'ू'], ['`', 'ृ'], ['s', 'े'], ['S', 'ै'],
    ['a', 'ं'], ['¡', 'ँ'], ['%', 'ः'], ['~', '्'], ['+', '़'],
    // punctuation
    // punctuation: Krutidev moves these to other keys because the usual keys are Hindi letters
    ['AA', '॥'], ['A', '।'], ['-', '.'], [']', ','], ['&', '-'], ['¼', '('], ['½', ')'], ['¾', '='], ['@', '/'], ['\\', '?'], ['(', ';'], ['$', '+'],
    ['^', '‘'], ['*', '’'], ['Þ', '“'], ['ß', '”'],
  ];
  const BY_LEN = PAIRS.slice().sort((a, b) => b[0].length - a[0].length);
  const C = 'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह';
  const CONS = new RegExp(`[${C}]`);

  // ---- Krutidev -> Unicode
  function toUnicode(kd) {
    let out = '';
    for (let i = 0; i < kd.length;) {
      let hit = null;
      // multi-key glyphs first (so "bZ" stays ई), then the two re-ordered marks, then single keys
      for (const [g, u] of BY_LEN) { if (g.length > 1 && kd.startsWith(g, i)) { hit = [g, u]; break; } }
      if (!hit && kd[i] === 'f') { out += '\u0001'; i += 1; continue; } // short-i placeholder, fixed below
      if (!hit && kd[i] === 'Z') { out += '\u0002'; i += 1; continue; } // reph placeholder, fixed below
      if (!hit) for (const [g, u] of BY_LEN) { if (g.length === 1 && kd[i] === g) { hit = [g, u]; break; } }
      if (hit) { out += hit[1]; i += hit[0].length; } else { out += kd[i]; i += 1; }
    }
    // short i: "f" + (half consonants)* + consonant [+ nukta]  ->  cluster + ि
    out = out.replace(new RegExp(`\u0001((?:[${C}]़?्)*[${C}]़?)`, 'g'), '$1ि');
    out = out.replace(/\u0001/g, 'ि');
    // reph: syllable + "Z"  ->  र् + syllable   (the syllable may carry matras and anusvara)
    out = out.replace(new RegExp(`((?:[${C}]़?्)*[${C}]़?[ािीुूृेैोौ]*)\u0002`, 'g'), 'र्$1');
    out = out.replace(/([ािीुूृेैोौं]*)\u0002/g, 'र्$1');
    // "र्" + "ई" written as bZ  -> keep ई (bZ matched first, so nothing to do)
    return out;
  }

  // ---- Unicode -> Krutidev
  const REV = PAIRS.filter(([, u]) => u).map(([g, u]) => [u, g])
    // prefer plain glyphs over special ligatures when writing (half form + full form renders the same)
    // द has no half glyph, so its conjuncts use the font's own glyphs; others are written as half + full form
    .filter(([u, g]) => (!['त्त', 'त्त्', 'क्र', '्र'].includes(u) || g === 'z') && g !== '=' && g !== 'í')
    .sort((a, b) => b[0].length - a[0].length);
  function toKrutidev(uni) {
    let s = uni.normalize('NFC');
    // split precomposed nukta letters into letter + nukta
    s = s.replace(/[क़ख़ग़ज़ड़ढ़फ़य़]/g, (ch) => ch.normalize('NFD'));
    // reph: र् + cluster (+ matras/anusvara)  ->  cluster + matras + "Z" marker, before glyph mapping
    s = s.replace(new RegExp(`र्((?:[${C}]़?्)*[${C}]़?)([ािीुूृेैोौ]*)([ंँ]?)`, 'g'), '$1$2\u0002$3');
    // short i: cluster + ि  ->  "f" marker + cluster
    s = s.replace(new RegExp(`((?:[${C}]़?्)*[${C}]़?)ि`, 'g'), '\u0001$1');
    // subscript ra: consonant + ्र -> consonant + "z" (त्र and श्र have their own glyphs)
    s = s.replace(/([कखगघङचछजझञटठडढणथदधनपफबभमयलवषसह]़?)्र/g, '$1\u0003');
    let out = '';
    for (let i = 0; i < s.length;) {
      if (s[i] === '\u0001') { out += 'f'; i += 1; continue; }
      if (s[i] === '\u0002') { out += 'Z'; i += 1; continue; }
      if (s[i] === '\u0003') { out += 'z'; i += 1; continue; }
      let hit = null;
      for (const [u, g] of REV) { if (s.startsWith(u, i)) { hit = [u, g]; break; } }
      if (hit) { out += hit[1]; i += hit[0].length; } else { out += s[i]; i += 1; }
    }
    return out;
  }

  // Krutidev text that is left over after conversion (Latin letters or symbols): old glyphs this table does not know
  function unknownGlyphs(unicodeOut) { return [...new Set((unicodeOut.match(/[A-Za-z\u00A1-\u00FF\u0152\u0153\u0160\u0161\u0178\u0192\u02C6\u02DC\u2013\u2014\u2020-\u2022\u2026\u2030\u2039\u203A\u2122]/g) || []))]; }
  const api = { toUnicode, toKrutidev, unknownGlyphs, PAIRS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.KD = api;
})(typeof window !== 'undefined' ? window : globalThis);
