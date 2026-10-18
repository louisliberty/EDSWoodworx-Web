# 4. Website Copy

All of this copy is already loaded into the theme templates. This document is for Ed to read and approve in one place. **Anything in [BRACKETS] is a placeholder Ed must replace or delete before launch.** Edit live copy in Online Store → Themes → Customize.

Voice check for every edit: short sentences, plain words, first-hand and specific. Avoid "elevate," "curated," "artisanal," "heirloom," "luxury," and any claim Ed can't back up.

---

## Homepage

**Announcement bar**
> Made to order in Ed's workshop | Free shipping on orders over $[AMOUNT]

(Delete the second half if free shipping isn't offered.)

**Hero**
- Small line: *Handcrafted in Ed's workshop* (switches to *Handcrafted in America* only after Ed checks "I confirm pieces are made in the United States" in Theme settings)
- Headline (H1): **Pens. Bowls. Boards. / Made by Hand.**
- Body: EDS WoodWorx makes practical, lasting pieces from real wood—created one at a time in Ed's workshop.
- Buttons: **Shop the Collection** · **How Made to Order Works**

**Shop by category**
- **Pens:** Hand-turned writing tools with natural character.
- **Bowls:** Useful, one-of-a-kind pieces for the table and home.
- **Cutting Boards:** Hardworking boards made for kitchens, gatherings, and gifts.

**Made to order**
- Badge: Made to order
- Headline: **Made when you order. Built with care.**
- Body: EDS WoodWorx is a small workshop, not a warehouse. Each order is crafted individually, so the grain, tone, and small details are uniquely yours.
- Steps:
  1. **You choose your piece.** Pick a pen, bowl, or board, plus any options like size, wood, or engraving.
  2. **Ed makes it in the workshop.** Your piece is shaped, sanded, finished, and checked by hand after you order.
  3. **It ships to your door.** Ed packs it carefully and sends it on its way. You'll get tracking by email.
- Line: Current crafting time: [X–Y business days] before shipping.
- Button: **Learn About Made to Order**

**Featured products**
- Heading: **From the workshop**
- Sub: A few pieces Ed is making now.
- Button: Shop all pieces

**Why EDS WoodWorx**
- **Made by hand.** Every piece is shaped, sanded, finished, and inspected in Ed's workshop.
- **Real wood, real character.** No two pieces share the same grain, color, or figure.
- **Made for use.** Built for writing, serving, cooking, giving, and enjoying.
- **Thoughtful gifts.** Personalized options make meaningful gifts for milestones and everyday moments.

**About Ed**
- Headline: **From Ed's bench to your home.**
- Body: After years of [CAREER/BACKGROUND], Ed traded schedules for sawdust and began building useful things from wood. What started with a few pieces in the workshop grew into EDS WoodWorx—a small shop devoted to careful work, honest materials, and objects meant to be used.
- Button: **Meet Ed and the Workshop**

**Built for gifting and everyday use** (shown until genuine reviews exist)
> A pen for a graduation or a new job. A bowl for a housewarming. A board for the couple who cooks together. Each one is useful from the first day.
>
> Add a gift message on any product page and Ed will include it on a card in the box. [GIFT BOX OR WRAPPING: describe only if offered.]

Button: Shop gifts

**Email signup**
- Heading: **Notes from the workshop**
- Body: Get workshop updates, new releases, and occasional notes from EDS WoodWorx.
- Fine print: Unsubscribe anytime. We don't share your email. Privacy Policy.

---

## Collection descriptions

Paste into each collection's Description field in Shopify admin.

**Shop All**
> Hand-turned pens, wooden bowls, and handmade cutting boards, each made to order in Ed's workshop.

**Pens**
> Hand-turned wooden pens, shaped on the lathe from distinctive hardwoods and finished by hand. They write well, feel good in the hand, and make a practical gift, especially with engraving.

**Bowls**
> Handcrafted wooden bowls, turned one at a time so the grain, color, and character of each piece come through. Every bowl is one of a kind.

**Cutting Boards**
> Handmade cutting boards built for everyday prep, serving, and gifting. Choose your size, and add engraving to make it personal.

**Template for a future category**
> [What it is], made to order in Ed's workshop. [One sentence on what makes it useful or how it's used.]

