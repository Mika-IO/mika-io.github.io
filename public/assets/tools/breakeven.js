(function(){
  document.getElementById('be-form').addEventListener('submit',function(e){
    e.preventDefault();
    const fixed=parseFloat(document.getElementById('be-fixed').value)||0;
    const price=parseFloat(document.getElementById('be-price').value)||0;
    const variable=parseFloat(document.getElementById('be-var').value)||0;
    const out=document.getElementById('be-out');
    const cm=price-variable;
    if(cm<=0){out.innerHTML='<p style="color:var(--red,#ef4444)">Selling price must exceed variable cost</p>';out.hidden=false;return;}
    const units=Math.ceil(fixed/cm);
    const revenue=units*price;
    const margin=(cm/price*100).toFixed(1);
    const items=[['Break-even units',units.toLocaleString(window.__LANG||undefined)],['Break-even revenue','$'+revenue.toLocaleString(window.__LANG||undefined)],['Contribution margin','$'+cm.toFixed(2)],['Margin ratio',margin+'%'],['Fixed costs','$'+fixed.toLocaleString(window.__LANG||undefined)]];
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();