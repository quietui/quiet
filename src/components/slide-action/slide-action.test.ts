import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietSlideAction } from './slide-action.js';

describe('<quiet-slide-action>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSlideAction>(html` <quiet-slide-action>Click me</quiet-slide-action> `);
    await expect(el).to.be.accessible();
  });
});
