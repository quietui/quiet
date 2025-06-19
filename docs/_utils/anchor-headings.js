import { parse } from 'node-html-parser';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';

function createId(text) {
  let slug = slugify(String(text), {
    lower: true,
    remove: /[^\w|\s|\.]/g // allow dots
  }).replace(/\./g, '_'); // convert dots to _

  // IDs must start with a letter
  if (!/^[a-z]/i.test(slug)) {
    slug = `quiet_${slug}`;
  }

  return slug;
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
        return content;
      }

      // Look for headings
      container.querySelectorAll(options.headingSelector).forEach(heading => {
        const hasAnchor = heading.querySelector('a');
        const clone = parse(heading.outerHTML);

        // Ignore headings that have the data-no-anchor attribute
        if (heading.hasAttribute('data-no-anchor')) {
          heading.removeAttribute('data-no-anchor');
          return;
        }

        // Create a clone of the heading so we can remove [data-no-anchor] elements from the text content
        clone.querySelectorAll('[data-no-anchor]').forEach(el => el.remove());

        let slug = createId(clone.textContent ?? '') ?? uuid().slice(-12);
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
            <span class="quiet-vh"></span>
            <span aria-hidden="true">#</span>
          </a>
        `);
        anchor.querySelector('.quiet-vh').textContent = options.anchorLabel;

        // Update the heading
        heading.setAttribute('id', id);
        heading.classList.add('anchor-heading');
        heading.appendChild(anchor);
      });

      return doc.toString();
    });
  };
}
