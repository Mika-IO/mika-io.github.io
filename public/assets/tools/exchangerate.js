(function(){
  // Approximate rates relative to USD (as of mid-2024, for demo only)
  const rates={USD:1,EUR:0.92,GBP:0.79,JPY:157,CHF:0.90,CAD:1.37,AUD:1.52,CNY:7.26,INR:83.5,BRL:5.20,MXN:17.8,SGD:1.35,HKD:7.82,NOK:10.6,SEK:10.7,DKK:6.89,NZD:1.64,ZAR:18.6,KRW:1370,AED:3.67,SAR:3.75,THB:36.5,MYR:4.72,IDR:16250,PHP:58.1,TWD:32.5,PLN:4.0,CZK:23.5,HUF:364,RON:4.69,TRY:32.5,RUB:90,UAH:40,EGP:50,NGN:1500,KES:129,GHS:15.4,MAD:10.0,TND:3.1,ARS:950,CLP:950,COP:4000,PEN:3.77,UYU:39,VES:36};
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
})();