(function(){
  'use strict';
  var ta=document.getElementById('hash-in');
  if(!ta)return;
  // Simple MD5 implementation
  function md5(str){
    function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);return((((x>>16)+(y>>16)+(lsw>>16))<<16)|(lsw&0xFFFF));}
    function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
    function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
    function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
    function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
    function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}
    function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
    function md5_blk(s){var l=s.length;var N=((l+8)>>6)+1;var M=new Array(N*16);var i;for(i=0;i<N*16;i++)M[i]=0;for(i=0;i<l;i++)M[i>>2]|=s.charCodeAt(i)<<((i%4)*8);M[l>>2]|=0x80<<((l%4)*8);M[N*16-2]=l*8;return M;}
    var b=md5_blk(str),i,a=1732584193,b1=-271733879,c=-1732584194,d=271733878;
    for(i=0;i<b.length;i+=16){var aa=a,bb=b1,cc=c,dd=d;
    a=md5_ff(a,b1,c,d,b[i+ 0], 7,-680876936);d=md5_ff(d,a,b1,c,b[i+ 1],12,-389564586);c=md5_ff(c,d,a,b1,b[i+ 2],17, 606105819);b1=md5_ff(b1,c,d,a,b[i+ 3],22,-1044525330);
    a=md5_ff(a,b1,c,d,b[i+ 4], 7,-176418897);d=md5_ff(d,a,b1,c,b[i+ 5],12,1200080426);c=md5_ff(c,d,a,b1,b[i+ 6],17,-1473231341);b1=md5_ff(b1,c,d,a,b[i+ 7],22,-45705983);
    a=md5_ff(a,b1,c,d,b[i+ 8], 7,1770035416);d=md5_ff(d,a,b1,c,b[i+ 9],12,-1958414417);c=md5_ff(c,d,a,b1,b[i+10],17,-42063);b1=md5_ff(b1,c,d,a,b[i+11],22,-1990404162);
    a=md5_ff(a,b1,c,d,b[i+12], 7,1804603682);d=md5_ff(d,a,b1,c,b[i+13],12,-40341101);c=md5_ff(c,d,a,b1,b[i+14],17,-1502002290);b1=md5_ff(b1,c,d,a,b[i+15],22,1236535329);
    a=md5_gg(a,b1,c,d,b[i+ 1], 5,-165796510);d=md5_gg(d,a,b1,c,b[i+ 6], 9,-1069501632);c=md5_gg(c,d,a,b1,b[i+11],14, 643717713);b1=md5_gg(b1,c,d,a,b[i+ 0],20,-373897302);
    a=md5_gg(a,b1,c,d,b[i+ 5], 5,-701558691);d=md5_gg(d,a,b1,c,b[i+10], 9, 38016083);c=md5_gg(c,d,a,b1,b[i+15],14,-660478335);b1=md5_gg(b1,c,d,a,b[i+ 4],20,-405537848);
    a=md5_gg(a,b1,c,d,b[i+ 9], 5, 568446438);d=md5_gg(d,a,b1,c,b[i+14], 9,-1019803690);c=md5_gg(c,d,a,b1,b[i+ 3],14,-187363961);b1=md5_gg(b1,c,d,a,b[i+ 8],20,1163531501);
    a=md5_gg(a,b1,c,d,b[i+13], 5,-1444681467);d=md5_gg(d,a,b1,c,b[i+ 2], 9,-51403784);c=md5_gg(c,d,a,b1,b[i+ 7],14,1735328473);b1=md5_gg(b1,c,d,a,b[i+12],20,-1926607734);
    a=md5_hh(a,b1,c,d,b[i+ 5], 4,-378558);d=md5_hh(d,a,b1,c,b[i+ 8],11,-2022574463);c=md5_hh(c,d,a,b1,b[i+11],16,1839030562);b1=md5_hh(b1,c,d,a,b[i+14],23,-35309556);
    a=md5_hh(a,b1,c,d,b[i+ 1], 4,-1530992060);d=md5_hh(d,a,b1,c,b[i+ 4],11,1272893353);c=md5_hh(c,d,a,b1,b[i+ 7],16,-155497632);b1=md5_hh(b1,c,d,a,b[i+10],23,-1094730640);
    a=md5_hh(a,b1,c,d,b[i+13], 4, 681279174);d=md5_hh(d,a,b1,c,b[i+ 0],11,-358537222);c=md5_hh(c,d,a,b1,b[i+ 3],16,-722521979);b1=md5_hh(b1,c,d,a,b[i+ 6],23, 76029189);
    a=md5_hh(a,b1,c,d,b[i+ 9], 4,-640364487);d=md5_hh(d,a,b1,c,b[i+12],11,-421815835);c=md5_hh(c,d,a,b1,b[i+15],16, 530742520);b1=md5_hh(b1,c,d,a,b[i+ 2],23,-995338651);
    a=md5_ii(a,b1,c,d,b[i+ 0], 6,-198630844);d=md5_ii(d,a,b1,c,b[i+ 7],10,1126891415);c=md5_ii(c,d,a,b1,b[i+14],15,-1416354905);b1=md5_ii(b1,c,d,a,b[i+ 5],21,-57434055);
    a=md5_ii(a,b1,c,d,b[i+12], 6,1700485571);d=md5_ii(d,a,b1,c,b[i+ 3],10,-1894986606);c=md5_ii(c,d,a,b1,b[i+10],15,-1051523);b1=md5_ii(b1,c,d,a,b[i+ 1],21,-2054922799);
    a=md5_ii(a,b1,c,d,b[i+ 8], 6,1873313359);d=md5_ii(d,a,b1,c,b[i+15],10,-30611744);c=md5_ii(c,d,a,b1,b[i+ 6],15,-1560198380);b1=md5_ii(b1,c,d,a,b[i+13],21,1309151649);
    a=md5_ii(a,b1,c,d,b[i+ 4], 6,-145523070);d=md5_ii(d,a,b1,c,b[i+11],10,-1120210379);c=md5_ii(c,d,a,b1,b[i+ 2],15, 718787259);b1=md5_ii(b1,c,d,a,b[i+ 9],21,-343485551);
    a=safe_add(a,aa);b1=safe_add(b1,bb);c=safe_add(c,cc);d=safe_add(d,dd);}
    var hex=function(n){var s='';for(var j=0;j<4;j++)s+=('0'+((n>>>(j*8+4))&0xF).toString(16)).slice(-1)+('0'+((n>>>(j*8))&0xF).toString(16)).slice(-1);return s;};
    return hex(a)+hex(b1)+hex(c)+hex(d);
  }
  function toHex(buffer){return Array.from(new Uint8Array(buffer)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');}
  function update(){
    var text=ta.value;
    var sha256El=document.getElementById('hash-sha256'),sha1El=document.getElementById('hash-sha1'),md5El=document.getElementById('hash-md5');
    if(md5El)md5El.textContent=text?md5(text):'—';
    if(!text){if(sha256El)sha256El.textContent='—';if(sha1El)sha1El.textContent='—';return;}
    var enc=new TextEncoder();var data=enc.encode(text);
    if(crypto&&crypto.subtle){
      crypto.subtle.digest('SHA-256',data).then(function(buf){if(sha256El)sha256El.textContent=toHex(buf);});
      crypto.subtle.digest('SHA-1',data).then(function(buf){if(sha1El)sha1El.textContent=toHex(buf);});
    }
  }
  ta.addEventListener('input',update);update();
})();
