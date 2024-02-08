import { markdown } from './_utils/markdown.js';
import { codeExamplesPlugin } from './_utils/code-examples.js';
import { highlightCodePlugin } from './_utils/highlight-code.js';
import { formatCodePlugin } from './_utils/format-code.js';
import { externalLinksPlugin } from './_utils/external-links.js';
import { readFile } from 'fs/promises';
import process from 'process';

const packageData = JSON.parse(await readFile('./package.json', 'utf-8'));
const isDeveloping = process.argv.includes('--develop');

export default function (eleventyConfig) {
  // Add package data (mostly for version)
  eleventyConfig.addGlobalData('package', packageData);

  // Set the default section
  eleventyConfig.addGlobalData('section', 'docs');

  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'default.njk');

  // Use our own markdown instance
  eleventyConfig.setLibrary('md', markdown);

  // Add icons and attributes to external links
  eleventyConfig.addPlugin(externalLinksPlugin);

  // Add code examples for `<code class="example">` blocks
  eleventyConfig.addPlugin(codeExamplesPlugin);

  // Highlight code blocks with Prism
  eleventyConfig.addPlugin(highlightCodePlugin);

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
