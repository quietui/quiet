import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietDivider } from './divider.js';

describe('<quiet-divider>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDivider>(html` <quiet-divider>Click me</quiet-divider> `);
    await expect(el).to.be.accessible();
  });
});
