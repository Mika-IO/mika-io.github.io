/* Random name generator */
(function () {
  'use strict';
  var names = {
    en: {
      male: ['James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles','Oliver','George','Harry','Jack','Noah'],
      female: ['Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen','Emma','Olivia','Sophie','Grace','Lucy'],
      last: ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Taylor','Moore','Anderson','Thomas','Jackson','White']
    },
    es: {
      male: ['Carlos','Juan','José','Miguel','Antonio','Francisco','Manuel','David','Alejandro','Fernando'],
      female: ['María','Ana','Carmen','Laura','Isabel','Elena','Sofía','Paula','Marta','Lucía'],
      last: ['García','López','Martínez','Sánchez','González','Rodríguez','Hernández','Pérez','Gómez','Fernández']
    },
    ja: {
      male: ['Hiroshi','Takashi','Kenji','Yusuke','Daisuke','Ryota','Shota','Kazuki'],
      female: ['Yuki','Haruka','Nana','Sakura','Aoi','Rin','Mio','Hana'],
      last: ['Sato','Suzuki','Tanaka','Watanabe','Ito','Yamamoto','Nakamura','Kobayashi']
    },
    ar: {
      male: ['Mohammed','Ahmed','Ali','Omar','Hassan','Ibrahim','Khalid','Faisal'],
      female: ['Fatima','Aisha','Mariam','Sara','Noor','Layla','Hana','Amira'],
      last: ['Al-Rashid','Al-Hassan','Al-Ahmed','Al-Mohamed','Al-Sayed','Al-Omar']
    }
  };
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
  var genderSel=document.getElementById('rname-gender');
  var originSel=document.getElementById('rname-origin');
  var btn=document.getElementById('rname-btn');
  var out=document.getElementById('rname-out');
  if(!btn||!out) return;
  btn.addEventListener('click',function(){
    var origin=originSel?originSel.value:'en';
    var gender=genderSel?genderSel.value:'any';
    var set=names[origin]||names.en;
    var g=gender==='any'?(Math.random()<0.5?'male':'female'):gender;
    var first=pick(set[g]||set.male);
    var last=pick(set.last);
    // Japanese: last name first
    out.textContent=origin==='ja'?last+' '+first:first+' '+last;
  });
})();
