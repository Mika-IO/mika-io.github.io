/* Random colour generator. Secure-ish random hex, shows swatch + HEX/RGB/HSL. */
(function () {
  'use strict';
  var root = document.getElementById('rc');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var swatch = $('rc-swatch'), hex = $('rc-hex'), rgb = $('rc-rgb'), hsl = $('rc-hsl');
  function rb() { if (window.crypto && crypto.getRandomValues) { var a = new Uint8Array(1); crypto.getRandomValues(a); return a[0]; } return Math.floor(Math.random() * 256); }
  function toHex(n) { return ('0' + n.toString(16)).slice(-2); }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      var dd = max - min;
      s = l > 0.5 ? dd / (2 - max - min) : dd / (max + min);
      if (max === r) h = (g - b) / dd + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / dd + 2;
      else h = (r - g) / dd + 4;
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
  function gen() {
    var r = rb(), g = rb(), b = rb();
    var h = '#' + toHex(r) + toHex(g) + toHex(b);
    swatch.style.background = h;
    hex.textContent = h.toUpperCase();
    rgb.textContent = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    var hs = rgbToHsl(r, g, b);
    hsl.textContent = 'hsl(' + hs[0] + ', ' + hs[1] + '%, ' + hs[2] + '%)';
  }
  $('rc-gen').addEventListener('click', gen);
  gen();
})();
