(function(){
  var tips=[
    ["USA","Restaurant","15-20%","Expected; 20%+ for good service"],
    ["USA","Bar","$1-2/drink","Per drink or 15-20% of tab"],
    ["USA","Taxi","10-15%","Round up to nearest dollar"],
    ["USA","Hotel porter","$1-2/bag","Standard"],
    ["Canada","Restaurant","15-20%","Similar to USA"],
    ["UK","Restaurant","10-12.5%","Often included as service charge"],
    ["UK","Taxi","10%","Round up"],
    ["Germany","Restaurant","5-10%","Round up the bill"],
    ["France","Restaurant","0-5%","Service compris usually included"],
    ["Italy","Restaurant","0-5%","Cover charge (coperto) is separate"],
    ["Japan","Restaurant","0%","Tipping is considered rude"],
    ["Australia","Restaurant","0-10%","Not expected, appreciated for good service"],
    ["Brazil","Restaurant","10%","Usually added automatically"],
    ["Mexico","Restaurant","10-15%","Standard"],
    ["Spain","Restaurant","5-10%","Not required but appreciated"],
    ["Netherlands","Restaurant","5-10%","Round up is common"],
    ["UAE","Restaurant","10-15%","Service charge often added"]
  ];
  function render(q){
    var f=q?tips.filter(function(t){return (t[0]+t[1]).toLowerCase().indexOf(q.toLowerCase())>=0;}):tips;
    document.getElementById("tg-list").innerHTML=f.map(function(t){
      return "<div style=\"display:grid;grid-template-columns:100px 100px 80px 1fr;gap:0.5rem;align-items:center;padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem\"><strong>"+t[0]+"</strong><span style=\"opacity:0.7\">"+t[1]+"</span><span style=\"color:var(--accent,#6366f1);font-weight:600\">"+t[2]+"</span><span style=\"opacity:0.6;font-size:0.8rem\">"+t[3]+"</span></div>";
    }).join("");
  }
  document.getElementById("tg-search").addEventListener("input",function(){render(this.value);});
  render("");
})();