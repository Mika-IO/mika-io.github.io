(function(){
  function fmt(totalSecs){const h=Math.floor(totalSecs/3600),m=Math.floor((totalSecs%3600)/60),s=Math.round(totalSecs%60);return(h?h+':':'')+(m<10&&h?'0':'')+m+':'+(s<10?'0':'')+s;}
  document.getElementById('pace-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dist=parseFloat(document.getElementById('pace-dist').value)||0;
    const unit=document.getElementById('pace-dunit').value;
    const h=parseInt(document.getElementById('pace-h').value)||0;
    const m=parseInt(document.getElementById('pace-m').value)||0;
    const s=parseInt(document.getElementById('pace-s').value)||0;
    const totalSecs=h*3600+m*60+s;
    if(!dist||!totalSecs)return;
    const distKm=unit==='km'?dist:dist*1.60934;
    const paceSecPerKm=totalSecs/distKm;
    const paceSecPerMi=paceSecPerKm/0.621371;
    const speedKmh=distKm/totalSecs*3600;
    const speedMph=speedKmh*0.621371;
    const races=[['5K',5],['10K',10],['Half-marathon',21.0975],['Marathon',42.195]];
    const items=[['Pace /km',fmt(paceSecPerKm)],['Pace /mi',fmt(paceSecPerMi)],['Speed (km/h)',speedKmh.toFixed(2)],['Speed (mph)',speedMph.toFixed(2)],...races.map(([n,d])=>[n,fmt(paceSecPerKm*d)])];
    const out=document.getElementById('pace-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();