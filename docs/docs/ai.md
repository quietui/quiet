---
title: Using AI with Quiet
description: Leverage Quiet UI's component documentation with AI assistants for smarter workflows.
layout: docs
---

<img class="whiskers-end" src="/assets/images/whiskers/thinking.svg" alt="Whiskers the mouse pondering">

To streamline development with AI, a set of _component reference files_ are available for use with [LLMs](https://en.wikipedia.org/wiki/Large_language_model). These files offer a complete breakdown of Quiet's components, making it easy to get quick, accurate help from your AI assistant.

Component reference files are a collection of plain-text documents that describe every Quiet UI component in detail. An `index.txt` file lists all available components while individual `.txt` files (e.g., `button.txt`, `card.txt`, etc.) provide an in-depth look at each component's features.

## Where are the files located?

The component reference files are available in the `dist/llm` directory of the project. If you've installed Quiet using npm, they will mostly likely be in:

```
node_modules/@quietui/quiet/dist/llm
```

The structure of the `dist/llm` folder is as follows:

- `dist/llm/index.txt`: A list of all available components, including descriptions.
- `dist/llm/[name].txt`: Individual component reference files with API info, where `[name]` is the component's name, e.g. "avatar", "button", "callout", etc.

## How do I use the files with AI assistants?

AI-powered coding tools can interpret these reference files to deliver tailored suggestions, code snippets, and answers based on Quiet UI's capabilities. Here's how to make the most of them:

### Provide the files to the LLM

Depending on the tool, options include:

- **Uploading the files:** Many assistants support uploading text files directly. Submit the `index.txt` and any component-specific `.txt` files relevant to the task.
- **Copying and pasting:** Open a file (e.g., `button.txt`) and paste its contents into the assistant's input area.
- **Pointing to the directory:** Some tools can scan a folder. Direct these tools to your project's `dist/llm` folder to let it explore.

The `index.txt` file serves as an excellent starting point, offering an overview of all components to help the assistant recommend the best one for the job.

### Ask high-level questions

Once the relevant files are loaded, broad questions can be posed, such as:

- "What components does Quiet UI offer for navigation?"
- "How can a `<quiet-button>` be styled with custom colors?"
- "Which Quiet UI components support form validation?"

The assistant will draw from the reference data to provide accurate responses.

### Generate code examples

For quick snippets, try prompts like:

- "Show how to use `<quiet-card>` with a custom header slot."
- "Write HTML for a `<quiet-button>` that triggers an alert on click."
- "How can I listen for the change event from `<quiet-slider>`?"

The detailed properties, methods, and events in the files ensure responses match Quiet's API.

### Troubleshoot and explore

If something isn't working, share code and ask:

- "Why isn't `<quiet-input>` validating?"
- "How does the value property work on `<quiet-select>`?"

Advanced features can also be explored:

- "What CSS parts can be targeted in `<quiet-button>`?"
- "How does the `getValueAs()` method work in `<quiet-color-picker>`?"

The files equip the assistant with the context needed to assist with debugging or deeper dives.

