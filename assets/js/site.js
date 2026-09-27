/* The John Marshall Barber Shop — site behaviour (vanilla, no dependencies) */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = reduceMQ.matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.nav-toggle__text').textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 960) setNav(false);
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-current-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Highlight today's hours (Richmond time) ---------- */
  try {
    var day = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'America/New_York' }).format(new Date());
    document.querySelectorAll('[data-day="' + day + '"]').forEach(function (row) { row.classList.add('is-today'); });
  } catch (err) { /* older browsers: no highlight */ }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal], .draw');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Year rollers (build digit strips) ---------- */
  var rollers = [];
  document.querySelectorAll('[data-roller]').forEach(function (el) {
    var from = parseInt(el.getAttribute('data-from'), 10);
    var to = parseInt(el.getAttribute('data-to'), 10);
    var digits = String(from).split('');
    el.innerHTML = '';
    var strips = digits.map(function () {
      var d = document.createElement('span');
      d.className = 'roller__digit';
      var s = document.createElement('span');
      s.className = 'roller__strip';
      for (var i = 0; i < 10; i++) {
        var n = document.createElement('span');
        n.textContent = i;
        s.appendChild(n);
      }
      d.appendChild(s);
      el.appendChild(d);
      return s;
    });
    var scope = document.querySelector(el.getAttribute('data-scope')) || el;
    rollers.push({ el: el, from: from, to: to, strips: strips, scope: scope, last: null });
  });
  function setRoller(r, year) {
    if (year === r.last) return;
    r.last = year;
    String(year).split('').forEach(function (ch, i) {
      if (r.strips[i]) r.strips[i].style.transform = 'translateY(' + (-parseInt(ch, 10)) + 'em)';
    });
  }
  rollers.forEach(function (r) { setRoller(r, reduced ? r.to : r.from); });

  /* ---------- Scroll-linked effects ---------- */
  var bar = document.querySelector('.pole-progress__bar');
  var bursts = Array.prototype.slice.call(document.querySelectorAll('.sunburst'));
  var floor = document.querySelector('.floor__plane');
  var timelines = Array.prototype.slice.call(document.querySelectorAll('[data-timeline]')).map(function (tl) {
    return { el: tl, fill: tl.querySelector('.timeline__fill'), events: tl.querySelectorAll('.tl-event') };
  });

  function progressThrough(el, startFrac, endFrac) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * startFrac;
    var total = rect.height + vh * (startFrac - endFrac);
    var p = (start - rect.top) / (total || 1);
    return Math.max(0, Math.min(1, p));
  }

  var ticking = false;
  function update() {
    ticking = false;
    var y = window.pageYOffset || doc.scrollTop;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var p = Math.min(1, y / max);

    if (bar) {
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      bar.style.backgroundPosition = (y * 0.35).toFixed(1) + 'px 0';
    }
    if (reduced) return;

    bursts.forEach(function (b) {
      var rect = b.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      var local = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      var deg = (local - 0.5) * 14;
      b.style.transform = 'rotate(' + deg.toFixed(2) + 'deg)';
    });

    if (floor) {
      floor.style.backgroundPosition = '0 ' + (y * 0.6).toFixed(1) + 'px';
    }

    rollers.forEach(function (r) {
      var marks = r.scope.querySelectorAll('[data-year]');
      if (marks.length > 1) {
        /* Tie the counter to the timeline: interpolate between the event years
           around a reading line 60% down the viewport. */
        var line = window.innerHeight * 0.6;
        var year = parseInt(marks[0].getAttribute('data-year'), 10);
        for (var i = 0; i < marks.length; i++) {
          var top = marks[i].getBoundingClientRect().top;
          if (top > line) {
            if (i > 0) {
              var prevTop = marks[i - 1].getBoundingClientRect().top;
              var y0 = parseInt(marks[i - 1].getAttribute('data-year'), 10);
              var y1 = parseInt(marks[i].getAttribute('data-year'), 10);
              var f = Math.max(0, Math.min(1, (line - prevTop) / ((top - prevTop) || 1)));
              year = y0 + (y1 - y0) * f;
            }
            break;
          }
          year = parseInt(marks[i].getAttribute('data-year'), 10);
        }
        setRoller(r, Math.round(year));
      } else {
        var rp = progressThrough(r.scope, 0.7, 0.4);
        setRoller(r, Math.round(r.from + (r.to - r.from) * rp));
      }
    });

    timelines.forEach(function (t) {
      var tp = progressThrough(t.el, 0.6, 0.6);
      if (t.fill) t.fill.style.transform = 'scaleY(' + tp.toFixed(4) + ')';
      var line = window.innerHeight * 0.6;
      t.events.forEach(function (ev) {
        ev.classList.toggle('is-lit', ev.getBoundingClientRect().top < line);
      });
    });
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if (reduced) {
    timelines.forEach(function (t) { t.events.forEach(function (ev) { ev.classList.add('is-lit'); }); });
  }
  reduceMQ.addEventListener && reduceMQ.addEventListener('change', function (e) { reduced = e.matches; onScroll(); });
  update();
})();
