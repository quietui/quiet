import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTabPanel } from './tab-panel.js';

describe('<quiet-tab-panel>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTabPanel>(html` <quiet-tab-panel>Click me</quiet-tab-panel> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
