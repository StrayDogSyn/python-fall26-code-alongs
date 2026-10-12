# Week 02 | Save Points | Fall 26

This is the source for the **actual second weekly session**: Git and GitHub as a way to save, review, and share code. It accompanies the [interactive Week 2 slides](week02-slides.html) and [Git Commands](../resources/git-commands.md). Practice in your own fork or a disposable practice repository, never in someone else's course repository.

## Outcomes

By the end of this week, a learner can distinguish Git from GitHub; name the working folder, staging area, local repository, and GitHub copy; read `git status`; stage, commit, and push a small change; and explain what to check before undoing anything.

## Four places for your code

| Place | Plain-language picture | How work reaches it |
| --- | --- | --- |
| Working folder | Files on your desk | Edit and save in your editor. |
| Staging area | Items picked for a box | `git add filename` or `git add .` |
| Local repository | A sealed, labeled save point | `git commit -m "Message"` |
| GitHub | A copy of those save points online | `git push` |

Git is the local history tool; GitHub hosts an online copy. A commit that has not been pushed is still only on your computer. `git status` reports which files have changed and whether your branch is ahead of the remote.

## The daily loop

From inside your own repository:

```text
git status
git add my-work/hello_mine.py
git status
git commit -m "Add my hello practice"
git push
```

The first status shows an untracked or modified file. `git add` selects the version of a file to include in the next commit; it usually prints nothing. The second status should show **Changes to be committed**. The commit creates a local save point. The push sends it to the online `origin` remote. Check the result with another `git status`.

`git add .` stages **every** changed file in the current folder and below. Inspect `git status` first so you know what you are including. If you edit a file again after staging it, run `git add` again to stage the newer version.

## Fork, origin, and upstream

A **fork** is your GitHub copy of the instructor's repository. In a common class setup, `origin` names **your fork**, where you push. `upstream` names the original class repository, where you get new weekly material. Confirm with `git remote -v` before pushing or pulling. These are conventional names, not magic destinations: the URLs shown by your own terminal are the truth.

## Maintaining a class fork

Repository maintenance is a repeated, deliberate loop, not a one-time setup. From your own fork's local clone, first inspect `git status` and protect any unfinished work. Check remote URLs with `git remote -v`. The class guide's simple weekly route is `git pull upstream main` to bring in instructor updates, followed by `git push origin main` to update your fork. If `upstream` is missing, add it once with `git remote add upstream https://github.com/StrayDogSyn/python-fall26-code-alongs.git`, then check `git remote -v` again. In a fork, do not push class changes to `upstream`.

Keep generated files and secrets out of commits. A repository's `.gitignore` can exclude local environments and temporary outputs, but it does not untrack a file that was already committed. Before staging, use `git status` to inspect unexpected files. After syncing, use `git status` again and verify the branch and remote state. If Git reports a conflict or rejected push, read the exact message and consult the [Git guide](../resources/git-commands.md) rather than guessing an undo command.

## I Do: trace one file

The instructor saves a new file and runs `git status`. It appears as **Untracked files**. After `git add`, it appears under **Changes to be committed**. After `git commit`, it is part of local history. After `git push`, GitHub has it too. At each step, say where the newest version lives and what command should happen next.

## We Do: make a careful choice

Suppose `git status` shows both `my-work/hello_mine.py` and `notes-private.txt`. Together, decide which file to stage. Predict what `git add .` would include and why a path-specific `git add my-work/hello_mine.py` is safer here. Then write a commit message that describes the change, such as “Add my hello practice.”

## You Do: independent save point

In **your own fork or practice repository**, edit one practice file, inspect status, stage only that file, inspect status again, commit with a meaningful message, and push. Share the final `git status` summary and a sentence explaining what changed locally and online. If you cannot push yet, complete the local steps and describe where the commit currently lives.

## When something looks wrong

| Symptom | Read before acting | Safe first step |
| --- | --- | --- |
| “not a git repository” | Current folder | `pwd`, then move into your repository |
| A file is missing from the commit | Status sections | Stage that file, then make a new commit |
| Push rejected | Remote and branch messages | Read the message; check `git status` and `git remote -v` |
| Unexpected file staged | Staging section | Use the Undo Guide in the slides or Git guide for the exact case |

Avoid `git reset --hard`, forced pushes, or deleting `.git` as a first response. Choose an undo command only after you know whether the change is untracked, unstaged, staged, committed, or pushed.

## Retrieval questions

1. What does `git add` do that saving a file in an editor does not?
2. Where is a commit before `git push`?
3. Why is `git status` useful before and after staging?
4. What might `origin` and `upstream` point to in a forked class repository?
5. Why might `git add .` be a poor choice when two unrelated files have changed?
6. Which remote provides new class content, and which remote receives your work?
7. What should you check before a weekly pull, and how can `.gitignore` help?

For more commands, recovery cases, and missions, read the [full Git guide](../resources/git-commands.md). For the staging visualizer and Undo Guide, open the [Week 2 slides](week02-slides.html) locally or through the course site.
