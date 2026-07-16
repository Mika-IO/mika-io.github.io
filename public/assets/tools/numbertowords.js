(function(){
  const ones_en=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens_en=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const ones_pt=['','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
  const tens_pt=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
  const hundreds_pt=['','cem','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
  function chunk_en(n){
    if(n<20)return ones_en[n];
    if(n<100)return tens_en[Math.floor(n/10)]+(n%10?' '+ones_en[n%10]:'');
    return ones_en[Math.floor(n/100)]+' hundred'+(n%100?' '+chunk_en(n%100):'');
  }
  function chunk_pt(n){
    if(n===100)return 'cem';
    if(n<20)return ones_pt[n];
    if(n<100)return tens_pt[Math.floor(n/10)]+(n%10?' e '+ones_pt[n%10]:'');
    return hundreds_pt[Math.floor(n/100)]+(n%100?' e '+chunk_pt(n%100):'');
  }
  function toWords(n,lang){
    if(n===0)return lang==='en'?'zero':'zero';
    const neg=n<0;n=Math.abs(n);
    const b=Math.floor(n/1e9),m=Math.floor((n%1e9)/1e6),k=Math.floor((n%1e6)/1e3),r=n%1e3;
    if(lang==='en'){
      let parts=[];
      if(b)parts.push(chunk_en(b)+' billion');
      if(m)parts.push(chunk_en(m)+' million');
      if(k)parts.push(chunk_en(k)+' thousand');
      if(r)parts.push(chunk_en(r));
      return (neg?'negative ':'')+parts.join(' ');
    }else{
      let parts=[];
      if(b)parts.push(chunk_pt(b)+(b===1?' bilhão':' bilhões'));
      if(m)parts.push(chunk_pt(m)+(m===1?' milhão':' milhões'));
      if(k)parts.push(chunk_pt(k)+' mil');
      if(r)parts.push(chunk_pt(r));
      return (neg?'menos ':'')+parts.join(' e ');
    }
  }
  document.getElementById('ntw-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=parseInt(document.getElementById('ntw-val').value);
    const lang=document.getElementById('ntw-lang').value;
    const out=document.getElementById('ntw-out');
    if(isNaN(n)||Math.abs(n)>999999999999){out.textContent='Enter an integer up to 999,999,999,999';return;}
    out.textContent=toWords(n,lang).charAt(0).toUpperCase()+toWords(n,lang).slice(1);
  });
})();