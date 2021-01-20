# Week 3 (Dev) - git good at Git

Have you ever used `git`? The ubiquitous program that dominates
code versioning in industry has a lot more going for it than
you might think. Below are Leo's notes for a deep dive into
the inner-machinations of the utility we use every day.

## Required Software

First, install Git from [the project website](https://git-scm.com/). Check to make
sure it is properly installed by opening a terminal and running `git --version`.
The command should output the version number you installed.

## Table of Contents (not final)

* Understanding git
    * Local + distributed
    * What are commits
    * What is a remote
    * What are branches
* Cool git commands
    * typical stuff (pull, add, commit, push)
    * git pull vs fetch
    * git checkout
    * git branch
    * git switch
    * git merge (and merge strategies)
    * git cherry-pick
* Resolving merge conflicts
    * Interactive exercise :) 
* Pull Requests, tags, and releases
* Optional, commit hooks:
    * Prettier + Husky + Lint-Staged

## What is Git?

> Git is a free and open source distributed version control system designed to handle
> everything from small to very large projects with speed and efficiency.
> -- https://git-scm.com/

Git is a **version control system**. That means it keeps track of changes to your code
over time, and helps lighten the load of managing distributed work on a single project.

For our purposes throughout this tutorial, we will be working with Git in the CLI.

## Why CLI?

Rest assured. Your gripes are heard. "But Leo, there's so many great Git Graphical User
Interfaces (GUIs) out there!"

Sure there are! In fact, I'll cover some of them a little later.

The reason that we're going to avoid graphical applications is for a few reasons:
1. Headless environements are common.
2. Git is much more than a GUI. Understanding where your GUI gets its muscles is critical.
3. If you are using an alternative version control, then it'll be easier to transition!

There will come a day when you are working on a machine without any graphical interface, resolving
a merge conflict with some Git-inspired version control you've never used before. You're going
to carry that weight.

## Using Git

### Creating a Repository

You are Ash Ketchum and you're looking to create your website. Obviously, as you catch more
Pokemon you're going to need to make a lot of changes. Further, as you grow older (?), you'll
need to update the appearance of your website. Luckily, Git was built for this! Let's create
a repository:

```sh
mkdir pokedex
cd pokedex
git init
```

With that, we have created an empty Git repository. While we're at it, let's make a new
webpage!

```html
<!DOCTYPE html>
<html>
<head>
    <title>Ash's Website</title>
</head>
<body>
    <h1>Ash's Website</h1>
    <p>
        Hey! I'm Ash. I want to be the best pokemon trainer in the world!
    </p>

    <!-- Feel free to add more here. Maybe a list of pokemon you've caught -->
</body>
</html>
```

Once we're satisfied with where our webpage is at, we can begin tracking changes
in it by adding it to our **stage**.

We can check our stage with `git status`. It will report all the changes it has
detected in our repository.

When we're ready to make a commit, we can run `git commit`. This will open a text
editor in your terminal (if you have one installed) and allow you to leave a little
message about what changes you made to the code.

If some of these commands seem repetitive, don't worry! There's a lot of flags that
can remove these extra commands. For example, to automatically commit all files that
we've added before, we can use `git commit -a`. To include your commit message in the
command, we can use `git commit -m "My message"`.

Finally, we can combine these options: `git commit -am "The commit message"`.

### Local **and** Distributed

What if we want to keep a copy of our commits somewhere? What if I want to keep my
repository updated with Professor Oak's? Thankfully, Git understands this.

Your Git repository can track changes from other copies of itself easily. This is
modified with the subcommand `git remote`. Here's a handy table before we walk through
everything:

Action | Arguments | Effect
-|-|-
`add` | Name + Some URL to a copy of the repo | Adds another remote copy to track changes from
`remove` | Name | Removes the remote copy
`rename` | Name + New name | Rename a remote
`get-url` | Name | Gets a URL
`set-url` | Name + New URL | Sets the new URL

...

### Resolving Merge Conflicts

Activity: make a conflict on another branch, then resolve it.

...

## Getting a little more technical

With our brief technical demo out of the way, let's reflect on our operations:
* Made a commit
* Reverted a commit
* Tracked changes to a file over time
* Reset to a previous commit
* Added a remote
* Tracked changes off of that remote
* Worked on multiple branches
* Merged a branch
* Rebased onto a branch
* Tagged a specific version of the repository

How does Git do all of this? **What is the repository we're working on *really*?**

### What is a repository *really*?

...

### What are commits *really*?

...

## How this applies to graphical interfaces

Git's work-saving nature is amplified with well-designed GUIs. Most, but not all, operations that
we have review so far can be conducted from a graphical application. One such client is GitHub's
own [GitHub Desktop](https://desktop.github.com/). The only downside here is that it cannot
perform more complicated operations such as cherry picks. Further, its merge conflict support is
a bit finnicky. [GitKraken](https://www.gitkraken.com/), on the other hand, provides much more of
Git's functionality, but is less beginner-friendly and has a more confusing interface.

When choosing a graphical interface for Git, bear in mind what sorts of operations you'll need to
accomplish. For many people, the GUI is foregone altogether in favor of the native Command Line
Interface (CLI).

## How this applies to GitHub

> "But Leo! Where does GitHub come into the picture?"

GitHub is just a place to put your Git repositories! They also provide some handy extra functionality
to make collaborative coding easier for you, which we'll talk about right now.

### Forks

We can extend Git's branching functionality further by creating a fork of a repository at a moment
in time to work off of. Think of it as a "super-branch".

### Pull requests

The big idea with open source software is that we want to be able to collaboratively add and remove
changes to code. We can do this easily with the notion of pull requests. Back in the day (and still
in some large projects!), one would submit changes to a project in the form of an email with a `.patch`
file. In more modern projects, a pull request is used.

You *request* to have your changes in your remote repository *pulled* into the base repository.

...

### Tags, Releases

...

## Bonus: Enforcing Linting, Code Style, etc. with Git Hooks

With so many programmers working on a single project, coding style becomes a concern.
Let's face it, it's hard to read code that switches rapidly between conventions.

Many languages provide their own formatting and linting software out of the box. For
JavaScript, there are tools such as [eslint](https://eslint.org/) and
[prettier](https://prettier.io/). To enforce their application, Git provides a feature
called **hooks**, which are short scripts run on particular Git events.

For example, we can hook in a call to our linter and formatter when someone makes a
commit with the `pre-commit` hook.

To ease the installation and setup of these hooks, there's a tool for Node projects called
[Husky](https://github.com/typicode/husky).

...

This said, there's plenty of well-documented Git hooks you can
work with beyond pre-commit. Remember, though, that these
hooks won't be pushed to your GitHub repository. That's
why pre-commit (the npm package) is used.
