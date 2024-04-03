import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietDropdownItem } from './dropdown-item.js';

describe('<quiet-dropdown-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDropdownItem>(html` <quiet-dropdown-item>Click me</quiet-dropdown-item> `);
    await expect(el).to.be.accessible();
  });
});
