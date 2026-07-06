/* Lorem Ipsum generator. Classic dummy text, by paragraphs / sentences / words. */
(function () {
  'use strict';
  var form = document.getElementById('li-form');
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var out = $('li-out');
  var WORDS = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum').split(' ');

  function rnd(n) { return Math.floor(Math.random() * n); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function words(n) { var a = []; for (var i = 0; i < n; i++) a.push(WORDS[rnd(WORDS.length)]); return a.join(' '); }
  function sentence() {
    var len = 6 + rnd(10);
    var parts = words(len).split(' ');
    // sprinkle a comma
    if (len > 8) parts[3 + rnd(3)] += ',';
    return cap(parts.join(' ')) + '.';
  }
  function paragraph() {
    var n = 3 + rnd(4), a = [];
    for (var i = 0; i < n; i++) a.push(sentence());
    return a.join(' ');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var count = Math.max(1, Math.floor(parseFloat($('li-count').value) || 1));
    var unit = $('li-unit').value;
    var blocks = [];
    if (unit === 'words') { out.value = cap(words(count)) + '.'; return; }
    if (unit === 'sentences') { for (var i = 0; i < count; i++) blocks.push(sentence()); out.value = blocks.join(' '); return; }
    for (var j = 0; j < count; j++) blocks.push(paragraph());
    out.value = blocks.join('\n\n');
  });
  form.dispatchEvent(new Event('submit'));
})();
