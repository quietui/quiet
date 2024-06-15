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
        const hasButtons = !code.classList.contains('no-buttons');
        const isOpen = code.classList.contains('open') || !hasButtons;
        const noEdit = code.classList.contains('no-edit');
        const noDir = code.classList.contains('no-dir');
        const id = `code-example-${uuid().slice(-12)}`;
        const previewClasses = [...code.classList.values()]
          // Add presentational helper classes to the preview container, prefixed with code-example-
          .filter(className => !(className === 'example' || className.startsWith('language-')))
          .map(className => `code-example-${className}`)
          .join(' ');
        let preview = pre.textContent;

        // Run preview scripts as modules to prevent collisions
        const root = parse(preview, { blockTextElements: { script: true } });
        root.querySelectorAll('script').forEach(script => script.setAttribute('type', 'module'));
        preview = root.toString();

        const codeExample = parse(`
          <div class="code-example ${isOpen ? 'open' : ''}">
            <div class="code-example-preview ${previewClasses}">
              ${preview}
            </div>
            <div class="code-example-source" id="${id}">
              ${pre.outerHTML}
            </div>
            ${
              hasButtons
                ? `
                <div class="code-example-buttons">
                  <button
                    class="code-example-toggle"
                    type="button"
                    aria-expanded="${isOpen ? 'true' : 'false'}"
                    aria-controls="${id}"
                  >
                    Code
                    <quiet-icon name="chevron-down"></quiet-icon>
                  </button>

                  ${
                    noEdit
                      ? ''
                      : `
                        <button class="code-example-pen" type="button">
                          Edit
                          <quiet-icon name="external-link"></quiet-icon>
                        </button>
                      `
                  }

                  ${
                    noDir
                      ? ''
                      : `
                        <button class="code-example-dir" type="button">
                          <quiet-icon label="Change direction to LTR" name="text-direction-ltr"></quiet-icon>
                          <quiet-icon label="Change direction to RTL" name="text-direction-rtl"></quiet-icon>
                        </button>
                      `
                  }
                `
                : ''
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
