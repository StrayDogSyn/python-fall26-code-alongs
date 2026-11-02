"""LP 03 instructor code-along: classes, comprehensions, decorators, and closures.

Run from the repository root:  python lp03-more-python-skills/code-along.py
"""


class Gradebook:
    """Keep scores per student. A class bundles data with the rules that use it."""

    def __init__(self):
        self.scores = {}

    def add_score(self, name, score):
        self.scores.setdefault(name, []).append(score)

    def average(self, name):
        marks = self.scores.get(name, [])
        if not marks:
            return None
        return sum(marks) / len(marks)


def make_checker(threshold):
    """Return a function that remembers threshold. That memory is a closure."""

    def is_passing(average):
        return average is not None and average >= threshold

    return is_passing


def log_call(func):
    """A decorator: a function that wraps another function to add behavior."""

    def wrapper(*args, **kwargs):
        print(f"-> calling {func.__name__}{args}")
        return func(*args, **kwargs)

    return wrapper


@log_call
def describe(name, average):
    return f"{name}: {average:.1f}"


def make_turn_number():
    """Show how nonlocal lets a closure change remembered state."""
    turn = 0

    def next_turn():
        nonlocal turn
        turn += 1
        return turn

    return next_turn


def remember_first(func):
    """Model a decorator that caches even a None result."""
    used = False
    saved = None

    def wrapper(*args, **kwargs):
        nonlocal used, saved
        if not used:
            saved = func(*args, **kwargs)
            used = True
        return saved

    return wrapper


if __name__ == "__main__":
    book = Gradebook()
    book.add_score("Maya", 82)
    book.add_score("Maya", 74)
    book.add_score("Luis", 61)
    book.add_score("Luis", 66)

    # A comprehension builds a list in one line. Predict it before you run it.
    names = ["Maya", "Luis", "Ari"]
    averages = {name: book.average(name) for name in names}
    print(averages)

    is_passing = make_checker(70)
    passing = [name for name in names if is_passing(averages[name])]
    print(f"Passing: {passing}")

    print(describe("Maya", averages["Maya"]))

    # A dictionary comprehension keeps the latest value for duplicate keys.
    score_rows = [("Maya", 82), ("Luis", 61), ("Maya", 74)]
    latest = {name: score for name, score in score_rows}
    print(f"Latest marks: {latest}")

    # The end of a list can be the top of a stack. Peek without removing.
    review_stack = ["class", "comprehension"]
    review_stack.append("decorator")
    print(f"Stack top: {review_stack[-1]}, size: {len(review_stack)}")
    print(f"Popped: {review_stack.pop()}")

    next_turn = make_turn_number()
    print(f"Turns: {next_turn()}, {next_turn()}")

    first_label = remember_first(lambda value: value.upper())
    print(f"First label stays: {first_label('python')}, {first_label('later')}")

    # A composed calculation applies the inner operation first.
    add_three = lambda value: value + 3
    double = lambda value: value * 2
    print(f"Add then double: {double(add_three(4))}")
