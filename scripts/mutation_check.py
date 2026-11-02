"""Mutation check: known wrong solutions must fail each packet's checks.

Run from anywhere:  python scripts/mutation_check.py
Exits nonzero if any wrong solution gets through (or passes only on some hash seeds).
"""
import os
import pathlib

os.chdir(pathlib.Path(__file__).resolve().parents[1])

import ast, re, pathlib, subprocess, sys, os, tempfile, textwrap
def split(path):
    s=pathlib.Path(path).read_text(); i=s.index('if __name__ == "__main__":'); return s[:i], s[i:]

def replace_function(source, name, replacement):
    tree = ast.parse(source)
    parts = name.split('.')
    if len(parts) == 2:
        parent = next(item for item in tree.body if isinstance(item, ast.ClassDef) and item.name == parts[0])
        node = next(item for item in parent.body if isinstance(item, ast.FunctionDef) and item.name == parts[1])
    else:
        node = next(item for item in tree.body if isinstance(item, (ast.FunctionDef, ast.ClassDef)) and item.name == name)
    lines = source.splitlines(keepends=True)
    new_block = textwrap.dedent(replacement).strip()
    if len(parts) == 2:
        new_block = textwrap.indent(new_block, '    ')
    return ''.join(lines[:node.lineno - 1]) + new_block + '\n\n' + ''.join(lines[node.end_lineno:])

