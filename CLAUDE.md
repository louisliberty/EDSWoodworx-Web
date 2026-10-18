# Notes for Claude working on this repo

Shopify Online Store 2.0 theme for EDS WoodWorx, deployed by the Shopify GitHub integration from `main`. Anything pushed to `main` goes live on the connected theme, so keep `main` valid.

## Rules
- Keep the default Shopify folder structure at the repo root. Never move theme folders into a subfolder; the integration only reads the root.
- Shopify's theme editor commits to `main` too. Always `git pull` before editing, and never force-push.
- JSON files under `templates/` and `config/` must stay valid JSON. Validate after every edit.
- Don't invent prices, specs, history, reviews, or policies. Unknown business details stay as `[BRACKETED]` placeholders until the owner provides them.
- Copy voice: plain, short sentences, first-hand. No "elevate", "curated", "heirloom", "eco-friendly", "food-safe", or "American-made" claims unless the owner confirms them.
- Accessibility (WCAG 2.2 AA) and color tokens in `assets/base.css` are deliberate; recheck contrast before changing colors.

## Where common edits go
| Request | File / key |
|---|---|
| Business email | `config/settings_data.json` → `business_email` (also FAQ answer "How can I contact Ed" in `templates/page.faq.json`, and Accessibility text in `templates/page.accessibility.json`) |
| Response time | `config/settings_data.json` → `response_time`; FAQ blocks also mention `[X] business days` |
| Crafting / lead times | `config/settings_data.json` → `lead_time_standard`, `lead_time_custom` |
| Monthly availability message | `config/settings_data.json` → `availability_enabled`, `availability_text` |
| "Handcrafted in America" | `config/settings_data.json` → `usa_claim_confirmed` (only when owner confirms) |
| Custom requests on/off | `config/settings_data.json` → `custom_requests_enabled` |
| Social links | `config/settings_data.json` → `social_instagram`, etc. |
| Announcement bar | `sections/announcement-bar.liquid` defaults, or its settings once saved in the editor |
| Contact page copy | `templates/page.contact.json` |
| FAQ questions/answers | `templates/page.faq.json` (blocks) |
| Homepage copy | `templates/index.json` |
| Our Story / Made to Order | `templates/page.about.json`, `templates/page.made-to-order.json` |

Settings missing from `config/settings_data.json` fall back to defaults in `config/settings_schema.json`; add the key to `settings_data.json` rather than changing the schema default.

Products, collections, menus, policies, order emails, and shipping rates live in Shopify admin, not here. Say so if asked to change them.

To find remaining placeholders: search for `[`.
