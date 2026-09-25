# Content and flow register

Initially reviewed September 10, 2026; configuration references updated September 25, 2026 against local source. Internal development record; excluded from the public build.

## Approved inputs and sources

- Brand, voice, colors, and typography: `../../web_plan/design-guide.md`.
- Harvest: September 26, 2026, 9 am–5 pm Central. Month/day/window from action.md; year also supported by Data_Sheet.docx.
- Price: \$22/lb for 1, 5, and 10 lb packages, all from action.md resolutions. No discount. Shared values in `_data/harvest.json`.
- Pickup address: 16650 Pueblo Blvd, Jordan, MN 55352, from AGENTS.md and action.md's address-only resolution. Do not add directions or delivery promises.
- Product draft: whole, head-on, shell-on; supported by website plan and Data_Sheet.docx. Packaging material, preparation state confirmation, size/count, available inventory, minimum order beyond listed package sizes, and delivery policy still need business confirmation.
- Local growing and farm pickup are supported by the project instructions. Broad sustainability, chemical-free, freshest, or no-pollutant claims are not used.

## Customer journeys

1. Hero Pre-order shrimp → `/pre-orders/index.html`. Displays the resolved price, packages, date, pickup address/window. No order is accepted. The supplied external destination returned HTTP 302 to `https://purblushrimp-com.l.ink/pre-order`, then HTTP 404 on September 10. Keep `orderUrlVerified` false until the complete destination works. Payment, cancellation, and guarantee terms remain unknown. Published CTA requires verified URL, open availability, and all three terms.
2. Hero Get harvest alerts → `/harvest-list/index.html`. Loads the configured Sender form and retains the hosted `site.signupUrl` fallback. End-to-end submission testing still requires an approved address and method. Internal intended cadence is one week before and harvest day; owner agreement is needed before promising it publicly.
3. Footer Press and Contact lead to expanded supporting pages. The Facebook and Instagram destinations now use the exact business URLs in the project instructions.
4. Footer About opens the implemented growers section at `/#growers`; that module also links to the full `/about/index.html` story.

## Open facts

- Public contact values are maintained in `_data/site.json`; older proposed contacts must not override that record.
- Payment timing, cancellation/refund terms, and exact reservation guarantee.
- Current available pounds, harvest size/count, delivery, packaging material, product-form signoff.
- Working pre-order destination and end-to-end Sender submission verification.
- Final publication permissions and complete captions for every team/farm image.
- Press approval, final contacts and release date, ministry wording, and downloadable photo rights.

All nine introduction modules, the About modules, contact, press, pre-order, and harvest-list pages are implemented. The recipe page remains an intentional placeholder. Indexing is enabled in `_data/site.json`; ordering remains gated by destination verification, availability, and terms.
