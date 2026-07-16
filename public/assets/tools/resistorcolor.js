(function(){
  const colors=['Black','Brown','Red','Orange','Yellow','Green','Blue','Violet','Grey','White','Gold','Silver'];
  const vals={Black:0,Brown:1,Red:2,Orange:3,Yellow:4,Green:5,Blue:6,Violet:7,Grey:8,White:9};
  const mults={Black:1,Brown:10,Red:100,Orange:1e3,Yellow:1e4,Green:1e5,Blue:1e6,Violet:1e7,Grey:1e8,White:1e9,Gold:0.1,Silver:0.01};
  const tols={Brown:'±1%',Red:'±2%',Green:'±0.5%',Blue:'±0.25%',Violet:'±0.1%',Grey:'±0.05%',Gold:'±5%',Silver:'±10%'};
  const css={Black:'#111;color:#fff',Brown:'#8B4513;color:#fff',Red:'#e11d48;color:#fff',Orange:'#f97316;color:#000',Yellow:'#eab308;color:#000',Green:'#16a34a;color:#fff',Blue:'#2563eb;color:#fff',Violet:'#7c3aed;color:#fff',Grey:'#6b7280;color:#fff',White:'#fff;color:#000',Gold:'#d97706;color:#000',Silver:'#9ca3af;color:#000'};
  const sigColors=colors.slice(0,10);
  const multColors=colors;
  const tolColors=['Brown','Red','Green','Blue','Violet','Grey','Gold','Silver'];
  let bands=['Brown','Black','Red','Gold'];
  let mode=4;
  function mkSel(choices,val,onChange){
    const s=document.createElement('select');
    s.style.cssText='padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)';
    choices.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;if(c===val)o.selected=true;s.appendChild(o);});
    s.addEventListener('change',onChange);return s;
  }
  function calc(){
    let ohm;
    if(mode===4){
      ohm=(vals[bands[0]]*10+vals[bands[1]])*mults[bands[2]];
    }else{
      ohm=(vals[bands[0]]*100+vals[bands[1]]*10+vals[bands[2]])*mults[bands[3]];
    }
    const tolBand=mode===4?bands[3]:bands[4];
    const tol=tols[tolBand]||'?';
    const fmt=v=>{if(v>=1e9)return(v/1e9).toPrecision(4).replace(/\.?0+$/,'')+' GΩ';if(v>=1e6)return(v/1e6).toPrecision(4).replace(/\.?0+$/,'')+' MΩ';if(v>=1e3)return(v/1e3).toPrecision(4).replace(/\.?0+$/,'')+' kΩ';return v+' Ω';};
    document.getElementById('rc-out').textContent=fmt(ohm)+' '+tol;
    const tolPct=parseFloat(tol)/100;
    document.getElementById('rc-range').textContent='Range: '+fmt(ohm*(1-tolPct))+' – '+fmt(ohm*(1+tolPct));
  }
  function render(){
    const cont=document.getElementById('rc-bands');cont.innerHTML='';
    const modeToggle=document.createElement('select');
    modeToggle.innerHTML='<option value="4">4-band</option><option value="5">5-band</option>';
    modeToggle.value=String(mode);modeToggle.style.cssText='padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)';
    modeToggle.addEventListener('change',function(){mode=parseInt(this.value);bands=mode===4?['Brown','Black','Red','Gold']:['Brown','Black','Black','Red','Brown'];render();calc();});
    cont.appendChild(modeToggle);
    if(mode===4){
      [sigColors,sigColors,multColors,tolColors].forEach((choices,i)=>{
        const s=mkSel(choices,bands[i],function(){bands[i]=this.value;calc();});
        s.style.background=css[bands[i]].split(';')[0];cont.appendChild(s);
      });
    }else{
      [sigColors,sigColors,sigColors,multColors,tolColors].forEach((choices,i)=>{
        const s=mkSel(choices,bands[i],function(){bands[i]=this.value;calc();});cont.appendChild(s);
      });
    }
    calc();
  }
  render();
})();