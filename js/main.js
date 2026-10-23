(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- NAV ---------- */
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  function setNav(open) {
    toggle.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function () { setNav(!navLinks.classList.contains('open')); });
  navLinks.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });

  /* ---------- PROFILE PHOTO FALLBACK ---------- */
  var photo = document.getElementById('hero-photo-img');
  var ring = photo && photo.parentElement;
  function photoMissing() { if (ring) ring.classList.add('photo-missing'); }
  if (photo) {
    photo.addEventListener('error', photoMissing);
    if (photo.complete && photo.naturalWidth === 0) photoMissing();
  }

  /* ---------- PROJECTS ---------- */
  var grid = document.getElementById('projects-grid');
  if (grid && window.PROJECTS) {
    grid.innerHTML = window.PROJECTS.map(function (p, i) {
      var num = (i + 1 < 10 ? '0' : '') + (i + 1);
      var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
      return '<article class="project-card reveal">' +
        '<div class="project-top"><span class="project-cat">' + esc(p.cat) + '</span><span class="project-idx">' + num + '</span></div>' +
        '<h3 class="project-name">' + esc(p.name) + '</h3>' +
        '<p class="project-desc">' + esc(p.desc) + '</p>' +
        '<div class="skill-tags">' + tags + '</div>' +
        '</article>';
    }).join('');
  }

  /* ---------- CASE STUDIES ---------- */
  var casesGrid = document.getElementById('cases-grid');
  var cases = (window.CASES || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  if (casesGrid && cases.length) {
    casesGrid.innerHTML = cases.map(function (c) {
      var sc = c.scorecard || {};
      var vals = Object.keys(sc).map(function (k) { return sc[k]; });
      var avg = vals.length ? (vals.reduce(function (x, y) { return x + y; }, 0) / vals.length).toFixed(1) : '';
      return '<a class="case-card reveal" href="case.html?id=' + encodeURIComponent(c.id) + '">' +
        '<div class="project-top"><span class="project-cat">' + esc(c.domain) + ' · ' + esc(c.type) + '</span>' +
        (avg ? '<span class="case-score" title="Self-assessed score (avg of 5 dimensions)">' + avg + ' / 5</span>' : '') + '</div>' +
        '<div class="case-meta">' + esc(c.company) + (c.year ? ' · ' + esc(c.year) : '') + '</div>' +
        '<h3 class="project-name">' + esc(c.title) + '</h3>' +
        '<p class="project-desc">' + esc(c.hook) + '</p>' +
        '<p class="case-insight"><span>Key insight</span>' + esc(c.insight) + '</p>' +
        '<span class="case-read">Read the case <span>→</span></span>' +
        '</a>';
    }).join('');
  } else {
    var casesSec = document.getElementById('cases');
    var casesNav = document.getElementById('nav-cases');
    if (casesSec) casesSec.remove();
    if (casesNav) casesNav.remove();
  }

  /* ---------- SCROLL REVEAL ---------- */
  document.querySelectorAll('.about-grid, .skill-card, .contact-card, .projects-intro').forEach(function (el) {
    el.classList.add('reveal');
  });
  var revealEls = document.querySelectorAll('.reveal');
  if (!hasIO || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el, i) {
      if (el.matches('.skill-card, .project-card, .contact-card')) el.style.transitionDelay = ((i % 6) * 0.07) + 's';
      revealObs.observe(el);
    });
  }

  /* ---------- STAT COUNTERS ---------- */
  function fmt(n) { return n.toLocaleString('en-US'); }
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var start = performance.now(), dur = 1200;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(Math.floor(eased * target)) + (p < 1 ? '' : suffix);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statsEl = document.querySelector('.hero-stats');
  if (statsEl && hasIO && !reduceMotion) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.stat-num[data-target]').forEach(function (el, i) {
          setTimeout(function () { animateCounter(el); }, i * 100);
        });
        counterObs.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    counterObs.observe(statsEl);
  }

  /* ---------- TIMELINE REVEAL ---------- */
  var tlItems = document.querySelectorAll('.tl-item');
  if (hasIO && !reduceMotion) {
    var tlObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove('hidden');
        tlObs.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    tlItems.forEach(function (item, i) {
      item.classList.add('hidden');
      item.style.transitionDelay = (i * 0.12) + 's';
      tlObs.observe(item);
    });
  }

  /* ---------- GALLERY MODAL ---------- */
  var expData = window.EXPERIENCE || {};
  var modal = document.getElementById('exp-modal');
  var mPeriod = document.getElementById('modal-period');
  var mCompany = document.getElementById('modal-company');
  var mTitle = document.getElementById('modal-title');
  var mGallery = document.getElementById('modal-gallery');
  var mDots = document.getElementById('modal-dots');
  var btnPrev = document.getElementById('modal-prev');
  var btnNext = document.getElementById('modal-next');
  var currentSlide = 0, totalSlides = 0, lastFocus = null;
  var isDown = false, startX = 0, scrollStart = 0;

  var PLACEHOLDER = '<div class="mg-placeholder"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="1" y="1" width="38" height="38" rx="4" stroke="currentColor" stroke-width="1.2"/><circle cx="14" cy="15" r="4" stroke="currentColor" stroke-width="1.2"/><path d="M1 28l10-8 7 6 6-5 15 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Photo coming soon</span></div>';

  function buildSlide(s) {
    var img = s.img ? '<img src="' + esc(s.img) + '" alt="' + esc(s.label) + '" loading="lazy" draggable="false">' : PLACEHOLDER;
    return '<div class="mg-slide"><div class="mg-img">' + img + '</div>' +
      '<div class="mg-caption"><div class="mg-caption-label">' + esc(s.label) + '</div>' +
      '<div class="mg-caption-text">' + esc(s.caption) + '</div></div></div>';
  }

  function syncUI() {
    mDots.querySelectorAll('.modal-dot').forEach(function (d, i) { d.classList.toggle('active', i === currentSlide); });
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide >= totalSlides - 1;
  }

  function goTo(idx) {
    currentSlide = Math.max(0, Math.min(idx, totalSlides - 1));
    mGallery.scrollTo({ left: currentSlide * mGallery.offsetWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    syncUI();
  }

  function openExpModal(key) {
    var d = expData[key];
    if (!d) return;
    lastFocus = document.activeElement;
    currentSlide = 0;
    totalSlides = d.slides.length;
    mPeriod.textContent = d.period;
    mCompany.textContent = d.company;
    mTitle.textContent = d.role;
    mGallery.innerHTML = d.slides.map(buildSlide).join('');
    // broken image → placeholder
    mGallery.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () { img.parentElement.innerHTML = PLACEHOLDER; });
    });
    mDots.innerHTML = d.slides.map(function (_, i) {
      return '<button class="modal-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('');
    mGallery.scrollLeft = 0;
    syncUI();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close').focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  mDots.addEventListener('click', function (e) {
    var b = e.target.closest('.modal-dot');
    if (b) goTo(parseInt(b.dataset.i, 10));
  });
  btnPrev.addEventListener('click', function () { goTo(currentSlide - 1); });
  btnNext.addEventListener('click', function () { goTo(currentSlide + 1); });

  mGallery.addEventListener('mousedown', function (e) { isDown = true; mGallery.classList.add('grabbing'); startX = e.pageX; scrollStart = mGallery.scrollLeft; });
  ['mouseleave', 'mouseup'].forEach(function (ev) {
    mGallery.addEventListener(ev, function () {
      if (!isDown) return;
      isDown = false;
      mGallery.classList.remove('grabbing');
      goTo(Math.round(mGallery.scrollLeft / mGallery.offsetWidth));
    });
  });
  mGallery.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    mGallery.scrollLeft = scrollStart - (e.pageX - startX);
  });

  var scrollTimer;
  mGallery.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var idx = Math.round(mGallery.scrollLeft / mGallery.offsetWidth);
      if (idx !== currentSlide) { currentSlide = idx; syncUI(); }
    }, 80);
  });

  document.querySelectorAll('.tl-item[data-exp]').forEach(function (item) {
    var card = item.querySelector('.tl-card');
    card.addEventListener('click', function () { openExpModal(item.dataset.exp); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openExpModal(item.dataset.exp); }
    });
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goTo(currentSlide - 1);
    if (e.key === 'ArrowRight') goTo(currentSlide + 1);
  });

  /* ---------- CONTACT (assembled to reduce scraping) ---------- */
  var emailCard = document.getElementById('cc-email');
  if (emailCard) {
    var addr = emailCard.dataset.user + '@' + emailCard.dataset.domain;
    emailCard.href = 'mailto:' + addr;
    emailCard.querySelector('.cc-value').textContent = addr;
  }
  var phoneCard = document.getElementById('cc-phone');
  if (phoneCard) {
    phoneCard.href = 'tel:' + phoneCard.dataset.p1 + phoneCard.dataset.p2 + phoneCard.dataset.p3;
    phoneCard.querySelector('.cc-value').textContent = phoneCard.dataset.display;
  }

  /* ---------- FOOTER YEAR ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
