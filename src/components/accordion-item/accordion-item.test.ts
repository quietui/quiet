import { expect, fixture, html } from '@open-wc/testing';
import type { QuietAccordionItem } from './accordion-item.js';

describe('<quiet-accordion-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietAccordionItem>(html` <quiet-accordion-item></quiet-accordion-item> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
