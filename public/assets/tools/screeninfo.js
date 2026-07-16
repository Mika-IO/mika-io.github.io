(function(){
  const items=[
    ['Screen resolution',screen.width+'×'+screen.height+' px'],
    ['Available resolution',screen.availWidth+'×'+screen.availHeight+' px'],
    ['Viewport (window)',window.innerWidth+'×'+window.innerHeight+' px'],
    ['Document client',document.documentElement.clientWidth+'×'+document.documentElement.clientHeight+' px'],
    ['Device pixel ratio',window.devicePixelRatio+'× ('+Math.round(window.devicePixelRatio*96)+' DPI approx)'],
    ['Color depth',screen.colorDepth+' bit ('+Math.pow(2,screen.colorDepth).toLocaleString(window.__LANG||undefined)+' colors)'],
    ['Orientation',screen.orientation?screen.orientation.type:'unknown'],
    ['Touch support','ontouchstart' in window?'Yes ('+navigator.maxTouchPoints+' points)':'No'],
    ['Browser language',navigator.language],
    ['Platform',navigator.platform||'unknown'],
  ];
  document.getElementById('si-out').innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong style="font-size:0.9rem;word-break:break-all">${v}</strong></div>`).join('');
})();