import { getLibraryPath } from './library.js';

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
  const path = getLibraryPath(`components/${tagWithoutPrefix}/${tagWithoutPrefix}.js`);

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

  // Get a list of elements to preload from all `data-quiet-preload` attributes on the page
  const tagsToPreload = [...document.querySelectorAll('[data-quiet-preload]')]
    .map(el => el.getAttribute('data-quiet-preload') || '')
    .flatMap(attr => attr.split(' '))
    .filter(tag => tag.length > 0);

  const tagsOnPage = [...root.querySelectorAll(':not(:defined)')]
    .map(el => el.tagName.toLowerCase())
    .filter(tag => tag.startsWith('quiet-'));

  // If the root element is an undefined Quiet element, add it to the list
  if (rootIsQuietElement && !customElements.get(rootTagName)) {
    tagsOnPage.push(rootTagName);
  }

  // Get a unique list of all tags to register
  const tagsToRegister = [...new Set(tagsOnPage.concat(tagsToPreload))];
  const registered: string[] = [];
  const unknown: string[] = [];

  if (tagsToRegister.length === 0) {
    return;
  }

  for await (const tagName of tagsToRegister) {
    try {
      await register(tagName);
      registered.push(tagName);
    } catch {
      unknown.push(tagName);
    }
  }

  // Wait a cycle for initial component updates to complete
  await new Promise(requestAnimationFrame);

  //
  // Emit the 'quiet-discovery-complete' event for this batch of elements. The detail payload will include an object
  // with an array of elements that were registered and an array of unknown elements (i.e. not found).
  //
  root.dispatchEvent(
    new CustomEvent('quiet-discovery-complete', {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: { registered, unknown }
    })
  );
}

/**
 * Many multi-page applications (MPAs) use Hotwire: Turbo to provide a SPA-like experience for users. When visiting
 * links, Turbo intercepts the click, fetches the new page, and updates metadata and content without redirecting,
 * resulting in a buttery smooth transition when going from one page to another.
 *
 * However, when you use Turbo with Quiet's autoloader, you may see FOUCE when visiting new pages for the first time.
 * This is because Turbo renders the new page and _then_ the autoloader fetches unregistered components.
 *
 * To solve that, this function adds a listener that hooks into Turbo's `turbo:before-render` event and registers all
 * components before the new page is rendered, effectively eliminating FOUCE for page-to-page navigation.
 *
 * The function comes with a configurable timeout to prevent issues with errors or slow networks. For most use cases,
 * the default value of 2000ms is optimal.
 */
export function preventTurboFouce(timeout = 2000) {
  document.addEventListener('turbo:before-render', async (event: CustomEvent) => {
    const newBody = event.detail.newBody;

    event.preventDefault();

    try {
      // Wait until all elements are registered or two seconds, whichever comes first
      await Promise.race([discoverElements(newBody), new Promise(resolve => setTimeout(resolve, timeout))]);
    } finally {
      event.detail.resume();
    }
  });
}
