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
      // Snippet from https://plausible.io/docs/script-extensions
      return content.replace(
        '</head>',
        `
            <script defer data-domain="${options.domain}" src="https://plausible.io/js/script.manual.js"></script>
            <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>
            <script>
              document.addEventListener('turbo:load', function() {
                if (location.hostname === '${options.domain}') {
                  plausible('pageview');
                }
              });
            </script>
          </head>
        `
      );
    });
  };
}
