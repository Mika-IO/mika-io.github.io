(function(){
  document.getElementById("ns-form").addEventListener("submit",function(e){
    e.preventDefault();
    var size=parseFloat(document.getElementById("ns-size").value);
    var unit=document.getElementById("ns-sunit").value;
    var speed=parseFloat(document.getElementById("ns-speed").value);
    var mult={MB:1,GB:1024,TB:1024*1024};
    var bits=size*mult[unit]*8;
    var secs=bits/speed;
    var time;
    if(secs<60)time=secs.toFixed(1)+" seconds";
    else if(secs<3600)time=(secs/60).toFixed(1)+" minutes";
    else time=(secs/3600).toFixed(2)+" hours";
    var out=document.getElementById("ns-out");out.hidden=false;
    out.innerHTML="<div style=\"font-size:1.8rem;font-weight:800\">"+time+"</div><p style=\"opacity:0.6\">"+size+" "+unit+" at "+speed+" Mbps</p>";
  });
})();