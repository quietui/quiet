import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietFitText } from './fit-text.js';

describe('<quiet-fit-text>', () => {
  it('does something', async () => {
    const el = await fixture<QuietFitText>(html` <quiet-fit-text>Click me</quiet-fit-text> `);
    await expect(el).to.be.accessible();
  });
});
