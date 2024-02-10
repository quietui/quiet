import { parse } from 'node-html-parser';
import { v4 as uuid } from 'uuid';
import slugify from 'slugify';

function createSlug(text) {
  return slugify(String(text), {
    remove: /[^\w|\s]/g,
    lower: true
  });
}

/**
 * Eleventy plugin to add anchors to headings to content.
 */
export function anchorHeadingsPlugin(options = {}) {
  options = {
    container: 'body',
    headingSelector: 'h2, h3, h4, h5, h6',
    anchorLabel: 'Jump to heading',
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('anchor-headings', function (content) {
      const doc = parse(content);
      const container = doc.querySelector(options.container);

      if (!container) {
        return container;
      }

      // Look for headings
      container.querySelectorAll(options.headingSelector).forEach(heading => {
        const hasAnchor = heading.querySelector('a');
        const slug = createSlug(heading.textContent ?? '') ?? uuid().slice(-12);
        let id = slug;
        let suffix = 0;

        // Make sure the slug is unique in the document
        while (doc.getElementById(id) !== null) {
          id = `${slug}-${++suffix}`;
        }

        if (hasAnchor || !id) {
          return;
        }

        // Create the anchor
        const anchor = parse(`
          <a href="#${encodeURIComponent(id)}">
            <span class="sr-only"></span>
            <span aria-hidden="true">#</span>
          </a>
        `);
        anchor.querySelector('.sr-only').textContent = options.anchorLabel;

        // Update the heading
        heading.setAttribute('id', id);
        heading.classList.add('anchor-heading');
        heading.appendChild(anchor);
      });

      return doc.toString();
    });
  };
}
