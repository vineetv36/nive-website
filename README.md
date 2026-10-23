# Nive Manohar — Field Notes

A responsive static portfolio in HTML, CSS, and vanilla JavaScript. The collection contains 112 supplied images in 11 albums. There are no runtime dependencies, APIs, remote fonts, or mandatory build steps.

## Preview and hosting

Open `index.html` directly, or run from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The site uses relative paths and supports subdirectory hosting. Upload `index.html`, `styles.css`, `script.js`, and `assets/` together. No routing rules or backend are needed. `context.md`, `reference/`, and `tools/` do not need to be deployed.

## Collection

The opening gallery uses the supplied photos that match the design reference:

| Cover | Original |
| --- | --- |
| Europe | `assets/Europe/007.webp` |
| Botanical | `assets/Botanical/003.webp` |
| San Francisco | `assets/San-Francisco/003.webp` |
| Liquid Lens | `assets/Liquid-Lens/001.webp` |

Below the opening gallery, **The collection** lists every album. Expand an album to see all its images. Clicking a cover or album thumbnail opens the original image uncropped; previous/next and arrow keys stay within that album in numbered-file order. Escape and the close button restore focus and page scrolling. Without JavaScript, albums still expand and image links open originals normally.

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

All supplied files remain unchanged in their album folders. `assets/image-manifest.json` is the supplied source inventory; it is not fetched at runtime. Gallery links are explicitly listed in `index.html` so the site needs no directory scanning or local JSON requests.

To replace a photo, replace its original at the same case-sensitive path and refresh its preview using the optional command below, then hard-refresh the browser. Update `width`, `height`, `alt`, and `data-alt` in the HTML if the replacement changes dimensions or subject. To change format, update the original link's `href` as well. Use actual JPEG, WebP, PNG, or AVIF files; convert HEIC/RAW instead of renaming their extensions.

To add an image, duplicate a `figure` in its album's `album-grid`, update its paths, `data-index`, descriptions, dimensions, and visible number, and update the album's counts. Keep `data-album` identical within an album. To add an album, duplicate a `details.album` section and use a new album ID and `data-album` value. New files are not discovered automatically.

## Optional previews

`assets/optimized/` contains generated WebP previews, about 3.9 MB combined versus 86 MB of supplied originals. Featured previews fit within 1280px; other previews fit within 640px. Originals are always the lightbox and normal link targets. Below-the-fold thumbnails load lazily. If a preview is absent, JavaScript retries the original; if the original is also missing, it shows the series placeholder and excludes the unavailable photo from navigation.

After replacing originals, regenerate previews from the repository root:

```sh
# Optional image-maintenance dependency, not needed to view or host the site:
python3 -m pip install Pillow
python3 tools/refresh_previews.py
```

This command reads the photo paths in `index.html` and writes only beneath `assets/optimized/`. It never overwrites originals. Commit changed previews alongside updated originals to avoid stale thumbnails. To omit a preview permanently, point its `<img src>` to the original and remove that photo from the optional regeneration workflow (the script deliberately refuses to overwrite originals).

Edit About and Contact in `index.html`. The supplied Behance profile is linked; add a real email address there when available. The reference image is kept separate from site artwork.

## Validation

Verified all 112 thumbnails and original images in Chromium, album order and wraparound, keyboard focus and scroll restoration, layouts at 320/390/768/1536px, no-JavaScript album links, and missing-preview/original fallbacks. Initial page loading requests only the four cover previews. Preview regeneration was run and all original files still match the supplied SHA-256 inventory.

Check desktop, tablet, and mobile layouts; open each album; navigate its images with buttons and arrow keys; test Tab, Shift+Tab, Escape, focus return, and scroll restoration. Check ordinary image links with JavaScript disabled and subdirectory hosting. Direct `file://` navigation is blocked by the managed test browser, so direct-file loading remains unverified in this environment.
