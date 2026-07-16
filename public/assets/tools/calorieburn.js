(function(){
  const activities=[['Walking (slow, 3 km/h)',2.5],['Walking (moderate, 5 km/h)',3.5],['Walking (brisk, 6 km/h)',4.3],['Hiking',6.0],['Running (8 km/h)',8.0],['Running (10 km/h)',10.0],['Running (12 km/h)',11.5],['Running (marathon pace)',13.3],['Cycling (leisure)',4.0],['Cycling (16 km/h)',6.0],['Cycling (22 km/h)',10.0],['Swimming (leisure)',5.8],['Swimming laps (vigorous)',9.8],['Weight training',3.5],['HIIT',8.0],['Yoga',2.5],['Pilates',3.0],['Jump rope',11.8],['Dancing',5.0],['Soccer',7.0],['Basketball',6.5],['Tennis',7.3],['Volleyball',4.0],['Rock climbing',8.0],['Rowing machine (moderate)',7.0],['Elliptical (moderate)',5.0],['Stair climbing',9.0],['Gardening',3.5],['Housework',3.0]];
  const sel=document.getElementById('cb-activity');
  activities.forEach(([name,met])=>{const o=document.createElement('option');o.value=met;o.textContent=name;sel.appendChild(o);});
  document.getElementById('cb-form').addEventListener('submit',function(e){
    e.preventDefault();
    let w=parseFloat(document.getElementById('cb-weight').value)||70;
    if(document.getElementById('cb-wunit').value==='lbs')w*=0.453592;
    const mins=parseFloat(document.getElementById('cb-minutes').value)||30;
    const met=parseFloat(sel.value);
    const cal=Math.round(met*w*(mins/60));
    document.getElementById('cb-cal').textContent=cal+' kcal';
    document.getElementById('cb-hint').textContent='Approximate — individual results vary';
    document.getElementById('cb-out').hidden=false;
  });
})();