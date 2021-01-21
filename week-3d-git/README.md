# Week 3 (Dev) - git good at Git

Have you ever used `git`? The ubiquitous program that dominates
code versioning in industry has a lot more going for it than
you might think. Below are Leo's notes for a deep dive into
the inner-machinations of the utility we use every day.

[:toc]

## Required Software

First, install Git from [the project website](https://git-scm.com/). Check to make
sure it is properly installed by opening a terminal and running `git --version`.
The command should output the version number you installed.

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

### Configuring our User

Before starting on anything, we need to tell Git our username and email so
it can attach our name to anything we author.

```sh
$ git config --global user.email "me@email.com"
$ git config --global user.name "My Name"
```

Notice the `--global` flag. If you wanted to use a particular user name or email for a specific
project, you can omit this flag when in the working directory.

With this, we're ready to go.

### Creating a Repository, Making Commits

You are Ash Ketchum and you're looking to create your website. Obviously, as you catch more
Pokemon you're going to need to make a lot of changes. Further, as you grow older (?), you'll
need to update the appearance of your website. Luckily, Git was built for this! Let's create
a repository:

```sh
mkdir pokedex       # make a folder (directory)
cd pokedex          # change to the directory
git init            # initialize a git repository in the directory
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

This will create a commit with a given **ID**. All commits have a unique hash associated
to them, letting you pinpoint changes made to your code over time.

### Branches

What if we wanted to do some experimentation in the styling of our website, but not have
it be reflected in the one online yet? This is where Git's primary selling-point, branches,
come in. Let's see it in action:

```
git branch experiment
git switch experiment
```

These two commands will create a new branch `experiment` and switch your branch to it.
Now, any commits and changes that we make on this branch will only remain on this branch.

We make some changes and add another commit with `git commit -am ...`. Switch back to
your original `master` branch (`git switch master`) and you'll see that your changes persist!
This isn't what we expected.

This is because switching branches is not the same as checking out all the files and work
on a branch.

If we wanted to check out a branch's version of the file, we can use the command
`git checkout COMMIT_ID FILE_NAME`.

To simplify this process, we can check out the entire version of the repository on a
branch with `git checkout BRANCH_NAME`.

We can make one or two more changes before moving along - try making a few small changes
or maybe adding a few files!

> Note: if you're all done experimenting, we can delete our branch with
> `git branch -d BRANCH_NAME`. **Don't do this yet! We'll be using our
> experiment branch later.**

### Reviewing our Commits

We can review the commit history of the repository with `git log`:

```
$ git log
commit 5d30e5fc8d413d9cd2ca602c20b89f8697dd840e
Author: krashanoff <lkrashanoff2@gmail.com>
Date:   Wed Jan 20 23:40:41 2021 -0800

    My next commit

commit 9dddd0d9befc03a7ece73ddcc7a0dd55bac1e941
Author: krashanoff <lkrashanoff2@gmail.com>
Date:   Wed Jan 20 23:40:18 2021 -0800

    My first commit
```

This will show all the commits that contributed to our branch. We can view the commits with
a graphical view of the branches that were incorporated into it with `git log --graph`. We'll
be using this later.

### Merging Branches

What if we're happy with where our work is at? We can `merge` in our work with `git merge`.
If we're currently on the `master` branch for our repository, we can simply run the following:

```sh
git merge experiment
```

If the two branches line up (i.e., don't have overlapping work), we will see that Git automatically
fast forwards the process of merging the work from the other branch onto our own.

### Conflicts

What if we had overlapping work, though? Let's try making the same file on two separate branches and
see where it takes us when we try to merge them:

```sh
# create some file on master
echo 'This is some new file' > newfile
git add newfile
git commit -m "Add some new file."

# create and commit our second file
# on a separate branch
git checkout experiment
echo 'This is a DIFFERENT file' > newfile
git add newfile
git commit -m "Add a different file."

git checkout master
```

What is going to happen when we try to merge the two back together? Take a moment to
try and figure it out!

***

```sh
$ git merge experiment

CONFLICT (add/add): Merge conflict in newfile
Auto-merging newfile
Automatic merge failed; fix conflicts and then commit the result.
```

This doesn't seem good. Let's follow its instructions:
1. Fix the conflict in `newfile`
2. Commit the result!

Easy enough. Opening our file, we see:

```
<<<<<<< HEAD
This is some new file
=======
This is a DIFFERENT file
>>>>>>> experiment
```

This is the conflict that Git is talking about. The first portion enclosed in `<<<< HEAD` refers
to the version of the file on our **head** (i.e., current branch). `=====` denotes the divider
between versions, and `>>>>> experiment` denotes the part of the file that is **incoming**, or
from the branch we're trying to merge.

We fix the conflict by combining their contents:

```
This is some new file
And this is a DIFFERENT file!
```

...and committing the result. This resolves the merge conflict.

```sh
git add newfile
git commit -m "Fix merge conflict."
```

Check out `git log --graph` and you can see the result!

```
*   commit f008b54877b36d39cdd86b38e4a55d7edef75c89 (HEAD -> master)
|\  Merge: 4d68353 ef752b9
| | Author: krashanoff <leo@krashanoff.com>
| | Date:   Wed Jan 20 23:47:20 2021 -0800
| | 
| |     Fix merge conflict.
| | 
| * commit ef752b92e4efa023d9ecb260a99bb29daca5b037 (experiment)
| | Author: krashanoff <leo@krashanoff.com>
| | Date:   Wed Jan 20 23:41:40 2021 -0800
| | 
| |     Add a different file.
| | 
* | commit 4d68353f8cedd213ccf3ef9476ffa215a6d8f6ec
|/  Author: krashanoff <leo@krashanoff.com>
|   Date:   Wed Jan 20 23:41:20 2021 -0800
|   
|       Add some new file.
| 
* commit 5d30e5fc8d413d9cd2ca602c20b89f8697dd840e
| Author: krashanoff <leo@krashanoff.com>
| Date:   Wed Jan 20 23:40:41 2021 -0800
| 
|     My next commit
```

That little joining portion is the *merge*. Nice work!

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

If we know that Oak's copy of the repository is located at `https://git.oakslab.edu/pokedex.git`,
then we can add it as a remote to our repository with `git remote add oak https://git.oakslab.edu/pokedex.git`.

What if I also wanted to track a copy of the Pokedex from Cynthia? I can do that, too, by adding
another remote. But wait, Cynthia's copy of the repository is using SSH to sync! Rest assured,
Git handles that too: `git remote add cynthia leo@cynthia.org:pokedex.git`.

To **fetch** commits that might have been made on a remote, we can use `git fetch REMOTE_NAME`.
To integrate those commits into our own current branch, we can **merge** them with
`git merge REMOTE_NAME/BRANCH_NAME`. Let's update our `working` branch with Cynthia's changes on her `master`
branch:

```sh
# just to make sure we're on the right branch
git checkout working

# fetch the latest commits
git fetch cynthia

# merge the changes into our branch
git merge cynthia/master
```

To simplify this process, you can use `git pull REMOTE_NAME BRANCH_NAME`:

```sh
git pull cynthia master
```

Now the latest changes have been applied to our local copy.

If we want to push some changes from our own copy to a remote that we have write access to, we can
do so with `git push REMOTE_NAME BRANCH_NAME`.

If I have write access to Oak's copy of the repository, for example, I can let him
know about my latest catches by pushing my `master` branch to his `ash` branch!

```sh
git switch master
git push oak ash
```

### Picking a single commit

What if we wanted to merge the changes in a *single commit*? We can do this
with `git cherry-pick COMMIT_ID`. It will apply the changes contained in a
single commit onto your current **head** (branch).

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

Beyond a folder of code, a repository is really the `.git` folder *inside* your
project. This is where all your commits and their changes are tracked.

### What are commits *really*?

Commits are actually compressed summaries of the changes you made to a project over time.

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

GitHub is just a place to put your Git repositories! When you create a Git repository, you
use `git clone` to clone a copy of the remote repository to your local machine, make changes
to it, commit those changes, then push them to the remote!

They also provide some handy extra functionality
to make collaborative coding easier for you, which we'll talk about right now.

### Forks

We can extend Git's branching functionality further by creating a fork of a repository at a moment
in time to work off of. Think of it as a "super-branch".

### Pull requests

You've probably made a pull request or two by now, and understand their omnipresence in open source
software (OSS).

The big idea with OSS is that we want to be able to easily add and remove
changes to code collaboratively. This is simplified with the notion of pull requests. Back in the day (and still
in some large projects!), one would submit changes to a project in the form of an email with a `.patch`
file.

You *request* to have your changes in your remote repository *pulled* into the base repository.

### Tags, Releases

In Open Source Software, we may want to correlate our Git tags to actual, tangible
"releases" on GitHub. We can do this by navigating to our 

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
