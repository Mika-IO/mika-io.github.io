(function(){
  'use strict';
  function build(){
    var url=document.getElementById('utm-url').value.trim();
    var src=document.getElementById('utm-source').value.trim();
    var med=document.getElementById('utm-medium').value.trim();
    var cam=document.getElementById('utm-campaign').value.trim();
    var term=document.getElementById('utm-term').value.trim();
    var con=document.getElementById('utm-content').value.trim();
    var out=document.getElementById('utm-out');
    if(!url||!src||!med||!cam){if(out)out.textContent=T('fillhint','Fill in URL, Source, Medium and Campaign to generate the link.');return;}
    var p=new URLSearchParams({utm_source:src,utm_medium:med,utm_campaign:cam});
    if(term)p.set('utm_term',term);
    if(con)p.set('utm_content',con);
    var sep=url.includes('?')?'&':'?';
    var full=url+sep+p.toString();
    if(out)out.textContent=full;
  }
  document.querySelectorAll('#utm-url,#utm-source,#utm-medium,#utm-campaign,#utm-term,#utm-content').forEach(function(el){el.addEventListener('input',build);});
  var copyBtn=document.getElementById('utm-copy');
  if(copyBtn)copyBtn.addEventListener('click',function(){var t=document.getElementById('utm-out').textContent;if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(function(){copyBtn.textContent=T('copied','Copied!');setTimeout(function(){copyBtn.textContent=T('copylink','Copy link');},2000);});});
  build();
})();
