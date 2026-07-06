(function () {
  'use strict';
  var ta = document.getElementById('tiktok-caption');
  var out = document.getElementById('tiktok-out');
  if (!ta || !out) return;
  function analyze() {
    var text = ta.value;
    var chars = text.length;
    var words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    var hashtags = (text.match(/#\w+/g) || []).length;
    var readSecs = Math.ceil(words / 200 * 60);
    var readTime = words < 40 ? 'less than a minute' : Math.ceil(words / 200) + ' min read';
    var color = chars <= 1800 ? '#22c55e' : chars <= 2200 ? '#eab308' : '#ef4444';
    var pct = Math.min(100, Math.round((chars / 2200) * 100));
    out.innerHTML =
      '<div style="margin-bottom:8px">' +
        '<span style="font-size:2rem;font-weight:700;color:' + color + '">' + chars + '</span>' +
        '<span style="font-size:1rem;opacity:0.6"> / 2,200 chars</span>' +
      '</div>' +
      '<div style="background:#e5e7eb;border-radius:4px;height:8px;margin-bottom:10px">' +
        '<div style="background:' + color + ';width:' + pct + '%;height:100%;border-radius:4px;transition:width 0.2s"></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:0.9rem">' +
        '<div>🏷 Hashtags: <strong>' + hashtags + '</strong></div>' +
        '<div>📝 Words: <strong>' + words + '</strong></div>' +
        '<div>⏱ Read time: <strong>' + readTime + '</strong></div>' +
        '<div>✅ Remaining: <strong>' + Math.max(0, 2200 - chars) + '</strong></div>' +
      '</div>' +
      (chars > 2200 ? '<div style="color:#ef4444;font-weight:600;margin-top:8px">⚠ Over limit by ' + (chars - 2200) + ' chars</div>' : '');
  }
  ta.addEventListener('input', analyze);
  analyze();
})();
