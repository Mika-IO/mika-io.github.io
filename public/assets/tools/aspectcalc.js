(function(){
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  document.getElementById('asp-form').addEventListener('submit',function(e){
    e.preventDefault();
    const w=parseInt(document.getElementById('asp-w').value);
    const h=parseInt(document.getElementById('asp-h').value);
    const nw=parseInt(document.getElementById('asp-nw').value);
    const nh=parseInt(document.getElementById('asp-nh').value);
    if(!w||!h)return;
    const d=gcd(w,h);const ratio=w/d+':'+h/d;
    const ratioDec=(w/h).toFixed(4);
    const items=[['Aspect ratio',ratio],['Decimal ratio',ratioDec],['Width',w+'px'],['Height',h+'px']];
    if(nw){const scaledH=Math.round(nw*h/w);items.push(['Scaled height',scaledH+'px (for '+nw+'px wide)']);}
    if(nh){const scaledW=Math.round(nh*w/h);items.push(['Scaled width',scaledW+'px (for '+nh+'px tall)']);}
    const out=document.getElementById('asp-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();