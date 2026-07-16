(function(){
  var wordList='cat bat fat hat mat pat rat sat vat flat brat chat day bay hay jay lay may pay ray say way play pray tray they grey okay blue clue due flew glue hue new dew knew few brew grew true moon tune boon croon dune loon noon soon spoon boom doom gloom loom room zoom bloom groom fume sure cure pure star bar car far jar tar war scar gate late mate rate fate date great eight wait bait state plate weight height bright night right fight light might tight white write bite cite kite mite quite site spite time lime dime crime grime mime prime rhyme slime chime life wife knife strife fire hire wire tire desire require aspire inspire retire admire empire acquire expire perspire transpire'.split(' ');
  var unique=Array.from(new Set(wordList));
  function ending(w){var v='aeiou';for(var i=w.length-1;i>=0;i--){if(v.indexOf(w[i].toLowerCase())>=0)return w.slice(i);}return w.slice(-2);}
  document.getElementById('rf-form').addEventListener('submit',function(e){
    e.preventDefault();
    var word=document.getElementById('rf-word').value.trim().toLowerCase();
    var end=ending(word);
    var rhymes=unique.filter(function(w){return w!==word&&w.endsWith(end);});
    var out=document.getElementById('rf-out');
    if(!rhymes.length){out.innerHTML='<p>No rhymes found for "'+word+'". Try a shorter word.</p>';return;}
    out.innerHTML='<p style="opacity:0.6;font-size:0.875rem;margin-bottom:0.5rem">'+rhymes.length+' rhyme(s) for "'+word+'":</p><div style="display:flex;flex-wrap:wrap;gap:0.4rem">'+rhymes.map(function(r){return '<span style="padding:0.3rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.9rem">'+r+'</span>';}).join('')+'</div>';
  });
})();