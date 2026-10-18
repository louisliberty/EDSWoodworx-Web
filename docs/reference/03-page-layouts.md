# 3. Page Layouts (Wireframes)

Desktop layouts shown; the mobile column order is noted under each. `[■ Photo]` marks an image slot.

## Global header and footer

```
┌───────────────────────────────────────────────────────────────────────────┐
│  Made to order in Ed's workshop  |  Free shipping on orders over $[AMT]   │ ← Walnut bar
├───────────────────────────────────────────────────────────────────────────┤
│ (◎) EDS WoodWorx   Shop Pens Bowls Cutting Boards Our Story Made to Order │
│                    FAQ Contact                           [🔍] [👤] [🛍 2] │ ← sticky
└───────────────────────────────────────────────────────────────────────────┘
Mobile: [☰]  (◎) EDS WoodWorx  [🔍][🛍]   → ☰ opens full-width panel, 56px rows

FOOTER (Walnut Deep)
┌──────────────────┬────────────┬──────────────┬─────────────────────────┐
│ (◎)              │ Shop       │ Help         │ Policies                │
│ EDS WoodWorx     │ Shop All   │ Made to Order│ Shipping Policy         │
│ One-line blurb   │ Pens       │ FAQ          │ Returns & Refunds       │
│ [BUSINESS EMAIL] │ Bowls      │ Shipping &   │ Privacy Policy          │
│ City, ST (opt.)  │ Cutting    │  Returns     │ Terms of Service        │
│                  │  Boards    │ Contact      │ Accessibility Statement │
│                  │            │ Our Story    │ Cookie preferences      │
├──────────────────┴────────────┴──────────────┴─────────────────────────┤
│ © 2026 EDS WoodWorx. Handmade by Ed.                    [ig][fb][pin]  │
└────────────────────────────────────────────────────────────────────────┘
```

## Homepage

```
HERO
┌──────────────────────────────────┬────────────────────────────────┐
│ Handcrafted in Ed's workshop     │                                │
│ (italic serif; "in America" only │        [■ Photo 4:5]           │
│  after Ed confirms)              │   Bowl, pen, and board on the  │
│                                  │   bench in window light        │
│ Pens. Bowls. Boards.             │                                │
│ Made by Hand.   ← H1, 2 lines    │                                │
│                                  │                                │
│ EDS WoodWorx makes practical...  │                                │
│ [Shop the Collection] [How Made  │                                │
│                  to Order Works] │                                │
│ (◎) Accepting [X] projects...    │  ← only if availability is on  │
└──────────────────────────────────┴────────────────────────────────┘
Mobile: text first, then image.

SHOP BY CATEGORY
  Shop by category  (H2)
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │[■ 4:5]   │ │[■ 4:5]   │ │[■ 4:5]   │
  │Pens      │ │Bowls     │ │Cutting   │
  │one line  │ │one line  │ │ Boards   │
  │Shop pens │ │Shop bowls│ │Shop ...  │
  └──────────┘ └──────────┘ └──────────┘

MADE TO ORDER (Walnut band)
  (◎ Made to order)
  Made when you order. Built with care.  (H2)
  Body copy
  ① You choose your piece   ② Ed makes it in the workshop   ③ It ships to your door
  Current crafting time: [X–Y] business days before shipping.
  [Learn About Made to Order]

FEATURED PRODUCTS
  From the workshop (H2) / A few pieces Ed is making now.
  [card] [card] [card]
  [Shop all pieces]

WHY EDS WOODWORX (Parchment)
  ─────────── ─────────── ─────────── ───────────   ← 2px walnut rule on top of each
  ✋ Made by   ≋ Real wood  ◡ Made for   🎁 Thoughtful
     hand        real char.   use          gifts

ABOUT ED
  [■ Ed at lathe 4:5]  │ From Ed's bench to your home. (H2)
                       │ Story placeholder paragraph
                       │ [Meet Ed and the Workshop]

BUILT FOR GIFTING AND EVERYDAY USE (Parchment, image right)
  Copy │ [■ Wrapped piece with card]
  (Replaced or joined by "What customers say" once real reviews exist)

EMAIL SIGNUP (Parchment)
  Notes from the workshop (H2)
  Get workshop updates, new releases, and occasional notes...
  [ Email address ______________ ] [Sign up]
  Unsubscribe anytime. Privacy Policy.
```

## Collection page (Shop All, Pens, Bowls, Cutting Boards, future)

```
Home / Shop / Pens                                ← breadcrumbs
Pens  (H1)
Collection description (2 sentences)
(◎ Made to order)  Most pieces are made after you order. Current crafting
                   time: [X–Y] business days before shipping. How it works.
───────────────────────────────────────────────────────────────────────
6 pieces                                      Sort by [Featured      ▾]
───────────────────────────────────────────────────────────────────────
┌────────┐ ┌────────┐ ┌────────┐
│[■ 1:1] │ │[■ 1:1] │ │[■ 1:1] │      Card = image / category / name /
│Pens    │ │Pens    │ │Pens    │             price + badge
│Name    │ │Name    │ │Name    │
│$[PRICE]│ │$[PRICE]│ │$[PRICE]│
│(◎ MTO) │ │(✓Ready)│ │(◎ MTO) │
└────────┘ └────────┘ └────────┘
                 [1] [2] [›]                      ← only if > 24 products
```
Sort options: Featured, Newest, Price: Low to High, Price: High to Low. **Filters are off** and appear only when Ed turns them on (recommended at ~20+ products). Empty collection shows "New pieces are on the bench." with two buttons.

