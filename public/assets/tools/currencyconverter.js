(function(){
  'use strict';
  // Offline fallback only. Live rates are fetched below; this table is what the
  // page falls back to when the request fails, and it is labelled as such.
  var SNAPSHOT_DATE='2026-07-17';
  var rates={"USD":1,"EUR":0.873482,"GBP":0.741467,"JPY":162.330823,"CAD":1.403662,"AUD":1.428743,"CHF":0.808262,"CNY":6.78034,"INR":96.403741,"BRL":5.082509,"MXN":17.423234,"KRW":1480.158053,"SGD":1.290033,"HKD":7.83962,"NOK":9.666273,"SEK":9.637906,"DKK":6.517061,"NZD":1.711376,"ZAR":16.401155,"TRY":47.097698,"RUB":77.781843,"PLN":3.78126,"CZK":21.127001,"HUF":315.09853,"RON":4.569955,"THB":33.572316,"MYR":4.07241,"IDR":17992.306847,"PHP":61.651002,"AED":3.6725,"SAR":3.75,"EGP":50.537457,"PKR":277.896973,"NGN":1379.635134,"CLP":924.511391,"COP":3226.083313,"PEN":3.391282,"VND":26178.215137,"UAH":44.645286,"ILS":3.015358};
  var live=false;
  var names={USD:'US Dollar',EUR:'Euro',GBP:'British Pound',JPY:'Japanese Yen',CAD:'Canadian Dollar',AUD:'Australian Dollar',CHF:'Swiss Franc',CNY:'Chinese Yuan',INR:'Indian Rupee',BRL:'Brazilian Real',MXN:'Mexican Peso',KRW:'South Korean Won',SGD:'Singapore Dollar',HKD:'Hong Kong Dollar',NOK:'Norwegian Krone',SEK:'Swedish Krona',DKK:'Danish Krone',NZD:'New Zealand Dollar',ZAR:'South African Rand',TRY:'Turkish Lira',RUB:'Russian Ruble',PLN:'Polish Zloty',CZK:'Czech Koruna',HUF:'Hungarian Forint',RON:'Romanian Leu',THB:'Thai Baht',MYR:'Malaysian Ringgit',IDR:'Indonesian Rupiah',PHP:'Philippine Peso',AED:'UAE Dirham',SAR:'Saudi Riyal',EGP:'Egyptian Pound',PKR:'Pakistani Rupee',NGN:'Nigerian Naira',CLP:'Chilean Peso',COP:'Colombian Peso',PEN:'Peruvian Sol',VND:'Vietnamese Dong',UAH:'Ukrainian Hryvnia',ILS:'Israeli Shekel'};
  var from=document.getElementById('cc-from'),to=document.getElementById('cc-to'),amt=document.getElementById('cc-amount'),out=document.getElementById('cc-out');
  var note=document.getElementById('cc-note');
  if(!from)return;
  Object.keys(rates).forEach(function(k){
    var o1=document.createElement('option'),o2=document.createElement('option');
    o1.value=k;o1.textContent=k+' — '+names[k];
    o2.value=k;o2.textContent=k+' — '+names[k];
    from.appendChild(o1);to.appendChild(o2);
  });
  from.value='USD';to.value='EUR';

  function setNote(){
    if(!note)return;
    note.textContent=live
      ? T('liverates','Live rates')+' · '+SNAPSHOT_DATE
      : T('offlinerates','Offline snapshot — live rates unavailable')+' · '+SNAPSHOT_DATE;
    note.style.opacity=live?'0.6':'0.85';
  }

  function calc(){
    var a=parseFloat(amt.value);
    if(isNaN(a)){if(out)out.textContent='—';return;}
    var f=rates[from.value],t=rates[to.value];
    if(!f||!t){if(out)out.textContent='—';return;}
    var r=a/f*t;
    if(out)out.textContent=r.toLocaleString(window.__LANG||undefined,{minimumFractionDigits:2,maximumFractionDigits:4})+' '+to.value;
  }

  [from,to,amt].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  setNote();calc();

  // Rates first, then re-render. A failed request leaves the snapshot in place
  // rather than an empty tool.
  fetch('https://open.er-api.com/v6/latest/USD')
    .then(function(r){return r.ok?r.json():Promise.reject(new Error(r.status));})
    .then(function(d){
      if(!d||d.result!=='success'||!d.rates)throw new Error('bad payload');
      Object.keys(rates).forEach(function(k){if(typeof d.rates[k]==='number')rates[k]=d.rates[k];});
      live=true;
      SNAPSHOT_DATE=(d.time_last_update_utc||'').slice(5,16)||SNAPSHOT_DATE;
      setNote();calc();
    })
    .catch(function(){live=false;setNote();});
})();
