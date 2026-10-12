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
      ]
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
      ]
    },
    {
      id: "lp01", phase: "core", code: "LP 01", title: "Intro to Python", status: "preview",
      summary: "A supplemental lab on values, variables, conditions, loops, functions, and debugging.",
      topics: ["values and types", "control flow", "functions", "debugging"],
      objective: "I can predict and change a short Python program, then explain its output.",
      teach: "Trace a total loop and narrate why numeric text needs conversion.",
      together: "Change a threshold, predict the branch, and run the changed program.",
      solo: "Implement classify_score and count_passing before opening the reference solution.",
      links: [
        { label: "Open topic lab", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/README.md", kind: "primary" },
        { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp01-intro-to-python/practice.py" }
      ]
    },
    {
      id: "lp02", phase: "core", code: "LP 02", title: "Data Structures & Files", status: "preview",
      summary: "A supplemental lab on collections and a text-file round trip.",
      topics: ["lists", "dictionaries", "tuples and sets", "file I/O"],
      objective: "I can choose a collection for a task and save and read a small text file.",
      teach: "Model a roster with ordered names and name-to-score lookup.",
      together: "Add a participant, spot a duplicate, and predict the saved file's lines.",
      solo: "Implement unique_names, highest_score, and save_names before comparison.",
      links: [
        { label: "Open topic lab", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/README.md", kind: "primary" },
        { label: "Practice starter", href: "https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/lp02-data-structures/practice.py" }
      ]
    },
    { id: "lp03", phase: "core", code: "LP 03", title: "More Python Skills", status: "planned", summary: "Classes, comprehensions, decorators, and closures.", topics: ["classes", "comprehensions", "decorators", "closures"], objective: "I can organize behavior and recognize compact Python patterns.", teach: "Read a small class and narrate what each method owns.", together: "Refactor a repeated loop into a readable comprehension.", solo: "Choose the clearest form for a fresh task and justify it.", links: [] },
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
