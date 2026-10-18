# EDS WoodWorx

Website for [edswoodworx.com](https://edswoodworx.com): hand-turned pens, wooden bowls, and handmade cutting boards, made to order in Ed's workshop.

It's a static site: free hosting, with checkout through Stripe Payment Links and no monthly platform fee. A full Shopify theme for later is saved on the `shopify` branch.

## Where things live

| What | File |
|---|---|
| Email, response time, crafting times, availability message, announcement bar, form settings, social links | `data/site.json` |
| Categories, products, prices, options, Stripe links, photos | `data/products.json` |
| FAQ questions and answers | `data/faq.json` |
| Page text (homepage, Our Story, Made to Order, Contact, policies…) | `src/pages/*.html` |
| Styles and browser script | `assets/site.css`, `assets/site.js` |
| Product photos | `assets/images/products/<product>/` |
| Page layout, header, footer, product page structure | `build.mjs` |
| Logo files | `brand/` |
| Guides | `docs/01-setup-guide.md`, `docs/02-launch-checklist.md` |

## Build

```
node build.mjs        # writes the site to dist/ and lists remaining [PLACEHOLDERS]
npm run preview       # build, then view at http://localhost:8080
```

No packages to install; it needs only Node 18 or newer.

## Hosting

Cloudflare Pages, connected to this repo. Build command `node build.mjs`, output directory `dist`, production branch `main`. Pushing to `main` deploys the site. Setup steps are in `docs/01-setup-guide.md`.
