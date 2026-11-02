"""LP 03 independent practice. Replace each TODO, then run this file."""


class Tally:
    """Count how many times each label appears."""

    def __init__(self):
        # TODO: Start self.counts as an empty dict.
        raise NotImplementedError("Set up self.counts in __init__")

    def add(self, label):
        # TODO: Increase the count for label. Use .get(label, 0) so new labels work.
        raise NotImplementedError("Write add next")

    def count(self, label):
        # TODO: Return the count for label, or 0 if it was never added.
        raise NotImplementedError("Write count last")


def long_words(words, min_length):
    """Return the words whose length is at least min_length, in their original order."""
    # TODO: Use a list comprehension with an if clause.
    raise NotImplementedError("Write long_words with a comprehension")


def make_multiplier(factor):
    """Return a function that multiplies its one argument by factor (a closure)."""
    # TODO: Define an inner function, then return it.
    raise NotImplementedError("Write make_multiplier")


def count_calls(func):
    """A decorator that counts calls. The wrapper stores the count in wrapper.calls."""
    # TODO: Set wrapper.calls = 0, increase it on each call, then return func's result.
    raise NotImplementedError("Write count_calls")


def shout(text):
    return text.upper()


if __name__ == "__main__":
    shout = count_calls(shout)  # Wrap it here so the file still runs before you finish count_calls.

    tally = Tally()
    tally.add("py")
    tally.add("py")
    tally.add("git")
    assert tally.count("py") == 2
    assert tally.count("sql") == 0

    assert long_words(["a", "data", "fun", "class"], 4) == ["data", "class"]
    assert long_words([], 2) == []

    double = make_multiplier(2)
    assert double(7) == 14

    assert shout("hi") == "HI"
    shout("again")
    assert shout.calls == 2
    print("LP 03 checks passed. Explain what the closure remembers in one sentence.")
