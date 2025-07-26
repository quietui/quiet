import { parse } from 'node-html-parser';

/**
 * Transformer to add an outline (table of contents) to the page. Headings must have an id, otherwise they won't be
 * included in the outline. An unordered list containing links will be appended to the target element.
 *
 * If no headings are found for the outline, the `ifEmpty()` function will be called with a `node-html-parser` object as
 * the first argument. This can be used to toggle classes or remove elements when the outline is empty.
 *
 * See the `node-html-parser` docs for more details: https://www.npmjs.com/package/node-html-parser
 */
export function outlineTransformer(options = {}) {
  options = {
    container: 'body',
    target: '.outline',
    selector: 'h2,h3',
    ifEmpty: _doc => null,
    ...options
  };

  return function (doc) {
    const container = doc.querySelector(options.container);
    const ul = parse('<ul></ul>');
    let numLinks = 0;

    if (!container) {
      return doc;
    }

    container.querySelectorAll(options.selector).forEach(heading => {
      const id = heading.getAttribute('id');
      const level = heading.tagName.slice(1);
      const clone = parse(heading.outerHTML);

      // Skip headings with data-no-outline
      if (heading.closest('[data-no-outline]')) {
        return doc;
      }

      // Create a clone of the heading so we can remove links and [data-no-outline] elements from the text content
      clone.querySelectorAll('a').forEach(a => a.remove());
      clone.querySelectorAll('[data-no-outline]').forEach(el => el.remove());

      // Generate the link
      const li = parse(`<li data-level="${level}"><a></a></li>`);
      const a = li.querySelector('a');
      a.setAttribute('href', `#${encodeURIComponent(id)}`);
      a.textContent = clone.textContent.trim().replace(/#$/, '');
      a.textContent = a.textContent.replace(/\[(stable|experimental|breaking)\]/g, '');

      // Add it to the list
      ul.firstChild.appendChild(li);
      numLinks++;
    });

    if (numLinks > 0) {
      // Append the list to all matching targets
      doc.querySelectorAll(options.target).forEach(target => {
        target.appendChild(parse(ul.outerHTML));
      });
    } else {
      // Remove if empty
      options.ifEmpty(doc);
    }

    return doc;
  };
}
