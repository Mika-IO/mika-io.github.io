(function(){
  function update(){
    const c1=document.getElementById('cg-c1').value;
    const c2=document.getElementById('cg-c2').value;
    const type=document.getElementById('cg-type').value;
    const angle=document.getElementById('cg-angle').value;
    let css;
    if(type==='linear')css='linear-gradient('+angle+'deg, '+c1+', '+c2+')';
    else if(type==='radial')css='radial-gradient(circle, '+c1+', '+c2+')';
    else css='conic-gradient(from '+angle+'deg, '+c1+', '+c2+', '+c1+')';
    const full='background: '+css+';';
    document.getElementById('cg-preview').style.background=css;
    const codeEl=document.getElementById('cg-code');codeEl.textContent=full;codeEl.dataset.css=full;
  }
  ['cg-c1','cg-c2','cg-type','cg-angle'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
})();