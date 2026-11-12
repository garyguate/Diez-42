# Diez42

Official static website for Diez42, published at https://diez42.org/.

The current release contains the approved logo-blue design, three illustrative hero scenes, and 11 localized program posters in a responsive carousel. Donation and payment features remain deferred to V2.

Working content notes currently describe Diez42 as a Málaga social-action association serving immigrants, refugees, and other newcomers through practical support, education, training, family activities, food support, and community connection. Registry details should be maintained against the municipal record and the organization; the public-facing spelling should remain `Diez42`.

Current visible version: `v314.25`.
Default viewer language: English, with Spanish, Brazilian Portuguese, and German available in the settings panel.
Current controls use a compact settings panel for language, System/Day/Night themes, glass transparency, glass blur, and the visible version.
Review route: `review/elies-website/`, kept as a noindex mirror of the liquid-glass public homepage.
Confirmed WhatsApp and phone: `+34 600 33 97 94`; the phone number is shown under the mailing address while WhatsApp remains a contact action.
Confirmed social links: Instagram `https://www.instagram.com/diez42malaga?igsh=cXNmanN1dmV6Mndy`; Facebook `https://www.facebook.com/share/1XxCNeBHnF/?mibextid=wwXIfr`.
Physical mailing address: `Avenida de Andalucía 27, 29006 Málaga`.

Remote repository: `https://github.com/ec92009/Diez-42`.

## Preview

Run from the repo root:

```sh
python3 -m http.server 8042
```

Open:

```text
http://localhost:8042/?v=314.25
```

Noindex review mirror:

```text
http://localhost:8042/review/elies-website/
```

## Structure

- `index.html` is the active liquid-glass V1 homepage.
- `privacy.html`, `terms.html`, and `data-deletion.html` provide the public policy pages expected on public-facing websites.
- `concepts/04-quiet-foundation.html` redirects old links back to the homepage.
- `Archive/concepts/` contains earlier concept directions for reference only.
- `Media/` contains user-provided Diez42 logo source exports.
- `assets/logo-horizontal.png` and `assets/logo-vertical.png` are cropped web-use logo assets derived from the provided exports.
- `assets/social-preview.png`, favicon PNGs, `assets/favicon.ico`, and `site.webmanifest` provide static SEO/social preview and browser icon assets.
- `assets/styles.css` contains shared styling for the policy pages and older static surfaces.
- `assets/site-version.js` applies the visible version from cache-bust query strings or page labels.
- `assets/site-controls.js` powers the Spanish, English, and Brazilian Portuguese language selector, sun/moon theme toggle, draft translations, and persisted choices in `localStorage`.
- `review/elies-website/` contains the noindex mirror route and the scoped liquid-glass CSS/JS used by the public homepage.

## Working Direction

The current homepage balances warm welcome with practical clarity: a full-bleed photo hero, frosted navigation, program cards, confirmed contact actions, and a restrained transparency section. The archived concepts remain available only as a reference bank for ideas, fonts, colors, sections, and language.

## Editing Rule

Only `index.html` is the active public page. Do not update `Archive/concepts/` just to keep it current. Use the archive as an idea library only, and pull ideas into the homepage or shared assets when needed.

## V1 Scope

- Approved public copy, illustrative hero scenes, and original localized program posters.
- Static privacy policy, terms, and data deletion instruction pages.
- Confirmed WhatsApp action and phone number text.
- Confirmed Instagram/Facebook links and mailing address.
- Warm hero/program photos selected from the shared Diez42 photo folder.
- Inline icons for WhatsApp, Instagram, and Facebook contact buttons.
- Footer kept minimal with no V1 donation note on the page, plus site creation and maintenance credit for Web-By-Elie.com.
- Static titles, descriptions, canonical URLs, homepage Open Graph/Twitter preview metadata, and favicon references.
- Settings panel with language, day/night theme, and glass controls.
- Active homepage plus archived reference concepts.
- No public concept chooser on the homepage.
- No payments.
- No backend.
- No donation form.
- Privacy-safe sessionless WST aggregate page views and CTA presses; no visitor identifiers or form contents.

