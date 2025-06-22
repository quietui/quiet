import { expect, fixture, html } from '@open-wc/testing';
import type { QuietAccordion } from './accordion.js';

describe('<quiet-accordion>', () => {
  it('does something', async () => {
    const el = await fixture<QuietAccordion>(html` <quiet-accordion></quiet-accordion> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
