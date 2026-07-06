/* Aspect ratio calculator: simplify width:height and scale to a new width. */
(function () {
  'use strict';
  var form = document.getElementById('tool-form');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  var COMMON = { '16:9': 'Widescreen HD/4K', '4:3': 'Standard/classic TV', '1:1': 'Square', '21:9': 'Ultrawide cinema', '3:2': '35mm photo', '9:16': 'Vertical/mobile video', '5:4': 'Large format' };

  function update() {
    var w = parseFloat($('ar-width').value);
    var h = parseFloat($('ar-height').value);
    if (w > 0 && h > 0) {
      var d = gcd(Math.round(w), Math.round(h));
      var rw = Math.round(w) / d, rh = Math.round(h) / d;
      $('ar-ratio-result').textContent = rw + ' : ' + rh;
      var key = rw + ':' + rh;
      $('ar-common-name').textContent = COMMON[key] || '';
    } else {
      $('ar-ratio-result').textContent = '—';
      $('ar-common-name').textContent = '';
    }
    var nw = parseFloat($('ar-new-width').value);
    if (w > 0 && h > 0 && nw > 0) {
      var nh = nw * (h / w);
      $('ar-scale-result').textContent = Math.round(nw) + ' × ' + Math.round(nh * 100) / 100;
    } else {
      $('ar-scale-result').textContent = '—';
    }
  }
  form.addEventListener('input', update);
  update();
})();
