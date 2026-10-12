/* Week 2 deck: "Save Points"
   Sources of truth: resources/git-commands.md (commands, outputs, vocabulary) and README.md (links)
   Rebuild after editing: python resources/slides/build.py
   Rules: write a literal backslash as \\ ; escape < as &lt; ; no em dashes. */
window.DECK = {
  title: "Intro to Python, Week 2: Save Points",

  terms: {
    review: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive"],
    fresh: ["commit", "remote", "main", "staging", "push", "branch", "fork", "origin", "upstream", "pull"]
  },

  slides: [
    {
      title: "Save Points",
      html: `
<p class="kicker">Intro to Python · Fall 26 · Week 2</p>
<h1>Save Points</h1>
<p class="lead">Last week you learned the controls. This week you learn to save the game.</p>
<div class="cols">
  <div class="panel">
    <h3>Tonight's agenda</h3>
    <ol>
      <li>Git, GitHub, and one-time setup</li>
      <li>The four places your code lives</li>
      <li>The daily loop: status, add, commit, push</li>
      <li>Your fork, origin, and upstream</li>
      <li>Undo buttons and what never to commit</li>
    </ol>
  </div>
  <div class="panel">
    <h3>Same two goals</h3>
    <ol>
      <li><span class="b">Tool comfort:</span> save, back up, and sync your work with Git from any terminal.</li>
      <li><span class="y">Vocabulary comfort:</span> ten new companions tonight, and they are the ones you will hear in every code review.</li>
    </ol>
  </div>
</div>
<div class="callout note"><strong>Week 1 recap in one line</strong>Look before you act: <code>pwd</code>, <code>ls</code>, <code>cd</code>. Every Git command tonight runs from inside your project folder, so that habit pays off immediately.</div>`,
      notes: {
        timing: "3 min",
        talking: "Welcome back. Quick show of hands: who finished a Week 1 mission? Tonight's vocabulary is the densest of the course, and that is fine. We will say every word out loud. Press G any time to see the Week 1 companions already unlocked.",
        question: "Do I need GitHub tonight, or just Git? Both, but Git does most of the work. GitHub is where the save points get backed up.",
        failure: "Someone missed Week 1 setup. Pair them up and point to the Week 1 deck in the repo under week01.",
        action: "Have the room say the Week 1 loop out loud: pwd, ls, cd."
      }
    },
    {
      title: "Git is a save system",
      companions: ["commit"],
      html: `
<h2>Git is a save system for your code</h2>
<p class="lead">Before the boss fight, you save. If the fight goes badly, you reload, and nothing is lost. A Git <strong>commit</strong> is that save point: a snapshot of your whole project, with a note saying what changed.</p>
<div class="cols">
  <div class="panel"><h3 class="g">A history</h3><p>Every save point is kept, so you can see what your code looked like last Tuesday.</p></div>
  <div class="panel"><h3 class="b">A safety net</h3><p>Break something? Go back to the last version that worked.</p></div>
  <div class="panel"><h3 class="p">A way to share</h3><p>Send your save points to GitHub, and your work is backed up and visible to mentors, classmates, and future employers.</p></div>
</div>
<p>Git has hundreds of commands. You need about a dozen, and four of them do most of the work.</p>`,
      notes: {
        timing: "3 min",
        talking: "Lead with the save point image. A regular Save button keeps one version; Git keeps every version you choose to mark, with a label.",
        question: "Is a commit the same as saving a file? No. Saving writes the file in your editor. A commit marks a save point for the whole project, with a message.",
        failure: "None yet; this is concept only. If questions run long, park them for the visualizer slide.",
        action: "Say it together: commit. Then: a commit is a save point."
      }
    },
    {
      title: "Git and GitHub are different things",
      companions: ["remote"],
      html: `
<h2>Git and GitHub are two different things</h2>
<div class="tbl-wrap"><table class="tbl">
  <tr><th></th><th>Git</th><th>GitHub</th></tr>
  <tr><td><strong>What it is</strong></td><td>A program on your computer</td><td>A website</td></tr>
  <tr><td><strong>What it does</strong></td><td>Records save points for a project</td><td>Stores a copy of your project online</td></tr>
  <tr><td><strong>Works offline?</strong></td><td>Yes</td><td>No</td></tr>
  <tr><td><strong>90s translation</strong></td><td class="g">The memory card</td><td class="p">The friend's house you bring the memory card to</td></tr>
</table></div>
<p>You can use Git without GitHub. In this class you use both: Git to save your work, and GitHub to back it up and share it. The copy on GitHub is called a <strong>remote</strong>.</p>`,
      notes: {
        timing: "2 min",
        talking: "The memory card versus the friend's house. Your saves live on the card first. Carrying the card over is a separate step, and that step is push.",
        question: "If GitHub goes down, is my work gone? No. Git keeps everything on your computer. GitHub is the backup and the sharing spot.",
        failure: "Someone thinks they 'installed GitHub'. Clarify: they installed Git, and they have a GitHub account. Two things.",
        action: "Say it together: Git, GitHub, remote."
      }
    },
    {
      title: "One-time setup",
      companions: ["main"],
      html: `
<h2>One-time setup (once per computer)</h2>
<pre class="cmd"><code><span class="cmt"># 1. Confirm Git is installed</span>
git --version

<span class="cmt"># 2. Tell Git who you are (use your GitHub email)</span>
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

<span class="cmt"># 3. Three defaults that prevent beginner headaches</span>
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global core.editor "code --wait"

<span class="cmt"># 4. Check your work</span>
git config --global --list</code></pre>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Setting</th><th>Why you want it</th></tr>
  <tr><td><code>init.defaultBranch main</code></td><td>Names the first branch <code>main</code> in every new repository, matching GitHub</td></tr>
  <tr><td><code>pull.rebase false</code></td><td>Combines downloaded work with yours the simplest way, so pulls do not stop and ask you to choose</td></tr>
  <tr><td><code>core.editor "code --wait"</code></td><td>Opens VS Code for longer messages instead of Vim, an editor famous for trapping newcomers</td></tr>
</table></div>
<p class="small muted">Spyder users: keep the <code>core.editor</code> line anyway. Git still needs a message editor, and VS Code is the friendly one. First push sign-in: <span class="os-win">nothing extra on Windows. Git Credential Manager opens a browser window; sign in and approve.</span><span class="os-mac">install the GitHub CLI, run <code>gh auth login</code>, choose HTTPS, and answer Y to authenticate Git.</span></p>`,
      notes: {
        timing: "5 min",
        talking: "Every commit is signed with a name and email, so Git refuses to save until it has both. Use the email on your GitHub account so commits link to your profile. Walk the three defaults table: each line prevents a specific beginner headache.",
        question: "Do I do this for every project? No. Once per computer. The --global flag means 'for everything on this machine'.",
        failure: "'Author identity unknown' or 'Please tell me who you are': the two user config lines were skipped. Run them. A screen of ~ symbols appears later: that is Vim. Press Esc, type :wq, press Enter, then set core.editor.",
        action: "Say it together: main, the default branch."
      }
    },
    {
      title: "The four places your code lives",
      companions: ["staging"],
      html: `
<h2>The four places your code lives</h2>
<p>Most Git confusion disappears once you know your code can be in four places, and each core command moves it one step along.</p>
<div class="flow" role="img" aria-label="Working folder, then git add to the staging area, then git commit to the local repository, then git push to GitHub">
  <div class="step s1"><b>1. Working folder</b><span>Files you are editing</span><em>Items spread across your desk</em></div>
  <div class="arrow"><code>git add</code></div>
  <div class="step s2"><b>2. Staging area</b><span>Changes picked for the next save point</span><em>Items in the open box</em></div>
  <div class="arrow"><code>git commit</code></div>
  <div class="step s3"><b>3. Local repository</b><span>Save points on your computer</span><em>The box, taped and labeled</em></div>
  <div class="arrow"><code>git push</code></div>
  <div class="step s4"><b>4. GitHub</b><span>Your online copy</span><em>The box at the warehouse</em></div>
</div>
<p class="small muted">You get into box 1 by saving in your editor. The return trip: <code>git pull</code> brings new commits from GitHub back into your working folder.</p>
<details class="reveal"><summary>Why is there a staging area at all?</summary><div>Because you do not always want to save everything at once. If you fixed a bug <em>and</em> started a new exercise, staging lets you box those up as two separate, clearly labeled save points instead of one mystery box.</div></details>
<div class="callout warn"><strong>Important</strong>A commit lives only on your computer until you push. If your laptop meets a cup of coffee before you push, GitHub knows nothing about that work.</div>`,
      notes: {
        timing: "5 min",
        talking: "Mail a package: desk, open box, taped box, warehouse. Point to each column's color; the visualizer in two slides uses the same colors.",
        question: "Can I skip staging and commit everything? There are shortcuts, but staging is what lets you make small, clearly labeled commits. Build the habit first.",
        failure: "Someone says 'I committed, so it's on GitHub.' Not until push. Point at box 3 versus box 4.",
        action: "Say it together: working folder, staging area, local repository, GitHub."
      }
    },
    {
      title: "The daily loop",
      companions: ["push"],
      html: `
<h2>The daily loop: four commands, always in this order</h2>
<div class="cols">
  <div>
    <h3>1. <code>git status</code>: what changed?</h3>
    <p class="small">Changes nothing. Always safe. Run it before and after every other Git command.</p>
    <h3>2. <code>git add</code>: pick what to save</h3>
<pre class="cmd"><code>git add my-work/hello_mine.py
<span class="cmt"># or stage everything here and below:</span>
git add .</code></pre>
    <p class="small"><code>git add</code> prints nothing when it works. Glance at <code>git status</code> before <code>git add .</code> so there are no surprises in the box.</p>
  </div>
  <div>
    <h3>3. <code>git commit</code>: make the save point</h3>
<pre class="cmd"><code>git commit -m "Add my version of the hello script"</code></pre>
<pre class="out">[main 28926b2] Add my version of the hello script
 1 file changed, 1 insertion(+)
 create mode 100644 my-work/hello_mine.py</pre>
    <h3>4. <code>git push</code>: back it up</h3>
<pre class="cmd"><code>git push</code></pre>
<pre class="out">To https://github.com/YOUR-USERNAME/python-fall26-code-alongs.git
   7dfaf2c..28926b2  main -> main</pre>
  </div>
</div>
<p class="joke">🧓 Why do programmers make such loyal friends? They are not afraid to commit. (Pushing, on the other hand, they forget constantly.)</p>`,
      notes: {
        timing: "5 min",
        talking: "-m stands for message. 28926b2 is the commit's unique ID; theirs will be different. Status, add, commit, push: say it like a combo move.",
        question: "Do I push after every commit? You can. At minimum, push before you close the laptop.",
        failure: "'nothing added to commit but untracked files present': they skipped git add. 'nothing to commit, working tree clean': the file was not saved in the editor yet.",
        action: "Say the combo together: status, add, commit, push."
      }
    },
    {
      title: "Try it: move the package",
      html: `
<h2>Try it: move the package</h2>
<p>You just created <code>my-work/hello_mine.py</code>. Run the loop and watch the file travel. Every output below matches what real Git prints.</p>
<div data-gitviz="w2"></div>
<p class="small muted">Try this: <strong>git status → git add . → git commit -m → git push</strong>. Then press <em>Edit and save the file</em>, run <code>git add .</code>, edit again, and run <code>git status</code>. The same file shows up in two places. That surprise is worth meeting here instead of at midnight.</p>`,
      notes: {
        timing: "6 min",
        talking: "Drive it live, then let students try the 'edit after add' case. Narrate the package analogy as the cards move: desk, box, taped box, warehouse.",
        question: "Why is my file in two columns at once? The box holds the version from when you ran git add. Your newer edit is still on the desk. Run git add again.",
        failure: "Someone commits with an empty message box: Git aborts the commit. That matches real Git. Type a message.",
        action: "Each time you click a button, have the room say what moved: 'staged', 'committed', 'pushed'."
      }
    },
    {
      title: "Reading git status",
      companions: ["branch"],
      html: `
<h2>Reading <code>git status</code></h2>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Heading</th><th>Color</th><th>What it means</th><th>What to do</th></tr>
  <tr><td><code>Untracked files</code></td><td class="r">Red</td><td>A new file Git has never seen</td><td><code>git add</code> it if you want it saved</td></tr>
  <tr><td><code>Changes not staged for commit</code></td><td class="r">Red</td><td>A tracked file you edited</td><td><code>git add</code> it to include the edit</td></tr>
  <tr><td><code>Changes to be committed</code></td><td class="g">Green</td><td>Staged and waiting</td><td><code>git commit</code> to save</td></tr>
  <tr><td><code>nothing to commit, working tree clean</code></td><td>None</td><td>Everything is saved</td><td>Keep coding, or <code>git push</code></td></tr>
</table></div>
<pre class="out">On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add &lt;file&gt;..." to update what will be committed)
  (use "git restore &lt;file&gt;..." to discard changes in working directory)
	modified:   my-work/hello_mine.py

no changes added to commit (use "git add" and/or "git commit -a")</pre>
<details class="reveal"><summary>Predict: read it top to bottom. What two things should you do next?</summary><div><code>On branch main</code> tells you your branch. <code>ahead of 'origin/main' by 1 commit</code> means GitHub is missing one save point: <code>git push</code>. The modified file is not staged: <code>git add</code> it, commit, then push. <strong>The lines in parentheses are hints.</strong> Git writes its own cheat sheet into its output.</div></details>`,
      notes: {
        timing: "4 min",
        talking: "Teach the three headings and the parentheses. When stuck in Git, run git status and read the hints. Colors help, but the headings are what matter.",
        question: "What does 'ahead of origin/main' mean? You have save points that GitHub does not have yet. Push them.",
        failure: "Someone's terminal shows no colors. That is fine. Read the headings, not the colors.",
        action: "Say it together: branch, main, untracked, staged."
      }
    },
    {
      title: "Writing good commit messages",
      html: `
<h2>Writing good commit messages</h2>
<p>A commit message is a note to the person who reads this history later. That person is usually you, in three weeks, with no memory of tonight. Start with an action word, and complete the sentence <em>"If applied, this commit will..."</em></p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Instead of</th><th>Write</th><th>Why</th></tr>
  <tr><td><code>stuff</code></td><td><code>Add temperature converter function</code></td><td>Says what was added</td></tr>
  <tr><td><code>fixed it</code></td><td><code>Fix off-by-one error in the grade loop</code></td><td>Says what was broken</td></tr>
  <tr><td><code>asdfgh</code></td><td><code>Add LP 02 list practice exercises</code></td><td>Future you can find it</td></tr>
  <tr><td><code>final version REAL final v2</code></td><td><code>Rename variables for clarity in quiz script</code></td><td>Git already keeps the versions</td></tr>
</table></div>
<h3>Three habits</h3>
<ol>
  <li><strong>Commit small and often.</strong> One idea per commit.</li>
  <li><strong>Commit working code.</strong> A save point before the boss fight is useful. A save point halfway off a cliff is not.</li>
  <li><strong>Keep it under about 50 characters</strong> so it stays readable in <code>git log --oneline</code>.</li>
</ol>`,
      notes: {
        timing: "3 min",
        talking: "Read the 'instead of' column aloud for laughs; everyone has written 'final version REAL final'. Recruiters and mentors do read commit histories.",
        question: "Does capitalization matter? Not to Git. Consistency matters to readers. Start with a capital action word like Add, Fix, Rename.",
        failure: "Someone typed git commit without -m and landed in an editor. That is core.editor working. Type the message, save, close the tab.",
        action: "Have three volunteers say a commit message for a change they made this week."
      }
    },
    {
      title: "Your fork and the class repo",
      companions: ["fork"],
      html: `
<h2>Your fork and the class repo</h2>
<p>The class repository belongs to your instructor: you can read it, but you cannot push to it. To save your own work on GitHub, you need your own copy. That copy is a <strong>fork</strong>.</p>
<div class="cols">
  <div class="panel" style="border-top:5px solid var(--purple)"><h3 class="p">Class repo on GitHub</h3><p class="small">Nickname: <code>upstream</code>. You can read it, not change it.</p></div>
  <div class="panel" style="border-top:5px solid var(--green)"><h3 class="g">Your fork on GitHub</h3><p class="small">Nickname: <code>origin</code>. Yours to change. Created once with the <strong>Fork</strong> button.</p></div>
  <div class="panel" style="border-top:5px solid var(--yellow)"><h3 class="y">Your computer</h3><p class="small">Where you write code. You <code>git push</code> to origin, and <code>git pull upstream main</code> to get new lessons.</p></div>
</div>
<div class="callout gh"><strong>Fork vs clone</strong>A <strong>fork</strong> is a copy on GitHub, under your account. A <strong>clone</strong> is a copy downloaded to your computer. You usually do both: fork on GitHub, then clone (or reconnect) on your machine.</div>`,
      notes: {
        timing: "3 min",
        talking: "Three repositories are in play. A remote is just a nickname for a repository address, so you don't type the whole URL every time. By convention, origin is where you push and upstream is the original.",
        question: "Why can't I just push to the class repo? You don't own it, so GitHub refuses (that's the 403 error). Your fork is your own copy you can push to.",
        failure: "Someone forked into an organization instead of their own account. Fix: delete that fork on GitHub and fork again, choosing their username.",
        action: "Say it together: fork. Then: a fork is a copy on GitHub; a clone is a copy on my computer."
      }
    },
    {
      title: "Connect origin and upstream",
      companions: ["origin", "upstream"],
      html: `
<h2>Connect origin and upstream</h2>
<p>Pick the path that matches where you are. Both end in the same place. Replace <code>YOUR-USERNAME</code> with your GitHub username.</p>
<div class="cols">
  <div>
    <h3>Path A: I already cloned the class repo</h3>
<pre class="cmd"><code>cd python-fall26-code-alongs
git remote rename origin upstream
git remote add origin https://github.com/YOUR-USERNAME/python-fall26-code-alongs.git
git push -u origin main</code></pre>
    <p class="small">The <code>-u</code> is one-time: it links your local <code>main</code> to your fork. After this, plain <code>git push</code> is all you need.</p>
  </div>
  <div>
    <h3>Path B: I am starting fresh</h3>
<pre class="cmd"><code>git clone https://github.com/YOUR-USERNAME/python-fall26-code-alongs.git
cd python-fall26-code-alongs
git remote add upstream https://github.com/StrayDogSyn/python-fall26-code-alongs.git</code></pre>
    <p class="small">Cloning your fork sets up <code>origin</code> for you. Then finish the virtual environment steps from the README.</p>
  </div>
</div>
<h3>Confirm your remotes</h3>
<pre class="cmd"><code>git remote -v</code></pre>
<pre class="out">origin    https://github.com/YOUR-USERNAME/python-fall26-code-alongs.git (fetch)
origin    https://github.com/YOUR-USERNAME/python-fall26-code-alongs.git (push)
upstream  https://github.com/StrayDogSyn/python-fall26-code-alongs.git (fetch)
upstream  https://github.com/StrayDogSyn/python-fall26-code-alongs.git (push)</pre>`,
      notes: {
        timing: "7 min",
        talking: "Most students took Path A in Week 1, because the README had them clone the class repo. Walk Path A live. The goal is two nicknames, with their username on the origin lines.",
        question: "What if git remote -v only shows origin pointing at StrayDogSyn? They have not done Path A yet. Start at git remote rename origin upstream.",
        failure: "'remote origin already exists': they ran add before rename. Run git remote -v to see it, and use git remote set-url origin NEW-ADDRESS if needed. 'Support for password authentication was removed': follow the sign-in step from setup.",
        action: "Say it together: origin is mine, upstream is the class."
      }
    },
    {
      title: "Getting each week's new code",
      companions: ["pull"],
      html: `
<h2>Getting each week's new code</h2>
<p>New lesson folders land in the class repo after each Monday session. Three steps bring them into your copy.</p>
<pre class="cmd"><code><span class="cmt"># 1. Save your own work first (skip if git status says working tree clean)</span>
git status
git add .
git commit -m "Save my LP 01 practice before syncing"

<span class="cmt"># 2. Pull the new code from the class repo</span>
git pull upstream main

<span class="cmt"># 3. Send the combined result to your fork</span>
git push</code></pre>
<p class="small">If VS Code opens a tab with a message starting <code>Merge branch 'main'</code>, Git is asking you to confirm the note. Close the tab and the pull finishes.</p>
<div class="callout tip"><strong>Keep your work in your own lane</strong>Leave the instructor's files as they are, and write your versions in a folder of your own, such as <code>my-work/</code>. The class repo never touches that folder, so weekly updates slide in without a merge conflict.</div>`,
      notes: {
        timing: "4 min",
        talking: "Git will not combine new code with unsaved changes, so step one is always commit. The my-work folder habit prevents nearly every merge conflict this class could produce. It also fits how the code-alongs are meant to be used: write your version first, then compare.",
        question: "Is there a button for this? Yes: on your fork's GitHub page, Sync fork then Update branch, then git pull in your terminal. The terminal route works for every repository everywhere, so practice it.",
        failure: "'Your local changes to the following files would be overwritten by merge': they skipped step one. Commit first, then pull again.",
        action: "Say it together: pull upstream main, then push."
      }
    },
    {
      title: "Looking back",
      html: `
<h2>Looking back without changing anything</h2>
<div class="cols">
  <div>
    <h3><code>git log --oneline</code></h3>
    <p class="small">Lists your save points, newest first.</p>
<pre class="out">28926b2 Add my version of the hello script
7dfaf2c Add LP 01</pre>
    <p class="small">Long list? Press <kbd>Space</kbd> for the next screen and <kbd>q</kbd> to quit.</p>
  </div>
  <div>
    <h3><code>git diff</code></h3>
    <p class="small">The exact lines you changed since your last commit, before staging.</p>
<pre class="out"> print("mine")
+print("again")</pre>
    <p class="small"><code>+</code> lines were added, <code>-</code> lines were removed. Press <kbd>q</kbd> to exit.</p>
  </div>
  <div>
    <h3><code>git diff --staged</code></h3>
    <p class="small">The same view for changes you already staged with <code>git add</code>. A last look in the box before you tape it shut.</p>
  </div>
</div>`,
      notes: {
        timing: "3 min",
        talking: "All three are read-only and safe. git diff is the best habit for catching accidental changes before they become commits.",
        question: "Why does my terminal freeze after git log? It is paging a long list. Press q to quit.",
        failure: "Someone is stuck in the pager and starts typing commands. Press q.",
        action: "Say it together: log, diff, diff staged."
      }
    },
    {
      title: "The Undo Guide",
      html: `
<h2>The Undo Guide</h2>
<p>Git has several undo buttons, and the right one depends on how far the mistake has traveled. Answer the questions.</p>
<div data-undo="w2"></div>
<div class="callout warn"><strong>Ask before you run these</strong>Advice online sometimes recommends <code>git reset --hard</code> or <code>git push --force</code>. Both can permanently destroy work, yours or someone else's. Treat them like a stranger's command with <code>sudo</code> in it.</div>
<p class="small muted">Forgot a file in your last unpushed commit? <code>git add forgotten.py</code> then <code>git commit --amend --no-edit</code>. Find a <code>COMMIT-ID</code> with <code>git log --oneline</code>.</p>
<p class="joke">🧓 Be kind, rewind. Git is the only VCR that lets you do it without returning the tape.</p>`,
      notes: {
        timing: "5 min",
        talking: "Walk the tree with a volunteer's real scenario. Stress the one that cannot be undone: git restore FILE throws away uncommitted edits for good. revert is the polite undo for pushed work: it adds a new commit instead of rewriting history.",
        question: "Why not just delete the bad commit after pushing? Others may already have it. revert keeps history honest and nobody else's copy breaks.",
        failure: "Someone ran git restore on the wrong file and lost edits. There is no recovery for uncommitted work; this is why we commit small and often.",
        action: "Say it together: restore, restore staged, amend, revert."
      }
    },
    {
      title: "Files Git should ignore",
      html: `
<h2>Files Git should ignore</h2>
<p>A file named <code>.gitignore</code> in your project's top folder lists files Git should pretend not to see.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Leave out</th><th>Why</th></tr>
  <tr><td><code>venv/</code></td><td>Thousands of files anyone can rebuild with one command, and specific to your computer</td></tr>
  <tr><td><code>__pycache__/</code></td><td>Speed-up files Python creates automatically. Clutter</td></tr>
  <tr><td><code>.env</code></td><td>By convention, holds passwords and secret keys. <strong>A secret pushed to a public repository should be treated as stolen</strong></td></tr>
  <tr><td><code>.DS_Store</code></td><td>A housekeeping file macOS drops into folders. Nobody needs it</td></tr>
</table></div>
<pre class="cmd"><code>venv/
__pycache__/
.env
.DS_Store</code></pre>
<div class="callout warn"><strong>Already committed a secret?</strong><code>.gitignore</code> only works on files Git is not tracking yet. Adding it afterward does not remove the secret from your history. Change the password or key right away, then ask for help cleaning up.</div>
<p class="small muted">The class repository already includes a <code>.gitignore</code>. Create one before your first commit on your own projects.</p>`,
      notes: {
        timing: "3 min",
        talking: "Connect back to Week 1: ls -a or ls -Force reveals the hidden .gitignore. Secrets are the one mistake you cannot fix by deleting the file later.",
        question: "Why is venv ignored if I need it? Anyone can rebuild it with python -m venv venv. The repo stores the recipe, not the cooked meal.",
        failure: "Someone's git status shows hundreds of venv files. They are in a project without a .gitignore. Add venv/ to .gitignore before committing.",
        action: "Say it together: dot gitignore, dot env."
      }
    },
    {
      title: "Translate the jargon",
      html: `
<h2>Translate the jargon</h2>
<p>Two weeks ago, this sentence was static. Tap each highlighted word to decode it.</p>
<div data-jargon="w2"></div>
<h3>Match the companions</h3>
<div data-match="w2"></div>
<p class="small muted">If the Git words still feel slippery, that is normal. They settle after a week of actually pushing and pulling. Press <kbd>G</kbd> for the glossary.</p>`,
      notes: {
        timing: "4 min",
        talking: "Decode the sentence as a room. It is a real sentence from real standups. Then matching on their own screens.",
        question: "Origin and upstream still blur together. Any trick? Origin is mine (my fork), upstream is where the stream starts (the class repo).",
        failure: "Dragging doesn't work on a phone or touchscreen. Tap the word, then tap its meaning.",
        action: "Read the full sentence out loud together, then the translation."
      }
    },
    {
      title: "When things go wrong",
      html: `
<h2>When things go wrong</h2>
<p>Git error messages look intimidating and are usually specific. Find the key phrase, then follow the fix.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Git says</th><th>What it means</th><th>What to do</th></tr>
  <tr><td><code>fatal: not a git repository</code></td><td>You are not inside a project folder Git is tracking</td><td><code>pwd</code>, then <code>cd</code> into your project</td></tr>
  <tr><td><code>Author identity unknown</code></td><td>Git does not have your name and email</td><td>Run the two <code>git config</code> user lines from setup</td></tr>
  <tr><td><code>nothing added to commit but untracked files present</code></td><td>New files are not staged</td><td><code>git add</code>, then commit again</td></tr>
  <tr><td><code>Permission ... denied</code> or <code>error: 403</code></td><td>Pushing to a repo you do not own, usually the class repo</td><td><code>git remote -v</code>. If origin lacks your username, follow Path A</td></tr>
  <tr><td><code>! [rejected]</code> with <code>fetch first</code></td><td>GitHub has commits your computer does not</td><td><code>git pull</code>, then <code>git push</code></td></tr>
  <tr><td><code>Your local changes ... would be overwritten by merge</code></td><td>Unsaved work the pull would run over</td><td>Commit first, then pull again</td></tr>
  <tr><td><code>Support for password authentication was removed</code></td><td>GitHub will not accept your password in the terminal</td><td>Follow the sign-in step from setup</td></tr>
  <tr><td>A screen of <code>~</code> and nothing works</td><td>Git opened the Vim editor</td><td><kbd>Esc</kbd>, type <code>:wq</code>, <kbd>Enter</kbd>. Then set <code>core.editor</code></td></tr>
</table></div>
<p class="small muted">Still stuck? Copy the full <code>git status</code> output and the command you ran, and bring both to your cohort channel or Monday night. Merge conflicts and branches have full walkthroughs in <code>resources/git-commands.md</code>.</p>`,
      notes: {
        timing: "4 min",
        talking: "Error messages are the terminal being specific, not angry. Teach the scan: find the key phrase, match the row.",
        question: "What's a merge conflict? You and the class repo changed the same lines. The my-work habit avoids nearly all of them, and the docs walk through fixing one.",
        failure: "LF will be replaced by CRLF on Windows: it is a notice, not an error. Nothing to do.",
        action: "Read three error messages aloud and have the room call out the fix."
      }
    },
    {
      title: "Week 2 checkpoint",
      html: `
<h2>Week 2 checkpoint</h2>
<p class="muted">Low stakes. Every wrong answer here is a Git mistake you will not make at midnight.</p>
<div data-quiz="w2"></div>`,
      notes: {
        timing: "5 min",
        talking: "Group vote again. After each answer, connect it to the slide it came from.",
        question: "Does this score count? No. Retry as often as you like.",
        failure: "A low score stings. Remind them: tutorial level. The explanation is the lesson.",
        action: "After each question, have the room say the key command in it out loud."
      }
    },
    {
      title: "Your companions so far",
      unlockAll: true,
      html: `
<h2>Your companions so far</h2>
<p>Two weeks ago, most of these were strangers. Read the list out loud.</p>
<div data-glossary-grid></div>`,
      notes: {
        timing: "3 min",
        talking: "Celebrate the vocabulary growth. These are the words in job postings, code reviews, and interviews.",
        question: "Do I need to memorize these? No. Use them. Fluency comes from saying them in real sentences.",
        failure: "None. If time is short, skip to missions.",
        action: "Read all twenty-three companions out loud together, fast, like a roll call."
      }
    },
    {
      title: "Practice missions and resources",
      html: `
<h2>Your missions this week</h2>
<p>Try each before opening its solution in <code>resources/git-commands.md</code>.</p>
<div class="cols">
  <div class="panel"><h3>1. Your first three commits</h3><p class="small">In a throwaway <code>git-practice</code> folder: <code>git init</code>, create <code>notes.txt</code>, commit three times, then list your save points.</p></div>
  <div class="panel"><h3>2. Three kinds of undo</h3><p class="small">Discard an edit, unstage a file, and fix the typo in <code>Udpate notse</code> without a new commit.</p></div>
  <div class="panel"><h3>3. The full round trip</h3><p class="small">Confirm origin and upstream, create <code>my-work/hello_mine.py</code>, run the daily loop, find it on GitHub, then pull from upstream.</p></div>
</div>
<h3>Keep going</h3>
<ul>
  <li>🎮 Practice site: <a href="https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/" target="_blank" rel="noopener">Python Essentials: Bridge the Dream</a></li>
  <li>🎥 Recordings: <a href="https://www.youtube.com/@EricHunterPetross" target="_blank" rel="noopener">Eric Hunter Petross on YouTube</a></li>
  <li>📂 Class repo: <a href="https://github.com/StrayDogSyn/python-fall26-code-alongs" target="_blank" rel="noopener">StrayDogSyn/python-fall26-code-alongs</a></li>
  <li>🏫 <a href="https://codethedream.org/" target="_blank" rel="noopener">Code the Dream</a></li>
</ul>
<p class="lead"><strong>Save early, save often, push before you close the laptop.</strong> See you Monday at 8:00 PM Eastern.</p>`,
      notes: {
        timing: "2 min",
        talking: "Assign the three missions. Mission 3 is the one that matters: by next Monday, everyone should have a fork with a my-work folder on GitHub.",
        question: "Where is this deck later? In the class repo under week02/week02-slides.html. Pull upstream and it's there.",
        failure: "Someone can't finish Mission 3 because of sign-in. Have them bring the exact error to the cohort channel.",
        action: "Say the daily loop one last time: status, add, commit, push."
      }
    }
  ],

  quizzes: {
    w2: [
      { q: "You edited <code>hello_mine.py</code> and ran <code>git commit -m \"Fix greeting\"</code>. Git says <code>no changes added to commit</code>. What did you skip?",
        options: [
          { text: "<code>git add</code>", correct: true },
          { text: "<code>git push</code>" },
          { text: "<code>git pull upstream main</code>" }
        ],
        why: "A commit only saves what is in the staging area. Add first, then commit." },
      { q: "Where does a new commit live before you run <code>git push</code>?",
        options: [
          { text: "Only on your computer, in your local repository.", correct: true },
          { text: "On GitHub, automatically." },
          { text: "In the staging area." }
        ],
        why: "If your laptop meets a cup of coffee before you push, GitHub knows nothing about that work." },
      { q: "<code>git push</code> fails with <code>error: 403</code>. What is the most likely cause?",
        options: [
          { text: "Your origin points at the class repo instead of your fork.", correct: true },
          { text: "You forgot to run <code>git add</code>." },
          { text: "Your commit message was too long." }
        ],
        why: "Run <code>git remote -v</code>. If origin lacks your username, follow Path A." },
      { q: "You accidentally staged <code>.env</code>, which holds a password. You have NOT committed yet. Best move?",
        options: [
          { text: "<code>git restore --staged .env</code>, then add <code>.env</code> to <code>.gitignore</code>.", correct: true },
          { text: "Commit it now and delete the file later." },
          { text: "Push it, then make the repo private." }
        ],
        why: "Unstage it while it is still in the box, and ignore it so it never gets packed again." },
      { q: "You already pushed a commit that broke something. Which undo keeps everyone's copies safe?",
        options: [
          { text: "<code>git revert COMMIT-ID</code>", correct: true },
          { text: "<code>git commit --amend</code>" },
          { text: "<code>git reset --hard</code>" }
        ],
        why: "revert adds a new commit that reverses the old one. History stays honest, and nobody else's copy breaks." }
    ]
  },

  jargon: {
    w2: {
      parts: [
        "“", { term: "Pull", meaning: "download new commits and combine them with yours" },
        " from ", { term: "upstream", meaning: "the original class repo" },
        ", then ", { term: "push", meaning: "upload your commits" },
        " to ", { term: "origin", meaning: "your fork on GitHub" },
        " from your ", { term: "working directory", meaning: "the folder your terminal is standing in" }, ".”"
      ],
      done: "Translation: grab the newest lessons from the class repo, then back up everything to your own copy on GitHub, while standing in your project folder. Fluent."
    }
  },

  matches: {
    w2: [
      { term: "Commit", meaning: "A save point with a short message" },
      { term: "Staging area", meaning: "The waiting room for your next commit" },
      { term: "origin", meaning: "The remote you push your own work to" },
      { term: "upstream", meaning: "The original repo your fork was copied from" },
      { term: "Push", meaning: "Upload your commits to GitHub" }
    ]
  },

  undo: {
    w2: {
      start: { q: "Have you run <code>git add</code> on this change yet?", short: "Ran git add?", no: "restore", yes: "q2" },
      q2: { q: "Have you run <code>git commit</code> yet?", short: "Ran git commit?", no: "unstage", yes: "q3" },
      q3: { q: "Have you run <code>git push</code> yet?", short: "Ran git push?", no: "amend", yes: "revert" },
      restore: { cmd: "git restore hello_mine.py", what: "Throws away your uncommitted edits to that file and brings back the last committed version. <strong>This one cannot be undone.</strong>" },
      unstage: { cmd: "git restore --staged hello_mine.py", what: "Takes the file out of the box. Your edits stay exactly as they are." },
      amend: { cmd: "git commit --amend -m \"Better message\"", what: "Fixes the last commit. Safe because it was never pushed." },
      revert: { cmd: "git revert COMMIT-ID", what: "Adds a new commit that reverses the old one. History stays honest, and nobody else's copy breaks. Find the ID with <code>git log --oneline</code>." }
    }
  }
};
