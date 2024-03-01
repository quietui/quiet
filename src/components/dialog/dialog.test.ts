import '../../../dist/quiet.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { Dialog } from './dialog.js';

describe('<quiet-dialog>', () => {
  it('does something', async () => {
    const el = await fixture<Dialog>(html` <quiet-dialog>Click me</quiet-dialog> `);
    await expect(el).to.be.accessible();
  });
});
