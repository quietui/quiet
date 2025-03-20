import { expect, fixture, html } from '@open-wc/testing';
import type { QuietListbox } from './listbox.js';

describe('<quiet-listbox>', () => {
  it('does something', async () => {
    const el = await fixture<QuietListbox>(html` <quiet-listbox></quiet-listbox> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
