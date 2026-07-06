/* Text case converter. Buttons transform the textarea in place. Live counts too. */
(function () {
  'use strict';
  var ta = document.getElementById('cc-input');
  if (!ta) return;
  var wrap = document.getElementById('cc');
  var smalls = { a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ' };
  var ops = {
    upper: function (s) { return s.toUpperCase(); },
    lower: function (s) { return s.toLowerCase(); },
    title: function (s) { return s.replace(/\b(\p{L})(\p{L}*)/gu, function (_, a, b) { return a.toUpperCase() + b.toLowerCase(); }); },
    sentence: function (s) { return s.toLowerCase().replace(/(^\s*\p{L})|([.!?]\s+\p{L})/gu, function (m) { return m.toUpperCase(); }); },
    alternate: function (s) { var i = 0; return s.replace(/\p{L}/gu, function (c) { return (i++ % 2) ? c.toUpperCase() : c.toLowerCase(); }); },
    inverse: function (s) { return s.replace(/\p{L}/gu, function (c) { return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase(); }); },
    small: function (s) { return s.toLowerCase().replace(/[a-z]/g, function (c) { return smalls[c] || c; }); }
  };
  wrap.addEventListener('click', function (e) {
    var b = e.target.closest('[data-op]');
    if (!b) return;
    var fn = ops[b.getAttribute('data-op')];
    if (fn) ta.value = fn(ta.value);
  });
})();
