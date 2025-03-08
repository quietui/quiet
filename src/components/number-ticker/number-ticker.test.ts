import { expect, fixture, html } from '@open-wc/testing';
import type { QuietNumberTicker } from './number-ticker.js';

describe('<quiet-number-ticker>', () => {
  it('does something', async () => {
    const el = await fixture<QuietNumberTicker>(html` <quiet-number-ticker></quiet-number-ticker> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
