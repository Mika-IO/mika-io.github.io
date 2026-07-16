(function(){
  document.getElementById("ts-form").addEventListener("submit",function(e){
    e.preventDefault();
    var bill=parseFloat(document.getElementById("ts-bill").value);
    var tipPct=parseFloat(document.getElementById("ts-tip").value);
    var people=parseInt(document.getElementById("ts-people").value);
    var tipAmt=bill*tipPct/100;
    var total=bill+tipAmt;
    var perPerson=total/people;
    var tipPer=tipAmt/people;
    var out=document.getElementById("ts-out");out.hidden=false;
    var items=[
      ["Tip amount","$"+tipAmt.toFixed(2)],
      ["Total with tip","$"+total.toFixed(2)],
      ["Per person","$"+perPerson.toFixed(2)],
      ["Tip per person","$"+tipPer.toFixed(2)]
    ];
    out.innerHTML=items.map(function(kv){
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem\"><div style=\"font-size:0.75rem;opacity:0.6\">"+kv[0]+"</div><strong style=\"font-size:1.3rem\">"+kv[1]+"</strong></div>";
    }).join("");
  });
})();