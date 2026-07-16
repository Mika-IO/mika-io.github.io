(function(){
  var vals={a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};
  function reduce(n){while(n>9&&n!==11&&n!==22&&n!==33){var d=String(n).split("");n=d.reduce(function(a,x){return a+parseInt(x);},0);}return n;}
  var meanings={1:"Leadership and independence",2:"Cooperation and diplomacy",3:"Creativity and self-expression",
    4:"Practicality and hard work",5:"Freedom and adventure",6:"Nurturing and responsibility",
    7:"Spirituality and analysis",8:"Ambition and material success",9:"Compassion and humanitarianism",
    11:"Master number: intuition",22:"Master number: master builder",33:"Master number: master teacher"};
  document.getElementById("nn-form").addEventListener("submit",function(e){
    e.preventDefault();
    var name=document.getElementById("nn-in").value.toLowerCase().replace(/[^a-z]/g,"");
    var sum=name.split("").reduce(function(a,c){return a+(vals[c]||0);},0);
    var num=reduce(sum);
    var out=document.getElementById("nn-out");out.hidden=false;
    out.innerHTML="<div style=\"font-size:3rem;font-weight:800;color:var(--accent,#6366f1)\">"+num+"</div><p style=\"font-weight:600\">Life Path Number</p><p style=\"opacity:0.7\">"+(meanings[num]||"Powerful energy")+"</p><p style=\"font-size:0.8rem;opacity:0.5\">Sum of letters: "+sum+"</p>";
  });
})();