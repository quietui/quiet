import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietRadioItem } from './radio-item.js';

describe('<quiet-radio-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietRadioItem>(html` <quiet-radio-item>Click me</quiet-radio-item> `);
    await expect(el).to.be.accessible();
  });
});
