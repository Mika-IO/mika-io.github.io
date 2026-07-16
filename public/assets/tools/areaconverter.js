(function(){
  const units=[['Square metre (m²)',1],['Square kilometre (km²)',1e6],['Square centimetre (cm²)',1e-4],['Square millimetre (mm²)',1e-6],['Hectare',1e4],['Acre',4046.856],['Square foot (ft²)',0.092903],['Square inch (in²)',6.4516e-4],['Square yard (yd²)',0.836127],['Square mile (mi²)',2589988.1],['Square nautical mile',3429904]];
  const sf=document.getElementById('ac-from'),st=document.getElementById('ac-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===1;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ac-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('ac-out').textContent=res.toPrecision(8).replace(/\.?0+$/,'');}
  document.getElementById('ac-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();