"""LP 03 practice. Replace a TODO, then run python lp03-more-python-skills/check.py."""


class Tally:
    """[Warm-up] Count labels with add() and count().

    Example: adding 'py' twice makes count('py') equal 2.
    Edge: an unseen label has count 0; each Tally has its own counts.
    """

    def __init__(self):
        # TODO: Give each instance its own empty dictionary.
        raise NotImplementedError("Set up Tally")

    def add(self, label):
        # TODO: Increase this label's count, starting from zero.
        raise NotImplementedError("Write Tally.add")

    def count(self, label):
        # TODO: Return zero when the label has never been added.
        raise NotImplementedError("Write Tally.count")


def long_words(words, min_length):
    """[Warm-up] Keep words at least min_length long in original order.

    Example: ['a', 'data', 'fun'], 4 gives ['data']. Edge: [] gives [].
    """
    # TODO: Use a list comprehension with a condition.
    raise NotImplementedError("Write long_words")


def make_multiplier(factor):
    """[Build] Return a function that multiplies a value by factor.

    Example: make_multiplier(2)(7) is 14. Edge: factor 0 always gives 0.
    """
    # TODO: Define an inner function that remembers factor.
    raise NotImplementedError("Write make_multiplier")


def count_calls(func):
    """[Fix it] Decorate func with a wrapper that counts calls and returns results.

    Example: before calls wrapper.calls is 0; after two calls it is 2.
    Edge: return None unchanged if the wrapped function returns None.
    """
    # TODO: Remove the TODO and fix the wrapper's missing return.
    raise NotImplementedError("Fix count_calls")
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper


def make_counter():
    """[Build] Return a function whose successive calls return 1, 2, 3, ...

    Example: c = make_counter(); c() is 1, then c() is 2.
    Edge: a second counter starts at 1 independently.
    """
    # TODO: Use nonlocal inside an inner function.
    raise NotImplementedError("Write make_counter")


def once(func):
    """[Fix it] Run func only on the first call; reuse that result later.

    Example: first call with 3 returns func(3); later call with 9 returns the first result.
    Edge: None is a valid result and must still be cached.
    """
    # TODO: Remove the TODO and add a flag plus a saved result.
    raise NotImplementedError("Fix once")
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper


class Stack:
    """[Build] A last-in, first-out stack with push, pop, peek, and len.

    Example: push('a'), push('b'), then pop() returns 'b'.
    Edge: pop() or peek() on empty raises IndexError('Stack is empty').
    """

    def __init__(self):
        # TODO: Start an empty list of items.
        raise NotImplementedError("Set up Stack")

    def push(self, item):
        # TODO: Add at the end.
        raise NotImplementedError("Write Stack.push")

    def pop(self):
        # TODO: Remove the last item or raise a clear IndexError.
        raise NotImplementedError("Write Stack.pop")

    def peek(self):
        # TODO: Return the last item without removing it.
        raise NotImplementedError("Write Stack.peek")

    def __len__(self):
        # TODO: Return the number of items.
        raise NotImplementedError("Write Stack.__len__")


def group_scores(rows):
    """[Warm-up] Build a name-to-score dictionary from (name, score) rows.

    Example: [('Maya', 82)] gives {'Maya': 82}. Edge: [] gives {}.
    A later row for the same name replaces an earlier score.
    """
    # TODO: Use a dictionary comprehension.
    raise NotImplementedError("Write group_scores")


def compose(f, g):
    """[Build] Return a function that applies g first, then f.

    Example: with f=double and g=add_three, compose(f, g)(4) is 14.
    Edge: composing with identity leaves the other function's result alone.
    """
    # TODO: Return an inner function that computes f(g(value)).
    raise NotImplementedError("Write compose")


class Gradebook:
    """[Transfer project] Store students and scores, then rank their averages.

    add_student('Maya') creates an empty record; add_score('Maya', 82) adds a mark.
    average('Maya') returns a one-decimal float; a student with no marks has None.
    ranked_report() returns (name, average) pairs, highest first, ties alphabetical,
    and students with no marks last. Edge: an empty book reports [].
    student_count is a read-only property. Use a class, dictionary comprehension,
    sorted(), and a decorator for that property.
    """

    def __init__(self):
        # TODO: Give each book its own dictionary of score lists.
        raise NotImplementedError("Set up Gradebook")

    def add_student(self, name):
        # TODO: Create an empty list only if the name is new.
        raise NotImplementedError("Write Gradebook.add_student")

    def add_score(self, name, score):
        # TODO: Add a student if needed, then append the score.
        raise NotImplementedError("Write Gradebook.add_score")

    def average(self, name):
        # TODO: Return None for no scores, else a one-decimal mean.
        raise NotImplementedError("Write Gradebook.average")

    @property
    def student_count(self):
        # TODO: Return how many student keys the book holds.
        raise NotImplementedError("Write Gradebook.student_count")

    def ranked_report(self):
        # TODO: Build averages with a comprehension and sort the pairs.
        raise NotImplementedError("Write Gradebook.ranked_report")


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
