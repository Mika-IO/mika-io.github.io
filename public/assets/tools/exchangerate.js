(function(){
  // Offline fallback only — live rates are fetched below and replace these.
  var SNAPSHOT_DATE='2026-07-17';
  const rates={"USD":1,"EUR":0.873482,"GBP":0.741467,"JPY":162.330823,"CHF":0.808262,"CAD":1.403662,"AUD":1.428743,"CNY":6.78034,"INR":96.403741,"BRL":5.082509,"MXN":17.423234,"SGD":1.290033,"HKD":7.83962,"NOK":9.666273,"SEK":9.637906,"DKK":6.517061,"NZD":1.711376,"ZAR":16.401155,"KRW":1480.158053,"AED":3.6725,"SAR":3.75,"THB":33.572316,"MYR":4.07241,"IDR":17992.306847,"PHP":61.651002,"TWD":32.247891,"PLN":3.78126,"CZK":21.127001,"HUF":315.09853,"RON":4.569955,"TRY":47.097698,"RUB":77.781843,"UAH":44.645286,"EGP":50.537457,"NGN":1379.635134,"KES":129.304761,"GHS":11.539025,"MAD":9.326951,"TND":2.943976,"ARS":1474.7696,"CLP":924.511391,"COP":3226.083313,"PEN":3.391282,"UYU":40.128299,"VES":732.4787};
  var live=false;
  const sel_from=document.getElementById('er-from');
  const sel_to=document.getElementById('er-to');
  const keys=Object.keys(rates);
  keys.forEach(k=>{
    const o1=document.createElement('option');o1.value=o1.textContent=k;if(k==='USD')o1.selected=true;sel_from.appendChild(o1);
    const o2=document.createElement('option');o2.value=o2.textContent=k;if(k==='BRL')o2.selected=true;sel_to.appendChild(o2);
  });
  function conv(){
    const amt=parseFloat(document.getElementById('er-amt').value)||1;
    const from=sel_from.value,to=sel_to.value;
    const result=amt/rates[from]*rates[to];
    document.getElementById('er-out').textContent=result.toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:4})+' '+to;
  }
  document.getElementById('er-amt').addEventListener('input',conv);
  sel_from.addEventListener('change',conv);
  sel_to.addEventListener('change',conv);
  conv();


  function setNote(){
    var note=document.getElementById('er-note');
    if(!note)return;
    note.textContent=live
      ? T('liverates','Live rates')+' · '+SNAPSHOT_DATE
      : T('offlinerates','Offline snapshot — live rates unavailable')+' · '+SNAPSHOT_DATE;
  }
  setNote();

  fetch('https://open.er-api.com/v6/latest/USD')
    .then(function(r){return r.ok?r.json():Promise.reject(new Error(r.status));})
    .then(function(d){
      if(!d||d.result!=='success'||!d.rates)throw new Error('bad payload');
      Object.keys(rates).forEach(function(k){if(typeof d.rates[k]==='number')rates[k]=d.rates[k];});
      live=true;
      SNAPSHOT_DATE=(d.time_last_update_utc||'').slice(5,16)||SNAPSHOT_DATE;
      setNote();
      var f=document.getElementById('er-from');
      if(f)f.dispatchEvent(new Event('change'));
    })
    .catch(function(){live=false;setNote();});
})();
