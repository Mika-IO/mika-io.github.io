(function(){
  document.getElementById('pf-form').addEventListener('submit',function(e){
    e.preventDefault();
    let n=parseInt(document.getElementById('pf-n').value);
    if(!n||n<2){document.getElementById('pf-out').textContent='Enter a number ≥ 2';return;}
    const factors={};let temp=n;
    for(let d=2;d*d<=temp;d++){while(temp%d===0){factors[d]=(factors[d]||0)+1;temp=Math.floor(temp/d);}}
    if(temp>1)factors[temp]=(factors[temp]||0)+1;
    const expr=Object.entries(factors).map(([p,e])=>e>1?`${p}<sup>${e}</sup>`:p).join(' × ');
    // compute divisors
    let divs=[1];
    Object.entries(factors).forEach(([p,e])=>{
      const pp=parseInt(p);const newDivs=[];
      for(let i=1;i<=e;i++)divs.forEach(d=>newDivs.push(d*Math.pow(pp,i)));
      divs=[...divs,...newDivs];
    });
    divs.sort((a,b)=>a-b);
    document.getElementById('pf-out').innerHTML=`<p><strong>${n} = ${expr}</strong></p><p style="opacity:0.6;font-size:0.85rem">Divisors (${divs.length}): ${divs.join(', ')}</p>`;
  });
})();