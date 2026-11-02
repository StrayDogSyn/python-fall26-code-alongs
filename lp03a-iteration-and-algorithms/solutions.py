"""Reference answers for independent practice, not the graded assignment."""


def total_of_evens(numbers):
    # Keep one running total and add only values that pass the condition.
    total = 0
    for number in numbers:
        if number % 2 == 0:
            total += number
    return total


def count_up_by(start, stop, step):
    # range already handles a step that points away from stop.
    if step == 0:
        raise ValueError("step cannot be zero")
    return list(range(start, stop, step))


def repair_average(numbers):
    # Initialize once, outside the loop, and handle empty input first.
    if not numbers:
        return 0.0
    total = 0
    for number in numbers:
        total += number
    return round(total / len(numbers), 1)


def repair_first_even(numbers):
    # Exhaust the search before deciding there is no match.
    for number in numbers:
        if number % 2 == 0:
            return number
    return None


def ask_until_valid(read, low, high, max_attempts=5):
    # Count attempts so a bad reader cannot keep the loop alive forever.
    attempts = 0
    while attempts < max_attempts:
        value = read()
        attempts += 1
        if low <= value <= high:
            return value
    return None


def linear_search(items, target):
    # Count each equality check, including the successful one.
    comparisons = 0
    for index, item in enumerate(items):
        comparisons += 1
        if item == target:
            return index, comparisons
    return -1, comparisons


def binary_search(sorted_items, target):
    # Halve the remaining sorted search window after each comparison.
    low = 0
    high = len(sorted_items) - 1
    comparisons = 0
    while low <= high:
        mid = (low + high) // 2
        comparisons += 1
        if sorted_items[mid] == target:
            return mid, comparisons
        if sorted_items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, comparisons


def selection_sort(items):
    # Copy first so sorting does not change the caller's list.
    result = list(items)
    for left in range(len(result)):
        smallest = left
        for index in range(left + 1, len(result)):
            if result[index] < result[smallest]:
                smallest = index
        result[left], result[smallest] = result[smallest], result[left]
    return result


def bubble_sort_passes(items):
    # Record a fresh copy after every full pass, including quiet passes.
    values = list(items)
    snapshots = []
    for end in range(len(values) - 1, 0, -1):
        for index in range(end):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
        snapshots.append(values.copy())
    return snapshots


def duplicate_pair(items):
    # The outer loop fixes the first index before checking later positions.
    for first in range(len(items)):
        for second in range(first + 1, len(items)):
            if items[first] == items[second]:
                return first, second
    return None


def squares_of_odds(numbers):
    # Use two forms of the same filter and transformation to compare them.
    with_loop = []
    for number in numbers:
        if number % 2 != 0:
            with_loop.append(number * number)
    with_comprehension = [number * number for number in numbers if number % 2 != 0]
    return with_loop, with_comprehension


if __name__ == "__main__":
    from check import main

    raise SystemExit(main(["--solutions"]))
