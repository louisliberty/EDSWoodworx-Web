# Notes for Claude working on this repo

Static site for EDS WoodWorx (edswoodworx.com). `node build.mjs` turns `data/` + `src/pages/` + `assets/` into `dist/`. GitHub Actions (`.github/workflows/deploy.yml`) builds and uploads `dist/` to HostGator by FTPS on every push to `main`, so anything pushed to `main` goes live within minutes. FTP credentials are GitHub secrets; never ask for or write them into files. No npm dependencies; keep it that way.

The `shopify` branch holds a complete Shopify Online Store 2.0 theme for a future move to Shopify. Don't merge it into `main`.

## Rules
- Run `node build.mjs` after every change and confirm it succeeds before committing. It prints remaining `[PLACEHOLDER]` spots and notes; don't add new warnings.
- Keep JSON in `data/` valid.
- Don't invent prices, specs, history, reviews, or policies. Unknown business details stay as `[BRACKETED]` placeholders until the owner provides them.
- Copy voice: plain, short sentences, first-hand. No "elevate", "curated", "heirloom", "eco-friendly", "food-safe", or "American-made" claims unless the owner confirms them.
- Accessibility target is WCAG 2.2 AA. Every image needs real alt text, one `<h1>` per page, and visible labels on form fields. Colors in `assets/site.css` were contrast-checked; recheck before changing them.
- Never put secret keys in this repo. Stripe Payment Links (`https://buy.stripe.com/...`) and Web3Forms access keys are public by design; Stripe secret keys (`sk_...`) are not.

## Where common edits go
| Request | Where |
|---|---|
| Business email | `data/site.json` → `email` (used site-wide, including FAQ, policies, footer, contact page) |
| Response time | `data/site.json` → `response_time` |
| Crafting / lead times | `data/site.json` → `lead_time_standard`, `lead_time_custom`; per-product override `lead_time` in `data/products.json` |
| Availability message | `data/site.json` → `availability_enabled`, `availability_text` |
| "Handcrafted in America" | `data/site.json` → `usa_claim_confirmed` (only when the owner confirms) |
| Announcement bar | `data/site.json` → `announcement_enabled`, `announcement`, `announcement_2` |
| Contact form service | `data/site.json` → `contact_form_endpoint` (e.g. `https://api.web3forms.com/submit`) and `form_hidden_fields` (e.g. `{"access_key": "..."}`). Empty endpoint = email-app fallback. |
| Custom requests on/off | `data/site.json` → `custom_requests_enabled` (also add the page to nav in `build.mjs` → `NAV` if wanted) |
| Newsletter section | `data/site.json` → `newsletter_form_endpoint` (empty = hidden) |
| Social links | `data/site.json` → `social` |
| Policy dates | `data/site.json` → `policies_last_updated` |
| Prices and Stripe links | `data/products.json` → each product's `variants[].price` (number, e.g. 45) and `variants[].stripe_link` |
| New product | Add an object to `data/products.json` → `products` (copy an existing one). `variants[].options` must match `options[].values` in order. |
| New category | Add to `data/products.json` → `categories`; nav, footer, tiles, and the category page are generated. |
| Hide a product | `"active": false` |
| Homepage featured products | `featured`: 1, 2, 3 (lowest first; the first three show) |
| Product photos | Put files in `assets/images/products/<handle>/`; list them in the product's `images` as `{ "src": "/assets/images/products/<handle>/1.jpg", "alt": "..." }`. The first image is the card photo. |
| Category photo | `data/products.json` → category `image` (+ `image_alt`) |
| FAQ | `data/faq.json` |
| Page text | `src/pages/<page>.html`. Use `{{site.key}}` for values from site.json; components are `{{> name "arg"}}` (see `COMPONENTS` in `build.mjs`). |
| Homepage/story photos | Replace `{{> placeholder "..."}}` in `src/pages/*.html` with `{{> image "/assets/images/<file>" "<alt text>" "portrait"}}` (ratio: square, portrait, landscape, wide). |
| Ed's portrait | `assets/images/ed-portrait.svg` is an illustration drawn from a photo of Ed (hand-written SVG, editable). Used on the homepage and Our Story. The original photo is not in the repo. |

Product prices exist in two places: Stripe (what's charged) and `data/products.json` (what's shown). Remind the owner to keep them in sync.

Checkout, orders, shipping rates, receipts, refunds, and taxes are configured in the Stripe Dashboard, not here. Hosting, the domain, SSL, and email accounts are configured in HostGator cPanel. Server behavior (https, 404, caching) is in `.htaccess`.
