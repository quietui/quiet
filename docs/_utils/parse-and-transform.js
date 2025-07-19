import { parse } from 'node-html-parser';

/**
 * Parses an HTML string with node-html-parser and allows transforms to run before serializing back to HTML. This is
 * faster than parsing and serializing in each plugin.
 *
 * The transformer must return a function with a `doc` argument. The context of `this` is passed through from 11ty, so
 * you can hook into `this.page` and similar 11ty data points.
 *
 *  return function(doc) {
 *    //
 *    // Modify doc using the node-html-parser API: https://www.npmjs.com/package/node-html-parser
 *    //
 *    // The transformer MUST return a node-html-parser document.
 *    //
 *    return doc;
 *  }
 */
export function parseAndTransform(transformers = []) {
  return function (eleventyConfig) {
    eleventyConfig.addTransform('parse-and-transform', function (content) {
      let doc = parse(content, { blockTextElements: { code: true } });

      transformers.forEach(transformer => {
        doc = transformer.call(this, doc);
      });

      return doc.toString();
    });
  };
}