---

## Sample product pages

Product copy uses Shopify's Description field for the story, and **metafields** for the structured details. Field names match `05-implementation-specs.md`.

### 1. Hand-Turned Wooden Pen

| Field | Value |
|---|---|
| Title | Hand-Turned Wooden Pen |
| Summary (`custom.summary`) | A smooth, balanced writing instrument turned by hand from distinctive hardwood. |
| Crafting time (`custom.lead_time`) | leave blank to use the site default, or "[X–Y business days]" |
| Price | $[PRICE] (set per variant) |
| Options | Wood: [WOOD SPECIES 1] / [WOOD SPECIES 2] / [WOOD SPECIES 3]; Hardware finish: [HARDWARE FINISH 1] / [HARDWARE FINISH 2] |
| Wood (`custom.wood_species`) | [WOOD SPECIES], selected for its grain. |
| Hardware (`custom.hardware`) | [PEN STYLE, e.g., twist ballpoint] with [HARDWARE FINISH] fittings |
| Size (`custom.dimensions`) | Approximately [LENGTH] long |
| Refill (`custom.refill`) | Uses a standard [REFILL TYPE] refill |
| Finish (`custom.finish`) | [FINISH TYPE], polished by hand. |
| Care (`custom.care`) | Wipe clean with a soft, dry cloth. Keep out of long periods of direct sun and heat. Replace the refill as needed; [HOW TO OPEN THE PEN]. |
| Engraving on (`custom.engraving_enabled`) | true, max [20] characters |
| Add-on (`custom.addon_product`) | Gift Box product, label "Add a gift box" — only if offered |
| Made-to-order note | Made after your order is placed. Crafting time: [X–Y business days]. |

**Description**
> Each pen starts as a small block of hardwood. Ed turns it on the lathe, shapes it to sit comfortably in the hand, then sands and finishes it until the grain shows clearly. The result is a pen that's pleasant to write with and good to look at.
>
> Because every blank is different, your pen's grain and color will vary from the photos. Add engraving below for a graduation, retirement, or thank-you gift. [Gift box available as an add-on.]

### 2. Hand-Turned Wooden Bowl

| Field | Value |
|---|---|
| Title | Hand-Turned Wooden Bowl |
| Summary | A one-of-a-kind wooden bowl that celebrates the grain, color, and character of the wood. |
| Options | Size: [SMALL – approx. DIAMETER] / [MEDIUM – approx. DIAMETER] / [LARGE – approx. DIAMETER]; Wood: [WOOD SPECIES], when offered |
| Wood | [WOOD SPECIES] |
| Size | Approximately [DIAMETER] across and [HEIGHT] tall |
| Approx. weight | [WEIGHT] |
| Finish | [FINISH TYPE]. [FOOD-SAFE NOTE: publish only after Ed confirms the finish and its food-safety once cured.] |
| Care | Hand wash with mild soap and warm water, then dry right away. Don't soak it or put it in the dishwasher or microwave. Every so often, rub in a little [RECOMMENDED OIL/CONDITIONER] to keep the wood from drying out. |
| One of a kind (`custom.one_of_a_kind`) | true |
| Made-to-order note | Each bowl is shaped and finished after ordering. Crafting time: [X–Y business days]. |

**Description**
> Every bowl is turned from a single piece of wood and shaped by eye and hand on the lathe. Ed lets the wood guide the final form, so curves, grain lines, and color shifts are unique to your bowl.
>
> Use it for fruit, bread, or salad [only if food-safe is confirmed], or set it out as a centerpiece. The photos show the style and finish to expect. Your bowl will have its own grain, and that's the point.

### 3. Handcrafted Cutting Board

| Field | Value |
|---|---|
| Title | Handcrafted Cutting Board |
| Summary | A durable hardwood cutting board made for everyday prep, serving, and gifting. |
| Options | Size: [SIZE 1 – dimensions] / [SIZE 2 – dimensions]; Wood: [WOOD SPECIES / COMBINATION]; Style: [Edge grain / End grain / Serving board], if offered; Juice groove: No / Yes, if offered |
| Wood | [WOOD SPECIES OR COMBINATION] |
| Size | [DIMENSIONS] (varies by size selected) |
| Approx. weight | [WEIGHT] |
| Finish | [FINISH TYPE] |
| Care | Hand wash with warm, soapy water and dry it right away, standing on edge. Don't soak it or put it in the dishwasher. When the surface looks dry, rub in a thin coat of [RECOMMENDED OIL/BOARD CONDITIONER], let it soak in, and wipe off the extra. |
| Engraving on | true, max [30] characters |
| Add-on | Care Kit product, label "Add a care kit" — only if offered |
| Made-to-order note | Made to order in Ed's workshop. Crafting time: [X–Y business days]. |

