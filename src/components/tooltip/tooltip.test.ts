import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTooltip } from './tooltip.js';

describe('<quiet-tooltip>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTooltip>(html` <quiet-tooltip>Click me</quiet-tooltip> `);
    await expect(el).to.be.accessible();
  });
});
