import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietSwitch } from './switch.js';

describe('<quiet-switch>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSwitch>(html` <quiet-switch>Click me</quiet-switch> `);
    await expect(el).to.be.accessible();
  });
});
