import { expect, fixture, html } from '@open-wc/testing';
import type { QuietToggleTag } from './toggle-tag.js';

describe('<quiet-toggle-tag>', () => {
  it('does something', async () => {
    const el = await fixture<QuietToggleTag>(html` <quiet-toggle-tag></quiet-toggle-tag> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
