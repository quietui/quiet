import { parse } from 'node-html-parser';

/**
 * Transformer to decorate external links.
 */
export function externalLinksTransformer(options = {}) {
  options = {
    container: 'body',
    ...options
  };

  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return doc;
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
          `.trim();
        }
      }
    });

    return doc;
  };
}
