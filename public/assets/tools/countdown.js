/* Countdown timer to a specific date */
(function () {
  'use strict';
  var dateIn = document.getElementById('cd-date');
  var labelIn = document.getElementById('cd-label');
  var out = document.getElementById('cd-out');
  if (!out) return;
  var now = new Date();
  // default to one month from now
  var def = new Date(now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes());
  if (dateIn) dateIn.value = def.toISOString().slice(0,16);
  function update() {
    if (!dateIn || !dateIn.value) { out.textContent = '—'; return; }
    var target = new Date(dateIn.value);
    var diff = target - new Date();
    var label = (labelIn && labelIn.value) ? labelIn.value + ': ' : '';
    if (diff <= 0) { out.textContent = label + '🎉 Time is up!'; return; }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    out.textContent = label + d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
  }
  if (dateIn) dateIn.addEventListener('input', update);
  if (labelIn) labelIn.addEventListener('input', update);
  update();
  setInterval(update, 1000);
})();
