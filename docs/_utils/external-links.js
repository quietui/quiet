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
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>`;

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
            // Get the current inner HTML and split into words
            const textContent = a.textContent.trim();
            const words = textContent.split(/\s+/);

            if (words.length > 0) {
              // Take all words except the last one
              const textBeforeLast = words.slice(0, -1).join(' ');
              const lastWord = words[words.length - 1];

              // Create the new HTML structure
              a.innerHTML = `
                ${textBeforeLast ? textBeforeLast + ' ' : ''}
                <span>${lastWord}${svg}</span>
              `.trim();
            } else {
              // If no words, just add the SVG in a nowrap span
              a.innerHTML = `
                <span>${svg}</span>
              `.trim();
            }
          }
        }
      });

      return doc.toString();
    });
  };
}
