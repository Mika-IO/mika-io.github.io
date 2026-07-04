/* Unit converter */
(function () {
  'use strict';
  var $ = function(id) { return document.getElementById(id); };
  var cats = {
    length: { base:'m', units:{m:1,km:0.001,cm:100,mm:1000,in:39.3701,ft:3.28084,yd:1.09361,mi:0.000621371,nmi:0.000539957} },
    weight: { base:'kg', units:{kg:1,g:1000,mg:1e6,t:0.001,lb:2.20462,oz:35.274,'us-ton':0.00110231} },
    temp: { special:true },
    volume: { base:'l', units:{l:1,ml:1000,'m3':0.001,'cm3':1000,'us-gal':0.264172,'us-fl-oz':33.814,'us-cup':4.22675,'uk-gal':0.219969,'uk-fl-oz':35.1951} },
    area: { base:'m2', units:{'m2':1,'km2':1e-6,'cm2':10000,'in2':1550.0031,'ft2':10.7639,'yd2':1.19599,'mi2':3.861e-7,acre:0.000247105} },
    speed: { base:'ms', units:{'ms':1,'kmh':3.6,'mph':2.23694,knot:1.94384,'fps':3.28084} }
  };
  var unitNames = { m:'metres',km:'kilometres',cm:'centimetres',mm:'millimetres','in':'inches',ft:'feet',yd:'yards',mi:'miles',nmi:'nautical miles',
    kg:'kilograms',g:'grams',mg:'milligrams',t:'metric tons',lb:'pounds',oz:'ounces','us-ton':'US tons',
    l:'litres',ml:'millilitres','m3':'cubic metres','cm3':'cubic cm','us-gal':'US gallons','us-fl-oz':'US fl oz','us-cup':'US cups','uk-gal':'UK gallons','uk-fl-oz':'UK fl oz',
    'm2':'m²','km2':'km²','cm2':'cm²','in2':'in²','ft2':'ft²','yd2':'yd²','mi2':'mi²',acre:'acres',
    ms:'m/s',kmh:'km/h',mph:'mph',knot:'knots','fps':'ft/s',
    C:'°C (Celsius)',F:'°F (Fahrenheit)',K:'Kelvin'
  };
  var catSel = $('uc-cat'); var valIn = $('uc-val'); var fromSel = $('uc-from'); var toSel = $('uc-to'); var outEl = $('uc-out');
  if (!catSel) return;
  function populateUnits() {
    var cat = catSel.value;
    fromSel.innerHTML = ''; toSel.innerHTML = '';
    var units = cat==='temp' ? ['C','F','K'] : Object.keys(cats[cat].units);
    units.forEach(function(u, i) {
      var o1 = document.createElement('option'); o1.value = u; o1.textContent = unitNames[u]||u; fromSel.appendChild(o1);
      var o2 = document.createElement('option'); o2.value = u; o2.textContent = unitNames[u]||u; toSel.appendChild(o2);
    });
    if (toSel.options.length > 1) toSel.selectedIndex = 1;
    calc();
  }
  function calc() {
    var v = parseFloat(valIn.value); if (isNaN(v)) { outEl.textContent='—'; return; }
    var cat = catSel.value; var from = fromSel.value; var to = toSel.value;
    var result;
    if (cat==='temp') {
      var c;
      if (from==='C') c=v; else if (from==='F') c=(v-32)*5/9; else c=v-273.15;
      if (to==='C') result=c; else if (to==='F') result=c*9/5+32; else result=c+273.15;
    } else {
      var d = cats[cat]; result = v / d.units[from] * d.units[to];
    }
    var dec = Math.abs(result) >= 1000 ? 2 : Math.abs(result) >= 1 ? 4 : 8;
    outEl.textContent = result.toLocaleString([], {maximumFractionDigits:dec});
  }
  catSel.addEventListener('change', populateUnits);
  if (valIn) valIn.addEventListener('input', calc);
  if (fromSel) fromSel.addEventListener('change', calc);
  if (toSel) toSel.addEventListener('change', calc);
  populateUnits();
})();
