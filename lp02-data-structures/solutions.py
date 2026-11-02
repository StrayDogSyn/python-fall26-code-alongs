"""LP 02 reference solutions. Try practice.py before reading these."""


def unique_names(names):
    # The list remembers order while the set makes membership cheap.
    result = []
    seen = set()
    for name in names:
        if name not in seen:
            result.append(name)
            seen.add(name)
    return result


def highest_score(scores):
    # A strict comparison keeps the first winner on a tie.
    best_name = None
    best_score = None
    for name, score in scores.items():
        if best_score is None or score > best_score:
            best_name = name
            best_score = score
    return best_name


def save_names(path, names):
    # Add a final newline only when there is content.
    text = "\n".join(names)
    if names:
        text += "\n"
    path.write_text(text, encoding="utf-8")


def load_names(path):
    # Handle only the expected missing-file case.
    try:
        with open(path, encoding="utf-8") as source:
            names = []
            for line in source:
                cleaned = line.strip()
                if cleaned:
                    names.append(cleaned)
            return names
    except FileNotFoundError:
        return []


def word_counts(text):
    # get supplies zero for the first copy of each word.
    counts = {}
    for word in text.split():
        key = word.lower()
        counts[key] = counts.get(key, 0) + 1
    return counts


def ranked(scores):
    # Negative score reverses numeric order; name breaks ties alphabetically.
    return sorted(scores.items(), key=lambda pair: (-pair[1], pair[0]))


def group_by_length(words):
    # Append preserves input order inside each length group.
    groups = {}
    for word in words:
        groups.setdefault(len(word), []).append(word)
    return groups


def top_n(scores, n):
    # Sorting makes the highest scores first; slicing keeps only n.
    if n <= 0:
        return []
    return sorted(scores, reverse=True)[:n]


def parse_roster(lines):
    # Strip both parts, and later keys replace earlier scores.
    roster = {}
    for line in lines:
        if not line.strip():
            continue
        name_text, score_text = line.split(",", 1)
        roster[name_text.strip()] = int(score_text.strip())
    return roster


def meeting_text(time_tuple):
    # Tuple unpacking gives each position a useful name.
    hour, minute = time_tuple
    return f"{hour:02d}:{minute:02d}"


def remove_short_words(words, min_length):
    # A new list avoids skipping neighbors in the original list.
    return [word for word in words if len(word) >= min_length]


if __name__ == "__main__":
    from check import main

    raise SystemExit(main(["--solutions"]))
