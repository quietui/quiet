import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietLoremIpsum } from './lorem-ipsum.js';

describe('<quiet-lorem-ipsum>', () => {
  it('does something', async () => {
    const el = await fixture<QuietLoremIpsum>(html` <quiet-lorem-ipsum>Click me</quiet-lorem-ipsum> `);
    await expect(el).to.be.accessible();
  });
});
