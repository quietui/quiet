import { expect, fixture, html } from '@open-wc/testing';
import type { QuietPagination } from './pagination.js';

describe('<quiet-pagination>', () => {
  it('does something', async () => {
    const el = await fixture<QuietPagination>(html` <quiet-pagination></quiet-pagination> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
