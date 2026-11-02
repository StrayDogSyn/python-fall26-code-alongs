"""LP 03 reference solutions. Try practice.py before reading these."""


class Tally:
    def __init__(self):
        # Each instance needs its own dictionary.
        self.counts = {}

    def add(self, label):
        # get handles the first appearance of a label.
        self.counts[label] = self.counts.get(label, 0) + 1

    def count(self, label):
        # An unseen label has not appeared yet.
        return self.counts.get(label, 0)


def long_words(words, min_length):
    # The condition keeps the boundary length.
    return [word for word in words if len(word) >= min_length]


def make_multiplier(factor):
    # The returned function keeps factor from this call.
    def multiply(value):
        return value * factor
    return multiply


def count_calls(func):
    # Count at call time and preserve the original return value.
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper


def make_counter():
    # nonlocal updates the count held by this closure.
    count = 0
    def next_count():
        nonlocal count
        count += 1
        return count
    return next_count


def once(func):
    # A separate flag lets None be a cached result.
    has_run = False
    result = None
    def wrapper(*args, **kwargs):
        nonlocal has_run, result
        if not has_run:
            result = func(*args, **kwargs)
            has_run = True
        return result
    return wrapper


class Stack:
    def __init__(self):
        # The end of this list is the top of the stack.
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.items:
            raise IndexError("Stack is empty")
        return self.items.pop()

    def peek(self):
        if not self.items:
            raise IndexError("Stack is empty")
        return self.items[-1]

    def __len__(self):
        return len(self.items)


def group_scores(rows):
    # A later duplicate key replaces an earlier score.
    return {name: score for name, score in rows}


def compose(f, g):
    # The inner function remembers both functions and their order.
    def composed(value):
        return f(g(value))
    return composed


class Gradebook:
    def __init__(self):
        # Each book owns its own student records.
        self.scores = {}

    def add_student(self, name):
        self.scores.setdefault(name, [])

    def add_score(self, name, score):
        self.add_student(name)
        self.scores[name].append(score)

    def average(self, name):
        marks = self.scores.get(name, [])
        if not marks:
            return None
        return round(sum(marks) / len(marks), 1)

    @property
    def student_count(self):
        # @property gives a read-only count without a method call.
        return len(self.scores)

    def ranked_report(self):
        # Comprehend the averages once, then sort graded students before empty ones.
        averages = {name: self.average(name) for name in self.scores}
        return sorted(
            averages.items(),
            key=lambda pair: (pair[1] is None, -(pair[1] if pair[1] is not None else 0), pair[0]),
        )


if __name__ == "__main__":
    from check import main

    raise SystemExit(main(["--solutions"]))
