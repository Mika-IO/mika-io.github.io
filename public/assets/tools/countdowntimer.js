(function(){
  let remaining=300,timer=null,running=false;
  const disp=document.getElementById('ct-display');
  const done=document.getElementById('ct-done');
  const btn=document.getElementById('ct-start');
  function fmt(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return(h>0?String(h).padStart(2,'0')+':':'')+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');}
  function update(){disp.textContent=fmt(remaining);}
  function getInput(){const h=parseInt(document.getElementById('ct-h').value)||0,m=parseInt(document.getElementById('ct-m').value)||0,s=parseInt(document.getElementById('ct-s').value)||0;return h*3600+m*60+s;}
  btn.addEventListener('click',function(){
    if(running){clearInterval(timer);running=false;btn.textContent=T('resume','Continue');}
    else{
      if(!running&&remaining<=0)remaining=getInput();
      if(!remaining)return;
      running=true;btn.textContent=T('pause','Pause');done.style.display='none';
      timer=setInterval(()=>{remaining--;update();if(remaining<=0){clearInterval(timer);running=false;btn.textContent=T('start','Start');done.style.display='block';}},1000);
    }
  });
  document.getElementById('ct-reset').addEventListener('click',function(){clearInterval(timer);running=false;remaining=getInput();update();done.style.display='none';btn.textContent=T('start','Start');});
  update();
})();