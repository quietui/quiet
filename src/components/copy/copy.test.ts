import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCopy } from './copy.js';

describe('<quiet-copy>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCopy>(html` <quiet-copy>Click me</quiet-copy> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
