/* Time zone difference */
(function(){
  'use strict';
  var zones=[['New York','America/New_York'],['Los Angeles','America/Los_Angeles'],['Chicago','America/Chicago'],['London','Europe/London'],['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],['Moscow','Europe/Moscow'],['Dubai','Asia/Dubai'],['Mumbai','Asia/Kolkata'],['Singapore','Asia/Singapore'],['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney'],['São Paulo','America/Sao_Paulo'],['Buenos Aires','America/Argentina/Buenos_Aires'],['Cairo','Africa/Cairo'],['Beijing','Asia/Shanghai'],['Seoul','Asia/Seoul'],['Bangkok','Asia/Bangkok']];
  function getOffset(tz){try{var s=new Intl.DateTimeFormat('en',{timeZone:tz,timeZoneName:'shortOffset'}).format(new Date());var m=s.match(/GMT([+-]\d{1,2}(?::\d{2})?)/);if(!m)return 0;var p=m[1].split(':');return parseInt(p[0],10)+(p[1]?parseInt(p[1],10)/60*(p[0]<0?-1:1):0);}catch(e){return 0;}}
  ['tzd-tz1','tzd-tz2'].forEach(function(id,i){var sel=document.getElementById(id);if(!sel)return;zones.forEach(function(z,j){var o=document.createElement('option');o.value=z[1];o.textContent=z[0];if(j===(i===0?0:2))o.selected=true;sel.appendChild(o);});});
  function calc(){var s1=document.getElementById('tzd-tz1'),s2=document.getElementById('tzd-tz2'),out=document.getElementById('tzd-out'),det=document.getElementById('tzd-detail');if(!out)return;var o1=getOffset(s1.value),o2=getOffset(s2.value),diff=o2-o1;var sign=diff>=0?'+':'';out.textContent=sign+diff+' hours';if(det){var n1=s1.options[s1.selectedIndex].text,n2=s2.options[s2.selectedIndex].text;det.textContent='When it is noon in '+n1+', it is '+(12+diff)+':00 in '+n2+'.';}}
  document.querySelectorAll('#tzd-tz1,#tzd-tz2').forEach(function(s){s.addEventListener('change',calc);});
  calc();
})();
