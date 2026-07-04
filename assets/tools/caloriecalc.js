(function(){
  'use strict';
  var db={apple:52,banana:89,orange:47,grape:69,strawberry:32,watermelon:30,mango:60,pineapple:50,avocado:160,lemon:29,peach:39,pear:57,cherry:50,kiwi:61,coconut:354,rice:130,pasta:131,bread:265,potato:77,'sweet potato':86,oats:389,cornflake:370,barley:354,quinoa:120,egg:155,chicken:165,'chicken breast':165,beef:250,'ground beef':250,salmon:208,tuna:144,shrimp:99,cod:82,milk:61,'whole milk':61,'skim milk':35,cheese:402,butter:717,'olive oil':884,'coconut oil':862,yogurt:59,'greek yogurt':97,broccoli:34,spinach:23,carrot:41,tomato:18,cucumber:15,lettuce:15,onion:40,garlic:149,pepper:31,mushroom:22,corn:86,peas:81,beans:127,'black beans':132,'chickpeas':164,lentils:116,almond:579,walnut:654,peanut:567,'peanut butter':588,chocolate:546,'dark chocolate':600,sugar:387,honey:304,coffee:2,tea:1};
  var inp=document.getElementById('cal-food'),qty=document.getElementById('cal-qty'),unit=document.getElementById('cal-unit'),out=document.getElementById('cal-out');
  var dl=document.getElementById('cal-list');
  if(!inp)return;
  Object.keys(db).forEach(function(k){var o=document.createElement('option');o.value=k;if(dl)dl.appendChild(o);});
  function calc(){
    var food=inp.value.toLowerCase().trim();
    var kcPer100=db[food];
    if(!kcPer100){if(out)out.textContent='—';return;}
    var q=parseFloat(qty.value)||100;
    var grams=unit.value==='oz'?q*28.3495:q;
    if(out)out.textContent=Math.round(kcPer100*grams/100)+' kcal';
  }
  [inp,qty,unit].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
