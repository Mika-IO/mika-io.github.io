(function(){
  document.getElementById("ctr-in").addEventListener("input",function(){
    var text=this.value;
    var chars=text.length;
    var nosp=text.replace(/\s/g,"").length;
    var words=text.trim()?text.trim().split(/\s+/).length:0;
    var lines=text?text.split("\n").length:0;
    var sents=text.split(/[.!?]+/).filter(function(s){return s.trim();}).length;
    var para=text.split(/\n\s*\n/).filter(function(p){return p.trim();}).length;
    var read=Math.ceil(words/200);
    var items=[["Characters",chars],["No spaces",nosp],["Words",words],["Lines",lines],["Sentences",sents],["Paragraphs",para],["Read time",read+" min"]];
    document.getElementById("ctr-stats").innerHTML=items.map(function(kv){
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.4rem 0.6rem;text-align:center\"><div style=\"font-size:0.65rem;opacity:0.6;text-transform:uppercase\">"+kv[0]+"</div><strong style=\"font-size:1.2rem\">"+kv[1]+"</strong></div>";
    }).join("");
  });
})();