## Content Caveats

- Maintain public-identity details with Diez42: formal name, CIF, registered address wording, association scope, statutory aims, and preferred contact channels.
- Social presence appears to use `diez42malaga` / `Diez42Malaga`, but final links should come from the organization.
- The provided logo and original program posters are used on the site; the three hero scenes are AI-generated illustrations. Maintain image-rights records as part of ongoing site stewardship.
- Spanish, English, Brazilian Portuguese, and German homepage copy share the same program content; ongoing editorial review remains part of site maintenance.

## V2 Notes

Payments should be revisited only after the legal entity, Spanish bank details, donor receipt language, and Stripe account ownership are settled.

The homepage Programs section contains all 11 Diez42 programs in Spanish, English, Portuguese, and German, with language-specific optimized full-length posters in `assets/programs/`. Original source artwork remains in pCloud.

Program posters display their original localized embedded headings in the shared 9:16 web layout. Lower card panels use logo blue with white copy. Cards use an automatic carousel showing three at a time on desktop, two on tablets, and one on phones; source image files are preserved.

The homepage hero alternates three AI-generated scenes inspired by the real Diez42 rooms (food distribution, adult education, and social support) every seven seconds with a 1.2-second crossfade. Text stays stationary. Visitors can pause or advance photos; reduced-motion preferences start the hero paused, and hidden tabs suspend the timer. Optimized JPEG copies are stored in `assets/photos/hero-food-distribution.jpg` `assets/photos/hero-adult-education.jpg`, and `assets/photos/hero-social-support-notes.jpg`.

On phones, the complete wide hero scene appears above the welcome copy so participants remain visible.

The food-distribution photograph anchors to the top right; education and social-support photographs stay centered as the browser resizes. The desktop hero follows the photographs’ original proportions. Hero text stays 16px from the browser’s left edge; phones retain the complete scene above the copy.

The interface uses the logo blue `#3F77B9` with `#355E8D` and pale blue surfaces. Header logo dimensions are 96 × 68px, without a separate Diez42 text label; the mobile settings gear stays in the header’s top-right corner.

The footer uses the same logo-blue background with white text and links.

The program carousel supports previous/next controls, touch swiping, and Arrow/Home/End keys when focused. Cards advance left by one every six seconds while visible, with a pause/play button and a direct-access program menu. Autoplay pauses on hover, keyboard focus, touch interaction, and hidden tabs; reduced-motion preferences start playback paused. The last group resets to the first without animating backward. All 11 localized cards remain in the static HTML; without JavaScript they use the original grid.

Restored the site to the About Us video milestone (v314.25). Homepage photos remain capped at half the viewport height, rotate automatically without controls, and the About section includes the supplied introduction video. Later content expansion remains available in Git history.

Arabic and Ukrainian translations cover the homepage, program descriptions, settings, privacy, terms and data-deletion pages. Arabic uses RTL text; the program rail retains LTR scroll geometry for consistent navigation. Artwork remains in its existing languages.

The compact settings panel now contains language options only. System theme is always used, with fixed glass opacity 82% and blur 18px.

Settings uses a 210px language-only panel without an About/version row.

The language menu sizes to its text, with compact spacing, viewport height limits and larger touch targets on touch devices.

Removed the homepage Known facts panel and navigation links to it.

The contact heading uses the full association name, with the supplied address Avenida de Andalucía 27, local 7A, 29010 Málaga, an embedded Google map and a direct Maps link.

Contact copy and address appear below individually styled WhatsApp, Instagram and Facebook buttons, beside the map.

The contact association heading is justified to both edges of its column.

The association name spans the full contact panel above the map and social column.

About Us includes the user-supplied mission, vision and open-services statement in all six supported languages, above the existing video.
