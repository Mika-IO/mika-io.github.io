(function(){
  function hexToRgb(hex){return[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];}
  function update(){
    const x=document.getElementById('bs-x').value;
    const y=document.getElementById('bs-y').value;
    const blur=document.getElementById('bs-blur').value;
    const spread=document.getElementById('bs-spread').value;
    const color=document.getElementById('bs-color').value;
    const alpha=parseInt(document.getElementById('bs-alpha').value)/100;
    const [r,g,b]=hexToRgb(color);
    const shadow=x+'px '+y+'px '+blur+'px '+spread+'px rgba('+r+','+g+','+b+','+alpha.toFixed(2)+')';
    const css='box-shadow: '+shadow+';';
    document.getElementById('bs-preview').style.boxShadow=shadow;
    const el=document.getElementById('bs-code');el.textContent=css;el.dataset.css=css;
  }
  ['bs-x','bs-y','bs-blur','bs-spread','bs-color','bs-alpha'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
})();