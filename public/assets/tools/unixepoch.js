/* Unix timestamp converter */
(function () {
  'use strict';
  var tsIn = document.getElementById('ue-ts');
  var utcEl = document.getElementById('ue-utc');
  var localEl = document.getElementById('ue-local');
  var dtIn = document.getElementById('ue-dt');
  var tsOut = document.getElementById('ue-tsout');
  function tsToDate() {
    if (!tsIn || !tsIn.value) { if(utcEl)utcEl.textContent='—'; if(localEl)localEl.textContent='—'; return; }
    var ts = parseInt(tsIn.value, 10);
    var d = new Date(ts * 1000);
    if (isNaN(d.getTime())) { if(utcEl)utcEl.textContent=T('invalid','Invalid'); return; }
    if (utcEl) utcEl.textContent = d.toLocaleString(window.__LANG||undefined,{timeZone:'UTC',dateStyle:'medium',timeStyle:'medium'})+' UTC';
    if (localEl) localEl.textContent = d.toLocaleString(window.__LANG||undefined);
  }
  function dateToTs() {
    if (!dtIn || !dtIn.value) { if(tsOut)tsOut.textContent='—'; return; }
    var ts = Math.floor(new Date(dtIn.value).getTime() / 1000);
    if (tsOut) tsOut.textContent = isNaN(ts) ? '—' : ts;
  }
  if (tsIn) tsIn.addEventListener('input', tsToDate);
  if (dtIn) dtIn.addEventListener('input', dateToTs);
  // default: current timestamp
  if (tsIn) { tsIn.value = Math.floor(Date.now()/1000); tsToDate(); }
  if (dtIn) { dtIn.value = new Date().toISOString().slice(0,16); dateToTs(); }
})();
