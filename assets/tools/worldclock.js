/* World clock — compare local times in multiple cities */
(function () {
  'use strict';
  var zones = [
    ['New York','America/New_York'],['Los Angeles','America/Los_Angeles'],['London','Europe/London'],
    ['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],['Moscow','Europe/Moscow'],
    ['Dubai','Asia/Dubai'],['Mumbai','Asia/Kolkata'],['Singapore','Asia/Singapore'],
    ['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney'],['São Paulo','America/Sao_Paulo'],
    ['Mexico City','America/Mexico_City'],['Buenos Aires','America/Argentina/Buenos_Aires'],
    ['Cairo','Africa/Cairo'],['Lagos','Africa/Lagos'],['Beijing','Asia/Shanghai'],
    ['Seoul','Asia/Seoul'],['Bangkok','Asia/Bangkok'],['Jakarta','Asia/Jakarta']
  ];
  var selects = ['wc-city1','wc-city2','wc-city3'];
  var defaults = [0,2,9]; // NY, London, Tokyo
  selects.forEach(function(id, i) {
    var sel = document.getElementById(id);
    if (!sel) return;
    zones.forEach(function(z, j) {
      var o = document.createElement('option');
      o.value = z[1]; o.textContent = z[0];
      if (j === defaults[i]) o.selected = true;
      sel.appendChild(o);
    });
  });
  function update() {
    var out = document.getElementById('wc-out');
    if (!out) return;
    var html = selects.map(function(id) {
      var sel = document.getElementById(id);
      if (!sel) return '';
      var tz = sel.value;
      var name = sel.options[sel.selectedIndex].text;
      try {
        var fmt = new Intl.DateTimeFormat([], {
          timeZone: tz, hour:'2-digit', minute:'2-digit', second:'2-digit',
          hour12: false, weekday:'short', month:'short', day:'numeric'
        });
        return '<div><strong>' + name + '</strong> — ' + fmt.format(new Date()) + '</div>';
      } catch(e) { return '<div>' + name + ': error</div>'; }
    }).join('');
    out.innerHTML = html;
  }
  document.querySelectorAll('#wc-city1,#wc-city2,#wc-city3').forEach(function(s) {
    s.addEventListener('change', update);
  });
  update();
  setInterval(update, 1000);
})();
