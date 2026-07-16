(function(){
  document.getElementById("lc-go").onclick=function(){
    var n1=document.getElementById("lc-n1").value.trim();
    var n2=document.getElementById("lc-n2").value.trim();
    if(!n1||!n2)return;
    var seed=(n1+n2).split("").reduce(function(a,c){return a+c.charCodeAt(0);},0);
    var pct=((seed*1234567)%100+100)%100;
    var msg=pct<30?"Maybe just friends":pct<60?"Good potential":pct<80?"Great match!":"Soul mates!";
    var out=document.getElementById("lc-out");out.hidden=false;
    out.innerHTML="<div style=\"font-size:3rem;font-weight:800;color:var(--accent,#6366f1)\">"+pct+"%</div><p style=\"font-weight:600\">"+msg+"</p><p style=\"font-size:0.75rem;opacity:0.4;margin-top:0.5rem\">Just for fun - not scientifically accurate!</p>";
  };
})();