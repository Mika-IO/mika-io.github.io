(function(){
  document.getElementById("ln-gen").onclick=function(){
    var max=parseInt(document.getElementById("ln-range").value);
    var nums=[];
    while(nums.length<6){var n=Math.floor(Math.random()*max)+1;if(nums.indexOf(n)<0)nums.push(n);}
    nums.sort(function(a,b){return a-b;});
    document.getElementById("ln-out").innerHTML=nums.map(function(n){
      return "<span style=\"display:inline-block;margin:0.2rem;background:var(--surface);border:2px solid var(--accent,#6366f1);border-radius:50%;width:48px;height:48px;line-height:48px;text-align:center\">"+n+"</span>";
    }).join("");
  };
})();