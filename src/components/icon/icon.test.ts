import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietIcon } from './icon.js';

describe('<quiet-icon>', () => {
  it('does something', async () => {
    const el = await fixture<QuietIcon>(html` <quiet-icon>Click me</quiet-icon> `);
    await expect(el).to.be.accessible();
  });
});
