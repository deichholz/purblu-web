# Template and Layout Rules

Templates own HTML structure and presentation; content records own editable copy and metadata.

- `layouts/base.njk` owns document metadata, canonical URLs, conditional noindex, fonts, global header/footer, social links, and the conditional Sender loader.
- `layouts/page.njk` is the default supporting-page wrapper.
- `layouts/press-release.njk` renders dated release metadata and optional hero media.
- `modules/*.njk` receive front matter plus rendered Markdown via the `moduleData` filter and Eleventy Render plugin. A module's `template` front-matter value is a rendering declaration, not an Eleventy `layout`.
- Render changing harvest and site-wide values from `harvest` and `site`; never hard-code duplicates.
- Keep the pre-order eligibility conditions intact. Do not expose an external order link by checking only availability or URL presence.
- Load third-party scripts only on pages that need them. Keep a visible hosted-form fallback when Sender is enabled.
- Treat `| safe` as a trust boundary. Use it only for repository-controlled rendered Markdown/markup, never for untrusted visitor or remote input.
- Preserve semantic sections, unique IDs, `aria-labelledby` relationships, skip navigation, heading order, visible focus, lazy loading for non-hero images, explicit image dimensions, and meaningful alt text.
- External links and actions must describe their destination. Do not use nonfunctional buttons, fake success states, or JavaScript-only navigation.
- When adding a module template, pair it with a content record and verify collection ordering, responsive behavior, and both generated home routes.

