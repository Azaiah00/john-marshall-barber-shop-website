# The John Marshall Barber Shop — spec website

A finished, static spec website for **The John Marshall Barber Shop**, 502 E Franklin St, Richmond, VA 23219. The shop has cut hair in Downtown Richmond since 1929. Couture House Co. built this site to pitch to the owner. The pitch line is "we'll bring your address back": the shop's old domain, johnmarshallbarbershop.com, has lapsed.

## Pages
- `index.html`: home page with the "Since 1929" hero, the shop in one line, the menu board, the chair story, a heritage teaser, reviews, the visit block, quick facts, FAQ and a call to action
- `services.html`: full menu and prices, other services, what a hot-towel shave involves, shop etiquette, a gift idea and an FAQ
- `history.html`: scroll timeline from 1929 to today, the Hotel John Marshall and numbered sources
- `visit.html`: hours, address, a stylized map, directions from the Capitol, VCU and Broad Street, and an FAQ
- `404.html`: custom not-found page (it uses root-relative paths, so it works at any URL)

## Tech
- Plain HTML, one stylesheet (`assets/css/site.css`) and one small vanilla JS file (`assets/js/site.js`). There is no build step and no frameworks.
- Fonts are Cormorant Garamond, Josefin Sans and Libre Franklin self-hosted in `assets/fonts` (no third-party requests), with fallback font stacks.
- Motion: a barber-pole reading-progress bar, a year counter that rolls with the history timeline, a gold timeline spine that draws in, a checkerboard floor with parallax, and deco sunbursts that rotate slightly as you scroll. Content is fully visible without JS, and all motion switches off when the visitor has `prefers-reduced-motion` set.
- SEO/AEO/GEO: each page has its own title and description, a canonical URL, Open Graph and Twitter tags, and JSON-LD (BarberShop, WebSite, BreadcrumbList, FAQPage, OfferCatalog). Also included: `sitemap.xml`, `robots.txt` (allows AI crawlers) and `llms.txt`.

## Preview locally
```bash
cd john-marshall-barber-shop
python3 -m http.server 8080
# open http://localhost:8080
```
(Use a local server rather than opening files directly, so the root-relative paths in the 404 page and the manifest resolve.)

## Deploy on Netlify
1. Drag the folder into https://app.netlify.com/drop, or connect a Git repo with the publish directory set to `.` and no build command.
2. `netlify.toml` sets the security headers (including a CSP that allows the one inline script by its hash), cache headers and the custom 404.
3. Add the custom domain under **Domain management** and turn on HTTPS (Let's Encrypt).
4. If you change the inline `<script>` in any page `<head>`, update the `sha256-` hash in the CSP in `netlify.toml`.

## Domain
Register **johnmarshallbarbershop.com** (the shop's former domain, now lapsed). All canonical, Open Graph and sitemap URLs already use it. If the domain can't be recovered, find and replace `https://johnmarshallbarbershop.com` across all files.
