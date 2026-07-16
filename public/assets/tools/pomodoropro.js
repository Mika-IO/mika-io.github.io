(function(){
  let secs=25*60,running=false,iv=null,mode='focus',sessions=0,totalFocus=0,sessionStart=0;
  function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function setDisplay(){document.getElementById('pmpro-time').textContent=fmt(secs);document.getElementById('pmpro-label').textContent=mode==='focus'?T('focussession','Focus session'):T('breaktime','Break time');}
  function tick(){
    if(secs>0){secs--;setDisplay();}
    else{
      clearInterval(iv);running=false;
      if(mode==='focus'){sessions++;totalFocus+=parseInt(document.getElementById('pmpro-focus').value);const el=document.getElementById('pmpro-sessions');el.textContent=T('sessionstoday','Sessions today: ')+sessions+T('focuslabel',' · Focus: ')+totalFocus+T('minshort',' min');try{new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAA').play().catch(()=>{});}catch(e){}mode='break';secs=parseInt(document.getElementById('pmpro-break').value)*60;}
      else{mode='focus';secs=parseInt(document.getElementById('pmpro-focus').value)*60;}
      setDisplay();
    }
  }
  document.getElementById('pmpro-start').onclick=function(){
    if(running){clearInterval(iv);running=false;this.textContent=T('startbtn','▶ Start');}
    else{iv=setInterval(tick,1000);running=true;this.textContent=T('pausebtn','⏸ Pause');}
  };
  document.getElementById('pmpro-reset').onclick=function(){
    clearInterval(iv);running=false;mode='focus';
    secs=parseInt(document.getElementById('pmpro-focus').value)*60;
    setDisplay();document.getElementById('pmpro-start').textContent=T('startbtn','▶ Start');
  };
  setDisplay();
})();