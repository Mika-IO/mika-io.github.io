(function(){
  function parseColor(s){
    s=s.trim();
    const cv=document.createElement('canvas').getContext('2d');
    cv.fillStyle=s;
    const filled=cv.fillStyle;
    if(filled==='#000000'&&s.toLowerCase()!=='#000000'&&s.toLowerCase()!=='black'&&s.toLowerCase()!=='#000'&&!s.includes('rgb(0')&&!s.includes('hsl(0'))return null;
    const m=filled.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if(!m)return null;
    return[parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)];
  }
  function rgbToHsl(r,g,b){
    r/=255;g/=255;b/=255;
    const max=Math.max(r,g,b),min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;
    if(max===min){h=s=0;}else{
      const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}
    }
    return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];
  }
  function rgbToHsv(r,g,b){
    r/=255;g/=255;b/=255;
    const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
    let h=0,s=max===0?0:d/max,v=max;
    if(d!==0){switch(max){case r:h=((g-b)/d)%6;break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}}
    return[Math.round(h*60+360)%360,Math.round(s*100),Math.round(v*100)];
  }
  document.getElementById('cc-go').onclick=function(){
    const rgb=parseColor(document.getElementById('cc-in').value);
    const out=document.getElementById('cc-out');
    const sw=document.getElementById('cc-swatch');
    if(!rgb){out.innerHTML='<p style="color:var(--red,#ef4444)">'+T('invalidcolor','Invalid color')+'</p>';sw.style.display='none';return;}
    const[r,g,b]=rgb;
    const hex='#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
    sw.style.background=hex;sw.style.display='block';
    const[h,sl,l]=rgbToHsl(r,g,b);
    const[hv,sv,v]=rgbToHsv(r,g,b);
    const k=1-Math.max(r,g,b)/255;
    const c=k===1?0:Math.round((1-r/255-k)/(1-k)*100);
    const mg=k===1?0:Math.round((1-g/255-k)/(1-k)*100);
    const y2=k===1?0:Math.round((1-b/255-k)/(1-k)*100);
    const items=[['HEX',hex],['RGB',`rgb(${r}, ${g}, ${b})`],['RGBA',`rgba(${r}, ${g}, ${b}, 1)`],['HSL',`hsl(${h}, ${sl}%, ${l}%)`],['HSV',`hsv(${hv}, ${sv}%, ${v}%)`],['CMYK',`cmyk(${c}%, ${mg}%, ${y2}%, ${Math.round(k*100)}%)`]];
    out.innerHTML=items.map(([k2,v2])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;cursor:pointer" onclick="navigator.clipboard.writeText('${v2}')"><div style="font-size:0.75rem;opacity:0.6">${k2}</div><strong style="font-family:monospace;font-size:0.875rem">${v2}</strong></div>`).join('');
  };
})();