import { expect, fixture, html } from '@open-wc/testing';
import type { QuietQr } from './qr.js';

describe('<quiet-qr>', () => {
  it('does something', async () => {
    const el = await fixture<QuietQr>(html` <quiet-qr>Click me</quiet-qr> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
