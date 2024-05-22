import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietTextArea } from './text-area.js';

describe('<quiet-text-area>', () => {
  it('does something', async () => {
    const el = await fixture<QuietTextArea>(html` <quiet-text-area>Click me</quiet-text-area> `);
    await expect(el).to.be.accessible();
  });
});
