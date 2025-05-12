import { expect, fixture, html } from '@open-wc/testing';
import type { QuietExpander } from './expander.js';

describe('<quiet-expander>', () => {
  it('does something', async () => {
    const el = await fixture<QuietExpander>(html` <quiet-expander></quiet-expander> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
