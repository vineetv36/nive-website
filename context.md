# Build brief: Nive Manohar — Field Notes

## Task

Build a complete, responsive, static photography portfolio using the selected **Option 3: Field Notes** design. The theme is **curiosity**: a visual journal of things that made the artist pause. Implement the website from this brief; do not merely produce another plan. Make reasonable implementation decisions without requiring clarification. Do not publish or deploy without a separate request.

The accompanying `reference/option-3.png` is the visual target. Inspect it before implementing. It is a design reference, not an image to use as the page background. Recreate its layout using real HTML, CSS, text, and individual photographs. The detailed specification below remains sufficient if this file is supplied alone.

## Technical constraints

- Use semantic HTML, CSS, and small amounts of vanilla JavaScript. No React, framework, package manager, mandatory build step, backend, database, authentication, or API.
- The finished site must work on ordinary static hosting and when opening `index.html` locally. Use relative paths, classic deferred scripts, and no runtime `fetch` of local JSON or directory listings.
- Keep all artwork local in `assets/`. Do not hotlink Behance images or depend on external services, CDN scripts, or remotely hosted fonts.
- Deliver editable source files, not a flattened screenshot. Keep text selectable and navigation accessible.
- Use one page with anchor sections and a progressively enhanced photo lightbox. No server routing or rewrite rules.
- Keep implementation and operational instructions out of the visitor-facing design.

## Project organization

Keep this `context.md` at the project root. Create `index.html`, `styles.css`, `script.js`, and a concise `README.md` explaining preview, photo replacement, and static hosting. Keep the supplied `reference/` separate from site imagery.

Provide an `assets/` directory for the owner's full-resolution photographs. Preserve originals; never overwrite, retouch, upscale, recolor, watermark, or recompress them. Generated web-size derivatives, if created, belong in `assets/optimized/` and must never be necessary for the basic site to work. Optional font files belong in `assets/fonts/`.

### Photo mapping

Use these exact default filenames, relative to the project root:

| File | Visible label | Series title | Subject / suggested alt text |
| --- | --- | --- | --- |
| `assets/europe.jpg` | `001 / Places` | Europe | Pedestrians on a European cobblestone street beside striped café umbrellas and hanging flowers. |
| `assets/botanical.jpg` | `002 / Reflections` | Botanical | Colorful water lilies and lily pads reflected in a pond. |
| `assets/Europe/023.webp` | `003 / Passing moments` | Europe | Golden light trails forming a loose figure against a dark background (Europe image 23/23). |
| `assets/liquid-lens.jpg` | `004 / Experiments` | Liquid Lens | Translucent rectangular forms arranged as an experimental still life. |

The subject descriptions come from the original portfolio previews; check them against supplied full-resolution photos and correct the alt text if necessary. Do not invent dates, exact locations, camera settings, or stories.

The owner can drop images into `assets/` with those filenames, replacing existing files, and refresh. No compilation, database update, or remote upload workflow should be required. Filename case matters. JPEG, PNG, WebP, and AVIF are acceptable when the HTML paths are updated to match; explain this in the README. HEIC and camera RAW files should be converted to a browser-friendly format before use. Do not blindly change their extensions.

If the images are absent, complete the site with intentionally styled neutral placeholders at the correct sizes and short series labels. Avoid broken-image icons and do not fabricate photographs. Missing items must not open an empty lightbox. Replacing a missing image at its documented path and reloading must restore normal behavior. A plain static website cannot automatically discover arbitrary files in a folder; new photos require adding entries to the clearly marked gallery HTML. Do not promise automatic directory scanning.

## Visual direction

Match the selected mockup closely rather than redesigning it. This is an art portfolio with the feel of a field notebook: generous space, bold editorial typography, a contact-sheet arrangement, small observational captions, and restrained blue pen marks. Let photography carry the color.

- Background: warm off-white, approximately `#F5F3EF`.
- Text: near-black, approximately `#202020`.
- Rules: muted gray, approximately `#96938D`, 1px.
- Annotation accent: vivid cobalt blue, approximately `#2455FF`.
- Use a bold neo-grotesk sans-serif for headlines, a clean sans-serif for navigation and brand, and a monospace face for captions and notes. Prefer a locally available licensed font if supplied; otherwise use Helvetica/Arial and a system monospace stack. Do not block implementation on downloading fonts.
- No rounded cards, drop shadows, gradients, stock icons, glass effects, decorative camera logos, or generic marketing sections.

### Desktop composition

At approximately 1536px viewport width, use about 54px side padding, fluid width, and a maximum inner width around 1600px. Tune against the reference rather than treating these values as rigid.

