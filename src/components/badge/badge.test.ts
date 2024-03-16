import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBadge } from './badge.js';

describe('<quiet-badge>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBadge>(html` <quiet-badge>Click me</quiet-badge> `);
    await expect(el).to.be.accessible();
  });
});
