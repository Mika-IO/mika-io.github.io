(function(){
  const units=[['Hertz (Hz)',1],['Kilohertz (kHz)',1e3],['Megahertz (MHz)',1e6],['Gigahertz (GHz)',1e9],['Terahertz (THz)',1e12],['RPM (rev/min)',1/60],['Radians/second',1/(2*Math.PI)],['Cycles/minute',1/60]];
  const sf=document.getElementById('fc2-from'),st=document.getElementById('fc2-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===2;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('fc2-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('fc2-out').textContent=res.toPrecision(8).replace(/\.?0+$/,'');}
  document.getElementById('fc2-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();