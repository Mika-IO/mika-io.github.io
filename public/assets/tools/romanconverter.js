(function(){
  const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  function toRoman(n){
    if(!n||n<1||n>3999)return'Invalid';
    let r='';
    vals.forEach((v,i)=>{while(n>=v){r+=syms[i];n-=v;}});
    return r;
  }
  function fromRoman(s){
    const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    s=s.toUpperCase().trim();
    let total=0;
    for(let i=0;i<s.length;i++){
      const cur=map[s[i]],nxt=map[s[i+1]];
      if(!cur)return NaN;
      if(nxt&&nxt>cur){total-=cur;}else{total+=cur;}
    }
    return total;
  }
  document.getElementById('rom-dec').addEventListener('input',function(){
    document.getElementById('rom-out').textContent=toRoman(parseInt(this.value));
  });
  document.getElementById('rom-in').addEventListener('input',function(){
    const v=fromRoman(this.value);
    document.getElementById('rom-dec-out').textContent=isNaN(v)?'Invalid':v;
  });
})();