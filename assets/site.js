/* EDS WoodWorx site script. No dependencies.
   Every feature has a no-JavaScript fallback: the menu links also live in the footer,
   the first product option is pre-selected, and forms still submit. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function announce(msg) {
    var live = $('#LiveRegion');
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 50);
  }

  /* ---------- Mobile menu ---------- */
  $$('[data-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        btn.focus();
      }
    });
  });

  /* ---------- Collection sorting ---------- */
  var sort = $('[data-sort]');
  var grid = $('[data-product-grid]');
  if (sort && grid) {
    var original = $$('li', grid);
    sort.addEventListener('change', function () {
      var items = original.slice();
      var num = function (el, k) { var v = parseFloat(el.dataset[k]); return isNaN(v) ? Infinity : v; };
      if (sort.value === 'newest') items.sort(function (a, b) { return (b.dataset.added || '').localeCompare(a.dataset.added || ''); });
      else if (sort.value === 'price-asc') items.sort(function (a, b) { return num(a, 'price') - num(b, 'price'); });
      else if (sort.value === 'price-desc') items.sort(function (a, b) { return (num(b, 'price') === Infinity ? -1 : num(b, 'price')) - (num(a, 'price') === Infinity ? -1 : num(a, 'price')); });
      else items.sort(function (a, b) { return num(a, 'featured') - num(b, 'featured'); });
      items.forEach(function (li) { grid.appendChild(li); });
      announce('Sorted by ' + sort.options[sort.selectedIndex].text);
    });
  }

  /* ---------- Product gallery and zoom ---------- */
  var gallery = $('[data-gallery]');
  if (gallery) {
    var mainImg = $('[data-gallery-main] img', gallery);
    var thumbs = $$('.gallery__thumb', gallery);
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        if (!mainImg) return;
        mainImg.src = t.dataset.src;
        mainImg.alt = t.dataset.alt;
        mainImg.removeAttribute('width');
        mainImg.removeAttribute('height');
        thumbs.forEach(function (o) { o.setAttribute('aria-current', o === t ? 'true' : 'false'); });
        announce('Showing image ' + (i + 1) + ' of ' + thumbs.length);
      });
    });
    var zoomBtn = $('[data-zoom]', gallery);
    var dialog = $('dialog', gallery);
    if (zoomBtn && dialog && typeof dialog.showModal === 'function') {
      zoomBtn.addEventListener('click', function () {
        var big = $('img', dialog);
        big.src = mainImg.src;
        big.alt = mainImg.alt;
        dialog.showModal();
      });
      $('[data-zoom-close]', dialog).addEventListener('click', function () { dialog.close(); });
      dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
      dialog.addEventListener('close', function () { zoomBtn.focus(); });
    } else if (zoomBtn) {
      zoomBtn.hidden = true;
    }
  }

  /* ---------- Product options -> price and Stripe link ---------- */
  var product = $('[data-product]');
  var variantData = product && $('[data-variants]', product);
  if (variantData) {
    var variants = JSON.parse(variantData.textContent);
    var priceEl = $('[data-price]', product);
    var wrap = $('[data-buy-wrap]', product);
    var err = $('[data-variant-error]', product);
    var groups = {};
    $$('[data-option]', product).forEach(function (r) { groups[r.dataset.option] = true; });
    var count = Object.keys(groups).length;

    var update = function () {
      var chosen = [];
      for (var i = 0; i < count; i++) {
        var c = $('[data-option="' + i + '"]:checked', product);
        chosen.push(c ? c.value : null);
      }
      var v = variants.find(function (x) { return x.options.every(function (o, i) { return o === chosen[i]; }); });
      if (!v) {
        err.hidden = false;
        wrap.innerHTML = '<span class="button button--large button--full" aria-disabled="true">Not available in this combination</span>';
        announce('This combination is not offered');
        return;
      }
      err.hidden = true;
      priceEl.textContent = v.price;
      wrap.innerHTML = v.link
        ? '<a class="button button--large button--full" href="' + v.link.replace(/"/g, '&quot;') + '">Buy now</a>'
        : '<span class="button button--large button--full" aria-disabled="true">Ordering opens soon</span>';
      announce(chosen.join(', ') + '. ' + v.price + (v.link ? '' : '. Ordering opens soon'));
    };
    $$('[data-option]', product).forEach(function (r) { r.addEventListener('change', update); });
  }

  /* ---------- Forms: validation, success message, email fallback ---------- */
  if (/[?&]sent=1/.test(location.search)) {
    var ok = $('[data-form-success]');
    if (ok) {
      ok.hidden = false;
      ok.innerHTML = '<p><strong>Message sent.</strong> Thank you. Ed will reply by email.</p>';
      ok.focus();
    }
  }

  $$('form[data-validate]').forEach(function (form) {
    var summary = $('[data-error-summary]', form);
    var labelFor = function (el) {
      var l = form.querySelector('label[for="' + el.id + '"]');
      return l ? l.textContent.replace('*', '').trim() : 'This field';
    };
    var message = function (el) {
      if (el.validity.valueMissing) return el.tagName === 'SELECT' ? 'Choose ' + labelFor(el).toLowerCase() + '.' : 'Enter ' + labelFor(el).toLowerCase() + '.';
      if (el.validity.typeMismatch && el.type === 'email') return 'Enter an email address like name@example.com.';
      return 'Check ' + labelFor(el).toLowerCase() + '.';
    };
    var check = function (el) {
      var box = document.getElementById(el.id + '-error');
      if (el.checkValidity()) {
        el.removeAttribute('aria-invalid');
        if (box) box.hidden = true;
        return null;
      }
      el.setAttribute('aria-invalid', 'true');
      var msg = message(el);
      if (box) { box.hidden = false; box.querySelector('span').textContent = msg; el.setAttribute('aria-describedby', box.id); }
      return { el: el, msg: msg };
    };
    $$('input, select, textarea', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.hasAttribute('aria-invalid')) check(el); });
    });

    form.addEventListener('submit', function (e) {
      var problems = $$('[required], [type="email"]', form).map(check).filter(Boolean);
      if (problems.length) {
        e.preventDefault();
        summary.hidden = false;
        summary.innerHTML = '<p><strong>Please fix ' + problems.length + (problems.length === 1 ? ' item' : ' items') + ':</strong></p><ul>' +
          problems.map(function (p) { return '<li><a href="#' + p.el.id + '">' + p.msg + '</a></li>'; }).join('') + '</ul>';
        summary.focus();
        return;
      }
      // No form service set up yet: open the visitor's email app with the message filled in.
      if (form.hasAttribute('data-mailto')) {
        e.preventDefault();
        var to = form.getAttribute('data-mailto');
        if (!to) {
          summary.hidden = false;
          summary.innerHTML = '<p>The contact form isn’t connected yet. Please check back soon.</p>';
          summary.focus();
          return;
        }
        var lines = $$('input:not([type=hidden]), select, textarea', form).filter(function (el) { return el.value; })
          .map(function (el) { return labelFor(el) + ': ' + el.value; });
        var subj = (form.querySelector('[name=_subject]') || {}).value || 'Message from edswoodworx.com';
        location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(lines.join('\n\n'));
      }
    });
  });

  /* ---------- Site search ---------- */
  var sForm = $('[data-search-form]');
  if (sForm) {
    var input = $('input', sForm);
    var status = $('[data-search-status]');
    var results = $('[data-search-results]');
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var run = function (index, q) {
      var words = q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!words.length) { status.textContent = ''; results.innerHTML = ''; return; }
      var hits = index.map(function (p) {
        var hay = (p.title + ' ' + p.description + ' ' + p.text).toLowerCase();
        var score = words.reduce(function (s, w) { return s + (hay.indexOf(w) > -1 ? 1 : 0) + (p.title.toLowerCase().indexOf(w) > -1 ? 2 : 0); }, 0);
        var all = words.every(function (w) { return hay.indexOf(w) > -1; });
        return { p: p, score: all ? score : 0 };
      }).filter(function (h) { return h.score > 0; }).sort(function (a, b) { return b.score - a.score; });
      status.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + q + '”';
      results.innerHTML = hits.length
        ? '<ul class="search-results">' + hits.map(function (h) {
            return '<li><a href="' + h.p.url + '">' + esc(h.p.title) + '</a><span class="search-results__kind">' + (h.p.kind === 'product' ? 'Product' : 'Page') + '</span><p>' + esc(h.p.description) + '</p></li>';
          }).join('') + '</ul>'
        : '<p>Try a simpler word like “pen”, “bowl”, or “board”, or <a href="/shop/">browse everything</a>. Can’t find what you need? <a href="/contact/">Ask Ed</a>.</p>';
    };
    fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (index) {
      var q = new URLSearchParams(location.search).get('q') || '';
      input.value = q;
      run(index, q);
      sForm.addEventListener('submit', function (e) {
        e.preventDefault();
        history.replaceState(null, '', '?q=' + encodeURIComponent(input.value));
        run(index, input.value.trim());
      });
    });
  }
})();
