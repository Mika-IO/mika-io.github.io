(function(){
  const labels={f:['Mass (kg)','Acceleration (m/s²)'],m:['Force (N)','Acceleration (m/s²)'],a:['Force (N)','Mass (kg)']};
  function updateLabels(){
    const t=document.getElementById('nl-type').value;
    document.querySelector('[for=nl-a]').textContent=labels[t][0];
    document.querySelector('[for=nl-b]').textContent=labels[t][1];
  }
  document.getElementById('nl-type').addEventListener('change',updateLabels);
  updateLabels();
  document.getElementById('nl-form').addEventListener('submit',function(e){
    e.preventDefault();
    const t=document.getElementById('nl-type').value;
    const a=parseFloat(document.getElementById('nl-a').value);
    const b=parseFloat(document.getElementById('nl-b').value);
    const out=document.getElementById('nl-out');
    let result,unit,formula;
    if(t==='f'){result=a*b;unit='N';formula=a+' kg × '+b+' m/s² = ';}
    else if(t==='m'){result=a/b;unit='kg';formula=a+' N ÷ '+b+' m/s² = ';}
    else{result=a/b;unit='m/s²';formula=a+' N ÷ '+b+' kg = ';}
    out.hidden=false;
    out.innerHTML=`<span class="big">${formula}${result.toPrecision(6).replace(/\.?0+$/,'')} ${unit}</span>`;
  });
})();