(function(){
  const btn=document.getElementById('sc-calc');
  const inp=document.getElementById('sc-expr');
  const out=document.getElementById('sc-out');
  function calc(){
    const expr=inp.value.trim();
    if(!expr){out.textContent='—';return;}
    try{
      const sanitized=expr
        .replace(/\bsin\b/g,'Math.sin').replace(/\bcos\b/g,'Math.cos')
        .replace(/\btan\b/g,'Math.tan').replace(/\basin\b/g,'Math.asin')
        .replace(/\bacos\b/g,'Math.acos').replace(/\batan\b/g,'Math.atan')
        .replace(/\blog2\b/g,'Math.log2').replace(/\bln\b/g,'Math.log')
        .replace(/\blog\b/g,'Math.log10').replace(/\bsqrt\b/g,'Math.sqrt')
        .replace(/\babs\b/g,'Math.abs').replace(/\bpow\b/g,'Math.pow')
        .replace(/\bPI\b/g,'Math.PI').replace(/\bE\b/g,'Math.E');
      // eslint-disable-next-line no-new-func
      const result=Function('"use strict";return ('+sanitized+')')();
      out.textContent=Number.isFinite(result)?+result.toPrecision(10):'Error';
    }catch(e){out.textContent='Error';}
  }
  btn.addEventListener('click',calc);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')calc();});
})();