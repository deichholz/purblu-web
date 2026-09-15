# Content and flow register

Reviewed September 10, 2026. Internal development record; excluded from the public build.

## Approved inputs and sources

- Brand, voice, colors, and typography: `../../web_plan/design-guide.md`.
- Harvest: September 26, 2026, 9 am–5 pm Central. Month/day/window from action.md; year also supported by Data_Sheet.docx.
- Price: \$22/lb for 1, 5, and 10 lb packages, all from action.md resolutions. No discount. Shared values in `_data/harvest.json`.
- Pickup address: 16650 Pueblo Blvd, Jordan, MN 55352, from AGENTS.md and action.md's address-only resolution. Do not add directions or delivery promises.
- Product draft: whole, head-on, shell-on; supported by website plan and Data_Sheet.docx. Packaging material, preparation state confirmation, size/count, available inventory, minimum order beyond listed package sizes, and delivery policy still need business confirmation.
- Local growing and farm pickup are supported by the project instructions. Broad sustainability, chemical-free, freshest, or no-pollutant claims are not used.

## Customer journeys

1. Hero Pre-order shrimp → `/pre-orders/index.html`. Displays the resolved price, packages, date, pickup address/window. No order is accepted. The supplied external destination returned HTTP 302 to `https://purblushrimp-com.l.ink/pre-order`, then HTTP 404 on September 10. Keep `orderUrlVerified` false until the complete destination works. Payment, cancellation, and guarantee terms remain unknown. Published CTA requires verified URL, open availability, and all three terms.
2. Hero Get harvest alerts → `/harvest-list/index.html`. Shows an honest coming-soon state until a working hosted Sender signup URL is entered. No fake submit or success behavior. Unknown: list ID, URL/embed, consent/confirmation behavior, test method. Planned fields: first name, last name, email; optional phone and ZIP. Suggested copy: “Hear about upcoming PurBlu harvests and pre-order announcements.” Internal intended cadence is one week before and harvest day; owner agreement still needed before promising it publicly.
3. Footer Press and Contact lead to expanded supporting pages. The Facebook and Instagram destinations now use the exact business URLs in the project instructions.
4. Footer About opens the implemented growers section at `/#growers`; that module also links to the full `/about/index.html` story.

## Open facts

- Preferred public email. `hello@purblushrimp.com` is listed internally but is not silently treated as approved public contact. The operations phone from the project instructions is published with an Operations label.
- Payment timing, cancellation/refund terms, and exact reservation guarantee.
- Current available pounds, harvest size/count, delivery, packaging material, product-form signoff.
- Working pre-order destination and Sender signup integration.
- Final publication permissions and complete captions for every team/farm image.
- Press approval, final contacts and release date, ministry wording, and downloadable photo rights.

No launch is included in this request. `site.launchReady` remains false (noindex); noindex is not access control. All nine step 4 modules are implemented, with unavailable terms and integrations stated honestly. Step 5 now includes the About modules plus expanded contact, press, pre-order, and harvest-list pages. The recipe page was explicitly skipped, and ordering/signup integrations remain future work.
