import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type QuietSpinner from './spinner.js';

describe('<quiet-spinner>', () => {
  it('does something', async () => {
    const el = await fixture<QuietSpinner>(html` <quiet-spinner>Click me</quiet-spinner> `);
    await expect(el).to.be.accessible();
  });
});
