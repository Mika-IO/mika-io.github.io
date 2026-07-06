/* Random number generator. Secure RNG, optional uniqueness, range + count. */
(function () {
  'use strict';
  var form = document.getElementById('rng-form');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var out = $('rng-out');
  var d = form.dataset;

  function randInt(min, max) {
    var range = max - min + 1;
    if (window.crypto && crypto.getRandomValues) {
      var maxUint = 4294967296;
      var limit = maxUint - (maxUint % range);
      var a = new Uint32Array(1);
      do { crypto.getRandomValues(a); } while (a[0] >= limit);
      return min + (a[0] % range);
    }
    return min + Math.floor(Math.random() * range);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var min = Math.floor(parseFloat($('rng-min').value));
    var max = Math.floor(parseFloat($('rng-max').value));
    var count = Math.max(1, Math.floor(parseFloat($('rng-count').value) || 1));
    var unique = $('rng-unique').checked;
    if (isNaN(min) || isNaN(max)) { out.textContent = '—'; return; }
    if (min > max) { var t = min; min = max; max = t; }
    var span = max - min + 1;
    if (unique && count > span) { out.textContent = d.tooMany || '!'; return; }
    var nums = [];
    if (unique) {
      var pool = [];
      for (var i = min; i <= max; i++) pool.push(i);
      for (var k = 0; k < count; k++) {
        var idx = randInt(0, pool.length - 1);
        nums.push(pool[idx]);
        pool.splice(idx, 1);
      }
    } else {
      for (var j = 0; j < count; j++) nums.push(randInt(min, max));
    }
    out.textContent = nums.join(', ');
  });
})();
