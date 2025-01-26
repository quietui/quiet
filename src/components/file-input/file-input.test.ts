import { expect, fixture, html } from '@open-wc/testing';
import type { QuietFileInput } from './file-input.js';

describe('<quiet-file-input>', () => {
  it('does something', async () => {
    const el = await fixture<QuietFileInput>(html` <quiet-file-input>Click me</quiet-file-input> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
