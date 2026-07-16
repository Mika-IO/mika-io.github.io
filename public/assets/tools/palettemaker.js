(function(){
  function hexToHsl(hex){const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return[h*360,s*100,l*100];}
  function hslToHex(h,s,l){h/=360;s/=100;l/=100;let r,g,b;if(s===0){r=g=b=l;}else{const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};const q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);}return'#'+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');}
  function palette(h,s,l,type){
    const base=[[h,s,l]];
    if(type==='mono')return[[h,s,Math.max(10,l-40)],[h,s,Math.max(20,l-20)],[h,s,l],[h,s,Math.min(90,l+20)],[h,s,Math.min(95,l+40)]];
    if(type==='comp')return[[h,s,l],[h,Math.max(20,s-20),Math.min(90,l+20)],[(h+180)%360,s,l],[(h+180)%360,s,Math.min(90,l+20)],[(h+180)%360,Math.max(20,s-20),Math.max(10,l-20)]];
    if(type==='tri')return[[h,s,l],[(h+120)%360,s,l],[(h+240)%360,s,l],[h,Math.max(20,s-30),Math.min(90,l+20)],[(h+120)%360,Math.max(20,s-30),Math.min(90,l+20)]];
    if(type==='ana')return[[(h-30+360)%360,s,l],[(h-15+360)%360,s,l],[h,s,l],[(h+15)%360,s,l],[(h+30)%360,s,l]];
    if(type==='split')return[[h,s,l],[(h+150)%360,s,l],[(h+210)%360,s,l],[h,Math.max(20,s-20),Math.min(90,l+20)],[(h+180)%360,s,Math.min(90,l+20)]];
    return base;
  }
  function gen(){
    const hex=document.getElementById('pm-base').value;
    const type=document.getElementById('pm-type').value;
    const [h,s,l]=hexToHsl(hex);
    const cols=palette(h,s,l,type).map(([hh,ss,ll])=>hslToHex(hh,ss,ll));
    document.getElementById('pm-out').innerHTML=cols.map(c=>`<div style="cursor:pointer" onclick="navigator.clipboard.writeText('${c}');this.querySelector('span').textContent='Copied!'"><div style="height:80px;background:${c};border-radius:8px;border:1px solid rgba(0,0,0,0.1)"></div><div style="text-align:center;font-size:0.8rem;font-family:monospace;margin-top:0.3rem">${c}</div><span style="display:block;text-align:center;font-size:0.7rem;opacity:0.5">click to copy</span></div>`).join('');
  }
  document.getElementById('pm-gen').onclick=gen;document.getElementById('pm-base').addEventListener('input',gen);gen();
})();