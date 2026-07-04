/* Rounding calculator. Round / floor / ceil to N decimals or to nearest unit. */
(function () {
  'use strict';
  var form = document.getElementById('rnd');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang || 'en';
  function calc() {
    var n = parseFloat($('rnd-num').value);
    var places = parseInt($('rnd-places').value, 10);
    var mode = $('rnd-mode').value;
    if (isNaN(n) || isNaN(places)) { $('rnd-out').textContent = '—'; return; }
    var f = Math.pow(10, places);
    var r;
    if (mode === 'up') r = Math.ceil(n * f) / f;
    else if (mode === 'down') r = Math.floor(n * f) / f;
    else r = Math.round(n * f) / f;
    var opts = places >= 0 ? { minimumFractionDigits: places, maximumFractionDigits: places } : {};
    $('rnd-out').textContent = r.toLocaleString(lang, opts);
  }
  form.addEventListener('input', calc);
  calc();
})();
