# 5. Implementation & Template Specifications

## Theme overview

`eds-woodworx-theme.zip` is a complete Shopify Online Store 2.0 theme. No apps, frameworks, or build step. About 10 KB of vanilla JavaScript; every feature works (in simpler form) without it.

```
layout/theme.liquid              Page shell: SEO meta, fonts, skip link, header/footer
config/settings_schema.json      Owner settings: lead times, availability, contact, fonts, social
config/settings_data.json        Defaults
locales/en.default.json          Shared strings
assets/base.css                  Design tokens + all styles (no framework)
assets/theme.js                  Menu, gallery/zoom, variant picker, engraving preview, add-on, validation

sections/
  announcement-bar, header, footer                         (global)
  hero, category-grid, made-to-order-intro, featured-products,
  benefits, image-with-text, reviews, newsletter,
  workshop-availability                                    (homepage + reusable)
  main-product, related-products                           (product)
  main-collection, main-list-collections                   (collections)
  main-cart, main-search, main-404, main-page              (utility)
  page-intro, rich-text, process-steps, faq, contact-form,
  custom-request-form, image-gallery                       (content pages)

snippets/
  icon, wordmark, mto-badge, lead-time-note, product-card, price,
  responsive-image, placeholder-media, breadcrumbs,
  meta-tags, schema-organization, schema-product

templates/
  index, product, collection, list-collections, cart, search, 404, page,
  page.about, page.made-to-order, page.faq, page.contact,
  page.custom-request, page.accessibility
```

Customer accounts: use Shopify's **new customer accounts** (Settings → Customer accounts). They're hosted by Shopify, need no theme templates, and use one-time email codes instead of passwords, which is easier for older customers. Accounts are optional; guest checkout stays on.

## Product metafields

Create these once in **Settings → Custom data → Products → Add definition**. Namespace and key must match exactly. Every one is optional; if it's blank, that part of the page simply doesn't show.

