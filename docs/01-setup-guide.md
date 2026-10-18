# EDS WoodWorx – Setup Guide

How the site works, and how to get it live. Written for a non-technical owner.

## How the pieces fit together

```
GitHub repo (louisliberty/eds-woodworx)
   │  every change pushed to "main"
   ▼
Hosting (Cloudflare Pages)  ── builds the site and serves edswoodworx.com, free
   │  each product's "Buy now" button links to…
   ▼
Stripe Payment Link  ── secure checkout: address, payment, engraving, gift message
   │  after paying, the customer returns to…
   ▼
edswoodworx.com/thank-you/
```

Monthly cost: **$0**. You pay for the domain once a year, and Stripe's per-sale card fee.

## 1. Buy the domain

You can buy edswoodworx.com anywhere. Simplest option: buy it from **Cloudflare Registrar** when you create your Cloudflare account (step 3). Then the domain and the hosting live in one account, and connecting them takes one click.

If you buy it elsewhere (Namecheap, GoDaddy, Porkbun…), that works too. Cloudflare will show you two "nameserver" values to paste into that registrar's settings.

## 2. Set up Stripe

1. Create an account at stripe.com and finish **Activate payments**: business details, bank account, and identity check.
2. **Settings → Branding:** upload the ring mark (`brand/eds-ring-mark.svg`, or a PNG of it). Set the accent color to `#3A281C`.
3. **Settings → Public details:** add `https://edswoodworx.com/terms/` and `https://edswoodworx.com/privacy/`.
4. **Settings → Customer emails:** turn on **Successful payments** so customers get a receipt.
5. **Shipping rates:** create the rates you'll charge (for example "Standard shipping, $[RATE]").
6. Sales tax: decide with your accountant whether you need to collect it. Stripe Tax can do it automatically, but it's a paid add-on.

### Create a Payment Link for each product option

Each combination a customer can pick on the site (for example "Walnut / Chrome") needs its own Payment Link, because each has its own price.

1. **Product catalog → Add product:** name it like "Hand-Turned Wooden Pen – Walnut / Chrome", set the price, and add a photo.
2. **Payment Links → New:** choose that product, then under options:
   - **Let customers adjust quantity:** on (set a maximum such as 5).
   - **Collect customer addresses → Billing and shipping:** choose United States and add your shipping rates.
   - **Collect phone number:** optional, but helpful for the carrier.
   - **Add custom fields** (up to 3):
     - Text field "Engraving (optional, up to 20 characters)", not required. Only on products that offer engraving.
     - Text field "Gift message (optional)", not required.
   - **After payment → Don't show confirmation page → Redirect to** `https://edswoodworx.com/thank-you/`
3. Copy the link (it starts with `https://buy.stripe.com/`).
4. Send it to Claude with the product and option it belongs to. Claude adds it to the site.

Until a product option has a link, its button reads **"Ordering opens soon"**, so nothing can be bought by accident.

## 3. Put the site online (Cloudflare Pages)

1. Create a free account at cloudflare.com.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**, and authorize GitHub for the `eds-woodworx` repository.
3. Settings:
   - Production branch: `main`
   - Build command: `node build.mjs`
   - Build output directory: `dist`
4. **Save and Deploy.** In a minute or two the site is live at an address like `eds-woodworx.pages.dev`.
5. **Custom domains → Set up a custom domain →** `edswoodworx.com` (and add `www.edswoodworx.com` too).

From then on, every change pushed to `main` goes live automatically, usually within two minutes.

**Before launch:** keep the `pages.dev` address private, and don't connect the domain until the placeholders are filled in. Every build prints a list of remaining `[PLACEHOLDER]` spots.

## 4. Contact form

Until a form service is connected, the contact form opens the visitor's email app with their message filled in. That works once the business email is set, but a form service is friendlier.

Free options: **Web3Forms** (no account, just enter your email to get an access key) or **Formspree** (free account). Send Claude the form address or access key, and Claude will connect it.

## 5. Day-to-day changes

Ask Claude in plain words, for example:

- "Change the email to ed@edswoodworx.com"
- "Set crafting time to 7–10 business days"
- "Add the Stripe link https://buy.stripe.com/… to the walnut pen with chrome hardware"
- "Add a new product: a walnut serving tray, $85, link …"
- "Turn on the workshop availability message: Accepting 10 projects this month"

Claude edits the files and pushes to `main`, and the site updates by itself.

### Adding product photos

Photos go in `assets/images/products/<product-name>/`.

- Shoot square, at least 1600 px wide. Export as JPG (quality ~80) or WebP, under ~300 KB each.
- Send the photos to Claude with a one-line description of each. Claude adds them with alt text, which screen readers and Google use.

### Changing prices

A price lives in **two** places: the Stripe product (what the customer actually pays) and `data/products.json` (what the site shows). Change both. Stripe doesn't let you edit a price on an existing link, so create a new price, then a new Payment Link, and send Claude the new link and price together.

## 6. After an order comes in

1. Stripe emails you about the sale. Open it in the Stripe Dashboard → **Payments**. The engraving, gift message, and shipping address appear on the payment.
2. If anything is unclear, reply to the customer before starting.
3. Make the piece.
4. Buy a shipping label. Pirate Ship (free to use) or the carrier's own website both work.
5. Email the customer the tracking number. A short template:

   > Hi [Name], your [piece] is finished and on its way! Tracking: [number]. Thank you for ordering from EDS WoodWorx. — Ed

Refunds: Stripe Dashboard → the payment → **Refund**.

## 7. Moving to Shopify later

The full Shopify theme is saved on the `shopify` branch of this repo, with its own docs in `docs/shopify-later/`. When sales justify it, connect that branch in Shopify (**Online Store → Themes → Connect from GitHub**), recreate the products there, and point the domain at Shopify. The design and copy are the same, so customers won't notice the switch.
