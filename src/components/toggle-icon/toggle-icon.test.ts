import { expect, fixture, html } from '@open-wc/testing';
import type { QuietToggleIcon } from './toggle-icon.js';

describe('<quiet-toggle-icon>', () => {
  it('does something', async () => {
    const el = await fixture<QuietToggleIcon>(html` <quiet-toggle-icon></quiet-toggle-icon> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
