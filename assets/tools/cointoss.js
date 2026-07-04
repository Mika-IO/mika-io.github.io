/* Coin toss. Cryptographically-random flip with a running tally. */
(function () {
  'use strict';
  var root = document.getElementById('coin');
  if (!root) return;
  var btn = document.getElementById('coin-flip');
  var face = document.getElementById('coin-face');
  var out = document.getElementById('coin-result');
  var hEl = document.getElementById('coin-h');
  var tEl = document.getElementById('coin-t');
  var heads = 0, tails = 0, busy = false;
  var d = root.dataset; // heads / tails / flipping labels

  function rand() {
    if (window.crypto && crypto.getRandomValues) {
      var a = new Uint8Array(1); crypto.getRandomValues(a); return a[0] & 1;
    }
    return Math.random() < 0.5 ? 0 : 1;
  }
  btn.addEventListener('click', function () {
    if (busy) return;
    busy = true;
    out.textContent = d.flipping || '…';
    face.classList.add('spin');
    var r = rand();
    setTimeout(function () {
      face.classList.remove('spin');
      if (r === 0) { heads++; face.textContent = '👑'; out.textContent = d.heads; }
      else { tails++; face.textContent = '🪙'; out.textContent = d.tails; }
      hEl.textContent = heads; tEl.textContent = tails;
      busy = false;
    }, 600);
  });
})();
