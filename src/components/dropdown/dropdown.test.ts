import { expect, fixture, html } from '@open-wc/testing';
import type { QuietDropdown } from './dropdown.js';

describe('<quiet-dropdown>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDropdown>(html` <quiet-dropdown>Click me</quiet-dropdown> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
