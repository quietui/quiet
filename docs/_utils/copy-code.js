/**
 * Transformer to add copy buttons to code blocks.
 */
export function copyCodeTransformer(options = {}) {
  options = {
    container: 'body',
    ...options
  };

  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return;
    }

    // Look for code blocks
    container.querySelectorAll('pre > code').forEach(code => {
      const pre = code.closest('pre');

      // Add a copy button (we set the copy data at runtime to reduce page bloat)
      pre.innerHTML += `<quiet-copy class="copy-button"></quiet-copy>`;
    });

    return doc;
  };
}
