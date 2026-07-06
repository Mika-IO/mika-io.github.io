/* Shared runtime helpers for every tool page. Tiny, no dependencies. */
(function () {
  'use strict';
  // Copy buttons: <button data-copy="#selectorOrId">…</button>
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var sel = btn.getAttribute('data-copy');
    var el = document.querySelector(sel) || document.getElementById(sel.replace(/^#/, ''));
    var text = el ? (el.value != null && el.value !== undefined ? el.value : el.textContent) : '';
    if (!text) return;
    navigator.clipboard && navigator.clipboard.writeText(text).then(function () {
      var done = btn.getAttribute('data-copied') || 'Copied!';
      var prev = btn.textContent;
      btn.textContent = done;
      btn.classList.add('copy-ok');
      setTimeout(function () { btn.textContent = prev; btn.classList.remove('copy-ok'); }, 1500);
    });
  });
})();
