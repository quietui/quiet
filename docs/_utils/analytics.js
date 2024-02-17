/**
 * Eleventy plugin to inject privacy-friendly analytics code into each page.
 */
export function analyticsPlugin(options = {}) {
  options = {
    domain: '',
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('analytics', function (content) {
      return content.replace(
        '</head>',
        `
          <script defer data-domain="${options.domain}" src="https://plausible.io/js/script.js"></script>
          </head>
        `
      );
    });
  };
}
