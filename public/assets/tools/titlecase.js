(function(){
  const skip=new Set(['a','an','the','and','but','or','for','nor','on','at','to','in','of','up','by','as','is','it']);
  function titleCase(s){return s.toLowerCase().replace(/\S+/g,(w,i,str)=>{const prev=str.slice(0,i).trim();if(i===0||!prev||skip.has(w))return w[0].toUpperCase()+w.slice(1);return skip.has(w)?w:w[0].toUpperCase()+w.slice(1);});}
  function sentenceCase(s){return s.toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g,(_,p,c)=>p+c.toUpperCase());}
  function capitalize(s){return s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());}
  function alternating(s){let i=0;return s.replace(/[a-z]/gi,c=>(i++%2===0)?c.toLowerCase():c.toUpperCase());}
  function run(fn){document.getElementById('tc-out').value=fn(document.getElementById('tc-in').value);}
  document.getElementById('tc-title').onclick=()=>run(titleCase);
  document.getElementById('tc-sentence').onclick=()=>run(sentenceCase);
  document.getElementById('tc-start').onclick=()=>run(capitalize);
  document.getElementById('tc-alt').onclick=()=>run(alternating);
})();