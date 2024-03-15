import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { TabPanel } from './tab-panel.js';

describe('<quiet-tab-panel>', () => {
  it('does something', async () => {
    const el = await fixture<TabPanel>(html` <quiet-tab-panel>Click me</quiet-tab-panel> `);
    await expect(el).to.be.accessible();
  });
});
