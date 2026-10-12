"""Week 2 instructor code-along: collections and a text-file round trip."""

from pathlib import Path


def save_names(path, names):
    """Write one name per line, including a final newline when nonempty."""
    text = "\n".join(names)
    if names:
        text = text + "\n"
    path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    names = ["Maya", "Luis"]
    scores = {"Maya": 82, "Luis": 75}
    meeting_time = (20, 0)

    names.append("Ari")
    scores["Ari"] = 91
    names.append("Maya")  # A second sign-in; keep the original order in the list.

    print(f"First sign-in: {names[0]}")
    print(f"Ari's score: {scores['Ari']}")
    print(f"Meeting hour: {meeting_time[0]}")
    print(f"Unique sign-ins: {len(set(names))}")

    path = Path(__file__).with_name("attendance-demo.txt")
    save_names(path, names)
    print(f"Read back: {path.read_text(encoding='utf-8').splitlines()}")
