/* Binary <-> text. UTF-8 aware: 8 bits per byte, space separated. */
(function () {
  'use strict';
  var wrap = document.getElementById('bin');
  if (!wrap) return;
  var input = document.getElementById('bin-input');
  var output = document.getElementById('bin-output');
  var enc = window.TextEncoder ? new TextEncoder() : null;
  var dec = window.TextDecoder ? new TextDecoder() : null;

  function toBinary(s) {
    var bytes = enc ? enc.encode(s) : s.split('').map(function (c) { return c.charCodeAt(0); });
    var out = [];
    for (var i = 0; i < bytes.length; i++) out.push(('00000000' + bytes[i].toString(2)).slice(-8));
    return out.join(' ');
  }
  function toText(s) {
    var groups = s.trim().split(/\s+/).filter(Boolean);
    var bytes = [];
    for (var i = 0; i < groups.length; i++) {
      if (!/^[01]+$/.test(groups[i])) continue;
      bytes.push(parseInt(groups[i], 2) & 0xff);
    }
    if (dec) return dec.decode(new Uint8Array(bytes));
    return bytes.map(function (b) { return String.fromCharCode(b); }).join('');
  }
  wrap.addEventListener('click', function (e) {
    var b = e.target.closest('[data-op]');
    if (!b) return;
    output.value = b.getAttribute('data-op') === 'encode' ? toBinary(input.value) : toText(input.value);
  });
})();
