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
                <quiet-icon name="chevron-down" family="micro"></quiet-icon>
              </button>

              ${
                noEdit
                  ? ''
                  : `
                    <button class="code-example-pen" type="button">
                      Edit
                      <quiet-icon name="arrow-top-right-on-square" family="micro"></quiet-icon>
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
