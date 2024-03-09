import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Badge } from './badge.js';

describe('<quiet-badge>', () => {
  it('does something', async () => {
    const el = await fixture<Badge>(html` <quiet-badge>Click me</quiet-badge> `);
    await expect(el).to.be.accessible();
  });
});
