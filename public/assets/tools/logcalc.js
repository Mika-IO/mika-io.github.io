(function(){
  const sel=document.getElementById('log-base');
  const cust=document.getElementById('log-custom');
  sel.addEventListener('change',function(){cust.hidden=this.value!=='custom';});
  document.getElementById('log-form').addEventListener('submit',function(e){
    e.preventDefault();
    const x=parseFloat(document.getElementById('log-x').value);
    const bSel=sel.value;
    const b=bSel==='e'?Math.E:bSel==='custom'?parseFloat(cust.value):parseFloat(bSel);
    const out=document.getElementById('log-out');
    if(!x||x<=0){out.textContent='x must be > 0';return;}
    if(!b||b<=0||b===1){out.textContent='Base must be > 0 and ≠ 1';return;}
    const result=Math.log(x)/Math.log(b);
    out.textContent=result.toPrecision(10);
  });
})();