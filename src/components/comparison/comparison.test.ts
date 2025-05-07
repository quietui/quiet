import { expect, fixture, html } from '@open-wc/testing';
import type { QuietComparison } from './comparison.js';

describe('<quiet-comparison>', () => {
  it('does something', async () => {
    const el = await fixture<QuietComparison>(html` <quiet-comparison></quiet-comparison> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
