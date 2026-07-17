(function(){
  const fields=['cb-min','cb-hr','cb-dom','cb-mon','cb-dow'];
  function describe(expr){
    const parts=expr.trim().split(/\s+/);
    if(parts.length!==5)return T('invalidexpr','Invalid expression');
    const[min,hr,dom,mon,dow]=parts;
    if(expr==='* * * * *')return 'Every minute';
    if(min.startsWith('*/'))return 'Every '+min.slice(2)+' minutes';
    if(min==='0'&&hr==='*')return 'Every hour at minute 0';
    if(min==='0'&&dom==='*'&&mon==='*'&&dow==='*')return 'Every day at '+hr+':00';
    if(min==='0'&&hr==='0'&&dom==='*'&&mon==='*'&&dow==='*')return 'Daily at midnight';
    return 'Runs: '+expr;
  }
  function update(){
    const val=fields.map(id=>document.getElementById(id).value||'*').join(' ');
    document.getElementById('cb-expr').textContent=val;
    document.getElementById('cb-desc').textContent=describe(val);
  }
  fields.forEach(id=>document.getElementById(id).addEventListener('input',update));
  document.querySelectorAll('.cb-preset').forEach(btn=>{
    btn.onclick=function(){
      const parts=this.dataset.val.split(' ');
      fields.forEach((id,i)=>document.getElementById(id).value=parts[i]);update();
    };
  });
  update();
})();