import '../../../dist/quiet.loader.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { QuietBreadcrumb } from './breadcrumb.js';

describe('<quiet-breadcrumb>', () => {
  it('does something', async () => {
    const el = await fixture<QuietBreadcrumb>(html` <quiet-breadcrumb>Click me</quiet-breadcrumb> `);
    await expect(el).to.be.accessible();
  });
});
