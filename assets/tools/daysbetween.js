/* Days between two dates */
(function () {
  'use strict';
  var from = document.getElementById('db-from');
  var to = document.getElementById('db-to');
  var out = document.getElementById('db-out');
  if (!out) return;
  var today = new Date().toISOString().slice(0,10);
  if (from) from.value = today;
  if (to) {
    var d = new Date(); d.setDate(d.getDate()+30);
    to.value = d.toISOString().slice(0,10);
  }
  function calc() {
    if (!from.value || !to.value) { out.textContent = '—'; return; }
    var a = new Date(from.value), b = new Date(to.value);
    var diff = Math.abs(b - a);
    var days = Math.round(diff / 86400000);
    var weeks = (days / 7).toFixed(1);
    var months = (days / 30.44).toFixed(1);
    out.textContent = days + ' days (' + weeks + ' wks, ~' + months + ' mo)';
  }
  if (from) from.addEventListener('change', calc);
  if (to) to.addEventListener('change', calc);
  calc();
})();
