(function(){
  'use strict';
  var disp=document.getElementById('bc-display'),grid=document.getElementById('bc-grid');
  if(!disp||!grid)return;
  var expr='';
  var btns=[['C','(',')','%'],['7','8','9','÷'],['4','5','6','×'],['1','2','3','−'],['±','0','.','=']];
  btns.forEach(function(row){
    row.forEach(function(lbl){
      var b=document.createElement('button');
      b.textContent=lbl;
      b.style.cssText='padding:0.65rem;border-radius:0.4rem;border:none;cursor:pointer;font-size:1rem;background:'+(lbl==='='?'#4f8ef7':'rgba(255,255,255,0.1)')+';color:'+(lbl==='='?'#fff':'inherit');
      b.addEventListener('click',function(){handle(lbl);});
      grid.appendChild(b);
    });
  });
  function update(){disp.textContent=expr||'0';}
  function handle(k){
    if(k==='C'){expr='';update();return;}
    if(k==='='){try{var r=Function('"use strict";return('+expr.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-')+')')();expr=String(parseFloat(r.toFixed(10)));}catch(e){expr='Error';}update();return;}
    if(k==='±'){if(expr&&!isNaN(parseFloat(expr))){expr=String(-parseFloat(expr));}update();return;}
    if(k==='%'){try{var v=parseFloat(expr);expr=String(v/100);}catch(e){}update();return;}
    expr+=k;update();
  }
  document.addEventListener('keydown',function(e){
    var map={'Enter':'=','Backspace':'del','Escape':'C','*':'×','/':'÷'};
    var k=map[e.key]||e.key;
    if(k==='del'){expr=expr.slice(0,-1);update();return;}
    if('0123456789.+-×÷−()%C='.includes(k))handle(k);
  });
})();
