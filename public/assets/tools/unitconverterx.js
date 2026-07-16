(function(){
  var cats={
    speed:{units:[["m/s",1],["km/h",1/3.6],["mph",1/2.237],["knots",1/1.944],["ft/s",1/3.281]],base:"m/s"},
    pressure:{units:[["Pa",1],["kPa",1000],["MPa",1e6],["bar",1e5],["psi",6894.76],["atm",101325],["mmHg",133.322]],base:"Pa"},
    energy:{units:[["J",1],["kJ",1000],["MJ",1e6],["cal",4.184],["kcal",4184],["Wh",3600],["kWh",3600000],["BTU",1055.06]],base:"J"},
    power:{units:[["W",1],["kW",1000],["MW",1e6],["hp",745.7],["BTU/h",0.2931]],base:"W"},
    data:{units:[["Bytes",1],["KB",1024],["MB",1048576],["GB",1073741824],["TB",1099511627776],["Bits",0.125],["Kbits",128],["Mbits",131072]],base:"Bytes"}
  };
  function populate(){
    var cat=cats[document.getElementById("ucx-cat").value];
    var sel=document.getElementById("ucx-from");
    sel.innerHTML=cat.units.map(function(u){return "<option value=\""+u[0]+"\">"+u[0]+"</option>";}).join("");
  }
  function convert(){
    var cat=cats[document.getElementById("ucx-cat").value];
    var v=parseFloat(document.getElementById("ucx-val").value);
    var from=document.getElementById("ucx-from").value;
    var fromFactor=cat.units.filter(function(u){return u[0]===from;})[0][1];
    var base=v*fromFactor;
    document.getElementById("ucx-out").innerHTML=cat.units.map(function(u){
      var res=base/u[1];
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.4rem 0.6rem\"><div style=\"font-size:0.7rem;opacity:0.6\">"+u[0]+"</div><strong style=\"font-size:0.9rem\">"+res.toPrecision(6).replace(/\.?0+$/,"")+"</strong></div>";
    }).join("");
  }
  document.getElementById("ucx-cat").addEventListener("change",function(){populate();convert();});
  document.getElementById("ucx-from").addEventListener("change",convert);
  document.getElementById("ucx-val").addEventListener("input",convert);
  populate();convert();
})();