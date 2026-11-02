"""LP 03 reference. Compare only after attempting practice.py."""


class Tally:
    def __init__(self):
        self.counts = {}

    def add(self, label):
        self.counts[label] = self.counts.get(label, 0) + 1

    def count(self, label):
        return self.counts.get(label, 0)


def long_words(words, min_length):
    return [word for word in words if len(word) >= min_length]


def make_multiplier(factor):
    def multiply(value):
        return value * factor

    return multiply


def count_calls(func):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)

    wrapper.calls = 0
    return wrapper


@count_calls
def shout(text):
    return text.upper()


if __name__ == "__main__":
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
    print("LP 03 reference checks passed.")
