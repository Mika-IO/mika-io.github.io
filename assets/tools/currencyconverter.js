(function(){
  'use strict';
  var rates={USD:1,EUR:0.92,GBP:0.79,JPY:149.5,CAD:1.36,AUD:1.53,CHF:0.89,CNY:7.24,INR:83.1,BRL:4.97,MXN:17.2,KRW:1325,SGD:1.34,HKD:7.82,NOK:10.6,SEK:10.4,DKK:6.88,NZD:1.63,ZAR:18.6,TRY:30.5,RUB:90.5,PLN:3.97,CZK:22.8,HUF:355,RON:4.56,THB:35.1,MYR:4.69,IDR:15680,PHP:55.8,AED:3.67,SAR:3.75,EGP:30.9,PKR:278,NGN:1465,CLP:890,COP:3940,PEN:3.71,VND:24350,UAH:37.5,ILS:3.77};
  var names={USD:'US Dollar',EUR:'Euro',GBP:'British Pound',JPY:'Japanese Yen',CAD:'Canadian Dollar',AUD:'Australian Dollar',CHF:'Swiss Franc',CNY:'Chinese Yuan',INR:'Indian Rupee',BRL:'Brazilian Real',MXN:'Mexican Peso',KRW:'South Korean Won',SGD:'Singapore Dollar',HKD:'Hong Kong Dollar',NOK:'Norwegian Krone',SEK:'Swedish Krona',DKK:'Danish Krone',NZD:'New Zealand Dollar',ZAR:'South African Rand',TRY:'Turkish Lira',RUB:'Russian Ruble',PLN:'Polish Zloty',CZK:'Czech Koruna',HUF:'Hungarian Forint',RON:'Romanian Leu',THB:'Thai Baht',MYR:'Malaysian Ringgit',IDR:'Indonesian Rupiah',PHP:'Philippine Peso',AED:'UAE Dirham',SAR:'Saudi Riyal',EGP:'Egyptian Pound',PKR:'Pakistani Rupee',NGN:'Nigerian Naira',CLP:'Chilean Peso',COP:'Colombian Peso',PEN:'Peruvian Sol',VND:'Vietnamese Dong',UAH:'Ukrainian Hryvnia',ILS:'Israeli Shekel'};
  var from=document.getElementById('cc-from'),to=document.getElementById('cc-to'),amt=document.getElementById('cc-amount'),out=document.getElementById('cc-out');
  if(!from)return;
  var keys=Object.keys(rates);
  keys.forEach(function(k){
    var o1=document.createElement('option'),o2=document.createElement('option');
    o1.value=k;o1.textContent=k+' — '+names[k];
    o2.value=k;o2.textContent=k+' — '+names[k];
    from.appendChild(o1);to.appendChild(o2);
  });
  from.value='USD';to.value='EUR';
  function calc(){
    var a=parseFloat(amt.value);
    if(isNaN(a)){if(out)out.textContent='—';return;}
    var f=rates[from.value],t=rates[to.value];
    var r=a/f*t;
    if(out)out.textContent=r.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:4})+' '+to.value;
  }
  [from,to,amt].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
