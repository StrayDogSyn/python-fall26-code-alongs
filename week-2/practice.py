"""Week 2 independent practice. Replace TODOs and run this file."""

from pathlib import Path
from tempfile import TemporaryDirectory


def unique_names(names):
    """Return names once each, in the order of their first appearance."""
    # TODO: Keep a result list and a set of names already seen.
    raise NotImplementedError("Write unique_names first")


def highest_score(scores):
    """Return the name with the highest score; return None for an empty dict.

    If scores tie, return the first tied name encountered in the dict.
    """
    # TODO: Track the current best name and score as you visit .items().
    raise NotImplementedError("Write highest_score next")


def save_names(path, names):
    """Write one name per line as UTF-8; end nonempty content with a newline."""
    # TODO: Join names with '\n', add a final '\n' if nonempty, and write text.
    raise NotImplementedError("Write save_names last")


if __name__ == "__main__":
    assert unique_names(["Maya", "Luis", "Maya", "Ari"]) == ["Maya", "Luis", "Ari"]
    assert unique_names([]) == []
    assert highest_score({"Maya": 82, "Luis": 75, "Ari": 91}) == "Ari"
    assert highest_score({}) is None
    with TemporaryDirectory() as folder:
        path = Path(folder) / "names.txt"
        save_names(path, ["Maya", "Luis"])
        assert path.read_text(encoding="utf-8") == "Maya\nLuis\n"
        save_names(path, [])
        assert path.read_text(encoding="utf-8") == ""
    print("Week 2 checks passed. Explain one collection choice in your own words.")
