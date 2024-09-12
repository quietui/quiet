import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietCheckbox } from './checkbox.js';

describe('<quiet-checkbox>', () => {
  it('does something', async () => {
    const el = await fixture<QuietCheckbox>(html` <quiet-checkbox>Click me</quiet-checkbox> `);
    await expect(el).to.be.accessible();
  });
});
