"""LP 01 practice. Replace a TODO, then run python lp01-intro-to-python/check.py."""


def classify_score(score):
    """[Warm-up] Return 'ready' for 70 or more, else 'keep practicing'.

    Example: classify_score(72) is 'ready'. Edge: 70 is also 'ready'.
    """
    # TODO: Choose a label with if/else.
    raise NotImplementedError("Write classify_score")


def count_passing(scores):
    """[Warm-up] Count scores that are at least 70.

    Example: [70, 62, 91] has 2 passing scores. Edge: [] has 0.
    """
    # TODO: Update a counter inside a for loop.
    raise NotImplementedError("Write count_passing")


def parse_score(text):
    """[Fix it] Strip text and return its integer, or None for bad text.

    Example: ' 42 ' becomes 42. Edge: 'oops' becomes None.
    """
    # TODO: Remove the TODO and repair the conversion below for bad input.
    raise NotImplementedError("Fix parse_score")
    return int(text)


def average(scores):
    """[Build] Return the mean rounded to one decimal place.

    Example: [1, 2, 2] becomes 1.7. Edge: [] becomes 0.0.
    """
    # TODO: Handle empty input before dividing.
    raise NotImplementedError("Write average")


def lowest_and_highest(scores):
    """[Build] Return (lowest, highest), or None for an empty list.

    Example: [8, 2, 5] becomes (2, 8). Edge: [] becomes None.
    """
    # TODO: Use min() and max() after checking for empty input.
    raise NotImplementedError("Write lowest_and_highest")


def countdown(n):
    """[Build] Return positive integers from n down to 1 using while.

    Example: countdown(3) is [3, 2, 1]. Edge: countdown(0) is [].
    """
    # TODO: Decrease n each time so the loop can end.
    raise NotImplementedError("Write countdown")


def numbered_lines(names):
    """[Build] Number names from 1, returning a list of strings.

    Example: ['Maya'] becomes ['1. Maya']. Edge: [] becomes [].
    """
    # TODO: Try enumerate(names, start=1) and an f-string.
    raise NotImplementedError("Write numbered_lines")


def clean_name(text):
    """[Extend] Strip edges, collapse inner spaces, and title-case words.

    Example: '  mAya   lee ' becomes 'Maya Lee'. Edge: '   ' becomes ''.
    """
    # TODO: split() removes extra spaces; join() puts one space back.
    raise NotImplementedError("Write clean_name")


def grade_letter(score):
    """[Transfer] Return A, B, C, D, or F for cutoffs 90, 80, 70, 60.

    Example: 84 becomes 'B'. Edge: 90 becomes 'A'.
    """
    # TODO: Check the highest cutoff first with if/elif/else.
    raise NotImplementedError("Write grade_letter")


def total_points(points):
    """[Fix it] Sum every point in a list, returning 0 for an empty list.

    Example: [2, 3, 4] becomes 9. Edge: [] becomes 0.
    """
    # TODO: Remove the TODO and repair the early return below.
    raise NotImplementedError("Fix total_points")
    total = 0
    for point in points:
        total += point
        return total
    return total


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
