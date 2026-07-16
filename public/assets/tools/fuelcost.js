(function(){
  document.getElementById("fc2-form").addEventListener("submit",function(e){
    e.preventDefault();
    var dist=parseFloat(document.getElementById("fc2-dist").value);
    var dunit=document.getElementById("fc2-dunit").value;
    var eff=parseFloat(document.getElementById("fc2-mpg").value);
    var eunit=document.getElementById("fc2-eunit").value;
    var price=parseFloat(document.getElementById("fc2-price").value);
    var punit=document.getElementById("fc2-punit").value;
    // Convert everything to miles and gallons
    var miles=dunit==="km"?dist*0.621371:dist;
    var mpg;
    if(eunit==="mpg")mpg=eff;
    else if(eunit==="L100")mpg=235.21/eff;
    else mpg=eff*2.352; // km/L to mpg
    var pricePerGal=punit==="L"?price*3.785:price;
    var gallons=miles/mpg;
    var cost=gallons*pricePerGal;
    var costPerMile=cost/miles;
    var out=document.getElementById("fc2-out");out.hidden=false;
    var items=[
      ["Total fuel cost","$"+cost.toFixed(2)],
      ["Fuel used",gallons.toFixed(2)+" gal / "+(gallons*3.785).toFixed(1)+" L"],
      ["Cost per mile","$"+costPerMile.toFixed(3)],
      ["Distance",miles.toFixed(1)+" mi / "+(miles*1.60934).toFixed(1)+" km"]
    ];
    out.innerHTML=items.map(function(kv){
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem\"><div style=\"font-size:0.75rem;opacity:0.6\">"+kv[0]+"</div><strong style=\"font-size:0.95rem\">"+kv[1]+"</strong></div>";
    }).join("");
  });
})();