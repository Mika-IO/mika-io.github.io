(function(){
  function b64d(str){try{return JSON.parse(atob(str.replace(/-/g,'+').replace(/_/g,'/')));}catch{return null;}}
  document.getElementById('jd-go').onclick=function(){
    const token=document.getElementById('jd-token').value.trim();
    const out=document.getElementById('jd-out');
    const parts=token.split('.');
    if(parts.length!==3){out.innerHTML='<p style="color:#ef4444">Invalid JWT (must have 3 parts)</p>';return;}
    const header=b64d(parts[0]),payload=b64d(parts[1]);
    const now=Date.now()/1000;
    const expInfo=payload&&payload.exp?((payload.exp>now)?'Valid (expires '+new Date(payload.exp*1000).toLocaleString(window.__LANG||undefined)+')':'Expired on '+new Date(payload.exp*1000).toLocaleString(window.__LANG||undefined)):'No exp claim';
    out.innerHTML=[
      '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.75rem"><strong>Header</strong><pre style="margin:0.4rem 0 0;font-size:0.85rem;white-space:pre-wrap">'+JSON.stringify(header,null,2)+'</pre></div>',
      '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.75rem"><strong>Payload</strong><pre style="margin:0.4rem 0 0;font-size:0.85rem;white-space:pre-wrap">'+JSON.stringify(payload,null,2)+'</pre></div>',
      '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><strong>Expiry:</strong> '+expInfo+'</div>'
    ].join('');
  };
  document.getElementById('jd-token').value='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
})();