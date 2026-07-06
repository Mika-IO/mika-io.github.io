(function(){
  'use strict';
  var lang = document.documentElement.lang || 'en';
  var money = function(n) {
    return isFinite(n) ? n.toLocaleString(lang, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '—';
  };
  function calc() {
    var income = parseFloat(document.getElementById('b5020-income').value);
    var out = document.getElementById('b5020-out');
    var detail = document.getElementById('b5020-detail');
    if (isNaN(income) || income < 0) { if (out) out.textContent = '—'; if (detail) detail.textContent = ''; return; }
    var needs = income * 0.5;
    var wants = income * 0.3;
    var savings = income * 0.2;
    if (out) out.textContent = money(needs);
    if (detail) detail.innerHTML =
      'Wants (30%): ' + money(wants) + ' &nbsp;|&nbsp; Savings (20%): ' + money(savings);
  }
  var el = document.getElementById('b5020-income');
  if (el) el.addEventListener('input', calc);
  calc();
})();
