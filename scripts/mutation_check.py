"""Mutation check: known wrong solutions must FAIL each packet's practice assertions.

Run from anywhere:  python scripts/mutation_check.py
Exits nonzero if any wrong solution gets through (or passes only on some hash seeds).
"""
import os
import pathlib

os.chdir(pathlib.Path(__file__).resolve().parents[1])

import re, pathlib, subprocess, sys, os, tempfile, textwrap
def split(path):
    s=pathlib.Path(path).read_text(); i=s.index('if __name__ == "__main__":'); return s[:i], s[i:]
cases={
 'lp01-intro-to-python':[
  ('classify uses > not >=',lambda s:s.replace('score >= 70','score > 70',1)),
  ('count_passing uses > 70',lambda s:s.replace('if score >= 70:\n            count','if score > 70:\n            count')),
  ('count_passing always len(scores)',lambda s:re.sub(r'def count_passing\(scores\):.*?return count','def count_passing(scores):\n    return len(scores)',s,flags=re.S)),
 ],
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
print(f'\nmutants caught by practice.py assertions: {caught}/{total}')
for e in escaped: print('  NOT RELIABLY CAUGHT:',e)
raise SystemExit(1 if escaped else 0)
