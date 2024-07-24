/** Returns the "inner HTML" of a slot element. */
export function getSlotHtml(slot: HTMLSlotElement): string {
  const nodes = slot.assignedNodes({ flatten: true });
  let innerHtml = '';

  [...nodes].forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      innerHtml += (node as HTMLElement).outerHTML;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      innerHtml += node.textContent;
    }
  });

  return innerHtml;
}
