import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietFileInput } from './file-input.js';

describe('<quiet-file-input>', () => {
  it('does something', async () => {
    const el = await fixture<QuietFileInput>(html` <quiet-file-input>Click me</quiet-file-input> `);
    await expect(el).to.be.accessible();
  });
});
