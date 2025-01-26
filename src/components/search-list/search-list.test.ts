import { expect, fixture, html } from '@open-wc/testing';
import type { QuietSearchList } from './search-list.js';

describe('<quiet-search-list>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSearchList>(html` <quiet-search-list></quiet-search-list> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
