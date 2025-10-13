import { mkdir, writeFile } from 'fs/promises';
import lunr from 'lunr';
import { parse } from 'node-html-parser';
import { dirname, join } from 'path';

function collapseWhitespace(string) {
  return string.replace(/\s+/g, ' ');
}

/**
 * Eleventy plugin to build a Lunr search index.
 */
export function searchPlugin(options = {}) {
  options = {
    filename: '',
    selectorsToIgnore: [],
    getTitle: doc => (doc.querySelector('title')?.textContent ?? '').split('·')[0].trim(),
    getDescription: doc => doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    getHeadings: doc => [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(heading => heading.textContent ?? ''),
    getContent: doc => doc.querySelector('body')?.textContent ?? '',
    ...options
  };

  return function (eleventyConfig) {
    const pagesToSkip = [
      '/404.html', // permalinks use the extension
      '/purchase-complete/' // other URLs do not
    ];
    const pagesToIndex = [
      //
      // Let's add some some useful pages into the search
      //
      {
        title: 'Quiet UI on GitHub',
        description: 'View the source code, report a bug, and more!',
        url: 'https://github.com/quietui/quiet'
      },
      {
        title: 'Report a bug',
        description: `Found an issue? Report it here on GitHub.`,
        url: 'https://github.com/quietui/quiet/issues'
      },
      {
        title: 'Get help or ask a question',
        description: 'The discussion forum on GitHub is the best place to get support.',
        url: 'https://github.com/quietui/quiet/discussions'
      },
      {
        title: 'Star this project on GitHub',
        description: `It might be a silly metric, but it can't hurt.`,
        url: 'https://github.com/quietui/quiet/stargazers'
      },
      {
        title: 'Quiet UI on Bluesky',
        description: 'Follow the project on Bluesky.',
        url: 'https://bsky.app/profile/quietui.org'
      },
      {
        title: 'Quiet UI on Mastodon',
        description: 'Follow the project on Mastodon.',
        url: 'https://mastodon.social/@quietui'
      },
      {
        title: 'Quiet UI on X (Twitter)',
        description: 'Follow the project on the platform formerly known as Twitter.',
        url: 'https://x.com/quiet_ui'
      },
      {
        title: 'Cory LaViska on X (Twitter)',
        description: 'Follow the creator on the platform formerly known as Twitter.',
        url: 'https://x.com/claviska'
      }
    ];

    eleventyConfig.addTransform('search', function (content) {
      const doc = parse(content, {
        blockTextElements: {
          script: false,
          noscript: false,
          style: false,
          pre: false,
          code: false
        }
      });

      // Ignore skipped pages
      if (pagesToSkip.includes(this.page.url)) {
        return content;
      }

      // Remove content that shouldn't be searchable to reduce the index size
      options.selectorsToIgnore.forEach(selector => {
        doc.querySelectorAll(selector).forEach(el => el.remove());
      });

      pagesToIndex.push({
        title: collapseWhitespace(options.getTitle(doc)),
        description: collapseWhitespace(options.getDescription(doc)),
        headings: options.getHeadings(doc).map(collapseWhitespace),
        content: collapseWhitespace(options.getContent(doc)),
        url: this.page.url === '/' ? '/' : this.page.url.replace(/\/$/, '')
      });

      return content;
    });

    eleventyConfig.on('eleventy.after', async ({ dir }) => {
      const outputFilename = join(dir.output, 'search.json');
      const map = [];
      const searchIndex = lunr(function () {
        let index = 0;

        this.ref('id');
        this.field('t', { boost: 20 });
        this.field('h', { boost: 10 });
        this.field('c');

        for (const page of pagesToIndex) {
          this.add({ id: index, t: page.title, h: page.headings || page.description, c: page.content });
          map[index] = { title: page.title, description: page.description, url: page.url };
          index++;
        }
      });

      await mkdir(dirname(outputFilename), { recursive: true });
      await writeFile(outputFilename, JSON.stringify({ searchIndex, map }), 'utf-8');
    });
  };
}
