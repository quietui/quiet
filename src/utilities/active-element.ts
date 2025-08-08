/**
 * Generator that yields all active elements in the DOM tree, traversing through open shadow DOM boundaries. The last
 * element returned is the "deepest" active element. To fetch the deepest active element, use
 * `[...activeElements()].pop()`.
 */
export function* activeElements(activeElement: Element | null = document.activeElement): Generator<Element> {
  if (activeElement === null || activeElement === undefined) return;

  yield activeElement;

  if ('shadowRoot' in activeElement && activeElement.shadowRoot && activeElement.shadowRoot.mode !== 'closed') {
    yield* activeElements(activeElement.shadowRoot.activeElement);
  }
}
