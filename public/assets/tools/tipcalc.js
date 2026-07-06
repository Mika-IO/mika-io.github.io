/* Tip calculator. Live: tip amount, total, and per-person split. */
(function () {
  'use strict';
  var form = document.getElementById('tip');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang || 'en';
  var money = function (n) { return isFinite(n) ? n.toLocaleString(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'; };
  var pctBtns = form.querySelectorAll('[data-tip]');
  function setPct(v) { $('tip-pct').value = v; calc(); }
  pctBtns.forEach(function (b) { b.addEventListener('click', function () { setPct(b.getAttribute('data-tip')); }); });
  function calc() {
    var bill = parseFloat($('tip-bill').value);
    var pct = parseFloat($('tip-pct').value);
    var people = Math.max(1, Math.floor(parseFloat($('tip-people').value) || 1));
    if (isNaN(bill) || isNaN(pct)) { $('tip-amount').textContent = '—'; $('tip-total').textContent = '—'; $('tip-each').textContent = '—'; return; }
    var tip = bill * pct / 100;
    var total = bill + tip;
    $('tip-amount').textContent = money(tip);
    $('tip-total').textContent = money(total);
    $('tip-each').textContent = money(total / people);
  }
  form.addEventListener('input', calc);
  calc();
})();
