/* Discount calculator. Live: final price and amount saved. */
(function () {
  'use strict';
  var form = document.getElementById('disc');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang || 'en';
  var money = function (n) { return isFinite(n) ? n.toLocaleString(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'; };
  function calc() {
    var price = parseFloat($('disc-price').value);
    var pct = parseFloat($('disc-pct').value);
    if (isNaN(price) || isNaN(pct)) { $('disc-final').textContent = '—'; $('disc-saved').textContent = '—'; return; }
    var saved = price * pct / 100;
    $('disc-final').textContent = money(price - saved);
    $('disc-saved').textContent = money(saved);
  }
  form.addEventListener('input', calc);
  calc();
})();
