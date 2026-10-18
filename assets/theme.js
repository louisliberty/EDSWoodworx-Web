/* EDS WoodWorx — theme.js
   Small, dependency-free enhancements. Every feature has a no-JS fallback:
   forms still submit, the menu is reachable from the footer, and the
   product form posts a standard variant <select>. */
(function () {
  'use strict';

  const announce = (msg) => {
    const live = document.getElementById('LiveRegion');
    if (!live) return;
    live.textContent = '';
    setTimeout(() => { live.textContent = msg; }, 50);
  };

  /* ---------- Disclosure toggles (mobile menu, search) ---------- */
  document.querySelectorAll('[data-toggle]').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    const close = (returnFocus) => {
      btn.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      if (returnFocus) btn.focus();
    };
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      // close any other open panel first
      document.querySelectorAll('[data-toggle][aria-expanded="true"]').forEach((other) => {
        if (other !== btn) other.click();
      });
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (!open) {
        const first = panel.querySelector('input, a, button');
        if (first) first.focus();
      }
    });
    panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });
  });

  /* ---------- Quantity steppers ---------- */
  document.querySelectorAll('[data-qty]').forEach((wrap) => {
    const input = wrap.querySelector('input');
    wrap.querySelectorAll('button[data-step]').forEach((b) => {
      b.addEventListener('click', () => {
        const min = parseInt(input.min || '1', 10);
        const next = Math.max(min, (parseInt(input.value, 10) || min) + parseInt(b.dataset.step, 10));
        input.value = next;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        announce('Quantity ' + next);
      });
    });
  });

  /* ---------- Sort select: navigate on change (button fallback stays for no-JS) ---------- */
  document.querySelectorAll('[data-sort-form]').forEach((form) => {
    const select = form.querySelector('select');
    const submit = form.querySelector('[type="submit"]');
    if (submit) submit.classList.add('visually-hidden');
    select.addEventListener('change', () => form.submit());
  });

  /* ---------- Product gallery + zoom ---------- */
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = gallery.querySelectorAll('.gallery__slide');
    const thumbs = gallery.querySelectorAll('.gallery__thumb');
    const zoomBtn = gallery.querySelector('[data-zoom-open]');
    const dialog = gallery.querySelector('dialog');

    const show = (id) => {
      slides.forEach((s) => { s.hidden = s.dataset.mediaId !== String(id); });
      thumbs.forEach((t) => t.setAttribute('aria-current', t.dataset.mediaId === String(id) ? 'true' : 'false'));
    };
    gallery.showMedia = show;
    thumbs.forEach((t, i) => {
      t.addEventListener('click', () => {
        show(t.dataset.mediaId);
        announce('Showing image ' + (i + 1) + ' of ' + thumbs.length);
      });
    });

    if (zoomBtn && dialog && typeof dialog.showModal === 'function') {
      const img = dialog.querySelector('img');
      zoomBtn.addEventListener('click', () => {
        const slide = gallery.querySelector('.gallery__slide:not([hidden])');
        const current = slide && slide.querySelector('img');
        if (!current) return;
        img.src = slide.dataset.zoomSrc || current.currentSrc || current.src;
        img.alt = current.alt;
        dialog.showModal();
      });
      dialog.querySelector('[data-zoom-close]').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
      dialog.addEventListener('close', () => zoomBtn.focus());
    } else if (zoomBtn) {
      zoomBtn.hidden = true;
    }
  });

  /* ---------- Variant picker ---------- */
  document.querySelectorAll('[data-product-form]').forEach((form) => {
    const dataEl = form.querySelector('[data-product-json]');
    if (!dataEl) return;
    const product = JSON.parse(dataEl.textContent);
    const idInput = form.querySelector('[data-variant-id]');
    const fallback = form.querySelector('[data-variant-fallback]');
    const groups = form.querySelectorAll('[data-option-index]');
    const priceEl = document.querySelector('[data-product-price]');
    const addBtn = form.querySelector('[data-add-button]');
    const gallery = document.querySelector('[data-gallery]');

    // JS is running: swap the fallback <select> for the radio chips
    if (fallback) { fallback.closest('.field').hidden = true; fallback.disabled = true; }
    if (idInput) idInput.disabled = false;
    groups.forEach((g) => { g.hidden = false; });

    const selected = () => Array.from(groups).map((g) => {
      const c = g.querySelector('input:checked');
      return c ? c.value : null;
    });

    const update = () => {
      const opts = selected();
      const variant = product.variants.find((v) => v.options.every((o, i) => o === opts[i]));
      if (!variant) {
        addBtn.disabled = true;
        addBtn.textContent = 'This combination isn\'t offered';
        announce('This combination is not offered');
        return;
      }
      idInput.value = variant.id;
      if (priceEl) priceEl.textContent = variant.price_formatted;
      addBtn.disabled = !variant.available;
      addBtn.textContent = variant.available ? 'Add to cart' : 'Not available right now';
      if (variant.media_id && gallery && gallery.showMedia) gallery.showMedia(variant.media_id);
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
      announce(opts.join(', ') + '. ' + variant.price_formatted + (variant.available ? '' : '. Not available right now'));
    };
    groups.forEach((g) => g.addEventListener('change', update));

    /* Engraving: live count + preview */
    form.querySelectorAll('[data-engraving]').forEach((input) => {
      const count = form.querySelector('[data-engraving-count]');
      const preview = form.querySelector('[data-engraving-preview]');
      const max = parseInt(input.getAttribute('maxlength'), 10);
      const sync = () => {
        const left = max - input.value.length;
        if (count) count.textContent = left + ' of ' + max + ' characters left';
        if (preview) preview.textContent = input.value || preview.dataset.empty;
      };
      input.addEventListener('input', sync);
      sync();
    });

    /* Optional add-on (gift box, care kit): add both items, then go to cart */
    form.addEventListener('submit', async (e) => {
      const addon = form.querySelector('[data-addon]:checked');
      if (!addon) return; // normal form post
      e.preventDefault();
      addBtn.disabled = true;
      addBtn.textContent = 'Adding…';
      try {
        const main = await fetch('/cart/add.js', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!main.ok) throw new Error((await main.json()).description || 'Could not add to cart');
        await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items: [{ id: parseInt(addon.value, 10), quantity: 1 }] })
        });
        window.location.href = '/cart';
      } catch (err) {
        addBtn.disabled = false;
        addBtn.textContent = 'Add to cart';
        const status = form.querySelector('[data-form-error]');
        if (status) { status.hidden = false; status.textContent = err.message + '. Please try again.'; status.focus(); }
      }
    });
  });

  /* ---------- Accessible form validation ---------- */
  document.querySelectorAll('form[data-validate]').forEach((form) => {
    form.setAttribute('novalidate', '');
    const summary = form.querySelector('[data-error-summary]');

    const messageFor = (el) => {
      const label = (form.querySelector('label[for="' + el.id + '"]') || {}).textContent || 'This field';
      const name = label.replace('*', '').replace('(required)', '').trim();
      if (el.validity.valueMissing) return 'Enter ' + name.toLowerCase() + '.';
      if (el.validity.typeMismatch && el.type === 'email') return 'Enter an email address like name@example.com.';
      if (el.validity.tooLong) return name + ' is too long.';
      return 'Check ' + name.toLowerCase() + '.';
    };

    const check = (el) => {
      const err = document.getElementById(el.id + '-error');
      if (el.checkValidity()) {
        el.removeAttribute('aria-invalid');
        if (err) err.hidden = true;
        return null;
      }
      el.setAttribute('aria-invalid', 'true');
      const msg = messageFor(el);
      if (err) { err.hidden = false; err.querySelector('span').textContent = msg; }
      return { el, msg };
    };

    form.querySelectorAll('input, select, textarea').forEach((el) => {
      el.addEventListener('blur', () => { if (el.hasAttribute('aria-invalid')) check(el); });
    });

    form.addEventListener('submit', (e) => {
      const problems = Array.from(form.querySelectorAll('[required], [type="email"]')).map(check).filter(Boolean);
      if (!problems.length) return;
      e.preventDefault();
      if (summary) {
        summary.hidden = false;
        summary.innerHTML = '<p><strong>Please fix ' + problems.length + (problems.length === 1 ? ' item' : ' items') + ':</strong></p><ul>' +
          problems.map((p) => '<li><a href="#' + p.el.id + '">' + p.msg + '</a></li>').join('') + '</ul>';
        summary.focus();
      } else {
        problems[0].el.focus();
      }
    });
  });
})();
