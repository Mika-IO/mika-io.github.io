(function(){
  const pairs=[['Coffee','Tea'],['Morning person','Night owl'],['Summer','Winter'],['Books','Movies'],['City','Nature'],['Dog','Cat'],['Pizza','Burger'],['Mountains','Beach'],['Introvert','Extrovert'],['Cooking at home','Eating out'],['Sunrise','Sunset'],['Train','Plane'],['History','Future'],['Logic','Creativity'],['Chocolate','Vanilla'],['Fast-paced','Slow-paced'],['Minimalism','Maximalism'],['Workout early','Workout late'],['Alone time','Social time'],['Texting','Calling'],['Music','Silence'],['Photos','Videos'],['Cats','Robots'],['Learn from books','Learn from experience'],['Plan everything','Go with the flow'],['Fruit','Vegetables'],['Action films','Drama films'],['Luxury','Adventure'],['Stay in','Go out'],['Past','Future']];
  let idx=0;const choices=[];const order=[...pairs].sort(()=>Math.random()-0.5);
  function show(){
    if(idx>=order.length){document.getElementById('tot-app').innerHTML='<p style="font-size:1.1rem;font-weight:600">All done! '+choices.length+' choices made.</p><p style="opacity:0.6;font-size:0.85rem;margin-top:0.5rem">'+choices.map(c=>c.a+' → '+c.choice).join(' · ')+'</p>';return;}
    const pair=order[idx];
    document.getElementById('tot-a').textContent=pair[0];
    document.getElementById('tot-b').textContent=pair[1];
    document.getElementById('tot-score').textContent=(idx+1)+' of '+order.length;
  }
  function pick(side){choices.push({a:order[idx][0]+' vs '+order[idx][1],choice:order[idx][side]});idx++;show();}
  document.getElementById('tot-a').onclick=()=>pick(0);
  document.getElementById('tot-b').onclick=()=>pick(1);
  document.getElementById('tot-skip').onclick=()=>{idx++;show();};
  ['tot-a','tot-b'].forEach(id=>{const b=document.getElementById(id);b.addEventListener('mouseenter',()=>b.style.transform='scale(1.04)');b.addEventListener('mouseleave',()=>b.style.transform='scale(1)');});
  show();
})();