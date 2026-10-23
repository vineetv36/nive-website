# Nive Manohar — Field Notes

A responsive static portfolio in HTML, CSS, and vanilla JavaScript. The collection contains 112 supplied images in 11 albums. There are no runtime dependencies, APIs, remote fonts, or mandatory build steps.

## Preview and hosting

Open `index.html` directly, or run from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The site uses relative paths and supports subdirectory hosting. Upload `index.html`, `gallery.html`, `styles.css`, `script.js`, and `assets/` together. No routing rules or backend are needed. `context.md`, `reference/`, and `tools/` do not need to be deployed.

## Collection

The opening gallery uses the supplied photos that match the design reference:

| Cover | Original |
| --- | --- |
| Europe | `assets/Europe/007.webp` |
| Botanical | `assets/Botanical/003.webp` |
| San Francisco | `assets/San-Francisco/003.webp` |
| Liquid Lens | `assets/Liquid-Lens/001.webp` |

The separate **Gallery** page (`gallery.html`) adapts the supplied reference website’s “Things worth a second look” section: staggered album covers, category filters, and a “Surprise me” button. The homepage’s Gallery link, invitation, and four featured photos lead to this page; photo links target their matching album covers. Each of the 11 gallery covers opens its complete album. The top navigation stays visible while scrolling on both pages, with About and Contact linking to the homepage sections. Filters change the visible covers, and Surprise me chooses from that selection. Previous/next and arrow keys stay within the selected album in numbered-file order. Escape and the close button restore focus and scrolling. Without JavaScript or native dialog support, a complete expandable album library remains available below the covers; ordinary links open originals.

| Folder | Images |
| --- | ---: |
| `Europe` | 23 |
| `Botanical` | 8 |
| `San-Francisco` | 5 |
| `Liquid-Lens` | 12 |
| `3D-Investigations` | 12 |
| `Lifecycle-of-a-Seedling` | 11 |
| `Light-on-Head` | 10 |
| `Reconstructive-Oranges` | 10 |
| `Refill-9PM` | 11 |
| `Tomb` | 7 |
| `Vascular-Anatomy` | 3 |

## Maintain photographs

All supplied files remain unchanged in their album folders. `assets/image-manifest.json` is the supplied source inventory; it is not fetched at runtime. Gallery links are explicitly listed in `gallery.html` so the site needs no directory scanning or local JSON requests.

To replace a photo, replace its original at the same case-sensitive path and refresh its preview using the optional command below, then hard-refresh the browser. Album entries are in `gallery.html`; homepage previews are in `index.html` and use `data-original` for the original asset while their `href` points to the album page. Update `width`, `height`, `alt`, and `data-alt` in the HTML if the replacement changes dimensions or subject. To change format, update the original link's `href` as well. Use actual JPEG, WebP, PNG, or AVIF files; convert HEIC/RAW instead of renaming their extensions.

To add an image, duplicate a `figure` in its album's `album-grid`, update its paths, `data-index`, descriptions, dimensions, and visible number, and update the album's counts. Keep `data-album` identical within an album. To add an album, duplicate a `details.album` section inside `.album-library` and use a new album ID and `data-album` value. Add a corresponding `.work-card` with a cover in `.work-grid`, assign its category and layout slot, and update filter counts. Keep the cover and library entries’ `data-album` values identical. New files are not discovered automatically.

## Optional previews

`assets/optimized/` contains generated WebP previews, about 4.3 MB combined versus 86 MB of supplied originals. Featured previews and album covers marked `data-preview-size="1280"` fit within 1280px; other previews fit within 640px. Originals are always the lightbox and normal link targets. Below-the-fold thumbnails load lazily. If a preview is absent, JavaScript retries the original; if the original is also missing, it shows the series placeholder and excludes the unavailable photo from navigation.

After replacing originals, regenerate previews from the repository root:

```sh
# Optional image-maintenance dependency, not needed to view or host the site:
python3 -m pip install Pillow
python3 tools/refresh_previews.py
```

This command reads the photo paths in both `index.html` and `gallery.html` and writes only beneath `assets/optimized/`. It never overwrites originals. Commit changed previews alongside updated originals to avoid stale thumbnails. To omit a preview permanently, point its `<img src>` to the original and remove that photo from the optional regeneration workflow (the script deliberately refuses to overwrite originals).

Edit About and Contact in `index.html`. The supplied Behance profile is linked; add a real email address there when available. The reference image is kept separate from site artwork. The Selected observations section uses the Instrument Serif and JetBrains Mono font files supplied with the reference website, served locally from `assets/fonts/`; its styling is scoped to that section.

## Validation

Verified all 112 thumbnails and original images in Chromium, album order and wraparound, keyboard focus and scroll restoration, layouts at 320/390/768/1536px, no-JavaScript album links, and missing-preview/original fallbacks. Initial page loading requests only the four cover previews. Preview regeneration was run and all original files still match the supplied SHA-256 inventory.

The replacement gallery was also checked at all four widths, with category counts and layout reflow, Surprise me within the selected category, all 112 originals through the new covers, reduced motion, and the no-JavaScript fallback.

The page split was verified on desktop, tablet, and mobile: sticky navigation, one H1 per page, cross-page links, album fragments below the header, filters, lightboxes, no-JavaScript navigation, and preview discovery across both files.

Check desktop, tablet, and mobile layouts; open each album; navigate its images with buttons and arrow keys; test Tab, Shift+Tab, Escape, focus return, and scroll restoration. Check ordinary image links with JavaScript disabled and subdirectory hosting. Direct `file://` navigation is blocked by the managed test browser, so direct-file loading remains unverified in this environment.
