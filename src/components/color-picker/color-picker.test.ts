import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietColorPicker } from './color-picker.js';

describe('<quiet-color-picker>', () => {
  it('does something', async () => {
    const el = await fixture<QuietColorPicker>(html` <quiet-color-picker>Click me</quiet-color-picker> `);
    await expect(el).to.be.accessible();
  });
});
