/* Text repeater. Repeat text N times with a chosen separator. Live. */
(function () {
  'use strict';
  var form = document.getElementById('tr');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var input = $('tr-input'), out = $('tr-out');
  function build() {
    var text = input.value;
    var n = Math.max(0, Math.floor(parseFloat($('tr-times').value) || 0));
    var sepKind = $('tr-sep').value;
    var sep = sepKind === 'newline' ? '\n' : sepKind === 'space' ? ' ' : sepKind === 'comma' ? ', ' : '';
    if (!text || n === 0) { out.value = ''; return; }
    var cap = 100000; // guard against runaway output
    var parts = [];
    for (var i = 0; i < n && parts.join(sep).length < cap; i++) parts.push(text);
    out.value = parts.join(sep);
  }
  form.addEventListener('input', build);
  build();
})();
