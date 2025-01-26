import { expect, fixture, html } from '@open-wc/testing';
import type { QuietFitText } from './fit-text.js';

describe('<quiet-fit-text>', () => {
  it('does something', async () => {
    const el = await fixture<QuietFitText>(html` <quiet-fit-text>Click me</quiet-fit-text> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
