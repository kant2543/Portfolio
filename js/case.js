/* Renders one case from window.CASES on case.html?id=<id> */
(function () {
  var root = document.getElementById('case-root');
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function paras(arr) {
    return (Array.isArray(arr) ? arr : [arr]).filter(Boolean).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  }
  function list(arr) {
    return '<ul>' + (arr || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }
  function sec(title, body) { return body ? '<section class="cs-sec"><h2>' + esc(title) + '</h2>' + body + '</section>' : ''; }

  var id = new URLSearchParams(location.search).get('id');
  var c = (window.CASES || []).filter(function (x) { return x.id === id; })[0];
  if (!c) {
    root.innerHTML = '<div class="cs-empty">Case not found. <a href="index.html#cases">See all cases →</a></div>';
    return;
  }
  document.title = c.title + ' — Case Study · Kant Lersphuksakit';

  var ex = c.exhibit;
  var exhibit = ex ? '<p>' + esc(ex.caption) + '</p><div class="cs-table-wrap"><table class="cs-table"><thead><tr>' +
    ex.columns.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
    ex.rows.map(function (r) { return '<tr>' + r.map(function (v) { return '<td>' + esc(v) + '</td>'; }).join('') + '</tr>'; }).join('') +
    '</tbody></table></div>' + (ex.note ? '<p class="cs-note">' + esc(ex.note) + '</p>' : '') : '';

  var options = (c.options || []).length ? '<div class="cs-options">' + c.options.map(function (o) {
    return '<div class="cs-opt' + (o.chosen ? ' chosen' : '') + '"><h3>' + esc(o.name) + (o.chosen ? '<small>My call</small>' : '') + '</h3><dl>' +
      '<dt>For</dt><dd>' + esc(o.pros) + '</dd><dt>Against</dt><dd>' + esc(o.cons) + '</dd></dl></div>';
  }).join('') + '</div>' : '';

  var iters = (c.iterations || []).length ? '<div class="cs-iter">' + c.iterations.map(function (it, i) {
    return '<div class="cs-round"><div class="cs-round-label">ROUND ' + (i + 1) + '</div>' +
      '<p class="cs-challenge">“' + esc(it.challenge) + '”</p>' +
      '<p class="cs-change"><b>What changed:</b> ' + esc(it.change) + '</p></div>';
  }).join('') + '</div>' : '';

  var labels = { framing: 'Framing', numbers: 'Numbers', options: 'Options', decision: 'Decision & Risk', communication: 'Communication' };
  var sc = c.scorecard || {};
  var score = Object.keys(labels).filter(function (k) { return sc[k] != null; }).map(function (k) {
    return '<div><b>' + esc(sc[k]) + '</b><span>' + labels[k] + '</span></div>';
  }).join('');

  var sources = (c.sources || []).length ? '<ul class="cs-sources">' + c.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '</a></li>';
  }).join('') + '</ul>' : '';

  root.innerHTML =
    '<a class="cs-back" href="index.html#cases">← All case studies</a>' +
    '<div class="cs-eyebrow">' + esc(c.domain) + ' · ' + esc(c.type) + ' · ' + esc(c.company) + (c.year ? ' ' + esc(c.year) : '') + '</div>' +
    '<h1 class="cs-title">' + esc(c.title) + '</h1>' +
    '<p class="cs-hook">' + esc(c.hook) + '</p>' +
    '<p class="cs-about">Part of my <a href="index.html#cases">Decision Lab</a> — a weekly practice where I take one real business decision, work it end to end, defend it under challenge, then check it against what actually happened.</p>' +
    '<div class="cs-bluf"><h2>Bottom line up front</h2><ul>' + (c.summary || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' +
    sec('The situation', paras(c.situation)) +
    sec('The real question', '<p class="cs-question">' + esc(c.question) + '</p>' + paras(c.reframe)) +
    sec('Sizing it', exhibit) +
    sec('Options on the table', options) +
    sec('My call', paras(c.decision)) +
    sec('Risks & what would change my mind', list(c.risks)) +
    sec('Stress-tested', iters) +
    sec('What actually happened', paras(c.outcome)) +
    sec('Where I was right — and wrong', paras(c.verdict)) +
    sec('Takeaways', list(c.takeaways)) +
    sec('Scorecard (self-assessed, 1–5)', score ? '<div class="cs-score">' + score + '</div>' : '') +
    sec('Sources', sources);
})();
