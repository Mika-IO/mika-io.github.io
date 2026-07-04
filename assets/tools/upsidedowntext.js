/* Upside-down text. Maps characters to flipped Unicode look-alikes, live. */
(function () {
  'use strict';
  var input = document.getElementById('ud-input');
  if (!input) return;
  var out = document.getElementById('ud-out');
  var map = {
    a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',
    A:'∀',B:'𐐒',C:'Ɔ',D:'p',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'ſ',K:'ʞ',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Ό',R:'ᴚ',S:'S',T:'⊥',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',
    '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6',
    '.':'˙',',':'‘','\'':',','"':',,','`':',','?':'¿','!':'¡','(':')',')':'(','[':']',']':'[','{':'}','}':'{','<':'>','>':'<','&':'⅋','_':'‾'
  };
  function flip(s) {
    var r = [];
    for (var i = 0; i < s.length; i++) { var c = s[i]; r.push(map[c] || map[c.toLowerCase()] || c); }
    return r.reverse().join('');
  }
  function apply() { out.value = flip(input.value); }
  input.addEventListener('input', apply);
  apply();
})();
