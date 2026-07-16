(function(){
  document.getElementById('br-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dob=new Date(document.getElementById('br-dob').value);
    const now=new Date();const days=Math.floor((now-dob)/86400000);
    const phys=Math.round(Math.sin(2*Math.PI*days/23)*100);
    const emo=Math.round(Math.sin(2*Math.PI*days/28)*100);
    const intl=Math.round(Math.sin(2*Math.PI*days/33)*100);
    const out=document.getElementById('br-out');out.hidden=false;
    function bar(v){const c=v>=0?'#22c55e':'#ef4444';const w=Math.abs(v);return '<div style="display:flex;align-items:center;gap:0.5rem"><div style="width:50%;display:flex;justify-content:flex-end"><div style="width:'+( v<0?w:0)+'%;height:12px;background:'+c+';border-radius:4px"></div></div><div style="width:50%"><div style="width:'+(v>=0?w:0)+'%;height:12px;background:'+c+';border-radius:4px"></div></div></div>';}
    out.innerHTML='<p style="opacity:0.6;font-size:0.85rem">Day '+days+' of life</p><div style="display:grid;gap:0.75rem;margin-top:0.5rem">'+[['Physical (23d)',phys,'#6366f1'],['Emotional (28d)',emo,'#ec4899'],['Intellectual (33d)',intl,'#f59e0b']].map(function([n,v,c]){return '<div><div style="display:flex;justify-content:space-between;margin-bottom:0.3rem"><span>'+n+'</span><strong style="color:'+c+'">'+(v>0?'+':'')+v+'%</strong></div>'+bar(v)+'</div>';}).join('')+'</div>';
  });
})();