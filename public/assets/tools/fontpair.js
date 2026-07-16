(function(){
  const fonts=['Inter','Roboto','Open Sans','Lato','Poppins','Montserrat','Raleway','Nunito','Playfair Display','Merriweather','Lora','Source Serif 4','Libre Baskerville','Cormorant Garamond','DM Serif Display','Space Grotesk','Outfit','Plus Jakarta Sans','Syne','DM Sans','Work Sans','Mulish','Manrope','Jost','Josefin Sans'];
  const headSel=document.getElementById('fp-head');const bodySel=document.getElementById('fp-body2');
  fonts.forEach((f,i)=>{
    const o1=document.createElement('option');o1.value=f;o1.textContent=f;if(i===5)o1.selected=true;headSel.appendChild(o1);
    const o2=document.createElement('option');o2.value=f;o2.textContent=f;if(i===0)o2.selected=true;bodySel.appendChild(o2);
  });
  function loadFont(name){
    if(!document.querySelector('link[data-font="'+name+'"]')){
      const link=document.createElement('link');link.rel='stylesheet';link.dataset.font=name;
      link.href='https://fonts.googleapis.com/css2?family='+name.replace(/ /g,'+')+'&display=swap';
      document.head.appendChild(link);
    }
  }
  function update(){
    const h=headSel.value,b=bodySel.value;
    loadFont(h);loadFont(b);
    document.getElementById('fp-h').style.fontFamily='"'+h+'", serif';
    document.getElementById('fp-h').textContent=h+' meets '+b;
    document.getElementById('fp-p').style.fontFamily='"'+b+'", sans-serif';
  }
  headSel.addEventListener('change',update);bodySel.addEventListener('change',update);update();
})();