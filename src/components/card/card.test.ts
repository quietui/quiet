import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Card } from './card.js';

describe('<quiet-card>', () => {
  it('does something', async () => {
    const el = await fixture<Card>(html` <quiet-card>Click me</quiet-card> `);
    await expect(el).to.be.accessible();
  });
});
