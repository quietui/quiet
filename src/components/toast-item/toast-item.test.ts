import { expect, fixture, html } from '@open-wc/testing';
import type { QuietToastItem } from './toast-item.js';

describe('<quiet-toast-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietToastItem>(html` <quiet-toast-item></quiet-toast-item> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
