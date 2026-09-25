# Shared Data Rules

This directory contains the authoritative mutable values used across the site. Keep JSON valid and avoid copying these values into templates or prose.

## `harvest.json`

- Update machine date (`date`) and human date (`displayDate`) together.
- Treat `pickupWindow` and `timezone` as one fact. Customer-facing times are Central (`America/Chicago`) unless explicitly changed.
- `pricePerPound` is numeric so the `money` filter can format it.
- `packagePounds` is the website's authoritative package-size list. Do not restore conflicting sizes from older plans without business confirmation.
- Confirm `pickupAddress`, `productForm`, packaging, size/count, inventory, and delivery separately. A plausible value is not an approved value.
- Keep `productFormConfirmed: false` until the business has signed off on the customer-facing form.
- Allowed availability states currently understood by templates are `unconfirmed`, `open`, `sold-out`, and `closed`.
- Set `orderUrlVerified: true` only after the complete redirected destination works and has been tested safely.
- Do not open ordering without non-empty payment, cancellation, and guarantee terms. The template deliberately requires every gate.
- When a harvest changes, review every field together and rebuild all consuming pages.

## `site.json`

- Keep the canonical public brand name exactly `PurBlu`.
- `origin` must be the reviewed production origin without a trailing slash.
- Add public email, phone, and social accounts only after exact business confirmation.
- `signupUrl` must be the hosted fallback for the same Sender form/account embedded on the harvest-list page.
- `launchReady` is currently true, allowing indexing. Setting it false emits noindex metadata; it does not provide privacy protection.
- `growersReady` controls whether the footer links to the implemented growers section or the About page.

After any data edit, build and inspect the introduction, pre-order, harvest-list, contact, footer, metadata, and any other page that consumes the changed key.