| Name (in admin) | Namespace.key | Type | Used for |
|---|---|---|---|
| Summary | `custom.summary` | Single line text | One-sentence summary under the price; also schema description |
| Crafting time | `custom.lead_time` | Single line text | Overrides the site-wide crafting time for this product (e.g. "10–14 business days") |
| Ready to ship | `custom.ready_to_ship` | True or false | Shows "Ready to ship" badge instead of "Made to order" |
| One of a kind | `custom.one_of_a_kind` | True or false | Adds "One of a kind" badge and hides the quantity selector |
| Wood species | `custom.wood_species` | Multi-line text | Details → Wood |
| Dimensions | `custom.dimensions` | Single line text | Details → Size |
| Approximate weight | `custom.weight` | Single line text | Details → Approx. weight |
| Hardware | `custom.hardware` | Multi-line text | Details → Hardware (pens) |
| Refill type | `custom.refill` | Single line text | Details → Refill (pens) |
| Finish | `custom.finish` | Multi-line text | "Materials & finish" accordion |
| Care instructions | `custom.care` | Multi-line text | "Care" accordion |
| Engraving enabled | `custom.engraving_enabled` | True or false | Shows engraving field with live preview |
| Engraving max characters | `custom.engraving_max` | Integer | Character limit (default 20) |
| Engraving help text | `custom.engraving_help` | Single line text | Custom hint; `[MAX]` is replaced with the limit |
| Personalization enabled | `custom.personalization_enabled` | True or false | Shows a 250-character notes field |
| Personalization help text | `custom.personalization_help` | Single line text | Custom hint |
| Gift message enabled | `custom.gift_message_enabled` | True or false | Set to **false** to hide the gift message on one product (it's on by default site-wide) |
| Add-on product | `custom.addon_product` | Product (reference) | Optional checkbox add-on such as a gift box or care kit |
| Add-on label | `custom.addon_label` | Single line text | Checkbox wording, e.g. "Add a gift box" |
| Category label | `custom.category_label` | Single line text | Small label on product cards (defaults to Product type) |
| Primary collection | `custom.primary_collection` | Collection (reference) | Which collection the breadcrumb shows |
| Related products | `custom.related_products` | List of products | Hand-picked "You might also like" (otherwise same collection) |

**Tip:** In Shopify you can pin metafields so they show on every product edit screen. Pin the ones above that Ed uses.

## Product template specification

One template (`product.json`) serves every product type. Order of the buy box is fixed for clarity:

1. Badges (Made to order / Ready to ship / Currently unavailable; One of a kind)
2. H1 product title
3. Price (updates with variant)
4. One-sentence summary
5. Workshop availability (when switched on)
6. **Lead-time box** (always above the options and Add to Cart)
7. Variant options as labeled chip groups (no-JS fallback: a single select)
8. Extras, only when enabled: engraving + character count + preview → personalization notes → gift message → add-on checkbox
9. Quantity (hidden for one-of-a-kind pieces)
10. Add to cart (full width, 56px). Buy it now is **off by default** so buyers see the cart's made-to-order note; can be switched on.
11. Help line: Contact Ed · shipping · returns
12. Accordions: Details (description + spec list) open by default; Materials & finish; Care; Made to order & shipping
13. Natural variation note (always)
14. App block slot for a future reviews app
15. Related products (section below)

**Gallery:** main image (square), thumbnails as buttons (`aria-current` on the active one), Zoom opens a native `<dialog>` with the 2400px image (Esc closes, focus returns). Selecting a variant with its own image switches the main image. With no photos uploaded, labeled placeholder slots show what to shoot.

**Line-item properties** (saved on the order and shown in the cart, order admin, and packing slip):
- `properties[Engraving]`
- `properties[Personalization notes]`
- `properties[Gift message]`

**How to model options by category**

| Category | Use **variants** (affect price/SKU) | Use **properties/metafields** (no price change) |
|---|---|---|
| Pens | Wood species, Hardware finish | Engraving (if free), gift message |
| Bowls | Size (diameter), Wood when offered | Gift message; One of a kind = true |
| Cutting boards | Size, Wood/combination, Style (edge/end grain/serving), Juice groove (Yes/No) | Engraving (if free), gift message |

If engraving **costs extra**, add it as a variant option ("Engraving: None / Add engraving") so the price is right, and keep the engraving text field on. Gift boxes and care kits are separate products linked through `custom.addon_product`.

Shopify allows 3 options and up to 2,048 variants per product, which is plenty here.

## Collection template specification

- Breadcrumbs (Home / Shop / Category) with BreadcrumbList schema
- H1 = collection title; description below
- Made-to-order strip with badge and current crafting time
- Toolbar: product count (announced to screen readers) and Sort by: Featured (manual order), Newest, Price: Low to High, Price: High to Low
- Filters: hidden until "Show filters" is checked (set up in the free Search & Discovery app)
- Grid: 1 / 2 / 3 columns; 24 per page; numbered pagination
- Empty state with two clear next steps

**Collections to create:** Pens, Bowls, Cutting Boards (handles `pens`, `bowls`, `cutting-boards`) and Featured (for the homepage). "Shop All" is Shopify's built-in `/collections/all`. Prefer **automated collections** by Product type (e.g. "Product type is equal to Pen") so new products land in the right place automatically.

## Inventory and availability states

| Situation | Shopify setting | What customers see |
|---|---|---|
| Standard made-to-order product | Turn **off** "Track quantity" (or track with "Continue selling when out of stock") | Made to order badge, active Add to cart |
| Finished piece in hand | Track quantity = 1, metafield Ready to ship = true | Ready to ship badge |
| Paused product | Set status to Draft, or track quantity at 0 without continue-selling | Hidden, or "Currently unavailable" badge and disabled "Not available right now" button |
| Monthly capacity limit | Workshop availability message (Theme settings) | "Accepting [X] made-to-order projects this month." |

## Made-to-order messaging map

| Location | Mechanism |
|---|---|
| Announcement bar | Section text |
| Homepage hero + Made to Order band | `made-to-order-intro` section, reads lead time from Theme settings |
| Collection pages | Strip under the H1 |
| Product cards | `mto-badge` snippet |
| Product page | Badge + lead-time box above Add to cart + accordion |
| Cart | Badge per item + lead-time box in summary |
| Checkout | Shopify shows your Shipping Policy link. Add the lead-time line to the shipping-rate names (e.g. "Standard shipping — ships after crafting") in Settings → Shipping |
| Order confirmation email | Add the snippet below in Settings → Notifications → Order confirmation |

```liquid
<p style="background:#EDE3D1;padding:12px;border-left:4px solid #2E4A3B">
  <strong>Your order is made to order.</strong> Ed will start crafting it soon.
  Please allow approximately [X–Y] business days before it ships.
  You'll get another email with tracking when it's on the way.
</p>
```

## Search

`/search` returns products, pages, and articles with prefix matching ("cut" finds "cutting board"). Products and pages are shown in separate groups. Make sure FAQ, Made to Order, and Our Story pages are visible so they appear in results.

## SEO implementation

- **Titles & descriptions:** `layout/theme.liquid` outputs the Search engine listing values Ed enters in admin, plus page numbers and the shop name. One H1 per page (hero headline on the homepage; title elsewhere).
- **Canonical URLs:** `{{ canonical_url }}` on every page.
- **Open Graph / social:** `snippets/meta-tags.liquid` (title, description, image with alt, price on products). Default share image in Theme settings.
- **Structured data**
  - Organization on the homepage (name, URL, logo, email once set, social profiles).
  - Product on product pages (name, images, description, brand, one Offer per variant with price, currency, availability). **No ratings are output** until a reviews app provides real ones.
  - BreadcrumbList on product and collection pages.
  - FAQPage on the FAQ page, generated from the same visible blocks.
  - LocalBusiness is intentionally **not** used, because it requires a public address. Add it only if Ed opens a public workshop or storefront.
- **Sitemap & robots:** Shopify generates `/sitemap.xml` and `/robots.txt` automatically. No changes needed. Submit the sitemap in Google Search Console after launch.
- **URLs:** Shopify's clean handles. Keep product handles descriptive (`hand-turned-walnut-pen`, not `pen-1`).
- **Claims:** "Handcrafted in America" is gated behind an owner confirmation setting. Don't add "American-made," "eco-friendly," "sustainably sourced," "food-safe," "heirloom," or "lifetime" claims to copy unless Ed can substantiate them.

## Performance

- No jQuery, sliders, or icon fonts; icons are inline SVG.
- One CSS file, one deferred JS file.
- Responsive images with `srcset` (360–1800px) and correct `sizes`; Shopify's CDN serves WebP/AVIF automatically.
- Hero image loads eagerly with `fetchpriority="high"`; everything else lazy-loads.
- All media containers use fixed aspect ratios, so nothing shifts as images load.
- Two font families, preloaded, `font-display: swap`.
- No autoplay video, carousels, pop-ups, or countdowns.

Target: Lighthouse mobile Performance 90+, CLS < 0.1, LCP < 2.5s on 4G with optimized photos.

## Accessibility implementation (WCAG 2.2 AA)

| Requirement | How it's met |
|---|---|
| Skip link | First focusable element; jumps to `#MainContent` |
| Headings | One H1 per page; sections use H2, cards/items H3 |
| Landmarks | `header`, `nav` (labeled), `main`, `footer`, labeled sections |
| Keyboard | All controls are native buttons/links/inputs; Esc closes menu, search, and zoom dialog with focus returned |
| Focus visible | 3px Oak outline with offset on everything; product cards show focus around the whole card |
| Target size | 48px minimum (WCAG 2.5.8 asks for 24px) |
| Contrast | All text ≥ 4.5:1; UI borders ≥ 3:1 (see design system) |
| No color-only meaning | Badges have text + icon; selected chips change fill and text; errors have icon + text + border |
| Forms | Visible labels, `aria-describedby` hints, required marked and explained, inline errors, focusable error summary with links |
| Accordions | Native `<details>`/`<summary>` |
| Modal | Native `<dialog>` (focus is trapped and restored by the browser) |
| Live updates | Variant/price changes, quantity, and gallery changes announced via a polite live region |
| Motion | `prefers-reduced-motion` disables transitions |
| Images | Alt text from Shopify media; decorative thumbnails/tiles use empty alt with a text label |
| Video (future) | Upload captions; link a transcript below each video; never autoplay |
| Zoom/reflow | Layout reflows to 320px with no horizontal scroll; text resizes to 200% |

## Known limitations and why

- **File upload on Custom Request:** Shopify's built-in contact form can't accept attachments. Customers reply to Ed's email with photos. If this becomes a pain, see the optional app list.
- **Cart drawer:** A cart page was chosen over a drawer. It's simpler, fully accessible, keeps the made-to-order note in view, and has nothing to break.
- **Checkout customization:** On non-Plus plans checkout layout can't be edited. Shopify checkout's own branding settings (Settings → Checkout → Customize) can apply the Cream/Walnut colors and logo. Lead-time expectations are set before checkout and repeated in the confirmation email.
- **Liquid validation:** The files were checked for syntax balance and valid JSON. Run `shopify theme check` (Shopify CLI) once before launch, and preview every page in the theme editor.
