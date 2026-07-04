/* Palindrome checker. Ignores case, spaces and punctuation. Live. */
(function () {
  'use strict';
  var input = document.getElementById('pal-input');
  if (!input) return;
  var out = document.getElementById('pal-out');
  var d = document.getElementById('pal').dataset; // yes / no / empty
  function normalize(s) {
    return Array.from(s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))
      .filter(function (c) { return /[\p{L}\p{N}]/u.test(c); }).join('');
  }
  function check() {
    var raw = input.value;
    var clean = normalize(raw);
    if (!clean) { out.textContent = d.empty; out.style.color = 'var(--muted)'; return; }
    var rev = Array.from(clean).reverse().join('');
    if (clean === rev) { out.textContent = '✓ ' + d.yes; out.style.color = '#16a34a'; }
    else { out.textContent = '✗ ' + d.no; out.style.color = '#dc2626'; }
  }
  input.addEventListener('input', check);
  check();
})();
