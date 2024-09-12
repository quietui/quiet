import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietPopover } from './popover.js';

describe('<quiet-popover>', () => {
  it('does something', async () => {
    const el = await fixture<QuietPopover>(html` <quiet-popover>Click me</quiet-popover> `);
    await expect(el).to.be.accessible();
  });
});
