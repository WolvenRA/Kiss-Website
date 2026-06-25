(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  // Close menu on link click (mobile)
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  function isDownloadLink(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.dataset && anchor.dataset.downloadName) return true;
    return /(?:^|\/)downloads\//.test(anchor.getAttribute('href') || '') ||
      /\.(?:msi|vsix|tar\.gz|zip|pdf|odt|md)(?:[?#].*)?$/i.test(anchor.pathname || anchor.href);
  }

  function downloadEventName(anchor) {
    if (anchor.dataset && anchor.dataset.downloadName) return 'download-' + anchor.dataset.downloadName;
    var href = anchor.getAttribute('href') || anchor.href || 'unknown';
    var file = href.split('/').pop().split('?')[0].split('#')[0] || 'unknown';
    return 'download-' + file.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  document.addEventListener('click', function (e) {
    var anchor = e.target.closest ? e.target.closest('a') : null;
    if (!anchor || !isDownloadLink(anchor)) return;
    if (!window.goatcounter || typeof window.goatcounter.count !== 'function') return;
    window.goatcounter.count({
      path: downloadEventName(anchor),
      title: anchor.textContent ? anchor.textContent.trim() : anchor.href,
      event: true
    });
  });
})();
