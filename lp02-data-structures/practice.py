"""LP 02 practice. Replace a TODO, then run python lp02-data-structures/check.py."""


def unique_names(names):
    """[Warm-up] Return each name once, keeping its first position.

    Example: ['Maya', 'Luis', 'Maya'] becomes ['Maya', 'Luis']. Edge: [] stays [].
    """
    # TODO: Keep a result list and a set of names already seen.
    raise NotImplementedError("Write unique_names")


def highest_score(scores):
    """[Warm-up] Return the highest name, keeping the first name on a tie.

    Example: {'Maya': 82, 'Ari': 91} gives 'Ari'. Edge: {} gives None.
    """
    # TODO: Visit .items() and replace the winner only for a strictly higher score.
    raise NotImplementedError("Write highest_score")


def save_names(path, names):
    """[Build] Write names as UTF-8, one per line, with a final newline.

    Example: ['Maya', 'Luis'] writes 'Maya\\nLuis\\n'. Edge: [] writes ''.
    """
    # TODO: Join names, add the last newline if needed, and write UTF-8 text.
    raise NotImplementedError("Write save_names")


def load_names(path):
    """[Fix it] Read UTF-8 names, stripping lines and skipping blanks.

    Example: ' Maya\\nLuis\\n' gives ['Maya', 'Luis']. Edge: missing file gives [].
    """
    # TODO: Remove the TODO. Repair the file handling for a missing path and UTF-8.
    raise NotImplementedError("Fix load_names")
    with open(path) as source:
        return [line for line in source]


def word_counts(text):
    """[Warm-up] Count lowercase words separated by whitespace.

    Example: 'Cat cat DOG' gives {'cat': 2, 'dog': 1}. Edge: '' gives {}.
    """
    # TODO: Use split(), lower(), and dictionary get().
    raise NotImplementedError("Write word_counts")


def ranked(scores):
    """[Build] Return (name, score) pairs, highest first, ties alphabetical.

    Example: {'Maya': 82, 'Ari': 91} gives [('Ari', 91), ('Maya', 82)]. Edge: {} gives [].
    """
    # TODO: Sort .items() with a key for negative score and name.
    raise NotImplementedError("Write ranked")


def group_by_length(words):
    """[Build] Group words by length, keeping input order within each group.

    Example: ['cat', 'to', 'dog'] gives {3: ['cat', 'dog'], 2: ['to']}. Edge: [] gives {}.
    """
    # TODO: Use a dictionary of lists and setdefault().
    raise NotImplementedError("Write group_by_length")


def top_n(scores, n):
    """[Fix it] Return the n highest scores in descending order.

    Example: top_n([8, 3, 9], 2) gives [9, 8]. Edge: n <= 0 gives [].
    """
    # TODO: Remove the TODO and fix the sort direction and nonpositive n.
    raise NotImplementedError("Fix top_n")
    return sorted(scores)[:n]


def parse_roster(lines):
    """[Build] Parse 'name,score' lines into a dictionary of integers.

    Example: ['Maya,82', 'Ari,91'] gives {'Maya': 82, 'Ari': 91}.
    Edge: blank lines are skipped; a later duplicate name replaces its score.
    """
    # TODO: Skip blanks, split at one comma, strip both parts, convert score.
    raise NotImplementedError("Write parse_roster")


def meeting_text(time_tuple):
    """[Warm-up] Format an (hour, minute) pair as zero-padded HH:MM.

    Example: (20, 0) gives '20:00'. Edge: (0, 5) gives '00:05'.
    """
    # TODO: Unpack the tuple and use :02d for each number.
    raise NotImplementedError("Write meeting_text")


def remove_short_words(words, min_length):
    """[Fix it] Return words at least min_length long without changing input.

    Example: ['go', 'python', 'to'], 3 gives ['python']. Edge: [] gives [].
    """
    # TODO: Remove the TODO and repair the loop that mutates its own input.
    raise NotImplementedError("Fix remove_short_words")
    for word in words:
        if len(word) < min_length:
            words.remove(word)
    return words


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
