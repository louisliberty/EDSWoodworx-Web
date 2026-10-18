# 2. Visual Design System

The look is a well-kept American woodshop: warm, orderly, and quiet enough that the wood does the talking. The one recurring signature is the **growth-ring mark**, an end-grain cross-section with an off-center pith and a single radial check. It appears in the logo, on every Made to Order badge, and in the footer. Everything else stays disciplined.

All tokens live at the top of `assets/base.css`.

## Color

| Token | Hex | Role | Contrast on Cream |
|---|---|---|---|
| Walnut | `#3A281C` | Headings, nav, primary buttons, logo | 12.7 : 1 |
| Walnut Deep | `#2A1D14` | Button hover, footer background | — |
| Charcoal | `#23201C` | Body text | 14.7 : 1 |
| Cream | `#F8F3EA` | Page background | — |
| Parchment | `#EDE3D1` | Alternate sections, summary panels, placeholders | — |
| Oak | `#8A5420` | Links and accent text | 5.6 : 1 |
| Honey | `#C8924A` | **Fills only** (step numbers, dashed owner notes). Never text on cream (2.5 : 1). Walnut on honey is 5.1 : 1. | — |
| Forest | `#2E4A3B` | Made-to-order badge, lead-time accent, success messages | 8.8 : 1 |
| Stone | `#5E5246` | Secondary text, hints | 6.9 : 1 |
| Rule | `#8C7B68` | Form borders and meaningful dividers | 3.7 : 1 (meets 3:1 for UI) |
| Error | `#9B2C1F` | Errors, always with an icon and words | 6.9 : 1 |

Colors are deliberately **not** editable in the theme editor, so contrast can't be broken by accident.

**Section rhythm on the homepage:** cream → cream → **walnut** (Made to Order) → cream → parchment → cream → parchment → parchment (email). The single dark band makes made-to-order the most memorable moment on the page.

## Typography

| Role | Face | Notes |
|---|---|---|
| Headlines, product names, wordmark | **Lora** (Shopify font library, `lora_n4`) | A bookish, slightly calligraphic serif: heritage without costume. Regular weight for display, semibold for H3 and "EDS". Italic used once: the second hero line. |
| Body, nav, forms, prices, checkout-adjacent | **Assistant** (`assistant_n4`, 700 for bold) | Open, plain, very legible at small sizes. Matches Shopify checkout's neutral feel. |

Both are served by Shopify's CDN with `font-display: swap` and preloaded. They can be swapped in Theme settings → Typography.

**Scale** (1.25 ratio, 18px base, `html { font-size: 112.5% }`):

| Token | Size | Use |
|---|---|---|
| `--text-sm` | 16px | Hints, badges, footer, fine print (never smaller) |
| `--text-base` | 18px | Body, buttons, form inputs |
| `--text-md` | 22.5px | Intro paragraphs, card titles, accordion labels, H3 |
| `--text-lg` | 28px | Product price, sub-section heads |
| `--text-xl` | 35px | H2 |
| `--text-2xl` | 44px | H1 on inner pages, product title |
| `--text-hero` | 42–74px fluid | Homepage headline only |

Line height 1.6 for body, 1.15 for headings. Line length capped at 66ch. No all-caps labels, no tracked-out eyebrows, no novelty or distressed type.

## Spacing & layout

