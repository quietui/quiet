import { expect, fixture, html } from '@open-wc/testing';
import type { QuietEmptyState } from './empty-state.js';

describe('<quiet-empty-state>', () => {
  it('does something', async () => {
    const el = await fixture<QuietEmptyState>(html` <quiet-empty-state></quiet-empty-state> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
