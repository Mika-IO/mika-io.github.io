(function(){
  var mc={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",
    K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",
    U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--.."};
  var letters=Object.keys(mc);
  var current="",input="";
  function next(){current=letters[Math.floor(Math.random()*letters.length)];input="";document.getElementById("mt2-display").textContent=mc[current];document.getElementById("mt2-result").textContent="";}
  function check(){
    if(input===mc[current]){document.getElementById("mt2-result").innerHTML="<span style=\"color:#22c55e\">Correct! That was "+current+"</span>";setTimeout(next,1200);}
    else if(mc[current].indexOf(input)===0){document.getElementById("mt2-result").textContent="Keep going...";}
    else{document.getElementById("mt2-result").innerHTML="<span style=\"color:#ef4444\">Wrong. Answer was "+current+" ("+mc[current]+")</span>";setTimeout(function(){input="";check();},1500);}
  }
  document.getElementById("mt2-dit").onclick=function(){input+=".";check();};
  document.getElementById("mt2-dah").onclick=function(){input+="-";check();};
  document.getElementById("mt2-next").onclick=next;
  next();
})();