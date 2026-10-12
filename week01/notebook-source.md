# Week 01 | Learn the Controls | Fall 26

This is the source for the **actual first weekly session**: setting up the tools and getting comfortable with the terminal. It accompanies the [interactive Week 1 slides](week01-slides.html) and [Command Line Basics](../resources/command-line-basics.md). Work through predictions in a real terminal; a simulated terminal is available in the slide deck for a first rehearsal.

## Outcomes

By the end of this week, a learner can explain the jobs of Python, an editor, a terminal, and Git; identify their current folder; list files; move through folders; run a Python file; and diagnose a command run from the wrong location. This is a tool-orientation week. Python variables and functions come later in LP 01.

## The toolbox

| Tool | Job | Quick check |
| --- | --- | --- |
| Python | Runs `.py` programs | `python --version` (or `python3 --version`) |
| Editor (VS Code or Spyder) | Lets you write and save code | Open a project file and save it. |
| Terminal | Window where commands are typed | Open a new terminal and find its prompt. |
| Shell (PowerShell, zsh, bash) | Reads the command and runs the program | Type `pwd` and press Enter. |
| Git | Records project history | `git --version` |

The **prompt** is the text the shell displays before your command. Do not type a tutorial's `$` or `PS>` prompt symbol. A command has a program, optional flags, and optional arguments: `python --version` asks Python for its version; `python hello.py` asks it to run a file.

Git and GitHub enter this picture early: **Git** is the local version-history program; **GitHub** hosts a copy online. `git --version` confirms the local program is installed. During Week 01, concentrate on finding and running files safely. Week 02 teaches how to save those files with Git and keep your fork current.

## Your location matters

Every terminal is standing in a **working directory**. Relative paths start there. An absolute path names a file or folder from the top of the computer. `.` means here; `..` means parent folder; `~` means home folder.

Use the **Look → Move → Act** loop:

1. **Look:** `pwd` prints where you are; `ls` lists the current folder.
2. **Move:** `cd folder-name` enters a folder; `cd ..` goes back up.
3. **Act:** Run the command that needs that location, such as `python hello.py`.
4. If the result surprises you, look again before changing the command.

On Windows PowerShell, `ls -Force` includes hidden items. On macOS/Linux, `ls -a` does. The week 1 slides have an OS toggle; copy the command for your shell.

### I Do: narrate a path

Imagine the current folder contains `python-fall26-code-alongs`. An instructor types:

```text
pwd
ls
cd python-fall26-code-alongs
pwd
ls
```

Before each Enter, predict whether the command **looks**, **moves**, or **acts**, and which folder the next prompt represents. The second `pwd` should show the repository folder, one level deeper than the first.

### We Do: choose the next command

The prompt shows the repository folder, but `hello.py` is inside a `my-work` folder. A learner tries `python hello.py` and gets a file-not-found error. Together, decide how to check the folder, enter `my-work`, and rerun the file. Use `pwd` and `ls` as evidence, not a guess.

### You Do: remote learner mission

Create a practice folder, put a tiny `hello.py` in it, and run the file from the right folder. In PowerShell, `New-Item hello.py` creates an empty file; on macOS/Linux, `touch hello.py` does. Use your editor to put `print('Hello, Fall 26!')` in the file and save it. Then try running from the parent folder and explain why the relative filename fails there. If you need a hint, ask for the next **location check**, not the full command sequence.

## Error-reading habit

| Symptom | First question | Useful check |
| --- | --- | --- |
| Command not found | Is the program installed and on PATH? | `python --version`, `git --version` |
| File not found | Am I in the folder containing the file? | `pwd`, then `ls` |
| A path with spaces fails | Did I quote the entire path? | Re-enter with quotes around the path. |
| The prompt changed unexpectedly | Did `cd` move me somewhere else? | `pwd` |

Use `rm` or `Remove-Item` only when you know exactly what path it will affect. The practice mission does not need deletion.

## Retrieval questions

1. What is the difference between a terminal and a shell?
2. What changes after `cd ..`?
3. Why can `python hello.py` work in one folder and fail in another?
4. Which command tells you where you are before you run a file?
5. Which two pieces make up `python --version`?
6. Which tool records history locally, and which service stores a copy online?

For an additional explanation and more missions, read the [full command-line guide](../resources/command-line-basics.md). For a visual practice route, open the [Week 1 slides](week01-slides.html) locally or through the course site.
