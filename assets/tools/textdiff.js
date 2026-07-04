(function(){
  'use strict';
  var ta=document.getElementById('td-a'),tb=document.getElementById('td-b'),out=document.getElementById('td-out');
  if(!ta||!tb||!out)return;
  function lcs(a,b){
    var m=a.length,n=b.length,dp=[];
    for(var i=0;i<=m;i++){dp[i]=new Array(n+1).fill(0);}
    for(var i=1;i<=m;i++)for(var j=1;j<=n;j++){if(a[i-1]===b[j-1])dp[i][j]=dp[i-1][j-1]+1;else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);}
    var res=[],i=m,j=n;
    while(i>0&&j>0){if(a[i-1]===b[j-1]){res.unshift({t:'eq',v:a[i-1]});i--;j--;}else if(dp[i-1][j]>=dp[i][j-1]){res.unshift({t:'del',v:a[i-1]});i--;}else{res.unshift({t:'ins',v:b[j-1]});j--;}}
    while(i>0){res.unshift({t:'del',v:a[--i]});}
    while(j>0){res.unshift({t:'ins',v:b[--j]});}
    return res;
  }
  function diff(){
    var a=ta.value.split(/\s+/).filter(Boolean),b=tb.value.split(/\s+/).filter(Boolean);
    if(!a.length&&!b.length){out.textContent='';return;}
    var ops=lcs(a,b);
    out.innerHTML=ops.map(function(op){
      if(op.t==='eq')return op.v;
      if(op.t==='del')return '<span style="background:rgba(255,80,80,0.3);text-decoration:line-through;border-radius:2px;padding:0 2px">'+op.v+'</span>';
      return '<span style="background:rgba(80,255,120,0.3);border-radius:2px;padding:0 2px">'+op.v+'</span>';
    }).join(' ');
  }
  ta.addEventListener('input',diff);tb.addEventListener('input',diff);diff();
})();
