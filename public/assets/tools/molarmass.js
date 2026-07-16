(function(){
  const elements={H:1.008,He:4.0026,Li:6.94,Be:9.0122,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998,Ne:20.180,Na:22.990,Mg:24.305,Al:26.982,Si:28.085,P:30.974,S:32.06,Cl:35.45,Ar:39.948,K:39.098,Ca:40.078,Sc:44.956,Ti:47.867,V:50.942,Cr:51.996,Mn:54.938,Fe:55.845,Co:58.933,Ni:58.693,Cu:63.546,Zn:65.38,Ga:69.723,Ge:72.630,As:74.922,Se:78.971,Br:79.904,Kr:83.798,Rb:85.468,Sr:87.62,Y:88.906,Zr:91.224,Nb:92.906,Mo:95.95,Tc:98,Ru:101.07,Rh:102.91,Pd:106.42,Ag:107.87,Cd:112.41,In:114.82,Sn:118.71,Sb:121.76,Te:127.60,I:126.90,Xe:131.29,Cs:132.91,Ba:137.33,La:138.91,Ce:140.12,Pr:140.91,Nd:144.24,Pm:145,Sm:150.36,Eu:151.96,Gd:157.25,Tb:158.93,Dy:162.50,Ho:164.93,Er:167.26,Tm:168.93,Yb:173.05,Lu:174.97,Hf:178.49,Ta:180.95,W:183.84,Re:186.21,Os:190.23,Ir:192.22,Pt:195.08,Au:196.97,Hg:200.59,Tl:204.38,Pb:207.2,Bi:208.98,Po:209,At:210,Rn:222,Fr:223,Ra:226,Ac:227,Th:232.04,Pa:231.04,U:238.03};
  function parseMM(formula){
    const stack=[{}];
    let i=0;
    while(i<formula.length){
      if(formula[i]==='('){stack.push({});i++;}
      else if(formula[i]===')'){
        i++;let mul=0;
        while(i<formula.length&&/\d/.test(formula[i])){mul=mul*10+parseInt(formula[i]);i++;}
        if(mul===0)mul=1;
        const top=stack.pop();
        for(const el in top)(stack[stack.length-1][el]=(stack[stack.length-1][el]||0)+top[el]*mul);
      }else if(/[A-Z]/.test(formula[i])){
        let sym=formula[i++];
        while(i<formula.length&&/[a-z]/.test(formula[i]))sym+=formula[i++];
        let cnt=0;
        while(i<formula.length&&/\d/.test(formula[i])){cnt=cnt*10+parseInt(formula[i]);i++;}
        if(cnt===0)cnt=1;
        stack[stack.length-1][sym]=(stack[stack.length-1][sym]||0)+cnt;
      }else i++;
    }
    return stack[0];
  }
  document.getElementById('mm-form').addEventListener('submit',function(e){
    e.preventDefault();
    const formula=document.getElementById('mm-formula').value.trim();
    const out=document.getElementById('mm-out');
    try{
      const composition=parseMM(formula);
      let totalMass=0;const breakdown=[];
      for(const sym in composition){
        if(!elements[sym]){out.innerHTML='<p style="color:var(--red,#ef4444)">Unknown element: '+sym+'</p>';out.hidden=false;return;}
        const cnt=composition[sym];const mass=elements[sym]*cnt;totalMass+=mass;
        breakdown.push(`<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid var(--line)"><span>${sym} × ${cnt}</span><span>${(elements[sym]).toFixed(3)} × ${cnt} = ${mass.toFixed(3)}</span></div>`);
      }
      out.hidden=false;
      out.innerHTML='<strong style="font-size:1.4rem">'+totalMass.toFixed(4)+' g/mol</strong><div style="margin-top:0.75rem;font-size:0.875rem">'+breakdown.join('')+'</div>';
    }catch(err){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid formula</p>';out.hidden=false;}
  });
})();