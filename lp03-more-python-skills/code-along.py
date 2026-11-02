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
