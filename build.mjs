// EDS WoodWorx static site builder.
// Usage: node build.mjs            -> writes the finished site to dist/
// No dependencies. Reads data/*.json and src/pages/*.html, writes plain HTML.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, 'dist');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJSON = (p) => JSON.parse(read(p));

const site = readJSON('data/site.json');
const catalog = readJSON('data/products.json');
const faq = readJSON('data/faq.json');
const categories = catalog.categories;
const products = catalog.products.filter((p) => p.active !== false);
const warnings = [];

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isPlaceholder = (s) => /\[[^\]]+\]/.test(String(s || ''));
const realEmail = () => site.email && !isPlaceholder(site.email);
const money = (n) => (typeof n === 'number' ? `$${n.toFixed(2).replace(/\.00$/, '')}` : '$[PRICE]');
const catOf = (p) => categories.find((c) => c.handle === p.category) || { title: '', handle: '' };
const productUrl = (p) => `/products/${p.handle}/`;
const categoryUrl = (c) => `/${c.handle}/`;
const leadFor = (p) => (p && p.lead_time) || site.lead_time_standard;
const hasCustomWork = (p) => (p.checkout_extras || []).some((x) => /engrav|personal/i.test(x));

function priceLabel(p) {
  const prices = p.variants.map((v) => v.price).filter((x) => typeof x === 'number');
  if (!prices.length) return '$[PRICE]';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? money(min) : `From ${money(min)}`;
}

