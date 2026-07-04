/* BMI calculator. Localized labels come from data-* attributes on the form. */
(function () {
  'use strict';
  var form = document.getElementById('bmi-form');
  if (!form) return;
  var units = document.getElementById('bmi-units');
  var height = document.getElementById('bmi-height');
  var weight = document.getElementById('bmi-weight');
  var hLabel = document.getElementById('bmi-hlabel');
  var wLabel = document.getElementById('bmi-wlabel');
  var resultBox = document.getElementById('bmi-result');
  var valueEl = document.getElementById('bmi-value');
  var catEl = document.getElementById('bmi-cat');
  var d = form.dataset;

  function syncLabels() {
    var metric = units.value === 'metric';
    hLabel.textContent = metric ? d.hmet : d.himp;
    wLabel.textContent = metric ? d.wmet : d.wimp;
  }
  units.addEventListener('change', syncLabels);
  syncLabels();

  function classify(bmi) {
    if (bmi < 18.5) return { label: d.under, color: '#f59e0b' };
    if (bmi < 25) return { label: d.normal, color: '#16a34a' };
    if (bmi < 30) return { label: d.over, color: '#f97316' };
    return { label: d.obese, color: '#dc2626' };
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var h = parseFloat(height.value);
    var w = parseFloat(weight.value);
    if (!(h > 0) || !(w > 0)) { resultBox.hidden = true; return; }
    var bmi;
    if (units.value === 'metric') {
      var m = h / 100;
      bmi = w / (m * m);
    } else {
      bmi = 703 * w / (h * h);
    }
    var c = classify(bmi);
    valueEl.textContent = bmi.toFixed(1);
    catEl.textContent = ' · ' + c.label;
    resultBox.style.borderInlineStart = '4px solid ' + c.color;
    resultBox.hidden = false;
  });
})();
