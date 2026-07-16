(function(){
  // Compact common English word list (sorted by length desc for relevance)
  const words='able about above abstract accept access act action add age agree air all allow almost alone along already also always among amount and animal another answer any area around art ask away back ball band bank base battle be beat beautiful because become before behind believe below best better between big black blood blue body book born both break bring build burn but by call came can care carry cast cause change charge check child choose city claim class clear close cold come common complete concern consider contain continue control could country cover create cross cut dark date day dead deal death decide deep deny design detail develop die difference difficult direct discuss distance do does done door down draw drive drop during each early earth east easy edge effect either else end energy enough enter event ever every example exist experience explain face fact fall family far feel feet fight figure find fine follow food force forest form forward found free friend front full function future garden get give global go good government great green ground grow hand hard head help here high history hold home hope hour house human idea important include increase individual inside interest into issue itself join keep kind know land large last late lead learn less life light like line live long look lose low main make man matter mean memory mind money month more most move much must name nature need network new next night no not nothing notice number object occur off old only open or order other outside over own part pass path people per place plan play point policy power present problem process product put quite range reach read real reason record reduce relate remain remember result rich right rise run school see seek seem self sense serve set share show side simple since size skill small so society some south south soon sound space stand start state still stop story study take talk than them then theory think this those through time together top toward trade turn type under use usually value very view want war watch way west what when where which while wide will without woman world yet young'.split(' ');
  function canMake(word,letters){
    const l=[...letters.toLowerCase()];
    return[...word].every(c=>{const i=l.indexOf(c);if(i<0)return false;l.splice(i,1);return true;});
  }
  document.getElementById('an-form').addEventListener('submit',function(e){
    e.preventDefault();
    const letters=document.getElementById('an-in').value.replace(/[^a-zA-Z]/g,'');
    const minLen=parseInt(document.getElementById('an-minlen').value)||4;
    if(!letters){return;}
    const found=words.filter(w=>w.length>=minLen&&canMake(w,letters));
    found.sort((a,b)=>b.length-a.length||a.localeCompare(b));
    const out=document.getElementById('an-out');
    if(!found.length){out.innerHTML='<p>No words found. Try shorter minimum length.</p>';return;}
    out.innerHTML='<p style="opacity:0.6;font-size:0.85rem">'+found.length+' word'+(found.length!==1?'s':'')+' found:</p><div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.5rem">'+found.map(w=>'<span style="padding:4px 10px;background:var(--surface);border:1px solid var(--line);border-radius:20px;font-size:0.9rem">'+w+'</span>').join('')+'</div>';
  });
})();