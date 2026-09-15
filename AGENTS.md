# PurBlu Website Contributor Guide

This directory is a standalone Eleventy website for PurBlu, a local shrimp business in Jordan, Minnesota. Instructions in this file apply to the entire repository. More specific `AGENTS.md` files under `_data/`, `assets/`, `docs/`, and `templates/` add rules for those areas.

## Product and business context

- The company name is **PurBlu**. Correct `PurBlue`, `PureBlue`, and other variants in user-facing content.
- PurBlu raises shrimp locally in indoor tanks and sells them for local pickup.
- Brand promise: fresh, locally raised shrimp from Jordan, Minnesota, handled with care and sold directly to the community.
- Business goal for the initial batch: sell 1,000 lb; approximately 350 lb covers the estimated batch cost.
- Estimated batch cost is \$7,400 for labor, utilities, feed, and similar operating costs; it excludes startup investment. This is internal business context, not public website copy unless explicitly approved.
- Current public price is \$22/lb with no quantity discount. Pre-orders are intended to guarantee availability, but do not publish that promise until the exact guarantee and terms are approved.
- Current public pickup address: 16650 Pueblo Blvd, Jordan, MN 55352.
- Operations phone: (651) 468-8424.
- Facebook: https://www.facebook.com/PurBluShrimp/
- Instagram: https://www.instagram.com/PurBluShrimp/
- Email campaigns and the harvest list use Sender.net.
- Official logo source folder: https://drive.google.com/drive/u/0/folders/19hqijnyV7oClJeGRmbxEDUZcgfsO5kS3

## Claims and factual boundaries

Write like a knowledgeable local grower speaking to a neighbor: clear, warm, specific, and confident. Prefer “raised in Jordan, Minnesota” or “locally raised” over “locally sourced.” Say “shrimp” rather than generic “seafood.”

Verified internal process notes:

- Larvae are hatched at a farm west of PurBlu in a closed system.
- Feed contains no antibiotics.
- At harvest, shrimp are netted from the tank, placed in chilled salt brine, sorted for quality, packaged/labeled, and kept on ice.
- PurBlu's closed growing system does not create fertilizer runoff into ponds or ocean farms.

Use the narrow, supportable wording already present in the site. Do not expand these notes into health, environmental, or superiority claims. Avoid “chemical-free,” “sustainable,” “the freshest,” “pollution-free,” or similar broad claims unless the business supplies evidence and explicitly approves the final wording.

The current product is planned as whole, head-on, shell-on shrimp. Packaging material, label format, shrimp size/count, inventory, delivery, payment timing, cancellation/refund terms, and the exact pre-order guarantee are unresolved. Do not invent them. Older planning materials conflict on package sizes; the website's current source of truth is `_data/harvest.json`.

## Technology and repository shape

- Static site generator: Eleventy 3.1.2 with ESM configuration.
- Runtime: Node.js 22 or newer is preferred; Eleventy itself requires Node.js 18 or newer.
- Package manager: pnpm; preserve `pnpm-lock.yaml` and use frozen installs in repeatable environments.
- Nunjucks renders `.html`, `.njk`, and Markdown templates.
- `eleventy.config.js` defines collections, filters, passthrough assets, ignored internal files, and `dist/` as output.
- `scripts/build.mjs` removes only generated `dist/` and performs a production build.
- There is no CMS, backend, secret store, or customer database in this repository.

The current `package.json` does not define working `start` or `build` scripts. Until those scripts are deliberately added, use:

```sh
pnpm install --frozen-lockfile
pnpm exec eleventy --serve
node scripts/build.mjs
```

Do not use `pnpm test`; its current placeholder intentionally exits with an error.

## Source versus generated output

- Edit source files, never `dist/`.
- `dist/` is disposable generated output and is excluded from version control.
- `docs/` and `assets/originals/` are intentionally excluded from the public build.
- Only top-level files matching `assets/*.{css,webp,png,ico}` are copied publicly.
- Preserve unrelated local changes. This repository may be entirely or substantially uncommitted; inspect status before editing.
- Never add `.agentbridge/`, `.idea/`, `node_modules/`, secrets, customer data, or test subscriber/order data to version control.

## Site architecture

- `intro/index.html` composes the home page from the `introModules` collection. Pagination generates `/` and `/intro/index.html`; `/` is canonical.
- `intro/*/index.md` owns module copy and front matter. Each file has `tags: introModule`, a numeric `order`, `permalink: false`, and a `template` under `templates/modules/`.
- `about/purblu/index.md` and `about/morning-glory-valley/index.md` are ordered `aboutModule` content records rendered by `/about/index.html`.
- `about/press-releases/*/index.md` contains dated releases tagged `pressRelease`; the collection sorts newest first by ISO `releaseDate`.
- `templates/layouts/` owns the shared page shell. `templates/modules/` owns presentation for composable content modules.
- `_data/harvest.json` is the only source for mutable harvest/order facts.
- `_data/site.json` is the only source for site-wide identity, contacts, social links, integrations, origin, and launch state.
- `assets/site.css` owns the visual system and responsive behavior.
- `docs/` contains non-public provenance, draft copy, open questions, and review records.

Current public routes:

