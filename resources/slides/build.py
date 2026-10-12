"""
Build the weekly slide decks.

Each deck is ONE self-contained HTML file that students can open with a
double-click: engine.html (design, navigation, interactive pieces) plus one
weekNN.js content file (slides, notes, vocabulary, quizzes).

Run from the repository root:

    python resources/slides/build.py

Mac and Linux users without a venv active: use python3 instead of python.
"""

import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent

# content file -> output file inside the repo
DECKS = {
    "week01.js": "week01/week01-slides.html",
    "week02.js": "week02/week02-slides.html",
}


def title_from(content: str, name: str) -> str:
    match = re.search(r'title:\s*"([^"]+)"', content)
    return match.group(1) if match else name


def check(content: str, name: str) -> list[str]:
    """Catch the mistakes that broke the first Gemini draft."""
    problems = []
    if "\u2014" in content:
        problems.append("contains an em dash (house style says no)")
    if re.search(r"(?<!\\)\\(?=Scripts|Users)", content):
        problems.append("single backslash before Scripts/Users will vanish inside a JS string; write \\\\")
    if "</script" in content.lower():
        problems.append("contains </script, which would end the script tag early")
    return [f"{name}: {p}" for p in problems]


def main() -> int:
    engine = (HERE / "engine.html").read_text(encoding="utf-8")
    glossary = (HERE / "glossary.js").read_text(encoding="utf-8")
    errors = check(glossary, "glossary.js")
    engine = engine.replace("/*__GLOSSARY__*/", glossary)
    for src_name, out_rel in DECKS.items():
        src = HERE / src_name
        if not src.exists():
            print(f"skip  {src_name} (not written yet)")
            continue
        content = src.read_text(encoding="utf-8")
        errors += check(content, src_name)
        page = engine.replace("__TITLE__", json.loads(json.dumps(title_from(content, src_name))))
        page = page.replace("/*__DECK__*/", content)
        out = ROOT / out_rel
        out.parent.mkdir(parents=True, exist_ok=True)
        with out.open("w", encoding="utf-8", newline="\n") as output:
            output.write(page)
        print(f"built {out_rel}  ({len(page):,} characters)")
    for e in errors:
        print("WARNING", e)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
