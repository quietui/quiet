import { expect, fixture, html } from '@open-wc/testing';
import type { QuietRadio } from './radio.js';

describe('<quiet-radio>', () => {
  it('does something', async () => {
    const el = await fixture<QuietRadio>(html` <quiet-radio>Click me</quiet-radio> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
