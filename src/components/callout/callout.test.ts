import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Callout } from './callout.js';

describe('<quiet-callout>', () => {
  it('does something', async () => {
    const el = await fixture<Callout>(html` <quiet-callout>Click me</quiet-callout> `);
    await expect(el).to.be.accessible();
  });
});