- `/` and `/intro/index.html`: nine-module introduction.
- `/pre-orders/index.html`: harvest details and guarded ordering state.
- `/harvest-list/index.html`: Sender signup page and hosted-form fallback.
- `/about/index.html`: PurBlu and Morning Glory Valley stories.
- `/about/contact.html` and `/about/press.html`: supporting pages.
- `/about/press-releases/shrimp-raised-in-minnesota/index.html`: dated press release.
- `/recipes/index.html`: intentional placeholder pending tested content.

Keep explicit `.html` permalinks for contact and press unless routing and hosting behavior are deliberately migrated and verified.

## Content editing conventions

- Put editable module words, labels, image paths, alt text, and ordering in the module Markdown front matter/body; put markup and presentation in its Nunjucks template.
- Shared harvest facts must be rendered from `harvest`; do not duplicate dates, prices, quantities, availability, or pickup details in prose/templates.
- Use ISO `YYYY-MM-DD` for machine-sortable dates and a separate human-readable display value where needed.
- Escape currency dollar signs as `\$` in Markdown because unescaped dollar signs have caused rendering failures in this project.
- Use sentence case for headings. Reserve all caps for short eyebrow labels.
- Keep customer-facing copy concise, concrete, and free of internal cost/sales targets.
- Never make an unavailable form or ordering flow appear functional. Explain the unavailable state honestly.
- Do not publish draft recipes, biographies, packaging claims, or press materials merely because they exist in `docs/`.

To add an introduction module, create `intro/<module-name>/index.md` with the required collection fields, create `templates/modules/<module-name>.njk`, and choose a unique numeric order. Keep the first level of `intro/` limited to `index.html` and module directories.

To add a press release, copy the structure of an existing release. Supply `tags: pressRelease`, an ISO `releaseDate`, `displayDate`, title, description/dek as appropriate, explicit permalink, and Markdown body. Hero fields are optional; when used, provide accurate alt text and dimensions.

To add a recipe after approval, create a source page under `recipes/`, use `layout: layouts/page.njk`, add a title and explicit permalink, and link it from the recipes index. Verify food-safety guidance against a current authoritative source and kitchen-test recipe yield/timing with harvest-size shrimp before publication.

## Brand and design

PurBlu should feel fresh, local, clean, trustworthy, and premium without being fussy: fresh, not sterile; local, not rustic; knowledgeable, not technical; premium, not exclusive; friendly, not cute.

- Primary teal: `#087F8C`.
- Deep Water text/background: `#173F46`.
- Fresh Water: `#58B8C1`.
- Ice: `#EEF6F7`.
- Lake Mist: `#D8E6E7`.
- Shrimp Coral accent: `#E9785B`; use sparingly for harvest/food emphasis and use dark text on coral.
- Sand: `#F3E8D3`.
- Headings: Montserrat SemiBold/Bold. Body: Source Sans 3. Fallback: Arial, Helvetica, sans-serif.
- Use generous space, clean rectangular layouts, 6–12 px rounded corners, thin dividers, and simple consistent icons. Avoid generic nautical decoration.
- Do not stretch, recolor, rotate, redraw, outline, or shadow the logo. Keep it at least 140 px wide digitally and preserve clear space.

Maintain accessibility: semantic landmarks and heading order, meaningful alt text, visible keyboard focus, usable skip link, sufficient contrast, comfortable touch targets, responsive layouts without horizontal overflow, and labels/status text that do not rely only on color.

## Integrations and launch gates

The ordering CTA is intentionally gated. It may render only when all of these are true:

- `harvest.orderUrlVerified` is `true` after end-to-end verification.
- `harvest.availability` is `"open"`.
- Payment terms are present.
- Cancellation terms are present.
- Guarantee terms are present.

Use `availability: "sold-out"` to close ordering while keeping the harvest-list path available, or `"closed"` for another closure. Do not bypass these gates in a template.

The harvest-list page conditionally loads Sender's universal script through `senderForm` and must retain the hosted `site.signupUrl` fallback. If the form/account changes, update and verify the Sender account identifier and hosted URL together. Test submissions only with an approved address and method; do not send unsolicited email.

`site.launchReady: false` adds `noindex, nofollow`, but it is not access control. Keep it false until a reviewed public release is authorized. A launch requires confirmed hosting/domain setup, working customer journeys, current business facts, approved assets/copy, full route/link/form/accessibility checks, and production verification. Publish only `dist/` to a static host. Do not deploy or change DNS merely because a build succeeds.

## Verification checklist

For normal changes:

1. Run `node scripts/build.mjs` from this directory.
2. Review the generated route(s) in `dist/`; do not edit them.
3. Check changed internal links, external destinations, asset paths, image dimensions, alt text, heading structure, and keyboard focus.
4. Check narrow-phone and desktop layouts when markup or CSS changes.
5. Confirm `/` and `/intro/index.html` still render equivalent content and canonicalize to `/`.
6. Search for inconsistent mutable facts and misspellings of PurBlu.
7. Confirm ordering, signup, publication, and claim gates remain honest.

For harvest changes, update the date, display date, pickup window/timezone, price, packages, pickup address, availability, product form, ordering URL/state, and applicable terms as one coherent review. Verify every page that consumes the shared record.

For launch-affecting changes, also validate every public route, social link, form fallback, page title/description, canonical URL, favicon, responsive breakpoint, image weight, and real-domain behavior. Preserve a reviewed prior build/source revision for rollback.

