/* Blood type compatibility — static lookup table */
(function () {
  'use strict';
  var compat = {
    'A+':  { donate: ['A+','AB+'],                        receive: ['A+','A-','O+','O-'] },
    'A-':  { donate: ['A+','A-','AB+','AB-'],             receive: ['A-','O-'] },
    'B+':  { donate: ['B+','AB+'],                        receive: ['B+','B-','O+','O-'] },
    'B-':  { donate: ['B+','B-','AB+','AB-'],             receive: ['B-','O-'] },
    'O+':  { donate: ['A+','B+','O+','AB+'],              receive: ['O+','O-'] },
    'O-':  { donate: ['A+','A-','B+','B-','O+','O-','AB+','AB-'], receive: ['O-'] },
    'AB+': { donate: ['AB+'],                             receive: ['A+','A-','B+','B-','O+','O-','AB+','AB-'] },
    'AB-': { donate: ['AB+','AB-'],                       receive: ['A-','B-','O-','AB-'] }
  };
  var form = document.getElementById('bt-form');
  if (!form) return;
  var sel  = document.getElementById('bt-select');
  var out  = document.getElementById('bt-out');
  var donEl = document.getElementById('bt-donate');
  var recEl = document.getElementById('bt-receive');
  var note  = document.getElementById('bt-note');
  var d = form.dataset;

  function tags(arr) {
    return arr.map(function(t){ return '<span class="tag">' + t + '</span>'; }).join(' ');
  }

  sel.addEventListener('change', function () {
    var type = sel.value;
    if (!type || !compat[type]) { out.hidden = true; return; }
    var c = compat[type];
    donEl.innerHTML = tags(c.donate);
    recEl.innerHTML = tags(c.receive);
    if (type === 'O-') note.textContent = d.universalDonor || '';
    else if (type === 'AB+') note.textContent = d.universalRecipient || '';
    else note.textContent = '';
    out.hidden = false;
  });
})();