// Image size reader (JPEG, PNG, WebP) so every <img> gets width/height and pages don't jump while loading.
function imageSize(file) {
  try {
    const b = fs.readFileSync(path.join(ROOT, file.replace(/^\//, '')));
    if (b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const t = b.toString('ascii', 12, 16);
      if (t === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
      if (t === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
      if (t === 'VP8L') { const n = b.readUInt32LE(21); return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  } catch { warnings.push(`Image not found: ${file}`); }
  return null;
}

function img(src, alt, { ratio = 'square', eager = false, sizes = '100vw', decorative = false } = {}) {
  const dim = imageSize(src);
  const wh = dim ? ` width="${dim.w}" height="${dim.h}"` : '';
  const load = eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"';
  if (!decorative && !alt) warnings.push(`Missing alt text: ${src}`);
  return `<div class="media media--${ratio}"><img src="${esc(src)}" alt="${decorative ? '' : esc(alt)}"${wh}${load} decoding="async"></div>`;
}
const placeholder = (label, ratio = 'square') =>
  `<div class="media media--${ratio} placeholder" role="img" aria-label="Photo coming soon: ${esc(label)}"><span>Photo: ${esc(label)}</span></div>`;

// ---------------------------------------------------------------- icons
const ICON = {
  ring: '<svg class="ring-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="22" stroke-width="2.4"/><ellipse cx="22.4" cy="25.4" rx="15.6" ry="14.8" stroke-width="1.6"/><ellipse cx="21.4" cy="26.2" rx="10.6" ry="10" stroke-width="1.6"/><ellipse cx="20.6" cy="26.8" rx="5.8" ry="5.4" stroke-width="1.6"/><circle cx="20.2" cy="27.1" r="1.5" fill="currentColor" stroke="none"/><path d="M22.2 25.1 33.8 13.6" stroke-width="1.6" stroke-linecap="round"/></svg>',
  ringSmall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><ellipse cx="11.2" cy="12.8" rx="6.2" ry="5.8"/><circle cx="10.6" cy="13.3" r="1.6" fill="currentColor" stroke="none"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2.5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.5v.01"/></svg>',
  alert: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17v.01"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M3.5 7h17M3.5 12h17M3.5 17h17"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M10.5 7.5v6M7.5 10.5h6"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6.5 7S5 18.5 4 16l-1-3a1.5 1.5 0 0 1 2.7-1.3L8 14"/></svg>',
  grain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M3 5c4 0 6 3 9 3s5-3 9-3M3 12c4 0 6 3 9 3s5-3 9-3M3 19c4 0 6-2 9-2s5 2 9 2"/></svg>',
  bowl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M2.5 10h19c-.6 5-4.6 8.5-9.5 8.5S3.1 15 2.5 10zM9 18.5V20h6v-1.5"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3.5 8.5h17v4h-17zM5 12.5h14V21H5zM12 8.5V21"/><path d="M12 8.5C10 4 6.5 4.5 7 7c.3 1.4 3 1.5 5 1.5zM12 8.5c2-4.5 5.5-4 5-1.5-.3 1.4-3 1.5-5 1.5z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.5"/><path d="M10.5 20l1.6-7m-.8-1.5c-.4-2.5 1.2-4 3-4s2.8 1.3 2.5 3.2c-.4 2.3-2.2 3.6-3.6 3.1"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>',
};

// ---------------------------------------------------------------- components
function mtoBadge(p) {
  if (p && p.ready_to_ship) return `<span class="mto-badge mto-badge--ready">${ICON.check}Ready to ship</span>`;
  return `<span class="mto-badge">${ICON.ringSmall}Made to order</span>`;
}

function leadTimeBox(p, { context = 'product' } = {}) {
  if (p && p.ready_to_ship) {
    return `<div class="lead-time">${ICON.check}<div><p><strong>Ready to ship.</strong> This piece is finished and ships once your order is packed.</p><p>${esc(site.shipping_note)}</p></div></div>`;
  }
  const custom = p && hasCustomWork(p) ? `<p>With engraving or personalization, allow ${esc(site.lead_time_custom)}.</p>` : '';
  const lead = context === 'general' ? site.lead_time_standard : leadFor(p);
  return `<div class="lead-time">${ICON.clock}<div><p><strong>Made to order.</strong> This piece is made after you order it. Please allow approximately ${esc(lead)} for crafting before shipment.</p>${custom}<p>${esc(site.shipping_note)}</p></div></div>`;
}

const availability = () =>
  site.availability_enabled ? `<p class="availability-note">${ICON.ringSmall}<span>${esc(site.availability_text)}</span></p>` : '';

function productCard(p) {
  const c = catOf(p);
  const media = p.images && p.images.length
    ? img(p.images[0].src, p.images[0].alt, { sizes: '(min-width: 990px) 33vw, (min-width: 481px) 50vw, 100vw' })
    : placeholder(p.title);
  const prices = p.variants.map((v) => v.price).filter((x) => typeof x === 'number');
  return `<li data-price="${prices.length ? Math.min(...prices) : ''}" data-added="${esc(p.added || '')}" data-featured="${p.featured || 999}">
  <article class="card">${media}
    <p class="card__category">${esc(c.title)}</p>
    <h3 class="card__title"><a href="${productUrl(p)}">${esc(p.title)}</a></h3>
    <div class="card__meta"><span class="price">${esc(priceLabel(p))}</span>${mtoBadge(p)}</div>
  </article></li>`;
}
const productGrid = (list, extra = '') =>
  list.length
    ? `<ul class="product-grid${extra}" role="list" data-product-grid>${list.map(productCard).join('\n')}</ul>`
    : `<div class="empty-state"><h2>New pieces are on the bench.</h2><p>Nothing is listed here yet. Browse everything in the shop, or ask Ed about a custom piece.</p><div class="button-row"><a class="button" href="/shop/">Shop all pieces</a><a class="button button--secondary" href="/contact/">Contact Ed</a></div></div>`;

const byFeatured = (a, b) => (a.featured || 999) - (b.featured || 999);

function categoryTiles() {
  return `<ul class="grid grid--3" role="list">${categories.map((c) => `<li><a class="category-tile" href="${categoryUrl(c)}">
    ${c.image ? img(c.image, '', { ratio: 'portrait', decorative: true, sizes: '(min-width: 750px) 33vw, 100vw' }) : placeholder(c.placeholder || c.title, 'portrait')}
    <h3>${esc(c.title)}</h3><p>${esc(c.tile_text)}</p><span class="category-tile__cta">Shop ${esc(c.title.toLowerCase())}</span></a></li>`).join('')}</ul>`;
}

function steps(kind) {
  const sets = {
    home: [
      ['You choose your piece', 'Pick a pen, bowl, or board, plus any options like size, wood, or engraving.'],
      ['Ed makes it in the workshop', 'Your piece is shaped, sanded, finished, and checked by hand after you order.'],
      ['It ships to your door', "Ed packs it carefully and sends it on its way. You'll get tracking by email."],
    ],
    page: [
      ['Choose', "Pick your piece and any options. You'll get a payment receipt by email right away."],
      ['Crafted', 'Ed makes your piece in the workshop. Engraved or personalized pieces take a little longer.'],
      ['Shipped', "Ed packs it carefully and ships it. You'll get an email with tracking when it leaves the shop."],
    ],
  };
  return `<ol class="steps">${sets[kind].map(([t, d]) => `<li class="step"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>`;
}

function faqBlock() {
  const groups = faq.groups.map((g) => `<h2 class="faq-group__title">${esc(g.title)}</h2>
  ${g.questions.map((q) => `<details><summary>${esc(q.q)}</summary><div class="accordion__content rte">${tokens(q.a)}</div></details>`).join('\n')}`);
  return `<div class="accordion accordion--faq">${groups.join('\n')}</div>`;
}
function faqSchema() {
  const qs = faq.groups.flatMap((g) => g.questions);
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: qs.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: tokens(q.a).replace(/<[^>]+>/g, '').trim() } })),
  };
}

function fieldError(id) {
  return `<p class="field__error" id="${id}-error" hidden>${ICON.alert}<span></span></p>`;
}
function formOpen(id, endpoint, subject) {
  const hidden = Object.entries(site.form_hidden_fields || {}).map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`).join('');
  const action = endpoint ? ` action="${esc(endpoint)}" method="POST"` : ` action="#" method="POST" data-mailto="${realEmail() ? esc(site.email) : ''}"`;
  return `<form id="${id}" class="form-narrow" data-validate novalidate${action}>${hidden}<input type="hidden" name="_subject" value="${esc(subject)}">
  <div class="form-status form-status--success" data-form-success tabindex="-1" role="status" hidden></div>
  <div class="form-status form-status--error" data-error-summary tabindex="-1" role="alert" hidden></div>
  <p class="field__hint">Fields marked <span class="required" aria-hidden="true">*</span><span class="visually-hidden">with an asterisk</span> are required.</p>`;
}
const req = '<span class="required" aria-hidden="true">*</span>';

function contactForm() {
  const id = 'ContactForm';
  return `${formOpen(id, site.contact_form_endpoint, 'New message from edswoodworx.com')}
  <div class="field"><label for="${id}-name">Name ${req}</label><input type="text" id="${id}-name" name="name" autocomplete="name" required>${fieldError(`${id}-name`)}</div>
  <div class="field"><label for="${id}-email">Email ${req}</label><input type="email" id="${id}-email" name="email" autocomplete="email" required>${fieldError(`${id}-email`)}</div>
  <div class="field"><label for="${id}-order">Order or receipt number (optional)</label><span class="field__hint" id="${id}-order-hint">Found in your Stripe receipt email.</span><input type="text" id="${id}-order" name="order_number" aria-describedby="${id}-order-hint"></div>
  <div class="field"><label for="${id}-topic">Topic ${req}</label><select id="${id}-topic" name="topic" required>
    <option value="">Choose a topic</option><option>Product question</option><option>Custom request</option><option>Existing order</option><option>Wholesale or gifting inquiry</option><option>Website issue</option><option>Accessibility or accommodation request</option><option>Other</option></select>${fieldError(`${id}-topic`)}</div>
  <div class="field"><label for="${id}-message">Message ${req}</label><textarea id="${id}-message" name="message" rows="6" required></textarea>${fieldError(`${id}-message`)}</div>
  <button type="submit" class="button button--large">Send message</button></form>`;
}

function customRequestForm() {
  if (!site.custom_requests_enabled) {
    return `<div class="lead-time">${ICON.info}<div><p><strong>Custom requests are paused right now.</strong> Ed is focused on current orders. You can still <a href="/contact/">send a question</a> or browse <a href="/shop/">made-to-order pieces</a>.</p></div></div>`;
  }
  const id = 'CustomForm';
  const types = ['Pen', 'Bowl', 'Cutting board', 'Serving board', 'Something else'];
  const budgets = (site.custom_budget_ranges || ['Under $[A]', '$[A]–$[B]', '$[B]–$[C]', 'Over $[C]']).concat('Not sure yet');
  return `<div class="rte"><p>Ed takes on a small number of custom pieces when the workshop schedule allows. Not every request is a fit, and availability is limited. Tell him what you have in mind, and he'll reply with honest thoughts, rough timing, and a price before anything starts.</p></div>
  ${formOpen(id, site.contact_form_endpoint, 'Custom request from edswoodworx.com')}<input type="hidden" name="topic" value="Custom request">
  <div class="field"><label for="${id}-name">Name ${req}</label><input type="text" id="${id}-name" name="name" autocomplete="name" required>${fieldError(`${id}-name`)}</div>
  <div class="field"><label for="${id}-email">Email ${req}</label><input type="email" id="${id}-email" name="email" autocomplete="email" required>${fieldError(`${id}-email`)}</div>
  <div class="field"><label for="${id}-type">Project type ${req}</label><select id="${id}-type" name="project_type" required><option value="">Choose one</option>${types.map((t) => `<option>${t}</option>`).join('')}</select>${fieldError(`${id}-type`)}</div>
  <div class="field"><label for="${id}-use">How will it be used? ${req}</label><span class="field__hint">For example: a retirement gift, everyday kitchen use, a wedding table.</span><textarea id="${id}-use" name="intended_use" rows="3" required></textarea>${fieldError(`${id}-use`)}</div>
  <div class="field"><label for="${id}-size">Preferred size (optional)</label><span class="field__hint">Approximate is fine, for example 12 × 18 inches.</span><input type="text" id="${id}-size" name="preferred_size"></div>
  <div class="field"><label for="${id}-wood">Preferred wood (optional)</label><span class="field__hint">Not sure? Leave blank and Ed will suggest options.</span><input type="text" id="${id}-wood" name="preferred_wood"></div>
  <div class="field"><label for="${id}-budget">Budget range ${req}</label><select id="${id}-budget" name="budget" required><option value="">Choose one</option>${budgets.map((b) => `<option>${esc(b)}</option>`).join('')}</select>${fieldError(`${id}-budget`)}</div>
  <div class="field"><label for="${id}-date">Date you'd like it by (optional)</label><span class="field__hint">Custom work takes about ${esc(site.lead_time_custom)} plus shipping. Ed will tell you if your date is realistic.</span><input type="date" id="${id}-date" name="desired_date"></div>
  <div class="field"><label for="${id}-notes">Personalization or other details (optional)</label><textarea id="${id}-notes" name="message" rows="4"></textarea></div>
  <div class="field"><p class="field__label">Reference photos</p><p class="field__hint">Have a sketch or a photo of something you like? After you send this form, reply to Ed's email and attach it.</p></div>
  <p>Sending this form is a request, not an order. Ed will review it and reply before any work begins or any payment is taken.</p>
  <button type="submit" class="button button--large">Send request</button></form>`;
}

function newsletter() {
  if (!site.newsletter_form_endpoint) return '';
  return `<section class="section section--tight section--parchment" aria-labelledby="NewsHead"><div class="page-width">
  <div class="section__head"><h2 id="NewsHead">Notes from the workshop</h2><p>Get workshop updates, new releases, and occasional notes from EDS WoodWorx.</p></div>
  <form class="newsletter__form" action="${esc(site.newsletter_form_endpoint)}" method="POST"><div class="field"><label for="NewsEmail">Email address</label><input type="email" id="NewsEmail" name="email" autocomplete="email" required></div><button class="button" type="submit">Sign up</button></form>
  <p class="newsletter__fine">Unsubscribe anytime. We don't share your email. <a href="/privacy/">Privacy Policy</a>.</p></div></section>`;
}

const COMPONENTS = {
  mto_badge: () => mtoBadge(),
  lead_time: () => leadTimeBox(null, { context: 'general' }),
  availability,
  steps,
  category_tiles: categoryTiles,
  featured_products: () => productGrid([...products].filter((p) => p.featured).sort(byFeatured).slice(0, 3)),
  faq: faqBlock,
  contact_form: contactForm,
  custom_request_form: customRequestForm,
  newsletter,
  placeholder: (label, ratio) => placeholder(label, ratio),
  icon: (name) => ICON[name] || '',
  hero_eyebrow: () => (site.usa_claim_confirmed ? 'Handcrafted in America' : 'Handcrafted in Ed&rsquo;s workshop'),
  email_link: () => (realEmail() ? `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : esc(site.email)),
};

// {{site.key}} -> escaped site value; {{> component "arg" "arg"}} -> HTML
function tokens(html) {
  return html
    .replace(/\{\{>\s*(\w+)((?:\s+"[^"]*")*)\s*\}\}/g, (_, name, args) => {
      const fn = COMPONENTS[name];
      if (!fn) { warnings.push(`Unknown component: ${name}`); return ''; }
      const list = [...args.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
      return fn(...list);
    })
    .replace(/\{\{\s*site\.([\w.]+)\s*\}\}/g, (_, key) => esc(key.split('.').reduce((o, k) => (o || {})[k], site)));
}

// ---------------------------------------------------------------- layout
const NAV = [['Shop', '/shop/'], ...categories.map((c) => [c.title, categoryUrl(c)]), ['Our Story', '/our-story/'], ['Made to Order', '/made-to-order/'], ['FAQ', '/faq/'], ['Contact', '/contact/']];

function header(current) {
  const links = NAV.map(([t, u]) => `<li><a href="${u}"${u === current ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  const ann = site.announcement_enabled
    ? `<div class="announcement" role="region" aria-label="Announcement"><p>${esc(site.announcement)}${site.announcement_2 ? `<span aria-hidden="true"> &nbsp;|&nbsp; </span><span class="visually-hidden">. </span>${esc(site.announcement_2)}` : ''}</p></div>`
    : '';
  return `${ann}
<header class="site-header"><div class="page-width site-header__inner">
  <button class="icon-link menu-toggle" type="button" aria-expanded="false" aria-controls="MobileNav" data-toggle>${ICON.menu}<span class="visually-hidden">Menu</span></button>
  <a class="site-header__logo" href="/">${ICON.ring}<span class="wordmark"><span class="wordmark__eds">EDS</span> WoodWorx</span><span class="visually-hidden"> home</span></a>
  <nav class="site-nav" aria-label="Main"><ul>${links}</ul></nav>
  <div class="header-icons"><a class="icon-link" href="/search/">${ICON.search}<span class="visually-hidden">Search</span></a></div>
</div>
<nav class="mobile-nav" id="MobileNav" aria-label="Main" hidden><ul>${links}</ul><ul class="mobile-nav__secondary"><li><a href="/shipping-policy/">Shipping</a></li><li><a href="/returns/">Returns</a></li><li><a href="/search/">Search</a></li></ul></nav>
</header>`;
}

function footer() {
  const soc = Object.entries(site.social || {}).filter(([, v]) => v);
  const social = soc.length
    ? `<ul class="social-links" aria-label="EDS WoodWorx on social media">${soc.map(([k, v]) => `<li><a href="${esc(v)}" rel="noopener">${ICON[k] || ''}<span class="visually-hidden">${k[0].toUpperCase() + k.slice(1)}</span></a></li>`).join('')}</ul>`
    : '';
  const col = (title, id, items) => `<nav aria-labelledby="${id}"><h2 id="${id}">${title}</h2><ul>${items.map(([t, u]) => `<li><a href="${u}">${t}</a></li>`).join('')}</ul></nav>`;
  return `<footer class="site-footer"><div class="page-width">
  <div class="site-footer__grid">
    <div class="site-footer__brand">${ICON.ring}<p class="wordmark"><span class="wordmark__eds">EDS</span> WoodWorx</p><p>${esc(site.description)}</p>
      ${realEmail() ? `<p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>` : ''}${site.location ? `<p>${esc(site.location)}</p>` : ''}</div>
    ${col('Shop', 'FootShop', [['Shop all', '/shop/'], ...categories.map((c) => [c.title, categoryUrl(c)])])}
    ${col('Help', 'FootHelp', [['Made to Order', '/made-to-order/'], ['FAQ', '/faq/'], ['Contact', '/contact/'], ['Our Story', '/our-story/']])}
    ${col('Policies', 'FootPolicies', [['Shipping Policy', '/shipping-policy/'], ['Returns &amp; Refunds', '/returns/'], ['Privacy Policy', '/privacy/'], ['Terms of Service', '/terms/'], ['Accessibility Statement', '/accessibility/']])}
  </div>
  <div class="site-footer__bottom"><p>&copy; ${new Date().getFullYear()} ${esc(site.name)}. Handmade by Ed.</p>${social}</div>
</div></footer>`;
}

function layout({ title, description, url, body, current, noindex = false, jsonld = [], ogImage = '', ogType = 'website' }) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonical = site.url + url;
  const share = ogImage || site.share_image || '';
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="#3A281C">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
${share ? `<meta property="og:image" content="${esc(site.url + share)}">` : ''}
<meta name="twitter:card" content="${share ? 'summary_large_image' : 'summary'}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap">
<link rel="stylesheet" href="/assets/site.css?v=${BUILD_ID}">
<script src="/assets/site.js?v=${BUILD_ID}" defer></script>
${ld}
</head>
<body>
<a class="skip-link" href="#MainContent">Skip to main content</a>
${header(current)}
<main id="MainContent" class="main" tabindex="-1">
${body}
</main>
${footer()}
<div class="visually-hidden" aria-live="polite" aria-atomic="true" id="LiveRegion"></div>
</body>
</html>
`;
}

function breadcrumbs(trail) {
  const items = [['Home', '/'], ...trail];
  const html = `<nav class="breadcrumbs page-width" aria-label="Breadcrumb"><ol>${items.map(([t, u], i) => (i === items.length - 1 ? `<li><span aria-current="page">${esc(t)}</span></li>` : `<li><a href="${u}">${esc(t)}</a></li>`)).join('')}</ol></nav>`;
  const ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([t, u], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: site.url + u })) };
  return { html, ld };
}

// ---------------------------------------------------------------- page writers
const BUILD_ID = Date.now().toString(36);
const pages = []; // for sitemap + search

function write(url, html, meta = {}) {
  const file = url === '/404' ? path.join(OUT, '404.html') : path.join(OUT, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  const count = (html.replace(/<script[\s\S]*?<\/script>/g, '').match(/\[[A-Z$][^\]<]{0,60}\]/g) || []).length;
  pages.push({ url, ...meta, placeholders: count });
}

function parseFrontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: src.slice(m[0].length) };
}

function buildContentPages() {
  for (const f of fs.readdirSync(path.join(ROOT, 'src/pages')).filter((x) => x.endsWith('.html'))) {
    const { meta, body } = parseFrontMatter(read(`src/pages/${f}`));
    const url = meta.path || `/${f.replace(/\.html$/, '')}/`;
    let content = tokens(body);
    const hasPlaceholders = /\[[A-Z$][^\]<]{0,60}\]/.test(content);
    if (meta.draft_notice === 'true' && hasPlaceholders) {
      content = `<div class="page-width"><p class="owner-note"><strong>Draft policy.</strong> Details in [brackets] are not final. If you have a question about this policy, please <a href="/contact/">contact Ed</a>.</p></div>\n${content}`;
    }
    const jsonld = [];
    if (url === '/') jsonld.push(orgSchema());
    if (url === '/faq/') jsonld.push(faqSchema());
    const noindex = meta.noindex === 'true' || (url === '/custom-request/' && !site.custom_requests_enabled);
    write(url, layout({ title: meta.title || site.name, description: meta.description || site.description, url, body: content, current: url, noindex, jsonld }),
      { title: meta.title, description: meta.description, noindex, search: meta.search !== 'false', text: content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 400) });
  }
}

function orgSchema() {
  const o = { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, logo: `${site.url}/favicon.svg` };
  if (realEmail()) o.email = site.email;
  const same = Object.values(site.social || {}).filter(Boolean);
  if (same.length) o.sameAs = same;
  return o;
}

function collectionPage({ url, title, h1, intro, list, trail, seoTitle, seoDescription }) {
  const bc = breadcrumbs(trail);
  const body = `${bc.html}
<div class="page-width">
  <header class="collection-hero"><h1>${esc(h1)}</h1><p>${esc(intro)}</p>
    <div class="mto-inline">${mtoBadge()}<p>Most pieces are made after you order. Current crafting time: <strong>${esc(site.lead_time_standard)}</strong> before shipping. <a href="/made-to-order/">How it works</a>.</p></div>
  </header>
  <div class="toolbar"><p class="toolbar__count">${list.length} ${list.length === 1 ? 'piece' : 'pieces'}</p>
    ${list.length > 1 ? `<div class="field"><label for="SortBy">Sort by</label><select id="SortBy" data-sort><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option></select></div>` : ''}
  </div>
  ${productGrid(list)}
</div>
<div class="section-spacer"></div>`;
  write(url, layout({ title: seoTitle, description: seoDescription, url, body, current: url, jsonld: [bc.ld] }), { title, description: seoDescription, search: true, text: intro });
}

function buildCollections() {
  collectionPage({ url: '/shop/', title: 'Shop all', h1: 'Shop all', intro: "Hand-turned pens, wooden bowls, and handmade cutting boards, each made to order in Ed's workshop.", list: [...products].sort(byFeatured), trail: [['Shop', '/shop/']], seoTitle: 'Shop Handmade Wood Goods', seoDescription: "Browse hand-turned pens, handcrafted wooden bowls, and handmade cutting boards. Every piece is made to order in Ed's workshop." });
  for (const c of categories) {
    collectionPage({ url: categoryUrl(c), title: c.title, h1: c.title, intro: c.description, list: products.filter((p) => p.category === c.handle).sort(byFeatured), trail: [['Shop', '/shop/'], [c.title, categoryUrl(c)]], seoTitle: c.seo_title || c.title, seoDescription: c.seo_description || c.description });
  }
}

function buildProducts() {
  for (const p of products) {
    const c = catOf(p);
    const url = productUrl(p);
    const bc = breadcrumbs([[c.title, categoryUrl(c)], [p.title, url]]);
    const first = p.variants[0];

    const gallery = p.images && p.images.length
      ? `<div class="gallery__main" data-gallery-main>${img(p.images[0].src, p.images[0].alt, { eager: true, sizes: '(min-width: 990px) 55vw, 100vw' })}
          <button type="button" class="gallery__zoom" data-zoom>${ICON.zoom}Zoom</button></div>
        ${p.images.length > 1 ? `<ul class="gallery__thumbs" aria-label="Product images">${p.images.map((im, i) => `<li><button type="button" class="gallery__thumb" aria-current="${i === 0}" data-src="${esc(im.src)}" data-alt="${esc(im.alt)}"><img src="${esc(im.src)}" alt="" loading="lazy"><span class="visually-hidden">Show image ${i + 1}: ${esc(im.alt)}</span></button></li>`).join('')}</ul>` : ''}
        <dialog class="zoom-dialog" aria-label="Zoomed product image"><div class="zoom-dialog__inner"><button type="button" class="button button--light zoom-dialog__close" data-zoom-close>Close</button><img src="" alt=""></div></dialog>`
      : `<div class="gallery__main">${placeholder((p.photo_slots || [])[0] || p.title)}</div>
        <ul class="gallery__thumbs" aria-label="Photo slots to fill">${(p.photo_slots || []).slice(1).map((s) => `<li>${placeholder(s)}</li>`).join('')}</ul>`;

    const options = p.variants.length > 1
      ? p.options.map((o, oi) => `<fieldset class="option-group"><legend class="field__label">${esc(o.name)}</legend><div class="option-group__values">
          ${o.values.map((v) => `<label class="option-chip"><input type="radio" name="opt${oi}" value="${esc(v)}"${first.options[oi] === v ? ' checked' : ''} data-option="${oi}"><span>${esc(v)}</span></label>`).join('')}</div></fieldset>`).join('')
      : '';

    const buy = (v) => (v.stripe_link
      ? `<a class="button button--large button--full" href="${esc(v.stripe_link)}" data-buy>Buy now</a>`
      : `<span class="button button--large button--full" aria-disabled="true" data-buy>Ordering opens soon</span>`);
    const extras = (p.checkout_extras || []).length
      ? `<p class="product__checkout-note">${ICON.lock}<span>You'll choose quantity and add ${p.checkout_extras.map((x) => esc(x.toLowerCase())).join(' and ')} on the secure Stripe checkout page.</span></p>`
      : `<p class="product__checkout-note">${ICON.lock}<span>You'll choose quantity on the secure Stripe checkout page.</span></p>`;
    const noscript = p.variants.length > 1
      ? `<noscript><ul class="noscript-variants">${p.variants.map((v) => `<li>${esc(v.options.join(' / '))}: ${esc(money(v.price))} ${v.stripe_link ? `<a href="${esc(v.stripe_link)}">Buy</a>` : '(ordering opens soon)'}</li>`).join('')}</ul></noscript>`
      : '';

    const details = (p.details || []).length ? `<dl class="spec-list">${p.details.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : '';
    const variantJSON = JSON.stringify(p.variants.map((v) => ({ options: v.options, price: money(v.price), link: v.stripe_link || '' }))).replace(/</g, '\\u003c');

    const related = (p.related || []).map((h) => products.find((x) => x.handle === h)).filter(Boolean);
    const relatedList = related.length ? related : products.filter((x) => x.category === p.category && x.handle !== p.handle);

    const body = `${bc.html}
<div class="page-width product">
  <div class="product__media" data-gallery>${gallery}</div>
  <div class="product__info" data-product>
    <div class="product__badges">${mtoBadge(p)}${p.one_of_a_kind ? `<span class="mto-badge mto-badge--ready">${ICON.grain}One of a kind</span>` : ''}</div>
    <h1 class="product__title">${esc(p.title)}</h1>
    <p class="product__price" data-price>${esc(p.variants.length > 1 ? money(first.price) : priceLabel(p))}</p>
    <p class="product__summary">${esc(p.summary)}</p>
    ${availability()}
    <div class="product__form">
      ${leadTimeBox(p)}
      ${options}
      <p class="form-status form-status--error" data-variant-error hidden>This combination isn't offered.</p>
      <div class="product__buttons" data-buy-wrap>${buy(first)}</div>
      ${noscript}
      ${extras}
      <script type="application/json" data-variants>${variantJSON}</script>
    </div>
    <p class="product__help">Questions or a special request? <a href="/contact/">Contact Ed</a>. See <a href="/shipping-policy/">shipping</a> and <a href="/returns/">returns</a>.</p>
    <div class="accordion">
      <details open><summary>Details</summary><div class="accordion__content"><div class="rte">${p.description.map((d) => `<p>${esc(d)}</p>`).join('')}</div>${details}</div></details>
      ${p.finish ? `<details><summary>Materials &amp; finish</summary><div class="accordion__content"><p>${esc(p.finish)}</p></div></details>` : ''}
      ${p.care ? `<details><summary>Care</summary><div class="accordion__content"><p>${esc(p.care)}</p></div></details>` : ''}
      <details><summary>Made to order &amp; shipping</summary><div class="accordion__content"><p>Crafting time: ${esc(leadFor(p))}${hasCustomWork(p) ? ` (${esc(site.lead_time_custom)} with engraving or personalization)` : ''}. ${esc(site.shipping_note)}</p><p>You'll get a receipt by email right away, and another email from Ed when your piece ships. <a href="/made-to-order/">How made to order works</a>.</p></div></details>
    </div>
    <div class="variation-note">${ICON.grain}<p>Each piece is made from real wood, so grain, color, and figure will vary from the photos. That variation is what makes your piece one of a kind.</p></div>
  </div>
</div>
${relatedList.length ? `<section class="section section--parchment" aria-labelledby="RelHead"><div class="page-width"><div class="section__head"><h2 id="RelHead">You might also like</h2></div>${productGrid(relatedList.slice(0, 3))}</div></section>` : ''}`;

    const priced = p.variants.filter((v) => typeof v.price === 'number' && v.stripe_link);
    const ld = [bc.ld];
    if (priced.length) {
      ld.push({
        '@context': 'https://schema.org', '@type': 'Product', name: p.title, description: p.summary, url: site.url + url,
        image: (p.images || []).map((i) => site.url + i.src), brand: { '@type': 'Brand', name: site.name },
        offers: priced.map((v) => ({ '@type': 'Offer', name: v.options.join(' / '), price: v.price.toFixed(2), priceCurrency: 'USD', availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition', url: site.url + url })),
      });
    }
    write(url, layout({ title: `${p.title} – Made to Order`, description: `${p.summary} Made to order in Ed's workshop.`, url, body, current: categoryUrl(c), jsonld: ld, ogImage: (p.images || [])[0]?.src, ogType: 'product' }),
      { title: p.title, description: p.summary, search: true, kind: 'product', text: `${c.title} ${p.summary}` });
    if (!priced.length) warnings.push(`${p.title}: no variant has both a price and a Stripe link yet`);
  }
}

function buildExtras() {
  const indexable = pages.filter((p) => !p.noindex && p.url !== '/404');
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${site.url}${p.url}</loc></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  const index = pages.filter((p) => p.search && !p.noindex && p.url !== '/404' && p.url !== '/search/').map((p) => ({ url: p.url, title: p.title || '', description: p.description || '', text: p.text || '', kind: p.kind || 'page' }));
  fs.writeFileSync(path.join(OUT, 'search-index.json'), JSON.stringify(index));
  fs.copyFileSync(path.join(ROOT, 'brand/eds-ring-mark.svg'), path.join(OUT, 'favicon.svg'));
  for (const f of ['_headers', '_redirects']) if (fs.existsSync(path.join(ROOT, f))) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

// ---------------------------------------------------------------- run
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));
buildContentPages();
buildCollections();
buildProducts();
buildExtras();

const placeholderTotal = pages.reduce((n, p) => n + p.placeholders, 0);
console.log(`Built ${pages.length} pages into dist/`);
if (placeholderTotal) {
  console.log(`\n${placeholderTotal} [PLACEHOLDER] spots still on the site (fill these in before launch):`);
  for (const p of pages.filter((x) => x.placeholders)) console.log(`  ${String(p.placeholders).padStart(3)}  ${p.url}`);
}
if (warnings.length) { console.log('\nNotes:'); for (const w of [...new Set(warnings)]) console.log(`  - ${w}`); }
