import { expect, fixture, html } from '@open-wc/testing';
import type { QuietRandomContent } from './random-content.js';

describe('<quiet-random-content>', () => {
  it('does something', async () => {
    const el = await fixture<QuietRandomContent>(html` <quiet-random-content></quiet-random-content> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
