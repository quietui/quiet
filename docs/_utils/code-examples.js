import { parse } from 'node-html-parser';
import { v4 as uuid } from 'uuid';

/**
 * Eleventy plugin to turn `<code class="example">` blocks into live examples.
 */
export function codeExamplesPlugin(options = {}) {
  options = {
    container: 'body',
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('code-examples', function (content) {
      const doc = parse(content, { blockTextElements: { code: true } });
      const container = doc.querySelector(options.container);

      if (!container) {
        return content;
      }

      // Look for external links
      container.querySelectorAll('code.example').forEach(code => {
        const pre = code.closest('pre');
        const isOpen = code.classList.contains('open');
        const noEdit = code.classList.contains('no-edit');
        const id = `code-example-${uuid().slice(-12)}`;
        let preview = pre.textContent;

        // Run preview scripts as modules to prevent collisions
        const root = parse(preview, { blockTextElements: { script: true } });
        root.querySelectorAll('script').forEach(script => script.setAttribute('type', 'module'));
        preview = root.toString();

        const codeExample = parse(`
          <div class="code-example ${isOpen ? 'open' : ''}">
            <div class="code-example-preview">
              ${preview}
            </div>
            <div class="code-example-source" id="${id}">
              ${pre.outerHTML}
            </div>
            <div class="code-example-buttons">
              <button
                class="code-example-toggle"
                type="button"
                aria-expanded="${isOpen ? 'true' : 'false'}"
                aria-controls="${id}"
              >
                Code
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </button>

              ${
                noEdit
                  ? ''
                  : `
                    <button class="code-example-pen" type="button">
                      Edit
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                        <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
                      </svg>
                    </button>
                  `
              }
            </div>
          </div>
        `);

        pre.replaceWith(codeExample);
      });

      return doc.toString();
    });
  };
}
