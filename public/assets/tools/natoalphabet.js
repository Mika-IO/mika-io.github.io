(function(){
  var nato={A:"Alpha",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",
    I:"India",J:"Juliet",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",
    Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",
    X:"X-ray",Y:"Yankee",Z:"Zulu",
    0:"Zero",1:"One",2:"Two",3:"Three",4:"Four",5:"Five",6:"Six",7:"Seven",8:"Eight",9:"Niner"
  };
  document.getElementById("na-in").addEventListener("input",function(){
    var chars=this.value.toUpperCase().split("");
    document.getElementById("na-out").innerHTML=chars.map(function(c){
      if(c===" ")return "<div style=\"width:1rem\"></div>";
      var word=nato[c]||c;
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:0.2rem 0.5rem\"><strong>"+c+"</strong> "+word+"</div>";
    }).join("");
  });
})();