import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietHotkey } from './hotkey.js';

describe('<quiet-hotkey>', () => {
  it('does something', async () => {
    const el = await fixture<QuietHotkey>(html` <quiet-hotkey></quiet-hotkey> `);
    await expect(el).to.be.accessible();
  });
});
