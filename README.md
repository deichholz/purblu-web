# PurBlu website

Eleventy static website implementing the shared foundation plus all nine introduction modules from `web_plan/action.md` step 4. Step 5 now includes the About story modules and expanded contact, press, pre-order, and harvest-list pages. The recipe page remains a placeholder by request. Unavailable ordering and signup integrations are represented honestly rather than with non-functioning forms.

## Run locally

Use Node.js 22 or newer and pnpm 11.19.0. From `web_site/`:

```sh
pnpm install --frozen-lockfile
pnpm start
```

Open the local URL printed by Eleventy (normally `http://localhost:8080/`). Changes reload in the preview. Restart the server after changing plugins or build configuration. Stop with Ctrl+C.

```sh
pnpm build
```

Production build deletes only generated `dist/` and rebuilds it. Do not edit `dist/`; never store source work there. The lockfile pins dependencies. No CMS, backend, service secrets, or customer data are stored here.

## Structure and editing

- `intro/index.html`: the one introduction composer. Pagination generates identical content at `/` and `/intro/index.html`, both canonicalized to `/`.
- `intro/*/index.md`: text, asset paths, alt text, labels, order, and module-template declarations for the nine introduction modules. Edit copy here without touching layout.
- `about/purblu/index.md` and `about/morning-glory-valley/index.md`: the two stackable About story modules.
- `about/press-releases/*/index.md`: dated press-release content written in standard Markdown. Front matter supplies the title, date, description, permalink, and optional hero image.
- `templates/modules/`: module presentation. Rendered with the Eleventy Render plugin using each module's data and Markdown content. A module's `template` is a rendering declaration, not an Eleventy `layout`: collection content does not include layouts.
- `templates/layouts/base.njk`: header, footer, metadata. `page.njk`: shared supporting-page wrapper.
- `assets/site.css`: brand palette, font choices, fluid typography, responsive layout, keyboard focus and button treatments. Montserrat/Source Sans 3 load through Google Fonts with Arial/Helvetica fallbacks.
- `_data/harvest.json`: single source for changing harvest information.
- `_data/site.json`: verified public contacts, social accounts, signup URL, launch state and About destination readiness.
- `docs/`: source records, press/module/recipe drafts and staged recipe image. **Not published.**
- `assets/originals/`: preserved original logo and generated illustration. **Not published.** Only top-level CSS, WebP, PNG and ICO assets are copied.

To add a module later, create `intro/module-name/index.md` with tag `introModule`, numeric `order`, `permalink: false`, and `template: modules/module-name.njk`. Add its template under `templates/modules/`. The collection sorts by `order`. Keep `intro/` first level limited to `index.html` and module directories. The growers module has `id="growers"`; the footer links there while the full About page remains available from the growers section.

## Routes

- `/` and `/intro/index.html`: the complete nine-module introduction.
- `/pre-orders/index.html`: shared confirmed harvest values with ordering unavailable until verified.
- `/harvest-list/index.html`: Sender-powered harvest-list signup page with a hosted-form fallback.
- `/about/index.html`: PurBlu and Morning Glory Valley story modules.
- `/about/contact.html`, `/about/press.html`: expanded supporting pages.
- `/about/press-releases/shrimp-raised-in-minnesota/index.html`: first dated press release.
- `/recipes/index.html`: intentionally retained as a placeholder.

Contact and press use explicit permalinks because Eleventy otherwise turns these filenames into directory routes.

## Harvest updates and integrations

Update date, display date, pickup window/timezone, price, packages, pickup address and availability together in `_data/harvest.json`. Confirm product form and packaging separately. Price is stored as a number and formatted in the template; escape currency dollar signs in Markdown source notes per project guidance.

The supplied pre-order URL currently redirects to a 404. Keep `orderUrlVerified: false` until the end destination has been checked. Set `availability: "open"` only when confirmed. The external order CTA also requires payment, cancellation, and guarantee terms; all are rendered before it. Use `availability: "sold-out"` to close orders while retaining the harvest-list link, or `"closed"` for another closure. Do not silently turn an unverified guarantee into a promise.

The harvest-list page loads the published Sender popup through Sender's universal script and links to the hosted Sender form as a fallback. The script is enabled only for that page with its `senderForm` front-matter value. Update `site.signupUrl` and the Sender account identifier together if the form changes. Complete end-to-end submission testing using an approved address so no unsolicited customer email is sent.

Populate public email/phone and social URLs only after business confirmation. Social icon links appear only when their exact URLs exist. Keep proposed signup cadence in internal notes until agreed. No contacts, terms, social accounts or inventory were guessed.

## Assets, recipes and press

See `docs/assets.md` for provenance, rights/status, captions and replacement instructions. The hero is a labeled sketch, not actual product photography. Replace both responsive hero files with approved real photos and update the module's alt text/caption and dimensions together. Approved logo is preserved unaltered in originals and proportionately resized for the header. The favicon uses a shrimp-only adaptation with text and long antennae removed for readability at small sizes.

Use `docs/preparation-copy.md` for the drafted cleaning guidance and two recipes. It cites the FDA for handling temperatures and storage. Trial the recipes with harvest-size shrimp and confirm yield before copying to the public recipes page. For a new recipe, create `recipes/recipe-name.md`, set `layout: layouts/page.njk`, a title and explicit permalink; add a link from the recipes index.

The press page lists every item tagged `pressRelease`, newest first. To add a release, copy the structure in `about/press-releases/shrimp-raised-in-minnesota/index.md`, use an ISO `releaseDate` for sorting, provide `displayDate`, and write the release body in Markdown. `heroImage`, `heroAlt`, `heroWidth`, `heroHeight`, and `heroCaption` are optional; omit them for a text-only release. Use `docs/press-copy.md` for prepared company and grower bios. Put approved downloadable images/documents in a dedicated public asset folder rather than copying the whole internal press folder.

## Review and launch later

This scope is saved locally and has not been deployed. `site.launchReady: false` sets noindex on all pages; this is search metadata, not privacy protection. See `docs/content-register.md` for unresolved business inputs. Keep the draft private until later launch review is complete.

When launch is authorized: confirm hosting/domain setup; resolve outstanding flows; finish the requested later modules/pages; verify mobile, keyboard, links, forms and download permissions; replace development illustrations as appropriate; set the chosen production origin; set launchReady true only for the reviewed release; run `pnpm build`; upload **only `dist/`** to the selected static host. Configure HTTPS and directory index serving while preserving `.html` contact/press paths. Check `/` and the canonical `/intro/index.html` alias on the real domain. Do not redirect `/pre-order` to this site unless the existing order routing is deliberately configured.

Retain an archive of the prior deployed `dist/` and source revision. Roll back by restoring that reviewed output on the host, then verify routes and ordering status. Actual provider commands remain pending host selection, rather than invented deployment instructions.

## Verification performed

Production build and static checks cover all nine generated routes, local links/assets, image dimensions and alt text, the nine introduction modules, press-release listing and article structure, root/alias equality, canonical tags, shared data rendering, and inactive unverified order/signup states. Full step 6 launch verification remains a separate task.
