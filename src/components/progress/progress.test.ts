import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Progress } from './progress.js';

describe('<quiet-progress>', () => {
  it('does something', async () => {
    const el = await fixture<Progress>(html` <quiet-progress>Click me</quiet-progress> `);
    await expect(el).to.be.accessible();
  });
});
