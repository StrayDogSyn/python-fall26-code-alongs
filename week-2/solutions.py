"""Week 2 reference. Compare only after attempting practice.py."""

from pathlib import Path
from tempfile import TemporaryDirectory


def unique_names(names):
    result = []
    seen = set()
    for name in names:
        if name not in seen:
            result.append(name)
            seen.add(name)
    return result


def highest_score(scores):
    best_name = None
    best_score = None
    for name, score in scores.items():
        if best_score is None or score > best_score:
            best_name = name
            best_score = score
    return best_name


def save_names(path, names):
    text = "\n".join(names)
    if names:
        text = text + "\n"
    path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    assert unique_names(["Maya", "Luis", "Maya", "Ari"]) == ["Maya", "Luis", "Ari"]
    assert unique_names([]) == []
    assert highest_score({"Maya": 82, "Luis": 75, "Ari": 91}) == "Ari"
    assert highest_score({"Maya": 82, "Luis": 82}) == "Maya"
    assert highest_score({}) is None
    with TemporaryDirectory() as folder:
        path = Path(folder) / "names.txt"
        save_names(path, ["Maya", "Luis"])
        assert path.read_text(encoding="utf-8") == "Maya\nLuis\n"
        save_names(path, [])
        assert path.read_text(encoding="utf-8") == ""
    print("Week 2 reference checks passed.")
