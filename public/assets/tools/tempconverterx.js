(function(){
  function toC(v,u){switch(u){case'C':return v;case'F':return(v-32)*5/9;case'K':return v-273.15;case'R':return(v-491.67)*5/9;case'D':return 100-v*2/3;case'N':return v*100/33;case'Re':return v*5/4;case'Ro':return(v-7.5)*40/21;}return v;}
  function fromC(c,u){switch(u){case'C':return c;case'F':return c*9/5+32;case'K':return c+273.15;case'R':return(c+273.15)*9/5;case'D':return(100-c)*3/2;case'N':return c*33/100;case'Re':return c*4/5;case'Ro':return c*21/40+7.5;}return c;}
  const units=[['C','Celsius'],['F','Fahrenheit'],['K','Kelvin'],['R','Rankine'],['D','Delisle'],['N','Newton'],['Re','Reaumur'],['Ro','Romer']];
  function update(){
    const v=parseFloat(document.getElementById('tcx-val').value);
    const from=document.getElementById('tcx-from').value;
    if(isNaN(v))return;
    const c=toC(v,from);
    document.getElementById('tcx-out').innerHTML=units.map(function([u,name]){const res=fromC(c,u);return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">'+name+'</div><strong>'+res.toPrecision(8).replace(/.?0+$/,'')+'</strong></div>';}).join('');
  }
  document.getElementById('tcx-val').addEventListener('input',update);document.getElementById('tcx-from').addEventListener('change',update);update();
})();