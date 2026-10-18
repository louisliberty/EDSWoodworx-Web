# 7. Placeholders, Launch Checklist, Apps & QA

## A. Editable placeholders Ed must complete

Search the theme editor and admin for `[` to find any that remain. **None should be live at launch.**

| Placeholder | Where it appears | Where to edit |
|---|---|---|
| `[X–Y] business days` (standard) | Product pages, cart, collections, homepage, Made to Order, FAQ | Theme settings → Workshop & lead times |
| `[X–Y] business days` (personalized/custom) | Product pages with engraving, cart, Made to Order, Custom Request, FAQ | Theme settings → Workshop & lead times |
| `Accepting [X] made-to-order projects this month.` | Hero, Made to Order, product pages (only when switched on) | Theme settings → Workshop & lead times |
| `[BUSINESS EMAIL]` | Footer, Contact, FAQ, Accessibility, policies | Theme settings → Contact & requests; FAQ block; policies |
| `[X] business days` (response time) | Contact, Custom Request, FAQ, Accessibility | Theme settings → Contact & requests; FAQ block |
| `$[AMOUNT]` free shipping | Announcement bar; cart note | Announcement bar section; Theme settings → Cart |
| `[CAREER / BACKGROUND]` and story placeholders | Homepage About Ed; Our Story | Theme editor → those sections |
| `[GIFT BOX OR WRAPPING]` | Homepage gifting section; FAQ | Theme editor |
| `[EDIT LIST]` customization lists | Made to Order page | Theme editor → Made to Order template |
| `[ENGRAVING METHOD AND ANY EXTRA COST]` | FAQ | FAQ block |
| `[CUSTOM ORDERS]` | FAQ | FAQ block |
| `[FOOD-SAFE STATEMENT]` | FAQ; bowl and board Finish metafields | FAQ block; product metafields |
| `[RECOMMENDED OIL OR BOARD CONDITIONER]` | FAQ; Care metafields | FAQ block; product metafields |
| `[PRICES ON PACKING SLIP]` | FAQ | FAQ block (also check product page setting "I confirm packing slips…") |
| `[RETURN POLICY SUMMARY]`, `[RETURN WINDOW]` | FAQ; Refund policy | FAQ block; Settings → Policies |
| Damage reporting `[X] days`, `[CONFIRM REMEDY]` | FAQ; Shipping & Refund policies | FAQ block; Settings → Policies |
| `[INTERNATIONAL SHIPPING]` | FAQ; Shipping policy | FAQ block; Settings → Policies |
| `[KNOWN ISSUES]`, `[DATE]` | Accessibility Statement | Theme editor → Accessibility template |
| Budget ranges `$[A]`, `$[B]`, `$[C]` | Custom Request form | Theme editor → Custom request form (before turning it on) |
| `[PRICE]`, `[WOOD SPECIES]`, `[DIMENSIONS]`, `[WEIGHT]`, `[FINISH TYPE]`, `[HARDWARE FINISH]`, `[PEN STYLE]`, `[LENGTH]`, `[REFILL TYPE]`, `[DIAMETER]`, `[HEIGHT]`, `[SIZE]` | Product pages | Products → each product (variants + metafields) |
| Every "Photo:" placeholder | Hero, categories, About Ed, gifting, Our Story, gallery, products | Theme editor images; product Media |
| Owner notes (dashed honey boxes) | Our Story, FAQ, Accessibility, Featured products | Clear the "Owner note" field in each section |
| All policy `[BRACKETS]` | Shipping, Refund, Privacy, Terms | Settings → Policies |
| Physical mailing address for email marketing | Shopify Email footer | Settings → Store details |

Optional (leave blank if not used): business location (city/state), social links, favicon, share image, logo image.

## B. Launch checklist

**Accounts and money**
- [ ] Shopify plan selected; store name "EDS WoodWorx"
- [ ] Shopify Payments activated; bank account verified; test mode **off**
- [ ] Shop Pay / Apple Pay / Google Pay on; PayPal decided
- [ ] Sales tax registration states added
- [ ] Store currency USD; store address and contact email set

**Domain and email**
- [ ] edswoodworx.com connected, SSL active, set as primary
- [ ] `www` redirects to the root (or vice versa)
- [ ] Business email working and entered in Theme settings
- [ ] Sender email verified in Settings → Notifications

**Theme**
- [ ] Theme uploaded and **published**
- [ ] Main menu, footer Shop menu, footer Help menu, and mobile extras menu built
- [ ] Pages created with the right templates: Our Story (`page.about`), Made to Order (`page.made-to-order`), FAQ (`page.faq`), Contact (`page.contact`), Accessibility Statement (`page.accessibility`), Custom Request (`page.custom-request`, kept out of menus until ready)
- [ ] Accessibility page chosen in Footer section settings
- [ ] Lead times, response time, email entered; availability on/off decided
- [ ] USA claim confirmed **or** left unchecked
- [ ] Favicon (ring mark), share image, and optional logo uploaded
- [ ] Every placeholder from section A replaced; every owner note cleared
- [ ] Featured collection chosen in the homepage section

**Catalog**
- [ ] Metafield definitions created
- [ ] At least one product per category, Active, with 4+ photos and alt text
- [ ] Prices, variants, weights, SKUs (optional) set
- [ ] Pens, Bowls, Cutting Boards (automated) and Featured (manual) collections with images and descriptions
- [ ] Search engine listings written for products, collections, and pages

