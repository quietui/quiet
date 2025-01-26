import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTab } from './tab.js';

describe('<quiet-tab>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTab>(html` <quiet-tab>Click me</quiet-tab> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