lp01_mutants = {
 'classify_score': [
  ('excludes 70', '''def classify_score(score):
    return "ready" if score > 70 else "keep practicing"'''),
  ('shortens the label', '''def classify_score(score):
    return "ready" if score >= 70 else "practice"'''),
 ],
 'count_passing': [
  ('excludes 70', '''def count_passing(scores):
    return sum(1 for score in scores if score > 70)'''),
  ('counts every item', '''def count_passing(scores):
    return len(scores)'''),
 ],
 'parse_score': [
  ('returns zero for bad text', '''def parse_score(text):
    try:
        return int(text.strip())
    except ValueError:
        return 0'''),
  ('accepts decimal text', '''def parse_score(text):
    try:
        return int(float(text.strip()))
    except ValueError:
        return None'''),
 ],
 'average': [
  ('divides by zero on empty input', '''def average(scores):
    return round(sum(scores) / len(scores), 1)'''),
  ('rounds to a whole number', '''def average(scores):
    return round(sum(scores) / len(scores)) if scores else 0.0'''),
 ],
 'lowest_and_highest': [
  ('reverses tuple order', '''def lowest_and_highest(scores):
    return (max(scores), min(scores)) if scores else None'''),
  ('fails on empty input', '''def lowest_and_highest(scores):
    return min(scores), max(scores)'''),
 ],
 'countdown': [
  ('includes zero', '''def countdown(n):
    result = []
    while n >= 0:
        result.append(n)
        n -= 1
    return result'''),
  ('counts upward', '''def countdown(n):
    return list(range(1, n + 1))'''),
 ],
 'numbered_lines': [
  ('starts at zero', '''def numbered_lines(names):
    return [f"{i}. {name}" for i, name in enumerate(names)]'''),
  ('omits punctuation', '''def numbered_lines(names):
    return [f"{i} {name}" for i, name in enumerate(names, 1)]'''),
 ],
 'clean_name': [
  ('keeps inner spaces', '''def clean_name(text):
    return text.strip().title()'''),
  ('keeps mixed case', '''def clean_name(text):
    return " ".join(text.split())'''),
 ],
 'grade_letter': [
  ('excludes 90', '''def grade_letter(score):
    if score > 90: return "A"
    if score >= 80: return "B"
    if score >= 70: return "C"
    if score >= 60: return "D"
    return "F"'''),
  ('checks lowest cutoff first', '''def grade_letter(score):
    if score >= 60: return "D"
    if score >= 70: return "C"
    if score >= 80: return "B"
    if score >= 90: return "A"
    return "F"'''),
 ],
 'total_points': [
  ('returns inside loop', '''def total_points(points):
    total = 0
    for point in points:
        total += point
        return total
    return total'''),
  ('counts items instead of points', '''def total_points(points):
    return len(points)'''),
 ],
}
lp02_mutants = {
 'unique_names': [
  ('uses an unordered set', '''def unique_names(names):
    return list(set(names))'''),
  ('sorts away first appearance', '''def unique_names(names):
    return sorted(set(names))'''),
 ],
 'highest_score': [
  ('last tied name wins', '''def highest_score(scores):
    best_name = None
    best_score = None
    for name, score in scores.items():
        if best_score is None or score >= best_score:
            best_name, best_score = name, score
    return best_name'''),
  ('chooses the lowest score', '''def highest_score(scores):
    return min(scores, key=scores.get) if scores else None'''),
 ],
 'save_names': [
  ('omits final newline', '''def save_names(path, names):
    path.write_text("\\n".join(names), encoding="utf-8")'''),
  ('writes Latin-1', '''def save_names(path, names):
    path.write_text("\\n".join(names) + ("\\n" if names else ""), encoding="latin-1")'''),
 ],
 'load_names': [
  ('keeps raw line endings', '''def load_names(path):
    try:
        with open(path, encoding="utf-8") as source:
            return list(source)
    except FileNotFoundError:
        return []'''),
  ('fails when file is missing', '''def load_names(path):
    with open(path, encoding="utf-8") as source:
        return [line.strip() for line in source if line.strip()]'''),
 ],
 'word_counts': [
  ('keeps mixed case', '''def word_counts(text):
    counts = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts'''),
  ('counts only unique words', '''def word_counts(text):
    return {word.lower(): 1 for word in text.split()}'''),
 ],
 'ranked': [
  ('sorts scores low first', '''def ranked(scores):
    return sorted(scores.items(), key=lambda pair: (pair[1], pair[0]))'''),
  ('keeps insertion order on ties', '''def ranked(scores):
    return sorted(scores.items(), key=lambda pair: -pair[1])'''),
 ],
 'group_by_length': [
  ('keeps only last word per length', '''def group_by_length(words):
    return {len(word): [word] for word in words}'''),
  ('uses length minus one', '''def group_by_length(words):
    groups = {}
    for word in words:
        groups.setdefault(len(word) - 1, []).append(word)
    return groups'''),
 ],
 'top_n': [
  ('takes smallest scores', '''def top_n(scores, n):
    return sorted(scores)[:n]'''),
  ('takes first input scores', '''def top_n(scores, n):
    return scores[:n]'''),
 ],
 'parse_roster': [
  ('does not strip names', '''def parse_roster(lines):
    roster = {}
    for line in lines:
        if line.strip():
            name, score = line.split(",", 1)
            roster[name] = int(score)
    return roster'''),
  ('keeps score as text', '''def parse_roster(lines):
    roster = {}
    for line in lines:
        if line.strip():
            name, score = line.split(",", 1)
            roster[name.strip()] = score.strip()
    return roster'''),
 ],
 'meeting_text': [
  ('does not pad the minute', '''def meeting_text(time_tuple):
    hour, minute = time_tuple
    return f"{hour}:{minute}"'''),
  ('uses a 12-hour clock', '''def meeting_text(time_tuple):
    hour, minute = time_tuple
    return f"{hour % 12:02d}:{minute:02d}"'''),
 ],
 'remove_short_words': [
  ('removes while looping', '''def remove_short_words(words, min_length):
    for word in words:
        if len(word) < min_length:
            words.remove(word)
    return words'''),
  ('excludes boundary length', '''def remove_short_words(words, min_length):
    return [word for word in words if len(word) > min_length]'''),
 ],
}
lp03_mutants = {
 'Tally.add': [
  ('resets count to one', '''def add(self, label):
    self.counts[label] = 1'''),
 ],
 'Tally.count': [
  ('raises for unseen label', '''def count(self, label):
    return self.counts[label]'''),
 ],
 'long_words': [
  ('excludes boundary length', '''def long_words(words, min_length):
    return [word for word in words if len(word) > min_length]'''),
  ('sorts result alphabetically', '''def long_words(words, min_length):
    return sorted(word for word in words if len(word) >= min_length)'''),
 ],
 'make_multiplier': [
  ('adds instead of multiplies', '''def make_multiplier(factor):
    return lambda value: value + factor'''),
  ('always doubles', '''def make_multiplier(factor):
    return lambda value: value * 2'''),
 ],
 'count_calls': [
  ('forgets original result', '''def count_calls(func):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper'''),
  ('counts at decoration time', '''def count_calls(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    wrapper.calls = 1
    return wrapper'''),
 ],
 'make_counter': [
  ('returns before increasing', '''def make_counter():
    count = 0
    def next_count():
        nonlocal count
        result = count
        count += 1
        return result
    return next_count'''),
  ('shares all counters', '''def make_counter():
    if not hasattr(make_counter, "count"):
        make_counter.count = 0
    def next_count():
        make_counter.count += 1
        return make_counter.count
    return next_count'''),
 ],
 'once': [
  ('runs on every call', '''def once(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper'''),
  ('uses None as not-run signal', '''def once(func):
    result = None
    def wrapper(*args, **kwargs):
        nonlocal result
        if result is None:
            result = func(*args, **kwargs)
        return result
    return wrapper'''),
 ],
 'Stack.pop': [
  ('pops oldest item', '''def pop(self):
    if not self.items:
        raise IndexError("Stack is empty")
    return self.items.pop(0)'''),
 ],
 'Stack.peek': [
  ('removes top item', '''def peek(self):
    if not self.items:
        raise IndexError("Stack is empty")
    return self.items.pop()'''),
 ],
 'group_scores': [
  ('keeps first duplicate', '''def group_scores(rows):
    result = {}
    for name, score in rows:
        result.setdefault(name, score)
    return result'''),
  ('returns rows as a list', '''def group_scores(rows):
    return list(rows)'''),
 ],
 'compose': [
  ('applies f before g', '''def compose(f, g):
    return lambda value: g(f(value))'''),
  ('forgets f', '''def compose(f, g):
    return lambda value: g(value)'''),
 ],
 'Gradebook.ranked_report': [
  ('sorts averages low first', '''def ranked_report(self):
    averages = {name: self.average(name) for name in self.scores}
    return sorted(averages.items(), key=lambda pair: (pair[1] is None, pair[1] or 0, pair[0]))'''),
  ('keeps insertion order', '''def ranked_report(self):
    averages = {name: self.average(name) for name in self.scores}
    return list(averages.items())'''),
 ],
}
total=0; caught=0; escaped=[]
for packet, mutations in (
    ('lp01-intro-to-python', lp01_mutants),
    ('lp02-data-structures', lp02_mutants),
    ('lp03-more-python-skills', lp03_mutants),
):
    source = pathlib.Path(packet, 'solutions.py').read_text(encoding='utf-8')
    for exercise, mutants in mutations.items():
        for label, replacement in mutants:
            with tempfile.TemporaryDirectory() as folder:
                path = pathlib.Path(folder) / 'wrong.py'
                path.write_text(replace_function(source, exercise, replacement), encoding='utf-8')
                result = subprocess.run(
                    [sys.executable, f'{packet}/check.py', '--module', str(path)],
                    capture_output=True, text=True,
                )
            total += 1
            test_name = exercise.split('.')[0]
            status = 'CAUGHT' if result.returncode == 1 and f'FAIL {test_name}:' in result.stdout else 'ESCAPED'
            if status == 'CAUGHT': caught += 1
            else: escaped.append((packet, exercise, label, result.stdout, result.stderr))
            print(f'{packet:26} {exercise}: {label:38} {status}')
