(function(){
  document.getElementById('mt-go').onclick=function(){
    const n=parseInt(document.getElementById('mt-num').value);
    const size=parseInt(document.getElementById('mt-size').value);
    let html='<table style="border-collapse:collapse;font-size:0.9rem">';
    for(let row=1;row<=size;row++){
      html+='<tr><td style="padding:4px 8px;background:var(--surface);font-weight:600;border:1px solid var(--line);text-align:center">'+n+' × '+row+'</td><td style="padding:4px 8px;border:1px solid var(--line);text-align:center;font-weight:700;color:var(--accent,#6366f1)">'+(n*row)+'</td></tr>';
    }
    html+='</table>';
    document.getElementById('mt-out').innerHTML=html;
  };
  document.getElementById('mt-go').click();
})();