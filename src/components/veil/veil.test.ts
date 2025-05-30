import { expect, fixture, html } from '@open-wc/testing';
import type { QuietVeil } from './veil.js';

describe('<quiet-veil>', () => {
  it('does something', async () => {
    const el = await fixture<QuietVeil>(html` <quiet-veil></quiet-veil> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
