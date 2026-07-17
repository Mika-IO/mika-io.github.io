(function(){
  var tips=[
    ["USA",T('restaurant','Restaurant'),"15-20%",T('expected20forgoodservi','Expected; 20%+ for good service')],
    ["USA",T('bar','Bar'),"$1-2/drink",T('perdrinkor1520oftab','Per drink or 15-20% of tab')],
    ["USA",T('taxi','Taxi'),"10-15%",T('rounduptonearestdollar','Round up to nearest dollar')],
    ["USA",T('hotelporter','Hotel porter'),"$1-2/bag",T('standard','Standard')],
    ["Canada",T('restaurant','Restaurant'),"15-20%",T('similartousa','Similar to USA')],
    ["UK",T('restaurant','Restaurant'),"10-12.5%",T('oftenincludedasservice','Often included as service charge')],
    ["UK",T('taxi','Taxi'),"10%",T('roundup','Round up')],
    ["Germany",T('restaurant','Restaurant'),"5-10%",T('roundupthebill','Round up the bill')],
    ["France",T('restaurant','Restaurant'),"0-5%",T('servicecomprisusuallyi','Service compris usually included')],
    ["Italy",T('restaurant','Restaurant'),"0-5%",T('coverchargecopertoisse','Cover charge (coperto) is separate')],
    ["Japan",T('restaurant','Restaurant'),"0%",T('tippingisconsideredrud','Tipping is considered rude')],
    ["Australia",T('restaurant','Restaurant'),"0-10%",T('notexpectedappreciated','Not expected, appreciated for good service')],
    ["Brazil",T('restaurant','Restaurant'),"10%",T('usuallyaddedautomatica','Usually added automatically')],
    ["Mexico",T('restaurant','Restaurant'),"10-15%",T('standard','Standard')],
    ["Spain",T('restaurant','Restaurant'),"5-10%",T('notrequiredbutapprecia','Not required but appreciated')],
    ["Netherlands",T('restaurant','Restaurant'),"5-10%",T('roundupiscommon','Round up is common')],
    ["UAE",T('restaurant','Restaurant'),"10-15%",T('servicechargeoftenadde','Service charge often added')]
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