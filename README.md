# PurBlu website

Eleventy static website implementing the shared foundation plus all nine introduction modules from `web_plan/action.md` step 4. Step 5 now includes the About story modules and expanded contact, press, pre-order, and harvest-list pages. The recipe page remains a placeholder by request. Ordering remains gated pending verification and terms; harvest-list signup uses Sender with a hosted-form fallback.

For service URLs, account IDs and operational context, see [Systems handoff](docs/system-handoff.md).

## Simple overview
Most of the files and directories in this repository are used to generate the static html files in `dist/`. If you want to change the code or content or images in one of those files, change the corresponding markdown (text) or the template referenced from the markdown files. Never change `dist/` directly because your changes will get wiped out.

To deploy changes to the porkbun website, push to main or better yet, merge in a PR from a separate branch. See details below. 

### Initial setup for making and viewing changes
If this is unfamiliar, feel free to ask ChatGPT/Codex to install and set this up for you. 
If you are using Windows 11, you may find it beneficial to install WSL, but that shouldn't be necessary.

1. Install `git` and clone repo `https://github.com/deichholz/purblu-web.git`
  - git cli OR
  - github's Desktop App at `https://desktop.github.com/download/`
2. Install `node` (I recommend using a tool called `nvm` to install, but just get it installed any way that works)
3. Install `pnpm` 


## Run locally

Use Node.js 22 or newer and pnpm 11.19.0. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Eleventy (normally `http://localhost:8080/`). Changes reload in the preview. Restart the server after changing plugins or build configuration. Stop with Ctrl+C.

```sh
pnpm build
pnpm validate:build
```

Production build deletes only generated `dist/` and rebuilds it. Build validation checks the required routes, links, resources, file types, file sizes, and publication boundaries described in `validation/build-contract.json`. Do not edit or commit `dist/`; never store source work there. The lockfile pins dependencies. No CMS, backend, service secrets, or customer data are stored here.

## Periodically, you may be prompted to update packages.
- This will usually happen as a Pull Request from 
## Build validation contract

`validation/build-contract.json` is the reviewable publication contract. Add generated pages to `requiredFiles`. Add a customer-facing destination to `requiredExternalLinks` with the exact generated pages where its anchor must remain present. Put third-party scripts and stylesheets in `requiredExternalResources`. Use `forbiddenExternalLinks` for destinations that must not yet be exposed, and `forbiddenPaths` for source or internal material that must never enter the public artifact.

`scripts/validate-build.mjs` implements these checks against `dist/`. It always requires both `index.html` and `intro/index.html`, validates local HTML links and assets, rejects symbolic links and non-regular entries, enforces Porkbun's 40 MB per-file limit, and confirms the production origin appears in every generated page. The validator checks that required external destinations are present in the intended output; it does not make network requests to third-party sites. Remote availability checks should be kept separate so a temporary Facebook, Instagram, Sender, or other provider outage cannot publish a partial site or make a valid build nondeterministic.

The unverified pre-order destination remains forbidden in generated anchors while `_data/harvest.json` keeps `orderUrlVerified: false`. When the complete redirected destination and all ordering gates are verified, update the site data and validation contract together.

## Automated publication branch

`main` contains editable source and documentation. A push to `main` runs `.github/workflows/deploy-porkbun.yml`, builds and validates the site with read-only repository access, and passes only the generated artifact to a separate publication job. That job updates the root of the `production` branch with a normal commit. A failed build or validation leaves `production` unchanged, and a build with no output changes creates no empty commit.

The workflow communicates only with GitHub and uses GitHub's temporary repository token to update `production`. It does not contain or use Porkbun, FTP, API, domain, or DNS credentials. Porkbun configuration is managed separately from this workflow.

GitHub's repository-wide workflow-token default is read-only; only the publication job requests `contents: write`. The workflow uses normal fast-forward commits and never force-pushes. GitHub currently reports that repository rulesets are not enforceable for this private repository under the account's present plan, so protection against a trusted collaborator manually deleting or force-pushing `production` depends on repository access control until that plan limitation changes.

### Rollback

For a normal rollback, identify and revert the problematic source change on `main`, push the revert, and let the workflow build, validate, and publish a new `production` commit. Verify the generated routes and ordering state after the workflow completes.

For an emergency rollback, restore the tree from the last verified `production` commit as a new commit at the head of `production`, then push normally. Do not force-push or erase deployment history. Correct `main` before its next automatic deployment; otherwise a later build can restore the problematic output.

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

## Release verification

For site updates, run `pnpm build` and `pnpm validate:build`, then review affected routes, mobile layouts, keyboard navigation, links, forms and download permissions. See `docs/content-register.md` for unresolved business inputs. Verify `/` and the canonical `/intro/index.html` alias after publication, and preserve the explicit `.html` contact/press paths. Do not redirect `/pre-order` to this site unless the existing order routing is deliberately configured.

The `production` branch retains prior generated commits for review and rollback. Actual Porkbun, domain, and DNS changes remain manual and are not performed by this repository.

## Verification performed

Production build and static checks cover all nine generated routes, local links/assets, image dimensions and alt text, the nine introduction modules, press-release listing and article structure, root/alias equality, canonical tags, shared data rendering, and the gated ordering state. Sender submission testing requires an approved address and method.