8px base: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 104`. Page max width 1404px (78rem) with fluid gutters (20–45px). Sections get 72px top and bottom; "tight" sections 48px.

Content is **left-aligned** everywhere (easier to scan for older readers, and it suits the plainspoken voice). Headings use `text-wrap: balance`.

## Shape

Small, consistent corners by role, like a tool edge, not a pill:
- Controls (buttons, inputs, chips): 4px
- Images: 2px
- Badge: fully rounded, because it echoes the ring mark

No drop shadows. Separation comes from background color and 1px rules.

## Components

**Buttons**
- Primary: Walnut fill, Cream text, 48px min height (56px "large" on product page and hero).
- Secondary: Walnut 2px outline, fills on hover.
- Light: Cream fill, for use on the Walnut band.
- Disabled: Parchment with Stone text and a text label ("Not available right now"), never just greyed out.
- Labels say what happens: "Add to cart", "Check out", "Send message", "Send request".

**Made to Order badge** (`snippets/mto-badge.liquid`)
- Default: forest outline pill, small ring icon, text "Made to order".
- "Ready to ship": walnut outline with check icon (only when the product's `ready_to_ship` metafield is true).
- "Currently unavailable": stone dashed outline with info icon.
- The text always carries the meaning, so it works for color-blind visitors and screen readers.

**Lead-time box** (`snippets/lead-time-note.liquid`)
Parchment panel with a forest left rule and clock icon. Bold lead, then one plain sentence with the crafting time, then a smaller line about shipping. Sits directly above Add to Cart and in the cart summary.

**Product card**
Square image → category in Stone → product name in Lora → price + badge. The whole card is clickable through a single link (one tab stop per product). A subtle 3% image zoom on hover is the only card motion, and it's disabled under reduced motion.

**Forms**
- Visible labels above every field, bold Walnut.
- Hints in Stone between label and input, connected with `aria-describedby`.
- Inputs: 48px min height, 1.5px Rule border, white fill, 3px Oak focus ring.
- Errors: red border plus icon plus a sentence that says how to fix it. A linked error summary appears at the top of the form and receives focus.
- Required fields marked with an asterisk explained at the top of the form.

**Variant options**
Radio buttons styled as chips. Selected = Walnut fill with Cream text (shape and fill change, not only color). Unavailable combinations show the add button as "This combination isn't offered."

**Accordions**
Native `<details>`/`<summary>`, so they're keyboard and screen-reader friendly with no script. "+" / "–" indicator in Oak.

**Process steps**
The only numbered device on the site, because it's a real sequence. Lora numerals in Honey circles.

## Logo

- **Wordmark:** "EDS WoodWorx" set in Lora, "EDS" in semibold, "WoodWorx" in regular. Text-first, so it's live text on the site.
- **Maker's mark:** concentric growth rings with an off-center pith and one radial check line, inside a circle. Pure line art in one color.
- **Stamp variant:** ring mark inside a double circle with "EDS WOODWORX / MADE BY HAND" on arcs, for branding irons, labels, and packaging.

Files in `/brand`: `eds-ring-mark.svg`, `eds-woodworx-lockup.svg`, `eds-stamp.svg`. All single-color Walnut; recolor to black, white, or Cream as needed. Convert text to outlines before sending to an engraver or stamp maker. Minimum ring-mark size: 16px on screen, 0.375 in (10mm) in print or burn. The ring mark alone is the favicon and social profile icon.

## Responsive behavior

| Width | Behavior |
|---|---|
| < 480px | Single-column product grid; hero stacks text over image; full-width buttons on product page |
| 481–989px | 2-column product grid; category tiles become 3 columns at 750px |
| ≥ 990px | 3-column product grid (4 for featured/related); product page splits gallery / sticky buy box |
| ≥ 1280px | Full horizontal navigation replaces the menu button |

Header is sticky and compact (76px). The mobile menu is a full-width panel with 56px rows.

## Motion

Minimal and user-triggered: button color changes, accordion open, card image hover. All transitions are disabled when the visitor's device requests reduced motion. No carousels, autoplay video, parallax, or scroll-triggered animation.

## Photography direction

- **Light:** natural window light or soft, diffused shop light. Avoid harsh flash and heavy filters.
- **Grain first:** focus sharply on the wood surface. Shoot at least one raking-light detail per product so figure shows.
- **Backdrops:** cream paper, warm gray, Ed's dark bench, or plain unfinished wood. Keep props minimal (a notebook for a pen, bread for a board).
- **Mix:** for every product, 1 clean isolated shot (square), 1 grain close-up, 1 in use or in hand, 1 scale reference or underside/maker's mark.
- **Authenticity:** hands at work, shavings on the lathe bed, real tools. No stock photos.
- **Specs:** shoot at 2400px+ on the long edge; upload JPG at quality ~85. Shopify serves WebP/AVIF automatically.

**Required image list**
1. Hero: finished bowl, pen, and board on the bench (portrait 4:5)
2. Category: pens (4:5), bowls (4:5), cutting boards (4:5)
3. Each product: 4+ gallery images (square)
4. Ed at work portrait (4:5)
5. Workshop details: lathe, turning tools, wood blanks, sanding, finishing, packing (square)
6. Gifting/packaging shot (only if gift options are offered)
7. Social share image (1200 × 628)

**Alt text guidance:** say what's in the photo and what's distinctive, in under 125 characters. "Walnut bowl, about 8 inches across, with dark swirling grain on the rim." Not "bowl image" or a keyword list. Decorative category tiles and thumbnails already have text labels and use empty alt.
