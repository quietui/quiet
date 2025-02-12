import { expect, fixture, html } from '@open-wc/testing';
import type { QuietColorInput } from './color-input.js';

describe('<quiet-color-input>', () => {
  it('does something', async () => {
    const el = await fixture<QuietColorInput>(html` <quiet-color-input></quiet-color-input> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
