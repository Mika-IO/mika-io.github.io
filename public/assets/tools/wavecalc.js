(function(){
  document.getElementById('wc-form').addEventListener('submit',function(e){
    e.preventDefault();
    var f=parseFloat(document.getElementById('wc-f').value);
    var l=parseFloat(document.getElementById('wc-l').value);
    var v=parseFloat(document.getElementById('wc-v').value);
    const out=document.getElementById('wc-out');out.hidden=false;
    if(isNaN(v))v=343;
    if(!isNaN(f)&&!isNaN(l))v=f*l;
    else if(!isNaN(f)&&!isNaN(v))l=v/f;
    else if(!isNaN(l)&&!isNaN(v))f=v/l;
    else{out.innerHTML='<p>Enter at least 2 values</p>';return;}
    const period=1/f;
    function fmt(n){return n<0.001||n>1e9?n.toExponential(4):n.toPrecision(6).replace(/.?0+$/,'');}
    const items=[['Frequency (f)',fmt(f)+' Hz'],['Wavelength',fmt(l)+' m'],['Wave speed (v)',fmt(v)+' m/s'],['Period (T)',fmt(period)+' s']];
    out.innerHTML=items.map(function([k,v2]){return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">'+k+'</div><strong>'+v2+'</strong></div>';}).join('');
  });
})();