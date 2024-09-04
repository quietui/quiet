import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietSpoiler } from './spoiler.js';

describe('<quiet-spoiler>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSpoiler>(html` <quiet-spoiler>Click me</quiet-spoiler> `);
    await expect(el).to.be.accessible();
  });
});
