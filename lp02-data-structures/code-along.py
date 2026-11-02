"""LP 02 instructor code-along: collections and a text-file round trip."""

from pathlib import Path


def save_names(path, names):
    """Write one name per line, including a final newline when nonempty."""
    text = "\n".join(names)
    if names:
        text = text + "\n"
    path.write_text(text, encoding="utf-8")


def show_more_patterns(path):
    """Model reading, parsing, ranking, grouping, and formatting."""
    with open(path, encoding="utf-8") as source:
        loaded = [line.strip() for line in source if line.strip()]
    print(f"Loaded with open: {loaded}")
    seen = set()
    ordered_unique = []
    for name in loaded:
        if name not in seen:
            ordered_unique.append(name)
            seen.add(name)
    print(f"First sign-ins: {ordered_unique}")

    word_counts = {}
    for word in "Cat cat DOG".split():
        lowered = word.lower()
        word_counts[lowered] = word_counts.get(lowered, 0) + 1
    print(f"Word counts: {word_counts}")

    raw = " Maya,82\n Ari,91\n"
    roster = {}
    for line in raw.splitlines():
        name, score_text = line.split(",", 1)
        roster[name.strip()] = int(score_text.strip())
    ranked = sorted(roster.items(), key=lambda pair: (-pair[1], pair[0]))
    print(f"Top score: {ranked[:1]}")

    lengths = {}
    for word in ["cat", "to", "dog"]:
        lengths.setdefault(len(word), []).append(word)
    print(f"Length groups: {lengths}")
    print(f"Long words: {[word for word in ['go', 'python', 'to'] if len(word) >= 3]}")

    hour, minute = (20, 0)
    print(f"Meeting: {hour:02d}:{minute:02d}")


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
    show_more_patterns(path)
