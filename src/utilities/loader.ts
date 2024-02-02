import { getAssetPath } from './assets.js';

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        discoverElements(node as Element);
      }
    }
  }
});

/**
 * Registers an element by tag name.
 */
function register(tagName: string): Promise<void> {
  // If the element is already defined, there's nothing more to do
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }

  const tagWithoutPrefix = tagName.replace(/^quiet-/i, '');
  const path = getAssetPath(`components/${tagWithoutPrefix}/${tagWithoutPrefix}.js`);

  // Register it
  return new Promise((resolve, reject) => {
    import(path)
      .then(() => resolve())
      .catch(() => {
        reject(new Error(`Failed to load <${tagName}> from "${path}"`));
      });
  });
}

/**
 * Starts the autoloader and registers new Quiet elements as they appear in the DOM.
 */
export function startLoader() {
  // Initial discovery
  discoverElements(document.body);

  // Listen for new undefined elements
  observer.observe(document.documentElement, { subtree: true, childList: true });
}

/**
 * Stops the autoloader. Elements that have already been loaded will remain loaded.
 */
export function stopLoader() {
  observer.disconnect();
}

/**
 * Checks a node for undefined elements and attempts to register them.
 */
export async function discoverElements(root: Element | ShadowRoot) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : '';
  const rootIsQuietElement = rootTagName?.startsWith('quiet-');
  const tags = [...root.querySelectorAll(':not(:defined)')]
    .map(el => el.tagName.toLowerCase())
    .filter(tag => tag.startsWith('quiet-'));

  // If the root element is an undefined Quiet element, add it to the list
  if (rootIsQuietElement && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }

  // Make the list unique
  const tagsToRegister = [...new Set(tags)];
  const registered: string[] = [];
  const unknown: string[] = [];

  for await (const tagName of tagsToRegister) {
    try {
      await register(tagName);
      registered.push(tagName);
    } catch {
      unknown.push(tagName);
    }
  }

  //
  // Emit the 'quiet:discovery-complete' event for this batch of elements. The detail payload will include an object
  // with two arrays, one that tells which elements were registered and one that tells which were unknown (not found).
  //
  document.dispatchEvent(new CustomEvent('quiet:discovery-complete', { detail: { registered, unknown } }));
}
