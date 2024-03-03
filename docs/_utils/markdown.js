import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItContainer from 'markdown-it-container';
import markdownItIns from 'markdown-it-ins';
import markdownItKbd from 'markdown-it-kbd';
import markdownItMark from 'markdown-it-mark';

const icons = {
  info: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-click"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/></svg>
  `,
  danger: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
  `
};

/**
 * A custom Markdown It instance with added features.
 */
export const markdown = MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false
});

markdown.use(markdownItIns);
markdown.use(markdownItKbd);
markdown.use(markdownItMark);

['info', 'danger'].forEach(type => {
  markdown.use(markdownItContainer, type, {
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `
          <div role="alert" class="callout callout-${type}">
            ${icons[type]}
            <div class="callout-content">
        `;
      }
      return '</div></div>\n';
    }
  });
});

markdown.use(markdownItContainer, 'aside', {
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `<aside>`;
    }
    return '</aside>\n';
  }
});

markdown.use(markdownItContainer, 'details', {
  validate: params => params.trim().match(/^details\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return `<details>\n<summary><span>${markdown.utils.escapeHtml(m[1])}</span></summary>\n`;
    }
    return '</details>\n';
  }
});

markdown.use(markdownItAttrs, {
  allowedAttributes: ['id', 'class', 'data']
});
