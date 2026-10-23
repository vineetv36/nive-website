"""Optional preview refresh: python3 tools/refresh_previews.py (requires Pillow)."""

from html.parser import HTMLParser
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]


class PhotoLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.source = None
        self.size = 640
        self.photos = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and ("data-photo" in attrs or "data-preview" in attrs):
            self.source = attrs.get("data-original", attrs["href"])
            self.size = int(attrs.get("data-preview-size", 1280 if len(self.photos) < 4 else 640))
        elif tag == "img" and self.source:
            # Featured images appear first and receive larger previews.
            if self.source not in self.photos:
                self.photos[self.source] = (attrs["src"], self.size)
            else:
                preview, size = self.photos[self.source]
                self.photos[self.source] = (preview, max(size, self.size))

    def handle_endtag(self, tag):
        if tag == "a":
            self.source = None


def main():
    parser = PhotoLinks()
    parser.feed((ROOT / "index.html").read_text())
    parser.feed((ROOT / "gallery.html").read_text())
    for source, (preview, size) in parser.photos.items():
        source_path = (ROOT / source).resolve()
        preview_path = (ROOT / preview).resolve()
        if not source_path.is_relative_to(ROOT / "assets"):
            raise ValueError(f"Source must be under assets: {source}")
        if not preview_path.is_relative_to(ROOT / "assets/optimized"):
            raise ValueError(f"Preview must be under assets/optimized: {preview}")
        if source_path == preview_path:
            raise ValueError("A preview must never overwrite its original")
        with Image.open(source_path) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((size, size))
            preview_path.parent.mkdir(parents=True, exist_ok=True)
            image.save(preview_path, "WEBP", quality=82, method=4)
    print(f"Refreshed {len(parser.photos)} previews; originals were not modified.")


if __name__ == "__main__":
    main()
