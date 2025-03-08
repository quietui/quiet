import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTypewriter } from './typewriter.js';

describe('<quiet-typewriter>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTypewriter>(html` <quiet-typewriter></quiet-typewriter> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
