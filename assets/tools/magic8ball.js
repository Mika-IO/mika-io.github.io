/* Magic 8 Ball. Random answer from a localized list held in a data attribute. */
(function () {
  'use strict';
  var root = document.getElementById('m8');
  if (!root) return;
  var ball = document.getElementById('m8-ball');
  var out = document.getElementById('m8-answer');
  var btn = document.getElementById('m8-ask');
  var answers = (root.dataset.answers || '').split('|').filter(Boolean);
  function rnd(n) { if (window.crypto && crypto.getRandomValues) { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; } return Math.floor(Math.random() * n); }
  btn.addEventListener('click', function () {
    if (!answers.length) return;
    ball.classList.remove('spin'); void ball.offsetWidth; ball.classList.add('spin');
    out.textContent = '';
    setTimeout(function () { out.textContent = answers[rnd(answers.length)]; }, 500);
  });
})();
