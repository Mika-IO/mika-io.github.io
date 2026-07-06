/* Sales tax / VAT calculator. Add tax to a net price or extract it from a gross price. */
(function () {
  'use strict';
  var form = document.getElementById('tax');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang || 'en';
  var money = function (n) { return isFinite(n) ? n.toLocaleString(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'; };
  function calc() {
    var amt = parseFloat($('tax-amt').value);
    var rate = parseFloat($('tax-rate').value);
    var mode = $('tax-mode').value;
    if (isNaN(amt) || isNaN(rate)) { $('tax-net').textContent = '—'; $('tax-tax').textContent = '—'; $('tax-gross').textContent = '—'; return; }
    var net, tax, gross;
    if (mode === 'remove') { gross = amt; net = amt / (1 + rate / 100); tax = gross - net; }
    else { net = amt; tax = amt * rate / 100; gross = net + tax; }
    $('tax-net').textContent = money(net);
    $('tax-tax').textContent = money(tax);
    $('tax-gross').textContent = money(gross);
  }
  form.addEventListener('input', calc);
  calc();
})();
