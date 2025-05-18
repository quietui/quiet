import { expect, fixture, html } from '@open-wc/testing';
import type { QuietResizeObserver } from './resize-observer.js';

describe('<quiet-resize-observer>', () => {
  it('does something', async () => {
    const el = await fixture<QuietResizeObserver>(html` <quiet-resize-observer></quiet-resize-observer> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
