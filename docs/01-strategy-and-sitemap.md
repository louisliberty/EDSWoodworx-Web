# 1. Strategy, Information Architecture & Sitemap

## The job of this site

EDS WoodWorx is one maker selling a small catalog of made-to-order pieces, often to people buying gifts. The site has three jobs, in this order:

1. **Make the offer obvious in five seconds.** Pens, bowls, and cutting boards, made by hand by Ed. The homepage headline says exactly that.
2. **Set timing expectations without making the shop feel slow.** Made-to-order status appears as a consistent green ring badge and a short, plain lead-time note at every decision point: homepage, collection, card, product page, and cart. It is framed as the reason the piece is good, not as a delay.
3. **Get a confident buyer through checkout with no surprises.** Large type, few choices per screen, options shown only when a product uses them, Shopify's native checkout.

### Design principles that follow from that

- **One maker, one voice.** Copy is written as Ed's shop, in short plain sentences. No invented history, reviews, or claims.
- **Photography carries the brand.** The layout stays quiet so wood grain is the most interesting thing on the page.
- **Simple now, expandable later.** Categories are Shopify collections, options are variants and metafields, and every section is reusable. A fourth category (say, serving trays) is a new collection plus a menu link: no code, no redesign.
- **Built for older eyes and thumbs.** 18px base text, 48px minimum tap targets, high contrast, visible labels, no hover-only information.
- **Honest by construction.** "Handcrafted in America" only appears after Ed checks a box confirming it. The reviews section renders nothing until real reviews are added. Placeholders are bracketed so they're impossible to miss.

## Audience

| Who | What they need | Where the site answers |
|---|---|---|
| Gift buyer (often 45+), shopping on a phone | Know what it is, when it arrives, can it be personalized, can they add a message | Product page lead-time box above Add to Cart; gift message field; engraving preview; FAQ |
| Self-purchaser who values craft | Wood species, size, finish, care, who made it | Details accordion; Our Story; natural-variation note |
| Someone with a special request | Whether Ed takes custom work and how to ask | Contact page invitation; optional Custom Request page |

## Sitemap

```
edswoodworx.com
│
├── /                                   Homepage
│
├── /collections/all                    Shop (Shop All)
│   ├── /collections/pens               Pens
│   ├── /collections/bowls              Bowls
│   ├── /collections/cutting-boards     Cutting Boards
│   └── /collections/[future-category]  (add any time; same template)
│
├── /products/[product-handle]          Product pages (one flexible template)
│     e.g. /products/hand-turned-wooden-pen
│          /products/hand-turned-wooden-bowl
│          /products/handcrafted-cutting-board
│
├── /pages/our-story                    Our Story (About)           template: page.about
├── /pages/made-to-order                Made to Order               template: page.made-to-order
├── /pages/faq                          FAQ                         template: page.faq
├── /pages/contact                      Contact                     template: page.contact
├── /pages/custom-request               Custom Request (hidden until ready)  template: page.custom-request
├── /pages/accessibility                Accessibility Statement     template: page.accessibility
│
├── /search                             Search (products + pages)
├── /cart                               Cart
├── /checkout                           Shopify checkout (native)
├── /account                            Customer account (Shopify-hosted, optional)
│
└── /policies/                          Shopify-managed policy pages
    ├── shipping-policy
    ├── refund-policy                   ("Returns & Refunds")
    ├── privacy-policy
    ├── terms-of-service
    └── contact-information
```

Cookie preferences are handled by Shopify's built-in privacy banner (Settings → Customer privacy). The footer shows a "Cookie preferences" link automatically when that banner is active.

## Navigation

**Main menu** (`main-menu`, shown in the header on desktop and in the menu panel on mobile):

Shop · Pens · Bowls · Cutting Boards · Our Story · Made to Order · FAQ · Contact

**Header utilities** (icons with text labels for screen readers): Search, Account (only if customer accounts are turned on), Cart with item count.

**Footer**:

| Column | Links |
|---|---|
| Brand | Ring mark, wordmark, one-line description, business email, city/state (optional) |
| Shop (`footer` menu) | Shop All, Pens, Bowls, Cutting Boards |
| Help (second footer menu) | Made to Order, FAQ, Shipping & Returns, Contact, Our Story |
| Policies (automatic) | Shipping Policy, Returns & Refunds, Privacy Policy, Terms of Service, Accessibility Statement, Cookie preferences |

**Mobile menu extras** (`secondary_menu`): Shipping & Returns, Contact. These show beneath the main links in the mobile panel.

## How new categories are added (no redesign)

1. Create a collection (e.g. "Serving Trays"), add products, add a collection image and a two-sentence description.
2. Add it to the main menu and the footer Shop menu.
3. Optionally add a fourth tile in the homepage "Shop by category" section (up to 6 tiles; the grid reflows).

Products in the new category use the same product template. Options like engraving or a care-kit add-on are switched on per product with metafields, so nothing in the theme needs to change.

## Page-level SEO plan

| Page | Title tag | Meta description |
|---|---|---|
| Home | EDS WoodWorx – Hand-Turned Pens, Wooden Bowls & Handmade Cutting Boards | Handcrafted wood goods from Ed's workshop. Hand-turned pens, wooden bowls, and handmade cutting boards, made to order and built to be used. |
| Shop All | Shop Handmade Wood Goods \| EDS WoodWorx | Browse hand-turned pens, handcrafted wooden bowls, and handmade cutting boards. Every piece is made to order in Ed's workshop. |
| Pens | Hand-Turned Wooden Pens \| EDS WoodWorx | Hand-turned wooden pens made to order from distinctive hardwoods. Optional engraving makes a personal, practical gift. |
| Bowls | Handcrafted Wooden Bowls \| EDS WoodWorx | One-of-a-kind wooden bowls, shaped and finished by hand in Ed's workshop. Made to order, with natural grain and character. |
| Cutting Boards | Handmade Cutting Boards \| EDS WoodWorx | Hardwood cutting boards made to order for everyday prep, serving, and gifting. Choose your size and add engraving. |
| Our Story | Our Story – Meet Ed \| EDS WoodWorx | Meet Ed, the maker behind EDS WoodWorx, and see the workshop where every pen, bowl, and board is made by hand. |
| Made to Order | How Made to Order Works \| EDS WoodWorx | What made to order means at EDS WoodWorx, current crafting times, how you'll get updates, and what can be customized. |
| FAQ | Frequently Asked Questions \| EDS WoodWorx | Answers about crafting time, wood variation, engraving, care, gifts, returns, and shipping for EDS WoodWorx orders. |
| Contact | Contact Ed \| EDS WoodWorx | Questions about a piece, an order, or a special request? Send Ed a message. |
| Custom Request | Custom Wood Requests \| EDS WoodWorx | Ask Ed about a custom pen, bowl, or board. Requests are reviewed individually before any work begins. |
| Accessibility | Accessibility Statement \| EDS WoodWorx | How EDS WoodWorx supports accessible shopping, and how to request help or an accommodation. |
| Product (pattern) | [Product name] – Made to Order \| EDS WoodWorx | [One-sentence summary]. Made to order in Ed's workshop. |

Set these in each item's "Search engine listing" panel in Shopify admin. The theme outputs them, plus canonical URLs and Open Graph tags, automatically.