# Week 5 kindred packet: three plausible wrong answers per exercise.
lp03a_mutants = {
 'total_of_evens': [
  ('adds every value', '''def total_of_evens(numbers):
    return sum(numbers)'''),
  ('ignores negative evens', '''def total_of_evens(numbers):
    return sum(number for number in numbers if number > 0 and number % 2 == 0)'''),
  ('counts evens instead of adding', '''def total_of_evens(numbers):
    return sum(1 for number in numbers if number % 2 == 0)'''),
 ],
 'count_up_by': [
  ('includes stop', '''def count_up_by(start, stop, step):
    if step == 0: raise ValueError("step cannot be zero")
    return list(range(start, stop + (1 if step > 0 else -1), step))'''),
  ('forces positive step', '''def count_up_by(start, stop, step):
    if step == 0: raise ValueError("step cannot be zero")
    return list(range(start, stop, abs(step)))'''),
  ('skips start', '''def count_up_by(start, stop, step):
    if step == 0: raise ValueError("step cannot be zero")
    return list(range(start + step, stop, step))'''),
 ],
 'repair_average': [
  ('resets inside loop', '''def repair_average(numbers):
    if not numbers: return 0.0
    total = 0
    for number in numbers:
        total = 0
        total += number
    return round(total / len(numbers), 1)'''),
  ('rounds to whole number', '''def repair_average(numbers):
    return round(sum(numbers) / len(numbers)) if numbers else 0.0'''),
  ('truncates the mean', '''def repair_average(numbers):
    return float(int(sum(numbers) / len(numbers))) if numbers else 0.0'''),
 ],
 'repair_first_even': [
  ('returns after first odd', '''def repair_first_even(numbers):
    for number in numbers:
        if number % 2 == 0: return number
        return None
    return None'''),
  ('returns last even', '''def repair_first_even(numbers):
    found = None
    for number in numbers:
        if number % 2 == 0: found = number
    return found'''),
  ('returns first value without checking', '''def repair_first_even(numbers):
    return numbers[0] if numbers else None'''),
 ],
 'ask_until_valid': [
  ('excludes bounds', '''def ask_until_valid(read, low, high, max_attempts=5):
    for _ in range(max_attempts):
        value = read()
        if low < value < high: return value
    return None'''),
  ('reads one extra time', '''def ask_until_valid(read, low, high, max_attempts=5):
    for _ in range(max_attempts + 1):
        value = read()
        if low <= value <= high: return value
    return None'''),
  ('stops after first invalid', '''def ask_until_valid(read, low, high, max_attempts=5):
    for _ in range(max_attempts):
        value = read()
        if low <= value <= high: return value
        return None
    return None'''),
 ],
 'last_match_search': [
  ('scans left to right', '''def last_match_search(items, target):
    for index, item in enumerate(items):
        if item == target: return index, index + 1
    return -1, len(items)'''),
  ('does not count winning check', '''def last_match_search(items, target):
    for index in range(len(items) - 1, -1, -1):
        if items[index] == target: return index, len(items) - 1 - index
    return -1, len(items)'''),
  ('always reports full scan cost', '''def last_match_search(items, target):
    for index in range(len(items) - 1, -1, -1):
        if items[index] == target: return index, len(items)
    return -1, len(items)'''),
 ],
 'binary_search': [
  ('moves high in wrong direction', '''def binary_search(sorted_items, target):
    low, high, checks = 0, len(sorted_items) - 1, 0
    while low <= high:
        mid = (low + high) // 2
        checks += 1
        if sorted_items[mid] == target: return mid, checks
        if sorted_items[mid] < target: high = mid - 1
        else: low = mid + 1
    return -1, checks'''),
  ('forgets unsuccessful comparisons', '''def binary_search(sorted_items, target):
    low, high, checks = 0, len(sorted_items) - 1, 0
    while low <= high:
        mid = (low + high) // 2
        checks += 1
        if sorted_items[mid] == target: return mid, checks
        if sorted_items[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1, 0'''),
  ('counts a linear scan', '''def binary_search(sorted_items, target):
    for index, item in enumerate(sorted_items):
        if item == target: return index, index + 1
    return -1, len(sorted_items)'''),
 ],
 'selection_sort': [
  ('selects largest first', '''def selection_sort(items):
    result = list(items)
    for left in range(len(result)):
        chosen = left
        for index in range(left + 1, len(result)):
            if result[index] > result[chosen]: chosen = index
        result[left], result[chosen] = result[chosen], result[left]
    return result'''),
  ('changes input list', '''def selection_sort(items):
    result = items
    for left in range(len(result)):
        chosen = left
        for index in range(left + 1, len(result)):
            if result[index] < result[chosen]: chosen = index
        result[left], result[chosen] = result[chosen], result[left]
    return result'''),
  ('drops duplicate values', '''def selection_sort(items):
    return sorted(set(items))'''),
 ],
 'bubble_sort_passes': [
  ('records only final pass', '''def bubble_sort_passes(items):
    values = list(items)
    for end in range(len(values) - 1, 0, -1):
        for index in range(end):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
    return [values] if len(values) > 1 else []'''),
  ('reuses one snapshot list', '''def bubble_sort_passes(items):
    values = list(items)
    snapshots = []
    for end in range(len(values) - 1, 0, -1):
        for index in range(end):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
        snapshots.append(values)
    return snapshots'''),
  ('stops after a quiet pass', '''def bubble_sort_passes(items):
    values = list(items)
    snapshots = []
    for end in range(len(values) - 1, 0, -1):
        changed = False
        for index in range(end):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                changed = True
        snapshots.append(values.copy())
        if not changed: break
    return snapshots'''),
 ],
 'duplicate_pair': [
  ('returns a boolean', '''def duplicate_pair(items):
    for first in range(len(items)):
        for second in range(first + 1, len(items)):
            if items[first] == items[second]: return True
    return None'''),
  ('keeps last pair', '''def duplicate_pair(items):
    found = None
    for first in range(len(items)):
        for second in range(first + 1, len(items)):
            if items[first] == items[second]: found = (first, second)
    return found'''),
  ('checks only neighbors', '''def duplicate_pair(items):
    for first in range(len(items) - 1):
        if items[first] == items[first + 1]: return first, first + 1
    return None'''),
 ],
 'squares_of_odds': [
  ('returns only one version', '''def squares_of_odds(numbers):
    return [n * n for n in numbers if n % 2]'''),
  ('includes even values', '''def squares_of_odds(numbers):
    values = [n * n for n in numbers]
    return values, values.copy()'''),
  ('reverses output order', '''def squares_of_odds(numbers):
    values = [n * n for n in numbers if n % 2]
    return values[::-1], values[::-1]'''),
 ],
}
lp03a_source = pathlib.Path('lp03a-iteration-and-algorithms/solutions.py').read_text(encoding='utf-8')
for exercise, mutants in lp03a_mutants.items():
    for label, replacement in mutants:
        with tempfile.TemporaryDirectory() as folder:
            path = pathlib.Path(folder) / 'wrong.py'
            path.write_text(replace_function(lp03a_source, exercise, replacement), encoding='utf-8')
            result = subprocess.run(
                [sys.executable, 'lp03a-iteration-and-algorithms/check.py', '--module', str(path)],
                capture_output=True, text=True,
            )
        total += 1
        status = 'CAUGHT' if result.returncode == 1 and f'FAIL {exercise}:' in result.stdout else 'ESCAPED'
        if status == 'CAUGHT': caught += 1
        else: escaped.append(('lp03a-iteration-and-algorithms', exercise, label, result.stdout, result.stderr))
        print(f'lp03a-iteration-and-algorithms {exercise}: {label:30} {status}')
