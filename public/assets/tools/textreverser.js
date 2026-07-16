(function(){
  const inp=document.getElementById('tr2-in');
  const out=document.getElementById('tr2-out');
  document.getElementById('tr2-rev').onclick=()=>out.value=[...inp.value].reverse().join('');
  document.getElementById('tr2-words').onclick=()=>out.value=inp.value.split(' ').reverse().join(' ');
  document.getElementById('tr2-lines').onclick=()=>out.value=inp.value.split('\n').reverse().join('\n');
})();