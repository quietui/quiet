import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietDropdown } from './dropdown.js';

describe('<quiet-dropdown>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDropdown>(html` <quiet-dropdown>Click me</quiet-dropdown> `);
    await expect(el).to.be.accessible();
  });
});