1. **Masthead:** `NIVE MANOHAR` at top left in widely tracked uppercase, roughly 23px. Place `Gallery`, `About`, and `Contact` at top right, around 17px with relaxed spacing. A thin horizontal rule spans the content width below. Header height is roughly 73px. Avoid a bulky sticky header.
2. **Hero:** large, very bold, tightly spaced heading on the left: `Follow your` on line one and `curiosity.` on line two. Desktop size approximately 110–125px, line-height 0.93–1, letter-spacing around -0.045em. It occupies approximately two-thirds of the width. A small monospace note sits upper right: `An ongoing collection of things that made me pause.` Set it across several short lines at around 18px, with a short thin rule beneath. Leave breathing room around both blocks.
3. **Gallery:** begin about 320px from the page top at the reference viewport. Three columns in approximately 30% / 40% / 30% proportions, with 16px gaps. The left Europe photograph is a tall crop. The middle botanical photograph is an equally tall, wider crop. The right column stacks Europe image 23/23 above the Liquid Lens photograph. The full image region is roughly 490px tall. Place the Passing moments caption between the two right images; place the other captions below their images. Prioritize the composition rather than forcing every source into its native aspect ratio on the homepage.
4. **Captions:** monospace, approximately 15px, with numbered labels from the table. Use short thin horizontal rules to extend the caption rows. Surround 001, 002, and 004 with restrained irregular cobalt loops. Add one thin curved blue arrow from near 002 toward 004, below the captions, suggesting a visual connection. Implement these small marks with inline SVG; keep them decorative, hidden from accessibility APIs, and noninteractive. Do not draw over photo subjects or create illegible overlaps.
5. **Lower invitation:** after generous space and a full-width rule, show `What catches your eye?` in large black type, approximately 64–72px, with a simple right-pointing arrow aligned near the far right. Make this a real link to the gallery. Do not introduce filters or content that has not been provided just to give it a destination.

The header, hero, four photos, and beginning of the lower invitation should broadly match the reference's first desktop screen. Do not insert a large additional marketing block above them.

### Below the reference viewport

Add restrained About and Contact sections to make the navigation useful without changing the initial composition. Keep them brief, separated by thin rules. Use the supplied artist name and this approved general About line: `An ongoing collection of places, reflections, passing moments, and experiments.` Do not invent biography, credentials, clients, exhibitions, availability, or a home city.

No email address or social account other than Behance has been supplied. The Contact section should link to `https://www.behance.net/nivemanohar` with clear text such as `Connect on Behance ↗`. Do not create a nonfunctional contact form or fake email. The README should explain where a real email address can later be added.

## Responsive behavior

- Use fluid typography and spacing rather than shrinking a desktop screenshot.
- Tablet: reduce headline size and use a two-column photo layout, preserving reading order: Places, Reflections, Passing moments, Experiments. Let the hero note sit beside or below the headline as space permits.
- Mobile at 375–430px: use about 20px side padding, a compact masthead, and visible compact navigation that may wrap cleanly. The heading should stay expressive at roughly 50–64px without clipping. Place the note below it. Stack the photographs and their captions in reading order. Prefer natural photo proportions or gentler crops here.
- Hide or reposition the connecting arrow when columns stack. Blue loops may remain around numbers. Never allow decorative marks to create horizontal scrolling.
- Keep About and Contact easy to reach and all controls comfortably tappable.

## Photo interaction and accessibility

- Each available photo should be a semantic link to its full-resolution original. Without JavaScript it must still open the photo normally.
- With JavaScript, enhance links into an accessible lightbox showing the uncropped full image using `object-fit: contain`, its series title, a visible close button, and previous/next controls.
- Support Escape to close, arrow keys to move, focus containment while open, and focus return to the triggering link. Prevent background scrolling while open and restore it correctly. An accessible native dialog is preferred when supported; retain the ordinary image links as fallback.
- Use semantic landmarks, one H1, logical headings, useful alt text, a skip link, visible keyboard focus, and adequate contrast. Decorative arrows and blue loops must not be announced.
- Keep hover effects subtle: a small caption change or minimal image movement. No scroll hijacking, custom cursor, autoplay, mandatory animation, or drag-only interaction. Respect reduced-motion preferences.

## Images and performance

Use explicit aspect ratios or dimensions to prevent layout jumps. Lazy-load below-the-fold imagery and use asynchronous decoding where appropriate. Do not lazy-load the main first-screen images indiscriminately. If full-resolution inputs are large and image tooling is available, create separate responsive derivatives and reference them with `srcset`; retain the original as the lightbox target. Document the optional regeneration step after replacing an original. The simplest drop-in mode must keep working with originals alone. Avoid displaying stale derivatives after a documented replacement workflow.

## Completion checks

Before handing over the implementation:

- Inspect desktop around 1536×1024, tablet around 768px wide, and mobile around 390px wide. Compare the desktop composition to `reference/option-3.png` if available.
- Confirm all navigation, image links, lightbox controls, and keyboard interactions work.
- Confirm ordinary static hosting, subdirectory hosting, and local `index.html` work without runtime API requests or module-loading errors.
- Verify missing-photo placeholders, then verify a supplied photo renders from its documented filename. Never delete or modify an original to test this.
- Check that no text clips, no horizontal scrollbar appears, no broken images remain, and every photo can be viewed uncropped.
- Deliver the finished files and a concise explanation of photo replacement. Report checks actually performed and any limitations honestly.

Prioritize fidelity to the Field Notes reference and ease of maintaining a small static portfolio. Do not add ecommerce, accounts, a CMS, analytics, or third-party tracking.
