(function(){
  var show=false;
  document.getElementById("pws-toggle").onclick=function(){
    show=!show;
    document.getElementById("pws-in").type=show?"text":"password";
    this.textContent=show?"hide":"show";
  };
  document.getElementById("pws-in").addEventListener("input",function(){
    var p=this.value;
    var checks=[
      ["At least 8 characters",p.length>=8],
      ["At least 12 characters",p.length>=12],
      ["Uppercase letters",/[A-Z]/.test(p)],
      ["Lowercase letters",/[a-z]/.test(p)],
      ["Numbers",/[0-9]/.test(p)],
      ["Symbols (!@#...)",/[^a-zA-Z0-9]/.test(p)],
      ["No common patterns",!/(123|abc|password|qwerty)/i.test(p)]
    ];
    var score=checks.filter(function(c){return c[1];}).length;
    var colors=["#ef4444","#ef4444","#f97316","#eab308","#84cc16","#22c55e","#22c55e"];
    var labels=["Very Weak","Weak","Poor","Fair","Good","Strong","Very Strong"];
    document.getElementById("pws-fill").style.width=((score/7)*100)+"%";
    document.getElementById("pws-fill").style.background=colors[score];
    document.getElementById("pws-label").style.color=colors[score];
    document.getElementById("pws-label").textContent=labels[score];
    document.getElementById("pws-checks").innerHTML=checks.map(function(c){
      return "<div style=\"color:"+(c[1]?"#22c55e":"#6b7280")+"\">"+(c[1]?"[+]":"[ ]")+" "+c[0]+"</div>";
    }).join("");
  });
})();