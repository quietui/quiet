import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietKeyboardShortcut } from './keyboard-shortcut.js';

describe('<quiet-keyboard-shortcut>', () => {
  it('does something', async () => {
    const el = await fixture<QuietKeyboardShortcut>(html` <quiet-keyboard-shortcut></quiet-keyboard-shortcut> `);
    await expect(el).to.be.accessible();
  });
});
