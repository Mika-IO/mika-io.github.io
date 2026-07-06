/* Percentage calculator — three live modes. Language-neutral: reads nothing localized. */
(function () {
  'use strict';
  var root = document.getElementById('pct');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) {
    if (!isFinite(n)) return '—';
    return (Math.round(n * 100) / 100).toLocaleString(document.documentElement.lang || 'en');
  };
  function bind(ids, fn, out) {
    var els = ids.map($);
    function run() {
      var vals = els.map(function (e) { return parseFloat(e.value); });
      if (vals.some(function (v) { return isNaN(v); })) { $(out).textContent = '—'; return; }
      $(out).textContent = fn(vals);
    }
    els.forEach(function (e) { e && e.addEventListener('input', run); });
  }
  bind(['pct1-p', 'pct1-n'], function (v) { return fmt(v[0] / 100 * v[1]); }, 'pct1-out');
  bind(['pct2-a', 'pct2-b'], function (v) { return fmt(v[0] / v[1] * 100) + '%'; }, 'pct2-out');
  bind(['pct3-x', 'pct3-y'], function (v) {
    var d = (v[1] - v[0]) / Math.abs(v[0]) * 100;
    return (d >= 0 ? '+' : '') + fmt(d) + '%';
  }, 'pct3-out');
})();
