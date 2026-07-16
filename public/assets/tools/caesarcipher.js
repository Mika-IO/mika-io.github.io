(function(){
  function caesar(text,shift,decode){
    const s=decode?((26-shift%26)%26):shift;
    return text.replace(/[a-zA-Z]/g,c=>{const base=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-base+s)%26+base);});
  }
  document.getElementById('cc2-form').addEventListener('submit',function(e){
    e.preventDefault();
    const text=document.getElementById('cc2-in').value;
    const shift=parseInt(document.getElementById('cc2-shift').value)||3;
    const decode=document.getElementById('cc2-dir').value==='dec';
    document.getElementById('cc2-out').value=caesar(text,shift,decode);
  });
})();