(function(){
  document.getElementById('ftd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const num=parseInt(document.getElementById('ftd-num').value);
    const den=parseInt(document.getElementById('ftd-den').value);
    const out=document.getElementById('ftd-out');
    const type=document.getElementById('ftd-type');
    if(!den||den===0){out.textContent='Denominator cannot be zero';type.textContent='';return;}
    const dec=num/den;
    const whole=Math.floor(Math.abs(dec));
    const frac=Math.abs(dec)-whole;
    out.textContent=dec.toPrecision(12).replace(/\.?0+$/,'');
    const mixedPart=whole>0?' — Mixed: '+(num<0?'-':'')+whole+' '+Math.round(frac*den)+'/'+den:'';
    type.textContent=(Number.isInteger(dec)?'Integer':(Math.abs(dec).toPrecision(15).includes('e')?'Very small':'Check if terminating or repeating'))+mixedPart;
  });
})();