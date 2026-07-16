(function(){
  const gradeMap={'A+':4.0,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D+':1.3,'D':1.0,'D-':0.7,'F':0.0};
  const grades=Object.keys(gradeMap);
  let courses=[{name:'Course 1',grade:'A',credits:3},{name:'Course 2',grade:'B+',credits:3}];
  function render(){
    const cont=document.getElementById('gpa-courses');
    cont.innerHTML=courses.map((c,i)=>`<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:0.4rem;align-items:center"><input type="text" value="${c.name}" style="padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)" onchange="courses[${i}].name=this.value;calcGPA()"><select style="padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)" onchange="courses[${i}].grade=this.value;calcGPA()">${grades.map(g=>`<option${g===c.grade?' selected':''}>${g}</option>`).join('')}</select><input type="number" value="${c.credits}" min="1" max="6" style="width:50px;padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text);text-align:center" onchange="courses[${i}].credits=parseFloat(this.value)||3;calcGPA()"><button style="background:none;border:none;cursor:pointer;opacity:0.5;font-size:1.1rem" onclick="courses.splice(${i},1);render();calcGPA()">×</button></div>`).join('');
    calcGPA();
  }
  function calcGPA(){
    let totalPoints=0,totalCredits=0;
    courses.forEach(c=>{totalPoints+=gradeMap[c.grade]*c.credits;totalCredits+=c.credits;});
    const gpa=totalCredits?totalPoints/totalCredits:0;
    const out=document.getElementById('gpa-out');
    out.innerHTML=`<div style="font-size:3rem;font-weight:800;color:var(--accent,#6366f1)">${gpa.toFixed(2)}</div><p style="opacity:0.6">GPA on 4.0 scale · ${totalCredits} credit hours</p>`;
  }
  window.courses=courses;
  document.getElementById('gpa-add').onclick=function(){courses.push({name:'Course '+(courses.length+1),grade:'B',credits:3});render();};
  render();
})();