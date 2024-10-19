---
title: Available licenses
description: Open source and commercial licenses are available.
layout: page
isWide: true
section: license
---

<div class="pricing-plans">
  <div class="pricing-plan">
    <quiet-icon class="pricing-plan-icon" name="code" style="color: #58acf2;"></quiet-icon>
    <h3 data-no-anchor>Standard</h3><br>
    <ul>
      <li><strong>Free</strong></li>
      <li><s>One-time payment</s></li>
      <li><s>Updates forever</s></li>
      <li><s>Premium support</s></li>
      <li><s>Priority bug fixes</s></li>
      <li><s>Pro community access</s></li>
      <li>MIT license</li>
    </ul>
    <quiet-button pill href="https://github.com/sponsors/claviska" target="_blank">
      <quiet-icon slot="start" family="filled" name="heart"></quiet-icon>
      Sponsor
    </quiet-button>
  </div>

  <div class="pricing-plan">
    <quiet-icon class="pricing-plan-icon" name="user-circle" style="color: #e98d61;"></quiet-icon>
    <h3 data-no-anchor>Individual</h3><br>
    <ul>
      <li><strong>$199</strong></li>
      <li><mark>One-time payment</mark></li>
      <li>Updates forever</li>
      <li>Premium support</li>
      <li>Priority bug fixes</li>
      <li>Pro community access</li>
      <li>Single user</li>
      <li>Commercial license</li>
    </ul>
    <quiet-button variant="primary" pill href="#" target="_blank">
      Buy now
    </quiet-button>
  </div>

  <div class="pricing-plan">
    <quiet-icon class="pricing-plan-icon" name="buildings" style="color: #7db664;"></quiet-icon>
    <h3 data-no-anchor>Team</h3><br>
    <ul>
      <li><strong>$999</strong></li>
      <li>One-time payment</li>
      <li>Updates forever</li>
      <li>Premium support</li>
      <li>Priority bug fixes</li>
      <li>Pro community access</li>
      <li>Up to 10 users</li>
      <li>Commercial license</li>
    </ul>
    <quiet-button variant="primary" pill href="#" target="_blank">
      Buy now
    </quiet-button>
  </div>  
</div>

Quiet can be used for free under the MIT license. For support, prioritized bug fixes, a perpetual use license for unlimited projects, and a lifetime of updates, please purchase a pro license.

<ul class="features-grid" aria-label="Features">
  <li><quiet-icon name="heart-handshake" style="color: #e886a7;"></quiet-icon><br>Premium support</li>
  <li><quiet-icon name="bug" style="color: #e98d61;"></quiet-icon><br>Priority bug fixes</li>
  <li><quiet-icon name="infinity" style="color: #a4a6b0;"></quiet-icon><br>Unlimited projects</li>
  <li><quiet-icon name="calendar" style="color: #58acf2;"></quiet-icon><br>Updates forever</li>
  <li><quiet-icon name="license" style="color: #ec8786;"></quiet-icon><br>Commercial license</li>
  <li><quiet-icon name="key" style="color: #c5a231;"></quiet-icon><br>Pro community access</li>
  <li><quiet-icon name="puzzle" style="color: #b394f4;"></quiet-icon><br>Works with all frameworks</li>
  <li><quiet-icon name="leaf" style="color: #7db664;"></quiet-icon><br>Built with Web standards</li>
</ul>

<div style="text-align: center;">
  <quiet-button variant="primary" size="lg" pill href="#" target="_blank" style="margin-block-start: var(--quiet-content-spacing);">
    Purchase a license
  </quiet-button>
</div>

---

## Frequently asked questions

<details name="faq">
  <summary>Forever is a long time…are you sure?</summary>
  Yes! I don't need a lambo — just help me keep this thing going. ✌️
</details>

<details name="faq">
  <summary>Do you offer support?</summary>
  You can ask questions in the <a href="https://github.com/quietui/quiet/discussions">public discussion forum</a>. For additional support, please purchase a license for direct support from the maintainer and access to the pro community.
</details>

<details name="faq">
  <summary>What if I have more than 10 people on my team?</summary>
  Please purchase multiple team licenses to account for additional users. For example, a team of 18 would need to purchase two team licenses.
</details>

<details name="faq">
  <summary>How can I report a bug?</summary>
  Bugs should be <a href="https://github.com/quietui/quiet/issues">reported on GitHub</a>. Priority is given to pro license holders, but cannot be guaranteed. For best results, please include a minimal reproduction with your report.
</details>

<details name="faq">
  <summary>Can I request a feature?</summary>
  Features can be requested in the <a href="https://github.com/quietui/quiet/discussions/categories/feature-requests">discussion forum</a>. Please search before posting to prevent duplicate requests. Use the 👍 reaction to vote.
</details>

<details name="faq">
  <summary>What is your refund policy?</summary>
  Refunds are offered up to 14 days from the date of purchase.
</details>

<details name="faq">
  <summary>Can I change the tag names?</summary>
  Component tag names, e.g. <code>&lt;quiet-button&gt;</code>, cannot be changed without modifying the source code due to the way tags are referenced in code and styles. Attempting to change tag names, e.g. by extending the associated classes, will cause unexpected breakages and isn't a supported feature of the library.
</details>

<details name="faq">
  <summary>Can I use this library with a micro frontend?</summary>
  Because custom elements are registered globally, I don't recommend using Quiet in a micro frontend architecture <em>unless</em> you move it to the top of the stack. Avoid loading the library multiple times, as this will cause version conflicts and load more code than is necessary.
</details>

Don't see your question above? [Ask it here!](https://github.com/quietui/quiet/discussions)

<small class="copyright">
  Quiet UI is product of A Beautiful Site, LLC
  &copy;<quiet-date year="numeric"></quiet-date>
</small>

<style>
  .copyright {
    display: block;
    color: var(--quiet-text-muted);
    text-align: center;
    margin-block-end: 2rem;
  }
</style>