import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietQr } from './qr.js';

describe('<quiet-qr>', () => {
  it('does something', async () => {
    const el = await fixture<QuietQr>(html` <quiet-qr>Click me</quiet-qr> `);
    await expect(el).to.be.accessible();
  });
});
