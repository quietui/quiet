import { expect, fixture, html } from '@open-wc/testing';
import type { QuietComboboxItem } from './combobox-item.js';

describe('<quiet-combobox-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietComboboxItem>(html` <quiet-combobox-item></quiet-combobox-item> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
