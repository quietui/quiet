import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.js';
import type { QuietProgress } from './progress.js';

describe('<quiet-progress>', () => {
  it('does something', async () => {
    const el = await fixture<QuietProgress>(html` <quiet-progress>Click me</quiet-progress> `);
    await expect(el).to.be.accessible();
  });
});