lp06a_mutants = {
 'badge_line': [
  ('keeps outer spaces', '''def badge_line(name, role="guest"):
    return f"{name} | {role}"'''),
  ('drops blank fallbacks', '''def badge_line(name, role="guest"):
    return f"{name.strip()} | {role.strip()}"'''),
 ],
 'headline': [
  ('uses lower case', '''def headline(title, marker="*"):
    return f"{marker}{title.strip().lower()}{marker}"'''),
  ('drops blank fallback', '''def headline(title, marker="*"):
    return f"{marker}{title.strip().upper()}{marker}"'''),
 ],
 'format_duration': [
  ('drops second padding', '''def format_duration(seconds):
    minutes, remainder = divmod(seconds, 60)
    return f"{minutes}:{remainder}"'''),
  ('rounds up a minute', '''def format_duration(seconds):
    minutes, remainder = divmod(seconds, 60)
    return f"{minutes + (remainder > 0)}:{remainder:02d}"'''),
 ],
 'repair_price_line': [
  ('prints instead of returns', '''def repair_price_line(item, cents):
    print(f"{item}: ${cents // 100}.{cents % 100:02d}")'''),
  ('drops cent padding', '''def repair_price_line(item, cents):
    return f"{item}: ${cents // 100}.{cents % 100}"'''),
 ],
 'repair_shadowed_prefix': [
  ('always uses default', '''def repair_shadowed_prefix(word, prefix="Note"):
    return f"Note: {word}"'''),
  ('uses wrong separator', '''def repair_shadowed_prefix(word, prefix="Note"):
    return f"{prefix} - {word}"'''),
 ],
 'card_from_parts': [
  ('forgets tag', '''def card_from_parts(title, place, start, tag="EVENT"):
    return f"{title} @ {place} ({start})"'''),
  ('swaps place and start', '''def card_from_parts(title, place, start, tag="EVENT"):
    return f"[{tag}] {title} @ {start} ({place})"'''),
 ],
 'scope_snapshot': [
  ('inner leaks outward', '''def scope_snapshot(label):
    message = f"outer:{label}"
    def inner():
        return f"inner:{label}"
    message = inner()
    return f"outer:{label}", message, message'''),
  ('never shadows outer', '''def scope_snapshot(label):
    message = f"outer:{label}"
    return message, message, message'''),
 ],
 'make_signoff': [
  ('forgets author', '''def make_signoff(author):
    return lambda message: f"{message} / "'''),
  ('uppercases author', '''def make_signoff(author):
    return lambda message: f"{message} / {author.upper()}"'''),
 ],
 'render_agenda': [
  ('sorts rows by time', '''def render_agenda(entries, heading="Today's plan"):
    return "\\n".join([heading] + [_agenda_line(time, activity) for time, activity in sorted(entries)])'''),
  ('drops heading', '''def render_agenda(entries, heading="Today's plan"):
    return "\\n".join(_agenda_line(time, activity) for time, activity in entries)'''),
 ],
 'make_visit_tracker': [
  ('never advances', '''def make_visit_tracker(start=0):
    count = start
    def visit():
        return count
    return visit'''),
  ('advances by two', '''def make_visit_tracker(start=0):
    count = start
    def visit():
        nonlocal count
        count += 2
        return count
    return visit'''),
 ],
 'batch_badges': [
  ('returns names unchanged', '''def batch_badges(names, role="guest"):
    return list(names)'''),
  ('ignores supplied role', '''def batch_badges(names, role="guest"):
    return [badge_line(name) for name in names]'''),
 ],
}
lp06a_source = pathlib.Path('lp06a-functions-and-scope/solutions.py').read_text(encoding='utf-8')
for exercise, mutants in lp06a_mutants.items():
    for label, replacement in mutants:
        with tempfile.TemporaryDirectory() as folder:
            path = pathlib.Path(folder) / 'wrong.py'
            path.write_text(replace_function(lp06a_source, exercise, replacement), encoding='utf-8')
            result = subprocess.run(
                [sys.executable, 'lp06a-functions-and-scope/check.py', '--module', str(path)],
                capture_output=True, text=True,
            )
        total += 1
        status = 'CAUGHT' if result.returncode == 1 and f'FAIL {exercise}:' in result.stdout else 'ESCAPED'
        if status == 'CAUGHT': caught += 1
        else: escaped.append(('lp06a-functions-and-scope', exercise, label, result.stdout, result.stderr))
        print(f'lp06a-functions-and-scope {exercise}: {label:30} {status}')
print(f'\nmutants caught by lesson checks: {caught}/{total}')
for e in escaped: print('  NOT RELIABLY CAUGHT:',e)
raise SystemExit(1 if escaped else 0)
