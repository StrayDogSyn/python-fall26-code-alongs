"""Week 5 practice. Run python lp03a-iteration-and-algorithms/check.py."""


def total_of_evens(numbers):
    """[Warm-up] Add only even values.

    Example: [3, 4, 6] gives 10. Edge: [] gives 0; negative evens count.
    """
    raise NotImplementedError("TODO")


def count_up_by(start, stop, step):
    """[Warm-up] List range values from start toward stop, excluding stop.

    Example: (2, 9, 3) gives [2, 5, 8]. Edge: (5, 0, 2) gives [].
    A zero step raises ValueError('step cannot be zero').
    """
    raise NotImplementedError("TODO")


def repair_average(numbers):
    """[Fix it] Repair the reset accumulator, then return a one-decimal mean.

    Example: [2, 4, 9] gives 5.0. Edge: [] gives 0.0.
    """
    raise NotImplementedError("TODO")
    total = 0
    for number in numbers:
        total = 0  # Bug: resets the running total on every visit.
        total += number
    return round(total / len(numbers), 1)


def repair_first_even(numbers):
    """[Fix it] Return the first even value, or None if none exists.

    Example: [3, 7, 4, 8] gives 4. Edge: [] gives None.
    """
    raise NotImplementedError("TODO")
    for number in numbers:
        if number % 2 == 0:
            return number
        return None  # Bug: gives up after the first odd value.


def ask_until_valid(read, low, high, max_attempts=5):
    """[Build] Call read() until an integer is inside [low, high].

    Example: readings 8, 12 with bounds 10 to 15 return 12.
    Edge: return None after max_attempts invalid readings; zero attempts
    must not call read. This bounded loop cannot run forever.
    """
    raise NotImplementedError("TODO")


def last_match_search(items, target):
    """[Build] Scan from the right end. Return (last matching index, comparisons).

    Example: [5, 7, 5], 5 gives (2, 1). [5, 7, 9], 5 gives (0, 3).
    Edge: absent target gives (-1, number of items checked); [] gives (-1, 0).
    Compare values one at a time; do not use .index(), reversed(), or slicing.
    """
    raise NotImplementedError("TODO")


def binary_search(sorted_items, target):
    """[Build] Search an ascending sorted list with low, high, and mid.

    Return (matching index, comparisons), or (-1, comparisons) if absent.
    Example: [1, 3, 5, 7, 9], 7 gives (3, 2).
    Edge: [] gives (-1, 0). Duplicate matches may return any matching index.
    """
    raise NotImplementedError("TODO")


def selection_sort(items):
    """[Build] Return a new ascending list using selection sort.

    Example: [3, 1, 2] gives [1, 2, 3]. Edge: [] gives [].
    Leave items unchanged; do not use sorted() or .sort().
    """
    raise NotImplementedError("TODO")


def bubble_sort_passes(items):
    """[Extend] Return a snapshot after each of len(items)-1 bubble passes.

    Example: [3, 2, 1] gives [[2, 1, 3], [1, 2, 3]].
    Edge: [] and [5] give []. Keep every pass, even if already sorted.
    Leave items unchanged; swap adjacent values with tuple unpacking.
    """
    raise NotImplementedError("TODO")


def duplicate_pair(items):
    """[Build] Return the first pair of equal-value indices with nested loops.

    Scan lower indices first, then later indices. Example: ['a', 'b', 'a']
    gives (0, 2). Edge: no duplicate or empty input gives None.
    """
    raise NotImplementedError("TODO")


def squares_of_odds(numbers):
    """[Warm-up] Return two equal lists of odd squares.

    Build the first with a plain loop and the second with a comprehension.
    Example: [-3, 2, 5] gives ([9, 25], [9, 25]).
    Edge: [] gives ([], []). Keep input order and do not change numbers.
    """
    raise NotImplementedError("TODO")


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
