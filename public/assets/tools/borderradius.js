(function(){
  function update(){
    const tl=document.getElementById('br-tl').value+'px';const tr=document.getElementById('br-tr').value+'px';
    const bl=document.getElementById('br-bl').value+'px';const br=document.getElementById('br-br').value+'px';
    const val=tl+' '+tr+' '+br+' '+bl;
    document.getElementById('br-preview').style.borderRadius=val;
    const css='border-radius: '+val+';';
    const el=document.getElementById('br-code');el.textContent=css;el.dataset.css=css;
  }
  ['br-tl','br-tr','br-bl','br-br'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
})();