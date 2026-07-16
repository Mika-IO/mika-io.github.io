(function(){
  document.getElementById('as-type').addEventListener('change',function(){
    document.getElementById('as-linear-fields').style.display=this.value==='linear'?'':'none';
    document.getElementById('as-sys-fields').style.display=this.value==='systems'?'':'none';
  });
  document.getElementById('as-form').addEventListener('submit',function(e){
    e.preventDefault();
    const type=document.getElementById('as-type').value;
    const out=document.getElementById('as-out');out.hidden=false;
    if(type==='linear'){
      const a=parseFloat(document.getElementById('as-a').value);
      const b=parseFloat(document.getElementById('as-b').value);
      const c=parseFloat(document.getElementById('as-c').value);
      if(a===0){out.innerHTML='<p>No unique solution (a = 0)</p>';return;}
      const x=(c-b)/a;
      out.innerHTML=`<div style="font-size:1.8rem;font-weight:800">x = ${x.toPrecision(8).replace(/\.?0+$/,'')}</div><p style="opacity:0.6">${a}x + ${b} = ${c} → x = (${c} − ${b}) / ${a}</p>`;
    }else{
      const a1=parseFloat(document.getElementById('as-a1').value),b1=parseFloat(document.getElementById('as-b1').value),c1=parseFloat(document.getElementById('as-c1').value);
      const a2=parseFloat(document.getElementById('as-a2').value),b2=parseFloat(document.getElementById('as-b2').value),c2=parseFloat(document.getElementById('as-c2').value);
      const D=a1*b2-a2*b1;
      if(D===0){out.innerHTML='<p>No unique solution (D = 0)</p>';return;}
      const x=(c1*b2-c2*b1)/D,y=(a1*c2-a2*c1)/D;
      out.innerHTML=`<div style="font-size:1.5rem;font-weight:800">x = ${x.toPrecision(8).replace(/\.?0+$/,'')}, y = ${y.toPrecision(8).replace(/\.?0+$/,'')}</div><p style="opacity:0.6">D = ${D}</p>`;
    }
  });
})();