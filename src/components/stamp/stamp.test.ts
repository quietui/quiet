import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietStamp } from './stamp.js';

describe('<quiet-stamp>', () => {
  it('does something', async () => {
    const el = await fixture<QuietStamp>(html` <quiet-stamp>Click me</quiet-stamp> `);
    await expect(el).to.be.accessible();
  });
});