**Description**
> A good board is the most-used tool in a kitchen. Ed builds each one from solid hardwood, flattens and sands it smooth, and finishes it for daily use: chopping, slicing, and serving.
>
> Choose your size [and wood], add a juice groove if you'd like one [if offered], and consider engraving for a wedding, housewarming, or anniversary. Grain and color vary from the photos because every board is made from real wood.

**Natural variation note (all products):**
> Each piece is made from real wood, so grain, color, and figure will vary from the photos. That variation is what makes your piece one of a kind.

---

## Our Story

- H1: **Our Story**
- Intro: EDS WoodWorx is one person and one workshop. Here's who makes your piece, and how he thinks about the work.
- **Meet Ed**: After years of [CAREER/BACKGROUND], Ed traded schedules for sawdust and began building useful things from wood. What started with a few pieces in the workshop grew into EDS WoodWorx—a small shop devoted to careful work, honest materials, and objects meant to be used. [HOW ED STARTED WOODWORKING, in his own words.] [A SENTENCE ABOUT THE WORKSHOP, if he wants to share it.]
- **What the shop stands for**
  - Careful work: Each piece is made by Ed and checked by hand before it ships.
  - Useful design: Pens that write well. Bowls that get used. Boards that hold up to real cooking.
  - Real materials: Real wood, chosen piece by piece for its grain and character.
  - Patience: Good finishing takes time. Ed would rather take a few extra days than rush a piece.
  - Small-batch work: One workshop, one maker, a few pieces at a time.
- **Why wood?** Wood is warm in the hand and different every time. A pen blank, a bowl blank, or a board starts with grain that took years to grow, and no two are the same. It's also practical. Cared for properly, wood holds up to daily use, and small marks become part of its story.
- **The mark of handmade** Because every piece is made from real wood, the one you receive will differ from the photos. Grain lines, color, and figure change from board to board and even across a single piece. Small natural features, such as a mineral streak or a shift in tone, are part of the wood, not flaws. If you have a preference, like lighter or darker wood, mention it in the order note and Ed will do his best to match it.
- **In the workshop**: photo grid (lathe, turning tools, wood blanks, sanding, finishing, packing).
- **See what's on the bench**: Browse pens, bowls, and cutting boards made to order. Have something specific in mind? Send Ed a note. → Shop all pieces / contact Ed about a special request.

## Made to Order

- H1: **Made to Order**
- Intro: Every EDS WoodWorx piece is made after you order it. Here's what that means, how long it takes, and what to expect.
- **What "made to order" means**: When you place an order, Ed selects the wood and makes your piece by hand: turning or cutting, shaping, sanding, finishing, and a final check. Nothing comes from a warehouse shelf. Your piece is made for you.
- **Why it takes a little longer**: Mass-produced goods are made ahead and stored. Handwork happens one piece at a time, and some steps can't be rushed, like letting a finish dry properly before a piece is packed. The wait is part of getting something made with care.
- **Choose → Crafted → Shipped**
  1. Choose: Pick your piece and any options. You'll get an order confirmation email right away.
  2. Crafted: Ed makes your piece in the workshop. Engraved or personalized pieces take a little longer.
  3. Shipped: Ed packs it carefully and ships it. You'll get an email with tracking when it leaves the shop.
  - Current crafting time: [X–Y business days]. With engraving or personalization: [X–Y business days]. Shipping time is separate and is calculated at checkout based on your address and shipping method.
