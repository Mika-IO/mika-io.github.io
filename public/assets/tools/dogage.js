(function(){
  // Size-adjusted human-equivalent ages
  const lookup={
    small:[0,13,18,22,26,30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102,106,110],
    medium:[0,15,22,27,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116],
    large:[0,18,25,32,38,44,50,56,62,68,74,80,86,92,98,104,110,116,122,128,134,140,146,152,158,164]
  };
  document.getElementById('da-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dogAge=parseFloat(document.getElementById('da-age').value);
    const size=document.getElementById('da-size').value;
    if(isNaN(dogAge)||dogAge<0)return;
    const idx=Math.min(Math.floor(dogAge),25);
    const frac=dogAge-idx;
    const ages=lookup[size];
    const humanAge=idx<25?ages[idx]+frac*(ages[idx+1]-ages[idx]):ages[25];
    document.getElementById('da-out').innerHTML=`<span class="big">${Math.round(humanAge)}</span><p class="hint">human-equivalent years old</p>`;
  });
})();