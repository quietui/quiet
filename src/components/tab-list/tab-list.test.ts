import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { TabList } from './tab-list.js';

describe('<quiet-tab-list>', () => {
  it('does something', async () => {
    const el = await fixture<TabList>(html` <quiet-tab-list>Click me</quiet-tab-list> `);
    await expect(el).to.be.accessible();
  });
});
