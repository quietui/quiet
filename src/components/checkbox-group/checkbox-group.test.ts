import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietCheckboxGroup } from './checkbox-group.js';

describe('<quiet-checkbox-group>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCheckboxGroup>(html` <quiet-checkbox-group>Click me</quiet-checkbox-group> `);
    await expect(el).to.be.accessible();
  });
});