- **Order and shipping updates**: You'll receive an email when you order and another when your piece ships, with a tracking link. If anything affects your timing, Ed will email you directly. You can also contact Ed anytime with your order number.
- **Every piece is a little different**: Real wood varies. The grain, color, and figure of your piece will differ from the photos, and that's what makes it yours. Product photos show the style, shape, and finish you can expect.
- **What can be customized**: Usually available: [EDIT]. Usually not available: [EDIT]. Have an idea that isn't listed? Ask Ed. He can't accept every request, but he'll give you a straight answer.
- Links: Shipping policy · Returns and refunds · FAQ

## FAQ

The full question-and-answer set is in the FAQ template (`templates/page.faq.json`) and editable as blocks in the theme editor. Questions included:

Orders and timing: Are all products made to order? · How long will my order take? · Will my item look exactly like the photo?
Wood, options, and personalization: Can I request a different wood species? · Can I personalize or engrave my order? · Can I place a custom order?
Food safety and care: Are the bowls food-safe? · How should I care for my cutting board?
Gifts: Do you offer gift wrapping or gift messages?
Returns, damage, and shipping: Do you accept returns or exchanges? · What happens if my item arrives damaged? · Do you ship outside the United States? · How can I contact Ed about a question?

Answers that depend on unmade decisions use placeholders: [X–Y business days], [ENGRAVING METHOD/COST], [CUSTOM ORDERS], [FOOD-SAFE STATEMENT], [RECOMMENDED OIL], [GIFT WRAP], [RETURN POLICY SUMMARY], [RETURN WINDOW], [DAMAGE REPORTING DAYS], [INTERNATIONAL SHIPPING], [BUSINESS EMAIL], [X business days].

## Contact

- H1: **Contact Ed**
- Intro: Questions about a piece, an order, or an idea for something special? Send a message and Ed will get back to you.
- Form: Name*, Email*, Order number (optional, "Found in your order confirmation email, for example #1001."), Topic* (Product question · Custom request · Existing order · Wholesale or gifting inquiry · Website issue · Accessibility or accommodation request · Other), Message*. Button: **Send message**.
- Success: **Message sent.** Ed typically responds within [X] business days.
- Side panel: **Other ways to reach Ed** — Ed typically responds within [X] business days. Email: [BUSINESS EMAIL]. Have an idea for a special piece? Send a note with what you have in mind. Ed can't take on every request, but he reads each one and will tell you honestly whether it's a good fit.

## Custom Request (hidden until enabled)

- H1: **Custom Requests**
- Intro: Ed takes on a small number of custom pieces when the workshop schedule allows. Not every request is a fit, and availability is limited. Tell him what you have in mind, and he'll reply with honest thoughts, rough timing, and a price before anything starts.
- Closing line: Sending this form is a request, not an order. Ed will review it and reply before any work begins or any payment is taken.
- Success: **Request sent.** Ed will review it and reply within [X] business days. Nothing is started or charged until you both agree on the details.
- Paused state: **Custom requests are paused right now.** Ed is focused on current orders. You can still send a question or browse made-to-order pieces.

## Microcopy

| Moment | Copy |
|---|---|
| Lead time above Add to Cart | **Made to order.** This piece is made after you order it. Please allow approximately [X–Y business days] for crafting before shipment. / Shipping time is separate and is calculated at checkout based on your address and shipping method. |
| Engraving hint | Up to [MAX] characters. We engrave exactly what you type, so please check spelling and capitalization. |
| Personalization hint | Tell Ed what you have in mind. If something can't be done, he'll contact you before starting. |
| Gift message hint | Ed includes it on a card in the box. |
| Unavailable variant | Not available right now |
| Invalid combination | This combination isn't offered |
| Cart lead time | **Made to order.** Pieces in your cart are made after you order. Please allow approximately [X–Y] business days for crafting before shipment, or [X–Y] business days for engraved or personalized pieces. |
| Cart note label | Note for Ed (optional) — Gift details, a delivery date you're hoping for, or anything else Ed should know. |
| Checkout reassurance | Checkout is handled securely by Shopify. |
| Empty collection | **New pieces are on the bench.** Nothing is listed here yet. Browse everything in the shop, or ask Ed about a custom piece. |
| No search results | Try a simpler word like "pen", "bowl", or "board", or browse everything. Can't find what you need? Ask Ed. |
| 404 | **We can't find that page.** The link may be old, or the piece may no longer be listed. |
| Newsletter success | Thanks—you're on the list. |
| Email field error | Enter an email address like name@example.com. |
