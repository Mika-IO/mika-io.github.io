/* Pomodoro timer */
(function () {
  'use strict';
  var FOCUS = 25*60, SHORT = 5*60, LONG = 15*60;
  var phase = 'focus', sessions = 0, remaining = FOCUS, interval = null;
  var disp = document.getElementById('pom-display');
  var phaseEl = document.getElementById('pom-phase');
  var countEl = document.getElementById('pom-count');
  var btnStart = document.getElementById('pom-start');
  var btnReset = document.getElementById('pom-reset');
  if (!disp) return;
  function fmt(s) { return (Math.floor(s/60) < 10 ? '0' : '') + Math.floor(s/60) + ':' + (s%60 < 10 ? '0' : '') + (s%60); }
  function beep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(); var g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880; g.gain.value = 0.3;
      o.start(); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      setTimeout(function(){o.stop();ctx.close();}, 900);
    } catch(e){}
  }
  function setPhase(p) {
    phase = p;
    remaining = p==='focus' ? FOCUS : p==='short' ? SHORT : LONG;
    if (phaseEl) phaseEl.textContent = p==='focus' ? 'Focus' : p==='short' ? 'Short break' : 'Long break';
    disp.textContent = fmt(remaining);
  }
  function tick() {
    remaining--;
    disp.textContent = fmt(remaining);
    if (remaining <= 0) {
      clearInterval(interval); interval = null;
      beep();
      if (phase==='focus') {
        sessions++;
        if (countEl) countEl.textContent = 'Sessions: ' + sessions;
        setPhase(sessions % 4 === 0 ? 'long' : 'short');
      } else { setPhase('focus'); }
      btnStart.textContent = 'Start';
    }
  }
  btnStart.addEventListener('click', function() {
    if (interval) { clearInterval(interval); interval = null; btnStart.textContent = 'Start'; }
    else { interval = setInterval(tick, 1000); btnStart.textContent = 'Pause'; }
  });
  btnReset.addEventListener('click', function() {
    clearInterval(interval); interval = null; sessions = 0;
    setPhase('focus');
    if (countEl) countEl.textContent = '';
    btnStart.textContent = 'Start';
  });
})();
