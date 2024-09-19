---
title: Available licenses
description: 
layout: page
section: license
---

<div class="pricing-plans">
  <div class="pricing-plan">
    <quiet-icon class="pricing-plan-icon" name="code" style="color: #58acf2;"></quiet-icon>
    <h3 data-no-anchor>Standard</h3><br>
    <ul>
      <li><strong>Free</strong></li>
      <li><s>Premium support</s></li>
      <li><s>Priority bug fixes</s></li>
      <li><s>Discord channel</s></li>
      <li>MIT license</li>
    </ul>
    <quiet-button pill href="https://github.com/sponsors/claviska" target="_blank">
      <quiet-icon slot="start" family="filled" name="heart"></quiet-icon>
      Sponsor
    </quiet-button>
  </div>

  <div class="pricing-plan">
    <quiet-icon class="pricing-plan-icon" name="award" style="color: #e98d61;"></quiet-icon>
    <h3 data-no-anchor>Premium</h3><br>
    <ul>
      <li><strong>Starting at $199</strong></li>
      <li>Premium support</li>
      <li>Priority bug fixes</li>
      <li>Discord channel</li>
      <li>1 year of updates</li>
    </ul>
    <quiet-button variant="primary" pill href="#" target="_blank">
      Buy now
    </quiet-button>
  </div>
</div>

Quiet can be used for free under the standard license. For personal support, prioritized bug fixes, and more, commercial licenses are available starting at $199 USD.

<ul class="features-grid" aria-label="Features">
  <li><quiet-icon name="heart-handshake" style="color: #e886a7;"></quiet-icon><br>Premium support</li>
  <li><quiet-icon name="bug" style="color: #e98d61;"></quiet-icon><br>Priority bug fixes</li>
  <li><quiet-icon name="puzzle" style="color: #c5a231;"></quiet-icon><br>Use in any framework</li>
  <li><quiet-icon name="leaf" style="color: #7db664;"></quiet-icon><br>Standards-based</li>
  <li><quiet-icon name="brand-discord" style="color: #b394f4;"></quiet-icon><br>Discord channel access</li>
  <li><quiet-icon name="calendar" style="color: #58acf2;"></quiet-icon><br>1 year of updates</li>
  <li><quiet-icon name="infinity" style="color: #a4a6b0;"></quiet-icon><br>Unlimited projects</li>
  <li><quiet-icon name="trophy" style="color: #c5a231;"></quiet-icon><br>Support indie software</li>
</ul>

<div style="text-align: center;">
  <quiet-button variant="primary" size="lg" pill href="#" target="_blank" style="margin-block-start: var(--quiet-content-spacing);">
    Purchase a license
  </quiet-button>
</div>

---

## Frequently asked questions

<details name="faq">
  <summary>How many seats should I purchase?</summary>
  You should purchase one seat for every developer who writes code that interacts with Quiet's API via HTML, CSS, and/or JavaScript.
</details>

<details name="faq">
  <summary>What is your refund policy?</summary>
  Refunds are offered up to 14 days from the date of purchase.
</details>

<details name="faq">
  <summary>Do you offer support?</summary>
  You can ask questions in the <a href="https://github.com/quietui/quiet/discussions">public discussion forum</a>. If you need additional support directly from the maintainer, please purchase a commercial license.
</details>

<details name="faq">
  <summary>How can I report a bug?</summary>
  Bugs should be <a href="https://github.com/quietui/quiet/issues">reported on GitHub</a>. Priority is given to commercial license holders, but cannot be guaranteed. For best results, please include a minimal reproduction with your report.
</details>

<details name="faq">
  <summary>Can I request a feature?</summary>
  Features can be requested in the <a href="https://github.com/quietui/quiet/discussions/categories/feature-requests">discussion forum</a>. Please search before posting to prevent duplicate requests. Use the 👍 reaction to vote.
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