# EDS WoodWorx – Shopify Theme

The storefront theme for [edswoodworx.com](https://edswoodworx.com): hand-turned pens, wooden bowls, and handmade cutting boards, made to order in Ed's workshop.

This repository is connected to Shopify through the **Shopify GitHub integration**. Whatever is on the connected branch (`main`) is what the theme shows.

- Push to `main` → Shopify updates the theme within about a minute.
- Edit in Shopify's theme editor → Shopify commits the change back here automatically. **Pull before editing locally** so you don't overwrite those commits.

## Repository layout

```
layout/ config/ locales/ assets/ sections/ snippets/ templates/   ← the theme (Shopify reads these)
docs/    ← strategy, design system, copy, owner guide, checklists, policy templates
brand/   ← logo, ring mark, maker's stamp (SVG)
```

Shopify ignores `docs/`, `brand/`, and these README files.

## What lives here vs. in Shopify admin

| Change | Where |
|---|---|
| Business email, response time, lead times, workshop availability, social links | `config/settings_data.json` (or Theme settings in the editor) |
| Page copy: homepage, Our Story, Made to Order, FAQ, Contact, Custom Request, Accessibility | `templates/*.json` |
| Layout, styling, behavior | `sections/`, `snippets/`, `assets/` |
| Products, prices, photos, collections, menus | Shopify admin (not in this repo) |
| Shipping, refund, privacy, terms policies | Shopify admin → Settings → Policies (not in this repo) |
| Order emails, payments, taxes, shipping rates, domain | Shopify admin (not in this repo) |

## First-time connection

1. Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**.
2. Authorize the Shopify GitHub app for this repository, pick branch `main`.
3. Preview, then **Publish** once the launch checklist in `docs/07-launch-checklists.md` is done.

Setup details for Ed are in `docs/06-owner-handoff.md`.

## Checking changes

With the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) installed:

```
shopify theme check          # lint Liquid and JSON
shopify theme dev            # live local preview against the store
```
