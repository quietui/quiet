import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietTransitionGroup } from './transition-group.js';

describe('<quiet-transition-group>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTransitionGroup>(html` <quiet-transition-group>Click me</quiet-transition-group> `);
    await expect(el).to.be.accessible();
  });
});
