import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { TabPanel } from './tabpanel.js';

describe('<quiet-tabpanel>', () => {
  it('does something', async () => {
    const el = await fixture<TabPanel>(html` <quiet-tabpanel>Click me</quiet-tabpanel> `);
    await expect(el).to.be.accessible();
  });
});
