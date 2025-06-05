---
title: Using AI with Quiet
description: Leverage Quiet UI's component documentation with AI assistants for smarter workflows.
layout: docs
---

To streamline development with AI, a _component reference file_ is available for use with [LLMs](https://en.wikipedia.org/wiki/Large_language_model). This file offers a complete breakdown of Quiet's components, making it easy to get quick, accurate help from your AI assistant.

The component reference file is a plain-text document that describes every Quiet UI component in detail and provides links to additional resources. The file follows the [`llms.txt` proposal](https://llmstxt.org/).

If you just want to explore it, you can access the file online at [quietui.org/dist/llms.txt](https://quietui.org/dist/llms.txt). If you've installed Quiet using npm, it will be located at:

```
node_modules/@quietui/quiet/dist/llms.txt
```

If you're building the project locally, the file will be generated at build time and placed in:

```
/dist/llms.txt
```

## Using the file with AI assistants

AI-powered coding tools can interpret `llms.txt` to deliver tailored suggestions, code snippets, and answers based on Quiet UI's capabilities. Here's how to make the most of it:

### Provide the file to the LLM

Depending on the tool, options include:

- **Uploading the file:** many assistants support uploading text files directly. Submit the `llms.txt` file.
- **Copying and pasting:** open the `llms.txt` file and paste its contents into the assistant's input area.
- **Pointing to the file:** some tools can scan files. Direct these tools to the file on your local drive.

The file serves as a comprehensive reference, offering an overview of all components and their detailed APIs to help the assistant recommend the best one for the job.

### Ask high-level questions

Once the file is loaded, broad questions can be posed, such as:

- "What components does Quiet UI offer for navigation?"
- "How can a `<quiet-button>` be styled with custom colors?"
- "Which Quiet UI components support form validation?"

The assistant will draw from the reference data to provide accurate responses.

### Generate code examples

For quick snippets, try prompts like:

- "Show how to use `<quiet-card>` with a custom header slot."
- "Write HTML for a `<quiet-button>` that triggers an alert on click."
- "How can I listen for the change event from `<quiet-slider>`?"

The detailed properties, methods, and events in the file ensure responses match Quiet's API.

### Troubleshoot and explore

If something isn't working, share code and ask:

- "Why isn't `<quiet-text-field>` validating?"
- "How does the value property work in `<quiet-select>`?"

Advanced features can also be explored:

- "What CSS parts can be targeted in `<quiet-button>`?"
- "How does the `getValueAs()` method work in `<quiet-color-picker>`?"

The file equips the assistant with the context needed to assist with debugging.

<img class="whiskers-center" src="/assets/images/whiskers/with-robot.svg" alt="Whiskers the mouse watching a robot juggle toy bricks">