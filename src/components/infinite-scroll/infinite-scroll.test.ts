import { expect, fixture, html } from '@open-wc/testing';
import type { QuietInfiniteScroll } from './infinite-scroll.js';

describe('<quiet-infinite-scroll>', () => {
  it('does something', async () => {
    const el = await fixture<QuietInfiniteScroll>(html` <quiet-infinite-scroll></quiet-infinite-scroll> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
