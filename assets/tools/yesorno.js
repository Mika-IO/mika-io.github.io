/* Yes or No decision maker. Secure random, running tally. */
(function () {
  'use strict';
  var root = document.getElementById('yn');
  if (!root) return;
  var btn = document.getElementById('yn-ask');
  var out = document.getElementById('yn-result');
  var yEl = document.getElementById('yn-y');
  var nEl = document.getElementById('yn-n');
  var yes = 0, no = 0;
  var d = root.dataset;
  function bit() {
    if (window.crypto && crypto.getRandomValues) { var a = new Uint8Array(1); crypto.getRandomValues(a); return a[0] & 1; }
    return Math.random() < 0.5 ? 0 : 1;
  }
  btn.addEventListener('click', function () {
    if (bit() === 0) { yes++; out.textContent = d.yes; out.style.color = '#16a34a'; }
    else { no++; out.textContent = d.no; out.style.color = '#dc2626'; }
    yEl.textContent = yes; nEl.textContent = no;
  });
})();
