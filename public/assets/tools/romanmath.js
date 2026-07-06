(function(){
  'use strict';
  var vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  var syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  function toRoman(n){if(isNaN(n)||n<1||n>3999)return'';var r='';for(var i=0;i<vals.length;i++){while(n>=vals[i]){r+=syms[i];n-=vals[i];}}return r;}
  function fromRoman(s){s=s.toUpperCase().trim();var map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};var r=0;for(var i=0;i<s.length;i++){var cur=map[s[i]],next=map[s[i+1]];if(!cur)return NaN;if(next&&next>cur){r-=cur;}else r+=cur;}return r;}
  var decIn=document.getElementById('roman-dec'),romOut=document.getElementById('roman-out');
  var romIn=document.getElementById('roman-in'),decOut=document.getElementById('roman-dec-out');
  if(decIn)decIn.addEventListener('input',function(){if(romOut)romOut.textContent=toRoman(parseInt(decIn.value,10))||'—';});
  if(romIn)romIn.addEventListener('input',function(){var r=fromRoman(romIn.value);if(decOut)decOut.textContent=isNaN(r)||r<1?'—':r;});
})();
