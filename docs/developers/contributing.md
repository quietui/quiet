---
title: Contributing
description: Learn how contributions work in this project.
layout: docs.njk
---

Quiet UI is an open source project, meaning everyone can use it and contribute to its development. A common misconception about contributing to an open source project is that you need to know how to code.

This simply isn't true.

In fact, there are many ways to contribute, and some of the most important contributions come from those who never write a single line of code. Here's a list of ways you can make a meaningful contribution to the project:

- Submitting well-written bug reports
- Submitting feature requests that are within the scope of the project
- Improving the documentation
- Responding to users that need help in the community chat or discussion forum
- Triaging issues on GitHub
- Being a developer advocate for the project
- Sponsoring the project financially
- Writing tests
- Sharing ideas
- And, of course, contributing code!

:::info
Please take a moment to review these guidelines to make the contribution process as easy as possible for both yourself and the project's maintainer.
:::

## Feature requests

It's important to remember that this project is [very opinionated](/about). Many feature requests will be considered out of scope and will not be fulfilled. This doesn't mean your idea is bad — it means it's not a good fit for the project right now. The maintainer strongly believes that certain tradeoffs are worth eliminating complexity and bloat, which ultimately leads to improved longevity.

- Please **do** search for an existing request before suggesting a new feature.
- Please **do** use the voting buttons to vote for a feature.
- Please **do** share substantial use cases and perspective that support new features if they haven't already been mentioned.
- Please **do not** bump, spam, or ping contributors to prioritize your own feature.

You can [request a feature here](https://github.com/quietui/quiet/discussions/categories/feature-requests).

## Bug Reports

A bug is a demonstrable problem caused by code in the library. Bug reports are an important contribution to the quality of the project. When submitting a bug report, there are a few steps you can take to make sure your issues gets attention quickly.

- Please **do** search for an existing issue before creating a new one
- Please **do** explain the bug clearly and concisely
- Please **do** provide a minimal reproduction that shows the bug (e.g. [CodePen](https://codepen.io/pen/) or [JSFiddle](https://jsfiddle.net/))
- Please **do not** use the issue tracker for personal support requests ([go here instead](https://github.com/quietui/components/discussions/categories/help-support))
- Please **do not** paste in large blocks of irrelevant code
- Please **do not** paste in screenshots of code

:::info
A minimal test case is critical to getting your bug fixed! It demonstrates that the bug exists in the library and not in surrounding code. Contributors should be able to understand the bug without studying your code.
:::

## Pull requests

To keep the project on track, please consider the following guidelines before submitting a PR.

- Please **do** open an issue before submitting a PR unless the changes are trivial (e.g. fixing typos or outdated docs). This will prevent you from doing work that won't be accepted for various reasons (e.g. someone is already working on it, it's not a good fit for the project's roadmap, it needs additional exploration, etc.)
- Please **do** make sure your PR clearly defines what you're changing. Even if you feel your changes are obvious, please explain them so other contributors can more easily review your work.
- Please **do not** edit anything in `dist/`, as those files are generated at build time.

The maintainer reserves the right to reject any PR that's outside the scope of the project or doesn't meet code quality standards.

## Documentation

Maintaining good documentation can be a painstaking task, but poor documentation leads to frustration and makes the project less appealing to users. Fortunately, writing documentation for this project is pretty easy.

Most of the technical documentation is generated with JSDoc comments and TypeScript metadata gathered from the source code. Every property, method, event, etc. is documented this way. In-code comments encourage contributors to keep the documentation up to date as changes occur so the docs are less likely to become stale. Refer to an existing component to see how JSDoc comments are used in this project.

Instructions, code examples, and interactive demos are hand-curated to give users the best possible experience. Typically, the most relevant information is shown first and less common examples are shown further down the page. Edge cases and gotchas should be called out in context.

The docs are powered by [Eleventy](https://www.11ty.dev/). Check out `docs/components/*.md` to get an idea of how pages are structured and formatted. If you're creating a new component, it may help to use an existing component's markdown file as a template.

If you need help with documentation, feel free to reach out on the [discussion forum](https://github.com/quietui/quiet/discussions).

## AI-generated code

As an open source maintainer, I respectfully ask that you refrain from using AI-generated code when contributing to this project. This includes code generated by tools such as GitHub Copilot, even if you make alterations to it afterwards. While some of Copilot's features are indeed convenient, the ethics surrounding which code bases the AI has been trained on and their corresponding software licenses remain very questionable and have yet to be tested in a legal context.

I realize that one cannot reasonably enforce this any more than one can enforce not copying licensed code from other code bases, nor do I wish to expend energy policing contributions. I would, however, like to avoid all ethical and legal challenges that result from using AI-generated code. As such, I respectfully ask that you refrain from using such tools when contributing to this project at this time. I will not knowingly accept any code that has been generated in such a manner.
