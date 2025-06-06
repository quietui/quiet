import { expect, fixture, html } from '@open-wc/testing';
import type { QuietInfiniteScroller } from './infinite-scroller.js';

describe('<quiet-infinite-scroller>', () => {
  it('does something', async () => {
    const el = await fixture<QuietInfiniteScroller>(html` <quiet-infinite-scroller></quiet-infinite-scroller> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
