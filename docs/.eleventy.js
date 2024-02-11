import { parse } from 'path';
import { markdown } from './_utils/markdown.js';
import { anchorHeadingsPlugin } from './_utils/anchor-headings.js';
import { codeExamplesPlugin } from './_utils/code-examples.js';
import { copyCodePlugin } from './_utils/copy-code.js';
import { currentLink } from './_utils/current-link.js';
import { highlightCodePlugin } from './_utils/highlight-code.js';
import { formatCodePlugin } from './_utils/format-code.js';
import { externalLinksPlugin } from './_utils/external-links.js';
import { replaceTextPlugin } from './_utils/replace-text.js';
import { searchPlugin } from './_utils/search.js';
import { readFile } from 'fs/promises';
import { outlinePlugin } from './_utils/outline.js';
import process from 'process';

const packageData = JSON.parse(await readFile('./package.json', 'utf-8'));
const isDeveloping = process.argv.includes('--develop');

export default function (eleventyConfig) {
  // Add template data
  eleventyConfig.addGlobalData('package', packageData);

  // Template filters
  eleventyConfig.addFilter('stripExtension', string => parse(string).name);

  // Use our own markdown instance
  eleventyConfig.setLibrary('md', markdown);

  // Add anchors to headings
  eleventyConfig.addPlugin(anchorHeadingsPlugin({ container: '#content' }));

  // Add an outline to the page
  eleventyConfig.addPlugin(
    outlinePlugin({
      container: '#content',
      target: '.outline-links',
      selector: 'h2',
      ifEmpty: doc => {
        doc.querySelector('#outline')?.remove();
      }
    })
  );

  // Add current link classes
  eleventyConfig.addPlugin(currentLink());

  // Add icons and attributes to external links
  eleventyConfig.addPlugin(externalLinksPlugin());

  // Add code examples for `<code class="example">` blocks
  eleventyConfig.addPlugin(codeExamplesPlugin());

  // Highlight code blocks with Prism
  eleventyConfig.addPlugin(highlightCodePlugin());

  // Add copy code buttons to code blocks
  eleventyConfig.addPlugin(copyCodePlugin());

  // Various text replacements
  eleventyConfig.addPlugin(
    replaceTextPlugin([
      // Replace [issue:1234] with a link to the issue on GitHub
      {
        replace: /\[pr:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/quietui/quiet/pull/$1">#$1</a>'
      },
      // Replace [pr:1234] with a link to the pull request on GitHub
      {
        replace: /\[issue:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/quietui/quiet/issues/$1">#$1</a>'
      },
      // Replace [discuss:1234] with a link to the discussion on GitHub
      {
        replace: /\[discuss:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/quietui/quiet/discussions/$1">#$1</a>'
      }
    ])
  );

  // Build the search index
  eleventyConfig.addPlugin(
    searchPlugin({
      filename: '',
      selectorsToIgnore: ['code.example'],
      getContent: doc => doc.querySelector('#content')?.textContent ?? ''
    })
  );

  // Run Prettier on each file (prod only because it can be slow)
  if (!isDeveloping) {
    eleventyConfig.addPlugin(formatCodePlugin());
  }

  return {
    dir: {
      includes: '_includes',
      layouts: '_layouts'
    },
    templateFormats: ['njk', 'md']
  };
}
