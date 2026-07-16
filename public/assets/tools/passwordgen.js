(function(){
  const upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower='abcdefghijklmnopqrstuvwxyz';
  const nums='0123456789';
  const syms='!@#$%^&*()_+-=[]{}|;:,.<>?';
  function gen(){
    const len=Math.min(128,Math.max(4,parseInt(document.getElementById('pg-len').value)||16));
    const useU=document.getElementById('pg-upper').checked;
    const useL=document.getElementById('pg-lower').checked;
    const useN=document.getElementById('pg-num').checked;
    const useS=document.getElementById('pg-sym').checked;
    let chars='';
    if(useU)chars+=upper;if(useL)chars+=lower;if(useN)chars+=nums;if(useS)chars+=syms;
    if(!chars){document.getElementById('pg-out').textContent=T('selecttype','Select at least one type');return;}
    const arr=new Uint32Array(len);
    crypto.getRandomValues(arr);
    const pwd=Array.from(arr).map(v=>chars[v%chars.length]).join('');
    const out=document.getElementById('pg-out');
    out.textContent=pwd;
    out.onclick=()=>navigator.clipboard.writeText(pwd);
    // entropy
    const entropy=len*Math.log2(chars.length);
    const str=entropy<40?T('weak','Weak'):entropy<60?T('fair','Medium'):entropy<80?T('strong','Strong'):T('verystrong','Very strong');
    document.getElementById('pg-strength').textContent=`Entropy: ~${entropy.toFixed(0)} bits — ${str}`;
  }
  document.getElementById('pg-gen').onclick=gen;
  gen();
})();