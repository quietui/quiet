import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietBytes } from './bytes.js';

describe('<quiet-bytes>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBytes>(html` <quiet-bytes>Click me</quiet-bytes> `);
    expect(customElements.get(el.localName)).to.not.be.undefined;
  });
});
