(function(){
  function genV4(){
    const arr=new Uint8Array(16);
    crypto.getRandomValues(arr);
    arr[6]=(arr[6]&0x0f)|0x40;
    arr[8]=(arr[8]&0x3f)|0x80;
    const h=Array.from(arr).map(v=>v.toString(16).padStart(2,'0'));
    return `${h.slice(0,4).join('')}-${h.slice(4,6).join('')}-${h.slice(6,8).join('')}-${h.slice(8,10).join('')}-${h.slice(10,16).join('')}`;
  }
  document.getElementById('uuid-gen').onclick=function(){
    const n=Math.min(50,Math.max(1,parseInt(document.getElementById('uuid-n').value)||5));
    const ver=document.getElementById('uuid-ver').value;
    const uuids=Array.from({length:n},()=>ver==='nil'?'00000000-0000-0000-0000-000000000000':genV4());
    const out=document.getElementById('uuid-out');
    out.innerHTML=uuids.map(u=>`<div style="font-family:monospace;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer" onclick="navigator.clipboard.writeText('${u}');this.style.borderColor='var(--accent,#6366f1)'">${u}</div>`).join('');
  };
})();