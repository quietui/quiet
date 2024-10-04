import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietScalableText } from './scalable-text.js';

describe('<quiet-scalable-text>', () => {
  it('does something', async () => {
    const el = await fixture<QuietScalableText>(html` <quiet-scalable-text>Click me</quiet-scalable-text> `);
    await expect(el).to.be.accessible();
  });
});
