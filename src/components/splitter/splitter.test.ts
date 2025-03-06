import { expect, fixture, html } from '@open-wc/testing';
import type { QuietSplitter } from './splitter.js';

describe('<quiet-splitter>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSplitter>(html` <quiet-splitter></quiet-splitter> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
