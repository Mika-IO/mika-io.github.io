(function(){
  function load(){
    const out=document.getElementById('ip-out');
    out.innerHTML='<p style="opacity:0.6">Loading…</p>';
    fetch('https://ipapi.co/json/')
      .then(r=>r.json())
      .then(d=>{
        const items=[[T('ipaddress','IP Address'),d.ip],[T('city','City'),d.city],[T('region','Region'),d.region],[T('country','Country'),d.country_name],[T('timezone','Timezone'),d.timezone],[T('isporg','ISP/Org'),d.org],[T('latitude','Latitude'),d.latitude],[T('longitude','Longitude'),d.longitude]];
        out.innerHTML=items.filter(([,v])=>v).map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
      })
      .catch(()=>{out.innerHTML='<p style="color:var(--red,#ef4444)">'+T('fetchfailed','Could not fetch IP info. Check your connection.')+'</p>';});
  }
  document.getElementById('ip-refresh').onclick=load;
  load();
})();