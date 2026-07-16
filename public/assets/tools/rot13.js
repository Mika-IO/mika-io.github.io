(function(){
  function rot13(str){return str.replace(/[a-zA-Z]/g,c=>{const base=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-base+13)%26+base);});}
  document.getElementById('r13-in').addEventListener('input',function(){document.getElementById('r13-out').value=rot13(this.value);});
})();