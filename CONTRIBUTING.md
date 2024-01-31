# Contributor Manual

Contributions from the community are essential in keeping Hedwig, as for any Open Source
project, strong and successful. We welcome contributions of any size and skill level. As an Open Source project, we believe in giving back to our contributors and are happy to help with guidance on PRs and technical writing.


## Guidelines

We ask you to mind just a few guidelines:

* respect the project's requirements
* have a corresponding Github issue. The key of the issue should be used as the name of the branch, in the commit message and in the name of the PR
* have a set of appropriate tests.  For bug reports, the tests reproduce the initial reported bug
	and illustrate that the solution actually fixes the bug.  For features/enhancements, the 
	tests illustrate the feature working as intended.  In both cases the tests are incorporated into
	the project to protect against regressions. We require 2 types on tests:
    * E2E tests: these are always required. Previous tests should be updated if needed, and new tests should
        be added when working on a new feature
    * Unit tests: optional. We require unit tests only for components that have some complex logic
* the code pass the Accessibility Vulnerabilities test
* if applicable, documentation is updated to reflect the introduced changes
* all the checks on the PR pass


### Getting Started

If you are just getting started with Git, GitHub and/or contributing to Hedwig via
GitHub there are a few pre-requisite steps to follow:

* make sure you have a [GitHub account](https://github.com/signup/free)
* [fork](https://help.github.com/articles/fork-a-repo) the Hedwig repository.  As discussed in
the linked page, this also includes:
    * [set up your local git install](https://help.github.com/articles/set-up-git) 
    * clone your fork


### Create the working (topic) branch

Create a [topic branch](https://git-scm.com/book/en/Git-Branching-Branching-Workflows#Topic-Branches) 
on which you will work.  The convention is to incorporate the Github issue key as the name of this branch,
although this is more of a mnemonic strategy than a hard-and-fast rule - but doing so helps:
* remember what each branch is for 
* isolate the work from other contributions you may be working on

_If there is not already a Github issue covering the work you want to do, create one. Feel free to use GitHub issues for questions, bug reports, and feature requests and use the search feature to check for an existing issue. When creating a new Github issue, include as much information as possible and provide any relevant resources (Eg. screenshots). For bug reports ensure you have a reproducible test case_
  
Assuming you will be working from the `main` branch and working
on the issue DOC01 : `git checkout -b DOC01 main`

#### Good First Issue

Issues labeled [`good first issue`](https://github.com/gdgpescara/hedwig/labels/good%20first%20issue) are a great way to ease into development on this project.

#### Help Wanted Label

Any other issue labeled [`help wanted`](https://github.com/gdgpescara/hedwig/labels/help%20wanted) is ready for a PR.

### Code

Do your thing!


### Commit

* make commits of logical units
* be sure to **use the Github issue key** in the commit message
* make sure you have added the necessary tests for your changes
* run _all_ the tests to assure nothing else was accidentally broken

_Prior to committing, if you want to pull in the latest upstream changes, please use rebasing rather than merging._

### Submit

* squash your commits, in order to keep the changes history clean
* push your changes to the topic branch in your fork of the repository
* initiate a [pull request](https://help.github.com/articles/creating-a-pull-request), using the Github issue 
    key in the name of the PR and referencing the issue in the PR comment


It is important that this topic branch on your fork:

* be isolated to just the work on this one Github issue, or multiple issues if they are
	related and also fixed/implemented by this work.  The main point is to not push
	commits for more than one PR to a single branch - GitHub PRs are linked to
	a branch rather than specific commits
* remain until the PR is closed.  Once the underlying branch is deleted the corresponding
	PR will be closed, if not already, and the changes will be lost


