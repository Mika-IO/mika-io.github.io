(function(){
  function fact(n){let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
  document.getElementById('comb-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=Math.min(30,Math.max(0,parseInt(document.getElementById('comb-n').value)||0));
    const r=Math.min(n,Math.max(0,parseInt(document.getElementById('comb-r').value)||0));
    const pnr=fact(n)/fact(n-r);
    const cnr=pnr/fact(r);
    document.getElementById('comb-c').textContent=cnr.toLocaleString(window.__LANG||undefined);
    document.getElementById('comb-p').textContent=pnr.toLocaleString(window.__LANG||undefined);
    document.getElementById('comb-out').hidden=false;
  });
})();