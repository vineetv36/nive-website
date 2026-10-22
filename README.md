# Nive Manohar — Field Notes

A responsive, static photography portfolio built with HTML, CSS, and vanilla JavaScript. No dependencies, compilation, APIs, or remotely hosted assets.

## Preview

Open `index.html` directly in a browser, or run from this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit port 8000 on your local machine. The site also works under a subdirectory. No routing or server configuration is required.

## Add or replace photographs

Put the owner's original photographs at these exact, case-sensitive paths and refresh the page:

| Path | Series |
| --- | --- |
| `assets/europe.jpg` | Europe |
| `assets/botanical.jpg` | Botanical |
| `assets/san-francisco.jpg` | San Francisco |
| `assets/liquid-lens.jpg` | Liquid Lens |

No photographs were supplied with this project. Missing files display neutral series placeholders and are excluded from the JavaScript lightbox. Adding a file and reloading restores its photo link automatically. If the browser caches an older photo, use a hard refresh. Originals are used directly, with no optimized derivatives to regenerate or become stale.

Use actual JPEG files at the default paths. PNG, WebP, and AVIF also work: update both the link's `href` and the nested object's `data` in `index.html`, plus its MIME `type` (`image/png`, `image/webp`, or `image/avif`). Convert HEIC or camera RAW to a browser format; changing a filename extension does not convert an image. Preserve your originals. Any future optimized derivatives should go in `assets/optimized/` and must not overwrite originals.

Check each photo's description against your supplied image. Update both `data-alt` and the object's `aria-label` if needed. The current descriptions come from the brief. Edit `data-title` for the lightbox title and the placeholder/caption text for visible labels.

To add more photographs, duplicate a `figure` in the clearly marked gallery section of `index.html`, update its paths and labels, and extend the desktop grid rules in `styles.css` as needed. There is no automatic folder scanning. Keep the DOM in the intended reading order.

## Interaction and editing

Available photographs link to their original files, including when JavaScript is disabled. JavaScript enhances these links into a native dialog with an uncropped image, previous/next buttons, arrow-key navigation, Escape to close, contained focus, and focus return. Missing photos remain placeholders. Mobile images use their natural proportions once loaded.

Edit the About and Contact sections in `index.html`. Only the supplied Behance profile is linked; add a real `mailto:` link in Contact when an address is available. Fonts use local system stacks. `reference/option-3.png` is a design reference, not a site image.

## Static hosting

Upload `index.html`, `styles.css`, `script.js`, and `assets/` together, preserving their relative paths. No build command, backend, redirects, or deployment service is required. The brief and reference directory need not be published. This project does not deploy itself.

## Checks

At desktop (1536 × 1024), tablet (768px), and mobile (390px), check navigation, overflow, photo captions, and keyboard focus. Check missing photographs, then add real images at the documented paths and reload. Open each available image; check next/previous, arrow keys, Tab/Shift+Tab, Escape, focus return, and restored page scrolling. Also check direct local-file loading and hosting beneath a subdirectory. With JavaScript disabled, available images should still open as ordinary links.

Implementation validation: Chromium checks passed at widths of 320, 390, 600, 768, 1100, and 1536px, including navigation, placeholders, subdirectory hosting, keyboard lightbox controls, focus/scroll restoration, single-photo galleries, image-load failures, reduced motion, and no-JavaScript links. Photo interactions were checked with temporary image fixtures outside the repository; no owner photographs were supplied. Direct `file://` navigation could not be tested because the managed browser blocks it. The site uses relative URLs and classic scripts without runtime API requests.
