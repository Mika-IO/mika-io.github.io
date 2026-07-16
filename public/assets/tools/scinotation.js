(function(){
  document.getElementById("sn-type").addEventListener("change",function(){
    document.getElementById("sn-std-field").style.display=this.value==="toSci"?"":"none";
    document.getElementById("sn-sci-field").style.display=this.value==="toSci"?"none":"";
  });
  document.getElementById("sn-form").addEventListener("submit",function(e){
    e.preventDefault();
    var type=document.getElementById("sn-type").value;
    var out=document.getElementById("sn-out");out.hidden=false;
    if(type==="toSci"){
      var n=parseFloat(document.getElementById("sn-std").value);
      var exp=Math.floor(Math.log10(Math.abs(n)));
      var coeff=n/Math.pow(10,exp);
      out.textContent=coeff.toPrecision(6).replace(/\.?0+$/,"")+" x 10^"+exp;
    }else{
      var c=parseFloat(document.getElementById("sn-coeff").value);
      var ex=parseInt(document.getElementById("sn-exp").value);
      var std=c*Math.pow(10,ex);
      out.textContent=std.toPrecision(10).replace(/\.?0+$/,"");
    }
  });
})();