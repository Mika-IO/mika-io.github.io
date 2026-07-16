(function(){
  document.getElementById('fact-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=Math.min(170,Math.max(0,parseInt(document.getElementById('fact-n').value)||0));
    let result=1;
    for(let i=2;i<=n;i++)result*=i;
    const out=document.getElementById('fact-out');
    const dig=document.getElementById('fact-digits');
    if(n<=20){out.textContent=result.toLocaleString(window.__LANG||undefined);}
    else{out.textContent=result.toExponential(6);}
    dig.textContent=n+'! has approximately '+Math.ceil(n*Math.log10(n)-n*Math.LOG10E+0.5).toString()+' digits';
  });
})();