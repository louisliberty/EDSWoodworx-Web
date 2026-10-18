# 6. Owner Handoff Guide for Ed

This is written for you, Ed. Everything happens in your Shopify admin at **admin.shopify.com**. You won't need to touch code.

The three places you'll use most:
- **Products** – add or change pieces, prices, photos, and options
- **Orders** – see and fulfill what people bought
- **Online Store → Themes → Customize** – change words and photos on the website, lead times, and availability

---

## 1. Connect edswoodworx.com to Shopify

1. In Shopify, go to **Settings → Domains → Connect existing domain** and type `edswoodworx.com`.
2. Shopify shows two records. Log in to wherever you bought the domain (GoDaddy, Namecheap, Squarespace, etc.) and open its DNS settings:
   - **A record**: name `@`, value `23.227.38.65`
   - **CNAME record**: name `www`, value `shops.myshopify.com`
   (Use whatever values Shopify displays if they differ.)
3. Delete any old A or CNAME records for `@` and `www` that point elsewhere.
4. Back in Shopify, click **Verify connection**. It can take up to 48 hours. SSL (the padlock) is added automatically.
5. Set `edswoodworx.com` as the **primary domain**.
6. Set up a business email (for example ed@edswoodworx.com) through your domain provider or Google Workspace, then enter it in **Settings → Store details** and in the theme (step 5 below).

## 2. Set up payments

1. **Settings → Payments → Activate Shopify Payments.** Enter your business details, bank account, and tax ID (SSN or EIN).
2. Leave **PayPal** on if you'd like; many older shoppers trust it.
3. Turn on **Shop Pay, Apple Pay, and Google Pay** in the same screen. They make phone checkout faster.
4. Set **Payment capture** to automatic (most common) or manual if you'd rather charge when you start a piece.

## 3. Set up taxes and shipping

**Taxes**
1. **Settings → Taxes and duties → United States.** Add the states where you're registered to collect sales tax (usually your home state to start).
2. Shopify calculates rates automatically. Ask a tax professional whether you need to register anywhere else as sales grow.

**Shipping**
1. **Settings → Shipping and delivery → General shipping rates.**
2. Enter the address you ship from.
3. Add **package sizes** you actually use (a small pen box, a bowl box, a board box) with weights.
4. Create rates. Simplest choice: **calculated USPS/UPS rates** (Shopify Shipping) so customers pay what it costs. Or flat rates such as "Standard shipping $[RATE]."
5. Name rates so people remember the crafting time, e.g. **"Standard – ships after crafting"**.
6. If you offer free shipping over an amount, add a free rate with a minimum order price, then update the announcement bar.
7. **Local pickup** (only if you want it): Settings → Shipping and delivery → Local pickup.
8. Leave international zones **off** unless you decide to ship abroad.
9. Weigh every product and enter the weight on the product, so calculated rates are right.

## 4. Create products and collections

**First, one-time setup (15 minutes)**
- **Settings → Custom data → Products**: add the metafield definitions listed in `05-implementation-specs.md` (Summary, Crafting time, Wood species, Dimensions, Care instructions, Engraving enabled, and so on). Pin the ones you'll use.

**Add a product**
1. **Products → Add product.**
2. **Title:** e.g. "Hand-Turned Walnut Pen".
3. **Description:** two short paragraphs (use the samples in `04-website-copy.md`).
4. **Media:** add at least 4 photos (see section 6).
5. **Price.** Leave "Compare-at price" blank.
6. **Inventory:** for made-to-order pieces, uncheck **Track quantity**. For a finished piece you have in hand, track quantity = 1 and set "Ready to ship" to true below.
7. **Shipping:** enter weight.
8. **Variants:** click **Add options like size or color**. Example for a board: Option "Size" → Small, Large. Set each variant's price.
9. **Product type:** Pen, Bowl, or Cutting Board (this sorts it into the right collection automatically).
10. **Metafields** (bottom of the page): fill in Summary, Wood, Dimensions, Finish, Care. Turn on Engraving if you offer it.
11. **Search engine listing:** click Edit and write a title and description (see the table in `01-strategy-and-sitemap.md`).
12. Set **Status** to Active and click **Save**.

**Turn a product on or off:** change Status to **Draft** (hidden) or **Active** (visible).

