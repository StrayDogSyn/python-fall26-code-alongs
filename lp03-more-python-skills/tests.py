"""LP 03 checks shared by the local runner and future browser runner."""

import unittest


EXERCISES = (
    "Tally", "long_words", "make_multiplier", "count_calls", "make_counter",
    "once", "Stack", "group_scores", "compose", "Gradebook",
)


class LessonChecks(unittest.TestCase):
    target = None

    def call(self, label, function, args, expected, nudge, kwargs=None):
        try:
            return function(*args, **(kwargs or {}))
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(
                f"input {label}{args!r}; expected {expected!r}, got "
                f"{type(error).__name__}: {error}. Hint: {nudge}"
            )

    def expect(self, label, function, args, expected, nudge, kwargs=None):
        actual = self.call(label, function, args, expected, nudge, kwargs)
        if type(actual) is not type(expected) or actual != expected:
            self.fail(f"input {label}{args!r}; expected {expected!r}, got {actual!r}. Hint: {nudge}")
        return actual

    def test_01_Tally(self):
        tally = self.call("Tally", self.target.Tally, (), "a new tally", "Set up each instance.")
        self.expect("count", tally.count, ("sql",), 0, "An unseen label has count zero.")
        self.call("add", tally.add, ("py",), "count updated", "Use get(label, 0).")
        self.call("add", tally.add, ("py",), "count updated", "Increase the old count.")
        self.expect("count", tally.count, ("py",), 2, "Count both additions.")
        other = self.call("Tally", self.target.Tally, (), "independent tally", "Do not share one class dictionary.")
        self.expect("count", other.count, ("py",), 0, "Each instance owns its counts.")

    def test_02_long_words(self):
        self.expect("long_words", self.target.long_words, (["a", "data", "fun", "class"], 4), ["data", "class"], "Keep boundary lengths and original order.")
        self.expect("long_words", self.target.long_words, ([], 2), [], "Empty input stays empty.")
        self.expect("long_words", self.target.long_words, (["ab", "a", "cd"], 2), ["ab", "cd"], "Use >=, not >.")

    def test_03_make_multiplier(self):
        double = self.call("make_multiplier", self.target.make_multiplier, (2,), "a function", "Return the inner function.")
        self.expect("double", double, (7,), 14, "Multiply by the remembered factor.")
        zero = self.call("make_multiplier", self.target.make_multiplier, (0,), "a function", "Remember zero too.")
        self.expect("zero", zero, (9,), 0, "Factor zero still multiplies.")
        self.expect("double", double, (3,), 6, "Separate closures keep separate factors.")

    def test_04_count_calls(self):
        wrapped = self.call("count_calls", self.target.count_calls, (lambda value, scale=1: value * scale,), "a wrapper", "Return the wrapper.")
        self.expect("calls before", lambda: wrapped.calls, (), 0, "Start calls at zero.")
        self.expect("wrapped", wrapped, (3,), 3, "Return the original result.")
        self.expect("wrapped", wrapped, (4,), 8, "Forward keyword arguments.", {"scale": 2})
        self.expect("calls after", lambda: wrapped.calls, (), 2, "Increase at call time.")
        empty = self.call("count_calls", self.target.count_calls, (lambda: None,), "a wrapper", "Wrap None results too.")
        self.expect("empty", empty, (), None, "Preserve a None result.")

    def test_05_make_counter(self):
        first = self.call("make_counter", self.target.make_counter, (), "a function", "Return the inner function.")
        self.expect("first", first, (), 1, "Increase before returning.")
        self.expect("first", first, (), 2, "Use nonlocal to retain the count.")
        second = self.call("make_counter", self.target.make_counter, (), "another function", "Create separate state.")
        self.expect("second", second, (), 1, "A new counter starts at one.")
        self.expect("first", first, (), 3, "Counters must not share state.")

    def test_06_once(self):
        calls = []
        def record(value):
            calls.append(value)
            return value * 2
        wrapped = self.call("once", self.target.once, (record,), "a wrapper", "Return the wrapper.")
        self.expect("once first", wrapped, (3,), 6, "Run the original on the first call.")
        self.expect("once later", wrapped, (9,), 6, "Reuse the first result.")
        self.expect("recorded calls", lambda: calls, (), [3], "Do not run the original again.")
        none_calls = []
        def return_none():
            none_calls.append(1)
            return None
        empty = self.call("once", self.target.once, (return_none,), "a wrapper", "None is a cacheable result.")
        self.expect("once None first", empty, (), None, "Cache None as the first result.")
        self.expect("once None later", empty, (), None, "Return a cached None.")
        self.expect("None calls", lambda: none_calls, (), [1], "None is a result, not a not-run signal.")

    def test_07_Stack(self):
        stack = self.call("Stack", self.target.Stack, (), "an empty stack", "Start an item list.")
        self.expect("len empty", lambda: len(stack), (), 0, "Start empty.")
        self.call("push", stack.push, ("a",), "item added", "Append to the end.")
        self.call("push", stack.push, ("b",), "item added", "Append to the end.")
        self.expect("peek", stack.peek, (), "b", "The last item is on top.")
        self.expect("len after peek", lambda: len(stack), (), 2, "Peek must not remove an item.")
        self.expect("pop", stack.pop, (), "b", "Pop the last item.")
        self.expect("pop", stack.pop, (), "a", "Pop in reverse push order.")
        for operation in (stack.pop, stack.peek):
            try:
                operation()
            except NotImplementedError:
                raise
            except IndexError as error:
                if str(error) != "Stack is empty":
                    self.fail(f"input empty Stack; expected IndexError('Stack is empty'), got {error!r}. Hint: Use a clear message.")
            except Exception as error:
                self.fail(f"input empty Stack; expected IndexError, got {type(error).__name__}: {error}. Hint: Check empty first.")
            else:
                self.fail("input empty Stack; expected IndexError, got no error. Hint: Check empty first.")

    def test_08_group_scores(self):
        self.expect("group_scores", self.target.group_scores, ([('Maya', 82), ('Ari', 91)],), {'Maya': 82, 'Ari': 91}, "Build name-to-score pairs.")
        self.expect("group_scores", self.target.group_scores, ([],), {}, "Empty input makes an empty dictionary.")
        self.expect("group_scores", self.target.group_scores, ([('Maya', 82), ('Maya', 75)],), {'Maya': 75}, "A later row replaces the earlier score.")

    def test_09_compose(self):
        double = lambda x: x * 2
        add_three = lambda x: x + 3
        together = self.call("compose", self.target.compose, (double, add_three), "a function", "Return a closure.")
        self.expect("compose", together, (4,), 14, "Apply g first, then f.")
        reverse = self.call("compose", self.target.compose, (add_three, double), "a function", "Order matters.")
        self.expect("reverse", reverse, (4,), 11, "Changing order changes the result.")
        identity = self.call("compose", self.target.compose, (lambda x: x, double), "a function", "Keep both functions.")
        self.expect("identity", identity, (0,), 0, "Identity leaves the other result alone.")

    def test_10_Gradebook(self):
        book = self.call("Gradebook", self.target.Gradebook, (), "an empty book", "Set up each instance's scores.")
        self.expect("empty report", book.ranked_report, (), [], "An empty book has no rows.")
        self.call("add_student", book.add_student, ("Maya",), "student added", "Create an empty list.")
        self.call("add_student", book.add_student, ("Ari",), "student added", "Keep new students even without marks.")
        self.call("add_score", book.add_score, ("Maya", 82), "score added", "Append to that student's list.")
        self.call("add_score", book.add_score, ("Maya", 74), "score added", "Keep both marks.")
        self.call("add_score", book.add_score, ("Luis", 91), "student and score added", "Add a missing student first.")
        self.expect("average Maya", book.average, ("Maya",), 78.0, "Divide the total by the number of marks.")
        self.expect("average Ari", book.average, ("Ari",), None, "No marks means None.")
        self.expect("student_count", lambda: book.student_count, (), 3, "The property counts student keys.")
        self.expect("ranked_report", book.ranked_report, (), [("Luis", 91.0), ("Maya", 78.0), ("Ari", None)], "Sort high averages first, empty records last.")
        other = self.call("Gradebook", self.target.Gradebook, (), "another book", "Do not share scores between instances.")
        self.expect("other count", lambda: other.student_count, (), 0, "Each book starts empty.")
        tie = self.call("Gradebook", self.target.Gradebook, (), "another book", "Check a tied report.")
        self.call("add_score", tie.add_score, ("Zoe", 82), "score added", "Add each name.")
        self.call("add_score", tie.add_score, ("Ana", 82), "score added", "Add each name.")
        self.expect("tie report", tie.ranked_report, (), [("Ana", 82.0), ("Zoe", 82.0)], "Break tied averages alphabetically.")
        rounding = self.call("Gradebook", self.target.Gradebook, (), "another book", "Check one-decimal means.")
        for mark in (1, 2, 2):
            self.call("add_score", rounding.add_score, ("Sam", mark), "score added", "Keep every mark.")
        self.expect("rounded average", rounding.average, ("Sam",), 1.7, "Round the mean to one decimal.")
