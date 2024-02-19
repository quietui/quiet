import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Button } from './button.js';

describe('<quiet-button>', () => {
  it('does something', async () => {
    const el = await fixture<Button>(html` <quiet-button>Click me</quiet-button> `);
    await expect(el).to.be.accessible();
  });
});
