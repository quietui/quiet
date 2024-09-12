import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietPasscode } from './passcode.js';

describe('<quiet-passcode>', () => {
  it('does something', async () => {
    const el = await fixture<QuietPasscode>(html` <quiet-passcode>Click me</quiet-passcode> `);
    await expect(el).to.be.accessible();
  });
});
