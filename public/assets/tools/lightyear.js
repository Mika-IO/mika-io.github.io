(function(){
  const LY=9.461e12,PC=3.086e13,AU=1.496e8,MI=1.60934;
  function toKM(v,u){if(u==='ly')return v*LY;if(u==='pc')return v*PC;if(u==='AU')return v*AU;if(u==='km')return v;if(u==='mi')return v*MI;return v;}
  document.getElementById('ly-form').addEventListener('submit',function(e){
    e.preventDefault();
    const v=parseFloat(document.getElementById('ly-val').value);
    const from=document.getElementById('ly-from').value;
    const km=toKM(v,from);
    const items=[['Light-years',km/LY],['Parsecs',km/PC],['Astronomical Units',km/AU],['Kilometres',km],['Miles',km/MI],['Metres',km*1000]];
    const out=document.getElementById('ly-out');out.hidden=false;
    out.innerHTML=items.map(function([k,val]){return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">'+k+'</div><strong style="font-size:0.85rem">'+val.toExponential(4)+'</strong></div>';}).join('');
  });
})();