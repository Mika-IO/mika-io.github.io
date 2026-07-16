(function(){
  const units=[['Bit (b)',1/8],['Byte (B)',1],['Kilobyte (KB)',1e3],['Megabyte (MB)',1e6],['Gigabyte (GB)',1e9],['Terabyte (TB)',1e12],['Petabyte (PB)',1e15],['Exabyte (EB)',1e18],['Kibibyte (KiB)',1024],['Mebibyte (MiB)',1024**2],['Gibibyte (GiB)',1024**3],['Tebibyte (TiB)',1024**4]];
  const sf=document.getElementById('ds-from'),st=document.getElementById('ds-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===4;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ds-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('ds-out').textContent=res.toPrecision(8).replace(/\.?0+$/,'');}
  document.getElementById('ds-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();