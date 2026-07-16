(function(){
  document.getElementById("ai-form").addEventListener("submit",function(e){
    e.preventDefault();
    var dob=new Date(document.getElementById("ai-dob").value);
    var now=new Date();
    var ms=now-dob;
    var secs=ms/1000;
    var mins=secs/60;
    var hrs=mins/60;
    var days=hrs/24;
    var weeks=days/7;
    var yrs=now.getFullYear()-dob.getFullYear()-(now<new Date(now.getFullYear(),dob.getMonth(),dob.getDate())?1:0);
    var months=yrs*12+(now.getMonth()-dob.getMonth()+(now.getDate()<dob.getDate()?-1:0));
    var items=[["Years",yrs],["Months",months],["Weeks",Math.floor(weeks)],["Days",Math.floor(days)],["Hours",Math.floor(hrs)],["Minutes",Math.floor(mins)],["Seconds",Math.floor(secs)]];
    var out=document.getElementById("ai-out");out.hidden=false;
    out.innerHTML=items.map(function(kv){
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem\"><div style=\"font-size:0.7rem;opacity:0.6\">"+kv[0]+"</div><strong style=\"font-size:0.95rem\">"+kv[1].toLocaleString(window.__LANG||undefined)+"</strong></div>";
    }).join("");
  });
})();