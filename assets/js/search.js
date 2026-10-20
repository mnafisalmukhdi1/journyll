(function () {
  var input = document.getElementById('search-input');
  if (!input) return;
  var sel = document.getElementById('search-journal');
  var out = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  var form = document.getElementById('search-form');
  var data = [];

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function run() {
    var q = input.value.trim().toLowerCase();
    var j = sel.value;
    out.innerHTML = '';
    if (!q && !j) { status.textContent = ''; return; }
    var terms = q ? q.split(/\s+/) : [];
    var hits = data.filter(function (d) {
      if (j && d.journal !== j) return false;
      var hay = (d.title + ' ' + d.authors + ' ' + d.keywords + ' ' + d.abstract).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
    status.textContent = hits.length + ' hasil' + (q ? ' untuk "' + q + '"' : '');
    out.innerHTML = hits.map(function (d) {
      return '<div class="article-card"><div class="small text-muted">' + esc(d.journal_name) + ' &bull; ' + esc(d.issue) +
        '</div><h3 class="h6 mb-1"><a href="' + esc(d.url) + '">' + esc(d.title) +
        '</a></h3><div class="small text-muted">' + esc(d.authors) + '</div></div>';
    }).join('');
  }

  function sync() {
    var p = new URLSearchParams();
    if (input.value) p.set('q', input.value);
    if (sel.value) p.set('j', sel.value);
    history.replaceState(null, '', '?' + p.toString());
  }

  fetch(input.dataset.index)
    .then(function (r) { return r.json(); })
    .then(function (json) {
      data = json;
      var p = new URLSearchParams(location.search);
      input.value = p.get('q') || '';
      sel.value = p.get('j') || '';
      run();
    })
    .catch(function () { status.textContent = 'Indeks pencarian gagal dimuat.'; });

  form.addEventListener('submit', function (e) { e.preventDefault(); sync(); run(); });
  sel.addEventListener('change', function () { sync(); run(); });
})();
