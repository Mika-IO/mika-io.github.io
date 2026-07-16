(function(){
  function parse(id){
    return document.getElementById(id).value.trim().split('\n')
      .filter(r=>r.trim()).map(r=>r.trim().split(/\s+/).map(Number));
  }
  function fmt(m){return m.map(r=>r.map(v=>+v.toPrecision(8)).join('\t')).join('\n');}
  function show(v){document.getElementById('mx-out').textContent=v;}
  function det(m){
    const n=m.length;
    if(n===1)return m[0][0];
    if(n===2)return m[0][0]*m[1][1]-m[0][1]*m[1][0];
    let d=0;
    for(let c=0;c<n;c++){
      const sub=m.slice(1).map(r=>[...r.slice(0,c),...r.slice(c+1)]);
      d+=Math.pow(-1,c)*m[0][c]*det(sub);
    }
    return d;
  }
  document.getElementById('mx-add').onclick=function(){
    const a=parse('mx-a'),b=parse('mx-b');
    if(a.length!==b.length||a[0].length!==b[0].length){show('Dimension mismatch');return;}
    show(fmt(a.map((r,i)=>r.map((v,j)=>v+b[i][j]))));
  };
  document.getElementById('mx-sub').onclick=function(){
    const a=parse('mx-a'),b=parse('mx-b');
    if(a.length!==b.length||a[0].length!==b[0].length){show('Dimension mismatch');return;}
    show(fmt(a.map((r,i)=>r.map((v,j)=>v-b[i][j]))));
  };
  document.getElementById('mx-mul').onclick=function(){
    const a=parse('mx-a'),b=parse('mx-b');
    if(a[0].length!==b.length){show('Incompatible dimensions for multiplication');return;}
    const res=a.map((_,i)=>b[0].map((_,j)=>a[i].reduce((s,_,k)=>s+a[i][k]*b[k][j],0)));
    show(fmt(res));
  };
  document.getElementById('mx-det').onclick=function(){
    const a=parse('mx-a');
    if(a.length!==a[0].length){show('Matrix A must be square');return;}
    show('det(A) = '+det(a).toPrecision(10));
  };
  document.getElementById('mx-tra').onclick=function(){
    const a=parse('mx-a');
    show(fmt(a[0].map((_,i)=>a.map(r=>r[i]))));
  };
})();