"""Build the static GitHub Pages artifact from the hub and available decks."""

from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"


def main():
    if OUT.resolve().parent != ROOT.resolve():
        raise RuntimeError(f"Refusing to replace output outside the repository: {OUT}")
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copy2(ROOT / "index.html", OUT / "index.html")
    (OUT / "site").mkdir()
    for name in ("style.css", "plan.js", "app.js"):
        shutil.copy2(ROOT / "site" / name, OUT / "site" / name)
    decks = sorted(ROOT.glob("week[0-9][0-9]/*-slides.html"))
    for deck in decks:
        target = OUT / deck.parent.name
        target.mkdir(exist_ok=True)
        shutil.copy2(deck, target / deck.name)
    (OUT / ".nojekyll").touch()
    print(f"Built {OUT}: hub, assets, and {len(decks)} slide deck(s)")


if __name__ == "__main__":
    main()
