(function(){
  const units=[['Litre (L)',1],['Millilitre (mL)',0.001],['Cubic metre (m³)',1000],['Cubic centimetre (cm³)',0.001],['US gallon',3.78541],['US quart',0.946353],['US pint',0.473176],['US cup',0.236588],['US fluid ounce',0.029574],['US tablespoon',0.014787],['US teaspoon',0.004929],['UK gallon',4.54609],['UK fluid ounce',0.028413],['UK pint',0.568261],['Cubic foot (ft³)',28.3168],['Cubic inch (in³)',0.016387]];
  const sf=document.getElementById('vc-from'),st=document.getElementById('vc-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===1;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('vc-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('vc-out').textContent=res.toPrecision(8).replace(/\.?0+$/,'');}
  document.getElementById('vc-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();