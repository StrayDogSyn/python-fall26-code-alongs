"""LP 01 independent practice. Replace each TODO, then run this file."""


def classify_score(score):
    """Return 'ready' for a numeric score of 70 or more; otherwise 'practice'."""
    # TODO: Write an if/else or an if with an early return.
    raise NotImplementedError("Write classify_score first")


def count_passing(scores):
    """Return how many numeric scores in the list are at least 70."""
    # TODO: Start a counter at zero; visit each score; return the counter.
    raise NotImplementedError("Write count_passing next")


if __name__ == "__main__":
    # Predict these results before running. Add one boundary case of your own.
    assert classify_score(70) == "ready"
    assert classify_score(69) == "practice"
    assert count_passing([70, 62, 91, 69]) == 2
    assert count_passing([]) == 0
    print("LP 01 checks passed. Explain one result in your own words.")
