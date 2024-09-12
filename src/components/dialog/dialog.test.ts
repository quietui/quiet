import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.js';
import type { QuietDialog } from './dialog.js';

describe('<quiet-dialog>', () => {
  it('does something', async () => {
    const el = await fixture<QuietDialog>(html` <quiet-dialog>Click me</quiet-dialog> `);
    await expect(el).to.be.accessible();
  });
});
