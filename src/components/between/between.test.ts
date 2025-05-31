import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBetween } from './between.js';

describe('<quiet-between>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBetween>(html` <quiet-between></quiet-between> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
