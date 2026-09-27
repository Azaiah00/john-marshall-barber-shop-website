# Launch notes: The John Marshall Barber Shop

Confirm everything below with the owner before launch. The site only shows verified or sourced facts. Items marked "confirm" are on the site with confirm wording, but they still need the owner's sign-off.

## Facts to confirm with the owner
- [ ] **Hours:** Mon–Fri 8 AM–8 PM, Sat 8 AM–5 PM, Sun closed. These come from the Fresha listing, and other directories list different hours. They appear on every page, in the JSON-LD `openingHoursSpecification` and in `llms.txt`.
- [ ] **Prices** (shown as "last published prices, call to confirm"): Cut $24, Cut & Shampoo $30, Cut & Shave $45, Shave $22, Shine $7. The JSON-LD `priceRange` "$7–$45" is based on these prices.
- [ ] **Prices** for beard trims, head shaves, women's cuts and manicures are not published. The site says "call for pricing". Add prices if the owner wants them shown.
- [ ] **Men's manicures:** listed in directories only. The site tags this service "Call to confirm". Remove it if the shop doesn't offer it.
- [ ] **Women's cuts / bobs:** based on the shop's own photos. Confirm the shop still offers them.
- [ ] **Parking:** directories list "free lot parking". Confirm where the lot is and whether it is really free. The site says "call to confirm".
- [ ] **Cards accepted:** AmEx, Visa, Mastercard and Discover, per a directory listing. Also in JSON-LD `paymentAccepted`.
- [ ] **Google rating 4.4 from 135 reviews:** shown on the home page and in the home-page JSON-LD `aggregateRating`. Update the numbers at launch, or remove them if the owner prefers.
- [ ] **Appointments and walk-ins:** the site says "appointments recommended; walk-ins, please call ahead". Confirm this matches how the shop works.
- [ ] **Hugh Campbell:** written as history ("began barbering in 1967", long-time owner/manager, "a 2024 Richmond Magazine profile still found him behind the chair"). The site never says he works there today or gives the year he became owner. Confirm he is happy to be named and quoted.
- [ ] **Quotes used with attribution:** Hugh Campbell in Richmond Magazine (2024), Hugh Campbell on WTVR CBS 6 (2012), and a longtime customer on WTVR (2012). Confirm the owner is comfortable using them.
- [ ] **Customer reviews:** four short paraphrases from older directory reviews, labeled as paraphrased. They are not presented as direct quotes and name no one. Swap in current reviews the owner approves if preferred.
- [ ] **Handprint:** the history page invites visitors to "look down on your next visit" for the handprint and initials in the floor. Confirm it is still visible.
- [ ] **Directions copy:** "Capitol Square is a few blocks east; walk west on Franklin to 5th", "Franklin Street runs east from VCU's Monroe Park campus", "two blocks south of Broad Street; GRTC Pulse buses run along Broad". Check these against the current street layout and transit routes. The visit-page map is a stylized, not-to-scale drawing.
- [ ] **Entrance:** "ground floor, Franklin Street side" of the John Marshall building.
- [ ] **Gift idea copy:** the site doesn't claim the shop sells gift cards, only "call the shop to arrange a visit". If the shop sells gift cards, say so.
- [ ] **Email address:** none was provided, so none appears on the site or in the schema. Add one if the owner wants it.
- [ ] **Facebook:** https://www.facebook.com/thejohnmarshallbarbershop/ is the only social profile linked. Add others (Instagram, Google Business Profile) if they exist.

## Sources cited on the History page
The history page has a numbered notes section. Richmond BizSense (2012), VCU Capital News Service (2018), Richmond Magazine (2012, Feb 2024), WTVR CBS 6 (2012), Wikipedia ("Hotel John Marshall") and the shop's Facebook page are cited by name and year. No article URLs are linked, because only verified links were used. Add direct article links once they have been checked.

## Photo credits and licensing
All photographs come from the business's own public Instagram/Facebook. **The owner must approve and license them before launch.**
- Used: classic-chair (home hero, OG image), shop-interior-wide, barber-at-work, cut-in-progress, straight-razor-shave, front-counter, building-exterior, franklin-street-snow, barber-pole-exterior, two-barbers.
- Customers appear in the background of some photos (barber-at-work, cut-in-progress, straight-razor-shave, shop-interior-wide, two-barbers). Get the owner's OK that the people shown are comfortable appearing, or swap the photos.
- Deliberately **not used**: customer-portrait and since-sign-chair (both center an identifiable customer, and the "Since 2015" sign in since-sign-chair would confuse the 1929 story), barber-in-tie (political artwork in the background and an unidentified birthday), mirror-cards (a personal name and holiday cards), vintage-truck-decor (seasonal). These files are still in `assets/img` and can be deleted before launch.
- The franklin-street-snow caption is deliberately general ("Downtown Richmond on a snowy winter day"), because the street sign in the photo reads N. 3rd St.
- Swap in fresh, professional photos when possible: the barbers at work, the marble floor and handprint, the storefront and the pole.

## Items to swap or finish at launch
- [ ] Register **johnmarshallbarbershop.com** and connect it on Netlify. Canonical, OG and sitemap URLs already use it.
- [ ] Update `sitemap.xml` `lastmod` dates at launch.
- [ ] Create or claim the Google Business Profile, and point its website field at the new domain.
- [ ] The site has no forms (the brief didn't call for one). Calls go through `tel:` links and the sticky mobile call bar.
- [ ] Optional: add real article URLs to the History sources, and add current reviews.

## Proposed domain
**johnmarshallbarbershop.com**: the shop's former domain, now lapsed. Pitch: "we'll bring your address back."


## Live preview domain (updated 27 Sep 2026)
The site is live at https://john-marshall-barbershop-website.netlify.app/ and every canonical URL, Open Graph/Twitter tag, JSON-LD URL, sitemap.xml, robots.txt and llms.txt now points there, so text-message and social link previews show this address.
When the owner's own domain (johnmarshallbarbershop.com) is connected in Netlify, find-and-replace `john-marshall-barbershop-website.netlify.app` with `johnmarshallbarbershop.com` across the .html/.xml/.txt/.toml files, then redeploy.
