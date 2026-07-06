/* Base converter: binary / octal / decimal / hex, any input base. */
(function () {
  'use strict';
  var form = document.getElementById('tool-form');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  form.addEventListener('submit', function (e) { e.preventDefault(); convert(); });
  $('oct-input-value').addEventListener('input', convert);
  $('oct-input-base').addEventListener('change', convert);

  function convert() {
    var raw = $('oct-input-value').value.trim();
    var base = parseInt($('oct-input-base').value, 10);
    var err = $('oct-error'), out = $('oct-result');
    if (!raw) { out.style.display = 'none'; err.style.display = 'none'; return; }
    var valid = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^[0-9]+$/, 16: /^[0-9a-fA-F]+$/ }[base];
    if (!valid.test(raw)) {
      err.textContent = 'Invalid digit for the selected base.';
      err.style.display = 'block';
      out.style.display = 'none';
      return;
    }
    var n = parseInt(raw, base);
    $('oct-out-bin').textContent = n.toString(2);
    $('oct-out-oct').textContent = n.toString(8);
    $('oct-out-dec').textContent = n.toString(10);
    $('oct-out-hex').textContent = n.toString(16).toUpperCase();
    err.style.display = 'none';
    out.style.display = 'block';
  }
})();
