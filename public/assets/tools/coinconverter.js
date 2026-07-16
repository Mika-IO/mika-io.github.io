(function(){
  var denoms=[["$100",10000],["$50",5000],["$20",2000],["$10",1000],["$5",500],["$1",100],["25c",25],["10c",10],["5c",5],["1c",1]];
  var cont=document.getElementById("cc2-coins");
  var inputs=denoms.map(function(d){
    var div=document.createElement("div");
    div.style.cssText="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem";
    div.innerHTML="<label style=\"font-size:0.8rem;opacity:0.7\">"+d[0]+"</label><input type=\"number\" min=\"0\" step=\"1\" value=\"0\" style=\"width:100%;padding:0.3rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text);text-align:center;font-size:1.1rem\">";
    cont.appendChild(div);
    var inp=div.querySelector("input");
    inp.addEventListener("input",update);
    return {inp:inp,cents:d[1]};
  });
  function update(){
    var total=inputs.reduce(function(a,x){return a+parseInt(x.inp.value||0)*x.cents;},0);
    document.getElementById("cc2-total").textContent="$"+(total/100).toFixed(2);
  }
  update();
})();