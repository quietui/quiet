import { expect, fixture, html } from '@open-wc/testing';
import type { QuietStamp } from './stamp.js';

describe('<quiet-stamp>', () => {
  it('does something', async () => {
    const el = await fixture<QuietStamp>(html` <quiet-stamp>Click me</quiet-stamp> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
