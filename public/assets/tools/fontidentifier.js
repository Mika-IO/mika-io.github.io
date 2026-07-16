(function(){
  function update(){
    var t=document.getElementById("fi-text").value;
    var f=document.getElementById("fi-family").value;
    var s=document.getElementById("fi-size").value;
    var w=document.getElementById("fi-weight").value;
    var p=document.getElementById("fi-preview");
    p.textContent=t;p.style.fontFamily=f;p.style.fontSize=s+"px";p.style.fontWeight=w;
  }
  ["fi-text","fi-family","fi-size","fi-weight"].forEach(function(id){
    document.getElementById(id).addEventListener("input",update);
  });
  update();
})();