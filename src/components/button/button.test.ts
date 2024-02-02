import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type QuietButton from './button.js';

describe('<quiet-button>', () => {
  it('does something', async () => {
    const el = await fixture<QuietButton>(html` <quiet-button>Click me</quiet-button> `);
    await expect(el).to.be.accessible();
  });
});
