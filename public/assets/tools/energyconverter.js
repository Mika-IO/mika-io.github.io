(function(){
  const units=[['Joule (J)',1],['Kilojoule (kJ)',1e3],['Megajoule (MJ)',1e6],['Calorie (cal)',4.184],['Kilocalorie / Cal (kcal)',4184],['Watt-hour (Wh)',3600],['Kilowatt-hour (kWh)',3.6e6],['BTU',1055.06],['Foot-pound (ft·lbf)',1.35582],['Electron volt (eV)',1.60218e-19],['Erg',1e-7]];
  const sf=document.getElementById('ec-from'),st=document.getElementById('ec-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===4;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ec-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('ec-out').textContent=res.toPrecision(8).replace(/\.?0+$/,'');}
  document.getElementById('ec-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();