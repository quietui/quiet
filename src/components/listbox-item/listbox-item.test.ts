import { expect, fixture, html } from '@open-wc/testing';
import type { QuietListboxItem } from './listbox-item.js';

describe('<quiet-listbox-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietListboxItem>(html` <quiet-listbox-item></quiet-listbox-item> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
