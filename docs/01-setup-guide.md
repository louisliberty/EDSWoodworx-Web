# EDS WoodWorx – Setup Guide

How the site works, and how to get it live. Written for a non-technical owner.

## How the pieces fit together

```
GitHub repo (louisliberty/eds-woodworx)
   │  every change pushed to "main"
   ▼
GitHub Actions  ── builds the site and uploads it to HostGator (free)
   ▼
HostGator  ── serves edswoodworx.com (your existing plan)
   │  each product's "Buy now" button links to…
   ▼
Stripe Payment Link  ── secure checkout: address, payment, engraving, gift message
   │  after paying, the customer returns to…
   ▼
edswoodworx.com/thank-you/
```

No new monthly cost: the site runs on your existing HostGator plan. You pay for the domain once a year, and Stripe's per-sale card fee.

## 1. Buy the domain

Buy edswoodworx.com from any registrar, or from HostGator itself. If you buy it from HostGator, it's already pointed at your hosting. If you buy it elsewhere, set its nameservers to the ones HostGator gives you.

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

## 3. Put the site online (HostGator)

The site is uploaded to HostGator automatically by GitHub every time a change is pushed to `main` (see `.github/workflows/deploy.yml`). Set it up once:

**In HostGator (cPanel):**
1. Add edswoodworx.com to your plan. If it's your plan's main domain, the site goes in `public_html`. If you add it as an **Addon Domain**, note the folder cPanel creates for it (for example `edswoodworx.com`).
2. If you bought the domain somewhere else, point it at HostGator using the nameservers HostGator lists in your welcome email or cPanel.
3. **SSL/TLS Status:** make sure the free certificate (AutoSSL) covers edswoodworx.com and www.edswoodworx.com.
4. **FTP Accounts:** create an FTP account whose directory is the site's folder. Note the server name, the full username (it looks like `deploy@edswoodworx.com`), and the password.

**In GitHub** (repo → **Settings → Secrets and variables → Actions**):
1. Under **Secrets**, add:
   - `FTP_SERVER`: the FTP server name from cPanel (often `ftp.edswoodworx.com`, or the server name in your HostGator welcome email)
   - `FTP_USERNAME`: the full FTP username
   - `FTP_PASSWORD`: the FTP password
2. Under **Variables**, add `FTP_DIR` with the site folder relative to the FTP account's home, ending in `/`. If the FTP account's directory is already the site folder, use `./`. Without this variable it uploads to `./public_html/`.
3. Go to the **Actions** tab → **Build and deploy** → **Run workflow**. In about a minute the site is on HostGator.

Never paste these passwords into a chat or a file in the repo. GitHub Secrets keep them hidden, even from Claude.

From then on, every change pushed to `main` goes live automatically, usually within two minutes. If a deploy fails, the Actions tab shows a red ✗ with the reason.

**Before launch:** don't point the domain at HostGator until the placeholders are filled in. Every build prints a list of remaining `[PLACEHOLDER]` spots.

**Alternative:** Cloudflare Pages (free) also works with this repo, with no FTP needed. Use build command `node build.mjs` and output directory `dist`. If you switch, delete the HostGator secrets so the upload step stops running.

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
