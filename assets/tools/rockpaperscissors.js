/* Rock Paper Scissors vs computer with score tracking */
(function () {
  'use strict';
  var app = document.getElementById('rps-app');
  if (!app) return;
  var result = document.getElementById('rps-result');
  var pw = document.getElementById('rps-pw');
  var cw = document.getElementById('rps-cw');
  var draws = document.getElementById('rps-d');
  var choices = ['rock', 'paper', 'scissors'];
  var emojis = { rock: '✊', paper: '🖐', scissors: '✌️' };
  var score = { p: 0, c: 0, d: 0 };

  function beats(a, b) {
    return (a === 'rock' && b === 'scissors') ||
           (a === 'paper' && b === 'rock') ||
           (a === 'scissors' && b === 'paper');
  }

  app.querySelectorAll('.rps-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var player = this.dataset.choice;
      var cpu = choices[Math.floor(Math.random() * 3)];
      var msg;
      if (player === cpu) {
        score.d++;
        msg = emojis[player] + ' vs ' + emojis[cpu] + '<br><strong>It\'s a draw! 🤝</strong>';
      } else if (beats(player, cpu)) {
        score.p++;
        msg = emojis[player] + ' vs ' + emojis[cpu] + '<br><strong style="color:#22c55e">You win! 🎉</strong>';
      } else {
        score.c++;
        msg = emojis[player] + ' vs ' + emojis[cpu] + '<br><strong style="color:#ef4444">Computer wins 🤖</strong>';
      }
      result.innerHTML = msg;
      pw.textContent = score.p;
      cw.textContent = score.c;
      draws.textContent = score.d;
    });
  });
})();
