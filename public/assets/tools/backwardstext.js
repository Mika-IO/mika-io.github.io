/* Backwards text. Reverse characters, word order, or line order. Live output. */
(function () {
  'use strict';
  var wrap = document.getElementById('bw');
  if (!wrap) return;
  var input = document.getElementById('bw-input');
  var output = document.getElementById('bw-output');
  var mode = 'chars';
  // Reverse by Unicode code points so emoji and accents survive.
  function reverseChars(s) { return Array.from(s).reverse().join(''); }
  function apply() {
    var t = input.value;
    if (mode === 'chars') output.value = reverseChars(t);
    else if (mode === 'words') output.value = t.split(/(\s+)/).reverse().join('');
    else output.value = t.split('\n').reverse().join('\n');
  }
  wrap.addEventListener('click', function (e) {
    var b = e.target.closest('[data-mode]');
    if (!b) return;
    mode = b.getAttribute('data-mode');
    wrap.querySelectorAll('[data-mode]').forEach(function (x) { x.classList.toggle('btn', true); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    apply();
  });
  input.addEventListener('input', apply);
  apply();
})();
