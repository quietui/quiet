import { readFile } from 'fs/promises';
import { parse } from 'path';
import process from 'process';
import { analyticsPlugin } from './_utils/analytics.js';
import { anchorHeadingsPlugin } from './_utils/anchor-headings.js';
import { codeExamplesPlugin } from './_utils/code-examples.js';
import { copyCodePlugin } from './_utils/copy-code.js';
import { currentLink } from './_utils/current-link.js';
import { externalLinksPlugin } from './_utils/external-links.js';
import { formatCodePlugin } from './_utils/format-code.js';
import { highlightCodePlugin } from './_utils/highlight-code.js';
import { getComponents } from './_utils/manifest.js';
import { markdown } from './_utils/markdown.js';
import { outlinePlugin } from './_utils/outline.js';
import { replaceTextPlugin } from './_utils/replace-text.js';
import { searchPlugin } from './_utils/search.js';

const packageData = JSON.parse(await readFile('./package.json', 'utf-8'));
const isDeveloping = process.argv.includes('--develop');
const components = getComponents();

export default function (eleventyConfig) {
  // Add template data
  eleventyConfig.addGlobalData('package', packageData);
  eleventyConfig.addGlobalData('components', components);

  // Template filters - {{ content | filter }}
  eleventyConfig.addFilter('inlineMarkdown', content => {
    // Prevents the <void> type from making it's way into Prettier
    content = (content || '').replace(/<void>/g, '&lt;void&gt;');
    return markdown.renderInline(content || '');
  });
  eleventyConfig.addFilter('majorVersion', string => string.split('.')[0]);
  eleventyConfig.addFilter('markdown', content => markdown.render(content || ''));
  eleventyConfig.addFilter('tagNameToDisplayName', tagName => {
    let displayName = tagName
      .split('-')
      .slice(1)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (displayName === 'Qr') return 'QR';

    return displayName;
  });

  eleventyConfig.addFilter('stripExtension', string => parse(string).name);
  eleventyConfig.addFilter('stripQuietPrefix', content => content.replace(/^quiet-/, ''));
  eleventyConfig.addFilter('splitPipes', content => {
    // Trims whitespace and pipes from the start and end of a string and replaces them with a <br> tag. Useful for CEM
    // types, which are pipe-delimited. With Prettier 3, a leading pipe is added when the line wraps.
    if (typeof content === 'string') {
      return (
        content
          // Removing leading whitespace and pipes
          .replace(/^(\s|\|)/g, '')
          // Trim whitespace from remaining pipes
          .replace(/(\s|\|)$/g, '')
          // Replace pipes with <br> tags
          .replace(/\|/g, '<br>')
      );
    }

    return content;
  });

  // Shortcodes - {% shortCode arg1, arg2 %}
  eleventyConfig.addShortcode('cdnUrl', location => {
    return `https://cdn.jsdelivr.net/npm/@quietui/quiet@${packageData.version}/` + location.replace(/^\//, '');
  });

  // Helpers
  eleventyConfig.addNunjucksGlobal('getComponent', tagName => {
    const component = components.find(c => c.tagName === tagName);

    if (!component) {
      throw new Error(
        `Unable to find "<${tagName}>". Make sure the file name is the same as the tag name (without prefix).`
      );
    }
    return component;
  });

  // Use our own markdown instance
  eleventyConfig.setLibrary('md', markdown);

  // Add anchors to headings
  eleventyConfig.addPlugin(anchorHeadingsPlugin({ container: '#content' }));

  // Add an outline to the page
  eleventyConfig.addPlugin(
    outlinePlugin({
      container: '#content',
      target: '.outline-links',
      selector: 'h2, h3',
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
      },
      // Replace [breaking] with a badge
      {
        replace: /\[breaking\]/gs,
        replaceWith: '<quiet-badge variant="destructive"><quiet-icon name="urgent"></quiet-icon> breaking</quiet-badge>'
      },
      // Replace [experimental] with a badge
      {
        replace: /\[experimental\]/gs,
        replaceWith:
          '<quiet-badge class="experimental"><quiet-icon name="bulb"></quiet-icon> experimental</quiet-badge>'
      },
      // Replace [stable] with a badge
      {
        replace: /\[stable\]/gs,
        replaceWith: '<quiet-badge variant="primary"><quiet-icon name="checks"></quiet-icon> stable</quiet-badge>'
      },
      // Replace [form] with a badge
      {
        replace: /\[form\]/gs,
        replaceWith: '<quiet-badge title="Form associated"><quiet-icon name="forms"></quiet-icon></quiet-badge>'
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

  // Production-only plugins
  if (!isDeveloping) {
    // Run Prettier on each file (prod only because it can be slow)
    eleventyConfig.addPlugin(formatCodePlugin());

    // Add privacy-friendly analytics
    eleventyConfig.addPlugin(analyticsPlugin({ domain: 'quietui.org' }));
  }

  return {
    dir: {
      includes: '_includes',
      layouts: '_layouts'
    },
    templateFormats: ['njk', 'md']
  };
}
