(function () {
  'use strict';
  var ta = document.getElementById('tweet-text');
  var out = document.getElementById('tweet-out');
  if (!ta || !out) return;
  function countTweet() {
    var text = ta.value;
    var urlRegex = /https?:\/\/\S+/g;
    var urls = text.match(urlRegex) || [];
    var replaced = text.replace(urlRegex, function () {
      return 'x'.repeat(23);
    });
    var count = replaced.length;
    var remaining = 280 - count;
    var color = count <= 200 ? '#22c55e' : count <= 260 ? '#eab308' : count <= 280 ? '#f97316' : '#ef4444';
    var pct = Math.min(100, Math.round((count / 280) * 100));
    out.innerHTML =
      '<div style="margin-bottom:8px">' +
        '<span style="font-size:2rem;font-weight:700;color:' + color + '">' + count + '</span>' +
        '<span style="font-size:1rem;opacity:0.6"> / 280</span>' +
      '</div>' +
      '<div style="background:#e5e7eb;border-radius:4px;height:8px;margin-bottom:8px">' +
        '<div style="background:' + color + ';width:' + pct + '%;height:100%;border-radius:4px;transition:width 0.2s"></div>' +
      '</div>' +
      '<div style="font-size:0.9rem;opacity:0.75">Remaining: <strong>' + remaining + '</strong></div>' +
      '<div style="font-size:0.9rem;opacity:0.75">URLs detected: <strong>' + urls.length + '</strong> (each counted as 23 chars)</div>' +
      (count > 280 ? '<div style="color:#ef4444;font-weight:600;margin-top:6px">⚠ Over limit by ' + (count - 280) + ' characters</div>' : '');
  }
  ta.addEventListener('input', countTweet);
  countTweet();
})();
