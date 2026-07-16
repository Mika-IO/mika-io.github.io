(function(){
  function toHuman(cat){
    if(cat<=1)return Math.round(15*cat);
    if(cat<=2)return Math.round(15+(cat-1)*9);
    return Math.round(24+(cat-2)*4);
  }
  document.getElementById('ca-form').addEventListener('submit',function(e){
    e.preventDefault();
    const age=parseFloat(document.getElementById('ca-age').value);
    if(isNaN(age)||age<0)return;
    const human=toHuman(age);
    const stage=age<2?'Kitten':age<3?'Junior':age<6?'Prime':age<10?'Mature':age<15?'Senior':'Super Senior';
    document.getElementById('ca-out').innerHTML=`<span class="big">${human}</span><p class="hint">human-equivalent years · Life stage: ${stage}</p>`;
  });
})();