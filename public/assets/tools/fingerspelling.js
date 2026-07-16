(function(){
  var asl={A:"fist, thumb side",B:"four fingers up, thumb across",C:"curved C-shape",D:"index up, others curved",
    E:"all fingers bent",F:"index-thumb circle, others up",G:"index-thumb point side",H:"index-middle out side",
    I:"pinky up",J:"pinky, trace J",K:"index-middle V shape",L:"L-shape index up, thumb out",
    M:"three fingers over thumb",N:"two fingers over thumb",O:"O-shape all fingers",P:"K-shape pointing down",
    Q:"G-shape pointing down",R:"index-middle crossed",S:"fist, thumb over",T:"thumb between index-middle",
    U:"index-middle together up",V:"V peace sign",W:"three fingers up",X:"index hook",
    Y:"pinky and thumb out",Z:"index traces Z"};
  document.getElementById("fs-in").addEventListener("input",function(){
    var chars=this.value.toUpperCase().split("");
    document.getElementById("fs-out").innerHTML=chars.map(function(c){
      if(c===" ")return "<div style=\"width:1rem\"></div>";
      var desc=asl[c]||"?";
      return "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.6rem;min-width:60px;text-align:center\"><div style=\"font-size:1.3rem;font-weight:800\">"+c+"</div><div style=\"font-size:0.6rem;opacity:0.6;line-height:1.2;max-width:80px\">"+desc+"</div></div>";
    }).join("");
  });
})();