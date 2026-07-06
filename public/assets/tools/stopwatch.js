/* Stopwatch with lap times */
(function () {
  'use strict';
  var start = null, elapsed = 0, raf = null, laps = [];
  var disp = document.getElementById('sw-display');
  var lapList = document.getElementById('sw-laps');
  var btnStart = document.getElementById('sw-start');
  var btnLap = document.getElementById('sw-lap');
  var btnReset = document.getElementById('sw-reset');
  if (!disp) return;
  function fmt(ms) {
    var h = Math.floor(ms/3600000), m = Math.floor((ms%3600000)/60000);
    var s = Math.floor((ms%60000)/1000), cs = Math.floor((ms%1000)/1);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '.' + (cs < 10 ? '00' : cs < 100 ? '0' : '') + cs;
  }
  function tick() { disp.textContent = fmt(elapsed + (Date.now() - start)); raf = requestAnimationFrame(tick); }
  btnStart.addEventListener('click', function() {
    if (raf) { cancelAnimationFrame(raf); raf = null; elapsed += Date.now() - start; start = null;
      btnStart.textContent = btnStart.dataset.start || 'Start';
      btnLap.disabled = true;
    } else {
      start = Date.now(); tick();
      btnStart.textContent = btnStart.dataset.stop || 'Stop';
      btnLap.disabled = false; btnReset.disabled = false;
    }
  });
  btnLap.addEventListener('click', function() {
    if (!start) return;
    var t = elapsed + (Date.now() - start);
    laps.push(t);
    var li = document.createElement('li');
    li.textContent = 'Lap ' + laps.length + ': ' + fmt(t);
    li.style.padding = '0.25rem 0'; li.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    lapList.appendChild(li);
  });
  btnReset.addEventListener('click', function() {
    cancelAnimationFrame(raf); raf = null; start = null; elapsed = 0; laps = [];
    disp.textContent = '00:00.000'; lapList.innerHTML = '';
    btnLap.disabled = true; btnReset.disabled = true;
    btnStart.textContent = btnStart.dataset.start || 'Start';
  });
})();
