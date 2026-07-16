(function(){
  const zones=[
    ['UTC','UTC'],['London','Europe/London'],['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],
    ['Rome','Europe/Rome'],['Madrid','Europe/Madrid'],['Amsterdam','Europe/Amsterdam'],
    ['Stockholm','Europe/Stockholm'],['Moscow','Europe/Moscow'],['Istanbul','Europe/Istanbul'],
    ['Dubai','Asia/Dubai'],['Riyadh','Asia/Riyadh'],['Karachi','Asia/Karachi'],
    ['Mumbai','Asia/Kolkata'],['Dhaka','Asia/Dhaka'],
    ['Bangkok','Asia/Bangkok'],['Singapore','Asia/Singapore'],['Hong Kong','Asia/Hong_Kong'],
    ['Shanghai','Asia/Shanghai'],['Tokyo','Asia/Tokyo'],['Seoul','Asia/Seoul'],
    ['Sydney','Australia/Sydney'],['Melbourne','Australia/Melbourne'],['Auckland','Pacific/Auckland'],
    ['Honolulu','Pacific/Honolulu'],['Anchorage','America/Anchorage'],['Los Angeles','America/Los_Angeles'],
    ['Denver','America/Denver'],['Chicago','America/Chicago'],['New York','America/New_York'],
    ['Toronto','America/Toronto'],['São Paulo','America/Sao_Paulo'],['Buenos Aires','America/Argentina/Buenos_Aires'],
    ['Mexico City','America/Mexico_City'],['Lima','America/Lima'],['Bogotá','America/Bogota'],
    ['Santiago','America/Santiago'],['Caracas','America/Caracas'],['Nairobi','Africa/Nairobi'],
    ['Cairo','Africa/Cairo'],['Lagos','Africa/Lagos'],['Johannesburg','Africa/Johannesburg'],
  ];

  const fromSel=document.getElementById('tzc-from');
  const toSel=document.getElementById('tzc-to');
  zones.forEach(([city],i)=>{
    [fromSel,toSel].forEach(function(sel){
      var o=document.createElement('option');o.value=String(i);o.textContent=city;sel.appendChild(o);
    });
  });

  // A zone's offset is not a constant — it moves with DST. Ask Intl what the wall
  // clock reads in that zone at a given instant and diff it against UTC.
  // en-US here is not display: it guarantees ASCII digits to parse back.
  function offsetAt(tz,date){
    const dtf=new Intl.DateTimeFormat('en-US',{timeZone:tz,hour12:false,year:'numeric',month:'2-digit',
      day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const p={};
    dtf.formatToParts(date).forEach(function(x){p[x.type]=x.value;});
    const h=p.hour==='24'?0:Number(p.hour); // some engines report midnight as 24
    const asUtc=Date.UTC(Number(p.year),Number(p.month)-1,Number(p.day),h,Number(p.minute),Number(p.second));
    return asUtc-date.getTime();
  }

  // The typed value is a wall clock reading in the source zone, not an instant.
  // Read it as UTC, subtract that zone's offset, then correct once in case the
  // first guess landed on the far side of a DST switch.
  function wallToInstant(wall,tz){
    const guess=new Date(wall+':00Z');
    if(isNaN(guess.getTime()))return null;
    const inst1=new Date(guess.getTime()-offsetAt(tz,guess));
    const inst2=new Date(guess.getTime()-offsetAt(tz,inst1));
    return isNaN(inst2.getTime())?null:inst2;
  }

  const LANG=window.__LANG||undefined;
  const fmtTime=(d,tz)=>new Intl.DateTimeFormat(LANG,{timeZone:tz,hour:'2-digit',minute:'2-digit',hour12:false}).format(d);
  const fmtDate=(d,tz)=>new Intl.DateTimeFormat(LANG,{timeZone:tz,weekday:'short',day:'numeric',month:'short'}).format(d);
  function abbr(tz,d){
    try{
      const parts=new Intl.DateTimeFormat('en-US',{timeZone:tz,timeZoneName:'short'}).formatToParts(d);
      const z=parts.find(function(p){return p.type==='timeZoneName';});
      return z?z.value:'';
    }catch(e){return '';}
  }

  const timeEl=document.getElementById('tzc-time');
  const main=document.getElementById('tzc-main');
  const sub=document.getElementById('tzc-sub');
  const out=document.getElementById('tzc-out');

  function localIndex(){
    try{
      const local=Intl.DateTimeFormat().resolvedOptions().timeZone;
      const i=zones.findIndex(function(z){return z[1]===local;});
      return i>=0?i:0;
    }catch(e){return 0;}
  }
  fromSel.selectedIndex=localIndex();
  toSel.selectedIndex=zones.findIndex(function(z){return z[1]==='UTC';});
  if(toSel.selectedIndex===fromSel.selectedIndex)toSel.selectedIndex=zones.findIndex(function(z){return z[0]==='New York';});

  const pad=(n)=>String(n).padStart(2,'0');
  (function seedNow(){
    // Seed with the current wall clock of the source zone, so the first render is
    // already correct instead of a browser-local coincidence.
    const tz=zones[fromSel.selectedIndex][1];
    const now=new Date();
    const local=new Date(now.getTime()+offsetAt(tz,now));
    timeEl.value=local.getUTCFullYear()+'-'+pad(local.getUTCMonth()+1)+'-'+pad(local.getUTCDate())
      +'T'+pad(local.getUTCHours())+':'+pad(local.getUTCMinutes());
  })();

  function convert(){
    const fromTz=zones[fromSel.selectedIndex][1];
    const to=zones[toSel.selectedIndex];
    const inst=wallToInstant(timeEl.value,fromTz);
    if(!inst){main.textContent='—';sub.textContent='';out.innerHTML='';return;}

    main.textContent=fmtTime(inst,to[1]);
    const diffH=(offsetAt(to[1],inst)-offsetAt(fromTz,inst))/3600000;
    const rel=diffH===0?'':' · '+(diffH>0?'+':'')+Number(diffH.toFixed(2))+'h';
    sub.textContent=to[0]+' — '+fmtDate(inst,to[1])+' '+abbr(to[1],inst)+rel;

    out.innerHTML=zones.map(function(z){
      const on=z[1]===to[1]?'border-color:var(--brand);':'';
      return '<div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;padding:0.35rem 0.6rem;background:var(--surface);border:1px solid var(--line);'+on+'border-radius:8px"><span>'+z[0]+'</span><span style="font-family:monospace;font-size:0.85rem"><strong>'+fmtTime(inst,z[1])+'</strong> <span style="opacity:0.5;font-size:0.75rem">'+abbr(z[1],inst)+'</span></span></div>';
    }).join('');
  }

  timeEl.addEventListener('input',convert);
  fromSel.addEventListener('change',convert);
  toSel.addEventListener('change',convert);
  convert();
})();
