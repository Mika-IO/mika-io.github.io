(function(){
  document.getElementById('mc-form').addEventListener('submit',function(e){
    e.preventDefault();
    const people=parseInt(document.getElementById('mc-people').value);
    const salary=parseFloat(document.getElementById('mc-salary').value);
    const hours=parseFloat(document.getElementById('mc-hours').value);
    const hourlyRate=salary/2080;// 52 weeks × 40 hours
    const cost=people*hourlyRate*hours;
    const out=document.getElementById('mc-out');out.hidden=false;
    out.innerHTML=`<div style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1)">$${cost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</div><p style="opacity:0.7;margin-top:0.25rem">${people} people × ${hours}h × $${hourlyRate.toFixed(0)}/hr</p><p style="opacity:0.5;font-size:0.85rem;margin-top:0.25rem">True cost (with overhead 1.4×): $${(cost*1.4).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p>`;
  });
})();