import { markdown } from './_utils/markdown.js';
import { highlightCodePlugin } from './_utils/highlight-code.js';
import { formatCodePlugin } from './_utils/format-code.js';
import { externalLinksPlugin } from './_utils/external-links.js';
import process from 'process';

const isDeveloping = process.argv.includes('--develop');

export default function (eleventyConfig) {
  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'default.njk');

  // Use our own markdown instance
  eleventyConfig.setLibrary('md', markdown);

  // Highlight code blocks with Prism
  eleventyConfig.addPlugin(highlightCodePlugin);

  // Add icons and attributes to external links
  eleventyConfig.addPlugin(externalLinksPlugin);

  // Run Prettier on each file (prod only because it can be slow)
  if (!isDeveloping) {
    eleventyConfig.addPlugin(formatCodePlugin);
  }

  return {
    dir: {
      includes: '_includes',
      layouts: '_layouts'
    },
    templateFormats: ['njk', 'md']
  };
}
