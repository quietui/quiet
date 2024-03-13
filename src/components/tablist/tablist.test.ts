import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { TabList } from './tablist.js';

describe('<quiet-tablist>', () => {
  it('does something', async () => {
    const el = await fixture<TabList>(html` <quiet-tablist>Click me</quiet-tablist> `);
    await expect(el).to.be.accessible();
  });
});
