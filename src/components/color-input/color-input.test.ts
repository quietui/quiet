import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietColorInput } from './color-input.js';

describe('<quiet-color-input>', () => {
  it('does something', async () => {
    const el = await fixture<QuietColorInput>(html` <quiet-color-input>Click me</quiet-color-input> `);
    await expect(el).to.be.accessible();
  });
});