## Product page

```
Home / Pens / Hand-Turned Wooden Pen
┌───────────────────────────────────────┬───────────────────────────────────┐
│                                       │ (◎ Made to order) (≋ One of a kind)│
│          [■ Main image 1:1]           │ Hand-Turned Wooden Pen   (H1)     │
│                                       │ $[PRICE]                          │
│                             [🔍 Zoom] │ A smooth, balanced writing        │
│                                       │ instrument turned by hand...      │
├────┬────┬────┬────┬────┐              │ ┌───────────────────────────────┐ │
│[■] │[■] │[■] │[■] │[■] │ thumbnails   │ │🕑 Made to order. This piece is │ │
└────┴────┴────┴────┴────┘              │ │ made after you order it...    │ │
                                        │ │ Shipping is calculated at...  │ │
                                        │ └───────────────────────────────┘ │
   (gallery column)                     │ Wood: [Walnut][Maple][Cherry]     │
                                        │ Hardware: [Chrome][Gold]          │
                                        │ ───────────────────────────────── │
                                        │ Engraving (optional)              │
                                        │ Up to 20 characters...            │
                                        │ [___________________]  18 left    │
                                        │ Preview: ┆ For Dad, 2026 ┆        │
                                        │ Gift message (optional) [______]  │
                                        │ ☐ Add a gift box (+$[PRICE])      │
                                        │ Quantity [–][1][+]                │
                                        │ [        Add to cart        ]     │
                                        │ Questions? Contact Ed. Shipping · │
                                        │ Returns                           │
                                        │ ▾ Details (spec list)             │
                                        │ + Materials & finish              │
                                        │ + Care                            │
                                        │ + Made to order & shipping        │
                                        │ ≋ Grain, color, and figure vary...│
                                        │ [Reviews app block, when added]   │
└───────────────────────────────────────┴───────────────────────────────────┘
YOU MIGHT ALSO LIKE (Parchment)   [card][card][card][card]
```
Mobile order: gallery → thumbnails → badges → title → price → summary → lead time → options → extras → quantity → full-width Add to cart → help links → accordions. The buy box is sticky on desktop only.

## Cart

```
Your cart (H1)
┌────────────────────────────────────────────┬──────────────────────────┐
│ [■] Hand-Turned Wooden Pen        $[TOTAL] │ Order summary            │
│     Walnut / Chrome                        │ Subtotal        $[X] USD │
│     $[PRICE] each   (◎ Made to order)      │ Shipping and taxes are   │
│     Engraving: For Dad, 2026               │ calculated at checkout.  │
│     Gift message: Happy retirement!        │ ┌──────────────────────┐ │
│     [–][1][+]   Remove                     │ │🕑 Made to order...    │ │
│ ────────────────────────────────────────── │ │ [X–Y] business days..│ │
│ [Update cart]                              │ └──────────────────────┘ │
│                                            │ [      Check out       ] │
│ Note for Ed (optional)                     │ Checkout is handled      │
│ [________________________________]         │ securely by Shopify.     │
│                                            │ Shipping · Returns · FAQ │
└────────────────────────────────────────────┴──────────────────────────┘
```
Empty cart: "Your cart is empty." + [Shop all pieces] [How made to order works].

## Our Story

```
Our Story (H1) / intro
[■ Ed portrait] │ Meet Ed (H2) / story placeholders
What the shop stands for (H2): Careful work · Useful design · Real materials · Patience · Small-batch work
Why wood? (H2) │ [■ Wood blanks]          (parchment, image right)
[■ Grain close-up] │ The mark of handmade (H2)
In the workshop (H2): 6-photo grid with captions (lathe, tools, blanks, sanding, finishing, packing)
See what's on the bench (H2) → Shop all pieces / contact Ed
```

## Made to Order

```
Made to Order (H1) / intro
What "made to order" means (H2)
Why it takes a little longer (H2, parchment)
Choose → Crafted → Shipped (H2, walnut band, 3 numbered steps,
                            current crafting times, availability)
Order and shipping updates (H2)
Every piece is a little different (H2, parchment)
What can be customized (H2, usually / usually not lists)
More details: Shipping policy · Returns · FAQ
```

## FAQ

```
Frequently Asked Questions (H1) / intro
Orders and timing (H2)                 ← topic headings
 + Are all products made to order?     ← native accordion
 + How long will my order take?
 + Will my item look exactly like the photo?
Wood, options, and personalization (H2)
 ...
Still have a question? Contact Ed.
```

## Contact

```
Contact Ed (H1) / intro
┌──────────────────────────────────────┬────────────────────────────┐
│ Fields marked * are required.        │ Other ways to reach Ed     │
│ Name *        [__________]           │ Ed typically responds      │
│ Email *       [__________]           │ within [X] business days.  │
│ Order number (optional) [____]       │ Email: [BUSINESS EMAIL]    │
│ Topic *       [Choose a topic ▾]     │ Special-request invitation │
│ Message *     [__________]           │                            │
│ [Send message]                       │                            │
└──────────────────────────────────────┴────────────────────────────┘
```

## Custom Request (hidden until enabled)

```
Custom Requests (H1)
Intro: limited availability, not all requests accepted, Ed replies before any work.
Name* · Email* · Project type* · How will it be used?* · Preferred size ·
Preferred wood · Budget range* · Date you'd like it by · Details ·
Reference photos (reply to Ed's email with attachments)
"Sending this form is a request, not an order..."
[Send request]
When disabled: info panel "Custom requests are paused right now."
```
