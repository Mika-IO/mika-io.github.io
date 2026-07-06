/* Age calculator. Exact years/months/days, total days, and next birthday. */
(function () {
  'use strict';
  var form = document.getElementById('age');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang || 'en';
  var d = form.dataset; // labels: years, months, days, totaldays, nextbday, dayssuffix

  function calc() {
    var bv = $('age-dob').value;
    if (!bv) { $('age-out').hidden = true; return; }
    var b = new Date(bv + 'T00:00:00');
    var ref = $('age-at').value ? new Date($('age-at').value + 'T00:00:00') : new Date();
    ref.setHours(0, 0, 0, 0);
    if (isNaN(b) || b > ref) { $('age-out').hidden = true; return; }

    var y = ref.getFullYear() - b.getFullYear();
    var m = ref.getMonth() - b.getMonth();
    var day = ref.getDate() - b.getDate();
    if (day < 0) { m--; day += new Date(ref.getFullYear(), ref.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    var totalDays = Math.floor((ref - b) / 86400000);

    // next birthday
    var next = new Date(ref.getFullYear(), b.getMonth(), b.getDate());
    if (next < ref) next = new Date(ref.getFullYear() + 1, b.getMonth(), b.getDate());
    var toNext = Math.round((next - ref) / 86400000);

    $('age-main').textContent = y + ' ' + d.years + ', ' + m + ' ' + d.months + ', ' + day + ' ' + d.days;
    $('age-total').textContent = totalDays.toLocaleString(lang) + ' ' + d.totaldays;
    $('age-next').textContent = d.nextbday + ': ' + toNext + ' ' + d.dayssuffix;
    $('age-out').hidden = false;
  }
  form.addEventListener('input', calc);
  calc();
})();
