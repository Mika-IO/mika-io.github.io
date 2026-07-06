/* Live text statistics. Counts update as you type. Language-aware word counting. */
(function () {
  'use strict';
  var ta = document.getElementById('wc-input');
  if (!ta) return;
  var $ = function (id) { return document.getElementById(id); };
  var CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g;
  var lang = document.documentElement.lang || 'en';

  function countWords(t) {
    var cjk = (t.match(CJK) || []).length;
    var rest = (t.replace(CJK, ' ').match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
    return cjk + rest;
  }
  function update() {
    var t = ta.value;
    var words = countWords(t);
    var chars = t.length;
    var noSpace = t.replace(/\s/g, '').length;
    var sentences = (t.match(/[^\s.!?。！？…]+[.!?。！？…]+/g) || []).length || (t.trim() ? 1 : 0);
    var paras = t.split(/\n{2,}/).filter(function (p) { return p.trim().length; }).length;
    var mins = Math.max(1, Math.round(words / 200)) ;
    $('wc-words').textContent = words.toLocaleString(lang);
    $('wc-characters').textContent = chars.toLocaleString(lang);
    $('wc-nospace').textContent = noSpace.toLocaleString(lang);
    $('wc-sentences').textContent = sentences.toLocaleString(lang);
    $('wc-paragraphs').textContent = paras.toLocaleString(lang);
    $('wc-reading').textContent = words ? mins.toLocaleString(lang) : '0';
  }
  ta.addEventListener('input', update);
  update();
})();
