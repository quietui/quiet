import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietRelativeTime } from './relative-time.js';

describe('<quiet-relative-time>', () => {
  it('does something', async () => {
    const el = await fixture<QuietRelativeTime>(html` <quiet-relative-time>Click me</quiet-relative-time> `);
    await expect(el).to.be.accessible();
  });
});
