/* Week 1 deck: "Learn the Controls"
   Sources of truth: README.md and resources/command-line-basics.md
   Rebuild after editing: python resources/slides/build.py
   Rules: write a literal backslash as \\ ; escape < as &lt; ; no em dashes. */
window.DECK = {
  title: "Intro to Python, Week 1: Learn the Controls",

  terms: {
    review: [],
    fresh: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive"]
  },

  slides: [
    {
      title: "Learn the Controls",
      html: `
<p class="kicker">Intro to Python · Fall 26 · Week 1</p>
<h1>Learn the Controls</h1>
<p class="lead">Every game starts with a tutorial level. This is ours.</p>
<div class="cols">
  <div class="panel">
    <h3>Tonight's agenda</h3>
    <ol>
      <li>Why the tools feel strange</li>
      <li>The toolbox, sorted by job</li>
      <li>Install the constants</li>
      <li>Terminal survival skills</li>
      <li>Set up the class repo</li>
    </ol>
  </div>
  <div class="panel">
    <h3>Our two goals</h3>
    <ol>
      <li><span class="b">Tool comfort:</span> open a terminal, move around your folders, and run a Python file, on any computer and in any editor.</li>
      <li><span class="y">Vocabulary comfort:</span> hear developer words without flinching. Each one is a career companion you will carry into standups and interviews.</li>
    </ol>
  </div>
</div>
<p class="small muted">Keys: ← → to move · N notes · G glossary · O all slides · F full screen. The OS button swaps every command for Windows or macOS/Linux.</p>`,
      notes: {
        timing: "3 min",
        talking: "Welcome everyone. Acknowledge that career changers are taking a big swing. State both goals plainly and point out the OS button: every command on every slide swaps to match their computer.",
        question: "Will we build apps tonight? Not yet. Tonight is about the hammer and the saw, so that next week you can build the bookshelf.",
        failure: "Someone's install is not finished. Pair them with a neighbor for the demos and point them to Getting Started in the README after class.",
        action: "Have the room say the two goals together: tool comfort, vocabulary comfort."
      }
    },
    {
      title: "The tutorial level",
      html: `
<h2>Why the tools feel strange</h2>
<p class="lead">The first thirty minutes of any new game are spent walking into walls and pressing the wrong buttons. You are not fighting the boss yet. You are learning the controls.</p>
<ul>
  <li>It feels clunky right now. That is normal, and it is temporary.</li>
  <li>You do not need to memorize anything tonight.</li>
  <li>Fluency comes from <em>using</em> the tools, not from studying them.</li>
</ul>
<div class="callout tip"><strong>The deal for tonight</strong>Unfamiliar words will feel uncomfortable. Say them anyway. By the end of the night, they will be companions instead of strangers.</div>`,
      notes: {
        timing: "2 min",
        talking: "Normalize the overwhelm. Struggling with setup is a rite of passage, not a sign someone is not 'tech enough'. Every professional in the room once typed python into the wrong window.",
        question: "Is it normal to feel lost this early? Completely. The fog lifts with reps, not with reading.",
        failure: "Nothing technical here. If energy dips, ask who has ever rage-quit a tutorial level. Hands go up; tension goes down.",
        action: "No new terms yet. Ask the room for one tech word that sounds scary today, and promise it will be a companion by the end."
      }
    },
    {
      title: "The toolbox, sorted by job",
      companions: ["editor"],
      html: `
<h2>The toolbox, sorted by job</h2>
<p>Tools change over a career. The <em>jobs</em> do not. Learn the job, and any tool becomes a quick swap.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>The job</th><th>Tools we use</th><th>In one line</th></tr>
  <tr><td><span class="y">Language</span></td><td>Python 3.10 or newer</td><td>The grammar the computer understands</td></tr>
  <tr><td><span class="b">Editor</span></td><td>Spyder 6, VS Code, others</td><td>Where you write and save code</td></tr>
  <tr><td><span class="g">Terminal</span></td><td>PowerShell, zsh, bash</td><td>Where you type commands and run files</td></tr>
  <tr><td><span class="p">Version control</span></td><td>Git</td><td>Save points for your project</td></tr>
  <tr><td><span class="p">Online home</span></td><td>GitHub</td><td>Where your save points are backed up and shared</td></tr>
</table></div>
<p>The editor is interchangeable. The <strong>terminal and Git are the constants</strong> that follow you to every job.</p>`,
      notes: {
        timing: "3 min",
        talking: "Focus on the JOB of each tool. An IDE is simply an editor with extra tools bolted on: a run button, a console, a variable inspector.",
        question: "Do I need to buy any of these? No. Every tool in this class is free.",
        failure: "Someone asks which editor is 'correct'. Answer: whichever one you will actually open tomorrow. The next slide proves it.",
        action: "Say it together: editor, I-D-E."
      }
    },
    {
      title: "Same move, different controller",
      html: `
<h2>Same move, different controller</h2>
<p>Jumping is the A button on one console and X on another. The player is still jumping. Editors work the same way.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>The move</th><th>Spyder 6</th><th>VS Code</th></tr>
  <tr><td>Save the file</td><td><kbd><span class="os-win">Ctrl</span><span class="os-mac">Cmd</span></kbd> + <kbd>S</kbd></td><td><kbd><span class="os-win">Ctrl</span><span class="os-mac">Cmd</span></kbd> + <kbd>S</kbd></td></tr>
  <tr><td>Run the whole file</td><td><kbd>F5</kbd></td><td>The ▶ Run Python File button, top right</td></tr>
  <tr><td>Run one piece at a time</td><td>A cell (<code># %%</code>) with <kbd><span class="os-win">Ctrl</span><span class="os-mac">Cmd</span></kbd> + <kbd>Enter</kbd></td><td>Select lines, then <kbd>Shift</kbd> + <kbd>Enter</kbd></td></tr>
  <tr><td>Where output appears</td><td>The IPython Console, bottom right</td><td>The Terminal panel, bottom</td></tr>
  <tr><td>Type terminal commands</td><td>Open a separate terminal</td><td><strong>Terminal</strong> → <strong>New Terminal</strong></td></tr>
</table></div>
<div class="callout note"><strong>One real difference</strong>Spyder's console shows <code>In [1]:</code>. That is Python listening, not a system terminal. Commands like <code>cd</code> and <code>git</code> belong in a real terminal.</div>`,
      notes: {
        timing: "3 min",
        talking: "Reinforce that Spyder and VS Code do the same job for our purposes. Demo saving and running the same file in both if time allows. Do not let anyone get pulled into editor wars.",
        question: "Which one is better? Whichever you feel comfortable in right now. You can switch any week, and every move on this slide has a partner in the other column.",
        failure: "VS Code has no Run button. Fix: install the Python extension from the Extensions panel, then reopen the file.",
        action: "Say it together: editor. Then have three people name the editor they installed."
      }
    },
    {
      title: "Install the constants",
      html: `
<h2>Install the constants: Python and Git</h2>
<p>These two follow you everywhere, no matter which editor you pick.</p>
<div class="cols">
  <div class="panel">
    <h3>1. Python 3.10 or newer</h3>
    <p>Download from <code>python.org/downloads</code></p>
    <div class="os-win callout warn"><strong>Windows: check this box</strong>During install, tick <span class="r">Add Python to PATH</span>. Miss it, and the terminal will say <code>python</code> is not recognized.</div>
    <div class="os-mac callout note"><strong>macOS and Linux</strong>Install a current Python so everyone in class runs the same version. You will type <code>python3</code> until your virtual environment is active.</div>
  </div>
  <div class="panel">
    <h3>2. Git</h3>
    <p>Download from <code>git-scm.com/downloads</code></p>
    <p>After any install, <strong>close and reopen your terminal</strong> so it notices the new tool.</p>
  </div>
</div>
<h3>Check both</h3>
<pre class="cmd"><code><span class="os-win">python --version</span><span class="os-mac">python3 --version</span>
git --version</code></pre>
<p class="small muted">You should see Python 3.10 or higher, and a Git version number.</p>`,
      notes: {
        timing: "4 min",
        talking: "Hammer the PATH checkbox for Windows users; it causes more first-week pain than anything else. Flip the OS toggle so Mac users see their version of the check.",
        question: "I already have Python 3.9. Is that okay? Please install 3.10 or newer so our commands and error messages match.",
        failure: "'python is not recognized'. Fix from the README: try python3 or py. If neither works, reinstall Python and check Add Python to PATH. 'git is not recognized': install Git, then close and reopen the terminal.",
        action: "Say it together: Python, Git. Ask who remembers seeing the PATH checkbox."
      }
    },
    {
      title: "Pick an editor",
      html: `
<h2>Pick an editor (either is fine)</h2>
<div class="cols">
  <div class="panel">
    <h3>Spyder 6</h3>
    <p><code>docs.spyder-ide.org</code></p>
    <ul><li>Built for Python and data work</li><li>Run button, console, and Variable Explorer in one window</li><li>Our Monday code-alongs use it</li></ul>
  </div>
  <div class="panel">
    <h3>Visual Studio Code</h3>
    <p><code>code.visualstudio.com</code></p>
    <ul><li>An all-purpose editor with a real terminal built in</li><li>The README's setup steps use its terminal</li><li>Add the Python extension after installing</li></ul>
  </div>
</div>
<div class="callout tip"><strong>Can't decide?</strong>Install both. Spyder for writing and exploring code, VS Code when you want a terminal and editor side by side. Same moves, different controllers.</div>`,
      notes: {
        timing: "2 min",
        talking: "Keep this brief. These are ordinary programs to download. The point is permission: there is no wrong editor in this class.",
        question: "Do I have to use the same editor as the instructor? No. Every move you will see has a partner in your editor.",
        failure: "macOS says 'code: command not found' later. Fix from the docs: open VS Code, press Cmd + Shift + P, run 'Shell Command: Install code command in PATH', then reopen the terminal.",
        action: "Say it together: editor, IDE, extension."
      }
    },
    {
      title: "Terminal, shell, prompt",
      companions: ["terminal", "shell", "prompt"],
      html: `
<h2>Terminal, shell, prompt</h2>
<p>Ordering by pointing at menu pictures is friendly but limited. The terminal is talking straight to the kitchen: you say exactly what you want, and you get exactly that.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Word</th><th>What it means</th></tr>
  <tr><td><strong>Terminal</strong></td><td>The window you type into</td></tr>
  <tr><td><strong>Shell</strong></td><td>The program inside that window that reads your commands and runs them</td></tr>
  <tr><td><strong>Prompt</strong></td><td>The text waiting at the start of the line, telling you the shell is ready</td></tr>
  <tr><td><strong>PowerShell</strong></td><td>The default shell on Windows</td></tr>
  <tr><td><strong>zsh</strong> and <strong>bash</strong></td><td>The default shells on macOS and Linux</td></tr>
  <tr><td><strong>Git Bash</strong></td><td>A bash shell for Windows that installs along with Git</td></tr>
</table></div>
<p class="small muted">In everyday conversation, people use terminal, shell, and command line to mean the same thing. You can too.</p>`,
      notes: {
        timing: "3 min",
        talking: "Window versus engine: the terminal is the window, the shell is what reads your typing, the prompt is the shell saying 'I'm listening'. Share the Bourne Again SHell pun; puns make words stick.",
        question: "Is Command Prompt the same thing? It is an older Windows shell. We use PowerShell because the class docs are written for it.",
        failure: "Someone opened Command Prompt. Fix: close it and search the Start menu for PowerShell instead.",
        action: "Say it together: terminal, shell, prompt."
      }
    },
    {
      title: "Which terminal to open",
      companions: ["commandline"],
      html: `
<h2>Which terminal to open</h2>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Your computer</th><th>Open this</th><th>Follow this column in the docs</th></tr>
  <tr><td>Windows</td><td>PowerShell</td><td><strong>Windows PowerShell</strong></td></tr>
  <tr><td>macOS</td><td>Terminal (it runs a shell called zsh)</td><td><strong>macOS, Linux, Git Bash</strong></td></tr>
  <tr><td>Linux</td><td>Terminal (it runs a shell called bash)</td><td><strong>macOS, Linux, Git Bash</strong></td></tr>
  <tr><td>Windows, using Git Bash</td><td>Git Bash (installed along with Git)</td><td><strong>macOS, Linux, Git Bash</strong></td></tr>
</table></div>
<div class="os-win panel"><h3>On Windows right now</h3><p>Start menu → type <code>powershell</code> → open <strong>Windows PowerShell</strong>. Your prompt looks like <code>PS C:\\Users\\you&gt;</code></p></div>
<div class="os-mac panel"><h3>On macOS right now</h3><p>Press <kbd>Cmd</kbd> + <kbd>Space</kbd> → type <code>terminal</code> → <kbd>Enter</kbd>. Your prompt looks like <code>you@computer ~ %</code></p></div>
<div class="callout tip"><strong>Easiest way on any computer</strong>Open VS Code, then choose <strong>Terminal</strong> → <strong>New Terminal</strong>. A terminal opens at the bottom, already pointed at your open folder.</div>`,
      notes: {
        timing: "3 min",
        talking: "Use the OS toggle live. Walk everyone through opening their terminal right now; this is the first hands-on moment.",
        question: "Can I use Git Bash on Windows? Yes. Follow the macOS/Linux column of the docs when you do.",
        failure: "Student is typing into Spyder's console and gets errors on every command. Fix: In [1]: means Python is listening. Open a real terminal.",
        action: "Say it together: command line. Then everyone opens a terminal."
      }
    },
    {
      title: "Anatomy of a command",
      companions: ["option", "argument"],
      html: `
<h2>Anatomy of a command</h2>
<p>A command is a short sentence with strict word order: the tool first, the details after, spaces between the pieces.</p>
<pre><code><span class="b">python</span>   <span class="p">--version</span>      <span class="cmt">program, then an option (also called a flag)</span>
<span class="b">python</span>   <span class="y">hello.py</span>       <span class="cmt">program, then an argument</span></code></pre>
<div class="cols">
  <div class="panel"><h3 class="b">Program</h3><p>The tool you are calling: <code>python</code>, <code>git</code>, <code>ls</code></p></div>
  <div class="panel"><h3 class="p">Option / flag</h3><p>Adjusts what the program does: <code>--version</code>, <code>-a</code></p></div>
  <div class="panel"><h3 class="y">Argument</h3><p>The thing the program acts on: <code>hello.py</code></p></div>
</div>
<h3>Three rules cover almost everything</h3>
<ol>
  <li>Nothing happens until you press <kbd>Enter</kbd>.</li>
  <li>Spelling and spacing are exact. <code>python--version</code> and <code>python --version</code> are different commands.</li>
  <li>Silence usually means success.</li>
</ol>
<p class="small muted">Tutorials often show <code>$</code> or <code>PS&gt;</code> before a command. That is the prompt. Type only what comes after it.</p>`,
      notes: {
        timing: "3 min",
        talking: "Commands are sentences. Cooking version: the recipe step 'chop, finely, onion' is program, option, argument.",
        question: "Do spaces really matter? Yes. Spaces are how the shell knows where one piece ends and the next begins.",
        failure: "Someone types python--version (no space) and gets an error. Point at the spaces on the slide.",
        action: "Say it together: program, option, argument. Then label python --version and python hello.py out loud."
      }
    },
    {
      title: "Folders and paths: the game map",
      companions: ["directory", "path"],
      html: `
<h2>Folders and paths: the game map</h2>
<p>Your terminal is a character on a game map, standing on exactly one tile. That tile is the <strong>working directory</strong>, and every command runs from there.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Kind of path</th><th>What it is</th><th>Example</th></tr>
  <tr><td><strong>Absolute</strong></td><td>The full street address from the top of the computer. Works from anywhere.</td><td>The long one below</td></tr>
  <tr><td><strong>Relative</strong></td><td>Directions from where you stand right now. Shorter, but depends on your position.</td><td><code>hello.py</code></td></tr>
</table></div>
<pre><code><span class="os-mac">/Users/you/python-fall26-code-alongs/lp01-intro-to-python/hello.py</span><span class="os-win">C:\\Users\\you\\python-fall26-code-alongs\\lp01-intro-to-python\\hello.py</span></code></pre>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Shortcut</th><th>Means</th><th>Example</th></tr>
  <tr><td><code>.</code></td><td>The folder you are in right now</td><td><code>code .</code> opens it in VS Code</td></tr>
  <tr><td><code>..</code></td><td>One level up (the parent)</td><td><code>cd ..</code></td></tr>
  <tr><td><code>~</code></td><td>Your home folder</td><td><code>cd ~</code> takes you home from anywhere</td></tr>
  <tr><td><code>../other</code></td><td>Up one level, then into a neighbor</td><td><code>cd ../lp02-data-structures</code></td></tr>
</table></div>
<p class="joke">🧓 Why did the folder break up with the file? It needed more space. (That is also why we never put spaces in file names.)</p>`,
      notes: {
        timing: "4 min",
        talking: "Directory is a fancy word for folder. The game map is the key image: you cannot pick up an item in the next room without walking there, or yelling its exact address (an absolute path). Windows draws its slashes backward, and PowerShell accepts either direction.",
        question: "How do I type the tilde? Usually Shift plus the key left of 1. On some keyboards it hides elsewhere; ask a neighbor.",
        failure: "Someone gets lost three folders deep. Fix: cd ~ to teleport home, then pwd to confirm.",
        action: "Say it together: working directory, path, absolute, relative."
      }
    },
    {
      title: "The Look, Move, Act loop",
      html: `
<h2>The Look, Move, Act loop</h2>
<p>Most beginner terminal errors have one cause: the right command in the wrong folder. The cure is a habit. Look before you act.</p>
<div class="cols">
  <div class="panel"><h3 class="b">1. Look</h3><p><code>pwd</code> where am I?<br><code>ls</code> what is in here?</p></div>
  <div class="panel"><h3 class="y">2. Move</h3><p><code>cd folder-name</code> step inside<br><code>cd ..</code> step back out</p></div>
  <div class="panel"><h3 class="g">3. Act</h3><p>Run your command, from the right place.</p></div>
</div>
<details class="reveal"><summary>Predict: what does <code>cd</code> print when it works?</summary><div>Nothing at all. Your prompt changes to show the new folder. Silence usually means success. Run <code>pwd</code> to confirm the move.</div></details>
<h3>Practice terminal</h3>
<div data-sim="w1"></div>
<p class="small muted">The practice terminal follows the OS button. Try <code>pwd</code>, then <code>ls</code>, then <code>cd python-fall26-code-alongs</code>, then <span class="os-win"><code>ls -Force</code></span><span class="os-mac"><code>ls -a</code></span> to find the hidden <code>.git</code> folder.</p>`,
      notes: {
        timing: "6 min",
        talking: "Clickers rely on their eyes. Terminal users rely on pwd and ls. Run the predict question before revealing, then drive the practice terminal together. Flip the OS toggle and show how the same moves look in PowerShell versus zsh.",
        question: "I typed cd python and it says it can't find it. You must type the exact folder name ls shows you. Press Tab to finish names for you.",
        failure: "In a real terminal, someone is lost. Fix: cd ~ to go home, then pwd and ls to get their bearings.",
        action: "Say each command as a verb: pwd 'where am I', ls 'what is here', cd 'go there'."
      }
    },
    {
      title: "Essential commands (1 of 2)",
      html: `
<h2>Essential commands: look, move, make</h2>
<p>PowerShell understands most of the same short commands as macOS and Linux. Rows tagged <span class="badge">OS</span> change when you flip the OS button.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Goal</th><th>Command</th><th>Good to know</th></tr>
  <tr><td>Show where you are</td><td><code>pwd</code></td><td>Prints your working directory</td></tr>
  <tr><td>List what is here</td><td><code>ls</code></td><td>Run it often</td></tr>
  <tr><td>List hidden files too <span class="badge">OS</span></td><td><code><span class="os-win">ls -Force</span><span class="os-mac">ls -a</span></code></td><td>Reveals names starting with a dot, like <code>.gitignore</code></td></tr>
  <tr><td>Go into a folder</td><td><code>cd folder-name</code></td><td>The folder must be visible in <code>ls</code></td></tr>
  <tr><td>Go up one level</td><td><code>cd ..</code></td><td>Two dots mean the parent folder</td></tr>
  <tr><td>Go to your home folder</td><td><code>cd ~</code></td><td>Works from anywhere</td></tr>
  <tr><td>Make a new folder</td><td><code>mkdir folder-name</code></td><td>Short for make directory</td></tr>
  <tr><td>Make an empty file <span class="badge">OS</span></td><td><code><span class="os-win">New-Item hello.py</span><span class="os-mac">touch hello.py</span></code></td><td><strong>Different on Windows</strong></td></tr>
  <tr><td>Open a file in VS Code</td><td><code>code hello.py</code></td><td>Creates the file if it does not exist yet</td></tr>
  <tr><td>Open this whole folder in VS Code</td><td><code>code .</code></td><td>The dot means right here</td></tr>
</table></div>`,
      notes: {
        timing: "3 min",
        talking: "Walk the table top to bottom. Flip the OS toggle on the two tagged rows so the room sees the swap.",
        question: "Why does Windows use New-Item instead of touch? Different operating systems grew up with different command families. PowerShell borrowed most of the short names, but not that one.",
        failure: "A Windows user types touch and gets 'not recognized'. Fix: New-Item hello.py.",
        action: "Say each command as a verb: pwd 'where am I', ls 'what is here', cd 'go there', mkdir 'make a folder'."
      }
    },
    {
      title: "Essential commands (2 of 2)",
      html: `
<h2>Essential commands: manage and run</h2>
<p>The terminal trusts you completely, so read the right-hand column before you press <kbd>Enter</kbd>.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Goal</th><th>Command</th><th>Good to know</th></tr>
  <tr><td>Print a file's contents</td><td><code>cat hello.py</code></td><td>Quick peek without opening an editor</td></tr>
  <tr><td>Copy a file</td><td><code>cp hello.py backup.py</code></td><td>Original first, copy second</td></tr>
  <tr><td>Rename or move a file</td><td><code>mv old.py new.py</code></td><td>Renaming and moving are the same action</td></tr>
  <tr><td>Delete a file</td><td><code>rm hello.py</code></td><td><strong>No recycle bin.</strong> More on this shortly</td></tr>
  <tr><td>Delete a folder and its contents</td><td><code>rm -r folder-name</code></td><td><strong>No recycle bin, and it takes everything inside</strong></td></tr>
  <tr><td>Clear the screen</td><td><code>clear</code></td><td>Deletes nothing, only tidies the view</td></tr>
  <tr><td>Open this folder in the file browser <span class="badge">OS</span></td><td><code><span class="os-win">explorer .</span><span class="os-mac">open .</span></code></td><td>See the terminal and the mouse world side by side</td></tr>
  <tr><td>Check your Python version <span class="badge">OS</span></td><td><code><span class="os-win">python --version</span><span class="os-mac">python3 --version</span></code></td><td><strong>Different on Windows</strong></td></tr>
  <tr><td>Run a Python file <span class="badge">OS</span></td><td><code><span class="os-win">python hello.py</span><span class="os-mac">python3 hello.py</span></code></td><td><strong>Different on Windows</strong></td></tr>
</table></div>
<p class="small muted">Once your virtual environment is active and your prompt starts with <code>(venv)</code>, plain <code>python</code> works on every system.</p>`,
      notes: {
        timing: "3 min",
        talking: "Flip the OS toggle on the last three rows so the room sees python become python3. Explain the history: macOS and Linux reserve python3 for modern Python; the Windows installer registers python (and py).",
        question: "Is there an undo for rm? No. That is why the next slides cover handling it with care, and why committed Git work is your real safety net.",
        failure: "A Mac user types python hello.py and gets command not found. Fix: python3 hello.py, or activate the venv so plain python works.",
        action: "Say each command as a verb: cat 'show me', cp 'copy', mv 'move or rename', rm 'remove for good'."
      }
    },
    {
      title: "Pro moves: type less",
      html: `
<h2>Pro moves: type less, not faster</h2>
<p>Professionals look fast in a terminal because they type less.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Keys</th><th>What it does</th><th>Why it matters</th></tr>
  <tr><td><kbd>Tab</kbd></td><td>Finishes a file or folder name for you</td><td>Type <code>cd lp01</code>, press <kbd>Tab</kbd>. If it completes, the folder exists. If nothing happens, check for a typo or the wrong folder. A spell checker and a time saver in one key.</td></tr>
  <tr><td><kbd>↑</kbd> and <kbd>↓</kbd></td><td>Scroll through commands you already ran</td><td>Rerun or fix your last command without retyping it</td></tr>
  <tr><td><kbd>Ctrl</kbd> + <kbd>C</kbd></td><td>Stops whatever is running</td><td>The universal escape hatch. Yes, it is <kbd>Ctrl</kbd> on a Mac too</td></tr>
  <tr><td><code>clear</code></td><td>Wipes the screen</td><td>A clean view. Nothing is deleted</td></tr>
  <tr><td><code>exit()</code></td><td>Leaves Python interactive mode</td><td>Gets you from <code>&gt;&gt;&gt;</code> back to your shell</td></tr>
</table></div>`,
      notes: {
        timing: "2 min",
        talking: "Tab completion is the single biggest quality-of-life habit. Demo it on a folder name live. Then demo the up arrow to rerun.",
        question: "Ctrl + C copies text everywhere else. Why does it stop things here? In a terminal it means 'cancel'. To copy, select text and use the right-click menu, or Ctrl + Shift + C in many terminals.",
        failure: "Someone's terminal looks frozen. Fix: Ctrl + C.",
        action: "Say it together: tab completion, Control C."
      }
    },
    {
      title: "Naming rules",
      html: `
<h2>Naming rules</h2>
<p>The terminal splits commands at every space, so <code>my homework.py</code> looks like two separate things. A few habits prevent a whole category of errors.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Rule</th><th>Instead of</th><th>Use</th><th>Why</th></tr>
  <tr><td>No spaces</td><td><code>my homework.py</code></td><td><code>my_homework.py</code></td><td>Spaces separate arguments</td></tr>
  <tr><td>Lowercase</td><td><code>Hello.PY</code></td><td><code>hello.py</code></td><td>Some systems treat <code>Hello.py</code> and <code>hello.py</code> as different files</td></tr>
  <tr><td>Underscores for Python files</td><td><code>data-cleaner.py</code></td><td><code>data_cleaner.py</code></td><td>Python can only <code>import</code> names made of letters, numbers, and underscores</td></tr>
  <tr><td>Never borrow a library's name</td><td><code>random.py</code></td><td><code>random_practice.py</code></td><td>Python looks in your folder first, so your file hides the real module</td></tr>
</table></div>
<details class="reveal"><summary>Predict: what happens if you run <code>cd my project</code>?</summary><div>The shell sees two arguments, <code>my</code> and <code>project</code>, and fails. If you must use a name with spaces, wrap it in quotes: <code>cd "My Folder"</code>.</div></details>`,
      notes: {
        timing: "2 min",
        talking: "random.py is the sneakiest one: the error message never mentions your file, so beginners chase it for an hour. Snake_case is the Python house style.",
        question: "Can I use dashes? For folders, yes. For Python files, use underscores so you can import them later.",
        failure: "Someone's import random fails with a strange error. Fix: rename their random.py and delete any __pycache__ folder next to it.",
        action: "Ask the predict question before revealing. Say it together: snake case."
      }
    },
    {
      title: "Handle with care",
      html: `
<h2>Handle with care</h2>
<p>The terminal does not ask "are you sure?" and it does not keep a recycle bin.</p>
<div class="callout warn"><strong>Permanent</strong><code>rm</code> deletes a file forever. <code>rm -r</code> deletes a folder <strong>and everything inside it</strong>. There is no undo.</div>
<h3>Four habits that keep you safe</h3>
<ol>
  <li><strong>Look before you delete.</strong> Run <code>pwd</code> and <code>ls</code> first, every time.</li>
  <li><strong>Name the target precisely.</strong> Leave wildcards like <code>*</code> alone until you know what they match.</li>
  <li><strong>Understand before you paste.</strong> If you cannot explain a command from a website, ask first. That goes double for <code>sudo</code>, which runs a command with full administrator power on macOS and Linux.</li>
  <li><strong>Commit your work with Git.</strong> Committed work can be recovered even after a bad <code>rm</code>. That is Week 2.</li>
</ol>`,
      notes: {
        timing: "2 min",
        talking: "rm is a sharp knife. Respect, not fear. Habit one is the Look, Move, Act loop again; it keeps paying off.",
        question: "Can I undo rm? No. Re-download or recreate the file, and start committing your work next week so this never costs you a night.",
        failure: "A website told someone to run a sudo command and things got weird. Fix: stop, do not run more, bring the exact command to Monday night or the cohort channel.",
        action: "Say together: look before you delete. Then say rm, rm dash r, and sudo."
      }
    },
    {
      title: "Set up the class repo",
      companions: ["repository", "clone", "venv"],
      html: `
<h2>Set up the class repo</h2>
<p>Straight from the README's Getting Started. Type each line yourself.</p>
<pre class="cmd"><code><span class="cmt"># 1. Clone the class repo, then step inside it (once)</span>
git clone https://github.com/StrayDogSyn/python-fall26-code-alongs.git
cd python-fall26-code-alongs

<span class="cmt"># 2. Create a virtual environment (once per project)</span>
<span class="os-win">python -m venv venv</span><span class="os-mac">python3 -m venv venv</span>

<span class="cmt"># 3. Activate it (every time you open a new terminal)</span>
<span class="os-win">venv\\Scripts\\Activate.ps1</span><span class="os-mac">source venv/bin/activate</span>

<span class="cmt"># 4. Check your setup</span>
python --version
git --version

<span class="cmt"># 5. Run your first line of Python</span>
python -c "print('Hello, Fall 26!')"</code></pre>
<details class="reveal"><summary>Predict: how will you know the virtual environment is on?</summary><div>Your prompt starts with <code>(venv)</code>. That is your cue that the clean room is open for business, and plain <code>python</code> now works on every system.</div></details>`,
      notes: {
        timing: "6 min",
        talking: "A virtual environment is a clean room for your project's packages. Without one, every project shares a single junk drawer. Cooking version: one labeled container per recipe, not every leftover in one bowl. Create once, activate every session.",
        question: "Do I create the venv every time? No. Create it once. Activate it every time you open a new terminal.",
        failure: "PowerShell blocks the activate script. Fix from the README: run Set-ExecutionPolicy -Scope CurrentUser RemoteSigned, then try again. No (venv) in the prompt: run the activate command again from inside the project folder.",
        action: "Say it together: repository, clone, virtual environment, venv."
      }
    },
    {
      title: "Read your prompt",
      companions: ["interactive"],
      html: `
<h2>Read your prompt: who is listening?</h2>
<p>Shell commands only work in the shell. Python code only works in Python. The prompt tells you which one you are talking to.</p>
<div class="tbl-wrap"><table class="tbl">
  <tr><th>Your prompt looks like</th><th>Who is listening</th><th>What it understands</th></tr>
  <tr><td><code>PS C:\\Users\\you&gt;</code></td><td>PowerShell</td><td><code>cd</code>, <code>ls</code>, <code>git</code>, <code>python</code></td></tr>
  <tr><td><code>you@computer ~ %</code> or a line ending in <code>$</code></td><td>zsh or bash</td><td><code>cd</code>, <code>ls</code>, <code>git</code>, <code>python3</code></td></tr>
  <tr><td><code>(venv)</code> at the very start</td><td>Your shell, with the virtual environment active</td><td>Everything above, using this project's packages</td></tr>
  <tr><td><code>&gt;&gt;&gt;</code></td><td>Python interactive mode</td><td>Python code only. <code>cd</code> and <code>ls</code> fail here</td></tr>
  <tr><td><code>In [1]:</code></td><td>An IPython console, like Spyder's</td><td>Python code. Not a system terminal</td></tr>
</table></div>
<div class="cols">
  <div class="panel"><h3>Run a whole file</h3><p><code>python hello.py</code> runs top to bottom, then hands the terminal back. This is how you run your work.</p></div>
  <div class="panel"><h3>Interactive mode</h3><p><code>python</code> with nothing after it waits at <code>&gt;&gt;&gt;</code>. Great for quick experiments. Type <code>exit()</code> to leave.</p></div>
</div>
<p class="joke">🧓 My terminal and I have an honest relationship. I tell it what I want, and it tells me "command not found."</p>`,
      notes: {
        timing: "3 min",
        talking: "The most common beginner trap: typing shell commands into Python, or Python into the shell. Teach them to glance at the prompt before every command.",
        question: "How do I get out of >>>? Type exit() and press Enter.",
        failure: "SyntaxError after typing cd or ls: they are inside interactive mode. Fix: exit(). Someone runs git clone in Spyder's console: In [1]: is Python, so open a real terminal.",
        action: "Say it together: prompt, interactive mode. Point at each prompt on screen and have the room call out who is listening."
      }
    },
    {
      title: "Translate the jargon",
      html: `
<h2>Translate the jargon</h2>
<p>Here is a sentence you might hear on day one of a dev job. Tap each highlighted word to translate it.</p>
<div data-jargon="w1"></div>
<h3>Match the companions</h3>
<div data-match="w1"></div>
<p class="small muted">Feeling the words get lighter? That is fluency arriving through use. Press <kbd>G</kbd> any time to open your glossary.</p>`,
      notes: {
        timing: "4 min",
        talking: "Do the decoder together as a room, then let people try the matching game on their own screens. Celebrate that this sentence would have been gibberish two hours ago.",
        question: "What if I forget a term next week? Press G for the glossary. Forgetting is part of the loop, and the glossary is your save file.",
        failure: "Dragging doesn't work on a phone or touchscreen. Fix: tap the word, then tap its meaning.",
        action: "Read the full jargon sentence out loud together, then the translated version."
      }
    },
    {
      title: "Week 1 checkpoint",
      html: `
<h2>Week 1 checkpoint</h2>
<p class="muted">Low stakes. Every wrong answer here is one you will not make in a real terminal.</p>
<div data-quiz="w1"></div>`,
      notes: {
        timing: "5 min",
        talking: "Run it as a group vote: read the question, let people shout answers, then click. Wrong answers are welcome; the explanation is the lesson.",
        question: "Does this score count for anything? No. It is a practice round. Hit Retry as many times as you like.",
        failure: "Someone feels bad about a low score. Point back to slide 2: tutorial level. The explanation teaches more than the score.",
        action: "After each question, have the room say the key term in it out loud."
      }
    },
    {
      title: "Practice missions and resources",
      html: `
<h2>Your missions this week</h2>
<p>Reading about commands does about as much for you as reading about push-ups. Full solutions are in <code>resources/command-line-basics.md</code>.</p>
<div class="cols">
  <div class="panel"><h3>1. Scavenger hunt</h3><p>Using only the terminal: what is your home folder's absolute path, how many items are inside it, and what hidden files live in your copy of the class repo?</p></div>
  <div class="panel"><h3>2. Build a folder tree</h3><p>From home, build <code>terminal-gym/code/hello.py</code> and <code>terminal-gym/notes/week1.txt</code> without touching the mouse.</p></div>
  <div class="panel"><h3>3. Rename, copy, clean up</h3><p>Rename <code>hello.py</code> to <code>greet.py</code>, copy it into <code>notes</code>, then leave and delete <code>terminal-gym</code>. Look before you delete.</p></div>
</div>
<h3>Keep going</h3>
<ul>
  <li>🎮 Practice site: <a href="https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/" target="_blank" rel="noopener">Python Essentials: Bridge the Dream</a></li>
  <li>🎥 Recordings: <a href="https://www.youtube.com/@EricHunterPetross" target="_blank" rel="noopener">Eric Hunter Petross on YouTube</a></li>
  <li>📂 Class repo: <a href="https://github.com/StrayDogSyn/python-fall26-code-alongs" target="_blank" rel="noopener">StrayDogSyn/python-fall26-code-alongs</a></li>
  <li>🏫 <a href="https://codethedream.org/" target="_blank" rel="noopener">Code the Dream</a></li>
</ul>
<p class="lead"><strong>See you Monday at 8:00 PM Eastern.</strong> Next week: save points, with Git.</p>`,
      notes: {
        timing: "2 min",
        talking: "Assign the three missions. Remind everyone that the solutions live in the docs, and that this deck lives in the repo under week01 for review.",
        question: "Where do I find this deck later? In the class repo, week01/week01-slides.html. Download it and open it in any browser.",
        failure: "Someone can't find their clone for mission 1. That is the mission working as intended: ls and cd until you find it.",
        action: "Say all thirteen companions out loud in order, using the glossary (G) as a cue card."
      }
    }
  ],

  quizzes: {
    w1: [
      { q: "Your prompt shows <code>&gt;&gt;&gt;</code>. What happens if you type <code>cd Desktop</code>?",
        options: [
          { text: "You move into the Desktop folder." },
          { text: "Python raises a SyntaxError.", correct: true },
          { text: "A new folder named Desktop is created." }
        ],
        why: "<code>&gt;&gt;&gt;</code> means Python is listening, and Python does not speak shell. Type <code>exit()</code> to get back to your terminal." },
      { q: "You save a practice file as <code>random.py</code>, and now <code>import random</code> breaks with a confusing error. Why?",
        options: [
          { text: "Python looks in your folder first, so your file hides the real random module.", correct: true },
          { text: "File names cannot be ordinary English words." },
          { text: "Spyder blocks files with that name." }
        ],
        why: "Never borrow a library's name. Rename it to something like <code>random_practice.py</code>." },
      { q: "Before you run <code>rm</code> to delete a file, what should you do?",
        options: [
          { text: "Run <code>pwd</code> and <code>ls</code> so you know exactly where you are and what is there.", correct: true },
          { text: "Add <code>sudo</code> so the delete definitely works." },
          { text: "Close your editor." }
        ],
        why: "Look before you delete. <code>rm</code> is permanent, and there is no recycle bin." },
      { q: "Your prompt now starts with <code>(venv)</code>. What does that mean?",
        options: [
          { text: "Your code has an error." },
          { text: "You are signed in to GitHub." },
          { text: "This project's virtual environment is active.", correct: true }
        ],
        why: "The clean room is open for business, and plain <code>python</code> works on every system." },
      { q: "A classmate uses VS Code and you use Spyder 6. Can you both follow the same lesson?",
        options: [
          { text: "Yes. Same moves, different controllers.", correct: true },
          { text: "No. Python only runs in Spyder." },
          { text: "Only if you both switch to the same operating system." }
        ],
        why: "Editors are interchangeable. The terminal and Git are the constants." }
    ]
  },

  jargon: {
    w1: {
      parts: [
        "\u201cOpen a ", { term: "terminal", meaning: "the window you type into" },
        ", check your ", { term: "working directory", meaning: "the folder you are standing in" },
        ", then ", { term: "cd", meaning: "change directory: move" },
        " into the ", { term: "repo", meaning: "the project folder Git tracks" },
        " and activate the ", { term: "venv", meaning: "the project's clean room for packages" }, ".\u201d"
      ],
      done: "Translation: open the typing window, see which folder you are in, step into the class project folder, and switch on its clean room. You just spoke developer."
    }
  },

  matches: {
    w1: [
      { term: "Shell", meaning: "The program that reads your commands and runs them" },
      { term: "Prompt", meaning: "The text that says the shell is ready for you" },
      { term: "Path", meaning: "The address of a file or folder" },
      { term: "Working directory", meaning: "The folder your terminal is standing in" }
    ]
  }
};
