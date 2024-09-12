import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietRadio } from './radio.js';

describe('<quiet-radio>', () => {
  it('does something', async () => {
    const el = await fixture<QuietRadio>(html` <quiet-radio>Click me</quiet-radio> `);
    await expect(el).to.be.accessible();
  });
});
