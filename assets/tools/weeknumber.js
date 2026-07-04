/* ISO week number */
(function () {
  'use strict';
  var inp = document.getElementById('wn-date');
  var weekEl = document.getElementById('wn-week');
  var detail = document.getElementById('wn-detail');
  if (!weekEl) return;
  var today = new Date().toISOString().slice(0,10);
  if (inp) inp.value = today;
  function isoWeek(d) {
    var dt = new Date(d);
    dt.setHours(0,0,0,0);
    dt.setDate(dt.getDate() + 3 - (dt.getDay() + 6) % 7);
    var week1 = new Date(dt.getFullYear(), 0, 4);
    return 1 + Math.round(((dt - week1) / 86400000 - 3 + (week1.getDay()+6)%7) / 7);
  }
  function weekStart(d) {
    var dt = new Date(d); var day = dt.getDay() || 7;
    dt.setDate(dt.getDate() - day + 1); return dt;
  }
  function calc() {
    if (!inp.value) { weekEl.textContent = '—'; return; }
    var d = new Date(inp.value);
    var w = isoWeek(d);
    weekEl.textContent = 'Week ' + w;
    if (detail) {
      var ws = weekStart(inp.value);
      var we = new Date(ws); we.setDate(ws.getDate()+6);
      detail.textContent = ws.toLocaleDateString([], {month:'short',day:'numeric'}) + ' – ' + we.toLocaleDateString([], {month:'short',day:'numeric',year:'numeric'});
    }
  }
  if (inp) inp.addEventListener('change', calc);
  calc();
})();
