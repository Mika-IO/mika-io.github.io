(function(){
  const DEG=1;const RAD=180/Math.PI;const GRAD=0.9;const MIN=1/60;const SEC=1/3600;const TURN=360;const MRAD=180/Math.PI/1000;
  const units=[['Degree (°)',DEG],['Radian (rad)',RAD],['Gradian (grad)',GRAD],["Arcminute (')",MIN],['Arcsecond (")',SEC],['Turn (revolution)',TURN],['Milliradian (mrad)',MRAD]];
  const sf=document.getElementById('ang-from'),st=document.getElementById('ang-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===1;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ang-val').value);if(isNaN(v))return;const deg=v*units[sf.value][1];const res=deg/units[st.value][1];document.getElementById('ang-out').textContent=res.toPrecision(10).replace(/\.?0+$/,'');}
  document.getElementById('ang-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();