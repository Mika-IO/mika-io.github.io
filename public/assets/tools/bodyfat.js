(function(){
  function buildFields(){
    const g=document.getElementById('bf-gender').value;
    const u=document.getElementById('bf-unit').value;
    const unit=u==='cm'?'cm':'in';
    const fields=g==='m'?[['height',T('height','Height')+' ('+unit+')'],['neck',T('neck','Neck')+' ('+unit+')'],['waist',T('waist','Waist')+' ('+unit+')']]:
      [['height','Height ('+unit+')'],['neck','Neck ('+unit+')'],['waist','Waist ('+unit+')'],['hip',T('hip','Hip')+' ('+unit+')']];
    const container=document.getElementById('bf-fields');
    container.innerHTML=fields.map(([id,label])=>`<div class="field"><label for="bf-${id}">${label}</label><input type="number" id="bf-${id}" step="any" min="0" inputmode="decimal"></div>`).join('');
  }
  document.getElementById('bf-gender').addEventListener('change',buildFields);
  document.getElementById('bf-unit').addEventListener('change',buildFields);
  buildFields();
  document.getElementById('bf-form').addEventListener('submit',function(e){
    e.preventDefault();
    const g=document.getElementById('bf-gender').value;
    const u=document.getElementById('bf-unit').value;
    let height=parseFloat(document.getElementById('bf-height').value);
    let neck=parseFloat(document.getElementById('bf-neck').value);
    let waist=parseFloat(document.getElementById('bf-waist').value);
    let hip=g==='f'?parseFloat(document.getElementById('bf-hip').value):0;
    if(u==='in'){height*=2.54;neck*=2.54;waist*=2.54;hip*=2.54;}
    let bf;
    if(g==='m'){bf=495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(height))-450;}
    else{bf=495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(height))-450;}
    const out=document.getElementById('bf-out');
    const category=g==='m'?(bf<6?'Essential fat':bf<14?'Athlete':bf<18?'Fitness':bf<25?'Average':'Obese'):(bf<14?'Essential fat':bf<21?'Athlete':bf<25?'Fitness':bf<32?'Average':'Obese');
    out.hidden=false;
    out.innerHTML=`<span class="big">${bf.toFixed(1)}%</span><p class="hint">Category: ${category}</p>`;
  });
})();