**Shipping and policies**
- [ ] Shipping origin, packages, and rates set; rate names mention crafting
- [ ] Free shipping rule matches the announcement bar (or the bar text removed)
- [ ] Shipping, Refund, Privacy, Terms, and Contact information policies filled in and reviewed by an attorney
- [ ] Cookie banner decided (Settings → Customer privacy)
- [ ] Order confirmation email includes the made-to-order note
- [ ] Packing slip checked (gift orders: decide whether to hide prices)

**Testing**
- [ ] Full QA pass (section D)
- [ ] Test order placed and refunded
- [ ] Contact form and newsletter tested (messages arrive at the business email; subscriber shows in Customers)

**Go live**
- [ ] Remove the storefront password (Online Store → Preferences)
- [ ] Submit `https://edswoodworx.com/sitemap.xml` in Google Search Console
- [ ] Google & YouTube / Facebook channels connected only if you'll use them
- [ ] Tell friends and family; ask the first customers for honest reviews

## C. Apps and integrations

**Needed for launch: none.** Everything essential is native Shopify:

| Need | Native Shopify feature |
|---|---|
| Products, variants, inventory, checkout | Core Shopify |
| Personalization and gift messages | Line-item properties in the theme |
| Lead times and availability | Theme settings |
| Contact and custom request forms | Shopify contact form |
| Email signup | Customer form + **Shopify Email** (free tier) for sending |
| Filters (later) | **Search & Discovery** (free, by Shopify) |
| Shipping labels | **Shopify Shipping** (built in) |
| Cookie consent | Customer privacy banner (built in) |
| Analytics | Shopify Analytics; optionally **Google & YouTube** channel for GA4 |

**Optional later, only if a real need appears:**

| App | When to add it |
|---|---|
| A reviews app such as **Judge.me** (has a free plan) | Once you have customers to ask. It adds a reviews block into the product page's app slot. Use genuine reviews only. |
| **Shopify Forms** | If you want a nicer newsletter form with consent options. |
| A form app with file uploads (e.g. **Helium Customer Fields** or **Globo Form Builder**) | Only if custom requests take off and email attachments become a hassle. |
| **Shopify Inbox** | If you want to answer quick questions by chat. Optional, and adds script weight. |

Avoid pop-up, countdown, "X people are viewing," and upsell apps. They conflict with the brand and slow the site.

## D. QA checklist

Test on: iPhone Safari, Android Chrome, desktop Chrome, desktop Safari or Firefox, and one tablet. Repeat key flows with the keyboard only and with VoiceOver (Mac/iPhone) or NVDA (Windows).

**Mobile usability**
- [ ] Text readable without zooming; nothing scrolls sideways at 320px wide
- [ ] Menu button opens and closes; links are easy to tap
- [ ] Search opens, accepts input, returns products and pages
- [ ] Product photos swipe/tap through; Zoom works and closes
- [ ] Options, engraving field, and Add to cart reachable without awkward scrolling
- [ ] Cart quantity buttons, Remove, and Check out work
- [ ] Phone keyboard shows "@" on email fields and numbers on quantity

**Desktop usability**
- [ ] Full navigation shows at ≥1280px; current page underlined
- [ ] Product buy box stays in view while scrolling the gallery
- [ ] Hover states visible but nothing depends on hover

**Accessibility**
- [ ] Tab from the top: skip link appears first and works
- [ ] Every interactive element has a visible focus ring
- [ ] Menu, search, and zoom close with Esc and return focus
- [ ] Each page has exactly one H1; headings make sense in order (use a headings browser extension)
- [ ] Every product and content photo has meaningful alt text
- [ ] Submit the contact form empty: error summary appears, focuses, links jump to fields, and each field explains the fix
- [ ] Screen reader announces price changes when choosing a variant
- [ ] Page works at 200% browser zoom
- [ ] Turn on "Reduce motion" in the OS: no transitions
- [ ] Run axe DevTools or WAVE on Home, Collection, Product, Cart, Contact: zero serious errors

**Checkout and orders**
- [ ] Add to cart with each variant combination; invalid combinations are explained
- [ ] Engraving character limit enforced; preview updates
- [ ] Gift message, engraving, and personalization appear in cart and on the admin order
- [ ] Add-on checkbox adds both products
- [ ] Cart note saves to the order
- [ ] Shipping rates appear correctly for several states
- [ ] Taxes calculate for your registered state
- [ ] Test payment succeeds; confirmation email includes made-to-order note
- [ ] Fulfillment sends tracking email

**Product options**
- [ ] Pen: wood + hardware options, engraving on, gift box add-on
- [ ] Bowl: size options, One of a kind badge, quantity hidden
- [ ] Board: size/wood/style/juice groove, engraving on, care kit add-on
- [ ] A product with a custom Crafting time shows that time instead of the default
- [ ] A Ready to ship product shows the right badge and message
- [ ] A product with tracked quantity 0 shows "Currently unavailable" and a disabled button

**Policy links**
- [ ] Footer: Shipping, Returns & Refunds, Privacy, Terms, Accessibility all open the right page
- [ ] Product page shipping and returns links work
- [ ] Policies appear at checkout
- [ ] No `[BRACKETS]` remain in any policy

**SEO metadata**
- [ ] View source on Home, a collection, a product, and FAQ: unique `<title>` and meta description
- [ ] Canonical tag present
- [ ] Paste a product URL into Google's Rich Results Test: Product and Breadcrumb detected, no errors
- [ ] FAQ URL in Rich Results Test: FAQPage detected
- [ ] Share a product link in a message app: correct image and title appear
- [ ] `/sitemap.xml` and `/robots.txt` load
