(function(){
  const units=[['Pascal (Pa)',1],['Kilopascal (kPa)',1e3],['Megapascal (MPa)',1e6],['Bar',1e5],['Millibar (mbar)',100],['PSI',6894.76],['Atmosphere (atm)',101325],['mmHg (Torr)',133.322],['inHg',3386.39],['kg/cm²',98066.5]];
  const sf=document.getElementById('pc-from'),st=document.getElementById('pc-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===3;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('pc-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('pc-out').textContent=res.toPrecision(8).replace(/\.?0+$/,'');}
  document.getElementById('pc-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();