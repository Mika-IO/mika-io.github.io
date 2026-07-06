/* Random letter picker. Secure RNG, case + count options. */
(function () {
  'use strict';
  var form = document.getElementById('rl-form');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var out = $('rl-out');
  function pick(n) {
    var a = new Uint8Array(n);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a);
    else for (var i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256);
    return a;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var count = Math.max(1, Math.floor(parseFloat($('rl-count').value) || 1));
    var mode = $('rl-case').value;
    var bytes = pick(count), letters = [];
    for (var i = 0; i < count; i++) {
      var idx = bytes[i] % 26;
      var upper = mode === 'upper' || (mode === 'mixed' && (bytes[i] & 32));
      letters.push(String.fromCharCode((upper ? 65 : 97) + idx));
    }
    out.textContent = letters.join(count > 1 ? ' ' : '');
  });
})();
