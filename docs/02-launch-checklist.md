# Launch Checklist

Run `node build.mjs`. It lists every page that still has a `[PLACEHOLDER]`. The site is ready when that list is empty and everything below is checked.

## Decisions only Ed can make
- [ ] Business email (set up through the domain registrar, Google Workspace, or similar)
- [ ] Standard and personalized crafting times
- [ ] Prices for every product option
- [ ] Wood species, sizes, finishes, and the care oil/conditioner you recommend
- [ ] Whether bowl and board finishes are food-safe, and the product name of the finish
- [ ] Whether engraving costs extra (if it does, make engraved versions separate options with their own price and link)
- [ ] Shipping rates, and whether to offer free shipping over an amount
- [ ] Return window, what's final sale, and how many days customers have to report damage
- [ ] Whether to ship outside the US
- [ ] Whether pieces are made in the US (turns on "Handcrafted in America")
- [ ] Legal business name and a mailing address for the policies (a P.O. box is fine)
- [ ] Ed's story for the homepage and Our Story page
- [ ] Real photos to replace every "Photo:" placeholder

## Setup
- [ ] Domain bought
- [ ] Stripe account activated, branding set, receipts on
- [ ] Payment Link for every product option, with shipping address, custom fields, and the thank-you redirect
- [ ] Links added to `data/products.json`
- [ ] Domain added in HostGator cPanel, free SSL active
- [ ] FTP account created; `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` secrets (and `FTP_DIR` if needed) added in GitHub
- [ ] "Build and deploy" ran with a green check in the GitHub Actions tab
- [ ] Contact form service connected (or the email fallback tested)
- [ ] Policies reviewed (ideally by an attorney); `policies_last_updated` set

## Test before announcing
- [ ] Buy one item with a real card, then refund it in Stripe
- [ ] Engraving and gift message show on the Stripe payment
- [ ] Redirect lands on `/thank-you/`, and the receipt email arrives
- [ ] Contact form message arrives
- [ ] Check every page on a phone: menu, product options, buttons
- [ ] Keyboard only: Tab through the homepage and a product page; focus is always visible
- [ ] Google's Rich Results Test on a product page and the FAQ
- [ ] Submit `https://edswoodworx.com/sitemap.xml` in Google Search Console
