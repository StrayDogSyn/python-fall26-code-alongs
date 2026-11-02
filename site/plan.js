/* Edit this file as the cohort advances. See site/README.md for the content contract. */
window.COURSE_PLAN = {
  phases: [
    { id: "launch", label: "01 / Launchpad", title: "Find your footing", description: "Set up a workspace, learn the terminal, and make reliable save points.", color: "mint" },
    { id: "core", label: "02 / Core Python", title: "Think in code", description: "Give data names, make choices, repeat steps, and organize programs.", color: "coral" },
    { id: "data", label: "03 / Working with data", title: "Shape the evidence", description: "Bring data in, clean it, combine it, and show what it says.", color: "sky" },
    { id: "world", label: "04 / Real-world sources", title: "Connect the pieces", description: "Collect, query, and communicate useful information.", color: "lavender" }
  ],
  units: [
    {
      id: "week01", phase: "launch", code: "W01", title: "Learn the Controls", status: "live",
      summary: "Meet your tools, find your place in the terminal, and run a first Python file.",
      topics: ["Python + editor setup", "terminal and shell", "paths", "Look → Move → Act"],
      objective: "I can find the right folder and run a file while explaining what each command does.",
      teach: "Watch a path trace and predict the next prompt before the instructor presses Enter.",
      together: "Use pwd and ls to diagnose a file-not-found error, then choose the next move together.",
      solo: "Create a practice folder, save hello.py, run it, and explain why the same command fails from a different folder.",
      links: [
        { label: "Interactive slides", href: "week01/week01-slides.html", kind: "primary" },
        { label: "Terminal guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/command-line-basics.md" },
        { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/week01/notebook-source.md" }
      ],
      lesson: {
        estimate: "≈60–90 min",
        steps: [
          { key: "start", label: "Start here", text: "Confirm Python, Git, and VS Code are installed, then skim the week's goal so the vocabulary is familiar before class.", links: [
            { label: "Setup checklist", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs#getting-started" },
            { label: "Interactive slides", href: "week01/week01-slides.html", kind: "primary" }
          ] },
          { key: "watch", label: "Watch / observe", mode: "I DO", text: "Open the deck and pause at every Predict prompt before the reveal. Watching instead? Find the Week 01 recording on the instructor's channel and keep the deck open beside it.", links: [
            { label: "Week 01 deck", href: "week01/week01-slides.html" },
            { label: "Recordings channel", href: "https://www.youtube.com/@EricHunterPetross" }
          ] },
          { key: "practice", label: "Practice together", mode: "WE DO", text: "Trace pwd, ls, and cd in the deck's terminal simulator, then question one step in the cohort notebook with only the W01 sources selected.", links: [
            { label: "Terminal simulator", href: "week01/week01-slides.html" },
            { label: "Cohort notebook", href: "https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8" },
            { label: "Terminal guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/command-line-basics.md" }
          ] },
          { key: "try", label: "Try independently", mode: "YOU DO", text: "In a safe practice folder, save hello.py, run it, and explain why the same command fails from a different folder.", links: [
            { label: "Terminal guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/command-line-basics.md" },
            { label: "Week 01 deck", href: "week01/week01-slides.html" }
          ] },
          { key: "check", label: "Check understanding", text: "Take the deck's quiz and explain each answer out loud. If your cohort shares them, the notebook's W01 quiz and flashcards check the same mental model.", links: [
            { label: "Week 01 deck", href: "week01/week01-slides.html" },
            { label: "Cohort notebook", href: "https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8" }
          ] },
          { key: "unstuck", label: "Get unstuck", text: "Match the symptom before typing: file-not-found usually means the wrong folder. Walk the guide's OS table, then ask the notebook tutor for one hint at a time.", links: [
            { label: "Troubleshooting table", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/command-line-basics.md" },
            { label: "Tutor prompt", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/GEMINI_NOTEBOOK.md" },
            { label: "Getting unstuck", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs#getting-unstuck" }
          ] },
          { key: "deeper", label: "Go deeper", text: "Review the compact W01 notebook source, or get extra reps by topic on the previous cohort's practice site.", links: [
            { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/week01/notebook-source.md" },
            { label: "Extra practice", href: "https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/" }
          ] }
        ]
      }
    },
    {
      id: "week02", phase: "launch", code: "W02", title: "Save Points", status: "live",
      summary: "Use Git and GitHub to save, share, and maintain work in your own fork.",
      topics: ["Git status", "stage → commit → push", "forks and remotes", "weekly sync"],
      objective: "I can trace one change from my working folder to GitHub and keep my fork current.",
      teach: "Watch a file move through working folder, staging area, local history, and GitHub.",
      together: "Read a status report, stage only the intended file, and predict what changes after each command.",
      solo: "In your own fork, save a small edit, stage it, commit it, push it, and explain origin versus upstream.",
      links: [
        { label: "Interactive slides", href: "week02/week02-slides.html", kind: "primary" },
        { label: "Git guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/git-commands.md" },
        { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/week02/notebook-source.md" }
      ],
      lesson: {
        estimate: "≈60–90 min",
        steps: [
          { key: "start", label: "Start here", text: "Confirm Git is installed and you have a fork of this repository, then skim the four places a change can live before class.", links: [
            { label: "Git guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/git-commands.md" },
            { label: "Interactive slides", href: "week02/week02-slides.html", kind: "primary" }
          ] },
          { key: "watch", label: "Watch / observe", mode: "I DO", text: "Follow one file through working folder, staging area, local history, and GitHub. Watching instead? Find the Week 02 recording on the instructor's channel.", links: [
            { label: "Week 02 deck", href: "week02/week02-slides.html" },
            { label: "Recordings channel", href: "https://www.youtube.com/@EricHunterPetross" }
          ] },
          { key: "practice", label: "Practice together", mode: "WE DO", text: "Read a status report in the deck's staging visualizer, stage only the intended file, and predict what changes after each command. Then question a step in the cohort notebook with only the W02 sources selected.", links: [
            { label: "Staging visualizer", href: "week02/week02-slides.html" },
            { label: "Cohort notebook", href: "https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8" },
            { label: "Git guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/git-commands.md" }
          ] },
          { key: "try", label: "Try independently", mode: "YOU DO", text: "In your own fork, save a small edit, stage it, commit it, push it, and explain origin versus upstream in your own words.", links: [
            { label: "Git guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/git-commands.md" },
            { label: "Week 02 deck", href: "week02/week02-slides.html" }
          ] },
          { key: "check", label: "Check understanding", text: "Take the deck's quiz, then walk the Undo Guide until you can name the safe first check for each scenario. Notebook W02 flashcards cover the same ideas.", links: [
            { label: "Week 02 deck", href: "week02/week02-slides.html" },
            { label: "Cohort notebook", href: "https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8" }
          ] },
          { key: "unstuck", label: "Get unstuck", text: "A rejected push is not a lost cause: find your state in the guide's sync and undo sections first. Ask the notebook tutor for one safe step, never a destructive command.", links: [
            { label: "Sync and undo guide", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/git-commands.md" },
            { label: "Tutor prompt", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/GEMINI_NOTEBOOK.md" },
            { label: "Getting unstuck", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs#getting-unstuck" }
          ] },
          { key: "deeper", label: "Go deeper", text: "Review the compact W02 notebook source, or preview how the weekly fork-upkeep loop repeats for the rest of the course.", links: [
            { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/week02/notebook-source.md" },
            { label: "Extra practice", href: "https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/" }
          ] }
        ]
      }
    },
    {
      id: "lp01", phase: "core", code: "W03 / LP 01", title: "Intro to Python", status: "live",
      summary: "Week 3 catch-up: values, safe conversion, conditions, loops, functions, and strings.",
      topics: ["values and types", "control flow", "functions", "exceptions", "strings"],
      objective: "I can predict a Python program, then build and repair ten small functions.",
      teach: "Trace a total loop, safe numeric conversion, a changing while condition, and string cleanup.",
      together: "Change a threshold and guest list, predict the output, and run the changed program.",
      solo: "Complete ten graded functions from warm-up to transfer, checking each one locally.",
      links: [
        { label: "Week 3 slides", href: "week03/week03-slides.html", kind: "primary" },
        { label: "Text walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/week03-walkthrough.md" },
        { label: "Open topic lab", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/README.md", kind: "primary" },
        { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/practice.py" },
        { label: "Local check command", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/check.py" }
      ],
      lesson: {
        estimate: "≈75–100 min",
        steps: [
          { key: "start", label: "Start here", text: "Open the lab README, then read the notebook source. Stop at each Predict prompt and write your answer before reading on.", links: [
            { label: "Week 3 walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/week03-walkthrough.md" },
            { label: "Lab README", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/README.md", kind: "primary" },
            { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/notebook-source.md" }
          ] },
          { key: "watch", label: "Watch / observe", mode: "I DO", text: "Run the code-along. Trace the total loop, safe input pattern, numbered guests, range, mean, and string cleanup.", links: [
            { label: "Week 3 slides", href: "week03/week03-slides.html" },
            { label: "Code-along", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/code-along.py" }
          ] },
          { key: "practice", label: "Practice together", mode: "WE DO", text: "Change the cutoff to 75 and add a guest with extra spaces. Predict the label and cleaned name before running.", links: [
            { label: "Week 3 walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/week03-walkthrough.md" }
          ] },
          { key: "try", label: "Try independently", mode: "YOU DO", text: "Complete ten exercises in practice.py. From the repository root, run python lp01-intro-to-python/check.py after each change.", links: [
            { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/practice.py" },
            { label: "Three-level hints", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/hints.md" }
          ] },
          { key: "check", label: "Check understanding", text: "Aim for ten PASS lines before opening the reference. Exit check: explain = versus ==, a while stopping condition, and one ValueError recovery.", links: [
            { label: "Reference solutions", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/solutions.py" }
          ] }
        ]
      }
    },
    {
      id: "lp02", phase: "core", code: "W04 / LP 02", title: "Data Structures & Files", status: "live",
      summary: "Week 4 catch-up: collections, UTF-8 files, parsing, ranking, and grouping.",
      topics: ["lists", "dictionaries", "tuples and sets", "file I/O", "sorting and parsing"],
      objective: "I can choose a collection, read and write UTF-8, and solve eleven checked exercises.",
      teach: "Model a roster, read it with open, then parse, rank, group, and format data.",
      together: "Add a participant, spot a duplicate, and predict a ranking and the saved file's lines.",
      solo: "Complete eleven exercises from warm-up to repair and build, checking each locally.",
      links: [
        { label: "Week 4 slides", href: "week04/week04-slides.html", kind: "primary" },
        { label: "Text walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/week04-walkthrough.md" },
        { label: "Open topic lab", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/README.md", kind: "primary" },
        { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/practice.py" },
        { label: "Local check command", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/check.py" }
      ],
      lesson: {
        estimate: "≈90–110 min",
        steps: [
          { key: "start", label: "Start here", text: "Open the lab README, then read the notebook source. Stop at each Predict prompt and write your answer before reading on.", links: [
            { label: "Week 4 walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/week04-walkthrough.md" },
            { label: "Lab README", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/README.md", kind: "primary" },
            { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/notebook-source.md" }
          ] },
          { key: "watch", label: "Watch / observe", mode: "I DO", text: "Run the code-along: model a roster, predict its file lines, then trace open, word counts, ranking, groups, and meeting text.", links: [
            { label: "Week 4 slides", href: "week04/week04-slides.html" },
            { label: "Code-along", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/code-along.py" }
          ] },
          { key: "practice", label: "Practice together", mode: "WE DO", text: "Add Noor and a second Ari, then predict the file, unique count, and ranking after a tied score.", links: [
            { label: "Week 4 walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/week04-walkthrough.md" }
          ] },
          { key: "try", label: "Try independently", mode: "YOU DO", text: "Complete eleven functions in practice.py. From the repository root, run python lp02-data-structures/check.py after each change.", links: [
            { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/practice.py" },
            { label: "Three-level hints", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/hints.md" }
          ] },
          { key: "check", label: "Check understanding", text: "Aim for eleven PASS lines before opening the reference. Exit check: explain order, a sort tie, and a UTF-8 file read.", links: [
            { label: "Reference solutions", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/solutions.py" }
          ] }
        ]
      }
    },
    {
      id: "lp03", phase: "core", code: "W05 / LP 03", title: "More Python Skills", status: "live",
      summary: "Week 5: classes, comprehensions, decorators, and closures.",
      note: "Extension: classes, comprehensions, decorators, and closures. Also useful after Week 6.",
      topics: ["classes", "comprehensions", "decorators", "closures"],
      objective: "I can explain how a class owns data, how a comprehension builds values, and what decorators and closures retain.",
      teach: "Trace Gradebook, the passing list, a wrapped call, and a checker that remembers its threshold.",
      together: "Change the threshold and predict the passing list before running.",
      solo: "Implement Tally, long_words, make_multiplier, and count_calls in the practice starter.",
      links: [
        { label: "Week 5 slides", href: "week05/week05-slides.html", kind: "primary" },
        { label: "Lesson packet", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/README.md" },
        { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/practice.py" }
      ],
      lesson: {
        estimate: "≈85 min",
        steps: [
          { key: "start", label: "Start here", text: "Open the LP 03 packet and write a prediction at each pause in the source.", links: [
            { label: "Week 5 slides", href: "week05/week05-slides.html", kind: "primary" },
            { label: "Notebook source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/notebook-source.md" }
          ] },
          { key: "watch", label: "Watch / observe", mode: "I DO", text: "Trace Gradebook, the two comprehensions, the decorated call, and the closure before running the code-along.", links: [
            { label: "Code-along", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/code-along.py" }
          ] },
          { key: "practice", label: "Practice together", mode: "WE DO", text: "Change the passing threshold to 65, predict the names that pass, then check the output.", links: [
            { label: "Week 5 slides", href: "week05/week05-slides.html" }
          ] },
          { key: "try", label: "Try independently", mode: "YOU DO", text: "Replace each TODO in practice.py, then rerun the file. Start with Tally and long_words.", links: [
            { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/practice.py" }
          ] },
          { key: "check", label: "Check understanding", text: "Take the deck quiz, explain the wrapper call order, and compare with the reference after your own attempt.", links: [
            { label: "Week 5 quiz", href: "week05/week05-slides.html" },
            { label: "Reference solutions", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/solutions.py" }
          ] },
          { key: "unstuck", label: "Get unstuck", text: "Find the exercise's FAIL or NOT STARTED line in the local check output. Open one hint level for that function at a time.", links: [
            { label: "Text source", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03-more-python-skills/notebook-source.md" }
          ] }
        ]
      }
    },
    {
      id: "lp03a", phase: "core", code: "W05 / LP 03A", title: "Iteration & Algorithms", status: "live",
      summary: "This week's loop, search, sorting, and debugging lesson.",
      topics: ["for and while loops", "linear and binary search", "sorting passes", "loop debugging"],
      objective: "I can trace a loop, explain how a search narrows its work, and repair a loop bug.",
      teach: "Predict each result in the code-along, then trace loop state and comparison counts.",
      together: "Repair a reset accumulator and compare linear with binary search on sorted room codes.",
      solo: "Complete eleven new exercises and run the local check after each TODO.",
      links: [
        { label: "Week 5 iteration slides", href: "week05/week05-iteration-slides.html", kind: "primary" },
        { label: "Kindred lesson packet", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/README.md" },
        { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/practice.py" },
        { label: "Local check", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/check.py" }
      ],
      lesson: {
        estimate: "≈90 min",
        steps: [
          { key: "start", label: "Start here", text: "Open the packet and predict each loop result before the reveal.", links: [
            { label: "Week 5 slides", href: "week05/week05-iteration-slides.html", kind: "primary" },
            { label: "Text walkthrough", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/week05-walkthrough.md" }
          ] },
          { key: "watch", label: "Watch / observe", mode: "I DO", text: "Run the code-along and trace counts, a bounded while loop, search comparisons, and sorting passes.", links: [
            { label: "Code-along", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/code-along.py" }
          ] },
          { key: "practice", label: "Practice together", mode: "WE DO", text: "Find an accumulator reset and an early return, then compare linear and binary search step counts.", links: [
            { label: "Week 5 slides", href: "week05/week05-iteration-slides.html" }
          ] },
          { key: "try", label: "Try independently", mode: "YOU DO", text: "Complete one TODO at a time, starting with a Warm-up or Fix it exercise. Run python lp03a-iteration-and-algorithms/check.py from the repository root.", links: [
            { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/practice.py" },
            { label: "Three-level hints", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/hints.md" }
          ] },
          { key: "check", label: "Check understanding", text: "Explain one search comparison count and one sorting pass, then take the deck quiz.", links: [
            { label: "Week 5 quiz", href: "week05/week05-iteration-slides.html" },
            { label: "Local check", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp03a-iteration-and-algorithms/check.py" }
          ] }
        ]
      }
    },
    { id: "lp04", phase: "data", code: "LP 04", title: "Intro to Data Engineering", status: "planned", summary: "Meet pandas Series and DataFrames.", topics: ["pandas", "Series", "DataFrames"], objective: "I can load, inspect, and describe a small table.", teach: "Inspect a DataFrame's rows, columns, and types.", together: "Choose a column and explain what it represents.", solo: "Load a new table and report three observations.", links: [] },
    { id: "lp05", phase: "data", code: "LP 05", title: "Data Cleaning & Validation", status: "planned", summary: "Find and fix missing, inconsistent, or invalid values.", topics: ["missing values", "validation", "data quality"], objective: "I can identify a data-quality problem and verify a correction.", teach: "Show how a bad value affects a summary.", together: "Choose a cleaning rule and test it.", solo: "Document a cleaning decision on fresh data.", links: [] },
    { id: "lp06", phase: "data", code: "LP 06", title: "Wrangling & Aggregation", status: "planned", summary: "Combine and summarize data to answer a question.", topics: ["grouping", "merging", "aggregation"], objective: "I can group records and explain the resulting summary.", teach: "Walk through a group-by result one group at a time.", together: "Predict a merge and inspect mismatched keys.", solo: "Build a summary for a new question.", links: [] },
    { id: "lp07", phase: "data", code: "LP 07", title: "Intro to Visualization", status: "planned", summary: "Make charts that communicate honest comparisons.", topics: ["chart choice", "axes", "labels"], objective: "I can choose and label a chart that answers a question.", teach: "Compare two charts of the same data.", together: "Revise labels and scale to reduce confusion.", solo: "Create one chart and explain its takeaway.", links: [] },
    { id: "lp08", phase: "world", code: "LP 08", title: "Web Scraping", status: "planned", summary: "Request a page and parse useful HTML responsibly.", topics: ["requests", "HTML parsing", "responsible collection"], objective: "I can extract a specific value and explain where it came from.", teach: "Inspect a page response and one selector.", together: "Choose a robust selector for a small example.", solo: "Extract and validate a new field.", links: [] },
    { id: "lp09", phase: "world", code: "LP 09", title: "Databases & SQL", status: "planned", summary: "Ask questions of structured data with SQLite.", topics: ["tables", "SELECT", "WHERE"], objective: "I can write a query and explain the rows it returns.", teach: "Read a query clause by clause.", together: "Change a filter and predict the result.", solo: "Write a new query from a question.", links: [] },
    { id: "lp10", phase: "world", code: "LP 10", title: "Advanced SQL & Integration", status: "planned", summary: "Connect Python and SQL in a repeatable workflow.", topics: ["joins", "Python + SQLite", "queries"], objective: "I can combine tables and use a query result in Python.", teach: "Trace a join across two small tables.", together: "Predict rows after a join condition changes.", solo: "Query and summarize a new dataset.", links: [] },
    { id: "lp11", phase: "world", code: "LP 11", title: "Advanced Visualization", status: "planned", summary: "Turn the full toolkit into a clear data story.", topics: ["visual storytelling", "comparison", "presentation"], objective: "I can defend a chart choice and explain its limits.", teach: "Critique a chart for clarity and accuracy.", together: "Revise a visual for a specific audience.", solo: "Present a final evidence-based view.", links: [] }
  ]
};
