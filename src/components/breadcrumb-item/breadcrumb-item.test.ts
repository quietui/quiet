import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/quiet.loader.js';
import type { QuietBreadcrumbItem } from './breadcrumb-item.js';

describe('<quiet-breadcrumb-item>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBreadcrumbItem>(html` <quiet-breadcrumb-item>Click me</quiet-breadcrumb-item> `);
    await expect(el).to.be.accessible();
  });
});
