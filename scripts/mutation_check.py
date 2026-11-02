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
    node = next(item for item in tree.body if isinstance(item, ast.FunctionDef) and item.name == name)
    lines = source.splitlines(keepends=True)
    return ''.join(lines[:node.lineno - 1]) + textwrap.dedent(replacement).strip() + '\n\n' + ''.join(lines[node.end_lineno:])

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
cases={
 'lp02-data-structures':[
  ('unique_names = list(set(names)) (unordered)',lambda s:re.sub(r'def unique_names\(names\):.*?return result','def unique_names(names):\n    return list(set(names))',s,flags=re.S)),
  ('highest_score >= (last tied wins)',lambda s:s.replace('score > best_score','score >= best_score')),
  ('save_names no final newline',lambda s:s.replace('        text = text + "\\n"\n','        pass\n')),
  ('save_names writes ascii/latin-1 default encoding',lambda s:s.replace('encoding="utf-8")','encoding="latin-1")')),
 ],
 'lp03-more-python-skills':[
  ('Tally.count KeyError on unseen',lambda s:s.replace('return self.counts.get(label, 0)\n\n\ndef long','return self.counts[label]\n\n\ndef long')),
  ('long_words uses >',lambda s:s.replace('len(word) >= min_length','len(word) > min_length')),
  ('count_calls forgets to return result',lambda s:s.replace('return func(*args, **kwargs)\n\n    wrapper.calls = 0','func(*args, **kwargs)\n\n    wrapper.calls = 0')),
  ('count_calls counts at decoration time only',lambda s:s.replace('        wrapper.calls += 1\n','')),
  ('make_multiplier adds instead of multiplies',lambda s:s.replace('value * factor','value + factor')),
 ]}
total=0; caught=0; escaped=[]
lp01_source = pathlib.Path('lp01-intro-to-python/solutions.py').read_text(encoding='utf-8')
for exercise, mutants in lp01_mutants.items():
    for label, replacement in mutants:
        with tempfile.TemporaryDirectory() as folder:
            path = pathlib.Path(folder) / 'wrong.py'
            path.write_text(replace_function(lp01_source, exercise, replacement), encoding='utf-8')
            result = subprocess.run(
                [sys.executable, 'lp01-intro-to-python/check.py', '--module', str(path)],
                capture_output=True, text=True,
            )
        total += 1
        status = 'CAUGHT' if result.returncode == 1 and f'FAIL {exercise}:' in result.stdout else 'ESCAPED'
        if status == 'CAUGHT': caught += 1
        else: escaped.append(('lp01-intro-to-python', exercise, label, result.stdout, result.stderr))
        print(f'lp01-intro-to-python       {exercise}: {label:38} {status}')
for d,muts in cases.items():
    sol,_=split(f'{d}/solutions.py'); _,pmain=split(f'{d}/practice.py')
    # decorated shout in practice main is wrapped manually; emulate for lp03
    for name,fn in muts:
        m=fn(sol)
        assert m!=sol, f'mutation did not apply: {d} {name}'
        code=m+'\n'+pmain
        if d.startswith('lp03'): code=m+'\n'+pmain.replace('shout = count_calls(shout)','shout = shout')
        with tempfile.TemporaryDirectory() as t:
            f=pathlib.Path(t)/'x.py'; f.write_text(code)
            runs=[subprocess.run([sys.executable,str(f)],capture_output=True,text=True,env={**os.environ,'PYTHONHASHSEED':str(seed)}).returncode for seed in range(1,13)]
        total+=1
        status='CAUGHT' if all(runs) else ('FLAKY (passes %d/12 hash seeds)'%sum(1 for r in runs if r==0) if any(r==0 for r in runs) and not all(r==0 for r in runs) else 'ESCAPED')
        if status=='CAUGHT': caught+=1
        else: escaped.append((d,name,status))
        print(f'{d:26} {name:48} {status}')
print(f'\nmutants caught by lesson checks: {caught}/{total}')
for e in escaped: print('  NOT RELIABLY CAUGHT:',e)
raise SystemExit(1 if escaped else 0)
