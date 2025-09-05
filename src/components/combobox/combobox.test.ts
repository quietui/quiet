import { expect, fixture, html } from '@open-wc/testing';
import type { QuietCombobox } from './combobox.js';

describe('<quiet-combobox>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCombobox>(html` <quiet-combobox></quiet-combobox> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
