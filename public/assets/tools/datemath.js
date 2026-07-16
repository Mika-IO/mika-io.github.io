(function(){
  document.getElementById("dm-date").value=new Date().toISOString().split("T")[0];
  document.getElementById("dm-form").addEventListener("submit",function(e){
    e.preventDefault();
    var d=new Date(document.getElementById("dm-date").value);
    var op=document.getElementById("dm-op").value;
    var n=parseInt(document.getElementById("dm-n").value);
    var unit=document.getElementById("dm-unit").value;
    var sign=op==="add"?1:-1;
    var result=new Date(d);
    if(unit==="days")result.setDate(result.getDate()+sign*n);
    else if(unit==="weeks")result.setDate(result.getDate()+sign*n*7);
    else if(unit==="months")result.setMonth(result.getMonth()+sign*n);
    else result.setFullYear(result.getFullYear()+sign*n);
    var diff=Math.round((result-d)/86400000);
    var out=document.getElementById("dm-out");out.hidden=false;
    out.innerHTML="<div style=\"font-size:1.5rem;font-weight:800\">"+result.toDateString()+"</div><p style=\"opacity:0.6\">"+Math.abs(diff)+" days "+(diff>=0?"after":"before")+" the start date</p>";
  });
})();