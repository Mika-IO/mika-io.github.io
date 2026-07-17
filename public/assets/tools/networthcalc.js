(function(){
  function mkRow(container){
    const row=document.createElement('div');
    row.style.cssText='display:flex;gap:0.4rem;margin-bottom:0.4rem';
    const label=document.createElement('input');label.type='text';label.placeholder=T('rowlabel','Label');label.style.cssText='flex:1;padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)';
    const val=document.createElement('input');val.type='number';val.placeholder='0';val.style.cssText='width:100px;padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)';
    val.addEventListener('input',calc);
    const del=document.createElement('button');del.textContent='×';del.style.cssText='padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;cursor:pointer;color:var(--text)';
    del.onclick=()=>{row.remove();calc();};
    row.append(label,val,del);container.appendChild(row);
    return row;
  }
  function sumContainer(id){return [...document.getElementById(id).querySelectorAll('input[type=number]')].reduce((s,i)=>s+(parseFloat(i.value)||0),0);}
  function calc(){
    const assets=sumContainer('nw-assets');
    const liabs=sumContainer('nw-liabs');
    const nw=assets-liabs;
    const res=document.getElementById('nw-result');
    res.innerHTML=[[T('totalassets','Total assets'),'$'+assets.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})],[T('totalliabs','Total liabilities'),'$'+liabs.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})],[T('networth','Net worth'),'$'+nw.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})]].map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  }
  [T('checking','Checking account'),T('savings','Savings account'),T('investments','Investments'),T('homevalue','Home value'),T('carvalue','Car value')].forEach(name=>{const r=mkRow(document.getElementById('nw-assets'));r.querySelector('input[type=text]').value=name;});
  [T('mortgage','Mortgage'),T('carloan','Car loan'),T('creditcards','Credit cards'),T('studentloans','Student loans')].forEach(name=>{const r=mkRow(document.getElementById('nw-liabs'));r.querySelector('input[type=text]').value=name;});
  document.getElementById('nw-add-asset').onclick=()=>mkRow(document.getElementById('nw-assets'));
  document.getElementById('nw-add-liab').onclick=()=>mkRow(document.getElementById('nw-liabs'));
  calc();
})();