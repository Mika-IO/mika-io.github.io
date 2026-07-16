(function(){
  const base={1:5,2:10,3:15,4:25,5:40};
  const sunMult={high:1,medium:2,low:4};
  document.getElementById('vd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const skin=document.getElementById('vd-skin').value;
    const sun=document.getElementById('vd-sun').value;
    const mins=base[skin]*sunMult[sun];
    const out=document.getElementById('vd-out');out.hidden=false;
    out.innerHTML=`<div style="font-size:3rem;font-weight:800;color:#f59e0b">${mins}</div><p style="font-size:1rem">minutes recommended</p><p style="opacity:0.6;font-size:0.85rem;margin-top:0.4rem">Expose arms, face and legs · Avoid burning · Apply sunscreen after</p>`;
  });
})();