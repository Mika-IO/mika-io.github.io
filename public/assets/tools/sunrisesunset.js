(function(){
  document.getElementById("ss-date").value=new Date().toISOString().split("T")[0];
  document.getElementById("ss-form").addEventListener("submit",function(e){
    e.preventDefault();
    var lat=parseFloat(document.getElementById("ss-lat").value)*Math.PI/180;
    var lon=parseFloat(document.getElementById("ss-lon").value);
    var d=new Date(document.getElementById("ss-date").value);
    var J=Math.floor(d/86400000)+2440587.5;
    var n=J-2451545-0.0009-(lon/360);
    var M=(357.5291+0.98560028*n)%360*Math.PI/180;
    var C=1.9148*Math.sin(M)+0.0200*Math.sin(2*M)+0.0003*Math.sin(3*M);
    var lam=((280.4665+0.98564736*n+C)%360)*Math.PI/180;
    var dec=Math.asin(Math.sin(-23.4559*Math.PI/180)*Math.cos(lam));
    var cosHA=(Math.sin(-0.0145*Math.PI/180)-Math.sin(lat)*Math.sin(dec))/(Math.cos(lat)*Math.cos(dec));
    var out=document.getElementById("ss-out");out.hidden=false;
    if(Math.abs(cosHA)>1){out.innerHTML="<p>"+(cosHA<-1?"Midnight sun (no sunset)":"Polar night (no sunrise)")+"</p>";return;}
    var HA=Math.acos(cosHA)*180/Math.PI;
    var transit=2451545+0.0009+(lon/360)+n-J+2440587.5;
    var rise=transit-HA/360;
    var set2=transit+HA/360;
    function fmt(jd){var t=new Date((jd-2440587.5)*86400000);return t.toUTCString().split(" ")[4]+" UTC";}
    var day=(HA*2/180).toFixed(1);
    var items=[["Sunrise",fmt(rise)],["Sunset",fmt(set2)],["Day length",day+" hours"]];
    out.innerHTML=items.map(function(kv){return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem\"><div style=\"font-size:0.75rem;opacity:0.6\">"+kv[0]+"</div><strong>"+kv[1]+"</strong></div>";}).join("");
  });
})();