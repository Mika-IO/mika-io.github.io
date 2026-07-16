(function(){
  function slugify(text,sep,lower){
    let s=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\s-_]/g,'').trim().replace(/[\s-_]+/g,sep);
    return lower?s.toLowerCase():s;
  }
  function update(){
    const text=document.getElementById('sg2-in').value;
    const sep=document.getElementById('sg2-sep').value;
    const lower=document.getElementById('sg2-lower').checked;
    const slug=slugify(text,sep,lower);
    const out=document.getElementById('sg2-out');
    out.textContent=slug||'—';
    out.onclick=()=>{if(slug)navigator.clipboard.writeText(slug);};
  }
  ['sg2-in','sg2-sep'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  document.getElementById('sg2-lower').addEventListener('change',update);
})();