(function(){
  var pos={A:"L-down R-down-right",B:"L-down R-right",C:"L-down R-up-right",D:"L-down R-up",
    E:"L-down R-up-left",F:"L-down R-left",G:"L-down-right R-down",H:"L-right R-down-right",
    I:"L-right R-right",J:"L-up R-down",K:"L-down-right R-up",L:"L-down-right R-up-right",
    M:"L-down-right R-up-left",N:"L-down-right R-left",O:"L-right R-up-right",P:"L-right R-up-left",
    Q:"L-right R-left",R:"L-up-right R-up-left",S:"L-up-right R-left",T:"L-up R-up-left",
    U:"L-up R-left",V:"L-up-left R-left",W:"L-down R-up-left",X:"L-up-right R-down-right",
    Y:"L-down-right R-right",Z:"L-right R-down"};
  document.getElementById("sem-in").addEventListener("input",function(){
    var chars=this.value.toUpperCase().split("");
    document.getElementById("sem-out").innerHTML=chars.map(function(c){
      if(c===" ")return "<div style=\"width:1.5rem\"></div>";
      var desc=pos[c]||c;
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;text-align:center;min-width:60px\"><div style=\"font-size:1.2rem;font-weight:800\">"+c+"</div><div style=\"font-size:0.65rem;opacity:0.6;line-height:1.3;max-width:80px\">"+desc+"</div></div>";
    }).join("");
  });
})();