**Update a price:** open the product → change the price (or each variant's price) → Save.

**Add or remove options:** open the product → Variants → edit option values or delete a variant → Save.

**Collections**
1. **Products → Collections → Create collection.**
2. Create **Pens**, **Bowls**, **Cutting Boards**: choose **Automated**, condition "Product type is equal to Pen" (or Bowl / Cutting Board).
3. Create **Featured**: choose **Manual** and add the pieces you want on the homepage. Drag to reorder.
4. Give each collection an image and the description from the copy doc.

**Add a future category** (for example, serving trays): create the collection, then add it to the menu (Online Store → Navigation → Main menu → Add menu item). Optionally add a tile on the homepage in the theme editor.

**Update homepage featured products:** add or remove products in the **Featured** collection. The homepage updates on its own.

## 5. Update lead times and workshop availability

1. **Online Store → Themes → Customize.**
2. Click the **gear icon (Theme settings) → Workshop & lead times.**
3. Change **Standard crafting time** (e.g. "7–10 business days") and **Personalized or custom crafting time**.
4. To show monthly capacity, check **Show workshop availability message** and edit the text, e.g. "Accepting 12 made-to-order projects this month." Uncheck it when it's no longer true.
5. Click **Save**. Every product page, the cart, collection pages, and the Made to Order page update together.

A single product that takes longer: fill in its **Crafting time** metafield. It overrides the site default for that product only.

Also in Theme settings:
- **Contact & requests:** business email, response time, and the switch that turns the Custom Request form on.
- **Workshop & lead times → Brand claims:** check "I confirm pieces are made in the United States" only if that's accurate. Then the homepage says "Handcrafted in America."

## 6. Add product photos and alt text

1. Shoot in window light; get a clean main shot, a grain close-up, an in-use shot, and a scale or underside shot (see the photography guide in `02-design-system.md`).
2. Square photos work best for products. At least 2000px wide.
3. On the product page in admin, drag photos into **Media**. The first photo is the one on cards.
4. Click each photo → **Add alt text**. Describe what's there in one plain sentence: "Walnut pen with chrome clip resting on an open notebook."
5. To show a specific photo when someone picks a variant, open that variant and choose its image.
6. Homepage and page photos: in the theme editor, click the section → **Select image**. Add alt text in **Content → Files**.

## 7. Configure policy pages

1. **Settings → Policies.**
2. Paste each template from `08-policy-templates.md` into Shipping, Refund, Privacy, and Terms of Service. Replace every [BRACKET].
3. Shopify can generate privacy and terms templates too; compare them and keep what fits.
4. Add **Contact information** (required by Shopify for some regions).
5. **Have an attorney review** the final versions. These are templates, not legal advice.
6. **Settings → Customer privacy:** turn on the cookie banner if you sell to regions that need it. The footer's "Cookie preferences" link appears automatically.
7. Accessibility Statement: **Online Store → Pages → Accessibility Statement**, then edit its text in the theme editor (it uses the Accessibility template).

Policies automatically appear in the footer and at checkout.

## 8. Test checkout before launch

1. **Settings → Payments → Shopify Payments → Manage → Enable test mode.**
2. On the live site, add a product with engraving and a gift message, go through checkout, and pay with Shopify's test card `4242 4242 4242 4242` (any future date, any CVC).
3. Check that the engraving and gift message show on the order in **Orders**, and that the confirmation email arrived with the made-to-order note.
4. Try it on your phone too.
5. **Turn test mode off.** Cancel and archive the test orders.

## 9. Handle made-to-order orders after purchase

A simple routine:

1. **New order email arrives.** Open it in **Orders**. Read the line-item details (Engraving, Gift message, Personalization notes) and the order **Note**.
2. **If anything is unclear** (spelling, wood choice), email the customer before starting. Use "Contact customer" on the order.
3. **Tag the order** "In the workshop" (Tags box on the right) so you can filter what's in progress.
4. **Make the piece.** If it will take longer than the stated time, email the customer as soon as you know.
5. **Pack it.** Print the packing slip from the order (More actions → Print packing slip). Include the gift message card if there is one.
6. **Create the label:** click **Fulfill item** → buy a label through Shopify Shipping (or enter tracking from another carrier) → check **Send shipping details to customer**. They get an email with tracking.
7. Remove the "In the workshop" tag.

**Discount codes** (only when you want them): **Discounts → Create discount → Amount off products/order**, set the code and end date. Nothing in the theme advertises discounts.

## 10. Finalize before launch

Use the full checklist in `07-launch-checklists.md`. The decisions only you can make:

- [ ] Business email
- [ ] Standard and personalized crafting times
- [ ] Shipping rates and free-shipping threshold (or none)
- [ ] Return window, what's final sale, and damage-reporting window
- [ ] Prices for every product and option
- [ ] Wood species, sizes, finishes, and care product recommendations
- [ ] Whether the bowl/board finish is food-safe (with the product name of the finish)
- [ ] Whether engraving costs extra
- [ ] Gift box / care kit: offer or not, and price
- [ ] Whether pieces are made in the U.S. (to enable "Handcrafted in America")
- [ ] Business address requirements (Shopify and email law require a physical mailing address in marketing emails; a P.O. box or virtual mailbox is fine)
- [ ] Payment, tax registration, and bank details
- [ ] Your story for Our Story and the homepage
- [ ] Real photos to replace every placeholder
