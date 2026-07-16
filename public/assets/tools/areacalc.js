(function(){
  'use strict';
  var shapes={
    rect:[['width',T('width','Width (w)')],['height',T('height','Height (h)')]],
    circle:[['radius',T('radius','Radius (r)')]],
    triangle:[['base',T('base','Base (b)')],['height',T('height','Height (h)')]],
    square:[['side',T('side','Side (s)')]],
    trapezoid:[['base1',T('base1','Base 1 (a)')],['base2',T('base2','Base 2 (b)')],['height',T('height','Height (h)')]]
  };
  var formulas={
    rect:function(v){return v.width*v.height;},
    circle:function(v){return Math.PI*v.radius*v.radius;},
    triangle:function(v){return 0.5*v.base*v.height;},
    square:function(v){return v.side*v.side;},
    trapezoid:function(v){return 0.5*(v.base1+v.base2)*v.height;}
  };
  var sel=document.getElementById('area-shape');
  var inputsDiv=document.getElementById('area-inputs');
  var out=document.getElementById('area-out');
  if(!sel)return;
  function buildInputs(){
    inputsDiv.innerHTML='';
    var shape=sel.value;
    (shapes[shape]||[]).forEach(function(pair){
      var div=document.createElement('div');div.className='field';
      var lbl=document.createElement('label');lbl.textContent=pair[1];lbl.htmlFor='area-'+pair[0];
      var inp=document.createElement('input');inp.type='number';inp.id='area-'+pair[0];inp.step='any';inp.min='0';inp.inputMode='decimal';
      inp.addEventListener('input',calc);
      div.appendChild(lbl);div.appendChild(inp);inputsDiv.appendChild(div);
    });
    calc();
  }
  function calc(){
    var shape=sel.value;
    var vals={};var ok=true;
    (shapes[shape]||[]).forEach(function(pair){
      var el=document.getElementById('area-'+pair[0]);
      var v=el?parseFloat(el.value):NaN;
      if(isNaN(v)||v<0)ok=false;
      vals[pair[0]]=v;
    });
    if(!ok){out.textContent='—';return;}
    var a=formulas[shape](vals);
    out.textContent=a.toLocaleString([],{maximumFractionDigits:6})+T('squareunits',' square units');
  }
  sel.addEventListener('change',buildInputs);
  buildInputs();
})();
