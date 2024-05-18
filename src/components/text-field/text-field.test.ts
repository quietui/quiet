import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTextField } from './text-field.js';

describe('<quiet-text-field>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTextField>(html` <quiet-text-field>Click me</quiet-text-field> `);
    await expect(el).to.be.accessible();
  });
});
