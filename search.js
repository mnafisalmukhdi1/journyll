(function () {
  var input = document.getElementById('search-input');
  if (!input) return;
  var out = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  var form = document.getElementById('search-form');
  var data = [];

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function run(q) {
    q = q.trim().toLowerCase();
    out.innerHTML = '';
    if (!q) { status.textContent = ''; return; }
    var terms = q.split(/\s+/);
    var hits = data.filter(function (d) {
      var hay = (d.title + ' ' + d.authors + ' ' + d.keywords + ' ' + d.abstract).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
    status.textContent = hits.length + ' hasil untuk "' + q + '"';
    out.innerHTML = hits.map(function (d) {
      return '<div class="article-card"><h3 class="h6 mb-1"><a href="' + esc(d.url) + '">' + esc(d.title) +
        '</a></h3><div class="small text-muted">' + esc(d.authors) + ' &bull; ' + esc(d.issue) + '</div></div>';
    }).join('');
  }

  fetch(input.dataset.index)
    .then(function (r) { return r.json(); })
    .then(function (j) {
      data = j;
      var q = new URLSearchParams(location.search).get('q') || '';
      input.value = q;
      run(q);
    })
    .catch(function () { status.textContent = 'Indeks pencarian gagal dimuat.'; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    history.replaceState(null, '', '?q=' + encodeURIComponent(input.value));
    run(input.value);
  });
})();
