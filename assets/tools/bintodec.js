(function(){
  'use strict';
  var inp = document.getElementById('bd-input');
  var results = document.getElementById('bd-results');
  if (!inp || !results) return;

  function parseNum(str, base) {
    str = str.trim().toUpperCase();
    if (!str) return null;
    var valid = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^[0-9]+$/,
      16: /^[0-9A-F]+$/
    };
    if (!valid[base].test(str)) return null;
    return parseInt(str, base);
  }

  function row(label, value, color) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.75rem;border-radius:0.5rem;background:' + color + '">' +
      '<span style="font-weight:600;opacity:0.75">' + label + '</span>' +
      '<span style="font-family:monospace;font-size:1.1rem;font-weight:700">' + value + '</span></div>';
  }

  function calc() {
    var base = parseInt(document.querySelector('input[name="bd-base"]:checked').value, 10);
    var n = parseNum(inp.value, base);
    if (n === null || isNaN(n)) {
      results.innerHTML = '';
      return;
    }
    results.innerHTML =
      row('Binary (base 2)', n.toString(2), 'rgba(99,102,241,0.12)') +
      row('Octal (base 8)', n.toString(8), 'rgba(16,185,129,0.12)') +
      row('Decimal (base 10)', n.toString(10), 'rgba(245,158,11,0.12)') +
      row('Hexadecimal (base 16)', n.toString(16).toUpperCase(), 'rgba(239,68,68,0.12)');
  }

  inp.addEventListener('input', calc);
  document.querySelectorAll('input[name="bd-base"]').forEach(function(r) {
    r.addEventListener('change', calc);
  });
  calc();
})();
