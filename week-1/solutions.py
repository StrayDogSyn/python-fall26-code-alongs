"""Week 1 reference. Compare only after attempting practice.py."""


def classify_score(score):
    if score >= 70:
        return "ready"
    return "practice"


def count_passing(scores):
    count = 0
    for score in scores:
        if score >= 70:
            count = count + 1
    return count


if __name__ == "__main__":
    assert classify_score(70) == "ready"
    assert classify_score(69) == "practice"
    assert count_passing([70, 62, 91, 69]) == 2
    assert count_passing([]) == 0
    print("Week 1 reference checks passed.")
