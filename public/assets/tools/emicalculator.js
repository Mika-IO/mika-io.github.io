(function(){
  document.getElementById("emi-form").addEventListener("submit",function(e){
    e.preventDefault();
    var P=parseFloat(document.getElementById("emi-p").value);
    var annualR=parseFloat(document.getElementById("emi-r").value);
    var n=parseInt(document.getElementById("emi-n").value);
    var r=annualR/(12*100);
    var emi;
    if(r===0){emi=P/n;}else{var pow=Math.pow(1+r,n);emi=P*r*pow/(pow-1);}
    var totalPayment=emi*n;
    var totalInterest=totalPayment-P;
    var out=document.getElementById("emi-out");out.hidden=false;
    var items=[
      ["Monthly EMI","$"+emi.toFixed(2)],
      ["Total interest","$"+totalInterest.toFixed(2)],
      ["Total payment","$"+totalPayment.toFixed(2)],
      ["Interest ratio",(totalInterest/P*100).toFixed(1)+"%"]
    ];
    out.innerHTML=items.map(function(kv){
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem\"><div style=\"font-size:0.75rem;opacity:0.6\">"+kv[0]+"</div><strong style=\"font-size:1.2rem\">"+kv[1]+"</strong></div>";
    }).join("");
  });
})();