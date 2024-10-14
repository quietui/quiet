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

/** Returns the "text content" of a slot element. */
export function getSlotText(slot: HTMLSlotElement | undefined | null): string {
  if (!slot) {
    return '';
  }

  const nodes = slot.assignedNodes({ flatten: true });
  const extractText = (nodesArray: Node[]) => {
    let text = '';
    nodesArray.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // If it's a text node, add its content
        text += node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).hasChildNodes()) {
        // If it's an element node, check for child text nodes
        text += extractText(Array.from(node.childNodes));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // For elements without children, get their textContent
        text += (node as HTMLElement).textContent || '';
      }
    });

    return text;
  };

  return extractText(nodes).trim();
}
