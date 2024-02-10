import { parse } from 'node-html-parser';

/**
 * Eleventy plugin to decorate external links.
 */
export function externalLinksPlugin(options = {}) {
  options = {
    container: 'body',
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('external-links', function (content) {
      const doc = parse(content);
      const container = doc.querySelector(options.container);

      if (!container) {
        return content;
      }

      // Look for external links
      doc.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href') || '';
        const isExternal = /^https?:\/\//i.test(href);
        const noIcon = a.hasAttribute('data-no-external-icon');

        if (isExternal) {
          a.classList.add('external');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('target', '_blank');

          // Append the icon
          if (noIcon) {
            a.removeAttribute('data-no-external-icon');
          } else {
            a.innerHTML += `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
              </svg>
            `.trim();
          }
        }
      });

      return doc.toString();
    });
  };
}
